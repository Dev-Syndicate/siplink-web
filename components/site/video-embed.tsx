"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import { explainerVideo } from "@/lib/site";

/**
 * Click-to-load YouTube facade. The iframe (and YouTube's cookies and
 * tracking) only load once the viewer chooses to play, so the page stays
 * fast and sets nothing until then.
 */
export function VideoEmbed() {
  const [playing, setPlaying] = useState(false);
  const { id, title } = explainerVideo;

  if (playing) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl bg-foreground/5">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="size-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-border"
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        fill
        unoptimized
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-foreground/20 transition-colors group-hover:bg-foreground/30" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
          <Play className="ml-0.5 size-7 fill-current" aria-hidden />
        </span>
      </span>
      <span className="sr-only">Play video: {title}</span>
    </button>
  );
}
