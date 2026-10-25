import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

// Execute the real handler against a provider stub: no email leaves the test.
const source = (await readFile(new URL('../app/api/submit/route.js', import.meta.url), 'utf8'))
  .replace('import { Resend } from "resend";', 'const Resend = globalThis.__submissionProvider;')
  .replace('import { NextResponse } from "next/server";', 'const NextResponse = globalThis.__submissionResponse;');
let providerResult, calls = 0;
globalThis.__submissionProvider = class {
  emails = { send: async () => { calls++; return providerResult; } };
};
globalThis.__submissionResponse = class extends Response {
  static redirect(url, status) { return new Response(null, { status, headers: { location: String(url) } }); }
};
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

function request({ honey = '', accept = 'application/json', missing = false } = {}) {
  const body = new FormData();
  for (const [key, value] of Object.entries({ toolName: missing ? '' : 'Demo', website: 'https://example.com', audience: 'Demo users', problem: 'Demo task', companyWebsite: honey })) body.set(key, value);
  return new Request('http://localhost/api/submit', { method: 'POST', headers: { accept }, body });
}

test('success requires provider acceptance; spam, missing data, failures and direct thanks visits cannot create success', async () => {
  const previousKey = process.env.RESEND_API_KEY, previousTo = process.env.SUBMISSIONS_TO;
  process.env.RESEND_API_KEY = 'offline-test'; process.env.SUBMISSIONS_TO = 'test@example.invalid';
  try {
    providerResult = { data: { id: 'offline-id' }, error: null };
    let response = await POST(request());
    assert.equal(response.status, 200); assert.deepEqual(await response.json(), { accepted: true });
    const beforeSpam = calls;
    response = await POST(request({ honey: 'bot' }));
    assert.deepEqual(await response.json(), { accepted: false }); assert.equal(calls, beforeSpam);
    response = await POST(request({ missing: true })); assert.equal(response.status, 400);
    for (const result of [{ error: { message: 'rejected' } }, { data: null, error: null }]) {
      providerResult = result; response = await POST(request()); assert.equal(response.status, 500);
    }
    providerResult = { data: { id: 'offline-id' }, error: null };
    response = await POST(request({ accept: 'text/html' }));
    assert.equal(response.status, 303); assert.equal(new URL(response.headers.get('location')).pathname, '/submit/thanks');
    delete process.env.RESEND_API_KEY;
    response = await POST(request()); assert.equal(response.status, 500);
    const thanks = await readFile(new URL('../app/submit/thanks/page.js', import.meta.url), 'utf8');
    assert.ok(!thanks.includes('track('), 'opening the thanks URL alone is not a conversion');
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previousKey;
    if (previousTo === undefined) delete process.env.SUBMISSIONS_TO; else process.env.SUBMISSIONS_TO = previousTo;
  }
});
