import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionIllustration } from "@/components/site/section-illustration";
import { developerDetails, getDeveloperDetail } from "@/lib/developers";
import { navHighlights } from "@/lib/site";

export function generateStaticParams() {
  return developerDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/developers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const detail = getDeveloperDetail(slug);

  if (!detail) return {};

  return {
    title: detail.title,
    description: detail.tagline,
  };
}

export default async function DeveloperDetailPage({
  params,
}: PageProps<"/developers/[slug]">) {
  const { slug } = await params;
  const detail = getDeveloperDetail(slug);

  if (!detail) notFound();

  const {
    title,
    group,
    tagline,
    intro,
    icon: Icon,
    sections,
    capabilities,
    audience,
    related,
  } = detail;

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
            href="/developers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {group}
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
                  <Link href="/contact">Talk to us</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/developers">All developer resources</Link>
                </Button>
              </div>
            </div>

            {/* Schematic: your app calling the SipLink API, with an event tap. */}
            <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
              <SectionIllustration shape="api" />
            </div>
          </div>
        </div>
      </section>

      {/* Explanatory sections */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-tight text-balance">
                {section.heading}
              </h2>

              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-pretty text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.points ? (
                <ul className="mt-6 space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="size-3" aria-hidden />
                      </span>
                      <span className="text-pretty text-muted-foreground">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.sample ? (
                <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted/30">
                  <div className="flex items-center gap-2 border-b border-border px-5 py-3 text-xs text-muted-foreground">
                    <Terminal className="size-4 text-primary" aria-hidden />
                    <span className="font-mono tracking-wide">
                      {section.sample.language}
                    </span>
                  </div>
                  <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-relaxed text-foreground">
                    <code>{section.sample.code}</code>
                  </pre>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              Capabilities
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              What {title} gives you
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(
              ({ title: name, description, icon: FeatureIcon }) => (
                <div
                  key={name}
                  className="rounded-2xl bg-background p-6 ring-1 ring-border"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FeatureIcon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-medium">{name}</h3>
                  <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Audience + related */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Who it is for</h2>
            <ul className="mt-6 space-y-3">
              {audience.map((item) => (
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

          {related?.length ? (
            <div className="rounded-2xl bg-muted/30 p-8 ring-1 ring-border">
              <h2 className="text-2xl font-semibold tracking-tight">
                Keep going
              </h2>
              <ul className="mt-6 space-y-4">
                {related.map(
                  ({ label, description, href, icon: RelatedIcon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="group flex items-start gap-4"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary ring-1 ring-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <RelatedIcon className="size-5" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5 font-medium">
                            {label}
                            <ArrowRight
                              className="size-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                              aria-hidden
                            />
                          </span>
                          <span className="mt-0.5 block text-sm text-pretty text-muted-foreground">
                            {description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
              <Separator className="my-6" />
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Talk to us about {title}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>
      </section>

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
          Build with SipLink
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Tell us what you want to integrate and we will help you scope it, test
          it in the sandbox, and get you a working call fast.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Talk to us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/developers">All developer resources</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
