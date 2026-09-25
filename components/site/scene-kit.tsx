"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import Image from "next/image";
import { Phone, type LucideIcon } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * The shared parts of the animated capability scenes (calling-devices-scene,
 * extension-mobility-scene): the frameless stage, parallax layers, and wires
 * that stay plugged into their joints.
 *
 * Depth is parallax rather than 3D. Every layer slides by its own depth —
 * slowly on its own, and towards the pointer while one is over it — so near
 * things travel further than far ones. Nothing is rotated or scaled: a 3D
 * stage (the first version) rasterises each panel and resamples it every
 * frame, which blurred the small UI text. Translation keeps it sharp, keeps
 * the scenes in theme tokens and the page's own fonts, and keeps them out of
 * a 600 kB 3D runtime.
 *
 * Everything is laid out in percentages of a box with the original artwork's
 * aspect ratio and sized in container units, so a scene scales as a picture
 * does. The motion styles (.parallax, .scene-sway, …) live in globals.css.
 */

/* ------------------------------------------------------------ clock */

/** A one-second tick that starts when the scene is first scrolled to. */
export function useSceneClock() {
  const [ref, seen] = useInView<HTMLDivElement>();
  const still = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!seen || still) return;
    const id = window.setInterval(() => setT((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [seen, still]);

  return { ref, still, t };
}

export function clock(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ------------------------------------------------------------ wires */

export type Side = "l" | "r" | "t" | "b";

/** Where a wire leaves an object, and which way it heads out. */
export type JointSpec = { id: string; side: Side; left: string; top: string };

/** A wire between two joint ids. `lit` shows the signal travelling it. */
export type SceneWire = { from: string; to: string; lit: boolean };

const NORMAL: Record<Side, [number, number]> = {
  l: [-1, 0],
  r: [1, 0],
  t: [0, -1],
  b: [0, 1],
};

function locate(root: HTMLElement, id: string, ox: number, oy: number) {
  const el = root.querySelector<HTMLElement>(`[data-joint="${id}"]`);
  if (!el) return null;
  const box = el.getBoundingClientRect();
  return {
    x: box.left + box.width / 2 - ox,
    y: box.top + box.height / 2 - oy,
    side: el.dataset.side as Side,
  };
}

/** A cubic that leaves each joint square to the face it sits on. */
function curve(
  a: { x: number; y: number; side: Side },
  b: { x: number; y: number; side: Side },
) {
  const reach = Math.max(12, Math.hypot(b.x - a.x, b.y - a.y) * 0.45);
  const [ax, ay] = NORMAL[a.side];
  const [bx, by] = NORMAL[b.side];
  const n = (v: number) => v.toFixed(1);
  return `M${n(a.x)} ${n(a.y)} C ${n(a.x + ax * reach)} ${n(a.y + ay * reach)}, ${n(
    b.x + bx * reach,
  )} ${n(b.y + by * reach)}, ${n(b.x)} ${n(b.y)}`;
}

/*
 * Wires run joint to joint, and are measured, not drawn in fixed coordinates.
 *
 * The objects they connect sit at different depths and slide by different
 * amounts, so a path drawn once lands in the right place only while the scene
 * is at rest. Instead each joint is part of its object, and the paths are
 * redrawn in screen space from where the joints actually are — every frame
 * while the scene is on screen; once, and on resize, when still.
 */
function useWirePaths(
  root: RefObject<HTMLDivElement | null>,
  paths: RefObject<SVGPathElement[]>,
  wires: { from: string; to: string }[],
  still: boolean,
) {
  const ends = wires.map(({ from, to }) => `${from}>${to}`).join(",");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const pairs = ends.split(",").map((pair) => pair.split(">"));

    const draw = () => {
      const box = el.getBoundingClientRect();
      const ox = box.left + el.clientLeft;
      const oy = box.top + el.clientTop;

      // Read every joint before writing any path, so a frame costs one layout.
      const shapes = pairs.map(([from, to]) => {
        const a = locate(el, from, ox, oy);
        const b = locate(el, to, ox, oy);
        return a && b ? curve(a, b) : null;
      });

      /* A wire whose joint is gone — its object hidden, say — is cleared
         rather than left where it was last drawn, trailing off to nothing. */
      shapes.forEach((d, i) => {
        for (const path of [paths.current[i * 2], paths.current[i * 2 + 1]]) {
          if (d) path?.setAttribute("d", d);
          else path?.removeAttribute("d");
        }
      });
    };

    if (still) {
      draw();
      const resize = new ResizeObserver(draw);
      resize.observe(el);
      document.fonts?.ready.then(draw);
      return () => resize.disconnect();
    }

    let frame = 0;
    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };
    const visible = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry?.isIntersecting) loop();
    });
    visible.observe(el);

    return () => {
      visible.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [root, paths, ends, still]);
}

/** The glass bead a wire plugs into. Part of its object, so it moves with it. */
export function Joint({
  id,
  side,
  left,
  top,
  lit,
}: JointSpec & { lit: boolean }) {
  return (
    <span
      data-joint={id}
      data-side={side}
      className={cn(
        "absolute z-10 flex size-[1.25cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[0.15cqw] bg-card shadow-sm transition-[border-color,box-shadow] duration-500",
        lit ? "border-primary shadow-primary/50" : "border-primary/40",
      )}
      style={{ left, top }}
    >
      <span
        className={cn(
          "size-[45%] rounded-full transition-colors duration-500",
          lit ? "bg-primary" : "bg-primary/35",
        )}
      />
    </span>
  );
}

/* ------------------------------------------------------------ stage */

/**
 * The frameless stage: a backdrop that fades out at the edges, the wires,
 * and a swaying, pointer-following layer for the scene's objects.
 */
export function Scene({
  sceneRef,
  label,
  still,
  aspect,
  wires,
  backdrop = "full",
  children,
}: {
  sceneRef: RefObject<HTMLDivElement | null>;
  label: string;
  still: boolean;
  /** The original artwork's ratio, as a Tailwind aspect class. */
  aspect: string;
  wires: SceneWire[];
  /**
   * How much ground the stage paints behind itself.
   *
   * A scene given a section of its own is the only thing in that band, so it
   * can take the full grid. One sitting in a hero column is not — it has a
   * heading, a paragraph and two buttons beside it — so `soft` draws the
   * grid fainter, and `none` paints nothing at all, for a stage whose own
   * cards are meant to sit on plain white.
   */
  backdrop?: "full" | "soft" | "none";
  children: ReactNode;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const paths = useRef<SVGPathElement[]>([]);
  useWirePaths(sceneRef, paths, wires, still);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (still || !stage.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    stage.current.style.setProperty("--tilt-x", x.toFixed(3));
    stage.current.style.setProperty("--tilt-y", y.toFixed(3));
  }

  function settle() {
    stage.current?.style.setProperty("--tilt-x", "0");
    stage.current?.style.setProperty("--tilt-y", "0");
  }

  return (
    <div
      ref={sceneRef}
      role="img"
      aria-label={label}
      onPointerMove={tilt}
      onPointerLeave={settle}
      className={cn("@container relative w-full", aspect)}
    >
      {/* No frame: the scene sits straight on the page. The backdrop is a
          faint dot grid in the foreground colour — neutral, so it reads as a
          surface rather than a pink wash competing with the cards — masked
          to fade out well before the edges. `soft` draws it fainter, for a
          scene sharing a hero column with copy; `none` paints nothing. */}
      <div
        aria-hidden
        hidden={backdrop === "none"}
        className={cn(
          "scene-grid absolute inset-0",
          backdrop === "soft" && "opacity-60",
        )}
      />

      {/* Wires, in screen space. Behind the stage, so each one runs under the
          joints it connects. Paths are filled in by useWirePaths. */}
      <svg
        aria-hidden
        className="absolute inset-0 size-full overflow-visible"
        fill="none"
      >
        {wires.map(({ from, to, lit }, i) => (
          <g key={`${from}>${to}`} strokeLinecap="round">
            <path
              ref={(el) => {
                if (el) paths.current[i * 2] = el;
              }}
              className="stroke-primary/30"
              strokeWidth={2.5}
            />
            <path
              ref={(el) => {
                if (el) paths.current[i * 2 + 1] = el;
              }}
              pathLength={100}
              className={cn(
                "signal-path stroke-primary transition-opacity duration-500",
                !lit && "opacity-0",
              )}
              strokeWidth={3}
            />
          </g>
        ))}
      </svg>

      <div className={cn("absolute inset-0", !still && "scene-sway")}>
        <div ref={stage} className="scene-pointer absolute inset-0">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * An object in the scene. `depth` sets how far it slides; `order` its resting
 * stack. An active one rises a little and comes to the front — lifted by a
 * translation, never a scale, so it stays sharp.
 */
export function Layer({
  className,
  style,
  depth,
  order,
  active = false,
  glow = active,
  joints = [],
  lit = false,
  children,
}: {
  className: string;
  style?: CSSProperties;
  depth: number;
  order: number;
  active?: boolean;
  glow?: boolean;
  joints?: JointSpec[];
  lit?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "parallax absolute transition-[filter] duration-700 ease-out",
        glow && "device-lit",
        className,
      )}
      style={
        {
          ...style,
          "--depth": depth,
          "--lift": active ? "0.9cqw" : "0cqw",
          zIndex: active ? 40 : order,
        } as CSSProperties
      }
    >
      {children}
      {joints.map((spec) => (
        <Joint key={spec.id} {...spec} lit={lit} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ UI bits */

/**
 * A label for a panel, device or place: a solid white pill with its icon in a
 * solid brand disc. Solid rather than glass so it reads over whatever it
 * overlaps. `active` rings it, for the one the scene is on.
 */
export function ScenePill({
  icon: Icon,
  label,
  size = "sm",
  active,
  className,
}: {
  icon: LucideIcon;
  label: string;
  size?: "sm" | "md";
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center rounded-full bg-card font-semibold whitespace-nowrap shadow-md transition-shadow duration-500",
        size === "md"
          ? "gap-[0.7cqw] py-[0.35cqw] pr-[1.2cqw] pl-[0.35cqw] text-[1.05cqw]"
          : "gap-[0.55cqw] py-[0.3cqw] pr-[0.9cqw] pl-[0.3cqw] text-[0.9cqw]",
        active
          ? "shadow-primary/40 ring-2 ring-primary"
          : "shadow-primary/15",
        className,
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-primary text-primary-foreground",
          size === "md" ? "size-[2.4cqw]" : "size-[1.9cqw]",
        )}
      >
        <Icon className="size-1/2" />
      </span>
      {label}
    </span>
  );
}

export function Portrait({
  src,
  ringing,
  halo,
  className,
}: {
  src: string;
  ringing?: boolean;
  halo?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative block aspect-square shrink-0 rounded-full",
        halo && "halo bg-primary/10 p-[0.55cqw]",
        className,
      )}
    >
      <span
        className={cn(
          "relative block size-full overflow-hidden rounded-full border-[0.2cqw] border-card bg-muted shadow-md shadow-primary/20",
          ringing && "ring-pulse",
        )}
      >
        {/* Eager: these are a few kB each, and lazy loading has misjudged
            their visibility inside a transformed layer before. */}
        <Image
          src={src}
          alt=""
          fill
          sizes="12vw"
          loading="eager"
          className="object-cover"
        />
      </span>
    </span>
  );
}

export function Control({
  icon: Icon,
  hangup,
  label,
  className,
}: {
  icon: LucideIcon;
  hangup?: boolean;
  label?: string;
  className?: string;
}) {
  const button = (
    <span
      className={cn(
        "flex aspect-square items-center justify-center rounded-full shadow-sm",
        hangup
          ? "bg-primary text-primary-foreground shadow-primary/40"
          : "bg-card text-foreground/80 ring-1 ring-border",
        label ? "w-full" : className,
      )}
    >
      <Icon className="size-1/2" />
    </span>
  );

  if (!label) return button;

  return (
    <span className={cn("flex flex-col items-center gap-[0.3cqw]", className)}>
      {button}
      <span className="text-[0.7cqw] whitespace-nowrap text-muted-foreground">
        {label}
      </span>
    </span>
  );
}

export function Wave() {
  return (
    <span className="flex h-[1.5cqw] items-center gap-[0.22cqw]">
      {[0, 0.15, 0.3, 0.45, 0.6, 0.45, 0.3, 0.15, 0].map((delay, i) => (
        <span
          key={i}
          className="wave-bar h-full w-[0.22cqw] rounded-full bg-primary"
          style={{ "--bar-delay": `${delay}s` } as CSSProperties}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------ app chrome */

/** The SipLink app's mark: a phone in a brand tile, then the name. */
export function AppMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center gap-[0.55cqw] text-[1.05cqw] font-semibold",
        className,
      )}
    >
      <span className="flex size-[2cqw] items-center justify-center rounded-[0.55cqw] bg-primary text-primary-foreground">
        <Phone className="size-1/2" />
      </span>
      SipLink
    </span>
  );
}

export type NavItem = { icon: LucideIcon; label: string; badge?: number };

/** The app's left-hand navigation, with one item current. */
export function AppNav({
  items,
  active,
  className,
}: {
  items: NavItem[];
  active: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[0.3cqw] border-r border-border p-[0.8cqw] text-[0.75cqw] text-muted-foreground",
        className,
      )}
    >
      <AppMark className="mb-[0.8cqw] px-[0.3cqw] text-foreground" />
      {items.map(({ icon: Icon, label, badge }) => {
        const on = label === active;
        return (
          <span
            key={label}
            className={cn(
              "flex items-center gap-[0.5cqw] rounded-[0.5cqw] px-[0.5cqw] py-[0.45cqw] transition-colors duration-300",
              on && "bg-accent font-medium text-accent-foreground",
            )}
          >
            <Icon className={cn("size-[0.9cqw]", on && "text-primary")} />
            {label}
            {badge ? (
              <span className="ml-auto flex size-[1.1cqw] items-center justify-center rounded-full bg-primary text-[0.55cqw] font-semibold text-primary-foreground">
                {badge}
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
