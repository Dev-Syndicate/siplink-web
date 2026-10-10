import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, PhoneCall, Quote, Star } from "lucide-react";

import { AiConsole } from "@/components/site/ai-console";
import { CtaPanel } from "@/components/site/cta-panel";
import { CustomerStories } from "@/components/site/customer-stories";
import { FeatureCards } from "@/components/site/feature-cards";
import { FaqSection } from "@/components/site/faq-section";
import { HowItWorks } from "@/components/site/how-it-works";
import { IntegrationWall } from "@/components/site/integration-wall";
import { SectorStage } from "@/components/site/sector-stage";
import { SwitchingStory } from "@/components/site/switching-story";
import { AppleLogo, PlayStoreLogo } from "@/components/site/store-icons";
import { TrustStrip } from "@/components/site/trust-strip";
import { TypedQuote } from "@/components/site/typed-quote";
import { VideoEmbed } from "@/components/site/video-embed";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  heroHighlights,
  homePillars,
  mobileApps,
  reviews,
  site,
  whyComparison,
  whyPoints,
} from "@/lib/site";

/**
 * Homepage.
 *
 * The argument, in order: enterprise-grade voice (hero) → the four questions
 * that answer holds up to (why) → which product is
 * yours (pillars) → what makes us different, the AI layer over every call
 * (AI) → what actually changes when you switch (migration) → what it does
 * once it is in (capabilities) → the support claim, evidenced once
 * (film and one review) → which sector you are in (industries) → does it fit
 * your stack (integrations, apps) → who else went through with it (customer
 * stories) → talk to us (CTA).
 *
 * AI leads the differentiator run, above migration and the capabilities grid:
 * it is the thing competitors selling the same four products do not have, so
 * it is met while attention is still high rather than in the reassurance zone
 * further down.
 *
 * Price is not argued here any more, only quoted once in the hero. The plan
 * cards live on /pricing, which the hero and the nav both link to.
 *
 * Section rhythm alternates deliberately — left header, inverted, split,
 * hairline grid — so the page never settles into a scannable-but-unread
 * stack of identical centred blocks.
 */

/** What the hero promises beside the CTAs. */
const heroSupportPoints = [
  "Keep Your Existing Numbers",
  "24/7 Expert Support",
  "No Hardware Required",
  "Built for Growing Businesses",
];

/** The single review we pull forward as the page's headline proof. */
const featuredReview = reviews[0];

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero. A first-time visitor has to know what SipLink sells within
          a few seconds, so the headline names the product and the buyer,
          the subheadline lists what is on offer, and the two CTAs split
          "ready to talk" from "still looking". The four supporting points
          answer the usual objections (numbers, support, hardware, fit)
          while the floating cards frame the photograph. Trust claims get
          their own section below, once they can be verified.
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

        {/* The only section on the page that does not sit on the shared
            `max-w-7xl` grid: its inset and its height both come from
            `.hero-frame` in globals.css, where the reasoning lives. */}
        <div className="hero-frame relative mx-auto flex w-full flex-col justify-center py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
            <div>
              {/* Fluid: tracks viewport height too, so a short laptop screen
                  gets a smaller headline rather than an overflowing one. */}
              <h1 className="font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[clamp(2.25rem,4vh+1.1vw,3.25rem)]">
                Business Phone Systems{" "}
                <span className="text-primary">
                  Built for How Your Team Works
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground lg:text-lg">
                Cloud PBX, SIP Trunking, Call Center, WhatsApp and AI-powered
                communications, all managed by one reliable communications
                partner.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Book a Free Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="group">
                  <Link href="/solutions">
                    Explore Solutions
                    <ArrowRight
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </Button>
              </div>

              <ul className="mt-8 grid max-w-xl gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                {heroSupportPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
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
                className="card-float absolute -top-2 -right-6 flex w-64 items-center gap-3 rounded-xl border border-border bg-background/80 px-3 py-2.5 shadow-md backdrop-blur-md xl:top-2"
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
                  so it frames the agent rather than covering her. The
                  overhang stops at 1.5rem: the hero's frame is wider than
                  the page grid, so a deeper one put these eight pixels
                  from the window edge at 1280. */}
              <div className="absolute -right-6 -bottom-6 w-52 space-y-1.5">
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
        </div>
      </section>

      <TrustStrip />

      {/* ---------------------------------------------------------------
          What does your business need? The product chooser. Visitors who do
          not speak telecom pick the situation closest to theirs, not a
          product name. Five cards on a six-column grid: three on the first
          row, two wider ones beneath, so there is never an orphan.
         --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              What Does Your Business Need?
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Pick the situation closest to yours and we will show you the right
              solution.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {homePillars.map(
              (
                { title, headline, description, href, icon: Icon, image },
                index,
              ) => (
                <Link
                  key={title}
                  href={href}
                  className={cn(
                    "group rounded-xl focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:outline-none",
                    index < 3 ? "lg:col-span-2" : "lg:col-span-3",
                    index === 4 && "sm:col-span-2",
                  )}
                >
                  {/* The pink blooms out of the corner the illustration sits
                      in: these are pink drawings on transparent PNGs, and a
                      soft pink ground is what they were made to stand on. */}
                  <Card className="h-full bg-gradient-to-br from-brand-from/20 via-background via-45% to-background ring-primary/15 transition-shadow group-hover:shadow-md">
                    <div className="flex h-44 items-center justify-center overflow-hidden">
                      {image ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={512}
                          height={512}
                          sizes="(min-width: 1024px) 20rem, 90vw"
                          className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.05]"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="flex size-24 items-center justify-center rounded-full bg-primary/10 text-primary"
                        >
                          <Icon className="size-10" />
                        </span>
                      )}
                    </div>
                    <CardHeader>
                      <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Icon className="size-4 text-primary" aria-hidden />
                        {title}
                      </span>
                      <CardTitle className="text-lg text-balance">
                        {headline}
                      </CardTitle>
                      <CardDescription className="mt-1 text-pretty">
                        {description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Explore {title}
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Why SipLink. Answers "why you instead of another VoIP provider?":
          four reasons to believe it, then the same argument as a plain
          side-by-side. Sits after the chooser, so the visitor knows what
          is being compared before being asked to compare it.

          The pillars stay as a hairline band with no boxes, so the table
          below is the only bordered thing in the section.
         --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Why Businesses Choose {site.name}
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Reliable technology, expert support and a team that handles the
              migration with you.
            </p>
          </div>

          {/* Below `lg` this is an ordinary spaced grid with no rules at
              all; at `lg` the left borders turn it into the band. Doing it
              with per-cell borders rather than `divide-x` is what keeps the
              2-up tablet layout from growing stray verticals. */}
          <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-x-0">
            {whyPoints.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="lg:border-l lg:border-border lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <Icon className="size-5 text-primary" aria-hidden />

                <h3 className="font-heading mt-4 text-base font-semibold tracking-tight">
                  {title}
                </h3>

                {/* Held short: in a quarter-width column a full measure
                    would run to two words a line. */}
                <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 overflow-hidden rounded-xl border border-border lg:mt-16">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-1/3 px-4 py-3">
                    <span className="sr-only">Comparison</span>
                  </TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-primary">
                    {site.name}
                  </TableHead>
                  <TableHead className="px-4 py-3">Typical provider</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {whyComparison.map(({ point, siplink, typical }) => (
                  <TableRow key={point}>
                    <TableCell className="px-4 py-3 font-medium whitespace-normal">
                      {point}
                    </TableCell>
                    <TableCell className="bg-primary/5 px-4 py-3 whitespace-normal">
                      <span className="flex items-start gap-2 font-medium">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden
                        />
                        {siplink}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-normal text-muted-foreground">
                      {typical}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <AiConsole />

      <SwitchingStory />

      <FeatureCards />

      {/* ---------------------------------------------------------------
          The support claim, evidenced. The hero promises people who pick
          up; this is where a real customer says it instead of us.

          Stacked down the centre and narrowing as it goes — header, then
          the film, then the review answering it. The quote writes itself
          out because that is what the quote is about: a message that gets
          a reply. It is the only motion in the section, which is why the
          film and the header are left completely still.
         --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Why customers stay
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              The part no feature list covers
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Every provider sells the same features. What customers write
              about, over and over, is that someone answers, on WhatsApp, on the
              phone, at any hour, and the problem gets fixed.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <VideoEmbed />
          </div>

          {/* The block is centred; the text inside it is not. Centred body
              copy over four lines is hard to read, and a caret on centred
              text jumps sideways with every character it adds. */}
          <figure className="mx-auto mt-14 max-w-3xl">
            <Quote
              className="size-7 rotate-180 fill-primary/20 text-primary/20"
              aria-hidden
            />

            <blockquote className="mt-4">
              <TypedQuote
                quote={featuredReview.quote}
                className="text-xl leading-relaxed text-pretty lg:text-2xl"
              />
            </blockquote>

            <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
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
      </section>

      <SectorStage />

      <IntegrationWall />

      {/* The reviews land here rather than up beside the film: by this point
          the visitor has seen the products, the migration, their own sector
          and their own tools, so the objection left is whether anyone else
          actually went through with it. The wall of names answers that, and
          it is the last thing read before the closing ask. */}
      <CustomerStories />

      <HowItWorks />

      <FaqSection />

      {/* ---------------------------------------------------------------
          Apps. The other half of "does it fit my stack?" — the integration
          diagram above makes the same argument at full width, so this
          stands on its own.
         --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Mobile &amp; desktop
              </span>
              <h2 className="font-heading mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Take your extension anywhere
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                The SipLink UC app puts your business line on your phone and
                desktop, calls, video, messaging and voicemail, wherever you
                are.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
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
        {/* This panel is now a component, because every solution page closes
            with the same one. Keeping a copy here would have meant the home
            CTA and the seven others drifting apart the first time either was
            touched. See components/site/cta-panel. */}
        <CtaPanel
          eyebrow="Zero risk &middot; Instant onboarding"
          heading="Ready to modernize your enterprise telephony?"
          body="Activate your elastic SIP trunk in minutes with complimentary test credits, or schedule a private architecture review with a certified carrier engineer."
          contactLabel="Speak to an architect"
        />
      </section>
    </>
  );
}
