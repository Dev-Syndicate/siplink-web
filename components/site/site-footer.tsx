import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUp,
  ChartColumn,
  CodeXml,
  FileText,
  Layers,
  Mail,
  MapPin,
  Phone,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { RevealGroup } from "@/components/site/reveal-group";
import { hasSocialIcon, SocialIcon } from "@/components/site/social-icons";
import { footerNav, site, social } from "@/lib/site";
import { cn } from "@/lib/utils";
import dotLogo from "@/public/images/certifications/dot.jpeg";
import gdprLogo from "@/public/images/certifications/gdpr.jpeg";
import hipaaLogo from "@/public/images/certifications/hipaa.jpeg";
import isoLogo from "@/public/images/certifications/iso27001.jpeg";
import soc2Logo from "@/public/images/certifications/soc2.jpeg";

/**
 * The link groups, three across on wide screens, right of the brand column.
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

/**
 * The certification marks above the bottom bar, in the trust strip's order
 * and wording: each mark over its name, a hairline between them, no tile.
 */
const CERTIFICATIONS = [
  { src: hipaaLogo, label: "HIPAA-Aligned" },
  { src: dotLogo, label: "DoT Licensed" },
  { src: gdprLogo, label: "GDPR Compliant" },
  { src: isoLogo, label: "ISO Certified" },
  { src: soc2Logo, label: "SOC 2 Type 2" },
];

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

/**
 * Plainer names for links whose menu label is developer jargon. Only the
 * wording changes; each still goes to its own page.
 */
const RENAMED: Record<string, string> = {
  "Voice API": "Voice Calling",
  "SMS API": "Business SMS",
  "WhatsApp Business API": "WhatsApp Messaging",
  "WebRTC SDK": "In-App Calling",
  "SIP API": "SIP Connectivity",
};

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
      className="reveal-item footer-group group/col"
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
      <ul className="mt-3 space-y-0.5">
        {links.map((link) => {
          const label = RENAMED[link.label] ?? link.label;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="footer-nav-link text-sm text-foreground/75 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowRight className="footer-nav-arrow text-primary" aria-hidden />
                <span className="footer-roll">
                  <span>{label}</span>
                  <span aria-hidden className="text-primary">
                    {label}
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
          );
        })}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-accent/70 text-foreground">
      <div className="flex w-full flex-col gap-14 px-6 pt-16 lg:flex-row lg:gap-10 lg:px-10 lg:pt-20 2xl:gap-16 2xl:px-16">
        {/* The brand column: above the links on small screens, on the left
            from desktop up. */}
        <RevealGroup className="border-b border-border pb-12 lg:w-80 lg:shrink-0 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0 xl:w-88 2xl:w-[26rem] 2xl:pr-10">
          <div className="reveal-item" style={{ "--reveal-index": 0 } as CSSProperties}>
            <Link
              href="/"
              className="inline-flex rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Image
                src="/siplink-logo.webp"
                alt={`${site.legalName} home`}
                width={300}
                height={135}
                className="h-14 w-auto object-contain 2xl:h-16"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{site.description}</p>
          </div>

          <ul className="mt-8 space-y-4 text-sm">
            {[
              { icon: Phone, label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
              { icon: Mail, label: site.email, href: `mailto:${site.email}` },
            ].map(({ icon: Icon, label, href }, i) => (
              <li
                key={href}
                className="reveal-item"
                style={{ "--reveal-index": 1 + i } as CSSProperties}
              >
                <a
                  href={href}
                  className="group/contact flex items-center gap-3 font-medium text-foreground outline-none hover:text-primary focus-visible:text-primary"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover/contact:bg-primary group-hover/contact:text-primary-foreground">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {label}
                </a>
              </li>
            ))}
            <li className="reveal-item" style={{ "--reveal-index": 3 } as CSSProperties}>
              <div className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-4" aria-hidden />
                </span>
                <address className="leading-relaxed text-foreground/75 not-italic">{site.address}</address>
              </div>
            </li>
          </ul>
        </RevealGroup>

        {/* The links: three across on tablets and up, two on phones. */}
        <RevealGroup className="grid flex-1 grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 xl:gap-x-10">
          {GROUPS.map((heading, i) => (
            <Group key={heading} heading={heading} index={i} />
          ))}
        </RevealGroup>
      </div>

      {/* Credentials, in one row above the bottom bar. */}
      <div className="mt-14 mb-2 px-6 lg:px-10 2xl:px-16">
        <ul className="grid grid-cols-5 divide-x divide-border sm:inline-grid">
          {CERTIFICATIONS.map(({ src, label }) => (
            <li
              key={label}
              className="group/cert flex flex-col items-center gap-2 px-2 text-center first:pl-0 sm:px-6 lg:px-8"
            >
              {/* Multiply drops the marks' white backgrounds into the footer. */}
              <span className="grid h-10 place-items-center overflow-hidden sm:h-12">
                <Image
                  src={src}
                  alt=""
                  sizes="96px"
                  className="h-10 w-auto max-w-full object-contain mix-blend-multiply sm:h-12 transition-transform duration-300 group-hover/cert:-translate-y-0.5"
                />
              </span>
              <span className="text-[11px] leading-tight font-medium text-foreground/80 sm:text-xs">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom bar. */}
      <div className="flex flex-col gap-6 px-6 py-7 text-sm text-muted-foreground lg:flex-row lg:items-center lg:px-10 2xl:px-16">
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
