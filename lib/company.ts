import {
  Activity,
  BadgeCheck,
  Bot,
  Boxes,
  Building2,
  Code2,
  HeartHandshake,
  HeartPulse,
  Landmark,
  LayoutGrid,
  LifeBuoy,
  Lock,
  MessageCircle,
  Network,
  Puzzle,
  RadioTower,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------
 * Company sub-pages content model
 *
 * Data for /why-siplink, /company/partners, /company/certifications,
 * /company/careers and /company/news. Copy that traces to SipLink's docs
 * (why-siplink: details-content.md §5; certifications and integrations:
 * lib/site.ts) is rewritten in original wording. The partner, careers and
 * news pages are generated professional content built on SipLink's real
 * positioning — no fabricated partner names, headcount, job listings,
 * dated releases, uptime figures or certifications beyond the three held.
 * ---------------------------------------------------------------------- */

export type CompanyItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/* ---------------------------------------------------------------- why-siplink */

/**
 * The three pillars that open the Why SipLink page, expanded into their own
 * prose. Traces to details-content.md §5 (reliability/redundancy, data centre
 * capabilities, scalability) and lib/site.ts `reliability`. No uptime figure,
 * no named data-centre location, no hardware inventory — those are docs copy
 * we do not reproduce.
 */
export const whyPillars: {
  eyebrow: string;
  title: string;
  body: string[];
  icon: LucideIcon;
}[] = [
  {
    eyebrow: "Reliability",
    title: "Built with no single point of failure",
    body: [
      "Voice is the one system a business cannot afford to lose. A dropped dial tone is a lost customer, so SipLink is engineered from the ground up for continuity rather than as an afterthought bolted on later.",
      "Failover, redundancy and replication run throughout the network. Servers, routers and switches are duplicated, and data replicates in real time to a secondary data centre — so if a single component, or an entire site, goes down, calls keep connecting.",
      "The network draws on multiple data and IP provider links across two data centres. Each link is sized to carry the entire load on its own, which means the loss of one or more links is absorbed quietly rather than heard by your callers.",
    ],
    icon: ServerCog,
  },
  {
    eyebrow: "Redundancy",
    title: "Two data centres watching every call",
    body: [
      "The platform is hosted in enterprise-class facilities with round-the-clock monitoring and protection. Power, cooling and connectivity are provisioned for resilience, and the operations team watches the network continuously so problems are caught before they reach you.",
      "Because the two sites replicate to one another, the network is designed to provide uninterrupted service even in the event that a server, database, router, switch or a full data centre fails. Recovery is a matter of the platform routing around the fault, not of an engineer being paged out of bed.",
      "Disaster recovery and business continuity are part of the standard build for every client, not a premium add-on reserved for the largest accounts.",
    ],
    icon: Network,
  },
  {
    eyebrow: "Scalability",
    title: "Grows with you, from ten lines to many sites",
    body: [
      "SipLink runs on a fully scalable VoIP infrastructure that can be extended to as many sites and users as a business needs. The same platform serves a single office and an organisation spread across countries.",
      "Centralised management and billing hold at any scale. New users, extensions and whole locations can be added quickly and securely from a standard web browser, anywhere with an internet connection — no truck roll, no new hardware in a closet.",
      "Several cloud platforms sit behind the service, so the deployment is fitted to your requirements and adapts to different environments rather than forcing every customer into one mould.",
    ],
    icon: LayoutGrid,
  },
];

/* ---------------------------------------------------------------- partners */

/**
 * How the partner ecosystem is framed. SipLink names no partners in its docs
 * and forbids partner logos, so this page presents technology integrations
 * (which ARE documented — see lib/site.ts `integrations`) plus an invitation
 * to partner, routing to /contact. No fabricated partner names or logos.
 */
export const partnerTracks: {
  title: string;
  description: string;
  points: string[];
  icon: LucideIcon;
}[] = [
  {
    title: "Technology & integration partners",
    description:
      "Software vendors and platform builders whose products work better with voice, messaging and connectivity built in.",
    points: [
      "Connect SipLink voice, SMS and WhatsApp into your own application through our APIs and webhooks",
      "Certify an integration your mutual customers can turn on without custom development",
      "Co-develop connectors for the CRM, help-desk and productivity tools your customers already run",
    ],
    icon: Puzzle,
  },
  {
    title: "Channel & referral partners",
    description:
      "Consultancies, MSPs and system integrators who advise businesses on how they communicate.",
    points: [
      "Bring cloud telephony, SIP trunking and connectivity to clients on a network you can stand behind",
      "Lean on our engineering team for design, deployment and migration rather than building it in-house",
      "Refer opportunities and let a dedicated team carry them through to a live, supported deployment",
    ],
    icon: HeartHandshake,
  },
  {
    title: "Carrier & connectivity partners",
    description:
      "Operators and network providers who need a licensed, resilient voice and internet backbone.",
    points: [
      "Interconnect with a DoT-certified Class A ISP operating carrier-neutral points of presence",
      "Extend reach with redundant, monitored infrastructure across two data centres",
      "Work with a team that understands SIP interoperability and real-world voice quality",
    ],
    icon: RadioTower,
  },
];

/**
 * Supported integrations, presented on the partners page as proof the
 * ecosystem is real. Sourced from lib/site.ts `integrations`.
 */
export const partnerIntegrations: CompanyItem[] = [
  {
    title: "CRM & sales",
    description:
      "Salesforce, Microsoft Dynamics 365 and Sugar CRM — so calling lives beside the customer records your teams work in.",
    icon: Boxes,
  },
  {
    title: "Productivity",
    description:
      "Microsoft Teams, MS Outlook and Google Workspace connect voice to the tools your organisation already runs on.",
    icon: LayoutGrid,
  },
  {
    title: "Service & staffing",
    description:
      "Zendesk for customer support and CEIPAL for high-volume recruiting desks, integrated with the platform.",
    icon: HeartHandshake,
  },
  {
    title: "Build your own",
    description:
      "Voice, SMS, WhatsApp, WebRTC and SIP APIs, with webhooks for real-time events, to embed communication in any product.",
    icon: Code2,
  },
];

export const partnerBenefits: CompanyItem[] = [
  {
    title: "Engineering you can lean on",
    description:
      "Network design and solution experts who have run SIP and unified communications for years, available to your team through the whole engagement.",
    icon: Network,
  },
  {
    title: "A network worth reselling",
    description:
      "A DoT-certified, HIPAA-compliant platform with redundant infrastructure across two data centres — the reliability your customers expect.",
    icon: ShieldCheck,
  },
  {
    title: "Support that answers",
    description:
      "24/7 assistance from a named team, so an issue at a partner's customer is owned end to end rather than passed around a queue.",
    icon: LifeBuoy,
  },
  {
    title: "Room to grow together",
    description:
      "Centralised management and billing that scale from ten lines to many sites, so a partnership can start small and expand.",
    icon: Rocket,
  },
];

/* -------------------------------------------------------------- certifications */

/**
 * The three credentials SipLink actually holds, explained honestly. Nothing
 * else — no SOC 2, ISO 27001, PCI DSS, SSAE-16 — and no expiry dates.
 */
export const certificationDetails: {
  name: string;
  short: string;
  body: string[];
  meansForYou: string[];
  icon: LucideIcon;
}[] = [
  {
    name: "HIPAA compliant",
    short: "For healthcare and other regulated work",
    body: [
      "SipLink operates a HIPAA-compliant cloud phone system. The Health Insurance Portability and Accountability Act sets the United States standard for protecting sensitive patient information, and it governs any organisation that handles protected health information — including the phone system it uses to talk to patients.",
      "For a medical practice, a billing company or any business touching patient data, that compliance is not a nice-to-have. It is the difference between a communication platform you can put into a clinical workflow and one you cannot.",
    ],
    meansForYou: [
      "Suitable for healthcare providers, medical billing and revenue cycle teams",
      "Call handling and recording that respects the confidentiality of patient information",
      "One less vendor to worry about when your own compliance is audited",
    ],
    icon: HeartPulse,
  },
  {
    name: "DoT certified",
    short: "A licensed carrier, not a reseller",
    body: [
      "SipLink is certified by India's Department of Telecommunications, the authority that licenses and regulates telecom operators. Certification means the network meets the technical and quality standards the DoT sets, with quality of service maintained across it.",
      "It also means SipLink runs as a licensed operator in its own right rather than reselling somebody else's minutes. When you place a call, you are on a network SipLink is accountable for end to end.",
    ],
    meansForYou: [
      "Voice carried on a licensed, regulated network with quality of service maintained",
      "A provider answerable to the regulator for the service it delivers",
      "Confidence for public sector and other buyers who require certified telephony",
    ],
    icon: Landmark,
  },
  {
    name: "D-U-N-S registered",
    short: "A verified business identity",
    body: [
      "SipLink holds a D-U-N-S Number, the unique nine-digit identifier issued by Dun & Bradstreet and used worldwide to verify that a business is a real, established entity. Registration involves confirming the company's legal name, address and operations.",
      "For procurement teams, partners and enterprise buyers, a D-U-N-S registration is a simple, independent check that the company they are contracting with is who it says it is.",
    ],
    meansForYou: [
      "An independently verified business identity for procurement and vendor onboarding",
      "A recognised reference point used in supplier and credit checks worldwide",
      "Reassurance for enterprise buyers running formal due diligence",
    ],
    icon: BadgeCheck,
  },
];

/**
 * How SipLink treats security day to day — the practices behind the badges,
 * drawn from platform capabilities already documented (lib/site.ts). These
 * are described as how the platform is operated, not as certifications.
 */
export const securityPractices: CompanyItem[] = [
  {
    title: "Encryption in transit",
    description:
      "TLS-encrypted signalling and SRTP media where supported, so calls and control traffic are protected as they cross the network.",
    icon: Lock,
  },
  {
    title: "Access control",
    description:
      "Two-factor authentication, role-based administration and IP access controls decide exactly who can do what inside your account.",
    icon: ShieldCheck,
  },
  {
    title: "Resilient by design",
    description:
      "Redundant infrastructure across two data centres with real-time replication, so the platform keeps running through component or site failure.",
    icon: ServerCog,
  },
  {
    title: "Watched around the clock",
    description:
      "Continuous monitoring and alerting on the network, with a support team available at any hour to act on what it sees.",
    icon: Activity,
  },
];

/* ----------------------------------------------------------------- careers */

export const careerValues: CompanyItem[] = [
  {
    title: "Work that is felt",
    description:
      "When our platform works, hospitals reach patients, recruiters place candidates and support teams answer. The stakes are real, and so is the satisfaction of getting it right.",
    icon: HeartHandshake,
  },
  {
    title: "Depth over buzzwords",
    description:
      "We are a network of genuine VoIP and unified communications experts. You will learn how carrier-grade voice really works from people who have run it for years.",
    icon: Network,
  },
  {
    title: "Ownership end to end",
    description:
      "The same principle that shapes our support shapes our teams: you own a problem from the first look to the resolution, with the autonomy to see it through.",
    icon: Workflow,
  },
  {
    title: "Built to scale, so is your role",
    description:
      "As the platform grows across more sites and services, the room to take on new responsibility grows with it. We would rather develop people than replace them.",
    icon: Rocket,
  },
];

/**
 * The kinds of work at SipLink — described as areas, not as open vacancies
 * with counts or titles we cannot substantiate.
 */
export const careerAreas: CompanyItem[] = [
  {
    title: "Network & VoIP engineering",
    description:
      "Design, run and harden the SIP and voice infrastructure that thousands of business conversations depend on every day.",
    icon: ServerCog,
  },
  {
    title: "Platform & software",
    description:
      "Build the portals, APIs and integrations that make cloud communication something a business can manage from a browser.",
    icon: Code2,
  },
  {
    title: "Customer support & success",
    description:
      "Be the named expert on the other end of WhatsApp, phone or email — the reason customers stay with SipLink.",
    icon: LifeBuoy,
  },
  {
    title: "Sales & partnerships",
    description:
      "Help businesses understand what modern communication can do for them, and grow the ecosystem of partners around the platform.",
    icon: UsersRound,
  },
];

export const careerLocations: CompanyItem[] = [
  {
    title: "Chennai",
    description:
      "Our T. Nagar office, one of three operating locations across India.",
    icon: Building2,
  },
  {
    title: "Bangalore",
    description:
      "In Cessna Business Park, at the heart of the city's technology corridor.",
    icon: Building2,
  },
  {
    title: "Hyderabad",
    description: "Our Madhapur office in the HITEC City district.",
    icon: Building2,
  },
];

/* -------------------------------------------------------------------- news */

/**
 * The kinds of update SipLink publishes. The one concrete, current item is
 * the announcement from lib/site.ts `announcement` (Voice AI Assistant and
 * WhatsApp Business v2 API endpoints live). No fabricated dated releases.
 */
export const newsTopics: CompanyItem[] = [
  {
    title: "Platform & product updates",
    description:
      "New capabilities across voice, messaging and APIs — from contact-centre features to the developer platform — as they go live.",
    icon: Sparkles,
  },
  {
    title: "Network & connectivity",
    description:
      "Changes to our infrastructure, points of presence and internet services that improve reliability and reach.",
    icon: Network,
  },
  {
    title: "Integrations",
    description:
      "New and expanded connections to the CRM, productivity and service tools businesses already use.",
    icon: Puzzle,
  },
  {
    title: "Company & milestones",
    description:
      "Notable moments in the growth of SipLink as a licensed operator and cloud communications provider.",
    icon: Building2,
  },
];

/**
 * The one current, doc-backed highlight for the newsroom. Sourced from
 * lib/site.ts `announcement`.
 */
export const newsHighlights: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    eyebrow: "Platform update",
    title: "Voice AI Assistant is live",
    body: "An intelligent voice layer that handles routine interactions naturally, gathers what it needs and hands off to a person when the conversation calls for one — now available on the SipLink platform.",
    href: "/products/ai-voice-assistant",
    icon: Bot,
  },
  {
    eyebrow: "Platform update",
    title: "WhatsApp Business v2 API endpoints",
    body: "Bring business conversations to WhatsApp — updates, support and customer engagement on a platform your customers already use every day, now available through v2 API endpoints.",
    href: "/products/whatsapp-api",
    icon: MessageCircle,
  },
];
