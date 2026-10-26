import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Globe,
  Headset,
  HeartHandshake,
  Layers,
  MapPin,
  Network,
  Newspaper,
  Phone,
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
import { companyMissionVision } from "@/lib/company";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company Hub — SipLink Communications",
  description:
    "Explore SipLink Communications: our story, differentiators, verified certifications, partner integrations, careers, and global operating facilities.",
};

const companySections = [
  {
    title: "About SipLink",
    href: "/about",
    eyebrow: "Our Story & Foundations",
    badge: "Company Story",
    description:
      "Founded in 2012, our architectural principles protect uptime, simplify scalability, and provide direct access to real telecom engineers.",
    highlights: [
      "Founded in 2012",
      "SipLink Assure 6 Commitments",
      "Direct Telecom Engineers",
    ],
    icon: Building2,
  },
  {
    title: "Why SipLink",
    href: "/why-siplink",
    eyebrow: "Differentiators & Value",
    badge: "Why Us",
    description:
      "Seven foundational reasons why modern enterprises and growing teams select SipLink for their cloud voice and PBX infrastructure.",
    highlights: [
      "Carrier-Neutral POPs",
      "Sub-Second Automated Failover",
      "Zero Hardware Lock-In",
    ],
    icon: Sparkles,
  },
  {
    title: "Verified Certifications",
    href: "/company/certifications",
    eyebrow: "Security, Trust & Governance",
    badge: "Compliance",
    description:
      "Rigorous regulatory standards and security frameworks independently audited for carrier-grade trust and enterprise governance.",
    highlights: [
      "DoT Telecom License",
      "ISO/IEC 27001:2022 Certified",
      "SOC 2 Type 2, HIPAA & GDPR",
    ],
    icon: BadgeCheck,
  },
  {
    title: "Partner Ecosystem",
    href: "/company/partners",
    eyebrow: "Technology & Integrations",
    badge: "Ecosystem",
    description:
      "Pre-built CRM connectors, ATS synchronization, Microsoft 365 Direct Routing, and global tier-1 carrier interconnects.",
    highlights: [
      "Salesforce, Zoho & Zendesk",
      "MS Teams Direct Routing",
      "CEIPAL & JobDiva ATS Sync",
    ],
    icon: HeartHandshake,
  },
  {
    title: "Careers at SipLink",
    href: "/company/careers",
    eyebrow: "People & Opportunities",
    badge: "Careers",
    description:
      "Join our engineering, operations, and support teams building next-generation cloud telephony and voice networks.",
    highlights: [
      "Voice Engineering Roles",
      "Hybrid & Collaborative Work",
      "Direct Technical Ownership",
    ],
    icon: Briefcase,
  },
  {
    title: "News & Technical Insights",
    href: "/company/news",
    eyebrow: "Knowledge & Releases",
    badge: "Insights",
    description:
      "Practical technical guides, product announcements, VoIP migrations, and communications insights for enterprise leaders.",
    highlights: [
      "VoIP Migration Guides",
      "Network Architecture Updates",
      "SIP Trunking Optimization",
    ],
    icon: Newspaper,
  },
];

const companyProof = [
  { value: "2012", label: "Founded", detail: "Over a decade building business voice" },
  { value: "99.99%", label: "Availability SLA", detail: "Carrier-neutral POPs & failover" },
  { value: "4", label: "Global Facilities", detail: "Offices in India & the United States" },
  { value: "150+", label: "Countries Connected", detail: "Global carrier routes & PSTN peering" },
];

const officeLocations = [
  {
    city: "Bangalore",
    badge: "Primary Operating Office",
    address: "Cessna Business Park, Umiya Business Bay, Kadubeesanahalli",
    phone: "+91 82172 02075",
  },
  {
    city: "Chennai",
    badge: "Operations & Network Center",
    address: "Level 3, Anmol Palani, No. 88 G.N. Chetty Rd, T. Nagar",
    phone: "+91 44 48636371",
  },
  {
    city: "Hyderabad",
    badge: "Technical Engineering Hub",
    address: "2nd Floor, Jain Sadguru Images Capital Park, 206, Capital Pk Rd, Madhapur",
    phone: "+91 82172 02075",
  },
  {
    city: "Sheridan, Wyoming",
    badge: "US Corporate Entity",
    address: "SipLink Communications LLC, 30 N Gould St, Ste R",
    phone: "+1 916 226 6066",
  },
];

export default function CompanyHubPage() {
  return (
    <>
      {/* 1. Hero Section */}
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
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7">
              <Badge
                variant="secondary"
                className="mb-4 gap-1.5 px-3 py-1 font-mono text-xs tracking-wider uppercase"
              >
                <Building2 className="size-3.5 text-primary" />
                SipLink Company Hub
              </Badge>

              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Powering Better Business Communication
              </h1>

              <p className="mt-6 text-lg text-pretty text-muted-foreground sm:text-xl">
                {site.name} is an enterprise communications and cloud voice
                technology company helping organizations connect their people,
                customers, candidates, and partners seamlessly.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full shadow-md shadow-primary/20">
                  <Link href="/about">
                    Learn About SipLink
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/why-siplink">Why Choose SipLink</Link>
                </Button>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/company/company-hero.webp"
                    alt="SipLink team collaborating on business communications and cloud voice"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border/60 bg-background/90 p-3.5 backdrop-blur-md">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-2 relative">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                      </span>
                      <p className="font-mono text-xs font-semibold text-foreground uppercase">
                        SipLink Communications
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Powering teams, customers, candidates &amp; enterprise partners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proof Stat Strip */}
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {companyProof.map((stat) => (
              <div key={stat.label} className="bg-card p-6">
                <p className="font-heading text-3xl font-semibold tracking-tight text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Company Pages Directory ("Explore Every Dimension") */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Directory &amp; Overview
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Explore SipLink
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Explore our company pages to learn about our architectural
            differentiators, verified compliances, partner network, and team.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companySections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Card
                key={sec.title}
                className="group relative flex flex-col justify-between overflow-hidden border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {sec.badge}
                    </Badge>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] tracking-wider text-primary uppercase">
                      {sec.eyebrow}
                    </span>
                    <CardTitle className="mt-1 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {sec.title}
                    </CardTitle>
                  </div>

                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {sec.description}
                  </CardDescription>

                  {/* Highlights Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {sec.highlights.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                      >
                        <CheckCircle2 className="size-3 text-primary shrink-0" />
                        {item}
                      </span>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="border-t border-border/60 pt-4">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-between p-0 group-hover:text-primary"
                  >
                    <Link href={sec.href}>
                      <span className="font-semibold text-sm">View {sec.title}</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. Strategic Foundation: Mission, Vision & Pillars */}
      <section className="border-t border-border bg-muted/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Core Principles
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Our Mission, Vision &amp; Pillars
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Built on architectural principles that protect uptime, simplify scalability, and provide direct access to real telecom engineers.
            </p>
          </div>

          {/* Mission & Vision 2-Card Row */}
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-border/80 bg-card p-8 shadow-sm">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Rocket className="size-6" />
              </span>
              <span className="mt-4 block font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                Purpose
              </span>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {companyMissionVision.mission.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {companyMissionVision.mission.statement}
              </p>
            </Card>

            <Card className="border-border/80 bg-card p-8 shadow-sm">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Globe className="size-6" />
              </span>
              <span className="mt-4 block font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                Destination
              </span>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {companyMissionVision.vision.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {companyMissionVision.vision.statement}
              </p>
            </Card>
          </div>

          {/* 4 Pillars Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyMissionVision.pillars.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-6 shadow-xs"
              >
                <div>
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
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

      {/* 4. Global Operating Facilities */}
      <section className="border-t border-border py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Physical Presence
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Global Operating Offices
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Direct presence in major Indian technology hubs and Sheridan, Wyoming for US operations.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {officeLocations.map((office) => (
              <Card key={office.city} className="flex flex-col justify-between border-border/80 bg-card shadow-xs">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <Badge variant="outline" className="mb-3 text-[10px] font-mono">
                      {office.badge}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-primary shrink-0" />
                      <h3 className="font-semibold text-foreground text-sm">
                        {office.city}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {office.address}
                    </p>
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
      </section>

      {/* 5. Closing CTA */}
      <ClosingCta
        heading="Connect with our communications team"
        body="Experience how SipLink's carrier-grade voice network and dedicated 24/7 support can transform your business communication."
        action="Contact Our Offices"
        href="/contact"
        secondary={{ label: "View Pricing Plans", href: "/pricing" }}
      />
    </>
  );
}
