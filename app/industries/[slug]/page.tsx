import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IndustryIllustration } from "@/components/site/industry-illustration";
import { getIndustryDetail, industryDetails } from "@/lib/industries-detail";
import { navHighlights } from "@/lib/site";

/**
 * Legacy / brochure industry slugs that appear elsewhere on the site (the
 * homepage `industries` set, older links) but are not part of the eleven
 * nav-aligned industry pages. They resolve to the closest current vertical so
 * no link 404s and there is one canonical page per industry. Mirrors
 * `solutionRedirects` in lib/solutions.ts.
 */
const industryRedirects: Record<string, string> = {
  "medical-billing-rcm": "/industries/healthcare",
  staffing: "/industries/call-centers",
  "it-software": "/industries/it-saas",
  "tech-saas": "/industries/it-saas",
  "marketing-sales": "/industries/retail",
  "financial-services": "/industries/banking-finance",
  tech: "/industries/it-saas",
};

export function generateStaticParams() {
  return industryDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryDetail(slug);

  if (!industry) return {};

  return {
    title: `${industry.title} — Industries`,
    description: industry.intro,
  };
}

export default async function IndustryDetailPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const { slug } = await params;

  const redirectTo = industryRedirects[slug];
  if (redirectTo) redirect(redirectTo);

  const industry = getIndustryDetail(slug);
  if (!industry) notFound();

  const {
    title,
    icon: Icon,
    tagline,
    intro,
    challenge,
    handling,
    capabilities,
    idealFor,
    gain,
  } = industry;

  // Other industries, for onward navigation.
  const related = industryDetails.filter((item) => item.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 sm:-mt-30 sm:pt-30 overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-24 size-[560px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Industries
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)]">
            <div>
              <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-7" aria-hidden />
              </span>
              <h1 className="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-4 text-lg text-primary lg:text-xl">{tagline}</p>
              <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
                {intro}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Talk to us</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>

            {/* Scene showing how communication works in this sector. */}
            <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
              <IndustryIllustration slug={slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Problem/solution spine — the challenge for this sector sits on the
          left; how SipLink helps answers on the right, joined by a routed rule
          that echoes the call-path motif used across detail pages. */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-2">
            <div className="bg-card p-8 lg:p-12">
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                The challenge
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance">
                {challenge.heading}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                {challenge.body}
              </p>
            </div>

            <div className="relative bg-card p-8 lg:p-12">
              {/* The turn from problem to answer, marked once. */}
              <span
                aria-hidden
                className="absolute top-0 left-0 hidden h-full w-px bg-gradient-to-b from-brand-from to-brand-to lg:block"
              />
              <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                How SipLink helps
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance">
                {handling.heading}
              </h2>
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
        </div>
      </section>

      {/* Capabilities — an unordered set, so no numbering */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            What you get
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Capabilities for {title.toLowerCase()}
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ title: name, description, icon: PointIcon }) => (
            <Card
              key={name}
              className="group h-full gap-0 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
            >
              <CardHeader>
                <span className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <PointIcon className="size-5" aria-hidden />
                </span>
                <CardTitle className="text-base">{name}</CardTitle>
                <CardDescription className="mt-1.5 text-pretty">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Ideal for + the gain */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Ideal for</h2>
            <ul className="mt-6 space-y-3">
              {idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="text-pretty text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-background p-8 ring-1 ring-border">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-brand-to/10 blur-2xl"
            />
            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-tight text-balance">
                {gain.heading}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                {gain.body}
              </p>
              <Separator className="my-6" />
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Talk to us about {title.toLowerCase()}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related industries */}
      {related.length ? (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <h2 className="text-2xl font-semibold tracking-tight">
            Other industries we serve
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(
              ({
                slug: relatedSlug,
                title: relatedTitle,
                tagline: relatedTagline,
                icon: RelatedIcon,
              }) => (
                <Link
                  key={relatedSlug}
                  href={`/industries/${relatedSlug}`}
                  className="group flex"
                >
                  <Card className="h-full w-full transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
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

      {/* CTA — the page's job is lead capture */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Let&rsquo;s map this to your {title.toLowerCase()} workflows
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Tell us how your teams communicate today and we&rsquo;ll recommend a
          configuration — including porting your existing numbers.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Talk to us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/industries">All industries</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
