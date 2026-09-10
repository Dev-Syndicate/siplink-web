import {
  Activity,
  Banknote,
  Bot,
  Building2,
  FileAudio,
  GraduationCap,
  Headset,
  HeartPulse,
  Landmark,
  Laptop,
  ListOrdered,
  MessagesSquare,
  PhoneIncoming,
  Sparkles,
  Store,
  Truck,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Narrative content for /products.
 *
 * The page is organised around the life of a single customer conversation
 * rather than a product catalogue: a call reaches you, gets routed, is
 * handled, and is then understood. Every product sits at one of those four
 * stages, which is what lets a buyer find their own problem on the page.
 */

export type ConversationStage = {
  id: string;
  /** Verb the customer would use, not the system's name for it. */
  label: string;
  question: string;
  heading: string;
  body: string;
  icon: LucideIcon;
  /** Products from lib/products.ts that do the work at this stage. */
  products: { title: string; slug: string; note: string }[];
};

export const conversationStages: ConversationStage[] = [
  {
    id: "reach",
    label: "Reaches you",
    question: "Can customers get through?",
    heading: "Every conversation starts with a number that works",
    body: "Local presence where your customers are, toll-free where cost would stop them calling, and the numbers you already advertise — kept exactly as they are.",
    icon: PhoneIncoming,
    products: [
      {
        title: "DID Numbers",
        slug: "did-numbers",
        note: "Straight through to the right person",
      },
      {
        title: "Toll-Free Numbers",
        slug: "toll-free-numbers",
        note: "Cost stops being a reason not to call",
      },
      {
        title: "Virtual Phone Numbers",
        slug: "virtual-numbers",
        note: "Presence without premises",
      },
      {
        title: "Number Porting",
        slug: "number-porting",
        note: "Keep the numbers customers know",
      },
      {
        title: "SIP Trunking",
        slug: "sip-trunking",
        note: "Capacity that flexes with demand",
      },
    ],
  },
  {
    id: "route",
    label: "Gets routed",
    question: "Does it reach the right person?",
    heading: "The difference between answered and resolved",
    body: "Callers who land in the wrong place repeat themselves, get transferred, and form an opinion before anyone helps them. Routing decides which experience they get.",
    icon: Workflow,
    products: [
      {
        title: "IVR System",
        slug: "ivr",
        note: "Callers choose, instead of guessing",
      },
      {
        title: "Call Queue",
        slug: "call-queue",
        note: "A wait, never a busy signal",
      },
      {
        title: "Cloud PBX",
        slug: "cloud-pbx",
        note: "Extensions and flows you control",
      },
      {
        title: "Hosted PBX",
        slug: "hosted-pbx",
        note: "We run it, your team uses it",
      },
      {
        title: "IP PBX",
        slug: "ip-pbx",
        note: "Call control stays on site",
      },
    ],
  },
  {
    id: "handle",
    label: "Is handled",
    question: "Can your team cope with the volume?",
    heading: "Where the work actually happens",
    body: "Agents need the tools to move faster and supervisors need to see what is happening while it happens — not in a report the following week.",
    icon: Headset,
    products: [
      {
        title: "Call Center Solution",
        slug: "call-center",
        note: "Inbound and outbound in one place",
      },
      {
        title: "Predictive Dialer",
        slug: "predictive-dialer",
        note: "More talking, less waiting",
      },
      {
        title: "Auto Dialer",
        slug: "auto-dialer",
        note: "Volume without manual dialling",
      },
      {
        title: "Microsoft Teams Calling",
        slug: "teams-calling",
        note: "Call from where they already work",
      },
      {
        title: "CRM Integration",
        slug: "crm-integration",
        note: "The customer record arrives with the call",
      },
    ],
  },
  {
    id: "understand",
    label: "Is understood",
    question: "Do you know what was said?",
    heading: "Conversations become something you can act on",
    body: "Most businesses know how many calls they took. Far fewer know what was discussed, which questions keep recurring, or where customers give up.",
    icon: Sparkles,
    products: [
      {
        title: "Call Recording",
        slug: "call-recording",
        note: "A record, not a recollection",
      },
      {
        title: "Call Analytics",
        slug: "call-analytics",
        note: "Patterns, not just totals",
      },
      {
        title: "AI Voice Assistant",
        slug: "ai-voice-assistant",
        note: "Routine handled, people freed up",
      },
      {
        title: "Session Border Controller",
        slug: "sbc",
        note: "Control at the network edge",
      },
    ],
  },
];

/** Developer-facing products sit outside the call lifecycle. */
export const buildYourOwn = {
  heading: "Or build the conversation into your own product",
  body: "When communication belongs inside your application rather than beside it, the same network is available as an API.",
  products: [
    {
      title: "Voice API",
      slug: "voice-api",
      note: "Calls from your application code",
    },
    {
      title: "SMS API",
      slug: "sms-api",
      note: "Messaging triggered by your events",
    },
    {
      title: "WhatsApp Business API",
      slug: "whatsapp-api",
      note: "Where your customers already are",
    },
    {
      title: "WebRTC SDK",
      slug: "webrtc-sdk",
      note: "Calling in the browser, nothing to install",
    },
    {
      title: "SIP API",
      slug: "sip-api",
      note: "Direct control of the voice layer",
    },
  ],
};

/**
 * AI capabilities. Several are conditional on deployment and licensing in
 * the source material; that qualification is kept rather than dropped.
 */
export const aiCapabilities: {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Source material qualifies these as deployment or licence dependent. */
  conditional?: boolean;
}[] = [
  {
    title: "Transcription",
    description:
      "Calls and voicemail turned into searchable text, so a conversation can be read in seconds instead of replayed in full.",
    icon: FileAudio,
  },
  {
    title: "Conversation intelligence",
    description:
      "Summaries and call analysis that surface what was discussed and what needs following up.",
    icon: Sparkles,
    conditional: true,
  },
  {
    title: "Virtual receptionist",
    description:
      "Routine enquiries answered naturally, with a handover to a person the moment the conversation needs one.",
    icon: Bot,
    conditional: true,
  },
  {
    title: "Workflow automation",
    description:
      "Text-to-speech, speech-to-text and automated prompts driving the steps that used to need an agent.",
    icon: Workflow,
  },
];

/** Industry framing: the problem each sector actually has. */
export const industryOutcomes = [
  {
    industry: "Healthcare & RCM",
    challenge: "Voice and fax between patients, providers and insurers",
    outcome:
      "Billing teams keep fax-based document workflows while supervisors monitor live calls, and transcription turns claim conversations into searchable records.",
    icon: HeartPulse,
    href: "/industries/healthcare",
  },
  {
    industry: "Banking & Finance",
    challenge: "Accuracy and accountability on every customer conversation",
    outcome:
      "Recording and transcription give compliance a defensible record, while analytics show how sales, service and collections teams are actually performing.",
    icon: Banknote,
    href: "/industries/banking-finance",
  },
  {
    industry: "Call Centers",
    challenge: "Agent performance and supervisor visibility at volume",
    outcome:
      "Whisper, barge and live monitoring let supervisors coach during the call, and real-time transcription turns conversations into coachable detail.",
    icon: Headset,
    href: "/industries/call-centers",
  },
  {
    industry: "IT & SaaS",
    challenge: "Communication that belongs inside the product",
    outcome:
      "Voice, SMS, WhatsApp and WebRTC APIs put calling inside your own application, with transcription and analytics available to your workflows.",
    icon: Laptop,
    href: "/industries/it-saas",
  },
  {
    industry: "Education",
    challenge: "Students, parents and faculty across departments",
    outcome:
      "Admissions and support teams handle enquiry peaks through queues and IVR, with call notes keeping follow-ups from being lost.",
    icon: GraduationCap,
    href: "/industries/education",
  },
  {
    industry: "Retail",
    challenge: "Customers, stores and support pulling in different directions",
    outcome:
      "Separate numbers per store or function, routed centrally, with analytics revealing the issues customers keep calling about.",
    icon: Store,
    href: "/industries/retail",
  },
  {
    industry: "Logistics",
    challenge: "Customers, drivers and dispatchers in constant contact",
    outcome:
      "SMS carries operational updates while call notes capture delivery instructions, and analytics expose the bottlenecks.",
    icon: Truck,
    href: "/industries/logistics",
  },
  {
    industry: "Government",
    challenge: "Public service demand across departments",
    outcome:
      "Queues and routing organise citizen contact, while analytics give management visibility into service demand.",
    icon: Landmark,
    href: "/industries/government",
  },
] as const;

/** Who buys, framed by organisation shape rather than headcount alone. */
export const customerShapes = [
  {
    title: "Growing businesses",
    description:
      "Outgrowing a basic phone line and needing routing, queues and reporting without hiring a telecom team.",
    icon: Activity,
    href: "/solutions/small-business",
  },
  {
    title: "Multi-site organisations",
    description:
      "Branches that need their own identity locally and one communication environment centrally.",
    icon: Building2,
    href: "/solutions/multi-branch",
  },
  {
    title: "Customer-facing teams",
    description:
      "Sales, support and service operations where conversation quality is the product.",
    icon: UsersRound,
    href: "/solutions/customer-support",
  },
  {
    title: "Enterprises and operators",
    description:
      "Complex estates with Teams, SIP trunks, PBX platforms and CRM that need connecting, not replacing.",
    icon: Landmark,
    href: "/solutions/enterprise",
  },
] as const;

/**
 * Proof points. Figures the source documents attribute to SipLink; those
 * marked `footnote` carry the qualification the documents attach to them.
 */
export const platformProof: {
  value: string;
  label: string;
  footnote?: boolean;
}[] = [
  { value: "150+", label: "Countries covered" },
  { value: "99.5%", label: "Port availability", footnote: true },
  { value: "24/7", label: "Support and NOC" },
  { value: "SOC 2", label: "ISO 27001, HIPAA, GDPR" },
];

export const messagingChannels = [
  { title: "SMS", icon: MessagesSquare },
  { title: "WhatsApp", icon: MessagesSquare },
  { title: "Live chat", icon: MessagesSquare },
  { title: "Click-to-call", icon: PhoneIncoming },
  { title: "Voice", icon: Headset },
  { title: "Queues", icon: ListOrdered },
] as const;
