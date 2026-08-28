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
  { label: "Pinterest", href: "https://in.pinterest.com/siplinkcommunications/" },
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
