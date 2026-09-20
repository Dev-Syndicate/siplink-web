"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Whether the element has been scrolled to, once.
 *
 * It latches on purpose: the figures that use this play a sequence showing
 * how something works, and a mechanism that re-runs every time it crosses the
 * viewport edge is an effect rather than an explanation. Having been seen, it
 * stays seen.
 *
 * Returns true immediately where there is no `IntersectionObserver` — the
 * point is to start the sequence at the right moment, not to gate the content
 * on it, so anything that cannot observe simply gets the finished state.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      // Scheduled rather than set inline: a synchronous setState in an effect
      // body is a re-render before paint, and `react-hooks` rejects it.
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-15% 0px -15% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, seen] as const;
}
