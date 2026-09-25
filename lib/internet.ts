import {
  Activity,
  BadgeCheck,
  Boxes,
  Briefcase,
  Building2,
  Cable,
  Clock,
  Cloud,
  CloudCog,
  Compass,
  Expand,
  Eye,
  Factory,
  Gauge,
  GitBranch,
  Globe,
  GraduationCap,
  HardDrive,
  Headset,
  HeartPulse,
  Key,
  Landmark,
  LayoutGrid,
  LifeBuoy,
  Link2,
  ListChecks,
  Lock,
  MapPin,
  MapPinned,
  MonitorSmartphone,
  Network,
  Orbit,
  Package,
  Phone,
  PhoneCall,
  Puzzle,
  Radar,
  RefreshCw,
  Route,
  ScrollText,
  Server,
  ServerCog,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Signal,
  SlidersHorizontal,
  Store,
  Split,
  TrendingUp,
  Truck,
  UserCheck,
  Video,
  Users,
  Waypoints,
  Webhook,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------
 * Internet & connectivity content model
 *
 * Page shape follows docs/INTERNET.md: an /internet hub, four connectivity
 * services beneath it, and six network services beneath Network Solutions.
 * Copy is drawn from that brief, from the ISP material in details-content.md
 * §9 (the live leased-line page) and §19 (the Internet sales brochure), and
 * from docs/siplink-documentation.md §8.
 *
 * WHAT IS SOURCED — safe to keep:
 *   Class A ISP licensed by the DoT; carrier-neutral POPs in Bangalore and
 *   Chennai; Tier-1 peering; 50 Mbps–100 Gbps port range; uncontended and
 *   symmetrical delivery; committed information rate (CIR); encrypted VPN
 *   with firewall across fixed sites; Global NOC in Chennai on 24/7; NNI
 *   arrangements with last-mile telcos; the parent company's fibre network.
 *
 * WHAT IS NOT — do not harden into a claim without written evidence:
 *   broadband speeds and prices, any SLA percentage, static IP pricing, and
 *   SD-WAN / Business Wi-Fi / LAN & switching, which the older source
 *   documents do not mention at all. docs/INTERNET.md introduces these three
 *   and hedges every one of them ("can include", "depending on deployment",
 *   "where specified"). That hedging is deliberate and is preserved in tone
 *   here — do not tighten it into a promise.
 *
 *   docs/INTERNET.md §2 carries an explicit internal note: only state
 *   "symmetrical" where the commercial/technical specification confirms it.
 *   The symmetrical section below therefore explains what symmetrical
 *   delivery means and says it applies "where a symmetrical service is
 *   selected" — it never asserts that every SipLink service is symmetrical.
 *
 * WHAT MUST NEVER BE REPUBLISHED — see details-content.md §9:
 *   the Nortel BCN / Cisco 7500 infrastructure paragraph (fifteen-plus years
 *   out of date), the confidentiality clause pasted onto the public page, and
 *   the commercial terms from the proposal deck (§19) — validity windows,
 *   payment days, 18% interest, auto-renewal, 21-day delivery.
 *
 * The SLA percentage is deliberately absent. The only number on the live site
 * is 99.5% port availability, and it contradicts the brochures' 99.9%/99.99%
 * (details-content.md §20). This follows the same rule as `certifications`
 * and `reviewStats` in site.ts: describe what the SLA covers, publish no
 * figure until one is verified.
 *
 * Note on sourcing language: docs/INTERNET.md frequently annotates itself
 * ("SIPLINK's existing website states…", "Industry providers similarly
 * position…"). Those are notes to the author about where a claim came from,
 * not sentences for a visitor. They are stripped here and the underlying
 * claim is written as ordinary customer copy.
 * ---------------------------------------------------------------------- */

/** A named capability inside a section. */
export type InternetPoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/**
 * One section of a connectivity service — and a page in its own right, at
 * /internet/<service>/<section>.
 *
 * These began as anchored sections on the parent page. They are now separate
 * routes, which is what docs/INTERNET.md asks for, so each one carries what a
 * standalone page needs: its own `title` for navigation, a `tagline` and
 * `intro` for the hero and the metadata description, and enough body to be
 * worth landing on. The parent page links to them rather than repeating them,
 * so the same copy is never published at two URLs.
 *
 * A page renders whichever of the optional fields it sets, always in the same
 * order: body, points, list, steps, closing.
 */
export type InternetSection = {
  /** Last URL segment, and the anchor id when linked from elsewhere. */
  slug: string;
  /**
   * The next three are what a section needs to stand as its own page. They
   * are optional because only the three connectivity services promote their
   * sections to routes; the six network services keep theirs inline, where a
   * nav label and a second intro would be noise. `sectionsAsPages` on the
   * service is what decides, and `getSectionPages` narrows to these.
   */
  /** Navigation label — what the mega menu and the parent's cards show. */
  title?: string;
  /** Short line under the heading, and the blurb on the parent's card. */
  tagline?: string;
  /** Opening paragraph, and the page's metadata description. */
  intro?: string;
  /** Its own diagram. Falls back to the parent service's when absent. */
  scene?: SceneKind;
  eyebrow?: string;
  /** The page's own h1, or the section heading when rendered inline. */
  heading: string;
  /** Lead paragraph(s), after `intro`. */
  body?: string[];
  /** Explained capabilities, rendered as an icon grid. */
  points?: InternetPoint[];
  /** Bare items — application lists, "ideal for" lists, capability lists. */
  list?: string[];
  /** Caption above `list`, since a bare grid of nouns needs framing. */
  listCaption?: string;
  /** An ordered process. Only used where order genuinely carries meaning. */
  steps?: { title: string; body: string }[];
  /** The note the page ends on, before the call to action. */
  closing?: { heading: string; body: string };
};

/**
 * Which schematic the page hero draws. See ConnectivityScene.
 *
 * Every page under /internet has its own — twenty-one pages, twenty-one
 * scenes. Sharing one across a column made four pages that differ only in
 * their words look like the same page, so a section never falls back to its
 * parent's diagram in practice. Each scene draws what its own page argues:
 * `contention` wobbles because a shared line does, `symmetry` shows two bars
 * reaching the same mark, `address` keeps changing on one side and never on
 * the other.
 */
export type SceneKind =
  // Section indexes
  | "network"
  | "modules"
  // Business broadband
  | "broadband"
  | "applications"
  | "workday"
  // Dedicated internet
  | "dedicated"
  | "contention"
  | "symmetry"
  | "sla"
  | "enterprise"
  // Static IP
  | "static-ip"
  | "address"
  | "allowlist"
  | "provision"
  // Network solutions
  | "firewall"
  | "wifi"
  | "lan"
  | "vpn"
  | "sdwan"
  | "multisite";

export type InternetService = {
  slug: string;
  /** Set on the six services that live under /internet/network-solutions. */
  parent?: "network-solutions";
  /** Nav and card label. */
  title: string;
  eyebrow: string;
  /** Benefit-first line under the page title. */
  tagline: string;
  /** Metadata description and hero intro. */
  intro: string;
  /** Further hero paragraphs, after `intro`. */
  lede?: string[];
  icon: LucideIcon;
  scene: SceneKind;
  /** Who the service is for — rendered as a chip rail in the hero. */
  idealFor?: string[];
  /**
   * True on the three connectivity services, whose sections are routed as
   * their own pages under /internet/<service>/<section>. The parent then
   * links to them instead of rendering them, so nothing is published twice.
   * The six network services leave this unset and render inline.
   */
  sectionsAsPages?: boolean;
  sections: InternetSection[];
  /**
   * The journey docs/INTERNET.md asks for: having chosen connectivity, a
   * reader is shown the network services that layer onto it rather than
   * being left at a dead end. Slugs resolve through `getInternetService`.
   */
  addOns?: string[];
  /** The page's own call to action. */
  cta: { label: string; href: string };
};

/* ------------------------------------------------------------------ hub */

export const internetHero = {
  eyebrow: "Internet / Class A ISP",
  title: "Reliable business internet, built for the way you work.",
  description:
    "Your business depends on a stable connection for everything — cloud applications, video meetings, VoIP, CRM, ERP, payments, remote access and the day-to-day. SipLink builds connectivity around those requirements rather than selling you a line and leaving.",
} as const;

export const internetIntro = [
  "SipLink provides business internet and network solutions designed to give organisations reliable connectivity, scalable bandwidth and the flexibility to support growing digital operations.",
  "From business broadband and dedicated internet to static IP, managed network infrastructure, VPN, SD-WAN and multi-location connectivity, we can build a connectivity environment around what your business actually runs.",
] as const;

/**
 * Hero proof. Every figure is stated in a source document: the port range and
 * fibre network come from the Internet sales brochure, the Class A ISP licence
 * and the POP locations from the live ISP page. No uptime percentage — see
 * the file header.
 */
export const internetProof: { value: string; label: string }[] = [
  { value: "50 Mbps–100 Gbps", label: "Port sizes available" },
  { value: "Class A", label: "ISP licensed by the DoT" },
  { value: "Chennai & Bangalore", label: "Carrier-neutral POPs" },
  { value: "24/7", label: "Global NOC monitoring" },
];

/** The twelve capabilities the brief lists as the portfolio. */
export const internetCapabilities: { label: string; icon: LucideIcon }[] = [
  { label: "Business Broadband", icon: Wifi },
  { label: "Dedicated Internet", icon: Gauge },
  { label: "Dedicated Leased Lines", icon: Cable },
  { label: "Static IP", icon: MapPin },
  { label: "Managed Router & Firewall", icon: ShieldCheck },
  { label: "Business Wi-Fi", icon: Signal },
  { label: "LAN & Switching", icon: Network },
  { label: "VPN", icon: Lock },
  { label: "SD-WAN", icon: Waypoints },
  { label: "Multi-Location Networking", icon: MapPinned },
  { label: "Managed Network Services", icon: Settings2 },
  { label: "Monitoring and Support", icon: Activity },
];

export const internetDesignedFor = {
  heading: "Designed for business-critical connectivity",
  body: "Whether you run a small office, a growing company, an enterprise, a contact centre, a branch network or a multi-location organisation, we can design connectivity around your bandwidth, application, security and availability requirements.",
  cta: "Talk to a connectivity expert",
} as const;

/**
 * The combination stack from docs/INTERNET.md — the point being that SipLink
 * is not selling an internet connection, it is selling the layer business
 * applications sit on. Order is load-bearing: each tier rests on the one
 * above it.
 */
export const internetStack: {
  tier: string;
  caption: string;
  icon: LucideIcon;
  items: { label: string; href?: string }[];
}[] = [
  {
    tier: "Internet",
    caption: "The connection itself",
    icon: Globe,
    items: [
      { label: "Business Broadband", href: "/internet/business-broadband" },
      { label: "Dedicated Internet", href: "/internet/dedicated-internet" },
      { label: "Static IP", href: "/internet/static-ip" },
    ],
  },
  {
    tier: "Security",
    caption: "Who gets on, and to what",
    icon: ShieldCheck,
    items: [
      {
        label: "Managed Firewall",
        href: "/internet/network-solutions/managed-router-firewall",
      },
      { label: "VPN", href: "/internet/network-solutions/vpn" },
      { label: "Access Control" },
    ],
  },
  {
    tier: "Network",
    caption: "Inside the building",
    icon: Network,
    items: [
      {
        label: "Router",
        href: "/internet/network-solutions/managed-router-firewall",
      },
      {
        label: "LAN & Switching",
        href: "/internet/network-solutions/lan-switching",
      },
      {
        label: "Business Wi-Fi",
        href: "/internet/network-solutions/business-wifi",
      },
    ],
  },
  {
    tier: "WAN",
    caption: "Between the buildings",
    icon: Waypoints,
    items: [
      { label: "SD-WAN", href: "/internet/network-solutions/sd-wan" },
      {
        label: "Multi-Location Networking",
        href: "/internet/network-solutions/multi-location-networking",
      },
    ],
  },
  {
    tier: "Applications",
    caption: "What it all carries",
    icon: Boxes,
    items: [
      { label: "VoIP", href: "/products/sip-trunking" },
      { label: "Cloud Applications" },
      { label: "CRM" },
      { label: "ERP" },
      { label: "Video Conferencing" },
    ],
  },
];

/** "Why SipLink Internet?" — the eight points from the brief. */
export const internetWhy: InternetPoint[] = [
  {
    title: "Business-focused connectivity",
    description:
      "Solutions designed around business users, applications and operational requirements — not a consumer plan sold to an office.",
    icon: Briefcase,
  },
  {
    title: "Dedicated connectivity options",
    description:
      "Dedicated internet and leased-line services for organisations that need predictable bandwidth rather than a best-effort share.",
    icon: Gauge,
  },
  {
    title: "Network expertise",
    description:
      "Connectivity can be combined with VPN, managed infrastructure and other network services, designed together rather than bolted on.",
    icon: Network,
  },
  {
    title: "Multi-location capability",
    description:
      "Connect offices, branches and distributed business environments under one network design and one point of contact.",
    icon: MapPinned,
  },
  {
    title: "Carrier-neutral infrastructure",
    description:
      "Carrier-neutral POPs in Chennai and Bangalore, so the route to your applications is not tied to a single upstream carrier.",
    icon: Building2,
  },
  {
    title: "Managed services",
    description:
      "Go beyond connectivity with managed network and infrastructure services, so your team is not the escalation path.",
    icon: Settings2,
  },
  {
    title: "Voice and internet together",
    description:
      "Our internet and communications portfolio supports business VoIP, SIP and unified communications alongside the connectivity carrying them.",
    icon: PhoneCall,
  },
  {
    title: "24/7 support",
    description:
      "Monitored from our Global NOC in Chennai around the clock. The commitment that applies to your service is set out in its SLA.",
    icon: Headset,
  },
];

export const internetAssurances: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Guaranteed bandwidth",
    description: "Always the speed you pay for.",
    icon: Gauge,
  },
  {
    title: "Future ready",
    description: "Scalable solutions to support your growth.",
    icon: TrendingUp,
  },
  {
    title: "24/7 monitoring",
    description: "Round-the-clock network monitoring and support.",
    icon: Clock,
  },
  {
    title: "SLA assured",
    description: "Service levels agreed and set out in writing.",
    icon: ScrollText,
  },
  {
    title: "Pan-India presence",
    description: "Extensive fibre network across India.",
    icon: Globe,
  },
];

/**
 * How a circuit actually gets delivered, from the brochure's service-delivery
 * and programme-management sections. The commercial terms that sit beside
 * them in the source deck are proposal terms and are not published here.
 */
export const internetDelivery: { title: string; body: string }[] = [
  {
    title: "Feasibility",
    body: "We check what is deliverable at your address. Every quote is subject to technical and commercial feasibility at the time the order is placed, so this comes first rather than last.",
  },
  {
    title: "Order and programme manager",
    body: "Once the order is logged, a programme manager takes it and confirms your timeline. Delivery depends on the last mile, so the date comes from your location and connectivity type — not from a standard lead time.",
  },
  {
    title: "Last-mile build",
    body: "Our implementation team coordinates vendors, carriers and internal departments to get the circuit commissioned to schedule. Delays caused by government agencies and permissions are the one thing outside our control.",
  },
  {
    title: "Testing and handover",
    body: "After installation the circuit is tested end to end and handed to the support team, with the installation report signed off by you.",
  },
  {
    title: "Monitored from day one",
    body: "The link is watched from our Global NOC in Chennai on a 24/7 basis, with the same team on the phone whenever you need them.",
  },
];

/* --------------------------------------------------------- comparison */

/**
 * The comparison matrix from docs/INTERNET.md. Values are deliberately
 * qualified where the brief qualifies them — "Plan dependent" is an honest
 * answer and is kept rather than rounded up to a tick.
 */
export const internetComparisonColumns: {
  href: string;
  label: string;
}[] = [
  { href: "/internet/business-broadband", label: "Business Broadband" },
  { href: "/internet/dedicated-internet", label: "Dedicated Internet" },
  { href: "/internet/static-ip", label: "Static IP" },
  { href: "/internet/network-solutions", label: "Managed Network" },
  { href: "/internet/network-solutions/sd-wan", label: "SD-WAN" },
];

/** `true` renders a tick, `false` a dash, a string renders as-is. */
export const internetComparisonRows: {
  requirement: string;
  values: (boolean | string)[];
}[] = [
  {
    requirement: "Everyday business internet",
    values: [true, true, false, true, true],
  },
  {
    requirement: "Dedicated bandwidth",
    values: ["Plan dependent", true, false, "Plan dependent", "Link dependent"],
  },
  {
    requirement: "Symmetrical bandwidth",
    values: [
      "Plan dependent",
      "Where specified",
      false,
      "Plan dependent",
      "Link dependent",
    ],
  },
  {
    requirement: "Static public IP",
    values: ["Eligible plans", "Typical", true, true, true],
  },
  {
    requirement: "SLA",
    values: ["Plan dependent", true, "Service dependent", true, true],
  },
  {
    requirement: "Managed router",
    values: ["Optional", "Optional", false, true, true],
  },
  {
    requirement: "Firewall",
    values: ["Optional", "Optional", false, true, true],
  },
  {
    requirement: "VPN",
    values: ["Optional", "Optional", "Supported", true, true],
  },
  {
    requirement: "Multiple locations",
    values: ["Limited", true, false, true, true],
  },
  {
    requirement: "Centralised management",
    values: [false, "Optional", false, true, true],
  },
  {
    requirement: "Application-aware routing",
    values: [false, false, false, "Optional", true],
  },
  {
    requirement: "Automatic failover",
    values: ["Optional", "Optional", false, "Optional", true],
  },
];

export const internetComparisonBestFor = [
  "SMB and offices",
  "Critical business operations",
  "Fixed-IP requirements",
  "Managed networks",
  "Multi-site enterprises",
];

/* --------------------------------------------------------------- FAQs */

export const internetFaqs: { question: string; answer: string }[] = [
  {
    question: "What is business broadband?",
    answer:
      "An internet service designed for business locations and everyday business applications — cloud software, email, video conferencing, VoIP and web applications. It differs from a consumer connection in how it is supported and in what can be added to it, such as static IP and a managed router.",
  },
  {
    question: "What is dedicated internet?",
    answer:
      "A connectivity service where bandwidth is provisioned specifically for your business rather than shared with other users on the same segment. It suits organisations that need predictable bandwidth, higher service assurance and support for business-critical applications.",
  },
  {
    question:
      "What is the difference between business broadband and dedicated internet?",
    answer:
      "Business broadband is intended for everyday business connectivity. Dedicated internet is designed for organisations with stronger requirements for dedicated bandwidth, performance, reliability and SLA-backed service. If a slow hour would cost you money, that is the line between the two.",
  },
  {
    question: "What is a static IP?",
    answer:
      "A fixed public IP address assigned to your internet connection that does not change. It is useful for VPNs, remote access, IP allowlisting, hosted applications, VoIP and any system that needs to be reached at a consistent address.",
  },
  {
    question: "Do I need a static IP for my business?",
    answer:
      "Not every business does. It becomes useful when you run VPNs, remote-access systems, IP allowlisting, hosted services, certain VoIP configurations or other applications that require fixed addressing. If none of those apply, a dynamic address is usually fine.",
  },
  {
    question: "Can SipLink provide internet for multiple offices?",
    answer:
      "Yes. Our network portfolio includes VPN, dedicated connectivity and multi-location network services, and we can quote and manage each site under a single design.",
  },
  {
    question: "What is SD-WAN?",
    answer:
      "A software-defined approach to managing wide-area networks. It provides centralised control over routing, application traffic, connectivity paths and network policies across multiple locations, so branches can be standardised rather than configured one at a time.",
  },
  {
    question: "Can SipLink manage my router and firewall?",
    answer:
      "We can provide managed network solutions where the applicable service includes managed router and firewall capabilities. The exact equipment, features and management scope depend on the deployment and are confirmed before you order.",
  },
  {
    question: "Can SipLink provide business Wi-Fi?",
    answer:
      "Business Wi-Fi can be offered as part of a broader network deployment, subject to site requirements and technical feasibility. A coverage assessment comes before any design.",
  },
  {
    question: "Can SipLink connect my branches?",
    answer:
      "Yes. Multi-location connectivity can be designed using appropriate combinations of internet, VPN, SD-WAN and managed network infrastructure, sized to how much traffic actually moves between sites.",
  },
  {
    question: "Does SipLink provide SLA-backed internet?",
    answer:
      "Our internet services include SLA arrangements covering SipLink equipment, the local access network and the IP network. The uptime, response, restoration and performance commitments that apply to you are confirmed in your service-specific SLA rather than quoted as a headline figure here.",
  },
  {
    question: "Can SipLink provide a backup internet connection?",
    answer:
      "Backup connectivity can be designed where it is technically and commercially available at your address. A redundant link can be used for business continuity and failover, and SD-WAN can make the switch between them automatic.",
  },
];

/* ------------------------------------------------------ connectivity */

const businessBroadband: InternetService = {
  slug: "business-broadband",
  title: "Business Broadband",
  eyebrow: "Connectivity",
  tagline: "Fast, reliable internet for growing businesses.",
  intro:
    "SipLink Business Broadband is for businesses that need dependable internet for everyday operations without the complexity — or the cost — of an enterprise dedicated circuit.",
  lede: [
    "Connect employees, cloud applications, collaboration platforms, VoIP services, CRM systems and business devices through a connection built for a workplace rather than a household.",
  ],
  icon: Wifi,
  scene: "broadband",
  sectionsAsPages: true,
  idealFor: [
    "Small and medium businesses",
    "Offices and commercial establishments",
    "Startups and growing companies",
    "Professional services",
    "Retail outlets",
    "Clinics and educational institutions",
    "Branch offices",
    "Teams using cloud applications",
  ],
  sections: [
    {
      slug: "plans",
      title: "Plans",
      eyebrow: "Plans",
      heading: "Sized against how you actually work",
      tagline: "There is no standard office, so there is no standard plan.",
      intro:
        "Rather than publishing a speed tier and hoping it fits, we size a business broadband connection against what actually runs on it — how many people, which applications, and how much of the traffic travels upward.",
      body: [
        "Most connections that disappoint were not undersized on paper. They were sized on headcount alone, and nobody asked what those people would be doing: a twelve-person design studio pushing renders to the cloud is a heavier load than a forty-person office reading email.",
        "So the conversation starts with the work, not the number. The nine factors below are what we actually ask about.",
      ],
      listCaption: "A plan is chosen on",
      list: [
        "Number of users",
        "Internet usage",
        "Business applications",
        "Upload requirements",
        "Cloud usage",
        "Voice and video requirements",
        "Number of connected devices",
        "Location",
        "Required support level",
      ],
      points: [
        {
          title: "Concurrency, not headcount",
          description:
            "What matters is how many people are using the connection at once, at the busiest hour of the day — not how many desks there are.",
          icon: Users,
        },
        {
          title: "The upward half",
          description:
            "Cloud backup, file sync, video calls and VoIP all travel outward. An office that uploads heavily needs a plan chosen on its upload, not its download.",
          icon: TrendingUp,
        },
        {
          title: "Voice gets counted separately",
          description:
            "Calls are not large, but they are unforgiving about timing. Where SipLink voice runs over the same line, we size and prioritise for it explicitly.",
          icon: PhoneCall,
        },
        {
          title: "Headroom for the next year",
          description:
            "A plan sized exactly to today is a plan you outgrow. We leave room for the hires and applications you already know are coming.",
          icon: Expand,
        },
      ],
      steps: [
        {
          title: "Tell us the work",
          body: "How many people, what they run, and which applications would hurt most if they slowed down.",
        },
        {
          title: "We check the address",
          body: "What is deliverable at your location, and on what timescale. Feasibility comes before a quote, not after it.",
        },
        {
          title: "We size and quote",
          body: "A plan matched to the work, with static IP, a managed router or Wi-Fi added only where you actually need them.",
        },
      ],
    },
    {
      slug: "features",
      title: "Features",
      eyebrow: "Features",
      heading: "Business-ready connectivity",
      tagline: "Judged by what still works at eleven o'clock on a Monday.",
      intro:
        "A business connection is not a faster consumer one. It is judged on what keeps running during the busiest hour of the week, and on what can be added to it when the business needs something a household never would.",
      scene: "applications",
      body: [
        "These are the applications business broadband is expected to carry — all of them at the same time, on the same line, without one of them starving the others.",
      ],
      listCaption: "Supports",
      list: [
        "Business email",
        "Cloud applications",
        "CRM and ERP",
        "Microsoft 365 and collaboration",
        "Video conferencing",
        "VoIP and cloud telephony",
        "File sharing",
        "Web applications",
        "Online payments",
        "CCTV and cloud monitoring",
        "Remote access",
        "Business Wi-Fi",
      ],
      points: [
        {
          title: "Scalable connectivity",
          description:
            "As your business grows, its internet requirement grows with it. We review bandwidth and network requirements with you as users, applications and locations increase.",
          icon: TrendingUp,
        },
        {
          title: "Business support",
          description:
            "Assistance for connectivity, service issues and network-related requirements through SipLink support channels rather than a consumer queue.",
          icon: LifeBuoy,
        },
        {
          title: "Static IP availability",
          description:
            "Static IP can be added on eligible plans for business applications, remote access, VPN, hosting and other use cases that need a fixed address.",
          icon: MapPin,
        },
      ],
    },
    {
      slug: "business-benefits",
      title: "Business Benefits",
      eyebrow: "Benefits",
      heading: "Built for everyday business",
      tagline: "What changes when the office line is a business one.",
      intro:
        "The difference between a business connection and a consumer one shows up in ordinary weeks rather than exceptional ones — in whether the Monday video call holds, whether the CRM is quick at four in the afternoon, and in who answers when it is not.",
      scene: "workday",
      body: [
        "None of these are dramatic on their own. Together they are the difference between connectivity you think about and connectivity you do not.",
      ],
      points: [
        {
          title: "Reliable connectivity",
          description:
            "Keep employees and business applications connected throughout the working day.",
          icon: ShieldCheck,
        },
        {
          title: "Better cloud access",
          description:
            "Support cloud-based CRM, ERP, SaaS and collaboration applications.",
          icon: Cloud,
        },
        {
          title: "Support for VoIP",
          description:
            "A stable internet foundation for SIP and cloud-based business communications.",
          icon: PhoneCall,
        },
        {
          title: "Work from anywhere",
          description:
            "Support secure remote access to business resources and applications.",
          icon: MonitorSmartphone,
        },
        {
          title: "Easy to scale",
          description:
            "Upgrade your connectivity as your business requirements grow.",
          icon: Expand,
        },
        {
          title: "Business-focused support",
          description:
            "Dedicated assistance for your connectivity requirements.",
          icon: Headset,
        },
      ],
      closing: {
        heading: "When broadband stops being enough",
        body: "If an hour of degraded performance would cost you real money, the honest answer is dedicated internet rather than a larger broadband plan. We will say so rather than sell you the upgrade.",
      },
    },
  ],
  addOns: [
    "static-ip",
    "managed-router-firewall",
    "business-wifi",
    "lan-switching",
  ],
  cta: { label: "Get a business broadband quote", href: "/contact" },
};

const dedicatedInternet: InternetService = {
  slug: "dedicated-internet",
  title: "Dedicated Internet",
  eyebrow: "Connectivity",
  tagline: "Dedicated connectivity for business-critical operations.",
  intro:
    "When your business depends heavily on its connection, shared broadband may not give you the performance, consistency or assurance you need.",
  lede: [
    "SipLink Dedicated Internet provides a dedicated internet port at a dedicated port speed, designed for organisations that need predictable bandwidth, reliable performance and SLA-backed service.",
  ],
  icon: Gauge,
  scene: "dedicated",
  sectionsAsPages: true,
  idealFor: [
    "Enterprises",
    "IT and ITES companies",
    "Contact centres",
    "Financial services",
    "Healthcare organisations",
    "Educational institutions",
    "Manufacturing",
    "Data-intensive businesses",
    "Cloud-dependent organisations",
    "Multi-location businesses",
  ],
  sections: [
    {
      slug: "dedicated-bandwidth",
      title: "Dedicated Bandwidth",
      eyebrow: "Dedicated bandwidth",
      heading: "Bandwidth provisioned for you, not shared with the street",
      tagline:
        "What you buy at five in the morning is what you have at five in the evening.",
      intro:
        "With dedicated internet, bandwidth is provisioned specifically for your business requirement rather than drawn from a pool shared with everyone else on the segment.",
      scene: "contention",
      body: [
        "Contended services are sold on a peak figure and delivered on an average one. That is a reasonable trade for a household, where the busy hour is the evening and nothing important depends on it. It is a poor trade for a business, whose busy hour is the working day and whose systems are all in use at once.",
        "Dedicated capacity removes the variable. It makes throughput something you can design around rather than something you discover.",
      ],
      points: [
        {
          title: "No contention ratio",
          description:
            "Your capacity is not divided among other subscribers, so performance does not move with the neighbours' usage or the time of day.",
          icon: Gauge,
        },
        {
          title: "A committed rate",
          description:
            "The service is delivered against a committed information rate rather than a best-effort maximum, so the figure in the contract is the figure you plan against.",
          icon: BadgeCheck,
        },
        {
          title: "Predictable under load",
          description:
            "Month-end, a large migration or a full day of video calls do not change the shape of the connection — which is the entire point of buying it.",
          icon: Activity,
        },
        {
          title: "Sized from 50 Mbps to 100 Gbps",
          description:
            "Port sizes across that range, chosen against the requirement rather than the tier above whatever you have now.",
          icon: Expand,
        },
      ],
      listCaption: "Designed to carry",
      list: [
        "Cloud applications",
        "VoIP",
        "Video conferencing",
        "Large file transfers",
        "Cloud backup",
        "ERP",
        "CRM",
        "Hosted applications",
        "Data centre connectivity",
        "Remote access",
        "Business-critical SaaS",
      ],
      closing: {
        heading: "The test is simple",
        body: "If an hour of degraded throughput would cost you money, meetings or customers, the capacity should not be shared. If it would merely be irritating, business broadband is the honest answer and we will say so.",
      },
    },
    {
      slug: "symmetrical-speeds",
      title: "Symmetrical Speeds",
      eyebrow: "Symmetrical speeds",
      heading: "Equal upload and download performance",
      tagline: "Businesses do not only download.",
      intro:
        "Consumer connections are built on the assumption that data flows inward. Business traffic does not behave that way, and a connection tuned for consumption starves exactly the traffic an organisation depends on.",
      scene: "symmetry",
      body: [
        "Every backup, every file sync, every outbound video stream and every voice call travels upward. On an asymmetric line those are the first things to suffer, and they suffer invisibly: the download test still looks fine while the call breaks up and the backup never finishes.",
        "Where a symmetrical service is selected, upload and download bandwidth are provisioned equally to support two-way business traffic. That matters most for cloud applications, video collaboration, data transfer, remote access and hosted services.",
      ],
      listCaption: "Traffic that travels upward",
      list: [
        "Files",
        "Cloud backups",
        "Video",
        "Database information",
        "Applications",
        "VoIP traffic",
        "Business transactions",
        "Collaboration content",
      ],
      points: [
        {
          title: "Video calls are uploads",
          description:
            "Your camera sends as much as it receives. A meeting where everyone else looks fine and you do not is usually an upstream problem.",
          icon: Video,
        },
        {
          title: "Backups finish overnight",
          description:
            "Cloud backup is bounded by upload. Symmetrical capacity is the difference between a job that completes by morning and one that never does.",
          icon: CloudCog,
        },
        {
          title: "Voice quality holds",
          description:
            "SIP traffic is small but constant in both directions. Starved upstream shows up as choppy audio long before anything else breaks.",
          icon: PhoneCall,
        },
        {
          title: "Remote access works both ways",
          description:
            "When colleagues reach systems hosted in your office, your upload is their download — and it sets what they experience.",
          icon: MonitorSmartphone,
        },
      ],
      closing: {
        heading: "Confirmed per service",
        body: "Symmetrical delivery applies where the selected service specifies it. We will confirm in writing whether it applies to the service quoted for your site rather than leaving you to assume it.",
      },
    },
    {
      slug: "sla",
      title: "SLA",
      eyebrow: "SLA",
      heading: "Service commitments, in writing",
      tagline:
        "Bandwidth is a number. An SLA is a promise about what happens when it stops.",
      intro:
        "Business connectivity needs more than capacity. It needs defined commitments about response, restoration and accountability — agreed before anything goes wrong, when there is no pressure to be vague.",
      scene: "sla",
      body: [
        "SipLink can provide SLA-backed connectivity options based on the service and commercial agreement selected. Our internet services include SLA arrangements covering SipLink equipment, the local access network and the IP network — the three places a fault actually occurs.",
        "We do not publish a headline uptime figure on this page. The commitment that applies to you depends on the service, the site and the last mile, and quoting an unrelated number here would tell you nothing useful about either.",
      ],
      listCaption: "An SLA may address",
      list: [
        "Service availability",
        "Network performance",
        "Fault response",
        "Restoration targets",
        "Escalation procedures",
        "Service monitoring",
        "Support availability",
        "Service credits, where applicable",
      ],
      points: [
        {
          title: "Covers the whole path",
          description:
            "SipLink equipment, the local access network and the IP network are all in scope, so a fault does not fall into a gap between suppliers.",
          icon: ShieldCheck,
        },
        {
          title: "Monitored, not reported",
          description:
            "Circuits are watched from our Global NOC in Chennai around the clock, so in most cases the fault is already open before you call.",
          icon: Activity,
        },
        {
          title: "A defined escalation path",
          description:
            "Who to reach, and who they reach next, agreed in advance — rather than discovered during the incident.",
          icon: Route,
        },
        {
          title: "Written, not implied",
          description:
            "Whatever is committed appears in your service agreement. If it is not written down, treat it as not committed — with any provider.",
          icon: ScrollText,
        },
      ],
      closing: {
        heading: "Ask for the numbers",
        body: "When you request a quote, ask for the availability, response and restoration targets that apply to your service and site. We would rather give you figures we can stand behind than headline ones we cannot.",
      },
    },
    {
      slug: "enterprise-connectivity",
      title: "Enterprise Connectivity",
      eyebrow: "Enterprise connectivity",
      heading: "Internet designed around your business",
      tagline: "Not a bigger plan — a different question.",
      intro:
        "Enterprise connectivity is not simply a higher bandwidth tier. It is a design problem, and the answer changes with every one of the inputs below.",
      scene: "enterprise",
      body: [
        "Two organisations with identical headcounts and identical budgets can need entirely different networks, because one runs everything in a data centre and the other runs everything in someone else's cloud. Bandwidth is the last decision in that conversation, not the first.",
      ],
      listCaption: "We design around",
      list: [
        "Business applications",
        "Number of users",
        "Office locations",
        "Cloud requirements",
        "Voice requirements",
        "Security",
        "Redundancy",
        "Remote workforce",
        "Data centre requirements",
        "Network architecture",
        "Future growth",
      ],
      points: [
        {
          title: "Cloud-first businesses",
          description:
            "Reliable connectivity for SaaS, cloud platforms and hosted applications.",
          icon: Cloud,
        },
        {
          title: "Contact centres",
          description:
            "Stable connectivity for voice, CRM, recording and real-time applications.",
          icon: Headset,
        },
        {
          title: "Multi-location organisations",
          description:
            "Connect offices, branches and operational locations under one design.",
          icon: MapPinned,
        },
        {
          title: "IT and technology companies",
          description:
            "Support high-volume data transfers, cloud workloads and collaboration.",
          icon: ServerCog,
        },
        {
          title: "Financial and professional services",
          description:
            "Support secure access to critical applications and systems.",
          icon: Landmark,
        },
        {
          title: "Manufacturing and operations",
          description:
            "Connect business systems, sites, applications and connected devices.",
          icon: Factory,
        },
      ],
      closing: {
        heading: "Start with the architecture",
        body: "Tell us what your sites look like, where your applications live and what cannot be allowed to stop. The port size falls out of that conversation rather than starting it.",
      },
    },
  ],
  addOns: [
    "static-ip",
    "managed-router-firewall",
    "vpn",
    "sd-wan",
    "multi-location-networking",
  ],
  cta: { label: "Talk to a connectivity expert", href: "/contact" },
};

const staticIp: InternetService = {
  slug: "static-ip",
  title: "Static IP",
  eyebrow: "Connectivity",
  tagline: "A fixed internet address for your business.",
  intro:
    "A static IP is a public internet address that stays the same instead of changing periodically. For businesses that need predictable inbound access or IP-based security controls, it makes network and application management considerably simpler.",
  lede: [
    "Static IPs are commonly used for VPN access, IP allowlisting, hosted applications, remote access, servers, surveillance and business communication systems.",
  ],
  icon: MapPin,
  scene: "static-ip",
  sectionsAsPages: true,
  idealFor: [
    "VPN",
    "Remote access",
    "IP allowlisting",
    "Cloud applications",
    "VoIP",
    "Servers",
    "CCTV",
    "API integrations",
  ],
  sections: [
    {
      slug: "what-is-static-ip",
      title: "What is Static IP?",
      eyebrow: "What it is",
      heading: "A public address that stays put",
      tagline: "One number you write into a rule once.",
      intro:
        "A static IP is a public IP address assigned to your business connection that remains fixed. Unlike a dynamic address, which may change, it gives you one consistent value that other systems can be configured to trust.",
      scene: "address",
      body: [
        "Most connections are issued a dynamic address: the network hands you one from a pool, and it may be replaced. For browsing that is invisible and entirely fine. It stops being fine the moment something outside needs to find you, because the address a rule was written against is no longer the address you have.",
        "Your office may need to let employees or approved systems connect from outside. With a fixed public address, an administrator configures the access rule around a known value, and it keeps working next month.",
      ],
      points: [
        {
          title: "Dynamic: assigned from a pool",
          description:
            "Fine for outbound browsing and email. Anything configured to trust it can break without warning when it changes.",
          icon: RefreshCw,
        },
        {
          title: "Static: assigned to you",
          description:
            "The same public address every day, so firewall rules, allowlists and DNS records stay correct once they are written.",
          icon: MapPin,
        },
      ],
      listCaption: "Configured in",
      list: [
        "Firewalls",
        "VPNs",
        "Servers",
        "Cloud applications",
        "Remote-access systems",
        "IP allowlists",
        "DNS",
        "Security systems",
      ],
      closing: {
        heading: "Not every business needs one",
        body: "If nothing outside your network has to reach in at a known address, a dynamic IP is perfectly adequate and there is no reason to pay for more. The uses that genuinely call for a fixed address are set out on the next page.",
      },
    },
    {
      slug: "business-uses",
      title: "Business Uses",
      eyebrow: "Business uses",
      heading: "Where a fixed address earns its keep",
      tagline: "Eight situations where a changing address breaks something.",
      intro:
        "A static IP is worth paying for when some other system has been configured to trust your address. These are the eight cases that come up most often in business networks.",
      scene: "allowlist",
      body: [
        "The pattern is the same in all of them: something outside your network — a partner, a platform, a trunk provider or your own remote staff — needs to recognise traffic as yours. Recognition requires an address that does not move.",
      ],
      points: [
        {
          title: "Remote access",
          description:
            "Reach business systems securely from approved locations.",
          icon: MonitorSmartphone,
        },
        {
          title: "VPN",
          description:
            "Configure site-to-site or remote-access VPN connections against a fixed public address.",
          icon: Lock,
        },
        {
          title: "IP allowlisting",
          description:
            "Let approved addresses reach applications, cloud platforms or partner systems, and nothing else.",
          icon: ListChecks,
        },
        {
          title: "Business applications",
          description:
            "Some hosted applications and enterprise systems require fixed IP-based access controls.",
          icon: Puzzle,
        },
        {
          title: "VoIP and SIP",
          description:
            "Support IP-based voice configurations where fixed addressing is required by the trunk.",
          icon: Phone,
        },
        {
          title: "CCTV and remote monitoring",
          description:
            "Predictable external access for appropriately secured monitoring systems.",
          icon: Eye,
        },
        {
          title: "Server hosting",
          description:
            "Businesses hosting approved services can use a fixed public IP for consistent external access.",
          icon: Server,
        },
        {
          title: "API and cloud integrations",
          description:
            "Some platforms require a fixed IP to identify and authorise incoming connections.",
          icon: Webhook,
        },
      ],
      closing: {
        heading: "An address is not a security control",
        body: "A static IP makes access rules possible; it does not make them safe on its own. Anything reachable from the internet still needs a firewall policy in front of it, which is what a managed router and firewall service is for.",
      },
    },
    {
      slug: "add-static-ip",
      title: "Add Static IP",
      eyebrow: "Add static IP",
      heading: "Need a static IP for your business?",
      tagline: "Added to an eligible service, usually without changing the line.",
      intro:
        "Static IP can be added to an eligible SipLink internet service for applications that require consistent public addressing. Tell us what needs to reach what, and we will confirm whether your service supports it.",
      scene: "provision",
      body: [
        "This is normally a configuration change rather than a new installation, so an existing connection can usually keep running while it is arranged.",
      ],
      steps: [
        {
          title: "Tell us what needs it",
          body: "The VPN, trunk, allowlist or hosted system driving the requirement. What it is for decides whether one address is enough or a routed block is the right answer.",
        },
        {
          title: "We confirm eligibility",
          body: "Whether your current service supports it, or which service would. Availability depends on the connection and the site.",
        },
        {
          title: "Assigned and documented",
          body: "The address is allocated to your service and recorded, so your administrator has it in writing rather than in an email thread.",
        },
        {
          title: "Configured and tested",
          body: "Applied to the router and tested against whatever needed it, so you find out it works from us rather than from a user.",
        },
      ],
      listCaption: "Suitable for",
      list: [
        "VPN",
        "Remote access",
        "IP allowlisting",
        "Cloud applications",
        "VoIP",
        "Servers",
        "CCTV",
        "Secure business applications",
        "API integrations",
      ],
      closing: {
        heading: "Already with another provider?",
        body: "A static IP is tied to the service it is issued on, so moving providers means a new address and a round of reconfiguration. It is worth raising early in a migration rather than discovering it on cutover day.",
      },
    },
  ],
  addOns: ["managed-router-firewall", "vpn"],
  cta: { label: "Add a static IP", href: "/contact" },
};

/* --------------------------------------------------- network services */

const managedRouterFirewall: InternetService = {
  slug: "managed-router-firewall",
  parent: "network-solutions",
  title: "Managed Router & Firewall",
  eyebrow: "Network solutions",
  tagline: "Secure and simplify your business network.",
  intro:
    "Your internet connection needs the right equipment and the right policies behind it. A circuit with no considered rules in front of it is a circuit anyone can walk into.",
  lede: [
    "SipLink can provide managed router and firewall solutions designed to help businesses control traffic, secure network access and keep connectivity reliable — without making it your team's second job.",
  ],
  icon: ShieldCheck,
  scene: "firewall",
  idealFor: [
    "SMBs without dedicated network teams",
    "Branch offices",
    "Multi-location businesses",
    "Growing companies",
    "Organisations requiring managed connectivity",
  ],
  sections: [
    {
      slug: "capabilities",
      eyebrow: "Capabilities",
      heading: "What managed covers",
      body: [
        "Scope depends on the solution selected. These are the areas a managed router and firewall service can take on.",
      ],
      list: [
        "Managed router configuration",
        "Firewall policy management",
        "NAT",
        "Access control",
        "Network segmentation",
        "VPN configuration",
        "Traffic management",
        "Application-aware policies",
        "Security policy configuration",
        "Monitoring",
        "Performance management",
        "Configuration backup",
        "Change management",
      ],
    },
    {
      slug: "why-managed",
      eyebrow: "Why managed",
      heading: "Because the person who configured it has left",
      body: [
        "Network equipment tends to be set up once, by whoever was available, and then left alone until it fails. The configuration lives in one person's memory and the firmware quietly ages.",
        "Having equipment managed as part of a broader connectivity service means policy, monitoring and change control belong to a team whose job it is — and the rules are documented rather than remembered.",
      ],
      points: [
        {
          title: "Centralised policy",
          description:
            "One set of rules applied consistently, rather than per-site configurations that drift apart over time.",
          icon: SlidersHorizontal,
        },
        {
          title: "Change management",
          description:
            "Changes are made deliberately and recorded, so a rule added on a Friday can be explained on the Monday.",
          icon: RefreshCw,
        },
        {
          title: "Configuration backup",
          description:
            "A working configuration is kept, so replacing failed hardware is a restore rather than a rebuild.",
          icon: HardDrive,
        },
        {
          title: "Monitoring included",
          description:
            "The device is watched alongside the circuit, so a fault is noticed by us rather than reported by you.",
          icon: Activity,
        },
      ],
    },
  ],
  addOns: ["vpn", "lan-switching", "business-wifi"],
  cta: { label: "Discuss a managed network", href: "/contact" },
};

const businessWifi: InternetService = {
  slug: "business-wifi",
  parent: "network-solutions",
  title: "Business Wi-Fi",
  eyebrow: "Network solutions",
  tagline: "Reliable wireless across your whole workplace.",
  intro:
    "Employees, customers, guests and business devices all depend on wireless. A single access point in a corner is not a workplace network, however fast the line behind it is.",
  lede: [
    "SipLink Business Wi-Fi can be designed around your office layout, number of users, device density and application requirements, so coverage follows the floor plan rather than the cabling.",
  ],
  icon: Signal,
  scene: "wifi",
  idealFor: [
    "Corporate offices",
    "Retail",
    "Hospitality",
    "Education",
    "Healthcare",
    "Warehouses",
    "Branch offices",
    "Customer-facing environments",
  ],
  sections: [
    {
      slug: "capabilities",
      eyebrow: "Capabilities",
      heading: "What a deployment can include",
      body: [
        "Scope depends on the deployment and the site survey that precedes it.",
      ],
      list: [
        "Professional wireless access points",
        "Multi-AP deployment",
        "Centralised Wi-Fi management",
        "Employee Wi-Fi",
        "Guest Wi-Fi",
        "Separate network access",
        "Secure authentication",
        "SSID management",
        "Coverage planning",
        "Traffic management",
        "Network monitoring",
        "Roaming support",
        "Performance optimisation",
      ],
    },
    {
      slug: "designed-around-the-floor",
      eyebrow: "Design",
      heading: "Coverage planned, not guessed",
      points: [
        {
          title: "Coverage planning",
          description:
            "Access points placed against the actual layout — walls, floors, racking and glass all change where the signal goes.",
          icon: Compass,
        },
        {
          title: "Employee and guest separation",
          description:
            "Guests get internet; they do not get your file server. Separate access is part of the design, not an afterthought.",
          icon: UserCheck,
        },
        {
          title: "Roaming support",
          description:
            "A call that starts at reception should survive the walk to the meeting room without dropping.",
          icon: Route,
        },
        {
          title: "Device density",
          description:
            "Sized for how many devices are in a room, not just how large the room is — a full training suite is the hard case.",
          icon: Users,
        },
      ],
    },
  ],
  addOns: ["lan-switching", "managed-router-firewall"],
  cta: { label: "Request a Wi-Fi assessment", href: "/contact" },
};

const lanSwitching: InternetService = {
  slug: "lan-switching",
  parent: "network-solutions",
  title: "LAN & Switching",
  eyebrow: "Network solutions",
  tagline: "A strong foundation for everything above it.",
  intro:
    "Your internet connection is only as effective as the internal network supporting it. A gigabit circuit behind an unmanaged switch and improvised cabling will disappoint everyone who uses it.",
  lede: [
    "SipLink LAN and switching solutions help businesses connect computers, IP phones, Wi-Fi access points, printers, servers, security systems and every other device that expects a port.",
  ],
  icon: Network,
  scene: "lan",
  idealFor: [
    "New office deployments",
    "Office expansions",
    "Network modernisation",
    "IP telephony deployments",
    "Wi-Fi deployments",
    "Multi-floor offices",
    "Branch offices",
    "High-device-density environments",
  ],
  sections: [
    {
      slug: "services",
      eyebrow: "Services",
      heading: "What the work covers",
      list: [
        "LAN design",
        "Network architecture",
        "Managed switches",
        "VLAN configuration",
        "IP addressing",
        "Network segmentation",
        "Switch configuration",
        "IP phone connectivity",
        "Wi-Fi integration",
        "Network troubleshooting",
        "Performance monitoring",
        "Expansion planning",
      ],
    },
    {
      slug: "why-it-matters",
      eyebrow: "Why it matters",
      heading: "The problems a designed LAN prevents",
      points: [
        {
          title: "Segmentation",
          description:
            "VLANs keep voice, data, guest and security traffic apart, so one noisy system cannot degrade the others.",
          icon: Split,
        },
        {
          title: "IP telephony ready",
          description:
            "Handsets need power, priority and a predictable address plan. Designing for them beforehand avoids re-cabling after.",
          icon: Phone,
        },
        {
          title: "Room to expand",
          description:
            "Port capacity and addressing planned for the next hire and the next floor, not exactly the current headcount.",
          icon: Expand,
        },
        {
          title: "Troubleshooting",
          description:
            "A documented network is one a fault can be traced through, instead of one that has to be guessed at.",
          icon: Radar,
        },
      ],
    },
  ],
  addOns: ["business-wifi", "managed-router-firewall"],
  cta: { label: "Plan a LAN deployment", href: "/contact" },
};

const vpn: InternetService = {
  slug: "vpn",
  parent: "network-solutions",
  title: "VPN",
  eyebrow: "Network solutions",
  tagline: "Connect locations and people securely.",
  intro:
    "SipLink VPN solutions securely connect business locations and authorised users across IP networks, using dedicated equipment and large-scale encryption to link fixed sites through secure firewall infrastructure.",
  lede: [
    "The result is one network with controlled entry points, rather than several networks and a collection of exceptions.",
  ],
  icon: Lock,
  scene: "vpn",
  idealFor: [
    "Multi-site businesses",
    "Remote and hybrid teams",
    "Branch and warehouse networks",
    "Regulated environments",
  ],
  sections: [
    {
      slug: "use-cases",
      eyebrow: "Use cases",
      heading: "Four shapes of secure connection",
      points: [
        {
          title: "Site-to-site VPN",
          description:
            "Connect offices, branches, warehouses and other business locations as one network.",
          icon: Link2,
        },
        {
          title: "Remote access VPN",
          description:
            "Let authorised employees reach business resources securely from wherever they are working.",
          icon: MonitorSmartphone,
        },
        {
          title: "Cloud connectivity",
          description:
            "Connect business networks to supported cloud environments over a controlled path.",
          icon: CloudCog,
        },
        {
          title: "Secure application access",
          description:
            "Provide controlled access to internal applications and resources, scoped per user.",
          icon: Key,
        },
      ],
    },
    {
      slug: "benefits",
      eyebrow: "Benefits",
      heading: "What it gives you",
      list: [
        "Secure connectivity",
        "Centralised access policies",
        "Multi-location connectivity",
        "Remote workforce support",
        "Encrypted communication",
        "Controlled access to business resources",
      ],
    },
  ],
  addOns: ["managed-router-firewall", "sd-wan", "multi-location-networking"],
  cta: { label: "Design a VPN", href: "/contact" },
};

const sdWan: InternetService = {
  slug: "sd-wan",
  parent: "network-solutions",
  title: "SD-WAN",
  eyebrow: "Network solutions",
  tagline: "Smarter connectivity for multi-location businesses.",
  intro:
    "As organisations expand across branches, offices, cloud environments and remote locations, managing multiple network connections one at a time becomes the bottleneck.",
  lede: [
    "SD-WAN provides a software-defined approach to managing WAN connectivity, routing and application traffic across multiple links — combining centralised management with routing, firewall, load balancing, WAN optimisation and traffic policy.",
  ],
  icon: Waypoints,
  scene: "sdwan",
  idealFor: [
    "Multi-location businesses",
    "Branch networks",
    "Retail networks",
    "Distributed enterprises",
    "Cloud-first organisations",
    "Hybrid WAN environments",
    "Businesses using multiple internet links",
  ],
  sections: [
    {
      slug: "capabilities",
      eyebrow: "Capabilities",
      heading: "What a deployment can include",
      body: [
        "Scope depends on the deployment selected and the links available at each site.",
      ],
      list: [
        "Centralised network management",
        "Application-aware routing",
        "Dynamic path selection",
        "Traffic prioritisation",
        "Link monitoring",
        "Automatic failover",
        "Load balancing",
        "Quality of Service",
        "VPN",
        "Firewall and security integration",
        "WAN optimisation",
        "Multi-site connectivity",
        "Cloud connectivity",
        "Network visibility",
      ],
    },
    {
      slug: "benefits",
      eyebrow: "Benefits",
      heading: "What changes once it is in",
      points: [
        {
          title: "Better application performance",
          description:
            "Prioritise business-critical applications, so a backup job cannot push a call off the link.",
          icon: Zap,
        },
        {
          title: "Higher resilience",
          description:
            "Use multiple connectivity paths where the design calls for redundancy, with failover handled automatically.",
          icon: GitBranch,
        },
        {
          title: "Centralised management",
          description:
            "Manage distributed sites through one architecture instead of visiting each of them.",
          icon: LayoutGrid,
        },
        {
          title: "Simplified branch deployment",
          description:
            "Standardise network policy across locations, so opening the tenth branch is the same work as the second.",
          icon: Package,
        },
        {
          title: "Scalable architecture",
          description:
            "Add locations without redesigning the entire WAN each time the business grows.",
          icon: Orbit,
        },
      ],
    },
  ],
  addOns: ["multi-location-networking", "vpn", "managed-router-firewall"],
  cta: { label: "Talk through an SD-WAN design", href: "/contact" },
};

const multiLocation: InternetService = {
  slug: "multi-location-networking",
  parent: "network-solutions",
  title: "Multi-Location Networking",
  eyebrow: "Network solutions",
  tagline: "One connected network across your whole business.",
  intro:
    "Connecting a single office is straightforward. Connecting 5, 20, 50 or 100 locations is a structural problem, and it does not get solved by ordering more of the same circuit.",
  lede: [
    "SipLink can design connectivity for organisations operating across multiple offices, branches, stores, warehouses, campuses and operational locations — as one network with one design behind it.",
  ],
  icon: MapPinned,
  scene: "multisite",
  idealFor: [
    "Retail chains",
    "Education campuses",
    "Healthcare networks",
    "Manufacturing sites",
    "Financial services branches",
    "IT and ITES organisations",
    "Contact centres",
  ],
  sections: [
    {
      slug: "architecture",
      eyebrow: "Architecture",
      heading: "Head office to branch to cloud to data centre",
      body: [
        "A multi-location network is a set of relationships, not a list of circuits: which site talks to which, how much traffic moves between them, and what happens when one path fails.",
        "We design the connectivity and the infrastructure required to connect these environments, then quote each location against what it actually needs.",
      ],
      steps: [
        {
          title: "Head office",
          body: "The centre of gravity: core applications, the largest user population and usually the heaviest link.",
        },
        {
          title: "Branches",
          body: "Sized individually. A three-person sales office and a fifty-seat operation do not get the same circuit.",
        },
        {
          title: "Cloud",
          body: "Where the applications increasingly live, reached over a controlled path rather than the open internet.",
        },
        {
          title: "Data centre",
          body: "Hosted systems, backup targets and anything that needs to be reached from every site at once.",
        },
        {
          title: "Remote users",
          body: "People working away from any of it, who still need the same access and the same controls.",
        },
      ],
    },
    {
      slug: "what-it-includes",
      eyebrow: "Components",
      heading: "What a multi-location solution can include",
      list: [
        "Dedicated internet",
        "Business broadband",
        "VPN",
        "SD-WAN",
        "Managed routers",
        "Managed firewalls",
        "LAN and switching",
        "Business Wi-Fi",
        "Static IP",
        "Internet redundancy",
        "Centralised monitoring",
        "Network management",
        "Cloud connectivity",
      ],
    },
    {
      slug: "use-cases",
      eyebrow: "Use cases",
      heading: "What it looks like by sector",
      points: [
        {
          title: "Retail",
          description:
            "Connect stores to centralised applications, payment systems and inventory.",
          icon: ShoppingCart,
        },
        {
          title: "Education",
          description:
            "Connect campuses, administrative offices, classrooms and cloud applications.",
          icon: GraduationCap,
        },
        {
          title: "Healthcare",
          description:
            "Connect clinics, hospitals, administrative locations and centralised systems.",
          icon: HeartPulse,
        },
        {
          title: "Manufacturing",
          description:
            "Connect plants, warehouses, offices and operational systems.",
          icon: Factory,
        },
        {
          title: "Financial services",
          description:
            "Connect branches and offices with secure and controlled network access.",
          icon: Landmark,
        },
        {
          title: "IT and ITES",
          description:
            "Connect offices, cloud environments, data centres and distributed teams.",
          icon: ServerCog,
        },
        {
          title: "Contact centres",
          description:
            "Support voice, CRM, cloud applications and real-time communication across locations.",
          icon: Headset,
        },
        {
          title: "Logistics",
          description:
            "Connect warehouses, depots and transport operations to central systems.",
          icon: Truck,
        },
      ],
    },
  ],
  addOns: ["sd-wan", "vpn", "dedicated-internet"],
  cta: { label: "Map your locations with us", href: "/contact" },
};

/* ---------------------------------------------------------- collections */

/** The three connectivity services that sit directly under /internet. */
export const connectivityServices: InternetService[] = [
  businessBroadband,
  dedicatedInternet,
  staticIp,
];

/** The six services under /internet/network-solutions. */
export const networkServices: InternetService[] = [
  managedRouterFirewall,
  businessWifi,
  lanSwitching,
  vpn,
  sdWan,
  multiLocation,
];

export const internetServices: InternetService[] = [
  ...connectivityServices,
  ...networkServices,
];

/**
 * The Network Solutions index page. It is not an `InternetService` because it
 * is an index of six services rather than a service in its own right.
 */
export const networkSolutionsHub = {
  slug: "network-solutions",
  eyebrow: "Network solutions",
  title: "Network Solutions",
  tagline: "More than internet connectivity.",
  intro:
    "A reliable internet connection is only one part of a modern business network. Everything between the circuit and the person using it has to be designed too.",
  lede: [
    "SipLink Network Solutions help organisations design, deploy and manage the infrastructure connecting users, devices, applications, branches and cloud services.",
  ],
  icon: Network,
  scene: "modules" as SceneKind,
  /** Two areas the brief lists that are delivered across all six services. */
  alsoIncludes: [
    {
      title: "Network monitoring",
      description:
        "Links and managed devices watched from our Global NOC in Chennai on a 24/7 basis, across every service on this page.",
      icon: Activity,
    },
    {
      title: "Connectivity management",
      description:
        "One team accountable for the circuit and the equipment on it, so a fault does not become an argument between suppliers.",
      icon: Settings2,
    },
  ] satisfies InternetPoint[],
} as const;

export function getInternetService(
  slug: string,
): InternetService | undefined {
  return internetServices.find((item) => item.slug === slug);
}

/** A section complete enough to be its own page. */
export type InternetSectionPage = InternetSection &
  Required<Pick<InternetSection, "title" | "tagline" | "intro">>;

/**
 * The sections of `service` that are routed as their own pages — empty for
 * the six network services, which render their sections inline.
 *
 * The filter is not defensive padding: it is what narrows the optional page
 * fields to required ones, so a section missing an intro cannot reach a
 * route that assumes it has one.
 */
export function getSectionPages(service: InternetService): InternetSectionPage[] {
  if (!service.sectionsAsPages) return [];

  return service.sections.filter(
    (section): section is InternetSectionPage =>
      Boolean(section.title && section.tagline && section.intro),
  );
}

/** One section page, by its service slug and its own slug. */
export function getInternetSectionPage(
  serviceSlug: string,
  sectionSlug: string,
): { service: InternetService; section: InternetSectionPage } | undefined {
  const service = getInternetService(serviceSlug);
  if (!service) return undefined;

  const section = getSectionPages(service).find(
    (item) => item.slug === sectionSlug,
  );

  return section ? { service, section } : undefined;
}

/* ------------------------------------------- business broadband plans */

/**
 * Supporting content for /internet/business-broadband/plans.
 *
 * The page's argument is that a plan is sized from the work rather than
 * picked off a tier list, which is easy to assert and hard to believe. These
 * three blocks are what make it concrete: the shapes of office we actually
 * quote for, what a working day puts on the line hour by hour, and the point
 * at which the honest answer stops being broadband.
 *
 * Deliberately free of numbers. No speed, price, contention ratio or uptime
 * figure appears here, because none is verified for broadband — see the file
 * header. Everything below is qualitative and can be said truthfully today.
 */

export const planProfiles: {
  title: string;
  people: string;
  situation: string;
  drives: string;
  usually: string[];
  icon: LucideIcon;
}[] = [
  {
    title: "The small team",
    people: "5–15 people, one office",
    situation:
      "Everything is in the cloud, nothing is hosted on site, and the connection is only noticed when a call breaks up.",
    drives:
      "How many people are actually using it at the same time, at the busiest hour — rarely the same as the headcount.",
    usually: ["Managed router", "Static IP, if there is a VPN"],
    icon: Users,
  },
  {
    title: "The growing office",
    people: "15–50 people, hiring",
    situation:
      "A plan that fitted last year is now the thing everyone complains about on Monday mornings.",
    drives:
      "Headroom and upload. Growth shows up in the outbound half of the line long before the inbound half.",
    usually: ["Managed router", "Business Wi-Fi", "LAN and switching"],
    icon: TrendingUp,
  },
  {
    title: "The branch",
    people: "A site reporting to head office",
    situation:
      "Most of what matters lives somewhere else, and the site needs a dependable path back to it rather than raw speed.",
    drives:
      "What travels between the branch and head office, and whether it needs to be private.",
    usually: ["VPN", "Static IP", "Managed router"],
    icon: Building2,
  },
  {
    title: "The customer-facing floor",
    people: "Retail, clinics, hospitality",
    situation:
      "Staff, customers, payment terminals and cameras all share one connection, and the guests are the ones on the phone about it.",
    drives:
      "Device density and separation — how many things connect, and which of them must never see each other.",
    usually: ["Business Wi-Fi with guest separation", "LAN and VLANs"],
    icon: ShoppingCart,
  },
];

/**
 * The working day, hour by hour. The point the sequence makes is that the
 * load is not steady: the hour a connection is judged on is never the hour
 * anyone tests it in.
 */
export const planDay: {
  time: string;
  label: string;
  note: string;
  live: string[];
}[] = [
  {
    time: "09:00",
    label: "Everyone arrives at once",
    note: "Mail syncs, laptops update and the CRM loads for the whole floor inside twenty minutes. It is the sharpest spike of the day and the one most plans are not sized for.",
    live: ["Email", "Microsoft 365", "CRM", "Web"],
  },
  {
    time: "11:00",
    label: "The meeting block",
    note: "Several video calls at once, each one uploading as much as it downloads, with voice traffic underneath that cannot be asked to wait its turn.",
    live: ["Video conferencing", "VoIP", "CRM", "Microsoft 365"],
  },
  {
    time: "13:00",
    label: "The lunch dip",
    note: "The quietest hour of the working day, and the one a speed test will flatter you in. Nothing you learn here tells you how the connection behaves at nine.",
    live: ["Web", "Payments"],
  },
  {
    time: "15:00",
    label: "The afternoon upload",
    note: "Files go out, the day's work syncs to the cloud and documents move to customers. All of it travels in the direction consumer connections are worst at.",
    live: ["File sharing", "Cloud backup", "CRM", "VoIP"],
  },
  {
    time: "18:30",
    label: "After the floor empties",
    note: "Backups start and the cameras keep sending. This is the window that decides whether last night's backup finished before this morning's spike began.",
    live: ["Cloud backup", "CCTV", "Remote access"],
  },
];

/**
 * When broadband is the right answer, and when it has stopped being one.
 *
 * This exists so the page can say the unprofitable thing out loud. The
 * left column keeps people on a cheaper service; the right sends them to
 * /internet/dedicated-internet.
 */
export const planStepUp = {
  stay: {
    heading: "Business broadband is the right answer when",
    points: [
      "Your applications are cloud services rather than systems you host",
      "A slow hour would be irritating rather than expensive",
      "One site, or sites that barely talk to each other",
      "Nobody outside needs to reach a server on your network",
      "You want the lowest sensible cost per location",
    ],
  },
  move: {
    heading: "It is time for dedicated internet when",
    points: [
      "An hour of degraded throughput costs you money, meetings or customers",
      "You need restoration targets and escalation in writing, not best effort",
      "The upload matters as much as the download",
      "Voice is the business — a contact centre, not a few calls a day",
      "Several sites move real traffic between each other",
      "Systems you host are reached from outside the building",
    ],
  },
} as const;

/* ----------------------------- business broadband: the features page */

/**
 * The four things that make a connection a business one, for
 * /internet/business-broadband/features.
 *
 * `diagram` selects the drawing beside each card — see FeatureShowcase. The
 * cards alternate sides, which is the pattern FeatureCards uses on the home
 * page; borrowing it keeps the site speaking one visual language rather than
 * inventing a sixth.
 */
export const broadbandFeatureCards: {
  diagram: "converge" | "priority" | "headroom" | "onehand";
  title: string;
  description: string;
  detail: string[];
}[] = [
  {
    diagram: "converge",
    title: "Everything at once, not in turn",
    description:
      "Mail, cloud applications, calls, card terminals and backups do not politely queue. A business line is judged on the hour when all of them are running together.",
    detail: [
      "Sized against the busy hour rather than the average",
      "One connection carrying every kind of business traffic",
    ],
  },
  {
    diagram: "priority",
    title: "Voice that holds its place",
    description:
      "Calls are small but unforgiving about timing. Where SipLink voice runs over the same line, it is sized and prioritised explicitly, so a backup job cannot push a conversation off it.",
    detail: [
      "Voice accounted for separately when the plan is sized",
      "The same provider for the calls and the line beneath them",
    ],
  },
  {
    diagram: "headroom",
    title: "Room to grow into",
    description:
      "A plan sized exactly to today is one you outgrow by the next quarter. We review bandwidth with you as users, applications and locations increase.",
    detail: [
      "Upgrades are a change to the service, not a renegotiation",
      "Reviewed when the business changes, not only at renewal",
    ],
  },
  {
    diagram: "onehand",
    title: "One team for the line and the kit",
    description:
      "A managed router, business Wi-Fi and the LAN behind it can be delivered and supported alongside the circuit — so a fault is diagnosed once rather than argued between suppliers.",
    detail: [
      "Router, Wi-Fi and switching supported with the connection",
      "Monitored 24/7 from our Global NOC in Chennai",
    ],
  },
];

/** What can be layered onto the line, in the order most businesses add it. */
export const broadbandAddOnSlugs = [
  "static-ip",
  "managed-router-firewall",
  "business-wifi",
  "lan-switching",
];

/* ----------------------------- business broadband: the benefits page */

/**
 * Each benefit, placed in an ordinary week, for
 * /internet/business-broadband/business-benefits.
 *
 * A benefits page is the easiest place on a site to write six lines nobody
 * believes. These give each claim a moment you can picture instead — which
 * is also what keeps them honest, since a scenario cannot hide behind an
 * adjective the way "reliable connectivity" can.
 */
export const benefitScenarios: {
  benefit: string;
  when: string;
  body: string;
}[] = [
  {
    benefit: "Reliable connectivity",
    when: "Monday, 09:05",
    body: "The whole floor arrives inside twenty minutes. Mail syncs, laptops update and the CRM loads for everyone at once. This is the sharpest demand of the week, and the one a plan sized on headcount alone tends to fail.",
  },
  {
    benefit: "Better cloud access",
    when: "Tuesday, 14:20",
    body: "Your team is in the CRM and the finance system all afternoon, and neither is on a server in the building. When the connection is sized for that, nobody mentions it — which is the entire benefit.",
  },
  {
    benefit: "Support for VoIP",
    when: "Wednesday, 11:00",
    body: "A client call runs for forty minutes while a backup is midway through uploading. Because voice was accounted for when the line was sized, the call is not the thing that suffers.",
  },
  {
    benefit: "Work from anywhere",
    when: "Thursday, 07:40",
    body: "Someone starts early from home and needs the same systems they would have at a desk. With remote access — and a static IP where the VPN requires one — that is an ordinary morning rather than a support ticket.",
  },
  {
    benefit: "Easy to scale",
    when: "Friday, four months in",
    body: "Three people started this quarter and two more start next. Rather than waiting for complaints, the plan is reviewed against the new shape of the office and changed if it needs to be.",
  },
  {
    benefit: "Business-focused support",
    when: "Saturday, 02:00",
    body: "Something fails outside working hours. The circuit is watched from our Global NOC in Chennai around the clock, so in most cases the fault is already open before anyone in your office notices it.",
  },
];

/** Who feels the difference, and what they actually notice. */
export const benefitRoles: {
  role: string;
  notices: string;
  icon: LucideIcon;
}[] = [
  {
    role: "The office manager",
    notices:
      "That the internet has stopped being a standing item. Nobody is at their desk asking whether it is slow for everyone else.",
    icon: Users,
  },
  {
    role: "The IT lead",
    notices:
      "That they are no longer the escalation path. The router, the Wi-Fi and the circuit are one supplier's problem, with a number to call.",
    icon: Settings2,
  },
  {
    role: "The finance lead",
    notices:
      "One supplier for voice and connectivity, quoted per location and billed together, instead of three invoices that never quite reconcile.",
    icon: ScrollText,
  },
  {
    role: "The person on the call",
    notices:
      "Nothing at all. No apologising for the audio, no asking anyone to repeat themselves. That is what a connection sized properly feels like.",
    icon: PhoneCall,
  },
];

/* ------------------------------------ dedicated internet: page content */

/**
 * Supporting content for the four Dedicated Internet section pages.
 *
 * The designs these pages borrow from put a rail of oversized figures under
 * the hero. That device works, so it is used — but only with figures that are
 * actually stated in a source document. No speed multiple, uptime percentage
 * or saving appears anywhere below, because none is verified. Where a
 * reference would have put a number, these put a fact.
 */

/** Sourced facts, for the figure rail. See `internetProof` for provenance. */
export const dedicatedFacts: { value: string; label: string }[] = [
  { value: "50 Mbps", label: "Smallest port we provision" },
  { value: "100 Gbps", label: "Largest port available" },
  { value: "Class A", label: "ISP licensed by the DoT" },
  { value: "24/7", label: "Watched from our Chennai NOC" },
];

/** The neighbours arriving on a contended segment, in the order they land. */
export const contentionNeighbours = [
  "The office upstairs",
  "A café on the corner",
  "Forty flats",
  "A school at 15:30",
];

/**
 * Which way each kind of business traffic actually travels. `direction` is
 * what the page is really about — the outbound column is the one consumer
 * services are worst at, and the one nobody checks.
 */
export const symmetryFlows: {
  label: string;
  direction: "up" | "down" | "both";
  note: string;
}[] = [
  {
    label: "Cloud backup",
    direction: "up",
    note: "Bounded entirely by upload. It either finishes overnight or it does not.",
  },
  {
    label: "Video calls",
    direction: "both",
    note: "Your camera sends as much as it receives. Being the only person who looks frozen is an upstream problem.",
  },
  {
    label: "File sharing",
    direction: "up",
    note: "Sending work to a client is an upload, however it is described in the app.",
  },
  {
    label: "VoIP",
    direction: "both",
    note: "Small, constant, and in both directions at once. Starved upstream shows up as choppy audio first.",
  },
  {
    label: "Remote access",
    direction: "up",
    note: "When colleagues reach systems in your office, your upload sets what they experience.",
  },
  {
    label: "Web and SaaS",
    direction: "down",
    note: "The one genuinely download-heavy thing on this list, and the only one a consumer line is built for.",
  },
];

/** What happens between a fault starting and it being closed. */
export const slaLifecycle: { title: string; body: string }[] = [
  {
    title: "Detected",
    body: "The circuit is monitored around the clock, so in most cases a fault is seen before anyone in your office picks up a phone.",
  },
  {
    title: "Raised",
    body: "A ticket is opened against your service with the agreed priority, and you have a reference rather than a conversation.",
  },
  {
    title: "Diagnosed",
    body: "SipLink equipment, the local access network and the IP network are all in scope, so the fault does not fall into a gap between suppliers.",
  },
  {
    title: "Restored",
    body: "Worked to the restoration target in your agreement, with escalation following a path that was set before anything went wrong.",
  },
  {
    title: "Reviewed",
    body: "What happened, why, and what changes — recorded against the service rather than left as an apology on a call.",
  },
];

/**
 * The questions that decide an enterprise design, grouped so the page can
 * show that bandwidth is the last of them rather than the first.
 */
export const enterpriseQuestions: {
  group: string;
  icon: LucideIcon;
  questions: string[];
}[] = [
  {
    group: "What you run",
    icon: Boxes,
    questions: [
      "Which applications, and where do they live?",
      "How much traffic never leaves the building?",
      "What cannot be allowed to stop?",
    ],
  },
  {
    group: "Where you are",
    icon: MapPinned,
    questions: [
      "How many sites, and how different are they?",
      "What moves between them?",
      "Who works away from all of them?",
    ],
  },
  {
    group: "What it must survive",
    icon: ShieldCheck,
    questions: [
      "What happens when the primary path fails?",
      "Who needs to reach you from outside?",
      "What has to be recorded or segregated?",
    ],
  },
  {
    group: "Where it is going",
    icon: TrendingUp,
    questions: [
      "What does the next year add?",
      "Which systems are moving to the cloud?",
      "What would you rather not rebuild in two years?",
    ],
  },
];

/* ------------------------------------------- static IP: page content */

/**
 * Supporting content for the three Static IP section pages.
 *
 * Addresses are the one place on these pages where concrete examples are
 * safe, because the documentation ranges exist precisely so nobody has to
 * invent one. Every address written here is from RFC 5737 (192.0.2.0/24,
 * 198.51.100.0/24, 203.0.113.0/24) or RFC 1918 private space — none of them
 * routes anywhere, so none can ever point at a real customer.
 */

/** What a public address actually is, for the explainer page. */
export const addressAnatomy: {
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Public, not the one on your laptop",
    body: "The 192.168.x.x address your laptop shows is private — it exists only inside your building. A public address is the one the rest of the internet sees, and it belongs to the connection rather than to any device on it.",
    icon: Globe,
  },
  {
    title: "One address, or a small block",
    body: "A single address covers most needs, because one public address can front several services. A routed block is for when systems genuinely need to be reachable separately — which is a design decision, not an upgrade.",
    icon: Boxes,
  },
  {
    title: "Tied to the service, not the hardware",
    body: "The address is issued against your internet service. Replacing a router keeps it; changing provider does not — which is why it is worth raising early in a migration rather than on cutover day.",
    icon: Link2,
  },
];

/**
 * How a dynamic address breaks something, as a sequence. The failure is
 * quiet, which is the entire point of telling it as a story: nothing errors,
 * nothing alerts, and the first report comes from a person.
 */
export const dynamicBreakage: {
  time: string;
  title: string;
  body: string;
  address: string;
  state: "ok" | "changed" | "denied";
}[] = [
  {
    time: "Day 1",
    title: "A rule is written",
    body: "Your administrator gives a partner platform the address your office is using today, and it is added to their allowlist. Everything works, and it is reasonable to assume it will keep working.",
    address: "198.51.100.7",
    state: "ok",
  },
  {
    time: "Day 2-40",
    title: "Nothing happens",
    body: "The integration runs every day. Nobody thinks about the address again, because there has been no reason to. This is the part that makes the next step a surprise.",
    address: "198.51.100.7",
    state: "ok",
  },
  {
    time: "Day 41",
    title: "The lease renews",
    body: "The network hands your connection a different public address. This is normal behaviour for a dynamic service, not a fault — there is no notice, no error and nothing in a log to read.",
    address: "203.0.113.88",
    state: "changed",
  },
  {
    time: "Day 41, later",
    title: "Access is refused",
    body: "The partner sees a request from an address that is not on their list and rejects it, correctly. Nothing has broken, nobody has been alerted, and the first report of it arrives from a person who could not do their job.",
    address: "203.0.113.88",
    state: "denied",
  },
];

/**
 * Situations that lead people to ask for a static IP, framed as the job
 * rather than the feature — a reader knows what they are trying to do, not
 * which addressing model it requires.
 */
export const staticIpSituations: {
  id: string;
  label: string;
  job: string;
  why: string;
  alongside: string[];
  icon: LucideIcon;
}[] = [
  {
    id: "remote",
    label: "Remote work",
    job: "Let staff reach the systems in our office from home",
    why: "A remote-access VPN is configured against the office public address. If it moves, every client configuration is pointing at the wrong place.",
    alongside: ["VPN", "Managed firewall"],
    icon: MonitorSmartphone,
  },
  {
    id: "partner",
    label: "Partner access",
    job: "Let a customer or partner system talk to ours",
    why: "Their security team will ask for the addresses to allow. A fixed one is a rule written once; a dynamic one is a rule that silently expires.",
    alongside: ["Managed firewall"],
    icon: UserCheck,
  },
  {
    id: "voice",
    label: "SIP and voice",
    job: "Run SIP trunks into our phone system",
    why: "Where a trunk authorises by IP rather than by credentials, the registration depends on the address staying put.",
    alongside: ["SIP trunking"],
    icon: Phone,
  },
  {
    id: "cctv",
    label: "Cameras and monitoring",
    job: "Check site cameras from outside the building",
    why: "Monitoring platforms and remote viewers need a consistent address to reach — and a firewall in front of it, which is not optional.",
    alongside: ["Managed firewall"],
    icon: Eye,
  },
  {
    id: "hosting",
    label: "Hosted systems",
    job: "Run a service in our building that outsiders use",
    why: "Anything reached from outside needs an address that DNS can point at and keep pointing at.",
    alongside: ["Managed firewall", "Routed block, sometimes"],
    icon: Server,
  },
  {
    id: "api",
    label: "API integrations",
    job: "Call a platform that checks who is calling",
    why: "Some APIs identify the caller by source address. Yours has to be one they recognise every time, not most of the time.",
    alongside: ["Managed firewall"],
    icon: Webhook,
  },
];

/** What a static IP is not, said plainly. */
export const staticIpLimits: {
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    title: "It is not a security control",
    body: "A fixed address makes access rules possible; it does not make them safe. Anything reachable from the internet still needs a firewall policy in front of it — the address is what the policy refers to, not the policy.",
    icon: ShieldCheck,
  },
  {
    title: "It will not make anything faster",
    body: "Addressing and bandwidth are unrelated. A static IP changes how you are found, never how much you can carry — if the connection is slow, this is not the thing that fixes it.",
    icon: Gauge,
  },
  {
    title: "It does not move with you",
    body: "The address belongs to the service it was issued on. Changing provider means a new address and a round of reconfiguration everywhere the old one was written down.",
    icon: RefreshCw,
  },
];

/** Single address or routed block — the decision, without the jargon. */
export const staticIpShapes: {
  title: string;
  summary: string;
  points: string[];
  note: string;
}[] = [
  {
    title: "A single address",
    summary: "What most businesses need, and where every conversation starts.",
    points: [
      "One public address for the whole site",
      "Several services can sit behind it on different ports",
      "Enough for VPN, SIP, allowlisting and remote access",
      "Simplest to document and to hand to a partner",
    ],
    note: "If you are not sure which you need, it is almost certainly this one.",
  },
  {
    title: "A routed block",
    summary:
      "For when systems genuinely need to be reachable in their own right.",
    points: [
      "Several public addresses routed to your connection",
      "One per service where sharing a port is not workable",
      "Useful where separate DNS records or certificates are required",
      "Assigned against a stated requirement, not by default",
    ],
    note: "Availability and size are confirmed per service before you order.",
  },
];

/** What to have ready, so the request does not bounce back and forth. */
export const staticIpReadiness: { title: string; body: string }[] = [
  {
    title: "What needs it",
    body: "The VPN, trunk, allowlist or hosted system driving the request. This decides whether one address is enough.",
  },
  {
    title: "Who configures it",
    body: "The person or supplier who manages your firewall and router, so the address reaches them rather than an inbox.",
  },
  {
    title: "The service it is for",
    body: "Which SipLink connection and which site, since eligibility depends on the service rather than the company.",
  },
  {
    title: "Anything already pointing at you",
    body: "Existing DNS records, partner allowlists or VPN clients configured against an old address, so nothing is missed on the day.",
  },
  {
    title: "When it has to work by",
    body: "Whether this is a live cutover with a deadline or a change that can be made calmly.",
  },
];

export const staticIpFaqs: { question: string; answer: string }[] = [
  {
    question: "Will adding a static IP interrupt my connection?",
    answer:
      "It is normally a configuration change rather than a new installation, so an existing service usually keeps running while it is arranged. Where a brief interruption is unavoidable, we agree the window with you beforehand.",
  },
  {
    question: "Can I keep my address if I move office?",
    answer:
      "Not usually. The address is issued against the service at a location, so a move generally means a new address — worth planning for alongside the physical move rather than after it.",
  },
  {
    question: "How many addresses should I ask for?",
    answer:
      "Start from what needs to be reachable rather than from a number. Most businesses are well served by one; a routed block is assigned against a stated requirement.",
  },
  {
    question: "Is a static IP available on every service?",
    answer:
      "It can be added to eligible SipLink internet services. Which ones qualify depends on the connection and the site, and we confirm that before you order rather than after.",
  },
  {
    question: "Does a static IP expose my network?",
    answer:
      "Not by itself — an address is only reachable on the ports a firewall permits. What matters is the policy in front of it, which is what a managed router and firewall service is for.",
  },
];

/* --------------------------------- network solutions: page content */

/**
 * Supporting content for the six Network Solutions pages.
 *
 * These six are the least documented services in the portfolio — SD-WAN,
 * Business Wi-Fi and LAN & switching are not mentioned in the older source
 * material at all, and docs/INTERNET.md introduces them with "can include"
 * and "depending on deployment" throughout. Everything below keeps that
 * hedging. Nothing here states a throughput, a coverage radius, a device
 * count or a failover time, because none of those is verified for any
 * SipLink deployment.
 */

/** Managed router & firewall: the layers a policy is actually built from. */
export const firewallLayers: {
  layer: string;
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    layer: "01",
    title: "The perimeter",
    body: "What may reach you from the internet, and on which ports. Everything else is refused by default rather than permitted by oversight.",
    icon: ShieldCheck,
  },
  {
    layer: "02",
    title: "Segmentation",
    body: "Which parts of your own network can see each other. Guests reaching a file server is rarely a decision anyone made — it is usually a decision nobody made.",
    icon: Split,
  },
  {
    layer: "03",
    title: "Remote access",
    body: "Who gets in from outside, from where, and to what. Configured against a fixed address where the design calls for one.",
    icon: Key,
  },
  {
    layer: "04",
    title: "Watched and recorded",
    body: "Monitoring, configuration backup and change control, so a rule added on a Friday can be explained on the Monday.",
    icon: Activity,
  },
];

/** Managed router & firewall: the difference it actually makes. */
export const firewallManagedVsNot: {
  unmanaged: string;
  managed: string;
}[] = [
  {
    unmanaged: "Configured once, by whoever was free",
    managed: "Designed against a stated requirement",
  },
  {
    unmanaged: "The rules live in one person's memory",
    managed: "Documented, with a configuration backup",
  },
  {
    unmanaged: "Firmware ages quietly",
    managed: "Maintained as part of the service",
  },
  {
    unmanaged: "A fault is noticed by a user",
    managed: "Watched 24/7 from our Chennai NOC",
  },
  {
    unmanaged: "Changes are remembered, not recorded",
    managed: "Change control, so Friday can be explained on Monday",
  },
];

/** Business Wi-Fi: how a deployment is actually arrived at. */
export const wifiProcess: { title: string; body: string }[] = [
  {
    title: "Walk the floor",
    body: "Coverage is decided by walls, glass, racking and floors — none of which appear on a plan drawing. A site assessment comes before any design.",
  },
  {
    title: "Count the devices",
    body: "Not the people. A training room of thirty laptops and thirty phones is a heavier load than an open floor of sixty desks.",
  },
  {
    title: "Place the access points",
    body: "Positioned for the layout rather than for the nearest cable run, with the cabling and power planned around them.",
  },
  {
    title: "Separate the networks",
    body: "Employee, guest and device traffic given their own access, so a visitor gets internet and nothing else.",
  },
  {
    title: "Tune it in use",
    body: "Channels, power and roaming adjusted once real people are on it, because a quiet office and a busy one behave differently.",
  },
];

/** Business Wi-Fi: the failures a survey is meant to prevent. */
export const wifiFailures: {
  symptom: string;
  cause: string;
  icon: LucideIcon;
}[] = [
  {
    symptom: "It drops in the far meeting room",
    cause: "Coverage planned from the cabinet outward rather than from the floor plan. One more access point usually fixes what more power cannot.",
    icon: Radar,
  },
  {
    symptom: "Fine until the room fills",
    cause: "Sized on floor area instead of device density. The room has not changed; the number of things asking to talk at once has.",
    icon: Users,
  },
  {
    symptom: "The call drops on the walk to the desk",
    cause: "No roaming design, so the device clings to the first access point instead of handing over cleanly to the next.",
    icon: Route,
  },
  {
    symptom: "Guests slow everyone down",
    cause: "One network for everybody. Separate access for guests is a design decision, not a setting to switch on afterwards.",
    icon: UserCheck,
  },
];

/** LAN & switching: what segmentation is actually for. */
export const lanSegments: {
  name: string;
  carries: string;
  why: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Voice",
    carries: "IP phones and handsets",
    why: "Given priority and its own segment, so a backup job cannot push a call off the wire.",
    icon: Phone,
  },
  {
    name: "Data",
    carries: "Desktops, laptops, printers",
    why: "The everyday network, kept apart from the things that should not see it.",
    icon: MonitorSmartphone,
  },
  {
    name: "Wi-Fi",
    carries: "Access points, employee and guest",
    why: "Guest traffic reaches the internet and nothing else, which has to be built rather than assumed.",
    icon: Signal,
  },
  {
    name: "Devices",
    carries: "Cameras, door entry, sensors",
    why: "Segregated because they are rarely patched and almost never watched.",
    icon: Eye,
  },
];

/** LAN & switching: the moments it becomes worth doing properly. */
export const lanTriggers: { title: string; body: string }[] = [
  {
    title: "A new office",
    body: "The only time the network is genuinely cheap to get right. Cabling, ports and addressing decided once, before anyone moves in.",
  },
  {
    title: "Putting in IP phones",
    body: "Handsets need power, priority and a predictable address plan. Designing for them beforehand avoids re-cabling afterwards.",
  },
  {
    title: "Rolling out Wi-Fi",
    body: "Access points are only as good as what they plug into. A wireless upgrade on an improvised LAN disappoints everyone.",
  },
  {
    title: "Running out of ports",
    body: "The moment unmanaged switches start appearing under desks is the moment the network stopped being designed.",
  },
];

/** VPN: the two shapes, and which problem each one solves. */
export const vpnShapes: {
  title: string;
  solves: string;
  points: string[];
  icon: LucideIcon;
}[] = [
  {
    title: "Site to site",
    solves: "Two or more offices that should behave as one network",
    points: [
      "Always on, between fixed locations",
      "Configured once, on equipment at each end",
      "Staff notice nothing — the other office is simply reachable",
      "Usually configured against a fixed public address",
    ],
    icon: Link2,
  },
  {
    title: "Remote access",
    solves: "People who need the office network from somewhere else",
    points: [
      "Per user, connected on demand",
      "Access scoped to what that person needs",
      "Removed when someone leaves, centrally",
      "Depends on the office address staying put",
    ],
    icon: MonitorSmartphone,
  },
];

/** VPN: the honest limits. */
export const vpnLimits: { title: string; body: string }[] = [
  {
    title: "It is not a firewall",
    body: "A VPN decides who gets in. What they can reach once inside is a firewall and segmentation question, and it is the one more often left unanswered.",
  },
  {
    title: "It does not create bandwidth",
    body: "Traffic between sites still crosses the connections you have. If the link is the constraint, the tunnel over it will be too.",
  },
  {
    title: "It is only as current as its access list",
    body: "The value is in revoking access as reliably as granting it. That is a process, not a product — which is why it is worth managing rather than owning.",
  },
];

/** SD-WAN: how a path is chosen, moment to moment. */
export const sdwanDecisions: {
  condition: string;
  action: string;
  icon: LucideIcon;
}[] = [
  {
    condition: "A voice call starts",
    action: "Placed on the most stable path and prioritised, because latency matters more to it than capacity.",
    icon: PhoneCall,
  },
  {
    condition: "A large backup begins",
    action: "Moved to the link with room for it, so it fills what is spare rather than what is needed.",
    icon: CloudCog,
  },
  {
    condition: "A link degrades",
    action: "Traffic shifts to an alternative path where the design provides one, without waiting for anyone to notice.",
    icon: GitBranch,
  },
  {
    condition: "A new branch opens",
    action: "The same policy is applied centrally rather than configured again on site.",
    icon: Package,
  },
];

/** SD-WAN: what changes for a branch rollout. */
export const sdwanBeforeAfter: { before: string; after: string }[] = [
  {
    before: "Each site configured by hand, on site",
    after: "Policy defined once and applied centrally",
  },
  {
    before: "Configurations drift apart over years",
    after: "Sites stay standardised as they are added",
  },
  {
    before: "Failover means someone noticing first",
    after: "Path changes happen without an intervention",
  },
  {
    before: "Adding the tenth site is harder than the second",
    after: "The tenth site is the same work as the second",
  },
  {
    before: "Visibility means asking each location",
    after: "The whole WAN seen from one place",
  },
];

/** Multi-location: sites are not interchangeable, so they are not sized alike. */
export const siteTiers: {
  tier: string;
  profile: string;
  typical: string;
  icon: LucideIcon;
}[] = [
  {
    tier: "Head office",
    profile: "The centre of gravity",
    typical:
      "The largest user population, the core systems and usually the heaviest link — plus whatever every other site needs to reach.",
    icon: Building2,
  },
  {
    tier: "Major site",
    profile: "An operation in its own right",
    typical:
      "Enough people and systems to justify its own resilience, and often its own voice and Wi-Fi design.",
    icon: Boxes,
  },
  {
    tier: "Branch",
    profile: "A handful of people, one job",
    typical:
      "Sized for what it actually does rather than given a smaller copy of head office. Most multi-site estates are mostly this.",
    icon: Store,
  },
  {
    tier: "Remote and mobile",
    profile: "No site at all",
    typical:
      "People who need the same access and the same controls without a building to put equipment in.",
    icon: MonitorSmartphone,
  },
];

/** Multi-location: what actually changes as an estate grows. */
export const scaleThresholds: {
  scale: string;
  changes: string;
}[] = [
  {
    scale: "Up to 5 sites",
    changes:
      "Site-to-site VPN over business connections is usually enough. Each site can still be reasoned about individually.",
  },
  {
    scale: "5 to 20 sites",
    changes:
      "Consistency starts to matter more than any single site. Standard builds, central monitoring and one escalation path stop being optional.",
  },
  {
    scale: "20 to 50 sites",
    changes:
      "Configuring sites by hand stops scaling. Central policy, application-aware routing and automatic failover earn their place.",
  },
  {
    scale: "50 and beyond",
    changes:
      "The network is a programme rather than a project. Opening a site becomes a repeatable process with a known cost and a known lead time.",
  },
];
