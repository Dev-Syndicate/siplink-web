"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  Check,
  Bot,
  Building2,
  Flame,
  Info,
  Inbox,
  MessageCircle,
  PhoneCall,
  PhoneForwarded,
  Plug,
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
import { tiers, type Tier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/** Approximate rates from USD, for the currency switcher. */
const currencies = {
  USD: 1,
  AUD: 1.52,
  CAD: 1.37,
  EUR: 0.92,
  GBP: 0.79,
  INR: 84,
} as const;
type Currency = keyof typeof currencies;

const regions = ["US/CA", "UK", "AUS", "IN", "US/CA/UK", "Global"];
const teamSizes = ["1-4", "5-49", "50+"] as const;

export function formatPrice(usd: number, currency: Currency) {
  const value = usd * currencies[currency];
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: value >= 100 || Number.isInteger(value) ? 0 : 2,
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
  const [billing, setBilling] = useState("monthly");
  const [region, setRegion] = useState(regions[0]);
  const [teamSize, setTeamSize] = useState<string>(teamSizes[0]);
  const [currency, setCurrency] = useState<Currency>("USD");

  const yearly = billing === "yearly";
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
          <div className="flex items-center gap-2">
            <ToggleGroup
              type="single"
              variant="outline"
              value={billing}
              onValueChange={(v) => v && setBilling(v)}
              className="bg-muted p-1"
            >
              <ToggleGroupItem
                value="monthly"
                className="border-0 data-[state=on]:bg-background data-[state=on]:shadow-sm"
              >
                Monthly
              </ToggleGroupItem>
              <ToggleGroupItem
                value="yearly"
                className="border-0 data-[state=on]:bg-background data-[state=on]:shadow-sm"
              >
                Yearly
              </ToggleGroupItem>
            </ToggleGroup>
            <Badge variant="secondary" className="text-primary">
              Save 3 months&rsquo; cost
            </Badge>
          </div>

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
                {Object.keys(currencies).map((c) => (
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
              Core Calling for Business Teams
            </h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              Ideal for small teams managing low to moderate call volumes and
              seeking reliable, day-to-day business calling.
            </p>

            {teamSize === "50+" ? (
              <p className="mt-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
                Teams of 50+ get Enterprise pricing.{" "}
                <Link
                  href="#enterprise"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  See the Enterprise plan
                </Link>
              </p>
            ) : null}

            <Card className="mt-6 gap-0 overflow-hidden py-0 md:grid md:grid-cols-3">
              {tiers.map((tier) => (
                <TierColumn
                  key={tier.name}
                  tier={tier}
                  yearly={yearly}
                  currency={currency}
                />
              ))}
            </Card>
            <p className="mt-4 text-sm text-muted-foreground">
              Local taxes will be applicable in addition to the listed prices.
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
        "h-auto w-full justify-start gap-3 rounded-lg px-4 py-3 text-left whitespace-normal",
        active && "bg-primary/5 hover:bg-primary/10",
        emphasis && "lg:rounded-l-none lg:border-l-2 lg:border-l-primary"
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background",
          active && "border-primary/40 text-primary"
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs font-normal text-muted-foreground">
          {description}
        </span>
      </span>
    </Button>
  );
}

function TierColumn({
  tier,
  yearly,
  currency,
}: {
  tier: Tier;
  yearly: boolean;
  currency: Currency;
}) {
  const price = formatPrice(
    yearly ? (tier.price * 9) / 12 : tier.price,
    currency
  );

  return (
    <div
      className={cn(
        "relative flex flex-col border-border not-last:border-b md:not-last:border-r md:not-last:border-b-0",
        tier.popular && "bg-primary/5"
      )}
    >
      {tier.popular ? (
        <Badge className="absolute top-0 right-4 rounded-t-none rounded-b-md">
          <Flame aria-hidden />
          Popular
        </Badge>
      ) : null}

      <div className="border-b border-border p-5">
        <h3 className="text-lg font-semibold">{tier.name}</h3>
        <p className="text-sm text-muted-foreground">{tier.tagline}</p>
        <p className="mt-5 text-4xl font-semibold tracking-tight">{price}</p>
        <p className="mt-1 h-4 text-xs text-muted-foreground">
          {yearly ? "Per user/month, billed yearly" : "Per user/month"}
        </p>
        <Button
          asChild
          size="lg"
          className={cn(
            "mt-6 w-full rounded-full",
            tier.name === "Starter" && "bg-background text-foreground ring-1 ring-border hover:bg-muted"
          )}
        >
          <Link href="/contact">{tier.cta}</Link>
        </Button>
      </div>

      <div className="flex-1 space-y-5 p-5">
        {tier.inherits ? (
          <p className="flex items-center gap-2 rounded-md border border-border bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground italic">
            <ArrowDown className="size-3.5 shrink-0" aria-hidden />
            {tier.inherits}
          </p>
        ) : (
          <div className="h-[30px]" aria-hidden />
        )}

        {tier.groups.map(({ heading, icon: Icon, items }) => (
          <div key={heading}>
            <p className="flex items-center gap-2 border-b border-border pb-2 text-xs font-semibold tracking-wider uppercase">
              <Icon className="size-4" aria-hidden />
              {heading}
            </p>
            <ul className="mt-3 space-y-2.5">
              {items.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-2.5" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {tier.integrations ? (
          <div>
            <p className="flex items-center gap-2 border-b border-border pb-2 text-xs font-semibold tracking-wider uppercase">
              <Plug className="size-4" aria-hidden />
              Integrations
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tier.integrations.map((name) => (
                <Badge key={name} variant="outline" className="rounded-md">
                  <span className="flex size-3.5 items-center justify-center rounded-sm bg-primary text-[0.6rem] text-primary-foreground">
                    {name[0]}
                  </span>
                  {name}
                </Badge>
              ))}
              <Badge variant="secondary" className="rounded-md">
                50+
              </Badge>
            </div>
            <Link
              href="#compare"
              className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              View all features
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
