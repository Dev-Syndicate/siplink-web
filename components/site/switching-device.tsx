import {
  Check,
  Cloud,
  Headset,
  Laptop,
  MessageCircle,
  PhoneCall,
  ServerCog,
  Smartphone,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The screen the device is showing, one per line of the story.
 *
 * Each is a small piece of interface rather than a picture of one: the point
 * of the section is that the phone system keeps working while everything
 * under it changes, so what the screen shows is the thing that stayed.
 */
function NoHardware() {
  return (
    <div className="flex h-full flex-col justify-center gap-5 p-5">
      <div className="flex items-center gap-2.5 rounded-xl bg-primary/15 p-3 ring-1 ring-primary/30">
        <Cloud className="size-5 shrink-0 text-primary" aria-hidden />
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-foreground">
            SipLink cloud
          </p>
          <p className="text-[11px] text-muted-foreground">Live · managed</p>
        </div>
        <Check className="ml-auto size-4 shrink-0 text-primary" aria-hidden />
      </div>

      <div className="mx-auto h-8 w-px bg-border" aria-hidden />

      <div className="flex items-center gap-2.5 rounded-xl bg-muted p-3 opacity-55">
        <ServerCog className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-muted-foreground line-through">
            On-site PBX
          </p>
          <p className="text-[11px] text-muted-foreground">Decommissioned</p>
        </div>
      </div>
    </div>
  );
}

function SameNumber() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-5 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
        <PhoneCall className="size-5" aria-hidden />
      </span>
      <p className="font-mono text-lg tracking-tight text-foreground">
        080 4718 2200
      </p>
      <p className="text-[11px] text-muted-foreground">Incoming · line 1</p>
      <div className="mt-2 w-full rounded-xl bg-muted p-3">
        <p className="text-[11px] text-muted-foreground">Carrier</p>
        <p className="mt-0.5 text-[13px] font-medium text-foreground">
          Ported to SipLink
        </p>
      </div>
    </div>
  );
}

function OneExtension() {
  const devices = [
    { label: "Desk phone", icon: Smartphone, live: false },
    { label: "Laptop", icon: Laptop, live: true },
    { label: "Mobile", icon: PhoneCall, live: false },
  ];

  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-5">
      <p className="px-1 pb-1 text-[11px] text-muted-foreground">
        Extension 204
      </p>
      {devices.map(({ label, icon: Icon, live }) => (
        <div
          key={label}
          className={cn(
            "flex items-center gap-2.5 rounded-xl p-3",
            live ? "bg-primary/15 ring-1 ring-primary/30" : "bg-muted",
          )}
        >
          <Icon
            className={cn(
              "size-4.5 shrink-0",
              live ? "text-primary" : "text-muted-foreground",
            )}
            aria-hidden
          />
          <p className="text-[13px] font-medium text-foreground">{label}</p>
          {live ? (
            <span className="ml-auto text-[11px] font-medium text-primary">
              On a call
            </span>
          ) : (
            <span className="ml-auto text-[11px] text-muted-foreground">
              Ready
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function NamedTeam() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Headset className="size-4" aria-hidden />
        </span>
        <div>
          <p className="text-[13px] font-medium text-foreground">
            SipLink support
          </p>
          <p className="text-[11px] text-primary">Online · 02:14</p>
        </div>
      </div>

      <div className="rounded-xl rounded-tl-sm bg-muted p-3">
        <p className="text-[12px] leading-snug text-foreground">
          Trunk 2 is dropping calls after 30 seconds.
        </p>
      </div>

      <div className="rounded-xl rounded-tr-sm bg-primary p-3 text-primary-foreground">
        <p className="text-[12px] leading-snug">
          Looking now. Give me four minutes.
        </p>
      </div>

      <div className="flex items-center gap-1.5 pl-1">
        <MessageCircle className="size-3 text-muted-foreground" aria-hidden />
        <p className="text-[11px] text-muted-foreground">
          WhatsApp · answered in 40s
        </p>
      </div>
    </div>
  );
}

const SCREENS = [NoHardware, SameNumber, OneExtension, NamedTeam];

/**
 * The device.
 *
 * A phone-shaped panel tilted in real 3D with a card floating in front of it
 * at a shallower depth, lit from behind. It is a designed object rather than
 * a render of a handset — CSS cannot fake photographed hardware, and a bad
 * imitation of one would read worse than an honest illustration.
 *
 * The screen turns like the lines beside it: the four faces share a grid
 * cell, faces already passed have fallen forward, faces still to come are
 * waiting above, and only the active one is upright.
 */
export function SwitchingDevice({ active }: { active: number }) {
  return (
    <div className="relative flex justify-center perspective-[1600px]">
      {/* Light behind the object, so the tilt reads as depth rather than a
          flat shape that happens to be skewed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/45 blur-[110px] sm:size-[30rem]"
      />

      <div className="relative transform-3d scale-90 rotate-x-[7deg] rotate-y-[-17deg] rotate-z-[-3deg] sm:scale-100">
        <div className="w-64 overflow-hidden rounded-[2rem] bg-background p-2 shadow-2xl ring-1 ring-background/20">
          <div className="grid aspect-[9/15] overflow-hidden rounded-3xl bg-card">
            {SCREENS.map((Screen, index) => (
              <div
                key={index}
                aria-hidden={index !== active}
                className={cn(
                  "roll-face col-start-1 row-start-1 h-full w-full",
                  index === active
                    ? "rotate-x-0 opacity-100 origin-center"
                    : index < active
                      ? "rotate-x-90 opacity-0 origin-bottom"
                      : "-rotate-x-90 opacity-0 origin-top",
                )}
              >
                <Screen />
              </div>
            ))}
          </div>
        </div>

        {/* The card in front. Pulled toward the viewer on Z so it separates
            from the device rather than sitting flat against it, and hung off
            the lower-left corner so it never covers the screen. */}
        <div
          aria-hidden
          className="absolute -bottom-6 -left-8 w-36 translate-z-[80px] rounded-2xl bg-background p-3.5 shadow-2xl ring-1 ring-background/20 sm:-left-20 sm:w-40"
        >
          <p className="text-[11px] text-muted-foreground">This month</p>
          <p className="font-heading mt-1 text-2xl font-semibold tracking-tight text-foreground">
            0
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
            Site visits needed
          </p>
        </div>
      </div>
    </div>
  );
}
