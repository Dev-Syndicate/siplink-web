"use client";

import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, Image as ImageIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { nav, type NavGroup, type NavItem } from "@/lib/site";

function isItemActive(item: NavItem, pathname: string) {
  if (item.href === "/") return pathname === "/";
  if (pathname.startsWith(item.href)) return true;
  return (
    item.groups?.some((group) =>
      group.links.some((link) => pathname.startsWith(link.href)),
    ) ?? false
  );
}

/**
 * One navigation row: icon tile, label, and an arrow that slides in on hover.
 *
 * Deliberately label-only. The panel is a way to get somewhere, not a place
 * to explain what is there — descriptions belong on the page being linked to.
 */
function MenuRow({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon?: NavGroup["icon"];
}) {
  return (
    <li className="break-inside-avoid">
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="group/row flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted focus-visible:bg-muted"
        >
          {Icon ? (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[0.6rem] bg-muted text-foreground/70 transition-colors group-hover/row:bg-primary group-hover/row:text-primary-foreground">
              <Icon className="size-4" aria-hidden />
            </span>
          ) : null}

          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
            {label}
          </span>

          <ArrowRight
            className="size-4 shrink-0 -translate-x-1 text-muted-foreground/50 opacity-0 transition-all group-hover/row:translate-x-0 group-hover/row:text-primary group-hover/row:opacity-100"
            aria-hidden
          />
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

/**
 * A group of rows under its heading.
 *
 * `break-inside-avoid` keeps a group whole when the panel flows it into
 * balanced CSS columns — without it a heading can end up orphaned at the
 * foot of one column with its links at the top of the next.
 */
function MenuColumn({ group }: { group: NavGroup }) {
  return (
    <div className="mb-5 break-inside-avoid last:mb-0">
      <p className="px-2 pb-1 font-mono text-[10px] font-semibold tracking-[0.16em] text-muted-foreground/70 uppercase">
        {group.heading}
      </p>
      <ul>
        {group.links.map((link) => (
          <MenuRow
            key={link.href}
            label={link.label}
            href={link.href}
            icon={link.icon ?? group.icon}
          />
        ))}
      </ul>
    </div>
  );
}

/**
 * The promo card on the right of every panel.
 *
 * Artwork is dropped in through `feature.image`; until then the same box
 * renders a placeholder, so the menu keeps its proportions either way.
 */
function MenuFeature({ feature }: { feature: NonNullable<NavItem["feature"]> }) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={feature.href}
        className="group/feature relative flex min-h-[19rem] flex-col overflow-hidden rounded-2xl bg-muted focus-visible:outline-none"
      >
        {feature.image ? (
          <NextImage
            src={feature.image}
            alt={feature.imageAlt ?? ""}
            fill
            sizes="340px"
            className="object-cover transition-transform duration-500 group-hover/feature:scale-105"
          />
        ) : (
          /* Placeholder — replace by setting `image` on this nav item's
             `feature` in lib/site.ts. Nothing else needs to change. */
          <span
            aria-hidden
            className="absolute inset-3 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background/40 text-muted-foreground/60"
          >
            <ImageIcon className="size-7" />
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase">
              Image placeholder
            </span>
          </span>
        )}

        {/* Opens-the-page affordance, mirroring the reference layout. */}
        <span className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors group-hover/feature:bg-primary group-hover/feature:text-primary-foreground">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>

        {/* Caption card sitting over the artwork. */}
        <span className="absolute inset-x-3 bottom-3 z-10 block rounded-xl bg-background/90 p-4 shadow-sm backdrop-blur-md">
          <Badge className="font-mono text-[10px] tracking-widest uppercase">
            {feature.eyebrow}
          </Badge>
          <span className="mt-2.5 block text-sm leading-snug font-semibold text-balance text-foreground">
            {feature.title}
          </span>
          <span className="mt-1.5 block text-xs leading-relaxed text-pretty text-muted-foreground">
            {feature.description}
          </span>
        </span>
      </Link>
    </NavigationMenuLink>
  );
}

export function MegaMenu() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-0.5">
        {nav.map((item) => {
          const isActive = isItemActive(item, pathname);

          // Plain link — no dropdown.
          if (!item.groups?.length) {
            return (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "font-semibold text-primary"
                        : "font-medium text-foreground/80 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          const groupCount = item.groups.length;
          // Three columns is the widest that stays readable next to the promo
          // card, so four- and five-group menus wrap onto a second row.
          const linkColumns = item.flat ? 1 : Math.min(groupCount, 3);

          return (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger
                className={cn(
                  "rounded-full bg-transparent px-3 py-2 text-sm data-[state=open]:bg-muted",
                  isActive
                    ? "font-semibold text-primary data-[state=open]:text-primary"
                    : "font-medium text-foreground/80 hover:text-foreground data-[state=open]:text-foreground",
                )}
              >
                {item.label}
              </NavigationMenuTrigger>

              {/* The viewport sizes itself to this content, so width is set
                  here rather than fought onto the positioned wrapper. */}
              <NavigationMenuContent className="p-0!">
                <div
                  className={cn(
                    // Hard ceiling so the panel can never run past the fold,
                    // whatever a menu grows to. Reaching it should be rare —
                    // the column flow above is what actually keeps menus short.
                    "max-h-[calc(100vh-10rem)] overflow-y-auto",
                    linkColumns === 1
                      ? "w-[min(calc(100vw-3rem),880px)]"
                      : linkColumns === 2
                        ? "w-[min(calc(100vw-3rem),1040px)]"
                        : "w-[min(calc(100vw-3rem),1240px)]",
                  )}
                >
                  <div className="grid gap-3 p-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]">
                    {/* Navigation side */}
                    <div className="flex min-w-0 flex-col">
                      <div
                        className={cn(
                          "flex-1 gap-x-5",
                          // Balanced CSS columns, not a grid: groups flow and
                          // pack, so an uneven set (three short groups and one
                          // six-link group) fills the columns evenly instead
                          // of wrapping onto a second row and doubling the
                          // panel's height.
                          item.flat
                            ? "[&_ul]:columns-2 [&_ul]:gap-x-5"
                            : linkColumns === 2
                              ? "columns-2"
                              : "columns-3",
                        )}
                      >
                        {item.groups.map((group) => (
                          <MenuColumn key={group.heading} group={group} />
                        ))}
                      </div>

                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="group/all mt-4 flex items-center justify-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          View all {item.label}
                          <ArrowRight
                            className="size-4 transition-transform group-hover/all:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      </NavigationMenuLink>
                    </div>

                    {item.feature ? (
                      <MenuFeature feature={item.feature} />
                    ) : null}
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
