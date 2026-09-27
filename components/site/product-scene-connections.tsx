"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useWirePaths, type SceneWire } from "@/components/site/scene-kit";

/** Measure the same joints as solutions, rather than guessing card heights. */
export function ProductSceneConnections({ wires }: { wires: SceneWire[] }) {
  const root = useRef<HTMLDivElement | null>(null);
  const paths = useRef<SVGPathElement[]>([]);
  const still = useReducedMotion();
  useWirePaths(root, paths, wires, still);

  return <svg ref={el => { root.current = el?.closest<HTMLDivElement>("[data-product-scene]") ?? null; }} aria-hidden fill="none" className="pointer-events-none absolute inset-0 size-full overflow-visible">
    {wires.map(({ from, to }, index) => <g key={`${from}>${to}`} data-connection={`${from}>${to}`} strokeLinecap="round">
      <path ref={el => { if (el) paths.current[index * 2] = el; }} strokeWidth={2.5} className="stroke-primary/30" />
      <path ref={el => { if (el) paths.current[index * 2 + 1] = el; }} pathLength={100} strokeWidth={3} className="scene-dash stroke-primary" />
    </g>)}
  </svg>;
}
