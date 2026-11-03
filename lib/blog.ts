import type { PortableTextBlock } from "@portabletext/react";

const API = "https://zguqjm6f.apicdn.sanity.io/v2025-02-19/data/query/production";

/** How long a published change can take to reach the site, in seconds. */
const REFRESH_SECONDS = 600;

export type BlogImage = { url: string; alt: string; width: number; height: number };

export type BlogPostSummary = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  noIndex: boolean | null;
  image: BlogImage | null;
};

export type BlogPost = BlogPostSummary & {
  author: string;
  seoTitle: string | null;
  seoDescription: string | null;
  body: PortableTextBlock[];
};

const IMAGE = `{ alt, "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;

const SUMMARY = `
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "updatedAt": coalesce(updatedAt, publishedAt),
  noIndex,
  "image": select(defined(mainImage.asset) => mainImage${IMAGE})`;

/** Published posts only: the API hides drafts from requests without a token. */
async function query<T>(groq: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(API);
  url.searchParams.set("query", groq);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }
  const response = await fetch(url, { next: { revalidate: REFRESH_SECONDS } });
  // Throwing keeps the last good page live instead of replacing it with an empty one.
  if (!response.ok) throw new Error(`Sanity query failed: ${response.status}`);
  return (await response.json()).result;
}

export function getPosts() {
  return query<BlogPostSummary[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {${SUMMARY}}`,
  );
}

export function getPost(slug: string) {
  return query<BlogPost | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      ${SUMMARY},
      author,
      seoTitle,
      seoDescription,
      body[_type != "image" || defined(asset)] { ..., _type == "image" => ${IMAGE} }
    }`,
    { slug },
  );
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date));
}
