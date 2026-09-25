"use client";

import { useEffect, useState } from "react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * The drawing vocabulary the solution schematics are built from.
 *
 * Lifted out of migration-figures so the use-case figures draw in the same
 * language rather than a near-copy of it: one grid field, one chassis, one
 * kind of live wire, one caption style. A second set that merely resembled
 * this one is how two groups of pages start looking subtly unlike each other
 * for no reason anybody chose.
 *
 * It follows ProductIllustration: inline SVG from theme tokens, a faint grid
 * faded at the edges, hand-drawn chassis, layered strokes, and a glowing path
 * wherever something is actually moving.
 */

/**
 * Extra beats the finished state is held before the sequence starts again.
 *
 * The loop is what keeps a figure alive, but a figure that snaps back to its
 * first frame the instant it finishes never lets anyone read the outcome, and
 * on these pages the outcome is the argument. Three beats of rest against one
 * beat per step means the resolved state is what the figure is showing most
 * of the time, and the restart reads as a replay rather than a flicker.
 */
const HOLD_BEATS = 2;

/**
 * How soon the first beat lands, whatever pace the figure runs at afterwards.
 *
 * `setInterval` does not fire until a whole interval has elapsed, so every
 * figure on these pages held its opening frame for its entire beat length
 * before moving — a second at best, 2.3s on the cutover. A drawing that sits
 * perfectly still that long does not read as one about to move; it reads as
 * one that has not finished loading, which is exactly what it was mistaken
 * for.
 *
 * The pace between beats is each figure's own business and is left alone.
 * How long it waits before admitting it is animated at all is not.
 */
const LEAD = 450;

/**
 * Steps a phase machine forward on a timer, once the figure is on screen, and
 * keeps cycling.
 *
 * This used to latch — run the sequence once and stop — so the explanation
 * was stated and then left standing. That left every figure on the page inert
 * a few seconds after it was reached, which is the opposite of what a diagram
 * of a live system should look like, so it now repeats for as long as the
 * figure is mounted.
 *
 * One interval rather than N timeouts, because a loop built from timeouts
 * drifts and has to be torn down and rebuilt every cycle. The single
 * exception is the first step, which comes off a short lead instead — see
 * LEAD above.
 */
export function usePhases(count: number, ms: number) {
  const [ref, seen] = useInView<SVGSVGElement>();
  const still = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!seen || still) return;

    const beats = count + HOLD_BEATS;
    let beat = 0;
    let interval = 0;

    const advance = () => {
      beat = (beat + 1) % beats;
      /* Beats past the last phase are the hold; they sit on it. */
      setPhase(Math.min(beat, count - 1));
    };

    /* The first step is pulled onto a lead so the figure moves promptly;
       everything after it, the hold and the restart included, keeps the
       figure's own interval. */
    const lead = window.setTimeout(() => {
      advance();
      interval = window.setInterval(advance, ms);
    }, LEAD);

    return () => {
      window.clearTimeout(lead);
      window.clearInterval(interval);
    };
  }, [seen, still, count, ms]);

  return { ref, phase: still ? count - 1 : phase };
}

/**
 * Shared defs. `uid` keeps the ids unique, because two of these can appear on
 * one page and duplicate ids would have the second one masking with the
 * first's gradient.
 */
export function Defs({ uid, w, h }: { uid: string; w: number; h: number }) {
  return (
    <defs>
      <pattern
        id={`mg-${uid}`}
        width="22"
        height="22"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M22 0H0V22"
          fill="none"
          className="stroke-foreground/[0.055]"
          strokeWidth="1"
        />
      </pattern>

      <radialGradient id={`mf-${uid}`} cx="50%" cy="50%" r="62%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>

      <mask id={`mm-${uid}`}>
        <rect width={w} height={h} fill={`url(#mf-${uid})`} />
      </mask>

      <filter id={`mgl-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.5" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/** The grid field, faded at the edges so the drawing sits in space. */
export function Field({ uid, w, h }: { uid: string; w: number; h: number }) {
  return (
    <rect
      width={w}
      height={h}
      fill={`url(#mg-${uid})`}
      mask={`url(#mm-${uid})`}
    />
  );
}

/** A device chassis: outline, header rule, status dot and a mono label. */
export function Box({
  x,
  y,
  w,
  h,
  label,
  live = false,
  dashed = false,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  live?: boolean;
  dashed?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <g className="transition-opacity duration-700">
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="9"
        className={cn(
          "transition-all duration-700",
          dashed ? "fill-transparent" : "fill-background",
          live ? "stroke-primary" : "stroke-border",
        )}
        strokeWidth={live ? 1.75 : 1.25}
        strokeDasharray={dashed ? "4 4" : undefined}
      />
      <path
        d={`M${x} ${y + 21} H${x + w}`}
        className={cn(
          "transition-colors duration-700",
          live ? "stroke-primary/40" : "stroke-border",
        )}
        strokeWidth="1.25"
      />
      <circle
        cx={x + 12}
        cy={y + 10.5}
        r="2.75"
        className={cn(
          "transition-colors duration-700",
          live ? "fill-primary" : "fill-muted-foreground/35",
        )}
      />
      <text
        x={x + 22}
        y={y + 14.5}
        className={cn(
          "text-[8.5px] font-medium tracking-wide [font-family:var(--font-mono)] transition-colors duration-700",
          live ? "fill-primary" : "fill-muted-foreground/75",
        )}
      >
        {label}
      </text>
      {children}
    </g>
  );
}

/** A caption inside the drawing, in the site's mono. */
export function Note({
  x,
  y,
  children,
  tone = "muted",
  anchor = "start",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  tone?: "muted" | "primary" | "faint";
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={cn(
        "text-[8px] tracking-wide [font-family:var(--font-mono)] transition-colors duration-700",
        tone === "primary"
          ? "fill-primary"
          : tone === "faint"
            ? "fill-muted-foreground/45"
            : "fill-muted-foreground",
      )}
    >
      {children}
    </text>
  );
}

/** A live wire: a dim run with a lit packet travelling it. */
export function Wire({
  d,
  live,
  delay = 0,
  uid,
}: {
  d: string;
  live: boolean;
  delay?: number;
  uid: string;
}) {
  return (
    <>
      <path
        d={d}
        fill="none"
        strokeWidth="1.5"
        className={cn(
          "transition-colors duration-700",
          live ? "stroke-primary/35" : "stroke-border",
        )}
      />
      {live ? (
        <path
          d={d}
          fill="none"
          pathLength={100}
          strokeWidth="2.5"
          strokeLinecap="round"
          filter={`url(#mgl-${uid})`}
          className="flow-path stroke-primary"
          style={{ animationDelay: `${delay}s` }}
        />
      ) : null}
    </>
  );
}

export const W = 560;
export const H = 340;

