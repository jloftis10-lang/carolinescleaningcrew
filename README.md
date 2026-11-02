# Caroline's Cleaning Crew

Website for Caroline's Cleaning Crew, a licensed, insured, owner-operated house cleaning business in North County San Diego.
Domain: https://carolinescleaningcrew.com (not live yet; see Hosting below)

Plain HTML/CSS/JS with no build step, hosted on GitHub Pages. Open `index.html` in a browser to preview.
GitHub Pages is on: **pushing to `main` publishes to the live site** (the domain shows it once its DNS points to GitHub).

## Files

- `index.html` – homepage: recurring plans, "quotes as low as $100", before & after, FAQ, quote form
- `services.html` – room-by-room checklist, add-ons, other services
- `about.html` – about Caroline
- `clutter-hoarding-cleanup.html` – judgment-free clutter and hoarding cleanup
- `404.html` – not-found page (GitHub Pages serves it with a 404 status)
- `styles.css` – styles; brand colors are at the top in `:root`
- `script.js` – menu, quote form, call/text banner, analytics hooks
- `assets/` – logo, favicon, and `results/` before & after photos (resized to 1000px, metadata stripped)
- `tools/` – the pre-publish check (below)
- `docs/` – [launch blockers](docs/launch-blockers.md) and [launch handoff](docs/launch-handoff.md)
- `_config.yml` – keeps `docs/`, `tools/`, and this README off the public website

## Prices

The site shows no price list, only "Quotes as low as $100" (hero, pricing section, FAQ, and the closing sections of the Services and About pages). The FAQ explains it's for a surface clean of a studio or 1-bedroom home. If that starting figure changes, search the HTML files for `$100` and update each one.

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

## Inquiry and SEO updates

- Service and frequency are separate choices; plan links preselect both without discarding form entries.
- The existing job gallery appears earlier, with two examples visible and the others expandable. Obtain client permission before publishing these photos.
- Titles and descriptions target each page's actual service and North County coverage. Service areas are visible on the homepage. Canonical URLs and sitemap paths remain stable.
- While `YOUR_FORM_ID` remains, the form displays call/text alternatives and disables online submission. Replace the endpoint in `index.html` to enable requests, then verify real delivery and error handling.
- Run `node tools/check-site.mjs` for development checks and `node tools/check-site.mjs --launch` before publishing. The launch check fails on the placeholder form endpoint.

## Conversion measurement

Set the public GA4 measurement ID in `analytics-config.js` to connect an existing property. Tracking is off while the value is empty. In GA4, disable Enhanced Measurement form interactions and review automatic page-view settings before enabling. Update privacy wording to reflect the configured analytics service.

Events: `call_click`, `text_click`, `quote_click`, `quote_start`, `quote_submitted`, and `quote_error`. A call/text click measures intent, not a completed conversation. Mark `quote_submitted` as a key event in GA4. Event hooks also emit `carolines:conversion` on window for local verification. No form values are included in these events; the explicit GA4 page location excludes query strings.

After the domain is connected, verify the domain in Google Search Console, submit `https://carolinescleaningcrew.com/sitemap.xml`, and inspect all four public pages. Google Business Profile setup and account-level analytics/Search Console configuration require the owner's accounts. No reviews, address, or unconfirmed claims have been added.

SEO reference: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
