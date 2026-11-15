import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { integrationLogos } from "@/lib/site";

/**
 * The integrations as an orbit, for the partners page: SipLink at the centre,
 * the tools that hold the customer record on the inner ring, and the places
 * work happens on the outer one. The homepage and the CRM page draw the same
 * ten as a wired patch panel; this is deliberately a different picture of the
 * same list, which still comes from `integrationLogos`.
 *
 * The rings turn in opposite directions and each tile turns back against its
 * ring, so the logos stay upright. Hovering the orbit pauses it, so a tile can
 * be hovered for its description. Sizes are in container units, so the whole
 * figure scales as one piece at every width.
 */
const RINGS = [
  {
    title: "Inner ring",
    caption: "Where the customer record lives",
    names: ["Salesforce", "HubSpot", "Zoho", "Bitrix24", "Odoo"],
    diameter: 46,
    duration: "70s",
    reverse: false,
    offset: -90,
  },
  {
    title: "Outer ring",
    caption: "Where your team works and talks",
    names: ["Microsoft 365", "Google Workspace", "WhatsApp", "Zendesk", "CEIPAL"],
    diameter: 88,
    duration: "90s",
    reverse: true,
    offset: -54,
  },
] as const;

const PAUSE = "group-hover/orbit:[animation-play-state:paused]";

export function IntegrationOrbit({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-muted/30">
      <span
        aria-hidden
        className="pricing-dots pointer-events-none absolute inset-0 -z-10 text-primary/15"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:px-10 lg:py-28">
        <div>
          <Badge variant="outline" className="bg-background tracking-widest uppercase">
            Integration ecosystem
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">{description}</p>

          {/* The key to the picture, and the list a screen reader gets. */}
          <dl className="mt-10 space-y-6">
            {RINGS.map((ring, index) => (
              <div key={ring.title} className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border-2 border-dashed border-primary/40"
                >
                  <span
                    className={
                      index === 0
                        ? "size-3 rounded-full bg-primary"
                        : "size-3 rounded-full border-2 border-primary"
                    }
                  />
                </span>
                <div>
                  <dt className="font-semibold">
                    {ring.title}
                    <span className="font-normal text-muted-foreground"> · {ring.caption}</span>
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {ring.names.map((name) => (
                      <Badge key={name} variant="secondary">
                        {name}
                      </Badge>
                    ))}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <Button asChild variant="outline" className="mt-10">
            <Link href="/products/crm-integration">
              See how CRM integration works
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        {/* Decorative: the list beside it names every tool. */}
        <div
          aria-hidden
          className="group/orbit @container relative mx-auto aspect-square w-full max-w-[560px]"
        >
          {RINGS.map((ring) => {
            const logos = ring.names.map(
              (name) => integrationLogos.find((logo) => logo.name === name)!,
            );
            return (
              <div
                key={ring.title}
                className={`pricing-orbit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/25 ${PAUSE}`}
                style={
                  {
                    width: `${ring.diameter}%`,
                    height: `${ring.diameter}%`,
                    "--orbit-duration": ring.duration,
                    animationDirection: ring.reverse ? "reverse" : "normal",
                  } as React.CSSProperties
                }
              >
                {logos.map(({ name, description, src, w, h }, index) => {
                  const angle = ((ring.offset + (360 / logos.length) * index) * Math.PI) / 180;
                  return (
                    <div
                      key={name}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${50 + 50 * Math.cos(angle)}%`,
                        top: `${50 + 50 * Math.sin(angle)}%`,
                      }}
                    >
                      {/* Turns back against the ring, so the logo stays level. */}
                      <div
                        className={`pricing-orbit ${PAUSE}`}
                        style={
                          {
                            "--orbit-duration": ring.duration,
                            animationDirection: ring.reverse ? "normal" : "reverse",
                          } as React.CSSProperties
                        }
                      >
                        <HoverCard openDelay={80} closeDelay={60}>
                          <HoverCardTrigger asChild>
                            <span
                              className="flex h-[9.5cqw] w-[16cqw] cursor-default items-center justify-center rounded-[2.5cqw] bg-background px-[2cqw] shadow-lg ring-1 ring-foreground/5 transition-[scale,box-shadow] duration-200 hover:scale-110 hover:shadow-xl hover:ring-2 hover:ring-primary/50"
                            >
                              <Image
                                src={src}
                                alt=""
                                width={w}
                                height={h}
                                sizes="120px"
                                className="max-h-[70%] w-auto max-w-full object-contain"
                              />
                            </span>
                          </HoverCardTrigger>
                          <HoverCardContent sideOffset={10} className="p-4">
                            <p className="font-semibold">{name}</p>
                            <p className="mt-1 text-pretty text-muted-foreground">
                              {description}
                            </p>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* The hub, with two slow pulses going out from it. */}
          <span className="absolute top-1/2 left-1/2 size-[26cqw] -translate-x-1/2 -translate-y-1/2">
            {["0s", "-3.75s"].map((delay) => (
              <span
                key={delay}
                className="pricing-pulse absolute inset-0 rounded-full bg-primary/15"
                style={{ "--pulse-delay": delay } as React.CSSProperties}
              />
            ))}
            <span className="absolute inset-[12%] flex items-center justify-center rounded-full bg-background shadow-2xl ring-4 ring-primary/10">
              <Image
                src="/siplink-logo.webp"
                alt=""
                width={300}
                height={135}
                sizes="140px"
                className="w-[72%] object-contain"
              />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
