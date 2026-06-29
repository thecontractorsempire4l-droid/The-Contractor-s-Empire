import StarRating from './StarRating.jsx'

const TESTIMONIALS = [
  {
    quote:
      'I found a roofer in my zip code in about a minute, called him directly, and had a quote the next day. No spam, no forms, no runaround.',
    name: 'Danielle R.',
    role: 'Homeowner · Austin, TX',
  },
  {
    quote:
      'Since upgrading to Pro, our profile gets four to five solid leads a week. The featured badge clearly makes people trust us more.',
    name: 'Marcus Trent',
    role: 'Owner · Ironclad Electric',
  },
  {
    quote:
      'The directory is exactly what a contractor search should be — fast, clean, and the listings actually feel vetted. We hired a GC straight from here.',
    name: 'Sophia L.',
    role: 'Property Manager · Tampa, FL',
  },
]

export default function Testimonials() {
  return (
    <section className="border-b border-empire-line/60 py-20 sm:py-24">
      <div className="container-empire">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Trusted across the country</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Homeowners and contractors agree
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card flex flex-col p-6">
              <StarRating rating={5} showValue={false} />
              <blockquote className="mt-4 flex-1 text-empire-ink/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-empire-line pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-empire-mute">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
