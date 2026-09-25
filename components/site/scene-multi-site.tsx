"use client";

import type { CSSProperties } from "react";
import {
  Boxes,
  Building2,
  Eye,
  MonitorSmartphone,
  Network,
  Radio,
  Route,
  Store,
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
  SceneTile,
} from "@/components/site/internet-scene-parts";
import { scaleThresholds, siteTiers } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * An estate growing, and the thing that changes when it does.
 *
 * The page makes two arguments that are hard to hold at once: sites are not
 * interchangeable, so they are not sized alike — and what has to change is
 * not any one site but the way all of them are run. A grid of tier cards
 * makes the first point. Only time makes the second, because the whole claim
 * is that the tenth site should be the same work as the second.
 *
 * So the scene grows the estate through the four thresholds the page names,
 * and lights the tiers as they appear. The count on the core is the point of
 * it: the sites multiply and the number of places you have to look does not.
 *
 * The tier names and the thresholds are the ones in lib/internet.ts. The dots
 * are illustrative; no claim is made about any particular estate.
 */

const TIER_ICONS: LucideIcon[] = [Building2, Boxes, Store, MonitorSmartphone];

/** How many of each tier exist at each threshold. Illustrative. */
const GROWTH: number[][] = [
  [1, 1, 2, 1],
  [1, 2, 8, 3],
  [1, 3, 18, 6],
  [1, 4, 30, 9],
];

const CORE: JointSpec[] = [
  { id: "ms-core-l", side: "l", left: "0%", top: "50%" },
  { id: "ms-core-r", side: "r", left: "100%", top: "50%" },
  { id: "ms-core-b", side: "b", left: "50%", top: "100%" },
];
const TIERS: JointSpec = { id: "ms-tiers", side: "r", left: "100%", top: "50%" };
const MAP: JointSpec = { id: "ms-map", side: "l", left: "0%", top: "40%" };
const OPS: JointSpec = { id: "ms-ops", side: "t", left: "50%", top: "0%" };

const BEAT_S = 3;
const LOOP_S = BEAT_S * scaleThresholds.length;

export function MultiSiteScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests at the largest estate, where the argument bites.
  const index = still
    ? scaleThresholds.length - 1
    : Math.floor((t % LOOP_S) / BEAT_S);
  const now = scaleThresholds[index];
  const counts = GROWTH[index];
  const total = counts.reduce((sum, n) => sum + n, 0);

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/920]"
      wires={[
        { from: TIERS.id, to: CORE[0].id, lit: true },
        { from: CORE[1].id, to: MAP.id, lit: true },
        { from: CORE[2].id, to: OPS.id, lit: true },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Route, frame: "top-[72%] left-[7%] w-[5.5%]" },
          { icon: Radio, frame: "top-[72%] left-[88%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* The tiers, because a site is not a site. */}
      <Layer
        className="top-[18%] left-[2%] w-[27%]"
        depth={0.75}
        order={30}
        active
        joints={[TIERS]}
        lit
      >
        <ScenePanel
          icon={Boxes}
          title="Four kinds of site"
          subtitle="Sized for what each one does"
          aside={<SceneChip label={`${total} in all`} tone="on" />}
        >
          <span className="flex flex-col gap-[0.4cqw]">
            {siteTiers.map((tier, step) => (
              <span
                key={tier.tier}
                className="flex items-center gap-[0.5cqw] rounded-[0.7cqw] bg-card/80 px-[0.6cqw] py-[0.4cqw]"
              >
                <span className="flex size-[1.6cqw] shrink-0 items-center justify-center rounded-[0.45cqw] bg-accent text-primary">
                  {(() => {
                    const Icon = TIER_ICONS[step];
                    return <Icon className="size-1/2" />;
                  })()}
                </span>
                <span className="text-[0.78cqw] font-medium">{tier.tier}</span>
                <span className="ml-auto font-mono text-[0.8cqw] font-semibold text-primary tabular-nums">
                  {counts[step]}
                </span>
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* The one platform under all of them. */}
      <Layer
        className="top-[26%] left-[34%] w-[30%]"
        depth={0.45}
        order={20}
        active
        glow
        joints={CORE}
        lit
      >
        <ScenePanel
          icon={Network}
          title="One platform"
          subtitle="Standard builds, one escalation path"
          aside={<SceneChip label={now.scale} tone="on" />}
        >
          <span className="text-[0.8cqw] leading-snug text-pretty text-muted-foreground">
            {now.changes}
          </span>
        </ScenePanel>
      </Layer>

      {/* The estate itself, as dots that multiply. */}
      <Layer
        className="top-[16%] left-[69%] w-[29%]"
        depth={0.6}
        order={30}
        active
        joints={[MAP]}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="The estate"
          subtitle="Opening a site becomes a repeatable process"
        >
          {/* Every site, as a dot. They fill in; nothing else has to. */}
          <span className="flex flex-wrap gap-[0.3cqw]">
            {Array.from({ length: 44 }).map((_, step) => {
              const here = step < total;
              /* Which tier a dot belongs to, so the mix is visible as the
                 estate grows rather than reading as one undifferentiated
                 cloud of branches. */
              let tier = 3;
              let seen = 0;
              for (let i = 0; i < counts.length; i++) {
                seen += counts[i];
                if (step < seen) {
                  tier = i;
                  break;
                }
              }

              return (
                <span
                  key={step}
                  className={cn(
                    "size-[1.1cqw] rounded-[0.25cqw] transition-all duration-700",
                    here
                      ? tier === 0
                        ? "bg-primary"
                        : tier === 1
                          ? "bg-primary/70"
                          : tier === 2
                            ? "bg-primary/45"
                            : "bg-primary/25"
                      : "bg-muted",
                  )}
                />
              );
            })}
          </span>

          <span className="text-[0.72cqw] text-muted-foreground">
            The tenth site is the same work as the second.
          </span>
        </ScenePanel>
      </Layer>

      {/* Seen from one place, whatever the count. */}
      <Layer
        className="top-[72%] left-[32%] w-[34%]"
        depth={0.85}
        order={30}
        active
        joints={[OPS]}
        lit
      >
        <span className="flex gap-[0.5cqw]">
          <SceneTile
            icon={Eye}
            label="One view"
            note="The whole WAN, not a call to each location"
            lit
            className="flex-1"
          />
          <SceneTile
            icon={Radio}
            label="One escalation"
            note="Watched 24/7 from our Chennai NOC"
            lit
            className="flex-1"
          />
        </span>
      </Layer>

      {/* Where the estate has got to. */}
      <div
        className="parallax absolute top-[5%] left-[35%] w-[30%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Route}
          label={now.scale}
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
