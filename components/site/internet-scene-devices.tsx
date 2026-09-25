"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import {
  Lock,
  Search,
  Signal,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import { Portrait } from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * The hardware every internet scene is made of.
 *
 * scene-kit gives the stage and internet-scene-parts gives the panels. This
 * gives the things a reader recognises on sight: a laptop, a handset, a
 * browser window, an access point on a wall, a rack, a person at a desk.
 *
 * It exists because forty-odd scenes cannot each draw their own laptop. The
 * first few did, and the lids came out at four different radii — which is
 * exactly the kind of drift that makes a set of pages look assembled rather
 * than designed. Chrome lives here; what goes on the screen is the scene's
 * own business.
 *
 * Everything is sized in `cqw` against the stage container, so a device
 * scales with the picture rather than reflowing inside it.
 */

const ASSETS = "/solns-remoteWorkforce/scene";

/** The site's cast, so the same faces recur rather than a new set per page. */
export const PEOPLE = {
  aarushi: { name: "Aarushi Peri", photo: `${ASSETS}/team-aarushi.webp` },
  william: { name: "William Meek", photo: `${ASSETS}/team-william.webp` },
  ida: { name: "Ida Jones", photo: `${ASSETS}/team-ida.webp` },
  lei: { name: "Lei Quynh", photo: `${ASSETS}/team-lei.webp` },
  tj: { name: "TJ Woodward", photo: `${ASSETS}/team-tj.webp` },
  priya: { name: "Priya Shah", photo: `${ASSETS}/contact-8.webp` },
  daniel: { name: "Daniel Ortiz", photo: `${ASSETS}/contact-1.webp` },
  marcus: { name: "Marcus Lee", photo: `${ASSETS}/contact-2.webp` },
  elena: { name: "Elena Ruiz", photo: `${ASSETS}/contact-5.webp` },
} as const;

/** The three places the solutions scenes photograph, reused here. */
export const PLACES = {
  office: `${ASSETS}/location-office.webp`,
  home: `${ASSETS}/location-home.webp`,
  go: `${ASSETS}/location-go.webp`,
} as const;

/* ------------------------------------------------------------- laptop */

/**
 * A laptop, open.
 *
 * The deck is not decoration: without it the lid reads as a framed screen,
 * and a framed screen in a scene about a building reads as a poster on a
 * wall. `tone` dims the whole machine for a device the scene is not on.
 */
export function DeviceLaptop({
  children,
  dim,
  className,
}: {
  children: ReactNode;
  dim?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "transition-opacity duration-500",
        dim && "opacity-60",
        className,
      )}
    >
      <div className="rounded-t-[1.2cqw] bg-foreground/90 p-[0.5cqw] pb-[0.8cqw] shadow-2xl shadow-primary/20">
        <span className="mx-auto mb-[0.3cqw] block size-[0.4cqw] rounded-full bg-muted-foreground/60" />
        <div className="flex aspect-[16/10] flex-col overflow-hidden rounded-[0.5cqw] bg-card">
          {children}
        </div>
      </div>
      <div className="relative mx-[-7%] h-[1.3cqw] rounded-b-[1.3cqw] bg-linear-to-b from-card via-muted to-muted-foreground/40 shadow-lg shadow-primary/15">
        <span className="absolute top-0 left-1/2 h-[0.4cqw] w-[14%] -translate-x-1/2 rounded-b-[0.45cqw] bg-muted-foreground/25" />
      </div>
    </div>
  );
}

/** The bar across the top of an app on the laptop. */
export function AppBar({
  title,
  right,
  search,
}: {
  title: string;
  right?: ReactNode;
  search?: string;
}) {
  return (
    <div className="flex items-center gap-[0.7cqw] border-b border-border px-[0.9cqw] py-[0.55cqw]">
      <span className="text-[1.1cqw] font-black tracking-tighter text-primary italic">
        {"//"}
      </span>
      <span className="text-[0.8cqw] font-semibold whitespace-nowrap">
        {title}
      </span>
      {search ? (
        <span className="ml-[0.8cqw] flex flex-1 items-center gap-[0.35cqw] rounded-full bg-muted px-[0.6cqw] py-[0.25cqw] text-[0.66cqw] text-muted-foreground">
          <Search className="size-[0.75cqw]" />
          {search}
        </span>
      ) : null}
      {right ? <span className="ml-auto pl-[0.5cqw]">{right}</span> : null}
    </div>
  );
}

/* -------------------------------------------------------------- phone */

/** A handset. `wifi` swaps the status glyph, which some scenes turn on. */
export function DevicePhone({
  children,
  wifi,
  dim,
  className,
}: {
  children: ReactNode;
  wifi?: boolean;
  dim?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.5cqw] bg-foreground/90 p-[0.32cqw] shadow-2xl shadow-primary/25 transition-opacity duration-500",
        dim && "opacity-60",
        className,
      )}
    >
      <div className="flex aspect-[9/17] flex-col overflow-hidden rounded-[1.25cqw] bg-card">
        <span className="flex items-center justify-between px-[0.6cqw] pt-[0.4cqw]">
          <span className="h-[0.3cqw] w-[22%] rounded-full bg-foreground/70" />
          <span className="flex items-center gap-[0.2cqw] text-foreground/60">
            {wifi ? (
              <Wifi className="size-[0.6cqw]" />
            ) : (
              <Signal className="size-[0.6cqw]" />
            )}
          </span>
        </span>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ browser */

/** A browser window, for anything that happens on a web page. */
export function DeviceBrowser({
  url,
  secure = true,
  children,
  dim,
  className,
}: {
  url: string;
  secure?: boolean;
  children: ReactNode;
  dim?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[0.9cqw] border border-border bg-card shadow-xl shadow-primary/15 transition-opacity duration-500",
        dim && "opacity-60",
        className,
      )}
    >
      <div className="flex items-center gap-[0.5cqw] border-b border-border bg-muted/60 px-[0.7cqw] py-[0.45cqw]">
        <span className="flex gap-[0.25cqw]">
          {["bg-foreground/20", "bg-foreground/20", "bg-foreground/20"].map(
            (tone, index) => (
              <span
                key={index}
                className={cn("size-[0.4cqw] rounded-full", tone)}
              />
            ),
          )}
        </span>
        <span className="flex flex-1 items-center gap-[0.3cqw] rounded-full bg-card px-[0.6cqw] py-[0.2cqw] text-[0.64cqw] text-muted-foreground">
          {secure ? (
            <Lock className="size-[0.6cqw] text-primary" />
          ) : null}
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

/* --------------------------------------------------------- wall plate */

/**
 * A thing mounted on a wall or in a rack: an access point, a switch, a
 * router. `lit` is the one the scene is currently about.
 */
export function DeviceUnit({
  icon: Icon,
  label,
  sub,
  lit,
  stacked,
  className,
}: {
  icon: LucideIcon;
  label: string;
  sub?: string;
  lit?: boolean;
  /** Rack units draw a row of port lights; a wall unit does not. */
  stacked?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[0.4cqw] rounded-[0.8cqw] border border-primary/20 bg-card/85 p-[0.6cqw] shadow-md transition-all duration-500",
        lit ? "shadow-primary/35 ring-1 ring-primary" : "shadow-primary/10",
        className,
      )}
    >
      <span className="flex items-center gap-[0.45cqw]">
        <span
          className={cn(
            "flex size-[1.6cqw] shrink-0 items-center justify-center rounded-[0.4cqw] transition-colors duration-500",
            lit ? "bg-primary text-primary-foreground" : "bg-accent text-primary",
          )}
        >
          <Icon className="size-1/2" />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-[0.74cqw] font-semibold">{label}</span>
          {sub ? (
            <span className="text-[0.62cqw] text-muted-foreground">{sub}</span>
          ) : null}
        </span>
      </span>

      {stacked ? (
        <span className="flex gap-[0.15cqw]">
          {Array.from({ length: 12 }).map((_, port) => (
            <span
              key={port}
              className={cn(
                "h-[0.35cqw] flex-1 rounded-[0.1cqw] transition-colors duration-500",
                lit && port % 3 !== 2 ? "bg-primary" : "bg-muted-foreground/25",
              )}
            />
          ))}
        </span>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------- the people */

/**
 * A person at work: portrait, name, and what they are doing right now.
 *
 * Deliberately a row rather than a card. These appear four and five at a
 * time down the side of a scene, and cards at that size become a grid of
 * boxes competing with whatever the scene is actually about.
 */
export function PersonRow({
  person,
  doing,
  device,
  active,
  className,
}: {
  person: { name: string; photo: string };
  doing: string;
  device?: LucideIcon;
  active?: boolean;
  className?: string;
}) {
  const Device = device;

  return (
    <span
      className={cn(
        "flex items-center gap-[0.55cqw] rounded-[0.75cqw] px-[0.55cqw] py-[0.4cqw] transition-all duration-500",
        active ? "bg-accent" : "bg-card/70 opacity-70",
        className,
      )}
    >
      <Portrait
        src={person.photo}
        halo={active}
        className="w-[2cqw] shrink-0"
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[0.76cqw] font-semibold">{person.name}</span>
        <span
          className={cn(
            "text-[0.66cqw] transition-colors duration-500",
            active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {doing}
        </span>
      </span>
      {Device ? (
        <Device
          className={cn(
            "ml-auto size-[0.9cqw] shrink-0 transition-colors duration-500",
            active ? "text-primary" : "text-muted-foreground/50",
          )}
        />
      ) : null}
    </span>
  );
}

/* ---------------------------------------------------------- the place */

/**
 * A photograph of somewhere, framed as the scenes on /solutions frame them:
 * a thick card border, a soft brand shadow, and grey when it is not the one
 * being talked about.
 */
export function PlaceFrame({
  src,
  ratio = "aspect-[4/5]",
  active = true,
  night,
  caption,
  className,
}: {
  src: string;
  ratio?: string;
  active?: boolean;
  /** Dims and cools the photograph, for a building nobody is in. */
  night?: boolean;
  /**
   * A label burned into the bottom of the frame. Worth passing on any wide
   * crop: these photographs are of rooms with people in them, and at 16/9
   * they crop to a face and stop reading as a place.
   */
  caption?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative block overflow-hidden rounded-[1.3cqw] border-[0.3cqw] border-card shadow-xl shadow-primary/20 transition-[filter,opacity] duration-700",
        ratio,
        !active && "opacity-70 grayscale-[70%]",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1152px) 14rem, 20vw"
        loading="eager"
        className={cn(
          "object-cover",
          night && "brightness-[0.55] saturate-[0.6]",
        )}
      />
      {night || caption ? (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 bg-linear-to-t",
            night
              ? "from-foreground/70 to-foreground/15"
              : "from-foreground/65 to-transparent",
          )}
        />
      ) : null}

      {caption ? (
        <span className="absolute bottom-[0.5cqw] left-[0.7cqw] text-[0.72cqw] font-semibold text-card">
          {caption}
        </span>
      ) : null}
    </span>
  );
}

/* ------------------------------------------------------------ helpers */

/** A soft floating wrapper, for the odd element that should drift. */
export function Drift({
  delay = "0s",
  seconds = 7,
  still,
  className,
  children,
}: {
  delay?: string;
  seconds?: number;
  still: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(!still && "card-float", className)}
      style={
        {
          "--float-delay": delay,
          "--float-duration": `${seconds}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
