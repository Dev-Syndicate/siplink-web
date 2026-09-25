"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Check,
  ClipboardCheck,
  Gauge,
  MapPinned,
  Ruler,
  Server,
  TrendingUp,
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
  PEOPLE,
  PlaceFrame,
  PLACES,
} from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * Where a port size actually comes from.
 *
 * The range on this page is wide — 50 Mbps to 100 Gbps is four orders of
 * magnitude — and a wide range invites exactly the wrong question, which is
 * "so which one do I get?". The honest answer is that nobody can say until
 * somebody has looked at the address and the work, and this scene is that
 * answer drawn: four inputs, taken in order, and a dial that refuses to
 * settle until the last of them is in.
 *
 * The feasibility step is first for the same reason it is first on the page.
 * Every quote is subject to what is deliverable at the address, and a scene
 * that sized a port before checking would be selling something the copy is
 * careful not to.
 *
 * The dial carries no number at any point. The two ends of the range are the
 * only figures on the stage, and both are stated in the source.
 */

type Step = {
  id: string;
  icon: LucideIcon;
  title: string;
  asks: string;
  answer: string;
  /** How far along the range the dial has committed. */
  settled: number;
  note: string;
};

const STEPS: Step[] = [
  {
    id: "feasibility",
    icon: MapPinned,
    title: "The address",
    asks: "What is deliverable here at all?",
    answer: "Checked before anything is quoted",
    settled: 0,
    note: "Every quote is subject to technical and commercial feasibility at your address, which is why this is the first question rather than the last.",
  },
  {
    id: "work",
    icon: Server,
    title: "The work",
    asks: "What runs, and where does it live?",
    answer: "Cloud systems, voice, and what is hosted on site",
    settled: 34,
    note: "A floor that hosts nothing and a floor the outside world connects into are two different circuits, whatever the headcount says.",
  },
  {
    id: "peak",
    icon: TrendingUp,
    title: "The busy hour",
    asks: "What does the worst hour look like?",
    answer: "Sized against the peak, not the average",
    settled: 62,
    note: "The hour a circuit is judged on is never the hour anyone runs a speed test in — so the sizing is done against the former.",
  },
  {
    id: "headroom",
    icon: Ruler,
    title: "Next year",
    asks: "What is this office about to become?",
    answer: "Headroom, and a path to the next size up",
    settled: 88,
    note: "Upgrades are a change to the service rather than a renegotiation, so the room to grow is designed in rather than bought twice.",
  },
];

const SITE: JointSpec[] = [
  { id: "siz-site", side: "r", left: "100%", top: "50%" },
];
const SHEET: JointSpec[] = [
  { id: "siz-sheet-in", side: "l", left: "0%", top: "50%" },
  { id: "siz-sheet-out", side: "b", left: "50%", top: "100%" },
];
const DIAL: JointSpec[] = [
  { id: "siz-dial", side: "t", left: "50%", top: "0%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * STEPS.length;

export function DedicatedSizingScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the last question, with the dial settled.
  const index = still ? STEPS.length - 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = STEPS[index];
  const settled = now.settled > 0;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/920]"
      wires={[
        { from: SITE[0].id, to: SHEET[0].id, lit: true },
        { from: SHEET[1].id, to: DIAL[0].id, lit: settled },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Ruler, frame: "top-[8%] left-[3%] w-[5%]" },
          { icon: Gauge, frame: "top-[8%] left-[92%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* The address somebody has to look at. */}
      <Layer
        className="top-[22%] left-[2%] w-[22%]"
        depth={0.8}
        order={30}
        active
        joints={SITE}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="Your site"
          subtitle="Not a category on a form"
          aside={<SceneChip label="Per address" tone="on" />}
        >
          <PlaceFrame
            src={PLACES.office}
            ratio="aspect-[16/10]"
            caption="Surveyed, then quoted"
          />
          <span className="flex items-center gap-[0.5cqw] rounded-[0.7cqw] bg-accent px-[0.6cqw] py-[0.45cqw]">
            <Portrait src={PEOPLE.tj.photo} className="w-[1.8cqw]" />
            <span className="text-[0.7cqw] text-accent-foreground">
              Feasibility, before a price
            </span>
          </span>
        </ScenePanel>
      </Layer>

      {/* The four questions, being answered. */}
      <Layer
        className="top-[14%] left-[27%] w-[38%]"
        depth={0.5}
        order={20}
        active
        glow
        joints={SHEET}
        lit
      >
        <DeviceLaptop>
          <AppBar
            title="Sizing worksheet"
            right={
              <span className="flex items-center gap-[0.3cqw] rounded-full bg-accent px-[0.5cqw] py-[0.15cqw] text-[0.6cqw] text-accent-foreground">
                <ClipboardCheck className="size-[0.65cqw] text-primary" />
                {index + 1} of {STEPS.length}
              </span>
            }
          />
          <div className="flex flex-1 flex-col justify-center gap-[0.4cqw] bg-linear-to-b from-accent/40 to-card p-[0.9cqw]">
            {STEPS.map((step, position) => {
              const done = position <= index;

              return (
                <span
                  key={step.id}
                  className={cn(
                    "flex items-center gap-[0.55cqw] rounded-[0.55cqw] px-[0.6cqw] py-[0.45cqw] transition-all duration-500",
                    position === index
                      ? "bg-accent ring-1 ring-primary"
                      : done
                        ? "bg-card/85"
                        : "bg-card/50 opacity-40",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[1.5cqw] shrink-0 items-center justify-center rounded-[0.4cqw] transition-colors duration-500",
                      done
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {done ? (
                      <Check className="size-1/2" />
                    ) : (
                      <step.icon className="size-1/2" />
                    )}
                  </span>
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="text-[0.72cqw] font-semibold">
                      {step.title}
                    </span>
                    <span className="text-[0.62cqw] text-muted-foreground">
                      {step.asks}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "ml-auto pl-[0.5cqw] text-right text-[0.62cqw] transition-colors duration-500",
                      done ? "text-primary" : "text-muted-foreground/50",
                    )}
                  >
                    {done ? step.answer : "—"}
                  </span>
                </span>
              );
            })}
          </div>
        </DeviceLaptop>
      </Layer>

      {/* The range, and where the answer is landing in it. */}
      <Layer
        className="top-[24%] left-[69%] w-[29%]"
        depth={0.8}
        order={30}
        active={settled}
        joints={DIAL}
        lit={settled}
      >
        <ScenePanel
          icon={Gauge}
          title="The port"
          subtitle={
            settled ? "Narrowing as the answers arrive" : "Nothing to size yet"
          }
          lit={settled}
          tone={settled ? "brand" : "muted"}
          aside={
            <SceneChip
              label={settled ? "Narrowing" : "Waiting"}
              tone={settled ? "on" : "off"}
            />
          }
        >
          <SceneMeter fill={now.settled} height="1.1cqw" />

          <span className="flex items-center justify-between text-[0.68cqw] font-medium">
            <span className="font-mono">50 Mbps</span>
            <span className="text-muted-foreground">the range</span>
            <span className="font-mono">100 Gbps</span>
          </span>

          <span className="rounded-[0.7cqw] bg-card/70 px-[0.6cqw] py-[0.45cqw] text-[0.7cqw] leading-snug text-muted-foreground">
            No figure is quoted until all four answers are in — which is why
            there is no price list on this page.
          </span>
        </ScenePanel>
      </Layer>

      {/* Why this question is being asked at all. */}
      <div
        className="parallax absolute top-[76%] left-[16%] w-[62%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-start gap-[0.75cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.85cqw]">
          <span className="mt-[0.15cqw] flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <now.icon className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            {now.note}
          </span>
        </div>
      </div>

      <div
        className="parallax absolute top-[4%] left-[32%] w-[36%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={now.icon}
          label={now.title}
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
