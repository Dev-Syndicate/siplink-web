import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PhoneCall,
  Quote,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";

import { CustomerStories } from "@/components/site/customer-stories";
import { IntegrationWall } from "@/components/site/integration-wall";
import { SwitchingStory } from "@/components/site/switching-story";
import { AppleLogo, PlayStoreLogo } from "@/components/site/store-icons";
import { TypedQuote } from "@/components/site/typed-quote";
import { VideoEmbed } from "@/components/site/video-embed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  heroHighlights,
  homePillars,
  industries,
  mobileApps,
  plans,
  reviews,
  site,
} from "@/lib/site";

/**
 * Homepage.
 *
 * The argument, in order: enterprise-grade voice (hero) → which product is
 * yours (pillars) → what actually changes when you switch (migration) → the
 * support claim, evidenced once (film and one review) → which sector you are
 * in (industries) → does it fit your stack (integrations, apps) → who else
 * went through with it (customer stories) → talk to us (CTA).
 *
 * Price is not argued here any more, only quoted once in the hero. The plan
 * cards live on /pricing, which the hero and the nav both link to.
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
      <section className="relative -mt-20 pt-20 sm:-mt-30 sm:pt-30 overflow-hidden border-b border-border">
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
            depending on padding values adding up to less than the height.
            With the section's own 7.5rem top padding (it runs up behind the
            floating nav) this makes the hero exactly one viewport tall. */}
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

          {/* Every card the same shape and the same crimson, two to a row.

              The illustrations sit straight on that crimson with no light
              tray behind them. They are pink artwork on a transparent ground,
              so the paler parts — the clouds, the chat bubbles, the chart
              bars — lose most of their contrast against it. That is the
              trade this design makes on purpose; putting a white panel back
              under `<Image>` is the one-line way to undo it. */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {homePillars.map(({ eyebrow, title, description, href, image }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-md transition duration-300 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:outline-none sm:min-h-64 sm:flex-row sm:items-stretch motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1"
              >
                <div className="flex h-44 shrink-0 items-center justify-center overflow-hidden sm:h-auto sm:w-[40%]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={512}
                    height={512}
                    sizes="(min-width: 640px) 16rem, 90vw"
                    className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:scale-[1.06] motion-safe:group-focus-visible:-translate-y-1.5 motion-safe:group-focus-visible:scale-[1.06]"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-center p-6 lg:p-7">
                  {/* /90 rather than lower: measured against the crimson this
                      lands at 4.6:1, and anything dimmer drops under the
                      4.5:1 floor for text this size. Hierarchy comes from the
                      heading's size and weight instead. */}
                  <span className="text-sm text-primary-foreground/90">
                    {eyebrow}
                  </span>

                  <h3 className="font-heading mt-2 text-xl font-semibold tracking-tight text-balance">
                    {title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-pretty text-primary-foreground/90">
                    {description}
                  </p>

                  {/* The rule draws in from the left on hover — the whole
                      card is the link, so an arrow would say it twice. */}
                  <span className="relative mt-5 inline-block self-start pt-0.5 text-sm font-medium after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
                    Explore {title}
                  </span>
                </div>
              </Link>
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
              about, over and over, is that someone answers — on WhatsApp, on
              the phone, at any hour, and the problem gets fixed.
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

      <IntegrationWall />

      {/* The reviews land here rather than up beside the film: by this point
          the visitor has seen the products, the migration, their own sector
          and their own tools, so the objection left is whether anyone else
          actually went through with it. The wall of names answers that, and
          it is the last thing read before the closing ask. */}
      <CustomerStories />

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
                desktop — calls, video, messaging and voicemail, wherever you
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
