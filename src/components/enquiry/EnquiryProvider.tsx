"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type EnquiryItem = {
  id: string;
  slug: string;
  name: string;
  /** The catalogue size, or empty for "any size". */
  size: string;
  qty: string;
};

type EnquiryContextValue = {
  items: EnquiryItem[];
  count: number;
  isOpen: boolean;
  has: (id: string) => boolean;
  add: (item: Omit<EnquiryItem, "id" | "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const KEY = "hiranix-enquiry-list";
const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export const itemId = (slug: string, size: string) => `${slug}|${size}`;

const text = (value: unknown, max: number): string | null =>
  typeof value === "string" && value.length <= max ? value : null;

/**
 * Anything read back from storage is treated as untrusted (another script or a
 * person can edit it): only well-formed, bounded entries come through.
 */
function sanitize(saved: unknown): EnquiryItem[] {
  if (!Array.isArray(saved)) return [];
  const clean: EnquiryItem[] = [];
  for (const raw of saved.slice(0, 60)) {
    if (!raw || typeof raw !== "object") continue;
    const entry = raw as Record<string, unknown>;
    const slug = text(entry.slug, 80);
    const name = text(entry.name, 120);
    const size = text(entry.size, 60);
    const qty = text(entry.qty, 40);
    if (!slug || !/^[a-z0-9-]+$/.test(slug) || !name || size === null || qty === null) continue;
    clean.push({ slug, name, size, qty, id: itemId(slug, size) });
  }
  return clean;
}

/**
 * The visitor's enquiry list. It lives in this browser's localStorage, so it
 * survives navigation and a refresh, and nothing is sent anywhere until they
 * press Send.
 */
export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Read after hydration so the server and first client render agree.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setItems(sanitize(JSON.parse(window.localStorage.getItem(KEY) ?? "[]")));
      } catch {
        /* private mode or a corrupted value: start with an empty list */
      }
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage is optional */
    }
  }, [items, ready]);

  const add = useCallback((item: Omit<EnquiryItem, "id" | "qty">) => {
    const id = itemId(item.slug, item.size);
    setItems((current) => (current.some((entry) => entry.id === id) ? current : [...current, { ...item, id, qty: "" }]));
  }, []);

  const value = useMemo<EnquiryContextValue>(
    () => ({
      items,
      count: items.length,
      isOpen,
      has: (id) => items.some((entry) => entry.id === id),
      add,
      remove: (id) => setItems((current) => current.filter((entry) => entry.id !== id)),
      setQty: (id, qty) =>
        setItems((current) => current.map((entry) => (entry.id === id ? { ...entry, qty: qty.slice(0, 40) } : entry))),
      clear: () => setItems([]),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [items, isOpen, add],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return context;
}
