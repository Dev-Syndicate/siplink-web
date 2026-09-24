import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { scaleThresholds, siteTiers } from "@/lib/internet";

/**
 * /internet/network-solutions/multi-location-networking
 *
 * The hero counts. A hub with a ring of sites around it, the sites arriving
 * in sequence, is the one picture that makes the page's argument — connecting
 * one office is a task, connecting fifty is a structure.
 *
 * Positions are computed on a circle rather than hand-placed, so changing the
 * number of sites does not mean re-tuning six sets of coordinates.
 */
const SITES = 10;

export function MultiLocationHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-24 -z-10 size-[560px] rounded-full bg-brand-to/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Multi-location networking
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            One office is a task.
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              Fifty is a structure.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            Connecting a single site is straightforward. Connecting 5, 20 or
            100 is a different problem, and it does not get solved by ordering
            more of the same circuit.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Map your locations with us
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/network-solutions/sd-wan">SD-WAN</Link>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div aria-hidden className="mx-auto w-full max-w-lg">
            <svg viewBox="0 0 400 400" className="h-auto w-full">
              <defs>
                <filter
                  id="ml-glow"
                  x="-60%"
                  y="-60%"
                  width="220%"
                  height="220%"
                >
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="200"
                cy="200"
                r="150"
                className="fill-none stroke-border"
                strokeDasharray="4 6"
              />

              {Array.from({ length: SITES }).map((_, index) => {
                // Start at the top and go clockwise, so the ring fills in a
                // direction a reader follows rather than at random.
                const angle = (index / SITES) * Math.PI * 2 - Math.PI / 2;
                const x = 200 + Math.cos(angle) * 150;
                const y = 200 + Math.sin(angle) * 150;

                return (
                  <g key={index}>
                    <path
                      d={`M${x} ${y} L200 200`}
                      pathLength={100}
                      className="stroke-border"
                      strokeWidth="1.5"
                    />
                    <path
                      d={`M${x} ${y} L200 200`}
                      pathLength={100}
                      className="scene-dash stroke-primary"
                      strokeWidth="3"
                      strokeLinecap="round"
                      style={
                        {
                          "--dash-duration": "3.4s",
                          "--dash-delay": `${index * 0.28}s`,
                        } as React.CSSProperties
                      }
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="11"
                      className="fill-background stroke-primary"
                      strokeWidth="1.75"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      className="scene-pulse fill-primary"
                      style={
                        {
                          "--pulse-delay": `${index * 0.28}s`,
                        } as React.CSSProperties
                      }
                    />
                  </g>
                );
              })}

              <circle
                cx="200"
                cy="200"
                r="42"
                className="fill-background stroke-primary"
                strokeWidth="2"
              />
              <circle
                cx="200"
                cy="200"
                r="13"
                className="fill-primary"
                filter="url(#ml-glow)"
              />
              <text
                x="200"
                y="262"
                textAnchor="middle"
                className="fill-muted-foreground/70 text-[10px] font-medium [font-family:var(--font-mono)]"
              >
                ONE NETWORK
              </text>
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function MultiLocationSections() {
  return (
    <>
      {/* Sites are not interchangeable */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Sizing
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              A branch is not a small head office
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              The most common mistake in a multi-site estate is giving every
              location a scaled-down copy of the biggest one. Sites do
              different jobs, so they get sized differently.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 xl:grid-cols-4">
            {siteTiers.map(({ tier, profile, typical, icon: Icon }, index) => (
              <ScrollReveal
                as="li"
                key={tier}
                delay={index * 80}
                shift={12}
                className="group relative overflow-hidden bg-background p-7 transition-colors hover:bg-primary/5"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-500 group-hover:scale-y-100"
                />
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {tier}
                </h3>
                <p className="mt-1 font-mono text-xs text-primary">{profile}</p>
                <p className="mt-4 text-sm text-pretty text-muted-foreground">
                  {typical}
                </p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* What changes with scale */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Thresholds
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                What changes at 5, 20 and 50
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Nothing about a network breaks at a specific number. But the
                approach that works comfortably at one scale quietly stops
                working at the next, and these are roughly where.
              </p>

              <Button asChild className="mt-8">
                <Link href="/contact">
                  Map your locations with us
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </ScrollReveal>

            <ol className="relative space-y-5 border-l border-border pl-8">
              {scaleThresholds.map(({ scale, changes }, index) => (
                <ScrollReveal
                  as="li"
                  key={scale}
                  delay={index * 100}
                  shift={12}
                  className="group relative"
                >
                  <span
                    aria-hidden
                    className="absolute top-7 -left-[2.4rem] flex size-4 items-center justify-center rounded-full border-2 border-primary/40 bg-background transition-colors group-hover:border-primary"
                  >
                    <span className="size-1.5 rounded-full bg-primary" />
                  </span>

                  <div className="rounded-2xl border border-border bg-background p-6 transition-colors group-hover:border-primary/40 lg:p-7">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                      {scale}
                    </p>
                    <p className="mt-3 text-pretty text-muted-foreground">
                      {changes}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
