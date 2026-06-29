import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import DirectoryList from '../components/DirectoryList.jsx'
import { getContractors, TRADES } from '../data/contractors.js'

export default function DirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Seed local state from the URL (so shared links pre-fill the search).
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [trade, setTrade] = useState(searchParams.get('trade') || 'all')

  // Keep the URL in sync so results are linkable/bookmarkable.
  useEffect(() => {
    const params = {}
    if (query.trim()) params.q = query.trim()
    if (trade !== 'all') params.trade = trade
    setSearchParams(params, { replace: true })
  }, [query, trade, setSearchParams])

  // Live filtering — runs on every keystroke / filter change.
  const results = useMemo(() => getContractors({ query, trade }), [query, trade])

  const tradeChips = [['all', 'All'], ...Object.entries(TRADES)]

  return (
    <div className="py-12 sm:py-16">
      <div className="container-empire">
        <header className="max-w-2xl">
          <span className="eyebrow">National directory</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Browse trusted contractors
          </h1>
          <p className="mt-3 text-empire-mute">
            Search by trade, business name, city, or zip. Free to browse — no sign-up required.
          </p>
        </header>

        {/* Search */}
        <div className="mt-8">
          <SearchBar
            query={query}
            trade={trade}
            onQueryChange={setQuery}
            onTradeChange={setTrade}
            onSubmit={() => {}}
            variant="inline"
          />
        </div>

        {/* Quick trade chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          {tradeChips.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTrade(key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                trade === key
                  ? 'border-empire-gold bg-empire-gold/15 text-empire-gold'
                  : 'border-empire-line bg-white/5 text-empire-mute hover:text-empire-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Result count */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-empire-mute">
            <span className="font-semibold text-empire-ink">{results.length}</span>{' '}
            {results.length === 1 ? 'contractor' : 'contractors'} found
            {trade !== 'all' && ` in ${TRADES[trade]}`}
          </p>
          {(query || trade !== 'all') && (
            <button
              onClick={() => {
                setQuery('')
                setTrade('all')
              }}
              className="text-sm font-medium text-empire-steel hover:text-empire-ink"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mt-6">
          <DirectoryList contractors={results} />
        </div>
      </div>
    </div>
  )
}
