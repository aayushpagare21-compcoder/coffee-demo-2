# opti-demo-store

A fictional coffee-gear shop, built as a QA fixture for a third-party
DOM-manipulation script — the kind of A/B testing script that rewrites text,
swaps images, adds, removes and moves sections, and hides the body while it
works.

It is a real Next.js 15 App Router site: server-rendered HTML, real React
hydration, real images, real client-side navigation. Nothing is faked to make
the script's job easier.

```bash
npm install
npm run dev          # http://localhost:3000
```

## Where to paste the snippet

`components/opti-snippet.tsx`. It is the first child of `<head>` in
`app/layout.tsx`, renders on the server into the initial HTML, and deliberately
does **not** use `next/script`, which would reorder and defer the tags.

**No snippet is currently pasted — the component renders nothing, and no
`opti-*` tags appear in `<head>`.**

To paste one: return its tags from the component in shipped order, verbatim
(keep vendor attributes like `data-cookieconsent` or `nowprocket`, even when
they are inert in a Next app), give each tag a stable id, list those ids in
`SNIPPET_ORDER` in `scripts/pages.mjs`, and list any ids the snippet injects at
runtime (anti-flicker styles and the like) in `SNIPPET_CLIENT_INJECTED_IDS`.
`npm run verify` then asserts the head order, asserts the runtime-injected ids
stay out of the server HTML, and regenerates `docs/selectors.md`.

`public/opti-snippet-placeholder-*.js` are placeholder bundles for pointing a
snippet's remote script tags at something local — they do nothing but set a
global and log, so you can watch the load order in the network panel.

### Two things to know about `<head>` ordering

**React 19 reorders `<script async src>` tags.** It treats them as hoistable
resources and lifts them near the top of `<head>`; snippets that put async tags
in the tree need the `itemProp` attribute — React's documented opt-out from
resource hoisting — to keep them below their inline bootstrap. Inline scripts
are never hoisted. `npm run check:targets` asserts the pasted tags' order, so a
React upgrade that changes this behaviour fails loudly.

**Next.js still emits its own tags first.** The stylesheet `<link>`, image
preloads and the framework's own async chunks are flushed into the `<head>`
preamble before any head children, and nothing rendered from the React tree can
precede them. The snippet is the first thing in `<head>` that the application
controls.

## The pages

| route | what it is for |
| --- | --- |
| `/` | Scale. 3000+ DOM elements: 100 product cards, 20 testimonials, a 20-item accordion, an auto-rotating carousel and a countdown ticking every second. |
| `/gallery` | Images. Eager hero, art-directed `<picture>`, 12 lazy images, a CSS background image, and an image that mounts ~1s after hydration. |
| `/sections` | Section add / remove / move. Eight sibling `<section>` blocks, each a different colour, so a reorder is obvious at a glance. |
| `/slow` | Late render. Shell paints immediately, `#slow-content` mounts 1200 ms after hydration. |
| `/about` | The off-campaign page. No test targets — use it to confirm a scoped campaign does not fire. |

`docs/selectors.md` lists every stable id and class per page with its visible
text. **It is generated from the built HTML**, not written by hand, so it cannot
drift from the pages:

```bash
npm run verify        # build + acceptance checks + regenerate the selector docs
```

## What makes this hard for a script, on purpose

- **`#promo-countdown` re-renders every second** and **`.card-cta` labels live in
  React state.** Anything a variant writes into those subtrees is overwritten on
  the next render unless it reapplies. There are 100 separate hydration roots in
  the product grid, one per card button.
- **`#late-img` and `#slow-content` do not exist in the server HTML.** A variant
  that queries the DOM once on load will never find them; it needs a
  MutationObserver or a retry.
- **`#bg-hero` gets its photograph from a CSS class**, not an `src`, so it can
  only be replaced with a stylesheet rule.
- **`#art-picture` has two `<source media="(max-width: 768px)">` renditions.**
  Swapping only the fallback `<img>` changes nothing on a phone.
- **`#footer-home-hard` is a plain `<a href>`**, not `next/link`, so it forces a
  full document load — for bfcache and snippet re-execution tests. Every other
  link navigates client-side.
- **All 100 product titles and all 100 descriptions are unique**, so a CSS
  selector can be paired with a visible-text anchor without ambiguity.
- **Nothing is random and nothing depends on the clock at render time.** The
  same index always yields the same title, price and image seed, so screenshots
  taken before and after a variant are comparable.

## Deliberate omissions

No cookie banner, no analytics, and **no Content-Security-Policy header** — the
snippet must run with nothing in its way. A strict CSP is written out and
commented in `next.config.ts` for when you want to test under one.

Images come from seeded `picsum.photos` URLs so a given seed is always the same
photograph. All image URLs are built in `lib/images.ts`; change `IMAGE_HOST`
there to move onto local assets.

## Known interaction: hydration warnings from head injection

If you load this site in a browser that already has an A/B testing extension
installed, React logs:

> A tree hydrated but some attributes of the server rendered HTML didn't match
> the client properties.

That is the extension mutating `<head>` before React hydrates — typically
adding attributes to tags React owns, which is what the warning is about.

Snippets whose bootstrap injects tags into `<head>` before hydration
(anti-flicker styles, loader-injected CDN scripts) are safe on React 19, which
skips over *unexpected tags* in `<head>` and `<body>` while hydrating — a
documented behaviour added exactly for extension- and snippet-injected tags.
Attribute changes on React-owned tags still produce the warning.

The site itself produces no hydration warnings. Verify in a clean profile with
extensions disabled.

## Scripts

| command | what it does |
| --- | --- |
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm run check:targets` | asserts element counts, id uniqueness, late-mount behaviour and head order against the built HTML |
| `npm run docs:selectors` | regenerates `docs/selectors.md` from the built HTML |
| `npm run verify` | all three, in order |

`check:targets` and `docs:selectors` read `.next/server/app/*.html`, so run a
build first. Both are plain Node with no dependencies.

## Deploying

Zero config on Vercel. Import the repo, set the project root to
`opti-demo-store` if the repository root is a level above, and deploy — there
are no environment variables and no build-time secrets.
