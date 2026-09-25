import type { SceneKind } from "@/lib/internet";
import { cn } from "@/lib/utils";

/**
 * Schematic illustrations for the internet and network pages, in the same
 * visual language as SolutionIllustration — inline SVG built from theme
 * tokens, a faint grid field for depth, and a single live path carrying the
 * animation. Nothing is downloaded and both themes work for free.
 *
 * Each scene draws the actual topology of its service rather than decorating
 * the page: the reader should be able to point at where their office is in
 * the picture. Every scene labels its own parts, so when motion is turned
 * off the diagram still says the same thing — see the reduced-motion block
 * for `.scene-*` in globals.css.
 */
type Props = {
  scene: SceneKind;
  className?: string;
};

/** Shared defs: grid, edge fade and the glow filter. */
function Defs({ uid }: { uid: string }) {
  return (
    <defs>
      <pattern
        id={`cgrid-${uid}`}
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

      <radialGradient id={`cfade-${uid}`} cx="50%" cy="50%" r="62%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>

      <mask id={`cgridmask-${uid}`}>
        <rect x="0" y="0" width="440" height="280" fill={`url(#cfade-${uid})`} />
      </mask>

      <filter id={`cglow-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/** A labelled enclosure. `tone` decides how much of the eye it takes. */
function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  tone = "quiet",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  tone?: "quiet" | "active" | "solid";
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        className={cn(
          tone === "solid" ? "fill-primary" : "fill-background",
          tone === "quiet" ? "stroke-border" : "stroke-primary",
        )}
        strokeWidth={tone === "quiet" ? 1.5 : 1.75}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + (sub ? -2 : 3)}
        textAnchor="middle"
        className={cn(
          "text-[8px] font-medium [font-family:var(--font-mono)]",
          tone === "solid" ? "fill-primary-foreground" : "fill-foreground/80",
        )}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 10}
          textAnchor="middle"
          className={cn(
            "text-[7px] [font-family:var(--font-mono)]",
            tone === "solid"
              ? "fill-primary-foreground/70"
              : "fill-muted-foreground/70",
          )}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

/** A caption sitting under something, centred on it. */
function Caption({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      className="fill-muted-foreground/70 text-[7.5px] font-medium [font-family:var(--font-mono)]"
    >
      {text}
    </text>
  );
}

/**
 * A connection. Draws the resting wire and, unless `still`, a packet
 * travelling it. `pathLength="100"` normalises the dash so a short wire and
 * a long one are crossed at the same rate.
 */
function Wire({
  d,
  delay = 0,
  duration = 3,
  still = false,
  dimmed = false,
}: {
  d: string;
  delay?: number;
  duration?: number;
  still?: boolean;
  dimmed?: boolean;
}) {
  return (
    <>
      <path
        d={d}
        fill="none"
        pathLength={100}
        className={dimmed ? "stroke-border/60" : "stroke-border"}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray={dimmed ? "3 4" : undefined}
      />
      {still ? null : (
        <path
          d={d}
          fill="none"
          pathLength={100}
          className="scene-dash stroke-primary"
          strokeWidth="3"
          strokeLinecap="round"
          style={
            {
              "--dash-delay": `${delay}s`,
              "--dash-duration": `${duration}s`,
            } as React.CSSProperties
          }
        />
      )}
    </>
  );
}

/** The SipLink core, drawn the same way wherever it appears. */
function Core({
  x,
  y,
  uid,
  label = "SIPLINK",
  r = 26,
}: {
  x: number;
  y: number;
  uid: string;
  label?: string;
  r?: number;
}) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <circle
        cx={x}
        cy={y}
        r={r / 3.6}
        className="fill-primary"
        filter={`url(#cglow-${uid})`}
      />
      <Caption x={x} y={y + r + 14} text={label} />
    </g>
  );
}

/* ------------------------------------------------------------- scenes */

/** BROADBAND — the everyday office: devices, one router, the internet. */
function BroadbandScene() {
  const rows = [
    { y: 58, label: "Desktops" },
    { y: 118, label: "IP phones" },
    { y: 178, label: "Wi-Fi" },
  ];

  return (
    <>
      {rows.map(({ y, label }, index) => (
        <g key={label}>
          <Box x={26} y={y} w={84} h={40} label={label} />
          <Wire
            d={`M110 ${y + 20} H150 Q166 ${y + 20} 166 140 H182`}
            delay={index * 0.45}
          />
        </g>
      ))}

      <Box
        x={182}
        y={110}
        w={78}
        h={60}
        label="Router"
        sub="managed"
        tone="active"
      />

      <Wire d="M260 140 H310" delay={0.2} duration={2.4} />
      <Box
        x={310}
        y={104}
        w={104}
        h={72}
        label="Internet"
        sub="business line"
        tone="active"
      />
      <Caption x={362} y={194} text="cloud · email · VoIP" />
    </>
  );
}

/** DEDICATED — one port, provisioned for you, with nobody else on it. */
function DedicatedScene({ uid }: { uid: string }) {
  return (
    <>
      <Box x={24} y={104} w={92} h={64} label="Your site" tone="active" />

      {/* The dedicated port: a single wide channel rather than a shared bus. */}
      <rect
        x={124}
        y={112}
        width={176}
        height={48}
        rx="10"
        className="fill-primary/5 stroke-primary/40"
        strokeWidth="1.5"
      />
      <Caption x={212} y={104} text="dedicated port" />

      <Wire d="M116 136 H300" delay={0} duration={2.2} />
      <Wire d="M116 136 H300" delay={1.1} duration={2.2} />

      {/* Committed rate, drawn as a bar that always reaches the same mark. */}
      <rect
        x={140}
        y={144}
        width={144}
        height={5}
        rx="2.5"
        className="fill-border"
      />
      <rect
        x={140}
        y={144}
        width={144}
        height={5}
        rx="2.5"
        className="scene-meter fill-primary"
      />
      <Caption x={212} y={170} text="committed rate" />

      <Core x={340} y={136} uid={uid} label="TIER-1 PEERING" r={24} />

      {/* The comparison that makes the point: a contended line shares. */}
      <Wire d="M116 208 H300" still dimmed />
      <Caption x={212} y={226} text="not a shared segment" />
    </>
  );
}

/** STATIC IP — one fixed address that everything else is configured against. */
function StaticIpScene({ uid }: { uid: string }) {
  const clients = [
    { y: 44, label: "VPN" },
    { y: 100, label: "Allowlist" },
    { y: 156, label: "SIP trunk" },
    { y: 212, label: "Monitoring" },
  ];

  return (
    <>
      {clients.map(({ y, label }, index) => (
        <g key={label}>
          <Box x={22} y={y} w={84} h={34} label={label} />
          <Wire
            d={`M106 ${y + 17} H150 Q170 ${y + 17} 170 140 H206`}
            delay={index * 0.4}
            duration={2.6}
          />
        </g>
      ))}

      {/* The address itself — the one thing on this page that must not move. */}
      <rect
        x={206}
        y={112}
        width={150}
        height={56}
        rx="10"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <text
        x={281}
        y={136}
        textAnchor="middle"
        className="fill-primary text-[11px] font-semibold [font-family:var(--font-mono)]"
      >
        203.0.113.24
      </text>
      <text
        x={281}
        y={152}
        textAnchor="middle"
        className="fill-muted-foreground/70 text-[7.5px] [font-family:var(--font-mono)]"
      >
        fixed · public · yours
      </text>

      <circle
        cx={281}
        cy={100}
        r="4"
        className="scene-pulse fill-primary"
        filter={`url(#cglow-${uid})`}
      />
      <Caption x={281} y={188} text="never reassigned" />
    </>
  );
}

/** NETWORK — the whole stack, from the circuit down to the desk. */
function NetworkScene({ uid }: { uid: string }) {
  const tiers = [
    { y: 34, label: "Internet", sub: "broadband · dedicated" },
    { y: 92, label: "Firewall", sub: "policy · VPN" },
    { y: 150, label: "Switching", sub: "VLAN · PoE" },
    { y: 208, label: "Wi-Fi & devices", sub: "users · phones" },
  ];

  return (
    <>
      {tiers.map(({ y, label, sub }, index) => (
        <g key={label}>
          <Box
            x={120}
            y={y}
            w={200}
            h={40}
            label={label}
            sub={sub}
            tone={index === 0 ? "active" : "quiet"}
          />
          {index < tiers.length - 1 ? (
            <g
              className="stack-drop"
              style={{ "--drop-delay": `${index * 0.3}s` } as React.CSSProperties}
            >
              <path
                d={`M220 ${y + 40} V${y + 54}`}
                className="stroke-primary"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d={`M216 ${y + 50} L220 ${y + 55} L224 ${y + 50}`}
                fill="none"
                className="stroke-primary"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ) : null}
        </g>
      ))}

      <circle
        cx={92}
        cy={54}
        r="4"
        className="scene-pulse fill-primary"
        filter={`url(#cglow-${uid})`}
      />
      <Caption x={68} y={140} text="managed" />
    </>
  );
}

/** FIREWALL — the gate: what gets through, and what does not. */
function FirewallScene() {
  return (
    <>
      <Box x={20} y={104} w={88} h={64} label="Internet" />

      {/* Allowed traffic crosses. */}
      <Wire d="M108 122 H186" delay={0} duration={2.2} />
      {/* Blocked traffic stops at the gate — no packet animates this one. */}
      <Wire d="M108 152 H180" still dimmed />
      <path
        d="M176 147 L186 157 M186 147 L176 157"
        className="stroke-destructive"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* The gate. */}
      <rect
        x={186}
        y={74}
        width={70}
        height={126}
        rx="12"
        className="fill-primary/5 stroke-primary"
        strokeWidth="1.75"
      />
      <path
        d="M221 104 L237 111 V129 C237 140 230 148 221 152 C212 148 205 140 205 129 V111 Z"
        className="fill-primary/15 stroke-primary"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <Caption x={221} y={214} text="policy · NAT · VPN" />

      <Wire d="M256 122 H312" delay={0.5} duration={2.2} />

      <Box x={312} y={68} w={104} h={44} label="LAN" tone="active" />
      <Box x={312} y={122} w={104} h={40} label="Servers" />
      <Box x={312} y={172} w={104} h={40} label="Wi-Fi" />
      <Wire d="M256 130 Q290 130 290 142 H312" delay={0.9} duration={2.4} />
      <Wire d="M256 138 Q290 138 290 192 H312" delay={1.3} duration={2.4} />
    </>
  );
}

/** WI-FI — coverage across a floor, not a box in a corner. */
function WifiScene({ uid }: { uid: string }) {
  const aps = [
    { x: 120, y: 92 },
    { x: 300, y: 92 },
    { x: 210, y: 196 },
  ];

  return (
    <>
      {/* The floor plate. */}
      <rect
        x={40}
        y={44}
        width={360}
        height={196}
        rx="14"
        className="fill-muted/30 stroke-border"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />

      {aps.map(({ x, y }, index) => (
        <g key={`${x}-${y}`}>
          {[0, 1, 2].map((ring) => (
            <circle
              key={ring}
              cx={x}
              cy={y}
              r="46"
              className="scene-ring fill-none stroke-primary"
              strokeWidth="1.5"
              style={
                {
                  "--ring-delay": `${index * 0.5 + ring * 0.9}s`,
                } as React.CSSProperties
              }
            />
          ))}
          <circle
            cx={x}
            cy={y}
            r="13"
            className="fill-background stroke-primary"
            strokeWidth="1.75"
          />
          <circle
            cx={x}
            cy={y}
            r="4"
            className="scene-pulse fill-primary"
            filter={`url(#cglow-${uid})`}
            style={
              { "--pulse-delay": `${index * 0.5}s` } as React.CSSProperties
            }
          />
          <Caption x={x} y={y + 28} text={`AP ${index + 1}`} />
        </g>
      ))}

      <Caption x={220} y={32} text="coverage planned to the floor plan" />
      <Caption x={220} y={258} text="employee SSID · guest SSID · roaming" />
    </>
  );
}

/** LAN — one switch, and everything that expects a port. */
function LanScene() {
  const ports = [
    { y: 44, label: "Desktops", vlan: "VLAN 10" },
    { y: 96, label: "IP phones", vlan: "VLAN 20" },
    { y: 148, label: "Wi-Fi APs", vlan: "VLAN 30" },
    { y: 200, label: "Cameras", vlan: "VLAN 40" },
  ];

  return (
    <>
      {/* The switch chassis, with a port strip along its face. */}
      <rect
        x={40}
        y={92}
        width={104}
        height={96}
        rx="10"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <Caption x={92} y={84} text="MANAGED SWITCH" />
      {Array.from({ length: 8 }).map((_, index) => (
        <rect
          key={index}
          x={54 + (index % 4) * 21}
          y={110 + Math.floor(index / 4) * 20}
          width={14}
          height={11}
          rx="2"
          className="scene-pulse fill-primary"
          style={
            { "--pulse-delay": `${index * 0.18}s` } as React.CSSProperties
          }
        />
      ))}
      <Caption x={92} y={172} text="PoE" />

      {ports.map(({ y, label, vlan }, index) => (
        <g key={label}>
          <Wire
            d={`M144 140 H196 Q214 140 214 ${y + 18} H262`}
            delay={index * 0.35}
            duration={2.8}
          />
          <Box x={262} y={y} w={112} h={36} label={label} sub={vlan} />
        </g>
      ))}
    </>
  );
}

/** VPN — two sites, one encrypted path, nothing exposed in between. */
function VpnScene() {
  return (
    <>
      <Box x={20} y={104} w={92} h={62} label="Head office" tone="active" />
      <Box x={328} y={104} w={92} h={62} label="Branch" tone="active" />

      {/* The tunnel: a sheath around the live path, so the path reads as
          carried rather than merely drawn. */}
      <rect
        x={112}
        y={116}
        width={216}
        height={38}
        rx="19"
        className="fill-primary/5 stroke-primary/40"
        strokeWidth="1.5"
      />
      <Wire d="M112 135 H328" delay={0} duration={2.6} />
      <Wire d="M328 135 H112" delay={1.3} duration={2.6} />

      {/* The lock sits on the tunnel, centred. */}
      <rect
        x={202}
        y={118}
        width={36}
        height={34}
        rx="9"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <path
        d="M214 132 V127 A6 6 0 0 1 226 127 V132"
        fill="none"
        className="stroke-primary"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <rect
        x={211}
        y={132}
        width={18}
        height={13}
        rx="3"
        className="fill-primary"
      />

      <Caption x={220} y={172} text="encrypted site-to-site" />

      {/* Remote users join the same tunnel rather than a second network. */}
      <Box x={170} y={210} w={100} h={34} label="Remote users" />
      <Wire d="M220 210 V172" delay={0.7} duration={2.4} />
    </>
  );
}

/** SD-WAN — several links, and something deciding between them. */
function SdWanScene({ uid }: { uid: string }) {
  const links = [
    { y: 66, label: "Fibre", active: true },
    { y: 136, label: "Broadband", active: false },
    { y: 206, label: "LTE backup", active: false },
  ];

  return (
    <>
      <Box x={18} y={106} w={86} h={60} label="Branch" tone="active" />

      {links.map(({ y, label, active }, index) => (
        <g key={label}>
          <Wire
            d={`M104 136 Q142 136 142 ${y + 16} H196`}
            delay={index * 0.5}
            duration={2.6}
            still={!active}
            dimmed={!active}
          />
          <Box
            x={196}
            y={y}
            w={94}
            h={32}
            label={label}
            tone={active ? "active" : "quiet"}
          />
          <Wire
            d={`M290 ${y + 16} H330 Q352 ${y + 16} 352 136`}
            delay={index * 0.5 + 0.6}
            duration={2.6}
            still={!active}
            dimmed={!active}
          />
        </g>
      ))}

      <Core x={376} y={136} uid={uid} label="CLOUD" r={22} />

      {/* The controller is what makes this SD-WAN rather than three links. */}
      <rect
        x={150}
        y={244}
        width={140}
        height={26}
        rx="8"
        className="fill-primary/5 stroke-primary/40"
        strokeWidth="1.5"
      />
      <text
        x={220}
        y={261}
        textAnchor="middle"
        className="fill-primary text-[7.5px] font-medium [font-family:var(--font-mono)]"
      >
        application-aware routing
      </text>
    </>
  );
}

/** MULTI-SITE — one network, however many pins are on the map. */
function MultiSiteScene({ uid }: { uid: string }) {
  const spokes = [
    { x: 64, y: 54, label: "Branch" },
    { x: 376, y: 54, label: "Store" },
    { x: 40, y: 190, label: "Warehouse" },
    { x: 400, y: 190, label: "Campus" },
    { x: 220, y: 246, label: "Remote users" },
  ];

  return (
    <>
      {spokes.map(({ x, y, label }, index) => (
        <g key={label}>
          <Wire
            d={`M${x} ${y} Q${(x + 220) / 2} ${(y + 130) / 2} 220 130`}
            delay={index * 0.42}
            duration={3.2}
          />
          <circle
            cx={x}
            cy={y}
            r="13"
            className="fill-background stroke-primary"
            strokeWidth="1.75"
          />
          <circle
            cx={x}
            cy={y}
            r="4.5"
            className="scene-pulse fill-primary"
            style={
              { "--pulse-delay": `${index * 0.42}s` } as React.CSSProperties
            }
          />
          <Caption x={x} y={y + 27} text={label} />
        </g>
      ))}

      <Core x={220} y={130} uid={uid} label="ONE NETWORK" r={28} />
    </>
  );
}

/* ------------------------------------------------ business broadband */

/** APPLICATIONS — one line, and everything a workday puts on it at once. */
function ApplicationsScene({ uid }: { uid: string }) {
  const apps = [
    "Email",
    "Microsoft 365",
    "CRM / ERP",
    "Video calls",
    "VoIP",
    "File sharing",
    "Payments",
    "CCTV",
    "Remote access",
  ];

  return (
    <>
      <Core x={50} y={140} uid={uid} label="ONE LINE" r={22} />

      {/* The spine everything hangs off. */}
      <path
        d="M78 140 H120"
        className="stroke-border"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M120 46 V234"
        className="stroke-border"
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      {apps.map((label, index) => {
        const column = index % 3;
        const row = Math.floor(index / 3);
        const x = 148 + column * 98;
        const y = 46 + row * 94;

        return (
          <g key={label}>
            {/* Only the leftmost column joins the spine; the rest chain
                across, so the picture stays a network and not a starburst. */}
            <Wire
              d={
                column === 0
                  ? `M120 ${y + 22} H${x}`
                  : `M${x - 22} ${y + 22} H${x}`
              }
              delay={index * 0.22}
              duration={2.6}
            />
            <rect
              x={x}
              y={y}
              width={76}
              height={44}
              rx="9"
              className="fill-background stroke-border"
              strokeWidth="1.5"
            />
            <circle
              cx={x + 12}
              cy={y + 13}
              r="3"
              className="scene-pulse fill-primary"
              style={
                { "--pulse-delay": `${index * 0.22}s` } as React.CSSProperties
              }
            />
            <text
              x={x + 38}
              y={y + 30}
              textAnchor="middle"
              className="fill-foreground/80 text-[7.5px] font-medium [font-family:var(--font-mono)]"
            >
              {label}
            </text>
          </g>
        );
      })}

      <Caption x={222} y={262} text="all of it, at the same time" />
    </>
  );
}

/** WORKDAY — the benefit is that nothing happens, all day. */
function WorkdayScene({ uid }: { uid: string }) {
  const hours = ["09", "11", "13", "15", "17"];
  const markers = [
    { x: 92, label: "Standup call" },
    { x: 176, label: "Cloud CRM" },
    { x: 260, label: "File sync" },
    { x: 344, label: "Client video" },
  ];

  return (
    <>
      <Caption x={220} y={40} text="a connection you stop thinking about" />

      {/* The day, as a baseline that does not move. */}
      <path
        d="M46 168 H400"
        className="stroke-border"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {hours.map((hour, index) => (
        <g key={hour}>
          <path
            d={`M${56 + index * 86} 168 V176`}
            className="stroke-border"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text
            x={56 + index * 86}
            y={190}
            textAnchor="middle"
            className="fill-muted-foreground/70 text-[7.5px] [font-family:var(--font-mono)]"
          >
            {hour}
          </text>
        </g>
      ))}

      {/* Steady throughput across the whole day — deliberately flat. */}
      <path
        d="M46 128 H400"
        className="stroke-primary/40"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 5"
      />
      <Caption x={220} y={118} text="steady" />

      {markers.map(({ x, label }, index) => (
        <g key={label}>
          <circle
            cx={x}
            cy={128}
            r="5"
            className="scene-pulse fill-primary"
            style={
              { "--pulse-delay": `${index * 0.6}s` } as React.CSSProperties
            }
          />
          <path
            d={`M${x} 133 V152`}
            className="stroke-border"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text
            x={x}
            y={84 + (index % 2) * 14}
            textAnchor="middle"
            className="fill-foreground/80 text-[7.5px] font-medium [font-family:var(--font-mono)]"
          >
            {label}
          </text>
          <path
            d={`M${x} ${88 + (index % 2) * 14} V123`}
            className="stroke-border"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="3 4"
          />
        </g>
      ))}

      {/* The playhead crossing the day. */}
      <g
        className="scene-sweep"
        style={{ "--sweep-distance": "344px" } as React.CSSProperties}
      >
        <path
          d="M46 104 V168"
          className="stroke-primary"
          strokeWidth="2"
          strokeLinecap="round"
          filter={`url(#cglow-${uid})`}
        />
      </g>

      <Caption x={220} y={222} text="nine to five, without a dip" />
    </>
  );
}

/* -------------------------------------------------- dedicated internet */

/** CONTENTION — the same hour, on a shared line and on a dedicated one. */
function ContentionScene({ uid }: { uid: string }) {
  return (
    <>
      {/* Shared: capacity divided among strangers, throughput lurching. */}
      <text
        x={24}
        y={64}
        className="fill-muted-foreground/70 text-[7.5px] font-medium [font-family:var(--font-mono)]"
      >
        SHARED SEGMENT
      </text>
      <rect
        x={24}
        y={76}
        width={392}
        height={26}
        rx="8"
        className="fill-muted/40 stroke-border"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
      <rect
        x={30}
        y={82}
        width={380}
        height={14}
        rx="7"
        className="scene-jitter fill-destructive/60"
      />
      <Caption x={220} y={118} text="what you get depends on the neighbours" />

      {/* Other subscribers on the same segment. */}
      {[0, 1, 2, 3, 4].map((index) => (
        <circle
          key={index}
          cx={72 + index * 76}
          cy={140}
          r="4"
          className="scene-pulse fill-muted-foreground/40"
          style={
            { "--pulse-delay": `${index * 0.35}s` } as React.CSSProperties
          }
        />
      ))}

      {/* Dedicated: the same bar, holding. */}
      <text
        x={24}
        y={182}
        className="fill-primary text-[7.5px] font-medium [font-family:var(--font-mono)]"
      >
        DEDICATED PORT
      </text>
      <rect
        x={24}
        y={194}
        width={392}
        height={26}
        rx="8"
        className="fill-primary/5 stroke-primary"
        strokeWidth="1.75"
      />
      <rect
        x={30}
        y={200}
        width={380}
        height={14}
        rx="7"
        className="fill-primary"
        filter={`url(#cglow-${uid})`}
      />
      <Caption x={220} y={238} text="the same at 09:00 and at 17:00" />
    </>
  );
}

/** SYMMETRY — two directions, one capacity, reaching the same mark. */
function SymmetryScene({ uid }: { uid: string }) {
  return (
    <>
      <Caption x={220} y={36} text="equal in both directions" />

      {/* Download */}
      <text
        x={24}
        y={82}
        className="fill-muted-foreground/70 text-[7.5px] font-medium [font-family:var(--font-mono)]"
      >
        DOWNLOAD
      </text>
      <rect
        x={110}
        y={70}
        width={286}
        height={16}
        rx="8"
        className="fill-border"
      />
      <rect
        x={110}
        y={70}
        width={286}
        height={16}
        rx="8"
        className="scene-meter fill-primary"
      />
      <path
        d="M386 78 L396 78 M391 73 L396 78 L391 83"
        fill="none"
        className="stroke-primary"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Upload — same width, same timing, mirrored. */}
      <text
        x={24}
        y={124}
        className="fill-muted-foreground/70 text-[7.5px] font-medium [font-family:var(--font-mono)]"
      >
        UPLOAD
      </text>
      <rect
        x={110}
        y={112}
        width={286}
        height={16}
        rx="8"
        className="fill-border"
      />
      <rect
        x={110}
        y={112}
        width={286}
        height={16}
        rx="8"
        className="scene-meter fill-primary"
        style={{ "--meter-delay": "0.1s" } as React.CSSProperties}
      />
      <path
        d="M120 120 L110 120 M115 115 L110 120 L115 125"
        fill="none"
        className="stroke-primary"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The asymmetric alternative, for contrast. */}
      <text
        x={24}
        y={186}
        className="fill-muted-foreground/60 text-[7.5px] font-medium [font-family:var(--font-mono)]"
      >
        ASYMMETRIC
      </text>
      <rect
        x={110}
        y={174}
        width={286}
        height={12}
        rx="6"
        className="fill-border/70"
      />
      <rect
        x={110}
        y={174}
        width={286}
        height={12}
        rx="6"
        className="fill-muted-foreground/25"
      />
      <rect
        x={110}
        y={194}
        width={286}
        height={12}
        rx="6"
        className="fill-border/70"
      />
      <rect
        x={110}
        y={194}
        width={52}
        height={12}
        rx="6"
        className="fill-muted-foreground/25"
      />
      <Caption x={220} y={226} text="where the upload quietly runs out" />
      <circle
        cx={396}
        cy={200}
        r="3.5"
        className="scene-pulse fill-destructive/70"
        filter={`url(#cglow-${uid})`}
      />
    </>
  );
}

/** SLA — the commitment, and the three places a fault actually happens. */
function SlaScene({ uid }: { uid: string }) {
  const covered = [
    { y: 74, label: "SipLink equipment" },
    { y: 120, label: "Local access network" },
    { y: 166, label: "IP network" },
  ];

  return (
    <>
      {/* The agreement itself. */}
      <rect
        x={24}
        y={56}
        width={150}
        height={168}
        rx="12"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <path
        d="M99 84 L117 92 V112 C117 125 109 134 99 139 C89 134 81 125 81 112 V92 Z"
        className="fill-primary/15 stroke-primary"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {[0, 1, 2].map((row) => (
        <rect
          key={row}
          x={48}
          y={158 + row * 16}
          width={102 - row * 24}
          height={4}
          rx="2"
          className="fill-border"
        />
      ))}
      <Caption x={99} y={240} text="in your agreement" />

      {/* What it covers, ticked in sequence. */}
      {covered.map(({ y, label }, index) => (
        <g key={label}>
          <Wire
            d={`M174 140 Q198 140 198 ${y + 16} H224`}
            delay={index * 0.5}
            duration={2.8}
          />
          <rect
            x={224}
            y={y}
            width={192}
            height={32}
            rx="9"
            className="fill-background stroke-border"
            strokeWidth="1.5"
          />
          <g
            className="scene-tick"
            style={
              { "--tick-delay": `${index * 0.55}s` } as React.CSSProperties
            }
          >
            <circle cx={244} cy={y + 16} r="8" className="fill-primary" />
            <path
              d="M240 16 l3 3 l5 -6"
              transform={`translate(0 ${y - 16})`}
              fill="none"
              className="stroke-primary-foreground"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <text
            x={262}
            y={y + 20}
            className="fill-foreground/80 text-[7.5px] font-medium [font-family:var(--font-mono)]"
          >
            {label}
          </text>
        </g>
      ))}

      <circle
        cx={320}
        cy={216}
        r="4"
        className="scene-pulse fill-primary"
        filter={`url(#cglow-${uid})`}
      />
      <Caption x={320} y={236} text="monitored 24/7 from Chennai" />
    </>
  );
}

/** ENTERPRISE — requirements in, architecture out. */
function EnterpriseScene({ uid }: { uid: string }) {
  const inputs = [
    "Applications",
    "Locations",
    "Cloud",
    "Voice",
    "Security",
    "Redundancy",
  ];

  return (
    <>
      <Caption x={74} y={34} text="what you tell us" />

      {inputs.map((label, index) => {
        const y = 52 + index * 34;
        return (
          <g key={label}>
            <rect
              x={20}
              y={y}
              width={108}
              height={24}
              rx="7"
              className="fill-background stroke-border"
              strokeWidth="1.5"
            />
            <text
              x={74}
              y={y + 16}
              textAnchor="middle"
              className="fill-foreground/80 text-[7.5px] font-medium [font-family:var(--font-mono)]"
            >
              {label}
            </text>
            <Wire
              d={`M128 ${y + 12} Q168 ${y + 12} 168 140 H196`}
              delay={index * 0.28}
              duration={3}
            />
          </g>
        );
      })}

      {/* The design that falls out of them. */}
      <circle
        cx={252}
        cy={140}
        r="52"
        className="fill-none stroke-primary/25"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
      <circle
        cx={252}
        cy={140}
        r="34"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <circle
        cx={252}
        cy={140}
        r="9"
        className="fill-primary"
        filter={`url(#cglow-${uid})`}
      />
      <Caption x={252} y={208} text="a design, not a price list" />

      {/* Outputs radiating to the things the design has to reach. */}
      {[
        { x: 372, y: 74, label: "Data centre" },
        { x: 386, y: 140, label: "Cloud" },
        { x: 372, y: 206, label: "Branches" },
      ].map(({ x, y, label }, index) => (
        <g key={label}>
          <Wire
            d={`M286 140 Q${(286 + x) / 2} ${(140 + y) / 2} ${x - 14} ${y}`}
            delay={index * 0.45 + 0.4}
            duration={2.8}
          />
          <circle
            cx={x}
            cy={y}
            r="11"
            className="fill-background stroke-primary"
            strokeWidth="1.75"
          />
          <circle
            cx={x}
            cy={y}
            r="4"
            className="scene-pulse fill-primary"
            style={
              { "--pulse-delay": `${index * 0.45}s` } as React.CSSProperties
            }
          />
          <Caption x={x} y={y + 24} text={label} />
        </g>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ static IP */

/** ADDRESS — one side keeps changing, the other never does. */
function AddressScene({ uid }: { uid: string }) {
  const rotating = ["198.51.100.7", "203.0.113.88", "192.0.2.41", "198.51.100.62"];

  return (
    <>
      {/* Dynamic */}
      <text
        x={112}
        y={64}
        textAnchor="middle"
        className="fill-muted-foreground/70 text-[7.5px] font-medium [font-family:var(--font-mono)]"
      >
        DYNAMIC
      </text>
      <rect
        x={26}
        y={78}
        width={172}
        height={62}
        rx="11"
        className="fill-muted/40 stroke-border"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
      {/* Four values stacked in one place, one visible at a time. */}
      {rotating.map((value, index) => (
        <text
          key={value}
          x={112}
          y={115}
          textAnchor="middle"
          className="scene-swap fill-muted-foreground text-[11px] font-semibold [font-family:var(--font-mono)]"
          style={
            { "--swap-delay": `${index * 1.2}s` } as React.CSSProperties
          }
        >
          {value}
        </text>
      ))}
      <Caption x={112} y={160} text="reassigned without warning" />

      {/* Rules written against it break when it moves. */}
      <rect
        x={26}
        y={182}
        width={172}
        height={44}
        rx="10"
        className="fill-background stroke-border"
        strokeWidth="1.5"
      />
      <path
        d="M52 197 L64 209 M64 197 L52 209"
        className="stroke-destructive"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x={122}
        y={208}
        textAnchor="middle"
        className="fill-muted-foreground/70 text-[7.5px] font-medium [font-family:var(--font-mono)]"
      >
        firewall rule stale
      </text>

      {/* Static */}
      <text
        x={328}
        y={64}
        textAnchor="middle"
        className="fill-primary text-[7.5px] font-medium [font-family:var(--font-mono)]"
      >
        STATIC
      </text>
      <rect
        x={242}
        y={78}
        width={172}
        height={62}
        rx="11"
        className="fill-primary/5 stroke-primary"
        strokeWidth="1.75"
      />
      <text
        x={328}
        y={115}
        textAnchor="middle"
        className="fill-primary text-[11px] font-semibold [font-family:var(--font-mono)]"
      >
        203.0.113.24
      </text>
      <circle
        cx={328}
        cy={132}
        r="3"
        className="scene-pulse fill-primary"
        filter={`url(#cglow-${uid})`}
      />
      <Caption x={328} y={160} text="the same one, every day" />

      <rect
        x={242}
        y={182}
        width={172}
        height={44}
        rx="10"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <g className="scene-tick">
        <circle cx={268} cy={203} r="9" className="fill-primary" />
        <path
          d="M264 203 l3 3 l6 -7"
          fill="none"
          className="stroke-primary-foreground"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text
        x={342}
        y={208}
        textAnchor="middle"
        className="fill-foreground/80 text-[7.5px] font-medium [font-family:var(--font-mono)]"
      >
        rule still correct
      </text>
    </>
  );
}

/** ALLOWLIST — the gate that a fixed address makes possible. */
function AllowlistScene({ uid }: { uid: string }) {
  const rows = [
    { y: 70, value: "203.0.113.24", allow: true },
    { y: 108, value: "198.51.100.9", allow: false },
    { y: 146, value: "203.0.113.24", allow: true },
    { y: 184, value: "192.0.2.77", allow: false },
  ];

  return (
    <>
      <Caption x={80} y={46} text="inbound" />

      {rows.map(({ y, value, allow }, index) => (
        <g key={`${value}-${y}`}>
          <rect
            x={20}
            y={y}
            width={122}
            height={26}
            rx="7"
            className={cn(
              "fill-background",
              allow ? "stroke-primary/60" : "stroke-border",
            )}
            strokeWidth="1.5"
          />
          <text
            x={81}
            y={y + 17}
            textAnchor="middle"
            className={cn(
              "text-[7.5px] font-medium [font-family:var(--font-mono)]",
              allow ? "fill-primary" : "fill-muted-foreground/70",
            )}
          >
            {value}
          </text>

          {/* Allowed traffic crosses the gate; the rest stops at it. */}
          {allow ? (
            <Wire
              d={`M142 ${y + 13} H188`}
              delay={index * 0.4}
              duration={2.4}
            />
          ) : (
            <>
              <Wire d={`M142 ${y + 13} H182`} still dimmed />
              <path
                d={`M178 ${y + 8} l10 10 M188 ${y + 8} l-10 10`}
                className="stroke-destructive"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          )}
        </g>
      ))}

      {/* The gate. */}
      <rect
        x={190}
        y={56}
        width={64}
        height={166}
        rx="12"
        className="fill-primary/5 stroke-primary"
        strokeWidth="1.75"
      />
      <text
        x={222}
        y={136}
        textAnchor="middle"
        transform="rotate(-90 222 136)"
        className="fill-primary text-[8px] font-medium [font-family:var(--font-mono)]"
      >
        ALLOWLIST
      </text>

      {/* What sits behind it. */}
      {[
        { y: 74, label: "Application" },
        { y: 124, label: "VPN" },
        { y: 174, label: "Partner API" },
      ].map(({ y, label }, index) => (
        <g key={label}>
          <Wire
            d={`M254 138 Q290 138 290 ${y + 16} H318`}
            delay={index * 0.45 + 0.5}
            duration={2.6}
          />
          <rect
            x={318}
            y={y}
            width={98}
            height={32}
            rx="9"
            className="fill-background stroke-border"
            strokeWidth="1.5"
          />
          <text
            x={367}
            y={y + 20}
            textAnchor="middle"
            className="fill-foreground/80 text-[7.5px] font-medium [font-family:var(--font-mono)]"
          >
            {label}
          </text>
        </g>
      ))}

      <circle
        cx={222}
        cy={238}
        r="3.5"
        className="scene-pulse fill-primary"
        filter={`url(#cglow-${uid})`}
      />
      <Caption x={222} y={256} text="known address, known rule" />
    </>
  );
}

/** PROVISION — the four steps between asking and it working. */
function ProvisionScene({ uid }: { uid: string }) {
  const steps = [
    "Tell us what needs it",
    "We confirm eligibility",
    "Assigned & documented",
    "Configured & tested",
  ];

  return (
    <>
      <Caption x={220} y={44} text="usually a change, not an installation" />

      {/* The rail the request travels. */}
      <path
        d="M56 140 H384"
        className="stroke-border"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M56 140 H384"
        fill="none"
        pathLength={100}
        className="scene-dash stroke-primary"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ "--dash-duration": "4.4s" } as React.CSSProperties}
      />

      {steps.map((label, index) => {
        const x = 56 + index * 109;
        const above = index % 2 === 0;

        return (
          <g key={label}>
            <circle
              cx={x}
              cy={140}
              r="13"
              className="fill-background stroke-primary"
              strokeWidth="1.75"
            />
            <text
              x={x}
              y={144}
              textAnchor="middle"
              className="fill-primary text-[8px] font-semibold [font-family:var(--font-mono)]"
            >
              {index + 1}
            </text>
            <path
              d={`M${x} ${above ? 127 : 153} V${above ? 108 : 172}`}
              className="stroke-border"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 4"
            />
            <rect
              x={x - 50}
              y={above ? 74 : 172}
              width={100}
              height={32}
              rx="9"
              className="fill-background stroke-border"
              strokeWidth="1.5"
            />
            <text
              x={x}
              y={above ? 94 : 192}
              textAnchor="middle"
              className="fill-foreground/80 text-[7px] font-medium [font-family:var(--font-mono)]"
            >
              {label}
            </text>
          </g>
        );
      })}

      <circle
        cx={384}
        cy={140}
        r="5"
        className="scene-pulse fill-primary"
        filter={`url(#cglow-${uid})`}
      />
      <Caption x={220} y={232} text="your circuit keeps running throughout" />
    </>
  );
}

/* ------------------------------------------------------------- indexes */

/** MODULES — the six network services, arranged around what they serve. */
function ModulesScene({ uid }: { uid: string }) {
  const modules = [
    { x: 92, y: 62, label: "Firewall" },
    { x: 348, y: 62, label: "Wi-Fi" },
    { x: 56, y: 140, label: "LAN" },
    { x: 384, y: 140, label: "VPN" },
    { x: 92, y: 218, label: "SD-WAN" },
    { x: 348, y: 218, label: "Multi-site" },
  ];

  return (
    <>
      {modules.map(({ x, y, label }, index) => (
        <g key={label}>
          <Wire
            d={`M${x} ${y} Q${(x + 220) / 2} ${(y + 140) / 2} 220 140`}
            delay={index * 0.35}
            duration={3}
          />
          <rect
            x={x - 40}
            y={y - 15}
            width={80}
            height={30}
            rx="9"
            className="fill-background stroke-primary"
            strokeWidth="1.75"
          />
          <text
            x={x}
            y={y + 4}
            textAnchor="middle"
            className="fill-foreground/80 text-[7.5px] font-medium [font-family:var(--font-mono)]"
          >
            {label}
          </text>
        </g>
      ))}

      <circle
        cx={220}
        cy={140}
        r="34"
        className="fill-background stroke-primary"
        strokeWidth="1.75"
      />
      <circle
        cx={220}
        cy={140}
        r="10"
        className="fill-primary"
        filter={`url(#cglow-${uid})`}
      />
      <Caption x={220} y={192} text="YOUR NETWORK" />
      <Caption x={220} y={262} text="designed together, not ordered apart" />
    </>
  );
}

const SCENES: Record<SceneKind, (props: { uid: string }) => React.JSX.Element> = {
  broadband: BroadbandScene,
  dedicated: DedicatedScene,
  "static-ip": StaticIpScene,
  network: NetworkScene,
  firewall: FirewallScene,
  wifi: WifiScene,
  lan: LanScene,
  vpn: VpnScene,
  sdwan: SdWanScene,
  multisite: MultiSiteScene,
  applications: ApplicationsScene,
  workday: WorkdayScene,
  contention: ContentionScene,
  symmetry: SymmetryScene,
  sla: SlaScene,
  enterprise: EnterpriseScene,
  address: AddressScene,
  allowlist: AllowlistScene,
  provision: ProvisionScene,
  modules: ModulesScene,
};

export function ConnectivityScene({ scene, className }: Props) {
  const Diagram = SCENES[scene] ?? NetworkScene;
  const uid = scene;

  return (
    <svg
      viewBox="0 0 440 280"
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
        fill={`url(#cgrid-${uid})`}
        mask={`url(#cgridmask-${uid})`}
      />
      <Diagram uid={uid} />
    </svg>
  );
}
