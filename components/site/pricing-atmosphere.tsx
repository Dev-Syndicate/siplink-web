import type { CSSProperties } from "react";

/**
 * The pricing page's background, behind everything from the header down:
 * a warm wash, oversized rings turning slowly behind the hero, a ribbon of
 * brand light swaying through the plans, and soft lights drifting on long
 * paths at different depths down the page.
 *
 * Pure CSS motion on transforms and opacity, decorative only, and it all
 * stops under reduced motion (see the pricing rules in globals.css).
 */

const LIGHTS: {
  top: string;
  side: CSSProperties;
  size: string;
  tone: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
}[] = [
  { top: "2%", side: { left: "8%" }, size: "34rem", tone: "bg-brand-from/25", x: 120, y: 60, duration: 26, delay: 0 },
  { top: "6%", side: { right: "4%" }, size: "28rem", tone: "bg-primary/15", x: -90, y: 80, duration: 32, delay: -6 },
  { top: "22%", side: { left: "38%" }, size: "40rem", tone: "bg-brand-from/20", x: 140, y: -50, duration: 36, delay: -12 },
  { top: "44%", side: { right: "10%" }, size: "30rem", tone: "bg-brand-to/10", x: -110, y: 70, duration: 30, delay: -4 },
  { top: "66%", side: { left: "4%" }, size: "32rem", tone: "bg-brand-from/15", x: 100, y: -60, duration: 34, delay: -16 },
  { top: "86%", side: { right: "20%" }, size: "26rem", tone: "bg-primary/10", x: -80, y: -40, duration: 28, delay: -9 },
];

export function PricingAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* The warm base: blush at the top, easing to white. */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent via-background to-background" />
      <div className="absolute inset-x-0 top-0 h-[70rem] bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,color-mix(in_oklab,var(--brand-from)_22%,transparent),transparent_70%)]" />

      {LIGHTS.map((light, i) => (
        <span
          key={i}
          className={`pricing-drift absolute rounded-full blur-3xl ${light.tone}`}
          style={
            {
              top: light.top,
              ...light.side,
              width: light.size,
              height: light.size,
              "--drift-x": `${light.x}px`,
              "--drift-y": `${light.y}px`,
              "--drift-duration": `${light.duration}s`,
              "--drift-delay": `${light.delay}s`,
            } as CSSProperties
          }
        />
      ))}

      {/* Rings behind the hero, running down into the plans. Two layers
          turning opposite ways, solid and dotted, at different scales. */}
      <div className="absolute top-[24rem] left-1/2 size-[min(110rem,230vw)] -translate-x-1/2 -translate-y-1/2">
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          className="pricing-orbit absolute inset-0 size-full [--orbit-duration:180s]"
        >
          {[110, 190, 270, 350, 430, 495].map((r, i) => (
            <circle
              key={r}
              cx="500"
              cy="500"
              r={r}
              className="stroke-primary"
              strokeOpacity={0.2 - i * 0.028}
              strokeWidth="0.8"
            />
          ))}
          <circle cx="500" cy="230" r="4" className="fill-primary" fillOpacity="0.55" />
          <circle cx="850" cy="500" r="3" className="fill-primary" fillOpacity="0.4" />
          <circle cx="190" cy="690" r="2.5" className="fill-primary" fillOpacity="0.35" />
        </svg>
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          className="pricing-orbit absolute inset-[12%] [animation-direction:reverse] [--orbit-duration:140s]"
        >
          {[150, 300, 440].map((r) => (
            <circle
              key={r}
              cx="500"
              cy="500"
              r={r}
              className="stroke-primary"
              strokeOpacity="0.22"
              strokeWidth="1.2"
              strokeDasharray="1 12"
              strokeLinecap="round"
            />
          ))}
          {/* Partial arcs, for an architectural rather than target-like feel. */}
          <path d="M 120 500 A 380 380 0 0 1 500 120" className="stroke-primary" strokeOpacity="0.3" strokeWidth="1.4" />
          <path d="M 880 500 A 380 380 0 0 1 500 880" className="stroke-primary" strokeOpacity="0.2" strokeWidth="1.4" />
        </svg>
      </div>

      {/* The ribbon: two layered, feathered bands of brand light. */}
      <div className="pricing-sway absolute top-[30rem] left-1/2 h-[34rem] w-[min(96rem,200vw)] -translate-x-1/2 opacity-80">
        <svg viewBox="0 0 1600 560" preserveAspectRatio="none" className="size-full blur-2xl">
          <defs>
            <linearGradient id="pricing-ribbon-a" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--brand-from)" stopOpacity="0" />
              <stop offset="35%" stopColor="var(--brand-from)" stopOpacity="0.45" />
              <stop offset="65%" stopColor="var(--primary)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--brand-to)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="pricing-ribbon-b" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--brand-from)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 330 C 260 160, 520 470, 800 300 S 1340 140, 1600 310 L 1600 390 C 1340 230, 1060 520, 800 380 S 260 250, 0 410 Z"
            fill="url(#pricing-ribbon-a)"
          />
          <path
            d="M0 250 C 300 380, 600 120, 860 260 S 1380 380, 1600 220 L 1600 270 C 1380 420, 1100 210, 860 310 S 300 430, 0 300 Z"
            fill="url(#pricing-ribbon-b)"
          />
        </svg>
      </div>

      {/* A soft fade at the foot so the page settles into the footer. */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
