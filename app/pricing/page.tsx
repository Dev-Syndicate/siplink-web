import type { Metadata } from "next";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
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
import { PricingAtmosphere } from "@/components/site/pricing-atmosphere";
import { PricingPlans } from "@/components/site/pricing-plans";
import { RevealGroup } from "@/components/site/reveal-group";
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

/** A heading block shared by the sections below the plans. */
function SectionHead({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "reveal-item max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {body ? <p className="mt-3 text-pretty text-muted-foreground">{body}</p> : null}
    </div>
  );
}

/** Thin rings for a section's corner, echoing the hero's. */
function CornerRings({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      fill="none"
      className={cn("footer-orbit pointer-events-none absolute -z-10 [--orbit-duration:160s]", className)}
    >
      {[80, 130, 180].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          className="stroke-primary"
          strokeOpacity={0.22 - i * 0.05}
          strokeDasharray={i === 1 ? "1 9" : undefined}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export default function PricingPage() {
  return (
    // The page marks itself so the shared header can take its look (the
    // `pricing:` variant), and runs up under the fixed header so the
    // atmosphere sits behind the floating nav too.
    <div data-page="pricing" className="relative isolate -mt-20 pt-20 sm:-mt-30 sm:pt-30">
      <PricingAtmosphere />

      <PricingPlans />

      {/* Enterprise and Pro Suite: two ways up from the plans. */}
      <section className="mx-auto max-w-[96rem] px-4 pt-20 pb-6 sm:px-6 lg:px-10 lg:pt-28">
        <RevealGroup className="grid gap-5 lg:grid-cols-2">
          <Card
            id="enterprise"
            className="reveal-item relative scroll-mt-28 gap-0 overflow-hidden rounded-[1.75rem] border-0 bg-gradient-to-br from-brand-to via-primary to-brand-from py-0 text-primary-foreground shadow-2xl shadow-primary/25 ring-0"
          >
            <span aria-hidden className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full bg-primary-foreground/15 blur-3xl" />
            <CornerRings className="-right-24 -bottom-28 size-[26rem] opacity-60 [&_circle]:stroke-primary-foreground" />
            <CardHeader className="relative gap-3 p-8 lg:p-10">
              <Badge className="w-fit rounded-full bg-primary-foreground/15 px-3 text-primary-foreground">
                Enterprise Plan
              </Badge>
              <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Talk to Us
              </CardTitle>
              <CardDescription className="max-w-md text-pretty text-primary-foreground/85">
                For organizations with advanced requirements beyond standard
                plans.
              </CardDescription>
              <Button
                asChild
                size="lg"
                className="pricing-sheen group/cta relative mt-4 w-full overflow-hidden rounded-full bg-primary-foreground text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground/90 sm:w-56"
              >
                <Link href="/contact">
                  Contact Sales
                  <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5" aria-hidden />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="relative px-8 pb-8 lg:px-10 lg:pb-10">
              <p className="font-semibold">Includes all Ultimate plan features</p>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {enterpriseFeatures.map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary-foreground/90" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="reveal-item relative gap-0 overflow-hidden rounded-[1.75rem] border border-primary/15 bg-card/80 py-0 shadow-xl shadow-primary/10 ring-0 backdrop-blur [--reveal-index:1]">
            <CornerRings className="-top-32 -right-28 size-[24rem]" />
            <CardHeader className="relative gap-3 p-8 lg:p-10">
              <Badge variant="secondary" className="w-fit rounded-full bg-accent px-3 text-primary">
                Pro Suite
              </Badge>
              <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Get{" "}
                <span className="bg-gradient-to-r from-brand-to to-brand-from bg-clip-text text-transparent">
                  MORE
                </span>{" "}
                with the Pro Suite
              </CardTitle>
              <CardDescription className="max-w-md text-pretty">
                Here&rsquo;s what you&rsquo;re missing in the Essential plan and
                what you gain by upgrading.
              </CardDescription>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="pricing-sheen group/cta relative overflow-hidden rounded-full bg-gradient-to-r from-brand-to to-brand-from shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Link href="/products">
                    Explore More Features
                    <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary/40 bg-card text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-primary"
                >
                  <Link href="/contact">Request a Demo</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="relative px-8 pb-8 lg:px-10 lg:pb-10">
              <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {proSuiteFeatures.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </CardContent>
          </Card>
        </RevealGroup>

        {/* Full comparison */}
        <RevealGroup>
          <Accordion
            id="compare"
            type="single"
            collapsible
            className="reveal-item mt-5 scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/80 shadow-lg shadow-primary/5 backdrop-blur"
          >
            <AccordionItem value="compare" className="border-0">
              <AccordionTrigger className="group/compare px-6 py-5 text-base hover:no-underline sm:px-8">
                <span className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover/compare:bg-primary group-hover/compare:text-primary-foreground">
                    <TableProperties className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold">View full feature comparison</span>
                    <span className="block text-sm font-normal text-muted-foreground">
                      Every feature, plan by plan
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-6 sm:px-8">
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full min-w-3xl border-collapse text-sm">
                    <thead>
                      <tr className="bg-accent/60">
                        <th scope="col" className="px-4 py-4 text-left font-semibold">
                          Features
                        </th>
                        {tiers.map((plan) => (
                          <th
                            key={plan.name}
                            scope="col"
                            className={cn(
                              "w-44 px-4 py-4 text-center font-semibold",
                              plan.popular && "bg-primary/10 text-primary",
                            )}
                          >
                            {plan.name}
                            <span className="block text-xs font-normal text-muted-foreground">
                              {plan.price === null ? "Free" : `$${plan.price} / user / mo`}
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
                              className="border-t border-border bg-primary/5 px-4 py-3 text-left text-xs font-semibold tracking-wider text-primary uppercase"
                            >
                              {group.heading}
                            </th>
                          </tr>
                          {group.rows.map((row) => (
                            <tr key={row.label} className="border-t border-border/70 transition-colors hover:bg-accent/40">
                              <th scope="row" className="px-4 py-3 text-left font-normal">
                                {row.label}
                              </th>
                              {row.tiers.map((value, i) => (
                                <td
                                  key={i}
                                  className={cn("px-4 py-3 text-center", tiers[i].popular && "bg-primary/[0.04]")}
                                >
                                  {value ? (
                                    <>
                                      <span className="mx-auto flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Check className="size-3" strokeWidth={3} aria-hidden />
                                      </span>
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
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </RevealGroup>
      </section>

      {/* Add-ons, on a blush band. */}
      <section className="relative mt-16 overflow-hidden border-y border-primary/10 bg-gradient-to-b from-accent/70 to-accent/30">
        <CornerRings className="-top-40 -left-32 size-[30rem]" />
        <CornerRings className="-right-40 -bottom-48 size-[34rem] [animation-direction:reverse]" />
        <RevealGroup className="mx-auto max-w-[96rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Add-ons"
              title="Explore Our Add-ons"
              body="Stack these on any plan as you need them."
            />
            <Button
              asChild
              size="lg"
              className="reveal-item pricing-sheen group/cta relative overflow-hidden rounded-full bg-gradient-to-r from-brand-to to-brand-from shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Link href="/contact">
                Contact us
                <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {addOns.map(({ title, price, unit, from, description, icon: Icon }, i) => (
              <Card
                key={title}
                className="reveal-item group/addon relative gap-0 overflow-hidden rounded-[1.4rem] border border-border/80 bg-card/85 py-0 shadow-sm shadow-primary/5 ring-0 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/15"
                style={{ "--reveal-index": i + 1 } as CSSProperties}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-brand-from/0 blur-2xl transition-colors duration-500 group-hover/addon:bg-brand-from/25"
                />
                <CardHeader className="relative gap-0 p-6 pb-0">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover/addon:-rotate-6 group-hover/addon:bg-primary group-hover/addon:text-primary-foreground">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <Badge variant="secondary" className="rounded-full bg-accent text-primary">
                      Add-On
                    </Badge>
                  </div>
                  <CardTitle className="mt-5 text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent className="relative p-6 pt-3">
                  {from ? <p className="text-xs text-muted-foreground">Starting from</p> : null}
                  <p className="flex flex-wrap items-baseline gap-x-1.5">
                    <span className="text-3xl font-semibold tracking-tight">{price}</span>
                    <span className="text-xs text-muted-foreground">{unit}</span>
                  </p>
                  <p className="mt-3 text-sm text-pretty text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </RevealGroup>
      </section>

      {/* FAQ + fair usage */}
      <section className="relative">
        <RevealGroup className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-24">
          <SectionHead eyebrow="Questions" title="Frequently Asked Questions" align="center" />
          <Accordion
            type="single"
            collapsible
            className="reveal-item mt-10 overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/85 px-2 shadow-lg shadow-primary/5 backdrop-blur [--reveal-index:1] sm:px-4"
          >
            {pricingFaqs.map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`faq-${index}`}>
                <AccordionTrigger className="px-3 py-5 text-base hover:text-primary hover:no-underline">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="px-3 text-pretty text-muted-foreground">{answer}</AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="fair-usage" className="border-b-0">
              <AccordionTrigger className="px-3 py-5 text-base hover:text-primary hover:no-underline">
                Fair Usage Policy
              </AccordionTrigger>
              <AccordionContent className="px-3 text-pretty text-muted-foreground">
                <ol className="list-decimal space-y-2 pl-5">
                  {fairUsage.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </RevealGroup>
      </section>

      <ClosingCta
        heading="Try for free, upgrade as you grow"
        body="Try all the features of our all-in-one communication platform with a 10-day free trial."
        action="Start free trial"
      />

      <AppsShowcase />
    </div>
  );
}
