# Caroline's Cleaning Crew

Website for Caroline's Cleaning Crew, an insured, owner-operated house cleaning business in San Diego County.
Live at https://carolinescleaningcrew.com

Plain HTML/CSS/JS with no build step, hosted on GitHub Pages. Open `index.html` in a browser to preview.
**Pushing to `main` publishes to the live site.**

## Files

- `index.html` – homepage: recurring plans, pricing, before & after, FAQ, quote form
- `services.html` – room-by-room checklist, add-ons, other services
- `about.html` – about Caroline
- `404.html` – not-found page (GitHub Pages serves it with a 404 status)
- `styles.css` – styles; brand colors are at the top in `:root`
- `script.js` – menu, quote form, mobile call/text bar, analytics hooks
- `pricing.json` – **the one place prices are set**
- `assets/` – logo, favicon, and `results/` before & after photos (resized to 1000px, metadata stripped)
- `tools/` – maintenance scripts (below)
- `docs/` – [launch blockers](docs/launch-blockers.md) and [launch handoff](docs/launch-handoff.md)
- `_config.yml` – keeps `docs/`, `tools/`, and this README off the public website

## Changing prices

1. Edit `pricing.json`.
2. Run `node tools/prices.mjs` to update every price shown on the site.

## Before publishing

Run `node tools/check-site.mjs`. It checks titles, descriptions, canonical URLs, the sitemap, internal links, structured data, phone links, prices, and wording the business can't currently back up (e.g. "bonded", "$100", reviews).

## Adding Caroline's photo

Save it as `assets/caroline.jpg` (square, about 500px), then uncomment the marked lines in `index.html` and `about.html`.

## Before launch

See [docs/launch-blockers.md](docs/launch-blockers.md). The quote form won't deliver until a real Formspree form ID replaces `YOUR_FORM_ID`.
