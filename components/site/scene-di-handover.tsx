"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Cable,
  ClipboardCheck,
  Gauge,
  Lock,
  Radio,
  Router,
  Server,
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
 * The cupboard on the day a dedicated circuit is handed over.
 *
 * The scene before this one is about the hour a bad line costs you. This is
 * the unglamorous other half: what is actually screwed to the wall when the
 * service goes live, and which side of each box is ours.
 *
 * The demarcation is the thing worth drawing, because it is the thing that
 * decides who you ring. Everything to the left of the line on this stage is
 * inside the service; the router to the right of it is the customer's own
 * unless it was taken as a managed one.
 *
 * The only figures are the two port sizes a source document states. Nothing
 * here says what any particular site gets.
 */

type Item = {
  id: string;
  icon: LucideIcon;
  label: string;
  sub: string;
  side: "ours" | "yours";
  note: string;
  stacked?: boolean;
  frame: string;
  depth: number;
  joint: JointSpec;
  hub: JointSpec;
};

const RACK: Item[] = [
  {
    id: "fibre",
    icon: Cable,
    label: "The fibre pair",
    sub: "Terminated in the building",
    side: "ours",
    note: "Commissioned end to end and tested before anyone signs anything. The installation report is signed off by you.",
    frame: "top-[12%] left-[3%] w-[19%]",
    depth: 0.55,
    joint: { id: "ho-fibre", side: "r", left: "100%", top: "50%" },
    hub: { id: "ho-hub-fibre", side: "l", left: "0%", top: "18%" },
  },
  {
    id: "ntu",
    icon: Server,
    label: "The handover",
    sub: "Where the service ends and you begin",
    side: "ours",
    note: "The demarcation point. Everything on our side of it is in scope for a fault, which is the part that decides who you ring.",
    frame: "top-[42%] left-[3%] w-[19%]",
    depth: 0.75,
    joint: { id: "ho-ntu", side: "r", left: "100%", top: "50%" },
    hub: { id: "ho-hub-ntu", side: "l", left: "0%", top: "52%" },
  },
  {
    id: "port",
    icon: Gauge,
    label: "Your port",
    sub: "50 Mbps to 100 Gbps",
    side: "ours",
    note: "Sized per site after a feasibility check, and uncontended — the capacity behind it is not shared with anybody else.",
    frame: "top-[72%] left-[3%] w-[19%]",
    depth: 0.95,
    joint: { id: "ho-port", side: "r", left: "100%", top: "50%" },
    hub: { id: "ho-hub-port", side: "l", left: "0%", top: "86%" },
  },
  {
    id: "router",
    icon: Router,
    label: "The router",
    sub: "Yours, or managed by us",
    side: "yours",
    note: "The first thing on your side of the line. Taken as a managed service it comes back into scope, which is the whole reason people take it that way.",
    stacked: true,
    frame: "top-[28%] left-[78%] w-[19%]",
    depth: 0.75,
    joint: { id: "ho-router", side: "l", left: "0%", top: "50%" },
    hub: { id: "ho-hub-router", side: "r", left: "100%", top: "36%" },
  },
  {
    id: "noc",
    icon: Radio,
    label: "The NOC",
    sub: "Chennai, 24/7",
    side: "ours",
    note: "Watching it from the day it goes live, so in most cases a fault is open before anyone in the building has noticed it.",
    frame: "top-[62%] left-[78%] w-[19%]",
    depth: 0.95,
    joint: { id: "ho-noc", side: "l", left: "0%", top: "50%" },
    hub: { id: "ho-hub-noc", side: "r", left: "100%", top: "74%" },
  },
];

const BEAT_S = 2.5;
const LOOP_S = BEAT_S * RACK.length;

export function DedicatedHandoverScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the handover point, which is the useful one.
  const index = still ? 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = RACK[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={RACK.map((item, step) => ({
        from: item.side === "yours" ? item.joint.id : item.hub.id,
        to: item.side === "yours" ? item.hub.id : item.joint.id,
        lit: step === index,
      }))}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: ClipboardCheck, frame: "top-[6%] left-[26%] w-[4.5%]" },
          { icon: Lock, frame: "top-[6%] left-[69%] w-[4.5%]", delay: "-3s" },
        ]}
      />

      {RACK.map((item, step) => {
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
            <Drift still={still} delay={`${step * -1.3}s`} seconds={8}>
              <DeviceUnit
                icon={item.icon}
                label={item.label}
                sub={item.sub}
                lit={on}
                stacked={item.stacked}
              />
              <span
                className={cn(
                  "mt-[0.35cqw] inline-flex items-center gap-[0.25cqw] rounded-full px-[0.5cqw] py-[0.15cqw] text-[0.62cqw] font-medium transition-colors duration-500",
                  item.side === "ours"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {item.side === "ours" ? "In scope" : "Your side"}
              </span>
            </Drift>
          </Layer>
        );
      })}

      {/* The building, and the line drawn through it. */}
      <Layer
        className="top-[18%] left-[28%] w-[42%]"
        depth={0.45}
        order={30}
        active
        glow
        joints={RACK.map((item) => item.hub)}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="Handover day"
          subtitle="What is on the wall, and whose side of it"
          aside={<SceneChip icon={Lock} label="Uncontended" tone="on" />}
        >
          <PlaceFrame
            src={PLACES.office}
            ratio="aspect-[16/7]"
            caption="Your building"
          />

          {/* The demarcation, as a line with a side each. */}
          <span className="flex items-center gap-[0.5cqw]">
            <span className="flex flex-1 items-center justify-center rounded-[0.7cqw] bg-accent px-[0.6cqw] py-[0.45cqw] text-[0.72cqw] font-semibold text-accent-foreground">
              Ours to fix
            </span>
            <span className="h-[1.8cqw] w-[0.18cqw] rounded-full bg-primary" />
            <span className="flex flex-1 items-center justify-center rounded-[0.7cqw] bg-muted px-[0.6cqw] py-[0.45cqw] text-[0.72cqw] font-semibold text-muted-foreground">
              Yours, unless managed
            </span>
          </span>

          <span className="flex items-center gap-[0.35cqw]">
            {RACK.map((item, step) => (
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

      {/* What the lit thing is. */}
      <div
        className="parallax absolute top-[72%] left-[26%] w-[46%]"
        style={{ "--depth": 0.6 } as CSSProperties}
      >
        <div className="glass-panel flex flex-col gap-[0.45cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.85cqw]">
          <span className="flex items-center gap-[0.6cqw]">
            <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <now.icon className="size-1/2" />
            </span>
            <span className="text-[0.9cqw] font-semibold">{now.label}</span>
            <span className="ml-auto">
              <SceneChip
                label={now.side === "ours" ? "Our side" : "Your side"}
                tone={now.side === "ours" ? "on" : "off"}
              />
            </span>
          </span>
          <span className="text-[0.8cqw] leading-snug text-pretty text-muted-foreground">
            {now.note}
          </span>
        </div>
      </div>

      <div
        className="parallax absolute top-[4%] left-[33%] w-[34%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Server}
          label="Where the service ends and you begin"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
