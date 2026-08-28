import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { certifications, solutions, trustPoints } from "@/lib/site";

const heroHighlights = [
  "Unlimited calling within the USA",
  "Free local number & IP-phone lease",
  "Salesforce, Teams & Google integrations",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 size-[600px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-52 -left-40 size-[420px] rounded-full bg-brand-from/10 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-10 pb-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:pt-12 lg:pb-24">
          <div>
            <Badge variant="secondary" className="mb-6 rounded-full">
              <ShieldCheck className="size-3.5" aria-hidden />
              HIPAA compliant &amp; DoT certified
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Enterprise-grade{" "}
              <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                voice solutions
              </span>{" "}
              for growing businesses.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              Reliable, scalable and secure cloud communications designed to
              elevate your business operations — without the enterprise price
              tag.
            </p>

            <ul className="mt-8 space-y-3">
              {heroHighlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="size-3 text-primary" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Book a demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/pricing">
                  See pricing
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </div>

          <Image
            src="/images/agent-cloud-telephony.png"
            alt="Support agent on a headset with cloud telephony, live chat and call analytics around her"
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full lg:ml-auto"
          />
        </div>

      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-14 md:grid-cols-3 lg:px-10">
          {trustPoints.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="mt-1 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Unified communications
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Powerful tools built for modern workflows.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Replace fragmented legacy systems with a single cloud platform for
            voice, video and messaging.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {solutions.map(({ title, description, icon: Icon, cta, href }) => (
            <Card
              key={title}
              className="group transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <span className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <Icon className="size-6" aria-hidden />
                </span>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="text-pretty">
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  {cta}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="border-y border-border bg-foreground text-background">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center lg:px-10">
          <span className="flex size-12 items-center justify-center rounded-xl bg-background/10">
            <ShieldCheck className="size-6" aria-hidden />
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Security and compliance you can verify.
          </h2>
          <p className="mt-4 text-pretty text-background/70">
            Our cloud phone system is HIPAA compliant and DoT certified, with
            quality of service guaranteed across the network — suitable for
            healthcare, financial services and government.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="rounded-lg border border-background/20 bg-background/5 px-5 py-2.5 text-xs font-medium tracking-wider"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-brand-from/10 to-brand-to/5 px-8 py-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Ready to move your business to the cloud?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            See SipLink running on your own workflows. Our team will plan the
            migration and port your existing numbers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
