import { ClosingCta } from "@/components/site/closing-cta";
import { Fragment } from "react";
import { ProductConnectionDiagram } from "@/components/site/product-connection-diagram";
import { ProductHero } from "@/components/site/product-hero";
import Link from "next/link";
import { ArrowRight, Check, Cloud, Building2, Server, Phone, ShieldCheck, MapPin, ClipboardCheck, GitBranch, Headset, BarChart3, Monitor, Smartphone, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { productDetails, type ProductDetail } from "@/lib/products";

export const VOICE_PRODUCT_SLUGS: string[] = ["cloud-pbx", "hosted-pbx", "ip-pbx", "did-numbers", "toll-free-numbers", "virtual-numbers", "number-porting"];

const stories: Record<string, { headline: string; action: string; title: string; alt: string }> = {
  "cloud-pbx": { headline: "Every customer call. A better way forward.", action: "Design your contact centre", title: "Advanced calling, built around your agents", alt: "Pink glass cloud connecting customer calls, agents and reporting" },
  "hosted-pbx": { headline: "One team calling experience. Wherever work happens.", action: "Plan your team communications", title: "One workspace for the whole team", alt: "White managed server sheltered by a pink glass arch and connected to branch offices" },
  "ip-pbx": { headline: "Call control stays inside your network.", action: "Design your on-site system", title: "Your premises at the centre", alt: "White telephone server inside a pink glass network perimeter" },
  "did-numbers": { headline: "A direct line to the right person.", action: "Find your direct numbers", title: "Give each destination its own front door", alt: "Individual white telephone tiles leading to separate department doorways on pink glass paths" },
  "toll-free-numbers": { headline: "Make it easier for customers to call.", action: "Discuss a toll-free number", title: "One entry point. The right team behind it.", alt: "White telephone receiver in an open pink glass gateway with customer paths" },
  "virtual-numbers": { headline: "Your number has a presence. Your team has freedom.", action: "Plan your business presence", title: "The number stays. The destination can change.", alt: "White office buildings and a floating telephone joined by translucent pink ribbons" },
  "number-porting": { headline: "Move your service. Keep your number.", action: "Check your numbers for porting", title: "Continuity starts with the details", alt: "White telephone crossing a pink glass bridge between two network towers" },
};

function CcaasCallFlow() {
  const stages = [
    { label: "01 / ARRIVE", title: "Understand the caller", body: "Business numbers, IVR and time-based flows give every customer a clear entry point.", icon: Phone },
    { label: "02 / ROUTE", title: "Find the right agent", body: "Queues, availability and skills decide where the conversation should go next.", icon: GitBranch },
    { label: "03 / IMPROVE", title: "See the whole operation", body: "Live supervision, recording and reports reveal what is happening and what to change.", icon: BarChart3 },
  ];
  return <section aria-labelledby="ccaas-journey-heading" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
    <Card className="overflow-hidden border-0 bg-linear-to-br from-brand-from to-brand-to py-0 text-primary-foreground shadow-xl">
      <CardContent className="p-7 sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-end">
          <div><Badge className="border-primary-foreground/20 bg-primary-foreground/15 text-primary-foreground">Contact Centre as a Service</Badge><h2 id="ccaas-journey-heading" className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">From first ring to a better outcome.</h2></div>
          <p className="max-w-xl text-base leading-relaxed text-primary-foreground/85 lg:justify-self-end">CCaaS is built for customer-facing teams. It connects the route into your business, the agent who answers and the insight your supervisors need afterwards.</p>
        </div>
        <ol className="mt-10 grid gap-3 md:grid-cols-3">{stages.map(({ label, title, body, icon: Icon }) => <li key={label}>
          <Card className="group h-full border-primary-foreground/20 bg-primary-foreground/10 py-0 text-primary-foreground shadow-none backdrop-blur-sm transition-colors duration-300 hover:bg-primary-foreground/20"><CardContent className="p-6">
            <div className="flex items-center justify-between"><span className="text-xs font-semibold tracking-widest text-primary-foreground/70">{label}</span><Icon aria-hidden className="size-5 transition-transform duration-300 motion-safe:group-hover:scale-110" /></div>
            <h3 className="mt-10 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{body}</p>
          </CardContent></Card>
        </li>)}</ol>
      </CardContent>
    </Card>
  </section>;
}

function CcaasCapabilities({ features }: { features: ProductDetail["features"] }) {
  const groups = [
    { number: "01", label: "Route & retain", description: "Make the path to an answer deliberate, even at peak demand.", items: features.slice(0, 4) },
    { number: "02", label: "Run the floor", description: "Give agents and supervisors the control to keep work moving.", items: features.slice(4, 7) },
    { number: "03", label: "Learn & connect", description: "Carry customer context forward and turn activity into insight.", items: features.slice(7) },
  ];
  return <div className="grid gap-5 lg:grid-cols-3">{groups.map(group => <Card key={group.number} className="group gap-0 overflow-hidden py-0 transition-[border-color,box-shadow,transform] duration-300 hover:border-primary/40 hover:shadow-lg motion-safe:hover:-translate-y-1">
    <CardHeader className="min-h-48 bg-primary/5 p-7"><Badge variant="outline" className="w-fit border-primary/20 text-primary">{group.number} / {group.label}</Badge><CardTitle className="mt-5 text-2xl tracking-tight">{group.label}</CardTitle><CardDescription className="mt-2 text-sm leading-relaxed">{group.description}</CardDescription></CardHeader>
    <CardContent className="p-7"><ul className="divide-y divide-border">{group.items.map(feature => { const Icon = feature.icon; return <li key={feature.title} className="py-5 first:pt-0 last:pb-0"><div className="flex items-start gap-3"><Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" /><div><h3 className="font-semibold">{feature.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p></div></div></li>; })}</ul></CardContent>
  </Card>)}</div>;
}

function UcaasWorkspaces() {
  const places = [
    { title: "At a desk", detail: "IP phones and shared business extensions", icon: Monitor },
    { title: "In the browser", detail: "WebRTC and desktop softphone calling", icon: Headset },
    { title: "On the move", detail: "Mobile access and find me / follow me", icon: Smartphone },
  ];
  return <section aria-labelledby="ucaas-workspaces-heading" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
    <Card className="gap-0 overflow-hidden py-0 shadow-none"><div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <CardHeader className="flex flex-col justify-between bg-primary/5 p-8 sm:p-10"><div><Badge variant="outline" className="border-primary/20 text-primary">Unified Communications as a Service</Badge><h2 id="ucaas-workspaces-heading" className="mt-7 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">One calling identity for a team that moves.</h2><CardDescription className="mt-5 max-w-md text-base leading-relaxed">People, numbers and call flows stay together across the office, branches and home. Your team manages the day-to-day experience; SipLink hosts and looks after the platform.</CardDescription></div><div className="mt-10 flex items-center gap-3 border-t border-border pt-5 text-sm font-medium"><Users aria-hidden className="size-5 text-primary" /> One directory. One set of call flows.</div></CardHeader>
      <CardContent className="p-6 sm:p-8 lg:p-10"><ul className="divide-y divide-border">{places.map(place => <li key={place.title} className="group flex items-start gap-5 py-7 first:pt-0 last:pb-0"><div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"><place.icon aria-hidden className="size-6" /></div><div><h3 className="text-lg font-semibold">{place.title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{place.detail}</p></div></li>)}</ul></CardContent>
    </div></Card>
  </section>;
}

function HostedResponsibilities({ features }: { features: ProductDetail["features"] }) {
  const managedIndexes = [0, 3, 6, 9];
  const groups = [
    { id: "hosted-managed", managed: true, owner: "SipLink", title: "We run the platform", body: "Hosting, monitoring and maintenance of the system underneath your calls.", icon: Server, items: features.filter((_, index) => managedIndexes.includes(index)) },
    { id: "hosted-team", managed: false, owner: "Your team", title: "You run the conversations", body: "Your people, your call flows and the way your business connects.", icon: Phone, items: features.filter((_, index) => !managedIndexes.includes(index)) },
  ];

  return <Card data-hosted-responsibilities className="gap-0 overflow-hidden py-0 shadow-none">
    {groups.map(({ id, managed, owner, title, body, icon: Icon, items }, index) => <Fragment key={id}>
      {index > 0 && <Separator />}
      <section aria-labelledby={id} className="grid lg:grid-cols-[18rem_minmax(0,1fr)]">
        <CardHeader className={managed ? "content-start gap-5 bg-foreground p-7 text-background lg:p-8" : "content-start gap-5 bg-muted/50 p-7 lg:p-8"}>
          <div className="flex items-center justify-between gap-4"><Badge variant={managed ? "outline" : "secondary"} className={managed ? "border-background/25 text-background" : ""}>{owner}</Badge><Icon aria-hidden className={managed ? "size-6 text-background/70" : "size-6 text-primary"} /></div>
          <CardTitle><h3 id={id} className="max-w-xs text-2xl leading-tight tracking-tight">{title}</h3></CardTitle>
          <CardDescription className={managed ? "max-w-xs text-sm leading-relaxed text-background/70" : "max-w-xs text-sm leading-relaxed"}>{body}</CardDescription>
        </CardHeader>
        <CardContent className={managed ? "grid gap-x-8 gap-y-6 p-7 sm:grid-cols-2 lg:p-8" : "grid gap-x-7 gap-y-6 p-7 sm:grid-cols-2 xl:grid-cols-3 lg:p-8"}>
          {items.map(feature => {
            const FeatureIcon = feature.icon;
            return <div key={feature.title} data-responsibility-feature>
              <h4 className="flex items-start gap-3 text-base font-semibold leading-snug"><FeatureIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />{feature.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>;
          })}
        </CardContent>
      </section>
    </Fragment>)}
  </Card>;
}

function VirtualNumberSetup({ migration }: { migration: NonNullable<ProductDetail["migration"]> }) {
  return <section id="virtual-number-setup" aria-labelledby="virtual-number-setup-heading" className="scroll-mt-28 bg-muted/25">
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:gap-16">
        <h2 id="virtual-number-setup-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">{migration.heading}</h2>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">{migration.intro}</p>
      </div>
      <ol data-virtual-number-setup className="grid gap-x-10 gap-y-10 lg:grid-cols-3">
        {migration.steps.map((step, index) => <li key={step.title} data-virtual-setup-step className={index === migration.steps.length - 1 ? "lg:col-span-3" : ""}>
          {index === migration.steps.length - 1 ? <Card className="gap-0 bg-primary/5 py-0 shadow-none">
            <CardContent className="grid gap-6 p-7 sm:p-8 lg:grid-cols-3 lg:gap-10">
              <div className="flex items-start gap-4"><Badge className="size-10 shrink-0 justify-center rounded-full">{index + 1}</Badge><h3 className="pt-1 text-xl font-semibold leading-snug">{step.title}</h3></div>
              <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-2">{step.body}</p>
            </CardContent>
          </Card> : <div>
            <Badge variant="secondary" className="mb-5 size-10 justify-center rounded-full">{index + 1}</Badge>
            <h3 className="text-xl font-semibold leading-snug">{step.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </div>}
        </li>)}
      </ol>
    </div>
  </section>;
}

function TollFreeSetup({ migration }: { migration: NonNullable<ProductDetail["migration"]> }) {
  return <section id="toll-free-setup" aria-labelledby="toll-free-setup-heading" className="scroll-mt-28 bg-muted/25">
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:gap-16">
        <h2 id="toll-free-setup-heading" className="max-w-lg text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{migration.heading}</h2>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">{migration.intro}</p>
      </div>
      <Card data-toll-free-setup className="gap-0 overflow-hidden py-0 shadow-none">
        <CardContent className="p-0">
          <ol>
            {migration.steps.map((step, index) => <li key={step.title} data-toll-free-setup-step className={index === migration.steps.length - 1 ? "grid gap-5 bg-primary/5 p-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:p-8 lg:grid-cols-[3rem_minmax(0,2fr)_minmax(0,3fr)] lg:gap-8" : "grid gap-5 p-6 even:bg-muted/35 sm:grid-cols-[3rem_minmax(0,1fr)] sm:p-8 lg:grid-cols-[3rem_minmax(0,2fr)_minmax(0,3fr)] lg:gap-8"}>
              <Badge variant={index === migration.steps.length - 1 ? "default" : "outline"} className="size-11 justify-center rounded-xl text-base">{String(index + 1).padStart(2, "0")}</Badge>
              <h3 className="text-lg font-semibold leading-snug lg:pt-2">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:col-start-2 lg:col-start-3">{step.body}</p>
            </li>)}
          </ol>
        </CardContent>
      </Card>
    </div>
  </section>;
}

function DirectNumberSetup({ migration }: { migration: NonNullable<ProductDetail["migration"]> }) {
  const phases = [
    { title: "Prepare your numbers", icon: ClipboardCheck, start: 0, steps: migration.steps.slice(0, 2) },
    { title: "Configure and go live", icon: Phone, start: 2, steps: migration.steps.slice(2) },
  ];
  return <section id="number-setup" aria-labelledby="number-setup-heading" className="scroll-mt-28 bg-muted/25">
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:gap-16">
        <h2 id="number-setup-heading" className="max-w-lg text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{migration.heading}</h2>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">{migration.intro}</p>
      </div>
      <Card data-direct-number-setup className="gap-0 overflow-hidden py-0 shadow-none">
        {phases.map(({ title, icon: Icon, start, steps }, phase) => <div key={title} className={phase === 0 ? "grid gap-8 p-7 sm:p-8 lg:grid-cols-4 lg:gap-10" : "grid gap-8 bg-primary/5 p-7 sm:p-8 lg:grid-cols-4 lg:gap-10"}>
          <CardHeader className="gap-4 p-0">
            <Icon aria-hidden className="size-8 text-primary" />
            <CardTitle className="max-w-xs text-2xl leading-tight tracking-tight">{title}</CardTitle>
            <Badge variant="outline" className="w-fit bg-background">{phase === 0 ? "Before configuration" : "Before customers call"}</Badge>
          </CardHeader>
          <CardContent className="p-0 lg:col-span-3">
            <ol start={start + 1} className="grid gap-8 md:grid-cols-2 lg:gap-10">
              {steps.map((step, index) => <li key={step.title} data-number-setup-step className="min-w-0">
                <div className="mb-4 flex items-center gap-3"><Badge variant={phase === 0 ? "secondary" : "default"} className="size-9 justify-center rounded-full">{start + index + 1}</Badge><ArrowRight aria-hidden className="size-4 text-muted-foreground" /></div>
                <h3 className="text-lg font-semibold leading-snug">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>)}
            </ol>
          </CardContent>
        </div>)}
      </Card>
    </div>
  </section>;
}

function HostedMigration({ migration }: { migration: NonNullable<ProductDetail["migration"]> }) {
  const icons = [ClipboardCheck, Cloud, ShieldCheck, Phone, Check];
  return <section id="migration" aria-labelledby="hosted-migration-heading" className="scroll-mt-28 bg-muted/30">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-24">
      <div className="lg:col-span-4">
        <Badge variant="secondary">A planned move, not a switch-off</Badge>
        <h2 id="hosted-migration-heading" className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{migration.heading}</h2>
        <p className="mt-6 leading-relaxed text-muted-foreground">{migration.intro}</p>
        <div className="mt-8 flex items-center gap-3 text-sm font-medium"><Server aria-hidden className="size-5 text-muted-foreground" /><span>On-premises</span><ArrowRight aria-hidden className="size-4 text-primary" /><Cloud aria-hidden className="size-5 text-primary" /><span>UCaaS</span></div>
        <Button asChild variant="outline" className="mt-8"><Link href="/contact">Plan your migration<ArrowRight /></Link></Button>
      </div>
      <Card data-hosted-migration className="gap-0 overflow-hidden py-0 shadow-none lg:col-span-8">
        <CardHeader className="flex items-center justify-between gap-4 bg-primary/5 px-6 py-5 sm:px-8">
          <CardTitle className="text-base">Your route to a hosted system</CardTitle>
          <Badge variant="outline" className="shrink-0 bg-background">5 stages</Badge>
        </CardHeader>
        <CardContent className="px-6 py-8 sm:px-8">
          <ol className="space-y-8">
            {migration.steps.map((step, index) => {
              const Icon = icons[index % icons.length];
              return <li key={step.title} data-migration-step className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-5 sm:gap-6">
                {index < migration.steps.length - 1 && <span aria-hidden className="absolute -bottom-8 left-5 top-10 w-px bg-primary/20" />}
                <Badge className={index === migration.steps.length - 1 ? "relative z-10 size-10 justify-center rounded-full" : "relative z-10 size-10 justify-center rounded-full border-primary/20 bg-background text-primary"} variant={index === migration.steps.length - 1 ? "default" : "outline"}>{String(index + 1).padStart(2, "0")}</Badge>
                <div className="min-w-0 pb-1">
                  <h3 className="flex items-start justify-between gap-4 text-lg font-semibold leading-snug"><span>{step.title}</span><Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" /></h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>;
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  </section>;
}

function TollFreeCapabilities({ features }: { features: ProductDetail["features"] }) {
  const midpoint = Math.ceil(features.length / 2);
  const groups = [
    { title: "A number customers can start with", icon: Phone, items: features.slice(0, midpoint) },
    { title: "Call handling behind the number", icon: ShieldCheck, items: features.slice(midpoint) },
  ];
  return <div id="toll-free-capabilities" data-toll-free-capabilities className="grid scroll-mt-32 gap-6 xl:grid-cols-2">
    {groups.map(({ title, icon: Icon, items }, index) => <Card key={title} className={index === 0 ? "gap-7 bg-primary/5 py-7 shadow-none" : "gap-7 bg-muted/25 py-7 shadow-none"}>
      <CardHeader className="px-7">
        <CardTitle><h3 className="flex items-start gap-3 text-2xl font-semibold leading-tight tracking-tight"><Icon aria-hidden className="mt-0.5 size-6 shrink-0 text-primary" />{title}</h3></CardTitle>
      </CardHeader>
      <CardContent className="grid flex-1 gap-x-7 gap-y-8 px-7 sm:grid-cols-2 sm:grid-rows-2">
        {items.map(feature => {
          const FeatureIcon = feature.icon;
          return <div key={feature.title} data-toll-free-feature>
            <h4 className="flex items-start gap-3 text-base font-semibold leading-snug"><FeatureIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />{feature.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </div>;
        })}
      </CardContent>
    </Card>)}
  </div>;
}

function OnPremisesCapabilities({ product }: { product: ProductDetail }) {
  const [control, ...features] = product.features;
  return <div id="ip-capabilities" data-ip-capabilities className="scroll-mt-32 space-y-10">
    <Card className="gap-0 bg-primary/5 py-0 shadow-none">
      <CardContent className="grid gap-6 p-7 sm:p-8 lg:grid-cols-5 lg:gap-10">
        <div className="flex items-start gap-5 lg:col-span-2">
          <Server aria-hidden className="mt-1 size-9 shrink-0 text-primary" />
          <div data-ip-feature><h3 className="text-2xl font-semibold tracking-tight">{control.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{control.description}</p></div>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground lg:col-span-3">{product.approach?.body[0]}</p>
      </CardContent>
    </Card>
    <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 xl:grid-cols-4">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return <div key={feature.title} data-ip-feature className={index === 0 ? "sm:col-span-2" : ""}>
          <h3 className="flex items-start gap-3 text-lg font-semibold leading-snug"><Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />{feature.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
        </div>;
      })}
    </div>
  </div>;
}

function Capabilities({ product }: { product: ProductDetail }) {
  const features = product.features;
  switch (product.slug) {
    case "cloud-pbx":
      return <CcaasCapabilities features={features} />;
    case "hosted-pbx":
      return <HostedResponsibilities features={features} />;
    case "ip-pbx":
      return <OnPremisesCapabilities product={product} />;
    case "did-numbers":
      return <div className="divide-y divide-border">{features.map(feature => { const Icon = feature.icon; return <div key={feature.title} className="grid gap-4 py-6 sm:grid-cols-2"><h3 className="flex gap-4 text-lg font-semibold"><Icon className="size-5 shrink-0 text-primary" aria-hidden />{feature.title}</h3><p className="leading-relaxed text-muted-foreground">{feature.description}</p></div>; })}</div>;
    case "toll-free-numbers":
      return <TollFreeCapabilities features={features} />;
    case "virtual-numbers":
      return <Card id="virtual-capabilities" data-virtual-capabilities className="scroll-mt-32 gap-0 bg-muted/25 py-0 shadow-none"><CardContent className="grid gap-x-8 gap-y-9 p-7 sm:grid-cols-2 sm:p-8 xl:grid-cols-4">{features.map(feature => {
        const Icon = feature.icon;
        return <div key={feature.title} data-virtual-feature><h3 className="flex items-start gap-3 text-lg font-semibold leading-snug"><Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />{feature.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p></div>;
      })}</CardContent></Card>;
    default:
      return <div className="grid gap-x-12 gap-y-7 md:grid-cols-2">{features.map(feature => <div key={feature.title} className="flex gap-4 border-b border-border pb-7"><Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden /><div><h3 className="text-lg font-semibold">{feature.title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{feature.description}</p></div></div>)}</div>;
  }
}

function Process({ product }: { product: ProductDetail }) {
  const explainer = product.explainer;
  if (!explainer) return null;
  const horizontal = product.slug === "did-numbers" || product.slug === "toll-free-numbers";
  const hosted = product.slug === "hosted-pbx";
  const virtual = product.slug === "virtual-numbers";
  const port = product.slug === "number-porting";
  const icons = hosted ? [Server, Phone, ShieldCheck] : virtual ? [MapPin, Building2, Phone] : [Phone, ArrowRight, Building2];
  return (
    <section id="how-it-works" className="scroll-mt-28 border-b border-border bg-muted/25">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className={horizontal ? "space-y-12" : "grid gap-12 lg:grid-cols-5"}>
          <div className={horizontal ? "max-w-3xl" : "lg:col-span-2"}>
            <Badge variant="outline">How it works</Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{explainer.question}</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{explainer.definition}</p>
          </div>
          <ol className={horizontal ? "grid gap-8 md:grid-cols-3" : hosted ? "grid gap-5 lg:col-span-3" : virtual ? "space-y-5 lg:col-span-3" : "space-y-8 lg:col-span-3"}>
            {explainer.steps.map((step, index) => {
              const StepIcon = icons[index % icons.length];
              return <li key={step.title}>
                {hosted ? <Card className={index === 1 ? "bg-background" : "bg-primary/5"}><CardHeader className="flex-row gap-5"><StepIcon className="size-8 shrink-0 text-primary" aria-hidden /><div><Badge variant="outline" className="mb-3">{index === 1 ? "Your team" : "SipLink"}</Badge><CardTitle className="text-xl">{step.title}</CardTitle><CardDescription className="mt-3 leading-relaxed">{step.body}</CardDescription></div></CardHeader></Card>
                : horizontal ? <div className="relative border-t-2 border-primary/30 pt-6"><Badge className="mb-5 size-10 justify-center rounded-full">{index + 1}</Badge><StepIcon className="mb-4 size-7 text-primary" aria-hidden /><h3 className="text-xl font-semibold">{step.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p></div>
                : virtual ? <Card><CardHeader className="flex-row gap-5"><StepIcon className="size-8 shrink-0 text-primary" aria-hidden /><div><CardTitle className="text-xl">{step.title}</CardTitle><CardDescription className="mt-3 leading-relaxed">{step.body}</CardDescription></div></CardHeader></Card>
                : port ? <Card><CardHeader className="flex-row gap-4"><Badge className="size-9 shrink-0 justify-center rounded-full">{index + 1}</Badge><div><CardTitle>{step.title}</CardTitle><CardDescription className="mt-3 leading-relaxed">{step.body}</CardDescription></div></CardHeader></Card>
                : <div className="relative flex gap-5 border-l-2 border-primary/30 pb-8 pl-7"><Badge variant="secondary" className="size-10 shrink-0 justify-center rounded-full">{index + 1}</Badge><div><h3 className="text-xl font-semibold">{step.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p></div></div>}
              </li>;
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Specifications({ product }: { product: ProductDetail }) {
  if (!product.specs?.length) return null;
  return <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><div className="grid gap-10 lg:grid-cols-3"><div><Badge variant="secondary">Technical overview</Badge><h2 className="mt-5 text-3xl font-semibold">What connects to what</h2><p className="mt-4 leading-relaxed text-muted-foreground">Review the deployment, management and routing details for {product.title}.</p></div><dl className="grid gap-x-8 sm:grid-cols-2 lg:col-span-2">{product.specs.map(spec => <div key={spec.label} className="border-b border-border py-5"><dt className="font-semibold">{spec.label}</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{spec.value}</dd></div>)}</dl></div></section>;
}

export function VoiceProductPage({ product }: { product: ProductDetail }) {
  const story = stories[product.slug];
  const port = product.slug === "number-porting";
  const destination = product.slug === "virtual-numbers" || product.slug === "did-numbers";
  const related = productDetails.filter(item => item.categorySlug === product.categorySlug && item.slug !== product.slug).slice(0, 3);
  const sections = {
    problem: (product.problem && <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><div className="grid gap-10 lg:grid-cols-2"><div><h2 className="text-3xl font-semibold tracking-tight">{product.problem.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{product.problem.body}</p></div><Card className="bg-muted/30"><CardHeader><CardTitle className="text-xl">{product.approach?.heading}</CardTitle></CardHeader><CardContent className="space-y-4">{product.approach?.body.map(body => <p key={body} className="leading-relaxed text-muted-foreground">{body}</p>)}</CardContent></Card></div></section>),
    capabilities: (<section className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><div className="mb-10 flex items-center gap-4">{product.slug !== "toll-free-numbers" && product.slug !== "virtual-numbers" && (port ? <ClipboardCheck className="size-8 text-primary" /> : destination ? <MapPin className="size-8 text-primary" /> : product.slug === "hosted-pbx" ? <Building2 className="size-8 text-primary" /> : product.slug === "ip-pbx" ? <Server className="size-8 text-primary" /> : <Cloud className="size-8 text-primary" />)}<h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{story.title}</h2></div><Capabilities product={product} /></section>),
    process: <Process product={product} />,
    audiences: (<section className="border-y border-border bg-muted/30"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><h2 className="text-3xl font-semibold">Where {product.title} fits</h2><div className={product.slug === "ip-pbx" ? "mt-10 grid gap-5 lg:grid-cols-2" : "mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2"}>{product.audiences?.length ? product.audiences.map(audience => <Card key={audience.situation} className={product.slug === "ip-pbx" ? "bg-background" : "border-0 bg-transparent shadow-none ring-0"}><CardHeader><CardTitle className="text-xl">{audience.situation}</CardTitle><CardDescription className="mt-3 text-base leading-relaxed">{audience.fit}</CardDescription></CardHeader></Card>) : product.idealFor.map(item => <p key={item} className="flex gap-3"><Check className="size-5 text-primary" />{item}</p>)}</div></div></section>),
    specs: <Specifications product={product} />,
    migration: (product.migration && (product.slug === "hosted-pbx" ? <HostedMigration migration={product.migration} /> : product.slug === "did-numbers" ? <DirectNumberSetup migration={product.migration} /> : product.slug === "toll-free-numbers" ? <TollFreeSetup migration={product.migration} /> : product.slug === "virtual-numbers" ? <VirtualNumberSetup migration={product.migration} /> : <section className="border-y border-border"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><div className="max-w-2xl"><Badge variant="outline">{port ? "Your porting plan" : "Getting started"}</Badge><h2 className="mt-5 text-3xl font-semibold">{product.migration.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{product.migration.intro}</p></div><ol className={port ? "mt-12 space-y-0" : product.slug === "cloud-pbx" ? "mt-12 grid gap-5 md:grid-cols-2" : "mt-12 grid gap-8 lg:grid-cols-3"}>{product.migration.steps.map((step, i) => <li key={step.title}>{port ? <div className="grid gap-5 border-t border-border py-7 sm:grid-cols-3"><h3 className="flex gap-4 text-xl font-semibold"><Badge className="size-8 shrink-0 justify-center rounded-full">{i + 1}</Badge>{step.title}</h3><p className="leading-relaxed text-muted-foreground sm:col-span-2">{step.body}</p></div> : <Card className={product.slug === "virtual-numbers" && i === 0 ? "bg-primary/5" : ""}><CardHeader><Badge variant="secondary" className="mb-3 w-fit">Step {i + 1}</Badge><CardTitle className="text-lg">{step.title}</CardTitle><CardDescription className="mt-3 leading-relaxed">{step.body}</CardDescription></CardHeader></Card>}</li>)}</ol></div></section>)),
  };
  const sectionOrder: Record<string, (keyof typeof sections)[]> = {
    "cloud-pbx": ["capabilities", "process", "audiences", "problem", "specs", "migration"],
    "hosted-pbx": ["problem", "capabilities", "migration", "specs", "process", "audiences"],
    "ip-pbx": ["problem", "specs", "capabilities", "process", "audiences", "migration"],
    "did-numbers": ["process", "capabilities", "specs", "audiences", "problem", "migration"],
    "toll-free-numbers": ["audiences", "problem", "process", "capabilities", "specs", "migration"],
    "virtual-numbers": ["capabilities", "audiences", "specs", "process", "problem", "migration"],
    "number-porting": ["process", "problem", "migration", "capabilities", "specs", "audiences"],
  };
  return <>
    <ProductHero product={product} headline={story.headline} action={story.action} secondaryLabel="How it works" imageAlt={story.alt} />
    {product.slug === "cloud-pbx" && <CcaasCallFlow />}
    {product.slug === "hosted-pbx" && <UcaasWorkspaces />}
    <ProductConnectionDiagram product={product} />
    {sectionOrder[product.slug].map(key => <Fragment key={key}>{sections[key]}</Fragment>)}
    {product.faqs?.length && <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><div className="grid gap-10 lg:grid-cols-3"><div><h2 className="text-3xl font-semibold">Questions about {product.title}</h2><p className="mt-4 text-muted-foreground">Talk through your requirements with the SipLink team.</p><Button asChild variant="link" className="mt-3 px-0"><Link href="/contact">Ask us directly<ArrowRight /></Link></Button></div><Accordion type="single" collapsible className="lg:col-span-2">{product.faqs.map(faq => <AccordionItem key={faq.question} value={faq.question}><AccordionTrigger className="text-left text-base">{faq.question}</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>}
    <ClosingCta eyebrow={product.outcome?.heading ?? "Your next step"} heading={`Build ${product.title} around your business`} body={product.outcome?.body ?? product.tagline} action={story.action} />
    <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10"><Separator /><h2 className="mt-10 text-2xl font-semibold">More in {product.category}</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{related.map(item => <Card key={item.slug}><CardHeader><CardTitle><Link className="hover:text-primary" href={`/products/${item.slug}`}>{item.title}</Link></CardTitle><CardDescription>{item.tagline}</CardDescription></CardHeader><CardContent><Button asChild variant="link" className="px-0"><Link href={`/products/${item.slug}`}>Explore {item.title}<ArrowRight /></Link></Button></CardContent></Card>)}</div></section>
  </>;
}
