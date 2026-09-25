import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { StaticIpSituations } from "@/components/site/static-ip-situations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staticIpLimits } from "@/lib/internet";
import { cn } from "@/lib/utils";
import { StaticUsesScene } from "@/components/site/scene-static-uses";

/**
 * /internet/static-ip/business-uses
 *
 * The hero is a live request log: inbound connections arriving at a gate and
 * being matched against an allowlist, one after another. It is the same
 * argument the page makes in words, but a log is how an administrator would
 * actually see it happen.
 *
 * `.feature-arrive` carries the rows — it fades in, holds, then clears, which
 * is exactly the shape of a line scrolling past. Staggering the delays is
 * what keeps the column from flashing in unison.
 *
 * Addresses are RFC 5737 documentation space; see lib/internet.ts.
 */
const requests = [
  { address: "203.0.113.24", allowed: true },
  { address: "198.51.100.9", allowed: false },
  { address: "203.0.113.24", allowed: true },
  { address: "192.0.2.77", allowed: false },
  { address: "203.0.113.24", allowed: true },
];

export function BusinessUsesHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-24 -z-10 size-[560px] rounded-full bg-brand-from/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-20 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Business uses
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Something out there
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              has to recognise you.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            That is the pattern behind every use on this page. A partner, a
            platform, a trunk provider or your own staff need to know traffic
            is yours — and recognition needs an address that does not move.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/internet/static-ip/add-static-ip">
                Add a static IP
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/network-solutions/managed-router-firewall">
                Managed firewall
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* The gate, as a log. */}
        <ScrollReveal delay={140}>
          <div
            aria-hidden
            className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-3">
              <span className="font-mono text-[11px] text-muted-foreground">
                inbound
              </span>
              <span className="font-mono text-[11px] text-primary">
                allowlist: 203.0.113.24
              </span>
            </div>

            <ul className="divide-y divide-border">
              {requests.map(({ address, allowed }, index) => (
                <li
                  key={`${address}-${index}`}
                  className="feature-arrive flex items-center gap-3 px-5 py-3.5"
                  style={
                    { "--arrive-delay": `${index * 0.85}s` } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full",
                      allowed
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive",
                    )}
                  >
                    {allowed ? (
                      <Check className="size-3.5" />
                    ) : (
                      <X className="size-3.5" />
                    )}
                  </span>
                  <span className="font-mono text-[13px]">{address}</span>
                  <span
                    className={cn(
                      "ml-auto font-mono text-[11px] tracking-wider uppercase",
                      allowed ? "text-primary" : "text-muted-foreground/60",
                    )}
                  >
                    {allowed ? "allowed" : "refused"}
                  </span>
                </li>
              ))}
            </ul>

            <p className="border-t border-border px-5 py-3.5 text-xs text-muted-foreground">
              One known address, and a rule that keeps being true.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function BusinessUsesSections() {
  return (
    <>
      {/* Pick your situation */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Start from the job
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Which of these are you trying to do?
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Nobody wants a static IP. They want one of these six things, and
              a fixed address is what makes it work. Pick the one you recognise.
            </p>
          </ScrollReveal>

          <StaticIpSituations />
        </div>
      </section>

      {/* What it is not */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Worth saying plainly
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Three things a static IP will not do
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              It is a small, useful, unglamorous thing. Most of the
              disappointment around it comes from expecting one of these.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {staticIpLimits.map(({ title, body, icon: Icon }, index) => (
              <ScrollReveal
                as="li"
                key={title}
                delay={index * 80}
                shift={14}
                className="relative overflow-hidden rounded-2xl border border-border bg-background p-7 lg:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <Icon className="size-5" aria-hidden />
                    {/* A struck-through mark, since each card is a negative. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="h-px w-7 -rotate-45 bg-destructive/60" />
                    </span>
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-balance">
                  {title}
                </h3>
                <p className="mt-3 text-pretty text-muted-foreground">{body}</p>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal
            delay={120}
            className="mt-12 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-muted/30 p-7"
          >
            <p className="max-w-xl text-pretty text-muted-foreground">
              The address is what a policy refers to. The policy itself is a
              firewall&rsquo;s job — which is what a managed router and firewall
              service is for.
            </p>
            <Button asChild variant="outline" className="ml-auto">
              <Link href="/internet/network-solutions/managed-router-firewall">
                Managed router &amp; firewall
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* All pointing one way */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              All pointing one way
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Six things that have to be told where you are
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              A static IP is the rare thing whose whole value is in the inbound direction. Every wire here points at the same address, and every one of them had it typed into a configuration somewhere else.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-12 lg:mt-14">
            <StaticUsesScene label="Six inbound connections — a site-to-site VPN, remote access, remote monitoring, SIP trunking, partner allowlists and a hosted system — all configured against the same fixed public address." />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
