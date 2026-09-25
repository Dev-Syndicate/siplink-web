"use client";

import Image from "next/image";
import {
  Building2,
  Grid3x3,
  House,
  MapPin,
  Mic,
  MoreHorizontal,
  Phone,
  PhoneIncoming,
  PhoneOff,
  UserRound,
  type LucideIcon,
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
import { cn } from "@/lib/utils";

/**
 * Extension mobility, as one extension that follows one person.
 *
 * Replaces the static render of the same composition. The still image put
 * the same "1024" card in three places; the scene says why that matters — a
 * customer dials 1024, and it rings wherever Sarah is right now: at the
 * office, then at home, then out on the move. The caller does the same thing
 * every time, and the hub in the middle is the only thing that changes.
 *
 * Stage, parallax and wiring come from scene-kit. The photos are cut from
 * the original render, so the person and the places are the same.
 */

type Place = "office" | "home" | "go";

const ASSETS = "/solns-remoteWorkforce/scene";
const EXTENSION = "1024";
const OWNER = { name: "Sarah Johnson", photo: `${ASSETS}/caller.webp` };
const CUSTOMER = {
  number: "+1 (415) 555-0199",
  photo: `${ASSETS}/contact-2.webp`,
};

/** Where Sarah is on each call, in order. */
const ROUTE: Place[] = ["office", "home", "go"];
const RING_S = 2;
const TALK_S = 4;
const CALL_S = RING_S + TALK_S;

const PLACES: Record<
  Place,
  {
    label: string;
    icon: LucideIcon;
    photo: string;
    /** Photo frame, and the extension card that overlaps it. */
    frame: string;
    card: string;
    joint: JointSpec;
    /** Which object the wire plugs into — whichever faces the hub. */
    plug: "frame" | "card";
    /** The hub-side end of this place's wire. */
    hub: JointSpec;
  }
> = {
  office: {
    label: "Office",
    icon: Building2,
    photo: `${ASSETS}/location-office.webp`,
    frame: "top-[6%] left-[5%] w-[16%]",
    card: "top-[20%] left-[16%] w-[17%]",
    joint: { id: "office", side: "r", left: "100%", top: "50%" },
    plug: "card",
    hub: { id: "hub-office", side: "l", left: "0%", top: "32%" },
  },
  home: {
    label: "Home",
    icon: House,
    photo: `${ASSETS}/location-home.webp`,
    frame: "top-[54%] left-[5%] w-[16%]",
    card: "top-[66%] left-[16%] w-[17%]",
    joint: { id: "home", side: "r", left: "100%", top: "50%" },
    plug: "card",
    hub: { id: "hub-home", side: "l", left: "0%", top: "68%" },
  },
  go: {
    label: "On the go",
    icon: MapPin,
    photo: `${ASSETS}/location-go.webp`,
    frame: "top-[20%] left-[67%] w-[19%]",
    card: "top-[50%] left-[80.5%] w-[17%]",
    joint: { id: "go", side: "l", left: "0%", top: "45%" },
    plug: "frame",
    hub: { id: "hub-go", side: "r", left: "100%", top: "50%" },
  },
};

export function ExtensionMobilityScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the office call, mid-conversation.
  const inLoop = t % (CALL_S * ROUTE.length);
  const here = still ? "office" : ROUTE[Math.floor(inLoop / CALL_S)];
  const phase = inLoop % CALL_S;
  const ringing = !still && phase < RING_S;
  const elapsed = still ? 24 : Math.max(0, phase - RING_S);

  const wires = [
    { from: "caller", to: "hub-in", lit: true },
    ...ROUTE.map((place) => ({
      from: PLACES[place].hub.id,
      to: PLACES[place].joint.id,
      lit: place === here,
    })),
  ];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1672/941]"
      wires={wires}
    >
      {/* The caller. Always the same number, always the same extension. */}
      <Layer
        className="top-[5%] left-[40%] w-[20%]"
        depth={0.7}
        order={30}
        joints={[{ id: "caller", side: "b", left: "50%", top: "100%" }]}
        lit
      >
        <div className="glass-panel flex items-center gap-[0.9cqw] rounded-[1.2cqw] p-[0.9cqw]">
          <Portrait
            src={CUSTOMER.photo}
            ringing={ringing}
            className="w-[3.2cqw]"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[0.75cqw] text-muted-foreground">
              {ringing ? "Customer calling" : "Customer connected"}
            </span>
            <span className="text-[1.05cqw] font-semibold tabular-nums">
              {CUSTOMER.number}
            </span>
            <span className="mt-[0.2cqw] flex items-center gap-[0.35cqw] text-[0.8cqw] font-medium text-primary">
              <PhoneIncoming className="size-[0.85cqw]" />
              Dialled ext. {EXTENSION}
            </span>
          </span>
        </div>
      </Layer>

      {/* The hub: one extension, pointed at wherever its owner is. */}
      <Layer
        className="top-[42%] left-[41%] w-[18%]"
        depth={0.5}
        order={20}
        joints={[
          { id: "hub-in", side: "t", left: "50%", top: "0%" },
          PLACES.office.hub,
          PLACES.home.hub,
          PLACES.go.hub,
        ]}
        lit
      >
        <div className="glass-panel glass-tile-lit flex flex-col items-center gap-[0.5cqw] rounded-[1.4cqw] px-[1cqw] py-[1.1cqw] text-center">
          <span className="flex size-[3cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
            <UserRound className="size-1/2" />
          </span>
          <span className="text-[1.05cqw] leading-tight font-semibold">
            Same extension,
            <br />
            everywhere
          </span>
          <span className="flex items-center gap-[0.35cqw] rounded-full bg-accent px-[0.8cqw] py-[0.3cqw] text-[0.8cqw] font-medium whitespace-nowrap text-accent-foreground">
            Ext. {EXTENSION}
            <span aria-hidden>→</span>
            {PLACES[here].label}
          </span>
        </div>
      </Layer>

      {ROUTE.map((place) => {
        const spot = PLACES[place];
        const on = place === here;

        return (
          <div key={place} className="contents">
            {/* Where she is. */}
            <Layer
              className={spot.frame}
              depth={0.35}
              order={10}
              active={on}
              joints={spot.plug === "frame" ? [spot.joint] : []}
              lit={on}
            >
              <div
                className={cn(
                  "relative aspect-[4/5] overflow-hidden rounded-[1.4cqw] border-[0.35cqw] border-card shadow-xl shadow-primary/20 transition-[filter,opacity] duration-700",
                  !on && "opacity-70 grayscale-[70%]",
                )}
              >
                <Image
                  src={spot.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1152px) 13rem, 20vw"
                  loading="eager"
                  className="object-cover"
                />
              </div>
              <ScenePill
                icon={spot.icon}
                label={spot.label}
                active={on}
                className="absolute -top-[1.4cqw] -left-[1.2cqw]"
              />
            </Layer>

            {/* Her extension, there. */}
            <Layer
              className={spot.card}
              depth={0.85}
              order={30}
              active={on}
              joints={spot.plug === "card" ? [spot.joint] : []}
              lit={on}
            >
              <ExtensionCard
                on={on}
                ringing={on && ringing}
                elapsed={elapsed}
              />
            </Layer>
          </div>
        );
      })}
    </Scene>
  );
}

function ExtensionCard({
  on,
  ringing,
  elapsed,
}: {
  on: boolean;
  ringing: boolean;
  elapsed: number;
}) {
  return (
    <div
      className={cn(
        "glass-panel flex flex-col gap-[0.8cqw] rounded-[1.2cqw] p-[1cqw] transition-opacity duration-500",
        !on && "opacity-75",
      )}
    >
      <div className="flex items-center gap-[0.8cqw]">
        <span className="relative">
          <Portrait
            src={OWNER.photo}
            ringing={ringing}
            className="w-[3.2cqw]"
          />
          <span
            className={cn(
              "absolute right-0 bottom-0 size-[0.9cqw] rounded-full border-[0.18cqw] border-card transition-colors duration-500",
              on ? "bg-primary" : "bg-muted-foreground/40",
            )}
          />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-[0.75cqw] text-muted-foreground">
            Extension
          </span>
          <span className="text-[1.5cqw] font-semibold tabular-nums">
            {EXTENSION}
          </span>
        </span>
      </div>

      <div className="flex h-[1.5cqw] items-center gap-[0.5cqw] text-[0.8cqw]">
        {ringing ? (
          <span className="font-medium text-primary">Ringing here…</span>
        ) : on ? (
          <>
            <Wave />
            <span className="tabular-nums">On call · {clock(elapsed)}</span>
          </>
        ) : (
          <span className="text-muted-foreground">
            {OWNER.name.split(" ")[0]} isn’t here
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Control icon={Mic} className="w-[2.3cqw]" />
        <Control icon={Grid3x3} className="w-[2.3cqw]" />
        <Control icon={MoreHorizontal} className="w-[2.3cqw]" />
        <Control
          icon={ringing ? Phone : PhoneOff}
          hangup={on}
          className={cn("w-[2.6cqw]", ringing && "ring-pulse")}
        />
      </div>
    </div>
  );
}
