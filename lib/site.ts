import {
  CloudCog,
  Router,
  Headset,
  MessagesSquare,
  ShieldCheck,
  Headphones,
  Lock,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "SipLink",
  legalName: "Siplink Communications",
  tagline: "Global Solutions For SME",
  description:
    "Reliable, scalable and secure cloud communications for growing businesses — hosted PBX, SIP trunking, call centre and unified communications.",
  phone: "082172 02075",
  email: "support@siplink.in",
} as const;

export type Solution = {
  title: string;
  description: string;
  icon: LucideIcon;
  cta: string;
  href: string;
};

/** Descriptions follow the wording used on siplink.in. See content.md. */
export const solutions: Solution[] = [
  {
    title: "Hosted PBX",
    description:
      "A telephone switching system accessible over a network in the cloud. More affordable and easier to run than on-premise hardware — with no box in the telecom closet to maintain.",
    icon: CloudCog,
    cta: "Explore PBX features",
    href: "/solutions/hosted-pbx",
  },
  {
    title: "SIP Trunking",
    description:
      "SIP enabled private branch exchange (IP-PBX) solutions. Connect existing equipment to our IP network for immediate savings and guaranteed quality of service.",
    icon: Router,
    cta: "View trunking plans",
    href: "/solutions/sip-trunking",
  },
  {
    title: "Enhanced Call Centre",
    description:
      "Improve operational costs and workforce productivity, configured around your requirements — with call recording and monitoring built in.",
    icon: Headset,
    cta: "Discover call centre",
    href: "/solutions/call-centre",
  },
  {
    title: "Unified Communications",
    description:
      "Integrate multiple communication methods within one business platform — voice, video, business SMS and team messaging that feel like being in the same office.",
    icon: MessagesSquare,
    cta: "Learn about UCaaS",
    href: "/solutions/unified-communications",
  },
];

export type Trust = { title: string; description: string; icon: LucideIcon };

export const trustPoints: Trust[] = [
  {
    title: "HIPAA compliant",
    description:
      "A HIPAA-compliant cloud phone system, suitable for healthcare and other regulated industries.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 support",
    description:
      "Round-the-clock devoted attention and personalised service from our support team.",
    icon: Headphones,
  },
  {
    title: "DoT certified",
    description:
      "Department of Telecommunications certified, with quality of service guaranteed across our network.",
    icon: Lock,
  },
];

/**
 * Only credentials SipLink actually holds. Do not add SOC 2, PCI DSS, GDPR or
 * an uptime SLA here until they are verified — see content.md open questions.
 */
export const certifications = ["HIPAA COMPLIANT", "DoT CERTIFIED"] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const footerNav = [
  {
    heading: "Products",
    links: [
      { label: "Call Centre Solutions", href: "/solutions/call-centre" },
      { label: "Small & Medium Business", href: "/solutions/smb" },
      { label: "Enterprise Business", href: "/solutions/enterprise" },
      { label: "Internet Services", href: "/solutions/internet" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Government", href: "/industries/government" },
      { label: "Staffing & Recruiting", href: "/industries/staffing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Why SipLink", href: "/why-siplink" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
] as const;
