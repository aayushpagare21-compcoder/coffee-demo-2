"use client";

/**
 * QA aid. Reports document.querySelectorAll("*").length so the effect of a
 * variant that adds or removes sections is visible without opening devtools.
 *
 * It renders an em dash on the server and fills the real number in useEffect,
 * which keeps the first client render identical to the server render (no
 * hydration mismatch).
 */

import { useCallback, useEffect, useState } from "react";

export default function NodeCounter() {
  const [count, setCount] = useState<number | null>(null);

  const measure = useCallback(() => {
    setCount(document.querySelectorAll("*").length);
  }, []);

  useEffect(() => {
    measure();
  }, [measure]);

  return (
    <p id="node-counter" className="text-xs text-slate-400">
      DOM elements on this page:{" "}
      <span id="node-count" className="font-mono font-semibold text-slate-200">
        {count === null ? "—" : count}
      </span>{" "}
      <button
        id="node-count-refresh"
        type="button"
        onClick={measure}
        className="ml-1 underline underline-offset-2 hover:text-slate-200"
      >
        recount
      </button>
    </p>
  );
}
