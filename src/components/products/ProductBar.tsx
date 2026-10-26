"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/WhatsappLogo";
import { whatsappHref } from "@/data/company";
import styles from "./ProductDetail.module.css";

/**
 * Once the main enquiry button has scrolled away, a slim bar keeps the one
 * action at the bottom of the screen, where a thumb reaches it.
 */
export function ProductBar({ name, anchorId }: { name: string; anchorId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const anchor = document.getElementById(anchorId);
    if (!anchor || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(anchor);
    return () => io.disconnect();
  }, [anchorId]);

  return (
    <div className={styles.bar} data-show={show ? "" : undefined} aria-hidden={!show}>
      <p>{name}</p>
      <a
        className="btn btn--primary"
        href={whatsappHref(name)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
      >
        <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
        Enquire on WhatsApp
      </a>
    </div>
  );
}
