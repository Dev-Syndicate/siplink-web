import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";

import type { BlogImage } from "@/lib/blog";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 leading-relaxed text-muted-foreground">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-primary pl-5 text-foreground italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-muted-foreground">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-muted-foreground">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const className = "text-primary underline underline-offset-4 hover:no-underline";
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
    image: ({ value }: { value: BlogImage }) => (
      <Image
        src={value.url}
        alt={value.alt}
        width={value.width}
        height={value.height}
        sizes="(min-width: 768px) 768px, 100vw"
        className="mt-8 h-auto w-full rounded-xl"
      />
    ),
  },
};

export function BlogBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
