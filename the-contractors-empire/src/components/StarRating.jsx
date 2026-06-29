import { StarIcon } from './Icons.jsx'

/**
 * Renders 5 stars with the filled portion matching `rating` (0–5).
 * Pass showValue to print the numeric rating + optional review count.
 */
export default function StarRating({ rating = 0, count, showValue = true, size = 'h-4 w-4' }) {
  const rounded = Math.round(rating)

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex text-empire-gold">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} className={size} filled={i <= rounded} />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-empire-ink">
          {rating.toFixed(1)}
          {typeof count === 'number' && (
            <span className="font-normal text-empire-mute"> ({count})</span>
          )}
        </span>
      )}
    </div>
  )
}
