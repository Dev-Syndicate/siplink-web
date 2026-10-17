"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * A photograph behind a company-page hero, washed into the site's palette.
 *
 * The photo sits on the right and fades to the page background under the
 * copy, so the headline always reads on near-white. A blush wash and a
 * magenta multiply pull its colours into the theme, and it drifts very
 * slowly so the hero is never perfectly still.
 */
export function HeroBackdrop({
  src,
  position = "center",
  className,
}: {
  src: string;
  /** CSS object-position for the crop, e.g. "70% center". */
  position?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={reduce ? { scale: 1.05, opacity: 1 } : { scale: [1.12, 1.04, 1.08], opacity: 1 }}
        transition={{
          scale: { duration: 24, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          opacity: { duration: 1.2 },
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90 saturate-[0.85]"
          style={{ objectPosition: position }}
        />
      </motion.div>

      {/* Pull the photo's colours into the brand */}
      <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
      <div className="absolute inset-0 bg-accent/45 mix-blend-soft-light" />

      {/* Near-solid page colour under the copy, clearing towards the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-background from-30% via-background/70 via-50% to-transparent" />
      {/* Soft top and bottom edges */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
