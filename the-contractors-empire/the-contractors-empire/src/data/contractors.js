/**
 * ─────────────────────────────────────────────────────────────────────────
 *  The Contractors Empire — Contractor Data
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  This file is the single source of truth for the directory while you are
 *  using sample data. Each contractor follows the schema below. When you are
 *  ready to plug in a real database (Supabase, Postgres, Airtable, Firebase,
 *  a REST/GraphQL API, etc.), you only need to:
 *
 *    1. Keep this exact field shape on your records, and
 *    2. Replace the `getContractors()` / `getContractorBySlug()` functions
 *       at the bottom with `fetch(...)` calls to your API.
 *
 *  Nothing else in the app reads the array directly — every component goes
 *  through the helper functions, so the swap is contained to this one file.
 *
 *  ── SCHEMA ───────────────────────────────────────────────────────────────
 *  id            string   unique id (use your DB primary key)
 *  slug          string   url-safe id used in /contractor/:slug
 *  name          string   business name
 *  trade         string   must match one of TRADES below (lowercase key)
 *  tier          string   'basic' | 'pro' | 'premium' (drives placement)
 *  featured      boolean  show the "Featured" badge + boost in sorting
 *  city          string
 *  state         string   two-letter code, e.g. "TX"
 *  zip           string
 *  rating        number   0–5, one decimal
 *  reviewCount   number
 *  phone         string   display format, e.g. "(512) 555-0142"
 *  website       string   full url or "" if none
 *  facebook      string   full url or "" if none
 *  logo          string   image url (square works best)
 *  description   string   short paragraph for cards + profile
 *  services      string[] list of offered services
 *  serviceArea   string   human-readable coverage area
 *  reviews       [{ author, rating, text }]
 *  ─────────────────────────────────────────────────────────────────────────
 */

// Canonical trade categories. Add/rename here and the filters update.
export const TRADES = {
  roofing: 'Roofing',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  hvac: 'HVAC',
  general: 'General Contracting',
  landscaping: 'Landscaping',
  painting: 'Painting',
  flooring: 'Flooring',
}

/**
 * Generates a self-contained placeholder logo (no external service, works
 * offline) from a business name's initials on the brand navy with gold text.
 * Swap the `logo` field for a real uploaded image URL whenever you have one.
 */
const logo = (name) => {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="16" fill="#0F1E40"/><text x="50%" y="50%" dy="2" text-anchor="middle" dominant-baseline="middle" font-family="Sora, Arial, sans-serif" font-size="36" font-weight="700" fill="#E0A93B">${initials}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const CONTRACTORS = [
  {
    id: 'c-001',
    slug: 'summit-peak-roofing',
    name: 'Summit Peak Roofing',
    trade: 'roofing',
    tier: 'premium',
    featured: true,
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    rating: 4.9,
    reviewCount: 214,
    phone: '(512) 555-0142',
    website: 'https://example.com',
    facebook: 'https://facebook.com',
    logo: logo('Summit Peak Roofing'),
    description:
      'Licensed and insured roofing specialists serving Central Texas for over 18 years. Storm-damage experts and certified installers for asphalt, metal, and tile roofs.',
    services: ['Roof Replacement', 'Storm & Hail Repair', 'Metal Roofing', 'Inspections', 'Gutter Installation'],
    serviceArea: 'Austin & 60-mile radius (Round Rock, Cedar Park, San Marcos)',
    reviews: [
      { author: 'Marcus D.', rating: 5, text: 'Replaced our whole roof after a hailstorm in two days. Handled the insurance paperwork start to finish.' },
      { author: 'Priya N.', rating: 5, text: 'Honest crew, fair quote, no upsell. The new metal roof looks incredible.' },
      { author: 'Tom W.', rating: 4, text: 'Great work and very responsive. Minor scheduling delay but they kept me informed.' },
    ],
  },
  {
    id: 'c-002',
    slug: 'ironclad-electric',
    name: 'Ironclad Electric',
    trade: 'electrical',
    tier: 'premium',
    featured: true,
    city: 'Denver',
    state: 'CO',
    zip: '80202',
    rating: 4.8,
    reviewCount: 167,
    phone: '(303) 555-0188',
    website: 'https://example.com',
    facebook: '',
    logo: logo('Ironclad Electric'),
    description:
      'Master electricians for residential and light commercial work. Panel upgrades, EV chargers, and whole-home rewires done to code, on schedule.',
    services: ['Panel Upgrades', 'EV Charger Install', 'Rewiring', 'Lighting Design', 'Generator Hookups'],
    serviceArea: 'Denver Metro, Aurora, Lakewood, Boulder',
    reviews: [
      { author: 'Sandra K.', rating: 5, text: 'Installed a Tesla charger and upgraded my panel. Clean, fast, and explained everything.' },
      { author: 'Devin R.', rating: 5, text: 'Showed up on time and fixed a wiring issue three other electricians missed.' },
    ],
  },
  {
    id: 'c-003',
    slug: 'blue-river-plumbing',
    name: 'Blue River Plumbing',
    trade: 'plumbing',
    tier: 'pro',
    featured: false,
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    rating: 4.7,
    reviewCount: 132,
    phone: '(503) 555-0119',
    website: 'https://example.com',
    facebook: 'https://facebook.com',
    logo: logo('Blue River Plumbing'),
    description:
      '24/7 emergency plumbing and trenchless repair. Family-owned, upfront flat-rate pricing, and a one-year workmanship guarantee on every job.',
    services: ['Emergency Repair', 'Water Heaters', 'Trenchless Sewer', 'Repiping', 'Drain Cleaning'],
    serviceArea: 'Portland, Beaverton, Gresham, Hillsboro',
    reviews: [
      { author: 'Elena M.', rating: 5, text: 'Burst pipe at 11pm — they were here within the hour. Lifesavers.' },
      { author: 'Greg P.', rating: 4, text: 'Fair flat-rate price and tidy work. Would call again.' },
    ],
  },
  {
    id: 'c-004',
    slug: 'comfort-zone-hvac',
    name: 'Comfort Zone HVAC',
    trade: 'hvac',
    tier: 'pro',
    featured: false,
    city: 'Phoenix',
    state: 'AZ',
    zip: '85004',
    rating: 4.8,
    reviewCount: 198,
    phone: '(602) 555-0173',
    website: 'https://example.com',
    facebook: '',
    logo: logo('Comfort Zone HVAC'),
    description:
      'Desert-tested heating and cooling. NATE-certified techs, energy-efficient system installs, and maintenance plans that keep your AC alive through Phoenix summers.',
    services: ['AC Install & Repair', 'Heat Pumps', 'Ductwork', 'Tune-Ups', 'Indoor Air Quality'],
    serviceArea: 'Phoenix, Scottsdale, Tempe, Mesa, Chandler',
    reviews: [
      { author: 'Hannah B.', rating: 5, text: 'New AC unit installed in a single morning during a heatwave. Cool again same day.' },
      { author: 'Luis A.', rating: 5, text: 'Maintenance plan caught a problem early and saved me a full replacement.' },
    ],
  },
  {
    id: 'c-005',
    slug: 'cornerstone-construction',
    name: 'Cornerstone Construction Co.',
    trade: 'general',
    tier: 'premium',
    featured: true,
    city: 'Nashville',
    state: 'TN',
    zip: '37203',
    rating: 4.9,
    reviewCount: 276,
    phone: '(615) 555-0150',
    website: 'https://example.com',
    facebook: 'https://facebook.com',
    logo: logo('Cornerstone Construction'),
    description:
      'Full-service general contractor for additions, remodels, and ground-up custom builds. Transparent budgets, dedicated project managers, and licensed subs only.',
    services: ['Home Additions', 'Kitchen & Bath Remodels', 'Custom Builds', 'Permitting', 'Design-Build'],
    serviceArea: 'Greater Nashville, Franklin, Brentwood, Murfreesboro',
    reviews: [
      { author: 'Rebecca T.', rating: 5, text: 'Our addition came in on budget and on time. The project manager was excellent.' },
      { author: 'James O.', rating: 5, text: 'They turned a dated kitchen into something out of a magazine.' },
    ],
  },
  {
    id: 'c-006',
    slug: 'evergreen-landscaping',
    name: 'Evergreen Landscaping',
    trade: 'landscaping',
    tier: 'basic',
    featured: false,
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    rating: 4.6,
    reviewCount: 89,
    phone: '(206) 555-0164',
    website: '',
    facebook: 'https://facebook.com',
    logo: logo('Evergreen Landscaping'),
    description:
      'Sustainable landscape design and maintenance built for the Pacific Northwest. Native plantings, hardscapes, and irrigation that thrives in any season.',
    services: ['Landscape Design', 'Hardscaping', 'Irrigation', 'Seasonal Maintenance', 'Retaining Walls'],
    serviceArea: 'Seattle, Bellevue, Redmond, Kirkland',
    reviews: [
      { author: 'Nina F.', rating: 5, text: 'Designed a low-maintenance native garden that looks great year-round.' },
      { author: 'Owen C.', rating: 4, text: 'Solid hardscape work. Communication could be a touch faster.' },
    ],
  },
  {
    id: 'c-007',
    slug: 'precision-painting-pros',
    name: 'Precision Painting Pros',
    trade: 'painting',
    tier: 'pro',
    featured: false,
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    rating: 4.7,
    reviewCount: 121,
    phone: '(312) 555-0137',
    website: 'https://example.com',
    facebook: '',
    logo: logo('Precision Painting'),
    description:
      'Interior and exterior painting with surgical prep and premium finishes. Clean crews, dustless sanding, and a color consultation included with every quote.',
    services: ['Interior Painting', 'Exterior Painting', 'Cabinet Refinishing', 'Drywall Repair', 'Color Consults'],
    serviceArea: 'Chicago, Evanston, Oak Park, Naperville',
    reviews: [
      { author: 'Carla S.', rating: 5, text: 'Cabinets look factory-new. Taped and protected everything perfectly.' },
      { author: 'Mike H.', rating: 4, text: 'Great finish and fair price. Showed up exactly when promised.' },
    ],
  },
  {
    id: 'c-008',
    slug: 'solid-ground-flooring',
    name: 'Solid Ground Flooring',
    trade: 'flooring',
    tier: 'basic',
    featured: false,
    city: 'Atlanta',
    state: 'GA',
    zip: '30303',
    rating: 4.5,
    reviewCount: 74,
    phone: '(404) 555-0192',
    website: 'https://example.com',
    facebook: 'https://facebook.com',
    logo: logo('Solid Ground Flooring'),
    description:
      'Hardwood, luxury vinyl, and tile installation with dust-controlled removal. Straightforward pricing and a crew that treats your home like their own.',
    services: ['Hardwood Install', 'Luxury Vinyl Plank', 'Tile & Stone', 'Refinishing', 'Subfloor Repair'],
    serviceArea: 'Atlanta, Marietta, Decatur, Sandy Springs',
    reviews: [
      { author: 'Tasha L.', rating: 5, text: 'Refinished our original hardwoods beautifully. They look brand new.' },
      { author: 'Derek J.', rating: 4, text: 'Good LVP install across the whole main floor. Happy with the result.' },
    ],
  },
  {
    id: 'c-009',
    slug: 'apex-mechanical-hvac',
    name: 'Apex Mechanical',
    trade: 'hvac',
    tier: 'basic',
    featured: false,
    city: 'Minneapolis',
    state: 'MN',
    zip: '55401',
    rating: 4.6,
    reviewCount: 102,
    phone: '(612) 555-0128',
    website: '',
    facebook: '',
    logo: logo('Apex Mechanical'),
    description:
      'Cold-climate heating specialists. High-efficiency furnaces, boiler service, and emergency no-heat calls answered around the clock all winter long.',
    services: ['Furnace Install', 'Boiler Service', 'No-Heat Emergencies', 'Smart Thermostats', 'Tune-Ups'],
    serviceArea: 'Minneapolis, St. Paul, Bloomington, Edina',
    reviews: [
      { author: 'Brett W.', rating: 5, text: 'Furnace died at -10°F and they had us warm again before midnight.' },
      { author: 'Yuki T.', rating: 4, text: 'Reliable annual service. Honest about what does and does not need fixing.' },
    ],
  },
  {
    id: 'c-010',
    slug: 'liberty-general-contracting',
    name: 'Liberty General Contracting',
    trade: 'general',
    tier: 'pro',
    featured: false,
    city: 'Tampa',
    state: 'FL',
    zip: '33602',
    rating: 4.7,
    reviewCount: 143,
    phone: '(813) 555-0156',
    website: 'https://example.com',
    facebook: 'https://facebook.com',
    logo: logo('Liberty General'),
    description:
      'Remodels, repairs, and hurricane-ready upgrades across the Gulf Coast. Impact windows, roof reinforcement, and whole-home renovations under one license.',
    services: ['Whole-Home Remodels', 'Impact Windows', 'Storm Hardening', 'Bathroom Remodels', 'Repairs'],
    serviceArea: 'Tampa, St. Petersburg, Clearwater, Brandon',
    reviews: [
      { author: 'Gloria R.', rating: 5, text: 'Installed impact windows ahead of season and the whole house feels solid now.' },
      { author: 'Sam P.', rating: 4, text: 'Quality remodel. They communicated well through every phase.' },
    ],
  },
]

/* ───────────────────────────────────────────────────────────────────────────
 *  QUERY HELPERS
 *  These are the ONLY functions the app should call. Swap their bodies for
 *  real API requests later and the UI keeps working unchanged.
 * ─────────────────────────────────────────────────────────────────────────── */

// Featured/premium first, then by rating. Tweak to taste.
function sortForDirectory(list) {
  const tierRank = { premium: 0, pro: 1, basic: 2 }
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    if (tierRank[a.tier] !== tierRank[b.tier]) return tierRank[a.tier] - tierRank[b.tier]
    return b.rating - a.rating
  })
}

/**
 * Returns contractors matching the given filters.
 * @param {{ query?: string, trade?: string }} opts
 *
 * LATER (real DB) — replace the body with, e.g.:
 *   const res = await fetch(`/api/contractors?query=${query}&trade=${trade}`)
 *   return res.json()
 * and mark this function `async`.
 */
export function getContractors({ query = '', trade = 'all' } = {}) {
  const q = query.trim().toLowerCase()
  let list = CONTRACTORS

  if (trade && trade !== 'all') {
    list = list.filter((c) => c.trade === trade)
  }

  if (q) {
    list = list.filter((c) => {
      const haystack = [
        c.name,
        TRADES[c.trade],
        c.city,
        c.state,
        c.zip,
        ...c.services,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }

  return sortForDirectory(list)
}

/**
 * Returns a single contractor by slug, or undefined.
 * LATER: replace with `await fetch('/api/contractors/' + slug)`.
 */
export function getContractorBySlug(slug) {
  return CONTRACTORS.find((c) => c.slug === slug)
}

// A few featured records for the homepage preview strip.
export function getFeaturedContractors(limit = 3) {
  return sortForDirectory(CONTRACTORS.filter((c) => c.featured)).slice(0, limit)
}
