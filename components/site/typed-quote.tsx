"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** Runs before paint on the client, and is a no-op during SSR. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Characters a second, which puts a 220-character review at around five and a
 * half seconds.
 *
 * Between the two rates that would be literal and both wrong: a person types
 * at roughly 4 characters a second, which would spend a minute on this quote,
 * and reads silently at about 20, which feels like being read to. Landing
 * above both means phrases visibly form rather than appearing whole, without
 * anyone waiting on the end of a sentence they can already finish.
 */
const SPEED = 40;

/**
 * The review, written out rather than printed.
 *
 * The quote this carries is a customer saying that one message is enough to
 * get a reply, so the line arrives the way that reply does. That is the whole
 * reason for the effect — it is the sentence performing itself, not a
 * flourish, and it is the only motion in the section.
 *
 * Three things this has to get right, none of them visible when it works:
 *
 * - The server renders the finished quote, so it is all there without
 *   JavaScript and all there for a crawler. The effect below rewinds it to
 *   nothing before the first paint, which is why there is no flash of the
 *   full text.
 * - The visible copy is hidden from assistive tech and a complete `sr-only`
 *   quote sits beside it. A screen reader reads the review once, as a
 *   sentence, instead of re-announcing it on every character.
 * - The finished quote is also rendered invisibly underneath, in the same
 *   grid cell, so the block is full height from the start. Without it every
 *   new line shoves the star rating down the page as the text grows.
 */
export function TypedQuote({
  quote,
  className,
}: {
  quote: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(quote.length);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion keeps the finished state the server already rendered.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setCount(0);

    let frame = 0;
    let start = 0;

    // Driven by the timestamp rather than a per-character timer, so the quote
    // takes the same three seconds on a 120Hz laptop as on a slow phone.
    const tick = (now: number) => {
      if (!start) start = now;
      const shown = Math.min(
        quote.length,
        Math.round(((now - start) / 1000) * SPEED),
      );
      setCount(shown);
      if (shown < quote.length) frame = requestAnimationFrame(tick);
    };

    // Starts when the quote is actually on screen. Left to run on mount it
    // would finish somewhere around the hero, and the visitor would scroll
    // down to a line that had already been written.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [quote]);

  const done = count >= quote.length;

  // Carried by both copies below: the sizing copy reserves the caret's width
  // too, so the last line cannot wrap differently once the caret joins it.
  const caret = (
    <span
      className={cn(
        "type-caret ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[0.1em] bg-primary transition-opacity duration-300",
        done && "opacity-0",
      )}
    />
  );

  return (
    <p ref={ref} className={className}>
      <span className="grid">
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {quote}
          {caret}
        </span>

        <span aria-hidden className="col-start-1 row-start-1">
          {quote.slice(0, count)}
          {caret}
        </span>
      </span>

      <span className="sr-only">{quote}</span>
    </p>
  );
}
