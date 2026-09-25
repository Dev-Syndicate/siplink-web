"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Cable,
  Cloud,
  Gauge,
  Globe,
  Lock,
  Network,
  Radio,
  Router,
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
 * The circuit, end to end, and the width it keeps at every hop.
 *
 * The section above this one already draws contention — a shared segment
 * losing capacity as neighbours land on it, beside a dedicated port that
 * does not. Repeating that argument with better graphics would be the
 * easiest mistake to make here, so this scene answers the question the other
 * one leaves open: if the capacity is mine, mine where?
 *
 * So it follows the line out of the building, along the tail, through the
 * port, into the core and out to the internet — with one band running the
 * whole way at a constant width. The band is the point. A service can be
 * uncontended at the last hop and oversubscribed three hops later, and that
 * is the distinction a reader cannot make from a speed figure.
 *
 * The only figures on the stage are the two port sizes and the licence
 * class, which a source document states. The band carries no scale at all.
 */

type Hop = {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  /** What this hop is, said once, when the scene is on it. */
  note: string;
  aside?: string;
  frame: string;
  depth: number;
  joints: JointSpec[];
};

const HOPS: Hop[] = [
  {
    id: "office",
    icon: Building2,
    title: "Your building",
    subtitle: "Where the circuit terminates",
    note: "The line begins as a physical thing in your building, not as an allowance on an account.",
    frame: "top-[30%] left-[1.5%] w-[18%]",
    depth: 0.75,
    joints: [{ id: "hop-office", side: "r", left: "100%", top: "50%" }],
  },
  {
    id: "tail",
    icon: Cable,
    title: "The access tail",
    subtitle: "The last stretch to the exchange",
    note: "The hop most often owned by somebody else, and the one a fault is most often lost in. It is in scope here.",
    frame: "top-[30%] left-[21.5%] w-[18%]",
    depth: 0.55,
    joints: [
      { id: "hop-tail-in", side: "l", left: "0%", top: "50%" },
      { id: "hop-tail-out", side: "r", left: "100%", top: "50%" },
    ],
  },
  {
    id: "port",
    icon: Router,
    title: "Your port",
    subtitle: "50 Mbps to 100 Gbps",
    note: "Sized per site after a feasibility check, rather than picked from a tier list and hoped for.",
    aside: "Uncontended",
    frame: "top-[28%] left-[41%] w-[18%]",
    depth: 0.9,
    joints: [
      { id: "hop-port-in", side: "l", left: "0%", top: "50%" },
      { id: "hop-port-out", side: "r", left: "100%", top: "50%" },
    ],
  },
  {
    id: "core",
    icon: Network,
    title: "Our IP core",
    subtitle: "Class A, licensed by the DoT",
    note: "Being uncontended at your wall means little if the network behind it is not built to carry what it sold.",
    frame: "top-[30%] left-[60.5%] w-[18%]",
    depth: 0.55,
    joints: [
      { id: "hop-core-in", side: "l", left: "0%", top: "50%" },
      { id: "hop-core-out", side: "r", left: "100%", top: "50%" },
    ],
  },
  {
    id: "internet",
    icon: Cloud,
    title: "The internet",
    subtitle: "Everything you were trying to reach",
    note: "The destination was never the hard part. Keeping the width all the way to it is.",
    frame: "top-[30%] left-[80.5%] w-[18%]",
    depth: 0.75,
    joints: [{ id: "hop-net-in", side: "l", left: "0%", top: "50%" }],
  },
];

const WIRES = [
  { from: "hop-office", to: "hop-tail-in" },
  { from: "hop-tail-out", to: "hop-port-in" },
  { from: "hop-port-out", to: "hop-core-in" },
  { from: "hop-core-out", to: "hop-net-in" },
];

const BEAT_S = 2;
const LOOP_S = BEAT_S * HOPS.length;

export function DedicatedLineScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the port, which is the thing being sold.
  const index = still ? 2 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = HOPS[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/820]"
      wires={WIRES.map((wire) => ({ ...wire, lit: true }))}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Globe, frame: "top-[6%] left-[8%] w-[5%]" },
          { icon: Lock, frame: "top-[6%] left-[87%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* The claim, above the chain it is about. */}
      <div
        className="parallax absolute top-[6%] left-[31%] w-[38%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Gauge}
          label="The same width at every hop"
          size="md"
          active
          className="mx-auto"
        />
      </div>

      {HOPS.map((hop, step) => {
        const on = step === index;

        return (
          <Layer
            key={hop.id}
            className={hop.frame}
            depth={hop.depth}
            order={hop.id === "port" ? 30 : 20}
            active={on}
            glow={on || hop.id === "port"}
            joints={hop.joints}
            lit
          >
            <ScenePanel
              icon={hop.icon}
              title={hop.title}
              subtitle={hop.subtitle}
              lit={on || hop.id === "port"}
              aside={
                hop.aside ? (
                  <SceneChip icon={Lock} label={hop.aside} tone="on" />
                ) : undefined
              }
            >
              {/* The band. Identical on every hop, which is the argument —
                  so it is drawn identically rather than parameterised. */}
              <span className="flex flex-col gap-[0.3cqw]">
                <span className="h-[1.1cqw] w-full rounded-full bg-linear-to-r from-brand-from to-brand-to" />
                <span className="text-[0.66cqw] text-muted-foreground">
                  Yours, all of it
                </span>
              </span>
            </ScenePanel>
          </Layer>
        );
      })}

      {/* What the hop the scene is on actually is. */}
      <div
        className="parallax absolute top-[68%] left-[18%] w-[64%]"
        style={{ "--depth": 0.5 } as CSSProperties}
      >
        <div className="glass-panel flex items-start gap-[0.7cqw] rounded-[1.1cqw] px-[1cqw] py-[0.8cqw]">
          <span
            className={cn(
              "mt-[0.2cqw] flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors duration-500",
            )}
          >
            <now.icon className="size-1/2" />
          </span>
          <span className="flex min-w-0 flex-col gap-[0.2cqw]">
            <span className="text-[0.8cqw] font-semibold">{now.title}</span>
            <span className="text-[0.85cqw] leading-snug text-pretty text-muted-foreground">
              {now.note}
            </span>
          </span>
        </div>
      </div>

      {/* Watched from one place, whichever hop it is. */}
      <div
        className="parallax absolute top-[88%] left-[34%] w-[32%]"
        style={{ "--depth": 0.65 } as CSSProperties}
      >
        <div className="glass-panel flex items-center justify-center gap-[0.5cqw] rounded-full px-[1cqw] py-[0.5cqw]">
          <Radio className="size-[1cqw] text-primary" />
          <span className="text-[0.78cqw] font-medium">
            Every hop watched 24/7 from our Chennai NOC
          </span>
        </div>
      </div>
    </Scene>
  );
}
