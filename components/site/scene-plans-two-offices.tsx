"use client";

import type { CSSProperties } from "react";
import {
  ArrowUpFromLine,
  Building2,
  Cctv,
  Cloud,
  FolderUp,
  Headset,
  PhoneCall,
  Scale,
  Users,
  Video,
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
  PEOPLE,
  PlaceFrame,
  PLACES,
} from "@/components/site/internet-scene-devices";
import { Portrait } from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Two offices, the same headcount, and two different plans.
 *
 * The scene before this one takes headcount apart. This one finishes the
 * job: even the corrected number does not decide a plan on its own, because
 * twelve people sending video out all afternoon and twelve people on the
 * phone are two different loads on the same line.
 *
 * Both sides are drawn identically and differ only in what is running, so
 * the reader is not given any visual cue to prefer one — the bars move
 * because the work is different, not because one office is bigger.
 *
 * The bars carry no scale and the two offices are illustrations. What is
 * being claimed is that the answer differs, not what either answer is.
 */

type Office = {
  id: string;
  name: string;
  kind: string;
  people: { name: string; photo: string }[];
  headcount: number;
  runs: { icon: LucideIcon; label: string }[];
  /** Relative pull on each half. Illustrative, and unlabelled on screen. */
  down: number;
  up: number;
  drives: string;
};

const OFFICES: Office[] = [
  {
    id: "studio",
    name: "A design studio",
    kind: "Twelve people, one floor",
    people: [PEOPLE.aarushi, PEOPLE.ida, PEOPLE.daniel],
    headcount: 12,
    runs: [
      { icon: FolderUp, label: "Sending artwork out, all afternoon" },
      { icon: Video, label: "Client reviews on video" },
      { icon: Cloud, label: "Everything backed up overnight" },
    ],
    down: 52,
    up: 94,
    drives:
      "Almost all of the load leaves the building. The upload is what decides this one, and it is the half a consumer service is worst at.",
  },
  {
    id: "desk",
    name: "A support desk",
    kind: "Twelve people, one floor",
    people: [PEOPLE.lei, PEOPLE.tj, PEOPLE.priya],
    headcount: 12,
    runs: [
      { icon: PhoneCall, label: "On calls from open to close" },
      { icon: Headset, label: "CRM open on every desk" },
      { icon: Cctv, label: "Cameras on the floor" },
    ],
    down: 44,
    up: 38,
    drives:
      "Hardly any traffic at all, and none of it can stutter. This one is sized for steadiness and for voice having a lane of its own.",
  },
];

const SIDE: Record<string, JointSpec> = {
  studio: { id: "two-studio", side: "r", left: "100%", top: "50%" },
  desk: { id: "two-desk", side: "l", left: "0%", top: "50%" },
};
const MIDDLE: JointSpec[] = [
  { id: "two-mid-l", side: "l", left: "0%", top: "50%" },
  { id: "two-mid-r", side: "r", left: "100%", top: "50%" },
];

const BEAT_S = 3.5;
const LOOP_S = BEAT_S * OFFICES.length;

export function PlanTwoOfficesScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the studio, whose answer is the less expected.
  const index = still ? 0 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = OFFICES[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/900]"
      wires={[
        { from: SIDE.studio.id, to: MIDDLE[0].id, lit: index === 0 },
        { from: SIDE.desk.id, to: MIDDLE[1].id, lit: index === 1 },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Users, frame: "top-[8%] left-[4%] w-[5%]" },
          { icon: ArrowUpFromLine, frame: "top-[8%] left-[91%] w-[5%]", delay: "-3s" },
        ]}
      />

      {OFFICES.map((office, step) => {
        const on = step === index;

        return (
          <Layer
            key={office.id}
            className={
              step === 0
                ? "top-[20%] left-[2%] w-[30%]"
                : "top-[20%] left-[68%] w-[30%]"
            }
            depth={0.75}
            order={30}
            active={on}
            joints={[SIDE[office.id]]}
            lit={on}
          >
            <ScenePanel
              icon={Building2}
              title={office.name}
              subtitle={office.kind}
              lit={on}
              tone={on ? "brand" : "muted"}
              aside={
                <SceneChip
                  label={`${office.headcount} people`}
                  tone={on ? "on" : "off"}
                />
              }
            >
              <PlaceFrame
                src={step === 0 ? PLACES.office : PLACES.home}
                ratio="aspect-[16/9]"
                active={on}
                caption={office.name}
              />

              <span className="flex items-center">
                {office.people.map((person, seat) => (
                  <span
                    key={person.name}
                    className={cn(seat > 0 && "-ml-[0.6cqw]")}
                  >
                    <Portrait src={person.photo} className="w-[1.9cqw]" />
                  </span>
                ))}
                <span className="ml-[0.6cqw] text-[0.7cqw] text-muted-foreground">
                  and nine more
                </span>
              </span>

              <span className="flex flex-col gap-[0.3cqw]">
                {office.runs.map((run) => (
                  <span
                    key={run.label}
                    className={cn(
                      "flex items-center gap-[0.45cqw] rounded-[0.6cqw] px-[0.55cqw] py-[0.35cqw] transition-colors duration-500",
                      on ? "bg-accent" : "bg-card/60",
                    )}
                  >
                    <run.icon
                      className={cn(
                        "size-[0.85cqw] shrink-0 transition-colors duration-500",
                        on ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <span className="text-[0.7cqw] leading-snug">
                      {run.label}
                    </span>
                  </span>
                ))}
              </span>
            </ScenePanel>
          </Layer>
        );
      })}

      {/* The answer, which is not the same answer. */}
      <Layer
        className="top-[26%] left-[35%] w-[30%]"
        depth={0.5}
        order={20}
        active
        glow
        joints={MIDDLE}
        lit
      >
        <ScenePanel
          icon={Scale}
          title="Same headcount, different plan"
          subtitle="Because the work is different"
          aside={<SceneChip label={now.name} tone="on" />}
        >
          <SceneMeter
            label="Down"
            caption="What comes in"
            fill={now.down}
            height="0.9cqw"
          />
          <SceneMeter
            label="Up"
            caption="What goes out"
            fill={now.up}
            height="0.9cqw"
          />

          <span className="min-h-[3cqw] border-t border-border pt-[0.55cqw] text-[0.78cqw] leading-snug text-pretty text-muted-foreground">
            {now.drives}
          </span>
        </ScenePanel>
      </Layer>

      {/* The line the page keeps coming back to. */}
      <div
        className="parallax absolute top-[78%] left-[24%] w-[52%]"
        style={{ "--depth": 0.6 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.7cqw] rounded-[1.1cqw] px-[1cqw] py-[0.75cqw]">
          <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Scale className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            There is no standard office, which is why there is no standard
            plan to sell you.
          </span>
        </div>
      </div>

      <div
        className="parallax absolute top-[5%] left-[32%] w-[36%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Users}
          label="Twelve people either way"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
