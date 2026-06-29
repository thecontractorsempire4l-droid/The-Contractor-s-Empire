# The Contractors Empire

A free national contractor directory built with **React + Vite + Tailwind CSS**.
Homeowners browse and search verified contractors with no sign-up. Contractors pay a
monthly subscription (via Stripe) to be listed and get featured placement.

---

## Tech stack

- **React 18** + **Vite 5** (fast dev server + build)
- **Tailwind CSS 3** (utility styling, custom "Empire" theme)
- **React Router 6** (Home / Directory / Profile pages)
- **@stripe/stripe-js** (subscription checkout)
- Deploys free to **Vercel**

---

## File structure

```
the-contractors-empire/
├── index.html                  # HTML shell + Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js          # brand colors, fonts, shadows
├── postcss.config.js
├── vercel.json                 # SPA routing rewrites
├── .env.example                # copy → .env.local and add your keys
├── public/
│   └── crown.svg               # favicon
├── api/
│   └── create-checkout-session.js   # OPTIONAL Vercel serverless Stripe fn
└── src/
    ├── main.jsx                # app entry + router
    ├── App.jsx                 # routes + scroll handling
    ├── index.css               # Tailwind + base styles + .btn/.card helpers
    ├── data/
    │   └── contractors.js      # ⭐ sample data + schema + query helpers
    ├── lib/
    │   └── stripe.js           # ⭐ Stripe config — your keys go here (via .env)
    ├── components/
    │   ├── Header.jsx
    │   ├── Hero.jsx
    │   ├── SearchBar.jsx
    │   ├── ContractorCard.jsx
    │   ├── DirectoryList.jsx
    │   ├── PricingTiers.jsx     # Subscribe buttons → Stripe
    │   ├── SignupForm.jsx       # "List your business" form
    │   ├── Testimonials.jsx
    │   ├── Footer.jsx           # includes Contact section
    │   ├── StarRating.jsx
    │   └── Icons.jsx            # inline SVG icons (no icon dependency)
    └── pages/
        ├── HomePage.jsx        # Hero + how-it-works + featured + pricing + signup
        ├── DirectoryPage.jsx   # full searchable / filterable directory
        └── ProfilePage.jsx     # single contractor profile
```

The two files you'll touch most are marked ⭐:
- `src/data/contractors.js` — your directory data and the only place that talks to data.
- `src/lib/stripe.js` — where Stripe keys/price IDs are read from environment variables.

---

## 1. Run it locally

You need **Node.js 18+** installed ([nodejs.org](https://nodejs.org)).

```bash
# from the project folder
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173). Edit any file and it hot-reloads.

To build the production bundle locally:

```bash
npm run build      # outputs to /dist
npm run preview    # serves the built site
```

---

## 2. Wire up Stripe (your keys)

You never paste keys into code — they live in a local env file that is **git-ignored**.

1. **Create a Stripe account** → https://dashboard.stripe.com
2. **Copy this file:** duplicate `.env.example` and rename it to `.env.local`.
3. **Get your Publishable key:** Stripe Dashboard → *Developers → API keys* →
   copy the **Publishable key** (`pk_test_…`).
4. **Create your products/prices:** Stripe Dashboard → *Products* → add a product for
   **Pro** and one for **Premium**, each with a **recurring monthly price**. Open each
   price and copy its **Price ID** (`price_…`).
5. **Paste them into `.env.local`:**

   ```bash
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   VITE_STRIPE_PRICE_PRO=price_your_pro_id
   VITE_STRIPE_PRICE_PREMIUM=price_your_premium_id
   ```

6. **Choose a checkout method** (in `src/lib/stripe.js`):

   - **Easiest — client-only checkout (no backend):** In Stripe go to
     *Settings → Checkout and Payment Links → Client-only integration* and toggle it
     **ON**, then add your domain under allowed domains. Leave `USE_SERVER = false`.
     The Subscribe buttons now work.

   - **Recommended for production — serverless:** Use the included
     `api/create-checkout-session.js` Vercel function. Run `npm install stripe`,
     uncomment the marked block in that file, set `STRIPE_SECRET_KEY` in Vercel's
     environment variables (server-side, **not** prefixed with `VITE_`), and set
     `USE_SERVER = true` in `src/lib/stripe.js`.

> The `sk_…` **secret key** must NEVER appear in front-end code or `.env.local`.
> It only ever lives in Vercel's server-side environment variables.

Until keys are set, clicking a Subscribe button shows a friendly message telling you
exactly which value is missing — nothing breaks.

---

## 3. Deploy free to Vercel

1. Push this folder to a **GitHub** repo (the `.gitignore` already excludes
   `node_modules`, `dist`, and `.env*`).

   ```bash
   git init
   git add .
   git commit -m "The Contractors Empire — initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/the-contractors-empire.git
   git push -u origin main
   ```

2. Go to **https://vercel.com**, sign in with GitHub, click **Add New → Project**, and
   import the repo. Vercel auto-detects Vite — just click **Deploy**.

3. **Add your environment variables** in Vercel → *Project → Settings → Environment
   Variables*. Add the same `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_STRIPE_PRICE_PRO`,
   and `VITE_STRIPE_PRICE_PREMIUM`. If you're using the serverless option, also add
   `STRIPE_SECRET_KEY`. Then **redeploy**.

4. (Optional) Add your custom domain in *Project → Settings → Domains*.

`vercel.json` already routes all non-API paths back to `index.html`, so deep links like
`/contractor/summit-peak-roofing` work on refresh.

---

## 4. Swap sample data for a real database (later)

Everything reads through three functions at the bottom of
`src/data/contractors.js`: `getContractors()`, `getContractorBySlug()`, and
`getFeaturedContractors()`. Keep the same record shape (documented at the top of that
file) and replace those function bodies with `fetch()` calls to your API — Supabase,
Postgres, Airtable, Firebase, etc. No component changes needed.

To capture new signups, replace the `console.log` in `src/components/SignupForm.jsx`
with a POST to your backend (a one-line comment marks the exact spot).

---

## Brand notes

- Theme: midnight navy (`#0A1733`) with a single gold accent (`#E0A93B`) used only on
  CTAs, ratings, and badges. Colors/fonts live in `tailwind.config.js`.
- Type: **Sora** for display headings, **Inter** for body (loaded in `index.html`).
- Accessibility baked in: visible keyboard focus, reduced-motion support, responsive
  down to mobile.

© The Contractors Empire
