import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionIllustration } from "@/components/site/section-illustration";
import { getResourceDetail, resourceDetails } from "@/lib/resources";
import { navHighlights, reviews, reviewStats } from "@/lib/site";

export function generateStaticParams() {
  return resourceDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceDetail(slug);

  if (!resource) return {};

  return {
    title: resource.title,
    description: resource.tagline,
  };
}

export default async function ResourceDetailPage({
  params,
}: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const resource = getResourceDetail(slug);

  if (!resource) notFound();

  const {
    title,
    group,
    tagline,
    intro,
    icon: Icon,
    eyebrow,
    cta,
    secondaryCta,
    sections,
    points,
    pointsHeading,
    topics,
    topicsHeading,
    faqs,
    note,
    closingHeading,
    closingBody,
    usesReviews,
  } = resource;

  // Sibling resources in the same group, for onward navigation.
  const related = resourceDetails.filter(
    (item) => item.group === group && item.slug !== slug,
  );

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
            href="/resources"
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
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
                {secondaryCta ? (
                  <Button asChild size="lg" variant="outline">
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                ) : null}
              </div>
            </div>

            {/* Network resources get the resilient-network diagram; everything
                else gets the "knowledge in one place" library diagram. */}
            <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
              <SectionIllustration
                shape={group === "Network" ? "resilient" : "library"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prose sections */}
      {sections?.length ? (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-2">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-tight text-balance">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-pretty text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Testimonials: real reviews from lib/site.ts */}
      {usesReviews ? (
        <>
          <section className="border-b border-border">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
              <dl className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-3">
                {reviewStats.map(({ value, label, icon: StatIcon }) => (
                  <div key={label} className="bg-background p-6">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <StatIcon className="size-5" aria-hidden />
                    </span>
                    <dt className="font-heading mt-4 text-3xl font-semibold tracking-tight text-primary">
                      {value}
                    </dt>
                    <dd className="mt-1 text-sm text-muted-foreground">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-12 columns-1 gap-6 md:columns-2 lg:columns-3">
                {reviews.map((review) => (
                  <Card
                    key={review.name}
                    className="mb-6 break-inside-avoid"
                  >
                    <CardHeader>
                      <div
                        className="flex gap-0.5 text-primary"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="size-4 fill-current"
                            aria-hidden
                          />
                        ))}
                      </div>
                      <CardDescription className="mt-3 text-pretty text-foreground">
                        “{review.quote}”
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium">{review.name}</p>
                      {review.role ? (
                        <p className="text-sm text-muted-foreground">
                          {review.role}
                        </p>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="mt-8 text-sm text-muted-foreground">
                Reviews are reproduced from SipLink&rsquo;s Google Business
                Profile as written by the customers who left them.
              </p>
            </div>
          </section>
        </>
      ) : null}

      {/* Points grid */}
      {points?.length ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            {pointsHeading ? (
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance">
                {pointsHeading}
              </h2>
            ) : null}

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {points.map(({ title: name, description, icon: PointIcon }) => (
                <div key={name} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <PointIcon className="size-5" aria-hidden />
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
          </div>
        </section>
      ) : null}

      {/* Topics grid (blog / knowledge base) */}
      {topics?.length ? (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            {topicsHeading ? (
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance">
                {topicsHeading}
              </h2>
            ) : null}

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {topics.map(({ title: name, description, icon: TopicIcon }) => (
                <Card key={name} className="h-full">
                  <CardHeader>
                    <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <TopicIcon className="size-5" aria-hidden />
                    </span>
                    <CardTitle className="text-base">{name}</CardTitle>
                    <CardDescription className="text-pretty">
                      {description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ accordion */}
      {faqs?.length ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-24">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-pretty text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      ) : null}

      {/* Honest framing note */}
      {note ? (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-6 py-14 lg:px-10">
            <p className="text-pretty text-muted-foreground">{note}</p>
          </div>
        </section>
      ) : null}

      {/* Related resources */}
      {related.length ? (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <h2 className="text-2xl font-semibold tracking-tight">
            More in {group}
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map(
              ({
                slug: relatedSlug,
                title: relatedTitle,
                tagline: relatedTagline,
                icon: RelatedIcon,
              }) => (
                <Link
                  key={relatedSlug}
                  href={`/resources/${relatedSlug}`}
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
      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          {closingHeading ?? `Talk to us about ${title}`}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          {closingBody ??
            "Tell us how your teams communicate today and we will recommend a configuration — including porting your existing numbers."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/resources">All resources</Link>
          </Button>
        </div>
        <Separator className="mx-auto mt-14 max-w-xs" />
        <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground">
          Prefer to talk it through? Reach us any hour by phone, email, chat or
          WhatsApp — a named expert will stay with you until it is sorted.
        </p>
      </section>
    </>
  );
}
