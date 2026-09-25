"use client";

import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Building2,
  Cloud,
  Scale,
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
import { symmetryFlows } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * Symmetry, drawn as a mirror rather than as two lanes.
 *
 * The Plans page already has an up-and-down scene, and it makes the opposite
 * point: there, the two lanes are deliberately unequal and the argument is
 * that the narrow one is the one that hurts. Here the argument is that they
 * are the same, so the scene is built around an axis instead of a pair of
 * roads — the cloud above, the office below, and the six kinds of traffic
 * crossing between them in both directions at once.
 *
 * Each flow rises or falls according to the direction lib/internet.ts gives
 * it, so the column cannot drift from the prose. The two meters either side
 * of the axis read the same, which is the whole claim.
 *
 * No figure appears. "Symmetrical" is stated in the copy where the spec
 * confirms it; the scene shows equality, not a speed.
 */

const OFFICE: JointSpec[] = [
  { id: "sym-office-up", side: "t", left: "34%", top: "0%" },
  { id: "sym-office-down", side: "t", left: "66%", top: "0%" },
];
const CLOUD: JointSpec[] = [
  { id: "sym-cloud-up", side: "b", left: "34%", top: "100%" },
  { id: "sym-cloud-down", side: "b", left: "66%", top: "100%" },
];

/** One flow takes its turn at a time, so each is legible on its own. */
const BEAT_S = 2;
const LOOP_S = BEAT_S * symmetryFlows.length;

const DIRECTION: Record<
  (typeof symmetryFlows)[number]["direction"],
  { icon: LucideIcon; word: string }
> = {
  up: { icon: ArrowUp, word: "Outbound" },
  down: { icon: ArrowDown, word: "Inbound" },
  both: { icon: ArrowUpDown, word: "Both at once" },
};

export function SymmetryScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on video calls — the flow that is both at once.
  const index = still ? 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = symmetryFlows[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/980]"
      wires={[
        { from: OFFICE[0].id, to: CLOUD[0].id, lit: now.direction !== "down" },
        { from: CLOUD[1].id, to: OFFICE[1].id, lit: now.direction !== "up" },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: ArrowUp, frame: "top-[44%] left-[3%] w-[5.5%]" },
          { icon: ArrowDown, frame: "top-[44%] left-[91.5%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* Above the line: everything the work actually lives in. */}
      <Layer
        className="top-[5%] left-[28%] w-[44%]"
        depth={0.4}
        order={20}
        joints={CLOUD}
        lit
      >
        <ScenePanel
          icon={Cloud}
          title="Cloud, customers, colleagues"
          subtitle="Everything on the far side of the line"
          aside={<SceneChip label="The internet" />}
        />
      </Layer>

      {/* The axis: the two halves, and the claim that they match. */}
      <div
        className="parallax absolute top-[33%] left-[19%] w-[62%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel glass-tile-lit flex items-center gap-[1.2cqw] rounded-[1.4cqw] px-[1.2cqw] py-[1cqw]">
          <SceneMeter
            label="Up"
            caption={DIRECTION[now.direction].word}
            fill={now.direction === "down" ? 34 : 88}
            height="1cqw"
            className="flex-1"
          />

          <span className="flex flex-col items-center gap-[0.3cqw]">
            <span className="flex size-[2.4cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
              <Scale className="size-1/2" />
            </span>
            <span className="text-[0.7cqw] font-semibold whitespace-nowrap">
              Same either way
            </span>
          </span>

          <SceneMeter
            label="Down"
            caption={DIRECTION[now.direction].word}
            fill={now.direction === "up" ? 34 : 88}
            height="1cqw"
            className="flex-1"
          />
        </div>
      </div>

      {/* The six, each pointing the way it actually travels. */}
      <div
        className="parallax absolute top-[54%] left-[6%] w-[88%]"
        style={{ "--depth": 0.7 } as CSSProperties}
      >
        <div className="grid grid-cols-6 gap-[0.6cqw]">
          {symmetryFlows.map((flow, step) => {
            const on = step === index;
            const Icon = DIRECTION[flow.direction].icon;

            return (
              <div
                key={flow.label}
                className={cn(
                  "glass-tile flex flex-col items-center gap-[0.45cqw] rounded-[1.1cqw] px-[0.6cqw] py-[0.8cqw] text-center transition-all duration-500",
                  on ? "glass-tile-lit" : "opacity-55",
                )}
              >
                <span
                  className={cn(
                    "flex size-[2cqw] items-center justify-center rounded-full transition-colors duration-500",
                    on
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-primary",
                    /* The glyph drifts the way its traffic goes, so the
                       direction is readable without the caption. */
                    !still && on && flow.direction === "up" && "flow-up",
                    !still && on && flow.direction === "down" && "flow-down",
                  )}
                >
                  <Icon className="size-1/2" />
                </span>
                <span className="text-[0.8cqw] leading-tight font-semibold text-balance">
                  {flow.label}
                </span>
                <span className="text-[0.66cqw] text-muted-foreground">
                  {DIRECTION[flow.direction].word}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Below the line: the building it all has to reach. */}
      <Layer
        className="top-[83%] left-[28%] w-[44%]"
        depth={0.4}
        order={20}
        joints={OFFICE}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="Your office"
          subtitle="Sending as much as it receives"
          aside={<SceneChip icon={ArrowUpDown} label="Both ways" tone="on" />}
        />
      </Layer>

      {/* What the current flow is, in its own words. */}
      <div
        className="parallax absolute top-[24%] left-[30%] w-[40%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={DIRECTION[now.direction].icon}
          label={`${now.label} · ${DIRECTION[now.direction].word.toLowerCase()}`}
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
