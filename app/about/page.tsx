import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  Globe,
  Headset,
  HeartHandshake,
  Layers,
  LifeBuoy,
  MapPin,
  Network,
  Phone,
  Rocket,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { ClosingCta } from "@/components/site/closing-cta";
import { WhyChooseSection } from "@/components/site/why-choose-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { companyMissionVision } from "@/lib/company";
import { reliability, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About SipLink — Powering Better Business Communication",
  description:
    "SipLink Communications has been building business voice since 2012 — cloud telephony, SIP trunking, and unified communications for growing organizations worldwide.",
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
      "Capital Park, No. 602, 6th Floor, Capital Pk Rd",
      "Ayyappa Society, Madhapur",
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

const assureCommitments = [
  {
    step: "01",
    title: "Dedicated Project Managers",
    phase: "Design & Onboarding",
    description:
      "Experts oversee the design and delivery of your solution from concept through to installation. We audit your existing PBX, bandwidth, and call flows before you commit.",
    icon: Users,
    guarantee: "Architectural alignment before cutover",
  },
  {
    step: "02",
    title: "Resolution Expertise",
    phase: "Single-Point Ownership",
    description:
      "An expert manages your issue from beginning to end, keeping you informed until it is resolved. No passing between departments or re-explaining your setup.",
    icon: LifeBuoy,
    guarantee: "Direct engineer accountability",
  },
  {
    step: "03",
    title: "24x7 Customer Support",
    phase: "Day-to-Day Operations",
    description:
      "Dedicated customer support staff are always available to help. Reach telecom engineers via phone, email, and live messaging around the clock.",
    icon: Clock,
    guarantee: "<15s average engineer response",
  },
  {
    step: "04",
    title: "Online Account Management",
    phase: "Administrative Control",
    description:
      "A web portal that makes it easy to administer your account and support. Manage extensions, review CDRs, update routing rules, and monitor spend in real time.",
    icon: ScrollText,
    guarantee: "Instant self-service web portal",
  },
  {
    step: "05",
    title: "Service Level Agreement",
    phase: "Contractual Commitment",
    description:
      "Comprehensive coverage for equipment, access network, and IP transport with guaranteed availability and low-latency performance parameters.",
    icon: ShieldCheck,
    guarantee: "99.99% availability commitment",
  },
  {
    step: "06",
    title: "Service Interruption Credits",
    phase: "Financial Accountability",
    description:
      "Our goal is to resolve any service interruption immediately. If a reported fault resides with us, you automatically receive a service credit.",
    icon: ShieldAlert,
    guarantee: "Automatic credit on eligible faults",
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
            src="/images/about/about-hero.jpg"
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
          <div className="grid gap-14 lg:grid-cols-[minmax(0,35rem)_minmax(0,1fr)] lg:items-center">
            {/* Left Column: Text Content */}
            <div className="max-w-2xl">
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

              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border/60 pt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-foreground">99.99% Availability</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary" />
                  <span className="font-medium text-foreground">Carrier-Grade Peering</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand-from" />
                  <span className="font-medium text-foreground">DoT Category-A ISP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating live network status card over the photograph */}
          <div className="absolute bottom-10 right-12 hidden xl:flex items-center gap-3.5 rounded-2xl border border-border/60 bg-background/90 p-4 shadow-xl backdrop-blur-md">
            <span className="flex size-2.5 relative shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <div>
              <p className="text-xs font-semibold text-foreground">
                Global Enterprise Voice Network
              </p>
              <p className="text-[11px] text-muted-foreground">
                Carrier-grade peering &middot; 99.99% availability
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
                src="/images/about/about-hero.jpg"
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
                <p className="text-xs font-semibold text-foreground">Global Voice Network</p>
                <Badge variant="outline" className="font-mono text-[10px]">
                  99.99% Availability
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission, Vision & Core Pillars Section */}
      <section className="border-b border-border bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Strategic Foundation
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Our Mission, Vision &amp; Pillars
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Built on architectural principles that protect uptime, simplify scalability, and provide direct access to real telecom engineers.
            </p>
          </div>

          {/* Image 2 + Mission & Vision Grid */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
            {/* Image 2: Strategic Leadership & Global Network Screen */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl min-h-[320px] lg:min-h-[420px]">
                <Image
                  src="/images/about/about-mission.jpg"
                  alt="SipLink technology leadership team in boardroom reviewing global telecom network infrastructure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-border/60 bg-background/90 p-3 backdrop-blur-md">
                  <p className="text-xs font-semibold text-foreground">Global Network Architecture</p>
                  <p className="text-[11px] text-muted-foreground">Direct IP routes, carrier-neutral facilities, and proactive traffic management</p>
                </div>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <Card className="border-border/80 bg-card shadow-sm flex-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Rocket className="size-5" />
                    </span>
                    <div>
                      <span className="font-mono text-[11px] tracking-wider text-primary uppercase">Purpose</span>
                      <h3 className="text-lg font-semibold text-foreground">
                        {companyMissionVision.mission.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {companyMissionVision.mission.statement}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/80 bg-card shadow-sm flex-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Globe className="size-5" />
                    </span>
                    <div>
                      <span className="font-mono text-[11px] tracking-wider text-primary uppercase">Destination</span>
                      <h3 className="text-lg font-semibold text-foreground">
                        {companyMissionVision.vision.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {companyMissionVision.vision.statement}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 4 Foundation Pillars Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyMissionVision.pillars.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h4 className="mt-4 font-semibold text-foreground">{title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Built for the way businesses communicate today */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-5">
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

          {/* Modern Cloud Voice Visual — Seamlessly blended into background */}
          <div className="relative lg:col-span-7 flex items-center justify-center">
            {/* Ambient soft brand glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-full bg-primary/10 blur-3xl"
            />
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full max-w-[680px]">
              <Image
                src="/images/about/about-modern-cloud-voice.png"
                alt="Modern business team collaborating with SipLink cloud voice and unified communications"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain object-center drop-shadow-xl"
                priority={false}
              />
            </div>
          </div>
        </div>

        {/* 3 Reliability Infrastructure Highlights below */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {reliability.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col justify-between rounded-xl border border-border/80 bg-muted/20 p-5 shadow-xs"
            >
              <div>
                <span className="flex size-10 items-center justify-center rounded-lg bg-background text-primary shadow-xs ring-1 ring-border">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3.5 font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Three staffed offices, one business */}
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

          {/* Image 4 + Office Cards Grid */}
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
            {/* Image 4: SipLink Corporate Headquarters */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl min-h-[340px]">
                <Image
                  src="/images/about/about-global-network.png"
                  alt="SipLink corporate headquarters building with illuminated SipLink logo and architectural crimson lighting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-border/60 bg-background/90 p-3 backdrop-blur-md">
                  <Badge variant="secondary" className="mb-1 font-mono text-[10px]">
                    SipLink Headquarters
                  </Badge>
                  <p className="text-xs font-semibold text-foreground">Global Physical Operations</p>
                  <p className="text-[11px] text-muted-foreground">Staffed technical facilities across India and the United States</p>
                </div>
              </div>
            </div>

            {/* Office Directory Cards 2x2 Grid */}
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {offices.map((office) => (
                <Card key={office.city} className="flex flex-col justify-between border-border/80 bg-card shadow-sm">
                  <CardContent className="p-5 flex flex-col justify-between h-full">
                    <div>
                      <Badge variant="outline" className="mb-2.5 text-[10px] font-mono">
                        {office.badge}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-primary shrink-0" />
                        <h3 className="font-semibold text-foreground text-sm">
                          {office.city}
                        </h3>
                      </div>
                      <div className="mt-2.5 space-y-0.5 text-xs text-muted-foreground leading-relaxed">
                        {office.address.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2 text-xs font-mono text-foreground">
                      <Phone className="size-3.5 text-primary shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SipLink Assure — Operational Standards */}
      <section className="border-t border-border bg-muted/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
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

          {/* 6 Core Commitments Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {assureCommitments.map((stage) => {
              const Icon = stage.icon;
              return (
                <Card
                  key={stage.step}
                  className="flex flex-col justify-between border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs font-semibold text-muted-foreground">
                        {stage.step}
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                        {stage.phase}
                      </span>
                      <h3 className="mt-1 text-base font-semibold text-foreground">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-medium text-foreground">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{stage.guarantee}</span>
                  </div>
                </Card>
              );
            })}
          </div>
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
