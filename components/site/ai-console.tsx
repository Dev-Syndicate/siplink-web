"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { aiDemo, aiStages } from "@/lib/site";
import { cn } from "@/lib/utils";

/** How long a stage holds before the console moves on. */
const DWELL = 7000;

/**
 * The AI lettermark.
 *
 * A lettermark rather than the usual sparkle: the brief is that AI should be
 * named, not hinted at, and two letters on the brand gradient say it plainly
 * where a wand or a star asks the reader to infer it. It also survives being
 * shrunk into the console's header row, which an icon at this size does not.
 *
 * The sheen is the section's AI signature — the same moving highlight appears
 * on every marker that stands for the AI and nowhere else on the site.
 */
function AiMark({ live = false }: { live?: boolean }) {
  return (
    // The wrapper does not clip, so the dashed copy can rise clear of the
    // chip. The sheen is clipped by the chip itself, one level in.
    <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
      {live ? (
        <span
          aria-hidden
          className="ghost-lift pointer-events-none absolute inset-0 rounded-md border border-dashed border-current"
        />
      ) : null}

      <span className="relative inline-flex size-6 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-brand-from to-brand-to">
        <span className="font-mono text-[10px] leading-none font-semibold tracking-tight text-primary-foreground">
          AI
        </span>
        <span aria-hidden className="ai-sheen absolute inset-0" />
      </span>
    </span>
  );
}

/** Per-word stagger for the streaming transcript. */
const WORD_STEP = 52;

/** How long a dashed placeholder holds before it dissolves. */
const GHOST_SPAN = 900;

/**
 * When the words start, measured from the placeholder's own start.
 *
 * Deliberately shorter than `GHOST_SPAN`: the placeholder is still fading as
 * the first words arrive, so the two overlap and the line never blinks empty
 * between them. Raising this past `GHOST_SPAN` puts a visible gap in.
 */
const GHOST_HANDOVER = 620;

/** How far apart the two transcript lines begin. */
const LINE_STEP = 1050;

/**
 * The AI layer, demonstrating itself.
 *
 * The section makes its case by running a call through the thing it is
 * describing rather than by listing features on a coloured panel. The rail on
 * the left is the real content — three stages, their capabilities, and which
 * of those depend on your plan. The console on the right draws what each
 * stage does to a call, and claims nothing: it is aria-hidden, and every word
 * in it is wireframe filler from `aiDemo`.
 *
 * The three stages are a genuine sequence — sound becomes text, text becomes
 * meaning, meaning becomes an answer — which is why the rail reads downward
 * with a rule beside it and nothing is numbered.
 *
 * The console advances by itself, on the same contract as the sector stage,
 * because WCAG 2.2.2 wants a way to stop anything that moves on its own:
 *
 * - It pauses while the pointer is over the section or focus is inside it.
 * - Choosing a stage stops it for the session. Having picked, you should not
 *   be carried somewhere else a moment later.
 * - Under `prefers-reduced-motion` it neither advances nor streams.
 */
export function AiConsole() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [seen, setSeen] = useState(false);
  // Bumped whenever the section comes back into view, and keyed into the
  // console so the entrance animations run again rather than staying finished.
  const [run, setRun] = useState(0);
  const section = useRef<HTMLElement | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // Mirrors `stopped` so the observer can read it without being torn down and
  // re-subscribed every time a visitor picks a stage.
  const chosen = useRef(false);

  const go = useCallback((next: number) => {
    setActive((next + aiStages.length) % aiStages.length);
  }, []);

  const choose = useCallback(
    (next: number) => {
      chosen.current = true;
      setStopped(true);
      go(next);
    },
    [go],
  );

  /**
   * The console starts when it is looked at, not when it is built.
   *
   * This section sits well below the fold. Firing on mount meant the whole
   * demonstration played out — transcript, summary, reply — while the visitor
   * was still reading the hero, and by the time they scrolled down there was
   * nothing left to see but finished text. Unlike the typed quote, this one
   * keeps observing after the first hit: leaving and coming back replays it,
   * which is the point of a demonstration.
   */
  useEffect(() => {
    const node = section.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSeen(entry.isIntersecting);

        // Arriving restarts the story from the first stage, so it is always
        // read in order. A visitor who has picked a stage keeps their choice.
        if (entry.isIntersecting && !chosen.current) {
          setActive(0);
          setRun((n) => n + 1);
        }
      },
      // `threshold: 0` rather than a fraction: the threshold is a share of
      // this section, and the section is taller than a short viewport, so any
      // fraction risks a ratio that can never be met and a demo that never
      // starts. The negative bottom margin is what holds it back until the
      // section is properly on screen instead of one pixel in.
      { rootMargin: "0px 0px -15% 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (stopped || held || !seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => go(active + 1), DWELL);
    return () => window.clearTimeout(timer);
  }, [active, held, stopped, seen, go]);

  const onRailKey = (event: React.KeyboardEvent) => {
    const step =
      event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + aiStages.length) % aiStages.length;
    choose(next);
    tabs.current[next]?.focus();
  };

  const running = seen && !stopped && !held;

  return (
    <section
      ref={section}
      className="border-b border-border"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <AiMark />
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              AI &amp; intelligent communication
            </span>
          </div>

          {/* AI is named outright rather than implied. The previous version
              of this heading argued the benefit and left the word out, which
              buried the thing the section exists to sell. */}
          <h2 className="font-heading mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            AI on every call, from hello to follow-up
          </h2>

          <p className="mt-4 text-pretty text-muted-foreground">
            AI turns speech into text, text into a summary, and — where you
            enable it — answers the call itself. Nobody has to replay a
            recording to find out what was agreed.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-start lg:gap-14">
          {/* The rail. Each stage is a control; the chosen one opens to show
              what it covers, so five items under "Answers" never have to line
              up against three under "Listens". */}
          <div role="tablist" aria-label="AI stages" onKeyDown={onRailKey}>
            {aiStages.map(({ stage, gloss, items }, index) => {
              const current = index === active;

              return (
                <div key={stage} className="relative pl-6">
                  {/* The rule is the call's path down the rail. The chosen
                      segment fills as its dwell runs, so the next move is
                      something you can see coming. */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-px bg-border"
                  />
                  {current ? (
                    <span
                      aria-hidden
                      key={active}
                      style={
                        { "--dwell-duration": `${DWELL}ms` } as React.CSSProperties
                      }
                      className={cn(
                        "absolute inset-y-0 left-0 w-px origin-top bg-primary",
                        running ? "dwell-bar-y" : "",
                      )}
                    />
                  ) : null}

                  <button
                    id={`ai-tab-${index}`}
                    ref={(node) => {
                      tabs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={current}
                    aria-controls={`ai-panel-${index}`}
                    tabIndex={current ? 0 : -1}
                    onClick={() => choose(index)}
                    className={cn(
                      "block w-full py-4 text-left transition-colors focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      current
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="font-heading text-xl font-semibold tracking-tight">
                      {stage}
                    </span>
                  </button>

                  <div
                    id={`ai-panel-${index}`}
                    role="tabpanel"
                    aria-labelledby={`ai-tab-${index}`}
                    hidden={!current}
                    className="pb-6"
                  >
                    <p className="max-w-xs text-sm leading-relaxed text-pretty text-muted-foreground">
                      {gloss}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {items.map(({ label, conditional }) => (
                        <li
                          key={label}
                          className="flex items-start gap-3 text-sm"
                        >
                          {/* Filled is included, hollow depends on your plan
                              or setup. The shape is the only thing carrying
                              that, so it is spelled out under the console and
                              again here for anyone not seeing it. */}
                          {/* Gradient rather than flat: every item in this
                              list is an AI capability, and the gradient is
                              what marks AI across the section. */}
                          <span
                            aria-hidden
                            className={cn(
                              "mt-[0.4rem] size-1.5 shrink-0 rounded-full",
                              conditional
                                ? "border border-muted-foreground"
                                : "bg-gradient-to-br from-brand-from to-brand-to",
                            )}
                          />
                          <span>
                            {label}
                            {conditional ? (
                              <span className="sr-only"> (where enabled)</span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* The console. Everything in it draws something the rail already
              says in words, so none of it is exposed to assistive tech. */}
          <div
            aria-hidden
            className="overflow-hidden rounded-2xl bg-foreground text-background shadow-xl"
          >
            <div className="flex items-center gap-2.5 border-b border-background/15 px-5 py-3.5">
              <AiMark live={running} />

              <span className="text-xs font-medium">
                {active === 2 ? "AI answering" : "AI transcribing"}
              </span>

              <span className="relative flex size-1.5">
                <span className="absolute inset-0 rounded-full bg-primary" />
                {running ? (
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary" />
                ) : null}
              </span>

              <span className="ml-auto font-mono text-[11px] text-background/60">
                {active === 2 ? "0:14" : "0:09"}
              </span>
            </div>

            {/* Keyed on the stage so the panel re-enters on every change
                rather than the text swapping underneath itself. */}
            <div
              key={`${active}-${run}`}
              // Sized to the last stage, which is now the fullest one, so the
              // panel never resizes as the story builds. Before the content
              // accumulated this was set for the tallest stage while two
              // others held one line, leaving most of the panel empty.
              className="panel-enter min-h-[17rem] px-5 py-5 sm:min-h-[18rem]"
            >
              <Stage index={active} />
            </div>

            {/* The line being heard, along the base. Still once the console
                stops, because a waveform on a paused call is a lie. */}
            <div className="flex h-12 items-end gap-[3px] border-t border-background/15 px-5 pb-4">
              {WAVE.map((height, index) => (
                <span
                  key={index}
                  style={
                    {
                      height: `${height}%`,
                      "--bar-delay": `${index * 0.045}s`,
                    } as React.CSSProperties
                  }
                  className={cn(
                    "w-[3px] shrink-0 rounded-full",
                    active === 2 ? "bg-primary" : "bg-background/45",
                    running && "wave-bar",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-3 text-sm text-muted-foreground">
            <span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full border border-muted-foreground"
            />
            Depends on your plan and how your system is set up.
          </p>

          {/* Named for the product, not the section: only the answering half
              of this has a page of its own, so "Explore AI" would promise the
              transcription and summary material lives there too. */}
          <Link
            href="/products/ai-voice-assistant"
            className="group relative text-sm font-medium text-primary focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            See the AI Voice Assistant
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Bar heights for the waveform, as a percentage of the strip.
 *
 * Written out rather than generated: a random set re-rolls on every render
 * and a sine wave reads as a graphic rather than as speech. Forty at 3px with
 * 3px between comes to about 237px, which fits the console at its narrowest
 * without the row needing to flex — letting the bars stretch is what turns
 * `rounded-full` into a line of lozenges.
 */
const WAVE = [
  22, 38, 64, 30, 82, 46, 28, 58, 90, 34, 50, 72, 24, 62, 42, 80, 30, 54, 36,
  68, 86, 26, 46, 60, 32, 76, 40, 52, 88, 28, 64, 44, 20, 70, 36, 58, 78, 30,
  48, 66,
];

/**
 * What the console holds at each stage.
 *
 * Content accumulates rather than swapping out. By the last stage the console
 * holds the whole record of the call: what was said, what the AI made of it,
 * and what it said back. Two reasons that matters — replacing the transcript
 * left the reply with nothing to be a reply *to*, and it left two of the three
 * stages holding a single line of text in a panel sized for the fullest one,
 * which read as a broken empty box rather than as a console.
 *
 * Earlier stages dim as later ones arrive, so the newest thing is always the
 * brightest without anything leaving the screen.
 */
function Stage({ index }: { index: number }) {
  const understood = index >= 1;
  const answered = index === 2;

  return (
    <div className="space-y-4">
      <Transcript dim={understood} />
      {understood ? <Notes dim={answered} /> : null}
      {answered ? <Reply /> : null}
    </div>
  );
}

/**
 * A line of the console: a timestamp gutter, and a dashed placeholder that
 * holds the space until the words it stands for arrive in it.
 *
 * The wrapper hugs its content so the placeholder is the shape of the thing
 * it replaces, which is the whole idea it is borrowed from.
 */
function Line({
  at,
  words,
  begins,
  accent = false,
  children,
}: {
  at: string;
  words?: string[];
  begins: number;
  accent?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span
        className={cn(
          "mt-0.5 shrink-0 font-mono text-[11px]",
          accent ? "text-primary" : "text-background/50",
        )}
      >
        {at}
      </span>

      <div className="relative w-fit max-w-full min-w-0">
        <span
          aria-hidden
          style={
            {
              "--ghost-delay": `${begins}ms`,
              "--ghost-span": `${GHOST_SPAN}ms`,
            } as React.CSSProperties
          }
          className={cn(
            "ghost-line pointer-events-none absolute inset-x-0 top-0.5 h-4 rounded-sm border border-dashed sm:h-5",
            accent ? "border-primary/60" : "border-background/30",
          )}
        />

        <p className="text-sm leading-relaxed text-pretty sm:text-base">
          {words?.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="word-in"
              style={
                {
                  "--word-delay": `${begins + GHOST_HANDOVER + index * WORD_STEP}ms`,
                } as React.CSSProperties
              }
            >
              {word}{" "}
            </span>
          ))}
          {children}
        </p>
      </div>
    </div>
  );
}

/** The caller's side, arriving a word at a time. */
function Transcript({ dim }: { dim: boolean }) {
  return (
    <div
      className={cn(
        "space-y-4 transition-opacity duration-500",
        dim && "opacity-40",
      )}
    >
      {aiDemo.transcript.map(({ at, text }, line) => (
        <Line
          key={at}
          at={at}
          words={text.split(" ")}
          begins={line * LINE_STEP}
        />
      ))}
    </div>
  );
}

/** What the understanding stage drew out of the lines above. */
function Notes({ dim }: { dim: boolean }) {
  return (
    <div
      className={cn(
        "space-y-3 pt-1 transition-opacity duration-500",
        dim && "opacity-40",
      )}
    >
      {/* Attributed, so it is clear the summary is the AI's own output and not
          something the caller said. */}
      <div
        style={{ "--note-delay": "120ms" } as React.CSSProperties}
        className="note-attach flex items-center gap-2.5"
      >
        <AiMark live={!dim} />
        <span className="text-xs font-medium">AI wrote this</span>
      </div>

      {aiDemo.notes.map(({ label, text }, index) => {
        const begins = 320 + index * 420;

        return (
          <div key={label} className="flex gap-4">
            {/* The rule is the connector back to the lines above. */}
            <span className="mt-2 h-px w-8 shrink-0 bg-gradient-to-r from-brand-from to-brand-to" />

            <div className="relative w-fit max-w-full min-w-0">
              <span
                aria-hidden
                style={
                  {
                    "--ghost-delay": `${begins}ms`,
                    "--ghost-span": `${GHOST_SPAN}ms`,
                  } as React.CSSProperties
                }
                className="ghost-line pointer-events-none absolute inset-x-0 top-0.5 h-4 rounded-sm border border-dashed border-background/30"
              />

              <p
                style={
                  {
                    "--note-delay": `${begins + GHOST_HANDOVER}ms`,
                  } as React.CSSProperties
                }
                className="note-attach text-sm leading-relaxed text-pretty"
              >
                <span className="text-background/60">{label}</span>{" "}
                <span className="block sm:inline">{text}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** The assistant speaking back, under everything it is answering. */
function Reply() {
  const words = aiDemo.reply.split(" ");

  return (
    <div className="space-y-3 pt-1">
      <div
        style={{ "--note-delay": "120ms" } as React.CSSProperties}
        className="note-attach flex items-center gap-2.5"
      >
        <AiMark live />
        <span className="text-xs font-medium">AI said this</span>
      </div>

      {/* The placeholder here is crimson rather than white: the words being
          filled in are the AI's, not the caller's. */}
      <Line at="0:11" words={words} begins={320} accent>
        <span
          className="type-caret ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-primary"
          style={
            {
              animationDelay: `${320 + GHOST_HANDOVER + words.length * WORD_STEP}ms`,
            } as React.CSSProperties
          }
        />
      </Line>
    </div>
  );
}
