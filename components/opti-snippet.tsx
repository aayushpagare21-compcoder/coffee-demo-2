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

/*
 * `nowprocket` and `data-no-minify="1"` ride along on the tags exactly as
 * Optimeleon hands them out. They are inert here -- they are opt-out markers
 * for WordPress optimisation plugins (WP Rocket's defer/combine pass reads
 * `nowprocket`, minifiers read `data-no-minify`) -- but the fixture is meant
 * to render the shipped snippet byte-for-byte, so they stay.
 *
 * TS does not know `nowprocket`; it is not a standard HTML attribute. The
 * augmentation below teaches it to the JSX prop types rather than casting at
 * each call site.
 */
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    nowprocket?: string;
  }
}

/*
 * Anti-flicker rule: hide <body> until the edge script has applied its
 * variant, so visitors never see the control paint first.
 *
 * The <style> tag carrying this MUST keep id="__opti_af" -- the inline script
 * below removes it by that exact id. Rename it and the page stays blank.
 */
const STYLE_CONTENT = `body{opacity:0!important}`;

/*
 * Inline bootstrap. Runs synchronously, before <body> is parsed:
 *   - stubs window.optimeleon + window.__opti_capture so calls made before
 *     the async bundles land are queued instead of thrown away,
 *   - drops the anti-flicker <style> after 300ms as a failsafe, in case the
 *     edge script is slow or never arrives.
 */
const INLINE_SCRIPT_CONTENT = `window.optimeleon=window.optimeleon||function(){(optimeleon.q=optimeleon.q||[]).push(arguments);return{ok:true,verb:String(arguments[0]||''),error:'queued'}};window.__opti_bus="__opti_capture";window.__opti_capture=window.__opti_capture||function(){(__opti_capture.q=__opti_capture.q||[]).push(arguments)};setTimeout(function(){var s=document.getElementById('__opti_af');if(s)s.remove()},300);`;

/* Optimeleon edge bundles (staging), site key pFAjbs8VjA2v. */
const SCRIPT_SRC_1 = "https://edge-staging.optimeleon.com/b/pFAjbs8VjA2v.js";

const SCRIPT_SRC_2 = "https://edge-staging.optimeleon.com/c/pFAjbs8VjA2v.js";

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
 * `#__opti_af` still precedes `#opti-snippet-inline`, which still precedes
 * `#opti-snippet-async-1`. `npm run check:targets` asserts exactly that.
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
      {/* 1. inline <style> -- id is load-bearing, see STYLE_CONTENT above */}
      <style
        id="__opti_af"
        data-no-minify="1"
        dangerouslySetInnerHTML={{ __html: STYLE_CONTENT }}
      />

      {/* 2. inline <script> */}
      <script
        id="opti-snippet-inline"
        nowprocket=""
        data-no-minify="1"
        dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT_CONTENT }}
      />

      {/* 3. first async <script src> */}
      <script
        id="opti-snippet-async-1"
        itemProp="opti-snippet"
        async
        src={SCRIPT_SRC_1}
        nowprocket=""
        data-no-minify="1"
      />

      {/* 4. second async <script src> */}
      <script
        id="opti-snippet-async-2"
        itemProp="opti-snippet"
        async
        src={SCRIPT_SRC_2}
        nowprocket=""
        data-no-minify="1"
      />
    </>
  );
}
