import type { Metadata } from "next";

import { CapabilityPath } from "@/components/site/capability-path";
import { ClosingCta } from "@/components/site/closing-cta";
import { WhySipLinkHero } from "@/components/site/why-siplink-hero";
import {
  DifferentiatorExplorer,
  InfrastructureBand,
} from "@/components/site/why-siplink-sections";
import { reliability, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why SipLink — Built for Reliable Business Communication",
  description:
    "Discover why growing businesses and enterprises choose SipLink for business voice, cloud PBX, SIP trunking, and unified communications.",
};

export default function WhySipLinkPage() {
  return (
    <>
      <WhySipLinkHero name={site.name} />

      {/* How a call actually moves through the platform — the real order
          from the feature catalogue, not a decorative sequence. */}
      <section className="border-b border-border bg-muted/20 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Under the Hood
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              What happens when a call comes in
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              One connected path, not five separate products you have to wire
              together yourself.
            </p>
          </div>

          <div className="mt-14">
            <CapabilityPath />
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <DifferentiatorExplorer />

      {/* Network Infrastructure */}
      <InfrastructureBand
        reliability={reliability.map(({ title, description }) => ({ title, description }))}
      />

      {/* Closing CTA */}
      <ClosingCta
        heading="Experience the difference of carrier-grade cloud voice"
        body="Schedule a consultation with our voice specialists to explore plan sizing, PBX features, and zero-downtime number porting."
        action="Schedule a Consultation"
        href="/contact"
        secondary={{ label: "View Pricing Plans", href: "/pricing" }}
      />
    </>
  );
}
