import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import ContractorCard from '../components/ContractorCard.jsx'
import PricingTiers from '../components/PricingTiers.jsx'
import SignupForm from '../components/SignupForm.jsx'
import Testimonials from '../components/Testimonials.jsx'
import { ArrowRightIcon, SearchIcon, ShieldIcon, PhoneIcon } from '../components/Icons.jsx'
import { getFeaturedContractors } from '../data/contractors.js'

const STEPS = [
  {
    icon: SearchIcon,
    title: 'Search your trade & area',
    text: 'Filter by trade, city, or zip. No account, no fees — browse the full directory instantly.',
  },
  {
    icon: ShieldIcon,
    title: 'Compare verified pros',
    text: 'Review ratings, services, and service areas on clean, vetted contractor profiles.',
  },
  {
    icon: PhoneIcon,
    title: 'Contact them directly',
    text: 'Call or message the contractor yourself. You own the lead — no middleman in between.',
  },
]

export default function HomePage() {
  const featured = getFeaturedContractors(3)

  return (
    <>
      <Hero />

      {/* How it works */}
      <section className="border-b border-empire-line/60 py-20 sm:py-24">
        <div className="container-empire">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">How it works</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Three steps to the right contractor
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-empire-gold/15 text-empire-gold">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-bold text-empire-mute">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-empire-mute">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured contractors preview */}
      <section className="border-b border-empire-line/60 py-20 sm:py-24">
        <div className="container-empire">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Featured contractors</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Top-rated pros, ready to hire
              </h2>
            </div>
            <Link to="/directory" className="btn-ghost">
              View full directory
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <ContractorCard key={c.id} contractor={c} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <PricingTiers />
      <SignupForm />
    </>
  )
}
