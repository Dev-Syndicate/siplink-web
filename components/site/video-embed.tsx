"use client";

import { useEffect, useRef } from "react";

import { explainerVideo } from "@/lib/site";

/**
 * The homepage film, self-hosted. It plays on its own — muted, looping and
 * without controls — once it scrolls into view, and pauses when it leaves,
 * so nothing is downloaded or decoded until a visitor gets here. Browsers
 * only allow autoplay when the video is muted.
 */
export function VideoEmbed() {
  const ref = useRef<HTMLVideoElement>(null);
  const { src, poster, title } = explainerVideo;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="aspect-video overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-border">
      <video
        ref={ref}
        src={src}
        poster={poster}
        title={title}
        aria-label={title}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        controlsList="nodownload noremoteplayback"
        className="size-full object-cover"
      />
    </div>
  );
}
