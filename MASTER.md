# HIRANIX design system

Single source of truth for everything below the hero. The hero (`src/app/hiranix-hero.css`,
`HiranixHero.tsx`) keeps its own styles and is not governed by this file.

Tokens live in `src/app/system.css`. Components read the chapter role tokens (`--c-*`), never the
raw palette, so a section works on whichever chapter it sits in.

## Theses (validated, amended 2026-10-26 from client feedback)

**Visual.** The logo's own two colours carry the site: black and the signal green of the X,
stretched into a family of dark greens (forest for proof, a grey sage for the brands), so the
ground shifts tone between chapters without ever jumping from black to white, set in Mona Sans, already the hero's face, with its widest cut in capitals for section
titles like a stamped nameplate, on a structured 12-column grid with generous air on an 8px base.
Content sits directly on the ground, never in a box inside a box; every section opens with a plain
title (Our products, Our brands, Contact) and a line of facts. Photographs are shown whole, in
clean rectangular frames with a 4px radius and one crop per role: 4:5 for products, 4:3 for the
factory, 16:10 for brand logos.

**Interaction.** Less motion, each move felt once: the ground changes colour between chapters
(720ms); a section's title and text rise together on entry (480ms); photographs unveil upward
from their frame on entry (720ms); figures count up once; hovers zoom a photo 3% and draw a green
underline (240ms); filtering products fades the new set in (480ms); all on one ease-out curve.
Removed at the client's request: line-by-line headline masks, list rows that dim and focus, a
photo that follows the pointer or the row, faded photo edges, photo swaps on hover. Still
forbidden: bounce, glass panels, glows, endless loops, numbered labels, cursor followers,
scroll-jacking.

**Allowed patterns:** hairline rules; colour-chapter background changes; wide uppercase section
titles; three equal brand tiles (there are exactly three brands of equal weight); one horizontal
factory strip; photo unveil on entry.

## Colour

| Token | Hex | Role |
|---|---|---|
| `--hx-ink` | `#070A08` | Ground of the hero and of ink chapters |
| `--hx-signal` | `#00F868` | The X of the logo. Accent and primary button on dark grounds only |
| `--hx-forest` | `#0A2E1C` | Ground of the proof chapter |
| `--hx-graphite` | `#121815` | Ground of the products pages: the product photos' studio backdrop (median edge `#222020`) with the logo's green hue, so photo and page read as one surface |
| `--hx-sage` | `#26372E` | Ground of the brand chapter: a grey-green one step lighter than forest |
| `--hx-white` | `#F4F6F3` | Text on dark grounds |
| `--hx-mist` | `#A7B2AB` | Secondary text on dark grounds |

Lines: `rgba(244,246,243,.14)`. Every ground is dark, so there is one line colour.

### 60-30-10

The site follows the web design 60-30-10 rule, with all three colours taken from the logo:

- **60% dominant: ink.** The hero, the products chapter, contact and the footer.
- **30% secondary: the dark greens.** Forest for the proof chapter, sage for the brand chapter.
  Two tones of one green family, so the page moves between chapters without changing colour.
- **10% accent: signal.** Primary buttons, the accent words in titles, active filters and the
  focus ring. Never a ground, never body text.

No fourth colour is added. The brand logos keep their own colours; they are artwork, not palette.

Chapter role tokens, set by `[data-chapter]` on the chapter wrapper:

| Chapter | `--c-bg` | `--c-fg` | `--c-sub` | `--c-acc` |
|---|---|---|---|---|
| `ink` | ink | white | mist | signal |
| `forest` | forest | white | mist | signal |
| `sage` | sage | white | mist | signal |

Computed contrast (WCAG): white on ink 18.3:1; mist on ink 9.1:1; signal on ink 13.9:1; white on
forest 13.6:1; mist on forest 6.8:1; signal on forest 10.3:1; white on sage 11.6:1; mist on sage
5.8:1; signal on sage 8.8:1; ink on signal 13.9:1.

**Rule:** no light grounds below the hero. A white chapter between black ones was too sharp a
jump (client feedback, 2026-10-26); the chapters step through dark greens instead.

## Type

One family, Mona Sans (`--font-mona-sans`, loaded locally by `next/font`), two widths.
Why this face: the hero already speaks in it, and its widest cut in capitals reads like the
stamped marking on a part.

| Token | Size | Settings |
|---|---|---|
| `--type-display-xl` | `clamp(2.75rem, 8.6vw, 8.25rem)` | wdth 125, 800, uppercase, line-height .9 |
| `--type-display-l` | `clamp(2.1rem, 6vw, 5.5rem)` | wdth 125, 800, uppercase, line-height .92 |
| `--type-display-m` | `clamp(1.55rem, 3.6vw, 3.1rem)` | wdth 125, 800, uppercase, line-height .95 |
| `--type-heading` | `clamp(1.4rem, 2.2vw, 2rem)` | wdth 100, 700, tracking -.025em |
| `--type-body` | `1.0625rem` | 400, line-height 1.55, measure 60ch |
| `--type-small` | `.875rem` | 400, line-height 1.5 |
| `--type-label` | `.75rem` | wdth 112, 600, tracking .14em, uppercase |

Fallback stack: `"Helvetica Neue", Arial, sans-serif`.

## Spacing

8px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160 (`--s-1` to `--s-11`).
Section rhythm `--section: clamp(72px, 8vw, 128px)`. Page gutter: the existing `--page-pad`.

## Shape

No cards, panels or shadows: content sits on the ground, separated by hairlines. Photos sit in
rectangular frames, `--radius: 4px`, over `--hx-frame` (`#121513`) while they load. Buttons are
pills (`999px`).

## Motion

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | every movement |
| `--ease-io` | `cubic-bezier(0.65, 0, 0.35, 1)` | chapter colour changes |
| `--t-fast` | `240ms` | hover underline, photo zoom, button states |
| `--t-base` | `480ms` | title and text rise, filtered products fade in |
| `--t-slow` | `720ms` | photo unveil, chapter colour |
| `--stagger` | `90ms` | between tiles in a row |

Reduced motion: every reveal shows at rest, chapter colours switch without a fade.

## Components

- **Primary button:** signal ground, ink text. Hover white ground. Focus 2px `--c-acc` outline, 3px
  offset. Active scale .98. Disabled opacity .4.
- **Secondary button:** 1px `--c-line` border, `--c-fg` text. Hover border `--c-acc`.
- **Text link:** `--c-fg`, a 1px `--c-acc` underline draws from the left on hover and focus.
- **Label:** `--type-label` in `--c-sub`. Used for product categories and small field names.

One action name for enquiries everywhere: **Enquire on WhatsApp**.
