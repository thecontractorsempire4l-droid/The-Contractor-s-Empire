import ContractorCard from './ContractorCard.jsx'
import { SearchIcon } from './Icons.jsx'

/**
 * Presentational grid of contractor cards. Filtering happens in the parent
 * page (which calls getContractors), so this component just renders results.
 */
export default function DirectoryList({ contractors }) {
  if (!contractors.length) {
    return (
      <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-empire-panel text-empire-mute">
          <SearchIcon className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold">No contractors match your search</h3>
        <p className="mt-2 max-w-sm text-sm text-empire-mute">
          Try a different trade, a nearby city, or clear your filters to see every listing.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {contractors.map((c) => (
        <ContractorCard key={c.id} contractor={c} />
      ))}
    </div>
  )
}
