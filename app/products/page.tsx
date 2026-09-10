import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { ConversationFlow } from "@/components/site/conversation-flow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  aiCapabilities,
  buildYourOwn,
  customerShapes,
  industryOutcomes,
  platformProof,
} from "@/lib/product-story";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Follow a customer conversation from the number they dial to the insight it becomes — voice, contact centre, APIs and AI on one network.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero — the thesis: a conversation, not a catalogue */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-24 size-[640px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-10 lg:pt-28 lg:pb-20">
          <Badge variant="secondary" className="font-mono tracking-widest">
            THE SIPLINK PLATFORM
          </Badge>

          <h1 className="font-heading mt-6 max-w-4xl text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Every customer conversation,{" "}
            <span className="text-primary">from hello to insight</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-pretty text-muted-foreground lg:text-xl">
            A call reaches you, gets routed, is handled, and becomes something
            you can act on. SipLink is the platform underneath all four — voice,
            contact centre, messaging and APIs on one network, in 150+
            countries.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#lifecycle">See how it works</Link>
            </Button>
          </div>

          {/* Proof, stated plainly */}
          <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4">
            {platformProof.map(({ value, label, footnote }) => (
              <div key={label} className="bg-background p-6">
                <dt className="font-heading text-3xl font-semibold tracking-tight text-primary">
                  {value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {label}
                  {footnote ? <sup className="ml-0.5">*</sup> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Signature: the conversation lifecycle */}
      <section
        id="lifecycle"
        className="scroll-mt-24 border-b border-border bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              The life of a conversation
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Find your problem, not our product list
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Most communication problems sit at one of four moments. Choose the
              one that sounds like your business.
            </p>
          </div>

          <div className="mt-14">
            <ConversationFlow />
          </div>
        </div>
      </section>

      {/* Industries — the brief's priority: who we serve, and how */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Who we serve
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              The same platform, shaped by your sector
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              A billing team and a logistics dispatcher need very different
              things from a phone system. Here is what changes.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2">
            {industryOutcomes.map(
              ({ industry, challenge, outcome, icon: Icon, href }) => (
                <Link
                  key={industry}
                  href={href}
                  className="group flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-heading text-lg font-semibold tracking-tight">
                      {industry}
                    </h3>
                  </div>

                  <p className="text-sm font-medium text-foreground">
                    {challenge}
                  </p>
                  <p className="text-sm text-pretty text-muted-foreground">
                    {outcome}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary">
                    Explore {industry}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* AI — called out, as the brief asks */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
            <div>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Intelligence
              </span>
              <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Knowing what was said, not just that someone called
              </h2>
              <p className="mt-4 text-pretty text-background/70">
                Transcription, summaries and automation turn conversations into
                information your teams can search, review and act on.
              </p>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="mt-8 w-fit"
              >
                <Link href="/products/ai-voice-assistant">
                  Explore AI capabilities
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl bg-background/15 sm:grid-cols-2">
              {aiCapabilities.map(
                ({ title, description, icon: Icon, conditional }) => (
                  <div key={title} className="bg-foreground p-7">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-heading mt-4 text-lg font-semibold tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-pretty text-background/70">
                      {description}
                    </p>
                    {conditional ? (
                      <p className="mt-3 font-mono text-[11px] tracking-wide text-background/45 uppercase">
                        Where enabled
                      </p>
                    ) : null}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Who buys */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Built for
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              From a first shared line to a global estate
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {customerShapes.map(({ title, description, icon: Icon, href }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col rounded-2xl border border-border p-7 transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:border-primary/40 focus-visible:outline-none"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-heading mt-5 text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Developers */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
            <div>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                For developers
              </span>
              <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {buildYourOwn.heading}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                {buildYourOwn.body}
              </p>
            </div>

            <ul className="grid gap-px self-start overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
              {buildYourOwn.products.map(({ title, slug, note }) => (
                <li key={slug} className="bg-background">
                  <Link
                    href={`/products/${slug}`}
                    className="group flex h-full items-start justify-between gap-4 p-6 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-sm font-medium">
                        {title}
                      </span>
                      <span className="mt-1.5 block text-sm text-pretty text-muted-foreground">
                        {note}
                      </span>
                    </span>
                    <ArrowRight
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Tell us how your customers reach you today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            We will map it to a configuration, plan the migration and port your
            existing numbers — before you commit to anything.
          </p>

          <ul className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:justify-center sm:gap-6">
            {[
              "No obligation",
              "Talk to an engineer",
              "Migration planned with you",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>

          <p className="mt-12 text-xs text-muted-foreground/70">
            * Port availability figure as stated in current service
            documentation. Certifications and availability commitments are
            subject to scope and confirmation.
          </p>
        </div>
      </section>
    </>
  );
}
