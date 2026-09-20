import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { assurances, reliability, site, whyChoose } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "SipLink Communications has been building business voice since 2012 — cloud telephony, SIP trunking and unified communications for growing organisations.",
};

/**
 * Founding dates come from the sales brochure. Sources disagree on the ISP
 * licence year, so only the two dates the brochure states are shown here.
 * See details-content.md §20.1.
 */
const milestones = [
  { year: "2012", label: "SipLink started" },
  { year: "2014", label: "Incorporated" },
  { year: "10,000+", label: "Customers served" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-32 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-20 lg:px-10">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            About us
          </span>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Connect faster, collaborate smarter, scale effortlessly.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
            {site.legalName} is a modern business communication platform built on
            reliable SIP technology, enabling voice, messaging and real-time
            communication across teams and customers worldwide.
          </p>

          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6">
            {milestones.map(({ year, label }) => (
              <div key={label}>
                <dt className="text-3xl font-semibold tracking-tight">
                  {year}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              Built on reliable routes
            </h2>
            <div className="mt-6 space-y-4 text-pretty text-muted-foreground">
              <p>
                We build on the efficiency of our direct IP routes — chosen for
                their stability, rate and voice quality — and extend them with
                selected providers to widen coverage and improve reliability.
              </p>
              <p>
                Our network runs real-time IP quality monitoring to select the
                best route for every call, so call quality holds up as your
                volume grows.
              </p>
              <p>
                With advanced telephony such as intelligent call routing, SIP
                trunking, IVR, call recording and real-time analytics, every
                interaction stays efficient and measurable.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {reliability.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Siplink Assure */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            SipLink Assure
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            What every customer gets, from design through to day-to-day
            operation.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assurances.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="h-full">
              <CardHeader>
                <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription className="text-pretty">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Why choose SipLink */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              Why choose SipLink
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              What we bring to a deployment, beyond the platform itself.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
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

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Let&apos;s talk
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Discover what makes SipLink different — book a walkthrough with our
            team.
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
