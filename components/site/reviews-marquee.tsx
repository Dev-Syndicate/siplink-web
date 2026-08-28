import { Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { reviews, type Review } from "@/lib/site";

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

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="w-80 shrink-0 sm:w-96">
      <CardContent className="flex h-full flex-col gap-4 pt-6">
        <Quote
          className="size-6 rotate-180 fill-primary/20 text-primary/20"
          aria-hidden
        />

        <blockquote className="flex-1 text-sm text-pretty">
          {review.quote}
        </blockquote>

        <footer className="flex items-center gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
            aria-hidden
          >
            {initials(review.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">
              {review.name}
            </span>
            {review.role ? (
              <span className="block truncate text-xs text-muted-foreground">
                {review.role}
              </span>
            ) : null}
          </span>
        </footer>
      </CardContent>
    </Card>
  );
}

function Row({
  items,
  reverse,
  duration,
}: {
  items: Review[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div
      className="marquee -my-2 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      <div
        className={cn(
          "marquee-track flex items-stretch gap-6",
          reverse && "marquee-track-reverse"
        )}
      >
        {/* The list twice: the loop lands on the duplicate, so it never jumps. */}
        {[0, 1].map((pass) => (
          <div key={pass} className="flex gap-6" aria-hidden={pass === 1}>
            {items.map((review) => (
              <ReviewCard key={`${pass}-${review.name}`} review={review} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewsMarquee() {
  // Renders nothing until real reviews exist. See lib/site.ts.
  if (reviews.length === 0) return null;

  // Split into two counter-scrolling rows once there are enough to fill both.
  const split = reviews.length >= 4;
  const half = Math.ceil(reviews.length / 2);
  const rowOne = split ? reviews.slice(0, half) : reviews;
  const rowTwo = split ? reviews.slice(half) : [];

  // Duration scales with row length so the speed stays constant.
  const duration = `${Math.max(rowOne.length, 3) * 9}s`;

  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What our customers say
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Reviews from businesses running on SipLink.
          </p>
        </div>
      </div>

      <div className="mt-14 space-y-6">
        <Row items={rowOne} duration={duration} />
        {rowTwo.length > 0 ? (
          <Row items={rowTwo} duration={duration} reverse />
        ) : null}
      </div>
    </section>
  );
}
