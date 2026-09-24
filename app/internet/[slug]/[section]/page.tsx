import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InternetSectionPage } from "@/components/site/internet-section-page";
import { BenefitsHero } from "@/components/site/benefits-hero";
import {
  DedicatedBandwidthHero,
  DedicatedBandwidthSections,
} from "@/components/site/page-dedicated-bandwidth";
import {
  EnterpriseConnectivityHero,
  EnterpriseConnectivitySections,
} from "@/components/site/page-enterprise-connectivity";
import {
  AddStaticIpHero,
  AddStaticIpSections,
} from "@/components/site/page-add-static-ip";
import {
  BusinessUsesHero,
  BusinessUsesSections,
} from "@/components/site/page-business-uses";
import { SlaHero, SlaSections } from "@/components/site/page-sla";
import {
  WhatIsStaticIpHero,
  WhatIsStaticIpSections,
} from "@/components/site/page-what-is-static-ip";
import {
  SymmetricalSpeedsHero,
  SymmetricalSpeedsSections,
} from "@/components/site/page-symmetrical-speeds";
import { BenefitsSections } from "@/components/site/benefits-sections";
import { FeaturesHero } from "@/components/site/features-hero";
import { FeaturesSections } from "@/components/site/features-sections";
import { PlansHero } from "@/components/site/plans-hero";
import { PlansSections } from "@/components/site/plans-sections";
import {
  connectivityServices,
  getInternetSectionPage,
  getSectionPages,
} from "@/lib/internet";

/**
 * Bespoke opening bands, by `<service>/<section>`. A page listed here renders
 * its band above the standard hero and hands it the `h1`; everything else
 * opens on the shared hero, which is still the right answer for most of them.
 */
const PRELUDES: Record<string, () => React.JSX.Element> = {
  "business-broadband/plans": PlansHero,
  "business-broadband/features": FeaturesHero,
  "business-broadband/business-benefits": BenefitsHero,
  "dedicated-internet/dedicated-bandwidth": DedicatedBandwidthHero,
  "dedicated-internet/symmetrical-speeds": SymmetricalSpeedsHero,
  "dedicated-internet/sla": SlaHero,
  "dedicated-internet/enterprise-connectivity": EnterpriseConnectivityHero,
  "static-ip/what-is-static-ip": WhatIsStaticIpHero,
  "static-ip/business-uses": BusinessUsesHero,
  "static-ip/add-static-ip": AddStaticIpHero,
};

/**
 * Extra sections for pages whose own content does not carry them alone,
 * rendered after the body. Same keying as PRELUDES.
 */
const EXTRAS: Record<string, () => React.JSX.Element> = {
  "business-broadband/plans": PlansSections,
  "business-broadband/features": FeaturesSections,
  "business-broadband/business-benefits": BenefitsSections,
  "dedicated-internet/dedicated-bandwidth": DedicatedBandwidthSections,
  "dedicated-internet/symmetrical-speeds": SymmetricalSpeedsSections,
  "dedicated-internet/sla": SlaSections,
  "dedicated-internet/enterprise-connectivity": EnterpriseConnectivitySections,
  "static-ip/what-is-static-ip": WhatIsStaticIpSections,
  "static-ip/business-uses": BusinessUsesSections,
  "static-ip/add-static-ip": AddStaticIpSections,
};

/**
 * The third level of the internet tree — every section of a connectivity
 * service as its own page, which is the URL structure docs/INTERNET.md asks
 * for: /internet/business-broadband/plans and so on.
 *
 * Only the three connectivity services reach here. The six network services
 * are matched first by the static /internet/network-solutions segment, and
 * their own sections stay inline on their pages.
 */
export function generateStaticParams() {
  return connectivityServices.flatMap((service) =>
    getSectionPages(service).map(({ slug }) => ({
      slug: service.slug,
      section: slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/internet/[slug]/[section]">): Promise<Metadata> {
  const { slug, section } = await params;
  const found = getInternetSectionPage(slug, section);

  if (!found) return {};

  return {
    // Titled against the parent, so a search result reads
    // "Plans — Business Broadband" rather than a bare "Plans".
    title: `${found.section.title} — ${found.service.title}`,
    description: found.section.intro,
  };
}

export default async function InternetSectionRoute({
  params,
}: PageProps<"/internet/[slug]/[section]">) {
  const { slug, section } = await params;
  const found = getInternetSectionPage(slug, section);

  if (!found) notFound();

  const key = `${slug}/${section}`;
  const Prelude = PRELUDES[key];
  const Extra = EXTRAS[key];

  return (
    <InternetSectionPage
      service={found.service}
      section={found.section}
      prelude={Prelude ? <Prelude /> : undefined}
      extra={Extra ? <Extra /> : undefined}
    />
  );
}
