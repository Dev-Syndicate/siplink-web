"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { ArrowRight, Headphones, Play, ShieldCheck } from "lucide-react";

import { FlagCA, FlagUS } from "@/components/site/flags";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  certifications,
  explainerVideo,
  integrations,
  plans,
  solutions,
} from "@/lib/site";

/**
 * Number that counts up when its panel opens.
 *
 * Every figure passed in here is one SipLink actually publishes — see the
 * call sites. Do not wire this to uptime, customer counts or team size:
 * those are unverified or contradictory across sources, and animating them
 * would present a guess as a fact. See details-content.md sections 21 and 22.
 */
function CountUp({
  value,
  decimals = 0,
  prefix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
}) {
  const reduced = useReducedMotion();
  const raw = useMotionValue(reduced ? value : 0);
  const text = useTransform(raw, (v) => `${prefix}${v.toFixed(decimals)}`);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(raw, value, { duration: 1.1, ease: "easeOut" });
    return () => controls.stop();
  }, [raw, value, reduced]);

  return <motion.span>{text}</motion.span>;
}

/** Outlined card that floats in from the panel edge, like the reference. */
function FloatingCard({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "absolute hidden rounded-2xl border border-current/25 px-4 py-3 xl:block",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

const cardLabel = "text-[0.7rem] font-medium uppercase tracking-wider opacity-70";
const cardValue = "text-2xl font-semibold tabular-nums";

/** Expanded state of the pricing tile. */
export function PricingScene() {
  const price = Number(plans[0].price.replace(/[^0-9.]/g, ""));

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden p-8 lg:p-12">
      {/* Centre column */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="relative z-10 max-w-md text-center"
      >
        <p className="text-sm font-medium uppercase tracking-wider opacity-80">
          Plans start at
        </p>
        <p className="mt-3 text-6xl font-semibold tracking-tight tabular-nums sm:text-7xl">
          <CountUp value={price} decimals={2} prefix="$" />
        </p>
        <p className="mt-2 text-sm opacity-80">per user, per month</p>
        <h2 className="mt-6 text-2xl font-semibold text-balance sm:text-3xl">
          Unlimited calling across the US and Canada
        </h2>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="mt-7 border-current/40 bg-transparent text-current hover:bg-current/10 hover:text-current"
        >
          <Link href="/pricing">
            Compare all plans
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </motion.div>

      {/* Floating stat cards. Every value below is published by SipLink. */}
      <FloatingCard delay={0.16} className="left-[4%] top-[14%] w-44">
        <p className={cardLabel}>Plan tiers</p>
        <p className={cardValue}>
          <CountUp value={plans.length} />
        </p>
        <div className="mt-2 flex h-8 items-end gap-1.5" aria-hidden>
          {plans.map((plan, i) => (
            <motion.span
              key={plan.name}
              initial={{ height: 4 }}
              animate={{ height: 12 + i * 8 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className="block w-4 rounded-sm bg-current/40"
            />
          ))}
        </div>
      </FloatingCard>

      <FloatingCard delay={0.22} className="bottom-[16%] left-[7%] w-52">
        <p className={cardLabel}>Coverage</p>
        <ul className="mt-2 space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <FlagUS className="h-3.5 w-auto rounded-[2px]" />
            Unlimited USA
          </li>
          <li className="flex items-center gap-2">
            <FlagCA className="h-3.5 w-auto rounded-[2px]" />
            Unlimited Canada
          </li>
        </ul>
      </FloatingCard>

      <FloatingCard delay={0.28} className="right-[5%] top-[12%] w-48">
        <p className={cardLabel}>Integrations</p>
        <p className={cardValue}>
          <CountUp value={integrations.length} />
        </p>
        <p className="mt-1 text-xs opacity-75">
          {integrations.slice(0, 3).join(" · ")}
        </p>
      </FloatingCard>

      <FloatingCard delay={0.34} className="right-[8%] top-[46%] w-44">
        <p className={cardLabel}>Minimum</p>
        <p className={cardValue}>
          <CountUp value={10} /> lines
        </p>
      </FloatingCard>

      <FloatingCard delay={0.4} className="bottom-[13%] right-[6%] w-52">
        <p className={cardLabel}>Certified</p>
        <ul className="mt-2 space-y-1 text-xs">
          {certifications.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </FloatingCard>

      <FloatingCard delay={0.46} className="left-[12%] top-[52%] w-40">
        <p className={cardLabel}>Support</p>
        <p className="mt-1 flex items-center gap-2 text-xl font-semibold">
          <Headphones className="size-5" aria-hidden />
          24/7
        </p>
      </FloatingCard>
    </div>
  );
}

/** Chips that ride the orbit rings, matching the reference dark panel. */
const ORBIT = solutions.map((item) => item.title);

/** Expanded state of the explainer-video tile. */
export function VideoScene() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="size-full overflow-hidden">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${explainerVideo.id}?autoplay=1`}
          title={explainerVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="size-full"
        />
      </div>
    );
  }

  const spin = reduced
    ? undefined
    : {
        rotate: 360,
        transition: {
          duration: 48,
          repeat: Infinity,
          ease: "linear" as const,
        },
      };
  const counterSpin = reduced
    ? undefined
    : {
        rotate: -360,
        transition: {
          duration: 48,
          repeat: Infinity,
          ease: "linear" as const,
        },
      };

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden p-8">
      {/* Orbit rings */}
      {/* Sized off the panel height, not its width, so the chips on the ring
          stay inside the panel instead of being clipped top and bottom. */}
      <motion.div
        aria-hidden
        animate={spin}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[150%] -translate-x-1/2 -translate-y-1/2"
      >
        {[100, 78, 56, 34].map((size) => (
          <span
            key={size}
            style={{ width: `${size}%`, height: `${size}%` }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current/15"
          />
        ))}

        {/* One chip per solution, spaced evenly around the rings. */}
        {ORBIT.map((label, i) => {
          const angle = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 4;
          return (
            <span
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                // Percentages of the ring container, so the chips actually sit
                // on the orbit. A percentage `translate` would resolve against
                // the chip instead and stack them all in the middle.
                //
                // The radius is capped by the panel's half-height, not its
                // width: any wider and chips are clipped by the top and bottom
                // edges each time the orbit carries them past 12 and 6 o'clock.
                left: `${(50 + Math.cos(angle) * 30).toFixed(2)}%`,
                top: `${(50 + Math.sin(angle) * 30).toFixed(2)}%`,
              }}
            >
              <motion.span
                animate={counterSpin}
                className="block whitespace-nowrap rounded-full border border-current/20 bg-current/10 px-3 py-1.5 text-xs font-medium"
              >
                {label}
              </motion.span>
            </span>
          );
        })}
      </motion.div>

      {/* Centre */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        // Narrow enough that the orbiting chips clear the title as they pass
        // through 3 and 9 o'clock.
        className="relative z-10 max-w-[18rem] text-center"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          See how SipLink works
        </h2>
        <p className="mt-3 text-sm opacity-75">{explainerVideo.title}</p>
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group mt-8 inline-flex size-16 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          <Play className="ml-0.5 size-6 fill-current" aria-hidden />
          <span className="sr-only">Play the SipLink explainer video</span>
        </button>
      </motion.div>
    </div>
  );
}
