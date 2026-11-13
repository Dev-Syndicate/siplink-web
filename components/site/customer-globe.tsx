import { ArrowRight, Star } from "lucide-react";

import { BicolorHeading } from "@/components/site/bicolor-heading";
import { ReviewGlobe } from "@/components/site/review-globe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { customerStats, googleReviewsUrl, reviewStats, reviews } from "@/lib/site";

/**
 * Customer stories, on the home page.
 *
 * A centred heading, the reviews as pins on a turning globe that open on
 * hover, then the proof bar and the way out to every review on Google. The
 * quotes are verbatim from the Google Business Profile.
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
            running their calls on SipLink say about the service and the
            support behind it.
          </p>
        </div>

        <div className="mt-12 lg:mt-14">
          <ReviewGlobe reviews={reviews} />
        </div>

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
