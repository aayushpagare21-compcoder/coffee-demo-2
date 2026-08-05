"use client";

/**
 * 20-item FAQ accordion, roots `#faq-1` .. `#faq-20`.
 *
 * Answers are always present in the DOM and are hidden with the `hidden`
 * attribute rather than being unmounted. That keeps the element count stable
 * and lets a variant target `#faq-17 .faq-answer` without opening it first.
 *
 * Item 1 is open on the server and on the first client render.
 */

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/catalog";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <div id="faq-list" className="divide-y divide-slate-200 border-y border-slate-200">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openIndex === item.index;
        return (
          <div
            key={item.index}
            id={`faq-${item.index}`}
            className={`faq-item ${isOpen ? "is-open" : ""}`}
          >
            <h3 className="faq-heading">
              <button
                id={`faq-${item.index}-question`}
                type="button"
                className="faq-question flex w-full items-center justify-between gap-4 px-1 py-4 text-left text-base font-medium text-slate-900 hover:text-amber-700"
                aria-expanded={isOpen}
                aria-controls={`faq-${item.index}-answer`}
                onClick={() => setOpenIndex(isOpen ? null : item.index)}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-marker text-xl leading-none text-slate-400">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`faq-${item.index}-answer`}
              className="faq-answer px-1 pb-4 text-sm leading-relaxed text-slate-600"
              hidden={!isOpen}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
