import type { CSSProperties } from "react";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";

import { GlowCard } from "@/components/site/glow-card";
import { OfficeClock } from "@/components/site/office-clock";
import { RevealGroup } from "@/components/site/reveal-group";
import { CardContent } from "@/components/ui/card";
import { offices, type Office } from "@/lib/site";

/** How each kind of office is labelled, and the clock it keeps. */
const REGIONS: Record<Office["kind"], { code: string; tag: string; timeZone: string; zone: string }> = {
  operating: { code: "IN", tag: "India", timeZone: "Asia/Kolkata", zone: "IST" },
  registered: { code: "US", tag: "US registered entity", timeZone: "America/Denver", zone: "MT" },
};

/**
 * The offices as one network: from a wide screen a signal runs along a rail
 * above the cards, each hanging from its own node. The rail is decoration, so
 * it drops away once the cards stop sitting in a single row.
 */
export function ContactOffices() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border bg-gradient-to-b from-accent/50 via-background to-background">
      <span aria-hidden className="pricing-dots pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 text-primary/15 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <span aria-hidden className="pricing-drift pointer-events-none absolute -top-24 -left-24 -z-10 size-96 rounded-full bg-brand-from/15 blur-3xl" />
      <span aria-hidden className="pricing-drift pointer-events-none absolute -right-24 bottom-0 -z-10 size-96 rounded-full bg-primary/10 blur-3xl [--drift-duration:36s]" />

      <RevealGroup className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="reveal-item mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1 font-mono text-[11px] tracking-widest text-primary uppercase shadow-sm shadow-primary/10">
            <span className="relative flex size-1.5">
              <span className="pricing-ping absolute inset-0 rounded-full bg-primary" />
              <span className="relative size-1.5 rounded-full bg-primary" />
            </span>
            Where to find us
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-brand-to to-brand-from bg-clip-text text-transparent">
              offices
            </span>
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground sm:text-lg">
            Operating offices across India, and our registered entity in the US.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-14">
          {/* From the first node to the last, with the signal travelling along it. */}
          <div aria-hidden className="absolute inset-x-[12.5%] top-5 hidden h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 lg:block">
            <span className="pricing-travel absolute -top-[3px] size-[7px] rounded-full bg-primary shadow-[0_0_12px_2px] shadow-primary/70 [animation-duration:7s]" />
          </div>

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 lg:pt-[4.5rem] xl:gap-6">
            {offices.map((office, i) => (
              <OfficeCard key={office.city} office={office} index={i} />
            ))}
          </ul>
        </div>
      </RevealGroup>
    </section>
  );
}

function OfficeCard({ office, index }: { office: Office; index: number }) {
  const { code, tag, timeZone, zone } = REGIONS[office.kind];
  const place = [office.entity, ...office.address].join(", ");

  return (
    <li
      className="reveal-item group/office relative"
      style={{ "--reveal-index": index + 1, "--ripple-delay": `${index * 0.55}s` } as CSSProperties}
    >
      {/* The node on the rail, and the stem down to the card. */}
      <span aria-hidden className="absolute -top-[4.5rem] left-1/2 hidden -translate-x-1/2 flex-col items-center lg:flex">
        <span className="relative grid size-10 place-items-center">
          <span className="pricing-ripple absolute inset-1 rounded-full bg-primary/25" />
          <span className="relative grid size-10 place-items-center rounded-full bg-card font-mono text-[11px] font-semibold text-primary shadow-md shadow-primary/15 ring-1 ring-primary/25 transition-colors duration-300 group-hover/office:bg-primary group-hover/office:text-primary-foreground">
            {code}
          </span>
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-primary/50 to-primary/10" />
      </span>

      <GlowCard index={index}>
        {/* The head. */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-to via-primary to-brand-from px-6 pt-5 pb-5 text-primary-foreground">
          <span aria-hidden className="pricing-dots pointer-events-none absolute inset-0 text-primary-foreground/25" />
          <span
            aria-hidden
            className="pricing-band-sheen pointer-events-none absolute inset-0"
            style={{ animationDelay: `${index * 1.2}s` }}
          />
          <span
            aria-hidden
            className="pricing-orbit pointer-events-none absolute -right-14 -bottom-16 size-44 rounded-full border border-dashed border-primary-foreground/35 [--orbit-duration:48s]"
          />
          <MapPin
            aria-hidden
            strokeWidth={1.25}
            className="pointer-events-none absolute -right-3 -bottom-5 size-24 -rotate-12 text-primary-foreground/15 transition-transform duration-700 ease-out group-hover/tier:rotate-0 group-hover/tier:scale-110"
          />

          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] tracking-widest text-primary-foreground/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full bg-primary-foreground px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-primary uppercase shadow-sm">
                {tag}
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight">{office.city}</h3>
            <p className="mt-0.5 text-sm text-primary-foreground/85">{office.entity}</p>

            <div className="mt-4">
              <OfficeClock timeZone={timeZone} label={zone} />
            </div>
          </div>
        </div>

        {/* The body. */}
        <CardContent className="flex flex-1 flex-col gap-5 px-6 pt-5 pb-6">
          <address className="text-sm leading-relaxed text-pretty text-muted-foreground not-italic">
            {office.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <div className="mt-auto flex flex-col items-start gap-3">
            <a
              href={`tel:${office.phone.replace(/\s/g, "")}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/25 px-3.5 py-2 text-sm font-medium whitespace-nowrap text-primary transition-all duration-300 outline-none hover:border-transparent hover:bg-gradient-to-r hover:from-brand-to hover:to-brand-from hover:text-primary-foreground hover:shadow-md hover:shadow-primary/30 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Phone className="size-4" aria-hidden />
              {office.phone}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`}
              target="_blank"
              rel="noreferrer"
              className="group/map inline-flex items-center gap-1 self-center text-xs font-semibold text-primary outline-none focus-visible:underline"
            >
              View on map
              <span className="sr-only"> (opens in a new tab)</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5" aria-hidden />
            </a>
          </div>
        </CardContent>
      </GlowCard>
    </li>
  );
}
