import type { CSSProperties } from "react";
import { Star } from "lucide-react";

import { BicolorHeading } from "@/components/site/bicolor-heading";
import { RevealGroup } from "@/components/site/reveal-group";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  customerStats,
  reviewStats,
  reviews,
  type Review,
} from "@/lib/site";

/**
 * The reviews the cluster shows, by reviewer name, in this order. Chosen by
 * SipLink; the quotes themselves live in lib/site.ts, verbatim from Google.
 */
const FEATURED = [
  "Joseph Karthick",
  "orange Pandi",
  "Azure Billing Solutions",
  "kashyap inabathini",
  "Rohit Yadav",
  "Excellence MBS",
];

/**
 * Where each card sits in the cluster on wide screens, as a share of the
 * stage, with the tint of the glow behind it: a zigzag, each card overlapping
 * its neighbours' edges so they read as a pile rather than a grid. Below `lg`
 * the positions are ignored (the cards are not positioned there).
 */
const SPOTS: { left: string; top: string; glow: string; tint: string }[] = [
  { left: "0%", top: "8%", glow: "bg-primary/35", tint: "from-primary/10" },
  { left: "15.6%", top: "46%", glow: "bg-info/30", tint: "from-info/10" },
  { left: "31.2%", top: "0%", glow: "bg-chart-3/45", tint: "from-chart-3/15" },
  { left: "46.8%", top: "50%", glow: "bg-brand-from/35", tint: "from-brand-from/10" },
  { left: "62.4%", top: "6%", glow: "bg-info/25", tint: "from-info/10" },
  { left: "78%", top: "42%", glow: "bg-chart-3/40", tint: "from-chart-3/15" },
];

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const spot = SPOTS[index % SPOTS.length];

  return (
    <li
      className="reveal-item group/review w-72 shrink-0 snap-center sm:w-auto lg:absolute lg:z-(--card-z) lg:w-64 lg:hover:z-40"
      style={
        {
          left: spot.left,
          top: spot.top,
          "--card-z": 10 + index,
          "--reveal-index": index,
        } as CSSProperties
      }
    >
      {/* Each card drifts on its own rhythm so the cluster never moves in step. */}
      <div
        className="card-float relative"
        style={
          {
            "--float-duration": `${5.5 + (index % 3) * 0.9}s`,
            "--float-delay": `${-index * 1.3}s`,
          } as CSSProperties
        }
      >
        {/* The soft colour pooled above the card. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-6 -top-8 h-28 rounded-full blur-3xl transition-opacity duration-500 group-hover/review:opacity-100 lg:opacity-80",
            spot.glow,
          )}
        />

        <Card
          className={cn(
            "relative gap-0 rounded-3xl bg-gradient-to-b to-card to-60% px-4 pt-6 pb-4 text-center shadow-xl shadow-foreground/5 ring-1 ring-border/70 transition-all duration-500 ease-out group-hover/review:-translate-y-2 group-hover/review:shadow-2xl group-hover/review:shadow-primary/15 group-hover/review:ring-primary/25",
            spot.tint,
          )}
        >
          <figure className="flex flex-col items-center">
            {/* The rating, in a small pill where a photo would sit. */}
            <span
              className="flex items-center gap-0.5 rounded-full bg-background px-3 py-1.5 text-primary shadow-sm ring-1 ring-border"
              aria-label={`${review.rating} out of 5 stars`}
              role="img"
            >
              {Array.from({ length: review.rating }, (_, star) => (
                <Star key={star} className="size-3.5 fill-current" aria-hidden />
              ))}
            </span>

            <figcaption className="mt-3">
              <p className="text-sm font-semibold tracking-tight">{review.name}</p>
              <p className="mt-0.5 text-[0.625rem] font-semibold tracking-widest text-muted-foreground uppercase">
                {review.role ?? "Verified Google review"}
              </p>
            </figcaption>

            {/* The tab joining the person to what they said. */}
            <span aria-hidden className="mt-3 h-3 w-8 bg-card" />

            {/* The quote, clamped at rest and in full on hover. */}
            <blockquote className="w-full rounded-2xl bg-card px-4 py-4 shadow-lg shadow-foreground/5 ring-1 ring-border/50">
              <p className="line-clamp-4 text-xs leading-relaxed text-pretty text-foreground/80 italic group-hover/review:line-clamp-none">
                &ldquo;{review.quote}&rdquo;
              </p>
            </blockquote>
          </figure>
        </Card>
      </div>
    </li>
  );
}

/**
 * Customer stories, on the home page.
 *
 * A centred heading, then the reviews as a loose cluster of floating cards
 * (each opens to the full quote on hover), then the proof bar and the way out
 * to every review on Google. The quotes are verbatim from the Google Business
 * Profile; which ones appear is set by `FEATURED`.
 */
export function CustomerStories() {
  // Renders nothing until real reviews exist. See lib/site.ts.
  if (reviews.length === 0) return null;

  const shown = FEATURED.flatMap((name) =>
    reviews.filter((review) => review.name === name),
  );

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

        <RevealGroup className="mx-auto mt-16 max-w-6xl lg:mt-20">
          {/* Phones swipe through a row, tablets get two columns, and from
              `lg` the cards float as a cluster. */}
          <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pt-8 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:p-0 lg:relative lg:block lg:h-136">
            {shown.map((review, index) => (
              <ReviewCard key={review.name} review={review} index={index} />
            ))}
          </ul>
        </RevealGroup>

        <dl className="mt-16 grid grid-cols-2 gap-8 text-center lg:mt-20 lg:grid-cols-4">
          {[reviewStats[0], ...customerStats, reviewStats[1]].map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="font-heading bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-4xl font-bold text-transparent">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
