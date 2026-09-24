import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ConnectivityScene } from "@/components/site/connectivity-scene";
import { InternetClose } from "@/components/site/internet-close";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { networkServices, networkSolutionsHub } from "@/lib/internet";

export const metadata: Metadata = {
  title: networkSolutionsHub.title,
  description: networkSolutionsHub.intro,
};

/**
 * The Network Solutions index. It is an index of six services rather than a
 * service itself, so it does not use InternetServicePage — the job here is to
 * get a reader to the right one of the six quickly.
 */
export default function NetworkSolutionsPage() {
  const { eyebrow, title, tagline, intro, lede, icon: Icon, scene, alsoIncludes } =
    networkSolutionsHub;

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
            href="/internet"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Internet
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

              {lede.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 max-w-xl text-pretty text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-9 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Talk to a connectivity expert
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
        </div>
      </section>

      {/* The six services */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              What we build
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Six services, designed as one network
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Each can be delivered on its own. Most businesses take two or
              three, and they are designed together rather than ordered
              separately and made to fit afterwards.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2 xl:grid-cols-3">
            {networkServices.map(({ slug, title: name, tagline: line, icon: ServiceIcon }, index) => (
              <ScrollReveal
                as="li"
                key={slug}
                delay={index * 70}
                shift={12}
                className="bg-background"
              >
                <Link
                  href={`/internet/network-solutions/${slug}`}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ServiceIcon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-balance">
                    {name}
                  </h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {line}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary">
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

      {/* Delivered across all six */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Across every service
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
                Two things that are never a separate line item
              </h2>
            </ScrollReveal>

            <ul className="grid gap-10 sm:grid-cols-2">
              {alsoIncludes.map(({ title: name, description, icon: PointIcon }, index) => (
                <ScrollReveal as="li" key={name} delay={index * 90}>
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <PointIcon className="size-[1.15rem]" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">
                    {name}
                  </h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Its own wording — this page ends on a design conversation rather
          than on a site survey, but it uses the same band as everything else
          under /internet. */}
      <InternetClose
        heading="Not sure which of these you need?"
        body="Most people are not, and that is the normal starting point. Tell us what your sites look like and what runs on them, and we will come back with a design rather than a price list."
        ctaLabel="Talk to a connectivity expert"
        ctaHref="/contact"
      />
    </>
  );
}
