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
import {
  isNavItemActive,
  isNavLeafCurrent,
  nav,
  type NavGroup,
  type NavItem,
} from "@/lib/site";

/**
 * One navigation row: icon tile, label, and an arrow that slides in on hover.
 *
 * Deliberately label-only. The panel is a way to get somewhere, not a place
 * to explain what is there — descriptions belong on the page being linked to.
 *
 * Three things move together on hover, which is what makes the row feel like
 * an object rather than a link: the tile takes the brand gradient and lifts,
 * a wash sweeps in from the left edge, and the arrow arrives. `index` drives
 * the entrance stagger — see `.menu-row-in` in globals.css.
 */
function MenuRow({
  label,
  href,
  icon: Icon,
  index,
  active,
}: {
  label: string;
  href: string;
  icon?: NavGroup["icon"];
  index: number;
  active: boolean;
}) {
  return (
    <li
      className="menu-row-in break-inside-avoid"
      style={{ "--row-index": index } as React.CSSProperties}
    >
      <NavigationMenuLink asChild>
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "group/row relative flex items-center gap-2.5 overflow-hidden rounded-xl px-2 py-1 transition-all duration-300 ease-out",
            "hover:bg-gradient-to-r hover:from-primary/10 hover:via-primary/5 hover:to-transparent",
            "focus-visible:bg-primary/5 focus-visible:outline-none",
            active && "bg-primary/5",
          )}
        >
          {/* Accent rail that grows out of the left edge on hover. */}
          <span
            aria-hidden
            className={cn(
              "absolute top-1/2 left-0 h-0 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-brand-from to-brand-to transition-all duration-300 ease-out group-hover/row:h-[60%]",
              active && "h-[60%]",
            )}
          />

          {Icon ? (
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ease-out",
                "group-hover/row:bg-gradient-to-br group-hover/row:from-brand-from group-hover/row:to-brand-to",
                "group-hover/row:-rotate-6 group-hover/row:scale-110 group-hover/row:text-primary-foreground group-hover/row:shadow-lg group-hover/row:shadow-primary/30",
                active
                  ? "bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-muted text-foreground/70",
              )}
            >
              <Icon className="size-4" aria-hidden />
            </span>
          ) : null}

          <span
            className={cn(
              "min-w-0 flex-1 truncate text-sm font-semibold transition-all duration-300 ease-out group-hover/row:translate-x-0.5 group-hover/row:text-primary",
              active ? "text-primary" : "text-foreground",
            )}
          >
            {label}
          </span>

          <ArrowRight
            className="size-4 shrink-0 -translate-x-1.5 text-primary opacity-0 transition-all duration-300 ease-out group-hover/row:translate-x-0 group-hover/row:opacity-100"
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
function MenuColumn({
  group,
  offset,
  pathname,
}: {
  group: NavGroup;
  /** Running row count before this group, for the entrance stagger. */
  offset: number;
  pathname: string;
}) {
  return (
    <div className="mb-4 break-inside-avoid last:mb-0">
      {/* Heading, then a hairline that fades out — it reads as a rule without
          drawing a hard line across the column.

          Where the group is named after a real page the heading is the link
          to it, rather than that page appearing again as the first row. */}
      <div className="flex items-center gap-2 px-2 pb-1.5">
        {group.href ? (
          <NavigationMenuLink asChild>
            <Link
              href={group.href}
              aria-current={
                isNavLeafCurrent(group.href, pathname) ? "page" : undefined
              }
              className={cn(
                "font-mono text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none",
                isNavLeafCurrent(group.href, pathname)
                  ? "text-primary"
                  : "text-muted-foreground/70",
              )}
            >
              {group.heading}
            </Link>
          </NavigationMenuLink>
        ) : (
          <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-muted-foreground/70 uppercase">
            {group.heading}
          </span>
        )}
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
        />
      </div>

      <ul>
        {group.links.map((link, i) => (
          <MenuRow
            key={link.href}
            label={link.label}
            href={link.href}
            icon={link.icon ?? group.icon}
            index={offset + i}
            active={isNavLeafCurrent(link.href, pathname)}
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
        className="group/feature relative flex min-h-[19rem] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-muted via-muted to-primary/10 ring-1 ring-border/60 transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none"
      >
        {feature.image ? (
          <>
            <NextImage
              src={feature.image}
              alt={feature.imageAlt ?? ""}
              fill
              sizes="340px"
              className="object-cover transition-transform duration-700 ease-out group-hover/feature:scale-[1.07]"
            />
            {/* Settles the artwork behind the caption card. Kept light: the
                nav images are pale pink brand graphics, and the heavier scrim
                a photograph would need reads as grime over them. */}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-foreground/12 via-transparent to-transparent"
            />
          </>
        ) : (
          /* Placeholder — replace by setting `image` on this nav item's
             `feature` in lib/site.ts. Nothing else needs to change. */
          <span
            aria-hidden
            className="absolute inset-3 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background/40 text-muted-foreground/60 transition-colors duration-500 group-hover/feature:border-primary/30 group-hover/feature:text-primary/50"
          >
            <ImageIcon className="size-7 transition-transform duration-500 group-hover/feature:scale-110" />
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase">
              Image placeholder
            </span>
          </span>
        )}

        {/* Light sweep on hover. A transform transition rather than a
            keyframe animation, so it reverses cleanly when the pointer
            leaves and needs no arbitrary `animation` value. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl"
        >
          <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-background/55 to-transparent transition-transform duration-[900ms] ease-out group-hover/feature:translate-x-[320%] motion-reduce:transition-none" />
        </span>

        {/* Opens-the-page affordance, mirroring the reference layout. */}
        <span className="absolute top-3 right-3 z-20 flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm ring-1 ring-border/50 backdrop-blur transition-all duration-300 ease-out group-hover/feature:scale-110 group-hover/feature:bg-gradient-to-br group-hover/feature:from-brand-from group-hover/feature:to-brand-to group-hover/feature:text-primary-foreground group-hover/feature:shadow-lg group-hover/feature:shadow-primary/30 group-hover/feature:ring-transparent">
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/feature:rotate-45" />
        </span>

        {/* Caption card sitting over the artwork. */}
        <span className="absolute inset-x-3 bottom-3 z-20 block rounded-2xl bg-background/90 p-4 shadow-lg ring-1 ring-border/50 backdrop-blur-md transition-transform duration-500 ease-out group-hover/feature:-translate-y-1">
          <Badge className="bg-gradient-to-r from-brand-from to-brand-to font-mono text-[10px] tracking-widest uppercase">
            {feature.eyebrow}
          </Badge>
          <span className="mt-2.5 block text-sm leading-snug font-semibold text-balance text-foreground">
            {feature.title}
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
          const isActive = isNavItemActive(item, pathname);

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
          // Columns track the number of groups up to four. Products has five
          // groups and 24 links: at three columns one column has to carry two
          // groups and the panel grows tall enough to scroll, so the wider
          // menus get a fourth column and a wider panel to put it in.
          const linkColumns = item.flat ? 1 : Math.min(groupCount, 4);

          // Running row count so the entrance stagger continues across
          // groups instead of restarting in every column.
          let cursor = 0;
          const columns = item.groups.map((group) => {
            const offset = cursor;
            cursor += group.links.length;
            return { group, offset };
          });

          return (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger
                className={cn(
                  "rounded-full bg-transparent px-3 py-2 text-sm transition-colors data-[state=open]:bg-gradient-to-r data-[state=open]:from-primary/15 data-[state=open]:to-primary/5",
                  isActive
                    ? "font-semibold text-primary data-[state=open]:text-primary"
                    : "font-medium text-foreground/80 hover:text-foreground data-[state=open]:text-primary",
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
                    "relative max-h-[calc(100vh-10rem)] overflow-y-auto",
                    linkColumns === 1
                      ? "w-[min(calc(100vw-3rem),880px)]"
                      : linkColumns === 2
                        ? "w-[min(calc(100vw-3rem),1040px)]"
                        : linkColumns === 3
                          ? "w-[min(calc(100vw-3rem),1240px)]"
                          : "w-[min(calc(100vw-3rem),1400px)]",
                  )}
                >
                  {/* Brand light falling into the panel from the top-left, so
                      the card is lit rather than flat. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-brand-from/10 blur-3xl"
                  />

                  <div className="relative grid gap-3 p-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]">
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
                              : linkColumns === 3
                                ? "columns-3"
                                : "columns-4",
                        )}
                      >
                        {columns.map(({ group, offset }) => (
                          <MenuColumn
                            key={group.heading}
                            group={group}
                            offset={offset}
                            pathname={pathname}
                          />
                        ))}
                      </div>

                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="group/all relative mt-4 flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-muted px-4 py-3 text-sm font-semibold text-foreground ring-1 ring-transparent transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brand-from hover:to-brand-to hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none"
                        >
                          View all {item.label}
                          <ArrowRight
                            className="size-4 transition-transform duration-300 ease-out group-hover/all:translate-x-1"
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
