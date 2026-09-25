"use client";

import type { CSSProperties } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpFromLine,
  Cctv,
  CloudUpload,
  CreditCard,
  Laptop,
  PhoneCall,
  Router,
  Users,
  Video,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Scene,
  ScenePill,
  Wave,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * One line, everything on it.
 *
 * The page argues that a plan is sized from the work rather than picked off a
 * tier list, and this is the picture of the work: six things that share one
 * office connection, joining it one at a time until they are all on together.
 * What the scene is for is the last beat — the moment every workload is live
 * at once, which is the only state a plan actually has to survive.
 *
 * Stage, parallax and wiring come from scene-kit, so it reads as a relative
 * of the capability scenes on the solutions pages rather than a new idiom.
 *
 * Deliberately without a single figure. No speed, no ratio, no device count
 * — the lanes fill by relative weight, which says "the upload half fills
 * faster" without asserting a number this site cannot stand behind.
 */

type Workload = {
  id: string;
  icon: LucideIcon;
  label: string;
  note: string;
  /** Relative pull on each half of the line. Illustrative, not measured. */
  down: number;
  up: number;
  /** Where this tile sits, and which joint on the panel it plugs into. */
  frame: string;
  depth: number;
  joint: JointSpec;
  panel: JointSpec;
};

const LOAD: Workload[] = [
  {
    id: "laptops",
    icon: Laptop,
    label: "Staff laptops",
    note: "Mail, CRM, the web",
    down: 9,
    up: 3,
    frame: "top-[9%] left-[3%] w-[18%]",
    depth: 0.45,
    joint: { id: "laptops", side: "r", left: "100%", top: "50%" },
    panel: { id: "line-l1", side: "l", left: "0%", top: "20%" },
  },
  {
    id: "voice",
    icon: PhoneCall,
    label: "Business voice",
    note: "Every call, all day",
    down: 3,
    up: 4,
    frame: "top-[39%] left-[3%] w-[18%]",
    depth: 0.7,
    joint: { id: "voice", side: "r", left: "100%", top: "50%" },
    panel: { id: "line-l2", side: "l", left: "0%", top: "50%" },
  },
  {
    id: "video",
    icon: Video,
    label: "Video meetings",
    note: "Up as much as down",
    down: 8,
    up: 9,
    frame: "top-[69%] left-[3%] w-[18%]",
    depth: 0.9,
    joint: { id: "video", side: "r", left: "100%", top: "50%" },
    panel: { id: "line-l3", side: "l", left: "0%", top: "80%" },
  },
  {
    id: "payments",
    icon: CreditCard,
    label: "Card payments",
    note: "Small, constant, unmissable",
    down: 2,
    up: 2,
    frame: "top-[9%] left-[79%] w-[18%]",
    depth: 0.45,
    joint: { id: "payments", side: "l", left: "0%", top: "50%" },
    panel: { id: "line-r1", side: "r", left: "100%", top: "20%" },
  },
  {
    id: "cameras",
    icon: Cctv,
    label: "Cameras",
    note: "Always sending, never asked",
    down: 1,
    up: 8,
    frame: "top-[39%] left-[79%] w-[18%]",
    depth: 0.7,
    joint: { id: "cameras", side: "l", left: "0%", top: "50%" },
    panel: { id: "line-r2", side: "r", left: "100%", top: "50%" },
  },
  {
    id: "backup",
    icon: CloudUpload,
    label: "Cloud backup",
    note: "Outbound, and it has to finish",
    down: 1,
    up: 10,
    frame: "top-[69%] left-[79%] w-[18%]",
    depth: 0.9,
    joint: { id: "backup", side: "l", left: "0%", top: "50%" },
    panel: { id: "line-r3", side: "r", left: "100%", top: "80%" },
  },
];

const DOWN_TOTAL = LOAD.reduce((sum, item) => sum + item.down, 0);
const UP_TOTAL = LOAD.reduce((sum, item) => sum + item.up, 0);

/** One workload joins per beat, then the full floor holds. */
const BEAT_S = 2;
const HOLD_S = 5;
const LOOP_S = BEAT_S * LOAD.length + HOLD_S;

/** Decorative tiles — the two things every floor has and nobody lists. */
const CORNERS: { icon: LucideIcon; frame: string; delay: string }[] = [
  { icon: Wifi, frame: "top-[5%] left-[26%] w-[5.5%]", delay: "0s" },
  { icon: Users, frame: "top-[5%] left-[68.5%] w-[5.5%]", delay: "-3s" },
];

export function PlanLoadScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the full floor, which is the state that matters.
  const inLoop = t % LOOP_S;
  const joined = still
    ? LOAD.length
    : Math.min(LOAD.length, Math.floor(inLoop / BEAT_S) + 1);
  const peak = still || inLoop >= BEAT_S * LOAD.length;

  const live = LOAD.slice(0, joined);
  /* Each half fills against its own ceiling rather than a shared one, and the
     ceilings differ: the same floor leaves headroom on the download half and
     very little on the upload half, which is the thing this page keeps
     coming back to. Relative, illustrative, and deliberately unlabelled. */
  const share = (sum: number, total: number, ceiling: number) =>
    Math.round((sum / total) * ceiling);
  const down = share(
    live.reduce((sum, item) => sum + item.down, 0),
    DOWN_TOTAL,
    70,
  );
  const up = share(
    live.reduce((sum, item) => sum + item.up, 0),
    UP_TOTAL,
    94,
  );

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={LOAD.map((item, index) => ({
        from: item.joint.id,
        to: item.panel.id,
        lit: index < joined,
      }))}
    >
      {CORNERS.map(({ icon: Icon, frame, delay }, index) => (
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
                "--float-duration": `${7 + index}s`,
              } as CSSProperties
            }
          >
            <Icon className="size-[2.4cqw]" strokeWidth={1.75} />
          </div>
        </div>
      ))}

      {/* The floor's label, floating clear of the panel. */}
      <div
        className="parallax absolute top-[15%] left-[41%] w-[18%]"
        style={{ "--depth": 0.4 } as CSSProperties}
      >
        <ScenePill
          icon={Activity}
          label="Head office · one line"
          size="md"
          active={peak}
          className="mx-auto"
        />
      </div>

      {/* The connection itself. */}
      <Layer
        className="top-[29%] left-[33%] w-[34%]"
        depth={0.55}
        order={30}
        active={peak}
        glow
        joints={LOAD.map((item) => item.panel)}
        lit
      >
        <LinePanel joined={joined} peak={peak} down={down} up={up} />
      </Layer>

      {LOAD.map((item, index) => (
        <Layer
          key={item.id}
          className={item.frame}
          depth={item.depth}
          order={20}
          active={index < joined}
          joints={[item.joint]}
          lit={index < joined}
        >
          <WorkloadTile item={item} live={index < joined} />
        </Layer>
      ))}

      {/* The payoff, held back until the floor is full. */}
      <div
        className="parallax absolute top-[79%] left-[31%] w-[38%]"
        style={{ "--depth": 0.65 } as CSSProperties}
      >
        <div
          className={cn(
            "glass-panel flex items-center gap-[0.7cqw] rounded-[1cqw] px-[1cqw] py-[0.7cqw] transition-opacity duration-700",
            peak ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Activity className="size-1/2" />
          </span>
          <span className="text-[0.92cqw] leading-tight">
            A plan is sized for this hour — not for the average of the day.
          </span>
        </div>
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

function LinePanel({
  joined,
  peak,
  down,
  up,
}: {
  joined: number;
  peak: boolean;
  down: number;
  up: number;
}) {
  return (
    <div className="glass-panel glass-tile-lit flex flex-col gap-[0.85cqw] rounded-[1.5cqw] p-[1.2cqw]">
      <div className="flex items-center gap-[0.7cqw]">
        <span className="flex size-[2.6cqw] shrink-0 items-center justify-center rounded-[0.75cqw] bg-primary text-primary-foreground shadow-md shadow-primary/40">
          <Router className="size-1/2" />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-[1.15cqw] font-semibold">One connection</span>
          <span className="text-[0.75cqw] text-muted-foreground">
            Everything on the floor shares it
          </span>
        </span>
      </div>

      <span className="h-px bg-border" />

      <Lane icon={ArrowDownToLine} label="Down" fill={down} />
      <Lane icon={ArrowUpFromLine} label="Up" fill={up} />

      {/* One mark per workload, filling as they join. */}
      <span className="flex items-center gap-[0.35cqw]">
        {LOAD.map((item, index) => (
          <span
            key={item.id}
            className={cn(
              "h-[0.4cqw] flex-1 rounded-full transition-colors duration-500",
              index < joined ? "bg-primary" : "bg-border",
            )}
          />
        ))}
      </span>

      <span className="flex h-[1.5cqw] items-center gap-[0.5cqw] text-[0.82cqw]">
        {peak ? (
          <>
            <Wave />
            <span className="font-medium text-primary">
              All of it, at the same time
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">
              {joined}
            </span>{" "}
            of {LOAD.length} on the line
          </span>
        )}
      </span>
    </div>
  );
}

/** Half of the line, drawn as a track that fills. Deliberately unnumbered. */
function Lane({
  icon: Icon,
  label,
  fill,
}: {
  icon: LucideIcon;
  label: string;
  fill: number;
}) {
  return (
    <span className="flex items-center gap-[0.6cqw]">
      <Icon className="size-[1cqw] shrink-0 text-primary" />
      <span className="w-[2.6cqw] shrink-0 text-[0.8cqw] text-muted-foreground">
        {label}
      </span>
      <span className="relative h-[0.65cqw] flex-1 overflow-hidden rounded-full bg-muted">
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-brand-from to-brand-to transition-[width] duration-700 ease-out"
          style={{ width: `${fill}%` }}
        />
      </span>
    </span>
  );
}

function WorkloadTile({ item, live }: { item: Workload; live: boolean }) {
  const { icon: Icon, label, note } = item;

  return (
    <div
      className={cn(
        "glass-tile flex flex-col gap-[0.6cqw] rounded-[1.2cqw] p-[0.9cqw] transition-shadow duration-500",
        live && "glass-tile-lit",
      )}
    >
      <span className="flex items-center gap-[0.6cqw]">
        <span
          className={cn(
            "flex size-[2.1cqw] shrink-0 items-center justify-center rounded-[0.6cqw] transition-colors duration-500",
            live
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-primary",
          )}
        >
          <Icon className="size-1/2" />
        </span>
        <span className="text-[0.95cqw] leading-tight font-semibold">
          {label}
        </span>
      </span>

      <span className="text-[0.75cqw] leading-snug text-muted-foreground">
        {note}
      </span>

      <span className="flex items-center gap-[0.4cqw] text-[0.72cqw]">
        <span
          className={cn(
            "size-[0.5cqw] rounded-full transition-colors duration-500",
            live ? "bg-primary" : "bg-muted-foreground/35",
          )}
        />
        <span
          className={cn(
            "transition-colors duration-500",
            live ? "font-medium text-primary" : "text-muted-foreground/60",
          )}
        >
          {live ? "On the line" : "Waiting"}
        </span>
      </span>
    </div>
  );
}
