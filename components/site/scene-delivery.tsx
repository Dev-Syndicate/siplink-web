"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Cable,
  CalendarCheck,
  ClipboardCheck,
  HardHat,
  MapPinned,
  Radio,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Scene,
  ScenePill,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import {
  SceneChip,
  SceneCorners,
  SceneMeter,
  ScenePanel,
} from "@/components/site/internet-scene-parts";
import { internetDelivery } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * From order to live circuit, as the build it actually is.
 *
 * The section this sits under says connectivity is a build rather than a
 * download, and then lists five steps — which is the right content in the
 * wrong medium, because a list of five boxes reads as five boxes rather than
 * as weeks passing. A rail that fills is the cheapest way to say "this takes
 * time and here is where it is".
 *
 * The third station carries the caveat the copy is careful to make, and the
 * scene is careful too: permissions are named as the one thing outside our
 * control rather than quietly skipped so the rail can look smooth.
 *
 * No lead time appears anywhere. The page says the date comes from your
 * location and connectivity type rather than a standard figure, so a scene
 * that painted weeks on a timeline would contradict the sentence above it.
 */

const STATION_ICONS: LucideIcon[] = [
  MapPinned,
  CalendarCheck,
  HardHat,
  ClipboardCheck,
  Radio,
];

/** What the rail has reached by the end of each step. */
const PROGRESS = [14, 32, 62, 84, 100];

const SITE: JointSpec[] = [
  { id: "del-site", side: "r", left: "100%", top: "50%" },
];
const RAIL: JointSpec[] = [
  { id: "del-rail-in", side: "l", left: "0%", top: "50%" },
  { id: "del-rail-out", side: "r", left: "100%", top: "50%" },
];
const NOC: JointSpec[] = [
  { id: "del-noc", side: "l", left: "0%", top: "50%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * internetDelivery.length;

export function DeliveryScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the live, monitored circuit.
  const index = still
    ? internetDelivery.length - 1
    : Math.floor((t % LOOP_S) / BEAT_S);
  const now = internetDelivery[index];
  const live = index === internetDelivery.length - 1;
  const Icon = STATION_ICONS[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/820]"
      wires={[
        { from: SITE[0].id, to: RAIL[0].id, lit: true },
        { from: RAIL[1].id, to: NOC[0].id, lit: live },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Cable, frame: "top-[10%] left-[3%] w-[5%]" },
          { icon: Building2, frame: "top-[10%] left-[92%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* Where the build has got to. */}
      <div
        className="parallax absolute top-[5%] left-[32%] w-[36%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Icon}
          label={`Step ${String(index + 1).padStart(2, "0")} · ${now.title}`}
          size="md"
          active
          className="mx-auto"
        />
      </div>

      {/* Your address, where it all has to land. */}
      <Layer
        className="top-[32%] left-[1.5%] w-[19%]"
        depth={0.8}
        order={30}
        active
        joints={SITE}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="Your address"
          subtitle="Where the build has to reach"
          aside={<SceneChip label="Day one" />}
        />
      </Layer>

      {/* The five stations, and the rail through them. */}
      <Layer
        className="top-[24%] left-[24%] w-[52%]"
        depth={0.45}
        order={20}
        active
        glow
        joints={RAIL}
        lit
      >
        <ScenePanel
          icon={Cable}
          title="From order to live circuit"
          subtitle="A build, not a download"
          aside={
            <SceneChip
              label={live ? "Live" : "In build"}
              tone={live ? "on" : "quiet"}
            />
          }
        >
          <SceneMeter
            fill={PROGRESS[index]}
            caption="Dates come from your location, not a standard lead time"
            height="0.8cqw"
          />

          {/* One station per step. The rail above says how far; these say
              which part of the work that is. */}
          <span className="flex items-start gap-[0.4cqw]">
            {internetDelivery.map((step, position) => {
              const done = position <= index;
              const StepIcon = STATION_ICONS[position];

              return (
                <span
                  key={step.title}
                  className="flex flex-1 flex-col items-center gap-[0.35cqw] text-center"
                >
                  <span
                    className={cn(
                      "flex size-[2cqw] items-center justify-center rounded-full transition-all duration-500",
                      done
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/40"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <StepIcon className="size-1/2" />
                  </span>
                  <span
                    className={cn(
                      "text-[0.68cqw] leading-tight font-medium text-balance transition-colors duration-500",
                      position === index
                        ? "text-primary"
                        : done
                          ? "text-foreground"
                          : "text-muted-foreground/60",
                    )}
                  >
                    {step.title}
                  </span>
                </span>
              );
            })}
          </span>
        </ScenePanel>
      </Layer>

      {/* And who has it afterwards. */}
      <Layer
        className="top-[32%] left-[80%] w-[19%]"
        depth={0.8}
        order={30}
        active={live}
        joints={NOC}
        lit={live}
      >
        <ScenePanel
          icon={Radio}
          title="Chennai NOC"
          subtitle="Watching it from day one"
          lit={live}
          tone={live ? "brand" : "muted"}
          aside={
            <SceneChip
              label={live ? "24/7" : "Waiting"}
              tone={live ? "on" : "off"}
            />
          }
        />
      </Layer>

      {/* What this step is, in the page's own words. */}
      <div
        className="parallax absolute top-[66%] left-[14%] w-[72%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-start gap-[0.75cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.85cqw]">
          <span className="mt-[0.15cqw] flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Icon className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            {now.body}
          </span>
        </div>
      </div>

      {/* The one honest exception, kept on screen at the step it belongs to. */}
      <div
        className="parallax absolute top-[87%] left-[26%] w-[48%]"
        style={{ "--depth": 0.7 } as CSSProperties}
      >
        <div
          className={cn(
            "glass-panel flex items-center justify-center gap-[0.5cqw] rounded-full px-[1cqw] py-[0.5cqw] transition-opacity duration-700",
            index === 2 ? "opacity-100" : "opacity-0",
          )}
        >
          <TriangleAlert className="size-[1cqw] shrink-0 text-primary" />
          <span className="text-[0.78cqw] font-medium">
            Permissions are the one thing outside our control
          </span>
        </div>
      </div>
    </Scene>
  );
}
