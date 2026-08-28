"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Mail, Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-80 flex-col p-0">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-left">
            <Image
              src="/siplink-logo.webp"
              alt={site.legalName}
              width={300}
              height={135}
              className="h-9 w-auto object-contain"
            />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {nav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-3 text-base transition-colors",
                      isActive
                        ? "bg-primary/10 font-semibold text-primary"
                        : "font-medium text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                    <ChevronRight
                      className={cn(
                        "size-4 transition-transform",
                        isActive ? "text-primary" : "text-muted-foreground/50"
                      )}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border bg-muted/30 px-5 py-5">
          <Button asChild className="w-full" size="lg">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Book a demo
            </Link>
          </Button>

          <div className="mt-5 space-y-3">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                <Phone className="size-4" aria-hidden />
              </span>
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                <Mail className="size-4" aria-hidden />
              </span>
              {site.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
