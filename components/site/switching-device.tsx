import {
  BatteryFull,
  Check,
  Cloud,
  Headset,
  Laptop,
  MessageCircle,
  PhoneCall,
  PhoneIncoming,
  ServerCog,
  Signal,
  Smartphone,
  Waves,
  Wifi,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Iphone } from "@/components/ui/iphone";
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
 * The cards floating around the handset.
 *
 * They sit at a shallower depth than the phone and counter-rotate slightly,
 * so the group reads as a few panes stacked in front of it rather than as
 * stickers lying on the same plane. Each one is a number the section is
 * already claiming in prose — the cards are evidence, not decoration, which
 * is why they carry live-looking values instead of labels.
 *
 * `translateZ` is what does the work: the handset sits at 0, these sit
 * forward of it, and the shared `perspective` on the wrapper turns that into
 * real overlap and real scale difference.
 */
function LiveCallsWidget() {
  return (
    <Card
      size="sm"
      className="w-[9.5rem] gap-2 bg-card/85 px-3 py-2.5 shadow-xl ring-foreground/10 backdrop-blur-md"
    >
      <div className="flex items-center gap-1.5">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
        </span>
        <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
          Live calls
        </p>
      </div>
      <div className="flex items-end gap-1.5">
        <p className="font-mono text-2xl leading-none font-semibold text-foreground">
          24
        </p>
        <span className="pb-0.5 text-[10px] text-muted-foreground">
          across 6 sites
        </span>
      </div>
      {/* A few bars rather than a chart: at this size a real plot is noise,
          and the point is only that the number is moving. */}
      <div className="flex items-end gap-[3px]" aria-hidden>
        {[5, 8, 6, 10, 7, 11, 9, 12].map((h, i) => (
          <span
            key={i}
            className="w-1 rounded-full bg-primary/35"
            style={{ height: `${h * 1.5}px` }}
          />
        ))}
      </div>
    </Card>
  );
}

function PortedWidget() {
  return (
    <Card
      size="sm"
      className="w-[10.5rem] gap-1.5 bg-card/85 px-3 py-2.5 shadow-xl ring-foreground/10 backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="size-3.5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] leading-tight font-medium text-foreground">
            Numbers ported
          </p>
          <p className="text-[10px] text-muted-foreground">No downtime</p>
        </div>
      </div>
      <Badge
        variant="secondary"
        className="w-fit gap-1 px-1.5 py-0 text-[10px] font-medium"
      >
        <PhoneIncoming className="size-2.5" aria-hidden />
        42 DIDs
      </Badge>
    </Card>
  );
}

function QualityWidget() {
  return (
    <Card
      size="sm"
      className="w-[8.5rem] gap-1.5 bg-card/85 px-3 py-2.5 shadow-xl ring-foreground/10 backdrop-blur-md"
    >
      <div className="flex items-center gap-1.5">
        <Waves className="size-3 shrink-0 text-primary" aria-hidden />
        <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
          Call quality
        </p>
      </div>
      <p className="font-mono text-lg leading-none font-semibold text-foreground">
        4.4 <span className="text-[10px] text-muted-foreground">MOS</span>
      </p>
      {/* The track is the token border so it survives both themes; the fill
          is the share of the scale actually reached. */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-border" aria-hidden>
        <div className="h-full w-[88%] rounded-full bg-primary" />
      </div>
    </Card>
  );
}

/**
 * The device.
 *
 * The `Iphone` frame from the shadcn `@magicui` registry, tilted in real 3D
 * and lit from behind, with the four screens rolling inside its screen
 * window. The frame itself draws the body, the buttons and the island, so
 * what this component owns is the light behind it, the tilt, and the screen.
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

      {/* The frame carries its own `w-full` and aspect ratio, so the width
          has to come from a wrapper — passing `w-64` to it loses to the
          component's own `w-full`, which against a flex parent with no
          definite width collapses the phone to zero. */}
      <div className="relative w-64 transform-3d scale-90 rotate-x-[7deg] rotate-y-[-17deg] rotate-z-[-3deg] sm:scale-100">
        {/* The floating cards. Hidden below `xl`, where the column is
            narrow enough that they would sit on top of the screen rather
            than beside it, and pulled in tighter at `xl` itself — at exactly
            1280px the wider offsets ran the left card off the viewport. */}
        <div
          className="absolute -top-14 -left-12 z-20 hidden translate-z-24 rotate-y-[6deg] xl:block 2xl:-top-4 2xl:-left-28"
          aria-hidden
        >
          <LiveCallsWidget />
        </div>

        <div
          className="absolute -right-10 bottom-16 z-20 hidden translate-z-20 rotate-y-[6deg] xl:block 2xl:-right-20"
          aria-hidden
        >
          <PortedWidget />
        </div>

        <div
          className="absolute -bottom-10 -left-10 z-20 hidden translate-z-28 rotate-y-[6deg] xl:block 2xl:-left-20"
          aria-hidden
        >
          <QualityWidget />
        </div>

        <Iphone className="drop-shadow-2xl">
          {/* The screen. Status bar and home indicator belong to the screen
              rather than the frame, so they stay constant while the faces
              turn behind them — which is what sells four screens as one
              device. */}
          <div className="relative size-full bg-card">
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-4 text-[10px] font-semibold text-foreground">
              <span className="font-mono tracking-tight">9:41</span>
              <span className="flex items-center gap-1">
                <Signal className="size-3" aria-hidden />
                <Wifi className="size-3" aria-hidden />
                <BatteryFull className="size-3.5" aria-hidden />
              </span>
            </div>

            <span
              aria-hidden
              className="absolute bottom-2 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-foreground/30"
            />

            <div className="grid size-full overflow-hidden px-1 pt-11 pb-8">
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
        </Iphone>
      </div>
    </div>
  );
}
