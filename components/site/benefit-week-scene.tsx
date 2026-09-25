"use client";

import Image from "next/image";
import {
  Building2,
  House,
  Laptop,
  MapPin,
  Smartphone,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  ScenePill,
  Wave,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * One line, three places, one ordinary week.
 *
 * The accordion above places each benefit in a moment. This is the same week
 * seen from the other side: not what happens, but where — the floor on Monday
 * morning, a kitchen table on Thursday before seven, a call taken away from
 * either. The hub in the middle never changes, which is the argument.
 *
 * It is the closest relative on this site of the extension-mobility scene on
 * /solutions/remote-workforce, deliberately: that page makes the same move
 * about a person and this one makes it about a connection, and a reader who
 * has seen one should recognise the other. The photographs are the same
 * photographs, so the places are the same places.
 *
 * Nothing is asserted beyond the copy above it. No speed, no uptime, and no
 * claim that any of this is instant — each caption is the moment the benefit
 * list already describes.
 */

type Place = "office" | "home" | "go";

const ASSETS = "/solns-remoteWorkforce/scene";

const PLACES: Record<
  Place,
  {
    label: string;
    icon: LucideIcon;
    photo: string;
    when: string;
    benefit: string;
    caption: string;
    /** Who is there, and on what. */
    person: { name: string; photo: string };
    device: LucideIcon;
    deviceLabel: string;
    frame: string;
    card: string;
    joint: JointSpec;
    hub: JointSpec;
  }
> = {
  office: {
    label: "The office",
    icon: Building2,
    photo: `${ASSETS}/location-office.webp`,
    when: "Monday, 09:05",
    benefit: "Reliable connectivity",
    caption: "The whole floor arrives inside twenty minutes.",
    person: { name: "Aarushi Peri", photo: `${ASSETS}/team-aarushi.webp` },
    device: Laptop,
    deviceLabel: "Mail, CRM, Microsoft 365",
    frame: "top-[8%] left-[4%] w-[15%]",
    card: "top-[26%] left-[16%] w-[18%]",
    joint: { id: "week-office", side: "r", left: "100%", top: "50%" },
    hub: { id: "week-hub-office", side: "l", left: "0%", top: "28%" },
  },
  home: {
    label: "Home",
    icon: House,
    photo: `${ASSETS}/location-home.webp`,
    when: "Thursday, 07:40",
    benefit: "Work from anywhere",
    caption: "An early start, on the same systems as the desk.",
    person: { name: "Ida Jones", photo: `${ASSETS}/team-ida.webp` },
    device: Wifi,
    deviceLabel: "Remote access · VPN",
    frame: "top-[56%] left-[4%] w-[15%]",
    card: "top-[72%] left-[16%] w-[18%]",
    joint: { id: "week-home", side: "r", left: "100%", top: "50%" },
    hub: { id: "week-hub-home", side: "l", left: "0%", top: "72%" },
  },
  go: {
    label: "On the go",
    icon: MapPin,
    photo: `${ASSETS}/location-go.webp`,
    when: "Wednesday, 11:00",
    benefit: "Support for VoIP",
    caption: "Forty minutes on a client call, and nothing pushed it off.",
    person: { name: "Lei Quynh", photo: `${ASSETS}/team-lei.webp` },
    device: Smartphone,
    deviceLabel: "Business number, in a pocket",
    frame: "top-[22%] left-[68%] w-[17%]",
    card: "top-[54%] left-[79%] w-[18%]",
    joint: { id: "week-go", side: "l", left: "0%", top: "45%" },
    hub: { id: "week-hub-go", side: "r", left: "100%", top: "50%" },
  },
};

/** The week, in the order the benefits list tells it. */
const WEEK: Place[] = ["office", "go", "home"];
const BEAT_S = 4;
const LOOP_S = BEAT_S * WEEK.length;

export function BenefitWeekScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on Monday morning, which is the week's real test.
  const here = still ? "office" : WEEK[Math.floor((t % LOOP_S) / BEAT_S)];
  const now = PLACES[here];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1672/941]"
      wires={WEEK.map((place) => ({
        from: PLACES[place].hub.id,
        to: PLACES[place].joint.id,
        lit: place === here,
      }))}
    >
      {/* Which moment of the week this is. */}
      <Layer
        className="top-[5%] left-[38%] w-[24%]"
        depth={0.6}
        order={30}
        joints={[]}
        lit
      >
        <div className="glass-panel flex flex-col items-center gap-[0.35cqw] rounded-[1.2cqw] px-[1cqw] py-[0.8cqw] text-center">
          <span className="font-mono text-[0.72cqw] tracking-[0.18em] text-primary uppercase">
            {now.when}
          </span>
          <span className="text-[1.05cqw] font-semibold">{now.benefit}</span>
        </div>
      </Layer>

      {/* The one thing that does not move. */}
      <Layer
        className="top-[38%] left-[39%] w-[22%]"
        depth={0.45}
        order={20}
        active
        glow
        joints={[PLACES.office.hub, PLACES.home.hub, PLACES.go.hub]}
        lit
      >
        <div className="glass-panel glass-tile-lit flex flex-col items-center gap-[0.6cqw] rounded-[1.4cqw] px-[1cqw] py-[1.1cqw] text-center">
          <span className="flex size-[3cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
            <Wifi className="size-1/2" />
          </span>
          <span className="text-[1.05cqw] leading-tight font-semibold">
            One business line,
            <br />
            all week
          </span>
          <span className="flex items-center gap-[0.4cqw] rounded-full bg-accent px-[0.8cqw] py-[0.3cqw] text-[0.78cqw] font-medium whitespace-nowrap text-accent-foreground">
            Carrying
            <span aria-hidden>→</span>
            {now.label}
          </span>
          <span className="min-h-[2.2cqw] text-[0.78cqw] leading-snug text-pretty text-muted-foreground">
            {now.caption}
          </span>
        </div>
      </Layer>

      {WEEK.map((place) => {
        const spot = PLACES[place];
        const on = place === here;

        return (
          <div key={place} className="contents">
            {/* Where the work is happening. */}
            <Layer
              className={spot.frame}
              depth={0.35}
              order={10}
              active={on}
              joints={[]}
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
                  sizes="(min-width: 1152px) 12rem, 18vw"
                  loading="eager"
                  className="object-cover"
                />
              </div>
              <ScenePill
                icon={spot.icon}
                label={spot.label}
                active={on}
                className="absolute -top-[1.3cqw] -left-[1.1cqw]"
              />
            </Layer>

            {/* Who is there, and what they are on. */}
            <Layer
              className={spot.card}
              depth={0.85}
              order={30}
              active={on}
              joints={[spot.joint]}
              lit={on}
            >
              <PlaceCard place={spot} on={on} />
            </Layer>
          </div>
        );
      })}
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

function PlaceCard({
  place,
  on,
}: {
  place: (typeof PLACES)[Place];
  on: boolean;
}) {
  const Device = place.device;

  return (
    /* Solid, not glass: it sits over a photograph, and a translucent card
       let the picture show through its own text. */
    <div className="flex flex-col gap-[0.7cqw] rounded-[1.2cqw] border border-border bg-card p-[0.9cqw] shadow-lg shadow-primary/15">
      <span className="flex items-center gap-[0.6cqw]">
        <span className="relative">
          <Portrait src={place.person.photo} className="w-[2.6cqw]" />
          <span
            className={cn(
              "absolute right-0 bottom-0 size-[0.8cqw] rounded-full border-[0.16cqw] border-card transition-colors duration-500",
              on ? "bg-primary" : "bg-muted-foreground/40",
            )}
          />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-[0.85cqw] font-semibold">
            {place.person.name}
          </span>
          <span className="text-[0.7cqw] text-muted-foreground">
            {place.label}
          </span>
        </span>
      </span>

      <span className="flex items-center gap-[0.5cqw] rounded-[0.7cqw] bg-accent px-[0.6cqw] py-[0.4cqw]">
        <Device className="size-[0.95cqw] shrink-0 text-primary" />
        <span className="text-[0.72cqw] text-accent-foreground">
          {place.deviceLabel}
        </span>
      </span>

      <span className="flex h-[1.5cqw] items-center gap-[0.45cqw] text-[0.76cqw]">
        {on ? (
          <>
            <Wave />
            <span className="font-medium text-primary">Working</span>
          </>
        ) : (
          <span className="text-muted-foreground">Same line, later today</span>
        )}
      </span>
    </div>
  );
}
