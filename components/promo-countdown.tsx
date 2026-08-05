"use client";

/**
 * `#promo-countdown` — ticks once a second, forever.
 *
 * It exists to simulate a live site that keeps re-rendering underneath the
 * A/B script: anything a variant writes into the countdown subtree gets
 * overwritten within one second unless the variant re-applies.
 *
 * Hydration safety: the server and the first client render both emit
 * INITIAL_DISPLAY. The clock is only read inside useEffect, after hydration.
 */

import { useEffect, useState } from "react";

/** The promo window loops every 2 hours so the timer is never at zero. */
const WINDOW_MS = 2 * 60 * 60 * 1000;
const INITIAL_DISPLAY = { hours: "02", minutes: "00", seconds: "00" };

function format(remainingMs: number) {
  const total = Math.max(0, Math.floor(remainingMs / 1000));
  return {
    hours: String(Math.floor(total / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
    seconds: String(total % 60).padStart(2, "0"),
  };
}

export default function PromoCountdown() {
  const [display, setDisplay] = useState(INITIAL_DISPLAY);

  useEffect(() => {
    const tick = () => setDisplay(format(WINDOW_MS - (Date.now() % WINDOW_MS)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      id="promo-countdown"
      className="flex flex-wrap items-center justify-center gap-4 rounded-lg bg-slate-900 px-6 py-5 text-white"
    >
      <p id="promo-countdown-label" className="text-sm font-medium">
        Workshop seconds sale ends in
      </p>

      <div id="promo-countdown-clock" className="flex items-center gap-2">
        <span id="promo-countdown-hours" className="countdown-unit">
          <span className="countdown-value block text-2xl font-bold tabular-nums">
            {display.hours}
          </span>
          <span className="countdown-label block text-[10px] uppercase tracking-wide text-slate-400">
            hours
          </span>
        </span>
        <span className="countdown-sep text-2xl font-bold">:</span>
        <span id="promo-countdown-minutes" className="countdown-unit">
          <span className="countdown-value block text-2xl font-bold tabular-nums">
            {display.minutes}
          </span>
          <span className="countdown-label block text-[10px] uppercase tracking-wide text-slate-400">
            minutes
          </span>
        </span>
        <span className="countdown-sep text-2xl font-bold">:</span>
        <span id="promo-countdown-seconds" className="countdown-unit">
          <span className="countdown-value block text-2xl font-bold tabular-nums">
            {display.seconds}
          </span>
          <span className="countdown-label block text-[10px] uppercase tracking-wide text-slate-400">
            seconds
          </span>
        </span>
      </div>

      <p id="promo-countdown-note" className="text-sm text-amber-300">
        Use code BENCH15 for fifteen percent off any grinder
      </p>
    </div>
  );
}
