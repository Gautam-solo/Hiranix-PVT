import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://hiranix.in/sitemap.xml",
    host: "https://hiranix.in",
  };
}
