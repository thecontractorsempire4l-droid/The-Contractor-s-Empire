import { useParams, Link } from 'react-router-dom'
import StarRating from '../components/StarRating.jsx'
import {
  PhoneIcon,
  GlobeIcon,
  FacebookIcon,
  PinIcon,
  CheckIcon,
  ArrowRightIcon,
  ShieldIcon,
} from '../components/Icons.jsx'
import { getContractorBySlug, TRADES } from '../data/contractors.js'

export default function ProfilePage() {
  const { slug } = useParams()
  const contractor = getContractorBySlug(slug)

  // Not found state
  if (!contractor) {
    return (
      <div className="container-empire py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold">Contractor not found</h1>
        <p className="mt-3 text-empire-mute">
          This listing may have been removed or the link is incorrect.
        </p>
        <Link to="/directory" className="btn-gold mt-6 inline-flex">
          Back to directory
        </Link>
      </div>
    )
  }

  const {
    name,
    trade,
    tier,
    featured,
    city,
    state,
    rating,
    reviewCount,
    phone,
    website,
    facebook,
    logo,
    description,
    services,
    serviceArea,
    reviews,
  } = contractor

  const telHref = `tel:${phone.replace(/[^\d+]/g, '')}`

  return (
    <div className="py-10 sm:py-14">
      <div className="container-empire">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-empire-mute">
          <Link to="/directory" className="hover:text-empire-ink">
            Directory
          </Link>
          <span>/</span>
          <span className="text-empire-ink">{name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2">
            {/* Header card */}
            <div className="card overflow-hidden">
              <div className="relative h-32 bg-empire-grid [background-size:36px_36px] bg-empire-panel">
                <div className="absolute inset-0 bg-gradient-to-t from-empire-surface to-transparent" />
              </div>
              <div className="-mt-12 px-6 pb-6">
                <img
                  src={logo}
                  alt=""
                  className="h-24 w-24 rounded-2xl border-4 border-empire-surface bg-empire-panel object-cover"
                />
                <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{name}</h1>
                      {featured && (
                        <span className="rounded-full bg-empire-gold/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-empire-gold">
                          Featured
                        </span>
                      )}
                      {tier === 'premium' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-empire-steel/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-empire-steel">
                          <ShieldIcon className="h-3.5 w-3.5" /> Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-medium text-empire-steel">{TRADES[trade]}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-empire-mute">
                      <PinIcon className="h-4 w-4" /> {city}, {state}
                    </p>
                  </div>
                  <StarRating rating={rating} count={reviewCount} size="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* About */}
            <section className="card mt-6 p-6">
              <h2 className="font-display text-xl font-bold">About</h2>
              <p className="mt-3 leading-relaxed text-empire-ink/90">{description}</p>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-empire-mute">
                Service area
              </h3>
              <p className="mt-2 flex items-center gap-2 text-empire-ink/90">
                <PinIcon className="h-4 w-4 text-empire-gold" /> {serviceArea}
              </p>
            </section>

            {/* Services */}
            <section className="card mt-6 p-6">
              <h2 className="font-display text-xl font-bold">Services</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-empire-ink/90">
                    <CheckIcon className="h-4 w-4 shrink-0 text-empire-gold" />
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            {/* Reviews */}
            <section className="card mt-6 p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">Reviews</h2>
                <StarRating rating={rating} count={reviewCount} />
              </div>
              <div className="mt-5 space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="rounded-xl border border-empire-line bg-empire-navy/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{r.author}</span>
                      <StarRating rating={r.rating} showValue={false} />
                    </div>
                    <p className="mt-2 text-sm text-empire-ink/90">{r.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky contact sidebar */}
          <aside className="lg:col-span-1">
            <div className="card sticky top-24 p-6">
              <h2 className="font-display text-lg font-bold">Contact {name}</h2>
              <p className="mt-1 text-sm text-empire-mute">
                Reach out directly — you deal with the contractor, not a middleman.
              </p>

              <div className="mt-5 space-y-3">
                <a href={telHref} className="btn-gold w-full">
                  <PhoneIcon className="h-4 w-4" /> {phone}
                </a>

                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost w-full"
                  >
                    <GlobeIcon className="h-4 w-4 text-empire-gold" /> Visit website
                  </a>
                )}

                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost w-full"
                  >
                    <FacebookIcon className="h-4 w-4 text-empire-gold" /> Facebook page
                  </a>
                )}
              </div>

              <div className="mt-6 border-t border-empire-line pt-5">
                <Link
                  to="/directory"
                  className="flex items-center justify-center gap-1.5 text-sm font-medium text-empire-steel hover:text-empire-ink"
                >
                  Back to all contractors <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
