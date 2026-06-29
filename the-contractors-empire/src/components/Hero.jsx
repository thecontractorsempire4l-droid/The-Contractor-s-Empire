import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import { CrownIcon, ShieldIcon, CheckIcon } from './Icons.jsx'

const TRUST_STATS = [
  { value: '12,400+', label: 'Verified contractors' },
  { value: '50', label: 'States covered' },
  { value: '180k+', label: 'Homeowner searches' },
]

export default function Hero() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [trade, setTrade] = useState('all')

  function runSearch() {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (trade !== 'all') params.set('trade', trade)
    navigate(`/directory${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <section className="relative overflow-hidden border-b border-empire-line/60">
      {/* Atmosphere: subtle grid + gold glow */}
      <div className="pointer-events-none absolute inset-0 bg-empire-grid [background-size:46px_46px] opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-empire-gold/10 blur-3xl" />

      <div className="container-empire relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow animate-fade-up justify-center">
            <CrownIcon className="h-4 w-4" />
            The national contractor directory
          </span>

          <h1 className="animate-fade-up mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Find Trusted Contractors{' '}
            <span className="text-empire-gold">Nationwide.</span>
          </h1>

          <p className="animate-fade-up mt-5 text-lg text-empire-mute sm:text-xl">
            Free national contractor directory. Homeowners find trusted contractors —
            no sign-up required to browse.
          </p>

          {/* The centerpiece search */}
          <div className="animate-fade-up mt-9">
            <SearchBar
              query={query}
              trade={trade}
              onQueryChange={setQuery}
              onTradeChange={setTrade}
              onSubmit={runSearch}
              variant="hero"
            />
          </div>

          {/* Dual CTAs */}
          <div className="animate-fade-up mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/directory" className="btn-gold w-full sm:w-auto">
              Find a Contractor
            </Link>
            <Link to="/#list" className="btn-ghost w-full sm:w-auto">
              List Your Business
            </Link>
          </div>

          {/* Reassurance line */}
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-empire-mute">
            <span className="flex items-center gap-1.5">
              <ShieldIcon className="h-4 w-4 text-empire-gold" /> Licensed &amp; verified
            </span>
            <span className="flex items-center gap-1.5">
              <CheckIcon className="h-4 w-4 text-empire-gold" /> No fees to browse
            </span>
            <span className="flex items-center gap-1.5">
              <CheckIcon className="h-4 w-4 text-empire-gold" /> Direct contact, no middleman
            </span>
          </p>
        </div>

        {/* Trust stats */}
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 divide-x divide-empire-line rounded-2xl border border-empire-line bg-empire-surface/60 py-6">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="px-4 text-center">
              <div className="font-display text-2xl font-extrabold text-empire-ink sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-empire-mute sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
