import Link from "next/link";
import { ArrowRight, Check, Gauge, Minus } from "lucide-react";

import { PlanBusyHour } from "@/components/site/plan-busy-hour";
import { PlanDirectionScene } from "@/components/site/plan-direction-scene";
import { PlanLoadScene } from "@/components/site/plan-load-scene";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Button } from "@/components/ui/button";
import { planProfiles, planStepUp } from "@/lib/internet";

/**
 * The supporting sections on /internet/business-broadband/plans, rendered
 * after the page's own content.
 *
 * The page asserts that a plan is sized from the work rather than picked off
 * a tier list. These sections are what make that credible: the shapes of
 * office we actually quote for, everything that shares one line, what a day
 * puts on it hour by hour, which direction the work travels — and, last and
 * deliberately unprofitable, the point at which the honest answer stops
 * being broadband at all.
 *
 * Two of them are drawn rather than written. The animated scenes come from
 * the same kit as the capability scenes on the solutions pages (scene-kit),
 * which is the point: this page is arguing about load, and load is a thing
 * that happens over time. A table of workloads states it; watching six of
 * them arrive on one line, or watching the same chips cross a wide lane and
 * a narrow one, is what makes it land. Both carry the section heading above
 * them and the stage full width beneath, as those pages do.
 */
export function PlansSections() {
  return (
    <>
      {/* Office shapes */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Office profiles
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Find the profile that matches your office
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Most businesses we work with match one of these profiles. Each is
              a starting point for the conversation, not a fixed package.
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

      {/* Everything that shares the line */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Shared connection
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              One connection carrying your entire workday
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Laptops, calls, meetings, card terminals, cameras and the
              overnight backup all share the same line, often at the same
              moment. See how the load builds through the day.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-12 lg:mt-14">
            <PlanLoadScene label="Six workloads, staff laptops, business voice, video meetings, card payments, cameras and cloud backup, joining one office connection until all six are live on it at the same time." />
          </ScrollReveal>
        </div>
      </section>

      {/* The working day */}
      <PlanBusyHour />

      {/* Which way the work travels */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Upload and download
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Upload speed matters as much as download
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Connections are usually advertised on download speed, but most
              everyday frustrations happen on the upload side: choppy meetings,
              slow file transfers, backups still running at nine. It is also
              where growth shows up first.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-12 lg:mt-14">
            <PlanDirectionScene label="The same day's traffic crossing two lanes of equal length: a wide download lane that clears quickly, and a narrow upload lane where video calls, file sharing, voice, cameras and backup are still queueing behind each other." />
          </ScrollReveal>
        </div>
      </section>


      {/* Where broadband stops being the answer */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Choosing the right service
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Leased line or dedicated internet: finding the right fit
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              A bigger plan is not always the answer. If your needs match the
              list on the right, dedicated internet will serve you better, and
              we will tell you that upfront rather than sell you an upgrade
              that falls short.
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
                Keep your current service, and add static IP, a managed router
                or Wi-Fi as you need them.
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
