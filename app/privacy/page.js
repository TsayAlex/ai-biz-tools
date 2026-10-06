export const metadata = { title: "Privacy policy" };

export default function Privacy() {
  return <main className="detail-page">
    <section className="business-hero"><span className="eyebrow">LEGAL</span><h1>Privacy policy</h1><p>This page describes the services currently integrated into AI Biz Tools and the analytics choices available on this site.</p></section>
    <section className="content-card wide">
      <h2>Google Analytics and your choice</h2>
      <p>We use Google Analytics 4 to understand page visits and interactions such as finder completions, review links and outbound vendor links. Events may include tool identifiers, the interaction source, destination URL, business/task selections and the site product identifier. Google may process device and browser information and use analytics cookies when analytics is allowed.</p>
      <p>Google analytics storage defaults to denied. We load the Google Analytics script and send GA4 events only after you choose Allow analytics. Advertising storage, advertising user data and advertising personalization remain denied. Necessary only keeps GA4 off. You can change your choice at any time using the persistent GA4 controls. The ON/OFF indicator shows your consent choice; it does not confirm that Google received data.</p>
      <p>Your choice is saved in this browser’s local storage. If storage is unavailable, the choice lasts for the current page session. Clearing browser storage or using another browser requires a new choice. Changing to Necessary only stops future GA4 events; it does not remove data already sent to Google or automatically erase existing cookies. Test analytics queues an analytics_test event only while analytics is allowed.</p>
      <h2>Vercel Analytics</h2>
      <p>Vercel Web Analytics remains integrated separately and is not controlled by the GA4 preference. It measures visits using Vercel’s analytics service, which describes its visitor measurement as cookie-free. This does not mean no data is processed: request, page and device information may be handled by Vercel. See <a href="https://vercel.com/docs/analytics/privacy-policy">Vercel’s analytics privacy documentation</a> and <a href="https://policies.google.com/privacy">Google’s privacy policy</a> for provider details.</p>
      <h2>Forms and external links</h2>
      <p>The tool submission form sends the tool name, website, intended audience and problem description to our server. When configured, Resend emails that submission to the site’s recipient. Newsletter signup currently displays a message and is not connected to an email provider. Do not include sensitive personal information in submissions.</p>
      <p>Vendor and affiliate links lead to independent websites. Those providers may collect information under their own policies. Some links may earn us a commission; see our <a href="/affiliate-disclosure">affiliate disclosure</a>.</p>
      <h2>Policy administration</h2>
      <p>The operator still needs to provide its business identity, a monitored privacy contact, applicable retention periods and the process for handling privacy requests before production use. This page does not promise legal compliance or specific provider retention periods.</p>
    </section>
  </main>;
}
