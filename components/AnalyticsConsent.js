"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { applyConsent, getSavedConsent, track, GA_MEASUREMENT_ID, CONSENT_STORAGE_KEY, CONSENT_CHANGED_EVENT } from "../lib/analytics";

const ACADEMY_ARRIVAL_PREFIX = "aibiztools:academy-arrival:";

function academyLandingParams() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source") || "";
  if (!(source === "academy_final_r1" || source === "alex_ai_academy" || source.startsWith("academy_"))) return null;
  return {
    source,
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
    content: params.get("utm_content") || "",
    linker_present: params.has("_gl") ? 1 : 0,
    referrer_domain: (() => {
      try { return document.referrer ? new URL(document.referrer).hostname : ""; }
      catch { return ""; }
    })()
  };
}

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState(null);
  const [loadGoogle, setLoadGoogle] = useState(false);
  const [tagStatus, setTagStatus] = useState("not-loaded");
  const [notice, setNotice] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    function restore() {
      const saved = getSavedConsent();
      applyConsent(saved);
      setChoice(saved);
      if (saved === "granted") {
        setLoadGoogle(true);
        setTagStatus("loading");
      } else {
        setTagStatus("not-loaded");
      }
    }
    function sync(event) {
      if (event.key === CONSENT_STORAGE_KEY || event.key === null) restore();
    }
    restore();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    if (choice !== "granted") return;

    track("page_view", {
      page_location: window.location.origin + pathname,
      page_title: document.title,
      source: "navigation"
    });

    const landing = academyLandingParams();
    if (!landing) return;

    const marker = ACADEMY_ARRIVAL_PREFIX + window.location.pathname + window.location.search;
    let alreadySent = false;
    try { alreadySent = window.sessionStorage.getItem(marker) === "1"; } catch {}
    if (alreadySent || window.__aibiztoolsAcademyArrival === marker) return;

    if (track("academy_arrival", landing)) {
      window.__aibiztoolsAcademyArrival = marker;
      try { window.sessionStorage.setItem(marker, "1"); } catch {}
    }
  }, [choice, pathname]);

  function choose(next) {
    if (next === choice) return;
    // Record revocation while the previous consent is still active; never track after denial.
    if (choice === "granted") track("analytics_consent", { choice: next, previous_choice: choice, source: "consent_ui" });
    applyConsent(next);
    if (next === "granted") {
      setLoadGoogle(true);
      setTagStatus("loading");
      track("analytics_consent", { choice: next, previous_choice: choice || "unset", source: "consent_ui" });
    } else {
      setTagStatus("not-loaded");
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
    {loadGoogle && <Script
      id="ga4-loader"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
      onLoad={() => {
        setTagStatus("loaded");
        setNotice("Google tag loaded. You can send a test event now.");
      }}
      onError={() => {
        setTagStatus("blocked");
        setNotice("Google tag could not load. A browser extension, privacy setting, DNS filter, or network may be blocking it.");
      }}
    />}
    <section className="analytics-consent" aria-label="Analytics preferences">
      <div className="analytics-consent-heading">
        <strong aria-live="polite">GA4: {choice === "granted" ? "ON" : "OFF"}</strong>
        <span>Google Analytics is optional. Advertising consent stays off.</span>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="secondary" aria-pressed={choice === "granted"} onClick={() => choose("granted")}>Allow analytics</button>
        <button type="button" className="secondary" aria-pressed={choice === "denied"} onClick={() => choose("denied")}>Necessary only</button>
        <button type="button" className="secondary" disabled={choice !== "granted"} onClick={() => {
          if (track("analytics_test", {
            source: "consent_ui",
            href: window.location.origin + pathname,
            debug_mode: true
          })) setNotice("analytics_test queued for GA4 DebugView/Realtime. If it does not appear, check the Google tag status below.");
        }}>Test analytics</button>
        <a href="/privacy">Privacy policy</a>
      </div>
      <small>
        GA4 status reflects consent. Google tag status: {tagStatus}. Vercel Analytics remains enabled.
      </small>
      {notice && <p role="status">{notice}</p>}
    </section>
  </>;
}
