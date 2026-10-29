// Read-only HTTP smoke check for a running site (local or live).
//
//   npm run smoke                       (http://localhost:3100)
//   BASE=https://hiranix.in npm run smoke
//
// A 200 status alone does not prove a page works, so each page is also checked
// for real content, its metadata, and that every local script, stylesheet and
// image it points at actually downloads. It also checks the security headers,
// the sitemap, and that obvious attack paths are refused.
const BASE = (process.env.BASE || "http://localhost:3100").replace(/\/$/, "");
const IS_PROD = BASE.startsWith("https://");
const failures = [];
const fail = (message) => failures.push(message);

const get = (path, init = {}) =>
  fetch(new URL(path, BASE), { redirect: "manual", signal: AbortSignal.timeout(30000), ...init });

const sitemapText = await (await get("/sitemap.xml")).text();
const sitemapPaths = [...sitemapText.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)?<\/loc>/g)].map((m) => m[1] || "/");
if (sitemapPaths.length < 15) fail(`sitemap lists only ${sitemapPaths.length} pages`);
const pages = [...new Set(["/", ...sitemapPaths])];

const assets = new Set();
for (const path of pages) {
  const res = await get(path);
  const html = await res.text();
  if (res.status !== 200) { fail(`${path}: HTTP ${res.status}`); continue; }
  if (!/text\/html/.test(res.headers.get("content-type") ?? "")) fail(`${path}: not HTML`);
  if (!/<main[\s>]/.test(html)) fail(`${path}: no <main> content`);
  if (!/<title>[^<]{5,}<\/title>/.test(html)) fail(`${path}: missing or empty <title>`);
  if (!/<meta name="description" content="[^"]{30,}/.test(html)) fail(`${path}: missing meta description`);
  if (!/<link rel="canonical" href="https:\/\/hiranix\.in/.test(html)) fail(`${path}: missing canonical link`);
  if (!/<h1[\s>]/.test(html)) fail(`${path}: no <h1>`);
  if (!/lang="en/.test(html)) fail(`${path}: no lang attribute`);
  for (const [tag] of html.matchAll(/<(?:script|link|img|source)\b[^>]*>/g)) {
    const ref = tag.match(/(?:src|href)="(\/[^"\s]+)"/);
    if (ref && /\.(?:css|js|mjs|woff2|webp|jpg|jpeg|png|svg|avif)(?:\?|$)/.test(ref[1])) assets.add(ref[1]);
  }
}

const queue = [...assets];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const path = queue.shift();
      const res = await get(path);
      const bytes = (await res.arrayBuffer()).byteLength;
      if (res.status !== 200 || bytes === 0) fail(`asset ${path}: HTTP ${res.status}, ${bytes} bytes`);
    }
  }),
);

// Security headers on a page.
const headers = (await get("/")).headers;
const need = {
  "content-security-policy": /default-src 'self'.*frame-ancestors 'none'/,
  "x-content-type-options": /^nosniff$/,
  "x-frame-options": /^DENY$/,
  "referrer-policy": /strict-origin/,
  "permissions-policy": /camera=\(\)/,
};
if (IS_PROD) need["strict-transport-security"] = /max-age=\d{7,}/;
for (const [name, pattern] of Object.entries(need)) {
  const value = headers.get(name);
  if (!value) fail(`header missing: ${name}`);
  else if (!pattern.test(value)) fail(`header ${name} looks wrong: ${value.slice(0, 80)}`);
}
if (headers.get("set-cookie")) fail("the site must not set cookies");
if (headers.get("x-powered-by")) fail("x-powered-by should not be sent");

// Things that must not exist or must be refused.
const refuse = async (path, init, ok, label) => {
  const res = await get(path, init);
  if (!ok.includes(res.status)) fail(`${label}: expected ${ok.join("/")}, got ${res.status}`);
};
await refuse("/this-page-does-not-exist", {}, [404], "unknown page");
for (const path of ["/.env", "/.git/config", "/package.json", "/wrangler.json", "/src/app/layout.tsx"]) {
  const res = await get(path);
  const type = res.headers.get("content-type") ?? "";
  if (res.status === 200 && !/text\/html/.test(type)) fail(`${path} is exposed`);
}
await refuse("/_vinext/image?url=https%3A%2F%2Fexample.com%2Fx.png&w=640&q=75", {}, [400, 403, 404], "image proxy must refuse outside URLs");
await refuse("/_vinext/image?url=%2F..%2F..%2Fetc%2Fpasswd&w=640&q=75", {}, [400, 403, 404], "image proxy must refuse path tricks");
await refuse("/", { method: "DELETE" }, [405, 501], "DELETE");
await refuse("/", { method: "PUT" }, [405, 501], "PUT");
await refuse("/", { method: "POST" }, [405], "POST to a page");

const robots = await (await get("/robots.txt")).text();
if (!/Sitemap:\s*https:\/\/hiranix\.in\/sitemap\.xml/i.test(robots)) fail("robots.txt does not point to the sitemap");

if (IS_PROD) {
  const http = await fetch(BASE.replace("https://", "http://") + "/", { redirect: "manual" });
  if (![301, 302, 307, 308].includes(http.status)) fail(`plain HTTP is not redirected (got ${http.status})`);
}

if (failures.length) {
  console.error(`Smoke check FAILED (${failures.length}):\n - ${failures.join("\n - ")}`);
  process.exit(1);
}
console.log(`Smoke check passed: ${pages.length} pages, ${assets.size} assets, security headers and refusals all as expected (${BASE}).`);
