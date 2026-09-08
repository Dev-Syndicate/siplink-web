import { integrations } from "@/lib/site";

/**
 * Slow right-to-left strip of the platforms SipLink integrates with.
 *
 * Uses the shared `.marquee` / `.marquee-track` rules in `app/globals.css` —
 * the same ones the reviews marquee runs on. The track holds the list twice
 * and translates by -50%, so the loop lands on the duplicate and never jumps;
 * that CSS also pauses on hover and stops entirely under
 * `prefers-reduced-motion`, so there is nothing to reimplement here.
 *
 * The heading is not decoration. A bare strip of company names under a hero
 * reads as a customer list, and these are integrations — SipLink has no
 * cleared customer logos (see details-content.md section 21, question 6).
 * Do not drop the label, and do not put company logos here until someone has
 * both the names and written permission to display them.
 */
export function IntegrationMarquee() {
  // Slow enough to read a name as it passes rather than skim past it.
  const duration = `${integrations.length * 7}s`;

  return (
    <section className="border-b border-border py-12">
      <h2 className="px-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Integrates with the tools you already run
      </h2>

      <div className="marquee mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div
          className="marquee-track flex items-center gap-16"
          style={{ "--marquee-duration": duration } as React.CSSProperties}
        >
          {/* The list twice: -50% lands exactly on the duplicate. */}
          {[0, 1].map((pass) => (
            <div
              key={pass}
              className="flex items-center gap-16"
              aria-hidden={pass === 1}
            >
              {integrations.map((name) => (
                <span
                  key={`${pass}-${name}`}
                  className="whitespace-nowrap text-xl font-semibold tracking-tight text-foreground/60 transition-colors hover:text-foreground"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
