import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Globe,
  Headset,
  HeartHandshake,
  Layers,
  Network,
  Rocket,
  Sparkles,
} from "lucide-react";

import { AboutAssureScene } from "@/components/site/about-assure-scene";
import { AboutCloudVoice } from "@/components/site/about-cloud-voice";
import { AboutMissionPillars } from "@/components/site/about-mission-pillars";
import { AboutOffices } from "@/components/site/about-offices";
import { ClosingCta } from "@/components/site/closing-cta";
import { RevealGroup } from "@/components/site/reveal-group";
import { WhyChooseSection } from "@/components/site/why-choose-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { companyMissionVision } from "@/lib/company";
import { reliability, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About SipLink — Powering Better Business Communication",
  description:
    "SipLink Communications builds business voice — cloud telephony, SIP trunking, and unified communications for growing organizations.",
};

const offices = [
  {
    city: "Bangalore",
    badge: "Primary Operating Office",
    address: [
      "Quadrant 2, 4th Floor, Tower 1, Umiya Business Bay",
      "Cessna Business Park, Marathahalli, Outer Ring Rd",
      "Kadubeesanahalli, Bengaluru 560037",
    ],
    phone: "+91 82172 02075",
  },
  {
    city: "Chennai",
    badge: "Operations & Network Center",
    address: [
      "Level 3, Third Floor, Anmol Palani, No. 88",
      "Gopathi Narayanaswami Chetty Rd, T. Nagar",
      "Chennai, Tamil Nadu 600017",
    ],
    phone: "+91 44 48636371",
  },
  {
    city: "Hyderabad",
    badge: "Technical Engineering Hub",
    address: [
      "2nd Floor, Jain Sadguru Images Capital Park, 206, Capital Pk Rd",
      "Ayyappa Society, VIP Hills, Silicon Valley, Madhapur",
      "Hyderabad, Telangana 500081",
    ],
    phone: "+91 82172 02075",
  },
  {
    city: "Sheridan, Wyoming (USA)",
    badge: "US Corporate Entity",
    address: [
      "SipLink Communications LLC",
      "30 N Gould St, Ste R",
      "Sheridan, WY 82801, United States",
    ],
    phone: "+1 916 226 6066",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero Section — Full-height blended image backdrop matching homepage hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* The photograph is the section's backdrop on the right half, blending into background via scrim */}
        <div className="absolute inset-y-0 right-0 hidden w-[64%] lg:block">
          <Image
            src="/images/about/about-hero.webp"
            alt="SipLink enterprise communications team in modern tech headquarters"
            fill
            priority
            sizes="64vw"
            className="object-cover object-[70%_center]"
          />
          {/* Scrim covers the overlap with the text column so copy stays 100% crisp and readable */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-background from-5% via-background/70 via-22% to-transparent to-45%"
          />
          {/* Bottom subtle edge fade */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent"
          />
        </div>

        {/* Ambient top-right brand glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 -right-32 size-[680px] rounded-full bg-brand-to/10 blur-3xl"
        />

        {/* Hero content container with responsive frame */}
        <div className="hero-frame relative mx-auto flex w-full flex-col justify-center py-14 sm:py-16 lg:py-20">
          <RevealGroup className="grid gap-14 lg:grid-cols-[minmax(0,35rem)_minmax(0,1fr)] lg:items-center">
            {/* Left Column: Text Content */}
            <div
              className="reveal-item max-w-2xl"
              style={{ "--reveal-index": 0 } as React.CSSProperties}
            >
              <Badge
                variant="secondary"
                className="mb-5 gap-1.5 px-3 py-1 font-mono text-xs tracking-wider uppercase"
              >
                <Sparkles className="size-3.5 text-primary" />
                About SipLink
              </Badge>

              <h1 className="font-heading text-4xl leading-[1.08] font-bold tracking-tight text-foreground sm:text-5xl lg:text-[clamp(2.5rem,4.5vh+1.2vw,3.75rem)] text-balance">
                Powering Better{" "}
                <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                  Business Communication
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-pretty text-muted-foreground leading-relaxed">
                {site.legalName} is a business communications and cloud voice
                technology company helping organizations connect their people,
                customers, candidates, and partners more effectively.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full shadow-md shadow-primary/20 transition-transform duration-200 motion-safe:hover:-translate-y-0.5">
                  <Link href="/why-siplink">
                    Why Choose SipLink
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full transition-transform duration-200 motion-safe:hover:-translate-y-0.5">
                  <Link href="/company/certifications">Verified Certifications</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border/60 pt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-foreground">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary" />
                  <span className="font-medium text-foreground">DoT Licensed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand-from" />
                  <span className="font-medium text-foreground">ISO 27001 &middot; SOC 2 &middot; HIPAA &middot; GDPR</span>
                </div>
              </div>
            </div>
          </RevealGroup>

          {/* Floating live network status card over the photograph — bobs
              continuously like the homepage hero's own floating chips, so
              the hero never sits perfectly still even at rest. */}
          <div
            className="card-float absolute bottom-10 right-12 hidden xl:flex items-center gap-3.5 rounded-2xl border border-border/60 bg-background/90 p-4 shadow-xl backdrop-blur-md"
            style={{ "--float-duration": "6s" } as React.CSSProperties}
          >
            <span className="flex size-2.5 relative shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <div>
              <p className="text-xs font-semibold text-foreground">
                Three offices, one business
              </p>
              <p className="text-[11px] text-muted-foreground">
                DoT licensed &middot; 24/7 support
              </p>
            </div>
            <Badge variant="secondary" className="font-mono text-[10px] ml-2">
              Live Operations
            </Badge>
          </div>

          {/* Mobile / Tablet visual display */}
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-border/80 lg:hidden">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/about/about-hero.webp"
                alt="SipLink enterprise communications team in modern tech headquarters"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[70%_center]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-border/60 bg-background/90 p-2.5 backdrop-blur-md">
                <p className="text-xs font-semibold text-foreground">Three Offices, One Business</p>
                <Badge variant="outline" className="font-mono text-[10px]">
                  24/7 Support
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission, Vision & Core Pillars Section */}
      <AboutMissionPillars />

      {/* 3. Built for the way businesses communicate today */}
      <AboutCloudVoice
        reliability={reliability.map(({ title, description }) => ({ title, description }))}
      />

      {/* 4. Three staffed offices, one business */}
      <AboutOffices offices={offices} />

      {/* 5. SipLink Assure — Operational Standards */}
      <section className="relative overflow-hidden border-t border-border bg-muted/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
                  Operational Standards
                </span>
                <span className="inline-block h-px w-10 bg-primary/60 sm:w-14" />
              </div>
              <h2 className="mt-3 text-4xl leading-[1.1] font-extrabold tracking-tight text-foreground sm:text-5xl">
                SipLink <span className="text-primary">Assure</span>
              </h2>
            </div>
            <p className="text-pretty text-muted-foreground lg:col-span-5 lg:text-right">
              What every customer gets, from initial design through to day-to-day operation.
            </p>
          </div>

          <AboutAssureScene />
        </div>
      </section>

      {/* 6. Why choose SipLink */}
      <WhyChooseSection />

      {/* 7. CTA */}
      <ClosingCta
        heading="Let’s talk"
        body="Discover what makes SipLink different — book a walkthrough with our engineering team."
        secondary={{ label: "Why SipLink", href: "/why-siplink" }}
      />
    </>
  );
}
