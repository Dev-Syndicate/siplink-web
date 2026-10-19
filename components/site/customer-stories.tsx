import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Headphones,
  MessageSquareMore,
  Phone,
  Star,
  type LucideIcon,
} from "lucide-react";

import { ReviewCarousel } from "@/components/site/review-carousel";
import { GoogleLogo } from "@/components/site/store-icons";
import { Button } from "@/components/ui/button";
import { googleReviewsUrl, reviewStats, reviews } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * How many reviews the carousel carries: three pages of three on desktop.
 * The list in lib/site.ts runs longest and most specific first and tails off
 * into one-line ratings, which read as padding on a card this size.
 */
const SHOWN = 9;

/**
 * The faces framing the heading. Decorative: they stand for the people on
 * the other end of a call, not for any reviewer, which is why no review card
 * ever borrows one — a real person's endorsement only ever carries their own
 * photo or their initials.
 */
const PEOPLE: {
  src: string;
  className: string;
  tilt: string;
  icon: LucideIcon;
  iconClassName: string;
  float: string;
}[] = [
  {
    src: "/images/people/person-daniel.webp",
    className: "top-20 left-[11%]",
    tilt: "-rotate-6",
    icon: Phone,
    iconClassName: "-top-3 -left-10",
    float: "6s",
  },
  {
    src: "/images/people/person-emma.webp",
    className: "top-64 left-[1%]",
    tilt: "rotate-6",
    icon: MessageSquareMore,
    iconClassName: "-right-6 bottom-6",
    float: "7s",
  },
  {
    src: "/images/people/person-sofia.webp",
    className: "top-24 right-[10%]",
    tilt: "rotate-6",
    icon: Headphones,
    iconClassName: "-top-2 -right-12",
    float: "6.5s",
  },
  {
    src: "/images/people/person-marcus.webp",
    className: "top-[17rem] right-[1%]",
    tilt: "-rotate-3",
    icon: BarChart3,
    iconClassName: "-right-5 bottom-4",
    float: "7.5s",
  },
];

/** Stars filled to the exact rating, so 4.5 shows four and a half. */
function RatingStars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.min(Math.max(value - index, 0), 1);

        return (
          <span key={index} className="relative size-5">
            <Star className="absolute inset-0 size-5 fill-current text-primary/20" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="size-5 fill-current text-primary" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * Customer stories.
 *
 * A centred heading framed by faces, the Google average, then the reviews as
 * a carousel with the middle card raised, and the way out to every review on
 * Google. The quotes are verbatim from the Google Business Profile.
 */
export function CustomerStories() {
  // Renders nothing until real reviews exist. See lib/site.ts.
  if (reviews.length === 0) return null;

  const row = reviews.slice(0, SHOWN);

  const rating = reviewStats[0];
  const average = Number.parseFloat(rating.value);

  return (
    <section className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background via-primary/5 to-primary/10">
      {/* The broad arc the cards sit on. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[58%] left-1/2 h-[120%] w-[160%] -translate-x-1/2 rounded-[100%] bg-gradient-to-b from-primary/10 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:pt-32 lg:pb-28">
        {/* Only where there is room beside the heading for them. */}
        <div aria-hidden className="pointer-events-none hidden xl:block">
          {PEOPLE.map(
            ({ src, className, tilt, icon: Icon, iconClassName, float }) => (
              <div
                key={src}
                className={cn("card-float absolute", className)}
                style={{ "--float-duration": float } as React.CSSProperties}
              >
                <div
                  className={cn(
                    "relative rounded-3xl bg-gradient-to-br from-primary/25 to-primary/5 shadow-xl shadow-primary/15",
                    tilt,
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    width={224}
                    height={224}
                    sizes="112px"
                    className="size-28 rounded-3xl object-cover"
                  />
                  <span
                    className={cn(
                      "absolute flex size-10 items-center justify-center rounded-full bg-background text-primary shadow-lg shadow-primary/15",
                      iconClassName,
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Customer stories
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Trusted by businesses that keep conversations moving.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground">
            Real businesses. Real conversations. Here&rsquo;s what our
            customers say about their experience with SipLink.
          </p>

          <p className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-background px-5 py-3 shadow-lg shadow-primary/10">
            <GoogleLogo className="size-7" />
            <span aria-hidden className="h-8 w-px bg-border" />
            <span className="font-heading text-2xl font-semibold">
              {rating.value}
            </span>
            <RatingStars value={average} />
            <span className="sr-only">out of 5,</span>
            <span className="max-w-[6.5rem] text-left text-xs leading-tight text-muted-foreground">
              {rating.label}
            </span>
          </p>
        </div>

        <div className="relative mt-10 lg:mt-12">
          <ReviewCarousel reviews={row} />
        </div>

        <div className="relative mt-10 flex justify-center">
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
