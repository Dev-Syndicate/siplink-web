import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionIllustration } from "@/components/site/section-illustration";
import { getPricingDetail, pricingDetails } from "@/lib/pricing-detail";
import { navHighlights } from "@/lib/site";

export function generateStaticParams() {
  return pricingDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/pricing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const detail = getPricingDetail(slug);

  if (!detail) return {};

  return {
    title: detail.title,
    description: detail.tagline,
  };
}

export default async function PricingDetailPage({
  params,
}: PageProps<"/pricing/[slug]">) {
  const { slug } = await params;
  const detail = getPricingDetail(slug);

  if (!detail) notFound();

  const {
    title,
    tagline,
    intro,
    icon: Icon,
    eyebrow,
    model,
    included,
    factors,
    quote,
    seatPlanNote,
  } = detail;

  // Other pricing pages, for onward navigation.
  const related = pricingDetails.filter((item) => item.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 sm:-mt-30 sm:pt-30 overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {eyebrow}
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)]">
            <div>
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
                  <Link href="/contact">Request a quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">Compare all plans</Link>
                </Button>
              </div>
            </div>

            {/* Schematic: plan tiers, the recommended one marked. */}
            <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
              <SectionIllustration shape="tiers" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing model */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <div>
              <span className="text-sm font-medium tracking-widest text-primary uppercase">
                How pricing works
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
                {model.heading}
              </h2>
              <div className="mt-6 space-y-4">
                {model.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-pretty text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {seatPlanNote ? (
                <div className="mt-8 rounded-2xl border border-border bg-background p-6">
                  <p className="text-pretty text-sm text-muted-foreground">
                    {seatPlanNote}
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    See the full plan comparison
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              ) : null}
            </div>

            {/* Pricing components */}
            <div className="rounded-2xl border border-border bg-background p-8">
              <h3 className="text-sm font-medium tracking-widest text-primary uppercase">
                What you pay for
              </h3>
              <ul className="mt-6 space-y-6">
                {model.components.map(
                  ({ title: name, description, icon: ComponentIcon }) => (
                    <li key={name} className="flex gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <ComponentIcon className="size-5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium">{name}</p>
                        <p className="mt-1 text-sm text-pretty text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Included as standard
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            {included.heading}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {included.items.map(
            ({ title: name, description, icon: ItemIcon }) => (
              <Card key={name} className="h-full">
                <CardHeader>
                  <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ItemIcon className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="text-base">{name}</CardTitle>
                  <CardDescription className="text-pretty">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ),
          )}
        </div>
      </section>

      {/* What affects your quote */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              What affects your quote
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              {factors.heading}
            </h2>
            <ul className="mt-8 space-y-5">
              {factors.items.map(
                ({ title: name, description, icon: FactorIcon }) => (
                  <li key={name} className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                      <FactorIcon className="size-4.5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium">{name}</p>
                      <p className="mt-1 text-sm text-pretty text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Quote CTA card */}
          <div className="lg:pl-8">
            <div className="rounded-2xl bg-background p-8 ring-1 ring-border lg:sticky lg:top-28">
              <h2 className="text-2xl font-semibold tracking-tight text-balance">
                {quote.heading}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                {quote.body}
              </p>
              <Button asChild size="lg" className="mt-8 w-full">
                <Link href="/contact">Request a quote</Link>
              </Button>
              <Separator className="my-6" />
              <ul className="space-y-3">
                {[
                  "No obligation, no pressure",
                  "A costed proposal tailored to you",
                  "Port your existing numbers",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span className="text-sm text-pretty text-muted-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related pricing */}
      {related.length ? (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            More pricing
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(
              ({
                slug: relatedSlug,
                title: relatedTitle,
                tagline: relatedTagline,
                icon: RelatedIcon,
              }) => (
                <Link
                  key={relatedSlug}
                  href={`/pricing/${relatedSlug}`}
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

      {/* Trust strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {navHighlights.map(({ label, description, icon: HighlightIcon }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                <HighlightIcon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-medium">{label}</p>
                <p className="mt-0.5 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          Ready for a quote on {title.replace(/ Pricing$| Plans$/, "")}?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Tell us how your teams communicate today and we will recommend a
          configuration and return a costed proposal — including porting your
          existing numbers.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Request a quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/pricing">Compare all plans</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
