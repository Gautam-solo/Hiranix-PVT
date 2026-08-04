# HIRANIX responsive QA

Evidence reviewed:

- `/Users/gautampatel/Desktop/Screenshot 2026-07-28 at 02.15.21.png`
- `/Users/gautampatel/Desktop/Screenshot 2026-07-28 at 02.15.29.png`
- `/Users/gautampatel/Desktop/Screenshot 2026-07-28 at 02.15.35.png`
- `/Users/gautampatel/Desktop/Screenshot 2026-07-28 at 02.15.41.png`

## Issues corrected

- [P1] Mobile hero motion could remain paused because its start waited on a removed
  external transition. The intro now starts after local assets decode, with a bounded
  fallback and mobile scroll motion.
- [P1] Alternate product images were available only through hover/focus. Every product
  now has an explicit, accessible touch control with a 44px mobile target.
- [P1] The mobile story gallery inherited desktop scroll-driven colors, producing pale
  copy on a pale background. Mobile now uses fixed high-contrast text and background
  colors.
- [P1] Landscape factory images were forced into tall portrait cards and heavily
  cropped. Touch devices now use a native horizontal, scroll-snapped carousel with
  landscape cards and uncropped imagery.
- [P1] Obsolete motorsport routes, components, transitions, scripts, metadata, social
  artwork and the old 404 were still part of the project. They were removed or replaced
  with HIRANIX content.
- [P2] Search metadata used the wrong primary domain and had no sitemap, robots route,
  manifest or organization data. These are now included for `https://hiranix.in`.

## Verification

- Safari opened the production-mode local site at `http://127.0.0.1:3017`.
- Home, both legal pages, sitemap, robots, manifest and the catalogue return HTTP 200.
- ESLint, TypeScript, the native Next build and the deployment build pass.
- The production dependency audit reports zero vulnerabilities.
- A source and public-asset search returns no inherited motorsport brand references.

Automated Safari screenshot capture is restricted by macOS on this machine, so the
post-fix page is left open in Safari for final visual inspection.

final result: pass with known limitation
