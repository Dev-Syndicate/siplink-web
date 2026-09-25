"use client";

import type { CSSProperties } from "react";
import {
  Activity,
  Check,
  ClipboardCheck,
  Globe,
  Pin,
  Router,
  ShieldCheck,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { PEOPLE } from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * The hero stage on /internet/static-ip/add-static-ip.
 *
 * It replaces a ticket card whose four stages ticked over and stopped. The
 * stages were the right content; what the card could not show is the
 * sentence beside it that people actually want answered — that the existing
 * connection normally keeps running throughout. A checklist says a job got
 * done. It cannot say nothing went down while it happened.
 *
 * So the service strip at the top never changes state. The rail underneath
 * advances, the address is issued at the end, and the one thing a reader is
 * watching for — a drop — never arrives.
 *
 * Drawn solid rather than as glass. The other two Static IP heroes use the
 * frosted panels the section scenes use; this one is plain white cards with
 * hairline borders and the brand colour kept to the marks that carry meaning
 * — the live dot, the completed stages, the issued address. The stage paints
 * no ground at all behind them (`backdrop="none"`), because a wash under a
 * white card is the thing that makes it look like a gradient.
 *
 * Type is clamped for the reason set out in scene-static-hero: this column
 * is around 384px at the `lg` breakpoint.
 *
 * The address is RFC 5737 documentation space and routes nowhere.
 */

const ISSUED = "203.0.113.24";

type Stage = {
  id: string;
  short: string;
  title: string;
  icon: LucideIcon;
  detail: string;
};

const STAGES: Stage[] = [
  {
    id: "requirement",
    short: "Requirement",
    title: "Requirement confirmed",
    icon: ClipboardCheck,
    detail:
      "What needs to reach what. A VPN, a trunk, an allowlist or a hosted system — this is what decides whether one address is enough.",
  },
  {
    id: "eligibility",
    short: "Eligibility",
    title: "Eligibility checked",
    icon: ShieldCheck,
    detail:
      "Against the service rather than the company, because it depends on which connection is at which site.",
  },
  {
    id: "assigned",
    short: "Address",
    title: "Address assigned",
    icon: Globe,
    detail:
      "Held against your service, not against the box in the cupboard. Replacing the router later keeps it.",
  },
  {
    id: "configured",
    short: "Configured",
    title: "Configured and tested",
    icon: Router,
    detail:
      "Applied to the router and firewall, then checked. Where a brief interruption is unavoidable, the window is agreed with you beforehand.",
  },
];

const SERVICE: JointSpec[] = [
  { id: "add-service", side: "b", left: "50%", top: "100%" },
];
const RAIL: JointSpec[] = [
  { id: "add-rail-in", side: "t", left: "50%", top: "0%" },
  { id: "add-rail-out", side: "b", left: "50%", top: "100%" },
];
const ADDRESS: JointSpec[] = [
  { id: "add-address", side: "t", left: "50%", top: "0%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * STAGES.length;

/* One pair of bounds per role, so nothing drifts as the column narrows. */
const TYPE = {
  label: "text-[clamp(8px,1.5cqw,11px)]",
  title: "text-[clamp(11px,2.1cqw,15px)]",
  body: "text-[clamp(9px,1.7cqw,12px)]",
  address: "text-[clamp(14px,3.2cqw,24px)]",
  step: "text-[clamp(7px,1.35cqw,10px)]",
};

/** A plain white card. No blur, no tint, no glow. */
const CARD =
  "rounded-[2cqw] border border-border bg-card shadow-sm shadow-foreground/5";

export function AddStaticIpHeroScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the finished request, address issued.
  const index = still ? STAGES.length - 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = STAGES[index];
  const issued = index >= 2;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1000/800]"
      backdrop="none"
      wires={[
        { from: SERVICE[0].id, to: RAIL[0].id, lit: true },
        { from: RAIL[1].id, to: ADDRESS[0].id, lit: issued },
      ]}
    >
      {/* The thing that does not change. */}
      <Layer
        className="top-[2%] left-[2%] w-[96%]"
        depth={0.7}
        order={30}
        glow={false}
        joints={SERVICE}
        lit
      >
        <div className={cn(CARD, "flex items-center gap-[1.1cqw] p-[1.3cqw]")}>
          <span className="flex size-[4.4cqw] shrink-0 items-center justify-center rounded-[1.3cqw] bg-accent text-primary">
            <Wifi className="size-1/2" />
          </span>

          <span className="flex min-w-0 flex-col gap-[0.15cqw] leading-tight">
            <span className={cn(TYPE.label, "text-muted-foreground")}>
              Throughout all of this
            </span>
            <span className={cn(TYPE.title, "font-semibold")}>
              Your connection stays up
            </span>
          </span>

          <span className="ml-auto flex shrink-0 items-center gap-[0.6cqw] rounded-full bg-accent px-[1cqw] py-[0.5cqw]">
            <span
              className={cn(
                "size-[0.9cqw] rounded-full bg-primary",
                !still && "halo",
              )}
            />
            <span className={cn(TYPE.body, "font-semibold text-primary")}>
              Live
            </span>
          </span>

          <Portrait
            src={PEOPLE.lei.photo}
            className="w-[3.4cqw] shrink-0"
          />
        </div>
      </Layer>

      {/* The request, advancing. */}
      <Layer
        className="top-[28%] left-[2%] w-[96%]"
        depth={0.45}
        order={20}
        glow={false}
        joints={RAIL}
        lit
      >
        <div className={cn(CARD, "flex flex-col gap-[1.1cqw] p-[1.4cqw]")}>
          <span className="flex items-center gap-[0.7cqw]">
            <span className={cn(TYPE.label, "text-muted-foreground")}>
              static-ip / request
            </span>
            <span
              className={cn(
                TYPE.step,
                "ml-auto rounded-full bg-primary px-[0.8cqw] py-[0.25cqw] font-semibold text-primary-foreground",
              )}
            >
              {index + 1} of {STAGES.length}
            </span>
          </span>

          {/* The rail. One track, four marks, filling left to right. */}
          <span className="relative flex items-start">
            <span
              aria-hidden
              className="absolute top-[1.6cqw] right-[10%] left-[10%] h-[0.3cqw] -translate-y-1/2 rounded-full bg-border"
            />
            <span
              aria-hidden
              className="absolute top-[1.6cqw] left-[10%] h-[0.3cqw] -translate-y-1/2 rounded-full bg-primary transition-[width] duration-700 ease-out"
              style={{ width: `${(index / (STAGES.length - 1)) * 80}%` }}
            />

            {STAGES.map((stage, step) => {
              const done = step <= index;

              return (
                <span
                  key={stage.id}
                  className="relative flex flex-1 flex-col items-center gap-[0.45cqw]"
                >
                  <span
                    className={cn(
                      "flex size-[3.2cqw] items-center justify-center rounded-full border-[0.25cqw] border-card transition-colors duration-500",
                      done
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {done ? (
                      <Check className="size-1/2" />
                    ) : (
                      <stage.icon className="size-1/2" />
                    )}
                  </span>
                  <span
                    className={cn(
                      TYPE.step,
                      "text-center leading-tight font-medium transition-colors duration-500",
                      step === index
                        ? "text-primary"
                        : done
                          ? "text-foreground"
                          : "text-muted-foreground/60",
                    )}
                  >
                    {stage.short}
                  </span>
                </span>
              );
            })}
          </span>
        </div>
      </Layer>

      {/* What that stage actually is. */}
      <div
        className="parallax absolute top-[56%] left-[2%] w-[96%]"
        style={{ "--depth": 0.6 } as CSSProperties}
      >
        <div className={cn(CARD, "flex items-start gap-[1cqw] p-[1.3cqw]")}>
          <span className="mt-[0.15cqw] flex size-[3cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <now.icon className="size-1/2" />
          </span>
          <span className="flex min-w-0 flex-col gap-[0.25cqw]">
            <span className={cn(TYPE.title, "font-semibold text-balance")}>
              {now.title}
            </span>
            <span
              className={cn(TYPE.body, "leading-snug text-pretty text-muted-foreground")}
            >
              {now.detail}
            </span>
          </span>
        </div>
      </div>

      {/* And what comes out of it. */}
      <Layer
        className="top-[82%] left-[2%] w-[96%]"
        depth={0.85}
        order={30}
        glow={false}
        joints={ADDRESS}
        lit={issued}
      >
        <div
          className={cn(
            CARD,
            "flex items-center gap-[1.1cqw] p-[1.3cqw] transition-colors duration-700",
            issued ? "border-primary/35" : "border-border",
          )}
        >
          <span
            className={cn(
              "flex size-[3.6cqw] shrink-0 items-center justify-center rounded-[1.1cqw] transition-colors duration-500",
              issued
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {issued ? (
              <Pin className="size-1/2" />
            ) : (
              <Activity className="size-1/2" />
            )}
          </span>

          <span className="flex min-w-0 flex-col gap-[0.1cqw] leading-tight">
            <span className={cn(TYPE.label, "text-muted-foreground")}>
              {issued ? "Issued" : "Not yet issued"}
            </span>
            <span
              className={cn(
                TYPE.address,
                "font-mono font-semibold tracking-tight tabular-nums transition-colors duration-500",
                issued ? "text-primary" : "text-muted-foreground/40",
              )}
            >
              {issued ? ISSUED : "···.···.···.··"}
            </span>
          </span>

          <span
            className={cn(
              TYPE.body,
              "ml-auto shrink-0 text-right leading-snug text-muted-foreground",
            )}
          >
            Recorded against
            <br />
            your service
          </span>
        </div>
      </Layer>
    </Scene>
  );
}
