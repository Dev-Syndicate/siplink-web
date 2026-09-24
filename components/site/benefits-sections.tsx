import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Button } from "@/components/ui/button";
import { benefitRoles, benefitScenarios } from "@/lib/internet";

/**
 * Supporting sections for
 * /internet/business-broadband/business-benefits.
 *
 * Both are shapes the internet pages have not used yet, which is the point —
 * Plans got profile cards and an auto-advancing timeline, Features got
 * alternating diagram cards, and a benefits page that reused either would
 * read as the same page with different words.
 *
 * The first is an accordion, because a benefits list is the easiest thing on
 * a website to write six unbelievable lines into. Putting each claim in a
 * moment you can picture is what keeps it honest: a scenario cannot hide
 * behind an adjective the way "reliable connectivity" can. The first item is
 * open by default so the pattern is visible without a click.
 */
export function BenefitsSections() {
  return (
    <>
      {/* An ordinary week */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                An ordinary week
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Six benefits, placed in a real week
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Anyone can write &ldquo;reliable connectivity&rdquo; on a page.
                These are the moments that phrase is supposed to mean — one for
                each day, in the order they tend to happen.
              </p>

              <div className="mt-8 flex items-center gap-2.5 rounded-xl border border-border bg-background p-4">
                <CalendarClock
                  className="size-5 shrink-0 text-primary"
                  aria-hidden
                />
                <p className="text-sm text-muted-foreground">
                  Monday morning is the week&rsquo;s real test — not the
                  afternoon a speed test gets run in.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Accordion
                type="single"
                collapsible
                defaultValue="benefit-0"
                className="w-full"
              >
                {benefitScenarios.map(({ benefit, when, body }, index) => (
                  <AccordionItem key={benefit} value={`benefit-${index}`}>
                    <AccordionTrigger className="text-left">
                      <span className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-4">
                        <span className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                          {when}
                        </span>
                        <span className="text-base font-semibold tracking-tight">
                          {benefit}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-pretty text-muted-foreground">
                      {body}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Who notices */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Who feels it
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Four people, four different reliefs
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Connectivity is bought by one person and lived with by everyone
              else. These are the four who notice a change, and the thing each
              of them actually notices.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {benefitRoles.map(({ role, notices, icon: Icon }, index) => (
              <ScrollReveal
                as="li"
                key={role}
                delay={index * 80}
                shift={14}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-colors hover:border-primary/40 lg:p-8"
              >
                {/* A rule that draws in along the top edge on hover — the
                    cards do not lift, so a four-card grid does not appear to
                    shuffle as the pointer crosses it. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
                />

                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>

                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {role}
                </h3>
                <p className="mt-3 text-pretty text-muted-foreground">
                  {notices}
                </p>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal
            delay={120}
            className="mt-12 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-muted/30 p-7"
          >
            <p className="max-w-xl text-pretty text-muted-foreground">
              If an hour of degraded performance would cost you more than
              patience, the honest answer is dedicated internet rather than a
              larger broadband plan.
            </p>
            <Button asChild variant="outline" className="ml-auto">
              <Link href="/internet/dedicated-internet">
                See dedicated internet
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
