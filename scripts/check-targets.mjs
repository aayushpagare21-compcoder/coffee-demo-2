/**
 * Acceptance checks for the QA fixture. Run after `npm run build`:
 *
 *   npm run check:targets
 *
 * Asserts, against the prerendered HTML of every route:
 *   1. `/` carries at least 3000 elements
 *   2. every promised id exists, exactly once
 *   3. late-mounting ids (and any runtime-injected snippet ids) are absent
 *      from the server HTML
 *   4. the snippet tags, if any are pasted, appear inside <head> in the
 *      required order
 *   5. every semantic class in scripts/pages.mjs is actually used somewhere
 */

import { existsSync } from "node:fs";
import { parsePage } from "./lib/html.mjs";
import {
  ALL_SEMANTIC_CLASSES,
  CLIENT_ONLY_CLASSES,
  CLIENT_ONLY_IDS,
  EXPECTED_IDS,
  GLOBAL_IDS,
  MEGA_PAGE_MIN_ELEMENTS,
  PAGES,
  SNIPPET_CLIENT_INJECTED_IDS,
  SNIPPET_ORDER,
} from "./pages.mjs";

const failures = [];
const seenClasses = new Set();

for (const page of PAGES) {
  if (!existsSync(page.file)) {
    failures.push(`${page.route}: ${page.file} is missing — run \`npm run build\` first`);
    continue;
  }

  const { elements } = parsePage(page.file);
  const ids = elements.map((el) => el.id).filter(Boolean);
  const idSet = new Set(ids);

  for (const el of elements) for (const cls of el.classes) seenClasses.add(cls);

  const duplicates = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  if (duplicates.length) {
    failures.push(`${page.route}: duplicate ids ${duplicates.join(", ")}`);
  }

  const expected = [...GLOBAL_IDS, ...EXPECTED_IDS[page.route]];
  const missing = expected.filter((id) => !idSet.has(id));
  if (missing.length) {
    failures.push(
      `${page.route}: ${missing.length} missing id(s), first few: ${missing.slice(0, 8).join(", ")}`,
    );
  }

  const leaked = [
    ...SNIPPET_CLIENT_INJECTED_IDS,
    ...(CLIENT_ONLY_IDS[page.route] ?? []),
  ].filter((id) => idSet.has(id));
  if (leaked.length) {
    failures.push(
      `${page.route}: client-only id(s) present in server HTML: ${leaked.join(", ")}`,
    );
  }

  const headEnd = elements.findIndex((el) => el.tag === "body");
  const headIds = elements
    .slice(0, headEnd === -1 ? elements.length : headEnd)
    .map((el) => el.id)
    .filter((id) => SNIPPET_ORDER.includes(id));
  if (headIds.join(",") !== SNIPPET_ORDER.join(",")) {
    failures.push(
      `${page.route}: snippet order in <head> is [${headIds}], expected [${SNIPPET_ORDER}]`,
    );
  }

  if (page.route === "/" && elements.length < MEGA_PAGE_MIN_ELEMENTS) {
    failures.push(
      `/: ${elements.length} elements, need at least ${MEGA_PAGE_MIN_ELEMENTS}`,
    );
  }

  console.log(
    `${page.route.padEnd(10)} ${String(elements.length).padStart(5)} elements` +
      `   ${String(expected.length).padStart(3)} ids checked`,
  );
}

const unusedClasses = ALL_SEMANTIC_CLASSES.filter(
  (cls) => !seenClasses.has(cls) && !CLIENT_ONLY_CLASSES.has(cls),
);
if (unusedClasses.length) {
  failures.push(`documented classes never rendered: ${unusedClasses.join(", ")}`);
}

console.log("");
if (failures.length) {
  for (const failure of failures) console.error(`FAIL  ${failure}`);
  process.exit(1);
}
console.log("PASS  all acceptance checks");
