import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { firewallLayers, firewallManagedVsNot } from "@/lib/internet";
import { FirewallLayersScene } from "@/components/site/scene-firewall";

/**
 * /internet/network-solutions/managed-router-firewall
 *
 * `manage.png` is a cut-out on a transparent background, not a full-bleed
 * photograph like the ones on the connectivity pages. So it is placed as an
 * object rather than a backdrop: contained, sitting on the page's own ground,
 * with a soft radial bloom behind it to give it something to stand on. Using
 * `object-cover` here would crop a subject that was drawn to be seen whole.
 */
export function ManagedRouterFirewallHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-20 -z-10 size-[620px] rounded-full bg-brand-to/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Managed router &amp; firewall
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Your network, secured
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              and managed for you.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            In many businesses, firewall rules live in one person&rsquo;s
            memory and firmware ages quietly. A managed service keeps your
            router and firewall documented, maintained and monitored.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Discuss a managed network
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/network-solutions">All network solutions</Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* A cut-out, so it is contained and given a bloom to sit on. */}
        <ScrollReveal delay={140} className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 m-auto size-[80%] rounded-full bg-gradient-to-br from-brand-from/20 to-brand-to/5 blur-2xl"
          />
          <Image
            src="/internet/manage.webp"
            alt=""
            width={1320}
            height={1200}
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="mx-auto h-auto w-full max-w-md object-contain lg:max-w-lg"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

export function ManagedRouterFirewallSections() {
  return (
    <>
      {/* The policy, in layers */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Security policy
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Four layers of a well-built security policy
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Most networks get the first layer right and leave the other
              three to drift. We work through all four in order, because each
              one builds on the layer before it.
            </p>
          </ScrollReveal>

          <ol className="relative mt-14 space-y-5 border-l border-border pl-8 lg:pl-12">
            {firewallLayers.map(({ layer, title, body, icon: Icon }, index) => (
              <ScrollReveal
                as="li"
                key={layer}
                delay={index * 100}
                shift={14}
                className="group relative"
              >
                <span
                  aria-hidden
                  className="absolute top-8 -left-[2.4rem] flex size-4 items-center justify-center rounded-full border-2 border-primary/40 bg-background transition-colors group-hover:border-primary lg:-left-[3.4rem]"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                </span>

                <div className="rounded-2xl border border-border bg-background p-7 transition-colors group-hover:border-primary/40 lg:p-8">
                  <div className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                        {layer}
                      </p>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
                    {body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Managed or not */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Managed vs unmanaged
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              The difference a managed router and firewall makes
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Managed is not about better equipment. It means your equipment
              runs under a defined process instead of being left to whoever
              installed it.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border">
            {firewallManagedVsNot.map(({ unmanaged, managed }, index) => (
              <ScrollReveal
                as="li"
                key={unmanaged}
                delay={index * 70}
                shift={10}
                className="grid gap-px bg-border sm:grid-cols-2"
              >
                <div className="flex items-start gap-3 bg-background p-6">
                  <X
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground/40"
                    aria-hidden
                  />
                  <span className="text-sm text-muted-foreground/70">
                    {unmanaged}
                  </span>
                </div>
                <div className="flex items-start gap-3 bg-gradient-to-r from-primary/5 to-background p-6">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span className="text-sm">{managed}</span>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Four verdicts */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Firewall in action
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              How the firewall&rsquo;s four layers check incoming traffic
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Each layer answers a different question about incoming traffic. See how four arrivals are checked, and why two of them never get through.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-12 lg:mt-14">
            <FirewallLayersScene label="Four arrivals judged by a managed firewall: an unsolicited connection refused at the perimeter, an expected reply allowed, a guest network request for the file server stopped by segmentation, and a remote worker admitted from a known address." />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
