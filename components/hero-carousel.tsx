"use client";

/**
 * `#hero-carousel` — 3 slides, auto-advancing every 4 seconds.
 *
 * All three slides stay in the DOM at all times (inactive ones carry the
 * `hidden` attribute), so `#hero-slide-2 .carousel-title` is targetable even
 * while slide 1 is showing. Slide 1 is active on the server and on the first
 * client render, so there is no hydration mismatch; the timer starts after.
 */

import { useEffect, useState } from "react";
import { CAROUSEL_SLIDES } from "@/lib/catalog";

const INTERVAL_MS = 4000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % CAROUSEL_SLIDES.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hero-carousel"
      aria-label="Workshop announcements"
      className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
    >
      <div id="hero-carousel-track">
        {CAROUSEL_SLIDES.map((slide, i) => (
          <div
            key={slide.index}
            id={`hero-slide-${slide.index}`}
            className={`carousel-slide ${i === active ? "is-active" : ""}`}
            hidden={i !== active}
          >
            <img
              className="carousel-img h-56 w-full object-cover sm:h-72"
              src={slide.imgSrc}
              alt={slide.imgAlt}
              width={960}
              height={420}
            />
            <div className="carousel-caption p-5">
              <h3 className="carousel-title text-xl font-bold text-slate-900">
                {slide.title}
              </h3>
              <p className="carousel-copy mt-1 text-sm text-slate-600">
                {slide.copy}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        id="hero-carousel-dots"
        className="flex justify-center gap-2 pb-4"
        role="tablist"
        aria-label="Choose a slide"
      >
        {CAROUSEL_SLIDES.map((slide, i) => (
          <button
            key={slide.index}
            id={`hero-carousel-dot-${slide.index}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show slide ${slide.index}`}
            onClick={() => setActive(i)}
            className={`carousel-dot h-2.5 w-2.5 rounded-full ${
              i === active ? "is-active bg-slate-900" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
