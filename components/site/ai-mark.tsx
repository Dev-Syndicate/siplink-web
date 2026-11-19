import { Sparkles } from "lucide-react";

/**
 * The AI mark: a sparkle on the brand gradient.
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
        <Sparkles className="size-3.5 text-primary-foreground" strokeWidth={2.25} />
        <span aria-hidden className="ai-sheen absolute inset-0" />
      </span>
    </span>
  );
}
