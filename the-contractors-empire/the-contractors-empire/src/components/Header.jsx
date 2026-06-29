import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CrownIcon } from './Icons.jsx'

const NAV = [
  { label: 'Directory', to: '/directory' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'List Your Business', to: '/#list' },
  { label: 'Contact', to: '/#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-empire-line/70 bg-empire-navy/85 backdrop-blur">
      <div className="container-empire flex h-16 items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-empire-gold text-empire-navy">
            <CrownIcon className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            The Contractors <span className="text-empire-gold">Empire</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-empire-ink ${
                  isActive && item.to === '/directory' ? 'text-empire-ink' : 'text-empire-mute'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/directory" className="btn-gold px-4 py-2 text-sm">
            Find a Contractor
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-lg border border-empire-line p-2 text-empire-ink"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-empire-line/70 bg-empire-panel md:hidden">
          <div className="container-empire flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-empire-mute hover:text-empire-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/directory" onClick={() => setOpen(false)} className="btn-gold mt-3">
              Find a Contractor
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
