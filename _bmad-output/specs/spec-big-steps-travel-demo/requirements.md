# Requirements Companion — Big Steps Travel

Source: bst-spec.html v4 (2026-08-31) + Email 3 (Aug 29, "Love these iterations!") + Email 4 (Aug 31) + ITINERARY.docx (362 lines).  
Last full review: 2026-09-03 (memlog pass 5 — email verification + code status update).

---

## Status Legend
- ✅ DONE — implemented and verified in code
- ❌ BROKEN/MISSING — not yet in app.js/style.css; data layer may be done
- ⏳ PENDING — depends on other work or awaiting external input

---

## A — Content Fidelity

### A1 — All itinerary text verbatim from DOCX
**Status:** ✅ DONE (data.js) / app.js renders all fields; no truncation found in pass 4 review  
**Priority:** P0  
**Source:** Email 3 — "AI condensed the itinerary content (added words that were never in the original)"  
**Data layer:** All cities food, EXPLORE tiles, day plan blocks restored verbatim from ITINERARY.txt (362 lines). No AI content.  
**Acceptance test:** Spot-check 5 days (6/10, 6/11, 6/12, 6/19, 6/24) word-for-word against ITINERARY.txt — zero deviations.

---

### A2 — Day 6/12 — full restore from DOCX
**Status:** ✅ DONE  
**Priority:** P0  
**Source:** Email 4 — "These were not updated from last review"  
**Data layer:** DAYS["2026-06-12"] has 9 blocks: Rock Church, Helsinki Cathedral, Uspenski Cathedral, Kauppatori, Hakaniemi, Old Market Hall, Allas Sea Pool, Marimekko, Tavastia. Matching DOCX lines 46–67.  
**Acceptance test:** Day 6/12 card shows all 9 blocks.

---

## B — Hero / Intro Page

### B1 — Real BST logo (not SVG placeholder)
**Status:** ❌ NOT BUILT  
**Priority:** P0  
**Source:** Email 3 + Email 4 (repeated)  
**Root cause:** app.js line 15 defines `LOGO_SVG` as hardcoded inline SVG. Must replace with `<img src="assets/bst-logo.png">`.  
**Asset required:** Download from Gmail attachment (thread 1a0587e62723f79a).  
**Acceptance test:** Hero shows real BST logo image (~60px, subtle shadow), not geometric SVG.

---

### B2 — Slogan "Every Great Journey Begins with BIG Steps™"
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 1b

---

### B3 — Hero 3-line heading: Client Name / Trip Name / Travel Journal
**Status:** ❌ NOT BUILT  
**Priority:** P1  
**Source:** Email 3 + Email Aug 29 item 1b + Email 4 (repeated)  
**Root cause:** app.js renders single `TRIP.clientTitle` — field no longer exists in data.js. Must render `clientName` / `tripName` / `journalLabel` as 3 distinct stacked lines.  
**Acceptance test:** Hero shows "The Carlton Family" / "Scandinavian/Baltic Escape" / "Travel Journal" — each on own line, typographically distinct.

---

### B4 — Date range prominent below heading
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 1c

---

### B5 — Countries line with flags (HTML structure)
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 1d

---

### B6 — Flag emoji visible on Windows desktop Chrome
**Status:** ❌ NOT BUILT  
**Priority:** P1  
**Source:** Email 3 + Email Aug 29 item 1d + Email 4 (repeated)  
**Root cause:** Windows Chrome requires explicit emoji font declaration.  
**Fix:** Add `"Segoe UI Emoji", "Noto Color Emoji"` to body/flag font-family in style.css.  
**Acceptance test:** Flag emojis render as colored images on Windows Chrome (not blank squares).

---

## C — Navigation

### C1 — "In Flight" → "Departure", "Departure" → "Return"
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 1f

---

### C2 — City rail larger font
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 1e

---

### C3 — City rail heading "Click for Quick Search" (underlined)
**Status:** ❌ NOT BUILT  
**Priority:** P1  
**Source:** Email 3 + Email 4 (repeated)  
**Fix:** Add `<h4 style="text-decoration:underline; ...">Click for Quick Search</h4>` as first element in city rail container.  
**Acceptance test:** Desktop rail shows "CLICK FOR QUICK SEARCH" (underlined) above city links.

---

### C4 — Reservation+Map buttons in city rail below "Return"
**Status:** ❌ NOT BUILT  
**Priority:** P1  
**Source:** Email 3 + Email Aug 29 item 1g + Email 4 (repeated)  
**Current state:** Buttons render at page bottom, not in rail.  
**Fix:** Move `quickLinks` render into city rail HTML, after last nav link. Buttons: "📋 Reservation Links/Info" + "🗺️ Google Map Links" (full-width, stacked, below "Return").  
**Mobile note:** Same two buttons appear in mobile bottom bar (C5).  
**Acceptance test:** Desktop rail — both buttons visible below "Return" link.

---

### C5 — City switcher visible on iPhone (mobile bottom bar)
**Status:** ❌ NOT BUILT  
**Priority:** P0  
**Source:** Email 3 + Email 4 (repeated)  
**Fix:** Add `<nav id="mobile-bottom-bar">` fixed to viewport bottom (screens < 768px). Inside: horizontal scrollable city chips + Departure/Return + Reservation/Map buttons. CSS: `position:fixed; bottom:0; width:100%; z-index:100`. Body: `padding-bottom:80px` on mobile.  
**Acceptance test:** iPhone 390px — fixed bottom bar with all chips + buttons visible at any scroll position.

---

## D — Reservation Cards

### D1 — Fully-framed color-coded cards (blue/orange/green)
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 2b

---

### D2 — Renamed "Reservation Links/Info" + "Google Map Links"
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 1g

---

## E — Day / City Content

### E1 — Country name under city header ("Helsinki, Finland")
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 2a

---

### E2 — City badges: stay, temp, sunrise, hours-ahead-DC
**Status:** ✅ DONE  
**Source:** Email 3

---

### E3 — Countdown: "Helsinki – day 1 of 3 / Trip – day 1 of 17"
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 2c

---

### E4 — Boxed and separated day sections
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 2d

---

### E5 — Food & Drink clickable (Google Maps + TripAdvisor)
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 2h

---

## F — Sites, Links & Add-ons

### F1 — Inline links per day at point of use
**Status:** ✅ DONE (data ✅ + app.js ✅ — day-links-bar rendering added 2026-09-02)  
**Priority:** P1  
**Source:** Email 3 + Email Aug 29 item 2e — "links for added information/videos/etc visible on the actual day at the point of need/use, not at end of stay"  
**Implementation:** `d.links[]` rendered as gold pill `.day-links-bar` below each day's plan blocks. Links present for days: 6/10, 6/11, 6/13, 6/14, 6/15, 6/16, 6/17, 6/18, 6/19, 6/22, 6/23, 6/24.  
**Acceptance test:** Day 6/10 shows HEL Airport video + Finavia website + HSL App. Day 6/11 shows WithLocals booking.

---

### F2 — Activity tiles inline in correct day (Steve's mapping)
**Status:** ✅ DONE (data ✅ + app.js ✅ — day-field filter added 2026-09-02)  
**Priority:** P1  
**Source:** Email 3 + Email Aug 29 items 2e+2f — "picture links should be inserted into the actual days not bulked together at the end"  
**Steve's mapping (implemented):**

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

**Acceptance test:** Day 6/10 block shows Suomenlinna + Amos Rex + Kampii + Hakaniemi inline. Day 6/12 shows Rock Church + Allas + Tavastia inline. Add-on Options grid has NO day-assigned tiles.

---

### F3 — "Sites & Things to Do" → "Add on Options of Things to Do & See"
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 2g

---

### F4 — "Before You Go" → "Tips & General Guidance"
**Status:** ✅ DONE  
**Source:** Email 3 + Email Aug 29 item 2g

---

### F5 — All tours and tiles from DOCX present in data.js
**Status:** ✅ DONE (data.js updated 2026-09-02)  
**Priority:** P1  
**Source:** Email 3 + Email Aug 29 item 2j — "ABBA Museum, Brad Paisley Concert, Helsinki Synagogue Tour were missing"  
**Added to EXPLORE arrays:** Helsinki (Kampii Chapel, Hakaniemi Hall, Design Museum, Allas Sea Pool, Tavastia, Paja Workshop), Stockholm (Drottningholm, Golden Hits, City Hall, Fotografika, Royal Armory, Riddarholmen), Tallinn (Raeapteek, Calamaya, Olde Hansa), Oslo (Damstredet, Nobel Peace Center), Bergen (Old Bergen Museum, Ulriken, Sandviken). ABBA Museum + Vasa Museum: day: 2026-06-16.  
**Acceptance test:** All EXPLORE arrays non-empty. ABBA Museum tile appears inline on day 6/16.

---

### F6 — Add-on Options section for all cities
**Status:** ✅ DONE (app.js renders for all 5 cities — 2026-09-02)  
**Priority:** P1  
**Source:** OQ-1 resolved — user decision: ALL cities show "Add on Options" grid  
**Implementation:** EXPLORE items without `day:` field render in grid. Items with `day:` render inline.  
**Acceptance test:** All 5 city sections have "Add on Options of Things to Do & See" grid. No day-assigned tiles appear in it.

---

### F7 — Food cuisine labels + "Taste of the City" local food section
**Status:** ✅ DONE (app.js updated 2026-09-02)  
**Priority:** P1  
**Source:** Email 3 + Email Aug 29 item 2i — "Each restaurant entry should show what type of cuisine it is"  
**Implementation:** cuisine label pill before restaurant name; `localFood[]` renders as "🍽 Taste of the City" sub-section below food list.  
**Acceptance test:** Every city food section shows cuisine pills (e.g. "Finnish · Kappeli..."). Cities with localFood[] show "Taste of the City" sub-section.

---

### F8 — Transport links at point of use (Helsinki arrival day)
**Status:** ✅ DONE (app.js updated 2026-09-02)  
**Priority:** P1  
**Source:** Email 3 + Email Aug 29 item 2e — "HSL App – YouTube link; Helsinki Card – Stromma.com" at point of use  
**Implementation:** `info.transportLinks` rendered as clickable links in Getting Around section alongside `transportTips`. HSL App video + Helsinki Card both in INFO.Helsinki.transportLinks and DAYS["2026-06-10"].links[].  
**Acceptance test:** Helsinki "Tips & General Guidance" shows both HSL App video and Helsinki Card as clickable links.

---

### F9 — HEL Airport YouTube video URL from DOCX
**Status:** ✅ DONE (data.js fixed 2026-09-02)  
**Priority:** P1  
**Source:** ITINERARY.txt line 11 — `HEL = Helsinki Airport | Finavia - https://www.youtube.com/watch?v=DCIsFoVjhpA`  
**Implementation:** Added `{ label: "Helsinki Airport Arrival Guide (Video)", url: "https://www.youtube.com/watch?v=DCIsFoVjhpA" }` to `DAYS["2026-06-10"].links[]`.  
**Acceptance test:** Day 6/10 links bar shows airport video link alongside Finavia website.

---

### F10 — Bergen Card clickable link (was text-only)
**Status:** ✅ DONE (data.js + app.js 2026-09-02)  
**Priority:** P1  
**Source:** ITINERARY.txt line 343 — `Bergen Card 24hr $42 / 48hr $54 ... en.visitbergen.com/bergen-card`  
**Implementation:** Bergen Card added to DAYS["2026-06-22"].links[] (arrival day inline) AND INFO.Bergen.transportLinks (Tips section clickable). Rendered via F8 fix.  
**Acceptance test:** Bergen arrival day (6/22) shows Bergen Card link. Bergen "Tips & General Guidance" shows clickable Bergen Card link.

---

## QA — Quality Assurance

### QA1 — Visual test Chrome desktop Windows
**Status:** ⏳ PENDING (after B1, B3, B6, C3, C4, C5 are built)  
**What to verify:**
- B1: Real BST logo image (not SVG)
- B3: 3-line hero heading (3 distinct lines)
- B5+B6: Flag emojis render as colored images (not blank)
- C3: "CLICK FOR QUICK SEARCH" underlined heading in rail
- C4: Reservation+Map buttons below "Return" in rail
- E3: Countdown line on every day card
- F1: Inline links on days 6/10, 6/11, 6/22, etc.
- F2: EXPLORE tiles in correct day blocks (Suomenlinna on 6/10, ABBA on 6/16)
- F6: Add-on Options grid on all 5 cities
- F7: Cuisine pills on all food entries
- No console errors

---

### QA2 — Visual test iPhone 390px (Chrome DevTools)
**Status:** ⏳ PENDING (after C5 is built)  
**What to verify:**
- C5: Mobile bottom bar visible and scrollable at any scroll position
- All city chips + Reservation/Map buttons in bottom bar
- Body padding-bottom so content not hidden behind bar
- F1, F2, F6, F7 render correctly at 390px

---

## G — Communication

### G1 — Email to Steve (approved + sent)
**Status:** ✅ SENT — awaiting Steve's reply  
**Sent:** 2026-09-02 (message ID 1a06338a3bf6e212, thread 1a0587e62723f79a)  
**As of:** 2026-09-03 — no reply yet  
**Constraints (standing):**
- Never send without explicit user approval of full message text
- Never mention 5-planner pilot
- Rate: $150/itinerary; Payoneer only (PayPal-blocked)
- Approved "other agencies" response: "General feedback on the format direction has been positive — the scroll-based layout and the visual structure are resonating. I'll share more as the picture fills out; at this stage I'm keeping each conversation focused."

---

## Stats (updated 2026-09-03 pass 5)
- **Total:** 33
- **Done ✅:** 24 (A1, A2, B2, B4, B5, C1, C2, D1, D2, E1, E2, E3, E4, E5, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10)
- **Not Built ❌:** 6 (B1, B3, B6, C3, C4, C5) — all require app.js/style.css changes; no data-layer dependencies
- **Pending ⏳:** 2 (QA1, QA2) — after ❌ items built
- **Sent/Awaiting ✅⏳:** 1 (G1)

## Remaining Build Priority
1. **P0:** B1 (BST logo PNG), C5 (mobile bottom bar)
2. **P1 batch:** B3 (3-line hero), B6 (emoji font CSS), C3 (rail heading), C4 (rail buttons)
3. **QA:** QA1 + QA2

## Email Coverage Map (Aug 29 email → spec requirements)
Steve's Aug 29 email item → spec req:
- Initial page logo → B1 ❌
- Initial page slogan → B2 ✅
- Client name/journal → B3 ❌
- Date range → B4 ✅
- Countries + flags → B5 ✅, B6 ❌
- City switchers larger → C2 ✅
- "In Flight"/"Departure" rename → C1 ✅
- Reservation/Map buttons below Return → C4 ❌
- Country name on city → E1 ✅
- Color-coded fully-framed circles → D1 ✅
- Countdown sequence → E3 ✅
- Box/separate day sections → E4 ✅
- Links at point of use → F1 ✅, F8 ✅
- Tiles in actual days → F2 ✅
- Rename Add-on Options → F3 ✅
- Rename Tips & General Guidance → F4 ✅
- Food clickable → E5 ✅
- Missing tours → F5 ✅
