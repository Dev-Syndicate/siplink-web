import {
  AudioLines,
  BadgeCheck,
  Bot,
  CalendarClock,
  ChartLine,
  ChartPie,
  Cloud,
  FileAudio,
  FileText,
  Globe,
  Hash,
  Headphones,
  Headset,
  History,
  ListOrdered,
  ListTree,
  MessageCircle,
  Mic,
  MonitorSmartphone,
  PhoneCall,
  Printer,
  Puzzle,
  Route,
  Server,
  ShieldCheck,
  Users,
  UsersRound,
  Voicemail,
  type LucideIcon,
} from "lucide-react";

/**
 * Plans, add-ons and AI add-ons as supplied by SipLink (pricing PDF, Oct 2026).
 * Add-ons carry no prices on purpose: they are quoted by sales.
 */
export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Tier = {
  name: string;
  tagline: string;
  summary: string;
  /** Per line, per month. Both are the supplied figures, not a conversion. */
  price: { USD: number; INR: number };
  popular?: boolean;
  inherits?: string;
  features: Feature[];
  note: string;
};

export type Currency = keyof Tier["price"];

export const tiers: Tier[] = [
  {
    name: "Core",
    tagline: "Essential Business Calling",
    summary:
      "Reliable cloud-based business communication for individuals and small businesses.",
    price: { USD: 10.99, INR: 999 },
    features: [
      {
        title: "Business Calling",
        description: "Inbound and outbound calling",
        icon: PhoneCall,
      },
      {
        title: "Business Phone Number",
        description: "Dedicated DID and caller ID options",
        icon: Hash,
      },
      {
        title: "CloudPBX",
        description: "Cloud-hosted business phone system",
        icon: Cloud,
      },
      {
        title: "Multi-Device Access",
        description: "Web, desktop, Android and iOS softphones",
        icon: MonitorSmartphone,
      },
      {
        title: "Voicemail & Call Forwarding",
        description: "Manage missed calls and redirect calls",
        icon: Voicemail,
      },
      {
        title: "Call Logs & CDR",
        description: "Access call history and call details",
        icon: History,
      },
      {
        title: "User & Extension Management",
        description: "Manage users and extensions",
        icon: Users,
      },
      {
        title: "Technical Support",
        description: "Assistance with setup and configuration",
        icon: Headset,
      },
    ],
    note: "Taxes extra, as applicable.",
  },
  {
    name: "Business Pro",
    tagline: "Advanced Team Communication",
    summary:
      "For growing teams that need advanced call handling, messaging, and productivity tools.",
    price: { USD: 19.04, INR: 1799 },
    popular: true,
    inherits: "Everything in Core, plus",
    features: [
      {
        title: "IVR & Auto-Attendant",
        description: "Professional greetings and menu-based call routing",
        icon: ListTree,
      },
      {
        title: "Call Queues & Ring Groups",
        description: "Distribute calls across teams and agents",
        icon: ListOrdered,
      },
      {
        title: "Business-Hours Routing",
        description: "Time-based, shift and holiday call handling",
        icon: CalendarClock,
      },
      {
        title: "Conference & Find Me/Follow Me",
        description: "Flexible call handling across devices and users",
        icon: UsersRound,
      },
      {
        title: "Call Recording",
        description: "Record calls for review and quality monitoring",
        icon: Mic,
      },
      {
        title: "Call Analytics & Reports",
        description: "Review call activity and performance data",
        icon: ChartPie,
      },
      {
        title: "Business SMS Capabilities",
        description:
          "Messaging options subject to number and registration eligibility",
        icon: MessageCircle,
      },
      {
        title: "CRM & ATS Integration Support",
        description:
          "Connect supported business applications through available integrations",
        icon: Puzzle,
      },
      {
        title: "User Roles & Access Controls",
        description: "Manage permissions and user access",
        icon: ShieldCheck,
      },
    ],
    note: "Taxes extra, as applicable. SMS registration, messaging usage and certain integrations may incur additional charges.",
  },
  {
    name: "Enterprise Plus",
    tagline: "Advanced Calling, AI & Integrations",
    summary:
      "Advanced business communication for growing teams and enterprises that need intelligent call management, seamless integrations, and centralized communications.",
    price: { USD: 23.3, INR: 2199 },
    inherits: "Everything in Business Pro, plus",
    features: [
      {
        title: "Smart Call Routing & Queues",
        description: "Route calls to the right teams, extensions, or agents.",
        icon: Route,
      },
      {
        title: "Call Monitoring & Supervision",
        description: "Whisper, Barge-In, and Spy features where supported.",
        icon: Headphones,
      },
      {
        title: "AI Voice Assistant",
        description:
          "AI-powered voice interaction capabilities, subject to feature availability.",
        icon: AudioLines,
      },
      {
        title: "AI Call Transcription",
        description:
          "Convert supported call recordings into text for review and documentation.",
        icon: FileAudio,
      },
      {
        title: "Microsoft Teams & SBC Integration",
        description:
          "Connect business telephony with compatible Teams and Session Border Controller environments.",
        icon: Server,
      },
      {
        title: "CRM, ATS & Custom API Integration",
        description:
          "Integrate supported business applications and communication workflows.",
        icon: Puzzle,
      },
      {
        title: "Branded Caller Name (CNAM)",
        description:
          "Registered business-name display on supported outbound calls, subject to provider approval.",
        icon: BadgeCheck,
      },
      {
        title: "DID Numbers & Number Porting",
        description:
          "Additional business numbers, preferred area codes, and porting assistance.",
        icon: Globe,
      },
    ],
    note: "Taxes extra, as applicable. Optional add-ons and usage-based charges may apply.",
  },
];

export type AddOn = {
  title: string;
  subtitle: string;
  description: string;
  includes: string;
  icon: LucideIcon;
};

export const addOns: AddOn[] = [
  {
    title: "SMS & 10DLC Registration",
    subtitle: "Business Messaging & Compliance",
    description:
      "Enable business messaging with 10DLC campaign registration for eligible US local numbers. Support application-to-person messaging workflows, campaign registration, and brand verification for compliant messaging.",
    includes:
      "Registration assistance, campaign submission, and compliance guidance.",
    icon: MessageCircle,
  },
  {
    title: "Branded Caller ID (CNAM)",
    subtitle: "Business Name Display",
    description:
      "Establish a recognizable calling identity by associating your registered business name with supported outbound calls, helping recipients identify your organization.",
    includes:
      "Business-name submission and configuration. Display depends on carrier, network, device, and CNAM database support.",
    icon: BadgeCheck,
  },
  {
    title: "CRM, ATS & Custom API Integrations",
    subtitle: "Connected Business Workflows",
    description:
      "Connect SipLink calling with your existing CRM, applicant tracking system, or custom business application to streamline communication and reduce manual work.",
    includes:
      "API integration guidance, supported call-event connectivity, click-to-call or screen-pop workflows where supported, and custom integration scoping.",
    icon: Puzzle,
  },
  {
    title: "Microsoft Teams & SBC Integration",
    subtitle: "Unified Business Communications",
    description:
      "Extend business calling into compatible Microsoft Teams environments using supported SIP connectivity and Session Border Controller configurations.",
    includes:
      "Integration planning, SIP configuration assistance, call-routing setup, and compatibility checks.",
    icon: Server,
  },
  {
    title: "Virtual Fax",
    subtitle: "Cloud-Based Fax Communication",
    description:
      "Send and receive supported fax communications without a traditional physical fax machine, centralizing document transmission and simplifying remote workflows.",
    includes:
      "Virtual fax account or service configuration, subject to the selected package.",
    icon: Printer,
  },
  {
    title: "IP Desk Phones & Hardware",
    subtitle: "Business Phone Deployment",
    description:
      "Equip teams with compatible IP desk phones for professional office calling, receptionist desks, and employee workstations.",
    includes:
      "Compatible device recommendations, SIP account provisioning, configuration assistance, and deployment guidance.",
    icon: Headset,
  },
  {
    title: "Additional Numbers & Number Porting",
    subtitle: "Number Expansion & Migration",
    description:
      "Add business numbers for new teams, locations, or departments, or transfer eligible existing numbers from your current service provider.",
    includes:
      "Number selection assistance, preferred area-code requests where available, porting coordination, and configuration support.",
    icon: Globe,
  },
];

export type AiAddOn = {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: LucideIcon;
};

export const aiAddOns: AiAddOn[] = [
  {
    title: "AI Call Transcription",
    subtitle: "Speech-to-text intelligence",
    description:
      "Convert supported call recordings into searchable text for easier documentation, review, and recordkeeping.",
    features: [
      "Call-to-text transcription",
      "Searchable conversation records",
      "Improved call documentation",
      "Transcription usage options",
    ],
    icon: AudioLines,
  },
  {
    title: "AI Call Summarization",
    subtitle: "Automated conversation summaries",
    description:
      "Turn supported conversations into concise summaries to help teams review discussions and identify important information.",
    features: [
      "Automated call summaries",
      "Key discussion points",
      "Easier conversation review",
      "Faster post-call documentation",
    ],
    icon: FileText,
  },
  {
    title: "AI Voice Assistant",
    subtitle: "AI-powered voice interactions",
    description:
      "Enhance business call handling with AI voice capabilities configured for supported workflows.",
    features: [
      "AI-assisted voice interactions",
      "Configurable call-handling workflows",
      "Business-specific use cases",
      "Integration options, where supported",
    ],
    icon: Bot,
  },
  {
    title: "AI Call Analytics",
    subtitle: "Advanced call intelligence",
    description:
      "Support business decision-making with advanced analysis of available call data and conversation insights.",
    features: [
      "Call activity insights",
      "Conversation pattern analysis",
      "Advanced reporting options",
      "Performance visibility, where supported",
    ],
    icon: ChartLine,
  },
];
