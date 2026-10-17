import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, PhoneCall, Quote, Star } from "lucide-react";

import { AiConsole } from "@/components/site/ai-console";
import { AppsShowcase } from "@/components/site/apps-showcase";
import { AiMark } from "@/components/site/ai-mark";
import { AdvantageTable } from "@/components/site/advantage-table";
import { CtaPanel } from "@/components/site/cta-panel";
import { CustomerStories } from "@/components/site/customer-stories";
import { FeatureCards } from "@/components/site/feature-cards";
import { FaqSection } from "@/components/site/faq-section";
import { HowItWorks } from "@/components/site/how-it-works";
import { IntegrationWall } from "@/components/site/integration-wall";
import { SectorStage } from "@/components/site/sector-stage";
import { SwitchingStory } from "@/components/site/switching-story";
import { TrustStrip } from "@/components/site/trust-strip";
import { TypedQuote } from "@/components/site/typed-quote";
import { VideoEmbed } from "@/components/site/video-embed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  aiStages,
  heroHighlights,
  homePillars,
  reviews,
  site,
  whyPoints,
} from "@/lib/site";

/**
 * Homepage.
 *
 * The page answers five questions, in the order a buyer asks them:
 *
 * 1. What is it? — business voice with AI on every call (hero, trust strip).
 * 2. What does it provide? — the AI layer over every call (AI), which
 *    product is yours (pillars), then what it does once it is in
 *    (capabilities).
 * 3. Who is it for? — which sector you are in (industries).
 * 4. Why choose it? — the four reasons and the side-by-side (why), what
 *    actually changes when you switch (migration), the support claim
 *    evidenced once (film and one review), does it fit your stack
 *    (integrations), who else went through with it (customer stories).
 * 5. What next? — how it works, FAQ, apps, talk to us (CTA).
 *
 * AI is the client's lead differentiator, so it is named in the hero and
 * demonstrated straight after it. The AI lettermark (`AiMark`) marks every
 * place AI appears and nowhere else — follow it down the page.
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
  "AI Transcripts and Summaries",
];

/**
 * The product chooser as a bento, by position in `homePillars`:
 *
 *   Cloud Phone (wide)        | SIP     | AI Voice
 *   Call Center | Unified Comms (wide)  | (tall)
 *
 * AI Voice takes the tall cell because it is the differentiator; the two
 * broad platforms take the wide ones, text beside their drawing. On a tablet
 * the wide and tall cards take a full row each and SIP pairs with Call
 * Center; on a phone everything stacks.
 */
const pillarLayout: { cell: string; kind: "wide" | "small" | "tall" }[] = [
  { cell: "sm:col-span-2 lg:col-start-1 lg:row-start-1", kind: "wide" },
  { cell: "lg:col-start-3 lg:row-start-1", kind: "small" },
  { cell: "lg:col-start-1 lg:row-start-2", kind: "small" },
  { cell: "sm:col-span-2 lg:col-start-2 lg:row-start-2", kind: "wide" },
  {
    cell: "sm:col-span-2 lg:col-span-1 lg:col-start-4 lg:row-span-2 lg:row-start-1",
    kind: "tall",
  },
];

/**
 * The AI capabilities named on the featured pillar card: only the ones
 * `aiStages` lists without a "where enabled" qualifier, so nothing on the
 * card is promised to every customer that depends on their plan.
 */
const aiHighlights = aiStages
  .flatMap(({ items }) => items)
  .filter(({ conditional }) => !conditional)
  .map(({ label }) => label)
  .filter((label) =>
    [
      "Call transcription",
      "Call summaries",
      "Conversation intelligence",
      "Intelligent workflow automation",
    ].includes(label),
  );

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
            src="/images/hero-agent-headset.webp"
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
              {/* AI named in the first thing read, not left to the subcopy.
                  Jumps to the demo rather than the product page: seeing a
                  call handled sells it better than a feature list. */}
              <Link
                href="#ai"
                className="group mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-background/80 py-1 pr-3.5 pl-1 text-sm shadow-xs backdrop-blur-md transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <AiMark />
                <span className="font-medium">New: AI Voice Assistant</span>
                <span className="hidden text-muted-foreground sm:inline">
                  See it handle a call
                </span>
                <ArrowRight
                  className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>

              {/* Fluid: tracks viewport height too, so a short laptop screen
                  gets a smaller headline rather than an overflowing one. */}
              <h1 className="font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[clamp(2.25rem,4vh+1.1vw,3.25rem)]">
                Business Phone Systems{" "}
                <span className="text-primary">
                  Built for How Your Team Works
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground lg:text-lg">
                Cloud PBX, SIP trunking, call center and WhatsApp, with AI that
                transcribes and summarises your calls and, where you enable
                it, answers them for you. All from one reliable partner.
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
                src="/images/hero-agent-headset.webp"
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
                <div>
                  {/* Says who is speaking: the greeting is the AI
                      receptionist, which is the point of the card. */}
                  <p className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-primary">
                    <span className="inline-flex scale-75">
                      <AiMark />
                    </span>
                    AI receptionist
                  </p>
                  <p className="text-xs leading-snug text-pretty">
                    &ldquo;Hi, thanks for calling SipLink. How can I help you
                    today?&rdquo;
                  </p>
                </div>
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

      {/* AI straight after the trust strip, the way Quo, Aircall and
          Nextiva lead with theirs: it is what competitors selling the same
          products do not have, and the hero's "New" pill lands here. */}
      <AiConsole />

      {/* ---------------------------------------------------------------
          What does your business need? The product chooser. Visitors who do
          not speak telecom pick the situation closest to theirs, not a
          product name. Laid out as a bento — see `pillarLayout`.
         --------------------------------------------------------------- */}
      {/* Styled to match the feature bento below it (FeatureCards): no
          outlines, a soft pink shadow on a pale pink ground, and the same
          icon-chip header — so the two "what does it provide?" sections read
          as one. */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 via-primary/[0.03] to-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Solutions
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              What Does Your Business Need?
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Pick the situation closest to yours and we will show you the right
              solution.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {homePillars.map(
              (
                { title, headline, description, href, icon: Icon, image, ai },
                index,
              ) => {
                const { cell, kind } = pillarLayout[index] ?? {
                  cell: "",
                  kind: "small",
                };

                // The featured cell: the one card on the brand gradient, so AI
                // is the first thing the eye lands on in the section.
                if (kind === "tall") {
                  return (
                    <Link
                      key={title}
                      href={href}
                      className={cn(
                        "group rounded-2xl transition-transform duration-300 ease-out focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:hover:-translate-y-1",
                        cell,
                      )}
                    >
                      <Card className="relative h-full gap-0 overflow-hidden rounded-2xl bg-gradient-to-b from-brand-from to-brand-to p-5 text-primary-foreground shadow-xl ring-0 shadow-primary/25 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-primary/40">
                        {/* A soft light in the top corner, so the gradient
                            has depth rather than reading as a flat fill. */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-background/20 blur-2xl"
                        />

                        <div className="relative flex items-center gap-2">
                          <span className="rounded-full bg-background/95 p-1">
                            <AiMark />
                          </span>
                          <span className="text-sm font-semibold">{title}</span>
                          <Badge className="ml-auto h-5 bg-background px-1.5 text-[10px] text-primary">
                            New
                          </Badge>
                        </div>

                        <CardTitle className="relative mt-4 text-2xl font-semibold tracking-tight text-balance">
                          {headline}
                        </CardTitle>
                        <CardDescription className="relative mt-1.5 text-pretty text-primary-foreground/80">
                          {description}
                        </CardDescription>

                        {/* White, like the illustration's own ground, so the
                            two read as one panel. */}
                        <div className="relative mt-5 flex min-h-56 flex-1 items-center justify-center overflow-hidden rounded-xl bg-background shadow-lg shadow-black/10">
                          {image ? (
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={720}
                              height={841}
                              sizes="(min-width: 1024px) 18rem, 90vw"
                              className="h-full max-h-96 w-full object-contain p-2 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                            />
                          ) : null}
                        </div>

                        <ul className="relative mt-4 flex flex-wrap gap-1.5">
                          {aiHighlights.map((label) => (
                            <li
                              key={label}
                              className="flex items-center gap-1 rounded-full bg-background/15 px-2.5 py-1 text-xs font-medium ring-1 ring-background/25"
                            >
                              <Check className="size-3" aria-hidden />
                              {label}
                            </li>
                          ))}
                        </ul>

                        <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                          Explore {title}
                          <ArrowRight
                            className="size-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
                      </Card>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={title}
                    href={href}
                    className={cn(
                      "group rounded-2xl transition-transform duration-300 ease-out focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:hover:-translate-y-1",
                      cell,
                    )}
                  >
                    <Card
                      className={cn(
                        "h-full gap-4 rounded-2xl p-5 shadow-xl ring-0 shadow-primary/5 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-primary/15",
                        "bg-gradient-to-br from-background via-background to-primary/10",
                        kind === "wide" &&
                          "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-stretch md:gap-5",
                      )}
                    >
                      {/* The drawings are pink on transparent PNGs, so they
                          get a soft pink inset panel to stand on. */}
                      <div
                        className={cn(
                          "flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
                          kind === "small" && "h-40",
                          kind === "wide" && "h-44 md:order-2 md:h-auto md:min-h-52",
                        )}
                      >
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

                      <div
                        className={cn(
                          "flex flex-col px-1",
                          kind === "wide" ? "md:justify-center md:py-2" : "flex-1",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {ai ? (
                            <AiMark />
                          ) : (
                            <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <Icon className="size-4" aria-hidden />
                            </span>
                          )}
                          <span className="text-sm font-semibold">{title}</span>
                          {ai ? (
                            <Badge className="h-5 bg-primary/10 px-1.5 text-[10px] text-primary">
                              New
                            </Badge>
                          ) : null}
                        </div>

                        <CardTitle
                          className={cn(
                            "mt-3 font-semibold tracking-tight text-balance",
                            kind === "small" ? "text-lg" : "text-xl lg:text-2xl",
                          )}
                        >
                          {headline}
                        </CardTitle>
                        <CardDescription className="mt-1.5 text-pretty">
                          {description}
                        </CardDescription>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary",
                            kind !== "wide" && "mt-auto",
                          )}
                        >
                          Explore {title}
                          <ArrowRight
                            className="size-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </Card>
                  </Link>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* What the products do, straight after which product — so "what does
          it provide?" is answered in one place before anything else. */}
      <FeatureCards />

      {/* Who it is for, while the visitor is still deciding whether to read
          on. Buried lower, most visitors never learn it fits them. */}
      <SectorStage />

      {/* ---------------------------------------------------------------
          The SipLink advantage. Answers "why you instead of another VoIP
          provider?": the side-by-side first, with SipLink raised in the
          middle, then the four reasons to believe it as a hairline band.
          Sits after the chooser, so the visitor knows what is being
          compared before being asked to compare it.
         --------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              The {site.name} advantage
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              More than just a <span className="text-primary">provider.</span>
            </h2>
            <p className="mt-5 text-pretty text-muted-foreground">
              Get dedicated support, seamless migration, and a complete
              communication stack built for your business growth.
            </p>
          </div>

          <AdvantageTable />

          {/* Below `lg` this is an ordinary spaced grid with no rules at
              all; at `lg` the left borders turn it into the band. Doing it
              with per-cell borders rather than `divide-x` is what keeps the
              2-up tablet layout from growing stray verticals. */}
          <div className="mt-20 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-x-0">
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

        </div>
      </section>

      <SwitchingStory />

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

      <IntegrationWall />

      {/* The reviews land here rather than up beside the film: by this point
          the visitor has seen the products, their own sector, the migration
          and their own tools, so the objection left is whether anyone else
          actually went through with it. The wall of names answers that, and
          it is the last thing read before the closing ask. */}
      <CustomerStories />

      <HowItWorks />

      <AppsShowcase />

      <FaqSection />

      {/* ---------------------------------------------------------------
          Closing CTA. Outcome-first: what changes for the business, one
          ask, and the three things that remove the risk of making it.
         --------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {/* This panel is a component, because every solution page closes
            with the same one. Keeping a copy here would have meant the home
            CTA and the seven others drifting apart the first time either was
            touched. See components/site/cta-panel. */}
        <CtaPanel
          heading="Ready to Upgrade Your Business Communications?"
          body="Replace outdated PBX systems, improve call handling and give your team one reliable communications platform."
          action={{ label: "Book a Free Consultation", href: "/contact" }}
          note="No obligation &middot; Free consultation &middot; Migration guidance included"
        />
      </section>
    </>
  );
}
