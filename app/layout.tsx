import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for headlines. Geist is a UI font and flattens out above ~64px;
// Archivo holds its weight at display sizes. Swap here if the brand font lands.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SipLink — One Platform. Total Control.",
  description:
    "Cloud telephony, SIP trunking and unified communications for growing teams. Calls, video, messaging and analytics on one platform.",
  metadataBase: new URL("https://www.siplink.in"),
  openGraph: {
    title: "SipLink — One Platform. Total Control.",
    description:
      "Cloud telephony, SIP trunking and unified communications for growing teams.",
    siteName: "SipLink Communications",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
