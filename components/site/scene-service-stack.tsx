"use client";

import type { CSSProperties } from "react";
import {
  Boxes,
  Globe,
  Layers,
  Network,
  ShieldCheck,
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
  ScenePanel,
} from "@/components/site/internet-scene-parts";
import { internetStack } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * Where the service you are reading about sits, and what goes above it.
 *
 * The three connectivity hubs are orientation pages: their job is to get a
 * reader to the right child page, and their children each now carry a scene
 * of their own. What the hub itself can add is the thing none of the
 * children can, because each child is inside one service — the shape of the
 * whole, and where this one is in it.
 *
 * So all three hubs get the same picture with a different thing lit, which
 * is deliberate and is said out loud in the copy above it. A reader who
 * arrives on Static IP and one who arrives on Dedicated Internet should come
 * away with the same mental model and a different highlight in it.
 *
 * The tiers and their contents are internetStack, so this cannot drift from
 * the diagram on /internet that uses the same data.
 *
 * Nothing is claimed about what any business needs. The layers above the
 * connection are options, and the scene says so.
 */

const TIER_ICONS: LucideIcon[] = [Globe, ShieldCheck, Network, Boxes];

/** How each connectivity service is named inside internetStack's base tier. */
const LABELS: Record<string, string> = {
  "business-broadband": "Business Broadband",
  "dedicated-internet": "Dedicated Internet",
  "static-ip": "Static IP",
};

const BASE: JointSpec[] = [
  { id: "stk-base", side: "t", left: "50%", top: "0%" },
];
const UPPER: JointSpec[] = [
  { id: "stk-upper", side: "b", left: "50%", top: "100%" },
];

const BEAT_S = 2.5;

export function ServiceStackScene({
  label,
  slug,
}: {
  label: string;
  /** Which of the three connectivity services this hub is. */
  slug: string;
}) {
  const { ref, still, t } = useSceneClock();

  const upper = internetStack.slice(1);
  const loop = BEAT_S * upper.length;
  // Reduced motion rests with every layer shown.
  const reached = still ? upper.length : Math.floor((t % loop) / BEAT_S) + 1;
  const mine = LABELS[slug];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/900]"
      wires={[{ from: BASE[0].id, to: UPPER[0].id, lit: true }]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Layers, frame: "top-[12%] left-[3%] w-[5.5%]" },
          { icon: Globe, frame: "top-[74%] left-[92%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* What can go on top, once the line is there. */}
      <Layer
        className="top-[14%] left-[16%] w-[68%]"
        depth={0.5}
        order={20}
        active
        joints={UPPER}
        lit
      >
        <ScenePanel
          icon={Layers}
          title="What layers onto it"
          subtitle="Options, on the same service and the same support"
          aside={<SceneChip label="Add as you need" />}
        >
          <span className="flex gap-[0.5cqw]">
            {upper.map((tier, step) => {
              const on = step < reached;
              const Icon = TIER_ICONS[step + 1] ?? Boxes;

              return (
                <span
                  key={tier.tier}
                  className={cn(
                    "flex flex-1 flex-col gap-[0.45cqw] rounded-[0.9cqw] p-[0.7cqw] transition-all duration-700",
                    on ? "bg-accent" : "bg-card/50 opacity-40",
                  )}
                >
                  <span className="flex items-center gap-[0.45cqw]">
                    <span
                      className={cn(
                        "flex size-[1.7cqw] shrink-0 items-center justify-center rounded-[0.5cqw] transition-colors duration-500",
                        on
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="size-1/2" />
                    </span>
                    <span className="flex min-w-0 flex-col leading-tight">
                      <span className="text-[0.82cqw] font-semibold">
                        {tier.tier}
                      </span>
                      <span className="text-[0.66cqw] text-muted-foreground">
                        {tier.caption}
                      </span>
                    </span>
                  </span>

                  <span className="flex flex-wrap gap-[0.3cqw]">
                    {tier.items.map((item) => (
                      <span
                        key={item.label}
                        className={cn(
                          "rounded-full px-[0.5cqw] py-[0.2cqw] text-[0.66cqw] transition-colors duration-500",
                          on
                            ? "bg-card/80 text-foreground"
                            : "bg-muted text-muted-foreground/70",
                        )}
                      >
                        {item.label}
                      </span>
                    ))}
                  </span>
                </span>
              );
            })}
          </span>
        </ScenePanel>
      </Layer>

      {/* The line itself, with the one you are reading about lit. */}
      <Layer
        className="top-[58%] left-[22%] w-[56%]"
        depth={0.75}
        order={30}
        active
        glow
        joints={BASE}
        lit
      >
        <ScenePanel
          icon={Globe}
          title={internetStack[0].tier}
          subtitle={internetStack[0].caption}
          aside={<SceneChip label="You are here" tone="on" />}
        >
          <span className="flex gap-[0.5cqw]">
            {internetStack[0].items.map((item) => {
              const on = item.label === mine;

              return (
                <span
                  key={item.label}
                  className={cn(
                    "flex flex-1 items-center justify-center rounded-[0.8cqw] px-[0.6cqw] py-[0.6cqw] text-center text-[0.8cqw] font-semibold text-balance transition-all duration-500",
                    on
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/40"
                      : "bg-card/70 text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              );
            })}
          </span>

          <span className="text-[0.74cqw] text-muted-foreground">
            The connection is the layer everything above it runs on.
          </span>
        </ScenePanel>
      </Layer>

      {/* Said once, at the top. */}
      <div
        className="parallax absolute top-[3%] left-[30%] w-[40%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Layers}
          label="One design, not a line and good luck"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
