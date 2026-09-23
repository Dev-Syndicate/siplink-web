"use client";

import { useEffect, useState } from "react";
import { Headset } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { queueLanes, queuePhases, queueTotal } from "@/lib/business-size";
import { cn } from "@/lib/utils";

/**
 * Long enough to read one line of nine before it becomes three queues.
 *
 * Was 2200, which is most of the time a reader gives a hero figure before
 * deciding it is a static image. The caption under the panel is legible from
 * 600ms — `phase-in` holds it for 300 and fades it over 300 — so this leaves
 * it readable for half a second and then moves.
 */
const HOLD = 1200;
/**
 * How long the sorted lanes are held before the figure replays. Longer than
 * HOLD, so the cycle rests on the three queues rather than on the single
 * line they replace.
 */
const SORTED_MS = 5000;

/** Same people either side of the split, just standing somewhere useful. */
const totalAgents = queueLanes.reduce((sum, lane) => sum + lane.agents, 0);

/**
 * The queue, before and after routing.
 *
 * What a mid-market operation stands to lose is not one call and not its
 * estate — it is the caller who gives up waiting, and the fact that afterwards
 * nobody can say why. The source copy names both halves of that: where calls
 * are going and where they are waiting, and reports whose point is the
 * staffing decision they inform.
 *
 * So the figure is one undifferentiated line becoming three queues with their
 * own people. The dot count is the same on both sides on purpose — routing
 * does not make callers disappear, it sorts them, and the payoff is that you
 * can finally say who is waiting for what. Shortening the line would be a
 * performance claim; making it legible is the product.
 *
 * It plays itself rather than offering a control to operate, and it cycles.
 * An even loop made the sorted queues — the half worth looking at — keep
 * dissolving back into the problem, so the beats are weighted instead:
 * SORTED_MS against HOLD, which leaves the lanes on screen for most of the
 * cycle and the undifferentiated line as the brief thing it interrupts.
 */
export function QueueSplit() {
  const [ref, seen] = useInView<HTMLDivElement>();
  const still = useReducedMotion();
  const [split, setSplit] = useState(false);

  useEffect(() => {
    if (!seen || still) return;

    const timers: number[] = [];

    const run = () => {
      timers.push(
        window.setTimeout(() => setSplit(true), HOLD),
        window.setTimeout(() => {
          setSplit(false);
          run();
        }, HOLD + SORTED_MS),
      );
    };

    run();
    return () => timers.forEach(window.clearTimeout);
  }, [seen, still]);

  // Reduced motion gets the sorted state outright: the lanes are the content,
  // the sorting is only the telling.
  const sorted = still || split;
  const phase = queuePhases[sorted ? 1 : 0];

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-4">
        <p key={phase.label} className="phase-in font-medium">
          {phase.label}
        </p>
        <p className="font-mono text-xs text-muted-foreground tabular-nums">
          {queueTotal} waiting
        </p>
      </div>

      {/* Height reserved for the three-lane beat, so the one-line beat
          leaves space rather than the panel resizing under the reader every
          few seconds. That beat centres itself in the reservation, so the
          spare room reads as air around one long line rather than as a gap
          underneath it. */}
      <div
        className={cn(
          "min-h-[9.5rem] px-5 py-6",
          sorted ? null : "flex items-center",
        )}
      >
        {sorted ? (
          <ul className="w-full space-y-4">
            {queueLanes.map((lane) => (
              <li
                key={lane.name}
                className="grid grid-cols-[5.5rem_5.5rem_auto] items-center gap-3"
              >
                <span className="truncate text-sm font-medium">
                  {lane.name}
                </span>

                {/* Callers for this lane. The same dots as the single line,
                    just standing somewhere that means something now. Fixed
                    column width so the agent counts line up down the panel
                    and can actually be compared lane to lane. */}
                <span className="flex flex-wrap items-center gap-1.5">
                  {Array.from({ length: lane.waiting }, (_, index) => (
                    <span
                      key={index}
                      className="size-2.5 rounded-full bg-primary/70"
                    />
                  ))}
                </span>

                {/* The people who answer it. Named on the row rather than in
                    a legend, because who staffs which queue is the decision
                    the reports exist to inform. */}
                <span className="flex items-center gap-1 text-muted-foreground">
                  {Array.from({ length: lane.agents }, (_, index) => (
                    <Headset key={index} className="size-3.5" aria-hidden />
                  ))}
                  <span className="sr-only">
                    {lane.agents} agents on {lane.name}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          /* Callers and agents both undifferentiated, because both totals
             are the same either side of the split. Showing only the callers
             here would have made the sorted beat look like it had conjured
             the agents up. */
          <div className="grid w-full grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3">
            <span className="truncate text-sm font-medium text-muted-foreground">
              Everyone
            </span>
            <span className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
              {Array.from({ length: queueTotal }, (_, index) => (
                <span
                  key={index}
                  className="size-2.5 rounded-full bg-muted-foreground/40"
                />
              ))}
              <span className="ml-3 flex items-center gap-1 text-muted-foreground/60">
                {Array.from({ length: totalAgents }, (_, index) => (
                  <Headset key={index} className="size-3.5" aria-hidden />
                ))}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Both notes are rendered into the same grid cell. They wrap to
          different numbers of lines and that number changes with viewport
          width, so a reserved height would have been a magic number that held
          at one size and not another. Stacking them makes the footer exactly
          as tall as the taller note, whatever the width, and the panel cannot
          move under the reader.

          The inactive one is `invisible` rather than `opacity-0`, and the
          active one fades in on `phase-in` rather than the two of them
          crossfading. Crossfading in a shared cell puts both notes at half
          opacity on top of each other for the length of the transition, which
          renders as one illegible paragraph — the header has always keyed and
          faded for exactly this reason, and the footer had been left behind.
          `invisible` still reserves the space; it just paints nothing. */}
      <div className="grid border-t border-border px-5 py-4">
        {queuePhases.map((item, index) => {
          const active = index === (sorted ? 1 : 0);

          return (
            <p
              // The sorted state is in the key so both notes remount when it
              // flips, which is what lets `phase-in` run on the new one.
              key={`${item.label}-${sorted}`}
              aria-hidden={!active}
              className={cn(
                "col-start-1 row-start-1 text-sm text-pretty text-muted-foreground",
                active ? "phase-in" : "invisible",
              )}
            >
              {item.note}
            </p>
          );
        })}
      </div>
    </div>
  );
}
