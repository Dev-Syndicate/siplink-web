import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpDown } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { symmetryFlows } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * /internet/dedicated-internet/symmetrical-speeds
 *
 * Two devices come from the second reference: an arc sitting behind the
 * subject, and a keyword picked out by hand. The site already has the second
 * one — `--font-script` is wired in the root layout for exactly this, and
 * using it here rather than inventing a highlight keeps the accent consistent
 * with the rest of the site.
 *
 * The visual is a mirrored pair rather than a single bar, because the page's
 * whole claim is that the two directions match. They animate on the same
 * duration with a small offset, so they arrive together.
 */
export function SymmetricalSpeedsHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* The arc. Oversized and clipped by the section, so it reads as a
          ground the content sits on rather than a shape on the page. */}
      <div
        aria-hidden
        className="absolute -top-[26rem] left-1/2 -z-10 hidden size-[46rem] -translate-x-1/4 rounded-full bg-gradient-to-br from-brand-from/15 to-brand-to/5 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-24 -z-10 size-[560px] rounded-full bg-brand-to/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-20 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Symmetrical speeds
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Your business{" "}
            {/* The one hand-written word on the page. The underline is drawn
                rather than a border, so it sits under the word's own width. */}
            <span className="relative inline-block">
              <span className="font-accent text-[1.25em] leading-none text-primary">
                uploads
              </span>
              <svg
                aria-hidden
                viewBox="0 0 160 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-3 w-full text-primary/50"
              >
                <path
                  d="M3 9 C 40 2, 120 2, 157 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            as much as it downloads.
          </h1>

          <p className="mt-8 max-w-lg text-lg text-pretty text-muted-foreground">
            Consumer connections assume data flows inward. Business traffic does
            not behave that way — and on an asymmetric line the outbound half
            fails quietly, while the download test still looks fine.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Talk to a connectivity expert
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/dedicated-internet/sla">
                See the service commitments
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* The mirrored pair. */}
        <ScrollReveal delay={140}>
          <div
            aria-hidden
            className="rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md lg:p-9"
          >
            {[
              { label: "Download", Icon: ArrowDown, delay: "0s" },
              { label: "Upload", Icon: ArrowUp, delay: "0.12s" },
            ].map(({ label, Icon, delay }) => (
              <div key={label} className="mt-7 first:mt-0">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    <Icon className="size-3.5 text-primary" />
                    {label}
                  </span>
                  <span className="font-mono text-[10px] text-primary">
                    equal
                  </span>
                </div>
                <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="scene-meter h-full w-full rounded-full bg-gradient-to-r from-brand-from to-brand-to"
                    style={{ "--meter-delay": delay } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}

            {/* The asymmetric alternative, greyed, for contrast. */}
            <div className="mt-9 border-t border-border pt-7">
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground/70 uppercase">
                Asymmetric, for comparison
              </p>
              <div className="mt-3 h-2.5 w-full rounded-full bg-muted">
                <div className="h-full w-full rounded-full bg-muted-foreground/25" />
              </div>
              <div className="mt-2 h-2.5 w-full rounded-full bg-muted">
                <div className="h-full w-[18%] rounded-full bg-muted-foreground/25" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Where the upload quietly runs out
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const DIRECTION = {
  up: {
    label: "Outbound",
    Icon: ArrowUp,
    motion: "flow-up",
    tone: "border-primary/40 bg-primary/5",
  },
  down: {
    label: "Inbound",
    Icon: ArrowDown,
    motion: "flow-down",
    tone: "border-border bg-background",
  },
  both: {
    label: "Both ways",
    Icon: ArrowUpDown,
    motion: "flow-up",
    tone: "border-primary/25 bg-background",
  },
} as const;

/**
 * Which way each kind of traffic travels. The cards drift in the direction
 * they describe — inbound ones fall, outbound ones rise — so the column reads
 * at a glance before any of it is read properly.
 */
export function SymmetricalSpeedsSections() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <ScrollReveal className="max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Which way it goes
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Five of these six travel upward
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Only the last one is what a consumer connection is built for. Every
            other item here is bounded by the half of the line nobody checks.
          </p>
        </ScrollReveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {symmetryFlows.map(({ label, direction, note }, index) => {
            const { label: dirLabel, Icon, motion, tone } = DIRECTION[direction];

            return (
              <ScrollReveal
                as="li"
                key={label}
                delay={index * 70}
                shift={12}
                className={cn(
                  "rounded-2xl border p-7 transition-colors",
                  tone,
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className={cn(
                      motion,
                      "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
                    )}
                    style={
                      { "--flow-delay": `${index * 0.3}s` } as React.CSSProperties
                    }
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    {dirLabel}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {label}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {note}
                </p>
              </ScrollReveal>
            );
          })}
        </ul>

        <ScrollReveal
          delay={120}
          className="mt-12 rounded-2xl border border-border bg-background p-7"
        >
          <p className="max-w-3xl text-pretty text-muted-foreground">
            Symmetrical delivery applies where the selected service specifies
            it. We confirm in writing whether it applies to the service quoted
            for your site, rather than leaving you to assume it.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
