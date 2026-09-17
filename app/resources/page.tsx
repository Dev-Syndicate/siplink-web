import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  resourceDetails,
  resourceGroupMeta,
  resourceGroupOrder,
} from "@/lib/resources";
import { navHighlights } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, answers, customer stories and network transparency — everything you need to evaluate and get more from SipLink cloud communications.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 sm:-mt-30 sm:pt-30 overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-24 size-[640px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-10 lg:pt-28 lg:pb-20">
          <Badge variant="secondary" className="font-mono tracking-widest">
            SIPLINK RESOURCES
          </Badge>

          <h1 className="font-heading mt-6 max-w-4xl text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Everything you need <span className="text-primary">to decide</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-pretty text-muted-foreground lg:text-xl">
            Practical guides, straight answers, what our customers say, and an
            honest look at the network you would run on — gathered in one place,
            written by the people who build and support the platform.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Talk to our team</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">Explore the platform</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Resource groups */}
      {resourceGroupOrder.map((group, index) => {
        const meta = resourceGroupMeta[group];
        const GroupIcon = meta.icon;
        const items = resourceDetails.filter((item) => item.group === group);

        return (
          <section
            key={group}
            className={
              index % 2 === 0
                ? "border-b border-border"
                : "border-b border-border bg-muted/30"
            }
          >
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GroupIcon className="size-5" aria-hidden />
                </span>
                <div className="max-w-2xl">
                  <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance">
                    {group}
                  </h2>
                  <p className="mt-2 text-pretty text-muted-foreground">
                    {meta.description}
                  </p>
                </div>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map(({ slug, title, tagline, icon: Icon }) => (
                  <Link
                    key={slug}
                    href={`/resources/${slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-background p-7 transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:border-primary/40 focus-visible:outline-none"
                  >
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-heading mt-5 text-lg font-semibold tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {tagline}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary">
                      Open
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Trust strip */}
      <section className="border-b border-border bg-muted/30">
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
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Cannot find what you are looking for?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Tell us what you are trying to work out. A real person on our team
          will get back to you — usually with a straight answer.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Talk to us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/pricing">View pricing</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
