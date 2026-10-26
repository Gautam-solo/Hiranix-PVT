import type { ReactNode } from "react";
import styles from "./SectionHead.module.css";

/**
 * Every section opens the same way: a plain title on the left, a line of
 * facts and the section's one action on the right.
 */
export function SectionHead({
  id,
  title,
  intro,
  action,
  as: Tag = "h2",
}: {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <header className={styles.head} data-reveal="rise">
      <Tag id={id} className="t-display-m">
        {title}
      </Tag>
      {(intro || action) && (
        <div className={styles.side}>
          {intro && <p className="t-body">{intro}</p>}
          {action}
        </div>
      )}
    </header>
  );
}
