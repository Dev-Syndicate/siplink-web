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
  idealFor: string[];
  outcome?: { heading: string; body: string };
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
      body: "Traditional PRI and analogue lines are billed by the channel, take weeks to provision and cannot flex with demand. Adding capacity for a busy season means paying for it all year.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "We connect your existing IP-PBX to our voice network over SIP, so your current equipment keeps working while the connectivity underneath it changes.",
        "Trunks are designed around your call volumes, number ranges and redundancy requirements, with carrier failover and least-cost routing available where the deployment supports it.",
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
    outcome: {
      heading: "What you gain",
      body: "Lower per-channel costs, capacity that scales with demand, and a path to cloud calling that does not require discarding the equipment you have already paid for.",
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
    problem: {
      heading: "Phone systems should not need a telecom closet",
      body: "On-premise systems tie communication to a physical location, need specialist maintenance, and make supporting remote or hybrid staff unnecessarily difficult.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Your phone system runs in our cloud and is administered through a web portal. Extensions, call flows, business hours and users are configured centrally and take effect immediately.",
        "Employees connect from IP phones, desktop softphones, browsers or mobile devices, so the office location stops being a constraint on who can answer a call.",
      ],
    },
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
    ],
    idealFor: [
      "Growing teams",
      "Remote and hybrid workforces",
      "Businesses replacing legacy systems",
      "Organisations opening new locations",
    ],
    outcome: {
      heading: "What you gain",
      body: "A phone system that grows by adding users rather than hardware, administered by your own team from a browser, and reachable from wherever employees actually work.",
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
    problem: {
      heading: "Not every business wants to run a phone system",
      body: "Maintaining a PBX means firmware, patches, capacity planning and someone on call when it breaks — work that rarely belongs on a small IT team's plate.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "We host, manage and monitor the platform end to end. Your team uses it; we keep it running, patched and available.",
        "Access comes through IP phones, desktop and laptop softphones, WebRTC, a Chrome extension dialer and mobile applications, with two-factor authentication on user and admin portals.",
      ],
    },
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
    ],
    idealFor: [
      "Organisations without in-house telecom staff",
      "Branch offices",
      "Managed-service customers",
      "Businesses wanting predictable operational cost",
    ],
    outcome: {
      heading: "What you gain",
      body: "Enterprise phone-system capability without the operational burden — and a support team that answers when something needs attention.",
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
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Where policy, regulation or existing investment requires call control to stay on site, SipLink connects your on-premise IP-PBX to our voice network over SIP.",
        "The same trunking, number management and routing capabilities apply, while the PBX itself remains under your control inside your own network.",
      ],
    },
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
    ],
    idealFor: [
      "Regulated environments",
      "On-premise policy requirements",
      "Hybrid deployments",
      "Existing PBX investments",
    ],
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
    problem: {
      heading: "Switchboards slow customers down",
      body: "Routing every caller through one main number means menus, transfers and hold time before anyone reaches the person they were trying to call in the first place.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Each DID maps directly to an employee, department, extension or application, so callers connect straight through.",
        "DIDs work alongside SIP, Cloud PBX, call routing, IVR and the rest of the SipLink platform, so direct numbers and structured call flows coexist.",
      ],
    },
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
    ],
    idealFor: [
      "Sales teams",
      "Support departments",
      "Individual employees",
      "Remote teams",
      "Businesses managing multiple departments",
    ],
    outcome: {
      heading: "What you gain",
      body: "A more professional calling experience, simpler direct communication, and support for teams spread across different locations.",
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
    problem: {
      heading: "Call cost should not deter a customer",
      body: "When reaching support or sales costs the caller money, some of them simply do not call — and you never learn what they wanted.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "A toll-free number gives your business a professional customer-facing presence while incoming calls are directed to the appropriate teams, agents or locations.",
        "Whether you run a sales line, support centre, helpline or service desk, toll-free traffic is managed through your wider SipLink communication infrastructure.",
      ],
    },
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
    ],
    idealFor: [
      "Customer support",
      "Sales enquiries",
      "Helplines",
      "Service businesses",
      "Organisations serving customers across regions",
    ],
    outcome: {
      heading: "What you gain",
      body: "A recognisable, professional point of contact that removes cost as a reason not to get in touch.",
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
    problem: {
      heading: "Presence should not require premises",
      body: "Entering a new market traditionally meant leasing an office and a phone line before you knew whether the market was worth it.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Calls to a virtual number are routed to SIP phones, softphones, mobile devices, extensions or other configured destinations, so employees stay connected from the office, at home or across locations.",
        "This suits businesses expanding into new markets, supporting remote teams, or keeping separate numbers for different departments and business functions.",
      ],
    },
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
    ],
    idealFor: [
      "Remote businesses",
      "Distributed teams",
      "Companies entering new markets",
      "Customer support teams",
      "Businesses requiring flexible call routing",
    ],
    outcome: {
      heading: "What you gain",
      body: "A professional presence wherever your customers are, without the cost and commitment of physical infrastructure in every location.",
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
    problem: {
      heading: "Changing numbers is more disruptive than changing provider",
      body: "New numbers mean updating websites, advertisements, business cards, invoices, CRM records and customer databases — while old numbers keep ringing somewhere else.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "The porting process coordinates the required information, validates the numbers and account details, plans the migration and configures the numbers within the SipLink environment.",
        "Once ported, numbers work with your SipLink services and can carry the routing, IVR, extensions and queue workflows you need.",
      ],
    },
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
    ],
    idealFor: [
      "Businesses migrating from another provider",
      "PRI and legacy PBX replacements",
      "Organisations with established public numbers",
    ],
    outcome: {
      heading: "What you gain",
      body: "Keep your existing business identity and continue serving customers through familiar numbers while moving to a modern communication environment.",
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
    problem: {
      heading: "Volume turns into missed opportunity",
      body: "Without structure, busy periods produce busy signals, abandoned calls and customers who try a competitor instead.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Incoming calls are routed intelligently to the appropriate department, agent or extension, while queues organise waiting customers and distribute calls across available agents.",
        "Teams manage inbound and outbound communication, configure business-hour routing, monitor active calls and administer agents from one centralised platform.",
      ],
    },
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
    ],
    idealFor: [
      "Sales, support and service teams",
      "High call volume operations",
      "Blended inbound and outbound teams",
    ],
    outcome: {
      heading: "What you gain",
      body: "Fewer missed opportunities, better agent productivity, and a more organised and professional customer calling experience.",
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
    problem: {
      heading: "Agents spend their day waiting",
      body: "Manual dialling means listening to unanswered rings, busy tones and voicemail greetings — time that produces no conversations at all.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "The system manages outbound calling and connects successful calls to available agents, rather than making each agent dial and wait individually.",
        "Businesses organise calling campaigns, monitor agent availability, track call outcomes and measure campaign performance from the platform.",
      ],
    },
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
    ],
    idealFor: [
      "Outbound sales teams",
      "Collections",
      "Campaign-driven calling",
      "Lead qualification teams",
    ],
    outcome: {
      heading: "What you gain",
      body: "More time speaking with real prospects and less waiting between calls, improving both calling efficiency and customer engagement.",
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
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Contact lists are loaded into a campaign and dialled automatically according to the pacing you configure, with results recorded against each record.",
        "Where a conversation is needed, answered calls are connected to available agents; where the campaign is informational, automated prompts can deliver the message.",
      ],
    },
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
    ],
    idealFor: [
      "Notification campaigns",
      "Appointment reminders",
      "Outbound follow-up",
    ],
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
    problem: {
      heading: "Every wrong transfer costs patience",
      body: "When callers land in the wrong place, they get passed around, repeat themselves, and form an impression of the business before anyone has helped them.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Build multi-level IVR menus with professional greetings and voice prompts, routing callers to Sales, Support, Billing or any other department.",
        "Define different call flows for business hours, holidays and after-hours, so the experience matches when the customer is calling.",
      ],
    },
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
    ],
    idealFor: [
      "Any business wanting fewer transfers",
      "Multi-department organisations",
      "Teams with distinct business hours",
    ],
    outcome: {
      heading: "What you gain",
      body: "Callers reach the right destination quickly, reducing unnecessary transfers, improving response times and creating a smoother customer journey.",
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
    problem: {
      heading: "Memory is not a record",
      body: "Disputes, training gaps and service failures are difficult to address when the only account of a conversation is what each side remembers of it.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Recordings can be automatic or on demand, covering inbound and outbound calls, with dual-channel capture where the deployment supports it.",
        "Authorised users access and replay relevant conversations, while role-based access controls who can view which recordings.",
      ],
    },
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
    ],
    idealFor: [
      "Quality assurance",
      "Agent training",
      "Regulated industries",
      "Dispute resolution",
    ],
    outcome: {
      heading: "What you gain",
      body: "A reliable record of important conversations that supports better customer service and greater control over business communications.",
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
    problem: {
      heading: "Call counts are not insight",
      body: "Knowing the volume of calls says nothing about when demand peaks, which teams are struggling, or why customers are calling in the first place.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Dashboards cover call volumes, answered and missed calls, call duration, agent activity and overall communication trends in a form managers can act on.",
        "Those insights identify busy periods, evaluate agent performance, reveal customer calling patterns and highlight where service can be improved.",
      ],
    },
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
    ],
    idealFor: [
      "Managers tracking performance",
      "Staffing and capacity decisions",
      "Service-level monitoring",
    ],
    outcome: {
      heading: "What you gain",
      body: "Smarter operational decisions grounded in what is actually happening across your calls, rather than assumptions about it.",
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
    problem: {
      heading: "Telephony is a lot to build yourself",
      body: "Carrier relationships, media handling, signalling and reliability engineering are months of work before your product makes its first call.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Build solutions that initiate and receive calls, connect customers with agents, automate calling workflows and manage voice interactions programmatically.",
        "Whether it is a support platform, sales application, notification system or something custom, the calling capability comes from SipLink rather than your own infrastructure.",
      ],
    },
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
    ],
    idealFor: [
      "CRM platforms",
      "SaaS applications",
      "Customer support systems",
      "Sales applications",
      "Automated calling",
    ],
    outcome: {
      heading: "What you gain",
      body: "Business calling inside your product in days rather than quarters, without owning a telephony stack.",
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
    problem: {
      heading: "Manual messaging does not scale",
      body: "Sending reminders, confirmations and alerts by hand costs staff time and produces inconsistent timing as volume grows.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Send automated notifications, alerts, reminders, verification messages, updates and customer communications directly from your systems.",
        "Developers integrate messaging into existing platforms and automate communication based on business events, so the right message goes out at the right moment.",
      ],
    },
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
    ],
    idealFor: [
      "OTP and verification",
      "Alerts",
      "Appointment reminders",
      "Transactional messages",
      "Customer notifications",
    ],
    outcome: {
      heading: "What you gain",
      body: "Timely information delivered consistently, without staff sending messages one at a time.",
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
    problem: {
      heading: "Customers are already somewhere else",
      body: "Messages sent through channels customers do not check go unread, whatever the content — while WhatsApp sits open on the same phone.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Use WhatsApp to communicate with customers, send business updates, provide support, share notifications and build more convenient engagement experiences.",
        "Connecting WhatsApp with your existing systems lets teams manage customer communication more efficiently rather than as a separate manual channel.",
      ],
    },
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
    ],
    idealFor: [
      "Customer support",
      "Notifications",
      "Order updates",
      "Appointment reminders",
      "Sales engagement",
    ],
    outcome: {
      heading: "What you gain",
      body: "Higher engagement by communicating where customers already are, managed through your existing systems.",
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
    problem: {
      heading: "Installing software loses customers",
      body: "Asking someone to download a softphone before they can speak to you adds friction at exactly the moment they wanted help.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Build browser-based calling, click-to-call functionality, embedded softphones and support interfaces directly into your applications.",
        "Customers and agents communicate from the platform they are already using, rather than switching to a separate phone application.",
      ],
    },
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
    ],
    idealFor: [
      "Web applications",
      "SaaS platforms",
      "Browser-based calling",
      "Click-to-call",
      "Customer support portals",
    ],
    outcome: {
      heading: "What you gain",
      body: "Seamless calling where customers and agents already are, with no installation step to lose people at.",
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
    problem: {
      heading: "Abstraction is not always what you want",
      body: "Some organisations need direct control over SIP signalling and routing rather than a simplified layer on top of it.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "The SIP API provides a flexible foundation for connecting applications with SIP infrastructure and managing voice communication workflows.",
        "This suits organisations integrating modern applications with existing SIP-based systems while retaining architectural control.",
      ],
    },
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
    ],
    idealFor: [
      "SIP applications",
      "Cloud telephony platforms",
      "PBX environments",
      "Communication software",
      "Enterprise integrations",
    ],
    outcome: {
      heading: "What you gain",
      body: "Architectural control over voice, with modern applications integrated into the SIP estate you already run.",
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
    problem: {
      heading: "Two systems for one job",
      body: "Without integration, employees use Teams for collaboration and an entirely separate phone system for external business calls — switching applications all day.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "SipLink connects your Teams environment with your business telephony infrastructure, managing the connectivity between Teams and the external voice network.",
        "Existing business numbers are connected to the appropriate Teams users or departments, and SipLink manages the underlying call routing and voice connectivity in both directions.",
      ],
    },
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
    ],
    idealFor: [
      "Organisations already invested in Microsoft Teams",
      "Enterprises consolidating communication tools",
      "Distributed workforces on Microsoft 365",
    ],
    outcome: {
      heading: "What the enterprise gains",
      body: "Less switching between communication applications, a more consistent calling experience, and business telephony managed through a more centralised architecture.",
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
    problem: {
      heading: "Every connection is another thing to manage",
      body: "When voice systems talk to each other without a structured control point, enterprises lose visibility over how traffic moves between internal and external environments.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "The SipLink SBC provides a controlled communication layer between your enterprise voice infrastructure and external SIP networks or communication platforms, managing the SIP communication passing through it.",
        "This is especially valuable when connecting existing PBX systems with cloud telephony, Microsoft Teams, SIP trunks, contact-centre platforms or other SIP-enabled applications.",
      ],
    },
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
    ],
    idealFor: [
      "Enterprises connecting PBX and cloud telephony",
      "Multi-carrier environments",
      "Organisations running Teams alongside SIP trunks",
    ],
    outcome: {
      heading: "What the enterprise gains",
      body: "Greater control over SIP infrastructure and a more structured approach to connecting voice platforms, supporting modernisation without unnecessarily disrupting existing systems.",
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
    problem: {
      heading: "A busy signal is a lost customer",
      body: "When all agents are occupied and there is no queue, additional callers simply fail to get through — and most of them do not try again.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "Incoming calls are organised according to the department and routing rules you configure, then distributed to available agents by the chosen strategy.",
        "A customer calling Support can pass through the IVR, select Support and enter the Support queue. If every agent is busy, callers wait in the queue rather than receiving a busy signal.",
        "Different departments can have their own queues, operating hours, routing rules and agent groups, working alongside IVR, business-hour routing, recording and analytics.",
      ],
    },
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
    ],
    idealFor: [
      "Sales, support and billing teams",
      "Service and help desks",
      "High-volume inbound operations",
    ],
    outcome: {
      heading: "What the enterprise gains",
      body: "Large volumes of incoming calls handled in a structured way, fewer missed opportunities, better agent utilisation and a more predictable customer experience.",
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
    problem: {
      heading: "The phone system does not know your customers",
      body: "Agents search for customer records before or after every call, manually log what happened, and switch applications constantly — losing time on every interaction.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "SipLink connects business communication with the CRM your organisation uses, bringing calling closer to the customer information and workflows teams already rely on.",
        "When a representative contacts a prospect, communication connects to the appropriate CRM workflow; when an agent receives a call, the process works alongside the customer records available in the CRM.",
        "For enterprises this matters because different departments interact with the same customer at different stages, and connected communication gives a more consistent view of engagement.",
      ],
    },
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
    ],
    idealFor: [
      "Sales and support teams working in a CRM",
      "Multi-department customer engagement",
      "Organisations reducing manual data entry",
    ],
    outcome: {
      heading: "What the enterprise gains",
      body: "A connected workflow between customers, employees, communication and CRM data, so teams spend less time managing disconnected systems and more on customer relationships.",
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
    problem: {
      heading: "Repetition consumes the team",
      body: "When agents spend their day on routine enquiries, the complex and high-value conversations — the ones that genuinely need a person — wait behind them.",
    },
    approach: {
      heading: "How SipLink handles it",
      body: [
        "The AI Voice Assistant introduces an intelligent voice layer into the customer journey, letting callers state what they need naturally rather than navigating a rigid keypad menu.",
        "It can handle appropriate routine interactions, understand the request, collect required information, provide relevant responses and determine where the conversation should go next.",
        "This is a human-plus-AI model, not a replacement: AI handles suitable repetitive interactions while employees remain available for complex, sensitive or high-value conversations.",
      ],
    },
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
    ],
    idealFor: [
      "High-volume service desks",
      "Repetitive enquiry handling",
      "After-hours coverage",
    ],
    outcome: {
      heading: "What the enterprise gains",
      body: "Reduced repetitive workload, improved response times, faster access to information for customers, and human agents focused where their expertise adds most value.",
    },
  },
];

export function getProductDetail(slug: string) {
  return productDetails.find((product) => product.slug === slug);
}
