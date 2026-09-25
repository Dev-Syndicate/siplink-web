"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", onStoreChange);
  return () => list.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** The server has no media queries, so it renders the moving version. */
function getServerSnapshot() {
  return false;
}

/**
 * Whether this reader has asked for less motion.
 *
 * `useSyncExternalStore` rather than `useState` in an effect: a media query is
 * external state, this is the API React provides for reading it, it has a
 * server snapshot so hydration matches, and it follows the setting changing
 * mid-visit — which an effect that reads `matchMedia` once at mount does not.
 * Same reasoning as `HeaderShell` reading scroll position.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
