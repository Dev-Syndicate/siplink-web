import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Building2,
  CheckCircle2,
  Clock,
  Cloud,
  Cpu,
  HeartPulse,
  Newspaper,
  PhoneCall,
  Puzzle,
  Radio,
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
import { verifiedInsights } from "@/lib/company";
import { announcement, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "News & Insights — What's Happening at SipLink",
  description:
    "Explore business communication insights, cloud telephony trends, VoIP best practices, regulatory compliance updates, and company developments from SipLink.",
};

const topicAreas = [
  {
    title: "Cloud Communications",
    description: "How cloud PBX and hosted VoIP are replacing legacy on-premise telecom hardware.",
    icon: Cloud,
  },
  {
    title: "Business Voice & SIP",
    description: "Practical engineering insights into direct IP routes, SIP trunking, and call QoS.",
    icon: PhoneCall,
  },
  {
    title: "AI & Innovation",
    description: "Discover how voice AI assistants, automated speech routing, and analytics transform workflows.",
    icon: Bot,
  },
  {
    title: "Telecom Compliance",
    description: "Navigating DoT regulations, ISO/IEC 27001 data protection, HIPAA, and GDPR standards.",
    icon: Building2,
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

      {/* Core Topic Themes */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topicAreas.map((topic) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.title}
                className="rounded-xl border border-border/80 bg-card p-6 shadow-sm transition-colors hover:border-primary/40"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">
                  {topic.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {topic.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Verified Knowledge Insights Articles */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Curated Knowledge Guides
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Strategic Communications Insights
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Clear, verified articles covering modern cloud telephony, regulatory
            protocols, CRM integrations, and voice automation.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {verifiedInsights.map((article) => {
            const Icon = article.icon;
            return (
              <Card
                key={article.slug}
                className="flex flex-col justify-between border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {article.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="size-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <CardTitle className="text-lg font-semibold leading-snug">
                      {article.title}
                    </CardTitle>
                  </div>

                  <CardDescription className="pt-2 text-sm leading-relaxed text-pretty">
                    {article.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 border-t border-border/60 pt-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold tracking-wider text-foreground uppercase">
                      Key Takeaways:
                    </span>
                    {article.keyPoints.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-3 text-primary shrink-0" />
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
