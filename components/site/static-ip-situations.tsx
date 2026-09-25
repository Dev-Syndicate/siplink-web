"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { staticIpSituations } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * Pick the situation you are actually in.
 *
 * Deliberately click-driven rather than on a timer. The Plans page already
 * has an auto-advancing timeline, and this is a different kind of thing: a
 * reader arrives here knowing which of the six they are, so moving the panel
 * underneath them would be taking away the one choice they came to make.
 * Nothing here moves on its own, so there is no WCAG 2.2.2 obligation and no
 * pause control to get wrong.
 *
 * It is a tablist, so arrow keys move between the six and the panel is bound
 * to the selected tab rather than swapped beneath it.
 */
export function StaticIpSituations() {
  const [active, setActive] = useState(0);
  const current = staticIpSituations[active];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!step) return;
    event.preventDefault();
    const next =
      (active + step + staticIpSituations.length) % staticIpSituations.length;
    setActive(next);
    document.getElementById(`situation-tab-${next}`)?.focus();
  };

  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Situations that need a static IP"
        onKeyDown={onKeyDown}
        className="flex flex-col gap-2"
      >
        {staticIpSituations.map(({ id, label, icon: Icon }, index) => {
          const selected = index === active;

          return (
            <button
              key={id}
              id={`situation-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="situation-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors focus-visible:outline-none",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40 hover:bg-muted/50 focus-visible:border-primary",
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary",
                )}
              >
                <Icon className="size-4" aria-hidden />
              </span>
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  selected ? "text-primary" : "text-foreground",
                )}
              >
                {label}
              </span>
              <ArrowRight
                aria-hidden
                className={cn(
                  "ml-auto size-4 transition-all",
                  selected
                    ? "translate-x-0 text-primary opacity-100"
                    : "-translate-x-1 opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        id="situation-panel"
        role="tabpanel"
        aria-labelledby={`situation-tab-${active}`}
        tabIndex={0}
        className="rounded-2xl border border-border bg-background p-8 focus-visible:outline-none lg:p-10"
      >
        {/* Keyed on `active`, so the panel re-enters on each change rather
            than the words swapping in place. */}
        <div key={active} className="panel-enter">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            You are trying to
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-balance">
            {current.job}
          </p>

          <div className="mt-8 border-t border-border pt-6">
            <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
              Why a fixed address
            </p>
            <p className="mt-3 text-pretty text-muted-foreground">
              {current.why}
            </p>
          </div>

          <div className="mt-7">
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Usually alongside
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {current.alongside.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground"
                >
                  <Check className="size-3.5 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Button asChild className="mt-8">
            <Link href="/internet/static-ip/add-static-ip">
              Add a static IP
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
