import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { homeFeatures, type HomeFeature } from "@/lib/site";

/**
 * The schematic drawn beside each feature.
 *
 * Line diagrams in the brand crimson, sitting straight on the white card with
 * no panel of their own — so the card is the only surface in the section, and
 * the drawing reads as part of it rather than a screenshot pasted onto it.
 *
 * Drawing rather than depicting UI is also what lets these join the vocabulary
 * the site already has: product-illustration, solution-illustration and the
 * integration wall are all crimson schematics. A seventh visual language on
 * one homepage would be one too many.
 *
 * The six are deliberately different shapes. A branching tree and a queue
 * feeding a hub would otherwise read as the same picture twice, which is the
 * trap with a set this size — so the routing diagram carries the calls that
 * are waiting, which the IVR tree has no equivalent of.
 *
 * All of it is hidden from assistive tech: the heading and sentence beside
 * each diagram already say what it draws.
 *
 * Nothing here is a claim. Numbers are masked, the chart carries no values,
 * and the names are wireframe filler.
 */

/** Waveform bar heights, as a percentage of the strip. */
const WAVE = [
  28, 46, 72, 38, 90, 54, 34, 66, 96, 42, 58, 80, 30, 70, 50, 88, 36, 62, 44,
  76, 92, 32, 54, 68, 40, 84, 48, 60, 94, 36, 72, 52, 26, 78, 44, 66, 86, 38,
  56, 74, 30, 64, 90, 46, 34, 70, 50, 82,
];

/** Twelve columns of call volume. A shape, not data — no values are shown. */
const CHART = [38, 56, 44, 70, 52, 84, 62, 48, 76, 58, 92, 66];

const MENU = [
  { key: "1", label: "Sales" },
  { key: "2", label: "Support" },
  { key: "3", label: "Billing" },
];

const SEATS = ["Ravi", "Priya", "Arun"];

const MESSAGES = [
  "Your verification code is 4821",
  "Reminder: appointment tomorrow, 10:00",
  "Payment received — thank you",
];

const NUMBERS = [
  { value: "+91 44 ••• ••••", label: "Direct dial" },
  { value: "1800 ••• ••••", label: "Toll-free" },
  { value: "+1 307 ••• ••••", label: "Ported in" },
];

/** Seconds between one item taking its turn and the next. */
const STEP = 1.2;

/** One full pass over three items. */
const CYCLE = `${STEP * 3}s`;

/** Shared frame, so all six diagrams sit on the same optical centre. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 360 180"
      role="presentation"
      className="h-full w-full max-w-[24rem]"
    >
      {children}
    </svg>
  );
}

function turnStyle(index: number) {
  return {
    "--turn-delay": `${index * STEP}s`,
    "--turn-duration": CYCLE,
  } as React.CSSProperties;
}

/** One branch of a fan: its resting line, and the pulse that runs it. */
function Branch({ d, index }: { d: string; index: number }) {
  return (
    <>
      <path d={d} className="stroke-primary/25" strokeWidth="1.5" fill="none" />
      <path
        d={d}
        pathLength="100"
        className="trace-pulse stroke-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        style={
          {
            "--trace-delay": `${index * STEP}s`,
            "--trace-duration": CYCLE,
          } as React.CSSProperties
        }
      />
    </>
  );
}

function Diagram({
  id,
  icon: Icon,
}: {
  id: HomeFeature["id"];
  icon: LucideIcon;
}) {
  switch (id) {
    // A caller choosing. The digits are the keypad keys they press, which is
    // why this diagram is labelled with numbers and none of the others are.
    case "ivr":
      return (
        <Frame>
          <path
            d="M 18 90 H 96"
            className="stroke-primary/30"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="18" cy="90" r="5" className="fill-primary" />

          {MENU.map(({ key, label }, index) => {
            const y = 34 + index * 56;

            return (
              <g key={key}>
                <Branch d={`M 96 90 C 126 90 126 ${y} 156 ${y}`} index={index} />
                <circle cx="156" cy={y} r="5" className="fill-primary/20" />
                <circle
                  cx="156"
                  cy={y}
                  r="5"
                  className="feature-turn fill-primary"
                  style={turnStyle(index)}
                />
                <text
                  x="174"
                  y={y + 4}
                  className="fill-primary font-mono text-[11px] font-medium"
                >
                  {key}
                </text>
                <text x="192" y={y + 4} className="fill-foreground text-[12px]">
                  {label}
                </text>
              </g>
            );
          })}
        </Frame>
      );

    // Calls holding, then a hub handing each one to whoever is free. The
    // stack on the left is what keeps this from being the IVR tree again.
    case "routing":
      return (
        <Frame>
          {[0, 1, 2].map((index) => (
            <circle
              key={index}
              cx={18 + index * 18}
              cy="90"
              r="5"
              className="fill-primary/25"
            />
          ))}

          <path
            d="M 62 90 H 102"
            className="stroke-primary/30"
            strokeWidth="1.5"
            fill="none"
          />

          <circle cx="120" cy="90" r="16" className="fill-primary/10" />
          <circle cx="120" cy="90" r="6" className="fill-primary" />

          {SEATS.map((name, index) => {
            const y = 34 + index * 56;

            return (
              <g key={name}>
                <Branch
                  d={`M 136 90 C 166 90 166 ${y} 196 ${y}`}
                  index={index}
                />
                {/* An open seat is a ring; the seat taking the call fills. */}
                <circle
                  cx="196"
                  cy={y}
                  r="6"
                  className="fill-none stroke-primary/40"
                  strokeWidth="1.5"
                />
                <circle
                  cx="196"
                  cy={y}
                  r="6"
                  className="feature-turn fill-primary"
                  style={turnStyle(index)}
                />
                <text x="214" y={y + 4} className="fill-foreground text-[12px]">
                  {name}
                </text>
              </g>
            );
          })}
        </Frame>
      );

    case "recording":
      return (
        <div className="flex w-full max-w-[24rem] flex-col justify-center gap-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-medium text-primary">
              <Icon className="size-4" />
              Recording
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              00:42
            </span>
          </div>

          {/* Fixed-width bars with real gaps between them, and the hero's own
              waveform class, so the two read as the same instrument. */}
          <span className="flex h-20 items-center gap-[3px]">
            {WAVE.map((height, index) => (
              <span
                key={index}
                className="wave-bar w-0.5 shrink-0 rounded-full bg-primary"
                style={
                  {
                    height: `${height}%`,
                    "--bar-delay": `${index * 0.04}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </span>

          <span className="h-px w-full bg-primary/15" />
        </div>
      );

    case "sms":
      return (
        <div className="flex w-full max-w-[22rem] flex-col gap-2.5">
          {MESSAGES.map((message, index) => (
            <span
              key={message}
              className="feature-arrive self-start rounded-2xl rounded-bl-sm bg-primary px-4 py-2.5 text-xs leading-snug text-primary-foreground"
              style={
                { "--arrive-delay": `${index * 0.9}s` } as React.CSSProperties
              }
            >
              {message}
            </span>
          ))}
        </div>
      );

    case "analytics":
      return (
        <div className="flex w-full max-w-[24rem] flex-col justify-center gap-3">
          <span className="flex h-24 items-end gap-1.5">
            {CHART.map((height, index) => (
              <span
                key={index}
                className="feature-rise flex-1 rounded-t-sm bg-primary"
                style={
                  {
                    height: `${height}%`,
                    "--rise-delay": `${index * 0.08}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </span>

          <span className="h-px w-full bg-primary/25" />

          <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>
      );

    case "numbers":
      return (
        <div className="flex w-full max-w-[22rem] flex-col gap-2.5">
          {NUMBERS.map(({ value, label }, index) => (
            <span
              key={label}
              className="relative flex items-center gap-3 overflow-hidden rounded-full border border-primary/25 px-4 py-2.5"
            >
              <span
                className="feature-turn absolute inset-0 bg-primary/10"
                style={turnStyle(index)}
              />
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-primary/25" />
                <span
                  className="feature-turn absolute inset-0 rounded-full bg-primary"
                  style={turnStyle(index)}
                />
              </span>
              <span className="relative font-mono text-xs">{value}</span>
              <span className="relative ml-auto text-[11px] text-muted-foreground">
                {label}
              </span>
            </span>
          ))}
        </div>
      );
  }
}

/**
 * Capabilities.
 *
 * Six cards stacked, the diagram changing sides on each one. The alternation
 * earns its place: at this width, six rows built the same way would let the
 * eye run straight down the text column and skip every drawing.
 *
 * Below `lg` the split collapses and the diagram always leads, because a
 * single narrow column that alternated would read as a mistake rather than a
 * rhythm.
 */
export function FeatureCards() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Features
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              What you can actually do with it
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              A phone system is really the sum of what happens to a call once
              it arrives. Each of these opens onto its own page, with the full
              detail.
            </p>
          </div>

          <Button asChild variant="outline" size="lg">
            <Link href="/products">See all products</Link>
          </Button>
        </div>

        <div className="mt-12 space-y-5">
          {homeFeatures.map(
            ({ id, title, description, href, icon: Icon }, index) => {
              const flipped = index % 2 === 1;

              return (
                <Link
                  key={id}
                  href={href}
                  className="group grid items-center gap-8 rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-primary/40 focus-visible:outline-2 focus-visible:-outline-offset-4 lg:grid-cols-2 lg:gap-16 lg:p-12"
                >
                  <div
                    aria-hidden
                    className={cn(
                      "flex h-44 items-center justify-center lg:h-48",
                      flipped && "lg:order-2",
                    )}
                  >
                    <Diagram id={id} icon={Icon} />
                  </div>

                  <div className={cn(flipped && "lg:order-1")}>
                    <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                      {title}
                    </h3>

                    <p className="mt-3 max-w-md text-pretty text-muted-foreground">
                      {description}
                    </p>

                    {/* The rule draws in from the left on hover. The whole card
                        is the link, so an arrow would be saying it twice. */}
                    <span className="relative mt-6 inline-block text-sm font-medium text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
                      Explore {title}
                    </span>
                  </div>
                </Link>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
