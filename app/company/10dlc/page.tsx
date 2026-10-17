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

export const metadata: Metadata = {
  title: "A2P 10DLC Compliance Guide — Business SMS in the U.S. | SipLink",
  description:
    "A practical guide to compliant business SMS messaging in the United States: what A2P 10DLC is, who needs it, registration requirements, consent and opt-in, STOP and HELP, consent records, and industry considerations.",
};

export default function TenDlcPage() {
  return (
    <>
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
