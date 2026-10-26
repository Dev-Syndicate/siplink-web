"use client";

import { useState, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowRight, AudioLines, PackagePlus } from "lucide-react";

import { PricingAtmosphere } from "@/components/site/pricing-atmosphere";
import { PricingHeroBackdrop } from "@/components/site/pricing-hero-backdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { plans, pricingDisclaimer, type Plan } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type Currency = "inr" | "usd";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = { hidden: { opacity: 0, y: 18 }, shown: { opacity: 1, y: 0 } };

/** Enterprise Plus: the only plan with add-ons, and the longest list. */
const widePlan = plans[plans.length - 1];
const addOnPlan = plans.find((plan) => plan.addOns);

/**
 * The top of the pricing page: a framed stage, washed in blush, that holds
 * the hero, the currency switch, all three plans and the Enterprise Plus
 * add-ons.
 *
 * Every plan shows its whole feature list on its own card; nothing is hidden
 * behind a toggle. Content comes only from lib/pricing.ts, which mirrors
 * docs/Document 3.pdf.
 */
export function PricingPlans() {
  const [currency, setCurrency] = useState<Currency>("inr");

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative isolate mx-2 overflow-hidden rounded-[2rem] border border-primary/10 bg-background shadow-xl shadow-primary/5 sm:mx-4 lg:rounded-[2.75rem]">
        <PricingAtmosphere />

        <PricingHero currency={currency} onCurrency={setCurrency} />

        <div id="plans" className="mx-auto max-w-[88rem] scroll-mt-32 px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
          {/* Core and Business Pro pair up on a tablet with Enterprise Plus
              below them; on a wide screen Enterprise Plus takes the widest
              column so its sixteen features run in two columns and its card
              stays near the others' height. */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.8fr)] xl:gap-5 2xl:gap-6">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                index={index}
                currency={currency}
                wide={plan === widePlan}
              />
            ))}
          </div>

          {addOnPlan ? <AddOns plan={addOnPlan} /> : null}

          <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-pretty text-muted-foreground">
            {pricingDisclaimer}
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}

function PricingHero({
  currency,
  onCurrency,
}: {
  currency: Currency;
  onCurrency: (value: Currency) => void;
}) {
  const entry = plans[0];
  const entryPrice = currency === "inr" ? entry.inr : entry.usd;

  return (
    <div className="relative isolate px-4 pt-16 pb-14 sm:px-6 sm:pt-20 lg:pt-24 lg:pb-16">
      <PricingHeroBackdrop />

      {/* Two glass notes floating either side of the headline, on wide
          screens only: the entry price and the headline AI feature. */}
      <FloatingNote className="top-[30%] left-[6%] 2xl:left-[10%]" delay={0.9} drift={-8}>
        <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{entry.name} from</p>
        <p className="mt-0.5 text-xl font-semibold tabular-nums">
          {entryPrice}
          <span className="text-xs font-normal text-muted-foreground"> /line/month</span>
        </p>
      </FloatingNote>
      <FloatingNote className="top-[52%] right-[6%] 2xl:right-[10%]" delay={1.1} drift={8}>
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground">
            <AudioLines className="size-4" aria-hidden />
          </span>
          <div className="text-left">
            <p className="text-sm font-medium">AI Voice Assistant</p>
            <p className="text-[11px] text-muted-foreground">In {widePlan.name}</p>
          </div>
        </div>
      </FloatingNote>

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        initial="hidden"
        animate="shown"
        transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
      >
        <motion.div variants={rise} transition={{ duration: 0.6, ease }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 py-1 pr-3.5 pl-1.5 text-xs font-medium text-foreground/80 shadow-sm shadow-primary/10 backdrop-blur-md">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-to to-brand-from px-2 py-0.5 font-mono text-[10px] tracking-widest text-primary-foreground uppercase">
              <span className="relative flex size-1.5">
                <span className="pricing-ping absolute inset-0 rounded-full bg-primary-foreground" />
                <span className="relative size-1.5 rounded-full bg-primary-foreground" />
              </span>
              Pricing
            </span>
            {plans.map((plan) => plan.name).join(" · ")}
          </span>
        </motion.div>

        <motion.h1
          variants={rise}
          transition={{ duration: 0.7, ease }}
          className="font-heading mt-7 text-4xl leading-[1.04] font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl"
        >
          Business calling,{" "}
          <span className="relative inline-block bg-gradient-to-r from-brand-to via-primary to-brand-from bg-clip-text text-transparent">
            priced per line
            <motion.span
              aria-hidden
              className="absolute inset-x-0 -bottom-1.5 h-1 origin-left rounded-full bg-gradient-to-r from-brand-to to-brand-from"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.9, ease }}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={rise}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mt-7 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg"
        >
          Three plans, from essential business calling to AI and enterprise
          integrations. Everything a plan includes is listed on its card, so
          you can compare them at a glance.
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.6, ease }}
          className="mt-9 flex flex-col items-center gap-4"
        >
          <CurrencySwitch currency={currency} onCurrency={onCurrency} />
          <p className="text-sm text-muted-foreground">
            Prices per line, per month. Taxes extra, as applicable.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FloatingNote({
  className,
  delay,
  drift,
  children,
}: {
  className: string;
  delay: number;
  drift: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute z-10 hidden xl:block", className)}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, ease }}
    >
      <motion.div
        animate={{ y: [0, drift, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-2xl border border-primary/10 bg-card/80 px-4 py-3 shadow-xl shadow-primary/10 backdrop-blur-xl"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** The document prices every plan in both currencies. */
function CurrencySwitch({
  currency,
  onCurrency,
}: {
  currency: Currency;
  onCurrency: (value: Currency) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      value={currency}
      onValueChange={(v) => v && onCurrency(v as Currency)}
      aria-label="Currency"
      spacing={0}
      className="rounded-full border border-primary/15 bg-card/80 p-1 shadow-lg shadow-primary/10 backdrop-blur-md"
    >
      {(["inr", "usd"] as const).map((value) => (
        <ToggleGroupItem
          key={value}
          value={value}
          className="relative h-10 rounded-full px-6 text-sm font-medium text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent data-[state=on]:text-primary-foreground"
        >
          {currency === value ? (
            <motion.span
              layoutId="currency-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-to to-brand-from shadow-md shadow-primary/30"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          ) : null}
          <span className="relative">{value === "inr" ? "₹ INR" : "$ USD"}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

function PlanCard({
  plan,
  index,
  currency,
  wide,
}: {
  plan: Plan;
  index: number;
  currency: Currency;
  wide: boolean;
}) {
  const featured = Boolean(plan.featured);
  const price = currency === "inr" ? plan.inr : plan.usd;
  const other = currency === "inr" ? plan.usd : plan.inr;
  const Icon = plan.icon;

  // A soft spotlight that follows the pointer across the card.
  const track = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
  };

  const card = (
    <Card
      onPointerMove={track}
      className={cn(
        "group/card relative h-full gap-0 overflow-hidden rounded-[1.75rem] py-0 ring-0 backdrop-blur-xl transition-[border-color,box-shadow] duration-500",
        featured
          ? "border-0 bg-card shadow-2xl shadow-primary/20"
          : "border border-border/80 bg-card/85 shadow-lg shadow-primary/5 group-hover/tier:border-primary/30 group-hover/tier:shadow-2xl group-hover/tier:shadow-primary/10",
      )}
    >
      {/* Glass: a lit top edge, a pointer spotlight, and on the featured
          plan a warm light pooled behind the price. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
        }}
      />
      {featured ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-brand-from/25 blur-3xl"
        />
      ) : null}

      <div className="relative flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3.5">
          <span
            className={cn(
              "grid size-12 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover/card:-rotate-6 group-hover/card:scale-105",
              featured
                ? "bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground shadow-lg shadow-primary/30"
                : "bg-primary/12 text-primary ring-1 ring-primary/20",
            )}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight">{plan.name}</h2>
            <p className="text-sm text-muted-foreground">{plan.tagline}</p>
          </div>
        </div>

        <div className="mt-7 flex items-end gap-2">
          <span className="relative flex h-14 items-end overflow-y-clip">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={price}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className={cn(
                  "text-5xl leading-none font-semibold tracking-tight tabular-nums",
                  featured && "bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent",
                )}
              >
                {price}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="pb-1 text-sm text-muted-foreground">/line/month</span>
        </div>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-primary/15 bg-accent px-2 py-0.5 font-mono text-accent-foreground tabular-nums">
            {other}
          </span>
          per line/month · Taxes extra
        </p>

        <p className="mt-5 text-sm text-pretty text-foreground/80">{plan.description}</p>

        <div className="mt-7 flex items-center gap-3">
          <p className="text-[11px] font-semibold tracking-wider whitespace-nowrap text-foreground/75 uppercase">
            {plan.featuresHeading}
          </p>
          <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
            {plan.features.length}
          </span>
        </div>

        <ul
          className={cn(
            "mt-5 grid gap-x-6 gap-y-4",
            wide && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2",
          )}
        >
          {plan.features.map(({ title, detail, icon: FeatureIcon }) => (
            <li key={title} className="group/item flex gap-3">
              <span
                className={cn(
                  "mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg transition-colors duration-300",
                  featured
                    ? "bg-primary/15 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground"
                    : "bg-accent text-primary ring-1 ring-primary/10 group-hover/item:bg-primary group-hover/item:text-primary-foreground",
                )}
              >
                <FeatureIcon className="size-3.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm leading-snug font-medium">{title}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-pretty text-muted-foreground">
                  {detail}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <div className="border-t border-dashed border-border pt-5">
            <p className="text-xs text-pretty text-muted-foreground">{plan.note}</p>
            <Button
              asChild
              size="lg"
              variant={featured ? "default" : "outline"}
              className={cn(
                "pricing-sheen group/cta relative mt-4 h-11 w-full overflow-hidden rounded-full transition-all duration-300 hover:-translate-y-0.5",
                featured
                  ? "bg-gradient-to-r from-brand-to to-brand-from shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                  : "border-primary/30 bg-card text-primary hover:border-primary/50 hover:bg-accent hover:text-primary",
              )}
            >
              <Link href="/contact">
                {wide ? "Talk to Sales" : "Book a Demo"}
                <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <motion.article
      aria-label={`${plan.name} plan`}
      className={cn("group/tier relative", wide && "md:col-span-2 xl:col-span-1", featured && "z-10")}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
    >
      <div className="h-full transition-transform duration-500 ease-out group-hover/tier:-translate-y-1.5">
        {featured ? (
          <>
            <span
              aria-hidden
              className="pricing-halo pointer-events-none absolute -inset-x-2 -inset-y-4 -z-10 rounded-[2.4rem] bg-gradient-to-b from-brand-from/40 via-primary/15 to-transparent blur-2xl sm:-inset-4"
            />
            <div className="pricing-featured-border h-full rounded-[1.85rem] p-[1.5px]">{card}</div>
            {plan.badge ? (
              <Badge className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-to to-brand-from px-3.5 py-1 font-mono text-[10px] tracking-widest uppercase shadow-lg shadow-primary/40">
                {plan.badge}
              </Badge>
            ) : null}
          </>
        ) : (
          card
        )}
      </div>
    </motion.article>
  );
}

/**
 * The add-ons, under the plans rather than inside a card: they are optional
 * and charged separately, so they are drawn apart from what a plan includes,
 * with a dashed edge, and say which plan they extend.
 */
function AddOns({ plan }: { plan: Plan }) {
  return (
    <motion.div
      className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-dashed border-primary/30 bg-card/70 p-6 shadow-sm shadow-primary/5 backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-32 size-80 rounded-full bg-brand-from/15 blur-3xl"
      />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="lg:w-80 lg:shrink-0">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/20">
            <PackagePlus className="size-5" aria-hidden />
          </span>
          <p className="mt-5 font-mono text-[11px] tracking-widest text-primary uppercase">
            Optional · {plan.name}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Add-ons, charged separately</h2>
          <p className="mt-2 text-sm text-pretty text-muted-foreground">
            For add-ons, contact us and we&rsquo;ll share the details for your plan.
          </p>
          <Link
            href="/contact"
            className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary outline-none focus-visible:underline"
          >
            Ask about add-ons
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <ul className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {plan.addOns?.map(({ title, detail, icon: AddOnIcon }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.06 }}
              className="group/addon flex gap-3 rounded-2xl border border-border bg-card p-4 transition-colors duration-300 hover:border-primary/30 hover:bg-accent/60"
            >
              <AddOnIcon
                className="mt-0.5 size-4 shrink-0 text-primary transition-transform duration-300 group-hover/addon:scale-110"
                aria-hidden
              />
              <span>
                <span className="block text-sm font-medium">{title}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{detail}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
