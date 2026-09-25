"use client";

import Image from "next/image";
import {
  BarChart3,
  Bell,
  Check,
  Home,
  Link2,
  LoaderCircle,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Users,
  Video,
} from "lucide-react";

import {
  AppNav,
  Layer,
  Portrait,
  Scene,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { integrationLogos } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Business app integrations, as a directory connecting the tools a team
 * already runs.
 *
 * Replaces the static render of the same composition. The still image showed
 * the directory with every app waiting to be connected; the scene connects
 * them — one at a time an app goes from Connect to Connecting to Connected,
 * and its wire into SipLink lights, until the team's whole stack is joined
 * up.
 *
 * The marks are the site's own trimmed logos (lib/site.ts), so they match
 * the integrations wall elsewhere. Stage, parallax and wiring come from
 * scene-kit.
 */

type AppName =
  | "Google Workspace"
  | "Salesforce"
  | "HubSpot"
  | "Odoo"
  | "Zendesk"
  | "Zoho"
  | "Microsoft 365"
  | "WhatsApp";

const BLURB: Record<AppName, string> = {
  "Google Workspace": "Sync contacts, calendar and meetings.",
  Salesforce: "Log calls and sync contacts.",
  HubSpot: "Track every call against the deal.",
  Odoo: "Keep business data in sync.",
  Zendesk: "Bring support calls into tickets.",
  Zoho: "Keep customer data in sync.",
  "Microsoft 365": "Work from your Microsoft tools.",
  WhatsApp: "Message customers from SipLink.",
};

const LEFT: AppName[] = ["Google Workspace", "Salesforce", "HubSpot", "Odoo"];
const RIGHT: AppName[] = ["Zendesk", "Zoho", "Microsoft 365", "WhatsApp"];

/** Connected before the loop starts, then the order the rest join in. */
const ALREADY: AppName[] = ["Google Workspace"];
const ORDER: AppName[] = ["Salesforce", "Zendesk", "HubSpot", "WhatsApp"];
const STEP_S = 3;
/** Each loop plays the connections, then holds the finished stack. */
const LOOP_S = STEP_S * ORDER.length + 3;

const logo = (name: AppName) =>
  integrationLogos.find((mark) => mark.name === name)!;

type State = "idle" | "connecting" | "connected";

export function IntegrationsScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the finished stack.
  const s = still ? LOOP_S - 1 : t % LOOP_S;

  const state = (name: AppName): State => {
    if (ALREADY.includes(name)) return "connected";
    const i = ORDER.indexOf(name);
    if (i < 0) return "idle";
    const at = i * STEP_S;
    if (s < at) return "idle";
    return s === at ? "connecting" : "connected";
  };

  const current = ORDER.find((name) => state(name) === "connecting");

  const wires = [...LEFT, ...RIGHT].map((name) => ({
    from: `app-${name}`,
    to: LEFT.includes(name) ? "hub-left" : "hub-right",
    lit: state(name) !== "idle",
  }));

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/680]"
      wires={wires}
    >
      {LEFT.map((name, i) => (
        <Plate key={name} name={name} side="l" row={i} state={state(name)} />
      ))}
      {RIGHT.map((name, i) => (
        <Plate key={name} name={name} side="r" row={i} state={state(name)} />
      ))}

      <Layer
        className="top-[8%] left-[20.5%] w-[59%]"
        depth={0.35}
        order={10}
        joints={[
          { id: "hub-left", side: "l", left: "0%", top: "50%" },
          { id: "hub-right", side: "r", left: "100%", top: "50%" },
        ]}
        lit
      >
        <div className="flex overflow-hidden rounded-[1.6cqw] border border-border bg-card shadow-2xl shadow-primary/15">
          <AppNav
            className="w-[21%]"
            active="Integrations"
            items={[
              { icon: Home, label: "Home" },
              { icon: Phone, label: "Calls" },
              { icon: MessageSquare, label: "Messages", badge: 3 },
              { icon: Video, label: "Meetings" },
              { icon: Users, label: "Contacts" },
              { icon: Link2, label: "Integrations" },
              { icon: BarChart3, label: "Analytics" },
              { icon: Settings, label: "Settings" },
            ]}
          />
          <div className="flex flex-1 flex-col gap-[0.8cqw] p-[1.1cqw]">
            <span className="flex items-center gap-[0.8cqw]">
              <span className="flex flex-1 items-center gap-[0.45cqw] rounded-full bg-muted px-[0.8cqw] py-[0.35cqw] text-[0.7cqw] text-muted-foreground">
                <Search className="size-[0.8cqw]" />
                Search contacts, messages or apps…
              </span>
              <Bell className="size-[0.95cqw] text-muted-foreground" />
              <Portrait
                src="/solns-unifiedComm/scene/kristine.webp"
                className="w-[1.8cqw]"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[1.4cqw] font-semibold">Integrations</span>
              <span className="text-[0.78cqw] text-muted-foreground">
                Connect SipLink with the tools your team already uses.
              </span>
            </span>
            <span className="flex gap-[1.3cqw] border-b border-border text-[0.75cqw]">
              {["All", "Productivity", "CRM", "Helpdesk", "Messaging"].map(
                (tab, i) => (
                  <span
                    key={tab}
                    className={cn(
                      "-mb-px border-b-2 pb-[0.45cqw]",
                      i === 0
                        ? "border-primary font-semibold text-primary"
                        : "border-transparent text-muted-foreground",
                    )}
                  >
                    {tab}
                  </span>
                ),
              )}
            </span>
            <div className="grid grid-cols-2 gap-[0.6cqw]">
              {[...LEFT, ...RIGHT].map((name) => (
                <Row
                  key={name}
                  name={name}
                  state={state(name)}
                  focus={name === current}
                />
              ))}
            </div>
          </div>
        </div>
      </Layer>
    </Scene>
  );
}

function Mark({ name, height }: { name: AppName; height: string }) {
  const { src, w, h } = logo(name);
  return (
    <Image
      src={src}
      alt=""
      width={w}
      height={h}
      loading="eager"
      className={cn("w-auto max-w-full object-contain", height)}
    />
  );
}

function Plate({
  name,
  side,
  row,
  state,
}: {
  name: AppName;
  side: "l" | "r";
  row: number;
  state: State;
}) {
  const joint: JointSpec =
    side === "l"
      ? { id: `app-${name}`, side: "r", left: "100%", top: "50%" }
      : { id: `app-${name}`, side: "l", left: "0%", top: "50%" };
  const on = state !== "idle";

  return (
    <Layer
      className={cn("w-[15%]", side === "l" ? "left-[2%]" : "left-[83%]")}
      style={{ top: `${7 + row * 22}%` }}
      depth={0.9}
      order={30}
      active={state === "connecting"}
      joints={[joint]}
      lit={on}
    >
      <div
        className={cn(
          "flex h-[6cqw] items-center justify-center rounded-[1.1cqw] border bg-card px-[1.1cqw] shadow-lg transition-[border-color,box-shadow,filter] duration-500",
          on
            ? "border-primary/30 shadow-primary/25"
            : "border-border shadow-primary/10 grayscale-[60%]",
        )}
      >
        <Mark name={name} height="h-[2.4cqw]" />
      </div>
    </Layer>
  );
}

function Row({
  name,
  state,
  focus,
}: {
  name: AppName;
  state: State;
  focus: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-[0.7cqw] rounded-[0.8cqw] px-[0.8cqw] py-[0.65cqw] ring-1 transition-colors duration-500",
        focus ? "bg-accent ring-primary/30" : "ring-border",
      )}
    >
      <span className="flex h-[2.2cqw] w-[5.2cqw] shrink-0 items-center">
        <Mark name={name} height="h-[1.3cqw]" />
      </span>
      <span className="min-w-0 flex-1 truncate text-[0.66cqw] leading-snug text-muted-foreground">
        {BLURB[name]}
      </span>
      <span
        className={cn(
          "flex shrink-0 items-center gap-[0.3cqw] rounded-[0.5cqw] px-[0.6cqw] py-[0.3cqw] text-[0.65cqw] font-medium transition-colors duration-300",
          state === "connected"
            ? "bg-accent text-accent-foreground"
            : state === "connecting"
              ? "bg-primary text-primary-foreground"
              : "text-foreground ring-1 ring-border",
        )}
      >
        {state === "connected" ? (
          <>
            Connected
            <Check className="size-[0.7cqw]" />
          </>
        ) : state === "connecting" ? (
          <>
            <LoaderCircle className="size-[0.7cqw] animate-spin" />
            Connecting
          </>
        ) : (
          "Connect"
        )}
      </span>
    </span>
  );
}
