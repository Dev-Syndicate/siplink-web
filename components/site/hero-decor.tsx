"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import {
  Headphones,
  MessageCircle,
  MessagesSquare,
  PhoneCall,
  Puzzle,
  ShieldCheck,
  Video,
} from "lucide-react";

import { FlagCA, FlagUS } from "@/components/site/flags";
import { integrations, plans } from "@/lib/site";

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
      <Rings
        rotate={arcSpin}
        className="absolute left-[63%] top-1/2 w-[42rem] -translate-x-1/2 -translate-y-1/2 text-primary/25"
      />

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

/** Concentric dotted rings, centred wherever the laptop sits in that panel. */
function Rings({
  rotate,
  className,
}: {
  rotate: MotionValue<number>;
  className: string;
}) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 400 400"
      style={{ rotate }}
      className={className}
      fill="none"
      stroke="currentColor"
    >
      {[80, 130, 180].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} strokeDasharray="2 10" />
      ))}
      <circle cx="200" cy="200" r="196" strokeDasharray="1 14" opacity="0.7" />
    </motion.svg>
  );
}

/**
 * Panel two: the four channels the platform actually carries, orbiting the
 * laptop as it lands. Wording follows `platformFeatures` — audio and video
 * conferencing, business SMS and internal team chat on one platform.
 */
export function PlatformDecor({
  progress,
  opacity,
}: {
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  const range = [0.24, 0.66];
  const rise = useTransform(progress, range, [34, -34], CLAMP);
  const fall = useTransform(progress, range, [-30, 30], CLAMP);
  const spread = useTransform(progress, range, [26, -26], CLAMP);
  const spin = useTransform(progress, range, [-10, 10], CLAMP);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <Rings
        rotate={spin}
        className="absolute left-1/2 top-[58%] w-[52rem] -translate-x-1/2 -translate-y-1/2 text-primary/20"
      />

      <Card y={rise} x={spread} className="left-[11%] top-[36%]" label="Voice">
        <span className="flex items-center gap-2 text-sm font-medium">
          <PhoneCall className="size-4 text-primary" aria-hidden />
          HD calling
        </span>
      </Card>

      <Card y={fall} x={spread} className="left-[15%] bottom-[20%]" label="Video">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Video className="size-4 text-primary" aria-hidden />
          Conferencing
        </span>
      </Card>

      <Card y={fall} className="right-[11%] top-[36%]" label="Messaging">
        <span className="flex items-center gap-2 text-sm font-medium">
          <MessageCircle className="size-4 text-primary" aria-hidden />
          Business SMS
        </span>
      </Card>

      <Card y={rise} className="right-[15%] bottom-[20%]" label="Collaboration">
        <span className="flex items-center gap-2 text-sm font-medium">
          <MessagesSquare className="size-4 text-primary" aria-hidden />
          Team chat
        </span>
      </Card>
    </motion.div>
  );
}

/**
 * Panel three: the other two tiers, so the featured plan reads as one point on
 * a range rather than the only option. Prices come straight from `plans`.
 *
 * Outlined rather than the frosted cards used earlier — this panel sits on the
 * brand red, where a light fill would punch a hole in it.
 */
export function PlanDecor({
  progress,
  opacity,
}: {
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  const range = [0.64, 1];
  const rise = useTransform(progress, range, [40, -22], CLAMP);
  const fall = useTransform(progress, range, [-34, 20], CLAMP);
  const spin = useTransform(progress, range, [0, 16], CLAMP);

  const others = plans.filter((plan) => !plan.featured);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 hidden text-primary-foreground lg:block"
    >
      <Rings
        rotate={spin}
        className="absolute left-[26%] top-[52%] w-[34rem] -translate-x-1/2 -translate-y-1/2 text-current/20"
      />

      {others.map((plan, i) => (
        <Tag
          key={plan.name}
          y={i === 0 ? rise : fall}
          className={i === 0 ? "left-[5%] top-[26%]" : "left-[33%] bottom-[24%]"}
        >
          <span className="text-[0.65rem] font-medium uppercase tracking-widest opacity-70">
            {plan.name}
          </span>
          <span className="mt-1 block text-lg font-semibold tabular-nums">
            {plan.price}
          </span>
        </Tag>
      ))}

      <Tag y={fall} className="left-[7%] bottom-[16%]">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Headphones className="size-4" aria-hidden />
          24/7 support
        </span>
      </Tag>
    </motion.div>
  );
}

/** Outlined variant for the panels that sit on the brand background. */
function Tag({
  y,
  className,
  children,
}: {
  y: MotionValue<number>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ y }}
      className={`absolute rounded-2xl border border-current/30 bg-current/10 px-4 py-3 ${className}`}
    >
      {children}
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
