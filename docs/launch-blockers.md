# Launch blockers

Decisions only Caroline can make. The site should not be called launch-ready until the **Must fix** items are resolved. These notes are excluded from the website (`_config.yml`), but the GitHub repository is public, so anyone can read them there.

## Must fix before launch

1. **Quote form doesn't deliver.** The form still posts to `https://formspree.io/f/YOUR_FORM_ID`. Create a Formspree form under Caroline's email, replace the ID in `index.html`, then do one authorized test submission.
2. **The live site still has unapproved claims.** Production (last pushed 2026-10-30) says "insured & bonded", "fully insured", "from $100", lists 12 towns, and promises things like "we bring our own supplies" and "re-clean within 24 hours". This update removes them, but it hasn't been deployed.
3. **Bonded?** The site owner relayed that Caroline is bonded, but there's no evidence on file. If she is, confirm the bond and its provider before adding "bonded" back.
4. **Service territory.** The site now says only "serves La Jolla and North County San Diego" and asks for a ZIP. Confirm the exact ZIPs or communities served. No town list or location pages until this is done.
5. **Starting price: $100 or $120.** The door hanger says "starts at $100"; the site uses the current $120. Pick one, and reprint or retire the door hanger to match.
6. **What each bedroom price covers.** Prices are by bedroom only. Decide whether bathrooms, square footage, or the home's condition change the price, for example a 2-bed/3-bath home or a 4,000 sq ft 3-bed.
7. **First visit.** Is the first visit priced differently? Is an initial deep clean required before recurring service?
8. **Standard checklist.** The room-by-room checklist on `services.html` was drafted from the existing copy ("kitchens, bathrooms, dusting, vacuuming, mopping"). Caroline needs to approve or edit each line.

## Reconciled for review

- **Fridge interior** appeared both in the standard checklist and as a $15 add-on. It's now treated as an add-on only, per the price list. Caroline should confirm.
- **Move-in / move-out:** removed "cabinets and closets included". Inside cabinets is a $15 add-on, and move-outs are priced per job. Confirm what a move-out includes.
- **Vacation-rental turnovers** were removed from public copy: there's no price, scope, or confirmation they're part of the recurring residential focus. Restore them if Caroline still offers them.
- **Floor steam vacuuming** is listed as "ask for a quote". Confirm it's still offered and how it's priced.

## Add-on scope

Each add-on is $15 (dishes $5), but the quantity limits aren't defined:

- Interior windows: how many?
- Inside cabinets / drawers: kitchen only, or all rooms?
- Blinds / shutters: per room or the whole home?
- Baseboard detailing: what's the difference from a normal wipe?
- Dishes: how much is one load?

## Brand and trust

- **Name:** the logo says "Caroline's Cleaning"; the domain and site say "Caroline's Cleaning Crew". "Crew" may also suggest a staff the business doesn't have. Decide on one name.
- **Who cleans:** does Caroline do every visit, or do helpers sometimes attend? The site says "owner-operated" and "you deal directly with the owner", but it doesn't promise she personally cleans every visit.
- **About page bio:** written from Caroline's words as relayed by the site owner. She should read and approve it, including "Kind & friendly".
- **No owner photo, reviews, or Google Business Profile yet.** Photo slots are ready (see README). Reviews stay off the site until real ones exist.

## Homeowner policies to decide (nothing is published yet)

- Keys, door codes, and pets
- Supplies: Caroline's or the homeowner's, and any preparation expected
- Damage and missed areas: how they're reported and handled
- Illness, vacations, holidays, and rescheduling
- Payment methods and when payment is due
- Cancellations, skipped visits, and whether recurring service has a minimum commitment
- Response time to new inquiries (the site makes no promise)
