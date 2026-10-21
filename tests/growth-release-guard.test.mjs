/** Offline AI Biz Tools release guard. Does not request pages or generate GA4 traffic. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const layout = read("app/layout.js");
const robots = read("app/robots.js");
const sitemap = read("app/sitemap.js");
const site = read("lib/site.js");
const analytics = read("lib/analytics.js");
const guides = read("app/guides/page.js");

test("default site origin points to the actual production hostname", () => {
  assert.match(site, /NEXT_PUBLIC_SITE_URL\s*\|\|\s*["']https:\/\/ai-biz-tools\.vercel\.app["']/);
});
test("root canonical metadata uses configured production origin", () => {
  assert.match(layout, /metadataBase:\s*new URL\(siteConfig\.url\)/);
  assert.match(layout, /alternates:\s*\{\s*canonical:\s*["']\/["']/);
});
test("the main production site remains deliberately indexable", () => {
  assert.match(layout, /robots:\s*\{\s*index:\s*true,\s*follow:\s*true\s*\}/);
});
test("robots includes same-origin sitemap", () => {
  assert.match(robots, /siteConfig\.url/);
  assert.match(robots, /sitemap\.xml/);
  assert.match(robots, /userAgent:\s*["']\*["']/);
});
test("sitemap retains useful guides and trust documents", () => {
  for (const path of [
    "/guides", "/guides/ai-workflow-value-calculator",
    "/guides/automate-customer-enquiries-small-business",
    "/affiliate-disclosure", "/privacy", "/methodology"
  ]) assert.ok(sitemap.includes(path), `Missing sitemap entry: ${path}`);
  assert.match(sitemap, /const seen = new Map\(\)/);
});
test("Google analytics and ad consent are denied by default", () => {
  for (const field of ["analytics_storage", "ad_storage", "ad_user_data", "ad_personalization"])
    assert.match(analytics, new RegExp(`${field}\\s*:\\s*['"]denied['"]`));
  assert.match(layout, /ga4-consent-default/);
});
test("GA4 events require granted consent and no auto page view", () => {
  assert.match(analytics, /__aibiztoolsAnalyticsConsent\s*!==\s*["']granted["']/);
  assert.match(analytics, /send_page_view:\s*false/);
});
test("guide index links to real useful tools and content", () => {
  assert.match(guides, /ai-workflow-value-calculator/);
  assert.match(guides, /automate-customer-enquiries-small-business/);
});