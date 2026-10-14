import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCheck,
  ChevronDown,
  EllipsisVertical,
  Headphones,
  MessageSquareText,
  Pause,
  PhoneIncoming,
  Receipt,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { homeFeatures, site, type HomeFeature } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The miniature product screens drawn in each card.
 *
 * Small working interfaces rather than line diagrams: a buyer recognises a
 * call card, a keypad, a phone and a chart faster than a schematic of one.
 * They are built from the same tokens as the rest of the page — white panels
 * on the card's pink ground — so they read as the product, not as stock art.
 *
 * Nothing here is a claim. The people are initials, the phone numbers are
 * masked or in the reserved 555 range, and the chart is a sample week. All of
 * it is hidden from assistive tech: the heading and sentence beside each one
 * already say what it shows.
 */

/**
 * A white panel floating on the card's pink ground. No outline at all: it is
 * lifted off the card by a soft pink shadow alone.
 */
const PANEL = "rounded-xl bg-background shadow-lg shadow-primary/10";

/** A solid pink node where a dashed connector meets a panel. */
const NODE =
  "absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background";

/** Seconds between one item taking its turn and the next. Unhurried, so
 * the highlight crossfades from item to item rather than ticking. */
const STEP = 1.6;

function turnStyle(index: number, count = 3) {
  return {
    "--turn-delay": `${index * STEP}s`,
    "--turn-duration": `${STEP * count}s`,
  } as React.CSSProperties;
}

/**
 * A small round profile photo: portraits supplied for the redesign, cropped
 * to 96px in public/images/avatars with their transparent backgrounds kept,
 * so `bg-muted` shows through in either theme. They are not SipLink staff,
 * so they only ever appear inside these mock screens.
 */
function Avatar({ src, className }: { src: string; className?: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={96}
      height={96}
      sizes="28px"
      className={cn(
        "size-7 shrink-0 rounded-full bg-muted object-cover ring-2 ring-background",
        className,
      )}
    />
  );
}

/**
 * Dashed curves fanning out from one point to `count` evenly spaced ones.
 * Stretched to whatever box it sits in; the stroke stays 1px regardless.
 */
function Fan({ count, className }: { count: number; className?: string }) {
  const ends = Array.from(
    { length: count },
    (_, index) => ((index + 0.5) / count) * 100,
  );

  return (
    <svg
      viewBox="0 0 40 100"
      preserveAspectRatio="none"
      className={cn("shrink-0 overflow-visible", className)}
    >
      {ends.map((y) => (
        <path
          key={y}
          d={`M 0 50 C 22 50 18 ${y} 40 ${y}`}
          fill="none"
          strokeWidth="1.25"
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
          className="stroke-primary/50"
        />
      ))}
    </svg>
  );
}

const AGENTS = [
  { photo: "/images/avatars/avatar-ryan.webp", name: "Ryan", status: "Available", free: true },
  { photo: "/images/avatars/avatar-emma.webp", name: "Emma", status: "On a call", free: false },
  { photo: "/images/avatars/avatar-marcus.webp", name: "Marcus", status: "Available", free: true },
];

/** A call arriving, handed to whoever is free. */
function RoutingVisual() {
  return (
    <div className="flex items-center">
      <div className={cn(PANEL, "relative flex w-[9.25rem] shrink-0 items-center gap-2 p-2.5")}>
        <span className={cn(NODE, "-right-1")} />
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <PhoneIncoming className="size-3.5" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-semibold">Incoming call</span>
          <span className="block truncate font-mono text-[9px] text-muted-foreground">
            +1 212 555 0187
          </span>
        </span>
      </div>

      <Fan count={3} className="h-36 w-6 sm:w-8" />

      <div className="flex h-36 min-w-0 flex-1 flex-col justify-around">
        {AGENTS.map(({ photo, name, status, free }, index) => (
          <div
            key={name}
            className={cn(PANEL, "relative flex items-center gap-2 p-2")}
          >
            <span className={cn(NODE, "-left-1 z-10")} />
            {/* Whoever is taking the call lights up in turn. */}
            {free ? (
              <span
                className="feature-glide absolute inset-0 rounded-xl bg-primary/10"
                style={turnStyle(index === 0 ? 0 : 1, 2)}
              />
            ) : null}
            <span className="relative">
              <Avatar src={photo} />
              <span
                className={cn(
                  "absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2 ring-background",
                  free ? "bg-primary" : "bg-muted-foreground/40",
                )}
              />
            </span>
            <span className="relative min-w-0">
              <span className="block text-[11px] font-semibold">{name}</span>
              <span className="block text-[9px] whitespace-nowrap text-muted-foreground">{status}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Waveform bar heights, as a percentage of the strip. */
const WAVE = [
  28, 46, 72, 38, 90, 54, 34, 66, 96, 42, 58, 80, 30, 70, 50, 88, 36, 62, 44,
  76, 92, 32, 54, 68, 40, 84, 48, 60, 94, 36, 72, 52, 26, 78, 44, 66, 86, 38,
  56, 74, 30, 64, 90, 46, 34, 70, 50, 82,
];

const TRANSCRIPT = [
  {
    time: "00:09",
    who: "Agent",
    photo: "/images/avatars/avatar-sofia.webp",
    text: `Thank you for calling ${site.name}…`,
  },
  {
    time: "00:12",
    who: "Customer",
    photo: "/images/avatars/avatar-daniel.webp",
    text: "I wanted to know about…",
  },
  {
    time: "00:28",
    who: "Agent",
    photo: "/images/avatars/avatar-sofia.webp",
    text: "Sure, I can help you with that.",
  },
];

/** A recording mid-playback, with its transcript beneath. */
function RecordingVisual() {
  return (
    <div className="space-y-2.5">
      <div className={cn(PANEL, "p-3")}>
        <div className="flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1.5 font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            Recording
          </span>
          <span className="font-mono text-muted-foreground">00:42 / 03:15</span>
        </div>

        <div className="relative mt-2 flex h-12 items-center justify-center gap-[2px] overflow-hidden">
          {WAVE.map((height, index) => (
            <span
              key={index}
              className={cn(
                "wave-bar w-0.5 shrink-0 rounded-full",
                // Played back so far, then still to come.
                index < WAVE.length * 0.45 ? "bg-primary" : "bg-primary/30",
              )}
              style={
                {
                  height: `${height}%`,
                  "--bar-delay": `${index * 0.04}s`,
                } as React.CSSProperties
              }
            />
          ))}
          <span className="absolute flex size-8 items-center justify-center rounded-full bg-background shadow-lg shadow-primary/20">
            <Pause className="size-3.5 fill-primary text-primary" />
          </span>
        </div>

        <div className="relative mt-2.5 h-1 rounded-full bg-primary/15">
          <span className="absolute inset-y-0 left-0 w-[45%] rounded-full bg-primary" />
          <span className="absolute top-1/2 left-[45%] size-2.5 -translate-1/2 rounded-full bg-primary ring-2 ring-background" />
        </div>
      </div>

      <div className={cn(PANEL, "divide-y divide-primary/5")}>
        {TRANSCRIPT.map(({ time, who, photo, text }) => (
          <div key={time} className="flex items-center gap-2 px-2.5 py-1.5 text-[10px]">
            <Avatar src={photo} className="size-5 ring-1" />
            <span className="font-mono text-muted-foreground">{time}</span>
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[9px] font-medium",
                who === "Agent"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {who}
            </span>
            <span className="min-w-0 truncate text-muted-foreground">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

const MENU = [
  { label: "Sales", icon: ShoppingBag },
  { label: "Support", icon: Headphones },
  { label: "Billing", icon: Receipt },
  { label: "Operator", icon: UserRound },
];

/** The caller's keypad, and where each key sends them. */
function IvrVisual() {
  return (
    <div className="flex items-center">
      <div className={cn(PANEL, "relative w-[7.75rem] shrink-0 p-2")}>
        <span className={cn(NODE, "-right-1")} />
        <div className="rounded-lg bg-primary/5 px-1.5 py-1 text-center">
          <p className="text-[9px] font-semibold text-primary">
            Welcome to {site.name}
          </p>
          <p className="text-[8px] text-muted-foreground">Press a number</p>
        </div>
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {KEYS.map((key, index) => (
            <span
              key={key}
              className="relative flex h-4 items-center justify-center overflow-hidden rounded-md bg-muted/70 text-[9px] font-medium"
            >
              {/* 1 to 4 are the menu; each lights as its branch is taken. */}
              {index < 4 ? (
                <span
                  className="feature-glide absolute inset-0 bg-primary/20"
                  style={turnStyle(index, 4)}
                />
              ) : null}
              <span className="relative">{key}</span>
            </span>
          ))}
        </div>
      </div>

      <Fan count={4} className="h-24 w-6 sm:w-8" />

      <div className="flex h-24 min-w-0 flex-1 flex-col justify-around">
        {MENU.map(({ label, icon: Icon }) => (
          <span
            key={label}
            className={cn(PANEL, "relative flex h-5 items-center gap-1.5 rounded-lg px-1.5 text-[9px] font-medium")}
          >
            <span className={cn(NODE, "-left-1 size-1.5")} />
            <span className="flex size-4 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
              <Icon className="size-2.5" />
            </span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A phone receiving a reminder, and the reply coming back. */
function SmsVisual() {
  return (
    <div className="relative h-28 overflow-hidden">
      {/* Cropped by the card at the bottom, like a phone rising into view. */}
      <div className="mx-auto h-56 w-[11.5rem] rounded-[1.75rem] border-4 border-muted bg-background px-3 pt-2 shadow-lg shadow-primary/15">
        <div className="flex items-center justify-between text-[8px] font-semibold">
          <span>9:41</span>
          <span className="h-3 w-12 rounded-full bg-foreground" />
          <span className="tracking-tighter text-muted-foreground">•••</span>
        </div>

        <div className="mt-2.5 flex flex-col gap-1">
          <span
            className="feature-arrive max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-muted px-2.5 py-1.5 text-[9px] leading-snug"
            style={{ "--arrive-delay": "0s" } as React.CSSProperties}
          >
            Hi John, your appointment is tomorrow at 10:00 AM.
          </span>
          <span className="text-[7px] text-muted-foreground">10:02 AM</span>

          <span
            className="feature-arrive mt-1 max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary px-2.5 py-1.5 text-[9px] leading-snug text-primary-foreground"
            style={{ "--arrive-delay": "0.9s" } as React.CSSProperties}
          >
            Payment received, thank you!
          </span>
          <span className="flex items-center gap-0.5 self-end text-[7px] text-muted-foreground">
            10:03 AM <CheckCheck className="size-2.5 text-primary" />
          </span>
        </div>
      </div>

      <span className={cn(PANEL, "absolute top-7 left-0 flex size-9 items-center justify-center text-primary")}>
        <MessageSquareText className="size-4" />
      </span>
    </div>
  );
}

/** A sample week; the climb is the shape, not a figure anyone reported. */
const WEEK = [
  { day: "Mon", height: 18, tone: "bg-primary/30" },
  { day: "Tue", height: 24, tone: "bg-primary/40" },
  { day: "Wed", height: 31, tone: "bg-primary/50" },
  { day: "Thu", height: 42, tone: "bg-primary/60" },
  { day: "Fri", height: 47, tone: "bg-primary/70" },
  { day: "Sat", height: 66, tone: "bg-primary/85" },
  { day: "Sun", height: 90, tone: "bg-primary" },
];

function AnalyticsVisual() {
  return (
    <div className={cn(PANEL, "p-3")}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold">Call volume</span>
        <span className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] text-muted-foreground bg-muted/60">
          Last 7 days
          <ChevronDown className="size-2.5" />
        </span>
      </div>

      <div className="mt-2 flex gap-2">
        <div className="flex h-16 flex-col justify-between text-right font-mono text-[8px] text-muted-foreground">
          {[300, 200, 100, 0].map((value) => (
            <span key={value} className="leading-none">
              {value}
            </span>
          ))}
        </div>
        <div className="flex-1">
          <div className="flex h-16 items-end gap-1.5 border-b border-border">
            {WEEK.map(({ day, height, tone }, index) => (
              <span
                key={day}
                className={cn("feature-rise flex-1 rounded-t-sm", tone)}
                style={
                  {
                    height: `${height}%`,
                    "--rise-delay": `${index * 0.08}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="mt-1 flex gap-1.5">
            {WEEK.map(({ day }) => (
              <span
                key={day}
                className="flex-1 text-center text-[8px] text-muted-foreground"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Masked, like a number picker before you choose: the shape of each number
 * type without printing anything someone could dial.
 */
const NUMBERS = [
  {
    country: "US",
    value: "+1 212 ••• ••••",
    label: "Direct dial",
    tone: "bg-primary/10 text-primary",
  },
  {
    country: "US",
    value: "+1 800 ••• ••••",
    label: "Toll free",
    tone: "bg-info/10 text-info",
  },
  {
    country: "IN",
    value: "+91 44 •••• ••••",
    label: "Ported in",
    tone: "bg-success/10 text-success",
  },
];

function NumbersVisual() {
  return (
    <div className="space-y-1.5">
      {NUMBERS.map(({ country, value, label, tone }, index) => (
        <div
          key={label}
          className={cn(
            PANEL,
            "relative flex items-center gap-2 overflow-hidden rounded-lg px-2.5 py-1.5",
          )}
        >
          <span
            className="feature-glide absolute inset-0 bg-primary/5"
            style={turnStyle(index)}
          />
          <span className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[8px] font-semibold">
            {country}
          </span>
          <span className="relative font-mono text-[11px] font-medium whitespace-nowrap">
            {value}
          </span>
          <span
            className={cn(
              "relative ml-auto rounded-md px-1.5 py-0.5 text-[9px] font-medium whitespace-nowrap",
              tone,
            )}
          >
            {label}
          </span>
          <EllipsisVertical className="relative size-3 shrink-0 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
}

const VISUALS: Record<HomeFeature["id"], () => React.JSX.Element> = {
  routing: RoutingVisual,
  recording: RecordingVisual,
  ivr: IvrVisual,
  sms: SmsVisual,
  analytics: AnalyticsVisual,
  numbers: NumbersVisual,
};

/**
 * Capabilities, as a bento: routing and recording wide across the top with
 * their text beside the drawing, IVR, SMS, analytics and numbers narrow
 * beneath with the drawing under the text (see `homeFeatures` for why).
 *
 * Each card opens on its product — icon, name and a small tag — then leads
 * with what the buyer gets, in their words, and links to the product page.
 * On a tablet the wide cards take a full row each and the narrow ones pair
 * up; on a phone everything stacks.
 *
 * The section's main action is the consultation, not "see all products":
 * a visitor who has just read what it does is ready to ask, not to browse.
 */
export function FeatureCards() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-primary/5 via-primary/[0.03] to-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Features
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              What you can actually do with it
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              A phone system is really the sum of what happens to a call once
              it arrives. Here is what {site.name} does with each one.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg">
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
            {/* No side padding, so it lines up with the copy once it wraps. */}
            <Button asChild variant="link" size="lg" className="px-0">
              <Link href="/products">See all products</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {homeFeatures.map(
            ({ id, title, tag, outcome, description, href, icon: Icon, large }) => {
              const Visual = VISUALS[id];

              return (
                <Link
                  key={id}
                  href={href}
                  className={cn(
                    "group rounded-2xl transition-transform duration-300 ease-out focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:hover:-translate-y-1",
                    large && "sm:col-span-2",
                  )}
                >
                  <Card
                    className={cn(
                      "h-full gap-4 rounded-2xl bg-gradient-to-br from-background via-background to-primary/10 p-5 shadow-xl shadow-primary/5 ring-0 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-primary/15",
                      // The drawing side gets the larger share: it carries more detail
                        // than the four lines of copy beside it.
                        large &&
                          "md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-center md:gap-6",
                    )}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <span className="text-sm font-semibold">{title}</span>
                        <Badge className="h-5 bg-primary/10 px-1.5 text-[10px] text-primary">{tag}</Badge>
                      </div>

                      <CardTitle
                        className={cn(
                          "mt-3 font-semibold tracking-tight text-balance",
                          large ? "text-2xl" : "text-lg",
                        )}
                      >
                        {outcome}
                      </CardTitle>
                      <CardDescription className="mt-1.5 text-pretty">
                        {description}
                      </CardDescription>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        {title}
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </div>

                    <div
                      aria-hidden
                      className={cn(
                        "transition-transform duration-500 ease-out motion-safe:group-hover:scale-102",
                        !large && "mt-auto",
                      )}
                    >
                      <Visual />
                    </div>
                  </Card>
                </Link>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
