export function track(eventName, payload = {}) {
  if (typeof window === "undefined") return;
  const event = { event: eventName, ...payload, ts: Date.now() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
  window.dispatchEvent(new CustomEvent("aibiztools:event", { detail: event }));
}
