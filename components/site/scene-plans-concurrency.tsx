"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Clock,
  Cloud,
  Laptop,
  Users,
  Video,
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
  SceneMeter,
  ScenePanel,
} from "@/components/site/internet-scene-parts";
import {
  AppBar,
  DeviceLaptop,
  PEOPLE,
  PersonRow,
  PlaceFrame,
  PLACES,
} from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * Headcount is not the number a plan is sized from.
 *
 * The page says it in a line — "how many people are actually using it at the
 * same time, at the busiest hour — rarely the same as the headcount" — and a
 * line is exactly the wrong medium for it, because the reader's objection is
 * arithmetic. So the scene counts. Nine people arrive over twenty minutes,
 * the number on the line climbs behind them, and the two figures are put
 * side by side at the end so the gap is the thing you are left looking at.
 *
 * Both numbers are the scene's own arithmetic on its own made-up floor. No
 * ratio is claimed and none is implied for anyone else's office; what is
 * being shown is that the two numbers are different, not by how much.
 */

type Arrival = {
  person: { name: string; photo: string };
  at: string;
  doing: string;
  device: LucideIcon;
  /** Whether this one is actually moving traffic once they sit down. */
  onLine: boolean;
};

const ARRIVALS: Arrival[] = [
  {
    person: PEOPLE.aarushi,
    at: "08:52",
    doing: "Mail syncing, CRM loading",
    device: Cloud,
    onLine: true,
  },
  {
    person: PEOPLE.william,
    at: "08:58",
    doing: "Laptop picking up updates",
    device: Laptop,
    onLine: true,
  },
  {
    person: PEOPLE.ida,
    at: "09:01",
    doing: "Joining a call with the client",
    device: Video,
    onLine: true,
  },
  {
    person: PEOPLE.lei,
    at: "09:03",
    doing: "Reading at a desk, nothing moving",
    device: Laptop,
    onLine: false,
  },
  {
    person: PEOPLE.tj,
    at: "09:05",
    doing: "On the phone, CRM open",
    device: Cloud,
    onLine: true,
  },
  {
    person: PEOPLE.priya,
    at: "09:07",
    doing: "In a meeting, laptop shut",
    device: Laptop,
    onLine: false,
  },
  {
    person: PEOPLE.daniel,
    at: "09:09",
    doing: "Uploading yesterday's work",
    device: Cloud,
    onLine: true,
  },
  {
    person: PEOPLE.marcus,
    at: "09:12",
    doing: "Away from the desk",
    device: Laptop,
    onLine: false,
  },
  {
    person: PEOPLE.elena,
    at: "09:14",
    doing: "Second video call of the morning",
    device: Video,
    onLine: true,
  },
];

const FLOOR: JointSpec[] = [
  { id: "conc-floor", side: "r", left: "100%", top: "50%" },
];
const COUNT: JointSpec[] = [
  { id: "conc-count-in", side: "l", left: "0%", top: "50%" },
  { id: "conc-count-out", side: "b", left: "50%", top: "100%" },
];
const LINE: JointSpec[] = [
  { id: "conc-line", side: "t", left: "50%", top: "0%" },
];

const BEAT_S = 1.6;
const HOLD_S = 5;
const LOOP_S = BEAT_S * ARRIVALS.length + HOLD_S;

export function PlanConcurrencyScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  const inLoop = t % LOOP_S;
  const arrived = still
    ? ARRIVALS.length
    : Math.min(ARRIVALS.length, Math.floor(inLoop / BEAT_S) + 1);
  const full = arrived === ARRIVALS.length;
  const onLine = ARRIVALS.slice(0, arrived).filter((a) => a.onLine).length;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={[
        { from: FLOOR[0].id, to: COUNT[0].id, lit: true },
        { from: COUNT[1].id, to: LINE[0].id, lit: true },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Clock, frame: "top-[6%] left-[4%] w-[5%]" },
          { icon: Wifi, frame: "top-[6%] left-[91%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* The floor arriving. */}
      <Layer
        className="top-[14%] left-[2%] w-[27%]"
        depth={0.8}
        order={30}
        active
        joints={FLOOR}
        lit
      >
        <ScenePanel
          icon={Users}
          title="The floor arrives"
          subtitle="Nine people, twenty minutes"
          aside={
            <SceneChip
              label={`${arrived} in`}
              tone={full ? "on" : "quiet"}
            />
          }
        >
          <span className="flex flex-col gap-[0.25cqw]">
            {ARRIVALS.map((entry, step) => (
              <span
                key={entry.person.name}
                className={cn(
                  "transition-opacity duration-500",
                  step < arrived ? "opacity-100" : "opacity-25",
                )}
              >
                <PersonRow
                  person={entry.person}
                  doing={`${entry.at} · ${entry.doing}`}
                  device={entry.device}
                  active={step < arrived && entry.onLine}
                />
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* The two numbers, side by side. */}
      <Layer
        className="top-[22%] left-[34%] w-[30%]"
        depth={0.5}
        order={30}
        active
        glow
        joints={COUNT}
        lit
      >
        <ScenePanel
          icon={Clock}
          title="09:05, the busiest twenty minutes"
          subtitle="The hour a plan is judged on"
          aside={<SceneChip label="Peak" tone="on" />}
        >
          <span className="flex gap-[0.7cqw]">
            <Tally label="On the payroll" value={arrived} muted />
            <Tally label="On the line at once" value={onLine} />
          </span>

          <SceneMeter
            label="Of those in the building"
            caption={full ? "The number that matters" : "Still arriving"}
            fill={arrived ? (onLine / arrived) * 100 : 0}
            height="0.8cqw"
          />

          <span className="min-h-[2cqw] text-[0.78cqw] leading-snug text-pretty text-muted-foreground">
            {full
              ? "Two are reading, one is in a meeting, one is away from the desk. A plan built on the left-hand number is a plan built for a floor that never exists."
              : "Watch the gap open. Everybody arrives; not everybody is on it."}
          </span>
        </ScenePanel>
      </Layer>

      {/* The room it is happening in. */}
      <Layer
        className="top-[12%] left-[70%] w-[14%]"
        depth={0.35}
        order={10}
        joints={[]}
        lit
      >
        <PlaceFrame src={PLACES.office} caption="Monday, 09:05" />
      </Layer>

      {/* Somebody actually watching it. */}
      <Layer
        className="top-[44%] left-[66%] w-[31%]"
        depth={0.7}
        order={20}
        active
        joints={[]}
        lit
      >
        <DeviceLaptop>
          <AppBar
            title="Sessions, live"
            right={
              <span className="flex items-center gap-[0.3cqw] rounded-full bg-accent px-[0.5cqw] py-[0.15cqw] text-[0.6cqw] text-accent-foreground">
                <Clock className="size-[0.65cqw] text-primary" />
                09:05
              </span>
            }
          />
          <div className="flex flex-1 flex-col justify-end gap-[0.4cqw] bg-linear-to-b from-accent/40 to-card p-[0.8cqw]">
            {/* The morning, as a column per two minutes. */}
            <span className="flex h-full items-end gap-[0.3cqw]">
              {ARRIVALS.map((entry, step) => {
                const shown = step < arrived;
                const height = shown
                  ? 24 +
                    ARRIVALS.slice(0, step + 1).filter((a) => a.onLine).length *
                      12
                  : 6;

                return (
                  <span
                    key={entry.person.name}
                    className={cn(
                      "flex-1 rounded-t-[0.2cqw] transition-all duration-700 ease-out",
                      shown ? "bg-linear-to-t from-brand-from to-brand-to" : "bg-muted",
                    )}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </span>
            <span className="flex justify-between text-[0.6cqw] text-muted-foreground">
              <span>08:52</span>
              <span>09:14</span>
            </span>
          </div>
        </DeviceLaptop>
      </Layer>

      {/* What it all lands on. */}
      <Layer
        className="top-[80%] left-[32%] w-[34%]"
        depth={0.6}
        order={20}
        active
        joints={LINE}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="The plan is sized from the right-hand number"
          subtitle="And from what those people are actually running"
        />
      </Layer>

      <div
        className="parallax absolute top-[5%] left-[30%] w-[38%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Users}
          label="Headcount is not the number"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

function Tally({
  label,
  value,
  muted,
}: {
  label: string;
  value: number;
  muted?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex flex-1 flex-col items-center gap-[0.15cqw] rounded-[0.9cqw] px-[0.6cqw] py-[0.7cqw] transition-colors duration-500",
        muted ? "bg-card/70" : "bg-accent",
      )}
    >
      <span
        className={cn(
          "font-mono text-[2.2cqw] leading-none font-semibold tabular-nums transition-colors duration-500",
          muted ? "text-muted-foreground" : "text-primary",
        )}
      >
        {value}
      </span>
      <span className="text-center text-[0.66cqw] leading-tight text-muted-foreground">
        {label}
      </span>
    </span>
  );
}
