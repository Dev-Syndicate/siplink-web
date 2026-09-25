"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  CalendarCheck,
  Check,
  ListChecks,
  MessageSquareOff,
  Minus,
  Users,
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
} from "@/components/site/internet-scene-parts";
import {
  AppBar,
  DeviceLaptop,
  PEOPLE,
  PersonRow,
  PlaceFrame,
  PLACES,
} from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * The Monday meeting, four weeks running.
 *
 * Every benefit on this page is an absence, and the page already knows it —
 * "nobody mentions it, which is the entire benefit". The difficulty is that
 * an absence cannot be drawn as a thing; it can only be drawn as a change.
 * So the scene picks the smallest, most recognisable artefact of an office
 * where something has stopped going wrong: the standing item on an agenda,
 * and the week it quietly stops being added.
 *
 * Four weeks, one agenda, and a room of people who have run out of things
 * to say about the internet.
 *
 * The agenda is illustrative. Nothing here claims an outcome for anyone
 * else's office — it is the shape of the benefit, drawn once.
 */

type Week = {
  id: string;
  label: string;
  /** How the standing item appears this week. */
  state: "raised" | "raised" | "quiet" | "gone";
  raisedBy: { name: string; photo: string } | null;
  said: string;
  note: string;
};

const WEEKS: Week[] = [
  {
    id: "w1",
    label: "Week one",
    state: "raised",
    raisedBy: PEOPLE.ida,
    said: "Calls broke up twice on Thursday.",
    note: "The standing item is on the agenda because it keeps earning its place.",
  },
  {
    id: "w2",
    label: "Week two",
    state: "raised",
    raisedBy: PEOPLE.lei,
    said: "The CRM was slow again at nine.",
    note: "Still there. Nobody has changed anything yet, so nothing has changed.",
  },
  {
    id: "w3",
    label: "Week three",
    state: "quiet",
    raisedBy: null,
    said: "Nothing raised.",
    note: "The new line went in on the Friday. The item stays on the agenda out of habit.",
  },
  {
    id: "w4",
    label: "Week four",
    state: "gone",
    raisedBy: null,
    said: "Item removed.",
    note: "Nobody asked for it to be taken off. Somebody just stopped typing it.",
  },
];

const AGENDA = [
  "Sales pipeline",
  "Hiring",
  "The internet",
  "Customer escalations",
  "Office move",
];

const ROOM: JointSpec[] = [
  { id: "ag-room", side: "r", left: "100%", top: "50%" },
];
const SCREEN: JointSpec[] = [
  { id: "ag-screen", side: "l", left: "0%", top: "50%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * WEEKS.length;

export function BenefitAgendaScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the week it disappears.
  const index = still ? WEEKS.length - 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = WEEKS[index];
  const gone = now.state === "gone";

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/900]"
      wires={[{ from: ROOM[0].id, to: SCREEN[0].id, lit: true }]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: CalendarCheck, frame: "top-[8%] left-[3%] w-[5%]" },
          { icon: MessageSquareOff, frame: "top-[8%] left-[92%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* The room, and who is in it. */}
      <Layer
        className="top-[20%] left-[2%] w-[27%]"
        depth={0.8}
        order={30}
        active
        joints={ROOM}
        lit
      >
        <ScenePanel
          icon={Users}
          title="The Monday meeting"
          subtitle="Same room, same six people"
          aside={<SceneChip label={now.label} tone="on" />}
        >
          <PlaceFrame
            src={PLACES.office}
            ratio="aspect-[16/9]"
            caption="Head office"
          />

          <span className="flex flex-col gap-[0.3cqw]">
            {[PEOPLE.ida, PEOPLE.lei, PEOPLE.william].map((person) => {
              const speaking = now.raisedBy?.name === person.name;

              return (
                <PersonRow
                  key={person.name}
                  person={person}
                  doing={speaking ? now.said : "Nothing to add on that one"}
                  active={speaking}
                />
              );
            })}
          </span>
        </ScenePanel>
      </Layer>

      {/* The agenda on the screen at the end of the room. */}
      <Layer
        className="top-[14%] left-[34%] w-[36%]"
        depth={0.5}
        order={20}
        active
        glow
        joints={SCREEN}
        lit
      >
        <DeviceLaptop>
          <AppBar
            title="Monday agenda"
            right={
              <span className="flex items-center gap-[0.3cqw] rounded-full bg-accent px-[0.5cqw] py-[0.15cqw] text-[0.6cqw] text-accent-foreground">
                <CalendarCheck className="size-[0.65cqw] text-primary" />
                {now.label}
              </span>
            }
          />
          <div className="flex flex-1 flex-col justify-center gap-[0.45cqw] bg-linear-to-b from-accent/40 to-card p-[1cqw]">
            {AGENDA.map((item) => {
              const standing = item === "The internet";
              const struck = standing && gone;
              const hidden = standing && gone;

              return (
                <span
                  key={item}
                  className={cn(
                    "flex items-center gap-[0.55cqw] rounded-[0.5cqw] px-[0.6cqw] py-[0.4cqw] transition-all duration-700",
                    standing
                      ? gone
                        ? "bg-muted/50 opacity-40"
                        : "bg-accent ring-1 ring-primary"
                      : "bg-card/85",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[1.3cqw] shrink-0 items-center justify-center rounded-[0.35cqw] transition-colors duration-500",
                      struck
                        ? "bg-muted text-muted-foreground"
                        : standing
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-primary",
                    )}
                  >
                    {struck ? (
                      <Minus className="size-1/2" />
                    ) : (
                      <Check className="size-1/2" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-[0.74cqw] transition-all duration-700",
                      hidden && "line-through",
                      standing ? "font-semibold" : "text-muted-foreground",
                    )}
                  >
                    {item}
                  </span>
                  {standing ? (
                    <span className="ml-auto text-[0.64cqw] text-muted-foreground">
                      {now.state === "raised"
                        ? "Raised again"
                        : now.state === "quiet"
                          ? "Nothing raised"
                          : "Removed"}
                    </span>
                  ) : null}
                </span>
              );
            })}
          </div>
        </DeviceLaptop>
      </Layer>

      {/* The four weeks, as a rail. */}
      <Layer
        className="top-[24%] left-[74%] w-[24%]"
        depth={0.75}
        order={30}
        active
        joints={[]}
        lit
      >
        <ScenePanel
          icon={ListChecks}
          title="Four weeks"
          subtitle="What changed, and when"
        >
          <span className="flex flex-col gap-[0.35cqw]">
            {WEEKS.map((week, step) => (
              <span
                key={week.id}
                className={cn(
                  "flex items-center gap-[0.5cqw] rounded-[0.7cqw] px-[0.6cqw] py-[0.4cqw] transition-all duration-500",
                  step === index
                    ? "bg-accent"
                    : step < index
                      ? "bg-card/70"
                      : "bg-transparent opacity-40",
                )}
              >
                <span
                  className={cn(
                    "size-[0.5cqw] shrink-0 rounded-full transition-colors duration-500",
                    step <= index ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                />
                <span className="text-[0.74cqw] font-medium">
                  {week.label}
                </span>
                <span className="ml-auto text-[0.64cqw] text-muted-foreground">
                  {week.state === "raised" ? "Raised" : week.state === "quiet" ? "Quiet" : "Gone"}
                </span>
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* What that week actually was. */}
      <div
        className="parallax absolute top-[76%] left-[16%] w-[62%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.75cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.85cqw]">
          <span
            className={cn(
              "flex size-[2cqw] shrink-0 items-center justify-center rounded-full transition-colors duration-500",
              gone
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {gone ? (
              <MessageSquareOff className="size-1/2" />
            ) : (
              <Building2 className="size-1/2" />
            )}
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
          icon={MessageSquareOff}
          label="The week it stopped being an agenda item"
          size="md"
          active={gone}
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
