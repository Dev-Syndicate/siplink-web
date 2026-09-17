import {
  ArrowLeftRight,
  AudioLines,
  Boxes,
  Building2,
  Cable,
  ChartColumn,
  Clock,
  Cloud,
  Code2,
  FileSpreadsheet,
  Gauge,
  Globe,
  Headset,
  Layers,
  ListChecks,
  MessageSquare,
  Network,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  Puzzle,
  Receipt,
  Repeat,
  Router,
  ScrollText,
  ServerCog,
  ShieldCheck,
  Sliders,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
  UsersRound,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Content model for the product-specific pricing pages under
 * /pricing/[slug].
 *
 * IMPORTANT — no published rate exists for any of these products. The only
 * real SipLink prices are the three seat plans (Value $18.95 / Business
 * $20.95 / Enterprise $24.95, per user/month, minimum 10 lines), which live
 * on the /pricing index. These pages therefore explain how each product is
 * *typically* priced — described as general/industry-standard structures, not
 * as specific SipLink numbers — and drive every visitor to /contact for a
 * quote. Do NOT add dollar amounts, discounts, setup fees or bundled-minute
 * figures here. The one exception is `cloud-pbx`, which may reference the seat
 * plans because those ARE the Cloud PBX plans.
 */
export type PricingDetail = {
  slug: string;
  title: string;
  /** Short line under the page title. */
  tagline: string;
  /** Opening paragraph. */
  intro: string;
  icon: LucideIcon;
  /** The eyebrow label above the hero back-link and used in metadata. */
  eyebrow: string;
  /** How this product is priced — the explanatory "pricing model" section. */
  model: {
    heading: string;
    body: string[];
    /** The billing components that typically make up the price. */
    components: { title: string; description: string; icon: LucideIcon }[];
  };
  /** What's included at the platform level, regardless of the final quote. */
  included: {
    heading: string;
    items: { title: string; description: string; icon: LucideIcon }[];
  };
  /** The variables that shape a specific quote. */
  factors: {
    heading: string;
    items: { title: string; description: string; icon: LucideIcon }[];
  };
  /** Closing reassurance shown beside the quote CTA. */
  quote: { heading: string; body: string };
  /**
   * Only set on cloud-pbx, where the published seat plans genuinely apply.
   * Renders a note that links to the /pricing comparison.
   */
  seatPlanNote?: string;
};

export const pricingDetails: PricingDetail[] = [
  // ---------------------------------------------------------------- SIP trunk
  {
    slug: "sip-trunk",
    title: "SIP Trunk Pricing",
    tagline: "Priced around your channels and call volume.",
    eyebrow: "Plans & pricing",
    icon: Cable,
    intro:
      "SIP trunking connects your existing PBX to our voice network, so what you pay tracks the capacity and calling your business actually needs. There is no single list price — a trunk is sized to your concurrent calls and destinations, and we quote from there.",
    model: {
      heading: "How SIP trunk pricing works",
      body: [
        "SIP trunks are typically priced across two dimensions. The first is capacity: how many simultaneous calls the trunk must carry, usually counted as channels or concurrent call paths. The second is usage: the calls that actually flow across it, most often billed per minute by destination, with domestic and international rates differing.",
        "Because every estate is different — a call centre with hundreds of concurrent agents and a small office with a handful of lines are not the same commercial conversation — SipLink quotes each trunk individually rather than publishing a flat rate. Tell us your peak concurrency and where you call, and we return a costed proposal.",
      ],
      components: [
        {
          title: "Channels / concurrent calls",
          description:
            "Capacity is sized to the number of simultaneous calls you need at peak. You pay for the concurrency the business requires, and it scales as you grow.",
          icon: Network,
        },
        {
          title: "Per-minute usage",
          description:
            "Outbound calling is generally billed per minute by destination, with separate domestic and international rates. Inbound handling depends on your number setup.",
          icon: Timer,
        },
        {
          title: "Number ranges",
          description:
            "DIDs and any number ranges attached to the trunk are quoted alongside capacity, whether you bring existing numbers or add new ones.",
          icon: PhoneIncoming,
        },
      ],
    },
    included: {
      heading: "What every trunk includes",
      items: [
        {
          title: "Carrier failover",
          description:
            "Alternate routing keeps calls connecting when a path degrades, built into the trunk design rather than sold as an add-on.",
          icon: Repeat,
        },
        {
          title: "Least-cost routing",
          description:
            "Destination-aware routing sends each call down the most economical viable path where the deployment supports it.",
          icon: TrendingUp,
        },
        {
          title: "DoT-certified network",
          description:
            "Trunks run on SipLink's own quality-managed IP voice network, engineered by SIP specialists.",
          icon: ShieldCheck,
        },
        {
          title: "24/7 support",
          description:
            "Round-the-clock support and monitoring on every trunk we deliver, at no extra charge.",
          icon: Clock,
        },
      ],
    },
    factors: {
      heading: "What shapes your quote",
      items: [
        {
          title: "Peak concurrency",
          description:
            "The number of calls you need in flight at once is the single biggest driver of trunk capacity.",
          icon: Gauge,
        },
        {
          title: "Calling destinations",
          description:
            "Where your traffic goes — domestic, international, or a specific mix — sets the per-minute picture.",
          icon: Globe,
        },
        {
          title: "Redundancy needs",
          description:
            "Failover paths, geographic diversity and business-continuity requirements factor into the design.",
          icon: ServerCog,
        },
        {
          title: "Number porting",
          description:
            "Bringing existing numbers across is handled during onboarding and factored into the proposal.",
          icon: ArrowLeftRight,
        },
      ],
    },
    quote: {
      heading: "Get a SIP trunk quote",
      body: "Share your peak concurrent calls, monthly minutes and calling destinations, and we will size a trunk and return a costed proposal — including porting any numbers you already have.",
    },
  },

  // ---------------------------------------------------------------- Cloud PBX
  {
    slug: "cloud-pbx",
    title: "Cloud PBX Plans",
    tagline: "Per-user seat plans that scale with your team.",
    eyebrow: "Plans & pricing",
    icon: Cloud,
    intro:
      "SipLink's Cloud PBX is priced per user, per month — a straightforward seat model where each person on the system carries a licence and everyone shares the same virtual phone system. Our published seat plans start at $18.95 per user per month with a minimum of 10 lines.",
    seatPlanNote:
      "Cloud PBX is billed through our three published seat plans — Value $18.95, Business $20.95 and Enterprise $24.95 per user per month, minimum 10 lines, with unlimited calling within the US and Canada. See the full feature-by-feature comparison on the pricing page.",
    model: {
      heading: "How Cloud PBX pricing works",
      body: [
        "Cloud PBX uses a per-seat model: you pay a fixed monthly price for each user on the system, and that licence includes their extension, calling, mobile and desktop apps, and the collaboration features in their tier. Because it is per user, the cost is predictable — it moves only when your headcount does.",
        "There are three tiers. Value covers essential cloud telephony; Business adds the CRM and productivity integrations most growing teams run on; Enterprise adds the full collaboration suite. Every plan requires a minimum of 10 lines and includes unlimited calling within the US and Canada. The full comparison lives on the main pricing page.",
      ],
      components: [
        {
          title: "Per-user seat licence",
          description:
            "Each user carries one monthly licence covering their extension, apps and calling. Add or remove seats as your team changes.",
          icon: UsersRound,
        },
        {
          title: "Tier you choose",
          description:
            "Value, Business or Enterprise — the tier sets which features and integrations each seat includes.",
          icon: Layers,
        },
        {
          title: "Minimum 10 lines",
          description:
            "Plans start at ten lines and scale up from there, so pricing stays predictable as you grow.",
          icon: ListChecks,
        },
      ],
    },
    included: {
      heading: "What every seat includes",
      items: [
        {
          title: "Unlimited US & Canada calling",
          description:
            "Every plan includes unlimited calling within the US and Canada, so domestic minutes are never a variable.",
          icon: PhoneCall,
        },
        {
          title: "Apps for every device",
          description:
            "Desktop apps for Mac and Windows plus iOS and Android, so each seat works from anywhere.",
          icon: Boxes,
        },
        {
          title: "Free local number",
          description:
            "A local number is included with every plan, and you can port the numbers you already use.",
          icon: PhoneIncoming,
        },
        {
          title: "24/7 support",
          description:
            "Round-the-clock email, chat and phone support is included across all three tiers.",
          icon: Clock,
        },
      ],
    },
    factors: {
      heading: "What shapes your bill",
      items: [
        {
          title: "Number of seats",
          description:
            "The main lever: how many users are on the system, at a minimum of ten lines.",
          icon: Users,
        },
        {
          title: "Plan tier",
          description:
            "Value, Business or Enterprise — higher tiers unlock more integrations and collaboration features.",
          icon: Sliders,
        },
        {
          title: "Integrations",
          description:
            "CRM and productivity integrations such as Salesforce, Microsoft Teams and CEIPAL come with the Business and Enterprise tiers.",
          icon: Puzzle,
        },
        {
          title: "Add-on numbers",
          description:
            "Extra DIDs, toll-free numbers or international numbers are quoted alongside your seats.",
          icon: PhoneForwarded,
        },
      ],
    },
    quote: {
      heading: "Choose your Cloud PBX plan",
      body: "Tell us how many users you have and how your teams work, and we will recommend a tier and help you port your existing numbers. Prefer to compare tiers side by side first? The full breakdown is on the pricing page.",
    },
  },

  // ---------------------------------------------------------------- DID
  {
    slug: "did",
    title: "DID Pricing",
    tagline: "Priced per number, with usage on top.",
    eyebrow: "Plans & pricing",
    icon: PhoneIncoming,
    intro:
      "Direct inward dialling (DID) numbers give your business a local presence and route inbound calls straight to the right team. Pricing is straightforward in shape — a recurring charge per number plus any inbound usage — but the exact figure depends on the location and volume, so we quote to your requirement.",
    model: {
      heading: "How DID pricing works",
      body: [
        "DID numbers are typically priced as a small recurring charge per number per month, covering the rental of the number and its routing into your system. On top of that, inbound minutes may be billed depending on the number type and where calls originate.",
        "Rates vary by geography — a local number in one city is not necessarily costed the same as one in another region — so rather than publish a single figure, SipLink prices DIDs to the specific numbers and volumes you need. Whether you want a handful of local numbers or a large block, we quote the set together.",
      ],
      components: [
        {
          title: "Per number, per month",
          description:
            "Each DID carries a recurring monthly rental covering the number and its routing into your PBX or apps.",
          icon: PhoneIncoming,
        },
        {
          title: "Inbound usage",
          description:
            "Depending on number type and origin, inbound minutes may be billed on top of the monthly rental.",
          icon: Timer,
        },
        {
          title: "Location and quantity",
          description:
            "Where the numbers are based and how many you need together shape the overall figure.",
          icon: Globe,
        },
      ],
    },
    included: {
      heading: "What comes with every DID",
      items: [
        {
          title: "Flexible routing",
          description:
            "Point each number at an extension, queue, IVR or app, and change the routing whenever you need to.",
          icon: Workflow,
        },
        {
          title: "Keep your numbers",
          description:
            "Port the numbers your customers already know onto the SipLink network during onboarding.",
          icon: ArrowLeftRight,
        },
        {
          title: "Managed in one portal",
          description:
            "Provision, assign and reassign numbers from a single admin portal, at any scale.",
          icon: ScrollText,
        },
        {
          title: "DoT-certified network",
          description:
            "Numbers ride SipLink's own quality-managed voice network with 24/7 support.",
          icon: ShieldCheck,
        },
      ],
    },
    factors: {
      heading: "What shapes your quote",
      items: [
        {
          title: "How many numbers",
          description:
            "A single local number and a large national block are different commercial conversations.",
          icon: PhoneIncoming,
        },
        {
          title: "Number locations",
          description:
            "The cities or regions you want a presence in influence the per-number rate.",
          icon: Globe,
        },
        {
          title: "Expected inbound volume",
          description:
            "Your typical inbound minutes help us shape the right usage arrangement.",
          icon: Gauge,
        },
        {
          title: "Porting existing numbers",
          description:
            "Bringing numbers across is handled during onboarding and included in the proposal.",
          icon: ArrowLeftRight,
        },
      ],
    },
    quote: {
      heading: "Get a DID pricing quote",
      body: "Tell us which locations you need numbers in, how many, and your expected inbound volume, and we will return a per-number quote — including porting the numbers you already advertise.",
    },
  },

  // ---------------------------------------------------------------- Toll-free
  {
    slug: "toll-free",
    title: "Toll-Free Pricing",
    tagline: "Priced per number plus the calls you cover.",
    eyebrow: "Plans & pricing",
    icon: PhoneCall,
    intro:
      "Toll-free numbers let customers reach you at no cost to them — you cover the call instead. That model shapes the pricing: a recurring charge per number plus per-minute inbound usage, since your business is paying for calls your customers place. We size a quote to your expected volume.",
    model: {
      heading: "How toll-free pricing works",
      body: [
        "Toll-free numbers are typically priced as a monthly rental per number, plus per-minute charges for the inbound calls the number receives — because with toll-free, the called party (you) pays for the call rather than the caller. Higher call volumes therefore mean more usage, which is why the number and the traffic are quoted together.",
        "SipLink does not publish a flat toll-free rate because the usage side depends entirely on how much your customers call. Share your expected inbound minutes and how many numbers you want, and we will return a costed proposal that reflects your real volume rather than a worst-case list price.",
      ],
      components: [
        {
          title: "Per number, per month",
          description:
            "Each toll-free number carries a recurring monthly rental for the number and its routing.",
          icon: PhoneCall,
        },
        {
          title: "Per-minute inbound",
          description:
            "Because toll-free calls are free to the caller, inbound minutes are billed to your business per minute.",
          icon: Timer,
        },
        {
          title: "Call volume",
          description:
            "Your expected inbound volume is the main driver of the usage side of the quote.",
          icon: TrendingUp,
        },
      ],
    },
    included: {
      heading: "What comes with every toll-free number",
      items: [
        {
          title: "Smart inbound routing",
          description:
            "Send toll-free calls to IVRs, queues, teams or an out-of-hours flow, and adjust routing any time.",
          icon: Workflow,
        },
        {
          title: "Keep your number",
          description:
            "Port an existing toll-free number your customers already dial onto the SipLink network.",
          icon: ArrowLeftRight,
        },
        {
          title: "Call handling built in",
          description:
            "Combine toll-free numbers with call recording, analytics and queueing on the same platform.",
          icon: Headset,
        },
        {
          title: "24/7 support",
          description:
            "Round-the-clock support and monitoring on the DoT-certified SipLink voice network.",
          icon: Clock,
        },
      ],
    },
    factors: {
      heading: "What shapes your quote",
      items: [
        {
          title: "Expected inbound minutes",
          description:
            "Since you cover the call, your monthly inbound volume is the biggest factor in the usage figure.",
          icon: Timer,
        },
        {
          title: "Number of toll-free lines",
          description:
            "How many toll-free numbers you run across campaigns, departments or regions.",
          icon: PhoneCall,
        },
        {
          title: "Routing complexity",
          description:
            "Multi-level IVRs, queues and time-of-day flows influence the configuration we design.",
          icon: Workflow,
        },
        {
          title: "Porting existing numbers",
          description:
            "Bringing an established toll-free number across is handled at onboarding.",
          icon: ArrowLeftRight,
        },
      ],
    },
    quote: {
      heading: "Get a toll-free pricing quote",
      body: "Tell us your expected inbound volume and how many toll-free numbers you need, and we will return a costed proposal sized to your real call patterns — including porting a number you already promote.",
    },
  },

  // ---------------------------------------------------------------- Contact center
  {
    slug: "contact-center",
    title: "Contact Center Pricing",
    tagline: "Priced per agent seat, sized to your operation.",
    eyebrow: "Plans & pricing",
    icon: Headset,
    intro:
      "A contact centre is priced around the people using it — most commonly a per-agent or per-seat licence, with the capabilities each agent needs bundled in. Because operations differ so widely, from a small support desk to a high-volume outbound floor, SipLink builds the quote around your seat count and the features you run.",
    model: {
      heading: "How contact center pricing works",
      body: [
        "Contact centre platforms are generally priced per agent seat, per month. Each seat includes the agent's ability to take and make calls, the queueing and routing that puts calls in front of them, and the supervisor tools that manage the floor. The seat count and the feature set you need together determine the price.",
        "SipLink quotes each contact centre to the operation rather than to a list price, because an inbound support team, an outbound campaign floor and a blended operation have different needs — dialers, recording retention, analytics depth and integrations all vary. Tell us your agent count and how you work, and we design a costed configuration.",
      ],
      components: [
        {
          title: "Per-agent seat",
          description:
            "Pricing tracks the number of concurrent or named agents on the platform, with each seat carrying its calling and tooling.",
          icon: Headset,
        },
        {
          title: "Feature set",
          description:
            "Predictive and auto dialing, IVR, recording, analytics and monitoring shape the capabilities each seat carries.",
          icon: Sliders,
        },
        {
          title: "Usage and numbers",
          description:
            "Outbound minutes and the inbound numbers feeding the queues are quoted alongside the seats.",
          icon: Timer,
        },
      ],
    },
    included: {
      heading: "What every deployment includes",
      items: [
        {
          title: "Intelligent call routing",
          description:
            "IVR, queues and ring groups distribute calls to the right agents and keep response times down at volume.",
          icon: Workflow,
        },
        {
          title: "Supervisor monitoring",
          description:
            "Real-time listen, whisper and barge, plus performance tracking and call-quality reporting for the floor.",
          icon: ChartColumn,
        },
        {
          title: "Call recording",
          description:
            "Automatic and on-demand recording with secure access, playback and download on every deployment.",
          icon: AudioLines,
        },
        {
          title: "CRM integrations",
          description:
            "Connect Salesforce, CEIPAL, Dynamics and more so agents work with full context on every call.",
          icon: Puzzle,
        },
      ],
    },
    factors: {
      heading: "What shapes your quote",
      items: [
        {
          title: "Number of agents",
          description:
            "Seat count is the primary lever, alongside whether seats are named or concurrent.",
          icon: Users,
        },
        {
          title: "Inbound, outbound or blended",
          description:
            "The way your floor works determines whether dialers, queues or both are in scope.",
          icon: Repeat,
        },
        {
          title: "Dialer and analytics needs",
          description:
            "Predictive dialing, deeper analytics and longer recording retention factor into the design.",
          icon: TrendingUp,
        },
        {
          title: "Integrations and numbers",
          description:
            "The CRMs you connect and the DIDs and toll-free numbers feeding the centre are quoted together.",
          icon: PhoneForwarded,
        },
      ],
    },
    quote: {
      heading: "Get a contact center quote",
      body: "Tell us your agent count, whether you run inbound, outbound or blended, and the integrations you need, and we will design a costed configuration around your operation.",
    },
  },

  // ---------------------------------------------------------------- Voice API
  {
    slug: "voice-api",
    title: "Voice API Pricing",
    tagline: "Usage-based pricing that scales with your app.",
    eyebrow: "Plans & pricing",
    icon: AudioLines,
    intro:
      "The Voice API lets you place and receive calls directly from your code, and it is priced the way developers expect: by usage. You pay for what your application does rather than a fixed seat, so cost tracks adoption. There is no flat published rate — usage rates depend on the calling involved, so we quote to your projected volume.",
    model: {
      heading: "How Voice API pricing works",
      body: [
        "Programmable voice is typically billed on usage — most often per minute of call time, with rates differing by direction (inbound versus outbound) and destination. Some capabilities, such as recording or transcription, and any numbers your application provisions, are billed as their own line items on top of call minutes.",
        "Because a Voice API bill is a function of how much your product calls, SipLink quotes usage rates against your projected volume rather than publishing a single number. Share your expected minutes, directions and destinations, and we will return rates and any volume arrangement that fits your scale.",
      ],
      components: [
        {
          title: "Per-minute call usage",
          description:
            "The core of the bill: minutes of programmatic call time, with rates varying by direction and destination.",
          icon: Timer,
        },
        {
          title: "Numbers provisioned",
          description:
            "DIDs and toll-free numbers your application provisions carry their own recurring charge.",
          icon: PhoneIncoming,
        },
        {
          title: "Optional capabilities",
          description:
            "Recording, transcription and similar features are billed as separate line items when you use them.",
          icon: Sparkles,
        },
      ],
    },
    included: {
      heading: "What comes with the API",
      items: [
        {
          title: "REST endpoints",
          description:
            "Documented REST endpoints to place, receive and control calls directly from your application.",
          icon: Code2,
        },
        {
          title: "Real-time webhooks",
          description:
            "Subscribe to call events as they happen and drive your own logic off the platform.",
          icon: Webhook,
        },
        {
          title: "Sandbox to start",
          description:
            "Build and test against a sandbox before you go live, so you only pay once you ship.",
          icon: Boxes,
        },
        {
          title: "Programmatic numbers",
          description:
            "Provision and route DIDs and toll-free numbers in code as your application scales.",
          icon: PhoneForwarded,
        },
      ],
    },
    factors: {
      heading: "What shapes your quote",
      items: [
        {
          title: "Projected call minutes",
          description:
            "Expected monthly minutes are the primary driver of a usage-based Voice API bill.",
          icon: Gauge,
        },
        {
          title: "Direction and destinations",
          description:
            "Inbound versus outbound and where your calls terminate both influence the per-minute rate.",
          icon: Globe,
        },
        {
          title: "Numbers required",
          description:
            "How many DIDs or toll-free numbers your application provisions adds recurring cost.",
          icon: PhoneIncoming,
        },
        {
          title: "Added capabilities",
          description:
            "Recording, transcription and similar features are priced as you enable them.",
          icon: Sparkles,
        },
      ],
    },
    quote: {
      heading: "Get Voice API rates",
      body: "Tell us your projected monthly minutes, call directions and destinations, and the numbers you need, and we will return usage rates and any volume arrangement that suits your scale.",
    },
  },

  // ---------------------------------------------------------------- Enterprise quote
  {
    slug: "enterprise-quote",
    title: "Enterprise Quote",
    tagline: "A custom proposal for complex estates.",
    eyebrow: "Plans & pricing",
    icon: FileSpreadsheet,
    intro:
      "Large and multi-site organisations rarely fit a standard plan, so enterprise pricing is custom by design. Rather than a per-seat sticker, we build a single proposal across voice, numbers, contact centre, APIs and connectivity — priced to your estate, your integrations and your commercial terms.",
    model: {
      heading: "How enterprise pricing works",
      body: [
        "Enterprise pricing is bespoke. Instead of one product on one rate card, an enterprise proposal blends the pieces you actually use — SIP trunks and Cloud PBX seats, DID and toll-free ranges, contact-centre agents, Voice and messaging APIs, and often internet and network services — into a single commercial agreement.",
        "That agreement reflects volume, term and the specific requirements of your organisation: redundancy, migration from legacy systems, dedicated project management and the integrations your teams depend on. SipLink assigns a dedicated project manager and designs the solution around how your business communicates, then quotes the whole thing together.",
      ],
      components: [
        {
          title: "Blended across products",
          description:
            "Trunks, seats, numbers, contact centre and APIs are combined into one proposal rather than priced apart.",
          icon: Boxes,
        },
        {
          title: "Volume and term",
          description:
            "Scale and contract length shape the commercial arrangement across the whole estate.",
          icon: TrendingUp,
        },
        {
          title: "Custom requirements",
          description:
            "Redundancy, migration, integrations and dedicated support are scoped into the design and the quote.",
          icon: Sliders,
        },
      ],
    },
    included: {
      heading: "What an enterprise engagement includes",
      items: [
        {
          title: "Dedicated project manager",
          description:
            "An expert who oversees the design and delivery of your solution from concept through to installation.",
          icon: Users,
        },
        {
          title: "Proven migrations",
          description:
            "Experience moving businesses off legacy PRI and on-premise systems onto the cloud with minimal disruption.",
          icon: ArrowLeftRight,
        },
        {
          title: "Resilient network",
          description:
            "Failover, redundancy and replication across data centres, with no single point of failure by design.",
          icon: ServerCog,
        },
        {
          title: "One provider end to end",
          description:
            "Voice, numbers, contact centre, APIs and connectivity from a single Class A licensed provider.",
          icon: Building2,
        },
      ],
    },
    factors: {
      heading: "What shapes your proposal",
      items: [
        {
          title: "Products in scope",
          description:
            "Which of voice, numbers, contact centre, APIs and internet you need, and how they fit together.",
          icon: Receipt,
        },
        {
          title: "Scale and sites",
          description:
            "Total users, agents, numbers and locations across the whole organisation.",
          icon: Building2,
        },
        {
          title: "Integrations and compliance",
          description:
            "The systems you connect and any regulatory requirements your estate has to meet.",
          icon: Puzzle,
        },
        {
          title: "Migration and continuity",
          description:
            "Moving off existing systems and the redundancy and continuity you need in place.",
          icon: ShieldCheck,
        },
      ],
    },
    quote: {
      heading: "Request an enterprise quote",
      body: "Tell us about your estate — users, sites, the products you need and the systems you run — and a dedicated project manager will design a solution and return a single costed proposal.",
    },
  },
];

export function getPricingDetail(slug: string): PricingDetail | undefined {
  return pricingDetails.find((detail) => detail.slug === slug);
}
