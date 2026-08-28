import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { segments, solutions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Hosted PBX, SIP trunking, enhanced call centre and unified communications — cloud voice infrastructure for growing businesses.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              Engineered connectivity
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Communication solutions
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              Cloud voice infrastructure for modern business — fault tolerant,
              scalable, and built to integrate with the tools your teams already
              use.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Request a quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>

          <Image
            src="/images/communication.png"
            alt="Cloud telephony connecting desk phones, mobile apps, messaging and analytics"
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* Core offerings */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Core offerings
          </h2>
          <p className="mt-2 text-muted-foreground">
            The four building blocks of a SipLink deployment.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {solutions.map(({ title, description, icon: Icon, cta, href }) => (
              <Card
                key={title}
                className="group transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <CardTitle className="text-xl">{title}</CardTitle>
                      <CardDescription className="mt-2 text-pretty">
                        {description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-[calc(--spacing(4)+3rem+1rem)]">
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
        </div>
      </section>

      {/* Solutions by segment */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Solutions by segment
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Configurations tailored to how each industry actually works.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map(({ title, description, icon: Icon, href }) => (
            <Link key={title} href={href} className="group flex">
              <Card className="flex h-full w-full text-center transition-transform hover:-translate-y-1 hover:shadow-md">
                <CardHeader className="flex flex-1 flex-col items-center">
                  <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <CardTitle className="mt-4 text-base">{title}</CardTitle>
                  <CardDescription className="mt-2 text-pretty">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Not sure which solution fits?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Tell us how your teams work today and we will recommend a
            configuration — including porting your existing numbers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Talk to our team</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Start free trial</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
