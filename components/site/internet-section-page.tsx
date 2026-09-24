import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

import { ConnectivityScene } from "@/components/site/connectivity-scene";
import { SectionContent } from "@/components/site/internet-section-content";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
 * from search has no idea what else exists. So the page carries the full
 * sibling rail rather than a bare back link, with the current page marked.
 */
export function InternetSectionPage({
  service,
  section,
}: {
  service: InternetService;
  section: SectionPage;
}) {
  const { title, heading, tagline, intro, eyebrow, scene } = section;
  const siblings = getSectionPages(service);
  const index = siblings.findIndex((item) => item.slug === section.slug);
  const previous = index > 0 ? siblings[index - 1] : undefined;
  const next = index < siblings.length - 1 ? siblings[index + 1] : undefined;

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

  const servicePath = `/internet/${service.slug}`;
  const ServiceIcon = service.icon;

  return (
    <>
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

              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
                {heading}
              </h1>

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

      {/* Previous / next within the service */}
      {previous || next ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
            <ul className="grid gap-4 sm:grid-cols-2">
              {previous ? (
                <ScrollReveal as="li">
                  <Link
                    href={`${servicePath}/${previous.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border p-6 transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:border-primary focus-visible:outline-none"
                  >
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      <ArrowLeft
                        className="size-3.5 transition-transform group-hover:-translate-x-1"
                        aria-hidden
                      />
                      Previous
                    </span>
                    <span className="mt-3 text-base font-semibold tracking-tight">
                      {previous.title}
                    </span>
                    <span className="mt-1.5 text-sm text-pretty text-muted-foreground">
                      {previous.tagline}
                    </span>
                  </Link>
                </ScrollReveal>
              ) : (
                <li aria-hidden />
              )}

              {next ? (
                <ScrollReveal as="li" delay={70}>
                  <Link
                    href={`${servicePath}/${next.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border p-6 text-right transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:border-primary focus-visible:outline-none"
                  >
                    <span className="inline-flex items-center justify-end gap-1.5 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Next
                      <ArrowRight
                        className="size-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-3 text-base font-semibold tracking-tight">
                      {next.title}
                    </span>
                    <span className="mt-1.5 text-sm text-pretty text-muted-foreground">
                      {next.tagline}
                    </span>
                  </Link>
                </ScrollReveal>
              ) : (
                <li aria-hidden />
              )}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Close */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Tell us where your offices are
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            We will check what is deliverable at each address, size the service
            against how you actually work, and quote the whole network — voice
            included — as one bill.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href={service.cta.href}>
                {service.cta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={servicePath}>Back to {service.title}</Link>
            </Button>
          </div>

          <Separator className="mx-auto mt-14 max-w-xs" />

          <p className="mt-8 text-xs text-muted-foreground/70">
            Availability, service levels and the exact scope of managed
            services are confirmed per location and set out in your agreement.
            All services are subject to technical feasibility at the time of
            order.
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
