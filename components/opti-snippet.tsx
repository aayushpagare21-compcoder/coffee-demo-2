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
 * TWO snippet generations are pasted side by side, on purpose, to QA how
 * they interact. Rendered order (do not change):
 *   1. inline <script> -- v1 consent helper
 *   2. inline <script> -- v1 anti-flicker + loader bootstrap
 *   3. inline <script> -- v2 bootstrap
 *   4. <script async src={SCRIPT_SRC_1}>  (v2, local edge server)
 *   5. <script async src={SCRIPT_SRC_2}>  (v2, local edge server)
 *
 * THE v1/v2 ORDER IS LOAD-BEARING. Both generations guard on
 * window.optimeleon: the v2 bootstrap assigns its queue stub with
 * `window.optimeleon = window.optimeleon || ...`, and the v1 loader is
 * wrapped in `e.optimeleon || (...)` -- whichever runs first wins the
 * global, and the loser degrades. With v1 first (as below), v1 injects its
 * CDN bundle and keeps its stub; v2's stub defers to v1's, while everything
 * else in the v2 bootstrap (the __opti_capture stub, the __opti_af style)
 * still runs, and the v2 edge bundles still load from their own tags. If v2
 * ran first instead, the v1 loader would no-op entirely and its CDN bundle
 * WOULD NEVER LOAD.
 *
 * Note also: both bootstraps inject an anti-flicker style
 * (#optimeleon-overlay at 2000ms failsafe, #__opti_af at 300ms), so with
 * no bundle removing them earlier the body stays hidden for up to 2s.
 *
 * ==========================================================================
 * PASTE THE REAL VALUES INTO THE FIVE CONSTANTS BELOW.
 * ==========================================================================
 */

/*
 * v1 consent helper. Exposes window.setOptiCookieConsent, which persists the
 * given consent object to localStorage under "opti_consent" for the bundle
 * to read. `type="text/javascript"` and `data-cookieconsent="ignore"`
 * (Cookiebot's run-regardless-of-consent marker) ride along verbatim, as
 * does the inert `async` on the next tag -- the fixture renders shipped
 * snippets byte-for-byte.
 */
const CONSENT_SCRIPT_CONTENT = `window.setOptiCookieConsent = function(consent) {
    localStorage.setItem("opti_consent", JSON.stringify(consent));
  };`;

/*
 * v1 inline bootstrap. Runs synchronously, before <body> is parsed:
 *   - injects <style id="optimeleon-overlay"> (body{opacity:0}) into <head>,
 *     exposes window.rmfk to remove it, and calls it after 2000ms as a
 *     failsafe,
 *   - stubs window.optimeleon (callMethod/queue) and injects
 *     <script async src=".../v1.main.js"> before the first <script> in the
 *     document -- both ONLY if window.optimeleon is not already defined,
 *     which is why this tag must precede the v2 bootstrap,
 *   - queues optimeleon("init",true,true).
 */
const V1_INLINE_SCRIPT_CONTENT = `!(function (h, i, e) {
  var t = 2000;
  var n = h.createElement("style");
  n.id = e;
  n.innerHTML = "body{opacity:0}";
  h.head.appendChild(n);
  i.rmfk = function () {
    var t = h.getElementById(e);
    t && t.parentNode.removeChild(t);
  };
  setTimeout(i.rmfk, t);
})(document, window, "optimeleon-overlay");

!function(e,t,o,n,a,c,i){e.optimeleon||(a=e.optimeleon=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},a.push=a,a.queue=[],(c=t.createElement(o)).async=!0,c.src="https://cdn.optimeleon.com/oat-xv7aq/oat-xv7aq/v1.main.js",c.setAttribute("data-cookieconsent","ignore"),(i=t.getElementsByTagName(o)[0]).parentNode.insertBefore(c,i))}(window,document,"script");
optimeleon("init",true,true);`;

/*
 * v2 inline bootstrap. Runs synchronously, after the v1 tags:
 *   - `window.optimeleon = window.optimeleon || ...` -- with v1 ahead of it
 *     this keeps v1's stub rather than installing its own,
 *   - stubs window.__opti_capture (v1 does not touch it),
 *   - injects <style id="__opti_af"> (body{opacity:0!important}), removes it
 *     after 300ms, then a MutationObserver re-removes it for 10s;
 *     `window.__opti_af_v` makes that idempotent, try/catch keeps a failure
 *     from ever leaving the page blank.
 *
 * Because all the anti-flicker styles exist only in the browser, neither
 * `#optimeleon-overlay` nor `#__opti_af` may appear in the server HTML --
 * `npm run check:targets` asserts their absence. Pre-hydration injection is
 * safe on React 19, which skips unexpected tags in <head> while hydrating.
 */
const V2_INLINE_SCRIPT_CONTENT = `window.optimeleon=window.optimeleon||function(){(optimeleon.q=optimeleon.q||[]).push(arguments);return{ok:true,verb:String(arguments[0]||''),error:'queued'}};window.__opti_bus="__opti_capture";window.__opti_capture=window.__opti_capture||function(){(__opti_capture.q=__opti_capture.q||[]).push(arguments)};(function(d,w){try{if(w.__opti_af_v)return;w.__opti_af_v=2;var f,s=d.createElement('style');s.id='__opti_af';s.textContent='body{opacity:0!important}';d.head.appendChild(s);var r=function(){f=1;var e=d.getElementById('__opti_af');if(e)e.remove()};setTimeout(r,300);var o=new MutationObserver(function(){if(f)r()});o.observe(d.documentElement,{childList:true,subtree:true});setTimeout(function(){o.disconnect()},10000)}catch(e){}})(document,window);`;

/*
 * v2 edge bundles served by a LOCAL dev edge server, site key PPXZgZc9kll6.
 * localhost:8787 must be running for these to load; the v1 CDN bundle loads
 * from production regardless.
 */
const SCRIPT_SRC_1 = "http://localhost:8787/b/PPXZgZc9kll6.js";

const SCRIPT_SRC_2 = "http://localhost:8787/c/PPXZgZc9kll6.js";

/*
 * Why `itemProp` is on the two async tags
 * ---------------------------------------
 * React 19 treats `<script async src="...">` as a hoistable *resource*: it
 * lifts the tag out of wherever you wrote it and re-emits it near the top of
 * <head> -- which would put both async scripts BEFORE all three inline
 * bootstraps. `itemProp` is React's own opt-out: both renderers short-circuit
 * the resource path when `props.itemProp != null` (react-dom 19.1:
 * `pushScript` in Fizz, `isHostHoistableType` in Fiber), so the tags render
 * in place and hydration agrees with the server HTML. The attribute itself is
 * inert microdata: there is no itemScope on this document. Inline scripts are
 * never hoisted, so the three bootstraps need no opt-out.
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
      {/* 1. v1 consent helper */}
      <script
        id="opti-snippet-consent"
        type="text/javascript"
        data-cookieconsent="ignore"
        dangerouslySetInnerHTML={{ __html: CONSENT_SCRIPT_CONTENT }}
      />

      {/* 2. v1 anti-flicker + loader -- MUST precede the v2 bootstrap, see
          the order note at the top of this file */}
      <script
        id="opti-snippet-v1-inline"
        type="text/javascript"
        async
        data-cookieconsent="ignore"
        dangerouslySetInnerHTML={{ __html: V1_INLINE_SCRIPT_CONTENT }}
      />

      {/* 3. v2 bootstrap -- injects and later removes #__opti_af itself */}
      <script
        id="opti-snippet-v2-inline"
        dangerouslySetInnerHTML={{ __html: V2_INLINE_SCRIPT_CONTENT }}
      />

      {/* 4. first v2 async <script src> */}
      <script
        id="opti-snippet-async-1"
        itemProp="opti-snippet"
        async
        src={SCRIPT_SRC_1}
      />

      {/* 5. second v2 async <script src> */}
      <script
        id="opti-snippet-async-2"
        itemProp="opti-snippet"
        async
        src={SCRIPT_SRC_2}
      />
    </>
  );
}
