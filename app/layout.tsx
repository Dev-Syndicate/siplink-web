import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
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
  title: {
    default: `${site.legalName} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${script.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
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
