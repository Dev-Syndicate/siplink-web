import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import { UseCaseFigure } from "@/components/site/use-case-figures";
import { Button } from "@/components/ui/button";
import { productDetails } from "@/lib/products";
import { solutionDetails, type SolutionDetail } from "@/lib/solutions";

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
    gain,
    idealFor,
    scenario,
    builtFrom,
  } = solution;

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
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary">[</span> What you get{" "}
            <span className="text-primary">]</span>
          </p>

          {/* An unordered set, so no numbering — four equal plates. */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {capabilities.map(({ title: name, description, icon: Icon }) => (
              <li
                key={name}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-medium">{name}</p>
                  <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
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

      {/* --------------------------------------------- who it's for, and why */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
          {idealFor ? (
            <div>
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
            </div>
          ) : (
            <div />
          )}

          <div className="rounded-3xl bg-foreground p-8 text-background">
            <h2 className="text-2xl font-semibold tracking-tight text-balance">
              {gain.heading}
            </h2>
            <p className="mt-4 text-pretty text-background/75">{gain.body}</p>
            <Link
              href="/contact"
              className="mt-7 inline-block text-sm font-medium text-background underline underline-offset-4 hover:no-underline"
            >
              Talk to us about {title}
            </Link>
          </div>
        </div>
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
