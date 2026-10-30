"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  AudioLines,
  Check,
  Cloud,
  Grid2x2Check,
  Headset,
  Mic,
  PhoneCall,
  Star,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { aiAddOns, callingAllowance, plans, type Plan } from "@/lib/pricing";
import { googleReviewsUrl, reviewStats, reviews } from "@/lib/site";
import { cn } from "@/lib/utils";

export type Currency = "inr" | "usd";

const ease = [0.22, 1, 0.36, 1] as const;

const priceOf = (plan: Plan, currency: Currency) =>
  currency === "inr" ? plan.inr : plan.usd;

/** "₹1,799" → 1799, for sizing the chart's bars. */
const amountOf = (plan: Plan) => Number(plan.inr.replace(/[^\d.]/g, ""));

/** The three facts beside the asks; each is stated elsewhere on the site. */
const POINTS = [
  "Priced per line, per month",
  `${callingAllowance.region} ${callingAllowance.allowance}`,
  "24/7 expert support",
];

/** Capabilities on the floating list; each is a feature in lib/pricing.ts. */
const CAPABILITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Cloud PBX", icon: Cloud },
  { label: "IVR & auto-attendant", icon: Grid2x2Check },
  { label: "Call recording", icon: Mic },
  { label: "AI Voice Assistant", icon: AudioLines },
];

/** The transcription add-on, from the SIPLINK AI add-ons. */
const transcription = aiAddOns.find((addOn) => addOn.title === "AI Call Transcription");

/** The verified Google rating, from the proof bar's figures. */
const googleRating = reviewStats.find((stat) => stat.label.includes("Google"));

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * The pricing hero: copy on the left over a bright studio scene
 * (public/images/pricing_bg.png), and on the right glass cards floating
 * above the scene's pedestals — the plans' prices as a chart with the
 * currency switch, a few capabilities, and the support promise.
 *
 * Every figure here is real: prices from lib/pricing.ts, the Google rating
 * and reviewers' initials from lib/site.ts. The background drifts in very
 * slowly and the cards float; all of it stops under reduced motion.
 *
 * From `lg` the hero is one screen tall (less the header), so it is all in
 * view on arrival.
 */
export function PricingHero({
  currency,
  onCurrency,
}: {
  currency: Currency;
  onCurrency: (value: Currency) => void;
}) {
  return (
    <div className="relative isolate overflow-hidden">
      {/* The scene. Anchored bottom-right so the pedestals stay in frame;
          a white wash on the left keeps the copy legible on any crop, and the
          whole scene fades out at its foot into the stage behind, so the hero
          has no hard bottom edge. */}
      <div aria-hidden className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_72%,transparent)]">
        <Image
          src="/images/pricing_bg.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="pricing-kenburns object-cover object-[70%_100%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/40 lg:bg-gradient-to-r lg:from-background/85 lg:via-background/10 lg:to-transparent" />
      </div>

      {/* One screen tall from `lg`: the viewport less the header (h-16 pill,
          its pt-3, the h-10 announcement bar) and the stage's top gap. */}
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 px-5 pt-14 pb-12 sm:px-8 lg:h-[calc(100svh-8.5rem)] lg:max-h-[60rem] lg:min-h-[36rem] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:px-12 lg:py-10">
        <div>
          <Rise delay={0}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-card/70 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase shadow-sm shadow-primary/10 backdrop-blur">
              <span className="relative flex size-1.5">
                <span className="pricing-ping absolute inset-0 rounded-full bg-primary" />
                <span className="relative size-1.5 rounded-full bg-primary" />
              </span>
              Pricing
            </span>
          </Rise>

          <Rise delay={0.08}>
            <h1 className="mt-6 font-heading text-[clamp(2.6rem,min(4.6vw,8.5svh),4.25rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance">
              Simple plans for{" "}
              <span className="pricing-text-flow lg:block lg:whitespace-nowrap">bigger possibilities</span>
            </h1>
          </Rise>

          <Rise delay={0.16}>
            <p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg lg:[@media(max-height:760px)]:hidden">
              Choose the plan that fits your team, from essential business
              calling to AI and enterprise integrations. Everything a plan
              includes is listed on its card.
            </p>
          </Rise>

          <Rise delay={0.24}>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
              {POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground shadow-sm shadow-primary/30">
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Rise>

          <Rise delay={0.32}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="pricing-sheen group/cta relative h-13 overflow-hidden rounded-full bg-gradient-to-r from-brand-to to-brand-from px-8 text-base shadow-xl shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/40"
              >
                <Link href="#plans">
                  View plans
                  <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group/cta h-13 rounded-full border-primary/10 bg-card/80 px-8 text-base shadow-lg shadow-primary/10 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card hover:text-primary"
              >
                <Link href="/contact">
                  Talk to sales
                  <Headset className="transition-transform duration-300 group-hover/cta:rotate-12" aria-hidden />
                </Link>
              </Button>
            </div>
          </Rise>

          {googleRating ? (
            <Rise delay={0.4}>
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/proof mt-10 inline-flex items-center gap-5 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex -space-x-2.5">
                  {reviews.slice(0, 5).map((review) => (
                    <span
                      key={review.name}
                      title={review.name}
                      className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-accent to-card text-xs font-semibold text-primary ring-2 ring-card shadow-md shadow-primary/10"
                    >
                      {initialsOf(review.name)}
                    </span>
                  ))}
                </span>
                <span aria-hidden className="h-10 w-px bg-border" />
                <span>
                  <span className="flex items-center gap-2">
                    <Stars rating={Number(googleRating.value)} />
                    <span className="text-base font-semibold">{googleRating.value}/5</span>
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground transition-colors group-hover/proof:text-primary">
                    {googleRating.label}
                  </span>
                </span>
              </a>
            </Rise>
          ) : null}
        </div>

        <FloatingCards currency={currency} onCurrency={onCurrency} />
      </div>
    </div>
  );
}

function Rise({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.1 + delay }}
    >
      {children}
    </motion.div>
  );
}

/** Five stars, filled up to the rating (a half star shows as half). */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative size-4">
            <Star className="absolute inset-0 size-4 text-primary/25" fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-4 text-primary" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * Glass cards floating over the scene's pedestals. From `lg` they are laid
 * out freely over the right half; below it only the price chart shows, in
 * the flow, since the plan cards follow straight after.
 */
function FloatingCards({
  currency,
  onCurrency,
}: {
  currency: Currency;
  onCurrency: (value: Currency) => void;
}) {
  return (
    <div className="relative lg:h-full">
      {/* The price chart, over the tall pedestal. From `xl` it moves to the
          centre, a little narrower, with a small card tucked over each of
          its edges. */}
      <Float
        className="relative z-10 mx-auto max-w-sm lg:absolute lg:top-[12%] lg:right-[6%] lg:mx-0 lg:w-[22rem] lg:max-w-none xl:top-[10%] xl:right-auto xl:left-1/2 xl:w-[19rem] xl:-translate-x-1/2"
        delay={0.5}
        bob={{ duration: 7, y: -12 }}
      >
        <PriceChart currency={currency} onCurrency={onCurrency} />
      </Float>

      {/* Either side of the chart: the transcription add-on, live, and the
          calling allowance. From `xl`, on all but the shortest screens. */}
      <Float
        className="z-20 hidden xl:absolute xl:top-[18%] xl:-left-8 xl:block xl:w-40 xl:[@media(max-height:600px)]:hidden"
        delay={0.65}
        bob={{ duration: 6, y: -10, delay: -1.5 }}
      >
        <TranscriptionCard />
      </Float>
      <Float
        className="z-20 hidden xl:absolute xl:top-[30%] xl:-right-8 xl:block xl:w-40 xl:[@media(max-height:600px)]:hidden"
        delay={0.8}
        bob={{ duration: 7.5, y: 10, delay: -4 }}
      >
        <CallingCard />
      </Float>

      {/* What the plans carry, to the left of it. This and the support card
          stand down on short screens, where they would crowd the chart. */}
      <Float
        className="hidden lg:absolute lg:top-[52%] lg:left-0 lg:block lg:w-60 lg:[@media(max-height:860px)]:hidden"
        delay={0.7}
        bob={{ duration: 8, y: 10, delay: -2 }}
      >
        <GlassCard className="p-4">
          <ul className="space-y-1">
            {CAPABILITIES.map(({ label, icon: Icon }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease, delay: 1 + i * 0.1 }}
                className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-accent text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                {label}
              </motion.li>
            ))}
          </ul>
        </GlassCard>
      </Float>

      {/* The support promise, over the small pedestal. */}
      <Float
        className="hidden lg:absolute lg:right-[2%] lg:bottom-[16%] lg:block lg:w-56 lg:[@media(max-height:860px)]:hidden"
        delay={0.9}
        bob={{ duration: 6.5, y: -9, delay: -3 }}
      >
        <GlassCard className="flex items-center gap-4 p-4">
          <SupportRing />
          <div>
            <p className="text-2xl font-semibold tracking-tight">24/7</p>
            <p className="text-sm text-muted-foreground">Expert support</p>
          </div>
        </GlassCard>
      </Float>
    </div>
  );
}

function Float({
  className,
  delay,
  bob,
  children,
}: {
  className: string;
  delay: number;
  bob: { duration: number; y: number; delay?: number };
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      <div
        className="pricing-bob"
        style={
          {
            "--bob-duration": `${bob.duration}s`,
            "--bob-delay": `${bob.delay ?? 0}s`,
            "--bob-x": "0px",
            "--bob-y": `${bob.y}px`,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </motion.div>
  );
}

function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.4rem] border border-card/80 bg-card/60 shadow-2xl shadow-primary/15 ring-1 ring-primary/10 backdrop-blur-xl",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-card to-transparent"
      />
      {children}
    </div>
  );
}

/** Bar heights for the waveform, as a share of its height. */
const WAVE = [0.35, 0.6, 0.9, 0.55, 1, 0.7, 0.4, 0.8, 0.5, 0.95, 0.6, 0.3];

/** The transcription add-on, with a voice waveform moving in it. */
function TranscriptionCard() {
  return (
    <GlassCard className="p-3.5">
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground shadow-md shadow-primary/30">
          <AudioLines className="size-3.5" aria-hidden />
        </span>
        <span className="relative flex size-1.5">
          <span className="pricing-ping absolute inset-0 rounded-full bg-primary" />
          <span className="relative size-1.5 rounded-full bg-primary" />
        </span>
      </div>
      <div aria-hidden className="mt-3 flex h-9 items-center gap-1">
        {WAVE.map((h, i) => (
          <span
            key={i}
            className="pricing-wave w-1.5 flex-1 rounded-full bg-gradient-to-t from-brand-to to-brand-from"
            style={
              {
                height: `${h * 100}%`,
                "--wave-delay": `${-i * 0.13}s`,
                "--wave-duration": `${0.9 + (i % 3) * 0.25}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <p className="mt-3 text-sm leading-tight font-semibold">{transcription?.title}</p>
      <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{transcription?.subtitle}</p>
    </GlassCard>
  );
}

/** The calling allowance: a ringing phone, and a signal crossing the border. */
function CallingCard() {
  return (
    <GlassCard className="p-3.5">
      <span className="relative grid size-9 place-items-center">
        <span className="pricing-ripple absolute inset-0 rounded-full bg-primary/25" />
        <span className="pricing-ripple absolute inset-0 rounded-full bg-primary/25 [--ripple-delay:-1.1s]" />
        <span className="relative grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground shadow-md shadow-primary/30">
          <PhoneCall className="size-4" aria-hidden />
        </span>
      </span>
      <p className="mt-3 text-sm leading-tight font-semibold">{callingAllowance.region}</p>
      <p className="text-[11px] leading-snug text-muted-foreground first-letter:uppercase">{callingAllowance.allowance}</p>
      <div aria-hidden className="mt-3 flex items-center gap-2 font-mono text-[10px] font-semibold text-primary">
        US
        <span className="relative h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--color-primary)_0_3px,transparent_3px_6px)] opacity-60">
          <span className="pricing-travel absolute -top-[3px] left-0 size-[7px] rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
        </span>
        CAN
      </div>
    </GlassCard>
  );
}

/** The three plans as bars, tallest for the dearest, with the switch. */
function PriceChart({
  currency,
  onCurrency,
}: {
  currency: Currency;
  onCurrency: (value: Currency) => void;
}) {
  const top = Math.max(...plans.map(amountOf));

  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Per line, per month</p>
          <p className="text-xs text-muted-foreground">Taxes extra, as applicable.</p>
        </div>
        <CurrencySwitch currency={currency} onCurrency={onCurrency} />
      </div>

      <div className="mt-5 grid h-40 grid-cols-3 items-end gap-3">
        {plans.map((plan, i) => {
          const share = amountOf(plan) / top;
          return (
            <Link
              key={plan.name}
              href="#plans"
              className="group/bar flex h-full flex-col justify-end outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`${plan.name}: ${priceOf(plan, currency)} per line per month`}
            >
              <span className="mb-1.5 text-center text-sm font-semibold tabular-nums">
                {priceOf(plan, currency)}
              </span>
              <motion.span
                className={cn(
                  "block origin-bottom rounded-t-xl rounded-b-md transition-[filter] duration-300 group-hover/bar:brightness-105",
                  plan.featured
                    ? "bg-gradient-to-t from-brand-to to-brand-from shadow-lg shadow-primary/30"
                    : "bg-gradient-to-t from-primary/35 to-primary/15",
                )}
                style={{ height: `${share * 75}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.9, ease, delay: 0.9 + i * 0.12 }}
              />
            </Link>
          );
        })}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3 border-t border-border/70 pt-2 text-center text-[11px] text-muted-foreground">
        {plans.map((plan) => (
          <span key={plan.name} className={cn(plan.featured && "font-semibold text-primary")}>
            {plan.name}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

/** A ring that draws itself closed: round the clock. */
function SupportRing() {
  return (
    <svg viewBox="0 0 48 48" className="size-14 -rotate-90" aria-hidden>
      <defs>
        <linearGradient id="pricing-ring" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-from)" />
          <stop offset="100%" stopColor="var(--brand-to)" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="none" strokeWidth="7" className="stroke-primary/15" />
      <motion.circle
        cx="24"
        cy="24"
        r="18"
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        stroke="url(#pricing-ring)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease, delay: 1.2 }}
      />
    </svg>
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
      className="rounded-full border border-primary/15 bg-card/70 p-0.5"
    >
      {(["inr", "usd"] as const).map((value) => (
        <ToggleGroupItem
          key={value}
          value={value}
          className="relative h-8 rounded-full px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent data-[state=on]:text-primary-foreground"
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
