import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InternetSectionPage } from "@/components/site/internet-section-page";
import {
  connectivityServices,
  getInternetSectionPage,
  getSectionPages,
} from "@/lib/internet";

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

  return (
    <InternetSectionPage service={found.service} section={found.section} />
  );
}
