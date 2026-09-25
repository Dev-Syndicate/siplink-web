"use client";

import type { CSSProperties } from "react";
import {
  Ban,
  Calendar,
  Check,
  ListChecks,
  Pin,
  RefreshCw,
  Router,
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
 * The hero stage on /internet/static-ip/what-is-static-ip.
 *
 * It replaces a configuration-file card that said the right thing and said
 * it standing still: a dynamic value struck through, a static one below it.
 * The trouble with drawing the conclusion is that the reader never sees the
 * forty days in which nothing appears to be wrong, and those are the whole
 * reason the failure is expensive.
 *
 * So the stage runs them. The address on the left is reissued between one
 * beat and the next, the rule on the right has not moved since somebody
 * typed it, and the person at the bottom finds out before either system
 * does.
 *
 * Sized differently from the section scenes on purpose. Those get the
 * container's full width and can afford `cqw` type throughout; this one
 * lives in a hero column that is only about 640px at its widest and around
 * 384px at the `lg` breakpoint, where plain `cqw` text would land at seven
 * pixels. Type is therefore clamped: it tracks the container between two
 * bounds and stops at both.
 *
 * Every address is RFC 5737 documentation space and routes nowhere.
 */

const LISTED = "198.51.100.7";

type Beat = {
  id: string;
  when: string;
  address: string;
  /** Whether the connection is still being handed an address from a pool. */
  dynamic: boolean;
  headline: string;
  note: string;
};

const BEATS: Beat[] = [
  {
    id: "day1",
    when: "Day 1",
    address: LISTED,
    dynamic: true,
    headline: "Somebody writes it down",
    note: "The address your office is using today goes onto a partner's allowlist. It works, and it is reasonable to assume it will keep working.",
  },
  {
    id: "day12",
    when: "Day 12",
    address: LISTED,
    dynamic: true,
    headline: "Nothing happens",
    note: "The integration runs every day. Nobody thinks about the address again, which is what makes the next beat a surprise.",
  },
  {
    id: "day41",
    when: "Day 41",
    address: "203.0.113.88",
    dynamic: true,
    headline: "The lease renews",
    note: "A different address, no notice, no error. The partner refuses a request from an address that is not on their list — correctly.",
  },
  {
    id: "static",
    when: "With a static IP",
    address: LISTED,
    dynamic: false,
    headline: "The number stops moving",
    note: "Held against your service, so the rule written on day one is still true on day forty-one and nobody has to be told anything.",
  },
];

const LINE: JointSpec[] = [
  { id: "sh-line", side: "r", left: "100%", top: "62%" },
];
const RULE: JointSpec[] = [
  { id: "sh-rule", side: "l", left: "0%", top: "62%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * BEATS.length;

/* One pair of bounds for each role, so the two cards cannot drift apart as
   the column narrows. */
const TYPE = {
  label: "text-[clamp(8px,1.5cqw,11px)]",
  title: "text-[clamp(11px,2.1cqw,15px)]",
  body: "text-[clamp(9px,1.7cqw,12px)]",
  address: "text-[clamp(13px,3cqw,22px)]",
  chip: "text-[clamp(8px,1.4cqw,11px)]",
};

export function StaticIpHeroScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the refusal — the moment the page exists for.
  const index = still ? 2 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = BEATS[index];
  const matches = now.address === LISTED;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1000/780]"
      backdrop="soft"
      wires={[{ from: LINE[0].id, to: RULE[0].id, lit: matches }]}
    >
      {/* Which day this is. */}
      <div
        className="parallax absolute top-[2%] left-[16%] w-[68%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <span
          className={cn(
            "mx-auto flex w-fit items-center justify-center gap-[0.8cqw] rounded-full bg-card px-[2cqw] py-[1cqw] font-semibold whitespace-nowrap shadow-md transition-shadow duration-500",
            TYPE.title,
            now.dynamic
              ? "shadow-primary/15 ring-1 ring-border"
              : "shadow-primary/40 ring-2 ring-primary",
          )}
        >
          <span
            className={cn(
              "flex size-[3.4cqw] items-center justify-center rounded-full transition-colors duration-500",
              now.dynamic
                ? "bg-accent text-primary"
                : "bg-primary text-primary-foreground",
            )}
          >
            {now.dynamic ? (
              <Calendar className="size-1/2" />
            ) : (
              <Pin className="size-1/2" />
            )}
          </span>
          {now.when}
        </span>
      </div>

      {/* Your connection, and whatever address it has today. */}
      <Layer
        className="top-[16%] left-[1%] w-[47%]"
        depth={0.75}
        order={30}
        active
        joints={LINE}
        lit
      >
        <Card
          icon={Router}
          title="Your connection"
          chip={now.dynamic ? "Dynamic" : "Static"}
          chipTone={now.dynamic ? "off" : "on"}
        >
          <AddressPlate
            address={now.address}
            changed={now.id === "day41"}
            pinned={!now.dynamic}
          />
          <span className={cn(TYPE.body, "leading-snug text-muted-foreground")}>
            {now.dynamic
              ? "Handed out from a pool. Replaced without notice."
              : "Held against the service. It does not move."}
          </span>
        </Card>
      </Layer>

      {/* What somebody else typed, once, and never revisited. */}
      <Layer
        className="top-[16%] left-[52%] w-[47%]"
        depth={0.75}
        order={30}
        active={!matches}
        joints={RULE}
        lit
      >
        <Card
          icon={ListChecks}
          title="Their allowlist"
          chip={matches ? "Allowed" : "Refused"}
          chipTone={matches ? "on" : "off"}
        >
          <AddressPlate address={LISTED} listed />
          <span
            className={cn(
              TYPE.body,
              "leading-snug transition-colors duration-500",
              matches ? "text-muted-foreground" : "font-medium text-foreground",
            )}
          >
            {matches
              ? "The address asking matches the address listed."
              : "The address asking is not on the list."}
          </span>
        </Card>
      </Layer>

      {/* The verdict, in the middle, where the wire lands. */}
      <div
        className="parallax absolute top-[52%] left-[24%] w-[52%]"
        style={{ "--depth": 0.9 } as CSSProperties}
      >
        <span
          className={cn(
            "flex items-center justify-center gap-[0.9cqw] rounded-full px-[1.6cqw] py-[0.9cqw] font-semibold shadow-lg transition-colors duration-500",
            TYPE.body,
            matches
              ? "bg-primary text-primary-foreground shadow-primary/30"
              : "bg-foreground text-background shadow-foreground/20",
          )}
        >
          {matches ? (
            <Check className="size-[2.4cqw]" />
          ) : (
            <Ban className="size-[2.4cqw]" />
          )}
          {matches ? "Request accepted" : "Request refused"}
        </span>
      </div>

      {/* Who finds out first. Not a monitoring system. */}
      <Layer
        className="top-[66%] left-[1%] w-[47%]"
        depth={0.95}
        order={30}
        active={!matches}
        joints={[]}
        lit={!matches}
      >
        <div
          className={cn(
            "flex items-center gap-[1.2cqw] rounded-[2.2cqw] border bg-card p-[1.4cqw] shadow-lg transition-all duration-500",
            matches
              ? "border-border opacity-55 shadow-primary/10"
              : "border-primary/40 shadow-primary/25",
          )}
        >
          <Portrait
            src={PEOPLE.ida.photo}
            halo={!matches}
            className="w-[6cqw] shrink-0"
          />
          <span className="flex min-w-0 flex-col gap-[0.3cqw] leading-tight">
            <span className={cn(TYPE.label, "text-muted-foreground")}>
              {matches ? "Nobody is asking" : "09:12, from a person"}
            </span>
            <span className={cn(TYPE.body, "font-semibold text-pretty")}>
              {matches
                ? "The integration just runs"
                : "“I cannot get into the portal”"}
            </span>
          </span>
        </div>
      </Layer>

      {/* What this beat is. */}
      <div
        className="parallax absolute top-[66%] left-[52%] w-[47%]"
        style={{ "--depth": 0.6 } as CSSProperties}
      >
        <div className="glass-panel flex h-full flex-col gap-[0.5cqw] rounded-[2.2cqw] p-[1.4cqw]">
          <span className={cn(TYPE.title, "font-semibold text-balance")}>
            {now.headline}
          </span>
          <span
            className={cn(TYPE.body, "leading-snug text-pretty text-muted-foreground")}
          >
            {now.note}
          </span>
        </div>
      </div>

      {/* The four beats, as a rail along the foot. */}
      <div
        className="parallax absolute bottom-[2%] left-[24%] flex w-[52%] items-center gap-[0.8cqw]"
        style={{ "--depth": 0.4 } as CSSProperties}
      >
        {BEATS.map((beat, step) => (
          <span
            key={beat.id}
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

/* ------------------------------------------------------------- pieces */

function Card({
  icon: Icon,
  title,
  chip,
  chipTone,
  children,
}: {
  icon: LucideIcon;
  title: string;
  chip: string;
  chipTone: "on" | "off";
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel glass-tile-lit flex flex-col gap-[1cqw] rounded-[2.4cqw] p-[1.5cqw]">
      <span className="flex items-center gap-[0.9cqw]">
        <span className="flex size-[4cqw] shrink-0 items-center justify-center rounded-[1.2cqw] bg-primary text-primary-foreground shadow-md shadow-primary/40">
          <Icon className="size-1/2" />
        </span>
        <span className={cn(TYPE.title, "font-semibold")}>{title}</span>
      </span>

      <span
        className={cn(
          "self-start rounded-full px-[1cqw] py-[0.35cqw] font-medium transition-colors duration-500",
          TYPE.chip,
          chipTone === "on"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        {chip}
      </span>

      {children}
    </div>
  );
}

/**
 * The value itself.
 *
 * `changed` is the one beat where it matters that this is a different string
 * from the one that was here a moment ago, so it gets the ring. The rest of
 * the time it is deliberately unremarkable, which is the point the page is
 * making about how quiet the failure is.
 */
function AddressPlate({
  address,
  changed,
  pinned,
  listed,
}: {
  address: string;
  changed?: boolean;
  pinned?: boolean;
  listed?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-[0.8cqw] rounded-[1.4cqw] px-[1.1cqw] py-[0.8cqw] transition-all duration-500",
        changed
          ? "bg-accent ring-2 ring-primary"
          : listed
            ? "bg-card/80 ring-1 ring-border"
            : "bg-accent",
      )}
    >
      {pinned ? (
        <Pin className="size-[2.2cqw] shrink-0 text-primary" />
      ) : changed ? (
        <RefreshCw className="size-[2.2cqw] shrink-0 text-primary" />
      ) : null}
      <span
        className={cn(
          TYPE.address,
          "font-mono font-semibold tracking-tight tabular-nums",
        )}
      >
        {address}
      </span>
    </span>
  );
}
