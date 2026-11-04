"use client";

import { useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MessageSquarePlus, Search, X } from "lucide-react";

import { BlogCard, CATEGORY_ICONS, CategoryBadge, PostMeta, trackSpotlight } from "@/components/site/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { blogCategories, type BlogCategory, type BlogPostSummary } from "@/lib/blog";
import { cn } from "@/lib/utils";

const ALL = "All articles";
const PER_PAGE = 9;
const ease = [0.22, 1, 0.36, 1] as const;

const rise = { hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } };

/**
 * Finding an article: category pills and search, then what they leave, in
 * three tiers. The newest match leads, the next two sit beside it, and the
 * rest fill a paged grid, so the top of the list always has a clear hierarchy
 * however few posts match. Below that, the topics as a bento of tiles that
 * drive the same filter.
 *
 * Only categories that have posts get a pill, so no pill leads nowhere; the
 * tiles show every topic, and mark the empty ones as coming soon.
 */
export function BlogExplorer({ posts }: { posts: BlogPostSummary[] }) {
  const [category, setCategory] = useState(ALL);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const top = useRef<HTMLElement>(null);

  const counts = useMemo(() => {
    const totals = new Map<string, number>();
    for (const post of posts) totals.set(post.category, (totals.get(post.category) ?? 0) + 1);
    return totals;
  }, [posts]);

  const matches = useMemo(() => {
    const words = search.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((post) => {
      if (category !== ALL && post.category !== category) return false;
      const text = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      return words.every((word) => text.includes(word));
    });
  }, [posts, category, search]);

  const lead = matches[0];
  const beside = matches.slice(1, 3);
  const rest = matches.slice(3);
  const pages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = rest.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const choose = (value: string) => {
    setCategory(value || ALL);
    setPage(1);
  };
  const clear = () => {
    setCategory(ALL);
    setSearch("");
    setPage(1);
  };
  const openTopic = (name: BlogCategory) => {
    setSearch("");
    choose(name);
    top.current?.scrollIntoView({ block: "start" });
  };

  const pills = [
    { name: ALL, count: posts.length },
    ...blogCategories.filter((name) => counts.has(name)).map((name) => ({ name, count: counts.get(name) ?? 0 })),
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section id="articles" ref={top} aria-labelledby="articles-heading" className="scroll-mt-32">
        <motion.div
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.p variants={rise} transition={{ duration: 0.6, ease }} className="font-mono text-xs tracking-widest text-primary uppercase">
            The library
          </motion.p>
          <motion.h2
            id="articles-heading"
            variants={rise}
            transition={{ duration: 0.7, ease }}
            className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Latest articles
          </motion.h2>
        </motion.div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Scrolls sideways on a phone rather than wrapping into a wall. */}
          <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:min-w-0 lg:flex-1 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
            <ToggleGroup
              type="single"
              value={category}
              onValueChange={choose}
              aria-label="Filter articles by category"
              spacing={1}
              className="w-max rounded-full border border-primary/10 bg-card/80 p-1 shadow-lg shadow-primary/10 backdrop-blur lg:flex-wrap"
            >
              {pills.map(({ name, count }) => (
                <ToggleGroupItem
                  key={name}
                  value={name}
                  className="relative h-10 rounded-full px-4 text-sm font-medium whitespace-nowrap text-foreground/70 transition-colors duration-300 hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent data-[state=on]:text-primary-foreground"
                >
                  {/* The active pill slides from one category to the next. */}
                  {category === name ? (
                    <motion.span
                      layoutId="blog-active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-to to-brand-from shadow-md shadow-primary/30"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">{name}</span>
                  <span
                    className={cn(
                      "relative grid h-5 min-w-5 place-items-center rounded-full px-1 font-mono text-[10px] tabular-nums transition-colors duration-300",
                      category === name ? "bg-primary-foreground/25 text-primary-foreground" : "bg-accent text-accent-foreground",
                    )}
                  >
                    {count}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="relative w-full shrink-0 lg:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-primary" aria-hidden />
            <Input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search articles"
              aria-label="Search articles"
              className="h-12 rounded-full border-primary/10 bg-card/80 pr-10 pl-11 shadow-lg shadow-primary/10 backdrop-blur transition-shadow duration-300 focus-visible:shadow-primary/25 [&::-webkit-search-cancel-button]:hidden"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4" aria-hidden />
              </button>
            ) : null}
          </div>
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {matches.length} {matches.length === 1 ? "article" : "articles"} found
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${category}|${search}|${current}`}
            initial="hidden"
            animate="shown"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ staggerChildren: 0.08 }}
            className="mt-8"
          >
            {lead ? (
              <div className={cn("grid gap-6", beside.length > 0 && "lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]")}>
                <motion.div variants={rise} transition={{ duration: 0.6, ease }}>
                  <LeadArticle post={lead} />
                </motion.div>
                {beside.length > 0 ? (
                  <ul className={cn("grid gap-6", beside.length === 1 ? "grid-rows-1" : "lg:grid-rows-2")}>
                    {beside.map((post, i) => (
                      <motion.li key={post.slug} variants={rise} transition={{ duration: 0.6, ease }}>
                        <BlogCard post={post} index={i + 1} tall={beside.length === 1} />
                      </motion.li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <motion.div
                variants={rise}
                transition={{ duration: 0.5, ease }}
                className="rounded-3xl border border-dashed border-primary/25 bg-card/70 px-6 py-16 text-center"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-primary">
                  <Search className="size-6" aria-hidden />
                </span>
                <p className="mt-5 text-lg font-semibold">No articles match that yet.</p>
                <p className="mt-2 text-sm text-muted-foreground">Try another word, or look through everything we&rsquo;ve published.</p>
                <Button variant="outline" onClick={clear} className="mt-6 rounded-full px-5">
                  Show all articles
                </Button>
              </motion.div>
            )}

            {shown.length > 0 ? (
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((post, i) => (
                  <motion.li key={post.slug} variants={rise} transition={{ duration: 0.6, ease }}>
                    <BlogCard post={post} index={i} />
                  </motion.li>
                ))}
              </ul>
            ) : null}

            {pages > 1 ? (
              <nav aria-label="Article pages" className="mt-10 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={current === 1}
                  onClick={() => setPage(current - 1)}
                  aria-label="Previous page"
                  className="rounded-full"
                >
                  <ChevronLeft aria-hidden />
                </Button>
                {Array.from({ length: pages }, (_, i) => i + 1).map((number) => (
                  <Button
                    key={number}
                    variant={number === current ? "default" : "outline"}
                    size="icon"
                    onClick={() => setPage(number)}
                    aria-label={`Page ${number}`}
                    aria-current={number === current ? "page" : undefined}
                    className="rounded-full"
                  >
                    {number}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  disabled={current === pages}
                  onClick={() => setPage(current + 1)}
                  aria-label="Next page"
                  className="rounded-full"
                >
                  <ChevronRight aria-hidden />
                </Button>
              </nav>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </section>

      <Topics counts={counts} onOpen={openTopic} />
    </MotionConfig>
  );
}

/**
 * The newest match: a large image with the title over it, on the featured
 * plan's glowing border. It tilts toward the pointer and a light follows it.
 */
function LeadArticle({ post }: { post: BlogPostSummary }) {
  const reduce = useReducedMotion();
  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    trackSpotlight(event);
    if (reduce || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    tiltX.set(((event.clientY - box.top) / box.height - 0.5) * -5);
    tiltY.set(((event.clientX - box.left) / box.width - 0.5) * 5);
  };
  const leave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div className="group/tier relative h-full" style={{ perspective: 1400 }}>
      <span
        aria-hidden
        className="pricing-halo pointer-events-none absolute -inset-3 -z-10 rounded-[2.4rem] bg-gradient-to-b from-brand-from/40 via-primary/20 to-transparent blur-2xl"
      />
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="pricing-featured-border pricing-elevate h-full rounded-[1.85rem] p-[1.5px]"
      >
        <Link
          href={`/blog/${post.slug}`}
          onPointerMove={move}
          onPointerLeave={leave}
          className="group/lead relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-foreground outline-none focus-visible:ring-4 focus-visible:ring-ring/50 lg:min-h-[34rem]"
        >
          <Image
            src={post.cover.url}
            alt={post.cover.alt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="pricing-kenburns object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/70 via-40% to-transparent to-75%" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/lead:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in oklab, var(--brand-from) 30%, transparent), transparent 70%)",
            }}
          />
          <span aria-hidden className="pricing-band-sheen pointer-events-none absolute inset-0" />

          <div className="relative p-6 text-background sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-primary uppercase">
                <span className="relative flex size-1.5">
                  <span className="pricing-ping absolute inset-0 rounded-full bg-primary" />
                  <span className="relative size-1.5 rounded-full bg-primary" />
                </span>
                Latest
              </span>
              <CategoryBadge category={post.category} className="bg-primary text-primary-foreground" />
              <PostMeta post={post} className="text-background/80 [&_span_span]:text-background" />
            </div>
            <h3 className="mt-4 max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
              {post.title}
            </h3>
            <p className="mt-3 line-clamp-2 max-w-2xl text-sm text-pretty text-background/80 sm:text-base">
              {post.excerpt}
            </p>
            <span className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-background pr-1.5 pl-6 text-sm font-semibold text-foreground transition-colors duration-300 group-hover/lead:text-primary">
              Read article
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground transition-transform duration-300 group-hover/lead:translate-x-0.5 group-hover/lead:-rotate-45">
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </span>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

/** Every topic as a tile; the ones with articles open the filter above. */
function Topics({
  counts,
  onOpen,
}: {
  counts: Map<string, number>;
  onOpen: (name: BlogCategory) => void;
}) {
  return (
    <section id="topics" aria-labelledby="topics-heading" className="mt-20 scroll-mt-32 lg:mt-28">
      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.06 }}
      >
        <motion.p variants={rise} transition={{ duration: 0.6, ease }} className="font-mono text-xs tracking-widest text-primary uppercase">
          Explore
        </motion.p>
        <motion.h2
          id="topics-heading"
          variants={rise}
          transition={{ duration: 0.7, ease }}
          className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
        >
          Browse by topic
        </motion.h2>

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {blogCategories.map((name, i) => {
            const count = counts.get(name) ?? 0;
            return (
              <motion.li key={name} variants={rise} transition={{ duration: 0.6, ease }}>
                <TopicTile name={name} count={count} index={i} onOpen={onOpen} />
              </motion.li>
            );
          })}
          <motion.li variants={rise} transition={{ duration: 0.6, ease }}>
            <Link
              href="/contact"
              className="group/tile relative flex h-full min-h-44 flex-col justify-between overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-brand-to via-primary to-brand-from p-5 text-primary-foreground shadow-xl shadow-primary/25 transition-transform duration-500 ease-out outline-none hover:-translate-y-1.5 focus-visible:ring-4 focus-visible:ring-ring/50"
            >
              <span aria-hidden className="pricing-dots pointer-events-none absolute inset-0 text-primary-foreground/25" />
              <span aria-hidden className="pricing-band-sheen pointer-events-none absolute inset-0" />
              <span className="relative grid size-11 place-items-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/35">
                <MessageSquarePlus className="size-5" aria-hidden />
              </span>
              <span className="relative mt-6 block">
                <span className="block text-base font-semibold sm:text-lg">Got a question?</span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-primary-foreground/85">
                  Ask our team
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5" aria-hidden />
                </span>
              </span>
            </Link>
          </motion.li>
        </ul>
      </motion.div>
    </section>
  );
}

function TopicTile({
  name,
  count,
  index,
  onOpen,
}: {
  name: BlogCategory;
  count: number;
  index: number;
  onOpen: (name: BlogCategory) => void;
}) {
  const Icon = CATEGORY_ICONS[name];
  const open = count > 0;

  const inner = (
    <>
      {/* On its own layer: the card under it is solid, so the glowing border
          behind the tile never shows through the gradient's clear stops. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent via-accent/50 to-transparent" />
      <span aria-hidden className="pricing-dots pointer-events-none absolute inset-0 text-primary/25" />
      <Icon
        aria-hidden
        strokeWidth={1.25}
        className="pointer-events-none absolute -right-5 -bottom-6 size-28 -rotate-12 text-primary/10 transition-transform duration-700 ease-out group-hover/tier:rotate-0 group-hover/tier:scale-110"
      />
      <span className="relative grid size-11 place-items-center rounded-2xl bg-card text-primary shadow-md shadow-primary/10 ring-1 ring-primary/15 transition-transform duration-500 group-hover/tier:-rotate-6 group-hover/tier:scale-105">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="relative mt-6 block">
        <span className={cn("block text-base leading-snug font-semibold text-pretty sm:text-lg", !open && "text-foreground/60")}>{name}</span>
        <span className="mt-1 block text-xs text-muted-foreground">
          {open ? `${count} ${count === 1 ? "article" : "articles"}` : "Coming soon"}
        </span>
      </span>
    </>
  );

  const face =
    "relative flex h-full min-h-44 w-full flex-col justify-between overflow-hidden rounded-[1.35rem] bg-card p-5 text-left outline-none";

  return (
    <div
      className={cn("group/tier relative h-full transition-transform duration-500 ease-out", open && "hover:-translate-y-1.5")}
      style={{ "--glow-delay": `${-index * 2}s` } as CSSProperties}
    >
      {open ? (
        <span
          aria-hidden
          className="pricing-glow-border pointer-events-none absolute -inset-1 -z-10 rounded-[1.5rem] opacity-25 blur-lg transition-opacity duration-500 group-hover/tier:opacity-90"
        />
      ) : null}
      <div className={cn("h-full rounded-[1.4rem] p-px", open ? "pricing-glow-border pricing-elevate" : "bg-border")}>
        {open ? (
          <button
            type="button"
            onClick={() => onOpen(name)}
            className={cn(face, "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring")}
          >
            {inner}
          </button>
        ) : (
          <div className={face}>{inner}</div>
        )}
      </div>
    </div>
  );
}
