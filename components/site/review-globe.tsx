"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, MousePointerClick, Pause, Play, Quote, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Review } from "@/lib/site";
import { cn } from "@/lib/utils";

type Vec = [number, number, number];
type Projected = { x: number; y: number; z: number };

/** Dots that make up the sphere's surface. */
const DOT_COUNT = 1100;
/** Forward tilt, so the top of the globe leans toward the reader. */
const TILT = 0.38;
/** Radians per millisecond: one turn in a little under a minute. */
const SPIN = 0.00011;
/** How long the spotlight rests on one reviewer before moving on. */
const CYCLE_MS = 4800;
/** Globe radius as a share of the square it sits in. */
const RADIUS = 0.42;
/** Space between a pin and the review card it opens. */
const CARD_GAP = 30;

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/** Evenly spread points over a unit sphere. */
function fibonacciSphere(n: number): Vec[] {
  const points: Vec[] = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = GOLDEN * i;
    points.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return points;
}

/** Latitude and longitude lines every 30°, as point runs to stroke. */
function graticule(): Vec[][] {
  const lines: Vec[][] = [];
  const steps = 72;
  for (let lat = -60; lat <= 60; lat += 30) {
    const phi = (lat * Math.PI) / 180;
    lines.push(
      Array.from({ length: steps + 1 }, (_, s) => {
        const lon = (s / steps) * Math.PI * 2;
        return [Math.cos(phi) * Math.sin(lon), Math.sin(phi), Math.cos(phi) * Math.cos(lon)];
      }),
    );
  }
  for (let lonDeg = 0; lonDeg < 180; lonDeg += 30) {
    const lon = (lonDeg * Math.PI) / 180;
    lines.push(
      Array.from({ length: steps + 1 }, (_, s) => {
        const phi = (s / steps) * Math.PI * 2;
        return [Math.cos(phi) * Math.sin(lon), Math.sin(phi), Math.cos(phi) * Math.cos(lon)];
      }),
    );
  }
  return lines;
}

/**
 * Where each reviewer sits. Abstract on purpose: the globe has no land drawn
 * on it, so the pins say "customers all round" without claiming anyone's
 * real location. Longitudes are evenly spaced, latitudes stay in the band
 * the tilt shows best.
 */
function pinPlacement(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const lon = (i / count) * Math.PI * 2;
    const lat = ((-34 + 76 * ((i * 0.618034) % 1)) * Math.PI) / 180;
    const vec: Vec = [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];
    return { lon, vec };
  });
}

function project(v: Vec, rot: number): Projected {
  const cr = Math.cos(rot);
  const sr = Math.sin(rot);
  const ct = Math.cos(TILT);
  const st = Math.sin(TILT);
  const x = v[0] * cr + v[2] * sr;
  const z1 = -v[0] * sr + v[2] * cr;
  return { x, y: v[1] * ct - z1 * st, z: v[1] * st + z1 * ct };
}

/** A point along the great circle from a to b, lifted off the surface mid-way. */
function arcPoint(a: Vec, b: Vec, t: number): Vec {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-4) return a;
  const s = Math.sin(omega);
  const k1 = Math.sin((1 - t) * omega) / s;
  const k2 = Math.sin(t * omega) / s;
  const lift = 1 + Math.sin(Math.PI * t) * (0.08 + omega * 0.12);
  return [
    (a[0] * k1 + b[0] * k2) * lift,
    (a[1] * k1 + b[1] * k2) * lift,
    (a[2] * k1 + b[2] * k2) * lift,
  ];
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Avatar({ review, className }: { review: Review; className?: string }) {
  return review.photo ? (
    <Image
      src={review.photo}
      alt=""
      width={96}
      height={96}
      sizes="48px"
      draggable={false}
      className={cn("rounded-full bg-background object-cover", className)}
    />
  ) : (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-xs font-semibold text-primary-foreground",
        className,
      )}
    >
      {initials(review.name)}
    </span>
  );
}

/**
 * The reviews as pins on a slowly turning globe.
 *
 * Hovering a pin stops the spin and opens that review beside it; leaving lets
 * the globe turn on and the spotlight walk to the next reviewer coming into
 * view. The row of faces under the globe is the keyboard and screen-reader
 * way in — choosing one turns the globe to bring that pin to the front.
 *
 * The dots and call arcs are drawn on a canvas; the pins and the card are
 * real elements moved by transform each frame, so they stay crisp,
 * clickable, and take images.
 */
export function ReviewGlobe({ reviews }: { reviews: Review[] }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rotRef = useRef(0.4);
  const targetRef = useRef<number | null>(null);
  const activeRef = useRef(0);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const userPausedRef = useRef(false);
  const sideRef = useRef<1 | -1>(1);
  const recentRef = useRef<number[]>([0]);
  const positionsRef = useRef<Projected[]>([]);

  const dots = useMemo(() => fibonacciSphere(DOT_COUNT), []);
  const grid = useMemo(() => graticule(), []);
  const pins = useMemo(() => pinPlacement(reviews.length), [reviews.length]);

  /** Each pin's two nearest neighbours, which its call arcs run to. */
  const partners = useMemo(
    () =>
      pins.map((pin, i) =>
        pins
          .map((other, j) => ({
            j,
            d: pin.vec[0] * other.vec[0] + pin.vec[1] * other.vec[1] + pin.vec[2] * other.vec[2],
          }))
          .filter(({ j }) => j !== i)
          .sort((a, b) => b.d - a.d)
          .slice(0, 2)
          .map(({ j }) => j),
      ),
    [pins],
  );

  const select = useCallback(
    (index: number, turnTo = false) => {
      setActive(index);
      if (turnTo) {
        // The nearest equivalent of -lon, so the globe takes the short way round.
        const goal = -pins[index].lon;
        const turns = Math.round((rotRef.current - goal) / (Math.PI * 2));
        targetRef.current = goal + turns * Math.PI * 2;
      }
    },
    [pins],
  );

  // Mirror state into refs for the animation loop, and pick the card's side
  // once per selection so it does not flip while the pin drifts past centre.
  // Outward, away from the middle, so the card covers as little globe as it can.
  useEffect(() => {
    activeRef.current = active;
    recentRef.current = [active, ...recentRef.current.filter((i) => i !== active)].slice(0, 4);
    const stage = stageRef.current;
    const pos = positionsRef.current[active];
    if (stage && pos) sideRef.current = pos.x > stage.clientWidth / 2 ? 1 : -1;
  }, [active]);

  useEffect(() => {
    userPausedRef.current = userPaused;
  }, [userPaused]);

  // The animation loop: spin, draw, and move the pins and the card.
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!stage || !canvas || !ctx) return;

    let size = 0;
    let dpr = 1;
    let inView = true;
    let frame = 0;
    let last = performance.now();
    let speed = reduced ? 0 : 1;
    let colors = { dot: "", accent: "" };
    let colorsAt = -Infinity;

    const wide = window.matchMedia("(min-width: 64rem)");

    const resize = () => {
      size = stage.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    };
    resize();
    const resizer = new ResizeObserver(resize);
    resizer.observe(stage);

    const watcher = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    watcher.observe(stage);

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.min(now - last, 64);
      last = now;
      if (!inView || size === 0) return;

      // Theme tokens, re-read now and then so a light/dark switch is followed.
      if (now - colorsAt > 1000) {
        const styles = getComputedStyle(stage);
        colors = {
          dot: styles.getPropertyValue("--muted-foreground").trim(),
          accent: styles.getPropertyValue("--primary").trim(),
        };
        colorsAt = now;
      }

      // Spin: ease to a requested pin, otherwise drift, slowing to a stop
      // while anything holds it.
      const held = hoverRef.current || focusRef.current || userPausedRef.current;
      if (targetRef.current !== null) {
        const delta = targetRef.current - rotRef.current;
        rotRef.current += reduced ? delta : delta * Math.min(1, dt * 0.006);
        if (Math.abs(delta) < 0.002) targetRef.current = null;
      } else if (!reduced) {
        speed += ((held ? 0 : 1) - speed) * Math.min(1, dt * 0.005);
        rotRef.current += SPIN * dt * speed;
      }

      const rot = rotRef.current;
      const r = size * RADIUS;
      const c = size / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // Latitude and longitude lines on the near side, faint.
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.16;
      for (const line of grid) {
        ctx.beginPath();
        let drawing = false;
        for (const point of line) {
          const p = project(point, rot);
          if (p.z > 0) {
            if (drawing) ctx.lineTo(c + p.x * r, c - p.y * r);
            else ctx.moveTo(c + p.x * r, c - p.y * r);
            drawing = true;
          } else drawing = false;
        }
        ctx.stroke();
      }

      // Surface dots: the near side bright, the far side a faint echo
      // through the sphere, which is what makes it read as round.
      ctx.fillStyle = colors.dot;
      for (const dot of dots) {
        const p = project(dot, rot);
        if (p.z < 0) {
          ctx.globalAlpha = 0.07;
          ctx.fillRect(c + p.x * r - 0.5, c - p.y * r - 0.5, 1, 1);
          continue;
        }
        ctx.globalAlpha = 0.2 + p.z * 0.6;
        ctx.beginPath();
        ctx.arc(c + p.x * r, c - p.y * r, 0.7 + p.z * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pin positions on screen.
      const positions = pins.map(({ vec }) => {
        const p = project(vec, rot);
        return { x: c + p.x * r, y: c - p.y * r, z: p.z };
      });
      positionsRef.current = positions;

      // Call arcs from the spotlit reviewer to their neighbours, each with a
      // pulse travelling along it.
      const from = activeRef.current;
      ctx.strokeStyle = colors.accent;
      ctx.fillStyle = colors.accent;
      ctx.lineWidth = 1.5;
      partners[from]?.forEach((to, k) => {
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        let drawing = false;
        const steps = 40;
        for (let s = 0; s <= steps; s++) {
          const p = project(arcPoint(pins[from].vec, pins[to].vec, s / steps), rot);
          const x = c + p.x * r;
          const y = c - p.y * r;
          if (p.z > -0.02) {
            if (drawing) ctx.lineTo(x, y);
            else ctx.moveTo(x, y);
            drawing = true;
          } else drawing = false;
        }
        ctx.stroke();

        if (!reduced) {
          const t = ((now / 1700 + k * 0.5) % 1 + 1) % 1;
          const p = project(arcPoint(pins[from].vec, pins[to].vec, t), rot);
          if (p.z > 0) {
            ctx.globalAlpha = Math.sin(Math.PI * t);
            ctx.shadowColor = colors.accent;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(c + p.x * r, c - p.y * r, 2.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // Move the pins: full size in front, shrinking and fading round the back.
      positions.forEach((p, i) => {
        const el = pinRefs.current[i];
        if (!el) return;
        const visible = p.z > 0.08;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${0.62 + Math.max(0, p.z) * 0.38})`;
        el.style.opacity = String(Math.min(1, Math.max(0, (p.z + 0.05) * 3)));
        el.style.zIndex = String(10 + Math.round(Math.max(0, p.z) * 30));
        el.style.pointerEvents = visible ? "auto" : "none";
      });

      // The card follows its pin on wide screens; below that it sits under
      // the globe and the layout places it.
      const card = cardRef.current;
      const pin = positions[from];
      if (!card) return;
      if (!wide.matches || !pin) {
        card.style.transform = "";
        card.style.opacity = "";
        return;
      }

      const w = card.offsetWidth;
      const h = card.offsetHeight;
      // Room the card may take beyond the globe's square before it would
      // leave the section, then flip sides if this one runs out.
      const spare = (window.innerWidth - size) / 2 - 24;
      const fits = (side: 1 | -1) =>
        side === 1 ? pin.x + CARD_GAP + w <= size + spare : pin.x - CARD_GAP - w >= -spare;
      if (!fits(sideRef.current) && fits(sideRef.current === 1 ? -1 : 1)) {
        sideRef.current = sideRef.current === 1 ? -1 : 1;
      }
      const side = sideRef.current;
      const x = side === 1 ? pin.x + CARD_GAP : pin.x - CARD_GAP - w;
      const y = Math.min(Math.max(pin.y - h / 2, -h * 0.15), size - h * 0.85);
      card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      card.style.opacity = String(Math.min(1, Math.max(0, (pin.z - 0.05) * 4)));

      // A dashed tether from the pin to the card's near edge.
      if (pin.z > 0.05) {
        const edgeX = side === 1 ? x : x + w;
        const edgeY = Math.min(Math.max(pin.y, y + 28), y + h - 28);
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 1.25;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(pin.x, pin.y);
        ctx.lineTo(edgeX, edgeY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = colors.accent;
        ctx.beginPath();
        ctx.arc(edgeX, edgeY, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      resizer.disconnect();
      watcher.disconnect();
    };
  }, [dots, grid, pins, partners, reduced]);

  // Walk the spotlight to the next reviewer turning into view: the leftmost
  // front-facing pin not shown recently, since the spin carries pins right.
  useEffect(() => {
    if (reduced || userPaused) return;
    const id = window.setInterval(() => {
      if (hoverRef.current || focusRef.current || targetRef.current !== null) return;
      const positions = positionsRef.current;
      let next = -1;
      positions.forEach((p, i) => {
        if (p.z < 0.45 || recentRef.current.includes(i)) return;
        if (next === -1 || p.x < positions[next].x) next = i;
      });
      if (next !== -1) setActive(next);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, userPaused]);

  const review = reviews[active];

  return (
    <div
      onFocus={() => (focusRef.current = true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) focusRef.current = false;
      }}
    >
      <div
        className="relative mx-auto w-full max-w-xl"
        onPointerEnter={() => (hoverRef.current = true)}
        onPointerLeave={() => (hoverRef.current = false)}
      >
        <div
          ref={stageRef}
          className="relative aspect-square w-full touch-pan-y select-none"
        >
          {/* Glow, the sphere's body, and a slow orbit ring behind the dots. */}
          <div aria-hidden className="pointer-events-none absolute inset-[6%] rounded-full bg-primary/15 blur-3xl" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[8%] rounded-full bg-radial-[at_32%_28%] from-background via-background to-muted shadow-2xl shadow-primary/10 ring-1 ring-border"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[2%] animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-primary/25 motion-reduce:animate-none"
          >
            <span className="absolute top-1/2 -left-1 size-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
          </div>

          <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />

          {/* Pins. Pointer-only: the row of faces below is the accessible
              control for the same thing. */}
          <div aria-hidden>
            {reviews.map((item, i) => (
              <div
                key={item.name}
                ref={(el) => {
                  pinRefs.current[i] = el;
                }}
                className="absolute top-0 left-0 cursor-pointer opacity-0 will-change-transform"
                onPointerEnter={() => select(i)}
                onClick={() => select(i)}
              >
                <span
                  className={cn(
                    "relative flex size-12 rounded-full bg-background p-0.5 shadow-lg ring-2 ring-background transition-[box-shadow,transform] duration-300",
                    i === active ? "scale-110 shadow-primary/30 ring-primary" : "hover:scale-110 hover:ring-primary/60",
                  )}
                >
                  {i === active && (
                    <span className="absolute -inset-2 animate-ping rounded-full border-2 border-primary/50 motion-reduce:animate-none" />
                  )}
                  <Avatar review={item} className="size-full" />
                </span>
              </div>
            ))}
          </div>
        </div>

          {/* The review. Follows its pin on wide screens (positioned by the
              loop above); stacks under the globe below that. */}
          <div
            ref={cardRef}
            id="review-globe-card"
            role="region"
            aria-label={`Review from ${review.name}`}
            className="relative z-50 mx-auto mt-6 w-full max-w-md lg:absolute lg:top-0 lg:left-0 lg:mt-0 lg:w-80 lg:will-change-transform"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="relative gap-0 rounded-2xl border-0 bg-card p-6 shadow-2xl shadow-primary/15 ring-1 ring-primary/15">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-from to-brand-to"
                  />
                  <Quote aria-hidden className="absolute top-5 right-5 size-9 fill-primary/10 text-primary/15" />

                  <span className="flex items-center gap-1 text-primary" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }, (_, index) => (
                      <Star key={index} className="size-4 fill-current" aria-hidden />
                    ))}
                  </span>

                  <blockquote className="mt-4 text-sm leading-relaxed text-pretty text-foreground/80">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>

                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <Avatar review={review} className="size-10 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{review.name}</p>
                      <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <BadgeCheck className="size-3.5 text-primary" aria-hidden />
                        {review.role ?? "Verified Google review"}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {String(active + 1).padStart(2, "0")}/{String(reviews.length).padStart(2, "0")}
                    </span>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
      </div>

      {/* Every reviewer as a face: hover, focus or tap to turn the globe to
          them. This is the keyboard and screen-reader route to each review. */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MousePointerClick className="size-4 text-primary" aria-hidden />
          Hover or tap a pin on the globe, or pick a customer below, to read their review
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div
            role="group"
            aria-label="Customer reviews"
            className="flex flex-wrap justify-center gap-2"
            onPointerLeave={() => (hoverRef.current = false)}
          >
            {reviews.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Read the review from ${item.name}`}
                aria-pressed={i === active}
                aria-controls="review-globe-card"
                onPointerEnter={() => {
                  hoverRef.current = true;
                  select(i, true);
                }}
                onFocus={() => select(i, true)}
                onClick={() => select(i, true)}
                className={cn(
                  "rounded-full p-0.5 ring-2 transition-all duration-200 outline-none hover:-translate-y-0.5 focus-visible:ring-ring",
                  i === active ? "ring-primary" : "ring-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Avatar review={item} className="size-9" />
              </button>
            ))}
          </div>
          {!reduced && (
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="ml-1 rounded-full"
              aria-label={userPaused ? "Resume the globe" : "Pause the globe"}
              onClick={() => setUserPaused((paused) => !paused)}
            >
              {userPaused ? <Play aria-hidden /> : <Pause aria-hidden />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
