/**
 * Single source of truth for the product catalogue download.
 *
 * ── To move the catalogue off this site ────────────────────────────────
 * Upload Hiranix-Product-Catalogue.pdf to S3 / Cloudflare R2 / Google
 * Drive, then replace CATALOGUE_URL below with the public file URL. That
 * is the only change required: every link on the site reads from here,
 * and `catalogueLinkProps` automatically switches to opening in a new
 * tab, because browsers ignore the `download` attribute on cross-origin
 * URLs (the file would otherwise navigate away from the site instead of
 * downloading).
 *
 * Once it is hosted externally you can also delete
 * public/Hiranix-Product-Catalogue.pdf, which is ~72% of the deploy.
 *
 * If you re-export the PDF, update CATALOGUE_SIZE_LABEL to match — it is
 * shown to users so a 40MB download is never a surprise, especially on
 * mobile data.
 */

export const CATALOGUE_URL = "/Hiranix-Product-Catalogue.pdf";

export const CATALOGUE_FILENAME = "Hiranix-Product-Catalogue.pdf";

/** Shown beside every download link. Keep in step with the actual file. */
export const CATALOGUE_SIZE_LABEL = "40 MB";

const isExternal = /^https?:\/\//i.test(CATALOGUE_URL);

/**
 * Spread onto the anchor for any catalogue link. Same-origin gets a real
 * `download`; cross-origin opens in a new tab, since `download` is
 * ignored across origins.
 */
export const catalogueLinkProps = isExternal
  ? ({
      href: CATALOGUE_URL,
      target: "_blank",
      rel: "noopener noreferrer",
    } as const)
  : ({
      href: CATALOGUE_URL,
      download: CATALOGUE_FILENAME,
    } as const);

/** For `aria-label` / screen readers, so the size is announced too. */
export const CATALOGUE_A11Y_LABEL = `Download the HIRANIX product catalogue PDF, ${CATALOGUE_SIZE_LABEL}`;
