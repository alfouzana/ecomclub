# Ecomclub — Landing Page

Arabic (RTL) landing page for Ecomclub, a paid community for e-commerce sellers ($30/month):
Discord access, courses, templates, themes, winning products and winning ads.

Built with Vite + Tailwind CSS v4. Static site, hosted on GitHub Pages.

## Run locally

```
npm install
npm run dev
```

## Build

```
npm run build
```

Output goes to `dist/`.

## Settings you will want to change

Open `src/config.js`:

- `FORM_EMAIL` — the email that receives join-form submissions (sent through formsubmit.co, free).
  The first submission triggers a one-time confirmation email from formsubmit.co — click "Activate" in it.
- `SUBSCRIBE_URL` — your payment page (Stripe / Whop) or Discord invite. Every "join" button points here.

## Editing content

- All text and sections are in `index.html`.
- Colors and font are in `src/style.css` (`--color-brand`, `--color-ink`).
- Favicon: `public/favicon.svg`. Social share image: `public/og.png` (1200×630).
