import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogBody } from "@/components/site/blog-body";
import { ClosingCta } from "@/components/site/closing-cta";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatPostDate, getPost, getPosts } from "@/lib/blog";
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
  const post = await getPost(slug);
  if (!post) notFound();

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
      <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
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

        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {post.author} · <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          {post.updatedAt !== post.publishedAt && (
            <>
              {" "}· Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
            </>
          )}
        </p>
        {post.image && (
          <Image
            src={post.image.url}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            className="mt-8 h-auto w-full rounded-xl"
          />
        )}
        <BlogBody value={post.body} />
      </article>
      <ClosingCta
        heading="Talk to SipLink about your business communication"
        body="Tell us what you need, and our team will recommend the right setup."
        secondary={{ label: "Explore products", href: "/products" }}
      />
    </>
  );
}
