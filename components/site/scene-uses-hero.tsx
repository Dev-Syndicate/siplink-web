"use client";

import type { CSSProperties } from "react";
import {
  Ban,
  Building2,
  Check,
  Globe,
  Laptop,
  ListChecks,
  PhoneCall,
  ScanLine,
  ShieldQuestion,
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
 * The hero stage on /internet/static-ip/business-uses.
 *
 * It replaces a request log — allowed, refused, allowed — which was honest
 * but answered the wrong question. A log shows that a gate is checking
 * something; the page's heading is about *who* is doing the recognising, and
 * that the same address is what three unrelated parties are recognising you
 * by.
 *
 * So the stage is a checkpoint, read top to bottom: who has turned up, the
 * door deciding, and what happens on the other side of it. Three of the four
 * arrivals are recognised and one is not, which is the only way to show that
 * recognition is doing any work at all.
 *
 * Deliberately vertical. The hero on the sibling page is two cards side by
 * side with a verdict between them, and two heroes in one section of the
 * site should not be the same shape.
 *
 * Type is clamped rather than fluid, for the reason set out in
 * scene-static-hero: this column is around 384px at the `lg` breakpoint and
 * plain `cqw` text lands at seven pixels there.
 *
 * Every address is RFC 5737 documentation space and routes nowhere.
 */

const OURS = "203.0.113.24";

type Arrival = {
  id: string;
  /** Who has turned up at the door. */
  who: string;
  context: string;
  icon: LucideIcon;
  address: string;
  /** A face, where the arrival is a person rather than a system. */
  person?: { name: string; photo: string };
  /** The thing doing the recognising. */
  door: string;
  asks: string;
  outcome: string;
};

const ARRIVALS: Arrival[] = [
  {
    id: "partner",
    who: "Your office",
    context: "Calling a partner's platform",
    icon: Building2,
    address: OURS,
    door: "A partner platform",
    asks: "Is this the office we allowlisted?",
    outcome:
      "Their rule names one address, and it is still the one asking. The integration runs and nobody is involved.",
  },
  {
    id: "trunk",
    who: "Your phone system",
    context: "Registering a SIP trunk",
    icon: PhoneCall,
    address: OURS,
    door: "A trunk provider",
    asks: "Is this registration from the address on the account?",
    outcome:
      "Voice registers against a known address rather than whatever the connection was handed this morning.",
  },
  {
    id: "staff",
    who: "Somebody working from home",
    context: "Connecting back to the office",
    icon: Laptop,
    address: OURS,
    person: PEOPLE.ida,
    door: "Your own VPN",
    asks: "Is the office still where the client expects it?",
    outcome:
      "The client was configured against the office address. It has not moved, so this is an ordinary morning rather than a ticket.",
  },
  {
    id: "unknown",
    who: "Somebody else entirely",
    context: "An address nobody listed",
    icon: ShieldQuestion,
    address: "198.51.100.9",
    door: "The same door",
    asks: "Do we know this one?",
    outcome:
      "Refused, correctly. Recognition only means something when it can also say no — which is the half a moving address quietly takes away.",
  },
];

const ARRIVING: JointSpec[] = [
  { id: "uh-arriving", side: "b", left: "50%", top: "100%" },
];
const DOOR: JointSpec[] = [
  { id: "uh-door-in", side: "t", left: "50%", top: "0%" },
  { id: "uh-door-out", side: "b", left: "50%", top: "100%" },
];
const BEYOND: JointSpec[] = [
  { id: "uh-beyond", side: "t", left: "50%", top: "0%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * ARRIVALS.length;

/* One pair of bounds per role, so nothing drifts as the column narrows. */
const TYPE = {
  label: "text-[clamp(8px,1.5cqw,11px)]",
  title: "text-[clamp(11px,2.1cqw,15px)]",
  body: "text-[clamp(9px,1.7cqw,12px)]",
  address: "text-[clamp(12px,2.6cqw,19px)]",
};

export function BusinessUsesHeroScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the partner, the commonest case on the page.
  const index = still ? 0 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = ARRIVALS[index];
  const known = now.address === OURS;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1000/820]"
      backdrop="soft"
      wires={[
        { from: ARRIVING[0].id, to: DOOR[0].id, lit: true },
        { from: DOOR[1].id, to: BEYOND[0].id, lit: known },
      ]}
    >
      {/* Who has turned up. */}
      <Layer
        className="top-[2%] left-[3%] w-[94%]"
        depth={0.7}
        order={30}
        active
        joints={ARRIVING}
        lit
      >
        <div className="glass-panel glass-tile-lit flex items-center gap-[1.2cqw] rounded-[2.2cqw] p-[1.4cqw]">
          {now.person ? (
            <Portrait
              src={now.person.photo}
              halo
              className="w-[5.6cqw] shrink-0"
            />
          ) : (
            <span className="flex size-[5.6cqw] shrink-0 items-center justify-center rounded-[1.6cqw] bg-primary text-primary-foreground shadow-md shadow-primary/40">
              <now.icon className="size-1/2" />
            </span>
          )}

          <span className="flex min-w-0 flex-col gap-[0.2cqw] leading-tight">
            <span className={cn(TYPE.label, "text-muted-foreground")}>
              {now.context}
            </span>
            <span className={cn(TYPE.title, "font-semibold text-balance")}>
              {now.who}
            </span>
          </span>

          <span
            className={cn(
              "ml-auto flex shrink-0 items-center gap-[0.6cqw] rounded-[1.2cqw] px-[1cqw] py-[0.7cqw] transition-colors duration-500",
              known ? "bg-accent" : "bg-muted",
            )}
          >
            <Globe
              className={cn(
                "size-[2.2cqw] shrink-0 transition-colors duration-500",
                known ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span
              className={cn(
                TYPE.address,
                "font-mono font-semibold tracking-tight tabular-nums",
              )}
            >
              {now.address}
            </span>
          </span>
        </div>
      </Layer>

      {/* The door, and what it is asking. */}
      <Layer
        className="top-[34%] left-[11%] w-[78%]"
        depth={0.45}
        order={20}
        active
        glow
        joints={DOOR}
        lit
      >
        <div className="glass-panel flex flex-col gap-[1cqw] rounded-[2.4cqw] p-[1.5cqw]">
          <span className="flex items-center gap-[0.9cqw]">
            <span className="flex size-[3.6cqw] shrink-0 items-center justify-center rounded-[1.1cqw] bg-accent text-primary">
              <ListChecks className="size-1/2" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className={cn(TYPE.label, "text-muted-foreground")}>
                Doing the recognising
              </span>
              <span className={cn(TYPE.title, "font-semibold")}>
                {now.door}
              </span>
            </span>
          </span>

          <span
            className={cn(
              TYPE.body,
              "rounded-[1.2cqw] bg-card/70 px-[1cqw] py-[0.7cqw] leading-snug text-pretty text-muted-foreground",
            )}
          >
            {now.asks}
          </span>

          {/* The stamp. */}
          <span
            className={cn(
              "flex items-center justify-center gap-[0.8cqw] rounded-full px-[1.4cqw] py-[0.8cqw] font-semibold shadow-lg transition-colors duration-500",
              TYPE.body,
              known
                ? "bg-primary text-primary-foreground shadow-primary/30"
                : "bg-foreground text-background shadow-foreground/20",
            )}
          >
            {known ? (
              <Check className="size-[2.2cqw]" />
            ) : (
              <Ban className="size-[2.2cqw]" />
            )}
            {known ? "Recognised" : "Not recognised"}
          </span>
        </div>
      </Layer>

      {/* What happens on the other side of it. */}
      <Layer
        className="top-[72%] left-[3%] w-[94%]"
        depth={0.85}
        order={30}
        active={known}
        joints={BEYOND}
        lit={known}
      >
        <div
          className={cn(
            "flex items-start gap-[1cqw] rounded-[2.2cqw] border bg-card p-[1.4cqw] shadow-lg transition-colors duration-500",
            known
              ? "border-primary/30 shadow-primary/20"
              : "border-border shadow-foreground/10",
          )}
        >
          <span
            className={cn(
              "mt-[0.2cqw] flex size-[3cqw] shrink-0 items-center justify-center rounded-full transition-colors duration-500",
              known
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            <ScanLine className="size-1/2" />
          </span>
          <span
            className={cn(TYPE.body, "leading-snug text-pretty")}
          >
            {now.outcome}
          </span>
        </div>
      </Layer>

      {/* The four, as a rail along the foot. */}
      <div
        className="parallax absolute bottom-[1%] left-[28%] flex w-[44%] items-center gap-[0.8cqw]"
        style={{ "--depth": 0.4 } as CSSProperties}
      >
        {ARRIVALS.map((arrival, step) => (
          <span
            key={arrival.id}
            className={cn(
              "h-[0.7cqw] flex-1 rounded-full transition-colors duration-500",
              step === index
                ? "bg-primary"
                : step < index
                  ? "bg-primary/40"
                  : "bg-border",
            )}
          />
        ))}
      </div>
    </Scene>
  );
}
