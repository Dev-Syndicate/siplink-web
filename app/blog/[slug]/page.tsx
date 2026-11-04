import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import { BlogReadingProgress, BlogShare, BlogToc } from "@/components/site/blog-article-tools";
import { BlogBody } from "@/components/site/blog-body";
import { BlogCard, CategoryBadge } from "@/components/site/blog-card";
import { ClosingCta } from "@/components/site/closing-cta";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { blogHeadings, formatPostDate, getPost, getPosts, type BlogPostSummary } from "@/lib/blog";
import { openGraphDefaults } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/site/json-ld";

export const revalidate = 600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.seoTitle || `${post.title} | ${site.name}`;
  const description = post.seoDescription || post.excerpt;
  const path = `/blog/${post.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: post.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      ...openGraphDefaults,
      type: "article",
      url: path,
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.image
        ? [{ url: post.image.url, width: post.image.width, height: post.image.height, alt: post.image.alt }]
        : openGraphDefaults.images,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();

  // Posts are newest first, so "newer" sits before this one in the list.
  const position = posts.findIndex(({ slug: other }) => other === post.slug);
  const newer = position > 0 ? posts[position - 1] : null;
  const older = position >= 0 ? (posts[position + 1] ?? null) : null;

  // Related: the same category first, then the newest of the rest. Whatever
  // that leaves over fills the sidebar, so no post is offered twice.
  const others = posts.filter(({ slug: other }) => other !== post.slug);
  const related = [
    ...others.filter(({ category }) => category === post.category),
    ...others.filter(({ category }) => category !== post.category),
  ].slice(0, 3);
  const latest = others.filter((other) => !related.includes(other)).slice(0, 3);

  const headings = blogHeadings(post.body);
  const initials = post.author
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const url = `${site.url}/blog/${post.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      headline: post.title,
      description: post.seoDescription || post.excerpt,
      image: post.image?.url,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: { "@type": "Person", name: post.author },
      publisher: { "@id": `${site.url}/#business` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <BlogReadingProgress />
      <div className="relative isolate">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-accent/70 to-transparent" />

        <article className="mx-auto max-w-7xl px-5 pt-8 pb-12 sm:px-8 lg:px-10 lg:pt-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* The cover, with the title over it. On a phone the image is too
              short to carry a long title, so the title drops below it. */}
          <header className="relative mt-6 overflow-hidden rounded-3xl shadow-2xl shadow-primary/20 md:flex md:min-h-[28rem] md:flex-col md:justify-end lg:min-h-[32rem]">
            <div className="relative aspect-video overflow-hidden rounded-3xl md:absolute md:inset-0 md:aspect-auto md:rounded-none">
              <Image
                src={post.cover.url}
                alt={post.cover.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="pricing-kenburns object-cover"
              />
            </div>
            <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-foreground/90 via-foreground/35 to-transparent md:block" />
            <div className="relative pt-5 md:p-10 md:text-background lg:p-12">
              <CategoryBadge category={post.category} className="md:bg-primary md:text-primary-foreground" />
              <h1 className="mt-4 max-w-4xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
            </div>
          </header>

          {/* Who wrote it, when, how long, and where to share it. */}
          <div className="mt-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-to to-brand-from text-sm font-semibold text-primary-foreground"
              >
                {initials}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{post.author}</p>
                <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                  {post.updatedAt !== post.publishedAt ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>
                        Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
                      </span>
                    </>
                  ) : null}
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" aria-hidden />
                    {post.minutes} min read
                  </span>
                </p>
              </div>
            </div>
            <BlogShare url={url} title={post.title} />
          </div>

          <div className="mt-4 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <div className="min-w-0">
              <div className="max-w-3xl">
                <BlogBody value={post.body} />
              </div>

              {newer || older ? (
                <nav aria-label="More articles" className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
                  {older ? <Neighbour post={older} direction="previous" /> : <span className="hidden sm:block" />}
                  {newer ? <Neighbour post={newer} direction="next" /> : null}
                </nav>
              ) : null}
            </div>

            {/* The sidebar: below the article on a phone, and on a desktop it
                stays in view as the article scrolls. */}
            <aside className="min-w-0 lg:pt-10">
              <div className="space-y-6 lg:sticky lg:top-32">
                {headings.length >= 2 ? (
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <BlogToc headings={headings} />
                  </div>
                ) : null}

                {latest.length > 0 ? (
                  <div>
                    <p className="text-sm font-semibold">Latest articles</p>
                    <ul className="mt-3 space-y-3">
                      {latest.map((other) => (
                        <li key={other.slug}>
                          <BlogCard post={other} compact />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </article>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
            <h2 id="related-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Related insights
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <BlogCard post={other} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ClosingCta
        heading="Talk to SipLink about your business communication"
        body="Tell us what you need, and our team will recommend the right setup."
        secondary={{ label: "Explore products", href: "/products" }}
      />
    </>
  );
}

/** A link to the article before or after this one. */
function Neighbour({ post, direction }: { post: BlogPostSummary; direction: "previous" | "next" }) {
  const next = direction === "next";
  const Arrow = next ? ArrowRight : ArrowLeft;

  return (
    <Link
      href={`/blog/${post.slug}`}
      rel={direction === "next" ? "next" : "prev"}
      className={`group/near flex items-center gap-3 rounded-2xl border border-border p-4 transition-all duration-300 outline-none hover:border-primary/30 hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring ${next ? "flex-row-reverse text-right" : ""}`}
    >
      <Arrow className="size-4 shrink-0 text-primary transition-transform duration-300 group-hover/near:scale-125" aria-hidden />
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{next ? "Next article" : "Previous article"}</span>
        <span className="mt-0.5 line-clamp-2 block text-sm font-semibold transition-colors group-hover/near:text-primary">
          {post.title}
        </span>
      </span>
    </Link>
  );
}
