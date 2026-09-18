import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { MegaMenu } from "@/components/site/mega-menu";
import { MobileNav } from "@/components/site/mobile-nav";
import { NavShell } from "@/components/site/nav-shell";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Site navigation: docked over the hero, floating once you scroll.
 *
 * At the top of a page the nav is the page's top edge — full width, square,
 * a hairline under it, sitting flush beneath the announcement strip. Scroll
 * and it contracts into a rounded pill inset from the edges, lifts on a
 * shadow, and the strip retracts above it, so it reads as an object over the
 * page rather than a band welded to it.
 *
 * `NavShell` owns that switch and is the only client component in the header.
 * Everything here — the logo, the CTA, and the two menus, which bring their
 * own boundaries — is rendered on the server and handed to it as children.
 */
export function SiteHeader() {
  return (
    <NavShell announcement={<AnnouncementBar />}>
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

      {/* Only the horizontal spacing and the CTA shrink on phones, where the
          budget at 320px is tight. */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Button
          asChild
          className="h-9 rounded-full px-3 text-[0.8rem] sm:h-10 sm:px-5 sm:text-sm"
        >
          <Link href="/contact">Book a demo</Link>
        </Button>
        <MobileNav />
      </div>
    </NavShell>
  );
}
