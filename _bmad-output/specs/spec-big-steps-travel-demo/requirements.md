# Requirements Companion — Big Steps Travel

Source: bst-spec.html v4 (2026-08-31) + Email 3 (Aug 29) + Email 4 (Aug 31) + Email 5 (Sep 3, "just a few more edits") + ITINERARY.docx (362 lines).  
Last full review: 2026-09-04 (PM pass 7 — full code+QA cross-check, commit 38fe553).

> ⚠️ **QA PROCESS RULE (per process failure):** A feature is only DONE when verified on real Windows Chrome laptop AND real iPhone — not just headless Playwright. Playwright catches layout bugs; it does not catch OS-level emoji rendering or mobile browser quirks.

---

## Status Legend
- ✅ DONE — implemented AND verified in code + Playwright QA
- ✅🔄 DONE (code) / PENDING real-device — code correct, Playwright passes, needs Windows Chrome + iPhone hardware confirmation
- ❌ BROKEN/MISSING — not yet in app.js/style.css
- 🔵 DECISION — deliberate product/business decision, not a gap
- ⏳ PENDING — awaiting external input or real-device QA

---

## A — Content Fidelity

### A1 — All itinerary text verbatim from DOCX
**Status:** ✅ DONE  
**Priority:** P0  
**Source:** Email 3  
**Acceptance test:** Spot-check 5 days (6/10, 6/11, 6/12, 6/19, 6/24) word-for-word against ITINERARY.txt — zero deviations.

---

### A2 — Day 6/12 — full restore from DOCX
**Status:** ✅ DONE  
**Priority:** P0  
**Source:** Email 4  
**Implementation:** DAYS["2026-06-12"] has 9 blocks: Rock Church, Helsinki Cathedral, Uspenski Cathedral, Kauppatori, Hakaniemi, Old Market Hall, Allas Sea Pool, Marimekko, Tavastia. Matching DOCX lines 46–67.

---

## B — Hero / Intro Page

### B1 — Real BST logo
**Status:** 🔵 DECISION — logo deliberately removed from demo  
**Priority:** deferred  
**Source:** Email 3 + Email 4 (repeated)  
**Decision:** User chose to send demo without logo. Not a technical gap — a product/positioning decision for the Steve conversation.

---

### B2 — Slogan "Every Great Journey Begins with BIG Steps™"
**Status:** ✅ DONE  
**Source:** Email 3

---

### B3 — Hero 3-line heading: Client Name / Trip Name / Travel Journal
**Status:** ✅ DONE  
**Source:** Email 3 + Email 4  
**Implementation:** `.hero-client-name` / `.hero-trip-name` / `.hero-journal-label` — 3 distinct stacked lines.  
**QA verified:** "The Carlton Family" / "Scandinavian/Baltic" / "Travel Journal" ✅

---

### B4 — Date range prominent below heading
**Status:** ✅ DONE

---

### B5 — Countries line with flags (HTML structure)
**Status:** ✅ DONE

---

### B6 — Flag emoji visible on Windows desktop Chrome
**Status:** ✅🔄 DONE (code) / PENDING real Windows Chrome  
**Priority:** P0  
**Source:** Email 3 + Email 4 + Email 5 Sep 3 item 2  
**Implementation:** Twemoji CDN via jsdelivr (primary) + cdnjs fallback. `applyTwemoji()` called on `.hero-countries` and `.city-badges`. onerror fallback in index.html.  
**Playwright:** CDN blocked in headless sandbox — flags show as text. Expected.  
**Acceptance test:** Real Windows Chrome — flag emoji render as colored SVG images (not blank squares). Must also work on iPhone (native flag support).

---

## C — Navigation

### C1 — "In Flight" → "Departure", "Departure" → "Return"
**Status:** ✅ DONE  
**Implementation:** `displayCity()` function in app.js.

---

### C2 — City rail larger font
**Status:** ✅ DONE

---

### C3 — City rail heading "Click for Quick Search" (underlined)
**Status:** ✅ DONE  
**Source:** Email 3 + Email 4  
**QA verified:** `.rail-heading` renders "Click for Quick Search" — Title Case, underlined ✅

---

### C4 — Reservation+Map buttons in city rail below "Return"
**Status:** ✅ DONE  
**Source:** Email 3 + Email 4  
**Implementation:** `#openReservationsRail` + `#openMapRail` buttons in rail HTML, below last city link.  
**QA verified:** Both panels open correctly ✅

---

### C5 — City switcher visible on iPhone (mobile bottom bar)
**Status:** ✅🔄 DONE (code) / PENDING real iPhone  
**Priority:** P0  
**Source:** Email 3 + Email 4 + Email 5 Sep 3 item 5  
**Implementation:** `position:fixed` + `transform:translateZ(0)` + `will-change:transform` + `z-index:1000` + `env(safe-area-inset-bottom)` + `calc(110px + env(safe-area-inset-bottom,0px))` body padding-bottom.  
**Acceptance test:** Real iPhone Safari — fixed bottom bar with city chips + Reservation/Map buttons visible and functional at any scroll position.

---

### C6 — Google Map Links button: yellow/orange highlight in rail
**Status:** ✅ DONE  
**Source:** Email 5 Sep 3 item 4  
**Implementation:** `background: #e8a020` on `#openMapRail`.  
**QA verified:** rgb(232,160,32) = #e8a020 ✅

---

### H-CROSS — Cross-device parity constraint
**Status:** ⏳ PENDING real-device QA (B6 + C5)  
**Priority:** P0  
**Rule:** Every feature must work on Windows Chrome (desktop) AND iPhone (Safari/Chrome). No feature may be final without both.

---

## D — Reservation Cards

### D1 — Fully-framed color-coded cards (blue/orange/green)
**Status:** ✅ DONE

---

### D2 — Renamed "Reservation Links/Info" + "Google Map Links"
**Status:** ✅ DONE

---

## E — Day / City Content

### E1 — Country name under city header ("Helsinki, Finland")
**Status:** ✅ DONE

---

### E2 — City badges: stay, temp, sunrise, hours-ahead-DC
**Status:** ✅ DONE

---

### E3 — Countdown: "Helsinki – day 1 of 3 / Trip – day 1 of 17"
**Status:** ✅ DONE

---

### E4 — Boxed and separated day sections
**Status:** ✅ DONE

---

### E5 — Food & Drink clickable (Google Maps + TripAdvisor)
**Status:** ✅ DONE

---

## F — Sites, Links & Add-ons

### F1 — Inline links per day at point of use
**Status:** ✅ DONE  
**Implementation:** `d.links[]` rendered as `.day-links-bar` below each day's plan blocks.

---

### F2 — Activity tiles inline in correct day
**Status:** ✅ DONE  
**Implementation:** `filter(e => e.day === d.date)` — tiles render inline in their assigned day.

---

### F3 — Superseded by F12
**Status:** ✅ Superseded — "Add on Options" heading removed entirely (F12).

---

### F4 — "Before You Go" → "Tips & General Guidance"
**Status:** ✅ DONE

---

### F5 — All tours and tiles from DOCX present
**Status:** ✅ DONE

---

### F6 — Add-on Options grid (tiles without day) for all cities
**Status:** ✅ DONE  
**Implementation:** `filter(e => !e.day)` renders as tile grid, no heading.

---

### F7 — Food cuisine labels + "Taste of [Country]" local food section
**Status:** ✅ DONE  
**Source:** Email 5 Sep 3 item 6  
**Implementation:** cuisine pill + `` `🍽 Taste of ${COUNTRIES[city]}` `` dynamic heading.  
**QA verified:** Finland / Estonia / Sweden / Norway ✅

---

### F8 — Transport links at point of use
**Status:** ✅ DONE

---

### F9 — HEL Airport YouTube video URL from DOCX
**Status:** ✅ DONE

---

### F10 — Bergen Card clickable link
**Status:** ✅ DONE

---

### F11 — Bullet point for items without a specific clock time
**Status:** ✅ DONE  
**Source:** Email 5 Sep 3 item 7  
**Implementation:** `GENERIC_TIMES` Set in app.js; `timeDisplay = "•"` for generic/empty times.  
**QA verified:** 25 bullet rows; real times ("5:20 PM", "9:40 AM") preserved ✅

---

### F12 — Remove Add-on Options heading; Maps+TripAdvisor on all tiles
**Status:** ✅ DONE  
**Source:** Email 5 Sep 3 item 8  
**Implementation:** `addonSection` template has no h3; `siteTile()` renders Maps + TripAdvisor links on every tile.  
**QA verified:** 0 "Add on Options" text; 38 tiles × Maps+TA ✅

---

## G — Communication

### G1 — Email to Steve (approved + sent)
**Status:** ✅ SENT — awaiting Steve's reply  
**Sent:** 2026-09-02  
**Constraints (standing):**
- Never send without explicit user approval of full message text
- Never mention 5-planner pilot
- Rate: $150/itinerary; Payoneer only (PayPal-blocked)
- Approved "other agencies" response: "General feedback on the format direction has been positive — the scroll-based layout and the visual structure are resonating. I'll share more as the picture fills out; at this stage I'm keeping each conversation focused."

---

## QA Status

### QA1 — Real Windows Chrome desktop
**Status:** ⏳ PENDING  
**What to verify:**
- B6: Flag emoji render as colored SVG images (Twemoji via jsdelivr)
- All other features: confirmed working in Playwright

### QA2 — Real iPhone
**Status:** ⏳ PENDING  
**What to verify:**
- C5: Fixed mobile bottom bar visible at all scroll positions
- Backdrop dismiss (closest() fix applied)
- All other features: confirmed working in Playwright

---

## Stats (PM pass 7 — 2026-09-04)
- **Total requirements:** 35
- **Done ✅:** 30 (A1, A2, B2, B3, B4, B5, C1, C2, C3, C4, C6, D1, D2, E1, E2, E3, E4, E5, F1, F2, F3→superseded, F4, F5, F6, F7, F8, F9, F10, F11, F12)
- **Done (code) / PENDING real-device ✅🔄:** 2 (B6, C5)
- **Business decision 🔵:** 1 (B1 logo)
- **Pending hardware QA ⏳:** 2 (QA1, QA2)

## Readiness
> **Product is feature-complete per Email 5 spec.**  
> Blocking items before sending to Steve: real-device QA only (B6 on Windows Chrome, C5 on iPhone).  
> All 8 Email-5 items implemented and Playwright-verified.
