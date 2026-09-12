import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { socialIcons } from "@/components/site/social-icons";
import { AppleLogo, PlayStoreLogo } from "@/components/site/store-icons";
import { Button } from "@/components/ui/button";
import { footerNav, mobileApps, site, social } from "@/lib/site";

/**
 * Framed footer panel, matching the homepage hero and CTA. The wordmark sits
 * on its own light tile because its "link" half disappears on dark ground.
 */
export function SiteFooter() {
  return (
    <footer className="px-2 pt-3 pb-2 sm:px-3 sm:pb-3">
      <div className="rounded-4xl bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-10 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Link
                href="/"
                className="inline-flex rounded-2xl bg-background px-4 py-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Image
                  src="/siplink-logo.webp"
                  alt={`${site.legalName} home`}
                  width={300}
                  height={135}
                  className="h-8 w-auto object-contain"
                />
              </Link>

              <p className="mt-6 max-w-sm text-sm text-pretty text-ink-foreground/70">
                {site.description}
              </p>

              <div className="mt-6 space-y-2 text-sm">
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex w-fit items-center gap-2 text-ink-foreground/80 transition-colors hover:text-ink-foreground"
                >
                  <Phone className="size-4" aria-hidden />
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex w-fit items-center gap-2 text-ink-foreground/80 transition-colors hover:text-ink-foreground"
                >
                  <Mail className="size-4" aria-hidden />
                  {site.email}
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={mobileApps.ios}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 rounded-full border border-ink-foreground/15 px-3.5 py-2 text-xs font-medium transition-colors hover:bg-ink-foreground/10"
                >
                  <AppleLogo className="size-4" />
                  SipLink UC for iOS
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={mobileApps.android}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 rounded-full border border-ink-foreground/15 px-3.5 py-2 text-xs font-medium transition-colors hover:bg-ink-foreground/10"
                >
                  <PlayStoreLogo className="size-4" />
                  SipLink UC for Android
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>

            <nav
              aria-label="Footer"
              className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7"
            >
              {footerNav.map((group) => (
                <div key={group.heading}>
                  <h2 className="text-sm font-semibold">{group.heading}</h2>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-ink-foreground/65 transition-colors hover:text-ink-foreground"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-ink-foreground/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-foreground/60">
              Copyright © 2026 {site.legalName}. All Rights Reserved.
            </p>

            <ul className="flex flex-wrap gap-1">
              {social.map(({ label, href }) => {
                const Icon = socialIcons[label];
                return (
                  <li key={label}>
                    <Button
                      asChild
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-full text-ink-foreground/70 hover:bg-ink-foreground/10 hover:text-ink-foreground dark:hover:bg-ink-foreground/10"
                    >
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${site.name} on ${label}`}
                      >
                        <Icon className="size-4" />
                      </a>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
