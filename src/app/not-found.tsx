import Link from "next/link";

export default function NotFound() {
  return (
    // No brand mark here: the global SiteHeader in layout.tsx already renders
    // one, and the two collided on top of each other. The header also gives a
    // 404 visitor real navigation, which a bare wordmark did not.
    <main id="main-content" tabIndex={-1} className="not-found">
      <div className="not-found__copy">
        <span>404 / PAGE NOT FOUND</span>
        <h1>This page needs a better fix.</h1>
        <p>The address may have changed, or the page may no longer be available.</p>
        <Link href="/">Return home <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
