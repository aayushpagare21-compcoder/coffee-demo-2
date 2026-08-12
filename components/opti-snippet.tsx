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
 *   1. inline <script> -- consent helper
 *   2. inline <script> -- anti-flicker + loader bootstrap
 *
 * Snippet v1 puts no <style> tag and no <script async src> tags in the tree:
 * the bootstrap injects the anti-flicker <style id="optimeleon-overlay"> at
 * runtime, and its loader stub injects the CDN bundle tag itself. Neither
 * appears in the server HTML.
 *
 * ==========================================================================
 * PASTE THE REAL VALUES INTO THE TWO CONSTANTS BELOW.
 * ==========================================================================
 */

/*
 * `type="text/javascript"` and `data-cookieconsent="ignore"` ride along on
 * the tags exactly as Optimeleon hands them out. `data-cookieconsent` is
 * Cookiebot's marker for scripts that must run regardless of consent state;
 * the `async` attribute on the second tag is inert (inline scripts cannot be
 * async) -- but the fixture is meant to render the shipped snippet
 * byte-for-byte, so they stay.
 */

/*
 * Consent helper. Exposes window.setOptiCookieConsent, which persists the
 * given consent object to localStorage under "opti_consent" for the bundle
 * to read.
 */
const CONSENT_SCRIPT_CONTENT = `window.setOptiCookieConsent = function(consent) {
    localStorage.setItem("opti_consent", JSON.stringify(consent));
  };`;

/*
 * Inline bootstrap. Runs synchronously, before <body> is parsed:
 *   - injects the anti-flicker rule -- <style id="optimeleon-overlay">,
 *     body{opacity:0} -- into <head>, so visitors never see the control
 *     paint before the bundle has applied its variant,
 *   - exposes window.rmfk to remove that style, and calls it after 2000ms
 *     as a failsafe in case the bundle is slow or never arrives,
 *   - stubs window.optimeleon (callMethod/queue) so calls made before the
 *     bundle lands are queued instead of thrown away,
 *   - injects <script async src=".../v1.main.js"> before the first <script>
 *     in the document,
 *   - queues optimeleon("init",true,true).
 *
 * Because the style and the CDN tag exist only in the browser,
 * `#optimeleon-overlay` must NOT appear in the server HTML -- `npm run
 * check:targets` asserts its absence. The pre-hydration injection is safe on
 * React 19, which skips unexpected tags in <head> while hydrating.
 */
const INLINE_SCRIPT_CONTENT = `!(function (h, i, e) {
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
 * NOTE on <head> ordering: earlier snippet variants put <script async src>
 * tags in the tree and needed React 19's `itemProp` opt-out to stop the
 * renderer hoisting them above the inline bootstrap. The v1 snippet renders
 * only inline scripts, which React never hoists, so no opt-out is needed;
 * the loader-injected CDN tag never passes through React at all.
 *
 * Next.js still flushes its own framework tags (the stylesheet <link>, image
 * preloads and the bundle's own async chunks) into the <head> preamble before
 * ANY head children. Nothing rendered from the React tree can precede them.
 * This block is the first thing in <head> that the application controls, and
 * the relative order of the two tags below is exact.
 */

export default function OptiSnippet() {
  return (
    <>
      {/* 1. consent helper */}
      <script
        id="opti-snippet-consent"
        type="text/javascript"
        data-cookieconsent="ignore"
        dangerouslySetInnerHTML={{ __html: CONSENT_SCRIPT_CONTENT }}
      />

      {/* 2. anti-flicker + loader bootstrap -- injects and later removes
          #optimeleon-overlay itself, and injects the CDN bundle tag */}
      <script
        id="opti-snippet-inline"
        type="text/javascript"
        async
        data-cookieconsent="ignore"
        dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT_CONTENT }}
      />
    </>
  );
}
