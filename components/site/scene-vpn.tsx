"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Globe,
  Laptop,
  Link2,
  Lock,
  MonitorSmartphone,
  ShieldCheck,
  UserMinus,
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
import { vpnShapes } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * The two shapes a VPN comes in, and the thing neither of them is.
 *
 * The page's two cards describe site-to-site and remote access well enough,
 * but they sit side by side as equals and a reader often leaves thinking
 * they are alternatives. They are not — they solve different problems, and
 * most estates end up with both. So the scene puts one office in the middle
 * and runs each shape into it in turn: the other building, always on; then a
 * person, on demand.
 *
 * The third beat is the limit the page is careful to state and the scene
 * would otherwise imply away: a tunnel decides who gets in, not what they
 * can reach once inside. Revoking access is the same picture in reverse, and
 * it is the half that actually goes wrong.
 *
 * The public address is RFC 5737 documentation space. It routes nowhere.
 */

const ADDRESS = "203.0.113.42";

type Beat = {
  id: string;
  pill: string;
  icon: LucideIcon;
  /** Which of the two shapes is running. */
  shape: 0 | 1;
  /** Whether the tunnel is up at all. */
  up: boolean;
  headline: string;
  note: string;
};

const BEATS: Beat[] = [
  {
    id: "site",
    pill: "Site to site",
    icon: Link2,
    shape: 0,
    up: true,
    headline: "Always on, between fixed locations",
    note: "Configured once on equipment at each end, usually against a fixed public address. Staff notice nothing — the other office is simply reachable.",
  },
  {
    id: "remote",
    pill: "Remote access",
    icon: MonitorSmartphone,
    shape: 1,
    up: true,
    headline: "Per person, connected on demand",
    note: "Scoped to what that person needs, and depending on the office address staying where it was when the client was configured.",
  },
  {
    id: "revoke",
    pill: "Somebody leaves",
    icon: UserMinus,
    shape: 1,
    up: false,
    headline: "Removed centrally, not eventually",
    note: "The value is in revoking access as reliably as granting it. That is a process rather than a product, which is why it is worth managing.",
  },
  {
    id: "limit",
    pill: "What it is not",
    icon: ShieldCheck,
    shape: 0,
    up: true,
    headline: "A VPN decides who gets in",
    note: "What they can reach once inside is a firewall and segmentation question — and it is the one more often left unanswered.",
  },
];

const OFFICE: JointSpec[] = [
  { id: "vpn-office-l", side: "l", left: "0%", top: "50%" },
  { id: "vpn-office-r", side: "r", left: "100%", top: "50%" },
];
const BRANCH: JointSpec[] = [
  { id: "vpn-branch", side: "r", left: "100%", top: "50%" },
];
const PERSON: JointSpec[] = [
  { id: "vpn-person", side: "l", left: "0%", top: "50%" },
];

const BEAT_S = 3;
const LOOP_S = BEAT_S * BEATS.length;

export function VpnTunnelScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the site-to-site tunnel, the simpler shape.
  const index = still ? 0 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = BEATS[index];
  const siteUp = now.shape === 0;
  const personUp = now.shape === 1 && now.up;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/880]"
      wires={[
        { from: BRANCH[0].id, to: OFFICE[0].id, lit: siteUp },
        { from: PERSON[0].id, to: OFFICE[1].id, lit: personUp },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Lock, frame: "top-[10%] left-[3%] w-[5.5%]" },
          { icon: Globe, frame: "top-[10%] left-[92%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* The other building. */}
      <Layer
        className="top-[28%] left-[2%] w-[26%]"
        depth={0.8}
        order={30}
        active={siteUp}
        joints={BRANCH}
        lit={siteUp}
      >
        <ScenePanel
          icon={Building2}
          title="The other office"
          subtitle={vpnShapes[0].solves}
          lit={siteUp}
          tone={siteUp ? "brand" : "muted"}
          aside={
            <SceneChip
              icon={siteUp ? Lock : undefined}
              label={siteUp ? "Tunnel up" : "Idle"}
              tone={siteUp ? "on" : "off"}
            />
          }
        >
          <Tunnel on={siteUp} caption="Always on" />
        </ScenePanel>
      </Layer>

      {/* The office everything is trying to reach. */}
      <Layer
        className="top-[24%] left-[34%] w-[32%]"
        depth={0.45}
        order={20}
        active
        glow
        joints={OFFICE}
        lit
      >
        <ScenePanel
          icon={Globe}
          title="Your office"
          subtitle="One fixed address, two ways in"
          aside={<SceneChip label={ADDRESS} mono tone="on" />}
        >
          <span className="flex flex-col gap-[0.4cqw]">
            {vpnShapes.map((shape, step) => {
              const on = step === now.shape;
              const Icon = shape.icon;

              return (
                <span
                  key={shape.title}
                  className={cn(
                    "flex items-center gap-[0.55cqw] rounded-[0.7cqw] px-[0.65cqw] py-[0.45cqw] transition-all duration-500",
                    on ? "bg-accent" : "bg-card/60 opacity-50",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[1.7cqw] shrink-0 items-center justify-center rounded-[0.5cqw] transition-colors duration-500",
                      on
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="size-1/2" />
                  </span>
                  <span className="text-[0.82cqw] font-medium">
                    {shape.title}
                  </span>
                  {on ? (
                    <span className="ml-auto">
                      <SceneChip
                        label={now.up ? "Connected" : "Revoked"}
                        tone={now.up ? "on" : "off"}
                      />
                    </span>
                  ) : null}
                </span>
              );
            })}
          </span>

          {/* The limit, drawn as the thing behind the door. */}
          <span
            className={cn(
              "flex items-center gap-[0.5cqw] rounded-[0.7cqw] px-[0.6cqw] py-[0.45cqw] transition-colors duration-500",
              now.id === "limit"
                ? "bg-primary text-primary-foreground"
                : "bg-card/70 text-muted-foreground",
            )}
          >
            <ShieldCheck className="size-[0.9cqw] shrink-0" />
            <span className="text-[0.74cqw] font-medium">
              Firewall and segmentation decide what is reachable inside
            </span>
          </span>
        </ScenePanel>
      </Layer>

      {/* The person. */}
      <Layer
        className="top-[28%] left-[72%] w-[26%]"
        depth={0.8}
        order={30}
        active={personUp}
        joints={PERSON}
        lit={personUp}
      >
        <ScenePanel
          icon={now.id === "revoke" ? UserMinus : Laptop}
          title={now.id === "revoke" ? "Access removed" : "Somebody away"}
          subtitle={vpnShapes[1].solves}
          lit={personUp}
          tone={personUp ? "brand" : "muted"}
          aside={
            <SceneChip
              label={
                now.id === "revoke"
                  ? "Revoked"
                  : personUp
                    ? "Connected"
                    : "Not now"
              }
              tone={personUp ? "on" : "off"}
            />
          }
        >
          <Tunnel
            on={personUp}
            caption={now.id === "revoke" ? "Closed centrally" : "On demand"}
          />
        </ScenePanel>
      </Layer>

      {/* The beat, said plainly. */}
      <div
        className="parallax absolute top-[70%] left-[12%] w-[76%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-start gap-[0.75cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.85cqw]">
          <span className="mt-[0.15cqw] flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <now.icon className="size-1/2" />
          </span>
          <span className="flex min-w-0 flex-col gap-[0.15cqw]">
            <span className="text-[0.88cqw] font-semibold">{now.headline}</span>
            <span className="text-[0.82cqw] leading-snug text-pretty text-muted-foreground">
              {now.note}
            </span>
          </span>
        </div>
      </div>

      {/* Which shape is running. */}
      <div
        className="parallax absolute top-[6%] left-[35%] w-[30%]"
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
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

/** A tunnel: a sleeve with something travelling inside it, or not. */
function Tunnel({ on, caption }: { on: boolean; caption: string }) {
  return (
    <span className="flex flex-col gap-[0.3cqw]">
      <span
        className={cn(
          "relative flex h-[1.4cqw] items-center overflow-hidden rounded-full border transition-colors duration-700",
          on
            ? "border-primary/40 bg-linear-to-r from-brand-from/25 to-brand-to/25"
            : "border-dashed border-muted-foreground/30 bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute inset-y-[0.3cqw] left-[4%] flex items-center gap-[0.25cqw] transition-opacity duration-700",
            on ? "opacity-100" : "opacity-0",
          )}
        >
          {[0, 1, 2, 3, 4, 5].map((step) => (
            <span
              key={step}
              className="h-full w-[1.1cqw] rounded-full bg-primary/70"
            />
          ))}
        </span>
        <Lock
          className={cn(
            "absolute right-[0.4cqw] size-[0.8cqw] transition-colors duration-500",
            on ? "text-primary" : "text-muted-foreground/50",
          )}
        />
      </span>
      <span className="text-[0.68cqw] text-muted-foreground">{caption}</span>
    </span>
  );
}
