import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { ScrollReveal } from "@/components/site/scroll-reveal";
import {
  broadbandAddOnSlugs,
  broadbandFeatureCards,
  getInternetService,
  type InternetService,
} from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * Supporting sections for /internet/business-broadband/features.
 *
 * The alternating card-with-diagram rhythm is borrowed from FeatureCards on
 * the home page rather than invented: the site already draws crimson line
 * schematics in ProductIllustration, SolutionIllustration, ConnectivityScene
 * and the integration wall, and a fifth visual language on one site would be
 * one too many.
 *
 * What is different here is that these cards are not links. On the home page
 * each one opens a product; these four describe one service the reader is
 * already on, so turning them into links would send people in a circle.
 */

/** Seconds between one item taking its turn and the next. */
const STEP = 1.1;
const CYCLE = `${STEP * 3}s`;

function turnStyle(index: number) {
  return {
    "--turn-delay": `${index * STEP}s`,
    "--turn-duration": CYCLE,
  } as React.CSSProperties;
}

/** Shared frame, so all four drawings sit on the same optical centre. */
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

/** A line with a pulse running it. */
function Trace({ d, index }: { d: string; index: number }) {
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

function Diagram({ kind }: { kind: (typeof broadbandFeatureCards)[number]["diagram"] }) {
  switch (kind) {
    // Four kinds of traffic arriving on one line at the same moment.
    case "converge": {
      const rows = [26, 70, 114, 158];
      return (
        <Frame>
          {rows.map((y, index) => (
            <g key={y}>
              <circle cx="24" cy={y} r="5" className="fill-primary/25" />
              <circle
                cx="24"
                cy={y}
                r="5"
                className="feature-turn fill-primary"
                style={turnStyle(index % 3)}
              />
              <Trace
                d={`M 36 ${y} C 96 ${y} 96 90 156 90`}
                index={index % 3}
              />
            </g>
          ))}
          <circle cx="176" cy="90" r="18" className="fill-primary/10" />
          <circle cx="176" cy="90" r="7" className="fill-primary" />
          <path
            d="M 194 90 H 336"
            className="stroke-primary/30"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 194 90 H 336"
            pathLength="100"
            className="trace-pulse stroke-primary"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            style={{ "--trace-duration": CYCLE } as React.CSSProperties}
          />
        </Frame>
      );
    }

    // A backup filling the line, with voice keeping a lane of its own.
    case "priority": {
      const wave = [30, 58, 84, 46, 92, 62, 38, 74, 96, 50, 68, 88, 34, 78, 54];
      return (
        <div className="flex w-full max-w-[24rem] flex-col justify-center gap-5">
          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              Backup — fills what is left
            </p>
            <span className="flex h-3 w-full overflow-hidden rounded-full bg-primary/15">
              <span className="scene-jitter h-full w-full origin-left rounded-full bg-primary/40" />
            </span>
          </div>

          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.16em] text-primary uppercase">
              Voice — keeps its lane
            </p>
            <span className="flex h-12 items-center gap-[3px]">
              {wave.map((height, index) => (
                <span
                  key={index}
                  className="wave-bar w-1 shrink-0 rounded-full bg-primary"
                  style={
                    {
                      height: `${height}%`,
                      "--bar-delay": `${index * 0.06}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </span>
          </div>
        </div>
      );
    }

    // The plan stepping up as the business does.
    case "headroom": {
      const steps = [38, 56, 74, 92];
      return (
        <div className="flex w-full max-w-[24rem] flex-col justify-center gap-3">
          <span className="flex h-28 items-end gap-3">
            {steps.map((height, index) => (
              <span
                key={index}
                className="feature-rise flex-1 rounded-t-md bg-primary"
                style={
                  {
                    height: `${height}%`,
                    "--rise-delay": `${index * 0.14}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </span>
          <span className="h-px w-full bg-primary/25" />
          <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>Today</span>
            <span>Next year</span>
          </div>
        </div>
      );
    }

    // One team behind the circuit and everything plugged into it.
    case "onehand": {
      const kit = ["Circuit", "Router", "Wi-Fi", "Switching"];
      return (
        <Frame>
          <circle cx="60" cy="90" r="20" className="fill-primary/10" />
          <circle cx="60" cy="90" r="8" className="fill-primary" />
          <text
            x="60"
            y="130"
            textAnchor="middle"
            className="fill-muted-foreground text-[10px] [font-family:var(--font-mono)]"
          >
            ONE TEAM
          </text>

          {kit.map((label, index) => {
            const y = 24 + index * 44;
            return (
              <g key={label}>
                <Trace d={`M 80 90 C 130 90 130 ${y} 180 ${y}`} index={index % 3} />
                <rect
                  x="180"
                  y={y - 13}
                  width="150"
                  height="26"
                  rx="8"
                  className="fill-none stroke-primary/40"
                  strokeWidth="1.5"
                />
                <rect
                  x="180"
                  y={y - 13}
                  width="150"
                  height="26"
                  rx="8"
                  className="feature-turn fill-primary/12"
                  style={turnStyle(index % 3)}
                />
                <text
                  x="196"
                  y={y + 4}
                  className="fill-foreground text-[11px] [font-family:var(--font-mono)]"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </Frame>
      );
    }
  }
}

export function FeaturesSections() {
  const addOns = broadbandAddOnSlugs
    .map((slug) => getInternetService(slug))
    .filter((item): item is InternetService => Boolean(item));

  return (
    <>
      {/* The four, alternating */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              What makes it a business line
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Four things a consumer connection will not do
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Not speed. Speed is the easy part, and the part every provider
              quotes. These are the four that decide how the line behaves on a
              working Monday.
            </p>
          </ScrollReveal>

          <div className="mt-12 space-y-5">
            {broadbandFeatureCards.map(
              ({ diagram, title, description, detail }, index) => {
                const flipped = index % 2 === 1;

                return (
                  <ScrollReveal
                    key={title}
                    delay={index * 70}
                    shift={16}
                    className="group grid items-center gap-8 rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-primary/40 lg:grid-cols-2 lg:gap-16 lg:p-12"
                  >
                    <div
                      aria-hidden
                      className={cn(
                        "flex h-44 items-center justify-center lg:h-48",
                        flipped && "lg:order-2",
                      )}
                    >
                      <Diagram kind={diagram} />
                    </div>

                    <div className={cn(flipped && "lg:order-1")}>
                      <h3 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-md text-pretty text-muted-foreground">
                        {description}
                      </p>
                      <ul className="mt-6 space-y-2.5">
                        {detail.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm"
                          >
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-primary"
                              aria-hidden
                            />
                            <span className="text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* What layers onto it */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <ScrollReveal className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Add to the line
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              The connection is the start of it
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Each of these can be delivered on the same service and supported
              by the same team. Most businesses take one or two; nobody needs
              all four on day one.
            </p>
          </ScrollReveal>

          <ul className="mt-14 flex flex-wrap gap-px overflow-hidden rounded-2xl bg-border">
            {addOns.map(({ slug, title, tagline, icon: Icon, parent }, index) => (
              <ScrollReveal
                as="li"
                key={slug}
                delay={index * 70}
                shift={12}
                className="flex grow basis-72 bg-background"
              >
                <Link
                  href={
                    parent
                      ? `/internet/network-solutions/${slug}`
                      : `/internet/${slug}`
                  }
                  className="group flex grow flex-col p-8 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-balance">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {tagline}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary">
                    Explore
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
