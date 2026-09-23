import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { ConnectivityScene } from "@/components/site/connectivity-scene";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getInternetService, type InternetService } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * The body every internet service page shares — the three connectivity
 * services under /internet and the six network services under
 * /internet/network-solutions.
 *
 * A section renders whichever of `body`, `points`, `list` and `steps` it
 * sets, always in that order, so a page's rhythm comes from its content
 * rather than from each route inventing a layout. The one thing that is
 * never optional is the onward path: docs/INTERNET.md is explicit that a
 * reader who has chosen connectivity should be shown what layers onto it,
 * so `addOns` closes every page.
 */
export function InternetServicePage({ service }: { service: InternetService }) {
  const {
    title,
    eyebrow,
    tagline,
    intro,
    lede,
    icon: Icon,
    scene,
    idealFor,
    sections,
    addOns,
    cta,
    parent,
  } = service;

  const backHref = parent ? "/internet/network-solutions" : "/internet";
  const backLabel = parent ? "Network Solutions" : "Internet";

  const related = (addOns ?? [])
    .map((slug) => getInternetService(slug))
    .filter((item): item is InternetService => Boolean(item));

  return (
    <>
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

              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
                {title}
              </h1>

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

      {/* Sections */}
      {sections.map((section, index) => {
        const { slug, eyebrow: sectionEyebrow, heading, body, points, list, listCaption, steps } =
          section;

        return (
          <section
            key={slug}
            id={slug}
            className={cn(
              "scroll-mt-28 border-b border-border",
              index % 2 === 1 && "bg-muted/30",
            )}
          >
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
                <ScrollReveal>
                  <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                    {sectionEyebrow ?? String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
                    {heading}
                  </h2>
                </ScrollReveal>

                <div>
                  {body?.map((paragraph, paragraphIndex) => (
                    <ScrollReveal
                      as="p"
                      key={paragraph}
                      delay={paragraphIndex * 70}
                      className={cn(
                        "max-w-3xl text-lg text-pretty text-muted-foreground",
                        paragraphIndex > 0 && "mt-4",
                      )}
                    >
                      {paragraph}
                    </ScrollReveal>
                  ))}

                  {points?.length ? (
                    <ul
                      className={cn(
                        "grid gap-8 sm:grid-cols-2 xl:grid-cols-3",
                        body?.length ? "mt-12" : "mt-0",
                      )}
                    >
                      {points.map(
                        ({ title: pointTitle, description, icon: PointIcon }, pointIndex) => (
                          <ScrollReveal
                            as="li"
                            key={pointTitle}
                            delay={pointIndex * 60}
                            shift={10}
                            className="group"
                          >
                            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                              <PointIcon className="size-[1.15rem]" aria-hidden />
                            </span>
                            <h3 className="mt-4 text-base font-semibold tracking-tight text-balance">
                              {pointTitle}
                            </h3>
                            <p className="mt-2 text-sm text-pretty text-muted-foreground">
                              {description}
                            </p>
                          </ScrollReveal>
                        ),
                      )}
                    </ul>
                  ) : null}

                  {list?.length ? (
                    <div className={cn(body?.length || points?.length ? "mt-12" : "mt-0")}>
                      {listCaption ? (
                        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                          {listCaption}
                        </p>
                      ) : null}
                      <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
                        {list.map((item, itemIndex) => (
                          <ScrollReveal
                            as="li"
                            key={item}
                            delay={Math.min(itemIndex * 35, 350)}
                            shift={8}
                            className="flex items-start gap-2.5 text-sm"
                          >
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-primary"
                              aria-hidden
                            />
                            <span className="text-muted-foreground">{item}</span>
                          </ScrollReveal>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {steps?.length ? (
                    <ol
                      className={cn(
                        "flex flex-wrap gap-px overflow-hidden rounded-2xl bg-border",
                        body?.length || points?.length || list?.length ? "mt-12" : "mt-0",
                      )}
                    >
                      {steps.map(({ title: stepTitle, body: stepBody }, stepIndex) => (
                        <ScrollReveal
                          as="li"
                          key={stepTitle}
                          delay={stepIndex * 70}
                          shift={10}
                          className="flex grow basis-56 flex-col bg-background p-6"
                        >
                          <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                            {String(stepIndex + 1).padStart(2, "0")}
                          </span>
                          <h3 className="mt-3 text-base font-semibold tracking-tight text-balance">
                            {stepTitle}
                          </h3>
                          <p className="mt-2 text-sm text-pretty text-muted-foreground">
                            {stepBody}
                          </p>
                        </ScrollReveal>
                      ))}
                    </ol>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        );
      })}

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
              <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={backHref}>Back to {backLabel}</Link>
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
