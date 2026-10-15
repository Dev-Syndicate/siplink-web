"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { verifiedCertifications } from "@/lib/company";
import { cn } from "@/lib/utils";

/**
 * Certifications hero: the headline on the left, a trust seal on the right.
 *
 * The five frameworks sit round the seal; a sweep turns from the shield to
 * each one in turn, lights it, lights the matching pill, and swaps the card
 * underneath to that framework's authority and jurisdiction — straight from
 * lib/company, nothing added.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const PILLS = ["DoT Licensing", "ISO/IEC 27001:2022 ISMS", "SOC 2 Type 2 AICPA", "HIPAA Aligned", "GDPR Aligned"];

const STEP_MS = 2500;

export function CertificationsHero({ name }: { name: string }) {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % verifiedCertifications.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const cert = verifiedCertifications[active];
  const count = verifiedCertifications.length;
  const angleOf = (i: number) => -90 + (360 / count) * i;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--primary)_18%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_55%_60%_at_72%_45%,black,transparent)]"
        />
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[12%] size-[600px] rounded-full bg-brand-from/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:items-center lg:px-10 lg:py-20">
          {/* Copy */}
          <div className="lg:col-span-6">
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge
                variant="secondary"
                className="gap-1.5 border border-primary/20 bg-card/70 px-3 py-1 font-mono text-xs tracking-wider uppercase backdrop-blur"
              >
                <BadgeCheck className="size-3.5 text-primary" />
                Verified Trust & Governance
              </Badge>
            </motion.div>

            <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {[
                { text: "Built on Trust.", accent: false },
                { text: "Designed for Business.", accent: true },
              ].map((line, i) => (
                <span key={line.text} className="block overflow-hidden pb-1">
                  <motion.span
                    className={cn(
                      "block",
                      line.accent && "bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent",
                    )}
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
              Business communication requires more than reliable technology — it
              demands complete trust. {name} is dedicated to maintaining
              uncompromising standards across security, infrastructure, privacy,
              reliability, and regulatory practices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex flex-wrap gap-2"
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
            >
              {PILLS.map((pill, i) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300",
                    i === active
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "border-border bg-card/80 text-foreground hover:border-primary/40",
                  )}
                >
                  {pill}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button asChild size="lg" className="group rounded-full shadow-md shadow-primary/20">
                <Link href="/contact">
                  Request Compliance Details
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-card/70">
                <Link href={`#${cert.id}`}>Read about {cert.shortName}</Link>
              </Button>
            </motion.div>
          </div>

          {/* The seal */}
          <motion.div
            className="relative mx-auto mb-20 aspect-square w-full max-w-[460px] lg:col-span-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            {/* Rings, each its own layer so it turns about its own centre */}
            <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 size-full">
              <circle cx={100} cy={100} r={78} fill="none" stroke="var(--border)" strokeWidth={0.6} />
            </svg>
            <motion.svg
              aria-hidden
              viewBox="0 0 200 200"
              className="absolute inset-0 size-full"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <circle cx={100} cy={100} r={94} fill="none" stroke="var(--primary)" strokeOpacity={0.35} strokeWidth={0.6} strokeDasharray="1 4" />
            </motion.svg>
            <motion.svg
              aria-hidden
              viewBox="0 0 200 200"
              className="absolute inset-0 size-full"
              animate={reduce ? undefined : { rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 60 }, (_, t) => (
                <line
                  key={t}
                  x1={100}
                  y1={44}
                  x2={100}
                  y2={t % 5 === 0 ? 48 : 46}
                  stroke="var(--primary)"
                  strokeOpacity={t % 5 === 0 ? 0.5 : 0.2}
                  strokeWidth={0.6}
                  transform={`rotate(${t * 6} 100 100)`}
                />
              ))}
            </motion.svg>

            {/* Sweep, turning to the active framework */}
            <motion.div
              aria-hidden
              className="absolute inset-[11%] rounded-full bg-[conic-gradient(from_-20deg,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_40deg)]"
              animate={{ rotate: angleOf(active) + 90 }}
              transition={{ type: "spring", stiffness: 60, damping: 16 }}
            />

            {/* Centre shield */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!reduce &&
                [0, 1, 2].map((p) => (
                  <motion.span
                    key={p}
                    aria-hidden
                    className="absolute size-[30%] rounded-full border border-primary/40"
                    animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: p, ease: "easeOut" }}
                  />
                ))}
              <motion.span
                className="relative flex size-[26%] items-center justify-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground shadow-2xl shadow-primary/40"
                animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShieldCheck className="size-1/2" strokeWidth={1.5} />
              </motion.span>
            </div>

            {/* The five frameworks */}
            {verifiedCertifications.map((c, i) => {
              const a = (angleOf(i) * Math.PI) / 180;
              const on = i === active;
              return (
                <motion.button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={c.name}
                  className="absolute size-[19%] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${50 + 39 * Math.cos(a)}%`, top: `${50 + 39 * Math.sin(a)}%` }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: on ? 1.18 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18, delay: on ? 0 : 0.4 + i * 0.1 }}
                >
                  <motion.span
                    className={cn(
                      "flex size-full items-center justify-center rounded-full bg-background p-[14%] ring-1 transition-shadow duration-500",
                      on ? "shadow-xl shadow-primary/35 ring-2 ring-primary" : "shadow-md shadow-foreground/10 ring-border",
                    )}
                    animate={reduce ? undefined : { y: [0, -4, 0] }}
                    transition={{ duration: 4 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <span className="relative size-full">
                      <Image src={c.image} alt="" fill sizes="96px" className="object-contain" />
                    </span>
                  </motion.span>
                </motion.button>
              );
            })}

            {/* What is lit */}
            <div className="absolute inset-x-[14%] -bottom-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-border/70 bg-card/90 px-4 py-3 text-center shadow-xl shadow-primary/10 backdrop-blur-md"
                  aria-live="polite"
                >
                  <div className="text-sm font-semibold text-foreground">{cert.name}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    {cert.authority} · {cert.jurisdiction}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
