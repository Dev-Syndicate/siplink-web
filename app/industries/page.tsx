import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IndustryIllustration } from "@/components/site/industry-illustration";
import { industryDetails } from "@/lib/industries-detail";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Cloud communication solutions tuned to how each sector works — call centers, healthcare, banking, retail, logistics, government and more.",
};

export default function IndustriesPage() {
  // The first industry leads as a feature; the rest fill the register below.
  const [featured, ...rest] = industryDetails;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative -mt-20 overflow-hidden border-b border-border pt-20 sm:-mt-30 sm:pt-30">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-32 size-[540px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-12 pb-20 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              Industry verticals
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Built around how your sector works
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              The same platform, configured for the demands of each industry —
              from HIPAA-compliant patient lines to high-volume recruiting desks.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Book a demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/solutions">Browse solutions</Link>
              </Button>
            </div>
          </div>

          <Image
            src="/images/industry-verticals.png"
            alt="A cloud phone dashboard connected to healthcare, recruitment, retail and customer support teams"
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* ── Directory ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
              {industryDetails.length} sectors served
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Find your industry
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-pretty text-muted-foreground lg:block">
            Each page shows the exact SipLink capabilities that sector runs on.
          </p>
        </div>

        {/* Featured lead — a wide two-column card that anchors the grid */}
        <Link
          href={`/industries/${featured.slug}`}
          className="group relative mt-10 grid overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-from/[0.06] via-card to-card shadow-sm transition-all hover:border-primary/40 hover:shadow-lg lg:grid-cols-2"
        >
          <div className="flex flex-col p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <featured.icon className="size-6" aria-hidden />
              </span>
              <span className="rounded-full border border-primary/30 bg-background px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-primary uppercase">
                Most deployed
              </span>
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-3 text-primary">{featured.tagline}</p>
            <p className="mt-4 max-w-md text-pretty text-muted-foreground">
              {featured.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featured.capabilities.slice(0, 4).map((c) => (
                <span
                  key={c.title}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {c.title}
                </span>
              ))}
            </div>
            <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Explore {featured.title}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </div>

          {/* the live console scene, borrowed from the detail hero */}
          <div className="relative hidden border-l border-border/60 bg-muted/20 p-8 lg:flex lg:items-center lg:p-10">
            <IndustryIllustration slug={featured.slug} />
          </div>
        </Link>

        {/* The rest — richer cards, each carrying its own capability tags so no
            two read the same. The whole card is the link. */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map(({ slug, title, tagline, icon: Icon, capabilities }) => (
            <Link
              key={slug}
              href={`/industries/${slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              {/* top accent that grows on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-from to-brand-to transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  aria-hidden
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                {tagline}
              </p>

              {/* capability tags — real content, unique per card */}
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                {capabilities.slice(0, 3).map((c) => (
                  <span
                    key={c.title}
                    className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {c.title}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Don&apos;t see your industry?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Our solutions are configured per deployment. Tell us how your teams
            communicate today and we will map it to a plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/solutions">Browse solutions</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
