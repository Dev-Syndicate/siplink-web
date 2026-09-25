import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

  return (
    <InternetServicePage
      service={service}
      extra={<ServiceStackSection slug={slug} title={service.title} />}
    />
  );
}

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
