import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Quote, Star } from "lucide-react";

import { BicolorHeading } from "@/components/site/bicolor-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import {
  customerStats,
  googleReviewsUrl,
  reviewStats,
  reviews,
  type Review,
} from "@/lib/site";

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const initials = review.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    // A light running round the border (the pricing cards' glow border),
    // staggered so neighbours never run in step.
    <div
      style={{ "--glow-delay": `${-index * 3}s` } as CSSProperties}
      className="pricing-glow-border w-80 shrink-0 rounded-2xl p-0.5 shadow-md shadow-primary/5 sm:w-96"
    >
      <Card className="h-full gap-0 rounded-[calc(1rem-2px)] border-0 py-0 ring-0">
        <div className="relative flex h-full flex-col p-6">
          <Quote
            aria-hidden
            className="absolute top-5 right-5 size-8 fill-primary/10 text-primary/15"
          />

          <span
            className="flex items-center gap-1 text-primary"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {Array.from({ length: review.rating }, (_, index) => (
              <Star key={index} className="size-4 fill-current" aria-hidden />
            ))}
          </span>

          <blockquote className="mt-4 line-clamp-5 flex-1 text-sm leading-relaxed text-pretty text-foreground/80">
            &ldquo;{review.quote}&rdquo;
          </blockquote>

          <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
            {review.photo ? (
              <Image
                src={review.photo}
                alt=""
                width={80}
                height={80}
                sizes="40px"
                className="size-10 shrink-0 rounded-full bg-background object-cover"
              />
            ) : (
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-xs font-semibold text-primary-foreground"
              >
                {initials}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate font-semibold">{review.name}</p>
              <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                <BadgeCheck className="size-3.5 text-primary" aria-hidden />
                {review.role ?? "Verified Google review"}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

/**
 * Customer stories, on the home page.
 *
 * A centred heading, the reviews in two endless rows scrolling opposite ways
 * (paused on hover), then the proof bar and the way out to every review on
 * Google. The quotes are verbatim from the Google Business Profile.
 */
export function CustomerGlobe() {
  // Renders nothing until real reviews exist. See lib/site.ts.
  if (reviews.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-t border-border bg-muted/30">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-32 size-[32rem] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-24 size-[28rem] rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Badge
            variant="outline"
            className="h-8 gap-1.5 rounded-full bg-background px-4 text-sm text-primary"
          >
            <Star className="fill-current" aria-hidden />
            Customer Stories
          </Badge>
          <BicolorHeading
            as="h2"
            lead="Trusted by Businesses"
            accent="That Depend on Every Call"
            className="font-heading mt-6 text-4xl font-semibold tracking-tight sm:text-6xl"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
            Don&rsquo;t just take our word for it. Here&rsquo;s what teams
            running their calls on SipLink say about the service and the support
            behind it.
          </p>
        </div>

        {/* Full-bleed rows that fade out at both edges. */}
        <div className="mt-12 flex flex-col gap-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] lg:mt-14">
          {[0, 1].map((row) => (
            <Marquee
              key={row}
              pauseOnHover
              reverse={row === 1}
              repeat={2}
              className="py-4 [--duration:60s] [--gap:1.5rem]"
            >
              {reviews
                .filter((_, index) => index % 2 === row)
                .map((review, index) => (
                  <ReviewCard
                    key={review.name}
                    review={review}
                    index={index + row}
                  />
                ))}
            </Marquee>
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <dl className="mt-16 grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {[reviewStats[0], ...customerStats, reviewStats[1]].map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-2">
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="font-heading bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-4xl font-bold text-transparent">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex justify-center">
            <Button asChild size="lg" className="group">
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                See all customer stories
                <ArrowRight
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
