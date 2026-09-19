"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

/** Pixels of scroll before the bar detaches into its floating form. */
const THRESHOLD = 8;

function subscribe(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getSnapshot() {
  return window.scrollY > THRESHOLD;
}

/** The server has no scroll position, so it always renders the docked bar. */
function getServerSnapshot() {
  return false;
}

/**
 * The shell the nav bar lives in, in two states.
 *
 * At the top of the page it is docked: a full-bleed bar with a bottom rule,
 * sitting flush against the viewport edge. Once the page scrolls it lifts off
 * and becomes the rounded floating pill.
 *
 * `useSyncExternalStore` rather than `useState` + an effect: scroll position
 * is external state, this is the API React provides for reading it, it has a
 * server snapshot so hydration matches, and because the snapshot is a boolean
 * React only re-renders when the threshold is actually crossed — not on every
 * scroll event.
 *
 * The inner bar keeps a constant `h-16` in both states. Only the wrapper's
 * padding changes, so the nav row never moves vertically and the mega-menu
 * panel keeps its position relative to the triggers.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const scrolled = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <div
      className={cn(
        "border-b transition-all duration-300 ease-out",
        scrolled
          ? "border-transparent px-3 pt-3 sm:px-6 lg:px-8"
          : "border-border/60 bg-background/85 py-2 backdrop-blur-xl",
      )}
    >
      <div
        data-scrolled={scrolled}
        className={cn(
          "group/bar mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 border transition-all duration-300 ease-out sm:gap-4",
          scrolled
            ? "rounded-full border-border/60 bg-background/85 pr-2 pl-3 shadow-lg shadow-foreground/5 backdrop-blur-xl sm:pr-3 sm:pl-5"
            : "rounded-none border-transparent px-4 sm:px-6 lg:px-10",
        )}
      >
        {children}
      </div>
    </div>
  );
}
