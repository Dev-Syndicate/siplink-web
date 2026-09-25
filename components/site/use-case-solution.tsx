import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import { CallingDevicesScene } from "@/components/site/calling-devices-scene";
import { CapabilityFigure } from "@/components/site/capability-figures";
import { CtaPanel } from "@/components/site/cta-panel";
import { UseCaseFigure } from "@/components/site/use-case-figures";
import { Button } from "@/components/ui/button";
import { productDetails } from "@/lib/products";
import {
  solutionDetails,
  type SolutionDetail,
  type SolutionPoint,
} from "@/lib/solutions";
import { cn } from "@/lib/utils";

/**
 * The six "By Use Case" solutions, in one style.
 *
 * An earlier pass gave each of these six its own silhouette — radial, mosaic,
 * ledger, columns, tiles, spine — on the theory that pages which look alike
 * read as a template. That was the wrong axis. A section should read as a
 * set: a reader landing here should be able to tell they are in By Use Case
 * without reading the label, and six unrelated layouts took that away while
 * leaving the pages with almost no motion and three of them sharing one
 * illustration.
 *
 * So the layout is deliberately identical across all six and the figure
 * carries the entire difference. Each figure draws what that use case's
 * reader stands to lose being prevented, and no two share a geometry:
 *
 *   remote-workforce        one number, four places, caller none the wiser
 *   customer-support        menu, queue, agent — and the busy tone avoided
 *   sales-teams             dead dials filtered before they reach a person
 *   unified-communications  four systems arriving in one
 *   global-offices          a local number per market, one platform under
 *   multi-branch            branches keep their identity, nothing unseen
 *
 * "What you get" now draws too. That section was a 2×2 grid of icon-and-text
 * plates, which is where a set of six pages sharing one layout actually gets
 * into trouble: the hero figure differed, and then twenty-four capabilities
 * across the six were rendered as identical cards carrying a lucide glyph
 * apiece. The capabilities are the concrete half of the argument, so they get
 * the same treatment the hero does — see capability-figures.tsx, which keeps
 * its own note on why sixteen drawings cover twenty-four capabilities.
 *
 * The bracketed section labels are from the reference deck. Deliberately
 * absent: its saturated frame, its headline money figure, and the ring
 * line-art and corner disc that were here before.
 */
export function UseCaseSolution({ solution }: { solution: SolutionDetail }) {
  const {
    slug,
    group,
    title,
    tagline,
    intro,
    challenge,
    handling,
    capabilities,
    capabilityLayout,
    gain,
    idealFor,
    scenario,
    builtFrom,
  } = solution;

  const cards = capabilityLayout === "cards";

  /* Under "banner" one mock runs the full width and every capability sits in
     a single row beneath it, so the image stands for the section rather than
     for one capability. First one found wins — see the note on
     `capabilityLayout` in lib/solutions.ts. */
  const banner =
    capabilityLayout === "banner"
      ? capabilities.find((item) => item.image)?.image
      : undefined;

  const siblings = solutionDetails.filter(
    (item) => item.group === group && item.slug !== slug,
  );

  // Products are referenced by slug and resolved here, so their names and
  // one-liners stay in lib/products.ts and cannot drift out of sync.
  const products = (builtFrom ?? []).flatMap((productSlug) => {
    const match = productDetails.find((item) => item.slug === productSlug);
    return match ? [match] : [];
  });

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-20">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            <span>
              <span className="text-primary">[</span> {group}{" "}
              <span className="text-primary">]</span>
            </span>
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h1 className="max-w-[15ch] text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-[40ch] text-lg text-pretty text-primary sm:text-xl">
                {tagline}
              </p>
              <p className="mt-5 max-w-[52ch] text-pretty text-muted-foreground">
                {intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">Talk to us</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>

            {/* The one thing that is not shared. */}
            <UseCaseFigure slug={slug} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- problem and answer */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <p className="text-sm text-muted-foreground">
          <span className="text-primary">[</span> The problem{" "}
          <span className="text-primary">]</span>
        </p>

        <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="max-w-[18ch] text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl">
              {challenge.heading}
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg text-pretty text-muted-foreground">
              {challenge.body}
            </p>
          </div>

          <div className="relative lg:pl-16">
            {/* The turn from objection to answer, marked once in the gutter. */}
            <span
              aria-hidden
              className="absolute top-0 left-0 hidden h-full w-px bg-gradient-to-b from-brand-from to-brand-to lg:block"
            />
            <h3 className="text-xl font-semibold tracking-tight">
              {handling.heading}
            </h3>
            <div className="mt-4 space-y-4">
              {handling.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="max-w-[54ch] text-pretty text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- one run-through */}
      {scenario ? (
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary">[</span> In practice{" "}
              <span className="text-primary">]</span>
            </p>

            <div className="mt-6 max-w-[46ch]">
              <h2 className="text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl">
                {scenario.heading}
              </h2>
              <p className="mt-5 text-lg text-pretty text-muted-foreground">
                {scenario.lead}
              </p>
            </div>

            {/* Numbered because a call genuinely happens in this order — the
                capability grid below is a set, so it stays unnumbered. */}
            <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {scenario.steps.map((step, index) => (
                <li key={step.title} className="relative sm:pt-6">
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 hidden h-px w-full bg-border sm:block"
                  />
                  <span className="font-mono text-sm text-primary tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-pretty">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-pretty text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------ what you get */}
      <section className="border-y border-border bg-gradient-to-b from-background via-brand-from/[0.12] to-background">
        {/* Wider than the rest of the page, but only once the viewport can
            afford it. The product mocks are the content of this section
            rather than an illustration beside it, and at 6xl they never get
            past 600px — which is not enough to read an extension number in. */}
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20 2xl:max-w-7xl">
          {/* The one section on these pages that leads with a heading rather
              than a bracketed label, and the only centred thing on the page.
              It earns both: it carries the concrete half of the argument, and
              the rows under it are tall enough that a 14px eyebrow could not
              hold the top of them. The rows themselves stay left-aligned —
              centring those as well would make the section drift. */}
          <div className="text-center">
            <h2 className="text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl">
              What&rsquo;s included
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-lg text-pretty text-muted-foreground">
              The capabilities that make up {title}, and what each one changes
              day to day.
            </p>
          </div>

          {banner ? (
            /* One mock across the full width, the capabilities in a single
               row beneath it.

               This is the only layout that gives the artwork the container's
               whole width, which is the point of it — at 1200px the mock is
               twice the size it reaches in the alternating rows, and these
               are dense screenshots whose detail is the argument.

               The row beneath drops to a smaller type pair than the rows use.
               Four columns is 276px each; a text-3xl heading would take three
               lines of it and stop being a heading. */
            <>
              <div className="mt-12 lg:mt-14">
                <CapabilityMedia
                  image={banner}
                  sizes="(min-width: 1536px) 75rem, (min-width: 1024px) 67rem, 100vw"
                  className="w-full rounded-2xl border border-border"
                />
              </div>

              <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-10">
                {capabilities.map(({ title: name, description }) => (
                  <li key={name}>
                    <h3 className="text-lg font-semibold tracking-tight text-balance">
                      {name}
                    </h3>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : cards ? (
            /* Two tall cards to a row, the mock across the top of each.

               The alternating rows below suit a mock that reads left to
               right and wants a band to itself. These four are
               self-contained panels — a routing table, a flow designer, a
               dashboard — so they sit better stacked over their own caption,
               two at a time, which is also the reading unit: compare
               routing against menus, then recording against analytics.

               No shadow under the cards and no tint inside them. The site
               separates surfaces with a hairline, and two of these four
               mocks are already a saturated crimson panel — a wash behind
               them would be a second ground competing with the first. The
               radius is larger than the site's usual rounded-2xl because
               these are much larger objects; radius tracks the size of the
               thing, rather than being one value everywhere.

               Two up only from lg. At sm the pair would be ~310px each,
               which puts "Press 2 for Support" below reading size — the
               same trap the alternating rows fell into. Below lg one card
               takes the full width instead. */
            <ul className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
              {capabilities.map(({ title: name, description, image }) => (
                <li
                  key={name}
                  className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
                >
                  {image ? (
                    <CapabilityMedia
                      image={image}
                      sizes="(min-width: 1536px) 37rem, (min-width: 1024px) 33rem, 100vw"
                      className="w-full border-b border-border"
                    />
                  ) : null}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                      {name}
                    </h3>
                    <p className="mt-3 max-w-[48ch] text-pretty text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            /* Four equal capabilities, alternating copy and figure.

               Still an unordered set, so still no numbering — and no card
               around the row either. The 2×2 grid this replaces put each
               capability in its own bordered plate, which made four peers
               read as four detached objects and left the icon doing the
               explaining; a Smartphone glyph beside "Desktop, mobile and
               browser calling" restates the heading and would have fitted
               any row on any of the six pages. A hairline between rows
               groups them instead, and the drawing carries what the icon
               could not. See capability-figures.

               Copy stays left-aligned on both sides. Mirroring the alignment
               with the layout is what makes an alternating section read as a
               template rather than as a sequence of arguments. */
            <ul className="mt-14 lg:mt-16">
            {capabilities.map(
              ({ title: name, description, icon: Icon, image }, index) => {
                /* A live scene takes the row's full width, copy above it.
                   Its UI is drawn at scale inside it, so in the 1fr track
                   the labels shrank past reading size; given the whole
                   container it roughly doubles. */
                const wide = image !== undefined && "scene" in image;
                const mirrored = !wide && index % 2 === 1;

                return (
                  <li
                    key={name}
                    className={cn(
                      "grid items-center gap-8",
                      /* A mock holds the full column until there is genuine
                         room for two, because its detail is the argument —
                         at 1100px wide, split in half, the extension number
                         on the handset is four pixels tall. A drawn figure
                         was authored against a 480×280 canvas and reads
                         worse enlarged, so it splits at lg as it always
                         did. */
                      wide
                        ? "lg:gap-10"
                        : image
                        ? cn(
                            "xl:gap-14",
                            /* `order` moves a child into a different track
                               but does not carry the track's width with it.
                               On a mirrored row the image lands in track 1,
                               so track 1 has to be the wide one — otherwise
                               the mock takes the 26rem column and the
                               paragraph takes the 1fr remainder, which is
                               the argument backwards. */
                            mirrored
                              ? "xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]"
                              : "xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]",
                          )
                        : "lg:grid-cols-2 lg:gap-16",
                      index > 0 &&
                        "mt-12 border-t border-border pt-12 lg:mt-16 lg:pt-16",
                    )}
                  >
                    <div
                      className={cn(
                        mirrored && (image ? "xl:order-2" : "lg:order-2"),
                      )}
                    >
                      <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                        {name}
                      </h3>
                      {/* Wider measure while the row is stacked, narrower
                          once the text is in its own column. A 46ch line
                          under a 1000px mock reads as a caption that got
                          left behind. */}
                      <p
                        className={cn(
                          "mt-4 text-lg text-pretty text-muted-foreground",
                          wide
                            ? "max-w-[62ch]"
                            : image
                              ? "max-w-[62ch] xl:max-w-[46ch]"
                              : "max-w-[46ch]",
                        )}
                      >
                        {description}
                      </p>
                    </div>

                    {/* A mock carries its own white ground and its own
                        shadows, so it goes edge to edge behind one hairline.
                        Padding it onto a plate would frame a picture that is
                        already framed. A drawn figure has no ground of its
                        own and keeps the plate. */}
                    <div
                      className={cn(
                        mirrored && (image ? "xl:order-1" : "lg:order-1"),
                      )}
                    >
                      {image ? (
                        /* Dimensions come from the data, not a constant here:
                           next/image derives the aspect ratio from them, so a
                           shared pair silently squashes any mock shaped
                           differently — which it was doing, by up to 3%. */
                        <CapabilityMedia
                          image={image}
                          sizes={
                            wide
                              ? "(min-width: 1152px) 72rem, 100vw"
                              : "(min-width: 1536px) 46rem, (min-width: 1280px) 38rem, 100vw"
                          }
                          className="w-full rounded-2xl border border-border"
                        />
                      ) : (
                        /* Capped so the 2xl widening above lifts the text
                           column without stretching a figure past the size
                           its labels were drawn for. */
                        <div className="max-w-[33rem] rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
                          <CapabilityFigure
                            title={name}
                            fallback={
                              <span className="flex h-full min-h-40 items-center justify-center text-primary">
                                <Icon className="size-8" aria-hidden />
                              </span>
                            }
                          />
                        </div>
                      )}
                    </div>
                  </li>
                );
              },
            )}
            </ul>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------- what it uses */}
      {products.length ? (
        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                <span className="text-primary">[</span> Built from{" "}
                <span className="text-primary">]</span>
              </p>
              <h2 className="mt-5 max-w-[24ch] text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl">
                The SipLink products behind it
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-medium text-primary underline underline-offset-4 hover:no-underline"
            >
              See all products
            </Link>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {products.map(({ slug: productSlug, title: name, tagline: line, icon: Icon }) => (
              <li key={productSlug}>
                <Link
                  href={`/products/${productSlug}`}
                  className="group flex h-full flex-col gap-3 bg-card p-6 transition-colors hover:bg-muted focus-visible:bg-muted"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-medium">{name}</span>
                  <span className="text-sm text-pretty text-muted-foreground">
                    {line}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ------------------------------------------------------ who it's for */}
      {idealFor ? (
        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary">[</span> Who it&rsquo;s for{" "}
            <span className="text-primary">]</span>
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {idealFor.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <span
                  className="mb-3 flex size-6 items-center justify-center rounded-full bg-accent text-primary"
                  aria-hidden
                >
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm text-pretty text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* The closing ask, in the site's one CTA shape. It used to share a row
          with "Who it's for", which capped it at 28rem and left it a quarter
          the weight of the same ask on the home page. */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <CtaPanel
          eyebrow="Keep your numbers &middot; Set up with you"
          heading={gain.heading}
          body={gain.body}
        />
      </section>

      {/* The other five. A reader here is often still working out which one
          they are. */}
      {siblings.length ? (
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-16">
            <h2 className="text-lg font-semibold tracking-tight">
              Other ways teams use SipLink
            </h2>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
              {siblings.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="flex h-full flex-col gap-2 bg-card p-5 transition-colors hover:bg-muted focus-visible:bg-muted"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-pretty text-muted-foreground">
                      {item.tagline}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}

/**
 * A capability's artwork: the file, or — where the data names a `scene` — the
 * live rendering of it. The scene draws its own hairline and radius, so the
 * call sites pass the same props either way.
 */
function CapabilityMedia({
  image,
  sizes,
  className,
}: {
  image: NonNullable<SolutionPoint["image"]>;
  sizes: string;
  className: string;
}) {
  if ("scene" in image) {
    return <CallingDevicesScene label={image.alt} />;
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      quality={90}
      className={className}
    />
  );
}
