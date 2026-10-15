"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * The parts the story scenes on the company pages are built from: a stage on
 * a 160 × 90 grid sized in container units (so a scene scales as a picture
 * does), glass panels, wires with signal flowing along them, and a beat
 * clock that only runs while the scene is on screen.
 *
 * Below `lg` a scene's text would be too small to read, so each scene also
 * tells its story as a plain list — `MobileSteps`.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;


/** Place a box on the 160 × 90 stage. */
export function at(x: number, y: number, w: number) {
  return { left: `${(x / 160) * 100}%`, top: `${(y / 90) * 100}%`, width: `${(w / 160) * 100}%` };
}

export function useBeat(beats: number, ms: number) {
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

export function Stage({
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
export function Wires({ wires }: { wires: { d: string; lit: boolean }[] }) {
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

export function Panel({
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

export function Chip({ label, tone = "quiet" }: { label: string; tone?: "quiet" | "on" | "off" | "bad" }) {
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

export function Pill({ icon: Icon, label, style }: { icon: LucideIcon; label: string; style: React.CSSProperties }) {
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

export function CornerTile({ icon: Icon, style, still, delay = 0 }: { icon: LucideIcon; style: React.CSSProperties; still: boolean; delay?: number }) {
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

export function SceneSection({
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

export function MobileSteps({ steps }: { steps: { icon: LucideIcon; title: string; body: string }[] }) {
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
