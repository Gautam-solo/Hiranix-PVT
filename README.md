# HIRANIX responsive brand website

A responsive, motion-rich HIRANIX brand and product experience. It uses Next.js 16,
React 19, TypeScript, CSS Modules, Lenis and GSAP, with imagery and fonts served
locally. The deployment build targets Cloudflare Workers through Vinext.

## Run locally

```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npx tsc --noEmit
npm run lint
npm run build
```

The responsive header keeps the full navigation visible above 900px. At 900px and
below, it uses a left-side drawer with Home, Products, Brand and About. The top-right
catalogue control downloads `public/Hiranix-Product-Catalogue.pdf`. Product alternate
views use explicit touch controls, and factory imagery becomes a swipeable carousel on
mobile.
