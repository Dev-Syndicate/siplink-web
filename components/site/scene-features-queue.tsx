"use client";

import type { CSSProperties } from "react";
import {
  Ban,
  Check,
  Cloud,
  CreditCard,
  Hourglass,
  LoaderCircle,
  PhoneCall,
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
  ScenePanel,
} from "@/components/site/internet-scene-parts";
import {
  AppBar,
  DeviceLaptop,
  DevicePhone,
  PEOPLE,
} from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * The same four things, on two kinds of line.
 *
 * The first of the four cards below says business traffic does not politely
 * queue. That is the claim, and the only honest way to show a claim about
 * queueing is to show something queueing — so the scene runs the identical
 * moment twice, on a consumer-shaped line and on a business one, and lets
 * the left-hand side fail in the four small ways everyone recognises: the
 * spinner, the frozen caller, the retry, the apology.
 *
 * The right-hand side is deliberately boring. Nothing on it happens at all,
 * which is the product.
 *
 * Neither side carries a figure. What differs is whether the four things
 * wait for each other, not how fast either line is.
 */

type Job = {
  id: string;
  icon: LucideIcon;
  what: string;
  /** What it looks like when the line makes it wait. */
  bad: string;
  good: string;
  person: { name: string; photo: string };
};

const JOBS: Job[] = [
  {
    id: "call",
    icon: Video,
    what: "A client on video",
    bad: "Frozen mid-sentence",
    good: "Running, and nobody said sorry",
    person: PEOPLE.aarushi,
  },
  {
    id: "cloud",
    icon: Cloud,
    what: "The CRM loading",
    bad: "Spinning, for the fourth time",
    good: "Open before anyone noticed",
    person: PEOPLE.william,
  },
  {
    id: "card",
    icon: CreditCard,
    what: "A card payment",
    bad: "Timed out — please retry",
    good: "Approved, in front of the customer",
    person: PEOPLE.lei,
  },
  {
    id: "voice",
    icon: PhoneCall,
    what: "A call on the desk phone",
    bad: "Choppy, then dropped",
    good: "Its own lane, all morning",
    person: PEOPLE.tj,
  },
];

const LEFT: JointSpec[] = [
  { id: "q-left", side: "r", left: "100%", top: "50%" },
];
const MID: JointSpec[] = [
  { id: "q-mid-l", side: "l", left: "0%", top: "50%" },
  { id: "q-mid-r", side: "r", left: "100%", top: "50%" },
];
const RIGHT: JointSpec[] = [
  { id: "q-right", side: "l", left: "0%", top: "50%" },
];

const BEAT_S = 2.5;
const LOOP_S = BEAT_S * JOBS.length;

export function FeatureQueueScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the frozen client call.
  const index = still ? 0 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = JOBS[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/920]"
      wires={[
        { from: LEFT[0].id, to: MID[0].id, lit: true },
        { from: MID[1].id, to: RIGHT[0].id, lit: true },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Hourglass, frame: "top-[8%] left-[3%] w-[5%]" },
          { icon: Check, frame: "top-[8%] left-[92%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* On a line that makes them take turns. */}
      <Layer
        className="top-[20%] left-[1.5%] w-[30%]"
        depth={0.75}
        order={30}
        active
        joints={LEFT}
        lit
      >
        <ScenePanel
          icon={Hourglass}
          title="A line that queues"
          subtitle="Everything waits for everything else"
          tone="muted"
          lit={false}
          aside={<SceneChip icon={Ban} label="Taking turns" tone="off" />}
        >
          <span className="flex flex-col gap-[0.35cqw]">
            {JOBS.map((job, step) => (
              <span
                key={job.id}
                className={cn(
                  "flex items-center gap-[0.5cqw] rounded-[0.7cqw] px-[0.6cqw] py-[0.45cqw] transition-all duration-500",
                  step === index ? "bg-muted" : "bg-card/50 opacity-55",
                )}
              >
                <span className="flex size-[1.7cqw] shrink-0 items-center justify-center rounded-[0.5cqw] bg-muted-foreground/20 text-muted-foreground">
                  {step === index ? (
                    <LoaderCircle className="size-1/2" />
                  ) : (
                    <job.icon className="size-1/2" />
                  )}
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-[0.76cqw] font-medium">{job.what}</span>
                  <span className="text-[0.66cqw] text-muted-foreground">
                    {job.bad}
                  </span>
                </span>
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* The same moment, in the middle, with a face on it. */}
      <Layer
        className="top-[13%] left-[35%] w-[30%]"
        depth={0.5}
        order={20}
        active
        glow
        joints={MID}
        lit
      >
        <DeviceLaptop>
          <AppBar
            title={now.what}
            right={
              <span className="flex items-center gap-[0.3cqw] rounded-full bg-accent px-[0.5cqw] py-[0.15cqw] text-[0.6cqw] text-accent-foreground">
                <now.icon className="size-[0.65cqw] text-primary" />
                09:14
              </span>
            }
          />
          <div className="flex flex-1 items-center justify-center gap-[1.2cqw] bg-linear-to-b from-accent/50 to-card p-[0.9cqw]">
            <span className="flex flex-col items-center gap-[0.4cqw]">
              <span className="relative">
                <Portrait src={now.person.photo} className="w-[4.4cqw]" />
                <span className="absolute -right-[0.3cqw] -bottom-[0.3cqw] flex size-[1.6cqw] items-center justify-center rounded-full border-[0.18cqw] border-card bg-muted text-muted-foreground">
                  <LoaderCircle className="size-1/2" />
                </span>
              </span>
              <span className="text-[0.68cqw] font-medium">On the left</span>
              <span className="text-[0.64cqw] text-muted-foreground">
                {now.bad}
              </span>
            </span>

            <span className="h-[5cqw] w-px bg-border" />

            <span className="flex flex-col items-center gap-[0.4cqw]">
              <span className="relative">
                <Portrait src={now.person.photo} halo className="w-[4.4cqw]" />
                <span className="absolute -right-[0.3cqw] -bottom-[0.3cqw] flex size-[1.6cqw] items-center justify-center rounded-full border-[0.18cqw] border-card bg-primary text-primary-foreground">
                  <Check className="size-1/2" />
                </span>
              </span>
              <span className="text-[0.68cqw] font-medium">On the right</span>
              <span className="text-[0.64cqw] text-primary">{now.good}</span>
            </span>
          </div>
        </DeviceLaptop>
      </Layer>

      {/* On a line sized for the hour when all four happen. */}
      <Layer
        className="top-[20%] left-[68.5%] w-[30%]"
        depth={0.75}
        order={30}
        active
        joints={RIGHT}
        lit
      >
        <ScenePanel
          icon={Check}
          title="A business line"
          subtitle="Sized for the hour all four happen in"
          aside={<SceneChip icon={Check} label="All at once" tone="on" />}
        >
          <span className="flex flex-col gap-[0.35cqw]">
            {JOBS.map((job) => (
              <span
                key={job.id}
                className="flex items-center gap-[0.5cqw] rounded-[0.7cqw] bg-accent px-[0.6cqw] py-[0.45cqw]"
              >
                <span className="flex size-[1.7cqw] shrink-0 items-center justify-center rounded-[0.5cqw] bg-primary text-primary-foreground">
                  <job.icon className="size-1/2" />
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-[0.76cqw] font-medium">{job.what}</span>
                  <span className="text-[0.66cqw] text-primary">
                    {job.good}
                  </span>
                </span>
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* The one who notices either way. */}
      <Layer
        className="top-[62%] left-[43.5%] w-[13%]"
        depth={0.95}
        order={30}
        active
        joints={[]}
        lit
      >
        <DevicePhone>
          <div className="flex flex-1 flex-col items-center justify-center gap-[0.4cqw] bg-linear-to-b from-accent/60 to-card px-[0.5cqw] text-center">
            <Portrait src={PEOPLE.priya.photo} halo className="w-[3.4cqw]" />
            <span className="text-[0.68cqw] leading-tight font-semibold">
              The customer
            </span>
            <span className="text-[0.62cqw] leading-snug text-muted-foreground">
              Only ever hears one of these two
            </span>
          </div>
        </DevicePhone>
      </Layer>

      <div
        className="parallax absolute top-[4%] left-[33%] w-[34%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Users}
          label="Same four things, same minute"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
