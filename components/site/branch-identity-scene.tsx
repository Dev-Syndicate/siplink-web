"use client";

import {
  ArrowRight,
  Building2,
  Clock,
  MapPin,
  PhoneIncoming,
  Volume2,
} from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  ScenePill,
  Wave,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Per-branch identity, as three branches on one account that each still
 * answer as themselves.
 *
 * A caller dials a branch's local number; SipLink routes it by the number
 * dialled; that branch's own greeting plays and its own call handling takes
 * over. Then the next caller rings the next branch. One system, but every
 * location keeps its number, its greeting, its hours and its routing.
 *
 * Stage, parallax and wiring come from scene-kit. The callers are the
 * customers from the Sales Teams page.
 */

const CALLERS = "/solns-salesTeam/scene";

type Branch = {
  id: string;
  city: string;
  zone: string;
  number: string;
  hours: string;
  greeting: string;
  steps: string[];
  caller: { name: string; photo: string };
};

const BRANCHES: Branch[] = [
  {
    id: "ny",
    city: "New York",
    zone: "ET",
    number: "+1 (212) 555-0142",
    hours: "Open · 8 AM – 6 PM ET",
    greeting: "Thanks for calling Northwind Dental in Manhattan.",
    steps: ["Front desk", "Hygiene team", "Voicemail"],
    caller: { name: "Priya Sharma", photo: `${CALLERS}/priya.webp` },
  },
  {
    id: "chi",
    city: "Chicago",
    zone: "CT",
    number: "+1 (312) 555-0178",
    hours: "Open · 7 AM – 7 PM CT",
    greeting: "Welcome to Northwind Dental, Chicago Loop.",
    steps: ["Reception", "Treatment desk", "Manager"],
    caller: { name: "Rahul Mehta", photo: `${CALLERS}/rahul.webp` },
  },
  {
    id: "den",
    city: "Denver",
    zone: "MT",
    number: "+1 (720) 555-0126",
    hours: "Open · 9 AM – 5 PM MT",
    greeting: "Hi, you've reached Northwind Dental in Denver.",
    steps: ["Front desk", "Billing", "After-hours line"],
    caller: { name: "Neha Kapoor", photo: `${CALLERS}/neha.webp` },
  },
];

/** Per call: 0 dial, 1–2 greeting, 3 handed to the branch's first step. */
const CALL_S = 4;

type Phase = "dialling" | "greeting" | "handling";

export function BranchIdentityScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the Chicago call, greeting playing.
  const s = still ? CALL_S + 1 : t % (CALL_S * BRANCHES.length);
  const index = Math.floor(s / CALL_S);
  const into = s % CALL_S;
  const phase: Phase =
    into === 0 ? "dialling" : into < 3 ? "greeting" : "handling";
  const branch = BRANCHES[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/820]"
      wires={[
        { from: "caller", to: "hub-in", lit: true },
        ...BRANCHES.map(({ id }) => ({
          from: `hub-${id}`,
          to: `branch-${id}`,
          lit: id === branch.id,
        })),
      ]}
    >
      {/* The caller, dialling a local number */}
      <Layer
        className="top-[3%] left-[37%] w-[26%]"
        depth={0.7}
        order={30}
        joints={[{ id: "caller", side: "b", left: "50%", top: "100%" }]}
        lit
      >
        <div className="flex items-center gap-[0.9cqw] rounded-[1.3cqw] border border-border bg-card p-[1cqw] shadow-xl shadow-primary/20">
          <Portrait
            src={branch.caller.photo}
            ringing={phase === "dialling"}
            className="w-[3.4cqw]"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[0.72cqw] text-muted-foreground">
              {branch.caller.name}{" "}
              {phase === "dialling" ? "is dialling" : "is connected to"}
            </span>
            <span className="text-[1.15cqw] font-semibold tabular-nums">
              {branch.number}
            </span>
            <span className="mt-[0.15cqw] flex items-center gap-[0.35cqw] text-[0.78cqw] font-medium text-primary">
              <MapPin className="size-[0.85cqw]" />
              Northwind Dental · {branch.city}
            </span>
          </span>
        </div>
      </Layer>

      {/* One account, routing by the number dialled */}
      <Layer
        className="top-[27%] left-[42%] w-[16%]"
        depth={0.45}
        order={20}
        joints={[
          { id: "hub-in", side: "t", left: "50%", top: "0%" },
          { id: "hub-ny", side: "l", left: "0%", top: "60%" },
          { id: "hub-chi", side: "b", left: "50%", top: "100%" },
          { id: "hub-den", side: "r", left: "100%", top: "60%" },
        ]}
        lit
      >
        <div className="glass-tile-lit flex flex-col items-center gap-[0.4cqw] rounded-[1.3cqw] border border-border bg-card px-[0.9cqw] py-[1cqw] text-center">
          <span className="flex size-[2.8cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
            <Building2 className="size-1/2" />
          </span>
          <span className="text-[0.95cqw] leading-tight font-semibold">
            One account,
            <br />
            three branches
          </span>
          <span className="flex items-center gap-[0.3cqw] rounded-full bg-accent px-[0.7cqw] py-[0.25cqw] text-[0.7cqw] font-medium whitespace-nowrap text-accent-foreground">
            <PhoneIncoming className="size-[0.75cqw]" />
            Routed to {branch.city}
          </span>
        </div>
      </Layer>

      {BRANCHES.map((item, i) => (
        <Layer
          key={item.id}
          className={cn(
            "top-[56%] w-[30%]",
            ["left-[2.5%]", "left-[35%]", "left-[67.5%]"][i],
          )}
          depth={0.85}
          order={30}
          active={item.id === branch.id}
          joints={[
            { id: `branch-${item.id}`, side: "t", left: "50%", top: "0%" },
          ]}
          lit={item.id === branch.id}
        >
          <BranchCard
            branch={item}
            phase={item.id === branch.id ? phase : null}
          />
        </Layer>
      ))}
    </Scene>
  );
}

function BranchCard({
  branch,
  phase,
}: {
  branch: Branch;
  phase: Phase | null;
}) {
  const on = phase !== null;

  return (
    <div
      className={cn(
        "relative flex flex-col gap-[0.8cqw] rounded-[1.4cqw] border bg-card p-[1.1cqw] pt-[1.9cqw] shadow-xl transition-[border-color,box-shadow] duration-500",
        on
          ? "border-primary/40 shadow-primary/25"
          : "border-border shadow-primary/10",
      )}
    >
      <ScenePill
        icon={MapPin}
        label={branch.city}
        active={on}
        className="absolute -top-[1.5cqw] left-[1.1cqw]"
      />

      <span className="flex items-baseline justify-between gap-[0.6cqw]">
        <span className="text-[1.3cqw] font-semibold tabular-nums">
          {branch.number}
        </span>
        <span className="rounded-full bg-accent px-[0.55cqw] py-[0.1cqw] text-[0.65cqw] font-medium text-accent-foreground">
          Local {branch.zone}
        </span>
      </span>

      {/* Its own greeting */}
      <span
        className={cn(
          "flex items-start gap-[0.6cqw] rounded-[0.8cqw] px-[0.8cqw] py-[0.65cqw] ring-1 transition-colors duration-500",
          phase === "greeting"
            ? "bg-accent ring-primary/30"
            : "bg-muted/50 ring-border",
        )}
      >
        <Volume2
          className={cn(
            "mt-[0.1cqw] size-[1cqw] shrink-0",
            phase === "greeting" ? "text-primary" : "text-muted-foreground",
          )}
        />
        <span className="flex min-w-0 flex-col gap-[0.3cqw]">
          <span className="text-[0.62cqw] font-semibold tracking-wide text-muted-foreground uppercase">
            Greeting
          </span>
          <span className="text-[0.78cqw] leading-snug italic">
            “{branch.greeting}”
          </span>
          {phase === "greeting" ? <Wave /> : null}
        </span>
      </span>

      <span className="flex items-center gap-[0.4cqw] text-[0.72cqw] text-muted-foreground">
        <Clock className="size-[0.85cqw]" />
        {branch.hours}
      </span>

      {/* Its own call handling */}
      <span className="flex flex-col gap-[0.4cqw]">
        <span className="text-[0.62cqw] font-semibold tracking-wide text-muted-foreground uppercase">
          Call handling
        </span>
        <span className="flex items-center gap-[0.3cqw]">
          {branch.steps.map((step, i) => (
            <span key={step} className="flex min-w-0 items-center gap-[0.3cqw]">
              {i > 0 ? (
                <ArrowRight className="size-[0.75cqw] shrink-0 text-primary/60" />
              ) : null}
              <span
                className={cn(
                  "truncate rounded-[0.5cqw] px-[0.5cqw] py-[0.3cqw] text-[0.68cqw] ring-1 transition-colors duration-300",
                  phase === "handling" && i === 0
                    ? "bg-primary font-semibold text-primary-foreground ring-primary"
                    : "ring-border",
                )}
              >
                {step}
              </span>
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}
