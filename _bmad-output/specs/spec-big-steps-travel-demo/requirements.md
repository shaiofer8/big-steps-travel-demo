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

## H — Email 2 (Aug 27) — Format Foundation

> Source: Steve Fader, 2026-08-27 17:54, msg `1a0445c68fe66ac4`, thread `19fc15cbe026d6e3`, subject "Re: Hi".
> **This email was missing from the spec until the 2026-09-04 audit.** Its seven numbered edits were in fact all implemented, but were never tracked as requirements — so nothing was verifying them. Recorded here with the code that satisfies each.

### H1 — Dates more prominent; swap day numbers and dates
**Status:** ✅ DONE — verified 2026-09-04
**Source:** "Dates should be more prominent - swap the locations of the day #'s and the dates"
**Implementation:** `.plan-date` renders first at 1.05rem / weight 600 in the display face; the day-count line (`.plan-countdown`) sits below it in mono at a smaller size.

---

### H2 — City summary block on the arrival day
**Status:** ✅ DONE — verified verbatim 2026-09-04
**Source:** "There should be a summary heading with general information for the City/Location on that first day of arrival" — example given: *"Helsinki- 3 ½ days/ 4 nights Wed 6/10 – Sun 6/14, Temp – 70ish day / 55 night sunrise 3:59a- 10:42p = 18 ½ hrs sunshine, 7 hours ahead of DC"*
**Implementation:** `.city-badges` renders `info.stay`, `info.weather`, `info.hoursAheadDC`. data.js matches Steve's example word for word.

---

### H3 — Sites/Things to Do as bullets with explanations and links, by day
**Status:** ✅ DONE
**Source:** Named examples — Amos Rex, Kamppi Chapel, Hakaniemi Market Hall, Suomenlinna
**Implementation:** all four are EXPLORE entries with `day: "2026-06-10"`, rendered inline in that day block. Covered operationally by F2.

---

### H4 — Food and Transportation sections at the end of each city stay
**Status:** ✅ DONE
**Implementation:** `foodCol` + `transportCol` under the "Tips & General Guidance" heading at the end of each city section. Covered by E5/F8.

---

### H5 — Room for "explanations and color"
**Status:** ✅ DONE
**Source:** "Need to create space for 'explanations and color' – see/review the 6/22 activities"
**Implementation:** 6/22 (Bergen Railway → Flåm → fjord cruise) carries full `blurb`/`detail` text on every block, verbatim from DOCX lines 287–301.

---

### H6 — City photo on the arrival day
**Status:** ✅ DONE
**Source:** "Inserting picture of the city or iconic location helps break up the sea of words… you can never overdue pictures"
**Implementation:** `.city-band` renders `info.cityImage` (falling back to the first EXPLORE image) at the top of every city section.

---

### H7 — Three-way colour coding on reservation cards
**Status:** ✅ DONE (see note)
**Source:** "change the 'view reservation details' buttons from all yellow to blue/hotel, orange/planes-boats-trains and green/tours"
**Implementation:** `--c-hotel:#2f5fd0` (blue) · `--c-transport:#c9962f` (amber) · `--c-tour:#2f7d52` (green), applied via `.restype-*`.
**Note:** the transport colour is amber/gold rather than a pure orange. Steve has seen it across three review rounds without objection, and in Email 5 he referred to this colour family approvingly ("highlighted in yellow/orange **like the Reservation link**"). Left as is deliberately.

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
**Status:** ✅ PASSED 2026-09-04 (user screenshot, Windows laptop, Chrome)
- B6: flags render as images at text size — `Finland 🇫🇮 · Estonia 🇪🇪 · Sweden 🇸🇪 · Norway 🇳🇴` ✅
- Rail: "Click for Quick Search" + city links + both orange action buttons ✅
- Hero: 3 lines, one typeface, decreasing size, no "Escape", no white banner ✅
- **Found and fixed:** Kamppi Chapel and Hakaniemi Market Hall rendered as broken images (both URLs 404). Replaced; all 20 image URLs re-verified 200, and 51/51 `<img>` elements confirmed loading in-browser.

### QA2 — Real iPhone
**Status:** ✅ PASSED 2026-09-04 (user screenshots, iPhone Safari)
- C5: fixed bottom bar present at every scroll position, city chips scrollable, both orange buttons ✅
- **Found and fixed:** Twemoji injected `<img class="emoji">` with no sizing, so each flag rendered ~170px tall and broke the hero onto multiple lines. Added `img.emoji{height:1em;width:1em}`; re-verified a 512px source SVG now renders at 13.75px.

### QA3 — Layout geometry (Playwright, machine-verifiable)
**Status:** ✅ PASSED 2026-09-04 at 1280 / 1500 / 1700 / 1920px
- No content/rail overlap at any width (min gap 9px at 1280)
- Tile grids fill their rows: Helsinki 4-up at 238px, Stockholm/Tallinn/Oslo/Bergen 4-up at 249px, zero unused row space
- Rows holding one or two tiles render normal 360px cards rather than stretching

### QA4 — Wide-screen visual review
**Status:** ⏳ PENDING — awaiting user access to a desktop
**Why:** the >1500px measure change (840px → 1100px) has been measured but not seen. Geometry is sound; the aesthetic result is unconfirmed. Below 1500px nothing changed.

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
