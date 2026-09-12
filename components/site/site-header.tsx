"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { DOCKED_WIDTH } from "@/components/site/hero-notch";
import { MegaMenu } from "@/components/site/mega-menu";
import { MobileNav } from "@/components/site/mobile-nav";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > 4;
// The server renders the top of the page, where nothing is scrolled.
const getServerScrolled = () => false;

/**
 * Floating pill header.
 *
 * At the very top of the homepage (md and up) it is "docked": narrower,
 * dark like the hero, and seated in the hero's notch (see HeroNotch). The
 * moment the page scrolls it returns to the normal light pill, which stays
 * light because the "link" half of the wordmark vanishes on dark ground —
 * hence the light tile behind the logo while docked. See content.md §13.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribe,
    getScrolled,
    getServerScrolled,
  );
  const docked = pathname === "/" && !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={cn(
          "mx-auto max-w-7xl transition-[max-width] duration-500 ease-out",
          docked && DOCKED_WIDTH,
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center justify-between gap-4 rounded-full border border-border/70 bg-background/85 pr-2 pl-5 shadow-lg shadow-foreground/5 backdrop-blur-xl transition-[background-color,border-color,box-shadow,padding] duration-500",
            docked &&
              "md:border-transparent md:bg-ink md:pl-2 md:text-ink-foreground md:shadow-none",
          )}
        >
          <Link
            href="/"
            className={cn(
              "flex shrink-0 items-center rounded-full py-1.5 outline-none transition-[background-color,padding] duration-500 focus-visible:ring-3 focus-visible:ring-ring/50",
              docked && "md:bg-background md:px-4",
            )}
          >
            <Image
              src="/siplink-logo.webp"
              alt={`${site.legalName} home`}
              width={300}
              height={135}
              preload
              className="h-9 w-auto object-contain"
            />
          </Link>

          <MegaMenu docked={docked} />

          <div className="flex items-center gap-1">
            <Button
              asChild
              className={cn(
                "rounded-full pr-1.5 pl-4",
                docked &&
                  "md:bg-background md:text-foreground md:hover:bg-background/90",
              )}
            >
              <Link href="/contact">
                Book a demo
                <span
                  aria-hidden
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full bg-primary-foreground/15 transition-[background-color,translate] group-hover/button:translate-x-0.5",
                    docked && "md:bg-primary md:text-primary-foreground",
                  )}
                >
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </Button>
            <MobileNav inverted={docked} />
          </div>
        </div>
      </div>
    </header>
  );
}
