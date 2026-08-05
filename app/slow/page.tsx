import SlowContent from "@/components/slow-content";

/**
 * LATE-RENDER TESTING.
 *
 * The shell here is server-rendered and paints with the rest of the document.
 * Everything inside #slow-content mounts client-side 1200 ms later.
 */
export default function SlowPage() {
  return (
    <section id="slow-shell" className="mx-auto max-w-3xl px-4 py-14">
      <h1 id="slow-title" className="text-4xl font-extrabold tracking-tight text-slate-900">
        The roast log
      </h1>
      <p id="slow-intro" className="mt-3 text-lg text-slate-600">
        This heading and this paragraph are in the server HTML. The article
        below is not.
      </p>

      <hr id="slow-divider" className="my-8 border-slate-200" />

      <SlowContent />
    </section>
  );
}
