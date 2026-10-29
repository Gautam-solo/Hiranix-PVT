// Click-through check: opens the site in headless Chrome, follows links between
// every kind of page the way a visitor does (client-side navigation, not fresh
// loads) and fails if any page ends up blank or throws.
//
//   npm run check:nav                       (against http://localhost:3100)
//   BASE=https://hiranix.in npm run check:nav
//   CHROME_BIN=/path/to/chrome npm run check:nav
//
// Why it exists: a script that deleted a React-owned element by hand made the
// first link click blank the whole page. Loading each page fresh never shows
// that; only moving between pages does.
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.env.BASE || "http://localhost:3100").replace(/\/$/, "");
const CHROME =
  process.env.CHROME_BIN ||
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((path) => {
    try {
      return Boolean(path) && spawn(path, ["--version"], { stdio: "ignore" }).pid > 0;
    } catch {
      return false;
    }
  });

const widths = [1440, 390];
const tours = [
  ["/", ["/products", "/about", "/", "/products", "/products/concrete-nail", "/products", "/about", "/"]],
  ["/about", ["/products", "/products/cable-nail-clip", "/about", "/"]],
  ["/products/db-elite", ["/products", "/"]],
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const failures = [];

async function run(width, start, hops) {
  const port = 9600 + Math.floor(Math.random() * 300);
  const chrome = spawn(
    CHROME,
    ["--headless=new", `--remote-debugging-port=${port}`, `--window-size=${width},900`,
      `--user-data-dir=${mkdtempSync(join(tmpdir(), "hxnav-"))}`, "--hide-scrollbars", "about:blank"],
    { stdio: "ignore" },
  );
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    await sleep(200);
    try {
      target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page");
    } catch {}
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener("open", resolve));
  let id = 0;
  const pending = new Map();
  const errors = [];
  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
    if (msg.method === "Runtime.exceptionThrown") errors.push(msg.params.exceptionDetails.exception?.description?.slice(0, 200) ?? "exception");
  });
  const send = (method, params = {}) => new Promise((resolve) => { const i = ++id; pending.set(i, resolve); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result.value;
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 700 });
  await send("Page.enable"); await send("Runtime.enable");

  const health = () => ev(`(() => {
    const bad = document.body.innerText.match(/Failed to execute|Application error|RUNTIME ERROR|removeChild|insertBefore/);
    return JSON.stringify({ path: location.pathname, main: !!document.querySelector('#main-content'),
      heading: !!document.querySelector('h1, h2'), footer: !!document.querySelector('footer'), bad: bad && bad[0] });
  })()`);

  await send("Page.navigate", { url: BASE + start });
  await sleep(4500); // lets the opening screen finish on the home page
  const first = JSON.parse(await health());
  if (!first.main || !first.heading) failures.push(`${width}px fresh load ${start}: page is blank`);

  for (const href of hops) {
    const clicked = await ev(`(() => { const a = [...document.querySelectorAll('a[href="${href}"]')].find((a) => a.getClientRects().length); if (!a) return false; a.click(); return true; })()`);
    if (!clicked) {
      // The mobile menu hides the main links; open it, then follow the link.
      await ev(`document.querySelector('.hx-menu-trigger')?.click()`);
      await sleep(400);
      const again = await ev(`(() => { const a = [...document.querySelectorAll('a[href="${href}"]')].find((a) => a.getClientRects().length); if (!a) return false; a.click(); return true; })()`);
      if (!again) { failures.push(`${width}px ${start}: no visible link to ${href}`); continue; }
    }
    await sleep(2200);
    const h = JSON.parse(await health());
    const label = `${width}px ${start} -> ${href}`;
    if (h.path !== href) failures.push(`${label}: stayed on ${h.path}`);
    if (!h.main || !h.heading || !h.footer) failures.push(`${label}: page is blank or incomplete (${JSON.stringify(h)})`);
    if (h.bad) failures.push(`${label}: error on the page (${h.bad})`);
  }
  const real = errors.filter((e) => !/manifest|favicon|net::ERR/.test(e));
  if (real.length) failures.push(`${width}px ${start}: uncaught errors: ${real.slice(0, 2).join(" | ")}`);
  ws.close();
  chrome.kill();
}

if (!CHROME) {
  console.error("Chrome not found. Set CHROME_BIN to a Chrome or Chromium binary.");
  process.exit(2);
}
for (const width of widths) for (const [start, hops] of tours) await run(width, start, hops);

if (failures.length) {
  console.error(`\nNavigation check FAILED (${failures.length}):\n - ${failures.join("\n - ")}`);
  process.exit(1);
}
console.log(`Navigation check passed: ${widths.length * tours.length} tours, ${widths.length * tours.reduce((n, t) => n + t[1].length, 0)} page changes at ${widths.join(" and ")} px.`);
