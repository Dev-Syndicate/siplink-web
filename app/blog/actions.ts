"use server";

import { headers } from "next/headers";

import { rateLimited, sendToTeam } from "@/lib/team-inbox";

export type SubscribeState = {
  status: "idle" | "sent" | "invalid" | "unconfigured" | "limited" | "failed";
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter sign-ups. There is no mailing-list service yet, so each one goes
 * to the team through the same inbox as the contact form. A bot that fills the
 * hidden field is told it worked, so it learns nothing.
 */
export async function subscribe(_previous: SubscribeState, data: FormData): Promise<SubscribeState> {
  if (data.get("website")) return { status: "sent" };

  const email = String(data.get("email") ?? "").trim();
  if (!EMAIL.test(email) || email.length > 200) return { status: "invalid" };

  const forwarded = (await headers()).get("x-forwarded-for");
  const address = forwarded?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`subscribe:${address}`, 5, 10 * 60 * 1000)) return { status: "limited" };

  const status = await sendToTeam({
    subject: `Newsletter sign-up: ${email}`,
    text: `${email} asked to receive the SipLink newsletter from the blog.`,
    replyTo: email,
    data: { type: "newsletter", email },
  });
  return { status };
}
