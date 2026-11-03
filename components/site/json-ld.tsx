import type { Faq } from "@/lib/page-faqs";
import { seo, type SeoPath } from "@/lib/seo";
import { site } from "@/lib/site";

/** `<` is escaped so a stray "</script>" in the data cannot end the tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function faqPage(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/** Product pages and the internet services, but not their sub-topic pages. */
const SERVICE_PATH =
  /^\/(products\/[^/]+|internet\/(?!network-solutions$)[^/]+|internet\/network-solutions\/[^/]+)$/;

/**
 * Breadcrumb trail for any page, plus Service data on service pages. Every
 * parent segment of a path is itself a page, so each has a name in `seo`.
 * Pass `faqs` only for questions already visible on the page.
 */
export function PageSchema({ path, faqs }: { path: SeoPath; faqs?: Faq[] }) {
  const segments = path.split("/").slice(1);
  const trail = [
    "/",
    ...segments.map((_, i) => `/${segments.slice(0, i + 1).join("/")}`),
  ] as SeoPath[];
  const url = `${site.url}${path}`;
  const [, description, name] = seo[path];

  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: seo[item][2],
            item: item === "/" ? site.url : `${site.url}${item}`,
          })),
        },
        ...(SERVICE_PATH.test(path)
          ? [
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "@id": `${url}#service`,
                name,
                description,
                url,
                provider: { "@id": `${site.url}/#business` },
                areaServed: "IN",
              },
            ]
          : []),
        ...(faqs?.length ? [faqPage(faqs)] : []),
      ]}
    />
  );
}
