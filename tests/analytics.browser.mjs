const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
const base = process.env.ANALYTICS_BASE_URL || 'http://127.0.0.1:3000';
// The external Google script is stubbed; these tests verify commands without collecting real visitor data.
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const context=await browser.newContext();
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
let googleRequests=0;
await context.route('https://www.googletagmanager.com/**',route=>{googleRequests++;return route.fulfill({contentType:'application/javascript',body:'/* GA stub: validate queue without sending user data */'});});
await context.route('https://*.google-analytics.com/**',route=>route.abort());
const queue=()=>page.evaluate(()=>Array.from(window.dataLayer||[],x=>Array.from(x)));
const events=async name=>(await queue()).filter(x=>x[0]==='event'&&x[1]===name);
await page.goto(base + '/');
await page.getByRole('button',{name:'Allow analytics',exact:true}).waitFor();
await page.waitForTimeout(300);
assert.equal(googleRequests,0);
assert.equal((await queue())[0][0],'consent');assert.equal((await queue())[0][1],'default');
assert.deepEqual((await queue())[0][2],{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
const box=await page.locator('.analytics-consent').boundingBox();console.log('Indicator bounding box',box,'viewport',page.viewportSize());
assert.ok(box.y>=0&&box.y+box.height<=page.viewportSize().height,'persistent controls within viewport');
await page.getByRole('button',{name:'Necessary only',exact:true}).click();assert.equal(googleRequests,0);assert.equal((await events('analytics_consent')).length,0);
await page.getByRole('button',{name:'Allow analytics',exact:true}).click();
await page.waitForTimeout(250);
assert.equal(googleRequests,1);assert.equal((await events('analytics_consent')).length,1);
await page.getByRole('button',{name:'Allow analytics',exact:true}).click();assert.equal((await events('analytics_consent')).length,1);
await page.getByRole('button',{name:'Test analytics',exact:true}).click();assert.equal((await events('analytics_test')).length,1);
await page.locator('#finder select').nth(0).selectOption({index:1});await page.locator('#finder select').nth(1).selectOption({index:1});await page.locator('#finder input[type=radio]').first().check();
await page.getByRole('button',{name:'Find my 3 tools',exact:false}).click();assert.equal((await events('finder_completed')).length,1);
await page.locator('.finder-review').first().click();await page.waitForURL('**/tools/**');assert.equal((await events('review_clicked')).length,1);
await page.locator('a.primary.big[target=_blank]').first().evaluate(el=>{el.addEventListener('click',e=>e.preventDefault(),{once:true});el.click();});assert.equal((await events('vendor_clicked')).length,1);
await page.goto(base + '/');await page.waitForTimeout(250);assert.equal((await events('analytics_consent')).length,0);
await page.locator('#explore a').filter({hasText:'Official site'}).first().evaluate(el=>{el.addEventListener('click',e=>e.preventDefault(),{once:true});el.click();});
let vendor=(await events('vendor_clicked')).at(-1);assert.equal(vendor[2].source,'directory');assert.ok(vendor[2].tool);assert.ok(vendor[2].href);
await page.getByRole('button',{name:'Necessary only',exact:true}).click();assert.equal((await events('analytics_consent')).length,1);assert.equal((await events('analytics_consent'))[0][2].choice,'denied');
const count=(await events('vendor_clicked')).length;
await page.locator('#explore a').filter({hasText:'Official site'}).first().evaluate(el=>{el.addEventListener('click',e=>e.preventDefault(),{once:true});el.click();});assert.equal((await events('vendor_clicked')).length,count);assert.equal(await page.getByRole('button',{name:'Test analytics'}).isDisabled(),true);
await page.reload();await page.waitForTimeout(250);assert.equal((await events('analytics_consent')).length,0);assert.equal((await events('page_view')).length,0);
assert.equal(await page.evaluate(()=>localStorage.getItem('aibiztools:analytics-consent:v1')),'denied');
await page.getByRole('button',{name:'Allow analytics',exact:true}).click();await page.waitForTimeout(200);
for(const path of ['/best/best-ai-tools-for-real-estate-agents','/compare/chatgpt-vs-claude']){
 await page.goto(base+path);await page.waitForTimeout(200);
 await page.locator('a').filter({hasText:'Official site'}).first().evaluate(el=>{el.addEventListener('click',e=>e.preventDefault(),{once:true});el.click();});assert.equal((await events('vendor_clicked')).length,1);
}
for(const cmd of await queue())if(cmd[0]==='consent')for(const k of ['ad_storage','ad_user_data','ad_personalization'])assert.equal(cmd[2][k],'denied');
for(const cmd of await queue())if(cmd[0]==='event'){assert.equal(cmd[2].site_product,'ai_biz_tools');assert.equal(cmd[2].send_to,'G-RWBTJRK4H5');}
// Keep affiliate destinations intact and carry their identifiers into outbound events.
for (const [tool, href] of [['elevenlabs', 'https://try.elevenlabs.io/d40ov9pmbed3'], ['krisp', 'https://krisp.pxf.io/7XVrWr'], ['quoteiq', 'https://admin-quoteiq.web.app/register?via=oleksii']]) {
  await page.goto(base + '/tools/' + tool);
  await page.getByRole('button', { name: 'Test analytics' }).waitFor({ state: 'visible' });
  await page.waitForFunction(() => window.__aibiztoolsAnalyticsConsent === 'granted');
  await page.locator('a.primary.big[target=_blank]').first().evaluate(el => { el.addEventListener('click', e => e.preventDefault(), { once: true }); el.click(); });
  const event = (await events('vendor_clicked')).at(-1);
  assert.equal(event[2].tool, tool);
  assert.equal(event[2].href, href);
  assert.equal(event[2].source, 'tool_review');
}
// Another tab revoking consent must update the already-open page without consent events.
const second = await context.newPage();
await second.goto(base + '/');
await second.getByRole('button', { name: 'Necessary only', exact: true }).click();
await page.waitForFunction(() => window.__aibiztoolsAnalyticsConsent === 'denied');
assert.equal(await page.getByRole('button', { name: 'Test analytics' }).isDisabled(), true);
assert.equal((await events('analytics_consent')).length, 0);
await second.close();
// The persistent indicator stays visible on small screens as well.
await page.setViewportSize({ width: 375, height: 667 });
await page.goto(base + '/');
await page.getByRole('button', { name: 'Allow analytics', exact: true }).waitFor();
const mobileBox = await page.locator('.analytics-consent').boundingBox();
assert.ok(mobileBox.y >= 0 && mobileBox.y + mobileBox.height <= 667);
assert.ok(mobileBox.x >= 0 && mobileBox.x + mobileBox.width <= 375);
assert.deepEqual(errors,[]);console.log('PASS browser consent, persistence, reload, revoke, finder/review/vendor/test, guide/comparison, payloads and ad denial');
await browser.close();
