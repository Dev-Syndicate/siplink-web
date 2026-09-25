"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isNavItemActive } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * A top-level nav entry with no mega menu behind it. It marks the section you
 * are in, so it stays a prefix match — the boundary logic lives in
 * `isNavItemActive` alongside the mega menu's, so the two cannot drift.
 */
export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = isNavItemActive({ href, label }, pathname);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-sm transition-colors",
        isActive
          ? "font-semibold text-primary"
          : "font-medium text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
