/* eslint-disable @next/next/no-img-element -- this is the site's own responsive image: it builds the srcset the optimizer needs */

import type { CSSProperties, Ref } from "react";

/**
 * Widths the image optimizer accepts in production (vinext's device and image
 * sizes). Anything else is snapped up by the worker, so these are the ones
 * worth asking for.
 */
const WIDTHS = [256, 384, 640, 828, 1080, 1200, 1920] as const;

const optimized = (src: string, width: number) =>
  `/_vinext/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;

type PhotoProps = {
  /** A path under /public, such as /assets/hiranix/products/x-01.jpg. */
  src: string;
  alt: string;
  /** Intrinsic size, so the browser reserves the space before the file arrives. */
  width: number;
  height: number;
  /** How wide the image renders: `(max-width: 900px) 50vw, 25vw`. */
  sizes: string;
  /** The first photo on a page: load now, at high priority. */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLImageElement>;
  "data-current"?: string;
  "aria-hidden"?: boolean;
};

/**
 * One photograph at the size it is shown: a srcset of AVIF/WebP files from the
 * optimizer (about a sixth of the original JPEG at tile size), lazy unless it
 * leads the page.
 */
export function Photo({ src, alt, width, height, sizes, priority = false, ...rest }: PhotoProps) {
  const usable = WIDTHS.filter((w) => w <= width * 1.0 || w === WIDTHS.find((x) => x >= width));
  return (
    <img
      src={optimized(src, usable[Math.min(2, usable.length - 1)])}
      srcSet={usable.map((w) => `${optimized(src, w)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      {...rest}
    />
  );
}
