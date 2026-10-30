import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Headset, Mail, MapPin, Navigation, Phone } from "lucide-react";

import { ClosingCta } from "@/components/site/closing-cta";
import { ContactDesk } from "@/components/site/contact-desk";
import { FaqSection } from "@/components/site/faq-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { offices, site, supportChannels } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to SipLink about cloud telephony, SIP trunking and call centre solutions. Offices in Chennai, Bangalore and Hyderabad.",
};

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

const lines = [
  { label: "Call sales", value: site.phone, href: tel(site.phone), icon: Phone },
  { label: "Email support", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "24x7 call centre", value: "Staffed around the clock", href: tel(site.phone), icon: Clock },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero: pick a reason, and the desk below follows it */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/50 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_oklab,var(--primary)_18%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_45%_at_50%_10%,black,transparent)]"
        />
        <div aria-hidden className="pointer-events-none absolute -top-48 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-brand-from/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="gap-1.5 border border-primary/20 bg-card/70 px-3 py-1 font-mono text-xs tracking-wider uppercase backdrop-blur"
            >
              <Headset className="size-3.5 text-primary" />
              Contact {site.name}
            </Badge>
            <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              How can we{" "}
              <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                help you today?
              </span>
            </h1>
            <p className="mt-6 text-lg text-pretty text-muted-foreground">
              Choose what you need and the right team gets your message, whether
              that is a demo, support, or moving your existing numbers.
            </p>
          </div>

          <div className="mt-12">
            <ContactDesk />
          </div>
        </div>
      </section>

      {/* Direct lines */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Direct Lines
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Rather talk to a person?
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Skip the form. Our team answers by phone, email, live chat and
              support tickets, every hour of every day.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {lines.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="group flex flex-col gap-6 rounded-2xl bg-gradient-to-br from-brand-to to-brand-from p-6 text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-1"
              >
                <Icon className="size-6" aria-hidden />
                <span>
                  <span className="block text-lg font-semibold">{label}</span>
                  <span className="mt-1 block truncate text-sm text-primary-foreground/85">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-x-10 gap-y-6 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {supportChannels.map(({ title, description, icon: Icon }) => (
            <li key={title} className="flex gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="block font-semibold text-foreground">{title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{description}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Offices, one city at a time */}
      <section className="border-y border-border bg-muted/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              Visit Us
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Our offices
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Operating offices in Chennai, Bangalore and Hyderabad, with a
              registered entity in the United States.
            </p>
          </div>

          <Tabs defaultValue={offices[0].city} className="mt-10 gap-8">
            <TabsList variant="line" className="h-auto! flex-wrap justify-start">
              {offices.map((office) => (
                <TabsTrigger key={office.city} value={office.city} className="h-10 px-4 text-base">
                  {office.city}
                </TabsTrigger>
              ))}
            </TabsList>

            {offices.map((office) => (
              <TabsContent key={office.city} value={office.city}>
                <div className="grid overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm lg:grid-cols-12">
                  <div className="flex flex-col p-8 lg:col-span-5 lg:p-10">
                    <Badge variant="outline" className="w-fit font-mono text-[10px]">
                      {office.kind === "operating" ? "Operating Office" : "US Registered Entity"}
                    </Badge>
                    <h3 className="mt-5 flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                      <MapPin className="size-5 text-primary" aria-hidden />
                      {office.city}
                    </h3>
                    <p className="mt-4 text-sm font-medium text-foreground">{office.entity}</p>
                    <address className="mt-2 flex-1 text-muted-foreground not-italic">
                      {office.address.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </address>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button asChild className="rounded-full">
                        <a href={tel(office.phone)}>
                          <Phone aria-hidden />
                          {office.phone}
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="rounded-full">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address.join(", "))}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Navigation aria-hidden />
                          Directions
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="relative min-h-64 lg:col-span-7">
                    <Image
                      src="/images/about/about-global-network.webp"
                      alt="SipLink brand illustration representing people, technology, and global connection"
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <FaqSection />

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
