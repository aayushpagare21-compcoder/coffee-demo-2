/* ==========================================================================
 * OPTI SNIPPET MOUNT POINT
 * ==========================================================================
 *
 * This component is rendered as the FIRST child of <head> in app/layout.tsx.
 * It is a plain server component, so anything returned here is present in
 * the initial server-rendered HTML, before <body> and before React hydrates.
 *
 * NO SNIPPET IS CURRENTLY PASTED -- the component renders nothing, and no
 * opti-* tags appear in <head>.
 *
 * To paste one:
 *   - return its tags from the component below, in shipped order, verbatim
 *     (keep vendor attributes like `data-cookieconsent` or `nowprocket`,
 *     even when they are inert in a Next app),
 *   - give each tag a stable id, and list those ids in SNIPPET_ORDER in
 *     scripts/pages.mjs,
 *   - list any ids the snippet injects at runtime (anti-flicker styles and
 *     the like) in SNIPPET_CLIENT_INJECTED_IDS there too,
 *   - run `npm run verify`.
 *
 * Do NOT use next/script: it re-orders tags, defers execution and injects
 * them client-side, which is exactly the behaviour a synchronous
 * anti-flicker snippet QA needs to avoid.
 *
 * Two <head>-ordering gotchas for whatever gets pasted:
 *   - React 19 hoists `<script async src>` tags to the top of <head>. Tags
 *     that must stay below an inline bootstrap need the `itemProp`
 *     attribute, React's documented opt-out from resource hoisting. Inline
 *     scripts are never hoisted.
 *   - Next.js flushes its own framework tags (the stylesheet <link>, image
 *     preloads and the bundle's async chunks) into the <head> preamble
 *     before ANY head children. This mount point is the first thing in
 *     <head> that the application controls.
 */

export default function OptiSnippet() {
  return null;
}
