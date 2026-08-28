/**
 * App Store and Play Store marks as inline SVG.
 *
 * lucide's `Apple` icon is a piece of fruit with a stem, not the Apple logo,
 * and it has no Android or Play mark at all — so these are drawn here.
 * Decorative: each button already says which platform it is.
 */

type IconProps = { className?: string };

export function AppleLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path d="M17.05 12.54c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.72-1.35-.14-2.64.8-3.33.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.87.69 1.19-.02 1.94-1.08 2.66-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.34-3.51zM14.9 5.6c.61-.74 1.02-1.77.91-2.8-.88.04-1.94.59-2.57 1.32-.56.65-1.05 1.7-.92 2.7.98.08 1.98-.5 2.58-1.22z" />
    </svg>
  );
}

export function PlayStoreLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        d="M3.6 2.3a1 1 0 0 0-.35.76v17.88a1 1 0 0 0 .35.76l.1.05L13.5 12v-.1L3.7 2.25l-.1.05z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M16.8 15.3 13.5 12v-.1l3.3-3.3.08.05 3.9 2.22c1.11.63 1.11 1.66 0 2.3l-3.9 2.21-.08.05z"
        fill="currentColor"
      />
      <path
        d="M16.88 15.25 13.5 11.95 3.6 21.7a1.3 1.3 0 0 0 1.66.05l11.62-6.6z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M16.88 8.65 5.26 2.05A1.3 1.3 0 0 0 3.6 2.1l9.9 9.85 3.38-3.3z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}
