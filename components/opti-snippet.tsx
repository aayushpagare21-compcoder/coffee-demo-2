/* ==========================================================================
 * OPTI SNIPPET MOUNT POINT
 * ==========================================================================
 *
 * This component is rendered as the FIRST child of <head> in app/layout.tsx.
 * It is a plain server component, so everything below is present in the
 * initial server-rendered HTML, before <body> and before React hydrates.
 *
 * It deliberately does NOT use next/script: next/script re-orders tags,
 * defers execution and injects them client-side, which is exactly the
 * behaviour we need to avoid when QA-ing a synchronous anti-flicker snippet.
 *
 * Rendered order (do not change):
 *   1. inline <style>
 *   2. inline <script>
 *   3. <script async src={SCRIPT_SRC_1}>
 *   4. <script async src={SCRIPT_SRC_2}>
 *
 * ==========================================================================
 * PASTE THE REAL VALUES INTO THE FOUR CONSTANTS BELOW.
 * ==========================================================================
 */

/* TODO: replace with the real inline CSS (e.g. the anti-flicker rule). */
const STYLE_CONTENT = `
/* TODO: paste the real anti-flicker / snippet CSS here. */
/* Example shape:  .opti-hide { opacity: 0 !important; }               */
`;

/* TODO: replace with the real inline bootstrap script (no <script> tags). */
const INLINE_SCRIPT_CONTENT = `
/* TODO: paste the real inline snippet JS here. */
/* It runs synchronously, before <body> is parsed. */
`;

/* TODO: replace with the real first async script URL. */
const SCRIPT_SRC_1 = "/opti-snippet-placeholder-1.js";

/* TODO: replace with the real second async script URL. */
const SCRIPT_SRC_2 = "/opti-snippet-placeholder-2.js";

/*
 * Why `itemProp` is on the two async tags
 * ---------------------------------------
 * React 19 treats `<script async src="...">` as a hoistable *resource*: it
 * lifts the tag out of wherever you wrote it and re-emits it in its own slot
 * near the top of <head>. That would put both async scripts BEFORE the inline
 * <script> above them, which is exactly backwards -- the inline bootstrap has
 * to run first.
 *
 * `itemProp` is React's own opt-out. Both the server renderer and the client
 * renderer short-circuit the resource path when `props.itemProp != null`
 * (react-dom: `isHostHoistableType`), so the tag is rendered in place, in
 * document order, and hydration agrees with the server HTML. The attribute
 * itself is inert microdata: there is no itemScope on this document.
 *
 * Verified against the built HTML; if you upgrade React, re-check that
 * `#opti-snippet-style` still precedes `#opti-snippet-inline`, which still
 * precedes `#opti-snippet-async-1`.
 *
 * NOTE on absolute position: Next.js flushes its own framework tags (the
 * stylesheet <link>, image preloads and the bundle's own async chunks) into
 * the <head> preamble before ANY head children. Nothing rendered from the
 * React tree can precede them. This block is the first thing in <head> that
 * the application controls, and, importantly, the relative order of the four
 * tags below is exact.
 */

export default function OptiSnippet() {
  return (
    <>
      {/* 1. inline <style> */}
      <style
        id="opti-snippet-style"
        dangerouslySetInnerHTML={{ __html: STYLE_CONTENT }}
      />

      {/* 2. inline <script> */}
      <script
        id="opti-snippet-inline"
        dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT_CONTENT }}
      />

      {/* 3. first async <script src> */}
      <script
        id="opti-snippet-async-1"
        itemProp="opti-snippet"
        async
        src={SCRIPT_SRC_1}
      />

      {/* 4. second async <script src> */}
      <script
        id="opti-snippet-async-2"
        itemProp="opti-snippet"
        async
        src={SCRIPT_SRC_2}
      />
    </>
  );
}
