/**
 * Sends a message from the website to the SipLink team. Server only: it reads
 * private settings from the environment.
 *
 * - RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL, a sender
 *   on a domain verified in Resend) emails it to the team;
 * - otherwise CONTACT_WEBHOOK_URL posts it as JSON, for a CRM, Slack, Zapier,
 *   Make or n8n.
 *
 * With neither set the answer is "unconfigured", so a form can say so rather
 * than pretending something was sent.
 */
export type Delivery = "sent" | "unconfigured" | "failed";

export async function sendToTeam(message: {
  subject: string;
  text: string;
  replyTo: string;
  /** Extra detail for the webhook, as structured fields. */
  data: Record<string, unknown>;
}): Promise<Delivery> {
  const { subject, text, replyTo, data } = message;
  const signal = AbortSignal.timeout(10_000);

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
          reply_to: replyTo,
          subject,
          text,
        }),
        signal,
      });
      if (!response.ok) console.error("Team inbox: Resend refused the message", response.status);
      return response.ok ? "sent" : "failed";
    }

    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, text, ...data, receivedAt: new Date().toISOString() }),
        signal,
      });
      if (!response.ok) console.error("Team inbox: the webhook refused the message", response.status);
      return response.ok ? "sent" : "failed";
    }
  } catch (error) {
    console.error("Team inbox: delivery failed", error);
    return "failed";
  }

  console.warn(
    "Team inbox: no delivery configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL, or CONTACT_WEBHOOK_URL.",
  );
  return "unconfigured";
}

const recent = new Map<string, number[]>();

/**
 * Whether this key has used up its sends for the window. The count lives in
 * this server instance's memory, so it is a speed bump, not a guarantee.
 */
export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((time) => now - time < windowMs);
  const over = hits.length >= limit;
  if (!over) hits.push(now);
  recent.set(key, hits);
  return over;
}
