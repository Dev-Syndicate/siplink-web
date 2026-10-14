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

import { RevealGroup } from "@/components/site/reveal-group";
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
          {/* Ambient brand-coloured blobs, drifting forever behind the
              banner — the same `.glass-orb` the frosted hero panels use, so
              the section never sits perfectly still even at rest. Two
              rather than one, on different periods, so neither the drift
              nor its reversal ever lines up with the other. */}
          <div
            aria-hidden
            className="glass-orb -top-24 left-10 size-80 bg-brand-to/30"
            style={
              {
                "--orb-duration": "9s",
                "--orb-x": "110px",
                "--orb-y": "70px",
              } as React.CSSProperties
            }
          />
          <div
            aria-hidden
            className="glass-orb bottom-0 left-1/3 size-64 bg-brand-from/25"
            style={
              {
                "--orb-duration": "12s",
                "--orb-x": "-90px",
                "--orb-y": "-60px",
              } as React.CSSProperties
            }
          />

          {/* The photograph is the banner's backdrop, not a column item —
              exactly the pattern the homepage hero uses: it sits behind the
              copy at full height and is masked by a scrim, rather than
              living in its own grid cell beside the text. That is what
              lets the mission/vision cards overlap its left edge the way
              the reference does, instead of two boxes sitting side by side. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] overflow-hidden rounded-3xl lg:block">
            <Image
              src="/images/about/about-mission-vision.png"
              alt="SipLink leadership team in a boardroom reviewing a global connectivity map at dusk"
              fill
              sizes="62vw"
              className="object-cover object-right-top"
              priority
            />
            {/* Scrim covers only the zone the text and cards occupy, and
                clears by 42% — the same graduated fade the homepage hero
                uses. The photo's own quiet left third (window, skyline) is
                what it fades over. */}
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

            <p className="mt-4 max-w-sm text-sm sm:text-base text-foreground/80 leading-relaxed lg:max-w-xs xl:max-w-sm">
              Built on architectural principles that protect uptime, simplify scalability, and provide direct access to real telecom engineers.
            </p>
          </div>

          {/* Mobile / Tablet Boardroom Visual — the backdrop treatment only
              works at the width where the scrim has room to fade; below
              `lg` the photo returns as an ordinary framed image instead. */}
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-border/70 lg:hidden aspect-[16/10] w-full">
            <Image
              src="/images/about/about-mission-vision.png"
              alt="SipLink leadership team in a boardroom reviewing a global connectivity map at dusk"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Mission & Vision Cards: a row, overlapping the photo's left
              edge the way the reference does. Each connects in rather than
              merely fading — a trace races in along the top edge, then the
              status dot flicks from a hollow ring to lit the moment the
              card lands, the same "ring, then answer" beat the rest of the
              site uses for a call connecting. Once live, a slow light runs
              the border forever: the line is open and stays open. */}
          <RevealGroup className="relative mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:max-w-3xl">
            {/* Card 1: Our Mission */}
            <div
              className="connect-in relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-6 shadow-lg shadow-foreground/10 backdrop-blur-sm transition-shadow duration-300 flex flex-col justify-between hover:shadow-2xl sm:p-7"
              style={{ "--reveal-index": 0 } as React.CSSProperties}
            >
              <span
                aria-hidden
                className="connect-in-trace absolute inset-x-0 top-0 h-[2px] origin-left bg-primary"
              />
              <div>
                <div className="flex items-center gap-3.5">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Rocket className="size-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold tracking-widest text-primary uppercase">
                        Purpose
                      </span>
                      <span
                        aria-hidden
                        className="connect-in-dot size-1.5 rounded-full"
                      />
                    </div>
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

            {/* Card 2: Our Vision — same beat, a step behind so the two
                connect in sequence rather than together. */}
            <div
              className="connect-in relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-6 shadow-lg shadow-foreground/10 backdrop-blur-sm transition-shadow duration-300 flex flex-col justify-between hover:shadow-2xl sm:p-7"
              style={{ "--reveal-index": 1 } as React.CSSProperties}
            >
              <span
                aria-hidden
                className="connect-in-trace absolute inset-x-0 top-0 h-[2px] origin-left bg-primary"
              />
              <div>
                <div className="flex items-center gap-3.5">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Globe className="size-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold tracking-widest text-primary uppercase">
                        Destination
                      </span>
                      <span
                        aria-hidden
                        className="connect-in-dot size-1.5 rounded-full"
                      />
                    </div>
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
          </RevealGroup>
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
              icon chip, title, description. Each rises in on its own beat
              as the grid scrolls into view, then idles with a slow,
              independent float — the outer box carries the reveal and the
              hover lift, an inner wrapper carries the continuous bob, on
              periods spaced so the four never move together. */}
          <RevealGroup className="motion-bold mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className="reveal-item transition-transform duration-300 motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.03]"
                style={{ "--reveal-index": index } as React.CSSProperties}
              >
                <div
                  className="card-float-bold group relative flex flex-col justify-between rounded-2xl bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-2xl sm:p-7"
                  style={
                    {
                      "--float-duration": `${3.2 + index * 0.4}s`,
                      "--float-distance": `${-12 - index}px`,
                      "--float-tilt": `${index % 2 === 0 ? -1 : 1}deg`,
                      "--float-delay": `${index * -0.9}s`,
                    } as React.CSSProperties
                  }
                >
                  <div>
                    <span className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
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
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
