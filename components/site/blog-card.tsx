"use client";

import type { CSSProperties, PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Cable,
  Clock,
  Cloud,
  Headset,
  MessagesSquare,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatPostDate, type BlogCategory, type BlogPostSummary } from "@/lib/blog";
import { cn } from "@/lib/utils";

export const CATEGORY_ICONS: Record<BlogCategory, LucideIcon> = {
  VoIP: PhoneCall,
  "SIP Trunking": Cable,
  "Cloud PBX": Cloud,
  "Business Communication": MessagesSquare,
  "Call Center Solutions": Headset,
  Cybersecurity: ShieldCheck,
  "Industry Insights": TrendingUp,
};

/** The category, in the one form it takes on every card. */
export function CategoryBadge({ category, className }: { category: BlogCategory | null; className?: string }) {
  if (!category) return null;
  const Icon = CATEGORY_ICONS[category];
  return (
    <Badge variant="secondary" className={cn("gap-1 rounded-md bg-accent font-medium text-accent-foreground", className)}>
      <Icon aria-hidden />
      {category}
    </Badge>
  );
}

/** Signal bars for the length of a read: quick, medium or long. */
export function ReadingSignal({ minutes, className }: { minutes: number; className?: string }) {
  const lit = minutes <= 3 ? 1 : minutes <= 7 ? 2 : 3;
  return (
    <span aria-hidden className={cn("flex h-3 items-end gap-0.5", className)}>
      {[0.45, 0.72, 1].map((height, i) => (
        <span
          key={height}
          className={cn("w-1 rounded-full bg-current", i >= lit && "opacity-25")}
          style={{ height: `${height * 100}%` }}
        />
      ))}
    </span>
  );
}

/** "3 November 2026 · 2 min read". */
export function PostMeta({ post, className }: { post: BlogPostSummary; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground", className)}>
      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-3" aria-hidden />
        {post.minutes} min read
        <ReadingSignal minutes={post.minutes} className="text-primary" />
      </span>
    </p>
  );
}

/** A soft light that follows the pointer across a card. */
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
}

/**
 * A post in a grid; the whole card is the link. It sits on the pricing cards'
 * glowing border, and on hover it lifts, the image zooms under a passing sweep
 * of light, and a light follows the pointer. `index` staggers the border lights
 * so neighbours never run in step. `compact` is the plain side-by-side form for
 * the article sidebar.
 */
export function BlogCard({
  post,
  index = 0,
  compact = false,
  headingLevel: Heading = "h3",
}: {
  post: BlogPostSummary;
  index?: number;
  compact?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  if (compact) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group/post flex overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 outline-none hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="relative w-24 shrink-0 overflow-hidden bg-accent">
          <Image
            src={post.cover.url}
            alt=""
            fill
            sizes="96px"
            className="object-cover transition-transform duration-700 ease-out group-hover/post:scale-110"
          />
        </span>
        <span className="min-w-0 p-3">
          <span className="line-clamp-2 text-sm font-semibold tracking-tight transition-colors group-hover/post:text-primary">
            {post.title}
          </span>
          <span className="mt-1 block text-xs text-muted-foreground">{post.minutes} min read</span>
        </span>
      </Link>
    );
  }

  const Icon = post.category && CATEGORY_ICONS[post.category];

  return (
    <div
      className="group/tier relative h-full transition-transform duration-500 ease-out hover:-translate-y-1.5"
      style={{ "--glow-delay": `${-index * 2.5}s` } as CSSProperties}
    >
      <span
        aria-hidden
        className="pricing-glow-border pointer-events-none absolute -inset-1 -z-10 rounded-[1.7rem] opacity-25 blur-lg transition-opacity duration-500 group-hover/tier:opacity-90"
      />
      <div className="pricing-glow-border pricing-elevate h-full rounded-[1.6rem] p-px">
        <Link
          href={`/blog/${post.slug}`}
          onPointerMove={trackSpotlight}
          className="group/post relative flex h-full flex-col overflow-hidden rounded-[1.55rem] bg-card outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {/* The light that follows the pointer. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/post:opacity-100"
            style={{
              background:
                "radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
            }}
          />

          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-accent">
            <Image
              src={post.cover.url}
              alt={post.cover.alt}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover/post:scale-110"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
            {/* A sweep of light across the image. */}
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-card/45 to-transparent transition-transform duration-1000 ease-out group-hover/post:translate-x-[400%]"
            />
            {Icon ? (
              <Badge className="absolute top-3 left-3 gap-1 rounded-full border border-card/60 bg-card/85 font-medium text-foreground shadow-sm backdrop-blur-md">
                <Icon className="text-primary" aria-hidden />
                {post.category}
              </Badge>
            ) : null}
            <span
              aria-hidden
              className="absolute top-3 right-3 grid size-9 scale-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 transition-transform duration-300 ease-out group-hover/post:scale-100 group-hover/post:rotate-12"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-5">
            <Heading className="line-clamp-2 text-lg font-semibold tracking-tight text-balance transition-colors duration-300 group-hover/post:text-primary">
              {post.title}
            </Heading>
            <p className="mt-2 line-clamp-2 text-sm text-pretty text-muted-foreground">{post.excerpt}</p>
            <div className="mt-auto pt-5">
              <PostMeta post={post} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
