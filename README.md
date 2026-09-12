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
