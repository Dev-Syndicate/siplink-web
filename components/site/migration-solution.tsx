import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CtaPanel } from "@/components/site/cta-panel";
import { CloudScene } from "@/components/site/cloud-scene";
import { PbxScene } from "@/components/site/pbx-scene";
import { PortingScene } from "@/components/site/porting-scene";
import { PriScene } from "@/components/site/pri-scene";
import { Button } from "@/components/ui/button";
import { solutionDetails, type SolutionDetail } from "@/lib/solutions";
import { cn } from "@/lib/utils";

/**
 * The four Migration solutions.
 *
 * These pages sell a project rather than a product: a reader here is deciding
 * whether to risk the phones, not comparing features. They also arrive not
 * necessarily knowing what a PRI is, what lives inside a PBX, or what porting
 * actually moves — so each page leads with a figure that answers its own
 * question, and the four figures share no geometry at all.
 *
 * The four also carry the same six-step process, which is the one genuine
 * ordered sequence on this site and the one place numerals are load-bearing.
 * Because it is the same six steps every time, it is the biggest risk of the
 * group reading as a template — so each page sets it differently, and the
 * heroes and capability sections differ too.
 *
 *   pri-migration    split       ceiling      stepped rail across the top
 *   pbx-migration    stacked     transfer     two ladders, before and after
 *   cloud-migration  reversed    scatter      vertical spine
 *   number-porting   split       swap         numbered rows on rules
 *
 * Porting was built on a centred axis, the number being the fixed point of
 * that page. It now takes the same split as the PRI page, to the site's
 * convention of copy left and figure right. That costs the two pages their
 * different hero geometry, so what keeps porting from reading as another
 * instance of the PRI page is carried below the fold instead: its answer
 * sits in a tinted panel rather than against a gradient rule, its process is
 * numbered rows on rules rather than a stepped rail, and its capabilities
 * are cards. Those treatments never depended on the centring.
 */

type Shape = "ceiling" | "transfer" | "scatter" | "swap";

const SHAPES: Record<string, Shape> = {
  "pri-migration": "ceiling",
  "pbx-migration": "transfer",
  "cloud-migration": "scatter",
  "number-porting": "swap",
};

/** The question the figure above it is answering, in one line. */
const FIGURE_LEAD: Record<Shape, string> = {
  ceiling: "A PRI carries one call per channel, and the channels are fixed.",
  transfer: "A PBX migration moves the configuration, not the hardware.",
  scatter: "On the cloud, the phone system stops being a place.",
  swap: "Porting changes who carries the number, not the number.",
};

export function MigrationSolution({ solution }: { solution: SolutionDetail }) {
  const {
    slug,
    group,
    title,
    tagline,
    intro,
    challenge,
    handling,
    capabilities,
    process,
    gain,
  } = solution;

  const shape = SHAPES[slug] ?? "ceiling";
  const siblings = solutionDetails.filter(
    (item) => item.group === group && item.slug !== slug,
  );

  const back = (
    <Link
      href="/solutions"
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
    >
      <ArrowLeft className="size-3.5" aria-hidden />
      {group}
    </Link>
  );

  const actions = (
    <div className="flex flex-wrap gap-3">
      <Button asChild size="lg">
        <Link href="/contact">Plan your migration</Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <Link href="/pricing">View pricing</Link>
      </Button>
    </div>
  );

  const lead = (
    <>
      <h1 className="max-w-[15ch] text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-[42ch] text-lg text-pretty text-primary sm:text-xl">
        {tagline}
      </p>
      <p className="mt-5 max-w-[54ch] text-pretty text-muted-foreground">
        {intro}
      </p>
    </>
  );

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-20">
          {back}

          {(shape === "ceiling" || shape === "swap") && (
            /* Split: copy left, figure right. The ceiling reads left to
               right and porting reads end to end, so both sit in a column
               beside the copy rather than under it. */
            <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-14">
              <div>
                {lead}
                <div className="mt-8">{actions}</div>
              </div>
              <div>
                {shape === "swap" ? (
                  <PortingScene label="A customer dials the same business number before and after porting. The call first runs through the old provider, then the number ports and the same call runs through SipLink to the same desk." />
                ) : (
                  <PriScene label="A PRI circuit fills all twelve of its channels and refuses the next caller as engaged. On SIP the same caller connects, because capacity is not a fixed bank of lines." />
                )}
                <p className="mt-4 text-sm text-pretty text-muted-foreground">
                  {FIGURE_LEAD[shape]}
                </p>
              </div>
            </div>
          )}

          {shape === "transfer" && (
            /* Stacked. The transfer needs the full width to read as one thing
               crossing to another, so the copy sits above it. */
            <div className="mt-8">
              {/* Copy and buttons stacked rather than set against a second
                  column: the schematic below already takes the full width, and
                  floating the buttons opposite the paragraph left a hole
                  between them. */}
              <div className="max-w-[54ch]">
                {lead}
                <div className="mt-8">{actions}</div>
              </div>
              <div className="mt-14">
                <PbxScene label="A PBX migration carries the configuration across: extensions, departments, call flows, routing rules, business hours and voicemail each move from the on-premise PBX into SipLink under the same names." />
                <p className="mt-4 text-sm text-pretty text-muted-foreground">
                  {FIGURE_LEAD.transfer}
                </p>
              </div>
            </div>
          )}

          {shape === "scatter" && (
            /* Reversed. The figure is a place, so it takes the left — the eye
               starts on the building and reads out to the copy. */
            <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
              <div>
                <CloudScene label="One business number and four people — at the head office, at home, at a branch and on the road — on the same phone system in the cloud, each answering calls wherever they are." />
                <p className="mt-4 text-sm text-pretty text-muted-foreground">
                  {FIGURE_LEAD.scatter}
                </p>
              </div>
              <div>
                {lead}
                <div className="mt-8">{actions}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------- worry and answer */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <div
          className={cn(
            shape === "swap"
              ? "max-w-3xl"
              : "grid gap-12 lg:grid-cols-2 lg:gap-16",
          )}
        >
          <div>
            <h2
              className={cn(
                "text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl",
                shape === "swap" ? "max-w-[20ch]" : "max-w-[18ch]",
              )}
            >
              {challenge.heading}
            </h2>
            <p
              className={cn(
                "mt-6 text-lg text-pretty text-muted-foreground",
                shape === "swap" ? "max-w-[58ch]" : "max-w-[52ch]",
              )}
            >
              {challenge.body}
            </p>
          </div>

          <div
            className={cn(
              shape === "swap"
                ? "mt-10 rounded-3xl bg-accent/50 p-7 sm:p-9"
                : "relative lg:pl-16",
            )}
          >
            {shape !== "swap" && (
              <span
                aria-hidden
                className="absolute top-0 left-0 hidden h-full w-px bg-gradient-to-b from-brand-from to-brand-to lg:block"
              />
            )}
            <h3 className="text-xl font-semibold tracking-tight">
              {handling.heading}
            </h3>
            <div className="mt-4 space-y-4">
              {handling.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="max-w-[56ch] text-pretty text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- the process
          Same six steps on all four pages, which makes this the group's
          biggest risk of reading as a template — so each page sets them a
          different way. */}
      {process ? (
        <section className="border-y border-border bg-gradient-to-b from-background via-brand-from/[0.12] to-background">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
            <h2 className="max-w-[22ch] text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              How the move runs, start to finish
            </h2>
            <p className="mt-3 max-w-[58ch] text-pretty text-muted-foreground">
              Nothing moves until the new environment has been built and checked
              against what you run today.
            </p>

            {shape === "ceiling" && (
              /* A rail: six stops read left to right, the way a circuit does. */
              <ol className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {process.map((step, index) => (
                  <li
                    key={step.title}
                    className="border-t-2 border-border pt-5"
                  >
                    <span
                      aria-hidden
                      className="text-sm font-medium text-primary tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            )}

            {shape === "transfer" && (
              /* Two ladders: the work before the switch, and the work after
                 it. The split is real — step five is the cutover. */
              <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
                {[
                  {
                    label: "Before anything moves",
                    steps: process.slice(0, 4),
                    from: 0,
                  },
                  {
                    label: "At the switch, and after",
                    steps: process.slice(4),
                    from: 4,
                  },
                ].map((group) => (
                  <div key={group.label}>
                    <p className="border-b border-border pb-3 text-sm font-medium text-primary">
                      {group.label}
                    </p>
                    <ol className="mt-5 space-y-6">
                      {group.steps.map((step, index) => (
                        <li key={step.title} className="flex gap-4">
                          <span
                            aria-hidden
                            className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-xs font-medium text-primary tabular-nums"
                          >
                            {String(group.from + index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="font-semibold tracking-tight">
                              {step.title}
                            </h3>
                            <p className="mt-1.5 max-w-[46ch] text-sm text-pretty text-muted-foreground">
                              {step.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}

            {shape === "scatter" && (
              /* A spine, because this page is about things hanging off one
                 point rather than sitting in a row. */
              <ol className="relative mt-12 ml-5 border-l border-border pl-8 sm:ml-8 sm:pl-14">
                {process.map((step, index) => (
                  <li key={step.title} className="relative pb-9 last:pb-0">
                    <span
                      aria-hidden
                      className="absolute -left-[2.6rem] flex size-9 items-center justify-center rounded-full border border-primary/35 bg-background text-sm font-medium text-primary tabular-nums sm:-left-[4.1rem] sm:size-11 sm:text-base"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[62ch] text-pretty text-muted-foreground">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            )}

            {shape === "swap" && (
              /* Rules, with the numeral set large and light in the margin. */
              <ol className="mt-10">
                {process.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-6 border-t border-border py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-10"
                  >
                    <span
                      aria-hidden
                      className="text-3xl leading-none font-light text-foreground/25 tabular-nums sm:text-4xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold tracking-tight text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-[64ch] text-pretty text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      ) : null}

      {/* -------------------------------------------- what the move gives you */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          What the move gives you
        </h2>

        {shape === "transfer" || shape === "swap" ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ title: name, description, icon: Icon }) => (
              <li
                key={name}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-4 font-medium text-balance">{name}</p>
                <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <dl className="mt-10 grid gap-x-16 sm:grid-cols-2">
            {capabilities.map(({ title: name, description, icon: Icon }) => (
              <div
                key={name}
                className="flex items-start gap-4 border-t border-border py-5"
              >
                <Icon
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden
                />
                <div className="min-w-0">
                  <dt className="font-medium">{name}</dt>
                  <dd className="mt-1 max-w-[58ch] text-sm text-pretty text-muted-foreground">
                    {description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        )}
      </section>

      {/* The result the source document closes each of these four with.

          This was a two-column section with `idealFor` on the left — but none
          of the four migrations carries that field, so the left half rendered
          an empty div and left half the section blank. Full width, one thing,
          no hole. */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <CtaPanel
            eyebrow="Planned cutover &middot; Numbers ported"
            heading={gain.heading}
            body={gain.body}
          />
        </div>
      </section>

      {/* A reader here often does not yet know which of the four they are. */}
      {siblings.length ? (
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-16">
            <h2 className="text-lg font-semibold tracking-tight">
              Other ways in
            </h2>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {siblings.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="flex h-full flex-col gap-2 bg-card p-6 transition-colors hover:bg-muted focus-visible:bg-muted"
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
