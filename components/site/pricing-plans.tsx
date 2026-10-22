"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ChevronRight,
  Bot,
  Building2,
  Flame,
  Info,
  Inbox,
  MessageCircle,
  PhoneCall,
  PhoneForwarded,
  Store,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { tiers, type Currency, type Tier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const regions = ["US/CA", "UK", "AUS", "IN", "US/CA/UK", "Global"];
const teamSizes = ["1-4", "5-49", "50+"] as const;
const currencies: Currency[] = ["USD", "INR"];

function formatPrice(value: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

type Product = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children?: { id: string; title: string; description: string; icon: LucideIcon }[];
};

const products: Product[] = [
  {
    id: "phone",
    title: "AI Business Phone System",
    description: "Powerful communication at scale.",
    icon: PhoneCall,
    children: [
      {
        id: "essential",
        title: "Essential",
        description: "Ideal for low call volumes.",
        icon: Store,
      },
      {
        id: "pro-suite",
        title: "Pro Suite",
        description: "Ideal for high call volumes.",
        icon: Building2,
      },
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    description: "Speaks like a human.",
    icon: Bot,
  },
  {
    id: "inbox",
    title: "Omnichannel Inbox",
    description: "Manage chats & calls together.",
    icon: Inbox,
  },
  {
    id: "whatsapp",
    title: "WhatsApp Business API",
    description: "Instant customer connection.",
    icon: MessageCircle,
  },
  {
    id: "dialer",
    title: "Parallel Dialer",
    description: "Engage more leads faster.",
    icon: PhoneForwarded,
  },
];

export function PricingPlans() {
  const [selected, setSelected] = useState("essential");
  const [region, setRegion] = useState(regions[0]);
  const [teamSize, setTeamSize] = useState<string>(teamSizes[0]);
  const [currency, setCurrency] = useState<Currency>("USD");

  const activeTitle =
    products
      .flatMap((p) => [p, ...(p.children ?? [])])
      .find((p) => p.id === selected)?.title ?? "";

  return (
    <div className="grid lg:grid-cols-[18rem_minmax(0,1fr)]">
      {/* Product sidebar */}
      <aside className="border-border lg:border-r">
        <div className="lg:sticky lg:top-24 lg:py-8 lg:pr-6">
          <p className="px-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Products
          </p>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {products.map((product) => {
              const isParent = product.children?.some(
                (c) => c.id === selected
              );
              const active = product.id === selected || isParent;
              return (
                <div key={product.id} className="shrink-0">
                  <SidebarItem
                    {...product}
                    active={Boolean(active)}
                    emphasis={Boolean(isParent)}
                    onClick={() =>
                      setSelected(product.children?.[0].id ?? product.id)
                    }
                  />
                  {product.children && isParent ? (
                    <div className="mt-1 hidden space-y-1 pl-6 lg:block">
                      {product.children.map((child) => (
                        <SidebarItem
                          key={child.id}
                          {...child}
                          active={child.id === selected}
                          onClick={() => setSelected(child.id)}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="min-w-0 py-8 lg:pl-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1">
              Phone number region
              <Info className="size-3.5 text-muted-foreground" aria-hidden />
            </span>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-36" aria-label="Phone number region">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 text-sm">
            Team size
            <ToggleGroup
              type="single"
              variant="outline"
              spacing={2}
              size="sm"
              value={teamSize}
              onValueChange={(v) => v && setTeamSize(v)}
            >
              {teamSizes.map((size) => (
                <ToggleGroupItem
                  key={size}
                  value={size}
                  className="px-3 data-[state=on]:bg-foreground data-[state=on]:text-background"
                >
                  {size}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex items-center gap-2 text-sm">
            Currency
            <Select
              value={currency}
              onValueChange={(v) => setCurrency(v as Currency)}
            >
              <SelectTrigger className="w-24" aria-label="Currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selected === "essential" ? (
          <>
            <h2 className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">
              Plans for every business team
            </h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              Cloud business calling priced per line, per month. Pick the plan
              that fits today and upgrade as your team grows.
            </p>

            {teamSize === "50+" ? (
              <p className="mt-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
                Rolling out to 50+ users?{" "}
                <Link
                  href="/contact"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Talk to sales
                </Link>{" "}
                for a tailored setup.
              </p>
            ) : null}

            {/* Columns share header/body rows (subgrid) so buttons and features line up */}
            <Card className="mt-6 gap-0 overflow-hidden py-0 md:grid md:grid-cols-3 md:grid-rows-[auto_1fr]">
              {tiers.map((tier) => (
                <TierColumn
                  key={tier.name}
                  tier={tier}
                  currency={currency}
                />
              ))}
            </Card>
            <p className="mt-4 text-xs text-pretty text-muted-foreground">
              All prices are exclusive of applicable taxes. GST and other
              applicable charges will be added to the final invoice. Optional
              add-ons, usage-based services, hardware, and specialized
              integrations may be charged separately. Feature availability
              depends on the selected package and service terms.
            </p>
          </>
        ) : (
          <Card className="mt-8 items-center gap-4 px-6 py-16 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {activeTitle}
            </h2>
            <p className="max-w-xl text-pretty text-muted-foreground">
              Pricing for {activeTitle} is tailored to your call volumes and
              team size. Talk to us and we will put together a plan for you.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Contact sales</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

function SidebarItem({
  title,
  description,
  icon: Icon,
  active,
  emphasis,
  onClick,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  active: boolean;
  emphasis?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group/side relative h-auto w-full justify-start gap-3 rounded-lg px-4 py-3 text-left whitespace-normal transition-all duration-300 hover:translate-x-1 hover:bg-primary/5 motion-reduce:transition-none motion-reduce:hover:translate-x-0",
        active && "bg-primary/5 hover:bg-primary/10",
        emphasis && "lg:rounded-l-none lg:border-l-2 lg:border-l-primary"
      )}
    >
      {/* Accent bar that grows in on hover (the emphasised row has one) */}
      {!emphasis ? (
        <span
          aria-hidden
          className="absolute top-1/2 left-0 h-0 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 group-hover/side:h-2/3 motion-reduce:transition-none"
        />
      ) : null}
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background transition-all duration-300 group-hover/side:-rotate-6 group-hover/side:scale-110 group-hover/side:border-primary group-hover/side:bg-primary group-hover/side:text-primary-foreground group-hover/side:shadow-md motion-reduce:transition-none motion-reduce:group-hover/side:rotate-0 motion-reduce:group-hover/side:scale-100",
          active &&
            "border-primary bg-primary text-primary-foreground shadow-sm"
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <span>
        <span className="block text-sm font-medium transition-colors duration-300 group-hover/side:text-primary">
          {title}
        </span>
        <span className="block text-xs font-normal text-muted-foreground">
          {description}
        </span>
      </span>
      <ChevronRight
        aria-hidden
        className="absolute top-1/2 right-2 size-4 -translate-x-2 -translate-y-1/2 text-primary opacity-0 transition-all duration-300 group-hover/side:translate-x-0 group-hover/side:opacity-100 motion-reduce:transition-none"
      />
    </Button>
  );
}

function TierColumn({
  tier,
  currency,
}: {
  tier: Tier;
  currency: Currency;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col border-border not-last:border-b md:row-span-2 md:grid md:grid-rows-subgrid md:not-last:border-r md:not-last:border-b-0",
        tier.popular && "bg-primary/5"
      )}
    >
      {tier.popular ? (
        <Badge className="absolute top-0 right-4 rounded-t-none rounded-b-md">
          <Flame aria-hidden />
          Most popular
        </Badge>
      ) : null}

      <div className="flex flex-col border-b border-border p-5">
        <h3 className="text-lg font-semibold">{tier.name}</h3>
        <p className="text-sm text-muted-foreground">{tier.tagline}</p>
        <p className="mt-5 text-4xl font-semibold tracking-tight">
          {formatPrice(tier.price[currency], currency)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Per line/month</p>
        <p className="mt-4 mb-5 text-sm text-pretty text-muted-foreground">
          {tier.summary}
        </p>
        <Button
          asChild
          size="lg"
          variant={tier.popular ? "default" : "outline"}
          className="mt-auto w-full rounded-full"
        >
          <Link href="/contact">Book a demo</Link>
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        {tier.inherits ? (
          <p className="flex items-center gap-2 rounded-md border border-border bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground italic">
            <ArrowDown className="size-3.5 shrink-0" aria-hidden />
            {tier.inherits}
          </p>
        ) : (
          <p className="py-1.5 text-xs font-semibold tracking-wider uppercase">
            Features included
          </p>
        )}

        <ul className="space-y-4">
          {tier.features.map(({ title, description, icon: Icon }) => (
            <li key={title} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-medium">{title}</span>
                <span className="block text-xs text-pretty text-muted-foreground">
                  {description}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-auto border-t border-border pt-4 text-xs text-muted-foreground">
          {tier.note}
        </p>
      </div>
    </div>
  );
}
