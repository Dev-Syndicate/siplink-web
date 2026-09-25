import Link from "next/link";
import { Check, PhoneCall } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * The closing call to action, shared by every page under /internet.
 *
 * Built in the same shape as the home page's closing CTA and the one on the
 * product pages: a gradient card inset from the page rather than a full-bleed
 * band, with a badge, the ask, and a pair of buttons. Matching it matters
 * more than being interesting here — this is the last thing on twenty-one
 * pages, and a reader who has come from /products or the home page should
 * meet the same ending.
 *
 * The gradient runs `brand-to → brand-from` and the text is
 * `primary-foreground`, so the card carries its own contrast and does not
 * depend on the page's theme. The second button is the phone number, as on
 * the home page: the fastest route for someone who has read this far.
 */
const assurances = [
  "Feasibility checked first",
  "You talk to an engineer",
  "Quoted per location",
];

export function InternetClose({
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  heading = "Tell us where your offices are",
  body = "We will check what is deliverable at each address, size the service against how you actually work, and quote the whole network — voice included — as one bill.",
}: {
  ctaLabel: string;
  ctaHref: string;
  /**
   * An optional onward link, rendered as a quiet link beneath the buttons.
   * Only the hub uses it, to point at the voice products; the service and
   * section pages have a breadcrumb and a sibling rail already.
   */
  secondaryLabel?: string;
  secondaryHref?: string;
  heading?: string;
  body?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <ScrollReveal className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-brand-to via-brand-to to-brand-from px-8 py-14 text-primary-foreground lg:px-14 lg:py-16">
        {/* Soft light falling from the top-right, so the flat gradient reads
            as a lit surface rather than a solid fill. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[520px] rounded-full bg-white/10 blur-3xl"
        />

        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-widest uppercase">
          <span className="size-1.5 rounded-full bg-current" aria-hidden />
          Business connectivity
        </span>

        <h2 className="font-heading mt-6 max-w-xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {heading}
        </h2>

        <p className="mt-5 max-w-xl text-pretty text-primary-foreground/85 lg:text-lg">
          {body}
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Button
            asChild
            size="lg"
            className="w-full bg-background text-primary hover:bg-background/90 sm:w-auto"
          >
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-auto w-full border-white/25 bg-white/10 py-3 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground sm:w-auto sm:py-2 dark:border-white/25 dark:bg-white/10 dark:hover:bg-white/20"
          >
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
              <PhoneCall className="shrink-0" aria-hidden />
              <span className="text-center text-balance whitespace-normal">
                Speak to an engineer ({site.phone})
              </span>
            </a>
          </Button>
        </div>

        {/* Kept from the band this replaced: three short promises that
            answer what actually happens after the click. */}
        <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
          {assurances.map((item, index) => (
            <ScrollReveal
              as="li"
              key={item}
              delay={120 + index * 80}
              shift={8}
              className="flex items-center gap-2 text-sm text-primary-foreground/85"
            >
              <Check className="size-4 shrink-0" aria-hidden />
              {item}
            </ScrollReveal>
          ))}
        </ul>

        {secondaryLabel && secondaryHref ? (
          <Link
            href={secondaryHref}
            className="mt-8 inline-block text-sm font-medium text-primary-foreground underline underline-offset-4 decoration-primary-foreground/40 transition-colors hover:decoration-primary-foreground"
          >
            {secondaryLabel}
          </Link>
        ) : null}
      </ScrollReveal>

      <ScrollReveal
        as="p"
        delay={120}
        className="mx-auto mt-8 max-w-3xl text-xs text-muted-foreground"
      >
        Availability, service levels and the exact scope of managed services
        are confirmed per location and set out in your agreement. All services
        are subject to technical feasibility at the time of order.
      </ScrollReveal>
    </section>
  );
}
