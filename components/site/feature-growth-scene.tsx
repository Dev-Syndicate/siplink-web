"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import {
  Building2,
  CalendarRange,
  Network,
  Router,
  TrendingUp,
  UserPlus,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  ScenePill,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Room to grow into, as four quarters of one office.
 *
 * The card above says a plan sized exactly to today is one you outgrow by
 * the next quarter, and that upgrades are a change to the service rather
 * than a renegotiation. Both are claims about what happens later, so the
 * scene is the later: people join the floor, the kit on the wall grows with
 * them, and the plan steps up beside both — reviewed at the moment the
 * business changed rather than at renewal.
 *
 * Stage, parallax and wiring come from scene-kit, and the faces are the ones
 * the solutions scenes use.
 *
 * The steps carry no scale and the roster is a mock. Nothing here says how
 * fast a plan is or how many people it covers, because neither is a thing
 * this site can state.
 */

const ASSETS = "/solns-remoteWorkforce/scene";

type Quarter = {
  id: string;
  label: string;
  /** How many of the roster are on the floor by the end of it. */
  people: number;
  /** How far the plan has stepped up, as a share of the meter. */
  plan: number;
  /** The kit that arrived with them, if any. */
  kit: string | null;
  note: string;
};

const QUARTERS: Quarter[] = [
  {
    id: "q1",
    label: "Where you start",
    people: 3,
    plan: 34,
    kit: null,
    note: "A plan built from the floor as it is today.",
  },
  {
    id: "q2",
    label: "Two more start",
    people: 4,
    plan: 52,
    kit: "router",
    note: "The upload is the half that notices first.",
  },
  {
    id: "q3",
    label: "A second room",
    people: 5,
    plan: 71,
    kit: "wifi",
    note: "More devices than desks, and all of them on one line.",
  },
  {
    id: "q4",
    label: "Reviewed, not renewed",
    people: 6,
    plan: 92,
    kit: "lan",
    note: "Changed because the business changed, not because a contract did.",
  },
];

const ROSTER = [
  { name: "Aarushi Peri", photo: `${ASSETS}/team-aarushi.webp` },
  { name: "William Meek", photo: `${ASSETS}/team-william.webp` },
  { name: "Ida Jones", photo: `${ASSETS}/team-ida.webp` },
  { name: "Lei Quynh", photo: `${ASSETS}/team-lei.webp` },
  { name: "TJ Woodward", photo: `${ASSETS}/team-tj.webp` },
  { name: "Priya Shah", photo: `${ASSETS}/contact-8.webp` },
];

/** The kit that arrives as the floor fills, in the order it usually does. */
const KIT: {
  id: string;
  icon: LucideIcon;
  label: string;
  frame: string;
  depth: number;
  joint: JointSpec;
  plan: JointSpec;
}[] = [
  {
    id: "router",
    icon: Router,
    label: "Managed router",
    frame: "top-[8%] left-[80%] w-[18%]",
    depth: 0.5,
    joint: { id: "kit-router", side: "l", left: "0%", top: "50%" },
    plan: { id: "plan-r1", side: "r", left: "100%", top: "24%" },
  },
  {
    id: "wifi",
    icon: Wifi,
    label: "Business Wi-Fi",
    frame: "top-[38%] left-[80%] w-[18%]",
    depth: 0.7,
    joint: { id: "kit-wifi", side: "l", left: "0%", top: "50%" },
    plan: { id: "plan-r2", side: "r", left: "100%", top: "50%" },
  },
  {
    id: "lan",
    icon: Network,
    label: "LAN and switching",
    frame: "top-[68%] left-[80%] w-[18%]",
    depth: 0.9,
    joint: { id: "kit-lan", side: "l", left: "0%", top: "50%" },
    plan: { id: "plan-r3", side: "r", left: "100%", top: "76%" },
  },
];

const FLOOR_JOINT: JointSpec = {
  id: "growth-floor",
  side: "r",
  left: "100%",
  top: "50%",
};
const PLAN_IN: JointSpec = { id: "plan-in", side: "l", left: "0%", top: "50%" };

const BEAT_S = 3;
const LOOP_S = BEAT_S * QUARTERS.length;

export function FeatureGrowthScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests at the end of the year, with everything arrived.
  const index = still ? QUARTERS.length - 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = QUARTERS[index];
  const arrived = new Set(
    QUARTERS.slice(0, index + 1)
      .map((quarter) => quarter.kit)
      .filter((kit): kit is string => kit !== null),
  );

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={[
        { from: FLOOR_JOINT.id, to: PLAN_IN.id, lit: true },
        ...KIT.map((item) => ({
          from: item.joint.id,
          to: item.plan.id,
          lit: arrived.has(item.id),
        })),
      ]}
    >
      {/* Which quarter this is. */}
      <div
        className="parallax absolute top-[4%] left-[30%] w-[40%]"
        style={{ "--depth": 0.35 } as CSSProperties}
      >
        <ScenePill
          icon={CalendarRange}
          label={now.label}
          size="md"
          active
          className="mx-auto"
        />
      </div>

      {/* The floor, and who is on it. */}
      <Layer
        className="top-[19%] left-[2%] w-[30%]"
        depth={0.75}
        order={30}
        joints={[FLOOR_JOINT]}
        lit
      >
        <div className="glass-panel flex flex-col gap-[0.8cqw] rounded-[1.4cqw] p-[1cqw]">
          {/* A strip rather than a square: cropped to a thumbnail this photo
              reads as one more portrait, which is the one thing the header
              must not be. */}
          <span className="relative block aspect-[16/7] overflow-hidden rounded-[0.9cqw] border-[0.2cqw] border-card shadow-sm">
            <Image
              src={`${ASSETS}/location-office.webp`}
              alt=""
              fill
              sizes="(min-width: 1152px) 22rem, 30vw"
              loading="eager"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-foreground/65 to-transparent"
            />
            <span className="absolute bottom-[0.5cqw] left-[0.7cqw] flex flex-col leading-tight text-card">
              <span className="text-[0.95cqw] font-semibold">The floor</span>
              <span className="text-[0.7cqw] opacity-80">
                Same office, more of it in use
              </span>
            </span>
          </span>

          <span className="flex flex-col gap-[0.4cqw]">
            {ROSTER.map(({ name, photo }, seat) => {
              const here = seat < now.people;
              const newest = seat === now.people - 1;

              return (
                <span
                  key={name}
                  className={cn(
                    "flex items-center gap-[0.55cqw] rounded-[0.7cqw] px-[0.5cqw] py-[0.35cqw] transition-all duration-700",
                    here
                      ? "bg-card/80 opacity-100"
                      : "bg-transparent opacity-30",
                  )}
                >
                  <Portrait src={photo} className="w-[1.9cqw]" />
                  <span className="text-[0.8cqw] font-medium">{name}</span>
                  {newest ? (
                    <span className="ml-auto flex items-center gap-[0.3cqw] rounded-full bg-primary px-[0.5cqw] py-[0.15cqw] text-[0.62cqw] font-semibold text-primary-foreground">
                      <UserPlus className="size-[0.7cqw]" />
                      New
                    </span>
                  ) : here ? null : (
                    <span className="ml-auto text-[0.66cqw] text-muted-foreground">
                      Desk free
                    </span>
                  )}
                </span>
              );
            })}
          </span>
        </div>
      </Layer>

      {/* The plan, stepping up beside them. */}
      <Layer
        className="top-[30%] left-[38%] w-[36%]"
        depth={0.5}
        order={20}
        active
        glow
        joints={[PLAN_IN, ...KIT.map((item) => item.plan)]}
        lit
      >
        <div className="glass-panel glass-tile-lit flex flex-col gap-[0.9cqw] rounded-[1.5cqw] p-[1.2cqw]">
          <span className="flex items-center gap-[0.6cqw]">
            <span className="flex size-[2.4cqw] shrink-0 items-center justify-center rounded-[0.7cqw] bg-primary text-primary-foreground shadow-md shadow-primary/40">
              <TrendingUp className="size-1/2" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[1.05cqw] font-semibold">Your plan</span>
              <span className="text-[0.72cqw] text-muted-foreground">
                Reviewed against the office, not the calendar
              </span>
            </span>
          </span>

          {/* Four steps, one per quarter. The one just taken is solid. */}
          <span className="flex h-[5cqw] items-end gap-[0.6cqw]">
            {QUARTERS.map((quarter, step) => {
              const taken = step <= index;

              return (
                <span
                  key={quarter.id}
                  className={cn(
                    "flex-1 rounded-t-[0.4cqw] transition-all duration-700 ease-out",
                    taken ? "bg-linear-to-t from-brand-from to-brand-to" : "bg-muted",
                  )}
                  style={{ height: `${quarter.plan}%` }}
                />
              );
            })}
          </span>

          <span className="h-px bg-border" />

          <span className="flex min-h-[2cqw] items-start gap-[0.5cqw] text-[0.8cqw]">
            <span className="mt-[0.3cqw] size-[0.45cqw] shrink-0 rounded-full bg-primary" />
            <span className="leading-snug text-muted-foreground">
              {now.note}
            </span>
          </span>
        </div>
      </Layer>

      {KIT.map((item) => {
        const here = arrived.has(item.id);

        return (
          <Layer
            key={item.id}
            className={item.frame}
            depth={item.depth}
            order={20}
            active={here}
            joints={[item.joint]}
            lit={here}
          >
            <div
              className={cn(
                "glass-tile flex items-center gap-[0.6cqw] rounded-[1.2cqw] p-[0.9cqw] transition-all duration-700",
                here ? "glass-tile-lit opacity-100" : "opacity-45",
              )}
            >
              <span
                className={cn(
                  "flex size-[2.1cqw] shrink-0 items-center justify-center rounded-[0.6cqw] transition-colors duration-500",
                  here
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-primary",
                )}
              >
                <item.icon className="size-1/2" />
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="text-[0.9cqw] font-semibold">
                  {item.label}
                </span>
                <span className="text-[0.7cqw] text-muted-foreground">
                  {here ? "On the same service" : "When you need it"}
                </span>
              </span>
            </div>
          </Layer>
        );
      })}

      {/* One supplier under all of it. */}
      <div
        className="parallax absolute top-[82%] left-[6%] w-[30%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.7cqw] rounded-[1cqw] px-[1cqw] py-[0.7cqw]">
          <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Building2 className="size-1/2" />
          </span>
          <span className="text-[0.88cqw] leading-tight">
            One team for the line and everything plugged into it.
          </span>
        </div>
      </div>
    </Scene>
  );
}
