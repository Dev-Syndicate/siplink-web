import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, Check, CircleCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  planBaseFeatures,
  planMatrix,
  planNote,
  plans,
  unlimitedPlans,
} from "@/lib/site";

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
                "relative flex h-full flex-col",
                plan.featured &&
                  "overflow-hidden bg-primary text-primary-foreground ring-0 lg:-mt-4 lg:shadow-xl"
              )}
            >
              {plan.featured ? (
                <span className="absolute top-0 right-0 z-10 rounded-tr-xl rounded-bl-lg bg-primary-foreground/20 px-4 py-1.5 text-xs font-medium tracking-wider text-primary-foreground uppercase">
                  Most popular
                </span>
              ) : null}

              <CardHeader>
                <h2 className="text-2xl font-semibold">{plan.name}</h2>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    plan.featured
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {plan.blurb}
                </p>

                <p className="mt-6 flex items-end gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "pb-1 text-sm",
                      plan.featured
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    )}
                  >
                    / user / month
                  </span>
                </p>

                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className={cn(
                    "mt-6 w-full",
                    plan.featured &&
                      "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  )}
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
                      <CircleCheck
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          plan.featured
                            ? "text-primary-foreground"
                            : "text-primary"
                        )}
                        aria-hidden
                      />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                  {planBaseFeatures.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm">
                      <CircleCheck
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          plan.featured
                            ? "text-primary-foreground/70"
                            : "text-primary/60"
                        )}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          plan.featured
                            ? "text-primary-foreground/85"
                            : "text-muted-foreground"
                        )}
                      >
                        {feature}
                      </span>
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

      {/* Full comparison */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              Compare every feature
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              The full breakdown across all three plans.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-3xl border-collapse text-sm">
              <thead className="bg-background">
                <tr>
                  <th
                    scope="col"
                    className="border border-border px-4 py-4 text-center font-semibold"
                  >
                    Features
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      scope="col"
                      className={cn(
                        "w-44 border border-border px-4 py-4 text-center font-semibold",
                        plan.featured && "text-primary"
                      )}
                    >
                      {plan.name}
                      <span className="block text-xs font-normal text-muted-foreground">
                        {plan.price} / user / mo
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {planMatrix.map((group) => (
                  <Fragment key={group.heading}>
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className="border border-border bg-primary/5 px-4 py-3 text-center text-base font-semibold text-primary"
                      >
                        {group.heading}
                      </th>
                    </tr>

                    {group.rows.map((row, rowIndex) => (
                      <tr
                        key={row.label}
                        className={cn(rowIndex % 2 === 1 && "bg-muted/40")}
                      >
                        <th
                          scope="row"
                          className="border border-border px-4 py-3 text-center font-normal"
                        >
                          {row.label}
                        </th>
                        {row.tiers.map((value, i) => (
                          <td
                            key={i}
                            className="border border-border px-4 py-3 text-center"
                          >
                            {typeof value === "string" ? (
                              <span className="text-xs font-medium">
                                {value}
                              </span>
                            ) : value ? (
                              <>
                                <Check
                                  className="mx-auto size-4 text-primary"
                                  aria-hidden
                                />
                                <span className="sr-only">Included</span>
                              </>
                            ) : (
                              <span className="sr-only">Not included</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Unlimited plans */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              Our unlimited plans
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Unlimited calling, priced to your usage.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {unlimitedPlans.map(({ title, description }) => (
              <Card key={title} className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                  </p>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/contact">Get a quote</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trial */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            See SipLink on your own workflows
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Book a walkthrough on any plan and our team will help you port your
            existing numbers and configure your extensions.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">Book a demo</Link>
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
