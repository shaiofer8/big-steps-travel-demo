# Big Steps Travel — client notes

Client: Steve Fader (President, Big Steps Travel — bespoke/luxury travel advisory), sfade@bigstepstravel.com.
No public office address; likely DC-metro area (his own timezone example used "7 hrs ahead of DC").

## Status (2026-08-29)

Steve picked **New Concept** (`/magazine/`) as the direction to build on, over Classic and Continuation.
Replied 2026-08-29 confirming we'll build his edits into `/magazine/`; he approved ("Yes, let's see what an updated NC looks like").
**Full edit list below implemented and pushed** (commit `8e76547`), verified with a headless Playwright pass (zero console/page errors, all renames/links/countdowns confirmed rendering correctly). Live at the same URL: `https://shaiofer8.github.io/big-steps-travel-demo/magazine/`.

## Steve's requested edits — New Concept (`/magazine/`)

**Intro page:**
- Centered company logo (small but visible) at the very top, with slogan "Every Great Journey Begins with BIG Steps™" centered below it
- Below that, larger point size: client name — "The Carlton Family Scandinavian/Baltic Travel Journal" — with date range centered below
- Below that, smaller: countries visited, with flag emoji right after each name
- Quick-reference city-switcher (right margin) text should be larger
- Rename "In Flight" → "Departure", "Departure" → "Return"
- Move the "Reservations" and "Map" banner bubbles to below "Return"; rename to "Reservation Links/Info" and "Google Map Links"

**City pages:**
- Add country name under city name, e.g. "Helsinki, Finland"
- Reservation-type color coding (blue/hotel, orange/flights-trains-boats, green/tours) should **fully frame** the circle/badge, not just a left bar
- Add a countdown line just below day/date: "Helsinki – day 1 of 3 / Trip – day 1 of 17"
- Box and separate each day/section (like the Continuation template does)
- Links/videos/extra info need to be inline on the actual day at point of use — not bulked at the end
- Rename "Sites & Things to Do" → "Add on Options of Things to Do & See" (a catch-all list of unplanned extras, stays at end of city section)
- Rename "Before You Go" → "Tips & General Guidance"
- Make Food & Drink entries clickable → Google Maps / TripAdvisor
- Add missing tours he flagged: ABBA Museum, Brad Paisley concert, Helsinki Synagogue Tour, etc.

## Business answers already sent (2026-08-29 reply, thread `19fc15cbe026d6e3`)

- **Pricing: $150 flat per itinerary** (standing rate for this lead going forward)
- Build process: Shai builds each one personally, AI-assisted (tools not named)
- Customization: template sections flexible, addable/removable per trip
- Other agencies: said there's real positive interest, no specifics given (don't reveal the "5 planners pilot" framing to Steve)
- No LinkedIn/social — framed as "looking for the right partner", not self-promotion

## Payment

Shai is PayPal-blocked. Decided 2026-08-29: **Payoneer** — sign up at payoneer.com (KYC required), get a "Global Payment Service" USD receiving account (US routing + account number), send those details or a Payoneer invoice link to Steve so he pays like a domestic US transfer. Not yet set up on Shai's side.

## Next step

Once Steve replies (approves / reacts to the $150 rate and the plan to build into `/magazine/`), rebuild `/magazine/` with the full edit list above.
