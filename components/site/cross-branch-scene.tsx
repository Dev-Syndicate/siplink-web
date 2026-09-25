"use client";

import {
  ArrowRightLeft,
  Headset,
  MapPin,
  Network,
  PhoneForwarded,
  PhoneOff,
  X,
} from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  ScenePill,
  Wave,
  clock,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Cross-branch calling, as the other offices being an extension away.
 *
 * Two moves, one after the other. First the New York desk dials 311 and
 * Chicago's front desk rings — four digits over the internal network, no
 * outside line. Then a customer on the line with New York is transferred to
 * Denver's billing desk, and the caller's timer never breaks: they stay on
 * with Northwind Dental and never notice the hand-off.
 *
 * Same three branches as Per-branch identity. Stage, parallax and wiring come
 * from scene-kit.
 */

const TEAM = "/solns-remoteWorkforce/scene";

type Desk = {
  id: "ny" | "chi" | "den";
  city: string;
  role: string;
  ext: string;
  who: string;
  photo: string;
};

const DESKS: Record<Desk["id"], Desk> = {
  ny: {
    id: "ny",
    city: "New York",
    role: "Front desk",
    ext: "210",
    who: "William Meek",
    photo: `${TEAM}/team-william.webp`,
  },
  chi: {
    id: "chi",
    city: "Chicago",
    role: "Front desk",
    ext: "311",
    who: "Ida Jones",
    photo: `${TEAM}/team-ida.webp`,
  },
  den: {
    id: "den",
    city: "Denver",
    role: "Billing",
    ext: "420",
    who: "Lei Quynh",
    photo: `${TEAM}/team-lei.webp`,
  },
};

const CALLER = {
  name: "Rahul Mehta",
  photo: "/solns-salesTeam/scene/rahul.webp",
};

/**
 * 0–1 NY dials 311, 2 Chicago rings, 3–5 they talk.
 * 6 a customer is on with NY, 7 NY transfers, 8 Denver rings, 9–11 Denver
 * has them.
 */
const LOOP_S = 12;

type DeskState = "idle" | "dialling" | "ringing" | "talking";

export function CrossBranchScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the finished transfer.
  const s = still ? 10 : t % LOOP_S;
  const internal = s < 6;
  const transfer = !internal;

  const ny: DeskState = internal
    ? s < 2
      ? "dialling"
      : "talking"
    : s < 8
      ? "talking"
      : "idle";
  const chi: DeskState = !internal
    ? "idle"
    : s === 2
      ? "ringing"
      : s > 2
        ? "talking"
        : "idle";
  const den: DeskState = internal
    ? "idle"
    : s === 8
      ? "ringing"
      : s > 8
        ? "talking"
        : "idle";

  // The customer's call started before the scene did, and keeps counting.
  const callerTime = 128 + Math.max(0, s - 6);

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/760]"
      wires={[
        { from: "ny", to: "net-in", lit: internal || s < 8 },
        { from: "net-chi", to: "chi", lit: internal && s >= 2 },
        { from: "net-den", to: "den", lit: transfer && s >= 8 },
        { from: "caller", to: "net-top", lit: transfer },
      ]}
    >
      {/* The customer, only in the second half */}
      <Layer
        className="top-[3%] left-[37%] w-[26%]"
        depth={0.7}
        order={30}
        joints={[{ id: "caller", side: "b", left: "50%", top: "100%" }]}
        lit={transfer}
      >
        <div
          className={cn(
            "flex items-center gap-[0.9cqw] rounded-[1.3cqw] border border-border bg-card p-[1cqw] shadow-xl shadow-primary/20 transition-opacity duration-500",
            !transfer && "opacity-40",
          )}
        >
          <Portrait src={CALLER.photo} className="w-[3.2cqw]" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[0.72cqw] text-muted-foreground">
              {CALLER.name} · customer
            </span>
            <span className="flex items-center gap-[0.45cqw] text-[1.1cqw] font-semibold">
              Northwind Dental
              {transfer ? (
                <span className="flex items-center gap-[0.3cqw] text-[0.9cqw] font-medium text-primary tabular-nums">
                  <Wave />
                  {clock(callerTime)}
                </span>
              ) : null}
            </span>
            <span className="mt-[0.15cqw] text-[0.72cqw] text-muted-foreground">
              {!transfer
                ? "Waiting to call"
                : s < 7
                  ? "Speaking with New York"
                  : s < 9
                    ? "Hold music · one moment"
                    : "Still on the same call"}
            </span>
          </span>
        </div>
      </Layer>

      {/* The internal network */}
      <Layer
        className="top-[36%] left-[40%] w-[20%]"
        depth={0.45}
        order={20}
        joints={[
          { id: "net-in", side: "l", left: "0%", top: "50%" },
          { id: "net-top", side: "t", left: "50%", top: "0%" },
          { id: "net-chi", side: "r", left: "100%", top: "30%" },
          { id: "net-den", side: "r", left: "100%", top: "75%" },
        ]}
        lit
      >
        <div className="glass-tile-lit flex flex-col items-center gap-[0.45cqw] rounded-[1.3cqw] border border-border bg-card px-[1cqw] py-[1.1cqw] text-center">
          <span className="flex size-[2.8cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
            {internal ? (
              <Network className="size-1/2" />
            ) : (
              <ArrowRightLeft className="size-1/2" />
            )}
          </span>
          <span className="text-[1cqw] leading-tight font-semibold">
            {internal ? "Internal call · ext. 311" : "Transfer · ext. 420"}
          </span>
          <span className="text-[0.72cqw] text-muted-foreground">
            {internal
              ? "Four digits, branch to branch"
              : "Caller stays on the line"}
          </span>
          <span className="mt-[0.2cqw] flex items-center gap-[0.35cqw] rounded-full bg-muted px-[0.7cqw] py-[0.25cqw] text-[0.68cqw] text-muted-foreground line-through decoration-primary/60">
            <X className="size-[0.75cqw] text-primary" />
            Outside line
          </span>
        </div>
      </Layer>

      <Layer
        className="top-[33%] left-[3%] w-[27%]"
        depth={0.85}
        order={30}
        active={ny !== "idle"}
        joints={[{ id: "ny", side: "r", left: "100%", top: "50%" }]}
        lit={ny !== "idle"}
      >
        <DeskCard
          desk={DESKS.ny}
          state={ny}
          line={
            internal
              ? s < 2
                ? `Dialling ${"311".slice(0, s + 2)}`
                : "On with Chicago · ext. 311"
              : s < 7
                ? `On with ${CALLER.name}`
                : s < 8
                  ? "Transferring to Denver…"
                  : "Handed off · free"
          }
        />
      </Layer>

      <Layer
        className="top-[6%] left-[70%] w-[27%]"
        depth={0.85}
        order={30}
        active={chi !== "idle"}
        joints={[{ id: "chi", side: "l", left: "0%", top: "50%" }]}
        lit={chi !== "idle"}
      >
        <DeskCard
          desk={DESKS.chi}
          state={chi}
          line={
            chi === "ringing"
              ? "New York is calling"
              : chi === "talking"
                ? "On with New York"
                : "Available"
          }
        />
      </Layer>

      <Layer
        className="top-[58%] left-[70%] w-[27%]"
        depth={0.85}
        order={30}
        active={den !== "idle"}
        joints={[{ id: "den", side: "l", left: "0%", top: "50%" }]}
        lit={den !== "idle"}
      >
        <DeskCard
          desk={DESKS.den}
          state={den}
          line={
            den === "ringing"
              ? `Transfer from New York · ${CALLER.name}`
              : den === "talking"
                ? `On with ${CALLER.name}`
                : "Available"
          }
        />
      </Layer>
    </Scene>
  );
}

function DeskCard({
  desk,
  state,
  line,
}: {
  desk: Desk;
  state: DeskState;
  line: string;
}) {
  const on = state !== "idle";

  return (
    <div
      className={cn(
        "relative flex flex-col gap-[0.7cqw] rounded-[1.4cqw] border bg-card p-[1.1cqw] pt-[1.9cqw] shadow-xl transition-[border-color,box-shadow] duration-500",
        on
          ? "border-primary/40 shadow-primary/25"
          : "border-border shadow-primary/10",
      )}
    >
      <ScenePill
        icon={MapPin}
        label={desk.city}
        active={on}
        className="absolute -top-[1.5cqw] left-[1.1cqw]"
      />
      <span className="flex items-center gap-[0.8cqw]">
        <Portrait
          src={desk.photo}
          ringing={state === "ringing"}
          className="w-[3cqw]"
        />
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-[0.95cqw] font-semibold">{desk.who}</span>
          <span className="flex items-center gap-[0.3cqw] text-[0.72cqw] text-muted-foreground">
            <Headset className="size-[0.8cqw]" />
            {desk.role}
          </span>
        </span>
        <span className="ml-auto rounded-[0.5cqw] bg-accent px-[0.6cqw] py-[0.25cqw] text-[0.8cqw] font-semibold text-accent-foreground tabular-nums">
          ext. {desk.ext}
        </span>
      </span>
      <span
        className={cn(
          "flex h-[2.6cqw] items-center gap-[0.5cqw] rounded-[0.7cqw] px-[0.7cqw] text-[0.78cqw] ring-1 transition-colors duration-500",
          on
            ? "bg-accent font-medium ring-primary/30"
            : "bg-muted/50 text-muted-foreground ring-border",
        )}
      >
        {state === "talking" ? (
          <Wave />
        ) : state === "ringing" ? (
          <PhoneForwarded className="size-[0.9cqw] text-primary" />
        ) : state === "dialling" ? (
          <span className="type-caret h-[1cqw] w-[0.12cqw] bg-primary" />
        ) : (
          <PhoneOff className="size-[0.9cqw]" />
        )}
        <span className="truncate">{line}</span>
      </span>
    </div>
  );
}
