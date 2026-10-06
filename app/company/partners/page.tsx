import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Cpu,
  HeartHandshake,
  Layers,
  Network,
  Puzzle,
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
import { partnerCategories, partnerTracks } from "@/lib/company";
import { integrationLogos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners — Stronger Together | SipLink Ecosystem",
  description:
    "Join the SipLink partner ecosystem. Integrate business voice and cloud telephony with CRM, productivity, and contact center platforms.",
};

export default function PartnersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-muted/20 to-background py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
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
              <HeartHandshake className="size-3.5 text-primary" />
              SipLink Partner Ecosystem
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Stronger Together: Connected Communication Ecosystems
            </h1>

            <p className="mt-6 text-lg text-pretty text-muted-foreground sm:text-xl">
              The best communication solutions do not operate in isolation.
              {site.name} collaborates with software providers, platforms,
              carriers, and system integrators to build connected, cohesive
              communication workflows for our mutual customers.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full shadow-md shadow-primary/20">
                <Link href="/contact">
                  Become a SipLink Partner
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="#partner-tracks">Explore Partnership Tracks</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology That Works Together */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Ecosystem Integrations
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Technology that works together
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Our integrations and platform partnerships help connect every voice
            interaction with the tools and applications your teams already rely on.
          </p>
        </div>

        {/* Verified Integration Logo Grid */}
        <div className="mt-14 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-10">
          <div className="text-center">
            <h3 className="text-lg font-semibold tracking-tight">
              Verified Integrations & Ecosystem Applications
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Directly integrated with leading CRMs, collaboration platforms, and staffing suites
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {integrationLogos.map((item) => (
              <div
                key={item.name}
                className="group flex flex-col items-center justify-center rounded-xl border border-border/60 bg-background/80 p-5 transition-all duration-300 hover:border-primary/40 hover:bg-muted/40 hover:shadow-sm"
              >
                <div className="relative flex h-12 w-28 items-center justify-center">
                  <Image
                    src={item.src}
                    alt={`${item.name} logo`}
                    width={item.w}
                    height={item.h}
                    className="max-h-9 max-w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                </div>
                <span className="mt-2 text-xs font-medium text-muted-foreground group-hover:text-foreground">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Categories Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partnerCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.title} className="flex flex-col justify-between border-border/80">
                <CardHeader>
                  <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle className="text-lg font-semibold">{cat.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-pretty">
                    {cat.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="border-t border-border/60 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.examples.map((ex) => (
                      <Badge
                        key={ex}
                        variant="secondary"
                        className="font-mono text-[10px]"
                      >
                        {ex}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Partner Tracks */}
      <section
        id="partner-tracks"
        className="scroll-mt-20 border-t border-border bg-muted/30 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Partnership Models
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Partner with SipLink
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              We build long-term relationships with technology vendors, solution
              providers, resellers, and consultants that share our commitment to
              simple, reliable business communication.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {partnerTracks.map((track) => {
              const Icon = track.icon;
              return (
                <Card
                  key={track.title}
                  className="flex flex-col justify-between border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <CardHeader>
                    <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </span>
                    <CardTitle className="text-xl font-semibold">
                      {track.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-pretty">
                      {track.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-2">
                    <div className="space-y-2.5 border-t border-border/60 pt-4">
                      <div className="text-xs font-semibold tracking-wider text-foreground uppercase">
                        Program Benefits:
                      </div>
                      {track.benefits.map((b) => (
                        <div
                          key={b}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/contact">
                          Inquire about this track
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <ClosingCta
        heading="Let's build connected communication experiences together"
        body="Get in touch with our partnerships team to discuss technical integration, distribution, or joint go-to-market opportunities."
        action="Become a SIPLINK Partner"
        href="/contact"
        secondary={{ label: "Why Choose SipLink", href: "/why-siplink" }}
      />
    </>
  );
}
