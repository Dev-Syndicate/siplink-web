"use client";

import type { CSSProperties } from "react";
import {
  Activity,
  Ban,
  Check,
  Cloud,
  Globe,
  Key,
  Server,
  ShieldCheck,
  Split,
  Wifi,
  type LucideIcon,
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
import { firewallLayers } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * Four layers, and the traffic each one is actually for.
 *
 * The section above lists the layers. A list makes them sound sequential —
 * as though a packet passes through all four — which is not what they are:
 * the perimeter decides what gets in from outside, segmentation decides what
 * your own network can see, remote access decides who may come in on
 * purpose, and the fourth is about being able to explain any of it later.
 *
 * So the scene gives each layer a different arrival to judge, and shows the
 * verdict. Two of the six are refused, which is the part a diagram of
 * concentric rings can never say.
 *
 * Nothing here is a product claim. The refusals are the default-deny posture
 * the copy already describes, and no rule, port or vendor is named.
 */

type Arrival = {
  id: string;
  icon: LucideIcon;
  from: string;
  what: string;
  /** Which of the four layers is the one that decides. */
  layer: number;
  allowed: boolean;
  verdict: string;
};

const ARRIVALS: Arrival[] = [
  {
    id: "web",
    icon: Globe,
    from: "The internet",
    what: "An unsolicited connection",
    layer: 0,
    allowed: false,
    verdict: "Refused by default, rather than permitted by oversight.",
  },
  {
    id: "reply",
    icon: Cloud,
    from: "A cloud application",
    what: "A reply your office asked for",
    layer: 0,
    allowed: true,
    verdict: "Something inside started this, so the answer is expected.",
  },
  {
    id: "guest",
    icon: Wifi,
    from: "The guest network",
    what: "A request for the file server",
    layer: 1,
    allowed: false,
    verdict:
      "Guests reaching a file server is rarely a decision anyone made. Here it is one.",
  },
  {
    id: "vpn",
    icon: Key,
    from: "A known address",
    what: "A remote worker signing in",
    layer: 2,
    allowed: true,
    verdict: "Expected, from where it was expected from, to what it may reach.",
  },
];

const LAYER_ICONS: LucideIcon[] = [ShieldCheck, Split, Key, Activity];

const OUTSIDE: JointSpec[] = [
  { id: "fw-outside", side: "r", left: "100%", top: "50%" },
];
const WALL: JointSpec[] = [
  { id: "fw-wall-in", side: "l", left: "0%", top: "50%" },
  { id: "fw-wall-out", side: "r", left: "100%", top: "50%" },
];
const INSIDE: JointSpec[] = [
  { id: "fw-inside", side: "l", left: "0%", top: "50%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * ARRIVALS.length;

export function FirewallLayersScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the guest refusal, which is the sharpest one.
  const index = still ? 2 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = ARRIVALS[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/780]"
      wires={[
        { from: OUTSIDE[0].id, to: WALL[0].id, lit: true },
        { from: WALL[1].id, to: INSIDE[0].id, lit: now.allowed },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Globe, frame: "top-[10%] left-[3%] w-[5.5%]" },
          { icon: Server, frame: "top-[10%] left-[92%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* What is asking. */}
      <Layer
        className="top-[30%] left-[2%] w-[24%]"
        depth={0.8}
        order={30}
        active
        joints={OUTSIDE}
        lit
      >
        <ScenePanel
          icon={now.icon}
          title={now.from}
          subtitle="Asking for something"
          aside={<SceneChip label="Inbound" />}
        >
          <span className="rounded-[0.8cqw] bg-accent px-[0.7cqw] py-[0.55cqw] text-[0.82cqw] font-medium text-accent-foreground">
            {now.what}
          </span>
        </ScenePanel>
      </Layer>

      {/* The four layers, with the deciding one lit. */}
      <Layer
        className="top-[16%] left-[31%] w-[38%]"
        depth={0.45}
        order={30}
        active
        glow
        joints={WALL}
        lit
      >
        <ScenePanel
          icon={ShieldCheck}
          title="Managed router and firewall"
          subtitle="Four layers, each deciding a different question"
          aside={
            <SceneChip
              icon={now.allowed ? Check : Ban}
              label={now.allowed ? "Allowed" : "Refused"}
              tone={now.allowed ? "on" : "off"}
            />
          }
        >
          <span className="flex flex-col gap-[0.4cqw]">
            {firewallLayers.map((entry, step) => {
              const deciding = step === now.layer;
              const Icon = LAYER_ICONS[step];

              return (
                <span
                  key={entry.layer}
                  className={cn(
                    "flex items-center gap-[0.55cqw] rounded-[0.7cqw] px-[0.65cqw] py-[0.45cqw] transition-all duration-500",
                    deciding ? "bg-accent" : "bg-card/60 opacity-55",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[1.7cqw] shrink-0 items-center justify-center rounded-[0.5cqw] transition-colors duration-500",
                      deciding
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="size-1/2" />
                  </span>
                  <span className="font-mono text-[0.68cqw] text-muted-foreground">
                    {entry.layer}
                  </span>
                  <span className="text-[0.82cqw] font-medium">
                    {entry.title}
                  </span>
                  {deciding ? (
                    <span className="ml-auto">
                      <SceneChip
                        icon={now.allowed ? Check : Ban}
                        label={now.allowed ? "Pass" : "Stop"}
                        tone={now.allowed ? "on" : "off"}
                      />
                    </span>
                  ) : null}
                </span>
              );
            })}
          </span>
        </ScenePanel>
      </Layer>

      {/* What is behind it. */}
      <Layer
        className="top-[30%] left-[74%] w-[24%]"
        depth={0.8}
        order={30}
        active={now.allowed}
        joints={INSIDE}
        lit={now.allowed}
      >
        <ScenePanel
          icon={Server}
          title="Your network"
          subtitle="Everything the rules are protecting"
          lit={now.allowed}
          tone={now.allowed ? "brand" : "muted"}
          aside={
            <SceneChip
              label={now.allowed ? "Reached" : "Untouched"}
              tone={now.allowed ? "on" : "off"}
            />
          }
        >
          <span
            className={cn(
              "flex items-center gap-[0.5cqw] rounded-[0.8cqw] px-[0.7cqw] py-[0.55cqw] text-[0.8cqw] font-medium transition-colors duration-500",
              now.allowed
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {now.allowed ? (
              <Check className="size-[0.9cqw]" />
            ) : (
              <Ban className="size-[0.9cqw]" />
            )}
            {now.allowed ? "Connection completed" : "Nothing got through"}
          </span>
        </ScenePanel>
      </Layer>

      {/* Why, in one line. */}
      <div
        className="parallax absolute top-[80%] left-[14%] w-[72%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.75cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.8cqw]">
          <span
            className={cn(
              "flex size-[2cqw] shrink-0 items-center justify-center rounded-full transition-colors duration-500",
              now.allowed
                ? "bg-primary text-primary-foreground"
                : "bg-foreground text-background",
            )}
          >
            {now.allowed ? (
              <Check className="size-1/2" />
            ) : (
              <Ban className="size-1/2" />
            )}
          </span>
          <span className="text-[0.88cqw] leading-snug text-pretty">
            {now.verdict}
          </span>
        </div>
      </div>

      {/* Which layer is doing the deciding. */}
      <div
        className="parallax absolute top-[6%] left-[33%] w-[34%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={LAYER_ICONS[now.layer]}
          label={firewallLayers[now.layer].title}
          size="md"
          active
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
