import Image from "next/image";

import { integrations } from "@/lib/site";

/**
 * The eight wired integrations, four a side.
 *
 * Grouped rather than ordered arbitrarily: the left column is where a
 * customer record lives, the right column is where the team talks. That is
 * also the honest shape of the claim — records on one side, conversations on
 * the other, with the phone system in between.
 *
 * `x`/`y` are viewBox units. The plates are HTML positioned over the SVG at
 * the matching percentage rather than drawn inside it, so every logo goes
 * through next/image: eight unoptimised PNGs in `<image>` tags would put
 * about 670KB into this one section.
 *
 * `fill` is how much of the plate the artwork takes. The supplied files carry
 * very different amounts of their own whitespace — CEIPAL and Teams sit in a
 * wide margin, the Salesforce lockup runs to its edges — so a single size
 * would leave the row looking mis-set. These are tuned by eye against the
 * rendered section, not measured, and want revisiting if a file is replaced.
 */
const NODES = [
  { name: "Salesforce", logo: "/integration-logos/salesforce.png", x: 80, y: 65, fill: 84 },
  { name: "Sugar CRM", logo: "/integration-logos/sugar-crm.png", x: 80, y: 195, fill: 92 },
  { name: "Zendesk", logo: "/integration-logos/zendesk.png", x: 80, y: 325, fill: 88 },
  { name: "CEIPAL", logo: "/integration-logos/ceipal.png", x: 80, y: 455, fill: 100 },
  { name: "Microsoft Teams", logo: "/integration-logos/ms-teams.png", x: 820, y: 65, fill: 100 },
  { name: "MS Outlook", logo: "/integration-logos/outlook.png", x: 820, y: 195, fill: 88 },
  { name: "Microsoft Dynamics 365", logo: "/integration-logos/m365.png", x: 820, y: 325, fill: 88 },
  { name: "Google Workspace", logo: "/integration-logos/google-workspace.png", x: 820, y: 455, fill: 84 },
] as const;

/**
 * Eight wires, node to hub, in the same order as `NODES`.
 *
 * Corners are quadratics at a 20-unit radius so every run stays orthogonal:
 * the thing being drawn is a patch panel, and a patch panel has right angles.
 * Written out rather than generated — the geometry is fixed, and a loop would
 * hide where each wire actually goes.
 */
const WIRES = [
  "M 112 65 H 180 Q 200 65 200 85 V 196 Q 200 216 220 216 H 355",
  "M 112 195 H 230 Q 250 195 250 215 V 224 Q 250 244 270 244 H 355",
  "M 112 325 H 230 Q 250 325 250 305 V 296 Q 250 276 270 276 H 355",
  "M 112 455 H 180 Q 200 455 200 435 V 324 Q 200 304 220 304 H 355",
  "M 788 65 H 720 Q 700 65 700 85 V 196 Q 700 216 680 216 H 545",
  "M 788 195 H 670 Q 650 195 650 215 V 224 Q 650 244 630 244 H 545",
  "M 788 325 H 670 Q 650 325 650 305 V 296 Q 650 276 630 276 H 545",
  "M 788 455 H 720 Q 700 455 700 435 V 324 Q 700 304 680 304 H 545",
] as const;

/**
 * Negative, so every wire is already mid-cycle on the first paint — a
 * positive delay holds a wire at its un-animated state until it fires, which
 * renders as a crimson stub parked at the node. Spread unevenly across the
 * 3.2s cycle so the eight never pulse in formation.
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
] as const;

/**
 * The same diagram stacked, for a phone.
 *
 * It gets its own viewBox so the wiring can be drawn rather than assembled
 * out of borders. A straight rule running the full height between two columns
 * reads as a column divider, not a wire — what makes it read as wiring is the
 * corner, so each branch leaves the trunk on a curve the way the runs do on
 * the wide version.
 */
const STACK = { w: 340, h: 510 } as const;
const STACK_ROWS = [130, 235, 340, 445] as const;
const STACK_TRUNK = 170;

const STACK_TRUNK_PATH = `M ${STACK_TRUNK} 76 V ${STACK_ROWS[STACK_ROWS.length - 1]}`;

const STACK_WIRES = STACK_ROWS.flatMap((y) => [
  `M ${STACK_TRUNK} ${y - 36} Q ${STACK_TRUNK} ${y} ${STACK_TRUNK - 26} ${y} H 98`,
  `M ${STACK_TRUNK} ${y - 36} Q ${STACK_TRUNK} ${y} ${STACK_TRUNK + 26} ${y} H 242`,
]);

const VIEW = { w: 900, h: 520 } as const;

/** Percentage of the frame, so the HTML plates track the SVG at every width. */
const pct = (value: number, of: number) => `${(value / of) * 100}%`;

export function IntegrationWall() {
  return (
    <section className="border-b border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl">
            Everything wired to one number
          </h2>
          <p className="mt-5 text-pretty text-background/60">
            SipLink sits in the middle of the tools your team already runs, so
            calls, contacts and records stay in one place.
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
                  because the network does not stop at the eight tools there
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
                    dash definition fits all eight and each pulse crosses at
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
            {NODES.map(({ name, logo, x, y, fill }) => (
              <span
                key={name}
                className="absolute flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-background p-[1.3%] shadow-lg"
                style={{
                  left: pct(x, VIEW.w),
                  top: pct(y, VIEW.h),
                  width: pct(72, VIEW.w),
                }}
              >
                <Image
                  src={logo}
                  alt=""
                  width={72}
                  height={72}
                  sizes="96px"
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

        {/* The phone gets the same diagram, stood on its end.

            Eight plates and eight wires at 390px wide are a smudge, so the
            wide version stays behind `md`. This is not a different design:
            the same trunk, the same curving branches and the same travelling
            pulse, drawn in their own viewBox with the plates laid over them
            by percentage exactly as the wide one is built. */}
        <div
          aria-hidden
          className="relative mx-auto mt-12 w-full max-w-xs md:hidden"
        >
          <svg
            viewBox={`0 0 ${STACK.w} ${STACK.h}`}
            role="presentation"
            className="block h-auto w-full"
          >
            <path
              d={STACK_TRUNK_PATH}
              fill="none"
              strokeWidth="1.5"
              className="stroke-background/30"
            />

            {STACK_WIRES.map((d, index) => (
              <g key={d}>
                <path
                  d={d}
                  fill="none"
                  strokeWidth="1.5"
                  className="stroke-background/30"
                />
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

          <div className="absolute inset-0">
            <span
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-background p-3 shadow-lg"
              style={{
                left: pct(STACK_TRUNK, STACK.w),
                top: pct(38, STACK.h),
                width: pct(150, STACK.w),
              }}
            >
              <Image
                src="/siplink-logo.webp"
                alt=""
                width={300}
                height={135}
                sizes="170px"
                className="h-auto w-full object-contain"
              />
            </span>

            {NODES.map(({ name, logo, fill }, index) => (
              <span
                key={name}
                // Anchored by the top of the plate rather than the middle of
                // the cell: a two-line name makes the cell taller, and
                // centring the cell would lift its plate clear of the branch.
                className="absolute flex -translate-x-1/2 flex-col items-center"
                style={{
                  left: pct(index % 2 === 0 ? 62 : 278, STACK.w),
                  top: pct(STACK_ROWS[Math.floor(index / 2)] - 32, STACK.h),
                  width: pct(112, STACK.w),
                }}
              >
                <span className="flex aspect-square w-[57%] items-center justify-center rounded-2xl bg-background p-1.5 shadow-md">
                  <Image
                    src={logo}
                    alt=""
                    width={64}
                    height={64}
                    sizes="64px"
                    style={{ width: `${fill}%` }}
                    className="h-auto object-contain"
                  />
                </span>
                <span className="mt-2 text-center text-[11px] leading-tight text-background/85">
                  {name}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* The full list. Both pictures above are decorative, so this is the
            only place a screen reader meets the names — it stays in the tree
            at every width, and is only hidden from sight on a phone, where
            the grid already spells each one out. */}
        <ul className="mt-14 hidden flex-wrap justify-center gap-2.5 md:flex">
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
