"use client";

import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Globe,
  Headphones,
  Layers,
  MapPin,
  Network,
  Phone,
  Puzzle,
  Sparkles,
  ArrowLeftRight,
  Check,
  Mic,
  PhoneIncoming,
} from "lucide-react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The Why SipLink hero: a light beam, a headline that resolves word by word,
 * and a fan of cards rising underneath it.
 *
 * Every card is one of the differentiators the page goes on to explain —
 * monitored voice quality, one platform, real engineers on the line,
 * integrations, offices — shown working rather than named. No card carries a
 * figure: the chart has no axis values and nothing is counted.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = ["Communication", "that", "works", "for", "your", "business"];
const ACCENT = ["without", "the", "complexity."];

/* Deterministic sparkle positions, so server and client render the same. */
const frac = (v: number) => v - Math.floor(v);
const SPARKS = Array.from({ length: 26 }, (_, i) => ({
  left: `${(frac(Math.sin(i * 12.9898) * 43758.5453) * 100).toFixed(2)}%`,
  top: `${(frac(Math.cos(i * 78.233) * 12345.678) * 70).toFixed(2)}%`,
  delay: (i % 7) * 0.5,
  size: i % 3 === 0 ? 3 : 2,
}));

/* The fan: centre out, each card's place, tilt and depth. */
const FAN = [
  { left: "9%", rotate: -14, y: 70, depth: 26, show: "hidden lg:block", order: 4 },
  { left: "29%", rotate: -7, y: 26, depth: 16, show: "hidden sm:block", order: 2 },
  { left: "50%", rotate: 0, y: 0, depth: 8, show: "block", order: 0 },
  { left: "71%", rotate: 7, y: 26, depth: 16, show: "hidden sm:block", order: 1 },
  { left: "91%", rotate: 14, y: 70, depth: 26, show: "hidden lg:block", order: 3 },
];

export function WhySipLinkHero({ name }: { name: string }) {
  const reduce = !!useReducedMotion();
  const pointer = useMotionValue(0);
  const drift = useSpring(pointer, { stiffness: 60, damping: 20 });

  function follow(event: PointerEvent<HTMLElement>) {
    if (reduce) return;
    const box = event.currentTarget.getBoundingClientRect();
    pointer.set((event.clientX - box.left) / box.width - 0.5);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        onPointerMove={follow}
        onPointerLeave={() => pointer.set(0)}
        className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-accent/25 to-background"
      >
        {/* Dot grid, fading out from the centre */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--primary)_22%,transparent)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_32%,black,transparent)]"
        />

        {/* Signal rings rippling out from behind the headline */}
        <div aria-hidden className="pointer-events-none absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[0, 1, 2, 3].map((ring) => (
            <motion.span
              key={ring}
              className="absolute top-1/2 left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={reduce ? { scale: 0.6 + ring * 0.25, opacity: 0.25 } : { scale: [0.3, 1.6], opacity: [0, 0.55, 0] }}
              transition={{ duration: 8, repeat: Infinity, delay: ring * 2, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Light beams */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-[30%] left-[44%] h-[150%] w-56 origin-top rounded-full bg-gradient-to-b from-brand-from/45 via-primary/15 to-transparent blur-3xl"
          initial={{ rotate: 28, opacity: 0 }}
          animate={reduce ? { rotate: 28, opacity: 0.7 } : { rotate: [24, 33, 24], opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-[30%] left-[58%] h-[130%] w-24 origin-top rounded-full bg-gradient-to-b from-primary/35 to-transparent blur-2xl"
          initial={{ rotate: 34, opacity: 0 }}
          animate={reduce ? { rotate: 34, opacity: 0.5 } : { rotate: [36, 28, 36], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sparkles */}
        {SPARKS.map((spark, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute rounded-full bg-primary"
            style={{ left: spark.left, top: spark.top, width: spark.size, height: spark.size }}
            initial={{ opacity: 0.15 }}
            animate={reduce ? undefined : { opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: spark.delay }}
          />
        ))}

        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10 sm:pt-24 lg:px-10">
          <HeroWidgets drift={drift} still={reduce} />

          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex"
            >
              <Badge
                variant="secondary"
                className="gap-2 border border-primary/25 bg-card/70 px-3.5 py-1.5 font-mono text-xs tracking-wider uppercase shadow-sm shadow-primary/10 backdrop-blur"
              >
                <motion.span
                  animate={reduce ? undefined : { rotate: [0, 18, -12, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                  className="inline-flex"
                >
                  <Sparkles className="size-3.5 text-primary" />
                </motion.span>
                Why Choose SipLink
              </Badge>
            </motion.div>

            <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {HEADLINE.map((w, i) => (
                <Word key={w} index={i}>
                  <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {w}
                  </span>
                </Word>
              ))}
              <br className="hidden sm:block" />
              {ACCENT.map((w, i) => (
                <Word key={w} index={HEADLINE.length + i}>
                  <span className="bg-gradient-to-r from-brand-from via-primary to-brand-to bg-clip-text text-transparent">
                    {w}
                  </span>
                </Word>
              ))}
            </h1>

            {/* Swoosh under the accent line */}
            <svg aria-hidden viewBox="0 0 600 24" className="mx-auto -mt-1 h-4 w-[min(32rem,80%)] overflow-visible sm:h-5">
              <defs>
                <linearGradient id="why-swoosh" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--brand-from)" stopOpacity={0.2} />
                  <stop offset="50%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--brand-to)" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <motion.path
                d="M6 16 C 140 4, 300 4, 420 12 S 560 20, 594 8"
                fill="none"
                stroke="url(#why-swoosh)"
                strokeWidth={5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1, ease: EASE }}
              />
            </svg>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
              className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl"
            >
              Your communication infrastructure should propel your growth, not
              become another administrative hurdle. {name} combines proven
              cloud voice engineering with proactive 24/7 support to keep your
              people connected everywhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <motion.div
                animate={
                  reduce
                    ? undefined
                    : {
                        boxShadow: [
                          "0 0 0px 0px color-mix(in oklab, var(--primary) 0%, transparent)",
                          "0 0 36px 4px color-mix(in oklab, var(--primary) 45%, transparent)",
                          "0 0 0px 0px color-mix(in oklab, var(--primary) 0%, transparent)",
                        ],
                      }
                }
                transition={{ duration: 3, repeat: Infinity }}
                className="rounded-full"
              >
                <Button asChild size="lg" className="group rounded-full">
                  <Link href="/contact">
                    See how SipLink can work for you
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-card/70 backdrop-blur">
                <Link href="/solutions">Explore Solutions</Link>
              </Button>
            </motion.div>
          </div>

          {/* The fan */}
          <div className="relative mx-auto mt-16 h-[380px] max-w-6xl sm:mt-20 sm:h-[400px]">
            {FAN.map((spot, i) => (
              <FanCard key={i} spot={spot} drift={drift} still={reduce} index={i}>
                {i === 0 && <QualityCard still={reduce} />}
                {i === 1 && <PlatformCard still={reduce} />}
                {i === 2 && <SupportCard still={reduce} />}
                {i === 3 && <ToolsCard still={reduce} />}
                {i === 4 && <ReachCard still={reduce} />}
              </FanCard>
            ))}
          </div>

          {/* Compliance pills, as before */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Verified Standards:
            </span>
            {["DoT Certified", "ISO/IEC 27001", "SOC 2 Type 2", "HIPAA Compliant", "GDPR Aligned"].map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="border-border/80 bg-background/60 font-mono text-[11px] font-medium"
              >
                {item}
              </Badge>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

function Word({ index, children }: { index: number; children: ReactNode }) {
  return (
    <>
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.15 + index * 0.06, ease: EASE }}
      >
        {children}
      </motion.span>{" "}
    </>
  );
}

function FanCard({
  spot,
  drift,
  still,
  index,
  children,
}: {
  spot: (typeof FAN)[number];
  drift: MotionValue<number>;
  still: boolean;
  index: number;
  children: ReactNode;
}) {
  const x = useTransform(drift, (v) => v * spot.depth * 2);
  const centre = index === 2;

  return (
    <motion.div
      className={cn("absolute top-0", spot.show)}
      style={{ left: spot.left, x, zIndex: 10 - spot.order }}
    >
      <motion.div
        className="-translate-x-1/2"
        initial={{ opacity: 0, y: spot.y + 140, rotate: 0 }}
        animate={{ opacity: 1, y: spot.y, rotate: spot.rotate }}
        transition={{ type: "spring", stiffness: 70, damping: 16, delay: 1.2 + spot.order * 0.12 }}
        whileHover={{ y: spot.y - 18, rotate: 0, scale: 1.04, zIndex: 20 }}
      >
        <motion.div
          animate={still ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5 + spot.order, repeat: Infinity, ease: "easeInOut", delay: spot.order * 0.5 }}
          className={cn(
            "overflow-hidden rounded-3xl border shadow-2xl",
            centre
              ? "w-56 border-primary/40 shadow-primary/30 sm:w-60"
              : "w-64 border-border/70 bg-card/90 p-4 shadow-primary/10 backdrop-blur-xl",
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------- cards */

function CardHead({ icon: Icon, title, sub }: { icon: typeof Globe; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
        <Icon className="size-4" />
      </span>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

function QualityCard({ still }: { still: boolean }) {
  const line = "M0 52 C 20 48, 30 30, 50 34 S 80 50, 100 38 S 140 18, 160 24 S 200 12, 232 14";
  return (
    <div>
      <CardHead icon={Network} title="Voice quality" sub="Monitored in real time" />
      <svg viewBox="0 0 232 70" className="mt-4 h-20 w-full" aria-hidden>
        <defs>
          <linearGradient id="why-hero-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        {[18, 36, 54].map((y) => (
          <line key={y} x1={0} x2={232} y1={y} y2={y} stroke="var(--border)" strokeDasharray="2 4" />
        ))}
        <motion.path
          d={`${line} L 232 70 L 0 70 Z`}
          fill="url(#why-hero-area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: still ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.6, duration: 1.4, ease: "easeInOut" }}
        />
      </svg>
      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Direct IP routes</span>
        <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground">Failover ready</span>
      </div>
    </div>
  );
}

function PlatformCard({ still }: { still: boolean }) {
  const rows = ["Hosted PBX", "SIP Trunking", "Team messaging", "Business SMS"];
  return (
    <div>
      <CardHead icon={Layers} title="One platform" sub="Multiple ways to connect" />
      <div className="mt-3 space-y-1.5">
        {rows.map((row, i) => (
          <div key={row} className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground">
            {row}
            <span className="relative h-4 w-7 rounded-full bg-primary/20">
              <motion.span
                className="absolute top-0.5 size-3 rounded-full bg-primary shadow-sm"
                initial={{ left: still ? 14 : 2 }}
                animate={{ left: 14 }}
                transition={{ delay: 1.8 + i * 0.25, type: "spring", stiffness: 400, damping: 22 }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportCard({ still }: { still: boolean }) {
  return (
    <div className="relative aspect-[3/4] bg-gradient-to-br from-brand-from to-brand-to">
      <Image
        src="/images/hero-agent-headset.png"
        alt="A SipLink support engineer on a headset call"
        fill
        sizes="240px"
        className="object-cover object-[58%_center]"
        priority
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />

      <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-card/85 px-2.5 py-1 text-[10px] font-semibold text-foreground backdrop-blur">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary" />
          <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
        </span>
        On the line
      </span>

      <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-card/40 bg-card/20 p-3 text-card backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <motion.span
            className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            animate={still ? undefined : { rotate: [0, -14, 14, -10, 10, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >
            <Phone className="size-3.5" />
          </motion.span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">24/7 Support</div>
            <div className="text-[11px] text-card/80">Real telecom engineers</div>
          </div>
          <Headphones className="ml-auto size-4 text-card/80" />
        </div>
      </div>
    </div>
  );
}

function ToolsCard({ still }: { still: boolean }) {
  const tools = ["Salesforce", "Microsoft 365", "Google Workspace"];
  return (
    <div>
      <CardHead icon={Puzzle} title="Your existing tools" sub="CRM & productivity" />
      <div className="mt-3 space-y-1.5">
        {tools.map((tool, i) => (
          <div key={tool} className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2 text-xs font-medium text-foreground">
            {tool}
            <motion.span
              className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground"
              initial={{ opacity: still ? 1 : 0, scale: still ? 1 : 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + i * 0.3, type: "spring", stiffness: 400, damping: 18 }}
            >
              Connected
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReachCard({ still }: { still: boolean }) {
  const places = ["Chennai", "Bangalore", "Hyderabad", "United States"];
  return (
    <div>
      <CardHead icon={Globe} title="Global reach" sub="Local support" />
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {places.map((place, i) => (
          <div key={place} className="flex items-center gap-1.5 rounded-xl bg-muted/50 px-2.5 py-2 text-[11px] font-medium text-foreground">
            <span className="relative flex size-2">
              {!still && (
                <motion.span
                  className="absolute inline-flex size-full rounded-full bg-primary"
                  animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {place}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <MapPin className="size-3 text-primary" />
        DoT-compliant routing within India
      </div>
    </div>
  );
}

/* ------------------------------------------------------- hero widgets */

const AVATARS = ["avatar-emma", "avatar-daniel", "avatar-sofia", "avatar-marcus"];

/**
 * Small working pieces of the product floating around the headline, on wide
 * screens only. Each drifts with the pointer at its own depth, springs in
 * after the headline and then bobs. None carries a figure.
 */
function Widget({
  className,
  drift,
  depth,
  delay,
  float,
  still,
  children,
}: {
  className: string;
  drift: MotionValue<number>;
  depth: number;
  delay: number;
  float: number;
  still: boolean;
  children: ReactNode;
}) {
  const x = useTransform(drift, (v) => v * depth);
  return (
    <motion.div className={cn("absolute z-10 hidden xl:block", className)} style={{ x }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 16, delay }}
      >
        <motion.div
          animate={still ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: float, repeat: Infinity, ease: "easeInOut" }}
          className="w-56 rounded-2xl border border-border/70 bg-card/85 p-3 shadow-xl shadow-primary/15 backdrop-blur-xl"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function HeroWidgets({ drift, still }: { drift: MotionValue<number>; still: boolean }) {
  return (
    <>
      {/* Incoming call, ringing */}
      <Widget className="top-[16%] left-0 -rotate-3" drift={drift} depth={-30} delay={1.3} float={5} still={still}>
        <div className="flex items-center gap-3">
          <span className="relative">
            <Image src="/images/avatars/avatar-ryan.webp" alt="" width={40} height={40} className="size-10 rounded-full object-cover ring-2 ring-card" />
            {!still && (
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-primary"
                animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </span>
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-1 text-[11px] font-medium text-primary">
              <PhoneIncoming className="size-3" />
              Incoming call
            </div>
            <div className="text-sm font-semibold text-foreground">Routed to Support</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="rounded-lg bg-muted py-1.5 text-center text-[11px] font-medium text-muted-foreground">Queue</span>
          <motion.span
            className="rounded-lg bg-primary py-1.5 text-center text-[11px] font-semibold text-primary-foreground"
            animate={still ? undefined : { scale: [1, 1.06, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Answer
          </motion.span>
        </div>
      </Widget>

      {/* Call recording, live waveform */}
      <Widget className="top-[10%] right-0 rotate-3" drift={drift} depth={30} delay={1.45} float={6} still={still}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mic className="size-3.5" />
            </span>
            Call recording
          </div>
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
            <motion.span
              className="size-1.5 rounded-full bg-primary"
              animate={still ? undefined : { opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            REC
          </span>
        </div>
        <div className="mt-3 flex h-8 items-center gap-[3px]">
          {Array.from({ length: 28 }, (_, i) => (
            <motion.span
              key={i}
              className="w-[3px] flex-1 rounded-full bg-gradient-to-t from-brand-from to-brand-to"
              initial={{ height: "30%" }}
              animate={still ? undefined : { height: ["20%", `${40 + ((i * 37) % 60)}%`, "25%"] }}
              transition={{ duration: 1, repeat: Infinity, delay: (i % 8) * 0.125, ease: "easeInOut" }}
            />
          ))}
        </div>
      </Widget>

      {/* Number porting, completing */}
      <Widget className="top-[50%] left-[3%] rotate-2" drift={drift} depth={-20} delay={1.6} float={7} still={still}>
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
            <ArrowLeftRight className="size-4" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">Number porting</div>
            <div className="text-[11px] text-muted-foreground">Keep your number</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-from to-brand-to"
            initial={{ width: still ? "100%" : "0%" }}
            animate={still ? undefined : { width: ["0%", "100%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, times: [0, 0.6, 1], ease: "easeInOut", delay: 2 }}
          />
        </div>
        <motion.div
          className="mt-2 flex items-center gap-1 text-[11px] font-medium text-primary"
          initial={{ opacity: still ? 1 : 0 }}
          animate={still ? undefined : { opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.58, 0.64, 0.95, 1], delay: 2 }}
        >
          <Check className="size-3" />
          Ported, no downtime
        </motion.div>
      </Widget>

      {/* Engineers on hand */}
      <Widget className="top-[46%] right-[3%] -rotate-2" drift={drift} depth={20} delay={1.75} float={5.5} still={still}>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {AVATARS.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 + i * 0.125 }}
              >
                <Image src={`/images/avatars/${a}.webp`} alt="" width={32} height={32} className="size-8 rounded-full object-cover ring-2 ring-card" />
              </motion.span>
            ))}
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">Engineers</div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              On hand 24/7
            </div>
          </div>
        </div>
      </Widget>
    </>
  );
}
