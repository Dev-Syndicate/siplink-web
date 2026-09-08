/**
 * The four media panels for the homepage solution showcase.
 *
 * These are diagrams, not decoration: each one draws the mechanism the
 * solution actually describes — a routing tree, a redundant network, a live
 * queue, a set of channels converging. Drawn as SVG rather than sourced as
 * screenshots because SipLink has no product captures cleared for the site;
 * swap any one of these for a real screenshot the moment there is one.
 *
 * Everything is `currentColor` so a panel inherits the tint it sits on.
 */

type SceneProps = { className?: string };

const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
} as const;

/** Hosted PBX — one inbound call fanning out to the departments an IVR offers. */
function PbxScene({ className }: SceneProps) {
  const targets = ["Sales", "Support", "Billing"];

  return (
    <svg viewBox="0 0 420 260" className={className} {...svgProps}>
      {/* Inbound call */}
      <rect x="16" y="106" width="104" height="48" rx="12" />
      <circle cx="40" cy="130" r="7" className="fill-current" />
      <path d="M60 122h44M60 134h30" className="opacity-45" />

      {/* Switch */}
      <rect x="162" y="98" width="72" height="64" rx="16" className="fill-current/10" />
      <path d="M180 122h36M180 130h36M180 138h24" className="opacity-60" />
      <circle cx="198" cy="112" r="3" className="fill-current" />

      <path d="M120 130h42" />

      {/* Fan-out to three departments */}
      {targets.map((label, i) => {
        const y = 46 + i * 84;
        return (
          <g key={label}>
            <path d={`M234 130 C 262 130, 262 ${y + 20}, 290 ${y + 20}`} className="opacity-70" />
            <rect x="290" y={y} width="114" height="40" rx="12" />
            <circle cx="310" cy={y + 20} r="4" className="fill-current opacity-70" />
            <text
              x="324"
              y={y + 24}
              className="fill-current text-[12px] font-medium"
              stroke="none"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** SIP Trunking — two data centres, either able to carry the load alone. */
function TrunkScene({ className }: SceneProps) {
  return (
    <svg viewBox="0 0 420 260" className={className} {...svgProps}>
      {/* Customer site */}
      <rect x="14" y="98" width="96" height="64" rx="14" />
      <path d="M34 138h56M34 126h56M34 114h36" className="opacity-45" />
      <text x="34" y="90" className="fill-current text-[11px] font-medium" stroke="none">
        Your IP-PBX
      </text>

      {/* Two data centres */}
      {[
        { y: 30, label: "Data centre A" },
        { y: 158, label: "Data centre B" },
      ].map(({ y, label }) => (
        <g key={label}>
          <rect x="272" y={y} width="132" height="72" rx="16" className="fill-current/10" />
          {[0, 1, 2].map((row) => (
            <g key={row}>
              <rect x="290" y={y + 14 + row * 16} width="96" height="10" rx="3" className="opacity-55" />
              <circle cx="298" cy={y + 19 + row * 16} r="2" className="fill-current" />
            </g>
          ))}
          <text x="272" y={y - 8} className="fill-current text-[11px] font-medium" stroke="none">
            {label}
          </text>
        </g>
      ))}

      {/* Redundant links — either one carries everything */}
      <path d="M110 122 C 180 122, 200 66, 272 66" />
      <path d="M110 138 C 180 138, 200 194, 272 194" />
      {/* Replication between the two sites */}
      <path d="M338 102v56" strokeDasharray="4 5" className="opacity-60" />
      <circle cx="338" cy="130" r="3" className="fill-current opacity-70" />
    </svg>
  );
}

/** Call centre — a live queue with a supervisor listening in. */
function CallCentreScene({ className }: SceneProps) {
  const agents = [
    { name: "Agent 1", bar: 82 },
    { name: "Agent 2", bar: 58 },
    { name: "Agent 3", bar: 96 },
  ];

  return (
    <svg viewBox="0 0 420 260" className={className} {...svgProps}>
      {/* Queue */}
      <rect x="14" y="26" width="150" height="208" rx="16" className="fill-current/10" />
      <text x="32" y="52" className="fill-current text-[11px] font-medium" stroke="none">
        In queue
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} opacity={1 - i * 0.2}>
          <rect x="32" y={68 + i * 38} width="114" height="28" rx="9" />
          <circle cx="50" cy={82 + i * 38} r="6" className="fill-current opacity-60" />
          <path d={`M66 ${82 + i * 38}h56`} className="opacity-40" />
        </g>
      ))}

      {/* Agents with live load bars */}
      {agents.map(({ name, bar }, i) => (
        <g key={name}>
          <rect x="196" y={40 + i * 56} width="208" height="42" rx="12" />
          <circle cx="218" cy={61 + i * 56} r="8" className="fill-current opacity-60" />
          <text
            x="234"
            y={57 + i * 56}
            className="fill-current text-[11px] font-medium"
            stroke="none"
          >
            {name}
          </text>
          <rect x="234" y={64 + i * 56} width="150" height="6" rx="3" className="opacity-25" />
          <rect
            x="234"
            y={64 + i * 56}
            width={(150 * bar) / 100}
            height="6"
            rx="3"
            className="fill-current"
            stroke="none"
          />
        </g>
      ))}

      {/* Supervisor monitoring the middle agent */}
      <path d="M196 208 C 176 208, 176 118, 196 118" strokeDasharray="4 5" className="opacity-70" />
      <rect x="196" y="196" width="120" height="26" rx="9" className="fill-current/10" />
      <text x="212" y="213" className="fill-current text-[11px] font-medium" stroke="none">
        Supervisor
      </text>
    </svg>
  );
}

/** Unified communications — four channels landing on one platform. */
function UnifiedScene({ className }: SceneProps) {
  const channels = ["Voice", "Video", "SMS", "Chat"];

  return (
    <svg viewBox="0 0 420 260" className={className} {...svgProps}>
      {channels.map((label, i) => {
        const y = 24 + i * 58;
        return (
          <g key={label}>
            <rect x="14" y={y} width="112" height="42" rx="12" />
            <circle cx="36" cy={y + 21} r="6" className="fill-current opacity-65" />
            <text
              x="52"
              y={y + 26}
              className="fill-current text-[12px] font-medium"
              stroke="none"
            >
              {label}
            </text>
            <path
              d={`M126 ${y + 21} C 190 ${y + 21}, 200 130, 258 130`}
              className="opacity-65"
            />
          </g>
        );
      })}

      {/* The single platform they converge on */}
      <rect x="258" y="82" width="146" height="96" rx="20" className="fill-current/10" />
      <circle cx="331" cy="118" r="18" className="fill-current/20" />
      <circle cx="331" cy="118" r="6" className="fill-current" />
      <path d="M286 148h90M286 160h58" className="opacity-50" />
    </svg>
  );
}

/** Panels in the same order as `solutions` in lib/site.ts. */
export const solutionScenes = [
  PbxScene,
  TrunkScene,
  CallCentreScene,
  UnifiedScene,
];
