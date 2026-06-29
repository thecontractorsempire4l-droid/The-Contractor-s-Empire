import { Link } from 'react-router-dom'
import { CrownIcon, PhoneIcon, GlobeIcon, PinIcon } from './Icons.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      {/* Contact band */}
      <section id="contact" className="scroll-mt-20 bg-empire-panel py-16">
        <div className="container-empire grid gap-10 md:grid-cols-2">
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight">
              Questions? We&apos;re here to help.
            </h2>
            <p className="mt-3 max-w-md text-empire-mute">
              Whether you&apos;re a homeowner who needs a hand finding the right pro, or a contractor
              ready to grow, reach out and we&apos;ll point you in the right direction.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a href="tel:+18005550100" className="card flex items-center gap-3 p-5 transition hover:border-empire-steel/60">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-empire-gold/15 text-empire-gold">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-empire-mute">Call us</span>
                <span className="font-semibold">(800) 555-0100</span>
              </span>
            </a>
            <a href="mailto:hello@contractorsempire.com" className="card flex items-center gap-3 p-5 transition hover:border-empire-steel/60">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-empire-gold/15 text-empire-gold">
                <GlobeIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-empire-mute">Email</span>
                <span className="font-semibold">hello@contractorsempire.com</span>
              </span>
            </a>
            <div className="card flex items-center gap-3 p-5 sm:col-span-2">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-empire-gold/15 text-empire-gold">
                <PinIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-empire-mute">Coverage</span>
                <span className="font-semibold">Serving all 50 states</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-empire-line/70 bg-empire-navy">
        <div className="container-empire py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <Link to="/" className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-empire-gold text-empire-navy">
                  <CrownIcon className="h-5 w-5" />
                </span>
                <span className="font-display text-lg font-extrabold tracking-tight">
                  The Contractors <span className="text-empire-gold">Empire</span>
                </span>
              </Link>
              <p className="mt-4 text-sm text-empire-mute">
                The free national contractor directory. Find trusted, verified contractors near you —
                no sign-up required to browse.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <FooterCol
                title="Directory"
                links={[
                  { label: 'Browse all', to: '/directory' },
                  { label: 'Roofing', to: '/directory?trade=roofing' },
                  { label: 'Plumbing', to: '/directory?trade=plumbing' },
                  { label: 'Electrical', to: '/directory?trade=electrical' },
                ]}
              />
              <FooterCol
                title="Contractors"
                links={[
                  { label: 'List your business', to: '/#list' },
                  { label: 'Pricing', to: '/#pricing' },
                ]}
              />
              <FooterCol
                title="Company"
                links={[
                  { label: 'Contact', to: '/#contact' },
                  { label: 'Home', to: '/' },
                ]}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-empire-line/70 pt-6 text-sm text-empire-mute sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} The Contractors Empire. All rights reserved.</p>
            <p className="text-empire-mute/70">Built for homeowners and the pros they trust.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-empire-ink">{title}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-empire-mute transition hover:text-empire-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
