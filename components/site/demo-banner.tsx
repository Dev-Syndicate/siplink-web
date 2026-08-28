"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "siplink-demo-banner-dismissed";

/**
 * Marks this deployment as a preview build rather than the live site, so a
 * client reviewing it is never in doubt about what they are looking at.
 *
 * Remove this component from the layout before going to production.
 */
export function DemoBanner() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setHidden(true);
    } catch {
      // Private mode or blocked storage — just show the banner.
    }
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Non-fatal: the banner simply returns on the next load.
    }
  };

  return (
    <div className="relative z-50 bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-10 py-2 text-center">
        <span className="rounded-full bg-background/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase">
          Demo
        </span>
        <p className="text-xs text-background/80">
          Preview build for review — not the live SipLink website.
        </p>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss demo notice"
        className="absolute inset-y-0 right-3 flex items-center text-background/60 transition-colors hover:text-background"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}
