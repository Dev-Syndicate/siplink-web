import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { cn } from "@/lib/utils";

/**
 * The two scenes that open an internet page, between the hero and the copy.
 *
 * Every page in the section carries a pair, and the pair is always the same
 * two beats: the room this page is about, then the kit in it. That is a
 * deliberate rhythm rather than a shortage of ideas — a reader moving
 * between twenty-one pages should find the argument in the same place each
 * time, and the thing that differs should be what is in the picture rather
 * than where to look for it.
 *
 * The second band is tinted so the two do not read as one very long section,
 * and so the pair alternates against whatever the page's own first section
 * happens to be.
 *
 * This is a server component. The scenes it is handed are the client pieces;
 * the headings, spacing and reveal around them have no reason to ship any
 * JavaScript.
 */
export function InternetOpeners({
  scenes,
}: {
  scenes: [InternetOpener, InternetOpener];
}) {
  return (
    <>
      {scenes.map((opener, index) => (
        <section
          key={opener.eyebrow}
          className={cn(
            "border-b border-border",
            index === 1 && "bg-muted/30",
          )}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <ScrollReveal className="max-w-2xl">
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                {opener.eyebrow}
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {opener.heading}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                {opener.lede}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={120} className="mt-12 lg:mt-14">
              {opener.scene}
            </ScrollReveal>
          </div>
        </section>
      ))}
    </>
  );
}

export type InternetOpener = {
  eyebrow: string;
  heading: string;
  lede: string;
  scene: ReactNode;
};
