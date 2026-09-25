import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * The opening band on /internet/business-broadband/features.
 *
 * Deliberately not the Plans band. That one floats four cards over the
 * artwork to say "these are the inputs"; this one runs a single rail of
 * applications along the foot of the section, lighting one after another, to
 * say the opposite thing — not a set of choices but a queue of traffic all
 * arriving on one line. Same image treatment, different argument, different
 * shape.
 *
 * The artwork (an orbiting globe over light ribbons) is anchored right, where
 * the picture's subject sits; its left is an almost empty wash, so the text
 * column needs very little scrim to stay legible.
 */

/** The rail along the foot. Order is the working day, roughly. */
const carries = [
  "Email",
  "Microsoft 365",
  "CRM and ERP",
  "Video conferencing",
  "VoIP",
  "File sharing",
  "Payments",
  "CCTV",
  "Remote access",
];

export function FeaturesHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <Image
        src="/internet/features.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-right dark:opacity-40"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/65"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-16 lg:px-10 lg:pt-14 lg:pb-20">
        <ScrollReveal className="max-w-2xl">
          <Badge variant="secondary" className="font-mono tracking-widest">
            Business broadband features
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            One line.
            <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              {" "}
              Everything you run on it.
            </span>
          </h1>

          <p className="mt-7 text-lg text-pretty text-muted-foreground">
            A business connection is not a faster consumer one. It is judged on
            what keeps working during the busiest hour of the week — and on
            what can be added to it when a household never would.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Get a business broadband quote
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/internet/business-broadband/plans">
                How a plan is sized
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* The rail. Each chip takes its turn lighting up, so the row reads as
            traffic arriving rather than as a static list of logos. The whole
            strip is decorative — every application on it is named again in
            the page's own "Supports" list. */}
        <ScrollReveal delay={200} className="mt-16">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            Carrying, all at once
          </p>
          <ul aria-hidden className="mt-4 flex flex-wrap gap-2.5">
            {carries.map((item, index) => (
              <li
                key={item}
                style={
                  {
                    "--turn-delay": `${index * 0.45}s`,
                    "--turn-duration": `${carries.length * 0.45}s`,
                  } as React.CSSProperties
                }
                className="relative overflow-hidden rounded-full border border-border/70 bg-background/60 px-3.5 py-1.5 text-sm backdrop-blur-sm"
              >
                <span
                  className="feature-turn absolute inset-0 bg-primary/12"
                  style={
                    {
                      "--turn-delay": `${index * 0.45}s`,
                      "--turn-duration": `${carries.length * 0.45}s`,
                    } as React.CSSProperties
                  }
                />
                <span className="relative">{item}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
