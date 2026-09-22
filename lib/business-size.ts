import {
  Building2,
  Laptop,
  MonitorSmartphone,
  PhoneCall,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

/**
 * The "By Business Size" pages.
 *
 * These four sizes are one axis, but drawing them as one diagram at four
 * densities made four pages that read as the same picture. Each size instead
 * gets the moment that is characteristic of it, and each moment brings its
 * own geometry: a startup is a ring that everyone's phone joins, a small
 * business is a working day, a mid-market floor is a queue against a bank of
 * agents, an enterprise is a stack of systems a call passes down through.
 *
 * Everything here is structural — who rings, when, in what order, through
 * which layer. There are deliberately no capacities, latencies, SLA
 * percentages, prices, customer counts or coverage figures: the source
 * documents flag all of those as unverified, and the standing guardrail in
 * lib/solutions.ts applies to this file too.
 */

export type BusinessSizeSlug =
  | "startups"
  | "small-business"
  | "mid-market"
  | "enterprise";

/**
 * Which hero visual a size gets, for the sizes that use the shared shell.
 * One each — they are not interchangeable.
 */
export type SizeVisual = "ring" | "queue" | "stack";

/**
 * A size.
 *
 * `visual`, `placement`, `note` and `includedAs` configure the shared shell
 * in components/site/business-size-solution.tsx. Small Business supplies none
 * of them: its working day outgrew being a panel in that shell, so it has its
 * own page and draws the day itself.
 */
export type SizeContent = {
  slug: BusinessSizeSlug;
  label: string;
  /** Short form for the row that compares the four sizes. */
  short: string;
  visual?: SizeVisual;
  /**
   * Where the visual sits.
   *
   * `beside` runs it alongside the hero copy, which suits the instruments —
   * they are read left to right and their controls want to be near the text
   * that sets them up. `below` gives it a section of its own under the hero,
   * figure on the left with its explanation reading against it on the right.
   */
  placement?: "beside" | "below";
  /** One line naming what the visual is showing, used in the `beside` layout. */
  note?: string;
  /**
   * Copy set beside a visual that has a section of its own. Replaces `note`
   * rather than joining it — two captions on one figure is one too many.
   */
  feature?: { lead: string; body: string };
  /**
   * How "What's included" is laid out.
   *
   * `list` is the default: a ruled two-column set that takes any number of
   * capabilities. `phone` arranges them around a device, two a side, so it
   * needs exactly four — enterprise has six and would leave two off the page.
   */
  includedAs?: "list" | "phone";
  /**
   * A photograph for the hero, for a size whose visual sits further down the
   * page. It fills the half of the hero the visual would otherwise occupy,
   * so the layout is the same two columns either way.
   */
  heroImage?: { src: string; alt: string; width: number; height: number };
  /**
   * Hero copy for a size that has its own page.
   *
   * `title` is the category label — it names the bucket in the nav, the
   * metadata and the size switcher, where naming the bucket is the job. It
   * makes a poor headline, because a reader who arrived from "By Business
   * Size" already knows which bucket they are in. `headline` is what the
   * page says instead; `standfirst` is the line under it, kept separate from
   * `intro` so the metadata description stays a plain summary.
   */
  headline?: string;
  standfirst?: string;
  /**
   * Checked lines under the hero subhead, in place of a paragraph.
   *
   * Three is the limit on purpose: this is the shortlist a reader scans
   * before deciding whether to keep going, not a summary of the page. Each
   * one restates a capability from `capabilities` in the second person, so
   * nothing here is a claim the page does not make again properly below.
   */
  heroPoints?: string[];
  faqs: { question: string; answer: string }[];
};

/* ------------------------------------------------------------ the startups
 * ring: one number, and everyone who can answer it. */

export type Seat = { role: string; device: LucideIcon };

/**
 * The people a startup puts on the phone, in roughly the order they arrive.
 * All of them are on the ring — the claim is that everyone answers the same
 * number, and a ring with gaps in it argues the opposite.
 */
export const startupSeats: Seat[] = [
  { role: "Founder", device: Smartphone },
  { role: "Sales", device: Laptop },
  { role: "Support", device: MonitorSmartphone },
  { role: "Operations", device: Smartphone },
  { role: "Finance", device: Laptop },
  { role: "Engineering", device: MonitorSmartphone },
];

/* ------------------------------------------------- the small-business day
 * One call, and everywhere it goes looking for someone. */

/**
 * One call, stop by stop.
 *
 * `missed` and `closed` are not the same event and the difference is the
 * whole point of the figure: a missed stop rang and nobody got to it, a
 * closed one never rang at all. Seeing the front desk skipped rather than
 * ringing out at twenty past seven is the only way the reader can tell that
 * setting business hours actually does something.
 */
export type HuntOutcome = "missed" | "closed" | "answered";

export type HuntStop = {
  name: string;
  /** Said in the voice of the system, reporting what it did. */
  note: string;
  outcome: HuntOutcome;
};

export type CallPhase = {
  /** Shown in the panel header. */
  when: string;
  /** Paper or ink. The panel has its own day, the page does not. */
  open: boolean;
  stops: HuntStop[];
};

/** Who is calling. Both phases share the caller. */
export const huntCaller = "A customer calls";

/**
 * A day in the life of the number, as one loop.
 *
 * Deliberately no phone number anywhere: a realistic one is somebody's real
 * line, a masked one looks like a bug, and neither adds anything to the
 * argument — what matters is that a call arrived, not whose it was.
 *
 * Both phases carry exactly two stops, and that is a constraint rather than
 * a coincidence. The figure loops unattended inside the hero, so its height
 * has to be the same in the morning and the evening; equal stop counts make
 * that structural instead of propping it up with a minimum height.
 */
/**
 * The staffed hours drawn as the lit span on the hero's schedule strip.
 *
 * Illustrative, like the times on the two calls — a shape for "the desk is
 * covered between these hours", not a support commitment. Nothing on the page
 * quotes these numbers, and nothing should.
 */
export const businessHours = { open: 9, close: 18 };

export const callDay: CallPhase[] = [
  {
    when: "09:58",
    open: true,
    stops: [
      {
        name: "Front desk",
        note: "Rang four times. Already on another call.",
        outcome: "missed",
      },
      {
        name: "Everyone else in the office",
        note: "The whole group at once. Picked up in 11 seconds.",
        outcome: "answered",
      },
    ],
  },
  {
    when: "19:20",
    open: false,
    stops: [
      {
        name: "Front desk",
        note: "Closed, so nothing rings in the building.",
        outcome: "closed",
      },
      {
        name: "Whoever is on call",
        note: "Answered on the business number, not a personal one.",
        outcome: "answered",
      },
    ],
  },
];

/* ------------------------------------------------------ the mid-market floor
 * A queue against a bank of agents. */

export const queueDepartments = ["Sales", "Support", "Accounts"] as const;

export const queueAgents = {
  min: 2,
  max: 8,
  atFirst: 4,
} as const;

/**
 * The queue, before and after routing.
 *
 * `waiting` sums to the same total as the single line it comes from, and that
 * is the honest part: routing does not make callers disappear, it sorts them.
 * What changes is that you can finally say who is waiting for what, which is
 * the thing this size is actually buying.
 *
 * No wait times anywhere. A figure like 0:48 would read as a performance
 * promise, and the source documents flag every performance figure as
 * unverified.
 */
export type QueueLane = { name: string; waiting: number; agents: number };

export const queueTotal = 9;

export const queueLanes: QueueLane[] = [
  { name: "Sales", waiting: 4, agents: 3 },
  { name: "Support", waiting: 3, agents: 4 },
  { name: "Accounts", waiting: 2, agents: 2 },
];

export const queuePhases = [
  {
    label: "One line for everything",
    note: "Every caller in the same queue. No way to tell who is waiting for what, or who should be answering.",
  },
  {
    label: "Routed by what they need",
    note: "The same callers, sorted. Each queue has its own people and its own report.",
  },
];

/* ---------------------------------------------------------- the enterprise
 * The estate, as the layers a single call passes down through. */

export type EstateLayer = {
  name: string;
  detail: string;
  icon: LucideIcon;
};

export const estateLayers: EstateLayer[] = [
  {
    name: "Carriers and SIP trunks",
    detail:
      "Existing PBX systems, trunks and carrier connections keep working — they are connected through one managed voice architecture rather than replaced.",
    icon: PhoneCall,
  },
  {
    name: "Session border controller",
    detail:
      "A controlled layer between your voice infrastructure and outside SIP networks, so what reaches the estate is what you decided should reach it.",
    icon: Building2,
  },
  {
    name: "SipLink",
    detail:
      "The layer that connects telephony, cloud platforms, business applications, employees and customers into one environment you can manage.",
    icon: MonitorSmartphone,
  },
  {
    name: "Teams, queues and the AI assistant",
    detail:
      "Teams users take external calls without a separate phone system, enterprise queues organise high volume, and the AI assistant handles routine interactions.",
    icon: Laptop,
  },
  {
    name: "CRM and your sites",
    detail:
      "Calling and customer information arrive together across sales, support and service, at whichever location answers.",
    icon: Smartphone,
  },
];

/* ---------------------------------------------------------- the enterprise
 * The estate, and the layer that joins it without taking any of it out. */

export type EstateNode = { name: string; detail: string };

/**
 * The systems a large organisation already runs, named as the reader names
 * them. Three sit above the SipLink layer in the figure and three below, but
 * the split is only composition — the argument is that all six survive.
 *
 * Every one of these is drawn from the enterprise entry in lib/solutions.ts.
 * Nothing here is a capacity, a count or a coverage claim, which the source
 * documents flag as unverified.
 */
export const estateNodes: EstateNode[] = [
  { name: "Microsoft Teams", detail: "Users call out from the client they already live in." },
  { name: "IP-PBX platforms", detail: "The systems on site keep running as they are." },
  { name: "SIP trunks", detail: "Existing carrier connections are brought in, not replaced." },
  { name: "CRM", detail: "Calls and customer records arrive together." },
  { name: "Contact centre", detail: "Queues, routing and reporting across departments." },
  { name: "Branch sites", detail: "Every location answers on the same estate." },
];

/**
 * Modernising the estate, one step at a time.
 *
 * The four verbs are the enterprise `gain` copy in lib/solutions.ts, which
 * already names this as a sequence — so an ordered figure is the shape of the
 * content rather than a decoration laid over it.
 *
 * The glosses say what each step does. None of them says anything about
 * downtime, windows or continuity of service: the source documents flag
 * availability claims as unverified, and gradually is as far as they go.
 */
export const estateSteps: { verb: string; detail: string }[] = [
  {
    verb: "Connect",
    detail: "Existing telephony, trunks and platforms join the layer.",
  },
  {
    verb: "Integrate",
    detail: "Calling reaches the CRM and applications teams already use.",
  },
  {
    verb: "Automate",
    detail: "Routine interactions handled, the rest routed to a person.",
  },
  {
    verb: "Scale",
    detail: "More sites and teams added as administration, not as projects.",
  },
];

/** The two beats of the hero figure, in the panel header. */
export const estatePhases = [
  {
    label: "Your estate today",
    note: "Six systems, each managed on its own. Nobody has the whole picture.",
  },
  {
    label: "Your estate on SipLink",
    note: "The same six systems. One layer between them, and one place to see them from.",
  },
];

/* -------------------------------------------------------------------------- */

export const businessSizes: SizeContent[] = [
  {
    slug: "startups",
    label: "Startups",
    short: "Startups",
    visual: "ring",
    placement: "below",
    includedAs: "phone",
    heroImage: {
      src: "/solutions/startuphd.png",
      alt: "Three colleagues smiling together at a laptop, with SipLink call activity, messages and calling features shown around them.",
      width: 1489,
      height: 1056,
    },
    heroPoints: [
      "Run your phone system from the cloud, with no hardware to buy or maintain.",
      "Work from mobile, the browser or a desk phone, from your first hire onward.",
      "Add extensions and features on demand instead of buying capacity up front.",
    ],
    note: "One number. Every phone on the ring lights at once, and whoever is free answers.",
    feature: {
      lead: "Everyone answers the same number.",
      body: "There is no receptionist to route around and no queue to sit in. A call to your business number rings every phone on the ring at once — mobile, browser and desk together — and whoever is free takes it. When you hire, the new extension joins the ring from the web portal: no hardware, no second system, and nothing to migrate later.",
    },
    faqs: [
      {
        question: "Do we need to buy phones to start?",
        answer:
          "No. The phone system runs in the cloud and the team can work from mobile, the browser and softphones, so there is nothing to install and nothing in a telecom closet to maintain. Desk phones are an option, not a requirement.",
      },
      {
        question: "What happens when we hire someone?",
        answer:
          "You add an extension from the web portal and they join the ring. Adding users and features happens on demand rather than by buying capacity up front, so headcount changes do not mean re-platforming.",
      },
      {
        question: "Can we sound like a bigger company?",
        answer:
          "Yes — an IVR menu answers and routes callers to sales or support before anyone picks up, which is the part callers read as an established business.",
      },
      {
        question: "What if we outgrow this setup?",
        answer:
          "The same platform carries the capabilities the larger sizes use — shared PBX, queues, routing and integrations. Growing into them is configuration, not a move.",
      },
    ],
  },
  {
    slug: "small-business",
    label: "Small Business",
    short: "Small Business",
    headline: "Every call finds someone.",
    standfirst:
      "If the desk is busy the call rings the next phone, and the next. You set that order once in a browser — there is no system to run and nobody to ring about it.",
    faqs: [
      {
        question: "Who manages this if we have no IT staff?",
        answer:
          "You do, from a web portal. Extensions, call flows, business hours and users are configured centrally and changes take effect immediately — there is no specialist step between deciding something and it being true.",
      },
      {
        question: "What happens to calls after we close?",
        answer:
          "Whatever you set. Calls outside business hours can go to voicemail, which arrives in the inbox as email, or forward to the mobile of whoever is on call — on the business number rather than a personal one.",
      },
      {
        question: "Can staff take the business line with them?",
        answer:
          "Yes. The same virtual PBX reaches desk phones, softphones, browsers and mobile, so being out of the building does not mean being off the phone system.",
      },
      {
        question: "Will it connect to the tools we already use?",
        answer:
          "Calling connects to CRM and business applications where supported, so calls are logged against the customer rather than remembered separately.",
      },
    ],
  },
  {
    slug: "mid-market",
    label: "Mid-Market",
    short: "Mid-Market",
    headline: "Know who is waiting, and why.",
    standfirst:
      "Routing puts each caller with the team that can help them. The reports afterwards tell you where to put your people next — across every department and site, on one platform.",
    visual: "queue",
    placement: "beside",
    includedAs: "list",
    note: "Callers wait in one queue while free agents take the next in line. Open or close an agent to see what staffing does to it.",
    faqs: [
      {
        question: "How is this different from a bigger phone system?",
        answer:
          "The difference is the queue and what sits around it: skill-based routing, call flows tuned per team, and reporting on both. A basic setup rings phones; this decides which phone, and tells you afterwards how that went.",
      },
      {
        question: "Can we run several sites from one place?",
        answer:
          "Yes. Multiple locations and departments are run from centralised administration, so adding a site is an administrative change rather than another system to keep.",
      },
      {
        question: "What reporting do we get?",
        answer:
          "CDR, agent and queue reports, to understand where calls are going and where they are waiting. The point of the reports is the staffing decision they inform.",
      },
      {
        question: "Does it work with our CRM?",
        answer:
          "Screen pop, click-to-dial and call logging connect to your applications where supported, so an agent answers with the record already open.",
      },
    ],
  },
  {
    slug: "enterprise",
    label: "Enterprise",
    short: "Enterprise",
    headline: "Keep what you run. Connect all of it.",
    standfirst:
      "Teams, PBX platforms, SIP trunks, CRM and contact centres across every site, joined into one environment you can see and manage. Nothing is switched off to get there.",
    visual: "stack",
    placement: "beside",
    includedAs: "list",
    note: "A call passes down through the estate. Choose a layer to see what it does.",
    faqs: [
      {
        question: "Do we have to replace what we already run?",
        answer:
          "No, and that is the point. Existing telephony, cloud platforms and business applications are connected into one environment, so the estate is modernised gradually rather than swapped out.",
      },
      {
        question: "How does this work with Microsoft Teams?",
        answer:
          "Teams is connected to your business telephony so users make and take external calls without a separate phone system beside it.",
      },
      {
        question: "What does the session border controller do?",
        answer:
          "It is the controlled layer between your voice infrastructure and external SIP networks and platforms — the place where what reaches the estate is decided.",
      },
      {
        question: "Can we keep visibility across all of it?",
        answer:
          "Calls route across locations, communication integrates with business applications, and customer interactions can be monitored and analysed from one environment rather than from each system separately.",
      },
    ],
  },
];

export function getBusinessSize(slug: string): SizeContent | undefined {
  return businessSizes.find((size) => size.slug === slug);
}
