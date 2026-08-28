"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "Mobile", href: "#mobile" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // The logo's "link" half is near-black and has no reversed variant, so
        // the bar keeps an opaque backdrop once the pink field scrolls under it.
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        // Opaque, not translucent: over the pink field a semi-transparent bar
        // tints to a muddy pink and reads as a seam.
        scrolled
          ? "border-b border-border bg-background"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="SipLink home">
          <Image
            src="/siplink-logo.webp"
            alt="SipLink"
            width={300}
            height={135}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="brand" size="lg" className="hidden sm:flex">
            <a href="#contact">Schedule a demo</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="md:hidden">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button asChild variant="brand" size="xl" className="w-full">
                  <a href="#contact">Schedule a demo</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
