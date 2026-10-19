import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import {
  AudioLines,
  BadgeCheck,
  Bot,
  Check,
  CircleCheck,
  IdCard,
  LayoutDashboard,
  MessageSquareText,
  ShieldAlert,
  ShieldCheck,
  TableProperties,
  type LucideIcon,
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tiers } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SipLink pricing for every team: Basic, Starter, Professional, Ultimate and Enterprise plans, plus add-ons.",
};

const enterpriseFeatures = [
  "Minimum 50 users",
  "Unlimited minutes to US/CA",
  "Service-Level Agreement (SLA)",
  "WhatsApp Business API",
  "Custom reports",
  "Custom onboarding",
  "Customized add-ons for other countries & SMS",
  "Custom data storage and API usage",
  "Developer support",
  "Dedicated account manager",
  "Priority support",
  "Dedicated compliance support",
  "Speech analytics or SipLink AI included",
  "WhatsApp/Slack support",
];

const proSuiteFeatures = [
  "Conference calls",
  "Warm transfer",
  "Smart dashboard",
  "Softphone",
  "Call transfer",
  "Blind transfer",
  "Last call details",
  "IP whitelisting",
  "Custom caller ID",
  "Call recording rights",
  "Number masking",
  "Smart DID routing",
  "Auto rotate",
  "AI voicemail drop",
  "Call disposition",
  "Unlimited QA/guest users",
  "Custom integrations",
];

const addOns: {
  title: string;
  price: string;
  unit: string;
  from?: boolean;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "AI Voice Agent",
    price: "$45",
    unit: "Per user/month",
    description:
      "AI-powered voice agent that handles calls and conversations automatically.",
    icon: Bot,
  },
  {
    title: "Dashboard User",
    price: "$15",
    unit: "Per user/month",
    description:
      "Invite users to access and manage features through the web app dashboard.",
    icon: LayoutDashboard,
  },
  {
    title: "CNAM",
    price: "$100",
    unit: "One-time setup cost",
    description:
      "CNAM (Caller ID Name) lets callers see your business name on incoming calls, available in the US.",
    icon: IdCard,
  },
  {
    title: "SMS Services",
    price: "$3",
    unit: "Per month",
    from: true,
    description:
      "SMS in the US and Canada follow A2P guidelines with applicable charges.",
    icon: MessageSquareText,
  },
  {
    title: "Remediation Service",
    price: "$100",
    unit: "Per number",
    description: "Get help removing the spam status from your number.",
    icon: ShieldAlert,
  },
  {
    title: "Spam Watch",
    price: "$3",
    unit: "Per number/month (US/CA)",
    description:
      "Monitor numbers to reduce spam flagging and maintain dialing reputation.",
    icon: ShieldCheck,
  },
  {
    title: "Branded Calling",
    price: "$0.12",
    unit: "Per call",
    description:
      "Display your business name and call reason on recipient screens before they pick up.",
    icon: BadgeCheck,
  },
  {
    title: "AI Copilot",
    price: "$10",
    unit: "Per user/month",
    description:
      "AI-powered call insights with transcription, summaries, sentiment, intent alerts and key topic analysis.",
    icon: AudioLines,
  },
];

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

const fairUsage = [
  "The service is provided to you as a business user for business or home office use. It may not be used for personal, residential, or non-business purposes, or resold without prior written permission from SipLink.",
  "Customers are prohibited from using the service for auto-dialing, predictive dialing, trunking, traffic pumping, or access stimulation.",
  "The business phone system is designed for business teams. If usage indicates call center-level bulk calling, SipLink may change your plan, apply call center rates, or suspend the account.",
  "If unusually high usage is detected that may impact network, API, or system performance, SipLink may temporarily suspend calling services without prior notice.",
  "Unlimited calling does not apply to premium or toll-free numbers.",
  "Unlimited calling applies only to domestic calls within the United States and Canada. International calls are billed at current rates.",
  "The Basic plan is free for the first 6 months from signup, after which users must upgrade to the Starter plan to continue using the service.",
  "Outgoing calls to the same number may not exceed 10 calls per hour.",
  "Parallel calls may not exceed 30% of total call capacity within the business phone system.",
];

/**
 * The comparison table, built from the plan cards: each feature is included
 * from the tier that introduces it upwards.
 */
const comparison = (() => {
  const groups = new Map<string, Map<string, number>>();
  tiers.forEach((tier, index) => {
    const sections = [
      ...tier.groups,
      ...(tier.integrations
        ? [{ heading: "Integrations", items: tier.integrations }]
        : []),
    ];
    for (const { heading, items } of sections) {
      const rows = groups.get(heading) ?? new Map<string, number>();
      for (const item of items) if (!rows.has(item)) rows.set(item, index);
      groups.set(heading, rows);
    }
  });
  return [...groups].map(([heading, rows]) => ({
    heading,
    rows: [...rows].map(([label, from]) => ({
      label,
      tiers: tiers.map((_, i) => i >= from),
    })),
  }));
})();

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2 text-sm">
      <CircleCheck
        className="mt-0.5 size-4 shrink-0 text-primary"
        aria-hidden
      />
      {children}
    </li>
  );
}

export default function PricingPage() {
  return (
    <>
      <PricingHero />

      <section className="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <PricingPlans />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-20">
        {/* Enterprise */}
        <Card
          id="enterprise"
          className="mt-6 scroll-mt-28 gap-0 overflow-hidden py-0 lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]"
        >
          <CardHeader className="gap-3 bg-primary/5 p-8 lg:p-10">
            <CardDescription className="text-xl text-foreground">
              Enterprise Plan
            </CardDescription>
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Talk to Us
            </CardTitle>
            <p className="text-sm text-pretty text-muted-foreground">
              For organizations with advanced requirements beyond standard
              plans.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-4 w-full rounded-full sm:w-56"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-8 lg:p-10">
            <p className="font-semibold">Includes all Ultimate plan features</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {enterpriseFeatures.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Pro Suite */}
        <Card className="mt-6 gap-0 py-0 lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <CardHeader className="gap-3 p-8 lg:p-10">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Get <span className="text-primary">MORE</span> with the Pro Suite
            </CardTitle>
            <p className="text-sm text-pretty text-muted-foreground">
              Here&rsquo;s what you&rsquo;re missing in the Essential plan and
              what you gain by upgrading.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full sm:w-56"
              >
                <Link href="/products">Explore More Features</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-full border-primary text-primary sm:w-56"
              >
                <Link href="/contact">Request a Demo</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 lg:p-10">
            <ul className="grid gap-3 sm:grid-cols-2">
              {proSuiteFeatures.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
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
                <table className="w-full min-w-3xl border-collapse text-sm">
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
                            "w-44 border border-border px-4 py-4 text-center font-semibold",
                            plan.popular && "text-primary"
                          )}
                        >
                          {plan.name}
                          <span className="block text-xs font-normal text-muted-foreground">
                            {plan.price === null
                              ? "Free"
                              : `$${plan.price} / user / mo`}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((group) => (
                      <Fragment key={group.heading}>
                        <tr>
                          <th
                            scope="colgroup"
                            colSpan={tiers.length + 1}
                            className="border border-border bg-primary/5 px-4 py-3 text-left font-semibold text-primary"
                          >
                            {group.heading}
                          </th>
                        </tr>
                        {group.rows.map((row) => (
                          <tr key={row.label} className="even:bg-muted/40">
                            <th
                              scope="row"
                              className="border border-border px-4 py-3 text-left font-normal"
                            >
                              {row.label}
                            </th>
                            {row.tiers.map((value, i) => (
                              <td
                                key={i}
                                className="border border-border px-4 py-3 text-center"
                              >
                                {value ? (
                                  <>
                                    <Check
                                      className="mx-auto size-4 text-primary"
                                      aria-hidden
                                    />
                                    <span className="sr-only">Included</span>
                                  </>
                                ) : (
                                  <span className="text-muted-foreground">
                                    –
                                    <span className="sr-only">
                                      Not included
                                    </span>
                                  </span>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Add-ons */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Explore Our Add-ons
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {addOns.map(
              ({ title, price, unit, from, description, icon: Icon }) => (
                <Card key={title} className="relative overflow-hidden">
                  <Badge
                    variant="secondary"
                    className="absolute top-0 right-0 rounded-none rounded-bl-md text-primary"
                  >
                    Add-On
                  </Badge>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle className="text-lg">{title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {from ? (
                      <p className="text-xs text-muted-foreground">
                        Starting from
                      </p>
                    ) : null}
                    <p className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-semibold tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {unit}
                      </span>
                    </p>
                    <p className="mt-3 text-sm text-pretty text-muted-foreground">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ + fair usage */}
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
            <AccordionItem value="fair-usage">
              <AccordionTrigger className="py-4 text-base">
                Fair Usage Policy
              </AccordionTrigger>
              <AccordionContent className="text-pretty text-muted-foreground">
                <ol className="list-decimal space-y-2 pl-5">
                  {fairUsage.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <ClosingCta
        heading="Try for free, upgrade as you grow"
        body="Try all the features of our all-in-one communication platform with a 10-day free trial."
        action="Start free trial"
      />

      <AppsShowcase />
    </>
  );
}
