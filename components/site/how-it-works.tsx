"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardList, Rocket, Route } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * "How it works": the three steps from first call to live.
 *
 * Titles are the short form (Plan, Migrate, Go Live); each line under them is
 * the redesign brief's wording. The supporting message is the reassurance a
 * nervous buyer is actually looking for, so it sits directly under the steps
 * rather than in a footnote.
 *
 * The steps run top to bottom, zig-zagging left and right from md up, and are
 * joined by one winding path that draws itself as the section scrolls past.
 * Each step lights up when the line reaches it. The curve is built from the
 * badges' measured positions, so it follows the layout at every breakpoint;
 * when the badges stack in one column it still bows from side to side rather
 * than running straight.
 */
const steps = [
  {
    title: "Plan",
    description:
      "Our communication specialists understand your current setup and business requirements.",
    icon: ClipboardList,
  },
  {
    title: "Migrate",
    description:
      "Number porting, configuration, integrations, devices and deployment support.",
    icon: Route,
  },
  {
    title: "Go Live",
    description:
      "Launch your communication system with ongoing technical support.",
    icon: Rocket,
  },
] as const;

/** `ys` are the badge centres, top to bottom. */
type Path = { d: string; width: number; height: number; ys: number[] };

/** How far the curve swings sideways between badges in the same column. */
const BOW = 32;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function HowItWorks() {
  const list = useRef<HTMLOListElement>(null);
  const track = useRef<SVGPathElement>(null);
  const fill = useRef<SVGPathElement>(null);
  const badges = useRef<(HTMLSpanElement | null)[]>([]);
  const [path, setPath] = useState<Path | null>(null);
  // How many steps the line has reached. Only changes three times a scroll.
  const [reached, setReached] = useState(0);

  // Thread an S-curve through the centre of every badge.
  useEffect(() => {
    const measure = () => {
      const box = list.current?.getBoundingClientRect();
      if (!box) return;

      const points = badges.current.flatMap((badge) => {
        const rect = badge?.getBoundingClientRect();
        const item = badge?.closest("li")?.getBoundingClientRect();
        return rect && item
          ? [
              {
                x: rect.left + rect.width / 2 - box.left,
                y: rect.top + rect.height / 2 - box.top,
                top: item.top - box.top,
                bottom: item.bottom - box.top,
              },
            ]
          : [];
      });
      if (points.length !== steps.length) return;

      let d = `M ${points[0].x} ${points[0].y}`;
      points.slice(1).forEach((to, index) => {
        const from = points[index];

        if (Math.abs(to.x - from.x) > BOW) {
          // Different columns: drop down the badge's own column, sweep across
          // in the gap between the steps, then drop into the next badge. This
          // keeps the line clear of the text beside each badge.
          const gap = (from.bottom + to.top) / 2;
          const mid = (from.x + to.x) / 2;
          d += ` C ${from.x} ${gap}, ${from.x} ${gap}, ${mid} ${gap}`;
          d += ` C ${to.x} ${gap}, ${to.x} ${gap}, ${to.x} ${to.y}`;
        } else {
          // Same column: push the curve out to alternate sides.
          const half = (to.y - from.y) / 2;
          const bow = index % 2 === 0 ? BOW : -BOW;
          d += ` C ${from.x + bow} ${from.y + half}, ${to.x + bow} ${to.y - half}, ${to.x} ${to.y}`;
        }
      });

      setPath({
        d,
        width: box.width,
        height: box.height,
        ys: points.map((point) => point.y),
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Drive the fill from scroll position. The dash offset is written straight
  // to the element, so scrolling never re-renders the component.
  useEffect(() => {
    if (!path || !track.current) return;

    // Where each badge sits along the curve, as a fraction of its length, so
    // a step lights up exactly when the drawn line arrives at it.
    const line = track.current;
    const total = line.getTotalLength();
    const stops = path.ys.map((y, index) => {
      if (index === 0) return 0;
      let low = 0;
      let high = total;
      for (let step = 0; step < 24; step++) {
        const at = (low + high) / 2;
        if (line.getPointAtLength(at).y < y - 0.5) low = at;
        else high = at;
      }
      return high / total;
    });

    const draw = (progress: number) => {
      if (fill.current) {
        fill.current.style.strokeDashoffset = String(1 - progress);
      }
      setReached(
        progress > 0
          ? stops.filter((stop) => progress >= stop - 0.001).length
          : 0,
      );
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(1);
      return;
    }

    // The tip of the line follows a point 60% of the way down the screen.
    const update = () => {
      const box = list.current?.getBoundingClientRect();
      if (!box) return;
      const top = path.ys[0];
      const bottom = path.ys[path.ys.length - 1];
      draw(clamp((window.innerHeight * 0.6 - (box.top + top)) / (bottom - top)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [path]);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            How it works
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Switch to SipLink in 3 Simple Steps
          </h2>
        </div>

        <ol
          ref={list}
          className="relative mx-auto mt-14 flex max-w-3xl flex-col gap-16 md:gap-24 lg:mt-16"
        >
          {path ? (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-visible"
              width={path.width}
              height={path.height}
              fill="none"
            >
              <path
                ref={track}
                d={path.d}
                className="stroke-border"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <path
                ref={fill}
                d={path.d}
                pathLength={1}
                className="stroke-primary"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            </svg>
          ) : null}

          {steps.map(({ title, description, icon: Icon }, index) => {
            const active = index < reached;
            const flipped = index % 2 === 1;

            return (
              <li
                key={title}
                className={cn(
                  "relative flex gap-5 text-left md:w-full md:max-w-sm",
                  flipped && "md:ml-auto md:flex-row-reverse md:text-right",
                )}
              >
                <span
                  ref={(node) => {
                    badges.current[index] = node;
                  }}
                  className={cn(
                    "relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 bg-background transition-colors duration-500",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground",
                  )}
                >
                  <Icon className="size-6" aria-hidden />
                </span>

                <div className="pt-1">
                  <span className="font-mono text-xs tracking-widest text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={cn(
                      "font-heading mt-1 text-xl font-semibold tracking-tight transition-colors duration-500",
                      !active && "text-muted-foreground",
                    )}
                  >
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-14 text-center text-sm font-medium lg:mt-16">
          No complicated migration. No unnecessary downtime.
        </p>
      </div>
    </section>
  );
}
