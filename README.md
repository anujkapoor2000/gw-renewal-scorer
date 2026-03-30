# GW Renewal Risk Scorer
### NTT DATA -- PolicyCenter AMS Accelerator

AI-powered renewal book intelligence. Score every policy in the renewal book for churn risk and price sensitivity. Prioritise agent outreach to the accounts that actually need it.

---

## Quick Start

```bash
npm install && npm start
# Open http://localhost:3000
```

## Deploy to Vercel (5 minutes)

```bash
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOUR_ORG/gw-renewal-scorer.git
git push -u origin main
# vercel.com -> Add New Project -> Deploy
```

Or Netlify: `npm run build` then drag `/build` to app.netlify.com/drop

## Production Roadmap

| Phase | What | When |
|---|---|---|
| PoC (now) | Static scores, 6 policies, full UI with Score All | Live today |
| Phase 2 | Claude API scores any policy dynamically | Week 1-2 |
| Phase 3 | Pull live renewal book from PolicyCenter API | Week 3-4 |
| Phase 4 | CRM integration -- push actions to agent task lists | Week 5-6 |
| Phase 5 | Market rate feed integration for real benchmark comparison | Week 7-8 |

## Phase 2 -- Connect Claude API

Replace the `SCORE_RESULTS` lookup in `App.js`:

```javascript
async function scorePolicy(policy) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      system: `You are a GW AMS renewal underwriting AI. Given a policy record,
               return ONLY valid JSON with keys:
               churnRisk (0-100), priceSensitivity (0-100), retentionScore (0-100),
               churnLabel, priceLabel, retentionLabel, recommendedAction,
               reasoning (array), recommendedActions (array),
               retentionLevers (array of {lever, impactPct, effort}),
               predictedOutcome (string)`,
      messages: [{ role: 'user', content: JSON.stringify(policy) }],
    }),
  });
  const data = await response.json();
  return JSON.parse(data.content[0].text);
}
```

## NTT DATA -- Guidewire AMS Accelerators 2025
