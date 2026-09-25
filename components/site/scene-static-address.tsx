"use client";

import type { CSSProperties } from "react";
import {
  ArrowLeftRight,
  Building2,
  Cloud,
  Globe,
  Laptop,
  Pin,
  Printer,
  RefreshCw,
  Router,
  Smartphone,
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
import { cn } from "@/lib/utils";

/**
 * Which address is which, and what each one is attached to.
 *
 * The section above already walks through the forty-one days in which a
 * dynamic address quietly breaks a rule, so this scene deliberately does not
 * retell that. It answers the confusion underneath it instead: almost
 * everyone has seen a 192.168 address on their own laptop, and almost nobody
 * has been told that it is not the address anyone outside can reach — which
 * is why "I already have an IP address" is such a common reply.
 *
 * So the stage is split at the router. Private addresses on the left, one
 * public address on the right, and the translation drawn as the thing that
 * happens in between. The last two beats answer the question that always
 * follows: what is the address actually attached to? Replacing the router
 * keeps it; changing provider does not.
 *
 * Every address is RFC 1918 private space or RFC 5737 documentation space.
 * None of them routes anywhere and none can belong to a real customer.
 */

const PUBLIC = "198.51.100.7";
const REISSUED = "203.0.113.88";

const INSIDE: { icon: LucideIcon; label: string; address: string }[] = [
  { icon: Laptop, label: "A laptop", address: "192.168.1.24" },
  { icon: Smartphone, label: "A handset", address: "192.168.1.31" },
  { icon: Printer, label: "The printer", address: "192.168.1.40" },
];

type Beat = {
  id: string;
  pill: string;
  icon: LucideIcon;
  /** What the outside world can see at this point. */
  address: string;
  /** Whether the router in the middle is the original one. */
  swapped: boolean;
  moved: boolean;
  note: string;
};

const BEATS: Beat[] = [
  {
    id: "private",
    pill: "Inside the building",
    icon: Building2,
    address: PUBLIC,
    swapped: false,
    moved: false,
    note: "The 192.168 address on your laptop is private. It exists only inside your building, and nothing on the internet can reach it.",
  },
  {
    id: "public",
    pill: "What the internet sees",
    icon: Globe,
    address: PUBLIC,
    swapped: false,
    moved: false,
    note: "Everything in the building leaves through one public address. That address belongs to the connection rather than to any device on it.",
  },
  {
    id: "hardware",
    pill: "Replace the router",
    icon: RefreshCw,
    address: PUBLIC,
    swapped: true,
    moved: false,
    note: "New hardware, same address. It was issued against your internet service, so the box in the cupboard is not what holds it.",
  },
  {
    id: "provider",
    pill: "Change provider",
    icon: ArrowLeftRight,
    address: REISSUED,
    swapped: true,
    moved: true,
    note: "A different service means a different address, and a round of reconfiguration everywhere the old one was written down — which is why it is worth raising early in a migration.",
  },
];

const LAN: JointSpec[] = [
  { id: "anat-lan", side: "r", left: "100%", top: "50%" },
];
const ROUTER: JointSpec[] = [
  { id: "anat-router-in", side: "l", left: "0%", top: "50%" },
  { id: "anat-router-out", side: "r", left: "100%", top: "50%" },
];
const NET: JointSpec[] = [
  { id: "anat-net", side: "l", left: "0%", top: "50%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * BEATS.length;

export function StaticAddressScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the public address — the thing being explained.
  const index = still ? 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = BEATS[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/780]"
      wires={[
        { from: LAN[0].id, to: ROUTER[0].id, lit: true },
        { from: ROUTER[1].id, to: NET[0].id, lit: true },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Building2, frame: "top-[10%] left-[3%] w-[5.5%]" },
          { icon: Globe, frame: "top-[10%] left-[92%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* Which half of the story this is. */}
      <div
        className="parallax absolute top-[4%] left-[33%] w-[34%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={now.icon}
          label={now.pill}
          size="md"
          active
          className="mx-auto"
        />
      </div>

      {/* Private space. Real addresses, none of them reachable. */}
      <Layer
        className="top-[26%] left-[2%] w-[30%]"
        depth={0.75}
        order={30}
        active={index === 0}
        joints={LAN}
        lit
      >
        <ScenePanel
          icon={Building2}
          title="Inside your building"
          subtitle="Private addresses, handed out by your router"
          lit={index === 0}
          aside={<SceneChip label="Not reachable" tone="off" />}
        >
          <span className="flex flex-col gap-[0.4cqw]">
            {INSIDE.map(({ icon: Icon, label: name, address }) => (
              <span
                key={address}
                className={cn(
                  "flex items-center gap-[0.5cqw] rounded-[0.7cqw] px-[0.6cqw] py-[0.4cqw] transition-all duration-500",
                  index === 0 ? "bg-card/80" : "bg-transparent opacity-50",
                )}
              >
                <span className="flex size-[1.6cqw] shrink-0 items-center justify-center rounded-[0.45cqw] bg-accent text-primary">
                  <Icon className="size-1/2" />
                </span>
                <span className="text-[0.78cqw] font-medium">{name}</span>
                <span className="ml-auto font-mono text-[0.76cqw] text-muted-foreground tabular-nums">
                  {address}
                </span>
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* Where one becomes the other. */}
      <Layer
        className="top-[30%] left-[36%] w-[28%]"
        depth={0.9}
        order={30}
        active
        glow
        joints={ROUTER}
        lit
      >
        <ScenePanel
          icon={Router}
          title={now.swapped ? "A new router" : "Your router"}
          subtitle="Private on one side, public on the other"
          aside={
            <SceneChip
              icon={now.swapped ? RefreshCw : undefined}
              label={now.swapped ? "Replaced" : "As installed"}
              tone={now.swapped ? "on" : "quiet"}
            />
          }
        >
          <span className="flex items-center justify-between gap-[0.4cqw] rounded-[0.8cqw] bg-accent px-[0.7cqw] py-[0.5cqw]">
            <span className="font-mono text-[0.76cqw] text-muted-foreground tabular-nums">
              192.168.1.x
            </span>
            <ArrowLeftRight className="size-[0.9cqw] shrink-0 text-primary" />
            <span className="font-mono text-[0.76cqw] font-semibold tabular-nums">
              {now.address}
            </span>
          </span>
          <span className="text-[0.7cqw] leading-snug text-muted-foreground">
            One public address can front several services behind it.
          </span>
        </ScenePanel>
      </Layer>

      {/* The one address anybody outside will ever see. */}
      <Layer
        className="top-[26%] left-[68%] w-[30%]"
        depth={0.75}
        order={30}
        active={index !== 0}
        joints={NET}
        lit
      >
        <ScenePanel
          icon={Cloud}
          title="What the internet sees"
          subtitle="One address for the whole site"
          lit={index !== 0}
          aside={
            <SceneChip
              icon={now.moved ? RefreshCw : Pin}
              label={now.moved ? "Reissued" : "Held"}
              tone={now.moved ? "off" : "on"}
            />
          }
        >
          <span
            className={cn(
              "flex items-center justify-center gap-[0.55cqw] rounded-[1cqw] px-[0.8cqw] py-[0.7cqw] transition-all duration-700",
              now.moved ? "bg-muted ring-2 ring-foreground/25" : "bg-accent",
            )}
          >
            <Globe
              className={cn(
                "size-[1.2cqw] shrink-0",
                now.moved ? "text-muted-foreground" : "text-primary",
              )}
            />
            <span className="font-mono text-[1.3cqw] font-semibold tabular-nums">
              {now.address}
            </span>
          </span>
          <span
            className={cn(
              "text-[0.72cqw] transition-colors duration-500",
              now.moved
                ? "font-medium text-foreground"
                : "text-muted-foreground",
            )}
          >
            {now.moved
              ? "A different service, so a different address."
              : "Tied to the service, not to the hardware."}
          </span>
        </ScenePanel>
      </Layer>

      {/* The beat, in the page's own terms. */}
      <div
        className="parallax absolute top-[78%] left-[10%] w-[80%]"
        style={{ "--depth": 0.5 } as CSSProperties}
      >
        <div className="glass-panel flex items-start gap-[0.75cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.85cqw]">
          <span className="mt-[0.15cqw] flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <now.icon className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            {now.note}
          </span>
        </div>
      </div>
    </Scene>
  );
}
