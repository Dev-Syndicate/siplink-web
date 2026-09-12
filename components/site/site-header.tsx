import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { MegaMenu } from "@/components/site/mega-menu";
import { MobileNav } from "@/components/site/mobile-nav";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <AnnouncementBar />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/siplink-logo.webp"
            alt={`${site.legalName} home`}
            width={300}
            height={135}
            priority
            className="h-11 w-auto object-contain"
          />
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-3">
          <Button asChild>
            <Link href="/contact">Book a demo</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
