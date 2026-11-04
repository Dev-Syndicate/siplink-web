import type { Metadata } from "next";
import { Radio } from "lucide-react";

import { BlogExplorer } from "@/components/site/blog-explorer";
import { BlogHero } from "@/components/site/blog-hero";
import { CtaPanel } from "@/components/site/cta-panel";
import { PageSchema } from "@/components/site/json-ld";
import { RevealGroup } from "@/components/site/reveal-group";
import { Marquee } from "@/components/ui/marquee";
import { blogCategories, getPosts } from "@/lib/blog";
import { seoFor } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = seoFor("/blog");

/**
 * The blog: the hero with its deck of articles, a band of topics, then the
 * articles (see BlogExplorer), and the site's closing ask. Everything
 * comes from Sanity through lib/blog.ts.
 */
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="relative isolate overflow-clip">
      <PageSchema path="/blog" />

      <BlogHero posts={posts} />

      {/* A band of what the blog covers, running under the hero. */}
      <div aria-hidden className="relative overflow-hidden bg-gradient-to-r from-brand-to via-primary to-brand-from py-1 text-primary-foreground">
        <span className="pricing-dots pointer-events-none absolute inset-0 text-primary-foreground/20" />
        <Marquee pauseOnHover repeat={6} className="[--duration:45s] [--gap:2.5rem]">
          {blogCategories.map((name) => (
            <span key={name} className="inline-flex items-center gap-2.5 text-sm font-medium whitespace-nowrap">
              <Radio className="size-4 text-primary-foreground/80" />
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-20 sm:px-8 lg:px-10 lg:pt-24">
        {/* Soft lights drifting down the page behind the articles. */}
        <span aria-hidden className="pricing-drift pointer-events-none absolute top-20 -left-32 -z-10 size-[30rem] rounded-full bg-brand-from/15 blur-3xl" />
        <span aria-hidden className="pricing-drift pointer-events-none absolute top-[40%] -right-40 -z-10 size-[34rem] rounded-full bg-primary/10 blur-3xl [--drift-delay:-8s]" />

        {posts.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-primary/25 bg-card/70 px-6 py-16 text-center text-muted-foreground">
            New articles are on the way. Please check back soon.
          </p>
        ) : (
          <BlogExplorer posts={posts} />
        )}

        <RevealGroup className="mt-20 lg:mt-28">
          <div className="reveal-item">
            <CtaPanel
              heading="Ready to Upgrade Your Business Communications?"
              body="Replace outdated PBX systems, improve call handling and give your team one reliable communications platform."
              action={{ label: "Book a Free Consultation", href: "/contact" }}
              note="No obligation · Free consultation · Migration guidance included"
            />
          </div>
        </RevealGroup>
      </div>
    </div>
  );
}
