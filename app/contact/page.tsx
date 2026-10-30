import type { Metadata } from "next";
import { Clock, Headset, Mail, Phone } from "lucide-react";

import { AboutOffices } from "@/components/site/about-offices";
import { ClosingCta } from "@/components/site/closing-cta";
import { ContactForm } from "@/components/site/contact-form";
import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { RevealGroup } from "@/components/site/reveal-group";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { offices, site, supportChannels } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to SipLink about cloud telephony, SIP trunking and call centre solutions. Offices in Chennai, Bangalore and Hyderabad.",
};

/* The office map in AboutOffices is keyed by these labels. */
const officeCards = offices.map((office) => ({
  city: office.kind === "registered" ? "Sheridan, Wyoming (USA)" : office.city,
  badge: office.kind === "registered" ? "US Registered Entity" : "Operating Office",
  address:
    office.kind === "registered" ? [office.entity, ...office.address] : office.address,
  phone: office.phone,
}));

const direct = [
  { label: "Sales", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "Support", value: site.email, href: `mailto:${site.email}`, icon: Mail },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero: the pitch and direct lines on the left, the form beside it */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 via-background to-background">
        <HeroBackdrop src="/images/hero-agent-headset.webp" position="70% center" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[10%] size-[600px] rounded-full bg-brand-from/15 blur-3xl"
        />

        <RevealGroup className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div
            className="reveal-item lg:col-span-5"
            style={{ "--reveal-index": 0 } as React.CSSProperties}
          >
            <Badge
              variant="secondary"
              className="gap-1.5 border border-primary/20 bg-card/70 px-3 py-1 font-mono text-xs tracking-wider uppercase backdrop-blur"
            >
              <Headset className="size-3.5 text-primary" />
              Contact {site.name}
            </Badge>

            <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
              Let&apos;s talk about{" "}
              <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                your business calls
              </span>
            </h1>

            <p className="mt-6 text-lg text-pretty text-muted-foreground">
              Tell us how your teams communicate today and we will map it to a
              plan, including porting your existing numbers.
            </p>

            <div className="mt-9 space-y-3">
              {direct.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card/75 p-4 shadow-sm backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-md"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">{label}</span>
                    <span className="block truncate text-sm text-muted-foreground">{value}</span>
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="size-4 text-primary" aria-hidden />
              Support is staffed 24/7
            </p>
          </div>

          <Card
            className="reveal-item rounded-3xl border-primary/20 bg-card/95 shadow-2xl shadow-primary/15 backdrop-blur lg:col-span-7"
            style={{ "--reveal-index": 1 } as React.CSSProperties}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Schedule a demo
              </CardTitle>
              <CardDescription>
                Fill in your details and our team will get back to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </RevealGroup>
      </section>

      {/* Support channels */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Always On Support
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Support, however you prefer to reach us
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            We support our customers around the clock, across every channel.
          </p>
        </div>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {supportChannels.map(({ title, description, icon: Icon }, index) => (
            <Card
              key={title}
              className="reveal-item border-border/80 bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-md"
              style={{ "--reveal-index": index } as React.CSSProperties}
            >
              <CardHeader>
                <span className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden />
                </span>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-pretty">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </RevealGroup>
      </section>

      {/* Offices: the same map and directory as the About page */}
      <AboutOffices offices={officeCards} />

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
