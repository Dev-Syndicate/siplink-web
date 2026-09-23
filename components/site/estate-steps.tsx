"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { estateSteps } from "@/lib/business-size";
import { cn } from "@/lib/utils";

/** How long each step is worked before the next one starts. */
const STEP_MS = 2400;

/**
 * One crossing of the wire, matching `.estate-call` in globals.css. Kept here
 * too because the packets are spaced by dividing it, and a stagger that does
 * not divide the cycle exactly leaves a visible gap once per lap.
 */
const CYCLE_MS = 6600;

/**
 * Where the calls sit when nothing is moving. Spread rather than even, so a
 * still line still reads as traffic that happens to be caught mid-flow.
 */
const CALLS = [6, 41, 73] as const;

/**
 * The estate being modernised, a step at a time.
 *
 * What an enterprise stands to lose is not a call, it is the weekend — the
 * big-bang cutover where everything moves at once and something does not come
 * back. The source copy answers that with one word, gradually, and the four
 * verbs in the enterprise `gain` copy are already a sequence. So this is that
 * sequence executing against an estate that is still carrying traffic.
 *
 * The line is the content, not decoration: it is what says the estate is
 * running while the list advances. It is deliberately slow and thin, so the
 * thing that draws the eye is a step ticking to done rather than the movement
 * itself.
 *
 * It carries discrete calls rather than a fill that sweeps across, because a
 * part-width bar travelling a track is an indeterminate progress bar however
 * it is styled — it says this panel is loading, where the claim is that the
 * estate is still running.
 *
 * Nothing here claims zero downtime or a service level. The line says calls
 * are moving and the caption says gradually, which is exactly as far as the
 * source documents go.
 *
 * Loops, unlike the estate panel further down the page which plays once. This
 * is the first thing on the page and a reader arriving mid-cycle still sees a
 * sequence advancing; that one is a hinge between two headings and needs its
 * first beat to have been seen.
 */
export function EstateSteps() {
  const [step, setStep] = useState(0);
  const still = useReducedMotion();

  useEffect(() => {
    if (still) return;

    const id = window.setTimeout(
      () => setStep((current) => (current + 1) % (estateSteps.length + 1)),
      STEP_MS,
    );

    return () => window.clearTimeout(id);
  }, [step, still]);

  // A step past the last means every one is done, which is the state anyone
  // who asked for less motion gets outright.
  const active = still ? estateSteps.length : step;

  return (
    <div className="overflow-hidden rounded-2xl bg-foreground text-background">
      <div className="flex items-center justify-between gap-4 border-b border-background/10 px-5 py-4">
        <p className="font-medium">Modernising, in place</p>
        <span className="flex items-center gap-2 text-xs text-background/55">
          <span
            aria-hidden
            className={cn(
              "size-1.5 rounded-full bg-primary",
              still ? null : "estate-pulse",
            )}
          />
          carrying calls
        </span>
      </div>

      {/* The estate, still running: one line carrying several calls.
          Packets rather than a fill sweeping the track — a part-width bar
          crossing a rail is an indeterminate progress bar, and it reads as
          the panel loading rather than as the estate running. */}
      <div aria-hidden className="px-5 pt-6 pb-5">
        <div className="relative h-1.5 overflow-hidden rounded-full bg-background/10">
          {CALLS.map((offset, index) => (
            <span
              key={offset}
              className={cn(
                "absolute inset-y-0 w-[9%] rounded-full bg-primary/70",
                still ? null : "estate-call",
              )}
              // Moving, every packet starts at the left edge and the delay
              // spaces them out along the wire. Standing still there is no
              // delay to space them, so they take up their positions
              // directly — three calls in progress rather than three
              // stacked on the same pixel.
              style={
                still
                  ? { left: `${offset}%` }
                  : { animationDelay: `${index * -(CYCLE_MS / CALLS.length)}ms` }
              }
            />
          ))}
        </div>
      </div>

      <ol className="space-y-px px-5 pb-2">
        {estateSteps.map((item, index) => {
          const done = index < active;
          const working = index === active;

          return (
            <li
              key={item.verb}
              className={cn(
                "flex items-start gap-3 rounded-lg px-3 py-3 transition-colors duration-300",
                working ? "bg-background/8" : "bg-transparent",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : working
                      ? "border-primary text-primary"
                      : "border-background/25 text-background/25",
                )}
              >
                {done ? (
                  <Check className="size-3" aria-hidden />
                ) : (
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-current"
                  />
                )}
              </span>

              <span className="min-w-0">
                <span
                  className={cn(
                    "block font-medium transition-opacity duration-300",
                    done || working ? "opacity-100" : "opacity-45",
                  )}
                >
                  {item.verb}
                </span>
                {/* Always rendered, so the panel is the same height at every
                    step and the page never shifts under the reader. */}
                <span
                  className={cn(
                    "mt-0.5 block text-sm text-pretty text-background/60 transition-opacity duration-300",
                    done || working ? "opacity-100" : "opacity-0",
                  )}
                >
                  {item.detail}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <p className="border-t border-background/10 px-5 py-4 text-sm text-background/60">
        Modernised gradually, not swapped out.
      </p>
    </div>
  );
}
