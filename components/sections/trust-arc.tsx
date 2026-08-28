"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Activity,
  BadgeCheck,
  Grid3x3,
  Headset,
  ShieldCheck,
} from "lucide-react";

/**
 * The reference arranges its trust icons along the circle's lower edge, so the
 * centre item sits lowest. `lift` reproduces that bowl on lg+; below that the
 * row becomes a plain grid.
 *
 * NOTE — every claim below still needs sign-off before launch. The uptime and
 * integration figures come from the 2026 sales brochure; the live site states
 * different numbers (99.5% for leased lines, no integration count), and the
 * DoT / HIPAA certifications are asserted on the old site but never evidenced.
 * See content_2.md §20.2 and §20.9.
 */
const items = [
  { icon: ShieldCheck, label: "DoT Certified", lift: "lg:mt-0" },
  { icon: BadgeCheck, label: "HIPAA Compliant", lift: "lg:mt-7" },
  { icon: Activity, label: "99.9% Uptime", lift: "lg:mt-11" },
  { icon: Headset, label: "24/7 Support", lift: "lg:mt-7" },
  { icon: Grid3x3, label: "100+ Integrations", lift: "lg:mt-0" },
];

export function TrustArc() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col items-center gap-3 text-center ${item.lift}`}
            >
              <div className="flex size-14 items-center justify-center rounded-full border border-primary/25 bg-brand-tint">
                <item.icon className="size-5 text-brand-deep" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
