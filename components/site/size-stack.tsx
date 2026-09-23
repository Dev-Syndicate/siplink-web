"use client";

import { useState } from "react";

import { estateLayers } from "@/lib/business-size";
import { cn } from "@/lib/utils";

/** Seconds for one call to fall the whole stack. Matches `estate-fall`. */
const FALL = 5.2;

/**
 * Enterprise: the estate, as the layers a call passes down through.
 *
 * Drawn as strata rather than a network, because the enterprise complaint in
 * the source copy is not that systems are far apart — it is that there are
 * too many of them stacked between the caller and the person answering.
 * Layers make that count visible; a mesh hides it.
 *
 * Calls fall continuously on a stagger. The lighting is done in CSS on the
 * same period as the fall rather than from JS timers, so a layer brightens as
 * a call is inside it without a frame loop.
 *
 * This is the one dark panel in the set. It is here, on the largest size,
 * because that is where the weight belongs.
 */
export function SizeStack() {
  const [open, setOpen] = useState(2);

  return (
    <div className="overflow-hidden rounded-2xl bg-foreground">
      <div className="relative px-5 pt-5 pb-1">
        {/* Calls in flight. Three on a stagger so the stack is never empty,
            positioned in their own column clear of the layer labels. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-5 left-[26px] w-1"
        >
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="estate-fall absolute top-0 size-2 rounded-full bg-primary"
              style={{ animationDelay: `${(index * FALL) / 3}s` }}
            />
          ))}
        </div>

        <ul className="relative space-y-1.5">
          {estateLayers.map((layer, index) => {
            const Icon = layer.icon;
            const isOpen = open === index;

            return (
              <li key={layer.name}>
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-expanded={isOpen}
                  className={cn(
                    "estate-layer flex w-full items-center gap-3 rounded-xl border py-3 pr-4 pl-10 text-left transition-colors duration-300",
                    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                    isOpen
                      ? "border-primary/60 bg-primary/15"
                      : "border-background/15 bg-background/[0.04] hover:bg-background/10",
                  )}
                  style={{
                    animationDelay: `${(index * FALL) / estateLayers.length}s`,
                  }}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors duration-300",
                      isOpen ? "text-primary" : "text-background/50",
                    )}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isOpen ? "text-background" : "text-background/70",
                    )}
                  >
                    {layer.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* One layer explained at a time, in a fixed-height well so choosing
          another does not move the stack above it. */}
      <p className="min-h-[5.5rem] border-t border-background/10 px-6 py-4 text-sm text-pretty text-background/70">
        {estateLayers[open].detail}
      </p>
    </div>
  );
}
