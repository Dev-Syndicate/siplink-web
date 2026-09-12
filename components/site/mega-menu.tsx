"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronRight, Headset } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { nav, navHighlights, type NavGroup, type NavItem } from "@/lib/site";

function isItemActive(item: NavItem, pathname: string) {
  if (item.href === "/") return pathname === "/";
  if (pathname.startsWith(item.href)) return true;
  return (
    item.groups?.some((group) =>
      group.links.some((link) => pathname.startsWith(link.href)),
    ) ?? false
  );
}

/** Grouped column: heading with icon, then its links with descriptions. */
function MenuColumn({ group }: { group: NavGroup }) {
  const Icon = group.icon;

  return (
    <div className="min-w-0">
      <div className="flex items-start gap-3 border-b border-border/60 pb-3">
        {Icon ? (
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" aria-hidden />
          </span>
        ) : null}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {group.heading}
          </p>
          {group.description ? (
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
              {group.description}
            </p>
          ) : null}
        </div>
      </div>

      <ul className="mt-3 space-y-0.5">
        {group.links.map((link) => (
          <li key={link.href}>
            <NavigationMenuLink asChild>
              <Link
                href={link.href}
                className="group/link block rounded-lg px-2 py-2 transition-colors hover:bg-muted focus-visible:bg-muted"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm leading-snug font-medium text-foreground">
                    {link.label}
                  </span>
                  <ChevronRight
                    className="size-3.5 shrink-0 text-muted-foreground/40 transition-all group-hover/link:translate-x-0.5 group-hover/link:text-primary"
                    aria-hidden
                  />
                </span>
                {link.description ? (
                  <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                    {link.description}
                  </span>
                ) : null}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Flat menus (Industries, Pricing, Company) render as a plain multi-column list. */
function MenuFlatList({ group }: { group: NavGroup }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-0.5">
      {group.links.map((link) => (
        <li key={link.href}>
          <NavigationMenuLink asChild>
            <Link
              href={link.href}
              className="group/link flex items-center justify-between gap-2 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted focus-visible:bg-muted"
            >
              <span className="text-sm font-medium text-foreground">
                {link.label}
              </span>
              <ChevronRight
                className="size-3.5 shrink-0 text-muted-foreground/40 transition-all group-hover/link:translate-x-0.5 group-hover/link:text-primary"
                aria-hidden
              />
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

/** Left promo panel — the pink card in the design. */
function MenuFeature({
  feature,
  wide = false,
}: {
  feature: NonNullable<NavItem["feature"]>;
  /** Spans the full grid row and lays out horizontally (5-column menus). */
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-primary/5 p-6 ring-1 ring-primary/10",
        wide
          ? "col-span-full flex items-center justify-between gap-8"
          : "flex flex-col justify-between",
      )}
    >
      <div className={cn(wide && "min-w-0")}>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-primary">
          {feature.eyebrow}
        </p>
        <p
          className={cn(
            "mt-2 font-bold leading-tight text-foreground",
            wide ? "text-xl" : "mt-4 text-2xl",
          )}
        >
          {feature.title}
        </p>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed text-muted-foreground",
            wide ? "max-w-2xl" : "mt-3",
          )}
        >
          {feature.description}
        </p>
      </div>

      <Button
        asChild
        size="sm"
        className={cn(wide ? "shrink-0" : "mt-6 w-fit")}
      >
        <NavigationMenuLink asChild>
          <Link href={feature.href}>
            {feature.cta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </NavigationMenuLink>
      </Button>
    </div>
  );
}

/** Trust strip along the bottom of every mega panel. */
function MenuHighlights() {
  return (
    <div className="grid grid-cols-4 gap-4 border-t border-border/60 px-6 py-4">
      {navHighlights.map((highlight) => {
        const Icon = highlight.icon;
        return (
          <div key={highlight.label} className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground">
                {highlight.label}
              </p>
              <p className="text-[11px] leading-snug text-muted-foreground">
                {highlight.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MegaMenu({
  docked = false,
}: {
  /**
   * The header is seated in the homepage hero's dark notch. Items go light,
   * and tighter with no chevrons, because the docked pill is narrower.
   */
  docked?: boolean;
}) {
  const pathname = usePathname();

  return (
    // Only at xl: nine entries plus logo and CTA do not fit the pill below
    // that. `self-stretch` makes the menu as tall as the pill, so the
    // dropdown opens beneath the pill rather than overlapping its edge.
    <NavigationMenu className="hidden self-stretch xl:flex">
      <NavigationMenuList className="gap-0.5">
        {nav.map((item) => {
          const isActive = isItemActive(item, pathname);

          // Plain link — no dropdown.
          if (!item.groups?.length) {
            return (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    docked &&
                      "hover:bg-ink-foreground/10 focus:bg-ink-foreground/10",
                  )}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-full py-2 text-sm transition-colors",
                      docked ? "px-2.5" : "px-3",
                      isActive
                        ? docked
                          ? "font-semibold text-ink-foreground"
                          : "font-semibold text-primary"
                        : docked
                          ? "font-medium text-ink-foreground/70 hover:text-ink-foreground"
                          : "font-medium text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          const columns = item.groups.length;

          return (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger
                className={cn(
                  "rounded-full bg-transparent py-2 text-sm",
                  docked
                    ? "px-2.5 hover:bg-ink-foreground/10 focus:bg-ink-foreground/10 data-open:bg-ink-foreground/10 data-open:hover:bg-ink-foreground/10 data-open:focus:bg-ink-foreground/10 data-[state=open]:bg-ink-foreground/10 [&>svg]:hidden"
                    : "px-3 data-[state=open]:bg-primary/10",
                  isActive
                    ? docked
                      ? "font-semibold text-ink-foreground data-[state=open]:text-ink-foreground"
                      : "font-semibold text-primary data-[state=open]:text-primary"
                    : docked
                      ? "font-medium text-ink-foreground/70 hover:text-ink-foreground data-[state=open]:text-ink-foreground"
                      : "font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-primary",
                )}
              >
                {item.label}
              </NavigationMenuTrigger>

              {/* The viewport sizes itself to this content, so the width is set
                  here rather than fought onto the positioned wrapper. */}
              <NavigationMenuContent className="p-0!">
                <div
                  className={cn(
                    item.flat
                      ? "w-[min(calc(100vw-3rem),820px)]"
                      : columns >= 5
                        ? "w-[min(calc(100vw-3rem),1400px)]"
                        : columns === 4
                          ? "w-[min(calc(100vw-3rem),1240px)]"
                          : "w-[min(calc(100vw-3rem),1100px)]",
                  )}
                >
                  <div
                    className={cn(
                      "grid gap-x-8 gap-y-6 p-6",
                      item.flat
                        ? "grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
                        : // 5 groups: promo sits above the columns so each column
                          // keeps a readable width. Otherwise promo shares the row.
                          columns >= 5
                          ? "grid-cols-5"
                          : columns === 4
                            ? "grid-cols-[minmax(0,260px)_repeat(4,minmax(0,1fr))]"
                            : "grid-cols-[minmax(0,280px)_repeat(3,minmax(0,1fr))]",
                    )}
                  >
                    {item.feature ? (
                      <MenuFeature
                        feature={item.feature}
                        wide={!item.flat && columns >= 5}
                      />
                    ) : null}

                    {item.flat
                      ? item.groups.map((group) => (
                          <MenuFlatList key={group.heading} group={group} />
                        ))
                      : item.groups.map((group) => (
                          <MenuColumn key={group.heading} group={group} />
                        ))}
                  </div>

                  <MenuHighlights />

                  <div className="flex items-center justify-between gap-4 rounded-b-2xl border-t border-border/60 bg-muted/40 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                        <Headset className="size-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Not sure which solution is right for you?
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Talk to our experts and get a personalized
                          recommendation for your business.
                        </p>
                      </div>
                    </div>

                    <Button asChild size="sm" className="shrink-0">
                      <NavigationMenuLink asChild>
                        <Link href="/contact">
                          Schedule a Demo
                          <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      </NavigationMenuLink>
                    </Button>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
