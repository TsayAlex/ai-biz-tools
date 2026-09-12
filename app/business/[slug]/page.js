import Link from "next/link";
import { notFound } from "next/navigation";
import { businesses, getBusiness, getTool } from "../../../data/tools";

export function generateStaticParams() {
  return businesses.map(b => ({ slug: b.slug }));
}

export function generateMetadata({ params }) {
  const b = getBusiness(params.slug);
  if (!b) return {};
  return { title: b.title, description: b.description };
}

export default function BusinessPage({ params }) {
  const b = getBusiness(params.slug);
  if (!b) notFound();
  const selected = b.recommended.map(getTool).filter(Boolean);

  return (
    <main className="detail-page">
      <div className="breadcrumbs"><Link href="/">Home</Link> / By Business / {b.name}</div>
      <section className="business-hero">
        <span className="big-icon">{b.icon}</span>
        <span className="eyebrow">AI TOOLS BY BUSINESS</span>
        <h1>{b.title}</h1>
        <p>{b.description}</p>
      </section>

      <section className="content-card wide">
        <h2>Where AI can help first</h2>
        <div className="need-grid">{b.needs.map(x=><div key={x}>✓ {x}</div>)}</div>
      </section>

      <section className="section compact">
        <span className="eyebrow">STARTER STACK</span>
        <h2>{selected.length} tools worth evaluating</h2>
        <div className="grid">
          {selected.map(tool=>(
            <article className="card" key={tool.slug}>
              <div className="card-top"><div className="logo">{tool.name[0]}</div><div><h3>{tool.name}</h3><span className="tag">{tool.category}</span></div></div>
              <p>{tool.description}</p>
              <p><b>Best for:</b> {tool.best}</p>
              <Link className="primary center" href={`/tools/${tool.slug}`}>Read review →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="notice">
        <b>Recommendation rule:</b> Start with one expensive or repetitive workflow. Test one tool against that workflow before adding another subscription.
      </section>
    </main>
  );
}
