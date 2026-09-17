import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { reviewStats, reviews, type Review } from "@/lib/site";

/**
 * How many reviews the row carries.
 *
 * The list in lib/site.ts runs longest and most specific first, and tails off
 * into short ratings — "Giving best VOIP services with best price." At this
 * card size those read as padding rather than proof: a card most of a screen
 * wide holding one line of text argues against itself. Five is where the
 * substance stops.
 *
 * It is also comfortably enough for the loop. The track only has to be wider
 * than the viewport for the seam to stay off screen, and five cards at this
 * width clears 3,900px — past a 4K display.
 */
const SHOWN = 5;

/**
 * How many times the row is repeated in the track.
 *
 * Two is the minimum that can loop, and two is enough only while a single
 * copy is wider than the screen. At three and a half cards a screen a copy
 * comes to about 3,000px, so a 4K or ultrawide display would run out of row
 * part-way through the drift and show the join. Three clears any screen
 * being sold.
 */
const COPIES = 3;

/**
 * Initials, because there are no reviewer photographs.
 *
 * Every one of these is a named real person or business, so a stock face or a
 * generated avatar would be attaching an invented likeness to a real
 * endorsement. Two letters in the brand tint says the same thing honestly.
 */
function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex shrink-0 items-center gap-0.5 text-primary" aria-hidden>
      {Array.from({ length: rating }).map((_, index) => (
        <Star key={index} className="size-3.5 fill-current" />
      ))}
    </span>
  );
}

/**
 * One review.
 *
 * Attribution sits at the top rather than under the quote. In a row that is
 * drifting past, knowing who is speaking before you start reading is what
 * makes a half-visible card worth starting — and it is why there is no
 * quotation glyph here any more. The name is the mark of a quote; a second
 * one was decoration.
 */
function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="h-full bg-card">
      <CardContent className="flex h-full flex-col gap-4 p-6 lg:gap-5 lg:p-7">
        <header className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
              aria-hidden
            >
              {initials(review.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{review.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {review.role ?? "Verified Google review"}
              </p>
            </div>
          </div>

          <Stars rating={review.rating} />
        </header>

        <blockquote className="flex-1 text-sm leading-relaxed text-pretty lg:text-base">
          {review.quote}
        </blockquote>
      </CardContent>
    </Card>
  );
}

/**
 * Customer stories.
 *
 * One row of reviews drifting the full width of the page, three and a half on
 * screen at a time, so it reads as a wall of them rather than a slideshow of
 * one.
 *
 * The row is rendered COPIES times over. Everything after the first set is
 * there only to make the loop seamless, so it is hidden from assistive tech:
 * a screen reader working through the same five reviews three times would be
 * narrating a rendering trick.
 */
export function CustomerStories() {
  // Renders nothing until real reviews exist. See lib/site.ts.
  if (reviews.length === 0) return null;

  // `reviews[0]` already carries the "why customers stay" section further up
  // the page, so start at the next one rather than quoting it twice.
  const pool = reviews.length > SHOWN ? reviews.slice(1) : reviews;
  const row = pool.slice(0, SHOWN);

  const rating = reviewStats[0];

  // 26.5vw is what puts three and a half cards on screen: a card plus its gap
  // has to come to roughly two sevenths of the viewport, and the gap itself
  // eats about 2% of that. The 36rem cap stops the quote stretching past a
  // readable line length on a very wide monitor, at the cost of a fourth card
  // creeping in beyond about 2,700px. On a phone one card leads with the next
  // just showing — three and a half of these would be unreadable.
  const cardWidth = "w-[88vw] shrink-0 sm:w-[clamp(17rem,26.5vw,36rem)]";

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Customer stories
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Trusted by businesses that keep conversations moving
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Each of these is published on our Google Business Profile, with the
            wording unchanged.
          </p>

          {/* One star, not five. The average is 4.5, and a row of five filled
              stars beside that number would be claiming half a point we do
              not have — the cards carry their own real ratings. */}
          <p className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-4 py-2">
            <Star className="size-4 shrink-0 fill-current text-primary" aria-hidden />
            <span className="font-heading text-sm font-semibold">
              {rating.value}
            </span>
            <span className="text-sm text-muted-foreground">
              {rating.label}
            </span>
          </p>
        </div>

        {/* Full bleed, and focusable: the tabindex is what gives a keyboard
            user the same way to stop the row that hovering gives a mouse.

            `py-2` is load-bearing, not spacing. Card draws its outline with
            `ring-1`, which is an *outset* box-shadow — it sits a pixel outside
            the card's box and takes no layout space. The track is exactly as
            tall as the cards, so without this padding the clip region ends on
            the card edge and shaves the top and bottom of every ring off,
            leaving cards with visible sides and no lid. */}
        <div
          role="region"
          aria-label="Reviews from our Google Business Profile"
          tabIndex={0}
          className="review-viewport mt-14 py-2 [mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 lg:mt-16 lg:[mask-image:linear-gradient(to_right,transparent,black_5rem,black_calc(100%-5rem),transparent)]"
        >
          <ul
            className="review-track"
            style={
              {
                "--review-duration": "64s",
                "--review-copies": COPIES,
              } as React.CSSProperties
            }
          >
            {Array.from({ length: COPIES }, (_, copy) =>
              row.map((review) => (
                <li
                  key={`${review.name}-${copy}`}
                  className={cn(copy > 0 && "review-clone", cardWidth)}
                  aria-hidden={copy > 0 || undefined}
                >
                  <ReviewCard review={review} />
                </li>
              )),
            )}
          </ul>
        </div>

        <div className="mt-14 flex justify-center px-6 lg:mt-16 lg:px-10">
          <Button asChild size="lg" variant="outline">
            <Link href="/about">See customer stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
