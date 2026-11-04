"use server";

import { headers } from "next/headers";

import {
  enquiryText,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryFields,
} from "@/lib/contact";
import { rateLimited, sendToTeam } from "@/lib/team-inbox";

/**
 * Receives the contact form.
 *
 * Everything is checked again here; the browser's checks are only a
 * convenience. Bots are turned away by a hidden field people never fill, a
 * minimum time on the form, and a per-address rate limit.
 *
 * Delivery is set up in lib/team-inbox.ts. Where none is configured the action
 * says so rather than pretending to have sent anything, and the form offers to
 * send it by email instead.
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

/** At most this many enquiries per address per window. */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

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
  if (rateLimited(`enquiry:${address}`, LIMIT, WINDOW_MS)) return { status: "limited" };

  const outcome = await sendToTeam({
    subject: `Website enquiry: ${fields.services.join(", ")} — ${fields.name.trim()}`,
    text: enquiryText(fields),
    replyTo: fields.email.trim(),
    data: {
      enquiry: {
        ...fields,
        name: fields.name.trim(),
        email: fields.email.trim(),
        message: fields.message.trim(),
      },
    },
  });
  if (outcome === "sent") {
    return { status: "sent", name: fields.name.trim(), email: fields.email.trim() };
  }
  return { status: outcome };
}
