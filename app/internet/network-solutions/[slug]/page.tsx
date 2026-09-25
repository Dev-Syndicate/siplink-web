import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InternetServicePage } from "@/components/site/internet-service-page";
import {
  BusinessWifiHero,
  BusinessWifiSections,
} from "@/components/site/page-business-wifi";
import {
  LanSwitchingHero,
  LanSwitchingSections,
} from "@/components/site/page-lan-switching";
import {
  ManagedRouterFirewallHero,
  ManagedRouterFirewallSections,
} from "@/components/site/page-managed-router-firewall";
import {
  MultiLocationHero,
  MultiLocationSections,
} from "@/components/site/page-multi-location";
import { SdWanHero, SdWanSections } from "@/components/site/page-sd-wan";
import { VpnHero, VpnSections } from "@/components/site/page-vpn";
import { getInternetService, networkServices } from "@/lib/internet";

/**
 * Bespoke opening bands and extra sections, by service slug. A page listed
 * here renders its band above the shared hero and hands it the `h1`.
 */
const PRELUDES: Record<string, () => React.JSX.Element> = {
  "managed-router-firewall": ManagedRouterFirewallHero,
  "business-wifi": BusinessWifiHero,
  "lan-switching": LanSwitchingHero,
  vpn: VpnHero,
  "sd-wan": SdWanHero,
  "multi-location-networking": MultiLocationHero,
};

const EXTRAS: Record<string, () => React.JSX.Element> = {
  "managed-router-firewall": ManagedRouterFirewallSections,
  "business-wifi": BusinessWifiSections,
  "lan-switching": LanSwitchingSections,
  vpn: VpnSections,
  "sd-wan": SdWanSections,
  "multi-location-networking": MultiLocationSections,
};

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

  const Prelude = PRELUDES[slug];
  const Extra = EXTRAS[slug];

  return (
    <InternetServicePage
      service={service}
      prelude={Prelude ? <Prelude /> : undefined}
      extra={Extra ? <Extra /> : undefined}
    />
  );
}
