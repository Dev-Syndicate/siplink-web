"use client";

import type { ReactNode } from "react";

import { Box, Defs, Note, Wire, usePhases } from "@/components/site/schematic";
import { cn } from "@/lib/utils";

/**
 * One animated schematic per capability card.
 *
 * These replace a set of static plates — a rounded rect, a curve, a dot —
 * that were drawn in their own language and said nothing. Nothing was named,
 * nothing moved, and several of them could have illustrated any capability on
 * the page. A reader looking at four of them saw four arrangements of shapes.
 *
 * So they are rebuilt in the vocabulary the rest of the solution pages already
 * speak: the chassis, wire and caption from schematic.tsx, every box labelled,
 * and a short sequence that runs when the card is scrolled to. Each one draws
 * the mechanism the capability actually performs, which is the only thing that
 * makes a picture of "CRM integration" different from a picture of "call
 * queues".
 *
 * The canvas is smaller than the full-page figures (320×180 against 560×340)
 * because these sit in a card about a third of the width. The mono labels are
 * the constraint: at this size they render at roughly their nominal 8.5px and
 * stay readable, which is the whole reason the boxes are labelled at all.
 *
 * `usePhases` latches — the sequence explains the mechanism once and stops,
 * per the note in use-in-view.ts. The wires keep travelling, so the card stays
 * alive without the explanation replaying at the reader. Under reduced motion
 * `usePhases` jumps straight to the final phase and `.flow-path` drops its
 * packet, leaving every figure in a finished, readable state.
 *
 * Nothing here states a capacity, a volume, a latency or a coverage figure.
 * The source documents flag all of those as unverified.
 */

/** Card canvas. 16:9, matching the plate the figure sits in. */
const CW = 320;
const CH = 180;

/** Wrapper: the shared svg shell, so ten figures cannot drift apart. */
function Figure({
  uid,
  label,
  svgRef,
  children,
}: {
  uid: string;
  label: string;
  svgRef: React.Ref<SVGSVGElement>;
  children: ReactNode;
}) {
  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${CW} ${CH}`}
      className="h-full w-full"
      role="img"
      aria-label={label}
      fill="none"
    >
      <Defs uid={uid} w={CW} h={CH} />
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------- enterprise */

/**
 * Teams calling: the outside line arrives in the client they already use.
 *
 * The point the capability makes is the absence of a thing — no second phone
 * app to run beside Teams — so the drawing ends on that, rather than on a
 * handset glyph that would be true of any calling product.
 */
export function TeamsFigure() {
  const { ref, phase } = usePhases(4, 1100);

  return (
    <Figure
      uid="ic-teams"
      svgRef={ref}
      label="An outside call arrives over SipLink and is answered inside Microsoft Teams, with no second phone system to run alongside it."
    >
      <Note x={20} y={34} tone={phase >= 2 ? "primary" : "faint"}>
        answered here
      </Note>

      <Box x={14} y={52} w={118} h={62} label="TEAMS" live={phase >= 2}>
        <Note x={28} y={96} tone={phase >= 2 ? "primary" : "faint"}>
          {phase >= 2 ? "on the call" : "the app they use"}
        </Note>
      </Box>

      <Wire uid="ic-teams" live={phase >= 1} d="M132 83 H196" />

      <Box x={196} y={52} w={110} h={62} label="OUTSIDE" live={phase >= 1}>
        <Note x={210} y={96} tone={phase >= 1 ? "primary" : "faint"}>
          a customer
        </Note>
      </Box>

      <Note x={160} y={150} anchor="middle" tone={phase >= 3 ? "muted" : "faint"}>
        no second phone system
      </Note>
    </Figure>
  );
}

/**
 * Session Border Controller: what gets in, and what does not.
 *
 * The previous plate drew two zones with a gap, which reads as an abstract
 * diagram of "between". A border controller's job is a decision, so the
 * drawing makes the decision visible: one path is admitted and carries on,
 * the other stops at the border and is drawn as stopping.
 */
export function SbcFigure() {
  const { ref, phase } = usePhases(4, 1100);

  return (
    <Figure
      uid="ic-sbc"
      svgRef={ref}
      label="External SIP traffic meets the session border controller, which admits the known traffic through to your voice network and drops the rest at the edge."
    >
      <Box x={10} y={30} w={86} h={44} label="EXTERNAL" live={phase >= 1}>
        <Note x={22} y={64} tone={phase >= 1 ? "primary" : "faint"}>
          known
        </Note>
      </Box>

      <Box x={10} y={104} w={86} h={44} label="EXTERNAL" dashed>
        <Note x={22} y={138} tone="faint">
          unknown
        </Note>
      </Box>

      {/* Admitted: straight through the controller and out the far side. */}
      <Wire uid="ic-sbc" live={phase >= 1} d="M96 52 H124" />
      <Wire uid="ic-sbc" live={phase >= 2} d="M186 52 Q206 52 206 74 H228" />

      {/* Refused: reaches the border and goes no further. Dim and dashed, and
          it never gets a lit packet — the absence is the whole point. */}
      <path
        d="M96 126 H124"
        className="stroke-border"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        d={`M130 120 l12 12 M142 120 l-12 12`}
        className={cn(
          "transition-opacity duration-700",
          phase >= 3 ? "stroke-muted-foreground/70 opacity-100" : "opacity-0",
        )}
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      <Box x={124} y={22} w={62} h={134} label="SBC" live={phase >= 1}>
        <Note x={134} y={96} tone={phase >= 3 ? "primary" : "faint"}>
          admits
        </Note>
        <Note x={134} y={110} tone="faint">
          drops
        </Note>
      </Box>

      <Box x={228} y={52} w={82} h={44} label="VOICE" live={phase >= 2}>
        <Note x={240} y={86} tone={phase >= 2 ? "primary" : "faint"}>
          your network
        </Note>
      </Box>
    </Figure>
  );
}

const DEPTS = ["SALES", "SUPPORT", "BILLING"];

/**
 * Enterprise call queues: held in order, then taken by whoever is free.
 *
 * Distinct from the mid-market routing figure on purpose. This one is about
 * order and volume — a line of callers that keeps its place — where that one
 * is about matching a need to a skill.
 */
export function QueueFigure() {
  const { ref, phase } = usePhases(4, 1100);
  const taking = phase >= 1 ? (phase - 1) % DEPTS.length : -1;

  return (
    <Figure
      uid="ic-queue"
      svgRef={ref}
      label="Callers wait in order rather than hearing a busy tone, pass the menu, and are taken by whichever department group has someone free."
    >
      <Note x={16} y={40} tone="faint">
        waiting, in order
      </Note>

      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={22 + i * 17}
          cy={86}
          r="6.5"
          className={cn(
            "transition-all duration-700",
            i === 0 && phase >= 1
              ? "fill-primary"
              : i === 0
                ? "fill-primary/70"
                : "fill-muted-foreground/25",
          )}
        />
      ))}

      <Wire uid="ic-queue" live={phase >= 1} d="M96 86 H118" />

      <Box x={118} y={62} w={62} h={48} label="MENU" live={phase >= 1}>
        <Note x={128} y={98} tone="faint">
          choose
        </Note>
      </Box>

      {DEPTS.map((dept, i) => {
        const y = 20 + i * 50;
        const live = taking === i;
        return (
          <g key={dept}>
            <Wire
              uid="ic-queue"
              live={live}
              delay={i * 0.18}
              d={`M180 86 Q204 86 204 ${y + 16} H222`}
            />
            <Box x={222} y={y} w={88} h={32} label={dept} live={live} />
          </g>
        );
      })}

      <Note x={16} y={160} tone="faint">
        nobody gets a busy tone
      </Note>
    </Figure>
  );
}

/**
 * CRM integration: the record is already open when the call is answered.
 *
 * The enterprise card gets the single-record story — ring, match, open, log.
 * The mid-market card gets the three named actions instead, so the two do not
 * end up as the same picture with different captions.
 */
export function CrmRecordFigure() {
  const { ref, phase } = usePhases(5, 950);

  return (
    <Figure
      uid="ic-crm"
      svgRef={ref}
      label="An incoming call is matched to the customer it belongs to, their record opens as it is answered, and the call is filed against it afterwards."
    >
      <Box x={10} y={58} w={94} h={54} label="CALL" live={phase >= 1}>
        <Note x={22} y={98} tone={phase >= 1 ? "primary" : "faint"}>
          {phase >= 1 ? "ringing" : "idle"}
        </Note>
      </Box>

      <Wire uid="ic-crm" live={phase >= 2} d="M104 85 H146" />

      <Box
        x={146}
        y={28}
        w={164}
        h={116}
        label="CUSTOMER"
        live={phase >= 3}
      >
        <Note x={158} y={70} tone={phase >= 3 ? "primary" : "faint"}>
          {phase >= 2 ? "matched" : "no record"}
        </Note>

        {/* The filed call. Arrives last, because a call is logged after it
            happens, not when it rings. */}
        <rect
          x="158"
          y="86"
          width="140"
          height="10"
          rx="5"
          className={cn(
            "transition-opacity duration-700",
            phase >= 3 ? "fill-primary/15 opacity-100" : "opacity-0",
          )}
        />
        <rect
          x="158"
          y="106"
          width="140"
          height="14"
          rx="7"
          className={cn(
            "transition-opacity duration-700",
            phase >= 4 ? "fill-primary opacity-100" : "opacity-0",
          )}
        />
        <text
          x="168"
          y="116.5"
          className={cn(
            "text-[8px] tracking-wide [font-family:var(--font-mono)] transition-opacity duration-700",
            phase >= 4
              ? "fill-primary-foreground opacity-100"
              : "opacity-0",
          )}
        >
          call logged
        </text>
      </Box>
    </Figure>
  );
}

/**
 * AI voice assistant: routine handled, the rest passed on.
 *
 * Both outcomes are drawn, and the handover is not treated as a failure — the
 * capability's claim is that the assistant takes the routine work and knows
 * when not to, so the agent branch has to be present for the claim to read.
 */
export function AssistantFigure() {
  const { ref, phase } = usePhases(5, 950);
  const handled = phase >= 3;
  const passed = phase >= 4;

  return (
    <Figure
      uid="ic-ai"
      svgRef={ref}
      label="The caller speaks, the assistant works out what they need, handles the routine requests itself and passes the rest to an agent."
    >
      <Note x={14} y={40} tone="faint">
        caller speaks
      </Note>

      {[12, 22, 9, 26, 15, 20].map((h, i) => (
        <rect
          key={i}
          x={16 + i * 11}
          y={90 - h / 2}
          width="5"
          height={h}
          rx="2.5"
          className={cn(
            "transition-all duration-700",
            phase >= 1 ? "fill-primary/70" : "fill-muted-foreground/25",
          )}
        />
      ))}

      <Wire uid="ic-ai" live={phase >= 1} d="M88 90 H108" />

      <Box x={108} y={62} w={78} h={56} label="ASSISTANT" live={phase >= 2}>
        <Note x={118} y={104} tone={phase >= 2 ? "primary" : "faint"}>
          {phase >= 2 ? "understood" : "listening"}
        </Note>
      </Box>

      <Wire uid="ic-ai" live={handled} d="M186 90 Q206 90 206 46 H224" />
      <Box x={224} y={28} w={86} h={36} label="HANDLED" live={handled} />

      <Wire uid="ic-ai" live={passed} delay={0.3} d="M186 90 Q206 90 206 134 H224" />
      <Box x={224} y={116} w={86} h={36} label="AGENT" live={passed} />
    </Figure>
  );
}

const SOURCES = ["PBX", "TRUNKS", "PLATFORMS"];

/**
 * SIP and carrier connectivity: one architecture, and a path that can fail.
 *
 * Convergence alone was the old plate, and convergence alone is a shape. What
 * makes the managed architecture worth anything is what happens when a
 * carrier degrades, so the second carrier is drawn standing by and the
 * sequence moves the traffic onto it.
 */
export function CarrierFigure() {
  const { ref, phase } = usePhases(5, 1000);
  const failed = phase >= 3;

  return (
    <Figure
      uid="ic-sip"
      svgRef={ref}
      label="Existing PBX systems, trunks and platforms connect through one managed voice architecture, which moves calls to a second carrier when the first degrades."
    >
      {SOURCES.map((source, i) => {
        const y = 16 + i * 52;
        return (
          <g key={source}>
            <Box x={10} y={y} w={74} h={32} label={source} live={phase >= 1} />
            <Wire
              uid="ic-sip"
              live={phase >= 1}
              delay={i * 0.18}
              d={`M84 ${y + 16} Q108 ${y + 16} 108 90 H120`}
            />
          </g>
        );
      })}

      <Box x={120} y={56} w={80} h={68} label="MANAGED" live={phase >= 1}>
        <Note x={130} y={110} tone="faint">
          one path
        </Note>
      </Box>

      <Wire uid="ic-sip" live={phase >= 2 && !failed} d="M200 90 Q216 90 216 46 H234" />
      <Box
        x={234}
        y={28}
        w={76}
        h={36}
        label="CARRIER A"
        live={phase >= 2 && !failed}
        dashed={failed}
      />

      <Wire uid="ic-sip" live={failed} d="M200 90 Q216 90 216 134 H234" />
      <Box x={234} y={116} w={76} h={36} label="CARRIER B" live={failed} />

      <Note x={310} y={90} anchor="end" tone={failed ? "primary" : "faint"}>
        {failed ? "moved over" : "standing by"}
      </Note>
    </Figure>
  );
}

/* ------------------------------------------------------------ mid-market */

const SKILLS = [
  { team: "BILLING", need: "a billing question" },
  { team: "SALES", need: "a new order" },
  { team: "SUPPORT", need: "a fault" },
];

/**
 * Advanced routing: the need matched to the skill.
 *
 * Deliberately not the enterprise queue figure with different labels. Queues
 * are about holding a line in order; skill-based routing is about the caller
 * reaching the team that can actually answer, so the caller's need is named
 * and the matching team is the one that lights.
 */
export function RoutingFigure() {
  const { ref, phase } = usePhases(4, 1200);
  const matched = phase >= 1 ? (phase - 1) % SKILLS.length : -1;

  return (
    <Figure
      uid="ic-route"
      svgRef={ref}
      label="A caller's reason for calling is matched to the team with the skill to handle it, rather than to whoever happens to be free next."
    >
      <Note x={14} y={40} tone={matched >= 0 ? "primary" : "faint"}>
        {matched >= 0 ? SKILLS[matched].need : "a caller"}
      </Note>

      <circle
        cx={26}
        cy={90}
        r="8"
        className={cn(
          "transition-colors duration-700",
          matched >= 0 ? "fill-primary" : "fill-muted-foreground/30",
        )}
      />

      <Wire uid="ic-route" live={matched >= 0} d="M34 90 H98" />

      <Box x={98} y={66} w={72} h={48} label="ROUTING" live={matched >= 0}>
        <Note x={108} y={102} tone="faint">
          by skill
        </Note>
      </Box>

      {SKILLS.map(({ team }, i) => {
        const y = 20 + i * 50;
        const live = matched === i;
        return (
          <g key={team}>
            <Wire
              uid="ic-route"
              live={live}
              d={`M170 90 Q196 90 196 ${y + 16} H214`}
            />
            <Box x={214} y={y} w={96} h={32} label={team} live={live} />
          </g>
        );
      })}
    </Figure>
  );
}

const SITES = ["BRANCH", "HEAD OFFICE", "WAREHOUSE"];

/**
 * Multi-site management: one change, every site.
 *
 * The old plate drew a bar above three squares, which is an org chart. What
 * centralised administration saves is the repetition, so the sequence makes
 * the change travel and land — and the sites are named, because three
 * identical unlabelled squares are the thing that made it read as shapes.
 */
export function MultiSiteFigure() {
  const { ref, phase } = usePhases(4, 1000);

  return (
    <Figure
      uid="ic-site"
      svgRef={ref}
      label="A change made once in central administration lands at every location, instead of being repeated site by site."
    >
      <Box x={78} y={14} w={164} h={46} label="ADMIN" live={phase >= 1}>
        <Note x={90} y={50} tone={phase >= 1 ? "primary" : "faint"}>
          {phase >= 1 ? "one change" : "central"}
        </Note>
      </Box>

      {SITES.map((site, i) => {
        const x = 10 + i * 104;
        return (
          <g key={site}>
            <Wire
              uid="ic-site"
              live={phase >= 2}
              delay={i * 0.22}
              d={`M160 60 Q160 88 ${x + 46} 88 V112`}
            />
            <Box
              x={x}
              y={112}
              w={92}
              h={44}
              label={site}
              live={phase >= 3}
            >
              <Note x={x + 12} y={146} tone={phase >= 3 ? "primary" : "faint"}>
                {phase >= 3 ? "applied" : "waiting"}
              </Note>
            </Box>
          </g>
        );
      })}
    </Figure>
  );
}

const REPORTS = ["CDR", "AGENT", "QUEUE"];

/**
 * Reporting: the decision, not the chart.
 *
 * A bar chart with a trend line over it was the most generic plate of the
 * set — it would have illustrated any analytics feature ever shipped. The
 * capability names three specific report sources, so those are drawn feeding
 * one view, and the view is drawn as something a staffing decision is read
 * off. No numbers appear: the documents do not verify any.
 */
export function ReportingFigure() {
  const { ref, phase } = usePhases(4, 1000);
  const read = phase >= 3;

  return (
    <Figure
      uid="ic-report"
      svgRef={ref}
      label="Call detail, agent and queue reporting feed one view, where the busiest part of the day becomes visible and can be staffed for."
    >
      {REPORTS.map((report, i) => {
        const y = 16 + i * 52;
        return (
          <g key={report}>
            <Box x={10} y={y} w={68} h={32} label={report} live={phase >= 1} />
            <Wire
              uid="ic-report"
              live={phase >= 1}
              delay={i * 0.2}
              d={`M78 ${y + 16} Q100 ${y + 16} 100 90 H116`}
            />
          </g>
        );
      })}

      <Box x={116} y={28} w={194} h={116} label="ONE VIEW" live={phase >= 2}>
        {/* Volume through the day. A shape, not a reading — the hour that
            stands up is the point, and it carries no number. */}
        {[16, 24, 20, 34, 46, 30, 22, 14].map((h, i) => (
          <rect
            key={i}
            x={130 + i * 21}
            y={126 - h}
            width="11"
            height={h}
            rx="3"
            className={cn(
              "transition-all duration-700",
              read && i === 4
                ? "fill-primary"
                : phase >= 2
                  ? "fill-primary/25"
                  : "fill-muted-foreground/15",
            )}
          />
        ))}
        <path
          d="M130 130 H304"
          className="stroke-border"
          strokeWidth="1.25"
        />
        <Note x={130} y={70} tone={read ? "primary" : "faint"}>
          {read ? "staff the busy hour" : "gathering"}
        </Note>
      </Box>
    </Figure>
  );
}

const ACTIONS = [
  { label: "screen pop", from: "app" },
  { label: "click to dial", from: "app" },
  { label: "call logging", from: "phone" },
];

/**
 * CRM and business integrations: the three things it actually does.
 *
 * The enterprise card already tells the single-record story, and an earlier
 * version of this one told it again with a second card stacked behind the
 * first. The description here names three separate actions, two of which run
 * the other way, so the figure draws the traffic in both directions and
 * labels each one.
 */
export function IntegrationsFigure() {
  const { ref, phase } = usePhases(5, 950);

  return (
    <Figure
      uid="ic-int"
      svgRef={ref}
      label="Screen pop, click-to-dial and call logging run between the applications your teams already work in and the phone system, in both directions."
    >
      <Box x={10} y={44} w={98} h={92} label="YOUR APPS" live={phase >= 1}>
        <Note x={22} y={110} tone="faint">
          where they work
        </Note>
      </Box>

      <Box x={212} y={44} w={98} h={92} label="PHONE" live={phase >= 1}>
        <Note x={224} y={110} tone="faint">
          the call itself
        </Note>
      </Box>

      {ACTIONS.map(({ label, from }, i) => {
        const y = 72 + i * 24;
        const live = phase >= i + 2;
        // Logging travels the other way: the call is the thing that happened,
        // and the app is where the note about it lands.
        const d =
          from === "app" ? `M108 ${y} H212` : `M212 ${y} H108`;

        return (
          <g key={label}>
            <Wire uid="ic-int" live={live} delay={i * 0.25} d={d} />
            <Note
              x={160}
              y={y - 5}
              anchor="middle"
              tone={live ? "primary" : "faint"}
            >
              {label}
            </Note>
          </g>
        );
      })}
    </Figure>
  );
}

/**
 * Keyed by capability title, so re-ordering `capabilities` in lib/solutions.ts
 * cannot put the wrong picture on a card.
 */
const FIGURES: Record<string, () => ReactNode> = {
  "Microsoft Teams calling": TeamsFigure,
  "Session Border Controller": SbcFigure,
  "Enterprise call queues": QueueFigure,
  "CRM integration": CrmRecordFigure,
  "AI voice assistant": AssistantFigure,
  "SIP and carrier connectivity": CarrierFigure,
  "Advanced routing and queues": RoutingFigure,
  "Multi-site management": MultiSiteFigure,
  "Reporting and analytics": ReportingFigure,
  "CRM and business integrations": IntegrationsFigure,
};

/**
 * The figure for one capability, or the fallback if it has no drawing yet.
 *
 * The lookup lives here, on the client side of the boundary, and not in
 * IncludedCards. Every export of a `"use client"` module is a client
 * *reference* when a server component imports it — so a server component can
 * render `<IncludedFigure />`, but reading `FIGURES[title]` there returns
 * undefined and silently drops every card back to its icon. Which is exactly
 * what it did.
 *
 * `title` crosses the boundary as a string and `fallback` as an already
 * rendered element, so IncludedCards stays a server component.
 */
export function IncludedFigure({
  title,
  fallback,
}: {
  title: string;
  fallback: ReactNode;
}) {
  const Figure = FIGURES[title];
  return Figure ? <Figure /> : <>{fallback}</>;
}
