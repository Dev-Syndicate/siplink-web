import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  CircleCheck,
  ShieldCheck,
  Sparkles,
  TableProperties,
} from "lucide-react";

import { AppsShowcase } from "@/components/site/apps-showcase";
import { ClosingCta } from "@/components/site/closing-cta";
import { PricingHero } from "@/components/site/pricing-hero";
import { PricingPlans } from "@/components/site/pricing-plans";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addOns, aiAddOns, tiers } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SipLink plans from $10.99 per line per month: Core, Business Pro and Enterprise Plus, with optional add-ons and AI add-ons.",
};

const pricingFaqs = [
  {
    question: "How do you buy a phone number from SipLink?",
    answer:
      "Sign in to the SipLink dashboard, choose a country and area code, pick a local, toll-free or mobile number and add it to your account. Our team can also provision numbers for you during onboarding.",
  },
  {
    question: "How do I port a number to SipLink?",
    answer:
      "Share your current carrier details and a recent bill, and our team handles the port request. We confirm the schedule for your numbers before anything changes, so customers keep reaching you throughout the switch.",
  },
];

/** Each feature is included from the plan that introduces it upwards. */
const comparison = tiers.flatMap((tier, from) =>
  tier.features.map(({ title }) => ({
    title,
    tiers: tiers.map((_, i) => i >= from),
  }))
);

export default function PricingPage() {
  return (
    <>
      <PricingHero />

      <section className="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <PricingPlans />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-20">
        {/* Enterprise-ready */}
        <Card className="mt-6 gap-0 overflow-hidden py-0 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <CardHeader className="gap-3 p-8 lg:p-10">
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <ShieldCheck className="size-6 text-primary" aria-hidden />
              Enterprise-Ready Communication
            </CardTitle>
            <CardDescription className="max-w-2xl text-base text-pretty">
              Scalable business telephony, centralized call management,
              collaboration capabilities, and integration options to support
              your communication workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-8 pb-8 sm:flex-row lg:p-10">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Book a Demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary text-primary"
            >
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Full comparison */}
        <Accordion
          id="compare"
          type="single"
          collapsible
          className="mt-6 scroll-mt-24 rounded-xl border border-border"
        >
          <AccordionItem value="compare">
            <AccordionTrigger className="px-6 py-4 text-base hover:no-underline">
              <span className="flex items-center gap-2">
                <TableProperties className="size-4 text-primary" aria-hidden />
                View full feature comparison
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-2xl border-collapse text-sm">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border border-border px-4 py-4 text-left font-semibold"
                      >
                        Features
                      </th>
                      {tiers.map((plan) => (
                        <th
                          key={plan.name}
                          scope="col"
                          className={cn(
                            "w-40 border border-border px-4 py-4 text-center font-semibold",
                            plan.popular && "text-primary"
                          )}
                        >
                          {plan.name}
                          <span className="block text-xs font-normal text-muted-foreground">
                            ${plan.price.USD} / line / mo
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.title} className="even:bg-muted/40">
                        <th
                          scope="row"
                          className="border border-border px-4 py-3 text-left font-normal"
                        >
                          {row.title}
                        </th>
                        {row.tiers.map((included, i) => (
                          <td
                            key={i}
                            className="border border-border px-4 py-3 text-center"
                          >
                            {included ? (
                              <>
                                <Check
                                  className="mx-auto size-4 text-primary"
                                  aria-hidden
                                />
                                <span className="sr-only">Included</span>
                              </>
                            ) : (
                              <span className="text-muted-foreground">
                                –<span className="sr-only">Not included</span>
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Optional add-ons */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Optional Add-ons
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
            Extend any plan with the services your teams need. Our team scopes
            each add-on with you.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {addOns.map(
              ({ title, subtitle, description, includes, icon: Icon }) => (
                <Card key={title}>
                  <CardHeader className="flex-row items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <CardTitle className="text-lg">{title}</CardTitle>
                      <CardDescription>{subtitle}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-pretty">{description}</p>
                    <p className="text-xs text-pretty text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Includes:
                      </span>{" "}
                      {includes}
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* SipLink AI add-ons */}
      <section className="relative overflow-hidden border-t border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Badge
            variant="outline"
            className="rounded-full border-primary/30 bg-background px-3 py-1 font-mono tracking-widest text-primary uppercase"
          >
            <Sparkles aria-hidden />
            SipLink AI
          </Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            SipLink AI Add-ons
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
            Add intelligence to every call: transcripts, summaries, voice
            assistance and analytics, configured for your workflows.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {aiAddOns.map(
              ({ title, subtitle, description, features, icon: Icon }) => (
                <Card
                  key={title}
                  className="relative transition-shadow hover:shadow-lg"
                >
                  <Badge
                    variant="secondary"
                    className="absolute top-4 right-4 text-primary"
                  >
                    AI Add-on
                  </Badge>
                  <CardHeader className="flex-row items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <CardTitle className="text-lg">{title}</CardTitle>
                      <CardDescription>{subtitle}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <p className="text-sm text-pretty">{description}</p>
                    <div>
                      <p className="text-xs font-semibold tracking-wider uppercase">
                        Features
                      </p>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {features.map((feature) => (
                          <li key={feature} className="flex gap-2 text-sm">
                            <CircleCheck
                              className="mt-0.5 size-4 shrink-0 text-primary"
                              aria-hidden
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full"
                    >
                      <Link href="/contact">Talk to Sales</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {pricingFaqs.map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`faq-${index}`}>
                <AccordionTrigger className="py-4 text-base">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-pretty text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <ClosingCta
        heading="Find the right plan for your team"
        body="Book a demo and our team will walk you through the plans, add-ons and AI features that fit your workflows."
        action="Book a Demo"
        secondary={{ label: "Talk to Sales", href: "/contact" }}
      />

      <AppsShowcase />
    </>
  );
}
