import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Cloud,
  Headset,
  Newspaper,
  PhoneCall,
  Radio,
} from "lucide-react";

import { ClosingCta } from "@/components/site/closing-cta";
import { TopicRouter, type RouterTopic } from "@/components/site/topic-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { announcement, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "News & Insights — What's Happening at SipLink",
  description:
    "Explore business communication insights, cloud telephony trends, VoIP best practices, regulatory compliance updates, and company developments from SipLink.",
};

/**
 * Rather than claiming a blog archive that does not exist yet, this routes
 * each topic to the real SipLink pages that already cover it in depth — the
 * product catalogue, the solutions pages, the industry pages, and the
 * certifications page.
 */
const topics: RouterTopic[] = [
  {
    title: "Products & Platform",
    description:
      "The full communications product catalogue: Hosted PBX, SIP Trunking, Cloud VoIP, Call Center Solutions, UCaaS, DID and toll-free numbers, IVR, call recording, and call analytics.",
    href: "/products",
    linkLabel: "Browse products",
    icon: PhoneCall,
  },
  {
    title: "Solutions by Use Case",
    description:
      "How SipLink supports remote workforces, customer support teams, sales organizations, and multi-branch businesses.",
    href: "/solutions",
    linkLabel: "View solutions",
    icon: Cloud,
  },
  {
    title: "Industry Guides",
    description:
      "Positioning and capabilities for healthcare & RCM, financial services, IT & technology, education, staffing & recruiting, and government.",
    href: "/industries",
    linkLabel: "Explore industries",
    icon: Building2,
  },
  {
    title: "Certifications & Compliance",
    description:
      "Where SipLink stands on DoT licensing, ISO/IEC 27001, SOC 2, HIPAA, and GDPR — with the detail behind each.",
    href: "/company/certifications",
    linkLabel: "Review compliance",
    icon: BadgeCheck,
  },
];

export default function NewsPage() {
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
              <Newspaper className="size-3.5 text-primary" />
              SipLink News & Insights
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              What&apos;s Happening at SipLink
            </h1>

            <p className="mt-6 text-lg text-pretty text-muted-foreground sm:text-xl">
              Stay up to date with {site.name}, cloud telephony trends, telecom
              compliance insights, and practical strategies designed to help your
              organization communicate smarter and scale without limits.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="border-border bg-card">
                Cloud Telephony
              </Badge>
              <Badge variant="outline" className="border-border bg-card">
                SIP Trunking
              </Badge>
              <Badge variant="outline" className="border-border bg-card">
                AI Voice Automation
              </Badge>
              <Badge variant="outline" className="border-border bg-card">
                Compliance & Security
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Company Announcement */}
      <section className="border-b border-border bg-muted/40 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-background/90 p-5 shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Radio className="size-4 animate-pulse" />
              </span>
              <div>
                <span className="inline-block font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                  Latest Update
                </span>
                <p className="text-sm font-medium text-foreground">
                  {announcement.message}
                </p>
              </div>
            </div>
            <Button asChild size="sm" variant="outline" className="shrink-0">
              <Link href={announcement.href}>
                {announcement.linkLabel}
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* One hub, four spokes: every topic above resolves to a real page,
          drawn as the route it actually takes rather than claimed as a
          blog archive that does not exist yet. */}
      <section className="border-t border-border bg-muted/30 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Where to Go Deeper
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Every topic, routed to the real page
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Our in-depth technical and compliance detail lives on the
              product, solution, industry, and certifications pages — not a
              separate blog archive.
            </p>
          </div>

          <div className="mt-14">
            <TopicRouter topics={topics} />
          </div>
        </div>
      </section>

      {/* Direct line for anything not yet published as a standalone guide */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border/80 bg-card p-8 sm:flex-row sm:items-center lg:p-10">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Headset className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Looking for a specific guide or case study?
              </h3>
              <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                Our dedicated knowledge base and customer case studies are in
                development. In the meantime, our team can answer technical
                and compliance questions directly.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/contact">
              Ask our team
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Closing CTA */}
      <ClosingCta
        heading="Connect with our communications specialists"
        body="Have questions about cloud telephony, regulatory compliance, or PBX migrations? Our engineering team is here to assist."
        action="Talk to an Specialist"
        href="/contact"
        secondary={{ label: "Explore Products", href: "/products" }}
      />
    </>
  );
}
