import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { industries } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Cloud communication solutions for healthcare, financial services, technology, government, education, and staffing and recruiting.",
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-32 size-[540px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-12 pb-20 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              Industry verticals
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Built around how your sector works
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              The same platform, configured for the demands of each industry —
              from HIPAA-compliant patient lines to high-volume recruiting desks.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Book a demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/solutions">Browse solutions</Link>
              </Button>
            </div>
          </div>

          <Image
            src="/images/industry-verticals.png"
            alt="A cloud phone dashboard connected to healthcare, recruitment, retail and customer support teams"
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* Industry grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map(
            ({ title, description, icon: Icon, href, badge }) => (
              <Card
                key={title}
                className="group flex flex-col transition-shadow hover:shadow-md"
              >
                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    {badge ? (
                      <Badge variant="secondary" className="rounded-full">
                        <ShieldCheck className="size-3" aria-hidden />
                        {badge}
                      </Badge>
                    ) : null}
                  </div>
                  <CardTitle className="mt-4 text-xl">{title}</CardTitle>
                  <CardDescription className="mt-2 text-pretty">
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    Explore solutions
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Don&apos;t see your industry?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Our solutions are configured per deployment. Tell us how your teams
            communicate today and we will map it to a plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/solutions">Browse solutions</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
