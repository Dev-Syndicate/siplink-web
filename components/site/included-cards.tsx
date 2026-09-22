import { IncludedFigure } from "@/components/site/included-figures";
import type { SolutionDetail } from "@/lib/solutions";
import { cn } from "@/lib/utils";

/**
 * What is included, as cards.
 *
 * Built to the reference the client supplied: a centred heading and
 * standfirst, then soft rounded cards each carrying a tinted plate, a title
 * and a line of body copy.
 *
 * Two departures from that reference, both deliberate. Its pink page wash is
 * gone, because a saturated brand ground is a standing no on this site — the
 * colour lives in the plates instead, which is where most of it sits in the
 * reference anyway. And its headline is not re-created two-tone: colouring
 * half a heading in the accent is the single commonest tell of a generated
 * page, and the brief asked for the title centred, not recoloured.
 *
 * Shared by the Enterprise and Mid-Market pages, which is why the standfirst
 * is a prop: the cards are the same object on both, but six capabilities that
 * make up a layer and four that a growing organisation grows into are not the
 * same claim. Small Business keeps its own treatment.
 *
 * The column count follows the count. Six go three across, because two would
 * make each card wide enough that its plate became a large empty field; four
 * go two across for the same reason in reverse.
 */
export function IncludedCards({
  capabilities,
  standfirst,
}: {
  capabilities: SolutionDetail["capabilities"];
  standfirst: string;
}) {
  const wide = capabilities.length <= 4;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          What&rsquo;s included
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">{standfirst}</p>
      </div>

      <ul
        className={cn(
          "mt-12 grid gap-5 sm:grid-cols-2",
          wide ? "mx-auto max-w-4xl" : "lg:grid-cols-3",
        )}
      >
        {capabilities.map(({ title, description, icon: Icon }) => {
          return (
            <li
              key={title}
              className="flex flex-col rounded-3xl border border-border bg-card p-3 shadow-sm"
            >
              {/* The plate. A tint with the schematic sitting in it, at a
                  fixed ratio so all six line up whatever the copy does.

                  Lighter than it was: the figures now carry white chassis and
                  hairline strokes, and the old tint was strong enough at the
                  top-left corner to swallow both. */}
              <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent/70 via-accent/35 to-accent/10">
                <IncludedFigure
                  title={title}
                  fallback={
                    <Icon className="size-9 text-primary" aria-hidden />
                  }
                />
              </div>

              <div className="px-2 pt-5 pb-2">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-balance">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
