import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const BUILD = join(ROOT, ".next", "server", "app");

/** Route -> prerendered HTML produced by `npm run build`. */
export const PAGES = [
  { route: "/", file: join(BUILD, "index.html"), title: "The mega page" },
  { route: "/gallery", file: join(BUILD, "gallery.html"), title: "Image testing" },
  { route: "/sections", file: join(BUILD, "sections.html"), title: "Section add / remove / move" },
  { route: "/slow", file: join(BUILD, "slow.html"), title: "Late render" },
  { route: "/about", file: join(BUILD, "about.html"), title: "Off-campaign page" },
];

/**
 * Semantic class names, i.e. the ones authored for QA rather than by Tailwind.
 *
 * Keep this in sync with the components. Both scripts verify that every class
 * listed here is actually present in the built HTML, so a class that gets
 * renamed or dropped fails the check instead of silently rotting in the docs.
 */
export const SEMANTIC_CLASSES = {
  layout: ["nav-item", "nav-link", "is-active"],
  card: [
    "product-card",
    "card-media",
    "card-img",
    "card-badge",
    "card-body",
    "card-title",
    "card-desc",
    "card-tags",
    "card-tag",
    "card-rating",
    "card-stars",
    "card-star",
    "is-filled",
    "card-rating-value",
    "card-rating-count",
    "card-meta",
    "card-price",
    "card-price-was",
    "card-stock",
    "card-cta",
    "card-cta-label",
    "is-added",
  ],
  carousel: [
    "carousel-slide",
    "carousel-img",
    "carousel-caption",
    "carousel-title",
    "carousel-copy",
    "carousel-dot",
  ],
  countdown: ["countdown-unit", "countdown-value", "countdown-label", "countdown-sep"],
  testimonial: [
    "testimonial-card",
    "testimonial-quote",
    "testimonial-footer",
    "testimonial-avatar",
    "testimonial-person",
    "testimonial-author",
    "testimonial-role",
  ],
  faq: [
    "faq-item",
    "faq-heading",
    "faq-question",
    "faq-question-text",
    "faq-marker",
    "faq-answer",
    "is-open",
  ],
  home: ["hero-proof-item", "stat-item", "stat-label", "stat-value"],
  gallery: ["lazy-card", "lazy-img", "lazy-caption", "bg-hero-image"],
  sections: [
    "benefit-item",
    "benefit-title",
    "benefit-copy",
    "how-step",
    "how-step-number",
    "how-step-title",
    "how-step-copy",
    "section-testimonial",
    "section-testimonial-quote",
    "section-testimonial-author",
    "section-faq-item",
    "section-faq-question",
    "section-faq-answer",
    "pricing-tier",
    "is-featured",
    "tier-name",
    "tier-blurb",
    "tier-price",
    "tier-period",
    "tier-features",
    "tier-feature",
    "tier-cta",
  ],
  slow: ["slow-para"],
};

export const ALL_SEMANTIC_CLASSES = Object.values(SEMANTIC_CLASSES).flat();

/**
 * Documented classes that only ever exist after a client interaction or a
 * delayed mount, so they are absent from the prerendered HTML by design.
 */
export const CLIENT_ONLY_CLASSES = new Set([
  "slow-para", // inside #slow-content, mounts 1200 ms after hydration
  "is-added", // added to .card-cta once the button is clicked
]);

/** The four snippet tags, in the order they must appear inside <head>. */
export const SNIPPET_ORDER = [
  "opti-snippet-style",
  "opti-snippet-inline",
  "opti-snippet-async-1",
  "opti-snippet-async-2",
];

/** Rendered by app/layout.tsx, so expected on every route. */
export const GLOBAL_IDS = [
  ...SNIPPET_ORDER,
  "site-header",
  "nav-logo",
  "site-nav",
  "site-nav-list",
  "nav-home",
  "nav-gallery",
  "nav-sections",
  "nav-slow",
  "nav-about",
  "header-cart-button",
  "header-cart-count",
  "header-cta",
  "site-main",
  "site-footer",
  "footer-about",
  "footer-about-title",
  "footer-about-copy",
  "footer-links",
  "footer-links-title",
  "footer-link-list",
  "footer-home-hard",
  "footer-gallery-hard",
  "footer-meta",
  "footer-meta-title",
  "footer-meta-copy",
  "node-counter",
  "node-count",
  "node-count-refresh",
];

const range = (n, make) => Array.from({ length: n }, (_, i) => make(i + 1));

/** Ids that must be in the *server* HTML of each route. */
export const EXPECTED_IDS = {
  "/": [
    "hero",
    "hero-copy",
    "hero-eyebrow",
    "hero-title",
    "hero-subtitle",
    "hero-actions",
    "hero-cta-primary",
    "hero-cta-secondary",
    "hero-proof",
    "hero-media",
    "hero-img",
    "promo",
    "promo-countdown",
    "promo-countdown-label",
    "promo-countdown-clock",
    "promo-countdown-hours",
    "promo-countdown-minutes",
    "promo-countdown-seconds",
    "promo-countdown-note",
    "announcements",
    "announcements-title",
    "hero-carousel",
    "hero-carousel-track",
    "hero-carousel-dots",
    ...range(3, (i) => `hero-slide-${i}`),
    ...range(3, (i) => `hero-carousel-dot-${i}`),
    "stats",
    ...range(4, (i) => `stat-${i}`),
    "products",
    "products-title",
    "products-subtitle",
    "product-grid",
    ...range(100, (i) => `card-${i}`),
    ...range(100, (i) => `card-${i}-cta`),
    "testimonials-section",
    "testimonials-title",
    "testimonial-grid",
    ...range(20, (i) => `testimonial-${i}`),
    "faq-section",
    "faq-title",
    "faq-subtitle",
    "faq-list",
    ...range(20, (i) => `faq-${i}`),
    ...range(20, (i) => `faq-${i}-question`),
    ...range(20, (i) => `faq-${i}-answer`),
  ],
  "/gallery": [
    "gallery-hero",
    "gallery-title",
    "gallery-intro",
    "gallery-hero-img",
    "art-direction",
    "art-direction-title",
    "art-direction-copy",
    "art-picture",
    "art-source-mobile-webp",
    "art-source-mobile",
    "art-img",
    "lazy-grid-section",
    "lazy-grid-title",
    "lazy-grid",
    ...range(12, (i) => `lazy-card-${i}`),
    ...range(12, (i) => `lazy-img-${i}`),
    "bg-hero",
    "bg-hero-title",
    "bg-hero-copy",
    "late-section",
    "late-section-title",
    "late-section-copy",
    "late-img-placeholder",
  ],
  "/sections": [
    "section-hero",
    "section-hero-title",
    "section-hero-copy",
    "section-hero-cta",
    "section-benefits",
    "section-benefits-title",
    "benefits-grid",
    ...range(4, (i) => `benefit-${i}`),
    "section-how",
    "section-how-title",
    "how-steps",
    ...range(3, (i) => `how-step-${i}`),
    "section-pricing",
    "section-pricing-title",
    "section-pricing-copy",
    "pricing-table",
    "pricing-toggle",
    "pricing-toggle-monthly",
    "pricing-toggle-button",
    "pricing-toggle-annual",
    "pricing-grid",
    ...range(3, (i) => `pricing-tier-${i}`),
    ...range(3, (i) => `pricing-tier-${i}-cta`),
    "section-testimonials",
    "section-testimonials-title",
    "section-testimonial-grid",
    ...range(3, (i) => `section-testimonial-${i}`),
    "section-faq",
    "section-faq-title",
    "section-faq-list",
    ...range(4, (i) => `section-faq-${i}`),
    "section-guarantee",
    "section-guarantee-img",
    "section-guarantee-title",
    "section-guarantee-copy",
    "section-cta",
    "section-cta-title",
    "section-cta-copy",
    "section-cta-actions",
    "section-cta-primary",
    "section-cta-secondary",
  ],
  "/slow": [
    "slow-shell",
    "slow-title",
    "slow-intro",
    "slow-divider",
    "slow-placeholder",
    "slow-status",
  ],
  "/about": [],
};

/**
 * Ids that must NOT be in the server HTML: they only exist once the client
 * has mounted. That absence is the feature being tested.
 */
export const CLIENT_ONLY_IDS = {
  "/gallery": ["late-img-figure", "late-img", "late-img-caption"],
  "/slow": [
    "slow-content",
    "slow-heading-1",
    "slow-heading-2",
    "slow-heading-3",
    "slow-cta",
  ],
};

/** Minimum element count for the mega page. */
export const MEGA_PAGE_MIN_ELEMENTS = 3000;
