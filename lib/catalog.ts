/**
 * Deterministic content for opti-demo-store.
 *
 * Nothing here is random and nothing depends on the clock: the same index
 * always produces the same title, price and image seed. That matters because
 * an A/B script targets elements by CSS selector *plus* a visible-text anchor,
 * so the copy has to be byte-stable across renders, deploys and machines.
 *
 * Uniqueness guarantees (relied on by docs/selectors.md and by QA):
 *   - all 100 product titles are distinct
 *   - all 100 product descriptions are distinct
 *   - all 20 testimonial quotes / authors are distinct
 *   - all 20 FAQ questions / answers are distinct
 *
 * This file is also imported by scripts/gen-selectors.ts, which is run by
 * plain Node with type stripping. Keep it to type aliases and plain functions:
 * no enums, no namespaces, no decorators.
 */

import { imageUrl } from "./images";

/* -------------------------------------------------------------------------
 * Products
 * ---------------------------------------------------------------------- */

export type Product = {
  /** 1-based; the card root is `#card-${index}`. */
  index: number;
  sku: string;
  title: string;
  description: string;
  badge: string;
  price: string;
  priceWas: string;
  rating: number;
  ratingStars: number;
  ratingCount: number;
  stock: string;
  tags: [string, string];
  imgSrc: string;
  imgAlt: string;
};

/* brand[i % 10] x type[floor(i / 10)] covers all 100 pairs exactly once,
 * which is what makes every generated title unique. */
const BRANDS = [
  "Basalt",
  "Cinder",
  "Meridian",
  "Nordhavn",
  "Auric",
  "Tidewater",
  "Kestrel",
  "Foxglove",
  "Marlowe",
  "Vantage",
];

const LINES = [
  "Origin",
  "Studio",
  "Field",
  "Atlas",
  "Signature",
  "Compact",
  "Pro",
  "Heritage",
  "Lumen",
  "Reserve",
];

const TYPES = [
  "Pour-Over Dripper",
  "Conical Burr Grinder",
  "Gooseneck Kettle",
  "Espresso Tamper",
  "French Press",
  "Travel Press Kit",
  "Milk Frothing Pitcher",
  "Brew Scale",
  "Cold Brew Carafe",
  "Bottomless Portafilter",
];

/* Indexed by product type, so the opening sentence always matches the item. */
const OPENERS = [
  "Machined from a single billet of anodised aluminium, it holds a steady 60-degree cone from first bloom to last drip.",
  "Hardened 40 mm conical burrs step through 41 click-stopped settings without a single tool.",
  "A counterbalanced spout gives you a pencil-thin pour at any flow rate, hot plate or open flame.",
  "A 58.5 mm stainless base and a self-levelling collar keep every puck flat, even on a rushed shot.",
  "Double-walled borosilicate glass and a three-stage steel mesh keep grit out of the cup for good.",
  "A vacuum-sealed 350 ml body brews and drinks from the same vessel, so nothing else has to be packed.",
  "A sharpened, lined spout and a 600 ml belly make latte art repeatable instead of lucky.",
  "0.1 g resolution, a 0.4 second refresh and a live flow-rate readout on the second line.",
  "A 1.5 litre carafe with a removable 200-micron filter core that lifts straight out for rinsing.",
  "A naked 58 mm basket seat machined to two hundredths of a millimetre so you can read every extraction.",
];

const MIDDLES = [
  "It ships pre-seasoned and needs no break-in period.",
  "Every unit is bench-tested for twelve hours before it leaves the workshop.",
  "The walnut handle is finished by hand with a food-safe oil.",
  "Dishwasher-safe on the top rack, though we would rather you rinsed it.",
  "Spare parts are stocked for a decade, down to the last gasket.",
  "It nests inside a standard 60 mm brew stand without an adapter.",
  "The matte powder coat shrugs off fingerprints and hard-water spotting.",
  "Weight is biased toward the base so it will not tip on a wet counter.",
  "Assembly takes one turn of the collar and no hardware at all.",
  "It packs flat enough to travel in a carry-on side pocket.",
];

const CLOSERS = [
  "Backed by our two-year workshop warranty.",
  "Free returns for sixty days, no questions asked.",
  "Ships carbon-neutral from our Portland bench.",
  "Includes a printed dialling card for your first ten brews.",
  "Replacement seals are free for the life of the product.",
  "Bundled with a linen storage sleeve.",
  "Rated for daily cafe service, not just weekends.",
  "Repairable at any of our nine service partners.",
  "Arrives in plastic-free packaging you can compost.",
  "Includes a QR-linked brew guide filmed with our head roaster.",
];

const BADGES = [
  "Best Seller",
  "New Arrival",
  "Limited Run",
  "Back In Stock",
  "Staff Pick",
  "Bundle Deal",
];

const TAGS = [
  "Ceramic",
  "Stainless",
  "Travel",
  "Manual",
  "Electric",
  "Barista",
  "Gift",
  "Compact",
];

const STOCK = [
  "In stock - ships today",
  "In stock - ships tomorrow",
  "Low stock - 4 left",
  "Made to order - 5 days",
];

function buildProduct(i: number): Product {
  const brand = BRANDS[i % 10];
  const type = TYPES[Math.floor(i / 10)];
  const line = LINES[(i * 3) % 10];

  const rating = Math.round((3.6 + ((i * 13) % 15) / 10) * 10) / 10;
  const price = 19 + i * 2.35;

  return {
    index: i + 1,
    sku: `ODS-${String(i + 1).padStart(3, "0")}`,
    title: `${brand} ${line} ${type}`,
    description: `${OPENERS[Math.floor(i / 10)]} ${MIDDLES[i % 10]} ${
      CLOSERS[(i * 7) % 10]
    }`,
    badge: BADGES[i % 6],
    price: price.toFixed(2),
    priceWas: (price * 1.28).toFixed(2),
    rating,
    ratingStars: Math.round(rating),
    ratingCount: 12 + ((i * 37) % 880),
    stock: STOCK[i % 4],
    tags: [TAGS[i % 8], TAGS[(i * 3 + 1) % 8]],
    imgSrc: imageUrl(`ods-gear-${i + 1}`, 400, 300),
    imgAlt: `${brand} ${line} ${type} on a workshop bench`,
  };
}

export const PRODUCTS: Product[] = Array.from({ length: 100 }, (_, i) =>
  buildProduct(i),
);

/* -------------------------------------------------------------------------
 * Testimonials
 * ---------------------------------------------------------------------- */

export type Testimonial = {
  /** 1-based; the root is `#testimonial-${index}`. */
  index: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

const TESTIMONIAL_SOURCE: Array<[string, string, string]> = [
  [
    "We replaced three drippers with one and our morning queue got twenty seconds shorter.",
    "Marta Delacroix",
    "Head Barista, Ninth Street Roasters",
  ],
  [
    "The grinder held its setting through an entire festival weekend without a single recalibration.",
    "Idris Fenwick",
    "Owner, Fenwick Coffee Cart",
  ],
  [
    "I have dropped this kettle twice on a tile floor and it still pours dead straight.",
    "Yuki Tanabe",
    "Home Brewer, Osaka",
  ],
  [
    "Our training time for new staff halved once every station had the same tamper.",
    "Beatriz Salcedo",
    "Operations Lead, Corner Bean",
  ],
  [
    "The scale reads faster than I can pour, which is the first time I have been able to say that.",
    "Callum Rhys",
    "Competition Judge",
  ],
  [
    "Six months of daily service and the seals have not weeped once.",
    "Priya Raghunathan",
    "Cafe Manager, Two Rivers",
  ],
  [
    "It is the only travel press that has survived a full season of trail work.",
    "Sondre Aalborg",
    "Backcountry Guide",
  ],
  [
    "Latte art stopped being a coin flip the week this pitcher arrived.",
    "Naomi Okafor",
    "Barista Trainer",
  ],
  [
    "Customers ask about the carafe more often than they ask about the coffee in it.",
    "Emil Vasquez",
    "Founder, Slow Pour Club",
  ],
  [
    "The bottomless basket showed me a channelling problem I had been ignoring for a year.",
    "Hana Brekke",
    "Roaster, Northlight",
  ],
  [
    "Support shipped a replacement gasket before I had finished describing the fault.",
    "Tobias Lindqvist",
    "Equipment Buyer",
  ],
  [
    "We run four of these on the same bench and they still match cup for cup.",
    "Adaeze Nwankwo",
    "Quality Lead, Harbourside",
  ],
  [
    "Cleaning went from a nightly chore to something I do while the till closes.",
    "Rafael Monteiro",
    "Shift Supervisor",
  ],
  [
    "The dialling card in the box got my partner brewing properly in one afternoon.",
    "Greta Halvorsen",
    "Subscriber Since 2019",
  ],
  [
    "I bought one for the office and three people bought their own within a month.",
    "Devon Achebe",
    "Product Designer",
  ],
  [
    "It is the quietest grinder I have used that still finishes a dose in under fifteen seconds.",
    "Louise Marchetti",
    "Cafe Owner, Bellwether",
  ],
  [
    "Nothing about it has loosened, rattled or discoloured in two years of abuse.",
    "Ismail Karim",
    "Mobile Bar Operator",
  ],
  [
    "The packaging composted in our garden bin, which nobody on the team expected.",
    "Frida Ostergaard",
    "Sustainability Consultant",
  ],
  [
    "Our wholesale accounts started asking where we sourced the kit from.",
    "Julian Petrov",
    "Wholesale Director",
  ],
  [
    "Best money I have spent on coffee gear, and I have spent a genuinely silly amount.",
    "Cassandra Idowu",
    "Weekend Enthusiast",
  ],
];

export const TESTIMONIALS: Testimonial[] = TESTIMONIAL_SOURCE.map(
  ([quote, author, role], i) => ({
    index: i + 1,
    quote,
    author,
    role,
    avatar: imageUrl(`ods-person-${i + 1}`, 96, 96),
  }),
);

/* -------------------------------------------------------------------------
 * FAQ
 * ---------------------------------------------------------------------- */

export type FaqItem = {
  /** 1-based; the root is `#faq-${index}`. */
  index: number;
  question: string;
  answer: string;
};

const FAQ_SOURCE: Array<[string, string]> = [
  [
    "How quickly do orders leave the workshop?",
    "In-stock items are picked and packed the same working day if the order lands before 2pm Pacific. Made-to-order items list their build time on the product card.",
  ],
  [
    "Which countries can you ship to?",
    "We ship to 38 countries. Duties are prepaid for the EU, the UK, Canada and Australia, so the price you see at checkout is the price you pay at the door.",
  ],
  [
    "Can I return a grinder after I have run beans through it?",
    "Yes. We would rather you tested it properly. Run up to two kilograms through a grinder and you can still return it inside sixty days.",
  ],
  [
    "Do you offer a trade or wholesale account?",
    "We do, from five units a month. Trade accounts get net-30 terms, a dedicated technician and access to the spare-parts catalogue at cost.",
  ],
  [
    "What does the two-year warranty actually cover?",
    "Anything that fails through manufacture or normal use: motors, bearings, seals, coatings and electronics. It does not cover glass broken by a drop.",
  ],
  [
    "Are replacement parts sold separately?",
    "Every serviceable part is listed individually, down to the single silicone washer. We commit to stocking them for ten years after a model is retired.",
  ],
  [
    "How do I choose between a manual and an electric grinder?",
    "If you brew fewer than four cups a day and value silence, go manual. Past four cups a day, or if you pull espresso, the electric burrs pay for themselves in wrist fatigue alone.",
  ],
  [
    "Is the glassware safe on an induction hob?",
    "The borosilicate carafes are not. The stainless kettles are, and every induction-safe item carries an induction mark in the specification block.",
  ],
  [
    "Do your kettles hold temperature or only reach it?",
    "The variable-temperature models hold a set point for sixty minutes to within one degree. The stovetop models reach temperature and then coast.",
  ],
  [
    "Can I buy a gift card?",
    "Yes, in any amount from twenty-five upward. They never expire and they can be spent across the workshop, the subscription and the class programme.",
  ],
  [
    "What is included in a subscription?",
    "A rotating single-origin every two or four weeks, a printed brew guide for that lot, and ten percent off any hardware while the subscription is active.",
  ],
  [
    "How do I descale a kettle without wrecking the coating?",
    "Citric acid at fifteen grams per litre, left cold for an hour, then rinsed three times. Never use a chlorinated cleaner on the coated interiors.",
  ],
  [
    "Do you run repair services out of warranty?",
    "We do, at a flat bench fee plus parts. Most repairs are turned around within five working days of arriving at the workshop.",
  ],
  [
    "Are the scales accurate enough for competition use?",
    "Two of our scales are certified to 0.1 gram and are on the approved list for regional brewing competitions. The travel scale is not.",
  ],
  [
    "What is your packaging made from?",
    "Moulded paper pulp, uncoated board and paper tape. There is no plastic in the box, including the fill and the document wallet.",
  ],
  [
    "Can I collect an order in person?",
    "Yes, from the Portland workshop between 9am and 4pm on weekdays. Choose collection at checkout and we will hold the order for ten days.",
  ],
  [
    "Do you price match?",
    "We match any authorised stockist on identical stock for fourteen days after purchase. Send us the listing and we refund the difference.",
  ],
  [
    "How long do the burrs last before they need replacing?",
    "Between 800 and 1200 kilograms of coffee depending on the roast level. We sell a burr-wear gauge if you would rather measure than guess.",
  ],
  [
    "Is there a student or hospitality discount?",
    "There is fifteen percent off for anyone with a valid student card or a hospitality payslip. It stacks with the subscription discount.",
  ],
  [
    "Who do I contact if something arrives damaged?",
    "Reply to your order confirmation with a photograph. A replacement ships the same day and we arrange the return of the damaged item at our cost.",
  ],
];

export const FAQ_ITEMS: FaqItem[] = FAQ_SOURCE.map(([question, answer], i) => ({
  index: i + 1,
  question,
  answer,
}));

/* -------------------------------------------------------------------------
 * Hero carousel (client component, 3 slides, 4s interval)
 * ---------------------------------------------------------------------- */

export type CarouselSlide = {
  index: number;
  title: string;
  copy: string;
  imgSrc: string;
  imgAlt: string;
};

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    index: 1,
    title: "The Bench Series lands this week",
    copy: "Nine new pieces machined in Portland, built to be repaired rather than replaced.",
    imgSrc: imageUrl("ods-slide-1", 960, 420),
    imgAlt: "A workshop bench covered in freshly machined brewing gear",
  },
  {
    index: 2,
    title: "Grinders that hold their setting",
    copy: "Click-stopped burrs that stay where you left them, service after service.",
    imgSrc: imageUrl("ods-slide-2", 960, 420),
    imgAlt: "A conical burr grinder photographed from above",
  },
  {
    index: 3,
    title: "Free dialling card in every order",
    copy: "Ten guided brews that get you from unboxing to a repeatable recipe.",
    imgSrc: imageUrl("ods-slide-3", 960, 420),
    imgAlt: "A printed brewing dialling card next to a paper filter",
  },
];

/* -------------------------------------------------------------------------
 * /gallery
 * ---------------------------------------------------------------------- */

export type GalleryTile = {
  /** 1-based; the image is `#lazy-img-${index}`. */
  index: number;
  caption: string;
  imgSrc: string;
  imgAlt: string;
};

const GALLERY_CAPTIONS = [
  "Rough billet before the first cut",
  "Burr set inspected under the loupe",
  "Kettle spouts drying after anodising",
  "The tamper collar jig in mid-cycle",
  "Filter mesh wound by hand",
  "Powder coat curing at 180 degrees",
  "Walnut handles waiting for their second oil",
  "Bench test rig running an overnight cycle",
  "Carafes packed in moulded paper pulp",
  "Portafilter baskets sorted by tolerance",
  "The Friday morning cupping table",
  "Last light over the Portland workshop",
];

export const GALLERY_TILES: GalleryTile[] = GALLERY_CAPTIONS.map(
  (caption, i) => ({
    index: i + 1,
    caption,
    imgSrc: imageUrl(`ods-gallery-${i + 1}`, 600, 450),
    imgAlt: caption,
  }),
);
