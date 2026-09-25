"use client";

import type { ReactNode } from "react";
import {
  BatteryFull,
  Cloud,
  Globe,
  Grid3x3,
  Home,
  Laptop,
  Lock,
  Mic,
  MoreHorizontal,
  Phone,
  PhoneOff,
  Search,
  Signal,
  Smartphone,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import {
  Control,
  Joint,
  Layer,
  Portrait,
  Scene,
  ScenePill,
  Wave,
  clock,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Presence and multi-device, as one person reachable on three devices.
 *
 * Replaces the static render of the same composition. The still image showed
 * a presence list beside three devices on the same call; the scene shows how
 * they relate — Aarushi's call rings on her desktop, phone and browser at
 * once, she picks up on whichever is closest, and the other two carry the
 * same call with the same running timer. Her row in the presence list says
 * where she took it, so the team can see it too.
 *
 * Stage, parallax and wiring come from scene-kit. The portraits are cut from
 * the original render, so the team is the same.
 */

type Device = "desktop" | "mobile" | "browser";

const ASSETS = "/solns-remoteWorkforce/scene";

const AARUSHI = { name: "Aarushi Peri", photo: `${ASSETS}/team-aarushi.webp` };

/** Where she picks up on each call, in order. */
const PICKUP: Device[] = ["mobile", "desktop", "browser"];
const RING_S = 2;
const TALK_S = 4;
const CALL_S = RING_S + TALK_S;

const DEVICE: Record<Device, { label: string; icon: LucideIcon }> = {
  desktop: { label: "Desktop", icon: Laptop },
  mobile: { label: "Mobile", icon: Smartphone },
  browser: { label: "Browser", icon: Globe },
};

type Presence = "available" | "busy" | "away";

const TEAM: {
  name: string;
  photo: string;
  presence: Presence;
  devices: Device[];
}[] = [
  {
    name: "William Meek",
    photo: `${ASSETS}/team-william.webp`,
    presence: "available",
    devices: ["mobile", "browser"],
  },
  {
    name: "Ida Jones",
    photo: `${ASSETS}/team-ida.webp`,
    presence: "available",
    devices: ["desktop", "mobile"],
  },
  {
    name: "Lei Quynh",
    photo: `${ASSETS}/team-lei.webp`,
    presence: "busy",
    devices: ["desktop", "mobile", "browser"],
  },
  {
    name: "TJ Woodward",
    photo: `${ASSETS}/team-tj.webp`,
    presence: "away",
    devices: ["desktop", "mobile", "browser"],
  },
];

const PRESENCE_LABEL: Record<Presence, string> = {
  available: "Available",
  busy: "On a call",
  away: "Away",
};

const PRESENCE_DOT: Record<Presence, string> = {
  available: "bg-primary",
  busy: "bg-foreground/70",
  away: "bg-muted-foreground/40",
};

type CallState = { ringing: boolean; picked: Device; elapsed: number };

export function PresenceScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on a call picked up on mobile, mid-conversation.
  const inLoop = t % (CALL_S * PICKUP.length);
  const picked = still ? "mobile" : PICKUP[Math.floor(inLoop / CALL_S)];
  const phase = inLoop % CALL_S;
  const ringing = !still && phase < RING_S;
  const elapsed = still ? 24 : Math.max(0, phase - RING_S);
  const call: CallState = { ringing, picked, elapsed };

  const lit = (device: Device) => ringing || device === picked;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1619/971]"
      wires={[
        { from: "presence", to: "hub-in", lit: true },
        { from: "hub-desktop", to: "desktop", lit: lit("desktop") },
        { from: "hub-mobile", to: "mobile", lit: lit("mobile") },
        { from: "hub-browser", to: "browser", lit: lit("browser") },
      ]}
    >
      {/* Team presence */}
      <Layer className="top-[24%] left-[3%] w-[31%]" depth={0.6} order={30}>
        <TeamPanel {...call} />
      </Layer>

      {/* The sync hub */}
      <Layer
        className="top-[49%] left-[57.5%] w-[7%]"
        depth={0.45}
        order={20}
        joints={[
          { id: "hub-in", side: "l", left: "0%", top: "50%" },
          { id: "hub-desktop", side: "t", left: "50%", top: "0%" },
          { id: "hub-mobile", side: "b", left: "50%", top: "100%" },
          { id: "hub-browser", side: "r", left: "100%", top: "50%" },
        ]}
        lit
      >
        <div className="flex flex-col items-center">
          <span className="glass-tile-lit flex aspect-square w-full items-center justify-center rounded-full border-[0.35cqw] border-card bg-primary text-primary-foreground">
            <Cloud className="size-[45%]" strokeWidth={1.75} />
          </span>
          <span className="absolute top-[108%] rounded-full bg-card px-[0.6cqw] py-[0.2cqw] text-[0.75cqw] font-semibold whitespace-nowrap text-primary shadow-sm">
            In sync
          </span>
        </div>
      </Layer>

      <Layer
        className="top-[4%] left-[44%] w-[31%]"
        depth={0.35}
        order={10}
        active={!ringing && picked === "desktop"}
        glow={lit("desktop") && !ringing}
        joints={[{ id: "desktop", side: "b", left: "68%", top: "100%" }]}
        lit={lit("desktop")}
      >
        <DevicePill device="desktop" className="-top-[1.6cqw] -left-[1cqw]" />
        <Desktop {...call} />
      </Layer>

      <Layer
        className="top-[45%] left-[70%] w-[27%]"
        depth={0.8}
        order={30}
        active={!ringing && picked === "browser"}
        glow={lit("browser") && !ringing}
        joints={[{ id: "browser", side: "l", left: "0%", top: "40%" }]}
        lit={lit("browser")}
      >
        <DevicePill device="browser" className="-top-[1.6cqw] right-[1cqw]" />
        <Browser {...call} />
      </Layer>

      <Layer
        className="top-[56%] left-[42%] w-[10.5%]"
        depth={0.9}
        order={30}
        active={!ringing && picked === "mobile"}
        glow={lit("mobile") && !ringing}
        joints={[{ id: "mobile", side: "r", left: "100%", top: "30%" }]}
        lit={lit("mobile")}
      >
        <DevicePill
          device="mobile"
          className="bottom-[6%] left-[88%] whitespace-nowrap"
        />
        <Handset {...call} />
      </Layer>
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

function DevicePill({
  device,
  className,
}: {
  device: Device;
  className: string;
}) {
  const { label, icon } = DEVICE[device];
  return (
    <ScenePill
      icon={icon}
      label={label}
      className={cn("absolute z-10", className)}
    />
  );
}

function DeviceIcons({
  online,
  active,
}: {
  online: Device[];
  active?: Device | null;
}) {
  return (
    <span className="ml-auto flex items-center gap-[0.5cqw]">
      {(["desktop", "mobile", "browser"] as const).map((device) => {
        const Icon = DEVICE[device].icon;
        return (
          <Icon
            key={device}
            className={cn(
              "size-[1.1cqw] transition-colors duration-500",
              device === active
                ? "text-primary"
                : online.includes(device)
                  ? "text-muted-foreground"
                  : "text-muted-foreground/25",
            )}
          />
        );
      })}
    </span>
  );
}

function TeamPanel({ ringing, picked }: CallState) {
  return (
    <div className="glass-panel relative rounded-[1.6cqw] p-[1.2cqw] pt-[2.4cqw]">
      <ScenePill
        icon={Users}
        label="Team presence"
        size="md"
        className="absolute -top-[1.6cqw] left-[1.2cqw]"
      />

      <span className="flex items-center gap-[0.6cqw] rounded-full bg-muted px-[0.9cqw] py-[0.55cqw] text-[0.8cqw] text-muted-foreground">
        <Search className="size-[0.95cqw]" />
        Search team
      </span>

      <div className="mt-[0.9cqw] flex flex-col gap-[0.55cqw]">
        {/* Aarushi, whose presence the call changes. */}
        <Row
          photo={AARUSHI.photo}
          name={AARUSHI.name}
          dot={ringing ? "bg-primary" : PRESENCE_DOT.busy}
          status={
            ringing
              ? "Ringing on 3 devices"
              : `On a call · ${DEVICE[picked].label}`
          }
          highlight
          ringing={ringing}
        >
          <DeviceIcons
            online={["desktop", "mobile", "browser"]}
            active={ringing ? null : picked}
          />
          <Joint
            id="presence"
            side="r"
            left="calc(100% + 1.2cqw)"
            top="50%"
            lit
          />
        </Row>

        {TEAM.map(({ name, photo, presence, devices }) => (
          <Row
            key={name}
            photo={photo}
            name={name}
            dot={PRESENCE_DOT[presence]}
            status={PRESENCE_LABEL[presence]}
          >
            <DeviceIcons online={devices} />
          </Row>
        ))}
      </div>
    </div>
  );
}

function Row({
  photo,
  name,
  dot,
  status,
  highlight,
  ringing,
  children,
}: {
  photo: string;
  name: string;
  dot: string;
  status: string;
  highlight?: boolean;
  ringing?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-[0.8cqw] rounded-[0.9cqw] px-[0.8cqw] py-[0.6cqw] ring-1",
        highlight ? "bg-accent ring-primary/25" : "bg-card/70 ring-border",
      )}
    >
      <span className="relative">
        <Portrait src={photo} ringing={ringing} className="w-[2.8cqw]" />
        <span
          className={cn(
            "absolute right-0 bottom-0 size-[0.8cqw] rounded-full border-[0.15cqw] border-card transition-colors duration-500",
            dot,
          )}
        />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[0.95cqw] font-semibold">{name}</span>
        <span
          className={cn(
            "text-[0.75cqw]",
            highlight ? "font-medium text-primary" : "text-muted-foreground",
          )}
        >
          {status}
        </span>
      </span>
      {children}
    </div>
  );
}

/** The call as each device shows it: ringing, held here, or held elsewhere. */
function CallView({
  device,
  ringing,
  picked,
  elapsed,
  size,
  onColor,
}: CallState & {
  device: Device;
  size: "sm" | "md";
  /** Drawn on the phone's brand-coloured header. */
  onColor?: boolean;
}) {
  const mine = device === picked;
  const button = size === "md" ? "w-[2.3cqw]" : "w-[1.9cqw]";

  return (
    <div className="flex flex-col items-center gap-[0.45cqw]">
      <Portrait
        src={AARUSHI.photo}
        ringing={ringing}
        halo={!onColor}
        className={size === "md" ? "w-[5.4cqw]" : "w-[4.2cqw]"}
      />
      <span
        className={cn(
          "font-semibold",
          size === "md" ? "text-[1cqw]" : "text-[0.85cqw]",
        )}
      >
        {AARUSHI.name}
      </span>
      <span
        className={cn(
          "flex h-[1.5cqw] items-center gap-[0.4cqw] text-[0.72cqw] whitespace-nowrap tabular-nums",
          onColor ? "text-primary-foreground/90" : "text-muted-foreground",
        )}
      >
        {ringing ? (
          "Incoming call…"
        ) : mine ? (
          <>
            {!onColor ? <Wave /> : null}
            {clock(elapsed)}
          </>
        ) : (
          `On ${DEVICE[picked].label.toLowerCase()} · ${clock(elapsed)}`
        )}
      </span>
      {!onColor ? (
        <div className="flex gap-[0.6cqw]">
          {ringing ? (
            <>
              <Control icon={Phone} hangup className={button} />
              <Control icon={PhoneOff} className={button} />
            </>
          ) : (
            <>
              <Control icon={Mic} className={button} />
              <Control icon={Grid3x3} className={button} />
              <Control icon={MoreHorizontal} className={button} />
              <Control icon={PhoneOff} hangup className={button} />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

/** The narrow rail of contacts down the side of the desktop and browser apps. */
function ContactRail() {
  return (
    <div className="flex flex-col items-center gap-[0.55cqw] border-l border-border p-[0.6cqw]">
      <Search className="size-[0.8cqw] text-muted-foreground" />
      {TEAM.concat(TEAM.slice(0, 2)).map(({ photo }, i) => (
        <Portrait key={i} src={photo} className="w-[1.4cqw]" />
      ))}
    </div>
  );
}

function AppSidebar() {
  return (
    <div className="flex flex-col items-center gap-[0.8cqw] border-r border-border p-[0.6cqw] text-muted-foreground">
      <span className="text-[0.9cqw] font-black tracking-tighter text-primary italic">
        {"//"}
      </span>
      <Home className="size-[0.85cqw]" />
      <span className="rounded-[0.3cqw] bg-primary p-[0.2cqw] text-primary-foreground">
        <Phone className="size-[0.75cqw]" />
      </span>
      <Users className="size-[0.85cqw]" />
      <Grid3x3 className="size-[0.85cqw]" />
    </div>
  );
}

function Desktop(call: CallState) {
  return (
    <div>
      <div className="rounded-t-[1.2cqw] bg-foreground/90 p-[0.5cqw] pb-[0.8cqw] shadow-2xl shadow-primary/20">
        <span className="mx-auto mb-[0.3cqw] block size-[0.4cqw] rounded-full bg-muted-foreground/60" />
        <div className="flex aspect-[16/10] overflow-hidden rounded-[0.45cqw] bg-card">
          <AppSidebar />
          <div className="flex flex-1 items-center justify-center bg-linear-to-b from-accent/60 to-card">
            <CallView device="desktop" size="md" {...call} />
          </div>
          <ContactRail />
        </div>
      </div>
      <div className="relative mx-[-6%] h-[1.2cqw] rounded-b-[1.2cqw] bg-linear-to-b from-card via-muted to-muted-foreground/40 shadow-lg shadow-primary/15">
        <span className="absolute top-0 left-1/2 h-[0.4cqw] w-[14%] -translate-x-1/2 rounded-b-[0.5cqw] bg-muted-foreground/25" />
      </div>
    </div>
  );
}

function Browser(call: CallState) {
  return (
    <div className="glass-panel overflow-hidden rounded-[1.2cqw]">
      <div className="flex items-center gap-[0.5cqw] border-b border-border bg-card/80 px-[0.9cqw] py-[0.55cqw]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "size-[0.7cqw] rounded-full",
              i === 0
                ? "bg-primary"
                : i === 1
                  ? "bg-primary/45"
                  : "bg-muted-foreground/30",
            )}
          />
        ))}
        <span className="ml-[0.6cqw] flex flex-1 items-center gap-[0.4cqw] rounded-full bg-muted px-[0.7cqw] py-[0.2cqw] text-[0.7cqw] text-muted-foreground">
          <Lock className="size-[0.65cqw]" />
          <span className="text-foreground">app.siplink.com</span>
        </span>
      </div>
      <div className="flex aspect-[16/9]">
        <AppSidebar />
        <div className="flex flex-1 items-center justify-center bg-linear-to-b from-card/40 to-accent/50">
          <CallView device="browser" size="md" {...call} />
        </div>
        <ContactRail />
      </div>
    </div>
  );
}

function Handset(call: CallState) {
  const mine = call.picked === "mobile";

  return (
    <div className="rounded-[2cqw] bg-foreground/90 p-[0.4cqw] shadow-2xl shadow-primary/25">
      <div className="relative flex aspect-[9/18.5] flex-col overflow-hidden rounded-[1.65cqw] bg-card">
        <div className="flex h-[58%] flex-col items-center bg-linear-to-b from-primary to-primary/80 px-[0.8cqw] pt-[0.45cqw] text-primary-foreground">
          <span className="flex w-full items-center justify-between text-[0.6cqw] font-semibold">
            9:41
            <span className="flex items-center gap-[0.15cqw]">
              <Signal className="size-[0.65cqw]" />
              <Wifi className="size-[0.65cqw]" />
              <BatteryFull className="size-[0.75cqw]" />
            </span>
          </span>
          <span className="absolute top-[0.4cqw] left-1/2 h-[0.85cqw] w-[32%] -translate-x-1/2 rounded-full bg-foreground" />
          <div className="mt-[1cqw]">
            <CallView device="mobile" size="sm" onColor {...call} />
          </div>
        </div>
        <div className="-mt-[1.2cqw] flex flex-1 flex-col items-center justify-evenly rounded-t-[1.4cqw] bg-card px-[0.7cqw]">
          <div className="flex gap-[0.5cqw]">
            <Control icon={Mic} className="w-[1.9cqw]" />
            <Control icon={Grid3x3} className="w-[1.9cqw]" />
            <Control icon={MoreHorizontal} className="w-[1.9cqw]" />
          </div>
          <Control
            icon={call.ringing ? Phone : PhoneOff}
            hangup
            className={cn(
              "w-[2.6cqw]",
              (call.ringing || (mine && !call.ringing)) && "ring-pulse",
            )}
          />
        </div>
        <span className="absolute bottom-[0.4cqw] left-1/2 h-[0.25cqw] w-[36%] -translate-x-1/2 rounded-full bg-foreground/80" />
      </div>
    </div>
  );
}
