/**
 * A very small HTML scanner, good enough for the output React produces.
 *
 * It exists so the QA scripts in this repo have zero dependencies: the built
 * pages under .next/server/app are read straight off disk and turned into a
 * flat, ordered list of elements. Not a spec-compliant parser, and it does
 * not need to be.
 */

import { readFileSync } from "node:fs";

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/** Contents are raw text, never markup, and never part of visible text. */
const RAW_TEXT_TAGS = new Set(["script", "style", "textarea", "title"]);

const TAG_RE =
  /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'`=<>]+))?)*)\s*(\/?)>/g;

const ATTR_RE =
  /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'`=<>]+)))?/g;

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function parseAttrs(raw) {
  const attrs = {};
  if (!raw) return attrs;
  ATTR_RE.lastIndex = 0;
  let m;
  while ((m = ATTR_RE.exec(raw)) !== null) {
    const value = m[2] ?? m[3] ?? m[4] ?? "";
    attrs[m[1].toLowerCase()] = decodeEntities(value);
  }
  return attrs;
}

/**
 * @returns {{elements: Array<{
 *   tag: string, attrs: Record<string,string>, id: string, classes: string[],
 *   text: string, start: number, end: number, depth: number
 * }>}}
 *
 * `start`/`end` bound the element's subtree inside `elements`, so the
 * descendants of `elements[i]` are `elements.slice(i + 1, elements[i].end)`.
 */
export function parseHtml(html) {
  const elements = [];
  const stack = [];
  let cursor = 0;

  const pushText = (chunk) => {
    // React emits <!-- --> separators between adjacent text nodes.
    const text = decodeEntities(chunk.replace(/<!--[\s\S]*?-->/g, "")).replace(
      /\s+/g,
      " ",
    );
    if (!text.trim()) return;
    for (const el of stack) el.textParts.push(text);
  };

  TAG_RE.lastIndex = 0;
  let match;
  while ((match = TAG_RE.exec(html)) !== null) {
    // Skip comments and doctypes, which TAG_RE does not match anyway.
    if (match.index > cursor) pushText(html.slice(cursor, match.index));
    cursor = TAG_RE.lastIndex;

    const [, closing, rawTag, rawAttrs, selfClosing] = match;
    const tag = rawTag.toLowerCase();

    if (closing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          for (const popped of stack.splice(i)) {
            popped.el.end = elements.length;
            popped.el.text = popped.textParts.join(" ").replace(/\s+/g, " ").trim();
          }
          break;
        }
      }
      continue;
    }

    const attrs = parseAttrs(rawAttrs);
    const el = {
      tag,
      attrs,
      id: attrs.id ?? "",
      classes: (attrs.class ?? "").split(/\s+/).filter(Boolean),
      text: "",
      start: elements.length,
      end: elements.length + 1,
      depth: stack.length,
    };
    elements.push(el);

    if (VOID_TAGS.has(tag) || selfClosing) continue;

    if (RAW_TEXT_TAGS.has(tag)) {
      // Jump past the raw text body without treating it as markup.
      const closeAt = html.toLowerCase().indexOf(`</${tag}`, cursor);
      if (closeAt === -1) break;
      const closeEnd = html.indexOf(">", closeAt);
      cursor = closeEnd === -1 ? html.length : closeEnd + 1;
      TAG_RE.lastIndex = cursor;
      continue;
    }

    stack.push({ tag, el, textParts: [] });
  }

  for (const popped of stack) {
    popped.el.end = elements.length;
    popped.el.text = popped.textParts.join(" ").replace(/\s+/g, " ").trim();
  }

  return { elements };
}

/** Reads a built page off disk and parses it. */
export function parsePage(path) {
  return parseHtml(readFileSync(path, "utf8"));
}
