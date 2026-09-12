import type { MetadataRoute } from "next";

import { productDetails } from "@/lib/products";
import { site } from "@/lib/site";
import { solutionDetails } from "@/lib/solutions";

/**
 * Only routes that actually render. Nav entries for pages not built yet are
 * left out on purpose — listing them would hand crawlers a set of 404s.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/products",
    "/solutions",
    "/industries",
    "/pricing",
    "/about",
    "/contact",
  ];

  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...productDetails.map(({ slug }) => ({
      url: `${site.url}/products/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...solutionDetails.map(({ slug }) => ({
      url: `${site.url}/solutions/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
