"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The reference's product row: items side by side, prices beneath, one small
 * centred footnote. Three tiers replace five bottles, and the five liquid
 * colours become a three-step tint ladder so the escalation still reads.
 *
 * Prices and features are verbatim from siplink.in/siplink-plan.php.
 * NOTE — USD only, and every plan is scoped to US calling while the company
 * sells into India. INR pricing is unresolved: content_2.md §20.8.
 */
const tiers = [
  {
    name: "Value",
    price: "18.95",
    blurb: "For small teams moving off desk phones.",
    features: [
      "Unlimited calling within the USA",
      "Free local number",
      "IP-phone free lease",
      "Business SMS & audio conferencing",
      "Call recording & virtual fax",
      "Outlook and Google integration",
    ],
    tone: "plain" as const,
  },
  {
    name: "Business",
    price: "20.95",
    blurb: "For teams that live in Microsoft 365.",
    features: [
      "Everything in Value",
      "Microsoft Teams, Outlook, Google",
      "Video calling (peer-to-peer)",
      "Voicemail to email",
      "Salesforce and Ceipal integrations",
    ],
    tone: "tint" as const,
    featured: true,
  },
  {
    name: "Enterprise",
    price: "24.95",
    blurb: "For contact centres and distributed teams.",
    features: [
      "Everything in Business",
      "Unlimited video calling",
      "Screen sharing with video and audio",
      "Team messaging",
      "24x7 assistance",
    ],
    tone: "ink" as const,
  },
];

export function Pricing() {
  const reduce = useReducedMotion();

  return (
    <section id="pricing" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <h2 className="text-display text-center text-[clamp(2rem,6vw,4.5rem)] text-foreground">
          Pick your plan.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-lg text-muted-foreground">
          Per user, per month. Every plan includes the mobile apps, call
          recording and 24/7 support.
        </p>

        {/* Stretch, not items-start, so the three cards share a baseline and
            only the featured tier breaks the line via its negative margin. */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={reduce ? undefined : { opacity: 0, y: 32 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "flex h-full flex-col rounded-3xl border p-7 sm:p-8",
                tier.tone === "plain" && "border-border bg-background",
                tier.tone === "tint" && "border-primary/30 bg-brand-tint",
                tier.tone === "ink" && "border-foreground bg-foreground",
                tier.featured && "lg:-mt-6 lg:pb-14"
              )}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={cn(
                    "text-lg font-semibold",
                    tier.tone === "ink" ? "text-background" : "text-foreground"
                  )}
                >
                  {tier.name}
                </h3>
                {tier.featured && (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary-foreground uppercase">
                    Most picked
                  </span>
                )}
              </div>

              <p
                className={cn(
                  "mt-1.5 text-sm",
                  tier.tone === "ink"
                    ? "text-background/70"
                    : "text-muted-foreground"
                )}
              >
                {tier.blurb}
              </p>

              <div className="mt-7 flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-display text-[clamp(2.5rem,7vw,3.5rem)]",
                    tier.tone === "ink" ? "text-background" : "text-brand-deep"
                  )}
                >
                  ${tier.price}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    tier.tone === "ink"
                      ? "text-background/60"
                      : "text-muted-foreground"
                  )}
                >
                  /user /mo
                </span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        tier.tone === "ink" ? "text-primary" : "text-brand-deep"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm leading-relaxed",
                        tier.tone === "ink"
                          ? "text-background/85"
                          : "text-foreground/80"
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="xl"
                variant={tier.tone === "ink" ? "default" : "brand"}
                className={cn("mt-8 w-full", tier.tone === "ink" && "rounded-full")}
              >
                <a href="#contact">
                  Get started
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* The reference's centred footnote. This one carries a real constraint:
            10 lines minimum puts the entry commitment at $189.50/month. */}
        <p className="mt-12 text-center text-sm font-medium text-brand-deep">
          All plans are billed per user, per month, with a 10-line minimum.
        </p>
      </div>
    </section>
  );
}
