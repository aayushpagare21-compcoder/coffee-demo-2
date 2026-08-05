import { GALLERY_TILES } from "@/lib/catalog";
import { imageUrl } from "@/lib/images";
import LateImage from "@/components/late-image";

/**
 * IMAGE TESTING PAGE.
 *
 * Every image on this page is a plain <img> or <picture>, never next/image,
 * so the src / srcset attributes a variant rewrites are exactly the ones
 * authored here. Covered cases: eager hero, art-directed <picture>, a lazy
 * grid, a CSS background image, and an image that mounts after hydration.
 */
export default function GalleryPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* 1. Eager hero image                                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="gallery-hero" className="mx-auto max-w-7xl px-4 py-10">
        <h1
          id="gallery-title"
          className="text-4xl font-extrabold tracking-tight text-slate-900"
        >
          Inside the Portland workshop
        </h1>
        <p id="gallery-intro" className="mt-3 max-w-2xl text-lg text-slate-600">
          Photographs from the bench, the anodising line and the Friday cupping
          table. Every image here is a plain tag, authored by hand.
        </p>
        <img
          id="gallery-hero-img"
          className="mt-6 w-full rounded-xl object-cover"
          src={imageUrl("ods-gallery-hero", 1600, 700)}
          alt="Wide view of the workshop floor at first light"
          width={1600}
          height={700}
          loading="eager"
          fetchPriority="high"
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Art-directed <picture> with two mobile sources + fallback img   */}
      {/* ---------------------------------------------------------------- */}
      <section id="art-direction" className="mx-auto max-w-7xl px-4 py-10">
        <h2
          id="art-direction-title"
          className="text-2xl font-bold text-slate-900"
        >
          The same press, framed two ways
        </h2>
        <p id="art-direction-copy" className="mt-2 max-w-2xl text-slate-600">
          Below 768 pixels the crop tightens to the plunger. A variant that
          swaps only the fallback img will not change what a phone shows.
        </p>

        <picture id="art-picture">
          <source
            id="art-source-mobile-webp"
            media="(max-width: 768px)"
            type="image/webp"
            srcSet={imageUrl("ods-art-mobile", 800, 1000, ".webp")}
          />
          <source
            id="art-source-mobile"
            media="(max-width: 768px)"
            srcSet={imageUrl("ods-art-mobile", 800, 1000)}
          />
          <img
            id="art-img"
            className="mt-4 w-full rounded-xl object-cover"
            src={imageUrl("ods-art-desktop", 1400, 700)}
            srcSet={`${imageUrl("ods-art-desktop", 1400, 700)} 1400w, ${imageUrl(
              "ods-art-desktop",
              2100,
              1050,
            )} 2100w`}
            sizes="(max-width: 768px) 100vw, 1400px"
            alt="A French press photographed on a steel bench"
            width={1400}
            height={700}
          />
        </picture>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Twelve lazy images: #lazy-img-1 .. #lazy-img-12                 */}
      {/* ---------------------------------------------------------------- */}
      <section id="lazy-grid-section" className="mx-auto max-w-7xl px-4 py-10">
        <h2 id="lazy-grid-title" className="text-2xl font-bold text-slate-900">
          Twelve frames from a working week
        </h2>
        <div
          id="lazy-grid"
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {GALLERY_TILES.map((tile) => (
            <figure
              key={tile.index}
              id={`lazy-card-${tile.index}`}
              className="lazy-card overflow-hidden rounded-lg border border-slate-200"
            >
              <img
                id={`lazy-img-${tile.index}`}
                className="lazy-img h-56 w-full object-cover"
                src={tile.imgSrc}
                alt={tile.imgAlt}
                width={600}
                height={450}
                loading="lazy"
              />
              <figcaption className="lazy-caption px-4 py-3 text-sm text-slate-600">
                {tile.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. CSS background image (class .bg-hero-image in globals.css)      */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="bg-hero"
        className="bg-hero-image mt-10 flex min-h-80 items-center justify-center px-4"
      >
        <div className="max-w-xl rounded-lg bg-slate-900/75 p-8 text-center text-white">
          <h2 id="bg-hero-title" className="text-3xl font-bold">
            No image tag on this one
          </h2>
          <p id="bg-hero-copy" className="mt-3 text-slate-200">
            The photograph behind this panel comes from the .bg-hero-image class
            in globals.css, so it can only be replaced with a stylesheet rule.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Image that mounts ~1s after hydration                           */}
      {/* ---------------------------------------------------------------- */}
      <section id="late-section" className="mx-auto max-w-7xl px-4 py-12">
        <h2 id="late-section-title" className="text-2xl font-bold text-slate-900">
          The photograph that arrives late
        </h2>
        <p id="late-section-copy" className="mb-4 mt-2 max-w-2xl text-slate-600">
          This block is empty in the server HTML and fills in one second after
          React hydrates.
        </p>
        <LateImage />
      </section>
    </>
  );
}
