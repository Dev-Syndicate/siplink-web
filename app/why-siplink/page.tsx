import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionIllustration } from "@/components/site/section-illustration";
import { whyPillars } from "@/lib/company";
import { assurances, reliability, whyChoose } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why SipLink",
  description:
    "Why businesses choose SipLink: a resilient, redundant network with no single point of failure, scalability from ten lines to many sites, and expert support that answers.",
};

export default function WhySipLinkPage() {
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
              Why SipLink
            </span>
            <h1 className="mt-3 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              The provider you stay with
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
              A phone service earns its keep on reliability, quality and
              functionality. Customers have been trained for decades to lift the
              handset and hear a dial tone; when that stops working, they leave.
              SipLink is built so it never stops working — on security,
              reliability, redundancy and scalability, and backed by people who
              answer.
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

          {/* Schematic: redundant network paths with failover. */}
          <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
            <SectionIllustration shape="resilient" />
          </div>
        </div>
      </section>

      {/* The three pillars, expanded */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            How the network is built
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            Engineered for continuity, not just features
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            The difference between a phone system that impresses in a demo and
            one you can run a business on is what happens when something fails.
            Here is how SipLink is designed to keep answering.
          </p>
        </div>

        <div className="mt-14 space-y-16">
          {whyPillars.map(({ eyebrow, title, body, icon: Icon }, index) => (
            <div
              key={eyebrow}
              className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16"
            >
              <div>
                <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-7" aria-hidden />
                </span>
                <p className="mt-6 text-sm font-medium tracking-widest text-primary uppercase">
                  {`0${index + 1} · ${eyebrow}`}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance">
                  {title}
                </h3>
              </div>
              <div className="space-y-4 lg:pt-2">
                {body.map((paragraph) => (
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
      </section>

      {/* Reliability at a glance — from lib/site reliability */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              At a glance
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              What that means for your calls
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reliability.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="h-full bg-background">
                <CardHeader>
                  <span className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription className="text-pretty">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose SipLink — differentiators */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            The difference
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            Experts in what we sell
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A properly engineered voice solution is not a commodity. The wrong
            configuration causes dropped calls and unnecessary cost. SipLink is
            a network of people who have done this for years.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
      </section>

      {/* Siplink Assure — the commitments */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              The SipLink promise
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              Commitments you can hold us to
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Reliability is a promise, and a promise is only worth the way it
              is kept when something goes wrong. These are the commitments
              behind the service.
            </p>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {assurances.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex gap-4 rounded-xl bg-background p-5 ring-1 ring-border"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-primary" aria-hidden />
                    <h3 className="font-medium">{title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          See the network for yourself
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Tell us how your business communicates today and we will show you what
          moving to SipLink would look like — including porting the numbers you
          already use.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Book a demo</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">
              About SipLink
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
