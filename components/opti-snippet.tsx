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
 *   1. inline <script>
 *   2. <script async src={SCRIPT_SRC_1}>
 *   3. <script async src={SCRIPT_SRC_2}>
 *
 * There is no server-rendered <style> tag: the inline bootstrap injects the
 * anti-flicker <style id="__opti_af"> itself, at runtime. See
 * INLINE_SCRIPT_CONTENT below.
 *
 * ==========================================================================
 * PASTE THE REAL VALUES INTO THE THREE CONSTANTS BELOW.
 * ==========================================================================
 */

/*
 * Inline bootstrap. Runs synchronously, before <body> is parsed:
 *   - stubs window.optimeleon + window.__opti_capture so calls made before
 *     the async bundles land are queued instead of thrown away,
 *   - injects the anti-flicker rule -- <style id="__opti_af"> with
 *     body{opacity:0!important} -- into <head>, so visitors never see the
 *     control paint before the edge script has applied its variant,
 *   - removes that style after 300ms as a failsafe, in case the edge script
 *     is slow or never arrives,
 *   - after the reveal, a MutationObserver re-removes the style if anything
 *     re-inserts it; it watches the whole document and disconnects after
 *     10s,
 *   - `window.__opti_af_v` (currently 2) makes the injection idempotent if
 *     the snippet runs twice, and the whole block is wrapped in try/catch so
 *     an exotic failure degrades to "no anti-flicker", never a blank page.
 *
 * Because the style exists only in the browser, `#__opti_af` must NOT appear
 * in the server HTML -- `npm run check:targets` asserts its absence. The
 * pre-hydration injection is safe on React 19, which skips unexpected tags
 * in <head> while hydrating.
 */
const INLINE_SCRIPT_CONTENT = `window.optimeleon=window.optimeleon||function(){(optimeleon.q=optimeleon.q||[]).push(arguments);return{ok:true,verb:String(arguments[0]||''),error:'queued'}};window.__opti_bus="__opti_capture";window.__opti_capture=window.__opti_capture||function(){(__opti_capture.q=__opti_capture.q||[]).push(arguments)};(function(d,w){try{if(w.__opti_af_v)return;w.__opti_af_v=2;var f,s=d.createElement('style');s.id='__opti_af';s.textContent='body{opacity:0!important}';d.head.appendChild(s);var r=function(){f=1;var e=d.getElementById('__opti_af');if(e)e.remove()};setTimeout(r,300);var o=new MutationObserver(function(){if(f)r()});o.observe(d.documentElement,{childList:true,subtree:true});setTimeout(function(){o.disconnect()},10000)}catch(e){}})(document,window);`;

/*
 * Optimeleon edge bundles served by a LOCAL dev edge server, site key
 * PPXZgZc9kll6. localhost:8787 must be running for the bundles to load; in
 * a deployed build these tags 404 and the 300ms failsafe reveals the page.
 */
const SCRIPT_SRC_1 = "http://localhost:8787/b/PPXZgZc9kll6.js";

const SCRIPT_SRC_2 = "http://localhost:8787/c/PPXZgZc9kll6.js";

/*
 * Why `itemProp` is on the two async tags
 * ---------------------------------------
 * React 19 treats `<script async src="...">` as a hoistable *resource*: it
 * lifts the tag out of wherever you wrote it and re-emits it in its own slot
 * near the top of <head>. That would put both async scripts BEFORE the inline
 * <script>, which is exactly backwards -- the inline bootstrap has to run
 * first.
 *
 * `itemProp` is React's own opt-out. Both the server renderer and the client
 * renderer short-circuit the resource path when `props.itemProp != null`
 * (react-dom 19.1: `pushScript` in Fizz, `isHostHoistableType` in Fiber, each
 * of which bails on `null != props.itemProp` before any hoisting decision). So
 * the tags render in place, in document order, and hydration agrees with the
 * server HTML. The attribute itself is inert microdata: there is no itemScope
 * on this document.
 *
 * Verified against the built HTML; if you upgrade React, re-check that
 * `#opti-snippet-inline` still precedes `#opti-snippet-async-1`, which still
 * precedes `#opti-snippet-async-2`. `npm run check:targets` asserts exactly
 * that.
 *
 * NOTE on absolute position: Next.js flushes its own framework tags (the
 * stylesheet <link>, image preloads and the bundle's own async chunks) into
 * the <head> preamble before ANY head children. Nothing rendered from the
 * React tree can precede them. This block is the first thing in <head> that
 * the application controls, and, importantly, the relative order of the three
 * tags below is exact.
 */

export default function OptiSnippet() {
  return (
    <>
      {/* 1. inline <script> -- injects and later removes #__opti_af itself */}
      <script
        id="opti-snippet-inline"
        dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT_CONTENT }}
      />

      {/* 2. first async <script src> */}
      <script
        id="opti-snippet-async-1"
        itemProp="opti-snippet"
        async
        src={SCRIPT_SRC_1}
      />

      {/* 3. second async <script src> */}
      <script
        id="opti-snippet-async-2"
        itemProp="opti-snippet"
        async
        src={SCRIPT_SRC_2}
      />
    </>
  );
}
