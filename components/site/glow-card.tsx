import type { CSSProperties, ReactNode } from "react";

import { Card } from "@/components/ui/card";

/**
 * A card in the pricing plans' style: a hairline border that lights into a
 * travelling brand glow on hover, a lift, and layered pink elevation.
 * `index` staggers the border lights so neighbours never run in step.
 */
export function GlowCard({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div
      className="group/tier relative h-full transition-transform duration-500 ease-out hover:-translate-y-2"
      style={{ "--glow-delay": `${-index * 3}s` } as CSSProperties}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 -bottom-4 -z-10 h-12 rounded-full bg-primary/15 blur-2xl transition-all duration-500 group-hover/tier:inset-x-3 group-hover/tier:bg-primary/30"
      />
      <span
        aria-hidden
        className="pricing-glow-border pointer-events-none absolute -inset-1 -z-10 rounded-[1.9rem] opacity-30 blur-lg transition-opacity duration-500 group-hover/tier:opacity-90"
      />
      <div className="pricing-glow-border pricing-elevate h-full rounded-[1.85rem] p-px">
        <Card className="h-full gap-0 overflow-hidden rounded-[1.8rem] border-0 py-0 ring-0">
          {children}
        </Card>
      </div>
    </div>
  );
}
