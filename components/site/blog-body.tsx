import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { Quote } from "lucide-react";

import { blogHeadings, type BlogImage } from "@/lib/blog";

/**
 * An article's body. Headings carry the anchors the table of contents links
 * to, and a Quote block in the CMS becomes a highlighted callout.
 */
export function BlogBody({ value }: { value: PortableTextBlock[] }) {
  const anchors = new Map(blogHeadings(value).map(({ key, id }) => [key, id]));

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="mt-5 text-base leading-[1.8] text-pretty text-foreground/75 sm:text-[1.0625rem]">{children}</p>
      ),
      h2: ({ children, value: block }) => (
        <h2
          id={anchors.get(block._key ?? "")}
          className="mt-14 scroll-mt-36 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl"
        >
          {children}
        </h2>
      ),
      h3: ({ children, value: block }) => (
        <h3
          id={anchors.get(block._key ?? "")}
          className="mt-10 scroll-mt-36 text-xl font-semibold tracking-tight text-balance text-foreground"
        >
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="relative mt-8 rounded-2xl border border-primary/15 bg-accent/60 py-5 pr-6 pl-14 text-base leading-relaxed font-medium text-foreground">
          <Quote className="absolute top-5 left-5 size-5 text-primary" aria-hidden />
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mt-5 space-y-2.5 pl-5 text-base leading-relaxed text-foreground/75 marker:text-primary sm:text-[1.0625rem] [&>li]:list-disc">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mt-5 space-y-2.5 pl-5 text-base leading-relaxed text-foreground/75 marker:font-semibold marker:text-primary sm:text-[1.0625rem] [&>li]:list-decimal">
          {children}
        </ol>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
      link: ({ children, value: mark }) => {
        const href: string = mark?.href ?? "#";
        const className = "font-medium text-primary underline underline-offset-4 hover:no-underline";
        return href.startsWith("/") ? (
          <Link href={href} className={className}>
            {children}
          </Link>
        ) : (
          <a href={href} className={className}>
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value: image }: { value: BlogImage }) => (
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="mt-10 h-auto w-full rounded-2xl border border-border"
        />
      ),
    },
  };

  return <PortableText value={value} components={components} />;
}
