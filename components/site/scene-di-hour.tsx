"use client";

import type { CSSProperties } from "react";
import {
  Clock,
  Headset,
  PhoneCall,
  PhoneOff,
  TrendingDown,
  Users,
  Video,
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
import {
  SceneChip,
  SceneCorners,
  SceneMeter,
  ScenePanel,
} from "@/components/site/internet-scene-parts";
import {
  AppBar,
  DeviceLaptop,
  DevicePhone,
  PEOPLE,
  PersonRow,
  PlaceFrame,
  PLACES,
} from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * One degraded hour, with the cost of it in the room.
 *
 * Dedicated internet is bought by people for whom a bad hour is expensive,
 * and the page says so — but "an hour of degraded throughput costs you
 * money, meetings or customers" is an abstraction, and abstractions do not
 * make anyone pick up a phone. So the scene puts the hour in a room where
 * the cost is visible: a support floor, a queue that grows, and four people
 * who can all see the same board.
 *
 * The recovery at the end is the point. Nothing in the room changed; the
 * line did.
 *
 * The queue is the scene's own illustration. No figure here is a claim about
 * throughput, capacity or any customer's numbers.
 */

type Beat = {
  id: string;
  clock: string;
  /** How the hour is going. */
  quality: number;
  waiting: number;
  dropped: number;
  state: "fine" | "slipping" | "bad" | "fixed";
  note: string;
};

const HOUR: Beat[] = [
  {
    id: "fine",
    clock: "14:00",
    quality: 94,
    waiting: 2,
    dropped: 0,
    state: "fine",
    note: "An ordinary afternoon. Calls connect, the CRM opens, nobody is watching the board.",
  },
  {
    id: "slip",
    clock: "14:20",
    quality: 61,
    waiting: 6,
    dropped: 1,
    state: "slipping",
    note: "Something upstream is contended. Nothing has failed — it has just got slower, which is harder to report.",
  },
  {
    id: "bad",
    clock: "14:40",
    quality: 28,
    waiting: 14,
    dropped: 5,
    state: "bad",
    note: "Audio is breaking up, the CRM is timing out, and customers are hanging up before anyone reaches them.",
  },
  {
    id: "fixed",
    clock: "15:00",
    quality: 96,
    waiting: 3,
    dropped: 0,
    state: "fixed",
    note: "On a dedicated circuit this hour does not happen, because the capacity was never anyone else's to take.",
  },
];

const FLOOR: { person: { name: string; photo: string }; doing: string }[] = [
  { person: PEOPLE.lei, doing: "On a customer call" },
  { person: PEOPLE.tj, doing: "On a customer call" },
  { person: PEOPLE.priya, doing: "Waiting for the CRM" },
  { person: PEOPLE.daniel, doing: "Calling a client back" },
];

const ROOM: JointSpec[] = [
  { id: "hour-room", side: "r", left: "100%", top: "50%" },
];
const BOARD: JointSpec[] = [
  { id: "hour-board-in", side: "l", left: "0%", top: "50%" },
  { id: "hour-board-out", side: "r", left: "100%", top: "50%" },
];
const CALLER: JointSpec[] = [
  { id: "hour-caller", side: "l", left: "0%", top: "50%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * HOUR.length;

export function DedicatedHourScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests at the worst of it, which is what is being sold against.
  const index = still ? 2 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = HOUR[index];
  const bad = now.state === "bad" || now.state === "slipping";

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/920]"
      wires={[
        { from: ROOM[0].id, to: BOARD[0].id, lit: true },
        { from: BOARD[1].id, to: CALLER[0].id, lit: !bad },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Clock, frame: "top-[8%] left-[3%] w-[5%]" },
          { icon: Headset, frame: "top-[8%] left-[92%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* The floor it is happening to. */}
      <Layer
        className="top-[20%] left-[2%] w-[25%]"
        depth={0.8}
        order={30}
        active
        joints={ROOM}
        lit
      >
        <ScenePanel
          icon={Users}
          title="The support floor"
          subtitle="Four people, one afternoon"
          aside={<SceneChip label={now.clock} tone="on" />}
        >
          <PlaceFrame
            src={PLACES.office}
            ratio="aspect-[16/9]"
            caption="14:00 — 15:00"
          />

          <span className="flex flex-col gap-[0.3cqw]">
            {FLOOR.map((seat, step) => (
              <PersonRow
                key={seat.person.name}
                person={seat.person}
                doing={
                  bad && step < 2
                    ? "Apologising for the audio"
                    : bad
                      ? "Waiting for a page to load"
                      : seat.doing
                }
                device={bad && step < 2 ? PhoneOff : PhoneCall}
                active={!bad}
              />
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* The board everyone in the room can see. */}
      <Layer
        className="top-[14%] left-[30%] w-[38%]"
        depth={0.5}
        order={20}
        active
        glow
        joints={BOARD}
        lit
      >
        <DeviceLaptop>
          <AppBar
            title="Floor board"
            right={
              <span
                className={cn(
                  "flex items-center gap-[0.3cqw] rounded-full px-[0.5cqw] py-[0.15cqw] text-[0.6cqw] transition-colors duration-500",
                  bad
                    ? "bg-foreground text-background"
                    : "bg-accent text-accent-foreground",
                )}
              >
                <Clock className="size-[0.65cqw]" />
                {now.clock}
              </span>
            }
          />
          <div className="flex flex-1 flex-col justify-center gap-[0.7cqw] bg-linear-to-b from-accent/40 to-card p-[1cqw]">
            <SceneMeter
              label="Call quality"
              caption={
                now.state === "fine" || now.state === "fixed"
                  ? "Clean"
                  : now.state === "slipping"
                    ? "Slipping"
                    : "Unusable"
              }
              fill={now.quality}
              tone={bad ? "muted" : "brand"}
              height="0.9cqw"
            />

            <span className="flex gap-[0.7cqw]">
              <Counter
                icon={Users}
                label="Customers holding"
                value={now.waiting}
                alarm={now.waiting > 8}
              />
              <Counter
                icon={PhoneOff}
                label="Hung up waiting"
                value={now.dropped}
                alarm={now.dropped > 2}
              />
            </span>
          </div>
        </DeviceLaptop>
      </Layer>

      {/* The person on the other end of it. */}
      <Layer
        className="top-[24%] left-[73%] w-[12%]"
        depth={0.95}
        order={30}
        active={!bad}
        joints={CALLER}
        lit={!bad}
      >
        <DevicePhone dim={bad}>
          <div className="flex flex-1 flex-col items-center justify-center gap-[0.4cqw] bg-linear-to-b from-accent/60 to-card px-[0.5cqw] text-center">
            <Portrait
              src={PEOPLE.ida.photo}
              halo={!bad}
              className="w-[3.4cqw]"
            />
            <span className="text-[0.66cqw] leading-tight font-semibold">
              A customer
            </span>
            <span
              className={cn(
                "text-[0.62cqw] leading-snug transition-colors duration-500",
                bad ? "font-medium text-foreground" : "text-primary",
              )}
            >
              {bad ? "Gave up at 14:46" : "Answered, first time"}
            </span>
          </div>
        </DevicePhone>
      </Layer>

      {/* What the hour was. */}
      <div
        className="parallax absolute top-[74%] left-[14%] w-[68%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.75cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.85cqw]">
          <span
            className={cn(
              "flex size-[2cqw] shrink-0 items-center justify-center rounded-full transition-colors duration-500",
              bad
                ? "bg-foreground text-background"
                : "bg-primary text-primary-foreground",
            )}
          >
            {bad ? (
              <TrendingDown className="size-1/2" />
            ) : (
              <Video className="size-1/2" />
            )}
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            {now.note}
          </span>
        </div>
      </div>

      <div
        className="parallax absolute top-[4%] left-[30%] w-[40%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Clock}
          label="One hour, and what it took with it"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

function Counter({
  icon: Icon,
  label,
  value,
  alarm,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  alarm: boolean;
}) {
  return (
    <span
      className={cn(
        "flex flex-1 items-center gap-[0.55cqw] rounded-[0.7cqw] px-[0.65cqw] py-[0.5cqw] transition-colors duration-500",
        alarm ? "bg-foreground text-background" : "bg-card/85",
      )}
    >
      <Icon
        className={cn(
          "size-[1cqw] shrink-0",
          alarm ? "text-background" : "text-primary",
        )}
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="font-mono text-[1.3cqw] font-semibold tabular-nums">
          {value}
        </span>
        <span
          className={cn(
            "text-[0.62cqw]",
            alarm ? "text-background/70" : "text-muted-foreground",
          )}
        >
          {label}
        </span>
      </span>
    </span>
  );
}
