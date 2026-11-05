"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";

import { CategoryBadge, PostMeta } from "@/components/site/blog-card";
import { PricingAtmosphere } from "@/components/site/pricing-atmosphere";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { formatPostDate, type BlogPostSummary } from "@/lib/blog";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = { hidden: { opacity: 0, y: 22 }, shown: { opacity: 1, y: 0 } };

/** How long each article stays at the front of the deck. */
const HOLD_MS = 4000;

/** Where a card sits in the deck: at the front, then fanned behind it. */
const SEATS = [
  { x: "0%", y: 0, rotate: -2, scale: 1, opacity: 1, zIndex: 3 },
  { x: "13%", y: -22, rotate: 6, scale: 0.92, opacity: 0.85, zIndex: 2 },
  { x: "-13%", y: -12, rotate: -9, scale: 0.88, opacity: 0.65, zIndex: 1 },
];

/**
 * The top of the blog: the masthead on the left over the pricing page's moving
 * rings and lights, and on the right a deck of the newest articles that turns
 * over by itself. Everything shown is real: the deck and the date come from
 * the posts. Motion stops under reduced motion.
 */
export function BlogHero({ posts }: { posts: BlogPostSummary[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative isolate overflow-hidden">
        <PricingAtmosphere />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pt-12 pb-20 sm:px-8 sm:pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:px-10 lg:pt-16 lg:pb-24">
          <motion.div
            initial="hidden"
            animate="shown"
            transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
            className="text-center lg:text-left"
          >
            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 py-1 pr-3.5 pl-1.5 text-xs font-medium text-foreground/80 shadow-sm shadow-primary/10 backdrop-blur-md"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-to to-brand-from px-2 py-0.5 font-mono text-[10px] tracking-widest text-primary-foreground uppercase">
                <span className="relative flex size-1.5">
                  <span className="pricing-ping absolute inset-0 rounded-full bg-primary-foreground" />
                  <span className="relative size-1.5 rounded-full bg-primary-foreground" />
                </span>
                Blog
              </span>
              Guides from the SipLink team
            </motion.p>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.8, ease }}
              className="mt-6 font-heading text-[clamp(2.75rem,5.6vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance"
            >
              Insights that keep you <span className="pricing-text-flow pr-1">connected</span>
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease }}
              className="mx-auto mt-6 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg lg:mx-0"
            >
              Practical guides to business calling, internet and cloud communication.
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.7, ease }}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="pricing-sheen group/cta relative h-12 overflow-hidden rounded-full border-0 bg-gradient-to-r from-brand-to to-brand-from px-7 shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40"
              >
                <Link href="#articles">
                  Start reading
                  <ArrowDown className="transition-transform duration-300 group-hover/cta:translate-y-0.5" aria-hidden />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {posts.length > 0 ? <ArticleDeck posts={posts.slice(0, 3)} /> : null}
        </div>
      </section>
    </MotionConfig>
  );
}

/** The newest articles as a fanned deck, turning over by itself. */
function ArticleDeck({ posts }: { posts: BlogPostSummary[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || posts.length < 2) return;
    // Restarts on every change, so a card picked by hand gets its full turn.
    const id = window.setTimeout(() => setActive((i) => (i + 1) % posts.length), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [reduce, paused, posts.length, active]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, ease, delay: 0.15 }}
      className="relative mx-auto w-full max-w-xl pt-6 sm:px-8"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span
        aria-hidden
        className="pricing-halo pointer-events-none absolute inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-from/40 via-primary/20 to-transparent blur-3xl"
      />

      {/* The grid stacks every card in one cell, so the deck takes the height
          of its tallest card and nothing jumps as they turn over. */}
      <div className="grid">
        {posts.map((post, index) => {
          const seat = SEATS[(index - active + posts.length) % posts.length];
          const front = index === active;
          return (
            <motion.article
              key={post.slug}
              aria-hidden={!front}
              animate={seat}
              initial={false}
              transition={{ duration: 0.8, ease }}
              style={{ gridArea: "1 / 1" }}
              className={cn(!front && "pointer-events-none")}
            >
              <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-card shadow-2xl shadow-primary/20 ring-1 ring-primary/10">
                <Link
                  href={`/blog/${post.slug}`}
                  tabIndex={front ? undefined : -1}
                  className="group/deck block h-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  <div className="relative aspect-[12/5] overflow-hidden bg-accent">
                    <Image
                      src={post.cover.url}
                      alt={front ? post.cover.alt : ""}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <CategoryBadge category={post.category} />
                    <h2 className="mt-3 line-clamp-2 text-xl font-semibold tracking-tight text-balance transition-colors group-hover/deck:text-primary sm:text-2xl">
                      {post.title}
                    </h2>
                    <PostMeta post={post} className="mt-3" />
                  </div>
                </Link>
                {front ? (
                  <>
                    <BorderBeam size={180} duration={7} borderWidth={2} />
                    <BorderBeam size={180} duration={7} borderWidth={2} delay={3.5} />
                  </>
                ) : null}
              </div>
            </motion.article>
          );
        })}
      </div>

      {posts.length > 1 ? (
        <div className="mt-6 flex justify-center gap-1.5">
          {posts.map((post, index) => (
            <button
              key={post.slug}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${post.title}`}
              aria-current={index === active ? "true" : undefined}
              className="grid h-6 place-items-center rounded-full px-0.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <motion.span
                className={cn("block h-2 rounded-full", index === active ? "bg-primary" : "bg-primary/25")}
                animate={{ width: index === active ? 26 : 8 }}
                transition={{ duration: 0.4, ease }}
              />
            </button>
          ))}
        </div>
      ) : null}

      {/* A glass note floating by the deck, on roomier screens. */}
      <Note className="right-0 bottom-20 xl:-right-8" delay={1} bob={{ duration: 7, y: 10, delay: -2 }}>
        <span className="flex items-center gap-2.5">
          <span className="relative grid size-8 place-items-center">
            <span className="pricing-ripple absolute inset-0 rounded-full bg-primary/25" />
            <span className="relative grid size-8 place-items-center rounded-full bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground">
              <Sparkles className="size-3.5" aria-hidden />
            </span>
          </span>
          <span>
            <span className="block text-xs font-medium">Latest guide</span>
            <span className="block text-[11px] text-muted-foreground">{formatPostDate(posts[0].publishedAt)}</span>
          </span>
        </span>
      </Note>
    </motion.div>
  );
}

function Note({
  className,
  delay,
  bob,
  children,
}: {
  className: string;
  delay: number;
  bob: { duration: number; y: number; delay?: number };
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease, delay }}
      className={cn("pointer-events-none absolute z-10 hidden sm:block", className)}
    >
      <div
        className="pricing-bob rounded-2xl border border-card/80 bg-card/85 px-3.5 py-3 shadow-xl shadow-primary/15 ring-1 ring-primary/10 backdrop-blur-xl"
        style={
          {
            "--bob-duration": `${bob.duration}s`,
            "--bob-delay": `${bob.delay ?? 0}s`,
            "--bob-x": "0px",
            "--bob-y": `${bob.y}px`,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </motion.div>
  );
}
