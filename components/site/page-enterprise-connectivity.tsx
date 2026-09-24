import Link from "next/link";
import { ArrowRight, Gauge } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { enterpriseQuestions } from "@/lib/internet";

/**
 * /internet/dedicated-internet/enterprise-connectivity
 *
 * The badge cards scattered around the second reference's subject are used
 * here for the requirements, drifting at different rates around a fixed
 * centre. The movement is the argument: the inputs move, the design is what
 * holds them together.
 *
 * `card-float` already exists for exactly this and is staggered per chip, so
 * the group never pulses in unison — which is what makes a set of floating
 * elements look mechanical rather than alive.
 */
const requirements = [
  { label: "Applications", position: "top-[4%] left-[2%]", delay: 0 },
  { label: "Locations", position: "top-[20%] right-[4%]", delay: 1.1 },
  { label: "Cloud", position: "top-[44%] left-[-2%]", delay: 2.2 },
  { label: "Voice", position: "bottom-[22%] right-[2%]", delay: 0.6 },
  { label: "Redundancy", position: "bottom-[2%] left-[12%]", delay: 1.7 },
  { label: "Security", position: "top-[2%] right-[26%]", delay: 2.8 },
];

export function EnterpriseConnectivityHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 -z-10 size-[560px] rounded-full bg-brand-from/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-40 -z-10 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-20 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Enterprise connectivity
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Bandwidth is the
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              last question.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            Two organisations with identical headcounts and identical budgets
            can need entirely different networks, because one runs everything
            in a data centre and the other runs everything in someone
            else&rsquo;s cloud.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Start with the architecture
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/network-solutions/multi-location-networking">
                Multi-location networking
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* Requirements orbiting a fixed centre. */}
        <ScrollReveal delay={140}>
          <div
            aria-hidden
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            {/* Two rings, for depth behind the chips. */}
            <div className="absolute inset-[12%] rounded-full border border-dashed border-border" />
            <div className="absolute inset-[28%] rounded-full border border-border/70" />

            {/* The centre. */}
            <div className="absolute inset-[34%] flex flex-col items-center justify-center rounded-full border border-primary/40 bg-background text-center shadow-sm">
              <Gauge className="size-6 text-primary" />
              <p className="mt-2 px-2 font-mono text-[9px] leading-tight tracking-[0.14em] text-muted-foreground uppercase">
                Your design
              </p>
            </div>

            {requirements.map(({ label, position, delay }) => (
              <span
                key={label}
                style={
                  {
                    "--float-delay": `${delay}s`,
                    "--float-duration": "7.5s",
                  } as React.CSSProperties
                }
                className={`card-float absolute ${position} rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-sm shadow-sm backdrop-blur-md`}
              >
                {label}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/**
 * The questions themselves, in four groups. Deliberately a list of questions
 * rather than a list of capabilities: the page's claim is that the design
 * comes out of a conversation, and a grid of features would quietly say the
 * opposite.
 */
export function EnterpriseConnectivitySections() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <ScrollReveal className="max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Before a port size
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Twelve questions we ask first
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            None of them is about speed. Answer these and the port size falls
            out of the conversation — which is the right way round.
          </p>
        </ScrollReveal>

        <ul className="mt-14 grid gap-6 lg:grid-cols-2">
          {enterpriseQuestions.map(
            ({ group, icon: Icon, questions }, index) => (
              <ScrollReveal
                as="li"
                key={group}
                delay={index * 80}
                shift={14}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-colors hover:border-primary/40 lg:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {group}
                  </h3>
                </div>

                <ul className="relative mt-6 space-y-3.5">
                  {questions.map((question, questionIndex) => (
                    <ScrollReveal
                      as="li"
                      key={question}
                      delay={questionIndex * 60}
                      shift={8}
                      className="flex items-start gap-3 border-t border-border pt-3.5 first:border-t-0 first:pt-0"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/50"
                      />
                      <span className="text-pretty text-muted-foreground">
                        {question}
                      </span>
                    </ScrollReveal>
                  ))}
                </ul>
              </ScrollReveal>
            ),
          )}
        </ul>

        <ScrollReveal
          delay={120}
          className="mt-12 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-background p-7"
        >
          <p className="max-w-xl text-pretty text-muted-foreground">
            Tell us what your sites look like, where your applications live and
            what cannot be allowed to stop. We will come back with a design
            rather than a price list.
          </p>
          <Button asChild variant="outline" className="ml-auto">
            <Link href="/contact">
              Talk to a connectivity expert
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
