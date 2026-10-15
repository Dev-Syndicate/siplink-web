import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ChartColumn,
  Cloud,
  CodeXml,
  FileText,
  Headphones,
  Layers,
  Mail,
  MapPin,
  Phone,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

import { hasSocialIcon, SocialIcon } from "@/components/site/social-icons";
import { footerNav, site, social } from "@/lib/site";
import dotLogo from "@/public/trust/dot-full.webp";
import gdprLogo from "@/public/trust/gdpr.webp";
import hipaaLogo from "@/public/trust/hipaa.webp";
import isoLogo from "@/public/trust/iso.webp";
import soc2Logo from "@/public/trust/soc2.webp";

const complianceBadges = [
  { src: dotLogo, alt: "Department of Telecommunications, India Telecom" },
  { src: isoLogo, alt: "ISO/IEC 27001:2022" },
  { src: hipaaLogo, alt: "HIPAA compliant" },
  { src: gdprLogo, alt: "EU GDPR compliant" },
  { src: soc2Logo, alt: "SOC 2 Type 2" },
];

/**
 * The link columns, two groups stacked in each. Paired so the five columns
 * come out roughly even in height: a long group sits with a short one.
 *
 * Internet is left out, as in the design: it has its own section of the site
 * and its own menu, and a sixth column would crowd the row.
 */
const COLUMNS: string[][] = [
  ["Business Voice", "Phone Numbers"],
  ["Communication APIs", "Contact Center"],
  ["Enterprise Features", "By Business Size"],
  ["By Use Case", "Migration"],
  ["Industries", "Company"],
];

/** Links flagged with a small star, as the design marks them. */
const STARRED = new Set([
  "SIP Trunking",
  "DID Numbers",
  "Predictive Dialer",
  "PBX Migration",
  "Healthcare",
  "Staffing & Recruitment",
  "Education",
  "IT & SaaS",
  "Telecom Operators",
  "About SipLink",
]);

/** One icon per group heading. */
const ICONS: Record<string, LucideIcon> = {
  "Business Voice": Phone,
  "Phone Numbers": Smartphone,
  "Communication APIs": CodeXml,
  "Contact Center": Headphones,
  "Enterprise Features": Layers,
  "By Business Size": Building2,
  "By Use Case": Users,
  Migration: Cloud,
  Industries: ChartColumn,
  Company: FileText,
};

/**
 * Only the accounts we have a mark for, in the design's order. There is no
 * Instagram account, so WhatsApp takes its place at the end.
 */
const SOCIAL_ORDER = ["LinkedIn", "YouTube", "X (Twitter)", "Facebook", "WhatsApp"];
const socialLinks = social
  .filter(({ label }) => hasSocialIcon(label))
  .sort((a, b) => SOCIAL_ORDER.indexOf(a.label) - SOCIAL_ORDER.indexOf(b.label));

function Group({ heading }: { heading: string }) {
  const group = footerNav.find((item) => item.heading === heading);
  if (!group) return null;
  const Icon = ICONS[heading];

  return (
    <div>
      <h3 className="flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap">
        {Icon ? <Icon className="size-4 text-primary" aria-hidden /> : null}
        {group.heading}
      </h3>
      <ul className="mt-3 space-y-1.5">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[13px] leading-snug text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
              {STARRED.has(link.label) ? (
                <Sparkles
                  className="ml-2 inline size-3 -translate-y-0.5 fill-amber-400 text-amber-500"
                  aria-hidden
                />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-primary/5 to-background">
      {/* Full width rather than the page's max-w-7xl: six columns of links
          need the room, and on a wide screen the capped version left the
          outer thirds empty. */}
      <div className="w-full px-6 pt-16 pb-8 lg:px-10 2xl:px-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_repeat(5,minmax(0,1fr))] lg:gap-0">
          <div className="lg:pr-6">
            <Image
              src="/siplink-logo.webp"
              alt={site.legalName}
              width={300}
              height={135}
              className="h-14 w-auto object-contain"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="size-4 text-primary" aria-hidden />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-4 text-primary" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  <address className="max-w-xs leading-relaxed not-italic">
                    {site.address}
                  </address>
                </Link>
              </li>
            </ul>
          </div>

          {/* Two groups per column on desktop; below that the columns simply
              flow two or three across, each keeping its pair together. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:contents">
            {COLUMNS.map((pair) => (
              <div
                key={pair[0]}
                className="space-y-8 lg:px-5 lg:last:pr-0"
              >
                {pair.map((heading) => (
                  <Group key={heading} heading={heading} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 lg:flex-row lg:items-center">
          <ul className="flex flex-wrap items-center gap-6">
            {complianceBadges.map((badge) => (
              <li key={badge.alt}>
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  className="h-14 w-auto"
                  sizes="160px"
                />
              </li>
            ))}
          </ul>

          <span
            aria-hidden
            className="hidden h-14 w-px bg-border lg:mx-4 lg:block"
          />

          <p className="text-sm text-muted-foreground">
            © 2026 {site.legalName}. All Rights Reserved.
          </p>

          <ul className="flex items-center gap-5 lg:ml-auto">
            {socialLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="text-foreground transition-colors hover:text-primary"
                >
                  <SocialIcon label={label} className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
