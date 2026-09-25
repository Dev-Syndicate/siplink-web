"use client";

import {
  BarChart3,
  BatteryFull,
  Building2,
  Calendar,
  CheckSquare,
  ChevronDown,
  Clock,
  Contact,
  FileText,
  Handshake,
  MessageSquare,
  MoreHorizontal,
  Phone,
  PhoneIncoming,
  PhoneOff,
  PhoneOutgoing,
  Play,
  Plus,
  Search,
  Settings,
  Signal,
  Wifi,
} from "lucide-react";

import {
  Joint,
  Layer,
  Portrait,
  Scene,
  Wave,
  clock,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Professional business numbers, as one outbound call on the company line.
 *
 * Replaces the static render of the same composition. The still image showed
 * a dialler and a call log; the scene shows the point of it — the rep dials
 * from the "Northwind Sales" business line, the customer sees that line and
 * not a personal mobile, and the call lands in the shared log with the
 * business number, duration, recording and summary on it.
 *
 * Stage, parallax and wiring come from scene-kit. The customers are the ones
 * who appear across the rest of this page.
 */

const ASSETS = "/solns-salesTeam/scene";

const LINE = { name: "Northwind Sales", number: "+1 (212) 555-0180" };
const CUSTOMER = {
  name: "Kristine Yee",
  company: "Acme Retail",
  photo: `${ASSETS}/kristine.webp`,
};

/** The customer's number, typed a group at a time. */
const DIGITS = ["415", "555", "0132"];

/** 0–2 dial, 3 ring, 4–8 talk, 9–11 wrap up. */
const LOOP_S = 12;

const KEYS: [string, string][] = [
  ["1", ""],
  ["2", "ABC"],
  ["3", "DEF"],
  ["4", "GHI"],
  ["5", "JKL"],
  ["6", "MNO"],
  ["7", "PQRS"],
  ["8", "TUV"],
  ["9", "WXYZ"],
  ["*", ""],
  ["0", "+"],
  ["#", ""],
];

const HISTORY: {
  name: string;
  company: string;
  photo?: string;
  when: string;
  length: string;
  inbound?: boolean;
}[] = [
  {
    name: "James Park",
    company: "Vertex Solutions",
    when: "9:41 AM",
    length: "4m 12s",
  },
  {
    name: "Priya Sharma",
    company: "Sunrise Logistics",
    photo: `${ASSETS}/priya.webp`,
    when: "Yesterday",
    length: "6m 03s",
    inbound: true,
  },
  {
    name: "Michael Tan",
    company: "Urban Stores",
    when: "Yesterday",
    length: "1m 47s",
  },
  {
    name: "Rahul Mehta",
    company: "Global Traders",
    photo: `${ASSETS}/rahul.webp`,
    when: "Sep 21",
    length: "3m 56s",
  },
];

type Phase = "dialling" | "ringing" | "talking" | "done";

export function BusinessNumbersScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests mid-call.
  const s = still ? 6 : t % LOOP_S;
  const phase: Phase =
    s < 3 ? "dialling" : s < 4 ? "ringing" : s < 9 ? "talking" : "done";
  const typed = phase === "dialling" ? s + 1 : DIGITS.length;
  const elapsed = still
    ? 24
    : phase === "talking"
      ? s - 3
      : phase === "done"
        ? 5
        : 0;
  const live = phase === "ringing" || phase === "talking";

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/930]"
      wires={[
        { from: "phone-line", to: "line-box", lit: live },
        { from: "phone-out", to: "caller-id", lit: live },
      ]}
    >
      <Layer
        className="top-[5%] left-[3%] w-[22%]"
        depth={0.8}
        order={40}
        glow={live}
        joints={[
          { id: "phone-line", side: "r", left: "100%", top: "24%" },
          { id: "phone-out", side: "r", left: "100%", top: "78%" },
        ]}
        lit={live}
      >
        <Dialler phase={phase} typed={typed} elapsed={elapsed} />
      </Layer>

      <Layer className="top-[5%] left-[28%] w-[69%]" depth={0.35} order={10}>
        <CallLog phase={phase} elapsed={elapsed} />
      </Layer>

      {/* What the customer's phone shows. */}
      <Layer
        className="top-[74%] left-[29%] w-[21%]"
        depth={1}
        order={50}
        active={phase === "ringing"}
        joints={[{ id: "caller-id", side: "l", left: "0%", top: "50%" }]}
        lit={live}
      >
        <div className="flex items-center gap-[0.8cqw] rounded-[1.2cqw] border border-border bg-card p-[0.9cqw] shadow-xl shadow-primary/20">
          <span
            className={cn(
              "flex size-[3cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
              phase === "ringing" && "ring-pulse",
            )}
          >
            <Building2 className="size-1/2" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[0.62cqw] tracking-wide text-muted-foreground uppercase">
              {CUSTOMER.name.split(" ")[0]} sees
            </span>
            <span className="text-[0.95cqw] font-semibold">{LINE.name}</span>
            <span className="text-[0.72cqw] text-muted-foreground tabular-nums">
              {LINE.number}
            </span>
          </span>
        </div>
      </Layer>
    </Scene>
  );
}

function Dialler({
  phase,
  typed,
  elapsed,
}: {
  phase: Phase;
  typed: number;
  elapsed: number;
}) {
  const pressing = phase === "dialling" ? DIGITS[typed - 1] : "";
  const number = DIGITS.slice(0, typed);
  const shown =
    number.length === 0
      ? ""
      : `(${number[0]})${number[1] ? ` ${number[1]}` : ""}${number[2] ? `-${number[2]}` : ""}`;

  return (
    <div className="rounded-[2.6cqw] bg-foreground/90 p-[0.5cqw] shadow-2xl shadow-primary/25">
      <div className="relative flex aspect-[9/18.5] flex-col overflow-hidden rounded-[2.2cqw] bg-card">
        <span className="flex items-center justify-between px-[1.4cqw] pt-[0.7cqw] text-[0.75cqw] font-semibold">
          9:41
          <span className="flex items-center gap-[0.2cqw]">
            <Signal className="size-[0.8cqw]" />
            <Wifi className="size-[0.8cqw]" />
            <BatteryFull className="size-[0.9cqw]" />
          </span>
        </span>
        <span className="absolute top-[0.55cqw] left-1/2 h-[1.1cqw] w-[32%] -translate-x-1/2 rounded-full bg-foreground" />

        {/* Caller ID: the business line, chosen once. */}
        <div className="mt-[1.4cqw] flex flex-col items-center gap-[0.3cqw]">
          <span className="flex size-[3.4cqw] items-center justify-center rounded-full bg-accent text-primary">
            <Building2 className="size-1/2" />
          </span>
          <span className="flex items-center gap-[0.3cqw] text-[1.1cqw] font-semibold">
            {LINE.name}
            <ChevronDown className="size-[0.9cqw] text-muted-foreground" />
          </span>
          <span className="text-[0.8cqw] text-muted-foreground tabular-nums">
            {LINE.number}
          </span>
          <span className="flex items-center gap-[0.3cqw] rounded-full bg-accent px-[0.6cqw] py-[0.15cqw] text-[0.65cqw] font-medium text-accent-foreground">
            <span className="size-[0.45cqw] rounded-full bg-primary" />
            Business line
          </span>
        </div>

        {/* The number being dialled, or the call it became. */}
        <div className="mt-[0.9cqw] flex h-[2.6cqw] flex-col items-center justify-center">
          {phase === "dialling" ? (
            <span className="text-[1.35cqw] font-medium tracking-wide tabular-nums">
              {shown}
              <span className="type-caret ml-[0.1cqw] inline-block h-[1.2cqw] w-[0.12cqw] translate-y-[0.15cqw] bg-primary" />
            </span>
          ) : (
            <>
              <span className="text-[0.95cqw] font-semibold">
                {CUSTOMER.name}
              </span>
              <span className="flex items-center gap-[0.35cqw] text-[0.75cqw] text-primary tabular-nums">
                {phase === "talking" ? <Wave /> : null}
                {phase === "ringing"
                  ? "Calling…"
                  : phase === "talking"
                    ? clock(elapsed)
                    : "Call ended"}
              </span>
            </>
          )}
        </div>

        <div className="mt-[0.6cqw] grid grid-cols-3 gap-x-[0.9cqw] gap-y-[0.5cqw] px-[2.8cqw]">
          {KEYS.map(([key, letters]) => {
            const on = pressing.includes(key);
            return (
              <span
                key={key}
                className={cn(
                  "flex aspect-square flex-col items-center justify-center rounded-full transition-colors duration-200",
                  on ? "bg-primary/15 text-primary" : "bg-muted",
                )}
              >
                <span className="text-[1.15cqw] leading-none font-medium">
                  {key}
                </span>
                {letters ? (
                  <span className="text-[0.45cqw] tracking-wider text-muted-foreground">
                    {letters}
                  </span>
                ) : null}
              </span>
            );
          })}
        </div>

        <span
          className={cn(
            "mx-auto mt-auto mb-[2cqw] flex size-[3.4cqw] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40",
            phase === "ringing" && "ring-pulse",
          )}
        >
          {phase === "talking" ? (
            <PhoneOff className="size-[45%]" />
          ) : (
            <Phone className="size-[45%]" />
          )}
        </span>
        <span className="absolute bottom-[0.45cqw] left-1/2 h-[0.3cqw] w-[36%] -translate-x-1/2 rounded-full bg-foreground/80" />
      </div>
    </div>
  );
}

function CallLog({ phase, elapsed }: { phase: Phase; elapsed: number }) {
  const logged = phase !== "dialling";
  const live = phase === "ringing" || phase === "talking";

  return (
    <div className="flex overflow-hidden rounded-[1.6cqw] border border-border bg-card shadow-2xl shadow-primary/15">
      {/* Sidebar */}
      <div className="flex w-[15%] flex-col gap-[0.35cqw] border-r border-border bg-muted/40 p-[0.9cqw] text-[0.78cqw] text-muted-foreground">
        <span className="mb-[0.6cqw] flex items-center gap-[0.5cqw] text-[1cqw] font-semibold text-foreground">
          <span className="flex size-[1.9cqw] items-center justify-center rounded-[0.5cqw] bg-primary text-primary-foreground">
            <Phone className="size-1/2" />
          </span>
          Sales
        </span>
        {[
          { icon: Phone, text: "Calls", on: true },
          { icon: Contact, text: "Contacts" },
          { icon: Handshake, text: "Deals" },
          { icon: CheckSquare, text: "Tasks" },
          { icon: BarChart3, text: "Analytics" },
          { icon: Settings, text: "Settings" },
        ].map(({ icon: Icon, text, on }) => (
          <span
            key={text}
            className={cn(
              "flex items-center gap-[0.45cqw] rounded-[0.5cqw] px-[0.5cqw] py-[0.45cqw]",
              on && "bg-accent font-medium text-accent-foreground",
            )}
          >
            <Icon className={cn("size-[0.9cqw]", on && "text-primary")} />
            {text}
          </span>
        ))}
      </div>

      {/* Recent calls */}
      <div className="flex w-[38%] flex-col border-r border-border p-[0.9cqw]">
        <span className="flex items-center justify-between">
          <span className="text-[1.05cqw] font-semibold">Recent calls</span>
          <span className="flex items-center gap-[0.6cqw] text-muted-foreground">
            <Search className="size-[0.95cqw]" />
            <span className="flex items-center gap-[0.25cqw] rounded-[0.4cqw] bg-muted px-[0.5cqw] py-[0.2cqw] text-[0.7cqw] text-foreground">
              All calls
              <ChevronDown className="size-[0.7cqw]" />
            </span>
          </span>
        </span>

        <div className="mt-[0.8cqw] flex flex-col gap-[0.3cqw]">
          {/* The new call opens a row at the top of the log. */}
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-500",
              logged
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <CallRow
                name={CUSTOMER.name}
                company={CUSTOMER.company}
                photo={CUSTOMER.photo}
                when={live ? "Now" : "10:24 AM"}
                length={live ? clock(elapsed) : "0m 05s"}
                fresh
                live={live}
              />
            </div>
          </div>
          {HISTORY.map((row) => (
            <CallRow key={row.name} {...row} />
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="flex flex-1 flex-col gap-[0.8cqw] p-[1.1cqw]">
        <span className="flex items-start gap-[0.9cqw]">
          <Portrait src={CUSTOMER.photo} className="w-[4cqw]" />
          <span className="flex flex-col leading-tight">
            <span className="text-[1.15cqw] font-semibold">
              {CUSTOMER.name}
            </span>
            <span className="text-[0.85cqw] text-muted-foreground">
              {CUSTOMER.company}
            </span>
            <span className="mt-[0.2cqw] w-fit rounded-full bg-accent px-[0.5cqw] text-[0.65cqw] font-medium text-accent-foreground">
              Lead
            </span>
          </span>
          <MoreHorizontal className="ml-auto size-[1cqw] text-muted-foreground" />
        </span>

        <span className="flex justify-between px-[0.4cqw]">
          {[
            { icon: Phone, text: "Call", on: true },
            { icon: MessageSquare, text: "Message" },
            { icon: Plus, text: "Add note" },
            { icon: MoreHorizontal, text: "More" },
          ].map(({ icon: Icon, text, on }) => (
            <span
              key={text}
              className="flex flex-col items-center gap-[0.3cqw] text-[0.65cqw] text-muted-foreground"
            >
              <span
                className={cn(
                  "flex size-[2.4cqw] items-center justify-center rounded-full",
                  on
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    : "bg-muted text-foreground/70",
                )}
              >
                <Icon className="size-[45%]" />
              </span>
              {text}
            </span>
          ))}
        </span>

        {/* The line the call went out on. */}
        <span
          className={cn(
            "relative flex items-center gap-[0.7cqw] rounded-[0.8cqw] px-[0.8cqw] py-[0.7cqw] ring-1 transition-colors duration-500",
            live ? "bg-accent ring-primary/30" : "bg-muted/60 ring-border",
          )}
        >
          <Joint id="line-box" side="l" left="0%" top="50%" lit={live} />
          <Building2 className="size-[1.3cqw] shrink-0 text-foreground/70" />
          <span className="flex flex-col leading-tight">
            <span className="text-[0.68cqw] text-muted-foreground">
              Using business number
            </span>
            <span className="text-[0.95cqw] font-semibold tabular-nums">
              {LINE.number}
            </span>
          </span>
          <span className="ml-auto rounded-full bg-card px-[0.55cqw] py-[0.15cqw] text-[0.65cqw] font-medium text-primary ring-1 ring-primary/25">
            Business line
          </span>
        </span>

        <span className="flex gap-[1.4cqw] border-b border-border text-[0.78cqw]">
          {["Call details", "Notes", "Activity"].map((tab, i) => (
            <span
              key={tab}
              className={cn(
                "-mb-px border-b-2 pb-[0.4cqw]",
                i === 0
                  ? "border-primary font-semibold text-primary"
                  : "border-transparent text-muted-foreground",
              )}
            >
              {tab}
            </span>
          ))}
        </span>

        <div className="flex flex-col gap-[0.45cqw] text-[0.75cqw]">
          {[
            { icon: Clock, k: "Duration", v: logged ? clock(elapsed) : "—" },
            { icon: PhoneOutgoing, k: "Type", v: "Outbound" },
            { icon: Calendar, k: "Date", v: "Today, 10:24 AM" },
          ].map(({ icon: Icon, k, v }) => (
            <span
              key={k}
              className="grid grid-cols-[1.2cqw_6cqw_1fr] items-center gap-[0.5cqw]"
            >
              <Icon className="size-[0.9cqw] text-muted-foreground" />
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium tabular-nums">{v}</span>
            </span>
          ))}
          <span className="grid grid-cols-[1.2cqw_6cqw_1fr] items-center gap-[0.5cqw]">
            <BarChart3 className="size-[0.9cqw] text-muted-foreground" />
            <span className="text-muted-foreground">Recording</span>
            <span className="flex items-center gap-[0.5cqw]">
              <span className="flex size-[1.4cqw] items-center justify-center rounded-full bg-muted">
                <Play className="size-1/2 fill-current" />
              </span>
              {live ? (
                <span className="flex items-center gap-[0.35cqw] text-primary">
                  <span className="size-[0.5cqw] animate-pulse rounded-full bg-primary" />
                  Recording
                </span>
              ) : (
                <span className="text-muted-foreground">
                  {phase === "done" ? "00:05" : "—"}
                </span>
              )}
            </span>
          </span>
        </div>

        <span
          className={cn(
            "flex gap-[0.6cqw] rounded-[0.8cqw] px-[0.8cqw] py-[0.7cqw] ring-1 transition-colors duration-500",
            phase === "done"
              ? "bg-accent ring-primary/30"
              : "bg-muted/50 ring-border",
          )}
        >
          <FileText className="size-[1.1cqw] shrink-0 text-foreground/70" />
          <span className="flex flex-col gap-[0.2cqw] leading-snug">
            <span className="text-[0.8cqw] font-semibold">AI summary</span>
            <span className="text-[0.72cqw] text-muted-foreground">
              {phase === "done"
                ? "Discussed the retail expansion plan. Kristine wants a demo next week."
                : "Written when the call ends."}
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}

function CallRow({
  name,
  company,
  photo,
  when,
  length,
  inbound,
  fresh,
  live,
}: {
  name: string;
  company: string;
  photo?: string;
  when: string;
  length: string;
  inbound?: boolean;
  fresh?: boolean;
  live?: boolean;
}) {
  const Arrow = inbound ? PhoneIncoming : PhoneOutgoing;
  return (
    <span
      className={cn(
        "flex items-center gap-[0.7cqw] rounded-[0.8cqw] px-[0.6cqw] py-[0.55cqw]",
        fresh && "bg-accent",
      )}
    >
      <Arrow className="size-[0.95cqw] shrink-0 text-primary" />
      {photo ? (
        <Portrait src={photo} className="w-[2.5cqw]" />
      ) : (
        <span className="flex size-[2.5cqw] shrink-0 items-center justify-center rounded-full bg-muted text-[1cqw] font-semibold text-foreground/70">
          {name[0]}
        </span>
      )}
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[0.85cqw] font-semibold">{name}</span>
        <span className="text-[0.7cqw] text-muted-foreground">{company}</span>
      </span>
      <span className="ml-auto flex flex-col items-end leading-tight">
        <span
          className={cn(
            "text-[0.7cqw]",
            live ? "font-semibold text-primary" : "text-muted-foreground",
          )}
        >
          {when}
        </span>
        <span className="text-[0.7cqw] text-muted-foreground tabular-nums">
          {length}
        </span>
      </span>
    </span>
  );
}
