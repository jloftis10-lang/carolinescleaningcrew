# Caroline's Cleaning Crew

Website for Caroline's Cleaning Crew, a house cleaning service in San Diego.
Live at https://carolinescleaningcrew.com

Plain HTML/CSS/JS with no build step. Open `index.html` in a browser to preview.

## Files

- `index.html` – the whole site (single page)
- `styles.css` – styles; brand colors are defined at the top in `:root`
- `script.js` – mobile menu and quote-form submission
- `assets/` – logo and favicon
- `CNAME` – custom domain for GitHub Pages

## Before launch

- Create a free form at https://formspree.io and replace `YOUR_FORM_ID` in the quote form's `action`.
- Confirm the services, neighborhoods, and FAQ answers with Caroline.

## Hosting (GitHub Pages)

1. Push to `main` on GitHub.
2. Repo **Settings → Pages**: deploy from branch `main`, folder `/ (root)`.
3. At the domain registrar, add DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `jloftis10-lang.github.io`
4. Back in Settings → Pages, enable **Enforce HTTPS** once the certificate is issued.
