import { Cloud, Headset, Laptop, PhoneCall, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The live scene inside each migration card.
 *
 * Each one shows the sentence above it happening rather than illustrating it:
 * the racks actually go dark, the number actually stays put while the carrier
 * under it changes, the ring actually moves between devices, the reply is
 * actually being typed. Every loop is in globals.css and stops for
 * `prefers-reduced-motion`.
 *
 * Built from type and boxes rather than art, so they stay sharp at the size
 * these cards run at and cost nothing to load.
 */

/** Nothing on site: the on-site stack going dark under a cloud that does not. */
function NoHardware() {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
        <Cloud className="size-3.5" aria-hidden />
        SipLink cloud
      </span>

      <span aria-hidden className="h-4 w-px bg-border" />

      <span className="flex flex-col gap-1.5">
        {[0, 1, 2].map((row) => (
          <span
            key={row}
            className="dim-cycle flex h-6 w-32 items-center gap-1.5 rounded-md bg-foreground/85 px-2"
            style={{ "--cycle-delay": `${row * 0.35}s` } as React.CSSProperties}
          >
            <span className="size-1 rounded-full bg-primary" />
            <span className="size-1 rounded-full bg-background/40" />
            <span className="ml-auto h-1 w-10 rounded-full bg-background/20" />
          </span>
        ))}
      </span>
    </div>
  );
}

/** Keep the numbers: the number holds while the carrier beneath it changes. */
function SameNumber() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-mono text-2xl tracking-tight text-foreground">
        080 4718 2200
      </p>

      {/* Both labels occupy one grid cell, so the block never changes width
          as they trade — the number above has to look nailed down. */}
      <span className="grid text-xs">
        <span className="swap-out col-start-1 row-start-1 rounded-full bg-foreground/[0.06] px-3 py-1 text-muted-foreground">
          Old carrier
        </span>
        <span className="swap-in col-start-1 row-start-1 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
          Ported to SipLink
        </span>
      </span>
    </div>
  );
}

/** Wherever you are: one extension, the ring moving across three devices. */
function OneExtension() {
  const devices = [
    { label: "Desk", icon: PhoneCall },
    { label: "Laptop", icon: Laptop },
    { label: "Mobile", icon: Smartphone },
  ];

  return (
    <div className="flex items-center gap-3">
      {devices.map(({ label, icon: Icon }, index) => (
        <span key={label} className="relative flex flex-col items-center gap-2">
          <span
            aria-hidden
            className="ring-cycle absolute -inset-1.5 rounded-2xl ring-2 ring-primary"
            style={{ "--cycle-delay": `${index * 1.4}s` } as React.CSSProperties}
          />
          <span className="flex size-12 items-center justify-center rounded-xl bg-foreground/[0.06] text-foreground">
            <Icon className="size-5" aria-hidden />
          </span>
          <span className="text-[11px] text-muted-foreground">{label}</span>
        </span>
      ))}
    </div>
  );
}

/** Around the clock: a reply already being typed, at 02:14. */
function NamedTeam() {
  return (
    <div className="flex w-full max-w-[17rem] flex-col gap-2">
      <span className="self-end rounded-2xl rounded-br-sm bg-foreground/[0.06] px-3.5 py-2 text-left text-xs text-foreground">
        Trunk 2 is dropping calls.
      </span>

      <span className="flex items-center gap-2 self-start">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Headset className="size-3.5" aria-hidden />
        </span>
        <span className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-primary px-3.5 py-2.5">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="dot-bounce size-1.5 rounded-full bg-primary-foreground"
              style={{ "--cycle-delay": `${dot * 0.16}s` } as React.CSSProperties}
            />
          ))}
        </span>
      </span>

      <span className="self-start pl-9 text-[11px] text-muted-foreground">
        Answering · 02:14
      </span>
    </div>
  );
}

const SCENES = [NoHardware, SameNumber, OneExtension, NamedTeam];

export function SwitchingScene({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const Scene = SCENES[index] ?? SCENES[0];

  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-center", className)}
    >
      <Scene />
    </div>
  );
}
