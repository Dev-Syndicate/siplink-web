import { cn } from "@/lib/utils";

/**
 * Schematic hero illustrations for the sections that are not Products or
 * Solutions. Same *materials* as ProductIllustration / SolutionIllustration —
 * inline SVG from theme tokens, a faint grid field, a single primary accent
 * and one active element, light/dark-safe — but every shape is built from a
 * different geometric idea so it reads as its own page at a glance, not as a
 * variation on one hub-and-spokes motif:
 *
 *   api        request/response transaction between an app and the API
 *   library    a catalogue of stacked, browsable material
 *   resilient  twin facilities with a failover reroute
 *   tiers      three plans of rising height, one chosen
 *   sectors    one platform base, many sector profiles rising from it
 *   ecosystem  integration tiles docking into a central rail
 *   shield     a lock guarding a data table
 *   people     a staggered team lattice
 *   broadcast  a signal source and a timeline of updates
 */
type Props = {
  shape: string;
  className?: string;
};

const VIEW_W = 440;
const VIEW_H = 280;

/** Grid field + soft edge fade + glow, shared by every diagram. */
function Defs({ uid }: { uid: string }) {
  return (
    <defs>
      <pattern
        id={`xg-${uid}`}
        width="22"
        height="22"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M22 0H0V22"
          fill="none"
          className="stroke-foreground/[0.055]"
          strokeWidth="1"
        />
      </pattern>
      <radialGradient id={`xf-${uid}`} cx="50%" cy="48%" r="62%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
      <mask id={`xm-${uid}`}>
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill={`url(#xf-${uid})`} />
      </mask>
      <filter id={`xglow-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.4" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function Label({
  x,
  y,
  children,
  active = false,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  active?: boolean;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={cn(
        "text-[8px] font-medium tracking-wide [font-family:var(--font-mono)]",
        active ? "fill-primary" : "fill-muted-foreground/65",
      )}
    >
      {children}
    </text>
  );
}

/** The animated packet — respects prefers-reduced-motion via .flow-path. */
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

/* ============================================================== api

   A request/response transaction. Left: the developer's own code window.
   Right: the API surface as a bracketed payload. A solid request travels
   right; a quieter response returns; a webhook event taps upward. No hub —
   the subject is a call and its reply.
   ============================================================================ */
function ApiDiagram({ uid }: { uid: string }) {
  return (
    <>
      {/* Code window (your app) */}
      <g>
        <rect
          x="42"
          y="96"
          width="150"
          height="92"
          rx="10"
          className="fill-background stroke-border"
          strokeWidth="1.25"
        />
        <path d="M42 116 H192" className="stroke-border" strokeWidth="1.25" />
        {[54, 62, 70].map((cx, i) => (
          <circle
            key={cx}
            cx={cx}
            cy="106"
            r="2.4"
            className={i === 0 ? "fill-primary/70" : "fill-muted-foreground/30"}
          />
        ))}
        {/* code lines with indentation */}
        {[
          [58, 132, 70],
          [70, 146, 78],
          [70, 160, 54],
          [58, 174, 40],
        ].map(([x, y, w], i) => (
          <path
            key={y}
            d={`M${x} ${y} h${w}`}
            className={i === 1 ? "stroke-primary/60" : "stroke-muted-foreground/25"}
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
        <Label x={50} y={210} anchor="start">
          your&nbsp;app
        </Label>
      </g>

      {/* Request → */}
      <path d="M192 128 H286" className="stroke-primary" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Flow d="M192 128 H286" />
      <path d="M278 121l9 7-9 7" className="stroke-primary" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Label x={239} y={120} active>POST /v1/calls</Label>

      {/* ← Response (quieter) */}
      <path d="M286 158 H192" className="stroke-primary/30" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M200 151l-9 7 9 7" className="stroke-primary/40" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Label x={239} y={180}>200 ok</Label>

      {/* API payload as a bracketed block */}
      <g>
        <path
          d="M300 100 q-12 0 -12 12 v24 q0 6 -8 8 q8 2 8 8 v24 q0 12 12 12"
          className="fill-none stroke-primary"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M372 100 q12 0 12 12 v24 q0 6 8 8 q-8 2 -8 8 v24 q0 12 -12 12"
          className="fill-none stroke-primary"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {[124, 140, 156].map((y, i) => (
          <g key={y}>
            <path d={`M312 ${y} h14`} className="stroke-primary/50" strokeWidth="2.5" strokeLinecap="round" />
            <path
              d={`M332 ${y} h${[34, 26, 30][i]}`}
              className={i === 1 ? "stroke-primary/70" : "stroke-muted-foreground/30"}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        ))}
        <circle cx="340" cy="140" r="5" className="fill-primary" filter={`url(#xglow-${uid})`} />
        <Label x={340} y={210} active>siplink&nbsp;api</Label>
      </g>

      {/* Webhook event tap ↗ */}
      <path d="M384 118 C 404 108, 408 84, 416 78" className="stroke-primary/55" strokeWidth="1.5" fill="none" strokeDasharray="1 5" strokeLinecap="round" />
      <circle cx="416" cy="76" r="7" className="fill-background stroke-primary" strokeWidth="1.5" />
      <circle cx="416" cy="76" r="2.6" className="fill-primary" />
      <Label x={416} y={62}>event</Label>
    </>
  );
}

/* ============================================================== library

   A catalogue you browse: three stacked cards, each with a folded corner and
   a spine tab, fanned like files in a drawer. The active card is pulled
   forward. The subject is material, not a network.
   ============================================================================ */
function LibraryDiagram({ uid }: { uid: string }) {
  const cards = [
    { x: 96, y: 158, active: false, tab: "guides" },
    { x: 132, y: 128, active: false, tab: "docs" },
    { x: 176, y: 96, active: true, tab: "reference" },
  ];
  const w = 150;
  const h = 84;
  return (
    <>
      {cards.map(({ x, y, active, tab }) => (
        <g key={tab}>
          {/* spine tab */}
          <rect
            x={x - 10}
            y={y + 14}
            width="12"
            height="30"
            rx="3"
            className={active ? "fill-primary" : "fill-muted-foreground/25"}
          />
          {/* card with a folded top-right corner */}
          <path
            d={`M${x} ${y} H${x + w - 18} L${x + w} ${y + 18} V${y + h} H${x} Z`}
            className={cn("fill-background", active ? "stroke-primary" : "stroke-border")}
            strokeWidth={active ? 1.75 : 1.25}
            strokeLinejoin="round"
          />
          <path
            d={`M${x + w - 18} ${y} V${y + 18} H${x + w}`}
            className={active ? "stroke-primary/50" : "stroke-border"}
            strokeWidth="1.25"
            fill="none"
          />
          {/* title + text rules */}
          <path d={`M${x + 14} ${y + 26} h64`} className={active ? "stroke-primary/70" : "stroke-muted-foreground/40"} strokeWidth="3.5" strokeLinecap="round" />
          {[44, 58].map((dy) => (
            <path key={dy} d={`M${x + 14} ${y + dy} h${w - 34}`} className="stroke-border" strokeWidth="2.5" strokeLinecap="round" />
          ))}
          {active ? (
            <circle cx={x + w - 22} cy={y + h - 18} r="4.5" className="fill-primary" filter={`url(#xglow-${uid})`} />
          ) : null}
        </g>
      ))}
      <Label x={252} y={210} active>one&nbsp;library</Label>
    </>
  );
}

/* ============================================================== resilient

   Twin facilities carrying the same traffic. Two links run between them; the
   upper link is intact and live, the lower link is broken (a gap) and its
   traffic reroutes through the diagonal. The subject is failover, drawn as an
   actual reroute rather than four identical dots.
   ============================================================================ */
function Rack({ x, active, label }: { x: number; active?: boolean; label: string }) {
  return (
    <g>
      <rect
        x={x}
        y="86"
        width="76"
        height="108"
        rx="8"
        className={cn("fill-background", active ? "stroke-primary" : "stroke-border")}
        strokeWidth={active ? 1.75 : 1.25}
      />
      {[102, 122, 142, 162].map((y, i) => (
        <g key={y}>
          <path d={`M${x + 12} ${y} h52`} className="stroke-border" strokeWidth="6" strokeLinecap="round" />
          <circle
            cx={x + 58}
            cy={y}
            r="2.4"
            className={active && i < 2 ? "fill-primary" : "fill-muted-foreground/35"}
          />
        </g>
      ))}
      <Label x={x + 38} y={212}>{label}</Label>
    </g>
  );
}
function ResilientDiagram({ uid }: { uid: string }) {
  return (
    <>
      <Rack x={70} active label="site a" />
      <Rack x={294} active label="site b" />

      {/* Live link (top) */}
      <path d="M146 112 H294" className="stroke-primary" strokeWidth="2.5" fill="none" />
      <Flow d="M146 112 H294" />
      <Label x={220} y={102} active>live</Label>

      {/* Broken link (bottom) — a visible gap */}
      <path d="M146 168 H196" className="stroke-muted-foreground/40" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M244 168 H294" className="stroke-muted-foreground/40" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M204 162l10 12 M214 162l-10 12" className="stroke-destructive/70" strokeWidth="1.75" strokeLinecap="round" />
      <Label x={220} y={190}>down</Label>

      {/* Reroute diagonal from the live link to site B's lower half */}
      <path d="M220 112 C 250 130, 262 150, 294 158" className="stroke-primary/60" strokeWidth="1.75" fill="none" strokeDasharray="5 5" />
      <path d="M286 152l9 6-6 8" className="stroke-primary/70" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Label x={252} y={140} active>reroute</Label>
    </>
  );
}

/* ============================================================== tiers

   Three receipts of rising height pinned to a rail, the recommended middle one
   lifted and checked. Perforated tear-edge bottoms make them read as price
   tags, not bar-chart bars.
   ============================================================================ */
function Receipt({
  x,
  h,
  active,
  uid,
}: {
  x: number;
  h: number;
  active?: boolean;
  uid: string;
}) {
  const top = 200 - h;
  const w = 76;
  const lift = active ? -10 : 0;
  return (
    <g transform={`translate(0 ${lift})`}>
      <path
        d={`M${x} ${top} h${w} v${h - 8} l-${w / 8} 6 l-${w / 8} -6 l-${w / 8} 6 l-${w / 8} -6 l-${w / 8} 6 l-${w / 8} -6 l-${w / 8} 6 l-${w / 8} -6 Z`}
        className={cn("fill-background", active ? "stroke-primary" : "stroke-border")}
        strokeWidth={active ? 1.75 : 1.25}
        strokeLinejoin="round"
      />
      {/* price line */}
      <path d={`M${x + 12} ${top + 16} h${w - 40}`} className={active ? "stroke-primary/80" : "stroke-muted-foreground/45"} strokeWidth="4" strokeLinecap="round" />
      {/* feature rows */}
      {Array.from({ length: Math.min(4, Math.floor((h - 40) / 16)) }).map((_, i) => (
        <path
          key={i}
          d={`M${x + 12} ${top + 34 + i * 15} h${w - 24}`}
          className="stroke-border"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      {active ? (
        <g>
          <circle cx={x + w / 2} cy={top - 16} r="10" className="fill-primary" filter={`url(#xglow-${uid})`} />
          <path d={`M${x + w / 2 - 4} ${top - 16} l3 3 5-6`} className="stroke-primary-foreground" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
    </g>
  );
}
function TiersDiagram({ uid }: { uid: string }) {
  return (
    <>
      <Receipt x={74} h={66} uid={uid} />
      <Receipt x={176} h={104} uid={uid} active />
      <Receipt x={278} h={140} uid={uid} />
      {[
        { x: 112, label: "value" },
        { x: 214, label: "business" },
        { x: 316, label: "enterprise" },
      ].map(({ x, label }, i) => (
        <Label key={label} x={x} y={222} active={i === 1}>
          {label}
        </Label>
      ))}
    </>
  );
}

/* ============================================================== sectors

   One platform base rail, with several sector "profiles" of different heights
   rising from it like a skyline. Same foundation, different shapes on top —
   the subject is one platform serving many sectors, expressed as silhouette
   variety rather than spokes.
   ============================================================================ */
function SectorsDiagram({ uid }: { uid: string }) {
  const base = 192;
  // each sector: x, width, height, active, and a small glyph type
  const cols = [
    { x: 66, w: 46, h: 58, glyph: "cross", active: false },
    { x: 124, w: 46, h: 96, glyph: "bag", active: false },
    { x: 182, w: 46, h: 72, glyph: "bank", active: true },
    { x: 240, w: 46, h: 110, glyph: "chip", active: false },
    { x: 298, w: 46, h: 64, glyph: "cart", active: false },
  ];
  return (
    <>
      {/* platform base */}
      <rect x="52" y={base} width="336" height="18" rx="5" className="fill-primary/10 stroke-primary/40" strokeWidth="1.25" />
      <Label x={220} y={base + 30} active>one&nbsp;platform</Label>

      {cols.map(({ x, w, h, glyph, active }) => {
        const top = base - h;
        return (
          <g key={x}>
            <rect
              x={x}
              y={top}
              width={w}
              height={h}
              rx="6"
              className={cn("fill-background", active ? "stroke-primary" : "stroke-border")}
              strokeWidth={active ? 1.75 : 1.25}
            />
            {/* windows to read as buildings/sectors */}
            {Array.from({ length: Math.floor(h / 20) }).map((_, r) => (
              <g key={r}>
                <path d={`M${x + 10} ${top + 14 + r * 18} h8`} className="stroke-muted-foreground/30" strokeWidth="3" strokeLinecap="round" />
                <path d={`M${x + 26} ${top + 14 + r * 18} h10`} className={active && r === 0 ? "stroke-primary/70" : "stroke-muted-foreground/30"} strokeWidth="3" strokeLinecap="round" />
              </g>
            ))}
            {/* sector glyph on the roof */}
            <SectorGlyph glyph={glyph} cx={x + w / 2} cy={top - 12} active={active} uid={uid} />
          </g>
        );
      })}
    </>
  );
}
function SectorGlyph({
  glyph,
  cx,
  cy,
  active,
  uid,
}: {
  glyph: string;
  cx: number;
  cy: number;
  active?: boolean;
  uid: string;
}) {
  const c = active ? "stroke-primary" : "stroke-muted-foreground/45";
  const common = { fill: "none", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const node =
    glyph === "cross" ? (
      <path d={`M${cx} ${cy - 6} v12 M${cx - 6} ${cy} h12`} className={c} {...common} />
    ) : glyph === "bag" ? (
      <path d={`M${cx - 6} ${cy - 3} h12 v9 h-12 z M${cx - 3} ${cy - 3} v-2 a3 3 0 0 1 6 0 v2`} className={c} {...common} />
    ) : glyph === "bank" ? (
      <path d={`M${cx - 7} ${cy + 6} h14 M${cx - 6} ${cy + 6} v-7 M${cx} ${cy + 6} v-7 M${cx + 6} ${cy + 6} v-7 M${cx - 7} ${cy - 2} l7 -5 l7 5`} className={c} {...common} />
    ) : glyph === "chip" ? (
      <path d={`M${cx - 5} ${cy - 5} h10 v10 h-10 z M${cx - 5} ${cy - 8} v3 M${cx} ${cy - 8} v3 M${cx + 5} ${cy - 8} v3 M${cx - 5} ${cy + 5} v3 M${cx} ${cy + 5} v3 M${cx + 5} ${cy + 5} v3`} className={c} {...common} />
    ) : (
      <path d={`M${cx - 7} ${cy - 4} h3 l2 8 h7 l2 -6 h-9 M${cx} ${cy + 7} a1 1 0 1 0 0.1 0 M${cx + 5} ${cy + 7} a1 1 0 1 0 0.1 0`} className={c} {...common} />
    );
  return (
    <>
      {active ? <circle cx={cx} cy={cy} r="11" className="fill-primary/10" /> : null}
      {node}
    </>
  );
}

/* ============================================================== ecosystem

   Integration tiles docking into a central vertical rail (a connector bus).
   Tiles slot in from both sides; the active one is seated with a lit pin. The
   subject is "plug into what you already use", drawn as sockets on a bus, not
   a ring around a hub.
   ============================================================================ */
function EcosystemDiagram({ uid }: { uid: string }) {
  const railX = 220;
  const left = [
    { y: 96, active: false },
    { y: 140, active: true },
    { y: 184, active: false },
  ];
  const right = [
    { y: 108, active: false },
    { y: 172, active: false },
  ];
  const tileW = 62;
  const tileH = 30;
  return (
    <>
      {/* central rail */}
      <rect x={railX - 6} y="78" width="12" height="128" rx="6" className="fill-primary/10 stroke-primary/50" strokeWidth="1.25" />
      <circle cx={railX} cy="72" r="4" className="fill-primary" filter={`url(#xglow-${uid})`} />
      <Label x={railX} y={222} active>siplink</Label>

      {left.map(({ y, active }) => (
        <g key={`l${y}`}>
          <rect
            x={railX - 40 - tileW}
            y={y - tileH / 2}
            width={tileW}
            height={tileH}
            rx="6"
            className={cn("fill-background", active ? "stroke-primary" : "stroke-border")}
            strokeWidth={active ? 1.75 : 1.25}
          />
          {/* app glyph dots */}
          <circle cx={railX - 40 - tileW + 16} cy={y} r="4" className={active ? "fill-primary" : "fill-muted-foreground/35"} />
          <path d={`M${railX - 40 - tileW + 28} ${y} h22`} className="stroke-muted-foreground/30" strokeWidth="2.5" strokeLinecap="round" />
          {/* connector pin into rail */}
          <path d={`M${railX - 40} ${y} H${railX - 6}`} className={active ? "stroke-primary" : "stroke-primary/30"} strokeWidth={active ? 2.5 : 1.5} fill="none" />
          {active ? <Flow d={`M${railX - 40} ${y} H${railX - 6}`} /> : null}
        </g>
      ))}
      {right.map(({ y, active }) => (
        <g key={`r${y}`}>
          <rect
            x={railX + 40}
            y={y - tileH / 2}
            width={tileW}
            height={tileH}
            rx="6"
            className={cn("fill-background", active ? "stroke-primary" : "stroke-border")}
            strokeWidth={active ? 1.75 : 1.25}
          />
          <circle cx={railX + 40 + 16} cy={y} r="4" className="fill-muted-foreground/35" />
          <path d={`M${railX + 40 + 28} ${y} h22`} className="stroke-muted-foreground/30" strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M${railX + 6} ${y} H${railX + 40}`} className="stroke-primary/30" strokeWidth="1.5" fill="none" />
        </g>
      ))}
    </>
  );
}

/* ============================================================== shield

   A lock seated over a data table: rows of records with a padlock centred on
   them and one concentric guard ring. The subject is data under protection,
   drawn literally, distinct from every network diagram.
   ============================================================================ */
function ShieldDiagram({ uid }: { uid: string }) {
  const tx = 70;
  return (
    <>
      {/* data table */}
      <rect x={tx} y="98" width="150" height="88" rx="8" className="fill-background stroke-border" strokeWidth="1.25" />
      <path d={`M${tx} 120 H${tx + 150}`} className="stroke-border" strokeWidth="1.25" />
      <path d={`M${tx + 44} 98 V186`} className="stroke-border" strokeWidth="1" />
      {[134, 152, 170].map((y, i) => (
        <g key={y}>
          <circle cx={tx + 22} cy={y} r="3" className={i === 0 ? "fill-primary/60" : "fill-muted-foreground/30"} />
          <path d={`M${tx + 56} ${y} h${[70, 54, 62][i]}`} className={i === 0 ? "stroke-primary/50" : "stroke-muted-foreground/25"} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      <Label x={tx + 75} y={208}>your&nbsp;data</Label>

      {/* guard ring */}
      <circle cx="300" cy="140" r="58" className="fill-none stroke-primary/20" strokeWidth="1.25" strokeDasharray="3 6" />

      {/* padlock */}
      <path d="M284 132 v-8 a16 16 0 0 1 32 0 v8" className="fill-none stroke-primary" strokeWidth="2" strokeLinecap="round" />
      <rect x="274" y="132" width="52" height="44" rx="8" className="fill-background stroke-primary" strokeWidth="2" />
      <circle cx="300" cy="150" r="6" className="fill-primary" filter={`url(#xglow-${uid})`} />
      <path d="M300 154 v10" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      <Label x={300} y={208} active>protected</Label>
    </>
  );
}

/* ============================================================== people

   A staggered team lattice: head nodes on two offset rows joined into a small
   org, one person highlighted. Reads as "a team", not "endpoints on a hub".
   ============================================================================ */
function Person({
  cx,
  cy,
  active,
  uid,
}: {
  cx: number;
  cy: number;
  active?: boolean;
  uid: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy - 8} r="8" className={cn("fill-background", active ? "stroke-primary" : "stroke-border")} strokeWidth={active ? 1.75 : 1.25} />
      <path d={`M${cx - 12} ${cy + 14} a12 11 0 0 1 24 0`} className={cn("fill-background", active ? "stroke-primary" : "stroke-border")} strokeWidth={active ? 1.75 : 1.25} />
      <circle cx={cx} cy={cy - 8} r="3" className={active ? "fill-primary" : "fill-muted-foreground/40"} filter={active ? `url(#xglow-${uid})` : undefined} />
    </g>
  );
}
function PeopleDiagram({ uid }: { uid: string }) {
  const top = [
    { cx: 120, cy: 108 },
    { cx: 220, cy: 108, active: true },
    { cx: 320, cy: 108 },
  ];
  const bottom = [
    { cx: 170, cy: 180 },
    { cx: 270, cy: 180 },
  ];
  return (
    <>
      {/* connective lattice */}
      <path d="M120 116 V150 H320 V116" className="stroke-primary/25" strokeWidth="1.25" fill="none" />
      <path d="M220 116 V150" className="stroke-primary/25" strokeWidth="1.25" fill="none" />
      <path d="M170 150 V168 M270 150 V168" className="stroke-primary/25" strokeWidth="1.25" fill="none" />
      {/* one active reporting line */}
      <path d="M220 116 V150" className="stroke-primary" strokeWidth="2" fill="none" />
      <Flow d="M220 132 V150" />

      {top.map((p) => (
        <Person key={p.cx} cx={p.cx} cy={p.cy} active={p.active} uid={uid} />
      ))}
      {bottom.map((p) => (
        <Person key={p.cx} cx={p.cx} cy={p.cy} uid={uid} />
      ))}
      <Label x={220} y={214} active>one&nbsp;team</Label>
    </>
  );
}

/* ============================================================== broadcast

   A signal source on the left emitting concentric arcs toward a vertical
   timeline of update entries on the right; the newest entry is lit. The
   subject is "what's new, over time" — a feed, not a hub.
   ============================================================================ */
function BroadcastDiagram({ uid }: { uid: string }) {
  const sx = 96;
  const sy = 140;
  return (
    <>
      {/* emitter mast */}
      <path d={`M${sx} 108 V184`} className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      <path d={`M${sx - 14} 184 H${sx + 14}`} className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={sx} cy="104" r="6" className="fill-primary" filter={`url(#xglow-${uid})`} />
      {/* emitted arcs */}
      {[26, 46, 66].map((r, i) => (
        <path
          key={r}
          d={`M${sx + 8} ${sy - r} A ${r} ${r} 0 0 1 ${sx + 8} ${sy + r}`}
          fill="none"
          className={i === 0 ? "stroke-primary/70" : "stroke-primary/25"}
          strokeWidth="1.5"
        />
      ))}
      <Label x={sx} y={210}>updates</Label>

      {/* timeline spine */}
      <path d="M250 92 V196" className="stroke-border" strokeWidth="1.5" />
      {[
        { y: 104, active: true, w: 92 },
        { y: 140, active: false, w: 72 },
        { y: 176, active: false, w: 84 },
      ].map(({ y, active, w }) => (
        <g key={y}>
          <circle
            cx="250"
            cy={y}
            r={active ? 5 : 3.5}
            className={active ? "fill-primary" : "fill-muted-foreground/35"}
            filter={active ? `url(#xglow-${uid})` : undefined}
          />
          <path d={`M264 ${y - 8} h${w} M264 ${y + 4} h${w - 22}`} className={active ? "stroke-primary/60" : "stroke-muted-foreground/25"} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
    </>
  );
}

const DIAGRAMS: Record<string, (p: { uid: string }) => React.JSX.Element> = {
  api: ApiDiagram,
  library: LibraryDiagram,
  resilient: ResilientDiagram,
  tiers: TiersDiagram,
  sectors: SectorsDiagram,
  ecosystem: EcosystemDiagram,
  shield: ShieldDiagram,
  people: PeopleDiagram,
  broadcast: BroadcastDiagram,
};

export function SectionIllustration({ shape, className }: Props) {
  const Diagram = DIAGRAMS[shape] ?? LibraryDiagram;
  const uid = shape;
  return (
    <svg
      viewBox="30 60 380 168"
      role="presentation"
      aria-hidden
      className={cn("h-auto w-full", className)}
    >
      <Defs uid={uid} />
      <rect
        x="0"
        y="0"
        width={VIEW_W}
        height={VIEW_H}
        fill={`url(#xg-${uid})`}
        mask={`url(#xm-${uid})`}
      />
      <Diagram uid={uid} />
    </svg>
  );
}
