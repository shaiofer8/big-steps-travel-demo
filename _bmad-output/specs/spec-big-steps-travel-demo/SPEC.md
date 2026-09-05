---
id: SPEC-big-steps-travel-demo
companions:
  - requirements.md
  - content-sources.md
sources:
  - ../../../../AppData/Local/Temp/claude/c--Users-shaio/4e487d42-a29e-4e38-a870-c34ac329db60/scratchpad/bst-spec.html
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate.

# Big Steps Travel — New Concept Rebuild

## Why

A first rebuild of the "New Concept" magazine-format itinerary demo (sent 2026-08-29) failed to deliver the promised features: AI condensed itinerary content, inline links were not implemented, activity tiles remained at the end of sections instead of inline, and the real BST logo was never inserted. Steve Fader (President, Big Steps Travel) responded with 8 new issues (Email 4, Aug 31) and then confirmed most were fixed in Email 5 (Sep 3) while adding 8 more remaining edits. He sees the "finish line" — trust is recovering.

**Status as of 2026-09-05:** all requirements from Emails 3, 4 and 5 are implemented and verified on real hardware. Shai's Sep 5 reply (disclosing 8 fixes plus the two content regressions found in audit) drew Steve's Sep 5 reply — 9 more edits, opening with an unprompted compliment on the mobile bar and closing "I think we will be done with these edits!!!". 6 of those 9 are done (I1–I4, I6–I8 in requirements.md); 2 are explicitly deferred as larger passes (I5: time ranges; I9: per-tile images + 4 missing tiles).

**Correction (2026-09-05):** an earlier version of this file's OQ-4 and CAP-1 claimed the logo's own opaque background *was* the "white banner" Steve flagged in Email 5, and that the fix was to ship without a logo / make it transparent. **That was wrong.** Steve's Sep 5 reply confirms the banner was the topbar (a separate element, already removed the same day as B9) — the logo itself was never the problem. The original opaque logo file is restored; see CAP-1.

> ⚠️ **QA PROCESS RULE:** B6 and C5 were marked DONE by Playwright but confirmed broken by Steve on Sep 3. Features are only DONE when verified on real Windows Chrome + real iPhone. This rule proved itself again on 2026-09-04: Playwright reported "0 flag images" (its sandbox blocks the CDN) and so could not see that Twemoji was injecting unsized images that rendered ~170px tall. Only a real-iPhone screenshot caught it.

## Capabilities

- **CAP-1** — Hero / Intro page
  - **intent:** The intro page displays the original BST logo (unedited, opaque background), the slogan, a 3-line stacked heading (Client Name / Trip Name / Travel Journal), the date range, and the countries with flags that render on Windows Chrome as well as iPhone, with a 1/4in (24px) break before the first city-band photo.
  - **success:** Visual test on real Chrome/Windows shows the logo above the slogan, 3 separate heading lines in one typeface at decreasing sizes, flags rendered as images sized to the surrounding text, and a visible gap before the next photo.
  - **note (corrected 2026-09-05):** the logo is NOT absent and is NOT transparent. It went through three states this project: (1) present with its original opaque background through early Sep; (2) removed entirely on Sep 3 on a misreading of an unrelated instruction; (3) restored Sep 5 but made transparent, on the mistaken theory that its background was Email 5's "white banner". Steve's Sep 5 reply corrects this directly: *"Yes, the logo should be the version that was there originally with yellow background."* The banner was the topbar, a separate element removed the same day (Sep 3) as B9 — before the logo was ever touched. Current state: original file (git `7a09fe2`), unedited.

- **CAP-2** — Navigation (desktop + mobile)
  - **intent:** Desktop city rail shows "Click for Quick Search" heading, city links, and Reservation Links/Info + Google Map Links buttons stacked below "Return". Mobile shows a fixed bottom scrollable bar with city chips and those same two buttons.
  - **success:** Desktop rail contains heading + buttons in correct position. iPhone 390px shows bottom bar with scrollable chips and buttons; desktop rail is hidden on mobile.

- **CAP-3** — Verbatim itinerary content
  - **intent:** All 17 days of itinerary text are rendered exactly as written in the DOCX. Day 6/12 is fully restored. AI does not rewrite, condense, or paraphrase any field.
  - **success:** Spot-check 5 days against DOCX — zero deviations in text, times, names, prices, contact info.

- **CAP-4** — Day block structure
  - **intent:** Each day block shows city+country header, city badges (stay/weather/timezone), countdown line ("Helsinki – day 1 of 3 / Trip – day 1 of 17"), is rendered as a card, and shows fully-framed color-coded reservation tickets (blue hotel / orange transport / green tour).
  - **success:** All 17 days render with countdown and card styling. Reservation cards have 2px color border + matching background tint.

- **CAP-5** — Inline links per day
  - **intent:** Each DAYS entry that has a `links:[]` field renders those links at point of use, below the plan-detail text, not at the end of the city section.
  - **success:** Day 6/10 arrival block shows HEL Airport link. Day 6/11 shows WithLocals + video links in the correct block.

- **CAP-6** — Activity tiles in correct days
  - **intent:** EXPLORE items with a `day:` field render inline in that day block. Items without a day field render in the Add-on Options grid at the end of the city section.
  - **success:** Suomenlinna + Amos Rex appear in 6/10 day block. Rock Church appears in 6/12 block. No tiles appear at the end of Helsinki that have been assigned a day.

- **CAP-7** — EXPLORE tiles: inline in day or end-of-section (no heading)
  - **intent:** EXPLORE items with a `day:` field render inline in that day block. Items without a `day:` field appear at the end of the city section — without any section heading, and with Google Maps + TripAdvisor links on each tile (same pattern as food entries).
  - **success:** Zero instances of "Add on Options" heading in the page. Every EXPLORE tile (inline or end-of-section) has Maps + TripAdvisor links. Inline tiles appear in the correct day block only.

- **CAP-8** — Food section with cuisine labels and dynamic country label
  - **intent:** Each food entry displays a cuisine-type label (Finnish, Swedish, Italian, etc.) before the restaurant name, links to Google Maps and TripAdvisor. The local food sub-section reads "Taste of [Country]" where country is the city's destination country.
  - **success:** All food entries show a cuisine pill. Every entry has working Maps + TripAdvisor links. Helsinki shows "Taste of Finland", Oslo/Bergen show "Taste of Norway", Stockholm shows "Taste of Sweden", Tallinn shows "Taste of Estonia". Zero instances of "Taste of the City".

- **CAP-9** — All tours and tiles from DOCX present
  - **intent:** All tours and EXPLORE tiles mentioned in the DOCX are in data.js — including ABBA Museum, Brad Paisley Concert, Helsinki Synagogue Tour, Kampii Chapel, Hakaniemi Hall, Design Museum, Allas Pool, Tavastia, and any others found in DOCX.
  - **success:** Data comparison: every item in DOCX appears in data.js. Zero missing entries.

- **CAP-10** — QA on real devices before any send
  - **intent:** Before any link or email is sent to Steve, a visual pass runs on real Windows Chrome desktop AND real iPhone (not just headless Playwright) confirming every CAP-1 through CAP-15 renders correctly on both.
  - **success:** Both QA passes completed on real hardware. No console errors. No cross-device failures. Playwright alone is insufficient.

- **CAP-11** — Hero heading: correct trip name, font size hierarchy
  - **intent:** The hero heading shows the verbatim trip name from DOCX (no AI-added words like "Escape"), with three lines in the same font family and decreasing font size: client name (largest) → trip name (medium) → "Travel Journal" (smallest).
  - **success:** Hero shows "The Carlton Family" (largest) / "[DOCX trip name]" (no "Escape") / "Travel Journal" (smallest). All same typeface. Verified on desktop and iPhone.

- **CAP-12** — Google Map button visually prominent (yellow/orange) in rail
  - **intent:** The Google Map Links button in the quick-search rail has a yellow or warm-orange background highlight, giving it the same visual weight as the Reservation Links button. Both buttons must be legible against the dark hero photo background at any scroll position.
  - **success:** Desktop — both action buttons have strong, matching color highlight. Map button is yellow/orange and clearly readable on dark background while scrolling.

- **CAP-13** — Dynamic "Taste of [Country]" in local food section
  - **intent:** The local food sub-section label reads "Taste of [Country Name]" where country is looked up from the city's destination country — not the generic "Taste of the City".
  - **success:** Helsinki → "Taste of Finland", Oslo → "Taste of Norway", Bergen → "Taste of Norway", Stockholm → "Taste of Sweden", Tallinn → "Taste of Estonia". Zero instances of "Taste of the City". (Merged into CAP-8 success for implementation.)

- **CAP-14** — Bullet points for plan items without a specific clock time
  - **intent:** Any itinerary plan item that does not have a precise clock time (or whose time is a generic label: "Morning", "Afternoon", "Late Afternoon", "Evening") renders with a bullet point (•) instead of a time label.
  - **success:** Zero plan cards show "Morning" / "Afternoon" / "Late Afternoon" / "Evening" as time values. Items without a clock time show "•". Items with exact times (e.g. "9:40 AM") keep the time display.

- **CAP-15** — No Add-on Options heading; tiles get Maps + TripAdvisor links
  - **intent:** The "Add on Options of Things to Do & See" heading is removed from all city sections. EXPLORE tiles at the end of city sections render without a section label. Each tile — both inline and end-of-section — links to Google Maps and TripAdvisor.
  - **success:** Zero instances of "Add on Options" heading visible in the page. Every EXPLORE tile has clickable Maps + TripAdvisor links. (Merged into CAP-7 success for implementation.)

- **CAP-16** — Google Map Links panel follows itinerary order (added 2026-09-05, Email 6 item 4)
  - **intent:** The Map panel lists every mapQuery-bearing entry in the order the trip actually happens — city group, then day within it, then plan block — not grouped by data type (all day-blocks, then all reservations, then all EXPLORE tiles).
  - **success:** The panel's row order matches the on-page reading order top to bottom: e.g. Helsinki's hotel appears before Helsinki's day-6/10 tiles, which appear before day-6/11 items, etc.

- **CAP-17** — Split sites the source document keeps separate (added 2026-09-05, Email 6 item 8)
  - **intent:** No plan block merges two distinct named sites into one entry when the DOCX lists them separately.
  - **success:** "Nobel Prize Museum & Storkyrkan Cathedral", "Karl Johans Gate & Grand Hotel", and "Fram Museum & Kon-Tiki Museum" each render as two separate plan blocks, each retaining its own full detail from the DOCX.

- **CAP-18** — Timed items show a range where the source gives one (Email 6 item 5) — **NOT YET IMPLEMENTED**
  - **intent:** A plan block whose DOCX source gives a start and end time (flights, ferries, tours, timed events) displays both, e.g. "9:00 AM – 11:00 AM", not just the start. Hotels are the deliberate exception — check-in time only, no end time.
  - **success:** Every timed non-hotel block with an end time in the DOCX shows a range. Hotel blocks are unaffected.

- **CAP-19** — Every Activity tile has its own dedicated image; no tiles missing (Email 6 item 9) — **NOT YET IMPLEMENTED**
  - **intent:** No two EXPLORE tiles share a placeholder image sourced for a different site. Skansen (6/16), Storkyrkan Cathedral (6/15), Fram Museum (6/21) and Kon-Tiki Museum (6/21) exist as EXPLORE tiles with correct `day:` fields, not only as plan blocks.
  - **success:** Every tile's image is unique to that site (verified by URL, not just visually). All four named tiles render inline on their stated day.

## Constraints

- All itinerary text verbatim from DOCX "Itinerary - Nordic-Baltic Region Scandinavia 2026" — no AI rewriting, summarizing, or condensing. Full detail as Steve wrote it.
- Vanilla JS (IIFE), no build step. `app.js`, `data.js`, `style.css` only. No npm dependencies added to the runtime bundle.
- Static GitHub Pages hosting — no server-side code, no fetch to external APIs from the page.
- Never send an email or share a link with Steve without explicit user approval of the message text.
- Never reveal to Steve that this is part of a 5-planner pilot. Maintain vague-but-confident framing.
- Rate $150 flat/itinerary. Payment: Payoneer only (user is PayPal-blocked).
- **⛔ CROSS-DEVICE PARITY (non-negotiable):** Every feature, visual, and interaction must be fully functional on BOTH Windows desktop Chrome (1280px+) AND iPhone (real hardware, Safari/Chrome). A feature that works on one device but not the other is a bug. Steve tests on both.
- **⛔ QA PROCESS RULE (from 2026-09-03 process failure):** A feature is DONE only when verified on real Windows Chrome desktop AND real iPhone — not just headless Playwright. Playwright catches layout/DOM bugs; it cannot catch Windows emoji rendering failures or iPhone Safari fixed-positioning quirks. B6 and C5 passed Playwright but were confirmed broken by Steve.

## Non-goals

- No new design direction changes — implement Steve's requests exactly, no unsolicited redesigns.
- No features beyond what's tracked in `requirements.md` (grows as Steve sends new edits — do not invent scope beyond his stated requests).
- No backend, database, authentication, or CMS.
- No work on `/classic/` or `/` (Continuation) templates in this phase.
- No production SaaS infrastructure — this is a sales demo.
- Do not contact Steve until all ❌ and 🔄 items are fixed, QA on real Windows + real iPhone passes, and user has approved the email text.

## Success signal

Steve receives the updated link, reviews it on desktop and iPhone, and does not raise any new issues beyond what's already tracked. Trajectory so far: "I see the finish line" (Email 5, Sep 3) → "I think we will be done with these edits!!!" (Email 6, Sep 5) — the remaining gap is I5 + I9, not new complaints. No cross-device failures. No AI-generated words in the content. Both the Map and Reservation buttons are equally prominent in the rail.

## Assumptions

- The DOCX content is the authoritative itinerary — any gap in data.js that is not in the DOCX is left empty (not invented).
- Emoji font fix alone (CSS Segoe/Noto) does NOT resolve flag rendering on Windows — a different solution (Twemoji CDN, image flags, or text fallback) is required.
- "Add-on Options" heading is removed entirely (Email 5) — not renamed. F3's rename is superseded by F12.

## Open Questions

- OQ-8: I5 (time ranges) needs an end time per timed block. Where the DOCX doesn't state one explicitly (some blocks give only a start), leave the block as start-only rather than inventing an end time — matches the "don't invent" assumption below. Needs a pass through ITINERARY.txt to classify each timed block as range-available or start-only before touching data.js.
- OQ-9: I9's "dedicated image per tile" — is a duplicate-but-topically-correct image (e.g. two Gamla Stan alley shots for two different Gamla Stan sites) acceptable, or does every tile need a photo of the specific site itself? Affects how much image research is required. Default assumption until told otherwise: site-specific where findable on Wikimedia Commons, thematically-matched fallback only when a specific photo can't be sourced.

*Previously resolved:*
- OQ-1 resolved: User decision — Add-on Options renders for ALL cities. (Now superseded: heading removed entirely per F12.)
- OQ-2 resolved: Oslo food was AI-invented. Replaced verbatim from DOCX.
- OQ-3 resolved: Bergen + Stockholm food were AI-invented. Replaced verbatim. Inline links from DOCX added.
- OQ-4 resolved (2026-09-03), **then corrected 2026-09-05:** the white banner was the *topbar*, not the logo. An intermediate session incorrectly concluded the logo's own background was the banner and made it transparent; Steve's Sep 5 reply ("the version that was there originally with yellow background") settled it — the original opaque logo file is correct and is restored.
- OQ-5 resolved (2026-09-03/04): Twemoji CDN chosen. Primary jsDelivr, cdnjs as `onerror` fallback (the cdnjs path for v14.0.2 returns 404). Requires `img.emoji{height:1em;width:1em}` — without it Twemoji's images render at natural SVG size. Verified rendering on real Windows Chrome and real iPhone.
- OQ-6 resolved (2026-09-03): Trip name is "Scandinavian/Baltic". "Escape" was AI-added and is removed.
- OQ-7 resolved (2026-09-05), superseded by the OQ-4 correction: no transparent-background file is needed — the original logo was correct all along.
