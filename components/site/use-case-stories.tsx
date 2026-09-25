"use client";

import { useEffect, useState } from "react";
import {
  AppWindow,
  BatteryFull,
  Check,
  Clock,
  Globe,
  Headset,
  Loader2,
  MessageSquare,
  MessagesSquare,
  Music,
  Phone,
  PhoneOff,
  Plus,
  Signal,
  Voicemail,
  Wifi,
} from "lucide-react";

import { FlagCA, FlagUS } from "@/components/site/flags";
import { Card } from "@/components/ui/card";
import { Iphone } from "@/components/ui/iphone";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Plain-language figures for the By Use Case pages.
 *
 * They replace the wiring schematics, which readers found hard to follow.
 * Each takes a different form on purpose — a phone screen, a call list, a
 * before/after, a hub, a dashboard — so the six pages do not read as one
 * template with the labels changed. What they share: everyday words,
 * familiar icons, and a picture that makes sense standing still; the
 * animation only walks through it.
 *
 * No capacities, latencies, volumes or coverage claims: the source documents
 * flag those as unverified. Countries named are the two the site already
 * prices for.
 */

/** Ticks once per `ms` while on screen; still (and settled) for reduced motion. */
function useLoop(ms: number) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const still = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!seen || still) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [seen, still, ms]);

  return { ref, still, tick };
}

/* ------------------------------------------------------- customer support */

const JOURNEY = [
  {
    status: "Calling…",
    caption: "“Thanks for calling. Press 1 for sales, 2 for support.”",
  },
  {
    status: "You pressed 2",
    caption: "“Connecting you to support…”",
  },
  {
    status: "On hold",
    caption: "“All agents are busy — you're next in line.”",
  },
  { status: "Connected", caption: "“Hi, this is Support. How can I help?”" },
] as const;

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

/**
 * Customer support, from the caller's side: the screen of the phone in their
 * hand. A menu, a key press, a place in line, then a person — beside the
 * alternative, a busy tone and a lost caller.
 */
export function CallerJourney() {
  const { ref, still, tick } = useLoop(1700);
  // Four screens, then a held beat on the answered call.
  const step = still ? 3 : Math.min(tick % (JOURNEY.length + 1), 3);
  const { status, caption } = JOURNEY[step];
  const connected = step === 3;

  return (
    <Card
      ref={ref}
      className="gap-0 p-5 sm:p-6"
      role="img"
      aria-label="What the caller sees on their phone: a menu asks them to press 1 for sales or 2 for support; they press 2; they are told they are next in line and hold; then a support agent answers. Without a queue they would hear a busy tone and hang up."
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        {/* Width on a wrapper: `Iphone` sets its own w-full. */}
        <div aria-hidden className="w-52 shrink-0">
          <Iphone className="drop-shadow-xl">
            <div className="flex size-full flex-col bg-card">
              <div className="flex items-center justify-between px-5 pt-2.5 text-[9px] font-semibold">
                <span className="[font-family:var(--font-mono)]">9:41</span>
                <span className="flex items-center gap-1">
                  <Signal className="size-2.5" />
                  <Wifi className="size-2.5" />
                  <BatteryFull className="size-3" />
                </span>
              </div>

              <div className="flex flex-1 flex-col items-center px-4 pt-6 pb-5">
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full transition-colors duration-500",
                    connected
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-primary",
                  )}
                >
                  {connected ? (
                    <Headset className="size-5" />
                  ) : (
                    <Phone className="size-5" />
                  )}
                </span>
                <p className="mt-2.5 text-sm font-semibold">Support line</p>
                <p
                  className={cn(
                    "mt-0.5 flex items-center gap-1 text-[10px]",
                    connected || step === 1
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {step === 2 ? <Music className="size-2.5" /> : null}
                  {status}
                </p>

                {/* Live caption of what the caller hears */}
                {/* Fixed height, so the screen below never jumps as the
                    caption changes length. */}
                <p
                  key={step}
                  className="mt-4 flex h-12 w-full animate-in items-center justify-center rounded-xl bg-muted px-3 text-center text-[10px] leading-snug duration-300 fade-in"
                >
                  {caption}
                </p>

                <div className="flex-1" />

                {/* Keypad while the menu is asking; the call once answered */}
                {step < 2 ? (
                  <div className="mt-3 grid grid-cols-3 gap-x-2.5 gap-y-1.5">
                    {KEYS.map((key) => (
                      <span
                        key={key}
                        className={cn(
                          "flex size-7 items-center justify-center rounded-full text-[11px] font-medium transition-colors duration-200",
                          step === 1 && key === "2"
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                            : "bg-muted",
                        )}
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-8 items-end gap-[3px]">
                    {WAVE.map((height, index) => (
                      <span
                        key={index}
                        className={cn(
                          "w-[3px] rounded-full",
                          connected
                            ? "wave-bar bg-primary"
                            : "bg-muted-foreground/30",
                        )}
                        style={{
                          height: `${height * 100}%`,
                          ["--bar-delay" as string]: `${index * 0.07}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                <span className="mt-4 flex size-10 items-center justify-center rounded-full bg-foreground text-background">
                  <PhoneOff className="size-4" />
                </span>
              </div>
            </div>
          </Iphone>
        </div>

        {/* With and without */}
        <div className="flex w-full flex-col justify-center gap-3">
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Check className="size-4 text-primary" aria-hidden />
              With a queue
            </p>
            <p className="mt-1.5 text-xs text-pretty text-muted-foreground">
              Every caller is greeted, sent to the right team and kept in
              line until someone is free.
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-border p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <PhoneOff className="size-4" aria-hidden />
              Without one
            </p>
            <p className="mt-1.5 text-xs text-pretty text-muted-foreground">
              A busy tone. The caller hangs up — and may call someone else.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

/** Voice on the line. Fixed heights so it reads as speech, not a chart. */
const WAVE = [0.4, 0.75, 1, 0.55, 0.9, 0.35, 0.7, 1, 0.5, 0.8];

/* ------------------------------------------------------------- sales teams */

const CALL_LIST = [
  { name: "Contact A", result: "No answer" },
  { name: "Contact B", result: "Busy" },
  { name: "Contact C", result: "Connected" },
  { name: "Contact D", result: "Unavailable" },
  { name: "Contact E", result: "No answer" },
  { name: "Contact F", result: "Connected" },
] as const;

/**
 * Sales teams, as the call list itself: the system dials down it, skips the
 * dead ends on its own, and hands the rep only the people who picked up.
 */
export function DialerList() {
  const { ref, still, tick } = useLoop(900);
  // One row per beat, then a held pause on the finished list.
  const worked = still ? CALL_LIST.length : tick % (CALL_LIST.length + 3);
  const dialling = still ? -1 : worked < CALL_LIST.length ? worked : -1;
  const talks = CALL_LIST.slice(0, worked).filter(
    (c) => c.result === "Connected",
  ).length;
  const talkingTo = [...CALL_LIST.slice(0, worked)]
    .reverse()
    .find((c) => c.result === "Connected");

  return (
    <Card
      ref={ref}
      className="gap-0 p-5 sm:p-6"
      role="img"
      aria-label="The system dials down the call list on its own. No answer, busy and unavailable numbers are skipped automatically; only people who pick up are passed to the sales rep, so the rep spends their time talking, not waiting."
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Today&apos;s call list</p>
        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
          dialled automatically
        </span>
      </div>

      <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {CALL_LIST.map((c, i) => {
          const done = i < worked;
          const live = i === dialling;
          const good = c.result === "Connected";

          return (
            <li
              key={c.name}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-xs transition-colors duration-300",
                done && good && "bg-primary/5",
              )}
            >
              <span
                className={cn(
                  "font-medium",
                  done && !good && "text-muted-foreground line-through",
                )}
              >
                {c.name}
              </span>
              <span className="font-mono text-muted-foreground/70">
                ••• ••••
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                {live ? (
                  <>
                    <Loader2
                      className="size-3 animate-spin text-muted-foreground"
                      aria-hidden
                    />
                    <span className="text-muted-foreground">Dialling…</span>
                  </>
                ) : done ? (
                  good ? (
                    <span className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground">
                      <Headset className="size-3" aria-hidden />
                      To your rep
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {c.result} · skipped
                    </span>
                  )
                ) : (
                  <span className="text-muted-foreground/50">Waiting</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-primary/5 p-3 ring-1 ring-primary/30">
          <p className="text-[11px] text-muted-foreground">Your rep is</p>
          <p className="mt-1 text-sm font-medium text-primary">
            {talkingTo ? `Talking to ${talkingTo.name}` : "Ready"}
          </p>
        </div>
        <div className="rounded-xl bg-muted/60 p-3">
          <p className="text-[11px] text-muted-foreground">
            Dead dials your rep sat through
          </p>
          <p className="mt-1 text-sm font-medium">
            0{" "}
            <span className="font-normal text-muted-foreground">
              · {talks} conversation{talks === 1 ? "" : "s"}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------- unified communications */

const APPS = [
  { name: "Phone system", icon: Phone },
  { name: "Text messages", icon: MessageSquare },
  { name: "Team chat", icon: MessagesSquare },
  { name: "Business apps", icon: AppWindow },
];

const FEED = [
  { icon: Phone, tab: "Calls", text: "Missed call from a customer — call back" },
  { icon: MessageSquare, tab: "Messages", text: "Customer replied to your text" },
  { icon: MessagesSquare, tab: "Chat", text: "Team: “I’ll take this one”" },
  { icon: AppWindow, tab: "Apps", text: "Customer record opened from the call" },
];

/**
 * Unified communications as a before/after: four separate tools, each with
 * its own login and its own alerts, then the same four inside one app.
 */
export function AppsMerge() {
  const { ref, still, tick } = useLoop(2600);
  const after = still ? true : tick % 2 === 1;

  return (
    <Card
      ref={ref}
      className="gap-0 p-5 sm:p-6"
      role="img"
      aria-label="Before: calls, text messages, team chat and business apps are four separate tools with four logins, and staff switch between them. With SipLink: all four sit in one app, in one list."
    >
      {/* Before / after switch */}
      <div className="mx-auto grid w-full max-w-xs grid-cols-2 rounded-full bg-muted p-1 text-xs font-medium">
        <span
          className={cn(
            "rounded-full py-1.5 text-center transition-colors duration-300",
            !after ? "bg-background shadow-sm" : "text-muted-foreground",
          )}
        >
          Before
        </span>
        <span
          className={cn(
            "rounded-full py-1.5 text-center transition-colors duration-300",
            after
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground",
          )}
        >
          With SipLink
        </span>
      </div>

      <div className="mt-5 min-h-72">
        {!after ? (
          <div key="before" className="animate-in duration-500 fade-in">
            <p className="text-center text-sm font-medium">
              Four separate tools
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {APPS.map(({ name, icon: AppIcon }, i) => (
                <div
                  key={name}
                  className="relative rounded-xl border border-border p-3"
                >
                  <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <AppIcon
                    className="size-5 text-muted-foreground"
                    aria-hidden
                  />
                  <p className="mt-2 text-xs font-medium">{name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    its own login
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Staff keep switching between them — and things slip through.
            </p>
          </div>
        ) : (
          <div key="after" className="animate-in duration-500 fade-in">
            <p className="text-center text-sm font-medium">
              One app for all of it
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-primary/40 shadow-[0_0_28px_-10px] shadow-primary/50">
              <div className="flex gap-1 border-b border-border bg-muted/50 p-1.5">
                {FEED.map(({ tab }) => (
                  <span
                    key={tab}
                    className="flex-1 rounded-md bg-background py-1 text-center text-[10px] font-medium"
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <ul className="divide-y divide-border">
                {FEED.map(({ icon: ItemIcon, text }, i) => (
                  <li
                    key={text}
                    className="flex animate-in items-center gap-2.5 px-3 py-2.5 text-xs fill-mode-both fade-in slide-in-from-left-2"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ItemIcon className="size-3" aria-hidden />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              One login, one list — nothing to switch between.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------- global offices */

const MARKETS = [
  { name: "United States", number: "+1 212 ••• ••••", flag: FlagUS },
  { name: "Canada", number: "+1 416 ••• ••••", flag: FlagCA },
] as const;

/**
 * Global offices as a hub: customers in each country dial a local number,
 * and every one of those lands in the same system your team runs. A dashed
 * slot shows the next market being added from the same place.
 */
export function LocalNumbersHub() {
  const { ref, still, tick } = useLoop(1400);
  // US call, Canada call, the new market lighting, then a pause.
  const beat = still ? 2 : tick % 4;

  return (
    <Card
      ref={ref}
      className="gap-0 p-5 sm:p-6"
      role="img"
      aria-label="Customers in the United States and Canada each dial a local number. Every call arrives in the same SipLink system your team manages from one place, and the next country's number is added from the same portal."
    >
      <p className="text-center text-sm font-medium">
        Customers dial a local number
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {MARKETS.map(({ name, number, flag: Flag }, i) => {
          const live = beat === i;
          return (
            <div
              key={name}
              className={cn(
                "rounded-xl border p-3 text-center transition-all duration-300",
                live
                  ? "border-primary bg-primary/5 shadow-[0_0_20px_-8px] shadow-primary/60"
                  : "border-border",
              )}
            >
              <Flag className="mx-auto h-4 w-6 rounded-sm" />
              <p className="mt-2 text-xs font-medium">{name}</p>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                {number}
              </p>
              <p
                className={cn(
                  "mt-2 text-[10px] font-medium transition-colors",
                  live ? "text-primary" : "text-transparent",
                )}
              >
                calling…
              </p>
            </div>
          );
        })}
        <div
          className={cn(
            "flex flex-col items-center justify-center rounded-xl border border-dashed p-3 text-center transition-colors duration-300",
            beat === 2 ? "border-primary text-primary" : "border-border",
          )}
        >
          <Plus className="size-4" aria-hidden />
          <p className="mt-2 text-xs font-medium">Your next market</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            added from the same portal
          </p>
        </div>
      </div>

      {/* Three lines converging on the one system */}
      <div aria-hidden className="relative mx-auto h-10 w-2/3">
        <span className="absolute top-0 left-0 h-1/2 w-px bg-border" />
        <span className="absolute top-0 left-1/2 h-full w-px bg-border" />
        <span className="absolute top-0 right-0 h-1/2 w-px bg-border" />
        <span className="absolute top-1/2 right-0 left-0 h-px bg-border" />
        <span
          className={cn(
            "absolute top-0 h-full w-px bg-primary transition-opacity duration-300",
            beat < 2 ? "left-1/2 opacity-100" : "opacity-0",
          )}
        />
      </div>

      <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 text-center">
        <Globe className="mx-auto size-5 text-primary" aria-hidden />
        <p className="mt-2 text-sm font-medium">One system for every country</p>
        <p className="mt-1 text-xs text-pretty text-muted-foreground">
          Same menus, routing and reporting everywhere — managed by your team
          from one place.
        </p>
      </div>
    </Card>
  );
}

/* ----------------------------------------------------------- multi-branch */

const BRANCHES = [
  {
    name: "Downtown",
    hours: "9am – 6pm",
    greeting: "“Welcome to Downtown”",
    open: true,
  },
  {
    name: "Airport",
    hours: "Open 24/7",
    greeting: "“Welcome to the Airport branch”",
    open: true,
  },
  {
    name: "Riverside",
    hours: "10am – 4pm",
    greeting: "“Thanks for calling Riverside”",
    open: false,
  },
];

/**
 * Multi-branch as the head-office screen: every branch keeps its own
 * number, hours and greeting, and head office sees all of them in one table.
 */
export function BranchDashboard() {
  const { ref, still, tick } = useLoop(1500);
  const active = still ? 0 : tick % BRANCHES.length;

  return (
    <Card
      ref={ref}
      className="gap-0 overflow-hidden p-0"
      role="img"
      aria-label="The head office view lists every branch — Downtown, Airport and Riverside — each with its own opening hours and greeting, and shows what each one is doing right now, such as taking a call or sending callers to voicemail after hours."
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-2 text-xs font-medium">
          Head office · all branches
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-[1fr_auto] items-end gap-2">
          <p className="text-sm font-medium">3 branches, one view</p>
          <span className="text-[11px] text-muted-foreground">
            each keeps its own identity
          </span>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-border text-xs">
          <div className="grid grid-cols-[5.5rem_1fr_6.5rem] gap-2 bg-muted/50 px-3 py-2 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            <span>Branch</span>
            <span>Greeting</span>
            <span>Right now</span>
          </div>
          {BRANCHES.map((b, i) => {
            const live = b.open && i === active;
            return (
              <div
                key={b.name}
                className={cn(
                  "grid grid-cols-[5.5rem_1fr_6.5rem] items-center gap-2 border-t border-border px-3 py-3 transition-colors duration-300",
                  live && "bg-primary/5",
                )}
              >
                <div>
                  <p className="font-medium">{b.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="size-2.5" aria-hidden />
                    {b.hours}
                  </p>
                </div>
                <span className="truncate text-muted-foreground italic">
                  {b.greeting}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 text-[11px] font-medium",
                    live ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {b.open ? (
                    live ? (
                      <>
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 motion-safe:animate-ping" />
                          <span className="relative inline-flex size-2 rounded-full bg-primary" />
                        </span>
                        Taking a call
                      </>
                    ) : (
                      <>
                        <span className="size-2 rounded-full bg-primary/30" />
                        Open
                      </>
                    )
                  ) : (
                    <>
                      <Voicemail className="size-3" aria-hidden />
                      Closed · voicemail
                    </>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs text-pretty text-muted-foreground">
          <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
          Each branch sounds like itself. Head office sees every one of them,
          without calling round.
        </p>
      </div>
    </Card>
  );
}
