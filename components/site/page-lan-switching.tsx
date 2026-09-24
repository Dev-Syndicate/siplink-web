import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { lanSegments, lanTriggers } from "@/lib/internet";

/**
 * /internet/network-solutions/lan-switching
 *
 * `lan.png` is a cut-out like manage.png, so it is contained rather than
 * covered — but placed left of the copy instead of right, so the three
 * Network Solutions pages that carry artwork do not open on the same
 * arrangement three times. The swap is `order`, so the heading still comes
 * first in the DOM.
 */
export function LanSwitchingHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-24 -z-10 size-[620px] rounded-full bg-brand-from/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-16 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal className="lg:order-2">
          <Badge variant="secondary" className="font-mono tracking-widest">
            LAN &amp; switching
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            A gigabit line behind
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              an unmanaged switch.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            Your internet connection is only as effective as the network
            supporting it. The moment unmanaged switches start appearing under
            desks is the moment the network stopped being designed.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Plan a LAN deployment
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/network-solutions/business-wifi">
                Business Wi-Fi
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140} className="relative lg:order-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 m-auto size-[78%] rounded-full bg-gradient-to-br from-brand-from/20 to-brand-to/5 blur-2xl"
          />
          <Image
            src="/internet/lan.png"
            alt=""
            width={1460}
            height={1080}
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="mx-auto h-auto w-full max-w-md object-contain lg:max-w-xl"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

export function LanSwitchingSections() {
  return (
    <>
      {/* Segmentation */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Segmentation
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Four lanes on the same cable
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              VLANs keep voice, data, wireless and devices apart, so one noisy
              system cannot degrade the others — and so the camera on the wall
              cannot see the file server.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 xl:grid-cols-4">
            {lanSegments.map(({ name, carries, why, icon: Icon }, index) => (
              <ScrollReveal
                as="li"
                key={name}
                delay={index * 80}
                shift={12}
                className="group relative overflow-hidden bg-background p-7 transition-colors hover:bg-primary/5"
              >
                {/* A lane marker down the left edge, drawing in on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-500 group-hover:scale-y-100"
                />

                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>

                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {name}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {carries}
                </p>
                <p className="mt-4 text-sm text-pretty text-muted-foreground">
                  {why}
                </p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* When it is worth doing */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Timing
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Four moments worth doing this properly
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                A LAN is cheap to design and expensive to retrofit. These are
                the points where the difference is largest.
              </p>

              <Button asChild className="mt-8">
                <Link href="/contact">
                  Plan a LAN deployment
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </ScrollReveal>

            <ol className="space-y-px overflow-hidden rounded-2xl bg-border">
              {lanTriggers.map(({ title, body }, index) => (
                <ScrollReveal
                  as="li"
                  key={title}
                  delay={index * 80}
                  shift={10}
                  className="group flex gap-5 bg-background p-6 transition-colors hover:bg-primary/5 lg:p-7"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{title}</h3>
                    <p className="mt-1.5 text-pretty text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
