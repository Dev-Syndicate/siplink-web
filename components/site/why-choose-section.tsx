"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Cloud,
  GitBranch,
  Network,
  Rocket,
  Server,
  type LucideIcon,
} from "lucide-react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

import { cn } from "@/lib/utils";

interface WhyChooseItem {
  step: string;
  kicker: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  side: "left" | "right";
}

const secondaryFeatures: WhyChooseItem[] = [
  {
    step: "02",
    kicker: "SIP SOLUTIONS",
    title: "SIP trunking expertise",
    description:
      "A properly engineered SIP solution is critical — wrong configurations cause issues and unnecessary cost. We know the real-world challenges.",
    icon: GitBranch,
    href: "/products/sip-trunking",
    side: "left",
  },
  {
    step: "03",
    kicker: "MIGRATION",
    title: "Proven migrations",
    description:
      "Over the years we have helped businesses move from traditional systems to IP, reducing cost and improving productivity.",
    icon: Rocket,
    href: "/why-siplink",
    side: "left",
  },
  {
    step: "04",
    kicker: "HOSTED SERVICES",
    title: "Leading-edge hosted services",
    description:
      "Hosted PBX on a dedicated IP network, continuously upgraded with the latest features, with disaster recovery and business continuity for every client.",
    icon: Server,
    href: "/products/hosted-pbx",
    side: "right",
  },
  {
    step: "05",
    kicker: "INFRASTRUCTURE",
    title: "Multiple cloud platforms",
    description:
      "Several cloud platforms so the solution fits your requirements, adapting to different environments for optimal performance.",
    icon: Cloud,
    href: "/solutions",
    side: "right",
  },
];

const PILLS = ["Reliable", "Scalable", "Enterprise-ready"];

const fromSide = (side: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: side === "left" ? -32 : 32 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
});

/**
 * Why choose SipLink, as a hub.
 *
 * The expertise (01) is the platform itself, so it sits in the middle as the
 * network render, floating free rather than boxed in a card. The other four
 * are what that expertise is applied to, so they sit around it and are wired
 * into it: the wires draw in on scroll, then signals keep travelling along
 * them into the platform. Wires are measured from the real positions of each
 * item's icon and the render, so they land where they should at any width.
 */
export function WhyChooseSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden py-20 lg:py-28">
        {/* Subtle ambient lighting gradients */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 size-[550px] rounded-full bg-primary/5 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/4 size-[450px] rounded-full bg-primary/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/40 sm:w-12" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-primary uppercase">
                Value Proposition
              </span>
              <span className="h-px w-8 bg-primary/40 sm:w-12" />
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Why choose SipLink
            </h2>

            <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg">
              What we bring to every deployment, beyond the platform itself.
            </p>
          </div>

          <Hub />
        </div>
      </section>
    </MotionConfig>
  );
}

function Hub() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [wires, setWires] = useState<string[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const measureRef = useRef<() => void>(() => {});

  useEffect(() => {
    const stage = stageRef.current;
    const hub = hubRef.current;
    if (!stage || !hub) return;

    const measure = () => {
      // Only the desktop layout is wired; below it the items stack.
      if (window.innerWidth < 1024) {
        setWires([]);
        return;
      }
      const s = stage.getBoundingClientRect();
      const h = hub.getBoundingClientRect();
      setWires(
        secondaryFeatures.map((item, i) => {
          const a = anchorRefs.current[i]?.getBoundingClientRect();
          if (!a) return "";
          const left = item.side === "left";
          const ax = (left ? a.right : a.left) - s.left;
          const ay = a.top + a.height / 2 - s.top;
          const hx = (left ? h.left + h.width * 0.2 : h.right - h.width * 0.2) - s.left;
          const hy = h.top - s.top + h.height * (i % 2 === 0 ? 0.36 : 0.66);
          const mx = (ax + hx) / 2;
          return `M${ax.toFixed(1)} ${ay.toFixed(1)} C ${mx.toFixed(1)} ${ay.toFixed(1)}, ${mx.toFixed(1)} ${hy.toFixed(1)}, ${hx.toFixed(1)} ${hy.toFixed(1)}`;
        }),
      );
    };

    measureRef.current = measure;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  const item = (feature: WhyChooseItem, i: number) => {
    const Icon = feature.icon;
    const left = feature.side === "left";
    return (
      <motion.div
        key={feature.step}
        variants={fromSide(feature.side)}
        onAnimationComplete={() => measureRef.current()}
        onHoverStart={() => setHovered(i)}
        onHoverEnd={() => setHovered(null)}
        className={cn(
          "group relative flex gap-5",
          left && "lg:flex-row-reverse lg:text-right",
        )}
      >
        <span
          ref={(el) => {
            anchorRefs.current[i] = el;
          }}
          className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-card text-primary shadow-lg shadow-primary/15 ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-primary/40"
        >
          <Icon className="size-6" aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <div className={cn("flex items-baseline gap-3", left && "lg:justify-end")}>
            <span className="font-mono text-[11px] font-bold tracking-wider text-primary uppercase">
              {feature.kicker}
            </span>
            <span className="font-mono text-2xl leading-none font-bold text-primary/15 transition-colors select-none group-hover:text-primary/35 dark:text-primary/25">
              {feature.step}
            </span>
          </div>
          <h3 className="mt-1.5 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            <Link href={feature.href} className="focus:outline-hidden">
              {feature.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
            {feature.description}
          </p>
          <Link
            href={feature.href}
            aria-label={`Learn more about ${feature.title}`}
            className={cn(
              "mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary",
              left && "lg:flex-row-reverse",
            )}
          >
            Learn more
            <ArrowRight
              className={cn(
                "size-3.5 transition-transform duration-300 group-hover:translate-x-1",
                left && "lg:rotate-180 lg:group-hover:-translate-x-1",
              )}
              aria-hidden
            />
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={stageRef}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12 } } }}
      // Items slide in from the sides; wire up to where they finally land.
      onAnimationComplete={() => measureRef.current()}
      className="relative mt-14 sm:mt-20"
    >
      {/* Wires, measured in screen space */}
      {wires.length > 0 && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible" fill="none">
          <defs>
            <linearGradient id="why-wire" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--brand-from)" />
              <stop offset="100%" stopColor="var(--brand-to)" />
            </linearGradient>
          </defs>
          {wires.map((d, i) =>
            d ? (
              <g key={i}>
                <path d={d} stroke="var(--primary)" strokeOpacity={0.12} strokeWidth={6} strokeLinecap="round" />
                <motion.path
                  d={d}
                  stroke="url(#why-wire)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  animate={{ strokeWidth: hovered === i ? 3.5 : 2, opacity: hovered === null || hovered === i ? 1 : 0.4 }}
                  transition={{ pathLength: { duration: 1.2, delay: 0.5 + i * 0.15, ease: "easeInOut" } }}
                />
              </g>
            ) : null,
          )}
        </svg>
      )}

      {/* Signals travelling into the platform */}
      {!reduce &&
        wires.map((d, i) =>
          d ? (
            <motion.span
              key={`signal-${i}`}
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 size-2.5 rounded-full bg-primary shadow-[0_0_12px_3px_var(--primary)]"
              style={{ offsetPath: `path("${d}")`, offsetRotate: "0deg" }}
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.6,
                delay: 2 + i * 0.7,
                repeat: Infinity,
                repeatDelay: 1.6,
                ease: "easeInOut",
              }}
            />
          ) : null,
        )}

      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        {/* Left: 02, 03 */}
        <div className="order-2 grid gap-10 sm:grid-cols-2 lg:order-1 lg:col-span-3 lg:grid-cols-1 lg:gap-24">
          {secondaryFeatures.map((f, i) => (f.side === "left" ? item(f, i) : null))}
        </div>

        {/* Centre: 01, the platform itself */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.92 },
            shown: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="order-1 flex flex-col items-center text-center lg:order-2 lg:col-span-6"
        >
          <div ref={hubRef} className="relative aspect-[16/10] w-full max-w-[640px]">
            {/* Pulsing rings behind the render */}
            {!reduce &&
              [0, 1, 2].map((ring) => (
                <motion.span
                  key={ring}
                  aria-hidden
                  className="absolute inset-[12%] rounded-full border border-primary/25"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: [0.7, 1.25], opacity: [0, 0.6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, delay: ring * 1.5, ease: "easeOut" }}
                />
              ))}
            <div aria-hidden className="absolute inset-[10%] rounded-full bg-primary/10 blur-3xl" />
            <div className="card-float absolute inset-0" style={{ "--float-duration": "7s" } as React.CSSProperties}>
              <Image
                src="/images/about/why-choose-voip-network-hd.png"
                alt="SipLink 3D isometric VoIP communications network showing connected cloud, IP desk phone, mobile, laptop and server infrastructure"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="edge-fade object-contain object-center"
              />
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
              <Network className="size-5" aria-hidden />
            </span>
            <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
              01 · Expertise
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Leaders in VoIP communications
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
            Network design and solution experts in unified communications,
            with deep experience across IP voice.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {PILLS.map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.9 + i * 0.12 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25"
              >
                <Check className="size-3.5 stroke-[2.5]" aria-hidden />
                {pill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right: 04, 05 */}
        <div className="order-3 grid gap-10 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1 lg:gap-24">
          {secondaryFeatures.map((f, i) => (f.side === "right" ? item(f, i) : null))}
        </div>
      </div>
    </motion.div>
  );
}
