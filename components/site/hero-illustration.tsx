/**
 * Isometric line-art IP desk phone for the hero headline tile.
 *
 * Drawn here rather than sourced as a raster asset so it inherits the theme:
 * strokes are `currentColor`, fills are theme classes, so the drawing follows
 * whatever text colour the tile sets and stays correct if the palette moves.
 *
 * Geometry is a real isometric projection. `iso()` maps (x, y, z) in phone
 * space to the viewBox, and `Box()` draws the three faces of an axis-aligned
 * box that are actually visible from this angle — so the solids line up
 * instead of being eyeballed. The viewBox is cropped tight to the drawing;
 * if you move a part outside the current bounds, widen it to match.
 */

type Point = readonly [number, number];

const COS30 = 0.8660254;

/** Where phone-space (0,0,0) lands in the viewBox. */
const OX = 268;
const OY = 118;

/** Body footprint and height, in phone-space units. */
const W = 180;
const D = 140;
const H = 18;

/** (x, y, z) → viewBox point. +x runs right-down, +y left-down, +z up. */
function iso(x: number, y: number, z = 0): Point {
  return [OX + (x - y) * COS30, OY + (x + y) * 0.5 - z];
}

const fmt = (pt: Point) => `${pt[0].toFixed(1)},${pt[1].toFixed(1)}`;
const poly = (...pts: Point[]) => pts.map(fmt).join(" ");

/** Fractions of the footprint, so parts stay put if W/D change. */
const fx = (f: number) => f * W;
const fy = (f: number) => f * D;

/**
 * The three faces of a box visible from this angle: the top, the front-left
 * face at y1, and the front-right face at x1. Each is filled first so the box
 * is opaque, then stroked, which is what gives the flat line-art look.
 */
function Box({
  x0,
  x1,
  y0,
  y1,
  z0,
  z1,
  topClass = "fill-background",
}: {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z0: number;
  z1: number;
  topClass?: string;
}) {
  const top = poly(iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y1, z1), iso(x0, y1, z1));
  const left = poly(iso(x0, y1, z1), iso(x1, y1, z1), iso(x1, y1, z0), iso(x0, y1, z0));
  const right = poly(iso(x1, y0, z1), iso(x1, y1, z1), iso(x1, y1, z0), iso(x1, y0, z0));

  return (
    <g>
      <polygon points={left} className="fill-background" />
      <polygon points={right} className="fill-background" />
      <polygon points={top} className={topClass} />
      <polygon points={left} />
      <polygon points={right} />
      <polygon points={top} />
    </g>
  );
}

/** Keypad, 3 x 3, with the call key tinted. */
const KEYS = [0, 1, 2].flatMap((row) =>
  [0, 1, 2].map((col) => ({ row, col, accent: row === 2 && col === 0 }))
);

export function HeroIllustration({ className }: { className?: string }) {
  const keyW = 0.17;
  const keyD = 0.16;
  const keyH = 9;

  // Earpiece centre, where the signal arcs are anchored.
  const [ax, ay] = iso(fx(0.16), fy(0.1), H + 24);

  return (
    <svg
      viewBox="140 18 296 268"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
      focusable="false"
    >
      {/* Body */}
      <Box x0={0} x1={W} y0={0} y1={D} z0={0} z1={H} />

      {/* Screen, inset flat into the back of the top face. */}
      <polygon
        points={poly(
          iso(fx(0.36), fy(0.05), H + 0.5),
          iso(fx(0.96), fy(0.05), H + 0.5),
          iso(fx(0.96), fy(0.3), H + 0.5),
          iso(fx(0.36), fy(0.3), H + 0.5)
        )}
        className="fill-foreground stroke-foreground"
      />
      {/* Two lines of "call in progress" text on the screen. */}
      <polyline
        points={poly(iso(fx(0.44), fy(0.13), H + 1), iso(fx(0.7), fy(0.13), H + 1))}
        className="stroke-background"
        strokeWidth={3.5}
      />
      <polyline
        points={poly(iso(fx(0.44), fy(0.21), H + 1), iso(fx(0.86), fy(0.21), H + 1))}
        className="stroke-background/45"
        strokeWidth={3.5}
      />
      {/* Live-call dot. */}
      <circle
        cx={iso(fx(0.9), fy(0.12), H + 1)[0]}
        cy={iso(fx(0.9), fy(0.12), H + 1)[1]}
        r="3.2"
        className="fill-primary stroke-primary"
      />

      {/* Keypad */}
      {KEYS.map(({ row, col, accent }) => {
        const x0 = fx(0.37 + col * 0.2);
        const y0 = fy(0.4 + row * 0.19);
        return (
          <Box
            key={`${row}-${col}`}
            x0={x0}
            x1={x0 + fx(keyW)}
            y0={y0}
            y1={y0 + fy(keyD)}
            z0={H}
            z1={H + keyH}
            topClass={accent ? "fill-primary/20" : "fill-background"}
          />
        );
      })}

      {/* Handset on the cradle: two raised ends joined by a lower bar, which
          is what makes it read as a handset rather than a block. */}
      <Box x0={fx(0.04)} x1={fx(0.26)} y0={fy(0.05)} y1={fy(0.26)} z0={H} z1={H + 24} />
      <Box x0={fx(0.07)} x1={fx(0.23)} y0={fy(0.26)} y1={fy(0.74)} z0={H} z1={H + 13} />
      <Box x0={fx(0.04)} x1={fx(0.26)} y0={fy(0.74)} y1={fy(0.95)} z0={H} z1={H + 24} />

      {/* Signal arcs off the earpiece — the "cloud" half of the story. */}
      <g className="opacity-65">
        <path d={`M ${(ax - 6).toFixed(1)} ${(ay - 14).toFixed(1)} a 26 26 0 0 0 -25 -12`} />
        <path d={`M ${(ax - 2).toFixed(1)} ${(ay - 26).toFixed(1)} a 44 44 0 0 0 -42 -20`} />
        <path d={`M ${(ax + 2).toFixed(1)} ${(ay - 38).toFixed(1)} a 62 62 0 0 0 -59 -28`} />
      </g>
    </svg>
  );
}
