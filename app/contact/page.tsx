import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";

import { RevealGroup } from "@/components/site/reveal-group";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ContactForm } from "@/components/site/contact-form";
import { offices, site, supportChannels } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to SipLink about cloud telephony, SIP trunking and call centre solutions. Offices in Chennai, Bangalore and Hyderabad.",
};

export default function ContactPage() {
  const operating = offices.filter((o) => o.kind === "operating");
  const registered = offices.filter((o) => o.kind === "registered");

  return (
    <>
      <ContactHero />

      {/* Support channels */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              Support, however you prefer to reach us
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              We support our customers around the clock, across every channel.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportChannels.map(({ title, description, icon: Icon }, i) => (
              <GlowCard key={title} index={i}>
                <CardHead icon={Icon} label={`Channel ${String(i + 1).padStart(2, "0")}`}>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHead>
                <CardContent className="px-6 pt-5 pb-6">
                  <CardDescription className="text-sm text-pretty">
                    {description}
                  </CardDescription>
                </CardContent>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Our offices
          </h2>
          <p className="mt-3 text-muted-foreground">
            Operating offices across India.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {operating.map((office, i) => (
              <GlowCard key={office.city} index={i}>
                <CardHead icon={MapPin} label={`Office ${String(i + 1).padStart(2, "0")}`}>
                  <h3 className="text-xl font-semibold tracking-tight">{office.city}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{office.entity}</p>
                </CardHead>
                <CardContent className="flex flex-1 flex-col gap-4 px-6 pt-5 pb-6">
                  <address className="text-sm text-muted-foreground not-italic">
                    {office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                    className="group/call mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 px-3.5 py-1.5 text-sm font-medium text-primary transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-brand-to hover:to-brand-from hover:text-primary-foreground hover:shadow-md hover:shadow-primary/30"
                  >
                    <Phone className="size-4" aria-hidden />
                    {office.phone}
                  </a>
                </CardContent>
              </GlowCard>
            ))}
          </div>

          {registered.map((office) => (
            <div
              key={office.city}
              className="mt-6 flex items-start gap-3 rounded-lg border border-dashed border-border px-5 py-4"
            >
              <Building2
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <div className="text-sm">
                <p className="font-medium">
                  {office.entity}{" "}
                  <Badge variant="secondary" className="ml-1 align-middle">
                    US registered entity
                  </Badge>
                </p>
                <p className="mt-1 text-muted-foreground">
                  {office.address.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/**
 * A card in the pricing plans' style: a hairline border that lights into a
 * travelling brand glow on hover, a lift, and layered pink elevation.
 * `index` staggers the border lights so neighbours never run in step.
 */
function GlowCard({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div
      className="group/tier relative h-full transition-transform duration-500 ease-out hover:-translate-y-2"
      style={{ "--glow-delay": `${-index * 3}s` } as CSSProperties}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 -bottom-4 -z-10 h-12 rounded-full bg-primary/15 blur-2xl transition-all duration-500 group-hover/tier:inset-x-3 group-hover/tier:bg-primary/30"
      />
      <span
        aria-hidden
        className="pricing-glow-border pointer-events-none absolute -inset-1 -z-10 rounded-[1.9rem] opacity-30 blur-lg transition-opacity duration-500 group-hover/tier:opacity-90"
      />
      <div className="pricing-glow-border pricing-elevate h-full rounded-[1.85rem] p-px">
        <Card className="h-full gap-0 overflow-hidden rounded-[1.8rem] border-0 py-0 ring-0">
          {children}
        </Card>
      </div>
    </div>
  );
}

/** A blush card head with a dot texture and the icon as a watermark. */
function CardHead({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-accent via-accent/60 to-card px-6 pt-5 pb-5">
      <span aria-hidden className="pricing-dots pointer-events-none absolute inset-0 text-primary/25" />
      <Icon
        aria-hidden
        strokeWidth={1.25}
        className="pointer-events-none absolute -right-5 -bottom-8 size-32 -rotate-12 text-primary/10 transition-transform duration-700 ease-out group-hover/tier:rotate-0 group-hover/tier:scale-110"
      />
      <div className="relative">
        <span className="font-mono text-[10px] tracking-widest text-primary uppercase">{label}</span>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-card text-primary shadow-md shadow-primary/10 ring-1 ring-primary/15 transition-transform duration-500 group-hover/tier:-rotate-6 group-hover/tier:scale-105">
            <Icon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * The top of the contact page: the invitation on the left, with the direct
 * lines and a picture of the desk the enquiry lands on, and the enquiry form
 * on the right. On a phone the form follows the invitation, and the picture
 * is left out to keep the way to the form short.
 */
function ContactHero() {
  const direct = [
    {
      label: "Prefer email?",
      value: site.email,
      href: `mailto:${site.email}`,
      icon: Mail,
    },
    {
      label: "Rather call?",
      value: site.phone,
      href: `tel:${site.phone.replace(/\s/g, "")}`,
      icon: Phone,
    },
  ];

  return (
    <section className="relative isolate overflow-hidden">
      {/* A blush wash, a faint grid and two soft lights, all behind the
          content. The grid is the pricing page's, for a shared texture. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/70 via-background to-background" />
        <div className="pricing-grid absolute inset-x-0 top-0 h-[46rem]" />
        <div className="absolute -top-48 -left-40 size-[36rem] rounded-full bg-brand-from/20 blur-3xl" />
        <div className="absolute top-1/3 -right-48 size-[32rem] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 pt-10 pb-20 sm:px-8 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-16 lg:px-10 lg:pt-16 lg:pb-28">
        <RevealGroup className="lg:sticky lg:top-36">
          <p className="reveal-item flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
            <span aria-hidden className="h-px w-8 bg-primary/60" />
            Let&rsquo;s build something great
          </p>

          <h1
            className="reveal-item mt-6 font-heading text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98] font-semibold tracking-[-0.045em]"
            style={{ "--reveal-index": 1 } as CSSProperties}
          >
            Have an idea?
            <br />
            Let&rsquo;s bring it
            <br />
            <span className="pricing-text-flow pr-1">to life.</span>
          </h1>

          <p
            className="reveal-item mt-6 max-w-md text-base text-pretty text-muted-foreground sm:text-lg"
            style={{ "--reveal-index": 2 } as CSSProperties}
          >
            Have a project in mind, a question to ask, or an idea worth
            exploring? Tell us what you&rsquo;re looking for, and let&rsquo;s
            figure out how we can make it happen.
          </p>

          <ul
            className="reveal-item mt-8 grid max-w-xl gap-3 sm:grid-cols-2"
            style={{ "--reveal-index": 3 } as CSSProperties}
          >
            {direct.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="group/direct flex items-center gap-3.5 rounded-2xl border border-border bg-card/75 p-3.5 pr-4 backdrop-blur transition-all duration-300 outline-none hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary transition-colors duration-300 group-hover/direct:bg-primary group-hover/direct:text-primary-foreground">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      {label}
                    </span>
                    <span className="block truncate text-sm font-semibold">{value}</span>
                  </span>
                  <ArrowUpRight
                    className="ml-auto size-4 shrink-0 text-primary transition-transform duration-300 group-hover/direct:translate-x-0.5 group-hover/direct:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* The desk the enquiry lands on. */}
          <div
            className="reveal-item relative mt-12 hidden sm:block"
            style={{ "--reveal-index": 4 } as CSSProperties}
          >
            <div className="group/visual relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-card shadow-2xl shadow-primary/15 ring-1 ring-primary/10">
              <Image
                src="/images/contact.png"
                alt="A bright desk with a laptop open on a dashboard, a sketchbook, a mug and a plant"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover/visual:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/20 to-transparent" />
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-card/70 bg-card/80 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md">
                <span className="relative flex size-1.5">
                  <span className="pricing-ping absolute inset-0 rounded-full bg-primary" />
                  <span className="relative size-1.5 rounded-full bg-primary" />
                </span>
                Support staffed 24/7
              </span>
            </div>
          </div>
        </RevealGroup>

        {/* The form card, dressed like the pricing page's featured plan: a
            brand head under a passing light, a travelling border glow, and
            a pool of light beneath. */}
        <RevealGroup>
          <div
            className="reveal-item relative"
            style={{ "--reveal-index": 2 } as CSSProperties}
          >
            <span
              aria-hidden
              className="pricing-halo pointer-events-none absolute -inset-x-2 -inset-y-4 -z-10 rounded-[2.6rem] bg-gradient-to-b from-brand-from/40 via-primary/15 to-transparent blur-2xl sm:-inset-4"
            />
            <span
              aria-hidden
              className="pricing-featured-border pointer-events-none absolute -inset-1 -z-10 rounded-[2.2rem] opacity-60 blur-lg"
            />
            <div className="pricing-featured-border pricing-elevate rounded-[2.1rem] p-[1.5px]">
              <div className="relative overflow-hidden rounded-[2rem] bg-card">
                {/* The head. */}
                <div className="relative overflow-hidden bg-gradient-to-br from-brand-to via-primary to-brand-from px-6 pt-6 pb-8 text-primary-foreground sm:px-9 sm:pt-7 lg:px-10">
                  <span aria-hidden className="pricing-dots pointer-events-none absolute inset-0 text-primary-foreground/25" />
                  <MessageSquareText
                    aria-hidden
                    strokeWidth={1.25}
                    className="pointer-events-none absolute -right-6 -bottom-12 size-48 -rotate-12 text-primary-foreground/15"
                  />
                  <span aria-hidden className="pricing-band-sheen pointer-events-none absolute inset-0" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -left-10 size-48 rounded-full bg-primary-foreground/20 blur-3xl"
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2.5">
                        <span aria-hidden className="flex h-5 items-end gap-1">
                          {[0.4, 0.7, 1].map((h) => (
                            <span
                              key={h}
                              className="w-1.5 rounded-full bg-primary-foreground"
                              style={{ height: `${h * 100}%` }}
                            />
                          ))}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-primary-foreground/80 uppercase">
                          Support 24/7
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground px-3 py-1 font-mono text-[10px] font-semibold tracking-widest text-primary uppercase shadow-md shadow-primary/30">
                        <Send className="size-3" aria-hidden />
                        Enquiry / 01
                      </span>
                    </div>

                    <div className="mt-6 flex items-start gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/35 backdrop-blur-sm">
                        <MessageSquareText className="size-5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                          Tell us what you&rsquo;re looking for.
                        </h2>
                        <p className="mt-2 text-sm text-pretty text-primary-foreground/85 sm:text-base">
                          Share a few details with us, and we&rsquo;ll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The form. */}
                <div className="relative p-6 sm:p-9 lg:p-10">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
