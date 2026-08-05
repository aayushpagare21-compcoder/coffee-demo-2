import { imageUrl } from "@/lib/images";
import PricingTable from "@/components/pricing-table";

/**
 * SECTION ADD / REMOVE / MOVE TESTING.
 *
 * Eight sibling <section> elements, in document order, each with a distinct
 * background colour. The colours are the point: if a variant reorders,
 * removes or injects a section, the change is obvious at a glance and in a
 * screenshot diff, without having to read any copy.
 *
 * Document order: hero, benefits, how, pricing, testimonials, faq,
 * guarantee, cta.
 */
export default function SectionsPage() {
  return (
    <>
      {/* 1 ------------------------------------------------------------- */}
      <section id="section-hero" className="bg-[#0f172a] px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <h2 id="section-hero-title" className="text-4xl font-extrabold tracking-tight">
            A subscription that ends the weekly bean decision
          </h2>
          <p id="section-hero-copy" className="mt-4 max-w-2xl text-lg text-slate-300">
            Pick a weight and a cadence. We roast on the Tuesday, it is on your
            counter by the Friday, and the hardware discount runs the whole time.
          </p>
          <a
            id="section-hero-cta"
            href="#section-pricing"
            className="mt-8 inline-block rounded bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-amber-400"
          >
            Jump to the three plans
          </a>
        </div>
      </section>

      {/* 2 ------------------------------------------------------------- */}
      <section id="section-benefits" className="bg-[#fef3c7] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2
            id="section-benefits-title"
            className="text-3xl font-bold tracking-tight text-slate-900"
          >
            Four reasons the workshop keeps its customers
          </h2>
          <div id="benefits-grid" className="mt-8 grid gap-6 sm:grid-cols-2">
            <div id="benefit-1" className="benefit-item rounded-lg bg-white/70 p-5">
              <h3 className="benefit-title text-lg font-semibold text-slate-900">
                Roasted to order, never to stock
              </h3>
              <p className="benefit-copy mt-2 text-sm text-slate-700">
                Nothing sits in a warehouse. Your bag carries a roast date, not
                a best-before guess.
              </p>
            </div>
            <div id="benefit-2" className="benefit-item rounded-lg bg-white/70 p-5">
              <h3 className="benefit-title text-lg font-semibold text-slate-900">
                Hardware you can take apart
              </h3>
              <p className="benefit-copy mt-2 text-sm text-slate-700">
                Every fastener is a standard size and every gasket has a part
                number you can order on its own.
              </p>
            </div>
            <div id="benefit-3" className="benefit-item rounded-lg bg-white/70 p-5">
              <h3 className="benefit-title text-lg font-semibold text-slate-900">
                A recipe in the box, not a slogan
              </h3>
              <p className="benefit-copy mt-2 text-sm text-slate-700">
                Each lot ships with a dose, a grind setting and a pour schedule
                that our head roaster actually used.
              </p>
            </div>
            <div id="benefit-4" className="benefit-item rounded-lg bg-white/70 p-5">
              <h3 className="benefit-title text-lg font-semibold text-slate-900">
                One invoice, no surprise duty
              </h3>
              <p className="benefit-copy mt-2 text-sm text-slate-700">
                Duties are prepaid for the EU, the UK, Canada and Australia, so
                nothing is collected at the door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 ------------------------------------------------------------- */}
      <section id="section-how" className="bg-[#dbeafe] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2
            id="section-how-title"
            className="text-3xl font-bold tracking-tight text-slate-900"
          >
            How a subscription actually runs
          </h2>
          <ol id="how-steps" className="mt-8 grid gap-6 sm:grid-cols-3">
            <li id="how-step-1" className="how-step rounded-lg bg-white p-5">
              <span className="how-step-number text-sm font-bold text-blue-700">
                Step one
              </span>
              <h3 className="how-step-title mt-1 text-lg font-semibold text-slate-900">
                Tell us what you brew on
              </h3>
              <p className="how-step-copy mt-2 text-sm text-slate-700">
                Six questions about your grinder, your water and how many cups
                leave the kitchen each morning.
              </p>
            </li>
            <li id="how-step-2" className="how-step rounded-lg bg-white p-5">
              <span className="how-step-number text-sm font-bold text-blue-700">
                Step two
              </span>
              <h3 className="how-step-title mt-1 text-lg font-semibold text-slate-900">
                We match a lot to the answers
              </h3>
              <p className="how-step-copy mt-2 text-sm text-slate-700">
                A roaster picks the origin, not an algorithm, and writes the
                dialling card by hand.
              </p>
            </li>
            <li id="how-step-3" className="how-step rounded-lg bg-white p-5">
              <span className="how-step-number text-sm font-bold text-blue-700">
                Step three
              </span>
              <h3 className="how-step-title mt-1 text-lg font-semibold text-slate-900">
                Adjust it after the first bag
              </h3>
              <p className="how-step-copy mt-2 text-sm text-slate-700">
                Tell us it was too bright or too flat and the next lot moves in
                the other direction.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* 4 ------------------------------------------------------------- */}
      <section id="section-pricing" className="bg-[#dcfce7] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2
            id="section-pricing-title"
            className="text-center text-3xl font-bold tracking-tight text-slate-900"
          >
            Three plans, and you can leave from any of them
          </h2>
          <p
            id="section-pricing-copy"
            className="mx-auto mt-3 mb-10 max-w-2xl text-center text-slate-700"
          >
            No contract, no minimum term. Annual billing takes two months off
            the price and nothing else changes.
          </p>
          <PricingTable />
        </div>
      </section>

      {/* 5 ------------------------------------------------------------- */}
      <section id="section-testimonials" className="bg-[#fae8ff] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2
            id="section-testimonials-title"
            className="text-3xl font-bold tracking-tight text-slate-900"
          >
            Three subscribers, three very different kitchens
          </h2>
          <div id="section-testimonial-grid" className="mt-8 grid gap-6 md:grid-cols-3">
            <figure
              id="section-testimonial-1"
              className="section-testimonial rounded-lg bg-white p-6"
            >
              <blockquote className="section-testimonial-quote text-sm leading-relaxed text-slate-700">
                The dialling card is the part I did not expect to need and now
                cannot brew without.
              </blockquote>
              <figcaption className="section-testimonial-author mt-4 text-sm font-semibold text-slate-900">
                Annika Sorensen, on the Bench plan
              </figcaption>
            </figure>
            <figure
              id="section-testimonial-2"
              className="section-testimonial rounded-lg bg-white p-6"
            >
              <blockquote className="section-testimonial-quote text-sm leading-relaxed text-slate-700">
                We moved the whole studio onto Workshop and the coffee argument
                simply stopped.
              </blockquote>
              <figcaption className="section-testimonial-author mt-4 text-sm font-semibold text-slate-900">
                Bruno Halloran, on the Workshop plan
              </figcaption>
            </figure>
            <figure
              id="section-testimonial-3"
              className="section-testimonial rounded-lg bg-white p-6"
            >
              <blockquote className="section-testimonial-quote text-sm leading-relaxed text-slate-700">
                The on-site grinder service alone is worth more than the plan
                costs us in a year.
              </blockquote>
              <figcaption className="section-testimonial-author mt-4 text-sm font-semibold text-slate-900">
                Wren Adeyemi, on the Counter plan
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 6 ------------------------------------------------------------- */}
      <section id="section-faq" className="bg-[#ffe4e6] px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2
            id="section-faq-title"
            className="text-3xl font-bold tracking-tight text-slate-900"
          >
            Four questions we get about the plans
          </h2>
          <dl id="section-faq-list" className="mt-8 space-y-6">
            <div id="section-faq-1" className="section-faq-item">
              <dt className="section-faq-question text-base font-semibold text-slate-900">
                Can I change plan halfway through a month?
              </dt>
              <dd className="section-faq-answer mt-1 text-sm text-slate-700">
                Yes, and the change takes effect on the next roast day. We
                prorate the difference automatically.
              </dd>
            </div>
            <div id="section-faq-2" className="section-faq-item">
              <dt className="section-faq-question text-base font-semibold text-slate-900">
                What happens if I go away for a month?
              </dt>
              <dd className="section-faq-answer mt-1 text-sm text-slate-700">
                Pause from the account page. Paused months are not billed and
                your hardware discount stays active.
              </dd>
            </div>
            <div id="section-faq-3" className="section-faq-item">
              <dt className="section-faq-question text-base font-semibold text-slate-900">
                Do the annual plans lock me in?
              </dt>
              <dd className="section-faq-answer mt-1 text-sm text-slate-700">
                No. Cancel an annual plan and we refund the unused months at the
                monthly rate.
              </dd>
            </div>
            <div id="section-faq-4" className="section-faq-item">
              <dt className="section-faq-question text-base font-semibold text-slate-900">
                Can I send a plan to someone else as a gift?
              </dt>
              <dd className="section-faq-answer mt-1 text-sm text-slate-700">
                You can, for three, six or twelve months. It arrives with a
                printed card and no pricing anywhere in the box.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 7 ------------------------------------------------------------- */}
      <section id="section-guarantee" className="bg-[#e0e7ff] px-4 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row">
          <img
            id="section-guarantee-img"
            className="h-40 w-40 rounded-full object-cover"
            src={imageUrl("ods-guarantee", 320, 320)}
            alt="A workshop technician stamping a warranty card"
            width={320}
            height={320}
            loading="lazy"
          />
          <div>
            <h2
              id="section-guarantee-title"
              className="text-3xl font-bold tracking-tight text-slate-900"
            >
              If the first bag disappoints you, it is free
            </h2>
            <p id="section-guarantee-copy" className="mt-3 max-w-2xl text-slate-700">
              Reply to the dispatch email within fourteen days and we refund the
              first delivery in full. You keep the coffee, and we would rather
              you told us what was wrong with it.
            </p>
          </div>
        </div>
      </section>

      {/* 8 ------------------------------------------------------------- */}
      <section id="section-cta" className="bg-[#1e293b] px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="section-cta-title" className="text-3xl font-bold tracking-tight">
            Ready to stop guessing at the grocery aisle?
          </h2>
          <p id="section-cta-copy" className="mt-3 text-slate-300">
            Start on any plan today and move up, down or out whenever it suits.
          </p>
          <div id="section-cta-actions" className="mt-8 flex justify-center gap-3">
            <a
              id="section-cta-primary"
              href="#section-pricing"
              className="rounded bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-amber-400"
            >
              Choose a plan now
            </a>
            <a
              id="section-cta-secondary"
              href="/about"
              className="rounded border border-slate-500 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Read about the workshop
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
