import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionIllustration } from "@/components/site/section-illustration";
import { newsHighlights, newsTopics } from "@/lib/company";

export const metadata: Metadata = {
  title: "News",
  description:
    "The SipLink newsroom — product and platform updates, network changes, new integrations and company milestones from a licensed cloud communications provider.",
};

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 sm:-mt-30 sm:pt-30 overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-32 size-[540px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-14 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:px-10">
          <div>
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              Newsroom
            </span>
            <h1 className="mt-3 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              What&apos;s new at SipLink
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
              The platform moves quickly. This is where we share what changes —
              new capabilities across voice, messaging and APIs, improvements to
              the network, fresh integrations and the milestones along the way.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Talk to us</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/products">Explore the platform</Link>
              </Button>
            </div>
          </div>

          {/* Schematic: the platform broadcasting updates to listeners. */}
          <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
            <SectionIllustration shape="broadcast" />
          </div>
        </div>
      </section>

      {/* Latest updates */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Latest updates
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            Now live on the platform
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {newsHighlights.map(({ eyebrow, title, body, href, icon: Icon }) => (
            <Card key={title} className="flex h-full flex-col">
              <CardHeader className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-xs font-medium tracking-widest text-primary uppercase">
                    {eyebrow}
                  </span>
                </div>
                <CardTitle className="mt-4 text-xl">{title}</CardTitle>
                <CardDescription className="text-pretty">
                  {body}
                </CardDescription>
                <Separator className="my-5" />
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Read more
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* What we cover */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              What we cover
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              The updates worth your attention
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              We keep the newsroom focused on what actually affects your service,
              rather than filling it with noise. Expect updates across these
              areas.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {newsTopics.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay in the loop */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="rounded-2xl border border-border bg-muted/30 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-balance">
            Want product news as it happens?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Follow SipLink across our channels, or ask our team to keep you
            posted on the updates that matter to your deployment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/resources/blog">
                Read the blog
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            See what&apos;s new for your business
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Tell us how your teams communicate today and we will show you the
            latest capabilities that would make a difference.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/why-siplink">Why SipLink</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
