"use client";

import {
  Building2,
  Car,
  Cloud,
  House,
  PhoneIncoming,
  Store,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  Wave,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * On the cloud, the phone system stops being a place.
 *
 * One business number, and four people in four places — head office, home,
 * a branch, on the road — all on the same system. Each call to that number
 * is answered somewhere different, and it makes no difference to the
 * caller: the system is in the middle, not in a building.
 *
 * Replaces the tether schematic that stood here. Drawn for the hero's half
 * column, so its type is larger than the full-width scenes. Stage, parallax
 * and wiring come from scene-kit.
 */

const TEAM = "/solns-remoteWorkforce/scene";

type Place = {
  id: string;
  place: string;
  icon: LucideIcon;
  who: string;
  photo: string;
  ext: string;
  box: string;
  joint: JointSpec;
  hub: JointSpec;
};

const PLACES: Place[] = [
  {
    id: "office",
    place: "Head office",
    icon: Building2,
    who: "William Meek",
    photo: `${TEAM}/team-william.webp`,
    ext: "201",
    box: "top-[9%] left-[1%]",
    joint: { id: "office", side: "b", left: "80%", top: "100%" },
    hub: { id: "hub-office", side: "l", left: "0%", top: "30%" },
  },
  {
    id: "home",
    place: "Home",
    icon: House,
    who: "Ida Jones",
    photo: `${TEAM}/team-ida.webp`,
    ext: "214",
    box: "top-[9%] left-[66%]",
    joint: { id: "home", side: "b", left: "20%", top: "100%" },
    hub: { id: "hub-home", side: "r", left: "100%", top: "30%" },
  },
  {
    id: "branch",
    place: "Branch",
    icon: Store,
    who: "Lei Quynh",
    photo: `${TEAM}/team-lei.webp`,
    ext: "305",
    box: "top-[70%] left-[1%]",
    joint: { id: "branch", side: "t", left: "80%", top: "0%" },
    hub: { id: "hub-branch", side: "l", left: "0%", top: "75%" },
  },
  {
    id: "road",
    place: "On the road",
    icon: Car,
    who: "Aarushi Peri",
    photo: `${TEAM}/team-aarushi.webp`,
    ext: "118",
    box: "top-[70%] left-[66%]",
    joint: { id: "road", side: "t", left: "62%", top: "0%" },
    hub: { id: "hub-road", side: "r", left: "100%", top: "75%" },
  },
];

/** Per call: 0 it rings in, 1–2 answered where that person is. */
const CALL_S = 3;
/** The order the calls land in, so they cross the scene rather than circle it. */
const ORDER = [0, 3, 1, 2];

export function CloudScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on a call answered at home.
  const s = still ? CALL_S * 2 + 1 : t % (CALL_S * ORDER.length);
  const current = PLACES[ORDER[Math.floor(s / CALL_S)]];
  const ringing = s % CALL_S === 0;
  const elapsed = s % CALL_S;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[600/450]"
      wires={PLACES.map(({ hub, joint, id }) => ({
        from: hub.id,
        to: joint.id,
        lit: id === current.id,
      }))}
    >
      {/* The system, which is a layer rather than a place */}
      <Layer
        className="top-[33%] left-[34%] w-[32%]"
        depth={0.45}
        order={20}
        joints={PLACES.map(({ hub }) => hub)}
        lit
      >
        <div className="glass-tile-lit flex flex-col items-center gap-[1.2cqw] rounded-[3cqw] border border-border bg-card px-[2cqw] py-[2.4cqw] text-center">
          <span className="flex size-[7cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
            <Cloud className="size-1/2" />
          </span>
          <span className="text-[2.6cqw] leading-tight font-semibold">
            SipLink
          </span>
          <span className="text-[1.9cqw] text-muted-foreground tabular-nums">
            Main line · +1 (212) 555-0100
          </span>
          <span className="flex items-center gap-[0.6cqw] rounded-full bg-accent px-[1.4cqw] py-[0.5cqw] text-[1.8cqw] font-medium whitespace-nowrap text-accent-foreground">
            <PhoneIncoming className="size-[2cqw]" />
            {ringing ? "Call coming in…" : `Answered · ${current.place}`}
          </span>
        </div>
      </Layer>

      {PLACES.map((item) => {
        const on = item.id === current.id;
        const Icon = item.icon;
        return (
          <Layer
            key={item.id}
            className={cn("w-[33%]", item.box)}
            depth={0.85}
            order={30}
            active={on && !ringing}
            joints={[item.joint]}
            lit={on}
          >
            <div
              className={cn(
                "relative flex flex-col gap-[1cqw] rounded-[2.6cqw] border bg-card p-[1.8cqw] pt-[3.6cqw] shadow-lg transition-[border-color] duration-500",
                on
                  ? "border-primary/40 shadow-primary/20"
                  : "border-border shadow-primary/10",
              )}
            >
              <span
                className={cn(
                  "absolute -top-[2.6cqw] left-[1.6cqw] flex items-center gap-[0.9cqw] rounded-full bg-card py-[0.5cqw] pr-[1.8cqw] pl-[0.5cqw] text-[2cqw] font-semibold whitespace-nowrap shadow-md transition-shadow duration-500",
                  on
                    ? "shadow-primary/30 ring-2 ring-primary"
                    : "shadow-primary/15",
                )}
              >
                <span className="flex size-[4cqw] items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="size-1/2" />
                </span>
                {item.place}
              </span>
              <span className="flex items-center gap-[1.2cqw]">
                <Portrait
                  src={item.photo}
                  ringing={on && ringing}
                  className="w-[5.4cqw]"
                />
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-[2cqw] font-semibold">{item.who}</span>
                  <span className="text-[1.7cqw] text-muted-foreground tabular-nums">
                    ext. {item.ext}
                  </span>
                </span>
              </span>
              <span
                className={cn(
                  "flex h-[3.4cqw] items-center gap-[0.8cqw] rounded-[1.2cqw] px-[1.2cqw] text-[1.8cqw] transition-colors duration-500",
                  on
                    ? "bg-accent font-medium text-accent-foreground"
                    : "bg-muted/60 text-muted-foreground",
                )}
              >
                {on && !ringing ? <Wave /> : null}
                {on
                  ? ringing
                    ? "Ringing…"
                    : `On a call · 00:0${elapsed}`
                  : "Available"}
              </span>
            </div>
          </Layer>
        );
      })}
    </Scene>
  );
}
