"use client";

import type { CSSProperties } from "react";
import {
  DoorOpen,
  Laptop,
  Radar,
  Route,
  Signal,
  Smartphone,
  Users,
  Wifi,
  WifiOff,
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
 * A floor, three access points, and a phone walking across it.
 *
 * The failures this page lists all happen in space — the far meeting room,
 * the room that fills up, the call that drops on the walk back to a desk —
 * and space is the one thing a bulleted list cannot show. So the scene is a
 * plan view: rooms, access points with their coverage, and a device that
 * moves between them while a call stays up.
 *
 * The three networks down the side are the other half of the argument, and
 * the one most often skipped: employee, guest and device traffic given their
 * own access, so a visitor gets internet and nothing else.
 *
 * Nothing here states a range, a client count or a coverage figure. Where
 * the device is on the floor is illustrative; that it hands over cleanly is
 * the design point the copy makes.
 */

type Stop = {
  id: string;
  /** Where the walker is, as a percentage of the plan. */
  x: number;
  y: number;
  /** Which access point is serving it. */
  ap: number;
  note: string;
};

/** The walk: reception, through the open floor, into the far meeting room. */
const WALK: Stop[] = [
  { id: "a", x: 18, y: 68, ap: 0, note: "Reception. The call starts here." },
  { id: "b", x: 42, y: 40, ap: 0, note: "Crossing the open floor, still on the first access point." },
  { id: "c", x: 62, y: 52, ap: 1, note: "Handed over mid-sentence. Nobody on the call hears it happen." },
  { id: "d", x: 84, y: 30, ap: 2, note: "The far meeting room — the one that is always blamed on the router." },
];

/** Access points, placed for the layout rather than the nearest cable run. */
const APS: { x: number; y: number; label: string }[] = [
  { x: 24, y: 42, label: "AP 1" },
  { x: 56, y: 62, label: "AP 2" },
  { x: 82, y: 34, label: "AP 3" },
];

/** Rooms, drawn only so the plan reads as a building. */
const ROOMS: { style: CSSProperties; label: string }[] = [
  { style: { left: "4%", top: "56%", width: "26%", height: "36%" }, label: "Reception" },
  { style: { left: "34%", top: "14%", width: "34%", height: "44%" }, label: "Open floor" },
  { style: { left: "72%", top: "14%", width: "24%", height: "34%" }, label: "Meeting room" },
];

const NETWORKS: { icon: LucideIcon; label: string; gets: string }[] = [
  { icon: Users, label: "Employee", gets: "The network, and what is on it" },
  { icon: DoorOpen, label: "Guest", gets: "Internet, and nothing else" },
  { icon: Signal, label: "Devices", gets: "Their own segment, watched" },
];

const PLAN: JointSpec[] = [
  { id: "wifi-plan", side: "r", left: "100%", top: "34%" },
];
const NETS: JointSpec[] = [
  { id: "wifi-nets", side: "l", left: "0%", top: "40%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * WALK.length;

export function WifiCoverageScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests at the handover, which is the thing being designed.
  const index = still ? 2 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = WALK[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/900]"
      wires={[{ from: PLAN[0].id, to: NETS[0].id, lit: true }]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Radar, frame: "top-[8%] left-[2%] w-[5%]" },
          { icon: Route, frame: "top-[84%] left-[93%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* The floor. */}
      <Layer
        className="top-[16%] left-[3%] w-[62%]"
        depth={0.45}
        order={20}
        active
        glow
        joints={PLAN}
        lit
      >
        <ScenePanel
          icon={Radar}
          title="One floor, walked before it was designed"
          subtitle="Walls, glass and racking decide this, not a plan drawing"
          aside={<SceneChip icon={Wifi} label={APS[now.ap].label} tone="on" />}
        >
          <span className="relative block aspect-[16/8] w-full overflow-hidden rounded-[1cqw] bg-card/70 ring-1 ring-primary/15">
            {/* Rooms. */}
            {ROOMS.map((room) => (
              <span
                key={room.label}
                className="absolute rounded-[0.5cqw] border border-primary/20 bg-primary/[0.04]"
                style={room.style}
              >
                <span className="absolute top-[0.3cqw] left-[0.45cqw] text-[0.62cqw] text-muted-foreground">
                  {room.label}
                </span>
              </span>
            ))}

            {/* Coverage, drawn from where the access points actually are. */}
            {APS.map((ap, step) => {
              const serving = step === now.ap;

              return (
                <span key={ap.label} className="contents">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute aspect-square w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700",
                      serving
                        ? "bg-radial from-primary/25 via-primary/10 to-transparent"
                        : "bg-radial from-primary/10 via-primary/5 to-transparent",
                    )}
                    style={{ left: `${ap.x}%`, top: `${ap.y}%` }}
                  />
                  <span
                    className={cn(
                      "absolute flex size-[2cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[0.16cqw] border-card shadow-md transition-colors duration-500",
                      serving
                        ? "bg-primary text-primary-foreground shadow-primary/40"
                        : "bg-card text-primary shadow-primary/15",
                    )}
                    style={{ left: `${ap.x}%`, top: `${ap.y}%` }}
                  >
                    <Wifi className="size-1/2" />
                  </span>
                </span>
              );
            })}

            {/* The walker. Glides between stops rather than teleporting, so
                the handover reads as a handover — but only when motion is
                wanted. Under reduced motion it is placed at its stop and
                left there; a chip sliding across a floor plan is exactly the
                kind of travel that setting exists to stop. */}
            <span
              className={cn(
                "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.35cqw] rounded-full bg-card px-[0.55cqw] py-[0.3cqw] shadow-md shadow-primary/25 ring-1 ring-primary/30",
                !still && "transition-all duration-1000 ease-in-out",
              )}
              style={{ left: `${now.x}%`, top: `${now.y}%` }}
            >
              <Smartphone className="size-[0.85cqw] shrink-0 text-primary" />
              <span className="text-[0.66cqw] font-medium whitespace-nowrap">
                On a call
              </span>
            </span>
          </span>

          <span className="flex min-h-[1.5cqw] items-center gap-[0.5cqw] text-[0.78cqw]">
            <span className="size-[0.45cqw] shrink-0 rounded-full bg-primary" />
            <span className="text-pretty text-muted-foreground">{now.note}</span>
          </span>
        </ScenePanel>
      </Layer>

      {/* The three networks on top of it. */}
      <Layer
        className="top-[24%] left-[70%] w-[28%]"
        depth={0.8}
        order={30}
        active
        joints={NETS}
        lit
      >
        <ScenePanel
          icon={Signal}
          title="Three networks, one floor"
          subtitle="Built in, not switched on afterwards"
        >
          <span className="flex flex-col gap-[0.4cqw]">
            {NETWORKS.map(({ icon: Icon, label: name, gets }) => (
              <span
                key={name}
                className="flex items-center gap-[0.55cqw] rounded-[0.7cqw] bg-card/80 px-[0.6cqw] py-[0.45cqw]"
              >
                <span className="flex size-[1.7cqw] shrink-0 items-center justify-center rounded-[0.5cqw] bg-accent text-primary">
                  <Icon className="size-1/2" />
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-[0.8cqw] font-semibold">{name}</span>
                  <span className="text-[0.68cqw] text-muted-foreground">
                    {gets}
                  </span>
                </span>
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* What a survey is for, said once. Parked in the right-hand column:
          the plan panel is tall enough to run under anything placed beneath
          it, and a caption sitting on top of a floor plan is worse than no
          caption at all. */}
      <div
        className="parallax absolute top-[64%] left-[70%] w-[28%]"
        style={{ "--depth": 0.6 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.7cqw] rounded-[1.1cqw] px-[1cqw] py-[0.75cqw]">
          <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <WifiOff className="size-1/2" />
          </span>
          <span className="text-[0.82cqw] leading-snug text-pretty">
            One more access point usually fixes what more power cannot.
          </span>
        </div>
      </div>

      {/* Where the walk has got to. */}
      <div
        className="parallax absolute top-[5%] left-[14%] w-[40%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Laptop}
          label="A call, on the walk to a desk"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
