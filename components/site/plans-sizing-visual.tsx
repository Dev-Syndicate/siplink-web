import {
  Building2,
  CloudUpload,
  Layers,
  User,
  Users,
  Video,
} from "lucide-react";

/**
 * The illustration on /internet/business-broadband/plans.
 *
 * A business network: devices and sites on lit platforms, wired back to a
 * cloud core, with capacity flowing along every link.
 *
 * Built to the supplied mock — light ground, pale pink platforms with a neon
 * under-glow, curved ribbon connectors carrying particles, and floating label
 * chips. Two structural choices follow from that:
 *
 * - The scene is SVG and the labels are HTML on top of it. Chips need crisp
 *   text at any zoom and real icons, which SVG `<text>` would not give; the
 *   percentages that place them are read off the mock.
 * - Every platform is an ellipse pair rather than a true isometric diamond.
 *   The mock is a soft 3/4 render, not a hard dimetric grid, and ellipses are
 *   what give the rounded pill bases their look.
 *
 * All motion is CSS keyframes on SVG — no animation library, seamless loops,
 * sharp at any size. Decorative throughout: the chips repeat what the copy
 * beside the illustration already says, so the whole frame is `aria-hidden`.
 */

const W = 1000;
const H = 760;

/** The core, and everything else measured against it. */
const CORE = { x: 500, y: 408 };

type Node = {
  id: string;
  x: number;
  y: number;
  kind: "laptop" | "phone" | "tablet" | "monitor" | "servers" | "cloudbook";
  /** Where its ribbon leaves the core, and how the curve bows. */
  bow: number;
  delay: number;
};

const nodes: Node[] = [
  { id: "laptop", x: 196, y: 226, kind: "laptop", bow: -74, delay: 0 },
  { id: "phone", x: 132, y: 432, kind: "phone", bow: -26, delay: 0.6 },
  { id: "tablet", x: 232, y: 636, kind: "tablet", bow: 66, delay: 1.2 },
  { id: "monitor", x: 774, y: 226, kind: "monitor", bow: 74, delay: 1.8 },
  { id: "servers", x: 826, y: 436, kind: "servers", bow: 26, delay: 2.4 },
  { id: "cloudbook", x: 762, y: 638, kind: "cloudbook", bow: -66, delay: 3 },
];

/** A ribbon from the core to a node, bowed so the set reads as a spray. */
function ribbon(n: Node) {
  const mx = (CORE.x + n.x) / 2;
  const my = (CORE.y + n.y) / 2 + n.bow;
  return `M${CORE.x} ${CORE.y} Q${mx} ${my} ${n.x} ${n.y}`;
}

/** A lit pill base. Two ellipses and a band, with a glow beneath. */
function Platform({
  cx,
  cy,
  rx,
  ry,
  t = 13,
  delay = 0,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  t?: number;
  delay?: number;
}) {
  return (
    <g>
      {/* The bloom on the floor. */}
      <ellipse
        cx={cx}
        cy={cy + t + 6}
        rx={rx * 1.1}
        ry={ry * 0.9}
        className="net-halo fill-primary/40"
        filter="url(#soft)"
        style={{ "--net-delay": `${delay}s` } as React.CSSProperties}
      />
      {/* Side band, then the two faces. */}
      <path
        d={`M${cx - rx} ${cy} V${cy + t} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + t} V${cy} Z`}
        className="fill-primary/25"
      />
      <ellipse cx={cx} cy={cy + t} rx={rx} ry={ry} className="fill-primary/30" />
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        className="fill-background stroke-primary/50"
        strokeWidth="1.5"
      />
      {/* The lit rim, which is what makes the base read as emissive. */}
      <ellipse
        cx={cx}
        cy={cy + t}
        rx={rx}
        ry={ry}
        fill="none"
        className="stroke-primary"
        strokeWidth="2.5"
        filter="url(#soft)"
      />
    </g>
  );
}

/** Screen glass, shared by every device that has a display. */
function Screen({
  x,
  y,
  w,
  h,
  r = 4,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      className="fill-primary/10 stroke-primary/50"
      strokeWidth="1.5"
    />
  );
}

function Device({ kind, x, y }: { kind: Node["kind"]; x: number; y: number }) {
  switch (kind) {
    // A laptop showing a bar chart.
    case "laptop":
      return (
        <g>
          <Screen x={x - 58} y={y - 78} w={116} h={72} />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={x - 42 + i * 22}
              y={y - 22 - (14 + i * 9)}
              width={12}
              height={14 + i * 9}
              rx="2"
              className="net-twinkle fill-primary"
              style={{ "--net-delay": `${i * 0.3}s` } as React.CSSProperties}
            />
          ))}
          <path
            d={`M${x - 70} ${y} L${x - 58} ${y - 6} H${x + 58} L${x + 70} ${y} Z`}
            className="fill-background stroke-primary/50"
            strokeWidth="1.5"
          />
        </g>
      );

    // A phone mid-call.
    case "phone":
      return (
        <g>
          <rect
            x={x - 26}
            y={y - 92}
            width={52}
            height={92}
            rx="9"
            className="fill-background stroke-primary/50"
            strokeWidth="1.5"
          />
          <rect
            x={x - 20}
            y={y - 85}
            width={40}
            height={78}
            rx="6"
            className="fill-primary/10"
          />
          <circle
            cx={x}
            cy={y - 56}
            r="13"
            className="net-arrive fill-primary"
            style={{ "--net-duration": "2.6s" } as React.CSSProperties}
          />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={x - 14 + i * 11}
              y={y - 30}
              width={8}
              height={8}
              rx="2"
              className="fill-primary/40"
            />
          ))}
        </g>
      );

    // A tablet on a video call.
    case "tablet":
      return (
        <g>
          <rect
            x={x - 74}
            y={y - 96}
            width={148}
            height={96}
            rx="8"
            className="fill-background stroke-primary/50"
            strokeWidth="1.5"
          />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x={x - 66 + (i % 2) * 68}
                y={y - 88 + Math.floor(i / 2) * 42}
                width={62}
                height={38}
                rx="4"
                className="fill-primary/10"
              />
              <circle
                cx={x - 35 + (i % 2) * 68}
                cy={y - 74 + Math.floor(i / 2) * 42}
                r="6"
                className="net-twinkle fill-primary"
                style={{ "--net-delay": `${i * 0.5}s` } as React.CSSProperties}
              />
            </g>
          ))}
        </g>
      );

    // A desktop monitor with a desk phone beside it.
    case "monitor":
      return (
        <g>
          <Screen x={x - 78} y={y - 96} w={132} h={84} />
          <path
            d={`M${x - 62} ${y - 34} L${x - 40} ${y - 56} L${x - 18} ${y - 42} L${x + 6} ${y - 70} L${x + 30} ${y - 50}`}
            fill="none"
            className="stroke-primary"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={`M${x - 16} ${y - 12} V${y - 4} M${x - 34} ${y - 4} H${x + 2}`}
            className="stroke-primary/50"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* The desk phone. */}
          <rect
            x={x + 40}
            y={y - 40}
            width={34}
            height={40}
            rx="5"
            className="fill-background stroke-primary/50"
            strokeWidth="1.5"
          />
          <rect
            x={x + 46}
            y={y - 52}
            width={22}
            height={10}
            rx="5"
            className="fill-primary"
          />
        </g>
      );

    // A stack of servers.
    case "servers":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={x - 54}
                y={y - 30 - i * 30}
                width={108}
                height={26}
                rx="5"
                className="fill-background stroke-primary/50"
                strokeWidth="1.5"
              />
              <circle
                cx={x - 38}
                cy={y - 17 - i * 30}
                r="5"
                className="net-twinkle fill-primary"
                style={{ "--net-delay": `${i * 0.45}s` } as React.CSSProperties}
              />
              {[0, 1, 2].map((j) => (
                <rect
                  key={j}
                  x={x - 18 + j * 22}
                  y={y - 21 - i * 30}
                  width={14}
                  height={8}
                  rx="2"
                  className="fill-primary/25"
                />
              ))}
            </g>
          ))}
        </g>
      );

    // A laptop pushing to the cloud.
    default:
      return (
        <g>
          <Screen x={x - 58} y={y - 78} w={116} h={72} />
          <path
            d={`M${x - 20} ${y - 34} a16 16 0 0 1 4 -31 a20 20 0 0 1 36 6 a13 13 0 0 1 -2 25 Z`}
            className="fill-primary/20 stroke-primary"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d={`M${x + 6} ${y - 30} V${y - 48} M${x - 1} ${y - 41} L${x + 6} ${y - 48} L${x + 13} ${y - 41}`}
            fill="none"
            className="net-arrive stroke-primary"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ "--net-duration": "2.4s" } as React.CSSProperties}
          />
          <path
            d={`M${x - 70} ${y} L${x - 58} ${y - 6} H${x + 58} L${x + 70} ${y} Z`}
            className="fill-background stroke-primary/50"
            strokeWidth="1.5"
          />
        </g>
      );
  }
}

/** The labels, placed as percentages read off the mock. */
const chips = [
  { icon: Users, label: "Employees", left: "38%", top: "7%" },
  { icon: Building2, label: "Office Branches", left: "79%", top: "7%" },
  { icon: User, label: "Remote Teams", left: "13%", top: "43%" },
  { icon: Layers, label: "Business Apps", left: "88%", top: "42%" },
  { icon: Video, label: "Video Meetings", left: "41%", top: "95%" },
  { icon: CloudUpload, label: "Cloud Services", left: "88%", top: "70%" },
];

export function PlansSizingVisual() {
  return (
    <div className="@container relative isolate overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-accent/50 via-background to-accent/25 shadow-xl shadow-primary/10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 -z-10 size-72 rounded-full bg-brand-from/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-28 -z-10 size-80 rounded-full bg-brand-to/15 blur-3xl"
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden
        role="presentation"
        className="relative h-auto w-full"
      >
        <defs>
          <filter id="soft" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bloom" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* Ribbons, behind everything that stands on a platform. */}
        {nodes.map((n) => {
          const d = ribbon(n);
          const vars = {
            "--net-duration": "3.4s",
            "--net-delay": `${n.delay}s`,
          } as React.CSSProperties;

          return (
            <g key={`link-${n.id}`}>
              <path
                d={d}
                fill="none"
                className="stroke-primary/45"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* A second, offset strand, so the link reads as a ribbon of
                  traffic rather than a single wire. */}
              <path
                d={d}
                fill="none"
                pathLength={100}
                className="stroke-primary/20"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <path
                d={d}
                fill="none"
                pathLength={100}
                className="net-packet stroke-primary"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#soft)"
                style={vars}
              />
              <path
                d={d}
                fill="none"
                pathLength={100}
                className="net-packet stroke-primary/70"
                strokeWidth="2"
                strokeLinecap="round"
                style={
                  {
                    ...vars,
                    "--net-delay": `${n.delay + 1.2}s`,
                  } as React.CSSProperties
                }
              />
            </g>
          );
        })}

        {/* The core: buildings on a wide platform, under a cloud. */}
        <g
          className="net-drift"
          style={
            { "--net-duration": "17s", "--net-y": "-4px" } as React.CSSProperties
          }
        >
          <Platform cx={CORE.x} cy={CORE.y + 26} rx={132} ry={38} t={16} />

          {[
            { dx: -54, h: 74, w: 34 },
            { dx: -16, h: 108, w: 38 },
            { dx: 26, h: 88, w: 34 },
            { dx: 62, h: 62, w: 28 },
          ].map(({ dx, h, w }, i) => (
            <g key={dx}>
              <rect
                x={CORE.x + dx - w / 2}
                y={CORE.y + 20 - h}
                width={w}
                height={h}
                rx="3"
                className="fill-background stroke-primary/50"
                strokeWidth="1.5"
              />
              {[0, 1, 2, 3].map((r) => (
                <rect
                  key={r}
                  x={CORE.x + dx - w / 2 + 6}
                  y={CORE.y + 8 - h + r * 18}
                  width={w - 12}
                  height={7}
                  rx="1.5"
                  className="net-twinkle fill-primary/50"
                  style={
                    {
                      "--net-delay": `${(i + r) * 0.28}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </g>
          ))}

          {/* Rain of capacity, from the cloud into the buildings. */}
          {[-40, -12, 16, 44].map((dx, i) => (
            <path
              key={dx}
              d={`M${CORE.x + dx} ${CORE.y - 118} V${CORE.y - 76}`}
              pathLength={100}
              className="net-packet stroke-primary"
              strokeWidth="3"
              strokeLinecap="round"
              style={
                {
                  "--net-duration": "1.9s",
                  "--net-delay": `${i * 0.45}s`,
                } as React.CSSProperties
              }
            />
          ))}

          {/* The cloud, and the signal coming off it. */}
          <g
            className="net-drift"
            style={
              {
                "--net-duration": "7s",
                "--net-y": "-9px",
              } as React.CSSProperties
            }
          >
            <ellipse
              cx={CORE.x}
              cy={CORE.y - 166}
              rx={86}
              ry={40}
              className="fill-primary/25"
              filter="url(#bloom)"
            />
            <path
              d={`M${CORE.x - 84} ${CORE.y - 138}
                  a44 44 0 0 1 14 -80
                  a56 56 0 0 1 104 12
                  a38 38 0 0 1 -4 68 Z`}
              className="fill-background stroke-primary/60"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* A signal mark inside the cloud: concentric arcs over a dot. */}
            {[16, 29, 42].map((r, i) => {
              const cx = CORE.x;
              const cy = CORE.y - 146;
              const k = 0.707;
              return (
                <path
                  key={r}
                  d={`M${cx - r * k} ${cy - r * k} A${r} ${r} 0 0 1 ${cx + r * k} ${cy - r * k}`}
                  fill="none"
                  className="net-arrive stroke-primary"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={
                    {
                      "--net-duration": "2.8s",
                      "--net-delay": `${i * 0.26}s`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
            <circle
              cx={CORE.x}
              cy={CORE.y - 140}
              r="5"
              className="fill-primary"
            />
          </g>
        </g>

        {/* The devices, each drifting on its own clock. */}
        {nodes.map((n, i) => (
          <g
            key={n.id}
            className="net-drift"
            style={
              {
                "--net-duration": `${8 + i * 1.4}s`,
                "--net-y": i % 2 ? "-9px" : "-6px",
                "--net-delay": `${i * 0.5}s`,
              } as React.CSSProperties
            }
          >
            <Platform cx={n.x} cy={n.y} rx={86} ry={25} delay={n.delay} />
            <Device kind={n.kind} x={n.x} y={n.y} />
          </g>
        ))}
      </svg>

      {/* Labels. HTML rather than SVG text, so they stay crisp and can carry
          real icons; positions are read off the mock. */}
      {chips.map(({ icon: Icon, label, left, top }, i) => (
        <span
          key={label}
          aria-hidden
          style={
            {
              left,
              top,
              "--net-duration": `${9 + i * 1.1}s`,
              "--net-y": i % 2 ? "-7px" : "-5px",
              "--net-delay": `${i * 0.6}s`,
            } as React.CSSProperties
          }
          className="net-drift absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.5em] rounded-full border border-primary/15 bg-background/90 px-[0.85em] py-[0.45em] text-[clamp(8px,2.05cqw,13px)] shadow-lg shadow-primary/10 backdrop-blur-sm"
        >
          <Icon className="size-[1.15em] shrink-0 text-primary" />
          <span className="font-medium whitespace-nowrap">{label}</span>
        </span>
      ))}
    </div>
  );
}
