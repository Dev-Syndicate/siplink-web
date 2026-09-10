import { cn } from "@/lib/utils";

/**
 * Schematic illustrations for the product pages.
 *
 * Each product category gets a diagram of what it actually does — a trunk
 * carrying channels, numbers fanning to destinations, calls queueing to
 * agents, a request/response exchange, a controlled network edge. Drawn
 * with theme tokens rather than fixed colours so both themes work, and
 * built from `currentColor` and CSS variables so no image is downloaded.
 */
type Props = {
  category: string;
  className?: string;
};

const STROKE = "stroke-primary";
const FAINT = "stroke-border";

/** Business Voice: an aggregated trunk between two estates. */
function TrunkDiagram() {
  return (
    <>
      {/* On-premise side */}
      <rect
        x="24"
        y="96"
        width="96"
        height="128"
        rx="10"
        className={cn(FAINT, "fill-muted/40")}
        strokeWidth="1.5"
      />
      {[124, 156, 188].map((y) => (
        <rect
          key={y}
          x="42"
          y={y}
          width="60"
          height="14"
          rx="3"
          className="fill-primary/20"
        />
      ))}

      {/* Channels converging into a single trunk */}
      {[128, 148, 168, 188].map((y, index) => (
        <path
          key={y}
          d={`M120 ${y} C 168 ${y}, 176 160, 216 160`}
          className={cn(STROKE, index === 1 ? "opacity-90" : "opacity-40")}
          strokeWidth="1.5"
          fill="none"
        />
      ))}

      {/* The trunk itself */}
      <path
        d="M216 160 H300"
        className={STROKE}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="216" cy="160" r="5" className="fill-primary" />

      {/* Carrier cloud */}
      <path
        d="M320 138c-14 0-25 11-25 24s11 24 25 24h56c16 0 29-12 29-27s-13-27-29-27c-6-13-19-21-33-21-17 0-31 12-34 27z"
        className={cn(STROKE, "fill-primary/5")}
        strokeWidth="1.5"
      />
      <path
        d="M330 162h66M330 174h44"
        className={cn(STROKE, "opacity-50")}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  );
}

/** Phone Numbers: one published number fanning out to destinations. */
function NumbersDiagram() {
  return (
    <>
      <rect
        x="24"
        y="140"
        width="120"
        height="44"
        rx="10"
        className={cn(STROKE, "fill-primary/5")}
        strokeWidth="1.5"
      />
      <path
        d="M44 162h20M74 162h12M96 162h28"
        className={STROKE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {[
        { y: 88, label: 220 },
        { y: 140, label: 220 },
        { y: 192, label: 220 },
      ].map(({ y }, index) => (
        <g key={y}>
          <path
            d={`M144 162 C 186 162, 190 ${y + 22}, 232 ${y + 22}`}
            className={cn(STROKE, index === 1 ? "opacity-90" : "opacity-45")}
            strokeWidth="1.5"
            fill="none"
          />
          <rect
            x="232"
            y={y}
            width="128"
            height="44"
            rx="10"
            className={cn(
              FAINT,
              index === 1 ? "fill-primary/10" : "fill-muted/40",
            )}
            strokeWidth="1.5"
          />
          <circle
            cx="256"
            cy={y + 22}
            r="7"
            className={index === 1 ? "fill-primary" : "fill-primary/30"}
          />
          <path
            d={`M274 ${y + 18}h62M274 ${y + 27}h40`}
            className={cn(FAINT, "opacity-90")}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      ))}
    </>
  );
}

/** Contact Center: callers queue, then distribute to agents. */
function QueueDiagram() {
  return (
    <>
      {/* Waiting callers */}
      {[70, 110, 150, 190].map((y, index) => (
        <circle
          key={y}
          cx="44"
          cy={y + 20}
          r="11"
          className={cn(
            index === 0 ? "fill-primary" : "fill-primary/25",
            "transition-none",
          )}
        />
      ))}

      {/* Queue channel */}
      <rect
        x="88"
        y="78"
        width="104"
        height="164"
        rx="12"
        className={cn(STROKE, "fill-primary/5")}
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
      <path
        d="M112 108h56M112 138h56M112 168h56M112 198h32"
        className={cn(STROKE, "opacity-45")}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Distribution */}
      {[96, 160, 224].map((y, index) => (
        <path
          key={y}
          d={`M192 160 C 232 160, 236 ${y}, 268 ${y}`}
          className={cn(STROKE, index === 1 ? "opacity-90" : "opacity-45")}
          strokeWidth="1.5"
          fill="none"
        />
      ))}

      {/* Agents */}
      {[96, 160, 224].map((y, index) => (
        <g key={y}>
          <rect
            x="268"
            y={y - 22}
            width="108"
            height="44"
            rx="10"
            className={cn(
              FAINT,
              index === 1 ? "fill-primary/10" : "fill-muted/40",
            )}
            strokeWidth="1.5"
          />
          <circle
            cx="292"
            cy={y}
            r="8"
            className={index === 1 ? "fill-primary" : "fill-primary/30"}
          />
          <path
            d={`M310 ${y - 4}h48M310 ${y + 5}h30`}
            className={cn(FAINT, "opacity-90")}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      ))}
    </>
  );
}

/** Communication APIs: a request crossing into the network, and back. */
function ApiDiagram() {
  return (
    <>
      {/* Application window */}
      <rect
        x="24"
        y="84"
        width="150"
        height="152"
        rx="12"
        className={cn(FAINT, "fill-muted/40")}
        strokeWidth="1.5"
      />
      <path d="M24 112h150" className={FAINT} strokeWidth="1.5" />
      {[100].map((y) => (
        <g key={y}>
          <circle cx="42" cy="98" r="3.5" className="fill-primary/40" />
          <circle cx="56" cy="98" r="3.5" className="fill-primary/25" />
          <circle cx="70" cy="98" r="3.5" className="fill-primary/25" />
        </g>
      ))}
      {/* Code lines */}
      {[136, 154, 172, 190, 208].map((y, index) => (
        <path
          key={y}
          d={`M44 ${y}h${[92, 64, 108, 72, 50][index]}`}
          className={cn(
            index === 2 ? "stroke-primary" : FAINT,
            index === 2 ? "opacity-90" : "opacity-80",
          )}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}

      {/* Request out */}
      <path
        d="M174 138 H286"
        className={STROKE}
        strokeWidth="1.5"
        strokeDasharray="5 5"
        fill="none"
      />
      <path
        d="M278 132l8 6-8 6"
        className={STROKE}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Response back */}
      <path
        d="M286 186 H174"
        className={cn(STROKE, "opacity-50")}
        strokeWidth="1.5"
        strokeDasharray="5 5"
        fill="none"
      />
      <path
        d="M182 180l-8 6 8 6"
        className={cn(STROKE, "opacity-50")}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Network */}
      <circle
        cx="344"
        cy="160"
        r="58"
        className={cn(STROKE, "fill-primary/5")}
        strokeWidth="1.5"
      />
      <circle cx="344" cy="160" r="9" className="fill-primary" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <circle
            key={angle}
            cx={344 + Math.cos(rad) * 38}
            cy={160 + Math.sin(rad) * 38}
            r="5"
            className="fill-primary/40"
          />
        );
      })}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <path
            key={angle}
            d={`M344 160 L${344 + Math.cos(rad) * 38} ${160 + Math.sin(rad) * 38}`}
            className={cn(STROKE, "opacity-30")}
            strokeWidth="1.5"
          />
        );
      })}
    </>
  );
}

/** Enterprise: several systems meeting at one controlled edge. */
function EdgeDiagram() {
  return (
    <>
      {/* Internal systems */}
      {[86, 146, 206].map((y, index) => (
        <g key={y}>
          <rect
            x="24"
            y={y}
            width="104"
            height="42"
            rx="9"
            className={cn(
              FAINT,
              index === 1 ? "fill-primary/10" : "fill-muted/40",
            )}
            strokeWidth="1.5"
          />
          <path
            d={`M44 ${y + 16}h48M44 ${y + 27}h30`}
            className={cn(FAINT, "opacity-90")}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d={`M128 ${y + 21} C 168 ${y + 21}, 172 160, 202 160`}
            className={cn(STROKE, index === 1 ? "opacity-90" : "opacity-45")}
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      ))}

      {/* The controlled edge */}
      <rect
        x="202"
        y="92"
        width="60"
        height="136"
        rx="14"
        className={cn(STROKE, "fill-primary/10")}
        strokeWidth="2"
      />
      <path
        d="M232 128v64"
        className={STROKE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="232" cy="118" r="6" className="fill-primary" />

      {/* External */}
      <path
        d="M262 160 H316"
        className={STROKE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M336 134c-12 0-22 10-22 22s10 22 22 22h44c14 0 25-11 25-24s-11-24-25-24c-5-11-16-18-28-18-14 0-26 10-29 22z"
        className={cn(STROKE, "fill-primary/5")}
        strokeWidth="1.5"
      />
    </>
  );
}

const DIAGRAMS: Record<string, () => React.JSX.Element> = {
  "business-voice": TrunkDiagram,
  "phone-numbers": NumbersDiagram,
  "contact-center": QueueDiagram,
  "communication-apis": ApiDiagram,
  "enterprise-features": EdgeDiagram,
};

export function ProductIllustration({ category, className }: Props) {
  const Diagram = DIAGRAMS[category] ?? TrunkDiagram;

  return (
    <svg
      // Cropped to the band the diagrams occupy, so they fill the container
      // rather than floating in empty space.
      viewBox="16 60 416 200"
      role="presentation"
      aria-hidden
      className={cn("h-auto w-full", className)}
    >
      <Diagram />
    </svg>
  );
}
