import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPostDate, getPosts } from "@/lib/blog";
import { seoFor } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = seoFor("/blog");

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          SipLink Blog
        </h1>
        <p className="mt-4 text-lg text-pretty text-muted-foreground">
          Practical guides to business calling, internet and cloud communication.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">New articles are on the way. Please check back soon.</p>
      ) : (
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block h-full rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
                <Card className="h-full">
                  {post.image && (
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      width={post.image.width}
                      height={post.image.height}
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                      priority={index === 0}
                      className="aspect-video w-full object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary">
                      <h2>{post.title}</h2>
                    </CardTitle>
                    <CardDescription>
                      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">{post.excerpt}</CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
