import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUp,
  ChartColumn,
  CodeXml,
  FileText,
  Layers,
  Phone,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { RevealGroup } from "@/components/site/reveal-group";
import { hasSocialIcon, SocialIcon } from "@/components/site/social-icons";
import { footerNav, site, social } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The link groups, one column each. Company is the long one, so on wide
 * screens it takes a double column and splits its links in two; that keeps
 * every column between four and six links tall, with the headings in a row.
 *
 * The footer carries a curated set rather than the whole menu: Contact
 * Center, By Business Size, By Use Case, Migration and Internet live in the
 * header's menus and are left out here.
 */
const GROUPS = [
  "Business Voice",
  "Phone Numbers",
  "Communication APIs",
  "Enterprise Features",
  "Industries",
  "Company",
];

/** Groups that span two columns on wide screens, their links split in two. */
const WIDE = new Set(["Company"]);

/** Groups that show only some of their links; the rest show them all. */
const SHOWN: Record<string, Set<string>> = {
  Industries: new Set([
    "Healthcare",
    "Staffing & Recruitment",
    "Education",
    "IT & SaaS",
    "Government",
    "Telecom Operators",
  ]),
};

/** Links flagged with a small star, as the design marks them. */
const STARRED = new Set([
  "SIP Trunking",
  "DID Numbers",
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
  "Enterprise Features": Layers,
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

function Group({ heading, index }: { heading: string; index: number }) {
  const group = footerNav.find((item) => item.heading === heading);
  if (!group) return null;
  const Icon = ICONS[heading];
  const links = SHOWN[heading]
    ? group.links.filter((link) => SHOWN[heading].has(link.label))
    : group.links;

  return (
    <div
      className={cn("reveal-item footer-group group/col", WIDE.has(heading) && "2xl:col-span-2")}
      style={{ "--reveal-index": index } as CSSProperties}
    >
      <h3 className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground">
        {Icon ? (
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover/col:-rotate-6 group-hover/col:bg-primary group-hover/col:text-primary-foreground group-hover/col:shadow-md group-hover/col:shadow-primary/30">
            <Icon className="size-3.5" aria-hidden />
          </span>
        ) : null}
        <span className="lg:whitespace-nowrap">{group.heading}</span>
        <span className="ml-auto font-mono text-[10px] font-normal text-muted-foreground tabular-nums">
          {String(links.length).padStart(2, "0")}
        </span>
      </h3>
      {/* A hairline under the heading that draws in, pink, on hover. */}
      <span aria-hidden className="relative mt-3 block h-px overflow-hidden bg-border">
        <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-brand-to to-brand-from transition-transform duration-500 ease-out group-hover/col:scale-x-100" />
      </span>
      <ul className={cn("mt-3 space-y-0.5", WIDE.has(heading) && "2xl:columns-2 2xl:gap-x-10 [&>li]:break-inside-avoid")}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="footer-nav-link text-sm text-foreground/75 outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ArrowRight className="footer-nav-arrow text-primary" aria-hidden />
              <span className="footer-roll">
                <span>{link.label}</span>
                <span aria-hidden className="text-primary">
                  {link.label}
                </span>
              </span>
              {STARRED.has(link.label) ? (
                <Sparkles
                  className="ml-1.5 size-3 shrink-0 fill-amber-400 text-amber-400 transition-transform duration-500 group-hover/col:rotate-12"
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
    <footer className="border-t border-border bg-gradient-to-b from-background to-accent/70 text-foreground">
      <div className="w-full px-6 pt-16 lg:px-10 lg:pt-20 2xl:px-16">
        {/* The links: a column per group on wide screens, three across on
            tablets and two on phones. */}
        <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 xl:grid-cols-6 xl:gap-x-6 2xl:grid-cols-7 2xl:gap-x-10">
          {GROUPS.map((heading, i) => (
            <Group key={heading} heading={heading} index={i} />
          ))}
        </RevealGroup>
      </div>

      {/* Bottom bar. */}
      <div className="mt-16 flex flex-col gap-6 border-t border-border px-6 py-7 text-sm text-muted-foreground lg:flex-row lg:items-center lg:px-10 2xl:px-16">
        <p>
          © 2026 {site.legalName}. All Rights Reserved.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link href="/privacy" className="footer-link pb-0.5 outline-none hover:text-primary focus-visible:text-primary">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/contact" className="footer-link pb-0.5 outline-none hover:text-primary focus-visible:text-primary">
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-5 lg:ml-auto">
          <ul className="flex flex-wrap items-center gap-2">
            {socialLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-border text-foreground/80 outline-none transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <SocialIcon label={label} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden className="mx-2 hidden h-6 w-px bg-border sm:block" />
          <a
            href="#"
            className="group flex items-center gap-2 rounded-full whitespace-nowrap outline-none hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-primary"
          >
            Back to top
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-1" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
