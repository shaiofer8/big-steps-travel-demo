# Requirements Companion — Big Steps Travel

Source: bst-spec.html v4 (2026-08-31) + Email 3 (Aug 29) + Email 4 (Aug 31) + ITINERARY.docx (362 lines).  
Last full review: 2026-09-02 (PM cross-check of all emails + DOCX + code).

---

## A — Content Fidelity

### A1 — All itinerary text verbatim from DOCX
**Status:** ✅ DONE (data.js) / ❌ app.js must render it all  
**Priority:** P0  
**Source:** Email 3 — "AI condensed the itinerary content (added words that were never in the original)"  
**Data layer:** data.js updated 2026-09-02 — all cities food, EXPLORE tiles, day plan blocks restored verbatim from ITINERARY.txt (362 lines extracted from DOCX via python-docx). No AI content anywhere in data.js.  
**App.js layer — what still needs rendering:**
- All DAYS[].plan[] blocks are in data.js; app.js `planRow()` at lines 84–95 already renders `title`, `time`, `desc` — confirm no truncation.
- Food entries in INFO[].food[] rendered at lines 130–133 — must show `name`, `desc`, `cuisine` (cuisine render = F7, separate req).
**Acceptance test:** Spot-check 5 days (6/10, 6/11, 6/12, 6/19, 6/24) word-for-word against ITINERARY.txt — zero deviations in text, times, prices, restaurant names.

---

### A2 — Day 6/12 — full restore from DOCX
**Status:** ✅ DONE (data.js restored 2026-09-02)  
**Priority:** P0  
**Source:** Email 4 — "These were not updated from last review" + implicit — 6/12 was missing multiple blocks  
**Data layer:** data.js DAYS["2026-06-12"] now has 9 blocks: Temppeliaukio Rock Church, Helsinki Cathedral, Uspenski Cathedral, Kauppatori Market Square, Hakaniemi Market Hall, Old Market Hall Vanha Kauppahalli, Allas Sea Pool, Marimekko Design, Tavastia Club. Matching DOCX lines 46–67.  
**Acceptance test:** Day 6/12 card shows all 9 blocks. Compare one-for-one with ITINERARY.txt lines 46–67.

---

## B — Hero / Intro Page

### B1 — Real BST logo (not SVG placeholder)
**Status:** ❌ BROKEN  
**Priority:** P0  
**Source:** Email 3 — "The BST logo needs to be the current Big Steps Travel Logo" + Email 4 same point repeated  
**Root cause:** `app.js` line 15 defines `LOGO_SVG` as a hardcoded inline SVG drawing. The `<img>` in the hero at line ~182 renders this SVG string instead of the real PNG.  
**Fix required in app.js:**
1. Remove `LOGO_SVG` constant (lines 15–30 approx).
2. Replace hero img with: `<img src="assets/bst-logo.png" alt="Big Steps Travel" style="height:60px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />`
**Asset required:** Download Gmail attachment → save as `magazine/assets/bst-logo.png`  
- Thread: 1a0587e62723f79a (Email 4)  
- Primary attachment ID: `ANGjdJ-Qth9RvmiMZIS3nfMugtEo-Iiv4qmkYukNY3S3DaY_x990nEP1I5OCBLS-ywNm2YrTzPX19cs_zogepLAUgbuVf5cY3QSSHx1AT2_2vkGmMijlijou6hJw1dp9ttf06tUNuW8wUxsm5NlxvIMbTQjcy81kMfMw_LJaXUT8IqSsre5cVFc0EPzb0Gb96nqy7osrbgV_0a3qIvMytomoRP3JSV70o-t4O7nScbkNxpuxpqVBEJgWDaHEzK70gU0ea1ypPC0ondMsodFDsUfwQmzlHz7YxRDFEKTZhFXEZyYJPrjBvT8wnchNwhHWN4rdHr1-hrHjuqMMlP2RR3p283KTV729jWV_3jG4DmTMX-oWy4pA7thmLw2iEyCWiCq6JqGqQ68wlClQfnn4`  
**Acceptance test:** Chrome Windows hero section shows the BST travel agency logo image (not a geometric SVG), ~60px tall, with subtle shadow.

---

### B2 — Slogan "Every Great Journey Begins with BIG Steps™"
**Status:** ✅ DONE  
**Source:** Email 3

---

### B3 — Hero 3-line heading: Client Name / Trip Name / Travel Journal
**Status:** ❌ BROKEN  
**Priority:** P1  
**Source:** Email 3 — "The Carlton Family Scandinavian/Baltic Travel Journal" shown as 3-line stacked heading in Steve's PDF example. Email 4 — same point repeated as "not updated."  
**Root cause:** `app.js` line 182 renders `<h1 class="hero-client">${TRIP.clientTitle}</h1>` — single field, one line. data.js no longer has `clientTitle`; it has `clientName`, `tripName`, `journalLabel`.  
**Current data.js values:**
```js
TRIP.clientName    = "The Carlton Family"
TRIP.tripName      = "Scandinavian/Baltic Escape"
TRIP.journalLabel  = "Travel Journal"
```
**Fix required in app.js (line ~182):**
```html
<div class="hero-heading">
  <div class="hero-client-name">${TRIP.clientName}</div>
  <div class="hero-trip-name">${TRIP.tripName}</div>
  <div class="hero-journal-label">${TRIP.journalLabel}</div>
</div>
```
**CSS required in style.css:** Each line distinct size/weight — `hero-client-name` largest, `hero-trip-name` medium, `hero-journal-label` italic or lighter.  
**Acceptance test:** Hero shows exactly 3 stacked lines: "The Carlton Family" / "Scandinavian/Baltic Escape" / "Travel Journal" — each on its own line, typographically distinct.

---

### B4 — Date range prominent below heading
**Status:** ✅ DONE  
**Source:** Email 3

---

### B5 — Countries line with flags (HTML structure)
**Status:** ✅ DONE  
**Source:** Email 3

---

### B6 — Flag emoji visible on Windows desktop Chrome
**Status:** ❌ BROKEN  
**Priority:** P1  
**Source:** Email 3 — "The flag emojis didn't show in the desktop version on Chrome" + Email 4 same  
**Root cause:** Windows Chrome does not render regional indicator emoji (🇫🇮 🇪🇪 🇸🇪 🇳🇴) without an emoji font declared.  
**Fix required in style.css:** Add emoji fonts to `font-family` on body or `.country-flag` class:
```css
font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
```
**Acceptance test:** Open page in Chrome on Windows (not iPhone). Country flags on intro page and city headers render as colored flag images, not blank squares or missing chars.

---

## C — Navigation

### C1 — "In Flight" → "Departure", "Departure" → "Return"
**Status:** ✅ DONE  
**Source:** Email 3

---

### C2 — City rail larger font
**Status:** ✅ DONE  
**Source:** Email 3

---

### C3 — City rail heading "Click for Quick Search" (underlined)
**Status:** ❌ MISSING  
**Priority:** P1  
**Source:** Email 3 — "There should be a header above the navigation links that says 'Click for Quick Search' and is underlined." Email 4 — same point repeated.  
**Root cause:** City rail in app.js has no heading. The rail renders city links directly.  
**Fix required in app.js (city rail section, find where `.city-rail` or `<nav>` is built):**
```html
<h4 style="text-decoration:underline; font-size:0.85rem; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.05em;">
  Click for Quick Search
</h4>
```
Placed as the first element inside the rail container, before the city link list.  
**Acceptance test:** Desktop left rail shows "CLICK FOR QUICK SEARCH" (underlined) above the city links.

---

### C4 — Reservation+Map buttons in city rail below "Return"
**Status:** ❌ BROKEN  
**Priority:** P1  
**Source:** Email 3 — Steve's screenshot showed "Reservation Links/Info" and "Google Map Links" as buttons under the Return navigation link, not at the bottom of the page. Email 4 — same point repeated as "not updated."  
**Root cause:** app.js renders `quickLinks` as a section at the bottom of the page. Steve wants them as buttons in the desktop city rail, stacked below the last nav link ("Return").  
**Fix required in app.js:**
1. Remove or hide the current page-bottom `quickLinks` section render.
2. In the city rail HTML, after the last `<a>` nav link (Return), add:
```html
<div class="rail-action-buttons" style="margin-top:16px; display:flex; flex-direction:column; gap:8px;">
  <a href="#reservations" class="rail-btn rail-btn--primary">📋 Reservation Links/Info</a>
  <a href="#maps" class="rail-btn rail-btn--secondary">🗺️ Google Map Links</a>
</div>
```
3. CSS: buttons full-width, rounded, colored (primary blue / secondary outline).  
**Mobile note:** Same two buttons appear in mobile bottom bar (C5).  
**Acceptance test:** Desktop rail shows both buttons below "Return" nav link, above any other rail content.

---

### C5 — City switcher visible on iPhone (mobile bottom bar)
**Status:** ❌ BROKEN  
**Priority:** P0  
**Source:** Email 3 — "On iPhone…I couldn't figure out how to navigate between cities." + Email 4 — "City switcher not visible on iPhone."  
**Root cause:** app.js has no mobile-specific navigation. The desktop city rail is presumably hidden on mobile, leaving no navigation.  
**Fix required in app.js + style.css:**
1. Add a `<nav id="mobile-bottom-bar">` fixed to viewport bottom on screens < 768px.
2. Inside: horizontally scrollable row of city chips (Finland 🇫🇮, Estonia 🇪🇪, Sweden 🇸🇪, Norway 🇳🇴, Bergen), Departure, Return.
3. Below chips: two action buttons — "📋 Reservation Links/Info" | "🗺️ Google Map Links"
4. CSS: `position:fixed; bottom:0; left:0; right:0; z-index:100; background: <theme surface>; padding:8px; box-shadow: 0 -2px 8px rgba(0,0,0,0.1);`
5. Desktop: hide with `@media (min-width: 768px) { #mobile-bottom-bar { display:none; }}`
6. Body: `padding-bottom: 80px` on mobile to avoid content hidden behind bar.  
**Acceptance test:** On iPhone 390px (Chrome DevTools), scroll to any mid-page city section — fixed bottom bar visible with all city chips + both action buttons. Desktop: bar not visible.

---

## D — Reservation Cards

### D1 — Fully-framed color-coded cards (blue/orange/green)
**Status:** ✅ DONE  
**Source:** Email 3

---

### D2 — Renamed "Reservation Links/Info" + "Google Map Links"
**Status:** ✅ DONE  
**Source:** Email 3

---

## E — Day / City Content

### E1 — Country name under city header (Helsinki, Finland)
**Status:** ✅ DONE  
**Source:** Email 3

---

### E2 — City badges: stay, temp, sunrise, hours-ahead-DC
**Status:** ✅ DONE  
**Source:** Email 3

---

### E3 — Countdown: "Helsinki – day 1 of 3 / Trip – day 1 of 17"
**Status:** ✅ DONE  
**Source:** Email 3

---

### E4 — Boxed and separated day sections
**Status:** ✅ DONE  
**Source:** Email 3

---

### E5 — Food & Drink clickable (Google Maps + TripAdvisor)
**Status:** ✅ DONE  
**Source:** Email 3

---

## F — Sites, Links & Add-ons

### F1 — Inline links per day at point of use
**Status:** ❌ BROKEN (data ✅ done, app.js ❌ not rendering)  
**Priority:** P1  
**Source:** Email 3 — "There needs to be capability to have the links for added information/videos/etc visible on the actual day at the point of need/use, not at end of stay. Examples: HEL = Helsinki Airport | Finavia … Helsinki Travel Guide - Finland … Helsinki – Private Highlights and Hidden Gems – 3 hr WithLocals." Email 4 — same examples repeated as "not updated."  
**Data layer:** links[] arrays are in data.js for 6 days:
- 6/10: HEL Airport, myhelsinki.fi, Helsinki video, HSL App video, Helsinki Card/Stromma, Suomenlinna, Ferry Market Square
- 6/11: WithLocals booking, Walking tour video, Paja Workshop
- 6/12: (day plan items already include descriptions of Rock Church, Allas, Tavastia, etc.)
- 6/13: Visit Tallinn
- 6/14: Visit Stockholm
- 6/19: Visit Oslo, Oslo Pass
- 6/24: Bergen pubs/bars, Bergen restaurants  
**Root cause:** `links[]` is on the **day object** (`d.links`), NOT on individual blocks. app.js lines 108–117 build each day block via `group.days.map()` — currently renders only `d.blocks.map(planRow)`, no `d.links` render.  
**Fix required in app.js — inside the day loop (lines 108–117), add links render after blocks:**
```js
const planHtml = group.days.map((entry, ci) => {
  const d = entry.day;
  const countdown = `...`;
  const dayLinksHtml = (d.links || []).map(l =>
    `<a class="day-link" href="${l.url}" target="_blank" rel="noopener">🔗 ${l.label}</a>`
  ).join('');
  return `
  <div class="plan-day">
    <div class="plan-day-head">...</div>
    <div class="plan-countdown mono">${countdown}</div>
    ${d.blocks.map((b) => planRow(b)).join("")}
    ${dayLinksHtml ? `<div class="day-links-bar">${dayLinksHtml}</div>` : ""}
  </div>`;
}).join("");
```
**`planRow()` function does NOT need to change** — links are at day level, not block level.  
**Acceptance test:** Day 6/10 arrival block shows at least 3 clickable links including "Helsinki Airport Arrival Guide (Video)" and "HSL App — Public Transport Step-by-Step Guide". Day 6/11 shows WithLocals booking link.

---

### F2 — Activity tiles inline in correct day (Steve's mapping)
**Status:** ❌ BROKEN (data ✅ done, app.js ❌ not filtering by day:)  
**Priority:** P1  
**Source:** Email 3 — "Suomenlinna Sea Fortress is placed on June 10 (not in the add-on options)." Email 4 — "Activity tiles not placed correctly, ABBA Museum should be day X, Rock Church day 6/12."  
**Steve's mapping (content-sources.md):**

| EXPLORE Item | Day |
|---|---|
| Suomenlinna Sea Fortress | 2026-06-10 |
| Amos Rex Museum | 2026-06-10 |
| Kampii Chapel | 2026-06-10 |
| Hakaniemi Hall | 2026-06-10 |
| Temppeliaukio Rock Church | 2026-06-12 |
| Design Museum | 2026-06-11 |
| Allas Sea Pool | 2026-06-12 |
| Tavastia | 2026-06-12 |
| Paja Workshop | 2026-06-11 |
| Gamla Stan | 2026-06-14 |
| Vasa Museum | 2026-06-16 |
| ABBA Museum | 2026-06-16 |

**Data layer:** All items above have `day:` field set in data.js EXPLORE arrays.  
**Root cause:** app.js `citySection()` function (lines 119–125 approx) renders `sites` grid from ALL EXPLORE items for the city — no filter by `day:` field.  
**Fix required in app.js `citySection()` function:**
```js
// In each day block render, get tiles for THIS day:
const dayTiles = (EXPLORE[city] || []).filter(e => e.day === dayKey);
// Render dayTiles inside the day block, after planRows + links

// In citySection() Add-on Options grid, filter OUT day-assigned tiles:
const addonTiles = (EXPLORE[city] || []).filter(e => !e.day);
// Render addonTiles in the Add-on Options grid at end of city section
```
**Acceptance test:** Day 6/10 block shows Suomenlinna + Amos Rex + Kampii Chapel + Hakaniemi Hall tiles inline. Day 6/12 block shows Rock Church + Allas Pool + Tavastia tiles inline. Add-on Options grid shows NO tiles that have a day: assignment.

---

### F3 — "Sites & Things to Do" → "Add on Options of Things to Do & See"
**Status:** ✅ DONE  
**Source:** Email 3

---

### F4 — "Before You Go" → "Tips & General Guidance"
**Status:** ✅ DONE  
**Source:** Email 3

---

### F5 — All tours and tiles from DOCX present in data.js
**Status:** ✅ DONE (data.js updated 2026-09-02)  
**Priority:** P1  
**Source:** Email 3 — "ABBA Museum, Brad Paisley Concert, Helsinki Synagogue Tour were missing."  
**What was added to data.js EXPLORE on 2026-09-02:**
- Helsinki: Kampii Chapel, Hakaniemi Hall, Design Museum, Allas Sea Pool, Tavastia, Paja Workshop (all with day: fields)
- Stockholm: Drottningholm Palace, Golden Hits Recording Studio, Stockholm City Hall, Fotografika, Royal Armory, Riddarholmen Church (Add-on Options)
- Tallinn: Raeapteek, Calamaya, Olde Hansa
- Oslo: Damstredet, Nobel Peace Center
- Bergen: Old Bergen Museum, Ulriken Cable Car, Sandviken
- ABBA Museum, Vasa Museum: day: fields set to 2026-06-16  
**Acceptance test:** data.js diff shows all items above present. None of Helsinki/Stockholm/Oslo/Bergen/Tallinn EXPLORE arrays are empty.

---

### F6 — Add-on Options section for all cities
**Status:** ❌ BROKEN (OQ-1 resolved: ALL cities get it — app.js must render for all)  
**Priority:** P1  
**Source:** OQ-1 resolved 2026-09-02 — User decision: every city shows "Add on Options of Things to Do & See" grid at end of city section. Original DOCX only had this section explicitly for Stockholm, but user confirmed it should be on all cities.  
**Root cause:** app.js `citySection()` may conditionally render the Add-on Options section based on whether EXPLORE items exist, OR it renders it for specific cities only. Need to confirm and fix.  
**Fix required in app.js:** In `citySection()` function, always render the Add-on Options grid for every city, populated with EXPLORE items that do NOT have a `day:` field:
```js
const addonTiles = (EXPLORE[city] || []).filter(e => !e.day);
// Always render the grid section, even if addonTiles is empty
// (shows "More to Discover" header; empty grid hidden by CSS)
```
**Acceptance test:** All 5 city sections (Helsinki, Tallinn, Stockholm, Oslo, Bergen) have an "Add on Options of Things to Do & See" grid section. No tiles that have a `day:` assignment appear in the grid.

---

### F7 — Food cuisine labels (Finnish, Swedish, etc.)
**Status:** ❌ BROKEN (data ✅ done, app.js ❌ not rendering cuisine field)  
**Priority:** P1  
**Source:** Email 3 — "Each restaurant entry should show what type of cuisine it is (Finnish, Swedish, Italian, etc.)"  
**Data layer:** All INFO[].food[] entries now have `cuisine:` field in data.js (e.g. `cuisine: "Finnish"`, `cuisine: "Italian"`, etc.).  
**Root cause:** app.js food render (lines 130–133 approx) shows `f.name` and `f.desc` — no `f.cuisine`.  
**Fix required in app.js food render:**
```js
function foodRow(f) {
  return `<div class="food-row">
    ${f.cuisine ? `<span class="food-cuisine-pill">${f.cuisine}</span>` : ''}
    <strong>${f.name}</strong>
    ${f.desc ? `<span class="food-desc"> — ${f.desc}</span>` : ''}
    <div class="food-links">
      <a href="https://maps.google.com/?q=${encodeURIComponent(f.name)}" target="_blank">📍 Maps</a>
      <a href="https://www.tripadvisor.com/Search?q=${encodeURIComponent(f.name)}" target="_blank">⭐ TripAdvisor</a>
    </div>
  </div>`;
}
```
**CSS required:** `.food-cuisine-pill` — small badge, colored by cuisine type or uniform accent.  
**Acceptance test:** Each restaurant in every city's food section shows a cuisine label pill before the name (e.g. "Finnish · Kappeli Restaurant — ...").

---

### F8 — Transport links at point of use (Helsinki arrival day)
**Status:** ❌ MISSING (new — not in original 30 reqs, added from DOCX + Email 3/4 cross-check)  
**Priority:** P1  
**Source:** Email 3 — "HSL App – Transportation App Public Transport in Finland - Step-by-Step Guide for Tickets & Routes! [YouTube link] Helsinki Transport Card - Helsinki Card – Sightseeing & Excursions | Stromma.com" — listed as examples of links needed at point of use. Email 4 — same links repeated as "still missing."  
**Data layer:** `INFO.Helsinki.transportLinks` array added 2026-09-02:
```js
[
  { label: "HSL App — Public Transport Step-by-Step Guide (Video)", url: "https://www.youtube.com/watch?v=A_bGZomICVE" },
  { label: "Helsinki Card — Sightseeing & Excursions (Stromma)", url: "https://www.stromma.com/en-fi/helsinki/city-pass/helsinki-card/" }
]
```
Also added to `DAYS["2026-06-10"].links[]` so they render inline on arrival day (F1 covers this).  
**App.js render — CRITICAL:** app.js lines 136–140 render `info.transportTips` (plain text array, `<li>${t}</li>`). `info.transportLinks` (array of `{label, url}` objects) is **completely absent** from app.js rendering — no code handles it at all.  
**Fix required in app.js (after transportCol block, lines ~136–140):**
```js
const transportLinksHtml = (info.transportLinks || []).map(l =>
  `<li><a class="transport-link" href="${l.url}" target="_blank" rel="noopener">🔗 ${l.label}</a></li>`
).join('');

const transportCol = (info.transportTips || info.transportLinks) ? `
  <div class="guide-col">
    <h4>Getting Around</h4>
    <ul>
      ${(info.transportTips || []).map((t) => `<li>${t}</li>`).join("")}
      ${transportLinksHtml}
    </ul>
  </div>` : "";
```
**Acceptance test:** Helsinki "Tips & General Guidance" section shows both HSL App video and Helsinki Card/Stromma as clickable links, not plain text.

---

### F9 — HEL Airport YouTube video URL from DOCX (was missing from data.js)
**Status:** ✅ DONE (data.js fixed 2026-09-02 pass 4)  
**Priority:** P1  
**Source:** ITINERARY.txt line 11 — `HEL = Helsinki Airport | Finavia - https://www.youtube.com/watch?v=DCIsFoVjhpA`  
**Gap found:** DOCX explicitly lists the HEL Airport link as a YouTube video (DCIsFoVjhpA). data.js previously only had the Finavia website URL. This is a verbatim-DOCX violation (A1).  
**Fix:** Added `{ label: "Helsinki Airport Arrival Guide (Video)", url: "https://www.youtube.com/watch?v=DCIsFoVjhpA" }` to `DAYS["2026-06-10"].links[]`. Both website and video now present.  
**Acceptance test:** Day 6/10 links section shows: Finavia website AND airport video link.

---

### F10 — Bergen Card clickable link (currently text-only in transportTips)
**Status:** ❌ MISSING  
**Priority:** P1  
**Source:** ITINERARY.txt line 343 — `Bergen Card 24hr $42 / 48hr $54 ... en.visitbergen.com/bergen-card`  
**Gap:** Bergen Card is in `INFO.Bergen.transportTips` as plain text only. The URL `https://en.visitbergen.com/bergen-card` is not clickable.  
**Fix required — two options (either):**
1. Add `INFO.Bergen.transportLinks: [{ label: "Bergen Card — Official Website", url: "https://en.visitbergen.com/bergen-card" }]` and render via F8 fix.
2. OR add to `DAYS["2026-06-22"].links[]` (arrival in Bergen) as an inline link.  
**Recommended:** Add to both — transportLinks (for Tips section) AND day 6/22 links[] (at point of use, arrival day).  
**Acceptance test:** Bergen "Tips & General Guidance" section shows Bergen Card as a clickable link.

---

## QA — Quality Assurance

### QA1 — Visual test Chrome desktop Windows
**Status:** ⏳ PENDING (after all ❌ items fixed)  
**What to verify:**
- B1: BST logo image (not SVG)
- B3: 3-line hero heading
- B5+B6: Flag emoji rendered on all country lines
- C3: "Click for Quick Search" heading in rail
- C4: Reservation+Map buttons below Return in rail
- E3: Countdown line on every day card
- F1: Inline links on days 6/10 and 6/11
- F2: EXPLORE tiles in correct day blocks
- F6: Add-on Options grid on all 5 cities
- F7: Cuisine pills on all food entries
- No console errors

---

### QA2 — Visual test iPhone 390px (Chrome DevTools)
**Status:** ⏳ PENDING (after all ❌ items fixed)  
**What to verify:**
- C5: Mobile bottom bar visible and scrollable at any scroll position
- All city chips + Reservation/Map buttons visible in bottom bar
- Page content not hidden behind bottom bar (padding-bottom)
- F1, F2, F6, F7 all render correctly at 390px width

---

## G — Communication

### G1 — Draft email to Steve (vague-but-confident)
**Status:** ⏳ PENDING — user approval required before any send  
**Constraints:**
- Never send without explicit user approval of full message text
- Never mention 5-planner pilot
- Never reveal pricing discussions in email
- Approved response for "other agencies": "General feedback on the format direction has been positive — the scroll-based layout and the visual structure are resonating. I'll share more as the picture fills out; at this stage I'm keeping each conversation focused."
- Rate: $150 flat/itinerary. Payment: Payoneer only (user is PayPal-blocked).

---

## Stats (updated 2026-09-02 pass 4)
- **Total:** 33 (added F8, F9, F10 from DOCX/code cross-check)
- **Done ✅:** 17 (A2, B2, B4, B5, C1, C2, D1, D2, E1, E2, E3, E4, E5, F3, F4, F5, F9)
- **Broken/Missing ❌:** 13 (A1-render, B1, B3, B6, C3, C4, C5, F1-render, F2-render, F6-render, F7-render, F8-render, F10)
  - Data layer fully done for: A1, A2, F1, F2, F5, F7, F8, F9
  - app.js layer broken for: B1, B3, B6, C3, C4, C5, F1, F2, F6, F7, F8
  - data.js missing (small fix): F10 (Bergen Card link)
- **Pending ⏳:** 3 (QA1, QA2, G1)

## Build Priority Order
1. **P0 first:** B1 (BST logo), C5 (mobile bottom bar)
2. **P1 batch:** B3 (hero 3-line), B6 (emoji font CSS), C3 (rail heading), C4 (rail buttons), F1 (links render), F2 (EXPLORE day filter), F6 (Add-on Options all cities), F7 (cuisine pill), F8 (transport links render)
3. **QA:** QA1 + QA2 visual passes
4. **G1:** Draft email → user approval → send
