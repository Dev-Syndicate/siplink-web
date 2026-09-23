import {
  Activity,
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
  Split,
  TrendingUp,
  Truck,
  UserCheck,
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
 * One section of a service page. A section renders whichever of the optional
 * fields it sets, in a fixed order: body, then points, then list, then steps.
 */
export type InternetSection = {
  /** Anchor id, unique within its page. */
  slug: string;
  eyebrow?: string;
  heading: string;
  /** Lead paragraph(s) for the section. */
  body?: string[];
  /** Explained capabilities, rendered as an icon grid. */
  points?: InternetPoint[];
  /** Bare items — application lists, "ideal for" lists, capability lists. */
  list?: string[];
  /** Caption above `list`, since a bare grid of nouns needs framing. */
  listCaption?: string;
  /** An ordered process. Only used where order genuinely carries meaning. */
  steps?: { title: string; body: string }[];
};

/** Which schematic the page hero draws. See ConnectivityScene. */
export type SceneKind =
  | "broadband"
  | "dedicated"
  | "static-ip"
  | "network"
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
      eyebrow: "Plans",
      heading: "Sized against how you actually work",
      body: [
        "There is no single right plan, because there is no single kind of office. Rather than publishing a speed tier and hoping it fits, we size the connection against what runs on it.",
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
    },
    {
      slug: "features",
      eyebrow: "Features",
      heading: "Business-ready connectivity",
      body: [
        "A business connection is judged by what keeps working on it at eleven o'clock on a Monday. These are the applications broadband is expected to carry.",
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
      eyebrow: "Benefits",
      heading: "Built for everyday business",
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
      eyebrow: "Dedicated bandwidth",
      heading: "Bandwidth provisioned for you, not shared with the street",
      body: [
        "With dedicated internet, bandwidth is provisioned specifically for your business requirement rather than drawn from a shared pool. What you buy is what is there at five in the evening as well as five in the morning.",
        "That makes it suitable for anything where unpredictable throughput turns into an operational problem rather than an inconvenience.",
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
    },
    {
      slug: "symmetrical-speeds",
      eyebrow: "Symmetrical speeds",
      heading: "Equal upload and download performance",
      body: [
        "Businesses do not only download. Modern organisations push data outward all day, and a connection tuned for consumption starves exactly the traffic a business depends on.",
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
    },
    {
      slug: "sla",
      eyebrow: "SLA",
      heading: "Service commitments, in writing",
      body: [
        "Business connectivity needs more than bandwidth. It needs defined commitments about what happens when something breaks, and who is accountable for fixing it.",
        "SipLink can provide SLA-backed connectivity options based on the service and commercial agreement selected. Our internet services include SLA arrangements covering SipLink equipment, the local access network and the IP network.",
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
    },
    {
      slug: "enterprise-connectivity",
      eyebrow: "Enterprise connectivity",
      heading: "Internet designed around your business",
      body: [
        "Enterprise connectivity is not simply a higher bandwidth plan. It is a design question, and the answer changes with every one of these inputs.",
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
      eyebrow: "What it is",
      heading: "A public address that stays put",
      body: [
        "A static IP is a public IP address assigned to your business connection that remains fixed. Unlike a dynamic address, which may change, it gives you one consistent value that other systems can be configured to trust.",
        "In practice that means one number you can write into a rule once, rather than a moving target that breaks access the day it changes.",
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
    },
    {
      slug: "business-uses",
      eyebrow: "Business uses",
      heading: "Where a fixed address earns its keep",
      body: [
        "Your office may need to let employees or authorised systems connect from outside. With a fixed public address, an administrator configures the access rule around a known value and it keeps working.",
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
    },
    {
      slug: "add-static-ip",
      eyebrow: "Add static IP",
      heading: "Need a static IP for your business?",
      body: [
        "Static IP can be added to an eligible SipLink internet service for applications that require consistent public addressing. Tell us what needs to reach what, and we will confirm whether your service supports it.",
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
  scene: "network" as SceneKind,
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
