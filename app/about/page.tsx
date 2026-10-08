import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Globe,
  Headset,
  HeartHandshake,
  Layers,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { ClosingCta } from "@/components/site/closing-cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OfficeNetwork } from "@/components/site/office-network";
import { companyMissionVision } from "@/lib/company";
import { assurances, reliability, site, whyChoose } from "@/lib/site";

export const metadata: Metadata = {
  title: "About SipLink — Powering Better Business Communication",
  description:
    "SipLink Communications has been building business voice since 2012 — cloud telephony, SIP trunking, and unified communications for growing organizations worldwide.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-muted/20 to-background py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-32 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/4 size-[400px] rounded-full bg-brand-from/10 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 gap-1.5 px-3 py-1 font-mono text-xs tracking-wider uppercase"
            >
              <Sparkles className="size-3.5 text-primary" />
              About SipLink
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Powering Better Business Communication
            </h1>

            <p className="mt-6 text-lg text-pretty text-muted-foreground sm:text-xl">
              {site.legalName} is a business communications and cloud voice
              technology company helping organizations connect their people,
              customers, candidates, and partners more effectively.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full shadow-md shadow-primary/20">
                <Link href="/why-siplink">
                  Why Choose SipLink
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/company/certifications">Verified Certifications</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="border-b border-border bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-border/80 bg-card p-8">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Rocket className="size-6" />
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                {companyMissionVision.mission.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground">
                {companyMissionVision.mission.statement}
              </p>
            </Card>

            <Card className="border-border/80 bg-card p-8">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Globe className="size-6" />
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                {companyMissionVision.vision.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground">
                {companyMissionVision.vision.statement}
              </p>
            </Card>
          </div>

          {/* Pillars */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyMissionVision.pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-border/80 bg-card p-6 shadow-sm"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Built for the way businesses communicate today */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Modern Cloud Voice
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Built for the way businesses communicate today
            </h2>
            <div className="mt-6 space-y-4 text-pretty text-muted-foreground">
              <p>
                Communication is no longer limited to a desk phone in a single
                office. Teams work remotely, customers expect instant responses,
                and businesses need every conversation seamlessly integrated with
                their CRM workflows.
              </p>
              <p>
                SipLink brings voice, messaging, collaboration, and business
                applications together into one connected ecosystem so your teams
                can communicate from anywhere while keeping every interaction
                organized, measured, and manageable.
              </p>
              <p>
                From growing businesses to global enterprises, SipLink simplifies
                telephony, improves team productivity, and delivers superior customer
                experiences—without the complexity of traditional hardware.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="outline">
                <Link href="/company/partners">
                  Explore Partner Integrations
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            {reliability.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-xl border border-border/80 bg-muted/30 p-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm ring-1 ring-border">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-medium text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three staffed offices, one registered US entity — the real shape of
          the company, not a stock map graphic. */}
      <section className="border-t border-border py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Where We Operate
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Three offices, one business
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              SipLink Communications Pvt. Ltd. runs out of Chennai, Bangalore,
              and Hyderabad, with SipLink Communications LLC registered in
              Sheridan, Wyoming for US customers.
            </p>
          </div>

          <div className="mt-14">
            <OfficeNetwork />
          </div>
        </div>
      </section>

      {/* Siplink Assure */}
      <section className="border-t border-border bg-muted/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Operational Standards
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              SipLink Assure
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              What every customer gets, from initial design through to day-to-day operation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assurances.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="h-full border-border/80 bg-card">
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
        </div>
      </section>

      {/* Why choose SipLink */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Value Proposition
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Why choose SipLink
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            What we bring to every deployment, beyond the platform itself.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-sm">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-medium text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ClosingCta
        heading="Let’s talk"
        body="Discover what makes SipLink different — book a walkthrough with our engineering team."
        secondary={{ label: "Why SipLink", href: "/why-siplink" }}
      />
    </>
  );
}
