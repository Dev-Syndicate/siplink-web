import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, PhoneCall } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductIllustration } from "@/components/site/product-illustration";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductDetail, productDetails } from "@/lib/products";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return productDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetail(slug);

  if (!product) return {};

  return {
    title: product.title,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductDetail(slug);

  if (!product) notFound();

  const {
    title,
    category,
    categorySlug,
    tagline,
    intro,
    icon: Icon,
    problem,
    approach,
    features,
    idealFor,
    audiences,
    specs,
    explainer,
    migration,
    faqs,
    outcome,
  } = product;

  // Sibling products in the same category, for onward navigation.
  const related = productDetails.filter(
    (item) => item.categorySlug === categorySlug && item.slug !== slug,
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Link
            href="/products#lifecycle"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {category}
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-12">
            <div>
              {/* Icon sits above the title rather than beside it, so the
                  heading, tagline and intro share one left edge. */}
              <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-7" aria-hidden />
              </span>

              <h1 className="font-heading mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-4 text-lg text-primary lg:text-xl">{tagline}</p>

              <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
                {intro}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Book a demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>

            {/* Scene showing what this product actually does. Always on a
                dark ground: the page around it is light, so the scene reads
                as a screen showing the system rather than more page. The
                `dark` class flips the tokens inside it — see the
                `@custom-variant dark` rule in globals.css. */}
            <div className="product-scene dark hidden rounded-2xl border border-border bg-background p-8 shadow-sm lg:block">
              <ProductIllustration slug={slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Plain-language explainer, before the sales argument — a reader who
          does not know the term yet needs the definition first. */}
      {explainer ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  {explainer.question}
                </h2>
                <p className="mt-5 text-pretty text-muted-foreground">
                  {explainer.definition}
                </p>
              </div>

              {/* Numbered because these genuinely are sequential steps. */}
              <ol className="grid gap-px overflow-hidden rounded-2xl bg-border">
                {explainer.steps.map(({ title: step, body }, index) => (
                  <li key={step} className="flex gap-4 bg-background p-6">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-medium">{step}</h3>
                      <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ) : null}

      {/* Problem and approach — read as a before → after, so the two columns
          carry a relationship rather than sitting as parallel paragraphs. */}
      {problem || approach ? (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            {/* With both halves this is a before → after; with only one it
                falls back to a single full-width card rather than a stranded
                column. */}
            <div
              className={cn(
                "grid items-stretch gap-6 lg:gap-8",
                problem && approach &&
                  "lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
              )}
            >
              {problem ? (
                <div className="rounded-2xl border border-border bg-background p-8">
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                    <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                    Without SipLink
                  </span>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-balance">
                    {problem.heading}
                  </h2>
                  <p className="mt-4 text-sm text-pretty text-muted-foreground">
                    {problem.body}
                  </p>
                </div>
              ) : null}

              {/* The turn from one column to the other */}
              {problem && approach ? (
                <div
                  aria-hidden
                  className="flex items-center justify-center lg:flex-col"
                >
                  <span className="hidden h-full w-px bg-border lg:block" />
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm">
                    {/* Points down while the cards are stacked, right once
                        they sit side by side. */}
                    <ArrowRight className="size-4 rotate-90 lg:rotate-0" />
                  </span>
                  <span className="hidden h-full w-px bg-border lg:block" />
                </div>
              ) : null}

              {approach ? (
                <div className="rounded-2xl border border-primary/30 bg-background p-8 ring-1 ring-primary/10">
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-primary uppercase">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {problem ? "With SipLink" : "Our approach"}
                  </span>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-balance">
                    {approach.heading}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {approach.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-sm text-pretty text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Capabilities
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            What {title} gives you
          </h2>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title: name, description, icon: FeatureIcon }) => (
            <div key={name} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FeatureIcon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="font-medium">{name}</h3>
                <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical summary — only what the source documents state. */}
      {specs?.length ? (
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
              <div>
                <span className="text-sm font-medium tracking-widest text-primary uppercase">
                  At a glance
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance">
                  How {title} is delivered
                </h2>
              </div>

              <dl className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
                {specs.map(({ label, value }) => (
                  <div key={label} className="bg-background p-5">
                    <dt className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm text-pretty">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ) : null}

      {/* Who it is for. Written as situations a reader recognises rather than
          a row of noun phrases in boxes — the statement carries the weight and
          hairline rules do the dividing, in the same language as the rest of
          the site. */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Ideal for
          </span>

          {audiences?.length ? (
            <dl className="mt-10 grid gap-x-12 sm:grid-cols-2">
              {audiences.map(({ situation, fit }, index) => (
                <div
                  key={situation}
                  className="group flex gap-5 border-t border-border py-7 first:border-t-0 sm:nth-2:border-t-0"
                >
                  <span className="font-mono text-xs text-primary/60 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <dt className="font-heading text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                      {situation}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                      {fit}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          ) : (
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {idealFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10"
                  >
                    <Check className="size-3 text-primary" />
                  </span>
                  <span className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </div>
      </section>

      {/* The pay-off, as a dark band. The page has been light throughout, so
          the change of ground is what marks this as the conclusion — no box
          required. Same treatment as the migration story on the homepage. */}
      {outcome ? (
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            {/* The single-column mobile track is explicit: left to `auto` it
                sized itself to the longest line and pushed past the viewport. */}
            <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
              <div className="min-w-0">
                <span className="font-mono text-xs tracking-widest text-primary uppercase">
                  {outcome.heading}
                </span>
                {/* `text-pretty` rather than `text-balance`: balancing a long
                    paragraph at narrow widths pushed it past the viewport. */}
                <p className="font-heading mt-5 text-2xl leading-snug font-medium text-pretty sm:text-3xl">
                  {outcome.body}
                </p>
              </div>

              {/* The band inverts with the theme, so the button is painted
                  from the same pair of tokens rather than a fixed variant —
                  `secondary` stayed dark against the light dark-mode band. */}
              <Button
                asChild
                size="lg"
                className="shrink-0 bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/contact">
                  Talk to us about {title}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {/* How you get there from what you run today */}
      {migration ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="max-w-2xl">
              <span className="text-sm font-medium tracking-widest text-primary uppercase">
                Getting there
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {migration.heading}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                {migration.intro}
              </p>
            </div>

            {/* A real sequence, so the numbering carries meaning. */}
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {migration.steps.map(({ title: step, body }, index) => (
                <li key={step} className="relative">
                  <span className="font-mono text-xs font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="mt-3 block h-px w-full bg-border"
                  />
                  <h3 className="mt-4 font-medium">{step}</h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Questions buyers actually ask */}
      {faqs?.length ? (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  Common questions
                </h2>
                <p className="mt-4 text-pretty text-muted-foreground">
                  Something not covered here?{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-primary hover:underline"
                  >
                    Ask us directly
                  </Link>
                  .
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map(({ question, answer }) => (
                  <AccordionItem key={question} value={question}>
                    <AccordionTrigger className="text-left text-base font-medium">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="text-pretty text-muted-foreground">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      ) : null}

      {/* Related products */}
      {related.length ? (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            More in {category}
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map(
              ({
                slug: relatedSlug,
                title: relatedTitle,
                tagline: relatedTagline,
                icon: RelatedIcon,
              }) => (
                <Link
                  key={relatedSlug}
                  href={`/products/${relatedSlug}`}
                  className="group flex"
                >
                  <Card className="h-full w-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <RelatedIcon className="size-5" aria-hidden />
                      </span>
                      <CardTitle className="text-base">
                        {relatedTitle}
                      </CardTitle>
                      <CardDescription className="text-pretty">
                        {relatedTagline}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ),
            )}
          </div>
        </section>
      ) : null}

      {/* Closing CTA, matching the homepage treatment so the last ask on a
          product page carries the same weight as the one on the front page. */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-brand-to via-brand-to to-brand-from px-8 py-14 text-primary-foreground lg:px-14 lg:py-16">
          {/* Soft light falling from the top-right, so the flat gradient
              reads as a lit surface rather than a solid fill. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[520px] rounded-full bg-white/10 blur-3xl"
          />

          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-widest uppercase">
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            {category}
          </span>

          <h2 className="font-heading mt-6 max-w-xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            See {title} working for your business
          </h2>

          <p className="mt-5 max-w-xl text-pretty text-primary-foreground/85 lg:text-lg">
            Tell us how your teams communicate today and we will recommend a
            configuration — including porting your existing numbers.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="w-full bg-background text-primary hover:bg-background/90 sm:w-auto"
            >
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto w-full border-white/25 bg-white/10 py-3 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground sm:w-auto sm:py-2 dark:border-white/25 dark:bg-white/10 dark:hover:bg-white/20"
            >
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                <PhoneCall className="shrink-0" aria-hidden />
                <span className="text-center text-balance whitespace-normal">
                  Speak to an architect ({site.phone})
                </span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
