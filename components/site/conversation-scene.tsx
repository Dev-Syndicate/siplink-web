"use client";

import {
  CheckCheck,
  MoreHorizontal,
  Paperclip,
  Phone,
  PhoneCall,
  Search,
  Send,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

import {
  Joint,
  Layer,
  Portrait,
  Scene,
  ScenePill,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Conversation visibility, as one customer thread filling in.
 *
 * Replaces the static render of the same composition. The still image showed
 * a finished inbox; the scene shows why it matters — messages and a call land
 * in one shared thread as they happen, the AI notes write themselves from
 * it, and the whole sales team can see where things stand without asking.
 *
 * Stage and parallax come from scene-kit. The customers are the ones who
 * appear across the rest of this page.
 */

const ASSETS = "/solns-salesTeam/scene";
const TEAM_ASSETS = "/solns-remoteWorkforce/scene";

const KRISTINE = {
  name: "Kristine Yee",
  number: "+1 (415) 555-0132",
  photo: `${ASSETS}/kristine.webp`,
};

type Message =
  | { kind: "in" | "out"; text: string; time: string }
  | { kind: "call"; text: string; time: string };

/** The thread, in order. Each entry lands on its own second. */
const THREAD: { at: number; message: Message }[] = [
  {
    at: 0,
    message: {
      kind: "in",
      text: "Hi, following up on the proposal we discussed last week.",
      time: "10:02 AM",
    },
  },
  {
    at: 2,
    message: {
      kind: "out",
      text: "Sure — I'll share the updated deck with the revised timelines.",
      time: "10:04 AM",
    },
  },
  {
    at: 3,
    message: {
      kind: "in",
      text: "Great. Can we talk it through on a quick call?",
      time: "10:06 AM",
    },
  },
  {
    at: 5,
    message: {
      kind: "call",
      text: "Call · 12 min · recorded",
      time: "10:24 AM",
    },
  },
];

const NOTES = {
  updates: [
    "Kristine approved the preliminary designs.",
    "Wants the expansion plan phased over two quarters.",
  ],
  actions: ["Send revised pricing by Friday.", "Book a demo for next week."],
};

/** The notes fill in after the call: a line a second from here. */
const NOTES_AT = 6;
const LOOP_S = 12;

const INBOX: {
  name: string;
  preview: string;
  when: string;
  photo?: string;
  unread?: number;
}[] = [
  {
    name: "Acme Retail",
    preview: "Can we schedule a demo this week?",
    when: "9:41 AM",
  },
  {
    name: "Rahul Mehta",
    preview: "Perfect, that works for us.",
    when: "Yesterday",
    photo: `${ASSETS}/rahul.webp`,
  },
  {
    name: "Sunrise Logistics",
    preview: "Could you share the pricing details?",
    when: "Yesterday",
  },
  {
    name: "Neha Kapoor",
    preview: "We're interested in the enterprise plan.",
    when: "Sep 21",
    photo: `${ASSETS}/neha.webp`,
  },
];

export function ConversationScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the finished thread and notes.
  const s = still ? LOOP_S - 1 : t % LOOP_S;
  const shown = THREAD.filter(({ at }) => at <= s).map(
    ({ message }) => message,
  );
  const typing = !still && (s === 1 || s === 4);
  const notes = Math.max(0, s - NOTES_AT + 1);
  const last = shown[shown.length - 1];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/740]"
      wires={[{ from: "thread", to: "team", lit: notes > 0 }]}
    >
      <Layer className="top-[5%] left-[4%] w-[76%]" depth={0.35} order={10}>
        <div className="flex overflow-hidden rounded-[1.6cqw] border border-border bg-card shadow-2xl shadow-primary/15">
          {/* Inbox */}
          <div className="flex w-[38%] flex-col gap-[0.7cqw] border-r border-border p-[1.3cqw]">
            <span className="text-[1.5cqw] font-semibold">Conversations</span>
            <span className="flex items-center gap-[0.5cqw] rounded-full bg-muted px-[0.9cqw] py-[0.5cqw] text-[0.8cqw] text-muted-foreground">
              <Search className="size-[0.9cqw]" />
              Search conversations…
            </span>
            <span className="flex gap-[0.5cqw] text-[0.75cqw]">
              {["All", "Unread", "Open", "Closed"].map((tab, i) => (
                <span
                  key={tab}
                  className={cn(
                    "rounded-full px-[0.8cqw] py-[0.25cqw] ring-1",
                    i === 0
                      ? "bg-primary text-primary-foreground ring-primary"
                      : "ring-border",
                  )}
                >
                  {tab}
                </span>
              ))}
            </span>

            <div className="flex flex-col gap-[0.2cqw]">
              {/* Kristine's row tracks the thread as it grows. */}
              <InboxRow
                name={KRISTINE.name}
                photo={KRISTINE.photo}
                preview={
                  typing
                    ? "Typing…"
                    : last.kind === "call"
                      ? "Call · 12 min"
                      : last.text
                }
                when={last.time}
                unread={shown.filter((m) => m.kind === "in").length}
                current
              />
              {INBOX.map((row) => (
                <InboxRow key={row.name} {...row} />
              ))}
            </div>
          </div>

          {/* Thread */}
          <div className="flex flex-1 flex-col">
            <span className="flex items-center gap-[0.8cqw] border-b border-border px-[1.3cqw] py-[0.9cqw]">
              <Portrait src={KRISTINE.photo} className="w-[3cqw]" />
              <span className="flex flex-col leading-tight">
                <span className="text-[1.1cqw] font-semibold">
                  {KRISTINE.name}
                </span>
                <span className="text-[0.75cqw] text-muted-foreground tabular-nums">
                  {KRISTINE.number}
                </span>
              </span>
              <span className="ml-auto flex gap-[0.6cqw]">
                {[Phone, Video, MoreHorizontal].map((Icon, i) => (
                  <span
                    key={i}
                    className="flex size-[2.4cqw] items-center justify-center rounded-full bg-muted text-primary"
                  >
                    <Icon className="size-[45%]" />
                  </span>
                ))}
              </span>
            </span>

            <div className="flex h-[17cqw] flex-col justify-end gap-[0.6cqw] overflow-hidden px-[1.3cqw] py-[0.9cqw]">
              {shown.map((message) => (
                <Bubble key={message.time} message={message} />
              ))}
              {typing ? (
                <span
                  className={cn(
                    "flex w-fit gap-[0.3cqw] rounded-[0.9cqw] px-[0.9cqw] py-[0.7cqw]",
                    s === 1 ? "self-end bg-accent" : "bg-muted",
                  )}
                >
                  {[0, 0.15, 0.3].map((delay) => (
                    <span
                      key={delay}
                      className="wave-bar size-[0.45cqw] rounded-full bg-muted-foreground/60"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </span>
              ) : null}
            </div>

            <span className="flex items-center gap-[0.7cqw] border-t border-border px-[1.3cqw] py-[0.7cqw]">
              <Paperclip className="size-[1.1cqw] text-muted-foreground" />
              <span className="flex-1 rounded-[0.7cqw] px-[0.8cqw] py-[0.55cqw] text-[0.8cqw] text-muted-foreground ring-1 ring-border">
                Type a message…
              </span>
              <span className="flex size-[2.4cqw] items-center justify-center rounded-[0.7cqw] bg-primary text-primary-foreground">
                <Send className="size-[45%]" />
              </span>
            </span>

            {/* AI notes */}
            <div className="relative border-t border-border bg-muted/30 px-[1.3cqw] py-[0.9cqw]">
              <Joint
                id="thread"
                side="r"
                left="100%"
                top="50%"
                lit={notes > 0}
              />
              <span className="flex gap-[1.4cqw] text-[0.8cqw]">
                <span className="flex items-center gap-[0.35cqw] border-b-2 border-primary pb-[0.3cqw] font-semibold text-primary">
                  <Sparkles className="size-[0.85cqw]" />
                  AI notes
                </span>
                <span className="pb-[0.3cqw] text-muted-foreground">
                  AI transcript
                </span>
              </span>
              <div className="mt-[0.7cqw] grid h-[6.4cqw] grid-cols-2 gap-[1.2cqw] text-[0.75cqw]">
                <NoteList
                  title="Key updates"
                  items={NOTES.updates}
                  shown={Math.min(notes, NOTES.updates.length)}
                />
                <NoteList
                  title="Action items"
                  items={NOTES.actions}
                  shown={Math.max(0, notes - NOTES.updates.length)}
                />
              </div>
            </div>
          </div>
        </div>
      </Layer>

      {/* Who else can see it */}
      <Layer
        className="top-[58%] left-[83%] w-[15%]"
        depth={0.9}
        order={30}
        active={notes > 0}
        joints={[{ id: "team", side: "l", left: "0%", top: "50%" }]}
        lit={notes > 0}
      >
        <div className="flex flex-col gap-[0.6cqw] rounded-[1.2cqw] border border-border bg-card p-[0.9cqw] shadow-xl shadow-primary/20">
          <ScenePill
            icon={Users}
            label="Sales team"
            className="w-fit shadow-none"
          />
          <span className="flex -space-x-[0.6cqw] pl-[0.2cqw]">
            {["team-william", "team-ida", "team-lei", "team-aarushi"].map(
              (who) => (
                <Portrait
                  key={who}
                  src={`${TEAM_ASSETS}/${who}.webp`}
                  className="w-[2.2cqw]"
                />
              ),
            )}
          </span>
          <span className="text-[0.72cqw] leading-snug text-muted-foreground">
            {notes > 0
              ? "Everyone sees the thread and notes."
              : "Watching this thread"}
          </span>
        </div>
      </Layer>
    </Scene>
  );
}

function InboxRow({
  name,
  preview,
  when,
  photo,
  unread,
  current,
}: {
  name: string;
  preview: string;
  when: string;
  photo?: string;
  unread?: number;
  current?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-[0.8cqw] rounded-[0.9cqw] px-[0.7cqw] py-[0.6cqw]",
        current && "bg-accent",
      )}
    >
      {photo ? (
        <Portrait src={photo} className="w-[2.8cqw]" />
      ) : (
        <span className="flex size-[2.8cqw] shrink-0 items-center justify-center rounded-full bg-muted text-[1.1cqw] font-semibold text-foreground/70">
          {name[0]}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="flex items-center justify-between gap-[0.5cqw]">
          <span className="text-[0.95cqw] font-semibold">{name}</span>
          <span className="text-[0.68cqw] text-muted-foreground">{when}</span>
        </span>
        <span className="flex items-center justify-between gap-[0.5cqw]">
          <span
            className={cn(
              "truncate text-[0.78cqw]",
              current ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {preview}
          </span>
          {unread ? (
            <span className="flex size-[1.3cqw] shrink-0 items-center justify-center rounded-full bg-primary text-[0.65cqw] font-semibold text-primary-foreground">
              {unread}
            </span>
          ) : null}
        </span>
      </span>
    </span>
  );
}

function Bubble({ message }: { message: Message }) {
  if (message.kind === "call") {
    return (
      <span className="flex items-center gap-[0.5cqw] self-center rounded-full bg-accent px-[0.9cqw] py-[0.35cqw] text-[0.75cqw] font-medium text-accent-foreground ring-1 ring-primary/25">
        <PhoneCall className="size-[0.85cqw]" />
        {message.text}
        <span className="text-muted-foreground">· {message.time}</span>
      </span>
    );
  }

  const out = message.kind === "out";
  return (
    <span
      className={cn(
        "flex max-w-[70%] flex-col gap-[0.3cqw] rounded-[0.9cqw] px-[0.9cqw] py-[0.6cqw] text-[0.85cqw] leading-snug",
        out ? "self-end bg-accent" : "bg-muted",
      )}
    >
      {message.text}
      <span className="flex items-center gap-[0.25cqw] self-end text-[0.62cqw] text-muted-foreground">
        {message.time}
        {out ? <CheckCheck className="size-[0.8cqw] text-primary" /> : null}
      </span>
    </span>
  );
}

function NoteList({
  title,
  items,
  shown,
}: {
  title: string;
  items: string[];
  shown: number;
}) {
  return (
    <div className="flex flex-col gap-[0.35cqw]">
      <span className="font-semibold">{title}</span>
      {items.map((item, i) => (
        <span
          key={item}
          className={cn(
            "flex gap-[0.4cqw] leading-snug text-muted-foreground transition-opacity duration-500",
            i < shown ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="mt-[0.45cqw] size-[0.35cqw] shrink-0 rounded-full bg-primary" />
          {item}
        </span>
      ))}
    </div>
  );
}
