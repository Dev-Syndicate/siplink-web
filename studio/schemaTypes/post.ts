import { defineArrayMember, defineField, defineType } from "sanity";

import { checkImage, IMAGE_ACCEPT } from "./image-limits";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "The heading shown on the post.",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      description: "The end of the post's address. Avoid changing it once published.",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      description: "Shown on the blog page, and used as the meta description if that is left empty.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      description: "JPG, PNG or WebP, under 2 MB and at least 1200 px wide.",
      group: "content",
      options: { hotspot: true, accept: IMAGE_ACCEPT },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          description: "Describe the image for search engines and screen readers.",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      // Alt text alone counts as a value, so require the file itself too.
      validation: (rule) => rule.required().assetRequired().custom(checkImage),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "content",
      initialValue: "SipLink Team",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "date",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated date",
      description: "Set this only after a real content update.",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          // The post title is the page's only h1.
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "Address",
                    description: "Use /products/sip-trunking for pages on this site.",
                    type: "url",
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true, accept: IMAGE_ACCEPT },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.custom(checkImage),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      description: "Shown in search results. Leave empty to use the post title. Aim for 60 characters or fewer.",
      type: "string",
      group: "seo",
      validation: (rule) => rule.max(60).warning("Search results may cut this off after about 60 characters."),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta description",
      description: "Shown under the title in search results. Leave empty to use the summary. Aim for 160 characters or fewer.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.max(160).warning("Search results may cut this off after about 160 characters."),
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      description: "Leave this off unless the post should stay out of Google.",
      type: "boolean",
      group: "seo",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "mainImage" },
  },
});
