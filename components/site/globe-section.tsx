"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import type { VantaEffect } from "vanta/dist/vanta.globe.min";

import { FlagCA, FlagUS } from "@/components/site/flags";
import { Button } from "@/components/ui/button";
import { offices, site, unlimitedPlans } from "@/lib/site";

/**
 * Exactly the background from the supplied Vanta config, in the two forms the
 * page needs it: a number for Vanta and a CSS string for the flat fill and
 * the scrim, kept together so they cannot drift apart.
 */
const BACKGROUND_COLOR = 0x2a1e33;
const BACKGROUND_CSS = "#2a1e33";

/**
 * Global-reach section on an animated Vanta globe.
 *
 * The effect is a second WebGL context on a page that already has one for the
 * hero laptop, so it is not created until the section is close to the
 * viewport, and it is destroyed on unmount. Vanta is loaded through a dynamic
 * import for the same reason — it never reaches anyone who does not scroll
 * this far.
 *
 * Vanta carries no three of its own; the app's instance is handed to it so the
 * page does not ship two copies.
 */
export function GlobeSection() {
  const host = useRef<HTMLDivElement>(null);
  const effect = useRef<VantaEffect | null>(null);
  const reduced = useReducedMotion();
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "250px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!near || reduced || !host.current || effect.current) return;

    let cancelled = false;
    (async () => {
      const [{ default: GLOBE }, THREE] = await Promise.all([
        import("vanta/dist/vanta.globe.min"),
        import("three"),
      ]);
      if (cancelled || !host.current) return;

      effect.current = GLOBE({
        el: host.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: BACKGROUND_COLOR,
      });
    })();

    return () => {
      cancelled = true;
      effect.current?.destroy();
      effect.current = null;
    };
  }, [near, reduced]);

  const operating = offices.filter((office) => office.kind === "operating");

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ "--globe-bg": BACKGROUND_CSS } as React.CSSProperties}
    >
      {/*
        Vanta mounts its canvas into this element. The matching flat colour is
        both the pre-load background and the whole background under reduced
        motion, so the section never flashes and never depends on WebGL.
      */}
      <div
        ref={host}
        aria-hidden
        className="absolute inset-0 -z-20 bg-[var(--globe-bg)]"
      />

      {/*
        The globe's grid lines run right through the copy and make it hard to
        read. This fades the backdrop back in under the text column while
        leaving the globe itself clear on the right.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--globe-bg)] from-25% via-[var(--globe-bg)]/85 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[var(--globe-bg)] to-transparent"
      />
      {/*
        On narrow screens the globe fills the frame rather than sitting off to
        one side, so the horizontal gradient above does nothing for legibility.
        Flatten the whole backdrop instead, and drop this once there is room
        for the text and the globe to sit side by side.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[var(--globe-bg)]/70 lg:hidden"
      />

      {/*
        This surface is a fixed dark colour in both themes, so the usual
        foreground tokens would invert against it. Light-on-dark is set
        explicitly here for that reason.
      */}
      <div className="mx-auto max-w-7xl px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-widest text-white/60">
            {site.tagline}
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Run one phone system across every place you work
          </h2>
          <p className="mt-5 text-pretty text-white/70">
            {site.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Talk to us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>

        <dl className="mt-16 grid max-w-3xl gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-xs font-medium uppercase tracking-widest text-white/50">
              Offices
            </dt>
            <dd className="mt-3 space-y-2">
              {operating.map((office) => (
                <span key={office.city} className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 shrink-0 text-white/50" aria-hidden />
                  {office.city}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-widest text-white/50">
              Unlimited calling
            </dt>
            <dd className="mt-3 space-y-2">
              {unlimitedPlans.map((plan) => (
                <span key={plan.country} className="flex items-center gap-2 text-sm">
                  {plan.country === "US" ? (
                    <FlagUS className="h-3.5 w-auto shrink-0 rounded-[2px]" />
                  ) : (
                    <FlagCA className="h-3.5 w-auto shrink-0 rounded-[2px]" />
                  )}
                  {plan.title}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-widest text-white/50">
              Support
            </dt>
            <dd className="mt-3 text-sm text-white/80">
              Round-the-clock cover, 24/7, from the same team that builds and
              runs the network.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
