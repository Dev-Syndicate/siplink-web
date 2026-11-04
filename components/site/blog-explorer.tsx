"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

import { BlogCard } from "@/components/site/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BlogPostSummary } from "@/lib/blog";

const PER_PAGE = 9;
const ease = [0.22, 1, 0.36, 1] as const;

const rise = { hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } };

/**
 * Finding an article: a search, then what it leaves in a paged grid.
 */
export function BlogExplorer({ posts }: { posts: BlogPostSummary[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const top = useRef<HTMLElement>(null);

  const matches = useMemo(() => {
    const words = search.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((post) => {
      const text = `${post.title} ${post.excerpt} ${post.category ?? ""}`.toLowerCase();
      return words.every((word) => text.includes(word));
    });
  }, [posts, search]);

  const pages = Math.max(1, Math.ceil(matches.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = matches.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const turnTo = (number: number) => {
    setPage(number);
    top.current?.scrollIntoView({ block: "start" });
  };
  const clear = () => {
    setSearch("");
    setPage(1);
  };

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

        <div className="relative mt-6 w-full lg:w-72">
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

        <p role="status" aria-live="polite" className="sr-only">
          {matches.length} {matches.length === 1 ? "article" : "articles"} found
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${search}|${current}`}
            initial="hidden"
            animate="shown"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ staggerChildren: 0.08 }}
            className="mt-8"
          >
            {shown.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((post, i) => (
                  <motion.li key={post.slug} variants={rise} transition={{ duration: 0.6, ease }}>
                    <BlogCard post={post} index={i} />
                  </motion.li>
                ))}
              </ul>
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

            {pages > 1 ? (
              <nav aria-label="Article pages" className="mt-10 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={current === 1}
                  onClick={() => turnTo(current - 1)}
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
                    onClick={() => turnTo(number)}
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
                  onClick={() => turnTo(current + 1)}
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

    </MotionConfig>
  );
}
