import Link from "next/link";
import { Quote, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { reviewStats, reviews, type Review } from "@/lib/site";

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

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span
      className={cn("flex items-center gap-0.5 text-primary", className)}
      aria-hidden
    >
      {Array.from({ length: rating }).map((_, index) => (
        <Star key={index} className="size-3.5 fill-current" />
      ))}
    </span>
  );
}

/** Avatar + name, shared by the featured quote and the grid cards. */
function Author({ review, large }: { review: Review; large?: boolean }) {
  return (
    <footer className="flex items-center gap-3">
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary",
          large ? "size-12 text-sm" : "size-9 text-xs",
        )}
        aria-hidden
      >
        {initials(review.name)}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block truncate font-medium",
            large ? "text-base" : "text-sm",
          )}
        >
          {review.name}
        </span>
        {review.role ? (
          <span className="block truncate text-xs text-muted-foreground">
            {review.role}
          </span>
        ) : (
          <span className="block truncate text-xs text-muted-foreground">
            Verified Google review
          </span>
        )}
      </span>
    </footer>
  );
}

/**
 * Customer stories.
 *
 * One review carries the section as a tall featured quote; four more sit in a
 * grid beside it, with the standing proof points on a bar underneath. Static
 * rather than a marquee — these are meant to be read, not watched.
 */
export function CustomerStories() {
  // Renders nothing until real reviews exist. See lib/site.ts.
  if (reviews.length === 0) return null;

  // `reviews[0]` already carries the "why customers stay" section further up
  // the page, so start here at the next one rather than quoting it twice.
  const pool = reviews.length > 5 ? reviews.slice(1) : reviews;
  const [featured, ...rest] = pool;
  const grid = rest.slice(0, 4);

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Customer stories
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Trusted by businesses that keep{" "}
            <span className="text-primary">conversations moving.</span>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Real experiences from teams using SipLink every day.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-stretch">
          {/* Featured — the longest, most specific review gets the space. */}
          <Card className="bg-background">
            <CardContent className="flex h-full flex-col gap-6 p-8">
              <div className="flex items-start justify-between gap-4">
                <Quote
                  className="size-9 rotate-180 fill-primary/20 text-primary/20"
                  aria-hidden
                />
                <div className="text-right">
                  <Stars rating={featured.rating} className="justify-end" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {featured.rating.toFixed(1)} out of 5
                  </p>
                </div>
              </div>

              <blockquote className="flex-1 text-lg text-pretty">
                {featured.quote}
              </blockquote>

              <Author review={featured} large />
            </CardContent>
          </Card>

          {/* Four supporting reviews, two across. */}
          <div className="grid gap-6 sm:grid-cols-2">
            {grid.map((review) => (
              <Card key={review.name} className="bg-background">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <Quote
                      className="size-6 rotate-180 fill-primary/20 text-primary/20"
                      aria-hidden
                    />
                    <Stars rating={review.rating} />
                  </div>

                  <blockquote className="flex-1 text-sm text-pretty">
                    {review.quote}
                  </blockquote>

                  <Author review={review} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Standing proof points, and the way through to the rest. */}
        <div className="mt-6 grid gap-6 rounded-2xl border border-border bg-background p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:p-8">
          <dl className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {reviewStats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <dt className="font-heading text-lg font-semibold tracking-tight">
                    {value}
                  </dt>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              </div>
            ))}
          </dl>

          <Button asChild size="lg" className="w-full lg:w-auto">
            <Link href="/about">See customer stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
