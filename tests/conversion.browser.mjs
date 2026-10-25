import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH, headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext();
const base = process.env.ANALYTICS_BASE_URL || 'http://127.0.0.1:3000';
const errors = [];
let external = 0;
// Strictly offline browser verification: only the local app may receive requests.
await context.route('**/*', route => {
  const url = route.request().url();
  if (url.startsWith(base + '/')) return route.continue();
  external++;
  if (url.includes('googletagmanager.com')) return route.fulfill({ contentType: 'application/javascript', body: '/* offline stub */' });
  return route.abort();
});
const page = await context.newPage();
page.on('pageerror', e => errors.push(e.message));
const events = name => page.evaluate(name => Array.from(window.dataLayer || [], x => Array.from(x)).filter(x => x[0] === 'event' && x[1] === name), name);
const clickWithoutNavigation = selector => page.locator(selector).evaluate(el => {
  el.addEventListener('click', e => e.preventDefault(), { once: true }); el.click();
});
try {
  for (const slug of ['chatgpt-vs-claude-for-small-business', 'zapier-vs-chatgpt']) {
    await page.goto(`${base}/compare/${slug}`);
    await page.getByRole('button', { name: 'Necessary only', exact: true }).click();
    const panel = '[aria-label="Next steps after comparing"]';
    assert.equal(await page.locator(`${panel} a`).count(), 2);
    await clickWithoutNavigation(`${panel} a[href="/#explore"]`);
    assert.equal((await events('comparison_cta_clicked')).length, 0);
    await page.getByRole('button', { name: 'Allow analytics', exact: true }).click();
    await clickWithoutNavigation(`${panel} a[href="/#explore"]`);
    await clickWithoutNavigation(`${panel} a[href^="https://grand-florentine"]`);
    const ctaEvents = await events('comparison_cta_clicked');
    assert.deepEqual(ctaEvents.map(x => x[2].destination), ['catalogue', 'academy']);
    assert.ok(ctaEvents.every(x => x[2].comparison === slug));
    const academy = new URL(await page.locator(`${panel} a[href^="https://grand-florentine"]`).getAttribute('href'));
    assert.equal(academy.searchParams.get('utm_content'), slug);
    // Exercise the actual local catalogue navigation as well.
    await page.locator(`${panel} a[href="/#explore"]`).click();
    await page.waitForURL('**/#explore');
    await page.locator('#explore').waitFor();
  }
  await page.goto(base + '/submit');
  await page.waitForFunction(() => window.__aibiztoolsAnalyticsConsent === 'granted');
  await page.waitForFunction(() => Array.from(window.dataLayer || [], x => Array.from(x)).some(x => x[1] === 'submission_form_opened'));
  assert.equal((await events('submission_form_opened')).length, 1);
  await page.getByRole('button', { name: 'Submit tool', exact: true }).click();
  assert.equal((await events('submission_form_success')).length, 0, 'HTML validation is not success');
  for (const [name, value] of Object.entries({ toolName: 'Private Demo', website: 'https://example.com', audience: 'Private audience', problem: 'Private business detail' })) await page.locator(`[name="${name}"]`).fill(value);
  let outcome = 'failure', submissions = 0;
  await page.route('**/api/submit', async route => {
    submissions++;
    await route.fulfill({ status: outcome === 'failure' ? 500 : 200, contentType: 'application/json', body: JSON.stringify(outcome === 'success' ? { accepted: true } : { accepted: false }) });
  });
  await page.getByRole('button', { name: 'Submit tool', exact: true }).click();
  await page.getByRole('alert').waitFor();
  assert.equal((await events('submission_form_success')).length, 0, 'server error is not success');
  outcome = 'spam';
  await page.getByRole('button', { name: 'Submit tool', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('form').getAttribute('aria-busy') === 'false');
  assert.equal((await events('submission_form_success')).length, 0, '200 without acceptance is not success');
  outcome = 'success';
  await page.getByRole('button', { name: 'Submit tool', exact: true }).click();
  await page.getByRole('heading', { name: 'Thanks — your tool has been submitted for review.' }).waitFor();
  const success = await events('submission_form_success');
  assert.equal(success.length, 1);
  assert.equal(submissions, 3);
  assert.ok(!JSON.stringify(success).includes('Private'));
  await page.goto(base + '/submit/thanks');
  assert.equal((await events('submission_form_success')).length, 0, 'direct thanks visit is not success');
  await page.goto(base + '/submit');
  await page.getByRole('button', { name: 'Necessary only', exact: true }).click();
  await page.reload();
  await page.locator('[name="toolName"]').waitFor();
  assert.equal((await events('submission_form_opened')).length, 0);
  for (const [name, value] of Object.entries({ toolName: 'Demo', website: 'https://example.com', audience: 'Demo', problem: 'Demo' })) await page.locator(`[name="${name}"]`).fill(value);
  await page.getByRole('button', { name: 'Submit tool', exact: true }).click();
  await page.getByRole('heading', { name: 'Thanks — your tool has been submitted for review.' }).waitFor();
  assert.equal((await events('submission_form_success')).length, 0, 'denied consent blocks success analytics');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(base + '/compare/chatgpt-vs-claude-for-small-business');
  const cta = page.locator('[aria-label="Next steps after comparing"]');
  await cta.scrollIntoViewIfNeeded();
  const box = await cta.boundingBox(); assert.ok(box.x >= 0 && box.x + box.width <= 375);
  await page.screenshot({ path: '/workspace/scratch/a39f279310d7/comparison-cta-mobile.png', fullPage: true });
  assert.deepEqual(errors, []);
  console.log(`PASS comparison CTA destinations, catalogue navigation, consent, form open, invalid/error/spam/success paths, privacy and mobile; external requests blocked/stubbed: ${external}`);
} finally { await browser.close(); }
