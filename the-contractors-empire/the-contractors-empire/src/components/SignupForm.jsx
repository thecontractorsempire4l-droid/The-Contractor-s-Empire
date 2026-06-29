import { useState } from 'react'
import { TRADES } from '../data/contractors.js'
import { CheckIcon } from './Icons.jsx'

const EMPTY = {
  name: '',
  trade: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  email: '',
  description: '',
}

/**
 * Contractor signup. On submit it currently logs the payload and shows a
 * success state. To make it live, POST `form` to your API / Google Sheet /
 * Supabase table inside handleSubmit (see the comment below).
 */
export default function SignupForm() {
  const [form, setForm] = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // ── WIRE THIS UP LATER ────────────────────────────────────────────────
    // Replace the console.log with a real request, e.g.:
    //   await fetch('/api/contractors', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form),
    //   })
    // ──────────────────────────────────────────────────────────────────────
    console.log('New contractor submission:', form)

    setSubmitted(true)
    setForm(EMPTY)
  }

  return (
    <section id="list" className="scroll-mt-20 border-b border-empire-line/60 py-20 sm:py-24">
      <div className="container-empire grid items-start gap-12 lg:grid-cols-2">
        {/* Left: pitch */}
        <div className="lg:sticky lg:top-24">
          <span className="eyebrow">List your business</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Get found by homeowners ready to hire
          </h2>
          <p className="mt-4 text-empire-mute">
            Add your business to the directory in under two minutes. Submit your details and
            you&apos;ll appear in searches across your service area. Choose a paid plan anytime to
            unlock featured placement and lead priority.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              'Free to get listed — no card required',
              'Reach homeowners actively searching your trade',
              'You own the lead: customers contact you directly',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-empire-gold" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <div className="card p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-empire-gold/15 text-empire-gold">
                <CheckIcon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold">Submission received</h3>
              <p className="mt-2 max-w-sm text-sm text-empire-mute">
                Thanks — we&apos;ll review your business and add it to the directory shortly. Want
                priority placement? Pick a plan above.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-ghost mt-6">
                Submit another business
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-empire-ink">
                  Business name
                </label>
                <input
                  required
                  className="field"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="e.g. Summit Peak Roofing"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-empire-ink">Trade</label>
                  <select
                    required
                    className="field [&>option]:bg-empire-panel"
                    value={form.trade}
                    onChange={(e) => update('trade', e.target.value)}
                  >
                    <option value="" disabled>
                      Select a trade
                    </option>
                    {Object.entries(TRADES).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-empire-ink">Phone</label>
                  <input
                    required
                    type="tel"
                    className="field"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="(555) 555-0100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className="mb-1.5 block text-sm font-medium text-empire-ink">City</label>
                  <input
                    required
                    className="field"
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    placeholder="Austin"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-empire-ink">State</label>
                  <input
                    required
                    maxLength={2}
                    className="field uppercase"
                    value={form.state}
                    onChange={(e) => update('state', e.target.value.toUpperCase())}
                    placeholder="TX"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-empire-ink">Zip</label>
                  <input
                    required
                    className="field"
                    value={form.zip}
                    onChange={(e) => update('zip', e.target.value)}
                    placeholder="78701"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-empire-ink">Email</label>
                <input
                  required
                  type="email"
                  className="field"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@yourbusiness.com"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-empire-ink">
                  Describe your business
                </label>
                <textarea
                  required
                  rows={4}
                  className="field resize-none"
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="Tell homeowners what you do, your specialties, and what sets you apart…"
                />
              </div>

              <button type="submit" className="btn-gold w-full">
                Submit my business
              </button>
              <p className="text-center text-xs text-empire-mute">
                By submitting you agree to be contacted about your listing.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
