"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Briefcase, Check } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";

import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { careerDepartments, careerPillars } from "@/lib/company";
import { cn } from "@/lib/utils";

/**
 * Careers hero: the headline, and the four teams as a live switchboard.
 *
 * The spotlight moves from team to team; the lit one opens to show the
 * disciplines it covers (from lib/company), while the four reasons to join
 * float round the board and light in turn. Faces are illustrative.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 3000;

const FACES = [
  ["avatar-daniel", "avatar-marcus", "avatar-ryan"],
  ["avatar-ryan", "avatar-sofia", "avatar-daniel"],
  ["avatar-emma", "avatar-sofia", "avatar-marcus"],
  ["avatar-marcus", "avatar-emma", "avatar-ryan"],
];

const PILLAR_SPOTS = [
  "top-0 left-[4%]",
  "top-1 right-[6%]",
  "bottom-0 left-[12%]",
  "bottom-1 right-[4%]",
];

export function CareersHero({ name }: { name: string }) {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % careerDepartments.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 via-background to-background">
        <HeroBackdrop src="/images/about/about-hero.jpg" position="75% center" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--primary)_18%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_55%_60%_at_72%_45%,black,transparent)]"
        />
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[10%] size-[600px] rounded-full bg-brand-from/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-12 lg:items-center lg:px-10 lg:py-24">
          {/* Copy */}
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge
                variant="secondary"
                className="gap-1.5 border border-primary/20 bg-card/70 px-3 py-1 font-mono text-xs tracking-wider uppercase backdrop-blur"
              >
                <Briefcase className="size-3.5 text-primary" />
                Careers at {name}
              </Badge>
            </motion.div>

            <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
              {[
                { text: "Build the Future of", accent: false },
                { text: "Business Communication", accent: true },
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
              className="mt-6 text-lg text-pretty text-muted-foreground"
            >
              At {name}, we are engineering technology that helps businesses
              connect faster and communicate better every day. We are looking for
              curious, driven, and collaborative people who want to solve
              real-world telecom challenges and help shape modern cloud voice.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button asChild size="lg" className="group rounded-full shadow-md shadow-primary/20">
                <Link href="#functional-areas">
                  Explore Functional Areas
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-card/70">
                <Link href="/about">Learn About Our Culture</Link>
              </Button>
            </motion.div>
          </div>

          {/* The switchboard */}
          <motion.div
            className="relative md:py-14 lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <LayoutGroup>
              <div className="grid grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2">
                {careerDepartments.map((dept, i) => {
                  const Icon = dept.icon;
                  const on = i === active;
                  return (
                    <motion.button
                      layout
                      key={dept.name}
                      type="button"
                      onClick={() => setActive(i)}
                      transition={{ layout: { duration: 0.6, ease: EASE } }}
                      className={cn(
                        "group relative overflow-hidden rounded-3xl border p-5 text-left transition-[border-color,box-shadow,background-color] duration-500",
                        on
                          ? "border-primary/30 bg-card shadow-2xl shadow-primary/15 sm:col-span-2"
                          : "border-border/70 bg-card/75 shadow-sm backdrop-blur hover:border-primary/30",
                      )}
                    >
                      {on && (
                        <motion.span
                          layoutId="careers-spotlight"
                          aria-hidden
                          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-from to-brand-to"
                        />
                      )}
                      <motion.div layout="position" className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500",
                            on ? "bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground shadow-md shadow-primary/30" : "bg-primary/10 text-primary",
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                        <span className={cn("font-semibold text-foreground", on ? "text-lg" : "text-sm leading-snug")}>
                          {dept.name}
                        </span>
                        <span className="ml-auto hidden -space-x-2 sm:flex">
                          {FACES[i].map((face) => (
                            <span key={face} className="relative size-7 overflow-hidden rounded-full ring-2 ring-card">
                              <Image src={`/images/avatars/${face}.webp`} alt="" fill sizes="28px" className="object-cover" />
                            </span>
                          ))}
                        </span>
                      </motion.div>

                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            key="detail"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground">{dept.description}</p>
                            <div className="mt-4 grid gap-2 sm:grid-cols-2">
                              {dept.disciplines.map((d, j) => (
                                <motion.span
                                  key={d}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.25 + j * 0.125 }}
                                  className="flex items-center gap-2 rounded-xl bg-accent/60 px-3 py-2 text-xs font-medium text-accent-foreground"
                                >
                                  <Check className="size-3.5 shrink-0" />
                                  {d}
                                </motion.span>
                              ))}
                            </div>
                            {!reduce && !paused && (
                              <span className="mt-4 block h-1 overflow-hidden rounded-full bg-primary/10">
                                <motion.span
                                  key={active}
                                  className="block h-full bg-gradient-to-r from-brand-from to-brand-to"
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                                />
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </LayoutGroup>

            {/* Why people join, floating round the board */}
            {careerPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const lit = i === active;
              return (
                <motion.div
                  key={pillar.title}
                  className={cn("pointer-events-none absolute z-10 hidden md:block", PILLAR_SPOTS[i])}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.9 + i * 0.125 }}
                >
                  <motion.span
                    className={cn(
                      "flex items-center gap-2 rounded-full border bg-card/95 py-1.5 pr-3.5 pl-1.5 text-xs font-semibold shadow-lg backdrop-blur-md transition-all duration-500",
                      lit ? "border-primary/40 text-foreground shadow-primary/25" : "border-border/70 text-muted-foreground shadow-foreground/5",
                    )}
                    animate={reduce ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 4 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full transition-colors duration-500",
                        lit ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="size-3.5" />
                    </span>
                    {pillar.title}
                  </motion.span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
