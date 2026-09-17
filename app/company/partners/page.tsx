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
import {
  partnerBenefits,
  partnerIntegrations,
  partnerTracks,
} from "@/lib/company";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The SipLink partner ecosystem — technology integrations, channel and referral partnerships, and carrier interconnects on a DoT-certified network. Become a partner.",
};

export default function PartnersPage() {
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
              Partner ecosystem
            </span>
            <h1 className="mt-3 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Better together
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
              The best communication experiences are built with partners —
              software vendors who embed our voice and messaging, consultancies
              who bring cloud telephony to their clients, and carriers who need a
              licensed, resilient backbone. If your work touches how businesses
              communicate, there is a way to build on SipLink.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Become a partner</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/products">See the platform</Link>
              </Button>
            </div>
          </div>

          {/* Schematic: integrations ringing the SipLink hub. */}
          <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
            <SectionIllustration shape="ecosystem" />
          </div>
        </div>
      </section>

      {/* Partner tracks */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Ways to partner
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            Three tracks, one network
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {partnerTracks.map(({ title, description, points, icon: Icon }) => (
            <Card key={title} className="flex h-full flex-col">
              <CardHeader className="flex-1">
                <span className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden />
                </span>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="text-pretty">
                  {description}
                </CardDescription>
                <ul className="mt-4 space-y-3">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="size-3" aria-hidden />
                      </span>
                      <span className="text-sm text-pretty text-muted-foreground">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              Technology integrations
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              Already connected to the tools you run
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              SipLink integrates with the CRM, productivity and service
              platforms businesses depend on, and exposes APIs to build your
              own. Partnerships often start here — with an integration your
              mutual customers can simply turn on.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnerIntegrations.map(({ title, description, icon: Icon }) => (
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

      {/* Why partner with SipLink */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Why partner with us
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            A network worth building on
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {partnerBenefits.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex gap-4 rounded-xl border border-border p-6"
            >
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

      {/* CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Let&apos;s build something together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Tell us about your product, your clients or your network, and we
            will find the right way to partner — and the right people to make it
            work.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Become a partner</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/developers">
                Explore the APIs
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
