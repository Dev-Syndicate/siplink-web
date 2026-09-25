"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Cable,
  Globe,
  HardHat,
  Network,
  Router,
  ShieldCheck,
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
import {
  DeviceUnit,
  Drift,
  PlaceFrame,
  PLACES,
} from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * What is physically in the building when the service is live.
 *
 * The scene before this one is about people and screens. This is the other
 * half of the same question, and the one a buyer is usually too polite to
 * ask: what turns up, where does it go, and which of it is yours to worry
 * about?
 *
 * So it draws the cupboard. The fibre coming in, the router on the wall, the
 * switch under it, the access point in the ceiling — with the two that are
 * optional marked as optional rather than quietly included, because the page
 * says most businesses take one or two and nobody needs all of it on day
 * one.
 *
 * No model numbers, no port counts, no speeds. What arrives and where it
 * sits is the whole claim; a specification would be an invention.
 */

type Kit = {
  id: string;
  icon: LucideIcon;
  label: string;
  sub: string;
  /** Where it physically goes. */
  place: string;
  note: string;
  optional: boolean;
  stacked?: boolean;
  frame: string;
  depth: number;
  joint: JointSpec;
  hub: JointSpec;
};

const KIT: Kit[] = [
  {
    id: "tail",
    icon: Cable,
    label: "The circuit",
    sub: "Fibre into the building",
    place: "Wherever the line can reach",
    note: "Confirmed by a feasibility check at your address before anything is promised.",
    optional: false,
    frame: "top-[10%] left-[4%] w-[17%]",
    depth: 0.5,
    joint: { id: "kit-tail", side: "r", left: "100%", top: "50%" },
    hub: { id: "kit-hub-tail", side: "l", left: "0%", top: "22%" },
  },
  {
    id: "router",
    icon: Router,
    label: "Managed router",
    sub: "And the firewall in it",
    place: "On the wall, where the line lands",
    note: "Configured against a stated requirement, backed up, and watched from our Chennai NOC.",
    optional: true,
    frame: "top-[40%] left-[4%] w-[17%]",
    depth: 0.7,
    joint: { id: "kit-router", side: "r", left: "100%", top: "50%" },
    hub: { id: "kit-hub-router", side: "l", left: "0%", top: "58%" },
  },
  {
    id: "switch",
    icon: Network,
    label: "LAN and switching",
    sub: "Ports, and what they can see",
    place: "In the cabinet, under the router",
    note: "Voice, data, Wi-Fi and devices kept to their own segments rather than sharing one flat network.",
    optional: true,
    stacked: true,
    frame: "top-[70%] left-[4%] w-[17%]",
    depth: 0.9,
    joint: { id: "kit-switch", side: "r", left: "100%", top: "50%" },
    hub: { id: "kit-hub-switch", side: "l", left: "0%", top: "88%" },
  },
  {
    id: "wifi",
    icon: Wifi,
    label: "Business Wi-Fi",
    sub: "Access points, placed on purpose",
    place: "In the ceiling, across the floor",
    note: "Positioned for the building rather than the nearest cable run, with guest access separated.",
    optional: true,
    frame: "top-[22%] left-[79%] w-[17%]",
    depth: 0.7,
    joint: { id: "kit-wifi", side: "l", left: "0%", top: "50%" },
    hub: { id: "kit-hub-wifi", side: "r", left: "100%", top: "34%" },
  },
  {
    id: "ip",
    icon: Globe,
    label: "Static IP",
    sub: "A fixed public address",
    place: "Nowhere at all — it is on the service",
    note: "Issued against the connection rather than the hardware, where a VPN, a trunk or an allowlist needs one.",
    optional: true,
    frame: "top-[58%] left-[79%] w-[17%]",
    depth: 0.9,
    joint: { id: "kit-ip", side: "l", left: "0%", top: "50%" },
    hub: { id: "kit-hub-ip", side: "r", left: "100%", top: "72%" },
  },
];

const BEAT_S = 2.5;
const LOOP_S = BEAT_S * KIT.length;

export function BroadbandKitScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the circuit, which is the only compulsory part.
  const index = still ? 0 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = KIT[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={KIT.map((item, step) => ({
        from: item.id === "tail" ? item.joint.id : item.hub.id,
        to: item.id === "tail" ? item.hub.id : item.joint.id,
        lit: step === index,
      }))}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: HardHat, frame: "top-[6%] left-[25%] w-[5%]" },
          { icon: ShieldCheck, frame: "top-[6%] left-[70%] w-[5%]", delay: "-3s" },
        ]}
      />

      {KIT.map((item, step) => {
        const on = step === index;

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
            <Drift still={still} delay={`${step * -1.4}s`} seconds={8}>
              <DeviceUnit
                icon={item.icon}
                label={item.label}
                sub={item.sub}
                lit={on}
                stacked={item.stacked}
              />
              <span
                className={cn(
                  "mt-[0.35cqw] inline-flex rounded-full px-[0.5cqw] py-[0.15cqw] text-[0.62cqw] font-medium transition-colors duration-500",
                  item.optional
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-primary-foreground",
                )}
              >
                {item.optional ? "Optional" : "Always"}
              </span>
            </Drift>
          </Layer>
        );
      })}

      {/* The building it all goes into. */}
      <Layer
        className="top-[16%] left-[38%] w-[24%]"
        depth={0.45}
        order={30}
        active
        glow
        joints={KIT.map((item) => item.hub)}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="Your building"
          subtitle="One order, one install, one team"
          aside={<SceneChip label="Day one" tone="on" />}
        >
          <PlaceFrame
            src={PLACES.office}
            ratio="aspect-[16/9]"
            caption="Your office"
          />

          <span className="flex items-center gap-[0.35cqw]">
            {KIT.map((item, step) => (
              <span
                key={item.id}
                className={cn(
                  "h-[0.4cqw] flex-1 rounded-full transition-colors duration-500",
                  step === index ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* What the lit thing is, and where it goes. */}
      <div
        className="parallax absolute top-[62%] left-[26%] w-[48%]"
        style={{ "--depth": 0.6 } as CSSProperties}
      >
        <div className="glass-panel flex flex-col gap-[0.5cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.9cqw]">
          <span className="flex items-center gap-[0.6cqw]">
            <span className="flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <now.icon className="size-1/2" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[0.92cqw] font-semibold">{now.label}</span>
              <span className="text-[0.72cqw] text-muted-foreground">
                {now.place}
              </span>
            </span>
            <span className="ml-auto">
              <SceneChip
                label={now.optional ? "Taken if you need it" : "Part of the service"}
                tone={now.optional ? "quiet" : "on"}
              />
            </span>
          </span>
          <span className="text-[0.82cqw] leading-snug text-pretty text-muted-foreground">
            {now.note}
          </span>
        </div>
      </div>

      {/* The point of drawing the cupboard at all. */}
      <div
        className="parallax absolute top-[4%] left-[33%] w-[34%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Router}
          label="One supplier for all of it"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
