import Image from "next/image";
import {
  ArrowRight,
  Globe,
  Headset,
  Layers,
  Network,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { companyMissionVision } from "@/lib/company";

interface PillarItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const pillars: PillarItem[] = [
  {
    title: "Reliability",
    description:
      "Engineered with carrier-neutral POPs, redundant routes, and proactive 24/7 network monitoring to safeguard business continuity.",
    icon: Network,
  },
  {
    title: "Scalability",
    description:
      "Designed to scale smoothly from small growing teams to multi-branch enterprises without costly infrastructure overhauls.",
    icon: Layers,
  },
  {
    title: "Security",
    description:
      "A security-first architecture adhering to rigorous regulatory frameworks including DoT, ISO/IEC 27001, SOC 2, HIPAA, and GDPR.",
    icon: ShieldCheck,
  },
  {
    title: "Service",
    description:
      "Dedicated technical onboarding, responsive support, and real telecom engineers always available to assist your business.",
    icon: Headset,
  },
];

export function AboutMissionPillars() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/40 via-background to-background py-16 sm:py-20 lg:py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* =========================================================================
            TIER 1: Strategic Foundation & Mission / Vision with Boardroom Image
           ========================================================================= */}
        <div className="relative lg:min-h-[520px]">
          {/* The photograph is the banner's backdrop, not a column item —
              exactly the pattern the homepage hero uses: it sits behind the
              copy at full height and is masked by a scrim, rather than
              living in its own grid cell beside the text. That is what
              lets the mission/vision cards overlap its left edge the way
              the reference does, instead of two boxes sitting side by side. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] overflow-hidden rounded-3xl lg:block">
            <Image
              src="/images/about/about-mission-boardroom.png"
              alt="SipLink global technology leadership team in boardroom reviewing network infrastructure"
              fill
              sizes="62vw"
              className="object-cover object-right-top"
              priority
            />
            {/* Scrim covers only the zone the text and cards occupy, and
                clears by 42% — the same graduated fade the homepage hero
                uses, which is also what hides the photo's own baked-in
                text in its lower-left corner. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-muted/85 from-0% via-muted/40 via-22% to-transparent to-42%"
            />
          </div>

          {/* Text column: a hard max-width well short of the photo's
              opaque-to-transparent transition, so it can never be drawn
              under the photo regardless of viewport width. */}
          <div className="relative max-w-xl lg:max-w-lg xl:max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
                Strategic Foundation
              </span>
              <span className="h-px w-10 sm:w-14 bg-primary/60 inline-block" />
            </div>

            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Our Mission,
              <br />
              Vision <span className="text-primary font-extrabold">&</span> Pillars
            </h2>

            <p className="mt-4 max-w-sm text-sm sm:text-base text-muted-foreground leading-relaxed lg:max-w-xs xl:max-w-sm">
              Built on architectural principles that protect uptime, simplify scalability, and provide direct access to real telecom engineers.
            </p>
          </div>

          {/* Mobile / Tablet Boardroom Visual — the backdrop treatment only
              works at the width where the scrim has room to fade; below
              `lg` the photo returns as an ordinary framed image instead. */}
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-border/70 lg:hidden aspect-[16/10] w-full">
            <Image
              src="/images/about/about-mission-boardroom.png"
              alt="SipLink technology leadership team in boardroom reviewing global telecom network infrastructure"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Mission & Vision Cards: a row, overlapping the photo's left
              edge the way the reference does — capped narrow enough that
              neither card crosses into the photo's fully-opaque zone. */}
          <div className="relative mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:max-w-3xl">
            {/* Card 1: Our Mission */}
            <div className="rounded-2xl bg-card/95 p-6 shadow-lg shadow-foreground/10 backdrop-blur-sm flex flex-col justify-between sm:p-7">
              <div>
                <div className="flex items-center gap-3.5">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Rocket className="size-5" />
                  </span>
                  <div>
                    <span className="font-mono text-[11px] font-bold tracking-widest text-primary uppercase">
                      Purpose
                    </span>
                    <h3 className="text-lg font-bold text-foreground">
                      {companyMissionVision.mission.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-3.5 text-xs sm:text-[13px] leading-relaxed text-muted-foreground">
                  {companyMissionVision.mission.statement}
                </p>
              </div>

              <div className="mt-5">
                <ArrowRight className="size-4 text-primary" />
              </div>
            </div>

            {/* Card 2: Our Vision */}
            <div className="rounded-2xl bg-card/95 p-6 shadow-lg shadow-foreground/10 backdrop-blur-sm flex flex-col justify-between sm:p-7">
              <div>
                <div className="flex items-center gap-3.5">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Globe className="size-5" />
                  </span>
                  <div>
                    <span className="font-mono text-[11px] font-bold tracking-widest text-primary uppercase">
                      Destination
                    </span>
                    <h3 className="text-lg font-bold text-foreground">
                      {companyMissionVision.vision.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-3.5 text-xs sm:text-[13px] leading-relaxed text-muted-foreground">
                  {companyMissionVision.vision.statement}
                </p>
              </div>

              <div className="mt-5">
                <ArrowRight className="size-4 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TIER 2: The Foundation of Reliable Connectivity — Four Pillars
           ========================================================================= */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-14 border-t border-border/60">
          {/* Header Row: Left Title, Right Descriptive Paragraph */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 sm:gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
                  Our Pillars
                </span>
                <span className="h-px w-10 sm:w-14 bg-primary/60 inline-block" />
              </div>
              <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                The Foundation
                <br />
                of Reliable Connectivity
              </h3>
            </div>

            <p className="max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed lg:max-w-md">
              Our architecture and operations are built around four key pillars that ensure performance, security, and an exceptional experience for every business we serve.
            </p>
          </div>

          {/* 4 Foundation Pillars Grid, matching the reference: a flat pink
              icon chip, title, description. */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="group relative flex flex-col justify-between rounded-2xl bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-7"
              >
                <div>
                  <span className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </span>

                  <h4 className="text-lg font-bold text-foreground">
                    {title}
                  </h4>

                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
