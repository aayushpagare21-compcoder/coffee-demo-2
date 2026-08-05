/**
 * The off-campaign page.
 *
 * Intentionally plain and intentionally free of test targets: use it to
 * confirm that a campaign scoped to the other pages does not fire here, and
 * that navigating to it cleans up whatever a variant changed elsewhere.
 */
export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
        About the workshop
      </h1>

      <p className="mt-6 text-lg text-slate-700">
        opti-demo-store began in 2014 as two people, a second-hand lathe and a
        stubborn opinion about gaskets. We still machine everything within a
        mile of the original bench.
      </p>

      <p className="mt-4 text-slate-700">
        The rule we have never broken is that a part which wears out has to be
        a part you can buy on its own. That is why the catalogue is smaller
        than it could be and why the parts list is longer than anyone expects.
      </p>

      <p className="mt-4 text-slate-700">
        This page is the off-campaign page for the demo site. Nothing on it is
        a test target, and no experiment should ever alter it.
      </p>
    </article>
  );
}
