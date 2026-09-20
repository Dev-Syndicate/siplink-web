import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BusinessHoursHero } from "@/components/site/business-hours-hero";
import { ReachFigure } from "@/components/site/reach-figure";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { businessSizes, type SizeContent } from "@/lib/business-size";
import type { SolutionDetail } from "@/lib/solutions";
import { cn } from "@/lib/utils";

/** The wired integrations, as a quiet strip rather than the full wall. */
const LOGOS = [
  { name: "Salesforce", src: "/integration-logos/salesforce.png" },
  { name: "Microsoft Teams", src: "/integration-logos/ms-teams.png" },
  { name: "Google Workspace", src: "/integration-logos/google-workspace.png" },
  { name: "Zendesk", src: "/integration-logos/zendesk.png" },
  { name: "MS Outlook", src: "/integration-logos/outlook.png" },
  { name: "Sugar CRM", src: "/integration-logos/sugar-crm.png" },
] as const;

/**
 * Small Business, given its own page rather than the shared size shell.
 *
 * The four sizes already take the position that each one gets the moment
 * characteristic of it rather than one diagram at four densities — see the
 * note at the top of lib/business-size.ts. This page follows that the rest of
 * the way: the working day is not an illustration beside the pitch, it is the
 * pitch, so the dial takes the hero and everything under it goes quiet.
 *
 * Two deliberate departures from the rest of the site, which is what stops
 * this page reading as another instance of the template:
 *
 * - No banded sections. Every other page alternates white and `bg-muted/30`
 *   between `border-y` rules, and that stripe is the single strongest reason
 *   they all look alike. Here the page is one continuous field, held together
 *   by measure and space, with rules only where a rule carries information.
 *   That puts the whole weight on the vertical rhythm, so every section below
 *   the hero shares one padding pair and none is tuned on its own.
 * - Capabilities as a term-and-description list on full-width rules rather
 *   than the site's icon rows. It reads like a list of services on a wall,
 *   which is the right register for the reader, and dropping the icons is
 *   what keeps the page calm enough for the dial to be the loud thing.
 */
export function SmallBusinessSolution({
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
      <BusinessHoursHero
        group={group}
        headline={size.headline ?? title}
        standfirst={size.standfirst ?? intro}
      />

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

        <div className="mt-14 grid gap-12 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
          <div className="max-w-[56ch]">
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

          {/* Beside the sentence it draws: one call, three places, at once. */}
          <div className="lg:justify-self-end">
            <ReachFigure />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          What you get
        </h2>

        <dl className="mt-10">
          {capabilities.map(({ title: name, description }) => (
            <div
              key={name}
              className="grid gap-x-10 gap-y-2 border-t border-border py-6 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]"
            >
              <dt className="font-medium">{name}</dt>
              <dd className="max-w-[60ch] text-pretty text-muted-foreground">
                {description}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Integrations. Named, because logos on their own are a claim with no
          subject — what matters is that calling reaches these, not that the
          artwork exists. */}
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

          <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-6">
            {LOGOS.map((logo) => (
              <li
                key={logo.name}
                className="flex aspect-[3/2] items-center justify-center bg-card p-4"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={60}
                  className="h-7 w-auto max-w-full object-contain"
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
          section saying so and then another asking for the call. `gain`
          supplies the heading — it is already the closing claim. */}
      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-20">
        {idealFor ? (
          <ul className="grid border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border">
            {idealFor.map((item) => (
              <li
                key={item}
                className="py-5 text-pretty text-muted-foreground sm:px-6 sm:first:pl-0 sm:last:pr-0"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <h2 className="mt-16 max-w-[18ch] text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl">
          {gain.heading}
        </h2>
        <p className="mt-5 max-w-[56ch] text-lg text-pretty text-muted-foreground">
          {gain.body} Tell us how your team takes calls today and we will
          recommend a configuration, including porting the numbers you already
          have.
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

      {/* The other three sizes, as plain navigation. */}
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
