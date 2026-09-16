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

        {/* Every integration, named. On a phone this stands in for the diagram
            outright: eight plates and eight wires at 400px wide are a smudge,
            and shrinking them to fit would be worse than not drawing them. */}
        <ul className="mt-12 flex flex-wrap justify-center gap-2.5 md:mt-14">
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
