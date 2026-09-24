import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
};

/**
 * 404.
 *
 * Renders inside the root layout, so it inherits the header, footer and the
 * `main` top offset — the markup below only owns the section itself. It serves
 * both explicit `notFound()` calls and any unmatched URL.
 *
 * Kept deliberately quiet: one big brand-gradient numeral, a single line, one
 * way home. The numeral is the whole design; everything else stays out of its
 * way.
 */
export default function NotFound() {
  return (
    <section className="relative flex flex-1 items-center overflow-hidden">
      {/* Ambient brand glow, same language as the hero backdrops. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[620px] -translate-x-1/2 rounded-full bg-brand-to/10 blur-3xl"
      />

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-24 text-center lg:py-32">
        <p className="font-mono text-xs font-medium tracking-[0.25em] text-primary uppercase">
          Error 404
        </p>

        <p
          aria-hidden
          className="font-heading mt-4 bg-gradient-to-br from-brand-from to-brand-to bg-clip-text text-[7rem] leading-none font-bold tracking-tight text-transparent sm:text-[10rem]"
        >
          404
        </p>

        <h1 className="font-heading mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-pretty text-muted-foreground lg:text-lg">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>

        <Button asChild size="lg" className="mt-9">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </section>
  );
}
