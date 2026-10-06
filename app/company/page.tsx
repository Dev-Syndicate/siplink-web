import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Globe,
  HeartHandshake,
  Mail,
  Newspaper,
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
  title: "Company — About SipLink Communications",
  description:
    "Learn about SipLink Communications: our mission, vision, verified certifications, partner ecosystem, career opportunities, and why businesses trust us.",
};

const companySections = [
  {
    title: "About SipLink",
    href: "/about",
    description:
      "Our story, founding history, mission, vision, and core architectural commitments to reliable business communications.",
    icon: Building2,
    badge: "Company Story",
  },
  {
    title: "Why SipLink",
    href: "/why-siplink",
    description:
      "Seven compelling reasons why modern enterprises and growing teams select SipLink for their cloud voice and PBX infrastructure.",
    icon: Sparkles,
    badge: "Differentiators",
  },
  {
    title: "Certifications & Compliance",
    href: "/company/certifications",
    description:
      "Verified regulatory standards and security frameworks including DoT, ISO/IEC 27001:2022, SOC 2 Type 2, HIPAA, and GDPR.",
    icon: BadgeCheck,
    badge: "Security & Trust",
  },
  {
    title: "Partner Ecosystem",
    href: "/company/partners",
    description:
      "Technology and solution integrations with Salesforce, Microsoft 365, Google Workspace, CEIPAL, Zoho, Zendesk, and carriers.",
    icon: HeartHandshake,
    badge: "Integrations",
  },
  {
    title: "Careers",
    href: "/company/careers",
    description:
      "Join our engineering, operations, and support teams building next-generation cloud telephony and voice networks.",
    icon: Briefcase,
    badge: "Opportunities",
  },
  {
    title: "News & Insights",
    href: "/company/news",
    description:
      "Practical technical guides, product announcements, and communications insights for business leaders and telecom teams.",
    icon: Newspaper,
    badge: "Insights",
  },
];

export default function CompanyHubPage() {
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
              <Building2 className="size-3.5 text-primary" />
              SipLink Communications
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Powering Better Business Communication
            </h1>

            <p className="mt-6 text-lg text-pretty text-muted-foreground sm:text-xl">
              {site.name} is a modern business communications and cloud voice
              technology company helping organizations connect their people,
              customers, candidates, and partners seamlessly.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full shadow-md shadow-primary/20">
                <Link href="/about">
                  Learn About Our History
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/why-siplink">Why Choose SipLink</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="border-b border-border bg-muted/30 py-16 lg:py-20">
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
        </div>
      </section>

      {/* Company Pages Directory */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Navigation
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Explore SipLink
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Browse our company pages to learn about our architectural
            differentiators, verified compliances, partner network, and team.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companySections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Card
                key={sec.title}
                className="group flex flex-col justify-between border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {sec.badge}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl font-semibold">
                    {sec.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-pretty">
                    {sec.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="border-t border-border/60 pt-4">
                  <Button asChild variant="ghost" className="w-full justify-between p-0 group-hover:text-primary">
                    <Link href={sec.href}>
                      <span>Explore {sec.title}</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
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
