import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Cloud,
  GitBranch,
  Network,
  Rocket,
  Server,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WhyChooseItem {
  step: string;
  kicker: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

const secondaryFeatures: WhyChooseItem[] = [
  {
    step: "02",
    kicker: "SIP SOLUTIONS",
    title: "SIP trunking expertise",
    description:
      "A properly engineered SIP solution is critical — wrong configurations cause issues and unnecessary cost. We know the real-world challenges.",
    icon: GitBranch,
    href: "/products/sip-trunking",
  },
  {
    step: "03",
    kicker: "MIGRATION",
    title: "Proven migrations",
    description:
      "Over the years we have helped businesses move from traditional systems to IP, reducing cost and improving productivity.",
    icon: Rocket,
    href: "/why-siplink",
  },
  {
    step: "04",
    kicker: "HOSTED SERVICES",
    title: "Leading-edge hosted services",
    description:
      "Hosted PBX on a dedicated IP network, continuously upgraded with the latest features, with disaster recovery and business continuity for every client.",
    icon: Server,
    href: "/products/hosted-pbx",
  },
  {
    step: "05",
    kicker: "INFRASTRUCTURE",
    title: "Multiple cloud platforms",
    description:
      "Several cloud platforms so the solution fits your requirements, adapting to different environments for optimal performance.",
    icon: Cloud,
    href: "/solutions",
  },
];

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Subtle ambient lighting gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/4 size-[550px] rounded-full bg-primary/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/4 size-[450px] rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 sm:w-12 bg-primary/40" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-primary uppercase">
              Value Proposition
            </span>
            <span className="h-px w-8 sm:w-12 bg-primary/40" />
          </div>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Why choose SipLink
          </h2>

          <p className="mt-4 text-base sm:text-lg text-pretty text-muted-foreground">
            What we bring to every deployment, beyond the platform itself.
          </p>
        </div>

        {/* 1. Featured Hero Card (01 - Expertise) */}
        <Card className="group relative mt-12 sm:mt-16 overflow-hidden rounded-3xl border-border/80 bg-gradient-to-r from-card via-card to-rose-50/40 dark:to-rose-950/20 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
          {/* Subtle ambient rose glow behind the 3D illustration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 size-96 rounded-full bg-primary/5 blur-3xl"
          />

          <CardContent className="relative p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Content */}
              <div className="flex flex-col justify-between lg:col-span-6 xl:col-span-5">
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-xs">
                      <Network className="size-6 sm:size-7" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
                        Expertise
                      </span>
                      <h3 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        Leaders in VoIP communications
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    Network design and solution experts in unified communications,
                    with deep experience across IP voice.
                  </p>
                </div>

                {/* Pill Badges */}
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {["Reliable", "Scalable", "Enterprise-ready"].map((pill) => (
                    <span
                      key={pill}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-transform duration-200 hover:scale-105"
                    >
                      <Check className="size-3.5 stroke-[2.5]" aria-hidden="true" />
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: 3D Isometric Network Render (100% visible, seamlessly blended) */}
              <div className="relative flex items-center justify-center lg:col-span-6 xl:col-span-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 rounded-full bg-rose-200/20 dark:bg-primary/5 blur-2xl"
                />
                <div className="relative aspect-[16/9] w-full max-w-[720px] min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]">
                  <Image
                    src="/images/about/why-choose-voip-network-hd.png"
                    alt="SipLink 3D isometric VoIP communications network showing connected cloud, IP desk phone, mobile, laptop and server infrastructure"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Bottom 2x2 Grid of Differentiator Cards */}
        <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 md:grid-cols-2">
          {secondaryFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.step}
                className="group relative overflow-hidden rounded-3xl border-border/80 bg-card/95 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-md"
              >
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Pink Icon container */}
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-xs">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>

                    {/* Middle: Content */}
                    <div className="flex-1 min-w-0 pr-12 sm:pr-14">
                      <span className="font-mono text-[11px] font-bold tracking-wider text-primary uppercase">
                        {item.kicker}
                      </span>
                      <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        <Link href={item.href} className="focus:outline-hidden">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground text-pretty">
                        {item.description}
                      </p>
                    </div>

                    {/* Right column: Ghost number + Circle Arrow Button */}
                    <div className="absolute top-6 right-6 flex flex-col items-center">
                      <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-primary/15 dark:text-primary/25 select-none leading-none transition-colors group-hover:text-primary/30">
                        {item.step}
                      </span>
                      <Button
                        asChild
                        size="icon-xs"
                        variant="outline"
                        className="mt-3.5 size-9 rounded-full border-primary/25 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:scale-105"
                      >
                        <Link href={item.href} aria-label={`Learn more about ${item.title}`}>
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
