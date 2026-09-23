import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaPanel } from "@/components/site/cta-panel";
import { BusinessHoursHero } from "@/components/site/business-hours-hero";
import { ReachFigure } from "@/components/site/reach-figure";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { businessSizes, type SizeContent } from "@/lib/business-size";
import { integrationLogos } from "@/lib/site";
import type { SolutionDetail } from "@/lib/solutions";
import { cn } from "@/lib/utils";

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
 * - No grey banding. Every other page alternates white and `bg-muted/30`
 *   between `border-y` rules, and that stripe is the single strongest reason
 *   they all look alike. Here the page is held together by measure and space,
 *   with rules only where a rule carries information, so every section below
 *   the hero shares one padding pair and none is tuned on its own. The one
 *   tinted section is a brand gradient that fades in and out of white rather
 *   than a flat band between two rules — it marks the capabilities without
 *   reintroducing the stripe.
 * - Capabilities as four equal cards, filled and quiet alternating. Two tones
 *   in one set, not a winner and three runners-up: the row is the only place
 *   below the hero that carries colour, and it carries it as rhythm.
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
        {/* No rule between the objection and the reply. They are one thought
            — the reader's doubt and the answer to it — and a line across the
            middle made them read as two sections that happened to be next to
            each other.

            Both of them are in the left column now. The figure is what the
            reply looks like, but it answers the objection too, so it stands
            against the pair and is centred on the whole of it. Previously
            the heading sat above this grid and the figure lined up with the
            reply alone, which is not what the comment here claimed. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-center lg:gap-16">
          <div>
            <h2 className="max-w-[20ch] text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {challenge.heading}
            </h2>
            <p className="mt-6 max-w-[56ch] text-lg text-pretty text-muted-foreground">
              {challenge.body}
            </p>

            <div className="mt-10 max-w-[56ch]">
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
          </div>

          {/* Beside the sentences it draws: one call, three places, at once.
              No `justify-self-end` here — that sizes the grid item to its own
              content, which left the figure's `w-full` with nothing to fill
              and capped it well under the column. Stretched, then pushed
              right from inside, it takes the width it was given. */}
          <div className="lg:ml-auto lg:w-full">
            <ReachFigure />
          </div>
        </div>
      </section>

      {/* What you get.

          The tint is on the section itself rather than on a panel inside it,
          so the colour is the ground the cards stand on instead of a card the
          page is carrying. It fades in and out of white at both edges, which
          is what stops a full-width band reading as a stripe.

          Filled and quiet alternate down the row. That is rhythm, not ranking
          — with two cards filled neither is being promoted over the other, so
          the four read as one set in two tones rather than a winner and three
          runners-up. */}
      {/* The rule moves here, where it does some work: it is the edge of the
          tinted band, marking where the argument stops and the list of what
          you actually get begins. `brand-from` rather than `accent` for the
          peak — accent tops out near white, so however far it is pushed the
          band stays invisible. */}
      <section className="border-t border-border bg-gradient-to-b from-background via-brand-from/20 to-background">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What you get
          </h2>
          <p className="mt-3 max-w-[54ch] text-pretty text-muted-foreground">
            None of these is an add-on. They come with the line, and they are
            set up from the same portal as everything else.
          </p>

          {/* The grid's default `stretch` is what makes the heights equal:
              each card fills its row rather than sizing to its own copy, so
              the four foot-aligned paragraphs stay on one line whatever the
              wording does. */}
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {capabilities.map(
              ({ title: name, description, icon: Icon }, index) => {
                const filled = index % 2 === 0;

                return (
                  <li
                    key={name}
                    className={cn(
                      "relative flex flex-col overflow-hidden rounded-3xl p-6",
                      filled
                        ? /* Solid, not a brand gradient: `brand-from` is a
                             pale pink and white body copy on it falls under
                             the contrast floor. The tonal interest comes from
                             the swells at the foot instead. */
                          "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "border border-border bg-card shadow-sm",
                    )}
                  >
                    <span
                      className={cn(
                        "relative flex size-11 items-center justify-center rounded-full",
                        filled
                          ? "bg-background/25 text-primary-foreground"
                          : "bg-accent text-primary",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>

                    <h3 className="relative mt-5 text-lg leading-snug font-semibold tracking-tight text-balance">
                      {name}
                    </h3>

                    <p
                      className={cn(
                        "relative mt-auto pt-6 text-sm text-pretty",
                        filled
                          ? /* Full white, not a faded one: at 85% this fell to
                               3.8:1 on the crimson, under the 4.5 floor for
                               body text. The step down from the title is made
                               with size and weight instead. */
                            "text-primary-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {description}
                    </p>

                    {/* The one flourish, and it lives only on the filled
                        cards: soft overlapping swells at the foot, behind
                        the text. */}
                    {filled ? (
                      <svg
                        aria-hidden
                        viewBox="0 0 200 80"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full"
                      >
                        <path
                          d="M0 58 C 42 26, 74 28, 112 56 C 142 78, 172 74, 200 54 L200 80 L0 80 Z"
                          className="fill-background/10"
                        />
                        <path
                          d="M0 72 C 52 44, 92 46, 132 68 C 162 84, 182 82, 200 72 L200 80 L0 80 Z"
                          className="fill-background/[0.07]"
                        />
                      </svg>
                    ) : null}
                  </li>
                );
              },
            )}
          </ul>
        </div>
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

      </section>

      {/* The closing ask, in the site's one CTA shape — see cta-panel. The
          second sentence is this page's own: it is the only size where the
          next step is "tell us how you take calls today". */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <CtaPanel
          eyebrow="Sized to your team &middot; Grow without switching"
          heading={gain.heading}
          body={`${gain.body} Tell us how your team takes calls today and we will recommend a configuration, including porting the numbers you already have.`}
        />
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
