import Image from "next/image";
import {
  ArrowRightLeft,
  ArrowUpRight,
  BatteryFull,
  ChevronDown,
  Ellipsis,
  Grid3x3,
  MessageSquare,
  MessageSquareText,
  Mic,
  Pause,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Plus,
  Search,
  Settings,
  Signal,
  User,
  Users,
  Video,
  Voicemail,
  Volume2,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import { AppleLogo, PlayStoreLogo } from "@/components/site/store-icons";
import { Button } from "@/components/ui/button";
import { mobileApps, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The SipLink UC app, on a phone mid-call and a laptop at the dialler.
 *
 * Both screens are drawn in HTML from the theme tokens rather than pasted in
 * as screenshots, so they stay sharp at any size and follow dark mode. They
 * are illustrations of the app, not captures of it: the people are the
 * redesign portraits, and every number is in the reserved 555 range. All of
 * it is hidden from assistive tech; the copy beside it says what the app
 * does.
 */

const FEATURES: { label: string; icon: LucideIcon }[] = [
  { label: "Calls", icon: Phone },
  { label: "Messaging", icon: MessageSquareText },
  { label: "Video", icon: Video },
  { label: "Voicemail", icon: Voicemail },
];

/** Floating cards around the devices: what each half of the app is for. */
const CHIPS: {
  title: string;
  note: string;
  icon: LucideIcon;
  className: string;
  float: string;
}[] = [
  {
    title: "Business calls",
    note: "From anywhere",
    icon: Phone,
    // On the phone's outer corners, so they overlap the frame, never the
    // logo or the call controls.
    className: "-top-8 -left-[3%]",
    float: "6s",
  },
  {
    title: "Video meetings",
    note: "Built for teams",
    icon: Video,
    className: "-top-2 right-4",
    float: "7s",
  },
  {
    title: "Team messaging",
    note: "Stay connected",
    icon: MessageSquareText,
    className: "-bottom-6 -left-[3%]",
    float: "6.5s",
  },
  {
    title: "Voicemail",
    note: "Never miss a call",
    icon: Voicemail,
    className: "right-0 bottom-6",
    float: "7.5s",
  },
];

const CALL_CONTROLS: { label: string; icon: LucideIcon }[] = [
  { label: "Mute", icon: Mic },
  { label: "Keypad", icon: Grid3x3 },
  { label: "Speaker", icon: Volume2 },
  { label: "Add call", icon: Plus },
  { label: "Hold", icon: Pause },
  { label: "Transfer", icon: ArrowRightLeft },
];

const TABS: { label: string; icon: LucideIcon }[] = [
  { label: "Calls", icon: Phone },
  { label: "Messages", icon: MessageSquare },
  { label: "Contacts", icon: User },
  { label: "More", icon: Ellipsis },
];

function PhoneMockup() {
  return (
    <div className="w-[15rem] rounded-[2.75rem] bg-foreground p-2 shadow-2xl shadow-primary/25">
      <div className="flex h-[30rem] flex-col overflow-hidden rounded-[2.25rem] bg-background">
        <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-semibold">
          <span>9:41</span>
          <span className="h-5 w-20 rounded-full bg-foreground" />
          <span className="flex items-center gap-1">
            <Signal className="size-3" />
            <Wifi className="size-3" />
            <BatteryFull className="size-3.5" />
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center px-5 pt-4">
          <Image
            src="/siplink-logo.webp"
            alt=""
            width={300}
            height={135}
            className="h-7 w-auto object-contain"
          />
          <Image
            src="/images/people/person-sofia.webp"
            alt=""
            width={224}
            height={224}
            sizes="88px"
            className="mt-4 size-20 rounded-full bg-primary/10 object-cover ring-4 ring-primary/10"
          />
          <p className="mt-2.5 text-sm font-semibold">Sarah Mitchell</p>
          <p className="font-mono text-[11px] text-muted-foreground">00:24</p>

          <div className="mt-4 grid grid-cols-3 gap-x-5 gap-y-2.5">
            {CALL_CONTROLS.map(({ label, icon: Icon }) => (
              <span key={label} className="flex flex-col items-center gap-1">
                <span className="flex size-11 items-center justify-center rounded-full bg-muted/70 text-foreground">
                  <Icon className="size-4" />
                </span>
                <span className="text-[9px] text-muted-foreground">{label}</span>
              </span>
            ))}
          </div>

          {/* The hang-up handset: the phone glyph turned on its side. */}
          <span className="mt-3.5 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Phone className="size-5 rotate-135" />
          </span>
        </div>

        <div className="mt-auto flex items-center justify-around border-t border-border px-3 py-2.5">
          {TABS.map(({ label, icon: Icon }, index) => (
            <span
              key={label}
              className={cn(
                "flex flex-col items-center gap-0.5 text-[8px]",
                index === 0 ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const NAV: { label: string; icon: LucideIcon }[] = [
  { label: "Calls", icon: Phone },
  { label: "Messages", icon: MessageSquare },
  { label: "Contacts", icon: Users },
  { label: "Voicemail", icon: Voicemail },
  { label: "Meetings", icon: Video },
  { label: "Settings", icon: Settings },
];

const KEYS = [
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

const RECENT: {
  who: string;
  when: string;
  icon: LucideIcon;
  tone: string;
}[] = [
  { who: "+1 415 555 0134", when: "2 min ago", icon: PhoneOutgoing, tone: "text-success" },
  { who: "Sarah Mitchell", when: "10:24 AM", icon: PhoneMissed, tone: "text-primary" },
  { who: "David Lee", when: "Yesterday", icon: PhoneIncoming, tone: "text-success" },
  { who: "+1 628 555 0199", when: "Apr 10", icon: PhoneMissed, tone: "text-primary" },
  { who: "Marketing Team", when: "Apr 9", icon: Users, tone: "text-muted-foreground" },
];

function LaptopMockup() {
  return (
    <div className="w-full">
      <div className="rounded-t-2xl bg-foreground p-2 pb-2.5 shadow-2xl shadow-primary/20">
        <div className="grid aspect-[16/10] grid-cols-[6.5rem_minmax(0,1fr)_minmax(0,10rem)] grid-rows-[auto_1fr] overflow-hidden rounded-lg bg-background text-[9px]">
          <div className="col-span-3 flex items-center gap-3 border-b border-border px-3 py-2">
            <Image
              src="/siplink-logo.webp"
              alt=""
              width={300}
              height={135}
              className="h-5 w-auto object-contain"
            />
            <span className="ml-6 flex flex-1 items-center gap-1.5 rounded-md bg-muted/60 px-2 py-1 text-muted-foreground">
              <Search className="size-2.5" />
              Search or dial a number…
            </span>
            <span className="flex items-center gap-1.5">
              <Image
                src="/images/avatars/avatar-ryan.webp"
                alt=""
                width={96}
                height={96}
                sizes="20px"
                className="size-5 rounded-full bg-muted object-cover"
              />
              <span className="leading-tight">
                <span className="block font-semibold">John Doe</span>
                <span className="flex items-center gap-1 text-[7px] text-success">
                  <span className="size-1 rounded-full bg-success" />
                  Available
                </span>
              </span>
              <ChevronDown className="size-2.5 text-muted-foreground" />
            </span>
          </div>

          <nav className="space-y-0.5 border-r border-border bg-muted/30 p-2">
            {NAV.map(({ label, icon: Icon }, index) => (
              <span
                key={label}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2 py-1.5",
                  index === 0
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="size-2.5" />
                {label}
              </span>
            ))}
          </nav>

          <div className="flex flex-col items-center justify-center gap-2 p-3">
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              {KEYS.map(([key, letters]) => (
                <span
                  key={key}
                  className="flex size-8 flex-col items-center justify-center rounded-full bg-muted/60 leading-none"
                >
                  <span className="text-[11px] font-medium">{key}</span>
                  {letters ? (
                    <span className="text-[5px] text-muted-foreground">
                      {letters}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
            <span className="mt-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Phone className="size-3.5" />
            </span>
          </div>

          <div className="border-l border-border p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Recent Calls</span>
              <span className="text-[8px] text-primary">See all</span>
            </div>
            <ul className="mt-2 space-y-1">
              {RECENT.map(({ who, when, icon: Icon, tone }) => (
                <li
                  key={who}
                  className="flex items-center gap-1.5 rounded-md px-1 py-1 odd:bg-muted/40"
                >
                  <Icon className={cn("size-2.5 shrink-0", tone)} />
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate font-medium">{who}</span>
                    <span className="block text-[7px] text-muted-foreground">
                      {when}
                    </span>
                  </span>
                  <ArrowUpRight className="size-2.5 shrink-0 text-muted-foreground" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* The base, a touch wider than the lid, with the thumb notch. */}
      <div className="relative -mx-6 h-3 rounded-b-2xl bg-gradient-to-b from-muted-foreground/40 to-muted-foreground/60">
        <span className="absolute top-0 left-1/2 h-1.5 w-20 -translate-x-1/2 rounded-b-lg bg-muted-foreground/30" />
      </div>
    </div>
  );
}

/**
 * Apps. The other half of "does it fit my stack?": the integration diagram
 * makes the case for the tools, this one for the devices.
 */
export function AppsShowcase() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-primary/10">
      {/* Soft pink ground and two orbit lines behind the devices. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-10%] size-[44rem] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[8%] hidden size-[36rem] -translate-y-1/2 rounded-full border border-primary/15 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[2%] hidden size-[46rem] -translate-y-1/2 rounded-full border border-primary/10 lg:block"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8 lg:px-10 lg:py-28">
        <div>
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Mobile &amp; desktop
          </span>
          <h2 className="font-heading mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Take your extension{" "}
            <span className="block text-primary">anywhere.</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-muted-foreground lg:text-lg">
            The {site.name} UC app puts your business line on your phone and
            desktop, calls, video, messaging and voicemail, wherever you are.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { href: mobileApps.ios, store: "iOS", Logo: AppleLogo },
              { href: mobileApps.android, store: "Android", Logo: PlayStoreLogo },
            ].map(({ href, store, Logo }) => (
              <Button
                key={store}
                asChild
                className="h-auto gap-3 rounded-xl bg-foreground px-5 py-3 text-background shadow-lg shadow-foreground/10 hover:bg-foreground/90"
              >
                <a href={href} target="_blank" rel="noreferrer noopener">
                  <Logo className="size-7" />
                  <span className="text-left leading-tight">
                    <span className="block text-xs font-normal opacity-80">
                      Download for
                    </span>
                    <span className="block text-lg font-semibold">{store}</span>
                  </span>
                </a>
              </Button>
            ))}
          </div>

          {/* Two by two on a phone, where four labels across collide. */}
          <ul className="mt-10 grid grid-cols-2 gap-y-6 sm:flex sm:gap-y-0">
            {FEATURES.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2.5 sm:border-l sm:border-border sm:px-7 sm:first:border-l-0 sm:first:pl-0"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The devices. Phone alone below `md`; laptop and floating cards
            join where there is room to show them properly. */}
        <div aria-hidden className="relative mx-auto w-full max-w-2xl">
          <div className="relative flex justify-center md:block md:h-[34rem]">
            <div className="absolute top-16 right-0 hidden w-[66%] md:block">
              <LaptopMockup />
            </div>
            <div className="relative z-10 -rotate-3 md:absolute md:top-0 md:left-[12%]">
              <PhoneMockup />
            </div>

            {CHIPS.map(({ title, note, icon: Icon, className, float }) => (
              <div
                key={title}
                className={cn(
                  "card-float absolute z-20 hidden items-center gap-3 rounded-2xl bg-background/90 px-4 py-3 shadow-xl shadow-primary/10 backdrop-blur-md lg:flex",
                  className,
                )}
                style={{ "--float-duration": float } as React.CSSProperties}
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold">{title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {note}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
