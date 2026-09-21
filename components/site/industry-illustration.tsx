import {
  Ambulance,
  ArrowRight,
  Banknote,
  Bed,
  BellRing,
  Boxes,
  Building2,
  CalendarClock,
  Cloud,
  Code2,
  Factory,
  FileAudio,
  Gauge,
  GraduationCap,
  Headset,
  HeartPulse,
  Landmark,
  MapPin,
  MessageSquare,
  Navigation,
  RadioTower,
  Router,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Truck,
  UserRound,
  Utensils,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Illustrations for the industry pages — one scene per sector, and every
 * scene a different KIND of picture, not one composition with the labels
 * swapped. A call-centre reads as a queue wallboard; healthcare as a patient
 * record behind a lock; finance as a recorded waveform; logistics as a route
 * map; and so on. Built from the same visual language as ProductIllustration
 * — labelled cards over a faint dot field, a live status chip, theme tokens
 * and lucide-react only, so both themes work and nothing extra is downloaded.
 *
 * Keyed by slug; a missing scene renders nothing rather than a stand-in.
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
        <pattern id={`id-${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" className="fill-primary/30" />
        </pattern>
        <radialGradient id={`idf-${uid}`} cx="50%" cy="50%" r="58%">
          <stop offset="0%" stopColor="white" stopOpacity="0.85" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`idm-${uid}`}>
          <rect width="400" height="180" fill={`url(#idf-${uid})`} />
        </mask>
      </defs>
      <rect width="400" height="180" fill={`url(#id-${uid})`} mask={`url(#idm-${uid})`} />
    </svg>
  );
}

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
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-8 bottom-0 -z-10">
        <DotField uid={uid} />
      </div>
      <div className="flex justify-center pb-4">
        <StatusPill text={status} />
      </div>
      {children}
    </div>
  );
}

/** A titled window frame with mac-style dots — used by the panel-like scenes. */
function Window({
  icon: Icon,
  title,
  children,
}: {
  icon?: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-background shadow-sm">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        {Icon ? (
          <span className="flex size-5 items-center justify-center rounded bg-primary/10 text-primary">
            <Icon className="size-3" aria-hidden />
          </span>
        ) : (
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
        )}
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ================================================================ 1. call-centers
   A live queue wallboard: callers holding in line (with wait times) on the
   left, the routing verb in the middle, a grid of agent seats on the right.
   ============================================================================ */
function CallCentersScene({ uid }: { uid: string }) {
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
          <span className="font-mono text-[8px] tracking-widest text-muted-foreground uppercase">
            In queue
          </span>
          <div className="rounded-xl border border-dashed border-primary/50 bg-primary/[0.04] p-2">
            <div className="flex flex-col gap-1">
              {waiting.map(({ n, t }, i) => (
                <div
                  key={n}
                  style={{ "--cycle-delay": `${i * 0.6}s` } as React.CSSProperties}
                  className="queue-row flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1"
                >
                  <span className="flex size-4 shrink-0 items-center justify-center rounded bg-primary/10 font-mono text-[8px] font-semibold text-primary tabular-nums">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-[9px] tabular-nums">
                    {n}
                  </span>
                  <span className="shrink-0 font-mono text-[8px] text-muted-foreground tabular-nums">
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <span className="text-center font-mono text-[9px] font-semibold tracking-[0.16em] text-primary uppercase">
            ACD routing
          </span>
        </div>

        <div className="flex shrink-0 items-center" aria-hidden>
          <ArrowRight className="size-4 text-primary" />
        </div>

        <div className="grid shrink-0 grid-cols-2 content-center gap-1.5">
          {agents.map(({ name, free }) => (
            <div
              key={name}
              className="flex w-[4.6rem] items-center gap-1.5 rounded-lg border border-border bg-background px-2 py-1.5 shadow-sm"
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-md",
                  free ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                )}
              >
                <Headset className="size-2.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[9px] leading-tight font-semibold">{name}</span>
                <span className="flex items-center gap-1">
                  <span className={cn("size-1.5 rounded-full", free ? "bg-primary" : "bg-muted-foreground/40")} />
                  <span className="text-[7px] text-muted-foreground">{free ? "Free" : "Busy"}</span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ================================================================ 2. healthcare
   A patient appointment card sealed behind a HIPAA lock, with the callback /
   reminder that goes out. The lock is the point.
   ============================================================================ */
function HealthcareScene({ uid }: { uid: string }) {
  return (
    <Stage uid={uid} status="HIPAA-compliant line">
      <div className="flex items-center gap-3">
        <Window icon={HeartPulse} title="Patient record">
          <div className="space-y-2 p-3">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserRound className="size-3.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block h-2 w-20 rounded-full bg-muted-foreground/30" />
                <span className="mt-1 block h-1.5 w-12 rounded-full bg-muted-foreground/20" />
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border px-2 py-1.5">
              <CalendarClock className="size-3.5 shrink-0 text-primary" aria-hidden />
              <span className="text-[9px] leading-tight">
                <span className="block font-semibold">Appt · Thu 10:30</span>
                <span className="block text-muted-foreground">Reminder queued</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-[8px] text-muted-foreground">
              <Stethoscope className="size-3 text-primary" aria-hidden /> Clinic
              <FileAudio className="ml-1 size-3 text-primary" aria-hidden /> Secure fax
            </div>
          </div>
        </Window>

        <div className="flex shrink-0 flex-col items-center gap-2">
          <span className="relative flex size-14 items-center justify-center rounded-2xl border-2 border-primary bg-background text-primary shadow-sm">
            <ShieldCheck className="size-6" aria-hidden />
            <span className="absolute -inset-2 -z-10 rounded-3xl border border-dashed border-primary/30" />
          </span>
          <span className="text-center font-mono text-[8px] font-semibold tracking-widest text-primary uppercase">
            Encrypted
            <br />
            end to end
          </span>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-1 text-center">
          <span className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-primary shadow-sm">
            <Ambulance className="size-4" aria-hidden />
          </span>
          <span className="text-[8px] leading-tight text-muted-foreground">Urgent line</span>
        </div>
      </div>
    </Stage>
  );
}

/* ================================================================ 3. banking-finance
   A recorded call: the waveform with a playhead, and the compliance readouts
   beside it. Accountability you can replay.
   ============================================================================ */
function BankingFinanceScene({ uid }: { uid: string }) {
  const wave = [30, 52, 40, 68, 88, 60, 44, 74, 96, 66, 48, 80, 58, 38, 62, 46, 30, 54];
  const playhead = 0.55;
  const played = Math.round(wave.length * playhead);
  const readouts = [
    { icon: ShieldCheck, label: "Retention", value: "Locked" },
    { icon: FileAudio, label: "Transcript", value: "Ready" },
  ];
  return (
    <Stage uid={uid} status="Recorded for compliance">
      <Window icon={Banknote} title="Call · acct ···· 4471">
        <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <div className="relative flex h-16 items-center gap-[3px]">
              {wave.map((h, i) => (
                <span
                  key={i}
                  className={cn("flex-1 rounded-full", i < played ? "bg-primary" : "bg-primary/20")}
                  style={{ height: `${h}%` }}
                />
              ))}
              <span
                aria-hidden
                className="absolute inset-y-0 w-px bg-foreground/50"
                style={{ left: `${playhead * 100}%` }}
              >
                <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-foreground/70" />
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono text-[9px] text-muted-foreground tabular-nums">02:12</span>
              <span className="relative h-0.5 flex-1 rounded-full bg-border">
                <span className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${playhead * 100}%` }} />
              </span>
              <span className="font-mono text-[9px] text-muted-foreground tabular-nums">03:58</span>
            </div>
          </div>
          <dl className="flex shrink-0 flex-col justify-center gap-2.5 sm:w-28">
            {readouts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-3.5" aria-hidden />
                </span>
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

/* ================================================================ 4. education
   A campus directory tree: one line branching down into the offices a
   student, parent or staff member actually needs.
   ============================================================================ */
function EducationScene({ uid }: { uid: string }) {
  const branches = [
    { icon: GraduationCap, label: "Admissions", note: "Enquiries & intake" },
    { icon: Headset, label: "Student support", note: "Help & guidance", live: true },
    { icon: Banknote, label: "Fees office", note: "Billing desk" },
    { icon: Building2, label: "Departments", note: "Faculty & campus" },
  ];
  return (
    <Stage uid={uid} status="Routed to the right desk">
      <div className="flex items-center gap-2">
        <div className="flex w-24 shrink-0 flex-col items-center gap-2 text-center">
          <span className="flex size-11 items-center justify-center rounded-2xl border border-primary/40 bg-background text-primary shadow-sm">
            <GraduationCap className="size-5" aria-hidden />
          </span>
          <span className="text-[9px] leading-tight text-muted-foreground">
            Campus line
            <br />
            students · parents
          </span>
        </div>

        {/* directory tree: a vertical spine with elbows to each branch */}
        <div className="relative w-8 shrink-0 self-stretch" aria-hidden>
          <span className="absolute top-[12%] bottom-[12%] left-0 w-px bg-primary/30" />
          {branches.map((_, i) => {
            const top = ((i + 0.5) / branches.length) * 100;
            return (
              <span
                key={i}
                className={cn("absolute left-0 h-px", branches[i].live ? "bg-primary" : "bg-primary/30")}
                style={{ top: `${top}%`, width: "100%" }}
              />
            );
          })}
        </div>

        <div className="flex shrink-0 flex-col gap-1.5">
          {branches.map(({ icon: Icon, label, note, live }) => (
            <div
              key={label}
              className={cn(
                "flex w-40 items-center gap-2.5 rounded-lg border bg-background px-3 py-2 shadow-sm",
                live ? "border-primary" : "border-border",
              )}
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-3.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] leading-tight font-semibold">{label}</span>
                <span className="block text-[9px] leading-tight text-muted-foreground">{note}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ================================================================ 5. retail
   An order-status SMS thread on a phone, next to the store-hours card. The
   channel a shopper actually sees.
   ============================================================================ */
function RetailScene({ uid }: { uid: string }) {
  const bubbles = [
    { them: true, text: "Order #7741 confirmed" },
    { them: true, text: "Packed — ships today" },
    { them: false, text: "Track my order" },
    { them: true, text: "Out for delivery 🚚" },
  ];
  return (
    <Stage uid={uid} status="Order updates by SMS">
      <div className="flex items-end justify-center gap-4">
        {/* phone with the thread */}
        <div className="w-[9.5rem] shrink-0 rounded-[1.4rem] border-2 border-border bg-background p-1.5 shadow-sm">
          <div className="rounded-[1rem] bg-muted/40 px-2 py-2">
            <div className="mb-1.5 flex items-center gap-1.5 px-1">
              <ShoppingBag className="size-3 text-primary" aria-hidden />
              <span className="text-[8px] font-semibold">Store SMS</span>
            </div>
            <div className="flex flex-col gap-1">
              {bubbles.map(({ them, text }, i) => (
                <span
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-2 py-1 text-[8px] leading-snug",
                    them
                      ? "self-start rounded-bl-sm bg-background text-foreground shadow-sm"
                      : "self-end rounded-br-sm bg-primary text-primary-foreground",
                  )}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <div className="flex w-32 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-sm">
            <MessageSquare className="size-3.5 shrink-0 text-primary" aria-hidden />
            <span className="text-[9px] font-semibold">Business SMS</span>
          </div>
          <div className="flex w-32 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-sm">
            <Headset className="size-3.5 shrink-0 text-primary" aria-hidden />
            <span className="text-[9px] leading-tight">
              <span className="block font-semibold">Store support</span>
              <span className="block text-muted-foreground">Per-branch line</span>
            </span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ================================================================ 6. hospitality
   A front-desk extension board: room extensions lighting up with requests.
   A PBX the way a hotel actually uses it.
   ============================================================================ */
function HospitalityScene({ uid }: { uid: string }) {
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
            <div
              key={ext}
              className={cn(
                "flex items-center gap-2 rounded-lg border bg-background px-2.5 py-2",
                live ? "border-primary shadow-sm" : "border-border",
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-md",
                  live ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                )}
              >
                <Icon className="size-3.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1">
                  <span className="font-mono text-[10px] font-semibold tabular-nums">Rm {ext}</span>
                  {live ? (
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 motion-reduce:animate-none" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                    </span>
                  ) : null}
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

/* ================================================================ 7. logistics
   A live route map: dispatch at the centre, stops along a road, a vehicle en
   route, and the ETA that texts the customer.
   ============================================================================ */
function LogisticsScene({ uid }: { uid: string }) {
  return (
    <Stage uid={uid} status="Drivers & dispatch live">
      <Window icon={MapPin} title="Dispatch · route 7">
        <div className="relative h-[8.5rem] overflow-hidden p-3">
          {/* faint road grid */}
          <svg viewBox="0 0 320 130" className="absolute inset-3 h-auto w-[calc(100%-1.5rem)]" role="presentation" aria-hidden>
            <path d="M10 96 C 90 96, 90 40, 170 40 S 250 96, 310 70" fill="none" className="stroke-primary/25" strokeWidth="2.5" strokeDasharray="1 6" strokeLinecap="round" />
            <path d="M10 96 C 90 96, 90 40, 170 40" fill="none" className="flow-path stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {/* warehouse origin */}
          <span className="absolute bottom-6 left-3 flex flex-col items-center gap-0.5">
            <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-primary shadow-sm">
              <Warehouse className="size-4" aria-hidden />
            </span>
            <span className="text-[7px] text-muted-foreground">Depot</span>
          </span>
          {/* vehicle mid-route */}
          <span className="absolute top-[26%] left-[46%] flex flex-col items-center gap-0.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <Truck className="size-4" aria-hidden />
            </span>
          </span>
          {/* destination + ETA text */}
          <span className="absolute top-[42%] right-3 flex items-center gap-1.5 rounded-lg border border-primary bg-background px-2 py-1 shadow-sm">
            <Navigation className="size-3 text-primary" aria-hidden />
            <span className="text-[8px] leading-tight">
              <span className="block font-semibold">ETA 14:20</span>
              <span className="block text-muted-foreground">SMS sent</span>
            </span>
          </span>
        </div>
      </Window>
    </Stage>
  );
}

/* ================================================================ 8. it-saas
   Their code calling the SipLink SDK, the request out and the JSON-ish
   response back — communication built into the product.
   ============================================================================ */
function ItSaasScene({ uid }: { uid: string }) {
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
        <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <span className="flex size-5 items-center justify-center rounded bg-primary/10 text-primary">
              <Code2 className="size-3" aria-hidden />
            </span>
            <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
              your app
            </span>
          </div>
          <div className="space-y-1 px-3 py-3 font-mono text-[10px] leading-relaxed">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="w-3 shrink-0 text-right text-muted-foreground/40 tabular-nums">{i + 1}</span>
                <span className={cn("min-w-0 truncate", line.accent ? "text-primary" : "text-muted-foreground")}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-12 shrink-0 flex-col items-center gap-1" aria-hidden>
          <svg viewBox="0 0 40 10" className="w-9" role="presentation">
            <path d="M0 5h30M26 1l5 4-5 4" fill="none" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-mono text-[7px] tracking-widest text-primary uppercase">200 ok</span>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-1.5 text-center">
          <span className="flex size-10 items-center justify-center rounded-2xl border border-primary/40 bg-background text-primary shadow-sm">
            <Cloud className="size-5" aria-hidden />
          </span>
          <span className="text-[8px] leading-tight text-muted-foreground">
            Voice · SMS
            <br />
            WebRTC
          </span>
        </div>
      </div>
    </Stage>
  );
}

/* ================================================================ 9. government
   A service-desk ticket queue on a licensed-network banner: "now serving",
   numbered citizen tickets waiting.
   ============================================================================ */
function GovernmentScene({ uid }: { uid: string }) {
  const tickets = ["A-104", "A-105", "A-106", "A-107"];
  return (
    <Stage uid={uid} status="DoT-licensed network">
      <Window icon={Landmark} title="Citizen services">
        <div className="p-3">
          <div className="mb-2 flex items-center justify-between rounded-lg bg-primary px-3 py-2 text-primary-foreground">
            <span className="text-[8px] font-medium tracking-widest uppercase opacity-80">Now serving</span>
            <span className="font-mono text-lg font-semibold tabular-nums">A-103</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[8px] tracking-widest text-muted-foreground uppercase">Next</span>
            <div className="flex flex-1 gap-1.5">
              {tickets.map((t, i) => (
                <span
                  key={t}
                  className={cn(
                    "flex-1 rounded-md border py-1 text-center font-mono text-[9px] font-semibold tabular-nums",
                    i === 0 ? "border-primary text-primary" : "border-border text-muted-foreground",
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3 text-[8px] text-muted-foreground">
            <span className="flex items-center gap-1"><Headset className="size-3 text-primary" aria-hidden /> Service centre</span>
            <span className="flex items-center gap-1"><Building2 className="size-3 text-primary" aria-hidden /> Right department</span>
          </div>
        </div>
      </Window>
    </Stage>
  );
}

/* ================================================================ 10. manufacturing
   A multi-site network: HQ, plant and warehouse nodes joined over SIP into
   one estate, suppliers hanging off the edge.
   ============================================================================ */
function ManufacturingScene({ uid }: { uid: string }) {
  const sites = [
    { icon: Building2, label: "HQ", x: 8, y: 20 },
    { icon: Factory, label: "Plant", x: 62, y: 8 },
    { icon: Warehouse, label: "Warehouse", x: 60, y: 66 },
  ];
  return (
    <Stage uid={uid} status="Sites on one SIP network">
      <div className="relative h-[9rem]">
        <svg viewBox="0 0 320 150" className="absolute inset-0 size-full" role="presentation" aria-hidden>
          {/* links from the central router to each site */}
          <path d="M160 78 L52 44" className="stroke-primary/30" strokeWidth="1.5" fill="none" />
          <path d="M160 78 L210 30" className="stroke-primary" strokeWidth="2" fill="none" />
          <path d="M160 78 L206 108" className="stroke-primary/30" strokeWidth="1.5" fill="none" />
          <path d="M160 78 L210 30" className="flow-path stroke-primary" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>

        {/* central SIP router */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
          <span className="flex size-11 items-center justify-center rounded-xl border-2 border-primary bg-background text-primary shadow-sm">
            <Router className="size-5" aria-hidden />
          </span>
          <span className="font-mono text-[8px] font-semibold tracking-widest text-primary uppercase">SIP</span>
        </div>

        {sites.map(({ icon: Icon, label, x, y }) => (
          <div
            key={label}
            className="absolute flex flex-col items-center gap-0.5"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-primary shadow-sm">
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="text-[8px] font-medium text-muted-foreground">{label}</span>
          </div>
        ))}

        {/* suppliers at the edge */}
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-0.5">
          <span className="flex size-8 items-center justify-center rounded-lg border border-dashed border-border bg-background text-muted-foreground">
            <Boxes className="size-4" aria-hidden />
          </span>
          <span className="text-[8px] text-muted-foreground">Suppliers</span>
        </div>
      </div>
    </Stage>
  );
}

/* ================================================================ 11. telecom-operators
   A capacity readout: concurrent-channel gauge, the SBC guarding the edge,
   and carrier peering — infrastructure at wholesale scale.
   ============================================================================ */
function TelecomOperatorsScene({ uid }: { uid: string }) {
  const bars = [58, 72, 64, 86, 78, 92, 70];
  return (
    <Stage uid={uid} status="Carrier-grade capacity">
      <Window icon={Gauge} title="Voice infrastructure">
        <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <div className="flex items-end justify-between">
              <span className="text-[8px] tracking-widest text-muted-foreground uppercase">Concurrent channels</span>
              <span className="font-mono text-sm font-semibold text-primary tabular-nums">4,820</span>
            </div>
            <div className="mt-2 flex h-16 items-end gap-1.5">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className={cn("flex-1 rounded-sm", i === bars.length - 1 ? "bg-primary" : "bg-primary/25")}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <dl className="flex shrink-0 flex-col justify-center gap-2.5 sm:w-28">
            {[
              { icon: ShieldCheck, label: "Edge", value: "SBC secured" },
              { icon: RadioTower, label: "Peering", value: "Tier-1" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-3.5" aria-hidden />
                </span>
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

/* --------------------------------------------------------------- registry */

const SCENES: Record<string, (p: { uid: string }) => React.JSX.Element> = {
  "call-centers": CallCentersScene,
  healthcare: HealthcareScene,
  "banking-finance": BankingFinanceScene,
  education: EducationScene,
  retail: RetailScene,
  hospitality: HospitalityScene,
  logistics: LogisticsScene,
  "it-saas": ItSaasScene,
  government: GovernmentScene,
  manufacturing: ManufacturingScene,
  "telecom-operators": TelecomOperatorsScene,
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
