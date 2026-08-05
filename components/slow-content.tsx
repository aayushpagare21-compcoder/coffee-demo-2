"use client";

/**
 * `#slow-content` — mounts 1200 ms after hydration.
 *
 * The shell around it is server-rendered and paints immediately, so this is
 * the late-render case: a variant that reads the DOM once on load sees the
 * placeholder, not the real headings. It has to observe or retry.
 */

import { useEffect, useState } from "react";

const RENDER_DELAY_MS = 1200;

export default function SlowContent() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), RENDER_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) {
    return (
      <div id="slow-placeholder" className="space-y-4" aria-busy="true">
        <p id="slow-status" className="text-sm font-medium text-slate-500">
          Loading the roast log…
        </p>
        <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
      </div>
    );
  }

  return (
    <div id="slow-content">
      <h2 id="slow-heading-1" className="text-2xl font-bold text-slate-900">
        The roast log finally loaded
      </h2>
      <p className="slow-para mt-3 text-slate-700">
        Everything below this line was absent from the server HTML and appeared
        1200 milliseconds after React hydrated the page. If a variant rewrote
        this heading on load, it rewrote nothing at all.
      </p>

      <h3 id="slow-heading-2" className="mt-8 text-xl font-semibold text-slate-900">
        What the delay is standing in for
      </h3>
      <p className="slow-para mt-3 text-slate-700">
        A personalisation call, a pricing lookup, a cart hydration, a consent
        gate: any of the things that make a real storefront finish rendering
        long after the first paint.
      </p>
      <p className="slow-para mt-3 text-slate-700">
        The shell, the header and the footer are all present immediately, so
        the page passes a naive readiness check well before this block exists.
      </p>

      <h3 id="slow-heading-3" className="mt-8 text-xl font-semibold text-slate-900">
        What a correct variant does here
      </h3>
      <p className="slow-para mt-3 text-slate-700">
        It watches for the node rather than querying once, and it reapplies
        after React re-renders instead of assuming the first write survives.
      </p>

      <button
        id="slow-cta"
        type="button"
        className="mt-8 rounded bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Subscribe to the roast log
      </button>
    </div>
  );
}
