import { PRODUCTS, TESTIMONIALS } from "@/lib/catalog";
import { imageUrl } from "@/lib/images";
import ProductCard from "@/components/product-card";
import HeroCarousel from "@/components/hero-carousel";
import PromoCountdown from "@/components/promo-countdown";
import FaqAccordion from "@/components/faq-accordion";

/**
 * THE MEGA PAGE.
 *
 * Deliberately heavy: 100 product cards, 20 testimonials, a 20-item accordion,
 * an auto-rotating carousel and a per-second countdown. Target is 3000+ DOM
 * elements so a variant that walks the document has something to chew on.
 * Verify in the console with: document.querySelectorAll("*").length
 */
export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section id="hero" className="border-b border-slate-200 bg-amber-50">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 lg:grid-cols-2">
          <div id="hero-copy">
            <p
              id="hero-eyebrow"
              className="text-xs font-semibold uppercase tracking-widest text-amber-700"
            >
              Machined in Portland since 2014
            </p>
            <h1
              id="hero-title"
              className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            >
              Coffee gear built to be repaired, not replaced
            </h1>
            <p id="hero-subtitle" className="mt-4 max-w-xl text-lg text-slate-700">
              One hundred pieces of brewing equipment, every serviceable part
              stocked for ten years, and a dialling card in every box.
            </p>
            <div id="hero-actions" className="mt-7 flex flex-wrap gap-3">
              <a
                id="hero-cta-primary"
                href="#product-grid"
                className="rounded bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Shop the bench series
              </a>
              <a
                id="hero-cta-secondary"
                href="#faq-section"
                className="rounded border border-slate-400 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-white"
              >
                Read the common questions
              </a>
            </div>
            <ul
              id="hero-proof"
              className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-600"
            >
              <li className="hero-proof-item">Free returns for sixty days</li>
              <li className="hero-proof-item">Two-year workshop warranty</li>
              <li className="hero-proof-item">Parts stocked for a decade</li>
            </ul>
          </div>

          <div id="hero-media">
            <img
              id="hero-img"
              className="w-full rounded-xl object-cover shadow-lg"
              src={imageUrl("ods-hero", 900, 640)}
              alt="A pour-over dripper mid-bloom on a workshop bench"
              width={900}
              height={640}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Countdown + carousel: the two widgets that keep re-rendering      */}
      {/* ---------------------------------------------------------------- */}
      <section id="promo" className="mx-auto max-w-7xl px-4 py-10">
        <PromoCountdown />
      </section>

      <section id="announcements" className="mx-auto max-w-7xl px-4 pb-12">
        <h2
          id="announcements-title"
          className="mb-4 text-2xl font-bold text-slate-900"
        >
          What the workshop is shipping this month
        </h2>
        <HeroCarousel />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Stats strip                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="stats" className="border-y border-slate-200 bg-slate-50">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4">
          <div id="stat-1" className="stat-item">
            <dt className="stat-label text-sm text-slate-600">
              Pieces in the catalogue
            </dt>
            <dd className="stat-value text-3xl font-bold text-slate-900">100</dd>
          </div>
          <div id="stat-2" className="stat-item">
            <dt className="stat-label text-sm text-slate-600">
              Years of parts stocked
            </dt>
            <dd className="stat-value text-3xl font-bold text-slate-900">10</dd>
          </div>
          <div id="stat-3" className="stat-item">
            <dt className="stat-label text-sm text-slate-600">
              Countries served
            </dt>
            <dd className="stat-value text-3xl font-bold text-slate-900">38</dd>
          </div>
          <div id="stat-4" className="stat-item">
            <dt className="stat-label text-sm text-slate-600">
              Service partners
            </dt>
            <dd className="stat-value text-3xl font-bold text-slate-900">9</dd>
          </div>
        </dl>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 100 product cards: #card-1 .. #card-100                           */}
      {/* ---------------------------------------------------------------- */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-14">
        <h2
          id="products-title"
          className="text-3xl font-bold tracking-tight text-slate-900"
        >
          The full bench catalogue
        </h2>
        <p id="products-subtitle" className="mt-2 max-w-2xl text-slate-600">
          Every piece we machine, in the order it was introduced. Prices include
          the printed dialling card.
        </p>

        <div
          id="product-grid"
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.index} product={product} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 20 testimonials: #testimonial-1 .. #testimonial-20                */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="testimonials-section"
        className="border-t border-slate-200 bg-slate-50 py-14"
      >
        <div className="mx-auto max-w-7xl px-4">
          <h2
            id="testimonials-title"
            className="text-3xl font-bold tracking-tight text-slate-900"
          >
            Twenty people who use this gear every day
          </h2>
          <div
            id="testimonial-grid"
            className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.index}
                id={`testimonial-${t.index}`}
                className="testimonial-card rounded-lg border border-slate-200 bg-white p-5"
              >
                <blockquote className="testimonial-quote text-sm leading-relaxed text-slate-700">
                  {t.quote}
                </blockquote>
                <figcaption className="testimonial-footer mt-4 flex items-center gap-3">
                  <img
                    className="testimonial-avatar h-10 w-10 rounded-full object-cover"
                    src={t.avatar}
                    alt={`Portrait of ${t.author}`}
                    width={96}
                    height={96}
                    loading="lazy"
                  />
                  <span className="testimonial-person">
                    <span className="testimonial-author block text-sm font-semibold text-slate-900">
                      {t.author}
                    </span>
                    <span className="testimonial-role block text-xs text-slate-500">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 20-item FAQ accordion: #faq-1 .. #faq-20                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="faq-section" className="mx-auto max-w-3xl px-4 py-14">
        <h2
          id="faq-title"
          className="text-3xl font-bold tracking-tight text-slate-900"
        >
          Everything customers ask before they buy
        </h2>
        <p id="faq-subtitle" className="mb-6 mt-2 text-slate-600">
          Twenty answers, written by the people who machine the parts.
        </p>
        <FaqAccordion />
      </section>
    </>
  );
}
