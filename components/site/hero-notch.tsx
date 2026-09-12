import { cn } from "@/lib/utils";

/**
 * Max width of the header pill while it sits in the homepage hero's notch.
 * The header and the notch both use it — against containers of the same
 * width — so the notch always fits the pill exactly. Below md the pill is
 * nearly full-width and there is no room for a notch, so none is drawn.
 */
export const DOCKED_WIDTH = "md:max-w-sm xl:max-w-[min(80rem,calc(100%-10rem))]";

/** One side of the notch: an S-curve rising from the notch floor to the hero edge. */
function Flare({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 76"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("absolute top-0 h-full w-14 fill-background", className)}
    >
      <path d="M0 0C28 0 28 76 56 76V0Z" />
    </svg>
  );
}

/**
 * A page-coloured cut-out in the top edge of the homepage hero, which the
 * docked header pill sits in. It belongs to the hero, so it scrolls away
 * with it while the header returns to its normal floating style.
 *
 * Geometry: the hero panel's top edge is 4px above the pill's top, and the
 * notch floor sits 8px below the pill — 76px deep in all.
 */
export function HeroNotch() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden px-1 md:block"
    >
      <div className={cn("relative mx-auto max-w-7xl", DOCKED_WIDTH)}>
        <div className="absolute -inset-x-2 top-0 h-19 bg-background">
          <Flare className="right-full -mr-px" />
          <Flare className="left-full -ml-px -scale-x-100" />
        </div>
      </div>
    </div>
  );
}
