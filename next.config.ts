import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
