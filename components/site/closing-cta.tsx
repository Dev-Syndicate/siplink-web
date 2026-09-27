import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** The inset pink closing panel, with each page's original copy and destinations. */
export function ClosingCta({ heading, body, eyebrow, action = "Book a demo", href = "/contact", secondary, children, id = "closing-cta" }: {
  id?: string;
  heading: string;
  body: string;
  eyebrow?: string;
  action?: string;
  href?: string;
  secondary?: { label: string; href: string };
  children?: ReactNode;
}) {
  return <section id={id} className="mx-auto max-w-7xl scroll-mt-36 px-6 py-12 lg:px-10 lg:py-16">
    <Card data-closing-cta className="gap-0 rounded-2xl bg-gradient-to-br from-brand-to via-brand-to to-brand-from py-12 text-primary-foreground shadow-none ring-0 sm:py-14 lg:py-16">
      <CardHeader className="gap-6 px-7 sm:px-10 lg:px-14">
        {eyebrow && <Badge variant="secondary" className="w-fit rounded-full bg-primary-foreground/15 px-4 py-2 text-primary-foreground">{eyebrow}</Badge>}
        <CardTitle><h2 className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">{heading}</h2></CardTitle>
        <CardDescription className="max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">{body}</CardDescription>
      </CardHeader>
      <CardContent className="mt-9 space-y-7 px-7 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg" className="h-auto min-h-12 whitespace-normal bg-primary-foreground py-3 text-center text-brand-to hover:bg-primary-foreground/90"><Link href={href}>{action}<ArrowRight className="shrink-0" aria-hidden /></Link></Button>
          {secondary && <Button asChild size="lg" variant="outline" className="h-auto min-h-12 whitespace-normal border-primary-foreground/25 bg-primary-foreground/10 py-3 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground dark:border-primary-foreground/25 dark:bg-primary-foreground/10"><Link href={secondary.href}>{secondary.label}</Link></Button>}
        </div>
        {children}
      </CardContent>
    </Card>
  </section>;
}
