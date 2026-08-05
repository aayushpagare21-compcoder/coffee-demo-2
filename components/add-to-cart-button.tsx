"use client";

/**
 * One tiny hydration root per product card (100 of them on `/`).
 *
 * This is intentional: it is the most adversarial thing on the site for a
 * text-rewriting script. The label lives in React state, so a variant that
 * rewrites `.card-cta-label` textContent will be reverted the moment React
 * re-renders this button. Good place to prove that a variant re-applies.
 */

import { useState } from "react";
import { CART_ADD_EVENT } from "./site-header";

export default function AddToCartButton({
  sku,
  index,
}: {
  sku: string;
  index: number;
}) {
  const [added, setAdded] = useState(false);

  return (
    <button
      id={`card-${index}-cta`}
      type="button"
      data-sku={sku}
      className={`card-cta mt-4 w-full rounded px-3 py-2 text-sm font-semibold ${
        added
          ? "is-added bg-emerald-600 text-white"
          : "bg-slate-900 text-white hover:bg-slate-700"
      }`}
      onClick={() => {
        setAdded(true);
        window.dispatchEvent(new CustomEvent(CART_ADD_EVENT));
      }}
    >
      <span className="card-cta-label">{added ? "Added" : "Add to basket"}</span>
    </button>
  );
}
