"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { partnerCategories, partnerTracks } from "@/lib/company";
import { cn } from "@/lib/utils";

/**
 * The partners hero, laid out like an editorial spread: three ruled columns,
 * the ecosystem render as a hub in the middle — orbit rings turning under it,
 * partner names wired in to it — and the integration categories turning
 * over on the right. The two numbers are counts of this page's own lists,
 * not claims.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** A cut-out for each integration category, in lib/company order. */
const CATEGORY_ART = [
  "/images/agent-cloud-telephony.png",
  "/images/pillar-unified-communications.png",
  "/images/industry-staffing.png",
  "/images/industry-verticals.png",
];

const RING = "PARTNERSHIP TRACKS • EXPLORE • ";

/* Three tilted rings under the hub: size, direction, speed, beads. */
const ORBITS = [
  { size: "55%", dir: 1, seconds: 14, beads: 2 },
  { size: "78%", dir: -1, seconds: 22, beads: 3 },
  { size: "100%", dir: 1, seconds: 30, beads: 4 },
];

/* Partner names from this page's own integration list, placed round the
   hub (percent of the column), each wired back to it. */
const PARTNER_CHIPS = [
  { name: "Salesforce", x: 18, y: 24 },
  { name: "Microsoft 365", x: 80, y: 20 },
  { name: "CEIPAL", x: 12, y: 50 },
  { name: "Zendesk", x: 88, y: 46 },
  { name: "Google Workspace", x: 22, y: 76 },
  { name: "HubSpot", x: 80, y: 74 },
];

function Cross({ className, still }: { className?: string; still: boolean }) {
  return (
    <motion.span
      aria-hidden
      className={cn("absolute text-foreground/70", className)}
      animate={still ? undefined : { rotate: [0, 90, 90, 0] }}
      transition={{ duration: 8, repeat: Infinity, times: [0, 0.15, 0.5, 0.65], ease: EASE }}
    >
      <Plus className="size-5" strokeWidth={1.25} />
    </motion.span>
  );
}

const column = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.1 + i * 0.15, ease: EASE },
});

export function PartnersHero({ name }: { name: string }) {
  const reduce = !!useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || reduce) return;
    const id = window.setTimeout(() => setSlide((s) => (s + 1) % partnerCategories.length), 4500);
    return () => window.clearTimeout(id);
  }, [slide, auto, reduce]);

  const go = (step: number) => {
    setAuto(false);
    setSlide((s) => (s + step + partnerCategories.length) % partnerCategories.length);
  };

  // The render leans away from the pointer; the partner chips, nearer, the other way.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const artX = useTransform(sx, (v) => v * -28);
  const artY = useTransform(sy, (v) => v * -18);
  const chipX = useTransform(sx, (v) => v * 22);
  const chipY = useTransform(sy, (v) => v * 14);

  function follow(event: PointerEvent<HTMLElement>) {
    if (reduce) return;
    const box = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  }

  const category = partnerCategories[slide];
  const CategoryIcon = category.icon;

  return (
    <MotionConfig reducedMotion="user">
      <section
        onPointerMove={follow}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-accent/20 to-background"
      >
        <div className="mx-auto grid max-w-[90rem] lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[1fr_1.4fr_1fr]">
          {/* ---------------------------------------------------- left */}
          <motion.div {...column(0)} className="flex flex-col border-border lg:border-r">
            <div className="border-b border-border px-6 py-7 sm:px-10 lg:text-right">
              <Badge variant="secondary" className="font-mono text-[10px] tracking-wider uppercase">
                {name} Partner Ecosystem
              </Badge>
              <p aria-hidden className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                Stronger Together
              </p>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground lg:ml-auto lg:max-w-xs">
                The best communication solutions do not operate in isolation.{" "}
                {name} collaborates with software providers, platforms,
                carriers, and system integrators to build connected, cohesive
                communication workflows for our mutual customers.
              </p>
            </div>

            <div className="grid grid-cols-2 border-b border-border">
              {[
                { value: partnerCategories.length, label: "Integration categories" },
                { value: partnerTracks.length, label: "Partnership tracks" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn("flex items-center gap-3 px-6 py-6 sm:px-10", i === 0 && "border-r border-border")}
                >
                  <motion.span
                    className="font-mono text-4xl font-semibold tracking-tight text-foreground"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
                  >
                    {String(stat.value).padStart(2, "0")}
                  </motion.span>
                  <span className="text-xs leading-tight text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="relative flex flex-1 flex-col justify-end px-6 py-8 sm:px-10">
              <Cross className="top-6 right-6" still={reduce} />
              <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-[2.5rem] xl:text-[2.75rem]">
                <span className="sr-only">Stronger Together: </span>
                {["Connected", "Communication", "Ecosystems"].map((w, i) => (
                  <span key={w} className="block overflow-hidden">
                    <motion.span
                      className={cn("block", i === 2 && "bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent")}
                      initial={{ y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: EASE }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <Button asChild className="group rounded-full shadow-md shadow-primary/20">
                  <Link href="/contact">
                    Become a SipLink Partner
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="#partner-tracks">Explore Partnership Tracks</Link>
                </Button>
              </div>
              <Cross className="bottom-6 left-6 hidden lg:block" still={reduce} />
            </div>
          </motion.div>

          {/* -------------------------------------------------- centre */}
          <motion.div
            {...column(1)}
            className="relative flex min-h-[420px] items-center justify-center overflow-hidden border-y border-border lg:border-y-0"
          >
            {/* A light, washed-out city view behind everything: the skyline
                side of the office photograph, cropped clear of the person,
                panning slowly. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0 origin-left"
                initial={{ scale: 1.6, x: "0%" }}
                animate={reduce ? { scale: 1.6 } : { scale: [1.6, 1.7, 1.6], x: ["0%", "-3%", "0%"] }}
                transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/hero-agent-headset.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-left opacity-90 blur-[1px] saturate-[0.9]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-background/25" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--background)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-transparent to-background/70" />
            </div>

            <span className="absolute top-6 left-1/2 z-10 -translate-x-1/2 font-mono text-xs font-semibold tracking-[0.3em] text-foreground uppercase">
              {name} <span className="text-primary">×</span> Partners
            </span>

            {/* A slow conic halo behind the hub */}
            <motion.span
              aria-hidden
              className="absolute size-[72%] max-w-[560px] rounded-full bg-[conic-gradient(from_0deg,transparent,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_40%,color-mix(in_oklab,var(--brand-from)_30%,transparent),transparent_75%)] opacity-80 blur-2xl"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />

            {/* Orbit rings, tilted into a floor under the hub */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-[58%] left-1/2 aspect-square w-[88%] max-w-[620px] -translate-x-1/2 -translate-y-1/2"
              style={{ perspective: 900 }}
            >
              <div className="relative size-full" style={{ transform: "rotateX(72deg)", transformStyle: "preserve-3d" }}>
                {ORBITS.map((orbit, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 rounded-full border-2 border-primary/35"
                    style={{ width: orbit.size, height: orbit.size, marginLeft: `calc(${orbit.size} / -2)`, marginTop: `calc(${orbit.size} / -2)` }}
                    animate={reduce ? undefined : { rotate: orbit.dir * 360 }}
                    transition={{ duration: orbit.seconds, repeat: Infinity, ease: "linear" }}
                  >
                    {Array.from({ length: orbit.beads }, (_, b) => (
                      <span
                        key={b}
                        className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_4px_var(--primary)]"
                        style={{
                          left: `${50 + 50 * Math.cos((2 * Math.PI * b) / orbit.beads)}%`,
                          top: `${50 + 50 * Math.sin((2 * Math.PI * b) / orbit.beads)}%`,
                        }}
                      />
                    ))}
                  </motion.div>
                ))}
                {/* Sonar sweeping out across the same floor */}
                {!reduce &&
                  [0, 1, 2].map((pulse) => (
                    <motion.span
                      key={`pulse-${pulse}`}
                      className="absolute inset-0 rounded-full border border-primary/50"
                      initial={{ scale: 0.2, opacity: 0 }}
                      animate={{ scale: [0.2, 1.05], opacity: [0, 0.7, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, delay: pulse * 1.5, ease: "easeOut" }}
                    />
                  ))}
              </div>
            </div>

            {/* Partner beams: dashes flowing in to the hub */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-10 size-full"
            >
              {PARTNER_CHIPS.map((chip, i) => (
                <g key={chip.name}>
                  <line
                    x1={chip.x}
                    y1={chip.y}
                    x2={50}
                    y2={52}
                    stroke="var(--primary)"
                    strokeOpacity={0.18}
                    strokeWidth={1.5}
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.line
                    x1={chip.x}
                    y1={chip.y}
                    x2={50}
                    y2={52}
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeDasharray="6 18"
                    vectorEffect="non-scaling-stroke"
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={reduce ? { opacity: 0.6 } : { strokeDashoffset: -48, opacity: 1 }}
                    transition={{
                      strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 0.6, delay: 1.4 + i * 0.125 },
                    }}
                  />
                </g>
              ))}
            </svg>

            <motion.div
              className="relative z-10 mt-[6%] aspect-[3/2] w-[70%] max-w-[480px]"
              style={{ x: artX, y: artY }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            >
              <motion.div
                className="relative size-full"
                animate={reduce ? undefined : { y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/cloud-communications.png"
                  alt="SipLink's cloud at the centre of partner devices, apps and services"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>

            {/* Partner names floating round the hub */}
            <motion.div className="pointer-events-none absolute inset-0 z-20" style={{ x: chipX, y: chipY }}>
              {PARTNER_CHIPS.map((chip, i) => (
                <motion.span
                  key={chip.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${chip.x}%`, top: `${chip.y}%` }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16, delay: 1.2 + i * 0.125 }}
                >
                  <motion.span
                    className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card/90 py-1 pr-3 pl-1 text-[11px] font-semibold whitespace-nowrap text-foreground shadow-lg shadow-primary/15 backdrop-blur-md"
                    animate={reduce ? undefined : { y: [0, -7, 0] }}
                    transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
                  >
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary font-mono text-[9px] font-bold text-primary-foreground">
                      {chip.name.charAt(0)}
                    </span>
                    {chip.name}
                  </motion.span>
                </motion.span>
              ))}
            </motion.div>

            {/* Round "view tracks" button with a turning ring of text */}
            <Link
              href="#partner-tracks"
              className="group absolute bottom-8 left-8 z-20 flex size-28 items-center justify-center rounded-full"
            >
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 size-full"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                aria-hidden
              >
                <defs>
                  <path id="partners-ring" d="M50 50 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
                </defs>
                <text className="fill-foreground font-mono text-[9px] font-semibold">
                  <textPath href="#partners-ring" textLength="248" lengthAdjust="spacing">{RING}</textPath>
                </text>
              </motion.svg>
              <span className="flex size-16 items-center justify-center rounded-full bg-primary/90 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30 backdrop-blur transition-transform duration-300 group-hover:scale-110">
                View
              </span>
            </Link>

            <Cross className="right-6 bottom-6" still={reduce} />
          </motion.div>

          {/* --------------------------------------------------- right */}
          <motion.div {...column(2)} className="flex flex-col border-border lg:border-l">
            <nav className="flex items-center justify-end gap-6 border-b border-border px-6 py-5 font-mono text-[11px] font-semibold tracking-wider text-foreground uppercase sm:px-10">
              <Link href="#integrations" className="transition-colors hover:text-primary">Integrations</Link>
              <Link href="#partner-tracks" className="transition-colors hover:text-primary">Tracks</Link>
              <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
            </nav>

            {/* Category carousel */}
            <div className="relative border-b border-border px-6 py-8 sm:px-10">
              <div className="relative mx-auto flex aspect-square max-w-[300px] items-center justify-center">
                <motion.span
                  aria-hidden
                  className="absolute top-[6%] left-[10%] size-[62%] rounded-full bg-gradient-to-br from-accent to-primary/20"
                  animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide}
                    className="relative size-full"
                    initial={{ opacity: 0, x: 40, rotate: 4 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: -40, rotate: -4 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <Image
                      src={CATEGORY_ART[slide]}
                      alt=""
                      fill
                      sizes="300px"
                      className="object-contain drop-shadow-xl"
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous category"
                  className="absolute top-1/2 -left-2 -translate-y-1/2 rounded-full p-2 text-foreground transition-colors hover:bg-accent hover:text-primary"
                >
                  <ArrowLeft className="size-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next category"
                  className="absolute top-1/2 -right-2 -translate-y-1/2 rounded-full p-2 text-foreground transition-colors hover:bg-accent hover:text-primary"
                >
                  <ArrowRight className="size-5" strokeWidth={1.5} />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  aria-live="polite"
                >
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                    <CategoryIcon className="size-4 text-primary" />
                    Explore {category.title}
                  </div>
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {category.examples.map((ex) => (
                      <Badge key={ex} variant="outline" className="bg-card font-mono text-[10px]">
                        {ex}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex justify-center gap-1.5">
                {partnerCategories.map((c, i) => (
                  <button
                    key={c.title}
                    type="button"
                    aria-label={`Show ${c.title}`}
                    onClick={() => {
                      setAuto(false);
                      setSlide(i);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === slide ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/40",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="relative flex flex-1 flex-col justify-end px-6 py-10 sm:px-10">
              <div className="flex">
                {partnerTracks.map((track, i) => {
                  const Icon = track.icon;
                  return (
                    <motion.span
                      key={track.title}
                      title={track.title}
                      className="-ml-3 flex size-12 items-center justify-center rounded-full border border-foreground/30 bg-background text-foreground transition-colors duration-300 first:ml-0 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.12 }}
                      whileHover={{ y: -4 }}
                    >
                      <Icon className="size-5" strokeWidth={1.5} />
                    </motion.span>
                  );
                })}
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Partner With SipLink
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                We&apos;re always looking to build relationships with technology
                companies, solution providers, resellers, consultants, and
                organizations that share our vision of making business
                communication simpler and more powerful.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
