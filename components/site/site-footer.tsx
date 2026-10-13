import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { footerNav, site, social } from "@/lib/site";
import dotLogo from "@/public/trust/dot-full.webp";
import gdprLogo from "@/public/trust/gdpr.webp";
import hipaaLogo from "@/public/trust/hipaa.webp";
import isoLogo from "@/public/trust/iso.webp";

const complianceBadges = [
  { src: dotLogo, alt: "Department of Telecommunications, India Telecom" },
  { src: isoLogo, alt: "ISO/IEC 27001:2022" },
  { src: hipaaLogo, alt: "HIPAA compliant" },
  { src: gdprLogo, alt: "EU GDPR compliant" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
          <div>
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
          </div>

          {/* Columns, not a grid: the groups run from 3 links to 12, and
              columns pack them without the gaps a row-aligned grid leaves. */}
          <div className="columns-2 gap-8 sm:columns-3 xl:columns-4">
            {footerNav.map((group) => (
              <div key={group.heading} className="mb-8 break-inside-avoid">
                <h3 className="text-sm font-semibold">{group.heading}</h3>
                <ul className="mt-3 space-y-2">
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
        </div>

        <Separator className="my-10" />

        <ul className="mb-6 flex flex-wrap items-center gap-6">
          {complianceBadges.map((badge) => (
            <li key={badge.alt}>
              <Image src={badge.src} alt={badge.alt} className="h-12 w-auto" sizes="96px" />
            </li>
          ))}
        </ul>

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
