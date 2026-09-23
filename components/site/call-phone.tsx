"use client";

import { useEffect, useRef, useState } from "react";
import {
  BatteryFull,
  Grid3x3,
  Mic,
  Phone,
  PhoneOff,
  Signal,
  Volume2,
  Wifi,
} from "lucide-react";

import { Iphone } from "@/components/ui/iphone";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** How long the line rings before it is answered. */
const RINGING_MS = 2800;
/** How long the call runs before it ends and the loop comes round. */
const CALL_MS = 6000;

/** Waveform bars. Fixed heights so the shape is a voice, not a bar chart. */
const BARS = [0.4, 0.75, 1, 0.55, 0.9, 0.35, 0.7, 1, 0.5, 0.8, 0.45, 0.65];

function clock(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60,
  ).padStart(2, "0")}`;
}

/**
 * The business line, on the phone in someone's pocket.
 *
 * Two screens on a loop: the call arriving, and the call running. It is on a
 * phone rather than a laptop because the claim the four cards around it make
 * is that a startup's phone system has no hardware in it — the office is
 * wherever the founder is standing.
 *
 * The incoming screen names the menu option the caller chose, which is the
 * one place the IVR card becomes something you can see rather than something
 * you are told.
 *
 * Decorative: everything here is restated by the cards beside it, so the
 * whole device is hidden from assistive tech rather than narrating a call
 * that is not happening.
 */
export function CallPhone() {
  const [connected, setConnected] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const phase = useRef<number | undefined>(undefined);
  const tick = useRef<number | undefined>(undefined);
  const still = useReducedMotion();

  /* Under reduced motion the call is shown already connected and simply held
     — one frame of the story rather than none, and no timers at all. */
  const live = still ? true : connected;

  useEffect(() => {
    if (still) return;

    phase.current = window.setTimeout(
      () => {
        setConnected((current) => !current);
        setSeconds(0);
      },
      connected ? CALL_MS : RINGING_MS,
    );

    return () => window.clearTimeout(phase.current);
  }, [connected, still]);

  /* The duration counts only while a call is up. */
  useEffect(() => {
    if (still || !connected) return;

    tick.current = window.setTimeout(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearTimeout(tick.current);
  }, [connected, seconds, still]);

  return (
    /* The width goes on a wrapper, not on `Iphone`. The frame sets `w-full`
       in its own class list, and a plain `w-*` passed through `className`
       loses to it in the cascade — which collapsed the phone to zero width
       inside a content-sized flex column, while a `sm:` variant won and hid
       the bug on wide screens. Sizing the parent lets `w-full` do its job. */
    <div aria-hidden className="w-[17.5rem] sm:w-[19rem]">
      <Iphone className="drop-shadow-2xl">
        <div className="relative flex size-full flex-col bg-card">
        {/* Status bar and home indicator belong to the screen rather than the
            frame, so they hold steady while the call changes behind them. */}
        <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold">
          <span className="[font-family:var(--font-mono)] tracking-tight">
            9:41
          </span>
          <span className="flex items-center gap-1">
            <Signal className="size-3" />
            <Wifi className="size-3" />
            <BatteryFull className="size-3.5" />
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center px-5 pt-8 pb-7">
          <p className="text-[10px] font-medium tracking-wide text-muted-foreground">
            SipLink
          </p>

          {/* Who is calling, and how they got here. */}
          <div className="relative mt-7">
            {!live ? (
              <>
                <span className="call-pulse absolute inset-0 rounded-full border-2 border-primary" />
                <span
                  className="call-pulse absolute inset-0 rounded-full border-2 border-primary"
                  style={{ animationDelay: "0.9s" }}
                />
              </>
            ) : null}
            <span
              className={cn(
                "relative flex size-20 items-center justify-center rounded-full transition-colors duration-500",
                live
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-primary",
              )}
            >
              <Phone className="size-8" />
            </span>
          </div>

          <p className="mt-5 text-lg font-semibold tracking-tight">
            Sales line
          </p>
          <p className="mt-1 text-center text-[11px] text-muted-foreground">
            {live ? "Connected" : "Chose sales from the menu"}
          </p>

          {/* The running call: duration and a voice on the line. */}
          <p
            className={cn(
              "mt-5 text-2xl font-semibold tabular-nums transition-opacity duration-300 [font-family:var(--font-mono)]",
              live ? "opacity-100" : "opacity-0",
            )}
          >
            {clock(seconds)}
          </p>

          <div
            className={cn(
              "mt-5 flex h-8 items-end gap-[3px] transition-opacity duration-500",
              live ? "opacity-100" : "opacity-0",
            )}
          >
            {BARS.map((height, index) => (
              <span
                key={index}
                className="wave-bar w-[3px] rounded-full bg-primary"
                style={{
                  height: `${height * 100}%`,
                  ["--bar-delay" as string]: `${index * 0.07}s`,
                }}
              />
            ))}
          </div>

          <div className="flex-1" />

          {/* What you can do about it, which differs by which screen it is. */}
          {live ? (
            <>
              <div className="flex w-full justify-center gap-4">
                {[Mic, Grid3x3, Volume2].map((Control, index) => (
                  <span
                    key={index}
                    className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground"
                  >
                    <Control className="size-4" />
                  </span>
                ))}
              </div>
              {/* Near-black rather than the destructive red a phone would
                  normally use here: the brand is already a red, and two reds
                  a few degrees of hue apart in one small screen read as a
                  mistake rather than as a warning. */}
              <span className="mt-5 flex size-14 items-center justify-center rounded-full bg-foreground text-background">
                <PhoneOff className="size-5" />
              </span>
            </>
          ) : (
            <div className="flex w-full items-center justify-between px-3">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <PhoneOff className="size-5" />
              </span>
              <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Phone className="size-5" />
              </span>
            </div>
          )}
        </div>

          <span className="mx-auto mb-2 h-1 w-24 rounded-full bg-foreground/25" />
        </div>
      </Iphone>
    </div>
  );
}
