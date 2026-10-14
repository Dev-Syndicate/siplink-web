import Image from "next/image";

import { integrationLogos, integrations } from "@/lib/site";

/**
 * The ten wired integrations, five a side.
 *
 * Grouped rather than ordered arbitrarily: the left column is the system that
 * holds the customer, the right column is where the team actually works — the
 * workplace suites, the channel people message on, and the two desks (support
 * and recruiting) that are somebody's whole day. That is also the honest shape
 * of the claim: records on one side, the places work happens on the other,
 * with the phone system in between.
 *
 * The names, files and `fill` come from `integrationLogos` in lib/site.ts,
 * which the four business-size pages read as well — the list used to exist
 * five times over. Only the position belongs to this drawing, so only the
 * position is written here: the first five sit left in order, the rest right.
 *
 * `x`/`y` are viewBox units. The plates are HTML positioned over the SVG at
 * the matching percentage rather than drawn inside it, so every logo goes
 * through next/image: ten unoptimised PNGs in `<image>` tags would put about
 * 720KB into this one section.
 */
const ROWS = [45, 152, 260, 368, 475] as const;

const NODES = integrationLogos.map((logo, index) => ({
  ...logo,
  x: index < 5 ? 80 : 820,
  y: ROWS[index % 5],
}));

/**
 * Ten wires, node to hub, in the same order as `NODES`.
 *
 * Corners are quadratics at a 20-unit radius so every run stays orthogonal:
 * the thing being drawn is a patch panel, and a patch panel has right angles.
 * Written out rather than generated — the geometry is fixed, and a loop would
 * hide where each wire actually goes.
 *
 * The rows are symmetrical about the hub's own centre line, so the middle pair
 * needs no corners at all: it runs straight in along the bus. The outer pairs
 * turn wide at x=200/700 and the inner pairs turn close at x=250/650, which is
 * what stops five runs a side from stacking into a single thick band.
 */
const WIRES = [
  "M 128 45 H 180 Q 200 45 200 65 V 192 Q 200 212 220 212 H 355",
  "M 128 152 H 230 Q 250 152 250 172 V 216 Q 250 236 270 236 H 355",
  "M 128 260 H 355",
  "M 128 368 H 230 Q 250 368 250 348 V 304 Q 250 284 270 284 H 355",
  "M 128 475 H 180 Q 200 475 200 455 V 328 Q 200 308 220 308 H 355",
  "M 772 45 H 720 Q 700 45 700 65 V 192 Q 700 212 680 212 H 545",
  "M 772 152 H 670 Q 650 152 650 172 V 216 Q 650 236 630 236 H 545",
  "M 772 260 H 545",
  "M 772 368 H 670 Q 650 368 650 348 V 304 Q 650 284 630 284 H 545",
  "M 772 475 H 720 Q 700 475 700 455 V 328 Q 700 308 680 308 H 545",
] as const;

/**
 * Negative, so every wire is already mid-cycle on the first paint — a
 * positive delay holds a wire at its un-animated state until it fires, which
 * renders as a crimson stub parked at the node. Spread unevenly across the
 * 3.2s cycle so the ten never pulse in formation, and the two straight middle
 * runs are kept far apart in the cycle because they are the pair the eye
 * follows most easily.
 */
const DELAYS = [
  "0s",
  "-1.9s",
  "-0.7s",
  "-2.6s",
  "-1.2s",
  "-2.9s",
  "-0.4s",
  "-2.2s",
  "-1.5s",
  "-3.05s",
] as const;

/**
 * The phone version's one wire, hub to panel. Normalised to 100 units like
 * the wide wires, so it shares their dash and pulse.
 */
const PHONE_WIRE = "M 2 0 V 48";

const VIEW = { w: 900, h: 520 } as const;

/** Percentage of the frame, so the HTML plates track the SVG at every width. */
const pct = (value: number, of: number) => `${(value / of) * 100}%`;

export function IntegrationWall({
  heading = "Everything wired to one number",
  description = "SipLink sits in the middle of the tools your team already runs, so calls, contacts and records stay in one place.",
}: {
  heading?: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-5 text-pretty text-background/60">
            {description}
          </p>
        </div>

        {/* Decorative: the list underneath names every integration in a form a
            screen reader can use, so this is hidden rather than read twice. */}
        <div
          aria-hidden
          className="relative mx-auto mt-14 hidden w-full max-w-5xl md:block"
        >
          <svg
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            role="presentation"
            className="block h-auto w-full"
          >
            <defs>
              {/* The bus the hub sits on. It runs past both edges and fades,
                  because the network does not stop at the ten tools there
                  was room to draw. */}
              <linearGradient id="integration-bus" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="currentColor" stopOpacity="0" />
                <stop offset="0.5" stopColor="currentColor" stopOpacity="0.2" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>

              {/* A tight lift behind the hub, and nothing more. Spread any
                  wider and it stops being hierarchy and starts being a
                  gradient wash across the middle of the section. */}
              <radialGradient id="integration-halo">
                <stop
                  offset="0"
                  className="text-primary"
                  stopColor="currentColor"
                  stopOpacity="0.5"
                />
                <stop
                  offset="1"
                  className="text-primary"
                  stopColor="currentColor"
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>

            <line
              x1="0"
              y1="260"
              x2={VIEW.w}
              y2="260"
              stroke="url(#integration-bus)"
              strokeWidth="1"
            />

            <ellipse
              cx="450"
              cy="260"
              rx="150"
              ry="92"
              fill="url(#integration-halo)"
            />

            {WIRES.map((d, index) => (
              <g key={d}>
                <path
                  d={d}
                  fill="none"
                  strokeWidth="1.5"
                  className="stroke-background/30"
                />
                {/* `pathLength` normalises every wire to 100 units, so one
                    dash definition fits all ten and each pulse crosses at
                    the same speed — without it the short middle wires would
                    fire twice while the long corner ones fired once. */}
                <path
                  d={d}
                  fill="none"
                  pathLength="100"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="signal-path stroke-primary"
                  style={
                    { "--signal-delay": DELAYS[index] } as React.CSSProperties
                  }
                />
              </g>
            ))}
          </svg>

          {/* Plates. Every one of these logos is drawn for a white ground, so
              they sit on one: the Zendesk teal and the black bar under the
              Microsoft mark would otherwise vanish into the section. */}
          <div className="absolute inset-0">
            {NODES.map(({ name, src, w, h, x, y, fill }) => (
              <span
                key={name}
                // 104 x 72 rather than square. Nine of the ten marks are
                // wide lockups; on a square plate a 7:1 wordmark covers a
                // tenth of it and reads as tiny however high the fill goes.
                // Widening the plate is what actually makes them legible.
                className="absolute flex aspect-[104/72] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-background px-[1.2%] shadow-lg"
                style={{
                  left: pct(x, VIEW.w),
                  top: pct(y, VIEW.h),
                  width: pct(104, VIEW.w),
                }}
              >
                <Image
                  src={src}
                  alt=""
                  width={w}
                  height={h}
                  sizes="140px"
                  style={{ width: `${fill}%` }}
                  className="h-auto object-contain"
                />
              </span>
            ))}

            {/* The hub. Bigger, brighter, and the only thing with a halo. */}
            <span
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-background shadow-2xl"
              style={{
                left: pct(450, VIEW.w),
                top: pct(260, VIEW.h),
                width: pct(190, VIEW.w),
                height: pct(116, VIEW.h),
              }}
            >
              <Image
                src="/siplink-logo.webp"
                alt=""
                width={300}
                height={135}
                sizes="256px"
                className="w-[68%] object-contain"
              />
            </span>
          </div>
        </div>

        {/* The phone gets the same idea, simplified: the hub, one live wire,
            and a patch panel of the ten tools it plugs into.

            It used to be the wide diagram stood on its end — ten curving
            branches with plates laid over them by percentage. At phone
            widths the branches read as stray forks, the plates and labels
            crowded both edges, and any change in text size knocked the
            absolutely positioned pieces out of line. A real grid cannot
            overflow, and keeps the plates big enough to read. */}
        <div
          aria-hidden
          className="mx-auto mt-12 flex w-full max-w-sm flex-col items-center md:hidden"
        >
          <span className="flex w-36 items-center justify-center rounded-2xl bg-background p-3 shadow-lg">
            <Image
              src="/siplink-logo.webp"
              alt=""
              width={300}
              height={135}
              sizes="144px"
              className="h-auto w-full object-contain"
            />
          </span>

          <svg
            viewBox="0 0 4 48"
            role="presentation"
            className="block h-12 w-1 overflow-visible"
          >
            <path
              d={PHONE_WIRE}
              fill="none"
              strokeWidth="1.5"
              className="stroke-background/30"
            />
            <path
              d={PHONE_WIRE}
              fill="none"
              pathLength="100"
              strokeWidth="3"
              strokeLinecap="round"
              className="signal-path stroke-primary"
            />
          </svg>

          <div className="grid w-full grid-cols-2 gap-2.5 rounded-3xl border border-background/15 p-2.5">
            {/* No captions: every mark here spells its own name, and the
                list below names them for screen readers. */}
            {NODES.map(({ name, src, w, h, fill }) => (
              <span
                key={name}
                className="flex aspect-[3/2] items-center justify-center rounded-2xl bg-background px-4 shadow-md"
              >
                <Image
                  src={src}
                  alt=""
                  width={w}
                  height={h}
                  sizes="120px"
                  style={{ width: `${fill}%` }}
                  className="h-auto object-contain"
                />
              </span>
            ))}
          </div>
        </div>

        {/* The full list. Both pictures above are decorative, so this is the
            only place a screen reader meets the names — it stays in the tree
            at every width, and is only hidden from sight on a phone, where
            the grid already spells each one out. */}
        <ul className="sr-only md:not-sr-only md:mt-14 md:flex md:flex-wrap md:justify-center md:gap-2.5">
          {integrations.map((name) => (
            <li
              key={name}
              className="rounded-full border border-background/20 px-4 py-2 text-sm font-medium"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
