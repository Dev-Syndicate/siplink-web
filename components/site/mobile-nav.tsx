"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronRight, Mail, Menu, Phone } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { isNavItemActive, isNavLeafCurrent, nav, site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Every link in the drawer calls this on tap, which covers navigation —
  // including a tap on the page you are already on. No route-change effect is
  // needed, and syncing state from one would only cost a second render.
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full sm:size-10 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      {/* Never wider than the screen less a thumb's worth of overlay, so there
          is always something to tap to dismiss. */}
      <SheetContent
        side="right"
        className="flex w-[min(21rem,calc(100vw-2.5rem))] flex-col gap-0 p-0 sm:max-w-none"
      >
        <SheetHeader className="shrink-0 border-b border-border px-4 py-3.5">
          <SheetTitle className="text-left">
            <Image
              src="/siplink-logo.webp"
              alt={site.legalName}
              width={300}
              height={135}
              className="h-8 w-auto object-contain"
            />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-2.5 py-3">
          <Accordion type="single" collapsible className="w-full">
            {nav.map((item) => {
              const isActive = isNavItemActive(item, pathname);

              // Plain link — no children to expand.
              if (!item.groups?.length) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={close}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 text-[0.95rem] transition-colors",
                      isActive
                        ? "bg-primary/10 font-semibold text-primary"
                        : "font-medium text-foreground active:bg-muted",
                    )}
                  >
                    {item.label}
                    <ChevronRight
                      className={cn(
                        "size-4",
                        isActive ? "text-primary" : "text-muted-foreground/40",
                      )}
                      aria-hidden
                    />
                  </Link>
                );
              }

              return (
                <AccordionItem
                  key={item.label}
                  value={item.label}
                  className="border-b-0"
                >
                  <AccordionTrigger
                    className={cn(
                      "rounded-xl px-3 py-3 text-[0.95rem] hover:no-underline",
                      isActive
                        ? "font-semibold text-primary"
                        : "font-medium text-foreground",
                    )}
                  >
                    {item.label}
                  </AccordionTrigger>

                  <AccordionContent className="pt-0 pb-2">
                    {item.groups.map((group) => (
                      <div key={group.heading} className="mt-1">
                        {!item.flat ? (
                          <p className="px-3 pt-2 pb-1 font-mono text-[10px] font-semibold tracking-[0.16em] text-muted-foreground/70 uppercase">
                            {group.heading}
                          </p>
                        ) : null}

                        <ul>
                          {group.links.map((link) => {
                            const Icon = link.icon ?? group.icon;
                            const linkActive = isNavLeafCurrent(link.href, pathname);

                            return (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={close}
                                  aria-current={
                                    linkActive ? "page" : undefined
                                  }
                                  className={cn(
                                    "flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm transition-colors",
                                    linkActive
                                      ? "bg-primary/10 font-semibold text-primary"
                                      : "text-foreground/90 active:bg-muted",
                                  )}
                                >
                                  {Icon ? (
                                    <span
                                      className={cn(
                                        "flex size-8 shrink-0 items-center justify-center rounded-[0.6rem] transition-colors",
                                        linkActive
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted text-foreground/70",
                                      )}
                                    >
                                      <Icon className="size-4" aria-hidden />
                                    </span>
                                  ) : null}
                                  <span className="min-w-0 flex-1 truncate">
                                    {link.label}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}

                    {/* Mirrors the desktop panel's closing action. */}
                    <Link
                      href={item.href}
                      onClick={close}
                      className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors active:bg-primary active:text-primary-foreground"
                    >
                      View all {item.label}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </nav>

        <div className="shrink-0 border-t border-border bg-muted/30 px-4 py-4">
          <Button asChild className="w-full rounded-full" size="lg">
            <Link href="/contact" onClick={close}>
              Book a demo
            </Link>
          </Button>

          <div className="mt-4 space-y-2.5">
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
