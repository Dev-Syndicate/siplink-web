import { PageSchema } from "@/components/site/json-ld";
import { getBusinessSize } from "@/lib/business-size";
import { seo, type SeoPath } from "@/lib/seo";

export default async function SolutionLayout({
  children,
  params,
}: LayoutProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const path = `/solutions/${slug}`;

  return (
    <>
      {path in seo ? (
        <PageSchema path={path as SeoPath} faqs={getBusinessSize(slug)?.faqs} />
      ) : null}
      {children}
    </>
  );
}
