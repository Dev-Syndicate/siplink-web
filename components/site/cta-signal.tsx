import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The signature graphic shared by every gradient CTA panel: a loose cluster
 * of glass tiles, each swaying on its own slow, slightly rotated path, as if
 * caught in a breeze. It gives the right side of the panel a quiet life
 * instead of standing for any one product, so it works beside copy about
 * PBX, toll-free numbers, or anything else this panel closes.
 *
 * Each tile sways at its own pace and angle (`--sway-duration` /
 * `--sway-delay` / `--sway-x` / `--sway-rotate`) so the cluster never moves
 * in lockstep. Respects `prefers-reduced-motion` via the CSS in
 * globals.css. Only rendered at `xl` and above, where there is genuine
 * width for it to sit without ever running under the text column.
 *
 * `compact` pulls the whole cluster toward the top third and shrinks it,
 * for panels that run a checklist or extra content below the buttons and
 * so have less clear height for the motif to occupy.
 */
export function CtaSignal({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute right-0 hidden w-[34rem] xl:block",
        compact ? "top-0 h-72 w-[26rem] origin-top-right scale-90" : "inset-y-0",
        className,
      )}
    >
      <span
        className="cta-signal-tile absolute top-[8%] right-[15rem] size-20 rounded-2xl bg-primary-foreground/10"
        style={{ "--sway-duration": "6s", "--sway-delay": "0s", "--sway-x": "30px", "--sway-y": "22px", "--sway-rotate": "-9deg" } as CSSProperties}
      />
      <span
        className="cta-signal-tile absolute top-[18%] right-[6rem] size-56 rounded-[2rem] bg-primary-foreground/10 blur-[2px]"
        style={{ "--sway-duration": "8.5s", "--sway-delay": "-3s", "--sway-x": "-34px", "--sway-y": "16px", "--sway-rotate": "7deg" } as CSSProperties}
      />
      <span
        className="cta-signal-tile absolute top-[44%] right-[1.5rem] size-40 rounded-3xl bg-primary-foreground/15"
        style={{ "--sway-duration": "5.5s", "--sway-delay": "-1.5s", "--sway-x": "26px", "--sway-y": "-20px", "--sway-rotate": "-8deg" } as CSSProperties}
      />
      <span
        className="cta-signal-tile absolute bottom-[14%] right-[11rem] size-28 rounded-2xl bg-primary-foreground/10"
        style={{ "--sway-duration": "7s", "--sway-delay": "-4.5s", "--sway-x": "-24px", "--sway-y": "-18px", "--sway-rotate": "10deg" } as CSSProperties}
      />
      <span
        className="cta-signal-tile absolute bottom-[4%] right-[20rem] size-14 rounded-xl bg-primary-foreground/10"
        style={{ "--sway-duration": "4.5s", "--sway-delay": "-0.8s", "--sway-x": "20px", "--sway-y": "26px", "--sway-rotate": "-11deg" } as CSSProperties}
      />
    </div>
  );
}
