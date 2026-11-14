import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Puzzle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { integrationLogos } from "@/lib/site";

/** What kind of tool each one is, for the tag beside its name. */
const CATEGORY: Record<(typeof integrationLogos)[number]["name"], string> = {
  Salesforce: "CRM",
  HubSpot: "CRM",
  Zoho: "CRM",
  Bitrix24: "CRM",
  Odoo: "Business suite",
  "Microsoft 365": "Workplace",
  "Google Workspace": "Workplace",
  WhatsApp: "Messaging",
  Zendesk: "Helpdesk",
  CEIPAL: "ATS",
};

const CARD =
  "h-full gap-5 py-6 shadow-none transition-[translate,box-shadow] duration-300 hover:ring-primary/30 hover:shadow-lg hover:shadow-primary/5 motion-safe:hover:-translate-y-1";

/**
 * The integrations as a directory: one card per tool, with what the connection
 * does. Names, logos and descriptions come from `integrationLogos`, the same
 * list the integration wall draws, so the two cannot disagree. The last two
 * cards are the custom API route and a way to ask about anything not listed.
 */
export function IntegrationDirectory() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="bg-background uppercase tracking-widest">
            Integrations
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Connect to the tools your team already uses
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Calls, contacts and activity stay with the systems your teams work in every day. The
            exact workflow for each tool is confirmed against your setup during onboarding.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {integrationLogos.map(({ name, description, src, w, h }) => (
            <li key={name}>
              <Card className={CARD}>
                <CardHeader className="gap-4 px-6">
                  <span className="flex h-9 items-center">
                    <Image
                      src={src}
                      alt=""
                      width={w}
                      height={h}
                      sizes="160px"
                      className="h-auto max-h-9 w-auto max-w-[60%] object-contain object-left"
                    />
                  </span>
                  <CardTitle className="flex flex-wrap items-center gap-2 text-base font-semibold">
                    {name}
                    <Badge variant="secondary">{CATEGORY[name]}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <CardDescription className="leading-relaxed">{description}</CardDescription>
                </CardContent>
              </Card>
            </li>
          ))}

          <li>
            <Card className={CARD}>
              <CardHeader className="gap-4 px-6">
                <Badge size="icon" variant="secondary" className="bg-primary/10 text-primary">
                  <Puzzle aria-hidden />
                </Badge>
                <CardTitle className="flex flex-wrap items-center gap-2 text-base font-semibold">
                  Custom API
                  <Badge variant="secondary">Developers</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <CardDescription className="leading-relaxed">
                  Connect the business applications and calling workflows not listed here through
                  custom API integration.
                </CardDescription>
              </CardContent>
            </Card>
          </li>

          <li>
            <Link href="/contact" className="group block h-full rounded-xl">
              <Card className={`${CARD} bg-primary/5 ring-primary/20`}>
                <CardHeader className="gap-4 px-6">
                  <Badge size="icon" className="text-primary-foreground">
                    <ArrowRight aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </Badge>
                  <CardTitle className="text-base font-semibold">Don’t see your tool?</CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <CardDescription className="leading-relaxed">
                    Tell us what your team runs on and we will confirm how SipLink connects to it.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
