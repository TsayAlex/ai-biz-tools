// Pure request validators. No email, remote network, cookies or analytics.
export const MAX_DECLARED_BYTES = 16 * 1024;
export class SubmissionTooLargeError extends Error {
  constructor() { super('Submission is too large.'); this.name = 'SubmissionTooLargeError'; }
}
export class InvalidSubmissionBodyError extends Error {
  constructor() { super('Invalid form body.'); this.name = 'InvalidSubmissionBodyError'; }
}
export function isOversizedDeclaredBody(value) {
  if (value == null || value === '') return false;
  if (!/^\d+$/.test(String(value))) return false;
  return Number(value) > MAX_DECLARED_BYTES;
}
export async function readBoundedFormData(request) {
  if (isOversizedDeclaredBody(request.headers.get('content-length'))) throw new SubmissionTooLargeError();
  const contentType = request.headers.get('content-type') || '';
  if (!/^(multipart\/form-data\s*;|application\/x-www-form-urlencoded(?:\s*;|\s*$))/i.test(contentType))
    throw new InvalidSubmissionBodyError();
  if (!request.body) throw new InvalidSubmissionBodyError();
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_DECLARED_BYTES) {
        await reader.cancel().catch(() => {});
        throw new SubmissionTooLargeError();
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  const replay = new Request(request.url, {
    method: 'POST',
    headers: { 'content-type': contentType },
    body: bytes,
  });
  try { return await replay.formData(); }
  catch { throw new InvalidSubmissionBodyError(); }
}
export function validateSubmissionFields({ toolName, website, audience, problem }) {
  if (!toolName || !website || !audience || !problem)
    return { status: 400, message: 'Please complete all required fields.' };
  if (toolName.length > 120 || website.length > 2048 || audience.length > 500 || problem.length > 2000)
    return { status: 413, message: 'Submission fields are too long.' };
  try {
    const url = new URL(website);
    if (!(url.protocol === 'http:' || url.protocol === 'https:') || !url.hostname || url.username || url.password)
      throw new Error('Unsafe URL');
  } catch {
    return { status: 400, message: 'Please enter a valid website URL.' };
  }
  return null;
}
