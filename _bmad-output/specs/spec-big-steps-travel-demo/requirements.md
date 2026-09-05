# Requirements Companion — Big Steps Travel

Source: bst-spec.html v4 (2026-08-31) + Email 2 (Aug 27) + Email 3 (Aug 29) + Email 4 (Aug 31) + Email 5 (Sep 3, "just a few more edits") + Email 6 (Sep 5, "I think we will be done with these edits!!!") + ITINERARY.docx (362 lines).  
Last full review: 2026-09-05 (PM pass 8 — Email 6 line-by-line, commit a014537).

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
**Status:** ✅ DONE — verified 2026-09-05  
**Priority:** P0  
**Source:** Email 3 + Email 4 (repeated) + **Email 6 Sep 5 item 1 (confirms original file is correct)**  
**History (do not repeat this mistake):** logo was pulled entirely on 2026-09-03 on a misreading of an unrelated instruction ("no logo in the email to Steve" got applied to the site). A later session restored it but made the background *transparent*, on the theory that the logo's own cream background was the "random Big Steps Travel in white banner" from Email 5 item 3. **That theory was wrong.** The code comment on B9 (below) already said the white banner was the *topbar*, removed the same day as a separate fix — before the logo was ever touched. Email 6 item 1 confirms this directly: *"Yes, the logo should be the version that was there originally with yellow background."*  
**Implementation:** `magazine/assets/bst-logo.png` restored to the exact original file (git `7a09fe2`) — opaque cream background, unmodified. `.hero-logo-img{height:60px}` with a plain `drop-shadow` for lift; the white-halo filter hack from the transparency era was removed as no longer needed.  
**Acceptance test:** Hero shows the original logo badge, unedited, above the slogan. QA screenshot 2026-09-05 confirms 92×82 natural size, loads correctly, matches Steve's approval.

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
**Status:** ✅ DONE — verified 2026-09-05 on user's own Windows laptop (screenshot)  
**Priority:** P0  
**Source:** Email 3 + Email 4 + Email 5 Sep 3 item 2 (STILL BROKEN as of that email)  
**Implementation:** Twemoji CDN via jsdelivr (primary) + cdnjs fallback. `applyTwemoji()` called on `.hero-countries` and `.city-badges`. `img.emoji{height:1em;width:1em}` — without this rule Twemoji injects unsized SVGs that render ~170px tall (caught via iPhone screenshot before this was caught on desktop).  
**Playwright:** CDN blocked in headless sandbox — always reports flags missing. This is a Playwright sandbox limitation, not a product defect; confirmed by real-device screenshot instead.

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
**Status:** ✅ DONE — verified 2026-09-05 on user's own iPhone (screenshots) + confirmed by Steve: *"The Quick Search fixed at bottom of iPhone screen is great!"* (Email 6, opening line)  
**Priority:** P0  
**Source:** Email 3 + Email 4 + Email 5 Sep 3 item 5 (STILL BROKEN as of that email)  
**Implementation:** `position:fixed` + `transform:translateZ(0)` + `will-change:transform` + `z-index:1000` + `env(safe-area-inset-bottom)` + `calc(110px + env(safe-area-inset-bottom,0px))` body padding-bottom.  
**Email 6 follow-ups (items 3):** chip order corrected to itinerary order (Departure first, Return last — a prior version sorted destinations before travel days, which put Departure out of sequence); added a "Click for Quick Search" heading above the action buttons, matching the desktop rail. Full button labels ("Reservation Links/Info" / "Google Map Links") now match the desktop rail on mobile too (fixed 2026-09-05, was previously abbreviated to "Reservations"/"Map"); wraps to two lines below 375px (iPhone SE / Display Zoom) rather than overflowing.

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
**Note (2026-09-05):** was only true on the desktop rail — the mobile bar had abbreviated the same two buttons to "Reservations" / "Map". Fixed so both surfaces carry Steve's exact wording (see C5).

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
**Status:** ✅ DONE — hardened 2026-09-05  
**Source:** Email 5 Sep 3 item 7 + **Email 6 Sep 5 item 6 (still slipping through)**  
**Implementation:** `GENERIC_TIMES` Set in app.js; `timeDisplay = "•"` for generic/empty times.  
**Bug found (Email 6 item 6):** "Any time" was still rendering as literal text on 3 blocks. Root cause: `GENERIC_TIMES` had `"Late Afternoon"` (capital A) while data.js used `"Late afternoon"` — an exact-match Set is one casing difference from silently missing an entry, which is exactly what happened, and `"Late morning"` / `"Any time"` / `"After 5 PM"` weren't in the set at all. Fixed by lowercasing both the set and the comparison (`GENERIC_TIMES.has(t.toLowerCase())`), closing this class of bug rather than only the one instance reported.  
**Email 6 item 7:** the bullet marker itself (not clock times) is now flush right in its time column and bolder (`font-weight:700`), closer to the title — was flush left before.  
**QA verified 2026-09-05:** live check found 0 literal "Any time" instances, 34 bullet rows total, bullet style confirmed `align=right weight=700`.

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

## I — Email 6 (Sep 5) — "I think we will be done with these edits!!!"

> Source: Steve Fader, 2026-09-05 14:46, msg `1a0720902acc896b`, thread `1a0587e62723f79a`, subject "Re: Re: New Concept Format Feedback/Edits". Reply to Shai's Sep 5 message (`1a070768a459e4cf`) reporting the 8 Email-5 edits plus the two disclosed content regressions (Stockholm add-ons, Helsinki Synagogue).
>
> Opening line, worth recording verbatim because it validates the disclosure strategy: *"Yes, AI is very useful in many ways, but the extreme editing that happens is always on my awareness radar when I use it... Great tool if used wisely and if you don't, it will 'silently' lead you astray."* He also confirmed C5 unprompted: *"The Quick Search fixed at bottom of iPhone screen is great!"*

### I1 — Logo: use the original file, not a transparent cutout
**Status:** ✅ DONE — see B1 above for full history.  
**Source:** item 1 — *"Yes, the logo should be the version that was there originally with yellow background."*

---

### I2 — 1/4in white break between hero photo and first city-band photo
**Status:** ✅ DONE  
**Source:** item 2  
**Implementation:** `.hero{margin-bottom:24px}` — reveals `var(--paper)` body background between the two full-bleed images. No new markup.  
**QA verified:** measured gap = 24px exactly.

---

### I3 — Mobile bar: Departure out of order + missing "Click for Quick Search" heading
**Status:** ✅ DONE — see C5 above.  
**Source:** item 3

---

### I4 — Google Map Links not in itinerary order
**Status:** ✅ DONE  
**Source:** item 4 — *"The Google Map Links are not in the order of the itinerary and need to be properly sequenced."*  
**Root cause:** `openMapPanel()` built its list in three separate passes — every day-block mapQuery, then every reservation, then every EXPLORE tile — so hotels and tours always landed after every single day's items regardless of when they actually happened in the trip.  
**Implementation:** rewritten to walk `groups` (city, in itinerary order) → each day within it → each plan block, pulling a reservation's `mapQuery` in at the exact block that references it via `resId` (a hotel check-in block carries no `mapQuery` of its own — the reservation record does). Each city's no-day EXPLORE ("Add-On") tiles are appended once, after that city's last day, matching where they render on the page.  
**QA verified 2026-09-05:** first 12 entries read Lapland Hotels Bulevardi → Suomenlinna → Amos Rex → Kamppi Chapel → Hakaniemi → Synagogue Tour → WithLocals → Design Museum → Helsinki Day Celebration → Bulevardi/Eckberg → Esplanadi → Rock Church — exact chronological/on-page order. 84 total entries (up from 76 pre-session, from the +5 Stockholm add-ons and +3 net rows from I8's splits).

---

### I5 — Timed items should show a range, not just the start time
**Status:** ⏳ NOT YET DONE  
**Priority:** P1  
**Source:** item 5 — *"The items with set times (flights, ferry, tours, events, etc) should show the time range not just the start time. Hotels should remain with only arrival time."*  
**Scope note:** requires a new field per block (e.g. `timeEnd`) across ~30+ timed blocks in data.js, sourced from ITINERARY.txt where an end time exists, plus an app.js change to render `${time}–${timeEnd}` when present. Hotels are the deliberate exception — check-in time only. Larger pass, not attempted in the 2026-09-05 session; tracked here so it isn't dropped.

---

### I6 — "Any Time" still rendering as literal text
**Status:** ✅ DONE — see F11 above.  
**Source:** item 6

---

### I7 — Bullet points flush right and bolder
**Status:** ✅ DONE — see F11 above.  
**Source:** item 7

---

### I8 — Split merged sites that the DOCX kept separate
**Status:** ✅ DONE  
**Source:** item 8 — *"Storkyrkan Cathedral and Nobel Prize museum are two different things and need to be separated. Same with Karl Johan Gate and Grand Hotel, as well as Fram Museum and Kon Tiki museum. (AI silently strikes again 🙃)"*  
**Implementation:** three merged plan blocks split into six, in `data.js`:
- "Nobel Prize Museum & Storkyrkan Cathedral" → **Nobel Prize Museum** + **Storkyrkan — Stockholm Cathedral** (6/15). Full detail restored from ITINERARY.txt lines 139–140 rather than just cutting the merged text in half — the merged version had already been condensed by AI.
- "Karl Johans Gate & Grand Hotel" → **Karl Johans Gate** + **Grand Hotel** (6/19).
- "Fram Museum & Kon-Tiki Museum" → **Fram Museum** + **Kon-Tiki Museum** (6/21).  
**QA verified 2026-09-05:** all 6 split titles present as separate `.plan-title` elements; 0 of the 3 merged titles remain.

---

### I9 — Activity tiles: duplicate images across sites + still-missing tiles
**Status:** ⏳ NOT YET DONE — separate image-research pass  
**Priority:** P1  
**Source:** item 9 — *"The Activity tiles in some sections have the same picture for many different sites. All Activity tiles need their own dedicated picture. Also, a number are still missing some tiles. Examples: Skansen 6/16, Storkyrkan Cathedral 6/15, Fram Museum and Kon Tiki Museum."*  
**Known duplicate clusters (2026-09-04 image audit, not yet re-checked against this item):** Stockholm add-on tiles share one Gamla Stan alley photo across ~6 entries; Oslo and Bergen have similar sharing. Needs a unique Wikimedia Commons image sourced and verified (200 + `image/*` content-type) per tile — same process used for the 2026-09-04 broken-image fixes (`defba41`), just at larger scale.  
**Missing tiles noted by Steve — cross-reference with I8:** Skansen (day 6/16) and Storkyrkan Cathedral (day 6/15) are now real *plan blocks* (Storkyrkan split out in I8; Skansen already existed as a block) but neither has an EXPLORE *tile* with `day:` set — add both. Fram Museum and Kon-Tiki Museum, similarly split out in I8, also need EXPLORE tiles with `day: "2026-06-21"`. Not attempted in the 2026-09-05 session; tracked here so it isn't dropped.

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

## Stats (PM pass 8 — 2026-09-05)
- **Done ✅:** everything from Emails 2–5 (A, B, C, D, E, F, H sections), plus 6 of 9 Email-6 items (I1–I4, I6–I8). B1 (logo), B6 (flags), C5 (mobile bar) are no longer hardware-pending or under debate — all three verified on the user's own Windows laptop and iPhone via screenshots on 2026-09-05, and B1's earlier 🔵 business-decision status was itself reversed once Steve confirmed he wants the original logo back.
- **Pending ⏳:** 2 — **I5** (timed items show a range, not just start; needs a `timeEnd`-style field across ~30+ blocks) and **I9** (dedicated image per Activity tile + 4 missing tiles: Skansen, Storkyrkan, Fram, Kon-Tiki). Both explicitly scoped and tracked here rather than silently dropped.
- **Business decisions 🔵:** 0 — the only one on record (B1, "ship without a logo") was reversed 2026-09-05.

## Readiness
> Every requirement from Emails 2 through 6 is implemented except the two explicitly-tracked larger passes (I5, I9). The three items that were previously hardware-uncertain (logo appearance, Windows flags, iPhone mobile bar) are now confirmed on real devices via user screenshots — not Playwright, which cannot see any of the three failure modes that actually occurred (opaque-vs-transparent rendering, Windows' missing flag font, iOS fixed-positioning).  
> Steve's Sep 5 reply opened with an unprompted compliment on C5 ("The Quick Search fixed at bottom of iPhone screen is great!") and closed with "I think we will be done with these edits!!! 😎 ....unless AI throws us another quiet curveball 😉" — a good, low-friction signal heading into I5/I9.
