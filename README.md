# AI Biz Tools v5 — Finder

A Next.js 14 website for helping small businesses shortlist practical AI software.

## What changed in v5

- Added a working interactive **AI Tool Finder** directly in the hero.
- Finder flow: **Business → Main task → Buying approach → 3 matches**.
- Each result explains why the tool fits and links to its review.
- Header CTA now opens the finder.
- Task cards now lead to the finder.
- Homepage positioning is more decision-oriented: shortlist first, directory second.
- No external API is required for the finder; matching happens locally from the curated tool dataset.

## Run locally

If PowerShell blocks `npm`, use the `.cmd` form:

```powershell
npm.cmd install
npm.cmd run dev
```

Then open:

`http://localhost:3000`

## Important before launch

1. Verify current tool features and pricing.
2. Set the production site URL.
3. Connect the newsletter form to a real email provider.
4. Add analytics and conversion events.
5. Add affiliate links only after joining relevant programs and keep disclosure visible.
6. Do not claim the finder is AI-generated or personalized by an AI model: v5 uses transparent editorial matching rules.

## Finder logic

The finder is intentionally simple and explainable. It ranks the existing curated tools using:

- business-type fit;
- task/category fit;
- editorial tool score;
- a light adjustment for the selected buying approach.

This is a better launch-stage choice than adding an LLM API before the site has traffic or validated demand.

## Analytics and consent

GA4 uses the single measurement ID `G-RWBTJRK4H5`. Google tag loading and
application GA4 events require `Allow analytics`; the default is denied.
Advertising storage, user data and personalization stay denied. The persistent
controls save the choice in local storage, allow revocation and queue an
`analytics_test` event. `GA4: ON/OFF` reflects consent, not confirmed delivery.
Vercel Analytics remains enabled separately, as explained on `/privacy`.

Events include `finder_completed`, `review_clicked`, `vendor_clicked`,
`analytics_test`, `analytics_consent` and explicit route `page_view` events.
They carry `site_product: ai_biz_tools`; tool interactions include tool/source/href
where applicable. Finder completions include a comma-separated tool shortlist.
`analytics_consent` is queued only for a changed UI choice while analytics is
allowed (including a revocation queued before turning it off). Initial denial,
restoration on reload and cross-tab synchronization do not send consent events.
No pre-consent interaction backlog is replayed. Browser blockers may prevent
Google from receiving otherwise valid events.

Unit checks (no additional dependencies):

```bash
node --test tests/analytics.test.mjs
```

Production/browser checks (start the server separately):

```bash
npm ci
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1 --port 3000
```

The browser smoke test uses Playwright and an installed Chromium. You can keep
these test-only dependencies outside the checkout:

```bash
npm install --prefix /tmp/aibiz-browser playwright
PLAYWRIGHT_MODULE=/tmp/aibiz-browser/node_modules/playwright/index.mjs \
  CHROMIUM_PATH=/usr/bin/chromium node tests/analytics.browser.mjs
```

`ANALYTICS_BASE_URL` can select another accessible deployment. The test stubs
Google's loader and validates actual UI interactions and GA4 command payloads;
it does not prove ingestion by Google. Before production, inspect GA4 Realtime
(or DebugView with a debug-enabled browser) on the deployment, verify the stream
and its domain settings, and finish the operator/contact/retention details noted
in the privacy policy. Never run development and production against the same
`.next` output concurrently.
