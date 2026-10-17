"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  CheckCircle2,
  Clock,
  LifeBuoy,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

/**
 * SipLink Assure, drawn as the customer's line.
 *
 * The rest of the About page speaks in calls connecting: cards "connect in",
 * a hollow status ring flicks lit, a light runs the border once the line is
 * open. So the six commitments are not six boxes — they are six points on one
 * open line that waves across the section. Scrolling draws the line; each
 * commitment connects in as the line reaches it; once the whole line is live
 * a light keeps running along it. The copy is the six commitments as written,
 * grouped only by when they apply.
 */

type Commitment = {
  step: string;
  title: string;
  phase: string;
  description: string;
  icon: LucideIcon;
  guarantee: string;
};

const COMMITMENTS: Commitment[] = [
  {
    step: "01",
    title: "Dedicated Project Managers",
    phase: "Design & Onboarding",
    description:
      "Experts oversee the design and delivery of your solution from concept through to installation. We audit your existing PBX, bandwidth, and call flows before you commit.",
    icon: Users,
    guarantee: "Architectural alignment before cutover",
  },
  {
    step: "02",
    title: "Resolution Expertise",
    phase: "Single-Point Ownership",
    description:
      "An expert manages your issue from beginning to end, keeping you informed until it is resolved. No passing between departments or re-explaining your setup.",
    icon: LifeBuoy,
    guarantee: "Direct engineer accountability",
  },
  {
    step: "03",
    title: "24x7 Customer Support",
    phase: "Day-to-Day Operations",
    description:
      "Dedicated customer support staff are always available to help. Reach telecom engineers via phone, email, and live messaging around the clock.",
    icon: Clock,
    guarantee: "Always-on engineer access",
  },
  {
    step: "04",
    title: "Online Account Management",
    phase: "Administrative Control",
    description:
      "A web portal that makes it easy to administer your account and support. Manage extensions, review CDRs, update routing rules, and monitor spend in real time.",
    icon: ScrollText,
    guarantee: "Instant self-service web portal",
  },
  {
    step: "05",
    title: "Service Level Agreement",
    phase: "Contractual Commitment",
    description:
      "Comprehensive coverage for equipment, access network, and IP transport with guaranteed availability and low-latency performance parameters.",
    icon: ShieldCheck,
    guarantee: "Contractually backed availability",
  },
  {
    step: "06",
    title: "Service Interruption Credits",
    phase: "Financial Accountability",
    description:
      "Our goal is to resolve any service interruption immediately. If a reported fault resides with us, you automatically receive a service credit.",
    icon: ShieldAlert,
    guarantee: "Automatic credit on eligible faults",
  },
];

/* When each commitment applies, as brackets over the line. `from`/`to` are
   indexes into COMMITMENTS. */
const STAGES = [
  { label: "Before you commit", from: 0, to: 0 },
  { label: "Day to day", from: 1, to: 3 },
  { label: "Contractually backed", from: 4, to: 5 },
];

/*
 * The line, laid out in a 1200-wide box and scaled to the band's real width.
 * Each node sits under the centre of its text block on a 12-column grid: the
 * top row (01, 03, 05) spans columns 1–3, 4–7 and 8–11; the bottom row (02,
 * 04, 06) spans 2–5, 6–9 and 10–12. Top-row nodes ride the crests so they sit
 * close to their text, bottom-row nodes the troughs.
 */
const BAND_H = 160;
const NODES = [
  { x: 150, y: 34, gridColumn: "1 / span 3" },
  { x: 300, y: 126, gridColumn: "2 / span 4" },
  { x: 500, y: 34, gridColumn: "4 / span 4" },
  { x: 700, y: 126, gridColumn: "6 / span 4" },
  { x: 900, y: 34, gridColumn: "8 / span 4" },
  { x: 1050, y: 126, gridColumn: "10 / span 3" },
];

/** The line through every node, in real pixels for a band `width` wide. */
function lineFor(width: number) {
  const sx = width / 1200;
  const points = [{ x: 0, y: BAND_H / 2 }, ...NODES, { x: 1200, y: BAND_H / 2 }];
  return points.reduce((d, p, i) => {
    const x = (p.x * sx).toFixed(1);
    if (i === 0) return `M${x} ${p.y}`;
    const prev = points[i - 1];
    const mid = ((p.x - prev.x) / 2) * sx;
    const px = prev.x * sx;
    return `${d} C ${(px + mid).toFixed(1)} ${prev.y}, ${(p.x * sx - mid).toFixed(1)} ${p.y}, ${x} ${p.y}`;
  }, "");
}

export function AboutAssureScene() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        {/* Drifting brand orbs, the same ones the mission section uses */}
        <div
          aria-hidden
          className="glass-orb -top-10 left-[8%] size-72 bg-brand-to/15"
          style={{ "--orb-duration": "11s", "--orb-x": "90px", "--orb-y": "40px" } as CSSProperties}
        />
        <div
          aria-hidden
          className="glass-orb right-[6%] bottom-0 size-80 bg-brand-from/15"
          style={{ "--orb-duration": "14s", "--orb-x": "-80px", "--orb-y": "-50px" } as CSSProperties}
        />

        <div className="relative hidden lg:block">
          <AssureLine />
        </div>
        <div className="relative lg:hidden">
          <AssureRail />
        </div>
      </div>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------ desktop */

function AssureLine() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [reached, setReached] = useState(reduce ? 1 : 0);
  const [hovered, setHovered] = useState<number | null>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth || 1200);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const line = lineFor(width);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 80%", "center 45%"],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const pathLength = useTransform(drawn, (v) => (reduce ? 1 : v));

  useMotionValueEvent(drawn, "change", (v) => {
    if (!reduce) setReached(v);
  });

  const progress = reduce ? 1 : reached;
  const isLit = (i: number) => progress >= NODES[i].x / 1200 - 0.02;
  const live = progress > 0.985;

  const textBlock = (item: Commitment, i: number, row: "top" | "bottom") => {
    const lit = isLit(i);
    return (
      <motion.div
        key={item.step}
        style={{ gridColumn: NODES[i].gridColumn }}
        onHoverStart={() => setHovered(i)}
        onHoverEnd={() => setHovered(null)}
        animate={{ opacity: lit ? 1 : 0.3, y: lit ? 0 : row === "top" ? 10 : -10 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex flex-col items-center px-3 text-center",
          row === "top" ? "justify-end pb-2" : "justify-start pt-2",
        )}
      >
        <div className="flex items-center gap-2.5">
          <motion.span
            aria-hidden
            className="h-px origin-right bg-primary/60"
            animate={{ width: lit ? 28 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <span className="font-mono text-[11px] font-bold tracking-widest text-primary uppercase">
            {item.step} · {item.phase}
          </span>
          <motion.span
            aria-hidden
            className="h-px origin-left bg-primary/60"
            animate={{ width: lit ? 28 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </div>
        <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground">
          {item.title}
        </h3>
        <p className="mt-1.5 max-w-[19rem] text-[13px] leading-relaxed text-pretty text-muted-foreground">
          {item.description}
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
          {item.guarantee}
        </p>
      </motion.div>
    );
  };

  return (
    <div ref={stageRef} className="relative">
      {/* When each commitment applies */}
      <div className="mb-8 grid grid-cols-6 gap-4">
        {STAGES.map((stage) => {
          const lit = isLit(stage.from);
          return (
            <div
              key={stage.label}
              style={{ gridColumn: `${stage.from + 1} / ${stage.to + 2}` }}
              className="flex flex-col gap-2"
            >
              <span
                className={cn(
                  "font-mono text-[11px] font-semibold tracking-widest uppercase transition-colors duration-500",
                  lit ? "text-foreground" : "text-muted-foreground/60",
                )}
              >
                {stage.label}
              </span>
              <span className="relative h-px w-full bg-border">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-from to-brand-to"
                  animate={{ width: lit ? "100%" : "0%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </div>
          );
        })}
      </div>

      {/* Top row: 01, 03, 05 */}
      <div className="grid min-h-[13rem] grid-cols-12">
        {COMMITMENTS.map((item, i) => (i % 2 === 0 ? textBlock(item, i, "top") : null))}
      </div>

      {/* The line */}
      <div ref={bandRef} className="relative" style={{ height: BAND_H }}>
        <svg
          aria-hidden
          viewBox={`0 0 ${width} ${BAND_H}`}
          className="absolute inset-0 size-full overflow-visible"
          fill="none"
        >
          <defs>
            <linearGradient id="assure-line" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--brand-from)" />
              <stop offset="100%" stopColor="var(--brand-to)" />
            </linearGradient>
          </defs>

          {/* Stems from each node to its text */}
          {NODES.map((node, i) => (
            <line
              key={i}
              x1={(node.x / 1200) * width}
              x2={(node.x / 1200) * width}
              y1={node.y}
              y2={i % 2 === 0 ? 0 : BAND_H}
              stroke="var(--primary)"
              strokeOpacity={isLit(i) ? 0.45 : 0.12}
              strokeDasharray="3 4"
              className="transition-[stroke-opacity] duration-500"
            />
          ))}

          {/* The unlit line, then the line as drawn so far */}
          <path d={line} stroke="var(--border)" strokeWidth={2} strokeDasharray="2 6" />
          <motion.path
            d={line}
            stroke="url(#assure-line)"
            strokeWidth={3}
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {/* Once the whole line is live, a light keeps running along it */}
        {live && !reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 size-3 rounded-full bg-primary shadow-[0_0_14px_4px_var(--primary)]"
            style={{ offsetPath: `path("${line}")`, offsetRotate: "0deg" }}
            initial={{ offsetDistance: "0%", opacity: 0 }}
            animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
          />
        )}

        {/* Nodes */}
        {COMMITMENTS.map((item, i) => {
          const Icon = item.icon;
          const lit = isLit(i);
          const focus = hovered === i;
          return (
            <motion.span
              key={item.step}
              aria-hidden
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(NODES[i].x / 1200) * 100}%`, top: NODES[i].y }}
              animate={{ scale: focus ? 1.18 : lit ? 1 : 0.82 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              {lit && !reduce && (
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/25 [animation-duration:2.4s]" />
              )}
              <span
                className={cn(
                  "relative flex size-12 items-center justify-center rounded-full border-2 transition-all duration-500",
                  lit
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/35"
                    : "border-primary/30 bg-background text-primary/50",
                )}
              >
                <Icon className="size-5" />
              </span>
            </motion.span>
          );
        })}
      </div>

      {/* Bottom row: 02, 04, 06 */}
      <div className="grid min-h-[13rem] grid-cols-12">
        {COMMITMENTS.map((item, i) => (i % 2 === 1 ? textBlock(item, i, "bottom") : null))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- mobile */

function AssureRail() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <ol ref={listRef} className="relative space-y-10 pl-16">
      <span aria-hidden className="absolute top-2 bottom-2 left-6 w-px bg-border" />
      <motion.span
        aria-hidden
        className="absolute top-2 bottom-2 left-6 w-px origin-top bg-gradient-to-b from-brand-from to-brand-to"
        style={{ scaleY: fill }}
      />

      {COMMITMENTS.map((item, i) => {
        const Icon = item.icon;
        const stage = STAGES.find((s) => s.from === i);
        return (
          <motion.li
            key={item.step}
            className="relative"
            initial={{ opacity: 0.3, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {stage && (
              <span className="mb-3 block font-mono text-[11px] font-semibold tracking-widest text-foreground uppercase">
                {stage.label}
              </span>
            )}
            <motion.span
              aria-hidden
              className="absolute -left-16 flex size-12 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/35"
              style={{ top: stage ? "1.75rem" : 0 }}
              initial={{ scale: 0.6, opacity: 0.35 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="size-5" />
            </motion.span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-primary uppercase">
              {item.step} · {item.phase}
            </span>
            <h3 className="mt-1.5 text-lg font-bold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
              {item.description}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
              {item.guarantee}
            </p>
          </motion.li>
        );
      })}
    </ol>
  );
}
