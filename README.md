# Big Steps Travel — Nordic & Baltic Escape

A demo transformation of a real client itinerary ("Itinerary - Nordic-Baltic
Region Scandinavia 2026 - Shared.docx") into a Travel Companion web app:
day-by-day plan, reservations linked inline into the timeline, curated
Explore highlights per city, a one-tap Google Maps index, and practical
per-city info.

Built to answer the specific gap flagged in feedback on the first demo
(usa-2023-trip.netlify.app): reservation detail (flights, hotels, tours)
needs to be available for reference exactly where it's relevant in the
itinerary, not just a general destination overview.

- `data.js` — the itinerary content (reservations, day-by-day, explore, info)
- `index.html` / `style.css` / `app.js` — the app itself, no build step
- Images are hotlinked from Wikimedia Commons (verified live, not stored in this repo)
- Every location is a live Google Maps search link

## Run locally
```
npx serve .
```
