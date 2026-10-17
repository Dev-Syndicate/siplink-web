"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  Info,
  Megaphone,
  ShieldCheck,
  Signal,
  UserCheck,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Iphone } from "@/components/ui/iphone";
import {
  tenDlcDefinition,
  tenDlcDisclaimer,
  tenDlcFaqs,
  tenDlcGuidelines,
  tenDlcHero,
  tenDlcIndustries,
  tenDlcLifecycle,
  tenDlcPrivacy,
  tenDlcProhibited,
  tenDlcRegistration,
  tenDlcSampleMessages,
  tenDlcSections,
  tenDlcSolution,
  tenDlcWhoNeedsIt,
  type LifecycleStep,
} from "@/lib/ten-dlc";
import { cn } from "@/lib/utils";

/**
 * The A2P 10DLC compliance guide as a page.
 *
 * Each section of the guide gets the form that suits what it is: the
 * definition as two halves of an acronym, registration as a checklist, the
 * consent-to-records journey as a timeline that fills as you read it, sample
 * messages as messages, prohibited practices as a warning. The words come
 * from lib/ten-dlc, which is the guide itself.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ------------------------------------------------------------- shared */

function Reveal({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={group}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")} amount={0.6}>
      <motion.div variants={rise} className={cn("flex items-center gap-2.5", center && "justify-center")}>
        <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
          {eyebrow}
        </span>
        <span className="h-px w-10 bg-primary/50" />
      </motion.div>
      <motion.h2
        variants={rise}
        className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={rise} className="mt-4 text-pretty text-muted-foreground">
          {description}
        </motion.p>
      )}
    </Reveal>
  );
}

function Bubble({
  from,
  text,
  className,
}: {
  from: "recipient" | "business";
  text: string;
  className?: string;
}) {
  const mine = from === "recipient";
  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start", className)}>
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug shadow-sm",
          mine
            ? "rounded-br-md bg-gradient-to-br from-brand-from to-brand-to font-semibold text-primary-foreground"
            : "rounded-bl-md border border-border/70 bg-card text-foreground",
        )}
      >
        {text}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- hero */

const THREAD: { from: "recipient" | "business"; text: string }[] = [
  { from: "business", text: tenDlcSampleMessages[1].text },
  { from: "recipient", text: "STOP" },
  { from: "business", text: tenDlcLifecycle[2].example![1].text.replace("[Business Name]", "ABC Medical") },
];

const CHECKS = [
  { label: "Brand registered", icon: BadgeCheck, at: 0 },
  { label: "Campaign registered", icon: Megaphone, at: 1 },
  { label: "Consent recorded", icon: UserCheck, at: 2 },
  { label: "STOP processed", icon: ShieldCheck, at: 4 },
];

export function TenDlcHero() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(reduce ? 6 : 0);

  // A slow script: checks light, the message arrives, STOP, confirmation.
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setBeat((b) => (b + 1) % 8), 1500);
    return () => window.clearInterval(id);
  }, [reduce]);

  const shown = reduce ? 3 : beat < 2 ? 0 : beat < 4 ? 1 : beat < 5 ? 2 : 3;
  const typing = !reduce && (beat === 1 || beat === 4);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 via-background to-background"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--primary)_18%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]"
        />
        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute -top-32 right-[10%] size-[560px] rounded-full bg-brand-from/20 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pt-16 pb-20 lg:grid-cols-12 lg:items-center lg:px-10 lg:pt-20 lg:pb-24">
          <Reveal className="lg:col-span-7" amount={0.3}>
            <motion.div variants={rise}>
              <Badge
                variant="secondary"
                className="gap-1.5 border border-primary/20 bg-card/70 px-3 py-1 font-mono text-xs tracking-wider uppercase backdrop-blur"
              >
                <ShieldCheck className="size-3.5 text-primary" />
                {tenDlcHero.eyebrow}
              </Badge>
            </motion.div>
            <motion.h1
              variants={rise}
              className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
            >
              Compliant business SMS,{" "}
              <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                made clear
              </span>
            </motion.h1>
            <motion.p variants={rise} className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              {tenDlcHero.description}
            </motion.p>
            <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="group rounded-full shadow-md shadow-primary/20">
                <Link href="/contact">
                  Discuss your 10DLC requirements
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-card/70">
                <Link href="#overview">Read the guide</Link>
              </Button>
            </motion.div>

            {/* Jump links */}
            <motion.nav variants={rise} aria-label="Guide sections" className="mt-10 flex flex-wrap gap-2">
              {tenDlcSections.map((s) => (
                <Link
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-border/80 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {s.label}
                </Link>
              ))}
            </motion.nav>
          </Reveal>

          {/* The phone, running a compliant thread */}
          <motion.div
            className="relative flex items-center justify-center gap-6 lg:col-span-5"
            style={{ y: phoneY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
          >
            <div aria-hidden className="absolute inset-10 rounded-full bg-primary/15 blur-3xl" />
            {/* Compliance checks lighting beside the phone */}
            <div className="relative z-10 hidden shrink-0 flex-col gap-3 sm:flex">
              {CHECKS.map(({ label, icon: Icon, at }, i) => {
                const on = reduce || beat >= at;
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.125, duration: 0.5 }}
                    className={cn(
                      "flex items-center gap-2 rounded-full border bg-card/90 py-1.5 pr-3.5 pl-1.5 text-xs font-semibold shadow-lg backdrop-blur-md transition-all duration-500",
                      on ? "border-primary/30 text-foreground shadow-primary/15" : "border-border/60 text-muted-foreground shadow-foreground/5",
                      i % 2 === 1 && "ml-8",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full transition-colors duration-500",
                        on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {on ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
                    </span>
                    {label}
                  </motion.div>
                );
              })}
            </div>
            <Iphone className="relative w-[250px] shrink-0 drop-shadow-2xl sm:w-[270px]">
              <div className="flex h-full flex-col bg-gradient-to-b from-accent/60 to-card">
                <div className="flex items-center gap-2 border-b border-border/70 bg-card/90 px-4 pt-10 pb-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary font-mono text-[11px] font-bold text-primary-foreground">
                    AM
                  </span>
                  <div className="leading-tight">
                    <div className="text-xs font-semibold text-foreground">ABC Medical</div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Signal className="size-2.5" /> 10-digit long code
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-end gap-2.5 p-3 text-[12px]">
                  <AnimatePresence initial={false}>
                    {THREAD.slice(0, shown).map((m, i) => (
                      <motion.div
                        key={`${i}-${m.text}`}
                        initial={{ opacity: 0, y: 14, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <Bubble from={m.from} text={m.text} className="[&>div]:text-[12px]" />
                      </motion.div>
                    ))}
                    {typing && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-start"
                      >
                        <span className="flex gap-1 rounded-2xl border border-border/70 bg-card px-3 py-2.5">
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="size-1.5 rounded-full bg-muted-foreground/60"
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 0.75, repeat: Infinity, delay: d * 0.125 }}
                            />
                          ))}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Iphone>

          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ----------------------------------------------------------- overview */

export function TenDlcOverview() {
  const { parts, summary, useCases } = tenDlcDefinition;
  return (
    <MotionConfig reducedMotion="user">
      <section id="overview" className="scroll-mt-28 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader
            eyebrow="A2P 10DLC Overview"
            title="What is A2P 10DLC?"
            description={summary}
          />

          {/* The acronym, split */}
          <Reveal className="mt-12 grid gap-5 md:grid-cols-2">
            {parts.map((part, i) => (
              <motion.div key={part.short} variants={rise} whileHover={{ y: -4 }}>
                <Card className="group relative h-full overflow-hidden rounded-3xl border-border/70 py-0 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <CardContent className="flex items-center gap-6 p-7 sm:p-8">
                    <span className="bg-gradient-to-br from-brand-from to-brand-to bg-clip-text font-mono text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
                      {part.short}
                    </span>
                    <span className="h-14 w-px bg-border" />
                    <div>
                      <div className="text-lg font-semibold text-foreground">{part.long}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{part.note}</p>
                    </div>
                    <span aria-hidden className="absolute -right-4 -bottom-8 font-mono text-8xl font-black text-primary/[0.05] select-none">
                      {i === 0 ? "A2P" : "10"}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Reveal>

          {/* Common uses */}
          <Reveal className="mt-10">
            <motion.p variants={rise} className="text-sm font-medium text-foreground">
              Businesses use A2P messaging for
            </motion.p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {useCases.map(({ label, icon: Icon }) => (
                <motion.div
                  key={label}
                  variants={rise}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </motion.div>
              ))}
            </div>
            <motion.p variants={rise} className="mt-4 text-sm text-muted-foreground">
              …and other business communications.
            </motion.p>
          </Reveal>

          {/* Who needs it */}
          <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionHeader eyebrow="Who needs it" title="Who needs A2P 10DLC?" description={tenDlcWhoNeedsIt.statement} />
              <Reveal className="mt-8">
                <motion.div variants={rise} className="rounded-2xl border border-primary/20 bg-accent/40 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Info className="size-4 text-primary" />
                    Requirements can vary based on
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {tenDlcWhoNeedsIt.varies.map((v) => (
                      <li key={v} className="rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground shadow-xs">
                        {v}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-7 lg:pt-16">
              <motion.p variants={rise} className="text-sm font-medium text-foreground">
                This can include
              </motion.p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {tenDlcWhoNeedsIt.industries.map((industry) => (
                  <motion.li
                    key={industry}
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, shown: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}
                    className="rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-medium text-foreground shadow-xs transition-colors duration-300 hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
                  >
                    {industry}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ------------------------------------------------------- registration */

export function TenDlcRegistration() {
  const { intro, groups, callout } = tenDlcRegistration;
  let counter = 0;
  return (
    <MotionConfig reducedMotion="user">
      <section id="registration" className="scroll-mt-28 border-y border-border bg-muted/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader eyebrow="Registration requirements" title="What registration asks for" description={intro} />

          <Reveal className="mt-12 grid gap-5 lg:grid-cols-3">
            {groups.map(({ title, icon: GroupIcon, items }) => (
              <motion.div key={title} variants={rise} whileHover={{ y: -4 }} className="h-full">
                <Card className="h-full rounded-3xl border-border/70 py-0 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <CardContent className="p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground shadow-md shadow-primary/30">
                        <GroupIcon className="size-5" />
                      </span>
                      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {items.map(({ label, icon: Icon }) => {
                        const n = ++counter;
                        return (
                          <motion.li
                            key={label}
                            variants={{ hidden: { opacity: 0, x: -10 }, shown: { opacity: 1, x: 0, transition: { delay: n * 0.06 } } }}
                            className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-3"
                          >
                            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Icon className="size-3.5" />
                            </span>
                            <span className="text-sm text-foreground">{label}</span>
                            <span className="ml-auto font-mono text-[10px] text-muted-foreground/70">
                              {String(n).padStart(2, "0")}
                            </span>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Reveal>

          <Reveal className="mt-8">
            <motion.div
              variants={rise}
              className="flex items-start gap-4 rounded-2xl border border-primary/25 bg-card p-5 shadow-sm sm:items-center sm:p-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ClipboardCheck className="size-5" />
              </span>
              <p className="text-sm font-medium text-foreground sm:text-base">{callout}</p>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ---------------------------------------------------------- lifecycle */

function LifecycleCard({ step }: { step: LifecycleStep }) {
  const Icon = step.icon;
  return (
    <Card className="rounded-3xl border-border/70 py-0 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
      <CardContent className="p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
            {step.kicker}
          </span>
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{step.title}</h3>
        {step.body.map((p) => (
          <p key={p} className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
            {p}
          </p>
        ))}

        {step.list && (
          <div className="mt-5">
            <div className="text-xs font-semibold tracking-wide text-foreground uppercase">{step.list.heading}</div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {step.list.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {step.example && (
          <div className="mt-5 rounded-2xl border border-border/60 bg-gradient-to-b from-accent/50 to-muted/30 p-4">
            <div className="mb-3 flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              <Icon className="size-3" /> Example
            </div>
            <div className="space-y-2">
              {step.example.map((m) => (
                <Bubble key={m.text} from={m.from} text={m.text} />
              ))}
            </div>
          </div>
        )}

        {step.note && (
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent/60 p-3.5 text-sm font-medium text-accent-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            {step.note}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TenDlcLifecycle() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <MotionConfig reducedMotion="user">
      <section id="lifecycle" className="scroll-mt-28 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader
            eyebrow="Consent, opt-out & records"
            title="From opt-in to opt-out, step by step"
            description="Every compliant program follows the same journey: get permission, disclose clearly, let people leave and ask for help, and keep a record of all of it."
            center
          />

          <ol ref={ref} className="relative mx-auto mt-16 max-w-5xl">
            {/* The rail, filling as you read */}
            <span aria-hidden className="absolute top-0 bottom-0 left-6 w-px bg-border lg:left-1/2" />
            <motion.span
              aria-hidden
              className="absolute top-0 bottom-0 left-6 w-px origin-top bg-gradient-to-b from-brand-from to-brand-to lg:left-1/2"
              style={{ scaleY: fill }}
            />

            {tenDlcLifecycle.map((step, i) => {
              const Icon = step.icon;
              const right = i % 2 === 1;
              return (
                <li key={step.id} id={step.id} className="relative mb-12 scroll-mt-28 pl-20 last:mb-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">
                  <motion.span
                    className="absolute top-2 left-6 z-10 flex size-12 -translate-x-1/2 items-center justify-center rounded-2xl border-4 border-background bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground shadow-lg shadow-primary/30 lg:left-1/2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <Icon className="size-5" />
                  </motion.span>

                  <motion.div
                    className={cn("lg:pt-1", right ? "lg:col-start-2 lg:pl-10" : "lg:col-start-1 lg:pr-10 lg:text-right")}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="font-mono text-4xl font-bold text-primary/20 lg:text-6xl">{step.step}</span>
                  </motion.div>

                  <motion.div
                    className={cn("mt-2 lg:mt-0", right ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-2")}
                    initial={{ opacity: 0, x: right ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <LifecycleCard step={step} />
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </MotionConfig>
  );
}

/* --------------------------------------------------------- guidelines */

export function TenDlcGuidelines() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="guidelines" className="scroll-mt-28 border-y border-border bg-gradient-to-b from-accent/30 via-background to-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Messaging guidelines" title="Send messages people expect" />
            <Reveal className="mt-8 space-y-4">
              {tenDlcGuidelines.map(({ title, body, icon: Icon }) => (
                <motion.div
                  key={title}
                  variants={rise}
                  className="group flex gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">{body}</p>
                  </div>
                </motion.div>
              ))}
            </Reveal>
          </div>

          {/* Sample messages, as messages */}
          <div className="lg:col-span-7">
            <Reveal className="relative rounded-[2rem] border border-border/70 bg-card/80 p-5 shadow-xl shadow-primary/10 backdrop-blur sm:p-8">
              <motion.div variants={rise} className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
                  Representative sample messages
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" /> Identifies the sender
                </span>
              </motion.div>
              <div className="mt-6 space-y-5">
                {tenDlcSampleMessages.map((m, i) => (
                  <motion.div
                    key={m.text}
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.97 },
                      shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, delay: i * 0.125 } },
                    }}
                    className="group"
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 font-mono text-[9px] font-bold text-primary">
                        {m.sender.split(" ").map((w) => w[0]).join("")}
                      </span>
                      <span className="text-xs font-semibold text-foreground">{m.sender}</span>
                      <Badge variant="outline" className="ml-auto font-mono text-[10px]">
                        {m.tag}
                      </Badge>
                    </div>
                    <div className="rounded-2xl rounded-tl-md border border-border/70 bg-background px-4 py-3 text-sm leading-relaxed text-foreground shadow-xs transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md group-hover:shadow-primary/10">
                      <span className="font-semibold text-primary">{m.sender}:</span>
                      {m.text.slice(m.sender.length + 1)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ------------------------------------------------ privacy & prohibited */

export function TenDlcPrivacy() {
  const Warn = tenDlcProhibited.icon;
  return (
    <MotionConfig reducedMotion="user">
      <section id="privacy" className="scroll-mt-28 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Privacy */}
            <Reveal className="h-full">
              <motion.div variants={rise} className="h-full">
                <Card className="h-full rounded-3xl border-border/70 py-0 shadow-sm">
                  <CardContent className="flex h-full flex-col p-7 sm:p-8">
                    <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
                      Privacy & data handling
                    </span>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      Protect customer information
                    </h2>
                    <ul className="mt-5 space-y-3">
                      {tenDlcPrivacy.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm font-medium text-foreground">
                      Particularly important for organizations handling sensitive information:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tenDlcPrivacy.sensitive.map((s) => (
                        <span key={s} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-6">
                      <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-gradient-to-r from-accent to-accent/30 p-4">
                        <Info className="mt-0.5 size-5 shrink-0 text-primary" />
                        <p className="text-sm font-semibold text-foreground">{tenDlcPrivacy.warning}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>

            {/* Prohibited */}
            <Reveal className="h-full">
              <motion.div variants={rise} className="h-full">
                <Card className="relative h-full overflow-hidden rounded-3xl border-destructive/25 py-0 shadow-sm">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-destructive/70 via-destructive to-destructive/70" />
                  <CardContent className="p-7 sm:p-8">
                    <div className="flex items-center gap-2">
                      <Warn className="size-4 text-destructive" />
                      <span className="font-mono text-xs font-semibold tracking-widest text-destructive uppercase">
                        Prohibited & deceptive messaging
                      </span>
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      Use SMS responsibly
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tenDlcProhibited.intro}</p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {tenDlcProhibited.items.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.0625 }}
                          className="flex items-start gap-2.5 rounded-xl border border-destructive/15 bg-destructive/5 p-3 text-sm text-foreground"
                        >
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                            <X className="size-3" />
                          </span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

/* --------------------------------------------------------- industries */

export function TenDlcIndustries() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="industries" className="scroll-mt-28 border-y border-border bg-muted/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader
            eyebrow="Industry-specific considerations"
            title="What to watch for in your industry"
          />
          <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {tenDlcIndustries.map(({ name, icon: Icon, body }, i) => (
              <motion.div
                key={name}
                variants={rise}
                whileHover={{ y: -6 }}
                className={cn(i < 2 ? "lg:col-span-3" : "lg:col-span-2")}
              >
                <Card className="group relative h-full overflow-hidden rounded-3xl border-border/70 py-0 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <span aria-hidden className="absolute -top-10 -right-10 size-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
                  <CardContent className="relative p-6 sm:p-7">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:-rotate-6">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">{body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ----------------------------------------------------------- solution */

export function TenDlcSolution() {
  const { title, body, supports, closing, tagline } = tenDlcSolution;
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div aria-hidden className="absolute top-0 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-brand-from/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:items-center lg:px-10">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="SIPLINK A2P 10DLC solution" title={title} description={body} />
            <Reveal className="mt-6">
              <motion.p variants={rise} className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {closing}
              </motion.p>
              <motion.p variants={rise} className="mt-6 text-lg font-semibold text-balance text-foreground">
                {tagline.split(". ").map((part, i, all) => (
                  <span key={part} className={cn(i === all.length - 1 && "text-primary")}>
                    {part}
                    {i < all.length - 1 ? ". " : ""}
                  </span>
                ))}
              </motion.p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7">
            <motion.p variants={rise} className="mb-4 text-sm font-medium text-foreground">
              SIPLINK can support messaging workflows around
            </motion.p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {supports.map(({ label, icon: Icon }) => (
                <motion.div
                  key={label}
                  variants={rise}
                  whileHover={{ y: -4 }}
                  className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-xs transition-shadow duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground shadow-sm shadow-primary/30">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ---------------------------------------------------------------- FAQ */

export function TenDlcFaq() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tenDlcFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="faq" className="scroll-mt-28 border-t border-border py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20 lg:px-10">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              eyebrow="A2P 10DLC FAQ"
              title="Frequently asked questions"
              description="Short answers to the questions businesses ask most about A2P 10DLC."
            />
          </div>

          <Reveal amount={0.05}>
            <Accordion type="single" collapsible className="w-full">
              {tenDlcFaqs.map(({ question, answer }, index) => (
                <motion.div key={question} variants={rise}>
                  <AccordionItem value={`dlc-faq-${index}`}>
                    <AccordionTrigger className="text-left text-base">{question}</AccordionTrigger>
                    <AccordionContent className="text-pretty text-muted-foreground">{answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </Reveal>
        </div>

        {/* Disclaimer */}
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
          <Reveal>
            <motion.aside
              variants={rise}
              aria-label="Compliance disclaimer"
              className="flex gap-4 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-foreground">
                <AlertTriangle className="size-5" />
              </span>
              <div>
                <div className="font-mono text-xs font-semibold tracking-widest text-foreground uppercase">
                  Important · Compliance disclaimer
                </div>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">{tenDlcDisclaimer}</p>
              </div>
            </motion.aside>
          </Reveal>
        </div>

        <script
          type="application/ld+json"
          // `<` is escaped so a stray "</script>" in an answer cannot end the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "<"),
          }}
        />
      </section>
    </MotionConfig>
  );
}
