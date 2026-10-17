"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { Globe, Rocket, type LucideIcon } from "lucide-react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

import { companyMissionVision } from "@/lib/company";
import { cn } from "@/lib/utils";

/**
 * Mission and vision, as a launch.
 *
 * The mission is the purpose — where SipLink starts from — and the vision is
 * the destination, so the two panels are joined by a trajectory and a rocket
 * keeps flying it from one to the other. The boardroom photograph curtains
 * open behind them, and the four pillars the next tier explains float over
 * it as the ground everything stands on. Copy is the mission, vision and
 * pillar names as they are in lib/company.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE: { word: string; accent?: boolean; br?: boolean }[] = [
  { word: "Our" },
  { word: "Mission,", br: true },
  { word: "Vision" },
  { word: "&", accent: true },
  { word: "Pillars" },
];

/* Where each pillar chip floats over the photograph. */
const CHIP_SPOTS = [
  "top-[24%] left-[6%]",
  "top-[9%] right-[7%]",
  "top-[36%] right-[16%]",
  "top-[44%] left-[22%]",
];

const words: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.025, delayChildren: 0.35 } },
};

const word: Variants = {
  hidden: { opacity: 0.12 },
  shown: { opacity: 1, transition: { duration: 0.4 } },
};

export function AboutMissionVision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={sectionRef} className="relative">
        {/* Ambient brand orbs drifting behind everything */}
        <div
          aria-hidden
          className="glass-orb -top-24 left-10 size-80 bg-brand-to/30"
          style={{ "--orb-duration": "9s", "--orb-x": "110px", "--orb-y": "70px" } as CSSProperties}
        />
        <div
          aria-hidden
          className="glass-orb bottom-0 left-1/3 size-64 bg-brand-from/25"
          style={{ "--orb-duration": "12s", "--orb-x": "-90px", "--orb-y": "-60px" } as CSSProperties}
        />

        <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Headline */}
          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.5 }}
            className="lg:col-span-5 lg:pt-6"
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                className="font-mono text-xs font-bold tracking-widest text-primary uppercase"
                variants={{ hidden: { opacity: 0, x: -10 }, shown: { opacity: 1, x: 0 } }}
              >
                Strategic Foundation
              </motion.span>
              <motion.span
                aria-hidden
                className="inline-block h-px bg-primary/60"
                variants={{ hidden: { width: 0 }, shown: { width: 56, transition: { duration: 0.8, delay: 0.3 } } }}
              />
            </div>

            <h2 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl xl:text-6xl">
              {HEADLINE.map(({ word: w, accent, br }, i) => (
                <span key={w}>
                  <span className="inline-block overflow-hidden pb-1 align-bottom">
                    <motion.span
                      className="inline-block"
                      variants={{
                        hidden: { y: "110%" },
                        shown: { y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.09 } },
                      }}
                    >
                      {accent ? (
                        <motion.span
                          className="inline-block bg-gradient-to-r from-brand-from via-primary to-brand-from bg-[length:200%_100%] bg-clip-text text-transparent"
                          animate={reduce ? undefined : { backgroundPositionX: ["0%", "200%"] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                          {w}
                        </motion.span>
                      ) : (
                        w
                      )}
                    </motion.span>
                  </span>
                  {br ? <br /> : " "}
                </span>
              ))}
            </h2>

            <motion.p
              className="mt-6 max-w-sm text-base leading-relaxed text-foreground/80"
              variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.6 } } }}
            >
              Built on architectural principles that protect uptime, simplify
              scalability, and provide direct access to real telecom engineers.
            </motion.p>
          </motion.div>

          {/* Photograph: curtains open, drifts on scroll, pillars float over it */}
          {/* The trigger sits on an unclipped wrapper: a box that starts
              fully clipped can read as never in view. */}
          <motion.div
            className="relative lg:col-span-7"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
          >
          <motion.div
            className="relative h-full min-h-[320px] overflow-hidden rounded-3xl shadow-2xl shadow-primary/15 sm:min-h-[420px] lg:min-h-[560px]"
            variants={{
              hidden: { clipPath: "inset(0% 0% 0% 100% round 24px)" },
              shown: { clipPath: "inset(0% 0% 0% 0% round 24px)", transition: { duration: 1.2, ease: EASE } },
            }}
          >
            <motion.div
              className="absolute -inset-y-[10%] inset-x-0"
              style={{ y: photoY }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.25 }}
                whileInView={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 2.4, ease: EASE }}
              >
                <Image
                  src="/images/about/about-mission-vision.webp"
                  alt="SipLink leadership team in a boardroom reviewing a global connectivity map at dusk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-right-top"
                  priority
                />
              </motion.div>
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/5 to-transparent" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-primary/15 to-transparent mix-blend-multiply" />

            {/* Live badge: the room's network, ticking */}
            <motion.div
              className="absolute top-5 left-5 z-10 flex items-center gap-3 rounded-2xl border border-card/30 bg-foreground/35 py-2 pr-4 pl-3 text-card shadow-xl backdrop-blur-md"
              variants={{
                hidden: { opacity: 0, y: -12 },
                shown: { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.6 } },
              }}
            >
              <span className="flex h-5 items-end gap-[3px]" aria-hidden>
                {[0, 1, 2, 3].map((bar) => (
                  <motion.span
                    key={bar}
                    className="w-[3px] rounded-full bg-primary"
                    initial={{ height: "40%" }}
                    animate={reduce ? undefined : { height: ["35%", "100%", "55%", "85%", "35%"] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: bar * 0.18, ease: "easeInOut" }}
                  />
                ))}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-semibold">Global network</span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-card/80 uppercase">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                  </span>
                  Live
                </span>
              </span>
            </motion.div>

            {/* The four pillars, floating over the room */}
            <div className="absolute inset-0 z-10 hidden sm:block">
              {companyMissionVision.pillars.map((pillar, i) => (
                <PillarChip
                  key={pillar.title}
                  title={pillar.title}
                  icon={pillar.icon}
                  index={i}
                  className={CHIP_SPOTS[i]}
                  still={!!reduce}
                />
              ))}
            </div>
          </motion.div>
          </motion.div>
        </div>

        <Trajectory still={!!reduce} />
      </div>
    </MotionConfig>
  );
}

function PillarChip({
  title,
  icon: Icon,
  index,
  className,
  still,
}: {
  title: string;
  icon: LucideIcon;
  index: number;
  className: string;
  still: boolean;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 + index * 0.15 }}
    >
      <motion.div
        animate={still ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 3.5 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        className="flex items-center gap-2 rounded-full border border-card/40 bg-card/20 py-1.5 pr-3.5 pl-1.5 text-xs font-semibold text-card shadow-lg shadow-foreground/20 backdrop-blur-md"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
          <Icon className="size-3.5" />
        </span>
        {title}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------- mission → vision */

function Trajectory({ still }: { still: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLSpanElement>(null);
  const toRef = useRef<HTMLSpanElement>(null);
  const [arc, setArc] = useState<string | null>(null);
  const measureRef = useRef<() => void>(() => {});

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const from = fromRef.current?.getBoundingClientRect();
      const to = toRef.current?.getBoundingClientRect();
      if (!from || !to || window.innerWidth < 1024) {
        setArc(null);
        return;
      }
      const r = row.getBoundingClientRect();
      const ax = from.left + from.width / 2 - r.left;
      const ay = from.top - r.top;
      const bx = to.left + to.width / 2 - r.left;
      const by = to.top - r.top;
      const lift = Math.max(70, (bx - ax) * 0.22);
      setArc(
        `M${ax.toFixed(1)} ${ay.toFixed(1)} C ${(ax + (bx - ax) * 0.25).toFixed(1)} ${(ay - lift).toFixed(1)}, ${(ax + (bx - ax) * 0.75).toFixed(1)} ${(by - lift).toFixed(1)}, ${bx.toFixed(1)} ${by.toFixed(1)}`,
      );
    };
    measureRef.current = measure;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  const { mission, vision } = companyMissionVision;

  return (
    <motion.div
      ref={rowRef}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.2 } } }}
      className="relative mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:-mt-24 lg:mr-10 lg:ml-[8%]"
    >
      {arc && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 z-20 size-full overflow-visible" fill="none">
          <motion.path
            d={arc}
            stroke="var(--primary)"
            strokeWidth={2}
            strokeDasharray="4 7"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.55 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </svg>
      )}

      {arc && !still && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-30 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_18px_4px_var(--primary)]"
          style={{ offsetPath: `path("${arc}")`, offsetRotate: "auto 45deg" }}
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.2, delay: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
        >
          <Rocket className="size-4" />
        </motion.span>
      )}

      <StatementPanel
        kicker="Purpose"
        ghost="Mission"
        title={mission.title}
        statement={mission.statement}
        icon={Rocket}
        iconRef={fromRef}
        onSettled={() => measureRef.current()}
      />
      <StatementPanel
        kicker="Destination"
        ghost="Vision"
        title={vision.title}
        statement={vision.statement}
        icon={Globe}
        iconRef={toRef}
        onSettled={() => measureRef.current()}
      />
    </motion.div>
  );
}

function StatementPanel({
  kicker,
  ghost,
  title,
  statement,
  icon: Icon,
  iconRef,
  onSettled,
}: {
  kicker: string;
  ghost: string;
  title: string;
  statement: string;
  icon: LucideIcon;
  iconRef: React.RefObject<HTMLSpanElement | null>;
  /** Called once the panel has slid into place, so the arc can re-aim. */
  onSettled: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // A soft light follows the pointer across the glass.
  function follow(event: PointerEvent<HTMLDivElement>) {
    const el = panelRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
  }

  return (
    <motion.div
      ref={panelRef}
      onPointerMove={follow}
      onAnimationComplete={onSettled}
      variants={{
        hidden: { opacity: 0, y: 40 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-7 shadow-xl shadow-foreground/10 backdrop-blur-xl sm:p-8"
    >
      {/* Pointer spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
        }}
      />
      {/* Light racing along the top edge */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-brand-from via-primary to-brand-to"
        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 0.9, delay: 0.3, ease: EASE } } }}
      />
      {/* Ghost word */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -bottom-6 font-heading text-7xl font-black tracking-tighter text-primary/[0.06] uppercase select-none sm:text-8xl"
      >
        {ghost}
      </span>

      <div className="relative flex items-center gap-4">
        <span
          ref={iconRef}
          className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground shadow-lg shadow-primary/35 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
        >
          <Icon className="size-5" />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold tracking-widest text-primary uppercase">
              {kicker}
            </span>
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
      </div>

      <motion.p
        variants={words}
        className="relative mt-5 text-[15px] leading-relaxed text-foreground/80"
      >
        {statement.split(" ").map((w, i) => (
          <motion.span key={i} variants={word} className="inline-block">
            {w}&nbsp;
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}
