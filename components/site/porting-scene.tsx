"use client";

import type { ReactNode } from "react";
import {
  ArrowLeftRight,
  Building2,
  Check,
  Cloud,
  Headset,
  Phone,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  Wave,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Porting changes who carries the number, not the number.
 *
 * A customer dials the business the same way throughout. At first the call
 * runs through the old provider to the desk. Then the number ports —
 * requested, approved, cut over — and the next call to the very same number
 * runs through SipLink to the same desk. Nothing the customer sees changes.
 *
 * Replaces the route schematic that stood here. Drawn for the hero's half
 * column, so its type is larger than the full-width scenes. Stage, parallax
 * and wiring come from scene-kit.
 */

const NUMBER = "+1 (212) 555-0147";
const CUSTOMER = {
  name: "Kristine Yee",
  photo: "/solns-salesTeam/scene/kristine.webp",
};
const DESK = {
  name: "William Meek",
  photo: "/solns-remoteWorkforce/scene/team-william.webp",
};

const STEPS = ["Requested", "Approved", "Live"];

/**
 * 0 dial, 1–2 through the old provider, 3–5 the port runs a step a second,
 * 6 dial again, 7–10 through SipLink, 11 hold.
 */
const LOOP_S = 12;

export function PortingScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests after the port, with the call on SipLink.
  const s = still ? 8 : t % LOOP_S;
  const ported = s >= 6;
  const porting = s >= 3 && s <= 5;
  const step = ported ? STEPS.length : porting ? s - 2 : 0;
  const dialling = s === 0 || s === 6;
  const connected = (s >= 1 && s <= 2) || (s >= 7 && s <= 10);
  const elapsed = s >= 7 ? s - 6 : s;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[600/350]"
      wires={[
        { from: "customer-old", to: "old-in", lit: !ported && !porting },
        { from: "old-out", to: "desk-old", lit: !ported && connected },
        { from: "customer-new", to: "sip-in", lit: ported },
        { from: "sip-out", to: "desk-new", lit: ported && connected },
      ]}
    >
      {/* The customer, dialling the same number every time */}
      <Layer
        className="top-[28%] left-[1%] w-[28%]"
        depth={0.85}
        order={30}
        joints={[
          { id: "customer-old", side: "r", left: "100%", top: "30%" },
          { id: "customer-new", side: "r", left: "100%", top: "70%" },
        ]}
        lit
      >
        <div className="flex flex-col items-center gap-[1cqw] rounded-[2.6cqw] border border-border bg-card p-[2cqw] text-center shadow-lg shadow-primary/10">
          <Portrait
            src={CUSTOMER.photo}
            ringing={dialling}
            className="w-[6cqw]"
          />
          <span className="text-[1.7cqw] text-muted-foreground">
            {CUSTOMER.name} dials
          </span>
          <span className="text-[2.2cqw] font-semibold whitespace-nowrap tabular-nums">
            {NUMBER}
          </span>
          <span className="rounded-full bg-accent px-[1.2cqw] py-[0.3cqw] text-[1.6cqw] font-medium whitespace-nowrap text-accent-foreground">
            Same number, always
          </span>
        </div>
      </Layer>

      <Carrier
        className="top-[4%]"
        icon={Building2}
        name="Old provider"
        note={
          ported
            ? "Number released"
            : porting
              ? "Releasing the number…"
              : "Carrying your number"
        }
        on={!ported && !porting}
        faded={ported}
        joints={["old-in", "old-out"]}
      />

      <Carrier
        className="top-[62%]"
        icon={Cloud}
        name="SipLink"
        note={ported ? "Carrying your number" : "Port in progress"}
        on={ported}
        joints={["sip-in", "sip-out"]}
      >
        <span className="flex items-center gap-[0.6cqw]">
          {STEPS.map((name, i) => {
            const done = i < step;
            return (
              <span
                key={name}
                className={cn(
                  "flex items-center gap-[0.4cqw] rounded-full px-[0.9cqw] py-[0.3cqw] text-[1.5cqw] whitespace-nowrap ring-1 transition-colors duration-300",
                  done
                    ? "bg-primary font-medium text-primary-foreground ring-primary"
                    : "text-muted-foreground ring-border",
                )}
              >
                {done ? <Check className="size-[1.5cqw]" /> : null}
                {name}
              </span>
            );
          })}
        </span>
      </Carrier>

      {/* The desk the call has always reached */}
      <Layer
        className="top-[28%] left-[71%] w-[28%]"
        depth={0.85}
        order={30}
        active={connected}
        joints={[
          { id: "desk-old", side: "l", left: "0%", top: "30%" },
          { id: "desk-new", side: "l", left: "0%", top: "70%" },
        ]}
        lit={connected}
      >
        <div
          className={cn(
            "flex flex-col items-center gap-[1cqw] rounded-[2.6cqw] border bg-card p-[2cqw] text-center shadow-lg transition-[border-color] duration-500",
            connected
              ? "border-primary/40 shadow-primary/20"
              : "border-border shadow-primary/10",
          )}
        >
          <Portrait src={DESK.photo} className="w-[6cqw]" />
          <span className="flex items-center gap-[0.5cqw] text-[1.7cqw] text-muted-foreground">
            <Headset className="size-[1.8cqw]" />
            Your desk
          </span>
          <span className="text-[2.1cqw] font-semibold">{DESK.name}</span>
          <span
            className={cn(
              "flex h-[3.4cqw] items-center gap-[0.7cqw] rounded-full px-[1.2cqw] text-[1.7cqw] transition-colors duration-500",
              connected
                ? "bg-accent font-medium text-accent-foreground"
                : "bg-muted/60 text-muted-foreground",
            )}
          >
            {connected ? (
              <>
                <Wave />
                {`00:0${elapsed}`}
              </>
            ) : porting ? (
              <>
                <ArrowLeftRight className="size-[1.8cqw]" />
                Moving carriers
              </>
            ) : (
              <>
                <Phone className="size-[1.8cqw]" />
                Ready
              </>
            )}
          </span>
        </div>
      </Layer>
    </Scene>
  );
}

function Carrier({
  className,
  icon: Icon,
  name,
  note,
  on,
  faded,
  joints,
  children,
}: {
  className: string;
  icon: LucideIcon;
  name: string;
  note: string;
  on: boolean;
  faded?: boolean;
  joints: [string, string];
  children?: ReactNode;
}) {
  return (
    <Layer
      className={cn("left-[35%] w-[30%]", className)}
      depth={0.5}
      order={20}
      active={on}
      joints={[
        { id: joints[0], side: "l", left: "0%", top: "50%" },
        { id: joints[1], side: "r", left: "100%", top: "50%" },
      ]}
      lit={on}
    >
      <div
        className={cn(
          "flex flex-col gap-[1cqw] rounded-[2.4cqw] border bg-card p-[1.8cqw] shadow-lg transition-[border-color,opacity] duration-500",
          on
            ? "border-primary/40 shadow-primary/20"
            : "border-border shadow-primary/10",
          faded && "opacity-50",
        )}
      >
        <span className="flex items-center gap-[1cqw]">
          <span
            className={cn(
              "flex size-[4.4cqw] items-center justify-center rounded-full transition-colors duration-500",
              on
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            <Icon className="size-1/2" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[2.1cqw] font-semibold">{name}</span>
            <span
              className={cn(
                "text-[1.6cqw]",
                on ? "text-primary" : "text-muted-foreground",
              )}
            >
              {note}
            </span>
          </span>
        </span>
        {children}
      </div>
    </Layer>
  );
}
