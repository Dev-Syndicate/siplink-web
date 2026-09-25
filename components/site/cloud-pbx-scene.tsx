"use client";

import {
  BarChart3,
  Clock,
  Cloud,
  ListOrdered,
  Mail,
  PhoneIncoming,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  Wave,
  clock,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Cloud PBX, as the phone system handling a call end to end.
 *
 * A customer calls. The system — hosted, nothing in the building — answers
 * with its menu, checks the business hours, and rings the sales queue. The
 * whole queue rings, one person picks up, and when the call ends it is
 * already in the call records. Each loop someone different answers, because
 * a queue is a team rather than a desk.
 *
 * Laid out top to bottom — caller, system, queue — so each wire drops
 * straight into the card below it and none of them cross. Drawn for the
 * product hero's column. Stage, parallax and wiring come from scene-kit.
 */

const CALLER = {
  name: "Kristine Yee",
  number: "+1 (415) 555-0132",
  photo: "/solns-salesTeam/scene/kristine.webp",
};

const QUEUE = [
  {
    name: "Priya",
    ext: "201",
    photo: "/solns-salesTeam/scene/priya.webp",
  },
  {
    name: "William",
    ext: "202",
    photo: "/solns-remoteWorkforce/scene/team-william.webp",
  },
  {
    name: "Lei",
    ext: "203",
    photo: "/solns-remoteWorkforce/scene/team-lei.webp",
  },
];

const STEPS: { icon: LucideIcon; text: string; done: string }[] = [
  { icon: ListOrdered, text: "Menu answers", done: "“Press 1 for sales”" },
  { icon: Clock, text: "Checks the hours", done: "Open · 9 AM – 6 PM" },
  { icon: Users, text: "Rings the queue", done: "3 people ringing" },
];

/**
 * 0 the call arrives, 1–3 one step a second, 4 someone answers,
 * 5–9 the call, 10–11 it ends and is logged.
 */
const LOOP_S = 12;

/** Queue cards, and where each one's wire leaves the system above it. */
const QUEUE_LEFT = ["left-[2%]", "left-[35%]", "left-[68%]"];
const QUEUE_JOINT = ["15.6%", "50%", "84.4%"];

export function CloudPbxScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests mid-call, with every step taken.
  const s = still ? 7 : t % LOOP_S;
  const answerer = still ? 0 : Math.floor(t / LOOP_S) % QUEUE.length;
  const stepsDone = Math.min(STEPS.length, s);
  const ringing = s === 3;
  const talking = s >= 4 && s <= 9;
  const logged = s >= 10;
  const elapsed = talking ? s - 3 : logged ? 6 : 0;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[600/450]"
      wires={[
        { from: "caller", to: "pbx-in", lit: !logged },
        ...QUEUE.map((_, i) => ({
          from: `pbx-${i}`,
          to: `ext-${i}`,
          lit: ringing || (talking && i === answerer),
        })),
      ]}
    >
      {/* The caller */}
      <Layer
        className="top-[2%] left-[20%] w-[60%]"
        depth={0.8}
        order={30}
        joints={[{ id: "caller", side: "b", left: "50%", top: "100%" }]}
        lit={!logged}
      >
        <div className="flex items-center gap-[1.6cqw] rounded-[3cqw] border border-border bg-card p-[1.8cqw] shadow-lg shadow-primary/10">
          <Portrait
            src={CALLER.photo}
            ringing={s === 0}
            className="w-[7cqw]"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[2.6cqw] font-semibold">{CALLER.name}</span>
            <span className="text-[2cqw] text-muted-foreground tabular-nums">
              {CALLER.number}
            </span>
          </span>
          <span
            className={cn(
              "ml-auto flex h-[4.4cqw] shrink-0 items-center gap-[0.8cqw] rounded-full px-[1.6cqw] text-[2cqw] font-medium whitespace-nowrap",
              logged
                ? "bg-muted text-muted-foreground"
                : "bg-accent text-accent-foreground",
            )}
          >
            {talking ? (
              <>
                <Wave />
                {clock(elapsed)}
              </>
            ) : logged ? (
              "Call ended"
            ) : (
              <>
                <PhoneIncoming className="size-[2.2cqw]" />
                Calling…
              </>
            )}
          </span>
        </div>
      </Layer>

      {/* The phone system */}
      <Layer
        className="top-[29%] left-[2%] w-[96%]"
        depth={0.45}
        order={20}
        joints={[
          { id: "pbx-in", side: "t", left: "50%", top: "0%" },
          ...QUEUE_JOINT.map(
            (left, i): JointSpec => ({
              id: `pbx-${i}`,
              side: "b",
              left,
              top: "100%",
            }),
          ),
        ]}
        lit
      >
        <div className="glass-tile-lit flex flex-col gap-[1.6cqw] rounded-[3cqw] border border-border bg-card p-[2cqw]">
          <span className="flex items-center gap-[1.2cqw]">
            <span className="flex size-[5.4cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
              <Cloud className="size-1/2" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[2.8cqw] font-semibold">Cloud PBX</span>
              <span className="text-[2cqw] text-muted-foreground">
                Hosted by SipLink
              </span>
            </span>
            <span className="ml-auto flex gap-[0.8cqw]">
              {[
                { icon: Mail, text: "Voicemail to email", on: false },
                { icon: BarChart3, text: "Call records", on: logged },
              ].map(({ icon: Icon, text, on }) => (
                <span
                  key={text}
                  className={cn(
                    "flex items-center gap-[0.6cqw] rounded-full px-[1.2cqw] py-[0.6cqw] text-[1.8cqw] whitespace-nowrap transition-colors duration-500",
                    on
                      ? "bg-primary font-medium text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-[1.9cqw]" />
                  {on ? "Call logged" : text}
                </span>
              ))}
            </span>
          </span>

          <div className="grid grid-cols-3 gap-[1.2cqw]">
            {STEPS.map(({ icon: Icon, text, done }, i) => {
              const past = i < stepsDone;
              const now = i === stepsDone - 1 && !talking && !logged;
              return (
                <span
                  key={text}
                  className={cn(
                    "flex flex-col gap-[0.8cqw] rounded-[1.8cqw] p-[1.4cqw] ring-1 transition-colors duration-500",
                    now
                      ? "bg-accent ring-primary/40"
                      : past
                        ? "ring-primary/20"
                        : "ring-border",
                  )}
                >
                  <span className="flex items-center gap-[0.9cqw]">
                    <span
                      className={cn(
                        "flex size-[3.6cqw] shrink-0 items-center justify-center rounded-[1cqw] transition-colors duration-500",
                        past
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="size-1/2" />
                    </span>
                    <span className="text-[1.7cqw] font-semibold text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </span>
                  <span className="text-[2cqw] leading-snug font-medium">
                    {text}
                  </span>
                  <span
                    className={cn(
                      "truncate text-[1.8cqw] transition-opacity duration-500",
                      past ? "text-primary" : "opacity-0",
                    )}
                  >
                    {i === 2 && (talking || logged)
                      ? `${QUEUE[answerer].name} answered`
                      : done}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </Layer>

      {/* The sales queue */}
      {QUEUE.map((person, i) => {
        const picked = talking && i === answerer;
        const on = ringing || picked;
        return (
          <Layer
            key={person.ext}
            className={cn("top-[79%] w-[30%]", QUEUE_LEFT[i])}
            depth={0.85}
            order={30}
            active={picked}
            joints={[{ id: `ext-${i}`, side: "t", left: "50%", top: "0%" }]}
            lit={on}
          >
            <div
              className={cn(
                "flex items-center gap-[1cqw] rounded-[2.6cqw] border bg-card p-[1.4cqw] shadow-lg transition-[border-color] duration-500",
                picked
                  ? "border-primary/40 shadow-primary/20"
                  : "border-border shadow-primary/10",
              )}
            >
              <Portrait
                src={person.photo}
                ringing={ringing}
                className="w-[5cqw]"
              />
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-[2cqw] font-semibold">
                  {person.name}{" "}
                  <span className="font-normal text-muted-foreground tabular-nums">
                    · {person.ext}
                  </span>
                </span>
                <span
                  className={cn(
                    "flex h-[2.8cqw] items-center gap-[0.6cqw] text-[1.8cqw] whitespace-nowrap",
                    on ? "font-medium text-primary" : "text-muted-foreground",
                  )}
                >
                  {picked ? <Wave /> : null}
                  {ringing ? "Ringing…" : picked ? "On the call" : "Available"}
                </span>
              </span>
            </div>
          </Layer>
        );
      })}
    </Scene>
  );
}
