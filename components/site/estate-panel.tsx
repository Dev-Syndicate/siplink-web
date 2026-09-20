"use client";

import { useEffect, useState } from "react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { estateNodes, estatePhases } from "@/lib/business-size";
import { cn } from "@/lib/utils";

/** How long the estate is left standing on its own before the layer arrives. */
const HOLD_MS = 2200;

/**
 * The estate, connected in place.
 *
 * At this size nobody is afraid of a missed call. They are afraid of the
 * migration — the project that rips out working systems and takes the phones
 * down with it. The source copy answers that twice, and the first question a
 * buyer asks here is literally whether they have to replace what they run.
 *
 * So the figure shows the thing being kept. Six systems the reader already
 * owns sit in fixed positions; the layer arrives between them and links up to
 * each one. Nothing fades out, nothing is removed and no box ever moves. The
 * stillness is the argument: you watch the estate become connected and notice
 * it is the same estate.
 *
 * A horizontal bar rather than a hub and spokes because layer is the word the
 * copy itself uses for what SipLink is, twice.
 *
 * It plays once, when scrolled to, and then holds the joined state. It used
 * to loop, which was defensible in the hero where it was the first thing on
 * the page. Here it is a hinge between a complaint and its answer, and a loop
 * would mean a reader arriving mid-cycle sees a connected estate having never
 * seen the disconnected one — which is half the argument gone.
 *
 * Dark rather than following the page ground. This is the largest size and
 * the weight belongs here; a ground that changed as well would leave the
 * boxes looking like the thing that had changed, which is exactly what has
 * not.
 */
export function EstatePanel() {
  const [ref, seen] = useInView<HTMLDivElement>();
  // Read here rather than taken as a prop: the page shell around this is a
  // server component, and it holds capability icons that cannot cross the
  // client boundary as props anyway.
  const still = useReducedMotion();
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    if (!seen || still || arrived) return;

    const id = window.setTimeout(() => setArrived(true), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [seen, still, arrived]);

  // Anyone who has asked for less motion gets the joined state outright,
  // because the connected estate is the claim and the arriving is the telling.
  const joined = still || arrived;
  const phase = estatePhases[joined ? 1 : 0];

  const above = estateNodes.slice(0, 3);
  const below = estateNodes.slice(3);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl bg-foreground text-background"
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-background/10 px-5 py-4">
        <p key={phase.label} className="phase-in font-medium">
          {phase.label}
        </p>
        <p className="font-mono text-xs text-background/50 tabular-nums">
          {estateNodes.length} systems
        </p>
      </div>

      <div className="px-5 py-6 sm:px-6">
        <Row nodes={above} joined={joined} side="above" />

        {/* The layer. It grows from the centre out, so it reads as something
            laid between the two rows rather than as another row of its own. */}
        <div className="relative my-3 flex h-11 items-center">
          <span
            aria-hidden
            data-joined={joined}
            className="absolute inset-x-0 h-11 origin-center scale-x-0 rounded-lg bg-primary transition-transform duration-700 ease-out data-[joined=true]:scale-x-100"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 h-px bg-background/15"
          />
          <span
            className={cn(
              "relative w-full text-center text-sm font-medium tracking-tight transition-opacity duration-500",
              joined ? "text-primary-foreground opacity-100" : "opacity-0",
            )}
          >
            SipLink
          </span>
        </div>

        <Row nodes={below} joined={joined} side="below" />
      </div>

      <p
        key={phase.note}
        className="phase-in border-t border-background/10 px-5 py-4 text-sm text-pretty text-background/60 sm:px-6"
      >
        {phase.note}
      </p>
    </div>
  );
}

/**
 * One rank of systems, with the stub that links each to the layer.
 *
 * The stubs are part of the row rather than drawn across the whole panel so
 * that a box and its own connection stay together at every width — at phone
 * size the three boxes wrap to one per line and the links still land.
 */
function Row({
  nodes,
  joined,
  side,
}: {
  nodes: typeof estateNodes;
  joined: boolean;
  side: "above" | "below";
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {nodes.map((node, index) => (
        <li
          key={node.name}
          className={cn(
            "flex flex-col",
            side === "above" ? "order-none" : "flex-col-reverse",
          )}
        >
          <div
            className={cn(
              // `flex-1` is load-bearing: without it the boxes take their
              // copy's height, the lower rank aligns to the bottom of the
              // row and the links stop short of two of the three.
              "flex-1 rounded-xl border px-3 py-2.5 transition-colors duration-500",
              joined
                ? "border-primary/40 bg-background/8"
                : "border-background/15 bg-transparent",
            )}
          >
            <p className="text-sm font-medium">{node.name}</p>
            <p className="mt-0.5 text-xs text-pretty text-background/55">
              {node.detail}
            </p>
          </div>

          {/* The link up to, or down to, the layer. Staggered so the estate
              joins one system at a time rather than all at once. */}
          <span
            aria-hidden
            data-joined={joined}
            style={{
              transitionDelay: joined ? `${240 + index * 130}ms` : "0ms",
            }}
            className={cn(
              "mx-auto h-4 w-0.5 scale-y-0 bg-primary transition-transform duration-400 ease-out data-[joined=true]:scale-y-100",
              side === "above" ? "origin-top" : "origin-bottom",
            )}
          />
        </li>
      ))}
    </ul>
  );
}
