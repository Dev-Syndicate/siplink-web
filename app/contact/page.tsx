import type { Metadata } from "next";
import Image from "next/image";
import { Building2, CircleCheck, Mail, MapPin, Phone, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactForm } from "@/components/site/contact-form";
import { GoogleLogo } from "@/components/site/store-icons";
import { offices, reviewStats, site, supportChannels } from "@/lib/site";

/** What a demo covers, as the checklist beside the form. */
const COVERS = [
  "Hosted PBX, SIP trunking & call centre",
  "Keep your existing numbers",
  "24/7 expert support",
];

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to SipLink about cloud telephony, SIP trunking and call centre solutions. Offices in Chennai, Bangalore and Hyderabad.",
};

export default function ContactPage() {
  const rating = reviewStats[0];
  const operating = offices.filter((o) => o.kind === "operating");
  const registered = offices.filter((o) => o.kind === "registered");

  return (
    <>
      {/* Hero: the pitch on the brand colour, the form in a card beside it. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full border-[4rem] border-primary-foreground/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-primary-foreground/5 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-6 pt-16 pb-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:pt-20 lg:pb-32">
          <div className="lg:pt-6">
            <h1 className="font-heading text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl">
              Talk to SipLink and see how your calls could run
            </h1>
            <p className="mt-5 max-w-xl text-lg text-pretty text-primary-foreground/85">
              Tell us how your teams communicate today and we will map it to a
              plan, including porting your existing numbers.
            </p>

            <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm ring-1 ring-primary-foreground/20">
              <span className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </span>
              <span className="font-semibold">{rating.value}</span>
              <span className="text-primary-foreground/80">{rating.label}</span>
            </p>

            <ul className="mt-8 space-y-3">
              {COVERS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CircleCheck className="size-5 shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Phone className="size-4" aria-hidden />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Mail className="size-4" aria-hidden />
                {site.email}
              </a>
            </div>

            <Image
              src="/images/products/call-center-v2.webp"
              alt="A SipLink call centre team with live queue, routing and analytics dashboards"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="mt-10 hidden w-full max-w-xl rounded-2xl shadow-2xl shadow-foreground/20 ring-4 ring-primary-foreground/15 lg:block"
            />
          </div>

          <Card className="rounded-2xl p-2 text-card-foreground shadow-2xl shadow-foreground/20 sm:p-4">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Get a demo &amp; pricing
              </CardTitle>
              <CardDescription className="text-pretty">
                See how teams run calls, queues and support on one platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Our support team is staffed 24/7.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Proof strip, lifted over the hero's edge. */}
      <section className="relative mx-auto -mt-12 max-w-5xl px-6 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {reviewStats.map(({ value, label, icon: Icon }, index) => (
            <Card
              key={label}
              className="flex-row items-center gap-4 rounded-2xl px-6 py-5 shadow-xl shadow-primary/10"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {index === 0 ? (
                  <GoogleLogo className="size-6" />
                ) : (
                  <Icon className="size-5" aria-hidden />
                )}
              </span>
              <span>
                <span className="font-heading block text-xl font-bold">
                  {value}
                </span>
                <span className="block text-sm text-muted-foreground">
                  {label}
                </span>
              </span>
            </Card>
          ))}
        </div>
      </section>

      {/* Support channels */}
      <section className="mt-20 border-t border-border bg-muted/30">
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
