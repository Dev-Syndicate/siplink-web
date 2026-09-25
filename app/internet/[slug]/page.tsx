import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BroadbandFloorScene } from "@/components/site/scene-bb-floor";
import { BroadbandKitScene } from "@/components/site/scene-bb-kit";
import { InternetOpeners, type InternetOpener } from "@/components/site/internet-openers";
import { InternetServicePage } from "@/components/site/internet-service-page";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { ServiceStackScene } from "@/components/site/scene-service-stack";
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

  const openers = OPENERS[slug];

  return (
    <InternetServicePage
      service={service}
      afterHero={openers ? <InternetOpeners scenes={openers()} /> : undefined}
      extra={<ServiceStackSection slug={slug} title={service.title} />}
    />
  );
}

/**
 * The opening pair for each connectivity hub: the room, then the kit.
 *
 * Built lazily per request rather than as a module constant, because the
 * scenes are client components and a shared frozen array of elements would
 * be the kind of thing that works until two routes render in the same tick.
 */
const OPENERS: Record<string, () => [InternetOpener, InternetOpener]> = {
  "business-broadband": () => [
    {
      eyebrow: "A floor at eleven",
      heading: "Five different jobs, one line, nobody waiting",
      lede: "This is what a business connection is actually for. A client call, the CRM, a job going out to a customer, a card payment and somebody on the phone three rooms away — all at the same moment, none of them aware of each other.",
      scene: (
        <BroadbandFloorScene label="An office floor at eleven in the morning: a video call with a client, cloud applications loading, files uploading to a customer, a card payment at the front desk and a colleague on the business number over Wi-Fi — all carried by one connection." />
      ),
    },
    {
      eyebrow: "What turns up",
      heading: "The cupboard, and what is in it",
      lede: "Nobody asks this in a sales meeting and everybody wants to know it. Here is what physically arrives, where each piece goes, and which of it is optional rather than quietly included.",
      scene: (
        <BroadbandKitScene label="The equipment a business broadband service puts in a building: fibre into the premises, a managed router and firewall on the wall, LAN switching in the cabinet, access points in the ceiling, and a static IP that sits on the service rather than on any hardware." />
      ),
    },
  ],
};

/**
 * Where this service sits in the whole picture.
 *
 * All three hubs get the same diagram with a different thing lit, which is
 * the point rather than an economy: a reader who lands on Static IP and one
 * who lands on Dedicated Internet should leave with the same model of the
 * stack and a different position marked in it. The section pages below each
 * hub argue about the service itself; this is the one thing none of them can
 * show from the inside.
 */
function ServiceStackSection({ slug, title }: { slug: string; title: string }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <ScrollReveal className="max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Where this sits
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            The connection is the layer everything else runs on
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {title} is the base of a design rather than the whole of one.
            Security and network infrastructure layer onto the same service,
            supported by the same team — added when you need them, not bundled
            on day one.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120} className="mt-12 lg:mt-14">
          <ServiceStackScene
            slug={slug}
            label={`The connectivity layer with ${title} highlighted, and the security and network layers that can be added onto the same service above it.`}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
