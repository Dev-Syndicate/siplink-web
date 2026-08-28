import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/siplink-logo.webp"
              alt={site.legalName}
              width={300}
              height={135}
              className="h-7 w-auto object-contain"
            />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {site.description}
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="size-4" aria-hidden />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" aria-hidden />
                {site.email}
              </a>
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold">{group.heading}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <p className="text-xs text-muted-foreground">
          Copyright © 2026 {site.legalName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
