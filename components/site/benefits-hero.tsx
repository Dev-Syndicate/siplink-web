import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * The opening band on
 * /internet/business-broadband/business-benefits.
 *
 * The third of these bands, and deliberately the third shape. Plans floats
 * cards over the artwork; Features runs a rail along the foot; this one
 * stacks three outcomes in a fixed column against the rising chart, joined by
 * a rule so they read as a progression rather than a set. Nothing floats
 * here — the argument is that things settle down, so a drifting card would
 * be saying the opposite of the copy.
 */

const outcomes = [
  {
    step: "01",
    title: "It stops being a topic",
    body: "No standing item in the Monday meeting.",
  },
  {
    step: "02",
    title: "Your team stops working around it",
    body: "No scheduling large uploads for the evening.",
  },
  {
    step: "03",
    title: "You stop being the escalation path",
    body: "One supplier for the line, the router and the calls.",
  },
];

export function BenefitsHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <Image
        src="/internet/benifits.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-right dark:opacity-40"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/70"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Business broadband benefits
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            The best outcome is
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              that nobody mentions it.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg text-pretty text-muted-foreground">
            The difference between a business connection and a consumer one
            shows up in ordinary weeks rather than exceptional ones — in
            whether the Monday call holds, and in who picks up when it does
            not.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Get a business broadband quote
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/business-broadband/features">
                See the features
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* Three outcomes, joined by a rule. Anchored rather than floating —
            see the note at the top of this file. */}
        <ScrollReveal delay={140} className="relative hidden lg:block">
          <ol className="relative ml-4 space-y-5 border-l border-border/70 pl-8">
            {outcomes.map(({ step, title, body }, index) => (
              <ScrollReveal
                as="li"
                key={step}
                delay={220 + index * 110}
                shift={12}
                className="relative rounded-xl border border-border/60 bg-background/70 p-5 backdrop-blur-md"
              >
                {/* The node on the rule, aligned to this card's first line. */}
                <span
                  aria-hidden
                  className="absolute top-6 -left-[2.3rem] flex size-3 items-center justify-center"
                >
                  <span className="size-3 rounded-full border-2 border-primary bg-background" />
                </span>

                <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                  {step}
                </p>
                <p className="mt-1.5 font-semibold tracking-tight">{title}</p>
                <p className="mt-1 text-sm text-pretty text-muted-foreground">
                  {body}
                </p>
              </ScrollReveal>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}
