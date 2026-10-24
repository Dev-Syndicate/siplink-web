"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowDown, ArrowRight, Check, ShieldCheck } from "lucide-react";

import { PricingHeroBackdrop } from "@/components/site/pricing-hero-backdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { enterpriseReady, plans, type Plan } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type Currency = "inr" | "usd";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = { hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } };

/**
 * The top of the pricing page: the hero with the currency switch, the three
 * plans, and the chosen plan's full feature list. Content comes only from
 * lib/pricing.ts, which mirrors docs/Document 3.pdf.
 */
export function PricingPlans() {
  const [currency, setCurrency] = useState<Currency>("inr");

  return (
    <MotionConfig reducedMotion="user">
      <PricingHeroBlock currency={currency} onCurrency={setCurrency} />

      <section className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-10">
        <PlanGrid currency={currency} />
      </section>
    </MotionConfig>
  );
}

function PricingHeroBlock({
  currency,
  onCurrency,
}: {
  currency: Currency;
  onCurrency: (value: Currency) => void;
}) {
  return (
    <section className="relative isolate px-6 pt-8 pb-8 sm:pt-10 lg:px-10 lg:pt-12">
      <PricingHeroBackdrop />

      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial="hidden"
        animate="shown"
        transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
      >
        <motion.div variants={rise} transition={{ duration: 0.6, ease }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 py-1 pr-3.5 pl-1.5 text-xs font-medium text-foreground/80 shadow-sm shadow-primary/10 backdrop-blur">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-to to-brand-from px-2 py-0.5 font-mono text-[10px] tracking-widest text-primary-foreground uppercase">
              <span className="relative flex size-1.5">
                <span className="pricing-ping absolute inset-0 rounded-full bg-primary-foreground" />
                <span className="relative size-1.5 rounded-full bg-primary-foreground" />
              </span>
              Plans
            </span>
            Core · Business Pro · Enterprise Plus
          </span>
        </motion.div>

        <motion.h1
          variants={rise}
          transition={{ duration: 0.7, ease }}
          className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl"
        >
          Enterprise-Ready{" "}
          <span className="relative inline-block bg-gradient-to-r from-brand-to via-primary to-brand-from bg-clip-text text-transparent">
            Communication
            <motion.span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-1 origin-left rounded-full bg-gradient-to-r from-brand-to to-brand-from"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.9, ease }}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={rise}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl"
        >
          {enterpriseReady.body}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.6, ease }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="pricing-sheen group/cta relative overflow-hidden rounded-full bg-gradient-to-r from-brand-to to-brand-from px-7 shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
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
            className="rounded-full border-primary/40 bg-card/80 px-7 text-primary backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-primary"
          >
            <Link href="/contact">Talk to Sales</Link>
          </Button>
        </motion.div>

        {/* The document prices every plan in both currencies. */}
        <motion.div
          variants={rise}
          transition={{ duration: 0.6, ease }}
          className="mt-9 flex flex-col items-center gap-3"
        >
          <ToggleGroup
            type="single"
            value={currency}
            onValueChange={(v) => v && onCurrency(v as Currency)}
            aria-label="Currency"
            spacing={0}
            className="rounded-full border border-primary/15 bg-card/80 p-1 shadow-lg shadow-primary/10 backdrop-blur"
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
          <p className="text-sm text-muted-foreground">Prices per line, per month. Taxes extra, as applicable.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * The three plans as cards, and one wide panel beneath them with everything
 * the chosen plan includes. Business Pro, the document's "Pro" plan, starts
 * chosen and carries the featured treatment.
 */
function PlanGrid({ currency }: { currency: Currency }) {
  const [chosen, setChosen] = useState(
    () => plans.find((plan) => plan.featured)?.name ?? plans[0].name,
  );
  const plan = plans.find((p) => p.name === chosen) ?? plans[0];

  return (
    <div className="relative">
      <div className="mt-6 grid gap-5 lg:grid-cols-3 2xl:gap-6">
        {plans.map((p, index) => (
          <PlanCard
            key={p.name}
            plan={p}
            index={index}
            currency={currency}
            chosen={p.name === chosen}
            onChoose={() => {
              setChosen(p.name);
              // On a phone the panel sits below all three cards; bring it up.
              document
                .getElementById("plan-features")
                ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }}
          />
        ))}
      </div>

      <FeaturePanel plan={plan} />
    </div>
  );
}

function PlanCard({
  plan,
  index,
  currency,
  chosen,
  onChoose,
}: {
  plan: Plan;
  index: number;
  currency: Currency;
  chosen: boolean;
  onChoose: () => void;
}) {
  const featured = Boolean(plan.featured);
  const top = index === plans.length - 1;
  const price = currency === "inr" ? plan.inr : plan.usd;
  const other = currency === "inr" ? plan.usd : plan.inr;
  const Icon = plan.icon;

  // A soft spotlight that follows the pointer across the card.
  const track = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
  };

  const card = (
    <Card
      onPointerMove={track}
      className={cn(
        "group/card relative h-full gap-0 overflow-hidden rounded-[1.4rem] py-0 ring-0 transition-[box-shadow,border-color] duration-500",
        featured
          ? "border-0 bg-gradient-to-br from-card via-card to-accent shadow-2xl shadow-primary/25"
          : cn(
              "border backdrop-blur-sm group-hover/tier:border-primary/30 group-hover/tier:shadow-xl group-hover/tier:shadow-primary/15",
              top
                ? "border-primary/15 bg-card shadow-lg shadow-primary/10"
                : "border-border/80 bg-card/90 shadow-sm shadow-foreground/5",
            ),
      )}
    >
      {top ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-brand-to via-primary to-brand-from"
        />
      ) : null}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
        }}
      />
      {featured ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-10 size-48 rounded-full bg-brand-from/30 blur-3xl"
        />
      ) : null}

      <div className="relative flex h-full flex-col p-6 2xl:p-7">
        <div className="flex items-start gap-3.5">
          <span
            className={cn(
              "grid size-12 shrink-0 place-items-center rounded-2xl transition-all duration-300 group-hover/card:-rotate-6",
              featured
                ? "bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground shadow-lg shadow-primary/30"
                : "bg-primary/10 text-primary",
            )}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 className={cn("text-lg font-semibold", featured && "text-primary")}>
              {plan.name}
              <span className="font-normal text-muted-foreground"> · Plan</span>
            </h3>
            <p className="text-sm text-muted-foreground">{plan.tagline}</p>
          </div>
        </div>

        <div className="mt-6 flex items-end gap-2">
          <span className="relative flex h-12 items-end overflow-y-clip">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={price}
                initial={{ y: 26, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -26, opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="text-[2.75rem] leading-none font-semibold tracking-tight tabular-nums"
              >
                {price}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="pb-1 text-sm text-muted-foreground">/line/month</span>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {other} /line/month · Taxes extra, as applicable.
        </p>

        <p className="mt-4 text-sm text-pretty text-foreground/80">{plan.description}</p>

        <div className="mt-5 flex-1 border-t border-dashed border-border pt-4">
          <p className="text-[11px] font-semibold tracking-wider text-foreground/70 uppercase">
            {plan.featuresHeading}
          </p>
          <ul className="mt-3 space-y-2">
            {plan.features.slice(0, 4).map((feature) => (
              <li key={feature.title} className="flex gap-2.5 text-sm leading-snug">
                <span
                  className={cn(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                    featured ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                  )}
                >
                  <Check className="size-2.5" strokeWidth={3} aria-hidden />
                </span>
                {feature.title}
              </li>
            ))}
          </ul>
        </div>

        <Button
          asChild
          size="lg"
          variant={featured || top ? "default" : "outline"}
          className={cn(
            "pricing-sheen group/cta relative mt-6 w-full overflow-hidden rounded-full transition-all duration-300 hover:-translate-y-0.5",
            featured &&
              "bg-gradient-to-r from-brand-to to-brand-from shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
            top && "hover:shadow-lg hover:shadow-primary/25",
            !featured && !top && "bg-card hover:border-primary/40 hover:bg-accent hover:text-primary",
          )}
        >
          <Link href="/contact">
            Book a Demo
            <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5" aria-hidden />
          </Link>
        </Button>

        <button
          type="button"
          onClick={onChoose}
          aria-pressed={chosen}
          aria-controls="plan-features"
          className={cn(
            "mt-3 flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary",
            chosen ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <span>
            {chosen ? "Included below" : "See all features"}
            <span className="ml-1.5 font-mono text-[11px] tabular-nums opacity-70">
              {plan.features.length}
            </span>
          </span>
          <ArrowDown
            className={cn("size-4 transition-transform duration-300", chosen ? "translate-y-0.5" : "-rotate-90")}
            aria-hidden
          />
        </button>
      </div>
    </Card>
  );

  return (
    <motion.div
      className={cn("group/tier relative", featured && "z-10")}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay: index * 0.09 }}
    >
      <motion.div
        className="relative h-full"
        animate={featured ? { y: [0, -5, 0] } : undefined}
        transition={featured ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <div className="h-full transition-transform duration-500 ease-out group-hover/tier:-translate-y-1.5">
          {featured ? (
            <>
              <span
                aria-hidden
                className="pricing-halo pointer-events-none absolute -inset-x-1 -inset-y-4 -z-10 rounded-[2.2rem] bg-gradient-to-b from-brand-from/35 via-primary/20 to-transparent blur-2xl sm:-inset-4"
              />
              <div className="pricing-featured-border h-full rounded-[1.5rem] p-[1.5px]">{card}</div>
              {plan.badge ? (
                <Badge className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-to to-brand-from px-3.5 py-1 shadow-md shadow-primary/30">
                  {plan.badge}
                </Badge>
              ) : null}
            </>
          ) : (
            card
          )}

          {/* The ring that marks the chosen plan, sliding between cards. */}
          {chosen ? (
            <motion.span
              layoutId="chosen-plan"
              aria-hidden
              className="pointer-events-none absolute -inset-1.5 rounded-[1.75rem] ring-2 ring-primary/60"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Everything the chosen plan includes, with each feature's own detail. */
function FeaturePanel({ plan }: { plan: Plan }) {
  return (
    <div
      id="plan-features"
      className="relative mt-6 scroll-mt-28 overflow-hidden rounded-[1.6rem] border border-primary/10 bg-card/75 p-5 shadow-xl shadow-primary/10 backdrop-blur-md sm:p-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-brand-from/15 blur-3xl"
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease }}
          className="relative"
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-4">
            <p className="text-lg font-semibold">
              {plan.name}
              <span className="text-muted-foreground"> · {plan.featuresHeading}</span>
            </p>
            <p className="text-sm text-muted-foreground">{plan.summary}</p>
          </div>

          <motion.ul
            className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            animate="shown"
            transition={{ staggerChildren: 0.035, delayChildren: 0.05 }}
          >
            {plan.features.map(({ title, detail, icon: Icon }) => (
              <motion.li
                key={title}
                variants={rise}
                transition={{ duration: 0.4, ease }}
                className="flex gap-3"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{title}</span>
                  <span className="block text-sm text-pretty text-muted-foreground">{detail}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {plan.addOns ? (
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm font-semibold">Optional Add-ons</p>
              <ul className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
                {plan.addOns.map(({ title, detail, icon: Icon }) => (
                  <li key={title} className="flex gap-3">
                    <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>
                      <span className="block text-sm font-semibold">{title}</span>
                      <span className="block text-sm text-muted-foreground">{detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-accent/60 p-4 ring-1 ring-primary/10">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <ShieldCheck className="size-4 text-primary" aria-hidden />
                  {enterpriseReady.title}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{enterpriseReady.body}</p>
              </div>
            </div>
          ) : null}

          <p className="mt-6 text-xs text-muted-foreground">{plan.note}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
