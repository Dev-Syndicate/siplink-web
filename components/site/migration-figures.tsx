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
 * One schematic per migration. The drawing vocabulary lives in schematic.tsx;
 * what is here is what each migration actually is.
 *
 * Each carries two kinds of motion doing different jobs. Traffic runs
 * continuously, because the line never stops being live. The state change
 * plays once on view and holds, because a migration happens once — a loop
 * would say the opposite of what these pages are for.
 */

/* ------------------------------------------------------------------- PRI */

/** Twelve channels, in two banks of six, the way a channel bank is racked. */
const BANK = Array.from({ length: 12 }, (_, i) => i);

/**
 * What a PRI is: a physical circuit carrying one call per channel, with a
 * fixed number of channels. The figure fills the bank, refuses the call that
 * arrives with nowhere to put it, then shows the same traffic on SIP where
 * the bank is not the limit.
 *
 * The refused call is the whole drawing. Everything else is the setup for it.
 */
export function PriCeiling() {
  const { ref, phase } = usePhases(4, 1700);
  const onSip = phase >= 3;
  const filled = phase === 0 ? 7 : 12;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="A PRI circuit carries one call per channel. When every channel is in use the next caller is refused. On SIP the same traffic connects, because capacity is not a fixed set of physical lines."
    >
      <Defs uid="pri" w={W} h={H} />
      <Field uid="pri" w={W} h={H} />

      <Note x={28} y={34}>
        inbound calls
      </Note>
      <Note x={532} y={34} anchor="end">
        your business
      </Note>

      {/* Calls arriving. Seven wires, one per call, all of them live. */}
      {BANK.slice(0, 7).map((i) => (
        <Wire
          key={i}
          uid="pri"
          live
          delay={i * 0.28}
          d={`M28 ${58 + i * 26} H92 Q112 ${58 + i * 26} 112 ${
            76 + i * 16
          } H150`}
        />
      ))}

      {/* The channel bank. Two racks of six, each slot a channel. */}
      <Box
        x={150}
        y={44}
        w={150}
        h={252}
        label={onSip ? "SIP" : "PRI CIRCUIT"}
        live
      >
        {BANK.map((slot) => {
          const col = slot % 2;
          const row = Math.floor(slot / 2);
          const x = 164 + col * 62;
          const y = 78 + row * 34;
          const on = slot < filled;
          return (
            <g key={slot}>
              <rect
                x={x}
                y={y}
                width={54}
                height={22}
                rx="4"
                className={cn(
                  "transition-all duration-500",
                  on ? "fill-primary/15 stroke-primary" : "fill-transparent stroke-border",
                )}
                strokeWidth="1.1"
                style={{ transitionDelay: `${slot * 40}ms` }}
              />
              <text
                x={x + 7}
                y={y + 15}
                className={cn(
                  "text-[7.5px] [font-family:var(--font-mono)] transition-colors duration-500",
                  on ? "fill-primary" : "fill-muted-foreground/45",
                )}
              >
                ch {String(slot + 1).padStart(2, "0")}
              </text>
              {on ? (
                <circle
                  cx={x + 46}
                  cy={y + 11}
                  r="2.5"
                  className="fill-primary"
                />
              ) : null}
            </g>
          );
        })}

        <Note x={225} y={288} anchor="middle" tone={onSip ? "primary" : "muted"}>
          {onSip ? "capacity is not the bank" : `${filled} of 12 channels in use`}
        </Note>
      </Box>

      {/* Out the other side, to the business. */}
      {BANK.slice(0, 7).map((i) => (
        <Wire
          key={i}
          uid="pri"
          live
          delay={0.4 + i * 0.28}
          d={`M300 ${76 + i * 16} H392 Q416 ${76 + i * 16} 416 ${
            58 + i * 26
          } H532`}
        />
      ))}

      {/* The call that arrives with the bank full. On a PRI it stops at the
          edge of the circuit; on SIP the same path completes. */}
      <g>
        <Wire
          uid="pri"
          live={onSip}
          delay={0.1}
          d="M28 316 H120 Q146 316 146 300 H150"
        />
        <Note x={28} y={306} tone={phase === 2 ? "primary" : "faint"}>
          one more call
        </Note>

        {onSip ? (
          <>
            <Wire uid="pri" live delay={0.55} d="M300 300 Q404 300 404 316 H532" />
            <Note x={532} y={306} anchor="end" tone="primary">
              connects
            </Note>
          </>
        ) : (
          <>
            {/* The barrier. It is the point of the whole drawing. */}
            <path
              d="M150 282 V318"
              className={cn(
                "transition-colors duration-500",
                phase === 2 ? "stroke-primary" : "stroke-border",
              )}
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            {phase === 2 ? (
              <>
                <path
                  d="M138 294 l10 10 M148 294 l-10 10"
                  className="stroke-muted-foreground"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <Note x={166} y={306} tone="muted">
                  engaged — no channel free
                </Note>
              </>
            ) : (
              <Note x={166} y={306} tone="faint">
                no channel to put it on
              </Note>
            )}
          </>
        )}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------- PBX */

/** What lives inside the box, and therefore what has to survive the move. */
const CONTENTS = [
  "extensions",
  "departments",
  "call flows",
  "routing rules",
  "business hours",
  "voicemail",
];

/**
 * What a PBX migration actually moves: the configuration, not the hardware.
 *
 * Each item leaves the chassis along its own wire and lands in the cloud
 * under the same name. The chassis keeps a dashed ghost of everything that
 * has gone, so the drawing reads as carried across rather than deleted —
 * which is the page's heading, that you do not start from scratch.
 */
export function PbxMove() {
  const { ref, phase } = usePhases(CONTENTS.length + 1, 950);
  const moved = phase;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="A PBX migration carries the configuration across: extensions, departments, call flows, routing rules, business hours and voicemail all move from the on-premise chassis into SipLink under the same names."
    >
      <Defs uid="pbx" w={W} h={H} />
      <Field uid="pbx" w={W} h={H} />

      {/* The box in the closet, with its rack ears and ports. */}
      <Box
        x={30}
        y={44}
        w={186}
        h={252}
        label="ON-PREMISE PBX"
        live={moved < CONTENTS.length}
        dashed={moved >= CONTENTS.length}
      >
        {CONTENTS.map((item, index) => {
          const gone = index < moved;
          const y = 76 + index * 34;
          return (
            <g key={item}>
              <rect
                x={44}
                y={y}
                width={158}
                height={24}
                rx="4"
                className={cn(
                  "transition-all duration-500",
                  gone
                    ? "fill-transparent stroke-border"
                    : "fill-background stroke-border",
                )}
                strokeWidth="1.1"
                strokeDasharray={gone ? "3 3" : undefined}
              />
              <text
                x={54}
                y={y + 16}
                className={cn(
                  "text-[8px] [font-family:var(--font-mono)] transition-colors duration-500",
                  gone ? "fill-muted-foreground/35" : "fill-foreground/80",
                )}
              >
                {item}
              </text>
            </g>
          );
        })}

        {/* Port row along the bottom, so it reads as a physical unit. */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((p) => (
          <rect
            key={p}
            x={46 + p * 19}
            y={276}
            width={13}
            height={8}
            rx="1.5"
            className="fill-transparent stroke-border"
            strokeWidth="1"
          />
        ))}
      </Box>

      {/* One wire per item, lit only once that item has crossed. */}
      {CONTENTS.map((item, index) => {
        const y = 88 + index * 34;
        return (
          <Wire
            key={item}
            uid="pbx"
            live={index < moved}
            delay={index * 0.3}
            d={`M216 ${y} H270 Q292 ${y} 292 ${168} H344`}
          />
        );
      })}

      {/* The cloud side, filling. */}
      <Box x={344} y={44} w={186} h={252} label="SIPLINK" live={moved > 0}>
        {CONTENTS.map((item, index) => {
          const here = index < moved;
          const y = 76 + index * 34;
          return (
            <g
              key={item}
              className="transition-opacity duration-500"
              style={{ opacity: here ? 1 : 0 }}
            >
              <rect
                x={358}
                y={y}
                width={158}
                height={24}
                rx="4"
                className="fill-primary/10 stroke-primary/45"
                strokeWidth="1.1"
              />
              <path
                d="M367 0 l3 3 l5 -6"
                transform={`translate(0 ${y + 10})`}
                fill="none"
                className="stroke-primary"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x={382}
                y={y + 16}
                className="text-[8px] fill-foreground/80 [font-family:var(--font-mono)]"
              >
                {item}
              </text>
            </g>
          );
        })}

        <Note x={437} y={288} anchor="middle" tone={moved >= CONTENTS.length ? "primary" : "muted"}>
          moved {moved} of {CONTENTS.length}
        </Note>
      </Box>
    </svg>
  );
}

/* ----------------------------------------------------------------- cloud */

/** Where the same people end up once the building stops being the anchor. */
const PLACES = [
  { label: "head office", x: 96, y: 74 },
  { label: "home", x: 468, y: 66 },
  { label: "branch", x: 84, y: 268 },
  { label: "on the road", x: 476, y: 272 },
];

/**
 * What the cloud changes: what everyone is attached to.
 *
 * Before, the phone system is a place and every desk is wired into it. After,
 * it is above all of them — the same four people are in four different places
 * and none of them has moved away from the phone system, because it is no
 * longer somewhere you can be away from.
 */
export function CloudUntether() {
  const { ref, phase } = usePhases(2, 2500);
  const free = phase >= 1;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="Before the move, every desk is wired to a box in one building. After it, the same four people work from the head office, home, a branch and the road, all reaching one phone system in the cloud."
    >
      <Defs uid="cld" w={W} h={H} />
      <Field uid="cld" w={W} h={H} />

      {/* The tethers. They do not vanish, they re-anchor — nobody loses the
          phone system, it stops being a place. */}
      {PLACES.map((place, index) => {
        const hx = free ? place.x : 248 + (index % 2) * 64;
        const hy = free ? place.y : 126 + Math.floor(index / 2) * 88;
        return (
          <Wire
            key={place.label}
            uid="cld"
            live
            delay={index * 0.42}
            d={`M280 170 Q${(280 + hx) / 2} ${(170 + hy) / 2} ${hx} ${hy}`}
          />
        );
      })}

      {/* The anchor. A building, then the layer above it. */}
      {free ? (
        <g>
          <path
            d="M236 150 q0 -22 22 -22 q6 -18 26 -18 q22 0 28 20 q22 0 22 22 q0 20 -22 20 H258 q-22 0 -22 -22 Z"
            className="fill-primary stroke-primary"
            strokeWidth="1.5"
            filter="url(#mgl-cld)"
          />
          <Note x={280} y={196} anchor="middle" tone="primary">
            siplink
          </Note>
        </g>
      ) : (
        <g>
          <rect
            x={244}
            y={124}
            width={72}
            height={62}
            rx="5"
            className="fill-background stroke-border"
            strokeWidth="1.5"
          />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={256 + c * 18}
                y={136 + r * 16}
                width={10}
                height={9}
                rx="1.5"
                className="fill-transparent stroke-border"
                strokeWidth="1"
              />
            )),
          )}
          <Note x={280} y={204} anchor="middle">
            the building
          </Note>
        </g>
      )}

      {/* The people. Huddled at the box, then where they actually are. */}
      {PLACES.map((place, index) => {
        const x = free ? place.x : 248 + (index % 2) * 64;
        const y = free ? place.y : 126 + Math.floor(index / 2) * 88;
        return (
          <g
            key={place.label}
            className="transition-all duration-1000 ease-out"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <circle
              r="17"
              className={cn(
                "transition-all duration-700",
                free
                  ? "fill-background stroke-primary"
                  : "fill-background stroke-border",
              )}
              strokeWidth="1.5"
            />
            <circle
              cy="-4"
              r="4.5"
              className={cn(free ? "fill-primary/70" : "fill-muted-foreground/50")}
            />
            <path
              d="M-7 8 a7 7 0 0 1 14 0"
              className={cn(
                free ? "fill-primary/70" : "fill-muted-foreground/50",
              )}
            />
            <text
              y="32"
              textAnchor="middle"
              className={cn(
                "text-[8px] [font-family:var(--font-mono)] transition-opacity duration-700",
                free ? "fill-muted-foreground opacity-100" : "opacity-0",
              )}
            >
              {place.label}
            </text>
          </g>
        );
      })}

      <Note x={280} y={322} anchor="middle" tone={free ? "primary" : "faint"}>
        {free ? "four places, one phone system" : "every desk wired to one box"}
      </Note>
    </svg>
  );
}

/* --------------------------------------------------------------- porting */

/**
 * Porting: the number is the constant, the road underneath it changes.
 *
 * This was a four-gate progress bar, which was the wrong drawing twice over.
 * The page already lays out the six-step process in its own section below,
 * so the figure was restating it; and a stepper answers "how long does this
 * take", when the question a reader actually arrives with is "will customers
 * still reach me on the number that is on my signage".
 *
 * So the number plate on the left never moves, never blinks and never
 * changes. The desk on the right rings the same way throughout. The only
 * thing that changes is which of the two routes between them is carrying the
 * call — and the drawing runs both at once through the cutover, because that
 * is what actually happens. Nothing ever stops.
 *
 * The digits are dotted out. A real-looking number on a porting diagram
 * would be somebody's.
 */
const ROUTES = {
  /** Up and over: the carrier you are leaving. */
  old: "M196 170 C 232 170 228 104 268 104 H 328 C 368 104 364 170 400 170",
  /** Down and under: the same two ends, a different road between them. */
  siplink: "M196 170 C 232 170 228 236 268 236 H 328 C 368 236 364 170 400 170",
};

export function NumberKept() {
  // Three beats: the old carrier is running it; both are, through the
  // switch; then only SipLink. Slow, because this is the one moment.
  const { ref, phase } = usePhases(3, 2300);
  const cut = phase >= 1;
  const done = phase >= 2;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="A customer dials the same business number throughout. The call first travels the route carried by your old provider, then travels the SipLink route once the port completes, and reaches the same desk either way. The number itself never changes."
    >
      <Defs uid="prt" w={W} h={H} />
      <Field uid="prt" w={W} h={H} />

      <Note x={28} y={44}>
        a customer dials
      </Note>
      <Note x={532} y={44} anchor="end" tone="primary">
        it still reaches you
      </Note>

      {/* The invariant. Deliberately the largest thing here, and the only
          element with no transition on it at all. */}
      <g>
        <rect
          x={28}
          y={136}
          width={168}
          height={68}
          rx="10"
          className="fill-background stroke-primary"
          strokeWidth="1.75"
        />
        <text
          x={112}
          y={172}
          textAnchor="middle"
          className="fill-foreground text-[12.5px] font-medium tracking-[0.1em] [font-family:var(--font-mono)]"
        >
          +91 80 •••• ••••
        </text>
        <Note x={112} y={190} anchor="middle">
          your number, before and after
        </Note>
      </g>

      {/* Two roads, same two ends. */}
      <path
        d={ROUTES.old}
        fill="none"
        strokeWidth="1.5"
        strokeDasharray={done ? "4 4" : undefined}
        className={cn(
          "transition-colors duration-700",
          done ? "stroke-border" : "stroke-primary/35",
        )}
      />
      {!done ? (
        <path
          d={ROUTES.old}
          fill="none"
          pathLength={100}
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#mgl-prt)"
          className="flow-path stroke-primary"
        />
      ) : null}

      <path
        d={ROUTES.siplink}
        fill="none"
        strokeWidth="1.5"
        strokeDasharray={cut ? undefined : "4 4"}
        className={cn(
          "transition-colors duration-700",
          cut ? "stroke-primary/35" : "stroke-border",
        )}
      />
      {cut ? (
        <path
          d={ROUTES.siplink}
          fill="none"
          pathLength={100}
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#mgl-prt)"
          className="flow-path stroke-primary"
          style={{ animationDelay: "0.35s" }}
        />
      ) : null}

      <Note x={298} y={92} anchor="middle" tone={done ? "faint" : "primary"}>
        {done ? "your old provider, now retired" : "your old provider"}
      </Note>
      <Note x={298} y={258} anchor="middle" tone={cut ? "primary" : "faint"}>
        siplink
      </Note>

      {/* Where the call lands. Unchanged in every phase — that is the point,
          so it gets no state of its own. */}
      <Box x={400} y={142} w={132} h={56} label="YOUR DESK" live>
        <Note x={416} y={184} tone="primary">
          ringing
        </Note>
      </Box>
    </svg>
  );
}
