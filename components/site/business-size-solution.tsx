import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import { CallPhone } from "@/components/site/call-phone";
import { SizeQueue } from "@/components/site/size-queue";
import { SizeRing } from "@/components/site/size-ring";
import { SizeStack } from "@/components/site/size-stack";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { businessSizes, type SizeContent } from "@/lib/business-size";
import type { SolutionDetail } from "@/lib/solutions";
import { cn } from "@/lib/utils";

/** The eight wired integrations, as a quiet strip rather than the full wall. */
const LOGOS = [
  { name: "Salesforce", src: "/integration-logos/salesforce.png" },
  { name: "Microsoft Teams", src: "/integration-logos/ms-teams.png" },
  { name: "Google Workspace", src: "/integration-logos/google-workspace.png" },
  { name: "Zendesk", src: "/integration-logos/zendesk.png" },
  { name: "MS Outlook", src: "/integration-logos/outlook.png" },
  { name: "Sugar CRM", src: "/integration-logos/sugar-crm.png" },
] as const;

/**
 * One capability, beside the phone.
 *
 * A card here rather than a row on a rule, because these four sit around a
 * device instead of running down a column — and a bordered plate is what
 * separates them from the page once they are no longer in a list. The icon is
 * the card's only ornament: the reference this follows puts a photograph in
 * each one, and there is no per-capability photography to put there.
 */
function IncludedCard({
  item,
}: {
  item: SolutionDetail["capabilities"][number];
}) {
  const Icon = item.icon;

  return (
    /* The brand wash from the homepage's feature cards, at the same corner on
       all four so it pools behind the icon rather than leaning a different
       way on each side of the phone. It stops before the middle of the card,
       which is what keeps it a tint on white and not a coloured plate — the
       body copy is always reading against `card`, never against the pink. */
    <div className="rounded-2xl border border-primary/12 bg-gradient-to-br from-brand-from/18 via-card via-45% to-card p-6 shadow-sm">
      <span className="flex size-10 items-center justify-center rounded-xl bg-card text-primary ring-1 ring-primary/15">
        <Icon className="size-5" aria-hidden />
      </span>
      <dt className="mt-4 font-medium">{item.title}</dt>
      <dd className="mt-1.5 text-sm text-pretty text-muted-foreground">
        {item.description}
      </dd>
    </div>
  );
}

function HeroVisual({ visual }: { visual: SizeContent["visual"] }) {
  if (visual === "ring") return <SizeRing />;
  if (visual === "queue") return <SizeQueue />;
  if (visual === "stack") return <SizeStack />;
  // Small Business is the only size without one, and it does not reach here.
  return null;
}

/**
 * The four "By Business Size" pages.
 *
 * One shell, four different heroes. The shell is shared because these pages
 * answer the same questions in the same order; the hero is not, because what
 * is characteristic of a three-person startup and a multi-site enterprise are
 * not the same picture at two densities — they are different pictures.
 *
 * Deliberate departures from the shared solution template: no mono caps
 * eyebrow above each section, and capabilities as a ruled list rather than a
 * grid of lifting cards.
 */
export function BusinessSizeSolution({
  solution,
  size,
}: {
  solution: SolutionDetail;
  size: SizeContent;
}) {
  const {
    group,
    title,
    tagline,
    intro,
    challenge,
    handling,
    capabilities,
    gain,
    idealFor,
  } = solution;

  const beside = size.placement === "beside";
  /* The hero is two columns whether the right half holds the size's own
     visual or a photograph — only startups currently takes the second route. */
  const heroSplit = beside || Boolean(size.heroImage);
  const aroundPhone = size.includedAs === "phone" && capabilities.length === 4;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* The photograph is the section's backdrop rather than a column
            item, the way the homepage hero carries its own: it bleeds to the
            top, bottom and right edges so it is sized by the hero instead of
            sitting in a box inside it. Hidden below `lg`, where there is no
            room beside the copy — it comes back framed, in flow, further
            down. */}
        {size.heroImage ? (
          <>
            <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
              <Image
                src={size.heroImage.src}
                alt={size.heroImage.alt}
                fill
                priority
                sizes="58vw"
                className="object-cover object-[58%_center]"
              />
              {/* Holds solid far enough right to bury the caption burnt into
                  the photograph's left edge — half-covered it read as a
                  rendering fault rather than as the picture fading out — then
                  clears by half, so the team and the cards on their side stay
                  at full strength. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-background from-14% via-background/65 via-30% to-transparent to-52%"
              />
            </div>

            {/* Gated to `lg` with the backdrop it belongs to: at phone width
                a 600px blur is wider than the hero and washes the whole thing
                pink instead of lifting one corner of a photograph. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-40 -right-28 hidden size-[600px] rounded-full bg-brand-to/10 blur-3xl lg:block"
            />
          </>
        ) : null}

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            {group}
          </Link>

          <div
            className={cn(
              "mt-8",
              heroSplit && "grid items-center gap-10 lg:gap-16",
              /* With a backdrop the copy is capped and the right column is
                 just the room the photograph shows through; with a visual
                 beside it, the visual gets the fixed half instead. */
              size.heroImage
                ? "lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)]"
                : beside && "lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]",
            )}
          >
            <div>
              <h1 className="text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-4 max-w-lg text-lg text-pretty text-primary sm:text-xl">
                {tagline}
              </p>

              {/* A checked shortlist instead of a paragraph, where the size
                  supplies one: three lines a reader scans before deciding
                  whether to keep going. The rules between them are the
                  structure — they say these are separate things, not one
                  argument running on. The intro paragraph still carries the
                  page's description in metadata. */}
              {size.heroPoints ? (
                <ul className="mt-6 max-w-lg divide-y divide-border">
                  {size.heroPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 py-3"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                        <Check className="size-3" aria-hidden />
                      </span>
                      <span className="text-pretty text-muted-foreground">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 max-w-[58ch] text-lg text-pretty text-muted-foreground">
                  {intro}
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">Talk to us</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>

            {beside ? (
              <div>
                <HeroVisual visual={size.visual} />
                <p className="mt-5 text-sm text-pretty text-muted-foreground">
                  {size.note}
                </p>
              </div>
            ) : null}

            {/* Below `lg` the backdrop is hidden, so the photograph appears
                here as an ordinary framed image instead. */}
            {size.heroImage ? (
              <div className="overflow-hidden rounded-2xl ring-1 ring-border lg:hidden">
                <Image
                  src={size.heroImage.src}
                  alt={size.heroImage.alt}
                  width={size.heroImage.width}
                  height={size.heroImage.height}
                  sizes="100vw"
                  className="h-auto w-full"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* The visual in its own section under the hero: figure left, the
          explanation reading against it on the right. The ring carries no
          controls, so the two halves are a figure and its caption rather than
          an instrument and its instructions — which is why the copy sits
          beside it at reading width instead of centred underneath. */}
      {!beside && size.feature ? (
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-10 pb-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pt-12 lg:pb-20">
            <HeroVisual visual={size.visual} />

            <div className="max-w-[56ch]">
              <p className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {size.feature.lead}
              </p>
              <p className="mt-5 text-lg text-pretty text-muted-foreground">
                {size.feature.body}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* The argument. */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {challenge.heading}
            </h2>
            <p className="mt-4 max-w-[58ch] text-pretty text-muted-foreground">
              {challenge.body}
            </p>
          </div>

          <div className="relative lg:pl-16">
            <span
              aria-hidden
              className="absolute top-0 left-0 hidden h-full w-px bg-gradient-to-b from-brand-from to-brand-to lg:block"
            />
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {handling.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {handling.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="max-w-[58ch] text-pretty text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities — an unordered set, so no numbering. */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <h2
          className={cn(
            "text-2xl font-semibold tracking-tight text-balance sm:text-3xl",
            aroundPhone && "text-center",
          )}
        >
          What&rsquo;s included
        </h2>

        {aroundPhone ? (
          /* The device in the middle with the four capabilities either side.
             The phone is what a startup's whole phone system looks like, so
             putting it at the centre and the claims around it says the thing
             the copy would otherwise have to assert. Columns fall away below
             `lg`, where the phone goes first and the cards follow. */
          <dl className="mt-12 flex flex-col items-center gap-8 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-10 xl:gap-14">
            <div className="order-2 flex w-full flex-col gap-6 lg:order-1 lg:gap-16">
              {[capabilities[0], capabilities[2]].map((item) =>
                item ? <IncludedCard key={item.title} item={item} /> : null,
              )}
            </div>

            <div className="order-1 lg:order-2">
              <CallPhone />
            </div>

            <div className="order-3 flex w-full flex-col gap-6 lg:gap-16">
              {[capabilities[1], capabilities[3]].map((item) =>
                item ? <IncludedCard key={item.title} item={item} /> : null,
              )}
            </div>
          </dl>
        ) : (
          <dl className="mt-10 grid gap-x-16 sm:grid-cols-2">
            {capabilities.map(({ title: name, description, icon: Icon }) => (
              <div
                key={name}
                className="flex items-start gap-4 border-t border-border py-5"
              >
                <Icon
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden
                />
                <div className="min-w-0">
                  <dt className="font-medium">{name}</dt>
                  <dd className="mt-1 text-sm text-pretty text-muted-foreground">
                    {description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        )}
      </section>

      {/* Who it fits, and what it buys you. */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
          {idealFor ? (
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Ideal for
              </h2>
              <ul className="mt-6 space-y-3">
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
          ) : (
            <div />
          )}

          <div className="rounded-2xl bg-background p-8 ring-1 ring-border">
            <h2 className="text-2xl font-semibold tracking-tight text-balance">
              {gain.heading}
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">{gain.body}</p>
            <Separator className="my-6" />
            <Link
              href="/contact"
              className="text-sm font-medium text-primary hover:underline"
            >
              Talk to us about {title}
            </Link>
          </div>
        </div>
      </section>

      {/* Integrations. Named because the logos alone are a claim without a
          subject — what matters is that calling reaches these, not that the
          artwork exists. */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance">
              Calling, where the work already happens
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Where supported, calls connect to the CRM and business
              applications your teams use — so a conversation is logged against
              the customer rather than remembered separately.
            </p>
          </div>

          <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-6">
            {LOGOS.map((logo) => (
              <li
                key={logo.name}
                className="flex aspect-[3/2] items-center justify-center bg-card p-4"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={60}
                  className="h-7 w-auto max-w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Questions a buyer at this size actually asks. */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Questions at this size
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {size.faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[68ch] text-pretty text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* The other three sizes. Plain navigation — the pages no longer share
          a diagram to preview, so pretending otherwise would be decoration. */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Not quite your size?
        </h2>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {businessSizes.map((other) => {
            const current = other.slug === size.slug;
            return (
              <li key={other.slug}>
                <Link
                  href={`/solutions/${other.slug}`}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "flex h-full flex-col justify-between gap-6 p-6 transition-colors",
                    current
                      ? "bg-accent"
                      : "bg-card hover:bg-muted focus-visible:bg-muted",
                  )}
                >
                  <span className="text-lg font-medium">{other.short}</span>
                  <span className="text-sm text-muted-foreground">
                    {current ? "You are here" : "See this size"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Let&rsquo;s map this to your business
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
              <Link href="/solutions">All solutions</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
