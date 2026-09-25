"use client";

import type { ReactNode } from "react";

import { Box, Defs, Note, Wire, usePhases } from "@/components/site/schematic";
import { cn } from "@/lib/utils";

/**
 * One animated schematic per "What you get" capability on the By Use Case
 * pages.
 *
 * These replace a 2×2 grid of icon-and-text plates. Four equal cards in a
 * tinted box said only that there were four of something: the icon beside
 * each heading was a Smartphone, an ArrowLeftRight, a Users — glyphs that
 * would have fitted any capability on any of the six pages. Nothing named a
 * mechanism and nothing distinguished "extension mobility" from "presence".
 *
 * So each capability now gets a drawing of the thing it actually does, in the
 * vocabulary the rest of the solution pages already speak — the chassis, wire
 * and caption from schematic.tsx, every box labelled, one live path, and a
 * short sequence that runs when the row is scrolled to. Same reasoning as
 * included-figures.tsx, which made this move for the business-size cards.
 *
 * The canvas is 480×280 against the hero's 560×340, and unlike the hero these
 * omit the grid `Field`. That is the whole separation between them: the hero
 * draws the topology of the use case and sits on the field, these draw one
 * mechanism inside it and sit on a plate. Four more full-dress schematics
 * under the hero would have left the page with five competing topologies.
 *
 * Sizing follows the same constraint as included-figures: the mono labels
 * render at roughly their nominal 8.5px at the width these are displayed at
 * (~520px in the 6xl column), which is the only reason labelling the boxes is
 * worth doing.
 *
 * `usePhases` latches, so each explanation plays once and stops; the wires
 * keep travelling so the row stays alive without replaying at the reader.
 * Under reduced motion every figure jumps to its final phase and `.flow-path`
 * drops its packet, leaving a finished, readable state.
 *
 * Nothing here states a capacity, a volume, a latency, a coverage figure or a
 * price. The source documents flag all of those as unverified — see the
 * guardrails at the top of lib/solutions.ts.
 */

/** Row canvas. Wider than it is tall, matching the plate it sits in. */
const CW = 480;
const CH = 280;

/** Wrapper: the shared svg shell, so sixteen figures cannot drift apart. */
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

/* ------------------------------------------------------- remote workforce */

const SURFACES = [
  { label: "DESKTOP", note: "the softphone", y: 36 },
  { label: "MOBILE", note: "the app in a pocket", y: 112 },
  { label: "BROWSER", note: "WebRTC, nothing to install", y: 188 },
];

/**
 * Desktop, mobile and browser calling: one extension, three ways to answer.
 *
 * The capability is not "we have apps" — every calling product has apps. It
 * is that the three are the same extension, so the drawing keeps one box on
 * the left and lights each surface from it in turn rather than showing three
 * unrelated devices side by side.
 */
export function DeviceReach() {
  const { ref, phase } = usePhases(4, 1150);
  const live = phase >= 1 ? (phase - 1) % SURFACES.length : -1;

  return (
    <Figure
      uid="cf-reach"
      svgRef={ref}
      label="One extension rings on the desktop softphone, the mobile app and the browser — the same line, answered on whichever is nearest."
    >
      <Box x={14} y={110} w={150} h={60} label="EXTENSION" live>
        <Note x={28} y={152} tone="primary">
          one business line
        </Note>
      </Box>

      {SURFACES.map((surface, index) => (
        <g key={surface.label}>
          <Wire
            uid="cf-reach"
            live={live === index}
            delay={index * 0.18}
            d={`M164 140 Q240 140 240 ${surface.y + 28} H300`}
          />
          <Box
            x={300}
            y={surface.y}
            w={166}
            h={56}
            label={surface.label}
            live={live === index}
          >
            <Note
              x={314}
              y={surface.y + 42}
              tone={live === index ? "primary" : "faint"}
            >
              {surface.note}
            </Note>
          </Box>
        </g>
      ))}

      <Note x={240} y={266} anchor="middle" tone="faint">
        one extension, three ways to answer
      </Note>
    </Figure>
  );
}

const PLACES = [
  { label: "THE OFFICE", note: "at a desk", y: 34 },
  { label: "HOME", note: "a spare room", y: 110 },
  { label: "ON THE MOVE", note: "a hotel, a train", y: 186 },
];

/**
 * Extension mobility: the desk changes, the number does not.
 *
 * Drawn as one solid tag moving between three dashed slots, because the point
 * is that a single thing relocates — three separately lit boxes would have
 * said "we support three locations", which is a different and weaker claim.
 * The caller's box never changes state, which is the actual promise.
 */
export function ExtensionFollows() {
  const { ref, phase } = usePhases(4, 1250);
  const at = phase >= 1 ? (phase - 1) % PLACES.length : 0;

  return (
    <Figure
      uid="cf-follow"
      svgRef={ref}
      label="A colleague's extension moves between the office, home and the move. The caller dials the same extension each time and sees no difference."
    >
      <Box x={14} y={108} w={150} h={64} label="A CUSTOMER" live>
        <Note x={28} y={152} tone="primary">
          dials extension 204
        </Note>
      </Box>

      <Wire
        uid="cf-follow"
        live={phase >= 1}
        d={`M164 140 Q230 140 230 ${PLACES[at].y + 26} H320`}
      />

      {PLACES.map((place, index) => (
        <Box
          key={place.label}
          x={320}
          y={place.y}
          w={146}
          h={52}
          label={place.label}
          dashed={at !== index}
          live={at === index}
        >
          <Note
            x={334}
            y={place.y + 40}
            tone={at === index ? "primary" : "faint"}
          >
            {place.note}
          </Note>
        </Box>
      ))}

      {/* The extension itself: one object, translated to whichever slot is
          current, so the movement is the thing the eye follows. */}
      <g
        className="transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${PLACES[at].y - PLACES[0].y}px)` }}
      >
        <rect
          x={244}
          y={PLACES[0].y + 14}
          width={56}
          height={24}
          rx="12"
          className="fill-primary"
        />
        <text
          x={272}
          y={PLACES[0].y + 30}
          textAnchor="middle"
          className="fill-primary-foreground text-[9px] font-medium [font-family:var(--font-mono)]"
        >
          204
        </text>
      </g>

      <Note x={240} y={266} anchor="middle" tone="faint">
        the desk changes; the number does not
      </Note>
    </Figure>
  );
}

const COLLEAGUES = [
  { label: "COLLEAGUE 1", state: "on a call", free: false, y: 34 },
  { label: "COLLEAGUE 2", state: "away", free: false, y: 110 },
  { label: "COLLEAGUE 3", state: "available", free: true, y: 186 },
];

/**
 * Presence and multi-device: you can see who is free before you transfer.
 *
 * The capability bundles two things. Presence is the one with consequence —
 * a transfer to someone who is not there is the failure it prevents — so the
 * roster carries the drawing and the second device is a single note under the
 * colleague who picks up rather than a second diagram.
 */
export function PresenceRoster() {
  const { ref, phase } = usePhases(3, 1200);

  return (
    <Figure
      uid="cf-presence"
      svgRef={ref}
      label="A roster shows one colleague on a call, one away and one available. The call goes to the available colleague, who can pick up on whichever device is closest."
    >
      <Box x={14} y={108} w={132} h={62} label="A TRANSFER" live={phase >= 1}>
        <Note x={28} y={150} tone={phase >= 1 ? "primary" : "faint"}>
          who is free?
        </Note>
      </Box>

      {COLLEAGUES.map((person, index) => {
        const live = person.free && phase >= 2;
        return (
          <g key={person.label}>
            <Wire
              uid="cf-presence"
              live={live}
              delay={index * 0.15}
              d={`M146 139 Q235 139 235 ${person.y + 26} H300`}
            />
            <Box
              x={300}
              y={person.y}
              w={166}
              h={52}
              label={person.label}
              live={live}
              dashed={!person.free && phase >= 2}
            >
              <Note
                x={314}
                y={person.y + 40}
                tone={live ? "primary" : "faint"}
              >
                {live ? "picks up — laptop or mobile" : person.state}
              </Note>
            </Box>
          </g>
        );
      })}

      <Note x={240} y={266} anchor="middle" tone="faint">
        nobody is transferred to an empty desk
      </Note>
    </Figure>
  );
}

const MANAGED = [
  { label: "USERS", note: "add, move, remove", y: 36 },
  { label: "CALL ROUTING", note: "who rings, and when", y: 112 },
  { label: "DEVICES", note: "desk, app, browser", y: 188 },
];

/**
 * Central administration, shared by four pages.
 *
 * "Centralised control", "Centralised administration", "Central management"
 * and "One environment to manage" are four names for one product surface. A
 * different drawing for each would have been variety for its own sake, and
 * would have implied four different things exist. What changes between the
 * pages is the copy beside it, which is where the difference genuinely is.
 */
export function AdminPortal() {
  const { ref, phase } = usePhases(4, 1100);
  const live = phase >= 1 ? (phase - 1) % MANAGED.length : -1;

  return (
    <Figure
      uid="cf-portal"
      svgRef={ref}
      label="A single web portal manages users, call routing and devices, with each change applied across the whole estate."
    >
      <Box x={14} y={104} w={152} h={72} label="WEB PORTAL" live>
        <Note x={28} y={146} tone="primary">
          one login
        </Note>
        <Note x={28} y={164} tone="faint">
          no site visit
        </Note>
      </Box>

      {MANAGED.map((item, index) => (
        <g key={item.label}>
          <Wire
            uid="cf-portal"
            live={live === index}
            delay={index * 0.18}
            d={`M166 140 Q240 140 240 ${item.y + 28} H300`}
          />
          <Box
            x={300}
            y={item.y}
            w={166}
            h={56}
            label={item.label}
            live={live === index}
          >
            <Note
              x={314}
              y={item.y + 42}
              tone={live === index ? "primary" : "faint"}
            >
              {item.note}
            </Note>
          </Box>
        </g>
      ))}

      <Note x={240} y={266} anchor="middle" tone="faint">
        changed in one place, applied everywhere
      </Note>
    </Figure>
  );
}

/* --------------------------------------------------------- customer support */

const AGENTS = [
  { label: "AGENT 1", note: "on a call", y: 40 },
  { label: "AGENT 2", note: "on a call", y: 112 },
  { label: "AGENT 3", note: "free now", y: 184 },
];

/**
 * Intelligent routing and queues: the caller waits in line rather than being
 * turned away.
 *
 * The source's own framing is that additional callers "remain in the queue
 * rather than simply receiving a busy signal", so the busy tone is drawn as
 * the branch not taken. A queue diagram without it draws a waiting room and
 * makes no argument.
 */
export function QueueRouting() {
  const { ref, phase } = usePhases(4, 1150);

  return (
    <Figure
      uid="cf-queue"
      svgRef={ref}
      label="A caller enters a queue, keeps their position while agents are busy, and is connected to the first agent who becomes free — instead of meeting a busy tone."
    >
      <Box x={14} y={104} w={112} h={60} label="A CALLER" live>
        <Note x={28} y={146} tone="primary">
          calls in
        </Note>
      </Box>

      <Wire uid="cf-queue" live d="M126 134 H172" />

      <Box x={172} y={92} w={132} h={84} label="THE QUEUE" live={phase >= 1}>
        <Note x={186} y={134} tone={phase >= 1 ? "primary" : "faint"}>
          position held
        </Note>
        <Note x={186} y={160} tone="faint">
          not a busy tone
        </Note>
      </Box>

      {AGENTS.map((agent, index) => {
        const live = index === 2 && phase >= 2;
        return (
          <g key={agent.label}>
            <Wire
              uid="cf-queue"
              live={live}
              delay={index * 0.15}
              d={`M304 134 Q332 134 332 ${agent.y + 24} H354`}
            />
            <Box
              x={354}
              y={agent.y}
              w={112}
              h={48}
              label={agent.label}
              live={live}
            >
              <Note
                x={366}
                y={agent.y + 38}
                tone={live ? "primary" : "faint"}
              >
                {agent.note}
              </Note>
            </Box>
          </g>
        );
      })}

      {/* The outcome being prevented, drawn as the path not taken. */}
      <path
        d="M70 164 V212 H160"
        className="stroke-border"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />
      <Box x={160} y={190} w={120} h={44} label="BUSY TONE" dashed>
        <Note x={174} y={224} tone="faint">
          avoided
        </Note>
      </Box>

      <Note x={240} y={266} anchor="middle" tone="faint">
        the caller keeps their place instead of hanging up
      </Note>
    </Figure>
  );
}

const DEPARTMENTS = [
  { label: "SALES", key: "1 sales", note: "new business", y: 40 },
  { label: "SUPPORT", key: "2 support", note: "customers", y: 112 },
  { label: "ACCOUNTS", key: "3 accounts", note: "invoices", y: 184 },
];

/**
 * IVR menus: the caller reaches the right desk first time.
 *
 * The chosen option and the department it opens light together, so the menu
 * reads as a decision the caller makes rather than a list of options that
 * exists. The two unchosen departments stay drawn — a menu with one branch is
 * not a menu.
 */
export function MenuTree() {
  const { ref, phase } = usePhases(4, 1150);
  const chosen = phase >= 2 ? 1 : -1;

  return (
    <Figure
      uid="cf-menu"
      svgRef={ref}
      label="A caller hears a menu, presses the option for support, and is put through to the support desk rather than to a receptionist who has to ask."
    >
      <Box x={14} y={104} w={112} h={60} label="A CALLER" live>
        <Note x={28} y={146} tone="primary">
          calls in
        </Note>
      </Box>

      <Wire uid="cf-menu" live={phase >= 1} d="M126 134 H172" />

      <Box x={172} y={80} w={132} h={108} label="THE MENU" live={phase >= 1}>
        {DEPARTMENTS.map((department, index) => (
          <Note
            key={department.key}
            x={186}
            y={124 + index * 24}
            tone={chosen === index ? "primary" : "faint"}
          >
            {department.key}
          </Note>
        ))}
      </Box>

      {DEPARTMENTS.map((department, index) => (
        <g key={department.label}>
          <Wire
            uid="cf-menu"
            live={chosen === index}
            d={`M304 134 Q332 134 332 ${department.y + 24} H354`}
          />
          <Box
            x={354}
            y={department.y}
            w={112}
            h={48}
            label={department.label}
            live={chosen === index}
            dashed={chosen >= 0 && chosen !== index}
          >
            <Note
              x={366}
              y={department.y + 38}
              tone={chosen === index ? "primary" : "faint"}
            >
              {department.note}
            </Note>
          </Box>
        </g>
      ))}

      <Note x={240} y={266} anchor="middle" tone="faint">
        answered by the desk that can help
      </Note>
    </Figure>
  );
}

/** Waveform ticks for the recording track. Fixed heights, so no hydration gap. */
const TICKS = [
  6, 13, 9, 18, 11, 22, 8, 16, 10, 20, 14, 7, 17, 12, 21, 9, 15, 11, 19, 8, 13,
  17, 10, 14, 20, 12, 8, 16, 11, 18,
];

/**
 * Recording and monitoring: the call is kept, and can be joined while it is
 * still happening.
 *
 * Two different capabilities share one name here. The recording is drawn as a
 * track under the live call because that is literally what it is, and the
 * supervisor joins the call itself rather than the track — which is the
 * distinction between monitoring and listening back, and the only reason the
 * capability names both.
 */
export function RecordMonitor() {
  const { ref, phase } = usePhases(4, 1100);

  return (
    <Figure
      uid="cf-record"
      svgRef={ref}
      label="A live call between a customer and an agent is recorded to a track, and a supervisor can listen in while the call is still running."
    >
      <Box x={14} y={34} w={140} h={56} label="A CUSTOMER" live>
        <Note x={28} y={76} tone="primary">
          on the line
        </Note>
      </Box>

      <Wire uid="cf-record" live d="M154 62 H326" />

      <Box x={326} y={34} w={140} h={56} label="AN AGENT" live>
        <Note x={340} y={76} tone="primary">
          taking the call
        </Note>
      </Box>

      <Box x={14} y={124} w={452} h={62} label="RECORDING" live={phase >= 1}>
        {TICKS.map((height, index) => (
          <rect
            key={index}
            x={30 + index * 14}
            y={176 - height}
            width="3"
            height={height}
            rx="1.5"
            className={cn(
              "transition-colors duration-700",
              phase >= 1 && index < TICKS.length - 6
                ? "fill-primary/55"
                : "fill-muted-foreground/25",
            )}
          />
        ))}
      </Box>

      {/* The supervisor joins the call, not the recording — that is what
          makes monitoring different from listening back afterwards. */}
      <path
        d="M240 186 V206"
        className={cn(
          "transition-colors duration-700",
          phase >= 2 ? "stroke-primary/40" : "stroke-border",
        )}
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />

      <Box
        x={170}
        y={206}
        w={140}
        h={46}
        label="SUPERVISOR"
        live={phase >= 2}
        dashed={phase < 2}
      >
        <Note x={184} y={240} tone={phase >= 2 ? "primary" : "faint"}>
          listens in live
        </Note>
      </Box>

      <Note x={240} y={272} anchor="middle" tone="faint">
        kept for later, and joinable now
      </Note>
    </Figure>
  );
}

const REPORTS = [
  { label: "CALL VOLUME", note: "when they arrive", y: 36 },
  { label: "MISSED CALLS", note: "and on which line", y: 112 },
  { label: "WHO TOOK WHAT", note: "by agent and team", y: 188 },
];

/**
 * Analytics / conversation visibility: what happened, without asking anyone.
 *
 * Shared by customer-support and sales-teams, which name the same reporting
 * surface for two audiences. The left box is "every call" rather than a
 * database glyph, because the argument is completeness — the record is not a
 * sample somebody remembered to keep.
 *
 * The three reports are named but never quantified. No volumes, no wait
 * times, no answer rates: the source flags every such figure as unverified.
 */
export function MetricsBoard() {
  const { ref, phase } = usePhases(4, 1100);
  const live = phase >= 1 ? (phase - 1) % REPORTS.length : -1;

  return (
    <Figure
      uid="cf-metrics"
      svgRef={ref}
      label="Every call, answered or missed, feeds reports on call volume, missed calls and which agent handled what."
    >
      <Box x={14} y={104} w={146} h={72} label="EVERY CALL" live>
        <Note x={28} y={146} tone="primary">
          answered or not
        </Note>
        <Note x={28} y={164} tone="faint">
          logged as it ends
        </Note>
      </Box>

      {REPORTS.map((report, index) => (
        <g key={report.label}>
          <Wire
            uid="cf-metrics"
            live={live === index}
            delay={index * 0.18}
            d={`M160 140 Q240 140 240 ${report.y + 28} H300`}
          />
          <Box
            x={300}
            y={report.y}
            w={166}
            h={56}
            label={report.label}
            live={live === index}
          >
            <Note
              x={314}
              y={report.y + 42}
              tone={live === index ? "primary" : "faint"}
            >
              {report.note}
            </Note>
          </Box>
        </g>
      ))}

      <Note x={240} y={266} anchor="middle" tone="faint">
        nobody has to reconstruct the day from memory
      </Note>
    </Figure>
  );
}

/* --------------------------------------------------------------- sales teams */

/**
 * Streamlined outbound calling: the number comes from the record, not from
 * memory.
 *
 * "Streamlined" on its own draws nothing, so the drawing takes the concrete
 * form the capability has in practice — dialling from the contact rather than
 * re-typing it — and shows the misdial as the branch avoided.
 */
export function OutboundDialer() {
  const { ref, phase } = usePhases(4, 1150);

  return (
    <Figure
      uid="cf-dial"
      svgRef={ref}
      label="A call is placed straight from a contact record in the browser, with no digits typed by hand and no misdials."
    >
      <Box x={14} y={96} w={152} h={64} label="A CONTACT" live>
        <Note x={28} y={138} tone="primary">
          open in the browser
        </Note>
      </Box>

      <Wire uid="cf-dial" live={phase >= 1} d="M166 128 H206" />

      {/* The single gesture the capability is actually about. */}
      <rect
        x={206}
        y={116}
        width={108}
        height={26}
        rx="13"
        className={cn(
          "transition-all duration-700",
          phase >= 1 ? "fill-primary" : "fill-muted",
        )}
      />
      <text
        x={260}
        y={133}
        textAnchor="middle"
        className={cn(
          "text-[9px] font-medium [font-family:var(--font-mono)] transition-colors duration-700",
          phase >= 1 ? "fill-primary-foreground" : "fill-muted-foreground",
        )}
      >
        click to dial
      </text>

      <Wire uid="cf-dial" live={phase >= 2} d="M314 128 H354" />

      <Box x={354} y={96} w={112} h={64} label="CONNECTED" live={phase >= 2}>
        <Note x={366} y={138} tone={phase >= 2 ? "primary" : "faint"}>
          no digits typed
        </Note>
      </Box>

      <path
        d="M90 160 V206 H166"
        className="stroke-border"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />
      <Box x={166} y={186} w={166} h={46} label="TYPED BY HAND" dashed>
        <Note x={180} y={220} tone="faint">
          wrong number, again
        </Note>
      </Box>

      <Note x={240} y={266} anchor="middle" tone="faint">
        the number comes from the record, not from memory
      </Note>
    </Figure>
  );
}

/**
 * The business number, shared by three pages.
 *
 * "Professional business numbers", "Local numbers and routing" and
 * "Per-branch identity" are one mechanism seen from three angles: the number
 * that shows on the outbound call is the one you chose, and a personal mobile
 * is never it. That absence is the whole point, so it is drawn — a diagram of
 * a number arriving somewhere would be true of any phone system.
 */
export function BusinessNumber() {
  const { ref, phase } = usePhases(3, 1200);

  return (
    <Figure
      uid="cf-number"
      svgRef={ref}
      label="Outbound calls show the business number you chose. A colleague's personal mobile number is never presented to the customer."
    >
      <Box x={14} y={96} w={176} h={68} label="WHAT THEY SEE" live>
        <Note x={28} y={138} tone="primary">
          your business number
        </Note>
        <Note x={28} y={156} tone="faint">
          the one you chose
        </Note>
      </Box>

      <Wire uid="cf-number" live={phase >= 1} d="M190 118 Q256 118 256 74 H300" />

      <Box x={300} y={46} w={166} h={56} label="THE TEAM" live={phase >= 1}>
        <Note x={314} y={88} tone={phase >= 1 ? "primary" : "faint"}>
          wherever they are
        </Note>
      </Box>

      <path
        d="M190 144 Q256 144 256 194 H300"
        className="stroke-border"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />

      <Box x={300} y={166} w={166} h={56} label="PERSONAL MOBILE" dashed>
        <Note x={314} y={208} tone="faint">
          never shown
        </Note>
      </Box>

      {/* The severed leg, marked once. */}
      <g
        className={cn(
          "transition-opacity duration-700",
          phase >= 2 ? "opacity-100" : "opacity-0",
        )}
      >
        <path
          d="M250 182 L262 194 M262 182 L250 194"
          className="stroke-muted-foreground/70"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      <Note x={240} y={266} anchor="middle" tone="faint">
        one identity out, whoever is dialling
      </Note>
    </Figure>
  );
}

/**
 * CRM and business app integration, shared by two pages.
 *
 * Drawn as the record doing the work rather than two logos joined by a line.
 * What the capability removes is a person copying a number into a system
 * afterwards, so the last line names that.
 */
export function CrmLink() {
  const { ref, phase } = usePhases(4, 1150);

  return (
    <Figure
      uid="cf-crm"
      svgRef={ref}
      label="An incoming call opens the matching customer record, and logs itself against that record when it ends — in the system the team already uses."
    >
      <Box x={14} y={108} w={152} h={64} label="A CALL ARRIVES" live>
        <Note x={28} y={150} tone="primary">
          a known number
        </Note>
      </Box>

      <Wire uid="cf-crm" live={phase >= 1} d="M166 140 H286" />

      <Box x={286} y={68} w={180} h={144} label="THE RECORD" live={phase >= 1}>
        <Note x={300} y={110} tone={phase >= 1 ? "primary" : "faint"}>
          opens on answer
        </Note>
        <Note x={300} y={136} tone={phase >= 2 ? "primary" : "faint"}>
          notes go in here
        </Note>
        <Note x={300} y={162} tone={phase >= 3 ? "primary" : "faint"}>
          call logged at the end
        </Note>
        <Note x={300} y={192} tone="faint">
          nothing copied by hand
        </Note>
      </Box>

      <Note x={240} y={266} anchor="middle" tone="faint">
        the system they already use, not a second one
      </Note>
    </Figure>
  );
}

/* ------------------------------------------------- unified communications */

const CHANNELS = [
  { label: "VOICE", note: "a call", y: 24 },
  { label: "VIDEO", note: "a meeting", y: 84 },
  { label: "MESSAGING", note: "a chat", y: 144 },
  { label: "SMS", note: "a text", y: 204 },
];

/**
 * Voice, video and messaging: four ways to reach the same person.
 *
 * Converging rather than radiating. A hub with spokes going out would say the
 * platform offers four things; the arrows pointing in say they are four doors
 * to one person, which is the claim the copy makes.
 */
export function ChannelsConverge() {
  const { ref, phase } = usePhases(5, 950);

  return (
    <Figure
      uid="cf-channels"
      svgRef={ref}
      label="Voice, video, messaging and SMS all arrive at one identity — the same number, the same person, the same directory."
    >
      {CHANNELS.map((channel, index) => (
        <g key={channel.label}>
          <Box
            x={14}
            y={channel.y}
            w={132}
            h={48}
            label={channel.label}
            live={phase >= index + 1}
          >
            <Note
              x={28}
              y={channel.y + 38}
              tone={phase >= index + 1 ? "primary" : "faint"}
            >
              {channel.note}
            </Note>
          </Box>
          {/* Orthogonal, meeting on one spine. Four curves bending at the
              same x read as a bundle of cable rather than as convergence. */}
          <Wire
            uid="cf-channels"
            live={phase >= index + 1}
            delay={index * 0.12}
            d={`M146 ${channel.y + 24} H236 V140 H300`}
          />
        </g>
      ))}

      <Box x={300} y={104} w={166} h={72} label="ONE IDENTITY" live={phase >= 1}>
        <Note x={314} y={146} tone="primary">
          same person
        </Note>
        <Note x={314} y={164} tone="faint">
          same directory
        </Note>
      </Box>

      <Note x={240} y={266} anchor="middle" tone="faint">
        four ways in, one person to reach
      </Note>
    </Figure>
  );
}

const THREAD = [
  { label: "a message", x: 92 },
  { label: "a call", x: 240 },
  { label: "a video meeting", x: 388 },
];

/**
 * Collaboration in one place: the history stays with the conversation.
 *
 * Deliberately not another convergence diagram — unified-communications
 * already has one directly above it. This is the same exchange over time, so
 * it is drawn as one rail with stops rather than as inputs meeting a hub, and
 * the dashed frame is what holds the three together.
 */
export function OneWorkspace() {
  const { ref, phase } = usePhases(4, 1200);

  return (
    <Figure
      uid="cf-thread"
      svgRef={ref}
      label="A message becomes a call and then a video meeting inside one conversation, with the history carried along rather than restarted in another tool."
    >
      {/* The frame stays quiet — it is the container, not the event. */}
      <Box x={14} y={52} w={452} h={176} label="ONE CONVERSATION" dashed>
        <Note x={28} y={100} tone="faint">
          started once, never restarted
        </Note>
      </Box>

      {/* The rail the exchange runs along. */}
      <path d="M92 152 H388" className="stroke-border" strokeWidth="1.25" />
      {phase >= 1 ? (
        <path
          d={`M92 152 H${THREAD[Math.min(phase, THREAD.length - 1)].x}`}
          className="stroke-primary transition-all duration-700"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : null}

      {THREAD.map((stop, index) => (
        <g key={stop.label}>
          <circle
            cx={stop.x}
            cy={152}
            r={phase >= index ? 6 : 4.5}
            className={cn(
              "transition-all duration-700",
              phase >= index ? "fill-primary" : "fill-muted-foreground/30",
            )}
          />
          <Note
            x={stop.x}
            y={180}
            anchor="middle"
            tone={phase >= index ? "primary" : "faint"}
          >
            {stop.label}
          </Note>
        </g>
      ))}

      <Note x={240} y={262} anchor="middle" tone="faint">
        nobody has to explain themselves twice
      </Note>
    </Figure>
  );
}

/* ------------------------------------------------------------ global offices */

const SITES = [
  { label: "HEAD OFFICE", x: 14 },
  { label: "BRANCH", x: 174 },
  { label: "WAREHOUSE", x: 334 },
];

/**
 * Unified environment across sites: same features, same rules, every site.
 *
 * Stacked rather than strung in a line, because the claim is that one thing
 * sits under all of them. A row of three linked boxes would have drawn a
 * network between sites, which is the next capability along, not this one.
 */
export function SitesLinked() {
  const { ref, phase } = usePhases(4, 1050);

  return (
    <Figure
      uid="cf-sites"
      svgRef={ref}
      label="Head office, a branch and a warehouse all run on one platform, with the same features and the same rules at each site."
    >
      {SITES.map((site, index) => (
        <g key={site.label}>
          <Box
            x={site.x}
            y={36}
            w={132}
            h={56}
            label={site.label}
            live={phase >= index + 1}
          >
            <Note
              x={site.x + 14}
              y={78}
              tone={phase >= index + 1 ? "primary" : "faint"}
            >
              same features
            </Note>
          </Box>
          {/* Orthogonal drop to a shared spine, so three sites arrive at the
              platform on the same line rather than by three different curves. */}
          <Wire
            uid="cf-sites"
            live={phase >= index + 1}
            delay={index * 0.15}
            d={`M${site.x + 66} 92 V168 H240 V182`}
          />
        </g>
      ))}

      <Box x={104} y={182} w={272} h={64} label="ONE PLATFORM" live>
        <Note x={118} y={224} tone="primary">
          one set of rules, not three
        </Note>
      </Box>

      <Note x={240} y={272} anchor="middle" tone="faint">
        a site does not get its own phone system
      </Note>
    </Figure>
  );
}

/**
 * Cross-site and cross-branch calling, shared by two pages.
 *
 * The absent thing is the argument: calling the next office is an internal
 * hop, not an outside call. So the outside line is drawn, dashed, and marked
 * as not needed — without it this is two boxes and a wire, which describes
 * any two things that are connected.
 */
export function InterSite() {
  const { ref, phase } = usePhases(3, 1200);

  return (
    <Figure
      uid="cf-inter"
      svgRef={ref}
      label="A colleague at one site dials a short extension to reach a colleague at another, as an internal call rather than an outside one."
    >
      <Box x={14} y={92} w={152} h={72} label="SITE A" live>
        <Note x={28} y={134} tone="primary">
          dials 311
        </Note>
        <Note x={28} y={152} tone="faint">
          four digits
        </Note>
      </Box>

      <Wire uid="cf-inter" live={phase >= 1} d="M166 128 H314" />

      <Note x={240} y={112} anchor="middle" tone={phase >= 1 ? "primary" : "faint"}>
        an internal hop
      </Note>

      <Box x={314} y={92} w={152} h={72} label="SITE B" live={phase >= 1}>
        <Note x={328} y={134} tone={phase >= 1 ? "primary" : "faint"}>
          extension 311
        </Note>
        <Note x={328} y={152} tone="faint">
          rings at the desk
        </Note>
      </Box>

      <path
        d="M90 164 V206 H170"
        className="stroke-border"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />
      <path
        d="M310 206 H390 V164"
        className="stroke-border"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />

      <Box x={170} y={186} w={140} h={46} label="OUTSIDE LINE" dashed>
        <Note x={184} y={220} tone="faint">
          not needed
        </Note>
      </Box>

      <Note x={240} y={266} anchor="middle" tone="faint">
        the next office is an extension away
      </Note>
    </Figure>
  );
}

/* --------------------------------------------------------------- multi-branch */

const BRANCHES = [
  { label: "BRANCH 1", y: 36 },
  { label: "BRANCH 2", y: 112 },
  { label: "BRANCH 3", y: 188 },
];

/**
 * Consistent standards: a new branch opens already configured.
 *
 * The standard is set once on the left and arrives identically on the right,
 * with the third branch drawn as the one that has just opened — which is the
 * moment the capability is worth anything. Three identically lit boxes would
 * have shown uniformity without showing how it got there.
 */
export function PolicyEverywhere() {
  const { ref, phase } = usePhases(4, 1100);

  return (
    <Figure
      uid="cf-policy"
      svgRef={ref}
      label="Greeting, opening hours and routing rules are set once and applied to every branch, including a branch that has only just opened."
    >
      <Box x={14} y={94} w={152} h={92} label="SET ONCE" live>
        <Note x={28} y={136} tone="primary">
          greeting
        </Note>
        <Note x={28} y={156} tone="primary">
          opening hours
        </Note>
        <Note x={28} y={176} tone="primary">
          routing rules
        </Note>
      </Box>

      {BRANCHES.map((branch, index) => (
        <g key={branch.label}>
          <Wire
            uid="cf-policy"
            live={phase >= index + 1}
            delay={index * 0.18}
            d={`M166 140 Q240 140 240 ${branch.y + 28} H300`}
          />
          <Box
            x={300}
            y={branch.y}
            w={166}
            h={56}
            label={branch.label}
            live={phase >= index + 1}
            dashed={index === 2 && phase < 3}
          >
            <Note
              x={314}
              y={branch.y + 42}
              tone={phase >= index + 1 ? "primary" : "faint"}
            >
              {index === 2 && phase >= 3
                ? "opened today — same rules"
                : "the same rules"}
            </Note>
          </Box>
        </g>
      ))}

      <Note x={240} y={266} anchor="middle" tone="faint">
        nothing is configured branch by branch
      </Note>
    </Figure>
  );
}

/* ------------------------------------------------------------------ lookup */

/**
 * Keyed by capability title, so re-ordering `capabilities` in lib/solutions.ts
 * cannot put the wrong picture beside the wrong heading.
 *
 * Twenty-four capabilities across the six pages resolve to sixteen drawings.
 * The eight that share are the ones naming a single product surface from two
 * or three angles — central administration on four pages, the business number
 * on three, cross-site calling and CRM integration and reporting on two each.
 * Drawing those differently per page would imply four portals exist. Every
 * page still gets four figures that share no geometry with each other, which
 * is the constraint that matters on the page itself.
 *
 * A capability that carries an `image` in lib/solutions.ts shows the mock
 * instead. Four of the six pages have artwork now, so only five of these
 * sixteen still draw anywhere: SitesLinked, BusinessNumber, InterSite,
 * AdminPortal and PolicyEverywhere, between Global Offices and Multi-Branch.
 * The other eleven are dormant.
 *
 * They stay because the image is the override and this is the floor: pull a
 * page's artwork, or add a use case, and the drawing is what renders. But the
 * balance has tipped — if Global Offices and Multi-Branch get mocks too, drop
 * this file and the `CapabilityFigure` fallback with it rather than carrying
 * sixteen unreachable drawings and the schematic vocabulary they need.
 */
const FIGURES: Record<string, () => ReactNode> = {
  /* remote workforce */
  "Desktop, mobile and browser calling": DeviceReach,
  "Extension mobility": ExtensionFollows,
  "Presence and multi-device": PresenceRoster,
  "Centralised control": AdminPortal,

  /* customer support */
  "Intelligent routing and queues": QueueRouting,
  "IVR menus": MenuTree,
  "Recording and monitoring": RecordMonitor,
  Analytics: MetricsBoard,

  /* sales teams */
  "Streamlined outbound calling": OutboundDialer,
  "Professional business numbers": BusinessNumber,
  "Conversation visibility": MetricsBoard,
  "CRM integration": CrmLink,

  /* unified communications */
  "Voice, video and messaging": ChannelsConverge,
  "Collaboration in one place": OneWorkspace,
  "Business app integrations": CrmLink,
  "One environment to manage": AdminPortal,

  /* Global Offices — lowercase "global" here reads as an eslint directive */
  "Unified environment across sites": SitesLinked,
  "Local numbers and routing": BusinessNumber,
  "Cross-location connectivity": InterSite,
  "Centralised administration": AdminPortal,

  /* multi-branch */
  "Per-branch identity": BusinessNumber,
  "Cross-branch calling": InterSite,
  "Central management": AdminPortal,
  "Consistent standards": PolicyEverywhere,
};

/**
 * The figure for one capability, or the fallback if it has no drawing yet.
 *
 * The lookup lives here, on the client side of the boundary, and not in
 * UseCaseSolution. Every export of a `"use client"` module is a client
 * *reference* when a server component imports it — so a server component can
 * render `<CapabilityFigure />`, but reading `FIGURES[title]` there returns
 * undefined and silently drops every row back to its icon. The same trap is
 * documented in included-figures.tsx, which fell into it first.
 *
 * `title` crosses the boundary as a string and `fallback` as an already
 * rendered element, so UseCaseSolution stays a server component.
 */
export function CapabilityFigure({
  title,
  fallback,
}: {
  title: string;
  fallback: ReactNode;
}) {
  const Figure = FIGURES[title];
  return Figure ? <Figure /> : <>{fallback}</>;
}
