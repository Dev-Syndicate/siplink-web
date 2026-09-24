import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addressAnatomy, dynamicBreakage } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * /internet/static-ip/what-is-static-ip
 *
 * The hero is a configuration file, because that is where an address is
 * actually met — nobody encounters an IP as a concept, they encounter it as a
 * line someone has to type into a firewall. Nothing else on the site uses a
 * terminal treatment, which is what keeps this page distinct from the other
 * eleven under /internet.
 *
 * The rotating value on the left is the same `.scene-swap` the address scene
 * uses: four values stacked in one place, one visible at a time, switched
 * rather than faded — an address changes, it does not dissolve.
 *
 * Every address on this page is from RFC 5737 documentation space. See the
 * note above `addressAnatomy` in lib/internet.ts.
 */
const rotating = ["198.51.100.7", "203.0.113.88", "192.0.2.41", "198.51.100.62"];

export function WhatIsStaticIpHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-24 -z-10 size-[560px] rounded-full bg-brand-to/10 blur-3xl"
      />

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

        {/* The rule, as it is actually written. */}
        <ScrollReveal delay={140}>
          <div
            aria-hidden
            className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-5 py-3">
              <span className="size-2.5 rounded-full bg-muted-foreground/25" />
              <span className="size-2.5 rounded-full bg-muted-foreground/25" />
              <span className="size-2.5 rounded-full bg-muted-foreground/25" />
              <span className="ml-3 font-mono text-[11px] text-muted-foreground">
                partner-allowlist.conf
              </span>
            </div>

            <div className="space-y-4 p-6 font-mono text-[13px] leading-relaxed lg:p-8">
              <p className="text-muted-foreground/60"># allow our office</p>

              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-muted-foreground">allow</span>
                <span className="relative inline-flex h-6 min-w-[10.5rem] items-baseline">
                  {/* Four values in one place, one shown at a time. */}
                  {rotating.map((value, index) => (
                    <span
                      key={value}
                      className="scene-swap absolute inset-0 text-muted-foreground line-through decoration-destructive/70"
                      style={
                        { "--swap-delay": `${index * 1.2}s` } as React.CSSProperties
                      }
                    >
                      {value}
                    </span>
                  ))}
                </span>
                <span className="text-muted-foreground/60">
                  # dynamic — moves
                </span>
              </p>

              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-muted-foreground">allow</span>
                <span className="font-semibold text-primary">203.0.113.24</span>
                <span className="text-muted-foreground/60">
                  # static — stays
                </span>
                <span className="type-caret text-primary">▌</span>
              </p>

              <div className="!mt-6 flex items-center gap-2 border-t border-border pt-5 text-xs">
                <Check className="size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  Written once. Still correct next month.
                </span>
              </div>
            </div>
          </div>
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
    </>
  );
}
