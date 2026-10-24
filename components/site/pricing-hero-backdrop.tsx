import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * The moving layer behind the pricing hero, drawn around the idea of a call
 * going out: signal pulses rippling from behind the headline, lights
 * orbiting the rings with comet tails, a slow sweep of light, and motes
 * rising.
 *
 * Decorative throughout, and pure CSS motion (see the pricing rules in
 * globals.css); everything stops under reduced motion.
 */

/** Lights orbiting the rings: radius, size, lap time and starting angle. */
const ORBITERS = [
  { r: 210, size: 7, duration: 18, start: 20 },
  { r: 300, size: 5, duration: 28, start: 160, reverse: true },
  { r: 380, size: 8, duration: 36, start: 250 },
  { r: 460, size: 4, duration: 46, start: 80, reverse: true },
];

/** Motes rising through the hero. */
const MOTES = [
  { left: "12%", size: 5, duration: 14, delay: 0, x: 30 },
  { left: "24%", size: 3, duration: 18, delay: -6, x: -20 },
  { left: "37%", size: 4, duration: 16, delay: -11, x: 24 },
  { left: "63%", size: 3, duration: 17, delay: -3, x: -26 },
  { left: "76%", size: 5, duration: 15, delay: -9, x: 18 },
  { left: "88%", size: 4, duration: 19, delay: -14, x: -16 },
];

export function PricingHeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Everything ring-shaped is centred just behind the headline. */}
      <div className="absolute top-[42%] left-1/2 size-[min(62rem,160vw)] -translate-x-1/2 -translate-y-1/2">
        {/* The sweep: a soft wedge of light turning slowly. */}
        <div
          className="pricing-orbit absolute inset-[6%] rounded-full [--orbit-duration:16s] [mask-image:radial-gradient(circle,black_35%,transparent_70%)]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, var(--brand-from) 28%, transparent) 40deg, transparent 80deg, transparent 360deg)",
          }}
        />

        {/* Signal pulses, rippling out in turn. */}
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="pricing-pulse absolute inset-[30%] rounded-full border border-primary/35 shadow-[0_0_40px_-10px] shadow-primary/40"
            style={{ "--pulse-delay": `${i * 1.875}s` } as CSSProperties}
          />
        ))}

        {/* Orbiting lights with comet tails. */}
        <svg viewBox="0 0 1000 1000" fill="none" className="absolute inset-0 size-full overflow-visible">
          <defs>
            <linearGradient id="hero-tail" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.85" />
            </linearGradient>
            <radialGradient id="hero-glow">
              <stop offset="0%" stopColor="var(--brand-from)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--brand-from)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {ORBITERS.map(({ r, size, duration, start, reverse }) => {
            // The tail: the 40° of arc trailing the light.
            const a0 = ((-40 - 90) * Math.PI) / 180;
            const a1 = (-90 * Math.PI) / 180;
            const tail = `M ${500 + r * Math.cos(a0)} ${500 + r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${500 + r * Math.cos(a1)} ${500 + r * Math.sin(a1)}`;
            return (
              <g key={r} style={{ transform: `rotate(${start}deg)`, transformOrigin: "500px 500px" }}>
                <g
                  className={cn("pricing-orbit", reverse && "[animation-direction:reverse]")}
                  style={{ transformOrigin: "500px 500px", "--orbit-duration": `${duration}s` } as CSSProperties}
                >
                  <path
                    d={tail}
                    stroke="url(#hero-tail)"
                    strokeWidth={size * 0.5}
                    strokeLinecap="round"
                    style={reverse ? { transform: "scaleX(-1)", transformOrigin: "500px 500px" } : undefined}
                  />
                  <circle cx="500" cy={500 - r} r={size * 3} fill="url(#hero-glow)" />
                  <circle cx="500" cy={500 - r} r={size / 2 + 1} className="fill-primary" />
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Motes rising through the hero. */}
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="pricing-rise absolute bottom-0 rounded-full bg-primary/60 shadow-[0_0_12px] shadow-primary/50"
          style={
            {
              left: m.left,
              width: m.size,
              height: m.size,
              "--rise-duration": `${m.duration}s`,
              "--rise-delay": `${m.delay}s`,
              "--rise-x": `${m.x}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
