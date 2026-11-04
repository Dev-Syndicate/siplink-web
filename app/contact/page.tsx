import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Building2, MapPin, Phone, type LucideIcon } from "lucide-react";

import { ContactEnquiry } from "@/components/site/contact-enquiry";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { offices, supportChannels } from "@/lib/site";
import { PageSchema } from "@/components/site/json-ld";
import { seoFor } from "@/lib/seo";

export const metadata: Metadata = seoFor("/contact");

export default function ContactPage() {
  const operating = offices.filter((o) => o.kind === "operating");
  const registered = offices.filter((o) => o.kind === "registered");

  return (
    <>
      <PageSchema path="/contact" />
      <ContactEnquiry />

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
