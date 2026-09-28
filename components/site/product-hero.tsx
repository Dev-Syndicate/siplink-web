import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductDetail } from "@/lib/products";

const emphasis: Record<string, string> = {
  "sip-trunking": "Connected to more.",
  "cloud-pbx": "Wherever work happens.",
  "hosted-pbx": "Our platform to look after.",
  "ip-pbx": "inside your network.",
  "did-numbers": "to the right person.",
  "toll-free-numbers": "for customers to call.",
  "virtual-numbers": "Your team has freedom.",
  "number-porting": "Keep your number.",
  "call-center": "and every agent together.",
  "predictive-dialer": "conversation moving.",
  "auto-dialer": "campaign in motion.",
  ivr: "a clear way forward.",
  "call-recording": "Find the detail.",
  "call-analytics": "behind your calls.",
  "call-queue": "A plan for every call.",
  "ai-voice-assistant": "not a menu.",
  "voice-api": "inside your product.",
  "sms-api": "The message follows.",
  "whatsapp-api": "on WhatsApp.",
  "webrtc-sdk": "where your customer already is.",
  "sip-api": "you already run.",
  "teams-calling": "Your calls can be, too.",
  sbc: "a deliberate boundary.",
  "crm-integration": "with the customer record.",
};

/** Shared hero proportions; the product copy, artwork and scenes stay distinct. */
export function ProductHero({ product, headline, action, secondaryLabel, secondaryHref = "#how-it-works", imageAlt, description }: {
  product: ProductDetail;
  headline: string;
  action: string;
  secondaryLabel: string;
  secondaryHref?: string;
  imageAlt: string;
  description?: string;
}) {
  const accent = emphasis[product.slug];
  const hasAccent = !!accent && headline.endsWith(accent);
  const Icon = product.icon;
  // Every product hero uses the same high-resolution 3:2 art direction now.
  // With object-cover, the tall mobile slot can display more image pixels than
  // its width suggests, so include the source aspect ratio in each candidate.
  const aspectRatio = 1.5;
  const artworkSizes = `(min-width: 1024px) max(62vw, ${720 * aspectRatio}px), (min-width: 640px) max(100vw, ${384 * aspectRatio}px), max(100vw, ${320 * aspectRatio}px)`;
  return <section data-product-hero={product.slug} className="relative isolate overflow-hidden border-b border-border bg-background">
    <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 pt-8 pb-10 lg:min-h-180 lg:px-10 lg:pt-6 lg:pb-8 xl:pt-8 xl:pb-10">
      <div><Button asChild size="sm" variant="ghost" className="-ml-3 text-muted-foreground"><Link href="/products#lifecycle"><ArrowLeft aria-hidden />{product.category}</Link></Button></div>
      <div className="mt-6 mb-8 max-w-2xl lg:w-3/5 xl:w-full">
        <Badge variant="secondary" className="gap-2"><Icon aria-hidden className="size-3.5" />{product.title}</Badge>
        <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
          {hasAccent ? <>{headline.slice(0, -accent.length)}<span className="bg-linear-to-r from-brand-from to-brand-to bg-clip-text text-transparent">{accent}</span></> : headline}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground xl:text-xl">{description ?? product.intro}</p>
        <div className="mt-9 flex flex-wrap gap-4"><Button asChild size="lg" className="max-w-full whitespace-normal text-left"><Link href="/contact">{action}<ArrowRight aria-hidden /></Link></Button><Button asChild size="lg" variant="outline"><Link href={secondaryHref}>{secondaryLabel}</Link></Button></div>
      </div>
      <ul aria-label={`${product.title} capabilities`} className="mt-auto flex max-w-3xl flex-wrap gap-2">{product.features.slice(0,3).map(({title}) => <li key={title}><Badge variant="outline" className="h-auto rounded-full bg-background/80 px-3 py-2 text-sm font-normal backdrop-blur-sm">{title}</Badge></li>)}</ul>
    </div>
    <div data-hero-artwork className="relative h-80 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[38%] lg:h-auto">
      <Image src={product.slug === "sip-trunking" ? "/images/sip-trunking-hero-v2.png" : `/images/products/${product.slug}-v2.png`} alt={imageAlt} fill preload quality={95} sizes={artworkSizes} className="object-cover object-right sm:object-contain dark:opacity-45" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background/10 lg:bg-linear-to-r lg:from-background lg:from-15% lg:via-background/65 lg:via-25% lg:to-transparent lg:to-45%" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background/30 to-transparent" />
    </div>
  </section>;
}
