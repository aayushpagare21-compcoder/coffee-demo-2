/**
 * Generates docs/selectors.md from the HTML the site actually renders.
 *
 *   npm run build && npm run docs:selectors
 *
 * The tables are read out of .next/server/app/*.html rather than out of the
 * components, so the document cannot drift from the pages: if a heading is
 * reworded, re-running this picks the new wording up.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parsePage } from "./lib/html.mjs";
import {
  ALL_SEMANTIC_CLASSES,
  CLIENT_ONLY_CLASSES,
  CLIENT_ONLY_IDS,
  GLOBAL_IDS,
  PAGES,
  ROOT,
  SEMANTIC_CLASSES,
  SNIPPET_CLIENT_INJECTED_IDS,
  SNIPPET_ORDER,
} from "./pages.mjs";

const OUT = join(ROOT, "docs", "selectors.md");
const SEMANTIC_SET = new Set(ALL_SEMANTIC_CLASSES);

/* ------------------------------------------------------------------ utils */

const cell = (value) =>
  String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\s+/g, " ")
    .trim();

function clip(text, max = 90) {
  const clean = cell(text);
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

function table(headers, rows) {
  if (!rows.length) return "_None._\n";
  const lines = [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((c) => cell(c)).join(" | ")} |`),
  ];
  return `${lines.join("\n")}\n`;
}

/** Series like card-1..card-100 collapse into one table; 3+ members. */
function splitSeries(ids) {
  const groups = new Map();
  for (const id of ids) {
    const match = /^(.*?)(\d+)(.*)$/.exec(id);
    if (!match) continue;
    const key = `${match[1]}#${match[3]}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ id, n: Number(match[2]) });
  }

  const series = [];
  const claimed = new Set();
  for (const [key, members] of groups) {
    if (members.length < 3) continue;
    const [prefix, suffix] = key.split("#");
    members.sort((a, b) => a.n - b.n);
    series.push({
      pattern: `#${prefix}{n}${suffix}`,
      range: `${members[0].n}–${members[members.length - 1].n}`,
      members: members.map((m) => m.id),
    });
    for (const m of members) claimed.add(m.id);
  }

  series.sort((a, b) => a.pattern.localeCompare(b.pattern));
  return { series, singles: ids.filter((id) => !claimed.has(id)) };
}

/** The bit of text a variant would anchor on inside a repeated element. */
const ANCHOR_CLASS = /-(title|question-text|quote|name|caption|label)$/;

function anchorText(elements, el) {
  const kids = elements.slice(el.start + 1, el.end);
  const byClass = kids.find((k) => k.classes.some((c) => ANCHOR_CLASS.test(c)));
  if (byClass) return byClass.text;
  const heading = kids.find((k) => /^h[1-6]$/.test(k.tag));
  if (heading) return heading.text;
  return el.text;
}

/** What to show for an element that renders no text of its own. */
function describe(text, el) {
  if (text) return clip(text);
  if (el.attrs.alt) return `alt: ${clip(el.attrs.alt, 70)}`;
  if (el.attrs.srcset) return `srcset: ${clip(el.attrs.srcset, 70)}`;
  return "_(no text)_";
}

/** Framework-generated ids (React streaming markers) are not test targets. */
const isAuthoredId = (id) => !id.startsWith("_") && !id.startsWith("__next");

/* ------------------------------------------------------------- page report */

function renderPage(page, notes) {
  const { elements } = parsePage(page.file);
  const byId = new Map();
  for (const el of elements) if (el.id) byId.set(el.id, el);

  const globals = new Set(GLOBAL_IDS);
  const pageIds = [...byId.keys()].filter(
    (id) => !globals.has(id) && isAuthoredId(id),
  );

  const out = [];
  out.push(`## \`${page.route}\` — ${page.title}\n`);
  out.push(`${notes.intro}\n`);
  out.push(
    `**${elements.length} elements** in the server HTML, ` +
      `**${pageIds.length} page-specific ids** plus the ${GLOBAL_IDS.length} global ids below.\n`,
  );

  const { series, singles } = splitSeries(pageIds);

  out.push("### Unique ids\n");
  out.push(
    table(
      ["id", "tag", "visible text"],
      singles.map((id) => {
        const el = byId.get(id);
        return [`\`#${id}\``, `\`<${el.tag}>\``, describe(el.text, el)];
      }),
    ),
  );

  for (const s of series) {
    const first = byId.get(s.members[0]);
    const innerClasses = [
      ...new Set(
        elements
          .slice(first.start + 1, first.end)
          .flatMap((k) => k.classes)
          .filter((c) => SEMANTIC_SET.has(c)),
      ),
    ];

    out.push(`### Series \`${s.pattern}\` (n = ${s.range})\n`);
    if (innerClasses.length) {
      out.push(
        `Inner classes: ${innerClasses.map((c) => `\`.${c}\``).join(", ")}\n`,
      );
    }
    out.push(
      table(
        ["id", "anchor text"],
        s.members.map((id) => {
          const el = byId.get(id);
          return [`\`#${id}\``, describe(anchorText(elements, el), el)];
        }),
      ),
    );
  }

  const used = new Set(elements.flatMap((el) => el.classes));
  const pageClasses = (notes.classGroups ?? [])
    .flatMap((group) => SEMANTIC_CLASSES[group])
    .filter((c) => used.has(c) || CLIENT_ONLY_CLASSES.has(c));

  if (pageClasses.length) {
    out.push("### Stable classes on this page\n");
    out.push(
      table(
        ["class", "count", "example text"],
        pageClasses.map((cls) => {
          const hits = elements.filter((el) => el.classes.includes(cls));
          const example = hits.find((el) => el.text)?.text;
          return [
            `\`.${cls}\``,
            hits.length || "0 — client only",
            example ? clip(example, 70) : "_(no text)_",
          ];
        }),
      ),
    );
  }

  const late = CLIENT_ONLY_IDS[page.route];
  if (late?.length) {
    out.push("### Ids that appear only after mount\n");
    out.push(
      `${notes.lateNote}\n\n` +
        late.map((id) => `- \`#${id}\``).join("\n") +
        "\n",
    );
  }

  return out.join("\n");
}

/* ------------------------------------------------------------------ notes */

const NOTES = {
  "/": {
    intro:
      "The scale page. One hundred product cards, twenty testimonials, a twenty-item accordion, an auto-rotating carousel and a countdown that ticks every second. Every product title and every product description on this page is unique, so a title is safe to use as a text anchor.",
    classGroups: ["card", "carousel", "countdown", "testimonial", "faq", "home"],
  },
  "/gallery": {
    intro:
      "Image handling. Every image is a plain `<img>` or `<picture>` — never `next/image` — so `src` and `srcset` are exactly as authored and a rewrite is visible in the attribute. Covers an eager hero, an art-directed `<picture>`, twelve lazy images, a CSS background image and an image that mounts late.",
    classGroups: ["gallery"],
    lateNote:
      "`#late-img` is mounted by a client component roughly one second after hydration. A variant that queries for it once on load will not find it.",
  },
  "/sections": {
    intro:
      "Section add / remove / move. Eight sibling `<section>` elements, each with a distinct background colour, so reordering or removing one is obvious in a screenshot without reading any copy. Document order is: hero, benefits, how, pricing, testimonials, faq, guarantee, cta.",
    classGroups: ["sections"],
  },
  "/slow": {
    intro:
      "Late render. The shell is server-rendered and paints immediately; everything inside `#slow-content` mounts 1200 ms after hydration, replacing `#slow-placeholder`.",
    classGroups: ["slow"],
    lateNote:
      "These replace `#slow-placeholder` 1200 ms after hydration. Until then they do not exist in the DOM at all.",
  },
  "/about": {
    intro:
      "The off-campaign page. Deliberately has no test targets beyond the global header and footer: use it to confirm a campaign scoped elsewhere does not fire here.",
    classGroups: [],
  },
};

/* ------------------------------------------------------------------- main */

const missing = PAGES.filter((p) => !existsSync(p.file));
if (missing.length) {
  console.error(
    `Build output missing for ${missing.map((p) => p.route).join(", ")} — run \`npm run build\` first.`,
  );
  process.exit(1);
}

const { elements: homeElements } = parsePage(PAGES[0].file);
const homeById = new Map(homeElements.filter((el) => el.id).map((el) => [el.id, el]));

const doc = [];

doc.push("# Selector reference\n");
doc.push(
  "Generated from the built HTML by `npm run docs:selectors`. Do not edit by hand — " +
    "re-run it after changing a page and the tables follow.\n",
);

doc.push("## How to read this\n");
doc.push(
  [
    "- Every element worth targeting has an `id`. Repeated elements use a numbered series (`#card-1` … `#card-100`) plus stable inner classes, so `#card-42 .card-title` is a valid, specific selector.",
    "- Ids are unique per page; the checker in `scripts/check-targets.mjs` fails the build if that stops being true.",
    "- All 100 product titles and all 100 product descriptions differ from each other, so a selector can be paired with a visible-text anchor without ambiguity.",
    "- Utility classes from Tailwind are not listed. Only the semantic classes authored for QA appear here, and every one of them is verified to exist in the rendered HTML.",
    "- `_(no text)_` means the element renders no visible text of its own — typically an image, a wrapper or an icon.",
  ].join("\n") + "\n",
);

doc.push("## The snippet mount point\n");
const snippetState = SNIPPET_ORDER.length
  ? [
      "`components/opti-snippet.tsx` renders as the first child of `<head>` in `app/layout.tsx`, in this exact order:",
      "",
      table(
        ["order", "id", "tag"],
        SNIPPET_ORDER.map((id, i) => {
          const el = homeById.get(id);
          const tag =
            el?.attrs?.src != null ? `\`<${el.tag} async src>\`` : `\`<${el?.tag}>\``;
          return [String(i + 1), `\`#${id}\``, tag];
        }),
      ),
      "The order above is asserted by `npm run check:targets`" +
        (SNIPPET_CLIENT_INJECTED_IDS.length
          ? `, which also asserts the runtime-injected ${SNIPPET_CLIENT_INJECTED_IDS.map(
              (id) => `\`#${id}\``,
            ).join(", ")} stays *absent* from the server HTML.`
          : "."),
    ]
  : [
      "`components/opti-snippet.tsx` is the first child of `<head>` in `app/layout.tsx`. **No snippet is currently pasted** — it renders nothing, and no `opti-*` tags appear in `<head>`.",
      "",
      "When a snippet is pasted there, list its tag ids in `SNIPPET_ORDER` in `scripts/pages.mjs` (and any runtime-injected ids in `SNIPPET_CLIENT_INJECTED_IDS`); `npm run check:targets` then asserts their order in `<head>` and their absence from the server HTML respectively.",
    ];
doc.push(
  [
    ...snippetState,
    "",
    "One caveat worth knowing: Next.js flushes its own framework tags — the stylesheet `<link>`, image preloads and the bundle's async chunks — into the `<head>` preamble ahead of any head children. Nothing rendered from the React tree can precede them. The mount point is the first thing in `<head>` that the application controls.",
  ].join("\n") + "\n",
);

doc.push("## Global — header and footer, present on every page\n");
doc.push(
  table(
    ["id", "tag", "visible text"],
    GLOBAL_IDS.filter((id) => homeById.has(id)).map((id) => {
      const el = homeById.get(id);
      return [`\`#${id}\``, `\`<${el.tag}>\``, describe(el.text, el)];
    }),
  ),
);
doc.push(
  [
    `Nav links carry \`.nav-link\`, and the active one also carries \`.is-active\`.`,
    "`#footer-home-hard` and `#footer-gallery-hard` are plain `<a href>` elements, not `next/link`: they force a full document load, which is what you want for bfcache and snippet re-execution tests. Every other link on the site navigates client-side.",
  ].join("\n") + "\n",
);

for (const page of PAGES) {
  doc.push(renderPage(page, NOTES[page.route]));
}

mkdirSync(join(ROOT, "docs"), { recursive: true });
writeFileSync(OUT, doc.join("\n"), "utf8");
console.log(`Wrote ${OUT}`);
