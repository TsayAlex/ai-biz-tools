export const GA_MEASUREMENT_ID = "G-RWBTJRK4H5";
export const CONSENT_STORAGE_KEY = "aibiztools:analytics-consent:v1";
export const CONSENT_CHANGED_EVENT = "aibiztools:consent-changed";

// This runs before any Google script, including when a saved choice exists.
export const GA_CONSENT_BOOTSTRAP = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
  window.gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
`;

export function getSavedConsent() {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function applyConsent(choice) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.__aibiztoolsAnalyticsConsent = choice;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = choice !== "granted";
  window.gtag("consent", "update", {
    analytics_storage: choice === "granted" ? "granted" : "denied",
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"
  });
  if (choice === "granted" && !window.__aibiztoolsGaInitialized) {
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false, allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    window.__aibiztoolsGaInitialized = true;
  }
}

export function track(eventName, payload = {}) {
  if (typeof window === "undefined" || window.__aibiztoolsAnalyticsConsent !== "granted" || typeof window.gtag !== "function") return false;
  const parameters = { ...payload, site_product: "ai_biz_tools", send_to: GA_MEASUREMENT_ID };
  window.gtag("event", eventName, parameters);
  window.dispatchEvent(new CustomEvent("aibiztools:event", {
    detail: { event: eventName, ...parameters }
  }));
  return true;
}
