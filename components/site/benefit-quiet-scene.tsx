"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import {
  Activity,
  BellOff,
  Building2,
  Check,
  Headset,
  MoonStar,
  Radio,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  ScenePill,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Saturday, 02:00 — the benefit nobody is awake for.
 *
 * The last scenario on the benefits list is the hardest one to show, because
 * what it describes is an absence: something failed, and nobody in the office
 * found out from a customer. So the scene draws the absence. The building
 * stays dark and the phone on the desk never rings, while the three things
 * that did happen happen — the circuit is watched, the fault is raised, an
 * engineer picks it up.
 *
 * Deliberately without a restoration time, a response target or an uptime
 * figure. The copy this illustrates says the fault is usually open before
 * anyone notices, and that is all the scene says too; a clock on a screen is
 * a depicted moment, not a commitment.
 *
 * Stage, parallax and wiring come from scene-kit.
 */

const ASSETS = "/solns-remoteWorkforce/scene";

const ENGINEER = { name: "TJ Woodward", photo: `${ASSETS}/team-tj.webp` };

type Beat = {
  id: string;
  clock: string;
  /** The line on the monitor, and how it reads. */
  state: "clear" | "raised" | "assigned";
  monitor: string;
  note: string;
};

const BEATS: Beat[] = [
  {
    id: "clear",
    clock: "01:58",
    state: "clear",
    monitor: "Circuit healthy",
    note: "Watched from our Global NOC in Chennai, all night, every night.",
  },
  {
    id: "raised",
    clock: "02:14",
    state: "raised",
    monitor: "Fault raised automatically",
    note: "Nobody called it in. Nothing in the building was awake to notice.",
  },
  {
    id: "assigned",
    clock: "02:16",
    state: "assigned",
    monitor: "Engineer assigned",
    note: "By the time anyone opens the door, it is already somebody's job.",
  },
];

const BEAT_S = 4;
const LOOP_S = BEAT_S * BEATS.length;

const SITE: JointSpec = { id: "quiet-site", side: "r", left: "100%", top: "52%" };
const NOC_IN: JointSpec = { id: "quiet-noc-in", side: "l", left: "0%", top: "36%" };
const NOC_OUT: JointSpec = { id: "quiet-noc-out", side: "r", left: "100%", top: "62%" };
const ENG_IN: JointSpec = { id: "quiet-eng", side: "l", left: "0%", top: "40%" };

const STATE_STYLE: Record<
  Beat["state"],
  { icon: LucideIcon; tone: string; word: string }
> = {
  clear: { icon: Check, tone: "bg-primary/15 text-primary", word: "All clear" },
  raised: {
    icon: TriangleAlert,
    tone: "bg-primary text-primary-foreground",
    word: "Fault",
  },
  assigned: {
    icon: Headset,
    tone: "bg-primary text-primary-foreground",
    word: "Assigned",
  },
};

export function BenefitQuietScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the moment the fault was raised.
  const index = still ? 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = BEATS[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/880]"
      wires={[
        { from: SITE.id, to: NOC_IN.id, lit: true },
        { from: NOC_OUT.id, to: ENG_IN.id, lit: now.state === "assigned" },
      ]}
    >
      {/* The building, with nobody in it. */}
      <Layer
        className="top-[20%] left-[3%] w-[19%]"
        depth={0.55}
        order={20}
        joints={[SITE]}
        lit
      >
        <div className="glass-panel flex flex-col gap-[0.75cqw] rounded-[1.4cqw] p-[1cqw]">
          <span className="relative block aspect-[16/10] overflow-hidden rounded-[0.9cqw] border-[0.2cqw] border-card">
            <Image
              src={`${ASSETS}/location-office.webp`}
              alt=""
              fill
              sizes="(min-width: 1152px) 14rem, 22vw"
              loading="eager"
              className="object-cover brightness-[0.55] saturate-[0.6]"
            />
            {/* Night, drawn rather than described. */}
            <span
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-foreground/70 to-foreground/20"
            />
            <span className="absolute bottom-[0.5cqw] left-[0.6cqw] flex items-center gap-[0.35cqw] text-[0.72cqw] font-medium text-card">
              <MoonStar className="size-[0.85cqw]" />
              Closed
            </span>
          </span>

          <span className="flex items-center gap-[0.5cqw]">
            <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-[0.55cqw] bg-accent text-primary">
              <Building2 className="size-1/2" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[0.88cqw] font-semibold">Your office</span>
              <span className="text-[0.7cqw] text-muted-foreground">
                Saturday · nobody in
              </span>
            </span>
          </span>
        </div>
      </Layer>

      {/* The room that is awake. */}
      <Layer
        className="top-[16%] left-[28%] w-[40%]"
        depth={0.45}
        order={30}
        active
        glow
        joints={[NOC_IN, NOC_OUT]}
        lit
      >
        <div className="glass-panel glass-tile-lit flex flex-col gap-[0.85cqw] rounded-[1.5cqw] p-[1.2cqw]">
          <span className="flex items-center gap-[0.65cqw]">
            <span className="flex size-[2.4cqw] shrink-0 items-center justify-center rounded-[0.7cqw] bg-primary text-primary-foreground shadow-md shadow-primary/40">
              <Radio className="size-1/2" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[1.05cqw] font-semibold">
                Global NOC · Chennai
              </span>
              <span className="text-[0.72cqw] text-muted-foreground">
                Monitoring, 24/7
              </span>
            </span>
            <span className="ml-auto font-mono text-[0.95cqw] font-semibold text-primary tabular-nums">
              {now.clock}
            </span>
          </span>

          <span className="h-px bg-border" />

          {/* The three things that happened, in order, none of them by you. */}
          <span className="flex flex-col gap-[0.4cqw]">
            {BEATS.map((beat, step) => {
              const done = step <= index;
              const current = step === index;
              const Icon = STATE_STYLE[beat.state].icon;

              return (
                <span
                  key={beat.id}
                  className={cn(
                    "flex items-center gap-[0.6cqw] rounded-[0.75cqw] px-[0.7cqw] py-[0.5cqw] transition-all duration-700",
                    current
                      ? "bg-accent"
                      : done
                        ? "bg-card/70"
                        : "bg-transparent opacity-35",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[1.7cqw] shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                      done
                        ? STATE_STYLE[beat.state].tone
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="size-1/2" />
                  </span>
                  <span className="text-[0.82cqw] font-medium">
                    {beat.monitor}
                  </span>
                  <span className="ml-auto font-mono text-[0.72cqw] text-muted-foreground tabular-nums">
                    {beat.clock}
                  </span>
                </span>
              );
            })}
          </span>

          {/* The live trace under it all, so the panel reads as watching
              rather than as a checklist that happens to be ticking. */}
          <span className="flex h-[1.6cqw] items-end gap-[0.18cqw]">
            {TRACE.map((height, step) => (
              <span
                key={step}
                className={cn(
                  "wave-bar flex-1 rounded-full",
                  now.state === "clear" ? "bg-primary/35" : "bg-primary/70",
                )}
                style={
                  {
                    height: `${height}%`,
                    "--bar-delay": `${step * 0.05}s`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        </div>
      </Layer>

      {/* Whoever picked it up. */}
      <Layer
        className="top-[30%] left-[74%] w-[23%]"
        depth={0.85}
        order={30}
        active={now.state === "assigned"}
        joints={[ENG_IN]}
        lit={now.state === "assigned"}
      >
        <div
          className={cn(
            "flex flex-col gap-[0.7cqw] rounded-[1.3cqw] border border-border bg-card p-[1cqw] shadow-lg shadow-primary/15 transition-opacity duration-700",
            now.state === "assigned" ? "opacity-100" : "opacity-55",
          )}
        >
          <span className="flex items-center gap-[0.6cqw]">
            <Portrait
              src={ENGINEER.photo}
              halo={now.state === "assigned"}
              className="w-[2.8cqw]"
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[0.88cqw] font-semibold">
                {ENGINEER.name}
              </span>
              <span className="text-[0.7cqw] text-muted-foreground">
                Network operations
              </span>
            </span>
          </span>

          <span
            className={cn(
              "flex items-center gap-[0.45cqw] rounded-[0.7cqw] px-[0.6cqw] py-[0.4cqw] text-[0.74cqw] transition-colors duration-500",
              now.state === "assigned"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            <Activity className="size-[0.85cqw] shrink-0" />
            {now.state === "assigned" ? "On the fault" : "Standing by"}
          </span>
        </div>
      </Layer>

      {/* The phone that did not ring — the whole point, stated last. */}
      <div
        className="parallax absolute top-[74%] left-[30%] w-[40%]"
        style={{ "--depth": 0.7 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.7cqw] rounded-[1.1cqw] px-[1cqw] py-[0.75cqw]">
          <span className="flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <BellOff className="size-1/2" />
          </span>
          <span className="text-[0.9cqw] leading-tight text-pretty">
            {now.note}
          </span>
        </div>
      </div>

      {/* The label, so the hour is never in doubt. */}
      <div
        className="parallax absolute top-[4%] left-[36%] w-[24%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={MoonStar}
          label="Saturday, 02:00"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}

/** A monitoring trace. Shape only — it carries no units and no scale. */
const TRACE = [
  38, 52, 34, 61, 44, 70, 41, 57, 36, 66, 48, 33, 59, 42, 68, 37, 54, 45, 63,
  39, 56, 47, 35, 60,
];
