import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { HeaderShell } from "@/components/site/header-shell";
import { MegaMenu } from "@/components/site/mega-menu";
import { MobileNav } from "@/components/site/mobile-nav";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Site navigation.
 *
 * Docked at the top of the page and floating once you scroll — HeaderShell
 * owns that switch and the transition between the two. Everything here is
 * server-rendered; only the shell needs to know about scroll.
 *
 * Header height is 80px docked and 76px floating (plus the h-10 announcement
 * bar above `sm`). The offset on `main`, and the `-mt/pt` on each page's first
 * section, are sized for the taller of the two — see app/layout.tsx.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />

      <HeaderShell>
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
            className="w-auto object-contain transition-all duration-300 ease-out h-9 group-data-[scrolled=true]/bar:h-8 sm:h-10 sm:group-data-[scrolled=true]/bar:h-9"
          />
        </Link>

        <MegaMenu />

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button
            asChild
            className="h-9 rounded-full px-3 text-[0.8rem] transition-all duration-300 ease-out sm:h-10 sm:px-5 sm:text-sm"
          >
            <Link href="/contact">Book a demo</Link>
          </Button>
          <MobileNav />
        </div>
      </HeaderShell>
    </header>
  );
}
