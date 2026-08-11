# Selector reference

Generated from the built HTML by `npm run docs:selectors`. Do not edit by hand — re-run it after changing a page and the tables follow.

## How to read this

- Every element worth targeting has an `id`. Repeated elements use a numbered series (`#card-1` … `#card-100`) plus stable inner classes, so `#card-42 .card-title` is a valid, specific selector.
- Ids are unique per page; the checker in `scripts/check-targets.mjs` fails the build if that stops being true.
- All 100 product titles and all 100 product descriptions differ from each other, so a selector can be paired with a visible-text anchor without ambiguity.
- Utility classes from Tailwind are not listed. Only the semantic classes authored for QA appear here, and every one of them is verified to exist in the rendered HTML.
- `_(no text)_` means the element renders no visible text of its own — typically an image, a wrapper or an icon.

## The snippet mount point

`components/opti-snippet.tsx` renders as the first child of `<head>` in `app/layout.tsx`, in this exact order:

| order | id | tag | source |
| --- | --- | --- | --- |
| 1 | `#__opti_af` | `<style>` | `STYLE_CONTENT` |
| 2 | `#opti-snippet-inline` | `<script>` | `INLINE_SCRIPT_CONTENT` |
| 3 | `#opti-snippet-async-1` | `<script async src>` | `SCRIPT_SRC_1` |
| 4 | `#opti-snippet-async-2` | `<script async src>` | `SCRIPT_SRC_2` |

Paste real values into the four constants at the top of that file. The order above is asserted by `npm run check:targets`.

One caveat worth knowing: Next.js flushes its own framework tags — the stylesheet `<link>`, image preloads and the bundle's async chunks — into the `<head>` preamble ahead of any head children. Nothing rendered from the React tree can precede them. The snippet is the first thing in `<head>` that the application controls, and the relative order of its own four tags is exact.

## Global — header and footer, present on every page

| id | tag | visible text |
| --- | --- | --- |
| `#__opti_af` | `<style>` | _(no text)_ |
| `#opti-snippet-inline` | `<script>` | _(no text)_ |
| `#opti-snippet-async-1` | `<script>` | _(no text)_ |
| `#opti-snippet-async-2` | `<script>` | _(no text)_ |
| `#site-header` | `<header>` | opti-demo-store Home Gallery Sections Slow About Basket 0 See the plans |
| `#nav-logo` | `<a>` | opti-demo-store |
| `#site-nav` | `<nav>` | Home Gallery Sections Slow About |
| `#site-nav-list` | `<ul>` | Home Gallery Sections Slow About |
| `#nav-home` | `<a>` | Home |
| `#nav-gallery` | `<a>` | Gallery |
| `#nav-sections` | `<a>` | Sections |
| `#nav-slow` | `<a>` | Slow |
| `#nav-about` | `<a>` | About |
| `#header-cart-button` | `<button>` | Basket 0 |
| `#header-cart-count` | `<span>` | 0 |
| `#header-cta` | `<a>` | See the plans |
| `#site-main` | `<main>` | Machined in Portland since 2014 Coffee gear built to be repaired, not replaced One hundre… |
| `#site-footer` | `<footer>` | About the workshop opti-demo-store machines coffee gear in Portland and stocks every serv… |
| `#footer-about` | `<div>` | About the workshop opti-demo-store machines coffee gear in Portland and stocks every serv… |
| `#footer-about-title` | `<h2>` | About the workshop |
| `#footer-about-copy` | `<p>` | opti-demo-store machines coffee gear in Portland and stocks every serviceable part for te… |
| `#footer-links` | `<div>` | Where to go next Back to the shop (full page load) Workshop gallery (full page load) |
| `#footer-links-title` | `<h2>` | Where to go next |
| `#footer-link-list` | `<ul>` | Back to the shop (full page load) Workshop gallery (full page load) |
| `#footer-home-hard` | `<a>` | Back to the shop (full page load) |
| `#footer-gallery-hard` | `<a>` | Workshop gallery (full page load) |
| `#footer-meta` | `<div>` | QA fixture This site is a test fixture. Nothing here is for sale and no order is ever pla… |
| `#footer-meta-title` | `<h2>` | QA fixture |
| `#footer-meta-copy` | `<p>` | This site is a test fixture. Nothing here is for sale and no order is ever placed. |
| `#node-counter` | `<p>` | DOM elements on this page: — recount |
| `#node-count` | `<span>` | — |
| `#node-count-refresh` | `<button>` | recount |

Nav links carry `.nav-link`, and the active one also carries `.is-active`.
`#footer-home-hard` and `#footer-gallery-hard` are plain `<a href>` elements, not `next/link`: they force a full document load, which is what you want for bfcache and snippet re-execution tests. Every other link on the site navigates client-side.

## `/` — The mega page

The scale page. One hundred product cards, twenty testimonials, a twenty-item accordion, an auto-rotating carousel and a countdown that ticks every second. Every product title and every product description on this page is unique, so a title is safe to use as a text anchor.

**3135 elements** in the server HTML, **326 page-specific ids** plus the 32 global ids below.

### Unique ids

| id | tag | visible text |
| --- | --- | --- |
| `#hero` | `<section>` | Machined in Portland since 2014 Coffee gear built to be repaired, not replaced One hundre… |
| `#hero-copy` | `<div>` | Machined in Portland since 2014 Coffee gear built to be repaired, not replaced One hundre… |
| `#hero-eyebrow` | `<p>` | Machined in Portland since 2014 |
| `#hero-title` | `<h1>` | Coffee gear built to be repaired, not replaced |
| `#hero-subtitle` | `<p>` | One hundred pieces of brewing equipment, every serviceable part stocked for ten years, an… |
| `#hero-actions` | `<div>` | Shop the bench series Read the common questions |
| `#hero-cta-primary` | `<a>` | Shop the bench series |
| `#hero-cta-secondary` | `<a>` | Read the common questions |
| `#hero-proof` | `<ul>` | Free returns for sixty days Two-year workshop warranty Parts stocked for a decade |
| `#hero-media` | `<div>` | _(no text)_ |
| `#hero-img` | `<img>` | alt: A pour-over dripper mid-bloom on a workshop bench |
| `#promo` | `<section>` | Workshop seconds sale ends in 02 hours : 00 minutes : 00 seconds Use code BENCH15 for fif… |
| `#promo-countdown` | `<div>` | Workshop seconds sale ends in 02 hours : 00 minutes : 00 seconds Use code BENCH15 for fif… |
| `#promo-countdown-label` | `<p>` | Workshop seconds sale ends in |
| `#promo-countdown-clock` | `<div>` | 02 hours : 00 minutes : 00 seconds |
| `#promo-countdown-hours` | `<span>` | 02 hours |
| `#promo-countdown-minutes` | `<span>` | 00 minutes |
| `#promo-countdown-seconds` | `<span>` | 00 seconds |
| `#promo-countdown-note` | `<p>` | Use code BENCH15 for fifteen percent off any grinder |
| `#announcements` | `<section>` | What the workshop is shipping this month The Bench Series lands this week Nine new pieces… |
| `#announcements-title` | `<h2>` | What the workshop is shipping this month |
| `#hero-carousel` | `<section>` | The Bench Series lands this week Nine new pieces machined in Portland, built to be repair… |
| `#hero-carousel-track` | `<div>` | The Bench Series lands this week Nine new pieces machined in Portland, built to be repair… |
| `#hero-carousel-dots` | `<div>` | _(no text)_ |
| `#stats` | `<section>` | Pieces in the catalogue 100 Years of parts stocked 10 Countries served 38 Service partner… |
| `#products` | `<section>` | The full bench catalogue Every piece we machine, in the order it was introduced. Prices i… |
| `#products-title` | `<h2>` | The full bench catalogue |
| `#products-subtitle` | `<p>` | Every piece we machine, in the order it was introduced. Prices include the printed dialli… |
| `#product-grid` | `<div>` | Best Seller Basalt Origin Pour-Over Dripper Machined from a single billet of anodised alu… |
| `#testimonials-section` | `<section>` | Twenty people who use this gear every day We replaced three drippers with one and our mor… |
| `#testimonials-title` | `<h2>` | Twenty people who use this gear every day |
| `#testimonial-grid` | `<div>` | We replaced three drippers with one and our morning queue got twenty seconds shorter. Mar… |
| `#faq-section` | `<section>` | Everything customers ask before they buy Twenty answers, written by the people who machin… |
| `#faq-title` | `<h2>` | Everything customers ask before they buy |
| `#faq-subtitle` | `<p>` | Twenty answers, written by the people who machine the parts. |
| `#faq-list` | `<div>` | How quickly do orders leave the workshop? − In-stock items are picked and packed the same… |

### Series `#card-{n}` (n = 1–100)

Inner classes: `.card-media`, `.card-img`, `.card-badge`, `.card-body`, `.card-title`, `.card-desc`, `.card-tags`, `.card-tag`, `.card-rating`, `.card-stars`, `.card-star`, `.is-filled`, `.card-rating-value`, `.card-rating-count`, `.card-meta`, `.card-price`, `.card-price-was`, `.card-stock`, `.card-cta`, `.card-cta-label`

| id | anchor text |
| --- | --- |
| `#card-1` | Basalt Origin Pour-Over Dripper |
| `#card-2` | Cinder Atlas Pour-Over Dripper |
| `#card-3` | Meridian Pro Pour-Over Dripper |
| `#card-4` | Nordhavn Reserve Pour-Over Dripper |
| `#card-5` | Auric Field Pour-Over Dripper |
| `#card-6` | Tidewater Compact Pour-Over Dripper |
| `#card-7` | Kestrel Lumen Pour-Over Dripper |
| `#card-8` | Foxglove Studio Pour-Over Dripper |
| `#card-9` | Marlowe Signature Pour-Over Dripper |
| `#card-10` | Vantage Heritage Pour-Over Dripper |
| `#card-11` | Basalt Origin Conical Burr Grinder |
| `#card-12` | Cinder Atlas Conical Burr Grinder |
| `#card-13` | Meridian Pro Conical Burr Grinder |
| `#card-14` | Nordhavn Reserve Conical Burr Grinder |
| `#card-15` | Auric Field Conical Burr Grinder |
| `#card-16` | Tidewater Compact Conical Burr Grinder |
| `#card-17` | Kestrel Lumen Conical Burr Grinder |
| `#card-18` | Foxglove Studio Conical Burr Grinder |
| `#card-19` | Marlowe Signature Conical Burr Grinder |
| `#card-20` | Vantage Heritage Conical Burr Grinder |
| `#card-21` | Basalt Origin Gooseneck Kettle |
| `#card-22` | Cinder Atlas Gooseneck Kettle |
| `#card-23` | Meridian Pro Gooseneck Kettle |
| `#card-24` | Nordhavn Reserve Gooseneck Kettle |
| `#card-25` | Auric Field Gooseneck Kettle |
| `#card-26` | Tidewater Compact Gooseneck Kettle |
| `#card-27` | Kestrel Lumen Gooseneck Kettle |
| `#card-28` | Foxglove Studio Gooseneck Kettle |
| `#card-29` | Marlowe Signature Gooseneck Kettle |
| `#card-30` | Vantage Heritage Gooseneck Kettle |
| `#card-31` | Basalt Origin Espresso Tamper |
| `#card-32` | Cinder Atlas Espresso Tamper |
| `#card-33` | Meridian Pro Espresso Tamper |
| `#card-34` | Nordhavn Reserve Espresso Tamper |
| `#card-35` | Auric Field Espresso Tamper |
| `#card-36` | Tidewater Compact Espresso Tamper |
| `#card-37` | Kestrel Lumen Espresso Tamper |
| `#card-38` | Foxglove Studio Espresso Tamper |
| `#card-39` | Marlowe Signature Espresso Tamper |
| `#card-40` | Vantage Heritage Espresso Tamper |
| `#card-41` | Basalt Origin French Press |
| `#card-42` | Cinder Atlas French Press |
| `#card-43` | Meridian Pro French Press |
| `#card-44` | Nordhavn Reserve French Press |
| `#card-45` | Auric Field French Press |
| `#card-46` | Tidewater Compact French Press |
| `#card-47` | Kestrel Lumen French Press |
| `#card-48` | Foxglove Studio French Press |
| `#card-49` | Marlowe Signature French Press |
| `#card-50` | Vantage Heritage French Press |
| `#card-51` | Basalt Origin Travel Press Kit |
| `#card-52` | Cinder Atlas Travel Press Kit |
| `#card-53` | Meridian Pro Travel Press Kit |
| `#card-54` | Nordhavn Reserve Travel Press Kit |
| `#card-55` | Auric Field Travel Press Kit |
| `#card-56` | Tidewater Compact Travel Press Kit |
| `#card-57` | Kestrel Lumen Travel Press Kit |
| `#card-58` | Foxglove Studio Travel Press Kit |
| `#card-59` | Marlowe Signature Travel Press Kit |
| `#card-60` | Vantage Heritage Travel Press Kit |
| `#card-61` | Basalt Origin Milk Frothing Pitcher |
| `#card-62` | Cinder Atlas Milk Frothing Pitcher |
| `#card-63` | Meridian Pro Milk Frothing Pitcher |
| `#card-64` | Nordhavn Reserve Milk Frothing Pitcher |
| `#card-65` | Auric Field Milk Frothing Pitcher |
| `#card-66` | Tidewater Compact Milk Frothing Pitcher |
| `#card-67` | Kestrel Lumen Milk Frothing Pitcher |
| `#card-68` | Foxglove Studio Milk Frothing Pitcher |
| `#card-69` | Marlowe Signature Milk Frothing Pitcher |
| `#card-70` | Vantage Heritage Milk Frothing Pitcher |
| `#card-71` | Basalt Origin Brew Scale |
| `#card-72` | Cinder Atlas Brew Scale |
| `#card-73` | Meridian Pro Brew Scale |
| `#card-74` | Nordhavn Reserve Brew Scale |
| `#card-75` | Auric Field Brew Scale |
| `#card-76` | Tidewater Compact Brew Scale |
| `#card-77` | Kestrel Lumen Brew Scale |
| `#card-78` | Foxglove Studio Brew Scale |
| `#card-79` | Marlowe Signature Brew Scale |
| `#card-80` | Vantage Heritage Brew Scale |
| `#card-81` | Basalt Origin Cold Brew Carafe |
| `#card-82` | Cinder Atlas Cold Brew Carafe |
| `#card-83` | Meridian Pro Cold Brew Carafe |
| `#card-84` | Nordhavn Reserve Cold Brew Carafe |
| `#card-85` | Auric Field Cold Brew Carafe |
| `#card-86` | Tidewater Compact Cold Brew Carafe |
| `#card-87` | Kestrel Lumen Cold Brew Carafe |
| `#card-88` | Foxglove Studio Cold Brew Carafe |
| `#card-89` | Marlowe Signature Cold Brew Carafe |
| `#card-90` | Vantage Heritage Cold Brew Carafe |
| `#card-91` | Basalt Origin Bottomless Portafilter |
| `#card-92` | Cinder Atlas Bottomless Portafilter |
| `#card-93` | Meridian Pro Bottomless Portafilter |
| `#card-94` | Nordhavn Reserve Bottomless Portafilter |
| `#card-95` | Auric Field Bottomless Portafilter |
| `#card-96` | Tidewater Compact Bottomless Portafilter |
| `#card-97` | Kestrel Lumen Bottomless Portafilter |
| `#card-98` | Foxglove Studio Bottomless Portafilter |
| `#card-99` | Marlowe Signature Bottomless Portafilter |
| `#card-100` | Vantage Heritage Bottomless Portafilter |

### Series `#card-{n}-cta` (n = 1–100)

Inner classes: `.card-cta-label`

| id | anchor text |
| --- | --- |
| `#card-1-cta` | Add to basket |
| `#card-2-cta` | Add to basket |
| `#card-3-cta` | Add to basket |
| `#card-4-cta` | Add to basket |
| `#card-5-cta` | Add to basket |
| `#card-6-cta` | Add to basket |
| `#card-7-cta` | Add to basket |
| `#card-8-cta` | Add to basket |
| `#card-9-cta` | Add to basket |
| `#card-10-cta` | Add to basket |
| `#card-11-cta` | Add to basket |
| `#card-12-cta` | Add to basket |
| `#card-13-cta` | Add to basket |
| `#card-14-cta` | Add to basket |
| `#card-15-cta` | Add to basket |
| `#card-16-cta` | Add to basket |
| `#card-17-cta` | Add to basket |
| `#card-18-cta` | Add to basket |
| `#card-19-cta` | Add to basket |
| `#card-20-cta` | Add to basket |
| `#card-21-cta` | Add to basket |
| `#card-22-cta` | Add to basket |
| `#card-23-cta` | Add to basket |
| `#card-24-cta` | Add to basket |
| `#card-25-cta` | Add to basket |
| `#card-26-cta` | Add to basket |
| `#card-27-cta` | Add to basket |
| `#card-28-cta` | Add to basket |
| `#card-29-cta` | Add to basket |
| `#card-30-cta` | Add to basket |
| `#card-31-cta` | Add to basket |
| `#card-32-cta` | Add to basket |
| `#card-33-cta` | Add to basket |
| `#card-34-cta` | Add to basket |
| `#card-35-cta` | Add to basket |
| `#card-36-cta` | Add to basket |
| `#card-37-cta` | Add to basket |
| `#card-38-cta` | Add to basket |
| `#card-39-cta` | Add to basket |
| `#card-40-cta` | Add to basket |
| `#card-41-cta` | Add to basket |
| `#card-42-cta` | Add to basket |
| `#card-43-cta` | Add to basket |
| `#card-44-cta` | Add to basket |
| `#card-45-cta` | Add to basket |
| `#card-46-cta` | Add to basket |
| `#card-47-cta` | Add to basket |
| `#card-48-cta` | Add to basket |
| `#card-49-cta` | Add to basket |
| `#card-50-cta` | Add to basket |
| `#card-51-cta` | Add to basket |
| `#card-52-cta` | Add to basket |
| `#card-53-cta` | Add to basket |
| `#card-54-cta` | Add to basket |
| `#card-55-cta` | Add to basket |
| `#card-56-cta` | Add to basket |
| `#card-57-cta` | Add to basket |
| `#card-58-cta` | Add to basket |
| `#card-59-cta` | Add to basket |
| `#card-60-cta` | Add to basket |
| `#card-61-cta` | Add to basket |
| `#card-62-cta` | Add to basket |
| `#card-63-cta` | Add to basket |
| `#card-64-cta` | Add to basket |
| `#card-65-cta` | Add to basket |
| `#card-66-cta` | Add to basket |
| `#card-67-cta` | Add to basket |
| `#card-68-cta` | Add to basket |
| `#card-69-cta` | Add to basket |
| `#card-70-cta` | Add to basket |
| `#card-71-cta` | Add to basket |
| `#card-72-cta` | Add to basket |
| `#card-73-cta` | Add to basket |
| `#card-74-cta` | Add to basket |
| `#card-75-cta` | Add to basket |
| `#card-76-cta` | Add to basket |
| `#card-77-cta` | Add to basket |
| `#card-78-cta` | Add to basket |
| `#card-79-cta` | Add to basket |
| `#card-80-cta` | Add to basket |
| `#card-81-cta` | Add to basket |
| `#card-82-cta` | Add to basket |
| `#card-83-cta` | Add to basket |
| `#card-84-cta` | Add to basket |
| `#card-85-cta` | Add to basket |
| `#card-86-cta` | Add to basket |
| `#card-87-cta` | Add to basket |
| `#card-88-cta` | Add to basket |
| `#card-89-cta` | Add to basket |
| `#card-90-cta` | Add to basket |
| `#card-91-cta` | Add to basket |
| `#card-92-cta` | Add to basket |
| `#card-93-cta` | Add to basket |
| `#card-94-cta` | Add to basket |
| `#card-95-cta` | Add to basket |
| `#card-96-cta` | Add to basket |
| `#card-97-cta` | Add to basket |
| `#card-98-cta` | Add to basket |
| `#card-99-cta` | Add to basket |
| `#card-100-cta` | Add to basket |

### Series `#faq-{n}` (n = 1–20)

Inner classes: `.faq-heading`, `.faq-question`, `.faq-question-text`, `.faq-marker`, `.faq-answer`

| id | anchor text |
| --- | --- |
| `#faq-1` | How quickly do orders leave the workshop? |
| `#faq-2` | Which countries can you ship to? |
| `#faq-3` | Can I return a grinder after I have run beans through it? |
| `#faq-4` | Do you offer a trade or wholesale account? |
| `#faq-5` | What does the two-year warranty actually cover? |
| `#faq-6` | Are replacement parts sold separately? |
| `#faq-7` | How do I choose between a manual and an electric grinder? |
| `#faq-8` | Is the glassware safe on an induction hob? |
| `#faq-9` | Do your kettles hold temperature or only reach it? |
| `#faq-10` | Can I buy a gift card? |
| `#faq-11` | What is included in a subscription? |
| `#faq-12` | How do I descale a kettle without wrecking the coating? |
| `#faq-13` | Do you run repair services out of warranty? |
| `#faq-14` | Are the scales accurate enough for competition use? |
| `#faq-15` | What is your packaging made from? |
| `#faq-16` | Can I collect an order in person? |
| `#faq-17` | Do you price match? |
| `#faq-18` | How long do the burrs last before they need replacing? |
| `#faq-19` | Is there a student or hospitality discount? |
| `#faq-20` | Who do I contact if something arrives damaged? |

### Series `#faq-{n}-answer` (n = 1–20)

| id | anchor text |
| --- | --- |
| `#faq-1-answer` | In-stock items are picked and packed the same working day if the order lands before 2pm P… |
| `#faq-2-answer` | We ship to 38 countries. Duties are prepaid for the EU, the UK, Canada and Australia, so… |
| `#faq-3-answer` | Yes. We would rather you tested it properly. Run up to two kilograms through a grinder an… |
| `#faq-4-answer` | We do, from five units a month. Trade accounts get net-30 terms, a dedicated technician a… |
| `#faq-5-answer` | Anything that fails through manufacture or normal use: motors, bearings, seals, coatings… |
| `#faq-6-answer` | Every serviceable part is listed individually, down to the single silicone washer. We com… |
| `#faq-7-answer` | If you brew fewer than four cups a day and value silence, go manual. Past four cups a day… |
| `#faq-8-answer` | The borosilicate carafes are not. The stainless kettles are, and every induction-safe ite… |
| `#faq-9-answer` | The variable-temperature models hold a set point for sixty minutes to within one degree.… |
| `#faq-10-answer` | Yes, in any amount from twenty-five upward. They never expire and they can be spent acros… |
| `#faq-11-answer` | A rotating single-origin every two or four weeks, a printed brew guide for that lot, and… |
| `#faq-12-answer` | Citric acid at fifteen grams per litre, left cold for an hour, then rinsed three times. N… |
| `#faq-13-answer` | We do, at a flat bench fee plus parts. Most repairs are turned around within five working… |
| `#faq-14-answer` | Two of our scales are certified to 0.1 gram and are on the approved list for regional bre… |
| `#faq-15-answer` | Moulded paper pulp, uncoated board and paper tape. There is no plastic in the box, includ… |
| `#faq-16-answer` | Yes, from the Portland workshop between 9am and 4pm on weekdays. Choose collection at che… |
| `#faq-17-answer` | We match any authorised stockist on identical stock for fourteen days after purchase. Sen… |
| `#faq-18-answer` | Between 800 and 1200 kilograms of coffee depending on the roast level. We sell a burr-wea… |
| `#faq-19-answer` | There is fifteen percent off for anyone with a valid student card or a hospitality paysli… |
| `#faq-20-answer` | Reply to your order confirmation with a photograph. A replacement ships the same day and… |

### Series `#faq-{n}-question` (n = 1–20)

Inner classes: `.faq-question-text`, `.faq-marker`

| id | anchor text |
| --- | --- |
| `#faq-1-question` | How quickly do orders leave the workshop? |
| `#faq-2-question` | Which countries can you ship to? |
| `#faq-3-question` | Can I return a grinder after I have run beans through it? |
| `#faq-4-question` | Do you offer a trade or wholesale account? |
| `#faq-5-question` | What does the two-year warranty actually cover? |
| `#faq-6-question` | Are replacement parts sold separately? |
| `#faq-7-question` | How do I choose between a manual and an electric grinder? |
| `#faq-8-question` | Is the glassware safe on an induction hob? |
| `#faq-9-question` | Do your kettles hold temperature or only reach it? |
| `#faq-10-question` | Can I buy a gift card? |
| `#faq-11-question` | What is included in a subscription? |
| `#faq-12-question` | How do I descale a kettle without wrecking the coating? |
| `#faq-13-question` | Do you run repair services out of warranty? |
| `#faq-14-question` | Are the scales accurate enough for competition use? |
| `#faq-15-question` | What is your packaging made from? |
| `#faq-16-question` | Can I collect an order in person? |
| `#faq-17-question` | Do you price match? |
| `#faq-18-question` | How long do the burrs last before they need replacing? |
| `#faq-19-question` | Is there a student or hospitality discount? |
| `#faq-20-question` | Who do I contact if something arrives damaged? |

### Series `#hero-carousel-dot-{n}` (n = 1–3)

| id | anchor text |
| --- | --- |
| `#hero-carousel-dot-1` | _(no text)_ |
| `#hero-carousel-dot-2` | _(no text)_ |
| `#hero-carousel-dot-3` | _(no text)_ |

### Series `#hero-slide-{n}` (n = 1–3)

Inner classes: `.carousel-img`, `.carousel-caption`, `.carousel-title`, `.carousel-copy`

| id | anchor text |
| --- | --- |
| `#hero-slide-1` | The Bench Series lands this week Nine new pieces machined in Portland, built to be repair… |
| `#hero-slide-2` | Grinders that hold their setting Click-stopped burrs that stay where you left them, servi… |
| `#hero-slide-3` | Free dialling card in every order Ten guided brews that get you from unboxing to a repeat… |

### Series `#stat-{n}` (n = 1–4)

Inner classes: `.stat-label`, `.stat-value`

| id | anchor text |
| --- | --- |
| `#stat-1` | Pieces in the catalogue |
| `#stat-2` | Years of parts stocked |
| `#stat-3` | Countries served |
| `#stat-4` | Service partners |

### Series `#testimonial-{n}` (n = 1–20)

Inner classes: `.testimonial-quote`, `.testimonial-footer`, `.testimonial-avatar`, `.testimonial-person`, `.testimonial-author`, `.testimonial-role`

| id | anchor text |
| --- | --- |
| `#testimonial-1` | We replaced three drippers with one and our morning queue got twenty seconds shorter. |
| `#testimonial-2` | The grinder held its setting through an entire festival weekend without a single recalibr… |
| `#testimonial-3` | I have dropped this kettle twice on a tile floor and it still pours dead straight. |
| `#testimonial-4` | Our training time for new staff halved once every station had the same tamper. |
| `#testimonial-5` | The scale reads faster than I can pour, which is the first time I have been able to say t… |
| `#testimonial-6` | Six months of daily service and the seals have not weeped once. |
| `#testimonial-7` | It is the only travel press that has survived a full season of trail work. |
| `#testimonial-8` | Latte art stopped being a coin flip the week this pitcher arrived. |
| `#testimonial-9` | Customers ask about the carafe more often than they ask about the coffee in it. |
| `#testimonial-10` | The bottomless basket showed me a channelling problem I had been ignoring for a year. |
| `#testimonial-11` | Support shipped a replacement gasket before I had finished describing the fault. |
| `#testimonial-12` | We run four of these on the same bench and they still match cup for cup. |
| `#testimonial-13` | Cleaning went from a nightly chore to something I do while the till closes. |
| `#testimonial-14` | The dialling card in the box got my partner brewing properly in one afternoon. |
| `#testimonial-15` | I bought one for the office and three people bought their own within a month. |
| `#testimonial-16` | It is the quietest grinder I have used that still finishes a dose in under fifteen second… |
| `#testimonial-17` | Nothing about it has loosened, rattled or discoloured in two years of abuse. |
| `#testimonial-18` | The packaging composted in our garden bin, which nobody on the team expected. |
| `#testimonial-19` | Our wholesale accounts started asking where we sourced the kit from. |
| `#testimonial-20` | Best money I have spent on coffee gear, and I have spent a genuinely silly amount. |

### Stable classes on this page

| class | count | example text |
| --- | --- | --- |
| `.product-card` | 100 | Best Seller Basalt Origin Pour-Over Dripper Machined from a single bi… |
| `.card-media` | 100 | Best Seller |
| `.card-img` | 100 | _(no text)_ |
| `.card-badge` | 100 | Best Seller |
| `.card-body` | 100 | Basalt Origin Pour-Over Dripper Machined from a single billet of anod… |
| `.card-title` | 100 | Basalt Origin Pour-Over Dripper |
| `.card-desc` | 100 | Machined from a single billet of anodised aluminium, it holds a stead… |
| `.card-tags` | 100 | Ceramic Stainless |
| `.card-tag` | 200 | Ceramic |
| `.card-rating` | 100 | ★ ★ ★ ★ ★ 3.6 (12 reviews) |
| `.card-stars` | 100 | ★ ★ ★ ★ ★ |
| `.card-star` | 500 | ★ |
| `.is-filled` | 441 | ★ |
| `.card-rating-value` | 100 | 3.6 |
| `.card-rating-count` | 100 | (12 reviews) |
| `.card-meta` | 100 | $19.00 $24.32 In stock - ships today |
| `.card-price` | 100 | $19.00 |
| `.card-price-was` | 100 | $24.32 |
| `.card-stock` | 100 | In stock - ships today |
| `.card-cta` | 100 | Add to basket |
| `.card-cta-label` | 100 | Add to basket |
| `.is-added` | 0 — client only | _(no text)_ |
| `.carousel-slide` | 3 | The Bench Series lands this week Nine new pieces machined in Portland… |
| `.carousel-img` | 3 | _(no text)_ |
| `.carousel-caption` | 3 | The Bench Series lands this week Nine new pieces machined in Portland… |
| `.carousel-title` | 3 | The Bench Series lands this week |
| `.carousel-copy` | 3 | Nine new pieces machined in Portland, built to be repaired rather tha… |
| `.carousel-dot` | 3 | _(no text)_ |
| `.countdown-unit` | 3 | 02 hours |
| `.countdown-value` | 3 | 02 |
| `.countdown-label` | 3 | hours |
| `.countdown-sep` | 2 | : |
| `.testimonial-card` | 20 | We replaced three drippers with one and our morning queue got twenty… |
| `.testimonial-quote` | 20 | We replaced three drippers with one and our morning queue got twenty… |
| `.testimonial-footer` | 20 | Marta Delacroix Head Barista, Ninth Street Roasters |
| `.testimonial-avatar` | 20 | _(no text)_ |
| `.testimonial-person` | 20 | Marta Delacroix Head Barista, Ninth Street Roasters |
| `.testimonial-author` | 20 | Marta Delacroix |
| `.testimonial-role` | 20 | Head Barista, Ninth Street Roasters |
| `.faq-item` | 20 | How quickly do orders leave the workshop? − In-stock items are picked… |
| `.faq-heading` | 20 | How quickly do orders leave the workshop? − |
| `.faq-question` | 20 | How quickly do orders leave the workshop? − |
| `.faq-question-text` | 20 | How quickly do orders leave the workshop? |
| `.faq-marker` | 20 | − |
| `.faq-answer` | 20 | In-stock items are picked and packed the same working day if the orde… |
| `.is-open` | 1 | How quickly do orders leave the workshop? − In-stock items are picked… |
| `.hero-proof-item` | 3 | Free returns for sixty days |
| `.stat-item` | 4 | Pieces in the catalogue 100 |
| `.stat-label` | 4 | Pieces in the catalogue |
| `.stat-value` | 4 | 100 |

## `/gallery` — Image testing

Image handling. Every image is a plain `<img>` or `<picture>` — never `next/image` — so `src` and `srcset` are exactly as authored and a rewrite is visible in the attribute. Covers an eager hero, an art-directed `<picture>`, twelve lazy images, a CSS background image and an image that mounts late.

**133 elements** in the server HTML, **45 page-specific ids** plus the 32 global ids below.

### Unique ids

| id | tag | visible text |
| --- | --- | --- |
| `#gallery-hero` | `<section>` | Inside the Portland workshop Photographs from the bench, the anodising line and the Frida… |
| `#gallery-title` | `<h1>` | Inside the Portland workshop |
| `#gallery-intro` | `<p>` | Photographs from the bench, the anodising line and the Friday cupping table. Every image… |
| `#gallery-hero-img` | `<img>` | alt: Wide view of the workshop floor at first light |
| `#art-direction` | `<section>` | The same press, framed two ways Below 768 pixels the crop tightens to the plunger. A vari… |
| `#art-direction-title` | `<h2>` | The same press, framed two ways |
| `#art-direction-copy` | `<p>` | Below 768 pixels the crop tightens to the plunger. A variant that swaps only the fallback… |
| `#art-picture` | `<picture>` | _(no text)_ |
| `#art-source-mobile-webp` | `<source>` | srcset: https://picsum.photos/seed/ods-art-mobile/800/1000.webp |
| `#art-source-mobile` | `<source>` | srcset: https://picsum.photos/seed/ods-art-mobile/800/1000 |
| `#art-img` | `<img>` | alt: A French press photographed on a steel bench |
| `#lazy-grid-section` | `<section>` | Twelve frames from a working week Rough billet before the first cut Burr set inspected un… |
| `#lazy-grid-title` | `<h2>` | Twelve frames from a working week |
| `#lazy-grid` | `<div>` | Rough billet before the first cut Burr set inspected under the loupe Kettle spouts drying… |
| `#bg-hero` | `<section>` | No image tag on this one The photograph behind this panel comes from the .bg-hero-image c… |
| `#bg-hero-title` | `<h2>` | No image tag on this one |
| `#bg-hero-copy` | `<p>` | The photograph behind this panel comes from the .bg-hero-image class in globals.css, so i… |
| `#late-section` | `<section>` | The photograph that arrives late This block is empty in the server HTML and fills in one… |
| `#late-section-title` | `<h2>` | The photograph that arrives late |
| `#late-section-copy` | `<p>` | This block is empty in the server HTML and fills in one second after React hydrates. |
| `#late-img-placeholder` | `<div>` | Loading the late-mounting photograph… |

### Series `#lazy-card-{n}` (n = 1–12)

Inner classes: `.lazy-img`, `.lazy-caption`

| id | anchor text |
| --- | --- |
| `#lazy-card-1` | Rough billet before the first cut |
| `#lazy-card-2` | Burr set inspected under the loupe |
| `#lazy-card-3` | Kettle spouts drying after anodising |
| `#lazy-card-4` | The tamper collar jig in mid-cycle |
| `#lazy-card-5` | Filter mesh wound by hand |
| `#lazy-card-6` | Powder coat curing at 180 degrees |
| `#lazy-card-7` | Walnut handles waiting for their second oil |
| `#lazy-card-8` | Bench test rig running an overnight cycle |
| `#lazy-card-9` | Carafes packed in moulded paper pulp |
| `#lazy-card-10` | Portafilter baskets sorted by tolerance |
| `#lazy-card-11` | The Friday morning cupping table |
| `#lazy-card-12` | Last light over the Portland workshop |

### Series `#lazy-img-{n}` (n = 1–12)

| id | anchor text |
| --- | --- |
| `#lazy-img-1` | alt: Rough billet before the first cut |
| `#lazy-img-2` | alt: Burr set inspected under the loupe |
| `#lazy-img-3` | alt: Kettle spouts drying after anodising |
| `#lazy-img-4` | alt: The tamper collar jig in mid-cycle |
| `#lazy-img-5` | alt: Filter mesh wound by hand |
| `#lazy-img-6` | alt: Powder coat curing at 180 degrees |
| `#lazy-img-7` | alt: Walnut handles waiting for their second oil |
| `#lazy-img-8` | alt: Bench test rig running an overnight cycle |
| `#lazy-img-9` | alt: Carafes packed in moulded paper pulp |
| `#lazy-img-10` | alt: Portafilter baskets sorted by tolerance |
| `#lazy-img-11` | alt: The Friday morning cupping table |
| `#lazy-img-12` | alt: Last light over the Portland workshop |

### Stable classes on this page

| class | count | example text |
| --- | --- | --- |
| `.lazy-card` | 12 | Rough billet before the first cut |
| `.lazy-img` | 12 | _(no text)_ |
| `.lazy-caption` | 12 | Rough billet before the first cut |
| `.bg-hero-image` | 1 | No image tag on this one The photograph behind this panel comes from… |

### Ids that appear only after mount

`#late-img` is mounted by a client component roughly one second after hydration. A variant that queries for it once on load will not find it.

- `#late-img-figure`
- `#late-img`
- `#late-img-caption`

## `/sections` — Section add / remove / move

Section add / remove / move. Eight sibling `<section>` elements, each with a distinct background colour, so reordering or removing one is obvious in a screenshot without reading any copy. Document order is: hero, benefits, how, pricing, testimonials, faq, guarantee, cta.

**200 elements** in the server HTML, **55 page-specific ids** plus the 32 global ids below.

### Unique ids

| id | tag | visible text |
| --- | --- | --- |
| `#section-hero` | `<section>` | A subscription that ends the weekly bean decision Pick a weight and a cadence. We roast o… |
| `#section-hero-title` | `<h2>` | A subscription that ends the weekly bean decision |
| `#section-hero-copy` | `<p>` | Pick a weight and a cadence. We roast on the Tuesday, it is on your counter by the Friday… |
| `#section-hero-cta` | `<a>` | Jump to the three plans |
| `#section-benefits` | `<section>` | Four reasons the workshop keeps its customers Roasted to order, never to stock Nothing si… |
| `#section-benefits-title` | `<h2>` | Four reasons the workshop keeps its customers |
| `#benefits-grid` | `<div>` | Roasted to order, never to stock Nothing sits in a warehouse. Your bag carries a roast da… |
| `#section-how` | `<section>` | How a subscription actually runs Step one Tell us what you brew on Six questions about yo… |
| `#section-how-title` | `<h2>` | How a subscription actually runs |
| `#how-steps` | `<ol>` | Step one Tell us what you brew on Six questions about your grinder, your water and how ma… |
| `#section-pricing` | `<section>` | Three plans, and you can leave from any of them No contract, no minimum term. Annual bill… |
| `#section-pricing-title` | `<h2>` | Three plans, and you can leave from any of them |
| `#section-pricing-copy` | `<p>` | No contract, no minimum term. Annual billing takes two months off the price and nothing e… |
| `#pricing-table` | `<div>` | Monthly Annual, two months free Bench For the single-cup household that grinds fresh ever… |
| `#pricing-toggle` | `<div>` | Monthly Annual, two months free |
| `#pricing-toggle-monthly` | `<span>` | Monthly |
| `#pricing-toggle-button` | `<button>` | _(no text)_ |
| `#pricing-toggle-annual` | `<span>` | Annual, two months free |
| `#pricing-grid` | `<div>` | Bench For the single-cup household that grinds fresh every morning. $18 /month 250 g of a… |
| `#section-testimonials` | `<section>` | Three subscribers, three very different kitchens The dialling card is the part I did not… |
| `#section-testimonials-title` | `<h2>` | Three subscribers, three very different kitchens |
| `#section-testimonial-grid` | `<div>` | The dialling card is the part I did not expect to need and now cannot brew without. Annik… |
| `#section-faq` | `<section>` | Four questions we get about the plans Can I change plan halfway through a month? Yes, and… |
| `#section-faq-title` | `<h2>` | Four questions we get about the plans |
| `#section-faq-list` | `<dl>` | Can I change plan halfway through a month? Yes, and the change takes effect on the next r… |
| `#section-guarantee` | `<section>` | If the first bag disappoints you, it is free Reply to the dispatch email within fourteen… |
| `#section-guarantee-img` | `<img>` | alt: A workshop technician stamping a warranty card |
| `#section-guarantee-title` | `<h2>` | If the first bag disappoints you, it is free |
| `#section-guarantee-copy` | `<p>` | Reply to the dispatch email within fourteen days and we refund the first delivery in full… |
| `#section-cta` | `<section>` | Ready to stop guessing at the grocery aisle? Start on any plan today and move up, down or… |
| `#section-cta-title` | `<h2>` | Ready to stop guessing at the grocery aisle? |
| `#section-cta-copy` | `<p>` | Start on any plan today and move up, down or out whenever it suits. |
| `#section-cta-actions` | `<div>` | Choose a plan now Read about the workshop |
| `#section-cta-primary` | `<a>` | Choose a plan now |
| `#section-cta-secondary` | `<a>` | Read about the workshop |

### Series `#benefit-{n}` (n = 1–4)

Inner classes: `.benefit-title`, `.benefit-copy`

| id | anchor text |
| --- | --- |
| `#benefit-1` | Roasted to order, never to stock |
| `#benefit-2` | Hardware you can take apart |
| `#benefit-3` | A recipe in the box, not a slogan |
| `#benefit-4` | One invoice, no surprise duty |

### Series `#how-step-{n}` (n = 1–3)

Inner classes: `.how-step-number`, `.how-step-title`, `.how-step-copy`

| id | anchor text |
| --- | --- |
| `#how-step-1` | Tell us what you brew on |
| `#how-step-2` | We match a lot to the answers |
| `#how-step-3` | Adjust it after the first bag |

### Series `#pricing-tier-{n}` (n = 1–3)

Inner classes: `.tier-name`, `.tier-blurb`, `.tier-price`, `.tier-period`, `.tier-features`, `.tier-feature`, `.tier-cta`

| id | anchor text |
| --- | --- |
| `#pricing-tier-1` | Bench |
| `#pricing-tier-2` | Workshop |
| `#pricing-tier-3` | Counter |

### Series `#pricing-tier-{n}-cta` (n = 1–3)

| id | anchor text |
| --- | --- |
| `#pricing-tier-1-cta` | Start on Bench |
| `#pricing-tier-2-cta` | Start on Workshop |
| `#pricing-tier-3-cta` | Talk to the workshop |

### Series `#section-faq-{n}` (n = 1–4)

Inner classes: `.section-faq-question`, `.section-faq-answer`

| id | anchor text |
| --- | --- |
| `#section-faq-1` | Can I change plan halfway through a month? Yes, and the change takes effect on the next r… |
| `#section-faq-2` | What happens if I go away for a month? Pause from the account page. Paused months are not… |
| `#section-faq-3` | Do the annual plans lock me in? No. Cancel an annual plan and we refund the unused months… |
| `#section-faq-4` | Can I send a plan to someone else as a gift? You can, for three, six or twelve months. It… |

### Series `#section-testimonial-{n}` (n = 1–3)

Inner classes: `.section-testimonial-quote`, `.section-testimonial-author`

| id | anchor text |
| --- | --- |
| `#section-testimonial-1` | The dialling card is the part I did not expect to need and now cannot brew without. |
| `#section-testimonial-2` | We moved the whole studio onto Workshop and the coffee argument simply stopped. |
| `#section-testimonial-3` | The on-site grinder service alone is worth more than the plan costs us in a year. |

### Stable classes on this page

| class | count | example text |
| --- | --- | --- |
| `.benefit-item` | 4 | Roasted to order, never to stock Nothing sits in a warehouse. Your ba… |
| `.benefit-title` | 4 | Roasted to order, never to stock |
| `.benefit-copy` | 4 | Nothing sits in a warehouse. Your bag carries a roast date, not a bes… |
| `.how-step` | 3 | Step one Tell us what you brew on Six questions about your grinder, y… |
| `.how-step-number` | 3 | Step one |
| `.how-step-title` | 3 | Tell us what you brew on |
| `.how-step-copy` | 3 | Six questions about your grinder, your water and how many cups leave… |
| `.section-testimonial` | 3 | The dialling card is the part I did not expect to need and now cannot… |
| `.section-testimonial-quote` | 3 | The dialling card is the part I did not expect to need and now cannot… |
| `.section-testimonial-author` | 3 | Annika Sorensen, on the Bench plan |
| `.section-faq-item` | 4 | Can I change plan halfway through a month? Yes, and the change takes… |
| `.section-faq-question` | 4 | Can I change plan halfway through a month? |
| `.section-faq-answer` | 4 | Yes, and the change takes effect on the next roast day. We prorate th… |
| `.pricing-tier` | 3 | Bench For the single-cup household that grinds fresh every morning. $… |
| `.is-featured` | 1 | Workshop For two or three drinkers who care what the water is doing.… |
| `.tier-name` | 3 | Bench |
| `.tier-blurb` | 3 | For the single-cup household that grinds fresh every morning. |
| `.tier-price` | 3 | $18 /month |
| `.tier-period` | 3 | /month |
| `.tier-features` | 3 | 250 g of a rotating single origin Printed brew guide for the lot Five… |
| `.tier-feature` | 12 | 250 g of a rotating single origin |
| `.tier-cta` | 3 | Start on Bench |

## `/slow` — Late render

Late render. The shell is server-rendered and paints immediately; everything inside `#slow-content` mounts 1200 ms after hydration, replacing `#slow-placeholder`.

**80 elements** in the server HTML, **6 page-specific ids** plus the 32 global ids below.

### Unique ids

| id | tag | visible text |
| --- | --- | --- |
| `#slow-shell` | `<section>` | The roast log This heading and this paragraph are in the server HTML. The article below i… |
| `#slow-title` | `<h1>` | The roast log |
| `#slow-intro` | `<p>` | This heading and this paragraph are in the server HTML. The article below is not. |
| `#slow-divider` | `<hr>` | _(no text)_ |
| `#slow-placeholder` | `<div>` | Loading the roast log… |
| `#slow-status` | `<p>` | Loading the roast log… |

### Stable classes on this page

| class | count | example text |
| --- | --- | --- |
| `.slow-para` | 0 — client only | _(no text)_ |

### Ids that appear only after mount

These replace `#slow-placeholder` 1200 ms after hydration. Until then they do not exist in the DOM at all.

- `#slow-content`
- `#slow-heading-1`
- `#slow-heading-2`
- `#slow-heading-3`
- `#slow-cta`

## `/about` — Off-campaign page

The off-campaign page. Deliberately has no test targets beyond the global header and footer: use it to confirm a campaign scoped elsewhere does not fire here.

**75 elements** in the server HTML, **0 page-specific ids** plus the 32 global ids below.

### Unique ids

_None._
