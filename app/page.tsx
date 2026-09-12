import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Quote, ShieldCheck, Star } from "lucide-react";

import { ReviewsMarquee } from "@/components/site/reviews-marquee";
import { AppleLogo, PlayStoreLogo } from "@/components/site/store-icons";
import { VideoEmbed } from "@/components/site/video-embed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  certifications,
  heroProof,
  homePillars,
  industries,
  integrations,
  mobileApps,
  planBaseFeatures,
  plans,
  reviews,
  switchingStory,
} from "@/lib/site";

/**
 * Homepage.
 *
 * The argument, in order: enterprise-grade voice (hero) → which product is
 * yours (pillars) → what actually changes when you switch (migration) → who
 * already trusts it (reviews) → what it costs (pricing) → talk to us (CTA).
 *
 * Section rhythm alternates deliberately — left header, inverted, split,
 * hairline grid — so the page never settles into a scannable-but-unread
 * stack of identical centred blocks.
 */

/** The single review we pull forward as the page's headline proof. */
const featuredReview = reviews[0];

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero. One dominant focal point: the claim, the two CTAs, and
          proof the visitor can verify. Everything below is subordinate.
         --------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 -right-32 size-[680px] rounded-full bg-brand-to/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-16 lg:px-10 lg:pt-24 lg:pb-20">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-center lg:gap-16">
            <div>
              <Badge variant="secondary" className="font-mono tracking-widest">
                <ShieldCheck className="size-3.5" aria-hidden />
                HIPAA COMPLIANT &middot; DoT CERTIFIED
              </Badge>

              <h1 className="font-heading mt-6 text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Enterprise-grade voice.{" "}
                <span className="text-primary">
                  Answered by people who pick up.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-lg text-pretty text-muted-foreground lg:text-xl">
                A cloud phone system for growing businesses — hosted PBX, SIP
                trunking, call centre and unified communications on one secure
                network. Keep your numbers. Lose the hardware.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Book a demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="group">
                  <Link href="/pricing">
                    See pricing
                    <ArrowRight
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </Button>
              </div>

              <p className="mt-5 text-sm text-muted-foreground">
                From{" "}
                <span className="font-medium text-foreground">
                  {plans[0].price}
                </span>{" "}
                per user / month &middot; unlimited US &amp; Canada calling
                &middot; minimum 10 lines
              </p>
            </div>

            <Image
              src="/images/agent-cloud-telephony.png"
              alt="Support agent on a headset with cloud telephony, live chat and call analytics around her"
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="h-auto w-full lg:ml-auto"
            />
          </div>

          {/* Proof strip — hairline grid, the products-page signature. */}
          <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4">
            {heroProof.map(({ value, label }) => (
              <div key={label} className="bg-background p-6">
                <dt className="font-heading text-3xl font-semibold tracking-tight text-primary">
                  {value}
                </dt>
                <dd className="mt-1 text-sm text-pretty text-muted-foreground">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Pillars. Four ways in, labelled by the job the customer is
          hiring us for — not by product name alone.
         --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Where you start
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Four ways onto the network
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Whether you are replacing a PBX, connecting equipment you already
              own, or running a floor of agents — the same platform underneath,
              configured to your situation.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2">
            {homePillars.map(
              ({ eyebrow, title, description, href, icon: Icon }) => (
                <Link
                  key={title}
                  href={href}
                  className="group flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      {eyebrow}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary">
                    Explore {title}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Migration. The real objection is disruption, not features — so
          answer it directly, before anything else is asked for.
         --------------------------------------------------------------- */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Making the move
              </span>
              <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                What actually changes on Monday
              </h2>
              <p className="mt-4 text-pretty text-background/70">
                Switching phone systems sounds like a project. In practice we
                port your numbers, ship the handsets and run both in parallel
                until you are ready.
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="mt-8 border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <Link href="/contact">Plan your migration</Link>
              </Button>
            </div>

            <ul className="space-y-px overflow-hidden rounded-2xl bg-background/10">
              {switchingStory.map(({ before, after, icon: Icon }) => (
                <li
                  key={before}
                  className="grid gap-4 bg-foreground p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6 sm:p-8"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-8">
                    <p className="text-sm text-pretty text-background/50 line-through decoration-background/30">
                      {before}
                    </p>
                    <p className="text-sm text-pretty text-background">
                      {after}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          The support claim, evidenced. The hero promises people who pick
          up; this is where a real customer says it instead of us.
         --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Why customers stay
              </span>
              <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                The part no feature list covers
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Every provider sells the same features. What customers write
                about, over and over, is that someone answers — on WhatsApp, on
                the phone, at any hour, and the problem gets fixed.
              </p>

              <figure className="mt-8 border-l-2 border-primary pl-6">
                <Quote
                  className="size-6 rotate-180 fill-primary/20 text-primary/20"
                  aria-hidden
                />
                <blockquote className="mt-3 text-lg text-pretty">
                  {featuredReview.quote}
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 text-sm">
                  <span
                    className="flex items-center gap-0.5 text-primary"
                    aria-hidden
                  >
                    {Array.from({ length: featuredReview.rating }).map(
                      (_, index) => (
                        <Star key={index} className="size-3.5 fill-current" />
                      ),
                    )}
                  </span>
                  <span className="font-medium">{featuredReview.name}</span>
                  <span className="text-muted-foreground">
                    {featuredReview.rating}/5 on Google
                  </span>
                </figcaption>
              </figure>
            </div>

            <VideoEmbed />
          </div>
        </div>
      </section>

      <ReviewsMarquee />

      {/* ---------------------------------------------------------------
          Industries. Relevance check — "is this built for a business
          like mine?" — kept compact, since the depth lives one click in.
         --------------------------------------------------------------- */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Who we serve
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Configured for how your sector works
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              A billing desk and a recruiting team need very different things
              from a phone system. Pick yours to see what changes.
            </p>
          </div>

          {/* Not links: there is no /industries/[slug] route yet, so the
              section CTA below carries the navigation instead of sending
              each card to a 404. */}
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(({ title, description, icon: Icon, badge }) => (
              <div
                key={title}
                className="flex flex-col gap-3 bg-background p-6"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>

                <h3 className="font-heading flex flex-wrap items-center gap-2 text-base font-semibold tracking-tight">
                  {title}
                  {badge ? (
                    <Badge
                      variant="secondary"
                      className="font-mono text-[10px] tracking-wider"
                    >
                      {badge}
                    </Badge>
                  ) : null}
                </h3>

                <p className="text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/industries">View all industries</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Pricing. Transparent numbers early builds trust; the full
          comparison stays on /pricing where it belongs.
         --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Pricing
              </span>
              <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Simple per-user pricing
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Three plans, every one with unlimited calling across the US and
                Canada, a free local number and an IP-phone lease. Minimum 10
                lines.
              </p>
            </div>

            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">Compare all plans</Link>
            </Button>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-3">
            {plans.map((plan) => {
              // Each tier's own additions first, then the shared essentials.
              const features = [...plan.adds, ...planBaseFeatures].slice(0, 6);

              return (
                <div
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col p-8",
                    plan.featured
                      ? "bg-primary text-primary-foreground"
                      : "bg-background",
                  )}
                >
                  {plan.featured ? (
                    <span className="font-mono text-[10px] tracking-widest uppercase opacity-80">
                      Most popular
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      &nbsp;
                    </span>
                  )}

                  <h3 className="font-heading mt-3 text-xl font-semibold tracking-tight">
                    {plan.name}
                  </h3>

                  <p className="mt-4 flex items-end gap-1.5">
                    <span className="font-heading text-4xl font-semibold tracking-tight">
                      {plan.price}
                    </span>
                    <span
                      className={cn(
                        "pb-1 text-sm",
                        plan.featured
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground",
                      )}
                    >
                      / user / month
                    </span>
                  </p>

                  <p
                    className={cn(
                      "mt-3 text-sm text-pretty",
                      plan.featured
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground",
                    )}
                  >
                    {plan.blurb}
                  </p>

                  <ul className="mt-8 flex-1 space-y-2.5">
                    {features.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-sm">
                        <Check
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            plan.featured
                              ? "text-primary-foreground"
                              : "text-primary",
                          )}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            "text-pretty",
                            plan.featured
                              ? "text-primary-foreground/90"
                              : "text-muted-foreground",
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={plan.featured ? "secondary" : "outline"}
                    className={cn(
                      "mt-8 w-full",
                      plan.featured &&
                        "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
                    )}
                  >
                    <Link href="/pricing">
                      View {plan.name} details
                      <span className="sr-only"> and full feature list</span>
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Integrations + apps. Two practical "does it fit my stack?"
          answers, side by side rather than as two more full sections.
         --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
          <div>
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Integrations
            </span>
            <h2 className="font-heading mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Works with the tools you already run
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Calls, contacts and records stay where your team already works.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {integrations.map((name) => (
                <li
                  key={name}
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-border lg:pl-16">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Mobile &amp; desktop
            </span>
            <h2 className="font-heading mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Take your extension anywhere
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              The SipLink UC app puts your business line on your phone and
              desktop — calls, video, messaging and voicemail, wherever you are.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="outline" size="lg">
                <a
                  href={mobileApps.ios}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <AppleLogo className="size-5" />
                  Download for iOS
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href={mobileApps.android}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <PlayStoreLogo className="size-5" />
                  Download for Android
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Closing CTA, with the compliance credentials folded in — the
          last reassurance sits next to the last ask.
         --------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-from/10 to-brand-to/5 px-8 py-16 text-center lg:px-16">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Ready to move your business to the cloud?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            See SipLink running on your own workflows. Our team will plan the
            migration and port your existing numbers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-3 border-t border-border pt-8">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-4 py-2 font-mono text-[11px] tracking-wider"
              >
                <ShieldCheck className="size-3.5 text-primary" aria-hidden />
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
