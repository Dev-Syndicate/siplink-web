import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SipTrunkingPage } from "@/components/site/sip-trunking-page";
import { VoiceProductPage, VOICE_PRODUCT_SLUGS } from "@/components/site/products-voice-pages";
import { CallingProductPage, CALLING_PRODUCT_SLUGS } from "@/components/site/products-calling-pages";
import { PlatformProductPage, PLATFORM_PRODUCT_SLUGS } from "@/components/site/products-platform-pages";
import { getProductDetail, productDetails } from "@/lib/products";

export function generateStaticParams() {
  return productDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product) return {};
  return { title: product.title, description: product.tagline };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product) notFound();

  if (slug === "sip-trunking") return <SipTrunkingPage product={product} />;
  if (VOICE_PRODUCT_SLUGS.includes(slug)) return <VoiceProductPage product={product} />;
  if (CALLING_PRODUCT_SLUGS.includes(slug)) return <CallingProductPage product={product} />;
  if (PLATFORM_PRODUCT_SLUGS.includes(slug)) return <PlatformProductPage product={product} />;

  notFound();
}
