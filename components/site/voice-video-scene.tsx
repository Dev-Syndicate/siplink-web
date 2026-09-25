"use client";

import Image from "next/image";
import {
  CheckCheck,
  FileText,
  Home,
  LayoutGrid,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Paperclip,
  Phone,
  PhoneOff,
  ScreenShare,
  Send,
  Settings,
  Smile,
  Users,
  Video,
  Voicemail,
  Contact,
} from "lucide-react";

import {
  AppNav,
  Control,
  Layer,
  Portrait,
  Scene,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Voice, video and messaging, as one meeting with everything else still
 * arriving in the same app.
 *
 * Replaces the static render of the same composition. The still image put a
 * meeting, a chat, an incoming call and a presence menu side by side; the
 * scene shows them as one system — joining the meeting sets presence to "In
 * a meeting", the chat keeps moving beside the video, and a call that comes
 * in mid-meeting is answered with a quick message instead of interrupting it.
 *
 * Stage, parallax and wiring come from scene-kit. The people are cut from the
 * original render.
 */

const ASSETS = "/solns-unifiedComm/scene";

const PEOPLE = [
  { name: "Kristine Yee", video: `${ASSETS}/video-kristine.webp` },
  { name: "James Park", video: `${ASSETS}/video-james.webp` },
  { name: "Rahul Mehta", video: `${ASSETS}/video-rahul.webp` },
  { name: "Priya Sharma", video: `${ASSETS}/video-priya.webp` },
];

const CALLER = {
  name: "Neha Kapoor",
  company: "BrightPath Health",
  photo: "/solns-salesTeam/scene/neha.webp",
};

type Chat = {
  at: number;
  who?: string;
  photo?: string;
  time: string;
  text: string;
  file?: string;
};

const CHAT: Chat[] = [
  {
    at: 0,
    who: "Kristine Yee",
    photo: `${ASSETS}/kristine.webp`,
    time: "10:12 AM",
    text: "Here's the latest update on the campaign.",
    file: "Campaign_Update.pdf",
  },
  {
    at: 3,
    who: "Rahul Mehta",
    photo: `${ASSETS}/rahul.webp`,
    time: "10:14 AM",
    text: "Looks great! Let's go through it now.",
  },
  {
    at: 5,
    who: "Priya Sharma",
    photo: `${ASSETS}/priya.webp`,
    time: "10:15 AM",
    text: "Agreed. I'll share some ideas too.",
  },
  { at: 6, time: "10:16 AM", text: "Sounds good! Let's get started." },
];

const PRESENCE = [
  { label: "Available", dot: "bg-primary/45" },
  { label: "In a meeting", dot: "bg-primary" },
  { label: "Do not disturb", dot: "bg-foreground/70" },
  { label: "Appear offline", dot: "bg-muted-foreground/40" },
];

/** 0 joining, 1–7 meeting, 8–10 a call rings, 11–13 it's answered by text. */
const LOOP_S = 14;
const RING_AT = 8;
const REPLY_AT = 11;

export function VoiceVideoScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the meeting with the call answered by text.
  const s = still ? LOOP_S - 1 : t % LOOP_S;
  const joined = s >= 1;
  const speaker = Math.floor(s / 2) % PEOPLE.length;
  const ringing = s >= RING_AT && s < REPLY_AT;
  const replied = s >= REPLY_AT;
  const presence = joined ? 1 : 0;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/600]"
      wires={[
        { from: "call", to: "app-call", lit: ringing || replied },
        { from: "app-presence", to: "presence", lit: s >= 1 && s < 3 },
      ]}
    >
      <Layer
        className="top-[7%] left-[15%] w-[70%]"
        depth={0.35}
        order={10}
        joints={[
          { id: "app-call", side: "l", left: "0%", top: "55%" },
          { id: "app-presence", side: "r", left: "100%", top: "35%" },
        ]}
        lit
      >
        <div className="flex overflow-hidden rounded-[1.6cqw] border border-border bg-card shadow-2xl shadow-primary/15">
          <AppNav
            className="w-[17%]"
            active="Meetings"
            items={[
              { icon: Home, label: "Home" },
              { icon: Phone, label: "Calls" },
              { icon: Video, label: "Meetings" },
              { icon: MessageSquare, label: "Messages", badge: 3 },
              { icon: Contact, label: "Contacts" },
              { icon: Users, label: "Team" },
              { icon: Voicemail, label: "Voicemail" },
              { icon: Settings, label: "Settings" },
            ]}
          />
          <Meeting joined={joined} speaker={speaker} ringing={ringing} />
          <ChatPanel s={s} replied={replied} />
        </div>
      </Layer>

      {/* The call that arrives mid-meeting */}
      <Layer
        className="top-[26%] left-[1.5%] w-[12.5%]"
        depth={0.9}
        order={30}
        active={ringing}
        joints={[{ id: "call", side: "r", left: "100%", top: "50%" }]}
        lit={ringing || replied}
      >
        <div className="flex flex-col items-center gap-[0.4cqw] rounded-[1.3cqw] border border-border bg-card p-[1cqw] text-center shadow-xl shadow-primary/20">
          <Portrait
            src={CALLER.photo}
            ringing={ringing}
            className="w-[4.4cqw]"
          />
          <span className="text-[0.7cqw] text-muted-foreground">
            {replied ? "Replied" : ringing ? "Incoming call" : "Last caller"}
          </span>
          <span className="text-[1cqw] font-semibold">{CALLER.name}</span>
          <span className="text-[0.7cqw] text-muted-foreground">
            {CALLER.company}
          </span>
          {replied ? (
            <span className="mt-[0.3cqw] rounded-[0.7cqw] bg-accent px-[0.6cqw] py-[0.45cqw] text-[0.68cqw] leading-snug text-accent-foreground">
              “In a meeting — I’ll call you back at 11.”
            </span>
          ) : (
            <span className="mt-[0.3cqw] flex gap-[1.2cqw]">
              <span className="flex flex-col items-center gap-[0.2cqw]">
                <Control icon={PhoneOff} hangup className="w-[2.4cqw]" />
                <span className="text-[0.6cqw] text-muted-foreground">
                  Decline
                </span>
              </span>
              <span className="flex flex-col items-center gap-[0.2cqw]">
                <Control
                  icon={MessageSquare}
                  className={cn("w-[2.4cqw]", ringing && "ring-pulse")}
                />
                <span className="text-[0.6cqw] text-muted-foreground">
                  Reply
                </span>
              </span>
            </span>
          )}
        </div>
      </Layer>

      {/* Presence, set by the meeting */}
      <Layer
        className="top-[25%] left-[86.5%] w-[12.5%]"
        depth={0.9}
        order={30}
        active={s >= 1 && s < 3}
        joints={[{ id: "presence", side: "l", left: "0%", top: "30%" }]}
        lit={s >= 1 && s < 3}
      >
        <div className="flex flex-col gap-[0.2cqw] rounded-[1.3cqw] border border-border bg-card p-[0.7cqw] shadow-xl shadow-primary/20">
          {PRESENCE.map(({ label: text, dot }, i) => (
            <span
              key={text}
              className={cn(
                "flex items-center gap-[0.55cqw] rounded-[0.6cqw] px-[0.55cqw] py-[0.55cqw] text-[0.8cqw] transition-colors duration-500",
                i === presence && "bg-accent font-semibold",
              )}
            >
              <span className={cn("size-[0.8cqw] rounded-full", dot)} />
              {text}
            </span>
          ))}
        </div>
      </Layer>
    </Scene>
  );
}

function Meeting({
  joined,
  speaker,
  ringing,
}: {
  joined: boolean;
  speaker: number;
  ringing: boolean;
}) {
  return (
    <div className="relative flex w-[50%] flex-col gap-[0.8cqw] border-r border-border p-[1cqw]">
      <span className="flex items-center justify-between">
        <span className="flex flex-col leading-tight">
          <span className="text-[1.05cqw] font-semibold">Team standup</span>
          <span className="text-[0.72cqw] text-muted-foreground">
            {joined ? "4 participants · recording" : "Joining…"}
          </span>
        </span>
        <span className="flex gap-[0.5cqw] text-muted-foreground">
          <LayoutGrid className="size-[1cqw]" />
          <MoreHorizontal className="size-[1cqw]" />
        </span>
      </span>

      <div className="grid grid-cols-2 gap-[0.5cqw]">
        {PEOPLE.map(({ name, video }, i) => {
          const talking = joined && i === speaker;
          return (
            <div
              key={name}
              className={cn(
                "relative aspect-[16/10] overflow-hidden rounded-[0.8cqw] ring-2 transition-[box-shadow,opacity] duration-500",
                talking ? "ring-primary" : "ring-transparent",
                !joined && "opacity-40",
              )}
            >
              <Image
                src={video}
                alt=""
                fill
                sizes="(min-width: 1152px) 14rem, 25vw"
                loading="eager"
                className="object-cover"
              />
              <span className="absolute bottom-[0.4cqw] left-[0.4cqw] flex items-center gap-[0.3cqw] rounded-[0.35cqw] bg-foreground/75 px-[0.45cqw] py-[0.15cqw] text-[0.65cqw] font-medium text-background">
                {talking ? (
                  <Mic className="size-[0.7cqw] text-primary" />
                ) : null}
                {name}
              </span>
            </div>
          );
        })}
      </div>

      {/* The call surfaces inside the meeting too, without stopping it. */}
      <span
        className={cn(
          "absolute top-[3.6cqw] left-1/2 flex -translate-x-1/2 items-center gap-[0.4cqw] rounded-full bg-foreground px-[0.8cqw] py-[0.35cqw] text-[0.7cqw] font-medium whitespace-nowrap text-background shadow-lg transition-opacity",
          ringing ? "opacity-100 duration-300" : "opacity-0 duration-0",
        )}
      >
        <Phone className="size-[0.75cqw] text-primary" />
        {CALLER.name} is calling
      </span>

      <span className="mt-auto flex items-end justify-center gap-[1cqw]">
        {[
          { icon: Mic, text: "Mute" },
          { icon: Video, text: "Stop video" },
          { icon: ScreenShare, text: "Share" },
          { icon: MoreHorizontal, text: "More" },
        ].map(({ icon, text }) => (
          <span
            key={text}
            className="flex flex-col items-center gap-[0.25cqw] text-[0.6cqw] text-muted-foreground"
          >
            <Control icon={icon} className="w-[2.3cqw]" />
            {text}
          </span>
        ))}
        <span className="flex flex-col items-center gap-[0.25cqw] text-[0.6cqw] text-muted-foreground">
          <Control icon={PhoneOff} hangup className="w-[2.8cqw]" />
          Leave
        </span>
      </span>
    </div>
  );
}

function ChatPanel({ s, replied }: { s: number; replied: boolean }) {
  const shown = CHAT.filter(({ at }) => at <= s);

  return (
    <div className="flex flex-1 flex-col">
      <span className="flex gap-[1.2cqw] border-b border-border px-[1cqw] pt-[1cqw] text-[0.78cqw]">
        {[
          { icon: MessageSquare, text: "Chat", on: true },
          { icon: Users, text: "People (4)" },
          { icon: FileText, text: "Files" },
        ].map(({ icon: Icon, text, on }) => (
          <span
            key={text}
            className={cn(
              "-mb-px flex items-center gap-[0.35cqw] border-b-2 pb-[0.55cqw]",
              on
                ? "border-primary font-semibold text-primary"
                : "border-transparent text-muted-foreground",
            )}
          >
            <Icon className="size-[0.85cqw]" />
            {text}
          </span>
        ))}
      </span>

      <div className="flex h-[23cqw] flex-col justify-end gap-[0.7cqw] overflow-hidden px-[1cqw] py-[0.8cqw]">
        {shown.map((message) =>
          message.who ? (
            <span key={message.time} className="flex items-start gap-[0.6cqw]">
              <Portrait src={message.photo!} className="w-[2cqw]" />
              <span className="flex min-w-0 flex-col gap-[0.3cqw]">
                <span className="flex items-baseline gap-[0.4cqw]">
                  <span className="text-[0.75cqw] font-semibold">
                    {message.who}
                  </span>
                  <span className="text-[0.6cqw] text-muted-foreground">
                    {message.time}
                  </span>
                </span>
                <span className="w-fit rounded-[0.6cqw] bg-muted px-[0.6cqw] py-[0.4cqw] text-[0.72cqw] leading-snug">
                  {message.text}
                </span>
                {message.file ? (
                  <span className="flex w-fit items-center gap-[0.5cqw] rounded-[0.6cqw] px-[0.6cqw] py-[0.4cqw] ring-1 ring-border">
                    <span className="flex size-[1.7cqw] items-center justify-center rounded-[0.4cqw] bg-primary text-primary-foreground">
                      <FileText className="size-1/2" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[0.68cqw] font-semibold">
                        {message.file}
                      </span>
                      <span className="text-[0.58cqw] text-muted-foreground">
                        2.4 MB
                      </span>
                    </span>
                  </span>
                ) : null}
              </span>
            </span>
          ) : (
            <span
              key={message.time}
              className="flex flex-col items-end gap-[0.2cqw] self-end rounded-[0.6cqw] bg-accent px-[0.6cqw] py-[0.4cqw] text-[0.72cqw]"
            >
              {message.text}
              <span className="flex items-center gap-[0.2cqw] text-[0.58cqw] text-muted-foreground">
                {message.time}
                <CheckCheck className="size-[0.7cqw] text-primary" />
              </span>
            </span>
          ),
        )}
      </div>

      <span className="mt-auto flex items-center gap-[0.6cqw] border-t border-border px-[1cqw] py-[0.7cqw]">
        <Paperclip className="size-[0.95cqw] text-muted-foreground" />
        <span className="flex flex-1 items-center justify-between rounded-[0.6cqw] px-[0.6cqw] py-[0.45cqw] text-[0.7cqw] text-muted-foreground ring-1 ring-border">
          {replied ? "Message sent to Neha" : "Type a message…"}
          <Smile className="size-[0.85cqw]" />
        </span>
        <span className="flex size-[2cqw] items-center justify-center rounded-[0.6cqw] bg-primary text-primary-foreground">
          <Send className="size-[45%]" />
        </span>
      </span>
    </div>
  );
}
