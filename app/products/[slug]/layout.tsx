import { PageSchema } from "@/components/site/json-ld";
import { getProductDetail } from "@/lib/products";
import { seo, type SeoPath } from "@/lib/seo";

export default async function ProductLayout({
  children,
  params,
}: LayoutProps<"/products/[slug]">) {
  const { slug } = await params;
  const path = `/products/${slug}`;
  const product = getProductDetail(slug);
  const explainer = product?.explainer;

  return (
    <>
      {path in seo ? (
        <PageSchema
          path={path as SeoPath}
          faqs={[
            ...(explainer
              ? [{ question: explainer.question, answer: explainer.definition }]
              : []),
            ...(product?.faqs ?? []),
          ]}
        />
      ) : null}
      {children}
    </>
  );
}
