import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InternetServicePage } from "@/components/site/internet-service-page";
import { connectivityServices, getInternetService } from "@/lib/internet";

/**
 * The three connectivity services: business broadband, dedicated internet and
 * static IP. The six network services live one level deeper, under
 * /internet/network-solutions, and are handled by their own route.
 *
 * docs/INTERNET.md also proposes a third level (…/plans, …/features, …/sla and
 * so on). Those are sections of their parent rather than pages: each would be
 * a few hundred words on its own, which reads as thin content and splits the
 * argument a buyer needs to follow in one sitting. They are rendered as
 * anchored sections here instead, so the URLs in the brief still resolve —
 * /internet/business-broadband#plans rather than /internet/business-broadband/plans.
 */
export function generateStaticParams() {
  return connectivityServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/internet/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getInternetService(slug);

  if (!service || service.parent) return {};

  return {
    title: service.title,
    description: service.intro,
  };
}

export default async function InternetServiceRoute({
  params,
}: PageProps<"/internet/[slug]">) {
  const { slug } = await params;
  const service = getInternetService(slug);

  // A network service reached at this level is the wrong URL for it — the
  // canonical one is nested under /internet/network-solutions.
  if (!service || service.parent) notFound();

  return <InternetServicePage service={service} />;
}
