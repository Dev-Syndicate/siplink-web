import { Eye, HeartHandshake, Target, type LucideIcon } from "lucide-react";

/**
 * Content for /about that is not already in lib/site.ts.
 *
 * Vision, mission and values are drawn from copy SipLink already publishes —
 * the About page hero line, the "VoIP Success" differentiator and the Why
 * SipLink page (details-content.md §4–5). Nothing here is a new claim.
 */
export const purpose: { title: string; statement: string; icon: LucideIcon }[] =
  [
    {
      title: "Vision",
      statement:
        "Connect faster, collaborate smarter, scale effortlessly — business communication built on reliable SIP technology, for teams and the customers they serve.",
      icon: Eye,
    },
    {
      title: "Mission",
      statement:
        "Help businesses migrate from traditional systems to IP-based communication that reduces cost and improves productivity, while keeping the numbers their customers already know.",
      icon: Target,
    },
    {
      title: "Values",
      statement:
        "Reliability, quality of service and functionality that simply works — backed by a support team that answers, around the clock.",
      icon: HeartHandshake,
    },
  ];

/**
 * PEOPLE ARE PLACEHOLDERS.
 *
 * The source documents name no founder or leadership team
 * (details-content.md §4). Never fill these with invented names, titles or
 * quotes: an invented quote attributed to a real person is a fabricated
 * endorsement. Replace each entry with details SipLink supplies — portraits go
 * in public/about/ at a 4:5 ratio — then drop its `placeholder` flag.
 */
export type Person = {
  name: string;
  title: string;
  /** Portrait path under /public, 4:5. Omit to show a neutral avatar. */
  photo?: string;
  linkedin?: string;
  /** Shows a visible "To confirm" marker on the page. */
  placeholder?: boolean;
};

export const founder: Person & { message: string[] } = {
  name: "Founder name",
  title: "Founder — title to confirm",
  message: [
    "The founder’s message goes here: a few sentences, in their own words, on why SipLink was started and what it holds itself to.",
    "To be supplied by SipLink. Please do not write this on the founder’s behalf.",
  ],
  placeholder: true,
};

export const leadership: Person[] = [
  { name: "Leader name", title: "Role to confirm", placeholder: true },
  { name: "Leader name", title: "Role to confirm", placeholder: true },
  { name: "Leader name", title: "Role to confirm", placeholder: true },
  { name: "Leader name", title: "Role to confirm", placeholder: true },
];
