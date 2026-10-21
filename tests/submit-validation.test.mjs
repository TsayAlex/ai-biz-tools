import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
const src = readFileSync(new URL('../lib/submitValidation.js', import.meta.url), 'utf8');
const {isOversizedDeclaredBody, validateSubmissionFields, readBoundedFormData, SubmissionTooLargeError, InvalidSubmissionBodyError} = await import('data:text/javascript;base64,' + Buffer.from(src).toString('base64'));
const valid = {toolName:'Tool',website:'https://example.com/',audience:'small firms',problem:'save time'};
test('missing and oversized fields fail before email provider',()=>{
 assert.equal(validateSubmissionFields({...valid,toolName:''}).status,400);
 assert.equal(validateSubmissionFields({...valid,problem:'x'.repeat(2001)}).status,413);
 assert.equal(validateSubmissionFields({...valid,website:'x'.repeat(2049)}).status,413);
});
test('URLs reject credentials and unsafe schemes',()=>{
 for(const website of ['https://name:secret@example.com','javascript:alert(1)','ftp://example.com','not a url'])
  assert.equal(validateSubmissionFields({...valid,website}).status,400);
 assert.equal(validateSubmissionFields(valid),null);
});
test('declared body gate catches oversized integer values',()=>{
 assert.equal(isOversizedDeclaredBody('16385'),true);
 assert.equal(isOversizedDeclaredBody('16384'),false);
 assert.equal(isOversizedDeclaredBody(null),false);
});

const makeForm = (body) => new Request('https://test.example/api/submit',{
  method:'POST', headers:{'content-type':'application/x-www-form-urlencoded'}, body
});
test('small body with missing content-length works', async()=>{
  const r = makeForm('toolName=Tool&website=https%3A%2F%2Fexample.com&audience=small&problem=test');
  assert.equal(r.headers.has('content-length'),false);
  assert.equal((await readBoundedFormData(r)).get('toolName'),'Tool');
});
test('oversized body rejected even without content-length', async()=>{
  const r = makeForm('problem='+'x'.repeat(20000));
  assert.equal(r.headers.has('content-length'),false);
  await assert.rejects(readBoundedFormData(r),SubmissionTooLargeError);
});
test('forged smaller content-length does not bypass limit', async()=>{
  const r = makeForm('problem='+'x'.repeat(17000)); r.headers.set('content-length','100');
  await assert.rejects(readBoundedFormData(r),SubmissionTooLargeError);
});
test('multipart form works and malformed payload is rejected',async()=>{
  const fd = new FormData(); fd.set('toolName','Tool');
  const good = new Request('https://test.example/api/submit',{method:'POST',body:fd});
  assert.equal((await readBoundedFormData(good)).get('toolName'),'Tool');
  const bad = new Request('https://test.example/api/submit',{method:'POST',headers:{'content-type':'multipart/form-data; boundary=a'},body:'bad'});
  await assert.rejects(readBoundedFormData(bad),InvalidSubmissionBodyError);
});
test('non-form media type rejected',async()=>{
  const r = new Request('https://test.example/api/submit',{method:'POST',headers:{'content-type':'application/json'},body:'{}'});
  await assert.rejects(readBoundedFormData(r),InvalidSubmissionBodyError);
});
