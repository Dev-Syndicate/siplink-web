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
import { SectionIllustration } from "@/components/site/section-illustration";
import { careerAreas, careerLocations, careerValues } from "@/lib/company";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work at SipLink. Build carrier-grade cloud communications with a team of genuine VoIP experts across Chennai, Bangalore and Hyderabad. Applications welcome.",
};

export default function CareersPage() {
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
              Careers
            </span>
            <h1 className="mt-3 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Help businesses stay connected
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
              SipLink is a cloud communications company built by people who take
              voice seriously. We keep hospitals reaching patients, recruiters
              reaching candidates and support teams reaching customers — on a
              network we are accountable for end to end. If that sounds like work
              worth doing, we would like to hear from you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Introduce yourself</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">About SipLink</Link>
              </Button>
            </div>
          </div>

          {/* Schematic: a team connected around one hub. */}
          <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
            <SectionIllustration shape="people" />
          </div>
        </div>
      </section>

      {/* Why work here */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Why work here
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            The kind of place SipLink is
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {careerValues.map(({ title, description, icon: Icon }) => (
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

      {/* Where you might fit */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              Areas of work
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              Where you might fit
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              We hire across engineering, product, support and commercial teams.
              Roles are posted as they open — but a strong introduction is always
              worth sending, whether or not a specific position is listed today.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {careerAreas.map(({ title, description, icon: Icon }) => (
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

      {/* Locations */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Where we are
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            Offices across India
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {careerLocations.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-border p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            No listing that fits? Reach out anyway
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Tell us what you do well and where you would like to grow. We would
            rather meet good people early than miss them, so applications are
            always welcome.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Apply or say hello</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/why-siplink">
                Why SipLink
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
