"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Check,
  Clock,
  EyeOff,
  FileClock,
  Fingerprint,
  Lock,
  LockOpen,
  Play,
  ScrollText,
  ShieldCheck,
  Trash2,
  UserCog,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Two working scenes for the certifications page.
 *
 * Each takes one framework's key controls from lib/company and plays them
 * as they happen rather than listing them: a recorded call that only the
 * right role can replay, with every attempt written to an audit trail; and
 * a call record that is minimised, held for its retention window and then
 * deleted with a receipt. The people, lines and times are the scene's own
 * illustration — no figure here is a claim.
 *
 * Laid out on a 160 × 90 stage and sized in container units, so a scene
 * scales as a picture does. Below `lg` the same story is told as a list.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------- kit */

/** Place a box on the 160 × 90 stage. */
function at(x: number, y: number, w: number) {
  return { left: `${(x / 160) * 100}%`, top: `${(y / 90) * 100}%`, width: `${(w / 160) * 100}%` };
}

function useBeat(beats: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: false, amount: 0.3 });
  const still = !!useReducedMotion();
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!seen || still) return;
    const id = window.setInterval(() => setBeat((b) => (b + 1) % beats), ms);
    return () => window.clearInterval(id);
  }, [seen, still, beats, ms]);

  return { ref, beat, still };
}

function Stage({
  stageRef,
  label,
  children,
}: {
  stageRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={label}
      className="@container relative aspect-[16/9] w-full"
    >
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--foreground)_14%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,black,transparent)]"
      />
      {children}
    </div>
  );
}

/** Wires between panels, drawn on the stage's own 160 × 90 grid. */
function Wires({ wires }: { wires: { d: string; lit: boolean }[] }) {
  return (
    <svg aria-hidden viewBox="0 0 160 90" className="absolute inset-0 size-full overflow-visible" fill="none">
      {wires.map(({ d, lit }, i) => {
        const ends = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
        const [x1, y1] = ends;
        const [x2, y2] = ends.slice(-2);
        return (
          <g key={i}>
            <path d={d} stroke="var(--primary)" strokeOpacity={0.25} strokeWidth={0.45} strokeLinecap="round" />
            <motion.path
              d={d}
              stroke="var(--primary)"
              strokeWidth={0.6}
              strokeLinecap="round"
              strokeDasharray="1.6 3.2"
              animate={{ strokeDashoffset: lit ? [0, -9.6] : 0, opacity: lit ? 1 : 0 }}
              transition={{ strokeDashoffset: { duration: 0.75, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }}
            />
            {[
              [x1, y1],
              [x2, y2],
            ].map(([cx, cy], j) => (
              <g key={j}>
                <circle cx={cx} cy={cy} r={1.1} fill="var(--card)" stroke="var(--primary)" strokeWidth={0.35} strokeOpacity={lit ? 1 : 0.4} />
                <circle cx={cx} cy={cy} r={0.45} fill="var(--primary)" opacity={lit ? 1 : 0.35} />
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function Panel({
  icon: Icon,
  title,
  subtitle,
  aside,
  glow,
  className,
  style,
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  aside?: ReactNode;
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        className={cn(
          "flex flex-col gap-[0.8cqw] rounded-[1.4cqw] border bg-card/90 p-[1.1cqw] backdrop-blur-md transition-shadow duration-500",
          glow
            ? "border-primary/30 shadow-[0_1.2cqw_3cqw_-1cqw_color-mix(in_oklab,var(--primary)_35%,transparent)]"
            : "border-border/70 shadow-[0_1cqw_2.5cqw_-1cqw_color-mix(in_oklab,var(--primary)_20%,transparent)]",
        )}
      >
        <div className="flex items-center gap-[0.7cqw]">
          <span className="flex size-[2.5cqw] shrink-0 items-center justify-center rounded-[0.7cqw] bg-primary text-primary-foreground shadow-md shadow-primary/30">
            <Icon className="size-1/2" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[1.05cqw] font-semibold text-foreground">{title}</span>
            {subtitle && <span className="text-[0.72cqw] text-muted-foreground">{subtitle}</span>}
          </span>
          {aside && <span className="ml-auto">{aside}</span>}
        </div>
        {children}
      </div>
    </motion.div>
  );
}

function Chip({ label, tone = "quiet" }: { label: string; tone?: "quiet" | "on" | "off" | "bad" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-[0.6cqw] py-[0.2cqw] text-[0.7cqw] font-semibold whitespace-nowrap transition-colors duration-500",
        tone === "on" && "bg-primary text-primary-foreground",
        tone === "quiet" && "bg-accent text-accent-foreground",
        tone === "off" && "bg-muted text-muted-foreground",
        tone === "bad" && "bg-destructive/15 text-destructive",
      )}
    >
      {label}
    </span>
  );
}

function Pill({ icon: Icon, label, style }: { icon: LucideIcon; label: string; style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute flex justify-center"
      style={style}
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="flex items-center gap-[0.7cqw] rounded-full bg-card py-[0.35cqw] pr-[1.3cqw] pl-[0.35cqw] text-[1.05cqw] font-semibold whitespace-nowrap text-foreground shadow-lg shadow-primary/25 ring-2 ring-primary">
        <span className="flex size-[2.4cqw] items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Icon className="size-1/2" />
        </span>
        {label}
      </span>
    </motion.div>
  );
}

function CornerTile({ icon: Icon, style, still, delay = 0 }: { icon: LucideIcon; style: React.CSSProperties; still: boolean; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className="absolute flex aspect-square items-center justify-center rounded-[1.1cqw] border border-border/70 bg-card/80 text-primary/70 shadow-lg shadow-primary/10"
      style={style}
      animate={still ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon className="size-[2.2cqw]" strokeWidth={1.75} />
    </motion.div>
  );
}

function SceneSection({
  id,
  eyebrow,
  title,
  description,
  tint,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tint?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28 border-b border-border py-20 lg:py-24", tint && "bg-muted/25")}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">{eyebrow}</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
          <p className="mt-4 text-pretty text-muted-foreground">{description}</p>
        </motion.div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function MobileSteps({ steps }: { steps: { icon: LucideIcon; title: string; body: string }[] }) {
  return (
    <ol className="relative space-y-6 border-l border-primary/25 pl-8 lg:hidden">
      {steps.map(({ icon: Icon, title, body }, i) => (
        <motion.li
          key={title}
          className="relative"
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          <span className="absolute top-0 -left-[49px] flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30">
            <Icon className="size-4" />
          </span>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-pretty text-muted-foreground">{body}</p>
        </motion.li>
      ))}
    </ol>
  );
}

/* ================================================================
 * Scene 1 — every replay, checked and logged (HIPAA)
 * ================================================================ */

const RECORDINGS = [
  { title: "Appointment call", line: "Front desk line", avatar: "/images/avatars/avatar-sofia.webp" },
  { title: "Billing enquiry", line: "Billing line", avatar: "/images/avatars/avatar-marcus.webp" },
  { title: "Prescription follow-up", line: "Nurse line", avatar: "/images/avatars/avatar-emma.webp" },
  { title: "Lab results", line: "Clinic line", avatar: "/images/avatars/avatar-ryan.webp" },
];

const REQUESTS = [
  { name: "Daniel Ortiz", role: "Billing agent", photo: "/images/people/person-daniel.webp", recording: 3, allowed: false },
  { name: "Marcus Lee", role: "Compliance lead", photo: "/images/people/person-marcus.webp", recording: 3, allowed: true },
];

const PHASES = 6;

export function ReplayAccessScene() {
  const { ref, beat, still } = useBeat(PHASES * REQUESTS.length, 1250);
  const req = still ? 1 : Math.floor(beat / PHASES);
  const phase = still ? PHASES - 1 : beat % PHASES;
  const request = REQUESTS[req];

  const mfa = phase >= 1;
  const roleDone = phase >= 2;
  const purposeDone = phase >= 3 && request.allowed;
  const decided = phase >= 4;
  const granted = decided && request.allowed;

  // The trail: each finished request, newest first, kept to the last four.
  const [trail, setTrail] = useState<{ time: string; text: string; ok: boolean }[]>([
    { time: "10:31", text: "Policy updated · Replay limited to compliance roles", ok: true },
  ]);
  const minute = useRef(36);
  useEffect(() => {
    if (still || phase !== 4) return;
    const t = `10:${String(minute.current).padStart(2, "0")}`;
    minute.current = minute.current >= 58 ? 36 : minute.current + 3;
    setTrail((log) =>
      [
        {
          time: t,
          text: `${request.name} · ${request.allowed ? "Replay granted" : "Replay refused"} · ${RECORDINGS[request.recording].title}`,
          ok: request.allowed,
        },
        ...log,
      ].slice(0, 4),
    );
  }, [phase, req, still, request]);

  const checks: { label: string; done: boolean; ok: boolean; icon: LucideIcon }[] = [
    { label: "Signed in with MFA", done: mfa, ok: true, icon: Fingerprint },
    { label: "Role permits replay", done: roleDone, ok: request.allowed, icon: UserCog },
    { label: "Purpose recorded", done: purposeDone, ok: true, icon: ScrollText },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <SceneSection
        id="replay-controls"
        eyebrow="HIPAA safeguards, at work"
        title="Every replay, checked and logged"
        description="Recorded calls with patient details stay behind role-based permissions. Each request to replay one is checked — and every attempt, refused or granted, is written to the audit trail."
      >
        <div className="hidden lg:block">
          <Stage stageRef={ref} label="A recorded clinic call that a billing agent is refused permission to replay and a compliance lead is granted, with both attempts written to an audit trail.">
            <Wires
              wires={[
                { d: "M46 40 C 52 40, 52 30, 58 30", lit: phase >= 0 },
                { d: "M104 28 C 109 28, 108 20, 113 20", lit: decided },
                { d: "M81 45 C 81 56, 81 62, 81 72", lit: decided },
              ]}
            />

            <CornerTile icon={Lock} style={{ ...at(4, 3, 7) }} still={still} />
            <CornerTile icon={FileClock} style={{ ...at(149, 72, 7) }} still={still} delay={2} />

            <Pill icon={ShieldCheck} label="Recorded calls stay behind a permission check" style={{ ...at(40, 2, 80) }} />

            {/* Recordings */}
            <Panel icon={Lock} title="Call recordings" subtitle="Restricted replay" className="z-10" style={at(3, 15, 43)} aside={<Chip label="4 held" />}>
              <div className="flex flex-col gap-[0.45cqw]">
                {RECORDINGS.map((r, i) => {
                  const picked = i === request.recording;
                  const open = picked && granted;
                  return (
                    <div
                      key={r.title}
                      className={cn(
                        "flex items-center gap-[0.7cqw] rounded-[0.8cqw] px-[0.6cqw] py-[0.45cqw] transition-all duration-500",
                        picked ? "bg-accent shadow-sm shadow-primary/20" : "bg-muted/40",
                      )}
                    >
                      <span className="relative size-[2.2cqw] shrink-0 overflow-hidden rounded-full ring-1 ring-card">
                        <Image src={r.avatar} alt="" fill sizes="32px" className="object-cover" />
                      </span>
                      <span className="flex min-w-0 flex-col leading-tight">
                        <span className="truncate text-[0.82cqw] font-semibold text-foreground">{r.title}</span>
                        <span className="text-[0.66cqw] text-muted-foreground">{r.line}</span>
                      </span>
                      <span
                        className={cn(
                          "ml-auto flex size-[1.8cqw] items-center justify-center rounded-full transition-colors duration-500",
                          open ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground",
                        )}
                      >
                        {open ? <LockOpen className="size-1/2" /> : <Lock className="size-1/2" />}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* The request */}
            <Panel
              icon={UserCog}
              title="Replay request"
              subtitle={RECORDINGS[request.recording].title}
              glow
              className="z-20"
              style={at(58, 16, 46)}
              aside={
                decided ? (
                  <Chip label={granted ? "Granted" : "Refused"} tone={granted ? "on" : "bad"} />
                ) : (
                  <Chip label="Checking" tone="off" />
                )
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={request.name}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-[0.8cqw] rounded-[0.9cqw] bg-muted/40 p-[0.6cqw]"
                >
                  <span className="relative size-[3cqw] overflow-hidden rounded-full ring-2 ring-card">
                    <Image src={request.photo} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[0.9cqw] font-semibold text-foreground">{request.name}</span>
                    <span className="text-[0.7cqw] text-muted-foreground">{request.role}</span>
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col gap-[0.4cqw]">
                {checks.map(({ label, done, ok, icon: Icon }) => {
                  const failed = done && !ok;
                  const skipped = !request.allowed && label === "Purpose recorded" && decided;
                  return (
                    <div key={label} className={cn("flex items-center gap-[0.6cqw] text-[0.8cqw] transition-opacity duration-500", !done && !skipped && "opacity-45")}>
                      <Icon className="size-[1.1cqw] text-muted-foreground" />
                      <span className="text-foreground">{label}</span>
                      <span
                        className={cn(
                          "ml-auto flex size-[1.5cqw] items-center justify-center rounded-full transition-colors duration-500",
                          failed ? "bg-destructive/15 text-destructive" : done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {failed ? <X className="size-3/5" /> : done ? <Check className="size-3/5" /> : null}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Playback, only when granted */}
              <div className="flex h-[2.4cqw] items-center gap-[0.5cqw] rounded-[0.8cqw] bg-accent/60 px-[0.6cqw]">
                <Play className={cn("size-[1.1cqw] shrink-0", granted ? "text-primary" : "text-muted-foreground/50")} />
                <span className="flex h-full flex-1 items-center gap-[0.18cqw]">
                  {Array.from({ length: 30 }, (_, b) => (
                    <motion.span
                      key={b}
                      className={cn("flex-1 rounded-full", granted ? "bg-primary" : "bg-muted-foreground/25")}
                      animate={{ height: granted && !still ? ["25%", `${35 + ((b * 29) % 60)}%`, "30%"] : "20%" }}
                      transition={{ duration: 0.75, repeat: granted ? Infinity : 0, delay: (b % 6) * 0.125 }}
                    />
                  ))}
                </span>
              </div>
            </Panel>

            {/* Audit trail */}
            <Panel icon={ScrollText} title="Audit trail" subtitle="Every attempt, written down" className="z-10" style={at(113, 12, 44)}>
              <div className="flex flex-col gap-[0.4cqw]">
                <AnimatePresence initial={false}>
                  {trail.map((entry) => (
                    <motion.div
                      key={entry.time + entry.text}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-[0.6cqw] rounded-[0.7cqw] bg-muted/40 px-[0.6cqw] py-[0.45cqw]"
                    >
                      <span className="font-mono text-[0.68cqw] text-muted-foreground">{entry.time}</span>
                      <span className="flex-1 text-[0.72cqw] leading-snug text-foreground">{entry.text}</span>
                      <span className={cn("mt-[0.25cqw] size-[0.6cqw] shrink-0 rounded-full", entry.ok ? "bg-primary" : "bg-destructive")} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Panel>

            {/* What it lands on */}
            <Panel
              icon={ShieldCheck}
              title="Access configured per role, every attempt recorded"
              subtitle="Restricted replay · Administrative access controls · Audit trail logging"
              className="z-10"
              style={at(52, 72, 58)}
            />
          </Stage>
        </div>

        <MobileSteps
          steps={[
            { icon: Lock, title: "Recordings are restricted", body: "Recorded calls carrying patient details are held with restricted replay permissions." },
            { icon: Fingerprint, title: "Every request is checked", body: "Sign-in, the requester's role and the purpose are checked before a replay is allowed." },
            { icon: X, title: "Wrong role, refused", body: "A billing agent asking to hear a lab-results call is refused." },
            { icon: Check, title: "Right role, granted", body: "A compliance lead with a recorded purpose is granted playback." },
            { icon: ScrollText, title: "Both are logged", body: "Every attempt, refused or granted, is written to the audit trail." },
          ]}
        />
      </SceneSection>
    </MotionConfig>
  );
}

/* ================================================================
 * Scene 2 — kept only as long as it should be (GDPR)
 * ================================================================ */

const FIELDS = [
  { label: "Caller", full: "Sofia Marín", masked: "S. M." },
  { label: "Number", full: "+34 612 345 482", masked: "+34 ••• ••• 482" },
  { label: "Call notes", full: "Asked to move Thursday's visit", masked: "Minimised" },
];

const STAGES = ["Active", "Retention window", "Deleted"];
const RECEIPT = ["Recording removed", "Personal details erased", "Deletion logged"];

export function RetentionScene() {
  const BEATS = 12;
  const { ref, beat, still } = useBeat(BEATS, 1250);
  const b = still ? BEATS - 1 : beat;

  const masked = (i: number) => b >= 1 + i;
  const stage = b < 4 ? 0 : b < 7 ? 1 : 2;
  const progress = b < 4 ? 8 + b * 8 : b < 7 ? 40 + (b - 4) * 18 : 100;
  const receipt = (i: number) => b >= 8 + i;
  const deleted = stage === 2;

  return (
    <MotionConfig reducedMotion="user">
      <SceneSection
        id="retention-controls"
        tint
        eyebrow="GDPR principles, at work"
        title="Kept only as long as it should be"
        description="Personal data in a call record is minimised to what the purpose needs, visible only to the roles that need it, held for its retention window — and then deleted, with the deletion on record."
      >
        <div className="hidden lg:block">
          <Stage stageRef={ref} label="A call record whose personal fields are minimised, which is then held for its retention window and deleted, with a receipt of what was removed.">
            <Wires
              wires={[
                { d: "M47 32 C 53 32, 53 34, 60 34", lit: b >= 3 },
                { d: "M102 34 C 108 34, 108 52, 114 52", lit: b >= 7 },
              ]}
            />

            <CornerTile icon={EyeOff} style={{ ...at(150, 3, 7) }} still={still} />
            <CornerTile icon={Clock} style={{ ...at(3, 76, 7) }} still={still} delay={2} />

            <Pill icon={ShieldCheck} label="Data minimisation · Purpose limitation · Transparent deletion" style={{ ...at(30, 2, 100) }} />

            {/* The record */}
            <Panel
              icon={ScrollText}
              title="Call record"
              subtitle="Purpose: appointment scheduling"
              className="z-10"
              style={at(3, 14, 44)}
              aside={<Chip label={deleted ? "Deleted" : "Support role only"} tone={deleted ? "off" : "quiet"} />}
            >
              <div className={cn("flex flex-col gap-[0.45cqw] transition-opacity duration-700", deleted && "opacity-35")}>
                {FIELDS.map((f, i) => (
                  <div key={f.label} className="flex items-center gap-[0.7cqw] rounded-[0.8cqw] bg-muted/40 px-[0.7cqw] py-[0.55cqw]">
                    <span className="w-[5.5cqw] text-[0.7cqw] text-muted-foreground">{f.label}</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={masked(i) ? "m" : "f"}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.35 }}
                        className={cn("text-[0.82cqw] font-semibold", masked(i) ? "font-mono text-primary" : "text-foreground")}
                      >
                        {masked(i) ? f.masked : f.full}
                      </motion.span>
                    </AnimatePresence>
                    {masked(i) && <EyeOff className="ml-auto size-[1.1cqw] text-primary" />}
                  </div>
                ))}
                <div className="flex items-center gap-[0.7cqw] rounded-[0.8cqw] bg-muted/40 px-[0.7cqw] py-[0.55cqw]">
                  <span className="w-[5.5cqw] text-[0.7cqw] text-muted-foreground">Recording</span>
                  <span className="text-[0.82cqw] font-semibold text-foreground">{deleted ? "Removed" : "Stored, encrypted"}</span>
                  <Lock className="ml-auto size-[1.1cqw] text-muted-foreground" />
                </div>
              </div>
            </Panel>

            {/* Retention */}
            <Panel
              icon={Clock}
              title="Retention"
              subtitle="Storage duration set by policy"
              glow
              className="z-20"
              style={at(60, 20, 42)}
              aside={<Chip label={STAGES[stage]} tone={deleted ? "on" : "quiet"} />}
            >
              <div className="relative h-[0.8cqw] overflow-hidden rounded-full bg-muted">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-from to-brand-to"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="grid grid-cols-3 gap-[0.5cqw]">
                {STAGES.map((s, i) => (
                  <div
                    key={s}
                    className={cn(
                      "flex flex-col items-center gap-[0.35cqw] rounded-[0.8cqw] px-[0.4cqw] py-[0.6cqw] text-center transition-all duration-500",
                      i === stage ? "bg-accent shadow-sm shadow-primary/20" : i < stage ? "bg-muted/40" : "bg-muted/20 opacity-50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-[1.8cqw] items-center justify-center rounded-full transition-colors duration-500",
                        i <= stage ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {i === 0 ? <ScrollText className="size-1/2" /> : i === 1 ? <Clock className="size-1/2" /> : <Trash2 className="size-1/2" />}
                    </span>
                    <span className="text-[0.7cqw] leading-tight font-medium text-foreground">{s}</span>
                  </div>
                ))}
              </div>
              <p className="text-[0.72cqw] leading-snug text-muted-foreground">
                {deleted
                  ? "The window has closed; the record is deleted."
                  : stage === 1
                    ? "Held only for its retention window, then removed."
                    : "In use for the purpose it was collected for."}
              </p>
            </Panel>

            {/* The person it's about */}
            <motion.div
              className="absolute z-10 overflow-hidden rounded-[1.3cqw] border-[0.3cqw] border-card shadow-xl shadow-primary/20"
              style={{ ...at(116, 12, 20), aspectRatio: "4 / 5" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image src="/images/people/person-sofia.webp" alt="" fill sizes="240px" className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-foreground/65 to-transparent" />
              <span className="absolute bottom-[0.6cqw] left-[0.8cqw] text-[0.75cqw] font-semibold text-card">The caller, in the EU</span>
            </motion.div>

            {/* Receipt */}
            <Panel icon={Trash2} title="Deletion receipt" subtitle="What was removed" className="z-10" style={at(114, 50, 43)}>
              <div className="flex flex-col gap-[0.4cqw]">
                {RECEIPT.map((r, i) => (
                  <div key={r} className={cn("flex items-center gap-[0.6cqw] rounded-[0.7cqw] bg-muted/40 px-[0.6cqw] py-[0.45cqw] transition-opacity duration-500", !receipt(i) && "opacity-40")}>
                    <span
                      className={cn(
                        "flex size-[1.5cqw] items-center justify-center rounded-full transition-colors duration-500",
                        receipt(i) ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      {receipt(i) && <Check className="size-3/5" />}
                    </span>
                    <span className="text-[0.78cqw] text-foreground">{r}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </Stage>
        </div>

        <MobileSteps
          steps={[
            { icon: EyeOff, title: "Minimised", body: "Personal details in the record are reduced to what the purpose needs." },
            { icon: UserCog, title: "Visible by role", body: "Only the roles that need the record can see it." },
            { icon: Clock, title: "Held for its window", body: "The record is kept for the retention window set by policy." },
            { icon: Trash2, title: "Deleted, with a receipt", body: "When the window closes it is deleted, and the deletion is logged." },
          ]}
        />
      </SceneSection>
    </MotionConfig>
  );
}
