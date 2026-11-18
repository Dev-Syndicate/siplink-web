import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { privacyLegalName } from "@/lib/privacy-policy";
import { site } from "@/lib/site";
import { termsSections } from "@/lib/terms";
import { PageSchema } from "@/components/site/json-ld";
import { PolicySections } from "@/components/site/policy-sections";
import { seoFor } from "@/lib/seo";

export const metadata: Metadata = seoFor("/terms");

export default function TermsPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <PageSchema path="/terms" />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-border pb-8">
          <Badge
            variant="secondary"
            className="mb-3 gap-1.5 px-3 py-1 font-mono text-xs tracking-wider uppercase"
          >
            <FileText className="size-3.5 text-primary" />
            Legal
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last Updated: November 2026 · {privacyLegalName}
          </p>
        </div>

        {/* Content Body: the terms text lives in lib/terms.ts. */}
        <div className="mt-10 max-w-none space-y-10 text-sm leading-relaxed text-muted-foreground">
          <PolicySections sections={termsSections} />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">30. Contact Information</h2>
            <p>
              For questions regarding these Terms, our Services or account-related
              matters, contact:
            </p>
            <div className="rounded-xl border border-border bg-muted/40 p-5">
              <p className="font-semibold text-foreground">{privacyLegalName}</p>
              <p className="mt-2">Registered/business address:</p>
              <p>
                1st Floor, No. 88, Anmol Palani Complex,
                <br />
                Gopathy Narayana Road, T. Nagar,
                <br />
                Chennai, Tamil Nadu 600017, India.
              </p>
              <p className="mt-2">
                General Email:{" "}
                <a href={`mailto:${site.email}`} className="text-primary hover:underline">
                  {site.email}
                </a>
              </p>
              <p>
                SIPLINK-UC Support:{" "}
                <a href="mailto:ucpbx@siplink.in" className="text-primary hover:underline">
                  ucpbx@siplink.in
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                  {site.phone}
                </a>
              </p>
              <p>
                Website:{" "}
                <a href={site.url} className="text-primary hover:underline">
                  {site.url}
                </a>
              </p>
            </div>
            <p className="pt-2 font-medium text-foreground">End of Terms and Conditions</p>
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
