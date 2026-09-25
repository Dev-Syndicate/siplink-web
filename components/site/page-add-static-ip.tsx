import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  staticIpFaqs,
  staticIpReadiness,
  staticIpShapes,
} from "@/lib/internet";
import { cn } from "@/lib/utils";
import { StaticProvisionScene } from "@/components/site/scene-static-provision";
import { AddStaticIpHeroScene } from "@/components/site/scene-add-hero";

/**
 * /internet/static-ip/add-static-ip
 *
 * The hero used to be a ticket card whose four stages ticked over and
 * stopped. The stages were the right content; what a checklist cannot show
 * is the sentence beside it that people actually want answered — that the
 * existing connection keeps running throughout. It is an animated stage now,
 * drawn in solid white rather than glass; see scene-add-hero.
 */
export function AddStaticIpHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* Nothing painted behind the right-hand column. The stage there is
          plain white cards on plain white ground, and a wash under them is
          exactly what made the old panel look like a gradient. */}

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-20 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Add static IP
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            A change to your service,
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              not a new installation.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            Static IP can be added to an eligible SipLink internet service.
            Your existing connection normally keeps running throughout — tell
            us what needs to reach what, and we will confirm whether your
            service supports it.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Request a static IP
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/static-ip/business-uses">
                Not sure if you need one?
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* The request, and the thing beside it that never drops. */}
        <ScrollReveal delay={140}>
          <AddStaticIpHeroScene label="A static IP request advancing through requirement, eligibility, address assignment and configuration, with the internet service shown live throughout and the issued address appearing at the end." />
        </ScrollReveal>

      </div>
    </section>
  );
}

export function AddStaticIpSections() {
  return (
    <>
      {/* One or several */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              How many
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              One address, or a block?
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              This is the only real decision in the request, and it is decided
              by what has to be reachable rather than by a number you pick.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border lg:grid-cols-2">
            {staticIpShapes.map(({ title, summary, points, note }, index) => (
              <ScrollReveal
                key={title}
                delay={index * 100}
                className={cn(
                  "p-8 lg:p-10",
                  index === 0
                    ? "bg-gradient-to-br from-primary/5 to-background"
                    : "bg-background",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg font-mono text-sm font-semibold",
                      index === 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {index === 0 ? "1" : "N"}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-balance">
                    {title}
                  </h3>
                </div>

                <p className="mt-5 text-pretty text-muted-foreground">
                  {summary}
                </p>

                <ul className="mt-7 space-y-3">
                  {points.map((point, pointIndex) => (
                    <ScrollReveal
                      as="li"
                      key={point}
                      delay={pointIndex * 60}
                      shift={8}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span className="text-muted-foreground">{point}</span>
                    </ScrollReveal>
                  ))}
                </ul>

                <p className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground/80">
                  {note}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Have these ready */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Before you ask
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Five things worth having ready
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                None of these is required to start a conversation. Having them
                is simply the difference between one exchange and four.
              </p>

              <Button asChild className="mt-8">
                <Link href="/contact">
                  Request a static IP
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </ScrollReveal>

            <ol className="space-y-px overflow-hidden rounded-2xl bg-border">
              {staticIpReadiness.map(({ title, body }, index) => (
                <ScrollReveal
                  as="li"
                  key={title}
                  delay={index * 70}
                  shift={10}
                  className="group flex gap-5 bg-background p-6 transition-colors hover:bg-primary/5 lg:p-7"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{title}</h3>
                    <p className="mt-1.5 text-pretty text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Questions
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                The ones we are actually asked
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Accordion type="single" collapsible className="w-full">
                {staticIpFaqs.map(({ question, answer }, index) => (
                  <AccordionItem key={question} value={`static-faq-${index}`}>
                    <AccordionTrigger className="text-left text-base">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="text-pretty text-muted-foreground">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How the request runs */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              How the request runs
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Five answers, then an address
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              People expect to ask for an address and be handed one. What actually decides it is what needs it, who configures it and which service it is for — so the request completes in that order, and the address arrives at the end of it.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-12 lg:mt-14">
            <StaticProvisionScene label="A static IP request completing one answer at a time — what needs it, who configures it, the service, what already points at you and the deadline — followed by the address being issued and configured on the router." />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
