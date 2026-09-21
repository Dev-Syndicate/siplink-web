import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IndustryIllustration } from "@/components/site/industry-illustration";
import { getIndustryDetail, industryDetails } from "@/lib/industries-detail";
import { site } from "@/lib/site";

/**
 * Legacy / brochure industry slugs that appear elsewhere on the site (the
 * homepage `industries` set, older links) but are not part of the eleven
 * nav-aligned industry pages. They resolve to the closest current vertical so
 * no link 404s and there is one canonical page per industry.
 */
const industryRedirects: Record<string, string> = {
  "medical-billing-rcm": "/industries/healthcare",
  staffing: "/industries/call-centers",
  "it-software": "/industries/it-saas",
  "tech-saas": "/industries/it-saas",
  "marketing-sales": "/industries/retail",
  "financial-services": "/industries/banking-finance",
  tech: "/industries/it-saas",
};

export function generateStaticParams() {
  return industryDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryDetail(slug);
  if (!industry) return {};
  return {
    title: `${industry.title} — Industries`,
    description: industry.intro,
  };
}

export default async function IndustryDetailPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const { slug } = await params;

  const redirectTo = industryRedirects[slug];
  if (redirectTo) redirect(redirectTo);

  const industry = getIndustryDetail(slug);
  if (!industry) notFound();

  const {
    title,
    icon: Icon,
    tagline,
    intro,
    parties,
    challenge,
    handling,
    flow,
    capabilities,
    idealFor,
    gain,
  } = industry;

  const isHealthcare = slug === "healthcare";
  const related = industryDetails.filter((item) => item.slug !== slug);

  /* Section anchors for the sticky rail's jump nav. */
  const sections = [
    { id: "challenge", label: "The challenge" },
    { id: "flow", label: "How it flows" },
    { id: "capabilities", label: "Capabilities" },
    { id: "fit", label: "Is it for you" },
  ];

  return (
    <>
      {/* ── Hero: full-width, text left / working-scene right, sized to fit
            the viewport. The party chips + breadcrumb keep it distinct from
            the product hero. ──────────────────────────────────────────────── */}
      <section className="relative -mt-20 overflow-hidden border-b border-border pt-20 sm:-mt-30 sm:pt-30">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-24 size-[560px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <nav className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            <Link href="/industries" className="transition-colors hover:text-primary">
              Industries
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground">{title}</span>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-16">
            {/* left: the pitch */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm">
                <Icon className="size-3.5" aria-hidden />
                SipLink for {title}
              </span>
              <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {tagline}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
                {intro}
              </p>

              {/* who's on the line — doc-derived party list */}
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  On the line
                </span>
                {parties.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium shadow-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">Talk to us</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>

            {/* right: the working scene */}
            <div className="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm sm:p-8">
              <IndustryIllustration slug={slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Body: sticky identity rail + scrolling story. The two-column
            dossier layout is the page's signature and is not used on the
            product page. ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 py-16 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16 lg:py-24">
          {/* sticky rail */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="size-7" aria-hidden />
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">{tagline}</p>

            {isHealthcare ? (
              <Badge variant="secondary" className="mt-4 rounded-full">
                <Check className="size-3" aria-hidden />
                HIPAA compliant
              </Badge>
            ) : null}

            {/* jump nav — echoes a documentation/dossier feel */}
            <nav className="mt-8 hidden border-l border-border lg:block">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </nav>

            {/* compact contact card pinned in the rail */}
            <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-5">
              <p className="text-sm font-medium">Talk to a specialist</p>
              <p className="mt-1 text-sm text-pretty text-muted-foreground">
                We&rsquo;ll map SipLink to how your {title.toLowerCase()} teams
                work today.
              </p>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Phone className="size-4" aria-hidden />
                {site.phone}
              </a>
            </div>
          </aside>

          {/* scrolling content */}
          <div className="min-w-0 space-y-20 lg:space-y-28">
            {/* Challenge, then the SipLink answer as a single emphasized panel
                — the turn from problem to solution is marked by the eyebrow and
                the gradient rule, not by an empty twin card. */}
            <section id="challenge" className="scroll-mt-28">
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                The challenge
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {challenge.heading}
              </h3>
              <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
                {challenge.body}
              </p>

              <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary/30 bg-background p-6 shadow-sm sm:p-8">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-from to-brand-to"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-brand-to/10 blur-2xl"
                />
                <p className="relative font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
                  How SipLink helps · {handling.heading}
                </p>
                <div className="relative mt-4 grid gap-4 sm:grid-cols-2 sm:gap-8">
                  {handling.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-pretty text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* How a conversation flows — a real sequence, so numbering is honest */}
            <section id="flow" className="scroll-mt-28">
              <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                How a conversation flows
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Every interaction, handled end to end
              </h3>

              <ol className="mt-8 grid gap-4 sm:grid-cols-3">
                {flow.map((step, i) => (
                  <li
                    key={step.label}
                    className="relative rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <step.icon className="size-4" aria-hidden />
                      </span>
                      <span className="font-mono text-sm font-semibold text-primary/40 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-4 font-medium">{step.label}</p>
                    <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                      {step.detail}
                    </p>
                    {i < flow.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute top-1/2 -right-2.5 z-10 hidden size-5 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-primary sm:flex"
                      >
                        <ArrowRight className="size-3" aria-hidden />
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>

            {/* Capabilities — editorial numbered list with an outcome per row,
                not the product page's 3-col card grid */}
            <section id="capabilities" className="scroll-mt-28">
              <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                What you get
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Built for {title.toLowerCase()}
              </h3>

              <div className="mt-8 divide-y divide-border border-y border-border">
                {capabilities.map(
                  ({ title: name, description, outcome, icon: PointIcon }, i) => (
                    <div
                      key={name}
                      className="group grid gap-4 py-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6"
                    >
                      <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                        <span className="font-mono text-sm font-semibold text-primary/40 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <PointIcon className="size-5" aria-hidden />
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold tracking-tight">
                          {name}
                        </h4>
                        <p className="mt-1.5 max-w-2xl text-pretty text-muted-foreground">
                          {description}
                        </p>
                        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                          <ArrowUpRight className="size-4" aria-hidden />
                          {outcome}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>

            {/* Is it for you — ideal-for + the payoff */}
            <section id="fit" className="scroll-mt-28">
              <div className="grid gap-8 rounded-3xl border border-border bg-muted/30 p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
                <div>
                  <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Ideal for
                  </p>
                  <ul className="mt-5 space-y-3">
                    {idealFor.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="size-3" aria-hidden />
                        </span>
                        <span className="text-pretty text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:border-l lg:border-border lg:pl-12">
                  <h3 className="text-xl font-semibold tracking-tight text-balance">
                    {gain.heading}
                  </h3>
                  <p className="mt-4 text-pretty text-muted-foreground">
                    {gain.body}
                  </p>
                  <Button asChild className="mt-6">
                    <Link href="/contact">
                      Talk to us about {title.toLowerCase()}
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ── Related industries — a clean link-card grid ─────────────────── */}
      {related.length ? (
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  Explore more
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Other industries we serve
                </h2>
              </div>
              <Link
                href="/industries"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:inline-flex"
              >
                All industries
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(
                ({ slug: rSlug, title: rTitle, tagline: rTagline, icon: RIcon }) => (
                  <Link
                    key={rSlug}
                    href={`/industries/${rSlug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <RIcon className="size-5" aria-hidden />
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
                    </div>
                    <p className="mt-4 font-semibold tracking-tight">{rTitle}</p>
                    <p className="mt-1 text-sm text-pretty text-muted-foreground">
                      {rTagline}
                    </p>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Let&rsquo;s map this to your {title.toLowerCase()} workflows
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Tell us how your teams communicate today and we&rsquo;ll recommend a
          configuration — including porting your existing numbers.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Talk to us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/industries">All industries</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
