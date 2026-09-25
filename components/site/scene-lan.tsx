"use client";

import type { CSSProperties } from "react";
import {
  Cctv,
  Eye,
  MonitorSmartphone,
  Network,
  Phone,
  Printer,
  Signal,
  Split,
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
import { lanSegments } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * The switch, its ports, and which segment each one belongs to.
 *
 * Segmentation is the least visible thing on these pages: it happens inside
 * a cabinet, it looks like nothing, and the argument for it is entirely
 * about what does *not* happen. The page states that plainly — guests
 * reaching a file server is usually a decision nobody made — but a reader
 * who has never seen a port map has nothing to picture.
 *
 * So the scene draws the cabinet. Twenty-four ports, coloured by segment,
 * and one segment lit at a time with the things patched into it. The panel
 * underneath answers the question the port map raises: why is this one kept
 * apart from the others?
 *
 * The four segments are lanSegments, in its order. The port count is the
 * ordinary size of a switch and is illustrative — no claim is made about
 * what any particular site is given.
 */

const SEGMENT_ICONS: LucideIcon[] = [Phone, MonitorSmartphone, Signal, Eye];

/** What is patched into each segment, and how many ports it takes up. */
const PATCHED: { icon: LucideIcon; label: string }[][] = [
  [
    { icon: Phone, label: "IP handsets" },
    { icon: Phone, label: "Conference phone" },
  ],
  [
    { icon: MonitorSmartphone, label: "Desktops and laptops" },
    { icon: Printer, label: "Printers" },
  ],
  [
    { icon: Wifi, label: "Access points" },
    { icon: Wifi, label: "Guest SSID" },
  ],
  [
    { icon: Cctv, label: "Cameras" },
    { icon: Eye, label: "Door entry and sensors" },
  ],
];

/** Which segment each of the twenty-four ports belongs to. */
const PORTS = [
  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 1, 1, 0, 2,
];

const SWITCH: JointSpec[] = [
  { id: "lan-switch", side: "b", left: "50%", top: "100%" },
];
const SEGMENT: JointSpec[] = [
  { id: "lan-segment", side: "t", left: "50%", top: "0%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * lanSegments.length;

export function LanSegmentsScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on voice, the segment with the clearest reason.
  const index = still ? 0 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = lanSegments[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/900]"
      wires={[{ from: SWITCH[0].id, to: SEGMENT[0].id, lit: true }]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Network, frame: "top-[12%] left-[4%] w-[5.5%]" },
          { icon: Split, frame: "top-[12%] left-[91%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* The cabinet. */}
      <Layer
        className="top-[13%] left-[22%] w-[56%]"
        depth={0.45}
        order={20}
        active
        glow
        joints={SWITCH}
        lit
      >
        <ScenePanel
          icon={Network}
          title="One switch, four segments"
          subtitle="Decided once, in a cabinet, before anyone moves in"
          aside={
            <SceneChip
              icon={SEGMENT_ICONS[index]}
              label={now.name}
              tone="on"
            />
          }
        >
          {/* The port map. Two rows, as a switch actually is. */}
          <span className="flex flex-col gap-[0.35cqw] rounded-[0.9cqw] bg-foreground/[0.06] p-[0.6cqw] ring-1 ring-primary/10">
            {[0, 1].map((row) => (
              <span key={row} className="flex gap-[0.3cqw]">
                {PORTS.slice(row * 12, row * 12 + 12).map((segment, step) => {
                  const on = segment === index;

                  return (
                    <span
                      key={step}
                      className={cn(
                        "flex h-[1.5cqw] flex-1 items-end justify-center rounded-[0.25cqw] pb-[0.15cqw] transition-all duration-500",
                        on
                          ? "bg-primary shadow-sm shadow-primary/40"
                          : "bg-muted-foreground/20",
                      )}
                    >
                      <span
                        className={cn(
                          "size-[0.3cqw] rounded-full transition-colors duration-500",
                          on ? "bg-primary-foreground" : "bg-card/70",
                        )}
                      />
                    </span>
                  );
                })}
              </span>
            ))}
          </span>

          {/* And the four names, so the colours mean something. */}
          <span className="flex items-center gap-[0.5cqw]">
            {lanSegments.map((segment, step) => (
              <span
                key={segment.name}
                className={cn(
                  "flex flex-1 items-center justify-center gap-[0.35cqw] rounded-full px-[0.5cqw] py-[0.3cqw] text-[0.72cqw] font-medium transition-all duration-500",
                  step === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {segment.name}
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* What is on the lit segment, and why it is kept to itself. */}
      <Layer
        className="top-[58%] left-[26%] w-[48%]"
        depth={0.8}
        order={30}
        active
        joints={SEGMENT}
        lit
      >
        <ScenePanel
          icon={SEGMENT_ICONS[index]}
          title={`${now.name} · ${now.carries}`}
          subtitle="What is patched into this segment"
        >
          <span className="flex gap-[0.5cqw]">
            {PATCHED[index].map(({ icon: Icon, label: name }) => (
              <span
                key={name}
                className="flex flex-1 items-center gap-[0.5cqw] rounded-[0.7cqw] bg-card/80 px-[0.6cqw] py-[0.45cqw]"
              >
                <span className="flex size-[1.7cqw] shrink-0 items-center justify-center rounded-[0.5cqw] bg-accent text-primary">
                  <Icon className="size-1/2" />
                </span>
                <span className="text-[0.76cqw] font-medium text-balance">
                  {name}
                </span>
              </span>
            ))}
          </span>

          <span className="flex items-start gap-[0.5cqw] border-t border-border pt-[0.6cqw]">
            <Split className="mt-[0.15cqw] size-[0.9cqw] shrink-0 text-primary" />
            <span className="text-[0.8cqw] leading-snug text-pretty text-muted-foreground">
              {now.why}
            </span>
          </span>
        </ScenePanel>
      </Layer>

      {/* The thing segmentation is for. */}
      <div
        className="parallax absolute top-[5%] left-[30%] w-[40%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Split}
          label="What can see what, decided on purpose"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
