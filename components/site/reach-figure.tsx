"use client";

import Image from "next/image";
import { Globe, PhoneCall, Smartphone } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const DEVICES = [
  { label: "Desk phone", icon: PhoneCall },
  { label: "Browser", icon: Globe },
  { label: "Mobile", icon: Smartphone },
];

/**
 * One call, every device — the claim beside it drawn once.
 *
 * "Staff stay reachable across desk phones, softphones, browsers and mobile"
 * is otherwise a sentence asking to be taken on trust. The thing worth seeing
 * is that the three branches light *together*: it is one call arriving in
 * three places, not a call being passed between them, and simultaneity is
 * exactly what prose is bad at.
 *
 * It plays once, when scrolled to, and then holds the lit state. A loop would
 * make it decoration.
 */
export function ReachFigure() {
  const [ref, seen] = useInView<HTMLDivElement>();
  const still = useReducedMotion();
  const play = seen && !still;

  return (
    <div ref={ref} className="mx-auto w-full max-w-xl">
      {/* The hub, named.

          This was an anonymous dot, which left the diagram saying "three
          devices hang off something". The sentence beside it is that
          everything is managed from one portal, and the portal is SipLink —
          so the junction says whose it is. It is a plate in HTML over the
          SVG rather than an <image> inside it, which is how the integration
          wall does the same job: that keeps the file going through
          next/image instead of shipping unoptimised.

          It does not animate in. The three branches lighting together is the
          one moment worth having here, and SipLink being already there is
          the truer reading anyway — the portal does not arrive, the call
          comes out of it. */}
      <div className="flex justify-center">
        <div className="rounded-2xl border border-primary/30 bg-card px-6 py-4 shadow-sm">
          <Image
            src="/siplink-logo.webp"
            alt="SipLink"
            width={300}
            height={135}
            sizes="200px"
            className="h-9 w-auto object-contain sm:h-10"
          />
        </div>
      </div>

      {/* The call, and the split. The trunk and the three branches are one
          path set so the junction reads as a single distribution point.

          Taller than it was: the figure now stands against both the
          objection and the reply rather than the reply alone, so the drop
          has to carry that much more height without the corners tightening
          into a bracket. */}
      <svg
        viewBox="0 0 300 104"
        className="w-full"
        role="img"
        aria-label="One incoming call from SipLink reaching a desk phone, a browser and a mobile at the same time."
      >
        <g className="stroke-border" strokeWidth={2} fill="none">
          <path d="M150 0 L150 44" />
          <path d="M50 100 L50 58 Q50 44 64 44 L236 44 Q250 44 250 58 L250 100" />
          <path d="M150 44 L150 100" />
        </g>

        <g strokeWidth={2} strokeLinecap="round" fill="none">
          <path
            d="M150 0 L150 44"
            pathLength={1}
            className={cn("stroke-primary", play && "reach-trunk")}
          />
          {/* One class, so the three branches draw as one event. A call
              reaching three places at once is the whole claim; staggering
              them would draw a handover instead. */}
          <g className={cn("stroke-primary", play && "reach-branch")}>
            <path d="M150 44 L64 44 Q50 44 50 58 L50 100" pathLength={1} />
            <path d="M150 44 L236 44 Q250 44 250 58 L250 100" pathLength={1} />
            <path d="M150 44 L150 100" pathLength={1} />
          </g>
        </g>
      </svg>

      <ul className="-mt-1 grid grid-cols-3">
        {DEVICES.map((device) => (
          <li key={device.label} className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "flex size-16 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground sm:size-20",
                play && "reach-device",
                // All three at once: the point is that nothing waits its turn.
                !play && seen && "border-primary/40 text-primary",
              )}
            >
              <device.icon className="size-7 sm:size-8" aria-hidden />
            </span>
            <span className="text-sm text-muted-foreground">
              {device.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
