import Link from "next/link";
import VendorLink from "../../../components/VendorLink";
import { notFound } from "next/navigation";
import { tools, getTool } from "../../../data/tools";

export function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const tool = getTool(params.slug);
  if (!tool) return {};
  return {
    title: `${tool.name} review for small business`,
    description: `${tool.name} review: best use cases, pros, limitations, alternatives and a practical buying decision for small businesses.`,
    alternates: { canonical: `/tools/${tool.slug}` }
  };
}

export default function ToolPage({ params }) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  const alternatives = tools
    .filter(t => t.slug !== tool.slug && (t.category === tool.category || t.professions.some(p => tool.professions.includes(p))))
    .slice(0, 3);

  const faq = [
    { q:`What is ${tool.name} best for?`, a:`For a small business, ${tool.name} is best considered for ${tool.best.toLowerCase()}. The right fit depends on whether that job is frequent enough to justify another tool.` },
    { q:`Should a small business pay for ${tool.name}?`, a:`Test it on a real recurring workflow first. Compare time saved, quality, errors and subscription cost before committing to a paid plan.` },
    { q:`What should I check before buying ${tool.name}?`, a:`Confirm the vendor's current pricing, plan limits, privacy terms and the features your workflow actually needs.` }
  ];

  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"SoftwareApplication",
    name:tool.name,
    applicationCategory:tool.category,
    description:tool.description,
    url:tool.website
  };

  return (
    <main className="detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} />
      <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/#explore">AI Tools</Link> / {tool.name}</div>

      <section className="detail-hero">
        <div>
          <span className="eyebrow">{tool.category.toUpperCase()} • TOOL REVIEW</span>
          <h1>{tool.name} for small business</h1>
          <p>{tool.description}</p>
          <div className="hero-actions">
            <VendorLink className="primary big" href={tool.website} tool={tool.slug} target="_blank" rel="nofollow sponsored noopener">Visit official site ↗</VendorLink>
            <Link className="secondary big" href="/methodology">How we evaluate tools</Link>
          </div>
          <p className="microcopy">Check current vendor pricing and plan limits before purchase.</p>
          {tool.slug === "elevenlabs" && (
            <p className="microcopy">
              Affiliate disclosure: AI Biz Tools is an independent ElevenLabs affiliate and may earn a commission if you purchase through this link, at no extra cost to you.
            </p>
          )}
          {tool.slug === "krisp" && (
            <p className="microcopy">
              Affiliate disclosure: AI Biz Tools is an independent Krisp affiliate and may earn a commission if you make a purchase through this link, at no additional cost to you.
            </p>
          )}
          {tool.slug === "quoteiq" && (
  <p className="microcopy">
    Affiliate disclosure: AI Biz Tools is an independent QuoteIQ affiliate and may earn a commission if you purchase through our link, at no additional cost to you.
  </p>
)}
        </div>
        <div className="rating-box">
          <span>EDITORIAL SCORE</span>
          <strong>{tool.score}/5</strong>
          <p>Best for: {tool.best}</p>
        </div>
      </section>

      <section className="decision-strip">
        <div><span>BEST FIT</span><strong>{tool.best}</strong></div>
        <div><span>BUSINESS TYPES</span><strong>{tool.professions.slice(0,3).join(", ")}</strong></div>
        <div><span>BUYING RULE</span><strong>Test one real workflow first</strong></div>
      </section>

      <section className="content-grid">
        <article className="content-card">
          <h2>What can a small business use it for?</h2>
          <ul>{tool.useCases.map(x=><li key={x}>{x}</li>)}</ul>
        </article>
        <article className="content-card">
          <h2>Who should consider it?</h2>
          <div className="pill-row">{tool.professions.map(x=><span className="pill" key={x}>{x}</span>)}</div>
          <p>{tool.verdict}</p>
        </article>
        <article className="content-card">
          <h2>Pros</h2>
          <ul>{tool.pros.map(x=><li key={x}>{x}</li>)}</ul>
        </article>
        <article className="content-card">
          <h2>Limitations</h2>
          <ul>{tool.cons.map(x=><li key={x}>{x}</li>)}</ul>
        </article>
      </section>

      <section className="content-card wide">
        <span className="eyebrow">BUYING DECISION</span>
        <h2>How to decide whether {tool.name} is worth it</h2>
        <ol>
          <li>Choose one recurring task from the use cases above.</li>
          <li>Run the same real task several times instead of judging a demo.</li>
          <li>Track time saved, amount of correction, output quality and any new process overhead.</li>
          <li>Compare the result with software you already pay for to avoid overlapping subscriptions.</li>
          <li>Only keep the tool if the workflow value is clear after the test.</li>
        </ol>
      </section>

      <section className="notice">
        <b>Pricing note:</b> {tool.pricingNote} We avoid hard-coding prices that can become stale.
      </section>

      {alternatives.length > 0 && <section className="section compact">
        <span className="eyebrow">ALTERNATIVES TO CHECK</span>
        <h2>Compare before adding another subscription</h2>
        <div className="grid">
          {alternatives.map(a=><article className="card" key={a.slug}>
            <div className="card-top"><div className="logo">{a.name[0]}</div><div><h3>{a.name}</h3><span className="tag">{a.category}</span></div></div>
            <p>{a.description}</p>
            <Link className="secondary center" href={`/tools/${a.slug}`}>Read {a.name} review</Link>
          </article>)}
        </div>
      </section>}

      <section className="section compact">
        <span className="eyebrow">FAQ</span>
        <h2>Questions before you buy</h2>
        <div className="faq-list">{faq.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className="cta-panel">
        <div><span className="eyebrow">BOTTOM LINE</span><h2>{tool.verdict}</h2></div>
        <VendorLink className="primary big" href={tool.website} tool={tool.slug} target="_blank" rel="nofollow sponsored noopener">Check {tool.name} on the official site ↗</VendorLink>
      </section>
    </main>
  );
}
