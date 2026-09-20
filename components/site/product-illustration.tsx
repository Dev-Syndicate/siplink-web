import { Fragment } from "react";

import {
  Activity,
  ArrowLeftRight,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  Clock,
  Cloud,
  Code2,
  FileAudio,
  Filter,
  Globe,
  Headset,
  Inbox,
  Laptop,
  Layers,
  ListOrdered,
  Lock,
  type LucideIcon,
  MessageCircle,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  Radio,
  Router,
  Send,
  Server,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Illustrations for the product pages — one scene per product.
 *
 * The brief: a visitor should recognise the product from the picture before
 * they read the label. So each scene is built from labelled icon cards rather
 * than abstract line art — what plugs in on the left, what SipLink does in the
 * middle, what it reaches on the right. Composed from theme tokens and
 * `lucide-react`, so both themes work and nothing extra is downloaded.
 *
 * Every product has its own scene, keyed by slug — no two products share a
 * picture.
 */
type Props = {
  /** Product slug — selects the scene. */
  slug: string;
  className?: string;
};

/* ------------------------------------------------------------------ *
 * Shared kit
 * ------------------------------------------------------------------ */

type Endpoint = {
  icon: LucideIcon;
  label: string;
};

/**
 * A labelled endpoint: icon in a soft card, caption underneath. These are the
 * things a reader recognises at a glance — a desk phone, a mobile, a laptop.
 */
function EndpointCard({ icon: Icon, label }: Endpoint) {
  return (
    <div className="flex w-14 shrink-0 flex-col items-center gap-1.5 text-center">
      <span className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-primary shadow-sm">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="text-[9px] leading-tight font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

/** A larger card for the things in the scene's spine. */
function PillarCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: LucideIcon;
  title: string;
  lines?: string[];
}) {
  return (
    <div className="flex w-22 shrink-0 flex-col items-center gap-1.5 rounded-xl border border-border bg-background px-2 py-3 text-center shadow-sm">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="text-[11px] leading-tight font-semibold">{title}</span>
      {lines?.length ? (
        <span className="text-[9px] leading-snug text-muted-foreground">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      ) : null}
    </div>
  );
}

/** A straight link between two spine cards. */
function SpineLink() {
  return <div className="h-0.5 w-3 shrink-0 self-center bg-primary/70" />;
}

/** Status chip — a live dot and a short state. */
function StatusPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 shadow-sm">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
      <span className="font-mono text-[10px] font-semibold tracking-widest text-foreground uppercase">
        {text}
      </span>
    </span>
  );
}

/**
 * The SipLink hub — a cloud carrying the brand mark. This is the one place the
 * logo appears inside a scene, so it stays the focal point.
 */
function BrandCloud({ caption }: { caption?: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <div className="relative flex w-24 items-center justify-center">
        <svg
          viewBox="0 0 132 78"
          className="w-full"
          role="presentation"
          aria-hidden
        >
          <path
            d="M36 72C20 72 8 60 8 45s12-27 28-27c5-10 16-16 28-16 17 0 31 12 34 28 14 2 26 13 26 27 0 6-2 11-6 15z"
            className="fill-background stroke-primary"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        {/* Wordmark as text, not the raster logo, so it stays legible in
            both themes against the cloud fill. */}
        <span className="absolute top-1/2 -translate-y-1/2 text-[13px] font-semibold tracking-tight">
          <span className="text-primary">sip</span>
          <span className="text-foreground">link</span>
        </span>
      </div>
      {caption ? (
        <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-primary uppercase">
          {caption}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Connector rails. Drawn as one stretched SVG behind the cards so the curves
 * always meet the spine cleanly, whatever the column width works out to be.
 */
function Rails({ mirrored = false }: { mirrored?: boolean }) {
  const rows = [16, 76, 136];
  return (
    <svg
      viewBox="0 0 120 152"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden
      className={cn("size-full", mirrored && "-scale-x-100")}
    >
      {rows.map((y, i) => {
        const d = `M0 ${y} C 56 ${y}, 64 76, 120 76`;
        return (
          <g key={y}>
            <path
              d={d}
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeWidth={i === 1 ? 2 : 1.5}
              className={i === 1 ? "stroke-primary/70" : "stroke-primary/25"}
            />
            {i === 1 ? (
              <path
                d={d}
                fill="none"
                vectorEffect="non-scaling-stroke"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="flow-path stroke-primary"
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/** Faint dotted field behind the scene, faded out at the edges. */
function DotField({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 400 180"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden
      className="size-full"
    >
      <defs>
        <pattern
          id={`dots-${uid}`}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.6" className="fill-primary/30" />
        </pattern>
        <radialGradient id={`dotfade-${uid}`} cx="50%" cy="50%" r="58%">
          <stop offset="0%" stopColor="white" stopOpacity="0.85" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`dotmask-${uid}`}>
          <rect width="400" height="180" fill={`url(#dotfade-${uid})`} />
        </mask>
      </defs>
      <rect
        width="400"
        height="180"
        fill={`url(#dots-${uid})`}
        mask={`url(#dotmask-${uid})`}
      />
    </svg>
  );
}

/**
 * The standard three-part scene: endpoints in, SipLink in the middle,
 * destinations out. Most products are some version of this.
 */
function FlowScene({
  uid,
  left,
  right,
  spine,
  status,
}: {
  uid: string;
  left: Endpoint[];
  right: Endpoint[];
  spine: React.ReactNode;
  status: string;
}) {
  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-8 bottom-0 -z-10"
      >
        <DotField uid={uid} />
      </div>

      <div className="flex justify-center pb-4">
        <StatusPill text={status} />
      </div>

      <div className="flex items-stretch">
        <div className="flex shrink-0 flex-col justify-between gap-3">
          {left.map((item) => (
            <EndpointCard key={item.label} {...item} />
          ))}
        </div>

        <div className="min-w-5 flex-1">
          <Rails />
        </div>

        <div className="flex shrink-0 items-center">{spine}</div>

        <div className="min-w-5 flex-1">
          <Rails mirrored />
        </div>

        <div className="flex shrink-0 flex-col justify-between gap-3">
          {right.map((item) => (
            <EndpointCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Scenes
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ *
 * Scenes
 *
 * Each product is one row of data: what plugs in on the left, what SipLink
 * does in the middle, what it reaches on the right. Written as a table
 * rather than 24 near-identical components, so the differences between
 * products are visible at a glance and no two can silently end up with the
 * same picture.
 * ------------------------------------------------------------------ */

type SpineCard =
  | { kind: "brand"; caption: string }
  | { kind: "pillar"; icon: LucideIcon; title: string; lines: [string, string] };

type SceneSpec = {
  status: string;
  left: Endpoint[];
  spine: SpineCard[];
  right: Endpoint[];
};

const SCENE_SPECS: Record<string, SceneSpec> = {
  /* ---------------------------------------------------------- voice */
  "sip-trunking": {
    status: "Network active",
    left: [
      { icon: Phone, label: "IP Phones" },
      { icon: PhoneCall, label: "Desk Phones" },
      { icon: Laptop, label: "Softphones" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: Server,
        title: "Your PBX",
        lines: ["Extensions &", "phone system"],
      },
      { kind: "brand", caption: "SIP Trunk" },
      {
        kind: "pillar",
        icon: Globe,
        title: "PSTN",
        lines: ["Global telephone", "network"],
      },
    ],
    right: [
      { icon: Building2, label: "Local Calls" },
      { icon: Smartphone, label: "Mobile Networks" },
      { icon: Globe, label: "International" },
    ],
  },

  "cloud-pbx": {
    status: "System online",
    left: [
      { icon: Users, label: "Extensions" },
      { icon: Laptop, label: "Softphones" },
      { icon: Smartphone, label: "Mobile App" },
    ],
    spine: [
      { kind: "brand", caption: "Cloud PBX" },
      {
        kind: "pillar",
        icon: ListOrdered,
        title: "Call flows",
        lines: ["IVR, queues &", "voicemail"],
      },
    ],
    right: [
      { icon: PhoneIncoming, label: "Inbound" },
      { icon: PhoneOutgoing, label: "Outbound" },
      { icon: BarChart3, label: "Reporting" },
    ],
  },

  "hosted-pbx": {
    status: "Managed by SipLink",
    left: [
      { icon: Building2, label: "Head Office" },
      { icon: Store, label: "Branches" },
      { icon: Laptop, label: "Remote Staff" },
    ],
    spine: [
      { kind: "brand", caption: "Hosted PBX" },
      {
        kind: "pillar",
        icon: ServerCog,
        title: "We run it",
        lines: ["Updates &", "maintenance"],
      },
    ],
    right: [
      { icon: Phone, label: "Business Lines" },
      { icon: FileAudio, label: "Recordings" },
      { icon: ShieldCheck, label: "Access Control" },
    ],
  },

  "ip-pbx": {
    status: "On premise",
    left: [
      { icon: Phone, label: "Desk Phones" },
      { icon: Users, label: "Extensions" },
      { icon: Network, label: "Gateways" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: Server,
        title: "Your rack",
        lines: ["Call control", "stays on site"],
      },
      { kind: "brand", caption: "SIP Uplink" },
    ],
    right: [
      { icon: Globe, label: "External Calls" },
      { icon: Cloud, label: "Hybrid Cloud" },
      { icon: Lock, label: "Your Network" },
    ],
  },

  /* -------------------------------------------------------- numbers */
  "did-numbers": {
    status: "Numbers live",
    left: [{ icon: PhoneIncoming, label: "Customer Calls" }],
    spine: [
      {
        kind: "pillar",
        icon: Layers,
        title: "DID range",
        lines: ["One number", "per person"],
      },
      { kind: "brand", caption: "Direct Dial" },
    ],
    right: [
      { icon: Users, label: "Sales" },
      { icon: Headset, label: "Support" },
      { icon: Building2, label: "Billing" },
    ],
  },

  "toll-free-numbers": {
    status: "Free to call",
    left: [
      { icon: Smartphone, label: "Mobile Callers" },
      { icon: Phone, label: "Landline Callers" },
      { icon: Globe, label: "Other Regions" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: PhoneCall,
        title: "Toll-free",
        lines: ["Caller is not", "charged"],
      },
      { kind: "brand", caption: "Routing" },
    ],
    right: [
      { icon: Headset, label: "Helpline" },
      { icon: ListOrdered, label: "IVR Menu" },
      { icon: Users, label: "Your Teams" },
    ],
  },

  "virtual-numbers": {
    status: "No line required",
    left: [
      { icon: Globe, label: "New Market" },
      { icon: Building2, label: "Local Presence" },
    ],
    spine: [
      { kind: "brand", caption: "Virtual Number" },
      {
        kind: "pillar",
        icon: PhoneForwarded,
        title: "Route anywhere",
        lines: ["No physical", "line needed"],
      },
    ],
    right: [
      { icon: Laptop, label: "Softphone" },
      { icon: Smartphone, label: "Mobile" },
      { icon: Users, label: "Any Extension" },
    ],
  },

  "number-porting": {
    status: "Continuity kept",
    left: [
      { icon: Building2, label: "Old Carrier" },
      { icon: Phone, label: "Your Numbers" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: ArrowLeftRight,
        title: "Porting",
        lines: ["Validate &", "transfer"],
      },
      { kind: "brand", caption: "Same Numbers" },
    ],
    right: [
      { icon: PhoneIncoming, label: "Customers Dial" },
      { icon: ListOrdered, label: "Your Call Flows" },
      { icon: ShieldCheck, label: "No Disruption" },
    ],
  },

  /* -------------------------------------------------- contact centre */
  "call-center": {
    status: "Queue healthy",
    left: [
      { icon: PhoneIncoming, label: "Inbound" },
      { icon: PhoneOutgoing, label: "Outbound" },
    ],
    spine: [
      { kind: "brand", caption: "Contact Centre" },
      {
        kind: "pillar",
        icon: Headset,
        title: "Agents",
        lines: ["Routed by", "your rules"],
      },
    ],
    right: [
      { icon: Activity, label: "Live Monitor" },
      { icon: FileAudio, label: "Recording" },
      { icon: BarChart3, label: "Reports" },
    ],
  },

  "predictive-dialer": {
    status: "Campaign running",
    left: [
      { icon: ListOrdered, label: "Contact List" },
      { icon: Filter, label: "Segments" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: Activity,
        title: "Pacing",
        lines: ["Dials to agent", "availability"],
      },
      { kind: "brand", caption: "Connected" },
    ],
    right: [
      { icon: Headset, label: "Free Agent" },
      { icon: PhoneCall, label: "Live Answer" },
      { icon: BarChart3, label: "Outcomes" },
    ],
  },

  "auto-dialer": {
    status: "Campaign queued",
    left: [
      { icon: ListOrdered, label: "Call List" },
      { icon: Clock, label: "Schedule" },
    ],
    spine: [
      { kind: "brand", caption: "Auto Dialer" },
      {
        kind: "pillar",
        icon: Radio,
        title: "Announcement",
        lines: ["Recorded or", "generated"],
      },
    ],
    right: [
      { icon: Smartphone, label: "Customers" },
      { icon: Headset, label: "Or an Agent" },
      { icon: BarChart3, label: "Results" },
    ],
  },

  ivr: {
    status: "Menu active",
    left: [{ icon: PhoneIncoming, label: "Caller Dials" }],
    spine: [
      {
        kind: "pillar",
        icon: ListOrdered,
        title: "Press 1, 2, 3",
        lines: ["Multi-level", "menu"],
      },
      { kind: "brand", caption: "Routed" },
    ],
    right: [
      { icon: Users, label: "Sales" },
      { icon: Headset, label: "Support" },
      { icon: Clock, label: "After Hours" },
    ],
  },

  "call-recording": {
    status: "Recording on",
    left: [
      { icon: PhoneIncoming, label: "Inbound" },
      { icon: PhoneOutgoing, label: "Outbound" },
    ],
    spine: [
      { kind: "brand", caption: "Captured" },
      {
        kind: "pillar",
        icon: FileAudio,
        title: "Secure store",
        lines: ["Role-based", "access"],
      },
    ],
    right: [
      { icon: Filter, label: "Search" },
      { icon: Headset, label: "Playback" },
      { icon: ShieldCheck, label: "Export" },
    ],
  },

  "call-analytics": {
    status: "Data flowing",
    left: [
      { icon: PhoneCall, label: "Every Call" },
      { icon: Headset, label: "Agent Activity" },
      { icon: Clock, label: "Durations" },
    ],
    spine: [
      { kind: "brand", caption: "Analytics" },
      {
        kind: "pillar",
        icon: BarChart3,
        title: "Reports",
        lines: ["Volumes, missed", "calls & trends"],
      },
    ],
    right: [
      { icon: Activity, label: "Busy Periods" },
      { icon: Users, label: "Staffing" },
      { icon: Layers, label: "Export" },
    ],
  },

  /* ------------------------------------------------------------ APIs */
  "voice-api": {
    status: "API connected",
    left: [
      { icon: Code2, label: "Your App" },
      { icon: Boxes, label: "Your CRM" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: Webhook,
        title: "Voice API",
        lines: ["Request a call,", "get events back"],
      },
      { kind: "brand", caption: "Voice Network" },
    ],
    right: [
      { icon: PhoneOutgoing, label: "Place Calls" },
      { icon: PhoneIncoming, label: "Receive Calls" },
      { icon: Activity, label: "Call Events" },
    ],
  },

  "sms-api": {
    status: "Messages sending",
    left: [
      { icon: Code2, label: "Your App" },
      { icon: Workflow, label: "Triggers" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: Send,
        title: "SMS API",
        lines: ["One request", "per message"],
      },
      { kind: "brand", caption: "Delivered" },
    ],
    right: [
      { icon: ShieldCheck, label: "Passcodes" },
      { icon: Clock, label: "Reminders" },
      { icon: Smartphone, label: "Any Mobile" },
    ],
  },

  "whatsapp-api": {
    status: "Inbox connected",
    left: [
      { icon: MessageCircle, label: "Customer Chats" },
      { icon: Code2, label: "Your Systems" },
    ],
    spine: [
      { kind: "brand", caption: "WhatsApp API" },
      {
        kind: "pillar",
        icon: Inbox,
        title: "Shared inbox",
        lines: ["Assigned to", "your agents"],
      },
    ],
    right: [
      { icon: Headset, label: "Support" },
      { icon: MessagesSquare, label: "Order Updates" },
      { icon: Layers, label: "Full History" },
    ],
  },

  "webrtc-sdk": {
    status: "In-browser calling",
    left: [
      { icon: MonitorSmartphone, label: "Your Web App" },
      { icon: Code2, label: "Embedded SDK" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: PhoneCall,
        title: "Click to call",
        lines: ["Nothing to", "install"],
      },
      { kind: "brand", caption: "Connected" },
    ],
    right: [
      { icon: Headset, label: "Your Agents" },
      { icon: Users, label: "Your Customers" },
      { icon: Network, label: "Same Numbers" },
    ],
  },

  "sip-api": {
    status: "SIP integrated",
    left: [
      { icon: Server, label: "Your PBX" },
      { icon: Code2, label: "Your Platform" },
      { icon: Network, label: "SIP Endpoints" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: Router,
        title: "SIP API",
        lines: ["Signalling you", "can control"],
      },
      { kind: "brand", caption: "Voice Network" },
    ],
    right: [
      { icon: PhoneForwarded, label: "Routing" },
      { icon: Layers, label: "Registration" },
      { icon: Globe, label: "Carriers" },
    ],
  },

  /* ------------------------------------------------------ enterprise */
  "teams-calling": {
    status: "Teams connected",
    left: [
      { icon: Users, label: "Teams Users" },
      { icon: Laptop, label: "Desktop App" },
      { icon: Smartphone, label: "Mobile App" },
    ],
    spine: [
      { kind: "brand", caption: "Teams Calling" },
      {
        kind: "pillar",
        icon: Phone,
        title: "Your numbers",
        lines: ["Mapped to", "Teams users"],
      },
    ],
    right: [
      { icon: Building2, label: "Customers" },
      { icon: Globe, label: "Suppliers" },
      { icon: Smartphone, label: "Mobile Numbers" },
    ],
  },

  sbc: {
    status: "Border controlled",
    left: [
      { icon: Server, label: "Your PBX" },
      { icon: Users, label: "Teams" },
      { icon: Headset, label: "Contact Centre" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: ShieldCheck,
        title: "SBC",
        lines: ["One controlled", "crossing point"],
      },
      { kind: "brand", caption: "External SIP" },
    ],
    right: [
      { icon: Globe, label: "Carriers" },
      { icon: Cloud, label: "Cloud Platforms" },
      { icon: Activity, label: "Visibility" },
    ],
  },

  "call-queue": {
    status: "Callers waiting",
    left: [
      { icon: PhoneIncoming, label: "All Lines Busy" },
      { icon: Clock, label: "Callers Hold" },
    ],
    spine: [
      {
        kind: "pillar",
        icon: ListOrdered,
        title: "The queue",
        lines: ["Position &", "announcements"],
      },
      { kind: "brand", caption: "Next Free Agent" },
    ],
    right: [
      { icon: Headset, label: "Agent Answers" },
      { icon: PhoneForwarded, label: "Callback" },
      { icon: Activity, label: "Supervisor View" },
    ],
  },

  "crm-integration": {
    status: "CRM linked",
    left: [
      { icon: PhoneIncoming, label: "Call Arrives" },
      { icon: Boxes, label: "Your CRM" },
    ],
    spine: [
      { kind: "brand", caption: "Connected" },
      {
        kind: "pillar",
        icon: Workflow,
        title: "Screen pop",
        lines: ["Record opens", "as it rings"],
      },
    ],
    right: [
      { icon: Users, label: "Agent Sees Who" },
      { icon: PhoneOutgoing, label: "Click to Dial" },
      { icon: Layers, label: "Logged Back" },
    ],
  },

  "ai-voice-assistant": {
    status: "Assistant enabled",
    left: [{ icon: PhoneIncoming, label: "Caller Speaks" }],
    spine: [
      {
        kind: "pillar",
        icon: Bot,
        title: "AI assistant",
        lines: ["Handles routine", "requests"],
      },
      { kind: "brand", caption: "Or Hands Over" },
    ],
    right: [
      { icon: Sparkles, label: "Resolved" },
      { icon: Headset, label: "Human Agent" },
      { icon: FileAudio, label: "Summary" },
    ],
  },
};

/** Renders one row of SCENE_SPECS. */
function Scene({ uid, spec }: { uid: string; spec: SceneSpec }) {
  return (
    <FlowScene
      uid={uid}
      status={spec.status}
      left={spec.left}
      right={spec.right}
      spine={spec.spine.map((card, index) => (
        <Fragment key={index}>
          {index > 0 ? <SpineLink /> : null}
          {card.kind === "brand" ? (
            <BrandCloud caption={card.caption} />
          ) : (
            <PillarCard icon={card.icon} title={card.title} lines={card.lines} />
          )}
        </Fragment>
      ))}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Registry
 * ------------------------------------------------------------------ */

export function ProductIllustration({ slug, className }: Props) {
  const spec = SCENE_SPECS[slug];

  // Every product has its own scene. A missing one is a data error rather
  // than something to paper over with a stand-in picture.
  if (!spec) return null;

  return (
    <div className={cn("w-full", className)}>
      <Scene uid={slug} spec={spec} />
    </div>
  );
}
