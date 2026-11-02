# Caroline's Cleaning Crew

Website for Caroline's Cleaning Crew, an insured, owner-operated house cleaning business in San Diego County.
Domain: https://carolinescleaningcrew.com (not live yet; see Hosting below)

Plain HTML/CSS/JS with no build step, hosted on GitHub Pages. Open `index.html` in a browser to preview.
Once GitHub Pages is turned on, **pushing to `main` publishes to the live site.**

## Files

- `index.html` – homepage: recurring plans, "quotes as low as $100", before & after, FAQ, quote form
- `services.html` – room-by-room checklist, add-ons, other services
- `about.html` – about Caroline
- `404.html` – not-found page (GitHub Pages serves it with a 404 status)
- `styles.css` – styles; brand colors are at the top in `:root`
- `script.js` – menu, quote form, mobile call/text bar, analytics hooks
- `assets/` – logo, favicon, and `results/` before & after photos (resized to 1000px, metadata stripped)
- `tools/` – the pre-publish check (below)
- `docs/` – [launch blockers](docs/launch-blockers.md) and [launch handoff](docs/launch-handoff.md)
- `_config.yml` – keeps `docs/`, `tools/`, and this README off the public website

## Prices

The site shows no price list, only "Quotes as low as $100" (hero, pricing section, FAQ, and the closing sections of the Services and About pages). If that starting figure changes, search the HTML files for `$100` and update each one.

## Before publishing

Run `node tools/check-site.mjs`. It checks titles, descriptions, canonical URLs, the sitemap, internal links, structured data, phone links, and wording the business can't currently back up (e.g. "bonded", reviews, or any dollar amount other than $100).

## Caroline's photo

`assets/caroline.jpg` (square, 600px) is shown on the homepage and About page. To change it, replace that file.

## Hosting (GitHub Pages)

1. Repo **Settings → Pages**: deploy from branch `main`, folder `/ (root)`. The custom domain comes from the `CNAME` file.
2. At the domain registrar, replace the existing records for the domain with:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `jloftis10-lang.github.io`
3. Back in Settings → Pages, enable **Enforce HTTPS** once the certificate is issued.

## Before launch

See [docs/launch-blockers.md](docs/launch-blockers.md). The quote form won't deliver until a real Formspree form ID replaces `YOUR_FORM_ID`.
