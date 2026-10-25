"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CONSENT_CHANGED_EVENT, track } from "../lib/analytics";

export default function TrackedSubmissionForm({ children }) {
  const opened = useRef(false);
  const sending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function recordOpen() {
      if (!opened.current) opened.current = track("submission_form_opened", { form_id: "tool_submission" });
    }
    // Parent consent restoration can run after this effect. The frame also
    // covers restored consent; the event handles an explicit choice in this tab.
    const frame = requestAnimationFrame(recordOpen);
    function syncStorage() { requestAnimationFrame(recordOpen); }
    window.addEventListener(CONSENT_CHANGED_EVENT, recordOpen);
    window.addEventListener("storage", syncStorage);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(CONSENT_CHANGED_EVENT, recordOpen);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  async function submit(event) {
    event.preventDefault();
    if (sending.current || submitted) return;
    sending.current = true;
    setBusy(true);
    setError("");
    const body = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/submit", {
        method: "POST", headers: { Accept: "application/json" }, body
      });
      const result = await response.json();
      if (!response.ok || result.accepted !== true) throw new Error("not_accepted");
      // Only a confirmed provider acceptance is a success. No field values
      // or provider identifiers are sent to analytics.
      track("submission_form_success", { form_id: "tool_submission" });
      setSubmitted(true);
    } catch {
      setError("Submission could not be confirmed. Please try again later.");
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  if (submitted) return <div role="status"><h2>Thanks — your tool has been submitted for review.</h2>
    <p>Submission does not guarantee inclusion or a positive review.</p><Link href="/">Back to AI Biz Tools</Link></div>;

  return <form action="/api/submit" method="POST" onSubmit={submit} aria-busy={busy}>
    <fieldset disabled={busy} style={{ border: 0, padding: 0, margin: 0, minWidth: 0, display: "grid", gap: 18 }}>{children}</fieldset>
    {error && <p role="alert">{error}</p>}
    {busy && <p role="status">Sending…</p>}
  </form>;
}
