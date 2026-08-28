import type { Metadata } from "next";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Contact
          </span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Let&apos;s talk
          </h1>
          <p className="mt-6 text-lg text-pretty text-muted-foreground">
            Tell us how your teams communicate today and we will map it to a
            plan — including porting your existing numbers.
          </p>
        </div>
      </section>

      {/* Form + direct contact */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              Schedule a demo
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in your details and our team will get back to you.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Reach us directly
            </h2>
            <div className="mt-6 space-y-4">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="block text-sm font-medium">Sales</span>
                  <span className="block text-sm text-muted-foreground">
                    {site.phone}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="block text-sm font-medium">Support</span>
                  <span className="block text-sm text-muted-foreground">
                    {site.email}
                  </span>
                </span>
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Support is staffed 24/7.
            </p>
          </div>
        </div>
      </section>

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
            {supportChannels.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="h-full">
                <CardHeader>
                  <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
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
            {operating.map((office) => (
              <Card key={office.city} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-primary" aria-hidden />
                    <h3 className="text-lg font-semibold">{office.city}</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm font-medium">{office.entity}</p>
                  <address className="text-sm text-muted-foreground not-italic">
                    {office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Phone className="size-4" aria-hidden />
                    {office.phone}
                  </a>
                </CardContent>
              </Card>
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
