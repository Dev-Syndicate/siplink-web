import {
  Activity,
  ArrowLeftRight,
  Building2,
  Cable,
  Clock,
  Cloud,
  Gauge,
  Globe,
  KeyRound,
  Layers,
  Lock,
  MapPin,
  Network,
  Router,
  ScrollText,
  Server,
  Share2,
  ShieldCheck,
  Split,
  TrendingUp,
  Waypoints,
  Wifi,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------
 * Internet & connectivity content model
 *
 * Page shape is fixed by `internet.md`: four pillars, each with the exact
 * subsections named there. Copy is drawn from the ISP material in
 * details-content.md §9 (the live leased-line page) and §19 (the Internet
 * sales brochure), plus docs/siplink-documentation.md §8.
 *
 * WHAT IS SOURCED — safe to keep:
 *   Class A ISP licensed by the DoT; carrier-neutral POPs in Bangalore and
 *   Chennai; Tier-1 peering; 50 Mbps–100 Gbps port range; uncontended and
 *   symmetrical delivery; committed information rate (CIR); encrypted VPN
 *   with firewall across fixed sites; Global NOC in Chennai on 24/7; NNI
 *   arrangements with last-mile telcos; the parent company's fibre network.
 *
 * WHAT IS NOT — marked [TO CONFIRM] at each site below, do not harden into
 * a claim without written evidence:
 *   broadband speeds and prices, any SLA percentage, static IP pricing,
 *   and SD-WAN / Business Wi-Fi / LAN & switching, which no source document
 *   mentions at all.
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
 * ---------------------------------------------------------------------- */

/** A named capability inside a pillar subsection. */
export type InternetPoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** One subsection of a pillar — the bullets under each heading in internet.md. */
export type InternetSection = {
  /** Anchor id, unique across the page — the mega menu deep-links to these. */
  slug: string;
  heading: string;
  body: string;
  points?: InternetPoint[];
};

export type InternetPillar = {
  /** Anchor id — the in-page nav and the mega menu both link to it. */
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  icon: LucideIcon;
  sections: InternetSection[];
};

export const internetHero = {
  eyebrow: "Internet / Class A ISP",
  title: "Bandwidth your business can build on.",
  description:
    "Dedicated internet bandwidth for enterprises, SMBs, BPOs and educational institutions — delivered over fibre, monitored around the clock, and backed by the same network that carries your voice traffic.",
} as const;

/**
 * Hero proof. Every figure is stated in a source document:
 * the port range and fibre network come from the Internet sales brochure,
 * the Class A ISP licence and the POP locations from the live ISP page.
 * No uptime percentage — see the file header.
 */
export const internetProof: { value: string; label: string }[] = [
  { value: "50 Mbps–100 Gbps", label: "Port sizes available" },
  { value: "Class A", label: "ISP licensed by the DoT" },
  { value: "Bangalore & Chennai", label: "Carrier-neutral POPs" },
  { value: "24/7", label: "Global NOC monitoring" },
];

export const internetPillars: InternetPillar[] = [
  /* ------------------------------------------------------ business broadband */
  {
    slug: "business-broadband",
    title: "Business Broadband",
    tagline: "Shared-port connectivity, sized for the office that uses it.",
    icon: Wifi,
    intro:
      "A shared port gives you a committed bandwidth floor with the freedom to pull extra capacity when an application needs it. It is the practical choice for offices that want business-grade support and a fibre last mile without paying for a fully uncontended circuit.",
    sections: [
      {
        slug: "broadband-plans",
        heading: "Plans",
        // [TO CONFIRM] No source document publishes broadband speeds, tiers or
        // prices. Plans are described by shape only and routed to a quote.
        // Do not add a speed tier or a price here until SipLink supplies one.
        body: "Plans are built around a committed rate with burst headroom above it, then sized per site against how many people work there and what they run. We quote against your location because the last mile decides what is deliverable — there is no standard price list to work from.",
        points: [
          {
            title: "Committed rate with burst",
            description:
              "A guaranteed floor you can plan around, plus the option to pull extra bandwidth when an application demands it.",
            icon: TrendingUp,
          },
          {
            title: "Sized per site",
            description:
              "Head office, branch and back office rarely need the same circuit. Each location is quoted on its own profile.",
            icon: Building2,
          },
          {
            title: "Fibre last mile",
            description:
              "Delivered on fibre where it reaches your premises, through our NNI arrangements with last-mile carriers.",
            icon: Cable,
          },
          {
            title: "Reviewed as you grow",
            description:
              "Outgrow the port and it steps up — or moves onto a dedicated leased line without changing provider.",
            icon: ArrowLeftRight,
          },
        ],
      },
      {
        slug: "broadband-features",
        heading: "Features",
        body: "Every business connection ships with the pieces an office actually needs to run on it, rather than a consumer line with a business label attached.",
        points: [
          {
            title: "Committed information rate",
            description:
              "Your contracted CIR is the bandwidth we hold for you, not a best-effort maximum quoted in an advert.",
            icon: Gauge,
          },
          {
            title: "Static IP on request",
            description:
              "A fixed public address for VPN endpoints, mail or anything a partner needs to allow-list.",
            icon: MapPin,
          },
          {
            title: "Managed router option",
            description:
              "We can supply, configure and manage the router and firewall at your edge, or hand off to equipment you already own.",
            icon: Router,
          },
          {
            title: "24/7 monitoring",
            description:
              "The link is watched from our Global NOC in Chennai, so a fault is usually raised before it reaches your helpdesk.",
            icon: Clock,
          },
        ],
      },
      {
        slug: "broadband-business-benefits",
        heading: "Business Benefits",
        body: "What changes for the business once the connection stops being something people complain about.",
        points: [
          {
            title: "Performance you can plan around",
            description:
              "A committed floor means the working day does not slow down because the neighbourhood came online at the same time.",
            icon: Gauge,
          },
          {
            title: "Voice and internet from one provider",
            description:
              "SipLink is both your ISP and your cloud voice platform, so call quality and connectivity are never two vendors pointing at each other.",
            icon: Waypoints,
          },
          {
            title: "Cost-effective entry point",
            description:
              "Business-grade support and a fibre last mile without the cost of a fully uncontended circuit.",
            icon: TrendingUp,
          },
          {
            title: "A path to dedicated",
            description:
              "When the shared port stops being enough, the same team moves you to a leased line on the same network.",
            icon: ArrowLeftRight,
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------ dedicated internet */
  {
    slug: "dedicated-internet",
    title: "Dedicated Internet",
    tagline: "Uncontended leased lines with guaranteed speed, end to end.",
    icon: Gauge,
    intro:
      "An Internet Leased Line connects you to a dedicated internet port at a speed nobody else draws from. It is the connection for organisations that cannot absorb a slow afternoon — where cloud platforms, ERP, voice and video all depend on the circuit holding its contracted rate.",
    sections: [
      {
        slug: "dedicated-dedicated-bandwidth",
        heading: "Dedicated Bandwidth",
        body: "One hundred per cent dedicated bandwidth, uncontended from your premises to our teleport. No sharing and no slowdowns at peak hours, because the capacity you contracted is not resold to anyone else. Ports run from 50 Mbps to 100 Gbps, so the same product covers a single office and a data-centre uplink.",
        points: [
          {
            title: "Uncontended port",
            description:
              "The full contracted rate is reserved for you, at nine in the morning and at four in the afternoon alike.",
            icon: Lock,
          },
          {
            title: "50 Mbps to 100 Gbps",
            description:
              "Flexible port sizes across the range, so capacity follows the business rather than forcing a migration.",
            icon: Layers,
          },
          {
            title: "End-to-end fibre",
            description:
              "Delivered on fibre from your premises through to the backbone, over the group's own long-haul network where it runs.",
            icon: Cable,
          },
        ],
      },
      {
        slug: "dedicated-symmetrical-speeds",
        heading: "Symmetrical Speeds",
        body: "Equal upload and download. Business traffic is not a download — it is a video call you are transmitting into, a backup being pushed to a data centre, an ERP session, a hosted application answering from your own server. Asymmetric lines fail exactly where cloud and voice workloads live, which is on the upstream.",
        points: [
          {
            title: "Cloud and SaaS",
            description:
              "Uploading to cloud platforms runs at the same rate as pulling from them, so sync and backup windows stay predictable.",
            icon: Cloud,
          },
          {
            title: "Voice and video",
            description:
              "Conferencing and SIP trunking carry as much upstream as down; symmetry is what keeps both directions clean.",
            icon: Share2,
          },
          {
            title: "Hosted applications",
            description:
              "If people outside your office reach a server inside it, every one of those responses leaves on the upstream.",
            icon: Server,
          },
        ],
      },
      {
        slug: "dedicated-sla",
        heading: "SLA",
        // [TO CONFIRM] Deliberately no percentage — see the file header.
        // The live site states 99.5% port availability; the two brochures say
        // 99.9% and 99.99%. Until one figure is confirmed in writing, this
        // section describes what the SLA measures and nothing more.
        body: "Leased lines are sold against a written service level agreement. It sets out what is measured, how it is measured and what counts as an outage — availability of the link between the internet port at our operating centre and the backbone, measured on an annual average, alongside a throughput guarantee against your contracted CIR.",
        points: [
          {
            title: "Port availability",
            description:
              "Availability of the link between the internet port at our operating centre and the internet backbone, measured as an annual average.",
            icon: Activity,
          },
          {
            title: "Defined service outage",
            description:
              "An interruption of at least fifteen continuous minutes, in the link beyond the local loop to your premises.",
            icon: Clock,
          },
          {
            title: "Throughput guarantee",
            description:
              "Committed throughput equivalent to the contracted port, delivered on a continuous CIR basis to the Tier-1 backbone.",
            icon: Gauge,
          },
          {
            title: "Terms in writing",
            description:
              "Availability figures, credits and escalation are confirmed in your agreement before the circuit is commissioned.",
            icon: ScrollText,
          },
        ],
      },
      {
        slug: "dedicated-enterprise-connectivity",
        heading: "Enterprise Connectivity",
        body: "Beyond a single internet port, the same network carries point-to-point circuits between your own locations and into the data centres you depend on — a private path with no public internet in the middle.",
        points: [
          {
            title: "Point-to-point circuits",
            description:
              "A dedicated link between two sites, private by construction, with low latency and no shared transit.",
            icon: ArrowLeftRight,
          },
          {
            title: "Tier-1 peering",
            description:
              "Peered with Tier-1 providers for redundancy, best-path routing and minimal latency to destinations worldwide.",
            icon: Globe,
          },
          {
            title: "Carrier-neutral POPs",
            description:
              "POPs in Bangalore and Chennai give geographic spread and a choice of carriers for connecting your location.",
            icon: Building2,
          },
          {
            title: "Data-centre connectivity",
            description:
              "High-speed links into hosting and colocation environments for ERP, CRM and business-critical applications.",
            icon: Server,
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- static ip */
  {
    slug: "static-ip",
    title: "Static IP",
    tagline: "A fixed public address, so other systems can find yours.",
    icon: MapPin,
    intro:
      "Most connections hand out an address that changes whenever the line reconnects. That is fine for browsing and useless for anything that has to be reached from outside. A static IP is a public address that stays yours for the life of the service.",
    sections: [
      {
        slug: "static-ip-what-is-static-ip",
        heading: "What is Static IP?",
        body: "A static IP address is a fixed public address assigned to your connection and held permanently, rather than drawn from a pool each time the link comes up. Because it does not change, other systems can point at it with confidence — DNS records keep resolving, firewall rules keep matching, and a partner's allow-list keeps working after a power cut. Static addressing is available on both business broadband and dedicated leased lines, as a single address or a routed block.",
        points: [
          {
            title: "Permanent assignment",
            description:
              "The address is held for the life of the service and survives reboots, reconnections and last-mile faults.",
            icon: Lock,
          },
          {
            title: "Single address or block",
            description:
              "Take one address for a VPN endpoint, or a routed block when several services each need their own.",
            icon: Layers,
          },
          {
            title: "Reverse DNS on request",
            description:
              "Reverse records can be set where the service requires them — a common prerequisite for mail delivery.",
            icon: ScrollText,
          },
        ],
      },
      {
        slug: "static-ip-business-uses",
        heading: "Business Uses",
        body: "Almost everything a business hosts, secures or connects to a third party assumes an address that does not move.",
        points: [
          {
            title: "Site-to-site VPN",
            description:
              "Both ends of an IPsec tunnel need a fixed peer address. A dynamic address breaks the tunnel every time it changes.",
            icon: KeyRound,
          },
          {
            title: "SIP trunk registration",
            description:
              "Voice platforms authenticate trunks by IP. A static address lets your PBX be allow-listed rather than re-registered.",
            icon: Waypoints,
          },
          {
            title: "Hosted mail and servers",
            description:
              "Mail, web and application servers need a stable address for DNS and for the reputation checks receivers run.",
            icon: Server,
          },
          {
            title: "Partner allow-listing",
            description:
              "Banks, insurers and customer portals commonly restrict access to named source addresses before they grant it.",
            icon: ShieldCheck,
          },
          {
            title: "Remote access and CCTV",
            description:
              "Remote desktop, NVR systems and building controls all need to be reachable at a known address.",
            icon: Network,
          },
        ],
      },
      {
        slug: "static-ip-add-static-ip",
        heading: "Add Static IP",
        // [TO CONFIRM] No source document publishes static IP pricing or the
        // size of blocks available. Routed to a quote instead of guessing.
        // The acceptable-use line reflects a real contractual term (§19).
        body: "Static addressing can be included when you order a connection or added to a service already running. Tell us how many addresses you need and what they are for — justification is part of the allocation process — and we will confirm what is available on your circuit along with the cost. Addresses are issued subject to acceptable use, in line with ISP guidelines.",
        points: [
          {
            title: "Order with your connection",
            description:
              "Requested up front, the address is configured before handover and works from the day the link is commissioned.",
            icon: Workflow,
          },
          {
            title: "Add to an existing service",
            description:
              "Already connected? An address can be allocated against a live circuit without re-provisioning the line.",
            icon: ArrowLeftRight,
          },
          {
            title: "Acceptable use applies",
            description:
              "Allocations are reviewed against ISP guidelines, and addresses must be used for the purpose they were issued for.",
            icon: ScrollText,
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------- network solutions */
  {
    slug: "network-solutions",
    title: "Network Solutions",
    tagline: "The network behind the connection — built, secured and managed.",
    icon: Network,
    intro:
      "A circuit terminates on a router, and everything past that router is the network your staff actually use. We design, install and manage that layer too, so one team is accountable from the last mile through to the switch port on the desk.",
    sections: [
      {
        slug: "network-managed-router-firewall",
        heading: "Managed Router & Firewall",
        body: "We supply, configure and manage the equipment at your edge — routing, NAT, firewall policy, and remote monitoring from our NOC. Dedicated equipment and large-scale encryption keep fixed sites connected behind a secure firewall, and changes are made by the same team that watches the link.",
        points: [
          {
            title: "Configured and installed",
            description:
              "Edge equipment is built to your addressing and policy, then commissioned as part of the link handover.",
            icon: Router,
          },
          {
            title: "Firewall policy managed",
            description:
              "Rules, NAT and access control maintained for you, with changes handled through the same support channel.",
            icon: ShieldCheck,
          },
          {
            title: "Monitored from the NOC",
            description:
              "The router is watched alongside the circuit, so a device fault and a line fault are not two separate calls.",
            icon: Clock,
          },
        ],
      },
      {
        slug: "network-business-wi-fi",
        heading: "Business Wi-Fi",
        // [TO CONFIRM] No source document describes a Wi-Fi product. Written
        // at capability level only — no coverage, throughput, vendor or
        // controller claims until SipLink confirms what is actually offered.
        body: "Wireless coverage designed around the floor plan rather than the nearest power socket — access points placed for the space, segmented networks that keep guests off the corporate LAN, and central management so a change is made once rather than device by device.",
        points: [
          {
            title: "Designed for the space",
            description:
              "Access points placed against the building and the density of people actually using it.",
            icon: Wifi,
          },
          {
            title: "Separate guest access",
            description:
              "Visitor traffic segmented away from corporate systems, with its own policy and its own limits.",
            icon: Split,
          },
          {
            title: "Centrally managed",
            description:
              "One place to change a policy, add a network or check what is connected across every access point.",
            icon: Layers,
          },
        ],
      },
      {
        slug: "network-lan-switching",
        heading: "LAN & Switching",
        // [TO CONFIRM] Structured cabling and layer-3 switching are described
        // for SipLink's own data centre, not as a customer-facing product.
        // Kept at capability level for the same reason as Business Wi-Fi.
        body: "The wired network underneath it all — structured cabling, access and distribution switching, VLAN segmentation, and quality-of-service marking so voice traffic is prioritised on the same copper that carries everything else.",
        points: [
          {
            title: "Structured cabling",
            description:
              "Cabling, patching and labelling done properly, so the next change is an hour's work rather than a day's.",
            icon: Cable,
          },
          {
            title: "VLAN segmentation",
            description:
              "Voice, data, guest and management separated at the switch, which keeps a problem in one from becoming a problem in all.",
            icon: Split,
          },
          {
            title: "QoS for voice",
            description:
              "Call traffic marked and prioritised end to end, so a large file transfer never lands in the middle of a call.",
            icon: Gauge,
          },
        ],
      },
      {
        slug: "network-vpn",
        heading: "VPN",
        body: "SipLink is one of the few providers in the country offering internet VPN built on dedicated equipment and large-scale encryption, keeping a company constantly connected across multiple fixed sites behind a very secure firewall. Remote and branch users reach internal systems over the same protected path.",
        points: [
          {
            title: "Site-to-site tunnels",
            description:
              "Fixed offices joined over encrypted tunnels, so internal systems are reachable between sites without exposing them publicly.",
            icon: ArrowLeftRight,
          },
          {
            title: "Remote access",
            description:
              "Staff working from home or on the road reach the same internal resources over an authenticated, encrypted path.",
            icon: KeyRound,
          },
          {
            title: "Dedicated equipment",
            description:
              "Encryption terminated on dedicated hardware rather than shared infrastructure, behind a managed firewall.",
            icon: Lock,
          },
        ],
      },
      {
        slug: "network-sd-wan",
        heading: "SD-WAN",
        // [TO CONFIRM] SD-WAN appears in no source document — not on the live
        // site, not in either brochure, not in the documentation. This copy
        // describes the category only. Confirm whether SipLink delivers it,
        // and on whose platform, before this ships or before any vendor,
        // feature or performance claim is added.
        body: "Where a site has more than one path to the internet, software-defined WAN decides which one each application takes, and moves traffic when a path degrades rather than when it fails outright. Availability of SD-WAN is confirmed per deployment.",
        points: [
          {
            title: "Application-aware routing",
            description:
              "Voice and business-critical traffic take the best available path; bulk transfers take what is left.",
            icon: Workflow,
          },
          {
            title: "Link failover",
            description:
              "A degrading circuit is worked around before it drops, so sessions survive the change of path.",
            icon: Share2,
          },
          {
            title: "Central policy",
            description:
              "Routing rules defined once and applied across sites, instead of maintained box by box.",
            icon: Layers,
          },
        ],
      },
      {
        slug: "network-multi-location-networking",
        heading: "Multi-Location Networking",
        body: "Connecting offices, back offices and data centres into one network is the problem the group is built for. The parent company has more than three decades of telecom turnkey project experience and 20,000+ km of its own underground fibre across Indian states, and we hold network-to-network integration arrangements with last-mile carriers for the places it does not reach.",
        points: [
          {
            title: "Point-to-point between sites",
            description:
              "Private circuits joining locations directly, with the security and latency of a link nobody else shares.",
            icon: ArrowLeftRight,
          },
          {
            title: "Pan-India reach",
            description:
              "The group's own long-haul fibre across Indian states, extended by NNI arrangements with local carriers.",
            icon: Globe,
          },
          {
            title: "One design across sites",
            description:
              "Consistent addressing, policy and equipment, so a branch behaves like the head office rather than an exception.",
            icon: Building2,
          },
          {
            title: "Single point of contact",
            description:
              "One provider, one project team and one support number for every site on the network.",
            icon: Waypoints,
          },
        ],
      },
    ],
  },
];

/**
 * The five assurance badges from the Internet sales brochure, kept close to
 * their published wording. Each restates something already true of the
 * service rather than introducing a new claim — note that "SLA assured"
 * deliberately carries no percentage. See the file header.
 */
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
