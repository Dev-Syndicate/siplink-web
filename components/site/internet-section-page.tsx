import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

import { ConnectivityScene } from "@/components/site/connectivity-scene";
import { InternetClose } from "@/components/site/internet-close";
import { SectionContent } from "@/components/site/internet-section-content";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getSectionPages,
  type InternetSectionPage as SectionPage,
  type InternetService,
} from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * A single section of a connectivity service, at
 * /internet/<service>/<section> — Plans, Features, SLA and the rest.
 *
 * Because these are leaves of the tree, the onward path matters more here
 * than anywhere else on the site: a reader who lands on "Symmetrical Speeds"
 * from search has no idea what else exists. The sibling rail near the top
 * carries that — every section of the service, with the current one marked —
 * which is why the page does not also end on a previous/next pair. One way
 * across the set is enough, and the rail shows the whole set rather than
 * just its two neighbours.
 */
export function InternetSectionPage({
  service,
  section,
  prelude,
  extra,
}: {
  service: InternetService;
  section: SectionPage;
  /**
   * An opening band rendered above the hero, for a page that has earned a
   * bespoke one. When it is present it carries the page's `h1`, so the hero
   * below steps down to `h2` — otherwise the page would ship two `h1`s and
   * the heading outline would start in the wrong place.
   */
  prelude?: ReactNode;
  /**
   * Extra sections for a page whose own content does not carry it alone,
   * rendered after the body and before the closing call to action.
   */
  extra?: ReactNode;
}) {
  const { title, heading, tagline, intro, eyebrow, scene } = section;
  const siblings = getSectionPages(service);
  const index = siblings.findIndex((item) => item.slug === section.slug);

  /**
   * Siblings rotate through three hero compositions, so consecutive pages in
   * the same column do not open on an identical screen. Position drives it
   * rather than a hand-set field: the point is that neighbours differ, and
   * nothing here depends on a given page getting a particular one.
   *
   * In `reverse` the diagram leads visually while the heading still comes
   * first in the DOM — the swap is `order`, not markup, so reading order and
   * focus order stay correct.
   */
  const layout = (["split", "reverse", "wide"] as const)[index % 3];
  const wide = layout === "wide";

  // The prelude, when there is one, owns the h1.
  const Heading = prelude ? "h2" : "h1";

  const servicePath = `/internet/${service.slug}`;
  const ServiceIcon = service.icon;

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
          {/* Breadcrumb — three levels deep is where one stops being a
              nicety and starts being how you get back out. */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/internet"
                  className="transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                >
                  Internet
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5 opacity-50" />
              </li>
              <li>
                <Link
                  href={servicePath}
                  className="transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                >
                  {service.title}
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5 opacity-50" />
              </li>
              <li className="font-medium text-foreground" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <div
            className={cn(
              "mt-8 grid items-center gap-12 lg:gap-16",
              layout === "split" &&
                "lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]",
              layout === "reverse" &&
                "lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)]",
            )}
          >
            <ScrollReveal className={cn(layout === "reverse" && "lg:order-2")}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ServiceIcon className="size-5" aria-hidden />
                </span>
                <Badge variant="secondary" className="font-mono tracking-widest">
                  {eyebrow ?? service.title}
                </Badge>
              </div>

              <Heading className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
                {heading}
              </Heading>

              <p className="mt-4 text-lg text-pretty text-primary lg:text-xl">
                {tagline}
              </p>

              <p className="mt-6 max-w-xl text-pretty text-muted-foreground">
                {intro}
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href={service.cta.href}>
                    {service.cta.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={servicePath}>
                    <ArrowLeft className="size-4" aria-hidden />
                    All of {service.title}
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal
              delay={120}
              className={cn(layout === "reverse" && "lg:order-1")}
            >
              <div
                className={cn(
                  "rounded-2xl border border-border p-6 lg:p-8",
                  // The wide variant gives the diagram the full measure and a
                  // stronger ground, since it is the only thing on its row.
                  wide
                    ? "bg-gradient-to-br from-primary/5 to-muted/40 lg:p-12"
                    : "bg-muted/30",
                )}
              >
                <ConnectivityScene
                  scene={scene ?? service.scene}
                  className={cn(wide && "mx-auto max-w-3xl")}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sibling rail — every section of this service, current one marked. */}
      <section className="border-b border-border bg-muted/30">
        <nav
          aria-label={`${service.title} sections`}
          className="mx-auto max-w-7xl px-6 py-5 lg:px-10"
        >
          <ul className="flex flex-wrap gap-2">
            {siblings.map((item) => {
              const current = item.slug === section.slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`${servicePath}/${item.slug}`}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none",
                      current
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary hover:bg-primary/5 hover:text-primary focus-visible:border-primary",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>

      {/* Body */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <SectionContent section={section} />
        </div>
      </section>

      {extra}

      <InternetClose
        ctaLabel={service.cta.label}
        ctaHref={service.cta.href}
      />
    </>
  );
}
