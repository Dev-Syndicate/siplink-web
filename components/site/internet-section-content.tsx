import { Fragment, type ReactNode } from "react";
import { Check } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import type { InternetSection } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * The body of a section, wherever it is rendered.
 *
 * The three connectivity services route their sections as pages and the six
 * network services render theirs inline on the parent, so the same content
 * has to work in a full-width column and in the right half of a two-column
 * split. Everything here is layout-agnostic — internal grids, no assumed
 * container width — which is what lets one component serve both.
 *
 * Blocks appear in the order: body, points, list, interlude, steps, closing.
 * A page can bring the list ahead of the points with `listFirst`; the
 * interlude is a page-supplied block (usually a scene) and is absent unless
 * passed.
 * Since a section sets only some of them, the spacing is worked out from
 * which blocks are present rather than by counting as they render — whichever
 * one comes first gets no top margin. Deriving it up front keeps this a pure
 * render; tracking it with a mutable flag would not be.
 */
/**
 * Column classes for the points grid, chosen from the number of points.
 *
 * A fixed `sm:grid-cols-2 xl:grid-cols-3` left a part-empty last row on most
 * of these sections — four points rendered as three across and a lone one
 * underneath. Counts here run 2, 3, 4, 5, 6 and 8, so the columns are picked
 * per count to divide exactly.
 *
 * The cap is deliberate. This grid renders both at full width on a section
 * page and inside the narrower right-hand column of a service page, and the
 * breakpoints are viewport-based, so they cannot tell the two apart — four
 * columns is the most that stays readable in the narrow case.
 *
 * Five is prime: rather than leave a hole beside the last item, it runs
 * across both columns.
 */
function pointColumns(count: number) {
  if (count === 3) return "sm:grid-cols-3";
  if (count === 6) return "sm:grid-cols-2 xl:grid-cols-3";
  if (count === 8) return "sm:grid-cols-2 xl:grid-cols-4";
  if (count % 2 === 1) return "sm:grid-cols-2 sm:[&>li:last-child]:col-span-2";
  return "sm:grid-cols-2";
}

export function SectionContent({
  section,
  className,
  listFirst = false,
  centerBody = false,
  interlude,
}: {
  section: InternetSection;
  className?: string;
  /** Put the list ahead of the points, for a page that leads with its criteria. */
  listFirst?: boolean;
  /** Centre the opening paragraphs on the page's measure. */
  centerBody?: boolean;
  /** A block rendered after the points and list, before the steps. */
  interlude?: ReactNode;
}) {
  const { body, points, list, listCaption, steps, closing } = section;

  const has = {
    body: Boolean(body?.length),
    points: Boolean(points?.length),
    list: Boolean(list?.length),
    interlude: Boolean(interlude),
    steps: Boolean(steps?.length),
    closing: Boolean(closing),
  };
  type Block = keyof typeof has;
  const middle: Block[] = listFirst ? ["list", "points"] : ["points", "list"];
  const order = (["body", ...middle, "interlude", "steps", "closing"] as Block[]).filter(
    (name) => has[name],
  );

  const spacing = (name: Block) => (order[0] === name ? "mt-0" : "mt-12");

  const renderBody = () =>
    body?.map((paragraph, index) => {
      const margin = index === 0 ? spacing("body") : "mt-4";
      return (
        <ScrollReveal
          as="p"
          key={paragraph}
          delay={index * 70}
          className={cn(
            "max-w-3xl text-lg text-pretty text-muted-foreground",
            centerBody && "mx-auto text-center",
            margin,
          )}
        >
          {paragraph}
        </ScrollReveal>
      );
    });

  const renderInterlude = () => (
    <div className={cn(spacing("interlude"), "lg:mt-20")}>{interlude}</div>
  );

  const renderPoints = () =>
    points?.length ? (
      <ul
        className={cn(
          "grid gap-8",
          pointColumns(points.length),
          spacing("points"),
        )}
      >
        {points.map(({ title, description, icon: Icon }, index) => (
          <ScrollReveal
            as="li"
            key={title}
            delay={index * 60}
            shift={10}
            className="group"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-[1.15rem]" aria-hidden />
            </span>
            <h3 className="mt-4 text-base font-semibold tracking-tight text-balance">
              {title}
            </h3>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">
              {description}
            </p>
          </ScrollReveal>
        ))}
      </ul>
    ) : null;

  const renderList = () =>
    list?.length ? (
      <div className={spacing("list")}>
        {listCaption ? (
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {listCaption}
          </p>
        ) : null}
        <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((item, index) => (
            <ScrollReveal
              as="li"
              key={item}
              delay={Math.min(index * 35, 350)}
              shift={8}
              className="flex items-start gap-2.5 text-sm"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span className="text-muted-foreground">{item}</span>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    ) : null;

  const renderSteps = () =>
    steps?.length ? (
      // Wrapping flex, so the last row fills rather than leaving a bare
      // grey cell in the hairline grid — see the note in NetworkStack.
      <ol
        className={cn(
          "flex flex-wrap gap-px overflow-hidden rounded-2xl bg-border",
          spacing("steps"),
        )}
      >
        {steps.map(({ title, body: stepBody }, index) => (
          <ScrollReveal
            as="li"
            key={title}
            delay={index * 70}
            shift={10}
            className="flex grow basis-56 flex-col bg-background p-6"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-base font-semibold tracking-tight text-balance">
              {title}
            </h3>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">
              {stepBody}
            </p>
          </ScrollReveal>
        ))}
      </ol>
    ) : null;

  const renderClosing = () =>
    closing ? (
      <ScrollReveal
        className={cn(
          "max-w-3xl rounded-2xl border border-border bg-muted/30 p-7",
          spacing("closing"),
        )}
      >
        <h3 className="text-lg font-semibold tracking-tight text-balance">
          {closing.heading}
        </h3>
        <p className="mt-3 text-pretty text-muted-foreground">{closing.body}</p>
      </ScrollReveal>
    ) : null;

  const blocks: Record<Block, () => ReactNode> = {
    body: renderBody,
    points: renderPoints,
    list: renderList,
    interlude: renderInterlude,
    steps: renderSteps,
    closing: renderClosing,
  };

  return (
    <div className={className}>
      {order.map((name) => (
        <Fragment key={name}>{blocks[name]()}</Fragment>
      ))}
    </div>
  );
}
