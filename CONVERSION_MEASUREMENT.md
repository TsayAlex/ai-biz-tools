# Comparison and submission measurement

The comparison pages offer two next steps: the existing catalogue at `/#explore`
and the existing ALEX AI Growth Academy. The Academy link carries fixed UTM
source, medium and campaign values plus the comparison slug as content.

| Event | Trigger | Parameters |
| --- | --- | --- |
| `comparison_cta_clicked` | Actual click on one of the two new links | `comparison`, `destination` (`catalogue` or `academy`), `placement` |
| `submission_form_opened` | `/submit` form mounted while analytics consent is granted, or consent granted while it is open | `form_id=tool_submission` |
| `submission_form_success` | JSON response confirms `accepted=true` after the mail provider returns an ID | `form_id=tool_submission` |

The existing consent-aware `track` helper adds product and measurement ID.
No form inputs, email addresses or provider IDs are sent to analytics.
Form-open is emitted once per mounted form, not on every interaction. Reloading
or a later new visit may produce a new opening. Success is counted once for the
accepted submission on that mounted form. Concurrent submit clicks are blocked.
No success is emitted for invalid fields, service failures, honeypot submissions,
or direct visits to `/submit/thanks`. Native non-JavaScript POST remains supported
but does not emit a client success event. Provider acceptance means accepted for
email processing, not final delivery, editorial approval, or revenue.

## Read the reports correctly

GA4 counts these events only for consenting users whose browser can load analytics.
Do not substitute GA4 enhanced-measurement `form_submit` for the confirmed-success
event. Optional GA4 custom dimensions require registration to break reports down
by comparison/destination; the named events themselves need no custom dimension.
Do not sum unique-user metrics across dates, hosts or GA4 properties. Keep preview
hostnames separate and investigate `analytics_test` traffic before describing
visits as external customers. Missing rows are not evidence of no audience.
Distinguish permission errors, disconnected sources, empty valid reports, date
lag, host filters and consent/ad-blocking gaps.

## Verification

- `npm run test:unit` includes the real API handler with an offline mail-provider stub.
- `node tests/conversion.browser.mjs` runs browser scenarios with all external
  requests blocked or stubbed, including success/error/spam and consent paths.
- The browser test stubs the submission endpoint; the API test verifies the actual
  handler separately. Neither sends an email or a real GA4 event.
- `npm run build` checks the Next.js production build.

Live mail-provider credentials/delivery, GA4 receipt after release and Academy
arrival-side event handling require a separate production validation. This change
does not alter the Academy deployment. Keep work in the review branch until the
owner approves production publication.
