import {
  AudioLines,
  Activity,
  Banknote,
  Boxes,
  Building,
  HeartHandshake,
  Laptop,
  Rocket,
  Waves,
  Building2,
  Clock,
  Cloud,
  CloudCog,
  Code2,
  Cpu,
  FileSpreadsheet,
  GitBranch,
  GraduationCap,
  Headphones,
  Headset,
  HeartPulse,
  Landmark,
  LayoutGrid,
  LifeBuoy,
  Lock,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Network,
  PhoneCall,
  PiggyBank,
  Receipt,
  Router,
  ScrollText,
  ServerCog,
  ShieldCheck,
  Stethoscope,
  Store,
  Ticket,
  Users,
  UsersRound,
  Video,
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

export type Industry = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  /** Only badge a credential SipLink actually holds. */
  badge?: string;
};

/**
 * The six verticals from the 2026 sales brochure, which supersedes the older
 * website set (Financial Services, Government and Education are retired).
 * Medical Billing & RCM leads — matching the newest page on the live site.
 * Copy follows the brochure, with its typos corrected.
 *
 * Do NOT add regulatory claims here — FedRAMP, SEC/FINRA, SOC 2, PCI DSS,
 * SSAE-16 — without written evidence. See details-content.md §20.9.
 */
export const industries: Industry[] = [
  {
    title: "Medical Billing & RCM",
    description:
      "Streamline revenue cycle management with efficient call handling, automated workflows, and seamless communication for billing operations.",
    icon: Receipt,
    href: "/industries/medical-billing-rcm",
  },
  {
    title: "Medical Care & Healthcare",
    description:
      "Enhance patient communication, appointment coordination, and support services with reliable and secure telephony solutions.",
    icon: Stethoscope,
    href: "/industries/healthcare",
    badge: "HIPAA compliant",
  },
  {
    title: "Staffing & Recruitment",
    description:
      "Simplify candidate outreach, interview coordination and client communication with smart calling and messaging features.",
    icon: UsersRound,
    href: "/industries/staffing",
  },
  {
    title: "IT & Software",
    description:
      "Support technical teams with efficient communication tools for customer support, troubleshooting and internal collaboration.",
    icon: Code2,
    href: "/industries/it-software",
  },
  {
    title: "Marketing & Sales",
    description:
      "Boost campaign outreach, lead generation and customer engagement with scalable communication solutions.",
    icon: Megaphone,
    href: "/industries/marketing-sales",
  },
  {
    title: "Tech & SaaS",
    description:
      "Enable seamless customer interactions, onboarding and support with flexible and integrated communication systems.",
    icon: Cloud,
    href: "/industries/tech-saas",
  },
];

export type Office = {
  city: string;
  entity: string;
  address: string[];
  phone: string;
  /** India is where SipLink actually operates; the US entity is registered only. */
  kind: "operating" | "registered";
};

/**
 * Addresses from the live contact page. The US address is a registered-agent
 * address carrying an Indian phone number, so it is presented as the US
 * registered entity rather than a head office. See details-content.md §20.4.
 */
export const offices: Office[] = [
  {
    city: "Chennai",
    entity: "SIPLINK Communications Pvt. Ltd.",
    address: [
      "Level 3, Third Floor, Anmol Palani, No. 88",
      "Gopathi Narayanaswami Chetty Rd, T. Nagar",
      "Chennai, Tamil Nadu 600017",
    ],
    phone: "+91 44 48636371",
    kind: "operating",
  },
  {
    city: "Bangalore",
    entity: "SIPLINK Communications Pvt. Ltd.",
    address: [
      "Quadrant 2, 4th Floor, Tower 1, Umiya Business Bay",
      "Cessna Business Park, Marathahalli, Outer Ring Rd",
      "Kadubeesanahalli, Bengaluru 560037",
    ],
    phone: "+91 82172 02075",
    kind: "operating",
  },
  {
    city: "Hyderabad",
    entity: "SIPLINK Communications Pvt. Ltd.",
    address: [
      "Capital Park, No. 602, 6th Floor, Capital Pk Rd",
      "Ayyappa Society, Madhapur",
      "Hyderabad, Telangana 500081",
    ],
    phone: "+91 82172 02075",
    kind: "operating",
  },
  {
    city: "United States",
    entity: "SIPLINK COMMUNICATIONS LLC",
    address: ["30 N Gould St, Ste R", "Sheridan, WY 82801"],
    phone: "+91 82172 02075",
    kind: "registered",
  },
];

export type Plan = {
  name: string;
  price: string;
  blurb: string;
  featured?: boolean;
  /** Features unique to this tier, on top of the previous one. */
  adds: string[];
};

/** Shared by every tier — rendered under the Value plan. */
export const planBaseFeatures = [
  "Unlimited calling within the USA",
  "Free local number",
  "IP-phone free lease",
  "Business SMS",
  "Audio conferencing",
  "Video calling (peer-to-peer)",
  "Voicemail-to-email",
  "iOS and Android app",
  "Call recording",
  "Virtual fax",
  "Salesforce and Ceipal integration",
  "24/7 support",
];

/**
 * Prices and the 10-line minimum are as published on siplink.in.
 * Do not add an uptime SLA, HubSpot, or API access — none are offered.
 * See content.md.
 */
export const plans: Plan[] = [
  {
    name: "Value",
    price: "$18.95",
    blurb: "Essential cloud telephony for small teams.",
    adds: [],
  },
  {
    name: "Business",
    price: "$20.95",
    blurb: "Adds the integrations most growing teams run on.",
    featured: true,
    adds: ["Microsoft Teams, Outlook and Google integration"],
  },
  {
    name: "Enterprise",
    price: "$24.95",
    blurb: "Full collaboration suite for larger organisations.",
    adds: [
      "Microsoft Teams, Outlook and Google integration",
      "Unlimited video calling (peer-to-peer)",
      "Screen sharing",
      "Team messaging",
    ],
  },
];

export const planNote =
  "All plans are priced per user, per month and require a minimum of 10 lines. Taxes and regulatory fees are not included.";

export type Simple = { title: string; description: string; icon: LucideIcon };

/**
 * UCaaS benefits, from the UCaaS PBX page — the newest and best-written copy
 * on the live site.
 */
export const ucaasBenefits: Simple[] = [
  {
    title: "One platform, total control",
    description:
      "All your communication — calls, video, chat and collaboration — in one powerful hub.",
    icon: LayoutGrid,
  },
  {
    title: "Cut costs, not quality",
    description:
      "Say goodbye to expensive hardware and maintenance. Save instantly and scale effortlessly.",
    icon: PiggyBank,
  },
  {
    title: "Crystal clear every time",
    description:
      "Enterprise-grade voice and HD video with zero compromise.",
    icon: AudioLines,
  },
  {
    title: "Support that never sleeps",
    description: "Our experts are available 24x7, whenever you need help.",
    icon: Clock,
  },
];

/** Platform capabilities, from the UCaaS PBX and sales brochure feature lists. */
export const platformFeatures: Simple[] = [
  {
    title: "IVR and call routing",
    description:
      "An automated menu guides callers to billing, support or sales by keypad, so queries route quickly and accurately without manual intervention.",
    icon: GitBranch,
  },
  {
    title: "Call queues and ring groups",
    description:
      "Intelligent call distribution and queue management balance agent workload and keep response times down at high volume.",
    icon: PhoneCall,
  },
  {
    title: "CDR and call history",
    description:
      "View, track and download detailed call records for any period in Excel or CSV, and filter call history by number and time range.",
    icon: FileSpreadsheet,
  },
  {
    title: "Supervisor monitoring",
    description:
      "Real-time agent monitoring with listen, whisper and barge, plus performance tracking and call quality reports.",
    icon: Headset,
  },
  {
    title: "Call recording",
    description:
      "Automatic and on-demand recording with secure access, playback, download and sharing.",
    icon: AudioLines,
  },
  {
    title: "Video and messaging",
    description:
      "Audio and video conferencing, screen sharing, business SMS and internal team chat on one platform.",
    icon: Video,
  },
];

/**
 * The "Siplink Assure" commitments from the About page.
 * The SLA commitment is quoted as written — it is asserted but never
 * quantified anywhere on the source site. Do not add a percentage here.
 */
export const assurances: Simple[] = [
  {
    title: "Dedicated project managers",
    description:
      "Experts who oversee the design and delivery of your solution from concept through to installation.",
    icon: Users,
  },
  {
    title: "Resolution expertise",
    description:
      "An expert manages your issue from beginning to end, keeping you informed until it is resolved.",
    icon: LifeBuoy,
  },
  {
    title: "24x7 customer support",
    description: "Dedicated customer support staff are always available to help.",
    icon: Clock,
  },
  {
    title: "Online account management",
    description:
      "A web portal that makes it easy to administer your account and support.",
    icon: ScrollText,
  },
  {
    title: "Service level agreement",
    description:
      "Covering SipLink equipment, the local access network and our IP network.",
    icon: ShieldCheck,
  },
  {
    title: "Service interruption credits",
    description:
      "We resolve interruptions as quickly as possible, and if the fault resides with us you receive a credit.",
    icon: Network,
  },
];

/** Support channels from the Support page. */
export const supportChannels: Simple[] = [
  {
    title: "Email support",
    description:
      "Write to us for product information or the services we provide. Answered around the clock.",
    icon: MessageCircle,
  },
  {
    title: "Live chat",
    description:
      "Chat with our team for a quick answer or to arrange the service you need.",
    icon: MessagesSquare,
  },
  {
    title: "Support tickets",
    description:
      "Raise a ticket for your query and our expert team will be in touch.",
    icon: Ticket,
  },
  {
    title: "24x7 call centre",
    description:
      "Any issue with the product, or any question about the company — we are a call away.",
    icon: Headset,
  },
];

/** Network and infrastructure claims from the Why SipLink page. */
export const reliability: Simple[] = [
  {
    title: "No single point of failure",
    description:
      "Failover, redundancy and replication throughout the network — redundant servers, routers and switches with real-time replication to a secondary data centre.",
    icon: ServerCog,
  },
  {
    title: "Multiple provider links",
    description:
      "Data and IP provider links from two data centres, each capable of carrying the entire network load if one or more links fail.",
    icon: Network,
  },
  {
    title: "Scales with you",
    description:
      "Centralised management and billing at any scale. Add users and sites quickly and securely from a standard browser.",
    icon: LayoutGrid,
  },
];

/**
 * The six capability blocks from the homepage. Typos in the source
 * ("Efficience", "Entreprise", "Hippia") are corrected here.
 */
export const capabilities: Simple[] = [
  {
    title: "Unified communications",
    description:
      "Integrates multiple communication methods within a business — voice, video, messaging and presence on one system.",
    icon: Boxes,
  },
  {
    title: "Clear, reliable and resilient",
    description:
      "VoIP digitises voice communication and holds call quality from anywhere, at any time.",
    icon: Waves,
  },
  {
    title: "Enterprise collaboration",
    description:
      "Enterprise communication services integrated into a single cloud-based phone system.",
    icon: Building,
  },
  {
    title: "Network security",
    description:
      "Preserving optimal communication and performance within your business network.",
    icon: ShieldCheck,
  },
  {
    title: "Call quality monitoring",
    description:
      "IP-based voice features adding value to data and video, with quality of service guaranteed.",
    icon: Activity,
  },
  {
    title: "Personalised service and support",
    description:
      "Meeting customer expectations and resolving issues expediently, around the clock.",
    icon: HeartHandshake,
  },
];

/** "Your work goes where you go" — the homepage mobility block. */
export const mobility: Simple[] = [
  {
    title: "Your business goes where you go",
    description:
      "Tools that keep business communication seamless by phone, video and text from anywhere — managed entirely off-site.",
    icon: Laptop,
  },
  {
    title: "A cloud phone system",
    description:
      "No large box in the telecom closet. Voice runs over your internet connection, and we handle every update and all maintenance.",
    icon: ServerCog,
  },
  {
    title: "Everyone on one phone system",
    description:
      "Employees and staff share the same virtual PBX, so distributed teams work as though they are in the same office.",
    icon: Users,
  },
  {
    title: "Get started with cloud",
    description:
      "Still running an on-premise phone system? Moving to the cloud removes the hardware and the maintenance that come with it.",
    icon: Rocket,
  },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
    heading: "Industries",
    links: [
      { label: "Medical Billing & RCM", href: "/industries/medical-billing-rcm" },
      { label: "Medical Care & Healthcare", href: "/industries/healthcare" },
      { label: "Staffing & Recruitment", href: "/industries/staffing" },
      { label: "IT & Software", href: "/industries/it-software" },
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
