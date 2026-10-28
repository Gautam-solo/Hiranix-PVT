import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * Splits text into masked words on the server, so headings can rise word by
 * word (data-split) or fill as you scroll (data-words) without touching the
 * DOM after hydration. Elements inside keep their own markup: an accent span
 * is split too, word by word.
 */
export function splitWords(node: ReactNode, counter = { i: 0 }): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      const parts = String(child).split(/(\s+)/);
      return parts.map((part, k) => {
        if (part === "") return null;
        if (/^\s+$/.test(part)) return " ";
        const i = counter.i++;
        return (
          <span className="w" key={`${i}-${k}`} style={{ "--wi": i } as React.CSSProperties}>
            <span>{part}</span>
          </span>
        );
      });
    }
    if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode }>;
      if (element.type === "br") return element;
      return cloneElement(element, undefined, splitWords(element.props.children, counter));
    }
    return child;
  });
}

type SplitProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  children: ReactNode;
  /** "rise": each word rises once on entry. "fill": words fill as you scroll. */
  mode?: "rise" | "fill";
  /** Extra delay before the first word rises, in ms. */
  delay?: number;
  className?: string;
  id?: string;
};

export function Split({ as: Tag = "h2", children, mode = "rise", delay, className, id }: SplitProps) {
  const label = textOf(children);
  return (
    <Tag
      id={id}
      className={className}
      data-split={mode === "rise" ? "" : undefined}
      data-words={mode === "fill" ? "" : undefined}
      style={delay ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{splitWords(children)}</span>
    </Tag>
  );
}

function textOf(node: ReactNode): string {
  let out = "";
  Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") out += child;
    else if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode }>;
      out += element.type === "br" ? " " : textOf(element.props.children);
    }
  });
  return out.replace(/\s+/g, " ").trim();
}
