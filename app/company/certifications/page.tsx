import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionIllustration } from "@/components/site/section-illustration";
import { certificationDetails, securityPractices } from "@/lib/company";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "The credentials SipLink holds — HIPAA compliant, DoT certified and D-U-N-S registered — explained honestly, and the security practices behind them.",
};

export default function CertificationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 sm:-mt-30 sm:pt-30 overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-32 size-[540px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-14 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:px-10">
          <div>
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              Certifications & compliance
            </span>
            <h1 className="mt-3 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Credentials you can verify
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
              We would rather tell you exactly what SipLink holds, and what each
              credential actually means, than decorate a page with badges. Here
              are ours — a compliant platform, a licensed network and a verified
              business identity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {certificationDetails.map(({ name }) => (
                <Badge key={name} variant="secondary" className="rounded-full">
                  <Check className="size-3" aria-hidden />
                  {name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Schematic: data held behind a controlled boundary. */}
          <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
            <SectionIllustration shape="shield" />
          </div>
        </div>
      </section>

      {/* Certification details */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="space-y-16">
          {certificationDetails.map(
            ({ name, short, body, meansForYou, icon: Icon }, index) => (
              <div key={name}>
                {index > 0 ? <Separator className="mb-16" /> : null}
                <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
                  <div>
                    <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <h2 className="mt-6 text-2xl font-semibold tracking-tight text-balance">
                      {name}
                    </h2>
                    <p className="mt-2 text-pretty text-primary">{short}</p>
                  </div>
                  <div>
                    <div className="space-y-4">
                      {body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="text-pretty text-muted-foreground"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="mt-8 rounded-xl bg-muted/40 p-6">
                      <h3 className="text-sm font-medium tracking-widest text-primary uppercase">
                        What it means for you
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {meansForYou.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Check className="size-3" aria-hidden />
                            </span>
                            <span className="text-sm text-pretty text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Security practices */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              How we operate
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              The practices behind the badges
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Compliance is a floor, not a ceiling. These are the day-to-day
              practices that keep the platform secure and available, whatever
              certificate is on the wall.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {securityPractices.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          Have a compliance question?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          If your procurement or security team needs documentation for a review,
          tell us what you need and we will get the right details to the right
          people.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Talk to us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/why-siplink">
              Why SipLink
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
