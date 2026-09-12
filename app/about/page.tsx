import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Phone, Quote, UserRound } from "lucide-react";

import { LinkedInLogo, socialIcons } from "@/components/site/social-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { founder, leadership, purpose, type Person } from "@/lib/about";
import {
  assurances,
  industries,
  offices,
  reliability,
  site,
  social,
  whyChoose,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "SipLink Communications has been building business voice since 2012 — cloud telephony, SIP trunking and unified communications for growing organisations.",
};

/**
 * Founding dates come from the sales brochure. Sources disagree on the ISP
 * licence year, so only the two dates the brochure states are shown here.
 * See details-content.md §20.1.
 */
const milestones = [
  { year: "2012", label: "SipLink started" },
  { year: "2014", label: "Incorporated" },
  { year: "10,000+", label: "Customers served" },
];

/**
 * About page.
 *
 * The page opens straight into a pinned stack, after the reference the client
 * supplied: the office photograph pins under the header and the Our Story card scrolls
 * up over it; then About Us slides over the photograph and pins in turn,
 * and Founder's Insight slides over that. It is all `position: sticky` on
 * siblings inside one parent — no scroll listeners. When the parent ends,
 * the stack releases and the page scrolls on.
 *
 * Two rules keep it working:
 * - No ancestor of the stack may set `overflow` (hidden, auto or clip) —
 *   that silently switches sticky off.
 * - A pinned panel must fit the viewport, because anything below its fold is
 *   covered before it can be read. So the About Us panel only pins through
 *   the `pin:` variant (see globals.css), which also checks viewport height.
 *   The photograph and Our Story card don't have that problem — the card
 *   scrolls rather than pins — so they overlap from `md` up at any height;
 *   on a short screen About Us simply scrolls over the pinned photograph.
 *   Below `md` everything stacks, image above text.
 *
 * `top-20` and `5rem` match the fixed SiteHeader's `h-20`.
 */
export default function AboutPage() {
  const operating = offices.filter((office) => office.kind === "operating");
  const registered = offices.filter((office) => office.kind === "registered");
  const sectors = new Intl.ListFormat("en", { type: "conjunction" }).format(
    industries.map((industry) => industry.title),
  );

  return (
    <>
      {/* Pinned stack — the page's opening screen. Nothing between here and
          <main> may set overflow. */}
      <div className="relative">
        {/* Layer 0 — the photograph, pinned for the whole stack. */}
        <div className="relative h-[55svh] md:sticky md:top-20 md:h-[calc(100svh-5rem)]">
          {/* next/image's `fill` check rejects a sticky parent, so the image
              fills a relative box inside it. */}
          <div className="relative size-full">
            <Image
              src="/about/images.jpg"
              alt="An open-plan office with rows of desks and ergonomic chairs under exposed ducts, with yellow accent walls"
              fill
              preload
              sizes="100vw"
              className="about-hero-in object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-l from-foreground/45 via-foreground/10 to-transparent"
          />
        </div>

        {/* Layer 1 — Our Story. A plain white card, set centred in the brand
            colour, that scrolls up over the pinned photograph. */}
        <section
          aria-labelledby="our-story"
          className="relative z-1 px-6 py-16 md:-mt-[calc(100svh-5rem)] md:pt-[12svh] md:pb-[40svh] lg:px-10"
        >
          <div className="mx-auto flex max-w-7xl justify-end">
            <article className="about-rise-in w-full max-w-2xl bg-background text-center md:px-12 md:py-14 lg:px-16 lg:py-16">
              <h1
                id="our-story"
                className="font-heading text-5xl font-light tracking-tight text-primary sm:text-6xl xl:text-7xl"
              >
                Vission
              </h1>

              <div className="mt-10 space-y-8 text-lg leading-relaxed font-light text-pretty text-primary lg:text-xl">
                <p>
                  {site.legalName} started in January 2012 and was incorporated
                  in 2014. We build business communication on reliable SIP
                  technology — voice, messaging and real-time calling for teams
                  and the customers they serve.
                </p>
                <p>
                  Over the years we have helped businesses migrate from
                  traditional systems to IP-based solutions that reduce cost
                  and improve productivity — backed by people who pick up,
                  24/7.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Layer 2 — About Us. Slides over the photograph, then pins: a light
            text panel beside a full-height photograph, in a slate frame.
            Copy is kept short so the panel fits a pinned laptop screen. */}
        <section
          aria-labelledby="about-us"
          className="relative z-10 bg-muted-foreground p-4 sm:p-6 lg:p-9 pin:sticky pin:top-20 pin:h-[calc(100svh-5rem)]"
        >
          <div className="grid h-full lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div className="flex flex-col justify-center bg-muted px-6 py-14 sm:px-12 xl:px-24 pin:py-8">
              <div className="about-rise">
                <h2
                  id="about-us"
                  className="font-heading text-5xl font-light tracking-tight text-foreground/85 sm:text-6xl"
                >
                  About Us
                </h2>
                <div className="mt-8 space-y-6 text-base leading-relaxed font-light text-pretty text-foreground/85 xl:text-lg">
                  <p>
                    {site.name} is a DoT-certified, HIPAA-compliant provider of
                    cloud telephony — hosted PBX, SIP trunking, call centre and
                    unified communications — run from Chennai, Bangalore and
                    Hyderabad.
                  </p>
                  <p>
                    Our direct IP routes are chosen for stability, rate and
                    voice quality, and real-time monitoring picks the best route
                    for every call — so quality holds as you grow.
                  </p>
                  <p>We serve teams across {sectors}.</p>
                </div>
              </div>
            </div>

            <div className="relative order-first min-h-[45svh] lg:order-none lg:min-h-0">
              <Image
                src="/about/residential-service.webp"
                alt="A professional on a phone call at a laptop, working by a sunlit window"
                fill
                sizes="(min-width: 64rem) 40vw, 100vw"
                className="object-cover object-[48%_center]"
              />
            </div>
          </div>
        </section>

        {/* Layer 3 — Founder's Insight. Slides over How we work; the stack
            releases when this panel ends. */}
        <section
          aria-labelledby="founder"
          className="relative z-20 bg-background pin:flex pin:h-[calc(100svh-5rem)] pin:items-center"
        >
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 hidden w-[22%] bg-primary pin:block"
          />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-20 lg:px-10 pin:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] pin:gap-20 pin:py-0">
            <Portrait
              person={founder}
              sizes="(min-width: 64rem) 20rem, 20rem"
              className="w-full max-w-xs pin:max-w-none pin:shadow-2xl"
            />

            <article className="about-rise max-w-2xl">
              <p className="font-mono text-xs tracking-widest text-primary uppercase">
                A word from the founder
              </p>
              <h2
                id="founder"
                className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
              >
                Founder&rsquo;s Insight
              </h2>

              <figure className="mt-8">
                <Quote
                  className="size-7 rotate-180 fill-primary/15 text-primary/30"
                  aria-hidden
                />
                <blockquote className="mt-4 space-y-4 text-lg leading-relaxed text-pretty text-muted-foreground italic lg:text-xl">
                  {founder.message.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-heading text-lg font-semibold text-primary">
                    {founder.name}
                  </span>
                  <PlaceholderBadge person={founder} />
                  <span className="w-full text-sm text-muted-foreground">
                    {founder.title}
                  </span>
                </figcaption>
              </figure>
            </article>
          </div>
        </section>
      </div>

      {/* Vision / Mission / Values */}
      <section
        aria-labelledby="purpose"
        className="border-t border-border"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-widest text-primary uppercase">
                What drives us
              </p>
              <h2
                id="purpose"
                className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
              >
                Vision, mission and values
              </h2>
            </div>

            <dl className="flex flex-wrap gap-x-12 gap-y-6">
              {milestones.map(({ year, label }) => (
                <div key={label}>
                  <dt className="font-heading text-3xl font-semibold tracking-tight text-primary">
                    {year}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {purpose.map(({ title, statement, icon: Icon }) => (
              <Card key={title} className="about-rise h-full gap-5 p-2">
                <CardHeader className="gap-4">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="text-xl font-semibold">
                    <h3>{title}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed text-pretty text-muted-foreground">
                    {statement}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose SipLink */}
      <section
        aria-labelledby="why-choose"
        className="border-t border-border bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              Why SipLink
            </p>
            <h2
              id="why-choose"
              className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              What we bring beyond the platform
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[...whyChoose, ...reliability].map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section
        aria-labelledby="leadership"
        className="border-t border-border"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              Leadership
            </p>
            <h2
              id="leadership"
              className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              The people behind SipLink
            </h2>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
              The team responsible for the network, the platform and the
              support behind it.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person, index) => (
              <li key={`${person.name}-${index}`}>
                <Card className="about-rise h-full gap-0 pt-0">
                  <Portrait
                    person={person}
                    sizes="(min-width: 64rem) 18rem, (min-width: 48rem) 45vw, 100vw"
                    className="rounded-none ring-0"
                  />
                  <CardHeader className="pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-heading text-base font-semibold">
                          {person.name}
                        </h3>
                        <CardDescription className="mt-0.5">
                          {person.title}
                        </CardDescription>
                      </div>
                      <LinkedInLink person={person} />
                    </div>
                    <PlaceholderBadge person={person} className="mt-2" />
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SipLink Assure */}
      <section
        aria-labelledby="assure"
        className="border-t border-border bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              SipLink Assure
            </p>
            <h2
              id="assure"
              className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              What every customer gets
            </h2>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
              From design through to day-to-day operation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assurances.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="h-full">
                <CardHeader>
                  <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="text-lg">
                    <h3>{title}</h3>
                  </CardTitle>
                  <CardDescription className="leading-relaxed text-pretty">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Where to find us — addresses and social, above the site footer */}
      <section
        aria-labelledby="find-us"
        className="border-t border-border"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-20 lg:px-10">
          <div>
            <h2
              id="find-us"
              className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Where to find us
            </h2>

            <div className="mt-10 grid gap-10 sm:grid-cols-3">
              {operating.map((office) => (
                <div key={office.city}>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <MapPin className="size-4 text-primary" aria-hidden />
                    {office.city}
                  </h3>
                  <address className="mt-3 text-sm leading-relaxed text-muted-foreground not-italic">
                    {office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Phone className="size-4" aria-hidden />
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>

            {registered.map((office) => (
              <p
                key={office.city}
                className="mt-10 flex items-start gap-3 text-sm text-muted-foreground"
              >
                <Building2 className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  <span className="font-medium text-foreground">
                    {office.entity}
                  </span>{" "}
                  — US registered entity, {office.address.join(", ")}
                </span>
              </p>
            ))}
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Follow {site.name}
            </h2>
            <ul className="mt-10 flex flex-wrap gap-3">
              {social.map(({ label, href }) => {
                const Icon = socialIcons[label];
                return (
                  <li key={label}>
                    <Button asChild variant="outline" size="icon-lg">
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${site.name} on ${label}`}
                      >
                        <Icon className="size-5" />
                      </a>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center lg:px-10">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance">
            Let&rsquo;s talk
          </h2>
          <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
            Discover what makes SipLink different — book a walkthrough with our
            team.
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

/** 4:5 portrait, or a neutral avatar until SipLink supplies a photo. */
function Portrait({
  person,
  sizes,
  className,
}: {
  person: Person;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-4/5 overflow-hidden rounded-2xl bg-muted ring-1 ring-border",
        className,
      )}
    >
      {person.photo ? (
        <Image
          src={person.photo}
          alt={`Portrait of ${person.name}, ${person.title}`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label="Portrait to be supplied"
          className="flex size-full items-center justify-center text-muted-foreground/35"
        >
          <UserRound className="size-1/3" strokeWidth={1.25} aria-hidden />
        </div>
      )}
    </div>
  );
}

function LinkedInLink({ person }: { person: Person }) {
  if (!person.linkedin) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        disabled
        aria-label="LinkedIn profile to be added"
        className="shrink-0"
      >
        <LinkedInLogo className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      size="icon-sm"
      className="shrink-0 text-muted-foreground hover:text-primary"
    >
      <a
        href={person.linkedin}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${person.name} on LinkedIn`}
      >
        <LinkedInLogo className="size-4" />
      </a>
    </Button>
  );
}

/** Visible marker on content still waiting for real details. */
function PlaceholderBadge({
  person,
  className,
}: {
  person: Person;
  className?: string;
}) {
  if (!person.placeholder) return null;

  return (
    <Badge
      variant="outline"
      className={cn("border-dashed font-mono text-[10px] tracking-wider", className)}
    >
      TO CONFIRM
    </Badge>
  );
}
