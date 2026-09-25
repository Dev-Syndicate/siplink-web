"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Cloud,
  CreditCard,
  Laptop,
  MessageSquare,
  PhoneCall,
  Smartphone,
  Video,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import {
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
  ScenePanel,
} from "@/components/site/internet-scene-parts";
import {
  AppBar,
  DeviceLaptop,
  DevicePhone,
  PEOPLE,
  PersonRow,
  PlaceFrame,
  PLACES,
} from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * A floor at eleven in the morning, with five different things on one line.
 *
 * The page's whole promise is that the connection stops being a topic. That
 * is an absence, and an absence is the hardest thing to put in a picture —
 * so the scene shows the presence instead: five people doing five different
 * jobs at the same moment, each one quietly depending on the same line, and
 * none of them waiting.
 *
 * The laptop and the handset are real screens rather than icons, because the
 * argument is about ordinary work rather than about network equipment. The
 * equipment gets the scene after this one.
 *
 * Nothing is measured. Who is doing what is illustrative; that all of it is
 * happening at once is the claim, and it is the same claim the copy makes.
 */

type Seat = {
  id: string;
  person: { name: string; photo: string };
  doing: string;
  device: LucideIcon;
  /** What the laptop shows while this person has the scene. */
  screen: "call" | "files" | "card" | "chat" | "cloud";
  headline: string;
  note: string;
};

const SEATS: Seat[] = [
  {
    id: "call",
    person: PEOPLE.aarushi,
    doing: "On a video call with a client",
    device: Video,
    screen: "call",
    headline: "A client call, mid-morning",
    note: "Sending as much as it receives, and the least forgiving thing on the floor about timing.",
  },
  {
    id: "cloud",
    person: PEOPLE.william,
    doing: "In the CRM and the finance system",
    device: Cloud,
    screen: "cloud",
    headline: "Cloud applications, all day",
    note: "Nothing is hosted in the building, so every click is a trip down the same line.",
  },
  {
    id: "files",
    person: PEOPLE.ida,
    doing: "Sending a job out to a customer",
    device: Laptop,
    screen: "files",
    headline: "Work going the other way",
    note: "An upload, however the app describes it — and the half of the line nobody is sold on.",
  },
  {
    id: "card",
    person: PEOPLE.lei,
    doing: "Taking a payment at the front desk",
    device: CreditCard,
    screen: "card",
    headline: "Small, constant, unmissable",
    note: "Almost no traffic at all, and the one thing on the floor that cannot be asked to wait.",
  },
  {
    id: "chat",
    person: PEOPLE.tj,
    doing: "On the phone, away from a desk",
    device: Smartphone,
    screen: "chat",
    headline: "Off the desk, on the Wi-Fi",
    note: "The same business number, carried by the same connection, three rooms away.",
  },
];

const FLOOR: JointSpec[] = [
  { id: "bbf-floor", side: "b", left: "50%", top: "100%" },
];
const LINE: JointSpec[] = [
  { id: "bbf-line-in", side: "t", left: "50%", top: "0%" },
  { id: "bbf-line-out", side: "r", left: "100%", top: "50%" },
];
const NET: JointSpec[] = [
  { id: "bbf-net", side: "l", left: "0%", top: "50%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * SEATS.length;

export function BroadbandFloorScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the client call, the busiest thing on the line.
  const index = still ? 0 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = SEATS[index];
  const elapsed = still ? 154 : 120 + (t % 600);

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={[
        { from: FLOOR[0].id, to: LINE[0].id, lit: true },
        { from: LINE[1].id, to: NET[0].id, lit: true },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Wifi, frame: "top-[6%] left-[36%] w-[4.5%]" },
          { icon: Building2, frame: "top-[6%] left-[60%] w-[4.5%]", delay: "-3s" },
        ]}
      />

      {/* Who is on the floor, and what each of them is doing. */}
      <Layer
        className="top-[16%] left-[2%] w-[24%]"
        depth={0.8}
        order={30}
        active
        joints={[]}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="One floor, 11:00"
          subtitle="Five jobs, none of them the same"
          aside={<SceneChip label="All at once" tone="on" />}
        >
          <span className="flex flex-col gap-[0.35cqw]">
            {SEATS.map((seat, step) => (
              <PersonRow
                key={seat.id}
                person={seat.person}
                doing={seat.doing}
                device={seat.device}
                active={step === index}
              />
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* The room itself, so the floor is a place rather than a list. */}
      <Layer
        className="top-[18%] left-[28%] w-[13%]"
        depth={0.35}
        order={10}
        joints={[]}
        lit
      >
        <PlaceFrame src={PLACES.office} />
        <ScenePill
          icon={Building2}
          label="Your office"
          className="absolute -top-[1.2cqw] -left-[1cqw]"
        />
      </Layer>

      {/* What the person with the scene is looking at. */}
      <Layer
        className="top-[13%] left-[43%] w-[34%]"
        depth={0.6}
        order={20}
        active
        joints={[]}
        lit
      >
        <DeviceLaptop>
          <AppBar
            title={now.headline}
            search="Search…"
            right={
              <span className="flex items-center gap-[0.35cqw] rounded-full bg-accent px-[0.5cqw] py-[0.15cqw] text-[0.6cqw] text-accent-foreground">
                <Wifi className="size-[0.65cqw] text-primary" />
                On the office line
              </span>
            }
          />
          <div className="flex flex-1 items-center justify-center bg-linear-to-b from-accent/50 to-card p-[0.9cqw]">
            <Screen seat={now} elapsed={elapsed} />
          </div>
        </DeviceLaptop>
      </Layer>

      {/* The one away from a desk. */}
      <Layer
        className="top-[20%] left-[80%] w-[11.5%]"
        depth={0.95}
        order={30}
        active={now.id === "chat"}
        joints={[]}
        lit
      >
        <DevicePhone wifi dim={now.id !== "chat"}>
          <div className="flex flex-1 flex-col items-center justify-center gap-[0.45cqw] bg-linear-to-b from-accent/60 to-card px-[0.5cqw]">
            <Portrait
              src={PEOPLE.tj.photo}
              halo={now.id === "chat"}
              className="w-[3.6cqw]"
            />
            <span className="text-center text-[0.72cqw] leading-tight font-semibold">
              {PEOPLE.tj.name.split(" ")[0]}
            </span>
            <span className="flex items-center gap-[0.3cqw] text-[0.64cqw]">
              {now.id === "chat" ? (
                <>
                  <Wave />
                  <span className="tabular-nums">{clock(elapsed)}</span>
                </>
              ) : (
                <span className="text-muted-foreground">On Wi-Fi</span>
              )}
            </span>
          </div>
        </DevicePhone>
      </Layer>

      {/* The line underneath all of it. */}
      <Layer
        className="top-[68%] left-[26%] w-[36%]"
        depth={0.5}
        order={20}
        active
        glow
        joints={LINE}
        lit
      >
        <ScenePanel
          icon={Wifi}
          title="One business connection"
          subtitle="Carrying every one of those at the same moment"
          aside={<SceneChip icon={PhoneCall} label="Voice priority" tone="on" />}
        >
          <span className="flex items-center gap-[0.35cqw]">
            {SEATS.map((seat, step) => (
              <span
                key={seat.id}
                className={cn(
                  "h-[0.45cqw] flex-1 rounded-full transition-colors duration-500",
                  step === index ? "bg-primary" : "bg-primary/30",
                )}
              />
            ))}
          </span>
          <span className="text-[0.78cqw] leading-snug text-pretty text-muted-foreground">
            {now.note}
          </span>
        </ScenePanel>
      </Layer>

      {/* And what it is all reaching. */}
      <Layer
        className="top-[70%] left-[68%] w-[24%]"
        depth={0.75}
        order={30}
        joints={NET}
        lit
      >
        <ScenePanel
          icon={Cloud}
          title="Where the work lives"
          subtitle="Customers, cloud apps, the other office"
        />
      </Layer>

      {/* The thing nobody says out loud. */}
      <div
        className="parallax absolute top-[4%] left-[4%] w-[30%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={MessageSquare}
          label="Nobody has mentioned the internet"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

/** What is on the laptop, per seat. Kept small: five states, one switch. */
function Screen({ seat, elapsed }: { seat: Seat; elapsed: number }) {
  if (seat.screen === "call") {
    return (
      <span className="flex w-full items-center gap-[0.8cqw]">
        {[PEOPLE.priya, PEOPLE.daniel, PEOPLE.marcus].map((person, index) => (
          <span
            key={person.name}
            className={cn(
              "flex flex-1 flex-col items-center gap-[0.4cqw] rounded-[0.6cqw] bg-card/85 p-[0.5cqw] ring-1",
              index === 0 ? "ring-primary" : "ring-border",
            )}
          >
            <Portrait
              src={person.photo}
              halo={index === 0}
              className="w-[3.2cqw]"
            />
            <span className="text-[0.62cqw] font-medium">{person.name}</span>
          </span>
        ))}
        <span className="flex flex-col items-center gap-[0.3cqw]">
          <Wave />
          <span className="text-[0.64cqw] tabular-nums">{clock(elapsed)}</span>
        </span>
      </span>
    );
  }

  if (seat.screen === "files") {
    return (
      <span className="flex w-full flex-col gap-[0.4cqw]">
        {["Final artwork.zip", "Site photos.zip", "Handover pack.pdf"].map(
          (file, index) => (
            <span
              key={file}
              className="flex items-center gap-[0.5cqw] rounded-[0.5cqw] bg-card/85 px-[0.6cqw] py-[0.4cqw]"
            >
              <Laptop className="size-[0.8cqw] shrink-0 text-primary" />
              <span className="text-[0.66cqw]">{file}</span>
              <span className="ml-auto flex h-[0.4cqw] w-[30%] overflow-hidden rounded-full bg-muted">
                <span
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${[92, 64, 28][index]}%` }}
                />
              </span>
            </span>
          ),
        )}
      </span>
    );
  }

  if (seat.screen === "card") {
    return (
      <span className="flex w-full flex-col items-center gap-[0.5cqw]">
        <span className="flex size-[3.2cqw] items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CreditCard className="size-1/2" />
        </span>
        <span className="text-[0.78cqw] font-semibold">Payment approved</span>
        <span className="text-[0.64cqw] text-muted-foreground">
          Front desk terminal · online
        </span>
      </span>
    );
  }

  if (seat.screen === "chat") {
    return (
      <span className="flex w-full flex-col gap-[0.4cqw]">
        {[PEOPLE.tj, PEOPLE.elena].map((person, index) => (
          <span
            key={person.name}
            className={cn(
              "flex items-center gap-[0.5cqw] rounded-[0.5cqw] px-[0.6cqw] py-[0.4cqw]",
              index === 0 ? "bg-accent" : "bg-card/85",
            )}
          >
            <Portrait src={person.photo} className="w-[1.6cqw]" />
            <span className="text-[0.66cqw]">
              {index === 0
                ? "Taking this one from the meeting room"
                : "No problem — same extension either way"}
            </span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className="grid w-full grid-cols-3 gap-[0.5cqw]">
      {["CRM", "Finance", "Microsoft 365"].map((app) => (
        <span
          key={app}
          className="flex flex-col items-center gap-[0.35cqw] rounded-[0.6cqw] bg-card/85 p-[0.6cqw]"
        >
          <span className="flex size-[2.2cqw] items-center justify-center rounded-[0.5cqw] bg-accent text-primary">
            <Cloud className="size-1/2" />
          </span>
          <span className="text-[0.64cqw] font-medium">{app}</span>
          <span className="text-[0.58cqw] text-primary">Loaded</span>
        </span>
      ))}
    </span>
  );
}
