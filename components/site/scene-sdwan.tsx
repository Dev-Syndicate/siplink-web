"use client";

import type { CSSProperties } from "react";
import {
  Cable,
  CloudCog,
  GitBranch,
  Package,
  PhoneCall,
  Radio,
  Settings2,
  Signal,
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
import { sdwanDecisions } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * Two links, and a policy deciding between them moment to moment.
 *
 * The four decisions on this page are written as rules — a call starts, a
 * backup begins, a link degrades, a branch opens — and rules are exactly the
 * thing a reader skims. What they are not told by the list is that all four
 * are happening on the same pair of links, continuously, without anyone
 * being asked.
 *
 * So the scene keeps both links on screen the whole time and moves the
 * traffic between them as each rule fires. The third beat is the one worth
 * waiting for: a link degrades and the traffic has already gone before the
 * warning finishes appearing.
 *
 * The links carry no speed and the meters carry no scale. Which path a thing
 * is on is the claim; how big either path is depends entirely on the site.
 */

const DECISION_ICONS: LucideIcon[] = [PhoneCall, CloudCog, GitBranch, Package];

type Beat = {
  /** Which link voice is on, and which link bulk traffic is on. */
  voice: 0 | 1;
  bulk: 0 | 1;
  /** Health of each link. */
  health: [number, number];
  degraded: boolean;
  /** Whether the beat is about rolling a policy out rather than steering. */
  rollout: boolean;
};

const BEATS: Beat[] = [
  { voice: 0, bulk: 0, health: [96, 92], degraded: false, rollout: false },
  { voice: 0, bulk: 1, health: [96, 92], degraded: false, rollout: false },
  { voice: 1, bulk: 1, health: [34, 92], degraded: true, rollout: false },
  { voice: 0, bulk: 1, health: [96, 92], degraded: false, rollout: true },
];

const LINKS: { label: string; kind: string; icon: LucideIcon }[] = [
  { label: "Link A", kind: "Primary path", icon: Cable },
  { label: "Link B", kind: "Alternative path", icon: Signal },
];

const POLICY: JointSpec[] = [
  { id: "sd-policy-a", side: "r", left: "100%", top: "30%" },
  { id: "sd-policy-b", side: "r", left: "100%", top: "70%" },
];
const LINK_IN: JointSpec[][] = [
  [{ id: "sd-link-a", side: "l", left: "0%", top: "50%" }],
  [{ id: "sd-link-b", side: "l", left: "0%", top: "50%" }],
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * BEATS.length;

export function SdWanPathScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the degraded link, which is the whole sell.
  const index = still ? 2 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = BEATS[index];
  const decision = sdwanDecisions[index];
  const DecisionIcon = DECISION_ICONS[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/900]"
      wires={[
        { from: POLICY[0].id, to: LINK_IN[0][0].id, lit: now.health[0] > 50 },
        { from: POLICY[1].id, to: LINK_IN[1][0].id, lit: true },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Settings2, frame: "top-[8%] left-[3%] w-[5.5%]" },
          { icon: Radio, frame: "top-[82%] left-[92%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* The policy, defined once. */}
      <Layer
        className="top-[22%] left-[2%] w-[34%]"
        depth={0.7}
        order={30}
        active
        glow
        joints={POLICY}
        lit
      >
        <ScenePanel
          icon={DecisionIcon}
          title="One policy, applied centrally"
          subtitle="Defined once, not configured again on site"
          aside={
            <SceneChip
              label={now.rollout ? "New site" : "Steering"}
              tone="on"
            />
          }
        >
          <span className="flex flex-col gap-[0.35cqw]">
            {sdwanDecisions.map((rule, step) => {
              const firing = step === index;
              const Icon = DECISION_ICONS[step];

              return (
                <span
                  key={rule.condition}
                  className={cn(
                    "flex items-center gap-[0.5cqw] rounded-[0.7cqw] px-[0.6cqw] py-[0.4cqw] transition-all duration-500",
                    firing ? "bg-accent" : "bg-card/60 opacity-45",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[1.6cqw] shrink-0 items-center justify-center rounded-[0.45cqw] transition-colors duration-500",
                      firing
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="size-1/2" />
                  </span>
                  <span className="text-[0.78cqw] font-medium text-balance">
                    {rule.condition}
                  </span>
                </span>
              );
            })}
          </span>
        </ScenePanel>
      </Layer>

      {/* The two links it chooses between. */}
      {LINKS.map((link, side) => {
        const carrying = [
          now.voice === side ? "Voice" : null,
          now.bulk === side ? "Backup and bulk" : null,
        ].filter((name): name is string => name !== null);
        const hurt = now.degraded && side === 0;

        return (
          <Layer
            key={link.label}
            className={
              side === 0
                ? "top-[14%] left-[42%] w-[34%]"
                : "top-[52%] left-[42%] w-[34%]"
            }
            depth={side === 0 ? 0.55 : 0.75}
            order={20}
            active={carrying.length > 0}
            joints={LINK_IN[side]}
            lit={carrying.length > 0}
          >
            <ScenePanel
              icon={hurt ? TriangleAlert : link.icon}
              title={`${link.label} · ${link.kind}`}
              subtitle={hurt ? "Degrading" : "Healthy"}
              lit={carrying.length > 0}
              tone={hurt ? "muted" : "brand"}
              aside={
                <SceneChip
                  label={hurt ? "Degraded" : "Good"}
                  tone={hurt ? "off" : "on"}
                />
              }
            >
              <SceneMeter
                label="Path quality"
                caption={hurt ? "Falling away" : "Steady"}
                fill={now.health[side]}
                tone={hurt ? "muted" : "brand"}
                height="0.8cqw"
              />

              <span className="flex min-h-[1.6cqw] flex-wrap items-center gap-[0.4cqw]">
                {carrying.length ? (
                  carrying.map((name) => (
                    <SceneChip
                      key={name}
                      icon={name === "Voice" ? PhoneCall : CloudCog}
                      label={name}
                      tone="on"
                    />
                  ))
                ) : (
                  <span className="text-[0.72cqw] text-muted-foreground">
                    Nothing on it right now
                  </span>
                )}
              </span>
            </ScenePanel>
          </Layer>
        );
      })}

      {/* What the policy just did, and why. */}
      <Layer
        className="top-[32%] left-[80%] w-[18%]"
        depth={0.9}
        order={30}
        active
        joints={[]}
        lit
      >
        <div className="glass-panel glass-tile-lit flex flex-col gap-[0.5cqw] rounded-[1.2cqw] p-[0.95cqw]">
          <span className="flex size-[2cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
            <DecisionIcon className="size-1/2" />
          </span>
          <span className="text-[0.82cqw] leading-tight font-semibold text-balance">
            {decision.condition}
          </span>
          <span className="text-[0.72cqw] leading-snug text-pretty text-muted-foreground">
            {decision.action}
          </span>
        </div>
      </Layer>

      {/* The thing nobody had to do. */}
      <div
        className="parallax absolute top-[84%] left-[6%] w-[52%]"
        style={{ "--depth": 0.6 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.7cqw] rounded-[1.1cqw] px-[1cqw] py-[0.75cqw]">
          <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <GitBranch className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            Nobody was paged, and nobody logged in. The path changed and the
            call carried on.
          </span>
        </div>
      </div>

      {/* Which rule is firing. */}
      <div
        className="parallax absolute top-[5%] left-[8%] w-[30%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={DecisionIcon}
          label="Chosen, moment to moment"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
