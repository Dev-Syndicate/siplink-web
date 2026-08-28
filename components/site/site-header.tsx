import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/site/mobile-nav";
import { NavLink } from "@/components/site/nav-link";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
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

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

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
