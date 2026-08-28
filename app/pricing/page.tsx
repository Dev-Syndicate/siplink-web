import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { planBaseFeatures, planNote, plans } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SipLink plans from $18.95 per user per month. Value, Business and Enterprise tiers, minimum 10 lines.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 size-[620px] -translate-x-1/2 rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10 lg:py-24">
          <Badge variant="secondary" className="rounded-full">
            Transparent pricing
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Scalable communication, predictable costs.
          </h1>
          <p className="mt-6 text-lg text-pretty text-muted-foreground">
            No hidden fees and no complex contracts. Choose the plan that fits
            your business and scale up as you grow.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex h-full flex-col",
                plan.featured && "ring-2 ring-primary lg:-mt-4 lg:shadow-lg"
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-2xl font-semibold">{plan.name}</h2>
                  {plan.featured ? (
                    <Badge className="rounded-full">Most popular</Badge>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.blurb}
                </p>

                <p className="mt-6 flex items-end gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm text-muted-foreground">
                    / user / month
                  </span>
                </p>

                <Button
                  asChild
                  size="lg"
                  variant={plan.featured ? "default" : "secondary"}
                  className="mt-6 w-full"
                >
                  <Link href="/contact">Choose {plan.name}</Link>
                </Button>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-sm font-medium">
                  {plan.adds.length > 0
                    ? `Everything in ${plan.name === "Enterprise" ? "Business" : "Value"}, plus:`
                    : "Core plan includes:"}
                </p>
                <ul className="mt-3 space-y-3">
                  {plan.adds.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                  {planBaseFeatures.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary/60"
                        aria-hidden
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          {planNote}
        </p>
      </section>

      {/* Trial */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Try SipLink free for three days
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Start on any plan and our team will help you port your existing
            numbers and configure your extensions.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">Start free trial</Link>
          </Button>
        </div>
      </section>

      {/* Custom quote */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-border bg-gradient-to-br from-brand-from/10 to-brand-to/5 px-8 py-12 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Need a custom setup for high volume?
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              For larger deployments or specialised integration requirements, our
              team will design a configuration around your workflows.
            </p>
          </div>
          <Button asChild size="lg" className="group shrink-0">
            <Link href="/contact">
              Request a custom quote
              <ArrowRight
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
