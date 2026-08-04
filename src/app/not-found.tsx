import Link from "next/link";
import { HiranixLogo } from "@/components/HiranixLogo";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="not-found">
      <Link className="not-found__brand" href="/" aria-label="HIRANIX home">
        <HiranixLogo className="not-found__brand-image" />
      </Link>
      <div className="not-found__copy">
        <span>404 / PAGE NOT FOUND</span>
        <h1>This page needs a better fix.</h1>
        <p>The address may have changed, or the page may no longer be available.</p>
        <Link href="/">Return home <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
