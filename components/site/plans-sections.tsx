import Link from "next/link";
import { ArrowRight, Check, Gauge, Minus } from "lucide-react";

import { PlanBusyHour } from "@/components/site/plan-busy-hour";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Button } from "@/components/ui/button";
import { planProfiles, planStepUp } from "@/lib/internet";

/**
 * The supporting sections on /internet/business-broadband/plans, rendered
 * after the page's own content.
 *
 * The page asserts that a plan is sized from the work rather than picked off
 * a tier list. These three sections are what make that credible: the shapes
 * of office we actually quote for, what a day puts on the line hour by hour,
 * and — last, and deliberately unprofitable — the point at which the honest
 * answer stops being broadband at all.
 */
export function PlansSections() {
  return (
    <>
      {/* Office shapes */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Four shapes
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Which of these is your office?
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Most businesses we quote for are a version of one of these. None
              of them is a plan — they are the questions a plan comes out of.
            </p>
          </ScrollReveal>

          <ul className="mt-14 grid gap-6 lg:grid-cols-2">
            {planProfiles.map(
              ({ title, people, situation, drives, usually, icon: Icon }, index) => (
                <ScrollReveal
                  as="li"
                  key={title}
                  delay={index * 80}
                  shift={14}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-colors hover:border-primary/40 lg:p-8"
                >
                  {/* A wash that arrives from the corner on hover — the card
                      warms rather than lifting, so a two-column grid does not
                      appear to shuffle as the pointer crosses it. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {title}
                      </h3>
                      <p className="font-mono text-xs tracking-wide text-muted-foreground">
                        {people}
                      </p>
                    </div>
                  </div>

                  <p className="relative mt-6 text-pretty text-muted-foreground">
                    {situation}
                  </p>

                  <div className="relative mt-6 border-t border-border pt-5">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      What drives the sizing
                    </p>
                    <p className="mt-2 text-sm text-pretty">{drives}</p>
                  </div>

                  <div className="relative mt-5">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      Usually added
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {usually.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ),
            )}
          </ul>
        </div>
      </section>

      {/* The working day */}
      <PlanBusyHour />

      {/* Where broadband stops being the answer */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              The honest version
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              When broadband is right, and when it is not
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              A bigger broadband plan is not always the answer to a broadband
              problem. If your situation is on the right, we would rather tell
              you now than sell you the upgrade twice.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border lg:grid-cols-2">
            <ScrollReveal className="bg-background p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Check className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-balance">
                  {planStepUp.stay.heading}
                </h3>
              </div>

              <ul className="mt-7 space-y-3.5">
                {planStepUp.stay.points.map((point, index) => (
                  <ScrollReveal
                    as="li"
                    key={point}
                    delay={index * 60}
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

              <p className="mt-8 text-sm text-muted-foreground/70">
                Stay where you are. Add static IP, a managed router or Wi-Fi if
                you need them.
              </p>
            </ScrollReveal>

            {/* The tinted half, because this is the column we want read. */}
            <ScrollReveal
              delay={100}
              className="bg-gradient-to-br from-primary/5 to-background p-8 lg:p-10"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Gauge className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-balance">
                  {planStepUp.move.heading}
                </h3>
              </div>

              <ul className="mt-7 space-y-3.5">
                {planStepUp.move.points.map((point, index) => (
                  <ScrollReveal
                    as="li"
                    key={point}
                    delay={index * 60}
                    shift={8}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <Minus
                      className="mt-1.5 size-3 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="text-muted-foreground">{point}</span>
                  </ScrollReveal>
                ))}
              </ul>

              <Button asChild className="mt-8">
                <Link href="/internet/dedicated-internet">
                  See dedicated internet
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
