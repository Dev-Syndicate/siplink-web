"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Rendered element. Defaults to a div; pass `li`, `section` etc. where the
      surrounding markup needs it, so the reveal never breaks list semantics. */
  as?: ElementType;
  /** Stagger, in milliseconds, applied as the CSS transition delay. */
  delay?: number;
  /** Travel distance before settling. Smaller for dense rows, larger for
      full sections — the default suits a section. */
  shift?: number;
};

/**
 * Reveals its children once, when they first cross into view.
 *
 * The animation lives entirely in CSS (`[data-reveal]` in globals.css); this
 * component only decides *when* to flip the attribute. Reduced motion is
 * handled there too, resolving straight to the visible rest state.
 *
 * The no-JS case cannot be: the rest state is the hidden one, so if this
 * component never mounts the content stays invisible. A `<noscript>` rule in
 * app/layout.tsx unhides everything for that case — if this component moves,
 * that rule has to move with it.
 *
 * It disconnects after firing. These are marketing sections, not a feed —
 * once a block has arrived it should stay arrived, and re-animating on the
 * way back up is the kind of thing that makes a long page tiring to read.
 */
export function ScrollReveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  shift,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Anything already on screen at mount is shown without waiting for a
    // scroll that may never come — a hero is the usual case.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setVisible(true);
          observer.disconnect();
        }
      },
      // Fires a little before the block is fully in view, so the transition
      // is finishing rather than starting as the reader arrives at it.
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={visible ? "true" : "false"}
      style={{
        ...(delay ? { "--reveal-delay": `${delay}ms` } : {}),
        ...(shift !== undefined ? { "--reveal-shift": `${shift}px` } : {}),
      } as React.CSSProperties}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
