import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * The opening band on /internet/business-broadband/plans.
 *
 * The artwork does the argument's work, which is why it is worth a section of
 * its own: the plinths step up from right to left, so the page opens on a
 * picture of capacity growing rather than on a stock office. The chips
 * floating over them name what the steps are made of — the same four inputs
 * the page goes on to explain.
 *
 * Composition notes:
 *
 * - The image is anchored right. Its left half is an almost empty wash, so
 *   the text column sits on clean ground at every width and the scrim only
 *   has to do a little work.
 * - The scrim is built from `--background`, so it inverts with the theme. The
 *   artwork itself is light in both themes, hence the dark-mode dim: without
 *   it a pale photograph would glare out of a dark page.
 * - Nothing here is load-bearing for meaning. The image is decorative
 *   (`alt=""`) because every claim it illustrates is also written in the
 *   copy beside it.
 */

/** The floating chips, ordered to climb with the plinths behind them. */
const inputs = [
  { label: "Users", detail: "at once, not on paper", top: "18%", delay: 0 },
  { label: "Applications", detail: "what they actually run", top: "38%", delay: 0.8 },
  { label: "Upload", detail: "the half that gets missed", top: "58%", delay: 1.6 },
  { label: "Voice", detail: "sized and prioritised", top: "78%", delay: 2.4 },
];

const assurances = [
  { label: "Sized per site", detail: "after a feasibility check" },
  { label: "Static IP available", detail: "on eligible plans" },
  { label: "Monitored 24/7", detail: "from our Chennai NOC" },
];

export function PlansHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <Image
        src="/internet/business.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-right dark:opacity-40"
      />

      {/* Scrim: solid behind the text, clearing before the plinths. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/70"
      />
      {/* And a short fade at the foot, so the band meets the next section
          without a hard seam across the artwork. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:py-28">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Business broadband plans
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Start where you are.
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              Step up when you grow.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg text-pretty text-muted-foreground">
            There is no standard office, so we do not sell a standard plan.
            Your connection is built from what the business actually runs —
            and changed when that changes, rather than at renewal.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Get a business broadband quote
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet#compare">Compare connectivity</Link>
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            {assurances.map(({ label, detail }, index) => (
              <ScrollReveal
                as="li"
                key={label}
                delay={220 + index * 80}
                shift={8}
                className="flex items-start gap-2.5"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                <span className="text-sm">
                  <span className="block font-medium">{label}</span>
                  <span className="block text-muted-foreground">{detail}</span>
                </span>
              </ScrollReveal>
            ))}
          </ul>
        </ScrollReveal>

        {/* The chips sit over the plinths, so they need the artwork to be
            visible to make sense — below `lg` the image is mostly scrim and
            they would float over nothing, so they are dropped rather than
            stacked into the text column. */}
        <div aria-hidden className="relative hidden lg:block">
          {inputs.map(({ label, detail, top, delay }) => (
            <div
              key={label}
              style={
                {
                  top,
                  "--float-delay": `${delay}s`,
                  "--float-duration": "7s",
                } as React.CSSProperties
              }
              className="card-float absolute right-0 w-56 rounded-xl border border-border/60 bg-background/70 p-4 shadow-sm backdrop-blur-md xl:right-8"
            >
              <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-primary uppercase">
                {label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
