"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { applyConsent, getSavedConsent, track, GA_MEASUREMENT_ID, CONSENT_STORAGE_KEY, CONSENT_CHANGED_EVENT } from "../lib/analytics";

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState(null);
  const [loadGoogle, setLoadGoogle] = useState(false);
  const [notice, setNotice] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    function restore() {
      const saved = getSavedConsent();
      applyConsent(saved);
      setChoice(saved);
      if (saved === "granted") setLoadGoogle(true);
    }
    function sync(event) {
      if (event.key === CONSENT_STORAGE_KEY || event.key === null) restore();
    }
    restore();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    if (choice === "granted") track("page_view", {
      page_location: window.location.origin + pathname,
      page_title: document.title, source: "navigation"
    });
  }, [choice, pathname]);

  function choose(next) {
    if (next === choice) return;
    // Record revocation while the previous consent is still active; never track after denial.
    if (choice === "granted") track("analytics_consent", { choice: next, previous_choice: choice, source: "consent_ui" });
    applyConsent(next);
    if (next === "granted") {
      setLoadGoogle(true);
      track("analytics_consent", { choice: next, previous_choice: choice || "unset", source: "consent_ui" });
    }
    setChoice(next);
    setNotice("");
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
    } catch {
      setNotice("Your choice applies here, but this browser could not save it.");
    }
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: { choice: next } }));
  }

  return <>
    {loadGoogle && <Script id="ga4-loader" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" onError={() => setNotice("Google Analytics could not load. Your browser or network may block it.")} />}
    <section className="analytics-consent" aria-label="Analytics preferences">
      <div className="analytics-consent-heading"><strong aria-live="polite">GA4: {choice === "granted" ? "ON" : "OFF"}</strong><span>Google Analytics is optional. Advertising consent stays off.</span></div>
      <div className="analytics-consent-actions">
        <button type="button" className="secondary" aria-pressed={choice === "granted"} onClick={() => choose("granted")}>Allow analytics</button>
        <button type="button" className="secondary" aria-pressed={choice === "denied"} onClick={() => choose("denied")}>Necessary only</button>
        <button type="button" className="secondary" disabled={choice !== "granted"} onClick={() => {
          if (track("analytics_test", { source: "consent_ui", href: window.location.origin + pathname })) setNotice("analytics_test queued for GA4. Delivery may be blocked by your browser or network.");
        }}>Test analytics</button>
        <a href="/privacy">Privacy policy</a>
      </div>
      <small>GA4 status reflects your consent, not confirmed delivery. Vercel Analytics remains enabled.</small>
      {notice && <p role="status">{notice}</p>}
    </section>
  </>;
}
