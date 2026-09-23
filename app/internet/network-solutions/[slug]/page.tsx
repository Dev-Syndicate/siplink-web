import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InternetServicePage } from "@/components/site/internet-service-page";
import { getInternetService, networkServices } from "@/lib/internet";

/** The six services under Network Solutions. */
export function generateStaticParams() {
  return networkServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/internet/network-solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getInternetService(slug);

  if (!service || !service.parent) return {};

  return {
    title: service.title,
    description: service.intro,
  };
}

export default async function NetworkServiceRoute({
  params,
}: PageProps<"/internet/network-solutions/[slug]">) {
  const { slug } = await params;
  const service = getInternetService(slug);

  // Only the six network services belong at this depth; a connectivity slug
  // reached here is the wrong URL for it.
  if (!service || !service.parent) notFound();

  return <InternetServicePage service={service} />;
}
