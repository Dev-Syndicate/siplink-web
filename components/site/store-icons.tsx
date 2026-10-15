/**
 * App Store, Play Store and Google marks as inline SVG.
 *
 * lucide's `Apple` icon is a piece of fruit with a stem, not the Apple logo,
 * and it has no Android or Play mark at all — so these are drawn here. Apple
 * follows `currentColor`; Play and Google keep their brand colours.
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

/**
 * Google Play's triangle in its own four colours. Like the Google "G" below,
 * these are the brand's colours, not ours, so they have no theme token.
 */
export function PlayStoreLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path fill="#00D7FE" d="M3.6 2.3a1 1 0 0 0-.35.76v17.88a1 1 0 0 0 .35.76l.1.05L13.5 12v-.1L3.7 2.25l-.1.05z" />
      <path fill="#FFCE00" d="M16.8 15.3 13.5 12v-.1l3.3-3.3.08.05 3.9 2.22c1.11.63 1.11 1.66 0 2.3l-3.9 2.21-.08.05z" />
      <path fill="#FF3A44" d="M16.88 15.25 13.5 11.95 3.6 21.7a1.3 1.3 0 0 0 1.66.05l11.62-6.6z" />
      <path fill="#00F076" d="M16.88 8.65 5.26 2.05A1.3 1.3 0 0 0 3.6 2.1l9.9 9.85 3.38-3.3z" />
    </svg>
  );
}

/**
 * Google's "G", for review attribution.
 *
 * The one mark here drawn in colour rather than `currentColor`: the four
 * brand colours are what make it read as Google at 20px, and Google's own
 * attribution rules ask for it unaltered. They are its colours, not ours, so
 * there is no theme token for them.
 */
export function GoogleLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.29A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.29v-3.1H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4.01-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.28 6.61l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77z"
      />
    </svg>
  );
}
