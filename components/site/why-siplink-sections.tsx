"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Headphones,
  LayoutGrid,
  Network,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { whySipLinkDifferentiators } from "@/lib/company";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ======================================================================
 * Differentiators, as an explorer
 * ====================================================================== */

/** A photograph behind each differentiator, in the order of lib/company. */
const BACKDROPS = [
  "/images/pillar-unified-communications.png",
  "/images/cloud-communications.png",
  "/images/about/about-unified-voice.png",
  "/images/agent-cloud-telephony.png",
  "/images/pillar-sip-trunking.png",
  "/images/hero-agent-headset.png",
  "/images/about/about-mission.jpg",
];

const STEP_MS = 7000;

/**
 * Seven differentiators are too many to read as a grid of equal cards, so
 * they become an explorer: the list on the left, one at a time on the right
 * over its own photograph. It advances on its own — the active item's rail
 * fills to show when — and stops for good the moment someone picks one.
 */
export function DifferentiatorExplorer() {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!auto || paused || reduce) return;
    const id = window.setTimeout(
      () => setActive((a) => (a + 1) % whySipLinkDifferentiators.length),
      STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [active, auto, paused, reduce]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div
          aria-hidden
          className="glass-orb -top-20 left-[10%] size-96 bg-brand-to/15"
          style={{ "--orb-duration": "12s", "--orb-x": "80px", "--orb-y": "50px" } as React.CSSProperties}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Built for Modern Teams
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Why leading businesses choose SipLink
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              From growing startups to multi-branch enterprises, SipLink brings
              together voice, collaboration, and CRM workflows into one resilient
              system.
            </p>
          </motion.div>

          <Tabs
            value={String(active)}
            onValueChange={(v) => {
              setActive(Number(v));
              setAuto(false);
            }}
            orientation="vertical"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8"
          >
            <TabsList
              variant="line"
              className="flex h-auto w-full flex-row justify-start gap-2 overflow-x-auto p-0 pb-2 max-lg:flex-row! lg:col-span-5 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
            >
              {whySipLinkDifferentiators.map((item, i) => {
                const Icon = item.icon;
                const on = i === active;
                return (
                  <TabsTrigger
                    key={item.title}
                    value={String(i)}
                    className={cn(
                      "group/t relative h-auto shrink-0 justify-start gap-3 overflow-hidden rounded-2xl border border-transparent px-3 py-3 text-left whitespace-normal after:hidden max-lg:w-auto! max-lg:p-1.5 lg:w-full lg:px-4",
                      on ? "border-border/70 bg-card shadow-lg shadow-primary/10" : "hover:bg-card/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                        on ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "bg-primary/10 text-primary",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="flex min-w-0 flex-col max-lg:sr-only">
                      <span className={cn("text-sm font-semibold", on ? "text-foreground" : "text-foreground/70")}>
                        {item.title}
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="hidden overflow-hidden text-xs leading-relaxed text-muted-foreground lg:block"
                      >
                        <span className="block pt-1">{item.summary}</span>
                      </motion.span>
                    </span>

                    {/* The rail fills while this one is up */}
                    {on && auto && !reduce && (
                      <span className="absolute inset-x-1.5 bottom-0 h-0.5 lg:inset-x-4 overflow-hidden rounded-full bg-primary/10">
                        <motion.span
                          key={`${active}-${paused}`}
                          className="block h-full bg-gradient-to-r from-brand-from to-brand-to"
                          initial={{ width: "0%" }}
                          animate={{ width: paused ? undefined : "100%" }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                        />
                      </span>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {whySipLinkDifferentiators.map((item, i) => (
              <TabsContent key={item.title} value={String(i)} className="lg:col-span-7">
                <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-border/60 shadow-2xl shadow-primary/15">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: EASE }}
                  >
                    <Image
                      src={BACKDROPS[i]}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 56vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/65 to-foreground/10" />

                  <div className="absolute top-5 right-5 flex items-center gap-2">
                    {item.badge && (
                      <Badge className="border-card/30 bg-card/15 font-mono text-[10px] text-card backdrop-blur-md">
                        {item.badge}
                      </Badge>
                    )}
                    <span className="rounded-full bg-card/15 px-2.5 py-1 font-mono text-[11px] font-semibold text-card backdrop-blur-md">
                      {String(i + 1).padStart(2, "0")} / {String(whySipLinkDifferentiators.length).padStart(2, "0")}
                    </span>
                  </div>

                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-6 text-card sm:p-8"
                    initial="hidden"
                    animate="shown"
                    variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                  >
                    <motion.h3
                      variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                      className="text-2xl font-semibold tracking-tight sm:text-3xl"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
                      className="mt-3 max-w-xl text-sm leading-relaxed text-pretty text-card/80 sm:text-base"
                    >
                      {item.description}
                    </motion.p>
                    <div className="mt-5 grid gap-2 sm:grid-cols-1">
                      {item.highlights.map((point) => (
                        <motion.div
                          key={point}
                          variants={{ hidden: { opacity: 0, x: -14 }, shown: { opacity: 1, x: 0 } }}
                          className="flex items-start gap-2.5 rounded-xl border border-card/15 bg-card/10 px-3 py-2 text-sm text-card/90 backdrop-blur-md"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-from" />
                          {point}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ======================================================================
 * Enterprise infrastructure, over the server room
 * ====================================================================== */

const RELIABILITY_ICONS = [ServerCog, Network, LayoutGrid];

const COMMITMENTS = [
  {
    icon: Headphones,
    title: "24/7 Dedicated Support",
    description: "Direct access to knowledgeable telecom technicians by phone, email, and ticketing.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Single Point of Failure",
    description: "Multiple upstream carrier connections and automatic failover across redundant infrastructure.",
  },
  {
    icon: Globe,
    title: "Regulated Telecom Compliance",
    description: "Operated under Department of Telecommunications (DoT) regulations with verified ISMS controls.",
  },
];

/**
 * The infrastructure section, set over the server room it describes. The
 * photograph drifts with scroll under a deep scrim; the three reliability
 * claims hang off a line that draws down as they arrive, and the commitment
 * panel runs a slow check across its three items, one after another.
 */
export function InfrastructureBand({
  reliability,
}: {
  reliability: { title: string; description: string }[];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const [checking, setChecking] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setChecking((c) => (c + 1) % COMMITMENTS.length), 2500);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} className="relative overflow-hidden py-24 text-card lg:py-32">
        {/* The server room */}
        <motion.div className="absolute -inset-y-[12%] inset-x-0" style={{ y }}>
          <Image
            src="/images/sip-trunking-hero-v2.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-foreground/60" />
        <div
          aria-hidden
          className="absolute inset-0 [background-image:linear-gradient(color-mix(in_oklab,var(--card)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--card)_6%,transparent)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_right,black,transparent_75%)]"
        />
        <div aria-hidden className="absolute -bottom-40 left-1/4 size-[520px] rounded-full bg-primary/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.span
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
              className="font-mono text-xs font-semibold tracking-widest text-brand-from uppercase"
            >
              Enterprise Infrastructure
            </motion.span>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Engineered for continuous availability and crystal clarity
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
              className="mt-4 text-pretty text-card/75"
            >
              Telecom downtime damages customer trust. SipLink is engineered
              with direct IP routes, carrier-grade redundancy, and proactive
              monitoring so your lines remain open through any circumstance.
            </motion.p>

            {/* Claims hanging off a line that draws down */}
            <div className="relative mt-10 space-y-7 pl-14">
              <motion.span
                aria-hidden
                className="absolute top-2 bottom-2 left-5 w-px origin-top bg-gradient-to-b from-brand-from via-primary to-transparent"
                variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1, transition: { duration: 1.4, ease: "easeInOut" } } }}
              />
              {reliability.map((item, i) => {
                const Icon = RELIABILITY_ICONS[i] ?? ServerCog;
                return (
                  <motion.div
                    key={item.title}
                    className="relative"
                    variants={{ hidden: { opacity: 0, x: -16 }, shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }}
                  >
                    <span className="absolute top-0 -left-14 flex size-10 items-center justify-center rounded-xl border border-card/20 bg-card/10 text-brand-from shadow-lg shadow-primary/20 backdrop-blur-md">
                      <Icon className="size-5" />
                      {!reduce && (
                        <motion.span
                          className="absolute inset-0 rounded-xl border border-primary"
                          animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.75 }}
                        />
                      )}
                    </span>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="mt-1 text-sm text-card/70">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* The commitment, checking itself */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ transformPerspective: 1000 }}
            className="relative overflow-hidden rounded-3xl border border-card/20 bg-card/10 p-7 shadow-2xl shadow-foreground/40 backdrop-blur-xl sm:p-8"
          >
            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-from to-transparent"
              animate={reduce ? undefined : { x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-tight">The SipLink Commitment</h3>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/25 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-from" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-brand-from" />
                </span>
                Always on
              </span>
            </div>
            <p className="mt-2 text-sm text-card/70">
              Every business customer receives enterprise-grade operational
              discipline from day one.
            </p>

            <div className="mt-6 space-y-3">
              {COMMITMENTS.map(({ icon: Icon, title, description }, i) => {
                const on = reduce || i === checking;
                return (
                  <div
                    key={title}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border p-4 transition-all duration-500",
                      on ? "border-brand-from/50 bg-card/15 shadow-lg shadow-primary/20" : "border-card/10 bg-card/5",
                    )}
                  >
                    {on && !reduce && (
                      <motion.span
                        key={checking}
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-card/10 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "400%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    )}
                    <div className="relative flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-500",
                          on ? "bg-primary text-primary-foreground" : "bg-card/10 text-brand-from",
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="text-sm font-semibold">{title}</span>
                      <CheckCircle2
                        className={cn(
                          "ml-auto size-4 transition-all duration-500",
                          on ? "scale-100 text-brand-from opacity-100" : "scale-50 opacity-0",
                        )}
                      />
                    </div>
                    <p className="relative mt-1.5 pl-12 text-xs text-card/65">{description}</p>
                  </div>
                );
              })}
            </div>

            <Button asChild className="group mt-7 w-full">
              <Link href="/company/certifications">
                View Verified Certifications & Compliance
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
