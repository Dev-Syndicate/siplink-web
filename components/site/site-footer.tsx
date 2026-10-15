import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUp,
  Building2,
  ChartColumn,
  Cloud,
  CodeXml,
  FileText,
  Headphones,
  Layers,
  Phone,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

import { RevealGroup } from "@/components/site/reveal-group";
import { hasSocialIcon, SocialIcon } from "@/components/site/social-icons";
import { Button } from "@/components/ui/button";
import { footerNav, site, social } from "@/lib/site";
import { cn } from "@/lib/utils";
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
 * The link columns, two groups stacked in most. Paired so the columns come
 * out roughly even in height: a long group sits with a short one, and the
 * two longest — Industries and Company — each get a column to themselves.
 *
 * Internet is left out, as in the design: it has its own section of the site
 * and its own menu.
 */
const COLUMNS: string[][] = [
  ["Business Voice", "Phone Numbers"],
  ["Communication APIs", "Contact Center"],
  ["Enterprise Features", "By Business Size"],
  ["By Use Case", "Migration"],
  ["Industries"],
  ["Company"],
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

/** The wordmark, split so "sip" carries the brand pink as the logo does. */
const WORDMARK = [
  ...[..."sip"].map((letter) => ({ letter, accent: true })),
  ...[..."link"].map((letter) => ({ letter, accent: false })),
];

/** Drifting motes around the signal rings: position, drift and timing. */
const MOTES = [
  { top: "12%", left: "8%", size: 6, x: 14, y: -22, duration: 9, delay: 0 },
  { top: "30%", left: "88%", size: 4, x: -12, y: -16, duration: 11, delay: 1.5 },
  { top: "68%", left: "14%", size: 5, x: 10, y: -20, duration: 10, delay: 3 },
  { top: "82%", left: "72%", size: 3, x: -16, y: -12, duration: 8, delay: 0.8 },
  { top: "48%", left: "52%", size: 4, x: 12, y: 16, duration: 12, delay: 2.2 },
];

function Group({ heading, index }: { heading: string; index: number }) {
  const group = footerNav.find((item) => item.heading === heading);
  if (!group) return null;
  const Icon = ICONS[heading];

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
          {String(group.links.length).padStart(2, "0")}
        </span>
      </h3>
      {/* A hairline under the heading that draws in, pink, on hover. */}
      <span aria-hidden className="relative mt-3 block h-px overflow-hidden bg-border">
        <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-brand-to to-brand-from transition-transform duration-500 ease-out group-hover/col:scale-x-100" />
      </span>
      <ul className="mt-3 space-y-0.5">
        {group.links.map((link) => (
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

/**
 * Concentric signal rings with a light circling the outer one: a call going
 * out, drawn as the footer's one decorative object.
 */
function SignalRings({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      <svg viewBox="0 0 400 400" className="size-full overflow-visible" fill="none">
        {[56, 100, 144, 188].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            className="stroke-foreground"
            strokeOpacity={0.16 - i * 0.03}
            strokeWidth="1"
          />
        ))}
        <circle
          cx="200"
          cy="200"
          r="122"
          className="stroke-primary"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
        <g className="footer-orbit" style={{ transformOrigin: "200px 200px", "--orbit-duration": "36s" } as CSSProperties}>
          <circle cx="200" cy="12" r="5" className="fill-primary" />
          <circle cx="200" cy="12" r="12" className="fill-primary" fillOpacity="0.18" />
        </g>
        <g className="footer-orbit" style={{ transformOrigin: "200px 200px", "--orbit-duration": "22s" } as CSSProperties}>
          <circle cx="300" cy="200" r="3" className="fill-foreground" fillOpacity="0.7" />
        </g>
        <circle cx="200" cy="200" r="22" className="fill-primary" fillOpacity="0.12" />
        <circle cx="200" cy="200" r="7" className="fill-primary" />
      </svg>

      {MOTES.map((m) => (
        <span
          key={`${m.top}-${m.left}`}
          className="footer-float absolute rounded-full bg-primary/70"
          style={
            {
              top: m.top,
              left: m.left,
              width: m.size,
              height: m.size,
              "--float-x": `${m.x}px`,
              "--float-y": `${m.y}px`,
              "--float-duration": `${m.duration}s`,
              "--float-delay": `${m.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function SiteFooter() {
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-gradient-to-b from-background to-accent/70 text-foreground">
      {/* A single soft pink glow low in the band, behind the wordmark. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-96 w-[70%] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="w-full px-6 pt-20 lg:px-10 lg:pt-28 2xl:px-16">
        {/* Opening: the statement and the ways to reach a person. */}
        <RevealGroup className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p
              className="reveal-item flex items-center gap-2.5 font-mono text-xs tracking-[0.16em] text-primary uppercase"
              style={{ "--reveal-index": 0 } as CSSProperties}
            >
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {site.tagline}
            </p>
            <h2
              className="reveal-item mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
              style={{ "--reveal-index": 1 } as CSSProperties}
            >
              Let&apos;s get your business <span className="text-primary">talking.</span>
            </h2>
            <p
              className="reveal-item mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
              style={{ "--reveal-index": 2 } as CSSProperties}
            >
              {site.description}
            </p>
            <div
              className="reveal-item mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
              style={{ "--reveal-index": 3 } as CSSProperties}
            >
              <Button asChild size="lg" className="group rounded-full">
                <Link href="/contact">
                  Book a demo
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </Button>
              <a
                href={telHref}
                className="footer-link pb-0.5 font-mono text-sm text-foreground/75 outline-none hover:text-primary focus-visible:text-primary"
              >
                or call {site.phone}
              </a>
            </div>
          </div>

          <dl className="grid content-start gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-border lg:pl-12">
            {[
              { term: "Call us", value: site.phone, href: telHref },
              { term: "Write to us", value: site.email, href: `mailto:${site.email}` },
              { term: "Visit us", value: site.address, href: "/contact" },
            ].map((item, i) => (
              <div
                key={item.term}
                className="reveal-item"
                style={{ "--reveal-index": i + 2 } as CSSProperties}
              >
                <dt className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{item.term}</dt>
                <dd className="mt-2">
                  {item.href.startsWith("/") ? (
                    <Link
                      href={item.href}
                      className="footer-link pb-0.5 text-sm leading-relaxed text-foreground/80 outline-none hover:text-primary focus-visible:text-primary"
                    >
                      <address className="inline not-italic">{item.value}</address>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="footer-link pb-0.5 text-lg font-medium text-foreground outline-none hover:text-primary focus-visible:text-primary"
                    >
                      {item.value}
                    </a>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </RevealGroup>

        {/* The links: two groups per column on desktop; below that the
            columns simply flow two or three across, each keeping its pair. */}
        <RevealGroup className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-border pt-14 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8">
          {COLUMNS.map((pair, col) => (
            <div key={pair[0]} className="space-y-10">
              {pair.map((heading, row) => (
                <Group key={heading} heading={heading} index={col + row * 2} />
              ))}
            </div>
          ))}
        </RevealGroup>

        {/* Credentials, quietly, on light chips so the marks keep their colours. */}
        <ul className="mt-16 flex flex-wrap items-center gap-3">
          {complianceBadges.map((badge) => (
            <li
              key={badge.alt}
              className="rounded-xl border border-border bg-card p-2 transition-transform duration-300 hover:-translate-y-1"
            >
              <Image src={badge.src} alt={badge.alt} className="h-10 w-auto" sizes="120px" />
            </li>
          ))}
        </ul>
      </div>

      {/* Closing: the oversized wordmark, the signal rings overlapping it. */}
      <RevealGroup className="relative mt-6 px-2">
        <SignalRings className="absolute -top-10 right-[3%] hidden size-[min(22vw,20rem)] md:block" />
        <p
          aria-hidden
          className="relative flex justify-center overflow-hidden pb-[0.12em] text-[26vw] md:text-[17vw] leading-[0.85] font-semibold tracking-[-0.06em] select-none [mask-image:linear-gradient(to_bottom,black_40%,transparent_92%)]"
        >
          {WORDMARK.map(({ letter, accent }, i) => (
            <span
              key={i}
              className={cn("footer-letter", accent ? "text-primary" : "text-foreground")}
              style={{ "--letter-index": i } as CSSProperties}
            >
              {letter}
            </span>
          ))}
        </p>
      </RevealGroup>

      {/* Bottom bar. */}
      <div className="relative flex flex-col gap-6 border-t border-border px-6 py-7 text-sm text-muted-foreground lg:flex-row lg:items-center lg:px-10 2xl:px-16">
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
