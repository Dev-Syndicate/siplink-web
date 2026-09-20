import {
  Activity,
  ArrowLeftRight,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  Clock,
  Cloud,
  CloudCog,
  Code2,
  Cpu,
  FileAudio,
  Gauge,
  GitBranch,
  Globe,
  Headset,
  Layers,
  ListOrdered,
  Lock,
  MessageCircle,
  MessagesSquare,
  Mic,
  MonitorSmartphone,
  Network,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  Radio,
  Repeat,
  Router,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Timer,
  Users,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Detail content for the individual product pages under /products/[slug].
 *
 * Copy is drawn from docs/website-contents.md and
 * docs/siplink-documentation.md. Products the source documents do not
 * describe in detail are marked with `sparseSource` so the thin ones are
 * easy to find and rewrite once SipLink supplies the material.
 */
export type ProductDetail = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  /** Short line under the page title. */
  tagline: string;
  /** Opening paragraph. */
  intro: string;
  icon: LucideIcon;
  /** The problem this product addresses. */
  problem?: { heading: string; body: string };
  /** How SipLink approaches it. */
  approach?: { heading: string; body: string[] };
  features: { title: string; description: string; icon: LucideIcon }[];
  /** Short audience labels. Kept for products not yet given `audiences`. */
  idealFor: string[];
  /**
   * Who this is for, framed as the situation a reader recognises themselves
   * in rather than a bare noun phrase — `situation` is what they have today,
   * `fit` is what this product does about it.
   */
  audiences?: { situation: string; fit: string }[];
  /**
   * Technical summary, drawn from the capability lists in
   * docs/siplink-documentation.md. Only state what those documents state —
   * capacities, codec lists, coverage and commercial terms are flagged there
   * as unverified and must come from SipLink before they appear here.
   */
  specs?: { label: string; value: string }[];
  /**
   * Plain-language explainer for readers who do not know the term yet, plus
   * the steps involved. Definitions come from the product table in
   * docs/siplink-documentation.md §2 and the product section itself.
   */
  explainer?: {
    question: string;
    definition: string;
    steps: { title: string; body: string }[];
  };
  outcome?: { heading: string; body: string };
  /**
   * How a customer gets from what they run today to this product. Drawn from
   * the migration section of docs/website-contents.md.
   */
  migration?: {
    heading: string;
    intro: string;
    steps: { title: string; body: string }[];
  };
  /**
   * Buyer questions answered from the source documents. Anything the
   * documents flag as unverified — capacity, codecs, coverage, pricing,
   * timelines — is answered by pointing at a conversation, not a number.
   */
  faqs?: { question: string; answer: string }[];
  /** True when the source documents give little or no detail. */
  sparseSource?: boolean;
};

export const productDetails: ProductDetail[] = [
  // ---------------------------------------------------------------- voice
  {
    slug: "sip-trunking",
    title: "SIP Trunking",
    category: "Business Voice",
    categorySlug: "business-voice",
    tagline: "Connect your PBX to our IP network.",
    intro:
      "SipLink SIP Trunking provides SIP-enabled connectivity for IP-PBX environments, allowing businesses to connect existing telephony systems to external voice networks using SIP and VoIP — for immediate savings and guaranteed quality of service.",
    icon: Router,
    problem: {
      heading: "Legacy trunks are expensive and inflexible",
      body: "Traditional PRI and analogue lines are billed by the channel and take weeks to provision. Adding capacity for a busy season means paying for it all year, and every new site means another physical circuit. PRI-based systems get progressively harder to scale as you grow.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "We connect your existing IP-PBX to our voice network over SIP, so your current equipment keeps working while the connectivity underneath it changes. Extensions, call flows and internal dialling carry on as they do today. Trunks are designed around your call volumes and number ranges, with carrier failover where the deployment supports it.",
      ],
    },
    features: [
      {
        title: "SIP connectivity for IP-PBX",
        description:
          "Connect existing PBX infrastructure to external voice networks without replacing hardware.",
        icon: Network,
      },
      {
        title: "Carrier failover",
        description:
          "Route calls via alternate carriers when a path degrades, keeping voice available.",
        icon: Repeat,
      },
      {
        title: "Least-cost routing",
        description:
          "Prefix and destination-based routing so calls take the most economical viable path.",
        icon: GitBranch,
      },
      {
        title: "Codec management",
        description:
          "Negotiate codecs to balance call quality against available bandwidth.",
        icon: Cpu,
      },
      {
        title: "Trunk and route failover",
        description:
          "SIP trunk failover, route failover and load distribution keep calls moving when a path or provider degrades.",
        icon: Repeat,
      },
      {
        title: "Number portability",
        description:
          "Bring the business numbers your customers already dial, rather than changing them to move network.",
        icon: Phone,
      },
      {
        title: "Endpoint compatibility",
        description:
          "SIP registration and endpoint support for IP phones and softphones, with gateway connectivity for appropriate legacy environments.",
        icon: Network,
      },
      {
        title: "DID management",
        description:
          "Provision, assign and route direct inward dialing numbers across your estate.",
        icon: Phone,
      },
      {
        title: "Encrypted signalling",
        description:
          "TLS-encrypted SIP signalling and SRTP media where the deployment supports it.",
        icon: Lock,
      },
    ],
    idealFor: [
      "Businesses with existing PBX hardware",
      "Multi-site organisations",
      "High call volume environments",
      "Companies migrating away from PRI",
    ],
    audiences: [
      {
        situation: "You already own a PBX",
        fit: "Keep the hardware and the call flows your teams know. Only the connectivity underneath changes.",
      },
      {
        situation: "You run several sites",
        fit: "One trunk configuration serves every location, instead of a separate physical circuit per building.",
      },
      {
        situation: "Your call volume swings",
        fit: "Capacity is sized to your traffic rather than bought in fixed channel blocks you pay for all year.",
      },
      {
        situation: "You are still on PRI",
        fit: "Move off per-channel billing without changing the numbers your customers already dial.",
      },
    ],
    explainer: {
      question: "What is SIP trunking?",
      definition:
        "A SIP trunk is SIP-enabled connectivity between your business IP-PBX infrastructure and the telephone network. Instead of physical PRI or analogue lines running into your building, calls travel over your internet or private connection as data — so the phone system you already own keeps working while the lines underneath it become software.",
      steps: [
        {
          title: "Your PBX stays where it is",
          body: "The IP-PBX you already operate keeps handling extensions, call flows and internal calling exactly as it does today.",
        },
        {
          title: "A SIP trunk replaces the physical lines",
          body: "SipLink connects that PBX to our voice network over SIP, so calls are carried as data rather than over per-channel PRI or analogue circuits.",
        },
        {
          title: "Calls reach the public network",
          body: "Outbound calls are routed to their destination and inbound calls arrive on your business numbers, with carrier failover and least-cost routing where the deployment supports it.",
        },
      ],
    },
    specs: [
      { label: "Connectivity", value: "SIP trunk, inbound and outbound carrier routing" },
      { label: "Resilience", value: "Carrier failover across multiple SIP trunk providers" },
      { label: "Routing", value: "Least-cost, prefix-based and destination-based" },
      { label: "Endpoints", value: "IP phones, softphones and SIP registration" },
      { label: "Legacy", value: "Gateway connectivity for appropriate environments" },
      { label: "Security", value: "TLS signalling and SRTP media, where supported" },
    ],
    migration: {
      heading: "Moving from PRI",
      intro:
        "Moving from traditional telephony can feel complex when your business depends on existing numbers, PBX systems and established call flows. The goal is to modernise the connectivity while keeping you connected and minimising disruption for employees and customers.",
      steps: [
        {
          title: "Assess what you run today",
          body: "We review your existing PRI setup, current number ranges, call volumes and the calling workflows your teams depend on.",
        },
        {
          title: "Design the trunk around it",
          body: "The trunk is engineered to your call volumes, number ranges and redundancy requirements rather than sold as a fixed package.",
        },
        {
          title: "Port your numbers",
          body: "Eligible existing business numbers can move to SipLink, so customers keep dialling what they already know.",
        },
        {
          title: "Cut over and build on it",
          body: "Calls route through SipLink instead of the PRI, giving you a foundation for cloud calling, IVR, queues and contact-centre capabilities when you want them.",
        },
      ],
    },
    faqs: [
      {
        question: "Do we have to replace our existing PBX?",
        answer:
          "No. SIP trunking connects the IP-PBX you already operate to our voice network. Your extensions, call flows and internal dialling keep working — what changes is the connectivity underneath them.",
      },
      {
        question: "Can we keep our existing phone numbers?",
        answer:
          "Eligible business numbers can be ported to SipLink so your customers continue to reach you on the numbers they already have. We validate the numbers and account details and plan the migration before anything moves.",
      },
      {
        question: "What happens if a carrier path fails?",
        answer:
          "Carrier failover, SIP trunk failover and route failover can move calls to an alternate path. Multiple SIP trunk providers can sit behind the same configuration, where the deployment supports it.",
      },
      {
        question: "How many concurrent calls can a trunk carry?",
        answer:
          "Trunks are designed around your actual call volumes rather than sold in fixed channel blocks. Tell us your busy-hour traffic and number ranges and we will size it with you.",
      },
      {
        question: "Is the connection encrypted?",
        answer:
          "TLS-encrypted SIP signalling and SRTP-encrypted media are available where the deployment supports it. We confirm what applies to your environment as part of the design.",
      },
      {
        question: "Will our old analogue equipment still work?",
        answer:
          "Gateway connectivity is available for appropriate legacy environments, so equipment that predates SIP can often stay in place during a phased move.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Lower per-channel costs, capacity that scales with demand, and a path to cloud calling that does not require discarding the equipment you have already paid for — with carrier redundancy and number portability built into the design rather than added later.",
    },
  },
  {
    slug: "cloud-pbx",
    title: "Cloud PBX",
    category: "Business Voice",
    categorySlug: "business-voice",
    tagline: "A full phone system in the cloud.",
    intro:
      "A complete business phone system delivered from the cloud — extensions, call routing, IVR, voicemail and reporting, all managed from a web portal with no hardware to maintain.",
    icon: CloudCog,
    features: [
      {
        title: "Business extensions",
        description:
          "Three- or four-digit extensions created according to how your teams are organised.",
        icon: Phone,
      },
      {
        title: "IVR and auto attendant",
        description:
          "Multi-level menus that route callers to the right department without a receptionist.",
        icon: ListOrdered,
      },
      {
        title: "Ring groups and queues",
        description:
          "Distribute incoming calls across teams instead of a single handset.",
        icon: Users,
      },
      {
        title: "Time conditions",
        description:
          "Different call flows for business hours, holidays and after-hours.",
        icon: Clock,
      },
      {
        title: "Voicemail to email",
        description:
          "Messages delivered to the inbox so nothing waits for someone to check a handset.",
        icon: MessageCircle,
      },
      {
        title: "CDR reporting",
        description:
          "Call history viewable in the portal and downloadable as Excel or CSV.",
        icon: BarChart3,
      },
          {
        title: "Hot desking and extension mobility",
        description:
          "A user's extension, permissions and settings follow the person rather than the handset, so staff can log in at any desk or device.",
        icon: MonitorSmartphone,
      },
      {
        title: "Call park and pickup",
        description:
          "Hold a call on the system rather than on one phone, so a colleague anywhere in the organisation can collect it.",
        icon: PhoneForwarded,
      },
      {
        title: "Central company phonebook",
        description:
          "Shared business contacts alongside personal ones, so the whole organisation dials from the same directory.",
        icon: Users,
      },
      {
        title: "IP phone auto provisioning",
        description:
          "Handsets configured from central SIP device templates, with BLF settings and bulk extension provisioning for larger rollouts.",
        icon: ServerCog,
      },
    ],
    idealFor: [
      "Growing teams",
      "Remote and hybrid workforces",
      "Businesses replacing legacy systems",
      "Organisations opening new locations",
    ],
      problem: {
      heading: "Your phone system is tied to a building",
      body: "A traditional PBX lives in a cupboard at one site, which quietly makes that site the centre of everything. Adding an extension means a visit and a new office means a new system, while staff working from home end up on personal mobiles outside the business numbering plan.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Your phone system runs in our cloud and is administered through a web portal. Extensions, call flows, business hours and permissions are configured centrally and take effect across every site at once, rather than being programmed into a box at each location. Capacity grows by adding users in the portal, not by ordering hardware.",
      ],
    },
    audiences: [
      {
        situation: "Your team no longer sits in one office",
        fit: "The same extensions, routing and business numbers work from desk phones, laptops, browsers and mobiles, so remote and hybrid staff stay inside the business phone system rather than beside it.",
      },
      {
        situation: "Your PBX hardware is reaching the end of its life",
        fit: "Rather than replacing a box with another box, the system moves into the cloud — and your users, extensions, departments and call flows are mapped across as part of the move.",
      },
      {
        situation: "You keep opening new locations",
        fit: "A new site is a set of extensions in the portal, not a new phone system. Branch and remote extensions join the existing numbering plan and the same central administration.",
      },
      {
        situation: "You have no one in-house who wants to run telephony",
        fit: "Day-to-day administration is done from a browser by whoever owns it, with role-based access and group permissions so you can delegate menus and users without handing over the whole system.",
      },
    ],
    explainer: {
      question: "What is a Cloud PBX?",
      definition: "A PBX is the system that makes a business phone estate behave like one organisation — internal extensions, transfers, hold, menus and the routing that decides which phone rings. Traditionally that system was a physical appliance installed at your premises. A Cloud PBX is the same set of capabilities delivered from our infrastructure over the internet instead, so there is nothing at your site to power, patch or replace. You administer it through a web portal, and your people reach it from IP phones, softphones, browsers or mobiles wherever they happen to be working.",
      steps: [
        {
          title: "Your numbering plan is built in the portal",
          body: "Extensions — commonly three or four digits — are created around how your departments and teams are actually organised, along with the users, roles and permissions that go with them.",
        },
        {
          title: "Call flows decide what happens to a call",
          body: "Inbound calls meet an IVR menu, a ring group or a queue, with time conditions applying different handling for business hours, holidays and after hours before the call reaches a person.",
        },
        {
          title: "People answer on whatever device they have",
          body: "The call is delivered to an IP phone, desktop softphone, browser or mobile app, with find me / follow me chasing through devices and voicemail-to-email catching what is missed.",
        },
      ],
    },
    specs: [
      { label: "Deployment", value: "Cloud-based, with hybrid and on-premise IP-PBX options available" },
      { label: "Extensions", value: "Business extensions, commonly three or four digits, plus branch and remote extensions" },
      { label: "Routing", value: "Multi-level IVR, ring groups, queues, time conditions and find me / follow me" },
      { label: "Endpoints", value: "IP phones, desktop and laptop softphones, WebRTC and mobile applications" },
      { label: "Reporting", value: "CDR and call history in the web portal, downloadable as Excel or CSV" },
      { label: "Security", value: "Role-based permissions and two-factor authentication on user and admin portals, where enabled" },
    ],
    migration: {
      heading: "Moving from an on-premise PBX",
      intro: "Many businesses still depend on an on-premise PBX that needs dedicated hardware, maintenance and upgrades. Moving to the cloud is treated as a structured process rather than switching one system off and another on, so the calling workflows your teams and customers rely on are preserved rather than rebuilt from memory.",
      steps: [
        {
          title: "Review what you run today",
          body: "We look at the existing environment — users, extensions, numbers, departments, call flows and routing requirements — along with the business-critical communication your organisation cannot be without.",
        },
        {
          title: "Map it into the new environment",
          body: "Those requirements are mapped into the cloud system and the migration plan is designed around your organisation, so employees and customers can keep communicating with minimal disruption.",
        },
        {
          title: "Configure, test and validate",
          body: "Before the production environment moves, the new setup can be validated to identify potential issues and confirm the required call flows behave as expected.",
        },
        {
          title: "Port numbers and cut over",
          body: "Eligible existing business numbers can be ported so customers keep dialling what they already know, and the cutover is planned around continuity rather than a hard switch.",
        },
        {
          title: "Monitor and adjust",
          body: "After migration the environment can be monitored and adjusted to match how the business actually works, and it becomes the place to add IVR, queues, recording and analytics as you want them.",
        },
      ],
    },
    faqs: [
      {
        question: "How many extensions or users can we have?",
        answer: "Extensions are created according to how your organisation is structured rather than sold in fixed blocks, so the practical answer depends on your teams, sites and call volumes. Tell us how many people and locations you need to cover and we will size the environment with you.",
      },
      {
        question: "Can we keep our existing phone numbers?",
        answer: "Eligible business numbers can be ported to SipLink, so you do not have to update websites, advertisements, invoices and CRM records. The process involves validating the numbers and account details, planning the migration and configuring the numbers in your environment before anything moves.",
      },
      {
        question: "What do our people actually use to make calls?",
        answer: "IP phones, desktop and laptop softphones, browser-based calling over WebRTC and mobile applications all connect to the same system. Extension mobility and hot desking let a user's identity move between devices rather than being fixed to one handset.",
      },
      {
        question: "Who administers it — us or SipLink?",
        answer: "Day-to-day administration is done by your own team through the web portal, with role-based access and user and group permissions controlling who can change what. If you would rather not run it at all, Hosted PBX is the fully managed option.",
      },
      {
        question: "What happens to our calls if a site loses connectivity?",
        answer: "Because call control sits in the cloud rather than in your building, calls can be routed to mobiles, softphones or alternate destinations instead of stopping at a failed site. High-availability, failover and business-continuity options are available depending on the deployment, and we design the resilience around your requirements before go-live.",
      },
      {
        question: "Will it work with our CRM?",
        answer: "API support for CRM integrations is part of the platform, covering click-to-dial, screen pop, call logging and contact synchronisation where the integration supports it. Which of your systems can be connected, and how, is confirmed against your specific applications during the design.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "A phone system that grows by adding users rather than hardware, administered by your own team from a browser, and reachable from wherever employees actually work — with the call flows, reporting and number continuity your business already depends on carried across intact.",
    },
  },
  {
    slug: "hosted-pbx",
    title: "Hosted PBX",
    category: "Business Voice",
    categorySlug: "business-voice",
    tagline: "We host and manage it end to end.",
    intro:
      "SipLink Hosted PBX is a cloud-based business phone system delivered over the internet, giving employees, branches and remote users a common communications environment without operating a traditional on-premises PBX.",
    icon: ServerCog,
    features: [
      {
        title: "Fully managed platform",
        description:
          "We handle hosting, monitoring, updates and availability of the PBX.",
        icon: ServerCog,
      },
      {
        title: "Branch and remote extensions",
        description:
          "Extend the same system to branch offices and home workers.",
        icon: Building2,
      },
      {
        title: "Find me / follow me",
        description:
          "Chase a caller through desk, mobile and softphone until someone answers.",
        icon: PhoneForwarded,
      },
      {
        title: "Recording management",
        description:
          "Store and download recordings in MP3 or WAV, with controlled access.",
        icon: FileAudio,
      },
      {
        title: "Roles and permissions",
        description:
          "Multiple user roles and group permissions across the organisation.",
        icon: ShieldCheck,
      },
      {
        title: "Web-to-fax",
        description:
          "Send faxes from the portal with fax CDR reporting, where enabled.",
        icon: Layers,
      },
          {
        title: "Registration monitoring",
        description:
          "See which extensions and devices are registered, so a phone that has dropped off the system is visible rather than quietly unreachable.",
        icon: Activity,
      },
      {
        title: "Blacklist and whitelist controls",
        description:
          "Restrict or permit specific numbers and apply access restrictions across the organisation from the portal.",
        icon: Lock,
      },
      {
        title: "Central company phonebook",
        description:
          "Shared business contacts alongside personal contacts, so the same directory follows users across desk phone, softphone and mobile.",
        icon: Users,
      },
      {
        title: "API support for CRM integrations",
        description:
          "Connect the hosted system to your CRM and business workflows through API integration, where available for the deployment.",
        icon: Webhook,
      },
    ],
    idealFor: [
      "Organisations without in-house telecom staff",
      "Branch offices",
      "Managed-service customers",
      "Businesses wanting predictable operational cost",
    ],
      problem: {
      heading: "Not every business wants to run a phone system",
      body: "A traditional on-premises PBX has to live somewhere, and someone has to look after it — firmware, patches, backups and a call at the weekend when it stops answering. That work rarely belongs on a small IT team's plate, and branch offices drift onto separate systems.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "We host the platform, we manage it and we monitor it. There is no PBX in your building to patch, no server to replace and no maintenance window for your team to plan. Head office, branch offices and remote users share the same extensions and call flows, administered centrally through a web portal rather than site by site.",
      ],
    },
    audiences: [
      {
        situation: "You have no telecom specialist on site",
        fit: "SipLink runs the platform end to end, so keeping the phone system patched, monitored and available is not a job your team has to staff.",
      },
      {
        situation: "Your PBX hardware is reaching the end of its life",
        fit: "Rather than buying another box, the system moves to our cloud with your users, extensions, departments and call flows mapped across.",
      },
      {
        situation: "Your staff are spread across branches and homes",
        fit: "Branch and remote extensions belong to the same system, reachable from IP phones, softphones, the browser or a mobile application.",
      },
      {
        situation: "You want communications as an operating cost, not a capital project",
        fit: "Hosting, updates and monitoring come as a managed service, so growth means adding users rather than specifying and installing hardware.",
      },
    ],
    explainer: {
      question: "What is Hosted PBX?",
      definition: "A PBX is the system that connects calls inside a business — it holds your extensions, decides which phone rings, and handles transfers, voicemail and menus. Traditionally it was a physical box installed in your building that you bought, maintained and eventually replaced. Hosted PBX is that same phone system delivered over the internet from SipLink's cloud instead, with no equipment on your site. You still get your own extensions, call routing and administration; what you no longer have is the hardware and the maintenance that comes with it.",
      steps: [
        {
          title: "The system is built in our cloud",
          body: "Your extensions, departments, IVR menus, ring groups, time conditions and user roles are configured as a single environment on our hosted platform.",
        },
        {
          title: "Your people connect to it",
          body: "Employees register IP phones, desktop and laptop softphones, WebRTC in the browser, a Chrome extension dialer or a mobile application, from the office, a branch or home.",
        },
        {
          title: "We keep it running",
          body: "SipLink hosts, monitors and maintains the platform, while your administrators manage users, call flows, recordings and reporting through the web portal.",
        },
      ],
    },
    specs: [
      { label: "Deployment", value: "Cloud-hosted and managed by SipLink, no on-site PBX" },
      { label: "Access", value: "IP phones, desktop and mobile softphones, WebRTC and Chrome extension dialer" },
      { label: "Management", value: "Centralised web portal with user roles and group permissions" },
      { label: "Reporting", value: "CDR and call history in the portal, downloadable as Excel or CSV" },
      { label: "Recordings", value: "Stored and downloadable in MP3 or WAV, with controlled access" },
      { label: "Security", value: "Secure cloud infrastructure, access permissions and two-factor authentication, where enabled" },
    ],
    migration: {
      heading: "Moving off an on-premises PBX",
      intro: "Many businesses still depend on a PBX that needs dedicated hardware, maintenance and physical space. We treat the move as a structured process from planning to go-live rather than switching one system off and another on — the goal is to modernise the environment while keeping you connected and minimising disruption for employees and customers.",
      steps: [
        {
          title: "Review what you run today",
          body: "We go through the existing environment — users, extensions, numbers, departments, call flows, routing and the communication your business cannot be without.",
        },
        {
          title: "Map it into the hosted platform",
          body: "Those requirements are rebuilt in your hosted environment, and the migration plan is designed around your organisation rather than a standard template.",
        },
        {
          title: "Test before anything moves",
          body: "The new setup is validated ahead of the production cutover to identify issues and confirm the required call flows behave as expected.",
        },
        {
          title: "Port numbers and cut over",
          body: "Eligible business numbers are transferred to SipLink where applicable, so customers keep dialling what they already know, and the cutover is planned around continuity.",
        },
        {
          title: "We monitor and adjust",
          body: "After migration the environment is monitored and adjusted as required, and capabilities such as IVR, queues, recording and analytics can be introduced where they help.",
        },
      ],
    },
    faqs: [
      {
        question: "Do we need any equipment on site?",
        answer: "No PBX hardware is required in your building. The system is delivered over the internet from our cloud, and employees connect using IP phones, softphones, the browser or a mobile application.",
      },
      {
        question: "How many users and extensions can we have?",
        answer: "Extensions are created according to how your organisation is structured, commonly as three- or four-digit numbers, and the environment is sized around your requirements rather than sold in fixed blocks. Tell us your user counts, sites and call patterns and we will design it with you.",
      },
      {
        question: "Who administers the system day to day?",
        answer: "You do, through the web portal — extensions, IVR menus, time conditions, phonebooks and permissions are all yours to change. SipLink is responsible for hosting, monitoring and maintaining the platform underneath.",
      },
      {
        question: "Can branch offices and home workers use the same system?",
        answer: "Yes. Remote and branch-office extensions are part of the same hosted environment, so a home worker and a branch receptionist sit on one directory with one set of call flows.",
      },
      {
        question: "How are our recordings and reports handled?",
        answer: "Call recordings can be stored and downloaded in MP3 or WAV format, and CDR reports can be viewed in the portal and downloaded as Excel or CSV. User roles and group permissions control who can reach recordings and reporting.",
      },
      {
        question: "How is access to the system secured?",
        answer: "The platform runs on secure cloud infrastructure with access permissions, multiple user roles and two-factor authentication on the user and admin portals where enabled. Blacklist and whitelist controls and registration-status monitoring are available as well.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "A full business phone system for offices, branches and remote staff with no hardware to own and no platform to maintain — you manage the people and the call flows, and SipLink manages everything underneath them.",
    },
  },
  {
    slug: "ip-pbx",
    title: "IP PBX",
    category: "Business Voice",
    categorySlug: "business-voice",
    tagline: "On-premise PBX, SIP enabled.",
    intro:
      "On-premise IP-PBX deployments for organisations that need to keep call control inside their own network, connected to external voice services over SIP.",
    icon: Cpu,
    sparseSource: true,
    features: [
      {
        title: "On-premise call control",
        description: "Call processing stays inside your network perimeter.",
        icon: Cpu,
      },
      {
        title: "SIP connectivity",
        description:
          "Connect the on-site PBX to external voice networks over SIP trunks.",
        icon: Network,
      },
      {
        title: "Hybrid deployment",
        description:
          "Combine on-premise call control with cloud services where it makes sense.",
        icon: Cloud,
      },
      {
        title: "Gateway connectivity",
        description:
          "Interconnect appropriate legacy equipment during a phased migration.",
        icon: ArrowLeftRight,
      },
          {
        title: "Extension mobility and hot desking",
        description:
          "Staff sign in at whichever handset they are sitting at and their extension, contacts and settings follow them.",
        icon: MonitorSmartphone,
      },
      {
        title: "Call transfer, park and pickup",
        description:
          "Blind and attended transfer, call park and call pickup, so a call reaches the right person rather than going back to the queue.",
        icon: PhoneForwarded,
      },
      {
        title: "Central company phonebook",
        description:
          "Shared company directory alongside business and personal contacts, with blacklist and whitelist controls.",
        icon: Users,
      },
      {
        title: "Device auto provisioning",
        description:
          "IP phone auto provisioning, SIP device templates and bulk extension provisioning, so handsets are configured centrally rather than one at a time.",
        icon: Boxes,
      },
    ],
    idealFor: [
      "Regulated environments",
      "On-premise policy requirements",
      "Hybrid deployments",
      "Existing PBX investments",
    ],
      problem: {
      heading: "Some call control cannot leave the building",
      body: "Policy, regulation or a recent capital investment can all make moving call control off site the wrong answer, however attractive the cloud looks on paper. But an on-premise system left on legacy trunks stays expensive to feed, awkward to extend to branch offices, and cut off from newer routing and reporting.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "The IP-PBX sits in your own network, at your own site, under your own administration, so call processing and internal dialling never leave the perimeter you control. SipLink then connects that on-site system to our voice network over SIP, with trunking, DID management and carrier routing applied to a box you own.",
      ],
    },
    audiences: [
      {
        situation: "You must keep call control on site",
        fit: "Call processing stays inside your own network perimeter, administered by your own team, with SIP connectivity to the outside world rather than a hosted platform holding the call state.",
      },
      {
        situation: "You have already paid for PBX hardware",
        fit: "The investment keeps earning. SIP trunking, DID management and modern routing attach to the system you own instead of requiring you to write it off.",
      },
      {
        situation: "You want some services in the cloud and some on the premises",
        fit: "Hybrid deployment combines on-premise call control with SipLink cloud services, so remote workers, mobile clients and additional capability do not force the core system off site.",
      },
      {
        situation: "You still run equipment that predates SIP",
        fit: "Gateway connectivity interconnects appropriate legacy equipment, letting analogue and older kit carry on working while the rest of the estate moves to SIP.",
      },
    ],
    explainer: {
      question: "What is an IP PBX?",
      definition: "A PBX is the private exchange that runs a business's internal telephony — extensions, transfers, hold, voicemail and the rules deciding where an incoming call goes. An IP PBX does that work over your data network using SIP rather than over dedicated telephone wiring. In this deployment the IP PBX is a system you own and operate at your own site, rather than a service someone else hosts for you. It connects outward to the public telephone network over SIP trunks, so internal calling stays local while external calls travel over IP.",
      steps: [
        {
          title: "The PBX runs on your premises",
          body: "The system is installed inside your own network and administered by your team. Extensions, call flows and internal dialling are processed on site and never depend on an external platform to connect a colleague to a colleague.",
        },
        {
          title: "SIP trunks connect it outward",
          body: "SipLink links that on-site system to our voice network over SIP, carrying inbound and outbound calls, with DID management, number portability and carrier routing handled on our side of the trunk.",
        },
        {
          title: "Cloud services extend it where you want them",
          body: "Hybrid deployment adds SipLink capability around the on-premise core — remote and mobile endpoints, additional routing, messaging or contact-centre functions — without moving call control off your site.",
        },
      ],
    },
    specs: [
      { label: "Deployment", value: "On-premise IP-PBX, with hybrid options" },
      { label: "Connectivity", value: "SIP trunk connectivity to external voice networks" },
      { label: "Endpoints", value: "IP phones, softphones and SIP registration" },
      { label: "Routing", value: "Least-cost, prefix-based and destination-based" },
      { label: "Legacy", value: "Gateway connectivity for appropriate environments" },
      { label: "Security", value: "TLS signalling and SRTP media, where supported" },
    ],
    faqs: [
      {
        question: "How many extensions and concurrent calls will the system handle?",
        answer: "That depends on the platform you deploy, the hardware it runs on and the trunk capacity behind it, so it is sized rather than quoted from a list. Tell us your extension count, busy-hour call volumes and number ranges and we will work through the sizing with you.",
      },
      {
        question: "Does on-premise mean we lose cloud features?",
        answer: "No. Hybrid deployment combines on-premise call control with SipLink cloud services, so capabilities such as remote extensions, mobile and softphone clients and additional routing can sit alongside the on-site system. What stays on your premises is the call control itself.",
      },
      {
        question: "Can we keep our existing phone numbers?",
        answer: "Eligible business numbers can be ported to SipLink and routed to your on-premise system, so customers keep dialling what they already know. We validate the numbers and account details before anything moves.",
      },
      {
        question: "What happens to our analogue phones and older equipment?",
        answer: "Gateway connectivity is available for appropriate legacy environments, so equipment predating SIP can often stay in service during a phased migration. We confirm what applies to your specific kit as part of the design.",
      },
      {
        question: "Is traffic between our site and your network encrypted?",
        answer: "TLS-encrypted SIP signalling and SRTP-encrypted media are available where the deployment supports it. Which applies to your environment is settled during design, alongside IP access controls and the other security rules on the trunk.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Call control that stays inside your own network and under your own administration, with the SIP connectivity, number management and routing of a modern platform attached to it — and a hybrid path to cloud services whenever you decide you want one.",
    },
  },

  // -------------------------------------------------------------- numbers
  {
    slug: "did-numbers",
    title: "DID Numbers",
    category: "Phone Numbers",
    categorySlug: "phone-numbers",
    tagline: "Give your business a direct line to every customer.",
    intro:
      "SipLink DID (Direct Inward Dialing) Numbers let you give individual phone numbers to specific employees, departments, extensions or applications, so customers reach the right person without navigating a main switchboard.",
    icon: PhoneIncoming,
    features: [
      {
        title: "Direct-to-extension routing",
        description:
          "Map each number straight to a person, team or application.",
        icon: PhoneForwarded,
      },
      {
        title: "Departmental numbers",
        description:
          "Separate numbers for sales, support, billing and other functions.",
        icon: Users,
      },
      {
        title: "Multi-location support",
        description: "Numbers for teams across different offices and regions.",
        icon: Globe,
      },
      {
        title: "Platform integration",
        description:
          "Use DIDs with SIP trunks, Cloud PBX, IVR and call routing.",
        icon: Boxes,
      },
          {
        title: "DID-based call routing",
        description:
          "Route each call by the number it arrived on, combined with time-based, caller-ID and department rules where you need them.",
        icon: GitBranch,
      },
      {
        title: "Central number management",
        description:
          "Assign, reassign and manage numbers and extensions from one administration environment as teams change.",
        icon: ListOrdered,
      },
      {
        title: "Number portability",
        description:
          "Bring eligible existing business numbers to SipLink so customers keep dialling the ones they already know.",
        icon: ArrowLeftRight,
      },
      {
        title: "Reachable from any device",
        description:
          "Deliver calls to IP phones, softphones and mobile clients so a direct number follows the person rather than the desk.",
        icon: MonitorSmartphone,
      },
    ],
    idealFor: [
      "Sales teams",
      "Support departments",
      "Individual employees",
      "Remote teams",
      "Businesses managing multiple departments",
    ],
      problem: {
      heading: "Switchboards slow customers down",
      body: "When every caller arrives on one main number, the first thing they meet is a menu, a receptionist or a queue — not the person they were trying to reach. Each transfer adds hold time, and a caller who knows who they want still has to explain themselves first.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Each DID is a real, dialable number that maps directly to a destination you choose — an individual employee, a department, an extension or an application. Callers who know where they are going connect straight through, and the switchboard becomes the fallback rather than the only route in. Numbers are not tied to a desk.",
      ],
    },
    audiences: [
      {
        situation: "Your sales team is hard to reach directly",
        fit: "Each representative gets a number prospects can call back on, so a returned call lands with the person who made the pitch rather than in the general queue.",
      },
      {
        situation: "Support calls arrive on the same number as everything else",
        fit: "A dedicated support DID routes straight into the right department, with IVR, queues and business-hour rules applied behind it where you want them.",
      },
      {
        situation: "Your people work from different places",
        fit: "A DID follows the person rather than the desk, so remote and distributed employees stay reachable on a consistent business number wherever they are working.",
      },
      {
        situation: "You are managing several departments behind one number",
        fit: "Sales, support, billing and service each get their own line, so callers self-select at the dial pad instead of being routed by hand.",
      },
    ],
    explainer: {
      question: "What is a DID number?",
      definition: "DID stands for Direct Inward Dialing. A DID number is a business telephone number that connects a caller straight to a specific destination inside your organisation — an employee, a department, an extension or an application — without passing through a main switchboard. The number is external and public, so customers dial it as they would any other, but internally it is bound to whatever destination you configure. Because DIDs are handled by your communication platform rather than by physical lines, you can hand out many direct numbers without needing a separate line for each one.",
      steps: [
        {
          title: "A number is assigned to a destination",
          body: "You decide what each DID points to — a named employee, a department, an extension or an application — and that mapping is configured in the SipLink environment.",
        },
        {
          title: "A customer dials it directly",
          body: "The caller uses the published number for that person or team rather than the main company number, so there is no menu or receptionist in the way.",
        },
        {
          title: "The call lands where it should",
          body: "SipLink routes the call to the configured destination, applying whatever call handling you have set up around it — extension routing, IVR, queues, forwarding or business-hour rules.",
        },
      ],
    },
    specs: [
      { label: "Routing", value: "DID-based, extension-based and department-based" },
      { label: "Assignment", value: "Numbers mapped to employees, departments, extensions or applications" },
      { label: "Platform", value: "Works with SIP, Cloud PBX, call routing and IVR" },
      { label: "Management", value: "Number and DID management from central administration" },
      { label: "Portability", value: "Number portability support for eligible existing numbers" },
      { label: "Endpoints", value: "IP phones, softphones and mobile access" },
    ],
    migration: {
      heading: "Getting your numbers in place",
      intro: "Whether you are adding direct numbers for the first time or bringing numbers you already publish, the work has the same shape: understand what you have, decide what each number should do, then configure and test it before customers start dialling.",
      steps: [
        {
          title: "Review your numbers and structure",
          body: "We look at the numbers you use today, your users, extensions, departments and the call flows your teams depend on, so the DID plan reflects how the organisation actually works.",
        },
        {
          title: "Port what you already publish",
          body: "Eligible existing business numbers can be transferred to SipLink so customers keep dialling what they know. The process covers coordinating the required information, validating the numbers and account details, and planning the migration.",
        },
        {
          title: "Map each number to a destination",
          body: "New and ported numbers are configured in the SipLink environment and pointed at the right employee, department, extension or application, with routing, IVR, extensions and queues applied as required.",
        },
        {
          title: "Test, then publish",
          body: "Call flows are validated before the production cutover, so the numbers you put on your website, signatures and business cards behave the way you expect from the first call.",
        },
      ],
    },
    faqs: [
      {
        question: "How many numbers can we have, and which countries are they available in?",
        answer: "Number availability and geographic coverage depend on the regions you need and what is supported there, so we confirm them against your requirements rather than publishing a blanket list. Tell us where your customers are and how many direct numbers you expect to hand out, and we will check availability with you before anything is committed.",
      },
      {
        question: "Do we need a separate phone line for each DID?",
        answer: "No. DIDs are handled by your communication platform rather than by dedicated physical lines, so you can assign direct numbers to people, departments and applications without installing a circuit for each one.",
      },
      {
        question: "Can we keep our existing numbers?",
        answer: "Eligible existing business numbers can be ported to SipLink, so you are not updating your website, advertisements, invoices, business cards and CRM records. We validate the numbers and account details and plan the migration before anything moves.",
      },
      {
        question: "Can a DID still go through an IVR or a queue?",
        answer: "Yes. A direct number can point straight at a person, or it can feed an IVR menu, a call queue or a department's routing rules. DID-based routing works alongside caller-ID, time-based and department-based routing, so each number can be as direct or as structured as it needs to be.",
      },
      {
        question: "What happens when someone leaves or changes role?",
        answer: "The number is a configuration rather than a fixture, so it can be reassigned to another employee, a department or a different call flow through number and DID management. Customers who keep dialling the old number reach whoever you have pointed it at.",
      },
      {
        question: "Will DIDs work for people who are not in the office?",
        answer: "Yes. Calls to a DID can be delivered to IP phones, softphones and mobile clients, so remote and distributed employees stay reachable on their business number rather than handing out a personal mobile.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Customers reach the right person on the first attempt instead of working through a switchboard, and your teams present a professional, direct point of contact wherever they happen to be working.",
    },
  },
  {
    slug: "toll-free-numbers",
    title: "Toll-Free Numbers",
    category: "Phone Numbers",
    categorySlug: "phone-numbers",
    tagline: "Make it easier for customers to reach you.",
    intro:
      "SipLink Toll-Free Numbers give customers a convenient way to contact your business without being charged for the call, depending on the applicable toll-free service and calling region.",
    icon: PhoneCall,
    features: [
      {
        title: "Free for the caller",
        description:
          "Customers are not charged, subject to the service and calling region.",
        icon: PhoneCall,
      },
      {
        title: "Routed to the right team",
        description:
          "Direct incoming toll-free calls to teams, agents or locations.",
        icon: GitBranch,
      },
      {
        title: "Works with IVR and queues",
        description:
          "Combine with menus and queues for structured call handling.",
        icon: ListOrdered,
      },
      {
        title: "Regional coverage",
        description:
          "Serve customers across regions from a single advertised number.",
        icon: Globe,
      },
          {
        title: "Business-hours and holiday routing",
        description:
          "Different call flows for working hours, holidays and after-hours, so the line behaves sensibly when nobody is at the desk.",
        icon: Clock,
      },
      {
        title: "Queue callback",
        description:
          "Callers waiting in a queue can be called back when an agent becomes available rather than holding on the line.",
        icon: PhoneIncoming,
      },
      {
        title: "Call recording and monitoring",
        description:
          "Capture conversations on your public line for quality review and training, with role-based access controlling who can replay them.",
        icon: FileAudio,
      },
      {
        title: "Call analytics",
        description:
          "Understand volumes, answered and missed calls, duration and busy periods on the number you advertise.",
        icon: BarChart3,
      },
    ],
    idealFor: [
      "Customer support",
      "Sales enquiries",
      "Helplines",
      "Service businesses",
      "Organisations serving customers across regions",
    ],
      problem: {
      heading: "The cost of calling puts people off",
      body: "When reaching your sales line or support desk costs the caller money, a proportion of them decide it can wait — and you never find out what they wanted. Contact is also scattered across whichever direct number a customer happened to find, leaving no single route you can staff and measure.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "A toll-free number gives your organisation a single customer-facing line to advertise, where the caller is not charged for the call, depending on the applicable toll-free service and calling region. Incoming calls are then directed to the appropriate teams, agents or locations through an IVR menu, a queue or time-based routing.",
      ],
    },
    audiences: [
      {
        situation: "You run a customer support desk",
        fit: "Give customers one number that does not cost them to dial, then route those calls into queues and agent groups instead of a single shared handset.",
      },
      {
        situation: "You advertise a line for sales enquiries",
        fit: "Removing the cost of the call removes one reason a prospect does not make it. Enquiries arrive on a number you control, route and report on.",
      },
      {
        situation: "You operate a helpline",
        fit: "People who most need to call are often least able to pay for it. A toll-free line with IVR menus and out-of-hours routing keeps the service reachable and orderly.",
      },
      {
        situation: "You serve customers across regions",
        fit: "One advertised number can front a service business whose teams sit in several places, with calls distributed to the right location or department behind it.",
      },
    ],
    explainer: {
      question: "What is a toll-free number?",
      definition: "A toll-free number is a business phone number a customer can dial without being charged for the call, depending on the applicable toll-free service and calling region. Instead of the caller paying, the cost of the call sits with the business that publishes the number — though exactly who is charged, and for what, genuinely varies between services and calling regions. To the caller it looks like any other number to dial; behind it, the call is routed into your business communication system rather than to a particular handset. That is what lets one advertised number serve several teams, departments or locations at once.",
      steps: [
        {
          title: "You publish one number",
          body: "A toll-free number becomes the line you advertise on your website, campaigns and customer-facing material, so contact arrives in one place rather than across scattered direct numbers.",
        },
        {
          title: "The customer dials it without paying",
          body: "The caller is not charged for the call, subject to the applicable toll-free service and calling region, which removes the cost of picking up the phone as a reason not to.",
        },
        {
          title: "The call is routed to the right team",
          body: "Incoming calls are directed to the appropriate teams, agents or locations, optionally through an IVR menu or a call queue, using the routing rules you configure.",
        },
      ],
    },
    specs: [
      { label: "Routing", value: "Department, time-based and DID-based call routing" },
      { label: "Handling", value: "Multi-level IVR, call queues and agent groups" },
      { label: "Platform", value: "Works with SIP, Cloud PBX and contact-centre services" },
      { label: "Continuity", value: "Failover routing and after-hours call flows" },
      { label: "Management", value: "Web portal administration with role-based access" },
      { label: "Reporting", value: "CDR history, call recording and real-time analytics" },
    ],
    migration: {
      heading: "Getting your toll-free line running",
      intro: "Putting a toll-free number in front of your customers is mostly a question of deciding what should happen to the calls it brings in. We work through the number itself, the call flow behind it and the teams who will answer, before it goes anywhere near your advertising.",
      steps: [
        {
          title: "Tell us how you want to be reached",
          body: "We start with the calling regions you serve, the teams the calls should reach, and whether this line is replacing something you already advertise or standing alongside it.",
        },
        {
          title: "Port an existing toll-free number, or take a new one",
          body: "If you already advertise a toll-free number, eligible numbers can be ported to SipLink so you do not have to change your website, invoices and campaign material. Porting involves coordinating the required information, validating the numbers and account details, and planning the migration.",
        },
        {
          title: "Design the call flow behind it",
          body: "IVR menus, queues, department routing, business-hours and holiday rules are configured so callers reach the right team rather than a general inbox. Recording and analytics are set up at the same time.",
        },
        {
          title: "Test, then go live",
          body: "The call flow can be validated before it carries real traffic, so the routing behaves as expected when the number goes onto your customer-facing material. After go-live the setup can be monitored and adjusted as your call patterns become clear.",
        },
      ],
    },
    faqs: [
      {
        question: "Is the call really free for the customer?",
        answer: "The caller is not charged for the call, depending on the applicable toll-free service and calling region. Who is charged, and for which types of call, genuinely varies between regions and services — calls from mobile networks in particular are treated differently in different places. Tell us where your customers call from and we will confirm what applies before you advertise the number.",
      },
      {
        question: "Which countries and regions can you provide toll-free numbers in?",
        answer: "Availability depends on the region, so rather than publish a list that may not hold for your case, we would rather check it against the markets you actually serve. Tell us where your customers are and we will confirm what we can provide there.",
      },
      {
        question: "What does a toll-free number cost?",
        answer: "Toll-free pricing depends on the calling regions involved, the volume of calls you expect to receive and the wider SipLink services the number sits alongside. We put a quote together against your actual requirements rather than quoting a headline rate you would then have to qualify.",
      },
      {
        question: "Can we keep the toll-free number we already advertise?",
        answer: "Eligible existing business numbers can be ported to SipLink, so the number on your website, invoices and advertising stays the same. We validate the numbers and account details and plan the migration before anything moves.",
      },
      {
        question: "Where do the calls actually go?",
        answer: "Wherever you route them. Incoming toll-free calls can be directed to teams, agents, extensions or locations, and can pass through an IVR menu or a call queue first, with different call flows for business hours, holidays and after-hours.",
      },
      {
        question: "Can we see what happens on the line?",
        answer: "Yes. Toll-free traffic is handled inside your SipLink environment, so call recording, CDR history and real-time analytics cover it in the same way as your other business calls. Managers can review call volumes, answered and missed calls and agent activity from the web portal.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "One memorable, professional line your customers can call without thinking about the cost, backed by routing and reporting that make sure those calls reach the right team and none of them disappear unrecorded.",
    },
  },
  {
    slug: "virtual-numbers",
    title: "Virtual Phone Numbers",
    category: "Phone Numbers",
    categorySlug: "phone-numbers",
    tagline: "Your business number, without the traditional phone system.",
    intro:
      "SipLink Virtual Phone Numbers let you establish a professional phone presence without being tied to a physical telephone line, with calls routed to whichever destinations suit how your teams work.",
    icon: Smartphone,
    features: [
      {
        title: "No physical line",
        description: "Establish presence without leasing premises or copper.",
        icon: Cloud,
      },
      {
        title: "Flexible routing",
        description:
          "Send calls to SIP phones, softphones, mobiles or extensions.",
        icon: GitBranch,
      },
      {
        title: "New market entry",
        description:
          "Test a region with a local number before committing to an office.",
        icon: Globe,
      },
      {
        title: "Departmental separation",
        description:
          "Distinct numbers for different functions and business lines.",
        icon: Layers,
      },
          {
        title: "Find Me / Follow Me",
        description:
          "Ring a sequence of destinations so a call reaches whoever is available, wherever they are working.",
        icon: PhoneForwarded,
      },
      {
        title: "Time-based routing",
        description:
          "Different destinations for business hours, holidays and after-hours, so calls are handled appropriately outside the working day.",
        icon: Clock,
      },
      {
        title: "Mobile and softphone access",
        description:
          "Take calls on desktop softphones, mobile clients or in the browser via WebRTC, rather than on a desk phone tied to a location.",
        icon: MonitorSmartphone,
      },
      {
        title: "Centralised number management",
        description:
          "Provision, assign and reassign numbers and DIDs for teams and departments from one web portal.",
        icon: Layers,
      },
    ],
    idealFor: [
      "Remote businesses",
      "Distributed teams",
      "Companies entering new markets",
      "Customer support teams",
      "Businesses requiring flexible call routing",
    ],
      problem: {
      heading: "A number should not require a building",
      body: "Traditionally, a business number in a place meant something physical there — a line into a building, a PBX in a cupboard, someone on site to answer it. No office in a market means no number in that market, and a distributed team has nowhere for the line to terminate.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "A virtual number has no physical line behind it. It exists on the SipLink platform, and where a call lands is decided only by the destination you configure — SIP phones, softphones, mobile devices or extensions. Destinations are yours to change, so a number can follow a team through a move without the number itself changing.",
      ],
    },
    audiences: [
      {
        situation: "Your business has no fixed office",
        fit: "A professional business number without premises, a line or a phone system behind it. Calls reach whichever devices your people actually use.",
      },
      {
        situation: "Your team is spread across locations",
        fit: "One number can ring SIP phones, softphones, mobiles or extensions wherever colleagues are working, so customers do not need to know who is where.",
      },
      {
        situation: "You are entering a new market",
        fit: "Establish a phone presence for a region before committing to infrastructure there, and route the calls back to the team already handling that business.",
      },
      {
        situation: "Your support team needs calls to land in the right place",
        fit: "Separate numbers for departments and business functions, each routed to its own destination or into IVR menus and queues on the same platform.",
      },
    ],
    explainer: {
      question: "What is a virtual phone number?",
      definition: "A virtual phone number is a business number that is not attached to a physical telephone line. Nothing is wired into a building for it — the number lives on the SipLink platform, and where calls go is a setting rather than a cable. You choose the destinations: SIP phones, softphones, mobile devices, extensions or other configured endpoints. Because the number and the destination are separate things, you can change who answers, and from where, without changing the number your customers dial.",
      steps: [
        {
          title: "You take a number",
          body: "A business number is provisioned on the SipLink platform. There is no line to install and no equipment that has to exist in a particular place for the number to be usable.",
        },
        {
          title: "You choose where it lands",
          body: "The number is pointed at the destinations you nominate — SIP phones, softphones, mobiles, extensions or other configured endpoints — and the same number can serve people working in different places.",
        },
        {
          title: "Calls follow your configuration",
          body: "Inbound calls arrive on that number and are delivered according to the routing you have set, including time-based and department-based rules, IVR menus and queues where you want them.",
        },
      ],
    },
    specs: [
      { label: "Routing", value: "Configured destinations, with time-based and department-based rules" },
      { label: "Destinations", value: "SIP phones, softphones, mobile devices and extensions" },
      { label: "Presence", value: "Business number without a physical line or on-site PBX" },
      { label: "Platform", value: "Works with SIP, Cloud PBX, IVR and call routing" },
      { label: "Management", value: "Centralised number and DID management via the web portal" },
      { label: "Portability", value: "Number portability support for eligible existing numbers" },
    ],
    migration: {
      heading: "Getting started",
      intro: "Setting up a virtual number is mostly a conversation about where calls should end up, because there is no installation in the middle. If you already have numbers you want to keep, those can be brought across rather than replaced.",
      steps: [
        {
          title: "Tell us what presence you need",
          body: "We talk through the markets, departments and business functions you want numbers for, and which of those are available to you. Coverage is confirmed with you rather than assumed.",
        },
        {
          title: "Decide where calls should land",
          body: "For each number, you nominate the destinations — SIP phones, softphones, mobiles or extensions — and whether calls go straight to a person or into a menu, a group or a queue.",
        },
        {
          title: "Bring existing numbers with you",
          body: "Eligible business numbers you already advertise can be ported to SipLink, so the contact details on your website, cards and customer records stay correct.",
        },
        {
          title: "Adjust as the business changes",
          body: "Destinations and routing are managed centrally through the web portal, so a move, a new hire or a change in working pattern is a configuration change rather than a new line.",
        },
      ],
    },
    faqs: [
      {
        question: "Do we need any equipment or a phone line for this?",
        answer: "No. A virtual number has no physical line behind it, and nothing needs to be installed at a site for it to work. Calls are delivered to whatever destinations you configure — SIP phones, softphones, mobiles or extensions — so the devices your teams already use are usually enough.",
      },
      {
        question: "How is this different from a DID number?",
        answer: "They overlap, and many businesses use both. A DID is about giving a direct inward line to a specific person, department, extension or application so callers bypass the switchboard; a virtual number is about having a business presence with no physical line or traditional phone system behind it at all. In practice the distinction is emphasis rather than technology, and we will help you pick whichever framing fits how you want calls handled.",
      },
      {
        question: "Which countries can we get numbers in, and how many can we have?",
        answer: "Availability depends on the region and the number type, and it changes, so we confirm what is actually obtainable for you rather than publishing a list. Tell us the markets and functions you need numbers for and we will come back with what is available and on what terms.",
      },
      {
        question: "Can one number reach people in different places?",
        answer: "Yes. Calls to a single number can be routed to destinations across locations, so colleagues in the office, at home or in another region can all be reachable on it. Find Me / Follow Me and ring group behaviour are available where the deployment supports it.",
      },
      {
        question: "Can we keep the numbers we already advertise?",
        answer: "Eligible existing business numbers can be ported to SipLink, so you do not have to update your website, advertising, business cards and customer records. We check the numbers and account details and plan the move before anything changes.",
      },
      {
        question: "What happens when someone moves or leaves?",
        answer: "The number and the destination are separate, so you change where calls land without changing the number itself. Reassignment is done centrally through the web portal alongside your other numbers and extensions.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "A business phone presence that reflects where your customers are rather than where your equipment is, and numbers that can be repointed as teams, markets and working patterns change — without anything being installed, moved or replaced.",
    },
  },
  {
    slug: "number-porting",
    title: "Number Porting",
    category: "Phone Numbers",
    categorySlug: "phone-numbers",
    tagline: "Keep your business number. Move to SipLink.",
    intro:
      "SipLink Number Porting moves your existing business phone numbers to SipLink while keeping the numbers your customers already know, so changing provider does not mean changing your contact details everywhere.",
    icon: ArrowLeftRight,
    features: [
      {
        title: "Keep existing numbers",
        description:
          "Retain the numbers customers, listings and materials already use.",
        icon: Repeat,
      },
      {
        title: "Validation and planning",
        description:
          "Numbers and account details are checked before the migration is scheduled.",
        icon: ShieldCheck,
      },
      {
        title: "Minimal disruption",
        description:
          "The process is designed to maintain continuity through the transition.",
        icon: Timer,
      },
      {
        title: "Full platform capability",
        description:
          "Ported numbers work with routing, IVR, extensions and queues.",
        icon: Boxes,
      },
          {
        title: "Coordinated with your current provider",
        description:
          "Porting involves the carrier you are leaving, and that coordination is handled as part of the process rather than left to you.",
        icon: Workflow,
      },
      {
        title: "Account detail checks",
        description:
          "Numbers and account records are verified against the details the losing carrier holds before a migration is scheduled.",
        icon: ShieldCheck,
      },
      {
        title: "Part of a wider migration",
        description:
          "Porting fits into PRI, PBX and cloud migrations, so numbers move as one step in a planned transition rather than a separate project.",
        icon: Cloud,
      },
      {
        title: "Numbers across teams and locations",
        description:
          "Multiple business numbers can be ported and routed to different departments, sites or call flows once they are on the platform.",
        icon: Building2,
      },
    ],
    idealFor: [
      "Businesses migrating from another provider",
      "PRI and legacy PBX replacements",
      "Organisations with established public numbers",
    ],
      problem: {
      heading: "Changing numbers is more disruptive than changing provider",
      body: "Your business number is printed on your website, your advertisements, your invoices and every piece of customer-facing material you have produced. Change it and all of that has to be updated, along with CRM records and customer databases, while customers carry on dialling the old number and reaching nobody.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Porting starts by coordinating the numbers, the account details held by your current provider, and how those numbers are used today, because most porting problems are information problems discovered late. Eligible numbers and account details are validated, and coordination with the losing carrier sets the pace. Routing, IVR, extensions and queues are configured before the numbers carry live traffic.",
      ],
    },
    audiences: [
      {
        situation: "Your number is printed on everything",
        fit: "Signage, packaging, directories and years of advertising all point at one number. Porting keeps it pointing at you, so none of that has to be reprinted or reissued.",
      },
      {
        situation: "You are moving off PRI or a legacy PBX",
        fit: "The migration modernises the infrastructure underneath while the published numbers stay where they are. Customers never learn that the system behind the number changed.",
      },
      {
        situation: "You are leaving a provider you have outgrown",
        fit: "Eligible numbers can move to SipLink with you rather than staying behind with the old account. Validation and coordination with the losing carrier are handled as part of the process.",
      },
      {
        situation: "Your numbers are tied into customer records and integrations",
        fit: "CRM entries, saved contacts and documented support lines keep working, because the number itself does not change. Only the service behind it does.",
      },
    ],
    explainer: {
      question: "What is number porting?",
      definition: "Number porting is the process of transferring an existing business phone number from one provider to another, so the number stays the same while the service behind it changes. The number is not copied or forwarded — ownership of it moves, and calls to it arrive on your new platform instead of the old one. Porting applies to eligible numbers, and whether a particular number qualifies is established during validation rather than assumed at the outset. Once a number has ported, it behaves like any other number on the SipLink platform and can carry your routing, IVR, extensions and queue workflows.",
      steps: [
        {
          title: "The number is checked and validated",
          body: "We confirm the numbers and the account details held with your current provider, which is what establishes whether a number is eligible to move.",
        },
        {
          title: "The move is coordinated with the losing carrier",
          body: "Porting always involves the provider you are leaving. Their process and their confirmation determine when the numbers can transfer.",
        },
        {
          title: "The numbers go live on SipLink",
          body: "The ported numbers are configured in the SipLink environment and start carrying calls into the routing, IVR, extensions and queues you have set up.",
        },
      ],
    },
    specs: [
      { label: "Eligibility", value: "Eligible existing business numbers, established by validation" },
      { label: "Validation", value: "Numbers and account details checked before scheduling" },
      { label: "Planning", value: "Migration planned around the coordinated information" },
      { label: "Continuity", value: "Designed to maintain service for your customers" },
      { label: "Routing", value: "Routing, IVR, extensions and queues on ported numbers" },
      { label: "Platform", value: "Works across SipLink cloud calling and SIP services" },
    ],
    migration: {
      heading: "How a port runs",
      intro: "Porting is itself a migration, and SipLink treats it as a structured process rather than a form and a switch. The sequence below is what happens between the decision to move and the numbers carrying live calls on SipLink.",
      steps: [
        {
          title: "Coordinate the required information",
          body: "We gather the numbers you want to move, how they are used today, and the details your current provider holds against them. Getting this right at the start is what keeps the rest of the process predictable.",
        },
        {
          title: "Validate the numbers and account details",
          body: "The numbers and the account information are checked to establish which are eligible to port and to catch mismatches — a name, address or account reference that does not agree with the losing carrier's records is the usual cause of a rejected port.",
        },
        {
          title: "Plan the migration",
          body: "With validation complete, the move is planned in coordination with the losing carrier and around your calling patterns. The plan sets out what transfers, in what order, and what happens to call handling on the day.",
        },
        {
          title: "Configure the numbers in SipLink",
          body: "The numbers are built into your SipLink environment with the routing, IVR, extensions and queues they need, so they start handling calls the way you intended from the moment they arrive.",
        },
      ],
    },
    faqs: [
      {
        question: "How long does porting take?",
        answer: "There is no single answer, because a port is not something SipLink completes alone — it depends on validation and on the process of the carrier you are leaving. We can give you a realistic expectation once we have your numbers and account details and have coordinated with that carrier. Talk to us with the specifics and we will tell you what to plan around.",
      },
      {
        question: "Can every number be ported?",
        answer: "No — porting covers eligible numbers, and eligibility is established during validation rather than assumed. We check your numbers and account details up front, so you find out what can move before any plan is committed to. Where a number cannot port, we will tell you and discuss the alternatives.",
      },
      {
        question: "Will our phones stop working during the port?",
        answer: "The process is designed to maintain continuity for your customers, and the numbers are configured in the SipLink environment before they carry live traffic. The migration plan sets out what happens to call handling on the day, so nothing is left to chance.",
      },
      {
        question: "What information do you need from us?",
        answer: "The numbers you want to move and the account details your current provider holds against them, including how those numbers are used today. Details that do not match the losing carrier's records are the most common reason a port is delayed, which is why we validate before scheduling.",
      },
      {
        question: "Do we have to port everything at once?",
        answer: "The migration is planned around your numbers and calling patterns rather than a fixed template, so the order and grouping are part of the plan we agree with you. Tell us which numbers are business-critical and we will build the sequence around them.",
      },
      {
        question: "What can we do with the numbers once they are on SipLink?",
        answer: "Ported numbers work with your SipLink communication services like any other number on the platform. You can apply routing, IVR menus, extensions, queues and the other call-handling workflows your teams need.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "You modernise the communication infrastructure underneath your business without asking a single customer to learn a new number, and keep the business identity you have spent years putting in front of them.",
    },
  },

  // ------------------------------------------------------- contact center
  {
    slug: "call-center",
    title: "Call Center Solution",
    category: "Contact Center",
    categorySlug: "contact-center",
    tagline: "A smarter way to manage every call.",
    intro:
      "SipLink Call Center Solution gives businesses the tools to manage high volumes of customer calls without making the process complicated — intelligent routing, organised queues and centralised agent management.",
    icon: Headset,
    features: [
      {
        title: "Automatic call distribution",
        description:
          "Distribute calls across agents using the strategy that fits your team.",
        icon: GitBranch,
      },
      {
        title: "Inbound and outbound",
        description: "Handle blended operations from a single platform.",
        icon: Repeat,
      },
      {
        title: "Business-hour routing",
        description:
          "Different flows for open hours, holidays and after-hours.",
        icon: Clock,
      },
      {
        title: "Live monitoring",
        description: "Watch active calls and agent status as they happen.",
        icon: Activity,
      },
      {
        title: "Skill-based routing",
        description: "Send callers to the agents best equipped to help them.",
        icon: Users,
      },
      {
        title: "Reports and analytics",
        description:
          "Call centre reporting across queues, agents and outcomes.",
        icon: BarChart3,
      },
          {
        title: "Listen, whisper and barge",
        description:
          "Supervisors can monitor a live call, coach the agent privately or join the conversation, where licensed and where authorised.",
        icon: Headset,
      },
      {
        title: "Queue callback",
        description:
          "Callers can hold their place instead of their line, with automatic callback when an agent becomes available.",
        icon: PhoneForwarded,
      },
      {
        title: "Recording management",
        description:
          "Automatic, manual and on-demand recording with secure access, playback, search, filtering, backup and FTP or SFTP transfer.",
        icon: FileAudio,
      },
      {
        title: "AI-powered call analytics",
        description:
          "Turn calling activity into insight through AI analytics and a custom reporting dashboard alongside scheduled reports.",
        icon: Sparkles,
      },
    ],
    idealFor: [
      "Sales, support and service teams",
      "High call volume operations",
      "Blended inbound and outbound teams",
    ],
      problem: {
      heading: "You cannot manage what you cannot see",
      body: "When call volume grows, the phone system that suited a handful of people stops being enough. Calls ring out at peak times or land on whoever happens to be free rather than whoever can actually help. Managers have no live view of which queues are backing up, so problems arrive as complaints.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "SipLink Call Center Solution is a cloud-based contact-centre environment for inbound, outbound and blended calling. Automatic call distribution, queues, skill-based routing and IVR decide where each call goes, so callers reach the right agent rather than the first extension that rings. Supervisors get real-time queue monitoring and live call monitoring where licensed and where authorised.",
      ],
    },
    audiences: [
      {
        situation: "Your team misses calls at peak times",
        fit: "Automatic call distribution and queues hold callers in order and spread them across whoever is available, with queue announcements, estimated wait and callback so a busy hour does not become a lost customer.",
      },
      {
        situation: "You have no idea what your agents are doing right now",
        fit: "Real-time agent status, queue monitoring and wallboards give supervisors a live view of the floor, and agent login monitoring and performance reporting cover the part that happens after the call.",
      },
      {
        situation: "You run sales campaigns and a support line at the same time",
        fit: "Blended inbound and outbound calling is handled by one platform, with inbound and outbound campaign management rather than a separate system for each direction.",
      },
      {
        situation: "Your agents work from several places, or from home",
        fit: "Softphone and mobile access put agents into the same queues, routing and supervision wherever they are, so the operation is not defined by a room.",
      },
    ],
    explainer: {
      question: "What is a cloud call centre?",
      definition: "A cloud call centre is the software that runs a calling operation — routing, queues, agents, supervision, recording and reporting — delivered as a service rather than installed as hardware in your building. Instead of a phone system that simply rings extensions, it treats calls as work to be distributed: it knows which agents are logged in, what they are skilled at and who is free, and it decides accordingly. Supervisors get a live picture of queues and agents, and every conversation leaves a record and a set of numbers behind it. Because it is centralised, the same rules, monitoring and reporting apply whether your agents sit in one office or several, or at home. Queues, IVR and dialling are components within it, configured together rather than bolted onto each other.",
      steps: [
        {
          title: "The call arrives and is identified",
          body: "An inbound call reaches one of your DIDs, or an outbound call is placed as part of a campaign. IVR menus and voice prompts establish what the caller needs, and CRM integration can bring up who they are before anyone speaks.",
        },
        {
          title: "It is routed by the rules you set",
          body: "Automatic call distribution applies your queue strategy, skill-based routing, agent groups and business-hour call flows to send the call to the right team or agent. If no one is free, queue announcements, estimated wait, callback and automatic callback when an agent becomes available keep the caller from simply being dropped.",
        },
        {
          title: "It is handled, recorded and measured",
          body: "The agent takes the call with transfer and three-way conferencing available, and dispositions it afterwards. Recording captures the conversation for later review, while real-time analytics, scheduled reports and agent and queue reporting turn the day's calling into something you can look at.",
        },
      ],
    },
    specs: [
      { label: "Routing", value: "ACD, queue strategies, skill-based routing and IVR call flows" },
      { label: "Supervision", value: "Real-time agent and queue monitoring, listen, whisper and barge where licensed" },
      { label: "Recording", value: "Automatic, manual and on-demand, with search, playback and storage management" },
      { label: "Reporting", value: "Real-time analytics, scheduled reports and a custom reporting dashboard" },
      { label: "Integration", value: "CRM integration and API support for business applications" },
      { label: "Access", value: "Softphone and mobile, with role-based access control" },
    ],
    migration: {
      heading: "Moving your contact centre",
      intro: "Moving a live calling operation is harder than moving a phone system, because the queues, routing rules and agent structure are the operation. SipLink treats it as a structured process rather than switching one platform off and another on, with the aim of keeping you answering calls throughout.",
      steps: [
        {
          title: "Understand what you run today",
          body: "We review your existing numbers, call flows, queues, departments, agent structure and the business-critical calling requirements your teams depend on — including the reports managers actually use.",
        },
        {
          title: "Design the environment around it",
          body: "Queues, routing strategies, skills, IVR menus, business-hour flows, recording rules and role-based access are configured to match how your operation works, rather than fitted to a standard template.",
        },
        {
          title: "Validate before you cut over",
          body: "The new setup can be tested ahead of the production move so call flows behave as expected and problems are found before customers meet them.",
        },
        {
          title: "Port numbers and go live",
          body: "Eligible business numbers can be ported so customers keep dialling what they already know, and calls move across with the objective of maintaining continuity and minimising disruption for agents and callers.",
        },
        {
          title: "Monitor and adjust",
          body: "After the move the environment is monitored and tuned — routing, queue strategies and reporting adjusted as you see how the operation actually behaves on the new platform.",
        },
      ],
    },
    faqs: [
      {
        question: "How many agents can the platform handle, and what does it cost?",
        answer: "The environment is designed around your operation rather than sold in fixed agent blocks, and scalable team management means it is intended to grow as you do. Tell us your agent numbers, call volumes and campaign patterns and we will size and price it with you.",
      },
      {
        question: "Can supervisors listen to live calls?",
        answer: "Yes — live call monitoring offers listen, whisper and barge, where licensed, and call barging and monitoring where authorised. What is available depends on your deployment, licensing and the policies you set, and role-based access control governs who can use it.",
      },
      {
        question: "Do we need separate systems for inbound and outbound?",
        answer: "No. Blended inbound and outbound calling runs on the same platform, with inbound and outbound campaign management alongside each other. Progressive, predictive and auto dialling are available where supported by the deployment.",
      },
      {
        question: "How is this different from just having call queues?",
        answer: "Queues are one component. The call centre solution is the whole operation around them — routing and IVR in front, agent management, supervision and live monitoring alongside, and recording, analytics and reporting behind — configured and administered together from one platform.",
      },
      {
        question: "Are calls recorded, and who can hear them?",
        answer: "Recording can be automatic, manual or on demand, with storage management, backup and secure access. Role-based access control determines who can play back, download or share a recording, and recordings can be transferred to an FTP or SFTP server based on your preference.",
      },
      {
        question: "Will it work with our CRM?",
        answer: "CRM integration and API integration support are part of the platform, so calling activity can connect to the systems your agents already work in. We confirm which integrations apply to your environment as part of the design.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Fewer calls lost to a busy hour, supervisors who can see and coach the floor as it works rather than after the fact, and a complete record — recorded, analysed and reported — of what your operation is actually doing.",
    },
  },
  {
    slug: "predictive-dialer",
    title: "Predictive Dialer",
    category: "Contact Center",
    categorySlug: "contact-center",
    tagline: "Turn more calling time into conversations.",
    intro:
      "SipLink Predictive Dialer helps sales and outbound teams increase productivity by automating the repetitive process of dialling, so agents spend their time talking rather than waiting.",
    icon: PhoneOutgoing,
    features: [
      {
        title: "Automated dialling",
        description:
          "The system paces outbound calls against agent availability.",
        icon: PhoneOutgoing,
      },
      {
        title: "Campaign management",
        description: "Organise, run and measure outbound calling campaigns.",
        icon: Workflow,
      },
      {
        title: "Outcome tracking",
        description: "Record dispositions and results against each contact.",
        icon: ListOrdered,
      },
      {
        title: "Performance reporting",
        description: "Measure campaign effectiveness and agent talk time.",
        icon: Gauge,
      },
          {
        title: "Blended inbound and outbound",
        description:
          "The same agents can take queue calls and campaign calls, with the dialling pacing adjusting as they move between the two.",
        icon: ArrowLeftRight,
      },
      {
        title: "Supervisor monitoring",
        description:
          "Live monitoring with listen-in, whisper and barge-in where licensed, plus real-time agent status and wallboards.",
        icon: Headset,
      },
      {
        title: "Call recording",
        description:
          "Automatic, manual and on-demand recording of campaign calls, with secure access, playback and search.",
        icon: FileAudio,
      },
      {
        title: "CRM integration",
        description:
          "API-based integration with CRM and business applications, so campaign activity is logged where your team already works.",
        icon: Webhook,
      },
    ],
    idealFor: [
      "Outbound sales teams",
      "Collections",
      "Campaign-driven calling",
      "Lead qualification teams",
    ],
      problem: {
      heading: "Agents spend their day waiting",
      body: "Manual dialling puts your agents through unanswered rings, busy tones, disconnected numbers and voicemail greetings before anyone picks up. Every one of those attempts costs time that produces no conversation at all, and the effect compounds across a shift and across a whole team of agents.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "SipLink Predictive Dialer takes the dialling away from your agents and paces it against how many of them are free, placing outbound calls on the campaign's behalf and absorbing the attempts that never become conversations. Answered calls are connected to an available agent. Progressive, predictive and auto dialing are available where supported by deployment, so pacing can match the campaign.",
      ],
    },
    audiences: [
      {
        situation: "Your agents spend more time dialling than talking",
        fit: "The system handles the dialling and the dead attempts, so what reaches an agent is a live conversation rather than a ringing tone.",
      },
      {
        situation: "You run outbound campaigns against long contact lists",
        fit: "Lists are loaded and managed as campaigns, with outcomes recorded against each record and campaign performance reported back to you.",
      },
      {
        situation: "Your team size changes through the day",
        fit: "Pacing follows agent availability rather than a fixed rate, so the dialling adjusts as people log in, go on break or move across to inbound work.",
      },
      {
        situation: "You cannot see what your outbound team is actually doing",
        fit: "Real-time agent status, wallboards, supervisor monitoring and call disposition review give managers the same visibility outbound that they expect on inbound queues.",
      },
    ],
    explainer: {
      question: "What is a predictive dialer?",
      definition: "A predictive dialer is an outbound calling system that decides how many numbers to dial, and when, based on how many of your agents are free to talk. Instead of one agent dialling one number and waiting to see what happens, the system places calls on behalf of the campaign and absorbs the attempts that end in a busy tone, no answer or voicemail. Calls that a person actually answers are passed to an agent who is ready for them. The pacing adjusts as agents finish wrap-up and become available again, so the dialling follows the team rather than the other way round.",
      steps: [
        {
          title: "Load the contact list",
          body: "Your contact records are loaded into a campaign and managed there, with the segmentation, ordering and call outcomes you want to work against.",
        },
        {
          title: "The system paces the dialling",
          body: "Outbound calls are placed at a rate set against agent availability, and attempts that end in no answer, a busy tone or voicemail are handled without occupying an agent.",
        },
        {
          title: "Answered calls connect to a free agent",
          body: "When someone answers, the call is routed to an agent who is available, with disposition and wrap-up recorded against the contact afterwards.",
        },
      ],
    },
    specs: [
      { label: "Dialling", value: "Progressive, predictive and auto dialing, where supported by deployment" },
      { label: "Campaigns", value: "Outbound campaign management with contact lists and segments" },
      { label: "Pacing", value: "Paced against real-time agent availability" },
      { label: "Outcomes", value: "Call disposition and wrap-up support, with disposition review" },
      { label: "Monitoring", value: "Supervisor monitoring, listen-in, whisper and barge-in where licensed" },
      { label: "Reporting", value: "Campaign, agent performance and productivity reports" },
    ],
    faqs: [
      {
        question: "How much more will my agents talk?",
        answer: "We will not put a figure on it, because the figure is not a property of the dialler. How much talk time you gain depends on the quality and freshness of your contact lists, how many people answer, how long your conversations and wrap-up take, and how many agents are logged in at the time. Run a campaign and read the reporting, and you will have a number that means something for your operation rather than one from a brochure.",
      },
      {
        question: "How is this different from an auto dialer?",
        answer: "An auto dialer works through a list at a pacing you configure, which suits campaigns where getting through the volume is the point. A predictive dialer paces the dialling against how many agents are free at that moment, which suits campaigns where keeping agents in conversations is the point. Progressive, predictive and auto dialing are available where supported by deployment, so the choice is a configuration decision rather than a different product.",
      },
      {
        question: "Is outbound dialling regulated where we operate?",
        answer: "Requirements around outbound calling — consent, permitted calling hours, disclosure, record-keeping and registration — vary by jurisdiction and by industry, and they change. We cannot tell you what applies to your operation, so confirm the position for every market you call into with your own legal or compliance advisers. We will then configure campaigns and calling windows to match what you tell us is required.",
      },
      {
        question: "Can the same agents handle inbound calls too?",
        answer: "Yes. The contact-centre platform supports blended inbound and outbound calling, so agents can take queue calls as well as campaign calls. The pacing simply has fewer available agents to dial against while inbound demand is high.",
      },
      {
        question: "Are campaign calls recorded?",
        answer: "Automatic, manual and on-demand recording cover both inbound and outbound calls, with secure access, playback, search and storage management. Role-based access controls who can retrieve recordings, and transfer to an FTP or SFTP server is available based on your preference.",
      },
      {
        question: "Can it work with the CRM we already use?",
        answer: "The platform supports CRM and business-application integration through APIs, with click-to-dial, call logging and contact sync so campaign activity lands where your team already works. We confirm what integrates with your particular system as part of the design.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Your agents spend their shift in conversations rather than in the waiting between them, and you get campaign, outcome and agent reporting that shows what the outbound effort is actually producing.",
    },
  },
  {
    slug: "auto-dialer",
    title: "Auto Dialer",
    category: "Contact Center",
    categorySlug: "contact-center",
    tagline: "Automate outbound campaigns.",
    intro:
      "Run automated outbound campaigns with configurable pacing, call outcomes and campaign reporting, for teams that need volume without manual dialling.",
    icon: Radio,
    sparseSource: true,
    features: [
      {
        title: "Configurable pacing",
        description:
          "Control dialling rate to match the size and skill of the team.",
        icon: Gauge,
      },
      {
        title: "Campaign lists",
        description: "Load, segment and manage contact lists per campaign.",
        icon: ListOrdered,
      },
      {
        title: "Automated prompts",
        description:
          "Deliver recorded or generated announcements where appropriate.",
        icon: Mic,
      },
      {
        title: "Campaign reporting",
        description: "Track completion, outcomes and campaign performance.",
        icon: BarChart3,
      },
          {
        title: "Text-to-speech announcements",
        description:
          "Generate campaign messages from text where recording a prompt for every variation is impractical.",
        icon: Sparkles,
      },
      {
        title: "Disposition and wrap-up",
        description:
          "Capture the result of each attempt against its contact record as the campaign runs.",
        icon: Workflow,
      },
    ],
    idealFor: [
      "Notification campaigns",
      "Appointment reminders",
      "Outbound follow-up",
    ],
      problem: {
      heading: "The same message, dialled one number at a time",
      body: "When a reminder, notice or update has to reach a long list of customers, someone ends up working down that list by hand. Most of the day goes into ringing, engaged tones and voicemail, and by the end there is no reliable record of who was actually reached.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "You load a contact list into a campaign and it works through the list on its own, with progressive, predictive and auto dialling available where supported by your deployment, so the campaign can be paced to suit the work. Answered calls either hear an automated voice prompt or pass to an available agent.",
      ],
    },
    audiences: [
      {
        situation: "You send the same message to hundreds of customers",
        fit: "One recorded or generated announcement is delivered to the whole list, instead of being repeated by hand on every call.",
      },
      {
        situation: "You spend the morning on appointment reminders",
        fit: "The campaign places the reminders while your staff get on with the work the appointments are for.",
      },
      {
        situation: "You never know who actually got the message",
        fit: "Outcomes are recorded against each contact, so you can see what completed and what still needs following up.",
      },
      {
        situation: "You follow up leads or enquiries in batches",
        fit: "The list is dialled automatically and answered calls are connected to an available agent, so your team only joins the ones worth talking to.",
      },
    ],
    explainer: {
      question: "What is an auto dialer?",
      definition: "An auto dialer is a system that works through a list of contact numbers and places the calls for you. You supply the list, set the pace you want it dialled at, and decide what happens when someone picks up. If the campaign is informational, an automated prompt plays the message; if it needs a person, the call is handed to an available agent. Results are written back against each contact as the campaign runs, so you can see how far it has got and what came of it.",
      steps: [
        {
          title: "Load and segment the list",
          body: "Contacts are loaded into a campaign and can be segmented so different groups receive different treatment or a different message.",
        },
        {
          title: "The campaign dials at the pace you set",
          body: "Dialling runs automatically at a configured rate rather than agent by agent, with progressive, predictive and auto dialling available where supported by the deployment.",
        },
        {
          title: "Answered calls get the message or an agent",
          body: "An automated voice prompt delivers the announcement, or the call is connected to an available agent where a conversation is needed. The outcome is recorded either way.",
        },
      ],
    },
    specs: [
      { label: "Dialling", value: "Progressive, predictive and auto dialling, where supported by deployment" },
      { label: "Campaigns", value: "Outbound campaign management from the platform" },
      { label: "Lists", value: "Load, segment and manage contact lists per campaign" },
      { label: "Prompts", value: "Automated voice prompts, recorded or text-to-speech" },
      { label: "Outcomes", value: "Call disposition and wrap-up recorded against each contact" },
      { label: "Reporting", value: "Campaign completion, call detail records and analytics" },
    ],
    faqs: [
      {
        question: "How is this different from a predictive dialer?",
        answer: "The auto dialer is the simpler of the two. It works through a contact list at a pace you configure and suits campaigns where a recorded or generated announcement carries the message. The predictive dialer is built around agent pacing, for conversation-heavy outbound where the point is to keep people talking rather than to deliver a notice.",
      },
      {
        question: "Do we need agents for a campaign to run?",
        answer: "Not for an informational campaign — an automated voice prompt can deliver the message on its own. Where a conversation is needed, answered calls are connected to available agents instead, and the two approaches can be used for different campaigns.",
      },
      {
        question: "What are the rules on outbound dialling where we operate?",
        answer: "Requirements around outbound calling, consent and permitted calling hours vary by jurisdiction and by the kind of campaign you are running. We cannot advise on what applies to you — please confirm the obligations for your operation with your own legal or compliance advisers, and we will configure the campaign around what you tell us.",
      },
      {
        question: "Can we tell who was reached and who was not?",
        answer: "Yes. Call disposition and wrap-up are recorded against each contact, and campaign reporting covers completion and outcomes. That gives you a list of who still needs following up rather than an estimate.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "A list that gets worked through reliably instead of partially, and a record of what each call produced — so notices and reminders reach people without occupying a team for the day.",
    },
  },
  {
    slug: "ivr",
    title: "IVR System",
    category: "Contact Center",
    categorySlug: "contact-center",
    tagline: "Guide every caller to the right destination.",
    intro:
      "SipLink IVR System creates a professional and structured experience from the moment a customer calls, letting them select the department or service they need from customised voice menus.",
    icon: ListOrdered,
    features: [
      {
        title: "Multi-level menus",
        description: "Nested menus that narrow down what the caller needs.",
        icon: Layers,
      },
      {
        title: "Custom greetings",
        description:
          "Professional voice prompts and announcements in your own wording.",
        icon: Mic,
      },
      {
        title: "Multilingual IVR",
        description: "Serve callers in more than one language where supported.",
        icon: Globe,
      },
      {
        title: "Time-based flows",
        description:
          "Separate routing for business hours, holidays and after-hours.",
        icon: Clock,
      },
      {
        title: "Department routing",
        description:
          "Direct callers to Sales, Support, Billing or any team you define.",
        icon: GitBranch,
      },
      {
        title: "Works with queues",
        description:
          "Hand callers from the menu straight into the right queue.",
        icon: Users,
      },
          {
        title: "DID-based routing",
        description:
          "Give each published number its own greeting, menu and routing plan rather than sharing one flow.",
        icon: PhoneIncoming,
      },
      {
        title: "Caller-ID-based routing",
        description:
          "Route a call on the number it came from, so known callers can skip the menu entirely.",
        icon: PhoneForwarded,
      },
      {
        title: "Priority and failover routing",
        description:
          "Promote calls that matter and define where they go when the first destination cannot take them.",
        icon: ArrowLeftRight,
      },
      {
        title: "Call screening",
        description:
          "Check who is calling before the call is put through, so unwanted calls do not reach your teams.",
        icon: ShieldCheck,
      },
    ],
    idealFor: [
      "Any business wanting fewer transfers",
      "Multi-department organisations",
      "Teams with distinct business hours",
    ],
      problem: {
      heading: "Every wrong transfer costs patience",
      body: "Most businesses hand every caller the same experience: one number, one ringing phone, and whoever picks it up works out where the call should have gone. Reception transfers callers by hand, those callers explain themselves twice, and outside business hours the call simply rings out.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "An IVR answers immediately with your own greeting and a menu you define, then routes on what the caller chooses, with multi-level menus narrowing a broad first choice into the specific team. Calls can also be directed by the number dialled or by department, and time-based rules give separate after-hours flows.",
      ],
    },
    audiences: [
      {
        situation: "Every call comes through one number",
        fit: "A menu sorts callers at the front door instead of leaving it to whoever answers. Sales, support and billing each get their own path from the first seconds of the call.",
      },
      {
        situation: "Your receptionist spends the day transferring calls",
        fit: "Routine routing moves into the IVR, so the people on the phone handle the calls that genuinely need a person rather than acting as a switchboard.",
      },
      {
        situation: "Calls arrive outside your opening hours",
        fit: "Business hours, holiday and after-hours flows each get their own treatment, so late callers hear something useful rather than an unanswered ring.",
      },
      {
        situation: "You publish different numbers for different things",
        fit: "DID-based routing lets each number carry its own greeting and menu, so a campaign line, a branch line and the main number do not all land in the same place.",
      },
    ],
    explainer: {
      question: "What is an IVR?",
      definition: "IVR stands for Interactive Voice Response. It is the automated system that answers an incoming call, plays a recorded greeting and menu, and then acts on what the caller does next — usually a keypad selection. Rather than every call ringing the same handset, the IVR makes the routing decision in the first seconds and sends the caller to the department, extension or queue that matches their choice. It is sometimes called an auto attendant, because it does the job a receptionist would do when directing a call.",
      steps: [
        {
          title: "The caller hears your greeting and menu",
          body: "The call is answered straight away with your own recorded voice prompt and the options you have defined, in the wording and — where supported — the language you choose.",
        },
        {
          title: "They choose, or the call identifies itself",
          body: "The caller makes a keypad selection, which can lead into a further menu level. Calls can also be routed without a selection at all, based on the number dialled or the caller's own number.",
        },
        {
          title: "Your rules send them to the right destination",
          body: "The selection is matched against your routing plan — department, extension, queue or an alternative destination — with time-based and holiday rules deciding which flow applies at that moment.",
        },
      ],
    },
    specs: [
      { label: "Menus", value: "Multi-level IVR and auto attendant with custom call flows" },
      { label: "Routing", value: "Department, extension, DID-based and caller-ID-based" },
      { label: "Scheduling", value: "Time-based, business hours, holiday and lunch or break routing" },
      { label: "Prompts", value: "Custom voice prompts, greetings and announcements" },
      { label: "Languages", value: "Multilingual IVR, where supported" },
      { label: "Failover", value: "Priority routing, failover routing and multiple routing plans" },
    ],
    faqs: [
      {
        question: "Can callers still reach a human?",
        answer: "Yes. A menu option can go straight to reception, a named extension or a team queue, and you can decide what happens when a caller makes no selection at all. The IVR is there to shorten the path to the right person, not to keep callers away from one.",
      },
      {
        question: "What happens to calls outside business hours?",
        answer: "Time-based routing gives after-hours, holiday and lunch or break periods their own call flow. That might be a different announcement, a voicemail box or an on-call destination — the rule is yours to set, and it applies automatically rather than depending on someone remembering to switch it.",
      },
      {
        question: "How many menu levels can we have?",
        answer: "The menu structure is built around your call flow rather than fixed in advance, so the depth follows how your departments and services are actually organised. In practice the useful limit is the caller's patience, and we will work through the structure with you when the flow is designed.",
      },
      {
        question: "Can different numbers have different menus?",
        answer: "Yes. DID-based routing means each number you publish can have its own greeting, menu and routing plan. A branch line, a campaign number and your main switchboard can each behave differently while running on the same system.",
      },
      {
        question: "Can we serve callers in more than one language?",
        answer: "Multilingual IVR is available where supported, so a caller can be offered a language choice or be routed to a language-specific flow. We confirm what applies to your deployment as part of the design.",
      },
      {
        question: "How does the IVR work with our call queues?",
        answer: "The IVR makes the routing decision and hands the caller over; the queue takes it from there. A caller who selects Support is placed into the Support queue, where agent availability and distribution rules decide who answers.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Callers reach the right destination in the first seconds of the call, so there are fewer unnecessary transfers, faster response times and a consistent front door to your business at any hour.",
    },
  },
  {
    slug: "call-recording",
    title: "Call Recording",
    category: "Contact Center",
    categorySlug: "contact-center",
    tagline: "Every conversation matters. Keep a record.",
    intro:
      "SipLink Call Recording securely captures and manages inbound and outbound conversations, giving businesses greater visibility and accountability over what was actually said.",
    icon: FileAudio,
    features: [
      {
        title: "Automatic recording",
        description:
          "Capture calls by rule rather than relying on agents to remember.",
        icon: FileAudio,
      },
      {
        title: "On-demand control",
        description:
          "Start and stop recording during a call where policy requires it.",
        icon: Mic,
      },
      {
        title: "Role-based access",
        description: "Control who can search, replay and download recordings.",
        icon: Lock,
      },
      {
        title: "Storage management",
        description: "Retain recordings in MP3 or WAV with managed storage.",
        icon: Boxes,
      },
      {
        title: "Search and filter",
        description:
          "Find the relevant conversation without listening through everything.",
        icon: ListOrdered,
      },
      {
        title: "Transfer to FTP/SFTP",
        description:
          "Move recordings to your own storage based on your preference.",
        icon: ArrowLeftRight,
      },
          {
        title: "Playback and sharing",
        description:
          "Replay a recording in place, download it or pass it to a colleague who needs to hear it.",
        icon: Headset,
      },
      {
        title: "Manual recording",
        description:
          "Let agents start a recording themselves when a call turns out to be one worth keeping.",
        icon: Radio,
      },
      {
        title: "Recording backup",
        description:
          "Keep backup copies of stored recordings so the record survives beyond a single system.",
        icon: Cloud,
      },
      {
        title: "Dual-channel capture",
        description:
          "Record each side of the conversation on its own track, where the deployment supports it.",
        icon: Layers,
      },
    ],
    idealFor: [
      "Quality assurance",
      "Agent training",
      "Regulated industries",
      "Dispute resolution",
    ],
      problem: {
      heading: "Memory is not a record",
      body: "When a customer disputes what was agreed, the only account of the call is what each side remembers. Managers coaching a team work from hearsay rather than from the conversation itself, and quality problems stay invisible until a complaint arrives rather than during a review.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Recording runs to your rules rather than to an agent's memory. Calls can be captured automatically, started manually, or controlled on demand during the conversation where your policy requires it. Recordings are held under managed storage, and role-based access controls decide who can search, replay and download which conversations.",
      ],
    },
    audiences: [
      {
        situation: "You are training new agents",
        fit: "Coach from the conversations that actually happened rather than from descriptions of them. Real calls give new starters something concrete to learn from.",
      },
      {
        situation: "Customers dispute what was agreed",
        fit: "Retrieve and replay the call in question instead of weighing one account against another.",
      },
      {
        situation: "You run quality reviews across a team",
        fit: "Search and filter to the calls worth reviewing, so sampling is deliberate rather than whatever happens to be remembered.",
      },
      {
        situation: "Your own systems need to hold the archive",
        fit: "Recordings can be downloaded in MP3 or WAV, or transferred to your FTP or SFTP server based on your preference.",
      },
    ],
    explainer: {
      question: "What is call recording?",
      definition: "Call recording captures the audio of business phone conversations and stores it so it can be listened to again later. Calls can be recorded automatically by rule, started manually by the person on the call, or controlled on demand while the conversation is in progress. The resulting files are held under managed storage, where role-based access decides who is allowed to reach them. Authorised people can then search for a particular conversation, replay it, download it in MP3 or WAV, or share it with a colleague. It turns a conversation that would otherwise exist only in memory into something your organisation can review.",
      steps: [
        {
          title: "Recording starts on your rules",
          body: "Inbound and outbound calls are captured automatically where you have set them to be, or started manually and controlled on demand during the call, with dual-channel recording where supported.",
        },
        {
          title: "Recordings are stored securely",
          body: "Files are kept under managed storage with secure access and can be backed up, while role-based access controls determine who is permitted to reach them.",
        },
        {
          title: "Authorised people find and use them",
          body: "Search and filtering locate the conversation you need, and it can then be played back, downloaded or shared — or transferred to your own FTP or SFTP server.",
        },
      ],
    },
    specs: [
      { label: "Capture", value: "Automatic, manual and on-demand, inbound and outbound" },
      { label: "Channels", value: "Dual-channel recording, where supported" },
      { label: "Formats", value: "MP3 and WAV for storage and download" },
      { label: "Access", value: "Secure recording access with role-based controls" },
      { label: "Search", value: "Search and filtering across stored recordings" },
      { label: "Export", value: "Download, sharing and transfer to FTP or SFTP" },
    ],
    faqs: [
      {
        question: "Are we allowed to record calls?",
        answer: "Recording requirements — including consent, notification and data protection obligations — vary by jurisdiction and by the kind of business you run, so they should be confirmed for your own operation before you record. What we can tell you is what the platform gives you to work with: role-based access controls and secure recording access so you can enforce the policy you settle on.",
      },
      {
        question: "Who can listen to a recording?",
        answer: "Only the people you authorise. Role-based access controls determine who can search, replay and download recordings, so a team leader reviewing their own agents does not need the same reach as an administrator.",
      },
      {
        question: "Can we record only some calls rather than all of them?",
        answer: "Yes. Recording can run automatically against the rules you set, be started manually, or be controlled on demand during a call where your policy requires it. Inbound and outbound calls can be treated differently.",
      },
      {
        question: "How long are recordings kept, and how much storage do we get?",
        answer: "Storage limits and retention are set with you rather than fixed in advance, so we would rather size them against your actual call volumes and the policy you need to meet than quote a figure that does not fit. Tell us how you expect to use recordings and we will confirm the arrangement before anything is set up.",
      },
      {
        question: "Can we export recordings to our own systems?",
        answer: "Recordings can be downloaded in MP3 or WAV and shared with colleagues, and can be transferred to an FTP or SFTP server based on your preference. That lets the long-term archive sit in your own environment if that is where your organisation wants it.",
      },
      {
        question: "How do we find one specific conversation?",
        answer: "Search and filtering narrow stored recordings down to the calls you care about, so a review does not mean listening through everything. Once located, a recording can be played back, downloaded or shared with whoever needs it.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "A reliable record of the conversations your business depends on, available to the people you authorise and no one else. Disputes, coaching and quality reviews all start from what was actually said.",
    },
  },
  {
    slug: "call-analytics",
    title: "Call Analytics",
    category: "Contact Center",
    categorySlug: "contact-center",
    tagline: "Turn call data into better decisions.",
    intro:
      "SipLink Call Analytics turns everyday calling activity into useful business insight — so you understand what is happening across your communication environment, not just how many calls were made.",
    icon: BarChart3,
    features: [
      {
        title: "Volume and trend analysis",
        description: "Understand call volumes and how they move over time.",
        icon: BarChart3,
      },
      {
        title: "Missed-call reporting",
        description: "See what you are not answering, and when.",
        icon: PhoneIncoming,
      },
      {
        title: "Agent reporting",
        description: "Activity, talk time and performance per agent.",
        icon: Users,
      },
      {
        title: "Queue reporting",
        description: "Wait times, abandonment and service levels per queue.",
        icon: Timer,
      },
      {
        title: "Real-time monitoring",
        description: "Live visibility into what is happening right now.",
        icon: Activity,
      },
      {
        title: "Exportable reports",
        description: "Download in Excel or CSV for wider reporting.",
        icon: Layers,
      },
          {
        title: "Call detail records",
        description:
          "A complete record of every inbound and outbound call, generated automatically as calls happen.",
        icon: ListOrdered,
      },
      {
        title: "Extension reporting",
        description:
          "Call activity broken down by extension, so you can see how individual lines and desks are used.",
        icon: Phone,
      },
      {
        title: "Historical performance analytics",
        description:
          "Compare the same measures across weeks and months to see whether service is improving or slipping.",
        icon: Gauge,
      },
      {
        title: "Call duration analysis",
        description:
          "Understand how long conversations take across teams, queues and times of day.",
        icon: Clock,
      },
    ],
    idealFor: [
      "Managers tracking performance",
      "Staffing and capacity decisions",
      "Service-level monitoring",
    ],
      problem: {
      heading: "You know how many calls you took, not what happened",
      body: "Most phone systems will tell you a number of calls and stop there. That leaves the questions managers actually need answered — when demand peaks, how many callers gave up waiting, which agents are carrying the load — to be settled by instinct rather than by evidence.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Every call through your SipLink environment leaves a call detail record — who called, which number or queue it arrived on, when, for how long, and how it ended. Nothing needs to be logged by hand. Those records feed the volume, agent and queue reports in the web portal, alongside real-time call monitoring.",
      ],
    },
    audiences: [
      {
        situation: "You are guessing when your busy hours are",
        fit: "Call volume and duration analytics show when demand actually arrives across the day and the week, so cover is planned against the pattern rather than a hunch.",
      },
      {
        situation: "You suspect you are missing calls but cannot prove it",
        fit: "Missed-call reports show how many callers did not get through and when it happened, turning a suspicion into something you can act on.",
      },
      {
        situation: "You review agent performance without much to go on",
        fit: "Agent and extension reports give activity, talk time and handling volume per person, so reviews start from what happened rather than from impressions.",
      },
      {
        situation: "You need to show someone else how the phones are performing",
        fit: "Reports are viewed in the web portal and exported in Excel or CSV, so the figures fit straight into the reporting your organisation already produces.",
      },
    ],
    explainer: {
      question: "What is call analytics?",
      definition: "Call analytics is the reporting layer over your phone system. Every call your business makes or receives leaves a call detail record, and call analytics collects those records and turns them into readable reports — volumes, answered and missed calls, call duration, activity by agent, extension and queue. It describes the pattern across many calls rather than the content of any single one: what was said inside a conversation is the job of call recording and transcription, not analytics. The value is in what the pattern tells you about staffing, routing and service, and in being able to see that pattern change over time.",
      steps: [
        {
          title: "Every call leaves a record",
          body: "Inbound and outbound calls generate call detail records automatically as they happen, capturing the number, the destination, the time, the duration and the outcome.",
        },
        {
          title: "Records become reports",
          body: "Those records are aggregated into advanced call reports, extension reports, agent reports and queue reports, alongside call duration and volume analytics and missed-call reports.",
        },
        {
          title: "You act on what the pattern shows",
          body: "Managers use the reports to identify busy periods, evaluate agent performance, understand customer calling patterns and decide where routing, cover or service needs to change.",
        },
      ],
    },
    specs: [
      { label: "Records", value: "Call detail records for inbound and outbound calls" },
      { label: "Reports", value: "Advanced call, extension, agent and queue reports" },
      { label: "Analytics", value: "Call duration and volume analytics, missed-call reports" },
      { label: "Monitoring", value: "Real-time call monitoring of live activity" },
      { label: "Trends", value: "Historical performance analytics over time" },
      { label: "Export", value: "Viewed in the web portal, downloaded in Excel or CSV" },
    ],
    faqs: [
      {
        question: "What reports are included?",
        answer: "Call detail records sit underneath advanced call reports, extension reports, agent reports and queue reports, together with call duration and volume analytics and missed-call reports. Real-time call monitoring covers live activity, and historical performance analytics show how those measures move over time.",
      },
      {
        question: "Can we export the data into our own reporting?",
        answer: "Yes. Reports are viewed through the web portal and can be downloaded in Excel or CSV, so the figures can be combined with whatever reporting your organisation already runs. Exportable reports are part of the standard reporting set rather than an add-on.",
      },
      {
        question: "How long is call data kept?",
        answer: "Retention depends on your deployment and on the record-keeping rules your organisation works to, so we set it with you rather than apply a fixed period. Tell us what your compliance and reporting requirements are and we will confirm what applies to your environment.",
      },
      {
        question: "Does this tell us what was said on the call?",
        answer: "No — analytics describes the pattern across calls, not the content of a conversation. For what was said, call recording keeps the audio, while call transcription, call summaries and AI-assisted call analysis are available where enabled; our AI Voice Assistant page covers that side.",
      },
      {
        question: "How is this different from call recording?",
        answer: "Call recording is about an individual conversation — replaying a specific call for quality, training or a dispute. Call analytics is about everything around it: how many calls, from where, at what time, answered by whom and for how long. Most teams use the two together.",
      },
      {
        question: "Can we see what is happening right now, not just after the fact?",
        answer: "Yes. Real-time call monitoring gives supervisors live visibility into current call activity, so a queue backing up can be handled while it is happening. Historical performance analytics then cover the longer view once the day is done.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "A clear view of how your organisation actually communicates — busy periods, missed calls, agent activity and trends over time — so staffing, routing and service decisions are made from evidence rather than instinct.",
    },
  },

  // ------------------------------------------------------------------ API
  {
    slug: "voice-api",
    title: "Voice API",
    category: "Communication APIs",
    categorySlug: "communication-apis",
    tagline: "Bring voice calling directly into your applications.",
    intro:
      "SipLink Voice API lets businesses and developers integrate voice calling directly into websites, applications, CRM platforms and business workflows, without building telephony infrastructure from scratch.",
    icon: PhoneCall,
    features: [
      {
        title: "Programmatic calling",
        description: "Place and receive calls from your own application code.",
        icon: Code2,
      },
      {
        title: "Call control",
        description:
          "Manage voice interactions and call flow programmatically.",
        icon: Workflow,
      },
      {
        title: "Agent connection",
        description:
          "Connect customers to the right agent from within your product.",
        icon: Users,
      },
      {
        title: "Webhooks",
        description: "Subscribe to call events and drive your own workflows.",
        icon: Webhook,
      },
          {
        title: "Click-to-dial",
        description:
          "Place a call straight from a record in your application, without anyone retyping a number.",
        icon: PhoneOutgoing,
      },
      {
        title: "Screen-pop",
        description:
          "Surface caller information in your own interface as an inbound call arrives.",
        icon: MonitorSmartphone,
      },
      {
        title: "Call activity logging",
        description:
          "Write call records back into your CRM or business system automatically.",
        icon: Activity,
      },
      {
        title: "Custom workflow integration",
        description:
          "Trigger calling from your own business events and keep contacts synchronised across systems.",
        icon: GitBranch,
      },
    ],
    idealFor: [
      "CRM platforms",
      "SaaS applications",
      "Customer support systems",
      "Sales applications",
      "Automated calling",
    ],
      problem: {
      heading: "Telephony is a lot to build yourself",
      body: "Adding calling to your own product sounds like a feature, but underneath it is an industry. Before your application places its first call you would need carrier relationships, number ranges, signalling, media handling and the reliability engineering that keeps it standing up — specialist work in another domain.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Your application asks SipLink to place or receive a call, and SipLink does it on the voice network we already operate. The carrier relationships, routing and number ranges sit on our side of the line, so your developers work with calling as a capability rather than infrastructure they run. The integration specifics are confirmed with you during onboarding.",
      ],
    },
    audiences: [
      {
        situation: "Your CRM cannot place calls",
        fit: "Calling becomes part of the record your team is already looking at, with click-to-dial, caller information on screen and call activity logged automatically.",
      },
      {
        situation: "You are building a SaaS product that needs to call people",
        fit: "Add business calling as a feature of your platform without taking on a telephony stack, carrier relationships or the engineering that keeps them running.",
      },
      {
        situation: "Your support or sales team dials manually from a screen",
        fit: "Your application places the call instead, connects the customer with an available agent, and records the outcome without anyone retyping a number.",
      },
      {
        situation: "You need calls triggered by something happening in your system",
        fit: "Automated and event-driven calling workflows — notifications, follow-ups, reminders — are initiated by your own code when the business event occurs.",
      },
    ],
    explainer: {
      question: "What is a voice API?",
      definition: "A voice API is a way for your own software to make and answer phone calls. Rather than a person picking up a handset and dialling, your application sends an instruction and the call happens on a real voice network. It works the other way too: when someone calls in, your application is told about it and can decide what should happen next. The practical effect is that calling stops being a separate system your staff switch into and becomes part of the product they already use. The telephony itself — the carriers, the numbers, the network — is operated by SipLink rather than by you.",
      steps: [
        {
          title: "Your application makes a request",
          body: "Your code asks SipLink to place a call, or to handle one coming in — triggered by a user clicking a contact, or by an event in your own business workflow.",
        },
        {
          title: "SipLink places the call on the voice network",
          body: "The call is carried over the voice infrastructure we operate, using our carrier connectivity and number ranges, and connected to the person or agent it is meant to reach.",
        },
        {
          title: "Your application is told what happened",
          body: "Call events are reported back so your system knows the outcome and can act on it — logging the activity, updating a record or moving the workflow forward.",
        },
      ],
    },
    specs: [
      { label: "Interface", value: "REST API over an open API integration model" },
      { label: "Calling", value: "Initiate outbound calls and handle inbound calls programmatically" },
      { label: "Events", value: "Webhooks for event-driven calling workflows" },
      { label: "Workflows", value: "Click-to-dial, screen-pop and automated calling sequences" },
      { label: "Logging", value: "Call activity written back to your own system" },
      { label: "Onboarding", value: "Integration details and access confirmed with your developers" },
    ],
    faqs: [
      {
        question: "How is this different from the SIP API?",
        answer: "The Voice API is for placing and receiving calls from your own application — you ask for a call, and it happens. The SIP API works at the level of SIP infrastructure itself, for organisations integrating applications with existing SIP or PBX environments and wanting more control over the voice architecture. If you are adding calling to a product, the Voice API is usually the right starting point.",
      },
      {
        question: "Where is the documentation, and how do we get started?",
        answer: "Developer documentation and access are provided as part of onboarding, so your team gets material matched to the deployment you are actually using rather than a generic reference. Tell us what you are building and we will set your developers up with what they need.",
      },
      {
        question: "Our developers want the authentication details and usage limits before we commit.",
        answer: "Those are confirmed with your team during onboarding, alongside the rest of the integration detail, because they depend on the deployment being provisioned for you. We would rather give your developers accurate answers for your environment than published figures that may not apply to it.",
      },
      {
        question: "Do we need our own phone numbers or carrier contracts?",
        answer: "No. The carrier connectivity and number ranges are operated by SipLink, so your application works with calling as a capability rather than as something you procure separately. Existing business numbers can be brought across where they are eligible, which we review with you.",
      },
      {
        question: "Can we log calls back into our CRM?",
        answer: "Yes. Call activity logging, click-to-dial and caller information screen-pop are standard integration workflows, and call events can be pushed to your systems through webhooks where available. The supported CRM integrations for your platform are confirmed during onboarding.",
      },
      {
        question: "Does using the API mean replacing our phone system?",
        answer: "No. The Voice API adds calling to your application; it does not require you to change how your staff use their phones. Many organisations run both, with the API handling the calling their software initiates.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Calling inside your own product, initiated and logged by your own code, without your team taking on carrier relationships or the telephony infrastructure underneath them.",
    },
  },
  {
    slug: "sms-api",
    title: "SMS API",
    category: "Communication APIs",
    categorySlug: "communication-apis",
    tagline: "Connect with customers through programmable messaging.",
    intro:
      "SipLink SMS API integrates SMS communication directly into your applications and workflows, so notifications and updates are sent by your systems rather than by hand.",
    icon: MessagesSquare,
    features: [
      {
        title: "Programmable send",
        description: "Trigger messages from application events and workflows.",
        icon: Code2,
      },
      {
        title: "OTP and verification",
        description: "Deliver one-time passcodes and verification messages.",
        icon: ShieldCheck,
      },
      {
        title: "Transactional messaging",
        description: "Confirmations, reminders and status updates at volume.",
        icon: MessageCircle,
      },
      {
        title: "Delivery reporting",
        description: "Track what was sent and what arrived.",
        icon: BarChart3,
      },
          {
        title: "Event-driven sending",
        description:
          "Trigger messages from what happens in your own systems, so a confirmation or alert goes out at the moment of the event rather than when somebody next has time.",
        icon: Workflow,
      },
      {
        title: "Webhooks for message events",
        description:
          "Push message events back into your application so your own workflows can react to what happened, instead of polling for updates.",
        icon: Webhook,
      },
      {
        title: "Reaches any mobile number",
        description:
          "Messages land on an ordinary handset without the customer installing an application or creating an account anywhere first.",
        icon: Smartphone,
      },
      {
        title: "Works with your existing platforms",
        description:
          "Integrate messaging into the CRM and business applications your teams already use, so customer communication stays with the rest of the record.",
        icon: Boxes,
      },
    ],
    idealFor: [
      "OTP and verification",
      "Alerts",
      "Appointment reminders",
      "Transactional messages",
      "Customer notifications",
    ],
      problem: {
      heading: "Messages sent by hand arrive late, or not at all",
      body: "When a booking moves, an order ships or a passcode is needed, somebody has to notice and then type the message out. So messages go out in batches at the end of the day rather than when they matter, and on a busy day some never go out at all.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Your application asks SipLink to send the message, so the system that knows something has changed is the thing that tells the customer. Notifications, reminders, verification messages and status updates are triggered by business events rather than by somebody remembering. The message goes out at the same moment the order is confirmed or the appointment is rescheduled.",
      ],
    },
    audiences: [
      {
        situation: "You need to verify that a phone number belongs to the person using it",
        fit: "One-time passcodes and verification messages are sent from your sign-up or login flow the instant they are requested. Because SMS works on any mobile number, the customer does not need an account on another platform first.",
      },
      {
        situation: "Something has gone wrong and people need to know now",
        fit: "Service alerts, outage notices and operational warnings are triggered directly by the system that detected the problem, so the notice does not wait for a person to write it.",
      },
      {
        situation: "Your customers miss appointments they booked weeks ago",
        fit: "Reminders are scheduled from your booking system and sent ahead of the appointment, with the message and its outcome recorded against the booking.",
      },
      {
        situation: "Your staff spend the day typing confirmations and updates",
        fit: "Transactional messages and customer notifications — orders, deliveries, payments, status changes — are generated by the application that already holds the information, freeing the team for work that needs a person.",
      },
    ],
    explainer: {
      question: "What is an SMS API?",
      definition: "An SMS API is a way for your own software to send text messages without a person doing it. Instead of someone opening a phone or a messaging tool and typing, your application makes a request to SipLink describing the message and who it is for, and SipLink handles getting it to the mobile network. Because the request comes from your software, the message can be tied to something that has actually happened in your business — an order confirmed, a passcode requested, an appointment approaching. Text messages arrive on any mobile phone without the recipient installing an application or creating an account, which is why SMS is often chosen for things that simply have to reach the customer. The result is messaging that behaves like part of your system rather than a separate manual task.",
      steps: [
        {
          title: "Something happens in your system",
          body: "A customer requests a passcode, an order changes status, an appointment is booked or a threshold is crossed. Your application already knows about it, because it is the system the event happened in.",
        },
        {
          title: "Your application asks SipLink to send the message",
          body: "The application calls the SipLink messaging API with the message and its recipient. No member of staff is involved, so the request happens at the moment of the event rather than whenever someone next has time.",
        },
        {
          title: "The message reaches the customer and the outcome is recorded",
          body: "SipLink passes the message to the mobile network for delivery to the handset, and the send and its result are recorded so your team can see what was sent and what happened to it.",
        },
      ],
    },
    specs: [
      { label: "Interface", value: "REST API and open API integration" },
      { label: "Messaging", value: "Notifications, alerts, reminders, verification and transactional messages" },
      { label: "Triggers", value: "Sent from business events in your own application code" },
      { label: "Events", value: "Webhooks for event-driven workflows" },
      { label: "Integration", value: "Existing platforms, CRM and custom business workflows" },
      { label: "Onboarding", value: "Destination requirements and setup confirmed with you before launch" },
    ],
    faqs: [
      {
        question: "When should I use SMS rather than WhatsApp?",
        answer: "SMS reaches any mobile number without the customer installing an application or holding an account anywhere, which makes it the safer choice for one-time passcodes, service alerts and reminders that have to arrive. WhatsApp is the better fit for richer, two-way conversations with customers who already use it day to day. Plenty of organisations run both, and they can sit behind the same messaging workflows.",
      },
      {
        question: "What are your delivery rates, throughput and country coverage?",
        answer: "These depend on the destinations you are sending to and the arrangements that apply there, so we confirm them against your requirements rather than publishing a single figure. Tell us where your customers are and what volume and timing you expect, and we will go through it with you before anything is committed.",
      },
      {
        question: "Do we need to register a sender or meet any requirements before sending?",
        answer: "Business messaging requirements vary by destination and by the kind of messages you are sending, and they change over time. We confirm what applies to your case as part of onboarding rather than assuming it, so you know what is needed before you go live.",
      },
      {
        question: "Do our developers have to rebuild anything to use this?",
        answer: "No. The messaging API is called from the application code and workflows you already run, so sending becomes another step in an existing process rather than a new system. We work through the integration details for your environment during onboarding.",
      },
      {
        question: "Can we tell whether a message actually arrived?",
        answer: "Sends and their outcomes are recorded, and webhooks can push message events back into your own systems so your application can react to them. That gives you a record of the communication rather than relying on staff recollection.",
      },
      {
        question: "Can messaging sit alongside the voice side of our account?",
        answer: "Yes. SMS is one of the SipLink communication APIs, alongside voice, WhatsApp, WebRTC and SIP, and the same integrations that carry call activity into your CRM can carry messaging workflows too. Customers commonly start with one channel and add others as their requirements grow.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Customers are told what they need to know at the moment it happens, on a channel that reaches any mobile phone — and your team is freed from sending those messages one at a time.",
    },
  },
  {
    slug: "whatsapp-api",
    title: "WhatsApp Business API",
    category: "Communication APIs",
    categorySlug: "communication-apis",
    tagline: "Bring business conversations to WhatsApp.",
    intro:
      "SipLink WhatsApp Business API integrates WhatsApp into your applications, support workflows and business processes, so you can meet customers on a platform they already use every day.",
    icon: MessageCircle,
    features: [
      {
        title: "Business messaging",
        description: "Two-way conversations with customers on WhatsApp.",
        icon: MessageCircle,
      },
      {
        title: "Notifications and updates",
        description: "Order updates, reminders and business notifications.",
        icon: MessagesSquare,
      },
      {
        title: "Support workflows",
        description:
          "Handle support conversations alongside your other channels.",
        icon: Headset,
      },
      {
        title: "System integration",
        description:
          "Connect WhatsApp to the platforms your teams already use.",
        icon: Boxes,
      },
          {
        title: "Centralised message inbox",
        description:
          "WhatsApp conversations arrive alongside SMS, live chat and social messaging in one place, rather than a separate tool per channel.",
        icon: MessagesSquare,
      },
      {
        title: "Chat assignment",
        description:
          "Route each conversation to the agent or team that owns it, so threads have someone accountable rather than sitting unclaimed.",
        icon: Users,
      },
      {
        title: "Customer conversation history",
        description:
          "Past exchanges stay with the customer, so whoever picks up the thread next can see what was already discussed.",
        icon: Clock,
      },
      {
        title: "Chat-to-call workflows",
        description:
          "Move a conversation between messaging and voice where these workflows are integrated, instead of starting over on another channel.",
        icon: PhoneCall,
      },
    ],
    idealFor: [
      "Customer support",
      "Notifications",
      "Order updates",
      "Appointment reminders",
      "Sales engagement",
    ],
      problem: {
      heading: "Customers message you where nobody is watching",
      body: "WhatsApp is already open on your customers' phones, so that is where they ask about an order, chase a delivery or raise a problem. In most businesses those conversations land on a staff member's personal handset and stay there, so the next person to pick up the thread has no record of what was promised.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "We connect WhatsApp to your applications and support workflows through the WhatsApp Business API, so messaging stops being something an individual handles on a personal phone. Incoming messages land in a centralised inbox alongside your other messaging channels, and chat assignment routes each conversation to the person or team who should own it.",
      ],
    },
    audiences: [
      {
        situation: "Your support team is already fielding questions on WhatsApp",
        fit: "Bring those conversations into a centralised inbox with chat assignment, so support threads are owned and answerable rather than sitting on someone's personal phone.",
      },
      {
        situation: "You send order updates and customers reply to them",
        fit: "Order updates and notifications go out from the systems that already hold the order. The replies they prompt come back into the same inbox instead of nowhere.",
      },
      {
        situation: "You remind customers about appointments and bookings",
        fit: "Reminders reach people on an app they check through the day, and a customer who needs to rebook can simply answer the message rather than phoning in.",
      },
      {
        situation: "Your sales conversations run over days, not minutes",
        fit: "Sales engagement stays in one continuing thread with the conversation history attached, so a colleague can pick it up without losing what has already been discussed.",
      },
    ],
    explainer: {
      question: "What is the WhatsApp Business API?",
      definition: "The WhatsApp Business API is the programmatic, business-grade way for an organisation to send and receive WhatsApp messages. It is not the consumer WhatsApp app, and there is no single handset holding the conversations. Instead your own applications, support desk and business systems connect to the channel directly, so messages can be sent automatically and incoming conversations can be routed to whoever should handle them. Because WhatsApp is an external messaging platform, how the channel may be used is governed by the platform's own requirements rather than by SipLink, and those requirements are confirmed with you as part of onboarding.",
      steps: [
        {
          title: "Your business systems connect to the channel",
          body: "SipLink integrates WhatsApp with the applications and workflows you already run, so messages can be sent and received programmatically rather than typed out by hand.",
        },
        {
          title: "Conversations arrive in one inbox",
          body: "Incoming WhatsApp messages land in a centralised message inbox alongside your other messaging channels, and chat assignment gives each conversation an owner.",
        },
        {
          title: "The thread and its history stay together",
          body: "Customer conversation history follows the customer, so the next person to reply sees what was said before and the thread continues instead of restarting.",
        },
      ],
    },
    specs: [
      { label: "Channel", value: "WhatsApp integration as part of omnichannel customer messaging" },
      { label: "Inbox", value: "Centralised message inbox shared with SMS, live chat and social messaging where supported" },
      { label: "Assignment", value: "Chat assignment to the agent or team that owns the conversation" },
      { label: "History", value: "Customer conversation history retained across the thread" },
      { label: "Integration", value: "Messaging APIs into your applications, support workflows and business processes" },
      { label: "Voice", value: "Call-to-chat and chat-to-call workflows where integrated" },
    ],
    faqs: [
      {
        question: "When should I use WhatsApp rather than SMS?",
        answer: "Use WhatsApp when the exchange is a conversation — a support thread, a sales discussion or an order query the customer will reply to and return to over days. Use SMS when you need to reach anyone with a mobile number and no app involved, such as one-way alerts and verification messages. Most businesses run both, and both arrive in the same centralised inbox.",
      },
      {
        question: "Can several agents handle the same WhatsApp number?",
        answer: "Yes. Conversations arrive in a centralised message inbox rather than on one person's device, and chat assignment routes each thread to the agent or team responsible for it. Because customer conversation history is retained, whoever takes an assigned thread can see what has already been discussed.",
      },
      {
        question: "What does it cost, and what are the messaging rules?",
        answer: "WhatsApp is an external platform with its own commercial and messaging requirements, and those are governed by the platform rather than set by SipLink. We confirm what applies to your use case, along with SipLink's own commercial terms, as part of onboarding. Tell us how you intend to use the channel and we will go through it with you.",
      },
      {
        question: "Do we have to replace our existing support tools?",
        answer: "No. The WhatsApp channel is integrated into the applications, support workflows and business processes you already run, using messaging APIs. The aim is for WhatsApp to become another channel your teams work in, not another system they have to open.",
      },
      {
        question: "Can we send notifications automatically from our own systems?",
        answer: "Yes. Messaging APIs let your applications trigger business updates, order updates, reminders and notifications from events that already happen in your systems, so nobody sends them one at a time. Replies come back into the same inbox as a continuing conversation.",
      },
      {
        question: "What happens when a conversation needs a phone call?",
        answer: "Where those workflows are integrated, chat-to-call and call-to-chat let a conversation move between messaging and voice rather than starting again on another channel. We confirm what applies to your environment as part of the design.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Customer conversations happen on the app your customers already use every day, and they happen somewhere your organisation can see, assign and answer them — with the history intact whoever replies next.",
    },
  },
  {
    slug: "webrtc-sdk",
    title: "WebRTC SDK",
    category: "Communication APIs",
    categorySlug: "communication-apis",
    tagline: "Enable real-time calling directly in your applications.",
    intro:
      "SipLink WebRTC SDK lets developers add real-time voice communication directly into web and application environments, with nothing for customers to install.",
    icon: MonitorSmartphone,
    features: [
      {
        title: "Browser calling",
        description: "Voice calls directly in the browser with no install.",
        icon: MonitorSmartphone,
      },
      {
        title: "Click-to-call",
        description:
          "Turn any number or contact into a one-click conversation.",
        icon: PhoneCall,
      },
      {
        title: "Embedded softphone",
        description: "Put a full calling interface inside your own product.",
        icon: Layers,
      },
      {
        title: "Support interfaces",
        description: "Build customer support calling into your web portal.",
        icon: Headset,
      },
          {
        title: "Calling in your own interface",
        description:
          "Place the calling controls where they belong in your product, rather than sending users to separate software to talk.",
        icon: Code2,
      },
      {
        title: "Context carried into the call",
        description:
          "The conversation begins from the record or screen the user was already on, so neither side starts from nothing.",
        icon: Workflow,
      },
      {
        title: "Shared voice platform",
        description:
          "Calls made this way use the same routing, queues and business numbers as the rest of your SipLink communications.",
        icon: Network,
      },
      {
        title: "Guided integration",
        description:
          "Supported platforms, integration approach and production onboarding are confirmed with your developers before you build.",
        icon: Users,
      },
    ],
    idealFor: [
      "Web applications",
      "SaaS platforms",
      "Browser-based calling",
      "Click-to-call",
      "Customer support portals",
    ],
      problem: {
      heading: "The conversation starts somewhere else",
      body: "A customer who needs to speak to you has to find a number, pick up a phone and start again from nothing. Your agents work the same way in reverse, juggling a separate softphone alongside the application they do their job in. Everything the session already knew is left behind.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "The WebRTC SDK puts the call inside the page or application your users are already in, so clicking to talk is one action rather than a change of device. Calls placed this way reach the same SipLink voice platform as the rest of your communications, so routing, queues, IVR and recording behave consistently. The specifics are confirmed during onboarding.",
      ],
    },
    audiences: [
      {
        situation: "You run a web application your customers live in",
        fit: "Calling becomes a control inside your own product rather than a number printed on a contact page. Users start a conversation without leaving the screen they were working on.",
      },
      {
        situation: "You are building a SaaS platform for other businesses",
        fit: "Your customers get calling as part of what they already pay you for, instead of buying and running a separate phone system beside it.",
      },
      {
        situation: "Your support team works in a browser-based portal all day",
        fit: "Agents answer and place calls in the same window as the ticket or the account record, so there is no second application to keep watching.",
      },
      {
        situation: "You want a click-to-call button rather than a phone number",
        fit: "Turn any contact, listing or record into a one-click conversation. The person clicking never has to copy a number anywhere.",
      },
    ],
    explainer: {
      question: "What is WebRTC?",
      definition: "WebRTC is the technology that lets a web browser or an application carry a live voice conversation on its own. Instead of dialling through a phone, or through softphone software that has to be downloaded and set up first, the audio travels through software the person already has open. For the person calling, it is a button in a page rather than a number to dial. For you, it means a conversation can begin in the exact place it became necessary, with none of the waiting and installing in between. SipLink provides the SDK that lets your developers build that into your own product.",
      steps: [
        {
          title: "Calling is built into your product",
          body: "Your developers add the SDK to the web application or portal your users already work in, and place the calling controls wherever they make sense.",
        },
        {
          title: "A user clicks instead of dialling",
          body: "A customer or an agent starts the call from the page they are on. They allow access to their microphone and talk — there is nothing to download and no number to look up.",
        },
        {
          title: "The call runs on the SipLink platform",
          body: "Audio is carried to the SipLink voice network, where your existing routing, queues and business numbers apply just as they do for calls from a desk phone.",
        },
      ],
    },
    specs: [
      { label: "Calling", value: "Real-time voice inside web and application environments" },
      { label: "Embedding", value: "Click-to-call, embedded softphone and support interfaces in your own interface" },
      { label: "Install", value: "No phone software for customers or agents to download" },
      { label: "Routing", value: "Calls use the same SipLink routing, queues and business numbers" },
      { label: "Integration", value: "Works alongside Voice API, SIP API and CRM integrations" },
      { label: "Onboarding", value: "Supported platforms and integration details confirmed with your team" },
    ],
    faqs: [
      {
        question: "Do our customers need to install anything?",
        answer: "No — that is the point of it. Voice runs in the application or page they already have open, so there is no softphone to download and no setup step before they can speak to you.",
      },
      {
        question: "Which platforms does the SDK support, and what is it written in?",
        answer: "Supported platforms and the integration details for your environment are confirmed with you during onboarding rather than stated here. Tell us what your application is built on and we will confirm exactly what applies before you commit to anything.",
      },
      {
        question: "How is this different from the Voice API?",
        answer: "The Voice API places and controls calls from your systems — your software decides a call should happen and telephony carries it out. The WebRTC SDK puts the call in front of a person inside your interface, so a customer or an agent clicks and talks in the page they are already on. Many businesses use both.",
      },
      {
        question: "Is there documentation we can read or a trial we can try first?",
        answer: "Developer resources and access are arranged through onboarding rather than self-service. Get in touch with what you are building and we will walk your team through what is available for your deployment.",
      },
      {
        question: "Can agents use this instead of a desk phone or softphone?",
        answer: "Yes. An embedded softphone inside your own application lets agents take and place calls without a second piece of software open beside their work. Desk phones and mobile apps can stay in place for the people who prefer them.",
      },
      {
        question: "Do calls made this way behave differently from our other calls?",
        answer: "Calls placed through the SDK reach the same SipLink voice platform as the rest of your communications, so routing, queues, IVR and recording apply in the same way. How your particular setup is configured is agreed as part of the design.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Conversations that start where the need appeared — inside your product, with the context intact — instead of losing people at a number they have to go and dial somewhere else.",
    },
  },
  {
    slug: "sip-api",
    title: "SIP API",
    category: "Communication APIs",
    categorySlug: "communication-apis",
    tagline: "Connect your applications to SIP-based communication.",
    intro:
      "SipLink SIP API integrates SIP-based voice communication into your applications, platforms and existing telephony environments, for organisations that need greater control over their voice architecture.",
    icon: Network,
    features: [
      {
        title: "Programmatic trunks",
        description: "Provision and manage SIP trunks from code.",
        icon: Code2,
      },
      {
        title: "SIP infrastructure control",
        description: "Direct control over signalling and routing behaviour.",
        icon: Network,
      },
      {
        title: "Workflow management",
        description: "Build custom voice communication workflows.",
        icon: Workflow,
      },
      {
        title: "Legacy integration",
        description: "Connect modern applications to existing SIP systems.",
        icon: ArrowLeftRight,
      },
          {
        title: "SIP trunk connectivity",
        description:
          "Connect your applications to SIP trunk connectivity, so the software you build works with the same voice paths your organisation already uses.",
        icon: Router,
      },
      {
        title: "Carrier routing",
        description:
          "Inbound and outbound carrier routing, including prefix-based and destination-based routing, as part of the voice architecture your applications integrate with.",
        icon: GitBranch,
      },
      {
        title: "SIP registration and endpoints",
        description:
          "SIP registration and SIP endpoint support, with compatibility for IP phones and softphones across the estate.",
        icon: MonitorSmartphone,
      },
      {
        title: "Gateway connectivity",
        description:
          "Gateway connectivity for appropriate legacy environments, so older equipment can stay in place while your applications work with the SIP layer around it.",
        icon: ServerCog,
      },
    ],
    idealFor: [
      "SIP applications",
      "Cloud telephony platforms",
      "PBX environments",
      "Communication software",
      "Enterprise integrations",
    ],
      problem: {
      heading: "Your SIP estate and your software are two separate worlds",
      body: "Most organisations run SIP infrastructure the way it was installed — configured by hand and disconnected from the applications that depend on it. The platform your teams work in cannot see a call, place one or react when one arrives, so anything needing both is done manually by a person sitting between them.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "The SIP API gives your applications a programmatic route into SIP-based voice, so voice workflows are built in code against your existing SIP infrastructure — connecting applications to trunks, endpoints and routing behaviour. Your telephony environment stays in place, with the integration details confirmed with you during onboarding.",
      ],
    },
    audiences: [
      {
        situation: "You are building an application that has to speak SIP",
        fit: "Your software integrates with SIP-based voice communication directly, instead of being held at arm's length by a layer that hides the signalling you need to work with.",
      },
      {
        situation: "You operate a cloud telephony platform of your own",
        fit: "Voice capability is connected into the platform you already run and sell, with the SIP infrastructure underneath it remaining yours to design. Routing, endpoints and trunk connectivity stay part of your architecture.",
      },
      {
        situation: "You run a PBX environment that your applications cannot reach",
        fit: "The PBX estate stays where it is while your applications gain a programmatic way to work with it. Modern software and existing SIP-based systems stop being separate worlds.",
      },
      {
        situation: "You are integrating voice across an enterprise estate",
        fit: "Communication software, custom voice solutions and business applications are connected to one SIP foundation rather than each being wired up on its own terms. Integration points are confirmed against your environment during onboarding.",
      },
    ],
    explainer: {
      question: "What is a SIP API?",
      definition: "SIP is the signalling protocol that telephone systems use to set up, manage and end voice calls — it is the conversation the systems have with each other about a call, separate from the audio itself. Most SIP infrastructure is configured and operated through its own tools, which means your own software has no way to take part. A SIP API puts a programmable interface over that signalling layer, so your applications can work with SIP-based voice communication directly from code. That is a lower-level position than a general-purpose calling API: you are integrating with the voice architecture rather than being shielded from it. It suits organisations that have already invested in SIP infrastructure and want their software to reach it.",
      steps: [
        {
          title: "Your SIP infrastructure stays as it is",
          body: "The trunks, endpoints and routing you already operate continue to run. Nothing about the voice architecture has to be rebuilt in order to become reachable from software.",
        },
        {
          title: "Your application integrates at the SIP layer",
          body: "SipLink provides the programmatic interface between your applications and SIP-based voice communication, so your own code can participate in the signalling rather than sitting outside it.",
        },
        {
          title: "Voice workflows are built in your software",
          body: "Calls, routing behaviour and communication workflows are driven from your platform, with the SIP environment underneath still designed and controlled the way you decided it should be.",
        },
      ],
    },
    specs: [
      { label: "Interface", value: "Programmatic integration with SIP-based voice communication" },
      { label: "Signalling", value: "Integration at the SIP layer rather than above it" },
      { label: "Endpoints", value: "SIP registration and SIP endpoint support" },
      { label: "Routing", value: "Inbound and outbound carrier routing, prefix and destination-based" },
      { label: "Architecture", value: "Works with your existing SIP infrastructure and PBX environment" },
      { label: "Onboarding", value: "Integration details designed and confirmed with you" },
    ],
    faqs: [
      {
        question: "How is this different from the Voice API?",
        answer: "The Voice API is the higher-level option: your application asks SipLink to place or receive a call, and the voice infrastructure underneath is ours to run. The SIP API is lower-level and architecture-facing — it is for organisations that already have SIP infrastructure and want their applications to work with it programmatically, keeping control of the voice architecture rather than handing it over. If you want calling in your product without thinking about SIP, the Voice API is the better fit.",
      },
      {
        question: "Can this work alongside our existing PBX or SBC?",
        answer: "That is the usual reason to choose it. The SIP API is designed for environments where SIP infrastructure is already in place, so your existing systems keep operating while your applications gain a programmatic way to work with them. We review what you run today and design the integration around it rather than asking you to change it first.",
      },
      {
        question: "I need the authentication method, supported codecs and the API reference — where are they?",
        answer: "Those specifics are confirmed during onboarding and designed to your deployment, because the right answer depends on the SIP infrastructure you are integrating with. We would rather give you details that apply to your environment than publish a generic set that does not. Tell us about your setup and we will go through them with you.",
      },
      {
        question: "Do we have to replace our current voice architecture?",
        answer: "No. The whole premise is that you have already made architectural decisions about SIP trunk connectivity, routing and endpoints, and want to keep them. The API is a way for your applications to reach that environment, not a reason to rebuild it.",
      },
      {
        question: "How is this different from SIP trunking?",
        answer: "SIP trunking is connectivity — it connects your telephony system to the external voice network. The SIP API is an interface for your software, so your own applications and platforms can work with SIP-based communication programmatically. Many organisations use both: the trunk carries the calls, the API lets their software take part in them.",
      },
      {
        question: "What do you need from us to get started?",
        answer: "A picture of the SIP infrastructure you run today, the applications that need to reach it and the voice workflows your business depends on. From there we design the integration and confirm the technical details with you during onboarding.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Greater control over your voice architecture, with your applications and platforms integrated into the SIP infrastructure you already run rather than working alongside it.",
    },
  },

  // ----------------------------------------------------------- enterprise
  {
    slug: "teams-calling",
    title: "Microsoft Teams Calling",
    category: "Enterprise Features",
    categorySlug: "enterprise-features",
    tagline: "Connect Microsoft Teams with your business telephony.",
    intro:
      "Many enterprises already use Microsoft Teams for internal collaboration, but employees still need to call customers, suppliers, partners and traditional telephone numbers. SipLink connects the two.",
    icon: Users,
    features: [
      {
        title: "Direct Routing",
        description:
          "Connect Teams to the external voice network through SipLink.",
        icon: ArrowLeftRight,
      },
      {
        title: "Keep existing numbers",
        description:
          "Map your current business numbers to Teams users and departments.",
        icon: Phone,
      },
      {
        title: "Inbound routing",
        description:
          "Customer calls reach the right Teams user, department or destination.",
        icon: PhoneIncoming,
      },
      {
        title: "Centralised management",
        description: "Administer business telephony from one architecture.",
        icon: ServerCog,
      },
          {
        title: "Departmental routing",
        description:
          "Calls to a departmental number reach the right group of Teams users rather than a single handset.",
        icon: GitBranch,
      },
      {
        title: "Outbound calling from Teams",
        description:
          "Authorised users call customers, suppliers and mobile numbers without leaving the application they work in.",
        icon: PhoneOutgoing,
      },
      {
        title: "Number porting",
        description:
          "Eligible existing business numbers move to SipLink and are connected to the appropriate Teams users and departments.",
        icon: ArrowLeftRight,
      },
      {
        title: "Phased enablement",
        description:
          "Turn on external calling department by department, so the separate phone system can be retired at your own pace.",
        icon: Layers,
      },
    ],
    idealFor: [
      "Organisations already invested in Microsoft Teams",
      "Enterprises consolidating communication tools",
      "Distributed workforces on Microsoft 365",
    ],
      problem: {
      heading: "Two systems for one working day",
      body: "Your employees already live in Microsoft Teams for internal collaboration, but the working day does not stop at the organisation's own walls. They still need to call customers, suppliers, partners and ordinary telephone numbers — which means two applications to keep open and two things for IT to administer.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "SipLink connects your Microsoft Teams environment to your business telephony infrastructure and manages the telephony connectivity between Teams and the external voice network. Your existing business numbers are pointed at the appropriate Teams users or departments, so inbound and outbound business calls run through the environment your people already use.",
      ],
    },
    audiences: [
      {
        situation: "Your staff live in Teams all day",
        fit: "External calls join the application they already have open, instead of pulling them into a separate phone system every time a customer needs calling.",
      },
      {
        situation: "You have invested heavily in Microsoft Teams",
        fit: "That investment extends into a complete business communication environment rather than being limited to internal collaboration.",
      },
      {
        situation: "You are trying to consolidate communication tools",
        fit: "Collaboration and external business calling sit in one place, so there are fewer overlapping applications to support and explain to employees.",
      },
      {
        situation: "Your IT team administers voice across several systems",
        fit: "Business telephony is managed through a more centralised architecture, with routing and number assignment handled in one design rather than negotiated between platforms.",
      },
    ],
    explainer: {
      question: "What is Teams calling?",
      definition: "Teams calling means using Microsoft Teams to make and receive calls to ordinary telephone numbers, not just to colleagues inside your own organisation. On its own, Teams handles internal collaboration — chat, meetings and calls between people in the same environment. To reach the outside world it needs a connection to the external voice network, and that connection is what SipLink provides and manages. Your business numbers are mapped to the right Teams users and departments, and calls travel between Teams and the public telephone network through the SipLink environment configured for your organisation. Teams integration is available where enabled, so what applies to you is confirmed against your Microsoft environment during design.",
      steps: [
        {
          title: "A customer dials your business number",
          body: "They call the same published number they have always used — a main line, a departmental number or a direct number belonging to one of your employees.",
        },
        {
          title: "SipLink routes the call into your Teams environment",
          body: "The call passes through the SipLink environment configured for your organisation, which manages the voice connectivity between the external network and Teams and applies the routing rules you have agreed.",
        },
        {
          title: "The right person answers in Teams",
          body: "The call is delivered to the appropriate Teams user, department or destination, and your employee answers in the application they already have open.",
        },
      ],
    },
    specs: [
      { label: "Connectivity", value: "Telephony connectivity between Teams and the external voice network" },
      { label: "Numbers", value: "Existing business numbers connected to Teams users and departments" },
      { label: "Routing", value: "Inbound calls delivered to the appropriate Teams user, department or destination" },
      { label: "Outbound", value: "External business calls placed from within the Teams environment" },
      { label: "Administration", value: "Business telephony managed through a more centralised architecture" },
      { label: "Enablement", value: "Available where enabled, confirmed against your Microsoft environment during design" },
    ],
    migration: {
      heading: "Connecting a Teams estate you already run",
      intro: "Most organisations do not arrive here from nothing. Teams is already in daily use for collaboration, and a separate phone system is carrying the external calls. The work is joining the two without disturbing either, so your employees notice a capability appearing rather than a system changing under them.",
      steps: [
        {
          title: "Review your Teams estate and your telephony",
          body: "We look at how your organisation uses Teams today, which departments and employees need external calling, and what is carrying those calls at the moment. Requirements on the Microsoft side depend on your own environment and are confirmed with your IT team at this stage.",
        },
        {
          title: "Connect numbers to people and departments",
          body: "Your existing business numbers are matched to the appropriate Teams users, departments and destinations, so the routing reflects how your organisation actually answers calls rather than an arbitrary structure.",
        },
        {
          title: "Port eligible numbers",
          body: "Eligible business numbers can move to SipLink, so your customers, suppliers and partners keep dialling the numbers they already know. We validate the numbers and account details and plan the migration before anything moves.",
        },
        {
          title: "Enable calling and phase it in",
          body: "External calling is enabled for authorised users, and departments can be brought across in stages rather than all at once. The separate phone system is retired once the calls it carried are landing reliably in Teams.",
        },
      ],
    },
    faqs: [
      {
        question: "What is needed on the Microsoft side?",
        answer: "That depends on how your organisation's Microsoft environment is set up and configured. We review it with your IT team and confirm what is required before anything is designed, rather than assuming a standard arrangement. Teams integration is available where enabled.",
      },
      {
        question: "Can we keep our existing phone numbers?",
        answer: "Yes. Eligible business numbers can be ported to SipLink and connected to the appropriate Teams users and departments, so customers keep reaching you on the numbers they already have. We validate the numbers and account details and plan the migration before anything moves.",
      },
      {
        question: "Do employees need a second application?",
        answer: "No. Authorised users make and receive external business calls from within the Teams environment they already use every day. That is the point of the integration — one application for internal collaboration and external calling, rather than switching between two.",
      },
      {
        question: "Does every employee need external calling?",
        answer: "No. Calling can be enabled for the users and departments that need it, and your existing business numbers are connected accordingly. Employees who only collaborate internally can carry on doing exactly that.",
      },
      {
        question: "Can we keep our existing phone system during the move?",
        answer: "Yes. Departments can be brought across in stages, so your current system keeps carrying the calls it handles today while Teams calling is enabled group by group. It is retired when you are satisfied that calls are landing where they should.",
      },
      {
        question: "Where do inbound calls to a department go?",
        answer: "Inbound calls are routed through the configured SipLink environment and delivered to the Teams user, department or destination you have specified. The routing rules are agreed during design and reflect how your organisation actually handles incoming calls.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Your employees stop switching between communication applications and get a more consistent calling experience, while your IT team manages business telephony through a more centralised architecture. The Teams environment you have already invested in becomes a complete business communication environment rather than a collaboration tool sitting beside a phone system.",
    },
  },
  {
    slug: "sbc",
    title: "Session Border Controller",
    category: "Enterprise Features",
    categorySlug: "enterprise-features",
    tagline: "Create a controlled layer around your voice infrastructure.",
    intro:
      "Enterprise voice environments get complicated when multiple SIP trunks, PBX systems, cloud platforms, contact centres and external carriers all need to communicate. The SBC gives you a control point between them.",
    icon: ShieldCheck,
    features: [
      {
        title: "Controlled edge",
        description:
          "A structured control point between internal and external voice.",
        icon: ShieldCheck,
      },
      {
        title: "SIP connection management",
        description: "Manage and monitor connections between voice platforms.",
        icon: Network,
      },
      {
        title: "Interoperability",
        description: "Help different SIP-enabled platforms work together.",
        icon: ArrowLeftRight,
      },
      {
        title: "Voice visibility",
        description: "A central point of insight into the voice environment.",
        icon: Activity,
      },
          {
        title: "IP access controls",
        description:
          "Define which addresses may connect, with IP blocking and security rules applied at the boundary.",
        icon: Lock,
      },
      {
        title: "Encrypted signalling and media",
        description:
          "TLS-encrypted SIP signalling and SRTP-encrypted media where the deployment supports them.",
        icon: ShieldCheck,
      },
      {
        title: "Tenant isolation",
        description:
          "Separate customer and department environments with role-based administration over each.",
        icon: Layers,
      },
      {
        title: "Audit and activity logging",
        description:
          "A record of configuration and activity, so changes at the voice boundary can be reviewed.",
        icon: Activity,
      },
    ],
    idealFor: [
      "Enterprises connecting PBX and cloud telephony",
      "Multi-carrier environments",
      "Organisations running Teams alongside SIP trunks",
    ],
      problem: {
      heading: "Every connection is another thing to manage",
      body: "Enterprise voice environments become complicated when multiple SIP trunks, PBX systems, cloud platforms, contact centres and external carriers all need to talk to each other. Every connection has to be configured, maintained and watched. Your IT team reasons about the voice estate one link at a time, with no single place to look.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "The SipLink SBC sits between your enterprise voice infrastructure and external SIP networks as a structured control point, managing the SIP communication passing through it. From that position it helps manage connections, support interoperability and give you greater visibility, so rules about which systems may talk to which live in one place rather than across every individual link.",
      ],
    },
    audiences: [
      {
        situation: "You are connecting a legacy PBX to cloud telephony",
        fit: "The SBC sits between the two so they can work together through a managed control point, rather than being wired directly to each other.",
      },
      {
        situation: "You run Microsoft Teams alongside SIP trunks",
        fit: "Communication between your collaboration platform and your external voice connectivity passes through one structured layer you can configure and observe.",
      },
      {
        situation: "You work with more than one carrier",
        fit: "Connections to different external SIP networks are managed from a common point, so adding or changing a carrier is a change in one place.",
      },
      {
        situation: "You cannot see how voice traffic moves across your estate",
        fit: "Putting a control point between internal and external environments gives your IT team somewhere central to look at SIP communication as it passes.",
      },
    ],
    explainer: {
      question: "What is a session border controller?",
      definition: "A session border controller is a managed layer that sits at the boundary between your internal voice systems and the outside world. Voice calls set up over SIP travel between your PBX, your cloud platforms and external carriers, and normally those systems connect straight to one another. An SBC puts a deliberate control point in the middle of those connections instead. SIP communication passes through it, is handled according to the rules your organisation has configured, and is then passed on to the right environment. Because everything crosses the same boundary, it also becomes the place you look to understand what is happening.",
      steps: [
        {
          title: "Traffic reaches the border",
          body: "SIP communication moving between your internal voice systems and external networks or platforms arrives at the SBC rather than connecting directly to one another.",
        },
        {
          title: "It is handled against your rules",
          body: "The SBC manages that communication according to how your environment is configured, including which sources may connect, supported by IP access controls and security rules.",
        },
        {
          title: "It passes to the right environment",
          body: "Communication is then passed on to the intended platform — a PBX, a cloud service, a contact-centre platform or an external carrier — with the crossing visible to your IT team.",
        },
      ],
    },
    specs: [
      { label: "Position", value: "Between your internal voice infrastructure and external SIP networks" },
      { label: "Control", value: "A structured control point for the SIP communication passing through" },
      { label: "Interoperability", value: "Helps PBX, cloud telephony, Teams, trunks and contact-centre platforms connect" },
      { label: "Visibility", value: "A central point of insight into the voice environment" },
      { label: "Access", value: "IP access controls and IP blocking or security rules" },
      { label: "Isolation", value: "Tenant isolation with role-based administration and activity logging" },
    ],
    faqs: [
      {
        question: "Do we need an SBC if we already have SIP trunking?",
        answer: "SIP trunking gives you connectivity to the external voice network; the SBC gives you a structured control point over how that and every other connection behaves. Organisations running a single straightforward trunk often do not need one, while those joining a PBX, cloud telephony, Teams and contact-centre platforms together usually want the control and visibility a border layer provides.",
      },
      {
        question: "How much traffic can it handle?",
        answer: "The SBC layer is designed around your environment — the platforms you are connecting, your busy-hour call patterns and how your estate is expected to grow. Tell us what you run today and what you plan to add, and we will size it with you rather than quote a figure that may not match your architecture.",
      },
      {
        question: "How does the SBC help with security?",
        answer: "It gives you a controlled layer with visibility and control over SIP communication between your internal and external environments, supported by IP access controls, IP blocking and security rules, tenant isolation and audit logging. TLS-encrypted SIP signalling and SRTP-encrypted media are available where the deployment supports them. It is a control point within your wider security approach rather than a guarantee against every threat, and we confirm what applies to your environment during design.",
      },
      {
        question: "Will it let our different voice platforms work together?",
        answer: "Supporting interoperability between SIP-enabled platforms is one of the main reasons the layer exists — it is where communication between a legacy PBX, cloud telephony and contact-centre systems is managed. What is achievable depends on the specific platforms involved, so we review them with you before committing to a design.",
      },
      {
        question: "Do we have to replace our existing voice systems?",
        answer: "No. The SBC is added between the environments you already run, which is what allows it to support modernisation without unnecessarily disrupting existing systems. Your PBX, trunks and platforms stay where they are; what changes is that their communication now crosses a managed boundary.",
      },
      {
        question: "Who manages it once it is in place?",
        answer: "Administration is role-based, so your IT team can be given the level of access that suits your organisation, with activity logging over what is changed. We agree the split of responsibilities between your team and ours as part of the deployment.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Greater control over your SIP infrastructure, a more structured way to connect different voice platforms, and a communication architecture that supports modernisation without unnecessarily disrupting the systems you already depend on.",
    },
  },
  {
    slug: "call-queue",
    title: "Call Queue",
    category: "Enterprise Features",
    categorySlug: "enterprise-features",
    tagline: "Handle high-volume customer calls more efficiently.",
    intro:
      "For enterprise sales, support, billing, service and help-desk teams, multiple customers call at once. Forwarding every call to one number produces busy signals, missed calls and long waits.",
    icon: Users,
    features: [
      {
        title: "Queue strategies",
        description:
          "Distribute waiting calls using the approach that suits the team.",
        icon: GitBranch,
      },
      {
        title: "Per-department queues",
        description:
          "Separate queues, hours, rules and agent groups per department.",
        icon: Layers,
      },
      {
        title: "Queue announcements",
        description:
          "Estimated wait and position announcements for waiting callers.",
        icon: Mic,
      },
      {
        title: "Queue callback",
        description: "Offer a call back instead of continued waiting.",
        icon: PhoneForwarded,
      },
      {
        title: "Supervisor monitoring",
        description: "Listen, whisper and barge where licensed.",
        icon: Headset,
      },
      {
        title: "Demand analytics",
        description: "Identify peak periods and staffing requirements.",
        icon: BarChart3,
      },
          {
        title: "Automatic call distribution",
        description:
          "Waiting calls are passed to agents as they become available, rather than ringing an occupied extension.",
        icon: ListOrdered,
      },
      {
        title: "Skill-based routing",
        description:
          "Send each waiting call to the agents equipped to handle it, not simply the next one free.",
        icon: Workflow,
      },
      {
        title: "Agent login and logout",
        description:
          "Agents join and leave their queues as shifts change, so distribution follows who is actually on the floor.",
        icon: Users,
      },
      {
        title: "Wallboards and service levels",
        description:
          "Real-time agent status, wallboards and service-level monitoring show queue performance as it happens.",
        icon: Gauge,
      },
    ],
    idealFor: [
      "Sales, support and billing teams",
      "Service and help desks",
      "High-volume inbound operations",
    ],
      problem: {
      heading: "Everyone is busy and the caller gets a busy signal",
      body: "For sales, support, billing and help-desk teams, several customers call at the same time. When every call is simply forwarded to one employee or one number, the ones arriving while the line is occupied produce busy signals and missed calls. Nobody records that those callers tried.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "SipLink places incoming calls into an organised queue per department rather than pushing them at an occupied extension, then distributes them to available agents by the strategy you have chosen. When every agent is busy the caller waits in the queue instead of hearing a busy signal, and each department can have its own queues, hours and agent groups.",
      ],
    },
    audiences: [
      {
        situation: "Your support line rings busy at peak times",
        fit: "Callers who arrive while your agents are occupied hold in an organised queue instead of being turned away. They keep their place, and the next free agent picks them up.",
      },
      {
        situation: "Several departments share the same phone team",
        fit: "Sales, support and billing each get their own queue, agent group, operating hours and routing rules, so one department's busy hour does not swamp another's callers.",
      },
      {
        situation: "Calls land on whoever happens to be free",
        fit: "Queue strategies and skill-based routing decide who takes each call, so distribution follows the rules you set rather than whichever handset rings first.",
      },
      {
        situation: "You do not know how long people are waiting",
        fit: "Real-time agent status, wallboards and service-level monitoring show the queue as it is happening, and queue reports show what the pattern has been.",
      },
    ],
    explainer: {
      question: "What is a call queue?",
      definition: "A call queue is what happens to a caller when everyone who could help them is already on another call. Instead of hearing a busy tone or being dropped into voicemail, the caller is held in an organised line for a specific department and told they are waiting. Automatic call distribution then hands each waiting call to an agent as that agent becomes free, in the order and by the method you have configured. The queue does not decide where the caller wanted to go — the IVR or your inbound routing does that — it decides what happens between arriving at the right department and reaching a person.",
      steps: [
        {
          title: "The caller reaches the right department",
          body: "A customer calling Support passes through the IVR, selects Support, and arrives at the Support queue — or is routed straight there by the number they dialled and your inbound rules.",
        },
        {
          title: "If everyone is busy, they hold in the queue",
          body: "Rather than receiving a busy signal, the caller waits in an organised queue with announcements covering their position and estimated wait, and can be offered a callback instead of continuing to hold.",
        },
        {
          title: "The next free agent takes the call",
          body: "As soon as an agent becomes available, automatic call distribution passes them a waiting call according to the queue strategy you have chosen and, where configured, the skills the call requires.",
        },
      ],
    },
    specs: [
      { label: "Distribution", value: "Automatic call distribution across inbound call queues" },
      { label: "Strategies", value: "Multiple queue strategies, configured per queue" },
      { label: "Skills", value: "Skill-based routing and agent groups" },
      { label: "Announcements", value: "Estimated wait and queue announcements while holding" },
      { label: "Callback", value: "Queue callback instead of continued waiting" },
      { label: "Monitoring", value: "Supervisor monitoring, real-time agent status, wallboards and service-level monitoring" },
    ],
    faqs: [
      {
        question: "How many callers can wait in a queue at once?",
        answer: "Queues are sized around your actual inbound traffic and the size of your agent groups rather than sold with a fixed waiting capacity. Tell us your busy-hour call volumes and how many agents each department runs, and we will design the queue with you.",
      },
      {
        question: "How is this different from an IVR?",
        answer: "The IVR is the menu that decides where a caller should go; the queue decides what happens once they get there and everyone is busy. A customer calling Support passes through the IVR, selects Support, and then enters the Support queue — the menu did the routing, the queue holds them until an agent is free.",
      },
      {
        question: "Can callers request a callback instead of waiting?",
        answer: "Yes. Queue callback lets a waiting caller hang up and keep their place, rather than holding on the line until an agent frees up. It is configured per queue, so you can offer it where long waits are likely and leave it off elsewhere.",
      },
      {
        question: "Can different departments have different queues?",
        answer: "Yes. Sales, support, billing, service and help desk can each have their own queue, with their own agent groups, operating hours and routing rules. They can still share the same IVR, recording and analytics configuration.",
      },
      {
        question: "Can supervisors see what is happening in the queue?",
        answer: "Supervisor monitoring covers real-time agent status, wallboards and service-level monitoring, so you can see the queue as it is happening rather than only in a report afterwards. Listen-in, whisper and barge-in are available where licensed.",
      },
      {
        question: "How do we know whether we have enough agents?",
        answer: "Call activity and queue analytics show when demand peaks and how effectively each team is handling what arrives. Managers use those patterns to plan staffing rather than guessing from the calls they happen to notice.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Busy periods handled in a structured way instead of turning callers away, with fewer missed opportunities, better use of the agents you already have, and a waiting experience your customers can predict.",
    },
  },
  {
    slug: "crm-integration",
    title: "CRM Integration",
    category: "Enterprise Features",
    categorySlug: "enterprise-features",
    tagline: "Bring customer information and communication together.",
    intro:
      "Sales and support teams work in a CRM while using a separate phone system, creating disconnected workflows where employees move between applications and record conversations by hand.",
    icon: Boxes,
    features: [
      {
        title: "Screen pop",
        description: "Customer information appears as the call arrives.",
        icon: MonitorSmartphone,
      },
      {
        title: "Click-to-dial",
        description: "Call directly from the CRM record, no re-keying.",
        icon: PhoneCall,
      },
      {
        title: "Call activity logging",
        description:
          "Communication recorded against the customer automatically.",
        icon: ListOrdered,
      },
      {
        title: "Contact synchronisation",
        description: "Keep contacts aligned between CRM and phone system.",
        icon: Repeat,
      },
      {
        title: "Microsoft and Google",
        description: "Microsoft 365, Teams, Outlook and Google integrations.",
        icon: Boxes,
      },
      {
        title: "Open API",
        description: "REST APIs, webhooks and SDK-based custom integration.",
        icon: Webhook,
      },
          {
        title: "Custom workflow integration",
        description:
          "Communication connected to the business processes your organisation actually runs, rather than only the ones a standard integration anticipates.",
        icon: Workflow,
      },
      {
        title: "Outlook and calendar integration",
        description:
          "Calling brought alongside the business email and calendar environment your teams already work in each day.",
        icon: Clock,
      },
      {
        title: "SDK-based integration",
        description:
          "Build communication into your own applications in code where an off-the-shelf connector is not the right fit.",
        icon: Code2,
      },
    ],
    idealFor: [
      "Sales and support teams working in a CRM",
      "Multi-department customer engagement",
      "Organisations reducing manual data entry",
    ],
      problem: {
      heading: "Your CRM and your phone system have never been introduced",
      body: "Sales and support teams work all day inside a CRM, then use a separate phone system to actually talk to customers. That means moving between two applications for every interaction — finding the customer record before the call, typing up what happened afterwards. The conversation ends up recorded by hand or not at all.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "SipLink connects business communication with the CRM environment your organisation already uses, so calls can be placed from the customer record and the activity written back against it — with the exact behaviour depending on the integration and how it is configured for you. The CRM stays the system of record and the place people work.",
      ],
    },
    audiences: [
      {
        situation: "Your agents retype call notes after every conversation",
        fit: "Call activity can be logged against the customer record automatically, so the history builds itself rather than depending on someone remembering to write it down.",
      },
      {
        situation: "Your support team searches for the customer while the phone is ringing",
        fit: "The matching record can be brought up as the call arrives, so the agent starts the conversation already knowing who they are speaking to and what happened last time.",
      },
      {
        situation: "Your sales representatives dial numbers by copying them from a screen",
        fit: "Calls can be placed directly from the CRM record with click-to-dial, removing the re-keying and the misdialled digits that come with it.",
      },
      {
        situation: "Sales, support and service each hold a different picture of the same customer",
        fit: "Connecting communication to CRM workflows gives departments a more consistent view of engagement across the whole relationship, not just their own part of it.",
      },
    ],
    explainer: {
      question: "What is CRM integration?",
      definition: "A CRM holds what your organisation knows about a customer: who they are, what they have bought, what they have asked for and who spoke to them last. A phone system, on its own, knows none of that — it only knows a number. CRM integration is the link between the two, so that a call and a customer record are treated as the same event rather than two unrelated ones. In practice that means the phone system can look a caller up in the CRM, present what it finds to the person answering, and write the outcome of the conversation back when the call ends. The aim is that communication becomes part of the customer journey instead of sitting isolated inside the telephony platform.",
      steps: [
        {
          title: "A call starts",
          body: "Someone rings one of your business numbers, or a representative places an outbound call — often with click-to-dial straight from the record they are already looking at in the CRM.",
        },
        {
          title: "The customer record is matched and presented",
          body: "The integration looks the caller up against your CRM and brings the matching record forward, so the agent has the customer's information in front of them as the conversation begins rather than after it.",
        },
        {
          title: "What happened is written back",
          body: "When the call ends, the activity can be recorded against that customer in the CRM automatically, so the interaction history stays current without anyone entering it by hand.",
        },
      ],
    },
    specs: [
      { label: "Dialling", value: "Click-to-dial from the customer record" },
      { label: "Context", value: "Screen pop with caller information on answer" },
      { label: "Logging", value: "Automatic call activity written to the customer record" },
      { label: "Contacts", value: "Contact synchronisation between CRM and phone system" },
      { label: "Productivity", value: "Business email, calendar and collaboration integrations" },
      { label: "Extensibility", value: "Open API, REST, webhooks and SDK-based integration" },
    ],
    faqs: [
      {
        question: "Which CRMs do you support?",
        answer: "SipLink integrates with CRM platforms generally rather than with a fixed list, and the current material references integration work built for platforms including Salesforce, Zoho, Sugar and Zendesk as examples. Which platforms apply to you, and exactly what each integration does, is confirmed per deployment before anything is committed — so treat those as illustrations rather than as capabilities you can assume are already in place for your environment.",
      },
      {
        question: "Does the agent see who is calling before they answer?",
        answer: "Screen pop can bring the matching customer record forward as the call arrives, so the person answering has the caller's information in front of them from the first word. What is displayed depends on the CRM and how the integration is configured for your teams.",
      },
      {
        question: "Is call activity logged automatically?",
        answer: "Call activity logging can record the interaction against the customer record without anyone typing it in. This is one of the main reasons organisations integrate at all, since it is the step most likely to be skipped when people are busy.",
      },
      {
        question: "Can you integrate a system you have not worked with before?",
        answer: "Yes — open API, REST, webhook and SDK-based routes exist precisely for applications that are not on anyone's standard list, including custom business workflow integration. We look at what the system exposes and design the integration around it.",
      },
      {
        question: "What is needed to set this up?",
        answer: "The integration is designed with you during onboarding: we look at the CRM you run, the workflows your teams follow and what you want to happen before, during and after a call, then confirm the technical requirements on both sides. Nothing is assumed about your environment until that conversation has happened.",
      },
      {
        question: "Do our teams have to change how they work?",
        answer: "The CRM stays where your teams work and stays the system of record. The intention is to remove steps — the searching, the switching and the retyping — rather than to add a new application for people to learn.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "A connected workflow between customers, employees, communication and CRM data, so your teams spend less time managing disconnected systems and more time on the customer relationships those systems exist to support.",
    },
  },
  {
    slug: "ai-voice-assistant",
    title: "AI Voice Assistant",
    category: "Enterprise Features",
    categorySlug: "enterprise-features",
    tagline: "Automate routine conversations while keeping humans in control.",
    intro:
      "Enterprise service environments receive thousands of calls involving repetitive questions, information requests and status checks. Requiring a human for every one increases workload, waiting times and cost.",
    icon: Bot,
    features: [
      {
        title: "Natural conversation",
        description:
          "Callers describe what they need instead of pressing numbers.",
        icon: Sparkles,
      },
      {
        title: "Information collection",
        description: "Gather the details needed before a handover.",
        icon: ListOrdered,
      },
      {
        title: "Intelligent routing",
        description:
          "Route to the right department or agent when a human is needed.",
        icon: GitBranch,
      },
      {
        title: "Transcription",
        description:
          "Call and voicemail transcription with conversation summaries.",
        icon: FileAudio,
      },
          {
        title: "Voicemail transcription",
        description:
          "Messages left for your teams are transcribed, so a voicemail can be read and triaged rather than listened to in full.",
        icon: Mic,
      },
      {
        title: "Call summaries",
        description:
          "A summary of the interaction, so whoever picks the conversation up next has the context without replaying the call.",
        icon: MessagesSquare,
      },
      {
        title: "Conversation intelligence",
        description:
          "AI-assisted call analysis across handled conversations, where enabled, to understand what your callers are actually asking for.",
        icon: Activity,
      },
      {
        title: "Automated voice prompts",
        description:
          "Text-to-speech and automated voice prompts, with intelligent workflow automation for the steps that follow an interaction.",
        icon: Workflow,
      },
    ],
    idealFor: [
      "High-volume service desks",
      "Repetitive enquiry handling",
      "After-hours coverage",
    ],
      problem: {
      heading: "Repetition consumes the team",
      body: "Customer-service lines receive a steady stream of repetitive questions, information requests, status checks and appointment queries. Requiring a human agent to handle every one increases workload, waiting times and cost. The conversations that genuinely need a person sit in the queue behind the routine ones.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "The AI Voice Assistant adds a voice layer to the customer journey, where enabled, letting callers say what they need in their own words instead of working through a keypad menu. It can be configured to handle appropriate routine interactions, and where the conversation needs human expertise SipLink can route the caller to the appropriate department or agent.",
      ],
    },
    audiences: [
      {
        situation: "Your team answers the same question all day",
        fit: "Routine questions, information requests and status checks can be handled by the assistant where enabled, so your agents are not reading the same answer aloud repeatedly.",
      },
      {
        situation: "Your keypad menu keeps getting longer",
        fit: "Callers can describe what they need rather than working through nested options, and the assistant determines where the conversation should go next.",
      },
      {
        situation: "Your queues build up at peak times",
        fit: "Suitable interactions can be dealt with without waiting for an agent, leaving the queue for the conversations that need a person.",
      },
      {
        situation: "Your specialists are pulled onto basic enquiries",
        fit: "The assistant can take the initial interaction and gather the required information, so specialists join the conversation at the point their expertise is needed.",
      },
    ],
    explainer: {
      question: "What is an AI voice assistant?",
      definition: "An AI voice assistant is a voice layer that answers a call and lets the caller explain what they need in ordinary speech. A traditional keypad menu asks the caller to fit their request into a fixed list of options and press a number; the assistant works the other way round, taking what the caller says and working out what should happen with it. Where enabled, it can handle appropriate routine interactions itself — answering a question, collecting details, confirming information. When the conversation calls for human expertise, it hands over to the right department or agent. It is designed to sit alongside your team rather than replace it.",
      steps: [
        {
          title: "The caller says what they need",
          body: "Rather than navigating a keypad menu, the caller describes their request naturally and the assistant takes it from there, where enabled.",
        },
        {
          title: "The assistant handles it or gathers what is required",
          body: "For appropriate routine interactions it can provide a relevant response, or collect the information needed before the conversation goes any further.",
        },
        {
          title: "It resolves the request or routes to the right person",
          body: "If the request can be dealt with, your caller is helped without waiting for an agent. If it needs human expertise, SipLink can route the caller to the appropriate department or agent.",
        },
      ],
    },
    specs: [
      { label: "Interaction", value: "Natural spoken requests rather than a keypad-only menu, where enabled" },
      { label: "Answering", value: "AI call answering and virtual receptionist, where enabled" },
      { label: "Transcription", value: "Call transcription, voicemail transcription and speech-to-text" },
      { label: "Summaries", value: "Call summaries and conversation intelligence across handled calls" },
      { label: "Handoff", value: "Routing to the appropriate department or agent when a person is needed" },
      { label: "Automation", value: "Text-to-speech, automated voice prompts and intelligent workflow automation" },
    ],
    faqs: [
      {
        question: "Will callers still be able to reach a person?",
        answer: "Yes. The assistant handles appropriate routine interactions and hands over when a conversation needs human expertise, routing the caller to the appropriate department or agent. It is a human-plus-AI model, so your team stays available for complex, sensitive or high-value conversations.",
      },
      {
        question: "What kinds of conversation is it suited to?",
        answer: "Routine interactions are the natural fit — repetitive questions, information requests, status checks and appointment-related queries. Conversations that need judgement, negotiation or specialist knowledge are the ones to route to a person, and we agree that boundary with you when the assistant is configured.",
      },
      {
        question: "How accurate is it, and how many calls will it handle without an agent?",
        answer: "We do not publish accuracy or deflection figures, because the answer depends on your call mix, the interactions you choose to automate and how the assistant is configured. The honest approach is to look at your own call types together, decide which routine interactions are suitable, and review how it behaves on your traffic.",
      },
      {
        question: "Are callers told they are speaking to an assistant?",
        answer: "How this is handled is configured to your requirements, and practice varies between organisations and sectors. Tell us what your organisation needs the caller to hear at the start of a call and the assistant is set up accordingly.",
      },
      {
        question: "Does this replace our IVR?",
        answer: "Not necessarily. An IVR is the keypad menu that routes calls through fixed options, while the assistant lets callers state their request in their own words and can handle part of it. The two can sit in the same call flow, and we design that with you.",
      },
      {
        question: "Do we get a record of what was said?",
        answer: "Call transcription, voicemail transcription and call summaries are available, and AI-assisted call analysis can be applied where enabled. That gives whoever picks the conversation up the context of the interaction rather than asking your caller to start again.",
      },
    ],
    outcome: {
      heading: "What you gain",
      body: "Less repetitive workload for your team and faster access to information for your callers, with your agents free to spend their time on the conversations where their expertise adds the most value.",
    },
  },
];

export function getProductDetail(slug: string) {
  return productDetails.find((product) => product.slug === slug);
}
