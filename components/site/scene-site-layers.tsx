"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Cloud,
  GitBranch,
  Link2,
  Network,
  Router,
  Store,
  Wifi,
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
import { cn } from "@/lib/utils";

/**
 * All six network services, in the one building they belong to.
 *
 * The hub above lists them as six cards, which is the right way to let
 * somebody pick one and the wrong way to show that they are not six separate
 * purchases. They sit in different places in the same site: the router at the
 * edge, the switch in the cabinet, the access points in the ceiling, and two
 * of them not in the building at all.
 *
 * So the scene is a section through one site, and each service lights where
 * it physically lives. The two that reach outside — the VPN and the WAN —
 * light outside it, which is the distinction the card grid cannot draw.
 *
 * Nothing here is sized, counted or priced. Where a thing sits is the only
 * claim, and it is the same for every site.
 */

type Spot = {
  slug: string;
  icon: LucideIcon;
  title: string;
  where: string;
  role: string;
  /** Inside the building, or beyond it. */
  outside: boolean;
  frame: string;
  depth: number;
  joint: JointSpec;
  hub: JointSpec;
};

const SPOTS: Spot[] = [
  {
    slug: "managed-router-firewall",
    icon: Router,
    title: "Managed router and firewall",
    where: "At the edge, where the line arrives",
    role: "What may reach you, and what your own network can see.",
    outside: false,
    frame: "top-[12%] left-[30%] w-[19%]",
    depth: 0.6,
    joint: { id: "sl-fw", side: "b", left: "50%", top: "100%" },
    hub: { id: "sl-hub-fw", side: "t", left: "24%", top: "0%" },
  },
  {
    slug: "business-wifi",
    icon: Wifi,
    title: "Business Wi-Fi",
    where: "In the ceiling, across the floor",
    role: "Coverage designed from the building rather than the cabinet.",
    outside: false,
    frame: "top-[12%] left-[52%] w-[19%]",
    depth: 0.6,
    joint: { id: "sl-wifi", side: "b", left: "50%", top: "100%" },
    hub: { id: "sl-hub-wifi", side: "t", left: "50%", top: "0%" },
  },
  {
    slug: "lan-switching",
    icon: Network,
    title: "LAN and switching",
    where: "In the cabinet, behind everything",
    role: "Which parts of your own network can see each other.",
    outside: false,
    frame: "top-[12%] left-[74%] w-[19%]",
    depth: 0.6,
    joint: { id: "sl-lan", side: "b", left: "50%", top: "100%" },
    hub: { id: "sl-hub-lan", side: "t", left: "76%", top: "0%" },
  },
  {
    slug: "vpn",
    icon: Link2,
    title: "VPN",
    where: "Not in the building at all",
    role: "The other office, and the people who are not in either.",
    outside: true,
    frame: "top-[74%] left-[10%] w-[22%]",
    depth: 0.85,
    joint: { id: "sl-vpn", side: "t", left: "50%", top: "0%" },
    hub: { id: "sl-hub-vpn", side: "b", left: "22%", top: "100%" },
  },
  {
    slug: "sd-wan",
    icon: GitBranch,
    title: "SD-WAN",
    where: "Between the links, deciding",
    role: "Which path each kind of traffic takes, moment to moment.",
    outside: true,
    frame: "top-[74%] left-[39%] w-[22%]",
    depth: 0.85,
    joint: { id: "sl-sdwan", side: "t", left: "50%", top: "0%" },
    hub: { id: "sl-hub-sdwan", side: "b", left: "50%", top: "100%" },
  },
  {
    slug: "multi-location",
    icon: Store,
    title: "Multi-location networking",
    where: "Every other site you have",
    role: "One design, applied to sites that are not alike.",
    outside: true,
    frame: "top-[74%] left-[68%] w-[22%]",
    depth: 0.85,
    joint: { id: "sl-multi", side: "t", left: "50%", top: "0%" },
    hub: { id: "sl-hub-multi", side: "b", left: "78%", top: "100%" },
  },
];

const BEAT_S = 2.5;
const LOOP_S = BEAT_S * SPOTS.length;

export function SiteLayersScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the router, which is where every site starts.
  const index = still ? 0 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = SPOTS[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={SPOTS.map((spot, step) => ({
        from: spot.outside ? spot.joint.id : spot.hub.id,
        to: spot.outside ? spot.hub.id : spot.joint.id,
        lit: step === index,
      }))}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Cloud, frame: "top-[44%] left-[4%] w-[5.5%]" },
          { icon: Building2, frame: "top-[44%] left-[90.5%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {SPOTS.map((spot, step) => {
        const on = step === index;

        return (
          <Layer
            key={spot.slug}
            className={spot.frame}
            depth={spot.depth}
            order={20}
            active={on}
            joints={[spot.joint]}
            lit={on}
          >
            <div
              className={cn(
                "glass-tile flex flex-col gap-[0.45cqw] rounded-[1.1cqw] p-[0.8cqw] transition-all duration-500",
                on ? "glass-tile-lit" : "opacity-55",
              )}
            >
              <span className="flex items-center gap-[0.5cqw]">
                <span
                  className={cn(
                    "flex size-[1.9cqw] shrink-0 items-center justify-center rounded-[0.55cqw] transition-colors duration-500",
                    on
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-primary",
                  )}
                >
                  <spot.icon className="size-1/2" />
                </span>
                <span className="text-[0.84cqw] leading-tight font-semibold text-balance">
                  {spot.title}
                </span>
              </span>
              <span className="text-[0.7cqw] leading-snug text-muted-foreground">
                {spot.where}
              </span>
            </div>
          </Layer>
        );
      })}

      {/* The building the first three are inside. */}
      <Layer
        className="top-[36%] left-[24%] w-[52%]"
        depth={0.4}
        order={10}
        active
        glow
        joints={SPOTS.map((spot) => spot.hub)}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="One site"
          subtitle="Three of these are in it. Three of them are not."
          aside={
            <SceneChip
              icon={now.outside ? Cloud : Building2}
              label={now.outside ? "Beyond the building" : "Inside the building"}
              tone="on"
            />
          }
        >
          {/* A section through the site, so "where" means something. */}
          <span className="flex flex-col gap-[0.35cqw]">
            {[
              { label: "The edge", slug: "managed-router-firewall" },
              { label: "The floor", slug: "business-wifi" },
              { label: "The cabinet", slug: "lan-switching" },
            ].map((band) => {
              const on = now.slug === band.slug;

              return (
                <span
                  key={band.slug}
                  className={cn(
                    "flex items-center gap-[0.5cqw] rounded-[0.6cqw] px-[0.6cqw] py-[0.4cqw] transition-all duration-500",
                    on ? "bg-accent" : "bg-card/60",
                  )}
                >
                  <span
                    className={cn(
                      "size-[0.45cqw] shrink-0 rounded-full transition-colors duration-500",
                      on ? "bg-primary" : "bg-muted-foreground/30",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[0.76cqw] transition-colors duration-500",
                      on ? "font-medium text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {band.label}
                  </span>
                </span>
              );
            })}
          </span>

          <span className="flex min-h-[2cqw] items-start gap-[0.5cqw] border-t border-border pt-[0.55cqw]">
            <now.icon className="mt-[0.1cqw] size-[0.9cqw] shrink-0 text-primary" />
            <span className="text-[0.8cqw] leading-snug text-pretty text-muted-foreground">
              {now.role}
            </span>
          </span>
        </ScenePanel>
      </Layer>

      {/* The point of drawing them together at all. */}
      <div
        className="parallax absolute top-[3%] left-[30%] w-[40%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Network}
          label="Six services, one design"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
