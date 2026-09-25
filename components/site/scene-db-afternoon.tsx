"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Clock,
  Coffee,
  GraduationCap,
  Home,
  Lock,
  Tv,
  Users,
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
 * Half past three, outside and inside.
 *
 * The page argues contention by describing the neighbours. This scene does
 * the opposite thing with the same material: it shows the neighbourhood
 * getting busier and then refuses to let anything happen indoors. The
 * boredom of the right-hand side is the entire argument, and boredom is very
 * hard to write and easy to draw.
 *
 * The outside column is the one that moves. The inside column is held
 * deliberately still — same four people, same four tasks, same meter — so
 * the reader's eye keeps going back to it looking for a change that never
 * comes.
 *
 * Nothing is measured. The street fills up; the office does not notice. That
 * is the whole of it.
 */

type Hour = {
  id: string;
  clock: string;
  /** Who has just joined the street. */
  joined: number;
  note: string;
};

const AFTERNOON: Hour[] = [
  { id: "h1", clock: "14:30", joined: 1, note: "The office upstairs comes back from lunch." },
  { id: "h2", clock: "15:00", joined: 2, note: "The café on the corner fills up for the afternoon." },
  { id: "h3", clock: "15:30", joined: 3, note: "School is out. Forty flats and every one of them streaming." },
  { id: "h4", clock: "16:00", joined: 4, note: "Peak hour on the street, and the busiest the segment gets all day." },
];

const NEIGHBOURS: { icon: LucideIcon; label: string; doing: string }[] = [
  { icon: Building2, label: "The office upstairs", doing: "Back at their desks" },
  { icon: Coffee, label: "A café on the corner", doing: "Guest Wi-Fi, forty phones" },
  { icon: GraduationCap, label: "A school at 15:30", doing: "Everyone home at once" },
  { icon: Home, label: "Forty flats", doing: "Streaming, all evening" },
];

const INSIDE: { person: { name: string; photo: string }; doing: string }[] = [
  { person: PEOPLE.aarushi, doing: "On a client call" },
  { person: PEOPLE.william, doing: "In the CRM" },
  { person: PEOPLE.ida, doing: "Sending a job out" },
  { person: PEOPLE.lei, doing: "Taking payments" },
];

const STREET: JointSpec[] = [
  { id: "aft-street", side: "r", left: "100%", top: "50%" },
];
const SPLIT: JointSpec[] = [
  { id: "aft-split-in", side: "l", left: "0%", top: "50%" },
  { id: "aft-split-out", side: "r", left: "100%", top: "50%" },
];
const OFFICE: JointSpec[] = [
  { id: "aft-office", side: "l", left: "0%", top: "50%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * AFTERNOON.length;

export function DedicatedAfternoonScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests at peak, when the difference is widest.
  const index = still ? AFTERNOON.length - 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = AFTERNOON[index];
  /* Illustrative only: what is left of a shared segment as it fills. */
  const shared = [72, 51, 33, 21][index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/920]"
      wires={[
        { from: STREET[0].id, to: SPLIT[0].id, lit: true },
        { from: SPLIT[1].id, to: OFFICE[0].id, lit: true },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Tv, frame: "top-[8%] left-[3%] w-[5%]" },
          { icon: Lock, frame: "top-[8%] left-[92%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* Outside: the street, filling up. */}
      <Layer
        className="top-[20%] left-[2%] w-[27%]"
        depth={0.75}
        order={30}
        active
        joints={STREET}
        lit
      >
        <ScenePanel
          icon={Users}
          title="Outside, on the street"
          subtitle="Everyone else who shares a segment"
          tone="muted"
          lit={false}
          aside={<SceneChip label={now.clock} tone="off" />}
        >
          <span className="flex flex-col gap-[0.35cqw]">
            {NEIGHBOURS.map((neighbour, step) => {
              const here = step < now.joined;

              return (
                <span
                  key={neighbour.label}
                  className={cn(
                    "flex items-center gap-[0.5cqw] rounded-[0.7cqw] px-[0.6cqw] py-[0.45cqw] transition-all duration-700",
                    here ? "bg-muted" : "bg-card/50 opacity-35",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[1.7cqw] shrink-0 items-center justify-center rounded-[0.5cqw] transition-colors duration-500",
                      here
                        ? "bg-muted-foreground/25 text-foreground/70"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <neighbour.icon className="size-1/2" />
                  </span>
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="text-[0.76cqw] font-medium">
                      {neighbour.label}
                    </span>
                    <span className="text-[0.64cqw] text-muted-foreground">
                      {here ? neighbour.doing : "Not yet"}
                    </span>
                  </span>
                </span>
              );
            })}
          </span>

          <SceneMeter
            label="Left on a shared segment"
            caption="If you were on one"
            fill={shared}
            tone="shared"
            height="0.8cqw"
          />
        </ScenePanel>
      </Layer>

      {/* The two lines, side by side, on the same clock. */}
      <Layer
        className="top-[16%] left-[32%] w-[34%]"
        depth={0.5}
        order={20}
        active
        glow
        joints={SPLIT}
        lit
      >
        <DeviceLaptop>
          <AppBar
            title="Your circuit, this afternoon"
            right={
              <span className="flex items-center gap-[0.3cqw] rounded-full bg-accent px-[0.5cqw] py-[0.15cqw] text-[0.6cqw] text-accent-foreground">
                <Clock className="size-[0.65cqw] text-primary" />
                {now.clock}
              </span>
            }
          />
          <div className="flex flex-1 flex-col justify-center gap-[0.6cqw] bg-linear-to-b from-accent/40 to-card p-[1cqw]">
            {/* The flat line is the product. It is drawn as a rail rather
                than a chart so there is nothing for the eye to mistake for
                movement. */}
            <span className="flex items-end gap-[0.3cqw]">
              {AFTERNOON.map((hour, step) => (
                <span key={hour.id} className="flex flex-1 flex-col gap-[0.3cqw]">
                  <span className="h-[3.4cqw] rounded-t-[0.25cqw] bg-linear-to-t from-brand-from to-brand-to" />
                  <span
                    className={cn(
                      "text-center text-[0.6cqw] transition-colors duration-500",
                      step === index ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {hour.clock}
                  </span>
                </span>
              ))}
            </span>

            <span className="flex items-center gap-[0.5cqw] rounded-[0.6cqw] bg-accent px-[0.65cqw] py-[0.45cqw]">
              <Lock className="size-[0.9cqw] shrink-0 text-primary" />
              <span className="text-[0.72cqw] font-medium text-accent-foreground">
                Nothing on the street is on your circuit
              </span>
            </span>
          </div>
        </DeviceLaptop>
      </Layer>

      {/* Inside: nothing happening, on purpose. */}
      <Layer
        className="top-[20%] left-[70%] w-[28%]"
        depth={0.75}
        order={30}
        active
        joints={OFFICE}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="Inside, on your floor"
          subtitle="The same four people, the same four tasks"
          aside={<SceneChip icon={Lock} label="Unchanged" tone="on" />}
        >
          <PlaceFrame
            src={PLACES.office}
            ratio="aspect-[16/9]"
            caption="15:30, and nobody looked up"
          />

          <span className="flex flex-col gap-[0.3cqw]">
            {INSIDE.map((seat) => (
              <PersonRow
                key={seat.person.name}
                person={seat.person}
                doing={seat.doing}
                active
              />
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* What just happened outside. */}
      <div
        className="parallax absolute top-[78%] left-[18%] w-[58%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.75cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.85cqw]">
          <span className="flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Users className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            {now.note}
          </span>
        </div>
      </div>

      <div
        className="parallax absolute top-[4%] left-[31%] w-[38%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Clock}
          label="Same afternoon, two different lines"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
