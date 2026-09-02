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

A first rebuild of the "New Concept" magazine-format itinerary demo (sent 2026-08-29) failed to deliver the promised features: AI condensed itinerary content, inline links were not implemented, activity tiles remained at the end of sections instead of inline, and the real BST logo was never inserted. Steve Fader (President, Big Steps Travel) responded with 8 new issues and 4 "not updated" items. Trust is damaged. The rebuild must be exact and complete — every one of Steve's 30 requirements delivered faithfully, all content verbatim from the DOCX he provided, before any email is sent.

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

- **CAP-7** — Add-on Options for all cities
  - **intent:** Every city section shows an "Add-on Options of Things to Do & See" grid. EXPLORE items that have a `day:` field render inline in that day block; items without `day:` appear in the Add-on Options grid at the end of the city section.
  - **success:** All 5 cities show an Add-on Options grid. Inline day tiles appear inside the correct day block; no tile appears in both places.

- **CAP-8** — Food section with cuisine labels and links
  - **intent:** Each food entry displays a cuisine-type label (Finnish, Swedish, Italian, etc.) before the restaurant name, and links to Google Maps and TripAdvisor.
  - **success:** All food entries show a cuisine pill. Every entry has working Maps + TripAdvisor links.

- **CAP-9** — All tours and tiles from DOCX present
  - **intent:** All tours and EXPLORE tiles mentioned in the DOCX are in data.js — including ABBA Museum, Brad Paisley Concert, Helsinki Synagogue Tour, Kampii Chapel, Hakaniemi Hall, Design Museum, Allas Pool, Tavastia, and any others found in DOCX.
  - **success:** Data comparison: every item in DOCX appears in data.js. Zero missing entries.

- **CAP-10** — QA before any send
  - **intent:** Before any link or email is sent to Steve, a visual pass runs on Chrome desktop (Windows) and iPhone 390px confirming every CAP-1 through CAP-9 renders correctly.
  - **success:** Both QA passes completed and documented. No console errors.

## Constraints

- All itinerary text verbatim from DOCX "Itinerary - Nordic-Baltic Region Scandinavia 2026" — no AI rewriting, summarizing, or condensing. Full detail as Steve wrote it.
- Vanilla JS (IIFE), no build step. `app.js`, `data.js`, `style.css` only. No npm dependencies added to the runtime bundle.
- Static GitHub Pages hosting — no server-side code, no fetch to external APIs from the page.
- Never send an email or share a link with Steve without explicit user approval of the message text.
- Never reveal to Steve that this is part of a 5-planner pilot. Maintain vague-but-confident framing.
- Rate $150 flat/itinerary. Payment: Payoneer only (user is PayPal-blocked).

## Non-goals

- No new design direction changes — implement Steve's requests exactly, no unsolicited redesigns.
- No features beyond the 30 requirements in `requirements.md`.
- No backend, database, authentication, or CMS.
- No work on `/classic/` or `/` (Continuation) templates in this phase.
- No production SaaS infrastructure — this is a sales demo.
- Do not contact Steve until QA-10 passes and user has approved the email text.

## Success signal

Steve receives the updated link, reviews it on desktop and iPhone, and does not raise any new issues from the 30 requirements list. The demo demonstrates enough value that the conversation advances toward a paid itinerary.

## Assumptions

- The DOCX content is the authoritative itinerary — any gap in data.js that is not in the DOCX is left empty (not invented).
- "Add-on Options" cities will be determinable by reading the DOCX Stockholm section as Steve's example.
- Emoji font fix (Segoe UI Emoji / Apple Color Emoji) resolves the flag rendering issue on Windows.

## Open Questions

*All open questions resolved 2026-09-02 after full DOCX read.*

- OQ-1 resolved: User decision — Add-on Options renders for ALL cities. CAP-7 updated.
- OQ-2 resolved: Oslo food in data.js was AI-invented. Replaced verbatim from DOCX (Mathallen, Trattoria Popolare, Happolati, Nordvegan, Café Sara, Dattera til Hagen, Haralds Vaffles, Freddy Fuego, Vippa).
- OQ-3 resolved: Bergen food in data.js was AI-invented. Replaced verbatim from DOCX (No Stress Bar, Sjoboden, Det Lille Kaffekompiniet, Godt Brod, Daily Pot). Stockholm food also replaced. Inline links from DOCX added to days 6/10, 6/11, 6/13, 6/14, 6/19, 6/24.
