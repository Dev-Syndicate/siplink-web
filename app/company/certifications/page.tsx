import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  FileCheck,
  HeartPulse,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { ClosingCta } from "@/components/site/closing-cta";
import { CompliancePath } from "@/components/site/compliance-path";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifiedCertifications } from "@/lib/company";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Certifications & Compliance — Built on Trust | SipLink",
  description:
    "Explore SipLink's verified regulatory certifications and compliance standards including DoT, ISO/IEC 27001:2022, SOC 2 Type 2, HIPAA, and GDPR.",
};

const securityPrinciples = [
  {
    title: "End-to-End Encryption",
    description:
      "Voice signaling and audio media streams are protected with TLS and SRTP protocols, preventing interception across transit paths.",
    icon: Lock,
  },
  {
    title: "Granular Access Governance",
    description:
      "Strict role-based access control (RBAC), multi-factor authentication (MFA), and detailed audit logs across administrative actions.",
    icon: ShieldCheck,
  },
  {
    title: "Regulated Healthcare Safeguards",
    description:
      "Configurable recording management, data retention policies, and administrative safeguards designed for Protected Health Information (PHI).",
    icon: HeartPulse,
  },
  {
    title: "Independent Auditing & Verification",
    description:
      "Continuous internal reviews and independent third-party evaluations confirming operational integrity and security controls.",
    icon: FileCheck,
  },
];

export default function CertificationsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-muted/20 to-background py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/3 size-[540px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 left-1/4 size-[400px] rounded-full bg-brand-from/10 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 gap-1.5 px-3 py-1 font-mono text-xs tracking-wider uppercase"
            >
              <BadgeCheck className="size-3.5 text-primary" />
              Verified Trust & Governance
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Built on Trust. Designed for Business.
            </h1>

            <p className="mt-6 text-lg text-pretty text-muted-foreground sm:text-xl">
              Business communication requires more than reliable technology — it
              demands complete trust. {site.name} is dedicated to maintaining
              uncompromising standards across security, infrastructure, privacy,
              reliability, and regulatory practices.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="border-border bg-card px-3 py-1 text-xs">
                DoT Licensing
              </Badge>
              <Badge variant="outline" className="border-border bg-card px-3 py-1 text-xs">
                ISO/IEC 27001:2022 ISMS
              </Badge>
              <Badge variant="outline" className="border-border bg-card px-3 py-1 text-xs">
                SOC 2 Type 2 AICPA
              </Badge>
              <Badge variant="outline" className="border-border bg-card px-3 py-1 text-xs">
                HIPAA Aligned
              </Badge>
              <Badge variant="outline" className="border-border bg-card px-3 py-1 text-xs">
                GDPR Aligned
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Every call, under five frameworks — drawn as the path it actually
          takes rather than five unrelated badges. */}
      <section className="border-b border-border bg-muted/20 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              One Call, Five Checkpoints
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Every call answers to all five
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              DoT governs the network the call travels on; ISO 27001 and
              SOC 2 govern how the data behind it is handled; HIPAA and GDPR
              govern who is allowed to see it afterward. Select any mark to
              jump to the detail.
            </p>
          </div>

          <div className="mt-14">
            <CompliancePath />
          </div>
        </div>
      </section>

      {/* Verified Certifications Showcase */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Official Compliances
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Our Certifications & Regulatory Standards
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Review our verified certifications, compliance standards, and
            technology credentials spanning telecom licensing, data security,
            healthcare privacy, and international data protection.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {verifiedCertifications.map((cert, index) => {
            const isReversed = index % 2 === 1;

            return (
              <Card
                key={cert.id}
                id={cert.id}
                  className="scroll-mt-28 overflow-hidden border-border/80 bg-card/60 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                >
                  <div
                    className={`grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 ${
                      isReversed ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    {/* Badge Image Box */}
                    <div
                      className={`flex flex-col items-center justify-center lg:col-span-4 ${
                        isReversed ? "lg:col-start-9" : ""
                      }`}
                    >
                      <div className="relative flex aspect-square w-48 items-center justify-center rounded-2xl border border-border/80 bg-background/95 p-6 shadow-sm sm:w-56">
                        <Image
                          src={cert.image}
                          alt={`${cert.name} certification badge`}
                          width={220}
                          height={220}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <Badge variant="secondary" className="font-mono text-xs">
                          {cert.authority}
                        </Badge>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Jurisdiction: {cert.jurisdiction}
                        </div>
                      </div>
                    </div>

                    {/* Content Box */}
                    <div
                      className={`space-y-4 lg:col-span-8 ${
                        isReversed ? "lg:col-start-1" : ""
                      }`}
                    >
                      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {cert.name}
                      </h3>

                    <p className="text-base font-medium text-foreground/90">
                      {cert.summary}
                    </p>

                    <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                      {cert.description}
                    </p>

                    <div className="border-t border-border/60 pt-4">
                      <div className="text-xs font-semibold tracking-wider text-foreground uppercase">
                        Key Controls & Assurances:
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {cert.keyControls.map((control) => (
                          <div
                            key={control}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                            <span>{control}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Security Architecture & Governance */}
      <section className="border-t border-border bg-muted/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Security Architecture
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Defense-in-depth across our communication stack
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              We apply comprehensive security and operational measures to
              guarantee the confidentiality, integrity, and availability of
              every conversation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {securityPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <Card key={principle.title} className="border-border/80 bg-card">
                  <CardHeader>
                    <span className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      {principle.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-pretty">
                      {principle.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Compliance FAQ Note */}
          <div className="mt-16 rounded-2xl border border-border/80 bg-card p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <h3 className="text-xl font-semibold tracking-tight">
                  Have specific enterprise compliance or security audit requirements?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Our compliance and engineering teams assist enterprise and
                  healthcare customers with vendor risk assessments, data protection
                  agreements, and technical walkthroughs of our security controls.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                <Button asChild>
                  <Link href="/contact">
                    Talk with our compliance team
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
        heading="Partner with a verified and compliant communications provider"
        body="Protect your business voice, customer records, and regulatory standing with enterprise infrastructure built for trust."
        action="Request Compliance Details"
        href="/contact"
        secondary={{ label: "Why Choose SipLink", href: "/why-siplink" }}
      />
    </>
  );
}
