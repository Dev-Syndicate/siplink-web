import type { PortableTextBlock } from "@portabletext/react";

const API = "https://zguqjm6f.apicdn.sanity.io/v2025-02-19/data/query/production";

/** How long a published change can take to reach the site, in seconds. */
const REFRESH_SECONDS = 600;

export type BlogImage = { url: string; alt: string; width: number; height: number };

/** The categories an editor can pick. Keep in step with studio/schemaTypes/post.ts. */
export const blogCategories = [
  "VoIP",
  "SIP Trunking",
  "Cloud PBX",
  "Business Communication",
  "Call Center Solutions",
  "Cybersecurity",
  "Industry Insights",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogPostSummary = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  noIndex: boolean | null;
  /** The image uploaded in Sanity; share cards and structured data use it. */
  image: BlogImage | null;
  /** The image shown on the site: the uploaded one, or a fallback. */
  cover: BlogImage;
  /** Only what an editor set in Sanity; never guessed. */
  category: BlogCategory | null;
  /** Estimated reading time, from the length of the body. */
  minutes: number;
};

/** A summary as the API returns it, before its cover and time are settled. */
type RawSummary = Omit<BlogPostSummary, "cover" | "minutes"> & {
  characters: number | null;
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
  category,
  "characters": length(pt::text(body)),
  "image": select(defined(mainImage.asset) => mainImage${IMAGE})`;

/** For a post published without an image, so no card is left empty. */
const FALLBACK_COVERS: BlogImage[] = [
  {
    url: "/images/blog/blog_1.jpg",
    alt: "Hands typing on a laptop on a wooden desk, beside glasses and an open notebook",
    width: 910,
    height: 360,
  },
  {
    url: "/images/blog/blog_2.jpg",
    alt: "A laptop showing a blog page on a desk with notebooks, pens and a mug",
    width: 192,
    height: 128,
  },
];

/** Chosen from the slug, so a post has the same cover on every page. */
function fallbackCover(slug: string): BlogImage {
  const sum = [...slug].reduce((total, character) => total + character.charCodeAt(0), 0);
  return FALLBACK_COVERS[sum % FALLBACK_COVERS.length];
}

function settle({ characters, ...post }: RawSummary): BlogPostSummary {
  return {
    ...post,
    cover: post.image ?? fallbackCover(post.slug),
    // About 5 characters a word, 200 words a minute.
    minutes: Math.max(1, Math.round((characters ?? 0) / 1000)),
  };
}

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

export async function getPosts() {
  const posts = await query<RawSummary[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {${SUMMARY}}`,
  );
  return posts.map(settle);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const post = await query<(RawSummary & Omit<BlogPost, keyof BlogPostSummary>) | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      ${SUMMARY},
      author,
      seoTitle,
      seoDescription,
      body[_type != "image" || defined(asset)] { ..., _type == "image" => ${IMAGE} }
    }`,
    { slug },
  );
  if (!post) return null;
  const { author, seoTitle, seoDescription, body } = post;
  return { ...settle(post), author, seoTitle, seoDescription, body };
}

export type BlogHeading = { key: string; id: string; text: string; level: 2 | 3 };

/** The post's h2s and h3s with stable anchors, for the table of contents. */
export function blogHeadings(body: PortableTextBlock[]): BlogHeading[] {
  const used = new Map<string, number>();
  const headings: BlogHeading[] = [];
  for (const block of body) {
    if (block._type !== "block" || (block.style !== "h2" && block.style !== "h3")) continue;
    const text = (block.children as { text?: string }[]).map((child) => child.text ?? "").join("").trim();
    if (!text) continue;
    const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
    const seen = used.get(base) ?? 0;
    used.set(base, seen + 1);
    headings.push({
      key: block._key ?? base,
      id: seen ? `${base}-${seen + 1}` : base,
      text,
      level: block.style === "h2" ? 2 : 3,
    });
  }
  return headings;
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date));
}
