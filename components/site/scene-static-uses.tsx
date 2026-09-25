"use client";

import type { CSSProperties } from "react";
import {
  ArrowRightToLine,
  Cctv,
  Globe,
  Laptop,
  ListChecks,
  Lock,
  PhoneCall,
  Router,
  Server,
  Building2,
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
import { cn } from "@/lib/utils";

/**
 * Everything that has to be told where you are, being told the same thing.
 *
 * A static IP is the rare network feature whose value is entirely about the
 * inbound direction, and that is the thing a reader most often has not
 * grasped — they picture a faster line, or a more secure one. So every wire
 * in this scene points inward, and every tile around the edge carries the
 * same address written into its own configuration.
 *
 * Six arrivals, one address, and the address never changes while they land.
 * That is the entire argument, and it is one the page's list of uses makes
 * in prose directly above.
 *
 * The address is from RFC 5737 documentation space. It routes nowhere and
 * cannot ever belong to a real customer.
 */

const ADDRESS = "203.0.113.42";

type Arrival = {
  id: string;
  icon: LucideIcon;
  label: string;
  note: string;
  /** What this one writes the address into. */
  wrote: string;
  frame: string;
  depth: number;
  joint: JointSpec;
  hub: JointSpec;
};

const ARRIVALS: Arrival[] = [
  {
    id: "site-vpn",
    icon: Building2,
    label: "Site-to-site VPN",
    note: "The other office, always connected",
    wrote: "Tunnel peer",
    frame: "top-[6%] left-[2%] w-[20%]",
    depth: 0.55,
    joint: { id: "use-site", side: "r", left: "100%", top: "50%" },
    hub: { id: "hub-site", side: "l", left: "0%", top: "18%" },
  },
  {
    id: "remote",
    icon: Laptop,
    label: "Remote access",
    note: "People working away from the building",
    wrote: "Client profile",
    frame: "top-[38%] left-[2%] w-[20%]",
    depth: 0.75,
    joint: { id: "use-remote", side: "r", left: "100%", top: "50%" },
    hub: { id: "hub-remote", side: "l", left: "0%", top: "50%" },
  },
  {
    id: "cctv",
    icon: Cctv,
    label: "Remote monitoring",
    note: "Cameras and door entry, reached from outside",
    wrote: "Viewer config",
    frame: "top-[70%] left-[2%] w-[20%]",
    depth: 0.9,
    joint: { id: "use-cctv", side: "r", left: "100%", top: "50%" },
    hub: { id: "hub-cctv", side: "l", left: "0%", top: "82%" },
  },
  {
    id: "sip",
    icon: PhoneCall,
    label: "SIP trunking",
    note: "Voice registered against a known address",
    wrote: "Trunk registration",
    frame: "top-[6%] left-[78%] w-[20%]",
    depth: 0.55,
    joint: { id: "use-sip", side: "l", left: "0%", top: "50%" },
    hub: { id: "hub-sip", side: "r", left: "100%", top: "18%" },
  },
  {
    id: "allowlist",
    icon: ListChecks,
    label: "Partner allowlists",
    note: "Platforms that only accept known addresses",
    wrote: "Their firewall rule",
    frame: "top-[38%] left-[78%] w-[20%]",
    depth: 0.75,
    joint: { id: "use-allow", side: "l", left: "0%", top: "50%" },
    hub: { id: "hub-allow", side: "r", left: "100%", top: "50%" },
  },
  {
    id: "hosted",
    icon: Server,
    label: "Hosted systems",
    note: "Something in the building the outside world reaches",
    wrote: "DNS record",
    frame: "top-[70%] left-[78%] w-[20%]",
    depth: 0.9,
    joint: { id: "use-hosted", side: "l", left: "0%", top: "50%" },
    hub: { id: "hub-hosted", side: "r", left: "100%", top: "82%" },
  },
];

const BEAT_S = 2;
const HOLD_S = 4;
const LOOP_S = BEAT_S * ARRIVALS.length + HOLD_S;

export function StaticUsesScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  const inLoop = t % LOOP_S;
  const arrived = still
    ? ARRIVALS.length
    : Math.min(ARRIVALS.length, Math.floor(inLoop / BEAT_S) + 1);
  const all = arrived === ARRIVALS.length;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={ARRIVALS.map((item, index) => ({
        from: item.joint.id,
        to: item.hub.id,
        lit: index < arrived,
      }))}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: ArrowRightToLine, frame: "top-[46%] left-[24.5%] w-[5%]" },
          { icon: Lock, frame: "top-[46%] left-[70.5%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* The one thing all of them were told. */}
      <Layer
        className="top-[30%] left-[31%] w-[38%]"
        depth={0.45}
        order={30}
        active
        glow
        joints={ARRIVALS.map((item) => item.hub)}
        lit
      >
        <ScenePanel
          icon={Router}
          title="Your connection"
          subtitle="One address, written into six different places"
          aside={<SceneChip icon={Lock} label="Static" tone="on" />}
        >
          <span className="flex items-center justify-center gap-[0.6cqw] rounded-[1cqw] bg-accent px-[0.9cqw] py-[0.7cqw]">
            <Globe className="size-[1.3cqw] shrink-0 text-primary" />
            <span className="font-mono text-[1.5cqw] font-semibold tabular-nums">
              {ADDRESS}
            </span>
          </span>

          <span className="flex items-center gap-[0.4cqw]">
            {ARRIVALS.map((item, index) => (
              <span
                key={item.id}
                className={cn(
                  "h-[0.4cqw] flex-1 rounded-full transition-colors duration-500",
                  index < arrived ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </span>

          <span className="flex h-[1.3cqw] items-center text-[0.76cqw]">
            {all ? (
              <span className="font-medium text-primary">
                Six things pointing here, and none of them has to be told again.
              </span>
            ) : (
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground tabular-nums">
                  {arrived}
                </span>{" "}
                of {ARRIVALS.length} configured against it
              </span>
            )}
          </span>
        </ScenePanel>
      </Layer>

      {ARRIVALS.map((item, index) => {
        const on = index < arrived;

        return (
          <Layer
            key={item.id}
            className={item.frame}
            depth={item.depth}
            order={20}
            active={on}
            joints={[item.joint]}
            lit={on}
          >
            <SceneTile
              icon={item.icon}
              label={item.label}
              note={item.note}
              lit={on}
              dim={!on}
              status={{
                text: on ? `${item.wrote} · ${ADDRESS}` : "Waiting on an address",
                tone: on ? "on" : "off",
              }}
            />
          </Layer>
        );
      })}

      {/* The direction, said once, because it is the thing readers miss. */}
      <div
        className="parallax absolute top-[6%] left-[33%] w-[34%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={ArrowRightToLine}
          label="Every one of these points inward"
          size="md"
          active
          className="mx-auto"
        />
      </div>

      {/* And the thing it is not. */}
      <div
        className="parallax absolute top-[82%] left-[29%] w-[42%]"
        style={{ "--depth": 0.6 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.7cqw] rounded-[1.1cqw] px-[1cqw] py-[0.75cqw]">
          <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Lock className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            A fixed address is what a rule refers to. It is not the rule, and
            it is not a firewall.
          </span>
        </div>
      </div>
    </Scene>
  );
}
