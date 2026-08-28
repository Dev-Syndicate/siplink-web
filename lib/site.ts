import {
  Building2,
  CloudCog,
  GraduationCap,
  HeartPulse,
  Banknote,
  Landmark,
  Store,
  Users,
  Cpu,
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

export type Segment = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

/**
 * The six verticals named on siplink.in, plus the two business sizes.
 * Descriptions are written from the capabilities the site documents — the
 * source site lists these by name only. See content.md.
 */
export const segments: Segment[] = [
  {
    title: "Small & Medium Business",
    description:
      "Employees and staff share the same virtual PBX, with a plan that scales as you grow.",
    icon: Store,
    href: "/solutions/smb",
  },
  {
    title: "Enterprise",
    description:
      "All-in-one enterprise cloud telephony across multiple sites and teams.",
    icon: Building2,
    href: "/solutions/enterprise",
  },
  {
    title: "Healthcare",
    description:
      "HIPAA-compliant communications for practices handling patient information.",
    icon: HeartPulse,
    href: "/industries/healthcare",
  },
  {
    title: "Financial Services",
    description:
      "Call recording and secure voice for regulated financial workflows.",
    icon: Banknote,
    href: "/industries/financial-services",
  },
  {
    title: "Government",
    description:
      "DoT-certified telephony for public sector departments and agencies.",
    icon: Landmark,
    href: "/industries/government",
  },
  {
    title: "Education",
    description:
      "Campus-wide connectivity linking departments, staff and remote learning.",
    icon: GraduationCap,
    href: "/industries/education",
  },
  {
    title: "Tech Solutions",
    description:
      "Integrations with Salesforce, Ceipal, Microsoft Teams, Outlook and Google.",
    icon: Cpu,
    href: "/industries/tech",
  },
  {
    title: "Staffing & Recruiting",
    description:
      "High-volume outbound calling with Ceipal integration for recruiting teams.",
    icon: Users,
    href: "/industries/staffing",
  },
];

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
