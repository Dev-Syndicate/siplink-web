"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { DashboardMock } from "@/components/dashboard-mock";

const capabilities = [
  "Smart call routing, IVR and queue management",
  "Call recording with real-time analytics",
  "CRM integrations across Zoho, HubSpot and Odoo",
];

/**
 * The reference's centrepiece: a circle that scales to full-bleed on scroll
 * while the product stays pinned, then copy resolves on the colour field.
 */
export function Platform() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const circleScale = useTransform(scrollYProgress, [0, 0.55], [0.32, 5.2]);
  const panelScale = useTransform(scrollYProgress, [0, 0.55], [1.04, 0.86]);
  const panelY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  // Bound as CSS custom properties rather than motion's `opacity`/`y` shorthands.
  // Motion routes a plain `opacity` style through the accelerated WAAPI path,
  // which then runs its own 1s animation and overrides the scroll-linked value.
  // Custom properties are written straight to the element, so they stay in sync.
  const copyOpacity = useTransform(scrollYProgress, [0.42, 0.62], [0, 1]);
  const copyY = useTransform(scrollYProgress, [0.42, 0.62], ["24px", "0px"]);

  return (
    <section id="platform" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden
          style={reduce ? undefined : { scale: circleScale }}
          className="absolute size-[46vh] rounded-full bg-primary"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
          <motion.div
            style={
              reduce
                ? undefined
                : ({
                    "--copy-o": copyOpacity,
                    "--copy-ty": copyY,
                  } as CSSProperties)
            }
            className="order-2 text-center [opacity:var(--copy-o,1)] [transform:translateY(var(--copy-ty,0px))] lg:order-none lg:text-left"
          >
            <h2 className="text-display text-[clamp(2rem,5.2vw,4rem)] text-primary-foreground">
              Every channel.
              <br />
              One system.
            </h2>
            {/* White on #E62E5C is 4.28:1 — it clears AA only as large text, so
                the lead stays at 24px and the detail moves into white chips. */}
            <p className="mx-auto mt-5 max-w-lg text-2xl leading-snug text-primary-foreground lg:mx-0">
              Instead of managing separate systems for calls, video meetings,
              messaging and integrations, SipLink unifies everything into a
              single, seamless experience.
            </p>
            <ul className="mx-auto mt-7 flex max-w-lg flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-background px-3.5 py-2 text-sm font-medium text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { scale: panelScale, y: panelY }}
            className="order-1 lg:order-none"
          >
            <DashboardMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
