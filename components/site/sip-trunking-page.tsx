import { ProductHero } from "@/components/site/product-hero";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Network, Phone, Rocket, Server, ShieldCheck } from "lucide-react";

import { ProductConnectionDiagram } from "@/components/site/product-connection-diagram";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { productDetails, type ProductDetail } from "@/lib/products";
import { cn } from "@/lib/utils";

const migrationIcons = [ClipboardCheck, Network, Phone, Rocket];

const capabilityGroups = [
  { title: "Connect what you already use", description: "Keep your phone system and make the connection work around it.", indexes: [0, 6, 5], icon: Server },
  { title: "Give every call a route", description: "Control how calls enter, leave and move through your network.", indexes: [2, 7, 3], icon: Network },
  { title: "Build resilience into the line", description: "Plan alternate paths and protect the traffic they carry.", indexes: [1, 4, 8], icon: ShieldCheck },
];

/** A dedicated product story: existing equipment, new connectivity, planned cutover. */
export function SipTrunkingPage({ product }: { product: ProductDetail }) {
  const related = productDetails.filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug);

  return (
    <>
      <ProductHero product={product} headline="Your phone system. Connected to more." action="Talk about your PBX" secondaryLabel="See how it connects" imageAlt="Pink glass PBX tower connected to local, mobile and international voice destinations" description="Connect your existing PBX to the SipLink IP network. Keep the phones, extensions and call flows your team knows, with voice connectivity designed around your business." />

      <section id="how-it-works" className="scroll-mt-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <Badge variant="outline">How it works</Badge>
              <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">The PBX stays.<br />The physical lines move on.</h2>
              <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">{product.explainer?.definition}</p>
            </div>
            <ol className="space-y-0">
              {product.explainer?.steps.map((step, index) => (
                <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {index < 2 && <span aria-hidden className="absolute top-10 bottom-0 left-5 w-px bg-border" />}
                  <Badge variant={index === 1 ? "default" : "secondary"} className="relative size-10 shrink-0 justify-center rounded-full text-sm">{index + 1}</Badge>
                  <div className="pt-2"><h3 className="text-lg font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-12"><ProductConnectionDiagram product={product} embedded /></div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="mb-10 max-w-2xl"><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">More control over every call.</h2><p className="mt-4 text-muted-foreground">The connection, routing and protection your voice network needs, brought together in one trunk configuration.</p></div>
          <div className="grid gap-6 lg:grid-cols-3">
            {capabilityGroups.map(({ title, description, indexes, icon: Icon }) => (
              <Card key={title} className="gap-6 py-6 shadow-none">
                <CardHeader><Icon className="mb-4 size-8 text-primary" aria-hidden /><CardTitle className="text-xl">{title}</CardTitle><CardDescription className="mt-2 leading-relaxed">{description}</CardDescription></CardHeader>
                <CardContent className="space-y-5">
                  {indexes.map((index) => {
                    const feature = product.features[index];
                    return <div key={feature.title} className="border-t border-border pt-4"><h3 className="font-medium">{feature.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p></div>;
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-24">
          <div><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built around the way<br />your business calls.</h2><p className="mt-5 max-w-lg text-muted-foreground">From an existing office PBX to a growing estate, the trunk is designed around your equipment, locations and calling patterns.</p>
            <dl className="mt-8">{product.audiences?.map(({ situation, fit }) => <div key={situation} className="border-t border-border py-5"><dt className="text-lg font-medium">{situation}</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{fit}</dd></div>)}</dl>
          </div>
          <Card className="self-start bg-accent/40 py-8 shadow-none lg:mt-2"><CardHeader><Badge variant="outline" className="mb-4 w-fit">Technical overview</Badge><CardTitle className="text-2xl">What sits behind your connection</CardTitle></CardHeader><CardContent><dl>{product.specs?.map(({ label, value }) => <div key={label} className="grid gap-2 border-b border-border py-4 last:border-0 sm:grid-cols-[7rem_1fr]"><dt className="font-medium">{label}</dt><dd className="text-sm leading-relaxed text-muted-foreground">{value}</dd></div>)}</dl></CardContent></Card>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-2"><h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">A planned move from PRI.<br />A familiar working day.</h2><p className="max-w-xl leading-relaxed text-muted-foreground">{product.migration?.intro}</p></div>
          <ol className="relative mx-auto mt-14 max-w-5xl space-y-6">
            {product.migration?.steps.map(({ title, body }, index) => {
              const Icon = migrationIcons[index];
              const onRight = index % 2 === 1;
              return (
                <li key={title} className="relative grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-5 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-8">
                  {index < 3 && <span aria-hidden className="absolute top-1/2 -bottom-6 left-6 w-px bg-primary/25 md:left-1/2" />}
                  {index > 0 && <span aria-hidden className="absolute top-0 bottom-1/2 left-6 w-px bg-primary/25 md:left-1/2" />}
                  <Badge className="z-10 col-start-1 row-start-1 size-12 justify-center rounded-full border-4 border-background p-0 text-sm md:col-start-2">{index + 1}</Badge>
                  <span aria-hidden className={cn("absolute top-1/2 left-12 h-px w-5 bg-primary/25 md:w-8", onRight ? "md:left-[calc(50%+1.5rem)]" : "md:right-[calc(50%+1.5rem)] md:left-auto")} />
                  <Card className={cn("col-start-2 row-start-1 gap-4 py-6 shadow-sm", onRight ? "md:col-start-3" : "md:col-start-1")}>
                    <CardHeader className="grid-cols-[auto_1fr] items-center gap-4 px-6">
                      <Badge variant="secondary" className="size-12 justify-center rounded-xl bg-primary/10 p-0 text-primary"><Icon className="size-6" aria-hidden /></Badge>
                      <div><p className="mb-1 text-xs font-medium text-primary">{["Review your setup", "Engineer the connection", "Keep your identity", "Go live"][index]}</p><CardTitle><h3 className="text-lg font-semibold">{title}</h3></CardTitle></div>
                    </CardHeader>
                    <CardContent className="px-6"><p className="text-sm leading-relaxed text-muted-foreground">{body}</p></CardContent>
                  </Card>
                </li>
              );
            })}
          </ol>
          <Button asChild variant="outline" className="mt-10"><Link href="/contact">Plan your migration<ArrowRight aria-hidden /></Link></Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:px-10 lg:py-24">
        <div><h2 className="text-3xl font-semibold tracking-tight">Before you connect.</h2><p className="mt-4 text-muted-foreground">Answers to the questions we hear about PBX compatibility, numbers and migration.</p><Button asChild variant="link" className="mt-4 px-0"><Link href="/contact">Ask us about your setup<ArrowRight aria-hidden /></Link></Button></div>
        <Accordion type="single" collapsible>{product.faqs?.map(({ question, answer }) => <AccordionItem key={question} value={question}><AccordionTrigger className="text-base">{question}</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion>
      </section>

      <section id="pbx-connect" className="mx-auto max-w-7xl scroll-mt-36 px-6 py-10 lg:px-10">
        <Card data-pbx-cta className="gap-0 rounded-2xl bg-gradient-to-br from-brand-to via-brand-to to-brand-from py-12 text-primary-foreground shadow-none ring-0 sm:py-14 lg:py-16">
          <CardHeader className="gap-6 px-7 sm:px-10 lg:px-14">
            <Badge variant="secondary" className="w-fit rounded-full bg-primary-foreground/15 px-4 py-2 text-primary-foreground"><Server aria-hidden />Your PBX. Connected.</Badge>
            <CardTitle><h2 className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">Let’s connect the PBX you have to the business you’re building.</h2></CardTitle>
            <CardDescription className="max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">Tell us about your equipment, numbers and call volumes. We’ll help you design the connection and plan the move.</CardDescription>
          </CardHeader>
          <CardContent className="mt-9 flex flex-col gap-4 px-7 sm:flex-row sm:px-10 lg:px-14">
            <Button asChild size="lg" className="bg-primary-foreground text-brand-to hover:bg-primary-foreground/90"><Link href="/contact">Book a demo<ArrowRight aria-hidden /></Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground dark:border-primary-foreground/25 dark:bg-primary-foreground/10"><Link href="/pricing">View pricing</Link></Button>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><h2 className="text-2xl font-semibold tracking-tight">Explore Business Voice</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{related.map((item) => <Card key={item.slug} className="shadow-none"><CardHeader><CardTitle>{item.title}</CardTitle><CardDescription>{item.tagline}</CardDescription></CardHeader><CardContent><Button asChild variant="link" className="px-0"><Link href={`/products/${item.slug}`}>Explore {item.title}<ArrowRight aria-hidden /></Link></Button></CardContent></Card>)}</div></section>
    </>
  );
}
