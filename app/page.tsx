import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Quote,
  ShieldCheck,
  Star,
} from "lucide-react";

import { HeroNotch } from "@/components/site/hero-notch";
import { ProductIllustration } from "@/components/site/product-illustration";
import { SolutionIllustration } from "@/components/site/solution-illustration";
import { AppleLogo, PlayStoreLogo } from "@/components/site/store-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  homeFaqs,
  homeImages,
  homeProof,
  homeServices,
  reviewSummary,
  type HomeService,
} from "@/lib/home";
import {
  industries,
  mobileApps,
  planNote,
  plans,
  reviews,
  site,
  social,
  switchingStory,
} from "@/lib/site";
import { migrationProcess } from "@/lib/solutions";
import { cn } from "@/lib/utils";

const title = "SipLink — Cloud Phone Systems for Growing Businesses";
const description = `Hosted PBX, SIP trunking, call centre and unified communications on one network. Keep your numbers, lose the hardware, and get 24/7 support from people who answer. From ${plans[0].price} per user per month.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  // A page-level openGraph replaces the layout's rather than merging with
  // it, so the shared fields are restated here.
  openGraph: {
    type: "website",
    siteName: site.legalName,
    locale: "en_IN",
    title,
    description,
    url: "/",
  },
};

/**
 * Homepage.
 *
 * The argument, in order: what we do and why it's safe to switch (hero) →
 * the problem we remove (why switch) → the four ways in (services) → what
 * the move looks like (process) → who it's built for (industries) → who
 * already relies on it (reviews) → what it costs (pricing) → the remaining
 * objections (FAQ) → one clear ask (CTA).
 *
 * Framed dark panels open and close the page; everything between sits on
 * the warm page ground, so the eye moves in one continuous column.
 */

/** Entrance for above-the-fold content. Skipped for reduced motion. */
const enter =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:fill-mode-both";

const container = "mx-auto max-w-7xl px-6 lg:px-10";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      logo: `${site.url}/siplink-logo.webp`,
      email: site.email,
      telephone: site.phoneInternational,
      foundingDate: "2012",
      sameAs: social
        .filter((profile) => profile.label !== "WhatsApp")
        .map((profile) => profile.href),
    },
    {
      "@type": "FAQPage",
      mainEntity: homeFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

/* ------------------------------------------------------------ primitives */

function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-medium tracking-widest text-primary uppercase",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/** The round arrow that rides inside primary pill buttons. */
function ArrowChip() {
  return (
    <span
      aria-hidden
      className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform group-hover/button:translate-x-0.5"
    >
      <ArrowUpRight className="size-4" />
    </span>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span aria-hidden className="flex items-center gap-0.5 text-primary">
      {Array.from({ length: count }, (_, index) => (
        <Star key={index} className="size-3.5 fill-current" />
      ))}
    </span>
  );
}

/**
 * Bento tile. The whole tile is the link; the cut-out label in the corner
 * carries the name, so the visual above it can be photo or diagram.
 */
function ServiceTile({
  service,
  className,
  children,
}: {
  service: HomeService;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={service.href}
      className={cn(
        "group relative isolate flex min-h-88 overflow-hidden rounded-4xl bg-card ring-1 ring-border transition-shadow duration-300 outline-none hover:shadow-xl hover:shadow-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      {children}

      <div className="notch w-5/6 max-w-sm p-5 pt-6 pr-6">
        <p className="text-xs font-medium tracking-widest text-primary uppercase">
          {service.eyebrow}
        </p>
        <h3 className="mt-2 flex items-center justify-between gap-3 text-xl font-semibold tracking-tight">
          {service.title}
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-45"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </h3>
        <p className="mt-2 text-sm text-pretty text-muted-foreground">
          {service.description}
        </p>
      </div>
    </Link>
  );
}

/** Diagram area for an illustrated tile, clear of the corner label. */
function TileDiagram({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full justify-center p-6 pb-48 sm:px-10">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function Home() {
  const [featured, ...otherReviews] = reviews;
  const supporting = otherReviews.slice(1, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ---------------------------------------------------------------
          Hero. A framed panel the floating header sits inside. It pulls up
          under the header (cancelling the layout's top padding) so the
          photograph runs behind the navigation, as in the design.
         --------------------------------------------------------------- */}
      <section className="-mt-20 px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative isolate overflow-hidden rounded-4xl bg-ink text-ink-foreground">
          <HeroNotch />

          {/* The photo only earns its place from lg up, where the panel is
              wide enough for the image's own empty left half to sit behind
              the headline. Below that the aspect ratios fight: a 16:9 frame
              cropped into a tall column zooms so far into the agent that he
              reads as texture, so small screens get the panel alone. */}
          <div className="absolute inset-0 -z-10 hidden lg:block">
            <Image
              src={homeImages.office}
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover object-center motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-110 motion-safe:duration-1000 motion-safe:fill-mode-both"
            />
          </div>

          {/* Carries the panel on small screens, and shades the photo on
              large ones so the headline keeps its contrast. */}
          <div
            aria-hidden
            className="bg-aurora absolute inset-0 -z-10 lg:bg-linear-to-r lg:from-ink lg:from-30% lg:via-ink/60 lg:via-55% lg:to-transparent"
          />

          <div
            className={cn(
              container,
              "relative flex min-h-176 flex-col pt-32 pb-6 sm:pt-36 sm:pb-8 lg:pt-44",
            )}
          >
            <div className="max-w-3xl">
              <p
                className={cn(
                  enter,
                  "inline-flex items-center gap-2 rounded-full border border-ink-foreground/15 bg-ink-foreground/5 px-3.5 py-1.5 text-xs font-medium text-ink-foreground/80 backdrop-blur",
                )}
              >
                <ShieldCheck className="size-3.5 text-brand-from" aria-hidden />
                HIPAA-compliant cloud telephony
              </p>

              <h1
                className={cn(
                  enter,
                  "mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance motion-safe:delay-100 sm:text-5xl lg:text-6xl",
                )}
              >
                Move your phones to the cloud.{" "}
                <span className="text-brand-from">
                  Keep the numbers your customers know.
                </span>
              </h1>

              <p
                className={cn(
                  enter,
                  "mt-6 max-w-xl text-lg text-pretty text-ink-foreground/75 motion-safe:delay-200",
                )}
              >
                SipLink runs hosted PBX, SIP trunking, call centre and unified
                communications for growing businesses — ported, configured and
                supported by a team that answers around the clock.
              </p>

              <div
                className={cn(
                  enter,
                  "mt-10 flex flex-wrap items-center gap-3 motion-safe:delay-300",
                )}
              >
                <Button asChild size="lg" className="rounded-full pr-2 pl-6">
                  <Link href="/contact">
                    Book a demo
                    <ArrowChip />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-ink-foreground/25 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground dark:bg-transparent"
                >
                  <Link href="/pricing">See pricing</Link>
                </Button>
              </div>

              <p
                className={cn(
                  enter,
                  "mt-5 text-sm text-ink-foreground/60 motion-safe:delay-300",
                )}
              >
                From{" "}
                <span className="font-medium text-ink-foreground">
                  {plans[0].price}
                </span>{" "}
                per user / month &middot; 10-line minimum
              </p>
            </div>

            <div className="min-h-16 flex-1" />

            <dl
              className={cn(
                enter,
                "grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink-foreground/10 ring-1 ring-ink-foreground/10 motion-safe:delay-500 lg:grid-cols-4",
              )}
            >
              {homeProof.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col-reverse justify-end gap-1 bg-ink/70 p-5 backdrop-blur-md sm:p-6"
                >
                  <dt className="text-xs text-pretty text-ink-foreground/65 sm:text-sm">
                    {label}
                  </dt>
                  <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Why switch. The design's "Our Story" block: argument on the left,
          organically framed photograph on the right.
         --------------------------------------------------------------- */}
      <section className={cn(container, "py-24 lg:py-32")}>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <Eyebrow>Why teams switch</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              A phone system should be the last thing on your mind.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              For most businesses it is the first thing to cause trouble.
              SipLink takes the whole system off your hands — we host it,
              maintain it and bring your numbers across.
            </p>

            <ul className="mt-10 divide-y divide-border border-y border-border">
              {switchingStory.map(({ before, after, icon: Icon }) => (
                <li key={before} className="flex gap-4 py-4">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground line-through decoration-muted-foreground/40">
                      <span className="sr-only">Before: </span>
                      {before}
                    </p>
                    <p className="mt-1 font-medium text-pretty">
                      <span className="sr-only">With SipLink: </span>
                      {after}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal relative pb-12 lg:pb-0">
            <div className="shape-organic relative aspect-4/3 overflow-hidden bg-muted">
              <Image
                src={homeImages.mobile}
                alt="Hands using the SipLink app on a smartphone"
                fill
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute right-4 bottom-0 left-4 rounded-3xl bg-card p-5 shadow-xl ring-1 ring-border sm:right-auto sm:w-80 lg:-bottom-10 lg:-left-8">
              <p className="font-semibold">Your extension, in your pocket</p>
              <p className="mt-1 text-sm text-pretty text-muted-foreground">
                The SipLink UC app brings calls, video, messaging and voicemail
                to iOS and Android.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href={mobileApps.ios} target="_blank" rel="noreferrer noopener">
                    <AppleLogo className="size-4" />
                    App Store
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a
                    href={mobileApps.android}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <PlayStoreLogo className="size-4" />
                    Google Play
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Services. The design's bento of image tiles with cut-out labels.
          One photograph anchors it; the rest are diagrams of what each
          service actually does, drawn from theme tokens.
         --------------------------------------------------------------- */}
      <section className={cn(container, "pb-24 lg:pb-32")}>
        <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>What we run for you</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Four ways onto one network.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-pretty text-muted-foreground">
              Replacing a PBX, keeping the one you own or running a floor of
              agents — the same platform underneath, configured to your
              situation.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Browse every product
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="reveal mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          <ServiceTile
            service={homeServices.hostedPbx}
            className="min-h-120 md:row-span-2 lg:col-span-4"
          >
            <Image
              src={homeImages.studio}
              alt=""
              fill
              sizes="(min-width: 1024px) 26rem, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </ServiceTile>

          <ServiceTile service={homeServices.sipTrunking} className="lg:col-span-4">
            <TileDiagram>
              <ProductIllustration category="business-voice" className="max-w-sm" />
            </TileDiagram>
          </ServiceTile>

          <ServiceTile service={homeServices.callCentre} className="lg:col-span-4">
            <TileDiagram>
              <ProductIllustration category="contact-center" className="max-w-sm" />
            </TileDiagram>
          </ServiceTile>

          <ServiceTile
            service={homeServices.unified}
            className="md:col-span-2 lg:col-span-8"
          >
            <div className="flex w-full justify-center p-6 pb-48 lg:items-center lg:justify-end lg:p-10">
              <SolutionIllustration
                shape="converge"
                className="max-w-sm lg:max-w-xs"
              />
            </div>
          </ServiceTile>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          How switching works. The real buying objection is disruption, so
          show the method. Numbered because the order genuinely matters.
         --------------------------------------------------------------- */}
      <section className="border-y border-border bg-muted/50">
        <div className={cn(container, "py-24 lg:py-32")}>
          <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>How switching works</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                From your current system to SipLink, one planned step at a
                time.
              </h2>
            </div>
            <p className="text-pretty text-muted-foreground lg:col-span-5">
              Every move follows the same method, and nothing carries live
              calls until it has been built and tested.
            </p>
          </div>

          <ol className="reveal mt-14 grid gap-px overflow-hidden rounded-4xl bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-3">
            {migrationProcess.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3 bg-card p-8">
                <span aria-hidden className="font-mono text-sm text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-pretty text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="reveal mt-10">
            <Button asChild size="lg" className="rounded-full pr-2 pl-6">
              <Link href="/contact">
                Plan your migration
                <ArrowChip />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Industries. The relevance check. Not links: the per-industry
          pages do not exist yet, so the one button carries navigation.
         --------------------------------------------------------------- */}
      <section className={cn(container, "py-24 lg:py-32")}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <Eyebrow>Who we serve</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Built for teams that live on the phone.
            </h2>
            <p className="mt-6 text-pretty text-muted-foreground">
              A billing desk and a recruiting team need very different things
              from a phone system. We configure SipLink around the way your
              sector works.
            </p>
            <Button asChild size="lg" variant="outline" className="mt-8 rounded-full">
              <Link href="/industries">Explore industries</Link>
            </Button>
          </div>

          <ul className="reveal divide-y divide-border border-y border-border lg:col-span-7">
            {industries.map(({ title, description, icon: Icon, badge }) => (
              <li key={title} className="flex gap-5 py-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="flex flex-wrap items-center gap-2 font-semibold tracking-tight">
                    {title}
                    {badge ? <Badge variant="secondary">{badge}</Badge> : null}
                  </h3>
                  <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Reviews. Verbatim Google reviews — the support claim, made by
          customers instead of by us.
         --------------------------------------------------------------- */}
      {featured ? (
        <section className={cn(container, "pb-24 lg:pb-32")}>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>In their words</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Customers rarely write about features. They write about who
                answers.
              </h2>
            </div>
            {reviewSummary.average ? (
              <p className="flex items-center gap-2 text-sm">
                <Stars count={5} />
                <span className="font-semibold">{reviewSummary.average}</span>
                <span className="text-muted-foreground">
                  from {reviewSummary.count} Google reviews
                </span>
              </p>
            ) : null}
          </div>

          <div className="reveal mt-14 grid gap-4 lg:grid-cols-12">
            <figure className="flex flex-col justify-between gap-10 rounded-4xl bg-accent p-8 sm:p-12 lg:col-span-7">
              <Quote
                className="size-10 rotate-180 fill-primary text-primary"
                aria-hidden
              />
              <blockquote className="text-2xl leading-snug font-medium tracking-tight text-pretty sm:text-3xl">
                “{featured.quote}”
              </blockquote>
              <figcaption className="flex flex-wrap items-center gap-3">
                <Stars count={featured.rating} />
                <span className="font-semibold">{featured.name}</span>
                <span className="text-sm text-muted-foreground">
                  {featured.rating}/5 on Google
                </span>
              </figcaption>
            </figure>

            <div className="grid gap-4 lg:col-span-5">
              {supporting.map((review) => (
                <Card key={review.name} className="rounded-3xl">
                  <CardContent className="h-full px-6 py-2">
                    <figure className="flex h-full flex-col justify-between gap-5">
                      <blockquote className="text-sm text-pretty">
                        “{review.quote}”
                      </blockquote>
                      <figcaption className="flex items-center gap-3">
                        <Stars count={review.rating} />
                        <span className="text-sm font-medium">
                          {review.name}
                        </span>
                      </figcaption>
                    </figure>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------------------------------------------------------------
          Pricing. Published numbers early build trust; the feature
          comparison stays on /pricing where it belongs.
         --------------------------------------------------------------- */}
      <section className={cn(container, "pb-24 lg:pb-32")}>
        <div className="reveal grid gap-px overflow-hidden rounded-4xl bg-border ring-1 ring-border md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col bg-card p-8 lg:p-10">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance">
              Priced per user, per month.
            </h2>
            <p className="mt-3 text-sm text-pretty text-muted-foreground">
              {planNote}
            </p>
            <Link
              href="/pricing"
              className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-primary hover:underline"
            >
              Compare every feature
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col bg-card p-8 lg:p-10",
                plan.featured && "bg-primary text-primary-foreground",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.featured ? (
                  <span className="rounded-full bg-primary-foreground/15 px-2.5 py-1 text-xs font-medium">
                    Recommended
                  </span>
                ) : null}
              </div>

              <p className="mt-6 flex items-end gap-1.5">
                <span className="text-5xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                <span
                  className={cn(
                    "pb-1.5 text-sm",
                    plan.featured
                      ? "text-primary-foreground/75"
                      : "text-muted-foreground",
                  )}
                >
                  / user / mo
                </span>
              </p>

              <p
                className={cn(
                  "mt-4 flex-1 text-sm text-pretty",
                  plan.featured
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {plan.blurb}
              </p>

              <Button
                asChild
                variant="outline"
                className={cn(
                  "mt-8 rounded-full",
                  plan.featured &&
                    "border-transparent bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary",
                )}
              >
                <Link href="/contact">Choose {plan.name}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          FAQ. The objections left after pricing, answered plainly.
         --------------------------------------------------------------- */}
      <section className="border-t border-border">
        <div className={cn(container, "grid gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32")}>
          <div className="reveal lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              What people ask before they switch.
            </h2>
            <p className="mt-6 text-sm text-pretty text-muted-foreground">
              Something else on your mind? Call{" "}
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {site.phone}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              .
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue={homeFaqs[0]?.question}
            className="reveal border-t border-border lg:col-span-8"
          >
            {homeFaqs.map(({ question, answer }) => (
              <AccordionItem
                key={question}
                value={question}
                className="border-b border-border"
              >
                <AccordionTrigger className="py-5 text-base font-medium hover:no-underline">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-pretty text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Closing CTA. One ask, framed like the hero so the page ends where
          it began.
         --------------------------------------------------------------- */}
      <section className="px-2 sm:px-3">
        <div className="relative isolate overflow-hidden rounded-4xl bg-ink px-6 py-24 text-center text-ink-foreground sm:py-32">
          <div
            aria-hidden
            className="absolute top-full left-1/2 -z-10 size-160 -translate-1/2 rounded-full bg-primary/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 flex items-center justify-center"
          >
            {["size-96", "size-144", "size-192", "size-240"].map((size) => (
              <span
                key={size}
                className={cn(
                  "absolute rounded-full border border-ink-foreground/[0.07]",
                  size,
                )}
              />
            ))}
          </div>

          <div className="reveal mx-auto max-w-2xl">
            <Eyebrow className="justify-center text-brand-from">
              Talk to us
            </Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Hear SipLink on your own call flows.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-ink-foreground/75">
              Book a demo and we will map your numbers, extensions and call
              routing to a plan — including porting the numbers you already
              have.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full pr-2 pl-6">
                <Link href="/contact">
                  Book a demo
                  <ArrowChip />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-ink-foreground/25 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground dark:bg-transparent"
              >
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                  <Phone aria-hidden />
                  {site.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
