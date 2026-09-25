"use client";

import type { CSSProperties } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Mic,
  MicOff,
  Scale,
  Video,
  VideoOff,
} from "lucide-react";

import {
  Control,
  Layer,
  Portrait,
  Scene,
  ScenePill,
  Wave,
  clock,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import {
  SceneChip,
  SceneCorners,
  SceneMeter,
  ScenePanel,
} from "@/components/site/internet-scene-parts";
import {
  AppBar,
  DeviceLaptop,
  PEOPLE,
} from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * The person who looks frozen is never the one with the problem.
 *
 * This page's most useful sentence is almost an aside — "being the only
 * person who looks frozen is an upstream problem" — and it is the one line
 * on the whole site most likely to change somebody's mind, because everyone
 * has been that person and nobody has ever been told why.
 *
 * So the scene is a video call with four people in it, seen from the inside.
 * Three are fine. One stutters, and the meters underneath show why: their
 * download is healthy and their upload is not. Then the same call on a
 * symmetrical service, where there is no odd one out.
 *
 * The meters are relative and carry no scale. What is being shown is which
 * half of the line is short, not by how much.
 */

type Beat = {
  id: string;
  pill: string;
  /** Whose upload is starved. `null` once the line is symmetrical. */
  stuck: string | null;
  down: number;
  up: number;
  headline: string;
  note: string;
};

const ROOM = [PEOPLE.aarushi, PEOPLE.william, PEOPLE.ida, PEOPLE.lei];

const BEATS: Beat[] = [
  {
    id: "fine",
    pill: "The call starts",
    stuck: null,
    down: 88,
    up: 84,
    headline: "Four people, nothing to report",
    note: "Everyone is arriving. Nothing is uploading yet except the cameras, and the line is coping with those comfortably.",
  },
  {
    id: "stuck",
    pill: "One of them freezes",
    stuck: PEOPLE.ida.name,
    down: 86,
    up: 24,
    headline: "Only one person looks broken",
    note: "Their download is fine, which is why the speed test they run in a minute will come back clean. It is the other half that ran out.",
  },
  {
    id: "blame",
    pill: "And gets blamed for it",
    stuck: PEOPLE.ida.name,
    down: 86,
    up: 19,
    headline: "“You are breaking up”",
    note: "Three people can hear the problem and none of them is having it. The one who is has no way of knowing that from their own screen.",
  },
  {
    id: "sym",
    pill: "On a symmetrical service",
    stuck: null,
    down: 88,
    up: 88,
    headline: "No odd one out",
    note: "The outbound half matches the inbound half, so the camera that was starved is no longer the thing the meeting has to work around.",
  },
];

const CALL: JointSpec[] = [
  { id: "frz-call", side: "b", left: "50%", top: "100%" },
];
const METERS: JointSpec[] = [
  { id: "frz-meters", side: "t", left: "50%", top: "0%" },
];

const BEAT_S = 3.5;
const LOOP_S = BEAT_S * BEATS.length;

export function SymmetryFrozenScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the frozen frame, which is the point.
  const index = still ? 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = BEATS[index];
  const elapsed = still ? 214 : 180 + (t % 600);

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/900]"
      wires={[{ from: CALL[0].id, to: METERS[0].id, lit: true }]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: ArrowDownToLine, frame: "top-[12%] left-[4%] w-[5%]" },
          { icon: ArrowUpFromLine, frame: "top-[12%] left-[91%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* The call, from inside it. */}
      <Layer
        className="top-[13%] left-[20%] w-[44%]"
        depth={0.5}
        order={20}
        active
        glow
        joints={CALL}
        lit
      >
        <DeviceLaptop>
          <AppBar
            title="Client review"
            right={
              <span className="flex items-center gap-[0.3cqw] rounded-full bg-accent px-[0.5cqw] py-[0.15cqw] text-[0.6cqw] text-accent-foreground">
                <Video className="size-[0.65cqw] text-primary" />
                <span className="tabular-nums">{clock(elapsed)}</span>
              </span>
            }
          />
          <div className="grid flex-1 grid-cols-4 gap-[0.4cqw] bg-linear-to-b from-accent/50 to-card p-[0.6cqw]">
            {ROOM.map((person) => {
              const frozen = now.stuck === person.name;

              return (
                <span
                  key={person.name}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-[0.35cqw] rounded-[0.55cqw] p-[0.45cqw] ring-1 transition-all duration-500",
                    frozen
                      ? "bg-muted/70 ring-foreground/25"
                      : "bg-card/85 ring-border",
                  )}
                >
                  <span
                    className={cn(
                      "transition-[filter] duration-500",
                      frozen && "blur-[0.12cqw] grayscale",
                    )}
                  >
                    <Portrait
                      src={person.photo}
                      halo={!frozen}
                      className="w-[3.2cqw]"
                    />
                  </span>
                  <span className="text-[0.6cqw] font-medium">
                    {person.name.split(" ")[0]}
                  </span>
                  <span className="flex h-[1cqw] items-center">
                    {frozen ? (
                      <span className="flex items-center gap-[0.2cqw] text-[0.55cqw] font-medium text-foreground/70">
                        <VideoOff className="size-[0.6cqw]" />
                        Reconnecting
                      </span>
                    ) : (
                      <Wave />
                    )}
                  </span>
                </span>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-border px-[0.9cqw] py-[0.45cqw]">
            <span className="text-[0.66cqw] text-muted-foreground">
              {now.headline}
            </span>
            <span className="flex gap-[0.4cqw]">
              <Control icon={Mic} className="w-[1.5cqw]" />
              <Control icon={MicOff} className="w-[1.5cqw]" />
            </span>
          </div>
        </DeviceLaptop>
      </Layer>

      {/* Whose line it actually is. */}
      <Layer
        className="top-[62%] left-[26%] w-[32%]"
        depth={0.8}
        order={30}
        active
        joints={METERS}
        lit
      >
        <ScenePanel
          icon={Scale}
          title={now.stuck ? `${now.stuck.split(" ")[0]}'s line` : "The line"}
          subtitle="The same connection, read from both ends"
          aside={
            <SceneChip
              label={now.stuck ? "One half short" : "Matched"}
              tone={now.stuck ? "off" : "on"}
            />
          }
        >
          <SceneMeter
            label="Down"
            caption="What a speed test will show"
            fill={now.down}
            height="0.9cqw"
          />
          <SceneMeter
            label="Up"
            caption={now.stuck ? "What the camera actually needs" : "Matched"}
            fill={now.up}
            tone={now.stuck ? "muted" : "brand"}
            height="0.9cqw"
          />
        </ScenePanel>
      </Layer>

      {/* What everybody in the call believes is happening. */}
      <Layer
        className="top-[30%] left-[68%] w-[28%]"
        depth={0.9}
        order={30}
        active
        joints={[]}
        lit
      >
        <ScenePanel
          icon={now.stuck ? VideoOff : Video}
          title={
            now.stuck ? "What the room concludes" : "What the room notices"
          }
          subtitle={now.stuck ? "Wrongly, and reasonably" : "Nothing at all"}
          lit={Boolean(now.stuck)}
          tone={now.stuck ? "muted" : "brand"}
        >
          <span className="flex flex-col gap-[0.35cqw]">
            {(now.stuck
              ? [
                  "“Your connection is bad”",
                  "“Try turning your camera off”",
                  "“It is probably your Wi-Fi”",
                ]
              : [
                  "Nobody asks anyone to repeat themselves",
                  "Nobody turns a camera off",
                  "Nobody mentions the connection",
                ]
            ).map((line) => (
              <span
                key={line}
                className={cn(
                  "rounded-[0.6cqw] px-[0.6cqw] py-[0.4cqw] text-[0.72cqw] transition-colors duration-500",
                  now.stuck
                    ? "bg-muted text-muted-foreground"
                    : "bg-accent text-accent-foreground",
                )}
              >
                {line}
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* The explanation nobody on the call has. */}
      <div
        className="parallax absolute top-[80%] left-[14%] w-[62%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-start gap-[0.75cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.85cqw]">
          <span className="mt-[0.15cqw] flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ArrowUpFromLine className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            {now.note}
          </span>
        </div>
      </div>

      <div
        className="parallax absolute top-[4%] left-[32%] w-[36%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Scale}
          label={now.pill}
          size="md"
          active={!now.stuck}
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
