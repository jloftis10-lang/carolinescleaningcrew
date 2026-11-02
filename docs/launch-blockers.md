# Launch blockers

Decisions only Caroline can make. The site should not be called launch-ready until the **Must fix** items are resolved. These notes are excluded from the website (`_config.yml`), but the GitHub repository is public, so anyone can read them there.

## Confirmed (2026-11-02, relayed by the site owner)

These are now on the site:

- **Licensed and insured:** yes. "Bonded" is still unconfirmed and stays off the site.
- **Hours:** open 7 days a week, 8am to 6pm.
- **Service area:** North County San Diego: Carlsbad, Oceanside, Encinitas, Solana Beach, Rancho Santa Fe, San Marcos, Vista, Escondido, Poway, and Rancho Bernardo. La Jolla and Del Mar are not listed.
- **$100:** a surface clean of a studio or 1-bedroom home. The site shows no other prices ("Quotes as low as $100"), including on the call/text banner that stays on screen.
- **Checklist, bio, carpet steam and upholstery add-ons, and the clutter & hoarding page** were merged in from Caroline's update. Her mention of her child in the bio was softened to "to care for my family".

## Must fix before launch

1. **Quote form doesn't deliver.** The form still posts to `https://formspree.io/f/YOUR_FORM_ID`. Create a Formspree form under Caroline's email, replace the ID in `index.html`, then do one authorized test submission.
2. **The domain still points to GoDaddy.** GitHub Pages was turned on 2026-11-01, but carolinescleaningcrew.com still shows GoDaddy's "Coming Soon" page (160.153.0.129). Change the DNS records at GoDaddy as described in the README, then turn on Enforce HTTPS.
3. **What a "surface clean" includes.** The FAQ says quotes start at $100 for a surface clean of a studio or 1-bedroom home. Does that cover the full checklist on `services.html`, or less?
4. **First visit.** Is an initial deep clean required before recurring service? The site doesn't say either way.
5. **Client OK for the before & after photos.** The living room, kitchen, oven, fridge, and microwave photos (added 2026-11-01) are from inside a client's home. The living-room shots show the family's toys, framed photos on the mantel, and the view out the back door. Confirm the homeowner is happy for them to be on a public website.
6. **Clutter & hoarding page.** Before promising more on `clutter-hoarding-cleanup.html`, decide: how jobs are priced, whether she takes photos by text for estimates, haul-away or sort-and-bag only, whether anything is thrown away without the client's OK, and situations she won't take (biohazard, pests, mold). The page currently promises none of these.

## Reconciled for review

- **Fridge interior** appeared both in the standard checklist and as an add-on. It's now treated as an add-on only. Caroline should confirm.
- **Move-in / move-out:** removed "cabinets and closets included". Inside cabinets is an add-on, and move-outs are quoted per job. Confirm what a move-out includes.
- **Vacation-rental turnovers** were removed from public copy: there's no scope or confirmation they're part of the recurring residential focus. Restore them if Caroline still offers them.
- **Floor steam vacuuming** was replaced by the carpet steam cleaning add-on (up to 3 rooms).

## Add-on scope

Add-ons are listed without prices and included in the quote. Before quoting them, decide what each one covers:

- Interior windows: how many?
- Inside cabinets / drawers: kitchen only, or all rooms?
- Blinds / shutters: per room or the whole home?
- Baseboard detailing: what's the difference from a normal wipe?
- Dishes: how much is one load?
- Carpet steam cleaning (up to 3 rooms) and upholstery cleaning (up to 3 items): what happens beyond 3?

## Brand and trust

- **Name:** the logo says "Caroline's Cleaning"; the domain and site say "Caroline's Cleaning Crew". "Crew" may also suggest a staff the business doesn't have. Decide on one name.
- **Who cleans:** does Caroline do every visit, or do helpers sometimes attend? The site says "owner-operated" and "you deal directly with the owner", but it doesn't promise she personally cleans every visit.
- **About page bio:** now Caroline's own bio, lightly edited (her child's diagnosis was replaced with "to care for my family"). She should read the final version.
- **Owner photo is AI-generated.** `assets/caroline.jpg` is cropped from the Reface image in the Drive "Social" folder, used at the owner's request (2026-11-01). Swap in a real photo when there is one.
- **No reviews or Google Business Profile yet.** Reviews stay off the site until real ones exist.

## Homeowner policies to decide (nothing is published yet)

- Keys, door codes, and pets
- Supplies: Caroline's or the homeowner's, and any preparation expected
- Damage and missed areas: how they're reported and handled
- Illness, vacations, holidays, and rescheduling
- Payment methods and when payment is due
- Cancellations, skipped visits, and whether recurring service has a minimum commitment
- Response time to new inquiries (the site makes no promise)
