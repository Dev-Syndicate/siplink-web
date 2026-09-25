import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { internetStack } from "@/lib/internet";

/**
 * The combination stack from docs/INTERNET.md, drawn as five tiers that rest
 * on each other rather than five products side by side.
 *
 * The argument the brief asks this section to make is that SipLink is not
 * selling an internet connection — it is selling the layer business
 * applications run on. A row of equal cards would say the opposite, so the
 * tiers descend and each one is visibly connected to the next.
 *
 * Items that have a page link to it; the rest are named because they belong
 * in the picture, and are plain text rather than dead links.
 */
export function NetworkStack() {
  return (
    <ol className="relative mx-auto mt-16 max-w-3xl">
      {internetStack.map(({ tier, caption, icon: Icon, items }, index) => {
        const last = index === internetStack.length - 1;

        return (
          <ScrollReveal
            as="li"
            key={tier}
            delay={index * 90}
            shift={18}
            className="relative"
          >
            <div className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/40 sm:p-7">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {tier}
                  </h3>
                  <p className="text-sm text-muted-foreground">{caption}</p>
                </div>
                <span className="ml-auto font-mono text-xs tracking-[0.2em] text-muted-foreground/60 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map(({ label, href }) =>
                  href ? (
                    <li key={label}>
                      <Link
                        href={href}
                        className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary focus-visible:border-primary focus-visible:outline-none"
                      >
                        {label}
                        <ArrowRight
                          className="size-3 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ) : (
                    <li key={label}>
                      <Badge
                        variant="secondary"
                        className="rounded-full px-3 py-1.5 text-sm font-normal"
                      >
                        {label}
                      </Badge>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* The join to the next tier. Decorative: the ordered list
                already carries the sequence for a screen reader. */}
            {last ? null : (
              <div
                aria-hidden
                className="flex h-10 items-center justify-center"
              >
                <span
                  className="stack-drop flex flex-col items-center text-primary"
                  style={
                    { "--drop-delay": `${index * 0.25}s` } as React.CSSProperties
                  }
                >
                  <span className="h-4 w-px bg-primary/40" />
                  <svg viewBox="0 0 12 8" className="h-2 w-3 fill-none">
                    <path
                      d="M1 1 L6 6 L11 1"
                      className="stroke-primary"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            )}
          </ScrollReveal>
        );
      })}
    </ol>
  );
}
