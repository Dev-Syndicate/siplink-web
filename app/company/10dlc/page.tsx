import type { Metadata } from "next";

import { ClosingCta } from "@/components/site/closing-cta";
import {
  TenDlcFaq,
  TenDlcGuidelines,
  TenDlcHero,
  TenDlcIndustries,
  TenDlcLifecycle,
  TenDlcOverview,
  TenDlcPrivacy,
  TenDlcRegistration,
  TenDlcSolution,
} from "@/components/site/ten-dlc";
import { PageSchema } from "@/components/site/json-ld";
import { seoFor } from "@/lib/seo";

export const metadata: Metadata = seoFor("/company/10dlc");

export default function TenDlcPage() {
  return (
    <>
      <PageSchema path="/company/10dlc" />
      <TenDlcHero />
      <TenDlcOverview />
      <TenDlcRegistration />
      <TenDlcLifecycle />
      <TenDlcGuidelines />
      <TenDlcPrivacy />
      <TenDlcIndustries />
      <TenDlcSolution />
      <TenDlcFaq />

      <ClosingCta
        heading="Ready to build your business SMS strategy?"
        body="Contact SIPLINK to discuss your A2P 10DLC and business messaging requirements."
        action="Contact SIPLINK"
        href="/contact"
        secondary={{ label: "Read the FAQ", href: "#faq" }}
      />
    </>
  );
}
