import { Fragment } from "react";

import {
  Activity,
  ArrowLeftRight,
  AudioLines,
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
  MessagesSquare,
  MessageCircle,
  MonitorSmartphone,
  Network,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  Router,
  Send,
  Server,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  type LucideIcon,
  Users,
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

/* ------------------------------------------------------------------ *
 * Scene shapes
 * ------------------------------------------------------------------ */

type SpineCard =
  | { kind: "brand"; caption: string }
  | { kind: "pillar"; icon: LucideIcon; title: string; lines: [string, string] };

type FlowSpec = {
  layout: "flow";
  status: string;
  left: Endpoint[];
  spine: SpineCard[];
  right: Endpoint[];
};

type FanSpec = {
  layout: "fan";
  status: string;
  source: { icon: LucideIcon; value: string; label: string };
  out: { icon: LucideIcon; label: string; note?: string }[];
};

type QueueSpec = {
  layout: "queue";
  status: string;
  waitingIcon: LucideIcon;
  waitingLabel: string;
  queueLabel: string;
  agents: { icon: LucideIcon; label: string; state: "free" | "busy" }[];
};

type PanelSpec = {
  layout: "panel";
  status: string;
  title: string;
  /** Bar heights as percentages; `peak` is the one picked out in brand pink. */
  bars: number[];
  peak: number;
  axis: [string, string];
  readouts: { icon: LucideIcon; label: string; value: string }[];
};

type WaveSpec = {
  layout: "wave";
  status: string;
  title: string;
  /** Waveform bar heights as percentages, mirrored about the centre line. */
  wave: number[];
  /** How far through the recording the playhead sits, 0-1. */
  playhead: number;
  elapsed: string;
  total: string;
  readouts: { icon: LucideIcon; label: string; value: string }[];
};

type DialerSpec = {
  layout: "dialer";
  status: string;
  listLabel: string;
  /** Contacts worked through in order; the scene animates the progress. */
  contacts: { number: string }[];
  /** The pacing engine, raised as the centre of the picture. */
  engine: { icon: LucideIcon; title: string; note: string; metric: string };
  /** True where the row is a person whose availability changes. */
  agents: { icon: LucideIcon; label: string; cycles?: boolean }[];
};

type BroadcastSpec = {
  layout: "broadcast";
  status: string;
  /** The recorded announcement the campaign plays when a call connects. */
  message: { icon: LucideIcon; title: string; note: string };
  /** How far through the list the campaign has worked. */
  sent: number;
  total: number;
  /** Calls currently in flight, each at its own stage. */
  calls: { number: string; stage: "ringing" | "playing" | "done" }[];
  outcomes: { icon: LucideIcon; label: string }[];
};

type SystemSpec = {
  layout: "system";
  status: string;
  /** The call arriving from outside. */
  caller: { icon: LucideIcon; label: string; number: string };
  /** How the system decides where the call goes. */
  routing: { icon: LucideIcon; label: string }[];
  /** Where the call can land; `live` marks the one being rung now. */
  extensions: { icon: LucideIcon; label: string; ext: string; live?: boolean }[];
  /** Everything else the system keeps doing in the background. */
  alsoLabel: string;
  also: { icon: LucideIcon; label: string }[];
};

type CodeSpec = {
  layout: "code";
  status: string;
  lines: { text: string; accent?: boolean }[];
  requestLabel: string;
  responseLabel: string;
  caption: string;
  results: Endpoint[];
};

type SwapSpec = {
  layout: "swap";
  status: string;
  beforeLabel: string;
  before: Endpoint[];
  verb: string;
  afterLabel: string;
  after: Endpoint[];
};

type OrbitSpec = {
  layout: "orbit";
  status: string;
  caption: string;
  around: Endpoint[];
};

type SceneSpec =
  | FlowSpec
  | FanSpec
  | QueueSpec
  | PanelSpec
  | WaveSpec
  | DialerSpec
  | SystemSpec
  | BroadcastSpec
  | CodeSpec
  | SwapSpec
  | OrbitSpec;

/* ------------------------------------------------------------------ *
 * Layouts
 *
 * Six compositions, not one. A queue should look like a queue and a
 * dashboard should look like a dashboard — products that do different
 * things get different pictures, rather than the same diagram with the
 * labels swapped.
 * ------------------------------------------------------------------ */

/** Ambient dot field + status chip, shared by every layout. */
function Stage({
  uid,
  status,
  children,
}: {
  uid: string;
  status: string;
  children: React.ReactNode;
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
      {children}
    </div>
  );
}

/**
 * FLOW — a linear journey. Endpoints feed in on the left, cross the thing
 * SipLink provides, and arrive on the right. For products that are a path
 * between two worlds.
 */
function FlowLayout({ uid, spec }: { uid: string; spec: FlowSpec }) {
  return (
    <Stage uid={uid} status={spec.status}>
      <div className="flex items-stretch">
        <div className="flex shrink-0 flex-col justify-between gap-3">
          {spec.left.map((item) => (
            <EndpointCard key={item.label} {...item} />
          ))}
        </div>
        <div className="min-w-5 flex-1">
          <Rails />
        </div>
        <div className="flex shrink-0 items-center">
          {spec.spine.map((card, i) => (
            <Fragment key={i}>
              {i > 0 ? <SpineLink /> : null}
              {card.kind === "brand" ? (
                <BrandCloud caption={card.caption} />
              ) : (
                <PillarCard
                  icon={card.icon}
                  title={card.title}
                  lines={card.lines}
                />
              )}
            </Fragment>
          ))}
        </div>
        <div className="min-w-5 flex-1">
          <Rails mirrored />
        </div>
        <div className="flex shrink-0 flex-col justify-between gap-3">
          {spec.right.map((item) => (
            <EndpointCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </Stage>
  );
}

/**
 * FAN — one thing on the left opening out to many on the right. The whole
 * point of a published number or a menu is that one entry point reaches
 * several destinations, so the picture says that and nothing else.
 */
function FanLayout({ uid, spec }: { uid: string; spec: FanSpec }) {
  const n = spec.out.length;
  return (
    <Stage uid={uid} status={spec.status}>
      <div className="flex items-center gap-2">
        {/* The single entry point, stated large */}
        <div className="flex w-28 shrink-0 flex-col items-center gap-2 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl border border-primary/40 bg-background text-primary shadow-sm">
            <spec.source.icon className="size-5" aria-hidden />
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-tight text-primary">
            {spec.source.value}
          </span>
          <span className="text-[9px] leading-tight text-muted-foreground">
            {spec.source.label}
          </span>
        </div>

        {/* Splitting rails */}
        <div className="h-[168px] min-w-6 flex-1">
          <svg
            viewBox="0 0 120 168"
            preserveAspectRatio="none"
            role="presentation"
            aria-hidden
            className="size-full"
          >
            {spec.out.map((_, i) => {
              const y = ((i + 0.5) / n) * 168;
              const d = `M0 84 C 56 84, 64 ${y}, 120 ${y}`;
              const live = i === Math.floor(n / 2);
              return (
                <g key={i}>
                  <path
                    d={d}
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    strokeWidth={live ? 2 : 1.5}
                    className={live ? "stroke-primary/70" : "stroke-primary/25"}
                  />
                  {live ? (
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
        </div>

        {/* Destinations, stacked as rows rather than icon chips */}
        <div className="flex shrink-0 flex-col gap-2">
          {spec.out.map(({ icon: Icon, label, note }) => (
            <div
              key={label}
              className="flex w-40 items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 shadow-sm"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-3.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] leading-tight font-semibold">
                  {label}
                </span>
                {note ? (
                  <span className="block text-[9px] leading-tight text-muted-foreground">
                    {note}
                  </span>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/**
 * QUEUE — callers waiting in line, then handed to agents. Drawn as an
 * actual line of people, because that is the thing being described.
 */
function QueueLayout({ uid, spec }: { uid: string; spec: QueueSpec }) {
  return (
    <Stage uid={uid} status={spec.status}>
      <div className="flex items-center gap-3">
        {/* Waiting callers — a real line, fading toward the back */}
        <div className="flex shrink-0 flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
            {spec.waitingLabel}
          </span>
          <div className="flex flex-col gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="flex size-8 items-center justify-center rounded-full border border-primary/40 bg-background text-primary"
                style={{ opacity: 1 - i * 0.2 }}
              >
                <spec.waitingIcon className="size-3.5" aria-hidden />
              </span>
            ))}
          </div>
        </div>

        {/* The queue itself — a dashed holding pen */}
        <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
          <div className="w-full rounded-xl border border-dashed border-primary/50 bg-primary/[0.04] px-3 py-4">
            <div className="flex flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-primary/60 tabular-nums">
                    {i + 1}
                  </span>
                  <span
                    className="h-1.5 rounded-full bg-primary/30"
                    style={{ width: `${70 - i * 16}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-primary uppercase">
            {spec.queueLabel}
          </span>
        </div>

        {/* Arrow into the agents */}
        <div aria-hidden className="shrink-0">
          <svg viewBox="0 0 28 10" className="w-7" role="presentation">
            <path
              d="M0 5h20M16 1l5 4-5 4"
              fill="none"
              className="stroke-primary"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Agents */}
        <div className="flex shrink-0 flex-col gap-2">
          {spec.agents.map(({ icon: Icon, label, state }) => (
            <div
              key={label}
              className="flex w-32 items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2 shadow-sm"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-3.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] leading-tight font-semibold">
                  {label}
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      state === "busy" ? "bg-muted-foreground/40" : "bg-primary",
                    )}
                  />
                  <span className="text-[9px] text-muted-foreground">
                    {state === "busy" ? "On a call" : "Available"}
                  </span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/**
 * PANEL — a reporting surface. For products whose output is something you
 * look at rather than something that travels somewhere.
 */
function PanelLayout({ uid, spec }: { uid: string; spec: PanelSpec }) {
  return (
    <Stage uid={uid} status={spec.status}>
      <div className="rounded-xl border border-border bg-background shadow-sm">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "size-1.5 rounded-full",
                  i === 0 ? "bg-primary" : "bg-muted-foreground/25",
                )}
              />
            ))}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            {spec.title}
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          {/* Bars — a deterministic shape, not random */}
          <div>
            <div className="flex h-24 items-end gap-1.5">
              {spec.bars.map((h, i) => (
                <span
                  key={i}
                  className={cn(
                    "flex-1 rounded-t-sm",
                    i === spec.peak ? "bg-primary" : "bg-primary/25",
                  )}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground">
              <span>{spec.axis[0]}</span>
              <span>{spec.axis[1]}</span>
            </div>
          </div>

          {/* Readouts beside the chart */}
          <dl className="flex shrink-0 flex-col justify-center gap-2.5 sm:w-32">
            {spec.readouts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <dt className="text-[9px] leading-tight text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="text-[11px] leading-tight font-semibold">
                    {value}
                  </dd>
                </span>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Stage>
  );
}

/**
 * WAVE — a recorded conversation as an audio waveform with a playhead, which
 * is what a recording actually looks like when you go to review one. Kept
 * distinct from PANEL so recording and analytics do not share a picture.
 */
function WaveLayout({ uid, spec }: { uid: string; spec: WaveSpec }) {
  const played = Math.round(spec.wave.length * spec.playhead);
  return (
    <Stage uid={uid} status={spec.status}>
      <div className="rounded-xl border border-border bg-background shadow-sm">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="flex size-5 items-center justify-center rounded bg-primary/10 text-primary">
            <FileAudio className="size-3" aria-hidden />
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            {spec.title}
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            {/* The waveform, mirrored about a centre line. Bars before the
                playhead are solid; the rest are waiting to be played. */}
            <div className="relative flex h-20 items-center gap-[3px]">
              {spec.wave.map((h, i) => (
                <span
                  key={i}
                  className={cn(
                    "flex-1 rounded-full",
                    i < played ? "bg-primary" : "bg-primary/20",
                  )}
                  style={{ height: `${h}%` }}
                />
              ))}
              {/* Playhead */}
              <span
                aria-hidden
                className="absolute inset-y-0 w-px bg-foreground/50"
                style={{ left: `${spec.playhead * 100}%` }}
              >
                <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-foreground/70" />
              </span>
            </div>

            {/* Transport */}
            <div className="mt-3 flex items-center gap-2.5">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Play className="size-2.5 fill-current" aria-hidden />
              </span>
              <span className="font-mono text-[9px] text-muted-foreground tabular-nums">
                {spec.elapsed}
              </span>
              <span className="relative h-0.5 flex-1 rounded-full bg-border">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-primary"
                  style={{ width: `${spec.playhead * 100}%` }}
                />
              </span>
              <span className="font-mono text-[9px] text-muted-foreground tabular-nums">
                {spec.total}
              </span>
            </div>
          </div>

          <dl className="flex shrink-0 flex-col justify-center gap-2.5 sm:w-32">
            {spec.readouts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <dt className="text-[9px] leading-tight text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="text-[11px] leading-tight font-semibold">
                    {value}
                  </dd>
                </span>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Stage>
  );
}

/**
 * DIALER — a contact list on one side, agents on the other, and the pacing
 * engine lifted between them. The engine is the product: it decides how fast
 * to dial against who is free, so it sits raised on the brand ground and is
 * the only element that carries a solid fill.
 */
function DialerLayout({ uid, spec }: { uid: string; spec: DialerSpec }) {
  const rows = spec.contacts.length;
  return (
    <Stage uid={uid} status={spec.status}>
      <div className="flex items-center gap-2.5">
        {/* The list being worked through. Each row runs the same loop a beat
            later than the one above, so the campaign reads as travelling
            down the list rather than every row blinking at once. */}
        <div className="flex w-[6.75rem] shrink-0 flex-col gap-1">
          <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
            {spec.listLabel}
          </span>
          {spec.contacts.map(({ number }, i) => {
            const delay = `${(i / rows) * 8}s`;
            return (
              <div
                key={number}
                style={{ "--cycle-delay": delay } as React.CSSProperties}
                className="dial-row flex items-center gap-1.5 rounded-md border border-border px-2 py-1"
              >
                <span
                  style={{ "--cycle-delay": delay } as React.CSSProperties}
                  className="dial-dot size-1.5 shrink-0 rounded-full"
                />
                <span
                  style={{ "--cycle-delay": delay } as React.CSSProperties}
                  className="dial-number font-mono text-[9px] tabular-nums"
                >
                  {number}
                </span>
              </div>
            );
          })}
        </div>

        <svg
          viewBox="0 0 30 8"
          className="w-6 shrink-0"
          role="presentation"
          aria-hidden
        >
          <path
            d="M0 4h22M18 1l4 3-4 3"
            fill="none"
            className="stroke-primary/50"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* The pacing engine, raised */}
        <div className="min-w-0 flex-1 rounded-2xl border border-primary/30 bg-linear-to-br from-brand-from/25 via-background via-65% to-background p-3.5 text-center shadow-md ring-1 ring-primary/10">
          <span className="mx-auto flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <spec.engine.icon className="size-4.5" aria-hidden />
          </span>
          <p className="mt-2 text-[11px] leading-tight font-semibold">
            {spec.engine.title}
          </p>
          <p className="mt-1 text-[9px] leading-snug text-pretty text-muted-foreground">
            {spec.engine.note}
          </p>

          {/* The meter runs faster than the list, so the engine looks like it
              is making a decision between calls rather than with them. */}
          <div className="mt-2.5 flex items-center justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                style={
                  { "--cycle-delay": `${i * 0.16}s` } as React.CSSProperties
                }
                className="pace-bar h-3.5 w-1.5 rounded-full"
              />
            ))}
          </div>
          <p className="mt-1.5 font-mono text-[8px] tracking-widest text-primary uppercase">
            {spec.engine.metric}
          </p>
        </div>

        <svg
          viewBox="0 0 30 8"
          className="w-6 shrink-0"
          role="presentation"
          aria-hidden
        >
          <path
            d="M0 4h22M18 1l4 3-4 3"
            fill="none"
            className="stroke-primary"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Agents. `cycles` agents free and busy in turn; anything else — an
            outcome, a recorded message — is a fixed row, because a campaign
            outcome is never "on a call". */}
        <div className="flex shrink-0 flex-col gap-1.5">
          {spec.agents.map(({ icon: Icon, label, cycles }, i) => (
            <div
              key={label}
              className="flex w-[7.25rem] items-center gap-2 rounded-lg border border-border bg-background px-2 py-1.5 shadow-sm"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-3" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] leading-tight font-semibold">
                  {label}
                </span>
                <span className="flex items-center gap-1">
                  {cycles ? (
                    <span
                      style={
                        {
                          "--cycle-delay": `${i * 2.6}s`,
                        } as React.CSSProperties
                      }
                      className="agent-state size-1.5 rounded-full"
                    />
                  ) : (
                    <span className="size-1.5 rounded-full bg-primary" />
                  )}
                  <span className="text-[9px] text-muted-foreground">
                    {cycles ? "In rotation" : "Ready"}
                  </span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/**
 * BROADCAST — an outbound calling campaign. Several calls are placed at once
 * and each is at its own stage: one ringing, one with the announcement
 * playing, one already finished. Drawn as calls rather than as a message
 * fanning out, because the auto dialler dials phones — it does not send
 * messages, and a one-to-many burst reads as SMS.
 */
function BroadcastLayout({ uid, spec }: { uid: string; spec: BroadcastSpec }) {
  const pct = Math.round((spec.sent / spec.total) * 100);

  return (
    <Stage uid={uid} status={spec.status}>
      <div className="flex items-center gap-4">
        {/* The announcement, and how far through the list the run is */}
        <div className="w-[8.5rem] shrink-0 rounded-2xl border border-primary/30 bg-linear-to-br from-brand-from/25 via-background via-65% to-background p-3.5 text-center shadow-md ring-1 ring-primary/10">
          <span className="mx-auto flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <spec.message.icon className="size-4.5" aria-hidden />
          </span>
          <p className="mt-2 text-[11px] leading-tight font-semibold">
            {spec.message.title}
          </p>
          {/* The recording, shown playing, so the card reads as a voice
              message rather than as text going out. */}
          <span className="mt-2 flex h-4 items-center justify-center gap-[3px]">
            {[0, 1, 2, 3, 4, 5, 6].map((barIndex) => (
              <span
                key={barIndex}
                style={
                  { "--cycle-delay": `${barIndex * 0.1}s` } as React.CSSProperties
                }
                className="talk-bar w-[3px] rounded-full bg-primary"
              />
            ))}
          </span>
          <p className="mt-1.5 text-[9px] leading-snug text-pretty text-muted-foreground">
            {spec.message.note}
          </p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-primary/15">
            <span
              className="block h-full rounded-full bg-primary"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1.5 font-mono text-[8px] tracking-widest text-primary tabular-nums">
            {spec.sent} / {spec.total} CALLED
          </p>
        </div>

        {/* Calls in flight, each showing what stage it has reached */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
            Calls in progress
          </span>

          {spec.calls.map(({ number, stage }, i) => (
            <div
              key={number}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-2.5 py-2 shadow-sm"
            >
              {/* A handset that rings while the call is being placed */}
              <span
                style={{ "--cycle-delay": `${i * 0.45}s` } as React.CSSProperties}
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-md",
                  stage === "done"
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary/10 text-primary",
                  stage === "ringing" && "ring-shake",
                )}
              >
                {stage === "done" ? (
                  <PhoneCall className="size-3.5" aria-hidden />
                ) : (
                  <PhoneOutgoing className="size-3.5" aria-hidden />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] leading-tight tabular-nums">
                  {number}
                </span>
                <span className="text-[9px] leading-tight text-muted-foreground">
                  {stage === "ringing"
                    ? "Ringing"
                    : stage === "playing"
                      ? "Message playing"
                      : "Call complete"}
                </span>
              </span>

              {/* Stage read out as sound, so the row is unmistakably a call */}
              {stage === "playing" ? (
                <span className="flex shrink-0 items-end gap-[2px]">
                  {[0, 1, 2, 3].map((barIndex) => (
                    <span
                      key={barIndex}
                      style={
                        {
                          "--cycle-delay": `${barIndex * 0.12}s`,
                        } as React.CSSProperties
                      }
                      className="talk-bar w-[3px] rounded-full bg-primary"
                    />
                  ))}
                </span>
              ) : stage === "ringing" ? (
                <span className="flex shrink-0 gap-[3px]">
                  {[0, 1, 2].map((dotIndex) => (
                    <span
                      key={dotIndex}
                      style={
                        {
                          "--cycle-delay": `${dotIndex * 0.16}s`,
                        } as React.CSSProperties
                      }
                      className="ring-dot size-1.5 rounded-full bg-primary"
                    />
                  ))}
                </span>
              ) : (
                <span className="shrink-0 font-mono text-[9px] text-muted-foreground/60 tabular-nums">
                  00:18
                </span>
              )}
            </div>
          ))}

          {/* What each finished call becomes */}
          <div className="mt-0.5 flex items-center gap-3 border-t border-border pt-2">
            {spec.outcomes.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className="flex size-5 items-center justify-center rounded bg-muted text-muted-foreground">
                  <Icon className="size-2.5" aria-hidden />
                </span>
                <span className="text-[9px] text-muted-foreground">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}

/**
 * CODE — a request going out and something happening as a result. For the
 * developer products, where the interesting part is that your own software
 * is driving it.
 */
function CodeLayout({ uid, spec }: { uid: string; spec: CodeSpec }) {
  return (
    <Stage uid={uid} status={spec.status}>
      <div className="flex items-center gap-3">
        {/* The call your application makes */}
        <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <span className="flex size-5 items-center justify-center rounded bg-primary/10 text-primary">
              <Code2 className="size-3" aria-hidden />
            </span>
            <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
              Your application
            </span>
          </div>
          <div className="space-y-1 px-3 py-3 font-mono text-[10px] leading-relaxed">
            {spec.lines.map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="w-3 shrink-0 text-right text-muted-foreground/40 tabular-nums">
                  {i + 1}
                </span>
                <span
                  className={cn(
                    "min-w-0 truncate",
                    line.accent ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Request out, event back */}
        <div className="flex w-14 shrink-0 flex-col items-center gap-1">
          <svg viewBox="0 0 40 10" className="w-10" role="presentation" aria-hidden>
            <path
              d="M0 5h30M26 1l5 4-5 4"
              fill="none"
              className="stroke-primary"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-mono text-[8px] tracking-widest text-primary uppercase">
            {spec.requestLabel}
          </span>
          <svg viewBox="0 0 40 10" className="w-10" role="presentation" aria-hidden>
            <path
              d="M40 5H10M14 1L9 5l5 4"
              fill="none"
              className="stroke-primary/40"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-mono text-[8px] tracking-widest text-muted-foreground uppercase">
            {spec.responseLabel}
          </span>
        </div>

        {/* What SipLink does with it */}
        <div className="flex shrink-0 flex-col items-center gap-3">
          <BrandCloud caption={spec.caption} />
          <div className="flex gap-2">
            {spec.results.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex w-16 flex-col items-center gap-1 text-center"
              >
                <span className="flex size-7 items-center justify-center rounded-lg border border-border bg-background text-primary shadow-sm">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <span className="text-[8px] leading-tight text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}

/**
 * SWAP — what you run today on one side, struck through, and what replaces
 * it on the other. For migrations, where the story is the change itself.
 */
function SwapLayout({ uid, spec }: { uid: string; spec: SwapSpec }) {
  return (
    <Stage uid={uid} status={spec.status}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        {/* Before */}
        <div className="rounded-xl border border-border bg-background/60 p-4">
          <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
            {spec.beforeLabel}
          </span>
          <ul className="mt-3 space-y-2">
            {spec.before.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground/70">
                  <Icon className="size-3" aria-hidden />
                </span>
                <span className="text-[10px] leading-tight text-muted-foreground line-through decoration-muted-foreground/40">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* The change */}
        <div className="flex flex-col items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full border border-primary/40 bg-background text-primary shadow-sm">
            <ArrowLeftRight className="size-4" aria-hidden />
          </span>
          <span className="font-mono text-[8px] tracking-widest text-primary uppercase">
            {spec.verb}
          </span>
        </div>

        {/* After */}
        <div className="rounded-xl border border-primary/30 bg-background p-4 shadow-sm ring-1 ring-primary/10">
          <span className="font-mono text-[9px] tracking-widest text-primary uppercase">
            {spec.afterLabel}
          </span>
          <ul className="mt-3 space-y-2">
            {spec.after.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-3" aria-hidden />
                </span>
                <span className="text-[10px] leading-tight font-medium">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Stage>
  );
}

/**
 * SYSTEM — the phone system doing its job: a call comes in, the system
 * decides where it belongs, and it rings the right extension. Used where the
 * product IS the system, so the picture shows it running rather than showing
 * what it replaced.
 */
function SystemLayout({ uid, spec }: { uid: string; spec: SystemSpec }) {
  return (
    <Stage uid={uid} status={spec.status}>
      {/* The cloud sits over everything, because that is where the system
          lives. The call goes up into it and the ring comes back down. */}
      <div className="relative mx-auto w-full max-w-[22rem]">
        <div className="relative">
          {/* Cloud outline, drawn at its own aspect so the lobes stay round */}
          <svg
            viewBox="0 0 320 196"
            role="presentation"
            aria-hidden
            className="w-full"
          >
            <path
              d="M62 186a46 46 0 0 1 0-92 48 48 0 0 1 7 .5A58 58 0 0 1 160 44a58 58 0 0 1 91 50.5 48 48 0 0 1 7-.5 46 46 0 0 1 0 92z"
              className="fill-background stroke-primary/45"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* What the system does, laid out inside the cloud */}
          <div className="absolute inset-x-0 top-[22%] px-[6.25rem]">
            <div className="flex items-center justify-center gap-1.5">
              <Cloud className="size-3 text-primary" aria-hidden />
              <span className="font-mono text-[9px] font-semibold tracking-widest text-primary uppercase">
                Your phone system
              </span>
            </div>

            {/* Stacked, so each step keeps one line and reads as an order */}
            <ul className="mt-1.5 space-y-1">
              {spec.routing.map(({ icon: Icon, label }, idx) => (
                <li
                  key={label}
                  style={
                    { "--cycle-delay": `${idx * 0.8}s` } as React.CSSProperties
                  }
                  className="route-step flex items-center gap-2 rounded-lg border border-primary/20 bg-background px-2 py-1"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                    <Icon className="size-2.5" aria-hidden />
                  </span>
                  <span className="text-[9px] leading-tight font-medium whitespace-nowrap">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="-mx-8 mt-2 flex items-center justify-center gap-4">
              {spec.also.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1">
                  <Icon
                    className="size-2.5 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <span className="text-[8px] whitespace-nowrap text-muted-foreground">
                    {label}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Up into the cloud on one side, back down on the other */}
        <svg
          viewBox="0 0 320 28"
          role="presentation"
          aria-hidden
          className="w-full"
        >
          {/* Up into the cloud: dashed, because the call is not handled yet */}
          <path
            d="M66 26V12a6 6 0 0 1 6-6h58"
            fill="none"
            className="stroke-primary/40"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
          {/* Back down to the extension: solid, the call is placed */}
          <path
            d="M190 6h58a6 6 0 0 1 6 6v8l-4-4m4 4 4-4"
            fill="none"
            className="stroke-primary"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* The call on one side, the extensions it can reach on the other */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-[8.25rem]">
            <span className="font-mono text-[8px] tracking-widest text-muted-foreground uppercase">
              Incoming call
            </span>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-background px-2 py-1.5 shadow-sm">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <spec.caller.icon className="size-3" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[9px] leading-tight whitespace-nowrap tabular-nums">
                  {spec.caller.number}
                </span>
                <span className="text-[8px] leading-tight text-muted-foreground">
                  {spec.caller.label}
                </span>
              </span>
            </div>
          </div>

          {/* Extensions are people, not places — that is the product. */}
          <div className="w-[8.25rem]">
            <span className="font-mono text-[8px] tracking-widest text-muted-foreground uppercase">
              Extensions
            </span>
            <div className="mt-1 flex flex-col gap-1">
              {spec.extensions.map(({ icon: Icon, label, ext, live }) => (
                <div
                  key={ext}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border bg-background px-2 py-1",
                    live
                      ? "border-primary/40 shadow-sm ring-1 ring-primary/10"
                      : "border-border",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded",
                      live
                        ? "ring-shake bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="size-2.5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[9px] leading-tight font-medium">
                      {label}
                    </span>
                    <span className="font-mono text-[8px] leading-tight text-muted-foreground tabular-nums">
                      {ext}
                    </span>
                  </span>
                  {live ? (
                    <span className="flex shrink-0 gap-[2px]">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          style={
                            {
                              "--cycle-delay": `${d * 0.16}s`,
                            } as React.CSSProperties
                          }
                          className="ring-dot size-1 rounded-full bg-primary"
                        />
                      ))}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/**
 * ORBIT — one hub with everything else arranged around it. For products
 * whose job is to sit in the middle of things other people already run.
 */
function OrbitLayout({ uid, spec }: { uid: string; spec: OrbitSpec }) {
  const n = spec.around.length;
  return (
    <Stage uid={uid} status={spec.status}>
      <div className="relative mx-auto h-[210px] w-full max-w-[340px]">
        {/* Connecting spokes, drawn under the cards */}
        <svg
          viewBox="0 0 340 210"
          className="absolute inset-0 size-full"
          role="presentation"
          aria-hidden
        >
          {spec.around.map((_, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            const x = 170 + Math.cos(angle) * 132;
            const y = 105 + Math.sin(angle) * 78;
            return (
              <line
                key={i}
                x1="170"
                y1="105"
                x2={x}
                y2={y}
                className={i === 0 ? "stroke-primary/70" : "stroke-primary/25"}
                strokeWidth={i === 0 ? 2 : 1.5}
              />
            );
          })}
        </svg>

        {/* The hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <BrandCloud caption={spec.caption} />
        </div>

        {/* Everything arranged around it */}
        {spec.around.map(({ icon: Icon, label }, i) => {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + (Math.cos(angle) * 132 * 100) / 340;
          const y = 50 + (Math.sin(angle) * 78 * 100) / 190;
          return (
            <div
              key={label}
              className="absolute flex w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="flex size-8 items-center justify-center rounded-xl border border-border bg-background text-primary shadow-sm">
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="text-[9px] leading-tight font-medium text-muted-foreground">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ *
 * Scenes — one row per product, each pointed at the layout that suits
 * what the product actually does.
 * ------------------------------------------------------------------ */

const SCENE_SPECS: Record<string, SceneSpec> = {
  /* ------------------------------------------------- flow: a journey */
  "sip-trunking": {
    layout: "flow",
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
    ],
    right: [
      { icon: Building2, label: "Local Calls" },
      { icon: Smartphone, label: "Mobile Networks" },
      { icon: Globe, label: "International" },
    ],
  },

  "teams-calling": {
    layout: "flow",
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
    layout: "flow",
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
    ],
    right: [
      { icon: Globe, label: "Carriers" },
      { icon: Cloud, label: "Cloud Platforms" },
      { icon: Activity, label: "Visibility" },
    ],
  },

  "webrtc-sdk": {
    layout: "flow",
    status: "In-browser calling",
    left: [
      { icon: MonitorSmartphone, label: "Your Web App" },
      { icon: Users, label: "Your Customers" },
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
      { icon: Network, label: "Same Numbers" },
      { icon: Phone, label: "Any Destination" },
    ],
  },

  /* ---------------------------------------- fan: one in, many out */
  "did-numbers": {
    layout: "fan",
    status: "Numbers live",
    source: { icon: PhoneIncoming, value: "+1 800···", label: "One published number" },
    out: [
      { icon: Users, label: "Sales", note: "Extension 201" },
      { icon: Headset, label: "Support", note: "Extension 202" },
      { icon: Building2, label: "Billing", note: "Extension 203" },
    ],
  },

  "toll-free-numbers": {
    layout: "fan",
    status: "Free to call",
    source: { icon: PhoneCall, value: "1 800···", label: "Caller is not charged" },
    out: [
      { icon: Headset, label: "Helpline", note: "Routed by region" },
      { icon: ListOrdered, label: "IVR Menu", note: "Caller chooses" },
      { icon: Clock, label: "After Hours", note: "Out-of-hours flow" },
    ],
  },

  "virtual-numbers": {
    layout: "fan",
    status: "No line required",
    source: { icon: Globe, value: "Local number", label: "No physical line" },
    out: [
      { icon: Laptop, label: "Softphone", note: "Wherever they work" },
      { icon: Smartphone, label: "Mobile", note: "On the move" },
      { icon: Users, label: "Any Extension", note: "Your call flows" },
    ],
  },

  ivr: {
    layout: "fan",
    status: "Menu active",
    source: { icon: ListOrdered, value: "Press 1–3", label: "Caller chooses" },
    out: [
      { icon: Users, label: "Sales", note: "Press 1" },
      { icon: Headset, label: "Support", note: "Press 2" },
      { icon: Building2, label: "Billing", note: "Press 3" },
    ],
  },

  /* ------------------------------------- queue: waiting, then handled */
  "call-queue": {
    layout: "queue",
    status: "Callers waiting",
    waitingIcon: PhoneIncoming,
    waitingLabel: "Callers",
    queueLabel: "In the queue",
    agents: [
      { icon: Headset, label: "Agent 1", state: "busy" },
      { icon: Headset, label: "Agent 2", state: "free" },
      { icon: Headset, label: "Agent 3", state: "busy" },
    ],
  },

  "call-center": {
    layout: "queue",
    status: "Queue healthy",
    waitingIcon: Users,
    waitingLabel: "Customers",
    queueLabel: "Routed by your rules",
    agents: [
      { icon: Headset, label: "Sales", state: "free" },
      { icon: Headset, label: "Support", state: "busy" },
      { icon: Activity, label: "Supervisor", state: "free" },
    ],
  },

  "predictive-dialer": {
    layout: "dialer",
    status: "Campaign running",
    listLabel: "Dial list",
    contacts: [
      { number: "+1 415 ···" },
      { number: "+1 628 ···" },
      { number: "+1 917 ···" },
      { number: "+1 212 ···" },
      { number: "+1 646 ···" },
    ],
    engine: {
      icon: Activity,
      title: "Pacing engine",
      note: "Dials ahead of the agents about to free up",
      metric: "Paced to availability",
    },
    agents: [
      { icon: Headset, label: "Agent 1", cycles: true },
      { icon: Headset, label: "Agent 2", cycles: true },
      { icon: Headset, label: "Agent 3", cycles: true },
    ],
  },

  "auto-dialer": {
    layout: "broadcast",
    status: "Campaign running",
    message: {
      icon: AudioLines,
      title: "Your recorded voice message",
      note: "Recorded once, played aloud on every answered call",
    },
    sent: 348,
    total: 500,
    calls: [
      { number: "+44 20 7946 ···", stage: "playing" },
      { number: "+44 161 496 ···", stage: "ringing" },
      { number: "+44 121 234 ···", stage: "done" },
    ],
    outcomes: [
      { icon: PhoneCall, label: "Answered" },
      { icon: Headset, label: "To an agent" },
      { icon: BarChart3, label: "Logged" },
    ],
  },



  /* -------------------------------------------- panel: a surface to read */
  "call-analytics": {
    layout: "panel",
    status: "Data flowing",
    title: "Call volume by hour",
    bars: [28, 42, 55, 70, 88, 64, 48, 36, 52, 40, 30, 22],
    peak: 4,
    axis: ["09:00", "18:00"],
    readouts: [
      { icon: PhoneCall, label: "Answered", value: "Tracked" },
      { icon: PhoneIncoming, label: "Missed", value: "Flagged" },
      { icon: Layers, label: "Export", value: "Excel / CSV" },
    ],
  },

  "call-recording": {
    layout: "wave",
    status: "Recording on",
    title: "Conversation archive",
    wave: [
      18, 34, 52, 40, 66, 82, 58, 44, 72, 90, 64, 38, 56, 78, 48, 30, 62, 86,
      54, 36, 70, 46, 26, 42,
    ],
    playhead: 0.42,
    elapsed: "01:12",
    total: "02:48",
    readouts: [
      { icon: Filter, label: "Search", value: "By date, agent" },
      { icon: ShieldCheck, label: "Access", value: "Role-based" },
      { icon: FileAudio, label: "Formats", value: "MP3 / WAV" },
    ],
  },

  /* ------------------------------------------- code: your app drives it */
  "voice-api": {
    layout: "code",
    status: "API connected",
    lines: [
      { text: "POST /calls", accent: true },
      { text: '  to: "+1 800..."' },
      { text: '  from: "sales"' },
      { text: "  record: true" },
    ],
    requestLabel: "Request",
    responseLabel: "Events",
    caption: "Voice API",
    results: [
      { icon: PhoneOutgoing, label: "Call placed" },
      { icon: Activity, label: "Status back" },
    ],
  },

  "sms-api": {
    layout: "code",
    status: "Messages sending",
    lines: [
      { text: "POST /messages", accent: true },
      { text: '  to: "+44 7..."' },
      { text: '  body: "Your code"' },
    ],
    requestLabel: "Send",
    responseLabel: "Delivered",
    caption: "SMS API",
    results: [
      { icon: Smartphone, label: "Any mobile" },
      { icon: ShieldCheck, label: "Passcodes" },
    ],
  },

  "sip-api": {
    layout: "code",
    status: "SIP integrated",
    lines: [
      { text: "REGISTER sip:...", accent: true },
      { text: "  endpoint: pbx-01" },
      { text: "  route: least-cost" },
      { text: "  failover: on" },
    ],
    requestLabel: "Signalling",
    responseLabel: "Session",
    caption: "SIP API",
    results: [
      { icon: Router, label: "Your routing" },
      { icon: Globe, label: "Carriers" },
    ],
  },

  "whatsapp-api": {
    layout: "code",
    status: "Inbox connected",
    lines: [
      { text: "POST /whatsapp", accent: true },
      { text: '  to: "+91 98..."' },
      { text: '  template: "order"' },
    ],
    requestLabel: "Send",
    responseLabel: "Reply",
    caption: "WhatsApp API",
    results: [
      { icon: Inbox, label: "Shared inbox" },
      { icon: MessagesSquare, label: "Threaded" },
    ],
  },

  /* ---------------------------------------------- swap: old for new */
  "number-porting": {
    layout: "swap",
    status: "Continuity kept",
    beforeLabel: "With your old carrier",
    before: [
      { icon: Building2, label: "Tied to one provider" },
      { icon: Phone, label: "Change number to move" },
      { icon: Store, label: "Reprint everything" },
    ],
    verb: "Port",
    afterLabel: "On SipLink",
    after: [
      { icon: Phone, label: "Same numbers kept" },
      { icon: ListOrdered, label: "Your call flows" },
      { icon: ShieldCheck, label: "Customers unaffected" },
    ],
  },

  "cloud-pbx": {
    layout: "system",
    status: "System online",
    caller: { icon: PhoneIncoming, label: "Customer", number: "+44 20 7946" },
    routing: [
      { icon: ListOrdered, label: "IVR menu answers" },
      { icon: Clock, label: "Checks business hours" },
      { icon: Users, label: "Rings the sales queue" },
    ],
    extensions: [
      { icon: MonitorSmartphone, label: "Priya", ext: "Ext 201", live: true },
      { icon: Users, label: "Sam", ext: "Ext 202" },
      { icon: Users, label: "Alex", ext: "Ext 203" },
    ],
    alsoLabel: "Always on",
    also: [
      { icon: MessageCircle, label: "Voicemail to email" },
      { icon: BarChart3, label: "CDR reporting" },
    ],
  },


  "hosted-pbx": {
    layout: "swap",
    status: "Managed by SipLink",
    beforeLabel: "Running it yourself",
    before: [
      { icon: ServerCog, label: "Your team patches it" },
      { icon: Clock, label: "Updates wait for capacity" },
      { icon: Activity, label: "You watch it" },
    ],
    verb: "Hand over",
    afterLabel: "Hosted by SipLink",
    after: [
      { icon: ServerCog, label: "We run and update it" },
      { icon: Store, label: "Every branch included" },
      { icon: ShieldCheck, label: "You keep the controls" },
    ],
  },

  "ip-pbx": {
    layout: "swap",
    status: "On premise",
    beforeLabel: "Legacy trunks",
    before: [
      { icon: Phone, label: "PRI and analogue lines" },
      { icon: Lock, label: "Fixed channel blocks" },
      { icon: Network, label: "Hard to extend" },
    ],
    verb: "SIP-enable",
    afterLabel: "Your IP PBX",
    after: [
      { icon: Server, label: "Call control stays on site" },
      { icon: Cloud, label: "Hybrid where you want it" },
      { icon: Globe, label: "SIP uplink to the world" },
    ],
  },

  /* ------------------------------------------- orbit: sits in the middle */
  "crm-integration": {
    layout: "orbit",
    status: "CRM linked",
    caption: "Connected",
    around: [
      { icon: Boxes, label: "Your CRM" },
      { icon: PhoneIncoming, label: "Call Arrives" },
      { icon: Users, label: "Agent Sees Who" },
      { icon: PhoneOutgoing, label: "Click to Dial" },
      { icon: Layers, label: "Logged Back" },
      { icon: Workflow, label: "Screen Pop" },
    ],
  },

  "ai-voice-assistant": {
    layout: "orbit",
    status: "Assistant enabled",
    caption: "AI Assistant",
    around: [
      { icon: PhoneIncoming, label: "Caller Speaks" },
      { icon: Bot, label: "Understands" },
      { icon: Sparkles, label: "Resolved" },
      { icon: Headset, label: "Human Agent" },
      { icon: FileAudio, label: "Summary" },
      { icon: Send, label: "Routed On" },
    ],
  },
};

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
      {spec.layout === "flow" ? <FlowLayout uid={slug} spec={spec} /> : null}
      {spec.layout === "fan" ? <FanLayout uid={slug} spec={spec} /> : null}
      {spec.layout === "queue" ? <QueueLayout uid={slug} spec={spec} /> : null}
      {spec.layout === "panel" ? <PanelLayout uid={slug} spec={spec} /> : null}
      {spec.layout === "wave" ? <WaveLayout uid={slug} spec={spec} /> : null}
      {spec.layout === "dialer" ? (
        <DialerLayout uid={slug} spec={spec} />
      ) : null}
      {spec.layout === "broadcast" ? (
        <BroadcastLayout uid={slug} spec={spec} />
      ) : null}
      {spec.layout === "code" ? <CodeLayout uid={slug} spec={spec} /> : null}
      {spec.layout === "swap" ? <SwapLayout uid={slug} spec={spec} /> : null}
      {spec.layout === "system" ? (
        <SystemLayout uid={slug} spec={spec} />
      ) : null}
      {spec.layout === "orbit" ? <OrbitLayout uid={slug} spec={spec} /> : null}
    </div>
  );
}
