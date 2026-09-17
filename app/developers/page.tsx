import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  developerApiProducts,
  developerDetails,
  developerGroups,
  developerJourney,
} from "@/lib/developers";
import { navHighlights } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Documentation, SDKs, sample code and a sandbox for building voice, SMS, WhatsApp, WebRTC and SIP into your own product with SipLink.",
};

export default function DevelopersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 sm:-mt-30 sm:pt-30 overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-24 size-[640px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-10 lg:pt-28 lg:pb-20">
          <Badge variant="secondary" className="font-mono tracking-widest">
            SIPLINK DEVELOPERS
          </Badge>

          <h1 className="font-heading mt-6 max-w-4xl text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            From first call to{" "}
            <span className="text-primary">production</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-pretty text-muted-foreground lg:text-xl">
            Build voice, messaging and real-time communication into your own
            applications. Well-documented APIs, real sample code and a sandbox —
            so you can integrate in days, not quarters.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/developers/api-docs">Read the docs</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/developers/sandbox">Start in the sandbox</Link>
            </Button>
          </div>

          {/* Illustrative first request */}
          <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-muted/30">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3 text-xs text-muted-foreground">
              <Terminal className="size-4 text-primary" aria-hidden />
              <span className="font-mono tracking-wide">
                Illustrative first request
              </span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-relaxed text-foreground">
              <code>{`curl https://api.example.siplink.in/v1/calls \\
  -H "Authorization: Bearer $SIPLINK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "from": "+15550000000", "to": "+15551234567" }'`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* API products */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              What you can build
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Five APIs on one platform
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Voice, SMS, WhatsApp, WebRTC and SIP share one authentication
              model, one error format and one set of conventions. Learn one and
              you know most of the others.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {developerApiProducts.map(
              ({ title, description, href, icon: Icon }) => (
                <Link key={title} href={href} className="group flex">
                  <Card className="h-full w-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle className="text-base">{title}</CardTitle>
                      <CardDescription className="text-pretty">
                        {description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Groups: documentation, resources, support */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            The developer portal
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Everything you need, organised the way you work
          </h2>
        </div>

        <div className="mt-14 space-y-16">
          {developerGroups.map(
            ({ slug, heading, description, icon: GroupIcon }) => {
              const items = developerDetails.filter(
                (detail) => detail.groupSlug === slug,
              );

              return (
                <div key={slug}>
                  <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <GroupIcon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-semibold tracking-tight">
                        {heading}
                      </h3>
                      <p className="mt-1 text-pretty text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map(
                      ({
                        slug: itemSlug,
                        title,
                        tagline,
                        icon: ItemIcon,
                      }) => (
                        <Link
                          key={itemSlug}
                          href={`/developers/${itemSlug}`}
                          className="group flex"
                        >
                          <Card className="h-full w-full transition-shadow hover:shadow-md">
                            <CardHeader>
                              <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <ItemIcon className="size-5" aria-hidden />
                              </span>
                              <CardTitle className="text-base">
                                {title}
                              </CardTitle>
                              <CardDescription className="text-pretty">
                                {tagline}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              How to start
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              A clear path to your first production call
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {developerJourney.map(
              ({ step, title, description, icon: Icon }) => (
                <div
                  key={step}
                  className="rounded-2xl border border-border bg-background p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-mono text-2xl font-semibold text-muted-foreground/40">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-heading mt-5 text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {navHighlights.map(({ label, description, icon: HighlightIcon }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-primary shadow-sm">
                <HighlightIcon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-medium">{label}</p>
                <p className="mt-0.5 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-28">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Tell us what you are building
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Whether you need a single click-to-call button or a full
          communications platform, our team can help you scope the integration
          and get you a working call fast.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Talk to us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/developers/api-docs">Read the docs</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
