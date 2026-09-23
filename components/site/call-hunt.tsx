"use client";

import { useEffect, useState } from "react";
import { Check, MoonStar, PhoneIncoming, PhoneMissed } from "lucide-react";

import {
  businessHours,
  callDay,
  huntCaller,
  type HuntOutcome,
} from "@/lib/business-size";
import { cn } from "@/lib/utils";

/**
 * The loop, written out.
 *
 * `step` is the index of the stop currently being tried; a `step` equal to
 * the phase's stop count means every stop has resolved and the figure is
 * holding on the answer. The hold is not padding — it is the only moment the
 * reader gets to actually read the outcome before the clock moves on.
 */
type Frame = { phase: number; step: number; ms: number };

const FRAMES: Frame[] = [
  { phase: 0, step: 0, ms: 1800 },
  { phase: 0, step: 1, ms: 1900 },
  { phase: 0, step: 2, ms: 2600 },
  { phase: 1, step: 0, ms: 1100 },
  { phase: 1, step: 1, ms: 1900 },
  { phase: 1, step: 2, ms: 2600 },
];

const OUTCOME_ICON: Record<HuntOutcome, typeof Check> = {
  missed: PhoneMissed,
  closed: MoonStar,
  answered: Check,
};

/** "09:58" as a position in the day. */
function hourOf(when: string) {
  const [hours, minutes] = when.split(":").map(Number);
  return hours + minutes / 60;
}

/** Rounded, so the markup carries `41.53%` rather than sixteen decimals. */
const pct = (hour: number) => `${((hour / 24) * 100).toFixed(2)}%`;

/**
 * The hour, told as a rule rather than as a mood.
 *
 * This replaces an evening ink that used to wash the whole panel after
 * closing. The fact it carried was right — the desk is shut — but a card that
 * turns itself navy and back every six seconds, unattended, beside a page
 * holding still reads as a rendering fault, not as dusk.
 *
 * A day with the staffed hours lit says the same thing and says it better,
 * because it is the thing a small business actually sets up: the marker is
 * inside the lit span on the morning call and outside it on the evening one.
 * It slides between the two, which is the only motion the change needs.
 *
 * Hidden from assistive tech: the stop underneath it already says "Closed, so
 * nothing rings in the building", and the time is in the header.
 */
function DayStrip({ when, still }: { when: string; still: boolean }) {
  const open = businessHours.open;

  return (
    <div aria-hidden className="mt-3.5 flex items-center gap-3">
      <span className="relative h-1.5 flex-1 rounded-full bg-muted">
        <span
          className="absolute inset-y-0 rounded-full bg-primary/30"
          style={{
            left: pct(open),
            width: pct(businessHours.close - open),
          }}
        />

        <span
          className={cn(
            "absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary",
            !still && "transition-[left] duration-700 ease-out",
          )}
          style={{ left: pct(hourOf(when)) }}
        />
      </span>

      {/* Fixed width, so the strip beside it keeps one length across both
          phases instead of growing by the difference between two labels. */}
      <span className="w-20 shrink-0 text-right text-xs text-muted-foreground">
        {hourOf(when) >= open && hourOf(when) < businessHours.close
          ? "Desk open"
          : "After hours"}
      </span>
    </div>
  );
}

/**
 * A day in the life of the number.
 *
 * This is the page's hero because it is the thing the reader is actually
 * afraid of. A small business does not lie awake over routing topology; it
 * lies awake over the call that rang out while the desk was busy, and the
 * customer who rang the next name on the list instead. So the figure is not
 * an instrument for inspecting a schedule — it is the call itself, arriving
 * and being caught.
 *
 * It runs one unattended loop with no controls: a morning call that hunts
 * past a busy desk, then an evening call that skips the closed desk
 * entirely. The day does the switching, which is why business hours need no
 * toggle to make their point.
 *
 * The header sits outside the keyed phase wrapper on purpose. The stops are
 * remounted on every phase so they can fade in cleanly, and a marker that
 * remounted with them would jump to its new hour instead of travelling to it.
 */
export function CallHunt({ still }: { still: boolean }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (still) return;

    const id = window.setTimeout(
      () => setFrame((current) => (current + 1) % FRAMES.length),
      FRAMES[frame].ms,
    );

    return () => window.clearTimeout(id);
  }, [frame, still]);

  // Anyone who has asked for less motion gets the morning call already
  // answered: the outcome is the content, the walk is only the telling.
  const { phase, step } = still ? { phase: 0, step: 2 } : FRAMES[frame];
  const { when, stops } = callDay[phase];
  const last = stops.length - 1;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <PhoneIncoming className="size-4.5" aria-hidden />
          </span>
          <span className="flex-1 font-medium">{huntCaller}</span>
          <span
            key={`when-${phase}`}
            className="phase-in font-mono text-sm text-muted-foreground tabular-nums"
          >
            {when}
          </span>
        </div>

        <DayStrip when={when} still={still} />
      </div>

      <div key={phase} className="phase-in">
        <ol
          className="px-5 py-2"
          aria-live="polite"
          aria-label="Where the call went"
        >
          {stops.map((stop, index) => {
            const reached = index <= step;
            const resolved = index < step || (index === step && index === last);
            const ringing =
              index === step && index !== last && stop.outcome !== "closed";
            const isLast = index === last;
            const Icon = OUTCOME_ICON[stop.outcome];

            return (
              <li key={stop.name} className="grid grid-cols-[3.25rem_1fr]">
                <div className="relative flex justify-center">
                  {/* Two segments per row, split at the marker's centre —
                    `h-10.5` is mt-6 plus half of size-9. The rail *into* a
                    stop lights when the call arrives there; the rail *out*
                    of it only once the call has moved on, so the crimson
                    trail follows the call instead of running ahead of it.
                    The last row has no outgoing segment: a line continuing
                    below the answer would promise somewhere else to go. */}
                  <span
                    aria-hidden
                    className="absolute top-0 h-10.5 w-px bg-border"
                  />
                  <span
                    aria-hidden
                    data-travelled={reached}
                    className="absolute top-0 h-10.5 w-px origin-top scale-y-0 bg-primary transition-transform duration-400 ease-out data-[travelled=true]:scale-y-100"
                  />

                  {isLast ? null : (
                    <>
                      <span
                        aria-hidden
                        className="absolute top-10.5 bottom-0 w-px bg-border"
                      />
                      <span
                        aria-hidden
                        data-travelled={index < step}
                        className="absolute top-10.5 bottom-0 w-px origin-top scale-y-0 bg-primary transition-transform duration-400 ease-out data-[travelled=true]:scale-y-100"
                      />
                    </>
                  )}

                  <span
                    className={cn(
                      "relative mt-6 flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                      resolved && stop.outcome === "answered"
                        ? "border-primary bg-primary text-primary-foreground"
                        : reached
                          ? "border-primary bg-background text-primary"
                          : "border-border bg-background text-muted-foreground/40",
                    )}
                  >
                    {reached ? (
                      <Icon className="size-4" aria-hidden />
                    ) : (
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-current"
                      />
                    )}

                    {/* Ringing: two rings a beat apart, so it reads as a phone
                      repeating rather than one expanding circle. */}
                    {ringing ? (
                      <>
                        <span aria-hidden className="hunt-ring" />
                        <span
                          aria-hidden
                          className="hunt-ring hunt-ring-late"
                        />
                      </>
                    ) : null}
                  </span>
                </div>

                <div
                  className={cn(
                    "pt-5 transition-opacity duration-300",
                    isLast ? "pb-5" : "pb-3",
                    reached ? "opacity-100" : "opacity-40",
                  )}
                >
                  <p className="flex flex-wrap items-baseline gap-x-2.5 text-lg font-medium">
                    {stop.name}
                    {ringing ? (
                      <span className="text-sm font-normal text-muted-foreground">
                        ringing
                      </span>
                    ) : null}
                  </p>
                  {/* Held rather than swapped: the note appears once its stop
                    has resolved and stays for the rest of the phase, so the
                    reader can still read the first outcome while the second
                    is ringing. */}
                  <p
                    className={cn(
                      // Two lines' worth, always. Every note is written to wrap
                      // to two at this measure, so the panel is exactly as tall
                      // in the evening as in the morning and the loop never
                      // nudges the page around it.
                      "mt-1.5 min-h-12 max-w-[42ch] text-pretty text-muted-foreground transition-opacity duration-300",
                      resolved ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {stop.note}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
