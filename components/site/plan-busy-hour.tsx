"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { planDay } from "@/lib/internet";
import { cn } from "@/lib/utils";

/** How long an hour holds before the timeline moves on. */
const DWELL = 5200;

/**
 * The working day, one hour at a time.
 *
 * The section exists to make a single point: load is not steady, and the hour
 * a connection gets judged on is never the hour anyone tests it in. A static
 * table would state that; watching the applications light up and go dark as
 * the day advances is what makes it land.
 *
 * The automatic advance follows the same contract as SectorStage, which is
 * the part that needs care rather than the part that needs code:
 *
 * - It pauses while the pointer is over the section and while focus is inside
 *   it, so it cannot move a line out from under someone reading it.
 * - Choosing an hour stops it for good. Having picked, you should not be
 *   carried somewhere else a moment later.
 * - Under `prefers-reduced-motion` it does not advance at all.
 *
 * WCAG 2.2.2 asks for a way to stop anything that moves on its own; those
 * three are it. The tablist is keyboard-navigable with arrow keys, and the
 * panel is bound to the selected tab rather than swapped underneath it.
 */
export function PlanBusyHour() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [stopped, setStopped] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = useCallback((next: number) => {
    setActive((next + planDay.length) % planDay.length);
  }, []);

  /** Any deliberate choice ends the automatic advance for the session. */
  const choose = useCallback(
    (next: number) => {
      setStopped(true);
      go(next);
    },
    [go],
  );

  useEffect(() => {
    if (stopped || held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => go(active + 1), DWELL);
    return () => window.clearTimeout(timer);
  }, [active, held, stopped, go]);

  const onTabKey = (event: React.KeyboardEvent) => {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + planDay.length) % planDay.length;
    choose(next);
    tabs.current[next]?.focus();
  };

  const running = !stopped && !held;
  const current = planDay[active];

  /** Every application named across the day, so chips keep their position. */
  const everything = [...new Set(planDay.flatMap((slot) => slot.live))];

  return (
    <section
      className="border-b border-border bg-muted/30"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            The busy hour
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            A working day is not a flat line
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            This is the same office across one day. Watch which applications
            are live at each hour — the connection has to carry the worst of
            it, not the average of it.
          </p>
        </div>

        {/* The day, as a rail of hours. */}
        <div
          role="tablist"
          aria-label="Hours of the working day"
          onKeyDown={onTabKey}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-5"
        >
          {planDay.map(({ time, label }, index) => {
            const selected = index === active;

            return (
              <button
                key={time}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`hour-tab-${index}`}
                aria-selected={selected}
                aria-controls="hour-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(index)}
                className={cn(
                  "relative flex flex-col items-start gap-1 p-5 text-left transition-colors focus-visible:outline-none",
                  selected
                    ? "bg-background"
                    : "bg-background/40 hover:bg-background/80 focus-visible:bg-background/80",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-sm font-semibold tracking-tight transition-colors",
                    selected ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {time}
                </span>
                <span
                  className={cn(
                    "text-xs leading-snug text-pretty transition-colors",
                    selected ? "text-foreground" : "text-muted-foreground/70",
                  )}
                >
                  {label}
                </span>

                {/* The dwell bar doubles as the progress indicator. It is
                    keyed on `active` so it restarts with each hour, and it
                    only draws while the timeline is actually running. */}
                {selected && running ? (
                  <span
                    key={active}
                    aria-hidden
                    className="dwell-bar absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary"
                    style={
                      { "--dwell-duration": `${DWELL}ms` } as React.CSSProperties
                    }
                  />
                ) : (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5",
                      selected ? "bg-primary" : "bg-transparent",
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* The panel. `aria-live` is deliberately absent: the content changes
            on a timer, and announcing every change would talk over the reader
            rather than help them. The tablist is how it is navigated. */}
        <div
          id="hour-panel"
          role="tabpanel"
          aria-labelledby={`hour-tab-${active}`}
          tabIndex={0}
          className="mt-10 grid gap-10 rounded-2xl border border-border bg-background p-7 focus-visible:outline-none lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 lg:p-10"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
              {current.time} · {current.label}
            </p>
            {/* Keyed on `active`, so the paragraph re-enters on each change
                rather than the words swapping in place. */}
            <p
              key={active}
              className="panel-enter mt-4 text-lg text-pretty text-muted-foreground"
            >
              {current.note}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Live right now
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {everything.map((app) => {
                const live = current.live.includes(app);

                return (
                  <li key={app}>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all duration-500",
                        live
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground/40",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "size-1.5 rounded-full transition-colors duration-500",
                          live ? "bg-primary" : "bg-muted-foreground/30",
                        )}
                      />
                      {app}
                      <span className="sr-only">
                        {live ? " — in use" : " — idle"}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
