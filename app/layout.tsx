import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { openGraphDefaults, seo } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Handwritten accent, used sparingly for margin notes beside section heads. */
const script = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo["/"][0],
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // No canonical here: a layout canonical would apply "/" to every page.
  // Pages set their own through `seoFor`.
  openGraph: openGraphDefaults,
};

/** Chennai head office for search engines' local results. */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  // Split from `site.address`; keep the two in sync.
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "3rd Floor, Anmol Palani Complex, No.88, Gopathy Narayana Rd, T. Nagar",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600017",
    addressCountry: "IN",
  },
  areaServed: "IN",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${script.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* ScrollReveal hides its children until its observer fires, which
            needs JavaScript. Without this, a reader with scripts disabled
            gets a page of invisible sections — the rule below returns every
            revealed block to its rest state before that can happen. CSS
            alone cannot detect the missing script, so it has to live here. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader />
        {/* Offset matches the fixed header: the h-16 nav pill plus its pt-3
            gap, and above `sm` the h-10 announcement bar as well. The bar is
            hidden below `sm`, so the offset drops with it — keep these in
            sync with SiteHeader.

            This matches the docked header exactly (80px, or 120px with the
            bar), so at the top of a page the first section begins right on
            the header's bottom rule. Once scrolled the header lifts into its
            pill and gets 4px shorter, but this padding is static so nothing
            reflows — content simply passes under the floating pill, which is
            the point of it. */}
        <main className="flex-1 pt-20 sm:pt-30">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
