import { integrations, offices, plans, reviews } from "@/lib/site";

/**
 * Homepage content.
 *
 * The page makes one argument: move your phone system to the cloud without
 * the disruption, and get a support team that actually answers. Every claim
 * below is drawn from lib/site.ts, lib/solutions.ts or details-content.md —
 * nothing new is asserted.
 *
 * Deliberately absent: an uptime figure, a customer count and client logos.
 * The sources disagree on the first two and have none of the third. See
 * details-content.md §20.
 */

/**
 * The supplied photography. `studio` and `mobile` are small (≤740px wide), so
 * the layout never stretches those full-bleed across a wide screen. Replace
 * with larger originals when available — the markup needs no change.
 */
export const homeImages = {
  /* Agent mid-call, with the subject in the right third facing left so the
     headline gets the empty dark half. Used from lg up only — see the hero
     in app/page.tsx for why narrow viewports drop it. */
  office: "/home/agent-on-call.webp",
  studio: "/home/images.jpg",
  mobile: "/home/person-using-smartphone-touchscreen_9975-135680.avif",
} as const;

const listFormat = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

const operatingOffices = offices.filter((office) => office.kind === "operating");

export const reviewSummary = {
  count: reviews.length,
  average:
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : null,
};

/** Hero proof row. Each value is derived from verified data. */
export const homeProof: { value: string; label: string }[] = [
  ...(reviewSummary.average
    ? [
        {
          value: reviewSummary.average,
          label: `Average rating across ${reviewSummary.count} Google reviews`,
        },
      ]
    : []),
  { value: "24/7", label: "Support by phone, email and live chat" },
  { value: "2012", label: "The year SipLink started" },
  {
    value: String(operatingOffices.length),
    label: `Offices in ${listFormat.format(operatingOffices.map((o) => o.city))}`,
  },
];

export type HomeService = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
};

/** The four ways onto the platform, labelled by the job they do. */
export const homeServices = {
  hostedPbx: {
    eyebrow: "Replace the hardware",
    title: "Hosted PBX",
    description:
      "Your whole phone system, hosted and maintained by us — extensions, IVR, voicemail and routing, with no box in the telecom closet.",
    href: "/products/hosted-pbx",
  },
  sipTrunking: {
    eyebrow: "Keep your equipment",
    title: "SIP Trunking",
    description:
      "Connect the IP-PBX you already own to our network, with capacity that grows with your call volume.",
    href: "/products/sip-trunking",
  },
  callCentre: {
    eyebrow: "Handle the volume",
    title: "Call Centre",
    description:
      "Queues, routing, recording and live monitoring — configured around how your agents actually work.",
    href: "/products/call-center",
  },
  unified: {
    eyebrow: "Bring it together",
    title: "Unified Communications",
    description:
      "Voice, video, business SMS and team chat on one platform, so distributed teams work like they share an office.",
    href: "/solutions/unified-communications",
  },
} satisfies Record<string, HomeService>;

/**
 * Pre-sales questions. Rendered as the FAQ accordion and as FAQPage
 * structured data, so the two can never drift apart.
 */
export const homeFaqs: { question: string; answer: string }[] = [
  {
    question: "Can we keep our existing phone numbers?",
    answer:
      "Yes. We port eligible numbers to SipLink, so customers keep calling the numbers they already know. We validate the numbers and account details first, then plan the cut-over to keep disruption to a minimum.",
  },
  {
    question: "Do we need to buy new phones?",
    answer:
      "No. Every plan includes a free IP-phone lease for desk and conference phones. You can also bring your own devices, or use the SipLink UC app on Windows, Mac, iOS and Android.",
  },
  {
    question: "How is pricing structured?",
    answer: `Plans are priced per user, per month, starting at ${plans[0].price} on the ${plans[0].name} plan. Every plan needs a minimum of 10 lines, and taxes and regulatory fees are charged on top.`,
  },
  {
    question: "What happens when something goes wrong?",
    answer:
      "Our support team is available 24/7 by phone, email and live chat, and you can raise a ticket at any time. One expert owns your issue from start to finish and keeps you informed until it is resolved.",
  },
  {
    question: "Is SipLink suitable for healthcare and medical billing teams?",
    answer:
      "Yes. SipLink runs a HIPAA-compliant cloud phone system, and our CRM integrations and secure fax-to-email service are designed around medical billing and revenue cycle workflows.",
  },
  {
    question: "Which tools does SipLink integrate with?",
    answer: `SipLink connects with ${listFormat.format([...integrations])}, so calls, contacts and records stay where your team already works.`,
  },
];
