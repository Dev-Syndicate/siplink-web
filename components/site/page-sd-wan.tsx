import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sdwanBeforeAfter, sdwanDecisions } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * /internet/network-solutions/sd-wan
 *
 * The hero draws the thing that makes SD-WAN different from three links in a
 * cupboard: a controller choosing between them. The chosen path carries a
 * packet; the other two are drawn dimmed and still, so the difference between
 * "available" and "in use" is visible rather than labelled.
 */
const links = [
  { name: "Fibre", state: "Carrying voice", active: true },
  { name: "Broadband", state: "Carrying bulk", active: true },
  { name: "LTE", state: "Standby", active: false },
];

export function SdWanHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-24 -z-10 size-[560px] rounded-full bg-brand-from/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-10 pb-16 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal>
          <Badge variant="secondary" className="font-mono tracking-widest">
            SD-WAN
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Three links is not
            <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              the same as a choice.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-muted-foreground">
            Having more than one connection only helps if something decides
            which to use, for what, and when to stop using it. That decision is
            what SD-WAN actually is.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Talk through an SD-WAN design
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/network-solutions/multi-location-networking">
                Multi-location networking
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div
            aria-hidden
            className="rounded-2xl border border-border bg-background/70 p-7 backdrop-blur-md lg:p-9"
          >
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              One branch, three paths
            </p>

            <ul className="mt-6 space-y-4">
              {links.map(({ name, state, active }, index) => (
                <li key={name} className="flex items-center gap-4">
                  <span
                    className={cn(
                      "w-28 shrink-0 font-mono text-xs",
                      active ? "text-primary" : "text-muted-foreground/60",
                    )}
                  >
                    {name}
                  </span>

                  <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    {active ? (
                      <svg
                        viewBox="0 0 200 8"
                        preserveAspectRatio="none"
                        className="absolute inset-0 size-full"
                      >
                        <path
                          d="M2 4 H198"
                          pathLength={100}
                          className="stroke-primary/25"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M2 4 H198"
                          pathLength={100}
                          className="scene-dash stroke-primary"
                          strokeWidth="6"
                          strokeLinecap="round"
                          style={
                            {
                              "--dash-duration": "2.6s",
                              "--dash-delay": `${index * 0.7}s`,
                            } as React.CSSProperties
                          }
                        />
                      </svg>
                    ) : null}
                  </span>

                  <span
                    className={cn(
                      "w-24 shrink-0 text-right text-[11px]",
                      active ? "text-muted-foreground" : "text-muted-foreground/50",
                    )}
                  >
                    {state}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
              <p className="font-mono text-[10px] tracking-[0.16em] text-primary uppercase">
                application-aware routing
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Deciding continuously, not once at install
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function SdWanSections() {
  return (
    <>
      {/* The decisions */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              In practice
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Four decisions it makes without you
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Each of these is something a person would otherwise have to
              notice, diagnose and act on — usually after somebody complained.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {sdwanDecisions.map(({ condition, action, icon: Icon }, index) => (
              <ScrollReveal
                as="li"
                key={condition}
                delay={index * 80}
                shift={14}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-colors hover:border-primary/40 lg:p-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
                />

                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      When
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-balance">
                      {condition}
                    </h3>
                  </div>
                </div>

                <p className="mt-6 border-t border-border pt-5 text-pretty text-muted-foreground">
                  {action}
                </p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Before and after */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              What changes
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Opening the tenth branch
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              The case for SD-WAN is rarely a single site. It is what happens
              to the work when there are a lot of them.
            </p>
          </ScrollReveal>

          <ul className="mt-14 space-y-px overflow-hidden rounded-2xl bg-border">
            {sdwanBeforeAfter.map(({ before, after }, index) => (
              <ScrollReveal
                as="li"
                key={before}
                delay={index * 70}
                shift={10}
                className="group grid items-center gap-4 bg-background p-6 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:p-7"
              >
                <span className="text-sm text-muted-foreground/70 line-through decoration-muted-foreground/30">
                  {before}
                </span>
                <MoveRight
                  className="hidden size-4 shrink-0 text-primary transition-transform duration-500 group-hover:translate-x-1 sm:block"
                  aria-hidden
                />
                <span className="text-sm font-medium">{after}</span>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
