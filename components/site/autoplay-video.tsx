"use client";

import { useRef, useState } from "react";
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
 * The iframe only mounts once the video is scrolled to; until then, and
 * while it loads, the thumbnail stands in.
 */
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

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    // `loop` only repeats a single video when it is also its own playlist.
    playlist: id,
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
    player.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "mute" : "unMute", args: [] }),
      "*",
    );
    setMuted(next);
  };

  return (
    <div
      ref={box}
      className={cn("relative aspect-video overflow-hidden rounded-xl bg-foreground/5", className)}
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt=""
        fill
        unoptimized
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
      />

      {seen ? (
        <iframe
          ref={player}
          src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          className="pointer-events-none absolute top-1/2 left-1/2 aspect-video w-[118%] -translate-x-1/2 -translate-y-1/2"
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
