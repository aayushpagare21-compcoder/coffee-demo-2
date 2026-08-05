"use client";

/**
 * Three-tier pricing table for `#section-pricing`, with a monthly/annual
 * toggle so this page has real hydrated state too.
 *
 * Roots are `#pricing-tier-1` .. `#pricing-tier-3`. The prices live in React
 * state, which makes `.tier-price` another good re-render target.
 */

import { useState } from "react";

type Tier = {
  index: number;
  name: string;
  monthly: number;
  annual: number;
  blurb: string;
  features: string[];
  cta: string;
  featured: boolean;
};

const TIERS: Tier[] = [
  {
    index: 1,
    name: "Bench",
    monthly: 18,
    annual: 180,
    blurb: "For the single-cup household that grinds fresh every morning.",
    features: [
      "250 g of a rotating single origin",
      "Printed brew guide for the lot",
      "Five percent off any hardware",
      "Pause or skip any time",
    ],
    cta: "Start on Bench",
    featured: false,
  },
  {
    index: 2,
    name: "Workshop",
    monthly: 39,
    annual: 390,
    blurb: "For two or three drinkers who care what the water is doing.",
    features: [
      "600 g split across two origins",
      "Quarterly filter and seal refresh",
      "Ten percent off any hardware",
      "Priority on limited-run releases",
    ],
    cta: "Start on Workshop",
    featured: true,
  },
  {
    index: 3,
    name: "Counter",
    monthly: 96,
    annual: 960,
    blurb: "For offices and small bars pulling through a kilo a week.",
    features: [
      "1.2 kg on a schedule you set",
      "Annual on-site grinder service",
      "Fifteen percent off any hardware",
      "A named technician on the account",
    ],
    cta: "Talk to the workshop",
    featured: false,
  },
];

export default function PricingTable() {
  const [annual, setAnnual] = useState(false);

  return (
    <div id="pricing-table">
      <div id="pricing-toggle" className="mb-8 flex items-center justify-center gap-3">
        <span id="pricing-toggle-monthly" className="text-sm font-medium text-slate-700">
          Monthly
        </span>
        <button
          id="pricing-toggle-button"
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Bill annually"
          onClick={() => setAnnual((v) => !v)}
          className={`relative h-6 w-11 rounded-full transition ${
            annual ? "bg-emerald-600" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
              annual ? "left-5.5" : "left-0.5"
            }`}
          />
        </button>
        <span id="pricing-toggle-annual" className="text-sm font-medium text-slate-700">
          Annual, two months free
        </span>
      </div>

      <div id="pricing-grid" className="grid gap-6 md:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.index}
            id={`pricing-tier-${tier.index}`}
            className={`pricing-tier flex flex-col rounded-xl border bg-white p-6 ${
              tier.featured
                ? "is-featured border-emerald-600 shadow-lg"
                : "border-slate-200"
            }`}
          >
            <h3 className="tier-name text-lg font-bold text-slate-900">
              {tier.name}
            </h3>
            <p className="tier-blurb mt-1 text-sm text-slate-600">{tier.blurb}</p>
            <p className="tier-price mt-4 text-4xl font-extrabold text-slate-900">
              ${annual ? tier.annual : tier.monthly}
              <span className="tier-period ml-1 text-base font-medium text-slate-500">
                {annual ? "/year" : "/month"}
              </span>
            </p>
            <ul className="tier-features mt-5 flex-1 space-y-2 text-sm text-slate-700">
              {tier.features.map((feature) => (
                <li key={feature} className="tier-feature">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              id={`pricing-tier-${tier.index}-cta`}
              type="button"
              className={`tier-cta mt-6 rounded px-4 py-2.5 text-sm font-semibold ${
                tier.featured
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-slate-900 text-white hover:bg-slate-700"
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
