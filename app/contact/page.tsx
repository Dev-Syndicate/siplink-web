import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { ContactEnquiry } from "@/components/site/contact-enquiry";
import { ContactOffices } from "@/components/site/contact-offices";
import { GlowCard } from "@/components/site/glow-card";
import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { supportChannels } from "@/lib/site";
import { PageSchema } from "@/components/site/json-ld";
import { seoFor } from "@/lib/seo";

export const metadata: Metadata = seoFor("/contact");

export default function ContactPage() {
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

      <ContactOffices />
    </>
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
