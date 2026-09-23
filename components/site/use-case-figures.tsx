"use client";

import {
  Box,
  Defs,
  Field,
  H,
  Note,
  W,
  Wire,
  usePhases,
} from "@/components/site/schematic";
import { cn } from "@/lib/utils";

/**
 * One schematic per use case.
 *
 * These six pages deliberately share a layout — a reader should be able to
 * tell they are in By Use Case without reading the label. The figure is the
 * only thing that changes, so it carries the whole difference between them,
 * and each one draws the thing that use case's reader stands to lose being
 * prevented rather than a picture of the product.
 *
 * Drawn from the shared vocabulary in schematic.tsx. No capacities, latencies,
 * volumes or coverage figures: the source documents flag all of those as
 * unverified.
 */

/* ------------------------------------------------------- remote workforce */

const REMOTE = [
  { place: "office", y: 66 },
  { place: "home", y: 132 },
  { place: "a client site", y: 198 },
  { place: "on mobile", y: 264 },
];

/**
 * What a remote team stands to lose: the customer noticing.
 *
 * The document's worry is that customers "feel like they are dealing with a
 * distributed team" — so the drawing puts one number on the caller's side and
 * four places on the team's, and the call goes to whoever is free without the
 * caller ever seeing which. The four places are labelled; none of them is a
 * personal number.
 */
export function OneIdentity() {
  const { ref, phase } = usePhases(5, 1200);
  const answering = phase >= 1 ? (phase - 1) % REMOTE.length : -1;

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
      aria-label="A customer dials one business number. The call reaches whichever colleague is free, whether they are in the office, at home, at a client site or on mobile — the caller never sees which.">
      <Defs uid="uc-rw" w={W} h={H} />
      <Field uid="uc-rw" w={W} h={H} />

      <Note x={30} y={40}>a customer dials</Note>
      <Wire uid="uc-rw" live d="M30 160 H92" />

      <Box x={92} y={132} w={148} h={56} label="ONE NUMBER" live>
        <Note x={108} y={174} tone="primary">your business line</Note>
      </Box>

      <Note x={530} y={40} anchor="end">whoever is free</Note>

      {REMOTE.map((r, i) => {
        const live = answering === i;
        return (
          <g key={r.place}>
            <Wire
              uid="uc-rw"
              live={live}
              delay={i * 0.2}
              d={`M240 160 Q300 160 300 ${r.y + 22} H360`}
            />
            <Box
              x={360}
              y={r.y}
              w={170}
              h={44}
              label={`COLLEAGUE ${i + 1}`}
              live={live}
            >
              <Note x={376} y={38 + r.y} tone={live ? "primary" : "faint"}>
                {live ? `answering — ${r.place}` : r.place}
              </Note>
            </Box>
          </g>
        );
      })}

      <Note x={280} y={316} anchor="middle" tone="faint">
        same number, same greeting, wherever they are
      </Note>
    </svg>
  );
}

/* --------------------------------------------------------- customer support */

const TRIAGE = ["menu", "queue", "agent"];

/**
 * What a support line stands to lose: the caller who gets a busy tone.
 *
 * This is the document's own Call Queue walkthrough — a caller passes the
 * IVR, chooses a department, enters the queue, and reaches an available
 * agent. The alternative it names explicitly is that "additional callers can
 * remain in the queue rather than simply receiving a busy signal", so the
 * busy tone is drawn as the branch that is not taken.
 */
export function TriagedCall() {
  const { ref, phase } = usePhases(5, 1150);

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
      aria-label="A caller passes the menu, chooses a department, waits in the queue and reaches an available agent — instead of meeting a busy tone.">
      <Defs uid="uc-cs" w={W} h={H} />
      <Field uid="uc-cs" w={W} h={H} />

      <Note x={30} y={40}>caller</Note>
      <Wire uid="uc-cs" live d="M30 128 H80" />

      {TRIAGE.map((stage, i) => {
        const reached = phase > i;
        const x = 80 + i * 150;
        return (
          <g key={stage}>
            <Box x={x} y={100} w={120} h={56} label={stage.toUpperCase()} live={reached}>
              <Note x={x + 16} y={142} tone={reached ? "primary" : "faint"}>
                {stage === "menu"
                  ? "sales / support"
                  : stage === "queue"
                    ? "position held"
                    : "picks up"}
              </Note>
            </Box>
            {i < TRIAGE.length - 1 ? (
              <Wire
                uid="uc-cs"
                live={phase > i + 1}
                delay={i * 0.3}
                d={`M${x + 120} 128 H${x + 150}`}
              />
            ) : null}
          </g>
        );
      })}

      <Wire uid="uc-cs" live={phase >= 4} delay={0.2} d="M500 128 H532" />
      <Note x={532} y={112} anchor="end" tone={phase >= 4 ? "primary" : "faint"}>
        answered
      </Note>

      {/* The branch that is not taken. Drawn dim and dashed throughout. */}
      <path d="M140 156 V232 H500" fill="none" className="stroke-border" strokeWidth="1.5" strokeDasharray="4 4" />
      <Box x={330} y={210} w={170} h={44} label="WITHOUT A QUEUE">
        <Note x={346} y={248} tone="faint">busy tone, caller gone</Note>
      </Box>
      <Note x={150} y={248} tone="faint">the alternative</Note>
    </svg>
  );
}

/* ------------------------------------------------------------- sales teams */

/** What a rep's list is really made of. Only one kind is a conversation. */
const DIALS = [
  { result: "no answer", connects: false },
  { result: "busy", connects: false },
  { result: "connected", connects: true },
  { result: "unavailable", connects: false },
  { result: "connected", connects: true },
];

/**
 * What a sales desk stands to lose: the hours between conversations.
 *
 * The document is explicit that the dialler exists so reps stop "manually
 * dialing each number and waiting for unanswered, busy, or unavailable
 * calls". So the figure shows the list being worked, the dead outcomes
 * dropping away, and only the connected ones reaching the rep.
 */
export function DialerTime() {
  const { ref, phase } = usePhases(DIALS.length + 1, 800);

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
      aria-label="The dialler works the list. No answer, busy and unavailable are handled by the system; only connected calls are passed to a rep.">
      <Defs uid="uc-st" w={W} h={H} />
      <Field uid="uc-st" w={W} h={H} />

      <Note x={30} y={40}>the call list</Note>

      <Box x={30} y={54} w={170} h={230} label="DIALLER" live>
        {DIALS.map((d, i) => {
          const worked = phase > i;
          return (
            <g key={i}>
              <rect
                x={44} y={86 + i * 38} width={142} height={28} rx="4"
                className={cn(
                  "transition-all duration-500",
                  worked
                    ? d.connects
                      ? "fill-primary/12 stroke-primary"
                      : "fill-transparent stroke-border"
                    : "fill-background stroke-border",
                )}
                strokeWidth="1.1"
                strokeDasharray={worked && !d.connects ? "3 3" : undefined}
              />
              <text
                x={54} y={104 + i * 38}
                className={cn(
                  "text-[8px] [font-family:var(--font-mono)] transition-colors duration-500",
                  worked
                    ? d.connects ? "fill-primary" : "fill-muted-foreground/40"
                    : "fill-muted-foreground/70",
                )}
              >
                {worked ? d.result : "dialling"}
              </text>
            </g>
          );
        })}
      </Box>

      {/* Only the connected ones travel. */}
      {DIALS.map((d, i) =>
        d.connects ? (
          <Wire
            key={i}
            uid="uc-st"
            live={phase > i}
            delay={i * 0.25}
            d={`M200 ${100 + i * 38} Q290 ${100 + i * 38} 290 170 H354`}
          />
        ) : null,
      )}

      <Box x={354} y={142} w={176} h={56} label="YOUR REP" live={phase > 2}>
        <Note x={370} y={184} tone={phase > 2 ? "primary" : "faint"}>
          talking, not waiting
        </Note>
      </Box>

      <Note x={442} y={232} anchor="middle" tone="faint">
        dead dials never reach a person
      </Note>
    </svg>
  );
}

/* ------------------------------------------------- unified communications */

const CHANNELS = ["calls", "messaging", "team chat", "applications"];

/**
 * What a fragmented business stands to lose: the switching.
 *
 * The document's framing is "instead of managing separate systems for
 * calling, messaging, applications, and team communication". So the figure
 * starts as four separate systems, each in its own box, and ends with all
 * four arriving in one — the boxes do not disappear, they converge.
 */
export function ChannelsConverge() {
  const { ref, phase } = usePhases(2, 2200);
  const joined = phase >= 1;

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
      aria-label="Calls, messaging, team chat and business applications start as four separate systems and arrive in one connected environment.">
      <Defs uid="uc-uc" w={W} h={H} />
      <Field uid="uc-uc" w={W} h={H} />

      <Note x={30} y={40}>{joined ? "one environment" : "four separate systems"}</Note>

      {CHANNELS.map((c, i) => {
        const y = 62 + i * 64;
        return (
          <g key={c}>
            <Box x={30} y={y} w={152} h={48} label={c.toUpperCase()} live={joined}>
              <Note x={46} y={y + 40} tone={joined ? "primary" : "faint"}>
                {joined ? "connected" : "its own system"}
              </Note>
            </Box>
            <Wire
              uid="uc-uc"
              live={joined}
              delay={i * 0.24}
              d={`M182 ${y + 24} Q286 ${y + 24} 286 170 H352`}
            />
          </g>
        );
      })}

      <Box x={352} y={122} w={178} h={96} label="SIPLINK" live={joined}>
        <Note x={368} y={166} tone={joined ? "primary" : "faint"}>
          {joined ? "one place to manage" : "waiting"}
        </Note>
        <Note x={368} y={192} tone="faint">
          one experience for staff
        </Note>
      </Box>
    </svg>
  );
}

/* ---------------------------------------------------------- global offices */

const MARKETS = [
  { name: "market one", y: 56 },
  { name: "market two", y: 124 },
  { name: "market three", y: 192 },
  { name: "market four", y: 260 },
];

/**
 * What a business opening abroad stands to lose: one system per country.
 *
 * The document asks for "a consistent business communication experience
 * across locations while supporting local requirements" — two things at once.
 * So the figure keeps a separate local number per market on the left, and has
 * all of them arrive at one platform on the right. Local presence and one
 * system are not in tension; that is the point.
 */
export function LocalGlobal() {
  const { ref, phase } = usePhases(MARKETS.length + 1, 750);

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
      aria-label="Each market keeps a local number, and every one of them routes into a single platform, so local presence and one consistent system are not in tension.">
      <Defs uid="uc-go" w={W} h={H} />
      <Field uid="uc-go" w={W} h={H} />

      <Note x={30} y={38}>a local number in each market</Note>

      {MARKETS.map((m, i) => {
        const on = phase > i;
        return (
          <g key={m.name}>
            <Box x={30} y={m.y} w={162} h={48} label={`LOCAL ${i + 1}`} live={on}>
              <Note x={46} y={m.y + 40} tone={on ? "primary" : "faint"}>
                {m.name}
              </Note>
            </Box>
            <Wire
              uid="uc-go"
              live={on}
              delay={i * 0.2}
              d={`M192 ${m.y + 24} Q292 ${m.y + 24} 292 170 H356`}
            />
          </g>
        );
      })}

      <Box x={356} y={134} w={174} h={72} label="ONE PLATFORM" live={phase > 0}>
        <Note x={372} y={176} tone="primary">managed centrally</Note>
        <Note x={372} y={196} tone="faint">the same everywhere</Note>
      </Box>

      <Note x={443} y={240} anchor="middle" tone="faint">
        local where it matters, one system underneath
      </Note>
    </svg>
  );
}

/* ----------------------------------------------------------- multi-branch */

const BRANCHES = ["branch one", "branch two", "branch three"];

/**
 * What a growing chain stands to lose: head office going blind.
 *
 * The document asks for two things that pull against each other — branches
 * "maintain their business identities and communication workflows" while
 * management keeps "centralized visibility". So each branch keeps its own
 * hours and greeting on the left, and a single view above sees all of them.
 */
export function BranchSpine() {
  const { ref, phase } = usePhases(BRANCHES.length + 2, 800);

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
      aria-label="Each branch keeps its own numbers, hours and greeting, while head office sees every branch from one view.">
      <Defs uid="uc-mb" w={W} h={H} />
      <Field uid="uc-mb" w={W} h={H} />

      <Box x={172} y={26} w={216} h={56} label="HEAD OFFICE" live={phase > BRANCHES.length}>
        <Note x={188} y={68} tone={phase > BRANCHES.length ? "primary" : "faint"}>
          every branch, one view
        </Note>
      </Box>

      {/* The spine. Branches hang off it; it is what head office sees down. */}
      <path d="M280 82 V300" className="stroke-border" strokeWidth="1.5" />

      {BRANCHES.map((b, i) => {
        const on = phase > i;
        const y = 120 + i * 62;
        const left = i % 2 === 0;
        return (
          <g key={b}>
            <Wire
              uid="uc-mb"
              live={on}
              delay={i * 0.3}
              d={left ? `M280 ${y + 22} H202` : `M280 ${y + 22} H358`}
            />
            <Box
              x={left ? 32 : 358}
              y={y}
              w={170}
              h={44}
              label={`BRANCH ${i + 1}`}
              live={on}
            >
              <Note x={(left ? 32 : 358) + 16} y={y + 38} tone={on ? "primary" : "faint"}>
                own hours and greeting
              </Note>
            </Box>
          </g>
        );
      })}

      <Note x={280} y={322} anchor="middle" tone="faint">
        local identity kept, nothing out of sight
      </Note>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

const FIGURES: Record<string, () => React.JSX.Element> = {
  "remote-workforce": OneIdentity,
  "customer-support": TriagedCall,
  "sales-teams": DialerTime,
  "unified-communications": ChannelsConverge,
  "global-offices": LocalGlobal,
  "multi-branch": BranchSpine,
};

export function UseCaseFigure({ slug }: { slug: string }) {
  const Figure = FIGURES[slug];
  return Figure ? <Figure /> : null;
}
