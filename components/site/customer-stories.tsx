import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

import { BicolorHeading } from "@/components/site/bicolor-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { googleReviewsUrl, reviewStats, reviews } from "@/lib/site";

/**
 * How many reviews the grid carries: two rows of three on desktop. The list
 * in lib/site.ts runs longest and most specific first and tails off into
 * one-line ratings, which read as padding on a card this size.
 */
const SHOWN = 6;

/** Two letters for a reviewer with no photo of their own. */
function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * Customer stories.
 *
 * A centred heading, the reviews as a grid of cards, then the proof bar and
 * the way out to every review on Google. The quotes are verbatim from the
 * Google Business Profile.
 */
export function CustomerStories() {
  // Renders nothing until real reviews exist. See lib/site.ts.
  if (reviews.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-t border-border bg-muted/30">
      {/* Soft glows behind the heading and the lower cards. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-32 size-[32rem] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-24 size-[28rem] rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="h-8 gap-1.5 rounded-full bg-background px-4 text-sm text-primary"
          >
            <Star className="fill-current" aria-hidden />
            Customer Stories
          </Badge>
          <BicolorHeading
            as="h2"
            lead="Real stories from"
            accent="real businesses"
            className="font-heading mt-6 text-4xl font-semibold tracking-tight sm:text-6xl"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
            Don&rsquo;t just take our word for it. Here&rsquo;s what teams
            running their calls on SipLink say about the service and the
            support behind it.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {reviews.slice(0, SHOWN).map((review) => (
            <Card
              key={review.name}
              className="gap-0 rounded-2xl p-8 shadow-lg shadow-primary/5 transition-shadow hover:shadow-xl hover:shadow-primary/10"
            >
              <span
                className="flex items-center gap-1.5 text-primary"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: review.rating }, (_, index) => (
                  <Star key={index} className="size-4 fill-current" aria-hidden />
                ))}
              </span>

              <blockquote className="mt-6 flex-1 leading-relaxed text-pretty text-muted-foreground">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-3">
                {review.photo ? (
                  <Image
                    src={review.photo}
                    alt=""
                    width={96}
                    height={96}
                    sizes="48px"
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                  >
                    {initials(review.name)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold">{review.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {review.role ?? "Verified Google review"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {reviewStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="font-heading text-4xl font-bold text-primary">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 flex justify-center">
          <Button asChild size="lg" className="group">
            <a href={googleReviewsUrl} target="_blank" rel="noreferrer noopener">
              See all customer stories
              <ArrowRight
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
