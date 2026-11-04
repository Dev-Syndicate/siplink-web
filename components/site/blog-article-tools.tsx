"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Check, Link2 } from "lucide-react";

import { SocialIcon } from "@/components/site/social-icons";
import { Button } from "@/components/ui/button";
import type { BlogHeading } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** A brand bar across the top of the screen, filling as the article is read. */
export function BlogReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-brand-to via-primary to-brand-from"
    />
  );
}

/** Share links for an article, and a button that copies its address. */
export function BlogShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const link = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  const networks = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${link}&text=${text}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${link}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${text}%20${link}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard refused (an old browser, or no permission): the address bar still has it.
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="mr-1.5 text-xs font-medium text-muted-foreground">Share</span>
      {networks.map(({ label, href }) => (
        <Button key={label} asChild variant="outline" size="icon" className="size-9 rounded-full hover:border-primary/40 hover:text-primary">
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}>
            <SocialIcon label={label === "X" ? "X (Twitter)" : label} className="size-4" />
          </a>
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className="size-9 rounded-full hover:border-primary/40 hover:text-primary"
      >
        {copied ? <Check aria-hidden /> : <Link2 aria-hidden />}
      </Button>
    </div>
  );
}

/** The article's outline, marking the section being read. */
export function BlogToc({ headings }: { headings: BlogHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      // A heading counts as current once it reaches the top quarter of the screen.
      { rootMargin: "-15% 0px -70% 0px" },
    );
    for (const { id } of headings) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="In this article">
      <p className="text-sm font-semibold">In this article</p>
      <ol className="mt-3 space-y-0.5 border-l border-border">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={id === active ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pr-2 text-sm text-pretty transition-colors duration-200 outline-none focus-visible:text-primary",
                level === 3 ? "pl-6" : "pl-3.5",
                id === active
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
