import { Fragment, createElement, isValidElement, type ComponentType, type ReactNode } from "react";

/**
 * Minimale, synchrone JSX→HTML-renderer voor onze eigen tekstcomponenten (privacy, voorwaarden, support).
 * Next staat `react-dom/server` niet toe in de serverlaag; dit is het kleine deel dat we nodig hebben:
 * functiecomponenten zonder hooks, fragments, arrays, tekst en host-elementen met een paar attributen.
 * Alleen de attributen die de Markdown-omzetter leest blijven staan (href, src, alt, title, scope).
 */
const VOID = new Set(["br", "img", "hr", "input", "meta", "link", "source", "wbr"]);
const KEEP = new Set(["href", "src", "alt", "title", "scope", "start"]);

const escText = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s: string) => escText(s).replace(/"/g, "&quot;");

export function renderStatic(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string") return escText(node);
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(renderStatic).join("");
  if (!isValidElement(node)) return "";
  const { type, props } = node as { type: unknown; props: Record<string, unknown> & { children?: ReactNode } };
  if (type === Fragment) return renderStatic(props.children);
  if (typeof type === "function") {
    // Functiecomponent (geen hooks, geen async): gewoon aanroepen.
    return renderStatic((type as (p: unknown) => ReactNode)(props));
  }
  if (typeof type !== "string") return renderStatic(props.children); // memo/forwardRef e.d.: alleen de kinderen
  const attrs = Object.entries(props)
    .filter(([k, v]) => KEEP.has(k) && v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${k}="${escAttr(String(v))}"`)
    .join("");
  if (VOID.has(type)) return `<${type}${attrs}/>`;
  const raw = props.dangerouslySetInnerHTML as { __html?: string } | undefined;
  const inner = raw?.__html ?? renderStatic(props.children);
  return `<${type}${attrs}>${inner}</${type}>`;
}

/** Rendert een component zonder props naar statische HTML. */
export function renderComponent(Body: ComponentType): string {
  return renderStatic(createElement(Body));
}
