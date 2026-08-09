"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownloadSimple } from "@phosphor-icons/react/DownloadSimple";
import { List } from "@phosphor-icons/react/List";
import { X } from "@phosphor-icons/react/X";
import { HiranixLogo } from "@/components/HiranixLogo";
import {
  CATALOGUE_A11Y_LABEL,
  CATALOGUE_SIZE_LABEL,
  catalogueLinkProps,
} from "@/data/catalogue";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Brand", href: "/brand" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = menuButton.current;
    const firstLink = drawer.current?.querySelector<HTMLAnchorElement>("a");
    document.body.style.overflow = "hidden";
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawer.current) return;
      const focusable = Array.from(
        drawer.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

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

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };
    const legacyDesktop = desktop as unknown as {
      addListener: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener: (listener: (event: MediaQueryListEvent) => void) => void;
    };

    if ("addEventListener" in desktop) {
      desktop.addEventListener("change", closeOnDesktop);
      return () => desktop.removeEventListener("change", closeOnDesktop);
    }

    // Safari 13 uses the legacy MediaQueryList listener API. Keeping this
    // branch lets the drawer close cleanly after a rotation or window resize.
    legacyDesktop.addListener(closeOnDesktop);
    return () => legacyDesktop.removeListener(closeOnDesktop);
  }, []);

  return (
    <>
      <nav className="hx-nav" aria-label="Primary navigation">
        <button
          ref={menuButton}
          className="hx-menu-trigger"
          type="button"
          aria-label="Open navigation menu"
          aria-controls="hx-mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <List size={24} weight="regular" aria-hidden="true" />
        </button>
        <Link href="/" className="hx-logo" aria-label="HIRANIX home">
          <HiranixLogo className="hx-logo-image" priority />
        </Link>
        <div className="hx-links">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <a
          {...catalogueLinkProps}
          className="hx-pill hx-catalogue"
          aria-label={CATALOGUE_A11Y_LABEL}
        >
          <DownloadSimple className="hx-catalogue-icon" size={20} weight="regular" aria-hidden="true" />
          <span>
            Download Catalogue
            <small className="hx-catalogue-size">{CATALOGUE_SIZE_LABEL}</small>
          </span>
        </a>
      </nav>

      <div
        className={`hx-menu-shell${isMenuOpen ? " is-open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          className="hx-menu-backdrop"
          type="button"
          aria-label="Close navigation menu"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={() => setIsMenuOpen(false)}
        />
        <aside
          ref={drawer}
          id="hx-mobile-menu"
          className="hx-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          inert={!isMenuOpen}
        >
          <div className="hx-menu-head">
            <span className="hx-menu-wordmark" aria-hidden="true">
              <HiranixLogo className="hx-menu-logo-image" />
            </span>
            <button
              className="hx-menu-close"
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} weight="regular" aria-hidden="true" />
            </button>
          </div>
          <div className="hx-menu-links">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <p className="hx-menu-note">
            Electrical fittings, fasteners and enclosures engineered for every fix.
          </p>
        </aside>
      </div>
    </>
  );
}
