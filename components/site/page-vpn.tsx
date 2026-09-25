import Link from "next/link";
import { ArrowRight, Check, Lock, X } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { vpnLimits, vpnShapes } from "@/lib/internet";
import { cn } from "@/lib/utils";
import { VpnTunnelScene } from "@/components/site/scene-vpn";

/**
 * /internet/network-solutions/vpn
 *
 * No artwork was supplied for the last three Network Solutions pages, so each
 * builds its own from theme tokens. Here it is the tunnel itself: two sites,
 * a sheath between them, and traffic crossing in both directions on the same
 * duration offset so the pair reads as one exchange rather than two loops.
 */
export function VpnHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-24 -z-10 size-[560px] rounded-full bg-brand-to/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            VPN
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Several networks,
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              or one with doors.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            Without a VPN, every site and every remote worker is a separate
            network held together by exceptions. With one, there is a single
            network and a small number of controlled ways into it.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Design a VPN
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

        {/* The tunnel. */}
        <ScrollReveal delay={140}>
          <div
            aria-hidden
            className="rounded-2xl border border-border bg-background/70 p-8 backdrop-blur-md lg:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              {["Head office", "Branch"].map((site) => (
                <div
                  key={site}
                  className="flex-1 rounded-xl border border-primary/30 bg-background p-4 text-center"
                >
                  <p className="font-mono text-[10px] tracking-[0.16em] text-primary uppercase">
                    {site}
                  </p>
                </div>
              ))}
            </div>

            {/* The sheath, with traffic crossing inside it. */}
            <div className="relative my-6 h-20 rounded-2xl border border-primary/25 bg-primary/5">
              <svg
                viewBox="0 0 320 80"
                preserveAspectRatio="none"
                className="absolute inset-0 size-full"
              >
                <path
                  d="M8 28 H312"
                  pathLength={100}
                  className="stroke-border"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 28 H312"
                  pathLength={100}
                  className="scene-dash stroke-primary"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{ "--dash-duration": "2.8s" } as React.CSSProperties}
                />
                <path
                  d="M312 52 H8"
                  pathLength={100}
                  className="stroke-border"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M312 52 H8"
                  pathLength={100}
                  className="scene-dash stroke-primary"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={
                    {
                      "--dash-duration": "2.8s",
                      "--dash-delay": "1.4s",
                    } as React.CSSProperties
                  }
                />
              </svg>

              <span className="absolute inset-0 m-auto flex size-11 items-center justify-center rounded-xl border border-primary bg-background text-primary">
                <Lock className="size-5" />
              </span>
            </div>

            <p className="text-center font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              encrypted, both directions
            </p>

            <div className="mt-7 rounded-xl border border-border bg-background p-4 text-center">
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                Remote users join the same tunnel
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function VpnSections() {
  return (
    <>
      {/* Two shapes */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Two shapes
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Between buildings, or between people and a building
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Most businesses end up with both. They solve different problems
              and are worth deciding separately rather than as one purchase.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border lg:grid-cols-2">
            {vpnShapes.map(({ title, solves, points, icon: Icon }, index) => (
              <ScrollReveal
                key={title}
                delay={index * 100}
                className={cn(
                  "group p-8 lg:p-10",
                  index === 0
                    ? "bg-gradient-to-br from-primary/5 to-background"
                    : "bg-background",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                </div>

                <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  Solves
                </p>
                <p className="mt-2 text-pretty">{solves}</p>

                <ul className="mt-7 space-y-3">
                  {points.map((point, pointIndex) => (
                    <ScrollReveal
                      as="li"
                      key={point}
                      delay={pointIndex * 60}
                      shift={8}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span className="text-muted-foreground">{point}</span>
                    </ScrollReveal>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Limits */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Worth saying plainly
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Three things a VPN will not do
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              A tunnel is a way in, not a security posture. These are the gaps
              people most often assume it closes.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {vpnLimits.map(({ title, body }, index) => (
              <ScrollReveal
                as="li"
                key={title}
                delay={index * 80}
                shift={14}
                className="rounded-2xl border border-border bg-background p-7 lg:p-8"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <X className="size-5" aria-hidden />
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

      {/* Both shapes, one office */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Both shapes, one office
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              These are not alternatives
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Site-to-site and remote access read as a choice when they sit side by side. Most estates end up with both, doing different jobs — and with the limit that neither of them is a firewall.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-12 lg:mt-14">
            <VpnTunnelScene label="One office with two ways in: an always-on site-to-site tunnel from another building, and a per-person remote access tunnel that is connected on demand and revoked centrally when somebody leaves." />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
