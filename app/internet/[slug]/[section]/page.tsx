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
const OPENERS: Record<string, () => [InternetOpener, InternetOpener]> = {
  "business-broadband/plans": () => [
    {
      eyebrow: "Nine people, one line",
      heading: "The number a plan is sized from is not the headcount",
      lede: "Watch the floor arrive over twenty minutes, and watch the second number climb behind the first. Two are reading, one is in a meeting, one is away from the desk — and the gap between the two figures is the whole of this page.",
      scene: (
        <PlanConcurrencyScene label="Nine people arriving at an office between 08:52 and 09:14, with a running count of how many are on the payroll against how many are actually moving traffic at the same moment." />
      ),
    },
    {
      eyebrow: "Same twelve people",
      heading: "Two offices the same size, two different answers",
      lede: "A design studio and a support desk, both twelve people on one floor. One sends almost everything outward all afternoon; the other barely moves any traffic at all and cannot tolerate a stutter in it. The plan is not the same plan.",
      scene: (
        <PlanTwoOfficesScene label="Two offices of twelve people compared side by side: a design studio sending artwork and running client video reviews, and a support desk on calls all day with the CRM open, producing very different upload and download profiles." />
      ),
    },
  ],
  "business-broadband/features": () => [
    {
      eyebrow: "The same minute, twice",
      heading: "What “it does not queue” actually looks like",
      lede: "A client on video, the CRM loading, a card payment and a call on the desk phone — all in the same minute. On the left they take turns. On the right nothing happens at all, which is the product.",
      scene: (
        <FeatureQueueScene label="The same four jobs — a client video call, the CRM loading, a card payment and a desk phone call — running on a line that makes them queue beside a business line that carries all four at once." />
      ),
    },
    {
      eyebrow: "“It is slow”",
      heading: "Four boxes, and who gets to argue about which one",
      lede: "The complaint never says which part. Follow the search along the chain — the Wi-Fi, the switch, the router, the circuit — and count the phone numbers involved in each half of the picture.",
      scene: (
        <FeatureOneCallScene label="A fault report being traced along the Wi-Fi, the switch, the router and the circuit by one operations team on one ticket, beside the same four boxes bought from four separate suppliers." />
      ),
    },
  ],
  "business-broadband/business-benefits": () => [
    {
      eyebrow: "Four Mondays",
      heading: "The week it stopped being an agenda item",
      lede: "Every benefit on this page is an absence, which is a hard thing to draw. So here is the smallest artefact of one: a standing item on a meeting agenda, and the week somebody quietly stops typing it.",
      scene: (
        <BenefitAgendaScene label="A Monday meeting agenda across four weeks, with the standing internet item raised twice, going quiet in the third week after the new line goes in, and being removed altogether in the fourth." />
      ),
    },
    {
      eyebrow: "Month end",
      heading: "Three invoices that never quite reconcile",
      lede: "The finance lead never touches the network and still has a view. Theirs is the only benefit on this page that is administrative rather than technical — and the only one visible from a desk with a spreadsheet on it.",
      scene: (
        <BenefitOneBillScene label="Three separate supplier invoices on their own cycles and formats, replaced by one document itemised per location for connectivity, voice and network kit, with a single support number behind it." />
      ),
    },
  ],
};

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
  const Visual = VISUALS[key];
  const openers = OPENERS[key];

  return (
    <InternetSectionPage
      service={found.service}
      section={found.section}
      prelude={Prelude ? <Prelude /> : undefined}
      afterHero={openers ? <InternetOpeners scenes={openers()} /> : undefined}
      extra={Extra ? <Extra /> : undefined}
      visual={Visual ? <Visual /> : undefined}
    />
  );
}
