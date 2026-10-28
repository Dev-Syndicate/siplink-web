import type { Metadata } from "next";

import { site } from "@/lib/site";

export const openGraphDefaults = {
  siteName: site.name,
  locale: "en_IN",
  type: "website",
} as const;

/** Per-page copy, keyed by path. Each targets the agency's Chennai keyword. */
export const seo = {
  "/": [
    "VoIP Business Solutions in Chennai | SipLink",
    "SipLink delivers VoIP business solutions and business communication solutions in Chennai: cloud phone systems, SIP trunking and hosted PBX.",
  ],
  "/products": [
    "Cloud Phone Systems in Chennai | SipLink",
    "Cloud phone systems, unified communications and business-grade VoIP for Chennai offices, from one provider and one network.",
  ],
  "/products/sip-trunking": [
    "VoIP SIP Trunking Services in Chennai | SipLink",
    "VoIP SIP trunking services in Chennai: connect your existing PBX to SipLink's IP network for lower call costs and guaranteed call quality.",
  ],
  "/products/cloud-pbx": [
    "Cloud-Based PBX Systems in Chennai | SipLink",
    "Cloud-based PBX systems in Chennai: route, queue and manage every customer conversation without on-site hardware.",
  ],
  "/products/hosted-pbx": [
    "Hosted VoIP & Virtual PBX Provider in Chennai | SipLink",
    "Virtual PBX provider in Chennai: hosted VoIP and business phone services, managed end to end by SipLink, with no box to maintain.",
  ],
  "/products/ip-pbx": [
    "IP PBX for Enterprises in Chennai | SipLink",
    "IP PBX for enterprises in Chennai: a SIP-enabled on-premise PBX you control, connected to SipLink's voice network over SIP.",
  ],
  "/products/call-center": [
    "VoIP for Call Centers in Chennai | SipLink",
    "VoIP for call centers in Chennai: smart routing, queues, recording, whisper and barge, and AI call analytics.",
  ],
  "/internet": [
    "Business Internet Leased Line in Chennai | SipLink",
    "Business communication infrastructure in Chennai: internet leased lines, static IP and managed networks from a Class A ISP, monitored 24/7.",
  ],
  "/internet/dedicated-internet": [
    "Dedicated Internet Leased Line in Chennai | SipLink",
    "Dedicated internet leased line in Chennai with dependable bandwidth and SLA-backed service for business-critical operations.",
  ],
  "/pricing": [
    "Business VoIP Plans in Chennai | SipLink Pricing",
    "Affordable, scalable business VoIP plans in Chennai: Core, Business Pro and Enterprise Plus, priced per line per month.",
  ],
} as const satisfies Record<string, readonly [string, string]>;

/**
 * Title, description, canonical and Open Graph for one page. Next merges
 * `openGraph` shallowly, so a page that sets it must repeat the defaults.
 * The title is absolute so the layout template cannot push it past ~60 chars.
 */
export function seoFor(path: keyof typeof seo): Metadata {
  const [title, description] = seo[path];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphDefaults, url: path, title, description },
  };
}
