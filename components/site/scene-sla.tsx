"use client";

import type { CSSProperties } from "react";
import {
  Activity,
  ArrowUpRight,
  ClipboardList,
  Cable,
  Network,
  Radio,
  Router,
  Ticket,
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
  SceneTile,
} from "@/components/site/internet-scene-parts";
import { slaLifecycle } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * A fault, from the moment it starts to the moment it is written up.
 *
 * The benefits page has a night-time scene about the same monitoring, and it
 * is a different argument: there the point is that nobody had to be awake.
 * Here the point is the paperwork — that a fault becomes a ticket with a
 * reference, a priority and an escalation path that existed before anything
 * went wrong. So this scene is built around the ticket rather than around
 * the hour, and the five stages come from slaLifecycle rather than from a
 * story invented next to it.
 *
 * Deliberately absent: any restoration time, response target or uptime
 * percentage. The copy says the work is done to the target in your
 * agreement, and a target that varies by service cannot be painted on a
 * picture. The clocks are relative marks on a depicted incident, which is
 * why they are elapsed minutes rather than a promise.
 *
 * The three scope tiles are the three the copy names, and they matter: a
 * fault falling into a gap between suppliers is the failure this page is
 * really selling against.
 */

/** Elapsed marks on the depicted incident. Relative, not a commitment. */
const MARKS = ["+00:00", "+00:02", "+00:09", "+00:31", "next day"];

const SCOPE: { icon: LucideIcon; label: string; note: string }[] = [
  { icon: Router, label: "SipLink equipment", note: "The kit we put in" },
  { icon: Cable, label: "Access network", note: "The local tail" },
  { icon: Network, label: "IP network", note: "The core beyond it" },
];

const NOC: JointSpec[] = [
  { id: "sla-noc-out", side: "b", left: "50%", top: "100%" },
];
const TICKET: JointSpec[] = [
  { id: "sla-ticket-in", side: "t", left: "50%", top: "0%" },
  { id: "sla-ticket-out", side: "r", left: "100%", top: "50%" },
];
const ESCALATION: JointSpec[] = [
  { id: "sla-esc-in", side: "l", left: "0%", top: "40%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * slaLifecycle.length;

export function SlaLifecycleScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests at "Restored", which is the stage being promised.
  const index = still ? 3 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = slaLifecycle[index];
  const open = index >= 1;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={[
        { from: NOC[0].id, to: TICKET[0].id, lit: true },
        { from: TICKET[1].id, to: ESCALATION[0].id, lit: index >= 2 },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Activity, frame: "top-[8%] left-[4%] w-[5.5%]" },
          { icon: ClipboardList, frame: "top-[84%] left-[90%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* Where the fault is seen, before anyone rings. */}
      <Layer
        className="top-[7%] left-[27%] w-[42%]"
        depth={0.4}
        order={20}
        active
        glow
        joints={NOC}
        lit
      >
        <ScenePanel
          icon={Radio}
          title="Global NOC · Chennai"
          subtitle="The circuit is watched around the clock"
          aside={<SceneChip icon={Activity} label="24/7" tone="on" />}
        >
          {/* The trace. It roughens at the moment of detection and stays
              rough until the stage that says it was restored. */}
          <span className="flex h-[1.8cqw] items-end gap-[0.16cqw]">
            {TRACE.map((height, step) => {
              const rough = index >= 0 && index < 3;
              return (
                <span
                  key={step}
                  className={cn(
                    "flex-1 rounded-full transition-colors duration-700",
                    rough ? "bg-primary/75" : "bg-primary/30",
                    !still && "wave-bar",
                  )}
                  style={
                    {
                      height: `${rough ? Math.min(100, height * 1.35) : height}%`,
                      "--bar-delay": `${step * 0.04}s`,
                    } as CSSProperties
                  }
                />
              );
            })}
          </span>
        </ScenePanel>
      </Layer>

      {/* The ticket the fault becomes. */}
      <Layer
        className="top-[41%] left-[22%] w-[34%]"
        depth={0.75}
        order={30}
        active
        joints={TICKET}
        lit
      >
        <ScenePanel
          icon={Ticket}
          title={open ? "Ticket open" : "No ticket yet"}
          subtitle={open ? "Against your service" : "The fault has just started"}
          lit={open}
          tone={open ? "brand" : "muted"}
          aside={
            <SceneChip
              label={open ? "SL-4471" : "—"}
              mono
              tone={open ? "on" : "off"}
            />
          }
        >
          {/* The five stages, ticking across. */}
          <span className="flex flex-col gap-[0.35cqw]">
            {slaLifecycle.map((stage, step) => {
              const done = step <= index;
              const current = step === index;

              return (
                <span
                  key={stage.title}
                  className={cn(
                    "flex items-center gap-[0.55cqw] rounded-[0.7cqw] px-[0.6cqw] py-[0.4cqw] transition-all duration-700",
                    current
                      ? "bg-accent"
                      : done
                        ? "bg-card/70"
                        : "bg-transparent opacity-35",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[1.5cqw] shrink-0 items-center justify-center rounded-full font-mono text-[0.6cqw] font-semibold transition-colors duration-500",
                      done
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {step + 1}
                  </span>
                  <span className="text-[0.82cqw] font-medium">
                    {stage.title}
                  </span>
                  <span className="ml-auto font-mono text-[0.68cqw] text-muted-foreground tabular-nums">
                    {MARKS[step]}
                  </span>
                </span>
              );
            })}
          </span>
        </ScenePanel>
      </Layer>

      {/* The path it climbs, which was agreed in advance. */}
      <Layer
        className="top-[40%] left-[63%] w-[31%]"
        depth={0.6}
        order={20}
        active={index >= 2}
        joints={ESCALATION}
        lit={index >= 2}
      >
        <ScenePanel
          icon={ArrowUpRight}
          title="Escalation"
          subtitle="A path set before anything went wrong"
          lit={index >= 2}
          tone={index >= 2 ? "brand" : "muted"}
        >
          <span className="flex flex-col gap-[0.4cqw]">
            {SCOPE.map((item) => (
              <SceneTile
                key={item.label}
                icon={item.icon}
                label={item.label}
                note={item.note}
                lit={index >= 2}
                dim={index < 2}
              />
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* What this stage actually means, in the page's own words. */}
      <div
        className="parallax absolute top-[84%] left-[4%] w-[55%]"
        style={{ "--depth": 0.5 } as CSSProperties}
      >
        <div className="glass-panel flex items-start gap-[0.7cqw] rounded-[1.1cqw] px-[1cqw] py-[0.75cqw]">
          <span className="mt-[0.25cqw] flex size-[1.7cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ClipboardList className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            {now.body}
          </span>
        </div>
      </div>

      {/* Which stage this is. */}
      <div
        className="parallax absolute top-[31%] left-[64%] w-[28%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Ticket}
          label={now.title}
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}

/** A monitoring trace. Shape only — no units and no scale. */
const TRACE = [
  34, 48, 31, 55, 40, 63, 37, 52, 33, 59, 44, 30, 54, 38, 61, 35, 50, 42, 57,
  36, 51, 45, 32, 56, 41, 60, 38, 47,
];
