"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { EnvelopeSimple } from "@phosphor-icons/react/EnvelopeSimple";
import { Trash } from "@phosphor-icons/react/Trash";
import { WhatsappLogo } from "@phosphor-icons/react/WhatsappLogo";
import { X } from "@phosphor-icons/react/X";
import { mailtoListHref, whatsappListHref } from "@/data/company";
import { useEnquiry } from "./EnquiryProvider";
import styles from "./Enquiry.module.css";

/**
 * The enquiry list as a panel that slides in from the right: review the items,
 * set a quantity for each, and send the whole list in one message.
 */
export function EnquiryPanel() {
  const { items, count, isOpen, remove, setQty, clear, close } = useEnquiry();
  const panel = useRef<HTMLElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = Array.from(
        panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      trigger?.focus?.();
    };
  }, [isOpen, close]);

  return (
    <div className={styles.shell} data-open={isOpen ? "" : undefined} aria-hidden={!isOpen}>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close enquiry list"
        tabIndex={isOpen ? 0 : -1}
        onClick={close}
      />
      <aside
        ref={panel}
        className={styles.panel}
        data-chapter="ink"
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        inert={!isOpen}
      >
        <header className={styles.head}>
          <div>
            <h2 id="enquiry-title" className="t-heading">Your enquiry list</h2>
            <p className={styles.sub}>
              {count ? `${count} ${count === 1 ? "item" : "items"}` : "Nothing added yet"}
            </p>
          </div>
          <button ref={closeButton} type="button" className={styles.close} onClick={close} aria-label="Close enquiry list">
            <X size={22} weight="regular" aria-hidden="true" />
          </button>
        </header>

        {count === 0 ? (
          <div className={styles.empty}>
            <p className="t-body">
              Choose a size on any product page and add it here. When your list is ready, send it to the
              sales team in one message.
            </p>
            <Link className="btn btn--primary" href="/products" onClick={close}>
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.id}>
                  <div className={styles.what}>
                    <Link href={`/products/${item.slug}`} onClick={close}>{item.name}</Link>
                    <span>{item.size || "Any size"}</span>
                  </div>
                  <label className={styles.qty}>
                    <span className="sr-only">Quantity for {item.name} {item.size}</span>
                    <input
                      type="text"
                      inputMode="text"
                      placeholder="Quantity"
                      value={item.qty}
                      maxLength={40}
                      onChange={(event) => setQty(item.id, event.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name} ${item.size} from the list`}
                  >
                    <Trash size={18} weight="regular" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            <footer className={styles.foot}>
              <a className="btn btn--primary" href={whatsappListHref(items)} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
                Send list on WhatsApp
              </a>
              <a className="btn" href={mailtoListHref(items)}>
                <EnvelopeSimple size={18} weight="regular" aria-hidden="true" />
                Send by email
              </a>
              <button type="button" className={styles.clear} onClick={clear}>
                Clear list
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
