import {
  Activity,
  ArrowLeftRight,
  BadgeCheck,
  BarChart3,
  Book,
  BookOpen,
  Building2,
  Cable,
  ClipboardList,
  Clock,
  CloudCog,
  Code2,
  Download,
  FileSpreadsheet,
  GitBranch,
  GraduationCap,
  Headphones,
  Headset,
  HeartHandshake,
  LayoutGrid,
  Lock,
  Map,
  MapPin,
  MessagesSquare,
  Network,
  Newspaper,
  Phone,
  PhoneCall,
  Quote,
  Radar,
  Rocket,
  Router,
  ScrollText,
  ServerCog,
  ShieldCheck,
  Signal,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Content model for the Resources section under /resources/[slug].
 *
 * These pages are "generic" in the sense of the build contract: the source
 * documents are near-empty for most of them, so the copy here is written from
 * SipLink's real positioning (cloud communications, SIP, voice, APIs, a Class
 * A ISP with carrier-neutral POPs) rather than lifted from a doc.
 *
 * Guardrails obeyed throughout (see lib/site.ts and the build contract):
 *  - No uptime/SLA percentages, no country counts, no SOC 2 / ISO / PCI / GDPR
 *    claims, no customer/award counts, no named partners, no invented pricing,
 *    no fake download counts.
 *  - Case studies, testimonials and success stories do NOT invent named
 *    customers, metrics or ROI. The only real customer quotes live in
 *    lib/site.ts (`reviews`), and the Testimonials page imports them there.
 *  - FAQ answers are original education on VoIP/SIP/PBX/DID/cloud topics.
 *  - SLA / network-status / coverage-map describe commitments qualitatively.
 */

/** A titled block of body paragraphs. */
export type ProseSection = {
  heading: string;
  body: string[];
};

/** A card in the "what this covers" grid. */
export type ResourcePoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** A question and its answer, for the FAQ accordion. */
export type Faq = {
  question: string;
  answer: string;
};

/** A named topic area, used on the blog and knowledge-base landing pages. */
export type ResourceTopic = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ResourceGroup =
  | "Learn"
  | "Customer Stories"
  | "Downloads"
  | "Network";

export type ResourceDetail = {
  slug: string;
  title: string;
  group: ResourceGroup;
  /** Short line under the page title. */
  tagline: string;
  /** Opening paragraph. */
  intro: string;
  icon: LucideIcon;
  /** Eyebrow shown above the hero title. */
  eyebrow: string;
  /** Primary CTA label + href for the hero. */
  cta: { label: string; href: string };
  /** Secondary hero CTA. */
  secondaryCta?: { label: string; href: string };
  /** Longer explanatory sections (rendered as prose). */
  sections?: ProseSection[];
  /** Grid of feature/coverage cards. */
  points?: ResourcePoint[];
  /** Heading shown above the points grid. */
  pointsHeading?: string;
  /** Topic areas (blog / knowledge base). */
  topics?: ResourceTopic[];
  topicsHeading?: string;
  /** Questions and answers (faqs page). */
  faqs?: Faq[];
  /** Closing note shown near the CTA (honest framing where relevant). */
  note?: string;
  /** Overrides the default closing CTA heading. */
  closingHeading?: string;
  closingBody?: string;
  /**
   * True when the page reuses the real reviews from lib/site.ts rather than
   * any content stored here. The page component handles the rendering.
   */
  usesReviews?: boolean;
};

export const resourceDetails: ResourceDetail[] = [
  // ------------------------------------------------------------------ Learn
  {
    slug: "blog",
    title: "SipLink Blog",
    group: "Learn",
    eyebrow: "Learn",
    tagline: "Practical writing on cloud communications.",
    intro:
      "The SipLink blog is where our engineers and product team share what we have learned building and running business voice — how SIP actually behaves, what makes a migration go smoothly, and how to get more out of the platform you already run.",
    icon: Newspaper,
    cta: { label: "Talk to our team", href: "/contact" },
    secondaryCta: { label: "Explore the platform", href: "/products" },
    sections: [
      {
        heading: "Written by the people who run the network",
        body: [
          "Most communications writing is either marketing or reference documentation. We aim for something in between: short, honest explanations of the decisions a business faces when it moves voice to the cloud, written by the same people who provision trunks and answer support tickets.",
          "Rather than chase news, we focus on the questions we are actually asked — why a call quality problem is almost never the codec, how number porting really works, and what changes on the first Monday after a cutover.",
        ],
      },
    ],
    topicsHeading: "What we write about",
    topics: [
      {
        title: "Cloud telephony fundamentals",
        description:
          "How hosted PBX, SIP trunking and virtual numbers fit together, and when each one is the right choice.",
        icon: CloudCog,
      },
      {
        title: "Migrating off legacy systems",
        description:
          "Moving from PRI lines and on-premise PBX hardware to a cloud platform without disrupting the business.",
        icon: ArrowLeftRight,
      },
      {
        title: "Call quality and networks",
        description:
          "What jitter, latency and packet loss do to a call, and how QoS and a well-designed network keep voice clear.",
        icon: Waves,
      },
      {
        title: "Contact centre operations",
        description:
          "Queues, routing strategies, recording and analytics — and how to read the numbers they produce.",
        icon: Headset,
      },
      {
        title: "Building with the APIs",
        description:
          "Patterns for adding voice, SMS and WhatsApp to your own applications with the SipLink communication APIs.",
        icon: Code2,
      },
      {
        title: "Security and compliance",
        description:
          "Encrypted signalling, role-based access and what a HIPAA-compliant phone system means in practice.",
        icon: ShieldCheck,
      },
    ],
    note:
      "New articles are published as we have something genuinely useful to say. Subscribe by getting in touch and we will let you know when a topic you care about goes live.",
    closingHeading: "Have a topic you want us to cover?",
    closingBody:
      "Tell us the communications problem you are wrestling with. If it is a good question, it usually makes a good article — and we will answer it directly in the meantime.",
  },
  {
    slug: "knowledge-base",
    title: "Knowledge Base",
    group: "Learn",
    eyebrow: "Learn",
    tagline: "How-to guides, setup walkthroughs and troubleshooting.",
    intro:
      "The knowledge base collects the step-by-step guidance our support team uses every day — how to configure the platform, set up devices and diagnose the handful of issues that account for most support tickets.",
    icon: BookOpen,
    cta: { label: "Contact support", href: "/contact" },
    secondaryCta: { label: "Read the API docs", href: "/developers/api-docs" },
    sections: [
      {
        heading: "Answers before you need to raise a ticket",
        body: [
          "Whether you administer the platform for your whole organisation or just want your own extension working on your phone, the knowledge base is organised so you can find the relevant article quickly and follow it end to end.",
          "For anything a guide does not cover, our support team is available around the clock by phone, email, chat and WhatsApp. Every article is written and reviewed by the same team, so what you read matches what they will tell you.",
        ],
      },
    ],
    topicsHeading: "Guides by area",
    topics: [
      {
        title: "Getting started",
        description:
          "First-time setup of your account, users and extensions, and the basics of the admin and user portals.",
        icon: Rocket,
      },
      {
        title: "Phones and softphones",
        description:
          "Provisioning IP desk phones, installing the desktop and mobile apps, and bring-your-own-device configuration.",
        icon: Phone,
      },
      {
        title: "Call routing and IVR",
        description:
          "Building menus, ring groups, queues, business-hour rules and voicemail so calls reach the right place.",
        icon: GitBranch,
      },
      {
        title: "Numbers and porting",
        description:
          "Adding DID and toll-free numbers, assigning them to users, and what to expect during a number port.",
        icon: PhoneCall,
      },
      {
        title: "Recording and reporting",
        description:
          "Turning on call recording, controlling access, and downloading call history and CDR reports.",
        icon: BarChart3,
      },
      {
        title: "Troubleshooting",
        description:
          "Diagnosing one-way audio, registration failures and call quality — and the details to gather before you call us.",
        icon: Wrench,
      },
    ],
    note:
      "Articles are added and updated as the platform evolves. If a guide is missing for something you are trying to do, tell us — writing it is usually the fastest way to help the next person too.",
    closingHeading: "Cannot find the answer?",
    closingBody:
      "Our support team answers around the clock by phone, email, chat and WhatsApp. Reach out and an expert will stay with your issue until it is resolved.",
  },
  {
    slug: "faqs",
    title: "Frequently Asked Questions",
    group: "Learn",
    eyebrow: "Learn",
    tagline: "Clear answers on VoIP, SIP, PBX and cloud calling.",
    intro:
      "New to cloud communications, or comparing it with the phone system you have now? These are the questions businesses ask us most often, answered plainly and without jargon.",
    icon: Sparkles,
    cta: { label: "Ask us anything", href: "/contact" },
    secondaryCta: { label: "See pricing", href: "/pricing" },
    faqs: [
      {
        question: "What is VoIP?",
        answer:
          "VoIP stands for Voice over Internet Protocol. Instead of sending your call over the traditional telephone network, VoIP digitises your voice and carries it as data over an internet connection. For the caller it feels like any other phone call; underneath, it removes the need for dedicated phone lines and the hardware that goes with them.",
      },
      {
        question: "What is SIP, and how is it different from VoIP?",
        answer:
          "SIP (Session Initiation Protocol) is the signalling protocol that sets up, manages and ends a VoIP call — the part that says who is calling whom, whether they answer, and when the call ends. VoIP is the broad idea of carrying voice over the internet; SIP is the widely used standard that makes it work. When people talk about SIP trunking, they mean using SIP to connect a phone system to the outside telephone network.",
      },
      {
        question: "What is a PBX, and what does hosted or cloud PBX mean?",
        answer:
          "A PBX (Private Branch Exchange) is the switchboard that routes calls inside a business — extensions, transfers, menus and voicemail. Traditionally it was a physical box on your premises. A hosted or cloud PBX delivers the same capabilities from the provider's data centres over the internet, so there is no hardware to buy, patch or maintain, and staff can connect from the office, home or a mobile device.",
      },
      {
        question: "What is SIP trunking?",
        answer:
          "A SIP trunk is a virtual connection between your existing phone system (an IP-PBX) and the telephone network, delivered over the internet using SIP. It replaces traditional physical lines such as PRI or analogue trunks, typically at lower cost, and lets you add or remove capacity far more quickly than provisioning new lines.",
      },
      {
        question: "What is a DID number?",
        answer:
          "DID stands for Direct Inward Dialing. A DID number connects callers straight through to a specific person, department, extension or application, without passing through a main switchboard or menu. It lets you give individual staff or teams their own public number while still running everything through one phone system.",
      },
      {
        question: "Can I keep my existing phone number if I switch?",
        answer:
          "Yes. Number porting moves your existing business numbers to SipLink while keeping the numbers your customers already know. We validate the numbers and account details, plan the migration and configure the numbers on our platform, and the process is designed to keep your service running through the transition. There is no need to reprint stationery or update every listing.",
      },
      {
        question: "Do I need to replace my current phones or PBX?",
        answer:
          "Not necessarily. If you have an IP-PBX, SIP trunking connects it to our network so your existing equipment keeps working. If you would rather retire on-premise hardware, a hosted or cloud PBX replaces it entirely. Many businesses run a hybrid during a phased migration. We recommend the path that fits the equipment you have already paid for.",
      },
      {
        question: "What internet connection do I need for good call quality?",
        answer:
          "Voice needs relatively little bandwidth but is sensitive to network conditions — jitter, latency and packet loss matter more than raw speed. A stable business-grade connection with quality of service (QoS) configured to prioritise voice traffic gives the best results. As a licensed ISP, SipLink can provide the connectivity and the voice service together and tune the network for calls.",
      },
      {
        question: "Is a cloud phone system secure?",
        answer:
          "A well-run cloud platform can be more secure than an ageing on-premise system. Where the deployment supports it, SipLink uses TLS-encrypted SIP signalling and SRTP-encrypted media, two-factor authentication on user and admin portals, role-based access controls and IP access restrictions. Our platform is HIPAA compliant, making it suitable for healthcare and other regulated work.",
      },
      {
        question: "Can I use my business number on my mobile and laptop?",
        answer:
          "Yes. With a cloud PBX your extension follows you across IP desk phones, desktop softphones, the browser and mobile apps for iOS and Android. Calls to your business number can ring your desk and your mobile together, or follow you from one device to the next, so your location stops being a constraint on who can answer.",
      },
      {
        question: "How does call recording work?",
        answer:
          "Recording can be automatic or started on demand, covering inbound and outbound calls. Recordings are stored securely, with role-based access controlling who can search, replay and download them, and can be exported for your own retention. Recording is commonly used for quality assurance, agent training, dispute resolution and regulated environments.",
      },
      {
        question: "Can I add voice, SMS or WhatsApp to my own application?",
        answer:
          "Yes. Our communication APIs let developers build calling, messaging and WhatsApp conversations directly into websites, applications and CRM platforms, along with a WebRTC SDK for in-browser calling. You get the telephony capability without having to build carrier relationships and media handling yourself.",
      },
      {
        question: "What kind of support does SipLink provide?",
        answer:
          "Support is available around the clock by phone, email, chat and WhatsApp. Our approach is that a named expert owns your issue from the first message until it is resolved, keeping you informed along the way, rather than passing you between queues.",
      },
    ],
    closingHeading: "Still have a question?",
    closingBody:
      "If your question is not answered here, ask us directly. A real person on our team will get back to you — usually with a straight answer rather than a sales pitch.",
  },

  // -------------------------------------------------------- Customer Stories
  {
    slug: "case-studies",
    title: "Case Studies",
    group: "Customer Stories",
    eyebrow: "Customer Stories",
    tagline: "In-depth looks at how businesses deploy SipLink.",
    intro:
      "Detailed, written-up case studies are something we are building with our customers rather than publishing before they are ready. In the meantime, here is an honest picture of the kinds of deployments SipLink supports and the outcomes they are designed to achieve.",
    icon: ClipboardList,
    cta: { label: "Discuss your deployment", href: "/contact" },
    secondaryCta: { label: "See what customers say", href: "/resources/testimonials" },
    sections: [
      {
        heading: "Real deployments, described honestly",
        body: [
          "We would rather show you a true account of a deployment than a polished story with invented numbers. Full case studies are prepared together with each customer and published only with their agreement, so they take time to do properly.",
          "What we can tell you now is the shape of the work: the situations businesses come to us with, how a SipLink solution is put together for them, and the qualitative outcomes those solutions are built to deliver. If one of these sounds like your business, the best next step is a conversation.",
        ],
      },
    ],
    pointsHeading: "The kinds of deployments we support",
    points: [
      {
        title: "Retiring a legacy PBX",
        description:
          "A business with ageing on-premise hardware moves to a hosted PBX, keeps its existing numbers through porting, and removes the maintenance burden entirely.",
        icon: ServerCog,
      },
      {
        title: "Connecting existing equipment",
        description:
          "An organisation with an IP-PBX it wants to keep connects it to our network over SIP trunks for lower per-channel cost and capacity that flexes with demand.",
        icon: Router,
      },
      {
        title: "Scaling a contact centre",
        description:
          "A support or sales operation adds queues, routing, recording and analytics so high call volumes are handled in a structured way instead of returning busy signals.",
        icon: Headset,
      },
      {
        title: "Unifying a distributed team",
        description:
          "A multi-site or remote workforce shares one phone system across desk phones, softphones and mobiles, so location stops deciding who can answer a call.",
        icon: Users,
      },
      {
        title: "Building voice into a product",
        description:
          "A software team uses the communication APIs and WebRTC SDK to add calling and messaging to their own application without building telephony from scratch.",
        icon: Code2,
      },
      {
        title: "Communications for regulated work",
        description:
          "A healthcare or finance operation runs on a HIPAA-compliant platform with encrypted signalling, call recording and role-based access to sensitive conversations.",
        icon: ShieldCheck,
      },
    ],
    note:
      "We deliberately do not publish invented metrics or named-customer results. Every figure we ever attach to a case study will come from the customer it belongs to.",
    closingHeading: "Could your deployment be our next case study?",
    closingBody:
      "Tell us how your teams communicate today. We will map it to a configuration, plan the migration with you, and — if it goes well — we would love to write it up together.",
  },
  {
    slug: "testimonials",
    title: "Testimonials",
    group: "Customer Stories",
    eyebrow: "Customer Stories",
    tagline: "What SipLink customers say, in their own words.",
    intro:
      "These are genuine reviews from SipLink customers, published on our Google Business Profile and reproduced here as written. We do not write our own testimonials — every quote below belongs to a real customer.",
    icon: Quote,
    cta: { label: "Talk to our team", href: "/contact" },
    secondaryCta: { label: "Explore the platform", href: "/products" },
    usesReviews: true,
    closingHeading: "Join the businesses that rely on SipLink",
    closingBody:
      "The theme running through these reviews is support that answers and services that just work. Tell us what your business needs and we will show you the same.",
  },
  {
    slug: "success-stories",
    title: "Success Stories",
    group: "Customer Stories",
    eyebrow: "Customer Stories",
    tagline: "The outcomes SipLink is built to deliver.",
    intro:
      "Rather than dress up invented figures as success stories, we would rather be straight with you about the outcomes SipLink is designed to produce — described in terms of what actually changes for a business, not made-up numbers.",
    icon: Trophy,
    cta: { label: "Start your success story", href: "/contact" },
    secondaryCta: { label: "Read customer reviews", href: "/resources/testimonials" },
    sections: [
      {
        heading: "What success looks like on SipLink",
        body: [
          "The businesses that get the most from SipLink tend to be solving one of a few recurring problems: costs they cannot control, hardware they no longer want to run, teams that have outgrown their phone system, or customers they are struggling to answer at volume.",
          "Success, for them, is qualitative before it is quantitative — fewer missed calls, less time lost switching between systems, a support relationship that responds, and a platform that grows by adding users rather than buying more equipment. Where a customer measures the difference in their own numbers, those numbers belong to them, and we will only ever share the ones they choose to.",
        ],
      },
    ],
    pointsHeading: "The outcomes we design for",
    points: [
      {
        title: "Lower, more predictable cost",
        description:
          "Removing per-channel line charges and on-premise maintenance, and replacing them with a per-user model that scales with the business.",
        icon: TrendingUp,
      },
      {
        title: "Fewer missed opportunities",
        description:
          "Queues, routing and callbacks so busy periods no longer turn into busy signals and abandoned calls.",
        icon: PhoneCall,
      },
      {
        title: "Teams that work as one",
        description:
          "Distributed and hybrid staff on a single phone system, reachable on the same numbers wherever they are working.",
        icon: Users,
      },
      {
        title: "A smoother customer experience",
        description:
          "Callers reaching the right person faster through well-designed IVR and routing, with a professional presence on every line.",
        icon: HeartHandshake,
      },
      {
        title: "Room to grow",
        description:
          "Adding users, numbers and whole sites from a browser, with management and billing staying in one place however far you scale.",
        icon: LayoutGrid,
      },
      {
        title: "Support you can rely on",
        description:
          "A named expert who owns your issue end to end, available around the clock by phone, email, chat and WhatsApp.",
        icon: Headphones,
      },
    ],
    note:
      "You will not find fabricated ROI percentages or invented customer names here. When we publish a measured result, it will be one a customer has verified.",
    closingHeading: "Let us write yours",
    closingBody:
      "Tell us the outcome you are trying to reach. We will design a configuration around it, plan the move with you, and stay involved long after the cutover.",
  },

  // -------------------------------------------------------------- Downloads
  {
    slug: "whitepapers",
    title: "Whitepapers",
    group: "Downloads",
    eyebrow: "Downloads",
    tagline: "Deeper reading on cloud communications decisions.",
    intro:
      "Our whitepapers go beyond product pages into the reasoning behind a communications decision — the trade-offs, the migration mechanics and the architecture — so the people who evaluate and approve a change have the detail they need.",
    icon: ScrollText,
    cta: { label: "Request a whitepaper", href: "/contact" },
    secondaryCta: { label: "Browse products", href: "/products" },
    sections: [
      {
        heading: "Written for the people who evaluate",
        body: [
          "A whitepaper is for the moment a business moves from browsing to deciding — when someone needs to understand not just what a product does, but why one approach fits their situation better than another, and what the transition actually involves.",
          "To receive a whitepaper, get in touch and tell us which topic is relevant to you. We will send the current version and, if it helps, put you in touch with an engineer who can talk it through.",
        ],
      },
    ],
    pointsHeading: "Topics our whitepapers cover",
    points: [
      {
        title: "SIP trunking versus legacy lines",
        description:
          "How SIP connectivity compares with PRI and analogue trunks on cost, flexibility and resilience, and when to move.",
        icon: Cable,
      },
      {
        title: "Planning a PBX migration",
        description:
          "A methodical approach to moving from on-premise hardware to a cloud phone system with minimal disruption.",
        icon: ArrowLeftRight,
      },
      {
        title: "Designing for call quality",
        description:
          "Network design, QoS and codec choices that keep voice clear, and how to diagnose problems when it is not.",
        icon: Waves,
      },
      {
        title: "Contact centre architecture",
        description:
          "Queues, routing strategies and analytics, and how to size a contact centre around real demand patterns.",
        icon: Headset,
      },
      {
        title: "Security in cloud voice",
        description:
          "Encrypted signalling and media, access control and what compliance means for a communications platform.",
        icon: Lock,
      },
      {
        title: "Building on communication APIs",
        description:
          "Integration patterns for adding voice, messaging and WhatsApp to your own products at scale.",
        icon: Code2,
      },
    ],
    closingHeading: "Ask for the detail",
    closingBody:
      "Tell us the decision you are weighing up and we will point you to the right material — and to an engineer who can answer the questions it raises.",
  },
  {
    slug: "brochures",
    title: "Brochures",
    group: "Downloads",
    eyebrow: "Downloads",
    tagline: "Concise overviews you can share internally.",
    intro:
      "Our brochures give you a clear, shareable summary of what SipLink offers — the kind of overview you can forward to a colleague or bring into a meeting when you are building the case for a change.",
    icon: Book,
    cta: { label: "Request a brochure", href: "/contact" },
    secondaryCta: { label: "See the full range", href: "/resources/product-catalog" },
    sections: [
      {
        heading: "The overview, ready to pass on",
        body: [
          "Decisions about a phone system are rarely made by one person. A brochure is written to travel — a concise, plain-language summary that gives a colleague enough to understand what SipLink does and why it is worth a closer look, without needing the whole platform explained.",
          "Get in touch and tell us who the audience is, and we will send the overview that fits — from a general company introduction to a summary focused on a single product area.",
        ],
      },
    ],
    pointsHeading: "Overviews available",
    points: [
      {
        title: "SipLink company overview",
        description:
          "Who we are — a Class A ISP-licensed cloud communications provider — and the breadth of what we deliver.",
        icon: Building2,
      },
      {
        title: "Business voice overview",
        description:
          "Hosted PBX, cloud PBX, SIP trunking and IP-PBX connectivity, summarised for a non-technical reader.",
        icon: PhoneCall,
      },
      {
        title: "Contact centre overview",
        description:
          "Call handling, queues, recording, monitoring and analytics for sales, support and service teams.",
        icon: Headset,
      },
      {
        title: "Communication APIs overview",
        description:
          "Voice, SMS, WhatsApp and WebRTC capabilities for teams building communication into their products.",
        icon: Code2,
      },
      {
        title: "Internet and connectivity overview",
        description:
          "Business broadband, dedicated internet, static IP and managed network services from a licensed ISP.",
        icon: Network,
      },
      {
        title: "Industry overviews",
        description:
          "How the platform is shaped for sectors such as healthcare, staffing, finance, retail and IT.",
        icon: LayoutGrid,
      },
    ],
    closingHeading: "Get the overview that fits",
    closingBody:
      "Tell us who you need to bring on board and we will send the right brochure — and answer any question it raises.",
  },
  {
    slug: "datasheets",
    title: "Datasheets",
    group: "Downloads",
    eyebrow: "Downloads",
    tagline: "The specifics: features, capabilities and requirements.",
    intro:
      "Datasheets are for the technical evaluation — the features a product includes, what it connects to, and what you need in place to run it. They are written for the engineer or administrator who has to make it work.",
    icon: FileSpreadsheet,
    cta: { label: "Request a datasheet", href: "/contact" },
    secondaryCta: { label: "Read the developer docs", href: "/developers/api-docs" },
    sections: [
      {
        heading: "The technical detail, laid out",
        body: [
          "When the evaluation gets serious, someone technical needs the specifics: which features are included, how the product integrates with existing systems, what protocols and devices it supports, and what the prerequisites are for a clean deployment.",
          "Each datasheet is kept current with the platform. Tell us which product you are evaluating and we will send the latest version, and connect you with an engineer for anything that needs a real answer rather than a line in a table.",
        ],
      },
    ],
    pointsHeading: "Datasheets by product area",
    points: [
      {
        title: "Hosted & Cloud PBX",
        description:
          "Extensions, IVR, routing, voicemail, reporting, device support and administration capabilities.",
        icon: CloudCog,
      },
      {
        title: "SIP Trunking",
        description:
          "SIP connectivity for IP-PBX, codec handling, failover and least-cost routing, and encrypted signalling.",
        icon: Router,
      },
      {
        title: "Contact Centre",
        description:
          "Automatic call distribution, queue strategies, live monitoring, recording and reporting.",
        icon: Headset,
      },
      {
        title: "Communication APIs",
        description:
          "Voice, SMS and WhatsApp APIs, the WebRTC SDK, webhooks and integration surfaces.",
        icon: Code2,
      },
      {
        title: "Numbers & Porting",
        description:
          "DID, toll-free and virtual number capabilities, and the number porting process.",
        icon: PhoneCall,
      },
      {
        title: "Enterprise Features",
        description:
          "Microsoft Teams calling, the Session Border Controller, call queues and CRM integration.",
        icon: ShieldCheck,
      },
    ],
    closingHeading: "Get the specifics",
    closingBody:
      "Tell us which product your team is evaluating and we will send the current datasheet and put an engineer on hand for the detailed questions.",
  },
  {
    slug: "product-catalog",
    title: "Product Catalog",
    group: "Downloads",
    eyebrow: "Downloads",
    tagline: "The full SipLink range in one place.",
    intro:
      "The product catalogue is the complete map of what SipLink offers — business voice, phone numbers, contact centre, communication APIs and enterprise features — so you can see the whole range and find where your needs fit.",
    icon: LayoutGrid,
    cta: { label: "Request the catalogue", href: "/contact" },
    secondaryCta: { label: "Browse products", href: "/products" },
    sections: [
      {
        heading: "Everything SipLink delivers",
        body: [
          "It is easy to focus on a single product and miss how it connects to the rest. The catalogue steps back and shows the whole platform, so you can see how business voice, numbers, contact centre tools, APIs and enterprise features work together on one network.",
          "You can explore every product on this site, or ask us for a consolidated catalogue to share with your team. Either way, we will help you find the combination that fits how your business communicates.",
        ],
      },
    ],
    pointsHeading: "The SipLink range",
    points: [
      {
        title: "Business Voice",
        description:
          "SIP trunking, cloud PBX, hosted PBX and on-premise IP-PBX — carrier-grade voice for every kind of setup.",
        icon: PhoneCall,
      },
      {
        title: "Phone Numbers",
        description:
          "DID numbers, toll-free numbers, virtual numbers and number porting to keep the numbers you already use.",
        icon: Phone,
      },
      {
        title: "Contact Centre",
        description:
          "Call centre solution, predictive and auto dialers, IVR, call recording and call analytics.",
        icon: Headset,
      },
      {
        title: "Communication APIs",
        description:
          "Voice, SMS and WhatsApp Business APIs, a WebRTC SDK and a SIP API for building into your own products.",
        icon: Code2,
      },
      {
        title: "Enterprise Features",
        description:
          "Microsoft Teams calling, Session Border Controller, call queues, CRM integration and the AI Voice Assistant.",
        icon: ShieldCheck,
      },
      {
        title: "Internet & Connectivity",
        description:
          "Business broadband, dedicated internet, static IP and managed network services from a licensed ISP.",
        icon: Network,
      },
    ],
    closingHeading: "See the whole range",
    closingBody:
      "Not sure where you fit? Tell us how your teams communicate and we will walk you through the parts of the catalogue that matter for you.",
  },

  // ---------------------------------------------------------------- Network
  {
    slug: "coverage-map",
    title: "Coverage & Network Reach",
    group: "Network",
    eyebrow: "Network",
    tagline: "Where SipLink is present, and how far our reach extends.",
    intro:
      "SipLink runs on its own carrier-neutral infrastructure with points of presence in Bangalore and Chennai, connected onward through SIP and number porting so businesses can be reached wherever their customers are.",
    icon: Map,
    cta: { label: "Ask about your location", href: "/contact" },
    secondaryCta: { label: "Explore connectivity", href: "/internet" },
    sections: [
      {
        heading: "Carrier-neutral points of presence",
        body: [
          "As a Class A ISP licensed by the Department of Telecommunications, SipLink operates carrier-neutral points of presence in Bangalore and Chennai. Carrier-neutral means we are not tied to a single upstream provider, so traffic can be routed across multiple links for resilience and quality.",
          "From these POPs, voice and connectivity extend to businesses through SIP and our IP network, with redundant links designed so that a single failure is not a single point of failure.",
        ],
      },
      {
        heading: "Reach beyond the POPs",
        body: [
          "Your customers do not need to be near a POP for you to reach them. Number porting lets you keep and use the numbers your customers already dial, and SIP connectivity lets your business present a professional voice presence to the people you serve.",
          "If you are wondering whether SipLink can support a particular location or number range, the fastest answer is to ask us directly — we will tell you plainly what is possible for your situation.",
        ],
      },
    ],
    pointsHeading: "How our network reaches you",
    points: [
      {
        title: "Bangalore POP",
        description:
          "A carrier-neutral point of presence anchoring connectivity and voice in the region.",
        icon: MapPin,
      },
      {
        title: "Chennai POP",
        description:
          "A second carrier-neutral point of presence providing redundancy and reach.",
        icon: MapPin,
      },
      {
        title: "Carrier-neutral routing",
        description:
          "Not tied to one upstream provider, so traffic can take the best available path.",
        icon: Network,
      },
      {
        title: "Redundant connectivity",
        description:
          "Multiple provider links and real-time replication so a failure is not felt as an outage.",
        icon: ServerCog,
      },
      {
        title: "SIP reach",
        description:
          "Voice extended to your teams and customers over SIP and our IP network.",
        icon: Cable,
      },
      {
        title: "Number porting",
        description:
          "Keep the numbers your customers already know, wherever your business operates.",
        icon: ArrowLeftRight,
      },
    ],
    note:
      "Coverage for a specific location or number range depends on your requirements. Talk to us and we will confirm exactly what is available for you.",
    closingHeading: "Can we reach where you operate?",
    closingBody:
      "Tell us where your teams and customers are, and the numbers you need. We will confirm what our network can deliver for your business.",
  },
  {
    slug: "network-status",
    title: "Network Status",
    group: "Network",
    eyebrow: "Network",
    tagline: "How we monitor the network, and how to reach us if something is wrong.",
    intro:
      "SipLink's network is watched around the clock by our Network Operations Centre. This page explains how we monitor service health and what to do if you think something is affecting your service.",
    icon: Activity,
    cta: { label: "Report an issue", href: "/contact" },
    secondaryCta: { label: "Read about our SLA", href: "/resources/sla" },
    sections: [
      {
        heading: "Watched around the clock",
        body: [
          "Our Network Operations Centre monitors the platform continuously. Redundant servers, routers and switches, with real-time replication to a secondary data centre, are designed so that problems are detected and addressed before most customers ever notice them.",
          "Because our infrastructure is carrier-neutral with multiple provider links, traffic can be moved away from a degraded path. The goal of monitoring is not just to know when something breaks, but to route around it and resolve it quickly.",
        ],
      },
      {
        heading: "If you think your service is affected",
        body: [
          "If your calls or connectivity are not behaving as expected, contact our support team straight away by phone, email, chat or WhatsApp. Tell us what you are seeing — affected numbers, times and symptoms — and an expert will investigate with you.",
          "A named expert owns your issue from the first message until it is resolved, and where a service interruption is on our side, the terms for that are set out in your service agreement.",
        ],
      },
    ],
    pointsHeading: "How we keep service healthy",
    points: [
      {
        title: "24/7 NOC monitoring",
        description:
          "Our Network Operations Centre watches the platform continuously, day and night.",
        icon: Radar,
      },
      {
        title: "Redundant infrastructure",
        description:
          "Redundant servers, routers and switches with real-time replication to a secondary data centre.",
        icon: ServerCog,
      },
      {
        title: "Multiple provider links",
        description:
          "Traffic can shift away from a degraded path across carrier-neutral connectivity.",
        icon: Signal,
      },
      {
        title: "Proactive detection",
        description:
          "Monitoring is designed to catch and address issues before they reach customers.",
        icon: Activity,
      },
      {
        title: "Rapid response",
        description:
          "A named expert takes ownership of any issue from the first contact through to resolution.",
        icon: Headphones,
      },
      {
        title: "Clear escalation",
        description:
          "Reach us any hour by phone, email, chat or WhatsApp to report and track an issue.",
        icon: MessagesSquare,
      },
    ],
    note:
      "This page describes how we monitor and respond. For real-time confirmation of your own service, or to report a problem, contact support directly and we will check it with you.",
    closingHeading: "Something not working as expected?",
    closingBody:
      "Reach our support team any hour of the day. Tell us what you are seeing and an expert will investigate and stay with it until your service is back to normal.",
  },
  {
    slug: "sla",
    title: "Service Level Agreement",
    group: "Network",
    eyebrow: "Network",
    tagline: "Our support and service commitments, set out clearly.",
    intro:
      "SipLink backs its service with clear commitments: around-the-clock support, a named owner for every issue, and service level terms agreed with you in your contract. This page explains the shape of those commitments.",
    icon: ShieldCheck,
    cta: { label: "Discuss service terms", href: "/contact" },
    secondaryCta: { label: "See how we monitor", href: "/resources/network-status" },
    sections: [
      {
        heading: "Commitments you can rely on",
        body: [
          "A service level agreement is a promise about how a service will be delivered and supported. SipLink's commitments cover our equipment, the local access network and our IP network, and they are backed by 24/7 support and a resolution process where a single expert owns your issue from beginning to end.",
          "The specific availability and service level terms that apply to your business are set out in your service agreement. We prefer to agree those terms with you against your actual requirements rather than publish a single figure that may not reflect what you have signed up for.",
        ],
      },
      {
        heading: "What our assurance includes",
        body: [
          "Beyond availability, our assurance covers the way we work with you: dedicated project management through design and delivery, resolution expertise so issues are owned rather than passed around, online account management through a web portal, and service interruption credits where a fault resides with us.",
          "The intent is straightforward — clear ownership, clear communication, and a commitment to resolve problems as quickly as possible.",
        ],
      },
    ],
    pointsHeading: "What we commit to",
    points: [
      {
        title: "24/7 customer support",
        description:
          "Dedicated support staff available around the clock by phone, email, chat and WhatsApp.",
        icon: Clock,
      },
      {
        title: "Resolution ownership",
        description:
          "One expert manages your issue from beginning to end, keeping you informed until it is resolved.",
        icon: Headset,
      },
      {
        title: "Coverage of our network",
        description:
          "Commitments spanning SipLink equipment, the local access network and our IP network.",
        icon: Network,
      },
      {
        title: "Terms set in your contract",
        description:
          "Specific availability and service level terms are agreed with you and set out in your service agreement.",
        icon: ScrollText,
      },
      {
        title: "Service interruption credits",
        description:
          "Where a fault resides with us, you receive a credit in line with your agreement.",
        icon: BadgeCheck,
      },
      {
        title: "Online account management",
        description:
          "A web portal to administer your account and manage support with SipLink.",
        icon: LayoutGrid,
      },
    ],
    note:
      "We do not publish a single blanket availability percentage. The commitments that apply to you are agreed against your requirements and written into your service agreement.",
    closingHeading: "Let us agree the terms that fit you",
    closingBody:
      "Tell us what your business needs from its communications, and we will set out service level terms tailored to it — clearly, in writing, before you commit.",
  },
];

export function getResourceDetail(slug: string) {
  return resourceDetails.find((resource) => resource.slug === slug);
}

/** Group order for the section index. */
export const resourceGroupOrder: ResourceGroup[] = [
  "Learn",
  "Customer Stories",
  "Downloads",
  "Network",
];

export const resourceGroupMeta: Record<
  ResourceGroup,
  { description: string; icon: LucideIcon }
> = {
  Learn: {
    description: "Guides, answers and writing to get more from your platform.",
    icon: GraduationCap,
  },
  "Customer Stories": {
    description: "What businesses like yours experience with SipLink.",
    icon: HeartHandshake,
  },
  Downloads: {
    description: "Overviews, specifications and reference material to share.",
    icon: Download,
  },
  Network: {
    description: "Transparency about the network you would run on.",
    icon: Waves,
  },
};
