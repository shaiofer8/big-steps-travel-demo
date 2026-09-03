# Big Steps Travel Demo — Project Context

Sales demo site for Steve Fader (President, Big Steps Travel).
Live URL: https://shaiofer8.github.io/big-steps-travel-demo/magazine/

## Available Skills

| Skill | Command | מה עושה |
|-------|---------|---------|
| **bst-qa** | `/bst-qa` | QA מלא — Playwright על desktop + iPhone, בדיקת 33 דרישות, screenshots |
| **bst-steve** | `/bst-steve` | בדיקת מייל סטיב + סטטוס עסקה |

## Stack

- Vanilla JS (IIFE) — app.js + data.js + style.css
- GitHub Pages static hosting (no build step)
- Source of truth: `ITINERARY.txt` (verbatim, 362 lines)
- Spec: `_bmad-output/specs/spec-big-steps-travel-demo/`

## Standing Rules

- **לעולם לא לשלוח מייל לסטיב ללא אישור מפורש של הטקסט המלא**
- לעולם לא לחשוף פיילוט 5-סוכנויות
- תשלום: Payoneer בלבד ($150/itinerary)
- תשובה מאושרת ל"סוכנויות אחרות": "General feedback on the format direction has been positive — the scroll-based layout and the visual structure are resonating. I'll share more as the picture fills out; at this stage I'm keeping each conversation focused."

## Key Files

| קובץ | תפקיד |
|------|--------|
| `magazine/app.js` | רינדור כל הדף |
| `magazine/data.js` | כל התוכן (verbatim מ-DOCX) |
| `magazine/style.css` | עיצוב |
| `magazine/assets/bst-logo.png` | לוגו BST אמיתי (92×82 RGBA) |
| `_bmad-output/specs/spec-big-steps-travel-demo/requirements.md` | 33 דרישות + סטטוס |
| `_bmad-output/specs/spec-big-steps-travel-demo/.memlog.md` | memlog (50 entries) |

## Current Status (2026-09-03)

- 33/33 requirements implemented ✅
- QA: 28/28 ✅, 0 console errors
- Email sent 2026-09-02, awaiting Steve's reply
