"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  ArrowRight,
  AppWindow,
  LayoutGrid,
  MessageSquare,
  Network,
  Phone,
  ServerCog,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { Button } from "@/components/ui/button";

/**
 * "Built for the way businesses communicate today", as one connected
 * ecosystem.
 *
 * The copy names four things SipLink brings together — voice, messaging,
 * collaboration and business applications — so those four orbit the team on
 * one ring, and the headline line cycles through them. The three reliability
 * claims underneath each get a small working diagram of what the claim
 * actually says: replication to a second data centre, a second provider link
 * taking the load, users and sites added from a browser. Nothing is counted;
 * the diagrams show the mechanism, not a figure.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const CHANNELS: { label: string; icon: LucideIcon }[] = [
  { label: "voice", icon: Phone },
  { label: "messaging", icon: MessageSquare },
  { label: "collaboration", icon: Users },
  { label: "business applications", icon: AppWindow },
];

const RELIABILITY_ICONS = [ServerCog, Network, LayoutGrid];

export function AboutCloudVoice({
  reliability,
}: {
  reliability: { title: string; description: string }[];
}) {
  const reduce = !!useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
            <Narrative still={reduce} />
            <Orbit still={reduce} />
          </div>

          <ReliabilityRow items={reliability} still={reduce} />
        </div>
      </section>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------ narrative */

function Highlight({ children }: { children: string }) {
  return (
    <motion.span
      className="bg-gradient-to-r from-primary/20 to-primary/10 bg-no-repeat px-0.5 font-medium text-foreground [background-position:0_88%]"
      initial={{ backgroundSize: "0% 40%" }}
      whileInView={{ backgroundSize: "100% 40%" }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

function Narrative({ still }: { still: boolean }) {
  const [channel, setChannel] = useState(0);

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setChannel((c) => (c + 1) % CHANNELS.length), 2200);
    return () => window.clearInterval(id);
  }, [still]);

  const ChannelIcon = CHANNELS[channel].icon;

  return (
    <motion.div
      className="lg:col-span-5"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12 } } }}
    >
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
          Modern Cloud Voice
        </span>
        <motion.span
          aria-hidden
          className="inline-block h-px bg-primary/60"
          variants={{ hidden: { width: 0 }, shown: { width: 48, transition: { duration: 0.8 } } }}
        />
      </div>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {["Built for the way businesses", "communicate today"].map((line) => (
          <motion.span
            key={line}
            className="block"
            variants={{
              hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
              shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        ))}
      </h2>

      {/* The four things it brings together, one at a time */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
        className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-card py-1.5 pr-4 pl-1.5 text-sm shadow-sm shadow-primary/10"
      >
        <span className="relative flex size-7 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={channel}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ChannelIcon className="size-3.5" />
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="text-muted-foreground">One ecosystem for</span>
        <span className="relative inline-flex h-5 min-w-[11.5rem] overflow-hidden font-semibold text-primary">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={channel}
              className="absolute left-0"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {CHANNELS[channel].label}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.div>

      <motion.div
        className="mt-6 space-y-4 text-pretty text-muted-foreground"
        variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
      >
        <p>
          Communication is no longer limited to a desk phone in a single
          office. <Highlight>Teams work remotely</Highlight>, customers expect
          instant responses, and businesses need every conversation seamlessly
          integrated with their CRM workflows.
        </p>
        <p>
          SipLink brings voice, messaging, collaboration, and business
          applications together into <Highlight>one connected ecosystem</Highlight>{" "}
          so your teams can communicate from anywhere while keeping every
          interaction organized, measured, and manageable.
        </p>
        <p>
          From growing businesses to global enterprises, SipLink simplifies
          telephony, improves team productivity, and delivers superior customer
          experiences—<Highlight>without the complexity of traditional hardware</Highlight>.
        </p>
      </motion.div>

      <motion.div
        className="mt-8"
        variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
      >
        <Button asChild variant="outline" className="group rounded-full">
          <Link href="/company/partners">
            Explore Partner Integrations
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- orbit */

function ellipse(w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const rx = w * 0.47;
  const ry = h * 0.44;
  // Two arcs, starting at the left-most point.
  return `M${(cx - rx).toFixed(1)} ${cy.toFixed(1)} A ${rx.toFixed(1)} ${ry.toFixed(1)} 0 1 1 ${(cx + rx).toFixed(1)} ${cy.toFixed(1)} A ${rx.toFixed(1)} ${ry.toFixed(1)} 0 1 1 ${(cx - rx).toFixed(1)} ${cy.toFixed(1)}`;
}

function Orbit({ still }: { still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The photograph leans towards the pointer.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });

  function lean(event: PointerEvent<HTMLDivElement>) {
    if (still) return;
    const box = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  }

  function settle() {
    px.set(0);
    py.set(0);
  }

  const path = size.w ? ellipse(size.w, size.h) : null;

  return (
    <motion.div
      ref={ref}
      onPointerMove={lean}
      onPointerLeave={settle}
      className="relative aspect-[16/11] w-full lg:col-span-7"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div
        aria-hidden
        className="glass-orb inset-[8%] bg-primary/15"
        style={{ "--orb-duration": "14s", "--orb-x": "35px", "--orb-y": "-20px" } as CSSProperties}
      />

      {/* The ring everything sits on */}
      {path && (
        <svg aria-hidden className="absolute inset-0 size-full overflow-visible" fill="none">
          <motion.path
            d={path}
            stroke="var(--primary)"
            strokeOpacity={0.35}
            strokeWidth={1.5}
            strokeDasharray="3 8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>
      )}

      <motion.div
        className="absolute inset-[7%]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <Image
          src="/images/about/about-modern-cloud-voice.png"
          alt="Modern business team collaborating with SipLink cloud voice and unified communications"
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-contain object-center drop-shadow-2xl"
        />
      </motion.div>

      {/* The four channels, travelling the ring */}
      {path &&
        CHANNELS.map(({ label, icon: Icon }, i) => (
          <motion.span
            key={label}
            className="absolute top-0 left-0 z-10 flex items-center gap-2 rounded-full border border-border/70 bg-card/90 py-1 pr-3 pl-1 text-xs font-semibold text-foreground capitalize shadow-lg shadow-primary/15 backdrop-blur-md"
            style={{ offsetPath: `path("${path}")`, offsetRotate: "0deg" }}
            initial={{ offsetDistance: `${i * 25}%`, opacity: 0 }}
            animate={
              still
                ? { offsetDistance: `${i * 25 + 12}%`, opacity: 1 }
                : { offsetDistance: [`${i * 25}%`, `${i * 25 + 100}%`], opacity: 1 }
            }
            transition={{
              offsetDistance: { duration: 32, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.6, delay: 1 + i * 0.15 },
            }}
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon className="size-3" />
            </span>
            {label === "business applications" ? "Business apps" : label}
          </motion.span>
        ))}
    </motion.div>
  );
}

/* ---------------------------------------------------------- reliability */

function ReliabilityRow({
  items,
  still,
}: {
  items: { title: string; description: string }[];
  still: boolean;
}) {
  const diagrams = [Failover, ProviderLinks, Scales];

  return (
    <motion.div
      className="mt-20 grid gap-10 border-t border-border/70 pt-12 sm:grid-cols-3 sm:gap-0"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.15 } } }}
    >
      {items.map((item, i) => {
        const Icon = RELIABILITY_ICONS[i] ?? ServerCog;
        const Diagram = diagrams[i] ?? Failover;
        return (
          <motion.div
            key={item.title}
            className="group sm:border-l sm:border-border/70 sm:px-8 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
            variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
          >
            <div className="h-28 rounded-2xl bg-gradient-to-b from-accent/50 to-transparent px-2 pt-2">
              <Diagram still={still} />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
              {item.description}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

const svgText = "fill-muted-foreground font-mono text-[8px] tracking-wider uppercase";

function Node({ x, y, label, lit }: { x: number; y: number; label: string; lit: boolean | number[] }) {
  return (
    <g>
      <motion.rect
        x={x - 26}
        y={y - 16}
        width={52}
        height={32}
        rx={8}
        fill="var(--card)"
        stroke="var(--primary)"
        strokeWidth={1.5}
        animate={typeof lit === "boolean" ? { strokeOpacity: lit ? 1 : 0.3 } : { strokeOpacity: lit }}
        transition={typeof lit === "boolean" ? undefined : { duration: 6, repeat: Infinity }}
      />
      {[0, 1, 2].map((row) => (
        <rect key={row} x={x - 17} y={y - 10 + row * 7} width={34} height={4} rx={2} fill="var(--primary)" opacity={0.18 + row * 0.08} />
      ))}
      <text x={x} y={y + 28} textAnchor="middle" className={svgText}>
        {label}
      </text>
    </g>
  );
}

/** Replication to the secondary, then the secondary taking over. */
function Failover({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 240 100" className="size-full" aria-hidden>
      <line x1={80} y1={42} x2={160} y2={42} stroke="var(--border)" strokeWidth={2} strokeDasharray="3 4" />
      <Node x={52} y={42} label="Primary" lit={still ? true : [1, 1, 0.25, 0.25, 1]} />
      <Node x={188} y={42} label="Secondary" lit={still ? true : [0.4, 0.4, 1, 1, 0.4]} />
      {!still &&
        [0, 1, 2].map((d) => (
          <motion.circle
            key={d}
            r={3}
            cy={42}
            fill="var(--primary)"
            animate={{ cx: [80, 160], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.4, ease: "linear" }}
          />
        ))}
      {!still && (
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 6, repeat: Infinity }}>
          <rect x={160} y={4} width={56} height={14} rx={7} fill="var(--primary)" />
          <text x={188} y={14} textAnchor="middle" className="fill-primary-foreground font-mono text-[7px] font-semibold uppercase">
            Taking over
          </text>
        </motion.g>
      )}
    </svg>
  );
}

/** Two links; when one drops, the other carries everything. */
function ProviderLinks({ still }: { still: boolean }) {
  const top = "M70 28 C 120 28, 130 50, 176 50";
  const bottom = "M70 72 C 120 72, 130 50, 176 50";
  return (
    <svg viewBox="0 0 240 100" className="size-full" aria-hidden>
      <motion.path
        d={top}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={2}
        animate={still ? undefined : { strokeOpacity: [0.8, 0.8, 0.15, 0.15, 0.8] }}
        strokeDasharray={still ? undefined : "4 3"}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.path
        d={bottom}
        fill="none"
        stroke="var(--primary)"
        animate={still ? undefined : { strokeWidth: [2, 2, 4, 4, 2] }}
        strokeWidth={2}
        transition={{ duration: 6, repeat: Infinity }}
      />
      {!still && (
        <>
          <motion.circle
            r={3}
            fill="var(--primary)"
            style={{ offsetPath: `path("${top}")` }}
            animate={{ offsetDistance: ["0%", "100%"], opacity: [1, 1, 0, 0, 1] }}
            transition={{ offsetDistance: { duration: 1.2, repeat: Infinity, ease: "linear" }, opacity: { duration: 6, repeat: Infinity } }}
          />
          <motion.circle
            r={3}
            fill="var(--primary)"
            style={{ offsetPath: `path("${bottom}")` }}
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
          />
        </>
      )}
      <circle cx={52} cy={28} r={12} fill="var(--card)" stroke="var(--primary)" strokeWidth={1.5} />
      <circle cx={52} cy={72} r={12} fill="var(--card)" stroke="var(--primary)" strokeWidth={1.5} />
      <text x={52} y={31} textAnchor="middle" className="fill-primary font-mono text-[8px] font-bold">A</text>
      <text x={52} y={75} textAnchor="middle" className="fill-primary font-mono text-[8px] font-bold">B</text>
      <rect x={176} y={36} width={44} height={28} rx={14} fill="var(--primary)" />
      <text x={198} y={53} textAnchor="middle" className="fill-primary-foreground font-mono text-[7px] font-semibold uppercase">
        Network
      </text>
      <text x={20} y={98} className={svgText}>Two data centres</text>
    </svg>
  );
}

/** Users and sites added, from a browser. */
function Scales({ still }: { still: boolean }) {
  const cells = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg viewBox="0 0 240 100" className="size-full" aria-hidden>
      <rect x={40} y={6} width={160} height={84} rx={8} fill="var(--card)" stroke="var(--border)" strokeWidth={1.5} />
      <line x1={40} y1={20} x2={200} y2={20} stroke="var(--border)" />
      {[0, 1, 2].map((d) => (
        <circle key={d} cx={50 + d * 7} cy={13} r={2} fill="var(--muted-foreground)" opacity={0.4} />
      ))}
      <rect x={76} y={9} width={110} height={8} rx={4} fill="var(--muted)" />
      {cells.map((c) => {
        const col = c % 6;
        const row = Math.floor(c / 6);
        return (
          <motion.rect
            key={c}
            x={54 + col * 23}
            y={30 + row * 26}
            width={18}
            height={18}
            rx={5}
            fill="var(--primary)"
            initial={{ opacity: still ? 0.85 : 0.08 }}
            animate={still ? undefined : { opacity: [0.08, 0.08, 0.85, 0.85, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, c / 16, c / 16 + 0.06, 0.9, 1] }}
          />
        );
      })}
    </svg>
  );
}
