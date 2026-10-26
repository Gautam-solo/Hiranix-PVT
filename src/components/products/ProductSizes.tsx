"use client";

import { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/WhatsappLogo";
import { AddToEnquiry } from "@/components/enquiry/AddToEnquiry";
import { whatsappHref } from "@/data/company";
import styles from "./ProductDetail.module.css";

type Props = {
  slug: string;
  name: string;
  columns: string[];
  rows: string[][];
  carton?: string;
};

/**
 * Choose a size, read its pack and weight facts, and enquire for exactly that
 * size. The complete catalogue table stays one tap away for anyone who wants it.
 */
export function ProductSizes({ slug, name, columns, rows, carton }: Props) {
  const [current, setCurrent] = useState(0);

  // Grouped products (Elite / Magnum, UPVC / CPVC) lead with a range column;
  // the size is the range and the size together.
  const labelCount = columns[0] === "Range" ? 2 : 1;
  const labelOf = (row: string[]) => row.slice(0, labelCount).join(" ");
  const row = rows[current];

  return (
    <div className={styles.sizes}>
      <div className={styles.picker}>
        <p className={styles.pickerLabel} id="size-picker-label">Choose a size</p>
        <div className={styles.chips} role="group" aria-labelledby="size-picker-label">
          {rows.map((item, i) => (
            <button
              key={item.join("|")}
              type="button"
              aria-pressed={i === current}
              onClick={() => setCurrent(i)}
            >
              {labelOf(item)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chosen} aria-live="polite">
        <h3 className="t-display-m">{labelOf(row)}</h3>
        <dl className={styles.facts}>
          {columns.slice(labelCount).map((column, i) => (
            <div key={column}>
              <dt>{column}</dt>
              <dd>{row[labelCount + i]}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.chosenActions}>
          <AddToEnquiry slug={slug} name={name} size={labelOf(row)} className="btn btn--primary" />
          <a
            className="btn"
            href={whatsappHref(`${name}, size ${labelOf(row)}`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
            Enquire now
          </a>
        </div>
      </div>

      <details className={styles.fullTable}>
        <summary>View the complete size table</summary>
        <div className={styles.tableWrap} tabIndex={0}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.join("|")}>
                  {item.map((value, index) =>
                    index === 0 ? (
                      <th key={index} scope="row">{value}</th>
                    ) : (
                      <td key={index}>{value}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <div className={styles.notes}>
        {carton && <p>Master carton (L × B × H): {carton}</p>}
        <p>Catalogue weights may vary slightly. Confirm critical specifications with HIRANIX before purchase.</p>
      </div>
    </div>
  );
}
