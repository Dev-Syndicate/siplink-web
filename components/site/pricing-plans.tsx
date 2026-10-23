"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Check,
  CircleCheck,
  Flame,
  Inbox,
  Info,
  MessageCircle,
  PhoneForwarded,
  Plug,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { tiers, type Tier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/** Approximate rates from USD, for the currency switcher. */
const currencies = {
  USD: 1,
  AUD: 1.52,
  CAD: 1.37,
  EUR: 0.92,
  GBP: 0.79,
  INR: 84,
} as const;
type Currency = keyof typeof currencies;

const regions = ["US/CA", "UK", "AUS", "IN", "US/CA/UK", "Global"];
const teamSizes = ["1-4", "5-49", "50+"] as const;

function formatPrice(usd: number, currency: Currency) {
  const value = usd * currencies[currency];
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: value >= 100 || Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

/** The audiences the headline cycles through. */
const words = ["every team", "sales teams", "support teams", "remote teams"];

const ticks = [
  "10-day free trial",
  "No credit card needed",
  "Cancel anytime",
  "Trusted by businesses across the US",
];

/**
 * The products priced to order rather than by tier. They used to sit in a
 * sidebar beside the plans; each one only ever led to a sales conversation,
 * so they are a strip of next steps below the plans instead.
 */
const otherProducts: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "AI Agents", description: "Speaks like a human.", icon: Bot },
  { title: "Omnichannel Inbox", description: "Manage chats & calls together.", icon: Inbox },
  { title: "WhatsApp Business API", description: "Instant customer connection.", icon: MessageCircle },
  { title: "Parallel Dialer", description: "Engage more leads faster.", icon: PhoneForwarded },
];

const ease = [0.22, 1, 0.36, 1] as const;

const rise = { hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } };

/**
 * The top of the pricing page: the hero, the billing and plan options, the
 * Essential plans, and the products sold by conversation.
 *
 * One client component because the hero's billing switch drives the plan
 * prices below it.
 */
export function PricingPlans() {
  const [billing, setBilling] = useState("monthly");
  const [region, setRegion] = useState(regions[0]);
  const [teamSize, setTeamSize] = useState<string>(teamSizes[0]);
  const [currency, setCurrency] = useState<Currency>("USD");
  const yearly = billing === "yearly";

  return (
    <MotionConfig reducedMotion="user">
      <PricingHeroBlock
        billing={billing}
        onBilling={setBilling}
        region={region}
        onRegion={setRegion}
        teamSize={teamSize}
        onTeamSize={setTeamSize}
        currency={currency}
        onCurrency={setCurrency}
      />

      <section className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-10">
        <EssentialPlans
          yearly={yearly}
          currency={currency}
          enterprise={teamSize === "50+"}
        />
        <OtherProducts />
      </section>
    </MotionConfig>
  );
}

function PricingHeroBlock({
  billing,
  onBilling,
  region,
  onRegion,
  teamSize,
  onTeamSize,
  currency,
  onCurrency,
}: {
  billing: string;
  onBilling: (value: string) => void;
  region: string;
  onRegion: (value: string) => void;
  teamSize: string;
  onTeamSize: (value: string) => void;
  currency: Currency;
  onCurrency: (value: Currency) => void;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative px-6 pt-8 pb-8 sm:pt-10 lg:px-10 lg:pt-12">
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
              Pricing
            </span>
            Transparent pricing · No hidden fees
          </span>
        </motion.div>

        <motion.h1
          variants={rise}
          transition={{ duration: 0.7, ease }}
          className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl"
        >
          The complete communication platform for{" "}
          <span className="relative inline-grid align-bottom">
            <span className="sr-only">{words[0]}</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={words[index]}
                aria-hidden
                className="col-start-1 row-start-1 bg-gradient-to-r from-brand-to via-primary to-brand-from bg-clip-text whitespace-nowrap text-transparent"
                initial={{ y: "60%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-60%", opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
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
          Five products. One platform. Pick what fits, or stack them all.
        </motion.p>

        <motion.ul
          variants={rise}
          transition={{ duration: 0.6, ease }}
          className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-sm text-muted-foreground"
        >
          {ticks.map((tick) => (
            <li key={tick} className="flex items-center gap-2">
              <CircleCheck className="size-4 text-primary" aria-hidden />
              {tick}
            </li>
          ))}
        </motion.ul>

        {/* Billing: the main switch, then the finer options in one bar. */}
        <motion.div
          variants={rise}
          transition={{ duration: 0.6, ease }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ToggleGroup
              type="single"
              value={billing}
              onValueChange={(v) => v && onBilling(v)}
              aria-label="Billing period"
              spacing={0}
              className="rounded-full border border-primary/15 bg-card/80 p-1 shadow-lg shadow-primary/10 backdrop-blur"
            >
              {(["monthly", "yearly"] as const).map((value) => (
                <ToggleGroupItem
                  key={value}
                  value={value}
                  className="relative h-10 rounded-full px-6 text-sm font-medium text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent data-[state=on]:text-primary-foreground"
                >
                  {billing === value ? (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-brand-to to-brand-from shadow-md shadow-primary/30"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">{value === "monthly" ? "Monthly" : "Yearly"}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Badge
              variant="secondary"
              className={cn(
                "rounded-full border border-primary/15 bg-accent px-3 py-1 text-primary transition-all duration-300",
                billing === "yearly" && "bg-primary text-primary-foreground shadow-md shadow-primary/25",
              )}
            >
              Save 3 months&rsquo; cost
            </Badge>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-2xl border border-border/70 bg-card/60 px-4 py-2.5 text-sm shadow-sm shadow-primary/5 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-muted-foreground">
                Phone number region
                <Info className="size-3.5" aria-hidden />
              </span>
              <Select value={region} onValueChange={onRegion}>
                <SelectTrigger className="h-8 w-32 rounded-full bg-card" aria-label="Phone number region">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <span aria-hidden className="hidden h-5 w-px bg-border sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Team size</span>
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={1}
                size="sm"
                value={teamSize}
                onValueChange={(v) => v && onTeamSize(v)}
                aria-label="Team size"
              >
                {teamSizes.map((size) => (
                  <ToggleGroupItem
                    key={size}
                    value={size}
                    className="rounded-full bg-card px-3 data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <span aria-hidden className="hidden h-5 w-px bg-border sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Currency</span>
              <Select value={currency} onValueChange={(v) => onCurrency(v as Currency)}>
                <SelectTrigger className="h-8 w-24 rounded-full bg-card" aria-label="Currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(currencies).map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** The products sold by conversation, as a strip of next steps. */
function OtherProducts() {
  return (
    <motion.div
      className="mt-14"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.07 }}
    >
      <motion.div
        variants={rise}
        transition={{ duration: 0.6, ease }}
        className="flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <p className="font-mono text-xs tracking-widest text-primary uppercase">More products</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Priced for your call volumes</h2>
        </div>
        <p className="max-w-md text-sm text-pretty text-muted-foreground">
          These are tailored to your call volumes and team size. Talk to us and
          we will put together a plan for you.
        </p>
      </motion.div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {otherProducts.map(({ title, description, icon: Icon }) => (
          <motion.div key={title} variants={rise} transition={{ duration: 0.5, ease }}>
            <Link
              href="/contact"
              className="group/product flex h-full items-center gap-4 rounded-2xl border border-border/80 bg-card/75 p-4 shadow-sm shadow-primary/5 backdrop-blur transition-all duration-300 outline-none hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover/product:-rotate-6 group-hover/product:bg-primary group-hover/product:text-primary-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{title}</span>
                <span className="block text-sm text-muted-foreground">{description}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
                <span className="sr-only 2xl:not-sr-only">Contact sales</span>
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover/product:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * The Essential plans, laid out wide rather than tall: four short plan
 * cards across — name, price, the next step — and one broad panel beneath
 * them with everything the chosen plan includes, set in columns.
 *
 * Choosing a card swaps the panel's contents and slides a ring onto that
 * card. The popular plan starts chosen and carries the focal treatment: a
 * light travelling round its border, a breathing halo and a badge.
 */
function EssentialPlans({
  yearly,
  currency,
  enterprise,
}: {
  yearly: boolean;
  currency: Currency;
  enterprise: boolean;
}) {
  const [chosen, setChosen] = useState(
    () => tiers.find((tier) => tier.popular)?.name ?? tiers[0].name,
  );
  const tier = tiers.find((t) => t.name === chosen) ?? tiers[0];

  return (
    <div className="relative">

        <motion.div
          className="mx-auto max-w-3xl text-center"
          id="plans"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div variants={rise} transition={{ duration: 0.6, ease }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-card/80 px-3 py-1 text-xs font-medium text-primary shadow-sm shadow-primary/10 backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden />
              AI Business Phone System · Essential
            </span>
          </motion.div>
          <motion.h2
            variants={rise}
            transition={{ duration: 0.6, ease }}
            className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Core Calling for{" "}
            <span className="bg-gradient-to-r from-brand-to to-brand-from bg-clip-text text-transparent">
              Business Teams
            </span>
          </motion.h2>
          <motion.p
            variants={rise}
            transition={{ duration: 0.6, ease }}
            className="mt-4 text-pretty text-muted-foreground sm:text-lg"
          >
            Ideal for small teams managing low to moderate call volumes and
            seeking reliable, day-to-day business calling.
          </motion.p>
        </motion.div>

        {enterprise ? (
          <p className="mx-auto mt-8 max-w-xl rounded-xl border border-primary/30 bg-card/80 px-4 py-3 text-center text-sm backdrop-blur">
            Teams of 50+ get Enterprise pricing.{" "}
            <Link
              href="#enterprise"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              See the Enterprise plan
            </Link>
          </p>
        ) : null}

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:mt-14 xl:grid-cols-4 2xl:gap-5">
          {tiers.map((t, index) => (
            <TierCard
              key={t.name}
              tier={t}
              index={index}
              yearly={yearly}
              currency={currency}
              chosen={t.name === chosen}
              onChoose={() => {
                setChosen(t.name);
                // On a phone the panel sits below all four cards; bring it up.
                document
                  .getElementById("plan-features")
                  ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
              }}
            />
          ))}
        </div>

        <FeaturePanel tier={tier} />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Local taxes will be applicable in addition to the listed prices.
        </p>
    </div>
  );
}

function TierCard({
  tier,
  index,
  yearly,
  currency,
  chosen,
  onChoose,
}: {
  tier: Tier;
  index: number;
  yearly: boolean;
  currency: Currency;
  chosen: boolean;
  onChoose: () => void;
}) {
  const featured = Boolean(tier.popular);
  const top = tier.name === "Ultimate";
  const starter = tier.name === "Starter";
  const highlights = tier.groups.flatMap((group) => group.items).slice(0, 4);
  const count =
    tier.groups.reduce((sum, group) => sum + group.items.length, 0) +
    (tier.integrations?.length ?? 0);
  const price =
    tier.price === null
      ? "Free"
      : formatPrice(yearly ? (tier.price * 9) / 12 : tier.price, currency);

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
        "group/card relative h-full gap-0 overflow-hidden rounded-[1.4rem] py-0 ring-0 transition-[box-shadow,border-color,background-color] duration-500",
        featured
          ? "border-0 bg-gradient-to-br from-card via-card to-accent shadow-2xl shadow-primary/25"
          : cn(
              "border backdrop-blur-sm group-hover/tier:border-primary/30 group-hover/tier:shadow-xl group-hover/tier:shadow-primary/15",
              top
                ? "border-primary/15 bg-gradient-to-b from-card to-card shadow-lg shadow-primary/10"
                : starter
                  ? "border-border/80 bg-gradient-to-b from-card via-card to-accent/70 shadow-sm shadow-primary/5"
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

      <div className="relative flex h-full flex-col p-5 2xl:p-6">
        <div>
          <div className="min-w-0">
            <h3
              className={cn(
                "flex items-center gap-2 text-lg font-semibold",
                featured && "text-primary",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  featured ? "bg-primary shadow-[0_0_10px] shadow-primary" : "bg-foreground/70",
                )}
              />
              {tier.name}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{tier.tagline}</p>
          </div>
        </div>

        <div className="mt-5">
          <span className="relative flex h-11 items-end overflow-y-clip">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={price}
                initial={{ y: 26, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -26, opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="text-[2.5rem] leading-none font-semibold tracking-tight tabular-nums"
              >
                {price}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="mt-1.5 block text-xs text-muted-foreground">
            {tier.price === null
              ? "Free forever"
              : yearly
                ? "Per user/month, billed yearly"
                : "Per user/month"}
          </span>
        </div>

        {/* The plan's lead features, from its own list; the panel below
            has the rest. flex-1 keeps every card's button on one line. */}
        <div className="mt-5 flex-1 border-t border-dashed border-border pt-4">
          <p className="text-[11px] font-semibold tracking-wider text-foreground/70 uppercase">
            {tier.inherits ? "Key additions" : "Key features"}
          </p>
          <ul className="mt-3 space-y-2">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-snug">
                <span
                  className={cn(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                    featured ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                  )}
                >
                  <Check className="size-2.5" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Button
            asChild
            size="lg"
            variant={featured || top ? "default" : "outline"}
            className={cn(
              "pricing-sheen group/cta relative flex-1 overflow-hidden rounded-full transition-all duration-300 hover:-translate-y-0.5",
              featured &&
                "bg-gradient-to-r from-brand-to to-brand-from shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
              top && "hover:shadow-lg hover:shadow-primary/25",
              !featured && !top && "bg-card hover:border-primary/40 hover:bg-accent hover:text-primary",
            )}
          >
            <Link href="/contact">
              {tier.cta}
              <ArrowRight
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={onChoose}
          aria-pressed={chosen}
          aria-controls="plan-features"
          className={cn(
            "mt-4 flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary",
            chosen
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <span>
            {chosen ? "Included below" : "What’s included"}
            <span className="ml-1.5 font-mono text-[11px] tabular-nums opacity-70">{count}</span>
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
                className="pricing-halo pointer-events-none absolute -inset-x-1 -inset-y-4 -z-10 sm:-inset-4 rounded-[2.2rem] bg-gradient-to-b from-brand-from/35 via-primary/20 to-transparent blur-2xl"
              />
              <div className="pricing-featured-border h-full rounded-[1.5rem] p-[1.5px]">{card}</div>
              <Badge className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-to to-brand-from px-3 py-1 shadow-md shadow-primary/30">
                <Flame aria-hidden />
                Most popular
              </Badge>
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

/**
 * Everything the chosen plan includes, in one wide panel: the inherited
 * line on top, then each feature group as a column, integrations last.
 */
function FeaturePanel({ tier }: { tier: Tier }) {
  const columns = tier.groups.length + (tier.integrations ? 1 : 0);

  return (
    <div
      id="plan-features"
      className="relative mt-6 overflow-hidden rounded-[1.6rem] border border-primary/10 bg-card/75 p-5 shadow-xl shadow-primary/10 backdrop-blur-md sm:p-7"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-brand-from/15 blur-3xl"
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease }}
          className="relative"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-4">
            <p className="text-sm font-semibold">
              What&rsquo;s included in{" "}
              <span className="text-primary">{tier.name}</span>
            </p>
            {tier.inherits ? (
              <p className="flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-muted-foreground ring-1 ring-primary/15">
                <ArrowDown className="size-3.5 text-primary" aria-hidden />
                {tier.inherits}
              </p>
            ) : null}
            <Link
              href="#compare"
              className="ml-auto text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              View all features
            </Link>
          </div>

          <motion.div
            className={cn(
              "mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2",
              columns >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
              columns >= 5 && "xl:grid-cols-5",
            )}
            initial="hidden"
            animate="shown"
            transition={{ staggerChildren: 0.06, delayChildren: 0.05 }}
          >
            {tier.groups.map(({ heading, icon: Icon, items }) => (
              <motion.div key={heading} variants={rise} transition={{ duration: 0.45, ease }}>
                <p className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-foreground/80 uppercase">
                  <span className="grid size-6 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  {heading}
                </p>
                <ul className="mt-3 space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-snug">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-2.5" strokeWidth={3} aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {tier.integrations ? (
              <motion.div variants={rise} transition={{ duration: 0.45, ease }}>
                <p className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-foreground/80 uppercase">
                  <span className="grid size-6 place-items-center rounded-md bg-primary/10 text-primary">
                    <Plug className="size-3.5" aria-hidden />
                  </span>
                  Integrations
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tier.integrations.map((name) => (
                    <Badge key={name} variant="outline" className="rounded-md bg-card">
                      <span className="flex size-3.5 items-center justify-center rounded-sm bg-primary text-[0.6rem] text-primary-foreground">
                        {name[0]}
                      </span>
                      {name}
                    </Badge>
                  ))}
                  <Badge variant="secondary" className="rounded-md">
                    50+
                  </Badge>
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
