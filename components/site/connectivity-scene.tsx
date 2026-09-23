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
