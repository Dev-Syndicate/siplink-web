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
export const certifications = [
  "HIPAA COMPLIANT",
  "DoT CERTIFIED",
  "D-U-N-S REGISTERED",
] as const;

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
  "Unlimited calling within the US and Canada",
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

/**
 * The full plan comparison, as supplied by SipLink.
 *
 * `tiers` is [Value, Business, Enterprise]. A boolean marks inclusion; a
 * string is shown as its own label (used for the 24/7 support rows).
 */
export type FeatureRow = {
  label: string;
  tiers: [boolean | string, boolean | string, boolean | string];
};

export type FeatureGroup = { heading: string; rows: FeatureRow[] };

const y = true;
const n = false;

export const planMatrix: FeatureGroup[] = [
  {
    heading: "SipLink essentials",
    rows: [
      { label: "Unlimited calling within the US/CAN", tiers: [y, y, y] },
      { label: "Free local number", tiers: [y, y, y] },
      { label: "Keep your current number", tiers: [y, y, y] },
      { label: "HD video & HD voice", tiers: [y, y, y] },
      { label: "Customizable hold music", tiers: [y, y, y] },
      { label: "Multi-level auto attendant", tiers: [n, y, y] },
      { label: "CLI", tiers: [y, y, y] },
      { label: "Dial by directory", tiers: [n, y, y] },
      { label: "C Name", tiers: [n, y, y] },
      { label: "Call controls (transfer, hold, mute)", tiers: [n, y, y] },
      { label: "Simultaneous ring", tiers: [n, y, y] },
      { label: "Call forwarding", tiers: [y, y, y] },
      { label: "Call waiting", tiers: [n, y, y] },
      { label: "Call queues", tiers: [n, y, y] },
      { label: "Do not disturb", tiers: [n, y, y] },
      { label: "Voicemail to email", tiers: [y, y, y] },
      { label: "Voicemail transcription", tiers: [n, n, y] },
      { label: "Team presence", tiers: [n, n, y] },
      { label: "Shared line appearance", tiers: [n, n, y] },
      { label: "Call groups", tiers: [n, y, y] },
      { label: "WebRTC", tiers: [n, y, y] },
    ],
  },
  {
    heading: "Mobility",
    rows: [
      { label: "SipLink app for Mac", tiers: [y, y, y] },
      { label: "SipLink app for Windows", tiers: [y, y, y] },
      { label: "SipLink app for iOS", tiers: [y, y, y] },
      { label: "SipLink app for Android", tiers: [y, y, y] },
    ],
  },
  {
    heading: "Meetings",
    rows: [
      { label: "Unlimited conference calls", tiers: [n, y, y] },
      { label: "Unlimited video calling (peer-to-peer)", tiers: [n, y, y] },
      { label: "HD video calling", tiers: [n, y, y] },
    ],
  },
  {
    heading: "Team collaboration & messaging",
    rows: [
      { label: "Team messaging and collaboration", tiers: [n, y, y] },
      { label: "Private group messaging", tiers: [n, n, y] },
      { label: "Business SMS", tiers: [n, y, y] },
    ],
  },
  {
    heading: "Analytics & reports",
    rows: [
      { label: "Call history", tiers: [y, y, y] },
      { label: "Call log reports", tiers: [y, y, y] },
      { label: "Voice analytics", tiers: [n, y, y] },
    ],
  },
  {
    heading: "Administration",
    rows: [
      { label: "Admin portal", tiers: [y, y, y] },
      { label: "User portal", tiers: [y, y, y] },
      { label: "Dashboard", tiers: [y, y, y] },
      { label: "Real-time system status alerts", tiers: [y, y, y] },
      { label: "Call recording", tiers: [y, y, y] },
    ],
  },
  {
    heading: "Integrations",
    rows: [
      { label: "Salesforce", tiers: [n, y, y] },
      { label: "MS Outlook", tiers: [n, y, y] },
      { label: "Zendesk", tiers: [n, y, y] },
      { label: "Microsoft Dynamics 365", tiers: [n, y, y] },
      { label: "Sugar CRM", tiers: [n, y, y] },
      { label: "CEIPAL", tiers: [n, y, y] },
    ],
  },
  {
    heading: "IP phones",
    rows: [
      { label: "Bring your own device", tiers: [y, y, y] },
      { label: "Phone lease: desk and conference phones", tiers: [y, y, y] },
      { label: "Desk IP phone", tiers: [y, y, y] },
      { label: "Conference IP phone", tiers: [y, y, y] },
    ],
  },
  {
    heading: "Support",
    rows: [
      { label: "Email support", tiers: ["24/7", "24/7", "24/7"] },
      { label: "Chat support", tiers: ["24/7", "24/7", "24/7"] },
      { label: "Phone support", tiers: ["24/7", "24/7", "24/7"] },
    ],
  },
];

/** Quote-only unlimited calling plans. No published rate. */
export const unlimitedPlans = [
  {
    country: "US" as const,
    title: "Unlimited USA",
    description: "Unlimited calling across the United States.",
  },
  {
    country: "CA" as const,
    title: "Unlimited Canada",
    description: "Unlimited calling across Canada.",
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
    description: "Enterprise-grade voice and HD video with zero compromise.",
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
    description:
      "Dedicated customer support staff are always available to help.",
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

export type Review = {
  /** Reviewer's name exactly as published. */
  name: string;
  /** Their role/company, if stated. Optional. */
  role?: string;
  /** Star rating out of 5. */
  rating: number;
  /** Review text, verbatim. */
  quote: string;
};

/**
 * Customer reviews.
 *
 * From SipLink's Google Business Profile. Names are reproduced as published
 * and the text is verbatim apart from light punctuation and capitalisation
 * fixes; no wording was changed or embellished.
 *
 * Reviews without usable text (an emoji only, or a two-word rating) are not
 * included — they carry nothing for a testimonial card.
 *
 * Only add reviews real customers actually wrote. Never write placeholder
 * testimonials here: an invented quote attributed to a named person is a
 * fabricated endorsement. The section renders nothing if this list is empty.
 */
export const reviews: Review[] = [
  {
    name: "Joseph Karthick",
    rating: 5,
    quote:
      "Siplink provides excellent and high-quality VOIP/SIP services. Their support team is outstanding — they even offer WhatsApp support, and a single message is enough for them to respond and start working immediately.",
  },
  {
    name: "Excellence MBS",
    rating: 5,
    quote:
      "Siplink is our backbone. Everything is beyond excellent. I have been using the VOIP services and I have always got the best services and always been a satisfactory experience. Looking forward with more decades together.",
  },
  {
    name: "Rohit Yadav",
    rating: 5,
    quote:
      "We've been working with SIPLINK Communications Pvt. Ltd. for over two years, and their services have consistently exceeded our expectations. The VoIP solutions they offer are cutting-edge, and the performance is flawless.",
  },
  {
    name: "orange Pandi",
    rating: 5,
    quote:
      "Sip-Link Service provides excellent call quality and reliable support. Their customer service is very responsive and always available when needed. It's easy to reach out and get assistance anytime. Overall, a great experience and highly recommended.",
  },
  {
    name: "Manivannan Deenan",
    rating: 5,
    quote:
      "The VoIP service provider SIPLINK has been excellent with their prompt support. I would definitely recommend them to anyone looking for reliable calling services.",
  },
  {
    name: "kashyap inabathini",
    rating: 5,
    quote:
      "Siplink gives best service. Any update or issues your team response very quickly and fix the problem ASAP. Excellent service and good communication.",
  },
  {
    name: "Azure Billing Solutions",
    rating: 5,
    quote:
      "We are happy with your support and any queries or issues are addressed immediately which helps to deliver the work on time. Great work team.",
  },
  {
    name: "Sarath Kumar",
    rating: 5,
    quote:
      "We have been using VoIP service — it's better and easy to access on mobile as well as PC. Great price with great support on time.",
  },
  {
    name: "आकाश यादव",
    rating: 5,
    quote:
      "If you're looking for a reliable VoIP service provider with great customer service, look no further than SIPLINK. They're a true partner in every sense of the word!",
  },
  {
    name: "HARINI BAI",
    rating: 5,
    quote:
      "With SIPLINK it is very good experience, we don't have any issue. Your services are awesome.",
  },
  {
    name: "Razia Banu",
    rating: 5,
    quote: "Services are good. We get support 24/7. Thank you Siplink.",
  },
  {
    name: "TitaniumArmor",
    rating: 5,
    quote: "This service provider gives smooth connectivity for calls.",
  },
  {
    name: "srujana g",
    rating: 5,
    quote: "Giving best VOIP services with best price.",
  },
];

/** Social profiles, from the live site footer. */
export const social = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Siplink-Communications/100064073381225/",
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=918217202075",
  },
  { label: "X (Twitter)", href: "https://twitter.com/siplinktelcom" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/siplink-communications-pvt-ltd/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@siplinkcommunicationsofficial/",
  },
  {
    label: "Pinterest",
    href: "https://in.pinterest.com/siplinkcommunications/",
  },
] as const;

/** The SipLink UC mobile apps. */
export const mobileApps = {
  ios: "https://apps.apple.com/us/app/siplink-uc/id6751613434",
  android: "https://play.google.com/store/apps/details?id=in.siplink.one",
} as const;

/**
 * "Why choose SipLink" — the five differentiators from the About page,
 * rewritten lightly for grammar.
 */
export const whyChoose: Simple[] = [
  {
    title: "Leaders in VoIP communications",
    description:
      "Network design and solution experts in unified communications, with deep experience across IP voice.",
    icon: Network,
  },
  {
    title: "SIP trunking expertise",
    description:
      "A properly engineered SIP solution is critical — wrong configurations cause issues and unnecessary cost. We know the real-world challenges.",
    icon: GitBranch,
  },
  {
    title: "Proven migrations",
    description:
      "Over the years we have helped businesses move from traditional systems to IP, reducing cost and improving productivity.",
    icon: Rocket,
  },
  {
    title: "Leading-edge hosted services",
    description:
      "Hosted PBX on a dedicated IP network, continuously upgraded with the latest features, with disaster recovery and business continuity for every client.",
    icon: ServerCog,
  },
  {
    title: "Multiple cloud platforms",
    description:
      "Several cloud platforms so the solution fits your requirements, adapting to different environments for optimal performance.",
    icon: LayoutGrid,
  },
];

/** The company's own explainer video, from the homepage "See How" button. */
export const explainerVideo = {
  id: "4e6X2xEdzY4",
  title: "SIPLINK UCPBX",
} as const;

/**
 * Integrations, from the plan comparison matrix supplied by SipLink.
 * The brochure additionally lists Zoho, Odoo and HubSpot; those are not
 * included until confirmed live. See details-content.md §20.6.
 */
export const integrations = [
  "Salesforce",
  "Microsoft Teams",
  "MS Outlook",
  "Microsoft Dynamics 365",
  "Google Workspace",
  "Zendesk",
  "Sugar CRM",
  "CEIPAL",
] as const;

export type NavLeaf = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  heading: string;
  description?: string;
  icon?: LucideIcon;
  links: NavLeaf[];
};

export type NavItem = {
  label: string;
  href: string;
  /** Present on mega-menu entries; plain links omit it. */
  groups?: NavGroup[];
  /** Promo panel rendered alongside the groups. */
  feature?: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    href: string;
  };
  /** Renders groups as one flat column instead of grouped columns. */
  flat?: boolean;
};

export const nav: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    groups: [
      {
        heading: "Business Voice",
        icon: PhoneCall,
        description: "Carrier-grade voice for every setup.",
        links: [
          {
            label: "SIP Trunking",
            href: "/products/sip-trunking",
            description: "Connect your PBX to our IP network",
          },
          {
            label: "Cloud PBX",
            href: "/products/cloud-pbx",
            description: "A full phone system in the cloud",
          },
          {
            label: "Hosted PBX",
            href: "/products/hosted-pbx",
            description: "We host and manage it end to end",
          },
          {
            label: "IP PBX",
            href: "/products/ip-pbx",
            description: "On-premise PBX, SIP enabled",
          },
        ],
      },
      {
        heading: "Phone Numbers",
        icon: Network,
        description: "Local presence in 150+ countries.",
        links: [
          {
            label: "DID Numbers",
            href: "/products/did-numbers",
            description: "Direct inward dialling worldwide",
          },
          {
            label: "Toll-Free Numbers",
            href: "/products/toll-free-numbers",
            description: "Free for your customers to call",
          },
          {
            label: "Virtual Phone Numbers",
            href: "/products/virtual-numbers",
            description: "Any city, no local office",
          },
          {
            label: "Number Porting",
            href: "/products/number-porting",
            description: "Keep the numbers you already have",
          },
        ],
      },
      {
        heading: "Contact Center",
        icon: Headset,
        description: "Everything your agents need.",
        links: [
          {
            label: "Call Center Solution",
            href: "/products/call-center",
            description: "Inbound and outbound at scale",
          },
          {
            label: "Predictive Dialer",
            href: "/products/predictive-dialer",
            description: "Maximise agent talk time",
          },
          {
            label: "Auto Dialer",
            href: "/products/auto-dialer",
            description: "Automate outbound campaigns",
          },
          {
            label: "IVR System",
            href: "/products/ivr",
            description: "Route callers to the right place",
          },
          {
            label: "Call Recording",
            href: "/products/call-recording",
            description: "Capture and store every call",
          },
          {
            label: "Call Analytics",
            href: "/products/call-analytics",
            description: "Live dashboards and reporting",
          },
        ],
      },
      {
        heading: "Communication APIs",
        icon: Code2,
        description: "Build comms into your product.",
        links: [
          {
            label: "Voice API",
            href: "/products/voice-api",
            description: "Place and receive calls in code",
          },
          {
            label: "SMS API",
            href: "/products/sms-api",
            description: "Programmable messaging",
          },
          {
            label: "WhatsApp Business API",
            href: "/products/whatsapp-api",
            description: "Reach customers where they are",
          },
          {
            label: "WebRTC SDK",
            href: "/products/webrtc-sdk",
            description: "Calling in the browser",
          },
          {
            label: "SIP API",
            href: "/products/sip-api",
            description: "Provision trunks programmatically",
          },
        ],
      },
      {
        heading: "Enterprise Features",
        icon: ShieldCheck,
        description: "For complex, regulated estates.",
        links: [
          {
            label: "Microsoft Teams Calling",
            href: "/products/teams-calling",
            description: "Direct Routing for Teams",
          },
          {
            label: "Session Border Controller",
            href: "/products/sbc",
            description: "Secure the network edge",
          },
          {
            label: "Call Queue",
            href: "/products/call-queue",
            description: "Never drop a waiting caller",
          },
          {
            label: "CRM Integration",
            href: "/products/crm-integration",
            description: "Salesforce, Zoho, Dynamics",
          },
          {
            label: "AI Voice Assistant",
            href: "/products/ai-voice-assistant",
            description: "Automate routine conversations",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "SIPLINK PLATFORM",
      title: "One platform for every conversation",
      description:
        "Voice, messaging and APIs on a single network — with the reliability and support your business runs on.",
      cta: "Explore the platform",
      href: "/products",
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    groups: [
      {
        heading: "By Business Size",
        icon: UsersRound,
        description: "Solutions tailored to your growth stage.",
        links: [
          {
            label: "Startups",
            href: "/solutions/startups",
            description:
              "Flexible and affordable communication for fast-moving teams",
          },
          {
            label: "Small Business",
            href: "/solutions/small-business",
            description: "Easy-to-use solutions to stay connected and grow",
          },
          {
            label: "Mid-Market",
            href: "/solutions/mid-market",
            description: "Advanced features for growing organizations",
          },
          {
            label: "Enterprise",
            href: "/solutions/enterprise",
            description:
              "Ultra-reliable, secure, and scalable for global businesses",
          },
        ],
      },
      {
        heading: "By Use Case",
        icon: Activity,
        description: "Solve real communication challenges.",
        links: [
          {
            label: "Remote Workforce",
            href: "/solutions/remote-workforce",
            description: "Keep your distributed teams connected",
          },
          {
            label: "Customer Support",
            href: "/solutions/customer-support",
            description: "Deliver exceptional customer experiences",
          },
          {
            label: "Sales Teams",
            href: "/solutions/sales-teams",
            description: "Empower your sales with smarter communication tools",
          },
          {
            label: "Unified Communications",
            href: "/solutions/unified-communications",
            description: "Bring voice, messaging, and collaboration together",
          },
          {
            label: "Global Offices",
            href: "/solutions/global-offices",
            description: "Stay connected across countries and time zones",
          },
          {
            label: "Multi-Branch Businesses",
            href: "/solutions/multi-branch",
            description: "Seamless communication for all your locations",
          },
        ],
      },
      {
        heading: "Migration",
        icon: Cloud,
        description: "Move to modern communication with ease.",
        links: [
          {
            label: "Move from PRI",
            href: "/solutions/pri-migration",
            description: "Upgrade from legacy PRI to cloud",
          },
          {
            label: "PBX Migration",
            href: "/solutions/pbx-migration",
            description: "Migrate your existing PBX to SipLink",
          },
          {
            label: "Cloud Migration",
            href: "/solutions/cloud-migration",
            description: "Move to a scalable cloud communication platform",
          },
          {
            label: "Number Porting",
            href: "/solutions/number-porting",
            description: "Keep your existing numbers, hassle-free",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "SIPLINK SOLUTIONS",
      title: "Built for Every Business. Ready for What’s Next.",
      description:
        "Scalable communication solutions designed for businesses of all sizes and use cases.",
      cta: "Find Your Solution",
      href: "/solutions",
    },
  },
  {
    label: "Industries",
    href: "/industries",
    flat: true,
    groups: [
      {
        heading: "Industries we serve",
        icon: Building2,
        links: [
          { label: "Call Centers", href: "/industries/call-centers" },
          { label: "Healthcare", href: "/industries/healthcare" },
          { label: "Banking & Finance", href: "/industries/banking-finance" },
          { label: "Education", href: "/industries/education" },
          { label: "Retail", href: "/industries/retail" },
          { label: "Hospitality", href: "/industries/hospitality" },
          { label: "Logistics", href: "/industries/logistics" },
          { label: "IT & SaaS", href: "/industries/it-saas" },
          { label: "Government", href: "/industries/government" },
          { label: "Manufacturing", href: "/industries/manufacturing" },
          { label: "Telecom Operators", href: "/industries/telecom-operators" },
        ],
      },
    ],
    feature: {
      eyebrow: "SIPLINK INDUSTRIES",
      title: "Communication that fits how you work",
      description:
        "Deployments tuned to the compliance, volume and workflow demands of your sector.",
      cta: "See all industries",
      href: "/industries",
    },
  },
  {
    label: "Developers",
    href: "/developers",
    groups: [
      {
        heading: "Documentation",
        icon: ScrollText,
        description: "Everything you need to integrate.",
        links: [
          {
            label: "API Documentation",
            href: "/developers/api-docs",
            description: "REST endpoints and payloads",
          },
          {
            label: "SIP Documentation",
            href: "/developers/sip-docs",
            description: "Trunk setup and SIP signalling",
          },
          {
            label: "SDK Downloads",
            href: "/developers/sdks",
            description: "Client libraries for your stack",
          },
          {
            label: "Webhooks",
            href: "/developers/webhooks",
            description: "Subscribe to real-time events",
          },
        ],
      },
      {
        heading: "Resources",
        icon: GitBranch,
        description: "Get to a working call faster.",
        links: [
          {
            label: "API Reference",
            href: "/developers/api-reference",
            description: "Every method, parameter and error",
          },
          {
            label: "Sample Code",
            href: "/developers/sample-code",
            description: "Copy-paste starting points",
          },
          {
            label: "Postman Collection",
            href: "/developers/postman",
            description: "Try the API without writing code",
          },
          {
            label: "GitHub Examples",
            href: "/developers/github-examples",
            description: "Full working demo apps",
          },
        ],
      },
      {
        heading: "Support",
        icon: LifeBuoy,
        description: "Build and ship with confidence.",
        links: [
          {
            label: "Sandbox",
            href: "/developers/sandbox",
            description: "Test safely before you go live",
          },
          {
            label: "API Status",
            href: "/developers/status",
            description: "Live platform availability",
          },
          {
            label: "Rate Limits",
            href: "/developers/rate-limits",
            description: "Quotas and throttling rules",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "SIPLINK DEVELOPERS",
      title: "From first call to production",
      description:
        "Well-documented APIs, real sample code and a sandbox — so you can integrate voice in days, not quarters.",
      cta: "Read the docs",
      href: "/developers",
    },
  },
  {
    label: "Pricing",
    href: "/pricing",
    flat: true,
    groups: [
      {
        heading: "Plans & pricing",
        icon: Receipt,
        links: [
          { label: "SIP Trunk Pricing", href: "/pricing/sip-trunk" },
          { label: "Cloud PBX Plans", href: "/pricing/cloud-pbx" },
          { label: "DID Pricing", href: "/pricing/did" },
          { label: "Toll-Free Pricing", href: "/pricing/toll-free" },
          { label: "Contact Center Pricing", href: "/pricing/contact-center" },
          { label: "Voice API Pricing", href: "/pricing/voice-api" },
          { label: "Enterprise Quote", href: "/pricing/enterprise-quote" },
        ],
      },
    ],
    feature: {
      eyebrow: "SIPLINK PRICING",
      title: "Transparent pricing, no surprises",
      description:
        "Pay for what you use, scale when you need to, and talk to a human before you commit.",
      cta: "Compare all plans",
      href: "/pricing",
    },
  },
  {
    label: "Resources",
    href: "/resources",
    groups: [
      {
        heading: "Learn",
        icon: GraduationCap,
        description: "Get more from your platform.",
        links: [
          {
            label: "Blog",
            href: "/resources/blog",
            description: "Industry news and product updates",
          },
          {
            label: "Knowledge Base",
            href: "/resources/knowledge-base",
            description: "How-to guides and troubleshooting",
          },
          {
            label: "Documentation",
            href: "/developers/api-docs",
            description: "Technical product documentation",
          },
          {
            label: "FAQs",
            href: "/resources/faqs",
            description: "Quick answers to common questions",
          },
        ],
      },
      {
        heading: "Customer Stories",
        icon: HeartHandshake,
        description: "Results from businesses like yours.",
        links: [
          {
            label: "Case Studies",
            href: "/resources/case-studies",
            description: "In-depth customer deployments",
          },
          {
            label: "Testimonials",
            href: "/resources/testimonials",
            description: "What our customers say",
          },
          {
            label: "Success Stories",
            href: "/resources/success-stories",
            description: "Measurable outcomes and ROI",
          },
        ],
      },
      {
        heading: "Downloads",
        icon: FileSpreadsheet,
        description: "Take the detail with you.",
        links: [
          {
            label: "Whitepapers",
            href: "/resources/whitepapers",
            description: "Deep dives on cloud telephony",
          },
          {
            label: "Brochures",
            href: "/resources/brochures",
            description: "Overviews to share internally",
          },
          {
            label: "Datasheets",
            href: "/resources/datasheets",
            description: "Specs, limits and features",
          },
          {
            label: "Product Catalog",
            href: "/resources/product-catalog",
            description: "The full SipLink range",
          },
        ],
      },
      {
        heading: "Network",
        icon: Waves,
        description: "Know exactly what you are running on.",
        links: [
          {
            label: "Coverage Map",
            href: "/resources/coverage-map",
            description: "Where we deliver numbers and voice",
          },
          {
            label: "Network Status",
            href: "/resources/network-status",
            description: "Real-time service health",
          },
          {
            label: "SLA",
            href: "/resources/sla",
            description: "Our uptime and support commitments",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "SIPLINK RESOURCES",
      title: "Everything you need to decide",
      description:
        "Guides, customer results and network transparency — all in one place.",
      cta: "Browse resources",
      href: "/resources",
    },
  },
  {
    label: "Company",
    href: "/about",
    flat: true,
    groups: [
      {
        heading: "Company",
        icon: Building,
        links: [
          { label: "About SipLink", href: "/about" },
          { label: "Why SipLink", href: "/why-siplink" },
          { label: "Partners", href: "/company/partners" },
          { label: "Certifications", href: "/company/certifications" },
          { label: "Careers", href: "/company/careers" },
          { label: "News", href: "/company/news" },
          { label: "Contact Us", href: "/contact" },
        ],
      },
    ],
    feature: {
      eyebrow: "ABOUT SIPLINK",
      title: "A partner, not just a provider",
      description:
        "D-U-N-S registered, globally connected, and backed by a support team that answers.",
      cta: "About SipLink",
      href: "/about",
    },
  },
  { label: "Contact", href: "/contact" },
];

/** Trust strip shown along the bottom of the mega menu. */
export const navHighlights = [
  {
    label: "Scalable Solutions",
    description: "For businesses of all sizes",
    icon: Activity,
  },
  {
    label: "Reliable & Secure",
    description: "Enterprise-grade infrastructure",
    icon: ShieldCheck,
  },
  {
    // "150+ countries" is not supported by the source docs, which state
    // carrier-neutral POPs and redundant connectivity only. See
    // solutions-content-source memory / docs open questions.
    label: "Resilient Network",
    description: "Carrier-neutral, redundant connectivity",
    icon: Network,
  },
  {
    label: "Expert Support",
    description: "We are with you at every step",
    icon: Headset,
  },
] as const;

/**
 * Product catalogue for /products. Copy is drawn from
 * docs/website-contents.md and docs/siplink-documentation.md; the
 * category order matches the Products mega menu in `nav`.
 */
export type ProductCategory = {
  slug: string;
  eyebrow: string;
  heading: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  products: {
    title: string;
    description: string;
    href: string;
    idealFor?: string;
  }[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "business-voice",
    eyebrow: "Business Voice",
    heading: "Carrier-grade voice for every setup",
    tagline: "The foundation of your business telephony.",
    description:
      "Whether you run your own PBX, want us to host it, or need SIP connectivity for existing equipment, SipLink delivers business calling on infrastructure built for uptime.",
    icon: PhoneCall,
    products: [
      {
        title: "SIP Trunking",
        description:
          "SIP-enabled connectivity between your IP-PBX and the telephony network. Connect existing equipment to our IP network for immediate savings and guaranteed quality of service.",
        href: "/products/sip-trunking",
        idealFor:
          "Businesses with existing PBX hardware, multi-site organisations, high call volumes",
      },
      {
        title: "Cloud PBX",
        description:
          "A complete business phone system delivered from the cloud — extensions, routing, IVR, voicemail and reporting, managed from a web portal with no hardware to maintain.",
        href: "/products/cloud-pbx",
        idealFor:
          "Growing teams, remote and hybrid workforces, businesses replacing legacy systems",
      },
      {
        title: "Hosted PBX",
        description:
          "We host, manage and monitor the PBX end to end. Business extensions, IP phones, softphones and mobile access with centralised administration and no on-premise box.",
        href: "/products/hosted-pbx",
        idealFor:
          "Organisations without in-house telecom staff, branch offices, managed-service customers",
      },
      {
        title: "IP PBX",
        description:
          "On-premise IP-PBX deployments for organisations that need to keep call control inside their own network, connected to external voice services over SIP.",
        href: "/products/ip-pbx",
        idealFor:
          "Regulated environments, on-premise requirements, hybrid deployments",
      },
    ],
  },
  {
    slug: "phone-numbers",
    eyebrow: "Phone Numbers",
    heading: "Business numbers built for the way you communicate",
    tagline: "Establish presence anywhere, keep the numbers you have.",
    description:
      "Choose from local DID numbers, toll-free numbers and virtual phone numbers, or port your existing business numbers to SipLink while maintaining continuity — for one team or many locations.",
    icon: Network,
    products: [
      {
        title: "DID Numbers",
        description:
          "Direct Inward Dialing numbers that connect callers straight to a specific employee, department, extension or application, without routing through a main switchboard.",
        href: "/products/did-numbers",
        idealFor:
          "Sales teams, support departments, individual employees, remote teams",
      },
      {
        title: "Toll-Free Numbers",
        description:
          "Give customers a convenient way to reach you without being charged for the call, while incoming calls are directed to the right teams, agents or locations.",
        href: "/products/toll-free-numbers",
        idealFor:
          "Customer support, sales enquiries, helplines, organisations serving several regions",
      },
      {
        title: "Virtual Phone Numbers",
        description:
          "A professional phone presence without a physical line. Route calls to SIP phones, softphones, mobiles or extensions so teams stay reachable from anywhere.",
        href: "/products/virtual-numbers",
        idealFor:
          "Distributed teams, companies entering new markets, flexible call routing",
      },
      {
        title: "Number Porting",
        description:
          "Move your existing business numbers to SipLink and keep the numbers your customers already know — no reprinting, no updating listings, minimal disruption.",
        href: "/products/number-porting",
        idealFor:
          "Businesses migrating from another provider, PRI and legacy PBX replacements",
      },
    ],
  },
  {
    slug: "contact-center",
    eyebrow: "Contact Center",
    heading: "Connect your teams, elevate every conversation",
    tagline: "One platform for agents, queues and customer interactions.",
    description:
      "Handle inbound and outbound calls, route customers to the right teams, manage queues, monitor agent activity, record conversations and analyse performance — with real-time visibility throughout.",
    icon: Headset,
    products: [
      {
        title: "Call Center Solution",
        description:
          "Route high volumes of calls to the right department, agent or extension, organise waiting customers into queues and manage inbound and outbound campaigns from one platform.",
        href: "/products/call-center",
        idealFor: "Sales, support and service teams handling high call volumes",
      },
      {
        title: "Predictive Dialer",
        description:
          "Automate the repetitive work of dialling. The system manages outbound calling and connects answered calls to available agents, so teams spend more time talking to real prospects.",
        href: "/products/predictive-dialer",
        idealFor: "Outbound sales teams, collections, campaign-driven calling",
      },
      {
        title: "Auto Dialer",
        description:
          "Run automated outbound campaigns with configurable pacing, call outcomes and campaign reporting for teams that need volume without manual dialling.",
        href: "/products/auto-dialer",
        idealFor: "Notification campaigns, reminders, outbound follow-up",
      },
      {
        title: "IVR System",
        description:
          "Multi-level voice menus with professional greetings, routing to Sales, Support or Billing, and separate call flows for business hours, holidays and after-hours.",
        href: "/products/ivr",
        idealFor: "Any business wanting fewer transfers and faster response",
      },
      {
        title: "Call Recording",
        description:
          "Securely capture inbound and outbound conversations for quality, training and accountability, with role-based access controlling who can replay each call.",
        href: "/products/call-recording",
        idealFor: "Quality assurance, training, regulated industries",
      },
      {
        title: "Call Analytics",
        description:
          "Understand call volumes, answered and missed calls, duration, agent activity and overall trends — so you know what is happening inside your calls, not just how many there were.",
        href: "/products/call-analytics",
        idealFor: "Managers tracking performance and staffing decisions",
      },
    ],
  },
  {
    slug: "communication-apis",
    eyebrow: "Communication APIs",
    heading: "Build powerful communication experiences",
    tagline: "Voice, messaging and real-time calling in your own product.",
    description:
      "Integrate communication directly into your applications without developing the underlying telephony infrastructure from scratch — through reliable voice, SMS, WhatsApp, WebRTC and SIP technologies.",
    icon: Code2,
    products: [
      {
        title: "Voice API",
        description:
          "Initiate and receive calls, connect customers with agents and automate calling workflows programmatically from websites, applications and CRM platforms.",
        href: "/products/voice-api",
        idealFor:
          "CRM platforms, SaaS applications, support systems, automated calling",
      },
      {
        title: "SMS API",
        description:
          "Send automated notifications, alerts, reminders, verification messages and customer updates from your own systems, triggered by business events.",
        href: "/products/sms-api",
        idealFor:
          "OTP and verification, alerts, appointment reminders, transactional messages",
      },
      {
        title: "WhatsApp Business API",
        description:
          "Bring business conversations to WhatsApp — updates, support, notifications and customer engagement on a platform your customers already use daily.",
        href: "/products/whatsapp-api",
        idealFor:
          "Customer support, order updates, appointment reminders, sales engagement",
      },
      {
        title: "WebRTC SDK",
        description:
          "Add real-time voice directly into web and application environments — browser calling, click-to-call and embedded softphones with nothing for customers to install.",
        href: "/products/webrtc-sdk",
        idealFor:
          "Web applications, SaaS platforms, click-to-call, support portals",
      },
      {
        title: "SIP API",
        description:
          "Integrate SIP-based voice into your applications and existing telephony estate, for organisations that need greater control over their voice architecture.",
        href: "/products/sip-api",
        idealFor:
          "Cloud telephony platforms, PBX environments, enterprise integrations",
      },
    ],
  },
  {
    slug: "enterprise-features",
    eyebrow: "Enterprise Features",
    heading: "Built for scale, security and control",
    tagline: "The communication layer across your existing systems.",
    description:
      "Large organisations run Teams, PBX platforms, SIP trunks, CRM applications and contact centres side by side. SipLink connects them into one managed environment rather than replacing everything you already use.",
    icon: ShieldCheck,
    products: [
      {
        title: "Microsoft Teams Calling",
        description:
          "Connect Teams to your business telephony so employees make and receive external calls from the Teams environment they already work in, on your existing business numbers.",
        href: "/products/teams-calling",
        idealFor: "Organisations already invested in Microsoft Teams",
      },
      {
        title: "Session Border Controller",
        description:
          "A controlled layer between your voice infrastructure and external SIP networks, managing connections, supporting interoperability and giving visibility across platforms.",
        href: "/products/sbc",
        idealFor:
          "Enterprises connecting PBX, cloud telephony and carrier networks",
      },
      {
        title: "Call Queue",
        description:
          "Organise incoming calls by department and routing rules, distributing them to available agents instead of returning busy signals when everyone is occupied.",
        href: "/products/call-queue",
        idealFor: "Sales, support, billing, service and help-desk teams",
      },
      {
        title: "CRM Integration",
        description:
          "Bring calling closer to the customer records your teams already rely on — screen pop, click-to-dial, call logging and contact synchronisation.",
        href: "/products/crm-integration",
        idealFor: "Sales and support teams working inside a CRM all day",
      },
      {
        title: "AI Voice Assistant",
        description:
          "An intelligent voice layer that handles routine interactions naturally, collects the information needed and routes to a human when the conversation calls for one.",
        href: "/products/ai-voice-assistant",
        idealFor: "High-volume service desks with repetitive enquiries",
      },
    ],
  },
];

/** Platform-wide capabilities shown beneath the product catalogue. */
export const productPlatformPillars = [
  {
    title: "Security",
    description:
      "TLS-encrypted signalling and SRTP media where supported, two-factor authentication, role-based administration and IP access controls.",
    icon: Lock,
  },
  {
    title: "High availability",
    description:
      "Redundant deployment options, SIP trunk and route failover, load distribution, backup and recovery, with monitoring and alerting.",
    icon: Activity,
  },
  {
    title: "Multi-site & multi-tenant",
    description:
      "Separate customer or department environments, tenant-level administration, centralised management and multi-site control.",
    icon: Building2,
  },
  {
    title: "Integrations & APIs",
    description:
      "REST APIs, webhooks and SDK-based integration, plus CRM, Microsoft 365 and Google connections for your existing workflows.",
    icon: Boxes,
  },
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
      {
        label: "Medical Billing & RCM",
        href: "/industries/medical-billing-rcm",
      },
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

/* -------------------------------------------------------------------------
 * Homepage content model
 *
 * The homepage argues one thing: enterprise-grade voice, answered by people
 * who pick up. Everything below supports that claim with facts already
 * verified elsewhere in this file — no new proof is invented here.
 * ---------------------------------------------------------------------- */

/**
 * Hero proof strip. Deliberately only claims we can stand behind:
 * the review count is the real number in `reviews`, the plan price is the
 * published Value tier, and both certifications are in `certifications`.
 * No uptime figure — we do not publish an SLA. See content.md.
 */
export const heroProof: { value: string; label: string }[] = [
  { value: "HIPAA", label: "Compliant cloud phone system" },
  { value: "DoT", label: "Certified carrier network" },
  { value: "5.0", label: "Average of 13 customer reviews" },
  { value: "24/7", label: "Support, by people who answer" },
];

/**
 * "What changes on Monday" — the migration story told as a before/after,
 * because the real buying objection is disruption, not features.
 */
export const switchingStory: {
  before: string;
  after: string;
  icon: LucideIcon;
}[] = [
  {
    before: "A PBX box in the telecom closet that someone has to maintain",
    after: "Nothing on site. We handle every update and all maintenance.",
    icon: ServerCog,
  },
  {
    before: "New numbers, reprinted cards, updated listings",
    after: "Keep the numbers your customers already dial. We port them.",
    icon: PhoneCall,
  },
  {
    before: "Desk phones that only work at the desk",
    after: "Your extension on iOS, Android and desktop, wherever you are.",
    icon: Laptop,
  },
  {
    before: "A support ticket into the void",
    after: "A named team on WhatsApp, phone and email, around the clock.",
    icon: HeartHandshake,
  },
];

/**
 * The four platform pillars, phrased as the job the customer is hiring us
 * for rather than as product names. Hrefs point at the existing solutions.
 */
export const homePillars: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    eyebrow: "Replace the hardware",
    title: "Hosted PBX",
    description:
      "Your whole phone system in the cloud — extensions, IVR, voicemail and routing, with no box to maintain.",
    href: "/products/hosted-pbx",
    icon: CloudCog,
  },
  {
    eyebrow: "Keep your equipment",
    title: "SIP Trunking",
    description:
      "Already have an IP-PBX? Connect it to our network for immediate savings and guaranteed call quality.",
    href: "/products/sip-trunking",
    icon: Router,
  },
  {
    eyebrow: "Handle the volume",
    title: "Enhanced Call Centre",
    description:
      "Queues, routing, recording and live monitoring — configured around how your team actually works.",
    href: "/products/call-center",
    icon: Headset,
  },
  {
    eyebrow: "Bring it together",
    title: "Unified Communications",
    description:
      "Voice, video, business SMS and team messaging on one platform, so distributed teams feel co-located.",
    href: "/solutions/unified-communications",
    icon: MessagesSquare,
  },
];
