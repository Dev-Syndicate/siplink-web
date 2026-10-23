import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CircleCheck, PackagePlus, Sparkles } from "lucide-react";

import { PricingAtmosphere } from "@/components/site/pricing-atmosphere";
import { PricingPlans } from "@/components/site/pricing-plans";
import { RevealGroup } from "@/components/site/reveal-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiAddOns, pricingDisclaimer } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/**
 * The pricing page. Every plan, price, feature and add-on on it comes from
 * docs/Document 3.pdf, by way of lib/pricing.ts.
 */
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SipLink plans: Core, Business Pro and Enterprise Plus, per line per month, with SIPLINK AI add-ons.",
};

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
    // `pricing:` variant), and runs up under the fixed header so the
    // atmosphere sits behind the floating nav too.
    <div data-page="pricing" className="relative isolate -mt-20 pt-20 sm:-mt-30 sm:pt-30">
      <PricingAtmosphere />

      <PricingPlans />

      {/* Add-ons are quoted, not listed: one line pointing to a conversation. */}
      <section className="relative mt-16 lg:mt-20">
        <RevealGroup className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-10">
          <div className="reveal-item flex flex-col items-start gap-5 rounded-[1.6rem] border border-primary/15 bg-card/80 p-6 shadow-lg shadow-primary/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground shadow-lg shadow-primary/25">
                <PackagePlus className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-lg font-semibold">Need add-ons?</p>
                <p className="text-sm text-muted-foreground">
                  For add-ons, contact us and we&rsquo;ll share the details for your plan.
                </p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="pricing-sheen group/cta relative shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-brand-to to-brand-from px-7 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Link href="/contact">
                Contact us
                <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5" aria-hidden />
              </Link>
            </Button>
          </div>
        </RevealGroup>
      </section>

      {/* SIPLINK AI add-ons, on a blush band. */}
      <section className="relative mt-20 overflow-hidden border-y border-primary/10 bg-gradient-to-b from-accent/70 to-accent/30 lg:mt-28">
        <CornerRings className="-top-40 -left-32 size-[30rem]" />
        <CornerRings className="-right-40 -bottom-48 size-[34rem] [animation-direction:reverse]" />
        <RevealGroup className="mx-auto max-w-[96rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
          <SectionHead
            eyebrow="SIPLINK AI"
            title={
              <>
                SIPLINK{" "}
                <span className="bg-gradient-to-r from-brand-to to-brand-from bg-clip-text text-transparent">
                  AI Add-ons
                </span>
              </>
            }
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {aiAddOns.map(({ title, subtitle, description, features, pricing, icon: Icon }, i) => (
              <Card
                key={title}
                className="reveal-item group/ai relative gap-0 overflow-hidden rounded-[1.4rem] border border-border/80 bg-card/90 py-0 shadow-sm shadow-primary/5 ring-0 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/15"
                style={{ "--reveal-index": i + 1 } as CSSProperties}
              >
                <CardHeader className="gap-0 p-6 pb-0">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover/ai:-rotate-6 group-hover/ai:bg-primary group-hover/ai:text-primary-foreground">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <Badge variant="secondary" className="rounded-full bg-accent text-primary">
                      <Sparkles aria-hidden />
                      AI Add-on
                    </Badge>
                  </div>
                  <CardTitle className="mt-5 text-lg">{title}</CardTitle>
                  <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col p-6 pt-4">
                  <p className="text-sm text-pretty text-foreground/80">{description}</p>
                  <p className="mt-5 text-[11px] font-semibold tracking-wider text-foreground/70 uppercase">
                    Features
                  </p>
                  <ul className="mt-3 flex-1 space-y-2">
                    {features.map((item) => (
                      <li key={item} className="flex gap-2 text-sm">
                        <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-dashed border-border pt-4">
                    <p className="font-semibold">Contact Sales</p>
                    <p className="mt-1 text-xs text-muted-foreground">{pricing}</p>
                    <Button
                      asChild
                      variant={i === 0 ? "default" : "outline"}
                      className={cn(
                        "pricing-sheen group/cta relative mt-4 w-full overflow-hidden rounded-full transition-all duration-300 hover:-translate-y-0.5",
                        i === 0
                          ? "bg-gradient-to-r from-brand-to to-brand-from shadow-md shadow-primary/25"
                          : "bg-card hover:border-primary/40 hover:bg-accent hover:text-primary",
                      )}
                    >
                      <Link href="/contact">
                        Get Pricing
                        <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5" aria-hidden />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </RevealGroup>
      </section>

      {/* Closing: the document's two calls to action and its price terms. */}
      <section className="relative">
        <RevealGroup className="mx-auto max-w-[96rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
          <Card className="reveal-item relative gap-0 overflow-hidden rounded-[1.75rem] border-0 bg-gradient-to-br from-brand-to via-primary to-brand-from py-0 text-primary-foreground shadow-2xl shadow-primary/25 ring-0">
            <span aria-hidden className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full bg-primary-foreground/15 blur-3xl" />
            <CornerRings className="-right-24 -bottom-28 size-[26rem] opacity-60 [&_circle]:stroke-primary-foreground" />
            <CardContent className="relative flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div className="max-w-2xl">
                <p className="text-3xl font-semibold tracking-tight sm:text-4xl">Enterprise-Ready Communication</p>
                <p className="mt-4 text-sm text-pretty text-primary-foreground/85">{pricingDisclaimer}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="pricing-sheen group/cta relative overflow-hidden rounded-full bg-primary-foreground px-7 text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground/90"
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
                  className="rounded-full border-primary-foreground/40 bg-primary-foreground/10 px-7 text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground/20 hover:text-primary-foreground dark:border-primary-foreground/40 dark:bg-primary-foreground/10"
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
