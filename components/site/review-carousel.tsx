"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import { GoogleLogo } from "@/components/site/store-icons";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import type { Review } from "@/lib/site";
import { cn } from "@/lib/utils";

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

function ReviewCard({ review, active }: { review: Review; active: boolean }) {
  return (
    <Card
      className={cn(
        // Content height on a phone, where one card shows at a time and
        // stretching a short quote to the longest left a hole in it; level
        // heights from md up, where cards sit side by side.
        "relative isolate gap-0 rounded-2xl p-6 shadow-lg ring-1 shadow-primary/5 ring-primary/10 transition-all duration-500 ease-out md:h-full lg:p-7",
        // The card in the middle of the view is the one being read.
        active && "shadow-xl ring-2 shadow-primary/15 ring-primary/35",
      )}
    >
      {/* The raised card's tint, as its own layer under the content. Put on
          the card itself, the gradient displaces `bg-card` in cn() and the
          card turns see-through. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent transition-opacity duration-500",
          active ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="flex items-center justify-between">
        <span
          className="flex items-center gap-0.5 text-primary"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star key={index} className="size-4 fill-current" aria-hidden />
          ))}
        </span>
        <GoogleLogo className="size-5" />
      </div>

      <blockquote className="mt-5 text-[15px] leading-relaxed text-pretty md:flex-1">
        &ldquo;{review.quote}&rdquo;
      </blockquote>

      <Separator className="my-5 bg-primary/10" />

      <div className="flex items-center gap-3">
        {review.photo ? (
          <Image
            src={review.photo}
            alt=""
            width={88}
            height={88}
            sizes="44px"
            className="size-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
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
  );
}

/**
 * The reviews, three to a view on desktop with the middle one raised.
 *
 * The raised card is whichever sits closest to the centre of the view,
 * measured as the track moves rather than set on arrival, so the emphasis
 * slides across with the cards instead of jumping when they stop. Arrows and
 * dots page a whole view at a time; on a phone it is one card and a swipe.
 */
export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [snaps, setSnaps] = useState(0);
  const [snap, setSnap] = useState(0);
  const [centre, setCentre] = useState(0);
  // Phone only: the track's height follows the card on screen, so a short
  // review does not sit above the gap left by the longest one.
  const [height, setHeight] = useState<number>();

  const measure = useCallback((embla: NonNullable<CarouselApi>) => {
    const root = embla.rootNode().getBoundingClientRect();
    const middle = root.left + root.width / 2;
    let closest = 0;
    let best = Infinity;
    embla.slideNodes().forEach((node, index) => {
      const box = node.getBoundingClientRect();
      const distance = Math.abs(box.left + box.width / 2 - middle);
      if (distance < best) {
        best = distance;
        closest = index;
      }
    });
    setCentre(closest);
    setSnap(embla.selectedScrollSnap());

    const card = embla.slideNodes()[closest]?.querySelector<HTMLElement>(
      "[data-slot=card]",
    );
    const phone = window.matchMedia("(max-width: 767px)").matches;
    // 48px is the track's own `py-6`, which keeps the ring and shadow in.
    setHeight(phone && card ? card.offsetHeight + 48 : undefined);
  }, []);

  useEffect(() => {
    if (!api) return;
    const reInit = () => {
      setSnaps(api.scrollSnapList().length);
      measure(api);
    };
    // First read deferred a frame, like the carousel's own: a synchronous
    // setState in an effect body is a re-render before paint.
    const frame = requestAnimationFrame(reInit);
    api.on("reInit", reInit).on("scroll", measure).on("select", measure);
    return () => {
      cancelAnimationFrame(frame);
      api.off("reInit", reInit).off("scroll", measure).off("select", measure);
    };
  }, [api, measure]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true, align: "start", slidesToScroll: "auto" }}
      aria-label="Reviews from our Google Business Profile"
      className="mx-auto max-w-6xl"
    >
      {/* Vertical padding inside the clipped track, so the raised card's
          ring and shadow are not cut off at the top and bottom. */}
      <CarouselContent
        className={cn(
          "-ml-5 py-6 lg:-ml-6",
          height && "items-start transition-[height] duration-300 ease-out",
        )}
        style={{ height }}
      >
        {reviews.map((review, index) => (
          <CarouselItem
            key={review.name}
            // 8px clear of the track on both sides: the track clips, and a
            // card flush with its edge loses the sides of its ring and shadow.
            className="pr-2 pl-7 md:basis-1/2 lg:basis-1/3 lg:pl-8"
          >
            <ReviewCard review={review} active={index === centre} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        size="icon-lg"
        className="hidden border-0 bg-background shadow-lg shadow-primary/10 lg:-left-16 lg:flex xl:-left-20"
      />
      <CarouselNext
        size="icon-lg"
        className="hidden border-0 bg-background shadow-lg shadow-primary/10 lg:-right-16 lg:flex xl:-right-20"
      />

      <div className="mt-2 flex justify-center gap-2">
        {Array.from({ length: snaps }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Show reviews, page ${index + 1} of ${snaps}`}
            aria-current={index === snap || undefined}
            className={cn(
              "h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              index === snap ? "w-6 bg-primary" : "w-2 bg-primary/25",
            )}
          />
        ))}
      </div>
    </Carousel>
  );
}
