import vinext from "vinext";
import { defineConfig } from "vite";

// The worker entry (worker/index.ts) serves `/_vinext/image` through these
// bindings. Without them the image optimizer throws on every image.
const bindings = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  assets: { binding: "ASSETS", not_found_handling: "none" as const },
  images: { binding: "IMAGES" },
};

export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    build: {
      // Keep the client bundle parseable on older field devices while the
      // responsive CSS continues to enhance newer viewport APIs.
      target: "safari13",
    },
    plugins: [
      vinext(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: bindings,
      }),
    ],
  };
});
