import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  navHighlights,
  productCategories,
  productPlatformPillars,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Business voice, phone numbers, contact centre, communication APIs and enterprise features — one platform for every conversation.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <span className="text-sm font-medium tracking-widest text-primary uppercase">
              SipLink platform
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              One platform for every conversation
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              Voice, messaging and APIs on a single network — with the
              reliability and support your business runs on. Build the
              communication environment your teams actually need.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Book a demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>

          <Image
            src="/images/cloud-communications.png"
            alt="Cloud telephony connecting desk phones, mobile apps, messaging and analytics"
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* Category quick-nav */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {productCategories.map(
              ({ slug, eyebrow, icon: Icon, products }) => (
                <a
                  key={slug}
                  href={`#${slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      {eyebrow}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {products.length} products
                    </span>
                  </span>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Product categories */}
      {productCategories.map((category, index) => {
        const { slug, eyebrow, heading, description, icon: Icon } = category;

        return (
          <section
            key={slug}
            id={slug}
            className={
              index % 2 === 1
                ? "border-b border-border bg-muted/30 scroll-mt-24"
                : "border-b border-border scroll-mt-24"
            }
          >
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-sm font-medium tracking-widest text-primary uppercase">
                    {eyebrow}
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
                  {heading}
                </h2>
                <p className="mt-3 text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>

              {/* Four-product categories use two columns so the last card
                  does not sit alone on a row. */}
              <div
                className={
                  category.products.length === 4
                    ? "mt-12 grid gap-6 md:grid-cols-2"
                    : "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                }
              >
                {category.products.map(
                  ({ title, description: copy, href, idealFor }) => (
                    <Card
                      key={title}
                      className="group flex h-full flex-col transition-shadow hover:shadow-md"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{title}</CardTitle>
                        <CardDescription className="mt-2 text-pretty">
                          {copy}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="mt-auto flex flex-col gap-4">
                        {idealFor ? (
                          <>
                            <Separator />
                            <div>
                              <p className="text-xs font-semibold tracking-wide text-foreground uppercase">
                                Ideal for
                              </p>
                              <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                                {idealFor}
                              </p>
                            </div>
                          </>
                        ) : null}

                        <Link
                          href={href}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                          Learn more
                          <ArrowRight
                            className="size-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* Platform pillars */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Across every product
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            The foundation underneath it all
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Every SipLink product runs on the same infrastructure, with the same
            controls and the same support behind it.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productPlatformPillars.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="h-full">
              <CardHeader>
                <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription className="text-pretty">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {navHighlights.map(({ label, description, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-medium">{label}</p>
                <p className="mt-0.5 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Not sure which products you need?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Tell us how your teams communicate today and we will recommend a
            configuration — including porting your existing numbers.
          </p>

          <ul className="mx-auto mt-8 flex max-w-lg flex-col gap-3 text-left sm:flex-row sm:justify-center sm:gap-6">
            {[
              "No obligation",
              "Talk to an engineer",
              "Migration planning included",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
