"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { Headphones, Puzzle, ShieldCheck } from "lucide-react";

import { FlagCA, FlagUS } from "@/components/site/flags";
import { integrations } from "@/lib/site";

const CLAMP = { clamp: true } as const;

/** Panel one only, so the travel is measured over the range it is visible. */
const RANGE = [0, 0.26];

/**
 * Floating detail around the laptop in the opening hero panel.
 *
 * Every figure on these cards is one SipLink publishes — coverage, support and
 * the integration count all come from `lib/site.ts`. Nothing here is a
 * decorative statistic: an invented latency or uptime readout would look the
 * part and be a fabricated claim.
 *
 * The cards drift at different rates as the page scrolls, which is what
 * separates them from the laptop and reads as depth. They share panel one's
 * opacity so the whole cluster leaves together when the copy does.
 */
export function HeroDecor({
  progress,
  opacity,
}: {
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  // Each card rises by a different amount: nearer things move further.
  const slow = useTransform(progress, RANGE, [0, -34], CLAMP);
  const mid = useTransform(progress, RANGE, [0, -58], CLAMP);
  const fast = useTransform(progress, RANGE, [0, -86], CLAMP);
  const drift = useTransform(progress, RANGE, [0, 26], CLAMP);
  const arcSpin = useTransform(progress, RANGE, [0, 14], CLAMP);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {/* Signal arcs behind the laptop, echoing the hero illustration. */}
      <motion.svg
        aria-hidden
        viewBox="0 0 400 400"
        style={{ rotate: arcSpin }}
        className="absolute left-[63%] top-1/2 w-[42rem] -translate-x-1/2 -translate-y-1/2 text-primary/25"
        fill="none"
        stroke="currentColor"
      >
        {[80, 130, 180].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} strokeDasharray="2 10" />
        ))}
        <circle cx="200" cy="200" r="196" strokeDasharray="1 14" opacity="0.7" />
      </motion.svg>

      <Card
        y={fast}
        x={drift}
        className="left-[48%] top-[13%]"
        label="Coverage"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <FlagUS className="h-3.5 w-auto rounded-[2px]" />
          <FlagCA className="h-3.5 w-auto rounded-[2px]" />
          Unlimited US &amp; Canada
        </span>
      </Card>

      <Card y={mid} className="right-[5%] top-[28%]" label="Certified">
        <span className="flex items-center gap-2 text-sm font-medium">
          <ShieldCheck className="size-4 text-primary" aria-hidden />
          HIPAA &amp; DoT
        </span>
      </Card>

      <Card y={slow} className="left-[50%] bottom-[13%]" label="Support">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Headphones className="size-4 text-primary" aria-hidden />
          24/7, every day
        </span>
      </Card>

      <Card y={fast} className="right-[7%] bottom-[20%]" label="Integrations">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Puzzle className="size-4 text-primary" aria-hidden />
          {integrations.length} platforms
        </span>
      </Card>
    </motion.div>
  );
}

function Card({
  y,
  x,
  label,
  className,
  children,
}: {
  y: MotionValue<number>;
  x?: MotionValue<number>;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ y, x }}
      className={`absolute rounded-2xl border border-border/70 bg-background/70 px-4 py-3 shadow-lg backdrop-blur-md ${className}`}
    >
      <p className="text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="mt-1.5">{children}</div>
    </motion.div>
  );
}
