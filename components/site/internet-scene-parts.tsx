"use client";

import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The parts every internet scene is built from.
 *
 * scene-kit supplies the stage: the backdrop, the parallax layers and the
 * wires that stay plugged into their joints. What it does not supply is the
 * furniture, because the solutions scenes it was written for are made of
 * product screenshots — a softphone, a dashboard, a handset — and these are
 * not. An internet page argues about circuits, addresses, segments and
 * paths, so its scenes are made of panels, tiles, meters and chips instead.
 *
 * Thirteen scenes sharing four primitives is what keeps them reading as one
 * set. Each scene then differs in what it *does* rather than in how a tile
 * is rounded, which is the only difference worth having.
 *
 * Everything here is sized in `cqw` against the stage's container, so a
 * scene scales as a picture does rather than reflowing.
 */

/* ------------------------------------------------------------- panel */

/**
 * The scene's main object: a glass panel with an icon header.
 *
 * `lit` is for the one the scene is currently about. It is a shadow change
 * rather than a scale, because a panel that grows nudges the wires plugged
 * into it and the whole stage appears to breathe.
 */
export function ScenePanel({
  icon: Icon,
  title,
  subtitle,
  aside,
  lit = true,
  tone = "brand",
  className,
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  /** Top-right slot: a clock, a count, a state word. */
  aside?: ReactNode;
  lit?: boolean;
  /** `muted` is for the panel a scene is arguing *against*. */
  tone?: "brand" | "muted";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "glass-panel flex flex-col gap-[0.8cqw] rounded-[1.4cqw] p-[1.1cqw] transition-shadow duration-500",
        lit && "glass-tile-lit",
        className,
      )}
    >
      <div className="flex items-center gap-[0.6cqw]">
        <span
          className={cn(
            "flex size-[2.4cqw] shrink-0 items-center justify-center rounded-[0.7cqw] transition-colors duration-500",
            tone === "brand"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/40"
              : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="size-1/2" />
        </span>

        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-[1.02cqw] font-semibold">{title}</span>
          {subtitle ? (
            <span className="text-[0.72cqw] text-muted-foreground">
              {subtitle}
            </span>
          ) : null}
        </span>

        {aside ? <span className="ml-auto pl-[0.5cqw]">{aside}</span> : null}
      </div>

      {children}
    </div>
  );
}

/* -------------------------------------------------------------- tile */

/**
 * A thing on the network: a device, a site, a service, a rule.
 *
 * `state` drives the status line at the foot. Passing none leaves the tile
 * as a label, which is what most of them are.
 */
export function SceneTile({
  icon: Icon,
  label,
  note,
  status,
  lit = false,
  dim = false,
  className,
}: {
  icon: LucideIcon;
  label: string;
  note?: string;
  /** `tone` colours the dot and the word; `refused` is the one red-flag case. */
  status?: { text: string; tone?: "on" | "off" | "refused" };
  lit?: boolean;
  dim?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass-tile flex flex-col gap-[0.5cqw] rounded-[1.1cqw] p-[0.8cqw] transition-all duration-500",
        lit && "glass-tile-lit",
        dim && "opacity-45",
        className,
      )}
    >
      <span className="flex items-center gap-[0.55cqw]">
        <span
          className={cn(
            "flex size-[1.95cqw] shrink-0 items-center justify-center rounded-[0.55cqw] transition-colors duration-500",
            lit
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-primary",
          )}
        >
          <Icon className="size-1/2" />
        </span>
        <span className="text-[0.9cqw] leading-tight font-semibold text-balance">
          {label}
        </span>
      </span>

      {note ? (
        <span className="text-[0.72cqw] leading-snug text-muted-foreground">
          {note}
        </span>
      ) : null}

      {status ? (
        <span className="flex items-center gap-[0.38cqw] text-[0.7cqw]">
          <span
            className={cn(
              "size-[0.45cqw] shrink-0 rounded-full transition-colors duration-500",
              status.tone === "off"
                ? "bg-muted-foreground/35"
                : status.tone === "refused"
                  ? "bg-foreground/60"
                  : "bg-primary",
            )}
          />
          <span
            className={cn(
              "transition-colors duration-500",
              status.tone === "off"
                ? "text-muted-foreground/60"
                : status.tone === "refused"
                  ? "font-medium text-foreground/70"
                  : "font-medium text-primary",
            )}
          >
            {status.text}
          </span>
        </span>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------- meter */

/**
 * A track that fills.
 *
 * Deliberately never numbered. These pages carry very few verified figures
 * and none of them is a percentage, so a meter here shows proportion between
 * the things beside it and nothing else. Where a real figure exists it is
 * written in the copy, not painted on a bar.
 */
export function SceneMeter({
  label,
  caption,
  fill,
  tone = "brand",
  height = "0.7cqw",
  className,
}: {
  label?: string;
  /** Right-hand word: a state, never a number. */
  caption?: string;
  fill: number;
  tone?: "brand" | "muted" | "shared";
  height?: string;
  className?: string;
}) {
  return (
    <span className={cn("flex flex-col gap-[0.3cqw]", className)}>
      {label || caption ? (
        <span className="flex items-baseline justify-between gap-[0.5cqw]">
          {label ? (
            <span className="text-[0.75cqw] font-medium">{label}</span>
          ) : null}
          {caption ? (
            <span className="text-[0.7cqw] text-muted-foreground">
              {caption}
            </span>
          ) : null}
        </span>
      ) : null}

      <span
        className="relative block w-full overflow-hidden rounded-full bg-muted"
        style={{ height }}
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000 ease-out",
            tone === "brand"
              ? "bg-linear-to-r from-brand-from to-brand-to"
              : tone === "shared"
                ? "bg-primary/35"
                : "bg-muted-foreground/30",
          )}
          style={{ width: `${fill}%` }}
        />
      </span>
    </span>
  );
}

/* -------------------------------------------------------------- chip */

/** A small pill: a state, an address, a label on a wire. */
export function SceneChip({
  icon: Icon,
  label,
  tone = "quiet",
  mono = false,
  className,
}: {
  icon?: LucideIcon;
  label: string;
  tone?: "quiet" | "on" | "off";
  /** Addresses and references are monospaced, so they read as values. */
  mono?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.35cqw] rounded-full px-[0.6cqw] py-[0.25cqw] text-[0.72cqw] font-medium whitespace-nowrap transition-colors duration-500",
        tone === "on"
          ? "bg-primary text-primary-foreground"
          : tone === "off"
            ? "bg-muted text-muted-foreground"
            : "bg-accent text-accent-foreground",
        mono && "font-mono tabular-nums",
        className,
      )}
    >
      {Icon ? <Icon className="size-[0.8cqw] shrink-0" /> : null}
      {label}
    </span>
  );
}

/* ------------------------------------------------------- decoration */

/**
 * The floating icon tiles that keep a stage's corners from falling away.
 *
 * Purely decorative, and the one part of these scenes that carries no
 * meaning at all — which is why it is a helper rather than something each
 * scene reinvents slightly differently.
 */
export function SceneCorners({
  items,
  still,
}: {
  items: { icon: LucideIcon; frame: string; delay?: string }[];
  still: boolean;
}) {
  return (
    <>
      {items.map(({ icon: Icon, frame, delay = "0s" }, index) => (
        <div
          key={frame}
          className={cn("parallax absolute z-0", frame)}
          style={{ "--depth": 0.3 } as CSSProperties}
        >
          <div
            className={cn(
              "glass-tile flex aspect-square items-center justify-center rounded-[1.1cqw] text-primary/70",
              !still && "card-float",
            )}
            style={
              {
                "--float-delay": delay,
                "--float-duration": `${7 + (index % 3)}s`,
              } as CSSProperties
            }
          >
            <Icon className="size-[2.2cqw]" strokeWidth={1.75} />
          </div>
        </div>
      ))}
    </>
  );
}
