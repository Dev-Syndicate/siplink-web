"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PhoneMock } from "@/components/phone-mock";

/**
 * Mirrors the reference hero: oversized display type, a saturated circle
 * cropped by the viewport, and the product object layered *in front of* the
 * headline so the two planes overlap.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 28 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative overflow-hidden pt-28 pb-0 sm:pt-32">
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.h1
          {...rise(0.05)}
          className="text-display relative z-10 text-center text-[clamp(2.75rem,10.5vw,9rem)] text-foreground"
        >
          One Platform.
          <br />
          Total Control.
        </motion.h1>

        <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          {/* Supporting copy */}
          <motion.p
            {...rise(0.25)}
            className="z-20 order-2 max-w-xs text-center text-base text-muted-foreground lg:order-none lg:mb-24 lg:text-left"
          >
            Calls, video, messaging and analytics on one cloud platform. Built
            on SIP, reachable from any device, anywhere.
          </motion.p>

          {/* Hero object + field colour share one cell so they stay aligned at
              every breakpoint. The cell is `relative` with z-index auto, so it
              creates no stacking context and the circle (z-0) can sit behind
              the headline (z-10) while the phone (z-30) sits in front of it. */}
          <div className="relative order-1 mx-auto w-[min(60vw,15rem)] lg:order-none lg:-mt-[7vw] lg:w-[min(22vw,17rem)]">
            <motion.div
              aria-hidden
              initial={reduce ? undefined : { scale: 0.72, opacity: 0 }}
              animate={reduce ? undefined : { scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute top-[52%] left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="flex size-[min(86vw,32rem)] items-center justify-center rounded-full border border-primary/20">
                <div className="size-[91%] rounded-full bg-primary" />
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 60, rotate: 12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0, rotate: 6 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30"
            >
              <PhoneMock screen="call" priority />
            </motion.div>
          </div>

          {/* Price seal + CTA */}
          <motion.div
            {...rise(0.35)}
            className="z-20 order-3 flex flex-col items-center gap-6 lg:order-none lg:mb-24 lg:items-end"
          >
            <PriceSeal />
            <Button asChild variant="brand" size="xl">
              <a href="#pricing">
                See pricing
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Starburst seal, echoing the reference's price badge.
   $18.95 is SipLink's own published entry price — reconfirm before launch. */
function PriceSeal() {
  const reduce = useReducedMotion();

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
