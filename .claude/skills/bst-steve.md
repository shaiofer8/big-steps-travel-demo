# BST Steve — Steve Fader Email & Status Check

Checks for new email from Steve Fader and surfaces the current deal status.

## Steps to execute

### 1. Check for new email

Search Gmail:
- Thread `1a0587e62723f79a` — the active thread (Email 4 + our Sep 2 reply)
- Also search: `from:sfade@bigstepstravel.com` for any new threads

If Steve replied: surface the full text immediately and ask the user how to respond (one open question at a time using AskUserQuestion).

If no reply: report days elapsed since our last email (sent 2026-09-02).

### 2. Report deal status

| Item | Status |
|------|--------|
| Demo URL | https://shaiofer8.github.io/big-steps-travel-demo/magazine/ |
| Last email sent | 2026-09-02 (msg 1a06338a3bf6e212) |
| Steve's last email | 2026-08-31 (Email 4, 8 issues — all fixed) |
| QA | 28/28 ✅ (2026-09-03) |
| Demo | 100% built, all 33 requirements done |
| Next step | Await Steve's response → discuss pricing |

### 3. Standing rules (always enforce)

- **Never send email to Steve without explicit user approval of the full message text**
- Never reveal the 5-planner pilot
- Rate: $150/itinerary flat, Payoneer only (PayPal blocked)
- Approved "other agencies" response: "General feedback on the format direction has been positive — the scroll-based layout and the visual structure are resonating. I'll share more as the picture fills out; at this stage I'm keeping each conversation focused."

### 4. If Steve replied and asks about pricing

Do NOT quote a price directly in email. Ask the user first:
- Does the user want to quote $150 now?
- Or defer pricing to a call?

Then draft the email accordingly and await user approval before sending.

### 5. If Steve replied with new issues

Ask the user about each issue one at a time (AskUserQuestion). Then update the spec and build accordingly.
