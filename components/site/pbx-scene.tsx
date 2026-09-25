"use client";

import {
  CalendarClock,
  Check,
  Cloud,
  Hash,
  Server,
  Users,
  Voicemail,
  Workflow,
  Split,
  type LucideIcon,
} from "lucide-react";

import {
  Joint,
  Layer,
  Scene,
  ScenePill,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * What a PBX migration moves: the configuration, not the hardware.
 *
 * Each piece of setup leaves the on-premise box along its own wire and lands
 * in SipLink under the same name and with the same contents. The box keeps a
 * dashed ghost of what has gone, so it reads as carried across rather than
 * deleted — the page's point, that you do not start from scratch.
 *
 * Replaces the wiring schematic that stood here. Stage, parallax and wiring
 * come from scene-kit.
 */

const ITEMS: { name: string; detail: string; icon: LucideIcon }[] = [
  { name: "Extensions", detail: "48 extensions, same numbers", icon: Hash },
  { name: "Departments", detail: "Sales, Support, Billing", icon: Users },
  { name: "Call flows", detail: "Main menu · press 1, 2, 3", icon: Workflow },
  { name: "Routing rules", detail: "9 rules, same order", icon: Split },
  {
    name: "Business hours",
    detail: "Mon–Fri, 8 AM – 6 PM",
    icon: CalendarClock,
  },
  { name: "Voicemail", detail: "31 boxes, greetings kept", icon: Voicemail },
];

/** One item a second, then the finished move holds before it replays. */
const HOLD_S = 4;
const LOOP_S = ITEMS.length + HOLD_S;

export function PbxScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the finished move.
  const s = still ? LOOP_S - 1 : t % LOOP_S;
  const moved = Math.min(ITEMS.length, s);
  const moving = s < ITEMS.length ? s : -1;
  const done = moved === ITEMS.length;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/560]"
      wires={ITEMS.map((_, i) => ({
        from: `pbx-${i}`,
        to: `sip-${i}`,
        lit: i === moving,
      }))}
    >
      {/* The box in the closet */}
      <Layer className="top-[6%] left-[4%] w-[33%]" depth={0.6} order={20}>
        <div
          className={cn(
            "relative flex flex-col gap-[0.7cqw] rounded-[1.6cqw] border bg-card p-[1.3cqw] pt-[2.4cqw] shadow-xl transition-[border-color,opacity] duration-700",
            done
              ? "border-dashed border-border opacity-70 shadow-primary/5"
              : "border-border shadow-primary/10",
          )}
        >
          <ScenePill
            icon={Server}
            label="On-premise PBX"
            size="md"
            className="absolute -top-[1.7cqw] left-[1.3cqw]"
          />
          {ITEMS.map(({ name, icon: Icon }, i) => {
            const gone = i < moved;
            const going = i === moving;
            return (
              <span
                key={name}
                className={cn(
                  "relative flex h-[3.4cqw] items-center gap-[0.7cqw] rounded-[0.8cqw] px-[0.8cqw] text-[0.95cqw] transition-colors duration-500",
                  gone
                    ? "border border-dashed border-border text-muted-foreground/60"
                    : going
                      ? "bg-accent font-medium ring-1 ring-primary/40"
                      : "ring-1 ring-border",
                )}
              >
                <Icon
                  className={cn(
                    "size-[1.1cqw]",
                    gone ? "text-muted-foreground/40" : "text-primary",
                  )}
                />
                {name}
                <span className="ml-auto text-[0.72cqw] text-muted-foreground/70">
                  {gone ? "moved" : going ? "moving…" : ""}
                </span>
                <Joint
                  id={`pbx-${i}`}
                  side="r"
                  left="100%"
                  top="50%"
                  lit={going}
                />
              </span>
            );
          })}
          {/* Rack ports, going dark as the box empties. */}
          <span className="mt-[0.4cqw] flex gap-[0.5cqw]">
            {Array.from({ length: 8 }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "h-[0.9cqw] flex-1 rounded-[0.25cqw] ring-1 transition-colors duration-500",
                  done ? "ring-border" : "bg-primary/15 ring-primary/30",
                )}
              />
            ))}
          </span>
        </div>
      </Layer>

      {/* SipLink */}
      <Layer
        className="top-[6%] left-[59%] w-[37%]"
        depth={0.8}
        order={30}
        active={done}
      >
        <div
          className={cn(
            "relative flex flex-col gap-[0.7cqw] rounded-[1.6cqw] border bg-card p-[1.3cqw] pt-[2.4cqw] shadow-xl transition-[border-color] duration-500",
            done
              ? "border-primary/40 shadow-primary/20"
              : "border-border shadow-primary/10",
          )}
        >
          <ScenePill
            icon={Cloud}
            label="SipLink"
            size="md"
            active={done}
            className="absolute -top-[1.7cqw] left-[1.3cqw]"
          />
          {ITEMS.map(({ name, detail, icon: Icon }, i) => {
            const here = i < moved;
            const arriving = i === moved - 1 && s < ITEMS.length + 1;
            return (
              <span
                key={name}
                className={cn(
                  "relative flex h-[3.4cqw] items-center gap-[0.7cqw] rounded-[0.8cqw] px-[0.8cqw] transition-colors duration-500",
                  here
                    ? arriving
                      ? "bg-accent ring-1 ring-primary/40"
                      : "ring-1 ring-primary/25"
                    : "border border-dashed border-border",
                )}
              >
                <Joint
                  id={`sip-${i}`}
                  side="l"
                  left="0%"
                  top="50%"
                  lit={i === moving || here}
                />
                <span
                  className={cn(
                    "flex size-[2cqw] shrink-0 items-center justify-center rounded-[0.5cqw] transition-colors duration-500",
                    here
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground/40",
                  )}
                >
                  {here ? (
                    <Check className="size-1/2" />
                  ) : (
                    <Icon className="size-1/2" />
                  )}
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span
                    className={cn(
                      "text-[0.95cqw]",
                      here ? "font-semibold" : "text-muted-foreground/60",
                    )}
                  >
                    {name}
                  </span>
                  <span
                    className={cn(
                      "truncate text-[0.72cqw] transition-opacity duration-500",
                      here ? "text-muted-foreground" : "opacity-0",
                    )}
                  >
                    {detail}
                  </span>
                </span>
              </span>
            );
          })}
          <span className="mt-[0.3cqw] flex items-center gap-[0.8cqw]">
            <span className="h-[0.5cqw] flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-primary transition-[width] duration-700"
                style={{ width: `${(moved / ITEMS.length) * 100}%` }}
              />
            </span>
            <span
              className={cn(
                "text-[0.85cqw] font-medium tabular-nums",
                done ? "text-primary" : "text-muted-foreground",
              )}
            >
              {done ? "All 6 moved · nothing rebuilt" : `Moved ${moved} of 6`}
            </span>
          </span>
        </div>
      </Layer>
    </Scene>
  );
}
