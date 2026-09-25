"use client";

import {
  Check,
  Clock,
  Disc3,
  MapPin,
  Music,
  ShieldCheck,
  Volume2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Scene,
  ScenePill,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Consistent standards, as one set of rules every branch inherits.
 *
 * The standards are set once, on the left. When one changes — the hold music
 * here — it lands in every existing branch in turn. Then a new branch opens,
 * and instead of being configured by hand it picks up the whole standard,
 * rule by rule, and is compliant on day one.
 *
 * Same branches as the rest of this page, plus the one that opens. Stage,
 * parallax and wiring come from scene-kit.
 */

const RULES: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Greeting", value: "Northwind template", icon: Volume2 },
  { label: "Business hours", value: "Local, 8 AM – 6 PM", icon: Clock },
  { label: "Hold music", value: "Calm · v2", icon: Music },
  { label: "Call recording", value: "On, 90 days", icon: Disc3 },
  { label: "Routing", value: "Desk → team → voicemail", icon: Workflow },
];

const HOLD = 2;

const BRANCHES = [
  { id: "ny", city: "New York" },
  { id: "chi", city: "Chicago" },
  { id: "den", city: "Denver" },
  { id: "aus", city: "Austin", fresh: true },
];

/**
 * 0 the hold music changes, 1–3 it reaches NY, Chicago, Denver.
 * 4 Austin opens, 5–9 it inherits each rule, 10–11 everything compliant.
 */
const LOOP_S = 12;

export function StandardsScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests with Austin open and compliant.
  const s = still ? LOOP_S - 1 : t % LOOP_S;
  const updating = s <= 3;
  const reached = (i: number) => s >= i + 1;
  const opened = s >= 4;
  const inherited = Math.max(0, Math.min(RULES.length, s - 4));

  const lit = (i: number) =>
    i < 3 ? updating && s === i + 1 : opened && s < 10;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/760]"
      wires={BRANCHES.map(({ id }, i) => ({
        from: "rules",
        to: `branch-${id}`,
        lit: lit(i) || (s >= 10 && i < 4 && opened),
      }))}
    >
      {/* Set once */}
      <Layer
        className="top-[12%] left-[3%] w-[33%]"
        depth={0.45}
        order={20}
        joints={[{ id: "rules", side: "r", left: "100%", top: "50%" }]}
        lit
      >
        <div className="relative flex flex-col gap-[0.55cqw] rounded-[1.5cqw] border border-border bg-card p-[1.2cqw] pt-[2.2cqw] shadow-2xl shadow-primary/15">
          <ScenePill
            icon={ShieldCheck}
            label="Standards · set once"
            size="md"
            className="absolute -top-[1.6cqw] left-[1.2cqw]"
          />
          {RULES.map(({ label: name, value, icon: Icon }, i) => {
            const changed = i === HOLD && updating;
            return (
              <span
                key={name}
                className={cn(
                  "flex items-center gap-[0.7cqw] rounded-[0.8cqw] px-[0.8cqw] py-[0.6cqw] ring-1 transition-colors duration-500",
                  changed ? "bg-accent ring-primary/30" : "ring-border",
                )}
              >
                <span className="flex size-[2cqw] items-center justify-center rounded-[0.5cqw] bg-primary/10 text-primary">
                  <Icon className="size-1/2" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[0.66cqw] text-muted-foreground">
                    {name}
                  </span>
                  <span className="text-[0.88cqw] font-semibold">{value}</span>
                </span>
                {changed ? (
                  <span className="ml-auto rounded-full bg-primary px-[0.55cqw] py-[0.15cqw] text-[0.62cqw] font-medium text-primary-foreground">
                    Updated
                  </span>
                ) : null}
              </span>
            );
          })}
        </div>
      </Layer>

      {BRANCHES.map((branch, i) => {
        const fresh = branch.fresh;
        const visible = !fresh || opened;
        const on = lit(i);
        const count = fresh ? inherited : RULES.length;
        const note = fresh
          ? !opened
            ? ""
            : inherited < RULES.length
              ? `Opened today · inheriting ${RULES[inherited].label.toLowerCase()}`
              : "Opened today · fully compliant"
          : updating && reached(i)
            ? "Hold music updated"
            : "Same rules as every branch";

        return (
          <Layer
            key={branch.id}
            className="left-[50%] w-[38%]"
            style={{ top: `${5 + i * 23.5}%` }}
            depth={0.85}
            order={30}
            active={on}
            joints={
              visible
                ? [
                    {
                      id: `branch-${branch.id}`,
                      side: "l",
                      left: "0%",
                      top: "50%",
                    },
                  ]
                : []
            }
            lit={on}
          >
            <div
              className={cn(
                "relative flex flex-col gap-[0.6cqw] rounded-[1.3cqw] border bg-card p-[1cqw] pt-[1.9cqw] shadow-xl transition-[opacity,translate,border-color,box-shadow] duration-500",
                on
                  ? "border-primary/40 shadow-primary/25"
                  : "border-border shadow-primary/10",
                visible ? "opacity-100" : "translate-y-[1cqw] opacity-0",
                fresh && !visible && "border-dashed",
              )}
            >
              <ScenePill
                icon={MapPin}
                label={branch.city}
                active={on}
                className="absolute -top-[1.5cqw] left-[1cqw]"
              />
              {fresh ? (
                <span className="absolute top-[0.7cqw] right-[1cqw] rounded-full bg-primary px-[0.55cqw] py-[0.1cqw] text-[0.62cqw] font-semibold text-primary-foreground">
                  New
                </span>
              ) : null}

              <span className="flex gap-[0.4cqw]">
                {RULES.map(({ label: name, icon: Icon }, r) => {
                  const has = r < count;
                  const pinged =
                    (!fresh && r === HOLD && updating && reached(i)) ||
                    (fresh && r === inherited - 1 && s < 10);
                  return (
                    <span
                      key={name}
                      className={cn(
                        "relative flex size-[2.2cqw] items-center justify-center rounded-[0.55cqw] ring-1 transition-colors duration-300",
                        pinged
                          ? "bg-primary text-primary-foreground ring-primary"
                          : has
                            ? "bg-accent text-primary ring-primary/25"
                            : "bg-muted text-muted-foreground/50 ring-border",
                      )}
                    >
                      <Icon className="size-1/2" />
                      {has ? (
                        <span className="absolute -right-[0.3cqw] -bottom-[0.3cqw] flex size-[0.9cqw] items-center justify-center rounded-full bg-card text-primary ring-1 ring-primary/30">
                          <Check className="size-[70%]" />
                        </span>
                      ) : null}
                    </span>
                  );
                })}
              </span>

              <span
                className={cn(
                  "text-[0.75cqw]",
                  on ? "font-medium text-primary" : "text-muted-foreground",
                )}
              >
                {note}
              </span>
            </div>
          </Layer>
        );
      })}
    </Scene>
  );
}
