import { cn } from "@/lib/utils";

/**
 * Schematic illustrations for the solution pages, in the same visual language
 * as ProductIllustration — inline SVG from theme tokens, a faint grid field
 * for depth, layered strokes and a single glowing active path. Each solution
 * gets a diagram of its actual topology rather than a stock picture.
 *
 * Keyed by a `shape` so several slugs can share one diagram (e.g. every
 * migration page is a legacy→cloud transition).
 */
type Props = {
  shape: string;
  className?: string;
};

/** Shared defs: grid, edge fade and the glow filter. */
function Defs({ uid }: { uid: string }) {
  return (
    <defs>
      <pattern
        id={`sgrid-${uid}`}
        width="24"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M24 0H0V24"
          fill="none"
          className="stroke-foreground/[0.06]"
          strokeWidth="1"
        />
      </pattern>

      <radialGradient id={`sfade-${uid}`} cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>

      <mask id={`sgridmask-${uid}`}>
        <rect x="0" y="0" width="440" height="280" fill={`url(#sfade-${uid})`} />
      </mask>

      <filter id={`sglow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/** A device chassis: outline, header dot and content rows. */
function Chassis({
  x,
  y,
  w,
  h,
  rows = 1,
  active = false,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rows?: number;
  active?: boolean;
  label?: string;
}) {
  const rowGap = rows > 1 ? (h - 26) / rows : 0;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="8"
        className={cn("fill-background", active ? "stroke-primary" : "stroke-border")}
        strokeWidth={active ? 1.75 : 1.25}
      />
      <path
        d={`M${x} ${y + 18} H${x + w}`}
        className={active ? "stroke-primary/40" : "stroke-border"}
        strokeWidth="1.25"
      />
      <circle
        cx={x + 12}
        cy={y + 9}
        r="2.5"
        className={active ? "fill-primary" : "fill-muted-foreground/35"}
      />
      {label ? (
        <text
          x={x + 22}
          y={y + 12.5}
          className={cn(
            "text-[8px] font-medium [font-family:var(--font-mono)]",
            active ? "fill-primary" : "fill-muted-foreground/70",
          )}
        >
          {label}
        </text>
      ) : null}
      {rows > 1
        ? Array.from({ length: rows }).map((_, index) => (
            <path
              key={index}
              d={`M${x + 12} ${y + 30 + index * rowGap} H${x + w - 12 - (index % 2) * 14}`}
              className={active && index === 1 ? "stroke-primary/70" : "stroke-border"}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))
        : null}
    </g>
  );
}

/** The animated packet travelling the active path. */
function Flow({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      strokeLinecap="round"
      strokeWidth="2.5"
      className="flow-path stroke-primary"
    />
  );
}

/** A simple cloud glyph anchored at (x,y) top-left of a ~86×46 box. */
function Cloud({ x, y, active = true }: { x: number; y: number; active?: boolean }) {
  return (
    <path
      d={`M${x + 18} ${y + 30}c-9 0-16-7-16-16s7-16 16-16c2-10 12-18 24-18 10 0 19 6 23 15 11 0 20 9 20 20s-9 20-20 20z`}
      className={cn("fill-background", active ? "stroke-primary" : "stroke-primary/40")}
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  );
}

/** A person node: head + shoulders inside a ring. */
function Node({
  cx,
  cy,
  active = false,
  r = 15,
}: {
  cx: number;
  cy: number;
  active?: boolean;
  r?: number;
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        className={cn("fill-background", active ? "stroke-primary" : "stroke-border")}
        strokeWidth={active ? 1.75 : 1.25}
      />
      <circle
        cx={cx}
        cy={cy - r * 0.28}
        r={r * 0.32}
        className={active ? "fill-primary" : "fill-muted-foreground/40"}
      />
      <path
        d={`M${cx - r * 0.5} ${cy + r * 0.55} a${r * 0.5} ${r * 0.45} 0 0 1 ${r} 0`}
        className={active ? "fill-primary" : "fill-muted-foreground/40"}
      />
    </g>
  );
}

/**
 * DISTRIBUTED — one hub in the centre, endpoints radiating out. Serves remote
 * workforce, global offices, multi-branch: one business, many locations.
 */
function DistributedDiagram({ uid }: { uid: string }) {
  const spokes = [
    { x: 70, y: 78, active: false },
    { x: 372, y: 82, active: false },
    { x: 64, y: 196, active: true },
    { x: 378, y: 194, active: false },
    { x: 220, y: 62, active: false },
  ];
  const hub = { x: 222, y: 140 };

  return (
    <>
      {spokes.map((s, i) => {
        const d = `M${s.x} ${s.y} C ${(s.x + hub.x) / 2} ${s.y}, ${(s.x + hub.x) / 2} ${hub.y}, ${hub.x} ${hub.y}`;
        return (
          <g key={i}>
            <path
              d={d}
              fill="none"
              strokeWidth={s.active ? "1.75" : "1.25"}
              className={s.active ? "stroke-primary/70" : "stroke-primary/25"}
            />
            {s.active ? <Flow d={d} /> : null}
            <Node cx={s.x} cy={s.y} active={s.active} />
          </g>
        );
      })}

      {/* Central hub */}
      <circle
        cx={hub.x}
        cy={hub.y}
        r="26"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <circle cx={hub.x} cy={hub.y} r="7" className="fill-primary" filter={`url(#sglow-${uid})`} />
      <text
        x={hub.x}
        y={hub.y + 44}
        textAnchor="middle"
        className="fill-muted-foreground/70 text-[8px] font-medium [font-family:var(--font-mono)]"
      >
        SIPLINK
      </text>
    </>
  );
}

/**
 * ROUTED — callers arrive, route through a decision point to the right team.
 * Serves customer support and sales: get the conversation to the right place.
 */
function RoutedDiagram({ uid }: { uid: string }) {
  const teams = [
    { y: 74, label: "TEAM A", active: false },
    { y: 122, label: "TEAM B", active: true },
    { y: 170, label: "TEAM C", active: false },
  ];

  return (
    <>
      {/* Inbound callers */}
      {[112, 140, 168].map((y, i) => (
        <Node key={y} cx={52} cy={y} r={11} active={i === 1} />
      ))}
      <path
        d="M64 140 H110"
        className="stroke-primary/70"
        strokeWidth="1.75"
        fill="none"
      />

      {/* Router node */}
      <rect
        x="110"
        y="116"
        width="48"
        height="48"
        rx="10"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <circle cx="134" cy="140" r="6" className="fill-primary" filter={`url(#sglow-${uid})`} />
      <text
        x="134"
        y="110"
        textAnchor="middle"
        className="fill-primary text-[8px] font-medium [font-family:var(--font-mono)]"
      >
        ROUTE
      </text>

      {teams.map(({ y, label, active }) => {
        const d = `M158 140 C 196 140, 200 ${y + 23}, 236 ${y + 23}`;
        return (
          <g key={y}>
            <path
              d={d}
              fill="none"
              strokeWidth={active ? "1.75" : "1.25"}
              className={active ? "stroke-primary/70" : "stroke-primary/25"}
            />
            {active ? <Flow d={d} /> : null}
            <Chassis x={236} y={y} w={168} h={46} active={active} label={label} />
          </g>
        );
      })}
    </>
  );
}

/**
 * CONVERGE — several channels merging into one unified surface.
 * Serves unified communications.
 */
function ConvergeDiagram({ uid }: { uid: string }) {
  const channels = [
    { y: 78, label: "VOICE", active: false },
    { y: 116, label: "VIDEO", active: true },
    { y: 154, label: "CHAT", active: false },
    { y: 192, label: "APPS", active: false },
  ];
  const hub = { x: 300, y: 140 };

  return (
    <>
      {channels.map(({ y, label, active }) => {
        const d = `M164 ${y + 15} C 226 ${y + 15}, 240 ${hub.y}, ${hub.x - 4} ${hub.y}`;
        return (
          <g key={y}>
            <Chassis x={40} y={y} w={124} h={30} active={active} label={label} />
            <path
              d={d}
              fill="none"
              strokeWidth={active ? "1.75" : "1.25"}
              className={active ? "stroke-primary/70" : "stroke-primary/25"}
            />
            {active ? <Flow d={d} /> : null}
          </g>
        );
      })}

      <circle
        cx={hub.x}
        cy={hub.y}
        r="30"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <circle cx={hub.x} cy={hub.y} r="7" className="fill-primary" filter={`url(#sglow-${uid})`} />
      <text
        x={hub.x + 44}
        y={hub.y + 4}
        textAnchor="middle"
        className="fill-muted-foreground/70 text-[8px] font-medium [font-family:var(--font-mono)]"
      >
        ONE HUB
      </text>
    </>
  );
}

/**
 * SCALE — a stack that grows, small to large. Serves the business-size pages:
 * the same platform from startup to enterprise.
 */
function ScaleDiagram({ uid }: { uid: string }) {
  const bars = [
    { x: 60, h: 40, active: false },
    { x: 132, h: 72, active: false },
    { x: 204, h: 108, active: true },
    { x: 276, h: 150, active: false },
  ];
  const base = 214;
  const w = 56;

  return (
    <>
      <path d={`M44 ${base} H392`} className="stroke-border" strokeWidth="1.5" />
      {bars.map((b, i) => {
        const top = base - b.h;
        return (
          <g key={b.x}>
            <rect
              x={b.x}
              y={top}
              width={w}
              height={b.h}
              rx="6"
              className={cn("fill-background", b.active ? "stroke-primary" : "stroke-border")}
              strokeWidth={b.active ? 1.75 : 1.25}
            />
            {/* Stacked unit rows */}
            {Array.from({ length: i + 1 }).map((_, r) => (
              <path
                key={r}
                d={`M${b.x + 10} ${top + 14 + r * 16} h${w - 20}`}
                className={b.active && r === 0 ? "stroke-primary/70" : "stroke-border"}
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
            {b.active ? (
              <circle
                cx={b.x + w / 2}
                cy={top - 12}
                r="5"
                className="fill-primary"
                filter={`url(#sglow-${uid})`}
              />
            ) : null}
          </g>
        );
      })}
      {/* Growth arrow along the tops */}
      <path
        d="M70 178 C 150 150, 240 96, 322 58"
        fill="none"
        className="stroke-primary/40"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        d="M314 54l10 3-3 10"
        fill="none"
        className="stroke-primary"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/**
 * TRANSITION — a legacy system on the left crosses a boundary into the cloud.
 * Serves every migration page: PRI/PBX/on-prem → SipLink cloud.
 */
function TransitionDiagram({ uid }: { uid: string }) {
  return (
    <>
      {/* Legacy system */}
      <Chassis x={40} y={104} w={110} h={72} rows={3} label="LEGACY" />
      <text
        x="95"
        y="192"
        textAnchor="middle"
        className="fill-muted-foreground/60 text-[8px] font-medium [font-family:var(--font-mono)]"
      >
        PRI / PBX
      </text>

      {/* The crossing */}
      <path
        d="M150 140 H300"
        className="stroke-primary"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <Flow d="M150 140 H300" />
      <path
        d="M292 133l10 7-10 7"
        className="stroke-primary"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Boundary line the packet crosses */}
      <path
        d="M225 96 V184"
        className="stroke-border"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />
      <text
        x="225"
        y="90"
        textAnchor="middle"
        className="fill-muted-foreground/60 text-[8px] font-medium [font-family:var(--font-mono)]"
      >
        CUT OVER
      </text>

      {/* Cloud destination */}
      <Cloud x={300} y={110} />
      <circle cx="343" cy="140" r="6" className="fill-primary" filter={`url(#sglow-${uid})`} />
      <text
        x="343"
        y="192"
        textAnchor="middle"
        className="fill-primary text-[8px] font-medium [font-family:var(--font-mono)]"
      >
        SIPLINK CLOUD
      </text>
    </>
  );
}

/**
 * EDGE — many enterprise systems meeting at one controlled edge, out to the
 * carrier. Serves the enterprise page.
 */
function EdgeDiagram({ uid }: { uid: string }) {
  const systems = [
    { y: 70, label: "TEAMS", active: false },
    { y: 122, label: "PBX", active: true },
    { y: 174, label: "CRM", active: false },
  ];

  return (
    <>
      {systems.map(({ y, label, active }) => {
        const d = `M158 ${y + 23} C 190 ${y + 23}, 194 140, 216 140`;
        return (
          <g key={y}>
            <Chassis x={34} y={y} w={124} h={46} active={active} label={label} />
            <path
              d={d}
              fill="none"
              strokeWidth={active ? "1.75" : "1.25"}
              className={active ? "stroke-primary/70" : "stroke-primary/25"}
            />
            {active ? <Flow d={d} /> : null}
          </g>
        );
      })}

      <rect
        x="216"
        y="80"
        width="58"
        height="120"
        rx="14"
        className="fill-background stroke-primary"
        strokeWidth="2"
      />
      <text
        x="245"
        y="74"
        textAnchor="middle"
        className="fill-primary text-[9px] font-medium [font-family:var(--font-mono)]"
      >
        SBC
      </text>
      <circle cx="245" cy="140" r="6" className="fill-primary" filter={`url(#sglow-${uid})`} />
      <path
        d="M274 140 H330"
        className="stroke-primary"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <Cloud x={330} y={110} />
    </>
  );
}

const DIAGRAMS: Record<string, (props: { uid: string }) => React.JSX.Element> = {
  distributed: DistributedDiagram,
  routed: RoutedDiagram,
  converge: ConvergeDiagram,
  scale: ScaleDiagram,
  transition: TransitionDiagram,
  edge: EdgeDiagram,
};

export function SolutionIllustration({ shape, className }: Props) {
  const Diagram = DIAGRAMS[shape] ?? DistributedDiagram;
  const uid = shape;

  return (
    <svg
      viewBox="20 50 404 180"
      role="presentation"
      aria-hidden
      className={cn("h-auto w-full", className)}
    >
      <Defs uid={uid} />
      <rect
        x="0"
        y="0"
        width="440"
        height="280"
        fill={`url(#sgrid-${uid})`}
        mask={`url(#sgridmask-${uid})`}
      />
      <Diagram uid={uid} />
    </svg>
  );
}
