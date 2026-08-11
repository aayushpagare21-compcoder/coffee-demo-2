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

`components/opti-snippet.tsx`. Four constants at the top of the file:

| constant | renders as |
| --- | --- |
| `STYLE_CONTENT` | inline `<style id="__opti_af">` |
| `INLINE_SCRIPT_CONTENT` | inline `<script id="opti-snippet-inline">` |
| `SCRIPT_SRC_1` | `<script async src id="opti-snippet-async-1">` |
| `SCRIPT_SRC_2` | `<script async src id="opti-snippet-async-2">` |

The component is the first child of `<head>` in `app/layout.tsx`, renders on the
server into the initial HTML, and deliberately does **not** use `next/script`,
which would reorder and defer the tags.

The style tag's id is load-bearing: the inline bootstrap removes the
anti-flicker rule by `document.getElementById('__opti_af')`, so renaming it
leaves the page blank.

The `nowprocket` and `data-no-minify="1"` attributes are carried over verbatim
from the snippet Optimeleon hands out. They do nothing in a Next app — they are
opt-out markers for WordPress optimisation plugins — but the fixture renders the
shipped snippet as-is, so they stay.

`public/opti-snippet-placeholder-*.js` are kept around for the case where you
want the async tags pointed at something local — they do nothing but set a
global and log, so you can watch the load order in the network panel.

### Two things to know about `<head>` ordering

**React 19 wanted to reorder these tags.** It treats `<script async src>` as a
hoistable resource and lifts it near the top of `<head>` — which would have put
both async scripts *before* the inline bootstrap script. The `itemProp`
attribute on those two tags is React's own documented opt-out from resource
hoisting, on both the server and the client renderer. It is why the four tags
come out in the order you wrote them.
`npm run check:targets` asserts that order, so a React upgrade that changes this
behaviour fails loudly.

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

That is the extension injecting its anti-flicker `<style>` into `<head>` before
React hydrates, which shifts the head children React is trying to match. It is
worth knowing because **a snippet that injects into `<head>` before hydration
will do the same thing to any Next.js site**. Injecting after hydration, or into
`<body>`, does not trip it.

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
