// Reusable pure validators: no network, secrets or analytics.
export const MAX_DECLARED_BYTES = 16 * 1024;
export function isOversizedDeclaredBody(value) {
  if (value == null || value === "") return false;
  if (!/^\d+$/.test(String(value))) return false;
  return Number(value) > MAX_DECLARED_BYTES;
}
export function validateSubmissionFields({toolName, website, audience, problem}) {
  if (!toolName || !website || !audience || !problem)
    return { status: 400, message: "Please complete all required fields." };
  if (toolName.length > 120 || website.length > 2048 || audience.length > 500 || problem.length > 2000)
    return { status: 413, message: "Submission fields are too long." };
  try {
    const url = new URL(website);
    if (!(url.protocol === "http:" || url.protocol === "https:") || !url.hostname || url.username || url.password)
      throw new Error("Unsafe URL");
  } catch {
    return { status: 400, message: "Please enter a valid website URL." };
  }
  return null;
}
