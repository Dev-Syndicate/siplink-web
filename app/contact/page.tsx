import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  Handshake,
  Headset,
  LifeBuoy,
  MapPin,
  Phone,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import { ClosingCta } from "@/components/site/closing-cta";
import { ContactSteps } from "@/components/site/contact-steps";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to SipLink about cloud telephony, SIP trunking and call centre solutions. Offices in Chennai, Bangalore and Hyderabad.",
};

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** Who is writing, and where each of them should go. */
const routes: {
  who: string;
  title: string;
  body: string;
  icon: LucideIcon;
  links: { label: string; href: string }[];
}[] = [
  {
    who: "New to SipLink",
    title: "Talk to sales",
    body: "Questions about plans, pricing or a demo for your team.",
    icon: Rocket,
    links: [
      { label: site.phone, href: tel(site.phone) },
      { label: "Book a demo", href: "#demo" },
    ],
  },
  {
    who: "Existing customer",
    title: "Get support",
    body: "Help with calls, extensions or your account, staffed 24/7.",
    icon: LifeBuoy,
    links: [{ label: site.email, href: `mailto:${site.email}` }],
  },
  {
    who: "Switching provider",
    title: "Move your numbers",
    body: "Keep the numbers your customers already know.",
    icon: ArrowRightLeft,
    links: [{ label: "How porting works", href: "/products/number-porting" }],
  },
  {
    who: "Resellers and integrators",
    title: "Partner with us",
    body: "Bring SipLink voice to your own customers.",
    icon: Handshake,
    links: [{ label: "Partner programme", href: "/company/partners" }],
  },
];

const demoCovers = [
  "Hosted PBX, SIP trunking and call centre on one platform",
  "A plan mapped to how your teams take calls today",
  "Porting your existing numbers, handled for you",
];

const regions = [
  { name: "India", note: "Operating offices", list: offices.filter((o) => o.kind === "operating") },
  { name: "United States", note: "Registered entity", list: offices.filter((o) => o.kind === "registered") },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero band, with the routing card lifted over its edge */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/70 via-accent/40 to-background pb-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--primary)_18%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-3xl px-6 pt-16 text-center lg:pt-24">
          <Badge
            variant="secondary"
            className="gap-1.5 border border-primary/20 bg-card/70 px-3 py-1 font-mono text-xs tracking-wider uppercase backdrop-blur"
          >
            <Headset className="size-3.5 text-primary" />
            Contact {site.name}
          </Badge>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            We&apos;re here to{" "}
            <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
              help you talk
            </span>
          </h1>
          <p className="mt-6 text-lg text-pretty text-muted-foreground">
            Pick who you are and reach the right team first time, by phone,
            email or a quick demo request.
          </p>
        </div>
      </section>

      <section className="relative mx-auto -mt-28 max-w-7xl px-6 lg:px-10">
        <Card className="rounded-3xl py-0 shadow-2xl shadow-primary/10">
          <CardContent className="grid p-0 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map(({ who, title, body, icon: Icon, links }) => (
              <div
                key={title}
                className="flex flex-col p-7 not-last:border-b not-last:border-border/70 sm:nth-[odd]:border-r lg:border-b-0! lg:not-last:border-r"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-5 text-sm font-medium text-primary">{who}</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">{title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-muted-foreground">{body}</p>
                <div className="mt-5 space-y-2">
                  {links.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="group flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      {label}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Demo request: the brand panel and a two-step form */}
      <section id="demo" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm lg:grid-cols-2">
          <div className="relative flex flex-col overflow-hidden bg-gradient-to-br from-brand-to to-brand-from p-8 text-primary-foreground sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              See SipLink running for your team
            </h2>
            <p className="mt-4 max-w-md text-primary-foreground/85">
              A short demo with our team, built around how you take calls today.
            </p>
            <ul className="mt-8 space-y-4">
              {demoCovers.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="relative mt-10 -mb-12 hidden aspect-[3/2] overflow-hidden rounded-t-2xl ring-4 ring-primary-foreground/15 sm:block lg:mt-auto">
              <Image
                src="/images/products/call-center-v2.webp"
                alt="A call centre team with live queue, routing and analytics dashboards"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <h2 className="text-2xl font-semibold tracking-tight">Schedule a demo</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Two quick steps and our team will get back to you.
            </p>
            <div className="mt-8">
              <ContactSteps />
            </div>
          </div>
        </div>
      </section>

      {/* Offices by region */}
      <section className="border-y border-border bg-muted/30 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Our Offices
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Find us near you
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Operating offices in Chennai, Bangalore and Hyderabad, with a
              registered entity in the United States. Support is staffed 24/7
              wherever you are.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="India"
            className="rounded-3xl border border-border/80 bg-card px-6 shadow-sm lg:col-span-7"
          >
            {regions.map((region) => (
              <AccordionItem key={region.name} value={region.name}>
                <AccordionTrigger className="py-5 text-lg font-semibold hover:no-underline">
                  <span>
                    {region.name}
                    <span className="ml-3 text-sm font-normal text-muted-foreground">{region.note}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {region.list.map((office) => (
                      <li key={office.city} className="rounded-2xl bg-muted/50 p-5">
                        <h3 className="flex items-center gap-2 font-semibold text-foreground">
                          <MapPin className="size-4 text-primary" aria-hidden />
                          {office.city}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-foreground">{office.entity}</p>
                        <address className="mt-1 text-sm leading-relaxed text-muted-foreground not-italic">
                          {office.address.join(", ")}
                        </address>
                        <a
                          href={tel(office.phone)}
                          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                        >
                          <Phone className="size-4" aria-hidden />
                          {office.phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <ClosingCta
        heading="Prefer to compare plans first?"
        body="See what every SipLink plan includes, then book a demo when you are ready."
        action="View pricing"
        href="/pricing"
        secondary={{ label: "About SipLink", href: "/about" }}
      />
    </>
  );
}
