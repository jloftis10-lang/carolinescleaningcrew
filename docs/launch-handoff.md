# Launch handoff

How the site works, what to check before going live, and how to tell whether it's bringing in recurring clients. Open decisions are in [launch-blockers.md](launch-blockers.md).

## How the site is built

- Plain HTML/CSS/JS on **GitHub Pages**, published from `main`. Pushing to `main` deploys to production.
- The quote form uses **Formspree** with a honeypot field (`_gotcha`) for spam. With JavaScript the form validates in the page and shows success only after Formspree confirms. Without JavaScript the browser's own validation runs and the form posts directly to Formspree. Phone or email can't be made conditionally required without JavaScript.
- The site lists no prices, only "Quotes as low as $100". Before publishing, run `node tools/check-site.mjs`; it flags any other dollar amount.
- `404.html` is served by GitHub Pages with a real 404 status.

## Before launch

- [ ] Resolve the **Must fix** items in launch-blockers.md
- [ ] Caroline owns or has admin access to: the domain registrar, the GitHub repo (or a transfer to her account), Formspree, and any analytics
- [ ] Formspree: create the form under Caroline's email, add the ID, and turn on its spam filtering
- [ ] **Authorized test:** with Caroline's OK, send one clearly labelled test request on the live site. Confirm it reaches her inbox with every field (including multiple add-ons) and the success message appears. Delete the test afterwards.
- [ ] On a real phone, tap Call and Text in the bottom bar and confirm they open the dialer and messages with (760) 492-9338
- [ ] Confirm the live 404 by visiting `https://www.carolinescleaningcrew.com/does-not-exist`

## Google, maps, and listings (Caroline does these; nothing has been created)

- [ ] **Google Business Profile:** create or claim it and complete verification. Set it up as a **service-area business**. Hide the home address because customers aren't served there. List only the confirmed service areas.
- [ ] Keep the name, phone, website, and categories identical everywhere
- [ ] **Google Search Console:** verify the domain and submit `https://www.carolinescleaningcrew.com/sitemap.xml`
- [ ] **Bing Places** (can import from Google), **Apple Business Connect**, and **Yelp**, all with the same details
- [ ] Other relevant local listings only if they're real and maintained (e.g. Nextdoor business page)

## Reviews

- [ ] Ask every real customer for a Google review. Don't ask only the happy ones, and don't offer discounts or gifts for reviews.
- [ ] **Yelp:** don't ask customers for Yelp reviews at all. Yelp prohibits it.
- [ ] Add reviews to the site only once there are real ones, quoted word for word with permission. No star ratings or review markup until then.

## Photos

- [ ] Optional: replace the AI-generated `assets/caroline.jpg` with a real photo of Caroline
- [ ] More before & after photos from real jobs, with the client's OK and no personal items or house numbers visible

## Who does what

- Responds to inquiries: Caroline (decide on a target response time before promising one)
- Keeps the "as low as $100" line current: whoever edits the site. Keep the door hanger consistent with it.
- Publishes site changes: the person with push access to `main`

## Measuring results

### On the site
`script.js` sends events named `call_click`, `text_click`, `quote_start`, and `quote_submitted` if Google Analytics (`gtag`) or Plausible is on the page. Today neither is, so nothing is sent. If you add one, prefer a free, privacy-friendly option, and add it to every page.

Events carry only their name, never names, phone numbers, emails, ZIPs, or messages. Keep it that way.

What each event means:
- A click on Call or Text is **interest**, not a lead.
- A submitted quote request is an **inquiry**, not a client.

### Lead tracking (a simple spreadsheet is enough)

One row per inquiry, with these columns:

| Date | Source | Inquiry type | Quote sent | Quote amount | First cleaning date | Second recurring visit | Notes |
|---|---|---|---|---|---|---|---|

- **Source:** website form, phone/text from website, door hanger, referral, Google profile, other. Ask "How did you hear about us?" on the first call.
- The number that matters is **second recurring visit**: that's when a lead has become a recurring client.
- Each month, count how many inquiries reach each column, and compare by source.

### Door hanger QR code (recommendation only)
On the next print run, point the QR code at a distinct URL so door-hanger visits can be counted separately, for example `https://www.carolinescleaningcrew.com/?utm_source=door-hanger&utm_medium=print&utm_campaign=door-hanger-1`. This needs analytics on the site to be counted.
