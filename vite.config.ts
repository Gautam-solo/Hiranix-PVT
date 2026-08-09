import vinext from "vinext";
import { defineConfig } from "vite";
import hostingConfig from "./.openai/hosting.json";
import { sites } from "./build/sites-vite-plugin";

const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  // The worker entry reads env.ASSETS / env.IMAGES to serve `/_vinext/image`.
  // Without these bindings the image optimizer throws on every <Image>.
  assets: { binding: "ASSETS", not_found_handling: "none" as const },
  images: { binding: "IMAGES" },
  d1_databases: hostingConfig.d1 ? [] : [],
  r2_buckets: hostingConfig.r2 ? [] : [],
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
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
