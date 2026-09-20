import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import { SolutionIllustration } from "@/components/site/solution-illustration";
import { Button } from "@/components/ui/button";
import type { SolutionDetail } from "@/lib/solutions";
import { cn } from "@/lib/utils";

/**
 * The six "By Use Case" solutions.
 *
 * Built as one file rather than six because the questions are the same on
 * every page — what goes wrong, how it is answered, what you get, who it is
 * for. What is *not* shared is the shape: a single shell gave six pages that
 * differed only in their words, which is the same failure the four business
 * sizes had before each one was given its own figure.
 *
 * So every page here gets its own silhouette, and the silhouette is chosen
 * from what the page is about rather than dealt out to make a set:
 *
 * - remote-workforce  radial     one identity at the centre, people around it
 * - customer-support  mosaic     a triage board, one case larger than the rest
 * - sales-teams       ledger     a numbered list, read the way a desk reads
 * - unified-comms     channels   four equal columns, because that is the claim
 * - global-offices    tiles      four regions, given equal room
 * - multi-branch      stack      branches hanging off one spine
 *
 * From the reference decks: bracketed labels, numbered rows over a coloured
 * claim, tinted panels opened by a dot, ring line-art, the corner disc.
 * Deliberately absent: the saturated frame (a full-bleed brand ground, which
 * this site does not do), the headline money figure (it would have to be
 * invented, and lib/solutions.ts rules that out) and the card illustrations
 * (no equivalent artwork exists here).
 */

type Variant = "radial" | "mosaic" | "ledger" | "channels" | "tiles" | "stack";

const VARIANTS: Record<string, Variant> = {
  "remote-workforce": "radial",
  "customer-support": "mosaic",
  "sales-teams": "ledger",
  "unified-communications": "channels",
  "global-offices": "tiles",
  "multi-branch": "stack",
};

/* ------------------------------------------------------------------ parts */

/** A section label in square brackets, the way the reference decks set them. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground">
      <span className="text-primary">[</span> {children}{" "}
      <span className="text-primary">]</span>
    </p>
  );
}

/**
 * Concentric rings bleeding out of a corner. Ellipses rather than circles, so
 * they read as a form seen at an angle instead of a target.
 */
function Rings({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      {[34, 52, 70, 88].map((r) => (
        <ellipse key={r} cx="100" cy="100" rx={r} ry={r * 0.72} />
      ))}
    </svg>
  );
}

function BackLink({ group }: { group: string }) {
  return (
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
  );
}

/**
 * The stake, for the support page: a call waiting, and the point at which
 * the caller stops waiting.
 *
 * The bar grows toward a dashed marker and stops short of it, then the
 * answer lands. The figure is the gap between those two — which is the
 * page's own sentence, that a missed call is a missed customer, drawn
 * rather than asserted.
 *
 * No timings on it. A number here would be a performance claim, and the
 * source documents do not support one; the shape carries the point without
 * putting a figure behind it. Decorative, so it is hidden from assistive
 * tech — the copy above already makes the argument.
 */
function CallAtRisk() {
  return (
    <div aria-hidden className="mx-auto mt-14 w-full max-w-lg">
      <div className="flex items-baseline justify-between text-xs text-muted-foreground">
        <span>Caller waiting</span>
        <span>Caller gives up</span>
      </div>

      <div className="relative mt-2.5 h-2.5 rounded-full bg-muted">
        <span className="wait-grow absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-from to-brand-to" />
        {/* The point of no return, marked once. */}
        <span className="absolute -top-1.5 -bottom-1.5 right-[10%] w-px bg-muted-foreground/40" />
      </div>

      <p className="answer-land mt-5 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-accent px-4 py-1.5 text-sm font-medium text-primary">
          <Check className="size-4" />
          Answered
        </span>
      </p>
    </div>
  );
}

function Actions({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Button asChild size="lg">
        <Link href="/contact">Talk to us</Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <Link href="/pricing">View pricing</Link>
      </Button>
    </div>
  );
}

type Caps = SolutionDetail["capabilities"];

/* ------------------------------------------------------------- capabilities
 * One arrangement per page. These are the pages' strongest tell, so they
 * share no markup at all — only the content they are given. */

/** Radial: the shared identity at the centre, the four ways in around it. */
function CapsRadial({ items }: { items: Caps }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10">
      <ul className="flex flex-col gap-6">
        {items.slice(0, 2).map(({ title, description, icon: Icon }) => (
          <li key={title} className="lg:text-right">
            <span className="mb-3 flex size-10 items-center justify-center rounded-full bg-accent text-primary lg:ml-auto">
              <Icon className="size-5" aria-hidden />
            </span>
            <p className="font-medium">{title}</p>
            <p className="mt-1 text-sm text-pretty text-muted-foreground lg:ml-auto lg:max-w-[34ch]">
              {description}
            </p>
          </li>
        ))}
      </ul>

      {/* The hub. Spokes are drawn only from `lg`, where the columns either
          side actually sit where the spokes point. */}
      <div className="relative mx-auto hidden size-40 shrink-0 lg:block">
        <span className="absolute inset-0 rounded-full border border-primary/20" />
        <span className="absolute inset-5 rounded-full border border-primary/30" />
        <span className="absolute inset-0 m-auto flex size-20 items-center justify-center rounded-full bg-primary text-center text-xs leading-tight font-medium text-primary-foreground">
          One
          <br />
          identity
        </span>
        {[0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            aria-hidden
            className="absolute top-1/2 left-1/2 h-px w-20 origin-left bg-primary/25"
            style={{ transform: `rotate(${deg}deg)` }}
          />
        ))}
      </div>

      <ul className="flex flex-col gap-6">
        {items.slice(2).map(({ title, description, icon: Icon }) => (
          <li key={title}>
            <span className="mb-3 flex size-10 items-center justify-center rounded-full bg-accent text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <p className="font-medium">{title}</p>
            <p className="mt-1 max-w-[34ch] text-sm text-pretty text-muted-foreground">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Mosaic: one case given the room, three beside it. */
function CapsMosaic({ items }: { items: Caps }) {
  const [lead, ...rest] = items;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 text-background lg:row-span-3 lg:flex lg:flex-col lg:justify-end">
        <Rings className="pointer-events-none absolute -top-20 -right-24 size-72 text-background/10" />
        <div className="relative">
          <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-background/15">
            <lead.icon className="size-6" aria-hidden />
          </span>
          <p className="text-xl font-semibold tracking-tight text-balance">
            {lead.title}
          </p>
          <p className="mt-3 text-pretty text-background/75">
            {lead.description}
          </p>
        </div>
      </div>

      {rest.map(({ title, description, icon: Icon }) => (
        <div
          key={title}
          className="rounded-3xl border border-border bg-card p-6 lg:col-span-2"
        >
          <div className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-medium">{title}</p>
              <p className="mt-1 max-w-[62ch] text-sm text-pretty text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Ledger: numbered rows on rules, read top to bottom. */
function CapsLedger({ items }: { items: Caps }) {
  return (
    <ol>
      {items.map(({ title, description }, index) => (
        <li
          key={title}
          className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-6 border-t border-border py-6 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-10 lg:py-7"
        >
          <span
            aria-hidden
            className="text-3xl leading-none font-light text-foreground/25 tabular-nums sm:text-4xl"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-medium text-primary">{title}</p>
            <p className="mt-1.5 max-w-[62ch] text-lg text-pretty">
              {description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Channels: four equal columns, because equal weight is the claim. */
function CapsChannels({ items }: { items: Caps }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ title, description, icon: Icon }) => (
        <li
          key={title}
          className="flex flex-col rounded-2xl bg-accent/50 p-6 text-center"
        >
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-card text-primary shadow-sm">
            <Icon className="size-5" aria-hidden />
          </span>
          <p className="mt-5 font-medium text-balance">{title}</p>
          <p className="mt-2 text-sm text-pretty text-muted-foreground">
            {description}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Tiles: four regions, each given the same square of room. */
function CapsTiles({ items }: { items: Caps }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
      {items.map(({ title, description, icon: Icon }) => (
        <li key={title} className="bg-card p-8 lg:p-10">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/20 to-brand-to/10 text-primary">
            <Icon className="size-6" aria-hidden />
          </span>
          <p className="mt-6 text-lg font-semibold tracking-tight">{title}</p>
          <p className="mt-2 max-w-[44ch] text-pretty text-muted-foreground">
            {description}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Stack: branches hanging off one spine. */
function CapsStack({ items }: { items: Caps }) {
  return (
    <ul className="relative ml-4 border-l border-border pl-8 sm:ml-6 sm:pl-12">
      {items.map(({ title, description, icon: Icon }) => (
        <li key={title} className="relative pb-10 last:pb-0">
          {/* The node sits on the spine, not beside it. */}
          <span
            aria-hidden
            className="absolute top-3 -left-[2.3rem] h-px w-6 bg-border sm:-left-[3.3rem] sm:w-10"
          />
          <span className="absolute top-1 -left-[3.05rem] flex size-6 items-center justify-center rounded-full border border-primary/40 bg-background sm:-left-[4.05rem]">
            <span className="size-2 rounded-full bg-primary" />
          </span>

          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-medium">{title}</p>
              <p className="mt-1 max-w-[58ch] text-sm text-pretty text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Capabilities({ variant, items }: { variant: Variant; items: Caps }) {
  if (variant === "radial") return <CapsRadial items={items} />;
  if (variant === "mosaic") return <CapsMosaic items={items} />;
  if (variant === "ledger") return <CapsLedger items={items} />;
  if (variant === "channels") return <CapsChannels items={items} />;
  if (variant === "tiles") return <CapsTiles items={items} />;
  return <CapsStack items={items} />;
}

/* -------------------------------------------------------------------- page */

export function UseCaseSolution({ solution }: { solution: SolutionDetail }) {
  const {
    slug,
    group,
    title,
    shape,
    tagline,
    intro,
    challenge,
    handling,
    capabilities,
    gain,
    idealFor,
  } = solution;

  const variant = VARIANTS[slug] ?? "ledger";
  const centred = variant === "mosaic" || variant === "channels";

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* The corner disc belongs to the pages whose hero leaves a corner
            free. Centred heroes get rings behind the type instead, and the
            reversed one gets nothing — the figure is already the weight. */}
        {(variant === "radial" || variant === "stack") && (
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-32 hidden size-[26rem] rounded-full bg-gradient-to-br from-brand-from/40 via-brand-to/20 to-transparent lg:block lg:size-[34rem]"
          />
        )}
        {/* No backdrop behind a centred hero. The rings that were here ran
            straight through the headline and the body copy, which is exactly
            the job a backdrop must not do — these two pages carry their
            distinctiveness below the buttons instead, where it cannot fight
            the type. */}

        <div
          className={cn(
            "relative mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-20",
            centred && "text-center",
          )}
        >
          <div className={cn(centred && "flex justify-center")}>
            <BackLink group={group} />
          </div>

          {variant === "radial" || variant === "tiles" ? (
            /* Split. `tiles` runs it the other way round, so the two pages
               that both draw a distributed topology do not open alike. */
            <div
              className={cn(
                "mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
                variant === "tiles" && "lg:[&>*:first-child]:order-2",
              )}
            >
              <div>
                <h1 className="max-w-[16ch] text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
                <p className="mt-5 max-w-[42ch] text-lg text-pretty text-primary sm:text-xl">
                  {tagline}
                </p>
                <p className="mt-5 max-w-[52ch] text-pretty text-muted-foreground">
                  {intro}
                </p>
                <Actions className="mt-8" />
              </div>

              <div className="rounded-3xl bg-accent/40 p-8">
                <SolutionIllustration shape={shape} />
              </div>
            </div>
          ) : variant === "ledger" ? (
            /* A ruled left edge, and a narrow measure: this page is a list,
               and it opens like the head of one. */
            <div className="mt-8 border-l-2 border-primary pl-6 sm:pl-8">
              <h1 className="max-w-[14ch] text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-[40ch] text-lg text-pretty text-primary sm:text-xl">
                {tagline}
              </p>
              <p className="mt-5 max-w-[54ch] text-pretty text-muted-foreground">
                {intro}
              </p>
              <Actions className="mt-8" />
            </div>
          ) : variant === "stack" ? (
            /* Copy, then the topology as a full-width band beneath it. */
            <div className="mt-8">
              <h1 className="max-w-[16ch] text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-16">
                <p className="text-lg text-pretty text-primary sm:text-xl">
                  {tagline}
                </p>
                <p className="text-pretty text-muted-foreground">{intro}</p>
              </div>
              <Actions className="mt-8" />
              <div className="mt-12 overflow-hidden rounded-3xl bg-accent/40 px-8 py-6">
                <div className="mx-auto max-w-2xl">
                  <SolutionIllustration shape={shape} />
                </div>
              </div>
            </div>
          ) : (
            /* Centred. */
            <div className="mt-8">
              <h1 className="mx-auto max-w-[18ch] text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mx-auto mt-5 max-w-[46ch] text-lg text-pretty text-primary sm:text-xl">
                {tagline}
              </p>
              <p className="mx-auto mt-5 max-w-[58ch] text-pretty text-muted-foreground">
                {intro}
              </p>
              <Actions className="mt-8 justify-center" />

              {/* Each centred page gets its own thing under the buttons:
                  support draws the call it is about to lose, channels lays
                  out the set its argument rests on. */}
              {variant === "mosaic" && <CallAtRisk />}

              {variant === "channels" && (
                <ul className="mt-12 flex flex-wrap justify-center gap-3">
                  {capabilities.map(({ title: name, icon: Icon }) => (
                    <li
                      key={name}
                      className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm"
                    >
                      <Icon className="size-4 text-primary" aria-hidden />
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------- the problem */}
      {variant === "mosaic" || variant === "channels" ? (
        /* Full-width band: the objection across the top, the answer under it
           on a tint, so a centred hero does not hand off into two columns. */
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10 lg:py-20">
            <Label>The problem</Label>
            <h2 className="mx-auto mt-5 max-w-[20ch] text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl">
              {challenge.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-[58ch] text-lg text-pretty text-muted-foreground">
              {challenge.body}
            </p>
          </div>

          <div className="bg-accent/40">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16 lg:px-10">
              <p className="flex items-start gap-2 text-lg font-semibold tracking-tight text-balance">
                <span
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                {handling.heading}
              </p>
              <div className="space-y-4">
                {handling.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="max-w-[62ch] text-pretty text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : variant === "ledger" ? (
        /* Two columns split by the brand rule — the turn from objection to
           answer marked once, in the gutter. */
        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <Label>The problem</Label>
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
              <span
                aria-hidden
                className="absolute top-0 left-0 hidden h-full w-px bg-gradient-to-b from-brand-from to-brand-to lg:block"
              />
              <p className="text-lg font-semibold tracking-tight">
                {handling.heading}
              </p>
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
      ) : (
        /* Objection left, answer in a tinted panel beside it. */
        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <Label>The problem</Label>
          <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
            <div>
              <h2 className="max-w-[18ch] text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl">
                {challenge.heading}
              </h2>
              <p className="mt-6 max-w-[52ch] text-lg text-pretty text-muted-foreground">
                {challenge.body}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-accent/50 p-7 sm:p-9">
              <Rings className="pointer-events-none absolute -top-16 -right-20 size-72 text-primary/15" />
              <div className="relative">
                <p className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span
                    className="size-1.5 rounded-full bg-primary"
                    aria-hidden
                  />
                  {handling.heading}
                </p>
                <div className="mt-4 space-y-3">
                  {handling.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-pretty text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ what you get */}
      <section
        className={cn(
          "border-y border-border",
          variant === "ledger" &&
            "bg-gradient-to-b from-background via-brand-from/[0.14] to-background",
          variant === "channels" && "bg-muted/40",
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20",
            centred && "text-center",
          )}
        >
          <div className={cn(centred && "flex justify-center")}>
            <Label>What you get</Label>
          </div>

          <div className={cn("mt-8", centred && "text-left lg:mt-12")}>
            <Capabilities variant={variant} items={capabilities} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------ who it's for, and the gain */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
          <div>
            <Label>Who it&rsquo;s for</Label>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {idealFor?.map((item) => (
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

          <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 text-background">
            <Rings className="pointer-events-none absolute -right-24 -bottom-24 size-80 text-background/10" />
            <div className="relative">
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
        </div>
      </section>
    </>
  );
}
