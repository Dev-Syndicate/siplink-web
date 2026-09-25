import Link from "next/link";
import { ArrowRight, FileCheck2, Headset, ShieldCheck, Timer } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { slaLifecycle } from "@/lib/internet";
import { SlaLifecycleScene } from "@/components/site/scene-sla";

/**
 * /internet/dedicated-internet/sla
 *
 * The reference stacks product cards at slightly different depths and angles
 * so the hero has somewhere to recede into. That is used here for the three
 * things an SLA actually covers — tilted very slightly, because past about
 * two degrees a card stops reading as paper and starts reading as broken.
 *
 * The rotations are static. Nothing floats on this page: the subject is what
 * happens when something is already going wrong, and drifting cards would be
 * the wrong register for it.
 */
const covered = [
  {
    icon: ShieldCheck,
    title: "SipLink equipment",
    body: "The router and hardware we provide and manage.",
    tilt: "lg:-rotate-2",
    offset: "lg:mr-10",
  },
  {
    icon: Timer,
    title: "The local access network",
    body: "The last mile into your building, and the vendors on it.",
    tilt: "lg:rotate-1",
    offset: "lg:ml-10",
  },
  {
    icon: Headset,
    title: "The IP network",
    body: "Our core, peering and the path out to the internet.",
    tilt: "lg:-rotate-1",
    offset: "lg:mr-6",
  },
];

export function SlaHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-24 -z-10 size-[560px] rounded-full bg-brand-to/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 hidden w-2/5 bg-gradient-to-b from-accent/60 to-transparent lg:block"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-20 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            Service level agreement
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Bandwidth is a number.
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              An SLA is a promise.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            Specifically, a promise about what happens when the number stops
            being true — agreed in advance, when there is no pressure on anyone
            to be vague about it.
          </p>

          {/* The deliberate absence, stated rather than glossed over. */}
          <div className="mt-8 flex max-w-lg items-start gap-3 rounded-xl border border-border bg-background/70 p-4 backdrop-blur-sm">
            <FileCheck2
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <p className="text-sm text-pretty text-muted-foreground">
              You will not find a headline uptime figure on this page. The
              commitment that applies to you depends on the service, the site
              and the last mile — so we would rather put a real one in your
              agreement than an impressive one here.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Ask for your SLA terms
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/dedicated-internet">
                All of Dedicated Internet
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            What the agreement covers
          </p>
          <div className="mt-5 space-y-4">
            {covered.map(({ icon: Icon, title, body, tilt, offset }, index) => (
              <ScrollReveal
                key={title}
                delay={200 + index * 110}
                shift={14}
                className={`${tilt} ${offset} rounded-2xl border border-border bg-background p-6 shadow-sm transition-transform duration-500 hover:rotate-0`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold tracking-tight">{title}</p>
                    <p className="mt-1 text-sm text-pretty text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Three places a fault happens — and none of them a gap between
            suppliers.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/**
 * The fault lifecycle, on the dotted step rail the second reference uses.
 *
 * The rail is CSS rather than SVG so the steps stay real text in a list; a
 * single token travels it, which is why `--rail-distance` is set from the
 * rail's own width rather than a fixed pixel value.
 */
export function SlaSections() {
  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              When something breaks
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              What an SLA looks like in motion
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              The value of agreeing this in advance is that none of it has to be
              decided while your office is offline.
            </p>
          </ScrollReveal>

          <ol className="relative mt-16 grid gap-10 md:grid-cols-3 xl:grid-cols-5">
            {/* The rail itself, behind the steps. Only drawn where the steps
                sit in a single row, since a dotted line across a wrapped grid
                would join things that do not follow each other. */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-6 right-0 left-0 hidden xl:block"
            >
              <div className="relative h-px w-full border-t-2 border-dashed border-border">
                <span
                  className="rail-dot absolute -top-[5px] left-0 block size-2.5 rounded-full bg-primary shadow-[0_0_0_4px_var(--background)]"
                  style={
                    { "--rail-distance": "calc(100% - 0.625rem)" } as React.CSSProperties
                  }
                />
              </div>
            </div>

            {slaLifecycle.map(({ title, body }, index) => (
              <ScrollReveal
                as="li"
                key={title}
                delay={index * 90}
                shift={12}
                className="relative"
              >
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-primary bg-background font-mono text-sm font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {body}
                </p>
              </ScrollReveal>
            ))}
          </ol>

          <ScrollReveal
            delay={120}
            className="mt-14 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-background p-7"
          >
            <p className="max-w-xl text-pretty text-muted-foreground">
              Ask us for the availability, response and restoration targets that
              apply to your service and site. We would rather give you figures we
              can stand behind than headline ones we cannot.
            </p>
            <Button asChild variant="outline" className="ml-auto">
              <Link href="/contact">
                Request your SLA terms
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* One fault, end to end */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              One fault, end to end
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              What actually happens between a fault and a fix
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Not a promise — a procedure. The circuit is watched, the fault becomes a ticket with a reference, the escalation path was agreed before anything went wrong, and the whole thing is written up afterwards.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-12 lg:mt-14">
            <SlaLifecycleScene label="A fault moving through its lifecycle: detected on the NOC trace, raised as a ticket with a reference, diagnosed across SipLink equipment, the access network and the IP network, restored, then reviewed." />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
