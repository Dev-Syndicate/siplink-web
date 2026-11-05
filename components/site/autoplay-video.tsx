"use client";

import { useEffect, useRef, useState } from "react";
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
 * ignores the pointer, so YouTube's hover overlays never appear.
 *
 * Looping is done by hand, via the IFrame API's `onStateChange`, rather than
 * YouTube's own `loop`/`playlist` params — those put the embed into playlist
 * mode, which brings back a previous/next control even with `controls=0`.
 *
 * The iframe only mounts once the video is scrolled to.
 */

/** YouTube's `playerState` value for "finished playing". */
const ENDED = 0;

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
  const { id, title } = video;

  useEffect(() => {
    if (!seen) return;

    const onMessage = (event: MessageEvent) => {
      if (event.source !== player.current?.contentWindow) return;
      let info: { playerState?: number } | undefined;
      try {
        info = JSON.parse(event.data)?.info;
      } catch {
        return;
      }
      if (info?.playerState !== ENDED) return;

      post(player.current, { event: "command", func: "seekTo", args: [0, true] });
      post(player.current, { event: "command", func: "playVideo", args: [] });
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
          className="pointer-events-none absolute inset-0 size-full"
        />
      ) : null}

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
