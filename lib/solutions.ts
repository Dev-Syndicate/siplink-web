import {
  ArrowLeftRight,
  Bot,
  Building2,
  ClipboardCheck,
  Cloud,
  CloudCog,
  Gauge,
  Globe,
  Headset,
  Layers,
  ListChecks,
  MapPin,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  Phone,
  PhoneForwarded,
  PhoneOutgoing,
  PlugZap,
  Repeat,
  Rocket,
  Route,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  Video,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Content for the individual solution pages under /solutions/[slug].
 *
 * Copy is refined — not invented — from the client-supplied source in
 * docs/website-contents.md (By Use Case, Migration and Enterprise are written
 * there almost verbatim) and docs/siplink-documentation.md (company
 * positioning and feature lists, which ground the By Business Size pages that
 * the source does not write out in full).
 *
 * Do not add claims the source flags as unverified: no prices, no uptime or
 * SLA percentages, no SOC 2 / ISO / GDPR wording, no named partner or carrier
 * logos, no capacity numbers, and no geographic-coverage figures (the source
 * states carrier-neutral POPs in Bangalore and Chennai only). See the
 * guardrails already documented in lib/site.ts.
 */

export type SolutionGroup = "By Business Size" | "By Use Case" | "Migration";

/** An ordered process step — used only where order genuinely carries meaning. */
export type SolutionStep = { title: string; body: string };

/** A named point in the "what you gain" / capability lists. */
export type SolutionPoint = { title: string; description: string; icon: LucideIcon };

/** Which schematic the page's hero draws (see SolutionIllustration). */
export type SolutionShape =
  | "distributed"
  | "routed"
  | "converge"
  | "scale"
  | "transition"
  | "edge";

export type SolutionDetail = {
  slug: string;
  group: SolutionGroup;
  title: string;
  icon: LucideIcon;
  /** The topology diagram drawn in the hero. */
  shape: SolutionShape;
  /** Short, benefit-first line under the page title. */
  tagline: string;
  /** Metadata description + hero intro paragraph. */
  intro: string;
  /** The situation the reader recognises. Left column of the problem spine. */
  challenge: { heading: string; body: string };
  /** How SipLink answers it. Right column of the problem spine. */
  handling: { heading: string; body: string[] };
  /** Concrete capabilities. Rendered as a quiet grid. */
  capabilities: SolutionPoint[];
  /** The payoff line that closes the argument. */
  gain: { heading: string; body: string };
  /** Who this is for. */
  idealFor?: string[];
  /**
   * An ordered process, rendered as a numbered sequence. Only migration
   * pages set this — migration is a genuine step-by-step process in the
   * source; feature grids are not, so they never get numbers.
   */
  process?: SolutionStep[];
};

/* ------------------------------------------------------------------ shared */

/** The migration method from docs/website-contents.md, refined into steps. */
export const migrationProcess: SolutionStep[] = [
  {
    title: "Understand what you run today",
    body: "We map your existing numbers, PRI or PBX configuration, users, extensions, departments and call flows before anything moves.",
  },
  {
    title: "Design the migration",
    body: "A plan is built around your requirements — how calls should route, which numbers port, and what the new environment needs to do on day one.",
  },
  {
    title: "Configure and test",
    body: "We build and validate the new setup in advance, checking that call flows behave as expected before any production traffic touches it.",
  },
  {
    title: "Port your numbers",
    body: "Eligible numbers transfer to SipLink so your customers keep reaching you on the numbers they already know.",
  },
  {
    title: "Cut over with continuity",
    body: "The switch is planned to keep communication running, minimising disruption for employees and customers during go-live.",
  },
  {
    title: "Monitor and tune",
    body: "After go-live we watch the new environment and adjust it so it keeps working the way your business needs.",
  },
];

/* ------------------------------------------------------------ by use case */

const useCase: SolutionDetail[] = [
  {
    slug: "remote-workforce",
    group: "By Use Case",
    title: "Remote Workforce",
    icon: MonitorSmartphone,
    shape: "distributed",
    tagline: "Keep your team connected, wherever they work.",
    intro:
      "Give remote and hybrid teams the same professional communication experience from the office, home or anywhere else — without losing control of your business communications.",
    challenge: {
      heading: "Distributed teams shouldn't sound distributed",
      body: "When employees work from everywhere, calls get missed, personal numbers creep in, and customers start to feel like they're dealing with a scattered team rather than one business.",
    },
    handling: {
      heading: "One business identity, any location",
      body: [
        "Employees stay reachable through their business numbers and connected tools whether they're at a desk, at home or on the move.",
        "Calls route between team members, departments and locations, so the person a customer needs is always one hop away — no matter where they're sitting.",
      ],
    },
    capabilities: [
      {
        title: "Desktop, mobile and browser calling",
        description:
          "Take business calls from a softphone, a phone in the pocket or straight from the browser with WebRTC.",
        icon: Smartphone,
      },
      {
        title: "Extension mobility",
        description:
          "An extension follows the person, not the desk, so moving location changes nothing for callers.",
        icon: ArrowLeftRight,
      },
      {
        title: "Presence and multi-device",
        description:
          "See who's available and pick up on whichever device is closest, with calls staying in sync.",
        icon: Users,
      },
      {
        title: "Centralised control",
        description:
          "Provision users, set routing and manage the whole team from one web portal.",
        icon: ServerCog,
      },
    ],
    idealFor: [
      "Hybrid and fully remote teams",
      "Businesses hiring across locations",
      "Companies replacing personal phones for work calls",
    ],
    gain: {
      heading: "Flexible working, without the trade-off",
      body: "Support employees working anywhere while keeping one consistent, professional voice for every customer who calls.",
    },
  },
  {
    slug: "customer-support",
    group: "By Use Case",
    title: "Customer Support",
    icon: Headset,
    shape: "routed",
    tagline: "Make every customer conversation count.",
    intro:
      "Give support teams a structured communication environment that gets each caller to the right person quickly and keeps managers in the picture.",
    challenge: {
      heading: "A missed call is a missed customer",
      body: "Without structure, calls land on whoever's free, queues form invisibly, and no one can see where conversations are being dropped or delayed.",
    },
    handling: {
      heading: "Route it right, then see it clearly",
      body: [
        "Calls are directed to the right department or the next available agent, so customers spend less time being transferred around.",
        "Teams handle conversations from one place and keep visibility into what's happening, which brings missed calls and response times down.",
      ],
    },
    capabilities: [
      {
        title: "Intelligent routing and queues",
        description:
          "Send each caller to the right team and hold the rest in an organised queue instead of a busy tone.",
        icon: Route,
      },
      {
        title: "IVR menus",
        description:
          "Let callers self-select Sales, Support or Billing before they ever reach an agent.",
        icon: ListChecks,
      },
      {
        title: "Recording and monitoring",
        description:
          "Capture conversations and let supervisors listen, whisper or barge to support agents live.",
        icon: Headset,
      },
      {
        title: "Analytics",
        description:
          "Understand call volumes, answered and missed calls, and busy periods to staff and improve accordingly.",
        icon: Gauge,
      },
    ],
    idealFor: [
      "Help desks and service teams",
      "Growing support operations",
      "Businesses tracking service quality",
    ],
    gain: {
      heading: "A more consistent experience, every call",
      body: "Fewer missed calls, faster responses, and a support experience that stays consistent as your team grows.",
    },
  },
  {
    slug: "sales-teams",
    group: "By Use Case",
    title: "Sales Teams",
    icon: TrendingUp,
    shape: "routed",
    tagline: "Turn more conversations into opportunities.",
    intro:
      "Give sales a communication environment built around reaching, engaging and following up with customers efficiently — with less manual work between calls.",
    challenge: {
      heading: "Reps should be selling, not dialling",
      body: "Time spent manually dialling, logging calls and hunting for context is time not spent building relationships and moving deals forward.",
    },
    handling: {
      heading: "Streamline the calling, keep the context",
      body: [
        "Representatives call through professional business numbers, and outbound calling is streamlined so more time goes to real conversations.",
        "Teams gain visibility into their customer conversations and stay organised, so follow-ups don't slip through the cracks.",
      ],
    },
    capabilities: [
      {
        title: "Streamlined outbound calling",
        description:
          "Spend more time speaking with prospects and less time on the repetitive parts of dialling.",
        icon: PhoneOutgoing,
      },
      {
        title: "Professional business numbers",
        description:
          "Reach prospects from consistent business numbers rather than personal lines.",
        icon: Phone,
      },
      {
        title: "Conversation visibility",
        description:
          "Keep track of customer conversations so the whole team knows where each relationship stands.",
        icon: Gauge,
      },
      {
        title: "CRM integration",
        description:
          "Connect calling to the CRM workflows your team already relies on, where the integration supports it.",
        icon: Workflow,
      },
    ],
    idealFor: [
      "Outbound and inside sales teams",
      "High-volume calling operations",
      "Teams that live in a CRM",
    ],
    gain: {
      heading: "More selling time, less busywork",
      body: "Cut the manual work around every call so representatives can focus on building relationships and closing.",
    },
  },
  {
    slug: "unified-communications",
    group: "By Use Case",
    title: "Unified Communications",
    icon: MessagesSquare,
    shape: "converge",
    tagline: "Bring your business communication together.",
    intro:
      "Bring calling, messaging, applications and team communication into one connected environment, instead of managing a separate system for each.",
    challenge: {
      heading: "Communication is scattered across tools",
      body: "When calling, messaging and collaboration all live in different systems, employees switch constantly and the business loses a single view of how it communicates.",
    },
    handling: {
      heading: "One environment, many channels",
      body: [
        "Different channels and workflows come together into one connected experience for employees and customers.",
        "That makes it easier for teams to communicate, collaborate and stay connected — and gives the business more control over its whole communication environment.",
      ],
    },
    capabilities: [
      {
        title: "Voice, video and messaging",
        description:
          "Calls, HD video meetings, instant messaging and presence on one platform.",
        icon: Video,
      },
      {
        title: "Collaboration in one place",
        description:
          "Bring team communication together instead of spreading it across separate apps.",
        icon: MessagesSquare,
      },
      {
        title: "Business app integrations",
        description:
          "Connect communication to the business applications your teams already use, where supported.",
        icon: Workflow,
      },
      {
        title: "One environment to manage",
        description:
          "Administer calls, video, chat and collaboration from a single platform.",
        icon: Layers,
      },
    ],
    idealFor: [
      "Teams juggling several communication apps",
      "Businesses standardising collaboration",
      "Organisations wanting one platform to manage",
    ],
    gain: {
      heading: "Less switching, more connection",
      body: "A unified experience that's easier for teams to use and easier for the business to control.",
    },
  },
  {
    slug: "global-offices",
    group: "By Use Case",
    title: "Global Offices",
    icon: Globe,
    shape: "distributed",
    tagline: "One communication experience across the world.",
    intro:
      "Connect employees, customers and offices across countries and regions through a single, consistent communication environment.",
    challenge: {
      heading: "A separate phone system per country doesn't scale",
      body: "As offices open in new markets, communication fragments into disconnected systems that are hard to manage and inconsistent for customers.",
    },
    handling: {
      heading: "Consistent globally, flexible locally",
      body: [
        "Maintain one communication experience across locations while still supporting local requirements and international operations.",
        "Whether teams are talking internally or serving customers in different markets, they stay connected without a patchwork of systems per site.",
      ],
    },
    capabilities: [
      {
        title: "Unified environment across sites",
        description:
          "Run one communication platform across regions instead of a different setup in every country.",
        icon: Globe,
      },
      {
        title: "Local numbers and routing",
        description:
          "Give each market the local presence it needs while routing stays centrally managed.",
        icon: MapPin,
      },
      {
        title: "Cross-location connectivity",
        description:
          "Connect employees and offices so internal calls and transfers work across borders.",
        icon: Network,
      },
      {
        title: "Centralised administration",
        description:
          "Manage users, numbers and policy for every location from one portal.",
        icon: ServerCog,
      },
    ],
    idealFor: [
      "Multi-country organisations",
      "Businesses entering new markets",
      "Teams serving customers across time zones",
    ],
    gain: {
      heading: "Connected everywhere, managed in one place",
      body: "Serve every market with a consistent business presence, without building and maintaining a separate system for each office.",
    },
  },
  {
    slug: "multi-branch",
    group: "By Use Case",
    title: "Multi-Branch Businesses",
    icon: Building2,
    shape: "distributed",
    tagline: "Connect every branch. Manage communication centrally.",
    intro:
      "Give a business with multiple branches one connected communication environment, while letting each location work the way it needs to.",
    challenge: {
      heading: "Every branch is its own island",
      body: "Independent phone setups per branch make it hard to keep standards consistent, transfer calls between sites, or see what's happening across the business.",
    },
    handling: {
      heading: "Local autonomy, central visibility",
      body: [
        "Each branch keeps its own business identity, numbers and workflows, while employees communicate efficiently across locations.",
        "Centralised visibility and management make it easier to hold consistent standards, support customers and manage growing operations.",
      ],
    },
    capabilities: [
      {
        title: "Per-branch identity",
        description:
          "Each location keeps its own numbers, greetings and call handling.",
        icon: Store,
      },
      {
        title: "Cross-branch calling",
        description:
          "Move calls and staff between sites without callers noticing the hand-off.",
        icon: ArrowLeftRight,
      },
      {
        title: "Central management",
        description:
          "Administer every branch, user and routing rule from a single portal.",
        icon: ServerCog,
      },
      {
        title: "Consistent standards",
        description:
          "Apply the same communication policies and quality across all locations.",
        icon: ShieldCheck,
      },
    ],
    idealFor: [
      "Retail and franchise networks",
      "Businesses opening new locations",
      "Operations that transfer calls between sites",
    ],
    gain: {
      heading: "One business, many branches, no seams",
      body: "Keep every location running its own way while managing communication — and seeing it — as one connected operation.",
    },
  },
];

/* -------------------------------------------------------- by business size */

const businessSize: SolutionDetail[] = [
  {
    slug: "startups",
    group: "By Business Size",
    title: "Startups",
    icon: Rocket,
    shape: "scale",
    tagline: "Flexible, affordable communication for fast-moving teams.",
    intro:
      "Start with a professional business phone system in the cloud — no hardware to buy, and room to add users and features as fast as you grow.",
    challenge: {
      heading: "You need to sound established on day one",
      body: "Early teams need a credible business presence and reliable calling, but can't tie up cash in phone hardware or a system they'll outgrow in a quarter.",
    },
    handling: {
      heading: "Cloud-first, so you scale not rebuild",
      body: [
        "Your phone system runs in the cloud and is managed from a web portal, so there's nothing to install and nothing in a telecom closet to maintain.",
        "Add extensions, numbers and capabilities as the team grows, without re-platforming every time headcount changes.",
      ],
    },
    capabilities: [
      {
        title: "Cloud phone system",
        description:
          "IP telephony, extensions and call handling delivered over the internet.",
        icon: CloudCog,
      },
      {
        title: "Mobile and browser calling",
        description:
          "Work from softphones, mobile and the browser from the first hire onward.",
        icon: Smartphone,
      },
      {
        title: "IVR and routing",
        description:
          "Sound like a bigger company with menus that route callers to the right place.",
        icon: ListChecks,
      },
      {
        title: "Scales with you",
        description:
          "Add users and features on demand instead of buying capacity up front.",
        icon: TrendingUp,
      },
    ],
    idealFor: [
      "Early-stage and fast-growing teams",
      "Founders who need a professional presence",
      "Businesses avoiding upfront hardware cost",
    ],
    gain: {
      heading: "Punch above your size",
      body: "A professional communication setup that costs less than legacy hardware and grows exactly as fast as you do.",
    },
  },
  {
    slug: "small-business",
    group: "By Business Size",
    title: "Small Business",
    icon: Store,
    shape: "scale",
    tagline: "Easy-to-use communication to stay connected and grow.",
    intro:
      "A complete business phone system that's simple to run day to day — with the call handling, mobility and integrations a growing small business actually uses.",
    challenge: {
      heading: "You don't have an IT department for the phones",
      body: "Small teams need reliable, professional communication that just works — without a specialist on staff to keep it running.",
    },
    handling: {
      heading: "Everything managed from one portal",
      body: [
        "Extensions, call flows, business hours and users are all configured centrally from a web portal, and changes take effect immediately.",
        "Staff share the same virtual PBX and stay reachable across desk phones, softphones, browsers and mobile.",
      ],
    },
    capabilities: [
      {
        title: "Shared virtual PBX",
        description:
          "One phone system the whole team shares, with extensions organised around how you work.",
        icon: Network,
      },
      {
        title: "Call recording and voicemail",
        description:
          "Record calls and get voicemail to email so nothing important is lost.",
        icon: Headset,
      },
      {
        title: "Business SMS and mobile app",
        description:
          "Reach customers by message and take the business line anywhere.",
        icon: Smartphone,
      },
      {
        title: "CRM and app integrations",
        description:
          "Connect calling to the business tools you already use, where supported.",
        icon: Workflow,
      },
    ],
    idealFor: [
      "Small teams without dedicated IT",
      "Businesses replacing ageing phone lines",
      "Companies that want mobility built in",
    ],
    gain: {
      heading: "Professional phones, minimal overhead",
      body: "A phone system that stays out of your way — easy to manage, reliable to run, and ready to grow when you are.",
    },
  },
  {
    slug: "mid-market",
    group: "By Business Size",
    title: "Mid-Market",
    icon: Layers,
    shape: "scale",
    tagline: "Advanced features for growing organisations.",
    intro:
      "Bring voice, contact-center capability and integrations together on one platform as your organisation adds teams, sites and complexity.",
    challenge: {
      heading: "Growth is outrunning your phone system",
      body: "As departments, sites and call volumes multiply, a basic phone setup stops keeping up with routing, reporting and integration needs.",
    },
    handling: {
      heading: "More capability, still one platform",
      body: [
        "Advanced call routing, queues and reporting handle rising volume, while multi-site management keeps growing operations under one roof.",
        "Communication connects to CRM and business applications, so calling becomes part of the workflow rather than a system beside it.",
      ],
    },
    capabilities: [
      {
        title: "Advanced routing and queues",
        description:
          "Skill-based routing, queues and call flows tuned to how each team works.",
        icon: Route,
      },
      {
        title: "Multi-site management",
        description:
          "Run several locations and departments from centralised administration.",
        icon: Building2,
      },
      {
        title: "Reporting and analytics",
        description:
          "CDR, agent and queue reports to understand and improve performance.",
        icon: Gauge,
      },
      {
        title: "CRM and business integrations",
        description:
          "Screen pop, click-to-dial and call logging connected to your applications, where supported.",
        icon: Workflow,
      },
    ],
    idealFor: [
      "Organisations adding teams and sites",
      "Businesses with rising call volume",
      "Companies standardising on one platform",
    ],
    gain: {
      heading: "Enterprise capability, without the sprawl",
      body: "Handle more volume, more sites and more integrations from a single platform that grows with the organisation.",
    },
  },
  {
    slug: "enterprise",
    group: "By Business Size",
    title: "Enterprise",
    icon: Building2,
    shape: "edge",
    tagline: "Communication built for scale, security and control.",
    intro:
      "Large organisations run many communication systems at once — Microsoft Teams, PBX platforms, SIP trunks, CRM and contact centers across multiple locations. SipLink is the layer that brings them together.",
    challenge: {
      heading: "Too many systems, not enough control",
      body: "Managing Teams, PBX platforms, SIP trunks, CRM applications and contact centers independently creates complexity and makes it hard for IT and business teams to keep visibility and control.",
    },
    handling: {
      heading: "One connected communication layer",
      body: [
        "SipLink connects your existing telephony, cloud platforms, business applications, employees and customers into a more organised environment.",
        "Calls route intelligently, teams connect across locations, communication integrates with business applications, and customer interactions can be monitored and analysed — so you modernise without replacing everything you already use.",
      ],
    },
    capabilities: [
      {
        title: "Microsoft Teams calling",
        description:
          "Connect Teams to your business telephony so users make and take external calls without a separate phone system.",
        icon: MessagesSquare,
      },
      {
        title: "Session Border Controller",
        description:
          "A controlled layer between your voice infrastructure and external SIP networks and platforms.",
        icon: ShieldCheck,
      },
      {
        title: "Enterprise call queues",
        description:
          "Organise high-volume calls across departments with routing rules, IVR and agent groups.",
        icon: Route,
      },
      {
        title: "CRM integration",
        description:
          "Bring calling and customer information together across sales, support and service.",
        icon: Workflow,
      },
      {
        title: "AI voice assistant",
        description:
          "Let an intelligent voice layer handle routine interactions and route the rest to the right agent.",
        icon: Bot,
      },
      {
        title: "SIP and carrier connectivity",
        description:
          "Connect existing PBX systems, trunks and platforms through one managed voice architecture.",
        icon: Network,
      },
    ],
    idealFor: [
      "Organisations with many communication systems",
      "Heavy Microsoft Teams investment",
      "IT teams consolidating voice architecture",
    ],
    gain: {
      heading: "From disconnected systems to one ecosystem",
      body: "Connect, integrate, automate and scale — turning complex communication infrastructure into one manageable, intelligent environment you can modernise gradually.",
    },
  },
];

/* --------------------------------------------------------------- migration */

const migration: SolutionDetail[] = [
  {
    slug: "pri-migration",
    group: "Migration",
    title: "Move from PRI",
    icon: PhoneForwarded,
    shape: "transition",
    tagline: "Move beyond traditional PRI connectivity.",
    intro:
      "Transition from PRI-based phone lines to SIP-based communication, so your voice moves onto a more flexible and scalable infrastructure.",
    challenge: {
      heading: "PRI is hard to scale and slow to change",
      body: "PRI-based phone systems become difficult to scale, maintain and adapt as communication requirements grow — every change means dealing with fixed physical lines.",
    },
    handling: {
      heading: "A planned transition to SIP",
      body: [
        "We assess your existing PRI setup and current number and calling requirements, then plan the move to SIP connectivity.",
        "Once configured, business calls route through SipLink's voice infrastructure instead of PRI — giving you a foundation for cloud calling, SIP trunking, IVR and contact-center capabilities.",
      ],
    },
    capabilities: [
      {
        title: "PRI assessment",
        description:
          "Review your existing lines, numbers and calling requirements before anything changes.",
        icon: ClipboardCheck,
      },
      {
        title: "SIP connectivity",
        description:
          "Move voice onto SIP so capacity flexes instead of being fixed to physical channels.",
        icon: Network,
      },
      {
        title: "Foundation for more",
        description:
          "Open the door to cloud calling, IVR, queues and contact-center features once you're on SIP.",
        icon: PlugZap,
      },
      {
        title: "Number continuity",
        description:
          "Keep your existing numbers through the transition where porting is available.",
        icon: Repeat,
      },
    ],
    process: migrationProcess,
    gain: {
      heading: "Flexibility PRI can't offer",
      body: "A communication environment that grows with your business instead of being tied to traditional PRI infrastructure.",
    },
  },
  {
    slug: "pbx-migration",
    group: "Migration",
    title: "PBX Migration",
    icon: ServerCog,
    shape: "transition",
    tagline: "Modernise your PBX without starting from scratch.",
    intro:
      "Move from a legacy on-premise PBX toward modern SIP and cloud communication while preserving the calling requirements your business depends on.",
    challenge: {
      heading: "On-premise PBX is a standing cost",
      body: "Legacy PBX systems need dedicated hardware, maintenance, upgrades and physical infrastructure — and adapting them to new ways of working is slow and expensive.",
    },
    handling: {
      heading: "Map what matters, modernise the rest",
      body: [
        "We review your users, extensions, numbers, departments, call flows and routing, then map those requirements into the new environment so people keep communicating with minimal disruption.",
        "The migration is also a chance to modernise — introducing cloud calling, remote connectivity, IVR, queues, recording and analytics where they add value.",
      ],
    },
    capabilities: [
      {
        title: "Configuration review",
        description:
          "Capture how your current PBX is set up so nothing important is lost in the move.",
        icon: ClipboardCheck,
      },
      {
        title: "Requirement mapping",
        description:
          "Translate existing extensions, routing and call flows into the new environment.",
        icon: ArrowLeftRight,
      },
      {
        title: "Modernise in place",
        description:
          "Add cloud calling, IVR, recording and analytics as part of the transition.",
        icon: Sparkles,
      },
      {
        title: "Less hardware dependence",
        description:
          "Reduce reliance on ageing on-premise equipment and its upkeep.",
        icon: Cloud,
      },
    ],
    process: migrationProcess,
    gain: {
      heading: "A modern system, familiar workflows",
      body: "Greater flexibility and far less dependence on ageing PBX hardware — without forcing your teams to relearn how they communicate.",
    },
  },
  {
    slug: "cloud-migration",
    group: "Migration",
    title: "Cloud Migration",
    icon: Cloud,
    shape: "transition",
    tagline: "Move your communication infrastructure to the cloud.",
    intro:
      "Move business communication out of hardware-dependent environments into a flexible cloud model that supports remote work, new locations and change.",
    challenge: {
      heading: "Hardware ties you to one place",
      body: "Traditional systems limit the business when employees need to work remotely, new locations need adding, or requirements change quickly.",
    },
    handling: {
      heading: "Plan, migrate, then work from anywhere",
      body: [
        "We plan the migration of users, numbers, extensions, calling workflows and services into the cloud.",
        "Once migrated, employees reach business communication through supported devices and apps — no longer tied to a specific office or PBX location.",
      ],
    },
    capabilities: [
      {
        title: "Migration planning",
        description:
          "Move users, numbers, extensions and workflows into the cloud in a structured way.",
        icon: ClipboardCheck,
      },
      {
        title: "Work from any device",
        description:
          "Reach the business phone system from supported devices and applications anywhere.",
        icon: MonitorSmartphone,
      },
      {
        title: "Scale on demand",
        description:
          "Grow teams, connect locations and add services without expanding physical telephony.",
        icon: TrendingUp,
      },
      {
        title: "Ready for hybrid work",
        description:
          "Support remote and hybrid employees as a default, not an afterthought.",
        icon: Users,
      },
    ],
    process: migrationProcess,
    gain: {
      heading: "Built for how work happens now",
      body: "A flexible communication environment designed for modern, distributed workplaces and future growth.",
    },
  },
  {
    slug: "number-porting",
    group: "Migration",
    title: "Number Porting",
    icon: Repeat,
    shape: "transition",
    tagline: "Keep the numbers your customers already know.",
    intro:
      "Transfer your existing business numbers to SipLink while maintaining continuity — so you modernise without asking customers to learn a new number.",
    challenge: {
      heading: "Changing numbers costs you customers",
      body: "A new number during migration means updating websites, ads, invoices, business cards and CRM records — and customers still calling the old one.",
    },
    handling: {
      heading: "A coordinated, low-disruption port",
      body: [
        "We coordinate the required information, validate the numbers and account details, plan the migration and configure the numbers within SipLink.",
        "Once ported, you use those numbers with SipLink services and apply the routing, IVR, extensions and queues you need.",
      ],
    },
    capabilities: [
      {
        title: "Eligibility and validation",
        description:
          "Check which numbers can port and confirm the account details up front.",
        icon: ClipboardCheck,
      },
      {
        title: "Coordinated migration",
        description:
          "Plan the port so numbers transfer with minimal disruption to your business.",
        icon: ArrowLeftRight,
      },
      {
        title: "Call handling on ported numbers",
        description:
          "Apply routing, IVR, extensions and queues to numbers once they're on SipLink.",
        icon: Route,
      },
      {
        title: "Business continuity",
        description:
          "Customers keep reaching you on the numbers they already have.",
        icon: Repeat,
      },
    ],
    process: migrationProcess,
    gain: {
      heading: "Modernise without missing a call",
      body: "Keep your established business identity and continue serving existing customers through the numbers they already know.",
    },
  },
];

export const solutionDetails: SolutionDetail[] = [
  ...businessSize,
  ...useCase,
  ...migration,
];

/**
 * Slugs linked from the nav that are really products, not audience/use-case
 * solutions. The [slug] route redirects these to their canonical /products
 * page so there is a single source of truth and no duplicate content.
 */
export const solutionRedirects: Record<string, string> = {
  "hosted-pbx": "/products/hosted-pbx",
  "sip-trunking": "/products/sip-trunking",
  "call-centre": "/products/call-center",
  smb: "/solutions/small-business",
  internet: "/products",
};

export function getSolutionDetail(slug: string): SolutionDetail | undefined {
  return solutionDetails.find((item) => item.slug === slug);
}

/** The three nav groups, in display order, for the /solutions index. */
export const solutionGroupOrder: SolutionGroup[] = [
  "By Business Size",
  "By Use Case",
  "Migration",
];
