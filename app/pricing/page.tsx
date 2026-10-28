import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, MessageCircleQuestion, Sparkles } from "lucide-react";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  aiAddOns,
  enterpriseReady,
  pricingFaqs,
  pricingHomeFaqQuestions,
} from "@/lib/pricing";
import { homeFaqs, onboardingSteps } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The pricing page. Every plan, price, feature and add-on on it comes from
 * docs/Document 3.pdf, by way of lib/pricing.ts.
 *
 * The order follows the decision: the plans themselves on a dark stage at
 * the top, then what can be added (SIPLINK AI), what happens once a plan is
 * chosen (onboarding), the billing questions, and the ask.
 */
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SipLink plans: Core, Business Pro and Enterprise Plus, per line per month, with SIPLINK AI add-ons.",
};

/** Billing questions first, then the homepage answers that bear on a plan. */
const faqs = [
  ...pricingFaqs,
  ...pricingHomeFaqQuestions.flatMap((question) =>
    homeFaqs.filter((faq) => faq.question === question),
  ),
];

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
      <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body ? <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">{body}</p> : null}
    </div>
  );
}

function BrandText({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-brand-to to-brand-from bg-clip-text text-transparent">
      {children}
    </span>
  );
}

/** Thin rings for a section's corner, echoing the hero's. */
function CornerRings({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      fill="none"
      className={cn("pricing-orbit pointer-events-none absolute -z-10 [--orbit-duration:160s]", className)}
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
    // `pricing:` variant).
    <div data-page="pricing" className="relative isolate pt-2 sm:pt-3">
      <PricingPlans />

      {/* SIPLINK AI add-ons. Priced by usage, so each card ends in an ask
          rather than a number. */}
      <section className="relative overflow-hidden">
        <CornerRings className="-top-40 -left-32 size-[30rem]" />
        <CornerRings className="-right-40 -bottom-48 size-[34rem] [animation-direction:reverse]" />
        <RevealGroup className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              eyebrow="SIPLINK AI · Add-ons"
              title={
                <>
                  SIPLINK <BrandText>AI Add-ons</BrandText>
                </>
              }
              body="Transcription, summaries, a voice assistant and analytics. Each is quoted for how you use it."
            />
            <Badge
              variant="outline"
              className="reveal-item h-8 self-start rounded-full border-primary/25 bg-accent/60 px-3.5 text-primary lg:self-auto"
            >
              <Sparkles aria-hidden />
              Pricing on request
            </Badge>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {aiAddOns.map(({ title, subtitle, description, features, pricing, icon: Icon }, i) => (
              <Card
                key={title}
                className="reveal-item group/ai relative gap-0 overflow-hidden rounded-[1.6rem] border border-border bg-card py-0 shadow-sm shadow-primary/5 ring-0 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/15"
                style={{ "--reveal-index": i + 1 } as CSSProperties}
              >
                {/* A brand bar that draws across the top on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-to to-brand-from transition-transform duration-500 group-hover/ai:scale-x-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-brand-from/0 blur-2xl transition-colors duration-500 group-hover/ai:bg-brand-from/20"
                />
                <CardHeader className="relative gap-0 p-6 pb-0">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-500 group-hover/ai:-rotate-6 group-hover/ai:scale-105">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="mt-5 text-lg">{title}</CardTitle>
                  <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
                </CardHeader>
                <CardContent className="relative flex flex-1 flex-col p-6 pt-4">
                  <p className="text-sm text-pretty text-foreground/80">{description}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {features.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                          <Check className="size-2.5" strokeWidth={3} aria-hidden />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-dashed border-border pt-4">
                    <p className="text-xs text-muted-foreground">{pricing}</p>
                    <Link
                      href="/contact"
                      className="group/link mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary outline-none focus-visible:underline"
                    >
                      Get pricing
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5" aria-hidden />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </RevealGroup>
      </section>

      {/* Onboarding: what happens once a plan is chosen. The connector is a
          gradient rule behind the badges from md up. */}
      <section className="relative border-y border-primary/10 bg-gradient-to-b from-accent/60 to-accent/20">
        <RevealGroup className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <SectionHead
            align="center"
            eyebrow="After you choose"
            title={
              <>
                From plan to <BrandText>live</BrandText>
              </>
            }
            body="Choosing a plan is the first step. Here is how the move to SipLink works."
          />

          <ol className="relative mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
            <span
              aria-hidden
              className="absolute top-12 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 md:block"
            />
            {onboardingSteps.map(({ title, description, icon: Icon }, i) => (
              <li
                key={title}
                className="reveal-item group/step relative flex flex-col items-center rounded-[1.6rem] border border-border bg-card/80 p-7 text-center shadow-sm shadow-primary/5 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                style={{ "--reveal-index": i + 1 } as CSSProperties}
              >
                <span className="relative grid size-16 place-items-center rounded-full bg-card ring-1 ring-primary/20">
                  <span className="absolute inset-1.5 rounded-full bg-gradient-to-br from-brand-to to-brand-from opacity-90 transition-transform duration-500 group-hover/step:scale-105" />
                  <Icon className="relative size-6 text-primary-foreground" aria-hidden />
                </span>
                <span className="mt-5 font-mono text-xs tracking-widest text-primary">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 max-w-xs text-sm text-pretty text-muted-foreground">{description}</p>
              </li>
            ))}
          </ol>
        </RevealGroup>
      </section>

      {/* Billing questions. */}
      <section className="relative">
        <RevealGroup className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
            <div>
              <SectionHead
                eyebrow="FAQ"
                title="Questions before you choose"
                body="Billing, lines and what carries over from your current setup."
              />
              <div className="reveal-item mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <MessageCircleQuestion className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">Something else?</p>
                  <Link
                    href="/contact"
                    className="group/link inline-flex items-center gap-1 text-sm font-semibold text-primary outline-none focus-visible:underline"
                  >
                    Talk to sales
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>

            <Accordion
              type="single"
              collapsible
              defaultValue={faqs[0]?.question}
              className="reveal-item rounded-[1.6rem] border border-border bg-card px-5 shadow-sm sm:px-7"
            >
              {faqs.map(({ question, answer }) => (
                <AccordionItem key={question} value={question}>
                  <AccordionTrigger className="py-5 text-base font-medium hover:text-primary hover:no-underline">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-pretty text-muted-foreground">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </RevealGroup>
      </section>

      {/* Closing: the document's two calls to action. */}
      <section className="relative">
        <RevealGroup className="mx-auto max-w-[88rem] px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
          <Card className="reveal-item relative gap-0 overflow-hidden rounded-[2rem] border-0 bg-gradient-to-br from-brand-to via-primary to-brand-from py-0 text-primary-foreground shadow-2xl shadow-primary/25 ring-0">
            <span aria-hidden className="pricing-drift pointer-events-none absolute -top-24 -right-16 size-80 rounded-full bg-primary-foreground/15 blur-3xl" />
            <CornerRings className="-right-24 -bottom-28 z-0 size-[26rem] opacity-60 [&_circle]:stroke-primary-foreground" />
            <CardContent className="relative flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-14">
              <div className="max-w-2xl">
                <p className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  {enterpriseReady.title}
                </p>
                <p className="mt-4 text-pretty text-primary-foreground/85 sm:text-lg">{enterpriseReady.body}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="pricing-sheen group/cta relative h-12 overflow-hidden rounded-full bg-primary-foreground px-7 text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground/90"
                >
                  <Link href="/contact">
                    Book a Demo
                    <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-primary-foreground/40 bg-primary-foreground/10 px-7 text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  <Link href="/contact">Talk to Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </RevealGroup>
      </section>
    </div>
  );
}
