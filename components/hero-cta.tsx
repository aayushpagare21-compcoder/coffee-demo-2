"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Primary hero CTA. Pushes a GTM `button_clicked` event on click. */
export default function HeroCta() {
  return (
    <a
      id="hero-cta-primary"
      href="#product-grid"
      className="rounded bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
      onClick={() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "button_clicked",
          button_id: "hero-cta-primary",
          button_text: "Shop the bench series",
        });
      }}
    >
      Shop the bench series
    </a>
  );
}
