"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import {
  Building2,
  CloudUpload,
  Grid3x3,
  Lock,
  Mic,
  MoreHorizontal,
  PhoneOff,
  ShieldCheck,
  Video,
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
 * Voice that holds its place, as the hour it is supposed to survive.
 *
 * The card above this section says a backup job cannot push a conversation
 * off the line. That is a claim about behaviour over time, which a diagram
 * cannot make and a sentence is easy to disbelieve — so the scene runs the
 * hour: a meeting on the laptop and a call on the handset, and underneath
 * them a backup that starts, swells until it has taken everything left, and
 * finishes. The timer on the call never resets while it happens.
 *
 * Stage, parallax and wiring come from scene-kit, and the photographs are the
 * ones the solutions scenes use, so the people are the same people across the
 * site rather than a second cast.
 *
 * No figure is asserted. The lanes are drawn in proportion to each other and
 * carry no scale, because the point is which of them moves — not how big
 * either one is.
 */

const ASSETS = "/solns-remoteWorkforce/scene";

const ROOM = [
  { name: "Aarushi Peri", photo: `${ASSETS}/team-aarushi.webp` },
  { name: "William Meek", photo: `${ASSETS}/team-william.webp` },
  { name: "Lei Quynh", photo: `${ASSETS}/team-lei.webp` },
];

const CALLER = { name: "Priya Shah", photo: `${ASSETS}/contact-8.webp` };

/** Quiet, then the backup runs, then it is done. */
type Phase = {
  id: "quiet" | "busy" | "done";
  seconds: number;
  /** How much of the line the rest of the traffic has taken. */
  other: number;
  label: string;
};

const PHASES: Phase[] = [
  { id: "quiet", seconds: 3, other: 18, label: "Backup queued" },
  { id: "busy", seconds: 7, other: 92, label: "Backup running" },
  { id: "done", seconds: 3, other: 24, label: "Backup finished" },
];

const LOOP_S = PHASES.reduce((sum, phase) => sum + phase.seconds, 0);

/** The voice lane does not move. That is the entire scene. */
const VOICE_FILL = 34;

const JOINTS: Record<string, JointSpec> = {
  site: { id: "voice-site", side: "b", left: "50%", top: "100%" },
  laptop: { id: "voice-laptop", side: "b", left: "30%", top: "100%" },
  handset: { id: "voice-handset", side: "b", left: "50%", top: "100%" },
  backup: { id: "voice-backup", side: "b", left: "50%", top: "100%" },
  lineA: { id: "voice-line-a", side: "t", left: "14%", top: "0%" },
  lineB: { id: "voice-line-b", side: "t", left: "38%", top: "0%" },
  lineC: { id: "voice-line-c", side: "t", left: "66%", top: "0%" },
  lineD: { id: "voice-line-d", side: "t", left: "90%", top: "0%" },
};

export function FeatureVoiceScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests in the busy phase — the moment being argued about.
  let phase = PHASES[1];
  if (!still) {
    let edge = t % LOOP_S;
    for (const candidate of PHASES) {
      if (edge < candidate.seconds) {
        phase = candidate;
        break;
      }
      edge -= candidate.seconds;
    }
  }

  const busy = phase.id === "busy";
  // The call is older than the loop, and is never restarted by it.
  const elapsed = still ? 154 : 120 + (t % 600);

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={[
        { from: JOINTS.site.id, to: JOINTS.lineA.id, lit: true },
        { from: JOINTS.laptop.id, to: JOINTS.lineB.id, lit: true },
        { from: JOINTS.backup.id, to: JOINTS.lineC.id, lit: busy },
        { from: JOINTS.handset.id, to: JOINTS.lineD.id, lit: true },
      ]}
    >
      {/* The building the line arrives at. */}
      <Layer
        className="top-[8%] left-[2%] w-[13%]"
        depth={0.35}
        order={10}
        joints={[JOINTS.site]}
        lit
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3cqw] border-[0.3cqw] border-card shadow-xl shadow-primary/20">
          <Image
            src={`${ASSETS}/location-office.webp`}
            alt=""
            fill
            sizes="(min-width: 1152px) 10rem, 16vw"
            loading="eager"
            className="object-cover"
          />
        </div>
        <ScenePill
          icon={Building2}
          label="Your office"
          className="absolute -top-[1.2cqw] -left-[0.9cqw]"
        />
      </Layer>

      {/* The meeting. */}
      <Layer
        className="top-[9%] left-[18%] w-[40%]"
        depth={0.5}
        order={20}
        active
        joints={[JOINTS.laptop]}
        lit
      >
        <Meeting elapsed={elapsed} />
      </Layer>

      {/* The job that would like the whole line, please. */}
      <Layer
        className="top-[10%] left-[62%] w-[19%]"
        depth={0.8}
        order={20}
        active={busy}
        joints={[JOINTS.backup]}
        lit={busy}
      >
        <BackupTile busy={busy} caption={phase.label} fill={phase.other} />
      </Layer>

      {/* The same conversation, from a pocket. */}
      <Layer
        className="top-[16%] left-[85%] w-[12.5%]"
        depth={0.95}
        order={30}
        active
        joints={[JOINTS.handset]}
        lit
      >
        <Handset elapsed={elapsed} />
      </Layer>

      {/* The line itself, with the two lanes that matter. */}
      <Layer
        className="top-[62%] left-[22%] w-[52%]"
        depth={0.6}
        order={30}
        active
        glow
        joints={[JOINTS.lineA, JOINTS.lineB, JOINTS.lineC, JOINTS.lineD]}
        lit
      >
        <LinePanel other={phase.other} caption={phase.label} busy={busy} />
      </Layer>

      {/* The claim, stated once, where the lanes can be seen making it. */}
      <div
        className="parallax absolute top-[64%] left-[77%] w-[21%]"
        style={{ "--depth": 0.75 } as CSSProperties}
      >
        <div className="glass-panel flex flex-col gap-[0.55cqw] rounded-[1.2cqw] p-[1cqw]">
          <span className="flex size-[2.2cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
            <ShieldCheck className="size-1/2" />
          </span>
          <span className="text-[0.95cqw] leading-tight font-semibold">
            Voice keeps its lane
          </span>
          <span className="text-[0.76cqw] leading-snug text-muted-foreground">
            Sized and prioritised when the plan is built, not fought for
            afterwards.
          </span>
        </div>
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

function Meeting({ elapsed }: { elapsed: number }) {
  return (
    <div>
      <div className="rounded-t-[1.2cqw] bg-foreground/90 p-[0.5cqw] pb-[0.8cqw] shadow-2xl shadow-primary/20">
        <span className="mx-auto mb-[0.3cqw] block size-[0.4cqw] rounded-full bg-muted-foreground/60" />

        <div className="flex aspect-[16/10] flex-col overflow-hidden rounded-[0.5cqw] bg-card">
          <div className="flex items-center gap-[0.7cqw] border-b border-border px-[0.9cqw] py-[0.55cqw]">
            <span className="text-[1.1cqw] font-black tracking-tighter text-primary italic">
              {"//"}
            </span>
            <span className="text-[0.8cqw] font-semibold">Team meeting</span>
            <span className="ml-auto flex items-center gap-[0.3cqw] rounded-full bg-accent px-[0.55cqw] py-[0.2cqw] text-[0.62cqw] text-accent-foreground">
              <Lock className="size-[0.65cqw] text-primary" />
              HD voice · Encrypted
            </span>
          </div>

          {/* Three in the room, one of them speaking. */}
          <div className="grid flex-1 grid-cols-3 gap-[0.4cqw] bg-linear-to-b from-accent/50 to-card p-[0.6cqw]">
            {ROOM.map(({ name, photo }, index) => (
              <span
                key={name}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-[0.4cqw] rounded-[0.6cqw] bg-card/80 p-[0.5cqw] ring-1",
                  index === 0 ? "ring-primary" : "ring-border",
                )}
              >
                <Portrait src={photo} halo={index === 0} className="w-[4cqw]" />
                <span className="text-[0.68cqw] font-medium">{name}</span>
                {index === 0 ? (
                  <span className="absolute right-[0.4cqw] bottom-[0.4cqw]">
                    <Wave />
                  </span>
                ) : (
                  <Mic className="absolute right-[0.5cqw] bottom-[0.6cqw] size-[0.7cqw] text-muted-foreground" />
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border px-[0.9cqw] py-[0.5cqw]">
            <span className="flex items-center gap-[0.45cqw] text-[0.72cqw]">
              <Video className="size-[0.8cqw] text-primary" />
              <span className="tabular-nums">{clock(elapsed)}</span>
              <span className="text-muted-foreground">· nothing dropped</span>
            </span>
            <span className="flex gap-[0.5cqw]">
              <Control icon={Mic} className="w-[1.7cqw]" />
              <Control icon={Grid3x3} className="w-[1.7cqw]" />
              <Control icon={PhoneOff} hangup className="w-[1.7cqw]" />
            </span>
          </div>
        </div>
      </div>

      {/* The deck. Without it the lid reads as a framed screen rather than
          as a laptop, which is the one thing this object has to be. */}
      <div className="relative mx-[-7%] h-[1.4cqw] rounded-b-[1.4cqw] bg-linear-to-b from-card via-muted to-muted-foreground/40 shadow-lg shadow-primary/15">
        <span className="absolute top-0 left-1/2 h-[0.45cqw] w-[14%] -translate-x-1/2 rounded-b-[0.5cqw] bg-muted-foreground/25" />
      </div>
    </div>
  );
}

function Handset({ elapsed }: { elapsed: number }) {
  return (
    <div className="rounded-[1.6cqw] bg-foreground/90 p-[0.35cqw] shadow-2xl shadow-primary/25">
      <div className="flex aspect-[9/17] flex-col overflow-hidden rounded-[1.35cqw] bg-card">
        <span className="mx-auto mt-[0.4cqw] h-[0.35cqw] w-[30%] rounded-full bg-foreground/70" />

        <div className="flex flex-1 flex-col items-center justify-center gap-[0.5cqw] bg-linear-to-b from-accent/60 to-card px-[0.6cqw]">
          <Portrait src={CALLER.photo} halo className="w-[4.4cqw]" />
          <span className="text-center text-[0.8cqw] leading-tight font-semibold">
            {CALLER.name}
          </span>
          <span className="flex items-center gap-[0.35cqw] text-[0.72cqw]">
            <Wave />
            <span className="tabular-nums">{clock(elapsed)}</span>
          </span>
        </div>

        <div className="flex items-center justify-between px-[0.6cqw] pb-[0.7cqw]">
          <Control icon={Mic} className="w-[1.6cqw]" />
          <Control icon={MoreHorizontal} className="w-[1.6cqw]" />
          <Control icon={PhoneOff} hangup className="w-[1.8cqw]" />
        </div>
      </div>
    </div>
  );
}

function BackupTile({
  busy,
  caption,
  fill,
}: {
  busy: boolean;
  caption: string;
  fill: number;
}) {
  return (
    <div
      className={cn(
        "glass-tile flex flex-col gap-[0.6cqw] rounded-[1.2cqw] p-[0.9cqw] transition-shadow duration-500",
        busy && "glass-tile-lit",
      )}
    >
      <span className="flex items-center gap-[0.6cqw]">
        <span
          className={cn(
            "flex size-[2.1cqw] shrink-0 items-center justify-center rounded-[0.6cqw] transition-colors duration-500",
            busy
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-primary",
          )}
        >
          <CloudUpload className="size-1/2" />
        </span>
        <span className="text-[0.95cqw] leading-tight font-semibold">
          Cloud backup
        </span>
      </span>

      <span className="relative block h-[0.6cqw] overflow-hidden rounded-full bg-muted">
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-primary/70 transition-[width] duration-1000 ease-out"
          style={{ width: `${fill}%` }}
        />
      </span>

      <span className="text-[0.74cqw] text-muted-foreground">{caption}</span>
    </div>
  );
}

function LinePanel({
  other,
  caption,
  busy,
}: {
  other: number;
  caption: string;
  busy: boolean;
}) {
  return (
    <div className="glass-panel glass-tile-lit flex flex-col gap-[0.9cqw] rounded-[1.5cqw] p-[1.2cqw]">
      <span className="flex items-baseline justify-between">
        <span className="text-[1.05cqw] font-semibold">
          One business line, two lanes
        </span>
        <span className="text-[0.74cqw] text-muted-foreground">{caption}</span>
      </span>

      <LineLane
        icon={ShieldCheck}
        title="Voice"
        note="Its own lane, whatever else is on"
        fill={VOICE_FILL}
        steady
      />

      <LineLane
        icon={CloudUpload}
        title="Everything else"
        note="Takes what is left, and gives it back"
        fill={other}
        jitter={busy}
      />
    </div>
  );
}

function LineLane({
  icon: Icon,
  title,
  note,
  fill,
  steady,
  jitter,
}: {
  icon: LucideIcon;
  title: string;
  note: string;
  fill: number;
  steady?: boolean;
  jitter?: boolean;
}) {
  return (
    <span className="flex flex-col gap-[0.35cqw]">
      <span className="flex items-baseline gap-[0.45cqw]">
        <Icon className="size-[0.9cqw] shrink-0 translate-y-[0.15cqw] text-primary" />
        <span className="text-[0.82cqw] font-semibold">{title}</span>
        <span className="text-[0.72cqw] text-muted-foreground">{note}</span>
      </span>

      <span className="relative block h-[1.1cqw] overflow-hidden rounded-full bg-muted">
        <span
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000 ease-out",
            steady
              ? "bg-linear-to-r from-brand-from to-brand-to"
              : "bg-primary/45",
            jitter && "scene-jitter",
          )}
          style={{ width: `${fill}%` }}
        />
        {/* The voice lane's boundary, drawn as a fence rather than implied:
            what is to the left of it is not available to anything else. */}
        {steady ? (
          <span
            aria-hidden
            className="absolute inset-y-0 w-px bg-primary/60"
            style={{ left: `${fill}%` }}
          />
        ) : null}
      </span>
    </span>
  );
}
