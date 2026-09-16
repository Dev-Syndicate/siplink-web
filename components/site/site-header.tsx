import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { MegaMenu } from "@/components/site/mega-menu";
import { MobileNav } from "@/components/site/mobile-nav";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Floating pill navigation.
 *
 * The header itself is transparent and the bar inside it is a rounded,
 * blurred pill, so the nav reads as an object sitting over the page rather
 * than a band welded to the top of it. The announcement strip stays full
 * width above the pill; the gap between them is intentional — page content
 * scrolling underneath is what makes the pill look like it floats.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />

      {/* The pill keeps its h-16 at every width so the header height — and
          the offsets on `main` and on each page's first section — stay the
          same. Only the horizontal spacing and the CTA shrink on phones,
          where the budget at 320px is tight. */}
      <div className="px-3 pt-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 rounded-full border border-border/60 bg-background/85 pr-2 pl-3 shadow-lg shadow-foreground/5 backdrop-blur-xl sm:gap-4 sm:pr-3 sm:pl-5">
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-full transition-opacity hover:opacity-80 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Image
              src="/siplink-logo.webp"
              alt={`${site.legalName} home`}
              width={300}
              height={135}
              priority
              className="h-8 w-auto object-contain sm:h-9"
            />
          </Link>

          <MegaMenu />

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Button
              asChild
              className="h-9 rounded-full px-3 text-[0.8rem] sm:h-10 sm:px-5 sm:text-sm"
            >
              <Link href="/contact">Book a demo</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
