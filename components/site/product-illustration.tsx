import { cn } from "@/lib/utils";

/**
 * Schematic illustrations for the product pages.
 *
 * Each category gets a diagram of the thing it actually does. Drawn as
 * inline SVG from theme tokens so both themes work and nothing is
 * downloaded. Depth comes from a faint grid field, layered strokes and a
 * single glowing active path, rather than from flat filled shapes.
 */
type Props = {
  category: string;
  className?: string;
};

/** Shared defs: grid, glow and the dash animation for the live path. */
function Defs({ uid }: { uid: string }) {
  return (
    <defs>
      <pattern
        id={`grid-${uid}`}
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

      <radialGradient id={`fade-${uid}`} cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>

      <mask id={`gridmask-${uid}`}>
        <rect x="0" y="0" width="440" height="280" fill={`url(#fade-${uid})`} />
      </mask>

      <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/** A device chassis: outline, header bar, and content rows. */
function Chassis({
  x,
  y,
  w,
  h,
  rows = 3,
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
  const rowGap = (h - 26) / rows;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="8"
        fill="var(--background, #fff)"
        className={cn(
          "fill-background",
          active ? "stroke-primary" : "stroke-border",
        )}
        strokeWidth={active ? 1.75 : 1.25}
      />
      {/* Header strip */}
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

      {Array.from({ length: rows }).map((_, index) => (
        <path
          key={index}
          d={`M${x + 12} ${y + 30 + index * rowGap} H${x + w - 12 - (index % 2) * 14}`}
          className={
            active && index === 1 ? "stroke-primary/70" : "stroke-border"
          }
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
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

/** Business Voice: many channels aggregating into one trunk. */
function TrunkDiagram({ uid }: { uid: string }) {
  const trunk = "M300 140 H352";

  return (
    <>
      <Chassis x={40} y={78} w={116} h={124} rows={4} active label="IP-PBX" />

      {/* Channels converging */}
      {[100, 124, 148, 172].map((y, index) => (
        <path
          key={y}
          d={`M156 ${y} C 218 ${y}, 232 140, 296 140`}
          fill="none"
          strokeWidth={index === 1 ? "1.75" : "1.25"}
          className={index === 1 ? "stroke-primary/70" : "stroke-primary/25"}
        />
      ))}

      {/* Aggregation point */}
      <circle
        cx="298"
        cy="140"
        r="5"
        className="fill-primary"
        filter={`url(#glow-${uid})`}
      />

      {/* The trunk */}
      <path
        d={trunk}
        className="stroke-primary"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <Flow d={`M156 124 C 218 124, 232 140, 296 140 ${trunk.slice(1)}`} />

      {/* Carrier cloud — the trunk terminates at its edge */}
      <path
        d="M366 118c-9 0-16 7-16 16s7 16 16 16h44c11 0 20-9 20-20s-9-20-20-20c-4-9-13-15-23-15-12 0-22 8-24 18-1 0-1 0-1 0"
        fill="var(--background, #fff)"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M368 136h44M368 144h28"
        className="stroke-primary/35"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </>
  );
}

/** Phone Numbers: one published number reaching many destinations. */
function NumbersDiagram() {
  const rows = [72, 122, 172];

  return (
    <>
      {/* The advertised number */}
      <rect
        x="36"
        y="116"
        width="132"
        height="48"
        rx="10"
        fill="var(--background, #fff)"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <text
        x="56"
        y="146"
        className="fill-primary text-[15px] font-semibold [font-family:var(--font-mono)]"
      >
        +1 800···
      </text>

      {rows.map((y, index) => {
        const path = `M168 140 C 214 140, 220 ${y + 24}, 268 ${y + 24}`;
        const active = index === 1;
        return (
          <g key={y}>
            <path
              d={path}
              fill="none"
              strokeWidth={active ? "1.75" : "1.25"}
              className={active ? "stroke-primary/70" : "stroke-primary/25"}
            />
            {active ? <Flow d={path} /> : null}
            <Chassis
              x={268}
              y={y}
              w={136}
              h={48}
              rows={1}
              active={active}
              label={["SALES", "SUPPORT", "BILLING"][index]}
            />
          </g>
        );
      })}
    </>
  );
}

/** Contact Center: callers queue, then distribute to agents. */
function QueueDiagram() {
  const agents = [70, 122, 174];

  return (
    <>
      {/* Waiting callers */}
      {[92, 122, 152, 182].map((y, index) => (
        <g key={y}>
          <circle
            cx="48"
            cy={y}
            r="9"
            fill={index === 0 ? "currentColor" : "var(--background, #fff)"}
            className={cn(
              "stroke-primary",
              index === 0 ? "fill-primary" : "fill-background",
            )}
            strokeWidth="1.5"
            opacity={1 - index * 0.22}
          />
        </g>
      ))}

      {/* Queue */}
      <rect
        x="86"
        y="76"
        width="96"
        height="128"
        rx="12"
        fill="var(--background, #fff)"
        className="fill-background stroke-primary/60"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />
      <text
        x="134"
        y="70"
        textAnchor="middle"
        className="fill-primary text-[9px] font-medium [font-family:var(--font-mono)]"
      >
        QUEUE
      </text>
      {[104, 128, 152, 176].map((y, index) => (
        <path
          key={y}
          d={`M104 ${y} H${164 - index * 10}`}
          className={index === 0 ? "stroke-primary/70" : "stroke-border"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}

      {agents.map((y, index) => {
        const path = `M182 140 C 220 140, 226 ${y + 23}, 260 ${y + 23}`;
        const active = index === 1;
        return (
          <g key={y}>
            <path
              d={path}
              fill="none"
              strokeWidth={active ? "1.75" : "1.25"}
              className={active ? "stroke-primary/70" : "stroke-primary/25"}
            />
            {active ? <Flow d={path} /> : null}
            <Chassis
              x={260}
              y={y}
              w={144}
              h={46}
              rows={1}
              active={active}
              label={`AGENT ${index + 1}`}
            />
          </g>
        );
      })}
    </>
  );
}

/** Communication APIs: a request out, a response back. */
function ApiDiagram({ uid }: { uid: string }) {
  return (
    <>
      {/* Editor */}
      <rect
        x="34"
        y="74"
        width="168"
        height="132"
        rx="10"
        fill="var(--background, #fff)"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <path d="M34 96 H202" className="stroke-primary/40" strokeWidth="1.25" />
      {[46, 58, 70].map((cx, index) => (
        <circle
          key={cx}
          cx={cx}
          cy="85"
          r="3"
          className={index === 0 ? "fill-primary" : "fill-muted-foreground/30"}
        />
      ))}
      {[
        { w: 96, active: false },
        { w: 62, active: false },
        { w: 118, active: true },
        { w: 74, active: false },
        { w: 48, active: false },
      ].map((row, index) => (
        <path
          key={index}
          d={`M52 ${114 + index * 19} h${row.w}`}
          className={row.active ? "stroke-primary" : "stroke-border"}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}

      {/* Request / response */}
      <path
        d="M202 122 H286"
        className="stroke-primary/70"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M279 116l8 6-8 6"
        className="stroke-primary"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Flow d="M202 122 H286" />

      <path
        d="M286 162 H202"
        className="stroke-primary/25"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        fill="none"
      />
      <path
        d="M209 156l-8 6 8 6"
        className="stroke-primary/50"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Network */}
      <circle
        cx="348"
        cy="140"
        r="60"
        fill="var(--background, #fff)"
        className="fill-background stroke-primary/30"
        strokeWidth="1.25"
      />
      <circle
        cx="348"
        cy="140"
        r="38"
        className="stroke-primary/20"
        strokeWidth="1.25"
        fill="none"
      />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 348 + Math.cos(rad) * 38;
        const y = 140 + Math.sin(rad) * 38;
        return (
          <g key={angle}>
            <path
              d={`M348 140 L${x} ${y}`}
              className="stroke-primary/25"
              strokeWidth="1.25"
            />
            <circle cx={x} cy={y} r="4.5" className="fill-primary/50" />
          </g>
        );
      })}
      <circle
        cx="348"
        cy="140"
        r="9"
        className="fill-primary"
        filter={`url(#glow-${uid})`}
      />
    </>
  );
}

/** Enterprise: systems meeting at one controlled edge. */
function EdgeDiagram({ uid }: { uid: string }) {
  const systems = [
    { y: 70, label: "TEAMS" },
    { y: 122, label: "PBX" },
    { y: 174, label: "CRM" },
  ];

  return (
    <>
      {systems.map(({ y, label }, index) => {
        const active = index === 1;
        const path = `M158 ${y + 23} C 190 ${y + 23}, 194 140, 216 140`;
        return (
          <g key={y}>
            <Chassis
              x={34}
              y={y}
              w={124}
              h={46}
              rows={1}
              active={active}
              label={label}
            />
            <path
              d={path}
              fill="none"
              strokeWidth={active ? "1.75" : "1.25"}
              className={active ? "stroke-primary/70" : "stroke-primary/25"}
            />
            {active ? <Flow d={path} /> : null}
          </g>
        );
      })}

      {/* The controlled edge */}
      <rect
        x="216"
        y="80"
        width="58"
        height="120"
        rx="14"
        fill="var(--background, #fff)"
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
      <path
        d="M245 104v72"
        className="stroke-primary/40"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      <circle
        cx="245"
        cy="140"
        r="6"
        className="fill-primary"
        filter={`url(#glow-${uid})`}
      />

      <path
        d="M274 140 H330"
        className="stroke-primary"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M344 120c-9 0-16 7-16 16s7 16 16 16h42c11 0 19-9 19-19s-8-19-19-19c-4-9-13-14-22-14-11 0-21 7-23 17"
        fill="var(--background, #fff)"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M346 138h42M346 146h26"
        className="stroke-primary/35"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </>
  );
}

const DIAGRAMS: Record<string, (props: { uid: string }) => React.JSX.Element> =
  {
    "business-voice": TrunkDiagram,
    "phone-numbers": NumbersDiagram,
    "contact-center": QueueDiagram,
    "communication-apis": ApiDiagram,
    "enterprise-features": EdgeDiagram,
  };

export function ProductIllustration({ category, className }: Props) {
  const Diagram = DIAGRAMS[category] ?? TrunkDiagram;
  // Stable per-category id so gradient and filter references stay unique
  // without needing a client component.
  const uid = category;

  return (
    <svg
      // Right edge at 434: the trunk diagram's carrier cloud reaches x=430.
      viewBox="20 50 414 180"
      role="presentation"
      aria-hidden
      className={cn("h-auto w-full", className)}
    >
      <Defs uid={uid} />

      {/* Grid field, faded at the edges, for depth behind the diagram. */}
      <rect
        x="0"
        y="0"
        width="440"
        height="280"
        fill={`url(#grid-${uid})`}
        mask={`url(#gridmask-${uid})`}
      />

      <Diagram uid={uid} />
    </svg>
  );
}
