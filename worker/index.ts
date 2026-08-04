import {
  DEFAULT_DEVICE_SIZES,
  DEFAULT_IMAGE_SIZES,
  handleImageOptimization,
} from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Fetcher {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: Fetcher;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: {
          format: string;
          quality: number;
        }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

/**
 * Round a requested width up to the nearest allowed width.
 *
 * `handleImageOptimization` rejects any `w` that is not exactly on the allowed
 * grid. next/image normally snaps widths for us, but for a fixed-size image
 * narrower than half the smallest device size it falls back to emitting the
 * raw intrinsic width, which is then rejected with a 400 and the image never
 * loads. Snapping up matches Next.js semantics and keeps the set of widths we
 * actually transform bounded.
 */
function snapImageWidth(
  request: Request,
  url: URL,
  allowedWidths: number[],
): Request {
  const requested = Number(url.searchParams.get("w"));
  if (!Number.isInteger(requested) || requested <= 0) return request;
  if (allowedWidths.includes(requested)) return request;

  const snapped = allowedWidths
    .filter((width) => width >= requested)
    .sort((a, b) => a - b)[0];
  if (snapped === undefined) return request;

  const snappedUrl = new URL(url);
  snappedUrl.searchParams.set("w", String(snapped));
  return new Request(snappedUrl, request);
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(
        snapImageWidth(request, url, allowedWidths),
        {
          fetchAsset: (path) =>
            env.ASSETS.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await env.IMAGES.input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format, quality });
            return result.response();
          },
        },
        allowedWidths,
      );
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
