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
import { RevealGroup } from "@/components/site/reveal-group";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

  // Migration steps sit on one row where they fit (up to five); six wraps
  // as two rows of three. Full class names so Tailwind can see them.
  const stepCount = migration?.steps.length ?? 0;
  const stepColumns =
    stepCount <= 3
      ? { count: 3, className: "lg:grid-cols-3" }
      : stepCount === 4
        ? { count: 4, className: "lg:grid-cols-4" }
        : stepCount === 5
          ? { count: 5, className: "lg:grid-cols-5" }
          : { count: 3, className: "lg:grid-cols-3" };

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

            {/* Scene showing what this product actually does. */}
            <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
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
                /* A soft primary glow and a light running the outline mark
                    this as the side to land on. */
                <div className="border-run rounded-2xl p-8 shadow-[0_0_48px_-12px] shadow-primary/50 dark:shadow-primary/40">
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-primary uppercase">
                    {/* A live-status blink: the halo pings out from a
                        steady dot. */}
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 motion-safe:animate-ping" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                    </span>
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

      {/* Features — frosted cards over drifting brand colour. */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className="glass-orb top-1/4 left-[8%] size-80 bg-brand-from/30 [--orb-duration:16s]" />
          <span className="glass-orb top-1/2 left-[42%] size-96 bg-brand-to/20 [--orb-duration:22s] [--orb-x:-80px] [--orb-y:30px]" />
          <span className="glass-orb right-[6%] bottom-0 size-80 bg-chart-3/35 [--orb-duration:19s] [--orb-x:-40px] [--orb-y:-60px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              Capabilities
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              What {title} gives you
            </h2>
          </div>

          {/* Cards rise in as the grid is reached, then answer the pointer:
              lift, a primary edge and glow, and the icon tile filling in. The
              reveal sits on the wrapper and the hover on the card, since a
              finished animation would otherwise pin the card's transform. */}
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map(
              ({ title: name, description, icon: FeatureIcon }, index) => (
                <div
                  key={name}
                  className="reveal-item"
                  style={{ "--reveal-index": index } as React.CSSProperties}
                >
                  <Card className="relative bg-card/55 backdrop-blur-xl backdrop-saturate-150 h-full gap-0 p-6 ring-white/60 transition-all dark:ring-white/10 duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px] hover:shadow-primary/40 hover:ring-primary/40">
                    {/* Accent line that draws across the top on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-brand-from to-brand-to transition-transform duration-500 ease-out group-hover/card:scale-x-100"
                    />
                    <span
                      aria-hidden
                      className="absolute top-5 right-6 font-mono text-xs text-muted-foreground/50 transition-colors group-hover/card:text-primary"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-primary group-hover/card:text-primary-foreground">
                      <FeatureIcon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-base font-medium">{name}</h3>
                    <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                      {description}
                    </p>
                  </Card>
                </div>
              ),
            )}
          </RevealGroup>
        </div>
      </section>

      {/* Technical summary — only what the source documents state. Always
          dark (the `dark` class switches every token inside), with brand
          light glowing behind a frosted glass pane: glass reads best on a
          deep ground. */}
      {specs?.length ? (
        <section className="dark relative isolate overflow-hidden bg-background text-foreground">
          <div aria-hidden className="absolute inset-0 -z-10">
            <span className="glass-orb top-[10%] right-[18%] size-96 bg-brand-to/20 [--orb-duration:16s] [--orb-x:-60px] [--orb-y:40px]" />
            <span className="glass-orb right-[2%] bottom-[-10%] size-80 bg-brand-from/12 [--orb-duration:20s] [--orb-x:-40px] [--orb-y:-50px]" />
            <span className="glass-orb bottom-[-20%] left-[30%] size-72 bg-chart-3/10 [--orb-duration:24s] [--orb-x:70px] [--orb-y:-30px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
              <div>
                <span className="text-sm font-medium tracking-widest text-primary uppercase">
                  At a glance
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  How {title} is delivered
                </h2>
              </div>

              {/* One pane, split by hairlines, rather than frosting each
                  cell: stacked blurs compound and muddy it. The inset top
                  line is the lit edge of the glass. */}
              <dl className="grid overflow-hidden rounded-2xl bg-foreground/5 shadow-[inset_0_1px_0_0] ring-1 shadow-foreground/15 ring-foreground/10 backdrop-blur-2xl sm:grid-cols-2">
                {specs.map(({ label, value }) => (
                  <div
                    key={label}
                    className="group border-b border-foreground/10 p-6 transition-colors last:border-b-0 hover:bg-foreground/5 sm:odd:border-r sm:nth-last-2:odd:border-b-0"
                  >
                    <dt className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-primary uppercase">
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_1px] shadow-primary/70"
                      />
                      {label}
                    </dt>
                    <dd className="mt-2.5 text-sm text-pretty text-foreground/85">
                      {value}
                    </dd>
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
          required. A brand glow and a lit top edge give it depth, and the
          statement fades across so the eye lands on its opening. */}
      {outcome ? (
        <section className="relative isolate overflow-hidden bg-foreground text-background">
          <div aria-hidden className="absolute inset-0 -z-10">
            <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
            <span className="glass-orb -top-24 -right-16 size-96 bg-primary/25 [--orb-duration:18s] [--orb-x:-60px] [--orb-y:30px]" />
            <span className="glass-orb -bottom-32 left-1/4 size-80 bg-brand-from/10 [--orb-duration:22s] [--orb-x:50px] [--orb-y:-30px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            {/* The single-column mobile track is explicit: left to `auto` it
                sized itself to the longest line and pushed past the viewport. */}
            <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-widest text-primary uppercase ring-1 ring-primary/30">
                  <span aria-hidden className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                  </span>
                  {outcome.heading}
                </span>
                {/* `text-pretty` rather than `text-balance`: balancing a long
                    paragraph at narrow widths pushed it past the viewport. */}
                <p className="font-heading mt-6 bg-linear-to-r from-background via-background to-background/55 bg-clip-text text-2xl leading-snug font-medium text-pretty text-transparent sm:text-3xl lg:text-4xl lg:leading-tight">
                  {outcome.body}
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="group h-12 shrink-0 rounded-full px-6 shadow-[0_0_32px_-4px] shadow-primary/60 transition-shadow hover:shadow-[0_0_44px_-2px] hover:shadow-primary/70"
              >
                <Link href="/contact">
                  Talk to us about {title}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
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

            {/* A real sequence, drawn as a route: numbered stops, each
                joined to the next by a segment that fills in when reached.
                Segments belong to their step rather than one measured track,
                so any number of steps (and wrapped rows) lines up. */}
            <RevealGroup className="mt-12">
              <ol className={cn("grid gap-8", stepColumns.className)}>
                {migration.steps.map(({ title: step, body }, index) => {
                  const last = index === migration.steps.length - 1;
                  const rowEnd = (index + 1) % stepColumns.count === 0;
                  const clock = { "--step": index } as React.CSSProperties;

                  return (
                    <li
                      key={step}
                      className="reveal-item relative pl-16 lg:pl-0"
                      style={
                        { "--reveal-index": index * 4 } as React.CSSProperties
                      }
                    >
                      {/* Down, when stacked */}
                      {!last ? (
                        <span
                          aria-hidden
                          className="absolute top-12 -bottom-6 left-5 w-0.5 -translate-x-1/2 rounded-full bg-border lg:hidden"
                        >
                          <span
                            className="path-fill-y absolute inset-0 origin-top rounded-full bg-linear-to-b from-brand-from to-brand-to"
                            style={clock}
                          />
                        </span>
                      ) : null}

                      {/* Across, on wide screens: from just past this stop
                          to just short of the next, over the column gap. */}
                      {!last && !rowEnd ? (
                        <span
                          aria-hidden
                          className="absolute top-5 right-[-1.75rem] left-12 hidden h-0.5 -translate-y-1/2 rounded-full bg-border lg:block"
                        >
                          <span
                            className="path-fill-x absolute inset-0 origin-left rounded-full bg-linear-to-r from-brand-from to-brand-to"
                            style={clock}
                          />
                        </span>
                      ) : null}

                      <span
                        className="path-node absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border-2 border-primary bg-background font-mono text-xs font-semibold text-primary ring-4 ring-background lg:relative"
                        style={clock}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="pt-2.5 font-medium lg:mt-6 lg:pt-0">
                        {step}
                      </h3>
                      <p className="mt-2 text-sm text-pretty text-muted-foreground">
                        {body}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </RevealGroup>
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

      {/* Related products — onward cards that invite the click: they rise
          in on scroll, and on hover lift, warm with a brand wash, turn their
          arrow toward the reader and draw the "Explore" link. */}
      {related.length ? (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-medium tracking-widest text-primary uppercase">
                Keep exploring
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                More in {category}
              </h2>
            </div>
            <Link
              href="/products#lifecycle"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              All products
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>

          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map(
              (
                {
                  slug: relatedSlug,
                  title: relatedTitle,
                  tagline: relatedTagline,
                  icon: RelatedIcon,
                },
                index,
              ) => (
                <div
                  key={relatedSlug}
                  className="reveal-item"
                  style={{ "--reveal-index": index } as React.CSSProperties}
                >
                  <Link
                    href={`/products/${relatedSlug}`}
                    className="group flex h-full rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <Card className="relative h-full w-full gap-0 p-6 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-18px] group-hover:shadow-primary/40 group-hover:ring-primary/40">
                      {/* Brand wash that warms the card from the corner */}
                      <span
                        aria-hidden
                        className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                      />
                      {/* Oversized icon watermark */}
                      <RelatedIcon
                        aria-hidden
                        className="absolute -right-6 -bottom-6 size-32 text-primary/5 transition-all duration-500 group-hover:-rotate-12 group-hover:text-primary/10"
                      />

                      <div className="relative flex items-start justify-between">
                        <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                          <RelatedIcon className="size-5" aria-hidden />
                        </span>
                        <span className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:-rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                          <ArrowRight className="size-4" aria-hidden />
                        </span>
                      </div>

                      <h3 className="relative mt-5 text-base font-medium">
                        {relatedTitle}
                      </h3>
                      <p className="relative mt-1.5 text-sm text-pretty text-muted-foreground">
                        {relatedTagline}
                      </p>

                      <span className="relative mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary">
                        <span className="bg-linear-to-r from-primary to-primary bg-size-[0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-size-[100%_1px]">
                          Explore {relatedTitle}
                        </span>
                      </span>
                    </Card>
                  </Link>
                </div>
              ),
            )}
          </RevealGroup>
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
