import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { EstatePanel } from "@/components/site/estate-panel";
import { EstateSteps } from "@/components/site/estate-steps";
import { IncludedCards } from "@/components/site/included-cards";
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
 * Enterprise, given its own page rather than the shared size shell.
 *
 * The four sizes already take the position that each gets the moment
 * characteristic of it — see the note at the top of lib/business-size.ts.
 * What is characteristic here is not volume or topology, it is the estate
 * already in the ground: Teams, PBX platforms, trunks, CRM and contact
 * centres that all work today and that nobody wants touched. So the page
 * argues from what survives rather than from what arrives.
 *
 * It follows Small Business in dropping the site's banded rhythm — the
 * white/`bg-muted/30` stripe between `border-y` rules is the strongest
 * reason every page looks alike — so the two redesigned size pages read as
 * one system.
 */
export function EnterpriseSolution({
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

          {/* Claim and the four steps it takes. The estate figure proper
              lives further down beside the argument it makes; what belongs
              up here is the thing the reader is afraid of — the weekend
              cutover — answered by a sequence that advances against an
              estate still carrying calls. */}
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h1 className="max-w-[18ch] text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
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

            <EstateSteps />
          </div>
        </div>
      </section>

      {/* The complaint, the figure, then the answer.
          The panel sits between them rather than beside either, because its
          two beats are those two headings: six systems nobody can see whole,
          and then the same six with a layer between them. Putting it in the
          middle makes it the hinge — the picture of what you have just read,
          turning into the picture of what you are about to. It runs the full
          width here, which is room the hero's right-hand column never gave
          it. */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-14 lg:px-10 lg:pt-24 lg:pb-20">
        <h2 className="max-w-[20ch] text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {challenge.heading}
        </h2>
        <p className="mt-6 max-w-[56ch] text-lg text-pretty text-muted-foreground">
          {challenge.body}
        </p>

        <div className="mt-12 lg:mt-14">
          <EstatePanel />
        </div>

        <div className="mt-12 max-w-[58ch] lg:mt-14">
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
        standfirst="Six capabilities that make up the layer. Each one connects to something you already run rather than standing in for it."
      />

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Calling, where the work already happens
            </h2>
            <p className="mt-4 max-w-[52ch] text-pretty text-muted-foreground">
              Where supported, calls connect to the CRM and business
              applications your teams already use — so a conversation is logged
              against the customer rather than remembered separately.
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

        <h2 className="mt-16 max-w-[18ch] text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl">
          {gain.heading}
        </h2>
        <p className="mt-5 max-w-[56ch] text-lg text-pretty text-muted-foreground">
          {gain.body}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/contact">Talk to us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/pricing">View pricing</Link>
          </Button>
        </div>
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
