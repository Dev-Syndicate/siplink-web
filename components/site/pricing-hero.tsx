"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  MessageSquareText,
  PhoneCall,
  PhoneIncoming,
  Sparkles,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tagline = "Your trusted VoIP partner, on every call.";

const words = ["every team", "sales teams", "support teams", "remote teams"];

/** Floating UI chips either side of the headline (hidden below lg). */
const chips: {
  icon: LucideIcon;
  title: string;
  detail: string;
  className: string;
  delay: number;
  live?: boolean;
}[] = [
  {
    icon: PhoneIncoming,
    title: "Incoming call",
    detail: "Sales queue · 00:42",
    className: "top-[18%] left-[4%]",
    delay: 0.6,
    live: true,
  },
  {
    icon: TrendingDown,
    title: "$18.95",
    detail: "per user / month",
    className: "bottom-[16%] left-[9%]",
    delay: 0.8,
  },
  {
    icon: MessageSquareText,
    title: "SMS delivered",
    detail: "Order #2481 confirmed",
    className: "top-[22%] right-[5%]",
    delay: 0.7,
  },
  {
    icon: Sparkles,
    title: "AI summary ready",
    detail: "3 action items",
    className: "bottom-[18%] right-[8%]",
    delay: 0.9,
  },
];

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function PricingHero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      2600
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/30">
      {/* Backdrop: drifting glows, a masked dot grid and pulse rings */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 left-1/2 size-[620px] -translate-x-1/2 rounded-full bg-brand-to/10 blur-3xl"
          animate={
            reduce ? undefined : { x: [0, 60, -40, 0], y: [0, 30, 10, 0] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-48 left-[15%] size-[420px] rounded-full bg-brand-from/10 blur-3xl"
          animate={reduce ? undefined : { x: [0, -40, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:22px_22px]" />
        {!reduce
          ? [0, 1, 2].map((ring) => (
              <motion.span
                key={ring}
                className="absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 2.4, opacity: [0, 0.6, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: ring * 2,
                  ease: "easeOut",
                }}
              />
            ))
          : null}
      </div>

      {/* Floating chips */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {chips.map(({ icon: Icon, title, detail, className, delay, live }, i) => (
          <motion.div
            key={title}
            className={cn("absolute", className)}
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, i % 2 ? 8 : -8, 0] }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Card className="flex-row items-center gap-3 rounded-xl px-3.5 py-3 shadow-lg">
                <span className="relative flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4" />
                  {live && !reduce ? (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-primary"
                      animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  ) : null}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-semibold">{title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {detail}
                  </span>
                </span>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative mx-auto max-w-4xl px-6 py-16 text-center lg:px-10 lg:py-24"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div variants={rise}>
          <Badge
            variant="outline"
            className="rounded-full border-primary/30 bg-background px-3 py-1 font-mono tracking-widest text-primary uppercase"
          >
            Transparent pricing · No hidden fees
          </Badge>
        </motion.div>

        <motion.h1
          variants={rise}
          className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          The complete communication platform for{" "}
          <span className="relative inline-grid align-bottom text-primary">
            <span className="sr-only">{words[0]}</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={words[index]}
                aria-hidden
                className="col-start-1 row-start-1 whitespace-nowrap"
                initial={{ y: "70%", opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-70%", opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
            <motion.span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-1 origin-left rounded-full bg-gradient-to-r from-brand-from to-brand-to"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-5 text-lg text-pretty text-muted-foreground"
        >
          Five products. One platform. Pick what fits, or stack them all.
        </motion.p>

        <motion.div variants={rise} className="mt-8 flex justify-center">
          <Badge
            variant="outline"
            className="relative h-auto gap-3 overflow-hidden rounded-full bg-background/80 py-2 pr-5 pl-2 text-sm font-medium text-foreground shadow-sm backdrop-blur"
          >
            {/* Live call dot with ripple */}
            <span className="relative flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <PhoneCall className="size-3.5" aria-hidden />
              {!reduce ? (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              ) : null}
            </span>

            {/* Words arrive one by one */}
            <motion.span
              className="flex flex-wrap gap-x-1"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.08, delayChildren: 0.9 }}
            >
              {tagline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  className={cn(word.startsWith("VoIP") && "text-primary")}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>

            {/* Voice waveform */}
            <span aria-hidden className="flex h-4 items-center gap-0.5">
              {[0.5, 1, 0.7, 0.9, 0.4].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-0.5 rounded-full bg-primary"
                  style={{ height: `${h * 100}%` }}
                  animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>

            {/* Shimmer sweep */}
            {!reduce ? (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                initial={{ left: "-40%" }}
                animate={{ left: "140%" }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  delay: 1.8,
                  ease: "easeInOut",
                }}
              />
            ) : null}
          </Badge>
        </motion.div>
      </motion.div>
    </section>
  );
}
