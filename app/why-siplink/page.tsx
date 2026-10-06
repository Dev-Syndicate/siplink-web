import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Headphones,
  Layers,
  Network,
  Puzzle,
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
import { whySipLinkDifferentiators } from "@/lib/company";
import { certifications, reliability, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why SipLink — Built for Reliable Business Communication",
  description:
    "Discover why growing businesses and enterprises choose SipLink for business voice, cloud PBX, SIP trunking, and unified communications.",
};

const proofStats = [
  { value: "10,000+", label: "Businesses Connected", sub: "Since 2012" },
  { value: "24/7", label: "Specialist Support", sub: "Direct Telecom Engineers" },
  { value: "100%", label: "Carrier-Grade IP", sub: "Direct Routing & QoS" },
  { value: "5+", label: "Compliance Benchmarks", sub: "DoT, ISO, SOC 2, HIPAA, GDPR" },
];

export default function WhySipLinkPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-muted/20 to-background py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 size-[500px] rounded-full bg-brand-to/10 blur-3xl"
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
              Why Choose SipLink
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Communication that works for your business — without the complexity.
            </h1>

            <p className="mt-6 text-lg text-pretty text-muted-foreground sm:text-xl">
              Your communication infrastructure should propel your growth, not
              become another administrative hurdle. {site.name} combines proven
              cloud voice engineering with proactive 24/7 support to keep your
              people connected everywhere.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full shadow-md shadow-primary/20">
                <Link href="/contact">
                  See how SipLink can work for you
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/solutions">Explore Solutions</Link>
              </Button>
            </div>

            {/* Compliance Pills */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2 pt-4">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Verified Standards:
              </span>
              {["DoT Certified", "ISO/IEC 27001", "SOC 2 Type 2", "HIPAA Compliant", "GDPR Aligned"].map(
                (item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="border-border/80 bg-background/60 font-mono text-[11px] font-medium"
                  >
                    {item}
                  </Badge>
                ),
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur md:grid-cols-4 md:p-8">
            {proofStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-foreground">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Built for Modern Teams
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Why leading businesses choose SipLink
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            From growing startups to multi-branch enterprises, SipLink brings
            together voice, collaboration, and CRM workflows into one resilient
            system.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {whySipLinkDifferentiators.map((diff) => {
            const Icon = diff.icon;
            return (
              <Card
                key={diff.title}
                className="group relative flex flex-col justify-between overflow-hidden border-border/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" />
                    </span>
                    {diff.badge && (
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        {diff.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {diff.title}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-foreground/80">
                    {diff.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-2">
                  <p className="text-sm text-pretty text-muted-foreground">
                    {diff.description}
                  </p>

                  <div className="space-y-2 border-t border-border/60 pt-4">
                    {diff.highlights.map((point) => (
                      <div key={point} className="flex items-start gap-2 text-xs text-foreground/80">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Network Infrastructure Section */}
      <section className="border-t border-border bg-muted/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
                Enterprise Infrastructure
              </span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Engineered for continuous availability and crystal clarity
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Telecom downtime damages customer trust. SipLink is engineered
                with direct IP routes, carrier-grade redundancy, and proactive
                monitoring so your lines remain open through any circumstance.
              </p>

              <div className="mt-8 space-y-6">
                {reliability.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm ring-1 ring-border">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight">
                The SipLink Commitment
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every business customer receives enterprise-grade operational
                discipline from day one.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
                  <div className="flex items-center gap-3">
                    <Headphones className="size-5 text-primary" />
                    <span className="text-sm font-semibold">24/7 Dedicated Support</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Direct access to knowledgeable telecom technicians by phone, email, and ticketing.
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-5 text-primary" />
                    <span className="text-sm font-semibold">Zero Single Point of Failure</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Multiple upstream carrier connections and automatic failover across redundant infrastructure.
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
                  <div className="flex items-center gap-3">
                    <Globe className="size-5 text-primary" />
                    <span className="text-sm font-semibold">Regulated Telecom Compliance</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Operated under Department of Telecommunications (DoT) regulations with verified ISMS controls.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-border/80 pt-6">
                <Button asChild className="w-full">
                  <Link href="/company/certifications">
                    View Verified Certifications & Compliance
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <ClosingCta
        heading="Experience the difference of carrier-grade cloud voice"
        body="Schedule a consultation with our voice specialists to explore plan sizing, PBX features, and zero-downtime number porting."
        action="Schedule a Consultation"
        href="/contact"
        secondary={{ label: "View Pricing Plans", href: "/pricing" }}
      />
    </>
  );
}
