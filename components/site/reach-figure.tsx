"use client";

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
    <div ref={ref} className="w-full max-w-md">
      {/* The call, and the split. The trunk and the three branches are one
          path set so the junction reads as a single distribution point. */}
      <svg
        viewBox="0 0 300 70"
        className="w-full"
        role="img"
        aria-label="One incoming call reaching a desk phone, a browser and a mobile at the same time."
      >
        <g className="stroke-border" strokeWidth={2} fill="none">
          <path d="M150 4 L150 30" />
          <path d="M50 66 L50 42 Q50 30 62 30 L238 30 Q250 30 250 42 L250 66" />
          <path d="M150 30 L150 66" />
        </g>

        <g strokeWidth={2} strokeLinecap="round" fill="none">
          <path
            d="M150 4 L150 30"
            pathLength={1}
            className={cn("stroke-primary", play && "reach-trunk")}
          />
          {/* One class, so the three branches draw as one event. A call
              reaching three places at once is the whole claim; staggering
              them would draw a handover instead. */}
          <g className={cn("stroke-primary", play && "reach-branch")}>
            <path d="M150 30 L62 30 Q50 30 50 42 L50 66" pathLength={1} />
            <path d="M150 30 L238 30 Q250 30 250 42 L250 66" pathLength={1} />
            <path d="M150 30 L150 66" pathLength={1} />
          </g>
        </g>

        <circle cx={150} cy={4} r={4} className="fill-primary" />
      </svg>

      <ul className="-mt-1 grid grid-cols-3">
        {DEVICES.map((device) => (
          <li key={device.label} className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground",
                play && "reach-device",
                // All three at once: the point is that nothing waits its turn.
                !play && seen && "border-primary/40 text-primary",
              )}
            >
              <device.icon className="size-5" aria-hidden />
            </span>
            <span className="text-xs text-muted-foreground">
              {device.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
