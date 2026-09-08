/**
 * The persistent product element for the continuous hero.
 *
 * THIS IS THE SWAP POINT. There is no laptop photo or 3D model in the repo,
 * so this draws one. To use a real asset, replace the body of this component
 * with an <Image> (or an r3f <Canvas>) at the same aspect ratio — the
 * animation rig in `continuous-hero.tsx` transforms whatever is in here and
 * needs no changes.
 *
 * Colours come from theme tokens rather than the page background, because
 * this element travels across backgrounds: a graphite body with a lit screen
 * has to hold contrast on both the light opening panels and the deep brand
 * red it ends on.
 */
export function LaptopModel({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 470"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="lm-lid" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="var(--muted-foreground)" />
          <stop offset="100%" stopColor="var(--foreground)" />
        </linearGradient>
        <linearGradient id="lm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--muted-foreground)" />
          <stop offset="100%" stopColor="var(--foreground)" />
        </linearGradient>
        <linearGradient id="lm-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-from)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--brand-to)" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Lid */}
      <rect x="106" y="10" width="508" height="318" rx="18" fill="url(#lm-lid)" />
      <rect
        x="120"
        y="24"
        width="480"
        height="278"
        rx="8"
        fill="var(--foreground)"
      />
      <rect
        x="120"
        y="24"
        width="480"
        height="278"
        rx="8"
        fill="url(#lm-screen)"
      />
      {/* Camera */}
      <circle cx="360" cy="17" r="2.5" fill="var(--background)" opacity="0.5" />

      {/* --- Screen UI: a compressed SipLink console --- */}
      {/* Title bar */}
      <g opacity="0.9">
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={138 + i * 13}
            cy={42}
            r="3.5"
            fill="var(--background)"
            opacity="0.35"
          />
        ))}
      </g>
      <line
        x1="120"
        y1="58"
        x2="600"
        y2="58"
        stroke="var(--background)"
        strokeOpacity="0.14"
      />

      {/* Sidebar */}
      <line
        x1="212"
        y1="58"
        x2="212"
        y2="302"
        stroke="var(--background)"
        strokeOpacity="0.14"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x="136"
            y={78 + i * 30}
            width="12"
            height="12"
            rx="3"
            fill="var(--background)"
            opacity={i === 1 ? 0.85 : 0.28}
          />
          <rect
            x="156"
            y={82 + i * 30}
            width={i === 1 ? 40 : 34}
            height="5"
            rx="2.5"
            fill="var(--background)"
            opacity={i === 1 ? 0.7 : 0.22}
          />
        </g>
      ))}

      {/* Active call card */}
      <rect
        x="234"
        y="78"
        width="344"
        height="92"
        rx="10"
        fill="var(--background)"
        opacity="0.08"
      />
      <circle cx="272" cy="124" r="20" fill="var(--primary)" opacity="0.9" />
      <rect
        x="304"
        y="108"
        width="122"
        height="9"
        rx="4.5"
        fill="var(--background)"
        opacity="0.72"
      />
      <rect
        x="304"
        y="126"
        width="78"
        height="7"
        rx="3.5"
        fill="var(--background)"
        opacity="0.34"
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={468 + i * 34}
          cy="124"
          r="13"
          fill="var(--background)"
          opacity="0.16"
        />
      ))}

      {/* Analytics bars */}
      <rect
        x="234"
        y="186"
        width="164"
        height="116"
        rx="10"
        fill="var(--background)"
        opacity="0.08"
      />
      {[38, 62, 30, 78, 52].map((h, i) => (
        <rect
          key={i}
          x={252 + i * 28}
          y={284 - h}
          width="16"
          height={h}
          rx="4"
          fill="var(--primary)"
          opacity={0.35 + i * 0.13}
        />
      ))}

      {/* Queue list */}
      <rect
        x="414"
        y="186"
        width="164"
        height="116"
        rx="10"
        fill="var(--background)"
        opacity="0.08"
      />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle
            cx="436"
            cy={210 + i * 25}
            r="6"
            fill="var(--background)"
            opacity="0.3"
          />
          <rect
            x="450"
            y={206 + i * 25}
            width={104 - i * 14}
            height="6"
            rx="3"
            fill="var(--background)"
            opacity="0.22"
          />
        </g>
      ))}

      {/* Base — a shallow trapezoid, so the lid reads as standing on it. */}
      <path
        d="M96 328h528l74 74a10 10 0 0 1-8 16H30a10 10 0 0 1-8-16l74-74Z"
        fill="url(#lm-base)"
      />
      {/* Trackpad notch on the front lip */}
      <rect
        x="318"
        y="336"
        width="84"
        height="8"
        rx="4"
        fill="var(--background)"
        opacity="0.18"
      />
      <path
        d="M22 406h676"
        stroke="var(--background)"
        strokeOpacity="0.15"
        strokeWidth="1.5"
      />
    </svg>
  );
}
