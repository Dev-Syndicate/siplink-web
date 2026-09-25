"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneCall } from "lucide-react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { startupSeats } from "@/lib/business-size";
import { cn } from "@/lib/utils";

/** How long the ring lasts before someone picks up. */
const RING_MS = 1900;
/** How long the answered state holds before the line clears. */
const ANSWERED_MS = 2100;
/** The quiet between calls. */
const IDLE_MS = 1200;

type Phase = "idle" | "ringing" | "answered";

/**
 * Startups: one number, and everyone who can answer it.
 *
 * Drawn as a ring rather than a path because at this size there is no path —
 * no receptionist, no queue, no routing tree. A call arrives and every phone
 * lights at once, then one of them takes it and the rest fall quiet. The
 * geometry is the argument.
 *
 * The whole team is on the ring from the start. Screen readers get the single
 * description below rather than the cycle: the phase changes are the telling
 * of the claim, not the claim, and announcing each one would be a stream of
 * noise for something the paragraph beside it already states.
 */
export function SizeRing() {
  const [cycling, setCycling] = useState<Phase>("idle");
  const [answeredBy, setAnsweredBy] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const still = useReducedMotion();

  /* Under reduced motion the ring is simply held mid-call rather than cycling
     — derived here instead of written into state, so the effect below never
     has to set state just to reach a resting position. */
  const phase: Phase = still ? "ringing" : cycling;

  /* The call cycles on its own, because a phone ringing is the one thing on
     this page that happens without anybody asking. */
  useEffect(() => {
    if (still) return;

    const next =
      phase === "ringing"
        ? { to: "answered" as const, after: RING_MS }
        : phase === "answered"
          ? { to: "idle" as const, after: ANSWERED_MS }
          : { to: "ringing" as const, after: IDLE_MS };

    timer.current = window.setTimeout(() => {
      if (next.to === "answered") {
        setAnsweredBy(Math.floor(Math.random() * startupSeats.length));
      }
      setCycling(next.to);
    }, next.after);

    return () => window.clearTimeout(timer.current);
  }, [phase, still]);

  return (
    <div
      role="img"
      aria-label={`One business number with ${startupSeats.length} people on the ring — ${startupSeats
        .map((seat) => seat.role)
        .join(", ")} — whose phones all ring together.`}
      className="relative mx-auto aspect-square w-full max-w-[34rem]"
    >
      {/* Waves leaving the number while it rings. Three on a stagger, so there
          is always one mid-flight rather than a pulse and a gap. */}
      {phase === "ringing" && !still
        ? [0, 1, 2].map((index) => (
            <span
              key={index}
              aria-hidden
              className="ring-wave absolute top-1/2 left-1/2 size-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary"
              style={{ animationDelay: `${index * 0.8}s` }}
            />
          ))
        : null}

      {/* The number everyone shares. */}
      <div
        aria-hidden
        className={cn(
          "absolute top-1/2 left-1/2 flex size-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center transition-colors duration-500",
          phase === "idle"
            ? "border-border bg-card"
            : "border-primary bg-primary text-primary-foreground",
        )}
      >
        <PhoneCall className="size-5" />
        <span className="mt-1 px-2 text-[11px] leading-tight font-medium">
          Your number
        </span>
      </div>

      {startupSeats.map(({ role, device: Device }, index) => {
        // Start at twelve o'clock and go clockwise, so the ring reads in the
        // order a team is introduced rather than in an arbitrary scatter.
        const angle =
          (index / startupSeats.length) * 2 * Math.PI - Math.PI / 2;
        const top = 50 + Math.sin(angle) * 38;
        const left = 50 + Math.cos(angle) * 38;
        const lit = phase === "ringing";
        const isAnswerer = phase === "answered" && answeredBy === index;
        const passedOver = phase === "answered" && answeredBy !== index;

        return (
          <div
            key={role}
            aria-hidden
            className={cn(
              "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 transition-opacity duration-500",
              passedOver ? "opacity-40" : "opacity-100",
            )}
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-full border transition-colors duration-300",
                isAnswerer
                  ? "border-primary bg-primary text-primary-foreground"
                  : lit
                    ? "seat-ring border-primary bg-accent text-primary"
                    : "border-border bg-card text-muted-foreground",
              )}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <Device className="size-5" />
            </span>
            <span className="text-[11px] font-medium whitespace-nowrap">
              {role}
            </span>
          </div>
        );
      })}
    </div>
  );
}
