import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
const src = readFileSync(new URL('../lib/submitValidation.js', import.meta.url), 'utf8');
const {isOversizedDeclaredBody, validateSubmissionFields} = await import('data:text/javascript;base64,' + Buffer.from(src).toString('base64'));
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
