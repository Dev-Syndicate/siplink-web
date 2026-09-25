"use client";

import Image from "next/image";
import {
  BarChart3,
  BatteryFull,
  Bell,
  Globe,
  Home,
  Link2,
  Megaphone,
  MessageSquare,
  Mic,
  Monitor,
  MoreHorizontal,
  Phone,
  PhoneOff,
  Plus,
  Search,
  Send,
  Settings,
  Signal,
  Smartphone,
  Users,
  Video,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import {
  AppNav,
  Control,
  Layer,
  Portrait,
  Scene,
  ScenePill,
  Wave,
  clock,
  useSceneClock,
} from "@/components/site/scene-kit";
import { integrationLogos } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * One environment to manage, as one dashboard every channel reports into.
 *
 * Replaces the static render of the same composition. The still image put a
 * dashboard among a meeting, a team chat, integrations and a phone; the
 * scene shows them feeding it — a call on mobile, a meeting on desktop, a
 * message on the web, an app connected — and each one lands in the same
 * counters and the same activity feed, whichever device it happened on.
 *
 * Stage, parallax and wiring come from scene-kit. The people are the ones
 * from the meeting on this page.
 */

const ASSETS = "/solns-unifiedComm/scene";

type Kind = "call" | "meeting" | "message" | "app";
type Device = "Desktop" | "Mobile" | "Web";

const EVENTS: {
  kind: Kind;
  device: Device;
  who: string;
  photo: string;
  text: string;
}[] = [
  {
    kind: "call",
    device: "Mobile",
    who: "Rahul Mehta",
    photo: `${ASSETS}/rahul.webp`,
    text: "Made a call from mobile",
  },
  {
    kind: "meeting",
    device: "Desktop",
    who: "Priya Sharma",
    photo: `${ASSETS}/priya.webp`,
    text: "Started a video meeting",
  },
  {
    kind: "message",
    device: "Web",
    who: "James Park",
    photo: `${ASSETS}/james.webp`,
    text: "Sent a message in Product team",
  },
  {
    kind: "app",
    device: "Desktop",
    who: "Kristine Yee",
    photo: `${ASSETS}/kristine.webp`,
    text: "Connected HubSpot",
  },
];

const EVENT_S = 3;

const STATS: { kind: Kind; icon: LucideIcon; label: string; base: number }[] = [
  { kind: "call", icon: Phone, label: "Calls", base: 1248 },
  { kind: "meeting", icon: Video, label: "Video meetings", base: 320 },
  { kind: "message", icon: MessageSquare, label: "Messages", base: 5892 },
  { kind: "app", icon: Link2, label: "Integrations", base: 12 },
];

const TEAMS = [
  { name: "Product team", members: 8, icon: Users },
  { name: "Design team", members: 6, icon: Monitor },
  { name: "Marketing", members: 5, icon: Megaphone },
];

const AGO = ["Just now", "3 min ago", "12 min ago", "25 min ago"];

export function EnvironmentScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the first event, with a full feed behind it.
  const tick = still ? EVENTS.length * 2 : t + EVENTS.length * 2;
  const n = Math.floor(tick / EVENT_S);
  const into = tick % EVENT_S;
  const event = EVENTS[n % EVENTS.length];
  const lit = (kind: Kind) => event.kind === kind;

  /* Counters only ever go up: each is its base plus every event of its kind
     so far, so the loop never visibly resets them. */
  const count = (kind: Kind) => {
    const i = EVENTS.findIndex((e) => e.kind === kind);
    return Math.floor((n - i) / EVENTS.length) + 1;
  };

  const feed = [0, 1, 2, 3].map(
    (back) =>
      EVENTS[(((n - back) % EVENTS.length) + EVENTS.length) % EVENTS.length],
  );

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/900]"
      wires={[
        { from: "meet", to: "dash-meet", lit: lit("meeting") },
        { from: "apps", to: "dash-apps", lit: lit("app") },
        { from: "chat", to: "dash-chat", lit: lit("message") },
        { from: "phone", to: "dash-phone", lit: lit("call") },
      ]}
    >
      {/* Video meetings */}
      <Layer
        className="top-[6%] left-[2%] w-[19%]"
        depth={0.85}
        order={30}
        active={lit("meeting")}
        joints={[{ id: "meet", side: "r", left: "100%", top: "60%" }]}
        lit={lit("meeting")}
      >
        <ScenePill
          icon={Video}
          label="Video meetings"
          active={lit("meeting")}
          className="absolute -top-[1.6cqw] left-[1cqw] z-10"
        />
        <div className="rounded-[1.2cqw] bg-foreground p-[0.4cqw] pt-[1.8cqw] shadow-2xl shadow-primary/25">
          <div className="grid grid-cols-2 gap-[0.3cqw]">
            {["james", "kristine", "priya", "rahul"].map((who) => (
              <div
                key={who}
                className="relative aspect-[16/10] overflow-hidden rounded-[0.5cqw]"
              >
                <Image
                  src={`${ASSETS}/video-${who}.webp`}
                  alt=""
                  fill
                  sizes="10rem"
                  loading="eager"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <span className="flex items-center justify-center gap-[0.6cqw] py-[0.5cqw]">
            {[Mic, Video, MoreHorizontal].map((Icon, i) => (
              <span
                key={i}
                className="flex size-[1.8cqw] items-center justify-center rounded-full bg-background/15 text-background"
              >
                <Icon className="size-1/2" />
              </span>
            ))}
            <span className="flex size-[1.8cqw] items-center justify-center rounded-full bg-primary text-primary-foreground">
              <PhoneOff className="size-1/2" />
            </span>
          </span>
        </div>
      </Layer>

      {/* Integrations */}
      <Layer
        className="top-[58%] left-[3%] w-[18%]"
        depth={0.9}
        order={30}
        active={lit("app")}
        joints={[{ id: "apps", side: "r", left: "100%", top: "55%" }]}
        lit={lit("app")}
      >
        <div className="flex flex-col gap-[0.8cqw] rounded-[1.2cqw] border border-border bg-card p-[1cqw] shadow-xl shadow-primary/20">
          <ScenePill
            icon={Link2}
            label="Integrations"
            active={lit("app")}
            className="w-fit shadow-none"
          />
          <span className="grid grid-cols-2 gap-[0.5cqw]">
            {["Google Workspace", "Salesforce", "Microsoft 365", "HubSpot"].map(
              (name) => {
                const mark = integrationLogos.find((m) => m.name === name)!;
                const fresh = name === "HubSpot" && lit("app");
                return (
                  <span
                    key={name}
                    className={cn(
                      "flex h-[2.8cqw] items-center justify-center rounded-[0.6cqw] px-[0.5cqw] ring-1 transition-colors duration-500",
                      fresh ? "bg-accent ring-primary/40" : "ring-border",
                    )}
                  >
                    <Image
                      src={mark.src}
                      alt=""
                      width={mark.w}
                      height={mark.h}
                      loading="eager"
                      className="h-[1.1cqw] w-auto max-w-full object-contain"
                    />
                  </span>
                );
              },
            )}
          </span>
          <span className="flex items-center gap-[0.4cqw] text-[0.7cqw] text-muted-foreground">
            <Plus className="size-[0.8cqw]" />
            {STATS[3].base + count("app")} apps connected
          </span>
        </div>
      </Layer>

      {/* The dashboard */}
      <Layer
        className="top-[7%] left-[24%] w-[52%]"
        depth={0.35}
        order={10}
        joints={[
          { id: "dash-meet", side: "l", left: "0%", top: "22%" },
          { id: "dash-apps", side: "l", left: "0%", top: "76%" },
          { id: "dash-chat", side: "r", left: "100%", top: "18%" },
          { id: "dash-phone", side: "r", left: "100%", top: "70%" },
        ]}
        lit
      >
        <Laptop
          count={count}
          lit={lit}
          feed={feed}
          fresh={into === 0 && !still}
        />
      </Layer>

      {/* Team chat */}
      <Layer
        className="top-[5%] left-[78%] w-[20%]"
        depth={0.85}
        order={30}
        active={lit("message")}
        joints={[{ id: "chat", side: "l", left: "0%", top: "40%" }]}
        lit={lit("message")}
      >
        <TeamChat live={lit("message")} />
      </Layer>

      {/* Phone */}
      <Layer
        className="top-[46%] left-[79%] w-[11%]"
        depth={0.95}
        order={30}
        active={lit("call")}
        joints={[{ id: "phone", side: "l", left: "0%", top: "40%" }]}
        lit={lit("call")}
      >
        <Handset live={lit("call")} elapsed={into + 1} />
      </Layer>

      {/* Same platform, whichever device */}
      <Layer className="top-[52%] left-[91.5%] w-[6.5%]" depth={0.8} order={30}>
        <div className="flex flex-col gap-[0.4cqw] rounded-[1cqw] border border-border bg-card p-[0.4cqw] shadow-lg shadow-primary/15">
          {(
            [
              ["Desktop", Monitor],
              ["Mobile", Smartphone],
              ["Web", Globe],
            ] as const
          ).map(([name, Icon]) => {
            const on = event.device === name;
            return (
              <span
                key={name}
                className={cn(
                  "flex flex-col items-center gap-[0.25cqw] rounded-[0.7cqw] py-[0.6cqw] text-[0.65cqw] transition-colors duration-500",
                  on
                    ? "bg-primary font-semibold text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="size-[1.2cqw]" />
                {name}
              </span>
            );
          })}
        </div>
      </Layer>
    </Scene>
  );
}

function Laptop({
  count,
  lit,
  feed,
  fresh,
}: {
  count: (kind: Kind) => number;
  lit: (kind: Kind) => boolean;
  feed: (typeof EVENTS)[number][];
  fresh: boolean;
}) {
  return (
    <div>
      <div className="rounded-t-[1.2cqw] bg-foreground/90 p-[0.5cqw] pb-[0.8cqw] shadow-2xl shadow-primary/20">
        <span className="mx-auto mb-[0.3cqw] block size-[0.4cqw] rounded-full bg-muted-foreground/60" />
        <div className="flex aspect-[16/10] overflow-hidden rounded-[0.45cqw] bg-card">
          <AppNav
            className="w-[19%]"
            active="Home"
            items={[
              { icon: Home, label: "Home" },
              { icon: Phone, label: "Calls" },
              { icon: MessageSquare, label: "Messages" },
              { icon: Video, label: "Meetings" },
              { icon: Users, label: "Teams" },
              { icon: Link2, label: "Integrations" },
              { icon: BarChart3, label: "Analytics" },
              { icon: Settings, label: "Settings" },
            ]}
          />
          <div className="flex flex-1 flex-col gap-[0.7cqw] p-[0.9cqw]">
            <span className="flex items-center gap-[0.7cqw]">
              <span className="flex flex-1 items-center gap-[0.4cqw] rounded-full bg-muted px-[0.7cqw] py-[0.3cqw] text-[0.62cqw] text-muted-foreground">
                <Search className="size-[0.7cqw]" />
                Search people, messages or anything…
              </span>
              <Bell className="size-[0.85cqw] text-muted-foreground" />
              <Portrait
                src={`${ASSETS}/kristine.webp`}
                className="w-[1.5cqw]"
              />
            </span>

            <span className="grid grid-cols-4 gap-[0.5cqw]">
              {STATS.map(({ kind, icon: Icon, label, base }) => (
                <span
                  key={kind}
                  className={cn(
                    "flex flex-col gap-[0.2cqw] rounded-[0.7cqw] p-[0.6cqw] ring-1 transition-colors duration-500",
                    lit(kind) ? "bg-accent ring-primary/30" : "ring-border",
                  )}
                >
                  <span className="flex size-[1.7cqw] items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-1/2" />
                  </span>
                  <span className="text-[0.58cqw] text-muted-foreground">
                    {label}
                  </span>
                  <span className="text-[1.1cqw] font-semibold tabular-nums">
                    {(base + count(kind)).toLocaleString("en-US")}
                  </span>
                </span>
              ))}
            </span>

            <span className="grid flex-1 grid-cols-[1.3fr_1fr] gap-[0.6cqw]">
              <span className="flex flex-col gap-[0.35cqw] rounded-[0.7cqw] p-[0.7cqw] ring-1 ring-border">
                <span className="text-[0.75cqw] font-semibold">
                  Recent activity
                </span>
                {feed.map((item, i) => (
                  <span
                    key={`${item.kind}-${i}`}
                    className={cn(
                      "flex items-center gap-[0.5cqw] rounded-[0.5cqw] px-[0.35cqw] py-[0.3cqw] transition-colors duration-500",
                      i === 0 && "bg-accent",
                      i === 0 && fresh && "ring-1 ring-primary/30",
                    )}
                  >
                    <Portrait src={item.photo} className="w-[1.6cqw]" />
                    <span className="flex min-w-0 flex-1 flex-col leading-tight">
                      <span className="text-[0.62cqw] font-semibold">
                        {item.who}
                      </span>
                      <span className="truncate text-[0.56cqw] text-muted-foreground">
                        {item.text}
                      </span>
                    </span>
                    <span className="shrink-0 text-[0.52cqw] text-muted-foreground">
                      {AGO[i]}
                    </span>
                  </span>
                ))}
              </span>
              <span className="flex flex-col gap-[0.4cqw] rounded-[0.7cqw] p-[0.7cqw] ring-1 ring-border">
                <span className="text-[0.75cqw] font-semibold">Teams</span>
                {TEAMS.map(({ name, members, icon: Icon }) => (
                  <span key={name} className="flex items-center gap-[0.45cqw]">
                    <span className="flex size-[1.6cqw] items-center justify-center rounded-full bg-accent text-primary">
                      <Icon className="size-1/2" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[0.62cqw] font-semibold">
                        {name}
                      </span>
                      <span className="text-[0.55cqw] text-muted-foreground">
                        {members} members
                      </span>
                    </span>
                  </span>
                ))}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="relative mx-[-6%] h-[1.2cqw] rounded-b-[1.2cqw] bg-linear-to-b from-card via-muted to-muted-foreground/40 shadow-lg shadow-primary/15">
        <span className="absolute top-0 left-1/2 h-[0.4cqw] w-[14%] -translate-x-1/2 rounded-b-[0.5cqw] bg-muted-foreground/25" />
      </div>
    </div>
  );
}

function TeamChat({ live }: { live: boolean }) {
  const messages = [
    {
      photo: `${ASSETS}/priya.webp`,
      who: "Priya Sharma",
      text: "The proposal looks great!",
    },
    {
      photo: `${ASSETS}/rahul.webp`,
      who: "Rahul Mehta",
      text: "Let's discuss it in the meeting.",
    },
  ];

  return (
    <div className="flex flex-col gap-[0.6cqw] rounded-[1.2cqw] border border-border bg-card p-[1cqw] shadow-xl shadow-primary/20">
      <ScenePill
        icon={MessageSquare}
        label="Team chat"
        active={live}
        className="w-fit shadow-none"
      />
      {messages.map(({ photo, who, text }) => (
        <span key={who} className="flex items-start gap-[0.5cqw]">
          <Portrait src={photo} className="w-[1.9cqw]" />
          <span className="flex flex-col gap-[0.2cqw]">
            <span className="text-[0.68cqw] font-semibold">{who}</span>
            <span className="rounded-[0.5cqw] bg-muted px-[0.5cqw] py-[0.3cqw] text-[0.65cqw]">
              {text}
            </span>
          </span>
        </span>
      ))}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500",
          live ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <span className="flex items-start gap-[0.5cqw]">
            <Portrait src={`${ASSETS}/james.webp`} className="w-[1.9cqw]" />
            <span className="flex flex-col gap-[0.2cqw]">
              <span className="text-[0.68cqw] font-semibold">James Park</span>
              <span className="rounded-[0.5cqw] bg-accent px-[0.5cqw] py-[0.3cqw] text-[0.65cqw]">
                Sharing the updates now.
              </span>
            </span>
          </span>
        </div>
      </div>
      <span className="flex items-center gap-[0.4cqw]">
        <span className="flex-1 rounded-[0.5cqw] px-[0.5cqw] py-[0.35cqw] text-[0.6cqw] text-muted-foreground ring-1 ring-border">
          Type a message…
        </span>
        <span className="flex size-[1.7cqw] items-center justify-center rounded-[0.5cqw] bg-primary text-primary-foreground">
          <Send className="size-[45%]" />
        </span>
      </span>
    </div>
  );
}

function Handset({ live, elapsed }: { live: boolean; elapsed: number }) {
  return (
    <div className="rounded-[1.9cqw] bg-foreground/90 p-[0.4cqw] shadow-2xl shadow-primary/25">
      <div className="relative flex aspect-[9/18.5] flex-col items-center overflow-hidden rounded-[1.55cqw] bg-card px-[0.7cqw]">
        <span className="flex w-full items-center justify-between pt-[0.45cqw] text-[0.55cqw] font-semibold">
          9:41
          <span className="flex items-center gap-[0.15cqw]">
            <Signal className="size-[0.6cqw]" />
            <Wifi className="size-[0.6cqw]" />
            <BatteryFull className="size-[0.7cqw]" />
          </span>
        </span>
        <span className="absolute top-[0.4cqw] left-1/2 h-[0.8cqw] w-[32%] -translate-x-1/2 rounded-full bg-foreground" />
        <span className="mt-[1.4cqw] text-[0.8cqw] font-semibold">
          <span className="text-primary">{"//"}</span> SipLink
        </span>
        <Portrait
          src={`${ASSETS}/rahul.webp`}
          halo
          className="mt-[0.8cqw] w-[4.2cqw]"
        />
        <span className="mt-[0.4cqw] text-[0.85cqw] font-semibold">
          Rahul Mehta
        </span>
        <span className="flex h-[1.4cqw] items-center gap-[0.3cqw] text-[0.65cqw] text-muted-foreground tabular-nums">
          {live ? (
            <>
              <Wave />
              {clock(elapsed)}
            </>
          ) : (
            "Ready"
          )}
        </span>
        <span className="mt-[0.6cqw] grid grid-cols-3 gap-[0.5cqw]">
          {[Mic, MoreHorizontal, Video].map((Icon, i) => (
            <Control key={i} icon={Icon} className="w-[1.8cqw]" />
          ))}
        </span>
        <Control
          icon={live ? PhoneOff : Phone}
          hangup
          className={cn("mt-auto mb-[1.4cqw] w-[2.4cqw]", live && "ring-pulse")}
        />
        <span className="absolute bottom-[0.4cqw] left-1/2 h-[0.25cqw] w-[36%] -translate-x-1/2 rounded-full bg-foreground/80" />
      </div>
    </div>
  );
}
