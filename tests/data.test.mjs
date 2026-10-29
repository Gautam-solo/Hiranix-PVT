// Content integrity: the things that break a catalogue silently (a missing
// photo, two products sharing an address, an empty size table).
// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { products, productRouteSlugs, findProductBySlug, productCategories } from "../src/data/products.ts";
import { brands, contact, factory, enquiryText, whatsappHref } from "../src/data/company.ts";

const onDisk = (publicPath) => existsSync(new URL(`../public${publicPath}`, import.meta.url));

test("every product has a unique, URL-safe address", () => {
  const slugs = products.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate product slug");
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `bad slug: ${slug}`);
});

test("every route alias resolves to a real product", () => {
  assert.equal(new Set(productRouteSlugs).size, productRouteSlugs.length, "duplicate route");
  for (const slug of productRouteSlugs) assert.ok(findProductBySlug(slug), `alias without product: ${slug}`);
  assert.equal(findProductBySlug("no-such-product"), undefined);
});

test("every product has the content a product page needs", () => {
  for (const p of products) {
    assert.ok(p.name.trim(), `${p.slug}: name`);
    assert.ok(productCategories.includes(p.category), `${p.slug}: category ${p.category}`);
    assert.ok(p.statement.trim() && p.description.trim(), `${p.slug}: copy`);
    assert.ok(p.applications.length > 0 && p.features.length > 0, `${p.slug}: lists`);
    assert.ok(p.technical.columns.length > 1 && p.technical.rows.length > 0, `${p.slug}: size table`);
    for (const row of p.technical.rows) {
      assert.equal(row.length, p.technical.columns.length, `${p.slug}: ragged size row ${row[0]}`);
    }
  }
});

test("every product photo exists and is a sensible size", () => {
  for (const p of products) {
    for (const src of [p.image, p.alternateImage]) {
      assert.ok(onDisk(src), `${p.slug}: missing file ${src}`);
      const kb = statSync(new URL(`../public${src}`, import.meta.url)).size / 1024;
      assert.ok(kb < 400, `${p.slug}: ${src} is ${Math.round(kb)} KB (limit 400)`);
    }
  }
});

test("brand and factory images exist", () => {
  for (const b of brands) assert.ok(onDisk(b.image), `missing ${b.image}`);
  for (const f of factory) assert.ok(onDisk(f.src), `missing ${f.src}`);
});

test("contact details are well formed", () => {
  assert.match(contact.email, /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i);
  assert.match(contact.phoneHref, /^tel:\+\d{10,15}$/);
  assert.ok(contact.mapHref.startsWith("https://"));
  assert.ok(contact.mapEmbed.startsWith("https://www.google.com/maps"));
  assert.ok(onDisk("/Hiranix-Product-Catalogue.pdf"), "catalogue PDF missing");
});

test("enquiry messages keep what the visitor typed and nothing else", () => {
  const text = enquiryText([{ name: "Cable Nail Clip", size: "4 mm", qty: "10 boxes" }]);
  assert.match(text, /1\. Cable Nail Clip, 4 mm, Qty: 10 boxes/);
  const link = whatsappHref("Cable Nail Clip");
  assert.ok(link.startsWith("https://wa.me/"));
  assert.ok(!link.includes(" "), "unencoded space in WhatsApp link");
});
