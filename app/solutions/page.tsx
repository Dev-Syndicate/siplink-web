import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  platformFeatures,
  segments,
  solutions,
  ucaasBenefits,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Hosted PBX, SIP trunking, enhanced call centre and unified communications — cloud voice infrastructure for growing businesses.",
};

/**
 * A port label per core solution, keyed to what each one actually is in the
 * call path — PBX is the switch core, SIP trunking is the trunk in, the call
 * centre is the ACD queue, UC is the endpoint layer. Order matches `solutions`.
 * These are telecom vernacular, not real addresses.
 */
const portLabels: Record<string, string> = {
  "Hosted PBX": "PBX.CORE",
  "SIP Trunking": "SIP.TRUNK",
  "Enhanced Call Centre": "ACD.QUEUE",
  "Unified Communications": "SIP.UA",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero — a stated thesis beside a live routing panel */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-24 size-[560px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:py-28">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              <span className="text-primary">◤</span> Solutions / Cloud voice
              fabric
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Every call takes the{" "}
              <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                shortest path
              </span>{" "}
              to the right person.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              Four layers of cloud voice infrastructure — trunk, switch,
              distribute, connect — engineered to be fault tolerant, scalable,
              and native to the tools your teams already use.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Book a demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>

          {/* Routing panel — the signature element. The four core solutions
              rendered as a patch bay, one row per layer of the path. */}
          <div className="relative rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-3">
              <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                call.route
              </span>
              <span className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] text-primary uppercase">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                </span>
                live
              </span>
            </div>

            {/* Animated packet travelling the spine of the panel */}
            <div className="relative">
              <svg
                aria-hidden
                className="pointer-events-none absolute top-0 left-[2.15rem] h-full w-2 -translate-x-1/2 text-primary"
                viewBox="0 0 4 400"
                preserveAspectRatio="none"
              >
                <line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="400"
                  className="stroke-border"
                  strokeWidth="1.5"
                />
                <line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="400"
                  className="flow-path stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <ol className="relative divide-y divide-border">
                {solutions.map(
                  ({ title, description, icon: Icon, href }) => (
                    <li key={title}>
                      <Link
                        href={href}
                        className="group flex items-start gap-4 px-5 py-4 transition-colors hover:bg-muted/50"
                      >
                        <span className="relative z-10 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-[1.15rem]" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-3">
                            <span className="font-medium">{title}</span>
                            <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground">
                              {portLabels[title]}
                            </span>
                          </span>
                          <span className="mt-1 line-clamp-2 block text-sm text-pretty text-muted-foreground">
                            {description}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="mt-1 size-4 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Core offerings — the ordered layers, expanded. Numbering is honest
          here: signal genuinely passes through them in sequence. */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                The signal path
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Four building blocks, one deployment
              </h2>
            </div>
            <p className="max-w-sm text-sm text-pretty text-muted-foreground">
              A call enters on a trunk, switches through the PBX, is distributed
              by the queue, and lands on any endpoint — desk, mobile or app.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {solutions.map(({ title, description, icon: Icon, cta, href }, i) => (
              <div
                key={title}
                className="group relative flex flex-col bg-card p-8 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span
                    className="font-mono text-sm font-medium tracking-widest text-muted-foreground/60 tabular-nums"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 flex-1 text-pretty text-muted-foreground">
                  {description}
                </p>
                <Link
                  href={href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  {cta}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform features — an unordered capability set, so no numbering */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            Platform
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Everything your teams need, on one platform
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Call management, supervision and reporting — delivered from the
            cloud and reachable from any device.
          </p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {platformFeatures.map(({ title, description, icon: Icon }) => (
            <div key={title} className="group border-t border-border py-6">
              <div className="flex items-center gap-3">
                <Icon
                  className="size-5 text-primary transition-transform group-hover:-translate-y-0.5"
                  aria-hidden
                />
                <h3 className="font-medium">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-pretty text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* UCaaS benefits */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Why teams move to SipLink UCaaS
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              One cloud platform instead of separate systems for calls, video,
              messaging and integrations.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ucaasBenefits.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="h-full">
                <CardHeader>
                  <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="text-pretty">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions by segment */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            By segment
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Configured for how each team actually works
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            The same fabric, tuned to the volume, compliance and integrations
            each industry runs on.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map(({ title, description, icon: Icon, href }) => (
            <Link key={title} href={href} className="group flex">
              <Card className="flex h-full w-full flex-col transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                <CardHeader className="flex-1">
                  <span className="flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <CardTitle className="mt-4 text-base">{title}</CardTitle>
                  <CardDescription className="mt-2 text-pretty">
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore
                    <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-14 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-brand-to/10 blur-3xl"
            />
            <div className="relative">
              <Badge variant="outline" className="mb-5 font-mono">
                Number porting included
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Not sure which layer you need?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
                Tell us how your teams work today and we&rsquo;ll recommend a
                configuration — and port your existing numbers across.
              </p>
              <Separator className="mx-auto my-9 max-w-24" />
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Book a demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
