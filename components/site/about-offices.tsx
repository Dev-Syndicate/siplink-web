"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type AboutOffice = {
  city: string;
  badge: string;
  address: string[];
  phone: string;
};

/**
 * Where each office sits on the schematic. Not to scale: the three Indian
 * offices are a few hundred kilometres apart, so they are spread out enough
 * to read while keeping their real arrangement (Hyderabad north, Bangalore
 * south-west, Chennai south-east). Sheridan is the registered US entity, not
 * a staffed office, so it is drawn hollow.
 */
const mapPoints: Record<
  string,
  { x: number; y: number; label: string; staffed: boolean; labelSide: "left" | "right" }
> = {
  "Sheridan, Wyoming (USA)": { x: 132, y: 118, label: "Sheridan", staffed: false, labelSide: "right" },
  Hyderabad: { x: 470, y: 142, label: "Hyderabad", staffed: true, labelSide: "right" },
  Bangalore: { x: 440, y: 222, label: "Bangalore", staffed: true, labelSide: "left" },
  Chennai: { x: 520, y: 208, label: "Chennai", staffed: true, labelSide: "right" },
};

/* Sheridan → Hyderabad is the long-haul link; the three Indian offices are
   meshed to each other. */
const routes = [
  { id: "us-in", d: "M132 118 Q 300 -10 470 142", long: true },
  { id: "hyd-blr", d: "M470 142 Q 440 180 440 222", long: false },
  { id: "hyd-chn", d: "M470 142 Q 508 168 520 208", long: false },
  { id: "blr-chn", d: "M440 222 Q 480 232 520 208", long: false },
];

const list: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function AboutOffices({ offices }: { offices: AboutOffice[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        className="relative overflow-hidden border-t border-border py-20 lg:py-28"
      >
        {/* Soft brand glow for the glass panels to blur against */}
        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-24 left-1/4 size-[420px] rounded-full bg-brand-from/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 size-[480px] rounded-full bg-brand-to/10 blur-3xl" />
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.6 }}
            variants={list}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span
              variants={rise}
              className="inline-block font-mono text-xs font-semibold tracking-widest text-primary uppercase"
            >
              Where We Operate
            </motion.span>
            <motion.h2
              variants={rise}
              className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Three offices, one business
            </motion.h2>
            <motion.p variants={rise} className="mt-3 text-pretty text-muted-foreground">
              SipLink Communications Pvt. Ltd. runs out of Chennai, Bangalore,
              and Hyderabad, with SipLink Communications LLC registered in
              Sheridan, Wyoming for US customers.
            </motion.p>
          </motion.div>

          {/* Photograph + network schematic */}
          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.25 }}
            variants={list}
            className="mt-14 grid gap-6 lg:grid-cols-12"
          >
            <motion.div
              variants={rise}
              className="group relative min-h-[340px] overflow-hidden rounded-3xl border border-border/80 bg-card shadow-xl shadow-primary/5 lg:col-span-5"
            >
              <motion.div style={{ y: imageY }} className="absolute -inset-y-[8%] inset-x-0">
                <Image
                  src="/images/about/about-global-network.png"
                  alt="SipLink brand illustration representing people, technology, and global connection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-border/60 bg-background/80 p-3 backdrop-blur-md">
                <Badge variant="secondary" className="mb-1 font-mono text-[10px]">
                  SipLink Communications
                </Badge>
                <p className="text-xs font-semibold text-foreground">Three Offices, One Business</p>
                <p className="text-[11px] text-muted-foreground">
                  Staffed offices in Chennai, Bangalore, and Hyderabad
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={rise}
              className="relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/60 p-5 shadow-xl shadow-primary/5 backdrop-blur-xl sm:p-6 lg:col-span-7"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                  SipLink network
                </span>
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-primary" />
                    Staffed office
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full border border-primary" />
                    Registered entity
                  </span>
                </div>
              </div>

              <NetworkMap active={active} animate={!reduce} />
            </motion.div>
          </motion.div>

          {/* Office directory */}
          <motion.ul
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            variants={list}
            className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {offices.map((office, index) => (
              <motion.li
                key={office.city}
                variants={rise}
                onHoverStart={() => setActive(office.city)}
                onHoverEnd={() => setActive(null)}
                onFocus={() => setActive(office.city)}
                onBlur={() => setActive(null)}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="h-full"
                >
                  <Card className="group relative h-full gap-0 overflow-hidden rounded-2xl border-border/80 bg-card/70 py-0 shadow-sm backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <Badge variant="outline" className="font-mono text-[10px]">
                          {office.badge}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center gap-2.5">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                          <MapPin className="size-4" />
                        </span>
                        <h3 className="text-base font-semibold tracking-tight text-foreground">
                          {office.city}
                        </h3>
                      </div>

                      <address className="mt-4 flex-1 space-y-0.5 text-sm leading-relaxed text-muted-foreground not-italic">
                        {office.address.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </address>

                      <a
                        href={`tel:${office.phone.replace(/\s/g, "")}`}
                        className="mt-5 flex items-center gap-2 border-t border-border/60 pt-4 font-mono text-sm text-foreground transition-colors hover:text-primary"
                      >
                        <Phone className="size-3.5 shrink-0 text-primary" />
                        {office.phone}
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  );
}

function NetworkMap({ active, animate }: { active: string | null; animate: boolean }) {
  return (
    <svg
      viewBox="0 0 640 300"
      role="img"
      aria-label="Map linking SipLink's offices in Hyderabad, Bangalore and Chennai with its registered entity in Sheridan, Wyoming"
      className="mt-4 h-full w-full flex-1"
    >
      <defs>
        <pattern id="offices-dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="var(--muted-foreground)" opacity="0.22" />
        </pattern>
        <radialGradient id="offices-fade">
          <stop offset="55%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="offices-mask">
          <rect width="640" height="300" fill="url(#offices-fade)" />
        </mask>
        <linearGradient id="offices-route" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--brand-from)" />
          <stop offset="100%" stopColor="var(--brand-to)" />
        </linearGradient>
      </defs>

      <rect width="640" height="300" fill="url(#offices-dots)" mask="url(#offices-mask)" />

      {/* Latitude hints */}
      {[90, 160, 230].map((y) => (
        <path
          key={y}
          d={`M20 ${y} Q 320 ${y - 22} 620 ${y}`}
          fill="none"
          stroke="var(--border)"
          strokeDasharray="2 6"
        />
      ))}

      {routes.map((route, i) => (
        <g key={route.id}>
          <motion.path
            d={route.d}
            fill="none"
            stroke="url(#offices-route)"
            strokeWidth={route.long ? 1.75 : 1.25}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: route.long ? 0.9 : 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: route.long ? 1.6 : 0.8, delay: 0.4 + i * 0.25, ease: "easeInOut" }}
          />
          {animate && (
            <motion.circle
              r={route.long ? 3 : 2.25}
              fill="var(--primary)"
              style={{ offsetPath: `path("${route.d}")`, offsetRotate: "0deg" }}
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: route.long ? 3.2 : 1.8,
                delay: 2 + i * 0.6,
                repeat: Infinity,
                repeatDelay: route.long ? 1.2 : 2.4,
                ease: "easeInOut",
              }}
            />
          )}
        </g>
      ))}

      {Object.entries(mapPoints).map(([city, point], i) => {
        const isActive = active === city;
        return (
          <motion.g
            key={city}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            style={{ transformOrigin: `${point.x}px ${point.y}px` }}
          >
            <motion.g
              animate={animate ? { y: [0, -4, 0] } : undefined}
              transition={{ duration: 3.6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {animate && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  fill="var(--primary)"
                  initial={{ r: 6, opacity: 0.35 }}
                  animate={{ r: [6, 20], opacity: [0.35, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                />
              )}
              <motion.circle
                cx={point.x}
                cy={point.y}
                fill="var(--primary)"
                animate={{ r: isActive ? 16 : 11, opacity: isActive ? 0.22 : 0.12 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={5}
                fill={point.staffed ? "var(--primary)" : "var(--card)"}
                stroke="var(--primary)"
                strokeWidth={2}
              />
              <text
                x={point.labelSide === "right" ? point.x + 14 : point.x - 14}
                y={point.y + 4}
                textAnchor={point.labelSide === "right" ? "start" : "end"}
                className={cn(
                  "font-sans text-[12px] font-semibold transition-colors",
                  isActive ? "fill-primary" : "fill-foreground",
                )}
              >
                {point.label}
              </text>
            </motion.g>
          </motion.g>
        );
      })}
    </svg>
  );
}
