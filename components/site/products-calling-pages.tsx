import { ClosingCta } from "@/components/site/closing-cta";
import { ProductHero } from "@/components/site/product-hero";
import { ProductConnectionDiagram } from "@/components/site/product-connection-diagram";
import { Check, FileText, Headset, MessagesSquare, Mic, Play, ShieldCheck, Users, Workflow } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductDetail } from "@/lib/products";
import { cn } from "@/lib/utils";

export const CALLING_PRODUCT_SLUGS: string[] = ["call-center", "predictive-dialer", "ivr", "call-recording", "call-analytics", "call-queue", "ai-voice-assistant"];

const direction: Record<string, { heading: string; label: string; note: string; featureHeading: string; alt: string }> = {
  "call-center": { heading: "Bring every call and every agent together.", label: "One connected operation", note: "Routing, queues and agents", featureHeading: "Your operation, connected", alt: "White headset hub connecting pink glass agent stations" },
  "predictive-dialer": { heading: "Keep your next conversation moving.", label: "Paced around your team", note: "Agent availability guides dialling", featureHeading: "From waiting to speaking", alt: "Pink glass call lanes approaching white agent stations" },
  ivr: { heading: "Give every caller a clear way forward.", label: "A greeting. A choice. A destination.", note: "Your call flow, in your words", featureHeading: "Design the path your callers take", alt: "Pink glass branching voice menu connecting white destination platforms" },
  "call-recording": { heading: "Keep the conversation. Find the detail.", label: "Capture with control", note: "Recording rules and access permissions", featureHeading: "A useful record of what was said", alt: "Pink glass audio waveform on a white archive reel beside a padlock" },
  "call-analytics": { heading: "See the story behind your calls.", label: "Decisions from call activity", note: "Volumes, outcomes and team performance", featureHeading: "Look beyond the call count", alt: "White reporting sheets with pink glass analytical columns and arcs" },
  "call-queue": { heading: "A place for every caller. A plan for every call.", label: "Order when demand rises", note: "Queues shaped around your departments", featureHeading: "Make the wait part of the service", alt: "Orderly white caller spheres on a pink glass lane leading to headset stations" },
  "ai-voice-assistant": { heading: "Start with a conversation, not a menu.", label: "Listen. Understand. Connect.", note: "Voice assistance with a path to your team", featureHeading: "Help at the first hello", alt: "Blush glass conversational orb with voice ripples facing a white headset" },
};

function Feature({ feature, className }: { feature: ProductDetail["features"][number]; className?: string }) {
  const Icon = feature.icon;
  return <Card className={cn("h-full", className)}><CardHeader><Icon className="mb-3 size-6 text-primary" aria-hidden /><CardTitle className="text-xl">{feature.title}</CardTitle></CardHeader><CardContent><p className="leading-relaxed text-muted-foreground">{feature.description}</p></CardContent></Card>;
}

function SectionHeading({ children, body }: { children: React.ReactNode; body?: string }) {
  return <div className="mb-10 max-w-3xl"><h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{children}</h2>{body && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{body}</p>}</div>;
}

function Features({ product }: { product: ProductDetail }) {
  const features = product.features;
  switch (product.slug) {
    case "call-center":
      return <div className="grid gap-5 lg:grid-cols-3"><Card className="bg-primary text-primary-foreground lg:row-span-2"><CardHeader><Headset className="mb-6 size-12" aria-hidden /><CardTitle className="text-3xl">The whole team.<br />One calling environment.</CardTitle><CardDescription className="mt-3 text-primary-foreground/80">Connect the customer journey with the people who handle it.</CardDescription></CardHeader><CardContent className="mt-auto"><Badge variant="secondary">Inbound and outbound</Badge></CardContent></Card>{features.map((f) => <Feature key={f.title} feature={f} />)}</div>;
    case "predictive-dialer":
      return <div id="predictive-capabilities" className="grid gap-8 lg:grid-cols-2">
        {[{ title: "Run your campaign", indices: [0, 1, 2, 4] }, { title: "Monitor and improve", indices: [3, 5, 6, 7] }].map((group, index) => <Card key={group.title} className={cn("gap-8 py-8 shadow-none sm:py-10", index === 0 ? "bg-primary/5 ring-primary/10" : "bg-muted/20 ring-0")}>
          <CardHeader className="px-7 sm:px-10"><CardTitle><h3 className="text-2xl font-semibold tracking-tight">{group.title}</h3></CardTitle></CardHeader>
          <CardContent className="grid flex-1 gap-x-8 gap-y-10 px-7 sm:grid-cols-2 sm:grid-rows-2 sm:px-10">{group.indices.map(i => { const feature = features[i]; const Icon = feature.icon; return <div key={feature.title} data-predictive-feature><Icon className="mb-4 size-6 text-primary" aria-hidden /><h4 className="text-lg font-semibold leading-snug">{feature.title}</h4><p className="mt-3 text-base leading-relaxed text-muted-foreground">{feature.description}</p></div>; })}</CardContent>
        </Card>)}
      </div>;
    case "ivr":
      return <div className="relative"><Card className="mx-auto mb-8 max-w-lg bg-primary text-primary-foreground"><CardHeader className="text-center"><Mic className="mx-auto mb-3 size-8" aria-hidden /><CardTitle className="text-2xl">Welcome to your business</CardTitle><CardDescription className="text-primary-foreground/80">A voice menu built around what callers need</CardDescription></CardHeader></Card><div className="grid gap-5 border-t border-primary/30 pt-8 md:grid-cols-2 lg:grid-cols-3">{features.map((f) => <Feature key={f.title} feature={f} className="border-t-4 border-t-primary/40 transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:border-t-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 motion-safe:hover:-translate-y-1 [&_svg]:transition-transform [&_svg]:duration-300 motion-safe:hover:[&_svg]:scale-110 motion-reduce:transition-none motion-reduce:[&_svg]:transition-none" />)}</div></div>;
    case "call-recording":
      return <div id="recording-capabilities" className="space-y-10">
        <Card className="gap-6 bg-primary/5 py-7 shadow-none sm:py-8 lg:flex-row lg:items-center lg:gap-12">
          <CardHeader className="px-7 sm:px-8 lg:w-2/5"><Badge variant="outline" className="mb-3 w-fit bg-background">Illustrative recording view</Badge><CardTitle className="max-w-sm text-2xl font-semibold">A conversation you can return to</CardTitle></CardHeader>
          <CardContent className="px-7 sm:px-8 lg:flex-1 lg:pl-0"><div className="flex h-24 items-center justify-center gap-2" aria-hidden>{["h-4", "h-6", "h-12", "h-8", "h-16", "h-10", "h-20", "h-8", "h-16", "h-12", "h-6", "h-14", "h-4"].map((height, i) => <span key={i} className={cn("w-2 rounded-full bg-primary/70 sm:w-3", height)} />)}</div><div className="mt-3 flex items-center justify-between text-sm"><Play className="size-5 text-primary" aria-hidden /><span className="text-muted-foreground">Review the detail</span><ShieldCheck className="size-5 text-primary" aria-hidden /></div></CardContent>
        </Card>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-5">{features.map(f => { const Icon = f.icon; return <div key={f.title} data-recording-feature><Icon className="mb-4 size-6 text-primary" aria-hidden /><h3 className="text-lg font-semibold leading-snug">{f.title}</h3><p className="mt-3 text-base leading-relaxed text-muted-foreground">{f.description}</p></div>; })}</div>
      </div>;
    case "call-analytics":
      return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map((f, i) => <Feature key={f.title} feature={f} className={cn(i === 0 && "bg-primary text-primary-foreground [&_p]:text-primary-foreground/80 [&_svg]:text-primary-foreground md:col-span-2", i === 3 && "bg-accent/60")} />)}</div>;
    case "call-queue":
      return <div data-queue-capabilities className="space-y-8">
        <Card className="grid gap-6 bg-primary/5 py-6 shadow-none ring-primary/10 lg:grid-cols-4 lg:items-center">
          <CardHeader className="px-6"><CardTitle className="text-xl">Arrival → waiting → answer</CardTitle><CardDescription className="mt-2">The next step stays clear.</CardDescription></CardHeader>
          <CardContent className="px-6 lg:col-span-3">
            <ol className="grid gap-5 sm:grid-cols-3">{["Reach the department", "Hear queue announcements", "Connect to an available agent"].map((text, i) => <li key={text} className="flex items-start gap-3"><Badge className="flex size-6 shrink-0 justify-center rounded-full p-0">{i + 1}</Badge><p className="text-sm leading-relaxed font-medium">{text}</p></li>)}</ol>
          </CardContent>
        </Card>
        <div className="grid gap-5 md:grid-cols-2">{features.map(f => { const Icon = f.icon; return <Card key={f.title} data-queue-feature className="group gap-0 bg-muted/20 py-6 shadow-none transition-[background-color,box-shadow] duration-300 hover:bg-primary/5 hover:ring-primary/30 hover:shadow-md hover:shadow-primary/5 motion-reduce:transition-none">
          <CardContent className="flex items-start gap-4 px-6">
            <Badge size="icon" variant="secondary" className="shrink-0 bg-background text-primary ring-1 ring-primary/10"><Icon aria-hidden className="transition-transform duration-300 motion-safe:group-hover:scale-110 motion-reduce:transition-none" /></Badge>
            <div><h3 className="text-lg leading-snug font-semibold">{f.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p></div>
          </CardContent>
        </Card>; })}</div>
      </div>;
    default:
      return <div data-ai-capabilities className="space-y-8">
        <Card className="grid gap-7 bg-primary/5 py-7 shadow-none ring-primary/15 sm:py-8 lg:grid-cols-5 lg:items-center">
          <CardHeader className="gap-4 px-6 sm:px-8 lg:col-span-2">
            <Badge variant="outline" className="w-fit bg-background">Illustrative conversation</Badge>
            <CardTitle className="text-2xl leading-snug font-semibold">What can I help you with?</CardTitle>
            <CardDescription className="text-sm leading-relaxed">Collect the context. Carry it into the next step.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6 sm:px-8 lg:col-span-3">
            <Card className="ml-6 gap-0 bg-background py-4 shadow-none ring-0 sm:ml-12"><CardContent className="px-5"><p className="text-sm leading-relaxed">I need to speak to the right team.</p></CardContent></Card>
            <Card className="mr-6 gap-0 bg-primary py-4 text-primary-foreground shadow-none ring-0 sm:mr-12"><CardContent className="px-5"><p className="text-sm leading-relaxed">Tell me a little about your request, and I can help route your call.</p></CardContent></Card>
          </CardContent>
        </Card>
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 xl:grid-cols-4">{features.map(f => { const Icon = f.icon; return <div key={f.title} data-ai-feature className="border-t border-border pt-5">
          <Icon className="mb-4 size-6 text-primary" aria-hidden />
          <h3 className="text-lg leading-snug font-semibold">{f.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
        </div>; })}</div>
      </div>;
  }
}

function Explainer({ product }: { product: ProductDetail }) {
  if (!product.explainer) return null;
  const { question, definition, steps } = product.explainer;
  const vertical = ["call-recording", "ai-voice-assistant"].includes(product.slug);
  return <section className="border-y border-border bg-muted/30"><div className={cn("mx-auto max-w-7xl px-6 py-20 lg:px-10", vertical && "grid gap-12 lg:grid-cols-2")}><SectionHeading body={definition}>{question}</SectionHeading><div className={cn("grid gap-6", !vertical && "md:grid-cols-3")}>{steps.map((step, i) => <Card key={step.title} className={cn("bg-background", product.slug === "ivr" && i > 0 && "md:mt-8", product.slug === "predictive-dialer" && "border-b-4 border-b-primary/30")}><CardHeader><Badge variant="outline" className="w-fit">{i + 1}</Badge><CardTitle className="mt-2 text-xl">{step.title}</CardTitle></CardHeader><CardContent><p className="leading-relaxed text-muted-foreground">{step.body}</p></CardContent></Card>)}</div></div></section>;
}

function AssistantSpecs({ specs }: { specs: NonNullable<ProductDetail["specs"]> }) {
  const icons = { Interaction: Mic, Answering: Headset, Transcription: FileText, Summaries: MessagesSquare, Handoff: Users, Automation: Workflow };
  return <Card id="assistant-capabilities" className="mt-12 scroll-mt-36 gap-8 bg-muted/20 py-7 shadow-none ring-0 sm:py-9 lg:grid lg:grid-cols-4">
    <CardHeader className="gap-4 px-6 sm:px-8 lg:pr-0">
      <CardTitle><h3 className="text-2xl leading-snug font-semibold tracking-tight">Assistant capabilities</h3></CardTitle>
      <div className="h-1 w-12 rounded-full bg-primary" aria-hidden />
    </CardHeader>
    <CardContent className="px-6 sm:px-8 lg:col-span-3">
      <dl className="grid gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-3">{specs.map(s => {
        const Icon = icons[s.label as keyof typeof icons] ?? Mic;
        return <div key={s.label} data-assistant-spec className="border-l-2 border-primary/20 pl-5">
          <dt className="space-y-4"><Badge size="icon" variant="secondary" className="bg-background text-primary ring-1 ring-primary/10"><Icon aria-hidden /></Badge><span className="block text-base font-semibold">{s.label}</span></dt>
          <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.value}</dd>
        </div>;
      })}</dl>
    </CardContent>
  </Card>;
}

function Details({ product }: { product: ProductDetail }) {
  const audiences = product.audiences ?? product.idealFor.map((situation) => ({ situation, fit: product.tagline }));
  if (["ivr", "call-queue"].includes(product.slug)) {
    return <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><SectionHeading>{product.slug === "ivr" ? "Build around the people calling you" : "For teams facing the next busy hour"}</SectionHeading><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{audiences.map((a) => <Card key={a.situation} className="bg-accent/30"><CardHeader><CardTitle className="text-xl">{a.situation}</CardTitle></CardHeader><CardContent><p className="leading-relaxed text-muted-foreground">{a.fit}</p></CardContent></Card>)}</div>{product.specs && <div className="mt-12 border-y border-border py-8"><h3 className="mb-6 text-xl font-semibold">Inside {product.title}</h3><dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{product.specs.map((s) => <div key={s.label}><dt className="font-medium text-primary">{s.label}</dt><dd className="mt-2 leading-relaxed text-muted-foreground">{s.value}</dd></div>)}</dl></div>}</section>;
  }
  if (["call-recording", "ai-voice-assistant"].includes(product.slug)) {
return <section className="border-b border-border"><div className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><SectionHeading>{product.slug === "call-recording" ? "Define the record your business needs" : "Where conversation makes a difference"}</SectionHeading><div className="grid gap-10 lg:grid-cols-2">{audiences.map((a, i) => <div key={a.situation} className={cn("border-l-2 border-primary/30 pl-6", i % 2 === 1 && "lg:pt-10")}><h3 className="text-xl font-medium">{a.situation}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{a.fit}</p></div>)}</div>{product.specs && (product.slug === "ai-voice-assistant" ? <AssistantSpecs specs={product.specs} /> : <Card className="mt-12 bg-primary text-primary-foreground"><CardHeader><CardTitle className="text-2xl">{product.slug === "call-recording" ? "Recording and access" : "Assistant capabilities"}</CardTitle></CardHeader><CardContent><dl className="grid gap-6 md:grid-cols-2">{product.specs.map((s) => <div key={s.label} className="border-t border-primary-foreground/20 pt-4"><dt className="font-medium">{s.label}</dt><dd className="mt-2 leading-relaxed text-primary-foreground/80">{s.value}</dd></div>)}</dl></CardContent></Card>)}</div></section>;
  }
  return <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className={cn("grid gap-14 lg:grid-cols-2", product.slug === "call-analytics" && "lg:grid-cols-3")}><div className={product.slug === "call-analytics" ? "lg:col-span-2" : ""}><SectionHeading>Does this sound like your team?</SectionHeading><div className="space-y-6">{audiences.map((a) => <div key={a.situation} className="flex gap-4 border-b border-border pb-6"><Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden /><div><h3 className="text-lg font-medium">{a.situation}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{a.fit}</p></div></div>)}</div></div>{product.specs && <Card className="self-start bg-muted/40"><CardHeader><CardTitle className="text-2xl">Inside {product.title}</CardTitle><CardDescription>Capabilities at a glance</CardDescription></CardHeader><CardContent><dl className="divide-y divide-border">{product.specs.map((s) => <div key={s.label} className="py-4"><dt className="font-medium">{s.label}</dt><dd className="mt-2 leading-relaxed text-muted-foreground">{s.value}</dd></div>)}</dl></CardContent></Card>}</div></section>;
}

function Strategy({ product }: { product: ProductDetail }) {
  if (!product.problem && !product.approach) return null;
  if (product.slug === "call-center") return <section id="call-center-strategy" className="scroll-mt-36 border-b border-border">
    <div className="mx-auto grid max-w-7xl items-start gap-8 px-6 py-16 lg:grid-cols-2 lg:gap-12 lg:px-10">
      {product.problem && <div className="py-2 sm:py-5"><Badge variant="outline" className="mb-5">The challenge</Badge><h2 className="max-w-lg text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">{product.problem.heading}</h2><p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">{product.problem.body}</p></div>}
      {product.approach && <Card data-call-center-approach className="approach-running-outline gap-5 bg-primary/5 py-7 shadow-none ring-0 sm:py-8">
        <CardHeader className="gap-4 px-6 sm:px-8"><p className="text-sm font-medium text-primary">SipLink’s approach</p><CardTitle><h2 className="text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">{product.approach.heading}</h2></CardTitle></CardHeader>
        <CardContent className="space-y-4 px-6 sm:px-8">{product.approach.body.map(p => <p key={p} className="text-base leading-relaxed text-muted-foreground">{p}</p>)}</CardContent>
      </Card>}
    </div>
  </section>;
  if (product.slug === "call-analytics") {
    return <section id="analytics-strategy" className="mx-auto max-w-7xl scroll-mt-36 px-6 py-16 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {product.problem && <div className="py-7 sm:py-8 lg:pr-4"><p className="mb-4 text-sm font-medium text-muted-foreground">The challenge</p><h2 className="max-w-lg text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{product.problem.heading}</h2><p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{product.problem.body}</p></div>}
        {product.approach && <Card className="approach-running-outline gap-6 bg-primary/5 py-7 shadow-none ring-0 sm:py-8"><CardHeader className="px-7 sm:px-8"><p className="mb-3 text-sm font-medium text-primary">SipLink’s approach</p><CardTitle><h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{product.approach.heading}</h2></CardTitle></CardHeader><CardContent className="space-y-4 px-7 text-base leading-relaxed text-muted-foreground sm:px-8 sm:text-lg">{product.approach.body.map(p => <p key={p}>{p}</p>)}</CardContent></Card>}
      </div>
    </section>;
  }
  if (product.slug === "predictive-dialer") {
    return <section id="predictive-strategy" className="mx-auto max-w-7xl scroll-mt-36 px-6 py-16 lg:px-10">
      <Card className="gap-0 overflow-hidden py-0 shadow-none">
        {product.problem && <CardContent className="grid gap-6 bg-muted/30 p-7 sm:p-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-2"><p className="mb-3 text-sm font-medium text-muted-foreground">The challenge</p><h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{product.problem.heading}</h2></div>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-3">{product.problem.body}</p>
        </CardContent>}
        {product.approach && <CardContent className="grid gap-6 bg-primary/5 p-7 sm:p-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-2"><p className="mb-3 text-sm font-medium text-primary">With predictive dialling</p><h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{product.approach.heading}</h2></div>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-3">{product.approach.body.map(p => <p key={p}>{p}</p>)}</div>
        </CardContent>}
      </Card>
    </section>;
  }
  if (product.slug === "ai-voice-assistant") return <section id="ai-siplink-approach" className="scroll-mt-36 border-b border-border">
    <div className="mx-auto grid max-w-7xl items-start gap-8 px-6 py-16 lg:grid-cols-2 lg:gap-12 lg:px-10">
      {product.problem && <div className="py-2 sm:py-5"><Badge variant="outline" className="mb-5">The challenge</Badge><h2 className="max-w-lg text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">{product.problem.heading}</h2><p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">{product.problem.body}</p></div>}
      {product.approach && <Card data-ai-approach className="gap-5 border-l-4 border-l-primary bg-primary/5 py-7 shadow-sm shadow-primary/5 ring-primary/20 sm:py-8">
        <CardHeader className="gap-4 px-6 sm:px-8">
          <Badge size="icon" variant="secondary" className="bg-background text-primary ring-1 ring-primary/15"><Mic aria-hidden /></Badge>
          <CardTitle><h2 className="text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">{product.approach.heading}</h2></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-6 sm:px-8">{product.approach.body.map(p => <p key={p} className="text-base leading-relaxed text-muted-foreground">{p}</p>)}</CardContent>
      </Card>}
    </div>
  </section>;
  const band = ["call-analytics", "predictive-dialer", "call-queue"].includes(product.slug);
  if (product.slug === "call-queue") return <section id="queue-siplink-approach" className="scroll-mt-36 border-y border-border bg-muted/20">
    <div className="mx-auto grid max-w-7xl items-start gap-8 px-6 py-16 lg:grid-cols-2 lg:gap-12 lg:px-10">
      {product.problem && <div className="py-2 sm:py-5"><Badge variant="outline" className="mb-5 bg-background">The challenge</Badge><h2 className="max-w-lg text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">{product.problem.heading}</h2><p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">{product.problem.body}</p></div>}
      {product.approach && <Card className="gap-5 border-l-4 border-l-primary bg-primary/5 py-7 shadow-none ring-primary/20 sm:py-8">
        <CardHeader className="gap-4 px-6 sm:px-8"><p className="text-sm font-medium text-primary">SipLink’s approach</p><CardTitle><h2 className="text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">{product.approach.heading}</h2></CardTitle></CardHeader>
        <CardContent className="space-y-4 px-6 sm:px-8">{product.approach.body.map(p => <p key={p} className="text-base leading-relaxed text-muted-foreground">{p}</p>)}</CardContent>
      </Card>}
    </div>
  </section>;
  return <section className={band ? "bg-accent/40" : "border-b border-border"}><div className={cn("mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:px-10", band ? "lg:grid-cols-3" : "lg:grid-cols-2")}>
    {product.problem && <div><Badge variant="outline" className="mb-4">The challenge</Badge><h2 className="text-2xl font-semibold">{product.problem.heading}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{product.problem.body}</p></div>}
    {product.approach && (band ? <div className="lg:col-span-2 lg:border-l lg:border-border lg:pl-10"><h2 className="mb-6 text-2xl font-semibold">{product.approach.heading}</h2><div className="grid gap-6 md:grid-cols-2">{product.approach.body.map((p) => <p key={p} className="border-t border-primary/30 pt-4 leading-relaxed text-muted-foreground">{p}</p>)}</div></div> : <Card className="bg-muted/40"><CardHeader><CardTitle className="text-2xl">{product.approach.heading}</CardTitle></CardHeader><CardContent className="space-y-4">{product.approach.body.map((p) => <p key={p} className="leading-relaxed text-muted-foreground">{p}</p>)}</CardContent></Card>)}
  </div></section>;
}

function Migration({ product }: { product: ProductDetail }) {
  if (!product.migration) return null;
  return <section className="bg-accent/40"><div className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><SectionHeading body={product.migration.intro}>{product.migration.heading}</SectionHeading><div className={cn("grid gap-5", product.slug === "call-center" ? "lg:grid-cols-2" : "md:grid-cols-2")}>{product.migration.steps.map((step, i) => <Card key={step.title}><CardHeader><div className="flex items-center gap-4"><Badge className="size-9 justify-center rounded-full">{i + 1}</Badge><CardTitle className="text-xl">{step.title}</CardTitle></div></CardHeader><CardContent><p className="leading-relaxed text-muted-foreground">{step.body}</p></CardContent></Card>)}</div></div></section>;
}

export function CallingProductPage({ product }: { product: ProductDetail }) {
  const design = direction[product.slug];
  const bodySections = {
    strategy: <Strategy key="strategy" product={product} />,
    features: <section key="features" id="capabilities" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-10"><SectionHeading>{design.featureHeading}</SectionHeading><Features product={product} /></section>,
    explainer: <Explainer key="explainer" product={product} />,
    details: <Details key="details" product={product} />,
    migration: <Migration key="migration" product={product} />,
  };
  type BodySection = keyof typeof bodySections;
  const sectionOrder: Record<string, BodySection[]> = {
    "call-center": ["strategy", "features", "migration", "explainer", "details"],
    "predictive-dialer": ["explainer", "strategy", "features", "details", "migration"],
    ivr: ["explainer", "features", "strategy", "details", "migration"],
    "call-recording": ["details", "strategy", "features", "explainer", "migration"],
    "call-analytics": ["features", "strategy", "details", "explainer", "migration"],
    "call-queue": ["explainer", "details", "features", "strategy", "migration"],
    "ai-voice-assistant": ["explainer", "features", "details", "strategy", "migration"],
  };
  return <>
    <ProductHero product={product} headline={design.heading} action="Book a demo" secondaryLabel={`Explore ${product.title}`} secondaryHref="#capabilities" imageAlt={design.alt} />
    <ProductConnectionDiagram product={product} />
    {sectionOrder[product.slug].map((section) => bodySections[section])}
    {product.faqs && <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="grid gap-10 lg:grid-cols-3"><SectionHeading>Before you get started</SectionHeading><Accordion type="single" collapsible className="lg:col-span-2">{product.faqs.map((faq, i) => <AccordionItem key={faq.question} value={`question-${i}`}><AccordionTrigger className="text-base">{faq.question}</AccordionTrigger><AccordionContent className="text-base leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>}
    <ClosingCta heading={product.outcome?.heading ?? `Put ${product.title} to work`} body={product.outcome?.body ?? `Talk to SipLink about ${product.title.toLowerCase()} for your team.`} action="Talk to SipLink" />
  </>;
}
