"use client";

import { useEffect, useState } from "react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** How long the old side runs alone before the switch is thrown. */
const HOLD_MS = 1900;
/** How long the switch itself is worked. */
const CUT_MS = 1500;
/**
 * How long the new side is held before the figure replays.
 *
 * Deliberately longer than HOLD_MS: the migration has to be seen to finish,
 * and the outcome is what the page is arguing for, so the cycle rests there
 * rather than dividing its time evenly between the two systems.
 */
const AFTER_MS = 4200;

/** Packets on the ribbon. Staggered so the line is never empty. */
const RUNNERS = [0, 0.85, 1.7, 2.55];

type Phase = "before" | "cutting" | "after";

/**
 * The cutover.
 *
 * What a migration buyer is afraid of is not a missed call and not their
 * estate — it is the weekend the phones go down and the numbers do not come
 * back. The source document answers that twice, in the same words both times:
 * maintain communication continuity, minimise disruption.
 *
 * So the figure is the switch being thrown. The system underneath changes
 * hands — the old side goes quiet, the new side takes over — while the line
 * of calls along the bottom keeps running straight through the marker. The
 * whole figure is that the two things happen independently.
 *
 * It cycles, and the weighting is the whole of how it stays honest: the new
 * side is held for AFTER_MS, roughly twice as long as the old side, so at any
 * moment a reader is most likely to find the figure resting on the outcome.
 * It used to play once and stop there, which was safer but left the figure
 * dead for as long as anyone kept reading.
 */
export function CutoverFigure({ from }: { from: string }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const still = useReducedMotion();
  const [played, setPlayed] = useState<Phase>("before");

  useEffect(() => {
    if (!seen || still) return;

    const timers: number[] = [];

    const run = () => {
      timers.push(
        window.setTimeout(() => setPlayed("cutting"), HOLD_MS),
        window.setTimeout(() => setPlayed("after"), HOLD_MS + CUT_MS),
        window.setTimeout(() => {
          setPlayed("before");
          run();
        }, HOLD_MS + CUT_MS + AFTER_MS),
      );
    };

    run();
    return () => timers.forEach(window.clearTimeout);
  }, [seen, still]);

  /* Under reduced motion the figure rests on the outcome rather than on the
     old system, which is the frame that carries the point. */
  const phase: Phase = still ? "after" : played;
  const done = phase === "after";

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-3 sm:gap-5">
        <Side
          label="What you run now"
          name={from}
          live={!done}
          tone="legacy"
        />

        {/* The switch. It is the only thing between the two sides, and it is
            marked once. */}
        <div className="flex flex-col items-center justify-center gap-2 px-1">
          <span
            aria-hidden
            className={cn(
              "h-full w-px border-l border-dashed transition-colors duration-500",
              phase === "cutting" ? "border-primary" : "border-border",
            )}
          />
          <span
            className={cn(
              "text-center text-[11px] leading-tight font-medium whitespace-nowrap transition-colors duration-500",
              phase === "cutting" ? "text-primary" : "text-muted-foreground",
            )}
          >
            cut
            <br />
            over
          </span>
          <span
            aria-hidden
            className={cn(
              "h-full w-px border-l border-dashed transition-colors duration-500",
              phase === "cutting" ? "border-primary" : "border-border",
            )}
          />
        </div>

        <Side label="SipLink" name="Cloud voice" live={done} tone="new" />
      </div>

      {/* The line that does not break. It runs the full width, under both
          sides and through the marker, at the same rate the whole time. */}
      <div className="mt-6">
        <div className="relative h-8 overflow-hidden rounded-full bg-muted">
          {RUNNERS.map((delay) => (
            <span
              key={delay}
              aria-hidden
              className="cutover-run absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
          <span className="absolute inset-y-0 left-4 flex items-center text-[11px] font-medium text-muted-foreground">
            Calls
          </span>
        </div>
      </div>
    </div>
  );
}

function Side({
  label,
  name,
  live,
  tone,
}: {
  label: string;
  name: string;
  live: boolean;
  tone: "legacy" | "new";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-colors duration-700 sm:p-5",
        live
          ? tone === "new"
            ? "border-primary/50 bg-accent"
            : "border-border bg-muted/60"
          : "border-border bg-transparent",
      )}
    >
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 font-medium text-balance transition-colors duration-700",
          live ? "text-foreground" : "text-muted-foreground/60",
        )}
      >
        {name}
      </p>

      <p
        className={cn(
          "mt-3 flex items-center gap-1.5 text-[11px] transition-colors duration-700",
          live ? "text-primary" : "text-muted-foreground/50",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full transition-colors duration-700",
            live ? "bg-primary" : "bg-muted-foreground/40",
          )}
        />
        {live ? "carrying calls" : "retired"}
      </p>
    </div>
  );
}
