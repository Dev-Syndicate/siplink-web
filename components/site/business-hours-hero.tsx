"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CallHunt } from "@/components/site/call-hunt";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * The small-business hero: one call, caught.
 *
 * What this reader is afraid of is not topology, it is the call that rang
 * out while the desk was busy and the customer who rang the next name on the
 * list instead. So the hero is the answer to that — a call arriving and
 * walking its path until someone has it.
 *
 * There is nothing to operate. The figure runs one unattended loop through a
 * morning call and an evening one, so business hours make their point by
 * changing the path rather than by offering a switch: at twenty past seven
 * the front desk is skipped instead of rung. A toggle would have asked the
 * reader to do work before the page had said anything.
 *
 * The evening ink lives on the panel now rather than on this section — see
 * the note in `CallHunt`. The section keeps one ground so that a figure
 * looping on its own cannot strobe the whole viewport.
 */
export function BusinessHoursHero({
  group,
  headline,
  standfirst,
}: {
  group: string;
  headline: string;
  standfirst: string;
}) {
  const still = useReducedMotion();

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
        <Link
          href="/solutions"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          {group}
        </Link>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h1 className="max-w-[16ch] text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {headline}
            </h1>

            <p className="mt-6 max-w-[48ch] text-lg text-pretty text-muted-foreground">
              {standfirst}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Talk to us</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-center">
            <CallHunt still={still} />
          </div>
        </div>
      </div>
    </section>
  );
}
