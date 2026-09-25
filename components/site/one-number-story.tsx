"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Building2,
  House,
  MapPin,
  PhoneCall,
  Smartphone,
  User,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Remote workforce, told as a three-step story read top to bottom: a
 * customer calls one number, it rings the whole team wherever they are, and
 * the first free person picks up.
 *
 * Replaces the wiring schematic for this page only — readers found a diagram
 * of boxes and wires hard to follow. Each step is a numbered stop on one
 * vertical line with a plain sentence, so the figure reads correctly even
 * standing still; the animation only lights the steps in turn. Each loop a
 * different colleague is busy and a different one answers.
 */

const TEAM = [
  { place: "Office", who: "Colleague at the office", icon: Building2 },
  { place: "Home", who: "Colleague at home", icon: House },
  { place: "Client site", who: "Colleague at a client site", icon: MapPin },
  { place: "Mobile", who: "Colleague on mobile", icon: Smartphone },
];

/** call → ring → answer, then a held beat before the next call. */
const BEATS = 4;
const BEAT_MS = 1600;

export function OneNumberStory() {
  const [ref, seen] = useInView<HTMLDivElement>();
  const still = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!seen || still) return;
    const id = window.setInterval(() => setTick((t) => t + 1), BEAT_MS);
    return () => window.clearInterval(id);
  }, [seen, still]);

  // Reduced motion shows one finished call with every step lit.
  const step = still ? 2 : Math.min(tick % BEATS, 2);
  const call = still ? 0 : Math.floor(tick / BEATS);
  const answering = (call + 1) % TEAM.length;
  const busy = (answering + 2) % TEAM.length;
  const Answerer = TEAM[answering];

  return (
    <Card
      ref={ref}
      className="gap-0 p-5 sm:p-6"
      role="img"
      aria-label="Step 1: a customer calls your business number. Step 2: it rings your whole team at once — at the office, at home, at a client site and on mobile. Step 3: the first colleague who is free picks up, and the customer is connected without knowing where they are."
    >
      <ol className="relative">
        {/* Step 1 */}
        <Step n={1} lit={step >= 0} title="A customer calls your business number">
          <div className="flex items-center gap-2">
            <Party icon={User} label="Customer" />
            <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden />
            <Party
              icon={PhoneCall}
              label="+1 212 ••• ••••"
              mono
              strong
              pulse={step === 0}
            />
          </div>
        </Step>

        {/* Step 2 */}
        <Step
          n={2}
          lit={step >= 1}
          title="It rings your whole team at once, wherever they are"
        >
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TEAM.map(({ place, icon: PlaceIcon }, i) => {
              const status =
                step < 1
                  ? "Waiting"
                  : i === busy
                    ? "Busy"
                    : step === 1
                      ? "Ringing"
                      : i === answering
                        ? "Picked up"
                        : "Stopped";
              const ringing = status === "Ringing";
              const picked = status === "Picked up";

              return (
                <li
                  key={place}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-center transition-all duration-300",
                    picked
                      ? "border-primary bg-primary/5"
                      : ringing
                        ? "border-primary/40"
                        : "border-border",
                    (status === "Busy" || status === "Stopped") && "opacity-55",
                  )}
                >
                  <PlaceIcon
                    className={cn(
                      "size-4",
                      picked || ringing ? "text-primary" : "text-muted-foreground",
                      ringing && "motion-safe:animate-bounce",
                    )}
                    aria-hidden
                  />
                  <span className="text-xs font-medium">{place}</span>
                  <span
                    className={cn(
                      "text-[10px]",
                      picked || ringing ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {status}
                  </span>
                </li>
              );
            })}
          </ul>
        </Step>

        {/* Step 3 */}
        <Step
          n={3}
          lit={step >= 2}
          last
          title="The first free person picks up — you're connected"
        >
          <div
            className={cn(
              "flex items-center gap-2 transition-opacity duration-300",
              step < 2 && "opacity-40",
            )}
          >
            <Party icon={User} label="Customer" />
            <span
              className={cn(
                "flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                step >= 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {step >= 2 ? "Connected" : "…"}
            </span>
            <Party
              icon={Answerer.icon}
              label={Answerer.who}
              strong={step >= 2}
            />
          </div>
        </Step>
      </ol>

      <p className="mt-2 rounded-lg bg-muted/60 px-3 py-2.5 text-xs text-pretty text-muted-foreground">
        <span className="font-medium text-foreground">
          The customer only ever sees one number.
        </span>{" "}
        They never know whether your colleague is in the office, at home or on
        the road.
      </p>
    </Card>
  );
}

/** A numbered stop on the vertical line, with its sentence and picture. */
function Step({
  n,
  lit,
  last,
  title,
  children,
}: {
  n: number;
  lit: boolean;
  last?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative pb-6 pl-11">
      {!last ? (
        <span
          aria-hidden
          className={cn(
            "absolute top-8 bottom-0 left-3.5 w-0.5 -translate-x-1/2 rounded-full transition-colors duration-500",
            lit ? "bg-primary/60" : "bg-border",
          )}
        />
      ) : null}
      <span
        className={cn(
          "absolute top-0 left-0 flex size-7 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold transition-colors duration-300",
          lit
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-muted-foreground",
        )}
      >
        {n}
      </span>
      <p
        className={cn(
          "pt-0.5 text-sm font-medium transition-colors duration-300",
          lit ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </li>
  );
}

/** One end of the call: an icon and who (or what) it is. */
function Party({
  icon: Icon,
  label,
  mono,
  strong,
  pulse,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  mono?: boolean;
  strong?: boolean;
  pulse?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-300",
        strong ? "border-primary/40 bg-primary/5" : "border-border",
      )}
    >
      <span
        className={cn(
          "relative flex size-7 shrink-0 items-center justify-center rounded-full",
          strong ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {pulse ? (
          <span className="absolute inset-0 rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
        ) : null}
        <Icon className="relative size-3.5" aria-hidden />
      </span>
      <span
        className={cn("truncate text-xs font-medium", mono && "font-mono")}
      >
        {label}
      </span>
    </div>
  );
}
