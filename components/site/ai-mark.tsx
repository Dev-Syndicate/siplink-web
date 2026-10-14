/**
 * The AI lettermark.
 *
 * A lettermark rather than the usual sparkle: the brief is that AI should be
 * named, not hinted at, and two letters on the brand gradient say it plainly
 * where a wand or a star asks the reader to infer it. It also survives being
 * shrunk into the console's header row, which an icon at this size does not.
 *
 * The sheen is the site's AI signature: it marks every place AI appears —
 * the hero, the AI Voice product card, the AI section — and nowhere else, so
 * a visitor learns to follow it. Do not put it on anything that is not AI.
 */
export function AiMark() {
  return (
    // The sheen is clipped by the chip itself. Hidden from assistive tech:
    // it always sits beside text that already says "AI".
    <span aria-hidden className="relative inline-flex size-6 shrink-0 items-center justify-center">
      <span className="relative inline-flex size-6 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-from to-brand-to">
        <span className="font-mono text-[10px] leading-none font-semibold tracking-tight text-primary-foreground">
          AI
        </span>
        <span aria-hidden className="ai-sheen absolute inset-0" />
      </span>
    </span>
  );
}
