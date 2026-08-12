/*
 * Placeholder bundle for pointing a snippet's remote <script src> tag (or a
 * loader-injected CDN tag) at something local.
 *
 * It exists so that tag is a real tag making a real request: you can watch
 * its load order in the network panel before the real CDN URL is pasted in.
 * Unused while no snippet references it.
 */
window.__optiSnippetPlaceholder1 = { loadedAt: Date.now() };
console.debug("[opti-demo-store] placeholder async script 1 executed");
