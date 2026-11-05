"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

/**
 * A YouTube video playing as a silent, looping background film: no player
 * chrome, no title bar, no related videos, and one small button in the
 * corner to turn the sound on.
 *
 * Browsers only autoplay muted video, so it always starts muted; the button
 * talks to the player over YouTube's IFrame API (`enablejsapi`). The player
 * ignores the pointer, so YouTube's hover overlays never appear, and it is
 * drawn slightly larger than its box so the edges YouTube can still flash a
 * title into stay out of view.
 *
 * YouTube picks the stream quality from the player's size on screen and no
 * longer honours a requested quality, so the player is laid out at a full
 * 1920 × 1080 and scaled down to fit. Laid out that size, it streams 1080p.
 *
 * YouTube still draws its channel name and its play controls over the
 * first seconds of playback, and over any pause or buffer, whatever the
 * embed parameters say. So the thumbnail stays on top until the film has
 * been playing for a few seconds, and comes back whenever the player
 * reports it is not playing. It loops by seeking back to the start, and
 * the restart brings the chrome back too, so the cover returns for the
 * same few seconds on every loop.
 *
 * The iframe only mounts once the video is scrolled to; until then the
 * thumbnail stands in.
 */

/** How long YouTube keeps its title and controls up once playback starts. */
const CHROME_SECONDS = 4;

/** The size the player is laid out at, so YouTube streams 1080p. */
const PLAYER_WIDTH = 1920;
const PLAYER_HEIGHT = 1080;

/** How much larger than its box the player is drawn, to crop YouTube's edges. */
const OVERSCAN = 1.18;

/** YouTube's `playerState` values that this component acts on. */
const ENDED = 0;
const PLAYING = 1;

/** Sends one IFrame API message to the player in `frame`. */
function post(frame: HTMLIFrameElement | null, message: Record<string, unknown>) {
  frame?.contentWindow?.postMessage(JSON.stringify(message), "*");
}

export function AutoplayVideo({
  video,
  className,
}: {
  video: { id: string; title: string };
  className?: string;
}) {
  const [box, seen] = useInView<HTMLDivElement>();
  const player = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);
  // Shown only once the opening chrome has cleared, and only while playing.
  const [clear, setClear] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Armed once a time inside the opening seconds is seen, so the final
  // timestamp reported alongside "ended" cannot clear the next loop early.
  const armed = useRef(false);
  // The scale that fits the 1080p player to its box, with the overscan.
  const [scale, setScale] = useState(0);
  const { id, title } = video;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    // The observer reports once as soon as it starts, which sets the first scale.
    const observer = new ResizeObserver(() =>
      setScale((el.clientWidth / PLAYER_WIDTH) * OVERSCAN),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [box]);

  useEffect(() => {
    if (!seen) return;

    const onMessage = (event: MessageEvent) => {
      if (event.source !== player.current?.contentWindow) return;
      let info: { playerState?: number; currentTime?: number } | undefined;
      try {
        info = JSON.parse(event.data)?.info;
      } catch {
        return;
      }
      if (!info) return;

      if (info.playerState !== undefined) {
        setPlaying(info.playerState === PLAYING);
        if (info.playerState === ENDED) {
          armed.current = false;
          setClear(false);
          post(player.current, { event: "command", func: "seekTo", args: [0, true] });
          post(player.current, { event: "command", func: "playVideo", args: [] });
        }
      }
      if (info.currentTime !== undefined) {
        if (info.currentTime < CHROME_SECONDS) armed.current = true;
        else if (armed.current) setClear(true);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [seen]);

  // Ask the player to start reporting its state; it only does so once told.
  const listen = () => post(player.current, { event: "listening", id });

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    disablekb: "1",
    fs: "0",
    rel: "0",
    iv_load_policy: "3",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
    // Long deprecated, but harmless, and some players still read it.
    vq: "hd1080",
  });

  const toggleSound = () => {
    const next = !muted;
    post(player.current, { event: "command", func: next ? "mute" : "unMute", args: [] });
    setMuted(next);
  };

  return (
    <div
      ref={box}
      className={cn("relative aspect-video overflow-hidden rounded-xl bg-foreground/5", className)}
    >
      {seen ? (
        <iframe
          ref={player}
          src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          onLoad={listen}
          width={PLAYER_WIDTH}
          height={PLAYER_HEIGHT}
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
          className="pointer-events-none absolute top-1/2 left-1/2 max-w-none origin-center"
        />
      ) : null}

      {/* The cover: over the player until it is clear of YouTube's chrome. */}
      <Image
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt=""
        fill
        unoptimized
        sizes="(min-width: 1024px) 60vw, 100vw"
        className={cn(
          "pointer-events-none object-cover transition-opacity duration-700",
          clear && playing ? "opacity-0" : "opacity-100",
        )}
      />

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? "Turn sound on" : "Mute video"}
        className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-foreground/55 text-background backdrop-blur-sm transition-all duration-300 outline-none hover:scale-105 hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:right-4 sm:bottom-4 sm:size-10"
      >
        {muted ? <VolumeX className="size-4" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
