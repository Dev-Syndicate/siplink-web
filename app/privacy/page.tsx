import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  FileText,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — SipLink Communications",
  description:
    "Learn how SipLink Communications collects, protects, and handles customer data in compliance with telecom regulations and international data protection standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-border pb-8">
          <Badge
            variant="secondary"
            className="mb-3 gap-1.5 px-3 py-1 font-mono text-xs tracking-wider uppercase"
          >
            <ShieldCheck className="size-3.5 text-primary" />
            Data Protection & Privacy
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last Updated: January 2026 · {site.legalName}
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              1. Overview & Commitment
            </h2>
            <p>
              {site.legalName} (&quot;SipLink&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed
              to safeguarding the privacy, confidentiality, and security of
              personal and business communication data. This Privacy Policy
              describes how we collect, store, utilize, and protect your
              information when you utilize our website, cloud telephony platform,
              hosted PBX, SIP trunking services, and mobile applications.
            </p>
            <p>
              Our practices are designed to align with applicable telecom licensing
              regulations from the Department of Telecommunications (DoT),
              Government of India, as well as internationally recognized data
              protection standards including ISO/IEC 27001:2022, SOC 2 Type 2,
              HIPAA privacy principles, and the General Data Protection Regulation
              (GDPR).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              2. Information We Collect
            </h2>
            <p>
              To provide carrier-grade communications and comply with statutory
              telecom requirements, we collect the following categories of data:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-foreground">Account & Contact Information:</strong>{" "}
                Name, corporate email address, business telephone number, company
                entity details, billing address, and authorized user credentials.
              </li>
              <li>
                <strong className="text-foreground">Call Detail Records (CDRs):</strong>{" "}
                Originating and terminating phone numbers, IP addresses, call
                timestamps, call duration, packet quality indicators, and routing
                paths necessary for service delivery, billing, and regulatory
                compliance.
              </li>
              <li>
                <strong className="text-foreground">Customer Content:</strong>{" "}
                Voicemails, business SMS messages, and call audio recordings
                generated when enabled by customer administrators. Recordings are
                stored securely in accordance with client-configured retention
                rules.
              </li>
              <li>
                <strong className="text-foreground">Technical & Usage Data:</strong>{" "}
                SIP user-agent headers, device network parameters, browser type,
                and application performance metrics gathered to ensure quality of
                service (QoS).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              3. How We Use Information
            </h2>
            <p>Information collected is used strictly for legitimate business and operational purposes:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Provisioning, routing, and maintaining voice and messaging services.</li>
              <li>Accurate billing, account invoicing, and dispute management.</li>
              <li>Detecting, preventing, and mitigating fraudulent, unauthorized, or abusive network traffic.</li>
              <li>Providing 24/7 technical customer support and operational diagnostics.</li>
              <li>Complying with statutory telecom retention mandates stipulated by the Department of Telecommunications (DoT).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              4. Data Protection & Security Controls
            </h2>
            <p>
              We implement defense-in-depth security measures aligned with
              ISO/IEC 27001:2022 and SOC 2 Type 2 controls:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Transport Layer Security (TLS) and Secure Real-time Transport Protocol (SRTP) encryption for voice signaling and media.</li>
              <li>Restricted, role-based administrative access governed by multi-factor authentication (MFA).</li>
              <li>Segregated database tenancy and encrypted storage for call records and customer files.</li>
              <li>24/7 proactive security monitoring, perimeter firewalls, and regular vulnerability audits.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              5. Healthcare & HIPAA Alignment
            </h2>
            <p>
              For healthcare providers and medical billing organizations handling
              Protected Health Information (PHI) in the United States, SipLink
              implements configurable security controls including user access
              governance, selective recording controls, and administrative audit
              logging to assist customers in maintaining HIPAA compliance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              6. GDPR & International Privacy Rights
            </h2>
            <p>
              In accordance with GDPR principles for European Union and EEA users,
              data subjects retain rights including the right of access,
              rectification, restriction of processing, and erasure (subject to
              mandatory statutory telecom record retention obligations). Requests
              may be submitted directly to our compliance team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              7. Contact & Privacy Inquiries
            </h2>
            <p>
              If you have any questions or wish to exercise your privacy rights,
              please reach out to our team:
            </p>
            <div className="rounded-xl border border-border bg-muted/40 p-5">
              <p className="font-semibold text-foreground">{site.legalName}</p>
              <p className="mt-1">
                Email:{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-primary hover:underline"
                >
                  {site.email}
                </a>
              </p>
              <p>Phone: {site.phone}</p>
              <p className="mt-1">
                Operating Offices: Chennai, Bangalore, and Hyderabad, India
              </p>
            </div>
          </section>
        </div>

        {/* Back to company */}
        <div className="mt-12 border-t border-border pt-8">
          <Button asChild variant="outline">
            <Link href="/company">
              Return to Company Overview
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
