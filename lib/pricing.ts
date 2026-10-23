import {
  AudioLines,
  Bot,
  Building2,
  CalendarClock,
  ChartColumnIncreasing,
  ChartPie,
  CircleCheck,
  Cloud,
  FileText,
  Globe,
  Grid2x2Check,
  Hash,
  Headphones,
  History,
  ListVideo,
  MessageCircle,
  Mic,
  MonitorSmartphone,
  Phone,
  PhoneCall,
  Printer,
  Puzzle,
  Rocket,
  Route,
  ShieldCheck,
  Spline,
  Users,
  Voicemail,
  type LucideIcon,
} from "lucide-react";

/**
 * Pricing page content, taken only from docs/Document 3.pdf. Wording is the
 * document's own; do not add plans, prices, features or claims that are not
 * in it.
 *
 * USD figures are the document's INR-to-USD conversion note (page 10).
 */

export type Feature = { title: string; detail: string; icon: LucideIcon };

export type Plan = {
  name: string;
  tagline: string;
  icon: LucideIcon;
  inr: string;
  usd: string;
  /** The one-line summary from the plan overview. */
  summary: string;
  /** The longer description from the plan's own card. */
  description: string;
  featured?: boolean;
  badge?: string;
  /** Heading over the feature list, as the document words it. */
  featuresHeading: string;
  features: Feature[];
  addOns?: Feature[];
  note: string;
};

export const plans: Plan[] = [
  {
    name: "Core",
    tagline: "Essential Business Calling",
    icon: Rocket,
    inr: "₹999",
    usd: "$10.99",
    summary:
      "Essential calling, CloudPBX, business phone number, softphone access and call management.",
    description:
      "Reliable cloud-based business communication for individuals and small businesses.",
    featuresHeading: "Features included",
    features: [
      { title: "Business Calling", detail: "Inbound and outbound calling", icon: PhoneCall },
      { title: "Business Phone Number", detail: "Dedicated DID and caller ID options", icon: Hash },
      { title: "CloudPBX", detail: "Cloud-hosted business phone system", icon: Cloud },
      { title: "Multi-Device Access", detail: "Web, desktop, Android and iOS softphones", icon: MonitorSmartphone },
      { title: "Voicemail & Call Forwarding", detail: "Manage missed calls and redirect calls", icon: Voicemail },
      { title: "Call Logs & CDR", detail: "Access call history and call details", icon: History },
      { title: "User & Extension Management", detail: "Manage users and extensions", icon: Users },
      { title: "Technical Support", detail: "Assistance with setup and configuration", icon: Headphones },
    ],
    note: "Taxes extra, as applicable.",
  },
  {
    name: "Business Pro",
    tagline: "Advanced Team Communication",
    icon: ChartColumnIncreasing,
    inr: "₹1,799",
    usd: "$19.04",
    summary:
      "Advanced CloudPBX, IVR, call queues, recording, analytics, voicemail and CRM integration support.",
    description:
      "For growing teams that need advanced call handling, messaging, and productivity tools.",
    featured: true,
    badge: "Pro",
    featuresHeading: "Everything in Core, plus",
    features: [
      { title: "IVR & Auto-Attendant", detail: "Professional greetings and menu-based call routing", icon: Grid2x2Check },
      { title: "Call Queues & Ring Groups", detail: "Distribute calls across teams and agents", icon: ListVideo },
      { title: "Business-Hours Routing", detail: "Time-based, shift and holiday call handling", icon: CalendarClock },
      { title: "Conference & Find Me/Follow Me", detail: "Flexible call handling across devices and users", icon: Users },
      { title: "Call Recording", detail: "Record calls for review and quality monitoring", icon: Mic },
      { title: "Call Analytics & Reports", detail: "Review call activity and performance data", icon: ChartPie },
      { title: "Business SMS Capabilities", detail: "Messaging options subject to number and registration eligibility", icon: MessageCircle },
      { title: "CRM & ATS Integration Support", detail: "Connect supported business applications through available integrations", icon: Puzzle },
      { title: "User Roles & Access Controls", detail: "Manage permissions and user access", icon: ShieldCheck },
    ],
    note: "Taxes extra, as applicable. SMS registration, messaging usage and certain integrations may incur additional charges.",
  },
  {
    name: "Enterprise Plus",
    tagline: "Advanced Calling, AI & Integrations",
    icon: Building2,
    inr: "₹2,199",
    usd: "$23.30",
    summary:
      "Advanced CloudPBX, IVR and smart routing, call monitoring, AI transcription, AI Voice Assistant, Teams/SBC integration and CRM, ATS and API integration options.",
    description:
      "Advanced business communication designed for growing teams and enterprises that need intelligent call management, seamless integrations, and centralized communications.",
    featuresHeading: "Features & Capabilities",
    features: [
      { title: "Business Voice Calling", detail: "Inbound and outbound calling with supported business numbers and calling plans.", icon: PhoneCall },
      { title: "CloudPBX & Virtual Phone System", detail: "Cloud-based business telephony with centralized user and extension management.", icon: Cloud },
      { title: "IVR & Auto-Attendant", detail: "Professional greetings, interactive menus, and automated call distribution.", icon: Grid2x2Check },
      { title: "Smart Call Routing & Queues", detail: "Route calls to the right teams, extensions, or agents.", icon: Route },
      { title: "Call Monitoring & Supervision", detail: "Whisper, Barge-In, and Spy features where supported.", icon: Headphones },
      { title: "Call Recording", detail: "Record calls for review, training, and quality monitoring.", icon: Mic },
      { title: "CDR, Analytics & Reporting", detail: "Access call-detail records and reporting tools to monitor communication activity.", icon: ChartColumnIncreasing },
      { title: "AI Voice Assistant", detail: "AI-powered voice interaction capabilities, subject to feature availability.", icon: AudioLines },
      { title: "AI Call Transcription", detail: "Convert supported call recordings into text for review and documentation.", icon: AudioLines },
      { title: "Web & Mobile Softphone", detail: "Access business calling through supported web, desktop, Android, and iOS applications.", icon: MonitorSmartphone },
      { title: "Microsoft Teams & SBC Integration", detail: "Connect business telephony with compatible Teams and Session Border Controller environments.", icon: Users },
      { title: "CRM, ATS & Custom API Integration", detail: "Integrate supported business applications and communication workflows.", icon: Puzzle },
      { title: "Business SMS & Messaging", detail: "Messaging capabilities subject to number eligibility, registration, and usage terms.", icon: MessageCircle },
      { title: "Branded Caller Name (CNAM)", detail: "Registered business-name display on supported outbound calls, subject to provider approval.", icon: CircleCheck },
      { title: "DID Numbers & Number Porting", detail: "Additional business numbers, preferred area codes, and porting assistance.", icon: Globe },
      { title: "Technical Support", detail: "Technical assistance and account support based on your service agreement.", icon: Headphones },
    ],
    addOns: [
      { title: "10DLC Campaign Registration", detail: "Business messaging registration and compliance.", icon: MessageCircle },
      { title: "Virtual Fax", detail: "Cloud-based fax services.", icon: Printer },
      { title: "IP Desk Phones & Hardware", detail: "Compatible desk phones and provisioning options.", icon: Phone },
      { title: "Specialized Integrations", detail: "Custom implementation and advanced API workflows.", icon: Spline },
      { title: "Enhanced AI Usage", detail: "Additional transcription or AI usage where applicable.", icon: AudioLines },
    ],
    note: "Taxes extra, as applicable. Optional add-ons and usage-based charges may apply.",
  },
];

/** The closing statement from the Enterprise Plus card. */
export const enterpriseReady = {
  title: "Enterprise-Ready Communication",
  body: "Scalable business telephony, centralized call management, collaboration capabilities, and integration options to support your communication workflows.",
};

export const pricingDisclaimer =
  "All prices are exclusive of applicable taxes. GST and other applicable charges will be added to the final invoice. Optional add-ons, usage-based services, hardware, and specialized integrations may be charged separately. Feature availability depends on the selected package and service terms.";

export type AiAddOn = {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  pricing: string;
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
    pricing: "Pricing based on transcription hours and usage.",
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
    pricing: "Pricing based on usage and supported capabilities.",
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
    pricing: "Pricing based on configuration and usage.",
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
    pricing: "Pricing based on available analytics and requirements.",
    icon: ChartColumnIncreasing,
  },
];
