"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import dynamic from "next/dynamic";
import { ArrowRight, Check } from "lucide-react";

import { HeroDecor } from "@/components/site/hero-decor";
import { LaptopModel } from "@/components/site/laptop-model";
import { Button } from "@/components/ui/button";
import { plans, planNote } from "@/lib/site";

/**
 * The 3D laptop is client-only and pulls in three.js, so it is loaded on
 * demand and kept out of the server bundle. The flat SVG stands in until the
 * canvas is ready, which also means the hero still reads correctly for anyone
 * whose browser cannot give us WebGL.
 */
const Laptop3D = dynamic(
  () => import("@/components/site/laptop-3d").then((m) => m.Laptop3D),
  {
    ssr: false,
    loading: () => (
      <LaptopModel className="absolute left-1/2 top-1/2 w-[min(80vw,34rem)] -translate-x-1/2 -translate-y-1/2 opacity-60" />
    ),
  }
);

/**
 * Three-panel opening hero where one laptop stays mounted and pinned across
 * all three, its pose interpolated from scroll progress.
 *
 * The section is 300svh tall and its only child is pinned with `sticky`, so
 * scrolling the outer container scrubs `scrollYProgress` from 0 to 1 while
 * the stage holds still. Nothing is on a timer: scrolling back up runs the
 * whole thing in reverse, because every value is a pure function of scroll
 * position rather than an animation with a duration.
 *
 * Everything that moves is `transform` or `opacity`, both compositor-only.
 * The background change is two stacked gradient layers crossfading rather
 * than an animated `background-color`, which would repaint every frame.
 *
 * Panels, in scroll order:
 *   0.00  laptop floats in at an angle, right of the headline and CTA
 *   0.50  laptop lands square and centred, copy crossfades to the pitch
 *   1.00  laptop shrinks to the left, background turns brand red, copy
 *         becomes the plan detail block
 */

/**
 * Required on every transform whose input stops do not span the whole 0-1
 * progress. Without it a value past its last stop ramps back toward its FIRST
 * output instead of holding the last one — so the opening headline faded out
 * on cue and then faded straight back in over the plan panel, and the brand
 * background reached full red at 0.82 and was gone again by 1.0.
 */
const CLAMP = { clamp: true } as const;

/**
 * Where each panel's copy fades along the 0-1 scroll progress.
 *
 * Inputs must be strictly increasing — `useTransform` interpolates between
 * neighbouring stops, and a repeated stop (an obvious way to write "hold at
 * full") produces a zero-width segment and garbage output. So the first panel
 * opens already visible and the last one simply never fades out, each with
 * one stop fewer rather than a duplicated one.
 */
const PANEL_OPACITY: { input: number[]; output: number[] }[] = [
  { input: [0, 0.16, 0.26], output: [1, 1, 0] },
  { input: [0.24, 0.34, 0.56, 0.66], output: [0, 1, 1, 0] },
  { input: [0.64, 0.74, 1], output: [0, 1, 1] },
];

function usePanelOpacity(progress: MotionValue<number>, index: number) {
  const { input, output } = PANEL_OPACITY[index];
  return useTransform(progress, input, output, CLAMP);
}

export function ContinuousHero() {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  /**
   * Whether the hero is anywhere near the viewport. Drives the 3D frame loop:
   * it renders continuously while on screen and stops dead once past, so the
   * rest of the page costs nothing.
   *
   * Starts true so the very first paint after mount draws, before the
   * observer has had a chance to fire.
   */
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /**
   * Plain mirror of `scrollYProgress`, and everything below reads this rather
   * than the scroll value itself.
   *
   * Motion hoists transforms that trace back to a scroll value onto a native
   * `ViewTimeline` WAAPI animation. That timeline measures how far the subject
   * has travelled through the viewport, which is not the `start start -> end
   * end` range asked for here, so the DOM ended up driven by a different
   * progress than the JS value reported: the opening headline faded out on cue
   * and then faded back in over the plan panel. Copying through a detached
   * value breaks the chain and keeps every transform on the JS path, where the
   * offsets mean what they say. Still only opacity and transform, so the work
   * per frame stays on the compositor.
   */
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(() => {
    progress.set(scrollYProgress.get());
  }, [progress, scrollYProgress]);

  // Deep brand panel fades in under panel three.
  const darkBg = useTransform(progress, [0.58, 0.82], [0, 1], CLAMP);
  // Soft glow behind the laptop, brightest when it lands.
  const glow = useTransform(
    progress,
    [0.15, 0.5, 0.85],
    [0.3, 1, 0.45],
    CLAMP
  );

  const panel0 = usePanelOpacity(progress, 0);
  const panel1 = usePanelOpacity(progress, 1);
  const panel2 = usePanelOpacity(progress, 2);

  const featured = plans.find((plan) => plan.featured) ?? plans[0];

  return (
    <section ref={container} className="relative h-[300svh]">
      <div className="sticky top-20 h-[calc(100svh-5rem)] overflow-hidden">
        {/* Backgrounds — crossfaded, never repainted */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted via-background to-muted" />
        <motion.div
          style={{ opacity: darkBg }}
          className="absolute inset-0 bg-gradient-to-br from-brand-to via-primary to-brand-from"
        />
        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-from/20 blur-3xl"
        />

        {/*
          The single persistent laptop.

          The canvas fills the whole stage and every part of the pose —
          position, rotation, scale — happens inside the 3D scene. Driving it
          with CSS transforms instead would resample the already-rendered
          bitmap (soft when scaled up) and clip the model against the canvas
          box, which is exactly what it did before.
        */}
        <div className="pointer-events-none absolute inset-0">
          <Laptop3D
            progress={progress}
            reduced={Boolean(reduced)}
            active={inView}
            className="!absolute !inset-0 !size-full"
          />
        </div>

        <HeroDecor progress={progress} opacity={panel0} />

        {/* Panel 1 — headline and CTA */}
        <motion.div
          style={{ opacity: panel0 }}
          className="absolute inset-0 mx-auto flex max-w-7xl items-center px-6 lg:px-10"
        >
          <div className="max-w-md lg:max-w-lg">
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Your phone system,{" "}
              <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                on every device
              </span>{" "}
              your team already uses.
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Book a demo</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="group">
                <Link href="/solutions">
                  Explore solutions
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Panel 2 — the pitch, centred above the landed laptop */}
        <motion.div
          style={{ opacity: panel1 }}
          className="absolute inset-x-0 top-0 mx-auto flex max-w-3xl flex-col items-center px-6 pt-[8vh] text-center lg:pt-[10vh]"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            One platform for voice, video and messaging
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-muted-foreground sm:text-lg">
            Calls, video, business SMS and team chat in a single hub — no
            hardware in the telecom closet, and nothing to maintain.
          </p>
        </motion.div>

        {/* Panel 3 — plan detail, on the brand background */}
        <motion.div
          style={{ opacity: panel2 }}
          className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-end px-6 text-primary-foreground lg:px-10"
        >
          <div className="max-w-sm lg:max-w-md">
            <p className="text-xs font-medium uppercase tracking-widest opacity-80">
              {featured.name} plan
            </p>
            <p className="mt-3 text-5xl font-semibold tracking-tight tabular-nums lg:text-6xl">
              {featured.price}
              <span className="ml-2 align-middle text-base font-normal opacity-80">
                per user / month
              </span>
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Unlimited calling in the US and Canada",
                "Free local number and IP-phone lease",
                ...featured.adds,
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs opacity-70">{planNote}</p>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="mt-7 border-current/40 bg-transparent text-current hover:bg-current/10 hover:text-current"
            >
              <Link href="/pricing">
                See all plans
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
