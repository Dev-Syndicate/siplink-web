"use client";

import type { CSSProperties } from "react";
import {
  AppWindow,
  ArrowLeftRight,
  BatteryFull,
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Grid3x3,
  Home,
  Lock,
  Mic,
  Monitor,
  MoreHorizontal,
  Pause,
  Phone,
  PhoneOff,
  RotateCw,
  Search,
  Settings,
  Signal,
  Smartphone,
  UserPlus,
  Users,
  Voicemail,
  Volume2,
  Wifi,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  Control,
  Joint,
  Layer,
  Portrait as ScenePortrait,
  Scene,
  Wave,
  clock,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Desktop, mobile and browser calling, as one call that moves between three
 * devices.
 *
 * Replaces the static render of the same composition. The still image said
 * "the call is on all three"; the scene says what that means — the call rings
 * everywhere, is answered on the laptop, then carries on from the phone and
 * the browser without the timer ever resetting.
 *
 * Stage, parallax and wiring come from scene-kit. The portraits are cut from
 * the original render, so the people are the same.
 */

type Device = "laptop" | "phone" | "browser";

/** Ring, then answered on each device in turn. */
const HANDOFF: Device[] = ["laptop", "phone", "browser"];
const BEAT_S = 3;
const LOOP_S = BEAT_S * (HANDOFF.length + 1);

const ASSETS = "/solns-remoteWorkforce/scene";

const CALLER = {
  name: "Sarah Johnson",
  number: "+1 (212) 555-0143",
  photo: `${ASSETS}/caller.webp`,
};

type Presence = "available" | "busy" | "away";

const TEAM: { name: string; presence: Presence; photo: number }[] = [
  { name: "Daniel Ortiz", presence: "available", photo: 1 },
  { name: "Marcus Lee", presence: "busy", photo: 2 },
  { name: "Ryan Cole", presence: "available", photo: 4 },
  { name: "Elena Ruiz", presence: "away", photo: 5 },
  { name: "Chris Moore", presence: "available", photo: 7 },
  { name: "Priya Shah", presence: "busy", photo: 8 },
];

const PRESENCE_LABEL: Record<Presence, string> = {
  available: "Available",
  busy: "On a call",
  away: "Away",
};

/** Which device each wire lights for. */
const WIRES: { from: string; to: string; device: Device }[] = [
  { from: "monitor", to: "laptop", device: "laptop" },
  { from: "handset-tile", to: "phone-top", device: "phone" },
  { from: "webrtc-out", to: "phone-side", device: "phone" },
  { from: "browser", to: "app-in", device: "browser" },
  { from: "app-out", to: "webrtc-in", device: "browser" },
];

const DEVICE_JOINTS: Record<Device, JointSpec[]> = {
  laptop: [{ id: "laptop", side: "l", left: "0%", top: "30%" }],
  browser: [{ id: "browser", side: "r", left: "100%", top: "72%" }],
  phone: [
    { id: "phone-top", side: "t", left: "72%", top: "0%" },
    { id: "phone-side", side: "l", left: "0%", top: "70%" },
  ],
};

/** Glass tiles, centred on (x%, y%) of the scene. */
const TILES: {
  x: number;
  y: number;
  depth: number;
  icon: LucideIcon;
  label?: string;
  device: Device;
  delay: string;
  joints: JointSpec[];
}[] = [
  {
    x: 18.5,
    y: 17.8,
    depth: 0.6,
    icon: Monitor,
    device: "laptop",
    delay: "0s",
    joints: [{ id: "monitor", side: "r", left: "100%", top: "50%" }],
  },
  {
    x: 87,
    y: 14.2,
    depth: 0.6,
    icon: Smartphone,
    device: "phone",
    delay: "-2s",
    joints: [{ id: "handset-tile", side: "b", left: "50%", top: "100%" }],
  },
  {
    x: 48,
    y: 85.3,
    depth: 1,
    icon: AppWindow,
    device: "browser",
    delay: "-4s",
    joints: [
      { id: "app-in", side: "l", left: "0%", top: "50%" },
      { id: "app-out", side: "r", left: "100%", top: "50%" },
    ],
  },
  {
    x: 63.5,
    y: 85.3,
    depth: 1,
    icon: Globe,
    label: "WebRTC",
    device: "browser",
    delay: "-1s",
    joints: [
      { id: "webrtc-in", side: "l", left: "0%", top: "50%" },
      { id: "webrtc-out", side: "r", left: "100%", top: "50%" },
    ],
  },
];

export function CallingDevicesScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the answered call, mid-conversation.
  const inLoop = t % LOOP_S;
  const beat = still ? 1 : Math.floor(inLoop / BEAT_S);
  const ringing = beat === 0;
  const active = ringing ? null : HANDOFF[beat - 1];
  const elapsed = still ? 24 : Math.max(0, inLoop - BEAT_S);
  const call: CallState = { ringing, active, elapsed };

  const lit = (device: Device) => ringing || active === device;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={WIRES.map(({ from, to, device }) => ({
        from,
        to,
        lit: lit(device),
      }))}
    >
      {TILES.map(
        ({ x, y, depth, icon: Icon, label: text, device, delay, joints }) => (
          <div
            key={`${x}-${y}`}
            className="parallax absolute z-20 w-[7.5%]"
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                "--depth": depth,
              } as CSSProperties
            }
          >
            <div
              className={cn(
                "glass-tile relative flex aspect-square flex-col items-center justify-center gap-[0.3cqw] rounded-[1.4cqw] text-primary transition-shadow duration-500",
                !still && "card-float",
                lit(device) && "glass-tile-lit",
              )}
              style={{ "--float-delay": delay } as CSSProperties}
            >
              <Icon className="size-[3cqw]" strokeWidth={1.75} />
              {text ? (
                <span className="text-[1.1cqw] font-semibold text-foreground">
                  {text}
                </span>
              ) : null}
              {joints.map((spec) => (
                <Joint key={spec.id} {...spec} lit={lit(device)} />
              ))}
            </div>
          </div>
        ),
      )}

      <Layer
        className="top-[9%] left-[30%] w-[45%]"
        depth={0.35}
        order={10}
        active={active === "laptop"}
        joints={DEVICE_JOINTS.laptop}
        lit={lit("laptop")}
      >
        <Laptop {...call} />
      </Layer>

      <Layer
        className="top-[40%] left-[6%] w-[32%]"
        depth={0.8}
        order={30}
        active={active === "browser"}
        joints={DEVICE_JOINTS.browser}
        lit={lit("browser")}
      >
        <Browser {...call} />
      </Layer>

      <Layer
        className="top-[27%] right-[9%] w-[15%]"
        depth={0.9}
        order={30}
        active={active === "phone"}
        joints={DEVICE_JOINTS.phone}
        lit={lit("phone")}
      >
        <Handset {...call} />
      </Layer>
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

type CallState = { ringing: boolean; active: Device | null; elapsed: number };

/** The kit's portrait, defaulting to the caller. */
function Portrait({
  src = CALLER.photo,
  ...rest
}: Omit<Parameters<typeof ScenePortrait>[0], "src"> & { src?: string }) {
  return <ScenePortrait src={src} {...rest} />;
}

/** What a device that is not holding the call shows once it is answered. */
function Elsewhere({ on, elapsed }: { on: Device; elapsed: number }) {
  return (
    <span className="flex items-center gap-[0.4cqw] rounded-full bg-accent px-[0.8cqw] py-[0.3cqw] text-[0.9cqw] font-medium whitespace-nowrap text-accent-foreground">
      <ArrowLeftRight className="size-[0.9cqw]" />
      On {on} · <span className="tabular-nums">{clock(elapsed)}</span>
    </span>
  );
}

function Laptop({ ringing, active, elapsed }: CallState) {
  const mine = active === "laptop";

  return (
    <div>
      <div className="rounded-t-[1.3cqw] bg-foreground/90 p-[0.55cqw] pb-[0.9cqw] shadow-2xl shadow-primary/20">
        <span className="mx-auto mb-[0.35cqw] block size-[0.45cqw] rounded-full bg-muted-foreground/60" />
        <div className="flex aspect-[16/10] flex-col overflow-hidden rounded-[0.5cqw] bg-card">
          {/* App bar */}
          <div className="flex items-center gap-[0.8cqw] border-b border-border px-[1cqw] py-[0.6cqw]">
            <span className="text-[1.2cqw] font-black tracking-tighter text-primary italic">
              {"//"}
            </span>
            <span className="text-[0.85cqw] font-semibold">SipLink</span>
            <span className="ml-[1.5cqw] flex flex-1 items-center gap-[0.4cqw] rounded-full bg-muted px-[0.7cqw] py-[0.3cqw] text-[0.7cqw] text-muted-foreground">
              <Search className="size-[0.8cqw]" />
              Search people, numbers…
            </span>
            <Bell className="size-[0.95cqw] text-muted-foreground" />
            <Settings className="size-[0.95cqw] text-muted-foreground" />
            <Portrait src={`${ASSETS}/contact-3.webp`} className="w-[1.5cqw]" />
          </div>

          <div className="flex min-h-0 flex-1">
            {/* Sidebar */}
            <div className="flex w-[18%] flex-col gap-[0.35cqw] border-r border-border p-[0.6cqw] text-[0.72cqw] text-muted-foreground">
              {[
                { icon: Home, text: "Home" },
                { icon: Phone, text: "Calls", on: true },
                { icon: Users, text: "Team" },
                { icon: Voicemail, text: "Voicemail", badge: 2 },
                { icon: Clock, text: "History" },
              ].map(({ icon: Icon, text, on, badge }) => (
                <span
                  key={text}
                  className={cn(
                    "flex items-center gap-[0.45cqw] rounded-[0.4cqw] px-[0.45cqw] py-[0.4cqw]",
                    on && "bg-accent font-medium text-accent-foreground",
                  )}
                >
                  <Icon className={cn("size-[0.9cqw]", on && "text-primary")} />
                  {text}
                  {badge ? (
                    <span className="ml-auto rounded-full bg-primary px-[0.3cqw] text-[0.6cqw] text-primary-foreground">
                      {badge}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>

            {/* Call */}
            <div className="relative flex flex-1 flex-col items-center justify-center gap-[0.55cqw] bg-linear-to-b from-accent/60 to-card">
              <span className="absolute top-[0.8cqw] left-[0.9cqw] flex items-center gap-[0.3cqw] rounded-full bg-card px-[0.55cqw] py-[0.2cqw] text-[0.65cqw] text-muted-foreground ring-1 ring-border">
                <Lock className="size-[0.7cqw] text-primary" />
                HD voice · Encrypted
              </span>
              <Portrait ringing={ringing} halo className="w-[7.4cqw]" />
              <span className="flex flex-col items-center">
                <span className="text-[1.2cqw] font-semibold">
                  {CALLER.name}
                </span>
                <span className="text-[0.75cqw] text-muted-foreground tabular-nums">
                  {CALLER.number}
                </span>
              </span>
              {ringing ? (
                <span className="text-[0.95cqw] text-primary">
                  Incoming call…
                </span>
              ) : mine ? (
                <span className="flex items-center gap-[0.6cqw]">
                  <Wave />
                  <span className="text-[0.95cqw] tabular-nums">
                    {clock(elapsed)}
                  </span>
                </span>
              ) : (
                <Elsewhere on={active ?? "laptop"} elapsed={elapsed} />
              )}
              <div className="mt-[0.2cqw] flex gap-[0.9cqw]">
                <Control icon={Mic} label="Mute" className="w-[2.6cqw]" />
                <Control icon={Grid3x3} label="Keypad" className="w-[2.6cqw]" />
                <Control icon={Pause} label="Hold" className="w-[2.6cqw]" />
                <Control
                  icon={ArrowLeftRight}
                  label="Transfer"
                  className="w-[2.6cqw]"
                />
                <Control
                  icon={PhoneOff}
                  hangup
                  label="End"
                  className="w-[2.6cqw]"
                />
              </div>
            </div>

            {/* Team presence */}
            <div className="flex w-[29%] flex-col gap-[0.45cqw] border-l border-border p-[0.7cqw]">
              <span className="flex items-center justify-between text-[0.8cqw] font-semibold">
                Team
                <span className="rounded-full bg-accent px-[0.4cqw] text-[0.65cqw] font-medium text-accent-foreground">
                  {TEAM.filter((m) => m.presence === "available").length} free
                </span>
              </span>
              {TEAM.map(({ name, presence, photo }) => (
                <span key={name} className="flex items-center gap-[0.5cqw]">
                  <span className="relative">
                    <Portrait
                      src={`${ASSETS}/contact-${photo}.webp`}
                      className="w-[1.9cqw]"
                    />
                    <span
                      className={cn(
                        "absolute right-0 bottom-0 size-[0.6cqw] rounded-full border-[0.12cqw] border-card",
                        presence === "available" && "bg-primary",
                        presence === "busy" && "bg-foreground/70",
                        presence === "away" && "bg-muted-foreground/40",
                      )}
                    />
                  </span>
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-[0.72cqw] font-medium">
                      {name}
                    </span>
                    <span className="text-[0.6cqw] text-muted-foreground">
                      {PRESENCE_LABEL[presence]}
                    </span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Deck and hinge */}
      <div className="relative mx-[-7%] h-[1.4cqw] rounded-b-[1.4cqw] bg-linear-to-b from-card via-muted to-muted-foreground/40 shadow-lg shadow-primary/15">
        <span className="absolute top-0 left-1/2 h-[0.45cqw] w-[14%] -translate-x-1/2 rounded-b-[0.5cqw] bg-muted-foreground/25" />
      </div>
    </div>
  );
}

function Browser({ ringing, active, elapsed }: CallState) {
  const mine = active === "browser";

  return (
    <div className="glass-panel overflow-hidden rounded-[1.2cqw]">
      {/* Tab strip */}
      <div className="flex items-end gap-[0.5cqw] bg-muted/80 px-[0.9cqw] pt-[0.6cqw]">
        <span className="mr-[0.4cqw] mb-[0.55cqw] flex gap-[0.4cqw]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "size-[0.75cqw] rounded-full",
                i === 0
                  ? "bg-primary"
                  : i === 1
                    ? "bg-primary/45"
                    : "bg-muted-foreground/30",
              )}
            />
          ))}
        </span>
        <span className="flex w-[42%] items-center gap-[0.4cqw] rounded-t-[0.6cqw] bg-card px-[0.7cqw] py-[0.45cqw] text-[0.7cqw] font-medium">
          <span className="text-[0.75cqw] font-black text-primary italic">
            {"//"}
          </span>
          <span className="truncate">SipLink · Call</span>
          <X className="ml-auto size-[0.7cqw] text-muted-foreground" />
        </span>
        <span className="mb-[0.7cqw] h-[0.35cqw] w-[18%] rounded-full bg-muted-foreground/25" />
      </div>
      {/* Address bar */}
      <div className="flex items-center gap-[0.6cqw] border-b border-border bg-card px-[0.9cqw] py-[0.45cqw] text-muted-foreground">
        <ChevronLeft className="size-[0.9cqw]" />
        <ChevronRight className="size-[0.9cqw] opacity-50" />
        <RotateCw className="size-[0.8cqw]" />
        <span className="flex flex-1 items-center gap-[0.4cqw] rounded-full bg-muted px-[0.7cqw] py-[0.25cqw] text-[0.72cqw]">
          <Lock className="size-[0.7cqw]" />
          <span className="text-foreground">app.siplink.com</span>/call
        </span>
      </div>

      <div className="flex aspect-[16/8.2] flex-col items-center justify-center gap-[0.55cqw] bg-linear-to-b from-card/40 to-accent/50">
        <Portrait ringing={ringing} halo className="w-[6cqw]" />
        <span className="flex flex-col items-center">
          <span className="text-[1.15cqw] font-semibold">{CALLER.name}</span>
          <span className="text-[0.72cqw] text-muted-foreground tabular-nums">
            {ringing ? "Incoming call…" : CALLER.number}
          </span>
        </span>
        {ringing ? (
          <div className="flex gap-[2cqw]">
            <Control icon={Phone} hangup label="Accept" className="w-[3cqw]" />
            <Control icon={PhoneOff} label="Decline" className="w-[3cqw]" />
          </div>
        ) : mine ? (
          <>
            <span className="flex items-center gap-[0.6cqw]">
              <Wave />
              <span className="text-[0.9cqw] tabular-nums">
                {clock(elapsed)}
              </span>
            </span>
            <div className="flex gap-[1cqw]">
              <Control icon={Mic} label="Mute" className="w-[2.6cqw]" />
              <Control icon={Grid3x3} label="Keypad" className="w-[2.6cqw]" />
              <Control
                icon={PhoneOff}
                hangup
                label="End"
                className="w-[2.6cqw]"
              />
            </div>
          </>
        ) : (
          <Elsewhere on={active ?? "browser"} elapsed={elapsed} />
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border bg-card/70 px-[0.9cqw] py-[0.4cqw] text-[0.65cqw] text-muted-foreground">
        <span className="flex items-center gap-[0.35cqw]">
          <Globe className="size-[0.75cqw] text-primary" />
          WebRTC · nothing to install
        </span>
        <span className="flex items-center gap-[0.3cqw]">
          <Mic className="size-[0.7cqw]" />
          Default mic
        </span>
      </div>
    </div>
  );
}

function Handset({ ringing, active, elapsed }: CallState) {
  const mine = active === "phone";

  return (
    <div className="rounded-[2.4cqw] bg-foreground/90 p-[0.45cqw] shadow-2xl shadow-primary/25">
      <div className="relative flex aspect-[9/18.5] flex-col overflow-hidden rounded-[2cqw] bg-card">
        <div className="flex h-[47%] flex-col items-center bg-linear-to-b from-primary to-primary/80 px-[1cqw] pt-[0.55cqw] text-primary-foreground">
          {/* Status bar and island */}
          <span className="flex w-full items-center justify-between text-[0.7cqw] font-semibold">
            9:41
            <span className="flex items-center gap-[0.2cqw]">
              <Signal className="size-[0.75cqw]" />
              <Wifi className="size-[0.75cqw]" />
              <BatteryFull className="size-[0.85cqw]" />
            </span>
          </span>
          <span className="absolute top-[0.45cqw] left-1/2 h-[1cqw] w-[32%] -translate-x-1/2 rounded-full bg-foreground" />
          <span className="mt-[0.9cqw] text-[1.1cqw] font-medium">
            {CALLER.name}
          </span>
          <span className="text-[0.8cqw] tabular-nums opacity-85">
            {ringing
              ? "Incoming call…"
              : mine
                ? clock(elapsed)
                : `On ${active} · ${clock(elapsed)}`}
          </span>
          <Portrait ringing={ringing} className="mt-[0.8cqw] w-[5.6cqw]" />
        </div>
        <div className="-mt-[1.4cqw] flex flex-1 flex-col items-center justify-evenly rounded-t-[1.6cqw] bg-card px-[0.9cqw]">
          <div className="grid grid-cols-3 gap-x-[0.9cqw] gap-y-[0.5cqw]">
            {(
              [
                [Mic, "Mute"],
                [Grid3x3, "Keypad"],
                [Volume2, "Speaker"],
                [Pause, "Hold"],
                [UserPlus, "Add call"],
                [MoreHorizontal, "More"],
              ] as const
            ).map(([Icon, text]) => (
              <Control
                key={text}
                icon={Icon}
                label={text}
                className="w-[2.6cqw]"
              />
            ))}
          </div>
          <Control
            icon={ringing ? Phone : PhoneOff}
            hangup
            className={cn("w-[3.2cqw]", (ringing || mine) && "ring-pulse")}
          />
        </div>
        <span className="absolute bottom-[0.45cqw] left-1/2 h-[0.3cqw] w-[36%] -translate-x-1/2 rounded-full bg-foreground/80" />
      </div>
    </div>
  );
}
