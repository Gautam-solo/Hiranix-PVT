import type { NextConfig } from "next";

/**
 * What the pages may load. The site is self-contained: its own scripts, fonts
 * and images. The one outside thing it loads is the Google Maps embed on the
 * contact section. Inline scripts and styles stay allowed because the framework
 * and the layout's first-paint script are inline.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.google.com",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // HTTPS only, for a year. Not applied to subdomains: they are not all ours to decide for.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  async headers() {
    // "/" is listed on its own: the catch-all pattern does not match the home page here.
    return [
      { source: "/", headers: securityHeaders },
      { source: "/:path*", headers: securityHeaders },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  poweredByHeader: false,
  compress: true,
  images: {
    /**
     * Every <Image> on this site uses `fill`, and vinext's image shim emits no
     * srcset for a filled image — it serves a single file at deviceSizes[0]
     * (see node_modules/vinext/dist/shims/image.js). With the stock list that
     * first entry is 640px, so a product photo rendering 828px wide on a 2x
     * screen was being upscaled from 640 to 1656: the blurriness.
     *
     * Leading with 1080 lifts every filled image to roughly the full
     * resolution of the source files, which are 1122px wide. Anything larger
     * would only upscale.
     */
    deviceSizes: [1080, 1200, 1920, 2048, 3840],
    /** Next 16 requires qualities to be allow-listed before they can be used. */
    qualities: [75, 90],
  },
};

export default nextConfig;
