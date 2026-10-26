"use client";

import { ClipboardText } from "@phosphor-icons/react/ClipboardText";
import { useEnquiry } from "./EnquiryProvider";
import styles from "./Enquiry.module.css";

/** The header's way into the list, with a count once something is on it. */
export function EnquiryButton() {
  const { count, open } = useEnquiry();

  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={open}
      aria-label={count ? `Enquiry list, ${count} ${count === 1 ? "item" : "items"}` : "Enquiry list, empty"}
    >
      <ClipboardText size={22} weight="regular" aria-hidden="true" />
      {count > 0 && (
        <span className={styles.badge} key={count} aria-hidden="true">
          {count}
        </span>
      )}
    </button>
  );
}
