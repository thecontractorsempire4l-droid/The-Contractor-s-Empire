import { Link } from 'react-router-dom'
import StarRating from './StarRating.jsx'
import { PhoneIcon, PinIcon, ArrowRightIcon } from './Icons.jsx'
import { TRADES } from '../data/contractors.js'

export default function ContractorCard({ contractor }) {
  const { slug, name, trade, city, state, rating, reviewCount, phone, logo, featured, description } =
    contractor

  return (
    <article className="card group flex flex-col p-5 transition hover:border-empire-steel/60">
      <div className="flex items-start gap-4">
        <img
          src={logo}
          alt=""
          className="h-14 w-14 shrink-0 rounded-xl border border-empire-line bg-empire-panel object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-display text-lg font-bold leading-tight">{name}</h3>
            {featured && (
              <span className="shrink-0 rounded-full bg-empire-gold/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-empire-gold">
                Featured
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm font-medium text-empire-steel">{TRADES[trade]}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-empire-mute">
            <PinIcon className="h-4 w-4" />
            {city}, {state}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-empire-mute">{description}</p>

      <div className="mt-4">
        <StarRating rating={rating} count={reviewCount} />
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-empire-line pt-4">
        <a
          href={`tel:${phone.replace(/[^\d+]/g, '')}`}
          className="btn-ghost flex-1 py-2.5 text-sm"
          aria-label={`Call ${name}`}
        >
          <PhoneIcon className="h-4 w-4 text-empire-gold" />
          Call
        </a>
        <Link to={`/contractor/${slug}`} className="btn-gold flex-1 py-2.5 text-sm">
          View Profile
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
