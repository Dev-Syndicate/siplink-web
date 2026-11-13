import {
  BadgeCheck,
  Bot,
  Braces,
  Building2,
  ChartNoAxesCombined,
  Cloud,
  Code2,
  Contact,
  Factory,
  FileText,
  Gauge,
  GraduationCap,
  Headset,
  HeartHandshake,
  HeartPulse,
  Landmark,
  ListChecks,
  MapPin,
  MessagesSquare,
  Mic,
  Network,
  Notebook,
  PhoneCall,
  PhoneIncoming,
  RadioTower,
  Repeat,
  Route,
  Scale,
  Send,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Truck,
  UserPlus,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Content for the per-industry pages under /industries/[slug].
 *
 * Copy is refined — not copied — from the "Industries" block in
 * docs/website-contents.md, which supplies a paragraph (or two) per sector.
 * Each entry expands that source into an intro, the sector's communication
 * challenge, how SipLink helps, the platform capabilities the source
 * attributes to that industry, an ideal-for list and a closing payoff.
 *
 * Guardrails (see BUILD-CONTRACT.md and lib/site.ts): the only credential
 * referenced is HIPAA compliance, and only on Healthcare where it is real. No
 * uptime/SLA percentages, no country counts, no invented customers, metrics,
 * partners or prices. Features are limited to what the source attributes to
 * the industry, described alongside SipLink's real platform capabilities.
 */

/** A SipLink product that delivers a capability, linked to its product page. */
export type CapabilityProduct = {
  /** Product name as shown on /products. */
  label: string;
  /** Product slug under /products/[slug]. */
  slug: string;
};

/**
 * A named capability. `outcome` is a short "so that…" line derived from the
 * capability's own description — no new facts, it just states the benefit the
 * description already implies, for the editorial capability list. `products`
 * maps the capability to the actual SipLink product page(s) that deliver it,
 * so a reader can see which product is at work and jump straight to it.
 */
export type IndustryPoint = {
  title: string;
  description: string;
  outcome: string;
  icon: LucideIcon;
  /** The SipLink product(s) that power this capability. */
  products?: CapabilityProduct[];
};

/**
 * A step in "how a conversation flows" — a restructuring of the `handling`
 * copy into the sequence a real interaction follows, not a new claim.
 */
export type IndustryFlowStep = {
  label: string;
  detail: string;
  icon: LucideIcon;
};

export type IndustryHighlightCard = {
  title: string;
  icon: LucideIcon;
};

export type IndustryDetail = {
  slug: string;
  title: string;
  icon: LucideIcon;
  /** Short benefit-first line under the page title. */
  tagline: string;
  /** Metadata description + hero intro paragraph. */
  intro: string;
  /**
   * Who communicates in this sector — taken from the source paragraph's own
   * list of parties (e.g. patients, providers, insurers). Shown in the sticky
   * "who's on the line" rail. Doc-verified, never invented.
   */
  parties: string[];
  /** The situation the reader recognises. Left column of the problem spine. */
  challenge: { heading: string; body: string };
  /**
   * How SipLink answers it. `body` is the prose; `productLinks` maps exact
   * product phrases that appear in that prose to their /products slug, so the
   * page can turn those mentions into inline links without fragile matching.
   */
  handling: {
    heading: string;
    body: string[];
    productLinks?: { phrase: string; slug: string }[];
  };
  /** The interaction sequence, derived from `handling`. */
  flow: IndustryFlowStep[];
  /** Concrete capabilities the source attributes to this industry. */
  capabilities: IndustryPoint[];
  /** Who this is for. */
  idealFor: string[];
  /** The payoff line that closes the argument. */
  gain: { heading: string; body: string };
  /** Highlight cards rendered above the closing CTA. */
  highlightCards?: IndustryHighlightCard[];
};

export const industryDetails: IndustryDetail[] = [
  {
    slug: "call-centers",
    title: "Call Centers",
    icon: Headset,
    tagline: "Power every customer conversation.",
    intro:
      "Give agents the tools to perform at their best and managers full visibility across every interaction, inbound and outbound, on one platform built for high call volume.",
    parties: ["Inbound callers", "Outbound contacts", "Agents", "Supervisors"],
    challenge: {
      heading: "Reliable calling alone doesn't run a call center",
      body: "Agents need more than a clear line: they need calls routed to the right place, and supervisors need to see what is happening across the floor. Without structure and insight, conversations get dropped, coaching becomes guesswork, and no one can tell why performance moves the way it does.",
    },
    handling: {
      heading: "Route it, monitor it, learn from it",
      body: [
        "SipLink manages inbound and outbound communication with IVR, call queues and intelligent routing, so each caller reaches the right team quickly and the rest wait in an organised queue rather than a busy tone.",
        "Supervisors can support agents live with Whisper, Barge and Spy, while call recording and analytics keep a record of every interaction. AI-powered transcription, real-time transcription and call notes turn conversations into searchable information, so managers can review, coach and improve without replaying whole recordings.",
      ],
      productLinks: [
        { phrase: "IVR", slug: "ivr" },
        { phrase: "call queues", slug: "call-queue" },
        { phrase: "Whisper, Barge and Spy", slug: "call-center" },
        { phrase: "call recording", slug: "call-recording" },
        { phrase: "analytics", slug: "call-analytics" },
        { phrase: "AI-powered transcription", slug: "call-recording" },
        { phrase: "call notes", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Reaches the floor",
        detail: "Inbound and outbound calls arrive on one platform.",
        icon: PhoneIncoming,
      },
      {
        label: "Routed to the right team",
        detail: "IVR, queues and intelligent routing place every caller.",
        icon: Route,
      },
      {
        label: "Captured and understood",
        detail: "Recording, transcription and analytics turn calls into insight.",
        icon: Gauge,
      },
    ],
    capabilities: [
      {
        title: "IVR and intelligent routing",
        description:
          "Automated menus and routing rules send each caller to the right team, department or next available agent.",
        outcome: "Callers reach the right team first time.",
        icon: ListChecks,
        products: [
          { label: "IVR System", slug: "ivr" },
          { label: "Call Center Solution", slug: "call-center" },
        ],
      },
      {
        title: "Call queues",
        description:
          "Hold waiting callers in an organised queue and distribute them across agents to keep response times down.",
        outcome: "Waiting callers get answered, not a busy tone.",
        icon: Route,
        products: [{ label: "Call Queue", slug: "call-queue" }],
      },
      {
        title: "Supervisor Whisper, Barge and Spy",
        description:
          "Monitor live calls, whisper guidance to an agent, or join a conversation when a customer needs more help.",
        outcome: "Agents get support the moment a call needs it.",
        icon: Headset,
        products: [{ label: "Call Center Solution", slug: "call-center" }],
      },
      {
        title: "Recording and transcription",
        description:
          "Capture calls and generate AI, real-time and audio transcription so conversations become searchable text.",
        outcome: "Conversations become searchable text, not just audio.",
        icon: Mic,
        products: [{ label: "Call Recording", slug: "call-recording" }],
      },
      {
        title: "Call notes and analytics",
        description:
          "Attach notes so follow-ups aren't left to memory, and use call volume, answered and missed-call insights to lift team performance.",
        outcome: "Follow-ups are documented and performance is visible.",
        icon: Gauge,
        products: [{ label: "Call Analytics", slug: "call-analytics" }],
      },
    ],
    idealFor: [
      "Inbound and outbound contact centers",
      "BPO and customer-service operations",
      "Teams coaching agents on live calls",
    ],
    gain: {
      heading: "Conversations become information",
      body: "Turn every call into something you can review, measure and act on, so agents improve, managers stay informed, and the whole floor performs more consistently.",
    },
  },
  {
    slug: "staffing-recruitment",
    title: "Staffing & Recruitment",
    icon: UsersRound,
    tagline: "Connect recruiters. Engage candidates. Accelerate hiring.",
    intro:
      "Recruitment moves at the speed of communication. SIPLINK brings business voice, candidate SMS, CloudPBX, CRM integrations, and intelligent communication tools together on one platform—helping recruitment teams stay connected from the first interaction through successful placement.",
    parties: ["Candidates", "Recruiters", "Employers", "Hiring Managers"],
    challenge: {
      heading: "Recruitment teams handle high volume across fragmented tools",
      body: "Recruiters manage a continuous flow of screening calls, interview coordination, follow-ups, and client updates. When communication is distributed across personal phones, separate messaging apps, and disconnected CRM systems, important follow-ups become harder to manage and managers lose visibility into conversations.",
    },
    handling: {
      heading: "One platform for every candidate and client conversation",
      body: [
        "SIPLINK helps staffing and recruitment teams streamline communication across the hiring lifecycle by bringing candidate calling, 10DLC business SMS, CloudPBX, and CRM integrations into one connected workspace.",
        "With cloud-based calling, recruiters maintain a professional business identity from anywhere. Supervisors gain visibility through call tracking, recording, AI audio transcription, and live call controls like Whisper and Barge.",
        "10DLC-ready business messaging keeps candidates engaged with interview confirmations, application updates, reminders, and onboarding communication, keeping recruitment workflows moving forward fast.",
      ],
      productLinks: [
        { phrase: "CloudPBX", slug: "cloud-pbx" },
        { phrase: "10DLC business SMS", slug: "sip-trunking" },
        { phrase: "CRM integrations", slug: "cloud-pbx" },
        { phrase: "AI audio transcription", slug: "call-center" },
        { phrase: "Whisper and Barge", slug: "call-center" },
      ],
    },
    flow: [
      {
        label: "Candidate Sourcing",
        detail: "Reach candidates quickly via professional voice & 10DLC SMS.",
        icon: UserPlus,
      },
      {
        label: "Candidate Screening",
        detail: "Conduct screening calls with recorded, transcribed notes.",
        icon: PhoneCall,
      },
      {
        label: "Interview Scheduling",
        detail: "Send SMS confirmations, reminders, and application updates.",
        icon: MessagesSquare,
      },
      {
        label: "Interview Follow-Ups",
        detail: "Stay connected through timely callbacks and candidate updates.",
        icon: ListChecks,
      },
      {
        label: "Client Coordination",
        detail: "Align recruiters, employers, and hiring managers seamlessly.",
        icon: HeartHandshake,
      },
      {
        label: "Placement & Onboarding",
        detail: "Guide candidates through final offers and onboarding steps.",
        icon: BadgeCheck,
      },
    ],
    capabilities: [
      {
        title: "Candidate Calling & CloudPBX",
        description:
          "Professional business calling with IVR, call routing, queues, forwarding, call notes, and analytics.",
        outcome: "Maintain a professional business identity from anywhere.",
        icon: PhoneCall,
        products: [{ label: "CloudPBX", slug: "cloud-pbx" }],
      },
      {
        title: "10DLC-Ready Candidate SMS",
        description:
          "Send job opportunities, interview confirmations, reminders, document requests, and placement updates with full US A2P registration.",
        outcome: "Engage candidates quickly with high response rates.",
        icon: MessagesSquare,
        products: [{ label: "Business Voice & SMS", slug: "sip-trunking" }],
      },
      {
        title: "Recruiter CRM & ATS Integration",
        description:
          "Connect calls, SMS threads, candidate records, and follow-ups directly with your existing recruitment CRM.",
        outcome: "Eliminate manual data entry and unify candidate histories.",
        icon: Workflow,
        products: [{ label: "CRM Integration", slug: "cloud-pbx" }],
      },
      {
        title: "Live Call Supervision & Controls",
        description:
          "Monitor calls, guide recruiters live with Whisper, step in with Barge, and review AI audio transcriptions.",
        outcome: "Supervise recruiter activity and ensure call quality.",
        icon: ShieldCheck,
        products: [{ label: "Call Analytics", slug: "call-center" }],
      },
      {
        title: "Remote & Multi-Branch Communication",
        description:
          "Unified cloud phone system and caller ID for remote recruiters, hybrid teams, offshore offices, and global operations.",
        outcome: "Connect your distributed workforce on one platform.",
        icon: Network,
        products: [{ label: "Hosted PBX", slug: "hosted-pbx" }],
      },
    ],
    idealFor: [
      "Staffing & recruitment agencies",
      "Executive search & headhunting firms",
      "High-volume hourly & seasonal staffing teams",
      "Remote & hybrid recruitment workforces",
      "RPO & global staffing operations",
    ],
    gain: {
      heading: "Recruit More. Communicate Better. Grow Faster.",
      body: "Bring candidate calling, business SMS, CloudPBX, CRM integration, call management, and intelligent communication capabilities together in one connected platform built for recruitment teams.",
    },
    highlightCards: [
      {
        title: "CNAM & Caller ID",
        icon: Contact,
      },
      {
        title: "Spam-Free Number Support",
        icon: ShieldCheck,
      },
      {
        title: "Spam Monitoring",
        icon: ChartNoAxesCombined,
      },
      {
        title: "Recruitment Call Centre",
        icon: Headset,
      },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare & Billing RCM",
    icon: HeartPulse,
    tagline: "Communication designed for healthcare workflows.",
    intro:
      "Bring voice, fax, messaging and high-volume communication between patients, providers, insurers and internal teams together on a HIPAA-compliant platform built for how care organisations actually work.",
    parties: ["Patients", "Providers", "Insurers", "Internal teams"],
    challenge: {
      heading: "Care runs on more than phone calls",
      body: "Healthcare and medical billing teams juggle patient calls, provider coordination, insurance follow-ups and document-based fax workflows, often in parallel, and always where accuracy and privacy matter. Managing each channel in isolation slows teams down and leaves conversations undocumented.",
    },
    handling: {
      heading: "Voice, fax and intelligence, together",
      body: [
        "SipLink combines business calling, fax, call recording, transcription, call analytics, SMS, IVR and contact-center capabilities into one HIPAA-compliant environment, so voice and document workflows sit side by side rather than in separate systems.",
        "For medical billing and Revenue Cycle Management teams, reliable voice and fax support document-driven work, and supervisors can use Whisper, Barge and Spy to monitor or assist RCM agents on live calls where appropriate. AI, real-time and audio transcription with call notes let authorised users review a transcript and notes to find follow-ups and requirements, instead of listening to an entire recording.",
      ],
      productLinks: [
        { phrase: "business calling", slug: "cloud-pbx" },
        { phrase: "call recording", slug: "call-recording" },
        { phrase: "call analytics", slug: "call-analytics" },
        { phrase: "SMS", slug: "sms-api" },
        { phrase: "IVR", slug: "ivr" },
        { phrase: "Whisper, Barge and Spy", slug: "call-center" },
        { phrase: "call notes", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Patient or provider makes contact",
        detail: "Voice, fax and messaging arrive in one environment.",
        icon: PhoneIncoming,
      },
      {
        label: "Routed and supervised",
        detail: "IVR and contact-center tools place and support each call.",
        icon: ListChecks,
      },
      {
        label: "Documented securely",
        detail: "Recording, transcription and notes capture it, HIPAA-compliant.",
        icon: ShieldCheck,
      },
    ],
    capabilities: [
      {
        title: "HIPAA-compliant platform",
        description:
          "A communication environment suitable for practices and teams handling sensitive patient and provider information.",
        outcome: "Sensitive conversations stay handled securely.",
        icon: ShieldCheck,
      },
      {
        title: "Business calling and fax",
        description:
          "Voice and fax together support the patient, provider and document-based workflows healthcare teams depend on.",
        outcome: "Voice and document workflows sit together.",
        icon: PhoneCall,
        products: [{ label: "CCaaS", slug: "cloud-pbx" }],
      },
      {
        title: "IVR and contact-center capabilities",
        description:
          "Route callers to the right department and organise high-volume patient and insurer communication.",
        outcome: "High-volume patient calls stay organised.",
        icon: ListChecks,
        products: [
          { label: "IVR System", slug: "ivr" },
          { label: "Call Center Solution", slug: "call-center" },
        ],
      },
      {
        title: "Recording, transcription and call notes",
        description:
          "Record calls, generate AI, real-time and audio transcription, and capture follow-ups and requirements so nothing important goes undocumented.",
        outcome: "Authorised users review calls as text, nothing lost.",
        icon: Mic,
        products: [{ label: "Call Recording", slug: "call-recording" }],
      },
      {
        title: "SMS and analytics",
        description:
          "Reach patients by message and use analytics to understand communication activity across teams.",
        outcome: "Reach patients and see activity across teams.",
        icon: MessagesSquare,
        products: [
          { label: "SMS API", slug: "sms-api" },
          { label: "Call Analytics", slug: "call-analytics" },
        ],
      },
    ],
    idealFor: [
      "Practices coordinating patient communication",
      "Medical billing and RCM companies",
      "Teams handling provider and insurer follow-ups",
    ],
    gain: {
      heading: "A complete healthcare communication environment",
      body: "Voice, fax, supervision, recording, transcription and analytics working together, so teams communicate securely and nothing important goes undocumented.",
    },
  },
  {
    slug: "banking-finance",
    title: "Banking & Finance",
    icon: Landmark,
    tagline: "Turn financial conversations into actionable information.",
    intro:
      "Handle high volumes of customer conversations across sales, support, service and collections with the structure, accountability and visibility financial teams need.",
    parties: ["Customers", "Sales", "Support", "Service", "Collections"],
    challenge: {
      heading: "Handling calls isn't the same as understanding them",
      body: "Banking and financial-services teams manage large volumes of conversations where accuracy, accountability and visibility matter. Recordings alone don't help much when someone has to sit through an entire call to find out what was agreed or what needs to happen next.",
    },
    handling: {
      heading: "From handling calls to understanding them",
      body: [
        "Every conversation is recorded and reviewable as text, with AI-powered and real-time transcription standing in for a full audio replay, so accountability doesn't depend on someone remembering a call correctly.",
        "An AI voice assistant can clear routine balance checks and status questions before a call reaches an agent, while number porting moves existing customer-facing lines onto SipLink without changing the numbers customers already call. Queued calls across sales, support, service and collections stay organised, and analytics gives management visibility into activity and performance across every team.",
      ],
      productLinks: [
        { phrase: "recorded and reviewable as text", slug: "call-recording" },
        { phrase: "AI-powered and real-time transcription", slug: "call-recording" },
        { phrase: "AI voice assistant", slug: "ai-voice-assistant" },
        { phrase: "number porting", slug: "number-porting" },
        { phrase: "Queued calls", slug: "call-queue" },
        { phrase: "analytics", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Customer conversation begins",
        detail: "Calls arrive across sales, support, service and collections.",
        icon: PhoneIncoming,
      },
      {
        label: "Directed and captured",
        detail: "Structured calling, IVR and queues place and record it.",
        icon: Route,
      },
      {
        label: "Understood, not just handled",
        detail: "Transcription, notes and analytics reveal what was agreed.",
        icon: FileText,
      },
    ],
    capabilities: [
      {
        title: "Recording with searchable transcription",
        description:
          "Capture every conversation for accountability, and review it as AI-generated or real-time text instead of replaying the audio.",
        outcome: "What was agreed is on record, not remembered.",
        icon: Mic,
        products: [{ label: "Call Recording", slug: "call-recording" }],
      },
      {
        title: "AI voice assistant",
        description:
          "Handle routine balance checks and status questions automatically, and route anything else to an agent.",
        outcome: "Agents spend less time on repeat questions.",
        icon: Bot,
        products: [{ label: "AI Voice Assistant", slug: "ai-voice-assistant" }],
      },
      {
        title: "Number porting",
        description:
          "Move existing customer-facing lines to SipLink without changing the numbers customers already call.",
        outcome: "Customers keep dialling the numbers they know.",
        icon: Repeat,
        products: [{ label: "Number Porting", slug: "number-porting" }],
      },
      {
        title: "Call queues across teams",
        description:
          "Distribute high call volume across sales, support, service and collections and hold waiting customers in an organised queue.",
        outcome: "High call volume stays under control.",
        icon: Route,
        products: [{ label: "Call Queue", slug: "call-queue" }],
      },
      {
        title: "Call analytics",
        description:
          "See communication activity and team performance across sales, support, service and collections.",
        outcome: "See activity and performance across every team.",
        icon: Gauge,
        products: [{ label: "Call Analytics", slug: "call-analytics" }],
      },
    ],
    idealFor: [
      "Sales and service desks in financial services",
      "Collections and account-management teams",
      "Operations that need conversation accountability",
    ],
    gain: {
      heading: "Know what's happening inside every call",
      body: "Move beyond simply handling calls to understanding them, with transcripts, notes and analytics that make each conversation something the business can act on.",
    },
  },
  {
    slug: "education",
    title: "Education",
    icon: GraduationCap,
    tagline: "Connect students, parents, faculty and administration.",
    intro:
      "Give institutions one organised communication environment across departments, campuses, students, parents, faculty and administrative teams.",
    parties: ["Students", "Parents", "Faculty", "Administration"],
    challenge: {
      heading: "Communication scattered across a campus",
      body: "Educational institutions coordinate across many departments, sites and audiences at once. Admissions and support teams field frequent calls, and without structure it becomes hard to route enquiries, capture requirements and keep follow-up consistent.",
    },
    handling: {
      heading: "Organise the calls, capture the details",
      body: [
        "A virtual phone number gives each campus or admissions office its own presence without a separate phone line to install, with calls routing to whichever team is handling that campus today.",
        "Busy admissions periods are held in an organised queue behind an IVR greeting rather than dropped, and transcription and call notes make it quick for support and admissions teams to review a conversation, capture requirements and follow up properly. Administrators get a clearer view of how calls are handled across every department.",
      ],
      productLinks: [
        { phrase: "virtual phone number", slug: "virtual-numbers" },
        { phrase: "organised queue", slug: "call-queue" },
        { phrase: "IVR", slug: "ivr" },
        { phrase: "transcription", slug: "call-recording" },
        { phrase: "call notes", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Enquiry comes in",
        detail: "Students, parents and staff call across departments.",
        icon: PhoneIncoming,
      },
      {
        label: "Routed and queued",
        detail: "IVR, routing and queues send each enquiry to the right place.",
        icon: Route,
      },
      {
        label: "Captured for follow-up",
        detail: "Transcription and call notes record requirements and next steps.",
        icon: Notebook,
      },
    ],
    capabilities: [
      {
        title: "Virtual phone numbers per campus",
        description:
          "Give each campus or admissions office its own number without installing a physical line.",
        outcome: "Every campus has its own presence from day one.",
        icon: Smartphone,
        products: [{ label: "Virtual Phone Numbers", slug: "virtual-numbers" }],
      },
      {
        title: "IVR and call queues",
        description:
          "Guide callers to admissions, departments or support, and hold busy periods in an organised queue instead of a busy tone.",
        outcome: "Enquiries reach the right department, even at peak times.",
        icon: ListChecks,
        products: [
          { label: "IVR System", slug: "ivr" },
          { label: "Call Queue", slug: "call-queue" },
        ],
      },
      {
        title: "Call notes and transcription",
        description:
          "Capture enquiry requirements as text and attach follow-ups so nothing slips between departments.",
        outcome: "Nothing slips between departments.",
        icon: Notebook,
        products: [{ label: "Call Recording", slug: "call-recording" }],
      },
      {
        title: "Analytics",
        description:
          "Give administrators visibility into call volumes and how communication is being handled across campuses.",
        outcome: "Administrators see how calls are handled.",
        icon: Gauge,
        products: [{ label: "Call Analytics", slug: "call-analytics" }],
      },
    ],
    idealFor: [
      "Schools, colleges and universities",
      "Admissions and student-support teams",
      "Multi-campus and multi-department institutions",
    ],
    gain: {
      heading: "A more organised campus conversation",
      body: "One communication environment across departments and campuses, with the visibility administrators need to see how calls are being handled.",
    },
  },
  {
    slug: "retail",
    title: "Retail",
    icon: ShoppingCart,
    tagline: "Connect customers, stores and support teams.",
    intro:
      "Move communication quickly between customers, stores, sales teams and support departments from one centralised environment.",
    parties: ["Customers", "Stores", "Sales teams", "Support"],
    challenge: {
      heading: "Communication that has to keep moving",
      body: "Retail runs on fast hand-offs between customers, individual stores, sales staff and support. When each store and function communicates in isolation, it's hard to route customers well, keep separate identities per location, or spot the issues that keep coming back.",
    },
    handling: {
      heading: "One environment, many stores",
      body: [
        "A toll-free number gives customers one free, memorable way to reach support, whichever store they bought from, with IVR routing each caller to the right store, sales team or support desk automatically.",
        "SMS keeps customers updated on orders and promotions alongside voice, and AI transcription with call notes surfaces customer requirements so service teams can follow up consistently. Analytics identifies the recurring issues and requirements that show up across stores and teams.",
      ],
      productLinks: [
        { phrase: "toll-free number", slug: "toll-free-numbers" },
        { phrase: "IVR", slug: "ivr" },
        { phrase: "SMS", slug: "sms-api" },
        { phrase: "AI transcription", slug: "call-recording" },
        { phrase: "call notes", slug: "call-analytics" },
        { phrase: "Analytics", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Customer gets in touch",
        detail: "Calls and messages arrive from across the operation.",
        icon: PhoneIncoming,
      },
      {
        label: "Routed to the right store",
        detail: "IVR and routing send customers to the right store or team.",
        icon: Route,
      },
      {
        label: "Requirements surfaced",
        detail: "Transcription, notes and analytics reveal recurring issues.",
        icon: Gauge,
      },
    ],
    capabilities: [
      {
        title: "Toll-free customer service number",
        description:
          "Give customers one free, memorable number to reach support, routed automatically to the right store, sales team or support desk.",
        outcome: "One number, free for every customer who calls.",
        icon: PhoneCall,
        products: [
          { label: "Toll-Free Numbers", slug: "toll-free-numbers" },
          { label: "IVR System", slug: "ivr" },
        ],
      },
      {
        title: "Business SMS",
        description:
          "Support customer communication and order or promotion notifications alongside voice.",
        outcome: "Reach customers by message and notification.",
        icon: Send,
        products: [{ label: "SMS API", slug: "sms-api" }],
      },
      {
        title: "AI transcription and call notes",
        description:
          "Review customer conversations as text and document requirements so service teams follow up consistently.",
        outcome: "Service teams follow up consistently.",
        icon: Notebook,
        products: [{ label: "Call Recording", slug: "call-recording" }],
      },
      {
        title: "Analytics",
        description:
          "Identify recurring issues and customer requirements across stores and teams.",
        outcome: "Spot recurring issues across stores.",
        icon: Gauge,
        products: [{ label: "Call Analytics", slug: "call-analytics" }],
      },
    ],
    idealFor: [
      "Multi-store and franchise retailers",
      "Retail customer-service teams",
      "Businesses running separate lines per location",
    ],
    gain: {
      heading: "A connected retail operation",
      body: "Keep customers, stores and support teams moving together, with the visibility to spot recurring issues and serve customers faster.",
    },
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    icon: Building2,
    tagline: "Create better guest communication.",
    intro:
      "Route guests to the right team and give hotels, resorts and restaurants fast, professional communication between guests, reservations, front desks, service teams and management.",
    parties: ["Guests", "Reservations", "Front desk", "Service teams", "Management"],
    challenge: {
      heading: "Guests expect the right person, fast",
      body: "Hospitality depends on quick, professional hand-offs between guests, reservations, the front desk, service teams and management. A guest reaching the wrong department, or a request that isn't captured, shows up directly in the guest experience.",
    },
    handling: {
      heading: "Send guests to the right team, capture the request",
      body: [
        "A virtual phone number gives reservations its own line, separate from the front desk, that can ring through to whichever team is covering it that shift, with extensions and an IVR greeting sending each guest onward without misdirection.",
        "Busy reservation and service periods are held in a queue rather than dropped, and call transcription with call notes capture important guest requirements and follow-ups. Managers use recordings and analytics to understand service interactions and steadily improve the guest experience.",
      ],
      productLinks: [
        { phrase: "virtual phone number", slug: "virtual-numbers" },
        { phrase: "IVR", slug: "ivr" },
        { phrase: "queue", slug: "call-queue" },
        { phrase: "call transcription", slug: "call-recording" },
        { phrase: "call notes", slug: "call-analytics" },
        { phrase: "analytics", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Guest calls in",
        detail: "Guests reach the property looking for the right team.",
        icon: PhoneIncoming,
      },
      {
        label: "Sent to the right department",
        detail: "IVR, numbers and queues route guests without misdirection.",
        icon: ListChecks,
      },
      {
        label: "Request captured",
        detail: "Transcription and notes hold guest requirements and follow-ups.",
        icon: Notebook,
      },
    ],
    capabilities: [
      {
        title: "Virtual phone number for reservations",
        description:
          "A dedicated reservations line, separate from the front desk, that can ring through to whichever team is covering it, with extensions and IVR sending guests onward without misdirection.",
        outcome: "Reservations has its own line, not a shared one.",
        icon: Smartphone,
        products: [
          { label: "Virtual Phone Numbers", slug: "virtual-numbers" },
          { label: "IVR System", slug: "ivr" },
        ],
      },
      {
        title: "Call queues",
        description:
          "Keep busy reservation and service periods organised rather than dropping calls.",
        outcome: "Busy periods stay organised, not dropped.",
        icon: Route,
        products: [{ label: "Call Queue", slug: "call-queue" }],
      },
      {
        title: "Call notes and transcription",
        description:
          "Capture guest requirements and follow-ups as text so requests don't get lost between shifts.",
        outcome: "Requests survive the shift change.",
        icon: Notebook,
        products: [{ label: "Call Recording", slug: "call-recording" }],
      },
      {
        title: "Analytics",
        description:
          "Understand service interactions and improve the overall guest experience over time.",
        outcome: "The guest experience keeps improving.",
        icon: Gauge,
        products: [{ label: "Call Analytics", slug: "call-analytics" }],
      },
    ],
    idealFor: [
      "Hotels, resorts and restaurants",
      "Reservations and front-desk teams",
      "Guest-service and management teams",
    ],
    gain: {
      heading: "A better experience on every call",
      body: "Guests reach the right team quickly, their requests are captured, and managers can see how service is delivered, so the guest experience keeps improving.",
    },
  },
  {
    slug: "logistics",
    title: "Logistics",
    icon: Truck,
    tagline: "Keep customers, drivers and operations connected.",
    intro:
      "Organise continuous communication between customers, drivers, dispatchers, warehouses, branches and operations teams on one platform.",
    parties: ["Customers", "Drivers", "Dispatchers", "Warehouses", "Operations teams"],
    challenge: {
      heading: "Communication that never stops moving",
      body: "Logistics runs on constant coordination between customers, drivers, dispatchers, warehouses, branches and operations. Delivery instructions and customer requests move fast, and when they aren't captured or routed well, operations hit avoidable delays.",
    },
    handling: {
      heading: "Route the calls, message the updates, capture the detail",
      body: [
        "An AI voice assistant answers routine 'where is my delivery' calls directly from shipment status, freeing dispatchers for the calls that actually need a person, while SIP connectivity keeps customers, drivers and operations teams linked across every warehouse and branch on one platform.",
        "IVR and routing get the rest of each call to the right branch or team, SMS supports operational updates and customer notifications, and analytics helps managers understand communication volume and identify operational bottlenecks.",
      ],
      productLinks: [
        { phrase: "AI voice assistant", slug: "ai-voice-assistant" },
        { phrase: "SIP connectivity", slug: "sip-trunking" },
        { phrase: "IVR", slug: "ivr" },
        { phrase: "SMS", slug: "sms-api" },
        { phrase: "analytics", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Coordination begins",
        detail: "Customers, drivers and operations connect across sites.",
        icon: PhoneIncoming,
      },
      {
        label: "Routed and updated",
        detail: "Routing places calls; SMS sends operational updates.",
        icon: Route,
      },
      {
        label: "Detail captured",
        detail: "Transcription and notes hold delivery instructions and requests.",
        icon: FileText,
      },
    ],
    capabilities: [
      {
        title: "AI voice assistant for status calls",
        description:
          "Answer routine 'where is my delivery' calls automatically from shipment status, and hand off anything else to dispatch.",
        outcome: "Dispatchers field fewer routine status calls.",
        icon: Bot,
        products: [{ label: "AI Voice Assistant", slug: "ai-voice-assistant" }],
      },
      {
        title: "Multi-site connectivity",
        description:
          "Keep customers, drivers, dispatchers, warehouses and branches connected on one platform, with calls routed to the right branch or team.",
        outcome: "Every part of the operation stays connected.",
        icon: Network,
        products: [
          { label: "SIP Trunking", slug: "sip-trunking" },
          { label: "IVR System", slug: "ivr" },
        ],
      },
      {
        title: "SMS updates and notifications",
        description:
          "Send operational updates and customer notifications by message.",
        outcome: "Updates and notifications go out fast.",
        icon: Send,
        products: [{ label: "SMS API", slug: "sms-api" }],
      },
      {
        title: "Analytics",
        description:
          "Understand communication volume across dispatch, warehouse and customer calls, and identify operational bottlenecks.",
        outcome: "Find the bottlenecks slowing operations.",
        icon: Gauge,
        products: [{ label: "Call Analytics", slug: "call-analytics" }],
      },
    ],
    idealFor: [
      "Freight, courier and delivery operations",
      "Dispatch and warehouse teams",
      "Multi-branch logistics businesses",
    ],
    gain: {
      heading: "Coordination without the dropped detail",
      body: "Keep every part of the operation connected and capture the instructions and requests that keep deliveries moving, with the analytics to find bottlenecks.",
    },
  },
  {
    slug: "it-saas",
    title: "IT & SaaS",
    icon: Cloud,
    tagline: "Build communication directly into your technology.",
    intro:
      "Embed calling and messaging into your own applications with programmable voice, SMS, WhatsApp, WebRTC and SIP, then add communication intelligence on top.",
    parties: ["Developers", "Applications", "End users", "Customers"],
    challenge: {
      heading: "Communication shouldn't be a system beside your product",
      body: "IT and SaaS companies often need communication to live inside their own applications, not run as a separate tool users switch to. A standalone phone system can't become part of the workflows and product experiences these businesses are building.",
    },
    handling: {
      heading: "Programmable comms, plus intelligence",
      body: [
        "SipLink provides Voice API, SMS API, WhatsApp Business API, WebRTC SDK, SIP API, CRM integrations and programmable communication capabilities, so technology businesses can build calling and messaging directly into their applications.",
        "It also provides communication intelligence through AI, real-time and audio transcription, call notes and analytics, so SaaS products go beyond embedding a call to building workflows where conversations are transcribed, analysed, documented and connected to their applications. This supports CRM platforms, help-desk and staffing software, sales and healthcare applications, customer-service platforms and other products that need voice or messaging built in.",
      ],
      productLinks: [
        { phrase: "Voice API", slug: "voice-api" },
        { phrase: "SMS API", slug: "sms-api" },
        { phrase: "WhatsApp Business API", slug: "whatsapp-api" },
        { phrase: "WebRTC SDK", slug: "webrtc-sdk" },
        { phrase: "SIP API", slug: "sip-api" },
        { phrase: "CRM integrations", slug: "crm-integration" },
        { phrase: "call notes", slug: "call-analytics" },
        { phrase: "analytics", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Built into your app",
        detail: "Voice, SMS, WhatsApp, WebRTC and SIP APIs embed calling.",
        icon: Braces,
      },
      {
        label: "Runs in your workflows",
        detail: "Calls and messages flow inside your product, not beside it.",
        icon: Workflow,
      },
      {
        label: "Intelligence added on top",
        detail: "Transcription and analytics connect conversations back to your app.",
        icon: FileText,
      },
    ],
    capabilities: [
      {
        title: "Voice, SMS and WebRTC",
        description:
          "Place and receive calls from within your own application or straight in the browser, and send programmable messages alongside it.",
        outcome: "Calls and messages run inside your product.",
        icon: Braces,
        products: [
          { label: "Voice API", slug: "voice-api" },
          { label: "SMS API", slug: "sms-api" },
          { label: "WebRTC SDK", slug: "webrtc-sdk" },
        ],
      },
      {
        title: "WhatsApp Business API",
        description:
          "Reach customers on WhatsApp as part of your product's communication workflows.",
        outcome: "Reach customers on WhatsApp from your product.",
        icon: MessagesSquare,
        products: [{ label: "WhatsApp Business API", slug: "whatsapp-api" }],
      },
      {
        title: "SIP API",
        description:
          "Provision and manage SIP connectivity programmatically alongside your platform.",
        outcome: "Manage SIP connectivity programmatically.",
        icon: ServerCog,
        products: [{ label: "SIP API", slug: "sip-api" }],
      },
      {
        title: "CRM integrations",
        description:
          "Connect communication to the CRM and business systems your product works with.",
        outcome: "Communication ties into your business systems.",
        icon: Workflow,
        products: [{ label: "CRM Integration", slug: "crm-integration" }],
      },
      {
        title: "Transcription and analytics",
        description:
          "Transcribe, document and analyse conversations, and connect the results back to your app.",
        outcome: "Conversations become data in your app.",
        icon: FileText,
        products: [
          { label: "Call Recording", slug: "call-recording" },
          { label: "Call Analytics", slug: "call-analytics" },
        ],
      },
    ],
    idealFor: [
      "SaaS products embedding voice or messaging",
      "CRM, help-desk and staffing software",
      "Developer teams building communication workflows",
    ],
    gain: {
      heading: "Communication as part of your product",
      body: "Build calling and messaging into your application, then layer on transcription, documentation and analytics, so conversations become part of the workflow, not a system beside it.",
    },
  },
  {
    slug: "government",
    title: "Government",
    icon: Scale,
    tagline: "Make public-service communication more organised.",
    intro:
      "Organise communication across citizens, employees, departments and service centers with structured calling, routing and management-level visibility.",
    parties: ["Citizens", "Employees", "Departments", "Service centers"],
    challenge: {
      heading: "Public service means communication at scale",
      body: "Government departments manage communication across citizens, employees, departments and service centers. Without structure it's hard to route enquiries, document conversations for follow-up, and give management a clear view of service demand.",
    },
    handling: {
      heading: "Structure the interactions, surface the demand",
      body: [
        "A toll-free citizen line puts services behind a single free number, with an IVR directing each enquiry and a queue holding demand in order rather than returning a busy tone.",
        "For government support centers, transcription and call notes help authorised teams document conversations and identify follow-up requirements, messaging reaches citizens and employees without a call, and analytics provides management-level visibility into communication volumes and service demand.",
      ],
      productLinks: [
        { phrase: "toll-free citizen line", slug: "toll-free-numbers" },
        { phrase: "IVR", slug: "ivr" },
        { phrase: "queue", slug: "call-queue" },
        { phrase: "call notes", slug: "call-analytics" },
        { phrase: "messaging", slug: "sms-api" },
        { phrase: "analytics", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Citizen makes contact",
        detail: "Citizens and staff reach departments and service centers.",
        icon: PhoneIncoming,
      },
      {
        label: "Structured and routed",
        detail: "Business numbers, IVR, queues and routing direct each enquiry.",
        icon: ListChecks,
      },
      {
        label: "Documented for follow-up",
        detail: "Transcription and notes let authorised teams record it.",
        icon: Notebook,
      },
    ],
    capabilities: [
      {
        title: "Toll-free citizen line",
        description:
          "Give citizens a single free number to reach services, at no cost to the person calling, with IVR directing each enquiry to the right department.",
        outcome: "Cost is never a reason not to call.",
        icon: PhoneCall,
        products: [
          { label: "Toll-Free Numbers", slug: "toll-free-numbers" },
          { label: "IVR System", slug: "ivr" },
        ],
      },
      {
        title: "Call queues",
        description:
          "Keep service-center demand organised so citizens aren't met with a busy tone.",
        outcome: "Service demand stays organised.",
        icon: Route,
        products: [{ label: "Call Queue", slug: "call-queue" }],
      },
      {
        title: "Transcription and call notes",
        description:
          "Let authorised teams document conversations as text and capture follow-up requirements from citizen and internal calls.",
        outcome: "Follow-up requirements are captured.",
        icon: Notebook,
        products: [{ label: "Call Recording", slug: "call-recording" }],
      },
      {
        title: "Analytics",
        description:
          "Give management visibility into communication volumes and service demand.",
        outcome: "Management sees volumes and service demand.",
        icon: Gauge,
        products: [{ label: "Call Analytics", slug: "call-analytics" }],
      },
    ],
    idealFor: [
      "Government departments and agencies",
      "Public-service and support centers",
      "Teams documenting citizen interactions",
    ],
    gain: {
      heading: "Organised public-service communication",
      body: "Direct and document every interaction, and give management a clear view of communication volumes and service demand.",
    },
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    icon: Factory,
    tagline: "Connect operations across every location.",
    intro:
      "Connect corporate offices, factories, warehouses, production teams, suppliers and service departments through centralised communication management.",
    parties: ["Corporate offices", "Factories", "Warehouses", "Suppliers", "Service departments"],
    challenge: {
      heading: "Communication spread across sites",
      body: "Manufacturing communication is often spread across corporate offices, factories, warehouses, production teams, suppliers and service departments. Coordinating across all of them, and capturing the instructions and requests that pass between them, is hard when each site runs its own setup.",
    },
    handling: {
      heading: "One connected communication environment",
      body: [
        "SIP connectivity and organised extensions link corporate offices, factories and warehouses so multi-location communication runs through one platform, and existing factory and office lines can be ported onto SipLink so suppliers and partners keep dialling the numbers they already have.",
        "IVR and routing direct calls to the right site, production team or supplier line, while call recording, transcription and call notes capture instructions, supplier conversations and service requests, keeping detail from slipping between sites. Analytics gives management a centralised view of activity across every location.",
      ],
      productLinks: [
        { phrase: "SIP connectivity", slug: "sip-trunking" },
        { phrase: "ported onto SipLink", slug: "number-porting" },
        { phrase: "IVR", slug: "ivr" },
        { phrase: "call recording", slug: "call-recording" },
        { phrase: "call notes", slug: "call-analytics" },
        { phrase: "Analytics", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Sites communicate",
        detail: "Offices, factories, warehouses and suppliers connect.",
        icon: PhoneIncoming,
      },
      {
        label: "Routed across locations",
        detail: "SIP, extensions, IVR and routing link every site.",
        icon: Network,
      },
      {
        label: "Detail captured",
        detail: "Recording and notes hold instructions and service requests.",
        icon: Notebook,
      },
    ],
    capabilities: [
      {
        title: "SIP connectivity across sites",
        description:
          "Connect offices, factories and warehouses with SIP connectivity and organised extensions on one platform.",
        outcome: "Every site connects on one platform.",
        icon: Network,
        products: [{ label: "SIP Trunking", slug: "sip-trunking" }],
      },
      {
        title: "Number porting",
        description:
          "Move existing factory and office lines onto SipLink without changing the numbers suppliers already use.",
        outcome: "Suppliers keep dialling the numbers they have.",
        icon: Repeat,
        products: [{ label: "Number Porting", slug: "number-porting" }],
      },
      {
        title: "IVR and routing",
        description:
          "Direct calls to the right site, production team, supplier line or service department.",
        outcome: "Calls reach the right site or team.",
        icon: Route,
        products: [{ label: "IVR System", slug: "ivr" }],
      },
      {
        title: "Recording, transcription and call notes",
        description:
          "Capture supplier conversations, service requests and follow-up instructions, and review them as text.",
        outcome: "Instructions don't slip between sites.",
        icon: Mic,
        products: [{ label: "Call Recording", slug: "call-recording" }],
      },
      {
        title: "Centralised analytics",
        description:
          "Manage multi-location communication centrally and understand activity across sites.",
        outcome: "Manage every site's communication centrally.",
        icon: Gauge,
        products: [{ label: "Call Analytics", slug: "call-analytics" }],
      },
    ],
    idealFor: [
      "Multi-site manufacturers",
      "Production, warehouse and service teams",
      "Operations coordinating with suppliers",
    ],
    gain: {
      heading: "Operations connected, detail captured",
      body: "Bring communication across every site into one platform, and capture the instructions, supplier conversations and service requests that keep operations running.",
    },
  },
  {
    slug: "telecom-operators",
    title: "Telecom Operators",
    icon: RadioTower,
    tagline: "Build communication services on scalable voice infrastructure.",
    intro:
      "Give operators and communication service providers flexible voice infrastructure, SIP connectivity, SBC, number management and programmable services, that integrates into their own environments.",
    parties: ["Operators", "Service providers", "Customers", "SIP connections"],
    challenge: {
      heading: "Serving customers means scalable infrastructure",
      body: "Telecom operators and communication service providers need voice infrastructure flexible enough to support large numbers of customers, SIP connections, applications and communication workflows, and to integrate with the environments they already run.",
    },
    handling: {
      heading: "Infrastructure to build on, intelligence to add",
      body: [
        "SipLink provides SIP connectivity, SBC capabilities, number management, voice infrastructure, APIs, routing and programmable communication services that integrate into operator environments.",
        "It can also add communication intelligence through call recording, audio, AI and real-time transcription, analytics and call notes, so operators and their customers move beyond basic voice connectivity toward more intelligent communication services.",
      ],
      productLinks: [
        { phrase: "SIP connectivity", slug: "sip-trunking" },
        { phrase: "SBC capabilities", slug: "sbc" },
        { phrase: "call recording", slug: "call-recording" },
        { phrase: "analytics", slug: "call-analytics" },
        { phrase: "call notes", slug: "call-analytics" },
      ],
    },
    flow: [
      {
        label: "Connectivity provided",
        detail: "SIP, SBC and number management carry the traffic.",
        icon: Network,
      },
      {
        label: "Integrated into your environment",
        detail: "APIs and programmable services fit operator platforms.",
        icon: ServerCog,
      },
      {
        label: "Intelligence added",
        detail: "Recording, transcription and analytics enrich the service.",
        icon: FileText,
      },
    ],
    capabilities: [
      {
        title: "SIP connectivity",
        description:
          "Support large numbers of customers, SIP connections and communication workflows.",
        outcome: "Carry large volumes of customers and connections.",
        icon: Network,
        products: [{ label: "SIP Trunking", slug: "sip-trunking" }],
      },
      {
        title: "Session Border Controller",
        description:
          "A controlled layer between operator voice infrastructure and external SIP networks.",
        outcome: "A controlled layer to external SIP networks.",
        icon: ShieldCheck,
        products: [{ label: "Session Border Controller", slug: "sbc" }],
      },
      {
        title: "Number management",
        description:
          "Manage numbers across operator environments and their customers.",
        outcome: "Manage numbers across operators and customers.",
        icon: MapPin,
        products: [{ label: "DID Numbers", slug: "did-numbers" }],
      },
      {
        title: "APIs and programmable services",
        description:
          "Integrate voice, routing and programmable communication into operator platforms.",
        outcome: "Integrate voice into operator platforms.",
        icon: Braces,
        products: [
          { label: "Voice API", slug: "voice-api" },
          { label: "SMS API", slug: "sms-api" },
        ],
      },
      {
        title: "Recording, transcription and analytics",
        description:
          "Layer call recording, audio and AI transcription and analytics on top of connectivity, so operators and their customers move beyond basic voice.",
        outcome: "Move beyond basic voice connectivity.",
        icon: Gauge,
        products: [{ label: "Call Recording", slug: "call-recording" }],
      },
    ],
    idealFor: [
      "Telecom operators",
      "Communication service providers",
      "Platforms reselling voice to their own customers",
    ],
    gain: {
      heading: "Beyond basic connectivity",
      body: "Build on scalable voice infrastructure, then add recording, transcription and analytics, so you and your customers move toward more intelligent communication services.",
    },
  },
];

export function getIndustryDetail(slug: string): IndustryDetail | undefined {
  return industryDetails.find((item) => item.slug === slug);
}
