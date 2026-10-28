import type { MetadataRoute } from "next";

import { generateStaticParams as industries } from "@/app/industries/[slug]/page";
import { generateStaticParams as internetSections } from "@/app/internet/[slug]/[section]/page";
import { generateStaticParams as internet } from "@/app/internet/[slug]/page";
import { generateStaticParams as networkSolutions } from "@/app/internet/network-solutions/[slug]/page";
import { generateStaticParams as products } from "@/app/products/[slug]/page";
import { generateStaticParams as solutions } from "@/app/solutions/[slug]/page";
import { site } from "@/lib/site";

const staticRoutes = [
  "/",
  "/pricing",
  "/products",
  "/solutions",
  "/industries",
  "/internet",
  "/internet/network-solutions",
  "/why-siplink",
  "/about",
  "/company",
  "/company/10dlc",
  "/company/careers",
  "/company/certifications",
  "/company/news",
  "/company/partners",
  "/contact",
  "/privacy",
];

/** Built from each route's own static params, so it lists exactly the pages that exist. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticRoutes,
    ...products().map(({ slug }) => `/products/${slug}`),
    ...solutions().map(({ slug }) => `/solutions/${slug}`),
    ...industries().map(({ slug }) => `/industries/${slug}`),
    ...internet().map(({ slug }) => `/internet/${slug}`),
    ...internetSections().map(({ slug, section }) => `/internet/${slug}/${section}`),
    ...networkSolutions().map(({ slug }) => `/internet/network-solutions/${slug}`),
  ];

  return paths.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` }));
}
