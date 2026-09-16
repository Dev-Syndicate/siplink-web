import Link from "next/link";
import { Quote, Star } from "lucide-react";

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

/** Initials stand in for a photo — we have no reviewer images. */
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
    <span className="flex items-center gap-0.5 text-primary" aria-hidden>
      {Array.from({ length: rating }).map((_, index) => (
        <Star key={index} className="size-4 fill-current" />
      ))}
    </span>
  );
}

function Author({ review }: { review: Review }) {
  return (
    <footer className="flex items-center gap-4">
      <span
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
        aria-hidden
      >
        {initials(review.name)}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-medium">{review.name}</span>
        <span className="block truncate text-sm text-muted-foreground">
          {review.role ?? "Verified Google review"}
        </span>
      </span>
    </footer>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="h-full bg-card">
      {/* Padding climbs with the card so the quote keeps a readable measure at
          every width instead of the card simply getting emptier. */}
      <CardContent className="flex h-full flex-col gap-6 p-6 sm:p-8 lg:gap-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <Quote
            className="size-8 rotate-180 fill-primary/20 text-primary/20"
            aria-hidden
          />
          <Stars rating={review.rating} />
        </div>

        <blockquote className="flex-1 text-base leading-relaxed text-pretty sm:text-lg lg:text-xl">
          {review.quote}
        </blockquote>

        <Author review={review} />
      </CardContent>
    </Card>
  );
}

/**
 * Customer stories.
 *
 * One row of large reviews drifting across the full width of the page. At
 * roughly two cards a screen a review is read rather than scanned, which is
 * the whole point of quoting people at length — so the scale of a single card
 * is the only loud thing here, and everything around it stays quiet.
 *
 * The cards are rendered twice. The second set is what makes the loop
 * seamless, and it is hidden from assistive tech: a screen reader that read
 * the same five reviews through twice would be narrating a rendering trick.
 */
export function CustomerStories() {
  // Renders nothing until real reviews exist. See lib/site.ts.
  if (reviews.length === 0) return null;

  // `reviews[0]` already carries the "why customers stay" section further up
  // the page, so start at the next one rather than quoting it twice.
  const pool = reviews.length > SHOWN ? reviews.slice(1) : reviews;
  const row = pool.slice(0, SHOWN);

  const rating = reviewStats[0];

  // Width and font both climb, so the quote holds a sane line length rather
  // than stretching to 90 characters on a wide monitor. The 50rem cap is what
  // stops that happening past about 1700px.
  const cardWidth = "w-[88vw] shrink-0 sm:w-[clamp(24rem,52vw,50rem)]";

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="py-20 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8 px-6 lg:px-10">
          <div className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Customer stories
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Trusted by businesses that keep conversations moving
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Each of these is published on our Google Business Profile, with
              the wording unchanged.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* One star, not five: the average is 4.5, and a row of five full
                stars beside that number would be claiming half a point we do
                not have. The cards carry their own real ratings. */}
            <div className="flex items-center gap-3">
              <Star
                className="size-6 shrink-0 fill-current text-primary"
                aria-hidden
              />
              <div>
                <p className="font-heading text-2xl font-semibold tracking-tight">
                  {rating.value}
                </p>
                <p className="text-xs text-muted-foreground">{rating.label}</p>
              </div>
            </div>

            <Button asChild size="lg" variant="outline">
              <Link href="/about">See customer stories</Link>
            </Button>
          </div>
        </div>

        {/* Full bleed, and focusable: the tabindex is what gives a keyboard
            user the same way to stop the row that hovering gives a mouse. */}
        <div
          role="region"
          aria-label="Reviews from our Google Business Profile"
          tabIndex={0}
          className="review-viewport mt-14 [mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 lg:mt-16 lg:[mask-image:linear-gradient(to_right,transparent,black_5rem,black_calc(100%-5rem),transparent)]"
        >
          <ul
            className="review-track"
            style={{ "--review-duration": "110s" } as React.CSSProperties}
          >
            {row.map((review) => (
              <li key={review.name} className={cardWidth}>
                <ReviewCard review={review} />
              </li>
            ))}

            {row.map((review) => (
              <li
                key={`${review.name}-repeat`}
                className={cn("review-clone", cardWidth)}
                aria-hidden
              >
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
