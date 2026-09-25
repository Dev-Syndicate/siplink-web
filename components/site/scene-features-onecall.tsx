"use client";

import type { CSSProperties } from "react";
import {
  Cable,
  Check,
  Headset,
  Network,
  PhoneCall,
  Radio,
  Router,
  Search,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Portrait,
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
  DevicePhone,
  DeviceUnit,
  PEOPLE,
} from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * "It is slow." Four boxes, and who gets to argue about which one.
 *
 * The fourth card below promises a fault is diagnosed once rather than
 * argued between suppliers. Everyone who has run an office knows the shape
 * of that argument, and nobody enjoys reading a sentence about it — so the
 * scene runs the argument. The search moves along the chain, box to box, and
 * the only thing that changes between the two halves of the picture is how
 * many phone numbers are involved.
 *
 * The fault lands on the switch, which is deliberate: it is the piece most
 * often owned by somebody who did not sell the line, and therefore the one
 * that produces the longest argument.
 *
 * No response or restoration time is stated. Who picks it up is the claim.
 */

type Suspect = {
  id: string;
  icon: LucideIcon;
  label: string;
  sub: string;
  /** Who would own this box if it were bought separately. */
  otherwise: string;
  verdict: string;
  culprit: boolean;
};

const CHAIN: Suspect[] = [
  {
    id: "wifi",
    icon: Wifi,
    label: "The Wi-Fi",
    sub: "Access points on the floor",
    otherwise: "Whoever installed it",
    verdict: "Ruled out. Signal is fine where the complaint came from.",
    culprit: false,
  },
  {
    id: "switch",
    icon: Network,
    label: "The switch",
    sub: "Ports in the cabinet",
    otherwise: "An IT supplier, probably",
    verdict: "Found it. A port renegotiated overnight and nobody was told.",
    culprit: true,
  },
  {
    id: "router",
    icon: Router,
    label: "The router",
    sub: "Where the line lands",
    otherwise: "The kit vendor",
    verdict: "Ruled out. Configuration matches the backup taken on Friday.",
    culprit: false,
  },
  {
    id: "circuit",
    icon: Cable,
    label: "The circuit",
    sub: "The line itself",
    otherwise: "The connectivity provider",
    verdict: "Ruled out. The NOC has it clean all night.",
    culprit: false,
  },
];

/* Written out rather than computed: Tailwind reads these files as text, so
   a class built from an array index is a class that never gets generated. */
const FRAMES = [
  "top-[18%] left-[5%] w-[18%]",
  "top-[18%] left-[29%] w-[18%]",
  "top-[18%] left-[53%] w-[18%]",
  "top-[18%] left-[77%] w-[18%]",
];

const CHAIN_JOINTS: JointSpec[] = CHAIN.map((item) => ({
  id: `oc-${item.id}`,
  side: "b",
  left: "50%",
  top: "100%",
}));

const DESK: JointSpec[] = CHAIN.map((item, step) => ({
  id: `oc-desk-${item.id}`,
  side: "t",
  left: `${14 + step * 24}%`,
  top: "0%",
}));

const BEAT_S = 2.5;
const LOOP_S = BEAT_S * CHAIN.length;

export function FeatureOneCallScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the switch — the box that was actually at fault.
  const index = still ? 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = CHAIN[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/900]"
      wires={CHAIN.map((item, step) => ({
        from: CHAIN_JOINTS[step].id,
        to: DESK[step].id,
        lit: step === index,
      }))}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Search, frame: "top-[8%] left-[3%] w-[5%]" },
          { icon: Radio, frame: "top-[8%] left-[92%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* The four suspects, in a row. */}
      {CHAIN.map((item, step) => {
        const on = step === index;

        return (
          <Layer
            key={item.id}
            className={FRAMES[step]}
            depth={0.6 + step * 0.08}
            order={20}
            active={on}
            joints={[CHAIN_JOINTS[step]]}
            lit={on}
          >
            <DeviceUnit
              icon={item.icon}
              label={item.label}
              sub={item.sub}
              lit={on}
              stacked={item.id === "switch"}
            />
            <span
              className={cn(
                "mt-[0.35cqw] flex items-center gap-[0.3cqw] rounded-full px-[0.5cqw] py-[0.15cqw] text-[0.62cqw] transition-colors duration-500",
                on && item.culprit
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {on && item.culprit ? (
                <>
                  <Check className="size-[0.7cqw]" />
                  This one
                </>
              ) : (
                <>Bought alone: {item.otherwise}</>
              )}
            </span>
          </Layer>
        );
      })}

      {/* Who is looking, and how many calls it took. */}
      <Layer
        className="top-[54%] left-[14%] w-[44%]"
        depth={0.5}
        order={30}
        active
        glow
        joints={DESK}
        lit
      >
        <ScenePanel
          icon={Headset}
          title="One team, checking all four"
          subtitle="The fault is diagnosed once, not argued about"
          aside={<SceneChip label="One ticket" tone="on" />}
        >
          <span className="flex items-center gap-[0.6cqw] rounded-[0.8cqw] bg-accent px-[0.7cqw] py-[0.5cqw]">
            <Portrait src={PEOPLE.tj.photo} halo className="w-[2.4cqw]" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[0.8cqw] font-semibold">
                {PEOPLE.tj.name}
              </span>
              <span className="text-[0.68cqw] text-muted-foreground">
                Network operations, Chennai
              </span>
            </span>
            <span className="ml-auto">
              <SceneChip icon={Search} label={`Checking ${now.label}`} />
            </span>
          </span>

          <span className="min-h-[2cqw] text-[0.8cqw] leading-snug text-pretty text-muted-foreground">
            {now.verdict}
          </span>
        </ScenePanel>
      </Layer>

      {/* What the same morning costs when the four are bought separately. */}
      <Layer
        className="top-[54%] left-[62%] w-[26%]"
        depth={0.8}
        order={30}
        joints={[]}
        lit={false}
      >
        <ScenePanel
          icon={PhoneCall}
          title="The other way round"
          subtitle="Four boxes, four suppliers"
          tone="muted"
          lit={false}
          aside={<SceneChip label="Four calls" tone="off" />}
        >
          <span className="flex flex-col gap-[0.3cqw]">
            {CHAIN.map((item) => (
              <span
                key={item.id}
                className="flex items-center gap-[0.4cqw] rounded-[0.6cqw] bg-card/60 px-[0.55cqw] py-[0.35cqw]"
              >
                <PhoneCall className="size-[0.75cqw] shrink-0 text-muted-foreground" />
                <span className="text-[0.68cqw] text-muted-foreground">
                  {item.otherwise}
                </span>
              </span>
            ))}
          </span>
          <span className="text-[0.7cqw] leading-snug text-muted-foreground">
            Each one able to say, correctly, that their part is working.
          </span>
        </ScenePanel>
      </Layer>

      {/* Where the complaint came from in the first place. */}
      <Layer
        className="top-[58%] left-[90%] w-[9%]"
        depth={0.95}
        order={30}
        active
        joints={[]}
        lit
      >
        <DevicePhone>
          <div className="flex flex-1 flex-col items-center justify-center gap-[0.35cqw] bg-linear-to-b from-accent/60 to-card px-[0.4cqw] text-center">
            <Portrait src={PEOPLE.ida.photo} className="w-[2.6cqw]" />
            <span className="text-[0.6cqw] leading-tight font-semibold">
              &ldquo;It is slow&rdquo;
            </span>
            <span className="text-[0.55cqw] leading-snug text-muted-foreground">
              09:40
            </span>
          </div>
        </DevicePhone>
      </Layer>

      <div
        className="parallax absolute top-[4%] left-[32%] w-[36%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={Headset}
          label="One number, whichever box it is"
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
