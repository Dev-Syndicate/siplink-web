import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addressAnatomy, dynamicBreakage } from "@/lib/internet";
import { cn } from "@/lib/utils";
import { StaticAddressScene } from "@/components/site/scene-static-address";
import { StaticIpHeroScene } from "@/components/site/scene-static-hero";

/**
 * /internet/static-ip/what-is-static-ip
 *
 * The hero used to be a configuration file: a dynamic value struck through,
 * a static one below it. It said the right thing standing still, which is
 * the trouble — the reader never saw the forty days in which nothing appears
 * to be wrong, and those are the entire reason the failure is expensive. It
 * is an animated stage now; see scene-static-hero.
 *
 * Every address on this page is from RFC 5737 documentation space. See the
 * note above `addressAnatomy` in lib/internet.ts.
 */
export function WhatIsStaticIpHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* No wash behind the right-hand column. The stage there paints its
          own ground, and two of them stacked turned the half of the page the
          scene sits in pink. */}

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-20 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            What is static IP?
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            One number you write
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              into a rule once.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            Most connections are handed an address from a pool, and it may be
            replaced. That is invisible until something outside your network
            has been configured to trust it.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/internet/static-ip/add-static-ip">
                Add a static IP
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/static-ip/business-uses">
                See the business uses
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* The forty days the config file could not show. */}
        <ScrollReveal delay={140}>
          <StaticIpHeroScene label="An office address being reissued from a pool between day one and day forty-one while a partner's allowlist still holds the original, so the request is refused and a person is the first to find out — then the same address held static, and accepted again." />
        </ScrollReveal>

      </div>
    </section>
  );
}

const STATE = {
  ok: {
    ring: "border-primary/40",
    dot: "bg-primary",
    chip: "border-primary/40 bg-primary/5 text-primary",
  },
  changed: {
    ring: "border-amber-500/40",
    dot: "bg-amber-500",
    chip: "border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400",
  },
  denied: {
    ring: "border-destructive/40",
    dot: "bg-destructive",
    chip: "border-destructive/40 bg-destructive/5 text-destructive",
  },
} as const;

export function WhatIsStaticIpSections() {
  return (
    <>
      {/* The quiet failure */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              How it breaks
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Forty-one days, and nobody did anything wrong
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              This is the failure a dynamic address causes. It is worth reading
              in order, because the thing that makes it expensive is how
              ordinary every step looks.
            </p>
          </ScrollReveal>

          <ol className="relative mt-14 space-y-5 border-l border-border pl-8 lg:pl-12">
            {dynamicBreakage.map(
              ({ time, title, body, address, state }, index) => {
                const tone = STATE[state];

                return (
                  <ScrollReveal
                    as="li"
                    key={title}
                    delay={index * 110}
                    shift={14}
                    className="relative"
                  >
                    {/* The node on the rule. */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-7 -left-[2.4rem] flex size-4 items-center justify-center rounded-full border-2 bg-background lg:-left-[3.4rem]",
                        tone.ring,
                      )}
                    >
                      <span className={cn("size-1.5 rounded-full", tone.dot)} />
                    </span>

                    <div className="rounded-2xl border border-border bg-background p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                          {time}
                        </p>
                        <span
                          className={cn(
                            "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs",
                            tone.chip,
                          )}
                        >
                          {state === "denied" ? (
                            <X className="size-3.5" aria-hidden />
                          ) : (
                            <Check className="size-3.5" aria-hidden />
                          )}
                          {address}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-semibold tracking-tight">
                        {title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
                        {body}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              },
            )}
          </ol>
        </div>
      </section>

      {/* Anatomy */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Three things worth knowing
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              What the address actually is
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Enough to have the conversation with whoever manages your
              firewall, without needing to have had it before.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {addressAnatomy.map(({ title, body, icon: Icon }, index) => (
              <ScrollReveal
                as="li"
                key={title}
                delay={index * 80}
                shift={14}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-colors hover:border-primary/40 lg:p-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-balance">
                  {title}
                </h3>
                <p className="mt-3 text-pretty text-muted-foreground">{body}</p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Two kinds of address */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Two kinds of address
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              The one on your laptop is not the one that matters
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Almost everyone has seen a 192.168 address and assumed it was theirs on the internet. It is not — it exists only inside the building. Watch where the two part company, and what each one is actually attached to.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-12 lg:mt-14">
            <StaticAddressScene label="Private addresses inside a building being translated by the router into one public address the internet sees, then the same address surviving a router replacement but not a change of provider." />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
