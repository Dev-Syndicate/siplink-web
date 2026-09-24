import Link from "next/link";
import { ArrowRight, Check, Mail, PhoneCall } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * The closing call to action, shared by every page under /internet.
 *
 * It used to be three copies of the same centred block on plain white, which
 * is why it read as an afterthought at the foot of otherwise worked pages.
 * One component now, on the dark ground the site already uses for the
 * assurances band on /internet — so the last thing on the page is a deliberate
 * change of register rather than more of the same.
 *
 * `bg-foreground text-background` rather than a fixed colour: the pair
 * inverts with the theme, so the band stays the opposite of the page it ends
 * instead of being dark in one theme and wrong in the other. Everything drawn
 * on it is `background` at an opacity for the same reason.
 *
 * The outline button is restyled inline because the variant assumes a light
 * ground — its default border and text would both disappear here.
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
   * An optional second action. Deliberately unused by the service and
   * section pages: they already carry a breadcrumb, a sibling rail and a
   * back link in the hero, so a "Back to …" button here was a fourth way to
   * do the same thing and made the band taller for nothing.
   */
  secondaryLabel?: string;
  secondaryHref?: string;
  heading?: string;
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-foreground text-background">
      {/* Depth: two brand blooms and a faint grid. All decorative, all built
          from tokens, so none of it needs a second version for dark mode. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 size-[560px] rounded-full bg-brand-from/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-48 size-[620px] rounded-full bg-brand-to/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:56px_56px]"
      />
      {/* The grid fades out before the edges, so it reads as texture rather
          than as a table drawn across the section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--foreground)_85%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <ScrollReveal>
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Next step
            </span>

            <h2 className="mt-4 max-w-2xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl">
              {heading}
            </h2>

            <p className="mt-4 max-w-xl text-pretty text-background/70">
              {body}
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              {assurances.map((item, index) => (
                <ScrollReveal
                  as="li"
                  key={item}
                  delay={140 + index * 90}
                  shift={8}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="text-background/80">{item}</span>
                </ScrollReveal>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href={ctaHref}>
                  {ctaLabel}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background dark:border-background/25 dark:bg-transparent dark:hover:bg-background/10"
                >
                  <Link href={secondaryHref}>{secondaryLabel}</Link>
                </Button>
              ) : null}
            </div>
          </ScrollReveal>

          {/* Direct lines, for readers who would rather not use a form. */}
          <ScrollReveal delay={160} className="lg:w-72">
            <p className="font-mono text-[10px] tracking-[0.18em] text-background/50 uppercase">
              Or reach us directly
            </p>

            <ul className="mt-4 space-y-2.5">
              {[
                {
                  icon: PhoneCall,
                  label: site.phone,
                  href: `tel:${site.phone.replace(/\s+/g, "")}`,
                },
                {
                  icon: Mail,
                  label: site.email,
                  href: `mailto:${site.email}`,
                },
              ].map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-3 rounded-xl border border-background/15 bg-background/5 px-4 py-3.5 transition-colors hover:border-background/35 hover:bg-background/10 focus-visible:border-background/35 focus-visible:outline-none"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-sm text-background/90">{label}</span>
                    <ArrowRight
                      className="ml-auto size-3.5 -translate-x-1 text-background/50 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal
          delay={120}
          className="mt-10 border-t border-background/15 pt-6"
        >
          <p className="max-w-3xl text-xs text-background/50">
            Availability, service levels and the exact scope of managed
            services are confirmed per location and set out in your agreement.
            All services are subject to technical feasibility at the time of
            order.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
