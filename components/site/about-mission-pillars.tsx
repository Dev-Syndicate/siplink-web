import {
  Headset,
  Layers,
  Network,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { AboutMissionVision } from "@/components/site/about-mission-vision";
import { RevealGroup } from "@/components/site/reveal-group";

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
        {/* TIER 1: Strategic Foundation — Mission & Vision */}
        <AboutMissionVision />

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
