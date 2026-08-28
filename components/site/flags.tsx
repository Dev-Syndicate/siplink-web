/**
 * Simplified country flags as inline SVG.
 *
 * Emoji flags (🇺🇸 🇨🇦) are not used: Windows renders them as letter pairs
 * rather than flags, so a large share of visitors would see "US" / "CA".
 * These are decorative — each card already names its country in text — so
 * they are marked aria-hidden.
 */

type FlagProps = { className?: string };

export function FlagUS({ className }: FlagProps) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="24" height="16" rx="2" fill="#fff" />
      {/* 7 red stripes across 13 bands */}
      {[0, 2, 4, 6, 8, 10, 12].map((band) => (
        <rect
          key={band}
          y={(band * 16) / 13}
          width="24"
          height={16 / 13}
          fill="#B31942"
        />
      ))}
      <rect width="10" height={(16 / 13) * 7} fill="#0A3161" />
      {[...Array(4)].map((_, row) =>
        [...Array(5)].map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={1 + col * 2 + (row % 2 ? 1 : 0)}
            cy={1.1 + row * 2}
            r="0.42"
            fill="#fff"
          />
        ))
      )}
      <rect
        width="24"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.12"
      />
    </svg>
  );
}

export function FlagCA({ className }: FlagProps) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="24" height="16" rx="2" fill="#fff" />
      <path d="M0 2a2 2 0 0 1 2-2h4v16H2a2 2 0 0 1-2-2V2Z" fill="#D80621" />
      <path d="M18 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4V0Z" fill="#D80621" />
      {/* Maple leaf */}
      <path
        d="M12 3.2l.75 1.6 1.5-.55-.45 1.6 1.7.15-1.35 1.1.55 1.05-1.85-.4-.2 1.9h-.6l-.2-1.9-1.85.4.55-1.05L8.5 6l1.7-.15-.45-1.6 1.5.55L12 3.2Z"
        fill="#D80621"
      />
      <rect
        width="24"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.12"
      />
    </svg>
  );
}
