# HIRANIX website

The company and product site for Hiranix India Private Limited, live at
[hiranix.in](https://hiranix.in). Next.js 16 (App Router), React 19 and
TypeScript, built with [vinext](https://github.com/cloudflare/vinext) and served
from Cloudflare Workers. Styling is plain CSS (CSS Modules plus one shared
`system.css`); motion is GSAP with Lenis smooth scrolling. There is no database,
no accounts and no cookies.

## Run it

Node 24 (see `.nvmrc`).

```bash
npm install
npm run dev            # http://localhost:3100 is typical; pass --port to change
```

## Check it

```bash
npm run check          # lint + type-check + content tests
npm run build          # production build
npx vinext start --port 3100 &
npm run smoke          # every page, asset, header and refusal
npm run check:nav      # clicks through the site like a visitor (needs Chrome)
```

`BASE=https://hiranix.in npm run smoke` runs the same checks against the live site.
CI (`.github/workflows/ci.yml`) runs all of this on every push and pull request.

## Deploy

Pushing to `main` deploys automatically through Cloudflare Workers Builds
(`npm run build`, then the worker in `dist/`). To go back, revert the commit on
`main`.

## Layout

| Path | What is there |
| --- | --- |
| `src/app` | Pages, layout, error pages, `system.css` (design tokens), `hiranix-hero.css` (the hero) |
| `src/components` | `home`, `about`, `products`, `enquiry`, `system` (shared motion and type helpers) |
| `src/data` | `products.ts` (all 16 products and size tables), `company.ts`, `systems.ts`, `catalogue.ts` |
| `worker/index.ts` | The Cloudflare worker: HTTPS redirect and the image optimizer |
| `next.config.ts` | Security headers and the content security policy |
| `tests`, `scripts` | Content tests, the smoke check and the click-through check |

## How the site is built

- **Colour.** Three colours only: ink (`#050605`), signal green (`#23c862`, the hero's
  green) and bone (`#eceee9`). A section picks its ground with `data-chapter="ink | bone | green"`
  and its text and accent colours follow from that (`--c-*` tokens in `system.css`).
- **Type.** Mona Sans with variable width and weight; headlines are wide capitals, labels
  are small monospace.
- **Motion.** One engine, `components/system/ChapterMotion.tsx`. Sections describe what they
  want with attributes: `data-reveal`, `data-split`, `data-words`, `data-parallax`,
  `data-count`, `data-drift`. Anything on the first screen adds `data-atf` so it animates by CSS
  alone, without waiting for scripts. Everything honours `prefers-reduced-motion`.
- **Pinned and scripted DOM.** Never remove or move a React-rendered element by hand, and
  clean up GSAP in a layout effect so pins are undone before React removes the section. This
  is what `npm run check:nav` exists to catch.
- **Product photos.** Cut-outs on the site's off-white with a soft shadow, in
  `public/assets/hiranix/products/studio` (green variants for the home rail in `studio/green`).
- **Privacy.** The only stored data is the visitor's enquiry list, in their own browser. The
  Google map is the only third-party content loaded. Keep `LegalPage.tsx` in step with any change.

## Updating content

- Products and size tables: `src/data/products.ts`; add the photo to
  `public/assets/hiranix/products/studio` and run `npm test`.
- Catalogue PDF: replace `public/Hiranix-Product-Catalogue.pdf` and update the size in
  `src/data/catalogue.ts`.
- Contact details: `src/data/company.ts`.
