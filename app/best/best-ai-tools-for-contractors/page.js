import Link from "next/link";
import { seoPages } from "../../../data/seoPages";
import { getTool } from "../../../data/tools";
import { siteConfig } from "../../../lib/site";

const picks = [
  { slug:"jobber", label:"Best for missed calls and scheduling", useCase:"Capture inbound leads, book work, and keep the office from losing jobs while crews are on site." },
  { slug:"quoteiq", label:"Best for AI-assisted estimating", useCase:"Draft quote structure and scope language faster while keeping human approval on final pricing." },
  { slug:"chatgpt", label:"Best flexible assistant", useCase:"Write follow-ups, summarize notes, create proposals, and turn rough job details into polished customer communication." },
  { slug:"companycam", label:"Best for job-site documentation", useCase:"Turn photos, notes and field context into recaps, reports and checklists your team can actually use." },
  { slug:"housecall-pro", label:"Best all-in-one field-service option", useCase:"Run scheduling, dispatch and customer communication from one operational workflow." },
  { slug:"canva", label:"Best for local marketing visuals", useCase:"Create before/after graphics, seasonal promos, service-area social posts and branded offers without a designer." }
];

const workflowRows = [
  ["Missed calls & lead capture", "Jobber / Housecall Pro", "Handle inquiries while you are on the road and reduce lost leads from unanswered calls."],
  ["Scheduling & dispatch", "Jobber / Housecall Pro", "Coordinate crew calendars, service windows and follow-up without losing track in text threads."],
  ["Estimates & quotes", "QuoteIQ + human review", "Draft scopes and pricing faster, but keep a human final check on labor, materials and local conditions."],
  ["Field documentation", "CompanyCam", "Create photo-based job recaps, daily logs and customer-ready updates from the field."],
  ["Customer communication", "ChatGPT + contractor software", "Turn rough notes into polite follow-ups, reminder texts and proposal drafts without starting from scratch."],
  ["Admin & content work", "ChatGPT / Canva", "Handle repetitive writing, marketing assets and operational content without adding another full-time hire."],
  ["Local marketing", "Canva", "Create simple service promotions, social posts and before-and-after graphics that fit a local contractor brand." ]
];

const selectionCriteria = [
  ["Estimating & quotes", "A tool should help draft scope, line items and customer communication without replacing human review on final pricing."],
  ["Missed calls & lead capture", "The best option reduces lost jobs from unanswered calls and texts during active fieldwork."],
  ["Scheduling", "The workflow should reduce back-and-forth about window times, crew availability and route planning."],
  ["Field documentation", "The software should make it easier to capture photos, notes and job status without a cluttered paper trail."],
  ["Customer communication", "Look for tools that create faster responses, clearer follow-ups and fewer dropped tasks."],
  ["Admin & content work", "AI is most valuable when it saves time on writing, repetitive updates, proposals and local marketing material." ]
];

const faqs = [
  ["What is the best AI tool for a small contractor?", "There is no single winner. If missed calls and scheduling are the biggest problem, start with a field-service platform such as Jobber or Housecall Pro. If estimating is the bottleneck, test QuoteIQ. If you mainly need writing, summaries and customer communication, a general assistant such as ChatGPT may be enough."],
  ["Can AI create contractor estimates automatically?", "AI can help draft estimate structure, scope language and customer-facing summaries, but labor assumptions, quantities, exclusions, taxes and local job conditions still need a human check. Treat AI output as a draft, not an approved quote."],
  ["Should contractors use ChatGPT or contractor-specific software?", "Use a general assistant for flexible writing, research and admin. Use contractor-specific software when the workflow depends on dispatch, scheduling, quoting, field photography, job records or customer calls."],
  ["How many AI tools should a contractor buy?", "Usually fewer than software lists suggest. Start with the workflow that costs the most time or loses the most jobs, test one tool on real work, and only add another subscription if it solves a different problem."],
  ["How do I choose between all-in-one field service software and a smaller AI tool?", "Choose the integrated platform when your main pain is operations across scheduling, dispatch, calls and customer communication. Choose a narrower tool when one workflow, such as estimating or marketing, is the main issue and your current system is already handling the rest." ]
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
        <p>For contractors, the most useful AI tools are the ones that reduce missed calls, shorten quote prep, organize scheduling, and keep job-site communication from turning into admin chaos. This guide focuses on the workflows that hurt cash flow and customer response time the most.</p>
        <div className="hero-actions">
          <a className="primary" href="#shortlist">See the shortlist ↓</a>
          <Link className="secondary" href="/#finder">Use the free tool finder</Link>
        </div>
      </section>

      <section className="notice">
        <b>Short answer:</b> Start with the workflow that is costing you the most money or time. If inbound calls and scheduling are the real problem, start with Jobber or Housecall Pro. If quote creation is the bottleneck, test QuoteIQ. If you mostly need writing, summaries and customer communication, ChatGPT is a flexible starting point. Use AI to speed up the work, not to replace a human final check on pricing, safety or job scope.
      </section>

      <section className="section compact" id="shortlist">
        <span className="eyebrow">EDITORIAL SHORTLIST</span>
        <h2>6 tools worth evaluating first</h2>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead><tr><th>#</th><th>Tool</th><th>Best for</th><th>Use case</th><th>Category</th><th>Editorial score</th><th></th></tr></thead>
            <tbody>
              {selected.map((x,i)=>(
                <tr key={x.slug}>
                  <td>{i+1}</td><td><strong>{x.tool.name}</strong></td><td>{x.label}</td><td>{x.useCase}</td><td>{x.tool.category}</td><td>★ {x.tool.score}</td>
                  <td><Link href={`/tools/${x.slug}`}>Review →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section compact">
        <span className="eyebrow">START WITH THE WORKFLOW</span>
        <h2>Which tool fits which contractor job?</h2>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead><tr><th>Workflow</th><th>Good starting option</th><th>Why it fits</th></tr></thead>
            <tbody>{workflowRows.map(row=><tr key={row[0]}>{row.map((c,i)=><td key={c}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="section compact">
        <span className="eyebrow">SELECTION CRITERIA</span>
        <h2>What to compare before buying</h2>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead><tr><th>Decision point</th><th>What to look for</th></tr></thead>
            <tbody>
              {selectionCriteria.map(([title, text]) => (
                <tr key={title}><td><strong>{title}</strong></td><td>{text}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-grid">
        <article className="content-card">
          <h2>Where AI adds the most value</h2>
          <ul>
            <li>Turning rough notes into clear customer follow-ups.</li>
            <li>Summarizing call notes and job updates without another spreadsheet.</li>
            <li>Generating estimate drafts or scope summaries faster.</li>
            <li>Creating local offers and before/after graphics for recurring marketing needs.</li>
          </ul>
        </article>
        <article className="content-card">
          <h2>Where AI should not be trusted alone</h2>
          <ul>
            <li>Final labor and material pricing.</li>
            <li>Code, permit or safety compliance.</li>
            <li>Contract language without professional review.</li>
            <li>Whether a customer issue truly requires a human response.</li>
          </ul>
        </article>
      </section>

      <section className="section compact">
        <span className="eyebrow">HOW WE CHOSE THESE TOOLS</span>
        <h2>We prioritize workflow fit, not hype</h2>
        <div className="grid">
          <article className="content-card"><h3>Business fit</h3><p>We emphasize tools that solve a recurring contractor problem such as quoting, calls, scheduling, job documentation, customer communication or local marketing.</p></article>
          <article className="content-card"><h3>Ease of adoption</h3><p>A tool is more valuable if a small business can put it to work without large implementation overhead or a huge learning curve.</p></article>
          <article className="content-card"><h3>Workflow value</h3><p>We favor tools that reduce wasted time, missed leads or repetitive admin, because those are the easiest gains to justify for a contractor.</p></article>
        </div>
        <p style={{marginTop:"1rem"}}>
          Our evaluation is aligned with the project <Link href="/methodology">methodology</Link>: a strong product should solve a real operational problem, be reasonably adoptable, and still require human review where the stakes are high.
        </p>
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
