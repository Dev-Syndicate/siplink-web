import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { footerNav, mobileApps, site, social } from "@/lib/site";

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
              className="h-9 w-auto object-contain"
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

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={mobileApps.ios}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
              >
                SipLink UC for iOS
              </a>
              <a
                href={mobileApps.android}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
              >
                SipLink UC for Android
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

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Copyright © 2026 {site.legalName}. All Rights Reserved.
          </p>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
