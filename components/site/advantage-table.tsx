import { Check, Crown } from "lucide-react";

import { RevealGroup } from "@/components/site/reveal-group";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { site, whyComparison } from "@/lib/site";

/**
 * SipLink against a typical provider, as three cards side by side with the
 * SipLink card raised in the middle.
 *
 * One CSS grid, not three cards: each row's three cells share a grid row, so
 * they stay level however the SipLink detail line wraps. The three card
 * surfaces are grid items of their own, spanning every row behind the cells.
 * Rows are `display: contents` wrappers carrying the table roles, which is
 * also what lets a hover anywhere on the row tint all three cells.
 *
 * Motion, all in CSS (`.adv-*` in globals.css) and all off under reduced
 * motion: the whole comparison rises in once when scrolled to, the checks pop
 * in one after another, and the SipLink card glows once and settles.
 */

/** Header row is grid row 1; data row n sits on grid row n + 2. */
const gridRow = (row: number) => ({ gridRow: row + 2 });

function SipLinkHeader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 bg-gradient-to-r from-brand-from to-brand-to px-6 py-5 text-primary-foreground",
        className,
      )}
    >
      <span className="font-heading text-xl font-semibold tracking-tight">
        {site.name}
      </span>
      <Badge className="h-7 gap-1.5 bg-background px-3 text-primary">
        <Crown aria-hidden />
        Most recommended
      </Badge>
    </div>
  );
}

function CheckMark({ row }: { row: number }) {
  return (
    <span
      aria-hidden
      style={{ "--row": row } as React.CSSProperties}
      className="adv-check flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
    >
      <Check className="size-3.5" strokeWidth={3} />
    </span>
  );
}

export function AdvantageTable() {
  const last = whyComparison.length - 1;

  return (
    <RevealGroup className="mt-14 lg:mt-16">
      {/* Phones: the raised card alone, each row naming the point it
          answers and the typical provider's answer beneath. */}
      {/* Rise and glow on separate elements: both are animations, and on
          one element the glow would replace the rise and leave the card
          stuck at its hidden starting state. */}
      <div className="reveal-item md:hidden">
      <div className="adv-glow overflow-hidden rounded-2xl bg-card ring-1 ring-primary/15">
        <SipLinkHeader />
        <ul className="divide-y divide-primary/10 bg-gradient-to-b from-primary/5 to-transparent">
          {whyComparison.map(
            ({ point, siplink, detail, typical, icon: Icon }, row) => (
              <li key={point} className="px-5 py-4">
                <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Icon className="size-3.5 text-primary" aria-hidden />
                  {point}
                </p>
                <div className="mt-2.5 flex items-start gap-3">
                  <CheckMark row={row} />
                  <div>
                    <p className="text-sm font-semibold">
                      <span className="sr-only">{site.name}: </span>
                      {siplink}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {detail}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 pl-9 text-xs text-muted-foreground">
                  Typical provider: {typical}
                </p>
              </li>
            ),
          )}
        </ul>
      </div>
      </div>

      <div
        role="table"
        aria-label={`${site.name} compared with a typical provider`}
        // Rows declared up front: `row-span-full` on the card surfaces only
        // reaches explicit rows, and implicit ones would leave them one
        // row tall.
        style={{
          gridTemplateRows: `repeat(${whyComparison.length + 1}, auto)`,
        }}
        className="reveal-item relative hidden grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] md:grid"
      >
        {/* The three card surfaces, behind the cells. The middle one runs
            past the others top and bottom, which is what raises it. */}
        <div
          aria-hidden
          className="col-start-1 row-span-full row-start-1 rounded-l-2xl border border-r-0 border-border bg-card shadow-sm"
        />
        <div
          aria-hidden
          className="col-start-3 row-span-full row-start-1 rounded-r-2xl border border-l-0 border-border bg-card shadow-sm"
        />
        <div
          aria-hidden
          className="adv-glow relative z-10 col-start-2 row-span-full row-start-1 -my-3 rounded-2xl bg-card bg-gradient-to-b from-primary/5 to-primary/[0.02] shadow-xl ring-1 shadow-primary/10 ring-primary/15"
        />

        <div role="row" className="contents">
          <div
            role="columnheader"
            className="relative z-20 col-start-1 row-start-1 flex items-center rounded-tl-2xl border-b border-border bg-muted/50 px-6 py-5 text-sm font-medium text-muted-foreground"
          >
            Feature
          </div>
          <div
            role="columnheader"
            className="relative z-20 col-start-2 row-start-1 -mt-3"
          >
            {/* The negative margin already stretches this cell to the raised
                card's top edge, so the header only has to fill it. */}
            <SipLinkHeader className="h-full rounded-t-2xl" />
          </div>
          <div
            role="columnheader"
            className="relative z-20 col-start-3 row-start-1 flex items-center rounded-tr-2xl border-b border-border bg-muted/50 px-6 py-5 font-heading text-base font-semibold"
          >
            Typical provider
          </div>
        </div>

        {whyComparison.map(
          ({ point, siplink, detail, typical, icon: Icon }, row) => {
            const end = row === last;

            return (
              <div key={point} role="row" className="group/row contents">
                <div
                  role="rowheader"
                  style={gridRow(row)}
                  className={cn(
                    "relative z-20 col-start-1 flex items-center gap-3.5 px-6 py-4 text-sm font-medium transition-colors group-hover/row:bg-primary/4",
                    end ? "rounded-bl-2xl" : "border-b border-border",
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {point}
                </div>

                <div
                  role="cell"
                  style={gridRow(row)}
                  className={cn(
                    "relative z-20 col-start-2 flex items-start gap-3.5 px-6 py-4 transition-colors group-hover/row:bg-primary/6",
                    !end && "border-b border-primary/10",
                  )}
                >
                  <CheckMark row={row} />
                  <div>
                    <p className="text-sm font-semibold">{siplink}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {detail}
                    </p>
                  </div>
                </div>

                <div
                  role="cell"
                  style={gridRow(row)}
                  className={cn(
                    "relative z-20 col-start-3 flex items-center gap-3 px-6 py-4 text-sm text-muted-foreground transition-colors group-hover/row:bg-primary/4",
                    end ? "rounded-br-2xl" : "border-b border-border",
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {typical}
                </div>
              </div>
            );
          },
        )}
      </div>
    </RevealGroup>
  );
}
