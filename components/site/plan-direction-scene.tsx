"use client";

import type { CSSProperties } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Building2,
  Cctv,
  Cloud,
  CloudUpload,
  FolderUp,
  Globe,
  Mail,
  PhoneCall,
  TriangleAlert,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Scene,
  ScenePill,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Which way the work travels.
 *
 * The page keeps returning to the outbound half — growth shows up there
 * first, the afternoon sends files out, the backup runs out overnight — and
 * that is the half a connection sold on its download figure is worst at.
 * Saying so is easy. Drawing it is better: two lanes of the same length, the
 * same load crossing both, and one of them plainly cannot take it.
 *
 * The speed difference is the whole argument, so it is carried by the
 * animation rather than by a label: the chips on the download lane cross in
 * a few seconds and the ones on the upload lane are still strung out behind
 * each other when they do. Nothing is numbered, and nothing here is a claim
 * about a particular plan — it is the shape of a consumer-grade line.
 *
 * Stage, parallax and wiring come from scene-kit. Under reduced motion the
 * chips are spread along their lanes and stay put, which still shows the
 * queue without anything moving.
 */

type Cargo = { icon: LucideIcon; label: string };

const DOWN: Cargo[] = [
  { icon: Globe, label: "Web" },
  { icon: Mail, label: "Email" },
  { icon: Users, label: "CRM" },
];

const UP: Cargo[] = [
  { icon: Video, label: "Video calls" },
  { icon: FolderUp, label: "File sharing" },
  { icon: PhoneCall, label: "Voice" },
  { icon: Cctv, label: "Cameras" },
  { icon: CloudUpload, label: "Backup" },
];

/** How long a chip takes to cross its lane. The gap between the two is it. */
const DOWN_S = 3.6;
const UP_S = 9;

const SITE: JointSpec[] = [
  { id: "site-in", side: "r", left: "100%", top: "34%" },
  { id: "site-out", side: "r", left: "100%", top: "70%" },
];

const LANES: JointSpec[] = [
  { id: "lane-down-out", side: "l", left: "0%", top: "34%" },
  { id: "lane-down-in", side: "r", left: "100%", top: "34%" },
  { id: "lane-up-in", side: "l", left: "0%", top: "76%" },
  { id: "lane-up-out", side: "r", left: "100%", top: "76%" },
];

const NET: JointSpec[] = [
  { id: "net-out", side: "l", left: "0%", top: "34%" },
  { id: "net-in", side: "l", left: "0%", top: "70%" },
];

/** Each wire points the way its traffic goes, so the signal runs with it. */
const WIRES = [
  { from: "net-out", to: "lane-down-in" },
  { from: "lane-down-out", to: "site-in" },
  { from: "site-out", to: "lane-up-in" },
  { from: "lane-up-out", to: "net-in" },
];

export function PlanDirectionScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  /* The office names what it is currently pushing out. It moves on a beat of
     its own rather than tracking a chip: the chips are a continuous flow and
     there is no single one to point at. */
  const sending = UP[t % UP.length];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1672/800]"
      wires={WIRES.map((wire) => ({ ...wire, lit: true }))}
    >
      {/* The office. */}
      <Layer
        className="top-[28%] left-[1%] w-[24%]"
        depth={0.75}
        order={30}
        joints={SITE}
        lit
      >
        <div className="glass-panel flex flex-col gap-[0.8cqw] rounded-[1.4cqw] p-[1.1cqw]">
          <span className="flex items-center gap-[0.6cqw]">
            <span className="flex size-[2.4cqw] shrink-0 items-center justify-center rounded-[0.7cqw] bg-primary text-primary-foreground shadow-md shadow-primary/40">
              <Building2 className="size-1/2" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[1.05cqw] font-semibold">Your office</span>
              <span className="text-[0.72cqw] text-muted-foreground">
                One floor, one line
              </span>
            </span>
          </span>

          {/* A floor, as the desks on it. Decorative — it only has to read
              as a room rather than as another chart. */}
          <span className="grid grid-cols-8 gap-[0.32cqw]">
            {Array.from({ length: 24 }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "aspect-square rounded-[0.2cqw]",
                  index % 4 === 1 ? "bg-primary/55" : "bg-primary/18",
                )}
              />
            ))}
          </span>

          <span className="flex items-center gap-[0.45cqw] rounded-[0.7cqw] bg-accent px-[0.7cqw] py-[0.45cqw] text-[0.78cqw] text-accent-foreground">
            <ArrowUpFromLine className="size-[0.85cqw] shrink-0 text-primary" />
            Sending
            <span className="font-semibold">{sending.label}</span>
          </span>
        </div>
      </Layer>

      {/* The two lanes. */}
      <Layer
        className="top-[19%] left-[28%] w-[44%]"
        depth={0.45}
        order={20}
        joints={LANES}
        lit
      >
        <div className="glass-panel flex flex-col gap-[1cqw] rounded-[1.5cqw] p-[1.2cqw]">
          <span className="flex items-baseline justify-between">
            <span className="text-[1.05cqw] font-semibold">
              The same working day, both ways
            </span>
            <span className="text-[0.72cqw] text-muted-foreground">
              Same distance, same traffic
            </span>
          </span>

          <LaneTrack
            icon={ArrowDownToLine}
            title="Coming down"
            note="Wide, and rarely the problem"
            cargo={DOWN}
            seconds={DOWN_S}
            still={still}
          />

          <LaneTrack
            icon={ArrowUpFromLine}
            title="Going up"
            note="Narrow, and where the day backs up"
            cargo={UP}
            seconds={UP_S}
            tight
            still={still}
          />
        </div>
      </Layer>

      {/* Everything the office is talking to. */}
      <Layer
        className="top-[28%] left-[75%] w-[24%]"
        depth={0.75}
        order={30}
        joints={NET}
        lit
      >
        <div className="glass-panel flex flex-col gap-[0.8cqw] rounded-[1.4cqw] p-[1.1cqw]">
          <span className="flex items-center gap-[0.6cqw]">
            <span className="flex size-[2.4cqw] shrink-0 items-center justify-center rounded-[0.7cqw] bg-primary text-primary-foreground shadow-md shadow-primary/40">
              <Cloud className="size-1/2" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[1.05cqw] font-semibold">
                Everything else
              </span>
              <span className="text-[0.72cqw] text-muted-foreground">
                Where the work actually lives
              </span>
            </span>
          </span>

          <span className="flex flex-col gap-[0.35cqw]">
            {["Cloud apps", "Customers", "Head office", "Backup"].map(
              (name) => (
                <span
                  key={name}
                  className="flex items-center gap-[0.45cqw] rounded-[0.6cqw] bg-card/70 px-[0.6cqw] py-[0.35cqw] text-[0.78cqw]"
                >
                  <span className="size-[0.4cqw] rounded-full bg-primary" />
                  {name}
                </span>
              ),
            )}
          </span>
        </div>
      </Layer>

      {/* What the narrow lane feels like from a desk. */}
      <div
        className="parallax absolute top-[75%] left-[27%] w-[46%]"
        style={{ "--depth": 0.6 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.7cqw] rounded-[1cqw] px-[1cqw] py-[0.7cqw]">
          <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <TriangleAlert className="size-1/2" />
          </span>
          <span className="text-[0.92cqw] leading-tight">
            Nobody reports a slow upload. They report a call breaking up.
          </span>
        </div>
      </div>

      {/* The lower corners, so the stage does not fall away under the
          panels. Decorative only. */}
      {[
        { icon: ArrowDownToLine, frame: "top-[62%] left-[9%] w-[6%]", delay: "0s" },
        { icon: ArrowUpFromLine, frame: "top-[62%] left-[85%] w-[6%]", delay: "-3.5s" },
      ].map(({ icon: Icon, frame, delay }) => (
        <div
          key={frame}
          className={cn("parallax absolute z-0", frame)}
          style={{ "--depth": 0.3 } as CSSProperties}
        >
          <div
            className={cn(
              "glass-tile flex aspect-square items-center justify-center rounded-[1.1cqw] text-primary/70",
              !still && "card-float",
            )}
            style={
              {
                "--float-delay": delay,
                "--float-duration": "7.5s",
              } as CSSProperties
            }
          >
            <Icon className="size-[2.2cqw]" strokeWidth={1.75} />
          </div>
        </div>
      ))}

      {/* Direction labels, clear of the panels. */}
      <div
        className="parallax absolute top-[4%] left-[35%] w-[30%]"
        style={{ "--depth": 0.35 } as CSSProperties}
      >
        <ScenePill
          icon={ArrowUpFromLine}
          label="The upload is the half that fills first"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

/**
 * One direction of travel: a track with its cargo crossing it.
 *
 * The chips are staggered by a negative delay, so the lane is already full
 * when the scene is first looked at rather than filling from empty. `tight`
 * narrows the track — the upload lane is drawn as the thinner pipe it is.
 */
function LaneTrack({
  icon: Icon,
  title,
  note,
  cargo,
  seconds,
  tight,
  still,
}: {
  icon: LucideIcon;
  title: string;
  note: string;
  cargo: Cargo[];
  seconds: number;
  tight?: boolean;
  still: boolean;
}) {
  return (
    <span className="flex flex-col gap-[0.45cqw]">
      <span className="flex items-baseline gap-[0.5cqw]">
        <Icon className="size-[0.95cqw] shrink-0 translate-y-[0.15cqw] text-primary" />
        <span className="text-[0.85cqw] font-semibold">{title}</span>
        <span className="text-[0.72cqw] text-muted-foreground">{note}</span>
      </span>

      {/* Tall enough for a chip either way, so nothing is clipped vertically
          and the only thing the ends cut off is a chip leaving the lane. */}
      <span className="relative block h-[4.6cqw] w-full overflow-hidden">
        {/* The roadway. Its thickness is the argument: the same chips cross
            both, and one of them is a footpath. The inset highlight is what
            keeps the wide one reading as a pipe rather than as an empty
            input field. */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full border border-primary/20 bg-linear-to-b from-primary/12 to-primary/4 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--card)_80%,transparent)]",
            tight ? "h-[0.8cqw]" : "h-[4cqw]",
          )}
        />

        {cargo.map(({ icon: CargoIcon, label }, index) => {
          const spread = (index + 0.5) / cargo.length;

          return (
            <span
              key={label}
              className={cn(
                "absolute top-1/2 flex -translate-y-1/2 items-center gap-[0.4cqw] rounded-full bg-card px-[0.7cqw] py-[0.38cqw] text-[0.76cqw] font-medium whitespace-nowrap shadow-md shadow-primary/25 ring-1 ring-primary/25",
                !still && "lane-run",
              )}
              style={
                still
                  ? { left: `${spread * 74}%` }
                  : ({
                      "--lane-duration": `${seconds}s`,
                      "--lane-delay": `${-spread * seconds}s`,
                    } as CSSProperties)
              }
            >
              <CargoIcon className="size-[0.85cqw] shrink-0 text-primary" />
              {label}
            </span>
          );
        })}
      </span>
    </span>
  );
}
