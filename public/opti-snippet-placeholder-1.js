/*
 * Placeholder bundle for snippet variants that point a <script async src>
 * tag (or the loader's injected CDN tag) at something local.
 *
 * It exists so that tag is a real tag making a real request: you can watch
 * its load order in the network panel before the real CDN URL is pasted in.
 * The current v1 snippet ships its CDN URL inside INLINE_SCRIPT_CONTENT, so
 * this file is unused unless you point that URL here.
 */
window.__optiSnippetPlaceholder1 = { loadedAt: Date.now() };
console.debug("[opti-demo-store] placeholder async script 1 executed");
