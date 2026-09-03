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

A first rebuild of the "New Concept" magazine-format itinerary demo (sent 2026-08-29) failed to deliver the promised features: AI condensed itinerary content, inline links were not implemented, activity tiles remained at the end of sections instead of inline, and the real BST logo was never inserted. Steve Fader (President, Big Steps Travel) responded with 8 new issues (Email 4, Aug 31) and then confirmed most were fixed in Email 5 (Sep 3) while adding 8 more remaining edits. He sees the "finish line" — trust is recovering but the product is not done. As of 2026-09-03: 22 of 41 requirements done; 14 not built (including 8 new from Email 5); 3 need real-device fix (B6 flags, C5 mobile nav, F7 heading). All development and QA must validate on real Windows Chrome desktop AND real iPhone — Playwright alone is insufficient.

> ⚠️ **QA PROCESS RULE:** B6 and C5 were marked DONE by Playwright but confirmed broken by Steve on Sep 3. Features are only DONE when verified on real Windows Chrome + real iPhone.

## Capabilities

- **CAP-1** — Hero / Intro page
  - **intent:** The intro page displays the real BST logo, slogan, 3-line stacked heading (Client Name / Trip Name / Travel Journal), date range, and countries with emoji flags visible on Windows Chrome.
  - **success:** Visual test on Chrome Windows shows logo image (not SVG), 3 separate heading lines, emoji flags rendered.

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
- No features beyond the 41 requirements in `requirements.md`.
- No backend, database, authentication, or CMS.
- No work on `/classic/` or `/` (Continuation) templates in this phase.
- No production SaaS infrastructure — this is a sales demo.
- Do not contact Steve until all ❌ and 🔄 items are fixed, QA on real Windows + real iPhone passes, and user has approved the email text.

## Success signal

Steve receives the updated link, reviews it on desktop and iPhone, and does not raise any new issues from the 41 requirements list. "I see the finish line" (Email 5, Sep 3) becomes "this is what I had in mind" — and the conversation advances toward a paid itinerary. No cross-device failures. No AI-generated words in the content. Both the Map and Reservation buttons are equally prominent in the rail.

## Assumptions

- The DOCX content is the authoritative itinerary — any gap in data.js that is not in the DOCX is left empty (not invented).
- Emoji font fix alone (CSS Segoe/Noto) does NOT resolve flag rendering on Windows — a different solution (Twemoji CDN, image flags, or text fallback) is required.
- "Add-on Options" heading is removed entirely (Email 5) — not renamed. F3's rename is superseded by F12.

## Open Questions

- OQ-4: B9 — What exactly is the "Big Steps Travel in white banner" Steve sees? Must inspect on live site: is it (a) the logo PNG with opaque white background pixels, (b) the onerror fallback span, or (c) another element? Resolution determines the fix.
- OQ-5: B6 — Which flag rendering solution to implement? Options: Twemoji CDN script (automatic, SVG flags), static PNG flag images per country, or country code text fallback (FI / EE / SE / NO). Decision affects complexity and CDN dependency.
- OQ-6: B7 — What is the exact trip name in the DOCX (without "Escape")? Likely "Scandinavian/Baltic" based on DOCX filename "Nordic-Baltic Region Scandinavia 2026" but must confirm before editing `data.js tripName`.

*Previously resolved:*
- OQ-1 resolved: User decision — Add-on Options renders for ALL cities. (Now superseded: heading removed entirely per F12.)
- OQ-2 resolved: Oslo food was AI-invented. Replaced verbatim from DOCX.
- OQ-3 resolved: Bergen + Stockholm food were AI-invented. Replaced verbatim. Inline links from DOCX added.
