import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, getComparison, getTool } from "../../../data/tools";

export function generateStaticParams() {
  return comparisons.map(c => ({ slug:c.slug }));
}

export function generateMetadata({ params }) {
  const c = getComparison(params.slug);
  if (!c) return {};
  return { title:c.title, description:c.intro, alternates:{canonical:`/compare/${c.slug}`} };
}

export default function ComparePage({ params }) {
  const c = getComparison(params.slug);
  if (!c) notFound();
  const a = getTool(c.a), b = getTool(c.b);

  return (
    <main className="detail-page">
      <div className="breadcrumbs"><Link href="/">Home</Link> / Compare / {a.name} vs {b.name}</div>
      <section className="business-hero">
        <span className="eyebrow">SMALL BUSINESS COMPARISON</span>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
      </section>

      <section className="comparison-table" aria-label={`${a.name} versus ${b.name}`}>
        <div className="comparison-row header"><b>Question</b><b>{a.name}</b><b>{b.name}</b></div>
        {c.rows.map((row,i)=><div className="comparison-row" key={i}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span></div>)}
      </section>

      <section className="content-grid">
        {[a,b].map(tool=>(
          <article className="content-card" key={tool.slug}>
            <span className="eyebrow">{tool.category}</span>
            <h2>{tool.name}</h2>
            <p>{tool.verdict}</p>
            <ul>{tool.pros.slice(0,2).map(x=><li key={x}>{x}</li>)}</ul>
            <div className="card-actions">
              <Link className="secondary center" href={`/tools/${tool.slug}`}>Full review</Link>
              <a className="primary center" href={tool.website} target="_blank" rel="nofollow sponsored noopener">Official site ↗</a>
            </div>
          </article>
        ))}
      </section>

      <section className="notice"><b>Our recommendation:</b> {c.conclusion}</section>

      <section className="content-card wide">
        <h2>Run a fair test before choosing</h2>
        <p>Use the same three real business tasks in both products. Record setup time, correction time, output quality and whether the tool replaces anything you already pay for. A better score on a generic benchmark matters less than a better result in your actual workflow.</p>
      </section>

      <section className="cta-panel">
        <div><span className="eyebrow">NEXT STEP</span><h2>Read the full reviews before committing.</h2></div>
        <div className="hero-actions">
          <Link className="secondary big" href={`/tools/${a.slug}`}>{a.name} review</Link>
          <Link className="primary big" href={`/tools/${b.slug}`}>{b.name} review</Link>
        </div>
      </section>
    </main>
  );
}
