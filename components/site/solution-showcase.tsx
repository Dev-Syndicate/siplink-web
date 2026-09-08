"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

import { solutionScenes } from "@/components/site/solution-scenes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { solutions } from "@/lib/site";

/**
 * Homepage solution showcase: a sticky rail of the four solutions beside a
 * column of panels that scroll past it.
 *
 * The rail item for whichever panel is currently in view expands to show its
 * description and call to action; the rest collapse to icon and title. An
 * IntersectionObserver drives that, watching a band across the middle of the
 * viewport so a panel becomes active as it settles into place rather than the
 * instant its top edge appears.
 *
 * Below `lg` there is no rail and no stickiness — each solution renders as one
 * ordinary block, heading through to highlights. Sticky columns and scroll
 * syncing are a wide-viewport affordance; on a phone they just fight the user.
 */
export function SolutionShowcase() {
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  /**
   * Set while a click-driven scroll is in flight.
   *
   * Without it the observer fires for every panel the jump passes over, which
   * both flickers the rail through the intermediate items and — because each
   * of those re-renders animates the rail's height — cancels Chrome's native
   * smooth scroll partway, leaving the page stranded on the wrong panel.
   */
  const jumping = useRef(false);
  const releaseTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (panels.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (jumping.current) return;
        // Take the entry nearest the middle of the band, so scrolling fast
        // through two panels still lands on the right one.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = panels.indexOf(visible.target as HTMLDivElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  // `scrollend` is the precise signal; the timer is the fallback for browsers
  // that do not fire it and for a jump that never moves the page at all.
  useEffect(() => {
    const release = () => {
      jumping.current = false;
    };
    window.addEventListener("scrollend", release);
    return () => {
      window.removeEventListener("scrollend", release);
      window.clearTimeout(releaseTimer.current);
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const panel = panelRefs.current[index];
      if (!panel) return;

      jumping.current = true;
      setActive(index);

      const rect = panel.getBoundingClientRect();
      const top =
        window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });

      window.clearTimeout(releaseTimer.current);
      releaseTimer.current = window.setTimeout(() => {
        jumping.current = false;
      }, 1500);
    },
    [reduced]
  );

  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            The platform
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Power the voice of your business
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Four solutions on one cloud platform — run them together or start
            with the one you need today.
          </p>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          {/* Rail — wide viewports only */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <ul>
                {solutions.map((solution, index) => {
                  const Icon = solution.icon;
                  const isActive = index === active;

                  return (
                    <li
                      key={solution.title}
                      className="border-b border-border last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => goTo(index)}
                        aria-current={isActive ? "true" : undefined}
                        className="flex w-full cursor-pointer items-start gap-4 py-6 text-left"
                      >
                        <span
                          className={cn(
                            "flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                            isActive
                              ? "bg-brand-gradient text-primary-foreground"
                              : "bg-primary/10 text-primary/50"
                          )}
                        >
                          <Icon className="size-6" aria-hidden />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block text-xl font-semibold transition-colors",
                              isActive
                                ? "text-foreground"
                                : "text-muted-foreground/70"
                            )}
                          >
                            {solution.title}
                          </span>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.span
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={
                                  reduced
                                    ? { duration: 0 }
                                    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                                }
                                className="block overflow-hidden"
                              >
                                <span className="mt-3 block text-pretty text-sm text-muted-foreground">
                                  {solution.description}
                                </span>
                                <span className="mt-5 block">
                                  <Button asChild variant="brand" size="sm">
                                    <Link href="/solutions">{solution.cta}</Link>
                                  </Button>
                                </span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Panels */}
          <div className="space-y-16 lg:space-y-28">
            {solutions.map((solution, index) => {
              const Scene = solutionScenes[index];
              const Icon = solution.icon;

              return (
                <div
                  key={solution.title}
                  ref={(node) => {
                    panelRefs.current[index] = node;
                  }}
                >
                  {/* Narrow viewports get the heading the rail would have shown. */}
                  <div className="lg:hidden">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold">
                      {solution.title}
                    </h3>
                    <p className="mt-2 text-pretty text-sm text-muted-foreground">
                      {solution.description}
                    </p>
                  </div>

                  <div className="mt-6 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-from/15 via-background to-brand-to/15 p-6 sm:p-10 lg:mt-0">
                    <Scene className="h-full w-full text-foreground/70" />
                  </div>

                  <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    {solution.highlights.map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="size-3.5" aria-hidden />
                        </span>
                        <span>
                          <span className="block font-medium">{item.title}</span>
                          <span className="mt-1 block text-sm text-pretty text-muted-foreground">
                            {item.description}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 lg:hidden">
                    <Button asChild variant="brand" size="sm">
                      <Link href="/solutions">{solution.cta}</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
