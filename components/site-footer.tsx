import Image from "next/image";

import { Separator } from "@/components/ui/separator";

/**
 * Office addresses are verbatim from siplink.in/contact-us.php.
 *
 * NOTE — none is labelled "head office" on purpose. The live site calls the
 * Wyoming address a head office, but 30 N Gould St is a shared registered-agent
 * address and it carries an Indian phone number. Listing the offices without
 * ranking them stays accurate until that is clarified (content_2.md §20.4).
 */
const offices = [
  {
    city: "Chennai",
    lines: [
      "Level 3, Third Floor, Anmol Palani, No.88",
      "G.N. Chetty Rd, T. Nagar",
      "Chennai, Tamil Nadu 600017",
    ],
    phone: "+91 44 48636371",
  },
  {
    city: "Bangalore",
    lines: [
      "Quadrant 2, 4th Floor, Tower 1, Umiya Business Bay",
      "Cessna Business Park, Outer Ring Rd",
      "Bengaluru 560037",
    ],
    phone: "+91 82172 02075",
  },
  {
    city: "Hyderabad",
    lines: [
      "Capital Park, No 602, 6th Floor",
      "Capital Pk Rd, Madhapur",
      "Hyderabad, Telangana 500081",
    ],
    phone: "+91 82172 02075",
  },
  {
    city: "United States",
    lines: ["SIPLINK Communications LLC", "30 N Gould St, Ste R", "Sheridan, WY 82801"],
    phone: "+91 82172 02075",
  },
];

const nav = [
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "Mobile apps", href: "#mobile" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Image
              src="/siplink-logo.webp"
              alt="SipLink"
              width={300}
              height={135}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Cloud telephony, SIP trunking and unified communications for
              growing teams.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <Separator className="my-10" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => (
            <div key={office.city}>
              <h3 className="text-sm font-semibold text-foreground">
                {office.city}
              </h3>
              <address className="mt-2 text-sm leading-relaxed text-muted-foreground not-italic">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a
                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                  className="mt-1.5 inline-block text-brand-deep transition-opacity hover:opacity-80"
                >
                  {office.phone}
                </a>
              </address>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <p className="text-sm text-muted-foreground">
          Copyright &copy; {new Date().getFullYear()} Siplink Communications.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
