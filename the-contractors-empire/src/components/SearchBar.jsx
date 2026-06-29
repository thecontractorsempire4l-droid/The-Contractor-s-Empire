import { SearchIcon, PinIcon } from './Icons.jsx'
import { TRADES } from '../data/contractors.js'

/**
 * Reusable search bar used on the hero (variant="hero") and on the
 * directory page (variant="inline"). Fully controlled by the parent.
 *
 * Props:
 *   query, trade            current values
 *   onQueryChange,          (string) => void
 *   onTradeChange           (string) => void
 *   onSubmit                () => void   (called on Enter / button)
 */
export default function SearchBar({
  query,
  trade,
  onQueryChange,
  onTradeChange,
  onSubmit,
  variant = 'hero',
}) {
  const isHero = variant === 'hero'

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-2 rounded-2xl border border-empire-line bg-empire-surface/90 p-2 shadow-card sm:flex-row sm:items-stretch ${
        isHero ? 'backdrop-blur' : ''
      }`}
    >
      {/* Search text */}
      <div className="flex flex-1 items-center gap-2 rounded-xl bg-empire-navy/60 px-3">
        <SearchIcon className="h-5 w-5 shrink-0 text-empire-mute" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by trade, business name, city or zip…"
          className="w-full bg-transparent py-3 text-empire-ink placeholder:text-empire-mute/70 focus:outline-none"
          aria-label="Search contractors"
        />
      </div>

      {/* Trade select */}
      <div className="flex items-center gap-2 rounded-xl bg-empire-navy/60 px-3 sm:w-56">
        <PinIcon className="h-5 w-5 shrink-0 text-empire-mute" />
        <select
          value={trade}
          onChange={(e) => onTradeChange(e.target.value)}
          className="w-full bg-transparent py-3 text-empire-ink focus:outline-none [&>option]:bg-empire-panel"
          aria-label="Filter by trade"
        >
          <option value="all">All trades</option>
          {Object.entries(TRADES).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-gold shrink-0 sm:px-7">
        Search
      </button>
    </form>
  )
}
