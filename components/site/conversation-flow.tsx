"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { conversationStages } from "@/lib/product-story";

/**
 * The page signature: one customer conversation followed from the moment it
 * reaches the business to the moment it becomes information. Selecting a
 * stage reveals the products doing the work there.
 *
 * The stages are a real sequence, so the connecting track carries meaning
 * rather than decoration.
 */
export function ConversationFlow() {
  const [active, setActive] = useState(conversationStages[0].id);
  const stage =
    conversationStages.find((item) => item.id === active) ??
    conversationStages[0];

  // Arrow-key navigation, as the tabs pattern expects.
  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: conversationStages.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;

    event.preventDefault();
    const wrapped =
      (target + conversationStages.length) % conversationStages.length;
    const next = conversationStages[wrapped];
    setActive(next.id);
    document.getElementById(`stage-tab-${next.id}`)?.focus();
  }

  return (
    <div>
      {/* Stage selector — a track the conversation travels along. */}
      <div
        role="tablist"
        aria-label="Stages of a customer conversation"
        className="relative grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {conversationStages.map((item, index) => {
          const isActive = item.id === stage.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`stage-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`stage-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "group relative flex flex-col gap-3 bg-background p-6 text-left transition-colors",
                "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                isActive ? "bg-primary/5" : "hover:bg-muted/60",
              )}
            >
              {/* Progress rail: filled up to and including the active stage. */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 transition-colors",
                  isActive ? "bg-primary" : "bg-transparent",
                )}
              />

              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                <span
                  className={cn(
                    "font-mono text-sm font-medium tabular-nums transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground/60",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Track linking the stages into a sequence. */}
                {index < conversationStages.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-border lg:block"
                  />
                ) : null}
              </span>

              <span>
                <span
                  className={cn(
                    "block text-lg font-semibold tracking-tight transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
                <span className="mt-1 block text-sm text-pretty text-muted-foreground">
                  {item.question}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active stage detail */}
      <div
        role="tabpanel"
        id={`stage-panel-${stage.id}`}
        aria-labelledby={`stage-tab-${stage.id}`}
        className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16"
      >
        <div>
          <h3 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {stage.heading}
          </h3>
          <p className="mt-4 text-pretty text-muted-foreground">{stage.body}</p>
        </div>

        {/* Hairline dividers rather than a filled grid, so an odd number of
            products does not leave an empty cell. */}
        <ul className="grid self-start overflow-hidden rounded-xl border border-border sm:grid-cols-2">
          {stage.products.map((product) => (
            <li
              key={product.slug}
              className="border-b border-border last:border-b-0 sm:odd:border-r sm:odd:last:border-r-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
            >
              <Link
                href={`/products/${product.slug}`}
                className="group flex h-full items-start justify-between gap-4 p-5 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
              >
                <span className="min-w-0">
                  <span className="block font-medium">{product.title}</span>
                  <span className="mt-1 block text-sm text-pretty text-muted-foreground">
                    {product.note}
                  </span>
                </span>
                <ArrowRight
                  className="mt-1 size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
