import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Crown,
  PhoneCall,
  Quote,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";

import { CustomerStories } from "@/components/site/customer-stories";
import { AppleLogo, PlayStoreLogo } from "@/components/site/store-icons";
import { VideoEmbed } from "@/components/site/video-embed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  heroHighlights,
  heroProof,
  homePillars,
  industries,
  integrations,
  mobileApps,
  planAssurances,
  planBaseFeatures,
  plans,
  reviews,
  site,
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
        {/* The photograph is the section's backdrop, not a column item: it
            occupies the right half on desktop and sits behind the copy,
            which stays legible via the scrim below. */}
        <div className="absolute inset-y-0 right-0 hidden w-[64%] lg:block">
          <Image
            src="/images/hero-agent-headset.png"
            alt="Support agent wearing a headset at a desk with a laptop and desk phone, city skyline behind her"
            fill
            priority
            sizes="64vw"
            className="object-cover object-[62%_center]"
          />
          {/* Scrim covers only the overlap with the text column and clears by
              40%, so the agent herself stays at full saturation. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-background from-5% via-background/60 via-22% to-transparent to-45%"
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 -right-32 size-[680px] rounded-full bg-brand-to/10 blur-3xl"
        />

        {/* On desktop the hero fills exactly the viewport left under the
            fixed 120px header, so the whole pitch — headline through proof
            strip — lands above the fold on short laptop screens instead of
            depending on padding values adding up to less than the height. */}
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-6 py-12 lg:min-h-[calc(100svh-7.5rem)] lg:px-10 lg:py-8">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
            <div>
              <Badge variant="secondary" className="font-mono tracking-widest">
                <ShieldCheck className="size-3.5" aria-hidden />
                HIPAA COMPLIANT &middot; DoT CERTIFIED
              </Badge>

              {/* Fluid: tracks viewport height too, so a short laptop screen
                  gets a smaller headline rather than an overflowing one. */}
              <h1 className="font-heading mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[clamp(2.25rem,4.2vh+1.1vw,3.5rem)]">
                Enterprise-grade voice.{" "}
                <span className="text-primary">
                  Answered by people who pick up.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground lg:text-lg">
                A cloud phone system for growing businesses — hosted PBX, SIP
                trunking, call centre and unified communications on one secure
                network. Keep your numbers. Lose the hardware.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
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

              <p className="mt-4 text-sm text-muted-foreground">
                From{" "}
                <span className="font-medium text-foreground">
                  {plans[0].price}
                </span>{" "}
                per user / month &middot; unlimited US &amp; Canada calling
                &middot; minimum 10 lines
              </p>
            </div>

            {/* Below `lg` the backdrop is hidden, so the photo appears here
                as an ordinary framed image instead. */}
            <div className="relative lg:hidden">
              <Image
                src="/images/hero-agent-headset.png"
                alt="Support agent wearing a headset at a desk with a laptop and desk phone, city skyline behind her"
                width={1613}
                height={975}
                priority
                sizes="100vw"
                className="h-auto w-full rounded-2xl border border-border object-cover shadow-sm"
              />
            </div>

            {/* Floating glass cards over the photograph. Purely decorative
                framing of claims already made in copy, so they are hidden
                from assistive tech rather than read out twice. */}
            <div
              aria-hidden
              className="pointer-events-none relative hidden h-full min-h-[22rem] lg:block xl:min-h-[26rem]"
            >
              {/* Live-call chip, echoing the agent mid-conversation. */}
              <div
                className="card-float absolute top-4 left-0 flex items-center gap-2.5 rounded-xl border border-border bg-background/80 px-3 py-2 shadow-md backdrop-blur-md xl:top-10"
                style={{ "--float-duration": "5.5s" } as React.CSSProperties}
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <PhoneCall className="size-3.5" />
                </span>
                <div>
                  {/* The word is static; only the ellipsis is revealed, so the
                      card never changes width as it animates. */}
                  <p className="text-xs font-medium">
                    Speaking
                    <span className="speaking-dots inline-block">&hellip;</span>
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    00:24
                  </p>
                </div>
                <span className="ml-2 flex h-4 items-center gap-0.5">
                  {[3, 6, 4, 8, 5].map((bar, index) => (
                    <span
                      key={index}
                      className="wave-bar w-0.5 rounded-full bg-primary/70"
                      style={
                        {
                          height: `${bar * 2}px`,
                          "--bar-delay": `${index * 0.09}s`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </span>
              </div>

              {/* What the caller hears, quoted — the other half of the live
                  call the chip on the left is timing. */}
              <div
                className="card-float absolute -top-2 -right-6 flex w-64 items-center gap-3 rounded-xl border border-border bg-background/80 px-3 py-2.5 shadow-md backdrop-blur-md xl:top-2 xl:-right-10"
                style={
                  {
                    "--float-duration": "7s",
                    "--float-delay": "-2.5s",
                  } as React.CSSProperties
                }
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="flex h-4 items-center gap-[1.5px]">
                    {[4, 9, 14, 7, 16, 6, 11, 3].map((bar, index) => (
                      <span
                        key={index}
                        className="wave-bar w-[1.5px] rounded-full bg-primary"
                        style={
                          {
                            height: `${bar}px`,
                            "--bar-delay": `${index * 0.07}s`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </span>
                </span>
                <p className="text-xs leading-snug text-pretty">
                  &ldquo;Hi, thanks for calling SipLink. How can I help you
                  today?&rdquo;
                </p>
              </div>

              {/* Capability stack, pinned to the bottom edge and kept small
                  so it frames the agent rather than covering her. */}
              <div className="absolute -right-6 -bottom-6 w-52 space-y-1.5 xl:-right-10">
                {heroHighlights.map(({ value, label, icon: Icon }, index) => (
                  <div
                    key={label}
                    className="card-float flex items-center gap-2.5 rounded-xl border border-border bg-background/80 px-3 py-2 shadow-md backdrop-blur-md"
                    style={
                      {
                        "--float-duration": "6.5s",
                        "--float-delay": `${index * -0.8}s`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium">{value}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Proof strip — hairline grid, the products-page signature. */}
          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
            {heroProof.map(({ value, label }) => (
              <div key={label} className="bg-background p-6 lg:p-5">
                <dt className="font-heading text-3xl font-semibold tracking-tight text-primary lg:text-2xl">
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
              ({ eyebrow, title, description, href, icon: Icon, image }) => (
                <Link
                  key={title}
                  href={href}
                  className="group grid gap-6 bg-background p-8 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none sm:grid-cols-[minmax(0,1fr)_minmax(0,14rem)] sm:items-center"
                >
                  <div className="flex flex-col gap-4">
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
                  </div>

                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={512}
                    height={512}
                    sizes="(min-width: 640px) 14rem, 100vw"
                    className="h-auto w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
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

      <CustomerStories />

      {/* ---------------------------------------------------------------
          Industries. Relevance check — "is this built for a business
          like mine?" — kept compact, since the depth lives one click in.
         --------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-y border-border bg-muted/30">
        {/* Dot field behind the header, fading out before the cards — the
            texture the design carries, without shipping a map bitmap. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-[22rem] w-2/3 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] [background-image:radial-gradient(var(--color-primary)_1px,transparent_1px)] [background-size:14px_14px] opacity-[0.13]"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="max-w-xl">
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Who we serve
              </span>
              <h2 className="font-heading mt-4 text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Configured for how
                <br />
                <span className="text-primary">your sector</span> works
              </h2>
              <p className="mt-4 max-w-md text-sm text-pretty text-muted-foreground">
                A billing desk and a recruiting team need very different things
                from a phone system. Pick yours to see what changes.
              </p>
            </div>

            <div className="flex items-center gap-8 lg:pt-6">
              <p
                className="hidden -rotate-6 text-2xl leading-tight text-primary md:block"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Different people.
                <br />
                Different possibilities.
              </p>

              <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <UsersRound className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-heading text-base font-semibold tracking-tight">
                    6 sectors
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Configured end to end
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Not links: there is no /industries/[slug] route yet, so the
              section CTA below carries the navigation instead of sending
              each card to a 404. */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(
              ({ title, description, icon: Icon, badge, image }) => (
                <div
                  key={title}
                  className="group relative flex min-h-[13.5rem] flex-col overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* The cut-out fills the card's right half and runs to the
                      bottom edge; the copy keeps a matching gutter so the two
                      never collide whatever the image's aspect ratio. */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={512}
                    height={512}
                    sizes="(min-width: 1024px) 16rem, (min-width: 640px) 50vw, 100vw"
                    className="pointer-events-none absolute right-0 -bottom-1 h-[88%] w-[46%] object-contain object-right-bottom transition-transform duration-300 group-hover:scale-[1.04]"
                  />

                  <div className="relative flex flex-1 flex-col gap-2 pr-[44%]">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>

                    <h3 className="font-heading mt-1 flex flex-wrap items-center gap-2 text-[0.95rem] font-semibold tracking-tight">
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

                    <p className="text-xs leading-relaxed text-pretty text-muted-foreground">
                      {description}
                    </p>

                    <span
                      className="mt-auto flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                      aria-hidden
                    >
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <Button asChild size="lg">
              <Link href="/industries">
                View all industries
                <ArrowRight aria-hidden />
              </Link>
            </Button>

            <p className="border-l-2 border-primary pl-4 text-sm text-pretty text-muted-foreground">
              Built for every conversation.
              <br />
              Across every industry.
            </p>
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

          {/* Cards are separated rather than a hairline grid, so the featured
              tier can lift out of the row the way the design intends. */}
          <div className="mt-14 grid items-center gap-6 md:grid-cols-3 lg:gap-8">
            {plans.map((plan) => {
              // Each tier's own additions first, then the shared essentials.
              const features = [...plan.adds, ...planBaseFeatures].slice(0, 6);
              const Icon = plan.icon;

              return (
                <div
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-2xl border",
                    plan.featured
                      ? "border-primary bg-background shadow-xl md:scale-[1.04]"
                      : "border-border bg-background shadow-sm",
                  )}
                >
                  {plan.featured ? (
                    <p className="flex items-center justify-center gap-1.5 bg-primary py-2 text-xs font-semibold tracking-wide text-primary-foreground">
                      <Crown className="size-3.5" aria-hidden />
                      Most popular
                    </p>
                  ) : null}

                  <div className="flex flex-1 flex-col p-8">
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl",
                        plan.featured
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>

                    <h3 className="font-heading mt-5 text-xl font-semibold tracking-tight">
                      {plan.name}
                    </h3>

                    <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                      {plan.blurb}
                    </p>

                    <p className="mt-6 flex items-end gap-1.5">
                      <span
                        className={cn(
                          "font-heading text-4xl font-semibold tracking-tight",
                          plan.featured && "text-primary",
                        )}
                      >
                        {plan.price}
                      </span>
                      <span className="pb-1 text-sm text-muted-foreground">
                        / user / month
                      </span>
                    </p>

                    <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                      {features.map((feature) => (
                        <li key={feature} className="flex gap-2.5 text-sm">
                          <span
                            className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10"
                            aria-hidden
                          >
                            <Check className="size-2.5 text-primary" />
                          </span>
                          <span className="text-pretty text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      variant={plan.featured ? "default" : "outline"}
                      className="mt-8 w-full"
                    >
                      <Link href="/pricing">
                        View {plan.name} details
                        <ArrowRight aria-hidden />
                        <span className="sr-only"> and full feature list</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terms that hold on every tier, so they sit under the row rather
              than repeating inside all three cards. */}
          <dl className="mt-12 grid gap-8 rounded-2xl border border-border bg-muted/30 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
            {planAssurances.map(({ value, label, icon: Icon }) => (
              <div key={value} className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <dt className="text-sm font-medium">{value}</dt>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              </div>
            ))}
          </dl>
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
        <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-brand-to via-brand-to to-brand-from px-8 py-14 text-primary-foreground lg:px-14 lg:py-16">
          {/* Soft light falling from the top-right, so the flat gradient
              reads as a lit surface rather than a solid fill. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[520px] rounded-full bg-white/10 blur-3xl"
          />

          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-widest uppercase">
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            Zero risk &middot; Instant onboarding
          </span>

          <h2 className="font-heading mt-6 max-w-xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Ready to modernize your enterprise telephony?
          </h2>

          <p className="mt-5 max-w-xl text-pretty text-primary-foreground/85 lg:text-lg">
            Activate your elastic SIP trunk in minutes with complimentary test
            credits, or schedule a private architecture review with a certified
            carrier engineer.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90"
            >
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground dark:border-white/25 dark:bg-white/10 dark:hover:bg-white/20"
            >
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                <PhoneCall aria-hidden />
                Speak to an architect ({site.phone})
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
