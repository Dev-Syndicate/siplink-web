"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

import { SwitchingDevice } from "@/components/site/switching-device";
import { Button } from "@/components/ui/button";
import { switchingStory } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Runs before paint on the client, and is a no-op during SSR. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Where a block turns: once its top passes 60% of the way down the screen.
 *
 * State is read straight off position rather than latched when a block first
 * crosses, which is what lets the whole thing run backwards on the way up.
 * It also means there is nothing to miss — no band a fast scroll can jump.
 */
const TRIGGER_RATIO = 0.6;

/**
 * What changes when you switch.
 *
 * Each block opens on the old state. On its scroll beat a rule draws across
 * it and the new state turns in underneath, so both stay readable — you can
 * still see what you are leaving behind, which is the actual argument. The
 * device alongside turns to match.
 *
 * Space for the second line is reserved from the start. Letting the block
 * grow would shove everything below it mid-scroll, and worse, content moving
 * under the trigger line makes blocks fire again on their way past.
 */
export function SwitchingStory() {
  const section = useRef<HTMLElement | null>(null);
  const blocks = useRef<(HTMLLIElement | null)[]>([]);

  // Rendered on the server fully turned, so the finished state is what exists
  // without JavaScript. The effect rewinds whatever is still below the line,
  // before paint, so landing mid-section never flashes.
  const [turned, setTurned] = useState<boolean[]>(() =>
    switchingStory.map(() => true),
  );

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      // Skip the work unless the section is near the viewport: this listener
      // sees every scroll on the page, not just the ones over this section.
      const box = section.current?.getBoundingClientRect();
      if (!box || box.bottom < -200 || box.top > window.innerHeight + 200) return;

      const line = window.innerHeight * TRIGGER_RATIO;
      const next = blocks.current.map(
        (block) => !block || block.getBoundingClientRect().top < line,
      );
      setTurned((current) =>
        next.some((value, i) => value !== current[i]) ? next : current,
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // The device shows the last block that has turned. Before any has, it sits
  // on the first screen rather than going blank.
  const active = Math.max(0, turned.lastIndexOf(true));

  return (
    <section
      ref={section}
      className="border-b border-border bg-foreground text-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            What actually changes on Monday
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-background/70">
            Switching phone systems sounds like a project. In practice we port
            your numbers, ship the handsets and run both in parallel until you
            are ready.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="mt-8 border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background"
          >
            <Link href="/contact">Plan your migration</Link>
          </Button>
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start lg:py-10">
            <SwitchingDevice active={active} />
          </div>

          {/* Bottom padding gives the sticky column runway: without it the
              device unpinned and slid away while the last line was still
              being read. */}
          <ul className="space-y-16 lg:space-y-24 lg:pb-40">
            {switchingStory.map(({ before, after }, index) => {
              const done = turned[index];

              return (
                <li
                  key={before}
                  ref={(node) => {
                    blocks.current[index] = node;
                  }}
                >
                  <p className="font-heading text-2xl leading-tight font-medium text-balance text-background/40 sm:text-3xl">
                    {/* Inline, so the drawn rule paints on every wrapped line
                        rather than once across the whole paragraph. */}
                    <span className="strike-draw inline" data-struck={done}>
                      {before}
                    </span>
                  </p>

                  {/* Always in the layout, so the block never changes height
                      when the new line arrives. */}
                  <p className="mt-5 perspective-[900px]">
                    <span
                      aria-hidden={!done}
                      className={cn(
                        "roll-face font-heading block origin-top text-2xl leading-tight font-semibold text-balance text-background sm:text-3xl lg:text-4xl",
                        done
                          ? "rotate-x-0 opacity-100"
                          : "-rotate-x-90 opacity-0",
                      )}
                    >
                      {after}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
