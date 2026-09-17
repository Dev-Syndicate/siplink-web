import {
  BatteryFull,
  Check,
  Cloud,
  Headset,
  Laptop,
  MessageCircle,
  PhoneCall,
  ServerCog,
  Signal,
  Smartphone,
  Wifi,
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
      {/* A disc behind the handset, set low and left of it as in the
          reference, rather than a glow centred on it. A soft-edged circle
          reads as a shape the phone is standing on; a symmetrical blur reads
          as a lamp pointed at the camera. Two layers: the disc that holds an
          edge, and a wider bloom that keeps that edge from looking cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[58%] left-[38%] size-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50 blur-[70px] sm:size-[26rem]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[58%] left-[38%] size-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px] sm:size-[32rem]"
      />

      <div className="relative transform-3d scale-90 rotate-x-[7deg] rotate-y-[-17deg] rotate-z-[-3deg] sm:scale-100">
        {/* The handset. A dark body around a lit screen rather than a white
            panel: the bezel, the island, the status bar and the home
            indicator are what make it read as a phone instead of a card.
            The rim light is what keeps a near-black body from disappearing
            into a near-black section. */}
        <div className="relative w-64 rounded-[2.6rem] bg-foreground p-[7px] shadow-2xl ring-1 ring-background/25">
          {/* Volume and wake, on the edges where a hand expects them. */}
          <span
            aria-hidden
            className="absolute top-24 -left-[2px] h-9 w-[3px] rounded-l-sm bg-background/20"
          />
          <span
            aria-hidden
            className="absolute top-36 -left-[2px] h-9 w-[3px] rounded-l-sm bg-background/20"
          />
          <span
            aria-hidden
            className="absolute top-28 -right-[2px] h-14 w-[3px] rounded-r-sm bg-background/20"
          />

          <div className="relative overflow-hidden rounded-[2.1rem] bg-card">
            {/* Status bar. Constant while the screens turn behind it, which
                is what sells the screens as one device rather than four
                pictures. */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-foreground">
              <span className="font-mono tracking-tight">9:41</span>
              <span className="flex items-center gap-1">
                <Signal className="size-3" aria-hidden />
                <Wifi className="size-3" aria-hidden />
                <BatteryFull className="size-3.5" aria-hidden />
              </span>
            </div>

            <span
              aria-hidden
              className="absolute top-2.5 left-1/2 z-30 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-foreground"
            />

            <span
              aria-hidden
              className="absolute bottom-2 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-foreground/30"
            />

            <div className="grid aspect-[9/15] overflow-hidden pt-9 pb-6">
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
        </div>
      </div>
    </div>
  );
}
