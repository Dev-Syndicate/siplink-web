"use client";

import type { CSSProperties } from "react";
import {
  Check,
  ClipboardCheck,
  Globe,
  Pin,
  Router,
  Settings2,
  ShieldCheck,
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
import { staticIpReadiness } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * The request filling itself in, then the address arriving.
 *
 * This page's job is to stop a request bouncing back and forth, and the five
 * things it asks for are not obvious — people expect to ask for an address
 * and be given one. Watching the form complete itself, one answer at a time,
 * makes the shape of the ask visible before anyone has to read the list
 * underneath it.
 *
 * The five are staticIpReadiness, in its order, so the picture cannot drift
 * from the section beside it. The sixth beat is the outcome, and it says the
 * two things the page's FAQ says: usually a configuration change rather than
 * a new installation, and any unavoidable window agreed beforehand.
 *
 * The issued address is RFC 5737 documentation space and routes nowhere.
 */

const ISSUED = "192.0.2.16";

/** A short label for each readiness item, for the form rows. */
const FIELD_ICONS: LucideIcon[] = [
  ShieldCheck,
  Settings2,
  Router,
  Globe,
  ClipboardCheck,
];

/** What the row shows once it has been answered. Illustrative. */
const ANSWERS = [
  "Site-to-site VPN",
  "Your IT partner",
  "Dedicated internet · Chennai",
  "Two DNS records, one allowlist",
  "Before the next cutover",
];

const FORM: JointSpec[] = [
  { id: "prov-form", side: "r", left: "100%", top: "50%" },
];
const ISSUE: JointSpec[] = [
  { id: "prov-issue-in", side: "l", left: "0%", top: "50%" },
  { id: "prov-issue-out", side: "b", left: "50%", top: "100%" },
];
const ROUTER_IN: JointSpec[] = [
  { id: "prov-router", side: "t", left: "50%", top: "0%" },
];

const BEAT_S = 2;
const HOLD_S = 5;
const LOOP_S = BEAT_S * staticIpReadiness.length + HOLD_S;

export function StaticProvisionScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  const inLoop = t % LOOP_S;
  const answered = still
    ? staticIpReadiness.length
    : Math.min(staticIpReadiness.length, Math.floor(inLoop / BEAT_S) + 1);
  const complete = answered === staticIpReadiness.length;
  const issued = still || inLoop >= BEAT_S * staticIpReadiness.length;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={[
        { from: FORM[0].id, to: ISSUE[0].id, lit: complete },
        { from: ISSUE[1].id, to: ROUTER_IN[0].id, lit: issued },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: ClipboardCheck, frame: "top-[8%] left-[3%] w-[5.5%]" },
          { icon: Pin, frame: "top-[10%] left-[92%] w-[5.5%]", delay: "-3s" },
        ]}
      />

      {/* The request, answering itself. */}
      <Layer
        className="top-[10%] left-[8%] w-[40%]"
        depth={0.7}
        order={30}
        active
        joints={FORM}
        lit
      >
        <ScenePanel
          icon={ClipboardCheck}
          title="What we need from you"
          subtitle="Five answers, so nothing bounces back"
          aside={
            <SceneChip
              label={`${answered} of ${staticIpReadiness.length}`}
              tone={complete ? "on" : "quiet"}
            />
          }
        >
          <span className="flex flex-col gap-[0.4cqw]">
            {staticIpReadiness.map((item, step) => {
              const done = step < answered;
              const Icon = FIELD_ICONS[step];

              return (
                <span
                  key={item.title}
                  className={cn(
                    "flex items-center gap-[0.55cqw] rounded-[0.7cqw] px-[0.65cqw] py-[0.45cqw] transition-all duration-500",
                    done ? "bg-card/80" : "bg-transparent opacity-40",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[1.6cqw] shrink-0 items-center justify-center rounded-[0.45cqw] transition-colors duration-500",
                      done
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {done ? (
                      <Check className="size-1/2" />
                    ) : (
                      <Icon className="size-1/2" />
                    )}
                  </span>

                  <span className="text-[0.8cqw] font-medium">
                    {item.title}
                  </span>

                  <span
                    className={cn(
                      "ml-auto truncate pl-[0.5cqw] text-[0.72cqw] transition-colors duration-500",
                      done ? "text-primary" : "text-muted-foreground/60",
                    )}
                  >
                    {done ? ANSWERS[step] : "—"}
                  </span>
                </span>
              );
            })}
          </span>
        </ScenePanel>
      </Layer>

      {/* What comes back. */}
      <Layer
        className="top-[22%] left-[56%] w-[34%]"
        depth={0.85}
        order={30}
        active={issued}
        glow={issued}
        joints={ISSUE}
        lit={issued}
      >
        <ScenePanel
          icon={Pin}
          title={issued ? "Address issued" : "Waiting on the answers"}
          subtitle={
            issued
              ? "Held against your service, not your hardware"
              : "Eligibility is confirmed per service"
          }
          lit={issued}
          tone={issued ? "brand" : "muted"}
          aside={
            <SceneChip
              label={issued ? "Assigned" : "Pending"}
              tone={issued ? "on" : "off"}
            />
          }
        >
          <span
            className={cn(
              "flex items-center justify-center gap-[0.6cqw] rounded-[1cqw] px-[0.9cqw] py-[0.7cqw] transition-all duration-700",
              issued ? "bg-accent" : "bg-muted",
            )}
          >
            <Globe
              className={cn(
                "size-[1.2cqw] shrink-0 transition-colors duration-500",
                issued ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span
              className={cn(
                "font-mono text-[1.4cqw] font-semibold tabular-nums transition-colors duration-500",
                issued ? "text-foreground" : "text-muted-foreground/50",
              )}
            >
              {issued ? ISSUED : "···.···.···.··"}
            </span>
          </span>
        </ScenePanel>
      </Layer>

      {/* Where it actually gets typed in. */}
      <Layer
        className="top-[62%] left-[58%] w-[30%]"
        depth={0.6}
        order={20}
        active={issued}
        joints={ROUTER_IN}
        lit={issued}
      >
        <ScenePanel
          icon={Router}
          title="Your router and firewall"
          subtitle="Where the address is configured"
          lit={issued}
          tone={issued ? "brand" : "muted"}
        >
          <span className="text-[0.76cqw] leading-snug text-pretty text-muted-foreground">
            Normally a configuration change rather than a new installation, so
            an existing service usually keeps running while it is arranged.
          </span>
        </ScenePanel>
      </Layer>

      {/* The stage of the request, in a word. */}
      <div
        className="parallax absolute top-[4%] left-[34%] w-[32%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={issued ? Pin : ClipboardCheck}
          label={issued ? "Assigned to your service" : "Gathering the answers"}
          size="md"
          active={issued}
          className="mx-auto"
        />
      </div>

      {/* The one promise the page actually makes about timing. */}
      <div
        className="parallax absolute top-[80%] left-[6%] w-[44%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.7cqw] rounded-[1.1cqw] px-[1cqw] py-[0.75cqw]">
          <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            Where a brief interruption is unavoidable, the window is agreed
            with you beforehand.
          </span>
        </div>
      </div>
    </Scene>
  );
}
