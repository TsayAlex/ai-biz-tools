import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test, beforeEach, afterEach } from 'node:test';
import vm from 'node:vm';

// Import the browser utility without changing the Next.js package module type.
const source = await readFile(new URL('../lib/analytics.js', import.meta.url), 'utf8');
const { applyConsent, getSavedConsent, track, GA_CONSENT_BOOTSTRAP, GA_MEASUREMENT_ID, CONSENT_STORAGE_KEY } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
let localEvents;
beforeEach(() => {
  localEvents = [];
  globalThis.window = { localStorage: { getItem: () => null }, dispatchEvent: e => localEvents.push(e) };
  globalThis.CustomEvent = class { constructor(type, options) { this.type = type; this.detail = options.detail; } };
});
afterEach(() => { delete globalThis.window; delete globalThis.CustomEvent; });
const commands = () => window.dataLayer.map(args => [...args]);

test('bootstrap denies all four consent categories before any Google config', () => {
  vm.runInNewContext(GA_CONSENT_BOOTSTRAP, { window });
  assert.deepEqual(commands()[0].slice(0, 2), ['consent', 'default']);
  assert.deepEqual(JSON.parse(JSON.stringify(commands()[0][2])), {
    analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
  });
  assert.equal(commands().length, 1);
});

test('no events are queued before consent or while denied', () => {
  assert.equal(track('finder_completed'), false);
  applyConsent('denied');
  assert.equal(track('vendor_clicked', { tool: 'chatgpt' }), false);
  assert.equal(commands().filter(x => x[0] === 'event').length, 0);
  assert.equal(localEvents.length, 0);
});

test('grant configures exactly one ID without an automatic duplicate page view', () => {
  applyConsent('granted');
  applyConsent('granted');
  const configs = commands().filter(x => x[0] === 'config');
  assert.equal(configs.length, 1);
  assert.equal(configs[0][1], 'G-RWBTJRK4H5');
  assert.equal(configs[0][2].send_page_view, false);
  assert.equal(configs[0][2].allow_google_signals, false);
  assert.equal(window[`ga-disable-${GA_MEASUREMENT_ID}`], false);
});

test('all required events use the GA4 event API and useful fixed product parameters', () => {
  applyConsent('granted');
  for (const name of ['finder_completed', 'review_clicked', 'vendor_clicked', 'analytics_test', 'analytics_consent']) {
    assert.equal(track(name, { tool: 'chatgpt', source: 'directory', href: 'https://chatgpt.com/', site_product: 'wrong', send_to: 'wrong' }), true);
  }
  const events = commands().filter(x => x[0] === 'event');
  assert.equal(events.length, 5);
  for (const [, , payload] of events) {
    assert.equal(payload.tool, 'chatgpt');
    assert.equal(payload.source, 'directory');
    assert.equal(payload.href, 'https://chatgpt.com/');
    assert.equal(payload.site_product, 'ai_biz_tools');
    assert.equal(payload.send_to, GA_MEASUREMENT_ID);
  }
  assert.equal(localEvents.length, 5);
});

test('revocation blocks tracking immediately and regrant enables it without reconfiguring', () => {
  applyConsent('granted');
  applyConsent('denied');
  assert.equal(window[`ga-disable-${GA_MEASUREMENT_ID}`], true);
  assert.equal(track('analytics_test'), false);
  applyConsent('granted');
  assert.equal(track('analytics_test'), true);
  assert.equal(commands().filter(x => x[0] === 'config').length, 1);
  for (const [, , consent] of commands().filter(x => x[0] === 'consent')) {
    for (const name of ['ad_storage', 'ad_user_data', 'ad_personalization']) assert.equal(consent[name], 'denied');
  }
});

test('saved consent accepts only known choices and handles blocked browser storage', () => {
  for (const value of ['granted', 'denied', 'unexpected', null]) {
    window.localStorage.getItem = key => { assert.equal(key, CONSENT_STORAGE_KEY); return value; };
    assert.equal(getSavedConsent(), value === 'granted' || value === 'denied' ? value : null);
  }
  window.localStorage.getItem = () => { throw new Error('Storage blocked'); };
  assert.equal(getSavedConsent(), null);
});

test('restoring saved choices does not emit analytics_consent events', () => {
  window.localStorage.getItem = () => 'granted';
  applyConsent(getSavedConsent());
  assert.equal(commands().filter(x => x[0] === 'event').length, 0);
});

test('utility is safe during server rendering', () => {
  delete globalThis.window;
  assert.equal(getSavedConsent(), null);
  assert.equal(track('analytics_test'), false);
  assert.doesNotThrow(() => applyConsent('granted'));
});
