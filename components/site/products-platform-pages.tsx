import { ClosingCta } from "@/components/site/closing-cta";
import { Fragment, type CSSProperties } from "react";
import { ProductHero } from "@/components/site/product-hero";
import { ProductConnectionDiagram } from "@/components/site/product-connection-diagram";
import { IntegrationWall } from "@/components/site/integration-wall";
import { ArrowRight, Braces, Check, CheckCheck, MessageCircle, Phone, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ProductDetail } from "@/lib/products";
import { cn } from "@/lib/utils";

export const PLATFORM_PRODUCT_SLUGS: string[] = ["voice-api", "sms-api", "whatsapp-api", "webrtc-sdk", "sip-api", "teams-calling", "sbc", "crm-integration"];

type Direction = { headline: string; action: string; story: string; capabilities: string; alt: string; labels: string[] };
const directions: Record<string, Direction> = {
  "voice-api": { headline: "Calling belongs inside your product.", action: "Discuss your voice workflow", story: "Your application starts it. Your application knows how it ends.", capabilities: "From the first click to the call record.", alt: "White application sculpture with a pink glass handset and flowing voice waveforms", labels: ["Your application", "Voice network", "Call events"] },
  "sms-api": { headline: "The update happens. The message follows.", action: "Plan your messaging integration", story: "A business event becomes a customer update.", capabilities: "Useful messages, sent by the system that knows.", alt: "White smartphone and event cube with pink glass message envelopes and receipt tiles", labels: ["Business event", "Customer message", "Delivery outcome"] },
  "whatsapp-api": { headline: "Keep the conversation going on WhatsApp.", action: "Discuss your WhatsApp workflow", story: "Messages connect to a conversation, and a conversation connects to your team.", capabilities: "A richer place for your customer conversations.", alt: "Two white phone sculptures linked by translucent pink speech bubbles and attachment tiles", labels: ["Customer conversation", "Business workflow", "Your team"] },
  "webrtc-sdk": { headline: "A conversation starts where your customer already is.", action: "Discuss your browser experience", story: "The browser becomes a place to talk.", capabilities: "Build the communication experience around your application.", alt: "White laptop with floating pink glass video frame, microphone and connected browser windows", labels: ["Your browser interface", "Real-time communication", "Your application"] },
  "sip-api": { headline: "Build on the voice infrastructure you already run.", action: "Review your SIP architecture", story: "Application logic meets the SIP environment.", capabilities: "Control at the level your architecture needs.", alt: "White rack server, pink glass code brackets and transparent tubes connected to a PBX cube", labels: ["Your application", "SIP environment", "Existing PBX"] },
  "teams-calling": { headline: "Your working day is in Teams. Your calls can be, too.", action: "Plan calling for your Teams estate", story: "Bring the outside world into your Teams environment.", capabilities: "One familiar workspace. Business calling connected.", alt: "White collaboration window with avatar discs joined to a pink glass handset by an arch", labels: ["Business numbers", "SipLink connectivity", "Teams users"] },
  "sbc": { headline: "Give your voice network a deliberate boundary.", action: "Review your voice environment", story: "A control point between your systems and the outside world.", capabilities: "Connect, control and observe the voice perimeter.", alt: "Translucent pink glass shield between two white network towers with a connection through its gateway", labels: ["Internal voice systems", "Managed boundary", "External SIP networks"] },
  "crm-integration": { headline: "Every call belongs with the customer record.", action: "Discuss your CRM workflow", story: "Before the call. During the conversation. After the answer.", capabilities: "Fewer steps between the call and the customer.", alt: "White customer-record folder and contact cards looped to a pink glass handset by a ribbon", labels: ["Customer record", "Caller context", "Activity history"] },
};

function Step({ step, index, icon: Icon, className }: { step: { title: string; body: string }; index: number; icon?: LucideIcon; className?: string }) {
  return <Card className={cn("gap-4 shadow-none", className)}><CardHeader><Badge variant="secondary" className="mb-3 w-fit gap-2">{Icon && <Icon aria-hidden className="size-4" />}Step {index + 1}</Badge><CardTitle className="text-xl leading-snug">{step.title}</CardTitle></CardHeader><CardContent><p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p></CardContent></Card>;
}

function WhatsappThreadPreview() {
  return <Card data-whatsapp-thread-preview className="mt-8 gap-5 bg-muted/20 shadow-none">
    <CardHeader className="gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3"><MessageCircle aria-hidden className="size-6 text-primary" /><Badge variant="outline">Illustrative conversation</Badge></div>
      <CardTitle className="text-lg">One thread. Shared context.</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <Card className="mr-8 gap-2 rounded-bl-none bg-background py-4 shadow-none"><CardContent className="space-y-2 px-4"><p className="text-xs font-medium text-muted-foreground">Customer</p><p className="text-sm leading-relaxed">Can you help me with my office delivery?</p></CardContent></Card>
      <Card className="ml-8 gap-2 rounded-br-none bg-primary/5 py-4 shadow-none ring-primary/15"><CardContent className="space-y-2 px-4"><p className="text-xs font-medium text-primary">Support team</p><p className="text-sm leading-relaxed">I have your earlier messages. Let me check the delivery for you.</p><CheckCheck aria-hidden className="ml-auto size-4 text-primary" /></CardContent></Card>
      <div className="flex items-start gap-3 pt-1"><Users aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" /><p className="text-sm leading-relaxed text-muted-foreground">The conversation history stays with the customer, whoever replies next.</p></div>
    </CardContent>
  </Card>;
}

function TeamsRollout({ steps }: { steps: { title: string; body: string }[] }) {
  const icons = [ShieldCheck, Users, ArrowRight, Phone];
  return <ol className="mt-10 grid gap-6 md:grid-cols-2">
    {steps.map((step, index) => {
      const Icon = icons[index % icons.length];
      return <li key={step.title}>
        <Card data-teams-rollout-step className="teams-rollout-card group relative h-full overflow-hidden gap-5 py-7 shadow-none transition-[box-shadow,background-color] duration-300 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/30 motion-reduce:transition-none" style={{ "--rollout-delay": `${index * 2}s` } as CSSProperties}>
          <CardHeader className="gap-5 px-6 sm:px-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><Badge size="icon" className="text-base shadow-sm shadow-primary/20">{index + 1}</Badge><span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span></div>
              <Icon aria-hidden className="size-6 text-primary/60 transition-transform duration-300 motion-safe:group-hover:scale-110 motion-reduce:transition-none" />
            </div>
            <CardTitle><h3 className="text-xl leading-snug font-semibold tracking-tight">{step.title}</h3></CardTitle>
          </CardHeader>
          <CardContent className="px-6 sm:px-7"><p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p></CardContent>
        </Card>
      </li>;
    })}
  </ol>;
}

/** Each product uses its own story structure; source copy remains the authority. */
function ProductStory({ product, direction }: { product: ProductDetail; direction: Direction }) {
  const steps = product.explainer?.steps ?? [];
  if (product.slug === "voice-api") return <div className="grid items-start gap-8 lg:grid-cols-5"><div className="lg:col-span-2"><Phone aria-hidden className="mb-6 size-10 text-primary" /><h3 className="text-2xl font-semibold">The call is part of your workflow.</h3><p className="mt-4 leading-relaxed text-muted-foreground">{product.explainer?.definition}</p></div><ol className="space-y-4 lg:col-span-3">{steps.map((step, index) => <li key={step.title}><Step step={step} index={index} icon={index === 0 ? Braces : index === 1 ? Phone : Check} className={index === 1 ? "border-primary/30 bg-primary/5" : ""} /></li>)}</ol></div>;
  if (product.slug === "sms-api") return <><p className="mb-10 max-w-3xl leading-relaxed text-muted-foreground">{product.explainer?.definition}</p><ol className="grid gap-5 md:grid-cols-3">{steps.map((step, index) => <li key={step.title} className="relative"><Step step={step} index={index} className="h-full border-t-4 border-t-primary/40" /></li>)}</ol></>;
  if (product.slug === "whatsapp-api") return <div className="grid gap-10 lg:grid-cols-2"><div><h3 className="text-2xl font-semibold">A channel your customers know.</h3><p className="mt-5 leading-relaxed text-muted-foreground">{product.explainer?.definition}</p><WhatsappThreadPreview /></div><ol className="space-y-6">{steps.map((step, index) => <li key={step.title} className={cn("max-w-md", index % 2 === 1 && "ml-auto")}><Card className={cn("gap-3 shadow-none", index % 2 === 0 ? "rounded-bl-none bg-primary/5" : "rounded-br-none bg-muted/50")}><CardHeader><Badge variant="outline" className="mb-2 w-fit">Step {index + 1}</Badge><CardTitle className="text-lg">{step.title}</CardTitle></CardHeader><CardContent><p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p></CardContent></Card></li>)}</ol></div>;
  if (product.slug === "webrtc-sdk") return <Card className="overflow-hidden gap-0 shadow-none"><CardHeader className="border-b border-border bg-muted/40"><div className="flex items-center gap-2"><Braces aria-hidden className="size-5 text-primary" /><CardTitle>Your application, with a place to talk</CardTitle></div></CardHeader><CardContent className="grid gap-8 pt-8 lg:grid-cols-2"><p className="leading-relaxed text-muted-foreground">{product.explainer?.definition}</p><ol className="divide-y divide-border">{steps.map((step, index) => <li key={step.title} className="py-5 first:pt-0"><Badge variant="secondary">Step {index + 1}</Badge><h3 className="mt-3 text-lg font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p></li>)}</ol></CardContent></Card>;
  if (product.slug === "sip-api") return <><div className="mb-9 flex flex-wrap items-center gap-4">{direction.labels.map((label, index) => <div key={label} className="flex items-center gap-4"><Badge variant={index === 1 ? "default" : "outline"} className="px-5 py-3 text-sm">{label}</Badge>{index < 2 && <ArrowRight aria-hidden className="size-5 text-muted-foreground" />}</div>)}</div><div className="grid gap-10 lg:grid-cols-2"><p className="leading-relaxed text-muted-foreground">{product.explainer?.definition}</p><ol className="space-y-7">{steps.map((step, index) => <li key={step.title} className="border-l-2 border-primary/30 pl-6"><Badge variant="secondary">Step {index + 1}</Badge><h3 className="mt-3 font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p></li>)}</ol></div></>;
  if (product.slug === "teams-calling") return <><div className="grid gap-6 md:grid-cols-2"><Card className="bg-muted/40 shadow-none"><CardHeader><Users aria-hidden className="mb-4 size-8 text-primary" /><CardTitle>{product.problem?.heading}</CardTitle></CardHeader><CardContent><p className="leading-relaxed text-muted-foreground">{product.problem?.body}</p></CardContent></Card><Card className="border-primary/30 shadow-none"><CardHeader><Phone aria-hidden className="mb-4 size-8 text-primary" /><CardTitle>Add external business calling</CardTitle></CardHeader><CardContent><p className="leading-relaxed text-muted-foreground">{product.explainer?.definition}</p></CardContent></Card></div><ol className="mt-8 grid gap-4 lg:grid-cols-3">{steps.map((step, index) => <li key={step.title}><Step step={step} index={index} className="h-full" /></li>)}</ol></>;
  if (product.slug === "sbc") return <div data-sbc-story className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
    <Card className="gap-6 bg-primary/5 py-7 shadow-none ring-primary/15 sm:py-8">
      <CardHeader className="gap-5 px-6 sm:px-8">
        <Badge size="icon" variant="secondary" className="bg-background text-primary ring-1 ring-primary/15"><ShieldCheck aria-hidden /></Badge>
        <CardTitle><h3 className="text-2xl leading-snug font-semibold tracking-tight">One boundary. Rules you can manage.</h3></CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-6 sm:px-8">
        <p className="text-base leading-relaxed text-muted-foreground">{product.explainer?.definition}</p>
        <Separator className="bg-primary/15" />
        <div aria-label="SIP communication crosses the SBC boundary" className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-background">Internal systems</Badge><ArrowRight aria-hidden className="size-4 text-primary" /><Badge>SBC</Badge><ArrowRight aria-hidden className="size-4 text-primary" /><Badge variant="outline" className="bg-background">External networks</Badge>
        </div>
      </CardContent>
    </Card>
    <ol className="space-y-6 border-l-2 border-primary/20">
      {steps.map((step, index) => <li key={step.title} className="relative pl-7 sm:pl-8">
        <Badge aria-hidden className="absolute -left-3 top-6 flex size-6 justify-center rounded-full p-0 ring-4 ring-background">{index + 1}</Badge>
        <Card data-sbc-story-step className="gap-3 bg-muted/30 py-6 shadow-none ring-0 transition-colors duration-300 hover:bg-primary/5 motion-reduce:transition-none">
          <CardHeader className="gap-3 px-5 sm:px-6"><Badge variant="outline" className="w-fit bg-background">Step {index + 1}</Badge><CardTitle><h3 className="text-lg leading-snug font-semibold">{step.title}</h3></CardTitle></CardHeader>
          <CardContent className="px-5 sm:px-6"><p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p></CardContent>
        </Card>
      </li>)}
    </ol>
  </div>;
  return <div id="crm-workflow" className="grid scroll-mt-36 items-start gap-10 lg:grid-cols-5">
    <p className="max-w-prose leading-relaxed text-muted-foreground lg:col-span-2">{product.explainer?.definition}</p>
    <ol className="space-y-4 lg:col-span-3">{steps.map((step, index) => <li key={step.title}>
      <Card data-crm-workflow-step className={cn("gap-0 py-6 shadow-none transition-colors duration-300 hover:bg-primary/5 hover:ring-primary/25 motion-reduce:transition-none", index === 1 ? "bg-primary/5 ring-primary/15" : "bg-muted/30 ring-0")}>
        <CardContent className="flex items-start gap-4 px-5 sm:gap-5 sm:px-6">
          <Badge size="icon" className="shrink-0 text-base">{index + 1}</Badge>
          <div className="min-w-0"><h3 className="text-lg leading-snug font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p></div>
        </CardContent>
      </Card>
    </li>)}</ol>
  </div>;
}

function Capabilities({ product }: { product: ProductDetail }) {
  const features = product.features;
  const titles = product.slug === "sbc" ? ["At the connection", "At the boundary", "Across the estate"] : product.slug === "teams-calling" ? ["Connect the numbers", "Route the conversations", "Enable your people"] : ["Control the architecture", "Connect the voice paths", "Keep existing systems working"];
  const groups = product.slug === "sbc" ? [[0, 1, 2], [4, 5], [3, 6, 7]] : product.slug === "teams-calling" ? [[0, 1, 6], [2, 4, 5], [3, 7]] : [[0, 1, 2], [4, 5], [3, 6, 7]];
  if (product.slug === "sbc") return <div className="space-y-5">
    {titles.map((title, group) => <Card key={title} data-sbc-feature-group className={cn("grid gap-7 rounded-2xl py-7 shadow-none ring-0 lg:grid-cols-4 lg:gap-8 sm:py-8", group === 1 ? "bg-primary/5" : "bg-muted/40")}>
      <CardHeader className="px-6 lg:pr-0 sm:px-8"><CardTitle><h3 className="text-xl leading-snug font-semibold tracking-tight">{title}</h3></CardTitle></CardHeader>
      <CardContent className={cn("grid gap-7 px-6 sm:px-8 lg:col-span-3", group === 1 ? "md:grid-cols-2" : "md:grid-cols-3")}>
        {features.filter((_, index) => groups[group].includes(index)).map(({ title: featureTitle, description, icon: Icon }) => <div key={featureTitle} data-sbc-capability={featureTitle} className="group border-l-2 border-primary/20 pl-5 transition-colors duration-300 hover:border-primary motion-reduce:transition-none">
          <Badge size="icon" variant="secondary" className="mb-4 bg-background text-primary ring-1 ring-primary/10"><Icon aria-hidden className="transition-transform duration-300 motion-safe:group-hover:scale-110 motion-reduce:transition-none" /></Badge>
          <h4 className="text-base leading-snug font-semibold">{featureTitle}</h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>)}
      </CardContent>
    </Card>)}
  </div>;
  if (product.slug === "teams-calling") return <div className="space-y-5">
    {titles.map((title, group) => <Card key={title} data-teams-feature-group className={cn("grid gap-7 rounded-2xl py-7 shadow-none ring-0 lg:grid-cols-4 lg:gap-8 sm:py-8", group === 1 ? "bg-primary/5" : "bg-muted/40")}>
      <CardHeader className="gap-4 px-6 lg:pr-0 sm:px-8">
        <Badge size="icon" variant="secondary" className="bg-background text-primary ring-1 ring-primary/10">{group === 0 ? <Phone aria-hidden /> : group === 1 ? <ArrowRight aria-hidden /> : <Users aria-hidden />}</Badge>
        <CardTitle><h3 className="text-xl font-semibold tracking-tight">{title}</h3></CardTitle>
      </CardHeader>
      <CardContent className={cn("grid gap-6 px-6 sm:px-8 lg:col-span-3", group === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
        {features.filter((_, index) => groups[group].includes(index)).map(({ title: featureTitle, description, icon: Icon }) => <div key={featureTitle} data-teams-capability={featureTitle} className="group border-l-2 border-primary/20 pl-5 transition-colors duration-300 hover:border-primary motion-reduce:transition-none">
          <Icon aria-hidden className="mb-4 size-5 text-primary transition-transform duration-300 motion-safe:group-hover:scale-110 motion-reduce:transition-none" />
          <h4 className="text-base leading-snug font-semibold">{featureTitle}</h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>)}
      </CardContent>
    </Card>)}
  </div>;
  if (product.slug === "sip-api") return <div className="space-y-5">
    {titles.map((title, group) => <Card key={title} className={cn("grid gap-7 py-7 shadow-none ring-0 lg:grid-cols-4 lg:gap-0 sm:py-8", group === 1 ? "bg-primary/5" : "bg-muted/30")}>
      <CardHeader className="px-6 sm:px-8"><CardTitle><h3 className="text-xl leading-snug font-semibold tracking-tight">{title}</h3></CardTitle></CardHeader>
      <CardContent className={cn("grid gap-7 px-6 sm:px-8 lg:col-span-3", group === 1 ? "md:grid-cols-2" : "md:grid-cols-3")}>
        {features.filter((_, index) => groups[group].includes(index)).map(({ title: featureTitle, description, icon: Icon }) => <div key={featureTitle} data-sip-capability={featureTitle}>
          <Icon aria-hidden className="mb-4 size-6 text-primary" />
          <h4 className="text-base font-semibold">{featureTitle}</h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>)}
      </CardContent>
    </Card>)}
  </div>;
  if (["sbc", "sip-api", "teams-calling"].includes(product.slug)) return <div className="grid gap-8 lg:grid-cols-3">{titles.map((title, group) => <Card key={title} className={cn("shadow-none", group === 1 && "border-primary/30 bg-primary/5")}><CardHeader><CardTitle className="text-xl">{title}</CardTitle></CardHeader><CardContent className="space-y-6">{features.filter((_, index) => groups[group].includes(index)).map(({ title: featureTitle, description, icon: Icon }) => <div key={featureTitle}><Icon aria-hidden className="mb-3 size-5 text-primary" /><h3 className="font-semibold">{featureTitle}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></div>)}</CardContent></Card>)}</div>;
  if (product.slug === "crm-integration") return <div className="divide-y divide-border">{features.map(({ title, description, icon: Icon }) => <div key={title} className="grid gap-4 py-6 md:grid-cols-3"><h3 className="flex items-start gap-3 text-lg font-semibold"><Icon aria-hidden className="mt-1 size-5 shrink-0 text-primary" />{title}</h3><p className="leading-relaxed text-muted-foreground md:col-span-2">{description}</p></div>)}</div>;
  if (product.slug === "whatsapp-api") return <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">{features.map(({ title, description, icon: Icon }, index) => <Card key={title} data-whatsapp-capability={title} className={cn("shadow-none transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:bg-primary/5 hover:ring-primary/40 hover:shadow-lg hover:shadow-primary/10 motion-safe:hover:-translate-y-1 [&_svg]:transition-transform [&_svg]:duration-300 motion-safe:hover:[&_svg]:scale-110 motion-reduce:transition-none motion-reduce:[&_svg]:transition-none", index === 0 && "bg-primary/5 md:col-span-2")}><CardHeader><Icon aria-hidden className="mb-3 size-6 text-primary" /><CardTitle>{title}</CardTitle><CardDescription className="mt-3 leading-relaxed">{description}</CardDescription></CardHeader></Card>)}</div>;
  if (product.slug === "webrtc-sdk") return <div className="grid gap-6 lg:grid-cols-2">
    {[{ title: "Calling in your product", indices: [0, 1, 2, 3] }, { title: "Context and integration", indices: [4, 5, 6, 7] }].map(({ title: groupTitle, indices }, group) => <Card key={groupTitle} className={cn("gap-8 py-7 shadow-none sm:py-8", group === 0 ? "bg-primary/5 ring-primary/10" : "bg-muted/20 ring-0")}>
      <CardHeader className="px-6 sm:px-8"><CardTitle><h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{groupTitle}</h3></CardTitle></CardHeader>
      <CardContent className="grid flex-1 grid-rows-4 gap-8 px-6 sm:px-8">{features.filter((_, index) => indices.includes(index)).map(({ title, description, icon: Icon }) => <div key={title} data-webrtc-capability={title} className="flex items-start gap-4">
        <Badge size="icon" variant="secondary" className="bg-background text-primary ring-1 ring-primary/10"><Icon aria-hidden /></Badge>
        <div><h4 className="text-base font-semibold">{title}</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></div>
      </div>)}</CardContent>
    </Card>)}
  </div>;
  return <div className={cn("grid gap-6", product.slug === "sms-api" ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2")}>{features.map(({ title, description, icon: Icon }) => <Card key={title} data-voice-capability={product.slug === "voice-api" ? title : undefined} data-sms-capability={product.slug === "sms-api" ? title : undefined} className={cn("gap-3 shadow-none", ["voice-api", "sms-api"].includes(product.slug) && "transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:bg-primary/5 hover:ring-primary/40 hover:shadow-lg hover:shadow-primary/10 motion-safe:hover:-translate-y-1 [&_svg]:transition-transform [&_svg]:duration-300 motion-safe:hover:[&_svg]:scale-110 motion-reduce:transition-none motion-reduce:[&_svg]:transition-none")}><CardHeader><Icon aria-hidden className="mb-4 size-7 text-primary" /><CardTitle className="text-lg">{title}</CardTitle></CardHeader><CardContent><p className="text-sm leading-relaxed text-muted-foreground">{description}</p></CardContent></Card>)}</div>;
}

export function PlatformProductPage({ product }: { product: ProductDetail }) {
  const direction = directions[product.slug];
  const sections = {
story: (<section id="how-it-works" className="scroll-mt-28"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"><h2 className="mb-9 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{direction.story}</h2><ProductStory product={product} direction={direction} /></div></section>),
integrations: (product.slug === "crm-integration" && <IntegrationWall heading="Your CRM, connected to the call." description="SipLink connects with Salesforce, HubSpot, Zoho, Bitrix24, Odoo, Zendesk and CEIPAL, alongside the workplace tools your team uses. The exact calling workflows depend on your setup and are confirmed during onboarding." />),
problem: (product.problem && product.slug !== "teams-calling" && <section className="border-y border-border bg-muted/30"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2 lg:px-10"><div><h2 className="text-2xl font-semibold tracking-tight">{product.problem.heading}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{product.problem.body}</p></div>{product.slug === "sip-api" ? <Card id="sip-approach" className="gap-5 border-l-4 border-l-primary bg-primary/5 py-7 shadow-none ring-primary/20 sm:py-8"><CardHeader className="px-6 sm:px-8"><CardTitle><h2 className="text-2xl font-semibold tracking-tight">{product.approach?.heading}</h2></CardTitle></CardHeader><CardContent className="space-y-4 px-6 sm:px-8">{product.approach?.body.map((paragraph) => <p key={paragraph} className="leading-relaxed text-muted-foreground">{paragraph}</p>)}</CardContent></Card> : <div><h2 className="text-2xl font-semibold tracking-tight">{product.approach?.heading}</h2>{product.approach?.body.map((paragraph) => <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground">{paragraph}</p>)}</div>}</div></section>),
approach: (product.slug === "teams-calling" && product.approach && <section className="bg-muted/30"><div className="mx-auto max-w-7xl px-6 py-12 lg:px-10"><h2 className="text-2xl font-semibold">{product.approach.heading}</h2>{product.approach.body.map((paragraph) => <p key={paragraph} className="mt-4 max-w-4xl leading-relaxed text-muted-foreground">{paragraph}</p>)}</div></section>),
capabilities: (<section id="capabilities" className="scroll-mt-36"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"><h2 className="mb-10 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{direction.capabilities}</h2><Capabilities product={product} /></div></section>),
audiences: (!!product.audiences?.length && <section className="border-y border-border bg-muted/30"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><h2 className="mb-8 text-3xl font-semibold tracking-tight">Where {product.title} fits your business.</h2><div className={cn("grid gap-7", ["voice-api", "sms-api"].includes(product.slug) ? "lg:grid-cols-2" : "lg:grid-cols-4")}>{product.audiences.map(({ situation, fit }) => <div key={situation} className="border-l-2 border-primary/30 pl-5"><h3 className="text-lg leading-snug font-semibold">{situation}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{fit}</p></div>)}</div></div></section>),
specs: (!!product.specs?.length && <section><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><div className="grid gap-10 lg:grid-cols-3"><div><h2 className="text-3xl font-semibold tracking-tight">The integration in detail.</h2><p className="mt-4 leading-relaxed text-muted-foreground">Review the capabilities and the setup that applies to your environment.</p></div><Card className="overflow-hidden gap-0 py-0 shadow-none lg:col-span-2"><Table><TableHeader><TableRow><TableHead className="px-5">Capability</TableHead><TableHead className="px-5">What it covers</TableHead></TableRow></TableHeader><TableBody>{product.specs.map(({ label, value }) => <TableRow key={label}><TableCell className="px-5 py-4 align-top font-medium whitespace-normal">{label}</TableCell><TableCell className="px-5 py-4 whitespace-normal text-muted-foreground">{value}</TableCell></TableRow>)}</TableBody></Table></Card></div></div></section>),
migration: (product.migration && <section id={product.slug === "teams-calling" ? "teams-rollout" : undefined} className="scroll-mt-36 bg-muted/30"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><h2 className="text-3xl font-semibold tracking-tight">{product.migration.heading}</h2><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{product.migration.intro}</p>{product.slug === "teams-calling" ? <TeamsRollout steps={product.migration.steps} /> : <ol className="mt-10 grid gap-5 md:grid-cols-2">{product.migration.steps.map((step, index) => <li key={step.title}><Step step={step} index={index} className="h-full" /></li>)}</ol>}</div></section>),
  };
  const order: Record<string, (keyof typeof sections)[]> = {
    "voice-api": ["story", "problem", "capabilities", "specs", "audiences", "migration", "approach"],
    "sms-api": ["audiences", "story", "capabilities", "problem", "specs", "migration", "approach"],
    "whatsapp-api": ["story", "audiences", "problem", "capabilities", "specs", "migration", "approach"],
    "webrtc-sdk": ["story", "capabilities", "problem", "specs", "audiences", "migration", "approach"],
    "sip-api": ["problem", "story", "specs", "capabilities", "audiences", "migration", "approach"],
    "teams-calling": ["story", "approach", "migration", "capabilities", "audiences", "specs", "problem"],
    "sbc": ["story", "specs", "problem", "capabilities", "audiences", "migration", "approach"],
    "crm-integration": ["story", "integrations", "problem", "audiences", "capabilities", "specs", "migration", "approach"],
  };
  return <>
    <ProductHero product={product} headline={direction.headline} action={direction.action} secondaryLabel={`Explore ${product.title}`} imageAlt={direction.alt} />
    <ProductConnectionDiagram product={product} />
    {order[product.slug].map((key) => <Fragment key={key}>{sections[key]}</Fragment>)}
    <section className="border-t border-border"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-3 lg:px-10"><h2 className="text-3xl font-semibold tracking-tight">Questions about {product.title}.</h2><Accordion type="single" collapsible className="lg:col-span-2">{product.faqs?.map(({ question, answer }, index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger className="text-left text-base">{question}</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    <ClosingCta heading={product.outcome?.heading ?? `Build with ${product.title}`} body={product.outcome?.body ?? product.tagline} action={direction.action} />
  </>;
}
