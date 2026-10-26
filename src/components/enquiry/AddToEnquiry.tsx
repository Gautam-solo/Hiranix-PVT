"use client";

import { Check } from "@phosphor-icons/react/Check";
import { ListPlus } from "@phosphor-icons/react/ListPlus";
import { itemId, useEnquiry } from "./EnquiryProvider";

/**
 * Adds a product (and optionally a size) to the enquiry list. Once added, the
 * same button opens the list instead, so the next step is always one tap away.
 */
export function AddToEnquiry({
  slug,
  name,
  size = "",
  className = "btn",
}: {
  slug: string;
  name: string;
  size?: string;
  className?: string;
}) {
  const { add, has, open } = useEnquiry();
  const added = has(itemId(slug, size));

  return (
    <button
      type="button"
      className={className}
      onClick={() => (added ? open() : add({ slug, name, size }))}
      aria-live="polite"
    >
      {added ? (
        <>
          <Check size={16} weight="bold" aria-hidden="true" />
          Added. View list
        </>
      ) : (
        <>
          <ListPlus size={18} weight="bold" aria-hidden="true" />
          {size ? `Add ${size} to list` : "Add to enquiry list"}
        </>
      )}
    </button>
  );
}
