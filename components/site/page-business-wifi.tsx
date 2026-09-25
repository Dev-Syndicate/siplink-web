import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { wifiFailures, wifiProcess } from "@/lib/internet";
import { WifiCoverageScene } from "@/components/site/scene-wifi";

/**
 * /internet/network-solutions/business-wifi
 *
 * `business_wifi.png` was rendered on near-black and has since been cut out:
 * the devices, tiles and server are fully opaque, and the glow fades to
 * transparent by brightness, so it composites over light and dark grounds.
 */
export function BusinessWifiHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-24 -z-10 size-[560px] rounded-full bg-brand-to/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Business Wi-Fi
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            One access point
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              is not a network.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            However fast the line behind it is. Coverage is decided by walls,
            glass, racking and how many devices are in a room at once — none of
            which appear on a floor plan.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Request a Wi-Fi assessment
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/network-solutions/lan-switching">
                LAN &amp; switching
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* No panel: the artwork is a cut-out, so it sits on the section
            ground and its glow falls onto the page. */}
        <ScrollReveal delay={140}>
          <Image
            src="/internet/business_wifi.png"
            alt=""
            aria-hidden
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="h-auto w-full"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

export function BusinessWifiSections() {
  return (
    <>
      {/* How a deployment is arrived at */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Before a quote
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              A survey, then a design, then a price
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              In that order. A Wi-Fi quote given without walking the floor is a
              guess with a number attached to it.
            </p>
          </ScrollReveal>

          <ol className="mt-14 flex flex-wrap gap-px overflow-hidden rounded-2xl bg-border">
            {wifiProcess.map(({ title, body }, index) => (
              <ScrollReveal
                as="li"
                key={title}
                delay={index * 80}
                shift={12}
                className="group flex grow basis-64 flex-col bg-background p-7 transition-colors hover:bg-primary/5"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-balance">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {body}
                </p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Where it fails */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Symptoms
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Four complaints, and what is behind them
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              If one of these sounds like your office, the cause is almost
              always design rather than equipment — which is the good news.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {wifiFailures.map(({ symptom, cause, icon: Icon }, index) => (
              <ScrollReveal
                as="li"
                key={symptom}
                delay={index * 80}
                shift={14}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-colors hover:border-primary/40 lg:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      You hear
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-balance">
                      &ldquo;{symptom}&rdquo;
                    </h3>
                  </div>
                </div>

                <div className="relative mt-6 border-t border-border pt-5">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                    What it usually is
                  </p>
                  <p className="mt-2 text-pretty text-muted-foreground">
                    {cause}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Walk it first */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Walk it first
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Coverage is a question about a building, not a box
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Every failure above happens somewhere specific — the far room, the room that fills up, the corridor between two access points. Here is the same floor as a plan, with a call that survives the walk across it.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-12 lg:mt-14">
            <WifiCoverageScene label="A floor plan with three access points and their coverage, and a phone on a call walking from reception across the open floor to the far meeting room, handing over cleanly between access points, beside the employee, guest and device networks." />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
