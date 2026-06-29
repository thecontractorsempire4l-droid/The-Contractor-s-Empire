/**
 * ─────────────────────────────────────────────────────────────────────────
 *  /api/create-checkout-session.js   (Vercel Serverless Function)
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  This is the RECOMMENDED, production path for Stripe Checkout. It keeps
 *  your secret key and pricing on the server so the client can't tamper
 *  with amounts.
 *
 *  TO ACTIVATE:
 *    1. Install the server SDK:        npm install stripe
 *    2. In Vercel → Project → Settings → Environment Variables, add:
 *           STRIPE_SECRET_KEY = sk_test_xxx (or sk_live_xxx)
 *       (Do NOT prefix this with VITE_ — it must stay server-only.)
 *    3. In src/lib/stripe.js set:      const USE_SERVER = true
 *    4. Redeploy.
 *
 *  Locally, run with:  vercel dev   (so /api routes are served)
 * ─────────────────────────────────────────────────────────────────────────
 */

// Uncomment after `npm install stripe`:
// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { priceId, successUrl, cancelUrl } = req.body || {}
    if (!priceId) return res.status(400).json({ error: 'Missing priceId' })

    /* ── Uncomment this block once the stripe SDK is installed ──────────────
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      // allow_promotion_codes: true,
    })
    return res.status(200).json({ id: session.id })
    ──────────────────────────────────────────────────────────────────────── */

    // Placeholder response until the SDK block above is enabled:
    return res.status(501).json({
      error:
        'Server checkout not wired up yet. Install the stripe SDK, set STRIPE_SECRET_KEY, and uncomment the block in /api/create-checkout-session.js.',
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
