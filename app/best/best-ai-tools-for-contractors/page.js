import Link from "next/link";
import { seoPages } from "../../../data/seoPages";
import { getTool } from "../../../data/tools";
import { siteConfig } from "../../../lib/site";

const picks = [
  { slug:"jobber", label:"Best for scheduling + missed calls" },
  { slug:"quoteiq", label:"Best for AI-assisted estimating" },
  { slug:"chatgpt", label:"Best flexible assistant" },
  { slug:"companycam", label:"Best for job-site documentation" },
  { slug:"housecall-pro", label:"Best all-in-one field-service option" },
  { slug:"canva", label:"Best for local marketing visuals" }
];

const workflowRows = [
  ["Missed calls & booking", "Jobber / Housecall Pro", "Capture leads when you cannot answer the phone"],
  ["Estimates & quote prep", "QuoteIQ + human review", "Speed up drafting without trusting AI with final numbers"],
  ["Scopes, emails & follow-up", "ChatGPT", "Turn rough notes into clear customer-facing drafts"],
  ["Job-site documentation", "CompanyCam", "Create recaps, reports and checklists from field context"],
  ["Local marketing", "Canva", "Create before/after graphics, promos and reusable templates"]
];

const faqs = [
  ["What is the best AI tool for a small contractor?", "There is no universal winner. If missed calls and scheduling are the problem, start with a field-service platform such as Jobber or Housecall Pro. If quote preparation is the bottleneck, test QuoteIQ. If you mainly need writing, summaries and customer communication, a general assistant such as ChatGPT may be enough."],
  ["Can AI create contractor estimates automatically?", "AI can help draft estimate structure and scope, but final prices, quantities, labor assumptions, exclusions, taxes and local conditions still need human verification. Treat AI output as a draft, not an approved quote."],
  ["Should contractors use ChatGPT or contractor-specific software?", "Use a general assistant for flexible writing, research and admin. Use contractor-specific software when the workflow depends on scheduling, job records, estimating, dispatch, photos or customer calls."],
  ["How many AI tools should a contractor buy?", "Usually fewer than software lists suggest. Start with one expensive or repetitive workflow, test one tool, measure the result, and only add another subscription if it solves a different problem."]
];

export const metadata = {
  title: "Best AI Tools for Contractors in 2026 | AI Biz Tools",
  description: "Compare practical AI tools for contractors: estimating, missed calls, scheduling, job-site documentation, customer follow-up and local marketing.",
  alternates: { canonical: "/best/best-ai-tools-for-contractors" },
  openGraph: {
    title: "Best AI Tools for Contractors in 2026",
    description: "A practical contractor-focused shortlist organized by real workflows, not AI hype.",
    type: "article"
  }
};

export default function ContractorsGuide() {
  const selected = picks.map(x => ({...x, tool:getTool(x.slug)})).filter(x=>x.tool);
  const relatedPages = seoPages.filter(page => page.slug !== "best-ai-tools-for-contractors").slice(0, 6);
  const base = siteConfig.url.replace(/\/$/,"");
  const schema = {
    "@context":"https://schema.org",
    "@type":"Article",
    headline:"Best AI Tools for Contractors in 2026",
    description:metadata.description,
    dateModified:"2026-09-12",
    mainEntityOfPage:`${base}/best/best-ai-tools-for-contractors`,
    author:{"@type":"Organization",name:"AI Biz Tools"},
    publisher:{"@type":"Organization",name:"AI Biz Tools"}
  };
  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    mainEntity:faqs.map(([q,a])=>({
      "@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}
    }))
  };

  return (
    <main className="detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}} />

      <div className="breadcrumbs"><Link href="/">Home</Link> / Best AI Tools / Contractors</div>

      <section className="business-hero contractor-hero">
        <span className="eyebrow">CONTRACTOR BUYER'S GUIDE • UPDATED SEPTEMBER 2026</span>
        <h1>Best AI Tools for Contractors in 2026</h1>
        <p>For contractors, the useful AI is not the flashiest chatbot. It is software that reduces missed calls, quote admin, scheduling friction, documentation and repetitive customer communication.</p>
        <div className="hero-actions">
          <a className="primary" href="#shortlist">See the shortlist ↓</a>
          <Link className="secondary" href="/#finder">Use the free tool finder</Link>
        </div>
      </section>

      <section className="notice">
        <b>Quick answer:</b> Start with the bottleneck. Jobber and Housecall Pro are strong when operations and calls are the issue; QuoteIQ is more directly focused on AI-assisted estimating; CompanyCam fits documentation-heavy work; ChatGPT remains useful for flexible writing and admin. Pricing and features can change, so verify the vendor page before purchase.
      </section>

      <section className="section compact" id="shortlist">
        <span className="eyebrow">EDITORIAL SHORTLIST</span>
        <h2>6 tools worth evaluating first</h2>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead><tr><th>#</th><th>Tool</th><th>Best for</th><th>Category</th><th>Editorial score</th><th></th></tr></thead>
            <tbody>
              {selected.map((x,i)=>(
                <tr key={x.slug}>
                  <td>{i+1}</td><td><strong>{x.tool.name}</strong></td><td>{x.label}</td><td>{x.tool.category}</td><td>★ {x.tool.score}</td>
                  <td><Link href={`/tools/${x.slug}`}>Review →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section compact">
        <span className="eyebrow">START WITH THE JOB, NOT THE APP</span>
        <h2>Match the tool to the workflow</h2>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead><tr><th>Workflow</th><th>Good starting option</th><th>Why</th></tr></thead>
            <tbody>{workflowRows.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={c}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="content-grid">
        <article className="content-card">
          <h2>What AI should not decide for you</h2>
          <ul>
            <li>Final labor and material pricing.</li>
            <li>Code, permit or safety compliance.</li>
            <li>Contract language without professional review.</li>
            <li>Whether a customer issue needs a human response.</li>
          </ul>
        </article>
        <article className="content-card">
          <h2>A simple 14-day test</h2>
          <ol>
            <li>Choose one workflow that wastes time or loses leads.</li>
            <li>Record the current time, errors or missed opportunities.</li>
            <li>Test one tool on real jobs for two weeks.</li>
            <li>Keep it only if the workflow improves enough to justify cost and setup.</li>
          </ol>
        </article>
      </section>

      <section className="section compact">
        <span className="eyebrow">WHY THESE CATEGORIES</span>
        <h2>What current contractor software is actually doing with AI</h2>
        <div className="grid">
          <article className="content-card"><h3>Calls & booking</h3><p>Jobber's official documentation describes an AI Receptionist that can answer inquiries and help book work. Housecall Pro also offers AI teammates and an optional CSR AI for calls.</p></article>
          <article className="content-card"><h3>Estimating</h3><p>QuoteIQ markets an AI Estimator and AI CoPilot inside its contractor workflow. That makes it more relevant to estimating than a generic writing tool, but final quote numbers still need verification.</p></article>
          <article className="content-card"><h3>Field documentation</h3><p>CompanyCam's AI features turn project photos, descriptions and voice context into summaries, daily logs, recaps and checklists.</p></article>
        </div>
      </section>

      <section className="section compact">
        <span className="eyebrow">FAQ</span>
        <h2>Questions contractors should ask before buying</h2>
        <div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <section className="notice">
        <b>Editorial policy:</b> Rankings are based on workflow fit, not commissions. We do not claim hands-on testing where it has not occurred. Vendor facts were checked against official sources in September 2026. <Link href="/methodology">Methodology →</Link>
      </section>

      <section className="section compact">
        <span className="eyebrow">RELATED GUIDES</span>
        <h2>Related AI tool guides</h2>
        <div className="grid">
          {relatedPages.map((relatedPage) => (
            <article className="card" key={relatedPage.slug}>
              <Link className="secondary center" href={`/best/${relatedPage.slug}`}>{relatedPage.title}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <span className="eyebrow">NEXT STEP</span>
        <h2>Not sure which category fits?</h2>
        <p>Use the three-question Finder to get a short starting list by business type, task and buying approach.</p>
        <Link className="primary big" href="/#finder">Find my 3 tools →</Link>
      </section>
    </main>
  );
}
