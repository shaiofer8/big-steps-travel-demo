# BST QA — Big Steps Travel Demo Quality Check

Runs a full automated QA of the live Big Steps Travel magazine demo against Steve Fader's 33 requirements.

## What this skill does

1. Runs the Playwright test suite against the live GitHub Pages URL
2. Reports pass/fail for each of the 33 spec requirements
3. Sends screenshots (desktop + iPhone 390px)
4. Updates `requirements.md` statuses if anything changed
5. Logs results to the spec memlog

## Steps to execute

### 1. Run Playwright QA

The QA script lives at:
`C:\Users\shaio\AppData\Local\Temp\claude\c--Users-shaio\4e487d42-a29e-4e38-a870-c34ac329db60\scratchpad\qa-full.js`

**If the scratchpad script is gone** (new session), recreate it with these parameters:
- URL: `https://shaiofer8.github.io/big-steps-travel-demo/magazine/`
- Desktop viewport: 1280×900
- Mobile viewport: 390×844
- Screenshots saved to a `qa-screenshots/` folder next to the script
- Checks: B1–B6, C1–C5, D1, E1–E5, F1–F8, console errors

Run with:
```
cd <scratchpad-dir>
node qa-full.js
```

Playwright is pre-installed in the scratchpad node_modules. If missing:
```
npm install playwright
npx playwright install chromium
```

### 2. Read current requirements status

Read the spec companion:
`C:\Users\shaio\big-steps-travel-demo\_bmad-output\specs\spec-big-steps-travel-demo\requirements.md`

Cross-check the QA results against the current ✅/❌/⏳ statuses.

### 3. Send screenshots to user

Use `SendUserFile` to send the 5 screenshots:
- `01-desktop-hero.png`
- `02-desktop-day-plan.png`
- `03-desktop-food-tips.png`
- `04-iphone-hero.png`
- `05-iphone-day.png`

### 4. Report results

Print a summary table with pass/fail per requirement ID. If anything newly failed:
- Update `requirements.md` status to ❌ with a note
- Append a memlog entry (type: event) describing what regressed

### 5. Check Steve's email

After QA, check for new email from Steve:
```
from:sfade@bigstepstravel.com
```
in thread `1a0587e62723f79a` (the active thread). If he replied, surface the full text and ask the user how to respond.

## Key facts (never change without user confirmation)

| Item | Value |
|------|-------|
| Live URL | `https://shaiofer8.github.io/big-steps-travel-demo/magazine/` |
| Spec folder | `C:\Users\shaio\big-steps-travel-demo\_bmad-output\specs\spec-big-steps-travel-demo\` |
| Active email thread | `1a0587e62723f79a` |
| Steve's email | `sfade@bigstepstravel.com` |
| Rate | $150/itinerary flat, Payoneer only |
| Total requirements | 33 |
| Last QA result | 28/28 ✅ (2026-09-03) |

## Standing rules (always enforce)

- Never send email to Steve without explicit user approval of full message text
- Never reveal the 5-planner pilot
- Approved "other agencies" response: "General feedback on the format direction has been positive — the scroll-based layout and the visual structure are resonating. I'll share more as the picture fills out; at this stage I'm keeping each conversation focused."
