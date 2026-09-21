import {
  Braces,
  Building2,
  Cloud,
  Code2,
  Factory,
  FileText,
  Gauge,
  GraduationCap,
  Headset,
  HeartPulse,
  Landmark,
  ListChecks,
  MapPin,
  MessagesSquare,
  Mic,
  Network,
  Notebook,
  PhoneCall,
  RadioTower,
  Route,
  Scale,
  Send,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Truck,
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

/** A named capability point, rendered in the quiet card grid. */
export type IndustryPoint = {
  title: string;
  description: string;
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
  /** The situation the reader recognises. Left column of the problem spine. */
  challenge: { heading: string; body: string };
  /** How SipLink answers it. Right column of the problem spine. */
  handling: { heading: string; body: string[] };
  /** Concrete capabilities the source attributes to this industry. */
  capabilities: IndustryPoint[];
  /** Who this is for. */
  idealFor: string[];
  /** The payoff line that closes the argument. */
  gain: { heading: string; body: string };
};

export const industryDetails: IndustryDetail[] = [
  {
    slug: "call-centers",
    title: "Call Centers",
    icon: Headset,
    tagline: "Power every customer conversation.",
    intro:
      "Give agents the tools to perform at their best and managers full visibility across every interaction — inbound and outbound — on one platform built for high call volume.",
    challenge: {
      heading: "Reliable calling alone doesn't run a call center",
      body: "Agents need more than a clear line: they need calls routed to the right place, and supervisors need to see what is happening across the floor. Without structure and insight, conversations get dropped, coaching becomes guesswork, and no one can tell why performance moves the way it does.",
    },
    handling: {
      heading: "Route it, monitor it, learn from it",
      body: [
        "SipLink manages inbound and outbound communication with IVR, call queues and intelligent routing, so each caller reaches the right team quickly and the rest wait in an organised queue rather than a busy tone.",
        "Supervisors can support agents live with Whisper, Barge and Spy, while call recording and analytics keep a record of every interaction. AI-powered transcription, real-time transcription and call notes turn conversations into searchable information — so managers can review, coach and improve without replaying whole recordings.",
      ],
    },
    capabilities: [
      {
        title: "IVR and intelligent routing",
        description:
          "Automated menus and routing rules send each caller to the right team, department or next available agent.",
        icon: ListChecks,
      },
      {
        title: "Call queues",
        description:
          "Hold waiting callers in an organised queue and distribute them across agents to keep response times down.",
        icon: Route,
      },
      {
        title: "Supervisor Whisper, Barge and Spy",
        description:
          "Monitor live calls, whisper guidance to an agent, or join a conversation when a customer needs more help.",
        icon: Headset,
      },
      {
        title: "Recording and transcription",
        description:
          "Capture calls and generate AI, real-time and audio transcription so conversations become searchable text.",
        icon: Mic,
      },
      {
        title: "Call notes",
        description:
          "Attach notes to conversations so follow-ups, requirements and outcomes are documented, not remembered.",
        icon: Notebook,
      },
      {
        title: "Analytics and call insights",
        description:
          "Understand call volume, answered and missed calls and busy periods, and use insights to lift team performance.",
        icon: Gauge,
      },
    ],
    idealFor: [
      "Inbound and outbound contact centers",
      "BPO and customer-service operations",
      "Teams coaching agents on live calls",
    ],
    gain: {
      heading: "Conversations become information",
      body: "Turn every call into something you can review, measure and act on — so agents improve, managers stay informed, and the whole floor performs more consistently.",
    },
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    icon: HeartPulse,
    tagline: "Communication designed for healthcare workflows.",
    intro:
      "Bring voice, fax, messaging and high-volume communication between patients, providers, insurers and internal teams together on a HIPAA-compliant platform built for how care organisations actually work.",
    challenge: {
      heading: "Care runs on more than phone calls",
      body: "Healthcare and medical billing teams juggle patient calls, provider coordination, insurance follow-ups and document-based fax workflows — often in parallel, and always where accuracy and privacy matter. Managing each channel in isolation slows teams down and leaves conversations undocumented.",
    },
    handling: {
      heading: "Voice, fax and intelligence, together",
      body: [
        "SipLink combines business calling, fax, call recording, transcription, call analytics, SMS, IVR and contact-center capabilities into one HIPAA-compliant environment, so voice and document workflows sit side by side rather than in separate systems.",
        "For medical billing and Revenue Cycle Management teams, reliable voice and fax support document-driven work, and supervisors can use Whisper, Barge and Spy to monitor or assist RCM agents on live calls where appropriate. AI, real-time and audio transcription with call notes let authorised users review a transcript and notes to find follow-ups and requirements — instead of listening to an entire recording.",
      ],
    },
    capabilities: [
      {
        title: "HIPAA-compliant platform",
        description:
          "A communication environment suitable for practices and teams handling sensitive patient and provider information.",
        icon: ShieldCheck,
      },
      {
        title: "Business calling and fax",
        description:
          "Voice and fax together support the patient, provider and document-based workflows healthcare teams depend on.",
        icon: PhoneCall,
      },
      {
        title: "IVR and contact-center capabilities",
        description:
          "Route callers to the right department and organise high-volume patient and insurer communication.",
        icon: ListChecks,
      },
      {
        title: "Recording and transcription",
        description:
          "Record calls and generate AI, real-time and audio transcription so authorised users can review conversations as text.",
        icon: Mic,
      },
      {
        title: "Call notes",
        description:
          "Capture follow-ups, requirements and important details from patient and provider conversations.",
        icon: Notebook,
      },
      {
        title: "SMS and analytics",
        description:
          "Reach patients by message and use analytics to understand communication activity across teams.",
        icon: MessagesSquare,
      },
    ],
    idealFor: [
      "Practices coordinating patient communication",
      "Medical billing and RCM companies",
      "Teams handling provider and insurer follow-ups",
    ],
    gain: {
      heading: "A complete healthcare communication environment",
      body: "Voice, fax, supervision, recording, transcription and analytics working together — so teams communicate securely and nothing important goes undocumented.",
    },
  },
  {
    slug: "banking-finance",
    title: "Banking & Finance",
    icon: Landmark,
    tagline: "Turn financial conversations into actionable information.",
    intro:
      "Handle high volumes of customer conversations across sales, support, service and collections with the structure, accountability and visibility financial teams need.",
    challenge: {
      heading: "Handling calls isn't the same as understanding them",
      body: "Banking and financial-services teams manage large volumes of conversations where accuracy, accountability and visibility matter. Recordings alone don't help much when someone has to sit through an entire call to find out what was agreed or what needs to happen next.",
    },
    handling: {
      heading: "From handling calls to understanding them",
      body: [
        "SipLink provides structured calling, IVR, queues, recording, analytics and communication management for sales, support, service and collections teams — so every conversation is directed, captured and measurable.",
        "With AI-powered and real-time transcription, authorised teams can review conversations in text rather than depending entirely on audio. Call notes help agents and managers capture key details and follow-up requirements, while analytics gives visibility into communication activity and team performance.",
      ],
    },
    capabilities: [
      {
        title: "Structured calling and IVR",
        description:
          "Direct callers with automated menus and give sales, service and collections teams an organised calling environment.",
        icon: ListChecks,
      },
      {
        title: "Call queues",
        description:
          "Distribute high call volume across teams and hold waiting customers in an organised queue.",
        icon: Route,
      },
      {
        title: "Recording",
        description:
          "Capture conversations for accountability and review across regulated financial workflows.",
        icon: Mic,
      },
      {
        title: "AI and real-time transcription",
        description:
          "Review conversations as searchable text and find key information without replaying the audio.",
        icon: FileText,
      },
      {
        title: "Call notes",
        description:
          "Document important conversation details and follow-up requirements as work progresses.",
        icon: Notebook,
      },
      {
        title: "Call analytics",
        description:
          "See communication activity and team performance across sales, support, service and collections.",
        icon: Gauge,
      },
    ],
    idealFor: [
      "Sales and service desks in financial services",
      "Collections and account-management teams",
      "Operations that need conversation accountability",
    ],
    gain: {
      heading: "Know what's happening inside every call",
      body: "Move beyond simply handling calls to understanding them — with transcripts, notes and analytics that make each conversation something the business can act on.",
    },
  },
  {
    slug: "education",
    title: "Education",
    icon: GraduationCap,
    tagline: "Connect students, parents, faculty and administration.",
    intro:
      "Give institutions one organised communication environment across departments, campuses, students, parents, faculty and administrative teams.",
    challenge: {
      heading: "Communication scattered across a campus",
      body: "Educational institutions coordinate across many departments, sites and audiences at once. Admissions and support teams field frequent calls, and without structure it becomes hard to route enquiries, capture requirements and keep follow-up consistent.",
    },
    handling: {
      heading: "Organise the calls, capture the details",
      body: [
        "SipLink provides business calling, IVR, call queues, messaging, recording and analytics to help institutions organise communication across departments and campuses.",
        "For support and admissions teams handling frequent calls, transcription and call notes make it quick to review a conversation, capture requirements and follow up properly. Real-time transcription can give teams immediate visibility into ongoing conversations where applicable, while administrators gain a clearer view of how calls are handled.",
      ],
    },
    capabilities: [
      {
        title: "IVR and call routing",
        description:
          "Guide callers to admissions, departments or support and route enquiries to the right place.",
        icon: ListChecks,
      },
      {
        title: "Call queues",
        description:
          "Handle busy admissions and support periods without callers hitting a busy tone.",
        icon: Route,
      },
      {
        title: "Messaging",
        description:
          "Reach students, parents and staff by message alongside voice communication.",
        icon: MessagesSquare,
      },
      {
        title: "Recording and transcription",
        description:
          "Record calls and review them as text, with real-time transcription where applicable.",
        icon: Mic,
      },
      {
        title: "Call notes",
        description:
          "Capture enquiry requirements and follow-ups so nothing slips between departments.",
        icon: Notebook,
      },
      {
        title: "Analytics",
        description:
          "Give administrators visibility into call volumes and how communication is being handled.",
        icon: Gauge,
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
    challenge: {
      heading: "Communication that has to keep moving",
      body: "Retail runs on fast hand-offs between customers, individual stores, sales staff and support. When each store and function communicates in isolation, it's hard to route customers well, keep separate identities per location, or spot the issues that keep coming back.",
    },
    handling: {
      heading: "One environment, many stores",
      body: [
        "SipLink helps retailers manage customer calls, store communication, IVR, call routing, messaging, recording and analytics from one centralised environment — so the whole operation communicates as a connected business.",
        "For customer-service teams, AI transcription, call notes and analytics surface customer requirements and recurring issues. SMS supports customer communication and notifications, and multiple business numbers keep separate lines for different stores, departments or functions.",
      ],
    },
    capabilities: [
      {
        title: "IVR and call routing",
        description:
          "Route customers to the right store, sales team or support department automatically.",
        icon: Route,
      },
      {
        title: "Multiple business numbers",
        description:
          "Keep separate numbers for different stores, departments or business functions.",
        icon: PhoneCall,
      },
      {
        title: "Business SMS",
        description:
          "Support customer communication and notifications alongside voice.",
        icon: Send,
      },
      {
        title: "Recording and transcription",
        description:
          "Capture calls and use AI transcription to review customer conversations as text.",
        icon: Mic,
      },
      {
        title: "Call notes",
        description:
          "Document customer requirements so service teams can follow up consistently.",
        icon: Notebook,
      },
      {
        title: "Analytics",
        description:
          "Identify recurring issues and customer requirements across stores and teams.",
        icon: Gauge,
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
    challenge: {
      heading: "Guests expect the right person, fast",
      body: "Hospitality depends on quick, professional hand-offs between guests, reservations, the front desk, service teams and management. A guest reaching the wrong department, or a request that isn't captured, shows up directly in the guest experience.",
    },
    handling: {
      heading: "Send guests to the right team, capture the request",
      body: [
        "SipLink routes guests to the appropriate department and supports business numbers, extensions, IVR, queues, recording and analytics — so calls reach the right team and busy periods stay organised.",
        "For guest-service teams, call transcription and call notes capture important guest requirements and follow-ups. Managers can use recordings and analytics to understand service interactions and steadily improve the guest communication experience.",
      ],
    },
    capabilities: [
      {
        title: "IVR and guest routing",
        description:
          "Send guests to reservations, the front desk, service or management without misdirected calls.",
        icon: ListChecks,
      },
      {
        title: "Numbers and extensions",
        description:
          "Business numbers and extensions organised around departments and service teams.",
        icon: PhoneCall,
      },
      {
        title: "Call queues",
        description:
          "Keep busy reservation and service periods organised rather than dropping calls.",
        icon: Route,
      },
      {
        title: "Recording and transcription",
        description:
          "Record guest calls and review them as text to understand service interactions.",
        icon: Mic,
      },
      {
        title: "Call notes",
        description:
          "Capture guest requirements and follow-ups so requests don't get lost between shifts.",
        icon: Notebook,
      },
      {
        title: "Analytics",
        description:
          "Understand service interactions and improve the overall guest experience over time.",
        icon: Gauge,
      },
    ],
    idealFor: [
      "Hotels, resorts and restaurants",
      "Reservations and front-desk teams",
      "Guest-service and management teams",
    ],
    gain: {
      heading: "A better experience on every call",
      body: "Guests reach the right team quickly, their requests are captured, and managers can see how service is delivered — so the guest experience keeps improving.",
    },
  },
  {
    slug: "logistics",
    title: "Logistics",
    icon: Truck,
    tagline: "Keep customers, drivers and operations connected.",
    intro:
      "Organise continuous communication between customers, drivers, dispatchers, warehouses, branches and operations teams on one platform.",
    challenge: {
      heading: "Communication that never stops moving",
      body: "Logistics runs on constant coordination between customers, drivers, dispatchers, warehouses, branches and operations. Delivery instructions and customer requests move fast, and when they aren't captured or routed well, operations hit avoidable delays.",
    },
    handling: {
      heading: "Route the calls, message the updates, capture the detail",
      body: [
        "SipLink organises these conversations through business calling, routing, IVR, SMS, call recording and analytics — so customers, drivers and operations teams stay connected across sites.",
        "SMS supports operational updates and customer notifications, while call transcription and call notes capture delivery instructions, customer requests and follow-up information. Managers can use analytics to understand communication volume and identify operational bottlenecks.",
      ],
    },
    capabilities: [
      {
        title: "IVR and call routing",
        description:
          "Direct customers, drivers and operations calls to the right branch or team.",
        icon: Route,
      },
      {
        title: "SMS updates and notifications",
        description:
          "Send operational updates and customer notifications by message.",
        icon: Send,
      },
      {
        title: "Call recording",
        description:
          "Capture conversations across dispatch, warehouse and customer communication.",
        icon: Mic,
      },
      {
        title: "Transcription and call notes",
        description:
          "Capture delivery instructions, customer requests and follow-up information as text.",
        icon: FileText,
      },
      {
        title: "Multi-site communication",
        description:
          "Keep customers, drivers, dispatchers, warehouses and branches connected on one platform.",
        icon: Network,
      },
      {
        title: "Analytics",
        description:
          "Understand communication volume and identify operational bottlenecks.",
        icon: Gauge,
      },
    ],
    idealFor: [
      "Freight, courier and delivery operations",
      "Dispatch and warehouse teams",
      "Multi-branch logistics businesses",
    ],
    gain: {
      heading: "Coordination without the dropped detail",
      body: "Keep every part of the operation connected and capture the instructions and requests that keep deliveries moving — with the analytics to find bottlenecks.",
    },
  },
  {
    slug: "it-saas",
    title: "IT & SaaS",
    icon: Cloud,
    tagline: "Build communication directly into your technology.",
    intro:
      "Embed calling and messaging into your own applications with programmable voice, SMS, WhatsApp, WebRTC and SIP — then add communication intelligence on top.",
    challenge: {
      heading: "Communication shouldn't be a system beside your product",
      body: "IT and SaaS companies often need communication to live inside their own applications, not run as a separate tool users switch to. A standalone phone system can't become part of the workflows and product experiences these businesses are building.",
    },
    handling: {
      heading: "Programmable comms, plus intelligence",
      body: [
        "SipLink provides Voice API, SMS API, WhatsApp Business API, WebRTC SDK, SIP API, CRM integrations and programmable communication capabilities, so technology businesses can build calling and messaging directly into their applications.",
        "It also provides communication intelligence through AI, real-time and audio transcription, call notes and analytics — so SaaS products go beyond embedding a call to building workflows where conversations are transcribed, analysed, documented and connected to their applications. This supports CRM platforms, help-desk and staffing software, sales and healthcare applications, customer-service platforms and other products that need voice or messaging built in.",
      ],
    },
    capabilities: [
      {
        title: "Voice and SMS APIs",
        description:
          "Place and receive calls and send programmable messages from within your own application.",
        icon: Braces,
      },
      {
        title: "WhatsApp Business API",
        description:
          "Reach customers on WhatsApp as part of your product's communication workflows.",
        icon: MessagesSquare,
      },
      {
        title: "WebRTC SDK",
        description:
          "Add calling straight into the browser and your web application.",
        icon: Code2,
      },
      {
        title: "SIP API",
        description:
          "Provision and manage SIP connectivity programmatically alongside your platform.",
        icon: ServerCog,
      },
      {
        title: "CRM integrations",
        description:
          "Connect communication to the CRM and business systems your product works with.",
        icon: Workflow,
      },
      {
        title: "Transcription and analytics",
        description:
          "Transcribe, document and analyse conversations, and connect the results back to your app.",
        icon: FileText,
      },
    ],
    idealFor: [
      "SaaS products embedding voice or messaging",
      "CRM, help-desk and staffing software",
      "Developer teams building communication workflows",
    ],
    gain: {
      heading: "Communication as part of your product",
      body: "Build calling and messaging into your application, then layer on transcription, documentation and analytics — so conversations become part of the workflow, not a system beside it.",
    },
  },
  {
    slug: "government",
    title: "Government",
    icon: Scale,
    tagline: "Make public-service communication more organised.",
    intro:
      "Organise communication across citizens, employees, departments and service centers with structured calling, routing and management-level visibility.",
    challenge: {
      heading: "Public service means communication at scale",
      body: "Government departments manage communication across citizens, employees, departments and service centers. Without structure it's hard to route enquiries, document conversations for follow-up, and give management a clear view of service demand.",
    },
    handling: {
      heading: "Structure the interactions, surface the demand",
      body: [
        "SipLink helps organise these interactions through business numbers, IVR, call queues, routing, recording, analytics and messaging — so citizen and internal communication is directed and captured.",
        "For government support centers, transcription and call notes help authorised teams document conversations and identify follow-up requirements, while analytics provides management-level visibility into communication volumes and service demand.",
      ],
    },
    capabilities: [
      {
        title: "IVR and routing",
        description:
          "Guide citizens and staff to the right department or service center automatically.",
        icon: ListChecks,
      },
      {
        title: "Call queues",
        description:
          "Keep service-center demand organised so citizens aren't met with a busy tone.",
        icon: Route,
      },
      {
        title: "Business numbers and messaging",
        description:
          "Organise departmental numbers and reach citizens and employees by message.",
        icon: PhoneCall,
      },
      {
        title: "Recording and transcription",
        description:
          "Record calls and let authorised teams document conversations as text.",
        icon: Mic,
      },
      {
        title: "Call notes",
        description:
          "Capture follow-up requirements from citizen and internal conversations.",
        icon: Notebook,
      },
      {
        title: "Analytics",
        description:
          "Give management visibility into communication volumes and service demand.",
        icon: Gauge,
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
    challenge: {
      heading: "Communication spread across sites",
      body: "Manufacturing communication is often spread across corporate offices, factories, warehouses, production teams, suppliers and service departments. Coordinating across all of them — and capturing the instructions and requests that pass between them — is hard when each site runs its own setup.",
    },
    handling: {
      heading: "One connected communication environment",
      body: [
        "SipLink connects these environments through business calling, SIP connectivity, extensions, routing, IVR, messaging and centralised communication management — so multi-location communication runs through one platform.",
        "For operational and support teams, call recording, transcription, call notes and analytics capture important instructions, supplier conversations, service requests and follow-up requirements — keeping detail from slipping between sites.",
      ],
    },
    capabilities: [
      {
        title: "SIP connectivity and extensions",
        description:
          "Connect offices, factories and warehouses with SIP connectivity and organised extensions.",
        icon: Network,
      },
      {
        title: "IVR and routing",
        description:
          "Direct calls to the right site, production team, supplier line or service department.",
        icon: Route,
      },
      {
        title: "Messaging",
        description:
          "Support operational communication across locations and teams.",
        icon: MessagesSquare,
      },
      {
        title: "Recording and transcription",
        description:
          "Capture supplier conversations and service requests and review them as text.",
        icon: Mic,
      },
      {
        title: "Call notes",
        description:
          "Document instructions and follow-up requirements from operational calls.",
        icon: Notebook,
      },
      {
        title: "Centralised management and analytics",
        description:
          "Manage multi-location communication centrally and understand activity across sites.",
        icon: Gauge,
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
      "Give operators and communication service providers flexible voice infrastructure — SIP connectivity, SBC, number management and programmable services — that integrates into their own environments.",
    challenge: {
      heading: "Serving customers means scalable infrastructure",
      body: "Telecom operators and communication service providers need voice infrastructure flexible enough to support large numbers of customers, SIP connections, applications and communication workflows — and to integrate with the environments they already run.",
    },
    handling: {
      heading: "Infrastructure to build on, intelligence to add",
      body: [
        "SipLink provides SIP connectivity, SBC capabilities, number management, voice infrastructure, APIs, routing and programmable communication services that integrate into operator environments.",
        "It can also add communication intelligence through call recording, audio, AI and real-time transcription, analytics and call notes — so operators and their customers move beyond basic voice connectivity toward more intelligent communication services.",
      ],
    },
    capabilities: [
      {
        title: "SIP connectivity",
        description:
          "Support large numbers of customers, SIP connections and communication workflows.",
        icon: Network,
      },
      {
        title: "Session Border Controller",
        description:
          "A controlled layer between operator voice infrastructure and external SIP networks.",
        icon: ShieldCheck,
      },
      {
        title: "Number management",
        description:
          "Manage numbers across operator environments and their customers.",
        icon: MapPin,
      },
      {
        title: "APIs and programmable services",
        description:
          "Integrate voice, routing and programmable communication into operator platforms.",
        icon: Braces,
      },
      {
        title: "Recording and transcription",
        description:
          "Add call recording and audio, AI and real-time transcription on top of connectivity.",
        icon: Mic,
      },
      {
        title: "Analytics and call notes",
        description:
          "Give operators and their customers more intelligent communication services.",
        icon: Gauge,
      },
    ],
    idealFor: [
      "Telecom operators",
      "Communication service providers",
      "Platforms reselling voice to their own customers",
    ],
    gain: {
      heading: "Beyond basic connectivity",
      body: "Build on scalable voice infrastructure, then add recording, transcription and analytics — so you and your customers move toward more intelligent communication services.",
    },
  },
];

export function getIndustryDetail(slug: string): IndustryDetail | undefined {
  return industryDetails.find((item) => item.slug === slug);
}
