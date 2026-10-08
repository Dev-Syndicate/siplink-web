import { Building2, MapPin } from "lucide-react";

import { offices } from "@/lib/site";
import { RevealGroup } from "@/components/site/reveal-group";

/**
 * Three operating offices on one wire, with the US entity drawn apart from
 * it rather than as a fourth node on the ring.
 *
 * That split is not a layout choice, it is the fact `offices[].kind` already
 * carries: India is where SipLink actually operates, the US address is a
 * registered entity. Drawing all four as equal nodes on a ring would say
 * something the data does not — so the ring only ever holds the cities with
 * `kind: "operating"`, and the US entity sits below as its own card, joined
 * to the hub by a single different line rather than a spoke on the ring.
 *
 * The hub is the business number SipLink itself, the same mark the
 * integration wall and the pricing ring use for "the one thing everything
 * else connects to" — reused here because the claim is the same claim:
 * three real, separately staffed offices operating as one business.
 */
const RING_VIEW = { w: 640, h: 640 } as const;
const RING_RADIUS = 240;
const HUB_RADIUS = 86;

export function OfficeNetwork() {
  const operating = offices.filter((o) => o.kind === "operating");
  const registered = offices.filter((o) => o.kind === "registered");
  const cx = RING_VIEW.w / 2;
  const cy = RING_VIEW.h / 2;

  const nodes = operating.map((office, index) => {
    // Start at twelve o'clock, same convention as the startup seating ring,
    // so a reader who has seen that figure reads this one the same way.
    const angle = (index / operating.length) * 2 * Math.PI - Math.PI / 2;
    return {
      ...office,
      x: cx + Math.cos(angle) * RING_RADIUS,
      y: cy + Math.sin(angle) * RING_RADIUS,
    };
  });

  return (
    <div>
      <div
        aria-hidden
        className="relative mx-auto aspect-square w-full max-w-[34rem]"
      >
        <svg
          viewBox={`0 0 ${RING_VIEW.w} ${RING_VIEW.h}`}
          role="presentation"
          className="block h-full w-full"
        >
          <defs>
            <radialGradient id="office-halo">
              <stop
                offset="0"
                className="text-primary"
                stopColor="currentColor"
                stopOpacity="0.35"
              />
              <stop
                offset="1"
                className="text-primary"
                stopColor="currentColor"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          <circle cx={cx} cy={cy} r={RING_RADIUS * 0.62} fill="url(#office-halo)" />

          {nodes.map((node, index) => (
            <g key={node.city}>
              <line
                x1={cx}
                y1={cy}
                x2={node.x}
                y2={node.y}
                strokeWidth="1.5"
                className="stroke-border"
              />
              <line
                x1={cx}
                y1={cy}
                x2={node.x}
                y2={node.y}
                pathLength="100"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="trace-pulse stroke-primary"
                style={
                  {
                    "--trace-duration": "3.6s",
                    "--trace-delay": `${index * -1.1}s`,
                  } as React.CSSProperties
                }
              />
            </g>
          ))}
        </svg>

        <div className="absolute inset-0">
          {/* The hub: SipLink itself, the one thing every office connects to. */}
          <div
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground shadow-lg"
            style={{
              left: `${(cx / RING_VIEW.w) * 100}%`,
              top: `${(cy / RING_VIEW.h) * 100}%`,
              width: `${(HUB_RADIUS * 2 / RING_VIEW.w) * 100}%`,
              aspectRatio: "1 / 1",
            }}
          >
            <span className="text-sm font-semibold">SipLink</span>
            <span className="text-[10px] opacity-80">One business</span>
          </div>

          {nodes.map((node) => (
            <div
              key={node.city}
              className="absolute flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
              style={{
                left: `${(node.x / RING_VIEW.w) * 100}%`,
                top: `${(node.y / RING_VIEW.h) * 100}%`,
              }}
            >
              <span className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm">
                <MapPin className="size-4.5" />
              </span>
              <span className="text-xs font-medium text-foreground">
                {node.city}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* The operating offices, written out: address and phone, the facts
          the ring above cannot carry and a screen reader needs regardless. */}
      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-3">
        {operating.map((office, index) => (
          <div
            key={office.city}
            className="reveal-item rounded-xl border border-border bg-card p-5"
            style={{ "--reveal-index": index } as React.CSSProperties}
          >
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden />
              <h3 className="font-semibold text-foreground">{office.city}</h3>
            </div>
            <address className="mt-2 text-xs leading-relaxed text-muted-foreground not-italic">
              {office.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={`tel:${office.phone.replace(/\s/g, "")}`}
              className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
            >
              {office.phone}
            </a>
          </div>
        ))}
      </RevealGroup>

      {/* The US entity, kept apart rather than drawn as a fourth node — it is
          a registered address, not a staffed office. */}
      {registered.map((office) => (
        <div
          key={office.city}
          className="mt-5 flex items-start gap-3 rounded-lg border border-dashed border-border px-5 py-4"
        >
          <Building2
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{office.entity}</span>
            {" — registered entity, "}
            {office.address.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}
