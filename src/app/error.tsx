"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Shown when a page throws while rendering or after it loads. The header and
 * footer stay in place; the visitor can retry or go home instead of facing a
 * blank screen.
 */
export default function PageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" tabIndex={-1} className="not-found" role="alert">
      <div className="not-found__copy">
        <span>SOMETHING WENT WRONG</span>
        <h1>This page did not load.</h1>
        <p>It is not you. Try again, or head back to the home page.</p>
        <button type="button" onClick={reset} className="not-found__button">
          Try again
        </button>
        <Link href="/">Return home <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
