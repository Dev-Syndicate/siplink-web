import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { CtaPanel } from "@/components/site/cta-panel";
import { IncludedCards } from "@/components/site/included-cards";
import { QueueSplit } from "@/components/site/queue-split";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { businessSizes, type SizeContent } from "@/lib/business-size";
import { integrationLogos } from "@/lib/site";
import type { SolutionDetail } from "@/lib/solutions";
import { cn } from "@/lib/utils";

/**
 * Mid-Market, given its own page in the family with Small Business and
 * Enterprise.
 *
 * Each size argues from what its reader stands to lose. Small Business is
 * afraid of the call nobody picks up; Enterprise is afraid of the weekend
 * cutover. This size is afraid of neither — it is afraid of the caller who
 * gives up waiting, and of not being able to say afterwards why. The source
 * copy names both halves: where calls are going and where they are waiting,
 * and reports whose point is the staffing decision they inform.
 *
 * So the queue takes the hero, and the payoff of splitting it is legibility
 * rather than speed. Same three departures from the site template as its two
 * neighbours: no banded sections, one padding pair shared by every section
 * below the hero, and capabilities as cards rather than icon rows.
 */
export function MidMarketSolution({
  solution,
  size,
}: {
  solution: SolutionDetail;
  size: SizeContent;
}) {
  const {
    group,
    title,
    intro,
    challenge,
    handling,
    capabilities,
    gain,
    idealFor,
  } = solution;

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            {group}
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h1 className="max-w-[16ch] text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {size.headline ?? title}
              </h1>

              <p className="mt-6 max-w-[50ch] text-lg text-pretty text-muted-foreground">
                {size.standfirst ?? intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">Talk to us</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>

            <QueueSplit />
          </div>
        </div>
      </section>

      {/* The objection, at headline weight, because it is the reader's own
          thought. The reply sits under it at body weight and a narrower
          measure — two equal columns would have made them argue. */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-14 lg:px-10 lg:pt-24 lg:pb-16">
        <h2 className="max-w-[20ch] text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {challenge.heading}
        </h2>
        <p className="mt-6 max-w-[56ch] text-lg text-pretty text-muted-foreground">
          {challenge.body}
        </p>

        <div className="mt-12 max-w-[58ch] border-t border-border pt-10 lg:ml-24">
          <h3 className="text-xl font-semibold tracking-tight">
            {handling.heading}
          </h3>
          <div className="mt-4 space-y-4">
            {handling.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-pretty text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <IncludedCards
        capabilities={capabilities}
        standfirst="Four capabilities a growing organisation grows into. Each one is configuration on the platform you already have, not another system beside it."
      />

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Calling, where the work already happens
            </h2>
            <p className="mt-4 max-w-[52ch] text-pretty text-muted-foreground">
              Where supported, calls connect to the CRM and business
              applications your teams already use — so an agent answers with the
              record already open.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-5">
            {integrationLogos.map((logo) => (
              <li
                key={logo.name}
                className="flex aspect-[3/2] items-center justify-center bg-card p-4"
              >
                {/* Sized by width, not height. These files carry a lot of
                    their own margin — most are wide lockups whose ink is a
                    fifth as tall as it is wide — so a fixed height shrank the
                    mark itself to a few pixels. `fill` is the measured
                    correction; see `integrationLogos`. */}
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={90}
                  style={{ width: `${logo.fill}%` }}
                  className="max-h-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Questions at this size
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {size.faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[68ch] text-pretty text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* The close carries who it is for, so the page does not spend a
          section saying so and then another asking for the call. */}
      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-20">
        {idealFor ? (
          <ul className="grid border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border">
            {idealFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 py-5 text-pretty text-muted-foreground sm:px-6 sm:first:pl-0 sm:last:pr-0"
              >
                <Check
                  className="mt-1 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

      </section>

      {/* The closing ask, in the site's one CTA shape — see cta-panel. */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <CtaPanel
          eyebrow="Sized to your team &middot; Grow without switching"
          heading={gain.heading}
          body={gain.body}
        />
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
          <h2 className="text-sm font-medium text-muted-foreground">
            Not quite your size?
          </h2>

          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {businessSizes.map((other) => {
              const current = other.slug === size.slug;
              return (
                <li key={other.slug}>
                  <Link
                    href={`/solutions/${other.slug}`}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group inline-flex items-center gap-2 text-lg font-medium transition-colors",
                      current
                        ? "text-muted-foreground"
                        : "hover:text-primary focus-visible:text-primary",
                    )}
                  >
                    {other.short}
                    {current ? (
                      <span className="text-sm font-normal">you are here</span>
                    ) : (
                      <ArrowRight
                        className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
