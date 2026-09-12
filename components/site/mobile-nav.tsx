"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Mail, Menu, Phone } from "lucide-react";

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
import { nav, site, type NavItem } from "@/lib/site";

function isItemActive(item: NavItem, pathname: string) {
  if (item.href === "/") return pathname === "/";
  if (pathname.startsWith(item.href)) return true;
  return (
    item.groups?.some((group) =>
      group.links.some((link) => pathname.startsWith(link.href))
    ) ?? false
  );
}

export function MobileNav({
  inverted = false,
}: {
  /** The header is docked on the dark hero (md and up): light trigger. */
  inverted?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full xl:hidden",
            inverted &&
              "md:text-ink-foreground md:hover:bg-ink-foreground/10 md:hover:text-ink-foreground",
          )}
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
          <Accordion type="multiple" className="w-full">
            {nav.map((item) => {
              const isActive = isItemActive(item, pathname);

              // Plain link — no children to expand.
              if (!item.groups?.length) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={close}
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
                        "size-4",
                        isActive ? "text-primary" : "text-muted-foreground/50"
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
                      "rounded-lg px-3 py-3 text-base hover:no-underline",
                      isActive
                        ? "font-semibold text-primary"
                        : "font-medium text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </AccordionTrigger>

                  <AccordionContent className="pb-1">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="mx-3 mb-1 block rounded-lg px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-muted"
                    >
                      All {item.label}
                    </Link>

                    {item.groups.map((group) => (
                      <div key={group.heading} className="mt-1">
                        {!item.flat ? (
                          <p className="px-6 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {group.heading}
                          </p>
                        ) : null}

                        <ul>
                          {group.links.map((link) => {
                            const linkActive = pathname.startsWith(link.href);
                            return (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={close}
                                  aria-current={
                                    linkActive ? "page" : undefined
                                  }
                                  className={cn(
                                    "mx-3 block rounded-lg px-3 py-2 text-sm transition-colors",
                                    linkActive
                                      ? "bg-primary/10 font-semibold text-primary"
                                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                  )}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </nav>

        <div className="border-t border-border bg-muted/30 px-5 py-5">
          <Button asChild className="w-full" size="lg">
            <Link href="/contact" onClick={close}>
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
