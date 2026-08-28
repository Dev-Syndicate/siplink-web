"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Headset,
  MessageCircle,
  Volume2,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActivityScreen, CallScreen, PhoneFrame } from "@/components/phone-mock";
import { cn } from "@/lib/utils";

/* Explicit cells so the two left and two right callouts line up as rows.
   Auto-placement pushes the right-hand pair into rows 2 and 3. */
const placement = [
  "lg:col-start-1 lg:row-start-1 lg:text-right",
  "lg:col-start-1 lg:row-start-2 lg:text-right",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
];

/**
 * Hero and the section after it share one scroll container so the phone is a
 * single persistent element: it rotates upright, shrinks and swaps its screen
 * as you scroll, instead of one section ending and another starting.
 *
 * Every animated value is written as a CSS custom property and consumed by an
 * arbitrary-property class. Two reasons:
 *   1. motion routes a plain `opacity` style through the accelerated WAAPI
 *      path, which then runs its own 1s animation and overrides the
 *      scroll-linked value (see components/sections/platform.tsx).
 *   2. rotate/scale/translate all have to compose into one `transform`, and
 *      the travel distances differ per breakpoint — expressing them as
 *      `--shrink` / `--dy` lets Tailwind vary them responsively.
 */

const benefits = [
  {
    icon: Volume2,
    title: "Crystal-Clear Every Time",
    body: "Enterprise-grade voice and HD video with zero compromise.",
  },
  {
    icon: Wallet,
    title: "Cut Costs. Not Quality",
    body: "No expensive hardware or maintenance. Scale effortlessly.",
  },
  {
    icon: Headset,
    title: "Support That Never Sleeps",
    body: "Our experts are available 24×7, whenever you need help.",
  },
  {
    icon: MessageCircle,
    title: "Reach Us Your Way",
    body: "Chat, call or email — we support across every channel.",
  },
];

export function HeroJourney() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 0 → 1 across the handoff. Drives the phone's rotation, scale and rise.
  const journey = useTransform(scrollYProgress, [0.26, 0.60], [0, 1]);
  const heroFade = useTransform(scrollYProgress, [0.24, 0.44], [1, 0]);
  const stageFade = useTransform(scrollYProgress, [0.46, 0.66], [0, 1]);
  const screenFade = useTransform(scrollYProgress, [0.34, 0.56], [0, 1]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ---------- Stage 1: hero ---------- */}
        <motion.div
          style={{ "--o": heroFade } as CSSProperties}
          className="absolute inset-0 z-10 [opacity:var(--o,1)]"
        >
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-5 pt-24 sm:px-8 sm:pt-28">
            <h1 className="text-display animate-in slide-in-from-bottom-4 text-center text-[clamp(2.75rem,10.5vw,9rem)] text-foreground duration-700">
              One Platform.
              <br />
              Total Control.
            </h1>

            <div className="mt-auto flex items-end justify-between gap-6 pb-10 sm:pb-16">
              <p className="max-w-xs text-base text-muted-foreground max-lg:hidden">
                Calls, video, messaging and analytics on one cloud platform.
                Built on SIP, reachable from any device, anywhere.
              </p>
              <div className="flex flex-1 flex-col items-center gap-5 lg:flex-none lg:items-end">
                <PriceSeal reduce={reduce} />
                <Button asChild variant="brand" size="xl">
                  <a href="#pricing">
                    See pricing
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------- Stage 2: benefits, revealed as the phone settles ---------- */}
        <motion.div
          style={{ "--o": stageFade } as CSSProperties}
          className="absolute inset-0 z-10 [opacity:var(--o,0)]"
        >
          <div className="relative mx-auto h-full w-full max-w-7xl px-5 sm:px-8">
            {/* Heading pinned to the top: the phone settles at the vertical
                centre, so anything centred here would sit behind it. */}
            <h2 className="text-display pt-20 text-center text-[clamp(1.75rem,4.5vw,3.25rem)] text-foreground lg:pt-24">
              Why teams switch.
            </h2>

            {/* Below lg the grid is pinned to the bottom, clear of the risen
                phone at any viewport height. On lg it centres and the empty
                middle column is where the travelling phone lands. */}
            <div className="absolute inset-x-5 bottom-8 sm:inset-x-8 lg:inset-x-0 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_19rem_1fr] lg:gap-x-10 lg:gap-y-12">
                {benefits.map((b, i) => (
                  <div
                    key={b.title}
                    className={cn(
                      "rounded-2xl border border-border bg-background/85 p-4 backdrop-blur-sm lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none",
                      placement[i]
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2.5",
                        i < 2 && "lg:flex-row-reverse"
                      )}
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-tint">
                        <b.icon className="size-4 text-brand-deep" />
                      </span>
                      <h3 className="text-sm font-semibold text-foreground sm:text-base">
                        {b.title}
                      </h3>
                    </div>
                    <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------- Persistent layer: circle + phone ---------- */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* Field colour, behind the headline (z-0) */}
          <motion.div
            aria-hidden
            style={{ "--p": journey } as CSSProperties}
            className="absolute z-0 [--y0:0vh] [--y1:-10vh] lg:[--y0:7vh] lg:[--y1:0vh] [transform:translateY(calc(var(--y0)+var(--p,0)*(var(--y1)-var(--y0))))_scale(calc(1-var(--p,0)*0.34))]"
          >
            <div className="flex size-[min(86vw,32rem)] items-center justify-center rounded-full border border-primary/20">
              <div className="size-[91%] rounded-full bg-primary" />
            </div>
          </motion.div>

          {/* The phone. z-30 puts it in front of the headline (z-10). */}
          <motion.div
            style={{ "--p": journey } as CSSProperties}
            className="absolute z-30 w-[min(60vw,15rem)] [--shrink:0.5] [--spin:6deg] [--y0:0vh] [--y1:-10vh] lg:w-[min(22vw,17rem)] lg:[--shrink:0.16] lg:[--y0:7vh] lg:[--y1:0vh] [transform:translateY(calc(var(--y0)+var(--p,0)*(var(--y1)-var(--y0))))_rotate(calc(var(--spin)*(1-var(--p,0))))_scale(calc(1-var(--p,0)*var(--shrink)))] motion-reduce:[--shrink:0] motion-reduce:[--spin:0deg]"
          >
            <PhoneFrame>
              <CallScreen />
              {/* Screen swap happens mid-journey, so the device that arrives in
                  stage 2 is showing activity rather than a live call. */}
              <motion.div
                style={{ "--o": screenFade } as CSSProperties}
                className="absolute inset-0 [opacity:var(--o,0)]"
              >
                <ActivityScreen />
              </motion.div>
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Starburst seal, echoing the reference's price badge.
   $18.95 is SipLink's own published entry price — reconfirm before launch. */
function PriceSeal({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      className="relative flex size-24 items-center justify-center sm:size-28"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
        <path
          d={starburstPath(50, 50, 48, 41, 14)}
          className="fill-foreground"
        />
      </svg>
      <motion.div
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        className="relative text-center leading-tight text-background"
      >
        <span className="block text-[10px] font-medium tracking-wide uppercase opacity-70">
          From
        </span>
        <span className="block text-base font-bold">$18.95</span>
        <span className="block text-[9px] font-medium opacity-70">
          per user
        </span>
      </motion.div>
    </motion.div>
  );
}

function starburstPath(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points: number
) {
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(2)},${(
      cy +
      r * Math.sin(a)
    ).toFixed(2)}`;
  }
  return `${d}Z`;
}
