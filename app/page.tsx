import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Platform } from "@/components/sections/platform";
import { TrustArc } from "@/components/sections/trust-arc";
import { Pricing } from "@/components/sections/pricing";
import { MobileBand } from "@/components/sections/mobile-band";
import { ContactBand } from "@/components/sections/contact-band";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Platform />
        <TrustArc />
        <Pricing />
        <MobileBand />
        <ContactBand />
      </main>
      <SiteFooter />
    </>
  );
}
