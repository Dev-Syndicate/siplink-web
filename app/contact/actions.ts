"use server";

import { headers } from "next/headers";

import {
  enquiryText,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryFields,
} from "@/lib/contact";

/**
 * Receives the contact form.
 *
 * Everything is checked again here; the browser's checks are only a
 * convenience. Bots are turned away by a hidden field people never fill, a
 * minimum time on the form, and a per-address rate limit.
 *
 * Delivery is configured with environment variables, never in code:
 *
 * - RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL, a
 *   sender on a domain verified in Resend) — emails the enquiry to the team;
 * - otherwise CONTACT_WEBHOOK_URL — posts it as JSON, for a CRM, Slack,
 *   Zapier, Make or n8n.
 *
 * With neither set the action says so ("unconfigured") rather than pretending
 * to have sent anything, and the form offers to send it by email instead.
 */

export type EnquiryState =
  | { status: "idle" }
  | { status: "sent"; name: string; email: string }
  | { status: "invalid"; errors: EnquiryErrors }
  | { status: "unconfigured" }
  | { status: "limited" }
  | { status: "failed" };

/** Faster than this from opening the page to sending is not a person. */
const MIN_FILL_MS = 3000;

/** At most this many enquiries per address per window. The count lives in
 * this server instance's memory, so it is a speed bump, not a guarantee. */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const recent = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= LIMIT) {
    recent.set(key, hits);
    return true;
  }
  hits.push(now);
  recent.set(key, hits);
  return false;
}

const text = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
};

export async function submitEnquiry(
  _previous: EnquiryState,
  data: FormData,
): Promise<EnquiryState> {
  // Bots fill the hidden field, or send faster than anyone types. Answer as
  // if it worked, so they learn nothing.
  const startedAt = Number(text(data, "startedAt"));
  if (text(data, "website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "sent", name: "", email: "" };
  }

  const fields: EnquiryFields = {
    name: text(data, "name"),
    email: text(data, "email"),
    company: text(data, "company"),
    phone: text(data, "phone"),
    services: data.getAll("services").filter((s): s is string => typeof s === "string"),
    lines: text(data, "lines"),
    message: text(data, "message"),
  };

  const errors = validateEnquiry(fields);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const forwarded = (await headers()).get("x-forwarded-for");
  const address = forwarded?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(address)) return { status: "limited" };

  const outcome = await deliver(fields);
  if (outcome === "sent") {
    return { status: "sent", name: fields.name.trim(), email: fields.email.trim() };
  }
  return { status: outcome };
}

async function deliver(fields: EnquiryFields): Promise<"sent" | "unconfigured" | "failed"> {
  const body = enquiryText(fields);
  const subject = `Website enquiry: ${fields.services.join(", ")} — ${fields.name.trim()}`;
  const timeout = AbortSignal.timeout(10_000);

  try {
    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (resendKey && to) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "SipLink website <onboarding@resend.dev>",
          to: to.split(",").map((address) => address.trim()),
          reply_to: fields.email.trim(),
          subject,
          text: body,
        }),
        signal: timeout,
      });
      if (!response.ok) {
        console.error("Contact form: Resend refused the enquiry", response.status);
        return "failed";
      }
      return "sent";
    }

    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          text: body,
          enquiry: {
            ...fields,
            name: fields.name.trim(),
            email: fields.email.trim(),
            message: fields.message.trim(),
          },
          receivedAt: new Date().toISOString(),
        }),
        signal: timeout,
      });
      if (!response.ok) {
        console.error("Contact form: the webhook refused the enquiry", response.status);
        return "failed";
      }
      return "sent";
    }
  } catch (error) {
    console.error("Contact form: delivery failed", error);
    return "failed";
  }

  console.warn(
    "Contact form: no delivery configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL, or CONTACT_WEBHOOK_URL.",
  );
  return "unconfigured";
}
