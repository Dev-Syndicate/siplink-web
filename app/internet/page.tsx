import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ComparisonMatrix } from "@/components/site/comparison-matrix";
import { ConnectivityScene } from "@/components/site/connectivity-scene";
import { NetworkStack } from "@/components/site/network-stack";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  connectivityServices,
  internetAssurances,
  internetCapabilities,
  internetDelivery,
  internetDesignedFor,
  internetFaqs,
  internetHero,
  internetIntro,
  internetProof,
  internetWhy,
  networkSolutionsHub,
  networkServices,
} from "@/lib/internet";

export const metadata: Metadata = {
  title: "Internet",
  description:
    "Business broadband, dedicated internet leased lines, static IP and managed network solutions — fibre connectivity from a Class A ISP, monitored 24/7.",
};

/**
 * The /internet hub.
 *
 * Its job is routing, not exhaustiveness: name the four services, make the
 * difference between them legible, and get the reader into the right one.
 * The detail lives on the service pages. The one thing that belongs here
 * rather than there is the comparison — it only works when all five columns
 * are side by side.
 */
export default function InternetPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-24 size-[640px] rounded-full bg-brand-to/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-16 lg:px-10 lg:pt-20 lg:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-16">
            <ScrollReveal>
              <Badge variant="secondary" className="font-mono tracking-widest">
                {internetHero.eyebrow}
              </Badge>

              <h1 className="mt-6 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {internetHero.title}
              </h1>

              <p className="mt-8 max-w-2xl text-lg text-pretty text-muted-foreground lg:text-xl">
                {internetHero.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    {internetDesignedFor.cta}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#services">Explore services</Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <div className="rounded-2xl border border-border bg-muted/30 p-6 lg:p-8">
                <ConnectivityScene scene="network" />
              </div>
            </ScrollReveal>
          </div>

          {/* Proof strip — the hairline grid used on /products. */}
          <ScrollReveal delay={200}>
            <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4">
              {internetProof.map(({ value, label }) => (
                <div key={label} className="bg-background p-6">
                  <dt className="text-2xl font-semibold tracking-tight text-primary">
                    {value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio at a glance */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                The portfolio
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Everything between your desk and the internet
              </h2>
            </ScrollReveal>

            <div>
              {internetIntro.map((paragraph, index) => (
                <ScrollReveal
                  as="p"
                  key={paragraph}
                  delay={index * 80}
                  className={`max-w-3xl text-lg text-pretty text-muted-foreground ${
                    index > 0 ? "mt-4" : ""
                  }`}
                >
                  {paragraph}
                </ScrollReveal>
              ))}

              <ul className="mt-10 grid gap-x-8 gap-y-3.5 sm:grid-cols-2 xl:grid-cols-3">
                {internetCapabilities.map(({ label, icon: Icon }, index) => (
                  <ScrollReveal
                    as="li"
                    key={label}
                    delay={Math.min(index * 40, 400)}
                    shift={8}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-muted-foreground">{label}</span>
                  </ScrollReveal>
                ))}
              </ul>

              <ScrollReveal
                delay={120}
                className="mt-10 rounded-xl border border-border bg-background p-6"
              >
                <p className="text-sm text-pretty text-muted-foreground">
                  Our internet portfolio already includes dedicated leased
                  lines, VPN and managed connectivity, delivered through
                  carrier-neutral POPs in Chennai and Bangalore.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* The four services */}
      <section id="services" className="scroll-mt-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Choose your connectivity
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Start with the line, then add what runs on it
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              These are not three unrelated products. Pick the connectivity
              that matches how much a slow hour would cost you, and layer the
              network services you need on top.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2 xl:grid-cols-4">
            {[...connectivityServices, networkSolutionsHub].map(
              (service, index) => {
                const { slug, title, tagline, icon: Icon } = service;
                const href =
                  slug === networkSolutionsHub.slug
                    ? "/internet/network-solutions"
                    : `/internet/${slug}`;

                return (
                  <ScrollReveal
                    as="li"
                    key={slug}
                    delay={index * 80}
                    shift={12}
                    className="bg-background"
                  >
                    <Link
                      href={href}
                      className="group flex h-full flex-col p-8 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                    >
                      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold tracking-tight text-balance">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm text-pretty text-muted-foreground">
                        {tagline}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary">
                        Explore
                        <ArrowRight
                          className="size-3.5 transition-transform group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </ScrollReveal>
                );
              },
            )}
          </ul>

          {/* The six network services, named here so the fourth card is not
              a closed door. */}
          <ScrollReveal delay={120} className="mt-10">
            <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Under Network Solutions
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {networkServices.map(({ slug, title }) => (
                <li key={slug}>
                  <Link
                    href={`/internet/network-solutions/${slug}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary focus-visible:border-primary focus-visible:outline-none"
                  >
                    {title}
                    <ArrowRight
                      className="size-3 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* The stack */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Build your complete network
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              We are not selling you a connection
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              We can combine connectivity, security and network infrastructure
              into one design — the layer your business applications actually
              run on, rather than a line into the building and good luck.
            </p>
          </ScrollReveal>

          <NetworkStack />
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="scroll-mt-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Compare
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Which service does what
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Where an answer depends on the plan or the site, it says so.
              Anything marked as dependent is confirmed for your locations
              before you order.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100} className="mt-12">
            <ComparisonMatrix />
          </ScrollReveal>
        </div>
      </section>

      {/* Why SipLink */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Why SipLink internet
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Connectivity built around your business
            </h2>
          </ScrollReveal>

          <ul className="mt-14 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
            {internetWhy.map(({ title, description, icon: Icon }, index) => (
              <ScrollReveal
                as="li"
                key={title}
                delay={index * 60}
                shift={10}
                className="group"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-[1.15rem]" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-balance">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Assurances — the brochure's five badges */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <ScrollReveal
            as="h2"
            className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            What every connection comes with
          </ScrollReveal>

          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {internetAssurances.map(({ title, description, icon: Icon }, index) => (
              <ScrollReveal as="li" key={title} delay={index * 70} shift={10}>
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm text-pretty text-background/70">
                  {description}
                </p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Designed for business-critical connectivity */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
            <ScrollReveal>
              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {internetDesignedFor.heading}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={90}>
              <p className="max-w-3xl text-lg text-pretty text-muted-foreground">
                {internetDesignedFor.body}
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/contact">
                  {internetDesignedFor.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Delivery — how a circuit actually arrives */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Service delivery
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              From order to live circuit
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Connectivity is a build, not a download. Here is what happens
              between signing and the day your traffic moves.
            </p>
          </ScrollReveal>

          {/* Five steps, so a two-column grid leaves a bare grey cell on the
              last row at medium widths. Wrapping flex lets the last row grow
              to fill instead — see the same note in InternetServicePage. */}
          <ol className="mt-14 flex flex-wrap gap-px overflow-hidden rounded-2xl bg-border">
            {internetDelivery.map(({ title, body }, index) => (
              <ScrollReveal
                as="li"
                key={title}
                delay={index * 70}
                shift={10}
                className="flex grow basis-56 flex-col bg-background p-7"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-balance">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {body}
                </p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="scroll-mt-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                FAQs
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Business internet questions
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Still not covered? Ask us directly — connectivity questions get
                an engineer, not a form response.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href="/contact">Ask a question</Link>
              </Button>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Accordion type="single" collapsible className="w-full">
                {internetFaqs.map(({ question, answer }, index) => (
                  <AccordionItem key={question} value={`faq-${index}`}>
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

      {/* Close */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Tell us where your offices are
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            We will check what is deliverable at each address, size the ports
            against how you actually work, and quote the whole network — voice
            included — as one bill.
          </p>

          <ul className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:justify-center sm:gap-6">
            {[
              "Feasibility checked first",
              "Talk to an engineer",
              "Quoted per location",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Request a quote
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">Explore voice products</Link>
            </Button>
          </div>

          <p className="mt-12 text-xs text-muted-foreground/70">
            Port sizes, availability and service levels are confirmed per
            location and set out in your agreement. All services are subject to
            technical feasibility at the time of order.
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
