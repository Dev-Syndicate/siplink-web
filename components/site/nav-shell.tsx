"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Where the nav changes state, in pixels of scroll.
 *
 * Two values rather than one. With a single line the nav morphs back and
 * forth while someone nudges the wheel at exactly that offset, and a 300ms
 * transition makes the flapping obvious. Entering the floating state costs
 * more scroll than leaving it does.
 */
const ENTER = 32;
const LEAVE = 8;

/**
 * The header's chrome, and the only part of it that needs to know about
 * scroll.
 *
 * Two states. Docked, it is an ordinary solid bar with a hairline under it,
 * spanning the full width — the top edge of the page. Floating, it contracts
 * into a rounded pill inset from the edges and lifts on a shadow, so it
 * reads as an object sitting over the page instead.
 *
 * The docked bar is opaque, and that is the whole reason `--header-h` exists.
 * An opaque bar cannot overlap the homepage hero's photograph without cutting
 * the top off it, and softening the bar to avoid that only trades a hard edge
 * for a milky one. So nothing overlaps it: the photograph starts at
 * `--header-h`, where the bar's border ends, and the two simply meet.
 *
 * The bar's inner padding is deliberately identical in both states: the only
 * things that move are the panel's shape, its inset and its elevation. The
 * logo and the nav do not slide sideways while it happens.
 *
 * The announcement strip retracts on the way into the floating state. A pill
 * sitting directly under a fixed bar does not read as floating.
 *
 * Geometry note: the header is `fixed`, so neither state contributes to page
 * flow and the offsets on `main` and on each page's first section are
 * unaffected by the morph. See the comment in `app/layout.tsx`.
 */
export function NavShell({
  announcement,
  children,
}: {
  announcement: React.ReactNode;
  children: React.ReactNode;
}) {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setFloating((was) => window.scrollY > (was ? LEAVE : ENTER));
    };

    // Coalesced into a frame rather than run on the scroll event itself:
    // the listener fires far more often than the screen redraws, and every
    // run of this sets React state.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    // Once on mount. A reload part-way down a page and a back-navigation
    // that restores the scroll position both start below the threshold, and
    // neither fires a scroll event to tell us so.
    read();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* `sm:` on the negative margin, not the base: the strip is hidden
          below `sm`, so an unqualified -mt-10 would haul the nav up over
          nothing on phones. */}
      <div
        className={cn(
          "overflow-hidden transition-[margin] duration-300 ease-out motion-reduce:transition-none",
          floating ? "sm:-mt-10" : "mt-0",
        )}
      >
        {announcement}
      </div>

      {/* Docked, this is a plain solid bar with a hairline under it — no
          translucency, no blur, no gradient. A bar that is trying to be
          half-there over a photograph reads as haze, and none of it is
          necessary: nothing passes behind the docked nav, because everything
          that would have starts at `--header-h` instead. */}
      <div
        className={cn(
          "transition-all duration-300 ease-out motion-reduce:transition-none",
          floating
            ? "px-3 pt-3 sm:px-6 lg:px-8"
            : "border-b border-border bg-background px-0 pt-0",
        )}
      >
        {/* The pill keeps its h-16 at every width and in both states, so the
            header's height — and the offsets that depend on it — stay put.
            The transparent border when docked is load-bearing: `h-16` is
            border-box, so a border appearing on the floating state would
            otherwise shave 2px off the row and nudge the logo. */}
        <div
          className={cn(
            "relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 pr-2 pl-3 transition-all duration-300 ease-out motion-reduce:transition-none sm:gap-4 sm:pr-3 sm:pl-5",
            // `rounded-[2rem]`, not `rounded-full`: the row is h-16, so 2rem
            // is already a perfect pill, and it is a number the radius can
            // ease towards. `rounded-full` is an effectively infinite radius,
            // which clamps to fully round within the first frame or two and
            // makes the corners pop instead of unrolling.
            floating
              ? "rounded-[2rem] border border-border/60 bg-background/85 shadow-lg shadow-foreground/5 backdrop-blur-xl"
              : "rounded-none border border-transparent shadow-none",
          )}
        >
          {children}
        </div>
      </div>
    </header>
  );
}
