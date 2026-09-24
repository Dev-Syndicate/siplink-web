import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ConnectivityScene } from "@/components/site/connectivity-scene";
import { InternetClose } from "@/components/site/internet-close";
import { SectionContent } from "@/components/site/internet-section-content";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getInternetService,
  getSectionPages,
  type InternetService,
} from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * The body every internet service page shares — the three connectivity
 * services under /internet and the six network services under
 * /internet/network-solutions.
 *
 * The two differ in one respect. A connectivity service's sections are routed
 * as their own pages, so it lists and links them; a network service's stay
 * inline. Everything else — hero, add-ons, close — is identical, and the
 * onward path is the part that is never optional: docs/INTERNET.md is
 * explicit that a reader who has chosen connectivity should be shown what
 * layers onto it, so `addOns` closes every page.
 */
export function InternetServicePage({
  service,
  prelude,
  extra,
}: {
  service: InternetService;
  /**
   * An opening band above the hero, for a page that has earned a bespoke
   * one. When present it carries the `h1` and the hero below steps down to
   * `h2`, so the page never ships two `h1`s.
   */
  prelude?: ReactNode;
  /** Extra sections, rendered after the body and before the add-ons. */
  extra?: ReactNode;
}) {
  const {
    slug,
    title,
    eyebrow,
    tagline,
    intro,
    lede,
    icon: Icon,
    scene,
    idealFor,
    sections,
    sectionsAsPages,
    addOns,
    cta,
    parent,
  } = service;

  const sectionPages = getSectionPages(service);

  // The prelude, when there is one, owns the h1.
  const Heading = prelude ? "h2" : "h1";

  const backHref = parent ? "/internet/network-solutions" : "/internet";
  const backLabel = parent ? "Network Solutions" : "Internet";

  const related = (addOns ?? [])
    .map((slug) => getInternetService(slug))
    .filter((item): item is InternetService => Boolean(item));

  return (
    <>
      {prelude}

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-24 size-[640px] rounded-full bg-brand-to/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-16 lg:px-10 lg:pt-14 lg:pb-20">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {backLabel}
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-16">
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <Badge variant="secondary" className="font-mono tracking-widest">
                  {eyebrow}
                </Badge>
              </div>

              <Heading className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
                {title}
              </Heading>

              <p className="mt-4 text-lg text-pretty text-primary lg:text-xl">
                {tagline}
              </p>

              <p className="mt-6 max-w-xl text-pretty text-muted-foreground">
                {intro}
              </p>

              {lede?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 max-w-xl text-pretty text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-9 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/internet#compare">Compare services</Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="rounded-2xl border border-border bg-muted/30 p-6 lg:p-8">
                <ConnectivityScene scene={scene} />
              </div>
            </ScrollReveal>
          </div>

          {idealFor?.length ? (
            <ScrollReveal delay={180} className="mt-14">
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Ideal for
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {idealFor.map((item) => (
                  <li key={item}>
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1.5 text-sm font-normal"
                    >
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ) : null}
        </div>
      </section>

      {/* Sections.

          A connectivity service routes its sections as their own pages, so
          here it lists them and links out — publishing the same copy at two
          URLs would only make the two compete. A network service has no
          child routes, so its sections render inline as before. */}
      {sectionsAsPages ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <ScrollReveal className="max-w-2xl">
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                In this section
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {title} in detail
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Each of these is a page of its own. Start wherever your
                question is.
              </p>
            </ScrollReveal>

            <ul className="mt-14 flex flex-wrap gap-px overflow-hidden rounded-2xl bg-border">
              {sectionPages.map((item, index) => (
                <ScrollReveal
                  as="li"
                  key={item.slug}
                  delay={index * 70}
                  shift={12}
                  className="flex grow basis-72 bg-background"
                >
                  <Link
                    href={`/internet/${slug}/${item.slug}`}
                    className="group flex grow flex-col p-8 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                  >
                    <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-balance">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {item.tagline}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary">
                      Read more
                      <ArrowRight
                        className="size-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        sections.map((section, index) => (
          <section
            key={section.slug}
            id={section.slug}
            className={cn(
              "scroll-mt-28 border-b border-border",
              index % 2 === 1 && "bg-muted/30",
            )}
          >
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
                <ScrollReveal>
                  <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                    {section.eyebrow ?? String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
                    {section.heading}
                  </h2>
                </ScrollReveal>

                <SectionContent section={section} />
              </div>
            </div>
          </section>
        ))
      )}

      {extra}

      {/* Onward journey — the layering docs/INTERNET.md asks for. */}
      {related.length ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <ScrollReveal className="max-w-2xl">
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Build on it
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                What layers onto {title}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Connectivity is the first decision, not the last one. These are
                the services most often added on top of it.
              </p>
            </ScrollReveal>

            {/* Wrapping flex rather than a fixed column count. `addOns` runs
                from two to five across these pages, so any fixed grid leaves
                empty cells on some of them — and in a hairline grid an empty
                cell is a bare grey panel. Here the last row's items grow to
                fill the width instead, which is even at every count and
                every breakpoint. */}
            <ul className="mt-12 flex flex-wrap gap-px overflow-hidden rounded-2xl bg-border">
              {related.map((item, index) => (
                <ScrollReveal
                  as="li"
                  key={item.slug}
                  delay={index * 70}
                  shift={10}
                  className="flex grow basis-72 bg-background"
                >
                  <Link
                    href={
                      item.parent
                        ? `/internet/network-solutions/${item.slug}`
                        : `/internet/${item.slug}`
                    }
                    className="group flex grow flex-col p-7 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                  >
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="size-[1.15rem]" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-base font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {item.tagline}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Explore
                      <ArrowRight
                        className="size-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <InternetClose
        ctaLabel={cta.label}
        ctaHref={cta.href}
      />
    </>
  );
}
