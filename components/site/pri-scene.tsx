"use client";

import { Building2, Cable, Cloud, PhoneIncoming, X } from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  Wave,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * What a PRI is, and what moving off it changes.
 *
 * The circuit fills two channels at a time until all twelve are in use. One
 * more caller rings and is refused — engaged, no channel free — because a
 * PRI is a fixed set of physical channels. Then the same line runs on SIP,
 * and the same caller connects, because capacity is no longer the bank.
 *
 * Replaces the wiring schematic that stood here. Drawn for the hero's narrow
 * column, so its type is larger than the full-width capability scenes.
 * Stage, parallax and wiring come from scene-kit.
 */

const TEAM = "/solns-remoteWorkforce/scene";
const CALLERS = "/solns-salesTeam/scene";

const QUEUE = [
  `${CALLERS}/kristine.webp`,
  `${CALLERS}/priya.webp`,
  `${CALLERS}/rahul.webp`,
  `${TEAM}/team-william.webp`,
  `${TEAM}/team-ida.webp`,
];

const EXTRA = { name: "Neha Kapoor", photo: `${CALLERS}/neha.webp` };

const CHANNELS = 12;

/**
 * 0–5 channels fill, 6 one more call rings, 7–8 it is refused,
 * 9 the line moves to SIP, 10–13 the same call connects.
 */
const LOOP_S = 14;

export function PriScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the refused call — the point of the page.
  const s = still ? 8 : t % LOOP_S;
  const inUse = Math.min(CHANNELS, (s + 1) * 2);
  const ringing = s === 6;
  const refused = s === 7 || s === 8;
  const sip = s >= 9;
  const extraOn = s >= 10;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[600/400]"
      wires={[
        { from: "callers", to: "line-in", lit: true },
        { from: "line-out", to: "business", lit: true },
        { from: "extra", to: "line-extra", lit: ringing || extraOn },
      ]}
    >
      {/* Callers */}
      <Layer
        className="top-[8%] left-[1%] w-[27%]"
        depth={0.8}
        order={30}
        joints={[{ id: "callers", side: "r", left: "100%", top: "50%" }]}
        lit
      >
        <div className="flex flex-col gap-[1.4cqw] rounded-[2.6cqw] border border-border bg-card p-[2.2cqw] shadow-lg shadow-primary/10">
          <span className="text-[2cqw] font-semibold tracking-wide text-muted-foreground uppercase">
            Inbound calls
          </span>
          <span className="flex -space-x-[1.4cqw]">
            {QUEUE.map((photo) => (
              <Portrait key={photo} src={photo} className="w-[5cqw]" />
            ))}
          </span>
          <span className="text-[2.4cqw] font-semibold tabular-nums">
            {sip && extraOn ? CHANNELS + 1 : inUse} callers
          </span>
        </div>
      </Layer>

      {/* The line itself */}
      <Layer
        className="top-[4%] left-[33%] w-[36%]"
        depth={0.45}
        order={20}
        joints={[
          { id: "line-in", side: "l", left: "0%", top: "24%" },
          { id: "line-extra", side: "l", left: "0%", top: "84%" },
          { id: "line-out", side: "r", left: "100%", top: "24%" },
        ]}
        lit
      >
        <div
          className={cn(
            "relative flex flex-col gap-[1.6cqw] rounded-[2.8cqw] border bg-card p-[2.2cqw] pt-[4.6cqw] shadow-xl transition-[border-color] duration-500",
            refused
              ? "border-primary/50 shadow-primary/20"
              : "border-border shadow-primary/10",
          )}
        >
          {/* The kit's pill is sized for full-width scenes; this column is
              half that, so the label is drawn at this scene's scale. */}
          <span
            className={cn(
              "absolute -top-[3cqw] left-[2cqw] flex items-center gap-[1cqw] rounded-full bg-card py-[0.6cqw] pr-[2cqw] pl-[0.6cqw] text-[2.2cqw] font-semibold whitespace-nowrap shadow-md transition-shadow duration-500",
              sip
                ? "shadow-primary/30 ring-2 ring-primary"
                : "shadow-primary/15",
            )}
          >
            <span className="flex size-[4.4cqw] items-center justify-center rounded-full bg-primary text-primary-foreground">
              {sip ? (
                <Cloud className="size-1/2" />
              ) : (
                <Cable className="size-1/2" />
              )}
            </span>
            {sip ? "SIP trunk" : "PRI circuit"}
          </span>

          <div className="grid grid-cols-3 gap-[1cqw]">
            {Array.from({ length: CHANNELS + 1 }, (_, i) => {
              const extraSlot = i === CHANNELS;
              const on = extraSlot ? extraOn : i < inUse || sip;
              return (
                <span
                  key={i}
                  className={cn(
                    "flex items-center justify-between rounded-[1cqw] px-[1cqw] py-[0.9cqw] text-[1.8cqw] tabular-nums ring-1 transition-colors duration-500",
                    extraSlot && !sip
                      ? "border-dashed text-muted-foreground/60 ring-border"
                      : on
                        ? "bg-accent font-medium text-accent-foreground ring-primary/30"
                        : "text-muted-foreground ring-border",
                    extraSlot && "col-span-3 justify-center",
                  )}
                  style={{ transitionDelay: `${(i % 2) * 120}ms` }}
                >
                  {extraSlot
                    ? sip
                      ? extraOn
                        ? "ch 13 · added as needed"
                        : "room for more"
                      : "no 13th channel"
                    : `ch ${String(i + 1).padStart(2, "0")}`}
                  {!extraSlot ? (
                    <span
                      className={cn(
                        "size-[1cqw] rounded-full transition-colors duration-500",
                        on ? "bg-primary" : "bg-muted-foreground/25",
                      )}
                    />
                  ) : null}
                </span>
              );
            })}
          </div>

          <span
            className={cn(
              "text-center text-[1.9cqw] transition-colors duration-300",
              refused ? "font-semibold text-primary" : "text-muted-foreground",
            )}
          >
            {sip
              ? "Capacity is not the bank"
              : `${inUse} of ${CHANNELS} channels in use`}
          </span>
        </div>
      </Layer>

      {/* The business */}
      <Layer
        className="top-[8%] left-[74%] w-[25%]"
        depth={0.8}
        order={30}
        joints={[{ id: "business", side: "l", left: "0%", top: "50%" }]}
        lit
      >
        <div className="flex flex-col gap-[1.2cqw] rounded-[2.6cqw] border border-border bg-card p-[2.2cqw] shadow-lg shadow-primary/10">
          <span className="flex size-[5cqw] items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Building2 className="size-1/2" />
          </span>
          <span className="text-[2.2cqw] leading-tight font-semibold">
            Your business
          </span>
          <span className="flex items-center gap-[0.8cqw] text-[1.8cqw] text-muted-foreground tabular-nums">
            <Wave />
            {extraOn ? CHANNELS + 1 : inUse} live
          </span>
        </div>
      </Layer>

      {/* One more call */}
      <Layer
        className="top-[66%] left-[1%] w-[37%]"
        depth={0.95}
        order={40}
        active={ringing || refused || extraOn}
        joints={[{ id: "extra", side: "r", left: "100%", top: "50%" }]}
        lit={ringing || extraOn}
      >
        <div
          className={cn(
            "flex items-center gap-[1.4cqw] rounded-[2.4cqw] border bg-card p-[1.8cqw] shadow-xl transition-[border-color,opacity] duration-500",
            refused ? "border-primary/50" : "border-border",
            s < 6 && "opacity-45",
          )}
        >
          <Portrait
            src={EXTRA.photo}
            ringing={ringing}
            className="w-[5.4cqw]"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[1.7cqw] text-muted-foreground">
              One more call
            </span>
            <span className="text-[2.1cqw] font-semibold">{EXTRA.name}</span>
            <span
              className={cn(
                "mt-[0.3cqw] flex items-center gap-[0.5cqw] text-[1.8cqw] font-medium whitespace-nowrap",
                refused || extraOn ? "text-primary" : "text-muted-foreground",
              )}
            >
              {refused ? (
                <>
                  <X className="size-[1.9cqw]" />
                  Engaged — no channel free
                </>
              ) : extraOn ? (
                <>
                  <PhoneIncoming className="size-[1.9cqw]" />
                  Connected
                </>
              ) : ringing ? (
                "Ringing…"
              ) : (
                "Waiting"
              )}
            </span>
          </span>
        </div>
      </Layer>
    </Scene>
  );
}
