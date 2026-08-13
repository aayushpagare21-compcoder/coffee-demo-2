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
 *   1. <link rel="preconnect">            -- assets CDN warm-up
 *   2. inline <script>                    -- v3 bootstrap
 *   3. <script async src={SCRIPT_SRC_1}>  -- production edge, `b` bundle
 *   4. <script async src={SCRIPT_SRC_2}>  -- production edge, `c` bundle
 *   5. inline <script>                    -- FIXTURE SHIM, see below
 *
 * Tags 1-4 are the shipped snippet. Tag 5 exists because the shipped `b` tag
 * carries `onerror="window.__opti_af_r&&__opti_af_r()"`, and React refuses to
 * render string event-handler attributes: both renderers (Fizz and Fiber)
 * drop any prop whose name starts with "on" on a host element, so a literal
 * `onerror` attribute cannot come out of JSX. The shim assigns the identical
 * handler as a DOM property immediately after the async tags are parsed.
 * That is race-free: a script's error event is dispatched in a task, so it
 * cannot fire before the parser has executed the next synchronous inline
 * script. Behaviour is equivalent; only the serialized attribute is missing.
 *
 * There is no server-rendered <style> tag: the bootstrap injects the
 * anti-flicker <style id="__opti_af"> itself, at runtime.
 *
 * ==========================================================================
 * PASTE THE REAL VALUES INTO THE CONSTANTS BELOW.
 * ==========================================================================
 */

/*
 * Preconnect target: warms up the connection to the assets CDN the edge
 * bundles pull variant media from. The pasted tag carries no crossorigin
 * attribute, so none is rendered.
 */
const PRECONNECT_HREF = "https://assets.optimeleon.com";

/*
 * v3 inline bootstrap. Runs synchronously, before <body> is parsed:
 *   - stubs window.optimeleon + window.__opti_capture so calls made before
 *     the async bundles land are queued instead of thrown away,
 *   - injects the anti-flicker rule -- <style id="__opti_af"> with
 *     body{opacity:0!important} -- into <head>,
 *   - exposes the reveal function as window.__opti_af_r (new in v3; the
 *     shipped `b` tag's onerror calls it so a failed bundle fetch reveals
 *     the page immediately),
 *   - removes the style after 800ms as a failsafe (was 300ms in v2), in
 *     case the edge script is slow or never arrives,
 *   - after the reveal, a MutationObserver re-removes the style if anything
 *     re-inserts it; it watches the whole document and disconnects after
 *     10s,
 *   - `window.__opti_af_v` (currently 3) makes the injection idempotent if
 *     the snippet runs twice, and the whole block is wrapped in try/catch so
 *     an exotic failure degrades to "no anti-flicker", never a blank page.
 *
 * Because the style exists only in the browser, `#__opti_af` must NOT appear
 * in the server HTML -- `npm run check:targets` asserts its absence. The
 * pre-hydration injection is safe on React 19, which skips unexpected tags
 * in <head> while hydrating.
 */
const INLINE_SCRIPT_CONTENT = `window.optimeleon=window.optimeleon||function(){(optimeleon.q=optimeleon.q||[]).push(arguments);return{ok:true,verb:String(arguments[0]||''),error:'queued'}};window.__opti_bus="__opti_capture";window.__opti_capture=window.__opti_capture||function(){(__opti_capture.q=__opti_capture.q||[]).push(arguments)};(function(d,w){try{if(w.__opti_af_v)return;w.__opti_af_v=3;var f,s=d.createElement('style');s.id='__opti_af';s.textContent='body{opacity:0!important}';d.head.appendChild(s);var r=function(){f=1;var e=d.getElementById('__opti_af');if(e)e.remove()};w.__opti_af_r=r;setTimeout(r,800);var o=new MutationObserver(function(){if(f)r()});o.observe(d.documentElement,{childList:true,subtree:true});setTimeout(function(){o.disconnect()},10000)}catch(e){}})(document,window);`;

/* Optimeleon PRODUCTION edge bundles, site key 1oQQve2h5Rut. */
const SCRIPT_SRC_1 = "https://edge.optimeleon.com/b/1oQQve2h5Rut.js";

const SCRIPT_SRC_2 = "https://edge.optimeleon.com/c/1oQQve2h5Rut.js";

/*
 * Fixture shim standing in for the shipped tag's
 * `onerror="window.__opti_af_r&&__opti_af_r()"` -- see the header comment
 * for why React cannot render that attribute directly.
 */
const ONERROR_SHIM_CONTENT = `document.getElementById('opti-snippet-async-1').onerror=function(){window.__opti_af_r&&__opti_af_r()};`;

/*
 * Why `itemProp` is on the preconnect and the two async tags
 * ---------------------------------------------------------
 * React 19 treats `<link rel="preconnect">` and `<script async src="...">`
 * as hoistable *resources*: it lifts each tag out of wherever you wrote it
 * and re-emits it in its own slot near the top of <head> -- which would put
 * both async scripts BEFORE the inline bootstrap. `itemProp` is React's own
 * opt-out: both renderers short-circuit the resource path when
 * `props.itemProp != null` (react-dom 19.1: `pushLink`/`pushScript` in Fizz,
 * `isHostHoistableType` in Fiber), so the tags render in place and hydration
 * agrees with the server HTML. The attribute itself is inert microdata:
 * there is no itemScope on this document. Inline scripts are never hoisted,
 * so tags 2 and 5 need no opt-out.
 *
 * `npm run check:targets` asserts the five-tag order against the built HTML;
 * re-check after a React upgrade.
 *
 * NOTE on absolute position: Next.js flushes its own framework tags (the
 * stylesheet <link>, image preloads and the bundle's own async chunks) into
 * the <head> preamble before ANY head children. Nothing rendered from the
 * React tree can precede them. This block is the first thing in <head> that
 * the application controls, and the relative order of the five tags below is
 * exact.
 */

export default function OptiSnippet() {
  return (
    <>
      {/* 1. <link rel="preconnect"> */}
      <link
        id="opti-snippet-preconnect"
        itemProp="opti-snippet"
        rel="preconnect"
        href={PRECONNECT_HREF}
      />

      {/* 2. inline <script> -- injects and later removes #__opti_af itself */}
      <script
        id="opti-snippet-inline"
        dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT_CONTENT }}
      />

      {/* 3. first async <script src> -- its error handler is wired by the
          shim in tag 5 */}
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

      {/* 5. fixture shim -- wires onerror onto tag 3, not part of the
          shipped snippet */}
      <script
        id="opti-snippet-onerror-shim"
        dangerouslySetInnerHTML={{ __html: ONERROR_SHIM_CONTENT }}
      />
    </>
  );
}
