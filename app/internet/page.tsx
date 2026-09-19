import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  internetAssurances,
  internetDelivery,
  internetHero,
  internetPillars,
  internetProof,
} from "@/lib/internet";

export const metadata: Metadata = {
  title: "Internet",
  description:
    "Business broadband, dedicated internet leased lines, static IP and managed network solutions — fibre connectivity from a Class A ISP, monitored 24/7.",
};

export default function InternetPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-24 size-[640px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-16 lg:px-10 lg:pt-24 lg:pb-20">
          <Badge variant="secondary" className="font-mono tracking-widest">
            {internetHero.eyebrow}
          </Badge>

          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {internetHero.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-pretty text-muted-foreground lg:text-xl">
            {internetHero.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Request a quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#dedicated-internet">See leased lines</Link>
            </Button>
          </div>

          {/* Proof strip — the hairline grid used on /products. */}
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
        </div>
      </section>

      {/* Section index — four pillars, jumping into the page. */}
      <section className="border-b border-border bg-muted/30">
        <nav
          aria-label="Internet services"
          className="mx-auto max-w-7xl px-6 py-8 lg:px-10"
        >
          <ul className="grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-4">
            {internetPillars.map(({ slug, title, icon: Icon, tagline }) => (
              <li key={slug} className="bg-background">
                <Link
                  href={`#${slug}`}
                  className="group flex h-full items-start gap-3 p-5 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-[1.15rem]" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{title}</span>
                    <span className="mt-1 block text-xs leading-snug text-pretty text-muted-foreground">
                      {tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* The four pillars, in the order internet.md sets out. Alternating
          background keeps consecutive sections legible without a divider
          carrying the whole job. */}
      {internetPillars.map(
        ({ slug, title, tagline, intro, icon: Icon, sections }, pillarIndex) => (
          <section
            key={slug}
            id={slug}
            className={`scroll-mt-24 border-b border-border ${
              pillarIndex % 2 === 1 ? "bg-muted/30" : ""
            }`}
          >
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
              {/* Pillar header */}
              <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                    {title}
                  </h2>
                  <p className="mt-3 text-lg text-pretty text-primary">
                    {tagline}
                  </p>
                </div>
                <p className="self-end text-lg text-pretty text-muted-foreground">
                  {intro}
                </p>
              </div>

              <Separator className="my-12" />

              {/* Subsections — the bullets under each pillar in internet.md,
                  each one a numbered block with its own capability grid. */}
              <div className="space-y-14">
                {sections.map(({ slug: sectionSlug, heading, body, points }, index) => (
                  <div
                    key={sectionSlug}
                    id={sectionSlug}
                    className="grid scroll-mt-28 gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16"
                  >
                    <div>
                      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance">
                        {heading}
                      </h3>
                    </div>

                    <div>
                      <p className="max-w-3xl text-pretty text-muted-foreground">
                        {body}
                      </p>

                      {points ? (
                        <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                          {points.map(
                            ({ title: pointTitle, description, icon: PointIcon }) => (
                              <li key={pointTitle}>
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                  <PointIcon className="size-4" aria-hidden />
                                </span>
                                <h4 className="mt-3 text-sm font-semibold">
                                  {pointTitle}
                                </h4>
                                <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                                  {description}
                                </p>
                              </li>
                            ),
                          )}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ),
      )}

      {/* Assurances — the brochure's five badges */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What every connection comes with
          </h2>

          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {internetAssurances.map(({ title, description, icon: Icon }) => (
              <li key={title}>
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm text-pretty text-background/70">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Delivery — how a circuit actually arrives */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
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
          </div>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2 xl:grid-cols-5">
            {internetDelivery.map(({ title, body }, index) => (
              <li key={title} className="flex flex-col bg-background p-7">
                <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-balance">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Close */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
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
        </div>
      </section>
    </>
  );
}
