import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { vpnLimits, vpnShapes } from "@/lib/internet";
import { cn } from "@/lib/utils";
import { VpnTunnelScene } from "@/components/site/scene-vpn";

/**
 * /internet/network-solutions/vpn
 *
 * The hero was a tunnel drawn from theme tokens, back when no artwork had
 * been supplied for this page. There is artwork now, and it says more than
 * the drawing could: the two sites, the remote users and the systems behind
 * them all arriving at one encrypted tunnel.
 */
export function VpnHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* No wash behind the right-hand column: the artwork there is opaque
          and already pink, so a blob under it only tints the margins. */}

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

        {/* Supplied artwork, and it already carries the argument: two
            sites, remote users and the business systems behind, all meeting
            in one encrypted tunnel rather than reaching each other through
            exceptions.

            Framed rather than bare. The cut-outs on the Wi-Fi and LAN pages
            sit straight on the section ground because their edges dissolve;
            this one is an opaque rectangle with its own pale ground, so
            without a clipped corner and a hairline it reads as a screenshot
            somebody pasted in. */}
        <ScrollReveal delay={140}>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <Image
              src="/internet/vpn.png"
              alt=""
              aria-hidden
              width={1444}
              height={746}
              priority
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="h-auto w-full"
            />
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
