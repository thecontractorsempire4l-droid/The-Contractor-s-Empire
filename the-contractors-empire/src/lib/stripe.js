/**
 * ─────────────────────────────────────────────────────────────────────────
 *  STRIPE INTEGRATION  —  The Contractors Empire
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  WHERE YOUR KEYS GO
 *  ------------------
 *  Do NOT paste keys directly in code. Put them in a ".env.local" file at the
 *  project root (copy from ".env.example"). Vite only exposes variables that
 *  start with VITE_ to the browser, and only your PUBLISHABLE key is safe to
 *  expose. Your SECRET key (sk_...) must NEVER appear in front-end code.
 *
 *      .env.local
 *      ----------
 *      VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxx
 *      VITE_STRIPE_PRICE_PRO=price_xxxxxxxx
 *      VITE_STRIPE_PRICE_PREMIUM=price_xxxxxxxx
 *
 *  HOW TO GET THESE
 *  ----------------
 *   1. Create a Stripe account → dashboard.stripe.com
 *   2. Publishable key: Developers → API keys → "Publishable key"
 *   3. Price IDs: Products → add a product for "Pro" and "Premium",
 *      give each a recurring monthly price, then copy each price's ID
 *      (looks like price_1Q...). Paste them above.
 *
 *  TWO WAYS TO CHARGE — pick one:
 *  ----------------------------------------------------------------------
 *  (A) CLIENT-ONLY CHECKOUT  (fastest to ship, no backend)
 *      Enable it once in Stripe: Settings → Checkout → "Client-only
 *      integration" → toggle ON, and add your domain to allowed domains.
 *      Then `redirectToTierCheckout()` below works as-is.
 *
 *  (B) SERVERLESS CHECKOUT  (recommended for production)
 *      Use the included /api/create-checkout-session.js Vercel function so
 *      pricing/quantities live on the server and can't be tampered with.
 *      Set STRIPE_SECRET_KEY in Vercel's env vars, then flip USE_SERVER below.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { loadStripe } from '@stripe/stripe-js'

// Flip to `true` once you've deployed the /api function and set STRIPE_SECRET_KEY.
const USE_SERVER = false

// Pulled from .env.local — never hard-code real keys here.
const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

// Map your pricing tiers → Stripe Price IDs. 'basic' is free (no Stripe call).
export const TIER_PRICE_IDS = {
  pro: import.meta.env.VITE_STRIPE_PRICE_PRO,
  premium: import.meta.env.VITE_STRIPE_PRICE_PREMIUM,
}

// Lazy singleton so Stripe.js only loads once.
let stripePromise
function getStripe() {
  if (!stripePromise) stripePromise = loadStripe(PUBLISHABLE_KEY)
  return stripePromise
}

/**
 * Kicks off Stripe Checkout for a paid tier ('pro' | 'premium').
 * Returns { error } on failure so the caller can show a message.
 */
export async function redirectToTierCheckout(tier) {
  const priceId = TIER_PRICE_IDS[tier]

  // Friendly guardrails so a missing config doesn't fail silently.
  if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes('REPLACE_ME')) {
    return { error: 'Stripe publishable key not set. Add VITE_STRIPE_PUBLISHABLE_KEY to .env.local.' }
  }
  if (!priceId || priceId.includes('REPLACE_ME')) {
    return { error: `No Stripe price ID set for the "${tier}" tier. Add it to .env.local.` }
  }

  const successUrl = `${window.location.origin}/?checkout=success&tier=${tier}`
  const cancelUrl = `${window.location.origin}/?checkout=cancelled#pricing`

  try {
    // ── Option B: serverless (recommended) ───────────────────────────────
    if (USE_SERVER) {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, successUrl, cancelUrl }),
      })
      const data = await res.json()
      if (data.error) return { error: data.error }
      const stripe = await getStripe()
      return stripe.redirectToCheckout({ sessionId: data.id })
    }

    // ── Option A: client-only checkout (no backend) ──────────────────────
    const stripe = await getStripe()
    return stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      successUrl,
      cancelUrl,
    })
  } catch (err) {
    return { error: err?.message || 'Checkout failed to start.' }
  }
}
