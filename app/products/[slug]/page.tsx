import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { ProductIllustration } from "@/components/site/product-illustration";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductDetail, productDetails } from "@/lib/products";
import { navHighlights } from "@/lib/site";

export function generateStaticParams() {
  return productDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetail(slug);

  if (!product) return {};

  return {
    title: product.title,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductDetail(slug);

  if (!product) notFound();

  const {
    title,
    category,
    categorySlug,
    tagline,
    intro,
    icon: Icon,
    problem,
    approach,
    features,
    idealFor,
    outcome,
  } = product;

  // Sibling products in the same category, for onward navigation.
  const related = productDetails.filter(
    (item) => item.categorySlug === categorySlug && item.slug !== slug,
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 size-[520px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Link
            href="/products#lifecycle"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {category}
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-12">
            <div>
              {/* Icon sits above the title rather than beside it, so the
                  heading, tagline and intro share one left edge. */}
              <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-7" aria-hidden />
              </span>

              <h1 className="font-heading mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-4 text-lg text-primary lg:text-xl">{tagline}</p>

              <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
                {intro}
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

            {/* Schematic of what this category actually does. */}
            <div className="hidden rounded-2xl border border-border bg-muted/30 p-8 lg:block">
              <ProductIllustration category={categorySlug} />
            </div>
          </div>
        </div>
      </section>

      {/* Problem and approach */}
      {problem || approach ? (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">
            {problem ? (
              <div>
                <span className="text-sm font-medium tracking-widest text-primary uppercase">
                  The challenge
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance">
                  {problem.heading}
                </h2>
                <p className="mt-4 text-pretty text-muted-foreground">
                  {problem.body}
                </p>
              </div>
            ) : null}

            {approach ? (
              <div>
                <span className="text-sm font-medium tracking-widest text-primary uppercase">
                  Our approach
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance">
                  {approach.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {approach.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-pretty text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-sm font-medium tracking-widest text-primary uppercase">
            Capabilities
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
            What {title} gives you
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title: name, description, icon: FeatureIcon }) => (
            <div key={name} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FeatureIcon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="font-medium">{name}</h3>
                <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ideal for + outcome */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Ideal for</h2>
            <ul className="mt-6 space-y-3">
              {idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="text-pretty text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {outcome ? (
            <div className="rounded-2xl bg-background p-8 ring-1 ring-border">
              <h2 className="text-2xl font-semibold tracking-tight text-balance">
                {outcome.heading}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                {outcome.body}
              </p>
              <Separator className="my-6" />
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Talk to us about {title}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {/* Related products */}
      {related.length ? (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            More in {category}
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map(
              ({
                slug: relatedSlug,
                title: relatedTitle,
                tagline: relatedTagline,
                icon: RelatedIcon,
              }) => (
                <Link
                  key={relatedSlug}
                  href={`/products/${relatedSlug}`}
                  className="group flex"
                >
                  <Card className="h-full w-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <span className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <RelatedIcon className="size-5" aria-hidden />
                      </span>
                      <CardTitle className="text-base">
                        {relatedTitle}
                      </CardTitle>
                      <CardDescription className="text-pretty">
                        {relatedTagline}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ),
            )}
          </div>
        </section>
      ) : null}

      {/* Trust strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {navHighlights.map(({ label, description, icon: HighlightIcon }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                <HighlightIcon className="size-5" aria-hidden />
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
      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          See {title} working for your business
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Tell us how your teams communicate today and we will recommend a
          configuration — including porting your existing numbers.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Book a demo</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/products">All products</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
