"use client";

/**
 * Client component so the header genuinely hydrates on every page:
 *  - usePathname drives the active-link class
 *  - the cart counter holds React state and listens for a window event
 *
 * The cart count is a good adversarial target: if a script rewrites the
 * counter text directly, React will overwrite it again on the next render.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const CART_ADD_EVENT = "ods:cart-add";

const NAV_LINKS = [
  { id: "nav-home", href: "/", label: "Home" },
  { id: "nav-gallery", href: "/gallery", label: "Gallery" },
  { id: "nav-sections", href: "/sections", label: "Sections" },
  { id: "nav-slow", href: "/slow", label: "Slow" },
  { id: "nav-about", href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const onAdd = () => setCartCount((n) => n + 1);
    window.addEventListener(CART_ADD_EVENT, onAdd);
    return () => window.removeEventListener(CART_ADD_EVENT, onAdd);
  }, []);

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
        <Link
          id="nav-logo"
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          opti-demo-store
        </Link>

        <nav id="site-nav" aria-label="Primary" className="flex-1">
          <ul id="site-nav-list" className="flex flex-wrap items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.id} className="nav-item">
                  <Link
                    id={link.id}
                    href={link.href}
                    className={`nav-link rounded px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "is-active bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          id="header-cart-button"
          type="button"
          className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          onClick={() => setCartCount((n) => n + 1)}
        >
          Basket
          <span
            id="header-cart-count"
            className="ml-2 inline-block min-w-6 rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white"
          >
            {cartCount}
          </span>
        </button>

        <Link
          id="header-cta"
          href="/sections"
          className="hidden rounded bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 sm:inline-block"
        >
          See the plans
        </Link>
      </div>
    </header>
  );
}
