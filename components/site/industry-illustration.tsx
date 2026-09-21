import {
  Ambulance,
  ArrowDown,
  Banknote,
  Bed,
  BellRing,
  Boxes,
  Building2,
  Code2,
  FileAudio,
  FileText,
  Gauge,
  GraduationCap,
  Headset,
  HeartPulse,
  Landmark,
  MapPin,
  MessageSquare,
  Navigation,
  PhoneIncoming,
  Play,
  RadioTower,
  Router,
  ScrollText,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Store,
  Truck,
  UserRound,
  Utensils,
  Warehouse,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Hero illustrations for the industry pages.
 *
 * Each sector gets a genuinely DIFFERENT composition — a queue board, a
 * recorded-call waveform, an SMS phone thread, a room-extension grid, a route
 * map, a code window, a ticket board, a site-network map, a capacity meter, a
 * sealed record, a routing fan — not one flow diagram with the labels swapped.
 * Built in the same craft as the product illustrations: labelled icon cards
 * over a faint dot field, theme tokens only, one animated stroke via
 * `.flow-path` (respects reduced motion). Every scene shares one content
 * height so all 11 fill their panel identically. Numbers are obvious
 * placeholders, never fabricated metrics.
 */
type Props = {
  slug: string;
  className?: string;
};

/* --------------------------------------------------------------- shared kit */

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

function LiveDot() {
  return (
    <span className="relative flex size-1.5">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 motion-reduce:animate-none" />
      <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
    </span>
  );
}

function DotField({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden
      className="absolute inset-0 size-full"
    >
      <defs>
        <pattern id={`id-${uid}`} width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" className="fill-primary/25" />
        </pattern>
        <radialGradient id={`idf-${uid}`} cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor="white" stopOpacity="0.85" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`idm-${uid}`}>
          <rect width="400" height="200" fill={`url(#idf-${uid})`} />
        </mask>
      </defs>
      <rect width="400" height="200" fill={`url(#id-${uid})`} mask={`url(#idm-${uid})`} />
    </svg>
  );
}

/** Scene frame: dot field, centred status pill, fixed-height content well. */
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
    <div className="relative isolate w-full">
      <DotField uid={uid} />
      <div className="relative flex justify-center pt-1 pb-3">
        <StatusPill text={status} />
      </div>
      <div className="relative flex min-h-[12rem] flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

/** Titled window frame (mac dots). Full width by default. */
function Window({
  icon: Icon,
  title,
  className,
  children,
}: {
  icon?: LucideIcon;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("w-full rounded-xl border border-border bg-background shadow-sm", className)}>
      <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
        {Icon ? (
          <span className="flex size-5 items-center justify-center rounded bg-primary/10 text-primary">
            <Icon className="size-3" aria-hidden />
          </span>
        ) : (
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className={cn("size-1.5 rounded-full", i === 0 ? "bg-primary" : "bg-muted-foreground/25")} />
            ))}
          </span>
        )}
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ============================================================ 1. call-centers
   QUEUE BOARD — numbered callers waiting with hold times → agent status column.
   ============================================================================ */
function CallCenters({ uid }: { uid: string }) {
  const waiting = [
    { n: "+1 415 ···· 210", t: "0:42" },
    { n: "+1 312 ···· 884", t: "1:15" },
    { n: "+44 20 ···· 337", t: "2:03" },
  ];
  const agents = [
    { name: "Priya", free: true },
    { name: "Marcus", free: false },
    { name: "Wei", free: false },
    { name: "Ana", free: true },
  ];
  return (
    <Stage uid={uid} status="12 in queue · 4 agents">
      <div className="flex items-stretch gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="font-mono text-[8px] tracking-widest text-muted-foreground uppercase">In queue</span>
          <div className="rounded-xl border border-dashed border-primary/50 bg-primary/[0.04] p-2">
            <div className="flex flex-col gap-1">
              {waiting.map(({ n, t }, i) => (
                <div
                  key={n}
                  style={{ "--cycle-delay": `${i * 0.6}s` } as React.CSSProperties}
                  className="queue-row flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1"
                >
                  <span className="flex size-4 shrink-0 items-center justify-center rounded bg-primary/10 font-mono text-[8px] font-semibold text-primary tabular-nums">{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate font-mono text-[9px] tabular-nums">{n}</span>
                  <span className="shrink-0 font-mono text-[8px] text-muted-foreground tabular-nums">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <span className="text-center font-mono text-[8px] font-semibold tracking-[0.16em] text-primary uppercase">Routed by skill</span>
        </div>
        <div className="flex flex-col justify-center gap-1.5">
          {agents.map(({ name, free }) => (
            <div key={name} className="flex w-[6.2rem] items-center gap-1.5 rounded-lg border border-border bg-background px-2 py-1.5 shadow-sm">
              <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-md", free ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                <Headset className="size-3" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[9px] leading-tight font-semibold">{name}</span>
                <span className="flex items-center gap-1">
                  <span className={cn("size-1.5 rounded-full", free ? "bg-primary" : "bg-muted-foreground/40")} />
                  <span className="text-[7px] text-muted-foreground">{free ? "Available" : "On a call"}</span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================ 2. healthcare
   VITALS MONITOR — the inventive concept: communication drawn as a vital sign.
   A patient monitor whose ECG trace IS the call path; each peak carries a
   contact on the line (patient → clinic → pharmacy), a BPM-style readout says
   the line is "in rhythm" and secure. Built in the product card idiom, not
   hand-drawn art: a titled monitor window, an SVG trace, node chips on the
   peaks, and a vitals sidebar.
   ============================================================================ */
function Healthcare({ uid }: { uid: string }) {
  // ECG-style trace across a 300×90 field. Peaks sit under the three contacts.
  const trace =
    "M4 60 H40 l6 -4 8 8 6 -40 7 66 6 -30 5 12 H108 l6 -4 8 8 6 -40 7 66 6 -30 5 12 H212 l6 -4 8 8 6 -40 7 66 6 -30 5 12 H296";
  const nodes = [
    { icon: UserRound, label: "Patient", x: 20 },
    { icon: Stethoscope, label: "Clinic", x: 55, live: true },
    { icon: HeartPulse, label: "Pharmacy", x: 88 },
  ];
  return (
    <Stage uid={uid} status="HIPAA-compliant line">
      <Window icon={HeartPulse} title="Care line · in rhythm">
        <div className="grid gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          {/* the monitor: contacts riding an ECG trace that never flatlines */}
          <div className="relative">
            <div className="flex items-center justify-between px-1">
              {nodes.map(({ icon: Icon, label, live }) => (
                <span key={label} className="flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full border shadow-sm",
                      live
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-primary",
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-[8px] leading-none font-medium text-muted-foreground">{label}</span>
                </span>
              ))}
            </div>
            <svg viewBox="0 0 300 90" preserveAspectRatio="none" role="presentation" aria-hidden className="mt-1 h-14 w-full">
              <path d={trace} fill="none" vectorEffect="non-scaling-stroke" className="stroke-primary/20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d={trace} fill="none" vectorEffect="non-scaling-stroke" className="flow-path stroke-primary" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* vitals sidebar — the "reading" for the line */}
          <dl className="flex shrink-0 flex-col justify-center gap-2 sm:w-[6.5rem]">
            <div className="rounded-lg border border-primary/60 bg-primary/[0.05] px-2.5 py-1.5">
              <dt className="text-[8px] leading-none tracking-widest text-muted-foreground uppercase">Line</dt>
              <dd className="mt-0.5 flex items-baseline gap-1">
                <span className="font-mono text-base leading-none font-semibold text-primary tabular-nums">72</span>
                <span className="text-[8px] text-muted-foreground">bpm · steady</span>
              </dd>
            </div>
            {[
              { icon: ShieldCheck, label: "Encrypted" },
              { icon: FileAudio, label: "Voice · fax" },
              { icon: Ambulance, label: "Urgent line" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="size-3 shrink-0 text-primary" aria-hidden />
                <span className="text-[9px] font-medium">{label}</span>
              </div>
            ))}
          </dl>
        </div>
      </Window>
    </Stage>
  );
}

/* ============================================================ 3. banking-finance
   WAVEFORM — a recorded call with a playhead and compliance readouts.
   ============================================================================ */
function BankingFinance({ uid }: { uid: string }) {
  const wave = [30, 52, 40, 68, 88, 60, 44, 74, 96, 66, 48, 80, 58, 38, 62, 46, 30, 54, 42, 70];
  const playhead = 0.55;
  const played = Math.round(wave.length * playhead);
  return (
    <Stage uid={uid} status="Recorded for compliance">
      <Window icon={Banknote} title="Call · acct ···· 4471">
        <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <div className="relative flex h-16 items-center gap-[3px]">
              {wave.map((h, i) => (
                <span key={i} className={cn("flex-1 rounded-full", i < played ? "bg-primary" : "bg-primary/20")} style={{ height: `${h}%` }} />
              ))}
              <span aria-hidden className="absolute inset-y-0 w-px bg-foreground/50" style={{ left: `${playhead * 100}%` }}>
                <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-foreground/70" />
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"><Play className="size-2 fill-current" aria-hidden /></span>
              <span className="font-mono text-[9px] text-muted-foreground tabular-nums">02:12</span>
              <span className="relative h-0.5 flex-1 rounded-full bg-border">
                <span className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${playhead * 100}%` }} />
              </span>
              <span className="font-mono text-[9px] text-muted-foreground tabular-nums">03:58</span>
            </div>
          </div>
          <dl className="flex shrink-0 flex-col justify-center gap-2.5 sm:w-28">
            {[
              { icon: ShieldCheck, label: "Retention", value: "Locked" },
              { icon: ScrollText, label: "Transcript", value: "Ready" },
              { icon: Gauge, label: "Analytics", value: "Live" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon className="size-3.5" aria-hidden /></span>
                <span className="min-w-0">
                  <dt className="text-[9px] leading-tight text-muted-foreground">{label}</dt>
                  <dd className="text-[11px] leading-tight font-semibold">{value}</dd>
                </span>
              </div>
            ))}
          </dl>
        </div>
      </Window>
    </Stage>
  );
}

/* ============================================================ 4. education
   ROUTING FAN — one campus line fanning through stretch-SVG rails to desks.
   ============================================================================ */
function Education({ uid }: { uid: string }) {
  const desks = [
    { icon: GraduationCap, label: "Admissions", note: "Enquiries & intake" },
    { icon: Headset, label: "Student support", note: "Help & guidance", live: true },
    { icon: Banknote, label: "Fees office", note: "Billing desk" },
    { icon: Building2, label: "Departments", note: "Faculty & campus" },
  ];
  return (
    <Stage uid={uid} status="Routed to the right desk">
      <div className="flex items-center">
        <div className="flex w-24 shrink-0 flex-col items-center gap-2 text-center">
          <span className="flex size-11 items-center justify-center rounded-2xl border border-primary/40 bg-background text-primary shadow-sm">
            <GraduationCap className="size-5" aria-hidden />
          </span>
          <span className="text-[9px] leading-tight text-muted-foreground">Campus line<br />students · parents</span>
        </div>
        <div className="relative w-14 shrink-0 self-stretch" aria-hidden>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full" role="presentation">
            {desks.map((b, i) => {
              const y = ((i + 0.5) / desks.length) * 100;
              const d = `M0 50 C 45 50, 55 ${y}, 100 ${y}`;
              return (
                <g key={b.label}>
                  <path d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={b.live ? 2 : 1.25} className={b.live ? "stroke-primary/70" : "stroke-primary/25"} />
                  {b.live ? <path d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth="2.5" strokeLinecap="round" className="flow-path stroke-primary" /> : null}
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {desks.map(({ icon: Icon, label, note, live }) => (
            <div key={label} className={cn("flex items-center gap-2.5 rounded-lg border bg-background px-3 py-2 shadow-sm", live ? "border-primary" : "border-border")}>
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon className="size-3.5" aria-hidden /></span>
              <span className="min-w-0">
                <span className="block text-[10px] leading-tight font-semibold">{label}</span>
                <span className="block text-[8px] leading-tight text-muted-foreground">{note}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================ 5. retail
   SMS THREAD — order-status chat on a phone, beside channel chips.
   ============================================================================ */
function Retail({ uid }: { uid: string }) {
  const bubbles = [
    { them: true, text: "Order #7741 confirmed" },
    { them: true, text: "Packed — ships today" },
    { them: false, text: "Track my order" },
    { them: true, text: "Out for delivery 🚚" },
  ];
  return (
    <Stage uid={uid} status="Order updates by SMS">
      <div className="flex items-center justify-center gap-7">
        <div className="w-[10.5rem] shrink-0 rounded-[1.4rem] border-2 border-border bg-background p-1.5 shadow-sm">
          <div className="rounded-[1rem] bg-muted/40 px-2 py-2">
            <div className="mb-1.5 flex items-center gap-1.5 px-1">
              <ShoppingBag className="size-3 text-primary" aria-hidden />
              <span className="text-[8px] font-semibold">Store SMS</span>
            </div>
            <div className="flex flex-col gap-1">
              {bubbles.map(({ them, text }, i) => (
                <span key={i} className={cn("max-w-[85%] rounded-2xl px-2 py-1 text-[8px] leading-snug", them ? "self-start rounded-bl-sm bg-background text-foreground shadow-sm" : "self-end rounded-br-sm bg-primary text-primary-foreground")}>{text}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            { icon: MessageSquare, label: "Business SMS", note: "Order updates" },
            { icon: Store, label: "Per-store numbers", note: "Every branch" },
            { icon: Headset, label: "Store support", note: "Routed to staff" },
          ].map(({ icon: Icon, label, note }) => (
            <div key={label} className="flex w-36 items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2.5 shadow-sm">
              <Icon className="size-4 shrink-0 text-primary" aria-hidden />
              <span className="text-[10px] leading-tight">
                <span className="block font-semibold">{label}</span>
                <span className="block text-muted-foreground">{note}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================ 6. hospitality
   ROOM GRID — a front-desk board of room extensions, one ringing.
   ============================================================================ */
function Hospitality({ uid }: { uid: string }) {
  const rooms = [
    { ext: "204", req: "Housekeeping", icon: Bed, live: false },
    { ext: "318", req: "Room service", icon: Utensils, live: true },
    { ext: "112", req: "Front desk", icon: BellRing, live: false },
    { ext: "506", req: "Check-out", icon: UserRound, live: false },
  ];
  return (
    <Stage uid={uid} status="Guest requests routed">
      <Window icon={BellRing} title="Front desk · extensions">
        <div className="grid grid-cols-2 gap-2 p-3">
          {rooms.map(({ ext, req, icon: Icon, live }) => (
            <div key={ext} className={cn("flex items-center gap-2 rounded-lg border bg-background px-2.5 py-2.5", live ? "border-primary shadow-sm" : "border-border")}>
              <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-md", live ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary")}><Icon className="size-3.5" aria-hidden /></span>
              <span className="min-w-0">
                <span className="flex items-center gap-1">
                  <span className="font-mono text-[10px] font-semibold tabular-nums">Rm {ext}</span>
                  {live ? <LiveDot /> : null}
                </span>
                <span className="block text-[8px] leading-tight text-muted-foreground">{req}</span>
              </span>
            </div>
          ))}
        </div>
      </Window>
    </Stage>
  );
}

/* ============================================================ 7. logistics
   TRACKING TIMELINE — the inventive concept: a shipment moving through the
   comms checkpoints a customer actually experiences (picked up → in transit →
   SMS'd → arriving). Communication IS the tracking events, not a road on a
   map. A progress spine with stamped, timed nodes; the current step is live.
   ============================================================================ */
function Logistics({ uid }: { uid: string }) {
  const steps = [
    { icon: Warehouse, label: "Picked up", time: "09:02", done: true },
    { icon: Truck, label: "In transit", time: "11:40", done: true },
    { icon: MessageSquare, label: "SMS to customer", time: "13:15", live: true },
    { icon: Navigation, label: "Arriving · ETA 14:20", time: "", done: false },
  ];
  return (
    <Stage uid={uid} status="Shipment #7741 · live">
      <Window icon={MapPin} title="Tracking · route 7">
        <div className="relative py-3 pr-3 pl-4">
          {/* progress spine */}
          <span aria-hidden className="absolute top-6 bottom-6 left-[1.65rem] w-0.5 bg-primary/20" />
          <span aria-hidden className="absolute top-6 left-[1.65rem] h-[52%] w-0.5 bg-primary" />
          <div className="flex flex-col gap-2.5">
            {steps.map(({ icon: Icon, label, time, done, live }) => (
              <div key={label} className="relative flex items-center gap-3">
                <span
                  className={cn(
                    "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border-2 shadow-sm",
                    live
                      ? "border-primary bg-primary text-primary-foreground"
                      : done
                        ? "border-primary bg-background text-primary"
                        : "border-dashed border-border bg-background text-muted-foreground",
                  )}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {live ? (
                    <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-primary/40 motion-reduce:animate-none" />
                  ) : null}
                </span>
                <span
                  className={cn(
                    "flex flex-1 items-center justify-between rounded-lg border px-2.5 py-1.5",
                    live ? "border-primary bg-primary/[0.04]" : "border-border bg-background",
                  )}
                >
                  <span className={cn("text-[10px] font-semibold", !done && !live && "text-muted-foreground")}>{label}</span>
                  {time ? <span className="font-mono text-[8px] text-muted-foreground tabular-nums">{time}</span> : null}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Window>
    </Stage>
  );
}

/* ============================================================ 8. it-saas
   CODE WINDOW — an SDK call, a response, and result chips.
   ============================================================================ */
function ItSaas({ uid }: { uid: string }) {
  const lines = [
    { text: "import { siplink } from 'sdk'", accent: false },
    { text: "await siplink.calls.create({", accent: true },
    { text: "  to: user.phone,", accent: false },
    { text: "  from: '+1 415 ···· 00'", accent: false },
    { text: "})", accent: true },
  ];
  return (
    <Stage uid={uid} status="Built into your product">
      <div className="flex items-center gap-3">
        <Window icon={Code2} title="your app" className="min-w-0 flex-1">
          <div className="space-y-1 px-3 py-3 font-mono text-[10px] leading-relaxed">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="w-3 shrink-0 text-right text-muted-foreground/40 tabular-nums">{i + 1}</span>
                <span className={cn("min-w-0 truncate", line.accent ? "text-primary" : "text-muted-foreground")}>{line.text}</span>
              </div>
            ))}
          </div>
        </Window>
        <div className="flex w-12 shrink-0 flex-col items-center gap-1" aria-hidden>
          <svg viewBox="0 0 40 10" className="w-9" role="presentation"><path d="M0 5h30M26 1l5 4-5 4" fill="none" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="font-mono text-[7px] tracking-widest text-primary uppercase">200 ok</span>
        </div>
        <div className="flex shrink-0 flex-col gap-1.5">
          {[
            { icon: UserRound, label: "End users" },
            { icon: MessageSquare, label: "Notify" },
            { icon: Code2, label: "WebRTC" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex w-[5.4rem] items-center gap-1.5 rounded-lg border border-border bg-background px-2 py-1.5 shadow-sm">
              <Icon className="size-3.5 shrink-0 text-primary" aria-hidden />
              <span className="text-[9px] font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================ 9. government
   HELPLINE THAT NEVER DROPS A CITIZEN — the inventive, comms-anchored concept:
   one public helpline number, an IVR that routes each caller to the right
   department lane, and an assurance that no one is dropped. The subject is the
   call getting through (SipLink IVR + queues), set in civic services — not a
   ticket machine.
   ============================================================================ */
function Government({ uid }: { uid: string }) {
  const lanes = [
    { icon: FileText, label: "Records", live: false },
    { icon: Headset, label: "Support", live: true },
    { icon: Building2, label: "Departments", live: false },
  ];
  return (
    <Stage uid={uid} status="DoT-licensed network">
      <Window icon={Landmark} title="Citizen helpline">
        <div className="flex items-center gap-2 p-3">
          {/* the single public line */}
          <div className="flex w-[4.6rem] shrink-0 flex-col items-center gap-1 text-center">
            <span className="flex size-10 items-center justify-center rounded-2xl border border-primary/50 bg-background text-primary shadow-sm">
              <PhoneIncoming className="size-4" aria-hidden />
            </span>
            <span className="text-[8px] leading-tight font-semibold">Citizen call</span>
          </div>

          {/* IVR splitter */}
          <div className="relative h-[5.5rem] w-10 shrink-0" aria-hidden>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full" role="presentation">
              {lanes.map((l, i) => {
                const y = ((i + 0.5) / lanes.length) * 100;
                const d = `M0 50 C 45 50, 55 ${y}, 100 ${y}`;
                return (
                  <g key={l.label}>
                    <path d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={l.live ? 2 : 1.25} className={l.live ? "stroke-primary/70" : "stroke-primary/25"} />
                    {l.live ? <path d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth="2.5" strokeLinecap="round" className="flow-path stroke-primary" /> : null}
                  </g>
                );
              })}
            </svg>
            <span className="absolute top-1/2 left-1/2 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-primary bg-background text-primary shadow-sm">
              <Workflow className="size-2.5" aria-hidden />
            </span>
          </div>

          {/* department lanes + the assurance */}
          <div className="flex flex-1 flex-col gap-1.5">
            {lanes.map(({ icon: Icon, label, live }) => (
              <div key={label} className={cn("flex items-center gap-2 rounded-lg border bg-background px-2.5 py-1.5 shadow-sm", live ? "border-primary" : "border-border")}>
                <Icon className={cn("size-3.5 shrink-0", live ? "text-primary" : "text-muted-foreground")} aria-hidden />
                <span className="text-[9px] font-semibold">{label}</span>
                {live ? <span className="ml-auto"><LiveDot /></span> : null}
              </div>
            ))}
            <div className="mt-0.5 flex items-center gap-1.5 rounded-lg bg-primary/[0.06] px-2.5 py-1">
              <ShieldCheck className="size-3 shrink-0 text-primary" aria-hidden />
              <span className="text-[8px] font-medium">0 calls dropped · all logged</span>
            </div>
          </div>
        </div>
      </Window>
    </Stage>
  );
}

/* ============================================================ 10. manufacturing
   SITE NETWORK — HQ/plant/warehouse nodes wired to a central SIP hub, aligned
   in a single 0–100 coordinate space so lines always meet nodes.
   ============================================================================ */
function Manufacturing({ uid }: { uid: string }) {
  const hub = { x: 50, y: 50 };
  const sites = [
    { icon: Building2, label: "HQ", x: 15, y: 22, live: false },
    { icon: ServerCog, label: "Plant", x: 84, y: 20, live: true },
    { icon: Warehouse, label: "Warehouse", x: 82, y: 82, live: false },
    { icon: Boxes, label: "Suppliers", x: 18, y: 82, live: false, dashed: true },
  ];
  return (
    <Stage uid={uid} status="Sites on one SIP network">
      <div className="relative h-[12rem] w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" role="presentation" aria-hidden>
          {sites.map((s) => {
            const d = `M${hub.x} ${hub.y} L${s.x} ${s.y}`;
            return (
              <g key={s.label}>
                <path d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={s.live ? 2 : 1.25} strokeDasharray={s.dashed ? "3 4" : undefined} className={s.live ? "stroke-primary/70" : "stroke-primary/25"} />
                {s.live ? <path d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth="2.5" strokeLinecap="round" className="flow-path stroke-primary" /> : null}
              </g>
            );
          })}
        </svg>
        <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style={{ left: `${hub.x}%`, top: `${hub.y}%` }}>
          <span className="flex size-12 items-center justify-center rounded-xl border-2 border-primary bg-background text-primary shadow-sm"><Router className="size-5" aria-hidden /></span>
          <span className="font-mono text-[8px] font-semibold tracking-widest text-primary uppercase">SIP hub</span>
        </div>
        {sites.map(({ icon: Icon, label, x, y, dashed }) => (
          <div key={label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5" style={{ left: `${x}%`, top: `${y}%` }}>
            <span className={cn("flex size-9 items-center justify-center rounded-lg border bg-background shadow-sm", dashed ? "border-dashed border-border text-muted-foreground" : "border-border text-primary")}><Icon className="size-4" aria-hidden /></span>
            <span className="text-[8px] font-medium text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </Stage>
  );
}

/* ============================================================ 11. telecom-operators
   LIVE SIP TRUNKS — legible, comms-anchored concept: a stack of trunk channels
   each carrying a call in progress (a small voice-wave + "connected"), bundled
   through the SBC edge out to the carrier network. Reads at a glance as "many
   calls live on the network"; centres on SipLink's real products (SIP + SBC).
   ============================================================================ */
function TrunkWave({ seed }: { seed: number }) {
  // a short, deterministic voice-wave so each trunk looks like a live call
  const bars = [3, 7, 5, 9, 6, 8, 4, 7, 5, 8, 6, 4];
  return (
    <span className="flex h-4 items-center gap-[2px]" aria-hidden>
      {bars.map((b, i) => {
        const h = 3 + ((b + seed * 3 + i) % 8);
        return <span key={i} className="w-[2px] rounded-full bg-primary/70" style={{ height: `${h * 1.4}px` }} />;
      })}
    </span>
  );
}
function TelecomOperators({ uid }: { uid: string }) {
  const trunks = [
    { id: "Trunk 01", seed: 0 },
    { id: "Trunk 02", seed: 2 },
    { id: "Trunk 03", seed: 4 },
  ];
  return (
    <Stage uid={uid} status="Carrier-grade · calls live">
      <Window icon={Router} title="Voice infrastructure">
        <div className="flex items-stretch gap-3 p-3.5">
          {/* the live trunks — each row is a call in progress */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="font-mono text-[8px] tracking-widest text-muted-foreground uppercase">SIP trunks · live</span>
            {trunks.map(({ id, seed }) => (
              <div key={id} className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 shadow-sm">
                <span className="font-mono text-[9px] font-semibold tabular-nums">{id}</span>
                <span className="flex-1">
                  <TrunkWave seed={seed} />
                </span>
                <span className="flex items-center gap-1">
                  <LiveDot />
                  <span className="text-[8px] text-muted-foreground">connected</span>
                </span>
              </div>
            ))}
          </div>

          {/* bundled through the SBC edge to carriers */}
          <div className="flex shrink-0 flex-col items-center justify-center gap-1.5">
            <div className="flex items-center gap-1.5 rounded-lg border-2 border-primary bg-background px-2.5 py-2 shadow-sm">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              <span className="text-[9px] leading-tight font-semibold">SBC<br />edge</span>
            </div>
            <ArrowDown className="size-4 text-primary" aria-hidden />
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 shadow-sm">
              <RadioTower className="size-3.5 text-primary" aria-hidden />
              <span className="text-[9px] font-semibold">Carriers</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-border px-3.5 py-2 text-[8px] text-muted-foreground">
          <span className="flex items-center gap-1"><Router className="size-3 text-primary" aria-hidden /> SIP connectivity</span>
          <span className="flex items-center gap-1"><FileText className="size-3 text-primary" aria-hidden /> Number management</span>
          <span className="flex items-center gap-1"><Code2 className="size-3 text-primary" aria-hidden /> Programmable</span>
        </div>
      </Window>
    </Stage>
  );
}

/* --------------------------------------------------------------- registry */

const SCENES: Record<string, (p: { uid: string }) => React.JSX.Element> = {
  "call-centers": CallCenters,
  healthcare: Healthcare,
  "banking-finance": BankingFinance,
  education: Education,
  retail: Retail,
  hospitality: Hospitality,
  logistics: Logistics,
  "it-saas": ItSaas,
  government: Government,
  manufacturing: Manufacturing,
  "telecom-operators": TelecomOperators,
};

export function IndustryIllustration({ slug, className }: Props) {
  const Scene = SCENES[slug];
  if (!Scene) return null;
  return (
    <div className={cn("w-full", className)}>
      <Scene uid={slug} />
    </div>
  );
}
