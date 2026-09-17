import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionIllustration } from "@/components/site/section-illustration";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SipLink Communications collects, uses and protects the personal information you share with us.",
};

/**
 * Privacy Policy.
 *
 * Content is refined from the categories in the source privacy policy
 * (details-content.md §17.3): the information collected, how it is used,
 * security, cookies, third-party sites, children's privacy and how to get in
 * touch. Deliberately NOT carried over from the source, which the extraction
 * flags as problems: the unlawful subject-access administration fee, the
 * broken cookie-policy link, and the UK/EEA-specific processing-location
 * wording that does not match an India-operated company. Enquiries route to
 * the monitored support address rather than the unverified info@ address.
 * No jurisdiction or data-residency claim is made until one is confirmed.
 */
const sections: { heading: string; body: string[] }[] = [
  {
    heading: "Information we collect",
    body: [
      "When you contact us, request a quote, sign up for a service or use the SipLink platform, we may collect information such as your name, business and postal address, telephone number and email address. Where you purchase a service, we also collect the billing details needed to process that transaction.",
      "As you use our communication services, we process the records needed to deliver and support them — including call records used for provisioning, billing, support and quality of service.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use the information we collect to provision and deliver your services, verify your identity, provide customer support, maintain accurate call and billing records, and administer your account.",
      "We also use it for the day-to-day technical and operational administration of our systems, to keep those systems secure, and to meet our legal and regulatory obligations.",
    ],
  },
  {
    heading: "The SipLink mobile app",
    body: [
      "If you choose to install the SipLink mobile application, it may request access to your device's contacts so that the app can show which of your contacts also use SipLink and display contact names on incoming calls.",
      "You control this permission through your device settings, and the app's calling and messaging features depend on the account you sign in with.",
    ],
  },
  {
    heading: "Keeping your information secure",
    body: [
      "We treat the information you share with us as confidential and apply appropriate technical and organisational measures to protect it against unauthorised access, alteration, disclosure or destruction.",
      "Access to personal information within SipLink is limited to those who need it to deliver or support your services.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Our website uses cookies to help the site work correctly and to understand how it is used. Session cookies last only for the duration of your visit, while persistent cookies remember your preferences between visits.",
      "You can control or delete cookies through your browser settings. Disabling cookies may affect how parts of the site function.",
    ],
  },
  {
    heading: "Third-party websites",
    body: [
      "Our site and services may link to websites operated by other organisations. This policy applies only to SipLink, so we encourage you to review the privacy policy of any third-party site you visit.",
    ],
  },
  {
    heading: "Children's privacy",
    body: [
      "Our services are intended for businesses and are not directed at children. We do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time to reflect changes to our services or to legal and regulatory requirements. Any updates will be published on this page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 sm:-mt-30 sm:pt-30 overflow-hidden border-b border-border bg-muted/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:px-10">
          <div>
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              Legal
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              How {site.legalName} collects, uses and protects the personal
              information you share with us.
            </p>
          </div>

          {/* Schematic: your information held behind a controlled boundary. */}
          <div className="hidden rounded-2xl border border-border bg-background p-8 lg:block">
            <SectionIllustration shape="shield" />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <div className="space-y-12">
          {sections.map(({ heading, body }) => (
            <div key={heading}>
              <h2 className="text-2xl font-semibold tracking-tight text-balance">
                {heading}
              </h2>
              <div className="mt-4 space-y-4 text-pretty text-muted-foreground">
                {body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance">
              Contacting us
            </h2>
            <div className="mt-4 space-y-4 text-pretty text-muted-foreground">
              <p>
                If you have any questions about this policy, or you would like to
                access or update the personal information we hold about you,
                please get in touch.
              </p>
              <p>
                Email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-primary hover:underline"
                >
                  {site.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-primary hover:underline"
                >
                  {site.phone}
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-10 text-center">
          <p className="text-pretty text-muted-foreground">
            Have a question we haven&rsquo;t answered here?
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
