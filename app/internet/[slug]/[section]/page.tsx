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
import { PlansSizingVisual } from "@/components/site/plans-sizing-visual";
import {
  InternetInterlude,
  InternetOpeners,
  type InternetOpener,
} from "@/components/site/internet-openers";
import { PlanConcurrencyScene } from "@/components/site/scene-plans-concurrency";
import { PlanTwoOfficesScene } from "@/components/site/scene-plans-two-offices";
import { FeatureQueueScene } from "@/components/site/scene-features-queue";
import { FeatureOneCallScene } from "@/components/site/scene-features-onecall";
import { BenefitAgendaScene } from "@/components/site/scene-benefits-agenda";
import { BenefitOneBillScene } from "@/components/site/scene-benefits-onebill";
import {
  connectivityServices,
  getInternetSectionPage,
  getSectionPages,
} from "@/lib/internet";
import { PageSchema } from "@/components/site/json-ld";
import { seoFor, type SeoPath } from "@/lib/seo";
import { staticIpFaqs } from "@/lib/internet";

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
 * The pair of scenes that opens each page, between the hero and the copy:
 * the room the page is about, then the kit in it. Keyed as PRELUDES is.
 *
 * Built per request rather than held as a module constant, because these are
 * client components and a shared frozen array of elements is the kind of
 * thing that works right up until two routes render in one tick.
 */
const OPENERS: Record<string, () => InternetOpener[]> = {
  "business-broadband/plans": () => [
    {
      eyebrow: "Peak usage",
      heading: "Plans sized on real usage, not headcount",
      lede: "As the office fills up over twenty minutes, compare the headcount with the number of people actively using the connection. Some are reading, one is in a meeting, one is away from the desk. That gap is exactly what we size your plan around.",
      scene: (
        <PlanConcurrencyScene label="Nine people arriving at an office between 08:52 and 09:14, with a running count of how many are on the payroll against how many are actually moving traffic at the same moment." />
      ),
    },
  ],
  "business-broadband/features": () => [
    {
      eyebrow: "No queueing",
      heading: "Every application running at once, without waiting its turn",
      lede: "A client video call, the CRM loading, a card payment and a desk phone call, all in the same minute. On a consumer line they take turns. On a business line all four run smoothly side by side.",
      scene: (
        <FeatureQueueScene label="The same four jobs, a client video call, the CRM loading, a card payment and a desk phone call, running on a line that makes them queue beside a business line that carries all four at once." />
      ),
    },
    {
      eyebrow: "One support team",
      heading: "One team to trace every fault, end to end",
      lede: "A slow connection could be the Wi-Fi, the switch, the router or the circuit. Compare one operations team resolving it on a single ticket with four separate suppliers, each pointing at the others.",
      scene: (
        <FeatureOneCallScene label="A fault report being traced along the Wi-Fi, the switch, the router and the circuit by one operations team on one ticket, beside the same four boxes bought from four separate suppliers." />
      ),
    },
  ],
  "business-broadband/business-benefits": () => [
    {
      eyebrow: "Fewer disruptions",
      heading: "Connectivity issues drop off the meeting agenda",
      lede: "Across four weeks, see the standing internet item on a Monday agenda get raised, go quiet once the new line is in, and finally disappear altogether.",
      scene: (
        <BenefitAgendaScene label="A Monday meeting agenda across four weeks, with the standing internet item raised twice, going quiet in the third week after the new line goes in, and being removed altogether in the fourth." />
      ),
    },
    {
      eyebrow: "Simpler billing",
      heading: "One invoice in place of three supplier bills",
      lede: "Connectivity, voice and network equipment on a single invoice, itemised per location, with one support number behind it. It is a benefit your finance team will notice straight away.",
      scene: (
        <BenefitOneBillScene label="Three separate supplier invoices on their own cycles and formats, replaced by one document itemised per location for connectivity, voice and network kit, with a single support number behind it." />
      ),
    },
  ],
};

/**
 * A scene placed inside a page's body, between its points and its steps,
 * rather than above it. Keyed as PRELUDES is.
 */
const INTERLUDES: Record<string, () => InternetOpener> = {
  "business-broadband/plans": () => ({
    eyebrow: "Same size, different needs",
    heading: "Same team size, different connectivity needs",
    lede: "A design studio and a support desk, each with twelve people on one floor. One uploads large files all afternoon; the other moves little data but cannot tolerate a dropped call. Each needs a plan built for the way it works.",
    scene: (
      <PlanTwoOfficesScene label="Two offices of twelve people compared side by side: a design studio sending artwork and running client video reviews, and a support desk on calls all day with the CRM open, producing very different upload and download profiles." />
    ),
  }),
};

/**
 * Pages whose body leads with its list and centres its opening paragraphs.
 */
const LIST_FIRST = new Set(["business-broadband/plans"]);

/**
 * Hero illustrations that replace the shared diagram, keyed the same way.
 */
const VISUALS: Record<string, () => React.JSX.Element> = {
  "business-broadband/plans": PlansSizingVisual,
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

  return seoFor(`/internet/${slug}/${section}` as SeoPath);
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
  const Visual = VISUALS[key];
  const openers = OPENERS[key];
  const interlude = INTERLUDES[key];

  return (
    <>
      <PageSchema
        path={`/internet/${key}` as SeoPath}
        faqs={key === "static-ip/add-static-ip" ? staticIpFaqs : undefined}
      />
      <InternetSectionPage
        service={found.service}
        section={found.section}
        prelude={Prelude ? <Prelude /> : undefined}
        afterHero={openers ? <InternetOpeners scenes={openers()} /> : undefined}
        extra={Extra ? <Extra /> : undefined}
        visual={Visual ? <Visual /> : undefined}
        interlude={interlude ? <InternetInterlude opener={interlude()} /> : undefined}
        listFirst={LIST_FIRST.has(key)}
        centerBody={LIST_FIRST.has(key)}
        railInBody={LIST_FIRST.has(key)}
      />
    </>
  );
}
