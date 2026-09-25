"use client";

import {
  Building2,
  Globe,
  Laptop,
  Lock,
  Phone,
  PhoneCall,
  PhoneOutgoing,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Scene,
  Wave,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * SIP trunking, as the phone system you already have calling out over
 * SipLink.
 *
 * The PBX stays put, with its desk phones, IP phones and softphones. Each
 * beat one of them places a call — local, then mobile, then international —
 * and it leaves the PBX over the SIP trunk, which counts the calls it is
 * carrying and has room for more. Nothing about the phones changes; what
 * changes is the line out of the building.
 *
 * Replaces the flow illustration that stood here. Drawn for the product
 * hero's column. Stage, parallax and wiring come from scene-kit.
 */

type Call = {
  device: string;
  icon: LucideIcon;
  ext: string;
  dest: string;
  destIcon: LucideIcon;
  number: string;
};

const CALLS: Call[] = [
  {
    device: "Desk phone",
    icon: PhoneCall,
    ext: "201",
    dest: "Local",
    destIcon: Building2,
    number: "+1 (212) 555-0199",
  },
  {
    device: "IP phone",
    icon: Phone,
    ext: "214",
    dest: "Mobile",
    destIcon: Smartphone,
    number: "+1 (917) 555-0142",
  },
  {
    device: "Softphone",
    icon: Laptop,
    ext: "305",
    dest: "International",
    destIcon: Globe,
    number: "+44 20 7946 0321",
  },
];

/** Per call: 0 dialling, 1–2 connected. */
const CALL_S = 3;
/** Calls the trunk is already carrying before the scene's own. */
const BASE_CALLS = 6;

const DEST_TOP = ["top-[3%]", "top-[36%]", "top-[69%]"];

export function SipTrunkScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the international call, connected.
  const s = still ? CALL_S * 2 + 1 : t % (CALL_S * CALLS.length);
  const index = Math.floor(s / CALL_S);
  const dialling = s % CALL_S === 0;
  const inProgress = BASE_CALLS + index + (dialling ? 0 : 1);

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[600/460]"
      wires={[
        { from: "pbx", to: "trunk-in", lit: true },
        ...CALLS.map((item, i) => ({
          from: `trunk-${i}`,
          to: `dest-${i}`,
          lit: i === index,
        })),
      ]}
    >
      {/* The phone system you already run */}
      <Layer
        className="top-[12%] left-[0%] w-[32%]"
        depth={0.8}
        order={30}
        joints={[{ id: "pbx", side: "r", left: "100%", top: "50%" }]}
        lit
      >
        <div className="flex flex-col gap-[1.56cqw] rounded-[3.38cqw] border border-border bg-card p-[2.34cqw] shadow-lg shadow-primary/10">
          <span className="flex items-center gap-[1.3cqw]">
            <span className="flex size-[5.72cqw] items-center justify-center rounded-[1.56cqw] bg-primary text-primary-foreground">
              <Server className="size-1/2" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[2.86cqw] font-semibold">Your PBX</span>
              <span className="text-[2.08cqw] text-muted-foreground">
                Stays where it is
              </span>
            </span>
          </span>
          {CALLS.map((item, i) => {
            const on = i === index;
            const Icon = item.icon;
            return (
              <span
                key={item.device}
                className={cn(
                  "flex h-[5.98cqw] items-center gap-[1.17cqw] rounded-[1.56cqw] px-[1.3cqw] text-[2.21cqw] ring-1 transition-colors duration-500",
                  on ? "bg-accent font-medium ring-primary/30" : "ring-border",
                )}
              >
                <Icon
                  className={cn(
                    "size-[2.6cqw]",
                    on ? "text-primary" : "text-muted-foreground",
                  )}
                />
                {item.device}
                <span className="ml-auto text-[1.95cqw] text-muted-foreground tabular-nums">
                  {item.ext}
                </span>
              </span>
            );
          })}
        </div>
      </Layer>

      {/* The trunk */}
      <Layer
        className="top-[19%] left-[35.5%] w-[29%]"
        depth={0.45}
        order={20}
        joints={[
          { id: "trunk-in", side: "l", left: "0%", top: "50%" },
          ...CALLS.map((_, i): JointSpec => ({
            id: `trunk-${i}`,
            side: "r",
            left: "100%",
            top: `${28 + i * 22}%`,
          })),
        ]}
        lit
      >
        <div className="glass-tile-lit flex flex-col gap-[1.56cqw] rounded-[3.38cqw] border border-border bg-card p-[2.34cqw]">
          <span className="flex items-center gap-[1.3cqw]">
            <span className="flex size-[5.72cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
              <PhoneOutgoing className="size-1/2" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[2.86cqw] font-semibold">SIP trunk</span>
              <span className="text-[2.08cqw] text-primary">SipLink</span>
            </span>
          </span>
          <span className="flex flex-col gap-[0.78cqw]">
            <span className="flex items-baseline justify-between">
              <span className="text-[2.08cqw] text-muted-foreground">
                Calls in progress
              </span>
              <span className="text-[3.38cqw] font-semibold tabular-nums">
                {inProgress}
              </span>
            </span>
            {/* Headroom, not a ceiling: the bar never fills. */}
            <span className="h-[1.3cqw] overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-primary transition-[width] duration-700"
                style={{ width: `${(inProgress / 20) * 100}%` }}
              />
            </span>
            <span className="text-[1.95cqw] text-muted-foreground">
              Room to add more
            </span>
          </span>
          <span className="flex w-fit items-center gap-[0.65cqw] rounded-full bg-accent px-[1.3cqw] py-[0.39cqw] text-[1.95cqw] font-medium text-accent-foreground">
            <Lock className="size-[2.08cqw]" />
            Encrypted
          </span>
        </div>
      </Layer>

      {/* Where the calls go */}
      {CALLS.map((item, i) => {
        const on = i === index;
        const Icon = item.destIcon;
        return (
          <Layer
            key={item.dest}
            className={cn("left-[69%] w-[31%]", DEST_TOP[i])}
            depth={0.85}
            order={30}
            active={on && !dialling}
            joints={[{ id: `dest-${i}`, side: "l", left: "0%", top: "50%" }]}
            lit={on}
          >
            <div
              className={cn(
                "flex flex-col gap-[0.78cqw] rounded-[2.86cqw] border bg-card p-[1.95cqw] shadow-lg transition-[border-color] duration-500",
                on
                  ? "border-primary/40 shadow-primary/20"
                  : "border-border shadow-primary/10",
              )}
            >
              <span className="flex items-center gap-[1.17cqw]">
                <span
                  className={cn(
                    "flex size-[4.68cqw] items-center justify-center rounded-full transition-colors duration-500",
                    on
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-primary",
                  )}
                >
                  <Icon className="size-1/2" />
                </span>
                <span className="text-[2.6cqw] font-semibold">{item.dest}</span>
              </span>
              <span
                className={cn(
                  "flex h-[3.12cqw] items-center gap-[0.78cqw] text-[2.02cqw] whitespace-nowrap tabular-nums",
                  on ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {on && !dialling ? <Wave /> : null}
                {on ? (dialling ? "Dialling…" : item.number) : "Ready"}
              </span>
            </div>
          </Layer>
        );
      })}
    </Scene>
  );
}
