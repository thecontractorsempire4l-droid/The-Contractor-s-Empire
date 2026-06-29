import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckIcon, CrownIcon } from './Icons.jsx'
import { redirectToTierCheckout } from '../lib/stripe.js'

/**
 * Pricing tiers. The `tier` key on PRO/PREMIUM maps to a Stripe Price ID
 * inside src/lib/stripe.js (TIER_PRICE_IDS). Basic is free → sends the
 * contractor to the signup form instead of Stripe.
 */
const TIERS = [
  {
    key: 'basic',
    name: 'Basic',
    price: 'Free',
    cadence: 'forever',
    blurb: 'Get on the map. A standard listing so homeowners can find and contact you.',
    features: [
      'Standard directory listing',
      'Business name, trade & location',
      'Click-to-call phone number',
      '1 photo / logo',
      'Appears in search results',
    ],
    cta: 'Create free listing',
    highlight: false,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$49',
    cadence: '/month',
    blurb: 'Stand out and capture more leads with featured placement and a richer profile.',
    features: [
      'Everything in Basic',
      'Featured badge + boosted ranking',
      'Up to 10 photos',
      'Website & Facebook links',
      'Full services & service-area list',
      'Customer reviews on profile',
    ],
    cta: 'Subscribe to Pro',
    highlight: true,
  },
  {
    key: 'premium',
    name: 'Premium',
    price: '$129',
    cadence: '/month',
    blurb: 'Own your market. Top-of-search priority and first claim on incoming leads.',
    features: [
      'Everything in Pro',
      'Top-of-search placement',
      'Priority lead routing',
      'Unlimited photos',
      'Verified Empire badge',
      'Dedicated account support',
    ],
    cta: 'Subscribe to Premium',
    highlight: false,
  },
]

export default function PricingTiers() {
  const [loadingTier, setLoadingTier] = useState(null)
  const [error, setError] = useState('')

  async function handleSubscribe(tier) {
    setError('')
    setLoadingTier(tier)
    const result = await redirectToTierCheckout(tier)
    // If we got here, the redirect didn't happen — surface the reason.
    if (result?.error) setError(result.error)
    setLoadingTier(null)
  }

  return (
    <section id="pricing" className="scroll-mt-20 border-b border-empire-line/60 py-20 sm:py-24">
      <div className="container-empire">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <CrownIcon className="h-4 w-4" /> For contractors
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Claim your spot in the Empire
          </h2>
          <p className="mt-3 text-empire-mute">
            Homeowners browse free. Contractors choose a plan to get listed and win leads.
            Cancel anytime.
          </p>
        </div>

        {error && (
          <p className="mx-auto mt-6 max-w-xl rounded-lg border border-empire-gold/40 bg-empire-gold/10 px-4 py-3 text-center text-sm text-empire-goldsoft">
            {error}
          </p>
        )}

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.key}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                tier.highlight
                  ? 'border-empire-gold bg-empire-surface shadow-gold'
                  : 'border-empire-line bg-empire-surface/70'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-empire-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-empire-navy">
                  Most popular
                </span>
              )}

              <h3 className="font-display text-xl font-bold">{tier.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="font-display text-4xl font-extrabold">{tier.price}</span>
                <span className="pb-1 text-sm text-empire-mute">{tier.cadence}</span>
              </div>
              <p className="mt-3 text-sm text-empire-mute">{tier.blurb}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-empire-gold" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {tier.key === 'basic' ? (
                <Link to="/#list" className="btn-ghost mt-7 w-full">
                  {tier.cta}
                </Link>
              ) : (
                <button
                  onClick={() => handleSubscribe(tier.key)}
                  disabled={loadingTier === tier.key}
                  className={`mt-7 w-full ${tier.highlight ? 'btn-gold' : 'btn-ghost'}`}
                >
                  {loadingTier === tier.key ? 'Starting checkout…' : tier.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-empire-mute">
          Prices shown are samples. Set your real amounts in the Stripe Dashboard and paste the
          Price IDs into <code className="text-empire-steel">.env.local</code>.
        </p>
      </div>
    </section>
  )
}
