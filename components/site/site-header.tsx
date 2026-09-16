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

      <div className="px-4 pt-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full border border-border/60 bg-background/85 pr-3 pl-5 shadow-lg shadow-foreground/5 backdrop-blur-xl">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/siplink-logo.webp"
              alt={`${site.legalName} home`}
              width={300}
              height={135}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>

          <MegaMenu />

          <div className="flex shrink-0 items-center gap-2">
            <Button asChild className="rounded-full px-5">
              <Link href="/contact">Book a demo</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
