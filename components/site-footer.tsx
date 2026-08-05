import NodeCounter from "./node-counter";

export default function SiteFooter() {
  return (
    <footer id="site-footer" className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div id="footer-about">
          <h2 id="footer-about-title" className="text-base font-semibold text-white">
            About the workshop
          </h2>
          <p id="footer-about-copy" className="mt-2 max-w-sm text-sm">
            opti-demo-store machines coffee gear in Portland and stocks every
            serviceable part for ten years after a model retires.
          </p>
        </div>

        <div id="footer-links">
          <h2 id="footer-links-title" className="text-base font-semibold text-white">
            Where to go next
          </h2>
          <ul id="footer-link-list" className="mt-2 space-y-1 text-sm">
            <li>
              {/*
                Deliberately a plain anchor, NOT next/link: this forces a full
                document load so bfcache and re-execution of the head snippet
                can be tested on the way back.
              */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                id="footer-home-hard"
                href="/"
                className="underline underline-offset-2 hover:text-white"
              >
                Back to the shop (full page load)
              </a>
            </li>
            <li>
              <a
                id="footer-gallery-hard"
                href="/gallery"
                className="underline underline-offset-2 hover:text-white"
              >
                Workshop gallery (full page load)
              </a>
            </li>
          </ul>
        </div>

        <div id="footer-meta">
          <h2 id="footer-meta-title" className="text-base font-semibold text-white">
            QA fixture
          </h2>
          <p id="footer-meta-copy" className="mt-2 text-sm">
            This site is a test fixture. Nothing here is for sale and no order
            is ever placed.
          </p>
          <NodeCounter />
        </div>
      </div>
    </footer>
  );
}
