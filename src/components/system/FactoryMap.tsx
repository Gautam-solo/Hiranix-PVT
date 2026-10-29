import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { contact } from "@/data/company";
import styles from "./FactoryMap.module.css";

/**
 * The factory on a live map. The map itself only shows the place; one click
 * anywhere on it opens the location in Google Maps for directions.
 */
export function FactoryMap() {
  return (
    <div className={styles.map}>
      <iframe
        className={styles.frame}
        src={contact.mapEmbed}
        title="Map of the HIRANIX factory in Mehmedabad, Gujarat"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        tabIndex={-1}
        aria-hidden="true"
      />
      <span className={styles.pin} aria-hidden="true">
        <svg viewBox="0 0 24 32" width="28" height="38">
          <path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0z" />
          <circle cx="12" cy="12" r="4.5" />
        </svg>
      </span>
      <a
        className={styles.open}
        href={contact.mapHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.label}>
          <strong>HIRANIX factory</strong>
          Mehmedabad, Gujarat
        </span>
        <span className={styles.cta}>
          Open in Google Maps
          <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
        </span>
      </a>
    </div>
  );
}
