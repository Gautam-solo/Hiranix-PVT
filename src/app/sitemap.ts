import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-29");

  return [
    {
      url: "https://hiranix.in",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://hiranix.in/products",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...products.map((product) => ({
      url: `https://hiranix.in/products/${product.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: "https://hiranix.in/about",
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://hiranix.in/legal/privacy-policy",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://hiranix.in/legal/terms-conditions",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
