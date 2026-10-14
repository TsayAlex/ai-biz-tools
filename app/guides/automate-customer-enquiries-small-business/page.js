import Link from "next/link";

export const metadata = {
  title: "How to automate customer enquiries safely | Small business guide",
  description: "A practical two-week plan for Irish small businesses to speed up customer enquiry replies, measure real time saved, protect customer data and avoid premature software subscriptions.",
  alternates: { canonical: "/guides/automate-customer-enquiries-small-business" },
  openGraph: {
    title: "A two-week, low-risk test of AI for customer enquiries",
    description: "Measure your current reply time, try human-reviewed templates and check the result before buying automation.",
    url: "/guides/automate-customer-enquiries-small-business",
    type: "article"
  },
  twitter: {
    card: "summary",
    title: "Can AI help answer customer enquiries? Try a two-week test.",
    description: "Free, practical guide for small businesses. No unrealistic savings claims."
  }
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "A two-week, low-risk test of AI for customer enquiries",
  description: "A measured approach to repetitive customer replies, with a human reviewer and privacy safeguards.",
  inLanguage: "en",
  mainEntityOfPage: "https://ai-biz-tools.vercel.app/guides/automate-customer-enquiries-small-business",
  publisher: { "@type": "Organization", name: "AI Biz Tools", url: "https://ai-biz-tools.vercel.app/" }
};

export default function EnquiryGuide() {
  return <main className="detail-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} />
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Customer enquiries</div>
    <section className="business-hero">
      <span className="eyebrow">FREE PRACTICAL GUIDE • SMALL BUSINESS • IRELAND</span>
      <h1>Could AI help you answer customer enquiries faster?</h1>
      <p>A two-week experiment for a small shop, café, tradesperson or service business. You do not need to buy software, automate sending, or share private customer messages to get started.</p>
      <Link className="primary inline" href="/guides/ai-workflow-value-calculator">Estimate the time involved →</Link>
    </section>

    <article className="content-card wide value-article">
      <h2>Start with a real problem, not another subscription</h2>
      <p>If you answer similar questions about opening hours, appointments, availability or the steps in your service, a reusable draft can help. The goal is not to replace conversations: it is to reduce repetitive typing while keeping every reply accurate and respectful.</p>
      <p><strong>Only choose one low-risk process.</strong> Avoid complaints, disputes, payments, medical advice and any message requiring judgment or access to confidential information during this first trial.</p>

      <h2>Days 1–3: measure the work you already do</h2>
      <ol>
        <li>Choose one category, such as &ldquo;request for an appointment&rdquo;. Do not mix several kinds of work.</li>
        <li>Time five to ten ordinary replies. Record only the type of request, number of minutes and whether a correction was needed; do not put customers' details in the measurement sheet.</li>
        <li>Calculate the average reply time and the number of similar enquiries each week.</li>
        <li>Write down what a good answer must include: a truthful response, a clear next step and a friendly tone.</li>
      </ol>

      <h2>Days 4–7: create one reusable draft</h2>
      <p>Try the following generic sample. Replace placeholders manually; do not paste an actual customer's name, email, address, order number or private enquiry into an unfamiliar AI service.</p>
      <blockquote>
        <p><strong>Drafting instruction:</strong> Write a short, polite reply in plain English to a customer asking about an available appointment. Use only this fictional business information: appointments are requested by phone; working hours are Monday to Friday 9–5. Do not promise an available slot. Include a clear next step and leave placeholders for information that a staff member will confirm.</p>
      </blockquote>
      <p>Check the AI-assisted draft yourself. Remove invented promises or pricing, confirm dates and hours, and keep control of the final wording. Start with copying approved drafts into your normal email or messaging tool; do not allow automatic sending yet.</p>

      <h2>Days 8–12: run a small human-reviewed comparison</h2>
      <ol>
        <li>Use the draft for up to ten appropriate enquiries. A person must read and approve every reply before sending.</li>
        <li>Time the entire process: opening the template, editing, verifying the details and correcting errors. Do not count typing time alone.</li>
        <li>Record mistakes and whether the message helped the customer. An inaccurate fast reply is not an improvement.</li>
        <li>If the process requires uploading identifiable customer information, stop and review your privacy and data-protection arrangements first.</li>
      </ol>

      <h2>Days 13–14: decide whether it is worth continuing</h2>
      <p>Compare average total minutes <em>before</em> and <em>after</em>. Include setup, review and software costs. If the replies became less accurate, slower or less personal, change the approach or stop. Saved time is not the same as additional turnover or profit.</p>
      <p><strong>Illustration only:</strong> 15 replies per week taking 20 minutes each, with a hypothetical 50% total time reduction, would free 2.5 hours per week. That is a mathematical example, not a measured result for a real business.</p>
      <Link className="primary inline" href="/guides/ai-workflow-value-calculator">Try the free savings calculator →</Link>

      <h2>A simple decision checklist</h2>
      <ul>
        <li>Were customer replies still accurate, polite and useful?</li>
        <li>Was total time saved after checking and correcting AI output?</li>
        <li>Did you avoid sharing personal or confidential business data?</li>
        <li>Can staff repeat the process without relying on one expert?</li>
        <li>Would the benefits still make sense after a realistic subscription fee?</li>
      </ul>
      <p>For any real deployment involving personal data, check the relevant Irish and EU data-protection requirements, the tool provider's terms and how customer information would be handled. This guide is practical information, not legal advice.</p>

      <h2>What tool should you try first?</h2>
      <p>Begin with the software you already pay for. If a new tool is needed, compare its free tier, ongoing price, data handling, ease of correction and actual usefulness. Our transparent finder recommends a shortlist from the existing directory; it does not perform an independent evaluation of your business.</p>
      <Link className="primary inline" href="/#finder">Compare three tools for your task →</Link>
      <p className="value-warning">Disclosure: AI Biz Tools may use clearly identified affiliate links on tool pages. A recommendation is not proof of a saving or a guarantee of suitability. Read the <Link href="/affiliate-disclosure">affiliate disclosure</Link> and <Link href="/methodology">review method</Link> before deciding.</p>
    </article>
  </main>;
}
