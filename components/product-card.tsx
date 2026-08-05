import type { Product } from "@/lib/catalog";
import AddToCartButton from "./add-to-cart-button";

/**
 * Server component. Roots are `#card-1` .. `#card-100`; every inner element
 * carries a stable class so a variant can target `#card-42 .card-title`.
 *
 * The <img> is a plain tag on purpose (never next/image) so the src attribute
 * the script rewrites is exactly the src that was authored.
 */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <article
      id={`card-${product.index}`}
      data-sku={product.sku}
      data-card-index={product.index}
      className="product-card flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white"
    >
      <div className="card-media relative">
        <img
          className="card-img h-40 w-full object-cover"
          src={product.imgSrc}
          alt={product.imgAlt}
          width={400}
          height={300}
          loading="lazy"
        />
        <span className="card-badge absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
          {product.badge}
        </span>
      </div>

      <div className="card-body flex flex-1 flex-col p-4">
        <h3 className="card-title text-base font-semibold leading-snug text-slate-900">
          {product.title}
        </h3>

        <p className="card-desc mt-2 line-clamp-3 text-sm text-slate-600">
          {product.description}
        </p>

        <ul className="card-tags mt-3 flex gap-2">
          <li className="card-tag rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {product.tags[0]}
          </li>
          <li className="card-tag rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {product.tags[1]}
          </li>
        </ul>

        <div className="card-rating mt-3 flex items-center gap-2 text-xs text-slate-500">
          <span className="card-stars" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`card-star ${
                  star <= product.ratingStars ? "is-filled" : ""
                }`}
              >
                ★
              </span>
            ))}
          </span>
          <span className="card-rating-value font-semibold text-slate-700">
            {product.rating.toFixed(1)}
          </span>
          <span className="card-rating-count">
            ({product.ratingCount} reviews)
          </span>
        </div>

        <div className="card-meta mt-3 flex items-baseline gap-2">
          <span className="card-price text-lg font-bold text-slate-900">
            ${product.price}
          </span>
          <span className="card-price-was text-sm text-slate-400 line-through">
            ${product.priceWas}
          </span>
          <span className="card-stock ml-auto text-xs text-emerald-700">
            {product.stock}
          </span>
        </div>

        <div className="mt-auto">
          <AddToCartButton sku={product.sku} index={product.index} />
        </div>
      </div>
    </article>
  );
}
