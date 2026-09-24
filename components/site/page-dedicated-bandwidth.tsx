import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contentionNeighbours, dedicatedFacts } from "@/lib/internet";

/**
 * /internet/dedicated-internet/dedicated-bandwidth
 *
 * Borrowed from the colour-blocked reference: the band is split down the
 * middle, copy on the page's own ground and the visual on a tinted panel, with
 * cards overlapping the seam so the two halves interlock rather than sit side
 * by side. The oversized figure rail underneath is the same device — but every
 * figure in it is one a source document actually states, which is why the rail
 * carries port sizes and a licence class instead of a speed multiple.
 */
export function DedicatedBandwidthHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* The block. Kept to the right half from `lg` up; below that the
          panel would crowd the copy, so the split simply does not happen.

          The artwork fills it rather than a flat gradient. Two scrims sit
          over it: one fading from the page's own ground at the left edge, so
          the seam between the halves is soft instead of a hard vertical rule,
          and a light wash so the white cards that overlap it stay legible. */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 overflow-hidden lg:block"
      >
        <Image
          src="/internet/dedicated.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover object-center dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/40" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-1/4 -z-10 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-10 pb-16 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Dedicated bandwidth
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Nobody else is
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              on your line.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            Contended services are sold on a peak figure and delivered on an
            average one. Dedicated capacity removes the variable: what you buy
            at five in the morning is what you have at five in the evening.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Talk to a connectivity expert
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet#compare">Compare connectivity</Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* Two cards at different depths, overlapping the seam. */}
        <ScrollReveal delay={140} className="relative">
          <div
            aria-hidden
            className="relative mx-auto max-w-md space-y-5 lg:-ml-16"
          >
            {/* Contended */}
            <div className="rounded-2xl border border-border bg-background/80 p-6 shadow-sm backdrop-blur-md">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  Shared segment
                </p>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="size-3.5" />
                  many
                </span>
              </div>
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-muted">
                <div className="scene-jitter h-full w-full rounded-full bg-muted-foreground/40" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Moves with the neighbours and the hour
              </p>
            </div>

            {/* Dedicated — offset the other way, so the pair reads as a
                stack rather than a list. */}
            <div className="rounded-2xl border border-primary/30 bg-background p-6 shadow-lg lg:ml-14">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                  Dedicated port
                </p>
                <span className="text-xs text-primary">yours</span>
              </div>
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-primary/15">
                <div className="h-full w-full rounded-full bg-primary" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                The same at 09:00 and at 17:00
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* The figure rail. */}
      <div className="relative border-t border-border/70 bg-background/60 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-7xl gap-x-8 gap-y-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {dedicatedFacts.map(({ value, label }, index) => (
            <ScrollReveal key={label} delay={index * 80} shift={10}>
              <dt className="bg-gradient-to-br from-brand-from to-brand-to bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
                {value}
              </dt>
              <dd className="mt-1.5 text-sm text-muted-foreground">{label}</dd>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * The cost of contention, drawn as it actually happens: your share of a
 * shared segment does not fade, it drops each time another subscriber lands
 * on it, and it only recovers when they all go home.
 */
export function DedicatedBandwidthSections() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <ScrollReveal className="max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Contention
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What &ldquo;up to&rdquo; actually means
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A contended service quotes the best case. The rest of the segment
            decides what you get, and they all arrive at roughly the hours you
            are busiest.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border lg:grid-cols-2">
          {/* Shared */}
          <div className="bg-background p-8 lg:p-10">
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              A shared segment, through the day
            </p>

            <div aria-hidden className="mt-7">
              <div className="h-8 w-full overflow-hidden rounded-lg bg-muted">
                <div className="share-steps h-full w-full rounded-lg bg-gradient-to-r from-muted-foreground/50 to-muted-foreground/25" />
              </div>
              <p className="mt-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                your share
              </p>

              <ul className="mt-6 space-y-2.5">
                {contentionNeighbours.map((name, index) => (
                  <li
                    key={name}
                    className="share-join flex items-center gap-2.5 text-sm text-muted-foreground"
                    style={
                      {
                        "--join-delay": `${0.9 + index * 0.9}s`,
                      } as React.CSSProperties
                    }
                  >
                    <Users className="size-4 shrink-0 text-muted-foreground/50" />
                    {name} joins
                  </li>
                ))}
              </ul>
            </div>

            {/* The same thing in words, for anyone the loop is hidden from. */}
            <p className="mt-8 text-sm text-pretty text-muted-foreground">
              Every subscriber who joins the segment takes a share of the same
              capacity. Nothing has broken and nothing will show on a fault
              report — the service is behaving exactly as sold.
            </p>
          </div>

          {/* Dedicated */}
          <div className="bg-gradient-to-br from-primary/5 to-background p-8 lg:p-10">
            <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
              A dedicated port, through the day
            </p>

            <div aria-hidden className="mt-7">
              <div className="h-8 w-full overflow-hidden rounded-lg bg-primary/15">
                <div className="h-full w-full rounded-lg bg-gradient-to-r from-brand-from to-brand-to" />
              </div>
              <p className="mt-2 font-mono text-[10px] tracking-wider text-primary uppercase">
                your share
              </p>

              <ul className="mt-6 space-y-2.5">
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Users className="size-4 shrink-0 text-primary/40" />
                  nobody joins
                </li>
              </ul>
            </div>

            <p className="mt-8 text-sm text-pretty text-muted-foreground">
              Capacity is provisioned against your requirement and delivered to
              a committed rate. The bar does not move, which is the entire
              thing you are buying.
            </p>

            <Button asChild className="mt-8">
              <Link href="/contact">
                Size a dedicated port
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
