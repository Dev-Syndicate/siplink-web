"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Cloud,
  Gauge,
  GitBranch,
  MonitorSmartphone,
  Server,
  Store,
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
  SceneTile,
} from "@/components/site/internet-scene-parts";
import { enterpriseQuestions } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * A design assembling itself, in the order the questions are actually asked.
 *
 * The page's argument is that bandwidth is the last question rather than the
 * first, which is exactly the kind of claim a reader skims past. So the
 * scene builds the design in front of them and keeps the bandwidth dial
 * dark until the end: what you run, then where you are, then what it has to
 * survive, then where it is going — and only then a number.
 *
 * The four groups and their questions are the ones in lib/internet.ts, so
 * the picture and the section beneath it cannot drift.
 *
 * The dial carries no figure even once it lights. A port size depends on a
 * feasibility check per site, and the one honest thing the scene can say
 * about it is that it comes last.
 */

/** What appears at each stage, and which question group brings it. */
const STAGES: {
  icon: LucideIcon;
  /** Which of the estate tiles are drawn by now. */
  sites: number;
  /** Whether the second path is drawn. */
  resilient: boolean;
  /** Whether the bandwidth dial has anything in it. */
  sized: number;
}[] = [
  { icon: Server, sites: 1, resilient: false, sized: 0 },
  { icon: Store, sites: 3, resilient: false, sized: 0 },
  { icon: GitBranch, sites: 3, resilient: true, sized: 0 },
  { icon: Gauge, sites: 4, resilient: true, sized: 78 },
];

const ESTATE: { icon: LucideIcon; label: string; note: string }[] = [
  { icon: Building2, label: "Head office", note: "The centre of gravity" },
  { icon: Store, label: "Major site", note: "Its own resilience" },
  { icon: Store, label: "Branch", note: "Sized for what it does" },
  {
    icon: MonitorSmartphone,
    label: "Remote and mobile",
    note: "No site at all",
  },
];

const CORE: JointSpec[] = [
  { id: "ent-core-l", side: "l", left: "0%", top: "50%" },
  { id: "ent-core-r", side: "r", left: "100%", top: "50%" },
  { id: "ent-core-t", side: "t", left: "50%", top: "0%" },
  { id: "ent-core-b", side: "b", left: "50%", top: "100%" },
];
const QUESTIONS: JointSpec = {
  id: "ent-questions",
  side: "r",
  left: "100%",
  top: "50%",
};
const ESTATE_IN: JointSpec = {
  id: "ent-estate",
  side: "l",
  left: "0%",
  top: "50%",
};
const CLOUD_IN: JointSpec = { id: "ent-cloud", side: "b", left: "50%", top: "100%" };
const DIAL_IN: JointSpec = { id: "ent-dial", side: "t", left: "50%", top: "0%" };

const BEAT_S = 3;
const LOOP_S = BEAT_S * STAGES.length;

export function EnterpriseDesignScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the finished design, bandwidth included.
  const index = still ? STAGES.length - 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const stage = STAGES[index];
  const group = enterpriseQuestions[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={[
        { from: QUESTIONS.id, to: CORE[0].id, lit: true },
        { from: CORE[1].id, to: ESTATE_IN.id, lit: true },
        { from: CLOUD_IN.id, to: CORE[2].id, lit: true },
        { from: CORE[3].id, to: DIAL_IN.id, lit: stage.sized > 0 },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: GitBranch, frame: "top-[8%] left-[3%] w-[5.5%]" },
          { icon: Server, frame: "top-[82%] left-[92%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* What everything is for. */}
      <Layer
        className="top-[4%] left-[36%] w-[28%]"
        depth={0.35}
        order={20}
        joints={[CLOUD_IN]}
        lit
      >
        <ScenePanel
          icon={Cloud}
          title="Applications"
          subtitle="Wherever they actually live"
          aside={<SceneChip label="First question" />}
        />
      </Layer>

      {/* The questions being worked through, left to right. */}
      <Layer
        className="top-[30%] left-[2%] w-[27%]"
        depth={0.7}
        order={30}
        active
        joints={[QUESTIONS]}
        lit
      >
        <ScenePanel
          icon={group.icon}
          title={group.group}
          subtitle="What the design is answering now"
          aside={
            <SceneChip
              label={`${index + 1} of ${enterpriseQuestions.length}`}
              tone="on"
            />
          }
        >
          <span className="flex flex-col gap-[0.35cqw]">
            {group.questions.map((question) => (
              <span
                key={question}
                className="flex items-start gap-[0.45cqw] rounded-[0.65cqw] bg-card/70 px-[0.6cqw] py-[0.4cqw]"
              >
                <span className="mt-[0.35cqw] size-[0.4cqw] shrink-0 rounded-full bg-primary" />
                <span className="text-[0.74cqw] leading-snug text-pretty">
                  {question}
                </span>
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* The core the answers land in. */}
      <Layer
        className="top-[38%] left-[35%] w-[30%]"
        depth={0.45}
        order={20}
        active
        glow
        joints={CORE}
        lit
      >
        <ScenePanel
          icon={Server}
          title="The design"
          subtitle="Assembled from the answers, in order"
          aside={
            <SceneChip
              icon={GitBranch}
              label={stage.resilient ? "Two paths" : "One path"}
              tone={stage.resilient ? "on" : "off"}
            />
          }
        >
          {/* The primary path, and the second one that only appears once
              somebody has asked what happens when the first fails. */}
          <span className="flex flex-col gap-[0.4cqw]">
            <span className="flex items-center gap-[0.5cqw]">
              <SceneChip label="Primary" tone="on" />
              <span className="h-[0.3cqw] flex-1 rounded-full bg-linear-to-r from-brand-from to-brand-to" />
            </span>
            <span
              className={cn(
                "flex items-center gap-[0.5cqw] transition-opacity duration-700",
                stage.resilient ? "opacity-100" : "opacity-25",
              )}
            >
              <SceneChip
                label="Secondary"
                tone={stage.resilient ? "on" : "off"}
              />
              <span
                className={cn(
                  "h-[0.3cqw] flex-1 rounded-full transition-colors duration-700",
                  stage.resilient ? "bg-primary/60" : "bg-muted",
                )}
              />
            </span>
          </span>
        </ScenePanel>
      </Layer>

      {/* The estate, filling in as the second question is answered. */}
      <Layer
        className="top-[26%] left-[71%] w-[27%]"
        depth={0.7}
        order={30}
        active
        joints={[ESTATE_IN]}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="Where you are"
          subtitle="Sites, and the people with none"
          aside={<SceneChip label={`${stage.sites} of 4`} tone="on" />}
        >
          <span className="flex flex-col gap-[0.4cqw]">
            {ESTATE.map((site, step) => (
              <SceneTile
                key={site.label}
                icon={site.icon}
                label={site.label}
                note={site.note}
                lit={step < stage.sites}
                dim={step >= stage.sites}
              />
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* The last question, kept dark until it is genuinely time to ask it. */}
      <Layer
        className="top-[76%] left-[33%] w-[34%]"
        depth={0.8}
        order={30}
        active={stage.sized > 0}
        joints={[DIAL_IN]}
        lit={stage.sized > 0}
      >
        <ScenePanel
          icon={Gauge}
          title="Bandwidth"
          subtitle={
            stage.sized > 0
              ? "Sized last, against everything above"
              : "Not yet — nothing above it is settled"
          }
          lit={stage.sized > 0}
          tone={stage.sized > 0 ? "brand" : "muted"}
          aside={
            <SceneChip
              label={stage.sized > 0 ? "Last question" : "Waiting"}
              tone={stage.sized > 0 ? "on" : "off"}
            />
          }
        >
          <SceneMeter
            fill={stage.sized}
            caption={
              stage.sized > 0 ? "Per site, after a feasibility check" : undefined
            }
            height="0.9cqw"
          />
        </ScenePanel>
      </Layer>

      {/* The order, said plainly. */}
      <div
        className="parallax absolute top-[18%] left-[36%] w-[28%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={stage.icon}
          label="Bandwidth comes last"
          size="md"
          active={stage.sized > 0}
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
