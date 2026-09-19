import Link from "next/link";
import { notFound } from "next/navigation";
import { seoPages, getSeoPage } from "../../../data/seoPages";
import { getTool } from "../../../data/tools";
import { siteConfig } from "../../../lib/site";

export function generateStaticParams() {
  return seoPages.map(page => ({ slug: page.slug }));
}

export function generateMetadata({ params }) {
  const page = getSeoPage(params.slug);
  if (!page) return {};
  return {
    title: page.title,
    description: `${page.title}: practical recommendations for ${page.audience}.`,
    alternates: { canonical: `/best/${page.slug}` }
  };
}

export default function SeoLanding({ params }) {
  const page = getSeoPage(params.slug);
  if (!page) notFound();

  const relatedPages = seoPages.filter(({ slug }) => slug !== page.slug).slice(0, 6);
  const selected = page.tools.map(getTool).filter(Boolean);
  const base = siteConfig.url.replace(/\/$/,"");
  const schema = {
    "@context":"https://schema.org",
    "@type":"ItemList",
    name: page.title,
    url: `${base}/best/${page.slug}`,
    itemListElement: selected.map((tool,index)=>({
      "@type":"ListItem",
      position:index+1,
      name:tool.name,
      url:`${base}/tools/${tool.slug}`
    }))
  };

  return (
    <main className="detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
      <div className="breadcrumbs">
        <Link href="/">Home</Link> / Best AI Tools / {page.title}
      </div>

      <section className="business-hero">
        <span className="eyebrow">SMALL BUSINESS BUYER'S GUIDE</span>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </section>

      <section className="notice">
        <b>What this guide solves:</b> {page.problem}. Tool features and pricing change frequently, so verify final plan details with the vendor before purchasing.
      </section>

      <section className="section compact">
        <span className="eyebrow">SHORTLIST</span>
        <h2>{selected.length} tools to evaluate first</h2>
        <div className="grid">
          {selected.map((tool, index) => (
            <article className="card" key={tool.slug}>
              <div className="card-top">
                <div className="logo">{index + 1}</div>
                <div>
                  <h3>{tool.name}</h3>
                  <span className="tag">{tool.category}</span>
                </div>
                <span className="score">★ {tool.score}</span>
              </div>
              <p>{tool.description}</p>
              <p><b>Best for:</b> {tool.best}</p>
              <div className="card-actions">
                <Link className="secondary center" href={`/tools/${tool.slug}`}>Full review</Link>
                <a className="primary center" href={tool.website} target="_blank" rel="nofollow noopener">Official site ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <article className="content-card">
          <h2>How to choose</h2>
          <ul>
            <li>Pick one repetitive or expensive workflow first.</li>
            <li>Test the tool on real work for at least several sessions.</li>
            <li>Measure time saved, quality, errors and subscription cost.</li>
            <li>Keep human review for customer-facing or high-impact output.</li>
          </ul>
        </article>
        <article className="content-card">
          <h2>What to compare before buying</h2>
          <p>Do not choose only from feature lists. Compare the workflow you need, setup effort, overlap with existing software, human-review requirements and total subscription cost.</p>
          <div className="pill-row">
            {page.keywords.map(k => <span className="pill" key={k}>{k}</span>)}
          </div>
        </article>
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

      <section className="notice">
        <b>Editorial principle:</b> We do not rank a tool because it pays a commission. Affiliate relationships must be disclosed and should not determine recommendation order. <Link href="/methodology">Read our methodology →</Link>
      </section>
    </main>
  );
}
