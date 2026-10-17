"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Cloud,
  Newspaper,
  PhoneCall,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";

import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { announcement } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * News hero: the headline, and a newsroom feed beside it.
 *
 * The feed only carries what is real — the live product announcement and
 * the four places on the site where each topic is covered in depth. A card
 * rises to the top of the stack every few seconds; the topic chips under
 * the headline light with it.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 3200;

type Story = {
  kind: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  live?: boolean;
  topic: string;
};

const STORIES: Story[] = [
  {
    kind: "Product update",
    title: announcement.message,
    body: "Two new capabilities on the SipLink platform, available today.",
    href: announcement.href,
    cta: announcement.linkLabel,
    icon: Radio,
    live: true,
    topic: "AI Voice Automation",
  },
  {
    kind: "Products & Platform",
    title: "The full communications catalogue",
    body: "Hosted PBX, SIP Trunking, Cloud VoIP, call center, UCaaS, numbers, IVR, recording and analytics.",
    href: "/products",
    cta: "Browse products",
    icon: PhoneCall,
    topic: "SIP Trunking",
  },
  {
    kind: "Solutions",
    title: "How teams put SipLink to work",
    body: "Remote workforces, customer support, sales organizations and multi-branch businesses.",
    href: "/solutions",
    cta: "View solutions",
    icon: Cloud,
    topic: "Cloud Telephony",
  },
  {
    kind: "Industry guides",
    title: "Communication by industry",
    body: "Healthcare & RCM, financial services, IT, education, staffing and government.",
    href: "/industries",
    cta: "Explore industries",
    icon: Building2,
    topic: "Cloud Telephony",
  },
  {
    kind: "Compliance",
    title: "Where SipLink stands on compliance",
    body: "DoT licensing, ISO/IEC 27001, SOC 2, HIPAA and GDPR — with the detail behind each.",
    href: "/company/certifications",
    cta: "Review compliance",
    icon: BadgeCheck,
    topic: "Compliance & Security",
  },
];

const TOPICS = ["Cloud Telephony", "SIP Trunking", "AI Voice Automation", "Compliance & Security"];

export function NewsHero({ name }: { name: string }) {
  const reduce = !!useReducedMotion();
  const [top, setTop] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setTop((t) => (t + 1) % STORIES.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  // Top card first, then the next two behind it.
  const stack = [0, 1, 2].map((d) => STORIES[(top + d) % STORIES.length]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 via-background to-background">
        <HeroBackdrop src="/images/about/about-mission.webp" position="60% center" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--primary)_18%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_55%_60%_at_72%_45%,black,transparent)]"
        />
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[10%] size-[600px] rounded-full bg-brand-from/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-12 lg:items-center lg:px-10 lg:py-24">
          <div className="lg:col-span-6">
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge
                variant="secondary"
                className="gap-1.5 border border-primary/20 bg-card/70 px-3 py-1 font-mono text-xs tracking-wider uppercase backdrop-blur"
              >
                <Newspaper className="size-3.5 text-primary" />
                {name} News & Insights
              </Badge>
            </motion.div>

            <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {[
                { text: "What's Happening", accent: false },
                { text: `at ${name}`, accent: true },
              ].map((line, i) => (
                <span key={line.text} className="block overflow-hidden pb-1">
                  <motion.span
                    className={cn("block", line.accent && "bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent")}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease: EASE }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground"
            >
              Stay up to date with {name}, cloud telephony trends, telecom
              compliance insights, and practical strategies designed to help your
              organization communicate smarter and scale without limits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {TOPICS.map((t) => {
                const on = stack[0].topic === t;
                return (
                  <span
                    key={t}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-500",
                      on ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25" : "border-border bg-card/80 text-foreground",
                    )}
                  >
                    {t}
                  </span>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button asChild size="lg" className="group rounded-full shadow-md shadow-primary/20">
                <Link href="#voice-ai">
                  See what&apos;s new
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-card/70">
                <Link href="/contact">Ask our team</Link>
              </Button>
            </motion.div>
          </div>

          {/* The feed */}
          <motion.div
            className="relative mx-auto h-[400px] w-full max-w-[520px] lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            {/* Live wire header */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between">
              <span className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-widest text-foreground uppercase">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Newsroom feed
              </span>
              <span className="flex gap-1.5">
                {STORIES.map((s, i) => (
                  <button
                    key={s.kind}
                    type="button"
                    aria-label={`Show ${s.kind}`}
                    onClick={() => setTop(i)}
                    className={cn("h-1.5 rounded-full transition-all duration-300", i === top ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/40")}
                  />
                ))}
              </span>
            </div>

            <div className="absolute inset-x-0 top-12 bottom-0">
              <AnimatePresence initial={false}>
                {stack
                  .map((story, depth) => ({ story, depth }))
                  .reverse()
                  .map(({ story, depth }) => {
                    const Icon = story.icon;
                    return (
                      <motion.article
                        key={story.kind}
                        className={cn(
                          "absolute inset-x-0 top-0 overflow-hidden rounded-3xl border bg-card p-6 shadow-xl",
                          depth === 0 ? "border-primary/25 shadow-primary/15" : "border-border/70 shadow-foreground/5",
                        )}
                        style={{ zIndex: 10 - depth }}
                        initial={{ opacity: 0, y: 120, scale: 0.9 }}
                        animate={{ opacity: depth === 0 ? 1 : 0.7 - depth * 0.2, y: depth * 26, scale: 1 - depth * 0.05 }}
                        exit={{ opacity: 0, y: -40, scale: 1.02, transition: { duration: 0.4 } }}
                        transition={{ duration: 0.6, ease: EASE }}
                      >
                        {depth === 0 && (
                          <motion.span
                            key={`bar-${top}`}
                            aria-hidden
                            className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-brand-from to-brand-to"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: reduce ? 0 : STEP_MS / 1000, ease: "linear" }}
                          />
                        )}
                        <div className={cn("transition-opacity duration-300", depth > 0 && "opacity-0")}>
                        <div className="flex items-center gap-3">
                          <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground shadow-md shadow-primary/30">
                            <Icon className="size-5" />
                          </span>
                          <span className="font-mono text-[11px] font-semibold tracking-widest text-primary uppercase">{story.kind}</span>
                          {story.live && (
                            <span className="ml-auto rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold text-primary">LIVE NOW</span>
                          )}
                        </div>
                        <h2 className="mt-5 text-xl font-semibold tracking-tight text-balance text-foreground sm:text-2xl">{story.title}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">{story.body}</p>
                        <Link
                          href={story.href}
                          tabIndex={depth === 0 ? 0 : -1}
                          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                        >
                          {story.cta}
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        </div>
                      </motion.article>
                    );
                  })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
