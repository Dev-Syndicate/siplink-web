import type { ReactNode } from "react";

import type { SolutionDetail } from "@/lib/solutions";
import { cn } from "@/lib/utils";

/**
 * A small schematic for each capability, keyed by its title.
 *
 * The reference this section follows puts an illustration at the top of every
 * card, and an icon alone floating in that much space reads as a card waiting
 * for artwork. These are drawn from one vocabulary — a rounded plate, a rail,
 * a node — so six of them sit together as a set rather than six styles.
 *
 * Keyed by title rather than ordered, so re-ordering the capabilities in
 * lib/solutions.ts cannot silently put the wrong picture on a card. Anything
 * unmatched falls back to the capability's own icon.
 */
const PLATES: Record<string, ReactNode> = {
  // The client they already work in, with an outside line reaching it.
  "Microsoft Teams calling": (
    <>
      <rect
        x="12"
        y="20"
        width="64"
        height="50"
        rx="7"
        className="fill-card stroke-primary/45"
        strokeWidth="1.5"
      />
      <path d="M12 32 H76" className="stroke-primary/25" strokeWidth="1.5" />
      <circle cx="26" cy="46" r="6" className="fill-primary/35" />
      <rect
        x="38"
        y="41"
        width="28"
        height="4"
        rx="2"
        className="fill-primary/30"
      />
      <rect
        x="38"
        y="49"
        width="18"
        height="4"
        rx="2"
        className="fill-primary/18"
      />
      <path
        d="M76 45 H108"
        className="stroke-primary"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <circle cx="124" cy="45" r="13" className="fill-primary" />
      <path
        d="M118 40c3 7 5 9 12 11"
        className="stroke-background"
        strokeWidth="2.25"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),

  // Two zones and the controlled gap between them. Only the gap lets through.
  "Session Border Controller": (
    <>
      <rect
        x="10"
        y="24"
        width="42"
        height="42"
        rx="7"
        className="fill-card stroke-primary/35"
        strokeWidth="1.5"
      />
      <rect
        x="108"
        y="24"
        width="42"
        height="42"
        rx="7"
        className="fill-card stroke-primary/35"
        strokeWidth="1.5"
      />
      <rect
        x="74"
        y="12"
        width="12"
        height="28"
        rx="4"
        className="fill-primary"
      />
      <rect
        x="74"
        y="50"
        width="12"
        height="28"
        rx="4"
        className="fill-primary"
      />
      <path d="M52 45 H74" className="stroke-primary" strokeWidth="2" />
      <path d="M86 45 H108" className="stroke-primary" strokeWidth="2" />
      <path
        d="M62 34 v22"
        className="stroke-primary/30"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    </>
  ),

  // A line of callers waiting, fanning out to the groups that take them.
  "Enterprise call queues": (
    <>
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={18 + i * 15}
          cy="45"
          r="6"
          className={i === 0 ? "fill-primary" : "fill-primary/30"}
        />
      ))}
      <path
        d="M78 45 C96 45 96 22 112 22"
        className="stroke-primary/60"
        strokeWidth="1.75"
        fill="none"
      />
      <path
        d="M78 45 H112"
        className="stroke-primary/60"
        strokeWidth="1.75"
        fill="none"
      />
      <path
        d="M78 45 C96 45 96 68 112 68"
        className="stroke-primary/60"
        strokeWidth="1.75"
        fill="none"
      />
      {[22, 45, 68].map((y) => (
        <rect
          key={y}
          x="112"
          y={y - 8}
          width="34"
          height="16"
          rx="5"
          className="fill-card stroke-primary/40"
          strokeWidth="1.5"
        />
      ))}
    </>
  ),

  // The call as a row inside the record, not a badge stuck beside it. Drawn
  // this way to stay clear of the Teams plate, which already owns the
  // dashed-line-to-a-handset figure, and because a call filed against the
  // customer is literally what the capability does.
  "CRM integration": (
    <>
      <rect
        x="26"
        y="14"
        width="108"
        height="62"
        rx="8"
        className="fill-card stroke-primary/40"
        strokeWidth="1.5"
      />
      <circle cx="44" cy="30" r="7" className="fill-primary/30" />
      <rect
        x="58"
        y="26"
        width="38"
        height="5"
        rx="2.5"
        className="fill-primary/28"
      />
      <rect
        x="58"
        y="35"
        width="22"
        height="4"
        rx="2"
        className="fill-primary/15"
      />
      <rect
        x="36"
        y="48"
        width="88"
        height="7"
        rx="3.5"
        className="fill-primary/12"
      />
      <rect
        x="36"
        y="60"
        width="88"
        height="9"
        rx="4.5"
        className="fill-primary"
      />
      <path
        d="M45 63c1.6 3.4 2.6 4.4 6 5.4"
        className="stroke-background"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="58"
        y="63"
        width="52"
        height="3"
        rx="1.5"
        className="fill-background/70"
      />
    </>
  ),

  // Speech, and the fork: routine handled, the rest passed on.
  "AI voice assistant": (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={16 + i * 10}
          y={45 - [10, 18, 8, 22, 12, 16][i] / 2}
          width="5"
          height={[10, 18, 8, 22, 12, 16][i]}
          rx="2.5"
          className="fill-primary/55"
        />
      ))}
      <path
        d="M82 45 C100 45 100 26 116 26"
        className="stroke-primary"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M82 45 C100 45 100 64 116 64"
        className="stroke-primary/35"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 4"
      />
      <circle cx="128" cy="26" r="9" className="fill-primary" />
      <rect
        x="118"
        y="56"
        width="26"
        height="16"
        rx="5"
        className="fill-card stroke-primary/40"
        strokeWidth="1.5"
      />
    </>
  ),

  // Trunks and carriers arriving separately, leaving as one architecture.
  "SIP and carrier connectivity": (
    <>
      {[22, 45, 68].map((y) => (
        <rect
          key={y}
          x="12"
          y={y - 8}
          width="30"
          height="16"
          rx="5"
          className="fill-card stroke-primary/40"
          strokeWidth="1.5"
        />
      ))}
      <path
        d="M42 22 C64 22 64 45 84 45"
        className="stroke-primary/60"
        strokeWidth="1.75"
        fill="none"
      />
      <path
        d="M42 45 H84"
        className="stroke-primary/60"
        strokeWidth="1.75"
        fill="none"
      />
      <path
        d="M42 68 C64 68 64 45 84 45"
        className="stroke-primary/60"
        strokeWidth="1.75"
        fill="none"
      />
      <rect
        x="84"
        y="31"
        width="60"
        height="28"
        rx="8"
        className="fill-primary"
      />
      <rect
        x="96"
        y="42"
        width="36"
        height="6"
        rx="3"
        className="fill-background/70"
      />
    </>
  ),

  // A caller met by a decision, then sent to the queue that fits.
  "Advanced routing and queues": (
    <>
      <circle cx="18" cy="45" r="6" className="fill-primary" />
      <path d="M24 45 H56" className="stroke-primary/60" strokeWidth="1.75" />
      <rect
        x="56"
        y="31"
        width="28"
        height="28"
        rx="6"
        className="fill-card stroke-primary"
        strokeWidth="1.75"
        transform="rotate(45 70 45)"
      />
      <path
        d="M90 45 C104 45 104 22 118 22"
        className="stroke-primary/55"
        strokeWidth="1.75"
        fill="none"
      />
      <path d="M90 45 H118" className="stroke-primary/55" strokeWidth="1.75" />
      <path
        d="M90 45 C104 45 104 68 118 68"
        className="stroke-primary/55"
        strokeWidth="1.75"
        fill="none"
      />
      {[22, 45, 68].map((y) => (
        <rect
          key={y}
          x="118"
          y={y - 7}
          width="28"
          height="14"
          rx="5"
          className="fill-card stroke-primary/40"
          strokeWidth="1.5"
        />
      ))}
    </>
  ),

  // Several places, one set of controls above them.
  "Multi-site management": (
    <>
      <rect
        x="40"
        y="12"
        width="80"
        height="16"
        rx="6"
        className="fill-primary"
      />
      <rect
        x="54"
        y="18"
        width="52"
        height="4"
        rx="2"
        className="fill-background/70"
      />
      {[26, 80, 134].map((x) => (
        <path
          key={x}
          d={`M80 28 C80 42 ${x + 12} 42 ${x + 12} 54`}
          className="stroke-primary/45"
          strokeWidth="1.5"
          fill="none"
        />
      ))}
      {[26, 80, 134].map((x) => (
        <rect
          key={x}
          x={x}
          y="54"
          width="24"
          height="24"
          rx="6"
          className="fill-card stroke-primary/40"
          strokeWidth="1.5"
        />
      ))}
    </>
  ),

  // Volume by hour, and the trend a staffing decision is read off.
  "Reporting and analytics": (
    <>
      {[26, 18, 34, 24, 42, 30, 46].map((h, i) => (
        <rect
          key={i}
          x={20 + i * 18}
          y={72 - h}
          width="10"
          height={h}
          rx="3"
          className={i === 6 ? "fill-primary" : "fill-primary/28"}
        />
      ))}
      <path
        d="M25 50 L43 56 L61 44 L79 52 L97 36 L115 46 L133 30"
        className="stroke-primary"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 74 H150" className="stroke-primary/25" strokeWidth="1.5" />
    </>
  ),

  // The record already open when the call is answered.
  "CRM and business integrations": (
    <>
      <rect
        x="14"
        y="18"
        width="86"
        height="54"
        rx="7"
        className="fill-card stroke-primary/30"
        strokeWidth="1.5"
      />
      <rect
        x="26"
        y="30"
        width="44"
        height="4"
        rx="2"
        className="fill-primary/18"
      />
      <rect
        x="26"
        y="40"
        width="58"
        height="4"
        rx="2"
        className="fill-primary/12"
      />
      <rect
        x="26"
        y="50"
        width="36"
        height="4"
        rx="2"
        className="fill-primary/12"
      />
      <rect
        x="62"
        y="30"
        width="84"
        height="48"
        rx="8"
        className="fill-card stroke-primary"
        strokeWidth="1.75"
      />
      <circle cx="80" cy="48" r="8" className="fill-primary/30" />
      <rect
        x="94"
        y="43"
        width="38"
        height="5"
        rx="2.5"
        className="fill-primary/30"
      />
      <rect
        x="94"
        y="53"
        width="24"
        height="4"
        rx="2"
        className="fill-primary/18"
      />
      <rect
        x="76"
        y="64"
        width="56"
        height="7"
        rx="3.5"
        className="fill-primary"
      />
    </>
  ),
};

/**
 * What is included, as cards.
 *
 * Built to the reference the client supplied: a centred heading and
 * standfirst, then soft rounded cards each carrying a tinted plate, a title
 * and a line of body copy.
 *
 * Two departures from that reference, both deliberate. Its pink page wash is
 * gone, because a saturated brand ground is a standing no on this site — the
 * colour lives in the plates instead, which is where most of it sits in the
 * reference anyway. And its headline is not re-created two-tone: colouring
 * half a heading in the accent is the single commonest tell of a generated
 * page, and the brief asked for the title centred, not recoloured.
 *
 * Shared by the Enterprise and Mid-Market pages, which is why the standfirst
 * is a prop: the cards are the same object on both, but six capabilities that
 * make up a layer and four that a growing organisation grows into are not the
 * same claim. Small Business keeps its own treatment.
 *
 * The column count follows the count. Six go three across, because two would
 * make each card wide enough that its plate became a large empty field; four
 * go two across for the same reason in reverse.
 */
export function IncludedCards({
  capabilities,
  standfirst,
}: {
  capabilities: SolutionDetail["capabilities"];
  standfirst: string;
}) {
  const wide = capabilities.length <= 4;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          What&rsquo;s included
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">{standfirst}</p>
      </div>

      <ul
        className={cn(
          "mt-12 grid gap-5 sm:grid-cols-2",
          wide ? "mx-auto max-w-4xl" : "lg:grid-cols-3",
        )}
      >
        {capabilities.map(({ title, description, icon: Icon }) => {
          const plate = PLATES[title];

          return (
            <li
              key={title}
              className="flex flex-col rounded-3xl border border-border bg-card p-3 shadow-sm"
            >
              {/* The plate. A tint with the schematic sitting in it, at a
                  fixed ratio so all six line up whatever the copy does. */}
              <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent via-accent/60 to-accent/25">
                {plate ? (
                  <svg
                    viewBox="0 0 160 90"
                    className="h-full w-full"
                    aria-hidden
                    fill="none"
                  >
                    {plate}
                  </svg>
                ) : (
                  <Icon className="size-9 text-primary" aria-hidden />
                )}
              </div>

              <div className="px-2 pt-5 pb-2">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-balance">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
