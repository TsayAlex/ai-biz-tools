import Link from "next/link";
import { getTool } from "../data/tools";
import { siteConfig } from "../lib/site";

export default function BuyerGuide({guide}) {
  const selected=guide.picks.map(x=>({...x,tool:getTool(x.slug)})).filter(x=>x.tool);
  const base=siteConfig.url.replace(/\/$/,"");
  const article={"@context":"https://schema.org","@type":"Article",headline:guide.title,description:guide.description,dateModified:"2026-09-12",mainEntityOfPage:`${base}${guide.path}`,author:{"@type":"Organization",name:"AI Biz Tools"},publisher:{"@type":"Organization",name:"AI Biz Tools"}};
  const faq={"@context":"https://schema.org","@type":"FAQPage",mainEntity:guide.faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};
  return <main className="detail-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(article)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faq)}}/>
    <div className="breadcrumbs"><Link href="/">Home</Link> / Best AI Tools / {guide.short}</div>
    <section className="business-hero contractor-hero">
      <span className="eyebrow">{guide.eyebrow}</span><h1>{guide.title}</h1><p>{guide.intro}</p>
      <div className="hero-actions"><a className="primary" href="#shortlist">See the shortlist ↓</a><Link className="secondary" href="/#finder">Use the free tool finder</Link></div>
    </section>
    <section className="notice"><b>Quick answer:</b> {guide.quick}</section>
    <section className="section compact" id="shortlist"><span className="eyebrow">EDITORIAL SHORTLIST</span><h2>{selected.length} tools worth evaluating first</h2>
      <div className="guide-table-wrap"><table className="guide-table"><thead><tr><th>#</th><th>Tool</th><th>Best for</th><th>Score</th><th></th></tr></thead><tbody>
      {selected.map((x,i)=><tr key={x.slug}><td>{i+1}</td><td><strong>{x.tool.name}</strong></td><td>{x.label}</td><td>★ {x.tool.score}</td><td><Link href={`/tools/${x.slug}`}>Review →</Link></td></tr>)}
      </tbody></table></div>
    </section>
    <section className="section compact"><span className="eyebrow">START WITH THE JOB, NOT THE APP</span><h2>Match the tool to the workflow</h2>
      <div className="guide-table-wrap"><table className="guide-table"><thead><tr><th>Workflow</th><th>Starting option</th><th>Why</th></tr></thead><tbody>
      {guide.workflows.map(r=><tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td></tr>)}
      </tbody></table></div>
    </section>
    <section className="content-grid"><article className="content-card"><h2>Buying rule</h2><p>{guide.rule}</p></article><article className="content-card"><h2>14-day test</h2><ol><li>Pick one expensive or repetitive workflow.</li><li>Record the current time, errors or lost opportunities.</li><li>Test one tool on real work for two weeks.</li><li>Keep it only if the result justifies cost and setup.</li></ol></article></section>
    <section className="section compact"><span className="eyebrow">FAQ</span><h2>Questions before you buy</h2><div className="faq-list">{guide.faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="notice"><b>Editorial policy:</b> Rankings are based on workflow fit, not commissions. We do not claim hands-on testing where it has not occurred. Features and prices can change. <Link href="/methodology">Methodology →</Link></section>
    <section className="final-cta"><span className="eyebrow">NEXT STEP</span><h2>Get a shorter list for your task</h2><p>Answer three questions in the Finder instead of buying from a generic list.</p><Link className="primary big" href="/#finder">Find my 3 tools →</Link></section>
  </main>
}