"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
