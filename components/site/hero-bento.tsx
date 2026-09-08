"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play, ShieldCheck, X } from "lucide-react";

import { HeroIllustration } from "@/components/site/hero-illustration";
import { PricingScene, VideoScene } from "@/components/site/hero-scenes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { explainerVideo, plans } from "@/lib/site";

type TileId = "pricing" | "video";

/** Kept inline rather than in a class so motion can correct it mid-morph. */
const RADIUS = 24;

/**
 * The homepage hero: a three-tile bento where the two small tiles expand to
 * fill the whole hero.
 *
 * The expand is a shared-element transition — the collapsed tile unmounts and
 * an overlay mounts with the same `layoutId`, and motion interpolates between
 * the two boxes. Only one element per `layoutId` may be mounted at a time, so
 * the collapsed tile is skipped while its panel is open; the grid cell stays
 * behind it to hold the row height.
 *
 * Pointer-capable devices expand on hover. Touch devices have no hover, so the
 * tiles are also buttons: tap expands, and the panel carries a close control.
 */
export function HeroBento() {
  const [active, setActive] = useState<TileId | null>(null);
  const canHover = useRef(false);
  const reduced = useReducedMotion();

  /**
   * Whether the open panel was activated deliberately (click, tap, Enter)
   * rather than by hovering over it. Only a deliberate open moves focus into
   * the panel — hovering must never steal focus.
   */
  const activated = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusTo = useRef<TileId | null>(null);

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  // Keep the keyboard somewhere sensible: into the panel on a deliberate
  // open, back onto the tile once it closes.
  useEffect(() => {
    if (active && activated.current) {
      closeRef.current?.focus();
      returnFocusTo.current = active;
      return;
    }
    if (!active && returnFocusTo.current) {
      const id = returnFocusTo.current;
      returnFocusTo.current = null;
      document
        .querySelector<HTMLButtonElement>(`[data-hero-tile="${id}"]`)
        ?.focus();
    }
  }, [active]);

  const tileProps = (id: TileId) => ({
    "data-hero-tile": id,
    onMouseEnter: () => {
      if (!canHover.current) return;
      activated.current = false;
      setActive(id);
    },
    onClick: () => {
      activated.current = true;
      setActive(id);
    },
  });

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-12">
        <div
          className="relative grid gap-4 lg:min-h-[36rem] lg:grid-cols-[1.62fr_1fr]"
          // Guarded: after a tap, Chrome fires a synthetic mouseleave here as
          // the tile unmounts under the finger, which would slam the panel
          // shut the instant it opened. Touch closes via the button or Escape.
          onMouseLeave={() => {
            if (canHover.current) close();
          }}
        >
          {/* Headline tile */}
          <div
            style={{ borderRadius: RADIUS }}
            className="relative flex min-h-[30rem] flex-col justify-center overflow-hidden bg-muted p-8 sm:p-12 lg:min-h-0"
          >
            <div className="relative z-10 max-w-md">
              <Badge variant="secondary" className="mb-6 rounded-full bg-background">
                <ShieldCheck className="size-3.5 text-primary" aria-hidden />
                HIPAA compliant &amp; DoT certified
              </Badge>

              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:leading-[1.06]">
                Enterprise-grade{" "}
                <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                  voice solutions
                </span>{" "}
                for growing businesses.
              </h1>

              <p className="mt-6 max-w-sm text-pretty text-muted-foreground">
                Reliable, scalable and secure cloud communications designed to
                elevate your business operations — without the enterprise price
                tag.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">Book a demo</Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="group">
                  <Link href="/solutions">
                    Explore solutions
                    <ArrowRight
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sits in the bottom-right corner and bleeds off it, as in the
                reference. Sized to clear the text column rather than overlap
                it — the widths here and on the text block are a pair. */}
            <HeroIllustration className="pointer-events-none absolute -right-8 -bottom-8 hidden w-64 text-foreground/75 sm:block lg:w-[20rem] xl:w-[23rem]" />
          </div>

          {/* Small tiles */}
          <div className="grid gap-4 lg:grid-rows-[1.12fr_1fr]">
            <div className="relative min-h-[16rem]">
              {active !== "pricing" && (
                <motion.button
                  type="button"
                  layoutId="tile-pricing"
                  style={{ borderRadius: RADIUS }}
                  aria-label={`Pricing: unlimited US and Canada calling from ${plans[0].price} per user — expand`}
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-primary p-7 text-left text-primary-foreground"
                  {...tileProps("pricing")}
                >
                  <motion.div layout="position">
                    <h2 className="text-2xl font-semibold text-balance">
                      Unlimited US &amp; Canada calling
                    </h2>
                  </motion.div>

                  <PriceChart />

                  <motion.span
                    layout="position"
                    className="absolute right-6 top-1/2 rounded-full bg-background px-3 py-1 text-sm font-semibold text-foreground shadow-sm"
                  >
                    {plans[0].price}
                  </motion.span>
                </motion.button>
              )}
            </div>

            <div className="relative min-h-[13rem]">
              {active !== "video" && (
                <motion.button
                  type="button"
                  layoutId="tile-video"
                  style={{ borderRadius: RADIUS }}
                  aria-label="Explainer video: see how SipLink works — expand"
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-foreground p-7 text-left text-background"
                  {...tileProps("video")}
                >
                  <motion.h2
                    layout="position"
                    className="text-2xl font-semibold text-balance"
                  >
                    See how SipLink works
                  </motion.h2>

                  <motion.div layout="position" className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Play className="ml-0.5 size-4 fill-current" aria-hidden />
                    </span>
                    <span className="rounded-full border border-current/25 px-3 py-1 text-xs font-medium">
                      {explainerVideo.title}
                    </span>
                  </motion.div>
                </motion.button>
              )}
            </div>
          </div>

          {/* Expanded panel */}
          <AnimatePresence>
            {active && (
              <motion.div
                key={active}
                layoutId={`tile-${active}`}
                style={{ borderRadius: RADIUS }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 260, damping: 32 }
                }
                className={cn(
                  "absolute inset-0 z-20 overflow-hidden",
                  active === "pricing"
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground text-background"
                )}
              >
                {active === "pricing" ? <PricingScene /> : <VideoScene />}

                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="absolute right-5 top-5 z-20 flex size-9 items-center justify-center rounded-full border border-current/25 transition-colors hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                >
                  <X className="size-4" aria-hidden />
                  <span className="sr-only">Close</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/**
 * The rising line on the collapsed pricing tile. Decorative — it carries no
 * figures, so there is nothing here to mistake for a published statistic.
 */
function PriceChart() {
  return (
    <svg
      viewBox="0 0 240 110"
      className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="M8 96 L64 62 L120 74 L176 34 L232 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      {[
        [64, 62],
        [120, 74],
        [176, 34],
      ].map(([cx, cy]) => (
        <g key={`${cx}`}>
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={110}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.35"
          />
          <circle cx={cx} cy={cy} r="3.5" fill="currentColor" />
        </g>
      ))}
      <circle cx="232" cy="12" r="9" fill="currentColor" opacity="0.25" />
      <circle cx="232" cy="12" r="4.5" fill="currentColor" />
    </svg>
  );
}
