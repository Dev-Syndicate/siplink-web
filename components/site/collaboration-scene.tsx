"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import {
  Bell,
  Calendar,
  CheckSquare,
  ChevronRight,
  FileImage,
  FileText,
  Hash,
  Home,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Paperclip,
  Phone,
  PhoneOff,
  Search,
  Send,
  Smile,
  UserPlus,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

import {
  AppNav,
  Joint,
  Layer,
  Portrait,
  Scene,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Collaboration in one place, as one channel doing the work of several apps.
 *
 * Replaces the static render of the same composition. The still image listed
 * calls, meetings, messaging, files, calendar and tasks beside a workspace;
 * the scene shows each of them happening inside the same channel — a message,
 * a shared file, a meeting started from the thread, the next meeting on the
 * calendar — while the list lights up whichever one is in use.
 *
 * Stage, parallax and wiring come from scene-kit. The people are the ones
 * from the meeting on this page.
 */

const ASSETS = "/solns-unifiedComm/scene";

const PHOTO = {
  kristine: `${ASSETS}/kristine.webp`,
  james: `${ASSETS}/james.webp`,
  rahul: `${ASSETS}/rahul.webp`,
  priya: `${ASSETS}/priya.webp`,
};

type Feature =
  | "Calls"
  | "Video meetings"
  | "Team messaging"
  | "File sharing"
  | "Calendar & meetings"
  | "Tasks";

const FEATURES: { label: Feature; icon: LucideIcon }[] = [
  { label: "Calls", icon: Phone },
  { label: "Video meetings", icon: Video },
  { label: "Team messaging", icon: MessageSquare },
  { label: "File sharing", icon: FileText },
  { label: "Calendar & meetings", icon: Calendar },
  { label: "Tasks", icon: CheckSquare },
];

/** Each beat is one kind of work, three seconds apiece. */
const BEATS: Feature[] = [
  "Team messaging",
  "File sharing",
  "Video meetings",
  "Calendar & meetings",
];
const BEAT_S = 3;

const CHANNELS: {
  name: string;
  preview: string;
  when: string;
  icon: LucideIcon;
  unread?: number;
}[] = [
  {
    name: "Product team",
    preview: "You: Updated the design file…",
    when: "10:24 AM",
    icon: Users,
    unread: 2,
  },
  {
    name: "Marketing",
    preview: "Sarah: Campaign assets ready!",
    when: "9:41 AM",
    icon: Megaphone,
  },
  { name: "Design sync", preview: "", when: "", icon: Hash },
  {
    name: "General",
    preview: "Priya: Welcome to the team!",
    when: "Yesterday",
    icon: Hash,
  },
  {
    name: "Client – BrightPath",
    preview: "Rahul: Call scheduled",
    when: "Yesterday",
    icon: Hash,
  },
];

export function CollaborationScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests with every beat played.
  const s = still ? BEAT_S * BEATS.length - 1 : t % (BEAT_S * BEATS.length);
  const beat = Math.floor(s / BEAT_S);
  const feature = BEATS[beat];

  const fileShared = beat >= 1;
  const meeting = beat === 2 && s % BEAT_S >= 1;
  const calendar = beat === 3;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/800]"
      wires={[
        { from: "feature", to: "workspace", lit: true },
        { from: "pip", to: "thread-meet", lit: meeting },
      ]}
    >
      {/* What the channel is being used for */}
      <Layer className="top-[10%] left-[2%] w-[16%]" depth={0.85} order={30}>
        <div className="flex flex-col gap-[0.45cqw]">
          {FEATURES.map(({ label: text, icon: Icon }) => {
            const on = text === feature;
            return (
              <span
                key={text}
                className={cn(
                  "relative flex items-center gap-[0.7cqw] rounded-[0.9cqw] border bg-card px-[0.8cqw] py-[0.7cqw] text-[0.9cqw] shadow-sm transition-[border-color,box-shadow,font-weight] duration-500",
                  on
                    ? "border-primary/40 font-semibold shadow-lg shadow-primary/25"
                    : "border-border",
                )}
              >
                <span
                  className={cn(
                    "flex size-[2.1cqw] items-center justify-center rounded-[0.55cqw] transition-colors duration-500",
                    on
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-primary",
                  )}
                >
                  <Icon className="size-1/2" />
                </span>
                {text}
                {on ? (
                  <Joint id="feature" side="r" left="100%" top="50%" lit />
                ) : null}
              </span>
            );
          })}
        </div>
      </Layer>

      <Layer
        className="top-[7%] left-[21%] w-[77%]"
        depth={0.35}
        order={10}
        joints={[{ id: "workspace", side: "l", left: "0%", top: "40%" }]}
        lit
      >
        <Workspace
          beat={beat}
          fileShared={fileShared}
          meeting={meeting}
          calendar={calendar}
        />
      </Layer>

      {/* The meeting started from the thread */}
      <Layer
        className="top-[62%] left-[16%] w-[20%]"
        depth={1}
        order={40}
        active={meeting}
        joints={
          beat >= 2 ? [{ id: "pip", side: "r", left: "100%", top: "40%" }] : []
        }
        lit={meeting}
      >
        <div
          className={cn(
            "overflow-hidden rounded-[1.1cqw] bg-foreground p-[0.4cqw] shadow-2xl shadow-primary/25 transition-[opacity,translate] duration-500",
            beat >= 2 ? "opacity-100" : "translate-y-[1cqw] opacity-0",
          )}
        >
          <div className="grid grid-cols-2 gap-[0.3cqw]">
            {["kristine", "james", "rahul", "priya"].map((who) => (
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
            {[Mic, Video, LayoutGrid, MoreHorizontal].map((Icon, i) => (
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
    </Scene>
  );
}

function Workspace({
  beat,
  fileShared,
  meeting,
  calendar,
}: {
  beat: number;
  fileShared: boolean;
  meeting: boolean;
  calendar: boolean;
}) {
  const nav = ["Messages", "Files", "Meetings", "Calendar"][beat];

  return (
    <div className="flex flex-col overflow-hidden rounded-[1.6cqw] border border-border bg-card shadow-2xl shadow-primary/15">
      <span className="flex items-center gap-[1cqw] border-b border-border px-[1.1cqw] py-[0.7cqw]">
        <span className="flex flex-1 items-center gap-[0.5cqw] rounded-full bg-muted px-[0.9cqw] py-[0.4cqw] text-[0.75cqw] text-muted-foreground">
          <Search className="size-[0.85cqw]" />
          Search messages, people, files…
        </span>
        <span className="flex items-center gap-[0.4cqw] rounded-full px-[0.7cqw] py-[0.3cqw] text-[0.75cqw] font-medium ring-1 ring-border">
          <span className="size-[0.55cqw] rounded-full bg-primary" />
          {meeting ? "In a meeting" : "Available"}
        </span>
        <Bell className="size-[1cqw] text-muted-foreground" />
        <Portrait src={PHOTO.kristine} className="w-[1.8cqw]" />
      </span>

      <div className="flex">
        <AppNav
          className="w-[15%] border-r"
          active={nav}
          items={[
            { icon: Home, label: "Home" },
            { icon: Phone, label: "Calls" },
            { icon: Video, label: "Meetings" },
            { icon: MessageSquare, label: "Messages", badge: 3 },
            { icon: FileText, label: "Files" },
            { icon: Calendar, label: "Calendar" },
            { icon: CheckSquare, label: "Tasks" },
          ]}
        />

        {/* Channels */}
        <div className="flex w-[24%] flex-col gap-[0.2cqw] border-r border-border p-[0.8cqw]">
          <span className="mb-[0.4cqw] px-[0.3cqw] text-[0.95cqw] font-semibold">
            Team
          </span>
          {CHANNELS.map(({ name, preview, when, icon: Icon, unread }) => {
            const current = name === "Design sync";
            return (
              <span
                key={name}
                className={cn(
                  "flex items-center gap-[0.55cqw] rounded-[0.7cqw] px-[0.5cqw] py-[0.5cqw]",
                  current && "bg-accent",
                )}
              >
                <span className="flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-muted text-foreground/70">
                  <Icon className="size-1/2" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="flex justify-between gap-[0.3cqw]">
                    <span className="truncate text-[0.75cqw] font-semibold">
                      {name}
                    </span>
                    <span className="shrink-0 text-[0.58cqw] text-muted-foreground">
                      {current ? "Now" : when}
                    </span>
                  </span>
                  <span className="truncate text-[0.62cqw] text-muted-foreground">
                    {current ? latest(beat) : preview}
                  </span>
                </span>
                {unread ? (
                  <span className="flex size-[1.1cqw] shrink-0 items-center justify-center rounded-full bg-primary text-[0.55cqw] font-semibold text-primary-foreground">
                    {unread}
                  </span>
                ) : null}
              </span>
            );
          })}
        </div>

        {/* Thread */}
        <div className="flex flex-1 flex-col border-r border-border">
          <span className="flex items-center gap-[0.6cqw] border-b border-border px-[1cqw] py-[0.65cqw]">
            <span className="flex size-[2.2cqw] items-center justify-center rounded-full bg-accent text-[1cqw] font-semibold text-primary">
              D
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[0.9cqw] font-semibold">Design sync</span>
              <span className="text-[0.62cqw] text-muted-foreground">
                4 members
              </span>
            </span>
            <span className="ml-auto flex gap-[0.7cqw] text-muted-foreground">
              <Video className="size-[0.95cqw]" />
              <Phone className="size-[0.95cqw]" />
              <Search className="size-[0.95cqw]" />
            </span>
          </span>

          <div className="flex h-[22cqw] flex-col justify-end gap-[0.7cqw] overflow-hidden px-[1cqw] py-[0.8cqw]">
            <Post
              photo={PHOTO.james}
              who="James Park"
              time="10:08 AM"
              text="Here's the latest design for the landing page."
            >
              {fileShared ? (
                <span className="flex w-fit items-center gap-[0.5cqw] rounded-[0.6cqw] px-[0.6cqw] py-[0.4cqw] ring-1 ring-border">
                  <span className="flex size-[1.7cqw] items-center justify-center rounded-[0.4cqw] bg-accent text-primary">
                    <FileImage className="size-1/2" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[0.68cqw] font-semibold">
                      Landing_page_v3.fig
                    </span>
                    <span className="text-[0.58cqw] text-muted-foreground">
                      2.4 MB
                    </span>
                  </span>
                </span>
              ) : (
                <span className="flex w-fit items-center gap-[0.4cqw] text-[0.65cqw] text-primary">
                  <Paperclip className="size-[0.75cqw]" />
                  Uploading…
                </span>
              )}
            </Post>
            {beat >= 2 ? (
              <Post
                photo={PHOTO.priya}
                who="Priya Sharma"
                time="10:12 AM"
                text="Looks great! Let's review it together on a quick call?"
              >
                <span
                  className={cn(
                    "relative flex w-[80%] items-center gap-[0.6cqw] rounded-[0.7cqw] px-[0.7cqw] py-[0.55cqw] ring-1 transition-colors duration-500",
                    meeting
                      ? "bg-primary text-primary-foreground ring-primary"
                      : "bg-accent ring-primary/25",
                  )}
                >
                  <Joint
                    id="thread-meet"
                    side="l"
                    left="0%"
                    top="50%"
                    lit={meeting}
                  />
                  <span
                    className={cn(
                      "flex size-[1.9cqw] items-center justify-center rounded-[0.5cqw]",
                      meeting
                        ? "bg-card text-primary"
                        : "bg-primary text-primary-foreground",
                    )}
                  >
                    <Video className="size-1/2" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[0.75cqw] font-semibold">
                      {meeting
                        ? "Meeting in progress"
                        : "Start a video meeting"}
                    </span>
                    <span
                      className={cn(
                        "text-[0.6cqw]",
                        meeting ? "opacity-85" : "text-muted-foreground",
                      )}
                    >
                      {meeting ? "4 people joined" : "Join in one click"}
                    </span>
                  </span>
                  <ChevronRight className="ml-auto size-[0.9cqw]" />
                </span>
              </Post>
            ) : null}
            {beat >= 3 ? (
              <Post
                photo={PHOTO.rahul}
                who="Rahul Mehta"
                time="10:15 AM"
                text="Booked the design review for 11 — it's on everyone's calendar."
              />
            ) : null}
          </div>

          <span className="mt-auto flex items-center gap-[0.6cqw] border-t border-border px-[1cqw] py-[0.65cqw]">
            <Paperclip className="size-[0.9cqw] text-muted-foreground" />
            <span className="flex flex-1 items-center justify-between rounded-[0.6cqw] px-[0.6cqw] py-[0.4cqw] text-[0.68cqw] text-muted-foreground ring-1 ring-border">
              Type a message…
              <Smile className="size-[0.8cqw]" />
            </span>
            <span className="flex size-[1.9cqw] items-center justify-center rounded-[0.6cqw] bg-primary text-primary-foreground">
              <Send className="size-[45%]" />
            </span>
          </span>
        </div>

        {/* Details */}
        <div className="flex w-[25%] flex-col gap-[0.8cqw] p-[0.9cqw]">
          <span className="flex flex-col items-center gap-[0.2cqw] text-center">
            <span className="flex size-[2.8cqw] items-center justify-center rounded-full bg-accent text-[1.2cqw] font-semibold text-primary">
              D
            </span>
            <span className="text-[0.85cqw] font-semibold">Design sync</span>
            <span className="text-[0.6cqw] text-muted-foreground">
              Project discussion and design updates
            </span>
          </span>
          <span className="flex justify-around">
            {[
              { icon: Video, text: "Meet" },
              { icon: Phone, text: "Call" },
              { icon: UserPlus, text: "Add" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex flex-col items-center gap-[0.2cqw] text-[0.58cqw] text-muted-foreground"
              >
                <span className="flex size-[1.9cqw] items-center justify-center rounded-full bg-muted text-foreground/70">
                  <Icon className="size-1/2" />
                </span>
                {text}
              </span>
            ))}
          </span>

          <span className="flex flex-col gap-[0.4cqw]">
            <span className="flex items-center gap-[0.35cqw] text-[0.72cqw] font-semibold">
              <Calendar className="size-[0.8cqw] text-primary" />
              Upcoming meeting
            </span>
            <span
              className={cn(
                "flex items-center gap-[0.5cqw] rounded-[0.6cqw] px-[0.55cqw] py-[0.5cqw] ring-1 transition-colors duration-500",
                calendar ? "bg-accent ring-primary/30" : "ring-border",
              )}
            >
              <span className="flex flex-col leading-tight">
                <span className="text-[0.68cqw] font-semibold">
                  {calendar ? "Design review" : "Weekly planning"}
                </span>
                <span className="text-[0.58cqw] text-muted-foreground">
                  {calendar ? "Today, 11:00 – 11:30 AM" : "Friday, 2:00 PM"}
                </span>
              </span>
              <span className="ml-auto rounded-[0.35cqw] bg-primary px-[0.45cqw] py-[0.15cqw] text-[0.58cqw] font-medium text-primary-foreground">
                Join
              </span>
            </span>
          </span>

          <span className="flex flex-col gap-[0.35cqw]">
            <span className="text-[0.72cqw] font-semibold">Shared files</span>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500",
                fileShared
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <SharedFile
                  icon={FileImage}
                  name="Landing_page_v3.fig"
                  meta="2.4 MB · 10:08 AM"
                  fresh={beat === 1}
                />
              </div>
            </div>
            <SharedFile
              icon={FileText}
              name="Brand_guidelines.pdf"
              meta="4.1 MB · Sep 21"
            />
            <SharedFile
              icon={FileText}
              name="Design_notes.docx"
              meta="1.8 MB · Sep 20"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

function latest(beat: number) {
  return [
    "James: Here's the latest design…",
    "James shared Landing_page_v3.fig",
    "Priya started a video meeting",
    "Rahul: Booked the design review",
  ][beat];
}

function Post({
  photo,
  who,
  time,
  text,
  children,
}: {
  photo: string;
  who: string;
  time: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <span className="flex items-start gap-[0.6cqw]">
      <Portrait src={photo} className="w-[2.1cqw]" />
      <span className="flex min-w-0 flex-1 flex-col gap-[0.3cqw]">
        <span className="flex items-baseline gap-[0.4cqw]">
          <span className="text-[0.75cqw] font-semibold">{who}</span>
          <span className="text-[0.6cqw] text-muted-foreground">{time}</span>
        </span>
        <span className="w-fit rounded-[0.6cqw] bg-muted px-[0.6cqw] py-[0.4cqw] text-[0.72cqw] leading-snug">
          {text}
        </span>
        {children}
      </span>
    </span>
  );
}

function SharedFile({
  icon: Icon,
  name,
  meta,
  fresh,
}: {
  icon: LucideIcon;
  name: string;
  meta: string;
  fresh?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-[0.5cqw] rounded-[0.5cqw] px-[0.4cqw] py-[0.3cqw] transition-colors duration-500",
        fresh && "bg-accent",
      )}
    >
      <span className="flex size-[1.6cqw] shrink-0 items-center justify-center rounded-[0.4cqw] bg-accent text-primary">
        <Icon className="size-1/2" />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-[0.65cqw] font-semibold">{name}</span>
        <span className="text-[0.56cqw] text-muted-foreground">{meta}</span>
      </span>
    </span>
  );
}
