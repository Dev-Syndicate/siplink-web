"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { industries } from "@/lib/site";
import { cn } from "@/lib/utils";

/** How long a sector holds before the stage moves on. */
const DWELL = 4500;

/**
 * Who we serve.
 *
 * One sector at a time on the section's own ground — no panel around it — with
 * the rest named on the buttons beneath. The six panels sit in a single row
 * that slides sideways, so moving on reads as travel rather than a swap.
 *
 * The stage advances by itself, which is the part that needs care rather than
 * the part that needs code:
 *
 * - It pauses while the pointer is over the section and while focus is inside
 *   it, so it cannot move a line out from under someone reading it.
 * - Choosing a sector stops it for good. Having picked, you should not be
 *   carried somewhere else a moment later.
 * - Under `prefers-reduced-motion` it neither advances nor slides.
 *
 * WCAG 2.2.2 asks for a way to stop anything that moves on its own; the first
 * three of those are it.
 */
export function SectorStage() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [stopped, setStopped] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = useCallback((next: number) => {
    setActive((next + industries.length) % industries.length);
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
    const next = (active + step + industries.length) % industries.length;
    choose(next);
    tabs.current[next]?.focus();
  };

  const running = !stopped && !held;

  return (
    <section
      // White at the top so the seam with the light section above disappears,
      // deepening to pink at the bottom. The section below this one is
      // `bg-foreground` — near-black — so the ramp is what carries the page
      // from the light half into the dark one instead of butting two heavy
      // blocks together. Change the section order and this wants revisiting.
      className="group/stage bg-gradient-to-b from-background via-accent to-brand-from/25"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="mx-auto max-w-[92rem] px-6 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Configured for how your sector works
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-pretty text-muted-foreground">
            A billing desk and a recruiting team need very different things from
            a phone system. Pick yours to see what changes.
          </p>
        </div>

        <div className="relative mt-14 px-10 sm:px-14 lg:mt-20">
          {/* Bare chevrons in the gutter rather than buttons in circles: the
              ring and fill made them read as pinned to the section edge. They
              sit outside the track because the track clips its own overflow,
              and the wrapper keeps padding at every width so a chevron never
              lands on the copy. */}
          {[-1, 1].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => choose(active + step)}
              aria-label={step < 0 ? "Previous sector" : "Next sector"}
              className={cn(
                "reveal-on-hover absolute top-1/2 z-10 -translate-y-1/2 p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                step < 0 ? "left-0" : "right-0",
              )}
            >
              {step < 0 ? (
                <ChevronLeft className="size-9 sm:size-11" aria-hidden />
              ) : (
                <ChevronRight className="size-9 sm:size-11" aria-hidden />
              )}
            </button>
          ))}

          {/* One row of six, moved sideways. Animating a single track gives
              the direction for free — going back slides the other way with no
              extra state — at the cost of one long sweep when the last sector
              wraps round to the first. */}
          <div className="overflow-hidden">
            <div
              className="flex motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {industries.map((sector, index) => (
                <div
                  key={sector.title}
                  id={`sector-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`sector-tab-${index}`}
                  aria-hidden={index !== active}
                  className="grid w-full shrink-0 items-center gap-10 px-1 lg:grid-cols-2 lg:gap-16"
                >
                  <div key={`${sector.title}-${active}`} className={cn(index === active && "panel-enter")}>
                    {sector.badge ? (
                      <Badge className="mb-5">{sector.badge}</Badge>
                    ) : null}

                    <h3 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                      {sector.title}
                    </h3>

                    <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-muted-foreground lg:text-xl">
                      {sector.description}
                    </p>
                  </div>

                  {/* Straight onto the ground, no panel. These are cut-out
                      artwork on pink accent shapes, which is why the pale
                      ground suits them: on the old crimson the palest of those
                      shapes lost most of their contrast, and here they keep
                      it. The `edge-fade` mask is what lets the artwork meet
                      the gradient without a visible edge. */}
                  <Image
                    src={sector.image.src}
                    alt={sector.image.alt}
                    width={640}
                    height={480}
                    sizes="(min-width: 1024px) 40rem, 90vw"
                    className="edge-fade aspect-square w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The bar filling across the chosen one is the dwell running down, so
            the next move is something you can see coming. */}
        <div
          role="tablist"
          aria-label="Sectors"
          onKeyDown={onTabKey}
          // Hidden on a phone, where six full-width pills stack into a column
          // taller than the stage they control. The arrows carry navigation
          // there, and they are always visible on a touch screen because
          // hover never fires on one.
          className="mt-12 hidden flex-wrap justify-center gap-3 md:flex"
        >
          {industries.map((item, index) => {
            const current = index === active;

            return (
              <Button
                key={item.title}
                id={`sector-tab-${index}`}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                size="lg"
                variant={current ? "default" : "outline"}
                aria-selected={current}
                aria-controls={`sector-panel-${index}`}
                tabIndex={current ? 0 : -1}
                onClick={() => choose(index)}
                // The `default` and `outline` variants already carry the right
                // colours now the ground is pale: a crimson pill for the
                // chosen sector, a white one with a hairline for the rest.
                className="relative overflow-hidden"
              >
                {item.title}

                {current && running ? (
                  <span
                    aria-hidden
                    key={active}
                    // White, because the bar runs across the crimson pill.
                    className="dwell-bar absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary-foreground"
                  />
                ) : null}
              </Button>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/industries">View all industries</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
