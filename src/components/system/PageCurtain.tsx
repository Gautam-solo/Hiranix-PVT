"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Moving between pages, a green curtain lifts off the new page. The first
 * page a visitor lands on is left alone.
 */
export function PageCurtain() {
  const pathname = usePathname();
  const first = useRef(true);
  const [visit, setVisit] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setVisit((n) => n + 1);
  }, [pathname]);

  if (visit === 0) return null;
  return <div key={visit} className="hx-curtain" aria-hidden="true" />;
}
